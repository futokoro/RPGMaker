//=============================================================================
// イベントコマンドのスクリプトに制御文字を使う
// FTKR_ConvertEscapeCharactersInScript.js
// プラグインNo : 87
// 作成者　　   : フトコロ
// 作成日　　   : 2018/08/13
// 最終更新日   : 2018/08/15
// バージョン   : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CEC = true;

var FTKR = FTKR || {};
FTKR.CEC = FTKR.CEC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 イベントコマンドのスクリプトに制御文字を使う
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * イベントコマンドのスクリプト(変数の操作と条件分岐含む))に
 * 制御文字を使えるようにします。
 * 
 * 使える制御文字は以下の通りです。
 * 
 * \V[n]  :変数ID n の変数の値を参照。
 * \A[n]  :アクターID n のアクター名を参照。
 * \P[n]  :パーティーの先頭から n 番目のパーティーメンバー名を参照。
 *         (先頭を 0 と数える)
 * \G     :お金の単位を参照。
 * \S[n]  :スイッチID n のスイッチの真偽を参照。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合には、このプラグインの登録順番を
 *    以下のようにしてください。
 * 
 *    FTKR_IgnoreScriptError.js
 *    FTKR_ConvertEscapeCharactersInScript.js
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
 * v1.0.1 - 2018/08/15 : 移動ルートのスクリプトの不具合修正
 * v1.0.0 - 2018/08/13 : 初版作成
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

    var convertGameDatas = function(text) {
        text = convertEscapeCharacters(text);
        text = text.replace(/\x1bS\[(\d+)\]/gi, function() {
            return $gameSwitches.value(parseInt(arguments[1]));
        }.bind(this));
        return text;
    };

    //移動ルートの設定
    var _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        if (command.code == Game_Character.ROUTE_SCRIPT) {
            if (!this._originalScriptCommands) {
                this._originalScriptCommands = [];
            }
            if (!this.originalScriptCommand()) {
                this.setOrizialScriptCommand(command);
            }
            if (command.parameters[0] !== this.originalScriptCommand()) {
                command.parameters[0] = this.originalScriptCommand();
            }
            command.parameters[0] = convertGameDatas(command.parameters[0]);
        }
        _Game_Character_processMoveCommand.call(this, command);
    };

    Game_Character.prototype.originalScriptCommand = function() {
        return this._originalScriptCommands[this._moveRouteIndex];
    };

    Game_Character.prototype.setOrizialScriptCommand = function(command) {
        this._originalScriptCommands[this._moveRouteIndex] = command.parameters[0];
    };

    // Conditional Branch 条件分岐
    var _Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
    Game_Interpreter.prototype.command111 = function() {
        if (this._params[0] == 12) {
            this._params[1] = convertGameDatas(this._params[1]);
        }
        return _Game_Interpreter_command111.call(this);
    };

    // Control Variables 変数の操作
    var _Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
    Game_Interpreter.prototype.command122 = function() {
        if (this._params[0] == 4) {
            this._params[4] = convertGameDatas(this._params[4]);
        }
        return _Game_Interpreter_command122.call(this);
    };

    // Script スクリプト
    Game_Interpreter.prototype.setScriptCodes = function() {
        var text = convertGameDatas(this.currentCommand().parameters[0]);
        var script = text + '\n';
        while (this.nextEventCode() === 655) {
            this._index++;
            text = convertGameDatas(this.currentCommand().parameters[0]);
            script += text + '\n';
        }
        return script;
    };

    if (!Imported.FTKR_ISE) {
    Game_Interpreter.prototype.command355 = function() {
        eval(this.setScriptCodes());
        return true;
    };
    }//!Imported.FTKR_ISE

}());//EOF
