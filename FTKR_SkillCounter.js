//=============================================================================
// スキル対抗プラグイン
// FTKR_SkillCounter.js
// 作成者     : フトコロ
// 作成日     : 2017/02/21
// 最終更新日 : 2017/04/23
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SCT = true;

var FTKR = FTKR || {};
FTKR.SCT = FTKR.SCT || {};

//=============================================================================
/*:
 * @plugindesc v1.0.3 相手のスキルに対抗して効果を変えるプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 1. スキルのパラメータを指定して、その条件に合うスキルを
 *    無効化・吸収・反射します。
 * 
 * 2. スキルのダメージタイプを指定して、その条件に合うダメージの効果を変えます。
 * 
 * 3. 上記1と2のタグ設定の有効条件を設定できます。
 *    攻撃側と防御側のパラメータを比較して無効化・吸収・反射するかどうかを
 *    設定できます。
 * 
 * ※本プラグインには、プラグインパラメータとプラグインコマンドはありません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの無効化
 *-----------------------------------------------------------------------------
 * スキルのパラメータを指定して、その条件に合うスキルを無効化します。
 * ここでの無効化とは、「命中しなかった」ことを意味します。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <InvalidSkillId: x1,x2,...>    :スキルIDが x1,x2,.. のスキルを
 *                                :無効化します。
 * 
 * <InvalidSkillType: x1,x2,...>  :スキルタイプが x1,x2,.. のスキルを
 *                                :無効化します。
 * 
 * <InvalidDamageType: x1,x2,...> :ダメージタイプが x1,x2,.. のスキルを
 *                                :無効化します。
 * 
 * <InvalidElementId: x1,x2,...>  :属性が x1,x2,.. のスキルを無効化します。
 * 
 * <InvalidHitType: x1,x2,...>    :ヒットタイプが x1,x2,.. のスキルを
 *                                :無効化します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの吸収
 *-----------------------------------------------------------------------------
 * スキルのパラメータを指定して、その条件に合うスキルを吸収します。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <DrainSkillId: x1,x2,...>    :スキルIDが x1,x2,.. のスキルを吸収します。
 * 
 * <DrainSkillType: x1,x2,...>  :スキルタイプが x1,x2,.. のスキルを
 *                              :吸収します。
 * 
 * <DrainElementId: x1,x2,...>  :属性が x1,x2,.. のスキルを吸収します。
 * 
 * <DrainHitType: x1,x2,...>    :ヒットタイプが x1,x2,.. のスキルを
 *                              :吸収します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの反射
 *-----------------------------------------------------------------------------
 * スキルのパラメータを指定して、その条件に合うスキルを反射します。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <ReflectionSkillId: x1,x2,...>    :スキルIDが x1,x2,.. のスキルを
 *                                   :反射します。
 * 
 * <ReflectionSkillType: x1,x2,...>  :スキルタイプが x1,x2,.. のスキルを
 *                                   :反射します。
 * 
 * <ReflectionDamageType: x1,x2,...> :ダメージタイプが x1,x2,.. のスキルを
 *                                   :反射します。
 * 
 * <ReflectionElementId: x1,x2,...>  :属性が x1,x2,.. のスキルを反射します。
 * 
 * <ReflectionHitType: x1,x2,...>    :ヒットタイプが x1,x2,.. のスキルを
 *                                   :反射します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージタイプの変更
 *-----------------------------------------------------------------------------
 * 相手のスキルの効果を、ダメージなら回復に、回復ならダメージに変換するタグを
 * 使用できます。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <ReversDamage: type>   :受けた'type'のダメージ(吸収含む)を回復に変えます。
 *                        :type に使用できるコードは、以下です。
 *                        : Hp - Hp系のダメージを回復にします。
 *                        : Mp - Mp系のダメージを回復にします。
 * 入力例)
 * <ReversDamage: Hp,Mp>  : HpダメージとMpダメージを両方回復にします。
 * 
 * 
 * <ReversRecover: type>  :受けた'type'の回復をダメージに変えます。
 *                        :type に使用できるコードは、以下です。
 *                        : Hp - Hp系の回復をダメージにします。
 *                        : Mp - Mp系の回復をダメージにします。
 * 入力例)
 * <ReversRecover: Hp,Mp> : Hp回復とMp回復を両方ダメージにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定したタグの有効条件
 *-----------------------------------------------------------------------------
 * 以下のノートタグを追記することで、無効化・吸収・反射・ダメージ反転タグの
 * 有効条件を設定することができます。
 * 
 * <SCT 有効条件>
 * 条件式
 * </SCT 有効条件>
 * 
 * [条件式(eval) の値について]
 * 条件式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - 攻撃側のパラメータを参照します。(a.atk で攻撃側の攻撃力)
 *  b.param - 防御側のパラメータを参照します。(b.atk で防御側の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 * 入力例）
 * スイッチID1 が ON の時にタグが有効になる。
 * <SCT 有効条件>
 * s[1]
 * </SCT 有効条件>
 * 
 * 
 * [複数の条件を設定する場合]
 * 以下の2種類の入力例は同じ意味です。
 * 
 * 1. 縦に複数の条件式を並べる
 * <SCT 有効条件>
 * 条件式1
 * 条件式2
 * </SCT 有効条件>
 * 
 * 1. '&&'を使用して横に複数の条件式を並べる
 * <SCT 有効条件>
 * 条件式1 && 条件式2
 * </SCT 有効条件>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.3 - 2017/04/23 : 不具合修正
 *
 * v1.0.2 - 2017/04/23 : 機能追加
 * 
 * v1.0.1 - 2017/04/14 : 微修正
 * 
 * v1.0.0 - 2017/02/21 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SCT.parameters = PluginManager.parameters('FTKR_SkillCounter.js');

//配列の中身が数字なら数値に変換する
Array.prototype.numOrStr = function() {
    return this.map( function(elm, i) {
        return isNaN(parseInt(elm)) ? elm : parseInt(elm);
    });
};

//=============================================================================
// Utility
//=============================================================================
FTKR.Utility = FTKR.Utility || {};

FTKR.Utility.getItemMetaSplit = function(subject, target, item, metacode) {
    var values = [];
    if (item) {
        var enable = DataManager.evalSctFormula(item, subject, target);
        if (enable) {
            var metaReg = eval('/<' + metacode + ':[ ]*(.+)>/i');
            if(item.note.match(metaReg)) {
                var result = (RegExp.$1).replace(/\s/g, "");
                values = result.split(',').numOrStr();
            }
        }
    }
    return values;
};

FTKR.Utility.getItemsMetaSplitTotal = function(subject, target, items, metacode) {
    var values = [];
    var result = [];
    items.forEach( function(item) {
        values = this.getItemMetaSplit(subject, target, item, metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
    },this);
    return result;
};

//targetが持つ、metacodeで指定したタグの値を配列(String型)にして返す
FTKR.Utility.getItemsMetaArray = function(subject, target, metacode) {
    var result = [];
    if(target.isActor()) {
        return result.concat(
            this.getItemMetaSplit(subject, target, target.actor(), metacode),
            this.getItemMetaSplit(subject, target, $dataClasses[target.actor().classId], metacode),
            this.getItemsMetaSplitTotal(subject, target, target.equips(), metacode),
            this.getItemsMetaSplitTotal(subject, target, target.skills(), metacode),
            this.getItemsMetaSplitTotal(subject, target, target.states(), metacode)
        );
    } else if(target.isEnemy()) {
        return result.concat(
            this.getItemMetaSplit(subject, target, target.enemy(), metacode),
            this.getItemsMetaSplitTotal(subject, target, target.states(), metacode)
        );
    }
    return result;
};

//=============================================================================
// Game_Action
//=============================================================================

DataManager.evalSctFormula = function(obj, subject, target) {
    var formula = this.getSctEnableFormula(obj);
    if (!formula) return true;
    try {
        var a = subject;
        var b = target;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        console.log(subject, target, value);
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

DataManager.getSctEnableFormula = function(obj) {
    var note1a = /<SCT 有効条件>/i;
    var note1aj = /<SCT ENABLE>/i;
    var note1b = /<\/SCT 有効条件>/i;
    var note1bj = /<\/SCT ENABLE>/i;

    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(note1a) || line.match(note1aj)) {
            var text = '';
            setMode = 'anydata';
        } else if (note1b.test(line) || note1bj.test(line)) {
            setMode = 'none';
        } else if (setMode === 'anydata') {
            text += line + ';';
        }
    }
    return this.makeSctEnableData(text);
};

DataManager.makeSctEnableData = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        result += '(';
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(/(.+)/i)) {
                result += RegExp.$1;
                if (datas[i+1]) result += ')&&(';
            }
        }
        result += ')';
    }
    return result;
};

//=============================================================================
// Game_Action
//=============================================================================

//------------------------------------------------------------------------
// スキルのパラメータと対象のメタデータを比較
//------------------------------------------------------------------------
Game_Action.prototype.sctSkillId = function(target, skill, metacode) {
    return this.isSkill() && FTKR.Utility.getItemsMetaArray(this.subject(), target, metacode).contains(skill.id);
};

Game_Action.prototype.sctSkillType = function(target, skill, metacode) {
    return this.isSkill() && FTKR.Utility.getItemsMetaArray(this.subject(), target, metacode).contains(skill.stypeId);
};

Game_Action.prototype.sctDamageType = function(target, damage, metacode) {
    return FTKR.Utility.getItemsMetaArray(this.subject(), target, metacode).contains(damage.type);
};

Game_Action.prototype.sctElementId = function(target, damage, metacode) {
    var attackElements = this.subject().attackElements();
    if(!attackElements.length) attackElements = [];
    var elementIds = damage.elementId < 0 ? attackElements : [damage.elementId];
    var eflag = elementIds.filter( function(eid) {
        return FTKR.Utility.getItemsMetaArray(this.subject(), target, metacode).contains(eid);
    },this);
    return eflag.length ? true : false;
};

Game_Action.prototype.sctHitType = function(target, skill, metacode) {
    return FTKR.Utility.getItemsMetaArray(this.subject(), target, metacode).contains(skill.hitType);
};

//------------------------------------------------------------------------
// スキルの無効化処理
//------------------------------------------------------------------------
FTKR.SCT.Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    var result = FTKR.SCT.Game_Action_itemHit.call(this, target);
    return this.checkMetaInvalid(target, this.item()) ? 0 : result;
};

Game_Action.prototype.checkMetaInvalid = function(target, skill) {
    return this.sctSkillId(target, skill, 'InvalidSkillId') ||
        this.sctSkillType(target, skill, 'InvalidSkillType') ||
        this.sctDamageType(target, skill.damage, 'InvalidDamageType') ||
        this.sctElementId(target, skill.damage, 'InvalidElementId') ||
        this.sctHitType(target, skill, 'InvalidHitType');
};

//------------------------------------------------------------------------
// スキルの吸収・ダメージ反転処理
//------------------------------------------------------------------------
FTKR.SCT.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    value = this.sctReversDamageType(target, value);
    FTKR.SCT.Game_Action_executeDamage.call(this, target, value);
};

Game_Action.prototype.sctReversDamageType = function(target, value) {
    if (this.isHpRecover()) {
        if (FTKR.Utility.getItemsMetaArray(this.subject(), target, 'ReversRecover').contains('Hp')) value *= -1;
    } else if (this.isHpEffect()) {
        if (FTKR.Utility.getItemsMetaArray(this.subject(), target, 'ReversDamage').contains('Hp') || this.checkMetaDrain(target, this.item())) {
            value *= -1;
        }
    }
    if (this.isMpRecover()) {
        if (FTKR.Utility.getItemsMetaArray(this.subject(), target, 'ReversRecover').contains('Mp')) value *= -1;
    } else if (this.isMpEffect()) {
        if (FTKR.Utility.getItemsMetaArray(this.subject(), target, 'ReversDamage').contains('Mp') || this.checkMetaDrain(target, this.item())) {
            value *= -1;
        }
    }
    return value;
};

Game_Action.prototype.checkMetaDrain = function(target, skill) {
    return this.sctSkillId(target, skill, 'DrainSkillId') ||
        this.sctSkillType(target, skill, 'DrainSkillType') ||
        this.sctElementId(target, skill.damage, 'DrainElementId') ||
        this.sctHitType(target, skill, 'DrainHitType');
};

//------------------------------------------------------------------------
// スキルの反射処理
//------------------------------------------------------------------------
FTKR.SCT.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
    return this.checkMetaReflection(target, this.item()) || FTKR.SCT.Game_Action_itemMrf.call(this, target);
};

Game_Action.prototype.checkMetaReflection = function(target, skill) {
    return this.sctSkillId(target, skill, 'ReflectionSkillId') ||
        this.sctSkillType(target, skill, 'ReflectionSkillType') ||
        this.sctDamageType(target, skill.damage, 'ReflectionDamageType') ||
        this.sctElementId(target, skill.damage, 'ReflectionElementId') ||
        this.sctHitType(target, skill, 'ReflectionHitType');
};
