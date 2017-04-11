//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// スキル強化システム 本体プラグイン
// FTKR_SkillUpgradeSystem_Core.js
// 作成者     : フトコロ
// 作成日     : 2017/02/06
// 最終更新日 : 2017/03/16
// バージョン : v1.4.0
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_SUS = true;

var FTKR = FTKR || {};
FTKR.SUS = FTKR.SUS || {};

//=============================================================================
/*:
 * @plugindesc v1.4.0 スキル強化システム 本体プラグイン
 * @author フトコロ
 *
 * @param ---Skill Name Format---
 * @default
 *
 * @param Skill Name Format
 * @desc 強化したスキルの表示名を変更します。
 *  %1 - スキル名,  %2 - 強化レベルの合計
 * @default %1(+%2)
 *
 * @param --Max Upgrade Type Num--
 * @default
 *
 * @param Max Upgrade Type Number
 * @desc 強化可能なパラメータの種類を設定します。
 * 上級者向け設定
 * @default 8
 *
 * @param ---Default Param---
 * @default
 *
 * @param Upgrade Default Name
 * @desc 強化項目のデフォルト名を設定します。
 *  %1 - 強化タイプのスキルステータス名
 * @default %1強化
 *
 * @param Upgrade Default Limit
 * @desc 最大強化レベルのデフォルト値を設定します。
 * @default 99
 *
 * @param Upgrade Default Value
 * @desc 強化時の上昇量のデフォルト値を設定します。
 * @default 1
 *
 * @param Upgrade Default Cost Type
 * @desc 強化に必要なコストタイプのデフォルト値を設定します。
 *  1 - gold, 2 - item, 3 - 変数
 * @default 1
 *
 * @param Upgrade Default Cost Id
 * @desc コストタイプをアイテムか変数にした場合のIDを設定します。
 * @default 
 *
 * @param Upgrade Default Cost Value
 * @desc 強化に必要なコスト数量のデフォルト値を設定します。
 * @default 1
 *
 * @param Upgrade Default Icon
 * @desc 強化項目リストに表示するアイコンのデフォルト値を設定します。
 * @default 73
 *
 * @param Upgrade Default Format
 * @desc 強化時のデフォルトの計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default %1+(%2*%3)
 *
 * @param ---Upgrade Type 1---
 * @default
 *
 * @param Upgrade Type 1 Type
 * @desc タイプ1の強化項目のタイプを設定します。
 * @default damages
 *
 * @param Upgrade Type 1 Icon
 * @desc タイプ1の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Limit
 * @desc タイプ1の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Value
 * @desc タイプ1の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Value
 * @desc タイプ1の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Type
 * @desc タイプ1の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Id
 * @desc タイプ1の強化項目のタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Format
 * @desc タイプ1の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 2---
 * @default
 *
 * @param Upgrade Type 2 Type
 * @desc タイプ2の強化項目のタイプを設定します。
 * @default mpCost
 *
 * @param Upgrade Type 2 Icon
 * @desc タイプ2の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Limit
 * @desc タイプ2の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Value
 * @desc タイプ2の強化項目の上昇量を設定します。
 * @default -1
 *
 * @param Upgrade Type 2 Cost Value
 * @desc タイプ2の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 2 Cost Type
 * @desc タイプ2の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Cost Id
 * @desc タイプ2の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Format
 * @desc タイプ2の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 3---
 * @default
 *
 * @param Upgrade Type 3 Type
 * @desc タイプ3の強化項目のタイプを設定します。
 * @default tpCost
 *
 * @param Upgrade Type 3 Icon
 * @desc タイプ3の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Limit
 * @desc タイプ3の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Value
 * @desc タイプ3の強化項目の上昇量を設定します。
 * @default -1
 *
 * @param Upgrade Type 3 Cost Value
 * @desc タイプ3の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 3 Cost Type
 * @desc タイプ3の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Cost Id
 * @desc タイプ3の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Format
 * @desc タイプ3の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 4---
 * @default
 *
 * @param Upgrade Type 4 Type
 * @desc タイプ4の強化項目のタイプを設定します。
 * @default speed
 *
 * @param Upgrade Type 4 Icon
 * @desc タイプ4の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Limit
 * @desc タイプ4の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Value
 * @desc タイプ4の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Value
 * @desc タイプ4の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Type
 * @desc タイプ4の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Id
 * @desc タイプ4の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Format
 * @desc タイプ4の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 5---
 * @default
 *
 * @param Upgrade Type 5 Type
 * @desc タイプ5の強化項目のタイプを設定します。
 * @default tpGain
 *
 * @param Upgrade Type 5 Icon
 * @desc タイプ5の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Limit
 * @desc タイプ5の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Value
 * @desc タイプ5の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Value
 * @desc タイプ5の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Type
 * @desc タイプ5の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Id
 * @desc タイプ5の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Format
 * @desc タイプ5の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 6---
 * @default
 *
 * @param Upgrade Type 6 Type
 * @desc タイプ6の強化項目のタイプを設定します。
 * @default repeats
 *
 * @param Upgrade Type 6 Icon
 * @desc タイプ6の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Limit
 * @desc タイプ6の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Value
 * @desc タイプ6の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Value
 * @desc タイプ6の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Type
 * @desc タイプ6の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Id
 * @desc タイプ6の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Format
 * @desc タイプ6の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 7---
 * @default
 *
 * @param Upgrade Type 7 Type
 * @desc タイプ7の強化項目のタイプを設定します。
 * @default scope
 *
 * @param Upgrade Type 7 Icon
 * @desc タイプ7の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Limit
 * @desc タイプ7の強化項目の最大強化レベルを設定します。
 * @default 1
 *
 * @param Upgrade Type 7 Value
 * @desc タイプ7の強化項目の上昇量を設定します。
 * @default 1
 *
 * @param Upgrade Type 7 Cost Value
 * @desc タイプ7の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 7 Cost Type
 * @desc タイプ7の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Cost Id
 * @desc タイプ7の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Format
 * @desc タイプ7の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default %1+%3
 *
 * @param ---Upgrade Type 8---
 * @default
 *
 * @param Upgrade Type 8 Type
 * @desc タイプ8の強化項目のタイプを設定します。
 * @default effects
 *
 * @param Upgrade Type 8 Icon
 * @desc タイプ8の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Limit
 * @desc タイプ8の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Value
 * @desc タイプ8の強化項目の上昇量を設定します。
 * @default 1
 *
 * @param Upgrade Type 8 Cost Value
 * @desc タイプ8の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 8 Cost Type
 * @desc タイプ8の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Cost Id
 * @desc タイプ8の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Format
 * @desc タイプ8の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 9---
 * @default
 *
 * @param Upgrade Type 9 Type
 * @desc タイプ9の強化項目のタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 9 Icon
 * @desc タイプ9の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 9 Limit
 * @desc タイプ9の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 9 Value
 * @desc タイプ9の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 9 Cost Value
 * @desc タイプ9の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 9 Cost Type
 * @desc タイプ9の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 9 Cost Id
 * @desc タイプ9の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 9 Format
 * @desc タイプ9の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 10---
 * @default
 *
 * @param Upgrade Type 10 Type
 * @desc タイプ10の強化項目のタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 10 Icon
 * @desc タイプ10の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 10 Limit
 * @desc タイプ10の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 10 Value
 * @desc タイプ10の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 10 Cost Value
 * @desc タイプ10の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 10 Cost Type
 * @desc タイプ10の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 10 Cost Id
 * @desc タイプ10の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 10 Format
 * @desc タイプ10の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、習得したスキルの性能を強化する
 * スキル強化システムを利用することができます。
 *
 * スキル強化コマンドを実行することで、スキルのダメージ量や、MP消費量といった
 * スキルの性能を、ゲームの中で変化(強化)させることができます。
 * 
 * スキルの強化は、習得しているスキルの性能自体を変化させます。また、スキルの
 * 強化状態はアクター毎に記録しており、強化できる項目もアクター毎に別のものに
 * することができます。
 * 
 * このため、魔法が得意なキャラのみが強化できる魔法や、ダメージは強化できるが
 * MP消費は強化できないアクター、MP消費は強化できるがダメージは強化できない
 * アクターなど、表現することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください。
 *
 * 2. 本プラグインを動作させるためには、FTKR_SkillExpansion.js(v1.2.x)が
 *    必要です。
 *    本プラグインは、FTKR_SkillExpansion.jsよりも下の位置になるように
 *    追加してください。
 * 
 * 3. FTKR_SkillExpansion.jsのプラグインパラメータ<Make Sep For Each>を
 *    アクター毎にスキルデータを作成する '1' に設定してください。
 * 
 * 4. スキル強化システム画面による強化を行う場合は、別途配布の
 *    FTKR_SkillUpgradeSystem_Window.js(v1.4.x)が必要です。
 *    FTKR_SkillUpgradeSystem_Window.jsと組み合わせる場合は、
 *    本プラグインが上になるように、プラグイン管理に追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ゲーム内でスキルを強化する方法    ☆重要☆
 *-----------------------------------------------------------------------------
 * スキル強化システムをゲーム内で使用するためには、以下の方法があります。
 * 
 * 1. プラグインコマンドによって、指定したスキルを強化できます。
 * 
 *    プラグインコマンド
 *    <SUS Upgrade Actor x1 Skill x2 Type x3 Levelup x4 (dataId x5)>
 *      :スキル強化システムの画面を使用せずに、直接データを変えます。
 *      : x1 - アクターID
 *      : x2 - 強化したいスキルのスキルID
 *      : x3 - 強化したい強化タイプの番号
 *      : x4 - レベルアップさせる回数
 *      :
 *      : ダメージまたは使用効果を強化する場合は、()内の記述が必要です。
 *      : 強化タイプがダメージまたは使用効果ではない場合は、()含めて
 *      : 記述は不要です。
 *      :
 *      : x5 - 強化したいダメージIDまたは使用効果の番号
 *      :      データベースに設定した順に上から0,1,...と数えます
 *      :この方法では、強化するためにコストを消費しません。
 * 
 * 
 * 以降の方法2,3は、FTKR_SkillUpgradeSystem_Window.jsが必要です。
 * 
 * 2. ゲーム内でメニューを開き、メニューの中から「スキル強化」を選択する。
 * 3. プラグインコマンドによって「スキル強化システム」を呼び出す。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインパラメータのデフォルト値について
 *-----------------------------------------------------------------------------
 * プラグインパラメータは、デフォルトの状態でシステムを動作させる
 * ことができます。また、設定が必須のノートタグはありません。
 * 
 * ただし、デフォルトの状態のままでは、システムの動作に必要な
 * 最小限の設定しかしていません。そのため、より良いゲームを
 * 作るためには、設定をそのまま使用することは難しいでしょう。
 * 
 * 以降にシステムのカスタム方法を説明します。
 * プラグインパラメータの変更や、専用のノートタグを使用し、貴方の
 * 好みに合ったスキル強化システムに変更してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 強化タイプと強化パラメータについて    ☆重要☆
 *-----------------------------------------------------------------------------
 * 本プラグインでは、「強化タイプ」と「強化パラメータ」は、以下を
 * 意味します。
 * 
 *   強化タイプ:以下の8種類のスキルパラメータを意味します。(*1)
 *            :先頭の番号は、強化タイプ番号で、ノートタグや
 *            :プラグインコマンド等で指定する値です。
 *      1:'ダメージ(damage)'
 *      2:'MP消費(mpCost)'
 *      3:'TP消費(tpCost)'
 *      4:'速度補正(speed)'
 *      5:'得TP(tpGain)'
 *      6:'連続回数(repeats)'
 *      7:'範囲(scope)'
 *      8:'使用効果(effects)'
 * 
 * (*1) プラグインパラメータのType9,10は拡張用です。
 *      使用する場合には、プラグインの改造が必要です。
 * 
 * 
 *   強化パラメータ  :以下の8種類のパラメータを意味します。
 *      1:'表示アイコン(icon)'
 *      2:'最大強化レベル(Limit)'
 *      3:'上昇量(value)'
 *      4:'コスト数量(cost value)'
 *      5:'コストタイプ(cost type)'
 *      6:'計算式(format)'
 *      7:'禁止設定(notupgrade)'
 *      8:'現在強化レベル(count)' 
 *             
 * 強化タイプ毎に、それぞれ強化パラメータが設けられており、それらは
 * プラグインパラメータや、ノートタグによって設定を変更することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 強化したスキルの名称について    ☆重要☆
 *-----------------------------------------------------------------------------
 * 強化したスキルに対して、現在強化レベルの値をスキル名に付加することができます。
 * 
 * プラグインパラメータの<Skill Name Format>にて、スキル名の表示書式を変更する
 * ことができます。
 * 
 * 表示書式は、%1(+%2)のように指定します。
 * 文字列の中の %1 は スキル名、%2 は 強化レベルの合計 を意味します。
 *
 * 例)スキル名「攻撃」、強化レベルの合計が 3 の場合、 表示は「攻撃(+3)」になります。
 * 
 * なお、このプラグインによって改変したスキル名は、戦闘中やメニュー画面で表示する
 * 場合にも適用されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定値の優先度について    ☆重要☆
 *-----------------------------------------------------------------------------
 * 本プラグインでは、一つの設定値を変更するために、以下の5つの手段を
 * 用意しています。
 * 
 * 1. 全体のデフォルト設定(プラグインパラメータ)
 * 2. 強化タイプ毎のデフォルト設定(プラグインパラメータ)
 * 3. スキルのノートタグによる設定
 * 4. クラスのノートタグによる設定(*1)
 * 5. アクターのノートタグによる設定(*1)
 * 
 * (*1)これらの手段では、設定することができない項目があります。
 * 
 * 複数の手段によって、同種の設定が被った場合には、以下の優先度に
 * 従い、もっとも優先度が高い設定値を適用します。
 * 
 *   優先度大  アクター＞クラス＞スキル＞個別タイプ＞全体  優先度小
 * 
 * 例えば、ダメージ強化の最大LVを、アクターとスキルで別に設定した
 * 場合、アクターの設定が適用されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル強化コストの設定
 *-----------------------------------------------------------------------------
 * 各スキルタイプは、強化に必要なコストを設定することができます。
 * コストに設定できるコストタイプは以下のとおりです。
 * 
 * 1. お金
 * 2. アイテム
 * 3. ゲーム内変数
 * 4. (YEP_JobPoints.jsを使用している場合) JP
 * 5. 武器
 * 6. 防具
 * 
 * 強化タイプ毎に最大で3種類のコストを設定することができます。
 * ただし、プラグインパラメータで設定できる、全体のデフォルトコスト
 * および強化タイプ毎のコストは、どちらも1種類しか設定できません。
 * 
 * コストを3種類設定する場合は、スキルのノートタグで設定してください。
 * 
 * 
 * [使用可能なノートタグ]
 * 
 * 対象：スキル
 * <SUS Upgrade Cost>     :二つのタグの間に記載した内容が設定されます
 * Type x1 TypeName: y1   :  TypeName の記述方法
 * Type x2 TypeName: y2   :    gold      - お金
 * </SUS Upgrade Cost>    :    item[x]   - ID x のアイテム
 *                        :    v[x]      - ID x のゲーム内変数
 *                        :    weapon[x] - ID x の武器
 *                        :    armor[x]  - ID x の防具
 *                        :    JP        - JP(YEP_JobPointsが必要)
 *   x1,x2,..:強化タイプ番号
 *   y1,y2,..:TypeNameの数量を eval値 で設定する
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 *  cnt     - 指定した強化タイプの強化レベルを参照します。
 * 
 * 
 *  例) 以下のように異なる強化タイプのコストも、同時に設定します
 * <SUS Upgrade Cost>
 * Type 1 gold: 100
 * Type 1 item[10]: 1
 * Type 2 v[5]: 5
 * </SUS Upgrade Cost>
 *   上記のノートタグの間の意味は、以下のとおりです。
 *   1行目 - 強化タイプ1のコストの1番目を'100 Gold'にする
 *   2行目 - 強化タイプ1のコストの2番目を'ID10のアイテムを1つ'にする
 *   3行目 - 強化タイプ2のコストの1番目を'ID5の変数の値を5つ'にする
 * 
 * 
 * [表示されるコスト名]
 * 
 * コストは、コスト名と必要数量と合わせて、システム画面内に表示します。
 * その際に表示するコスト名は、ゲーム内で設定した名称です。
 * お金は、データベースのシステムの通貨単位をコスト名として表示します。
 * ゲーム内変数の場合は、変数名をコスト名として表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの強化の最大値について
 *-----------------------------------------------------------------------------
 * スキルの強化レベルは、設定した最大値まで上げることができます。
 * 最大値は、どこまでスキルを強化させるかを決める値ですので、
 * 貴方のゲームデザインをよく考えて、設定値を決めるようにしましょう。
 * 
 * [使用可能なノートタグ]
 * 対象：スキル
 * <SUS Upgrade Type x Limit: y>
 *   x:強化タイプ番号(プラグインパラメータ上の設定番号)
 *   y:強化タイプxの最大レベル
 *  
 *  例)  <SUS Upgrade Type 1 Limit: 10>
 *
 * 
 * 対象：アクター、クラス
 * <SUS Upgrade Skill x Type y Limit: z>
 *   x:スキルID
 *   y:強化タイプ番号(プラグインパラメータ上の設定番号)
 *   z:強化タイプyの最大レベル
 * 
 *  例)  <SUS Upgrade Skill 10 Type 1 Limit: 10>
 * 
 * 
 * 以下のプラグインコマンドにより、指定したスキルの強化レベルの最大値を
 * 変更することができます。
 * 
 *<SUS Set Limit x1 Actor x2 Skill x3 Type x4 (dataId x5)>
 *      :指定したスキルの最大強化レベルを、x1 に変更します。
 *      : x1 - 変更後の最大強化レベル
 *      : x2 - アクターID
 *      : x3 - 強化したスキルのスキルID
 *      : x4 - 強化した強化タイプの番号
 *      : x5 - 強化した使用効果の番号(使用効果欄の上から 0,1,2,...)
 *      :
 *      :強化タイプが使用効果ではない場合は、()含めてx5の記述は不要です。
 *      :なお、現在強化レベル以下に最大強化レベルを変更することはできません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの強化量の計算式について
 *-----------------------------------------------------------------------------
 * スキルの強化は、各手段によって設定した計算式に従って、強化量を計算
 * します。(範囲の強化は除く)
 * 
 * 計算に使われるパラメータは、スキルの「デフォルト値」と
 * 強化パラメータの「上昇量」と「現在強化レベル」の3つです。
 * 
 * スキルのデフォルト値は、ツクールのデータベース上の値のことです。
 * ただし、ダメージについては、デフォルト値を100としています。
 * 
 * 全体のデフォルトで設定されている計算式は、以下のとおりです。
 * 
 *      「強化量」＝「デフォルト値」＋「上昇量」×「現在強化レベル」
 * 
 * ダメージの強化の場合、この強化量がダメージ計算式の値に掛けられます。
 * 
 * 
 * [使用可能なノートタグ]
 * 
 * 対象：スキル
 * <SUS Upgrade Type x Value: y>
 *   x:強化タイプ番号(プラグインパラメータ上の設定番号)
 *   y:強化タイプxの上昇量
 * 
 *  例)  <SUS Upgrade Type 1 Value: 10>
 * 
 * <SUS Upgrade Type x Format: y>
 *   x:強化タイプ番号(プラグインパラメータ上の設定番号)
 *   y:強化タイプxの計算式を記述します。
 *    :使用できる文字列は、'%数字','0～9の数字','+-/*()の演算記号'のみです。
 *    :   %1-デフォルト値、%2-上昇量、%3-強化レベル
 *  
 *  例)  <SUS Upgrade Type 1 Format: %1+%2*%3>
 *
 * 
 * 対象：アクター、クラス
 * <SUS Upgrade Skill x Type y Value: z>
 *   x:スキルID
 *   y:強化タイプ番号(プラグインパラメータ上の設定番号)
 *   z:強化タイプyの上昇量
 * 
 *  例)  <SUS Upgrade Skill 10 Type 1 Value: 10>
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージの強化について
 *-----------------------------------------------------------------------------
 * 「ダメージタイプ」が「なし」以外に設定したスキルは、ダメージ倍率を
 * 強化することができます。なお、ここでいう「ダメージ」は、HPダメージ
 * のみを指すのではなく、MPダメージや、HP回復等も含みます。
 * 
 * また、設定した各ダメージID毎に、別に強化することができます。
 * 
 * なお、ダメージ倍率を格納している'd.rate'のコードを、ダメージ計算式に
 * 記載していない場合、強化しても値は変わりません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * MPおよびTP消費量の強化
 *-----------------------------------------------------------------------------
 * 消費MPおよび消費TPを設定したスキルは、MPおよびTP消費量を強化できます。
 * 
 * ただし、消費MPおよび消費TPが 0 になるまでしか強化できません。
 * デフォルト値と、上昇量と計算式から 消費MPおよび消費TPが 0 を
 * 下回らないように、自動的に最大レベルは調整されます。
 * 
 * 例) 消費MP 10 のスキルに対して、上昇量が 1 で、計算式はデフォルト
 *     の場合、強化LV10 で消費MPが 0 になるため、最大レベルを10以上
 *     に設定していた場合は、自動的に10に調整する。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連続回数の強化
 *-----------------------------------------------------------------------------
 * 連続回数を強化できます。
 * 
 * ただし、連続回数の成功率や、ダメージ量を下げるような設定をしていた場合は
 * ある一定値以上は無意味になるため、強化レベルの最大値には注意してください。
 * 
 * 例) ダメージが連続回数1回毎に10%下がるスキルの場合、11回目で
 *     必ず0ダメージになるため、11回以上に強化できる意味が無い。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 範囲の強化
 *-----------------------------------------------------------------------------
 * スキルの範囲が、全体および使用者以外の場合、範囲を強化できます。
 * 範囲の強化結果は、元の範囲によって異なります。
 * 
 * 
 * [敵単体の場合]
 *  強化すると、敵全体になります。
 *  最大強化レベルは1固定です。
 * 
 * 
 * [味方単体の場合]
 *  強化すると、味方全体になります。
 *  最大強化レベルは1固定です。
 * 
 * 
 * [味方単体(戦闘不能)の場合]
 *  強化すると、味方全体(戦闘不能)になります。
 *  最大強化レベルは1固定です。
 * 
 * 
 * [敵X体ランダムの場合]
 *  強化すると、Xの値が強化量に従い増加します。
 *  強化量は、範囲の強化パラメータの計算式に従います。
 *  4体以上に強化した場合、その数の分、スキル実行を繰り返します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用効果の強化
 *-----------------------------------------------------------------------------
 * 内容に数値を設定する使用効果は強化することができます。
 * 
 * 使用効果を強化するためには、<Set Sep Effect>タグで、value1またはvalue2の値に
 * 強化用のコード'e.rate'を追記する必要があります。
 * e.rate には、各使用効果の強化量を格納しています。
 * 
 * タグの設定例)
 * 使用効果の1番目(使用効果ID 0)に「HP回復」を追加済
 * <Set Sep Effect: 0>
 * Target: user
 * Value1: 0
 * Value2: hpDamage * (0.2 + e.rate * 0.1)
 * </Set Sep Effect>
 *    ⇒これにより、強化することで、Value2の値が変わります。
 *     使用効果の強化設定がデフォルトの場合、Lv1あがる毎に、
 *     回復量がダメージの10%ずつあがります。
 * 
 * [使用できるタグ]
 * 
 * <Set Sus Effect x Rate: y>
 *           :使用効果ID x の強化値の初期値を y にする。
 *           :設定しない場合は、初期値は 0 です。
 * 
 * <Set Sus Effect x Display: y>
 *           :使用効果ID x の強化画面上に表示される内容を y にする。
 *           :設定しない場合は、使用効果名 + e.rate値 です。
 *           :y の文字列に %1 を入れると、その箇所を e.rate に変換します。
 * 
 * 設定例）
 * <Set Sus Effect 0 Display: HP吸収%1%>
 * <Set Sus Effect 0 Rate: 20>
 *           :使用効果ID 0 の強化値の初期値を20に設定して
 *           :強化画面上の表示を「HP吸収20%」に変えます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル実行時の取得TPおよび速度の強化
 *-----------------------------------------------------------------------------
 * スキル実行時の取得TPと速度を強化できます。
 * 
 * 特に注意事項はありません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキル強化禁止の設定
 *-----------------------------------------------------------------------------
 * スキルは、アクターに対して個別に強化させないように設定することが
 * できます。強化禁止はノートタグで設定します。
 * 
 * 強化禁止設定にしたスキルは、スキル選択ウィンドウに表示しません。
 * 
 * 
 * [使用可能なノートタグ]
 * 
 * 対象：スキル
 * <Not Upgrade Skill>   :このノートタグを設定したスキルの強化を
 *                        禁止します。
 * 
 * <Not Upgrade Type: x1,x2,...>
 *                       :このノートタグを設定したスキルの
 *                        強化タイプx1,x2,...を強化禁止します。
 *                        0 を指定した場合、すべての強化タイプを
 *                        禁止します。
 *                        (<Not Upgrade Skill>と同じ意味です)
 * 
 * 対象：アクター、クラス
 * <Not Upgrade>         :このノートタグを設定した場合、すべての
 *                        スキルの強化を禁止します。
 *                        また、スキルメニュー上にも、スキル強化
 *                        コマンドが表示されません。
 * 
 * <Not Upgrade Skilltype: x1,x2,...>
 *                       :このノートタグを設定した場合、指定した
 *                        スキルタイプIDx1,x2,...のスキルをすべて
 *                        強化禁止します。
 * 
 * <Not Upgrade Skill: x1,x2,...>
 *                       :このノートタグを設定した場合、指定した
 *                        スキルIDx1,x2,...のスキルをすべて
 *                        強化禁止します。
 * 
 * 
 * [<Not Upgrade>と<SUS Command Hide>の違い]
 * 
 * これらのタグは、どちらもスキル強化コマンドが非表示になり、そのアクターは
 * スキルの強化をすることができません。
 * 
 * ただし、<SUS Command Hide>の場合は、プラグインコマンド<SUS Show Actor x>
 * により、コマンドを表示させることで、スキルの強化を実行することができます。
 * 
 * <Not Upgrade>の場合は、すべてのスキルが強化できないため、プラグインコマンド
 * <SUS Show Actor x>によるコマンド表示は無効になります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの強化レベルの取得
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドにより、スキルの強化状態を取得し、ゲーム内変数や
 * スイッチに反映させることができます。
 * 
 *<SUS Get Variables x1 Actor x2 Skill x3 Type x4 (dataId x5)>
 *      :指定したスキルの強化レベルを、ゲーム内変数に格納します。
 *      : x1 - 強化レベルを格納する変数ID
 *      : x2 - アクターID
 *      : x3 - 強化したスキルのスキルID
 *      : x4 - 強化した強化タイプの番号
 *      : x5 - 強化したダメージIDまたは使用効果の番号
 *      :
 *      : 強化タイプがダメージまたは使用効果ではない場合は
 *      : ()含めてx5の記述は不要です。
 * 
 * 
 *<SUS Get Switches x1 Counttype x2 Actor x3 Skill x4 Type x5 (dataId x6)>
 *      :指定したスキルの強化レベルと、x2の値を比べて、ゲーム内スイッチに
 *      :結果を格納します。
 *      : x1 - 比較結果を格納するスイッチID
 *      : x2 - 強化レベルと比較するための値
 *      : x3 - アクターID
 *      : x4 - 強化したスキルのスキルID
 *      : x5 - 強化した強化タイプの番号
 *      : x6 - 強化したダメージIDまたは使用効果の番号
 *      : Counttype は比較条件に合わせて、以下の文字を指定してください。
 *      :     CountOver :強化レベルが x2 よりも大きいか
 *      :     CountEqual:強化レベルが x2 と同じか
 *      :     CountUnder:強化レベルが x2 よりも小さいか
 *      :
 *      : 強化タイプがダメージまたは使用効果ではない場合は
 *      : ()含めてx6の記述は不要です。
 * 
 *
 *-----------------------------------------------------------------------------
 * 上級者向けの設定
 *-----------------------------------------------------------------------------
 * 以降は上級者向けです。不用意な変更は、プラグインの動作をおかしくさせる原因に
 * になります。
 * 
 * 1. 強化タイプの種類を変更する
 * 
 *  プラグインパラメータ<Max Upgrade Type Number>の値を変更することで
 *  強化タイプの数をデフォルトの8種類から変えることができます。
 *  
 *  例えば、<Max Upgrade Type Number: 3>とすることで、Type 3 までの
 *  強化タイプを認識します。これは、プラグインの内部で、Type 4 以降の
 *  パラメータが用意されないことを意味します。
 *  
 *  この場合、FTKR_SkillUpgradeSystem_Window.jsを使用して強化画面を開くと
 *  Type 3 までの強化タイプしか表示されません。
 *  
 *  なお、9以上に設定するためには、Type 9 以降の強化タイプの処理をプラグインに
 *  追加する必要があります。(要プラグイン改造)
 * 
 * 
 * 2. 強化タイプの番号を入れ替える
 * 
 *  プラグインパラメータ<Upgrade Type X ***>の内容を、別のType番号と
 *  入れ替えることで、強化タイプの番号を入れ替えることができます。
 *  
 *  例えば、デフォルトでType 1 が「ダメージ」、Type 7 が「範囲」ですが
 *  Type 1 と Type 7 のプラグインパラメータの内容をすべて入れ替えることで
 *  Type 1 が「範囲」、Type 7 が「ダメージ」を意味するようになります。
 *  
 *  この場合、FTKR_SkillUpgradeSystem_Window.jsを使用して強化画面を開くと
 *  「ダメージ」と「範囲」の強化タイプの表示順も入れ替わります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインを使用するに当たって    ☆重要☆
 *-----------------------------------------------------------------------------
 * 1.本プラグインは改変可です。
 *   ただし、一番始めに記載した作成者等の欄は残してください。
 * 
 * 2.本プラグインを使用するに当たって、ゲーム中にライセンス表示することは
 *   必須ではありません。ただ、どこかゲーム外のReadme等にでも記載して頂けると
 *   うれしいです。
 * 
 * 3.本プラグインを使用する、または改変するに当たって、私フトコロに許可を取る
 *   ことや、連絡することは必要ありません。
 * 
 * 4.本プラグインは、有料ゲームに使用することは構いません。
 *   ただし、改変した場合でも、プラグイン単体で販売することは止めてください。
 *   
 * 5.本プラグインは、年齢制限のあるゲームに使用することは構いません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.4.0 - 2017/03/16 : 処理見直し、機能追加
 *    1. FTKR_SEP_ShowSkillStatus.js v1.3.0 に合わせて処理を見直し。
 *    2. 強化コストの値にjs計算式を使用できる機能を追加。
 *    3. 強化コストに武器・防具を追加。
 * 
 * v1.3.0 - 2017/02/24 : 処理見直し、ヘルプ修正
 *    1. FTKR_SkillExpansion.js v1.1.0 に合わせて処理を見直し。
 *    2. ヘルプ修正
 * 
 * v1.2.0 - 2017/02/19 : FTKR_SkillExpansion.jsの適用
 *    1. FTKR_SkillExpansion.jsに合わせて処理を見直し。
 *    2. FTKR_SkillExpansion.jsの仕様に合わせてヘルプの記載内容を修正。
 * 
 * v1.1.1 - 2017/02/19 : 不具合修正
 *    1. 非戦闘時にスキルを使用するとエラーになる不具合を修正
 *    2. 変数の記述見直し
 * 
 * v1.1.0 - 2017/02/15 : 不具合修正、機能追加、プラグインコマンド追加
 *    1. 消費MPと消費TPを強化しても、使用時に消費する値は強化前の値になる
 *       不具合を修正。
 *    2. 強化タイプの種類と、番号を変更する上級者向け設定を追加。
 *    3. 強化タイプの最大レベルを変更するプラグインコマンドを追加。
 *    4. プラグインのバージョン表記を変更。(v1.04は、v1.0.4 とみなす)
 * 
 * v1.04 - 2017/02/12 : プラグインコマンド追加
 *    1. スキル強化レベルをゲーム内変数に代入するプラグインコマンドを追加。
 *    2. 指定した値とスキル強化レベルを比較して結果をゲーム内スイッチに反映する
 *       プラグインコマンドを追加。
 * 
 * v1.03 - 2017/02/12 : 不具合修正
 *    1. アクターが習得していないスキルを使用した場合にエラーになる不具合を修正。
 * 
 * v1.02 - 2017/02/10 : 不具合修正
 *    1. スキルのノートタグ<SUS Upgrade Cost>で、複数の強化タイプのコストを
 *       設定すると、入力した最後の行の強化タイプしか反映されない不具合を修正。
 *    2. スキルのノートタグ<SUS Scope Random>と<SUS Repeats>で設定した値が
 *       スキル強化時に反映されない不具合を修正。
 * 
 * v1.01 - 2017/02/08 : ノートタグ追加、強化できる項目を追加、ファイル分割
 *    1. スキルの連続回数と敵X体ランダムの数を設定できるノートタグを追加した。
 *    2. スキルの使用効果を強化できるように変更した。
 *    3. スキルの使用効果を最大2つまでスキル情報ウィンドウに表示するように変更した。
 *    4. ウィンドウ表示関係の関数や変数を別ファイルに分割した。
 * 
 * v1.00 - 2017/02/06 : 初版作成(102kB)
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//本プラグインはFTKR_SkillExpansion.jsが必要
if (Imported.FTKR_SEP) {

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SUS.parameters = PluginManager.parameters('FTKR_SkillUpgradeSystem_Core');

//スキル名
FTKR.SUS.susSkillNameFormat = String(FTKR.SUS.parameters['Skill Name Format'] || '%1(+%2)');
FTKR.SUS.susUpgradeDefName = String(FTKR.SUS.parameters['Upgrade Default Name'] || '強化');
FTKR.SUS.maxUtypeNum = Number(FTKR.SUS.parameters['Max Upgrade Type Number'] || 8);

//強化項目のデフォルト設定用
FTKR.SUS.utypes = [];
var paramType0 = {
  'type':'default',
  'limit':Number(FTKR.SUS.parameters['Upgrade Default Limit'] || 99),
  'value':Number(FTKR.SUS.parameters['Upgrade Default Value'] || 1),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Default Cost Type'] || 1),
  'cost':String(FTKR.SUS.parameters['Upgrade Default Cost Value'] || 1),
  'cid':Number(FTKR.SUS.parameters['Upgrade Default Cost Id'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Default Icon'] || 73),
  'format':String(FTKR.SUS.parameters['Upgrade Default Calc Format'] || '%1+(%2*%3)')
};
FTKR.SUS.utypes.push(paramType0); 

// Type 1
var paramType1 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 1 Type'] || 'damages'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 1 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 1 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 1 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 1 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 1 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 1 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 1 Format'] || '')
};
FTKR.SUS.utypes.push(paramType1);

// Type 2
var paramType2 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 2 Type'] || 'mpCost'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 2 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 2 Value'] || -1),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 2 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 2 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 2 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 2 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 2 Format'] || '')
};
FTKR.SUS.utypes.push(paramType2);

// Type 3
var paramType3 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 3 Type'] || 'tpCost'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 3 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 3 Value'] || -1),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 3 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 3 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 3 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 3 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 3 Format'] || '')
};
FTKR.SUS.utypes.push(paramType3);

// Type 4
var paramType4 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 4 Type'] || 'spead'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 4 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 4 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 4 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 4 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 4 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 4 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 4 Format'] || '')
};
FTKR.SUS.utypes.push(paramType4);

// Type 5
var paramType5 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 5 Type'] || 'tpGain'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 5 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 5 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 5 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 5 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 5 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 5 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 5 Format'] || '')
};
FTKR.SUS.utypes.push(paramType5);

// Type 6
var paramType6 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 6 Type'] || 'repeats'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 6 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 6 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 6 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 6 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 6 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 6 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 6 Format'] || '')
};
FTKR.SUS.utypes.push(paramType6);

// Type 7
var paramType7 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 7 Type'] || 'scope'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 7 Limit'] || 1),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 7 Value'] || 1),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 7 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 7 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 7 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 7 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 7 Format'] || '')
};
FTKR.SUS.utypes.push(paramType7);

// Type 8
var paramType8 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 8 Type'] || 'effects'),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 8 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 8 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 8 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 8 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 8 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 8 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 8 Format'] || '')
};
FTKR.SUS.utypes.push(paramType8);

// Type 9
var paramType9 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 9 Type'] || ''),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 9 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 9 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 9 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 9 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 9 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 9 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 9 Format'] || '')
};
FTKR.SUS.utypes.push(paramType9);

// Type 10
var paramType10 = {
  'type':String(FTKR.SUS.parameters['Upgrade Type 10 Type'] || ''),
  'limit':Number(FTKR.SUS.parameters['Upgrade Type 10 Limit'] || 0),
  'value':Number(FTKR.SUS.parameters['Upgrade Type 10 Value'] || 0),
  'cost':String(FTKR.SUS.parameters['Upgrade Type 10 Cost Value'] || 0),
  'icon':Number(FTKR.SUS.parameters['Upgrade Type 10 Icon'] || 0),
  'ctype':Number(FTKR.SUS.parameters['Upgrade Type 10 Cost type'] || 0),
  'cid':Number(FTKR.SUS.parameters['Upgrade Type 10 Cost Id'] || 0),
  'format':String(FTKR.SUS.parameters['Upgrade Type 10 Format'] || '')
};
FTKR.SUS.utypes.push(paramType10);

//=============================================================================
// プラグイン 定数
//=============================================================================

Game_BattlerBase.MAX_SUS_UPGRADE_TYPES = 10;

if (FTKR.SUS.maxUtypeNum > Game_BattlerBase.MAX_SUS_UPGRADE_TYPES) {
  FTKR.SUS.maxUtypeNum = Game_BattlerBase.MAX_SUS_UPGRADE_TYPES;
;}

//=============================================================================
// DataManager
//=============================================================================

FTKR.SUS.DatabaseLoaded = false;
FTKR.SUS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.SUS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.SUS.DatabaseLoaded) {
        DataManager.susActorNotetags($dataActors);
        DataManager.susActorNotetags($dataClasses);
        DataManager.susSkillNotetags($dataSkills);
        DataManager.susHideNotetags($dataActors);
        DataManager.susHideNotetags($dataClasses);
        FTKR.SUS.DatabaseLoaded = true;
    }
    return true;
};

DataManager.susActorNotetags = function(group) {
  var note1 = /<(?:NOT UPGRADE)>/i;
  var note2 = /<(?:NOT UPGRADE SKILLTYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:NOT UPGRADE SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(?:SUS UPGRADE SKILL)[ ](\d+)[ ](?:TYPE)[ ](\d+)[ ](?:LIMIT):[ ]*(\d+)>/i;
  var note5 = /<(?:SUS UPGRADE SKILL)[ ](\d+)[ ](?:TYPE)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.susNotUpgrade = false;
    obj.susNotUpgradeSkillType = [];
    obj.susNotUpgradeSkill = [];
    obj.susUpgradeLimit  = [];
    obj.susUpgradeValue = [];

    for (var t = 0; t < $dataSystem.skillTypes.length; t++) {
      obj.susNotUpgradeSkillType[t] = false; 
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.susNotUpgrade = true;
      } else if (line.match(note2)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(stype) {
        obj.susNotUpgradeSkillType[stype] = true;
        });
      } else if (line.match(note3)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(skill) {
        obj.susNotUpgradeSkill.push(skill);
        });
      } else if (line.match(note4)) {
        var skill = Number(RegExp.$1);
        var type  = Number(RegExp.$2);
        var limit = Number(RegExp.$3);
        obj.susUpgradeLimit.push({'skillId':skill, 'typeId':type, 'value':limit});
      } else if (line.match(note5)) {
        var skill = Number(RegExp.$1);
        var type  = Number(RegExp.$2);
        var value = Number(RegExp.$3);
        obj.susUpgradeValue.push({'skillId':skill, 'typeId':type, 'value':value});
      }
    }
  }
};

DataManager.susSkillNotetags = function(group) {
  var note1 = /<(?:NOT UPGRADE SKILL)>/i;
  var note2 = /<(?:NOT UPGRADE TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:LIMIT):[ ]*(\d+)>/i;
  var note4 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;
  var note5 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:FORMAT):[ ]*(.+)>/i;
  var note7a = /<(?:SUS UPGRADE COST)>/i;
  var note7b = /<\/(?:SUS UPGRADE COST)>/i;
  var note10 = /<(?:SUS SHOW SWITCH)[ ](\d+)[ ](?:TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 = /<(?:SET SUS EFFECT)[ ](\d+)[ ](?:RATE):[ ]*(\d+)>/i;
  var note8 = /<(?:SET SUS EFFECT)[ ](\d+)[ ](?:DISPLAY):[ ]*(.+)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var CustomMode = 'none';
    obj.susNotUpgrade = [];
    obj.susUpgradeLimit  = [];
    obj.susUpgradeValue = [];
    obj.susUpgradeFormat = [];
    obj.susUpgradeCost = '';
    obj.susShowSwitch = [];

    for (var t = 0; t < FTKR.SUS.maxUtypeNum + 1; t++) {
      obj.susNotUpgrade[t] = false; 
      obj.susShowSwitch[t] = 0;
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.susNotUpgrade[0] = true;
      } else if (line.match(note2)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(type) {
          obj.susNotUpgrade[type] = true;
        });
      } else if (line.match(note3)) {
        var type  = Number(RegExp.$1);
        var limit = Number(RegExp.$2);
        obj.susUpgradeLimit[type] = limit;
      } else if (line.match(note4)) {
        var type  = Number(RegExp.$1);
        var value = Number(RegExp.$2);
        obj.susUpgradeValue[type] = value;
      } else if (line.match(note5)) {
        var type  = Number(RegExp.$1);
        var fmt = String(RegExp.$2);
        obj.susUpgradeFormat[type] = fmt;
      } else if (line.match(note6)) {
        var dataId  = Number(RegExp.$1);
        var rate = Number(RegExp.$2);
        obj.effects[dataId].rate = rate;
      } else if (line.match(note8)) {
        var dataId  = Number(RegExp.$1);
        var display = String(RegExp.$2);
        obj.effects[dataId].display = display;
      } else if (line.match(note7a)) {
        var type  = Number(RegExp.$1);
        CustomMode = 'cost';
      } else if (line.match(note7b)) {
        CustomMode = 'none';
      } else if (CustomMode === 'cost') {
        obj.susUpgradeCost = obj.susUpgradeCost + line + ';';
      } else if (line.match(note10)) {
        var swId = Number(RegExp.$1);
        var types = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        types.forEach( function(type) {
          obj.susShowSwitch[type] = swId;
        });
      }
    }
  }
};

DataManager.susHideNotetags = function(group) {
  var note = /<(?:SUS COMMAND HIDE)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.susHide = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note)) obj.susHide = true;
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.SUS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  FTKR.SUS.Game_Actor_initMembers.call(this);
  this._udatas = [];
};

Game_Actor.prototype.isSusHide = function() {
  return this.actor().susHide || this.currentClass().susHide ? true : false;
};

Game_Actor.prototype.isRateEffects = function(code) {
  switch (code) {
    case Game_Action.EFFECT_ADD_STATE:
    case Game_Action.EFFECT_REMOVE_STATE:
    case Game_Action.EFFECT_RECOVER_HP:
    case Game_Action.EFFECT_RECOVER_MP:
      return true;
  }
  return false;
};

Game_Actor.prototype.isTurnEffects = function(code) {
  switch (code) {
    case Game_Action.EFFECT_ADD_BUFF:
    case Game_Action.EFFECT_ADD_DEBUFF:
      return true;
  }
  return false;
};

Game_Actor.prototype.isUpgradeEffects = function(code) {
  return this.isRateEffects(code) || this.isTurnEffects(code) ||
    code === Game_Action.EFFECT_GAIN_TP;
};

Game_Actor.prototype.isUpgradeTypes  = function(typename) {
  switch (typename) {
    case 'damages':
      return 1;
    case 'mpCost':
    case 'tpCost':
    case 'speed':
    case 'tpGain':
    case 'repeats':
      return 2;
    case 'scope':
      return 3;
    case 'effects':
      return 4;
    case 'default':
      return 0;
  }
  return undefined;
};

Game_Actor.prototype.isUtypeName = function(typeId) {
  return FTKR.SUS.utypes[typeId].type;
};

Game_Actor.prototype.isHideSkillStatus = function(typeId, sepSkill, effectNum, dataId) {
  return (this.matchUtype(typeId, 'damages') && !sepSkill.damages[dataId].type) ||
         (this.matchUtype(typeId, 'effects') &&
         (!effectNum || !this.isUpgradeEffects(sepSkill.effects[dataId].code)));
};

Game_Actor.prototype.isEnabledSusUpgrade = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  return udata ? !this.isNotUpgrade(udata): false;
};

Game_Actor.prototype.isNotUpgrade = function(udata) {
  return udata.notupgrade;
};

Game_Actor.prototype.isUpgradeLimit = function(udata) {
  return udata.limit <= udata.count;
};

Game_Actor.prototype.isSusShowSwitchOn = function(udata) {
  return udata.sw ? $gameSwitches.value(udata.sw) : true;
};

Game_Actor.prototype.canSusUpgrade = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  return this.canPayUpgradeCost(udata) && !this.isUpgradeLimit(udata);
};

FTKR.SUS.Game_Actor_isPayCostNg = Game_Actor.prototype.isPayCostNg;
Game_Actor.prototype.isPayCostNg = function(cost) {
    switch (cost.type) {
        case 'jp': return this.jp(this._classId) < this.evalCostValue(cost);
    }
    return FTKR.SUS.Game_Actor_isPayCostNg.call(this, cost);
};

Game_Actor.prototype.canPayUpgradeCost = function(udata) {
  return !udata.cost.filter( function(cost) {
    return this.isPayCostNg(cost);
  },this).length;
};

// 'damages'等の文字列から、該当するtypeIdを取得
Game_Actor.prototype.getSusTypeId = function(typename) {
  if (!typename) return false;
  for(var t = 1; t < FTKR.SUS.maxUtypeNum + 1 ; t++) {
    if (FTKR.SUS.utypes[t].type === typename) return t;
  }
};

// udataを取得
Game_Actor.prototype.getSusUdata = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  if(!sepSkill) return  undefined;
  if(!dataId) dataId = 0;
  if (typeId === 0) return sepSkill.udata[0];
  var udatas = sepSkill.udata.filter(function(type) {
    return type.id === typeId;
  });
  return udatas ? udatas[dataId] : undefined;
};

// skillIdと強化タイプ名('damages'等)から、該当するスキルの強化値(uparam)を取得
Game_Actor.prototype.getSusUparam = function(skillId, typename, dataId) {
  var skill = $dataSkills[skillId];
  if (!this.isUpgradeTypes(typename)) return undefined;
  if (typename === 'scope' && (skill.scope === 1 || skill.scope > 6)) {
    return this.getSusScope(skillId);
  } else {
    return this.getSusUparamBase(skillId, typename, -1, dataId);
  }
};

Game_Actor.prototype.getSusUparamBase = function(skillId, typename, ucount, dataId) {
  var skill = $dataSkills[skillId];
  if (!skill) return undefined;
  var udata = this.getSusUdata(skillId, this.getSusTypeId(typename), dataId);
  if (!udata) return undefined;
  ucount = ucount < 0 ? udata.count : ucount;
  var fmt = udata.format;
  var uvalue = udata.value;
  var result = eval(fmt.format(this.getUbasevalue(skill, typename, dataId), uvalue, ucount));
  return result;
};

Game_Actor.prototype.getUbasevalue = function(skill, type, dataId) {
  if (type === 'effects') {
    return skill.effects[dataId].rate;
  } else if (type === 'damages') {
    return skill.damages[dataId].rate;
  } else if (type === 'scope') {
    return Math.max(skill.scoperandom || skill.scope - 2);
  } else if (type === 'repeats') {
    return Math.max(skill.sepRepeats.count || skill.repeats);
  } else {
    return skill[type];
  }
};

Game_Actor.prototype.getSusScope = function(skillId) {
  var scope = $dataSkills[skillId].scope;
  var typeId = this.getSusTypeId('scope');
  var udata = this.getSusUdata(skillId, typeId);
  return udata ? this.getSusScopeBase(scope, udata.count) : false;
};

Game_Actor.prototype.getSusScopeBase = function(scope, value) {
  switch (scope) {
    case 1:
    case 7:
    case 9:
      return value ? scope + 1 : scope;
    case 3:
    case 4:
    case 5:
    case 6:
      return scope + value > 6 ? 2 : scope + value;
  }
  return scope;
};

Game_Actor.prototype.setUcost = function(type, id, value, count) {
  return {'type':type, 'id':id, 'value':value, 'count':count};
};

Game_Actor.prototype.getSusSkillNotetagsCost = function(skill, typeId) {
  var results = [];
  var type = false;
  var readCost = false;
  var costdata = skill.susUpgradeCost;
  if (costdata) {
    var case1 = /(?:Type)[ ](\d+)[ ](?:gold):[ ]*(.+)/i;
    var case2 = /(?:Type)[ ](\d+)[ ](?:item\[)(\d+)\]:[ ]*(.+)/i;
    var case2a = /(?:Type)[ ](\d+)[ ](?:weapon\[)(\d+)\]:[ ]*(.+)/i;
    var case2b = /(?:Type)[ ](\d+)[ ](?:armor\[)(\d+)\]:[ ]*(.+)/i;
    var case3 = /(?:Type)[ ](\d+)[ ](?:v\[)(\d+)\]:[ ]*(.+)/i;
    var case4 = /(?:Type)[ ](\d+)[ ](?:JP):[ ]*(.+)/i;

    var costs = costdata.split(';');
    for (var i = 0; i < costs.length; i++) {
      var cost = costs[i];
      if(cost.match(case1)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('gold', 0, String(RegExp.$2), 0));
        }
      } else if(cost.match(case2)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('item', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case2a)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('weapon', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case2b)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('armor', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case3)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('var', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case4)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('jp', 0, String(RegExp.$2), 0));
        }
      }
    }
    return readCost ? results : false;
  }
};

//sepSkillに強化用のパラメータ(udata)を追加
FTKR.SUS.Game_Actor_makeSepSkill = Game_Actor.prototype.makeSepSkill;
Game_Actor.prototype.makeSepSkill = function(skillId) {
  FTKR.SUS.Game_Actor_makeSepSkill.call(this, skillId);
  var sepSkill = this.sepSkill(skillId);
  var index = this.makeSusUdata(skillId);
  sepSkill.udata = this._udatas[index];
};

// udataの中身(_udatas[index][typeId])を作成し、this._udatas[index]のindexを返す
Game_Actor.prototype.makeSusUdata = function(skillId) {
  var udatas = [];
  for(var t = 0; t < FTKR.SUS.maxUtypeNum + 1 ; t++) {
    var flag = this.isUpgradeTypes(this.isUtypeName(t));
    if (flag === 'undefined') continue;
    udatas = udatas.concat(this.setSusUdata(skillId, t));
  }
  this._udatas.push(udatas);
  return this._udatas.length - 1;
};

Game_Actor.prototype.setSusUdata = function(skillId, typeId) {
  if (this.matchUtype(typeId, 'damages')) {
    var udatas = [];
    var damages = $dataSkills[skillId].damages;
    var len = damages.length ? damages.length : 1; 
    for (var i = 0; i < len; i++) {
      var udata = this.setSusUdataBase(skillId, typeId);
      if (!damages[i]) udata.notupgrade = true;
      udatas.push(udata);
    }
    return udatas;
  } else if (this.matchUtype(typeId, 'effects')) {
    var udatas = [];
    var effects = $dataSkills[skillId].effects;
    var len = effects.length ? effects.length : 1; 
    for (var i = 0; i < len; i++) {
      var udata = this.setSusUdataBase(skillId, typeId);
      if (!effects[i]) {
        udata.notupgrade = true;
      } else if (!this.isUpgradeEffects(effects[i].code)) {
        udata.notupgrade = true;
      }
      udatas.push(udata);
    }
    return udatas;
  } else {
    return this.setSusUdataBase(skillId, typeId);
  }
};

Game_Actor.prototype.setSusUdataBase = function(skillId, typeId, uflag) {
  var value = this.setUpgradeSkillValue(skillId, typeId);
  var limit = this.setUpgradeSkillLimit(skillId, typeId, value);
  var udata = {
    'id':typeId,
    'count':0,
    'value':value,
    'limit':limit,
    'notupgrade':this.setNotUpgradeSkill(skillId, typeId, limit),
    'cost':this.setUpgradeSkillCost(skillId, typeId),
    'format':this.setUpgradeSkillFormat(skillId, typeId),
    'sw':this.setShowSwitch(skillId, typeId)
  };
  return udata;
};

Game_Actor.prototype.setUpgradeSkillBase = function(lists, skillId, typeId) {
  for (var i in lists) {
    var list = lists[i];
    if (list.skillId == skillId && list.typeId == typeId) return list.value;
  }
  return NaN;
};

Game_Actor.prototype.setUpgradeSkillValue = function(skillId, typeId) {
  var result = this.setUpgradeSkillBase(this.actor().susUpgradeValue, skillId, typeId);
  if (result) return result;
  result = this.setUpgradeSkillBase(this.currentClass().susUpgradeValue, skillId, typeId);
  if (result) return result;
  result = $dataSkills[skillId].susUpgradeValue[typeId];
  if (result) return result;
  result = FTKR.SUS.utypes[typeId].value;
  return result ? result : FTKR.SUS.utypes[0].value;
};

Game_Actor.prototype.setUpgradeSkillLimitBase = function(skillId, typeId) {
  var result = this.setUpgradeSkillBase(this.actor().susUpgradeLimit, skillId, typeId);
  if (result > 0) return result;
  result = this.setUpgradeSkillBase(this.currentClass().susUpgradeLimit, skillId, typeId);
  if (result > 0) return result;
  result = $dataSkills[skillId].susUpgradeLimit[typeId];
  if (result > 0) return result;
  result = FTKR.SUS.utypes[typeId].limit;
  return result > 0 ? result : FTKR.SUS.utypes[0].limit;
};

Game_Actor.prototype.setUpgradeSkillLimit = function(skillId, typeId, value) {
  var limit = this.setUpgradeSkillLimitBase(skillId, typeId);
  var skill = $dataSkills[skillId];
  if (this.matchUtype(typeId, 'damages')&& !skill.damages[0].type) {
    limit = 0;
  } else if (this.matchUtype(typeId, 'mpCost')) {
    var defMpCost = skill.mpCost;
    if (defMpCost < Math.abs(limit * value)) limit = Math.ceil(defMpCost / Math.abs(value));
  } else if (this.matchUtype(typeId, 'tpCost')) {
    var defTpCost = skill.tpCost;
    if (defTpCost < Math.abs(limit * value)) limit = Math.ceil(defTpCost / Math.abs(value));
  } else if (this.matchUtype(typeId, 'scope')) {
    if ([1,7,9].contains(skill.scope)) { limit = 1; }
    else if ([3,4,5,6].contains(skill.scope)) { return limit; }
    else { limit = 0; }
  } else if (this.matchUtype(typeId, 'effects') && !skill.effects[0]) {
    limit = 0;
  }
  return limit;
};

Game_Actor.prototype.setNotUpgradeSkill = function(skillId, typeId, limit) {
  if (limit === 0) return true;
  var skill = $dataSkills[skillId];
  return (this.actor().susNotUpgrade ||
    this.actor().susNotUpgradeSkillType[skill.stypeId] ||
    !this.actor().susNotUpgradeSkill.indexOf(skillId) ||
    this.currentClass().susNotUpgrade || 
    this.currentClass().susNotUpgradeSkillType[skill.stypeId] ||
    !this.currentClass().susNotUpgradeSkill.indexOf(skillId) ||
    skill.susNotUpgrade[typeId] ) ? true : false;
};

Game_Actor.prototype.setShowSwitch = function(skillId, typeId) {
  return $dataSkills[skillId].susShowSwitch[typeId];
};

Game_Actor.prototype.setUpgradeSkillCost = function(skillId, typeId) {
  var results = [];
  var result = {};
  var skill = $dataSkills[skillId];
  results = this.getSusSkillNotetagsCost(skill, typeId);
  if (results) return results;
  var utype = FTKR.SUS.utypes[typeId];
  if (utype) {
    results = [];
    result = {value:utype.cost, type:this.convertCtype(utype.ctype), id:utype.cid, count:0};
    if (result.value && result.type) {
      results.push(result);
      return results;
    }
  }
  var utype0 = FTKR.SUS.utypes[0];
  if (!utype0) return false;
  result = {value:utype0.cost, type:this.convertCtype(utype0.ctype), id:utype0.cid, count:0};
  results.push(result);
  return results;
};

Game_Actor.prototype.convertCtype = function(ctype) {
    switch (ctype) {
      case 1: return 'gold';
      case 2: return 'item';
      case 3: return 'var';
      case 4: return 'jp';
      case 5: return 'weapon';
      case 6: return 'armor';
      default: return '';
    };
};

Game_Actor.prototype.setUpgradeSkillFormat = function(skillId, typeId) {
  var fmt = $dataSkills[skillId].susUpgradeFormat[typeId];
  if (fmt) return fmt;
  fmt = FTKR.SUS.utypes[typeId].format;
  return fmt ? fmt : FTKR.SUS.utypes[0].format;
};

Game_Actor.prototype.upgradeSepSkill = function(skillId, typeId, dataId) {
  this.payUpgradeCost(skillId, typeId, dataId);
  return this.susUpgradeSepSkill(skillId, typeId, dataId);
};

Game_Actor.prototype.susUpgradeSepSkill = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  udata.count += 1;
  udata.cost.forEach( function(cost, i) {
      udata.cost[i].count += 1;
  });
  var type = FTKR.SUS.utypes[typeId].type;
  var value = this.getSusUparam(skillId, type, dataId);
  this.setUpgradeParam(sepSkill, type, value, dataId);
  var fmt = FTKR.SUS.susSkillNameFormat;
  sepSkill.name = fmt.format($dataSkills[skillId].name, this.getSusTotalCount(sepSkill));
  return true;
};

Game_Actor.prototype.getSusTotalCount = function(sepSkill) {
  var totalcount = 0;
  sepSkill.udata.forEach( function(udata) {
    totalcount += udata.count;
  });
  return totalcount;
};

Game_Actor.prototype.setUpgradeParam = function(sepSkill, typename, value, dataId) {
  if (typename == 'damages') {
    sepSkill.damages[dataId].rate = value;
  } else if (typename === 'scope' && sepSkill.scoperandom){
    sepSkill.scoperandom = value;
  } else if (typename === 'effects') {
    sepSkill.effects[dataId].rate = value;
  } else if (typename === 'repeats') {
    sepSkill.sepRepeats.count = value;
  } else {
    sepSkill[typename] = value;
  }
};

//書き換え
Game_Actor.prototype.sepSkillsCount = function(cost) {
    return cost.count;
};

FTKR.SUS.Game_Actor_paySepCost = Game_Actor.prototype.paySepCost;
Game_Actor.prototype.paySepCost = function(cost) {
    switch (cost.type) {
        case 'jp': return this.gainJp(-this.evalCostValue(cost), this._classId);
    }
    return FTKR.SUS.Game_Actor_paySepCost.call(this,cost);
};

Game_Actor.prototype.payUpgradeCost = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  udata.cost.forEach( function(cost){
    return this.paySepCost(cost);
  },this);
  return true;
};

Game_Actor.prototype.matchUtype = function(typeId, typename) {
  return typeId === this.getSusTypeId(typename);
}

//=============================================================================
// Game_Interpreter
//=============================================================================

var _SUS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  _SUS_Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SUS') {
    switch (args[0]) {
      // システム画面上ではなく、直接プラグインコマンドで強化する。
      case 'Upgrade':
      case 'UPGRADE':
        if (args[1] === 'Actor' && args[3] === 'Skill' && args[5] === 'Type' && args[7] === 'Levelup') {
          if ($gameActors.actor(args[2]) && Number(args[8]) > 0) {
            var actor = $gameActors.actor(args[2]);
            var dataId = 0;
            if (args[9] === 'dataId') dataId = Number(args[10]);
            for (var i = 0; i < Number(args[8]); i++) {
              actor.susUpgradeSepSkill(Number(args[4]), Number(args[6]), dataId);
            }
          }
        }
        break;
      // 指定した強化タイプの最大レベルを変更する。
      case 'Set':
      case 'SET':
        if (args[1] === 'Limit' && Number(args[2]) >= 0) {
          if (args[3] === 'Actor' && args[5] === 'Skill' && args[7] === 'Type') {
            var udata = this.getSusUdata(args[4], args[6], args[8], args[9], args[10]);
            if (!udata) return false;
            udata.limit = Number(args[2]) >= udata.count ? Number(args[2]) : false;
          }
        }
        break;
      case 'Get':
      case 'GET':
        // 指定の変数に、アクター、スキル、強化タイプを指定して強化回数を代入する
        if (args[1] === 'Variables' && Number(args[2]) > 0) {
          if (args[3] === 'Actor' && args[5] === 'Skill' && args[7] === 'Type') {
            var udata = this.getSusUdata(args[4], args[6], args[8], args[9], args[10]);
            if (!udata) return false;
            $gameVariables.setValue(Number(args[2]), udata.count);
          }
        // 指定のスイッチを、アクター、スキル、強化タイプの強化回数が指定の値と比べてどうか判定して、結果を代入する
        } else if (args[1] === 'Switches' && Number(args[2]) > 0　) {
          if (args[5] === 'Actor' && args[7] === 'Skill' && args[9] === 'Type') {
            var udata = this.getSusUdata(args[6], args[8], args[10], args[11], args[12]);
            if (!udata) return false;
            if (args[3] === 'CountOver') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) < udata.count);
            } else if (args[3] === 'CountUnder') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) > udata.count);
            } else if (args[3] === 'CountEqual') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) == udata.count);
            }
          }
        }
    }
  }
};

Game_Interpreter.prototype.getSusUdata = function(Actor, SkillId, TypeId, Effect, dataId) {
  var actor = $gameActors.actor(Number(Actor));
  if (!actor) return false;
  var skillId = Number(SkillId);
  var typeId = Number(TypeId);
  if (!actor.sepSkill(SkillId)) return false;
  var dataId = Effect === 'dataId' ? Number(dataId) : 0;
  var udata = actor.getSusUdata(skillId, typeId, dataId);
  return udata ? udata : false;
};

};//FTKR_SkillUpgradeSystem END

