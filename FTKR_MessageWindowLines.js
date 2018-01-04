//=============================================================================
// メッセージウィンドウの行数を変更するプラグイン
// FTKR_MessageWindowLines.js
// 作成者     : フトコロ
// 作成日     : 2018/01/05
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MWL = true;

var FTKR = FTKR || {};
FTKR.MWL = FTKR.MWL || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 メッセージウィンドウの行数を変更するプラグイン
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
 * ：　　：１行目
 * ：　　：２行目
 * ：　　：３行目
 * ：　　：４行目
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
 * v1.0.0 - 2018/01/05 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_MessageWindowLines');

    FTKR.MWL.param1 = Number(parameters[' '] || 0);

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
    
    // Show Text
    Game_Interpreter.prototype.command101 = function() {
        if (!$gameMessage.isBusy()) {
            $gameMessage.setFaceImage(this._params[0], this._params[1]);
            $gameMessage.setBackground(this._params[2]);
            $gameMessage.setPositionType(this._params[3]);
            while (this.nextEventCode() === 401 || this.nextEventCode() === 101) {  // Text data
                if (this.nextEventCode() === 101) {
                   this._index++;
                   continue;
                }
                this._index++;
                $gameMessage.add(this.currentCommand().parameters[0]);
            }
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
        }
        return false;
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

    var _MWL_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        if ($gameParty.isRequestResetWindowSize()) {
            if ($gameParty.mwlMessageLines()) {
                this.height = this.fittingHeight($gameParty.mwlMessageLines());
                this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
            } else {
                this.height = this.windowHeight();
                this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
            }
            $gameParty.clearRequestResetWindowSize();
        }
        _MWL_Window_Message_updatePlacement.call(this);
        this.move(this.x, this.y, this.width, this.height);
    };

}());//EOF
