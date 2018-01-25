//=============================================================================
// 指定したイベントを画面の中心にしてキー操作で移動させるプラグイン
// FTKR_EventMoveByInput.js
// 作成者     : フトコロ
// 作成日     : 2018/01/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MBI = true;

var FTKR = FTKR || {};
FTKR.MBI = FTKR.MBI || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 指定したイベントを画面の中心にしてキー操作で移動させるプラグイン
 * @author フトコロ
 *
 * @param Return By Cancel
 * @desc カーソルイベントモード時にキャンセルでモードを終了させるか
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドを実行すると、指定したイベントに視点が移り
 * プレイヤーの様に操作できます。
 * 視点がイベントに移っている間は、プレイヤーは動かず、メニュー画面も表示できません。
 *  
 *  MBI_カーソルイベントモード ON id
 *  MBI_CURSOR_EVENT_MODE ON id
 * 
 * id は 指定したいイベントのIDを入力してください。
 * id には \v[n] と入力することで、変数ID n の値を参照できます。
 * 
 * 例)
 *  MBI_カーソルイベントモード ON 5
 *  MBI_カーソルイベントモード ON \v[10]
 * 
 * 
 * ＜カーソルイベントモード中に可能なこと＞
 * 1. イベントを中心にマップの表示エリアが自動調整される。
 * 2. 上下左右のキーやマウス操作で、イベントを動かす。
 * 3. 他のイベントを接触や決定ボタンで実行できる。
 * 4. ダッシュ可能。
 * 5. キャンセルボタンでカーソルイベントモード終了(*1)
 * 
 * 
 * (*1)プラグインパラメータ Return By Cancel が有効になっている場合は
 * キャンセルボタンを押すと視点が戻ります。
 * 
 * 無効にした状態でプレイヤーに視点を戻す場合は、
 * 以下のプラグインコマンドを実行してください。
 * 
 *  MBI_カーソルイベントモード OFF
 *  MBI_CURSOR_EVENT_MODE OFF
 * 
 * ※このプラグインコマンドは、Return By Cancel が有効でも実行可能です。
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
 * v1.0.0 - 2018/01/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_EventMoveByInput');

    var returnByCancel = JSON.parse(parameters['Return By Cancel']) || false;

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
    // Game_Interpreter
    //=============================================================================

    var _MBI_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (!command.match(/MBI_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'カーソルイベントモード':
            case 'CURSOR_EVENT_MODE':
                switch (args[0].toUpperCase()) {
                    case 'ON':
                        var id = setArgNum(args[1]);
                        if (!id) break;
                        $gamePlayer.cursorMoveOn(id);
                        break;
                    case 'OFF':
                        $gamePlayer.cursorMoveOff();
                        break;
                }
                break;
        }
        _MBI_Game_Interpreter_pluginCommand.call(this, command, args);
    };

    //=============================================================================
    // Game_Player
    // スキルマップモードの設定を追加
    //=============================================================================

    Game_Player.prototype.cursorEventId = function() {
        return this._cursorEventId;
    };

    Game_Player.prototype.cursorMoveOn = function(eventId) {
        this._cursorMoveMode = true;
        this._cursorEventId = eventId;
        $gameMap.event(eventId).setCursorFlag();
    };

    Game_Player.prototype.cursorMoveOff = function() {
        this._cursorMoveMode = false;
        $gameMap.event(this._cursorEventId).clearCursorFlag();
        this._cursorEventId = 0;
    };

    Game_Player.prototype.isCursorMoveMode = function() {
        return this._cursorMoveMode;
    };

    //スキルマップモードの場合は、プレイヤー移動禁止
    var _MBI_Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if (this.isCursorMoveMode()) {
            return false;
        }
        return _MBI_Game_Player_canMove.call(this);
    };

    //=============================================================================
    // Game_Event
    //=============================================================================

    var _MBI_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _MBI_Game_Event_initMembers.call(this);
        this._dashing = false;
    };

    Game_Event.prototype.isCursor = function() {
        return this._isCursor;
    };

    Game_Event.prototype.setCursorFlag = function() {
        this._isCursor = true;
    };

    Game_Event.prototype.clearCursorFlag = function() {
        this._isCursor = false;
    };

    // スキルマップ用のカーソルイベントのキー操作処理を追加
    Game_Event.prototype.moveByInput = function() {
        if (!this.isMoving() && this.canMove() && this.isCursor()) {
            var direction = this.getInputDirection();
            if (direction > 0) {
                $gameTemp.clearDestination();
            } else if ($gameTemp.isDestinationValid()){
                var x = $gameTemp.destinationX();
                var y = $gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }
            if (direction > 0) {
                this.executeMove(direction);
            }
        }
    };

    Game_Event.prototype.canMove = function() {
        if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
            return false;
        }
        if (this.isMoveRouteForcing()) {
            return false;
        }
        return true;
    };

    Game_Event.prototype.getInputDirection = function() {
        return Input.dir4;
    };

    Game_Event.prototype.executeMove = function(direction) {
        this.moveStraight(direction);
    };

    //----------------------------------------------------------------
    // カーソルイベントに合わせて画面を動かすように設定
    //----------------------------------------------------------------
    Game_Event.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
        var x1 = lastScrolledX;
        var y1 = lastScrolledY;
        var x2 = this.scrolledX();
        var y2 = this.scrolledY();
        if (y2 > y1 && y2 > this.centerY()) {
            $gameMap.scrollDown(y2 - y1);
        }
        if (x2 < x1 && x2 < this.centerX()) {
            $gameMap.scrollLeft(x1 - x2);
        }
        if (x2 > x1 && x2 > this.centerX()) {
            $gameMap.scrollRight(x2 - x1);
        }
        if (y2 < y1 && y2 < this.centerY()) {
            $gameMap.scrollUp(y1 - y2);
        }
    };

    Game_Event.prototype.centerX = function() {
        return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
    };

    Game_Event.prototype.centerY = function() {
        return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
    };

    Game_Event.prototype.center = function(x, y) {
        return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
    };

    //----------------------------------------------------------------
    // カーソルイベントで他イベントを実行できるようにする
    //----------------------------------------------------------------
    var _MBI_Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        if (this.isCursor()) {
            var lastScrolledX = this.scrolledX();
            var lastScrolledY = this.scrolledY();
            var wasMoving = this.isMoving();
            this.updateDashing();
        }
        _MBI_Game_Event_update.call(this);
        if (this.isCursor()) {
            this.updateScroll(lastScrolledX, lastScrolledY);
            if (!this.isMoving()) {
                this.updateNonmoving(wasMoving);
            }
        }
    };

    Game_Event.prototype.isDashing = function() {
        return this._dashing;
    };

    Game_Event.prototype.updateDashing = function() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !$gameMap.isDashDisabled()) {
            this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
        } else {
            this._dashing = false;
        }
    };

    Game_Event.prototype.isDashButtonPressed = function() {
        var shift = Input.isPressed('shift');
        if (ConfigManager.alwaysDash) {
            return !shift;
        } else {
            return shift;
        }
    };

    Game_Event.prototype.updateNonmoving = function(wasMoving) {
        if (!$gameMap.isEventRunning()) {
            if (wasMoving) {
                this.checkEventTriggerHere([1,2]);
                if ($gameMap.setupStartingEvent()) {
                    return;
                }
            }
            if (this.triggerAction()) {
                return;
            }
        }
    };

    //同じマップ座標にいる他のイベントを実行
    Game_Event.prototype.checkEventTriggerHere = function(triggers) {
        this.startMapEvent(this._x, this._y, triggers, false);
    };

    //自分以外のイベントを実行させる
    Game_Event.prototype.startMapEvent = function(x, y, triggers) {
        if (!$gameMap.isEventRunning()) {
            $gameMap.eventsXy(x, y).forEach(function(event) {
                if (event.eventId() !== this.eventId() && event.isTriggerIn(triggers)) {
                    event.start();
                }
            },this);
        }
    };

    Game_Event.prototype.triggerAction = function() {
        if (this.canMove()) {
            if (this.triggerButtonAction()) {
                return true;
            }
            if (this.triggerTouchAction()) {
                return true;
            }
        }
        return false;
    };

    Game_Event.prototype.triggerButtonAction = function() {
        if (Input.isTriggered('ok')) {
            this.checkEventTriggerHere([0]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
            this.checkEventTriggerThere([0,1,2]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
        }
        return false;
    };

    Game_Event.prototype.checkEventTriggerThere = function(triggers) {
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        this.startMapEvent(x2, y2, triggers, true);
        if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            this.startMapEvent(x3, y3, triggers, true);
        }
    };

    Game_Event.prototype.triggerTouchAction = function() {
        if ($gameTemp.isDestinationValid()){
            var direction = this.direction();
            var x1 = this.x;
            var y1 = this.y;
            var x2 = $gameMap.roundXWithDirection(x1, direction);
            var y2 = $gameMap.roundYWithDirection(y1, direction);
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            var destX = $gameTemp.destinationX();
            var destY = $gameTemp.destinationY();
            if (destX === x1 && destY === y1) {
                return this.triggerTouchActionD1(x1, y1);
            } else if (destX === x2 && destY === y2) {
                return this.triggerTouchActionD2(x2, y2);
            } else if (destX === x3 && destY === y3) {
                return this.triggerTouchActionD3(x2, y2);
            }
        }
        return false;
    };

    Game_Event.prototype.triggerTouchActionD1 = function(x1, y1) {
        this.checkEventTriggerHere([0]);
        return $gameMap.setupStartingEvent();
    };

    Game_Event.prototype.triggerTouchActionD2 = function(x2, y2) {
        this.checkEventTriggerThere([0,1,2]);
        return $gameMap.setupStartingEvent();
    };

    Game_Event.prototype.triggerTouchActionD3 = function(x2, y2) {
        if ($gameMap.isCounter(x2, y2)) {
            this.checkEventTriggerThere([0,1,2]);
        }
        return $gameMap.setupStartingEvent();
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    //カーソルイベントを取得
    Scene_Map.prototype.checkCursorEvent = function() {
        if ($gamePlayer.cursorEventId() && !this._cursor) {
            this._cursor = null;
            $gameMap.events().some(function(event) {
                if (event && event.eventId() === $gamePlayer.cursorEventId()) {
                    this._cursor = event;
                    return true;
                }
            },this);
        } else if (!$gamePlayer.cursorEventId() && !!this._cursor) {
            this._cursor = null;
        }
    };

    var _MBI_Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        _MBI_Scene_Map_updateMain.call(this);
        this.checkCursorEvent();
        if (!!this._cursor && this.isActive()) this._cursor.moveByInput();
    };

    var _MBI_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if ($gamePlayer.isCursorMoveMode()) {
            if (returnByCancel) $gamePlayer.cursorMoveOff();
            this.menuCalling = false;
        } else {
            _MBI_Scene_Map_callMenu.call(this);
        }
    };


}());//EOF
