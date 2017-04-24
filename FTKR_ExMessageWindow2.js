//=============================================================================
// 一度に複数のメッセージウィンドウを表示するプラグイン(v2)
// FTKR_ExMessageWindow2.js
// 作成者     : フトコロ
// 作成日     : 2017/04/24
// 最終更新日 : 
// バージョン : v2.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EMW = true;

var FTKR = FTKR || {};
FTKR.EMW = FTKR.EMW || {};

//=============================================================================
/*:
 * @plugindesc v2.0.0 一度に複数のメッセージウィンドウを表示するプラグイン
 * @author フトコロ
 * 
 * @param Create ExWindow Number
 * @desc 拡張ウィンドウを生成する数を設定します。
 * 0 - マップ上のイベントの数だけ生成します
 * @default 1
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを使用することで、文章の表示イベントで以下の動作が
 * 可能になります。
 * 
 * １．複数のメッセージウィンドウを画面に表示できます。
 * 
 * ２．メッセージ表示中にプレイヤーの行動を許可できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. YEP_MessageCore.jsと組み合わせる場合は、本プラグインを
 *    YEP_MessageCore.jsよりも下に配置してください。
 * 
 * 3. 本プラグインは、FTKR_ExMessageWindow.js (v1.x.x)と組み合わせて
 *    使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウ と メッセージウィンドウIDについて
 *-----------------------------------------------------------------------------
 * 本プラグインを有効にすると、イベントコマンド「文章の表示」に
 * 使用するウィンドウに、MVデフォルトのメッセージウィンドウとは別の
 * 拡張メッセージウィンドウを使用することができます。
 * 
 * 拡張メッセージウィンドウには、メッセージウィンドウIDを持っており
 * このIDを変えることで、一度に複数のウィンドウを表示させることができます。
 * 
 * メッセージウィンドウIDは、プラグインのデフォルトで ID0 を使用します。
 * ID0 - MVデフォルトのメッセージウィンドウ
 * 
 * ただし、プラグインパラメータ<Create ExWindow Number>を 0 に設定した場合は
 * 文章を表示するイベントのIDと同じIDのメッセージウィンドウを使用します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウを使用した文章の表示方法
 *-----------------------------------------------------------------------------
 * 以下にイベント例を示します。
 * 
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：会話中に行動可能になる制御文字が使えるぜ！
 * ：　　：いいだろう？
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：いいね！
 * 
 * プラグインコマンド「EMW_メッセージウィンドウ指定 x」を使うことで
 * 表示させるウィンドウを指定します。
 * 
 * 上記の例では、一つ目の文章をメッセージウィンドウID1に表示し、
 * 二つ目の文章をID2に表示します。
 * このように、文章イベントの実行前にプラグインコマンドで設定します。
 * 
 * ただし、このままではメッセージウィンドウID1とメッセージウィンドウID2は
 * 同時に表示しません。
 * メッセージウィンドウID1が消えた後にメッセージウィンドウID2が表示します。
 * 
 * 
 * メッセージウィンドウID1を表示したままメッセージウィンドウID2を表示させる
 * ためには、以下のイベントの組み方が必要です。
 * 
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1 終了禁止
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：会話中に行動可能になる制御文字が使えるぜ！
 * ：　　：いいだろう？\^
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2 終了禁止
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：いいね！
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：だよな
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2 終了許可
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：俺もやってみるよ！
 * ◆プラグインコマンド：EMW_メッセージウィンドウ強制終了 1
 * 
 * 今度は、二人が交互に２回会話するイベントです。
 * 先ほどの例とことなり、プラグインコマンドの引数が変わっています。
 * 
 * ウィンドウ指定のコマンドに、'終了禁止'をつけることで
 * 指定したウィンドウをウィンドウを閉じなくすることができます。
 * 
 * 最後の文章表示前のプラグインコマンドの'終了許可'によって
 * ウィンドウID2は、文章表示後にウィンドウが閉じるようになります。
 * 
 * また、最後のコマンドによって、ウィンドウID1は強制的に閉じます。
 * 
 * 
 * このような流れで、メッセージウィンドウを複数表示することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動許可の設定方法
 *-----------------------------------------------------------------------------
 * 以下の制御文字を文章中に入力することで、メッセージ表示中の
 * プレイヤーの行動可否を設定できます。
 * 
 * \EMP - 行動を許可
 * \DMP - 行動を禁止
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動許可中の文章の表示
 *-----------------------------------------------------------------------------
 * イベントの文章表示中にプレイヤーの行動を許可した場合、別のイベントと
 * 会話イベントを起こすことが可能です。
 * 
 * この場合、文章表示中のメッセージウィンドウIDとは別のIDのウィンドウに
 * 表示させる必要があります。
 * 
 * 文章表示のイベントコマンドの前に、ウィンドウを指定するコマンドを
 * 実行してください。
 * 
 * なお、プラグインパラメータ<Create ExWindow Number>を 0 に設定した場合は
 * ウィンドウを指定する必要はありません。
 * 
 * ただし、この設定は、マップ中にあるすべてのイベントの数だけ
 * ウィンドウデータを生成するため、イベントの数が多いとその分処理が
 * 重くなります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 1. 文章の表示の強制終了
 * 
 * EMW_メッセージウィンドウ強制終了
 * EMW_メッセージウィンドウ強制終了 Id
 * 
 * 表示されているメッセージウィンドウを強制的に閉じます。
 *  Id - イベントコマンド「文章の表示」で表示したウィンドウを閉じます。
 *       メッセージウィンドウのID番号を指定してください。
 *       指定しない場合は、MVデフォルトのウィンドウ(ID0)を閉じます。
 * 
 * 
 * 2. 文章を表示するウィンドウを指定
 * 
 * EMW_メッセージウィンドウ指定 Id (終了禁止/終了許可)
 * 
 * このコマンド以降に文章を表示する場合に使用する拡張ウィンドウの
 * メッセージウィンドウIDを指定します。
 * 
 * '終了禁止' または '終了許可' をつけると
 * IDの指定と合わせて、ウィンドウの開閉設定ができます。
 * 
 * 
 * 3. 文章を表示するウィンドウの指定をリセット
 * 
 * EMW_メッセージウィンドウリセット
 * 
 * このコマンド以降に文章を表示する場合に使用する拡張ウィンドウの
 * メッセージウィンドウIDをリセットします。(ID0 になる)
 * 
 * 
 * 4. メッセージウィンドウの終了禁止(ウィンドウが閉じない)
 * 
 * EMW_メッセージウィンドウ終了禁止 Id
 * 
 * 指定したIDのウィンドウはメッセージ表示後に閉じなくなります。
 * 禁止設定にしたウィンドウを閉じるためには以下の動作が必要です。
 * 
 *   a. 強制終了コマンドで閉じる
 *   b. 終了許可設定にした上で、新たにメッセージを表示させる。
 * 
 * 
 * 5. メッセージウィンドウの終了許可(ウィンドウが閉じる)
 * 
 * EMW_メッセージウィンドウ終了許可 Id
 * 
 * 指定したIDのウィンドウはメッセージ表示後に閉じるようになります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプト
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウのゲームデータは以下のスクリプトで参照できます。
 * $gameMessageEx.window(メッセージウィンドウID)
 * 
 * なお、以下のスクリプトは同じ意味です。
 * $gameMessage
 * $gameMessageEx.window(0)
 * 
 * 
 * 拡張メッセージウィンドウのゲームデータに使用できる関数や変数は
 * MVデフォルトのメッセージウィンドウ($gameMessage)と同じです。
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
 * v1.0.0 - 2017/04/24 : 仕様全面見直し
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EMW.parameters = PluginManager.parameters('FTKR_ExMessageWindow2');

FTKR.EMW.exwindowNum = Number(FTKR.EMW.parameters['Create ExWindow Number'] || '');
FTKR.EMW.nameWindows = [];

//=============================================================================
// プラグインコマンド
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.match(/EMW_(.+)/i)) {
        command = RegExp.$1;
        switch (true) {
            case /メッセージウィンドウ指定/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0 && windowId <= FTKR.EMW.exwindowNum) {
                    this._windowId = windowId;
                    if (args[1] === '終了禁止') {
                        $gameMessageEx.window(windowId).prohibitClose();
                    } else if (args[1] === '終了許可') {
                        $gameMessageEx.window(windowId).clear();
                        $gameMessageEx.window(windowId).permitClose();
                    }
                }
                break;
            case /メッセージウィンドウリセット/i.test(command):
                this._windowId = 0;
                break;
            case /メッセージウィンドウ強制クローズ/i.test(command):
            case /メッセージウィンドウ強制終了/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0 && windowId <= FTKR.EMW.exwindowNum) {
                    $gameMessageEx.window(windowId).terminate();
                }
                break;
            case /メッセージウィンドウ終了禁止/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0 && windowId <= FTKR.EMW.exwindowNum) {
                    $gameMessageEx.window(windowId).prohibitClose();
                }
                break;
            case /メッセージウィンドウ終了許可/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0 && windowId <= FTKR.EMW.exwindowNum) {
                    $gameMessageEx.window(windowId).permitClose();
                }
                break;
        }
    }
};

//=============================================================================
// 制御文字を追加
//=============================================================================

FTKR.EMW.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'EMP':
        !this._windowId ? $gameMessage.enabledCanMovePlayer() :
            $gameMessageEx.window(this._windowId).enabledCanMovePlayer();
        break;
    case 'DMP':
        !this._windowId ? $gameMessage.disabledCanMovePlayer() :
            $gameMessageEx.window(this._windowId).disabledCanMovePlayer();
        break;
    default:
        FTKR.EMW.Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
};

//=============================================================================
// メッセージ表示中でも行動可能にする処理を追加
// \EMP  \DMP
//=============================================================================

//------------------------------------------------------------------------
// Window_Message
//------------------------------------------------------------------------

FTKR.EMW.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
    FTKR.EMW.Window_Message_initialize.call(this);
    this._windowId = this._windowId || 0;
};

Window_Message.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing() && !$gameMessageEx.window(this._windowId).isLastText()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            this.startMessage();
        } else {
            this.startInput();
            return;
        }
    }
};

FTKR.EMW.Window_Message_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if ($gameMessage.isTerminate()) {
        this._waitCount = 0;
        if(this._textState) this._textState.index = this._textState.text.length;
        this._pauseSkip = true;
        return false;
    }
    return FTKR.EMW.Window_Message_updateWait.call(this);
};

FTKR.EMW.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    if ($gameMessage.canClose()) FTKR.EMW.Window_Message_terminateMessage.call(this);
};

//------------------------------------------------------------------------
// Game_Message
//------------------------------------------------------------------------
FTKR.EMW.Game_Message_initialize = Game_Message.prototype.initialize;
Game_Message.prototype.initialize = function() {
    FTKR.EMW.Game_Message_initialize.call(this);
    this._permissionClose = true;
};

FTKR.EMW.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    FTKR.EMW.Game_Message_clear.call(this);
    this._canMovePlayer = false;
    this._terminate = false;
    this._lastText = false;
    this._positionX = 1;
};

Game_Message.prototype.windowMessageEx = function() {
    return this._window_MessageEx;
}

Game_Message.prototype.canClose = function() {
    return this._permissionClose;
};

Game_Message.prototype.permitClose = function() {
    this._permissionClose = true;
};

Game_Message.prototype.prohibitClose = function() {
    this._permissionClose = false;
};

Game_Message.prototype.isTerminate = function() {
    return this._terminate;
}

Game_Message.prototype.terminate = function() {
    this.permitClose();
    this._terminate = true;
    var message = this.windowMessageEx();
    if (message) {
        message.activate()
        message.terminateMessage();
    }
}

Game_Message.prototype.canMovePlayer = function() {
    return this._canMovePlayer;
};

Game_Message.prototype.enabledCanMovePlayer = function() {
    this._canMovePlayer = true;
};

Game_Message.prototype.disabledCanMovePlayer = function() {
    this._canMovePlayer = false;
};

Game_Message.prototype.isLastText = function() {
    return this._lastText;
};

Game_Message.prototype.firstText = function() {
    this._lastText = false;
};

Game_Message.prototype.lastText = function() {
    this._lastText = true;
};

FTKR.EMW.Game_Message_isBusy = Game_Message.prototype.isBusy;
Game_Message.prototype.isBusy = function() {
    return this.canMovePlayer() || (!this.canClose() && this.isLastText()) ? false : FTKR.EMW.Game_Message_isBusy.call(this);
};

//------------------------------------------------------------------------
// Game_Interpreter
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'messageEx':
        waiting = $gameMessageEx.windows().some(function(message){
            return message.isBusy();
        });
        break;
    default:
        waiting = FTKR.EMW.Game_Interpreter_updateWaitMode.call(this);
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

//=============================================================================
// メッセージを表示するイベントコマンドの修正
//=============================================================================

FTKR.EMW.Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
Game_Interpreter.prototype.initialize = function(depth) {
    FTKR.EMW.Game_Interpreter_initialize.call(this, depth);
    this._windowId = 0;
    this._messageWindowLists = [];
};

Game_Interpreter.prototype.windowId = function() {
    return !FTKR.EMW.exwindowNum ? this._eventId : this._windowId;
};

//------------------------------------------------------------------------
// 文章の表示
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command101.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            $gameMessageEx.window(windowId).clear();
            $gameMessageEx.window(windowId).setFaceImage(this._params[0], this._params[1]);
            $gameMessageEx.window(windowId).setBackground(this._params[2]);
            $gameMessageEx.window(windowId).setPositionType(this._params[3]);
            this.continueMessages(windowId);
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
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

Game_Interpreter.prototype.continueMessages =function(windowId) {
    if (Imported.YEP_MessageCore) {
      while (this.isContinueMessageString()) {
        this._index++;
        if (this._list[this._index].code === 401) {
          $gameMessageEx.window(windowId).addText(this.currentCommand().parameters[0]);
        }
        if ($gameMessageEx.window(windowId)._texts.length >= $gameSystem.messageRows()) break;
      }
    } else {
        while (this.nextEventCode() === 401) {  // Text data
            this._index++;
            $gameMessageEx.window(windowId).add(this.currentCommand().parameters[0]);
        }
    }
};

//------------------------------------------------------------------------
// 選択肢の表示
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
Game_Interpreter.prototype.command102 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command102.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupChoices(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupChoices.call(this);
    } else {
        var choices = params[0].clone();
        var cancelType = params[1];
        var defaultType = params.length > 2 ? params[2] : 0;
        var positionType = params.length > 3 ? params[3] : 2;
        var background = params.length > 4 ? params[4] : 0;
        if (cancelType >= choices.length) {
            cancelType = -2;
        }
        $gameMessageEx.window(windowId).setChoices(choices, defaultType, cancelType);
        $gameMessageEx.window(windowId).setChoiceBackground(background);
        $gameMessageEx.window(windowId).setChoicePositionType(positionType);
        $gameMessageEx.window(windowId).setChoiceCallback(function(n) {
            this._branch[this._indent] = n;
        }.bind(this));
    }
};

//------------------------------------------------------------------------
// 数値入力の処理
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command103 = Game_Interpreter.prototype.command103;
Game_Interpreter.prototype.command103 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command103.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupNumInput(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupNumInput = Game_Interpreter.prototype.setupNumInput;
Game_Interpreter.prototype.setupNumInput = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupNumInput.call(this);
    } else {
        $gameMessageEx.window(windowId).setNumberInput(params[0], params[1]);
    }
};

//------------------------------------------------------------------------
// アイテム選択の処理
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
Game_Interpreter.prototype.command104 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command104.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupItemChoice(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupItemChoice = Game_Interpreter.prototype.setupItemChoice;
Game_Interpreter.prototype.setupItemChoice = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupItemChoice.call(this);
    } else {
        $gameMessageEx.window(windowId).setItemChoice(params[0], params[1] || 2);
    }
};

//=============================================================================
// Game_MessageEx
// メッセージの拡張ゲームデータクラス
//=============================================================================

function Game_MessageEx() {
    this.initialize.apply(this, arguments);
}

Game_MessageEx.prototype.initialize = function() {
    this._data = [];
    this._data[0] = $gameMessage;
};

Game_MessageEx.prototype.window = function(windowId) {
    if (FTKR.EMW.exwindowNum < windowId) return undefined;
    if (!this._data[windowId]) {
        this._data[windowId] = new Game_Message();
    }
    return this._data[windowId];
};

Game_MessageEx.prototype.windows = function() {
    return this._data;
};

//=============================================================================
// Window_MessageEx
// メッセージの拡張ウィンドウクラス
//=============================================================================

function Window_MessageEx() {
    this.initialize.apply(this, arguments);
}

Window_MessageEx.prototype = Object.create(Window_Message.prototype);
Window_MessageEx.prototype.constructor = Window_MessageEx;

Window_MessageEx.prototype.initialize = function(windowId) {
    this._windowId = windowId;
    console.log(this._windowId);
    Window_Message.prototype.initialize.call(this);
};

Window_MessageEx.prototype.initMembers = function() {
    Window_Message.prototype.initMembers.call(this);
};

Window_MessageEx.prototype.createSubWindows = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    this._goldWindow.openness = 0;
    this._choiceWindow = new Window_ChoiceListEx(this, this._windowId);
    this._numberWindow = new Window_NumberInputEx(this, this._windowId);
    this._itemWindow = new Window_EventItemEx(this, this._windowId);
    if (Imported.YEP_MessageCore) {
        this._nameWindow = new Window_NameBoxEx(this, this._windowId);
        FTKR.EMW.nameWindows[this._windowId] = this._nameWindow;
        var scene = SceneManager._scene;
        scene.addChild(this._nameWindow);
    }
};

Window_MessageEx.prototype.canStart = function() {
    return $gameMessageEx.window(this._windowId).hasText() && !$gameMessageEx.window(this._windowId).scrollMode();
};

Window_MessageEx.prototype.startMessage = function() {
    if (Imported.YEP_MessageCore) this._nameWindow.deactivate();
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessageEx.window(this._windowId).allText());
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this.activate();
};

Window_MessageEx.prototype.updatePlacement = function() {
    this._positionType = $gameMessageEx.window(this._windowId).positionType();
    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_MessageEx.prototype.updateBackground = function() {
    this._background = $gameMessageEx.window(this._windowId).background();
    this.setBackgroundType(this._background);
};

Window_MessageEx.prototype.terminateMessage = function() {
    $gameMessageEx.window(this._windowId).lastText();
    if ($gameMessageEx.window(this._windowId).canClose()) {
        if (Imported.YEP_MessageCore) this._nameWindow.deactivate();
        this.close();
        this._goldWindow.close();
        $gameMessageEx.window(this._windowId).clear();
    } else {
        this.deactivate();
    }
};

Window_MessageEx.prototype.startInput = function() {
    if ($gameMessageEx.window(this._windowId).isChoice()) {
        this._choiceWindow.start();
        return true;
    } else if ($gameMessageEx.window(this._windowId).isNumberInput()) {
        this._numberWindow.start();
        return true;
    } else if ($gameMessageEx.window(this._windowId).isItemChoice()) {
        this._itemWindow.start();
        return true;
    } else {
        return false;
    }
};

Window_MessageEx.prototype.doesContinue = function() {
    return ($gameMessageEx.window(this._windowId).hasText() && !$gameMessageEx.window(this._windowId).scrollMode() &&
            !this.areSettingsChanged());
};

Window_MessageEx.prototype.areSettingsChanged = function() {
    return (this._background !== $gameMessageEx.window(this._windowId).background() ||
            this._positionType !== $gameMessageEx.window(this._windowId).positionType());
};

Window_MessageEx.prototype.loadMessageFace = function() {
    this._faceBitmap = ImageManager.loadFace($gameMessageEx.window(this._windowId).faceName());
};

Window_MessageEx.prototype.drawMessageFace = function() {
    this.drawFace($gameMessageEx.window(this._windowId).faceName(), $gameMessageEx.window(this._windowId).faceIndex(), 0, 0);
};

Window_MessageEx.prototype.newLineX = function() {
    return $gameMessageEx.window(this._windowId).faceName() === '' ? 0 : 168;
};

Window_MessageEx.prototype.updateWait = function() {
    if ($gameMessageEx.window(this._windowId).isTerminate()) {
        this._waitCount = 0;
        if(this._textState) this._textState.index = this._textState.text.length;
        this._pauseSkip = true;
        return false;
    }
    if (Imported.YEP_MessageCore && this.isFastForward()) return false;
    if (this._waitCount > 0) {
        this._waitCount--;
        return true;
    } else {
        return false;
    }
};

if (Imported.YEP_MessageCore) {
  Window_MessageEx.prototype.wordwrapWidth = function(){
    if (Yanfly.Param.MSGTightWrap && $gameMessageEx.window(this._windowId).faceName() !== '') {
      return this.contents.width - this.newLineX();
    }
    return Window_Base.prototype.wordwrapWidth.call(this);
  };
  
  Window_MessageEx.prototype.newLineX = function() {
      if ($gameMessageEx.window(this._windowId).faceName() === '') {
        return 0;
      } else {
        return eval(Yanfly.Param.MSGFaceIndent);
      }
  };

  Window_MessageEx.prototype.convertNameBox = function(text) {
      var windowId = this._windowId;
      text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 1);
      }, this);
      text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 1);
      }, this);
      text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 2);
      }, this);
      text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 3);
      }, this);
      text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 3);
      }, this);
      text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 4);
      }, this);
      text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 5);
      }, this);
      text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
          return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 5);
      }, this);
      return text;
  };

  Window_MessageEx.prototype.convertActorFace = function(actor) {
      $gameMessageEx.window(this._windowId).setFaceImage(actor.faceName(), actor.faceIndex());
      return '';
  };

  if (Yanfly.Param.MSGNameBoxClose) {
    Window_MessageEx.prototype.hasDifferentNameBoxText = function() {
      var texts = $gameMessageEx.window(this._windowId)._texts;
      var length = texts.length;
      var open = this._nameWindow.isOpen();
      for (var i = 0; i < length; ++i) {
        var text = texts[i];
        if (text.length <= 0) continue;
        if (Yanfly.MsgMacro) {
          text = this.convertMacroText(text);
          text = text.replace(/\x1b/gi, '\\');
        }
        if (text.match(/\\(?:N|N1|N2|N3|N4|N5|NC|NR)<(.*)>/i)) {
          var name = String(RegExp.$1);
        } else if (text.match(/\\(?:ND|ND1|ND2|ND3|ND4|ND5|NDC|NDR)<(.*)>/i)) {
          var name = String(RegExp.$1);
        } else if (text.match(/\\(?:NT|NT1|NT2|NT3|NT4|NT5|NTC|NTR)<(.*)>/i)) {
          var name = String(RegExp.$1);
        }
        if (name) {
          name = name.replace(/\\V\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
          }.bind(this));
          name = name.replace(/\\V\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
          }.bind(this));
          name = name.replace(/\\N\[(\d+)\]/gi, function() {
            return this.actorName(parseInt(arguments[1]));
          }.bind(this));
          name = name.replace(/\\P\[(\d+)\]/gi, function() {
            return this.partyMemberName(parseInt(arguments[1]));
          }.bind(this));
          name = name.replace(/\\/gi, '\x1b');
        }
        if (name && !open) return true;
        if (name && name !== this._nameWindow._lastNameText) {
          return true;
        }
      }
      if (open && !name) return true;
      return false;
    };
  }
}

//=============================================================================
// Window_ChoiceListEx
// 選択肢の拡張ウィンドウクラス
//=============================================================================

function Window_ChoiceListEx() {
    this.initialize.apply(this, arguments);
}

Window_ChoiceListEx.prototype = Object.create(Window_ChoiceList.prototype);
Window_ChoiceListEx.prototype.constructor = Window_ChoiceListEx;

Window_ChoiceListEx.prototype.initialize = function(messageWindow, windowId) {
    Window_ChoiceList.prototype.initialize.call(this, messageWindow);
    this._windowId = windowId;
};

Window_ChoiceListEx.prototype.selectDefault = function() {
    this.select($gameMessageEx.window(this._windowId).choiceDefaultType());
};

Window_ChoiceListEx.prototype.updatePlacement = function() {
    var positionType = $gameMessageEx.window(this._windowId).choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    switch (positionType) {
    case 0:
        this.x = 0;
        break;
    case 1:
        this.x = (Graphics.boxWidth - this.width) / 2;
        break;
    case 2:
        this.x = Graphics.boxWidth - this.width;
        break;
    }
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height;
    } else {
        this.y = messageY + this._messageWindow.height;
    }
    if (Imported.YEP_MessageCore) {
        var messagePosType = $gameMessageEx.window(this._windowId).positionType();
        if (messagePosType === 0) {
          this.y = this._messageWindow.height;
        } else if (messagePosType === 2) {
          this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
        }
    }
};

Window_ChoiceListEx.prototype.updateBackground = function() {
    this._background = $gameMessageEx.window(this._windowId).choiceBackground();
    this.setBackgroundType(this._background);
};

Window_ChoiceListEx.prototype.numVisibleRows = function() {
    var messageY = this._messageWindow.y;
    var messageHeight = this._messageWindow.height;
    var centerY = Graphics.boxHeight / 2;
    var choices = $gameMessageEx.window(this._windowId).choices();
    var numLines = choices.length;
    var maxLines = 8;
    if (messageY < centerY && messageY + messageHeight > centerY) {
        maxLines = 4;
    }
    if (numLines > maxLines) {
        numLines = maxLines;
    }
    return numLines;
};

Window_ChoiceListEx.prototype.maxChoiceWidth = function() {
    var maxWidth = 96;
    var choices = $gameMessageEx.window(this._windowId).choices();
    for (var i = 0; i < choices.length; i++) {
        var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
        if (maxWidth < choiceWidth) {
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};

Window_ChoiceListEx.prototype.makeCommandList = function() {
    var choices = $gameMessageEx.window(this._windowId).choices();
    for (var i = 0; i < choices.length; i++) {
        this.addCommand(choices[i], 'choice');
    }
};

Window_ChoiceListEx.prototype.isCancelEnabled = function() {
    return $gameMessageEx.window(this._windowId).choiceCancelType() !== -1;
};

Window_ChoiceListEx.prototype.callOkHandler = function() {
    $gameMessageEx.window(this._windowId).onChoice(this.index());
    this._messageWindow.terminateMessage();
    this.close();
};

Window_ChoiceListEx.prototype.callCancelHandler = function() {
    $gameMessageEx.window(this._windowId).onChoice($gameMessageEx.window(this._windowId).choiceCancelType());
    this._messageWindow.terminateMessage();
    this.close();
};

//=============================================================================
// Window_NumberInputEx
// 数値入力の拡張ウィンドウクラス
//=============================================================================

function Window_NumberInputEx() {
    this.initialize.apply(this, arguments);
}

Window_NumberInputEx.prototype = Object.create(Window_NumberInput.prototype);
Window_NumberInputEx.prototype.constructor = Window_NumberInputEx;

Window_NumberInputEx.prototype.initialize = function(messageWindow, windowId) {
    Window_NumberInput.prototype.initialize.call(this, messageWindow);
    this._windowId = windowId;
};

Window_NumberInputEx.prototype.start = function() {
    this._maxDigits = $gameMessageEx.window(this._windowId).numInputMaxDigits();
    this._number = $gameVariables.value($gameMessageEx.window(this._windowId).numInputVariableId());
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
};

Window_NumberInputEx.prototype.processOk = function() {
    SoundManager.playOk();
    $gameVariables.setValue($gameMessageEx.window(this._windowId).numInputVariableId(), this._number);
    this._messageWindow.terminateMessage();
    this.updateInputData();
    this.deactivate();
    this.close();
};

Window_NumberInputEx.prototype.updatePlacement = function() {
    Window_NumberInput.prototype.updatePlacement.call(this);
    if (Imported.YEP_MessageCore) {
        var messageY = this._messageWindow.y;
        var messagePosType = $gameMessageEx.window(this._windowId).positionType();
        if (messagePosType === 0) {
          this.y = this._messageWindow.height;
        } else if (messagePosType === 1) {
          if (messageY >= Graphics.boxHeight / 2) {
              this.y = messageY - this.height;
          } else {
              this.y = messageY + this._messageWindow.height;
          }
        } else if (messagePosType === 2) {
          this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
        }
    }
};

//=============================================================================
// Window_EventItemEx
// アイテム選択の拡張ウィンドウクラス
//=============================================================================

function Window_EventItemEx() {
    this.initialize.apply(this, arguments);
}

Window_EventItemEx.prototype = Object.create(Window_EventItem.prototype);
Window_EventItemEx.prototype.constructor = Window_EventItemEx;

Window_EventItemEx.prototype.initialize = function(messageWindow, windowId) {
    Window_EventItem.prototype.initialize.call(this, messageWindow);
    this._windowId = windowId;
};

Window_EventItemEx.prototype.includes = function(item) {
    var itypeId = $gameMessageEx.window(this._windowId).itemChoiceItypeId();
    return DataManager.isItem(item) && item.itypeId === itypeId;
};

Window_EventItemEx.prototype.onOk = function() {
    var item = this.item();
    var itemId = item ? item.id : 0;
    $gameVariables.setValue($gameMessageEx.window(this._windowId).itemChoiceVariableId(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
};

Window_EventItemEx.prototype.onCancel = function() {
    $gameVariables.setValue($gameMessageEx.window(this._windowId).itemChoiceVariableId(), 0);
    this._messageWindow.terminateMessage();
    this.close();
};

Window_EventItemEx.prototype.updatePlacement = function() {
    Window_EventItem.prototype.updatePlacement.call(this);
    if (Imported.YEP_MessageCore) {
        var messagePosType = $gameMessageEx.window(this._windowId).positionType();
        if (messagePosType === 0) {
          this.y = Graphics.boxHeight - this.height;
        } else if (messagePosType === 2) {
          this.y = 0;
        }
    }
};

//=============================================================================
// Window_NameBoxEx
// ネームボックスの拡張ウィンドウクラス(YEP_MessageCore.jp用)
//=============================================================================
if (Imported.YEP_MessageCore) {

function Window_NameBoxEx() {
    this.initialize.apply(this, arguments);
}

Window_NameBoxEx.prototype = Object.create(Window_NameBox.prototype);
Window_NameBoxEx.prototype.constructor = Window_NameBoxEx;

Window_NameBoxEx.prototype.initialize = function(parentWindow, windowId) {
    Window_NameBox.prototype.initialize.call(this, parentWindow);
    this._windowId = windowId;
};

Window_NameBoxEx.prototype.adjustPositionY = function() {
    if ($gameMessageEx.window(this._windowId).positionType() === 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    } else {
      this.y = this._parentWindow.y;
      this.y -= this.height;
      this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
    }
    if (this.y < 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    }
};

}

//=============================================================================
// 拡張メッセージを登録
//=============================================================================
//ゲームオブジェクトに登録
FTKR.EMW.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    FTKR.EMW.DataManager_createGameObjects.call(this);
    $gameMessageEx = new Game_MessageEx();
};

//マップ画面で拡張メッセージウィンドウを生成
FTKR.EMW.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    FTKR.EMW.Scene_Map_createAllWindows.call(this);
    this.createMessageExWindowAll();
};

//プラグインパラメータで指定した数の拡張メッセージウィンドウを生成
Scene_Map.prototype.createMessageExWindowAll = function() {
    this._messageExWindows = [];
    if(!FTKR.EMW.exwindowNum) {
        $gameMap.events().forEach(function(event){
            this.createMessageExWindow(event._eventId);
        },this);
    } else {
        for (var i = 1; i < FTKR.EMW.exwindowNum + 1; i++) {
            this.createMessageExWindow(i);
        }
    }
};

//拡張メッセージウィンドウを生成
Scene_Map.prototype.createMessageExWindow = function(windowId) {
    this._messageExWindows[windowId] = new Window_MessageEx(windowId);
    $gameMessageEx.window(windowId)._window_MessageEx = this._messageExWindows[windowId];
    this.addWindow(this._messageExWindows[windowId]);
    this._messageExWindows[windowId].subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

