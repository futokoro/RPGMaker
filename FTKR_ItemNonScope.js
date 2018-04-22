//=============================================================================
// アイテムが範囲なしの場合にパーティーの全メンバーを対象にするプラグイン
// FTKR_ItemNonScope.js
// プラグインNo : 25
// 作成者     : フトコロ
// 作成日     : 2017/04/19
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_INS = true;

var FTKR = FTKR || {};
FTKR.INS = FTKR.INS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アイテムが範囲なしの場合にパーティーの全メンバーを対象にする。
 * @author フトコロ
 *
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを有効にすると、アイテムの基本設定「範囲」が「なし」の場合、
 * アクター選択画面を表示せずにパーティーの全メンバーを対象にします。
 * 
 * 
 * ただし、以下のタグを設定したアイテムは本機能を無効にします。
 * <INS 無効>
 * <INS Disable>
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/04/19 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.INS.parameters = PluginManager.parameters('FTKR_ItemNonScope');

if (!Array.prototype.checkMeta) {
Array.prototype.checkMeta = function(obj) {
    return obj.meta ? this.some(function(meta) {
        return obj.meta[meta];
    }) : false;
};
}

//=============================================================================
// バトル画面でアイテム使用時の対象選択処理
//=============================================================================

FTKR.INS.Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    var targets = [];
    if (!this._forcing && this.subject().isConfused()) {
        targets = [this.confusionTarget()];
    // 範囲なしの場合に、全パーティーメンバーをターゲットにする
    } else if (!['INS 無効','INS DISABLE'].checkMeta(this.item()) && this.checkItemScope([0])) {
        targets = $gameParty.members();
    } else {
        targets = FTKR.INS.Game_Action_makeTargets.call(this);
    }
    return targets;
};

//=============================================================================
// メニュー画面でアイテム使用時の対象選択処理
//=============================================================================
FTKR.INS.Scene_ItemBase_itemTargetActors = Scene_ItemBase.prototype.itemTargetActors;
Scene_ItemBase.prototype.itemTargetActors = function() {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    // 範囲なしの場合に、全パーティーメンバーをターゲットにする
    if (!['INS 無効','INS DISABLE'].checkMeta(this.item()) && action.checkItemScope([0])) {
        return $gameParty.members();
    } else {
        return FTKR.INS.Scene_ItemBase_itemTargetActors.call(this);
    }
};

