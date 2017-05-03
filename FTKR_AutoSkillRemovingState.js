//=============================================================================
// ステート解除時に自動でスキルを発動させるプラグイン
// FTKR_AutoSkillRemovingState.js
// 作成者     : フトコロ
// 作成日     : 2017/04/27
// 最終更新日 : 2017/05/03
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASS = true;

var FTKR = FTKR || {};
FTKR.ASS = FTKR.ASS || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 ステート解除時に自動でスキルを発動させるプラグイン
 * @author フトコロ
 *
 * @param 
 * @desc 
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のタグをステートのメモ欄に追記すると、ステートを解除(*1)した時点(*2)で
 * 指定したスキルを自動で発動(*3)させます。
 * 
 * <ASS_解除発動: x>
 *    :x - スキルID
 * 
 * (*1) ステートの解除条件に設定した内容に従います。
 * (*2) ダメージで解除の場合はダメージを受けた時点で、ターン終了時なら
 *      ターン終了時に発動します。
 * (*3) スキルの範囲が「敵単体」の場合は、「敵１体ランダム」になります。
 * 
 * 
 * また、以下のタグを追記すると、解除時に最後にダメージを与えた相手(*3)を
 * スキル発動のターゲットにします。
 * 
 * <ASS_リベンジターゲット>
 * 
 * (*3) ダメージ解除の場合は、ダメージを与えた相手です。
 *      解除後にダメージを与えた相手は、ターゲットにしません。
 * 
 * 
 * 解除時に誰にもダメージを与えられていない場合は、スキルの範囲設定に従い
 * スキルを発動します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 * 2. 他プラグインと組み合わせる場合
 *    当プラグインは以下のプラグインよりも下にしてください。
 *      YEP_BattleEngineCore.js
 *      YEP_X_BattleSysATB.js
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
 * v1.1.0 - 2017/05/03 : YEP_BattleEngineCoreに対応、仕様変更
 *    1. ダメージで解除した時のスキル発動タイミングを変更。
 * v1.0.2 - 2017/05/02 : 例外処理を追加。
 * v1.0.1 - 2017/04/28 : ダメージを与えた相手にスキルを発動する機能追加
 * v1.0.0 - 2017/04/27 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ASS.parameters = PluginManager.parameters('FTKR_AutoSkillRemovingState');

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

FTKR.ASS.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    FTKR.ASS.BattleManager_endAction.call(this);
    if (this._autoSkills && this._autoSkills.length) {
        this._keepPhase = this._phase;
        this._phase = 'autoSkill'
    }
};

FTKR.ASS.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    FTKR.ASS.BattleManager_endTurn.call(this);
    if (this._autoSkills && this._autoSkills.length) {
        this._keepPhase = this._phase;
        this._phase = 'autoSkill'
    }
};

BattleManager.updateAutoSkill = function() {
    $gameParty.requestMotionRefresh();
    var autoSkill = this._autoSkills.shift();
    if (autoSkill) {
        this.startAutoSkillAction(autoSkill);
        this._subject.removeCurrentAction();
    } else {
        this._phase = this._keepPhase;
    }
};

BattleManager.startAutoSkillAction = function(autoSkill) {
    var subject = autoSkill.subject;
    this._subject = subject;
    var action = new Game_Action(subject);
    action.setSkill(autoSkill.id);
    var targets = !!autoSkill.target ? [autoSkill.target] : action.makeTargets();
    this._phase = 'autoSkillAction';
    this._action = action;
    this._targets = targets;
    if (Imported.YEP_BattleEngineCore) {
        this.setTargets(targets);
        this._allTargets = targets.slice();
        this._individualTargets = targets.slice();
        this._phase = 'phaseChange';
        this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
        this._returnPhase = '';
        this._actionList = [];
    }
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

//=============================================================================
// Game_Battler
//=============================================================================

FTKR.ASS.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    FTKR.ASS.Game_Battler_initMembers.call(this);
    this.clearRevenge();
};

Game_Battler.prototype.clearRevenge = function() {
    this._revenge = {
        skillId   :false,
        stateId   :false,
        subject   :null,
        id        :-1,
        opponent  :false
    };
};

//書き換え
Game_Battler.prototype.removeStatesAuto = function(timing) {
    this.states().forEach(function(state) {
        if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
            this.setAssAutoSkill(state);
            this.setRevengeData();
            this.removeState(state.id);
        }
    }, this);
};

//書き換え
Game_Battler.prototype.removeStatesByDamage = function() {
    this.states().forEach(function(state) {
        if (state.removeByDamage && Math.randomInt(100) < state.chanceByDamage) {
            this.setAssAutoSkill(state);
            this.removeState(state.id);
        }
    }, this);
};

Game_Battler.prototype.setAssAutoSkill = function(obj) {
    var skillId = Number(obj.meta['ASS_解除発動']);
    if (skillId) {
        this._revenge.skillId = skillId;
        this._revenge.subject = this;
        this._revenge.stateId = obj.id;
    } else {
        this._revenge.skillId = false;
        this._revenge.subject = null;
        this._revenge.stateId = false;
    }
};

Game_Battler.prototype.setRevengeData = function() {
    var revenge = this._revenge;
    if (revenge.skillId) {
        var target = $dataStates[revenge.stateId].meta['ASS_リベンジターゲット'] ? this.revengeTarget() : null;
        if (!BattleManager._autoSkills) BattleManager._autoSkills = [];
        BattleManager._autoSkills.push({id:revenge.skillId, subject:revenge.subject, target:target});
        this.clearRevenge();
    }
};

Game_Battler.prototype.revengeTarget = function() {
    var revenge = this._revenge;
    if (!revenge || revenge.id === -1) return null;
    if (revenge.opponent) {
        return $gameTroop.members()[revenge.id];
    } else {
        return $gameParty.members()[revenge.id];
    }
};

FTKR.ASS.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (!this._removeStates) this._removeStates = [];
    this._removeStates.push(stateId);
    FTKR.ASS.Game_Battler_removeState.call(this, stateId);
};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.ASS.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    FTKR.ASS.Game_Action_apply.call(this, target);
    var result = target.result();
    if (result.isHit() && (result.hpDamage || result.mpDamage)) {
        this.setRevengeTarget(target);
        target.setRevengeData();
    }
};

Game_Action.prototype.setRevengeTarget = function(target) {
    var memberId = -1;
    var subject = this.subject();
    if (subject.isEnemy()) {
        $gameTroop.members().forEach( function(member, i){
            if (member === subject) memberId = i;
        });
    } else {
        $gameParty.members().forEach( function(member, i){
            if (member === subject) memberId = i;
        });
    }
    target._revenge.id = memberId,
    target._revenge.opponent = subject.isEnemy()
};

//=============================================================================
// YEP_BattleEngineCoreの修正
//=============================================================================
if (Imported.YEP_BattleEngineCore) {

FTKR.ASS.Game_BattlerBase_updateStateTurnTiming = Game_BattlerBase.prototype.updateStateTurnTiming;
Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
    this._removeStates = [];
    FTKR.ASS.Game_BattlerBase_updateStateTurnTiming.call(this, timing);
    if (this._removeStates.length) {
        this._removeStates.forEach( function(removeState){
            if (!removeState) return;
            this.setAssAutoSkill($dataStates[removeState]);
            this.setRevengeData();
        },this);
    }
};

}//YEP_BattleEngineCore