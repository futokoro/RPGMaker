//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// アイテムとスキルのダメージ処理を拡張するプラグイン
// FTKR_ExItemDamage.js
// 作成者     : フトコロ
// 作成日     : 2017/04/09
// 最終更新日 : 
// バージョン : v1.0.0
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_EID = true;

var FTKR = FTKR || {};
FTKR.EID = FTKR.EID || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アイテムとスキルのダメージ処理を拡張するプラグイン
 * @author フトコロ
 *
 * @param ---属性ダメージ計算---
 * @desc 
 * 
 * @param Elements Damage Calc
 * @desc 複数属性に対するダメージ計算方法
 * 0 - 最大, 1 - 平均, 2 - 累積, 3 - 最小
 * @default 0
 *
 * @param ---ダメージ倍率---
 * @desc 
 * 
 * @param Damage Rate
 * @desc デフォルトのダメージ倍率(%)
 * @default 100
 *
 * @param AutoAddition Damage Rate
 * @desc ダメージ倍率をダメージ計算式に入力不要にするか
 * 1 - 入力不要, 0 - 入力要
 * @default 1
 *
 * @param ---クリティカル---
 * @desc 
 * 
 * @param Critical For Each
 * @desc ダメージID毎にクリティカル判定を行うか
 * 0 - 判定しない, 1 - 判定する
 * @default 0
 *
 * @param Critical Rate
 * @desc デフォルトのクリティカルダメージ倍率(%)
 * @default 300
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムやスキルによって与えるダメージを
 * 以下の仕様に変更します。
 * 
 *  [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...
 * 
 * 各ダメージIDのダメージは、それぞれ、別の設定値を持ち、別に計算します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. FTKR_ItemSelfVariables.js と併用する場合は、本プラグインは、
 *    FTKR_ItemSelfVariables.jsよりも下の位置になるように追加してください。
 * 
 * 3. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージの設定
 *-----------------------------------------------------------------------------
 * 本プラグインを適用することで、スキルによって与えるダメージを、以下の仕様に
 * 変更します。
 * 
 *  [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...
 * 
 * ダメージID毎に、攻撃と防御によるダメージ計算を行い、その結果の合計値を
 * 最終的なダメージとして相手に与えます。
 * 
 * 例えば、「複数の属性を持ち、かつ属性毎に与えるダメージが異なるスキル」や
 * 「物理ダメージと魔法ダメージを併せ持つスキル」などを作ることができます。
 * 
 * スキルに以下のノートタグを追記することで、各ダメージIDを設定できます。
 * 
 * <EID ダメージID: x>
 * code
 * </EID ダメージID>
 * 
 * ダメージID毎にスキルIDを設定することで、そのスキルIDの属性、ダメージ計算式、
 * 命中タイプ、ダメージタイプを元に各ダメージIDのダメージ計算を行います。
 * また、そのスキルIDの使用効果や得TPについても、ダメージとともに発生します。
 * ダメージID0 は、ベースとなるスキルのデータベース上の設定が反映されます。
 * 
 * **********************************************************************
 * 注意：ダメージIDを追加する場合は、必ずID1 から順番に追加してください。
 * **********************************************************************
 * 
 * 
 * [code に使用できる項目]
 * SkillId: y
 * スキルID: y
 *    :スキルID y のスキル設定をコピーします。
 *    :基本的に、このコードを使って、各ダメージIDの設定を作成します。
 * 
 * ElementId: y1,y2,...
 * 属性ID: y1,y2,...
 *    :属性ID y1,y2,...で指定した属性を追加します。
 * 
 * DamageRate: y
 * ダメージ倍率: y
 *    :ダメージ倍率を y (%)に変更します。
 *    :設定しない場合は、プラグインパラメータ<Default Rate>の値を使用します。
 * 
 * CriticalRate: y
 * クリティカル倍率: y
 *    :クリティカルのダメージ倍率を y (%)に変更します。
 *    :設定しない場合は、プラグインパラメータ<Critical Rate>の値を使用します。
 * 
 * Trait Elements: type1,type2,...
 * 特徴の属性追加: type1,type2,...
 *    :type で指定した対象の特長欄の属性を追加します。
 *    :type で指定できる対象は、Actor,Class,Weapon,Armor,States です。
 * 
 * Enabled: eval
 * 有効条件: eval
 *    :対象のダメージID を eval で設定した条件で有効に
 *    :します。設定しない場合は、常に有効です。
 *    :ダメージID 0 に対しては設定できません。
 *    :有効になっていない場合は、ダメージに反映しません。
 * 
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 * 入力例）
 * ダメージID1 として、使用者のレベルが11以上かつスイッチID1がONの時に、
 * スキルID10のスキルのダメージを追加します。
 * ダメージ倍率は50%、クリティカルダメージは400%に変更します。
 * 属性や命中タイプ、計算式等は、スキルID10のものを使用します。
 * 
 * <EID ダメージID: 1>
 * スキルId: 10
 * ダメージ倍率: 50
 * クリティカル倍率: 400
 * 有効条件: a.level > 10 && s[1]
 * </EID ダメージID>
 * 
 * 
 * [プラグインパラメータの設定項目]
 * <Critical For Each>
 *    :クリティカルの判定を、ダメージID0 の最初の1回だけにするか、
 *    :それともダメージID毎に判定するか選べます。
 * 
 * <AutoAddition Damage Rate>
 *    :ダメージ倍率のコードを、ダメージ計算式に記入しなくても自動で計算する
 *    :かどうか設定できます。
 *    :入力不要にした場合、ダメージ計算式の結果に対して、ダメージ倍率を
 *    :積算します。
 *    :なお、入力不要にした場合でも、ダメージ倍率のコードを計算式に記入すると
 *    :2重に計算します。
 * 
 * 
 * [ダメージ計算式に使用できるコード]
 * ダメージ計算式に以下のコードも使用できます。
 * 
 * d.rate   :スキルで設定したダメージ倍率値を取得します。
 * 
 * 使用例)<AutoAddition Damage Rate:0>の場合
 * a.atk * 4 * d.rate * 0.01 - b.def * 2
 * 
 *   使用者の攻撃力の4倍にダメージ倍率を掛けてから相手の防御力の2倍を引きます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 属性ダメージの計算方法について
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Element Damage Calc>の設定値により、複数の属性を持った
 * 攻撃をした場合の、防御側の有効度の計算方法を変更することができます。
 * 
 * 変更できる計算方法は、最大、平均、累積、最小の４種類です。
 * 
 *  <0:最大> :防御側の該当する属性有効度の最大値が
 *          最終的なダメージ倍率になります。(ツクールMVの標準方式)
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は70% ( = max(50%, 70%) )
 * 
 * 
 *  <1:平均> :防御側の該当する属性有効度の平均値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は60% ( = (50% + 70%) / 2 )
 *
 *
 *  <2:累積> :防御側の該当する属性有効度を累積した値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は35% ( = 50% × 70% )
 *
 *
 *  <3:最小> :防御側の該当する属性有効度の最小値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は50% ( = min(50%, 70%) )
 * 
 * 
 * なお、この計算は、ダメージID毎に別に行われますので注意してください。
 * 以下の2パターンは、防御側の有効度の設定が無ければ同じダメージですが、
 * 有効度の設定がある場合は最終的なダメージが変わります。
 * 
 * パターン1 ダメージID 0 のみ
 *  属性   :物理＋炎
 *  計算式 :200
 *    ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
 *        200 * 70% = 140ダメージ
 * 
 * パターン2 ダメージID 0 と ダメージID 1
 *  ID0 属性   :物理
 *  ID0 計算式 :100
 *  ID1 属性   :炎
 *  ID1 計算式 :100
 *    ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
 *        100 * 50% + 100 * 70% = 120ダメージ
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/04/09 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EID.parameters = PluginManager.parameters('FTKR_ExItemDamage');

FTKR.EID.elementDamageCalc = Number(FTKR.EID.parameters['Elements Damage Calc'] || 0);
FTKR.EID.defDamageRate = Number(FTKR.EID.parameters['Damage Rate'] || 0);
FTKR.EID.defCriticalRate = Number(FTKR.EID.parameters['Critical Rate'] || 0);
FTKR.EID.criticalForEach = Number(FTKR.EID.parameters['Critical For Each'] || 0);
FTKR.EID.autoDamageRate = Number(FTKR.EID.parameters['AutoAddition Damage Rate'] || 0);

//=============================================================================
// DataManager
//=============================================================================

FTKR.EID.DatabaseLoaded = false;
FTKR.EID.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.EID.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EID.DatabaseLoaded) {
        this.eidDamageIdNoteTags($dataSkills);
        this.eidDamageIdNoteTags($dataItems);
        FTKR.EID.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eidDamageIdNoteTags = function(group) {
    var note1a = /<(?:EID ダメージID):[ ]*(\d+)>/i;
    var note1aj = /<(?:EID DAMAGEID):[ ]*(\d+)>/i;
    var note1b = /<\/(?:EID ダメージID)>/i;
    var note1bj = /<\/(?:EID DAMAGEID)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.sepdamages = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                var data = {
                  id:Number(RegExp.$1),
                  text:''
                };
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.sepdamages.push(data);
            } else if (setMode === 'anydata') {
                data.text += line + ';';
            }
        }
        this.makeEidData(obj);
        obj.sepdamages = [];
    }
};

