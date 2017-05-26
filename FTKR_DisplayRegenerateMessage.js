//=============================================================================
// HP再生値をバトルログに表示するプラグイン
// FTKR_DisplayRegenerateMessage.js
// 作成者     : フトコロ
// 作成日     : 2017/05/26
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DRM = true;

var FTKR = FTKR || {};
FTKR.DRM = FTKR.DRM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 HP再生値をバトルログに表示するプラグイン
 * @author フトコロ
 * 
 * @param Regenerate HPMP Message
 * @desc  HPMP再生時のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 回復した！
 * 
 * @param Regenerate TP Message
 * @desc TP再生時のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 増加量
 * @default %1 の %2 が %3 増加した！
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 各種再生率による回復量をバトルログに表示します。
 * 
 * 表示するメッセージはプラグインパラメータで設定できます。
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
 * v1.0.0 - 2017/05/26 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.DRM.parameters = PluginManager.parameters('FTKR_DisplayRegenerateMessage');

FTKR.DRM.message = {
    hpmp:String(FTKR.DRM.parameters['Regenerate HPMP Message'] || ''),
    tp:String(FTKR.DRM.parameters['Regenerate TP Message'] || ''),
};

//=============================================================================
// バトルログにテキストを表示
//=============================================================================
BattleManager.setupBattleLogMessage = function(text) {
    if (text) {
        var window = this._logWindow;
        window.push('addText', text);
    }
};

BattleManager.clearBattleLogMessage = function() {
    var window = this._logWindow;
    window.push('wait');
    window.push('clear');
};


//=============================================================================
// 再生の処理
//=============================================================================

//書き換え
Game_Battler.prototype.regenerateHp = function() {
    var value = Math.floor(this.mhp * this.hrg);
    value = Math.max(value, -this.maxSlipDamage());
    if (value !== 0) {
        this.gainHp(value);
        this.setupBattleLogMessage(value, FTKR.DRM.message.hpmp, TextManager.hp);
    }
};

//書き換え
Game_Battler.prototype.regenerateMp = function() {
    var value = Math.floor(this.mmp * this.mrg);
    if (value !== 0) {
        this.gainMp(value);
        this.setupBattleLogMessage(value, FTKR.DRM.message.hpmp, TextManager.mp);
    }
};

//書き換え
Game_Battler.prototype.regenerateTp = function() {
    var value = Math.floor(100 * this.trg);
    this.gainSilentTp(value);
    if(value) this.setupBattleLogMessage(value, FTKR.DRM.message.tp, TextManager.tp);
};

FTKR.DRM.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    FTKR.DRM.Game_Battler_regenerateAll.call(this);
    BattleManager.clearBattleLogMessage();
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.setupBattleLogMessage = function(value, fmt, status) {
    BattleManager.setupBattleLogMessage(fmt.format(this.name(), status, value))
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.setupBattleLogMessage = function(value, fmt, status) {
    BattleManager.setupBattleLogMessage(fmt.format(this.name(), status, value))
};