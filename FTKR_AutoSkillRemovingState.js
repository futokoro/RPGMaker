//=============================================================================
// ステート解除時に自動でスキルを発動させるプラグイン
// FTKR_AutoSkillInState.js
// 作成者     : フトコロ
// 作成日     : 2017/04/27
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASS = true;

var FTKR = FTKR || {};
FTKR.ASS = FTKR.ASS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 ステート解除時に自動でスキルを発動させるプラグイン
 * @author フトコロ
 *
 * @param ------
 * @default
 * 
 * @param 
 * @desc 
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のタグをステートのメモ欄に追記すると、ステートを解除したターンの最後に
 * 指定したスキルを自動で発動させます。
 * 
 * <ASS_解除発動: x>
 *    :x - スキルID
 * 
 * ダメージでも自動解除でもどちらでも発動します。
 * なお、発動させるスキルの範囲は、全体またはランダムから選択してください。
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
 * v1.0.0 - 2017/04/27 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ASS.parameters = PluginManager.parameters('FTKR_AutoSkillInState');

//=============================================================================
// BattleManager
//=============================================================================

FTKR.ASS.BattleManager_update = BattleManager.update;
BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'autoSkill':
            this.updateAutoSkill();
            break;
        case 'autoSkillAction':
            this.updateAutoSkillAction();
            break;
        default:
            FTKR.ASS.BattleManager_update.call(this);
            break;
        }
    }
};

FTKR.ASS.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    this._autoSkills = [];
    FTKR.ASS.BattleManager_startTurn.call(this);
};

FTKR.ASS.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    FTKR.ASS.BattleManager_endTurn.call(this);
    if (this._autoSkills.length) {
        this._phase = 'autoSkill'
    }
};

BattleManager.updateAutoSkill = function() {
    $gameParty.requestMotionRefresh();
    if (!this._subject) {
        var autoSkill = this._autoSkills.shift();
    }
    if (autoSkill) {
        this.startAutoSkillAction(autoSkill);
        this._subject.removeCurrentAction();
    } else {
        this._phase = 'turnEnd';
    }
};

BattleManager.startAutoSkillAction = function(autoSkill) {
    var subject = autoSkill.subject;
    this._subject = subject;
    var action = new Game_Action(subject);
    action.setSkill(autoSkill.id);
    var targets = action.makeTargets();
    this._phase = 'autoSkillAction';
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startAction(subject, action, targets);
};

BattleManager.updateAutoSkillAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        this.endAutoSkill();
    }
};

BattleManager.endAutoSkill = function() {
    this._logWindow.endAction(this._subject);
    this._phase = 'autoSkill';
};

//書き換え
Game_Battler.prototype.removeStatesAuto = function(timing) {
    this.states().forEach(function(state) {
        if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
            var skillId = Number(state.meta['ASS_解除発動']);
            if (skillId) BattleManager._autoSkills.push({id:skillId, subject:this});
            this.removeState(state.id);
        }
    }, this);
};

//書き換え
Game_Battler.prototype.removeStatesByDamage = function() {
    this.states().forEach(function(state) {
        if (state.removeByDamage && Math.randomInt(100) < state.chanceByDamage) {
            var skillId = Number(state.meta['ASS_解除発動']);
            if (skillId) BattleManager._autoSkills.push({id:skillId, subject:this});
            this.removeState(state.id);
        }
    }, this);
};
