//=============================================================================
// アイテムとスキルの使用効果を拡張するプラグイン
// FTKR_ExItemConfig_Effect.js
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIE = true;

var FTKR = FTKR || {};
FTKR.EIE = FTKR.EIE || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アイテムとスキルの使用効果を拡張するプラグイン
 * @author フトコロ
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムやスキルの使用効果を
 * より詳細に設定できます。
 * 
 * 1. 使用効果の対象を変更できます。
 * 
 * 2. 使用効果の効果量にJS計算式が使用できます。
 * 
 * 3. 使用効果が発生させるための有効条件を設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージの設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、使用効果の設定を変更できます。
 * 
 * <EIC 使用効果ID: x>
 * code
 * </EIC 使用効果ID>
 *    :使用効果のId x に対して code部で記述した設定を反映します。
 *    :使用効果のIDは、使用効果欄に設定した順番に上から 0, 1,...となります。
 * 
 * 
 * [code に使用できる項目]
 * Target: y
 * 対象: y
 *    :使用効果の対象を、y に変えることができます。
 *    :y に使用できるコードは以下の通りです。
 *    : user - 使用者
 *    : randomFriends - 味方からランダムで1体選択
 *    : randomOpponents - 敵からランダムで1体選択
 * 
 * Value1: eval
 * 内容1: 計算式
 *    :使用効果の内容1を 計算式(eval) で設定した値に変更します。
 *    :内容1は、使用効果で1つめに設定した数値です。
 *    : 例) HP回復の場合、% で設定する値
 * 
 * Value2: eval
 * 内容2: 計算式
 *    :使用効果の内容2を 計算式(eval) で設定した値に変更します。
 *    :内容2は、使用効果で2つめに設定した数値です。
 *    : 例) HP回復の場合、+ で設定する値
 * 
 * Enabled: eval
 * 有効条件: 計算式
 *    :対象の使用効果ID を 計算式(eval) で設定した条件で有効に
 *    :します。設定しない場合は、常に有効です。
 *    :有効になっていない場合は、効果が発生しません。
 * 
 * 
 * [計算式(eval)の値について]
 * 計算式は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。負の値入力可。
 *  a.param  - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  b.param  - 対象のパラメータを参照します。(b.def で対象の防御力)
 *  s[x]     - スイッチID x の状態を参照します。
 *  v[x]     - 変数ID x の値を参照します。
 *  iv[x]    - アイテムのセルフ変数ID x の値を参照します。(*1)
 *  hpDamage - Hpダメージ量を参照します。(*2)
 *  mpDamage - Mpダメージ量を参照します。(*2)
* 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * (*2) FTKR_ExItemDamage.jsによってダメージIDを設定している場合は、
 *      設定した使用効果が発生するダメージIDのダメージ量を参照します。
 *      他のプラグインの計算式でダメージ量を参照したい場合は以下。
 *        Hpダメージ - b._result.hpDamage
 *        Mpダメージ - b._result.mpDamage
 * 
 * 
 * 設定例）
 * 使用効果の1番目に「HP回復」を追加して、以下のタグを記入することで
 * スイッチID1またはスイッチID2がONの時に、相手に与えたダメージの20%分、
 * 使用者が回復する効果が発生します。
 * 
 * <EIC 使用効果ID: 0>
 * 対象: user
 * 内容1: 0
 * 内容2: hpDamage * 0.2
 * 有効条件: s[1] && s[2]
 * </EIC 使用効果ID>
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
 * v1.0.0 - 2017/04/14 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EIE.parameters = PluginManager.parameters('FTKR_ExItemConfig_Effect');

//=============================================================================
// DataManager
//=============================================================================

FTKR.EIE.DatabaseLoaded = false;
FTKR.EIE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.EIE.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EIE.DatabaseLoaded) {
        this.eieEffectIdNoteTags($dataSkills);
        this.eieEffectIdNoteTags($dataItems);
        FTKR.EIE.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eieEffectIdNoteTags = function(group) {
    var note1a = /<(?:EIC 使用効果ID):[ ]*(\d+)>/i;
    var note1aj = /<(?:EIC EFFECTID):[ ]*(\d+)>/i;
    var note1b = /<\/(?:EIC 使用効果ID)>/i;
    var note1bj = /<\/(?:EIC EFFECTID)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.eieEffects = [];

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
                obj.eieEffects.push(data);
            } else if (setMode === 'anydata') {
                data.text += line + ';';
            }
        }
        this.makeEieData(obj);
        obj.eieEffects = [];
    }
};

