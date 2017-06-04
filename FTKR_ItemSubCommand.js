//=============================================================================
// アイテムボックスにサブコマンドを追加するプラグイン
// FTKR_ItemSubCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/06/04
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

/*:
 * @plugindesc v1.0.0 アイテムボックスにサブコマンドを追加する
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
 * 「捨てる」を実行すると、捨てるアイテムの数を設定します。
 * 数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
 * アイテムを捨てることができます。
 * 
 * 確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
 * することができます。
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
 * v1.0.0 - 2017/06/04 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISC = true;

var FTKR = FTKR || {};
FTKR.ISC = FTKR.ISC || {};

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
            },
            conf:{
                title       :String(parameters['Conf Title Format'] || ''),
                okFormat    :String(parameters['Confirmation Ok Format'] || ''),
                cancelFormat:String(parameters['Confirmation Cancel Format'] || ''),
            },
        },
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
    
    Scene_Item.prototype.createSubCommandWindow = function() {
        var wy = this._itemWindow.y;
        var ww = 240;
        var wh = Graphics.boxHeight - wy;
        this._subCommandWindow = new Window_ItemSubCommand(0, wy, ww, wh);
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
        var wy = this._itemWindow.y;
        var wx = this._subCommandWindow.width;
        var wh = Graphics.boxHeight - wy;
        this._numberWindow = new Window_ItemNumber(wx, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_Item.prototype.onNumberOk = function() {
        if (FTKR.ISC.subcom.enableConf) {
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
        SoundManager.playOk();
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
    //=============================================================================

    function Window_ItemNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_ItemNumber.prototype.constructor = Window_ItemNumber;

    Window_ItemNumber.prototype.refresh = function() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        var width = this.width - this.standardPadding() * 2;
        this.drawText('/MAX ' + this._max, 0, this.itemY() + this.lineHeight(), width, 'right');
    };

    //=============================================================================
    // Window_ItemConfTitle
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
            var width = this.drawTextEx(text, 0, 0);
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

}());//FTKR_ItemSubCommand.js END

//=============================================================================
// Window_ItemSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

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
        {symbol:'discard', enabled:this._item.itypeId !== 2, disp:sep.discard},
        {symbol:'cancel',  enabled:true, disp:sep.cancel},
    ];
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

//EOF