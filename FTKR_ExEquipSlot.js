//=============================================================================
// 同じ装備タイプの装備を２つ以上装備できるようにするプラグイン
// FTKR_ExEquipSlot.js
// 作成者     : フトコロ
// 作成日     : 2017/06/30
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EES = true;

var FTKR = FTKR || {};
FTKR.EES = FTKR.EES || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 同じ装備タイプの装備を２つ以上装備できるようにする
 * @author フトコロ
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
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/06/30 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExEquipSlot');

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

    //=============================================================================
    // 自作関数(ローカル)
    //=============================================================================

    Window_EquipItem.prototype.checkSameEquipIds = function(etypeId) {
        return matchEquipIds(etypeId, this._actor.equipSlots()[this._slotId]);
    };

    //書き換え
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || !this.checkSameEquipIds(item.etypeId)) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    //=============================================================================
    // 自作関数(ローカル)
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

}());//EOF
