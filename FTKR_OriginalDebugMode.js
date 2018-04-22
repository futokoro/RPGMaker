//=============================================================================
// オリジナルのデバッグモードを追加するプラグイン
// FTKR_OriginalDebugMode.js
// プラグインNo : 73
// 作成者     : フトコロ
// 作成日     : 2018/04/02
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ODM = true;

var FTKR = FTKR || {};
FTKR.ODM = FTKR.ODM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 オリジナルのデバッグモードを追加するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * オリジナルのデバッグモードを実装します。
 * この機能は、テストプレイ中のみ使用可能です。
 * 
 * 
 * デバッグモード呼び出し：F10キー
 * 
 * デバッグモード中の操作
 *    ↑↓キー                ：カーソル移動
 *    →←キー または 決定キー ：ON/OFF切替
 * 
 * 
 * デバッグモードで操作可能な項目
 *    ・先制攻撃確定(*1)
 *    ・不意打ち確定(*1)
 *    ・逃走確定
 *    ・戦闘開始時TP最大
 *    ・クリティカル確定
 *    ・アイテム入手率1000倍
 *    ・戦闘後全回復
 *    ・エンカウント無効
 * 
 * (*1)先制攻撃と不意打ちをどちらも ON にした場合は、先制攻撃になります。
 * 
 * 
 * なお、デバッグモードの設定内容は記録されません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *    なお、出来る限り一番下に追加してください。
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
 * v1.0.0 - 2018/04/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_OriginalDebugMode');

    FTKR.ODM = {
        preemptiveBool  : {text : '先制攻撃確定', value : false},
        surpriseBool    : {text : '不意打ち確定', value : false},
        escapeBool      : {text : '逃走確定', value : false},
        criticalBool    : {text : 'クリティカル確定', value : false},
        dropItemBool    : {text : 'アイテム入手率1000倍', value : false},
        encountBool     : {text : 'エンカウント無効', value : false},
        fullRecoveryBool: {text : '戦闘後全回復', value : false},
        tpMaxBool       : {text : '戦闘開始時TP最大', value : false},
    };

    Input.keyMapper[121] = 'FtDebug';

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _ODM_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        if (FTKR.ODM.preemptiveBool.value) this._preemptive = true;
        if (FTKR.ODM.surpriseBool.value && !this._preemptive) this._surprise = true;
        if (FTKR.ODM.escapeBool.value) this._escapeRatio = 1;
        _ODM_BattleManager_startBattle.call(this);
    };

    var _ODM_BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        if (FTKR.ODM.fullRecoveryBool.value) $gameParty.recoverAll();
        _ODM_BattleManager_updateBattleEnd.call(this);
    };

    var _ODM_Game_Action_itemCri = Game_Action.prototype.itemCri;
    Game_Action.prototype.itemCri = function(target) {
        return FTKR.ODM.criticalBool.value ? true : _ODM_Game_Action_itemCri.call(this, target);
    };

    var _ODM_Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
    Game_Enemy.prototype.dropItemRate = function() {
        return FTKR.ODM.dropItemBool.value ? 1000 : _ODM_Game_Enemy_dropItemRate.call(this);
    };

    var _ODM_Game_Party_hasEncounterNone = Game_Party.prototype.hasEncounterNone;
    Game_Party.prototype.hasEncounterNone = function() {
        return FTKR.ODM.encountBool.value ? true : _ODM_Game_Party_hasEncounterNone.call(this);
    };

    Game_Party.prototype.recoverAll = function() {
        this.allMembers().forEach(function(actor){
            actor.recoverAll();
        });
    };

    var _ODM_Game_Actor_onBattleStart = Game_Actor.prototype.onBattleStart;
    Game_Actor.prototype.onBattleStart = function() {
        _ODM_Game_Actor_onBattleStart.call(this);
        if (FTKR.ODM.tpMaxBool.value) this.setTp(this.maxTp());
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    var _ODM_Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _ODM_Scene_Map_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateCallFtDebug();
        }
    };

    Scene_Map.prototype.updateCallFtDebug = function() {
        if (this.isFtDebugCalled()) {
            SceneManager.push(Scene_FtDebug);
        }
    };

    Scene_Map.prototype.isFtDebugCalled = function() {
        return Input.isTriggered('FtDebug') && $gameTemp.isPlaytest();
    };

    //=============================================================================
    // Scene_FtDebug
    //=============================================================================

    function Scene_FtDebug() {
        this.initialize.apply(this, arguments);
    }

    Scene_FtDebug.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_FtDebug.prototype.constructor = Scene_FtDebug;

    Scene_FtDebug.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_FtDebug.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createFtDebugCommandWindow();
    };

    Scene_FtDebug.prototype.createFtDebugCommandWindow = function() {
        this._debugWindow = new Window_FtDebugCommand(0, 0);
        this._debugWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._debugWindow);
    };

    //=============================================================================
    // Window_FtDebugCommand
    //=============================================================================

    function Window_FtDebugCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_FtDebugCommand.prototype = Object.create(Window_Command.prototype);
    Window_FtDebugCommand.prototype.constructor = Window_FtDebugCommand;

    Window_FtDebugCommand.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
    };

    Window_FtDebugCommand.prototype.windowWidth = function() {
        return 480;
    };

    Window_FtDebugCommand.prototype.windowHeight = function() {
        return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
    };

    Window_FtDebugCommand.prototype.makeCommandList = function() {
        this.addGeneralOptions();
    };

    Window_FtDebugCommand.prototype.addGeneralOptions = function() {
        this.addCommand(FTKR.ODM.preemptiveBool.text, 'preemptiveBool');
        this.addCommand(FTKR.ODM.surpriseBool.text,   'surpriseBool');
        this.addCommand(FTKR.ODM.escapeBool.text,     'escapeBool');
        this.addCommand(FTKR.ODM.tpMaxBool.text,       'tpMaxBool');
        this.addCommand(FTKR.ODM.criticalBool.text,   'criticalBool');
        this.addCommand(FTKR.ODM.dropItemBool.text,   'dropItemBool');
        this.addCommand(FTKR.ODM.fullRecoveryBool.text, 'fullRecoveryBool');
        this.addCommand(FTKR.ODM.encountBool.text,    'encountBool');
    };

    Window_FtDebugCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
        this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
    };

    Window_FtDebugCommand.prototype.statusWidth = function() {
        return 120;
    };

    Window_FtDebugCommand.prototype.statusText = function(index) {
        var symbol = this.commandSymbol(index);
        var value = this.getFtDebugValue(symbol);
        return this.booleanStatusText(value);
    };

    Window_FtDebugCommand.prototype.booleanStatusText = function(value) {
        return value ? 'ON' : 'OFF';
    };

    Window_FtDebugCommand.prototype.processOk = function() {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getFtDebugValue(symbol);
        this.changeValue(symbol, !value);
    };

    Window_FtDebugCommand.prototype.cursorRight = function(wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getFtDebugValue(symbol);
        this.changeValue(symbol, true);
    };

    Window_FtDebugCommand.prototype.cursorLeft = function(wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getFtDebugValue(symbol);
        this.changeValue(symbol, false);
    };

    Window_FtDebugCommand.prototype.changeValue = function(symbol, value) {
        var lastValue = this.getFtDebugValue(symbol);
        if (lastValue !== value) {
            this.setFtDegubValue(symbol, value);
            this.redrawItem(this.findSymbol(symbol));
            SoundManager.playCursor();
        }
    };

    Window_FtDebugCommand.prototype.getFtDebugValue = function(symbol) {
        return FTKR.ODM[symbol].value;
    };

    Window_FtDebugCommand.prototype.setFtDegubValue = function(symbol, value) {
        FTKR.ODM[symbol].value = value;
    };

}());//EOF
