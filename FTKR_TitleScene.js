//=============================================================================
// タイトルシーンを改造するプラグイン
// FTKR_TitleScene.js
// プラグインNo : 85
// 作成者     : フトコロ
// 作成日     : 2018/05/06
// 最終更新日 : 2019/04/14
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_TS = true;

var FTKR = FTKR || {};
FTKR.TS = FTKR.TS || {};

//=============================================================================
/*:ja
 * @plugindesc v1.0.1 タイトルシーンを改造するプラグイン
 * @author フトコロ
 *
 * @param コンティニューコマンド
 * @desc コンティニューを表示するかどうか設定します。
 * @default 1
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 *
 * @param オプションコマンド
 * @desc オプションを表示するかどうか設定します。
 * @default 1
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 *
 * @param クレジットコマンド
 * @desc クレジットを表示するか設定します。
 * @default
 * @type struct<credit>
 * 
 * @param コマンドウィンドウ設定
 * @desc コマンドウィンドウのレイアウトを変更します。
 * @default {"fontsize":"28","padding":"18","lineHeight":"36","opacity":"192","hideFrame":"1"}
 * @type struct<window>
 * 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * タイトルシーンを改造します。
 * 
 * １．コンティニューとオプションの表示有無を設定できます。
 * ２．タイトルコマンドのフォントサイズや色を変更できます。
 * ３．コマンドにクレジットを追加できます。
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
 * Copyright (c) 2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2019/04/14 : 不具合修正
 *    1. プラグインパラメータのクレジットコマンドを設定しない場合にエラーになる不具合を修正。
 * 
 * v1.0.0 - 2018/05/06 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~credit:
 * @param enable
 * @text クレジットコマンド表示
 * @desc コマンドを表示するか指定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * 
 * @param name
 * @text クレジットコマンド名
 * @desc コマンドの表示名を設定します。
 * @type text
 * @default "クレジット"
 * 
 * @param enableType
 * @text 素材種類選択
 * @desc 素材種類の選択コマンドを表示するか指定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * 
 * @param helpDesc
 * @text クレジットヘルプ説明
 * @desc クレジット画面のヘルプウィンドウ説明文を設定します。"文章"で制御文字を使用できます。
 * @type text
 * @default "このゲームに使用している素材のクレジットを\n作者敬称略にて表示します。"
 * 
 * @param itemList
 * @text クレジット対象
 * @desc クレジットとして表示する対象を設定します。
 * @type struct<creditItem>[]
 * @default []
 * 
*/
/*~struct~creditItem:
 * @param itemName
 * @text 素材名
 * @desc 素材の名称を設定します。
 * @type text
 * @default 
 * 
 * @param itemType
 * @text 素材種類
 * @desc 素材の種類を指定します。
 * @type select
 * @default 
 * @option その他
 * @value 0
 * @option プラグイン
 * @value 1
 * @option 画像
 * @value 2
 * @option 音声
 * @value 3
 * @option フォント
 * @value 4
 * @option 動画
 * @value 5
 * 
 * @param authorName
 * @text 素材作者名
 * @desc 素材作者の名称を設定します。(敬称略)
 * @type text
 * @default 
 * 
 * @param itemLink
 * @text 素材入手先
 * @desc 素材入手先アドレスを設定します。
 * @type text
 * @default 
 * 
 * @param itemDesc
 * @text 素材の説明
 * @desc 素材の説明文を記述します。"文章"で制御文字が使用できます。
 * @type text
 * @default 
 * 
*/
/*~struct~window:
 * @param fontsize
 * @text フォントサイズ
 * @desc タイトルコマンドのフォントサイズを設定します。
 * @default 28
 * @type number
 *
 * @param padding
 * @text 余白サイズ
 * @desc タイトルコマンドウィンドウの余白サイズを設定します。
 * @default 18
 * @type number
 * @min 0
 *
 * @param lineHeight
 * @text 行高さ
 * @desc タイトルコマンドウィンドウの行高さを設定します。
 * 0 - フォントサイズに合わせて自動調整します。
 * @default 36
 * @type number
 * @min 0
 *
 * @param opacity
 * @text 背景透明度
 * @desc ウィンドウ内の背景の透明度を設定します。
 * @default 192
 * @type number
 * @min 0
 * 
 * @param hideFrame
 * @text 枠表示有無
 * @desc ウィンドウ枠を表示するかどうか設定します。
 * @default 1
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
*/

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_TitleScene');

    FTKR.TS = {
        command : {
            continue : Number(parameters['コンティニューコマンド'] || 0),
            option   : Number(parameters['オプションコマンド'] || 0),
        },
        credit  : paramParse(parameters['クレジットコマンド']) || {},
        window  : paramParse(parameters['コマンドウィンドウ設定']) || {},
        typeName : [
            'その他',
            'プラグイン',
            '画像',
            '音声',
            'フォント',
            '動画'
        ],
    };

    /*-------------------------------------------------------------------------/
    // Scene_Title
    /-------------------------------------------------------------------------*/
    var _TS_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _TS_Scene_Title_create.call(this);
        if (this.onCredit()) {
            this.createHelpWindow();
            if (this.onCreditType()) {
                this.createCreditItemTypeWindow();
            }
            this.createCreditItemListWindow();
        }
    };

    Scene_Title.prototype.onCredit = function() {
        return FTKR.TS.credit && FTKR.TS.credit.enable;
    };

    Scene_Title.prototype.onCreditType = function() {
        return FTKR.TS.credit && FTKR.TS.credit.enableType;
    };

    Scene_Title.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this._helpWindow._openness = 0;
        this.addWindow(this._helpWindow);
        this._helpWindow.setText(FTKR.TS.credit.helpDesc);
        this._helpWindow.close();
    };

    var _TS_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _TS_Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('credit',  this.commandCredit.bind(this));
    };

    Scene_Title.prototype.commandCredit = function() {
        this._commandWindow.close();
        this._helpWindow.open();
        if (this.onCreditType()) {
            this._creditTypeWindow.open();
            this._creditTypeWindow.activate();
            this._creditTypeWindow.select(0);
        } else {
            this._creditListWindow.activate();
            this._creditListWindow.select(0);
        }
        this._creditListWindow.open();
    };

    var _TS_Scene_Title_isBusy = Scene_Title.prototype.isBusy;
    Scene_Title.prototype.isBusy = function() {
        var active = this.onCredit() ?
            this.onCreditType() ? this._creditTypeWindow.active || this._creditListWindow.active : this._creditListWindow.active :
            false;
        return active || _TS_Scene_Title_isBusy.call(this);
    };

    Scene_Title.prototype.createCreditItemTypeWindow = function() {
        var y = this._helpWindow.y + this._helpWindow.height;
        this._creditTypeWindow = new Window_CreditItemType(0, y);
        this._creditTypeWindow.setHandler('type',  this.typeSelect.bind(this));
        this._creditTypeWindow.setHandler('cancel',  this.cancelCreditType.bind(this));
        this.addWindow(this._creditTypeWindow);
    };

    Scene_Title.prototype.createCreditItemListWindow = function() {
        var y = this.onCreditType() ? 
            this._creditTypeWindow.y + this._creditTypeWindow.height :
            this._helpWindow.y + this._helpWindow.height;
        this._creditListWindow = new Window_CreditItemList(0, y);
        this._creditListWindow.setHandler('cancel',  this.cancelCreditList.bind(this));
        if (this.onCreditType()) this._creditTypeWindow.setWindow(this._creditListWindow);
        this.addWindow(this._creditListWindow);
    };

    Scene_Title.prototype.typeSelect = function() {
        this._creditListWindow.select(0);
        this._creditListWindow.activate();
    };

    Scene_Title.prototype.cancelCreditType = function() {
        this._helpWindow.close();
        this._creditTypeWindow.close();
        this._creditListWindow.close();
        this._commandWindow.open();
        this._commandWindow.activate();
    };

    Scene_Title.prototype.cancelCreditList = function() {
        if (this.onCreditType()) {
            this._creditTypeWindow.activate();
            this._creditListWindow.deselect();
        } else {
            this._helpWindow.close();
            this._creditListWindow.close();
            this._commandWindow.open();
            this._commandWindow.activate();
        }
    };

    /*-------------------------------------------------------------------------/
    // Window_CreditItemType
    /-------------------------------------------------------------------------*/
    function Window_CreditItemType() {
        this.initialize.apply(this, arguments);
    }

    Window_CreditItemType.prototype = Object.create(Window_HorzCommand.prototype);
    Window_CreditItemType.prototype.constructor = Window_CreditItemType;

    Window_CreditItemType.prototype.initialize = function(x, y) {
        this._itemTypes = [];
        if (!FTKR.TS.credit.itemList) FTKR.TS.credit.itemList = [];
        this._listNum = FTKR.TS.credit.itemList.filter( function(item){
                if (!this._itemTypes.contains(item.itemType)) {
                    this._itemTypes.push(item.itemType);
                    return true;
                }
            },this).length;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this._openness = 0;
        this.close();
        this.deactivate();
    };
