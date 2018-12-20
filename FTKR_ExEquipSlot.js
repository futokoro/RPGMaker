//=============================================================================
// 同じ装備タイプの装備を２つ以上装備できるようにするプラグイン
// FTKR_ExEquipSlot.js
// プラグインNo : 49
// 作成者     : フトコロ
// 作成日     : 2017/06/30
// 最終更新日 : 2018/12/20
// バージョン : v1.2.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EES = true;

var FTKR = FTKR || {};
FTKR.EES = FTKR.EES || {};

//=============================================================================
/*:
 * @plugindesc v1.2.0 同じ装備タイプの装備を２つ以上装備できるようにする
 * @author フトコロ
 *
 * @param Enable Equip Same Items
 * @desc 同じ装備を２つ以上装備できるか設定する。
 * @type boolean
 * @on 装備できる
 * @off 装備できない
 * @default true
 * 
 * @param Disabled Equip Same WtypeIds
 * @desc ここに設定した武器タイプIDは１つしか装備できません。
 * @default 
 * 
 * @param Disabled Equip Same AtypeIds
 * @desc ここに設定した防具タイプIDは１つしか装備できません。
 * @default 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 同じ装備タイプの装備を２つ以上装備できるようにします。
 * 
 * ＜設定方法＞
 * 複数装備させたい装備タイプを、データベースの装備タイプに
 * 同じ名前で装備させたい数だけ設定してください。
 * 
 * 設定した装備タイプの装備は、同じ名前の装備スロットであれば
 * どこにでも装備可能になります。
 * 
 * 
 * ＜注意＞
 * 装備タイプ「武器」を増やすと、スロットタイプ「二刀流」と同等の
 * 効果が発生します。
 * 
 * 
 * ＜同じ武器・防具を複数装備させる場合＞
 * プラグインパラメータ<Enable Equip Same Items>で
 * 同じ武器・防具を複数装備できるか設定できます。
 * 
 * 「装備できる」に設定した場合は、同じ装備を２つ以上装備できます。
 * 「装備できない」に設定した場合は、同じ装備は１つしか装備できません。
 * 
 * ただし、以下のタグをメモ欄に記載すると、プラグインパラメータの設定を
 * 無視するようになります。
 * 
 * <EES_複数装備可>
 *    :このタグがある装備は、<Enable Equip Same Items>を
 *    :「装備できない」に設定していても、複数装備可能になります。
 * 
 * <EES_複数装備不可>
 *    :このタグがある装備は、<Enable Equip Same Items>を
 *    :「装備できる」に設定していても、１つしか装備できません。
 * 
 * 
 * ＜同じ武器タイプ、防具タイプを複数装備させない場合＞
 * 基本的に同じ武器タイプ・防具タイプは、何個でも装備可能になります。
 * 
 * ただし、 * 以下のプラグインパラメータに数値を入力すると
 * そのIDの武器タイプや防具タイプは、１つしか装備できません。
 * 
 * <Disabled Equip Same Wtypes>
 *      :このパラメータに入力した武器タイプIDは、１つしか装備できません。
 *      :複数のIDを入力する場合は、カンマ(,)で分けてください。
 *      :また、二つのID同士をハイフン(-)で繋げた場合は、その間のすべての
 *      :IDを登録します。
 * 
 * <Disabled Equip Same Atypes>
 *      :このパラメータに入力した防具タイプIDは、１つしか装備できません。
 *      :複数のIDを入力する場合は、カンマ(,)で分けてください。
 *      :また、二つのID同士をハイフン(-)で繋げた場合は、その間のすべての
 *      :IDを登録します。
 * 
 * 入力例)
 * 　1, 4, 5, 10-15
 * この場合、ID 1, 4, 10, 11, 12, 13, 14, 15が該当します。
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
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.2.0 - 2018/12/20 : 機能追加
 *    1. 同じ武器タイプ防具タイプを複数装備させない機能を追加。
 * 
 * v1.1.0 - 2017/12/17 : 機能追加
 *    1. 同じ装備を２つ以上装備できるか設定する機能を追加。
 * 
 * v1.0.0 - 2017/06/30 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var splitConvertNumber = function(param) {
        var results = [];
        (param + '').split(',').forEach( function(split){
            match = /[ ]*(\d+)[ ]*-[ ]*(\d+)/.exec(split);
            if (match) {
                for (var i = Number(match[1]); i <= Number(match[2]); i++) {
                    results.push(i);
                }
            } else {
                if(!isNaN(split)) results.push(Number(split));
            }
        });
        return results;
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExEquipSlot');

    FTKR.EES = {
        enable : JSON.parse(parameters['Enable Equip Same Items'] || 'true'),
        disabledWtpeIds : splitConvertNumber(parameters['Disabled Equip Same WtypeIds'] || ''),
        disabledAtpeIds : splitConvertNumber(parameters['Disabled Equip Same AtypeIds'] || ''),
    };

    var sameEquipIds = function(etypeId) {
        var equipIds = [];
        $dataSystem.equipTypes.forEach( function(etype, i) {
            if (etype === $dataSystem.equipTypes[etypeId]) equipIds.push(i);
        });
        return equipIds;
    };

    var matchEquipIds = function(itemEtypeId, slotEtypeId) {
        return sameEquipIds(itemEtypeId).contains(slotEtypeId);
    };

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    var enableMultipleEquipment = function(item) {
        if (!item) return false;
        return testObjectMeta(item, ['EES_複数装備可']);
    };

    var disableMultipleEquipment = function(item) {
        if (!item) return true;
        return testObjectMeta(item, ['EES_複数装備不可']);
    };

    //=============================================================================
    // Window_EquipItem
    //=============================================================================

    Window_EquipItem.prototype.checkSameEquipIds = function(etypeId) {
        return matchEquipIds(etypeId, this._actor.equipSlots()[this._slotId]);
    };

    Window_EquipItem.prototype.checkEnabledMultiEquip = function(item) {
        return !FTKR.EES.enable && this._actor.isEquipped(item) && !enableMultipleEquipment(item);
    };

    Window_EquipItem.prototype.checkDisabledMultiEquip = function(item) {
        return FTKR.EES.enable && this._actor.isEquipped(item) && disableMultipleEquipment(item);
    };

    Window_EquipItem.prototype.checkEquippedSameWtypeIds = function(item) {
        return DataManager.isWeapon(item) && FTKR.EES.disabledWtpeIds.contains(item.wtypeId) && this._actor.isEquippedSameWtypeIds(item.wtypeId);
    };

    Window_EquipItem.prototype.checkEquippedSameAtypeIds = function(item) {
        return ataManager.isArmor(item) && FTKR.EES.disabledAtpeIds.contains(item.atypeId) && this._actor.isEquippedSameAtypeIds(item.atypeId);
    };

    //書き換え
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || !this.checkSameEquipIds(item.etypeId)) {
            return false;
        }
        if (this.checkEnabledMultiEquip(item)) {
            return false;
        }
        if (this.checkDisabledMultiEquip(item)) {
            return false;
        }
        if (this.checkEquippedSameWtypeIds(item)) {
            return false;
        }
        if (this.checkEquippedSameAtypeIds(item)) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================
    //書き換え
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        for (;;) {
            var slots = this.equipSlots();
            var equips = this.equips();
            var changed = false;
            for (var i = 0; i < equips.length; i++) {
                var item = equips[i];
                if (item && (!this.canEquip(item) || !matchEquipIds(item.etypeId, slots[i]))) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };

    //書き換え
    Game_Actor.prototype.bestEquipItem = function(slotId) {
        var etypeId = this.equipSlots()[slotId];
        var items = $gameParty.equipItems().filter(function(item) {
            return matchEquipIds(item.etypeId, etypeId) && this.canEquip(item);
        }, this);
        var bestItem = null;
        var bestPerformance = -1000;
        for (var i = 0; i < items.length; i++) {
            var performance = this.calcEquipItemPerformance(items[i]);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };

    //書き換え
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
                (!item || matchEquipIds(item.etypeId, this.equipSlots()[slotId]))) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };

    Game_Actor.prototype.isEquippedSameWtypeIds = function(wtypeId) {
        return this.weapons().some(function(weapon){
            return weapon && weapon.wtypeId === wtypeId;
        });
    };

    Game_Actor.prototype.isEquippedSameAtypeIds = function(atypeId) {
        return this.armors().some(function(armor){
            return armor && armor.atypeId === atypeId;
        });
    };

}());//EOF
