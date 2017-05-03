//=============================================================================
// 特定条件で自動でスキルを発動させるプラグイン
// FTKR_AutoInvokeSkill.js
// 作成者     : フトコロ
// 作成日     : 2017/05/03
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AIS = true;

var FTKR = FTKR || {};
FTKR.AIS = FTKR.AIS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 特定条件で自動でスキルを発動させるプラグイン
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
 * 特定条件で自動でスキルを発動させることができます。
 * 
 * 発動できる条件は、以下の通りです。
 * 
 * 1. 行動後に指定した条件式を満たした時
 * 2. 付与されていたステートが解除された時
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
 * 行動後に指定した条件式を満たした時に発動
 *-----------------------------------------------------------------------------
 * 以下のタグをスキルのメモ欄に追記すると、設定した条件式を満たしたターンの
 * 終わりに、スキルを自動発動します。
 * なお、同じスキルは１ターンに１回だけ発動します。
 * 
 * <AIS_発動条件>
 * 条件式
 * </AIS_発動条件>
 * 
 * または
 * 
 * <ASC_INVOKE_CONDITIONS>
 * 条件式
 * </ASC_INVOKE_CONDITIONS>
 * 
 * 
 * [条件式(eval) の値について]
 * 条件式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - 行動したキャラのパラメータを参照します。
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 * 入力例）
 * キャラのTPが 50 以上になると自動発動。
 * <AIS_発動条件>
 * a.tp >= 50
 * </AIS_発動条件>
 * 
 * 
 * [条件式を設定する上での注意点]
 * スキルは、条件を満たした時に発動します。
 * つまり、条件を満たしている間は常に発動するようになります。
 * スキルの仕様が、何度も発動してもよいものであれば問題ありませんが
 * そうでない場合は、何度も発動させないように条件式を設定しましょう。
 * 
 * 
 * [複数の条件を設定する場合]
 * 以下の2種類の入力例は同じ意味です。
 * 
 * 1. 縦に複数の条件式を並べる
 * <ASC_付与条件>
 * 条件式1
 * 条件式2
 * </ASC_付与条件>
 * 
 * 2. '&&'を使用して横に複数の条件式を並べる
 * <ASC_付与条件>
 * 条件式1 && 条件式2
 * </ASC_付与条件>
 * 
 * 
 *-----------------------------------------------------------------------------
 * ステート解除時に発動
 *-----------------------------------------------------------------------------
 * 以下のタグをステートのメモ欄に追記すると、ステートを解除(*1)した時点(*2)で
 * 指定したスキルを自動で発動(*3)させます。
 * 
 * <AIS_解除発動: x>
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
 * <AIS_リベンジターゲット>
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
 * v1.0.0 - 2017/05/03 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.AIS.parameters = PluginManager.parameters('FTKR_AutoInvokeSkill');

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
// 自作関数(ローカル)
//=============================================================================

Array.prototype.convertEntrapmentRegArray = function() {
    return this.map(function(str) {
        return {
            a:new RegExp('<' + str + '>', 'i'),
            b:new RegExp('<\/' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列とdataをテストする
Array.prototype.testRegs = function(data, prop) {
    return this.some(function(reg) {
        return prop ? reg[prop].test(data) : reg.test(data);
    });
};

// <codeTitle>text</codeTitle>の形式のメタデータを読み取ってtextを返す
var readEntrapmentCodeToText = function(obj, codeTitles) {
    notes = codeTitles.convertEntrapmentRegArray();
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (notes.testRegs(line, 'a')) {
            var text = '';
            setMode = 'read';
        } else if (notes.testRegs(line, 'b')) {
            setMode = 'none';
        } else if (setMode === 'read') {
            text += line + ';';
        }
    }
    return text;
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

DataManager.convertRefreshConditions = function(obj) {
    return convertTextToConditions(readEntrapmentCodeToText(obj, ['AIS_発動条件', 'ASC_INVOKE_CONDITIONS']));
};

DataManager.evalRefreshConditions = function(obj) {
    var formula = this.convertRefreshConditions(obj);
    if (!formula) return false;
    return FTKR.evalFormula(formula);
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.AIS.BattleManager_update = BattleManager.update;
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
            FTKR.AIS.BattleManager_update.call(this);
            break;
        }
    }
};

FTKR.AIS.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    this._autoSkills = [];
    FTKR.AIS.BattleManager_startTurn.call(this);
};

FTKR.AIS.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    FTKR.AIS.BattleManager_endAction.call(this);
    if (this._autoSkills && this._autoSkills.length) {
        this._keepPhase = this._phase;
        this._phase = 'autoSkill'
    }
};

FTKR.AIS.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    FTKR.AIS.BattleManager_endTurn.call(this);
    if (this._autoSkills && this._autoSkills.length) {
        this._keepPhase = this._phase;
        this._phase = 'autoSkill'
    }
};

BattleManager.updateAutoSkill = function() {
    $gameParty.requestMotionRefresh();
    console.log(this._autoSkills);
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
    this._onAutoSkill = true;
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
    this._onAutoSkill = false;
    this._phase = 'autoSkill';
};

//=============================================================================
// Game_Battler
//=============================================================================

FTKR.AIS.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    FTKR.AIS.Game_Battler_initMembers.call(this);
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
    var skillId = Number(obj.meta['AIS_解除発動']);
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
        var target = revenge.stateId && $dataStates[revenge.stateId].meta['AIS_リベンジターゲット'] ? this.revengeTarget() : null;
        if (!BattleManager._autoSkills) BattleManager._autoSkills = [];
        var autoSkill = {id:revenge.skillId, subject:revenge.subject, target:target};
        if (!this.isSettingAutoSkill(autoSkill)) {
            BattleManager._autoSkills.push(autoSkill);
            this.clearRevenge();
        }
    }
};

Game_Battler.prototype.isSettingAutoSkill = function(autoSkill) {
    return BattleManager._autoSkills.some( function(_autoSkill){
        return _autoSkill.id === autoSkill.id;
    });
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

FTKR.AIS.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (!this._removeStates) this._removeStates = [];
    this._removeStates.push(stateId);
    FTKR.AIS.Game_Battler_removeState.call(this, stateId);
};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.AIS.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    FTKR.AIS.Game_Action_apply.call(this, target);
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
// 行動後のステータス更新時
//=============================================================================

FTKR.AIS.BattleManager_refreshStatus = BattleManager.refreshStatus;
BattleManager.refreshStatus = function() {
    FTKR.AIS.BattleManager_refreshStatus.call(this);
    if (this._subject && !this._onAutoSkill) {
        FTKR.setGameData(this._subject, null, null);
        this._subject.checkAutoSkill();
    }
};

Game_Battler.prototype.checkAutoSkill = function() {
    $dataSkills.forEach( function(skill){
        if (!skill) return;
        if (DataManager.evalRefreshConditions(skill)) {
            this._revenge.skillId = skill.id;
            this._revenge.subject = this;
            this.setRevengeData();
        }
    },this);
};

//=============================================================================
// YEP_BattleEngineCoreの修正
//=============================================================================
if (Imported.YEP_BattleEngineCore) {

FTKR.AIS.Game_BattlerBase_updateStateTurnTiming = Game_BattlerBase.prototype.updateStateTurnTiming;
Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
    this._removeStates = [];
    FTKR.AIS.Game_BattlerBase_updateStateTurnTiming.call(this, timing);
    if (this._removeStates.length) {
        this._removeStates.forEach( function(removeState){
            if (!removeState) return;
            this.setAssAutoSkill($dataStates[removeState]);
            this.setRevengeData();
        },this);
    }
};

}//YEP_BattleEngineCore