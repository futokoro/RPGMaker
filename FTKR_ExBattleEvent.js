//=============================================================================
// バトルイベントを拡張するプラグイン
// FTKR_ExBattleEvent.js
// 作成者     : フトコロ
// 作成日     : 2017/05/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBE = true;

var FTKR = FTKR || {};
FTKR.EBE = FTKR.EBE || {};

/*:
 * @plugindesc v1.0.0 バトルイベントを拡張するプラグイン
 * @author フトコロ
 * 
 * @param Victory Event
 * @desc 戦闘勝利時に実行するコモンイベントID
 * 0 - 実行しない
 * @default 
 * 
 * @param Defeat Event
 * @desc 戦闘敗北時に実行するコモンイベントID
 * 0 - 実行しない
 * @default 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、バトルイベントを拡張します。
 * 
 * １．通常の戦闘勝利時の処理(*1)の替わりに、コモンイベントまたは敵グループに
 * 　　設定したイベントを実行します。
 * 
 * ２．通常の戦闘敗北時の処理(*1)の替わりに、コモンイベントまたは敵グループに
 * 　　設定したイベントを実行します。
 * 
 * (*1)戦闘終了時のステートの解除から、勝利等のメッセージ、戦闘報酬の処理など
 * 
 * 
 * イベントの処理が終了すると、バトル画面が終了します。
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
 * 戦闘勝利時のイベントの設定
 *-----------------------------------------------------------------------------
 * 通常の戦闘勝利時の処理の替わりに、コモンイベントまたは敵グループに
 * 設定したイベントを実行します。
 * 
 * 実行するイベントは以下のいずれかです。
 * １．プラグインパラメータ<Victory Event>に設定したIDのコモンイベント
 * ２．敵グループのバトルイベントで、注釈で<EBE_戦闘勝利時>と記入したページ
 * 
 * １と２どちらもある場合は、バトルイベントを実行します。
 * 
 * バトルイベント内では、this._eventId で敵グループIdを取得できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 戦闘勝利時の処理について
 *-----------------------------------------------------------------------------
 * 通常、戦闘勝利時には以下の処理を実行しています。
 * 当プラグインによって、戦闘勝利イベントを差し替えた場合、これらの処理が
 * 必要な場合はイベント内で実行しなくてはいけません。
 * 
 * 
 * １．戦闘終了時のステート解除
 * パーティー内に、戦闘終了時に解除されるステートを受けている場合に
 * それを解除します。
 * 
 * プラグインコマンド
 * 　EBE_戦闘終了時ステート解除
 * 　EBE_REMOVE_BATTLE_STATES
 * 
 * 
 * ２．勝利モーションの実行
 * パーティーメンバーが、戦闘勝利モーションを実行します。
 * 
 * プラグインコマンド
 * 　EBE_勝利モーション実行
 * 　EBE_PREFORM_VICTORY
 * 
 * 
 * ３．勝利MEの演奏
 * データベースの[システム]-[音楽]で設定した勝利MEを演奏します。
 * 
 * プラグインコマンド
 * 　EBE_勝利ME演奏
 * 　EBE_PLAY_VICTORY_ME
 * 
 * 
 * ４．BGMBGSの再開
 * 戦闘前のBGMとBGSを再開します。
 * 
 * プラグインコマンド
 * 　EBE_BGMBGS再開
 * 　EBE_REPLAY_BGM_AND_BGS
 * 
 * 
 * ５．戦闘報酬の計算
 * 経験値やお金、アイテムの計算を行います。
 * 入手するアイテムはこのコマンドで選定されます。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬計算
 * 　EBE_MAKE_REWARDS
 * 
 * 
 * ６．勝利メッセージの表示
 * データベースの[用語]-[メッセージ]で設定した勝利メッセージを表示します。
 * 
 * プラグインコマンド
 * 　EBE_勝利メッセージ表示
 * 　EBE_DISPLAY_VICTORY_MESSAGE
 * 
 * 
 * ７．戦闘報酬の表示
 * 戦闘報酬の計算結果に合わせて、データベースの[用語]-[メッセージ]で設定した
 * メッセージを表示します。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬表示
 * 　EBE_DISPLAY_REWARDS
 * 
 * 　
 * ８．戦闘報酬の入手
 * 戦闘報酬の計算結果をパーティーメンバーに反映します。
 * このコマンドを実行しないと、経験値やお金アイテムは実際に入手できません。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬入手
 * 　EBE_GAIN_REWARDS
 * 
 * 
 *-----------------------------------------------------------------------------
 * 戦闘敗北時のイベントの設定
 *-----------------------------------------------------------------------------
 * 通常の戦闘敗北時の処理の替わりに、コモンイベントまたは敵グループに
 * 設定したイベントを実行します。
 * 
 * 実行するイベントは以下のいずれかです。
 * １．プラグインパラメータ<Defeat Event>に設定したIDのコモンイベント
 * ２．敵グループのバトルイベントで、注釈で<EBE_戦闘敗北時>と記入したページ
 * 
 * １と２どちらもある場合は、バトルイベントを実行します。
 * 
 * バトルイベント内では、this._eventId で敵グループIdを取得できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 戦闘敗北時の処理について
 *-----------------------------------------------------------------------------
 * 通常、戦闘敗北時には以下の処理を実行しています。
 * 当プラグインによって、戦闘敗北イベントを差し替えた場合、これらの処理が
 * 必要な場合はイベント内で実行しなくてはいけません。
 * 
 * 
 * １．敗北メッセージの表示
 * データベースの[用語]-[メッセージ]で設定した敗北メッセージを表示します。
 * 
 * プラグインコマンド
 * 　EBE_敗北メッセージ表示
 * 　EBE_DISPLAY_DEFEAT_MESSAGE
 * 
 * 
 * ２．敗北MEの演奏
 * データベースの[システム]-[音楽]で設定した敗北MEを演奏します。
 * 
 * プラグインコマンド
 * 　EBE_敗北ME演奏
 * 　EBE_PLAY_DEFEAT_ME
 * 
 * 
 * ３．BGMBGSの再開　または　BGMの停止
 * 戦闘前のBGMとBGSを再開するか、またはBGMを停止します。
 * マップイベントで戦闘の敗北を許可しているかどうかで条件分岐します。
 * 
 * 戦闘の敗北フラグ
 * 　BattleManager._canLose
 * 
 * BGMBGSの再開のプラグインコマンド
 * 　EBE_BGMBGS再開
 * 　EBE_REPLAY_BGM_AND_BGS
 * 
 * BGMの停止のプラグインコマンド
 * 　EBE_BGM停止
 * 　EBE_STOP_BGM
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * バトルイベント用に以下のプラグインコマンドが使用できます。
 * 
 * １．パーティーメンバーに指定のモーションをとらせる
 * 　EBE_モーション実行 [モーション名]
 * 　EBE_REQUEST_MOTION [MOTION NAME]
 * 
 * モーション名(MOTION NAME)には以下を入力してください。(要小文字)
 *    walk, wait, chant, guard, damage, evade, thrust, swing,
 *    missile, skill, spell, item, escape, victory, dying,
 *    abnormal, sleep, dead,
 * 
 * 
 * ２．戦闘を再開する
 * 　EBE_戦闘再開
 * 　EBE_RESTART_BATTLE
 * 
 * 勝利イベントや敗北イベントはイベント終了時にバトルが終了しますが
 * このコマンドを実行することで、バトルを再開します。
 * ただし、エネミーが何もいない場合や、アクターが全員戦闘不能な場合は
 * バトルを再開しても、すぐに勝利イベントや敗北イベントを再度実行します。
 * 
 * このコマンドがイベント中常に実行する場合はバトルが終わりません。
 * バトルを終わらせる時に、条件分岐等で再開コマンドを実行しないように
 * イベントを組んでください。
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
 * v1.0.0 - 2017/05/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EBE.parameters = PluginManager.parameters('FTKR_ExBattleEvent');

FTKR.EBE.battleEnd = {
    victory : Number(FTKR.EBE.parameters['Victory Event'] || 0),
    defeat : Number(FTKR.EBE.parameters['Defeat Event'] || 0),
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

//=============================================================================
// プラグインコマンド
//=============================================================================

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
            $gameParty.requestMotion(args[0]);
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
            break;
        case '敗北メッセージ表示':
        case 'DISPLAY_DEFEAT_MESSAGE':
            BattleManager.displayDefeatMessage();
            break;
        case '戦闘報酬表示':
        case 'DISPLAY_REWARDS':
            BattleManager.displayRewards();
            break;
        case '戦闘報酬入手':
        case 'GAIN_REWARDS':
            BattleManager.gainRewards();
            break;
        case '戦闘再開':
        case 'RESTART_BATTLE':
            BattleManager._checkEbeBattleEvent = false;
            break;
    }
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.EBE.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    FTKR.EBE.BattleManager_initMembers.call(this);
    this._checkEbeBattleEvent = false;
};

FTKR.EBE.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    if (FTKR.EBE.battleEnd.victory && !this._checkEbeBattleEvent) {
        console.log('setupEbeBattleEvent', this._phase);
        if ($gameTroop.setupEbeBattleEvent('victory', ['EBE_戦闘勝利時'])) this._checkEbeBattleEvent = true;
        return true;
    }
    if (!this._checkEbeBattleEvent) {
        FTKR.EBE.BattleManager_processVictory.call(this);
    } else {
        console.log('battle End');
        this.endBattle(0);
    }
};

FTKR.EBE.BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
    if (FTKR.EBE.battleEnd.defeat && !this._checkEbeBattleEvent) {
        if ($gameTroop.setupEbeBattleEvent('defeat', ['EBE_戦闘敗北時'])) this._checkEbeBattleEvent = true;
        return true;
    }
    if (!this._checkEbeBattleEvent) {
        FTKR.EBE.BattleManager_processDefeat.call(this);
    } else {
        this.endBattle(2);
    }
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
