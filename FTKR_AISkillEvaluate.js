//=============================================================================
// 自動戦闘時に使用するスキルの評価値を変更するプラグイン
// FTKR_AISkillEvaluate.js
// 作成者     : フトコロ
// 作成日     : 2018/01/06
// 最終更新日 : 2018/03/10
// バージョン : v1.2.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASE = true;

var FTKR = FTKR || {};
FTKR.ASE = FTKR.ASE || {};

//=============================================================================
/*:
 * @plugindesc v1.2.4 自動戦闘時に使用するスキルの評価値を変更するプラグイン
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
 * @default []
 * 
 * @param Manual Mode Name
 * @desc 自動戦闘を使わない場合の作戦名称を設定します。
 * @default 手動戦闘
 * 
 * @param Default Tactics Name
 * @desc MVデフォルトの自動戦闘時の作戦名称を設定します。
 * @default 自動戦闘
 * 
 * @param Skip Party Command
 * @desc パーティーメンバー全員が自動戦闘の場合に、パーティーコマンドをスキップするか
 * @type select
 * @option スキップする(MVデフォルト)
 * @value 0
 * @option スキップしない
 * @value 1
 * @option １ターン目だけスキップしない
 * @value 2
 * @default 0
 * 
 * @param Menu Command
 * @desc メニューコマンドに作戦コマンドを追加するか
 * @type struct<command>
 * @default 
 * 
 * @param Party Command
 * @desc バトル時のパーティーコマンドに作戦コマンドを追加するか
 * @type struct<command>
 * @default 
 * 
 * @param Title Texts
 * @desc 作戦画面のタイトルウィンドウに表示する文字列を設定する
 * @type struct<title>
 * @default {"party":"パーティー","tactics":"作戦リスト"}
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 自動戦闘時に使用するスキルを選択するための評価値計算を個別に設定できます。
 * 
 * また、行動評価のモデル(簡易的な作戦)を作成することができます。
 * 
 * 設定した行動評価モデル(簡易的な作戦)をゲーム内で変更する専用画面の表示コマンドを
 * メニューコマンドおよびバトルのパーティーコマンドに追加できます。
 * プラグインパラメータ Menu Command および Party Command で設定してください。
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
 * スキルごとの評価値計算式の設定
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
 * 上記の評価値式を設定しない場合は、MVデフォルトの評価値計算式(※)を使用します。
 * ※後述
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
 * 　<ASE_評価値式:b.atk>
 * としてしまうと、ほぼ確実にそのスキルしか使用しなくなってしまいます。
 * また、同じ相手に何度も掛けてしまうことも考えられます。
 * 
 * この場合、自分の防御力と比較させるなどすると、自分の防御力よりも攻撃力が
 * 低い相手に対しては評価値が下がるため、うまく他のスキルにも分散するように
 * なると思います。
 * 　例) <ASE_評価値式:b.atk / (a.def * 2)>
 * 
 * 
 * また、ステートや弱体･強化を掛けた相手に再度掛けないようにする場合は
 * 相手がステートが掛かっている場合に、評価値を 0 にする計算を加えます。
 * 　例) <ASE_評価値式:b.aseState(n) * b.atk / (a.def * 2)>
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
 * 　例)<ASE_評価値式:1 / ($gameTroop.turnCount() + 1)>
 * 
 * この場合、1ターン目で評価値が 1、2ターン目で 0.5、とターンが経過するごとに
 * どんどん評価値小さくなります。
 * 
 * ※スキル選択時は、まだターンが経過していないため
 * 　$gameTroop.turnCount()は 0 から始まります。
 * 
 * 
 * 同一ターン内で同じスキルを使わせたくない場合には、自分の前までのキャラが
 * 指定したスキルを選択したかどうか調べる必要があります。
 * 
 * $gamePary.aseSkill(n) はスキルID n のスキルを
 * 自分の前までのキャラが選択していた場合に 0、
 * だれも選択していない場合は 1 になるスクリプトです。
 * 
 * 　例)<ASE_評価値式:$gamePary.aseSkill(10)>
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
 * ！！注意！！********************************************
 * リストには、常に行動可能なスキルがある行動タイプを最低１つ
 * 設定してください。
 * ここでの常に行動可能なスキルとは、評価値が 0 にならず
 * コストを消費せずに使用可能なスキルのことです。
 * 　例）行動タイプ：通常攻撃
 * 
 * *******************************************************
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
 *            なお、 0 でMVデフォルトの自動戦闘、 -1 で手動戦闘になります。
 * 
 * また、以下のスクリプトでアクターID n の評価モデル名を取得できます。
 *    $gameActors.actor(n).evalModelname()
 * 
 * 
 *-----------------------------------------------------------------------------
 * 作戦画面について
 *-----------------------------------------------------------------------------
 * 設定した行動評価モデル(簡易的な作戦)をゲーム内で変更する専用画面の表示コマンドを
 * メニューコマンドおよびバトルのパーティーコマンドに追加できます。
 * 
 * プラグインパラメータ Menu Command および Party Command で設定してください。
 * 
 * この時、各アクターが選択可能な作戦のリストは、アクターのメモ欄に
 * 以下のタグを記載することで設定します。
 * 
 *   <ASE_作戦リスト:n1,n2,...>
 *        n1,n2,...には、プラグインパラメータEvaluate Modelsで設定した
 *        作戦のリスト番号、MVデフォルトの自動戦闘の 0 から任意の数を
 *        記載できます。
 * 
 *    例)
 *   <ASE_作戦リスト:0,1,2>
 * 
 * なお、実際の作戦画面には、これらに加えて「手動戦闘」を追加して表示します。
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
 * v1.2.4 - 2018/03/10 : 不具合修正
 *    1. アクターの特徴で自動戦闘を追加していないと、作戦画面で作戦を変更しても
 *       正しく更新されない不具合を修正。
 *    2. バトル中に使用可能なスキルが何もない場合にエラーになる不具合を修正。
 * 
 * v1.2.3 - 2018/02/28 : ヘルプ追記
 *    1. 作戦の設定方法をヘルプに追記。
 * 
 * v1.2.2 - 2018/02/28 : 不具合修正
 *    1. プラグインパラメータEvaluate Modelsの初期値が空欄の場合に
 *       エラーになる不具合を修正。
 * 
 * v1.2.1 - 2018/02/28 : ヘルプ修正、機能追加
 *    1. ヘルプ内の誤字を修正。
 *    2. 自分の前までのキャラが指定したスキルを選択したかどうか
 *       調べるスクリプト$gameParty.aseSkill(n)を追加。
 * 
 * v1.2.0 - 2018/01/11 : 機能追加
 *    1. ゲーム中にパーティーメンバーの評価モデル(簡易的な作戦)を変更する
 *       画面を追加。メニューコマンドとバトルのパーティーコマンドに追加可能。
 *    2. パーティー全員が自動戦闘になっていても、パーティーコマンドを
 *       スキップしないようにする機能を追加。
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
/*~struct~command:
 * @param enable
 * @desc コマンドを追加するか
 * @type boolean
 * @on 追加する
 * @off 追加しない
 * @default false
 *
 * @param name
 * @desc コマンドの表示名を設定します
 * @default 作戦
 *
 * @param switchId
 * @desc 特定のスイッチIDがONの時コマンドを表示させるか
 * 0 の場合は常に表示
 * @type number
 * @min 0
 * @default 0
 *
*/
/*~struct~title:
 * @param party
 * @desc パーティー欄のタイトル文字列
 * @default パーティー
 *
 * @param tactics
 * @desc 作戦リスト欄のタイトル文字列
 * @default 作戦リスト
 *
*/

