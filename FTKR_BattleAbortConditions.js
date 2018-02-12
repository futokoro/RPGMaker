//=============================================================================
// 設定した条件を満たすと、バトルを中断して勝利または敗北するプラグイン
// FTKR_BattleAbortConditions.js
// 作成者     : フトコロ
// 作成日     : 2018/02/12
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BAC = true;

var FTKR = FTKR || {};
FTKR.BAC = FTKR.BAC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 設定した条件を満たすと、バトルを中断して勝利または敗北する
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 特定の条件になると、バトルを中断し、勝利または敗北にします。
 * 以下のプラグインコマンドを実行することで、条件を設定できます。
 * 
 * 1. 勝利中断条件の設定
 * 
 * BAC_勝利中断条件設定 条件式
 * BAC_SET_ABORT_WIN script
 * 
 * 条件式(script)をスクリプト形式で設定することで、戦闘を中断し勝利します。
 * なお、条件式には半角スペースはいれてはいけません。
 * この設定は、以後すべての戦闘に適用します。
 * 
 * 例)
 * BAC_勝利中断条件設定 $gameTroop._turnCount>=5&&BattleManager.isTurnEnd()
 *   ５ターン経過すると、ターン終了時に勝利します。
 *   $gameTroop._turnCountで経過ターン数を取得し、
 *   BattleManager.isTurnEnd()で、ターン終了時かどうか判定します。
 * 
 * 勝利中断条件を初期化する場合は、以下のプラグインコマンドを実行してください。
 * BAC_勝利中断条件初期化
 * BAC_CLEAR_ABORT_WIN
 * 
 * 
 * ２．敗北中断条件の設定
 * BAC_敗北中断条件設定 条件式
 * BAC_SET_ABORT_LOSE script
 * 
 * 条件式(script)をスクリプト形式で設定することで、戦闘を中断し敗北します。
 * なお、条件式には半角スペースはいれてはいけません。
 * この設定は、以後すべての戦闘に適用します。
 * 
 * 例)
 * BAC_敗北中断条件設定 $gameActors.actor(1).isDead()
 *   アクターID1のキャラが戦闘不能になると敗北します。
 * 
 * 敗北中断条件を初期化する場合は、以下のプラグインコマンドを実行してください。
 * BAC_敗北中断条件初期化
 * BAC_CLEAR_ABORT_LOSE
 * 
 * 
 *-----------------------------------------------------------------------------
 * ！！注意事項！！
 *-----------------------------------------------------------------------------
 * 設定した条件は、初期化するまですべての戦闘で有効です。
 * そのため、エンカウント戦闘でも条件を満たすと勝利または敗北になるため
 * 適宜、初期化コマンドを実行してください。
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
 * v1.0.0 - 2018/02/12 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

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
    // Game_Interpreter
    // プラグインコマンドの追加
    //=============================================================================

    var _BAC_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command.match(/BAC_(.+)/i)) {
            command = (RegExp.$1 + '').toUpperCase();
            switch (command) {
                case '敗北中断条件設定':
                case 'SET_ABORT_LOSE':
                    $gamePlayer.setBattleAbortCondition('lose', args[0]);
                    break;
                case '敗北中断条件初期化':
                case 'CLEAR_ABORT_LOSE':
                    $gamePlayer.setBattleAbortCondition('lose', '');
                    break;
                case '勝利中断条件設定':
                case 'SET_ABORT_WIN':
                    $gamePlayer.setBattleAbortCondition('win', args[0]);
                    break;
                case '勝利中断条件初期化':
                case 'CLEAR_ABORT_WIN':
                    $gamePlayer.setBattleAbortCondition('win', '');
                    break;
            }
        } else {
            _BAC_Game_Interpreter_pluginCommand.call(this, command, args);
        }
    };
    
    Game_Player.prototype.setBattleAbortCondition = function(type, conditions) {
        if (!this._battleAbortCondition) this._battleAbortCondition = {};
        this._battleAbortCondition[type] = conditions;
    };

    //=============================================================================
    // BattleManager
    // バトル中断条件の変更
    //    プラグインパラメータで共通設定
    //    イベント内容で個別設定
    //=============================================================================

    BattleManager.bacCheckAbort = function() {
        var c = $gamePlayer._battleAbortCondition;
        if (!this.isBattleEnd() && c) {
            if (FTKR.evalFormula(c.lose)) {
                this.processDefeat();
                return true;
            } else if (FTKR.evalFormula(c.win)) {
                this.processVictory();
                return true;
            }
        }
        return false;
    };

    var _BAC_BattleManager_checkAbort = BattleManager.checkAbort;
    BattleManager.checkAbort = function() {
        if (this.bacCheckAbort()) {
            return true;
        }
        return _BAC_BattleManager_checkAbort.call(this);
    };

    var _BAC_BattleManager_checkAbort2 = BattleManager.checkAbort2;
    BattleManager.checkAbort2 = function() {
        if (this.bacCheckAbort()) {
            return true;
        }
        return _BAC_BattleManager_checkAbort2.call(this);
    };

}());//EOF
