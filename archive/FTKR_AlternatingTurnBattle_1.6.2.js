//=============================================================================
// 敵味方交互にターンが進むターン制戦闘システムのプラグイン
// FTKR_AlternatingTurnBattle.js
// プラグインNo : 75
// 作成者     : フトコロ
// 作成日     : 2018/04/08
// 最終更新日 : 2018/11/17
// バージョン : v1.6.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AltTB = true;

var FTKR = FTKR || {};
FTKR.AltTB = FTKR.AltTB || {};

//=============================================================================
/*:
 * @plugindesc v1.6.2 敵味方交互にターンが進むターン制戦闘システム
 * @author フトコロ
 *
 * @param TurnEnd Command
 * @desc プレイヤーターンを途中で終了させるコマンド名
 * @default ターン終了
 *
 * @param Change Player
 * @desc プレイヤーターンでアクターを変更する操作方法を指定します。
 * @type select
 * @option PgUpキー + PgDnキー
 * @value 0
 * @option Rightキー + Leftキー
 * @value 1
 * @default 0
 *
 * @param Start Actor Command
 * @desc プレイヤーターンでアクターのコマンドから始める
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Enable Auto Player Turn End
 * @desc パーティーが行動できなくなった時に、自動でターン終了する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Disable Change When Party Cannot Act
 * @desc パーティーが行動できなくなった時に、アクターを変更する操作を禁止して、パーティーコマンドに戻す。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Confused Action Timing
 * @desc 行動制約ステートによるアクターの行動タイミングを設定する。
 * @type select
 * @option プレイヤーターン開始時
 * @value 1
 * @option プレイヤーターン終了時
 * @value 0
 * @default 0
 *
 * @param --- 行動回数 ---
 * 
 * @param Disable AC
 * @desc アクターの行動回数による行動制限を無効にする
 * @type boolean
 * @on 無効にする
 * @off 無効にしない
 * @default false
 * 
 * @param Default Max AC
 * @desc 行動回数に最大値を設定します。
 * 0 の場合は最大値なし
 * @default 0
 * @type number
 * @min 0
 *
 * @param Show Action Count
 * @desc アクターの残り行動回数を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param AC Draw Type
 * @desc 行動回数の表示方法を選択します。
 * @type select
 * @option 数値
 * @value 0
 * @option アイコン(現在値のみ)
 * @value 1
 * @option アイコン(現在値と最大値)
 * @value 2
 * @default 0
 * 
 * @param acvalue
 * @text 数値で表示
 * 
 * @param Display AC Format
 * @desc 行動回数の表示内容を設定します。
 * %1 - 行動回数, %2 - 最大値
 * @default [%1]
 * @parent acvalue
 * 
 * @param AC Color
 * @desc 行動回数の表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 * @parent acvalue
 *
 * @param Display AC Width
 * @desc 行動回数の表示幅を設定します。(半角文字数)
 * @default 3
 * @type number
 * @parent acvalue
 *
 * @param acgauge
 * @text ゲージで表示
 * 
 * @param Display AC Gauge
 * @desc 行動回数のゲージを表示します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent acgauge
 * 
 * @param AC Gauge Color1
 * @desc 行動回数のゲージ色1を設定します。
 * @default 13
 * @type number
 * @min 0
 * @max 31
 * @parent acgauge
 *
 * @param AC Gauge Color2
 * @desc 行動回数のゲージ色2を設定します。
 * @default 5
 * @type number
 * @min 0
 * @max 31
 * @parent acgauge
 * 
 * @param acicon
 * @text アイコンで表示
 * 
 * @param AC Icon Index
 * @parent acIcon
 * @desc 行動回数の現在値を表すアイコンを設定します。
 * @default 163
 * @type number
 * @min 0
 * @parent acicon
 *
 * @param AC Empty Icon Index
 * @desc 行動回数の空部分を表すアイコンを設定します。
 * 行動回数の最大値を設定した場合のみ有効です。
 * @default 160
 * @type number
 * @min 0
 * @parent acicon
 *
 * @param --- 行動済みのアクター ---
 * 
 * @param Activated Actor Sign
 * @desc 行動済みのアクターの表し方を指定します。
 * @type select
 * @option 特になし
 * @value 0
 * @option 名前をグレー表示にする
 * @value 1
 * @option 名前＋顔画像をグレー表示
 * @value 2
 * @default 0
 *
 * @param Activated Sv Actor Sign
 * @desc 行動済みのSVアクターの表し方を指定します。
 * @type select
 * @option 待機モーション
 * @value 0
 * @option 停止
 * @value 1
 * @default 0
 *
 * @param Cannot Select Activated Actor
 * @desc 行動済みのアクターを選択できないようにします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default ture
 *
 * @param Not Activated Sv Actor Sign
 * @desc ターン終了時に未行動のSVアクターの表し方を指定します。
 * @type select
 * @option 待機モーション
 * @value 0
 * @option 停止
 * @value 1
 * @default 0
 *
 * @param --- アクションポイント ---
 * 
 * @param Enable AP
 * @desc アクションポイントによる行動回数制限を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Show AP Window
 * @desc アクションポイントをバトル画面に表示するか設定します。
 * @type select
 * @option 表示しない
 * @value 0
 * @option プレイヤーターンのみ表示する
 * @value 1
 * @option 常に表示する
 * @value 2
 * @default 2
 *
 * @param Display AP
 * @desc アクションポイントの表示名を設定します。
 * @default AP
 * 
 * @param AP Draw Type
 * @desc アクションポイントの表示方法を選択します。
 * @type select
 * @option 数値(現在値のみ)
 * @value 0
 * @option 数値(現在値と最大値)
 * @value 1
 * @option アイコン(現在値と最大値)
 * @value 2
 * @option アイコン(現在値のみ)
 * @value 3
 * @default 0
 * 
 * @param Enable Use AP0Skills Regardless Of AP
 * @desc パーティーの残りAPが0でも、AP0スキルは使用可能にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param apGauge
 * @text ゲージ設定
 * 
 * @param Display AP Gauge
 * @parent apGauge
 * @desc アクションポイントのゲージを表示します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * 
 * @param AP Gauge Color1
 * @parent apGauge
 * @desc アクションポイントのゲージ色1を設定します。
 * @default 10
 * @type number
 * @min 0
 *
 * @param AP Gauge Color2
 * @parent apGauge
 * @desc アクションポイントのゲージ色2を設定します。
 * @default 2
 * @type number
 * @min 0
 *
 * @param apIcon
 * @text アイコン設定
 * 
 * @param AP Icon Index
 * @parent apIcon
 * @desc アクションポイントを表すアイコンを設定します。
 * @default 162
 * @type number
 * @min 0
 *
 * @param AP Empty Icon Index
 * @parent apIcon
 * @desc アクションポイントの空部分を表すアイコンを設定します。
 * @default 160
 * @type number
 * @min 0
 * 
 * @param Draw Icon Space
 * @parent apIcon
 * @desc アクションポイントのアイコンの表示間隔を設定します。
 * @default 0
 * @type number
 * @min 0
 * 
 * @param apValue
 * @text 数値設定
 * 
 * @param Party Max AP
 * @parent apValue
 * @desc パーティーのアクションポイントの最大値を設定します。
 * @default 4
 * @type number
 * @min 0
 *
 * @param Party AP
 * @parent apValue
 * @desc パーティーのアクションポイントの初期値を設定します。
 * @default 4
 * @type number
 * @min 0
 *
 * @param Item AP
 * @parent apValue
 * @desc スキルやアイテムのアクションポイントを設定します。メモ欄で設定しない場合は、この値になります。
 * @default 1
 * @type number
 * @min 0
 *
 * @param Turn Refresh AP
 * @parent apValue
 * @desc ターンごとに回復するアクションポイントをスクリプトで設定します。-1 にすると全回復します。
 * @default -1
 *
 * @param Enable Reset AP Every Battle
 * @parent apValue
 * @desc 戦闘毎にAPをリセットするか設定します。
 * @type boolean
 * @on 有効
 * @off 無効(AP持ち越し)
 * @default true
 * 
 * @param apCost
 * @text コスト表示設定
 * 
 * @param AP Cost Color
 * @parent apCost
 * @desc アクションポイントコストの表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @param Display AP Width Cmd
 * @parent apCost
 * @desc コマンド欄のアクションポイントコストの表示幅を設定します。(半角文字数、0で非表示)
 * @default 3
 * @type number
 * @min 0
 *
 * @param Display AP Width Item
 * @parent apCost
 * @desc スキルやアイテム欄のアクションポイントコストの表示幅を設定します。(半角文字数、0で非表示)
 * @default 4
 * @type number
 * @min 0
 *
 * @param AP Window Layout
 * @desc APウィンドウのレイアウト設定
 * 空欄の場合は、デフォルトの表示位置です。
 * @type struct<window>
 * @default 
 * 
 * @param --- 戦闘行動の強制 ---
 * 
 * @param Enable Force Action AP
 * @desc 戦闘行動の強制で実行したスキルのAP消費を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Enable Force Action AC
 * @desc 戦闘行動の強制でスキルを使用したアクターの行動回数消費を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを導入すると、敵味方交互にターンが進むターン制戦闘システムに
 * 変更します。
 * 
 * この戦闘システムは、基本的にプレイヤー側が有利に戦闘を進めることができます。
 * 
 * 
 * ＜お勧めの組み合わせプラグイン＞
 * AttackChain.js
 *    トリアコンタン氏作成。
 *    同一のエネミーに連続してアクターがダメージを与えると
 *    コンボが発生し、ダメージがアップします。
 *    画面にコンボ数や累計ダメージも表示するため、演出を強化できます。
 * 
 * YEP_BattleEngineCore.js
 * YEP_X_ActSeqPack1~3.js
 *    Yanlfy氏の作成した、非常に有名な戦闘システム改変系のプラグイン。
 *    ActSeqPackと合わせて使うことで、戦闘時にアクターを
 *    ダイナミックに動かすことができます。(サイドビュー戦闘用)
 *    当然ですが、Yanlfy氏のATBプラグインやCTBプラグインは使えません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    FTKR_FVActorAnimation.js        (フロントビューでアクター画像にアニメーション)
 *    YEP_BattleEngineCore.js
 *    YEP_X_ActSeqPack*.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_AlternatingTurnBattle.js
 *    ↓このプラグインよりも下に登録↓
 *    FTKR_BattleWindowLayout.js      (バトル画面のコマンドの位置を変更)
 *    FTKR_CSS_BattleStatus.js        (バトル画面のステータス表示を変更)
 *    FTKR_DisplayCommandFrame.js     (カーソルの変わりに枠や画像を表示)
 *    AttackChain.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * ターンの進行
 *-----------------------------------------------------------------------------
 * ターンの進行は、以下の様になります。
 *  戦闘開始メッセージ表示(0ターン目)⇒
 *  １ターン目開始⇒プレイヤーの１ターン目⇒エネミーの１ターン目⇒１ターン目終了
 *    ２ターン目開始⇒プレイヤーの２ターン目⇒･･･
 * 
 * 先制攻撃が発生すると、エネミーの１ターン目が無くなり、
 * 連続でプレイヤーが行動できます。
 * 
 * 不意打ちが発生すると、プレイヤーの１ターン目が無くなり
 * エネミーの１ターン目から始まります。
 * 
 * 
 * 敵グループのバトルイベントで、0ターン目実行の条件の場合は、
 * 戦闘開始メッセージ後から１ターン目のプレイヤーコマンド表示の間に
 * イベントを実行します。
 * 
 * 
 * ターン終了条件の場合は、プレイヤー側の場合は
 * プラグインパラメータ Player Turn End の設定により、以下のいずれかを選択できます。
 * 　・プレイヤーターンの終了時
 * 　・全体のターン終了時
 * 
 * エネミー側の場合は、全体のターン終了時が該当します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プレイヤーのターン
 *-----------------------------------------------------------------------------
 * プレイヤーのターンでは、以下の仕様になります。
 * 
 * 1. アクターの行動順は任意に選択できます。
 * 2. pgUpキーとpgDnキーで行動させるアクターを選択できます。(*1)
 * 3. アクターを選択し行動を決定すると、即座にスキルが発動し、
 *    その後に次に行動するアクター選択に移ります。
 * 4. キャラが行動すると、そのキャラの行動回数を１消費し、
 *    さらに、使用したスキルのアクションポイントの分、パーティーの
 *    アクションポイントを消費します。
 * 5. 全員が行動済みになるか、パーティーのアクションポイントが 0 になるか
 *    パーティーコマンドの「ターン終了」を選ぶと、エネミーのターンに移ります。
 * 6. キャンセルキーで、パーティーコマンドを表示できます。
 * 7. 誰かが行動したターンでは、パーティーコマンドの「逃げる」は
 *    実行できなくなります。
 * 8. 行動制約のあるステートを受けると、そのキャラは行動選択できず
 *    プレイヤーターンの開始時または終了時に行動制約に合わせた自動行動を行います。(*2)
 *    この自動行動はAPや行動回数の消費を無視します。
 * 
 * (*1)プラグインパラメータ Change Player でキー操作方法は変更できます。
 *     また、マウスでステータスウィンドウ上をクリックすることで
 *     クリックした位置のアクターに選択を変えることもできます。
 * 
 * (*2)プラグインパラメータ Confused Action Timing で実行タイミングを
 *     設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * エネミーのターン
 *-----------------------------------------------------------------------------
 * エネミーのターンでは、従来のMVのシステムとほぼ同じです。
 * 
 * 1. エネミーの行動順は、エネミーの敏捷性と使用するスキルの速度補正によって
 *    決まります。
 * 2. エネミーは、各ターン開始時に使用するスキルと行動順を決めます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動回数
 *-----------------------------------------------------------------------------
 * アクターは設定された行動回数(基準行動回数)の分だけ、毎ターン行動できます。
 * 
 * アクターの基準行動回数は、「特徴の行動回数追加の合計＋１」回です。
 * この値が毎ターンの行動回数になります。
 * 
 * 
 * ターン中にプラグインコマンドを実行することで
 * そのターンだけ行動回数を増減させることができます。
 * これは基準行動回数以上に増加させることができます。
 * 
 * ただし、プラグインパラメータ Default Max AC を設定している場合は
 * その数値以上に増加させることはできません。
 * アクターのメモ欄に<AltTB_Max_AC: n> を記述すると、個別に最大値 n を
 * 設定することができます。
 * 
 * 
 * プラグインコマンドで変化させた行動回数は、次のターンには元の基準行動回数に戻ります。
 * 
 * 行動回数は、プラグインパラメータ Show AC を有効にすると
 * 画面に各アクターの残り回数を表示します。
 * 
 * 
 * なお、プラグインパラメータ Disable AC を"無効にする"に設定すると
 * アクターは行動しても行動回数が減らなくなります。
 * この状態では、アクションポイントがある限り、何度でも同じアクターで
 * 行動することが可能です。
 * 
 * 
 * スキルやアイテムのメモ欄に、<AltTB_noAC>と記入すると
 * そのスキルやアイテムを使用しても行動回数を消費ません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクションポイント
 *-----------------------------------------------------------------------------
 * アクションポイントは、プラグインパラメータ Enable AP を有効にすると
 * 使用できます。
 * 
 * パーティーはアクションポイントというパラメータを持っています。
 * 各アクターは行動時に、行動回数とは別に、このアクションポイントを消費します。
 * アクションポイントの現在値を超える行動はすることができません。
 * 
 * アクションポイントの消費量は、使用したスキルごとに個別に変わります。
 * 
 * 
 * ＜パーティーのアクションポイントの設定＞
 * パーティーのアクションポイント最大値は、プラグインパラメータ Party Max AP で
 * 設定できます。現在値の初期値は Party AP です。
 * また、プラグインコマンドで、現在値や最大値を変更できます。
 * 
 * 
 * ＜スキルやアイテムのアクションポイントの設定＞
 * スキルやアイテム使用時に消費するアクションポイントは、以下の方法で設定します。
 * １．プラグインパラメータ Item AP で、全スキル・アイテム共通のデフォルト値を設定。
 * ２．個別に、メモ欄に<AltTB_AP: n>で設定。n が消費量です。
 * なお、個別の設定を優先します。
 * 
 * また、スキルのメモ欄に<AltTB_GainAP: n>と設定すると、
 * そのスキルを使用した時に、命中時に n ポイントAPを取得できます。
 * さらに、以下のタグを追加すると、そのAP取得に条件を設定できます。
 * 
 * <AltTB_GainAP_Conditions>
 * condition1
 * condition2
 * ...
 * </AltTB_GainAP_Conditions>
 * 
 * 入力例は後述。
 * 
 * 
 * ＜ターン毎のアクションポイント回復量＞
 * プラグインパラメータ Turn Refresh AP で、ターン毎の回復量を設定できます。
 * 回復量はスクリプトで設定できます。
 * 
 * 例)偶数ターンなら３回復、奇数ターンなら２回復するスクリプト
 *  $gameTroop.turnCount() % 2 ? 2 : 3
 * 
 * 
 * ＜戦闘毎のアクションポイントのリセット＞
 * アクションポイントは戦闘毎にリセットされ、0 から開始します。
 * ただし、プラグインパラメータ Enable Reset AP Every Battle を無効にすることで
 * 残ったアクションポイントを次の戦闘に持ち越すことができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * <AltTB_GainAP_Conditions>条件式タグの設定方法
 *-----------------------------------------------------------------------------
 * 以下のノートタグをスキルやアイテム追記することで、<AltTB_GainAP: n>で設定した
 * AP取得に条件を設定することができます。
 * 
 * <AltTB_GainAP_Conditions>
 * condition1
 * condition2
 * ...
 * </AltTB_GainAP_Conditions>
 * 
 * 
 * [条件式(condition) の値について]
 * 条件式(condition)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - 攻撃側のパラメータを参照します。(a.atk で攻撃側の攻撃力)
 *  b.param - 防御側のパラメータを参照します。(b.atk で防御側の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 * 入力例）
 * スイッチID1 が ON の時かつ使用者がアクターID1の場合にAP取得。
 * <AltTB_GainAP: 1>
 * <AltTB_GainAP_Conditions>
 * !!s[1]
 * a.actorId() === 1
 * </AltTB_GainAP_Conditions>
 * 
 * 
 * [複数の条件を設定する場合]
 * 以下の2種類の入力例は同じ意味で、condition1とcondition2を両方満たした時に
 * APを取得できます。
 * 
 * 1. 縦に複数の条件式を並べる
 * <AltTB_GainAP_Conditions>
 * condition1
 * condition2
 * </AltTB_GainAP_Conditions>
 * 
 * 2. '&&'を使用して横に複数の条件式を並べる
 * <AltTB_GainAP_Conditions>
 * condition1 && condition2
 * </AltTB_GainAP_Conditions>
 * 
 * 
 * 複数の条件の中から、いずれか一つを満たした場合の条件を設定する場合は
 * 以下の様に'||'を使用して記述します。
 * 
 * <AltTB_GainAP_Conditions>
 * condition1 || condition2
 * </AltTB_GainAP_Conditions>
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプト
 *-----------------------------------------------------------------------------
 * このプラグインでは、以下のスクリプトが使用できます。
 * 
 * １．行動回数の現在値の取得
 *    アクターID n の場合
 *       $gameActors.actor(n).actionCount();
 *
 *    パーティーの n 番目のキャラの場合
 *       $gameParty.members()[n-1].actionCount();
 * 
 *    敵グループの n 番目のキャラの場合
 *       $gameTroop.members()[n-1].actionCount();
 * 
 * 
 * ２.行動回数の基準値の取得(毎ターンこの値まで回数が回復する、最大値ではない)
 *    アクターID n の場合
 *       $gameActors.actor(n).baseActionCount();
 * 
 *    パーティーおよび敵グループの場合も上記１と同様。
 * 
 * 
 * ３.行動回数の最大値の取得
 *    アクターID n の場合
 *       $gameActors.actor(n).maxActionCount();
 * 
 *    パーティーおよび敵グループの場合も上記１と同様。
 * 
 * 
 * ４．パーティーのアクションポイントの現在値の取得
 *       $gameParty.actionPoint();
 * 
 * 
 * ５．パーティーのアクションポイントの最大値の取得
 *       $gameParty.maxActionPoint();
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * このプラグインでは、以下のプラグインコマンドが使用できます。
 * ※[]は実際の入力に使用しません
 * 
 * １．行動回数の増加
 * 対象の行動回数を操作します。減らすことも出来ます。
 * 減らしたことで、行動回数が 0 になった対象は、そのターン行動できなくなります。
 * 基準の行動回数以上に増やすことが可能です。
 * 
 * AltTB_行動回数増加 [対象分類] [対象ID] [増加量]
 * AltTB_ADD_AC [targetType] [targetId] [value]
 * 
 *    対象分類(targetType)
 *        ：行動回数を増加させる対象をどのように選ぶかを指定します。
 *        　以下の文字列を入力してください。
 *        　　アクター   または Actor
 *        　　パーティー または Party
 *        　　敵グループ または Troop
 * 
 *    対象ID(targetId)
 *        ：対象分類に合わせて、以下のIDを指定します。
 *        　アクターなら、対象のアクターID。
 *        　パーティーなら、パーティー先頭を 1 とした並び順。
 *        　敵グループなら、敵グループ先頭を 1 とした並び順。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 *    増加量(value)
 *        ：行動回数を増加させる値を指定します。
 *        　負の値を指定した場合、対象の行動回数は減少します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 * 入力例)
 *    AltTB_行動回数増加 アクター 1 1
 *    AltTB_ADD_AC Actor 1 1
 *        ：アクターID 1 の行動回数を 1 増やします。
 * 
 *    AltTB_行動回数増加 パーティー 2 \v[5]
 *    AltTB_ADD_AC Party 2 \v[5]
 *        ：パーティーの 2 番目のキャラの行動回数を 変数ID 5 の値分、増やします。
 * 
 *    AltTB_行動回数増加 敵グループ 3 -1
 *    AltTB_ADD_AC Troop 3 -1
 *        ：敵グループの 3 番目のキャラの行動回数を 1 減らします。
 * 
 * 
 * ２．アクションポイントの増加
 * パーティーのアクションポイントの値を操作します。減らすこともできます。
 * 減らしたことで、アクションポイントが 0 になった場合は、プレイヤーターンを終了します。
 * 最大値を超えて現在値を増やすことはできません。
 * 
 * 現在値の操作：
 * 
 * AltTB_アクションポイント増加 [増加量]
 * AltTB_ADD_AP [value]
 * 
 *    増加量(value)
 *        ：アクションポイントを増加させる値を指定します。
 *        　負の値を指定した場合、アクションポイントは減少します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 * 入力例)
 *    AltTB_アクションポイント増加 1
 *    AltTB_ADD_AP 1
 *        ：アクションポイントを 1 増やします。
 * 
 * 
 * 最大値の操作：
 * ※最大値を増やしても現在値は変わりません。
 * 
 * AltTB_アクションポイント増加 [増加量] 最大値
 * AltTB_ADD_AP [value] MAX
 * 
 * 
 * 入力例)
 *    AltTB_アクションポイント増加 1 最大値
 *    AltTB_ADD_AP 1 MAX
 *        ：アクションポイントの最大値を 1 増やします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * FTKR_CustomSimpleActorStatus.js との組み合わせについて
 *-----------------------------------------------------------------------------
 * FTKR_CustomSimpleActorStatus.jsに以下のコードを追加します。
 * ※英字の大文字小文字はどちらでも可
 * 
 *    actc
 *    - アクターの行動回数を表示します。
 *    
 *    actp
 *    - パーティーのアクションポイントを表示します。
 *      表示内容はプラグインパラメータの設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * YEP_BattleEngineCore.js との組み合わせについて
 *-----------------------------------------------------------------------------
 * YEP_BattleEngineCoreプラグインの以下の機能は使用できません。
 * ※他にもあるかもしれません。
 * 
 * プラグインパラメータ
 *  Default System     ：dtb 固定
 *  Start Actor Command：無効
 * 
 * 
 *-----------------------------------------------------------------------------
 * このプラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v1.6.2 - 2018/11/17 : 不具合修正
 *    1. 行動制限付きステートを付与したターンに解除した場合に、戦闘が止まってしまう
 *       不具合を修正。この場合は、行動できずにターンを終了するようにしました。
 * 
 * v1.6.1 - 2018/11/11 : 不具合修正
 *    1. ACを無効にした場合に、エネミーターンが終了しない不具合を修正。
 *    2. 「逃げる」コマンドに失敗した時に、１ターン余計に進んでしまう不具合を修正。
 *    3. 「逃げる」コマンドを実行し戦闘終了させた時に、画面外に逃げたSVアクターが
 *        画面内に戻ってきてしまう不具合を修正。
 * 
 * v1.6.0 - 2018/11/09 : 機能追加
 *    1. アクターコマンドおおびアイテム・スキルウィンドウのアクションポイントを
 *       非表示にする機能を追加。
 * 
 * v1.5.0 - 2018/10/28 : 機能追加
 *    1. パーティーが行動できなくなった場合に、アクター変更操作を禁止して自動で
 *       パーティーコマンドに戻す機能を追加。
 *    2. AP0スキルを覚えていれば、パーティーのAPが0でも行動可能にする機能を追加。
 *    3. パーティーが行動できなくなった場合に、パーティーコマンドの戦うを選択でき
 *       ないように変更。
 * 
 * v1.4.9 - 2018/10/21 : 不具合修正
 *    1. エネミーが行動制約のあるステートを受けた場合に、ターンが進行しなくなる
 *       不具合を修正。
 * 
 * v1.4.8 - 2018/10/20 : 不具合修正
 *    1. v1.4.7の修正内容による、行動選択時にエラーになる不具合を修正。
 *    2. 行動回数の増加のプラグインコマンドの入力内容で、パーティーと敵グループの
 *       番号指定がずれている不具合を修正。
 * 
 * v1.4.7 - 2018/10/20 : 不具合修正
 *    1. エネミーの行動回数を増加をさせても反映されない不具合を修正。
 * 
 * v1.4.6 - 2018/10/16 : 競合回避
 *    1. ｖ1.4.5の修正内容によるYEP_BattleEngineCoreとの競合部分の回避処理を追加。
 * 
 * v1.4.5 - 2018/10/04 : 不具合修正、機能追加
 *    1. パーティーが行動制約のあるステートを受けても効果が発生しない不具合を修正。
 *    2. 行動制約による強制行動の実行タイミングを設定する機能を追加。
 * 
 * v1.4.4 - 2018/09/15 : 不具合修正
 *    1. イベントコマンド「戦闘行動の強制」を使用した場合に、行動選択時にエラーになる
 *       不具合を修正。
 *    2. プラグインパラメータ AP Window Layout を設定せずに、APを有効にした場合に
 *       戦闘開始時にエラーになる不具合を修正。
 * 
 * v1.4.3 - 2018/08/26 : 不具合修正
 *    1. v1.4.2の修正箇所の不具合(プラグインコマンドで行動回数が増加しない)修正。
 * 
 * v1.4.2 - 2018/08/25 : 不具合修正
 *    1. プラグインコマンドで行動回数を増加させても、行動選択時にエラーになる
 *       不具合を修正。
 *    2. 戦闘中にプラグインコマンドで行動回数が増減した場合に、ステータスウィンドウに
 *       反映されない不具合を修正。
 * 
 * v1.4.1 - 2018/08/21 : 仕様変更、機能追加、ヘルプ追記
 *    1. 戦闘シーン以外でも actionCount() にて行動回数を取得できるように修正。
 *    2. 行動回数に最大値を設定する機能を追加。
 *    3. 行動回数の表示方式に、ゲージとアイコンを追加。
 *    4. 各アクターの行動回数の基準値に関してヘルプに追記。
 * 
 * v1.4.0 - 2018/08/19 : 機能追加、仕様変更
 *    1. アクションポイントの最大値を設定する機能を追加。
 *    2. アクションポイントの表示方式に最大値、ゲージ、アイコンを追加。
 *    3. アクションポイントウィンドウの表示レイヤーをパーティーコマンドウィンドウの下に変更。
 *    4. アクションポイントウィンドウの背景を設定する機能を追加。
 * 
 * v1.3.3 - 2018/08/17 : 不具合修正
 *    1. FTKR_CustomSimpleActorStatus または FTKR_FVActorAnimation と組合せた時に
 *       行動済みのアクターの「名前＋顔画像をグレー表示」が正常に動作しない不具合を修正。
 * 
 * v1.3.2 - 2018/08/05 : 不具合修正、機能追加
 *    1. 行動後モーションを停止に設定した場合、ターン開始時に待機モーションに
 *       戻らない不具合を修正。(サイドビュー)
 *    2. プレイヤーターン終了時に未行動のアクターのモーションを設定する機能を追加。
 *    3. キー操作でアクターを変更する場合に、行動回数を追加したアクターから次の
 *       アクターにカーソルが正常に移らない不具合を修正。
 *    4. 複数回行動可能なアクターが、行動後にまだ行動回数が残っていても１歩下がって
 *       しまう不具合を修正。(サイドビュー)
 *    5. 行動回数消費を無効かつアクターコマンド選択から開始に設定した場合に、
 *       最初のアクターが前進後にすぐに一歩下がってしまう不具合を修正。(サイドビュー)
 * 
 * v1.3.1 - 2018/07/27 : 競合回避、ヘルプ修正
 *    1. FTKR_FVActorAnimation.jsと組み合わせた時に、FTKR_FVActorAnimationの
 *       アクターエフェクト機能が正常に動作しない不具合を修正。
 *    2. FTKR_CustomSimpleActorStatus.jsで行動回数とアクションポイントを表示する
 *       機能を追加。
 * 
 * v1.3.0 - 2018/05/04 : 機能追加
 *    1. 使用したスキル命中時に、<AltTB_GainAP:n>で設定したAP取得の条件を
 *       設定できる機能を追加。
 * 
 * v1.2.2 - 2018/04/30 : 不具合修正、機能追加
 *    1. 自動でプレイヤーターンを飛ばす処理が正常に動作しない不具合を修正。
 *    2. エネミーターンに移行した直後にゲームが止まる不具合を修正。
 *    3. 特定のスキル・アイテムの行動回数の消費を無効にする機能を追加。
 * 
 * v1.2.1 - 2018/04/29 : 不具合修正、機能追加
 *    1. AP0になった時に、ゲームがフリーズする不具合を修正。
 *    2. 戦闘行動の強制で消費APを無効にしても、AP0になった際に戦闘行動の強制を
 *       実行できない不具合を修正。
 *    3. アクターの行動回数を無効にした時に、同じアクターを２回以上行動させると
 *       エラーになる不具合を修正。
 *    4. アクターの行動回数を無効にした時に、エネミーターンが終わらない不具合を修正。
 *    5. プレイヤーが全員行動できなくなった時に、自動でプレイヤーターンを
 *       飛ばすかどうか設定する機能を追加。
 *    6. パーティーの初期APとスキル・アイテムの消費APのデフォルト値を、どちらも 0 に
 *       設定できるように変更。
 * 
 * v1.2.0 - 2018/04/29 : 機能追加
 *    1. アクションポイントウィンドウのレイアウト設定機能を追加。
 *    2. スキル使用後にAPを一定値自動取得可能な機能を追加。
 *    3. アクターの行動回数による行動制限を無効にする機能を追加。
 * 
 * v1.1.0 - 2018/04/09 : 機能追加
 *    1. アクターコマンドのAP表示部の処理を見直し。
 *    2. APの表示幅や表示色を設定する機能を追加。
 *    3. 残り行動回数を表示する機能を追加。
 *    4. マウスクリックでアクターを変更する機能を追加。
 * 
 * v1.0.0 - 2018/04/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~window:
 * @param width
 * @desc ウィンドウの幅を設定します。
 * @type number
 * @default 120
 *
 * @param positionY
 * @desc ウィンドウの表示Y座標を設定します。
 * @type number
 * @min 0
 * @default 372
 *
 * @param positionX
 * @desc ウィンドウの表示X座標を設定します。
 * @type number
 * @min 0
 * @default 0
 * 
 * @param background
 * @desc ウィンドウの背景を設定します。
 * @type select
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 *
*/

