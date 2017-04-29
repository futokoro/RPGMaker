//=============================================================================
// スキル対抗プラグイン
// FTKR_SkillCounter.js
// 作成者     : フトコロ
// 作成日     : 2017/02/21
// 最終更新日 : 2017/04/29
// バージョン : v1.0.6
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SCT = true;

var FTKR = FTKR || {};
FTKR.SCT = FTKR.SCT || {};

//=============================================================================
/*:
 * @plugindesc v1.0.6 相手のスキルに対抗して効果を変えるプラグイン
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
 * <InvalidSkillId: x>
 * <スキルID無効化: x>
 *    :スキルIDが x のスキルを無効化します。
 * 
 * <InvalidSkillType: x>
 * <スキルタイプ無効化: x>
 *    :スキルタイプIDが x のスキルを無効化します。
 *    :スキルタイプIDは、データベースのタイプで設定した番号です。
 * 
 * <InvalidDamageType: x>
 * <ダメージタイプ無効化: x>
 *    :ダメージタイプが x のスキルを無効化します。
 *    :x は以下の番号を指定してください。
 *    : 1 - HPダメージ
 *    : 2 - MPダメージ
 *    : 3 - HP回復
 *    : 4 - MP回復
 *    : 5 - HP吸収
 *    : 6 - MP吸収
 * 
 * <InvalidElementId: x>
 * <属性無効化: x>
 *    :属性IDが x のスキルを無効化します。
 *    :属性IDは、データベースのタイプで設定した番号です。
 * 
 * <InvalidHitType: x>
 * <命中タイプ無効化: x>
 *    :命中タイプが x のスキルを無効化します。
 *    :x は以下の番号を指定してください。
 *    : 1 - 必中
 *    : 2 - 物理攻撃
 *    : 3 - 魔法攻撃
 * 
 * 
 * 例）
 * <スキルID無効化: 10>
 *    :スキルID 10 のスキルを無効化
 * 
 * なお、以下のようにカンマ(,)を使って複数の条件を指定することができます。
 * <スキルID無効化: 10,11>
 *    :スキルID 10 と 11 のスキルを無効化
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの吸収
 *-----------------------------------------------------------------------------
 * スキルのパラメータを指定して、その条件に合うスキルを吸収します。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <DrainSkillId: x>
 * <スキルID吸収: x>
 *    :スキルIDが x のスキルを吸収します。
 * 
 * <DrainSkillType: x>
 * <スキルタイプ吸収: x>
 *    :スキルタイプIDが x のスキルを吸収します。
 *    :スキルタイプIDは、データベースのタイプで設定した番号です。
 * 
 * <DrainElementId: x>
 * <属性吸収: x>
 *    :属性IDが x のスキルを吸収します。
 *    :属性IDは、データベースのタイプで設定した番号です。
 * 
 * <DrainHitType: x>
 * <命中タイプ吸収: x>
 *    :命中タイプが x のスキルを吸収します。
 *    :x は以下の番号を指定してください。
 *    : 1 - 必中
 *    : 2 - 物理攻撃
 *    : 3 - 魔法攻撃
 * 
 * 例）
 * <スキルID吸収: 10>
 *    :スキルID 10 のスキルを吸収
 * 
 * なお、以下のようにカンマ(,)を使って複数の条件を指定することができます。
 * <スキルID吸収: 10,11>
 *    :スキルID 10 と 11 のスキルを吸収
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの反射
 *-----------------------------------------------------------------------------
 * スキルのパラメータを指定して、その条件に合うスキルを反射します。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <ReflectionSkillId: x>
 * <スキルID反射: x>
 *    :スキルIDが x のスキルを反射します。
 * 
 * <ReflectionSkillType: x>
 * <スキルタイプ反射: x>
 *    :スキルタイプIDが x のスキルを反射します。
 *    :スキルタイプIDは、データベースのタイプで設定した番号です。
 * 
 * <ReflectionDamageType: x>
 * <ダメージタイプ反射: x>
 *    :ダメージタイプが x のスキルを反射します。
 *    :x は以下の番号を指定してください。
 *    : 1 - HPダメージ
 *    : 2 - MPダメージ
 *    : 3 - HP回復
 *    : 4 - MP回復
 *    : 5 - HP吸収
 *    : 6 - MP吸収
 * 
 * <ReflectionElementId: x>
 * <属性反射: x>
 *    :属性IDが x のスキルを反射します。
 *    :属性IDは、データベースのタイプで設定した番号です。
 * 
 * <ReflectionHitType: x>
 * <命中タイプ反射: x>
 *    :命中タイプが x のスキルを反射します。
 *    :x は以下の番号を指定してください。
 *    : 1 - 必中
 *    : 2 - 物理攻撃
 *    : 3 - 魔法攻撃
 * 
 * 例）
 * <スキルID反射: 10>
 *    :スキルID 10 のスキルを反射
 * 
 * なお、以下のようにカンマ(,)を使って複数の条件を指定することができます。
 * <スキルID反射: 10,11>
 *    :スキルID 10 と 11 のスキルを反射
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージタイプの変更
 *-----------------------------------------------------------------------------
 * 相手のスキルの効果を、ダメージなら回復に、回復ならダメージに変換するタグを
 * 使用できます。
 * 
 * 対象:アクター、クラス、装備、ステート、エネミー
 * <ReversDamage: type>
 * <ダメージ反転: type>
 *    :受けた'type'のダメージ(吸収含む)を回復に変えます。
 *    :type に使用できるコードは、以下です。
 *    : Hp - Hp系のダメージを回復にします。
 *    : Mp - Mp系のダメージを回復にします。
 * 入力例)
 * <ReversDamage: Hp,Mp>
 *    : HpダメージとMpダメージを両方回復にします。
 * 
 * 
 * <ReversRecover: type>
 * <回復反転: type>
 *   :受けた'type'の回復をダメージに変えます。
 *    :type に使用できるコードは、以下です。
 *    : Hp - Hp系の回復をダメージにします。
 *    : Mp - Mp系の回復をダメージにします。
 * 入力例)
 * <ReversRecover: Hp,Mp>
 *    : Hp回復とMp回復を両方ダメージにします。
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
 * v1.0.6 - 2017/04/29 : 条件式にセルフ変数を使用できるように見直し。
 * v1.0.5 - 2017/04/23 : ヘルプ修正
 * v1.0.4 - 2017/04/23 : 日本語タグ追加、ヘルプ修正、内部処理見直し
 * v1.0.3 - 2017/04/23 : 不具合修正
 * v1.0.2 - 2017/04/23 : 機能追加
 * v1.0.1 - 2017/04/14 : 微修正
 * v1.0.0 - 2017/02/21 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SCT.parameters = PluginManager.parameters('FTKR_SkillCounter.js');

//=============================================================================
// 自作関数(グローバル)
//=============================================================================

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

if (!FTKR.setGameData) {
FTKR.setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};
}

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
        var item   = datas.item;
        var number = datas.number;
        if (b) var result = b.result();
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
}

//配列の中身が数字なら数値に変換する
Array.prototype.numOrStr = function() {
    return this.map( function(elm, i) {
        return isNaN(parseInt(elm)) ? elm : parseInt(elm);
    });
};

//文字列の配列を<codeTitle>text</codeTitle>用の正規表現オブジェクトの配列に変換する
Array.prototype.convertEntrapmentRegArray = function() {
    return this.map(function(str) {
        return {
            a:new RegExp('<' + str + '>', 'i'),
            b:new RegExp('<\/' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列とdataをテストする
Array.prototype.testRegs = function(data, prop) {
    return this.some(function(reg) {
        return prop ? reg[prop].test(data) : reg.test(data);
    });
};

//objのメモ欄から <metacode: x> の値を読み取って配列で返す
var readSplitMeta = function(obj, metacode) {
    var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
    if(obj.note.match(metaReg)) {
        var result = (RegExp.$1).replace(/\s/g, "");
        return result.split(',').numOrStr();
    }
    return [];
};

// <codeTitle>text</codeTitle>の形式のメタデータを読み取ってtextを返す
var readEntrapmentCodeToText = function(obj, codeTitles) {
    notes = codeTitles.convertEntrapmentRegArray();
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (notes.testRegs(line, 'a')) {
            var text = '';
            setMode = 'read';
        } else if (notes.testRegs(line, 'b')) {
            setMode = 'none';
        } else if (setMode === 'read') {
            text += line + ';';
        }
    }
    return text;
};

// textを条件式に使える状態に変換する
var convertTextToConditions = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        datas.forEach(function(data, i) {
            result += data;
            if (datas[i+1]) result += ')&&(';
        });
        result = '(' + result + ')';
    }
    return result;
};

//=============================================================================
// Game_Action
//=============================================================================

DataManager.getItemMetaSplit = function(item, metacode) {
    return item && this.evalSctFormula(item) ?
        readSplitMeta(item, metacode) : [];
};

DataManager.getItemsMetaSplitTotal = function(items, metacode) {
    var result = [];
    items.forEach( function(item) {
        Array.prototype.push.apply(result, this.getItemMetaSplit(item, metacode));
    },this);
    return result;
};

//targetが持つ、metacodeで指定したタグの値を配列にして返す
DataManager.getItemsMetaArray = function(target, metacode) {
    var result = [];
    if(target.isActor()) {
        return result.concat(
            this.getItemMetaSplit(target.actor(), metacode),
            this.getItemMetaSplit($dataClasses[target.actor().classId], metacode),
            this.getItemsMetaSplitTotal(target.equips(), metacode),
            this.getItemsMetaSplitTotal(target.states(), metacode)
        );
    } else if(target.isEnemy()) {
        return result.concat(
            this.getItemMetaSplit(target.enemy(), metacode),
            this.getItemsMetaSplitTotal(target.states(), metacode)
        );
    }
    return result;
};

DataManager.convertSctEnableConditions = function(obj) {
    return convertTextToConditions(readEntrapmentCodeToText(obj, ['SCT 有効条件', 'SCT ENABLE']));
};

DataManager.evalSctFormula = function(obj, subject, target) {
    var formula = this.convertSctEnableConditions(obj);
    if (!formula) return true;
    return FTKR.evalFormula(formula);
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.checkSkillData = function(target, metacodes, data) {
    FTKR.setGameData(this.subject(), target, this.item());
    return metacodes.some(function(metacode){
        return DataManager.getItemsMetaArray(target, metacode).contains(data);
    },this);
};

//------------------------------------------------------------------------
// スキルのパラメータと対象のメタデータを比較
//------------------------------------------------------------------------
Game_Action.prototype.sctSkillId = function(target, skill, metacode) {
    return this.isSkill() && this.checkSkillData(target, metacode, skill.id);
};

Game_Action.prototype.sctSkillType = function(target, skill, metacode) {
    return this.isSkill() && this.checkSkillData(target, metacode, skill.stypeId);
};

Game_Action.prototype.sctDamageType = function(target, damage, metacode) {
    return this.checkSkillData(target, metacode, damage.type);
};

Game_Action.prototype.sctElementId = function(target, damage, metacode) {
    var attackElements = this.subject().attackElements();
    if(!attackElements.length) attackElements = [];
    var elementIds = damage.elementId < 0 ? attackElements : [damage.elementId];
    var eflag = elementIds.filter( function(eid) {
        return this.checkSkillData(target, metacode, eid);
    },this);
    return eflag.length ? true : false;
};

Game_Action.prototype.sctHitType = function(target, skill, metacode) {
    return this.checkSkillData(target, metacode, skill.hitType);
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
    return this.sctSkillId(target, skill, ['InvalidSkillId', 'スキルID無効化']) ||
        this.sctSkillType(target, skill, ['InvalidSkillType', 'スキルタイプ無効化']) ||
        this.sctDamageType(target, skill.damage, ['InvalidDamageType', 'ダメージタイプ無効化']) ||
        this.sctElementId(target, skill.damage, ['InvalidElementId', '属性無効化']) ||
        this.sctHitType(target, skill, ['InvalidHitType', '命中タイプ無効化']);
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
    return this.checkReversDamageType(target) ? value * -1 : value;
};

Game_Action.prototype.checkReversDamageType = function(target) {
    return (this.isHpRecover() && this.checkSkillData(target, ['ReversRecover', '回復反転'], 'Hp')) ||
        (this.isHpEffect() && (this.checkSkillData(target, ['ReversDamage', 'ダメージ反転'], 'Hp') || this.checkMetaDrain(target, this.item()))) ||
        (this.isMpRecover() && this.checkSkillData(target, ['ReversRecover', '回復反転'], 'Mp')) ||
        (this.isMpEffect() && (this.checkSkillData(target, ['ReversDamage', 'ダメージ反転'], 'Mp') || this.checkMetaDrain(target, this.item())));
};

Game_Action.prototype.checkMetaDrain = function(target, skill) {
    return this.sctSkillId(target, skill, ['DrainSkillId', 'スキルID吸収']) ||
        this.sctSkillType(target, skill, ['DrainSkillType', 'スキルタイプ吸収']) ||
        this.sctElementId(target, skill.damage, ['DrainElementId', '属性吸収']) ||
        this.sctHitType(target, skill, ['DrainHitType', '命中タイプ吸収']);
};

//------------------------------------------------------------------------
// スキルの反射処理
//------------------------------------------------------------------------
FTKR.SCT.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
    return this.checkMetaReflection(target, this.item()) || FTKR.SCT.Game_Action_itemMrf.call(this, target);
};

Game_Action.prototype.checkMetaReflection = function(target, skill) {
    return this.sctSkillId(target, skill, ['ReflectionSkillId', 'スキルID反射']) ||
        this.sctSkillType(target, skill, ['ReflectionSkillType', 'スキルタイプ反射']) ||
        this.sctDamageType(target, skill.damage, ['ReflectionDamageType', 'ダメージタイプ反射']) ||
        this.sctElementId(target, skill.damage, ['ReflectionElementId', '属性反射']) ||
        this.sctHitType(target, skill, ['ReflectionHitType', '命中タイプ反射']);
};
