//=============================================================================
// アクションゲージプラグイン
// FTKR_ActionGauge.js
// 作成者     : フトコロ(Futokoro)
// 作成日     : 2017/04/21
// 最終更新日 : 
// バージョン : v0.7.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ACG = true;

var FTKR = FTKR || {};
FTKR.ACG = FTKR.ACG || {};

//=============================================================================
/*:
 * @plugindesc v0.7.0 アクションゲージプラグイン
 * @author フトコロ
 *
 * @param ゲージカウントの格納先
 * @desc 指定したゲーム内変数にストップ時のカウントを格納する
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * アクションゲージを実装します。
 * 
 * 試作版です。
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
 * ＜ゲージを表示する＞
 * 以下のプラグインコマンドでアクションゲージの表示します。
 * 
 * ACG_アクションゲージ表示
 * 
 * 
 * ＜ゲージを動かす＞
 * 「START」を実行すると、ゲージが動き出します。
 * 
 * 動き出したゲージは、「STOP」を押すと止まります。
 * 
 * ゲージが止まった後は、「END」を押すとゲージが消えます。
 * このとき、ゲージのカウント数をプラグインパラメータで指定したゲーム内変数に
 * 格納します。
 * 
 * ゲージのカウント数は、0～100の間で変動します。
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
 * v0.7.0 - 2017/04/21 : 試作版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ACG.parameters = PluginManager.parameters('FTKR_ActionGauge');

FTKR.ACG.variablesId = Number(FTKR.ACG.parameters['ゲージカウントの格納先'] || 0);

//=============================================================================
// Game_Map
//=============================================================================

FTKR.ACG.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    FTKR.ACG.Game_Map_initialize.call(this);
    this._gaugeWindow = {};
    this._gaugeCount = 0;
    this._gaugeStart = false;
    this._isActionGaugeShow = false;
};

Game_Map.prototype.gauge = function() {
    return this._gaugeWindow;
};

Game_Map.prototype.hasGauge = function() {
    return this._isActionGaugeShow;
};

Game_Map.prototype.createGaugeWindow = function(x, y, width, height, maxCount) {
    this._gaugeWindow = new Window_MapInfo(x, y, width, height, maxCount);
    this._isActionGaugeShow = true;
};

Game_Map.prototype.removeGaugeWindow = function() {
    this._isActionGaugeShow = false;
};

Game_Map.prototype.gaugeStart = function() {
    this._gaugeStart = true;
    return this._gaugeCount;
};

Game_Map.prototype.gaugeStop = function() {
    this._gaugeStart = false;
    return this._gaugeCount;
};

Game_Map.prototype.gaugeMove = function() {
    return this._gaugeStart;
}

Game_Map.prototype.getGaugeCount = function(count) {
    this._gaugeCount = count;
};

Game_Map.prototype.gaugeCount = function(){
    return this._gaugeCount;
};

//=============================================================================
// Window_StopButton
//=============================================================================

function Window_StopButton() {
    this.initialize.apply(this, arguments);
}

Window_StopButton.prototype = Object.create(Window_Selectable.prototype);
Window_StopButton.prototype.constructor = Window_StopButton;

Window_StopButton.prototype.initialize = function(y) {
    var width = 100;
    var height = this.fittingHeight(1);
    var x = (Graphics.boxWidth - width) / 2;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this._condition = 'init'
    this.refresh();
};

Window_StopButton.prototype.maxCols = function() {
    return 1;
};

Window_StopButton.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_StopButton.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_StopButton.prototype.makeItemList = function() {
    switch(this._condition) {
        case 'init':
            var command = 'START';
            break;
        case 'move':
            var command = 'STOP';
            break;
        case 'end':
            var command = 'END';
            break;
    }
    this._data = [{dicision:true, disp:command},];
};

Window_StopButton.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_StopButton.prototype.isCurrentItemEnabled = function() {
    return true;
};

Window_StopButton.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    this.changePaintOpacity(true);
    this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
    this.changePaintOpacity(1);
};

//=============================================================================
// Window_MapInfo
//=============================================================================

function Window_MapInfo() {
    this.initialize.apply(this, arguments);
}

Window_MapInfo.prototype = Object.create(Window_Base.prototype);
Window_MapInfo.prototype.constructor = Window_MapInfo;

Window_MapInfo.prototype.initialize = function(x, y, width, height, maxCount) {
    width = width || Graphics.boxWidth / 2;
    height = height || this.fittingHeight(1);
    x = x || (Graphics.boxWidth - width) / 2;
    y = y || (Graphics.boxHeight - height) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._gaugeCount = 0;
    this._maxCount = maxCount || 100;
};

Window_MapInfo.prototype.update = function() {
    this.refresh();
};

Window_MapInfo.prototype.refresh = function() {
    this.contents.clear();
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    var rate = this._gaugeCount / this._maxCount;
    this.drawGauge(0, 0, this.width, rate, color1, color2)
    if($gameMap.gaugeMove()) {
        this._gaugeCount++;
        if (this._gaugeCount >= this._maxCount) this._gaugeCount = 0;
    } else {
        $gameMap.getGaugeCount(this._gaugeCount);
    }
};

// フォントサイズ
Window_MapInfo.prototype.standardFontSize = function() {
    return 28;
};

// ウィンドウの透明度
Window_MapInfo.prototype.standardBackOpacity = function() {
    return 192;
};

// ウィンドウの余白
Window_MapInfo.prototype.standardPadding = function() {
    return 18;
};

Window_MapInfo.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    this.contents.fillRect(x, y, width, this.lineHeight(), this.gaugeBackColor());
    this.contents.gradientFillRect(x, y, fillW, this.lineHeight(), color1, color2);
};

//=============================================================================
// Scene_Map
//=============================================================================

FTKR.ACG.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    FTKR.ACG.Scene_Map_update.call(this);
    this.updateAcgGauge();
};

Scene_Map.prototype.updateAcgGauge = function() {
    if($gameMap.hasGauge() && !this._gaugeWindow){
        this._gaugeWindow = $gameMap.gauge();
        this.addWindow(this._gaugeWindow);
        this.createStopButton();
    } else if(this._gaugeWindow && !$gameMap.hasGauge()) {
        this._windowLayer.removeChild(this._gaugeWindow);
        this._windowLayer.removeChild(this._stopButton);
        delete this._gaugeWindow;
        delete this._stopButton;
    }
};

Scene_Map.prototype.createStopButton = function() {
    var y = this._gaugeWindow.y + this._gaugeWindow.height;
    this._stopButton = new Window_StopButton(y);
    this._stopButton.setHandler('ok', this.onGaugeStop.bind(this));
    this.addWindow(this._stopButton);
    this._stopButton.select(0);
    this._stopButton.activate();
};

Scene_Map.prototype.onGaugeStop = function() {
    var stop = this._stopButton;
    switch (stop._condition) {
        case 'init':
            $gameMap.gaugeStart();
            stop._condition = 'move';
            stop.refresh();
            stop.select(0);
            stop.activate();
            break;
        case 'move':
            $gameMap.gaugeStop();
            stop._condition = 'end';
            stop.refresh();
            stop.select(0);
            stop.activate();
            break;
        case 'end':
            var id = FTKR.ACG.variablesId;
            if (id) $gameVariables.setValue(id, $gameMap.gaugeCount());
            $gameMap.removeGaugeWindow();
            break;
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _ACG_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _ACG_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.match(/ACG_(.+)/i)) {
        command = RegExp.$1;
        switch (true) {
            case /アクションゲージ表示/i.test(command):
                $gameMap.createGaugeWindow();
                this.setWaitMode('gauge');
                break;
        }
    }
};

FTKR.ACG.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'gauge':
        waiting = $gameMap.hasGauge();
        break;
    default:
        waiting = FTKR.ACG.Game_Interpreter_updateWaitMode.call(this);
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};
