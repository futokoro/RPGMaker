//=============================================================================
// 特定条件で自動でスキルを発動させるプラグイン
// FTKR_AutoInvokeSkill.js
// 作成者     : フトコロ
// 作成日     : 2017/05/03
// 最終更新日 : 2017/06/28
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AIS = true;

var FTKR = FTKR || {};
FTKR.AIS = FTKR.AIS || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 特定条件で自動でスキルを発動させるプラグイン
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
 * アクターに設定
 *-----------------------------------------------------------------------------
 * 以下のタグをアクターのメモ欄に追記すると、設定した条件式を満たした時に
 * スキルを自動発動します。
 * 
 * <AIS_発動条件: x>
 * 条件式
 * </AIS_発動条件>
 * 
 * または
 * 
 * <AIS_INVOKE_CONDITIONS: x>
 * 条件式
 * </AIS_INVOKE_CONDITIONS>
 * 
 *    x : スキルID
 * 
 * 
 * [条件判定するタイミング]
 * 条件判定は、各キャラが行動しする度に毎回行います。
 * このため、条件式には設定したアクターと、行動したキャラ、行動の対象のキャラの
 * パラメータを参照することができます。
 * 判定はパーティーの先頭から順番に行い、条件を満たしたキャラのスキルを
 * 実行します。
 * 
 * 
 * [条件式で使用できるコード]
 * 条件式には、以下のコードを使うことができます。
 *  a.param - 設定したアクターのパラメータを参照します。(a.hp で現在HPを参照)
 *  b.param - 行動の対象キャラのパラメータを参照します。
 *  item.param - 行動したキャラのパラメータを参照します。
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
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
 * <AIS_INVOKE_CONDITIONS>
 * 条件式
 * </AIS_INVOKE_CONDITIONS>
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
 * <AIS_発動条件>
 * 条件式1
 * 条件式2
 * </AIS_発動条件>
 * 
 * 2. '&&'を使用して横に複数の条件式を並べる
 * <AIS_発動条件>
 * 条件式1 && 条件式2
 * </AIS_発動条件>
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
 * v1.1.0 - 2017/06/28 : 機能追加、タグの名称変更
 *    1. アクターに任意のスキルの自動発動条件を設定する機能を追加。
 *    2. 発動条件タグの英字名称を変更。
 * 
 * v1.0.0 - 2017/05/03 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

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

    // <codeTitle>text</codeTitle>の形式のメタデータを読み取ってtextを返す
    var readEntrapmentCodeToText = function(obj, codeTitles) {
        notes = convertEntrapmentRegArray(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (testRegs(line, notes, 'a')) {
                var text = '';
                setMode = 'read';
            } else if (testRegs(line, notes, 'b')) {
                setMode = 'none';
            } else if (setMode === 'read') {
                text += line + ';';
            }
        }
        return text;
    };

    var convertEntrapmentRegArray = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                a:new RegExp('<' + codeTitle + '>', 'i'),
                b:new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    //正規表現オブジェクトの配列とdataをテストする
    var testRegs = function(data, regs, prop) {
        return regs.some(function(reg) {
            return prop ? reg[prop].test(data) : reg.test(data);
        });
    };

    var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
                    id:RegExp.$1,
                    text:''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertEntrapmentRegArrayEx = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                start:new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end  :new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function(data, regs, prop) {
        return regs.some(function(reg){
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
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

    var evalCheckConditions = function(text) {
        var formula = convertTextToConditions(text);
        if (!formula) return false;
        return FTKR.evalFormula(formula);
    };

    var convertRefreshConditions = function(obj) {
        return convertTextToConditions(readEntrapmentCodeToText(obj, ['AIS_発動条件', 'AIS_INVOKE_CONDITIONS']));
    };

    var evalRefreshConditions = function(formula) {
        if (!formula) return false;
        return FTKR.evalFormula(formula);
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _AIS_BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _AIS_BattleManager_setup.call(this, troopId, canEscape, canLose);
        this.checkAutoSkills();
    };

    BattleManager.checkAutoSkills = function() {
        this._autoSkillList = [];
        $dataSkills.forEach( function (skill) {
            if (!skill) return;
            var formula = convertRefreshConditions(skill);
            if (formula) {
                this._autoSkillList.push({id:skill.id, formula:formula});
            }
        },this);
    };

    var _AIS_BattleManager_update = BattleManager.update;
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
                _AIS_BattleManager_update.call(this);
                break;
            }
        }
    };

    var _AIS_BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        this._autoSkills = [];
        _AIS_BattleManager_startTurn.call(this);
    };

    var _AIS_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        _AIS_BattleManager_endAction.call(this);
        if (this._autoSkills && this._autoSkills.length) {
            this._keepPhase = this._phase;
            this._phase = 'autoSkill'
        }
    };

    var _AIS_BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        _AIS_BattleManager_endTurn.call(this);
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

    var _AIS_BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        this._aisPhase = false;
        _AIS_BattleManager_startAction.call(this);
    };

    BattleManager.startAutoSkillAction = function(autoSkill) {
        var subject = autoSkill.subject;
        this._subject = subject;
        var action = new Game_Action(subject);
        action.setSkill(autoSkill.id);
        var targets = !!autoSkill.target ? [autoSkill.target] : action.makeTargets();
        this._phase = 'autoSkillAction';
        this._aisPhase = true;
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

    var _AIS_BattleManager_refreshStatus = BattleManager.refreshStatus;
    BattleManager.refreshStatus = function() {
        _AIS_BattleManager_refreshStatus.call(this);
        if (this._subject && !this._onAutoSkill) {
            FTKR.setGameData(this._subject, null, null);
            this._subject.checkAutoSkillAll();
        }
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    var _AIS_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _AIS_Game_Battler_initMembers.call(this);
        this.clearRevenge();
    };

    Game_Battler.prototype.clearRevenge = function() {
        this._revenge = {
            skillId   :false,
            stateId   :false,
            subject   :null,
            id        :-1,
            opponent  :false,
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

    Game_Battler.prototype.setRevengeData = function(flag) {
        var revenge = this._revenge;
        if (revenge.skillId) {
            flag = flag || revenge.stateId && $dataStates[revenge.stateId].meta['AIS_リベンジターゲット'];
            var target = flag ? this.revengeTarget() : null;
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

    var _AIS_Game_Battler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function(stateId) {
        if (!this._removeStates) this._removeStates = [];
        this._removeStates.push(stateId);
        _AIS_Game_Battler_removeState.call(this, stateId);
    };

    Game_Battler.prototype.checkAutoSkillAll = function() {
        BattleManager._autoSkillList.forEach( function(data){
            if (!data) return;
            if (evalRefreshConditions(data.formula)) {
                this._revenge.skillId = data.id;
                this._revenge.subject = this;
                this.setRevengeData();
            }
        },this);
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.checkAutoSkill = function() {
        var datas = readEntrapmentCodeToTextEx(this.actor(), ['AIS_発動条件', 'AIS_INVOKE_CONDITIONS']);
        return datas.some( function(data) {
            if (evalCheckConditions(data.text)) {
                this._revenge.skillId = data.id;
                this._revenge.stateId = data.id;
                this._revenge.subject = this;
                this.setRevengeData(1);
                return true;
            }
        },this);
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _AIS_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _AIS_Game_Action_apply.call(this, target);
        var result = target.result();
        if (result.isHit() && (result.hpDamage || result.mpDamage)) {
            this.setRevengeTarget(this.subject(), target);
            target.setRevengeData();
        }
        if (!BattleManager._aisPhase) {
            $gameParty.members().forEach( function(member) {
                if (member.isDead() || member === this.subject()) return;
                FTKR.setGameData(member, target, this.subject());
                this.setRevengeTarget(target, member)
                member.checkAutoSkill();
            },this);
        }
    };

    Game_Action.prototype.setRevengeTarget = function(target, user) {
        var memberId = -1;
        if (target.isEnemy()) {
            $gameTroop.members().forEach( function(member, i){
                if (member === target) memberId = i;
            });
        } else {
            $gameParty.members().forEach( function(member, i){
                if (member === target) memberId = i;
            });
        }
        user._revenge.id = memberId,
        user._revenge.opponent = target.isEnemy()
    };

    //=============================================================================
    // YEP_BattleEngineCoreの修正
    //=============================================================================
    if (Imported.YEP_BattleEngineCore) {

    var _AIS_Game_BattlerBase_updateStateTurnTiming = Game_BattlerBase.prototype.updateStateTurnTiming;
    Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
        this._removeStates = [];
        _AIS_Game_BattlerBase_updateStateTurnTiming.call(this, timing);
        if (this._removeStates.length) {
            this._removeStates.forEach( function(removeState){
                if (!removeState) return;
                this.setAssAutoSkill($dataStates[removeState]);
                this.setRevengeData();
            },this);
        }
    };

    }//YEP_BattleEngineCore

}());//EOF