function Window_BattleActionPoint() {
    this.initialize.apply(this, arguments);
}

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

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

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

    var setArgBool = function(arg) {
        switch((setArgStr(arg)).toUpperCase()) {
            case 'TRUE':
                return true;
            default :
                return false;
        }
    }

    var clearObj = function(obj) {
        for(var key in obj){
            delete obj[key];
        }
    };

    Array.prototype.everyOk = function (){
        return this.every( function(arr){
            return !!arr;
        });
    };

    Array.prototype.someOk = function (){
        return this.some( function(arr){
            return !!arr;
        });
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
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_AlternatingTurnBattle');

    FTKR.AltTB = {
        textTurnEnd     : (parameters['TurnEnd Command'] || 'ターン終了'),
        changePlayer    : (paramParse(parameters['Change Player']) || 0),
        startActorCmd   : (paramParse(parameters['Start Actor Command']) || false),
        enableAutoTurnEnd : (paramParse(parameters['Enable Auto Player Turn End']) || false),
        confusedActionTiming : +(paramParse(parameters['Confused Action Timing']) || 0),
        disableAC       : (paramParse(parameters['Disable AC']) || false),
        showAC          : (paramParse(parameters['Show Action Count']) || false),
        dispACFormat    : (paramParse(parameters['Display AC Format']) || '[%1]'),
        acColor         : (paramParse(parameters['AC Color']) || 0),
        dispAcWidth     : (paramParse(parameters['Display AC Width']) || 3),
        acDrawType      : (paramParse(parameters['AC Draw Type']) || 0),
        defaultMaxAC    : (paramParse(parameters['Default Max AC']) || 0),
        acIcon          : (paramParse(parameters['AC Icon Index']) || 163),
        acEmptyIcon     : (paramParse(parameters['AC Empty Icon Index']) || 160),
        dispACGauge     : (paramParse(parameters['Display AC Gauge']) || false),
        acGaugeColor1   : (paramParse(parameters['AC Gauge Color1']) || 0),
        acGaugeColor2   : (paramParse(parameters['AC Gauge Color2']) || 0),
        activated       : (paramParse(parameters['Activated Actor Sign']) || 0),
        activatedSv     : (paramParse(parameters['Activated Sv Actor Sign']) || 0),
        notActivatedSv  : (paramParse(parameters['Not Activated Sv Actor Sign']) || 0),
        enableAP        : (paramParse(parameters['Enable AP']) || false),
        dispAP          : (paramParse(parameters['Display AP']) || 'AP'),
        dispAPGauge     : (paramParse(parameters['Display AP Gauge']) || false),
        apGaugeColor1   : (paramParse(parameters['AP Gauge Color1']) || 0),
        apGaugeColor2   : (paramParse(parameters['AP Gauge Color2']) || 0),
        apDrawType      : (paramParse(parameters['AP Draw Type']) || 0),
        apIcon          : (paramParse(parameters['AP Icon Index']) || 162),
        apEmptyIcon     : (paramParse(parameters['AP Empty Icon Index']) || 160),
        iconSpace       : (paramParse(parameters['Draw Icon Space']) || 0),
        partyMaxAp      : (paramParse(parameters['Party Max AP']) || 0),
        partyAp         : (paramParse(parameters['Party AP']) || 0),
        itemAp          : (paramParse(parameters['Item AP']) || 0),
        apCostPos       : (paramParse(parameters['AP Cost Position']) || 0),
        apCostColor     : (paramParse(parameters['AP Cost Color']) || 0),
        dispApWidthCmd  : (paramParse(parameters['Display AP Width Cmd']) || 0),
        dispApWidthItem : (paramParse(parameters['Display AP Width Item']) || 0),
        turnRefreshAP   : (paramParse(parameters['Turn Refresh AP']) || 0),
        enableResetAP   : (paramParse(parameters['Enable Reset AP Every Battle']) || true),
        layoutAPWindow  : (paramParse(parameters['AP Window Layout']) || null),
        enableFAAC      : (paramParse(parameters['Enable Force Action AC']) || false),
        enableFAAP      : (paramParse(parameters['Enable Force Action AP']) || false),
        showApWindow    : (paramParse(parameters['Show AP Window']) || 0),
        notSelectActivatedActor : (paramParse(parameters['Cannot Select Activated Actor']) || false),
        disableChangeActorWPCA  : (paramParse(parameters['Disable Change When Party Cannot Act']) || false),
        enableAP0SkillsRegardlessAP : (paramParse(parameters['Enable Use AP0Skills Regardless Of AP']) || false),
    };

    FTKR.test = false;

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _AltTB_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _AltTB_BattleManager_initMembers.call(this);
        this._actionPlayers = [];
        this._actionEnemies = [];
        this._inputCount = 0;
        this._lastActorIndex = -1;
        this._partyApWindow = null;
        this._actorCommandWindow = null;
        this.setPlayerTurn();
    };

    BattleManager.clear = function() {
        this._phase = null;
        this._canEscape = false;
        this._canLose = false;
        this._battleTest = false;
        this._eventCallback = null;
        this._preemptive = false;
        this._surprise = false;
        this._actorIndex = null;
        this._actionForcedBattler = null;
        this._mapBgm = null;
        this._mapBgs = null;
        this._actionBattlers.length = 0;
        this._subject = null;
        this._action = null;
        this._targets.length = 0;
        this._logWindow = null;
        this._statusWindow = null;
        this._spriteset = null;
        this._escapeRatio = 0;
        this._escaped = false;
        clearObj(this._rewards);
        this._turnForced = false;
        this._actionPlayers.length = 0;
        this._actionEnemies.length = 0;
        this._inputCount = 0;
        this._lastActorIndex = null;
        this._partyApWindow = null;
        this._actorCommandWindow = null;
        this._isPlayerTurn = false;
    };

    BattleManager.setActorWindow = function(actorWindow) {
        this._actorCommandWindow = actorWindow;
    };

    BattleManager.setPartyApWindow = function(apWindow) {
        this._partyApWindow = apWindow;
    };

    BattleManager.isTouchedOutsideActorCommandWindow = function() {
        return this._actorCommandWindow.active && !this._actorCommandWindow.isTouchedInsideFrame()
    };

    BattleManager.setPlayerTurn = function() {
        this._isPlayerTurn = true;
    };

    BattleManager.setEnemyTurn = function() {
        this._isPlayerTurn = false;
    };

    BattleManager.isPlayerTurn = function() {
        return this._isPlayerTurn;
    };

    BattleManager.changeTrunSide = function(flag) {
        if (!flag) this._phase = 'turn';
        if (FTKR.AltTB.notActivatedSv && this.isPlayerTurn()) {
            $gameParty.setActionState('');
        }
        this._isPlayerTurn = !this._isPlayerTurn;
        this._inputCount = 0;
        if (FTKR.AltTB.enableAP) this.changeAPWindow();
    };

    Game_Party.prototype.setActionState = function(state) {
        this.members().forEach(function(member){
            member.setActionState(state);
        });
    };

    BattleManager.changeAPWindow = function() {
        if (FTKR.AltTB.showApWindow === 1) {
            if (this.isPlayerTurn()) {
                this._partyApWindow.open();
            } else {
                this._partyApWindow.close();
            }
        }
    };

    BattleManager.changeActorAltTB = function(index) {
        if (!FTKR.AltTB.activatedSv) {
            var state = 'undecided';
        } else {
            var state = this.actor() && this.actor().canInputAction() ? 'undecided' : '';
        }
        this.changeActor(index, state);
    };

    BattleManager.resetLastActorIndex = function() {
        this._lastActorIndex = -1;
    };

    BattleManager.lastActorIndex = function() {
        return this._lastActorIndex;
    };

    BattleManager.reserveLastActorIndex = function() {
        this._lastActorIndex = this._actorIndex;
    };

    BattleManager.inputCount = function() {
        return this._inputCount;
    };

    BattleManager.subject = function() {
        if (this.isPlayerTurn()) {
            return this.actor();
        } else {
            return this._subject;
        }
    }

    BattleManager.actionBattlers = function() {
        if (this.isPlayerTurn()) {
            return this._actionPlayers;
        } else {
            return this._actionEnemies;
        }
    };

    BattleManager.setActionBattlers = function(battlers) {
        if (this.isPlayerTurn()) {
            this._actionPlayers = battlers;
        } else {
            this._actionEnemies = battlers;
        }
    };

    //書き換え
    BattleManager.getNextSubject = function() {
        for (;;) {
            var battler = this.actionBattlers().shift();
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };

    BattleManager.sortActionSpeed = function(battlers) {
        battlers.forEach(function(battler) {
            battler.makeSpeed();
        });
        battlers.sort(function(a, b) {
            return b.speed() - a.speed();
        });
        return battlers;
    };

    //書き換え
    BattleManager.makePlayerOrders = function() {
        var battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat($gameParty.members());
        }
        this._actionPlayers = battlers;
    };

    //書き換え
    BattleManager.makeEnemyOrders = function() {
        var battlers = [];
        if (!this._preemptive) {
            battlers = battlers.concat($gameTroop.members());
        }
        this._actionEnemies = this.sortActionSpeed(battlers);
    };

    //書き換え
    BattleManager.makeActionOrders = function() {
        this.makeEnemyOrders();
        this.makePlayerOrders();
    };

    //書き換え
    BattleManager.forceAction = function(battler) {
        this._actionForcedBattler = battler;
        if (battler.isActor()) {
            this.forcePartyAction(battler);
        } else {
            this.forceEnemyAction(battler);
        }
    };

    BattleManager.forcePartyAction = function(battler){
        battler.payActionCount();
        this.payActionPoint(battler);
    };

    BattleManager.payActionPoint = function(battler) {
        if (FTKR.AltTB.enableAP && battler.isActor()) {
            var action = battler.currentAction();
            if (action._forcing && !FTKR.AltTB.enableFAAP) return;
            var usedAp = action.item().actionPoint;
            $gameParty.getActionPoint(-usedAp);
            this._partyApWindow.refresh();
        }
    };

    BattleManager.forceEnemyAction = function(battler){
        var index = this.actionBattlers().indexOf(battler);
        if (index >= 0) {
            this.actionBattlers().splice(index, 1);
        }
    };

    var _AltTB_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _AltTB_BattleManager_startBattle.call(this);
        this.resetAPWindow();
    };

    BattleManager.resetAPWindow = function() {
        if (FTKR.AltTB.enableAP) {
            if (FTKR.AltTB.enableResetAP) $gameParty.resetActionPoint();
            if (FTKR.AltTB.showApWindow) this._partyApWindow.open();
        }
    };

    //書き換え
    BattleManager.checkAbort = function() {
        if ($gameParty.isEmpty() || this.isAborting()) {
            this.processAbort();
        }
        return false;
    };

    //書き換え
    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();
                break;
            case 'turnStart':
                this.updateTurnStart();
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'actionEnd':
                this.updateActionEnd();
                break;
            case 'confusedActionTurn':
                this.updateConfusedPartyAction();
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    BattleManager.updateStart = function() {
        if (FTKR.test) console.log('updateStart');
        this._phase = 'turnStart';
        this.clearActor();
        if (this._surprise) this.setEnemyTurn();
    };

    BattleManager.updateTurnStart = function() {
        if (FTKR.test) console.log('updateTurnStart');
        this._phase = 'turn';
        this._playerTurnStart = false;
        this._enemyTurnStart = false;
        $gameParty.makeActions();
        $gameTroop.makeActions();
        $gameParty.resetActionCount();
        $gameTroop.resetActionCount();
        this.resetLastActorIndex();
        if (FTKR.AltTB.enableAP) $gameParty.turnRefreshAP();
        this.clearActor();
        $gameTroop.increaseTurn();
        this.makeActionOrders();
        $gameParty.requestMotionRefresh();
        $gameParty.resetActionState();
        $gameParty.members().forEach(function(member){
            if (member.isConfused() || !member.canMove()) {
                member.clearActionCount();
            }
        });
        this._logWindow.startTurn();
        this._statusWindow.refresh();
        if (FTKR.AltTB.enableAP) this._partyApWindow.refresh();
        if (FTKR.AltTB.startActorCmd) this.changeActorAltTB(0);
    };

    Game_Party.prototype.resetActionState = function() {
        this.members().forEach(function(member){
            member.setActionState('undecided');
        });
    };

    //書き換え
    BattleManager.updateTurn = function() {
        if (FTKR.test) console.log('updateTurn');
        $gameParty.requestMotionRefresh();
        if (this.isPlayerTurn()) {
            if (!this._playerTurnStart) {
                this.updatePlayerTurnStart();
                this._playerTurnStart = true;
            } else {
                this.resetPlayerActions();
                this.updatePlayerTurn();
            }
        } else {
            if (!this._enemyTurnStart) {
                this.updateEnemyTurnStart();
                this._enemyTurnStart = true;
            } else {
                this.updateEnemyTurn();
            }
        }
    };

    BattleManager.updatePlayerTurnStart = function() {
        if (FTKR.AltTB.confusedActionTiming) {
            this._phase = 'confusedActionTurn';
        }
    };

    BattleManager.updateEnemyTurnStart = function() {
    };

    BattleManager.resetPlayerActions = function() {
        if (FTKR.AltTB.disableAC) $gameParty.makeActions();
    };

    BattleManager.checkAutoTurnChange = function() {
        return FTKR.AltTB.enableAutoTurnEnd && $gameParty.cannotInputPlayerAction();
    };

    BattleManager.updatePlayerTurn = function() {
        if (!this.checkAutoTurnChange()) {
            this._phase = 'input';
            this.autoSelectNextActor();
        } else {
            this.updatePlayerTurnEnd();
        }
    };

    BattleManager.updateConfusedPartyAction = function() {
        this._isConfusedPartyAction = true;
        this._subject = this.setConfusedPartyMember();
        if (this._subject) {
            this.processTurn();
        } else {
            if (FTKR.AltTB.confusedActionTiming) {
                this._phase = 'turn';
            } else {
                this.changeTrunSide();
            }
            this._isConfusedPartyAction = false;
        }
    };

    BattleManager.updatePlayerTurnEnd = function() {
        if (!FTKR.AltTB.confusedActionTiming) {
            this._phase = 'confusedActionTurn';
        } else {
            this.changeTrunSide();
        }
    };

    BattleManager.setConfusedPartyMember = function() {
        var subject = null;
        $gameParty.members().some(function(member){
            if (member.isConfused() && member.currentAction()) {
                subject = member;
                return true;
            };
        });
        return subject;
    };

    BattleManager.autoSelectNextActor = function() {
        if (!FTKR.AltTB.notSelectActivatedActor || !this.actor()) return;
        if (!$gameParty.canInputAction() && FTKR.AltTB.disableChangeActorWPCA) {
            this.changeActorAltTB(-1);
        } else {
            if (!this.actor().canSelectInput()) {
                this.selectNextCommand();
            } else {
                this.actor().setActionState('inputting');
            }
        }
    };

    BattleManager.updateEnemyTurn = function() {
        if (FTKR.test) {
            var name = this._subject ? this._subject.name() : 'なし';
            console.log('updateEnemyTurn', name, this.actionBattlers());
        }
        if (this._subject && this._subject.isActor()) this._subject = null;
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        } else {
            this.updateEnemyTurnEnd();
        }
    };

    BattleManager.updateEnemyTurnEnd = function() {
        if (FTKR.test) {
            var name = this._subject ? this._subject.name() : 'なし';
            console.log('updateEnemyTurnEnd', name, this.actionBattlers());
        }
        this._phase = 'turnEnd';
    };

    //書き換え
    BattleManager.processTurn = function() {
        if (FTKR.test) console.log('processTurn', this._subject.name());
        var subject = this._subject;
        var action = subject.currentAction();
        if (FTKR.test) console.log(action, subject._actions);
        if (action) {
            this.processBeforeAction(subject, action);
        } else {
            if (FTKR.test) console.log('clearActionCount', this._subject.name())
            subject.clearActionCount();
            this.endAction();
        }
    };

    BattleManager.processBeforeAction = function(subject, action) {
        if (FTKR.test) console.log('processBeforAction', subject, action);
        action.prepare();
        if (action.isValid()) {
            subject.payActionCount();
            this.payActionPoint(subject);
            this.startAction();
        }
        subject.removeCurrentAction();
    };

    //書き換え
    BattleManager.endAction = function() {
        if (FTKR.test) console.log('endAction', this._subject.name());
        this._phase = 'actionEnd';
        this._logWindow.endAction(this._subject);
    };

    BattleManager.updateActionEnd = function() {
        if (FTKR.test) console.log('updateActionEnd', this._subject.name(), this._subject.actionCount());
        if (this._isConfusedPartyAction) {
            this._phase = 'confusedActionTurn';
        } else {
            this._phase = 'turn';
        }
        var subject = this._subject;
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
        if (FTKR.test) console.log(subject.isConfused(), subject.isAppeared(), subject.restriction());
        if (subject && !subject.isActor() && FTKR.AltTB.disableAC) {
            subject.getActionCount(-1);
            console.log(subject.actionCount());
        }
        if (!this._subject.canMove()) {
            this._subject.clearActionCount();
        }
        if (!this._subject.actionCount()) this._subject = null;
    };

    //書き換え
    Game_Battler.prototype.performActionEnd = function() {
        if (this.canInputAction() || FTKR.AltTB.disableAC) {
            this.setActionState('inputting');
        } else {
            this.setActionState('done');
        }
    };

    //書き換え
    BattleManager.updateTurnEnd = function() {
        if (FTKR.test) console.log('updateTurnEnd');
        this._phase = 'turnStart';
        this._preemptive = false;
        this._surprise = false;
        this.allBattleMembers().forEach(function(battler) {
            battler.onTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }, this);
        if (this.isForcedTurn()) {
            this._turnForced = false;
        }
        this.changeTrunSide(1);
    };

    BattleManager.selectActorActions = function() {
        if (this.lastActorIndex() >= 0) {
            this.changeActorAltTB(this.lastActorIndex());
        } else {
            this.selectNextCommand();
        }
    };

    BattleManager.setNextCommand = function(index) {
        this.changeActorAltTB(index);
    };

    //書き換え
    BattleManager.startTurn = function() {
    };
    
    //書き換え
    BattleManager.selectNextCommand = function() {
        do {
            if ($gameParty.canInputAction() || !FTKR.AltTB.disableChangeActorWPCA) {
                if (this._actorIndex + 1 >= $gameParty.size()) {
                    this.changeActorAltTB(0);
                } else {
                    this.changeActorAltTB(this._actorIndex + 1);
                }
            } else {
                return;
            }
        } while (!this.actor().canSelectInput());
    };

    //書き換え
    BattleManager.selectPreviousCommand = function() {
        do {
            if ($gameParty.canInputAction() || !FTKR.AltTB.disableChangeActorWPCA) {
                if (this._actorIndex - 1 < 0) {
                    this.changeActorAltTB($gameParty.size() - 1);
                } else {
                    this.changeActorAltTB(this._actorIndex - 1);
                }
            } else {
                return;
            }
        } while (!this.actor().canSelectInput());
    };
