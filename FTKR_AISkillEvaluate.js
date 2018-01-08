//=============================================================================
// 自動戦闘時に使用するスキルの評価値を変更するプラグイン
// FTKR_AISkillEvaluate.js
// 作成者     : フトコロ
// 作成日     : 2018/01/06
// 最終更新日 : 2018/01/08
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASE = true;

var FTKR = FTKR || {};
FTKR.ASE = FTKR.ASE || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 自動戦闘時に使用するスキルの評価値を変更するプラグイン
 * @author フトコロ
 *
 * @param Skill Evaluate Log
 * @desc 評価値の計算結果をコンソールログに出力する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Evaluate Models
 * @desc 行動評価のモデル(簡易的な作戦)を作成します
 * ここで設定した評価モデルをアクターに反映できます
 * @type struct<auto>[]
 * @default 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * スキルのメモ欄に以下のタグを追記すると、自動戦闘時に使用するスキルを
 * 選択する評価値計算を個別に設定することができます。
 * 
 * <ASE_評価値式:***>
 * <ASE_EBARUATE:***>
 *    ***に計算式を入力
 * 
 * 計算式には、ダメージ計算式と同様の記述が可能です。
 *  a      : 使用者(a.hp で使用者の現在HP)
 *  b      : 対象者(b.hp で対象者の現在HP)
 *  item   : 使用するスキル(item.mpCost でスキルの消費MP)
 *  number : スキルで対象者に与える予定のダメージ量
 * 
 * 
 * 上記の評価値式を設定しない場合は、MVデフォルトの評価値計算式(※)を使用します。
 * ※後述
 * 
 * 
 * 
 * また、行動評価のモデル(簡易的な作戦)を設定することができます。
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
 * 自動戦闘時の評価値計算式
 *-----------------------------------------------------------------------------
 * MVのデフォルトでは、自動戦闘時には以下のルールに従い使用可能なスキルを
 * 選択可能な対象ごとに評価値を計算し、その評価値がもっとも高くなる相手に
 * 対してスキルを使用します。
 * 
 * 1. ダメージタイプが「HPダメージ、HP回復、HP吸収」以外のスキルは評価値0
 * 2. HPダメージの場合は、与えるダメージと相手の残りHPの比が評価値になる
 * 3. HP回復の場合は、回復量と相手の最大HPの比が評価値になる
 * 4. 全体を対象とするスキルは、すべての対象の評価値を合計する
 * 5. 連続回数が設定されている場合は、算出した評価値に回数の数値をかける
 * 6. ルール5までで評価値が 0 でなければ、その値にランダムで 0 ～ 1 を加算する
 * 　
 * 
 * 上記ルールを見て分かるとおりに、ダメージタイプがMP系や
 * ダメージタイプなしで使用効果のみ設定したスキルは、自動戦闘では
 * MVのデフォルトでは絶対に使用しないことになります。
 * 
 * 
 * 当プラグインを使い、タグで評価値式をそれらのスキルに設定することで
 * 自動戦闘でも使用する可能性がでるようになります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 評価値式の記述について
 *-----------------------------------------------------------------------------
 * 基本的に、全体スキルや複数回攻撃スキルを除き、スキルの評価値は 0 ~ 1 の間に
 * 収まります。全体スキルや複数回攻撃スキルはその数倍です。
 * 
 * そのため、当プラグインで設定する評価値式の結果も、特別な理由がない限りは
 * 同等の値に収まるように設定する必要があります。
 * 
 * 例えば、攻撃力を下げるスキルに評価値式を設定する場合
 * 　<ASE_評価知識:b.atk>
 * としてしまうと、ほぼ確実にそのスキルしか使用しなくなってしまいます。
 * また、同じ相手に何度も掛けてしまうことも考えられます。
 * 
 * この場合、自分の防御力と比較させるなどすると、自分の防御力よりも攻撃力が
 * 低い相手に対しては評価値が下がるため、うまく他のスキルにも分散するように
 * なると思います。
 * 　例) <ASE_評価知識:b.atk / (a.def * 2)>
 * 
 * 
 * また、ステートや弱体･強化を掛けた相手に再度掛けないようにする場合は
 * 相手がステートが掛かっている場合に、評価値を 0 にする計算を加えます。
 * 　例) <ASE_評価知識:b.aseState(n) * b.atk / (a.def * 2)>
 * 
 * b.aseState(n) は ステートID n のステートが掛かっていると 0
 * 掛かっていないと 1 になるスクリプトです。
 * 
 * 自身に掛ける場合は、b.ase** の部分を a.ase*** に変えてください。
 * 
 * 同様に弱体や強化が掛かっているときに 0、掛かっていないときに 1 になる
 * スクリプトは以下の通りです。
 * なお、n の値は以下の通りです。
 *    0:最大HP、1:最大MP、2:攻撃力、3:防御力
 *    4:魔法攻撃、5:魔法防御、6:敏捷性、7:運
 * 
 * 1. 弱体が掛かっている
 *    b.aseDebuff(n)
 * 
 * 2. 弱体が２段階で掛かっている
 *    b.aseMaxDebuff(n)
 * 
 * 3. 強化が掛かっている
 *    b.aseBuff(n)
 * 
 * 4. 強化が２段階で掛かっている
 *    b.aseMaxBuff(n)
 * 
 * 
 * また、ステートや弱体は、戦闘のターンが進めば進むほど効果が薄くなります。
 * そこで経過ターン数で評価値を変動させるという方法もあります。
 * 経過ターン数は $gameTroop.turnCount()+1 で取得できます。
 * 
 * 　例)<ASE_評価知識:1 / ($gameTroop.turnCount() + 1)>
 * 
 * この場合、1ターン目で評価値が 1、2ターン目で 0.5、とターンが経過するごとに
 * どんどん評価値小さくなります。
 * 
 * ※スキル選択時は、まだターンが経過していないため
 * 　$gameTroop.turnCount()は 0 から始まります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動評価のモデル(簡易的な作戦)について
 *-----------------------------------------------------------------------------
 * 評価値式の設定とは別に、大まかな行動タイプ(*1)毎にレーティングを決めて
 * そのタイプ全体の評価値を変動させることができます。
 * 
 * (*1)HPダメージ系のスキルや、HP回復系、強化付与系などスキルの効果が近いものの分類
 * 
 * プラグインパラメータ<Evaluate Models>で設定します。
 * モデルは複数作成することができ、それらをアクターに別々に設定することができます。
 * 
 * 例えば、攻撃を重視するアクターや回復行動を重視するアクターなどを
 * 同じスキルを覚えていてもスキルの評価をアクター毎に変えることが出来ます。
 * 
 * 
 * １．プラグインパラメータ<Evaluate Models>の構成
 * プラグインパラメータはリスト形式になっており、このリスト番号が評価モデルIDに
 * なります。(後述のアクターのメモ欄にはこの番号を使用する)
 * 
 * モデル名(name)と行動評価リスト(evaluate)を設定します。
 * 
 * 
 * ２．行動評価リスト(evaluate)の構成
 * この中で、具体的に行動タイプ毎にレーティングや条件を設定します。
 * 基本的には、敵キャラに設定する行動と同じ仕組みです。
 * ここに設定した行動タイプに属するスキルのみ使用します。
 * 行動毎に以下のパラメータを設定します。
 *  
 *    行動タイプ(actionType)
 *        ：セレクトボックスから設定した行動タイプを選択します。
 *        ：なお、テキスト入力モードに変更し、直接別の数値を入力しても
 *        ：問題ありません。(後述：スキルへの行動タイプ設定）
 *    条件(conditions)
 *        ：その行動タイプを使用するための条件を設定します。
 *        ：ダメージ計算式と同様の記述を使って判定式を入力します。
 *        ：空欄にした場合は、常に使用可能と判断します。
 *    レーティング(rating)
 *        ：その行動タイプを選択する頻度を設定します。
 *        ：1～9の値を設定し、この値が評価値に掛けられます。
 * 
 * 
 * ３．スキルへの行動タイプの設定
 * スキルのメモ欄に以下のタグを設定することで、行動タイプを設定できます。
 *  <ASE_行動タイプ:n>
 *      n は行動評価リストで選択した行動タイプの数字に合わせてください。
 * 
 * なお、以下の設定のスキルは、上記タグを使用しなくても、プラグイン側で
 * 行動タイプを設定します。ただし、タグ設定が優先です。
 *      1  :スキルID1 の攻撃
 *      2  :スキルID2 の防御
 *      11 :ダメージのタイプが HPダメージ 
 *      12 :ダメージのタイプが HP回復
 *      13 :ダメージのタイプが HP吸収
 *      21 :ダメージのタイプが MPダメージ 
 *      22 :ダメージのタイプが MP回復
 *      23 :ダメージのタイプが MP吸収
 *      31 :使用効果に強化を設定したスキル
 *      41 :使用効果に弱体を設定したスキル
 *      51 :使用効果にステート解除、弱体解除を設定したスキル
 * 
 * 
 * ４．アクターへの評価モデルの設定
 * アクターのメモ欄に以下のタグを設定することで、評価モデルを設定できます。
 *   <ASE_評価モデル:n>
 *        n : 評価モデルIDを設定します。
 *            \v[x]でゲーム変数を設定できます。
 * 
 * また、以下のスクリプトでアクターID n の評価モデル名を取得できます。
 *    $gameActors.actor(n).evalModelname()
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.0 - 2018/01/08 : 機能追加
 *    1. 評価モデル(簡易的な作戦)をアクターに設定する機能を追加。
 * 
 * v1.0.1 - 2018/01/07 : 機能追加、ヘルプ追記
 *    1. 評価値式に予想ダメージ量を参照するコードを追加
 *    2. 評価値をコンソールログに出力する機能を追加
 *    3. ステートや強化、弱体が掛かっているかどうかによって 0 か 1 を返す
 *       スクリプトを追加
 * 
 * v1.0.0 - 2018/01/06 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~auto:
 * @param name
 * @desc この行動評価モデルの名前
 * @default 
 *
 * @param evaluate
 * @desc 行動評価リストを設定します
 * @type struct<eval>[]
 * @default 
 *
*/
/*~struct~eval:
 * @param actionType
 * @desc 設定する行動タイプをリストから選択してください
 * @type select
 * @option 通常攻撃
 * @value 1
 * @option 防御
 * @value 2
 * @option HPダメージスキル
 * @value 11
 * @option HP回復スキル
 * @value 12
 * @option MPダメージスキル
 * @value 21
 * @option 強化スキル
 * @value 31
 * @option 弱体スキル
 * @value 41
 * @option 状態回復スキル
 * @value 51
 * @default 
 *
 * @param conditions
 * @desc この行動を選択するための条件式を設定します
 * 空欄の場合は、条件を設けずに常に選択可能になります
 * @default 
 *
 * @param rating
 * @desc この行動のレーティングを設定します
 * @type number
 * @min 1
 * @max 9
 * @default 5
*/
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
    var parameters = PluginManager.parameters('FTKR_AISkillEvaluate');

    FTKR.ASE = {
        evalLog : Boolean(parameters['Skill Evaluate Log'] || false),
        models  : paramParse(parameters['Evaluate Models']),
    };
    FTKR.ASE.models.unshift(null);
    console.log(FTKR.ASE.models);
    
    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

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

    FTKR.isEvalModel = function(modelId) {
        return modelId && FTKR.ASE.models[modelId] && FTKR.ASE.models[modelId].evaluate.length > 0;
    };

    //=============================================================================
    // DataManager
    // スキルに評価値式を設定する
    //=============================================================================

    var _ASE_DatabaseLoaded = false;
    var _ASE_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_ASE_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ASE_DatabaseLoaded) {
            this.itemEvaluateNotetags($dataSkills);
            _ASE_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.itemEvaluateNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.evaluateFormura = readObjectMeta(obj, ['ASE_評価値式', 'ASE_EVALUATE']);
        }
    };
   
    //=============================================================================
    // Game_BattlerBase
    //=============================================================================
    
    Game_BattlerBase.prototype.aseState = function(stateId) {
        return Number(!this.isStateAffected(stateId));
    };

    Game_BattlerBase.prototype.aseBuff = function(paramId) {
        return Number(!this.isBuffAffected(paramId));
    };

    Game_BattlerBase.prototype.aseMaxBuff = function(paramId) {
        return Number(!this.isMaxBuffAffected(paramId));
    };

    Game_BattlerBase.prototype.aseDebuff = function(paramId) {
        return Number(!this.isDebuffAffected(paramId));
    };

    Game_BattlerBase.prototype.aseMaxDebuff = function(paramId) {
        return Number(!this.isMaxDebuffAffected(paramId));
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================
    //書き換え
    Game_Actor.prototype.makeAutoBattleActions = function() {
        if (FTKR.ASE.evalLog) {
            console.log('-----------------------------------------');
            console.log(this.name(), 'のスキル評価値');
        }
        for (var i = 0; i < this.numActions(); i++) {
            if (FTKR.ASE.evalLog && this.numActions() > 1) console.log('行動', i+1);
            this.makeAutoBattleAction(i);
            if (FTKR.ASE.evalLog) console.log('決定＞＞', this.action(i).item().name);
        }
        if (FTKR.ASE.evalLog) {
            console.log('評価値計算終了');
            console.log('-----------------------------------------');
        }
        this.setActionState('waiting');
    };

    Game_Actor.prototype.makeAutoBattleAction = function(index) {
        var list = this.makeActionList();//使用可能なスキルを抽出
        var maxValue = Number.MIN_VALUE;
        for (var j = 0; j < list.length; j++) {
            var value = list[j].evaluate();//スキルごとに評価値を算出
            if (FTKR.ASE.evalLog) console.log('　', list[j].item().name, value);
            if (value > maxValue) {
                maxValue = value;
                this.setAction(index, list[j]);//評価値が一番高いスキルをセット
            }
        }
    };

    var _ASE_Game_Action_initialize = Game_Action.prototype.initialize;
    Game_Action.prototype.initialize = function(subject, forcing) {
        _ASE_Game_Action_initialize.call(this, subject, forcing);
        this._rating = 1;
    };

    var _ASE_Game_Action_evaluate = Game_Action.prototype.evaluate;
    Game_Action.prototype.evaluate = function(target) {
        var value = _ASE_Game_Action_evaluate.call(this, target);
        return value * this._rating;
    };

    var _ASE_Game_Action_evaluateWithTarget = Game_Action.prototype.evaluateWithTarget;
    Game_Action.prototype.evaluateWithTarget = function(target) {
        if (this.item().evaluateFormura) {
            return this.bamEvaluateFormura(target);
        } else {
            return _ASE_Game_Action_evaluateWithTarget.call(this, target) || 0;
        }
    };

    Game_Action.prototype.bamEvaluateFormura = function(target) {
        FTKR.setGameData(this.subject(), target, this.item(), this.makeDamageValue(target, false));
        return FTKR.evalFormula(this.item().evaluateFormura);
    };

    Game_Actor.prototype.evalModelId = function(){
        return setArgNum(readObjectMeta(this.actor(), ['ASE_評価モデル', 'ASE_EVALUATE_MODEL']));
    };

    Game_Actor.prototype.evalModelName = function() {
        return FTKR.isEvalModel(this.evalModelId()) ? FTKR.ASE.models[this.evalModelId()].name : '';
    };

    var _ASE_Game_Actor_makeActionList = Game_Actor.prototype.makeActionList;
    Game_Actor.prototype.makeActionList = function() {
        var modelId = this.evalModelId();
        if (FTKR.isEvalModel(modelId)) {
            if (FTKR.ASE.evalLog) console.log(this.name(), '評価モデル', modelId);
            var list = [];
            var action = new Game_Action(this);
            action.setAttack();
            if (action.checkAseConditions(modelId)) list.push(action);
            var action = new Game_Action(this);
            action.setGuard();
            if (action.checkAseConditions(modelId)) list.push(action);
            this.usableSkills().forEach(function(skill) {
                action = new Game_Action(this);
                action.setSkill(skill.id);
                if (action.checkAseConditions(modelId)) list.push(action);
            }, this);
            if (FTKR.ASE.evalLog) console.log('行動リスト', list);
            return list;
        } else {
            return _ASE_Game_Actor_makeActionList.call(this);
        }
    };

    Game_Action.prototype.checkAseConditions = function(modelId) {
        var skill = this.item();
        var model = FTKR.ASE.models[modelId];
        if (model && model.evaluate.length > 0) {
            var atype = Number(readObjectMeta(skill, ['ASE_行動タイプ', 'ASE_ACTION_TYPE']) || 0);
            if (!atype) atype = skillActionType(skill);
            var formula = '';
            var rating = 0;
            var check = model.evaluate.some( function(eval){
                formula = eval.conditions;
                rating = eval.rating;
                return eval.actionType === atype;
            });
            if (check) {
                this._rating = rating;
                FTKR.setGameData(this.subject(), null, skill);
                return formula ? FTKR.evalFormula(formula) : true;
            }
        }
        return false;
    };

    var skillActionType = function(skill) {
        if (skill.id === 1) return 1;
        if (skill.id === 2) return 2;
        if (skill.damage) {
            switch (skill.damage.type) {
            case 1:
                return 11;
            case 2:
                return 12;
            case 3:
                return 13;
            case 4:
                return 21;
            case 5:
                return 22;
            case 6:
                return 22;
            }
        }
        if (skill.effects.length) {
            var type = 0;
            skill.effects.some( function(effect){
                if (effect.code === Game_Action.EFFECT_ADD_BUFF) {
                    type = 31;return;
                } else if (effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
                    type = 41;return;
                } else if (effect.code === Game_Action.EFFECT_REMOVE_DEBUFF || effect.code === Game_Action.EFFECT_REMOVE_STATE) {
                    type = 51;return;
                }
            });
            if (type) return type;
        }
        return 0;
    };
}());//EOF
