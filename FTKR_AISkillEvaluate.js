//=============================================================================
// 自動戦闘時に使用するスキルの評価値を個別に設定するプラグイン
// FTKR_AISkillEvaluate.js
// 作成者     : フトコロ
// 作成日     : 2018/01/06
// 最終更新日 : 2018/01/07
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASE = true;

var FTKR = FTKR || {};
FTKR.ASE = FTKR.ASE || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 自動戦闘時に使用するスキルの評価値を個別に設定するプラグイン
 * @author フトコロ
 *
 * @param Skill Evaluate Log 
 * @desc 評価値の計算結果をコンソールログに出力する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * スキルのメモ欄に以下のタグを追記すると、自動戦闘時に使用するスキルの
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

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_AISkillEvaluate');

    FTKR.ASE.evalLog = Boolean(parameters['Skill Evaluate Log'] || false);

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

}());//EOF