// skillの拡張部分(sepdata)を作成する
DataManager.makeEidData = function(skill) {
    this.makeEidDamagesBase(skill);
    this.setEidDamagesNotetags(skill);
};

DataManager.makeEidDamagesBase = function(skill) {
    skill.damages = [];
    skill.damages[0] = this.setEidDamage(skill.id);
};

DataManager.setEidDamage = function(skillId) {
    var damage = {};
    var setSkill = $dataSkills[skillId]
    var setDamage = setSkill.damage;
    for (var list in setDamage) {
        damage[list] = setDamage[list];
    }
    damage.rate = FTKR.EID.defDamageRate;
    damage.criticalRate = FTKR.EID.defCriticalRate;
    damage.hitType = setSkill.hitType;
    damage.itemElements = [];
    damage.id = setSkill.id;
    damage.addElmIds = [];
    damage.enabled = '';
    return damage;
};

DataManager.setEidDamagesNotetags = function(skill) {
    for (var t = 0; t < skill.sepdamages.length; t++) {
        var sepdata = skill.sepdamages[t];
        if (sepdata) {
            var case1 = /(?:SKILLID):[ ]*(\d+)/i;
            var case1j = /(?:スキルID):[ ]*(\d+)/i;
            var case2 = /(?:ELEMENTID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case2j = /(?:属性ID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3 = /(?:DAMAGERATE):[ ]*(\d+)/i;
            var case3j = /(?:ダメージ倍率):[ ]*(\d+)/i;
            var case4 = /(?:CRITICALRATE):[ ]*(\d+)/i;
            var case4j = /(?:クリティカル倍率):[ ]*(\d+)/i;
            var case5 = /(?:TRAIT ELEMENTS):[ ]*(.+)/i;
            var case5j = /(?:特徴の属性追加):[ ]*(.+)/i;
            var case6 = /(?:ENABLED):[ ]*(.+)/i;
            var case6j = /(?:有効条件):[ ]*(.+)/i;

            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataId = sepdata.id;
                var item = skill.damages[dataId];
                if (data.match(case1) || data.match(case1j)) {
                    var skillId = Number(RegExp.$1);
                    skill.damages[dataId] = this.setEidDamage(skillId);
                } else if(data.match(case2) || data.match(case2j)) {
                    var elmIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    skill.damages[dataId].addElmIds = [];
                    if (item.elementId !== -1) {
                        elmIds.forEach( function(elmId) {
                            if (item.elementId !== elmId) {
                                skill.damages[dataId].addElmIds.push(elmId);
                            }
                        });
                    }
                } else if(data.match(case3) || data.match(case3j)) {
                    skill.damages[dataId].rate = Number(RegExp.$1);
                } else if(data.match(case4) || data.match(case4j)) {
                    skill.damages[dataId].criticalRate = Number(RegExp.$1);
                } else if(data.match(case5) || data.match(case5j)) {
                    var text = String(RegExp.$1).replace(/\s/g, "");
                    var types = text.split(',');
                    types.forEach( function(type) {
                        skill.damages[dataId].itemElements.push(type);
                    });
                } else if(data.match(case6) || data.match(case6j)) {
                    skill.damages[dataId].enabled = String(RegExp.$1);
                }
            }
        }
    }
};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.EID.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    FTKR.EID.Game_Action_initialize.call(this, subject, forcing);
    this._damageId = 0;
};

