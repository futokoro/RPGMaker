//=============================================================================
// 敵味方交互にターンが進むターン制戦闘システムのプラグイン
// FTKR_AlternatingTurnBattle.js
// プラグインNo : 75
// 作成者     : フトコロ
// 作成日     : 2018/04/08
// 最終更新日 : 2018/12/19
// バージョン : v2.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AltTB = true;

var FTKR = FTKR || {};
FTKR.AltTB = FTKR.AltTB || {};

//=============================================================================
/*:
 * @plugindesc v2.1.0 敵味方交互にターンが進むターン制戦闘システム
 * @author フトコロ
 *
 * @param TurnEnd Command
 * @desc プレイヤーターンを途中で終了させるコマンド名
 * @default ターン終了
 *
 * @param Change Player
 * @desc プレイヤーターンでアクターを変更する操作方法を指定します。
 * @type select
 * @option PgUpキー + PgDnキー
 * @value 0
 * @option Rightキー + Leftキー
 * @value 1
 * @option 禁止
 * @value -1
 * @default 0
 *
 * @param Call Party Command
 * @desc パーティーコマンドを表示する操作方法を指定します。
 * @type select
 * @option キャンセルボタン
 * @value 0
 * @option 禁止
 * @value -1
 * @default 0
 *
 * @param Start Actor Command
 * @desc プレイヤーターンで先頭のアクターを選択した状態から始める
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Enable Auto Player Turn End
 * @desc パーティーが行動できなくなった時に、自動でターン終了する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Enabled Auto Select TurnEnd Command
 * @desc パーティーが行動できなくなった時に、パーティーコマンドの「ターン終了」に自動でカーソルを合わせる。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Confused Action Timing
 * @desc 行動制約ステートによるアクターの行動タイミングを設定する。
 * @type select
 * @option プレイヤーターン開始時
 * @value 1
 * @option プレイヤーターン終了時
 * @value 0
 * @default 0
 *
 * @param --- 行動回数 ---
 * 
 * @param Disable AC
 * @desc アクターの行動回数による行動制限を無効にする
 * @type boolean
 * @on 無効にする
 * @off 無効にしない
 * @default false
 * 
 * @param --- 行動済みのアクター ---
 * 
 * @param Activated Sv Actor Sign
 * @desc プレイヤーターン終了時に行動済みのSVアクターの表し方を指定します。
 * @type select
 * @option 待機モーション
 * @value 0
 * @option 停止
 * @value 1
 * @default 0
 *
 * @param Not Activated Sv Actor Sign
 * @desc プレイヤーターン終了時に未行動のSVアクターの表し方を指定します。
 * @type select
 * @option 待機モーション
 * @value 0
 * @option 停止
 * @value 1
 * @default 0
 *
 * @param Cannot Select Activated Actor
 * @desc 行動済みのアクターを選択できないようにします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default ture
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを導入すると、敵味方交互にターンが進むターン制戦闘システムに
 * 変更します。
 * 
 * この戦闘システムは、基本的にプレイヤー側が有利に戦闘を進めることができます。
 * 
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_AlternatingTurnBattle.ja.md
 * 
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    FTKR_FVActorAnimation.js        (フロントビューでアクター画像にアニメーション)
 *    ↑このプラグインよりも上に登録↑
 * 
 *    FTKR_AlternatingTurnBattle.js
 * 
 *    ↓このプラグインよりも下に登録↓
 *    FTKR_BattleActionPoints.js      (消費コストにアクションポイントを追加)
 *    FTKR_BattleActionTimes.js       (バトル画面に行動回数を表示)
 *    FTKR_BattleWindowLayout.js      (バトル画面のコマンドの位置を変更)
 *    FTKR_CSS_BattleStatus.js        (バトル画面のステータス表示を変更)
 *    FTKR_DisplayCommandFrame.js     (カーソルの変わりに枠や画像を表示)
 * 
 * 
 *-----------------------------------------------------------------------------
 * このプラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v2.1.0 - 2018/12/19 : 機能追加
 *    1. プレイヤーターンでアクターを変更する操作を禁止する機能を追加。
 *    2. パーティーコマンドを表示する操作を禁止する機能を追加。
 * 
 * v2.0.5 - 2018/12/18 : 競合回避
 *    1. 他プラグインとの競合回避処理追加。
 *       今後このプラグインにおいては他作者の戦闘プラグインとの競合対策は行いません。
 * 
 * v2.0.4 - 2018/12/15 : 不具合修正
 *    1. プラグインパラメータ Change Player を左右キーに設定して、アクター変更を
 *       行うとエラーになる不具合を修正。(v2.0.3のバグ)
 * 
 * v2.0.3 - 2018/12/11 : 競合回避、不具合修正
 *    1. FTKR_AISkillEvaluateとの競合回避。
 *    2. FTKR_BattleActionTimesと組み合わせた時に、行動回数の修正がターン終了時に
 *       リセットされない不具合を修正。
 * 
 * v2.0.2 - 2018/12/08 : 不具合修正
 *    1. ターンが進むタイミングがずれていたのを修正。
 *    2. アクターとエネミーが受けたステートのターン経過のタイミングを見直し。
 *    3. 戦闘行動の強制を実行後のターン進行が、正しく進まない不具合を修正。
 * 
 * v2.0.1 - 2018/12/04 : 不具合修正
 *    1. プラグインパラメータ Disable Change When Party Cannot Act を削除し
 *       パーティーが行動できなくなった時に、自動でパーティーコマンドに戻すように変更。
 *    2. パーティーが行動できなくなった時に、ターン終了コマンドに自動でカーソルを
 *       合わせる機能を追加。
 * 
 * v2.0.0 - 2018/12/02 : 全面仕様変更、ヘルプを削除
 *    1. 行動回数に関する処理を見直し、別プラグインに独立。
 *    2. アクションポイントに関する処理を見直し、別プラグインに独立。
 *    3. タッチまたはクリックでコマンド選択中のアクターを変更する機能を
 *       別プラグインに独立。
 *    4. ターン中の処理を全面見直し。
 *    5. 行動制約のあるパーティーメンバーの行動処理を見直し。
 *    6. アクターの自動戦闘の効果が出るように変更。
 * 
 * v1.6.2 までの変更来歴は、オンラインマニュアルページを参照。
 * v1.0.0 - 2018/04/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_AlternatingTurnBattle');

    FTKR.AltTB = {
        textTurnEnd             : (parameters['TurnEnd Command'] || 'ターン終了'),
        changePlayer            : (paramParse(parameters['Change Player']) || 0),
        callPartyCommand        : (paramParse(parameters['Call Party Command']) || 0),
        startActorCmd           : (paramParse(parameters['Start Actor Command']) || false),
        enableAutoTurnEnd       : (paramParse(parameters['Enable Auto Player Turn End']) || false),
        enabledAutoTurnEndCmd   : (paramParse(parameters['Enabled Auto Select TurnEnd Command']) || false),
        confusedActionTiming    : +(paramParse(parameters['Confused Action Timing']) || 0),
        disableAC               : (paramParse(parameters['Disable AC']) || false),
        activatedSv             : (paramParse(parameters['Activated Sv Actor Sign']) || 0),
        notActivatedSv          : (paramParse(parameters['Not Activated Sv Actor Sign']) || 0),
        notSelectActivatedActor : (paramParse(parameters['Cannot Select Activated Actor']) || false),
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    BattleManager.isTurnStart = function() {
        return this._phase === 'turnStart';
    };

    BattleManager.isPlayerTurnStart = function() {
        return this._isPlayerTurn && this._isGroupTurnStart;
    };

    BattleManager.isPlayerInputTurn = function() {
        return this._isPlayerTurn && this._isPlayerInputTurn;
    }

    BattleManager.isPlayerInputTurnEnd = function() {
        return this.isPlayerInputTurn() && this._isPlayerTurnEnd;
    };

    BattleManager.isPlayerAutoTurnEnd = function() {
        return this._isPlayerTurn && !this._isPlayerInputTurn && !this.actionBattlers().length;
    };

    BattleManager.isPlayerTurnEnd = function() {
        return this._isPlayerTurn && this._isPlayerTurnEnd && !this.actionBattlers().length;
    };

    BattleManager.isEnemyTurnStart = function() {
        return !this._isPlayerTurn && this._isGroupTurnStart;
    };

    BattleManager.isEnemyTurnEnd = function() {
        return !this._isPlayerTurn && !this.actionBattlers().length;
    };

    /*----------------------------------------------------------------------
     inputCount
    //アクターを一人でも行動させたのか判定するために使う、「逃げる」コマンド判定用
    -----------------------------------------------------------------------*/
    BattleManager.inputCount = function() {
        return this._inputCount;
    };

    BattleManager.addInputCount = function() {
        this._inputCount++;
    };

    BattleManager.clearInputCount = function() {
        this._inputCount = 0;
    };

    var _BattleManager_canEscape = BattleManager.canEscape;
    BattleManager.canEscape = function() {
        return _BattleManager_canEscape.call(this) && !this.inputCount();
    };

    /*----------------------------------------------------------------------
     Last Actor Index
      アクター選択時にキャンセルでパーティーコマンドを呼び出した場合の直前のアクターを記憶する
    -----------------------------------------------------------------------*/
    BattleManager.resetLastActorIndex = function() {
        this._lastActorIndex = -1;
    };

    BattleManager.lastActorIndex = function() {
        return this._lastActorIndex;
    };

    BattleManager.reserveLastActorIndex = function() {
        this._lastActorIndex = this._actorIndex;
    };

    /*----------------------------------------------------------------------
     _isPlayerTurn
    -----------------------------------------------------------------------*/
    BattleManager.changeTrunSide = function() {
        if (FTKR.AltTB.notActivatedSv && this._isPlayerTurn) {
            $gameParty.setActionState('');
        }
        this._isPlayerTurn = !this._isPlayerTurn;
        this._isGroupTurnStart = true;
        this.clearInputCount();
    };

    /*----------------------------------------------------------------------
     actorIndex
    -----------------------------------------------------------------------*/
    BattleManager.changeActorAltTB = function(index) {
        var state = !FTKR.AltTB.activatedSv || this.nextActor(index) && this.nextActor(index).canInput() ? 'undecided' : '';
        this.changeActor(index, state);
    };

    BattleManager.nextActor = function(index) {
        return index >= 0 && $gameParty.members()[index];
    };

    BattleManager.clearActorAltTB = function() {
        this.changeActorAltTB(-1);
    }

    BattleManager.selectActorActions = function() {
        if (this.lastActorIndex() >= 0) {
            this.changeActorAltTB(this.lastActorIndex());
        } else {
            this.selectNextCommand();
        }
    };

    //書き換え
    BattleManager.selectNextCommand = function() {
        do {
            if ($gameParty.canInput()) {
                if (this._actorIndex + 1 >= $gameParty.size()) {
                    this.changeActorAltTB(0);
                } else {
                    this.changeActorAltTB(this._actorIndex + 1);
                }
            } else {
                return;
            }
        } while (!this.actor().canInput());
    };

    //書き換え
    BattleManager.selectPreviousCommand = function() {
        do {
            if ($gameParty.canInput()) {
                if (this._actorIndex - 1 < 0) {
                    this.changeActorAltTB($gameParty.size() - 1);
                } else {
                    this.changeActorAltTB(this._actorIndex - 1);
                }
            } else {
                return;
            }
        } while (!this.actor().canInput());
    };

    /*----------------------------------------------------------------------
     actionBattlers
    -----------------------------------------------------------------------*/

    BattleManager.actionBattlers = function() {
        if (this._isPlayerTurn) {
            return this._confusedPartyBattlers;
        } else {
            return this._actionBattlers;
        }
    };

    //書き換え
    BattleManager.getNextSubject = function() {
        for (;;) {
            var battler = this.actionBattlers()[0];
            if (battler && battler.numActions() < 2) {
                battler = this.actionBattlers().shift();
            }
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };

    /*----------------------------------------------------------------------
     forth action
    -----------------------------------------------------------------------*/
    //書き換え
    BattleManager.forceAction = function(battler) {
        this._actionForcedBattler = battler;
        this._reservePhase = this._phase;
        var index = this.actionBattlers().indexOf(battler);
        if (index >= 0) {
            this.actionBattlers().splice(index, 1);
        }
    };

    //=============================================================================
    // BattleManager
    //  戦闘フェーズの更新処理の見直し
    //=============================================================================

    /*----------------------------------------------------------------------
     setup フェーズ
        このフェーズは、Battle_Scene以外で実行する。
    -----------------------------------------------------------------------*/
    //BattleManager.setup = function(troopId, canEscape, canLose) {

    var _AltTB_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _AltTB_BattleManager_initMembers.call(this);
        this._confusedPartyBattlers = [];
        this._isPlayerTurn = true;
        this.clearInputCount();
        this.resetLastActorIndex();
    };

    //BattleManager.makeEscapeRatio = function() {

    /*----------------------------------------------------------------------
     init フェーズ
    -----------------------------------------------------------------------*/
    //BattleManager.playBattleBgm = function() {

    //BattleManager.startBattle = function() {

    /*----------------------------------------------------------------------
     update
    -----------------------------------------------------------------------*/
    //書き換え
    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();//変更
                break;
            case 'turnStart':
                this.updateTurnStart();//追加
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    //書き換え
    BattleManager.updateEvent = function() {
        switch (this._phase) {
            case 'start':
            case 'turnStart':
            case 'turn':
            case 'turnEnd':
                if (this.isActionForced()) {
                    this.processForcedAction();
                    return true;
                } else {
                    return this.updateEventMain();
                }
        }
        return this.checkAbort();
    };
    
    //書き換え
    BattleManager.checkAbort = function() {
        if ($gameParty.isEmpty() || this.isAborting()) {
            this.processAbort();
        }
        return false;
    };

    /*----------------------------------------------------------------------
     start フェーズ
        ０ターン目のバトルイベント実行
    -----------------------------------------------------------------------*/
    BattleManager.updateStart = function() {
        this._phase = 'turnStart';
        $gameTroop.increaseTurn();
        if (this._surprise) this._isPlayerTurn = false;
    };

    /*----------------------------------------------------------------------
     turnStart フェーズ
      アクター、エネミー含めたターン開始の処理
    -----------------------------------------------------------------------*/

    BattleManager.updateTurnStart = function() {
        this.startInput();
        this.AltTB_StartTurn();
    };

    //書き換え 処理を空にする
    BattleManager.startTurn = function() {};

    BattleManager.AltTB_StartTurn = function() {
        this._phase = 'turn';
        this._isGroupTurnStart = true;
        this._isPlayerInputTurn = !FTKR.AltTB.confusedActionTiming;
        this._isPlayerTurnEnd = false;
        this.clearActorAltTB();
        this.resetLastActorIndex();
        this.makeActionOrders();
        $gameParty.requestMotionRefresh();
        $gameParty.resetActionState();
        this._logWindow.startTurn();
        this._statusWindow.refresh();
    };
    
    //書き換え
    BattleManager.makeActionOrders = function() {
        this.makePartyActionMembers();
        this.makeEnemyActionOrders();
    };

    BattleManager.makePartyActionMembers = function() {
        var battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat($gameParty.members().filter(function(member){
                return member.isConfused() || member.isAutoBattle();
            }));
        }
        this._confusedPartyBattlers = this.sortActionSpeed(battlers);
    };

    BattleManager.makeEnemyActionOrders = function() {
        var battlers = [];
        if (!this._preemptive) {
            battlers = battlers.concat($gameTroop.members());
        }
        this._actionBattlers = this.sortActionSpeed(battlers);
    };

    BattleManager.sortActionSpeed = function(battlers) {
        battlers.forEach(function(battler) {
            battler.makeSpeed();
        });
        battlers.sort(function(a, b) {
            return b.speed() - a.speed();
        });
        return battlers;
    };

    /*----------------------------------------------------------------------
     turn フェーズ
      アクターおよびエネミーのそれぞれのターン中の処理
    -----------------------------------------------------------------------*/
    //書き換え
    BattleManager.updateTurn = function() {
        $gameParty.requestMotionRefresh();
        if (!this.checkGroupTurnEnd()) {
            if (this._isGroupTurnStart) {
                this.updateGroupTurnStart();
                this._isGroupTurnStart = false;
            } else if (!this.checkChangePlayerMode()){
                this.updateDuringGroupTurn();
            }
        }
    };

    //group turn end
    BattleManager.checkGroupTurnEnd = function() {
        if (this.isPlayerTurnEnd()) {
            this.updatePlayerTurnEnd();
            return true;
        } else if (this.isEnemyTurnEnd()) {
            this.updateEnemyTurnEnd();
            return true;
        }
        return false;
    };

    BattleManager.updatePlayerTurnEnd = function() {
        this._phase = 'turn';
        this._isGroupTurnStart = true;
        this.allBattleMembers().forEach(function(battler) {
            battler.onPlayerTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }, this);
        this.changeTrunSide();
    };

    BattleManager.updateEnemyTurnEnd = function() {
        this._phase = 'turnEnd';
        this.allBattleMembers().forEach(function(battler) {
            battler.onEnemyTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }, this);
    };

    //group turn start
    BattleManager.updateGroupTurnStart = function() {
        if (FTKR.AltTB.startActorCmd && this.isPlayerInputTurn()) {
            this.selectNextCommand();
        }
    };

    //during group turn
    BattleManager.checkChangePlayerMode = function() {
        if (this._isPlayerTurn) {
            if (this.isPlayerInputTurnEnd()) {
                this._isGroupTurnStart = true;
                this._isPlayerInputTurn = false;
                return true;
            } else if (this.isPlayerAutoTurnEnd()) {
                this._isGroupTurnStart = true;
                this._isPlayerInputTurn = true;
                return true;
            }
        }
        return false;
    };

    BattleManager.updateDuringGroupTurn = function() {
        if (this.isPlayerInputTurn()) {
            this.updatePlayerInputTurn();
        } else {
            this.updateDuringNormalTurn();
        }
    };

    BattleManager.updatePlayerInputTurn = function() {
        if (this.checkAutoTurnChange()) {
            this.commandTurnEnd();
        } else {
            this._phase = 'input';
            this.autoSelectNextActor();
        }
    }

    BattleManager.commandTurnEnd = function() {
        this._phase = 'turn';
        this._isPlayerTurnEnd = true;
    }

    BattleManager.checkAutoTurnChange = function() {
        return FTKR.AltTB.enableAutoTurnEnd && !$gameParty.canInput();
    };

    BattleManager.autoSelectNextActor = function() {
        if (!FTKR.AltTB.notSelectActivatedActor || !this.actor()) return;
        if (!$gameParty.canInput()) {
            this.clearActorAltTB();
        } else {
            if (!this.actor().canInput()) {
                this.selectNextCommand();
            } else {
                this.actor().setActionState('inputting');
            }
        }
    };

    BattleManager.updateDuringNormalTurn = function() {
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        }
    }

    //書き換え
    BattleManager.processTurn = function() {
        var subject = this._subject;
        var action = subject.currentAction();
        if (action) {
            this.processBeforeAction(subject, action);
        } else {
            subject.clearActions();
            this.endAction();
        }
    };

    BattleManager.processBeforeAction = function(subject, action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        }
        subject.removeCurrentAction();
    };

    /*----------------------------------------------------------------------
     action フェーズ
    -----------------------------------------------------------------------*/
    //書き換え
    BattleManager.endAction = function() {
        this._logWindow.endAction(this._subject);
        this.updateActionEnd();
    };

    BattleManager.updateActionEnd = function() {
        this._phase = 'turn';
        var subject = this._subject;
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
        if (!subject.canMove()) {
            subject.clearActions();
        }
        if (!subject.numActions()) {
            this._subject = null;
        }
        if (this.isForcedTurn()) {
            this._turnForced = false;
            this._phase = this._reservePhase;
            this._reservePhase = null;
        }
    };

    /*----------------------------------------------------------------------
     updateTurnEnd フェーズ
      アクター、エネミー含めたターン終了処理
    -----------------------------------------------------------------------*/
    //書き換え
    BattleManager.updateTurnEnd = function() {
        this._phase = 'turnStart';
        this._preemptive = false;
        this._surprise = false;
        this.allBattleMembers().forEach(function(battler) {
            battler.onTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }, this);
        $gameTroop.increaseTurn();
        this.changeTrunSide();
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    //書き換え
    Game_Battler.prototype.removeCurrentAction = function() {
        if (!FTKR.AltTB.disableAC) {
            this._actions.shift();
        }
    };

    //書き換え
    Game_Battler.prototype.performActionEnd = function() {
        if (this.numActions() || FTKR.AltTB.disableAC) {
            this.setActionState('inputting');
        } else {
            this.setActionState('done');
        }
    };

    //書き換え
    Game_Battler.prototype.onTurnEnd = function() {
    };

    Game_Battler.prototype.onPlayerTurnEnd = function() {
    };
    
    Game_Battler.prototype.onEnemyTurnEnd = function() {
    };
    
    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _Game_Actor_canInput = Game_Actor.prototype.canInput;
    Game_Actor.prototype.canInput = function() {
        return _Game_Actor_canInput.call(this) &&
            (!FTKR.AltTB.notSelectActivatedActor || FTKR.AltTB.notSelectActivatedActor && this.numActions());
    };

    Game_Actor.prototype.onPlayerTurnEnd = function() {
        this.clearResult();
    };

    Game_Actor.prototype.onEnemyTurnEnd = function() {
        this.clearResult();
        this.regenerateAll();
        if (!BattleManager.isForcedTurn()) {
            this.updateStateTurns();
            this.updateBuffTurns();
        }
        this.removeStatesAuto(2);
    };
    
    //=============================================================================
    // Game_Party
    //=============================================================================

    Game_Party.prototype.resetActionState = function() {
        this.members().forEach(function(member){
            member.setActionState('undecided');
        });
    };

    Game_Party.prototype.setActionState = function(state) {
        this.members().forEach(function(member){
            member.setActionState(state);
        });
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.onPlayerTurnEnd = function() {
        this.clearResult();
        this.regenerateAll();
        if (!BattleManager.isForcedTurn()) {
            this.updateStateTurns();
            this.updateBuffTurns();
        }
        this.removeStatesAuto(2);
    };

    Game_Enemy.prototype.onEnemyTurnEnd = function() {
        this.clearResult();
    };

    //=============================================================================
    // Scene_Battle
    //  パーティーコマンドとアクターコマンドの処理見直し
    //=============================================================================

    var _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.call(this);
        this._partyCommandWindow.setHandler('turnEnd', this.commandTurnEnd.bind(this));
    };

    //書き換え
    Scene_Battle.prototype.commandFight = function() {
        BattleManager.selectActorActions();
        this.changeInputWindow();
    };

    //書き換え
    Scene_Battle.prototype.commandEscape = function() {
        this.commandTurnEnd();
        BattleManager.processEscape();
    };

    //書き換え
    Scene_Battle.prototype.commandTurnEnd = function() {
        this.endCommandSelection();
        BattleManager.commandTurnEnd();
    };

    var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        _Scene_Battle_startPartyCommandSelection.call(this);
        if (!$gameParty.canInput() && FTKR.AltTB.enabledAutoTurnEndCmd) {
            this._partyCommandWindow.selectSymbol('turnEnd');
        }
    };
    
    var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler('pageup',  this.commandPageup.bind(this));
        this._actorCommandWindow.setHandler('pagedown',this.commandPagedown.bind(this));
        this._actorCommandWindow.setHandler('cancel',  this.commandCancel.bind(this));
        this._actorCommandWindow.setStatusWindow(this._statusWindow);
    };

    //書き換え
    Scene_Battle.prototype.commandCancel = function() {
        if (!FTKR.AltTB.callPartyCommand) {
            BattleManager.reserveLastActorIndex()
            BattleManager.clearActorAltTB();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.commandPageup = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectPreviousCommand();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.commandPagedown = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        }
    };

    //書き換え
    Scene_Battle.prototype.selectNextCommand = function() {
        this.endCommandSelection();
        BattleManager._subject = BattleManager.actor();
        BattleManager.addInputCount();
        BattleManager.processTurn();
    };

    //=============================================================================
    // Window_PartyCommand
    //  戦うに条件追加、ターン終了コマンドを追加
    //=============================================================================

    //書き換え
    Window_PartyCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.fight,  'fight', $gameParty.canInput());
        this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
        this.addCommand(FTKR.AltTB.textTurnEnd, 'turnEnd');
    };

    //=============================================================================
    // Window_ActorCommand
    //  キー入力によるアクターの切り替え操作を追加
    //=============================================================================

    Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
    };

    Window_ActorCommand.prototype.changeInputWindow = function() {
        this._statusWindow.select(BattleManager.actor().index());
        this.setup(BattleManager.actor());
    };

    Window_ActorCommand.prototype.selectNextActor = function() {
        if ($gameParty.canInput()) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
            SoundManager.playCursor();
        } else {
            SoundManager.playBuzzer();
        }
    };

    Window_ActorCommand.prototype.selectPreviousActor = function() {
        if ($gameParty.canInput()) {
            BattleManager.selectPreviousCommand();
            this.changeInputWindow();
            SoundManager.playCursor();
        } else {
            SoundManager.playBuzzer();
        }
    };

    Window_ActorCommand.prototype.cursorRight = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            this.selectNextActor();
        } else {
            Window_Selectable.prototype.cursorRight.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorLeft = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            this.selectPreviousActor();
        } else {
            Window_Selectable.prototype.cursorLeft.call(this, wrap);
        }
    };

    //=============================================================================
    // Yanfly YEP_BattleEngineCore.js の対応
    //=============================================================================
    if (Imported.YEP_BattleEngineCore) {
    
    BattleManager.createActions = function() {
    };
    
    var _YPE_BEC_BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        this._processTurn = true;
        _YPE_BEC_BattleManager_processTurn.call(this);
        this._processTurn = false;
    };

    var _YPE_BEC_BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function() {
        _YPE_BEC_BattleManager_updateTurnEnd.call(this);
        if (this.isTurnBased() && this._spriteset.isPopupPlaying()) return;
        if (this.isTurnBased() && this._enteredEndPhase) return;
        this._enteredEndPhase = true;
        BattleManager.refreshAllMembers();
    };

    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();
                break;
            case 'turnStart':
                this.updateTurnStart();
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'phaseChange':
                this.updatePhase();
                break;
            case 'actionList':
                this.updateActionList()
                break;
            case 'actionTargetList':
                this.updateActionTargetList()
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    BattleManager.updateEvent = function() {
        if (this._processingForcedAction) return false;
        switch (this._phase) {
        case 'start':
        case 'turnStart':
        case 'turn':
        case 'turnEnd':
        case 'actionList':
        case 'actionTargetList':
          if (this.isActionForced()) {
            this.processForcedAction();
            return true;
          } else {
            return this.updateEventMain();
          }
        }
        return this.checkAbort();
    };
    
    var _YPE_BEC_BattleManager_forceAction = BattleManager.forceAction;
    BattleManager.forceAction = function(battler) {
        if (this._subject) this._subject.clearResult();
        this.createForceActionFailSafes();
        this.savePreForceActionSettings();
        _YPE_BEC_BattleManager_forceAction.call(this, battler);
    };

    var _YPE_BEC_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (this._subject) {
          this._subject.onAllActionsEnd();
        }
        if (this._processingForcedAction) {
        this._subject.removeCurrentAction();
          this._phase = this._preForcePhase;
        }
        this._processingForcedAction = false;
        if (this.loadPreForceActionSettings()) return;
        _YPE_BEC_BattleManager_endAction.call(this);
    };

    Game_System.prototype.initBattleSystem = function() {
        this._battleSystem = 'dtb';
    };

    Scene_Battle.prototype.isStartActorCommand = function() {
        return false
    };

    var _YPE_BEC_Scene_Battle_startPartyCommandSelection =
        Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        if (this.isStartActorCommand()) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        } else {
            _YPE_BEC_Scene_Battle_startPartyCommandSelection.call(this);
        }
    };

    var _YPE_BEC_Scene_Battle_selectNextCommand =
        Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
        _YPE_BEC_Scene_Battle_selectNextCommand.call(this);
        this._helpWindow.clear();
        BattleManager.stopAllSelection();
    };

    }// YEP_BattleEngineCore.js

}());//EOF