/*
    Window_CreditItemType.prototype.loadWindowskin = function() {
        Window_HorzCommand.prototype.loadWindowskin.call(this);
        this._openness = 0;
    };
*/
    Window_CreditItemType.prototype.setWindow = function(listWindow) {
        this._listWindow = listWindow;
    };

    Window_CreditItemType.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_CreditItemType.prototype.maxCols = function() {
        return Math.min(this._listNum, 4);
    };

    Window_CreditItemType.prototype.makeCommandList = function() {
        this._itemTypes.forEach( function(type){
            this.addCommand(FTKR.TS.typeName[type], 'type', true, type);
        },this);
    };

    Window_CreditItemType.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (this._listWindow) {
            this._listWindow.setTypeId(this.currentExt());
        }
    };

    /*-------------------------------------------------------------------------/
    //Window_CreditItemList
    /-------------------------------------------------------------------------*/
    function Window_CreditItemList() {
        this.initialize.apply(this, arguments);
    }

    Window_CreditItemList.prototype = Object.create(Window_Selectable.prototype);
    Window_CreditItemList.prototype.constructor = Window_CreditItemList;

    Window_CreditItemList.prototype.initialize = function(x, y, onCtype) {
        this._onCtype = onCtype;
        var width = this.windowWidth();
        var height = Graphics.boxHeight - y;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._openness = 0;
        this.close();
        this.refresh();
    };

    Window_CreditItemList.prototype.lineHeight = function() {
        return 24;
    };

    Window_CreditItemList.prototype.standardFontSize = function() {
        return 18;
    };

    Window_CreditItemList.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_CreditItemList.prototype.setTypeId = function(typeId) {
        if (this._typeId !== typeId) {
            this._typeId = typeId;
            this.refresh();
            this.resetScroll();
        }
    };

    Window_CreditItemList.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_CreditItemList.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_CreditItemList.prototype.makeItemList = function() {
        if (this._onCtype) {
            this._data = FTKR.TS.credit.itemList.filter(function(item) {
                return item && item.itemType == this._typeId;
            }, this);
        } else {
            this._data = FTKR.TS.credit.itemList.map(function(item) {
                return item;
            }, this);
        }
    };

    Window_CreditItemList.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_CreditItemList.prototype.itemHeight = function() {
        return this.lineHeight() * 5;
    };

    Window_CreditItemList.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (item) {
            var dw = this.textWidth('00') * 5;
            var rect = this.itemRect(index);
            var h = this.lineHeight();
            var halfW = rect.width / 2;
            rect.width -= this.textPadding();
            //1行目
            this.changeTextColor(this.systemColor());
            this.drawText('素材名　：', rect.x, rect.y, dw);
            this.resetTextColor();
            this.drawText(item.itemName, rect.x + dw, rect.y, halfW - dw);
            this.changeTextColor(this.systemColor());
            this.drawText('製作者名：', rect.x + halfW, rect.y, dw);
            this.resetTextColor();
            this.drawText(item.authorName, rect.x + halfW + dw, rect.y, halfW - dw);
            //2行目
            this.changeTextColor(this.systemColor());
            this.drawText('入手先　：', rect.x, rect.y + h*1, dw);
            this.resetTextColor();
            this.drawText(item.itemLink, rect.x + dw, rect.y + h*1, rect.width - dw);
            //3-4行目
            this.changeTextColor(this.systemColor());
            this.drawText('素材説明：', rect.x, rect.y + h*2, rect.width);
            this.resetTextColor();
            this.drawTextEx(item.itemDesc, rect.x + dw, rect.y + h*2, rect.width - dw);
        }
    };

    /*-------------------------------------------------------------------------/
    // Window_TitleCommand
    /-------------------------------------------------------------------------*/

    Window_TitleCommand.prototype.makeCommandList = function() {
        var com = FTKR.TS.command;
        var credit = FTKR.TS.credit;
        this.addCommand(TextManager.newGame,   'newGame');
        if (com.continue) this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        if (com.option) this.addCommand(TextManager.options,   'options');
        if (credit && credit.enable) this.addCommand(credit.name, 'credit');
    };

    Window_TitleCommand.prototype.standardFontSize = function() {
        return FTKR.TS.window.fontsize;
    };

    Window_TitleCommand.prototype.standardPadding = function() {
        return FTKR.TS.window.padding;
    };

    Window_TitleCommand.prototype.lineHeight = function() {
        var height = FTKR.TS.window.lineHeight;
        return height ? height : FTKR.TS.window.fontsize + 8;
    };

    Window_TitleCommand.prototype.standardBackOpacity = function() {
        return FTKR.TS.window.opacity;
    };

    Window_TitleCommand.prototype._refreshFrame = function() {
        if (FTKR.TS.window.hideFrame) Window.prototype._refreshFrame.call(this);
    };

}());//EOF