Game_Action.prototype.itemBase = function() {
    return this._item.object();
};

Game_Action.prototype.damageSkill = function() {
    return $dataSkills[this.itemBase().damages[this._damageId].id];
};

//書き換え
Game_Action.prototype.item = function() {
    return this._damageId ? this.damageSkill() : this.itemBase();
};

Game_Action.prototype.itemDamage = function() {
    return this.itemBase().damages[this._damageId];
};

/*-------------------------------------------------------------
  スキル実行処理の修正
-------------------------------------------------------------*/
FTKR.EID.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this._damageId = 0;
    FTKR.EID.Game_Action_apply.call(this, target);
    this.eidDamageIdApply(target);
};

Game_Action.prototype.eidDamageIdApply = function(target) {
    var result = target.result();
    var len = this.item().damages.length;
    if (result.isHit() && len > 1) {
        for (var i = 1; i < len; i++) {
            this._damageId = i;
            if (this.item().damage.type > 0 && this.evalDamagesEnabled(this.itemBase())) {
                var critical = FTKR.EID.criticalForEach ? 
                    (Math.random() < this.itemCri(target)) :
                    result.critical;
                var value = this.makeDamageValue(target, critical);
                this.executeDamage(target, value);
                this.item().effects.forEach(function(effect) {
                    this.applyItemEffect(target, effect);
                }, this);
                this.applyItemUserEffect(target);
            }
        }
    }
    this._damageId = 0;
};

