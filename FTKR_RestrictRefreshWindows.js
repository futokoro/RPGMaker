//=============================================================================
// ウィンドウのリフレッシュ回数を制限して負荷を抑えるプラグイン
// FTKR_RestrictRefreshWindows.js
// プラグインNo : 94
// 作成者　　   : フトコロ
// 作成日　　   : 2018/12/15
// 最終更新日   : 
// バージョン   : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_RRW = true;

//=============================================================================
/*:
 * @plugindesc v1.0.0 ウィンドウのリフレッシュ回数を制限して負荷を抑える
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 各画面におけるウィンドウのリフレッシュ回数を制限して負荷を抑えます。
 * 
 * 制限対象の画面
 *  ・装備画面
 *      ・装備ステータスウィンドウ
 *      ・装備スロットウィンドウ
 *      ・装備アイテムウィンドウ
 *      ・装備画面のヘルプウィンドウ
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. このプラグインはできる限り、プラグイン管理の一番下に登録してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2018 Futokoro
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
 * v1.0.0 - 2018/12/15 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //ウィンドウのリフレッシュを禁止する
    Window_Base.prototype.onDisabledRefresh = function() {
        this._disabledRefresh = true;
    };

    //ウィンドウのリフレッシュ禁止を解除する
    //引数に 1 をセットするとリフレッシュも行う
    Window_Base.prototype.offDisabledRefresh = function(arg) {
        this._disabledRefresh = false;
        if (arg) this.refresh();
    };

    //-----------------------------------------------------------
    // ヘルプウィンドウ
    //-----------------------------------------------------------
    var _Window_Help_refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_Help_refresh.call(this);
        }
    };
    
    //=============================================================================
    // 装備画面のリフレッシュ制限
    //=============================================================================
    //アイテムウィンドウは、updateで自動的にリフレッシュが実行されるのでここでは無効化
    var _Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function() {
        this._itemWindow.onDisabledRefresh();
        _Scene_Equip_refreshActor.call(this);
        this._itemWindow.offDisabledRefresh(0);
    };

    //装備スロットを決定して、装備アイテムウィンドウにカーソルが移る時に
    //ステータスウィンドウとヘルプウィンドウが2回リフレッシュされているので
    //それらを無効化して、別に実行させる
    var _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        this._statusWindow.onDisabledRefresh();
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onSlotOk.call(this);
        this._statusWindow.offDisabledRefresh(1);
        this._helpWindow.offDisabledRefresh(1);
    };

    //装備アイテムを決定して、装備スロットウィンドウにカーソルが移る時に
    //ステータスウィンドウとヘルプウィンドウが2回リフレッシュされているので
    //それらを無効化して、別に実行させる
    var _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function() {
        this._statusWindow.onDisabledRefresh();
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onItemOk.call(this);
        this._statusWindow.offDisabledRefresh(1);
        this._helpWindow.offDisabledRefresh(1);
    };

    //装備アイテムウィンドウでキャンセルして、装備スロットウィンドウにカーソルが移る時に
    //ヘルプウィンドウが2回リフレッシュされているので
    //それらを無効化して、別に実行させる
    var _Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function() {
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onItemCancel.call(this);
        this._helpWindow.offDisabledRefresh(1);
    };

    //-----------------------------------------------------------
    // 装備ステータスウィンドウ
    //-----------------------------------------------------------
    var _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
    Window_EquipStatus.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipStatus_refresh.call(this);
        }
    };
    
    //すぐあとのsetActor()でリフレッシュが必要になるため、initialize時にはリフレッシュ不要
    var _Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
    Window_EquipStatus.prototype.initialize = function(x, y) {
        this.onDisabledRefresh();
        _Window_EquipStatus_initialize.call(this, x, y);
        this.offDisabledRefresh(0);
    };
    
    //-----------------------------------------------------------
    // 装備アイテムウィンドウ
    //-----------------------------------------------------------
    var _Window_EquipItem_refresh = Window_EquipItem.prototype.refresh;
    Window_EquipItem.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipItem_refresh.call(this);
        }
    };
    
    //-----------------------------------------------------------
    // 装備スロットウィンドウ
    //-----------------------------------------------------------
    var _Window_EquipSlot_refresh = Window_EquipSlot.prototype.refresh;
    Window_EquipSlot.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipSlot_refresh.call(this);
        }
    };

    //すぐあとのsetActor()でリフレッシュが必要になるため、initialize時にはリフレッシュ不要
    var _Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
    Window_EquipSlot.prototype.initialize = function(x, y, width, height) {
        this.onDisabledRefresh();
        _Window_EquipSlot_initialize.call(this, x, y, width, height);
        this.offDisabledRefresh(0);
    };
    
        
}());//EOF
