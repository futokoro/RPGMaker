//=============================================================================
// イベントで実行するスクリプトのエラーを無視するプラグイン
// FTKR_IgnoreScriptError.js
// 作成者     : フトコロ
// 作成日     : 2017/05/03
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISE = true;

var FTKR = FTKR || {};
FTKR.ISE = FTKR.ISE || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 イベントで実行するスクリプトのエラーを無視するプラグイン
 * @author フトコロ
 * 
 * @param Display Error Log
 * @desc スクリプトのエラーをコンソールに表示するか
 * 1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * イベント内で実行するスクリプトコマンドがエラーになった場合でも
 * イベントの処理を進めるプラグイン。
 * 
 * スクリプトのエラー内容は、コンソール画面に表示します。
 * 
 * 本プラグインは、デバッグ用として使用してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用上の注意点
 *-----------------------------------------------------------------------------
 * 本来スクリプトでエラーになるとゲームは止まります。
 * 
 * このプラグインは、エラーはログとして取得しますが
 * ゲームはそのまま進めることが出来ます。
 * 
 * ただし、スクリプトのエラーを無視してイベントを進めることで、
 * イベントの動作がおかしくなる可能性があり
 * イベントの組み方によっては、無限ループや自動イベントが
 * 止まらなくなる可能性があります。
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
 * v1.0.0 - 2017/05/03 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ISE.parameters = PluginManager.parameters('FTKR_IgnoreScriptError');

FTKR.ISE.errorLog = Number(FTKR.ISE.parameters['Display Error Log'] || 0);

var tryEval = function(str, errorResult) {
    try {
        return eval(str);
    } catch (e) {
        if(FTKR.ISE.errorLog) {
            console.log('エラースクリプト：', str)
            console.error(e);
        }
        return errorResult;
    }
};

var _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
    var gc = Game_Character;
    var params = command.parameters;
    switch (command.code) {
    case gc.ROUTE_SCRIPT:
        tryEval(params[0]);
        break;
    default:
        _Game_Character_processMoveCommand.call(this, command);
        break;
    }
};

Game_Interpreter.prototype.command355 = function() {
    var script = this.currentCommand().parameters[0] + '\n';
    while (this.nextEventCode() === 655) {
        this._index++;
        script += this.currentCommand().parameters[0] + '\n';
    }
    tryEval(script);
    return true;
};

// Conditional Branch
_Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
    var result = false;
    switch (this._params[0]) {
        case 12:  // Script
            result = !!tryEval(this._params[1]);
            break;
        default:
            return _Game_Interpreter_command111.call(this);
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) {
        this.skipBranch();
    }
    return true;
};

// Control Variables
_Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
    var value = 0;
    switch (this._params[3]) {  // Operand
    case 4:  // Script
        value = tryEval(this._params[4]);
        break;
    default:
        return _Game_Interpreter_command122.call(this);
    }
    for (var i = this._params[0]; i <= this._params[1]; i++) {
        this.operateVariable(i, this._params[2], value);
    }
    return true;
};