/*-------------------------------------------------------------
  ダメージ計算の修正
-------------------------------------------------------------*/

Game_Action.prototype.evalEidFormula = function(item, formula, target, type) {
    try {
        var a = this.subject();
        var b = target;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var d = this.itemBase().damages[this._damageId];
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var sign = ([3, 4].contains(type) ? -1 : 1);
        var value = Math.max(eval(formula), 0) * sign;
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

Game_Action.prototype.evalDamagesEnabled = function(item) {
    var enabled = item.damages[this._damageId].enabled;
    return !enabled ? true : this.evalEidFormula(item, enabled);
};

//書き換え
Game_Action.prototype.evalDamageFormula = function(target) {
    var value = this.evalEidFormula(
        this.item(),
        this.item().damage.formula,
        target,
        this.item().damage.type
    );
    return FTKR.EID.autoDamageRate ? this.applyDamageRate(value) : value;
};

Game_Action.prototype.applyDamageRate = function(damage) {
    return damage * this.itemDamage().rate / 100;
};

//書き換え
Game_Action.prototype.applyCritical = function(damage) {
    return damage * this.itemDamage().criticalRate / 100;
};

/*-------------------------------------------------------------
  属性有効度の計算の修正
-------------------------------------------------------------*/
//書き換え
Game_Action.prototype.calcElementRate = function(target) {
    var elementIds = this.isElementIds(this.itemDamage());
    switch (FTKR.EID.elementDamageCalc) {
        case 1:
          return this.elementsAverageRate(target, elementIds);
        case 2:
          return this.elementsAccumlateRate(target, elementIds);
        case 3:
          return this.elementsMinRate(target, elementIds);
    }
    return this.elementsMaxRate(target, elementIds);
};

Game_Action.prototype.isElementIds = function(itemDamage) {
    return  itemDamage.elementId < 0 ? this.subject().attackElements() : this.isSkillElements(itemDamage);
};

Game_Action.prototype.isSkillElements = function(itemDamage) {
    return [itemDamage.elementId].concat(itemDamage.addElmIds, this.addTraitsElementId(itemDamage));
};

Game_Action.prototype.addTraitsElementId = function(itemDamage) {
    var list = [];
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
    if (!itemDamage.itemElements) return list;
    itemDamage.itemElements.forEach( function(type) {
        switch (type) {
            case 'Actor':
                list = list.concat(this.edTraitsSet(code, this.actorData()));
                break;
            case 'Class':
                list = list.concat(this.edTraitsSet(code, this.classData()));
                break;
            case 'Weapon':
                list = list.concat(this.edTraitsALLSet(code, this.weaponsData()));
                break;
            case 'Armor':
                list = list.concat(this.edTraitsALLSet(code, this.armorsData()));
                break;
            case 'States':
                list = list.concat(this.edTraitsALLSet(code, this.statesData()));
                break;
        }
    },this);
    return list;
};

Game_Action.prototype.edTraitsALLSet = function(code, subjects) {
    var list = [];
    for (var i = 0; i < subjects.length; i++) {
        list = list.concat(this.edTraitsSet(code, subjects[i]));
    }
    return list;
};

Game_Action.prototype.edTraitsSet = function(code, subject) {
    var list = [];
    subject.traits.forEach( function(trait) {
        if (trait.code === code) list.push(trait.dataId);
    });
    return list;
};

Game_Action.prototype.actorData = function() {
    return this.subject().isActor() ? $dataActors[this.subject().actorId()] : false;
};

Game_Action.prototype.classData = function() {
    return this.subject().isActor() ? this.subject().currentClass() : false;
};

Game_Action.prototype.weaponsData = function() {
    return this.subject().isActor() ? this.subject().weapons() : false;
};

Game_Action.prototype.armorsData = function() {
    return this.subject().isActor() ? this.subject().armors() : false;
};

Game_Action.prototype.statesData = function() {
    return this.subject().states();
};

Game_Action.prototype.elementsAverageRate = function(target, elements) {
    if (!elements.length) return 1;
   	var value = 0;
    elements.forEach(function(elementId) {
        value += target.elementRate(elementId);
    });
    return value / elements.length;
};

Game_Action.prototype.elementsAccumlateRate = function(target, elements) {
    if (!elements.length) return 1;
    var value = 1;
    elements.forEach(function(elementId) {
        value *= target.elementRate(elementId);
    });
    return value;
};

Game_Action.prototype.elementsMinRate = function(target, elements) {
    if (!elements.length) return 1;
    return Math.min.apply(null, elements.map(function(elementId) {
        return target.elementRate(elementId);
    }, this));
};

//=============================================================================
// Game_Battler
//=============================================================================

//書き換え
Game_Battler.prototype.gainHp = function(value) {
    this._result.hpDamage += -value;
    this._result.hpAffected = true;
    this.setHp(this.hp + value);
};

//書き換え
Game_Battler.prototype.gainMp = function(value) {
    this._result.mpDamage += -value;
    this.setMp(this.mp + value);
};

//書き換え
Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage += -value;
    this.setTp(this.tp + value);
};
