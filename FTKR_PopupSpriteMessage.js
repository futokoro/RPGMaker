//=============================================================================
// 任意のメッセージを画面上にポップアップ表示するプラグイン
// FTKR_PopupSpriteMessage.js
// 作成者     : フトコロ
// 作成日     : 2018/01/05
// 最終更新日 : 2018/02/25
// バージョン : v1.2.0
//=============================================================================
//=============================================================================
// BattleEffectPopup.js　//ベースにしたプラグイン
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_PSM = true;

var FTKR = FTKR || {};
FTKR.PSM = FTKR.PSM || {};

//=============================================================================
/*:
 * @plugindesc v1.2.0 任意のメッセージを画面上にポップアップ表示するプラグイン
 * @author フトコロ
 *
 * @param Max Popup Messages
 * @desc 画面上に表示可能な文字列の数
 * @default 10
 *
 * @param Popup Message Status
 * @desc ポップアップ表示する際の設定
 * 複数のパターンを設定し、プラグインコマンドで呼び出し可能
 * @type struct<popup>[]
 * @default ["{\"fontFace\":\"\",\"fontSize\":\"28\",\"color\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"italic\":\"false\",\"outlineColor\":\"'gray'\",\"popupHeight\":\"40\",\"duration\":\"90\"}"]
 * 
 * @param Repop Message After Menu
 * @desc メニュー開閉後にポップアップを再度表示させるか
 * @type boolean
 * @on 表示させる
 * @off 表示させない
 * @default false
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 画面の任意の位置に、任意の文字列をポップアップさせるプラグインです。
 * マップ画面、バトル画面のどちらでも表示可能です。
 * 
 * ポップアップ時に以下のエフェクトをかけることが可能です。
 *    1. 文字列を１文字ずつ表示
 * 
 * 
 * このプラグインは、トリアコンタンさんのBattleEffectPopup.js(v1.7.1)を
 * ベースにしています。
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
 * 使い方
 *-----------------------------------------------------------------------------
 * １．プラグインパラメータPopup Message Statusに、ポップアップさせる時の
 *     設定を指定してください。
 * 
 * 
 * ２．以下のプラグインコマンドでポップアップを表示します。
 * ※[]は実際の入力に使用しません
 * 
 * PSM_ポップアップ表示 [ポップアップID] [ポップアップ設定ID] [X座標] [Y座標] [表示時間] [文字列]
 * PSM_SHOW_POPUP [popupId] [statusId] [x] [y] [duration] [text]
 * 
 *    ポップアップID(popupId)
 *      ：1から、プラグインパラメータMax Popup Messagesで設定した
 *        値の任意の数字を指定します。\v[n]で変数を指定することも可能です。
 *        この値を変えることで、同時に複数の文字列を表示できます。
 * 
 *    ポップアップ設定ID(statusId)
 *      ：プラグインパラメータPopup Message Statusで設定した内容を呼び出します。
 *        設定時のリスト番号を指定してください。\v[n]で変数を指定することも可能です。
 * 
 *    X座標、Y座標
 *      ：ポップアップを表示する場合の、画面上の座標を指定します。
 *      　\v[n]で変数を指定することも可能です。
 *    
 *    表示時間(duration)
 *      ：ポップアップを表示している時間を指定します。
 *        ここで指定した時間が経過すると、自動的に表示が消えます。
 *        \v[n]で変数を指定することも可能です。
 *        -1 を指定すると、ポップアップが時間経過で消えません。
 *        この場合は、別途プラグインコマンドで消去を行ってください。
 * 
 *    文字列(text)
 *      ：ポップアップする内容を指定します。
 *        半角スペースは使用できません。
 *        半角スペースを入れたい場合は \_ (アンダーバー)と入力してください。
 *        また、以下の制御文字が使用可能です。
 *           \v[n] \N[n] \P[n] \G
 * 
 * 
 * ２．以下のプラグインコマンドでポップアップを移動させます。
 * ※[]は実際の入力に使用しません
 * 
 * PSM_ポップアップ移動 [ポップアップID] [X座標] [Y座標] [移動時間]
 * PSM_MOVE_POPUP [popupId] [x] [y] [duration]
 * 
 *    ポップアップID(popupId)
 *      ：移動したいポップアップIDを指定します。
 *      　\v[n]で変数を指定することも可能です。
 * 
 *    X座標、Y座標
 *      ：ポップアップの移動先の、画面上の座標を指定します。
 *      　\v[n]で変数を指定することも可能です。
 *    
 *    表示時間(duration)
 *      ：ポップアップを移動させる時間を指定します。
 *        \v[n]で変数を指定することも可能です。
 *        0 を指定すると即座に移動します。
 * 
 * 
 * ３．以下のプラグインコマンドでポップアップを回転させます。
 * ※[]は実際の入力に使用しません
 * 
 * PSM_ポップアップ回転 [ポップアップID] [角度] [回転]
 * PSM_ROTATE_POPUP [popupId] [angle] [rotate]
 * 
 *    ポップアップID(popupId)
 *      ：回転したいポップアップIDを指定します。
 *      　\v[n]で変数を指定することも可能です。
 * 
 *    角度(angle)
 *      ：ポップアップを回転させる角度の増減値を指定します。(0 ～ 359)
 *        \v[n]で変数を指定することも可能です。
 *        ポップアップの左上を原点に、正の値で時計周り側に回転します。
 * 
 *    回転(rotate)
 *      ：ポップアップを回転させるかどうかを指定します。
 *        ture で、指定した角度分回転し続けます。
 *        false で、指定した角度に変化させます。
 * 
 * 
 * ４．以下のプラグインコマンドでポップアップを消去します。
 * ※[]は実際の入力に使用しません
 * 
 * PSM_ポップアップ消去 [ポップアップID] [消去時間]
 * PSM_ERASE_POPUP [popupId] [duration]
 * 
 *    ポップアップID(popupId)
 *      ：消去したいポップアップIDを指定します。
 *        \v[n]で変数を指定することも可能です。
 * 
 *    消去時間(duration)
 *      ：ポップアップを消去する時間を指定します。
 *        ここで指定した時間が経過すると、自動的に表示が消えます。
 *        \v[n]で変数を指定することも可能です。
 *        指定しない場合、または 0 を指定すると即座に消えます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * メニュー開閉とポップアップ表示について
 *-----------------------------------------------------------------------------
 * ポップアップ表示中にメニューを開閉すると、ポップアップ表示は消去されます。
 * 
 * プラグインパラメータ<Repop Message After Menu>を「表示する」に
 * 設定することで、メニュー開閉後に再表示させることができます。
 * 
 * 
 * なお、メニュー開閉後の再表示の仕様は以下の通りです。
 * 
 * １．ポップアップのバウンドと、１文字ずつ表示する機能は無効。(即座に表示)
 * ２．ポップアップの移動中にメニューを開閉すると、移動動作をキャンセルし
 * 　　移動後の場所に再表示します。
 * ３．ポップアップの回転中にメニューを開閉すると、初期状態から再回転します。
 * 　　角度を変えた場合は、その角度を維持します。
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
 * v1.2.0 - 2018/02/25 : 機能追加
 *    1. メニュー開閉後にポップアップを再表示させる機能を追加。
 * 
 * v1.1.1 - 2018/02/24 : 不具合修正
 *    1. $gamePartyの初期化処理が間違っていた不具合を修正。
 * 
 * v1.1.0 - 2018/01/06 : 機能追加
 *    1. ポップアップを時間経過で消さない機能と、消去するコマンドを追加
 *    2. ポップアップを移動および回転させるコマンドを追加
 * 
 * v1.0.0 - 2018/01/05 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~popup:
 * @param fontFace
 * @desc 使用するフォントを指定
 * 空欄の場合はMVデフォルトフォントを使用
 * @default 
 *
 * @param fontSize
 * @desc フォントサイズ
 * @type number
 * @default 28
 *
 * @param color
 * @desc 文字列の色を指定、各リストの意味は以下
 * 0:赤, 1:緑 ,2:青 ,3:グレー  (0~255の範囲で指定)
 * @type number[]
 * @default ["0","0","0","0"]
 * 
 * @param italic
 * @desc イタリック体で表示するか
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param outlineColor
 * @desc 文字を縁取り表示する場合にカラーを指定
 * @default 'gray'
 *
 * @param popupHeight
 * @desc ポップアップ時にバウンドさせる高さ
 * @type number
 * @min 0
 * @default 40
 *
 * @param offsetWait
 * @desc 文字を一文字ずつ表示させる場合の時間間隔
 * 0 の場合は、同時に表示
 * @type number
 * @min 0
 * @default 0
 *
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

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgStr = function(arg) {
        return convertEscapeCharacters(arg);
    };

    var setArgNum = function(arg) {
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_PopupSpriteMessage');

    FTKR.PSM = {
        maxPopupMessages : Number(parameters['Max Popup Messages'] || 0),
        popupStatus      : paramParse(parameters['Popup Message Status']),
        repop            : paramParse(parameters['Repop Message After Menu']),
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _PSM_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _PSM_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/PSM_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'ポップアップ表示':
            case 'SHOW_POPUP':
                this.setupPopupMessage(args);
                break;
            case 'ポップアップ移動':
            case 'MOVE_POPUP':
                this.setupMoveMessage(args);
                break;
            case 'ポップアップ回転':
            case 'ROTATE_POPUP':
                this.setupRotateMessage(args);
                break;
            case 'ポップアップ消去':
            case 'ERASE_POPUP':
                $gameParty.requestErasePopupMessage(setArgNum(args[0]), setArgNum(args[1]));
                break;
        }
    };

    Game_Interpreter.prototype.setupPopupMessage = function(args) {
        var status = FTKR.PSM.popupStatus[Number(args[1])];
        $gameParty.setPopupMessage(
          setArgNum(args[0]), setArgNum(args[2]), setArgNum(args[3]), setArgNum(args[4]),
          status.offsetWait, args[5], status.color, 0, status.italic,
          status.fontSize, status.outlineColor, status.popupHeight, status.fontFace
        );
    };

    Game_Interpreter.prototype.setupMoveMessage = function(args) {
        $gameParty.movePopupMessage(
          setArgNum(args[0]), setArgNum(args[1]), setArgNum(args[2]), setArgNum(args[3])
        );
    };

    Game_Interpreter.prototype.setupRotateMessage = function(args) {
        $gameParty.rotatePopupMessage(
          setArgNum(args[0]), setArgNum(args[1]), Boolean(setArgNum(args[2]))
        );
    };

    //=============================================================================
    // Game_Party
    // メッセージスプライトを設定する
    //=============================================================================
    
    var _PSM_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _PSM_Game_Party_initialize.call(this);
        this._psmMessage = [];
    };

    Game_Party.prototype.maxPopupMessages = function() {
        return FTKR.PSM.maxPopupMessages;// 画面に表示可能な文字列の最大数
    };

    Game_Party.prototype.clearPopupMessage = function(messageId) {
        this._psmMessage[messageId].popup = false;
    };

    Game_Party.prototype.clearMoveMessage = function(messageId) {
        this._psmMessage[messageId].move = false;
    };

    Game_Party.prototype.clearRotateMessage = function(messageId) {
        this._psmMessage[messageId].rotate = false;
    }
    
    Game_Party.prototype.requestErasePopupMessage = function(messageId, duration) {
        if (this._psmMessage[messageId]) {
            this._psmMessage[messageId].erase = true;
            this._psmMessage[messageId].eraseDuration = duration;
        }
    };

    Game_Party.prototype.clearErasePopupMessage = function(messageId) {
        this._psmMessage[messageId].erase = false;
        this._psmMessage[messageId].eraseDuration = 0;
    };

    Game_Party.prototype.isPopupMessage = function(messageId) {
        return this._psmMessage[messageId] && this._psmMessage[messageId].popup;
    };

    Game_Party.prototype.isMoveMessage = function(messageId) {
        return this._psmMessage[messageId] && this._psmMessage[messageId].move;
    };

    Game_Party.prototype.isErasePopupMessage = function(messageId) {
        return this._psmMessage[messageId] && this._psmMessage[messageId].erase;
    };

    Game_Party.prototype.eraseDuration = function(messageId) {
        return this._psmMessage[messageId] && this._psmMessage[messageId].eraseDuration || 0
    };

    Game_Party.prototype.movePopupMessage = function(messageId, x2, y2, duration) {
        if (this._psmMessage) {
            var message = this._psmMessage[messageId];
            message.dx = x2;
            message.dy = y2;
            message.moveDuration = duration;
            message.move = true;
        }
    };

    Game_Party.prototype.rotatePopupMessage = function(messageId, speed, rotate) {
        if (this._psmMessage) {
            var message = this._psmMessage[messageId];
            message.rotateSpeed = speed;
            message.rotate = rotate;
        }
    };

    Game_Party.prototype.setPopupMessage = function(messageId, x1, y1, duration,
            offsetCount, text, flashColor, flashDuration, italic,
            fontSize, outlineColor, popupHeight, fontFace) {
        if (!this._psmMessage) this._psmMessage = [];
        this._psmMessage[messageId] = {
            x : x1,
            y : y1,
            duration : duration,
            text : convertEscapeCharacters(text),
            flashColor : flashColor,
            flashDuration : flashDuration,
            popup : true,
            offsetCount : offsetCount,
            italic : italic,
            fontSize : fontSize,
            outlineColor : outlineColor,
            popupHeight : popupHeight,
            fontFace : fontFace,
        };
    };

    Game_Party.prototype.clearPsmMessage = function(messageId) {
        this._psmMessage[messageId] = {};
    };

    Game_Party.prototype.psmMessage = function(messageId) {
        if (!this._psmMessage) this._psmMessage = [];
        return this._psmMessage[messageId];
    };

    //=============================================================================
    // Window_Base
    //  半角スペース用の制御文字を追加
    //=============================================================================
    var _PSM_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _PSM_Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1b_/gi, ' ');
        return text;
    };

    var _PSM_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _PSM_Scene_Map_start.call(this);
        this.repopPsmMessages();
    };

    Scene_Map.prototype.repopPsmMessages = function() {
        if (FTKR.PSM.repop) {
            $gameParty._psmMessage.forEach(function(message, i){
                if (message && message.duration) {
                    message.offsetCount = 0;
                    if (message.dx) message.x = message.dx;
                    if (message.dy) message.y = message.dy;
                    var sprite = this._spriteset._ftPopupMessages[i];
                    sprite.setup(message);
                    sprite.setupSprite(sprite._text);
                }
            },this);
        }
    };

    //=============================================================================
    // Spriteset_Base
    // メッセージスプライトを作成
    //=============================================================================
    var _PSM_Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        _PSM_Spriteset_Base_createUpperLayer.call(this);
        this.createPopupMessages();
    };

    Spriteset_Base.prototype.createPopupMessages = function() {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._messageContainer = new Sprite();
        this._messageContainer.setFrame(x, y, width, height);
        this._ftPopupMessages = [];
        for (var i = 1; i <= this.maxPopupMessages(); i++) {
            this._ftPopupMessages[i] = new Sprite_FtPopupMessage(i);
            this._messageContainer.addChild(this._ftPopupMessages[i]);
        }
        this.addChild(this._messageContainer);
    };

    Spriteset_Base.prototype.maxPopupMessages = function() {
        return $gameParty.maxPopupMessages();
    };

    //=============================================================================
    // Sprite_FtPopupMessage
    // メッセージを表示するスプライト
    //=============================================================================
    function Sprite_FtPopupMessage() {
        this.initialize.apply(this, arguments);
    }

    Sprite_FtPopupMessage.prototype             = Object.create(Sprite_Damage.prototype);
    Sprite_FtPopupMessage.prototype.constructor = Sprite_FtPopupMessage;

    Sprite_FtPopupMessage.prototype.initialize = function(messageId) {
        Sprite_Damage.prototype.initialize.call(this);
        this._messageId = messageId;
        this._messageSprites = [];
        this._index = 0;
        this._offsetCount = -1;
        this._moveDuration = -1;
        this._angle = 0;
        this._duration = 0;
        this._isKeepPopup = false;
    };

    Sprite_FtPopupMessage.prototype.setup = function(message) {
        if (this._messageSprites.length) {
            this._messageSprites.forEach( function(sprite) {
                this.removeChild(sprite);
            },this);
        }
        this._text = message.text;
        this._fontSize = message.fontSize;
        this._fontFace = message.fontFace;
        this._outlineColor = message.outlineColor;
        this._italic = message.italic;
        this._offsetCount = message.offsetCount;
        this._popupHeight = message.popupHeight || 0;
        message.popupHeight = 0;
        this._index = 0;
        this._count = 0;
        this.move(message.x,message.y);// スプライトの原点
        if (message.flashColor) {
            this.setupFlashEffect(message.flashColor, message.flashDuration);
        }
        this._duration = message.duration;
        this.opacity = 255;
    };

    Sprite_FtPopupMessage.prototype.setupSprite = function(text) {
        var bitmap     = this.setupDynamicText(text);
        var sprite     = this.createChildSprite();
        sprite.bitmap  = bitmap;
        sprite.dy      = 0;
        sprite.dw      = bitmap.measureTextWidth(text);
        return sprite;
    };

    Sprite_FtPopupMessage.prototype.setupDynamicText = function(text) {
        var size = this._fontSize;
        var width = (this._italic ? size * 1.5 : size) * text.length;
        var bitmap = new Bitmap(width, size + 8);// 文字の描画領域サイズ
        bitmap.fontSize = size;// フォントサイズ
        if (this._fontFace) {
            bitmap.fontFace = this._fontFace + ',' + bitmap.fontFace;
        }
        if (this._italic) {
            bitmap.fontItalic = true;// イタリック体で表示
        }
        if (this._outlineColor) {
            bitmap.outlineWidth = Math.floor(bitmap.fontSize / 6);// 文字の縁取り太さ
            bitmap.outlineColor = this._outlineColor;// 文字の縁取り色
        }
        bitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');
        return bitmap;
    };

    Sprite_FtPopupMessage.prototype.createChildSprite = function() {
        var sprite = new Sprite();
        sprite.bitmap = this._damageBitmap;
        sprite.anchor.x = 0;// 原点に対する文字の表示位置
        sprite.anchor.y = 0;// 原点に対する文字の表示位置
        sprite.y = -this._popupHeight; // はねる高さ
        sprite.ry = sprite.y;
        return sprite;
    };

    Sprite_FtPopupMessage.prototype.setupFlashEffect = function(flashColor, duration) {
        this._flashColor    = flashColor.clone();
        this._flashDuration = duration;
    };

    Sprite_FtPopupMessage.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateBitmap();
        this.updateDuration();
        this.updatePosition();
        this.updateFlash();
        this.updateOpacity();
    };

    Sprite_FtPopupMessage.prototype.updateBitmap = function() {
        if ($gameParty.isPopupMessage(this._messageId)) {
            var message = this.message();
            this.setup(message);
            $gameParty.clearPopupMessage(this._messageId);
        }
        if (this._text) {
            if (this._offsetCount > 0) {
                if (this._count == 0) {
                    var i = this._index;
                    var sprite = this.setupSprite(this._text[i]);
                    sprite.x = i > 0 ? this._messageSprites[i-1].x + sprite.dw : 0;
                    this._messageSprites[i] = sprite;
                    this.addChild(this._messageSprites[i]);
                    this._count = this.message().offsetCount;
                    this._index++;
                } else if (this._count > 0) {
                    this._count--;
                }
                if (this._index >= this._text.length) this._text = '';
            } else if (this._offsetCount == 0) {
                for (var i = 0; i < this._text.length; i++) {
                    var sprite = this.setupSprite(this._text[i]);
                    sprite.x = i > 0 ? this._messageSprites[i-1].x + sprite.dw : 0;
                    this._messageSprites[i] = sprite;
                    this.addChild(this._messageSprites[i]);
                    this._count = this.message().offsetCount;
                }
                this._text = '';
            } else {
                this._messageSprites[0] = this.setupSprite(this._text);
                this.addChild(this._messageSprites[0]);
                this._text = '';
            }
        }
    };

    Sprite_FtPopupMessage.prototype.message = function() {
        return $gameParty.psmMessage(this._messageId);
    };

    Sprite_FtPopupMessage.prototype.updatePosition = function() {
        if ($gameParty.isMoveMessage(this._messageId)) {
            var message = this.message();
            this._moveDuration = message.moveDuration;
            $gameParty.clearMoveMessage(this._messageId);
        }
        if (this._moveDuration > 0) {
            this._moveDuration--;
            var message = this.message();
            this.x = Math.floor(message.x + (message.dx - message.x) * (1 - this._moveDuration / message.moveDuration));
            this.y = Math.floor(message.y + (message.dy - message.y) * (1 - this._moveDuration / message.moveDuration));
        } else if (this._moveDuration == 0) {
            this._moveDuration--;
            var message = this.message();
            this.x = message.dx;
            message.x = message.dx;
            this.y = message.dy;
            message.y = message.dy;
        }
        if (this.message() && this.message().rotate) {
            this._angle += this.message().rotateSpeed / 2;
        } else if (this.message() && !this.message().rotate && this.message().rotateSpeed) {
            this._angle = this.message().rotateSpeed / 2;
        }
        this.rotation = this._angle * Math.PI / 180;
    };

    Sprite_FtPopupMessage.prototype.updateDuration = function() {
        if (this._duration == -1 && $gameParty.isErasePopupMessage(this._messageId)) {
            this._duration = $gameParty.eraseDuration(this._messageId);
            $gameParty.clearErasePopupMessage(this._messageId);
        }
        if (this._duration == -1) {
            for (var i = 0; i < this.children.length; i++) {
                this.updateChild(this.children[i]);
            }
        } else if (this._duration > 0) {
            this._duration--;
            if (this.message()) this.message().duration = this._duration;
            for (var i = 0; i < this.children.length; i++) {
                this.updateChild(this.children[i]);
            }
        }
        if (this._duration == 0 && this._messageSprites.length) {
            this._messageSprites.forEach( function(sprite) {
                this.removeChild(sprite);
            },this);
            this._moveDuration = -1;
            this._angle = 0;
            $gameParty.clearPsmMessage(this._messageId);
            this._messageSprites = [];
        }
    };

    Sprite_FtPopupMessage.prototype.updateOpacity = function() {
        if (this._duration >= 0 && this._duration < 10) {
            this.opacity = 255 * this._duration / 10;
        }
    };

}());//EOF
