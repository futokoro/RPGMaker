//=============================================================================
// アイテムボックスにサブコマンドを追加するプラグイン
// FTKR_ItemSubCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/06/04
// 最終更新日 : 2017/07/23
// バージョン : v1.2.0
//=============================================================================

/*:
 * @plugindesc v1.2.0 アイテムボックスにサブコマンドを追加する
 * @author フトコロ
 *
 * @param --サブコマンド--
 * @default
 *
 * @param Command Use Format
 * @desc 実行コマンドの「使う」のコマンド名を設定します。
 * @default 使う
 *
 * @param Command Discard Format
 * @desc 実行コマンドの「捨てる」のコマンド名を設定します。
 * @default 捨てる
 *
 * @param Command Cancel Format
 * @desc 実行コマンドの「やめる」のコマンド名を設定します。
 * @default やめる
 * 
 * @param Command Position X
 * @desc コマンドウィンドウの左上のX座標を指定します。
 * (デフォルト 0)(-1 で、画面右寄せ)
 * @default 0
 *
 * @param Command Position Y
 * @desc コマンドウィンドウの左上のY座標を指定します。
 * (デフォルト 180)(-1 で、画面下寄せ)
 * @default 180
 *
 * @param Command Width
 * @desc コマンドウィンドウの幅を指定します。
 * (デフォルト 240)(参考値：余白 = 18)(-1 で、画面右端まで)
 * @default 240
 *
 * @param Command Height
 * @desc コマンドウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18)(-1 で、画面下端まで)
 * @default -1
 * 
 * @param --数値入力画面--
 * @default
 * 
 * @param Max Number Format
 * @desc 数値入力ウィンドウで最大数を示す表示内容を設定します。
 * %1 - 手持ちのアイテム数
 * @default /MAX %1
 * 
 * @param Number Position X
 * @desc 数値入力ウィンドウの左上のX座標を指定します。
 * (デフォルト 0)(-1 で、画面右寄せ)
 * @default 240
 *
 * @param Number Position Y
 * @desc 数値入力ウィンドウの左上のY座標を指定します。
 * (デフォルト 180)(-1 で、画面下寄せ)
 * @default 180
 *
 * @param Number Width
 * @desc 数値入力ウィンドウの幅を指定します。
 * (デフォルト 456)(参考値：余白 = 18)(-1 で、画面右端まで)
 * @default 456
 *
 * @param Number Height
 * @desc 数値入力ウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18)(-1 で、画面下端まで)
 * @default -1
 * 
 * @param --確認画面--
 * @default
 *
 * @param Enable Confirmation
 * @desc アイテム廃棄実行時に確認画面を表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @param Conf Title Format
 * @desc アイテム廃棄実行時の確認内容を設定します。
 * %1 - アイテム名, %2 - 捨てる数
 * @default [%1]を[%2]個 捨てますか？
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」のコマンド名を設定します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」のコマンド名を設定します。
 * @default 実行しない
 *
 * @param --サウンド--
 * @default
 *
 * @param Disposal SE Name
 * @desc アイテムを捨てる時のSEを設定します。
 * @default Dicision1
 * @type file
 * @require 1
 * @dir audio/se
 * 
 * @param Disposal SE Pitch
 * @desc アイテムを捨てる時のSEのピッチを設定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 * 
 * @param Disposal SE Volume
 * @desc アイテムを捨てる時のSEの音量を設定します。
 * @default 90
 * @min 0
 * @max 100
 * @type number
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテム選択後にサブコマンドを表示して
 * 実行内容を選択できます。
 * 
 * サブコマンドには以下のコマンドがあります。
 * 1. 使う　 - アイテムを使用します。使用できない場合はグレー表示になります。
 * 2. 捨てる - アイテムを捨てます。「大事なもの」は捨てることが出来ません。
 * 3. やめる - サブコマンドを閉じます。
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
 * アイテムを捨てる
 *-----------------------------------------------------------------------------
 * サブコマンドの「捨てる」を実行すると、捨てるアイテムの数を設定します。
 * 数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
 * アイテムを捨てることができます。
 * 捨てるときのＳＥはプラグインパラメータで設定できます。
 * 
 * 確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
 * することができます。
 * 
 * 以下のタグをアイテムのメモ欄に記載すると、そのアイテムは捨てることが
 * できません。
 * 
 * <捨てられない>
 * <NOT_DISCARDABLE>
 * 
 * また、タグの後ろに数字をつけると、そのＩＤのスイッチがＯＮの間は
 * 捨てることが出来なくなります。
 * 
 * <捨てられない: x>
 * <NOT_DISCARDABLE: x>
 *    x : スイッチＩＤ
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
 * v1.2.0 - 2017/07/23 : 機能追加
 *    1. アイテムに個別に捨てられるかどうか設定する機能を追加。
 *    2. アイテムを捨てる時に任意のＳＥを鳴らす機能を追加。
 * 
 * v1.1.0 - 2017/06/11 : 機能追加
 *    1. サブコマンドのウィンドウサイズと位置を調整する機能を追加。
 *    2. 数値入力画面の最大数の表示内容を変更する機能を追加。
 * 
 * v1.0.0 - 2017/06/04 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISC = true;

var FTKR = FTKR || {};
FTKR.ISC = FTKR.ISC || {};

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemSubCommand');

    FTKR.ISC = {
        subcom:{
            enableConf:Number(parameters['Enable Confirmation'] || 0),
            command:{
                use     :String(parameters['Command Use Format'] || ''),
                discard :String(parameters['Command Discard Format'] || ''),
                cancel  :String(parameters['Command Cancel Format'] || ''),
                posiX   :Number(parameters['Command Position X'] || 0),
                posiY   :Number(parameters['Command Position Y'] || 0),
                width   :Number(parameters['Command Width'] || 0),
                height  :Number(parameters['Command Height'] || 0),
            },
            number:{
                maxFormat:String(parameters['Max Number Format'] || ''),
                posiX   :Number(parameters['Number Position X'] || 0),
                posiY   :Number(parameters['Number Position Y'] || 0),
                width   :Number(parameters['Number Width'] || 0),
                height  :Number(parameters['Number Height'] || 0),
            },
            conf:{
                title       :String(parameters['Conf Title Format'] || ''),
                okFormat    :String(parameters['Confirmation Ok Format'] || ''),
                cancelFormat:String(parameters['Confirmation Cancel Format'] || ''),
            },
            sound:{
                disposal:{
                    name    :String(parameters['Disposal SE Name'] || ''),
                    pitch   :Number(parameters['Disposal SE Pitch'] || 100),
                    pan     :0,
                    volume  :Number(parameters['Disposal SE Volume'] || 90),
                },
            },
        },
    };

    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //=============================================================================
    // アイテム画面の変更
    //=============================================================================

    Window_Selectable.prototype.actSelect = function(index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    var _ISC_Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _ISC_Scene_Item_create.call(this);
        this.createSubCommandWindow();
        this.createNumberWindow();
        if (FTKR.ISC.subcom.enableConf) {
            this.createConfTitleWindow();
            this.createConfWindow();
        }
    };

    //------------------------------------------------------------------------
    //サブコマンドの追加
    //------------------------------------------------------------------------
    //書き換え
    Window_ItemList.prototype.isEnabled = function(item) {
        return true;
    };
    
    Scene_Item.prototype.convertX = function(layout) {
        return layout.posiX === -1 ? Graphics.boxWidth - layout.width : layout.posiX;
    };

    Scene_Item.prototype.convertY = function(layout) {
        return layout.posiY === -1 ? Graphics.boxHeight - layout.height : layout.posiY;
    };

    Scene_Item.prototype.convertWidth = function(layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Scene_Item.prototype.convertHeight = function(layout) {
        return layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height;
    };

    Scene_Item.prototype.createSubCommandWindow = function() {
        var wnd = FTKR.ISC.subcom.command;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var ww = this.convertWidth(wnd);
        var wh = this.convertHeight(wnd);
        this._subCommandWindow = new Window_ItemSubCommand(wx, wy, ww, wh);
        var window = this._subCommandWindow;
        window.setHandler('ok', this.onSubComOk.bind(this));
        window.setHandler('cancel', this.onSubComCancel.bind(this));
        window.hide();
        this.addWindow(window);
    };

    var _ISC_Scene_Item_onitemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function() {
        this._subCommandWindow._item = this._itemWindow.item();
        this._subCommandWindow.show();
        this._subCommandWindow.actSelect(0);
    };

    Scene_Item.prototype.onSubComOk = function() {
        switch (this._subCommandWindow.item().symbol) {
            case 'use':
                this._subCommandWindow.hide();
                _ISC_Scene_Item_onitemOk.call(this);
                break;
            case 'discard':
                var item = this._subCommandWindow._item;
                this._numberWindow.setup(item, $gameParty.numItems(item));
                this._numberWindow.show();
                this._numberWindow.activate();
                break;
            default:
                this.onSubComCancel();
                break;
        }
    };

    Scene_Item.prototype.onSubComCancel = function() {
        this._subCommandWindow.hide();
        this._subCommandWindow.deselect();
        this._numberWindow.hide();
        this._itemWindow.actSelect(this._itemWindow.index());
    };

    //------------------------------------------------------------------------
    //アイテムを捨てる処理の追加
    //------------------------------------------------------------------------
    Scene_Item.prototype.createNumberWindow = function() {
        var wnd = FTKR.ISC.subcom.number;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var wh = this.convertHeight(wnd);
        this._numberWindow = new Window_ItemNumber(wx, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_Item.prototype.onNumberOk = function() {
        if (FTKR.ISC.subcom.enableConf) {
            SoundManager.playOk();
            this._confTitleWindow.setItem(this._subCommandWindow._item, this._numberWindow.number());
            this._confTitleWindow.show();
            this._confWindow.show();
            this._confWindow.actSelect(0);
        } else {
            this.itemDiscard();
        }
    };

    Scene_Item.prototype.onNumberCancel = function() {
        this._numberWindow.hide();
        this._subCommandWindow.actSelect(this._subCommandWindow.index());
    };

    Scene_Item.prototype.itemDiscard = function() {
        AudioManager.playSe(FTKR.ISC.subcom.sound.disposal);
        $gameParty.gainItem(this._subCommandWindow._item, -this._numberWindow.number());
        this.onSubComCancel();
    };

    //------------------------------------------------------------------------
    //確認画面の追加
    //------------------------------------------------------------------------
    Scene_Item.prototype.createConfTitleWindow = function() {
        var wx = Graphics.boxWidth / 4;
        var wh = this._helpWindow.fittingHeight(1);
        var ww = Graphics.boxWidth / 2;
        var wy = Graphics.boxHeight / 2 - wh;
        this._confTitleWindow = new Window_ItemConfTitle(wx, wy, ww, wh);
        this._confTitleWindow.hide();
        this.addWindow(this._confTitleWindow);
    };

    Scene_Item.prototype.createConfWindow = function() {
        var ctw = this._confTitleWindow;
        var wx = ctw.x;
        var wy = ctw.y + ctw.height;
        var ww = ctw.width;
        var wh = this._helpWindow.fittingHeight(1);
        this._confWindow = new Window_ItemConf(wx, wy, ww, wh);
        this._confWindow.setHandler('ok', this.onConfirmationOk.bind(this));
        this._confWindow.setHandler('cancel', this.onConfirmationCancel.bind(this));
        this._confWindow.hide();
        this._confTitleWindow.setWindow(this._confWindow);
        this.addWindow(this._confWindow);
    };

    Scene_Item.prototype.onConfirmationOk = function() {
        if (this._confWindow.item().dicision) {
            this._confTitleWindow.hide();
            this._confWindow.hide();
            this._confWindow.deselect();
            this.itemDiscard();
        } else {
            SoundManager.playCancel();
            this.onConfirmationCancel();
        }
    };

    Scene_Item.prototype.onConfirmationCancel = function() {
        this._confTitleWindow.hide();
        this._confWindow.hide();
        this._confWindow.deselect();
        this.onSubComCancel();
    };

    //=============================================================================
    // Window_ItemNumber
    // 数値入力用クラス
    //=============================================================================

    function Window_ItemNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_ItemNumber.prototype.constructor = Window_ItemNumber;

    Window_ItemNumber.prototype.convertWidth = function(layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Window_ItemNumber.prototype.windowWidth = function() {
        return this.convertWidth(FTKR.ISC.subcom.number);
    };

    Window_ItemNumber.prototype.refresh = function() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        var width = this.width - this.standardPadding() * 2;
        var text = FTKR.ISC.subcom.number.maxFormat.format(this._max);
        var x = width - this.textWidth(text);
        this.drawTextEx(text, x, this.itemY() + this.lineHeight());
    };

    Window_ItemNumber.prototype.playOkSound = function() {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemConfTitle
    // 確認画面用ウィンドウクラス
    //=============================================================================

    function Window_ItemConfTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_ItemConfTitle.prototype.constructor = Window_ItemConfTitle;

    Window_ItemConfTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._number = 0;
        this._confWindow = null;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTitle();
    };

    Window_ItemConfTitle.prototype.drawTitle = function() {
        if (this._item) {
            var text = FTKR.ISC.subcom.conf.title.format(this._item.name, this._number);
            var width = this.textWidth(text);
            this.resizeWindow(width);
            this._confWindow.resizeWindow(width);
            this.drawTextEx(text, 0, 0);
        }
    };

    Window_ItemConfTitle.prototype.resizeWindow = function(width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
    };

    Window_ItemConfTitle.prototype.setItem = function(item, number) {
        this._item = item;
        this._number = number;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.setWindow = function(window) {
        this._confWindow = window;
    };

    //=============================================================================
    // Window_ItemConf
    // 確認用コマンドを表示・処理するウィンドウ
    //=============================================================================

    function Window_ItemConf() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConf.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemConf.prototype.constructor = Window_ItemConf;

    Window_ItemConf.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._dicision = false;
    };

    Window_ItemConf.prototype.maxCols = function() {
        return 2;
    };

    Window_ItemConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_ItemConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_ItemConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.ISC.subcom.conf.okFormat},
            {dicision:false, disp:FTKR.ISC.subcom.conf.cancelFormat}
        ];
    };

    Window_ItemConf.prototype.isEnabled = function(index) {
        return true;
    };

    Window_ItemConf.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_ItemConf.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
        this.changePaintOpacity(1);
    };

    Window_ItemConf.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemConf.prototype.resizeWindow = function(width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
        this.refresh();
    };

    Window_ItemConf.prototype.playOkSound = function() {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemSubCommand
    // スキル選択後の実行用コマンドを表示・処理するウィンドウ
    //=============================================================================

    Window_ItemSubCommand.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemSubCommand.prototype.constructor = Window_ItemSubCommand;

    Window_ItemSubCommand.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._item = null;
        this._symbol = '';
    };

    Window_ItemSubCommand.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_ItemSubCommand.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_ItemSubCommand.prototype.makeItemList = function() {
        this._data = [];
        if (!this._item) return;
        var sep = FTKR.ISC.subcom.command;
        this._data = [
            {symbol:'use',     enabled:$gameParty.canUse(this._item), disp:sep.use},
            {symbol:'discard', enabled:this.isDiscardable(), disp:sep.discard},
            {symbol:'cancel',  enabled:true, disp:sep.cancel},
        ];
    };

    Window_ItemSubCommand.prototype.isDiscardable = function() {
        return this._item.itypeId !== 2 &&
            !hasObjectMeta(this._item, ['捨てられない','Not_discardable']) &&
            !this.checkSw();
    };
    
    Window_ItemSubCommand.prototype.checkSw = function() {
        var id = Number(readObjectMeta(this._item, ['捨てられない','Not_discardable']));
        if (id > 0) {
            return $gameSwitches.value(id);
        } else {
            return false;
        }
    };

    Window_ItemSubCommand.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_ItemSubCommand.prototype.isEnabled = function(index) {
        return this._data[index].enabled;
    };

    Window_ItemSubCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    Window_ItemSubCommand.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemSubCommand.prototype.setItem = function(item) {
        if (this._item === item) return;
        this._item = item;
        this.refresh();
    };

}());//FTKR_ItemSubCommand.js END

//EOF