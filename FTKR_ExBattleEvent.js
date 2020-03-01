//=============================================================================
// バトルイベントを拡張するプラグイン
// FTKR_ExBattleEvent.js
// プラグインNo : 40
// 作成者     : フトコロ
// 作成日     : 2017/05/25
// 最終更新日 : 2020/03/02
// バージョン : v1.3.6
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBE = true;

var FTKR = FTKR || {};
FTKR.EBE = FTKR.EBE || {};

/*:
 * @plugindesc v1.3.6 バトルイベントを拡張するプラグイン
 * @author フトコロ
 * 
 * @param Battle Event
 * @desc 戦闘中に実行するコモンイベントID
 * 0 - 実行しない、カンマ(,)で区切って複数設定できます
 * @default 
 * 
 * @param --勝利時イベント--
 * @desc 
 * 
 * @param Custom Victory Event
 * @desc 戦闘勝利時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @type select
 * @option 変更しない
 * @value 0
 * @option 変更する
 * @value 1
 * @default 0
 * 
 * @param Victory Event
 * @desc 戦闘勝利時に実行するコモンイベントID
 * 0 - 実行しない
 * @type common_event
 * @default 
 * 
 * @param --敗北時イベント--
 * @desc 
 * 
 * @param Custom Defeat Event
 * @desc 戦闘敗北時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @type select
 * @option 変更しない
 * @value 0
 * @option 変更する
 * @value 1
 * @default 0
 * 
 * @param Defeat Event
 * @desc 戦闘敗北時に実行するコモンイベントID
 * 0 - 実行しない
 * @type common_event
 * @default 
 * 
 * @param --逃走時イベント--
 * @desc 
 * 
 * @param Custom Escape Event
 * @desc 戦闘逃走時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @type select
 * @option 変更しない
 * @value 0
 * @option 変更する
 * @value 1
 * @default 0
 * 
 * @param Escape Event
 * @desc 戦闘逃走時に実行するコモンイベントID
 * 0 - 実行しない
 * @type common_event
 * @default 
 * 
 * @param --中断時イベント--
 * @desc 
 * 
 * @param Custom Abort Event
 * @desc 戦闘中断時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @type select
 * @option 変更しない
 * @value 0
 * @option 変更する
 * @value 1
 * @default 0
 * 
 * @param Abort Event
 * @desc 戦闘中断時に実行するコモンイベントID
 * 0 - 実行しない
 * @type common_event
 * @default 
 * 
 * @param Abort BugFix
 * @desc コアスクリプトにおける戦闘中断時のバグ修正を行う。他のプラグインと競合する場合は、無効にしてください。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param --戦闘行動の強制--
 * @desc 
 * 
 * @param Invalid Battle Phase
 * @desc ここで規定したバトルフェーズ中に戦闘行動の強制が有効になる。複数規定する場合はカンマ(,)で区切る。
 * @default action
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、バトル終了時または中断時に
 * 指定したイベントを実行します。
 * 
 * 実行可能なタイミング
 *      １．勝利時（敵が全滅した後）
 *      ２．敗北時（パーティーが全滅した後）
 *      ３．逃走時（パーティーコマンド「逃げる」やスキルの逃げる効果使用後）
 *      ４．中断時（イベントコマンド「バトルの中断」実行後）
 * 
 * 戦闘終了時のイベントの処理が終了すると、バトル画面が終了します。
 * 
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_ExBattleEvent.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CSS_CustomizeBattleResults.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_ExBattleEvent.js
 *    ↓このプラグインよりも下に登録↓
 *    FTKR_ExVariablesChange.js
 *    
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2019 Futokoro
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
 * v1.3.6 - 2020/03/02 : 機能追加
 *    1. 逃走時と中断時に指定のイベントを実行する機能を追加。
 * 
 * v1.3.5 - 2020/01/15 : 不具合修正
 *    1. 戦闘終了時イベントで「戦闘行動の強制」を実行できない不具合を修正。
 * 
 * v1.3.4 - 2019/12/29 : 仕様見直し
 *    1. 戦闘終了時イベントの実行処理を見直し。
 * 
 * v1.3.3 - 2018/02/19 : 不具合修正
 *    1. Custom Victory Eventが0の時に、戦闘勝利イベントを実行すると
 *       戦闘勝利回数が2回増加してしまう不具合を修正。
 * 
 * v1.3.2 - 2018/01/13 : 機能追加
 *    1. メッセージ表示関係のプラグインコマンドに、イベント処理を止める機能を追加。
 * 
 * v1.3.1 - 2018/01/12 : 不具合修正
 *    1. 戦闘終了時イベント中にウェイトコマンドを実行すると、アクターの
 *       モーションが正常に再生されない不具合を修正。
 * 
 * v1.3.0 - 2017/06/30 : 機能追加
 *    1. 戦闘終了時のイベントの後に、MVデフォルトの戦闘終了処理を実行する
 *       機能を追加。
 * 
 * v1.2.0 - 2017/06/01 : 機能追加
 *    1. 敵キャラの戦闘行動を再設定するプラグインコマンドを追加。
 * 
 * v1.1.0 - 2017/05/26 : 機能追加
 *    1. バトル中にコモンイベントを実行できる機能を追加。
 *    2. モーション実行コマンドにアクターを対象にできる機能を追加。
 *    3. 画面に数字をポップアップさせるプラグインコマンドを追加。
 * 
 * v1.0.0 - 2017/05/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

var paramParse = function(obj) {
    return JSON.parse(JSON.stringify(obj, paramReplace));
}

var paramReplace = function(key, value) {
    try {
        return JSON.parse(value || null);
    } catch (e) {
        return value;
    }
};

var matchTextToRegs = function(test, regs) {
    return regs.some( function(reg){
        return test.match(reg);
    });
};

var readCommentMeta = function(comment, metacodes) {
    if (!comment) return false;
    return metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + '>', 'i');
        return metaReg.test(comment);
    });
};

var splitConvertNumber = function(param) {
    var results = [];
    (param + '').split(',').forEach( function(split){
        match = /[ ]*(\d+)[ ]*-[ ]*(\d+)/.exec(split);
        if (match) {
            for (var i = Number(match[1]); i <= Number(match[2]); i++) {
                results.push(i);
            }
        } else {
            if(!isNaN(split)) results.push(Number(split));
        }
    });
    return results;
};

// textを条件式に使える状態に変換する
var convertTextToConditions = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        datas.forEach(function(data, i) {
            result += data;
            if (datas[i+1]) result += ')&&(';
        });
        result = '(' + result + ')';
    }
    return result;
};

var convertEscapeCharacters = function(text) {
    if (text == null) text = '';
    var window = SceneManager._scene._windowLayer.children[0];
    return window ? window.convertEscapeCharacters(text) : text;
};

//=============================================================================
// 自作関数(グローバル)
//=============================================================================

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

if (!FTKR.setGameData) {
FTKR.setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};
}

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
        var item   = datas.item;
        var number = datas.number;
        if (b) var result = b.result();
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
}

//=============================================================================
// プラグイン パラメータ
//=============================================================================
var parameters = PluginManager.parameters('FTKR_ExBattleEvent');

FTKR.EBE.battleEvents = splitConvertNumber(parameters['Battle Event']);
FTKR.EBE.battleEnd = {
    victory : paramParse(parameters['Victory Event'] || 0),
    customV : paramParse(parameters['Custom Victory Event'] || 0),
    defeat  : paramParse(parameters['Defeat Event'] || 0),
    customD : paramParse(parameters['Custom Defeat Event'] || 0),
    escape  : paramParse(parameters['Escape Event'] || 0),
    customE : paramParse(parameters['Custom Escape Event'] || 0),
    abort   : paramParse(parameters['Abort Event'] || 0),
    customA : paramParse(parameters['Custom Abort Event'] || 0),
    abortBF : paramParse(parameters['Abort BugFix'] || false),
    invalid : parameters['Invalid Battle Phase'] || '',
};

//=============================================================================
// プラグインコマンド
//=============================================================================

Game_Interpreter.prototype.setArgNumber = function(arg) {
    try {
        var arg = convertEscapeCharacters(arg);
        return Number(eval(arg));
    } catch (e) {
        console.error(e);
        return 0;
    }
};

var _EBE_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _EBE_Game_Interpreter_pluginCommand.call(this, command, args);
    if (!command.match(/EBE_(.+)/i)) return;
    command = (RegExp.$1 + '').toUpperCase();
    switch (command) {
        case '戦闘終了時ステート解除':
        case 'REMOVE_BATTLE_STATES':
            $gameParty.removeBattleStates();
            break;
        case '勝利モーション実行':
        case 'PREFORM_VICTORY':
            $gameParty.performVictory();
            break;
        case 'モーション実行':
        case 'REQUEST_MOTION':
            if(!args[1] || args[1] === '全員' || args[1].toUpperCase() === 'ALL') {
                $gameParty.requestMotion(args[0]);
            } else if (Number(args[1]) >= 0) {
                var actor = $gameActors.actor(Number(args[1]));
                if (actor) actor.requestMotion(args[0]);
            }
            break;
        case '勝利ME演奏':
        case 'PLAY_VICTORY_ME':
            BattleManager.playVictoryMe();
            break;
        case '敗北ME演奏':
        case 'PLAY_DEFEAT_ME':
            BattleManager.playDefeatMe();
            break;
        case 'BGMBGS再開':
        case 'REPLAY_BGM_AND_BGS':
            BattleManager.replayBgmAndBgs();
            break;
        case 'BGM停止':
        case 'STOP_BGM':
            AudioManager.stopBgm();
            break;
        case '戦闘報酬計算':
        case 'MAKE_REWARDS':
            BattleManager.makeRewards();
            break;
        case '勝利メッセージ表示':
        case 'DISPLAY_VICTORY_MESSAGE':
            BattleManager.displayVictoryMessage();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '敗北メッセージ表示':
        case 'DISPLAY_DEFEAT_MESSAGE':
            BattleManager.displayDefeatMessage();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '戦闘報酬表示':
        case 'DISPLAY_REWARDS':
            BattleManager.displayRewards();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '戦闘報酬入手':
        case 'GAIN_REWARDS':
            BattleManager.gainRewards();
            break;
        case '戦闘再開':
        case 'RESTART_BATTLE':
            BattleManager._checkEbeBattleEvent = false;
            break;
        case '数字ポップアップ':
        case 'POPUP_NUMBER':
            this.setupNumberPopup(args);
            break;
        case '敵キャラの戦闘行動の設定':
        case 'SET_BATTLE_ENEMY_ACTION':
            var memberId = this.setArgNumber(args[0]);
            $gameTroop.members()[memberId].makeActions();
            break;
    }
};

Game_Interpreter.prototype.setupNumberPopup = function(args) {
    var index = this.setArgNumber(args[0]);
    for (var i = 1; i < args.length; i++) {
        var arg = (args[i] + '').toUpperCase();
        switch (arg) {
            case '画像番号':
            case 'IMAGENUM':
                i++;
                var baseRow = this.setArgNumber(args[i]);
                break;
            case '表示内容':
            case 'VALUE':
                i++;
                var value = this.setArgNumber(args[i]);
                break;
            case 'ポップアップ高さ':
            case 'POPUP_HEIGHT':
                i++;
                var height = this.setArgNumber(args[i]);
                if (!isNaN(args[i+1])) {
                    i++;
                    var offsetY = this.setArgNumber(args[i]);
                }
                break;
            case '表示時間':
            case 'DURATION':
                i++;
                var duration = this.setArgNumber(args[i]);
                break;
            case '表示差':
            case 'DIFF_COUNT':
                i++;
                var maxcount = this.setArgNumber(args[i]);
                break;
            case '表示座標':
            case 'POSITION':
                i++;
                var x = this.setArgNumber(args[i]);
                i++;
                var y = this.setArgNumber(args[i]);
                break;
            case '消去しない':
            case 'REMAIN':
                var remain = true;
                break;
            case '消去':
            case 'ERASE':
                BattleManager.eraseNumberPopup(index);
                return ;
        }
    }
    var sprite = BattleManager.setupNumberPopup(index);
    if (!isNaN(baseRow)) sprite.setBaseRow(baseRow);
    if (!isNaN(height)) sprite.setPopupHeight(height, offsetY);
    if (!isNaN(duration)) sprite.setDuration(duration);
    if (!isNaN(maxcount)) sprite.setMaxcount(maxcount);
    if (!isNaN(x) && !isNaN(y))sprite.setPosition(x, y);
    if (remain) sprite.setRemain();
    if (!isNaN(value)) sprite.setValue(value);
};

//=============================================================================
// BattleManager
//=============================================================================

var _EBE_BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _EBE_BattleManager_initMembers.call(this);
    this._checkEbeBattleEvent = false;
    this._battleEndPattern = 0;
    this._numberSprite = [];
    this._invalidPhase = FTKR.EBE.battleEnd.invalid.split(',');
};

var _EBE_Game_Party_requestMotionRefresh = Game_Party.prototype.requestMotionRefresh;
Game_Party.prototype.requestMotionRefresh = function() {
    if (!BattleManager.isBattleEndEvent()) {
        _EBE_Game_Party_requestMotionRefresh.call(this);
    }
};

BattleManager.isBattleEndEvent = function() {
    return $gameParty.inBattle() && this._checkEbeBattleEvent;
};

BattleManager.isInvalidPhase = function() {
    return this._invalidPhase.contains(this._phase);
};

var _EBE_BattleManager_updateEvent = BattleManager.updateEvent;
BattleManager.updateEvent = function() {
    if (this.isBattleEndEvent() && !this.isInvalidPhase()) {
        if (this.isActionForced()) {
            this.processForcedAction();
            return true;
        } else {
            return this.updateEventMain();
        }
    } else {
        return _EBE_BattleManager_updateEvent.call(this);
    }
};

var _EBE_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this.isBattleEndEvent()) {
        this._checkEbeBattleEvent = false;
        switch (this._battleEndPattern) {
            case 0: //勝利
                if (FTKR.EBE.battleEnd.customV) break;
                _EBE_BattleManager_processVictory.call(this);
                return true;
            case 1: //逃走
                if (FTKR.EBE.battleEnd.customE) break;
                _EBE_BattleManager_processAbort.call(this);
                return true;
            case 2: //敗北
                if (FTKR.EBE.battleEnd.customD) break;
                _EBE_BattleManager_processDefeat.call(this);
                return true;
            case 3: //中断
                this._battleEndPattern = 1;
                if (FTKR.EBE.battleEnd.customA) break;
                _EBE_BattleManager_processAbort.call(this);
                return true;
        }
        this.endBattle(this._battleEndPattern);
        return true;
    }
    return _EBE_BattleManager_checkBattleEnd.call(this);
};

var _EBE_BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    if (FTKR.EBE.battleEnd.victory && !this.isBattleEndEvent()) {
        if ($gameTroop.setupEbeBattleEvent('victory', ['EBE_戦闘勝利時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 0;
        }
        return true;
    }
    _EBE_BattleManager_processVictory.call(this);
};

var _EBE_BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
    if (FTKR.EBE.battleEnd.defeat && !this.isBattleEndEvent()) {
        if ($gameTroop.setupEbeBattleEvent('defeat', ['EBE_戦闘敗北時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 2;
        }
        return true;
    }
    _EBE_BattleManager_processDefeat.call(this);
};

var _EBE_BattleManager_checkAbort = BattleManager.checkAbort;
BattleManager.checkAbort = function() {
    if (FTKR.EBE.battleEnd.abortBF) {
        if ($gameParty.isEmpty()) {
            SoundManager.playEscape();
            this._escaped = true;
            this.processAbort();
        } else if (this.isAborting()) {
            this._escaped = true;
            this.processAbort();
        }
        return false;
    } else {
        _EBE_BattleManager_checkAbort.call(this);
    }
};

var _EBE_BattleManager_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
    if (FTKR.EBE.battleEnd.abort && !this.isBattleEndEvent() && this.isAborting()) {
        if ($gameTroop.setupEbeBattleEvent('abort', ['EBE_戦闘中断時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 3;
            this._phase = 'battleEnd';
        }
        return true;
    } else if (FTKR.EBE.battleEnd.escape && !this.isBattleEndEvent()) {
        if ($gameTroop.setupEbeBattleEvent('escape', ['EBE_戦闘逃走時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 1;
            this._phase = 'battleEnd';
        }
        return true;
    }
    _EBE_BattleManager_processAbort.call(this);
};

BattleManager.setupNumberPopup = function(index) {
    if (!this._numberSprite[index]) {
        var sprite = new Sprite_Number();
        this._numberSprite[index] = sprite;
        this._spriteset._battleField.addChild(this._numberSprite[index]);
    }
    return this._numberSprite[index];
};

BattleManager.eraseNumberPopup = function(index) {
    this._spriteset._battleField.removeChild(this._numberSprite[index]);
    this._numberSprite[index] = {};
};

BattleManager.isActed = function(battler) {
    return !this._actionBattlers.contains(battler);
};

BattleManager.isActedEnemy = function(battlerId) {
    return !this.isActed($gameTroop.members()[battlerId]);
};

BattleManager.isActedActor = function(battlerId) {
    return !this.isActed($gameParty.members()[battlerId]);
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.requestMotion = function(motionName) {
    this.members().forEach(function(actor) {
        if (actor.canMove()) actor.requestMotion(motionName);
    });
};

//=============================================================================
// Game_Troop
//=============================================================================

FTKR.EBE.Game_Troop_clear = Game_Troop.prototype.clear;
Game_Troop.prototype.clear = function() {
    FTKR.EBE.Game_Troop_clear.call(this);
    this._commonEventFlags = [];
};

FTKR.EBE.Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
Game_Troop.prototype.setupBattleEvent = function() {
    FTKR.EBE.Game_Troop_setupBattleEvent.call(this);
    if (!this._interpreter.isRunning()) {
        if (this._interpreter.setupReservedCommonEvent()) {
            return;
        }
        var eventIds = FTKR.EBE.battleEvents;
        for (var i = 0; i < eventIds.length; i++) {
            if (eventIds[i]) {
                var event = $dataCommonEvents[eventIds[i]];
                if (this.meetsCommonEventCommentConditions(event) && !this._commonEventFlags[i]) {
                    this._interpreter.setup(event.list, this.troop().id);
                    if (this.commonEventSpan(event) <= 1) {
                        this._commonEventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    }
};

FTKR.EBE.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    var eventIds = FTKR.EBE.battleEvents;
    for (var i = 0; i < eventIds.length; i++) {
        if (eventIds[i]) {
            var event = $dataCommonEvents[eventIds[i]];
            if (this.commonEventSpan(event) === 1) {
                this._commonEventFlags[i] = false;
            }
        }
    }
    FTKR.EBE.Game_Troop_increaseTurn.call(this);
};

Game_Troop.prototype.setupEbeBattleEvent = function(condition, metacodes) {
    if (!this._interpreter.isRunning()) {
        if (this._interpreter.setupReservedCommonEvent()) {
            return false;
        }
        var pages = this.troop().pages;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (this.meetsPagesCommentConditions(page, metacodes) && !this._eventFlags[i]) {
                this._interpreter.setup(page.list, this.troop().id);
                this._eventFlags[i] = true;
                return true;
            }
        }
        var event = $dataCommonEvents[FTKR.EBE.battleEnd[condition]];
        this._interpreter.setup(event.list, this.troop().id);
        return true;
    }
    return false;
};

Game_Troop.prototype.meetsPagesCommentConditions = function(page, metacodes) {
    for (var v = 0; v < page.list.length; v++) {
        var list = page.list[v];
        if (list && ([108, 408].contains(list.code))) {
            return readCommentMeta(list.parameters[0], metacodes);
        }
    }
};

Game_Troop.prototype.commonEventSpan = function(event) {
    for (var v = 0; v < event.list.length; v++) {
        var list = event.list[v];
        if (list && ([108, 408].contains(list.code))) {
            var match = /<([^<>:]+)(:?)([^>]*)>/g.exec(list.parameters[0]);
            switch((match[1] + '').toUpperCase()) {
                case 'スパン':
                case 'SPAN':
                    switch((match[3] + '').toUpperCase()) {
                        case 'バトル':
                        case 'BATTLE':
                            return 0;
                        case 'ターン':
                        case 'TURN':
                            return 1;
                        case 'モーメント':
                        case 'MOMENT':
                            return 2;
                    }
            }
        }
    }
    return 0;
};

Game_Troop.prototype.meetsCommonEventCommentConditions = function(event) {
    return this.meetsConditions(this.convertCommonEventConditions(event));
};

Game_Troop.prototype.convertCommonEventConditions = function(event) {
    var conditions = {};
    var code = false;
    for (var i = 0; i < event.list.length; i++) {
        var list = event.list[i];
        if (list && ([108, 408].contains(list.code))) {
            var match = /<([^<>:]+)(:?)([^>]*)>/g.exec(list.parameters[0]);
            if (match) {
                switch((match[1] + '').toUpperCase()){
                    case 'ターン終了':
                    case 'TURNEND':
                        conditions.turnEnding = true;
                        break;
                    case 'ターン':
                    case 'TURN':
                        if (match[2] === ':') {
                            var turn = /(\d+)[ ]*\+[ ]*(\d+)[ ]*\*X/i.exec(match[3]);
                            if (turn) {
                                conditions.turnValid = true;
                                conditions.turnA = Number(turn[1]);
                                conditions.turnB = Number(turn[2]);
                            }
                        }
                        break;
                    case '敵キャラHP':
                    case 'ENEMY_HP':
                        if (match[2] === ':') {
                            var value = /#(\d+)[ ]*(\d+)[ ]*\%以下/i.exec(match[3]);
                            if (!value) value = /#(\d+)[ ]*less[ ]than[ ]*(\d+)[ ]*\%/i.exec(match[3]);
                            if (value) {
                                conditions.enemyValid = true;
                                conditions.enemyIndex = Number(value[1]);
                                conditions.enemyHp = Number(value[2]);
                            }
                        }
                        break;
                    case 'アクターHP':
                    case 'ACTOR_HP':
                        if (match[2] === ':') {
                            var value = /#(\d+)[ ]*(\d+)[ ]*\%以下/i.exec(match[3]);
                            if (!value) value = /#(\d+)[ ]*less[ ]than[ ]*(\d+)[ ]*\%/i.exec(match[3]);
                            if (value) {
                                conditions.actorValid = true;
                                conditions.actorId = Number(value[1]);
                                conditions.actorHp = Number(value[2]);
                            }
                        }
                        break;
                    case 'スイッチ':
                    case 'SWITCH':
                        if (match[2] === ':') {
                            conditions.switchValid = true;
                            conditions.switchId = Number(match[3]);
                        }
                        break;
                    case '/実行条件':
                    case '/CONDITIONS':
                        code = false;
                        break;
                    case '実行条件':
                    case 'CONDITIONS':
                        conditions.customValid = true;
                        conditions.custom = '';
                        code = true;
                        break;
                }
            } else {
                 if (code) conditions.custom += list.parameters[0] + ';';
            }
        }
    }
    var page = {conditions:conditions};
    return page;
};

Game_Troop.prototype.evalConditionsFormula = function(text) {
    var formula = convertTextToConditions(text);
    if (!formula) return true;
    return FTKR.evalFormula(formula);
};

FTKR.EBE.Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
Game_Troop.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    var result = FTKR.EBE.Game_Troop_meetsConditions.call(this, page);
    if (!c.turnEnding && !result) {
        return false;
    }
    if ((c.turnEnding || c.turnValid || c.enemyValid ||
            c.actorValid || c.switchValid) && !result) {
        return false;
    }
    if (c.customValid && !this.evalConditionsFormula(c.custom)) {
        return false;
    }
    return true;
};

//=============================================================================
// Sprite_Number
// 数字をスプライトで表示する
//=============================================================================

function Sprite_Number() {
    this.initialize.apply(this, arguments);
}

Sprite_Number.prototype = Object.create(Sprite.prototype);
Sprite_Number.prototype.constructor = Sprite_Number;

Sprite_Number.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._flashColor = [0, 0, 0, 0];
    this._flashDuration = 0;
    this._damageBitmap = ImageManager.loadSystem('Damage');
    this._remain = false;
    this._duration = 30;
    this._maxcount = 0;
    this._count = 0;
    this._baseRow = 0;
    this._value = 0;
    this._index = 0;
    this._popupHeight = 40;
    this._popupOffsetY = 0.5;
    this._fullDuration = this._duration;
};

Sprite_Number.prototype.setupCriticalEffect = function() {
    this._flashColor = [255, 0, 0, 160];
    this._flashDuration = 60;
};

Sprite_Number.prototype.digitWidth = function() {
    return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
};

Sprite_Number.prototype.digitHeight = function() {
    return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
};

Sprite_Number.prototype.setBaseRow = function(baseRow) {
    this._baseRow = baseRow;
};

Sprite_Number.prototype.setDuration = function(duration) {
    this._duration = duration;
};

Sprite_Number.prototype.setValue = function(value) {
    this._value = value;
    this.resetFullDuration();
};

Sprite_Number.prototype.setMaxcount = function(maxcount) {
    this._maxcount = maxcount;
    this._count = this._maxcount;
};

Sprite_Number.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Sprite_Number.prototype.setRemain = function() {
    this._remain = true;
};

Sprite_Number.prototype.setPopupHeight = function(popupHeight, popupOffsetY) {
    this._popupHeight = popupHeight;
    if(!isNaN(popupOffsetY)) this._popupOffsetY = popupOffsetY;
};

Sprite_Number.prototype.resetFullDuration = function() {
    var string = Math.abs(this._value).toString();
    this._fullDuration = this._duration * string.length;
};

Sprite_Number.prototype.updateOpacity = function() {
    if (this._remain) return;
    if (this._fullDuration < 10) {
        this.opacity = 255 * this._fullDuration / 10;
    }
};

Sprite_Number.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._count >= this._maxcount) {
        this.createDigit(this._index);
        this._index++;
        this._count = 0;
    } else {
        this._count++;
    }
    if (this._fullDuration > 0) {
        this._fullDuration--;
        for (var i = 0; i < this.children.length; i++) {
            this.updateChild(this.children[i]);
        }
    }
    this.updateFlash();
    this.updateOpacity();
};

Sprite_Number.prototype.createChildSprite = function() {
    var sprite = new Sprite();
    sprite.bitmap = this._damageBitmap;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = -this._popupHeight;
    sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
};

Sprite_Number.prototype.createDigit = function(index) {
    var value = this._value;
    var baseRow = this._baseRow;
    var string = Math.abs(value).toString();
    if (index >= string.length) return;
    var row = baseRow + (value < 0 ? 1 : 0);
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    var n = Number(string[index]);
    sprite.setFrame(n * w, row * h, w, h);
    sprite.x = (index - (string.length - 1) / 2) * w;
    sprite.dy = -this._popupOffsetY * 2 * index;
};

Sprite_Number.prototype.updateChild = function(sprite) {
    sprite.dy += this._popupOffsetY;
    sprite.ry += sprite.dy;
    if (sprite.ry >= 0) {
        sprite.ry = 0;
        sprite.dy *= -0.6;
    }
    sprite.y = Math.round(sprite.ry);
    sprite.setBlendColor(this._flashColor);
};

Sprite_Number.prototype.updateFlash = function() {
    if (this._flashDuration > 0) {
        var d = this._flashDuration--;
        this._flashColor[3] *= (d - 1) / d;
    }
};

Sprite_Number.prototype.isPlaying = function() {
    return this._duration > 0;
};

/*--------------------------------------












--------------------------------------*/