/*
    var _AltTB_BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        _AltTB_BattleManager_updateBattleEnd.call(this);
        this.clear();
    };
*/
    //=============================================================================
    // DataManager
    //=============================================================================

    var _AltTB_DatabaseLoaded = false;
    var _AltTB_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_AltTB_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_AltTB_DatabaseLoaded) {
            if (FTKR.AltTB.enableAP) {
                this.altTBSkillNoteTags($dataSkills);
                this.altTBSkillNoteTags($dataItems);
            }
            _AltTB_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.altTBSkillNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.actionPoint = Number(readObjectMeta(obj, ['AltTB_AP']) || FTKR.AltTB.itemAp);
            obj.gainAp = Number(readObjectMeta(obj, ['AltTB_GAINAP']) || 0);
            obj.noAC = Boolean(testObjectMeta(obj, ['AltTB_NOAC']) || false);
            var datas = readEntrapmentCodeToText(obj, ['AltTB_GAINAP_CONDITIONS']) || '';
            obj.gainApConditions = convertTextToConditions(datas);
        }
    };

    DataManager.isHaveAp = function(item) {
        return FTKR.AltTB.enableAP && (this.isSkill(item) || this.isItem(item));
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _AltTB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (!command.match(/AltTB_(.+)/i)) _AltTB_Game_Interpreter_pluginCommand.call(this, command, args);
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '行動回数増加':
            case 'ADD_AC':
                this.addTargetAC(args);
                break;
            case 'アクションポイント増加':
            case 'ADD_AP':
                if (FTKR.AltTB.enableAP) this.addPartyAP(args);
                break;
        }
    };

    Game_Interpreter.prototype.addTargetAC = function(args) {
        var target = null;
        var targetId = setArgNum(args[1]);
        switch(args[0].toUpperCase()) {
            case 'アクター':
            case 'ACTOR':
                target = $gameActors.actor(targetId);
                break;
            case 'パーティー':
            case 'PARTY':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameParty.members()[targetId];
                break;
            case '敵グループ':
            case 'TROOP':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameTroop.members()[targetId];
                break;
        }
        if (target) {
            target.getActionCount(setArgNum(args[2]));
            if (!target.isActor()) {
                target.remakeActions();
                if (FTKR.test) console.log(target.name(), target._actions);
            }
        }
    };

    Game_Interpreter.prototype.addPartyAP = function(args) {
        var ap = setArgNum(args[0]);
        if (ap) {
            switch((args[1] + '').toUpperCase()) {
                case '最大値':
                case 'MAX':
                    $gameParty.addMaxActionPoint(ap);
                    break;
                default:
                    $gameParty.getActionPoint(ap);
                    break;
            }
        }
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    var _AltTB_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _AltTB_Game_Battler_initMembers.call(this);
        this._actionCount = 0;
    };

    Game_Battler.prototype.canInputAction = function() {
        return this.canInput() && this.hasActionCount();
    };

    Game_Battler.prototype.canSelectInput = function() {
        return FTKR.AltTB.notSelectActivatedActor ? this.canInputAction() : this.canInput();
    };

    Game_Battler.prototype.resetActionCount = function() {
        this._actionCount = this.numActions();
        this.refreshActionCount();
    };

    Game_Battler.prototype.actionCount = function() {
        return $gameParty.inBattle() ? this._actionCount : this.baseActionCount();
    };

    Game_Battler.prototype.clearActionCount = function() {
        this._actionCount = 0;
    };

    Game_Battler.prototype.baseActionCount = function() {
        var mac = this.maxActionCount();
        var bac = this.makeActionTimes();
        return mac > 0 ? Math.min(mac, bac) : bac;
    };

    Game_Battler.prototype.maxActionCount = function() {
        return FTKR.AltTB.defaultMaxAC;
    };

    Game_Battler.prototype.acRate = function() {
        return this.maxActionCount() ? this.actionCount() / this.maxActionCount() : 0;
    };

    Game_Battler.prototype.hasActionCount = function() {
        return this.actionCount() > 0 || FTKR.AltTB.disableAC;
    };

    Game_Battler.prototype.canPayAC = function(item) {
        return item.noAC || this.hasActionCount();
    };

    Game_Battler.prototype.getActionCount = function(value) {
        var now = this._actionCount;
        var max = this.maxActionCount();
        var diff = 0;
        if (value > 0) {
            diff = !max || now + value < max ? value : max - now;
        } else if (value < 0) {
            diff = now + value > 0 ? value : -now;
        }
        this._actionCount += diff;
        this.refreshActionCount();
        this.refreshBattleStatus(diff);
    };

    Game_Battler.prototype.refreshActionCount = function() {
        if (this.actionCount() < 0) this._actionCount = 0;
        if (this.maxActionCount() && this.actionCount() > this.maxActionCount()) this._actionCount = this.maxActionCount();
    };

    Game_Battler.prototype.refreshBattleStatus = function(diff) {
        if (!diff || !$gameParty.inBattle()) return;
        if (diff > 0) {
            for(var i = 0; i < diff; i++) {
                this._actions.push(new Game_Action(this));
            }
        }
        BattleManager._statusWindow.refresh();
    };

    Game_Battler.prototype.payActionCount = function() {
        if (!FTKR.AltTB.disableAC) {
            var action = this.currentAction();
            if (action.item().noAC || action._forcing && !FTKR.AltTB.enableFAAC) {
                this._actions.push(new Game_Action(this));
                return;
            }
            this.getActionCount(-1);
        }
    };

    Game_Battler.prototype.canAction = function() {
        return this.hasActionCount() && this.isAlive();
    };

    Game_Battler.prototype.canPayAP = function(item) {
        return true;
    };

    Game_Battler.prototype.canPayFAAP = function(item) {
        return true;
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _AltTB_Game_Actor_canUse = Game_Actor.prototype.canUse;
    Game_Actor.prototype.canUse = function(item) {
        var result = _AltTB_Game_Actor_canUse.call(this, item);
        if ($gameParty.inBattle() && !this.isConfused()) {
            return result && this.canPayAP(item) && this.canPayAC(item);
        } else {
            return result;
        }
    };

    Game_Actor.prototype.canPayAP = function(item) {
        //AP無効 または APが0 または 消費APが現在AP以下 または 戦闘行動の強制で消費無効
        return !FTKR.AltTB.enableAP || !item.actionPoint ||
            item.actionPoint <= $gameParty.actionPoint() ||
            this.currentAction() && this.currentAction()._forcing && !FTKR.AltTB.enableFAAP;
    };

    Game_Actor.prototype.removeCurrentAction = function() {
        Game_Battler.prototype.removeCurrentAction.call(this);
    };

    Game_Actor.prototype.maxActionCount = function() {
        return +readObjectMeta(this.actor(), ['ALTTB_MAX_AC']) || Game_Battler.prototype.maxActionCount.call(this);
    };

    Game_Actor.prototype.remakeActions = function() {
    };

    Game_Actor.prototype.hasAP0Skill = function() {
        var skills = [$dataSkills[1], $dataSkills[2]];
        skills = skills.concat(this.skills());
        return skills.some(function(skill){
            return !skill.actionPoint;
        });
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    var _AltTB_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _AltTB_Game_Party_initialize.call(this);
        this._maxActionPoint = FTKR.AltTB.partyMaxAp;
        this._actionPoint = FTKR.AltTB.partyAp;
    };

    Game_Party.prototype.actionPoint = function() {
        return this._actionPoint;
    };

    Game_Party.prototype.maxActionPoint = function() {
        return this._maxActionPoint;
    };

    Game_Party.prototype.apRate = function() {
        return this.actionPoint() / this.maxActionPoint();
    };

    Game_Party.prototype.addMaxActionPoint = function(value) {
        this._maxActionPoint += value;
        this.refreshActionPoint();
    };

    Game_Party.prototype.payActionPoint = function(point) {
        this.getActionPoint(-point);
    };

    Game_Party.prototype.getActionPoint = function(point) {
        this._actionPoint += point;
        this.refreshActionPoint();
    };

    Game_Party.prototype.refreshActionPoint = function() {
        this._actionPoint = this._actionPoint.clamp(0, this.maxActionPoint());
    };

    Game_Party.prototype.turnRefreshAP = function() {
        var point = FTKR.AltTB.turnRefreshAP === -1 ?
            this.maxActionPoint() : eval(FTKR.AltTB.turnRefreshAP);
        this.getActionPoint(point);
    };

    Game_Party.prototype.resetActionPoint = function() {
        this._actionPoint = 0;
    };

    Game_Party.prototype.refreshMaxAP = function() {
        this._actionPoint = this.maxActionPoint();
    };

    Game_Party.prototype.cannotInputPlayerAction = function() {
        var results = [
            FTKR.AltTB.enableAP && !this.actionPoint(),
            !this.battleMembers().some( function(battler){
                return battler.canInputAction();
            })
        ];
        return results[0] || results[1];
    };

    Game_Party.prototype.hasActionPoint = function() {
        return !FTKR.AltTB.enableAP || FTKR.AltTB.enableAP && this.actionPoint() > 0;
    };

    Game_Party.prototype.canInputAction = function() {
        return FTKR.AltTB.enableAP0SkillsRegardlessAP ? this.hasAP0Skill() :
            this.hasActionPoint() && 
                this.battleMembers().some( function(battler){
                    return battler.canInputAction();
                });
    };

    Game_Party.prototype.hasAP0Skill = function() {
        return this.battleMembers().some( function(battler){
            return battler.hasAP0Skill() && battler.canInputAction();
        });
    }

    Game_Party.prototype.resetActionCount = function() {
        this.battleMembers().forEach( function(member){
            member.resetActionCount();
        });
    };

    Game_Party.prototype.canUseAltTBnoForcing = function(item) {
        return this.members().some(function(actor) {
            return actor.canUseAltTBnoForcing(item);
        });
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================
    Game_Enemy.prototype.reselectAllActions = function(actionList) {
        var ratingMax = Math.max.apply(null, actionList.map(function(a) {
            return a.rating;
        }));
        var ratingZero = ratingMax - 3;
        actionList = actionList.filter(function(a) {
            return a.rating > ratingZero;
        });
        for (var i = 0; i < this.actionCount(); i++) {
            this.action(i).setEnemyAction(this.selectAction(actionList, ratingZero));
        }
    };

    Game_Enemy.prototype.remakeActions = function() {
        this.clearActions();
        if (this.canMove()) {
            var actionTimes = this.actionCount();
            this._actions = [];
            for (var i = 0; i < actionTimes; i++) {
                this._actions.push(new Game_Action(this));
            }
        }
        if (this.actionCount() > 0) {
            var actionList = this.enemy().actions.filter(function(a) {
                return this.isActionValid(a);
            }, this);
            if (actionList.length > 0) {
                this.reselectAllActions(actionList);
            }
        }
        this.setActionState('waiting');
    };

    Game_Enemy.prototype.maxActionCount = function() {
        return +readObjectMeta(this.enemy(), ['ALTTB_MAX_AC']) || Game_Battler.prototype.maxActionCount.call(this);
    };
/*
    Game_Enemy.prototype.removeCurrentAction = function() {
    };
*/
    //=============================================================================
    // Game_Troop
    //=============================================================================
    
    Game_Troop.prototype.resetActionCount = function() {
        this.members().forEach( function(member){
            member.resetActionCount();
        });
    };

    //=============================================================================
    // Game_Action
    //=============================================================================
    
    var _AltTB_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _AltTB_Game_Action_applyItemUserEffect.call(this, target);
        this.applyItemPartyGainAp(target);
    };

    Game_Action.prototype.applyItemPartyGainAp = function(target) {
        if (this.subject().isActor() && this.item().gainAp) {
            FTKR.setGameData(this.subject(), target, this.item());
            if (!this.item().gainApConditions || FTKR.evalFormula(this.item().gainApConditions)) {
                $gameParty.getActionPoint(this.item().gainAp);
                BattleManager._partyApWindow.refresh();
            }
        }
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    
    var _AltTB_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _AltTB_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setActorWindow(this._actorCommandWindow);
        if (FTKR.AltTB.enableAP) BattleManager.setPartyApWindow(this._partyApWindow);
    };

    var _AltTB_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _AltTB_Scene_Battle_createAllWindows.call(this);
        if (FTKR.AltTB.enableAP) this.createPartyActionPointWindow();
    };

    Scene_Battle.prototype.addWindowAtW = function(addWindow, atWindow) {
        this._windowLayer.children.some(function(wchild, i){
            if (wchild === atWindow) {
                windowIndex = i;
                return true;
            }
        },this);
        this._windowLayer.addChildAt(addWindow, windowIndex);
    };

    Scene_Battle.prototype.createPartyActionPointWindow = function() {
        var y = this._statusWindow.y;
        this._partyApWindow = new Window_BattleActionPoint(0, y);
        this.addWindowAtW(this._partyApWindow, this._partyCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        this._partyCommandWindow = new Window_PartyCommand();
        this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
        this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        this._partyCommandWindow.setHandler('turnEnd', this.commandTurnEnd.bind(this));
        this._partyCommandWindow.deselect();
        this.addWindow(this._partyCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.commandFight = function() {
        BattleManager.selectActorActions();
        this.changeInputWindow();
    };

    //書き換え
    Scene_Battle.prototype.commandEscape = function() {
        this.commandTurnEnd();
        BattleManager.processEscape();
    };

    //書き換え
    Scene_Battle.prototype.commandTurnEnd = function() {
        this.endCommandSelection();
        BattleManager.updatePlayerTurnEnd();
    };

    //書き換え
    Scene_Battle.prototype.createActorCommandWindow = function() {
        this._actorCommandWindow = new Window_ActorCommand();
        this._actorCommandWindow.setHandler('attack',  this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('skill',   this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler('guard',   this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item',    this.commandItem.bind(this));
        this._actorCommandWindow.setHandler('pageup',  this.commandPageup.bind(this));
        this._actorCommandWindow.setHandler('pagedown',this.commandPagedown.bind(this));
        this._actorCommandWindow.setHandler('cancel',  this.commandCancel.bind(this));
        this._actorCommandWindow.setStatusWindow(this._statusWindow);
        this.addWindow(this._actorCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.commandCancel = function() {
        BattleManager.reserveLastActorIndex()
        BattleManager.changeActorAltTB(-1);
        this.changeInputWindow();
    };

    Scene_Battle.prototype.commandPageup = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectPreviousCommand();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.commandPagedown = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        }
    };

    //書き換え
    Scene_Battle.prototype.selectNextCommand = function() {
        this.endCommandSelection();
        BattleManager._subject = BattleManager.actor();
        BattleManager._inputCount++;
        BattleManager.processTurn();
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.drawActorActionCount = function(actor, x, y, width) {
        var ac = actor.actionCount();
        var mac = actor.maxActionCount();
        var icon1 = FTKR.AltTB.acIcon;
        var icon2 = FTKR.AltTB.acEmptyIcon;
        this.drawACGauge(actor,x, y, width);
        switch (+FTKR.AltTB.acDrawType) {
            case 1:
                this.drawCssIconValue(x, y, width, ac, icon1);
                break;
            case 2:
                if (mac) this.drawIconGauge(x, y, width, ac, mac, icon1, icon2);
                break;
            default:
                var acw = this.textWidth('0') * FTKR.AltTB.dispAcWidth;
                width -= acw;
                this.drawCssNumberValue(x + width, y, acw, ac, mac);
                break;
        }
        return 1;
    };

    Window_Base.prototype.drawCssNumberValue = function(x, y, width, value, max) {
        var text = FTKR.AltTB.dispACFormat.format(value, max);
        this.changeTextColor(this.textColor(FTKR.AltTB.acColor));
        this.drawText(text, x, y, width, 'right');
        this.resetTextColor();
    };

    Window_Base.prototype.drawCssIconValue = function(x, y, width, value, icon) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (value > 1) {
            if (width >= (iw + 2) * value - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (value - 1);
            }
        }
        for (var i = 0; i < value; i++) {
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };

    Window_Base.prototype.drawIconGauge = function(x, y, width, current, max, icon1, icon2) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (max > 1) {
            if (width >= (iw + 2) * max - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (max - 1);
            }
        }
        for (var i = 0; i < max; i++) {
            var icon = i < current ? icon1 : icon2;
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };
    
    Window_Base.prototype.drawACGauge = function(actor, x, y, width) {
        if (FTKR.AltTB.dispACGauge && !FTKR.AltTB.acDrawType && actor.maxActionCount() > 0) {
            var color1 = this.acGaugeColor1();
            var color2 = this.acGaugeColor2();
            this.drawGauge(x, y, width, actor.acRate(), color1, color2);
        }
    };

    Window_Base.prototype.acGaugeColor1 = function() {
        return this.textColor(FTKR.AltTB.acGaugeColor1);
    };

    Window_Base.prototype.acGaugeColor2 = function() {
        return this.textColor(FTKR.AltTB.acGaugeColor2);
    };

    Window_Base.prototype.drawAPGauge = function(x, y, width) {
        if (FTKR.AltTB.dispAPGauge && FTKR.AltTB.apDrawType !== 2) {
            var color1 = this.apGaugeColor1();
            var color2 = this.apGaugeColor2();
            this.drawGauge(x, y, width, $gameParty.apRate(), color1, color2);
        }
    };

    Window_Base.prototype.apGaugeColor1 = function() {
        return this.textColor(FTKR.AltTB.apGaugeColor1);
    };

    Window_Base.prototype.apGaugeColor2 = function() {
        return this.textColor(FTKR.AltTB.apGaugeColor2);
    };

    Window_Base.prototype.drawActionPoint = function(x, y, width) {
        width = width || 186;
        var tw = 44;
        this.drawAPGauge(x, y, width);
        this.drawAPLabel(x, y, tw);
        this.drawAPValue(x + tw, y, width - tw);
        return 1;
    };

    Window_Base.prototype.drawAPGauge = function(x, y, width) {
        if (FTKR.AltTB.dispAPGauge && FTKR.AltTB.apDrawType !== 2) {
            var color1 = this.apGaugeColor1();
            var color2 = this.apGaugeColor2();
            this.drawGauge(x, y, width, $gameParty.apRate(), color1, color2);
        }
    };

    Window_Base.prototype.apGaugeColor1 = function() {
        return this.textColor(FTKR.AltTB.apGaugeColor1);
    };

    Window_Base.prototype.apGaugeColor2 = function() {
        return this.textColor(FTKR.AltTB.apGaugeColor2);
    };

    Window_Base.prototype.drawAPLabel = function(x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.AltTB.dispAP, x, y, width);
    };

    Window_Base.prototype.drawAPValue = function(x, y, width) {
        var ap = $gameParty.actionPoint();
        var map = $gameParty.maxActionPoint();
        var icon = FTKR.AltTB.apIcon;
        switch (+FTKR.AltTB.apDrawType) {
            case 2:
                this.drawIconGauge(x, y, width, ap, map, icon, FTKR.AltTB.apEmptyIcon);
                break;
            case 3:
                this.drawCssIconValue(x, y, width, ap, icon);
                break;
            default:
                var color = this.normalColor();
                this.drawApCurrentAndMax(ap, map, x, y, width, color, color);
                break;
        }
    };

    Window_Base.prototype.apValueWidth = function() {
        return this.textWidth('0000');
    };

    Window_Base.prototype.drawApCurrentAndMax = function(current, max, x, y,
                                                      width, color1, color2) {
        var valueWidth = this.apValueWidth();
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x && FTKR.AltTB.apDrawType == 1) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    //=============================================================================
    // Window_Selectable
    //=============================================================================

    Window_Selectable.prototype.apCostWidth = function() {
        return this.textWidth('0') * FTKR.AltTB.dispApWidthItem || 0;
    };

    Window_Selectable.prototype.drawApCost = function(cost, x, y, width) {
        this.drawText(FTKR.AltTB.dispAP + cost, x, y, width, 'right');
    };

    Window_Selectable.prototype.drawItemCost = function(item, x, y) {
        this.changeTextColor(this.textColor(FTKR.AltTB.apCostColor));
        this.drawApCost(item.actionPoint, x, y, this.apCostWidth());
        this.resetTextColor();
    };

    Window_Selectable.prototype.isEnabledDispItemAp = function() {
        return FTKR.AltTB.enableAP && FTKR.AltTB.dispApWidthItem > 0;
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    //書き換え
    Window_PartyCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.fight,  'fight', $gameParty.canInputAction());
        this.addCommand(TextManager.escape, 'escape', this.isEscapeEnabled());
        this.addCommand(FTKR.AltTB.textTurnEnd, 'turnEnd');
    };

    Window_PartyCommand.prototype.isEscapeEnabled = function() {
        return !BattleManager.inputCount() && BattleManager.canEscape();
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
    };

    var _AltTB_Window_ActorCommand_isCurrentItemEnabled = 
        Window_ActorCommand.prototype.isCurrentItemEnabled;
    Window_ActorCommand.prototype.isCurrentItemEnabled = function() {
        return _AltTB_Window_ActorCommand_isCurrentItemEnabled.call(this) &&
            BattleManager.actor() && BattleManager.actor().canAction();
    };

    var _AltTB_Window_ActorCommand_isCommandEnabled =
         Window_ActorCommand.prototype.isCommandEnabled;
    Window_ActorCommand.prototype.isCommandEnabled = function(index) {
        return BattleManager.actor() && BattleManager.actor().canAction() &&
            _AltTB_Window_ActorCommand_isCommandEnabled.call(this, index);
    };

    Window_ActorCommand.prototype.changeInputWindow = function() {
        this._statusWindow.select(BattleManager.actor().index());
        this.setup(BattleManager.actor());
    };

    Window_ActorCommand.prototype.iconWidth = function(index) {
        return 0;
    };

    Window_ActorCommand.prototype.drawCmdIcon = function(index, x, y) {
        return x + this.iconWidth(index);
    };

    Window_ActorCommand.prototype.nameWidth = function(index, width) {
        width = width || this.contentsWidth();
        return Math.max(width - this.iconWidth(index) - this.costWidth(index), 0);
    };

    Window_ActorCommand.prototype.drawCmdName = function(index, x, y, width) {
        var nw = this.nameWidth(index, width);
        var align = !this.costWidth(index) && !this.iconWidth(index) ? this.itemTextAlign() : 'left';
        this.drawText(this.commandName(index), x, y, nw, align);
        return x + nw;
    };

    Window_ActorCommand.prototype.costWidth = function(index) {
        return this.hasCost(index) ? this.textWidth('0') * FTKR.AltTB.dispApWidthCmd : 0;
    };

    Window_ActorCommand.prototype.drawCmdCost = function(index, x, y) {
        this.changeTextColor(this.textColor(FTKR.AltTB.apCostColor));
        this.drawApCost(this.commandAP(index), x, y, this.costWidth(index));
        this.resetTextColor();
    };

    Window_ActorCommand.prototype.hasCost = function(index) {
        return FTKR.AltTB.enableAP && this.commandAP(index) >= 0 && FTKR.AltTB.dispApWidthCmd > 0;
    };

    Window_ActorCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var x1 = this.drawCmdIcon(index, rect.x, rect.y);
        var x2 = this.drawCmdName(index, x1, rect.y, rect.width);
        if (this.hasCost(index)) {
            this.drawCmdCost(index, x2, rect.y);
        }
    };

    Window_ActorCommand.prototype.commandAP = function(index) {
        if (this.commandSymbol(index) === 'attack') {
            return $dataSkills[this._actor.attackSkillId()].actionPoint;
        } else if (this.commandSymbol(index) === 'guard') {
            return $dataSkills[this._actor.guardSkillId()].actionPoint;
        } else {
            return -1;
        }
    };

    Window_ActorCommand.prototype.cursorRight = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            if ($gameParty.canInputAction() || !FTKR.AltTB.disableChangeActorWPCA) {
                BattleManager.selectNextCommand();
                this.changeInputWindow();
                SoundManager.playCursor();
            } else {
                SoundManager.playBuzzer();
            }
        } else {
            Window_Selectable.prototype.cursorRight.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorLeft = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            if ($gameParty.canInputAction() || !FTKR.AltTB.disableChangeActorWPCA) {
                BattleManager.selectPreviousCommand();
                this.changeInputWindow();
                SoundManager.playCursor();
            } else {
                SoundManager.playBuzzer();
            }
        } else {
            Window_Selectable.prototype.cursorLeft.call(this, wrap);
        }
    };

    //=============================================================================
    // Window_BattleStatus
    //=============================================================================

    var _AltTB_Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function() {
        _AltTB_Window_BattleStatus_initialize.call(this);
        this._windowName = 'Window_BattleStatus';
    };

    var _AltTB_Window_BattleStatus_drawActorName = Window_BattleStatus.prototype.drawActorName;
    Window_BattleStatus.prototype.drawActorName = function(actor, x, y, width) {
        if (FTKR.AltTB.activated) this.changePaintOpacity(actor.canAction());
        if (FTKR.AltTB.showAC) {
            this.drawActorActionCount(actor, x, y, width);
        }
        _AltTB_Window_BattleStatus_drawActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
    };

    var _AltTB_Window_BattleStatus_drawActorFace = Window_BattleStatus.prototype.drawActorFace;
    Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        if (FTKR.AltTB.activated === 2) this.changePaintOpacity(actor.canAction());
        _AltTB_Window_BattleStatus_drawActorFace.call(this, actor, x, y, width, height);
        this.changePaintOpacity(true);
    };

    var _AltTB_Window_BattleStatus_drawCssActorName = Window_BattleStatus.prototype.drawCssActorName;
    Window_BattleStatus.prototype.drawCssActorName = function(actor, x, y, width) {
        if (FTKR.AltTB.activated) this.changePaintOpacity(actor.canAction());
        var line = _AltTB_Window_BattleStatus_drawCssActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
        return line;
    };

    var _AltTB_Window_BattleStatus_drawCssFace = Window_BattleStatus.prototype.drawCssFace;
    Window_BattleStatus.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        _AltTB_Window_BattleStatus_drawCssFace.call(this, actor, dx, dy, width, height);
        if (Imported.FTKR_FAA &&!(!$gameParty.inBattle() || FTKR.FAA.destination !== 1)) {
            var index = actor.index() % this.showActorNum();
            this._faceSprite[index].opacity = this.isEnabledChangePaintOpacity(actor) ?
                255 : this.translucentOpacity();
        }
    };

    Window_BattleStatus.prototype.isEnabledChangePaintOpacity = function(actor) {
        var result = FTKR.AltTB.activated === 2 && actor && actor.canAction() || FTKR.AltTB.activated !== 2;
        if (Imported.FTKR_CSS) {
            result = Window_Base.prototype.isEnabledChangePaintOpacity.call(this, actor) && result;
        }
        return result;
    };

    Window_BattleStatus.prototype.isCursorIndexOnMouse = function() {
        if (!this.isTouchedInsideFrame()) return -1;
        var ih = this.itemHeight() || 36;
        var iw = this.itemWidth() || this.width;
        var index = Math.floor((TouchInput.y - this.y - this.padding) / ih) + this.topRow();
        var x = this.x;
        for(var i = 0; i < this.maxCols(); i++) {
            if (TouchInput.x >= x && TouchInput.x < x + iw + this.spacing()) {
                var col = i;
                break;
            }
            x += iw + this.spacing();
        }
        return Math.min(index * this.maxCols() + col, this.maxItems() - 1);
    };

    Window_Selectable.prototype.isOpenAndDeactive = function() {
        return this.isOpen() && !this.active;
    };

    Window_BattleStatus.prototype.isTouchedInsideDeactive = function() {
        return TouchInput.isTriggered() && this.isTouchedInsideFrame() && this.isOpenAndDeactive();
    };

    Window_BattleStatus.prototype.processTouch = function() {
        if (this.isTouchedInsideDeactive()) {
            var index = this.isCursorIndexOnMouse();
            if (index >= 0 && BattleManager.isTouchedOutsideActorCommandWindow()) {
                if ($gameParty.canInputAction() || !FTKR.AltTB.disableChangeActorWPCA) {
                    this.changeActorOnMouse(index);
                } else {
                    SoundManager.playBuzzer();
                    TouchInput.clear();
                }
            }
        } else {
            Window_Selectable.prototype.processTouch.call(this);
        }
    };

    Window_BattleStatus.prototype.changeActorOnMouse = function(index) {
        BattleManager.setNextCommand(index);
        this.select(BattleManager.actor().index());
        BattleManager._actorCommandWindow.setup(BattleManager.actor());
        SoundManager.playCursor();
        TouchInput.clear();
    };

    //=============================================================================
    // Window_BattleItem
    //=============================================================================

    Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
        var tw = this.apCostWidth();
        var nw = FTKR.AltTB.enableAP ? width - tw : width;
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, nw);
        if (this.isEnabledDispItemAp()) {
            this.drawItemCost(item, x + nw, y);
        }
    };

    //=============================================================================
    // Window_BattleSkill
    //=============================================================================

    Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
        var tw = this.apCostWidth();
        var nw = FTKR.AltTB.enableAP ? width - tw : width;
        Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, nw);
        if (this.isEnabledDispItemAp()) {
            this.drawItemCost(skill, x + nw, y);
        }
    };

    //=============================================================================
    // Window_BattleActionPoint
    //=============================================================================

    Window_BattleActionPoint.prototype = Object.create(Window_Base.prototype);
    Window_BattleActionPoint.prototype.constructor = Window_BattleActionPoint;

    Window_BattleActionPoint.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        y -= height;
        if (!!FTKR.AltTB.layoutAPWindow) {
            x = FTKR.AltTB.layoutAPWindow.positionX;
            y = FTKR.AltTB.layoutAPWindow.positionY;
        }
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        if (!!FTKR.AltTB.layoutAPWindow) {
            this.setBackgroundType(+FTKR.AltTB.layoutAPWindow.background);
        }
        this.refresh();
        this.close();
    };

    Window_BattleActionPoint.prototype.windowWidth = function() {
        return !!FTKR.AltTB.layoutAPWindow ? FTKR.AltTB.layoutAPWindow.width : 120;
    };

    Window_BattleActionPoint.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_BattleActionPoint.prototype.refresh = function() {
        this.contents.clear();
        var width = this.contents.width - this.textPadding() * 2;
        this.drawActionPoint(this.textPadding(), 0, width);
    };

    Window_BattleActionPoint.prototype.open = function() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    //=============================================================================
    // Yanfly YEP_BattleEngineCore.js の対応
    //=============================================================================
    if (Imported.YEP_BattleEngineCore) {
    
    var _YPE_BEC_BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        this._processTurn = true;
        _YPE_BEC_BattleManager_processTurn.call(this);
        this._processTurn = false;
    };

    var _YPE_BEC_BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function() {
        _YPE_BEC_BattleManager_updateTurnEnd.call(this);
        if (this.isTurnBased() && this._spriteset.isPopupPlaying()) return;
        if (this.isTurnBased() && this._enteredEndPhase) return;
        this._enteredEndPhase = true;
        BattleManager.refreshAllMembers();
    };

    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();
                break;
            case 'turnStart':
                this.updateTurnStart();
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'phaseChange':
                this.updatePhase();
                break;
            case 'actionList':
                this.updateActionList()
                break;
            case 'actionTargetList':
                this.updateActionTargetList()
                break;
            case 'actionEnd':
                this.updateActionEnd();
                break;
            case 'confusedActionTurn':
                this.updateConfusedPartyAction();
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    var _YPE_BEC_BattleManager_forceAction = BattleManager.forceAction;
    BattleManager.forceAction = function(battler) {
        if (this._subject) this._subject.clearResult();
        this.createForceActionFailSafes();
        this.savePreForceActionSettings();
        _YPE_BEC_BattleManager_forceAction.call(this, battler);
    };

    var _YPE_BEC_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (this._subject) {
          this._subject.onAllActionsEnd();
        }
        if (this._processingForcedAction) {
        this._subject.removeCurrentAction();
          this._phase = this._preForcePhase;
        }
        this._processingForcedAction = false;
        if (this.loadPreForceActionSettings()) return;
        _YPE_BEC_BattleManager_endAction.call(this);
    };

    Game_System.prototype.initBattleSystem = function() {
        this._battleSystem = 'dtb';
    };

    Scene_Battle.prototype.isStartActorCommand = function() {
        return false
    };

    var _YPE_BEC_Scene_Battle_startPartyCommandSelection =
        Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        if (this.isStartActorCommand()) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        } else {
            _YPE_BEC_Scene_Battle_startPartyCommandSelection.call(this);
        }
    };

    var _YPE_BEC_Scene_Battle_selectNextCommand =
        Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
        _YPE_BEC_Scene_Battle_selectNextCommand.call(this);
        this._helpWindow.clear();
        BattleManager.stopAllSelection();
    };

    }// YEP_BattleEngineCore.js

    //=============================================================================
    //FTKR_CustomSimpleActorStatus.js の対応
    //=============================================================================
    if (Imported.FTKR_CSS) {

    var _AltTB_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'ACTC':
                return this.drawActorActionCount(actor, x, y, width);
            case 'ACTP':
                return this.drawActionPoint(x, y, width);
            default:
                return _AltTB_Window_Base_drawCssActorStatusBase_B.apply(this, arguments);
        }
    };

    }//FTKR_CustomSimpleActorStatus.js


}());//EOF
