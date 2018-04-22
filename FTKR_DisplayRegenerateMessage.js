//=============================================================================
// HP再生値をバトルログに表示するプラグイン
// FTKR_DisplayRegenerateMessage.js
// プラグインNo : 41
// 作成者     : フトコロ
// 作成日     : 2017/05/26
// 最終更新日 : 2017/05/27
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DRM = true;

var FTKR = FTKR || {};
FTKR.DRM = FTKR.DRM || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 HP再生値をバトルログに表示するプラグイン
 * @author フトコロ
 * 
 * @param --HP再生--
 * @desc  
 * 
 * @param Regenerate HP Plus
 * @desc  HP再生時(増加)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 回復した！
 * 
 * @param Regenerate HP Minus
 * @desc  HP再生時(減少)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 減少した！
 * 
 * @param --MP再生--
 * @desc  
 * 
 * @param Regenerate MP Plus
 * @desc  MP再生時(増加)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 回復した！
 * 
 * @param Regenerate MP Minus
 * @desc  HP再生時(減少)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 減少した！
 * 
 * @param --TP再生--
 * @desc  
 * 
 * @param Regenerate TP Plus
 * @desc TP再生時(増加)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 増加量
 * @default %1 の %2 が %3 増加した！
 * 
 * @param Regenerate TP Minus
 * @desc  TP再生時(減少)のメッセージ
 * %1 - 対象の名前, %2 - ステータス名, %3 - 回復量
 * @default %1 の %2 が %3 減少した！
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 各種再生率による回復量をバトルログに表示します。
 * 
 * 表示するメッセージはプラグインパラメータで設定できます。
 * 増加時と減少時でメッセージを変えることが出来ます。
 * 
 * プラグインパラメータを空欄にした場合は、表示しません。
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
 * v1.1.0 - 2017/05/27 : 仕様変更
 *    1. 増加時と減少時でメッセージを分離。
 *    2. HPとMPのメッセージを分離。
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
    hpPlus :String(FTKR.DRM.parameters['Regenerate HP Plus'] || ''),
    mpPlus :String(FTKR.DRM.parameters['Regenerate MP Plus'] || ''),
    tpPlus :String(FTKR.DRM.parameters['Regenerate TP Plus'] || ''),
    hpMinus:String(FTKR.DRM.parameters['Regenerate HP Minus'] || ''),
    mpMinus:String(FTKR.DRM.parameters['Regenerate MP Minus'] || ''),
    tpMinus:String(FTKR.DRM.parameters['Regenerate TP Minus'] || ''),
};

//=============================================================================
// バトルログにテキストを表示
//=============================================================================
BattleManager.setupBattleLogMessage = function(text) {
    if (text) {
        this._logWindow.push('addText', text);
        this._drmLogMessage = true;
    }
};

BattleManager.clearBattleLogMessage = function() {
    if (this._drmLogMessage) {
        var window = this._logWindow;
        window.push('wait');
        window.push('clear');
        this._drmLogMessage = false;
    }
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
        var message = value > 0 ? FTKR.DRM.message.hpPlus : FTKR.DRM.message.hpMinus;
        this.setupBattleLogMessage(value, message, TextManager.hp);
    }
};

//書き換え
Game_Battler.prototype.regenerateMp = function() {
    var value = Math.floor(this.mmp * this.mrg);
    if (value !== 0) {
        this.gainMp(value);
        var message = value > 0 ? FTKR.DRM.message.mpPlus : FTKR.DRM.message.mpMinus;
        this.setupBattleLogMessage(value, message, TextManager.mp);
    }
};

//書き換え
Game_Battler.prototype.regenerateTp = function() {
    var value = Math.floor(100 * this.trg);
    this.gainSilentTp(value);
    if (value !== 0) {
        var message = value > 0 ? FTKR.DRM.message.tpPlus : FTKR.DRM.message.tpMinus;
        this.setupBattleLogMessage(value, message, TextManager.tp);
    }
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
    BattleManager.setupBattleLogMessage(fmt.format(this.name(), status, Math.abs(value)));
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.setupBattleLogMessage = function(value, fmt, status) {
    BattleManager.setupBattleLogMessage(fmt.format(this.name(), status, Math.abs(value)));
};