//=============================================================================
// メッセージウィンドウの行数を変更するプラグイン
// FTKR_MessageWindowLines.js
// プラグインNo : 62
// 作成者     : フトコロ
// 作成日     : 2018/01/05
// 最終更新日 : 2018/04/28
// バージョン : v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MWL = true;

var FTKR = FTKR || {};
FTKR.MWL = FTKR.MWL || {};

//=============================================================================
/*:
 * @plugindesc v1.1.2 メッセージウィンドウの行数を変更するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドを実行することで、メッセージウィンドウの
 * 表示行数を n行 に変更します。
 * 
 *   MWL_行数変更 n
 *   MWL_CHANGE_LINES n
 * 
 * この時、イベントコマンド「文章の表示」を２つ以上連続で実行していた場合
 * 連続した「文章の表示」コマンドの内容を連結し、変更した行数に合わせて
 * ウィンドウに表示、改ページを行います。
 * 
 * なお、複数の「文章の表示」コマンドを連結した場合は、
 * ウィンドウの設定(顔画像や表示位置など)は、最初の「文章の表示」コマンドの
 * 内容のみ反映されます。
 * 
 * また、「文章のスクロール表示」コマンドとも連結が可能です。
 * 行数変更中は、「文章のスクロール表示」コマンドを実行すると
 * メッセージウィンドウに表示するようになります。
 * 
 * 変更した行数は、以下のプラグインコマンドを実行することで、元の行数に戻ります。
 * 
 *    MWL_行数リセット
 *    MWL_RESET_LINES
 * 
 * 
 * 例）以下の様にイベントを組んだ場合
 * 
 * ◆プラグインコマンド：MWL_行数変更 7
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：１行目
 * ：　　：２行目
 * ：　　：３行目
 * ：　　：４行目
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：５行目
 * ：　　：６行目
 * ：　　：７行目
 * ：　　：次ページの１行目
 * ◆プラグインコマンド：MWL_行数リセット
 * 
 * このイベントを実行した場合、７行サイズのメッセージウィンドウに
 * １つめの文章の内容すべてと２つめの文章の３行目までの内容をを表示し
 * 改ページ後に、２つめの文章の４行目を表示します。
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
 * 競合対策
 *-----------------------------------------------------------------------------
 * 1. MessageWindowPopup.jsと組み合わせる場合は、以下の通りに使用してください。
 * 
 *    1. プラグインマネージャー(プラグイン管理)では、本プラグインを
 *       下にしてください。
 * 
 *    2. フキダシ有効の状態で表示行数を変更する場合は、
 *       かならず文章の表示コマンドの連結部と表示行数を合わせてください。
 * 
 *       例) 表示行数を 6 行に変更する場合は、以下の様にイベントを組みます。
 *        ◆プラグインコマンド：MWL_行数変更 6
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：１行目
 *        ：　　：２行目
 *        ：　　：３行目
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：４行目
 *        ：　　：５行目
 *        ：　　：６行目
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：２ページ目の１行目
 *        ：　　：２行目
 *        ：　　：３行目
 *        ◆プラグインコマンド：MWL_行数リセット 
 *        上のように新しいページの１行目は、かならず文章の表示コマンドの
 *        最初にします。
 * 
 * 
 *       間違った例）下の場合は、２ページ目を表示できません。
 *        ◆プラグインコマンド：MWL_行数変更 6
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：１行目
 *        ：　　：２行目
 *        ：　　：３行目
 *        ：　　：４行目
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：５行目
 *        ：　　：６行目
 *        ：　　：２ページ目の１行目
 *        ：　　：２行目
 *        ◆文章：なし, ウィンドウ, 下
 *        ：　　：３行目
 *        ◆プラグインコマンド：MWL_行数リセット 
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.2 - 2018/04/28 : 不具合修正
 *    1. 行数変更後のメッセージウィンドウ表示位置が、ウィンドウサイズに合わせて
 *       調整されない不具合を修正。
 * 
 * v1.1.1 - 2018/02/03 : 処理見直し
 *    1. 競合対策として、ウィンドウサイズを変更する処理と、連結した
 *       文章の表示イベントの処理を見直し。
 * 
 * v1.1.0 - 2018/01/06 : 機能追加
 *    1. 行数変更時に、「文章のスクロール表示」を実行すると
 *       メッセージウィンドウに表示するように変更。
 * 
 * v1.0.0 - 2018/01/05 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgNumber = function(arg) {
        try {
            var arg = convertEscapeCharacters(arg);
            return Number(eval(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
    };
    
    var isExistPlugin = function(pluginName) {
        return Object.keys(PluginManager.parameters(pluginName)).length > 0;
    };

    var MessageWindowPopup = isExistPlugin('MessageWindowPopup');

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _MWL_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _MWL_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/MWL_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '行数変更':
            case 'CHANGE_LINES':
                $gameParty.setMwlMessageLines(setArgNumber(args[0]));
                break;
            case '行数リセット':
            case 'RESET_LINES':
                $gameParty.resetMwlMessageLines();
                break;
        }
    };

    Game_Interpreter.prototype.continueAddMwlMessages = function() {
        var count = 0;
        while ([105, 405, 101, 401].contains(this.nextEventCode())) {  // Text data
            if (MessageWindowPopup && count >= $gameParty.mwlMessageLines()) {
                break;
            }
            if ([101, 105].contains(this.nextEventCode())) {
                this._index++;
                continue;
            }
            this._index++;
            count++;
            $gameMessage.add(this.currentCommand().parameters[0]);
        }
    };

    var _MWL_Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        if (!$gameMessage.isBusy() && $gameParty.mwlMessageLines()) {
            $gameMessage.setFaceImage(this._params[0], this._params[1]);
            $gameMessage.setBackground(this._params[2]);
            $gameMessage.setPositionType(this._params[3]);
            this.continueAddMwlMessages();
            switch (this.nextEventCode()) {
            case 102:  // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103:  // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104:  // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
            }
            this._index++;
            this.setWaitMode('message');
            return false;
        } else {
            return _MWL_Game_Interpreter_command101.call(this);
        }
    };

    var _MWL_Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
    Game_Interpreter.prototype.command105 = function() {
        if (!$gameMessage.isBusy() && $gameParty.mwlMessageLines()) {
            this.continueAddMwlMessages();
            switch (this.nextEventCode()) {
            case 102:  // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103:  // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104:  // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
            }
            this._index++;
            this.setWaitMode('message');
            return false;
        } else {
            return _MWL_Game_Interpreter_command105.call(this);
        }
    };

    //=============================================================================
    // Game_Party
    // メッセージスプライトを設定する
    //=============================================================================
    
    Game_Party.prototype.setMwlMessageLines = function(lines) {
        this._mwlMessageLines = lines;
        this._requestResetWindowSize = true;
    };

    Game_Party.prototype.resetMwlMessageLines = function() {
        this._mwlMessageLines = 0;
        this._requestResetWindowSize = true;
    };

    Game_Party.prototype.mwlMessageLines = function() {
        return this._mwlMessageLines;
    };

    Game_Party.prototype.isRequestResetWindowSize = function() {
        return this._requestResetWindowSize;
    }

    Game_Party.prototype.clearRequestResetWindowSize = function() {
        this._requestResetWindowSize = false;
    };
    
    //=============================================================================
    // Window_Message
    //=============================================================================

    var _MWL_Window_Message_numVisibleRows = Window_Message.prototype.numVisibleRows;
    Window_Message.prototype.numVisibleRows = function() {
        return $gameParty.mwlMessageLines() || _MWL_Window_Message_numVisibleRows.call(this);
    };

    Window_Message.prototype.setMWLWindowSize = function() {
        if ($gameParty.isRequestResetWindowSize()) {
            this.y = this._positionType * (Graphics.boxHeight - this.windowHeight()) / 2;
            this.move(this.x, this.y, this.windowWidth(), this.windowHeight());
            this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
            $gameParty.clearRequestResetWindowSize();
        }
    };
    
    var _MWL_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _MWL_Window_Message_updatePlacement.call(this);
        this.setMWLWindowSize();
    };

}());//EOF
