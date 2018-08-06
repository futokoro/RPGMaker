//=============================================================================
// 選択肢ウィンドウを表示中に選択肢の説明ウィンドウを表示するプラグイン
// FTKR_SelectHelpWindow.js
// プラグインNo : 81
// 作成者     : フトコロ
// 作成日     : 2018/04/15
// 最終更新日 : 2018/08/06
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SHW = true;

var FTKR = FTKR || {};
FTKR.SHW = FTKR.SHW || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 選択肢ウィンドウを表示中に選択肢の説明ウィンドウを表示する
 * @author フトコロ
 *
 * @param Enable Hide Window
 * @desc 選択肢に説明文を設定していない場合に、ウィンドウを非表示にする。
 * @type boolean
 * @on 非表示
 * @off 表示
 * @default false
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 選択肢ウィンドウを表示中に、選択肢ごとに設定した説明文を表示するウィンドウを
 * 追加で表示します。
 * 
 * 説明文は、イベントコマンドの注釈で作成します。
 * 注釈の最初の行に<SHW_説明>と記入されていると、以降の行の文章を
 * 説明文として取り込みます。
 * 
 * 以下の様にイベントを作成してください。
 * 
 * ◆選択肢の表示：はい, いいえ (ウィンドウ, 右, #1, #2)
 * ：はいのとき
 *   ◆注釈：<SHW_説明>
 *   ：　　：「はい」を選択中の説明文
 *   ◆
 * ：いいえのとき
 *   ◆注釈：<SHW_説明>
 *   ：　　：「いいえ」を選択中の説明文
 *   ◆
 * ：分岐終了
 * 
 * 
 * 説明文ウィンドウ画面上部に固定で表示します。
 * また説明文は２行まで表示できます。
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.0 - 2018/08/06 : 機能追加
 *    1. 注釈の設定がない場合は、説明ウィンドウを非表示にする機能を追加。
 * 
 * v1.0.0 - 2018/04/15 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {
    var parameters = PluginManager.parameters('FTKR_SelectHelpWindow');
    FTKR.SHW.enableHideWindow = JSON.parse(parameters['Enable Hide Window'] || false);

    //=============================================================================
    // Game_Interpreter
    //=============================================================================
    var _SHW_Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function(params) {
        _SHW_Game_Interpreter_setupChoices.call(this, params);
        var texts = this.setupChoiceHelpMessage();
        $gameMessage.setChoiceHelpTexts(texts);
    };

    Game_Interpreter.prototype.listCode = function(index) {
        var command = this._list[index];
        if (command) {
            return command.code;
        } else {
            return 0;
        }
    };

    Game_Interpreter.prototype.setupChoiceHelpMessage = function() {
        var index = this._index;
        var texts = [];
        var textIndex = 0;
        for (var i = index; i < this._list.length; i++) {
            if (this.listCode(i) === 404) return texts;
            if (this.listCode(i) === 108 && this._list[i].parameters[0] === '<SHW_説明>') { // 注釈
                i++;
                texts[textIndex] = '';
                for (var j = i; j < this._list.length; j++) {
                    if (this.listCode(j) !== 408) break;
                    texts[textIndex] += this._list[j].parameters[0] + '\n';
                }
                textIndex++;
            }
        }
        return texts;
    };

    //=============================================================================
    // Game_Message
    //=============================================================================

    Game_Message.prototype.setChoiceHelpTexts = function(texts) {
        this._choiceHelpTexts = texts;
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    var _SHW_Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
    Scene_Map.prototype.createMessageWindow = function() {
        _SHW_Scene_Map_createMessageWindow.call(this);
        this.addWindow(this._messageWindow.choiceHelpWindow());
    };

    var _SHW_Scene_Battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
    Scene_Battle.prototype.createMessageWindow = function() {
        _SHW_Scene_Battle_createMessageWindow.call(this);
        this.addWindow(this._messageWindow.choiceHelpWindow());
    };

    //=============================================================================
    // Window_ChoiceList
    //=============================================================================
    Window_ChoiceList.prototype.setHelpWindowText = function(text) {
        if (this._helpWindow) {
            this._helpWindow.setText(text);
            this._helpWindow.show();
        }
    };

    Window_ChoiceList.prototype.updateHelp = function() {
        var text = $gameMessage._choiceHelpTexts[this.index()];
        if (FTKR.SHW.enableHideWindow && (text == undefined || !text)) {
            this._helpWindow.hide();
        } else {
            this.setHelpWindowText(text);
        }
    };

    Window_ChoiceList.prototype.helpWindow = function() {
        return this._messageWindow.choiceHelpWindow();
    };

    var _SHW_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        _SHW_Window_ChoiceList_start.call(this);
        this.helpWindow().open();
    };

    var _SHW_Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
    Window_ChoiceList.prototype.callOkHandler = function() {
        _SHW_Window_ChoiceList_callOkHandler.call(this);
        this.helpWindow().close();
    };

    var _SHW_Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
    Window_ChoiceList.prototype.callCancelHandler = function() {
        _SHW_Window_ChoiceList_callCancelHandler.call(this);
        this.helpWindow().close();
    };

    //=============================================================================
    // Window_Message
    //=============================================================================

    var _SHW_Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
    Window_Message.prototype.createSubWindows = function() {
        _SHW_Window_Message_createSubWindows.call(this);
        this.createChoiceHelpWIndow();
    };

    Window_Message.prototype.createChoiceHelpWIndow = function() {
        this._helpWindow = new Window_Help();
        this._helpWindow.close();
        this._helpWindow.openness = 0;
        this._choiceWindow.setHelpWindow(this._helpWindow);
    };

    Window_Message.prototype.choiceHelpWindow = function() {
        return this._helpWindow;
    };

}());//EOF
