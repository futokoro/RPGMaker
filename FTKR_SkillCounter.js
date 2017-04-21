//=============================================================================
// スキル対抗プラグイン
// FTKR_SkillCounter.js
// 作成者     : フトコロ
// 作成日     : 2017/02/21
// 最終更新日 : 2017/04/14
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SCT = true;

var FTKR = FTKR || {};
FTKR.SCT = FTKR.SCT || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 相手のスキルに対抗して効果を変えるプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 1. スキルのパラメータを指定して、その条件に合うスキルを無効化します。
 * 
 * 2. スキルのダメージタイプを指定して、その条件に合うダメージの効果を変えます。
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
 * スキルのパラメータを指定して、その条件に合うスキルを無効化するを使用できます。
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

//=============================================================================
// Utility
//=============================================================================
FTKR.Utility = FTKR.Utility || {};

if (!FTKR.Utility.metaArray) {

FTKR.Utility.metaArray = true;

FTKR.Utility.getItemMetaSplit = function(item, metacode) {
    var values = [];
    if (item) {
        var meta = eval("item.meta." + metacode);
        if (meta) {
            meta = meta.replace(/\s/g, "");
            values = meta.split(',');
        }
    }
    return values;
};

FTKR.Utility.getClassMetaSplit = function(target, metacode) {
    var values = [];
    if (target) {
        var classId = target.classId;
        if(classId) {
            var meta = eval("$dataClasses[classId].meta." + metacode);
            if (meta) {
                meta = meta.replace(/\s/g, "");
                values = meta.split(',');
            }
        }
    }
    return values;
};

FTKR.Utility.getItemsMetaSplitTotal = function(items, metacode) {
    var values = [];
    var result = [];
    items.forEach( function(item) {
        values = this.getItemMetaSplit(item, metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
    },this);
    return result;
};

//targetが持つ、metacodeで指定したタグの値を配列(String型)にして返す
FTKR.Utility.getItemsMetaArray = function(target, metacode) {
    var values = [];
    var result = [];
    if(target.isActor()) {
        values = this.getItemMetaSplit(target.actor(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
        values = this.getClassMetaSplit(target.actor(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
        values = this.getItemsMetaSplitTotal(target.equips(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
        values = this.getItemsMetaSplitTotal(target.skills(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
        values = this.getItemsMetaSplitTotal(target.states(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
    } else if(target.isEnemy()) {
        values = this.getItemMetaSplit(target.enemy(), metacode);
        if(values.length > 0) Array.prototype.push.apply(result,values);
    }
    return result;
};

FTKR.Utility.getItemsMetaArrayN = function(target, metacode) {
    return this.getItemsMetaArray(target, metacode).map( function(array) {
        return Number(array);
    });
};

};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.SCT.Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    var result = FTKR.SCT.Game_Action_itemHit.call(this, target);
    var skill = this.item();
    var iflag =  this.sctSkillId(target, skill) ||
        this.sctSkillType(target, skill) ||
        this.sctDamageType(target, skill.damage) ||
        this.sctElementId(target, skill.damage) ||
        this.sctHitType(target, skill);
    return iflag ? 0 : result;
};

Game_Action.prototype.sctSkillId = function(target, skill) {
    return FTKR.Utility.getItemsMetaArray(target, 'InvalidSkillId').contains(String(skill.id));
};

Game_Action.prototype.sctSkillType = function(target, skill) {
    return FTKR.Utility.getItemsMetaArray(target, 'InvalidSkillType').contains(String(skill.stypeId));
};

Game_Action.prototype.sctDamageType = function(target, damage) {
    return FTKR.Utility.getItemsMetaArray(target, 'InvalidDamageType').contains(String(damage.type));
};

Game_Action.prototype.sctElementId = function(target, damage) {
    var attackElements = this.subject().attackElements().map( function(id) {
        return String(id);
    });
    var elementIds = damage.elementId < 0 ? attackElements : [String(damage.elementId)]; 
    var eflag = elementIds.filter( function(eid) {
        return FTKR.Utility.getItemsMetaArray(target, 'InvalidElementId').contains(eid);
    });
    return eflag.length ? true : false;
};

Game_Action.prototype.sctHitType = function(target, skill) {
    return FTKR.Utility.getItemsMetaArray(target, 'InvalidHitType').contains(String(skill.hitType));
};

FTKR.SCT.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    value = this.sctReversDamageType(target, value);
    FTKR.SCT.Game_Action_executeDamage.call(this, target, value);
};

Game_Action.prototype.sctReversDamageType = function(target, value) {
    if (this.isHpRecover()) {
        if (FTKR.Utility.getItemsMetaArray(target, 'ReversRecover').contains('Hp')) value *= -1;
    } else if (this.isHpEffect()) {
        if (FTKR.Utility.getItemsMetaArray(target, 'ReversDamage').contains('Hp')) value *= -1;
    }
    if (this.isMpRecover()) {
        if (FTKR.Utility.getItemsMetaArray(target, 'ReversRecover').contains('Mp')) value *= -1;
    } else if (this.isMpEffect()) {
        if (FTKR.Utility.getItemsMetaArray(target, 'ReversDamage').contains('Mp')) value *= -1;
    }
    return value;
};