(function() {

    var parameters = PluginManager.parameters('FTKR_AISkillEvaluate');

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

    var setArrayParamParse = function(param) {
        param = paramParse(parameters[param]);
        return Array.isArray(param) ? param : [];
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================

    FTKR.ASE = {
        evalLog : Boolean(parameters['Skill Evaluate Log'] || false),
        models  : setArrayParamParse('Evaluate Models'),
        skip    : Number(parameters['Skip Party Command'] || 0),
        command : {
            menu  : paramParse(parameters['Menu Command']),
            party : paramParse(parameters['Party Command']),
        },
        title   : paramParse(parameters['Title Texts']),
        manual  : (parameters['Manual Mode Name'] || '手動戦闘'),
    };

    FTKR.ASE.models.unshift({name:(parameters['Default Tactics Name'] || '自動戦闘'),evaluate:[]});
    FTKR.ASE.models.forEach( function(model, i) {
        if (model) model.id = i;
    });
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
    // BattleManager
    //=============================================================================

    //書き換え
    BattleManager.startInput = function() {
        this._phase = 'input';
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this.clearActor();
        if (this.checkCannotInput()) {
            this.startTurn();
        }
    };

    BattleManager.checkCannotInput = function() {
        return (this._surprise || !$gameParty.canInput()) && !this.checkCannotSkip();
    };

    BattleManager.checkCannotSkip = function() {
        return FTKR.ASE.skip === 1 || (FTKR.ASE.skip === 2 && !$gameTroop.turnCount());
    };

    BattleManager.isTactics = function() {
        return this._tacticsMode;
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

    var _ASE_Game_BattlerBase_isAutoBattle = Game_BattlerBase.prototype.isAutoBattle;
    Game_BattlerBase.prototype.isAutoBattle = function() {
        return this._evalModelId ? this._evalModelId >= 0 : _ASE_Game_BattlerBase_isAutoBattle.call(this);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================
    
    Game_Battler.prototype.aseSkill = function(skillId) {
        return Number(!this._actions.some(function(action){
            return action && action.item() && action.item().id === skillId;
        }));
    };

    //=============================================================================
    // Game_Party
    //=============================================================================
    
    Game_Party.prototype.aseSkill = function(skillId) {
        return Number(!this.members().some(function(battler){
            return !battler.aseSkill(skillId);
        }));
    };
    
    //=============================================================================
    // Game_Action
    //=============================================================================
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
            if (FTKR.ASE.evalLog && this.action(i) && this.action(i).item()) {
                console.log('決定＞＞', this.action(i).item().name);
            }
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

    Game_Actor.prototype.evalModelId = function(){
        return this._evalModelId || setArgNum(readObjectMeta(this.actor(), ['ASE_評価モデル', 'ASE_EVALUATE_MODEL']));
    };

    Game_Actor.prototype.setEvalModelId = function(modelId) {
        this._evalModelId = modelId;
    };

    Game_Actor.prototype.evalModelName = function() {
        return this.isAutoBattle() ? 
            this.autoBattleModeName() : FTKR.ASE.manual;
    };

    Game_Actor.prototype.autoBattleModeName = function() {
        return FTKR.isEvalModel(this.evalModelId()) ?
            FTKR.ASE.models[this.evalModelId()].name : FTKR.ASE.models[0].name;
    };

    Game_Actor.prototype.tacticsLists = function() {
        var list = readObjectMeta(this.actor(), ['ASE_作戦リスト', 'ASE_TACTICS_LIST']);
        return list ? list.split(',') : '';
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


    //=============================================================================
    // Window_MenuCommand
    //=============================================================================

    var _ASE_Window_MenuCommand_addOriginalCommands =
        Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _ASE_Window_MenuCommand_addOriginalCommands.call(this);
        this.addNewCommands(FTKR.ASE.command.menu, 'ase');
    };

    Window_Command.prototype.addNewCommands = function(cmd, symbol) {
        if (cmd && cmd.enable) {
            if (!cmd.switchId) {
                this.addCommand(cmd.name, symbol, true);
            } else if (cmd.switchId > 0 &&
                $gameSwitches.value(cmd.switchId)) {
                this.addCommand(cmd.name, symbol, true);
            }
        }
    };

    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var _ASE_Scene_Menu_createCommandWindow =
        Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _ASE_Scene_Menu_createCommandWindow.call(this);
        if (FTKR.ASE.command.menu && FTKR.ASE.command.menu.enable) {
            this._commandWindow.setHandler('ase', this.commandAse.bind(this));
        }
    };

    Scene_Menu.prototype.commandAse = function() {
        SceneManager.push(Scene_ASE);
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================

    Scene_Base.prototype.createpartyTitleWindow = function() {
        this._partyTitleWindow = new Window_PartyTitle(0,0);
        this.addWindow(this._partyTitleWindow);
        this._partyTitleWindow.close();
    };

    Scene_Base.prototype.createPartyWindow = function() {
        var y = this._partyTitleWindow.y + this._partyTitleWindow.height;
        var width = this._partyTitleWindow.width;
        var height = Graphics.boxHeight - y;
        this._partyTacticsWindow = new Window_PartyTactics(0, y, width, height);
        this._partyTacticsWindow.setHandler('ok',     this.onPartyTacticsOk.bind(this));
        this._partyTacticsWindow.setHandler('cancel',    this.onPartyTacticsCancel.bind(this));
        this.addWindow(this._partyTacticsWindow);
        this._partyTacticsWindow.close();
    };

    Scene_Base.prototype.createTacticsTitleWindow = function() {
        var x = this._partyTacticsWindow.x + this._partyTacticsWindow.width;
        var width = Graphics.boxWidth - x;
        this._tacticsTitleWindow = new Window_TacticsTitle(x, 0, width);
        this.addWindow(this._tacticsTitleWindow);
        this._tacticsTitleWindow.close();
    };

    Scene_Base.prototype.createTacticsListWindow = function() {
        var x = this._partyTacticsWindow.x + this._partyTacticsWindow.width;
        var y = this._partyTitleWindow.y + this._partyTitleWindow.height;
        var width = this._tacticsTitleWindow.width;
        var height = Graphics.boxHeight - y;
        this._tacticsListWindow = new Window_TacticsList(x, y, width, height);
        this._tacticsListWindow.setHandler('ok',    this.onTacticsListOk.bind(this));
        this._tacticsListWindow.setHandler('cancel',    this.onTacticsListCancel.bind(this));
        this._partyTacticsWindow.setTacticsListWindow(this._tacticsListWindow);
        this.addWindow(this._tacticsListWindow);
        this._tacticsListWindow.close();
    };

    Scene_Base.prototype.setupTacticsWindow = function() {
        this._partyTitleWindow.open();
        this._partyTacticsWindow.open();
        this._partyTacticsWindow.select(0);
        this._partyTacticsWindow.activate();
        this._tacticsTitleWindow.open();
        this._tacticsListWindow.open();
    };

    Scene_Base.prototype.onPartyTacticsOk = function() {
        this._tacticsListWindow.select(0);
        this._tacticsListWindow.activate();
    };

    Scene_Base.prototype.onPartyTacticsCancel = function() {
        this.popScene();
    };

    Scene_Base.prototype.onTacticsListOk = function() {
        var item = this._tacticsListWindow.item();
        if (item) this._tacticsListWindow._actor.setEvalModelId(item.id);
        this._tacticsListWindow.deselect();
        this._partyTacticsWindow.refresh();
        this._partyTacticsWindow.activate();
    };

    Scene_Base.prototype.onTacticsListCancel = function() {
        this._tacticsListWindow.deselect();
        this._partyTacticsWindow.activate();
    };

    //=============================================================================
    // Scene_ASE
    //=============================================================================

    function Scene_ASE() {
        this.initialize.apply(this, arguments);
    }

    Scene_ASE.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ASE.prototype.constructor = Scene_ASE;

    Scene_ASE.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_ASE.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createpartyTitleWindow();
        this.createPartyWindow();
        this.createTacticsTitleWindow();
        this.createTacticsListWindow();
        this.setupTacticsWindow();
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    //書き換え
    Window_PartyCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.fight,  'fight');
        this.addNewCommands(FTKR.ASE.command.party, 'ase');
        this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    var _ASE_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _ASE_Scene_Battle_createAllWindows.call(this);
        this.createpartyTitleWindow();
        this.createPartyWindow();
        this.createTacticsTitleWindow();
        this.createTacticsListWindow();
    };

    //書き換え
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        this._partyCommandWindow = new Window_PartyCommand();
        this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
        if (FTKR.ASE.command.party && FTKR.ASE.command.party.enable) {
            this._partyCommandWindow.setHandler('ase',  this.commandAse.bind(this));
        }
        this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        this._partyCommandWindow.deselect();
        this.addWindow(this._partyCommandWindow);
    };

    var _ASE_Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        if (!BattleManager.isTactics()) {
            _ASE_Scene_Battle_changeInputWindow.call(this);
        }
    };

    Scene_Battle.prototype.commandAse = function() {
        BattleManager._tacticsMode = true;
        this._partyCommandWindow.deselect();
        this._partyCommandWindow.deactivate();
        this.setupTacticsWindow();
    };

    Scene_Battle.prototype.onPartyTacticsCancel = function() {
        this._partyTitleWindow.close();
        this._partyTacticsWindow.close();
        this._tacticsTitleWindow.close();
        this._tacticsListWindow.close();
        $gameParty.makeActions();
        BattleManager._tacticsMode = false;
    };

    //=============================================================================
    // Window_PartyTitle
    //=============================================================================

    function Window_PartyTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyTitle.prototype = Object.create(Window_Base.prototype);
    Window_PartyTitle.prototype.constructor = Window_PartyTitle;

    Window_PartyTitle.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_PartyTitle.prototype.windowWidth = function() {
        return Graphics.boxWidth / 2;
    };

    Window_PartyTitle.prototype.refresh = function() {
        this.contents.clear();
        var text = FTKR.ASE.title.party;
        this.drawTextEx(text, 0, 0);
    };
    
    //=============================================================================
    // Window_PartyTactics
    //=============================================================================

    function Window_PartyTactics() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyTactics.prototype = Object.create(Window_MenuStatus.prototype);
    Window_PartyTactics.prototype.constructor = Window_PartyTactics;

    Window_PartyTactics.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._pendingIndex = -1;
        this.refresh();
    };

    Window_PartyTactics.prototype.setTacticsListWindow = function(window) {
        this._tacticsListWindow = window;
    };

    Window_PartyTactics.prototype.maxItems = function() {
        return $gameParty.size();
    };

    Window_PartyTactics.prototype.itemHeight = function() {
        return this.lineHeight();
    };

    Window_PartyTactics.prototype.drawItem = function(index) {
        this.drawItemBackground(index);
        this.drawItemStatus(index);
    };

    Window_PartyTactics.prototype.drawItemStatus = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var width = rect.width - this.textPadding();
        this.drawText(actor.name(), rect.x, rect.y, width/2);
        this.drawText(actor.evalModelName(), rect.x + width/2, rect.y, width/2);
    };

    Window_PartyTactics.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._tacticsListWindow) {
            var actor = $gameParty.members()[this.index()];
            this._tacticsListWindow.setActor(actor);
        }
    };

    Window_PartyTactics.prototype.processOk = function() {
        Window_Selectable.prototype.processOk.call(this);
    };

    //=============================================================================
    // Window_TacticsTitle
    //=============================================================================

    function Window_TacticsTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_TacticsTitle.prototype = Object.create(Window_Base.prototype);
    Window_TacticsTitle.prototype.constructor = Window_TacticsTitle;

    Window_TacticsTitle.prototype.initialize = function(x, y, width) {
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_TacticsTitle.prototype.refresh = function() {
        this.contents.clear();
        var text = FTKR.ASE.title.tactics;
        this.drawTextEx(text, 0, 0);
    };
    
    //=============================================================================
    // Window_TacticsList
    //=============================================================================

    function Window_TacticsList() {
        this.initialize.apply(this, arguments);
    }

    Window_TacticsList.prototype = Object.create(Window_MenuStatus.prototype);
    Window_TacticsList.prototype.constructor = Window_TacticsList;

    Window_TacticsList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._data = [];
        this.refresh();
    };

    Window_TacticsList.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };

    Window_TacticsList.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_TacticsList.prototype.item = function() {
        var index = this.index();
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_TacticsList.prototype.itemHeight = function() {
        return this.lineHeight();
    };

    Window_TacticsList.prototype.drawAllItems = function() {
        var topIndex = this.topIndex();
        for (var i = 0; i < this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
            }
        }
    };

    Window_TacticsList.prototype.drawItem = function(index) {
        this.drawItemBackground(index);
        this.drawItemStatus(index);
    };

    Window_TacticsList.prototype.drawItemStatus = function(index) {
        var list = this._data[index];
        var rect = this.itemRect(index);
        var width = rect.width - this.textPadding();
        this.drawText(list.name, rect.x, rect.y, width);
    };

    Window_TacticsList.prototype.makeItemList = function() {
        this._data = FTKR.ASE.models.filter(function(model, i) {
            return this.includes(i);
        }, this);
        console.log(FTKR.ASE.models, this._data);
        this._data.push({name:FTKR.ASE.manual, id:-1, evaluate:[]});
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_TacticsList.prototype.includes = function(index) {
        if (this._actor) {
            var list = this._actor.tacticsLists();
            return list.length ? list.contains(index+'') : index > 0;
        }
        return false;
    };

    Window_TacticsList.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_TacticsList.prototype.processOk = function() {
        Window_Selectable.prototype.processOk.call(this);
    };

}());//EOF
