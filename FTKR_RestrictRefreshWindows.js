//=============================================================================
// ウィンドウのリフレッシュ回数を制限して負荷を抑えるプラグイン
// FTKR_RestrictRefreshWindows.js
// プラグインNo : 94
// 作成者　　   : フトコロ
// 作成日　　   : 2018/12/15
// 最終更新日   : 2018/12/16
// バージョン   : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_RRW = true;

//=============================================================================
/*:
 * @plugindesc v1.0.2 ウィンドウのリフレッシュ回数を制限して負荷を抑える
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 各画面におけるウィンドウのリフレッシュ回数を制限して負荷を抑えます。
 * 
 * 制限対象の画面：装備画面
 * 
 * このプラグインによる修正点の解説は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_RestrictRefreshWindows.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1. このプラグインはできる限り、プラグイン管理の一番下に登録してください。
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
 * v1.0.2 - 2018/12/16 : 仕様見直し
 *    1. 装備アイテムウィンドウの _slotId の更新処理を見直し。
 *    2. 装備データ比較用のダミーアクターの作成処理に関する軽量化を追加。
 * 
 * v1.0.1 - 2018/12/15 : 仕様見直し
 *    1. 装備アイテムウィンドウのリフレッシュの挙動を修正。
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

    // ヘルプウィンドウにリフレッシュ禁止フラグ判定を追加
    var _Window_Help_refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_Help_refresh.call(this);
        }
    };
    
    // 装備ステータスウィンドウにリフレッシュ禁止フラグ判定を追加
    var _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
    Window_EquipStatus.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipStatus_refresh.call(this);
        }
    };
    
    // 装備スロットウィンドウにリフレッシュ禁止フラグ判定を追加
    var _Window_EquipSlot_refresh = Window_EquipSlot.prototype.refresh;
    Window_EquipSlot.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipSlot_refresh.call(this);
        }
    };

    // 装備アイテムウィンドウにリフレッシュ禁止フラグ判定を追加
    var _Window_EquipItem_refresh = Window_EquipItem.prototype.refresh;
    Window_EquipItem.prototype.refresh = function() {
        if (!this._disabledRefresh) {
            _Window_EquipItem_refresh.call(this);
        }
    };
    
    /*---------------------------------------------------
    上書きする場合には、ここまでの↑の記述は不要
    ----------------------------------------------------*/


    //=============================================================================
    //装備ステータスウィンドウのinitialize時に refresh() の処理があるが
    //すぐあとのsetActor()でリフレッシュが必要になるため、実行不要
    //上書きする場合は、refresh() の記述を削除すればよい。
    var _Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
    Window_EquipStatus.prototype.initialize = function(x, y) {
        this.onDisabledRefresh();
        _Window_EquipStatus_initialize.call(this, x, y);
        this.offDisabledRefresh(0);
    };
    
    //=============================================================================
    //装備スロットウィンドウのinitialize時に refresh() の処理があるが
    //すぐあとのsetActor()でリフレッシュが必要になるため、実行不要
    //上書きする場合は、refresh() の記述を削除すればよい。
    var _Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
    Window_EquipSlot.prototype.initialize = function(x, y, width, height) {
        this.onDisabledRefresh();
        _Window_EquipSlot_initialize.call(this, x, y, width, height);
        this.offDisabledRefresh(0);
    };
    
    //=============================================================================
    //アイテムウィンドウは、updateで自動的にリフレッシュが実行されるため
    //装備画面遷移時のリフレッシュは無効にする
    //v1.0.1の修正。
    //_slotId の初期値を -1 にしておくことで、装備画面開始時には空欄の
    //装備アイテムウィンドウの余計なリフレッシュを抑制できるほか
    //コマンドウィンドウを経由せずに、直接装備スロットウィンドウを
    //アクティブにした場合でも、正しくリフレッシュが可能になる。
    //v1.0.2の修正
    //initialize()だけでは、アクター変更時に装備アイテムウィンドウが
    //正常に更新できない場合があるため、setActor()内に変更する。
    //また、Scene_Equip の refreshActor()に記述していた無効化処理を
    //setActor() に移す。
    /*---------------------------------------------------
    上書きする場合の記述
    //refresh()を削除し、this._slotId = -1 を追加する。
    //_slotId の記述はif文の外でもよい。
    Window_EquipItem.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._slotId = -1;
            this._actor = actor;
            this.resetScroll();
        }
    };
    ----------------------------------------------------*/
    var _Window_EquipItem_setActor = Window_EquipItem.prototype.setActor;
    Window_EquipItem.prototype.setActor = function(actor) {
        this._slotId = -1;
        this.onDisabledRefresh();
        _Window_EquipItem_setActor.call(this, actor);
        this.offDisabledRefresh(0);
    };
    
    //=============================================================================
    //装備スロットを決定して、装備アイテムウィンドウにカーソルが移る時に
    //ステータスウィンドウとヘルプウィンドウが2回リフレッシュされているため
    //それらを無効化して、別に実行させる
    /*---------------------------------------------------
    上書きする場合の記述
    //activate()の中で select(this._index) が実行されるため
    //先に _index = 0 としておくことで、select(0)の実行不要。
    //これにより、select()実行時のステータスウィンドウと
    //ヘルプウィンドウの更新を１回に抑制できる。

    Scene_Equip.prototype.onSlotOk = function() {
        this._itemWindow._index = 0;
        this._itemWindow.activate();
    };
    ----------------------------------------------------*/
    var _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        this._statusWindow.onDisabledRefresh();
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onSlotOk.call(this);
        this._statusWindow.offDisabledRefresh(1);
        this._helpWindow.offDisabledRefresh(1);
    };

    //=============================================================================
    //装備アイテムを決定して、装備スロットウィンドウにカーソルが移る時に
    //ステータスウィンドウとヘルプウィンドウが2回リフレッシュされているため
    //それらを無効化して、別に実行させる
    /*---------------------------------------------------
    上書きする場合の記述
    //Window_Selectable.prototype.updateHelp は ヘルプウィンドウに
    //空欄文字列をセットする処理であり、setHelpWindowItem()で、すぐに
    //上書きしてしまうので削除する。
    Window_EquipSlot.prototype.updateHelp = function() {
        //Window_Selectable.prototype.updateHelp.call(this);
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    };

    //装備ステータスウィンドウの refresh() を削除
    Scene_Equip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        //this._statusWindow.refresh();
    };
    ----------------------------------------------------*/
    var _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function() {
        this._statusWindow.onDisabledRefresh();
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onItemOk.call(this);
        this._statusWindow.offDisabledRefresh(1);
        this._helpWindow.offDisabledRefresh(1);
    };

    //=============================================================================
    //装備アイテムウィンドウでキャンセルして、装備スロットウィンドウにカーソルが移る時に
    //ヘルプウィンドウが2回リフレッシュされているため、それらを無効化して、別に実行させる
    /*---------------------------------------------------
    上書きする場合の記述
    //上のWindow_EquipSlot.prototype.updateHelpの修正で対応。
    ----------------------------------------------------*/
    var _Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function() {
        this._helpWindow.onDisabledRefresh();
        _Scene_Equip_onItemCancel.call(this);
        this._helpWindow.offDisabledRefresh(1);
    };

    //=============================================================================
    //v1.0.2の修正。
    //一時的に this._statusWindow を空にすることで、元のメソッドで _tempActor のデータを更新させない。
    //メソッドを上書きするのであればこの処理は不要だが、他プラグインとの併用を考慮すると上書きはできないため
    //このような回避策を採用した。
    //
    //_tempActor のデータ更新処理を見直し
    //実行条件に this._index >= 0 を加える。
    //  装備スロットウィンドウからカーソルが移る時に updateHelp() が２回実行されるが
    //  １回目は this._index == -1 のため、_tempActor のデータ更新をされないように修正。
    //  ２回目で this._index == 0 になるため、内部の処理を実行できるようになる。
    //１つめのif文の内部の処理は _tempActor の有無で条件判定を行う。
    //  _tempActor が空の状態(装備スロットから移ってきた時)の時のみ _tempActor のデータ作成を行い、
    //  _tempActor がすでに作成済み(装備アイテム上でカーソル操作時)なら、装備データの反映と
    //  ウィンドウの更新のみ実行するように修正。
    //_tempActorは装備スロットウィンドウにカーソルが戻った時に空になり、 this._index = -1 になる。
    /*---------------------------------------------------
    上書きする場合の記述
    Window_EquipItem.prototype.updateHelp = function() {
        Window_ItemList.prototype.updateHelp.call(this);
        if (this._actor && this._statusWindow && this._index >= 0) {
            if (!this._statusWindow._tempActor) {
                var actor = JsonEx.makeDeepCopy(this._actor);
                actor.forceChangeEquip(this._slotId, this.item());
                this._statusWindow.setTempActor(actor);
            } else {
                this._statusWindow._tempActor.forceChangeEquip(this._slotId, this.item());
                this._statusWindow.refresh();
            }
        }
    };
    ----------------------------------------------------*/
    var _Window_EquipItem_updateHelp = Window_EquipItem.prototype.updateHelp;
    Window_EquipItem.prototype.updateHelp = function() {
        var statusWindow = this._statusWindow;
        this._statusWindow = null;
        _Window_EquipItem_updateHelp.call(this);
        this._statusWindow = statusWindow;
        this.updateTempActorEquip();
    };

    Window_EquipItem.prototype.updateTempActorEquip = function() {
        if (this._actor && this._statusWindow && this._index >= 0) {
            if (!this._statusWindow._tempActor) {
                var actor = JsonEx.makeDeepCopy(this._actor);
                actor.forceChangeEquip(this._slotId, this.item());
                this._statusWindow.setTempActor(actor);
            } else {
                this._statusWindow._tempActor.forceChangeEquip(this._slotId, this.item());
                this._statusWindow.refresh();
            }
        }
    };

}());//EOF