DataManager.makeEieData = function(item) {
    this.makeSepEffectsBase(item);
    this.setSepEffects(item);
};

DataManager.makeSepEffectsBase = function(item) {
    item.effects.forEach( function(effect) {
        effect.target = '';
        effect.baseValue1 = effect.value1;
        effect.baseValue2 = effect.value2;
        effect.sepValue1 = '';
        effect.sepValue2 = '';
        effect.enabled = '';
    });
};

DataManager.setSepEffects = function(item) {
    for (var t = 0; t < item.eieEffects.length; t++) {
        var sepdata = item.eieEffects[t];
        if (sepdata) {
            var case1 = /(?:TARGET):[ ]*(.+)/i;
            var case1j = /(?:対象):[ ]*(.+)/i;
            var case2 = /(?:VALUE1):[ ]*(.+)/i;
            var case2j = /(?:内容1):[ ]*(.+)/i;
            var case3 = /(?:VALUE2):[ ]*(.+)/i;
            var case3j = /(?:内容2):[ ]*(.+)/i;
            var case5 = /(?:ENABLED):[ ]*(.+)/i;
            var case5j = /(?:有効条件):[ ]*(.+)/i;

            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataId = sepdata.id;
                if (data.match(case1) || data.match(case1j)) {
                    item.effects[dataId].target = String(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    item.effects[dataId].sepValue1 = String(RegExp.$1);
                } else if(data.match(case3) || data.match(case3j)) {
                    item.effects[dataId].sepValue2 = String(RegExp.$1);
                } else if(data.match(case5) || data.match(case5j)) {
                    item.effects[dataId].enabled = String(RegExp.$1);
                }
            }
        }
    }
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.EIE.BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
    FTKR.EIE.BattleManager_invokeNormalAction.call(this, subject, target);
    var effectTarget = this._action._targetSepEffect;
    if(effectTarget) this._logWindow.displayActionSepResults(subject, effectTarget);
};


//=============================================================================
// Game_Action
//=============================================================================

FTKR.EIE.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    FTKR.EIE.Game_Action_initialize.call(this, subject, forcing);
    this._target = {};
    this._targetSepEffect = null;
};

FTKR.EIE.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    if (effect) {
        target = this.changeTargetEffect(target, effect);
        if (this.evalEffectEnabled(effect, target)) {
            this.setSepEffectValue();
            FTKR.EIE.Game_Action_applyItemEffect.call(this, target, effect);
        }
    }
};

Game_Action.prototype.evalEffectEnabled = function(effect, target) {
    return !effect.enabled ? true: evalEieFormula(effect.enabled, target);
};

Game_Action.prototype.evalEieFormula = function(formula, target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var hpDamage = b._result.hpDamage;
        var mpDamage = b._result.mpDamage;
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

Game_Action.prototype.changeTargetEffect = function(target, effect) {
    this._target = target;
    if (effect.target) {
        switch (effect.target) {
            case 'user':
                this._targetSepEffect = this.subject();
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomOpponents':
                this._targetSepEffect = this.changeTargetForRandom(target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomFriends':
                this._targetSepEffect = this.changeTargetForRandom(!target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
        }
    }
    return target;
};

Game_Action.prototype.changeTargetForRandom = function(isEnemy) {
    return isEnemy ? $gameTroop.randomTarget() : $gameParty.randomTarget();
};

Game_Action.prototype.setSepEffectValue = function() {
    if(this.item()) {
        this.item().effects.forEach(function(effect) {
            effect.value1 = this.setSepEffectValue1(effect);
            effect.value2 = this.setSepEffectValue2(effect);
        }, this);
    }
};

Game_Action.prototype.setSepEffectValue1 = function(effect) {
    return effect.sepValue1 ? this.evalEieFormula(effect.sepValue1, this._target) : effect.baseValue1;
};

Game_Action.prototype.setSepEffectValue2 = function(effect) {
    return effect.sepValue2 ? this.evalEieFormula(effect.sepValue2, this._target) : effect.baseValue2;
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.displayActionSepResults = function(subject, target) {
    if (target.result().used) {
        this.push('pushBaseLine');
        this.displayCritical(target);
        this.push('popupDamage', target);
        this.displayDamage(target);
        this.displayAffectedStatus(target);
        this.displayFailure(target);
        this.push('waitForNewLine');
        this.push('popBaseLine');
    }
};
