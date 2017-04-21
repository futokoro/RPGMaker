//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// スキル拡張プラグイン
// FTKR_SkillExpansion.js
// 作成者     : フトコロ
// 作成日     : 2017/02/18
// 最終更新日 : 2017/04/09
// バージョン : v1.3.3
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_SEP = true;

var FTKR = FTKR || {};
FTKR.SEP = FTKR.SEP || {};

//=============================================================================
/*:
 * @plugindesc v1.3.3 スキル拡張プラグイン
 * @author フトコロ
 *
 * @param Elements Damage Calc
 * @desc 複数属性に対するダメージ計算方法
 * 0 - 最大, 1 - 平均, 2 - 累積, 3 - 最小
 * @default 0
 *
 * @param Critical For Each
 * @desc ダメージID毎にクリティカル判定を行うか
 * 0 - 判定しない, 1 - 判定する
 * @default 0
 *
 * @param Make Sep For Each
 * @desc スキル習得時に個別データを作成するか
 * 0 - 作成しない, 1 - 作成する
 * @default 0
 *
 * @param Enabled Repeat Failure
 * @desc 連続攻撃時に途中で失敗すると攻撃をやめるか
 * 0 - 攻撃をやめない, 1 - 攻撃をやめる
 * @default 0
 *
 * @param AutoAddition Damage Rate
 * @desc ダメージ倍率をダメージ計算式に入力不要にするか
 * 0 - 入力要, 1 - 入力不要
 * @default 0
 *
 * @param --- Default Param ---
 * @desc 
 * 
 * @param Damage Rate
 * @desc デフォルトのダメージ倍率(%)
 * @default 100
 *
 * @param Critical Rate
 * @desc デフォルトのクリティカルダメージ倍率(%)
 * @default 300
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、スキルの仕様を拡張し、より詳細に設定することが
 * できるようになります。
 * 
 * 主に以下の項目について、仕様を変更しています。
 * 
 * 1. スキルによって与えるダメージを、以下の仕様に変更します。
 *    [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...
 *    各ダメージIDのダメージは、それぞれ、別の設定値を持ち、別に計算します。
 * 
 * 2. 使用効果の対象を自由に変更できるようになり、また値に数値以外を
 *    設定することができます。
 * 
 * 3. 複数回攻撃するスキルの場合、攻撃毎にスキルの成功率やダメージを変更
 *    できます。
 * 
 * 4. スキルの使用条件に武器以外の条件を追加できます。
 * 
 * 5. スキルの消費コストに数値以外を設定することができます。
 *    また、消費コストにHPを設定できます。
 * 
 * 6. スキルの説明文を、条件によって異なる内容を表示させることができます。
 * 
 * 7. 複数属性に対するダメージの計算方法を変更することができます。
 * 
 * 
 * また、別途配布のFTKR_SEP_ShowSkillStatus.jsと組み合わせることで
 * スキルメニューに設定したスキルのパラメータを表示させることができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. FTKR_ItemSelfVariables.js と併用する場合は、本プラグインは、
 *    FTKR_ItemSelfVariables.jsよりも下の位置になるように追加してください。
 * 
 * 
 * <他プラグインとの競合について>
 * 1. YEP_BattleEngineCore.js と組み合わせて使用する場合は
 *    本プラグインを、YEP_BattleEngineCore.jsよりも上に配置してください。
 * 
 * <セーブデータについて>
 * 本プラグインを適用する場合は、テストプレイ含めて必ず新規データで
 * ゲームを開始してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ダメージの設定
 *-----------------------------------------------------------------------------
 * 本プラグインを適用することで、スキルによって与えるダメージを、以下の仕様に
 * 変更します。
 * 
 *  [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...
 * 
 * ダメージID毎に、攻撃と防御によるダメージ計算を行い、その結果の合計値を
 * 最終的なダメージとして相手に与えます。
 * 
 * 例えば、「複数の属性を持ち、かつ属性毎に与えるダメージが異なるスキル」や
 * 「物理ダメージと魔法ダメージを併せ持つスキル」などを作ることができます。
 * 
 * スキルに以下のノートタグを追記することで、各ダメージIDを設定できます。
 * ダメージID毎にスキルIDを設定することで、そのスキルIDの属性、ダメージ計算式、
 * 命中タイプ、ダメージタイプを元に各ダメージIDのダメージ計算を行います。
 * また、そのスキルIDの使用効果や得TPについても、ダメージとともに発生します。
 * ダメージID0 は、ベースとなるスキルのデータベース上の設定が反映されます。
 * 
 * **********************************************************************
 * 注意：ダメージIDを追加する場合は、必ずID1 から順番に追加してください。
 * **********************************************************************
 * 
 * <Set Sep Damage: x>      :ダメージId x に対して code部で記述した設定を
 * code                     :反映します。
 * </Set Sep Damage>
 * 
 * [code に使用できる項目]
 * SkillId: y               :スキルID y のスキル設定をコピーします。
 *                          :基本的に、このコードを使って、各ダメージIDの
 *                          :設定を作成します。
 * 
 * ElementId: y1,y2,...     :属性ID y1,y2,...で指定した属性を追加します。
 * DamageRate: y           :ダメージ倍率を y (%)に変更します。
 * CriticalRate: y         :クリティカルのダメージ倍率を y (%)に変更します。
 * 
 * Trait Elements: type1,type2,...
 *                          :type で指定した対象の特長欄の属性を追加します。
 *                          :type で指定できる対象は、Actor,Class,Weapon,
 *                          :Armor,States です。
 * 
 * Enabled: eval            :対象のダメージID を eval で設定した条件で有効に
 *                          :します。設定しない場合は、常に有効です。
 *                          :ダメージID 0 に対しては設定できません。
 *                          :有効になっていない場合は、ダメージに反映しません。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 入力例）
 * ダメージID1 として、使用者のレベルが11以上かつスイッチID1がONの時に、
 * スキルID10のスキルのダメージを追加します。
 * ダメージ倍率は50%、クリティカルダメージは400%に変更します。
 * 属性や命中タイプ、計算式等は、スキルID10のものを使用します。
 * <Set Sep Damage: 1>
 * SkillId: 10
 * DamageRate: 50
 * CriticalRate: 400
 * Enabled: a.level > 10 && s[1]
 * </Set Sep Damage>
 * 
 * 
 * [プラグインパラメータの設定項目]
 * <Critical For Each>
 *    :クリティカルの判定を、ダメージID0 の最初の1回だけにするか、
 *    :それともダメージID毎に判定するか選べます。
 * 
 * <AutoAddition Damage Rate>
 *    :ダメージ倍率のコードを、ダメージ計算式に記入しなくても自動で計算する
 *    :かどうか設定できます。
 *    :入力不要にした場合、ダメージ計算式の結果に対して、ダメージ倍率を
 *    :積算します。
 *    :なお、入力不要にした場合でも、ダメージ倍率のコードを計算式に記入すると
 *    :2重に計算します。
 * 
 * <Default Rate>
 *    :デフォルトのダメージ倍率(%)を設定できます。
 * 
 * <Critical Rate>
 *    :デフォルトのクリティカルのダメージ倍率(%)を設定できます。
 * 
 * 
 * [ダメージ計算式に使用できるコード]
 * ダメージ計算式に以下のコードも使用できます。
 * 
 * d.rate   :スキルで設定したダメージ倍率値を取得します。
 * rct      :連続回数を取得できます。初回は 0 です。連続攻撃に対して、
 *          :１撃毎にダメージを変えたい場合等に使用できます。
 * 
 * 使用例)<AutoAddition Damage Rate:0>の場合
 * (4 * a.atk * (1 - rct * 0.2) - 2 * b.def) * d.rate * 0.01
 * 
 *   使用者の攻撃力の4倍から相手の防御力の2倍を引いた値に、ダメージ倍率を
 *   掛けます。ただし、連続回数が設定されている場合、2回目以降は、攻撃力が
 *   20% ずつ落ちます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用効果の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、使用効果の設定を変更できます。
 * 
 * <Set Sep Effect: x>      :使用効果のId x に対して code部で記述した設定を
 * code                     :反映します。使用効果のIDは、使用効果欄に設定した
 * </Set Sep Effect>        :順番に、上から 0, 1,...となります。
 * 
 * [code に使用できる項目]
 * Target: y                :使用効果の対象を、y に変えることができます。
 *                          :y に使用できるコードは以下の通りです。
 *                          : user - 使用者
 *                          : randomFriends - 味方からランダムで1体選択
 *                          : randomOpponents - 敵からランダムで1体選択
 * 
 * Value1: eval1            :使用効果の内容1を eval1 で設定した値に変更します。
 *                          :内容1は、使用効果で1つめに設定した数値です。
 *                          : 例) HP回復の場合、% で設定する値
 * 
 * Value2: eval1            :使用効果の内容2を eval1 で設定した値に変更します。
 *                          :内容2は、使用効果で2つめに設定した数値です。
 *                          : 例) HP回復の場合、+ で設定する値
 * 
 * Rate: y                  :eval1 に使用できるコード rate の値を
 *                          :y に設定します。
 * 
 * Enabled: eval2           :対象の使用効果ID を eval2 で設定した条件で有効に
 *                          :します。設定しない場合は、常に有効です。
 *                          :有効になっていない場合は、効果が発生しません。
 * 
 * Display: DISPAYNAME      :使用効果ID x の画面上に表示される効果名を
 *                          :DISPAYNAMEに変えます。%1 を使用すると、
 *                          :その箇所を rate値に変換します。
 * 
 * [eval1 の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param  - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  b.param  - 対象者のパラメータを参照します。
 *  v[x]     - 変数ID x の値を参照します。
 *  hpDamage - Hpダメージ量を参照します。
 *  mpDamage - Mpダメージ量を参照します。
 *  e.rate   - 上記タグで設定したrate値を参照します。
 * 
 * [eval2 の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 入力例）
 * 使用効果の1番目に「HP回復」を追加して、以下のタグを記入することで
 * スイッチID1またはスイッチID2がONの時に、相手に与えたダメージの20%分、
 * 使用者が回復する効果が発生します。
 * また、別途配布のFTKR_SEP_ShowSkillStatus.jsによる表示名を
 * 「HP吸収20%」に変更します。
 * <Set Sep Effect: 0>
 * Target: user
 * Value1: 0
 * Value2: hpDamage * e.rate * 0.01
 * Rate: 20
 * Enabled: s[1] || s[2]
 * Display: HP吸収%1%
 * </Set Sep Effect>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連続回数の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、連続回数の設定ができます。
 * 
 * <Set Sep Repeat>         :連続回数に対して code部で記述した設定を
 * code                     :反映します。
 * </Set Sep Repeat>
 * 
 * [code に使用できる項目]
 * Count: y                 :連続回数を y 回に変更します。
 * Success Rate: eval       :連続使用毎の、スキルの成功率を eval に設定します。
 * 
 * Rate: y                  :eval に使用できるコード rate の値を
 *                          :y に設定します。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  b.param - 対象者のパラメータを参照します。
 *  v[x]    - 変数ID x の値を参照します。
 *  rct     - 連続回数を参照します。1撃目から 0,1,... と数えます。
 *  rate    - 上記タグで設定したrate値を参照します。
 *  base    - データベースで設定したスキル成功率 × 使用者の命中率による
 *            成功率を参照します。値は0～1までの少数で表されます。
 * 
 * 入力例)
 * スキルを5回連続で使用するが、1回使用する毎に成功率が10%ずつ下がる。
 * 1回目が100%だとすると、2回目は90%、3回目は80%、...となる。
 * <Set Sep Repeat>
 * Count: 5
 * Rate: 10
 * Success Rate: base - rct * rate * 0.01
 * </Set Sep Repeat>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用条件の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、使用条件の設定ができます。
 * 
 * <Set Sep Required>       :使用条件に対して code部で記述した設定を
 * code                     :反映します。
 * </Set Sep Required>
 * 
 * [code に使用できる項目]
 * WtypeId: y1,y2,...       :必要武器の武器タイプ y1,y2,... を追加します。
 * 
 * EtypeId: y1,y2,...       :スキルを使用するために、特定の装備タイプが必要に
 *                          :なります。必要装備タイプ y1,y2,... を追加します。
 * 
 * Logic: type              :必要武器や装備を複数設定した場合の、論理計算方法を
 *                          :設定します。type に以下のコードを設定してください。
 *                          : and - すべて装備する必要がある
 *                          : or  - いずれか1つ装備すればよい
 *                          : nand- 設定した装備の組合せをしてはいけない
 *                          : nor - いずれか1つでも装備してはいけない
 *                          :コードで設定しない場合は、'or'を適用する。
 * 
 * Condition: eval          :スキルの使用条件に eval で設定した条件を
 *                          :追加します。
 * 
 * Forget: eval             :スキルを忘れることができる条件を eval に設定する。
 *                          :設定しない場合は、無条件で忘れることができます。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 入力例)
 * スキルを使用するために必要な武器を、武器タイプ1,2に設定する。
 * ただし、武器タイプ1,2の両方を装備していなければならない。
 * また、使用するために、LV10以上とスイッチID1がONが必要になる。
 * <Set Sep Required>
 * WtypeId: 1,2
 * Logic: and
 * Condition: a.level >= 10 && s[1]
 * </Set Sep Required>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 消費コストの設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、消費コストの設定を変更できます。
 * 
 * <Set Sep Cost>           :消費コストに対して code部で記述した設定を
 * code                     :反映します。
 * </Set Sep Cost>
 * 
 * [code に使用できる項目]
 * Mp: eval                 :消費MPを eval で設定した値に変更します。
 * Tp: eval                 :消費TPを eval で設定した値に変更します。
 * Hp: eval                 :消費HPを eval で設定した値にします。
 * 
 * Rate: eval            :eval に使用できるコード rate の値を
 *                          :y に設定します。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  v[x]    - 変数ID x の値を参照します。
 *  rate    - 上記タグで設定したrate値を参照します。
 * 
 * 入力例）
 * 使用者の現在MPと現在TPをすべて消費する。ただし、最低1は必要とする。
 * <Set Sep Cost>
 * Mp: Math.max(a.mp, 1)
 * Tp: Math.max(a.tp, 1)
 * </Set Sep Cost>
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの説明文の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、スキルの説明文の設定を変更できます。
 * スキルの説明文はID別に登録することができ、ID毎に表示条件を設定することで、
 * ゲーム中で表示させる説明文を変えることができます。
 * 
 * データベースの説明欄の記述は、ID0 に登録されます。
 * ID0 の表示条件は設定できず、他のIDの表示条件が満たない場合に、ID0 の説明文を
 * 表示します。
 * 
 * <Set Sep Desc: x>        :ID x に対して code部の設定、および説明文の
 * code                     :1行目と2行目の記述を反映します。
 * 説明文1行目
 * 説明文2行目
 * </Set Sep Desc>
 * 
 * [code に使用できる項目]
 * Enabled: eval            :ID x の説明文の表示条件を eval で設定します。
 *                          :表示条件が複数のIDで重なった場合は、IDが
 *                          :大きい方を表示します。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 入力例）
 * スイッチID1 がONの時に表示する説明文の設定。
 * <Set Sep Desc: 1>
 * Enabled: s[1]
 * 説明文の1行目に表示される文字列です
 * 説明文の2行目に表示される文字列です
 * </Set Sep Desc>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 属性ダメージの計算方法について
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Element Damage Calc>の設定値により、複数の属性を持った
 * 攻撃をした場合の、防御側の有効度の計算方法を変更することができます。
 * 
 * 変更できる計算方法は、最大、平均、累積、最小の４種類です。
 * 
 *  <0:最大> :防御側の該当する属性有効度の最大値が
 *          最終的なダメージ倍率になります。(ツクールMVの標準方式)
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は70% ( = max(50%, 70%) )
 * 
 * 
 *  <1:平均> :防御側の該当する属性有効度の平均値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は60% ( = (50% + 70%) / 2 )
 *
 *
 *  <2:累積> :防御側の該当する属性有効度を累積した値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は35% ( = 50% × 70% )
 *
 *
 *  <3:最小> :防御側の該当する属性有効度の最小値が
 *          最終的なダメージ倍率になります。
 *
 *   例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
 *       ⇒最終的な有効度は50% ( = min(50%, 70%) )
 * 
 * 
 * なお、この計算は、ダメージID毎に別に行われますので注意してください。
 * 以下の2パターンは、防御側の有効度の設定が無ければ同じダメージですが、
 * 有効度の設定がある場合は最終的なダメージが変わります。
 * 
 * パターン1 ダメージID 0 のみ
 *  属性   :物理＋炎
 *  計算式 :200
 *    ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
 *        200 * 70% = 140ダメージ
 * 
 * パターン2 ダメージID 0 と ダメージID 1
 *  ID0 属性   :物理
 *  ID0 計算式 :100
 *  ID1 属性   :炎
 *  ID1 計算式 :100
 *    ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
 *        100 * 50% + 100 * 70% = 120ダメージ
 * 
 * 
 *-----------------------------------------------------------------------------
 * その他の設定
 *-----------------------------------------------------------------------------
 * その他に、本プラグインで設定できる項目を説明します。
 * 
 * [使用できるタグ]
 * 対象：スキル
 * <Sep Scope Random: y>    :範囲を「敵X体ランダム」に設定している場合、
 *                          :ランダムの対象 X を y に変更します。
 * 
 * 
 * [プラグインパラメータの設定項目]
 * 
 * <Make Sep For Each>
 *    :アクターがスキルを習得した時に、スキルの
 *    :個別データを自動的に作成します。
 *    :別途配布のFTKR_SkillUpgradeSystem.jsを使用
 *    :する場合は、'1'に設定してください。
 *    :作成したデータは、後述のプラグインコマンドにより
 *    :データの変更、リセット、削除が行なえます。
 * 
 * <Enabled Repeat Failure>
 *    :連続攻撃時に途中でスキルに失敗、命中しない、回避される等すると
 *    :その時点で攻撃をやめるかどうか設定できます。
 *    :0 - 攻撃を続けます, 1 - 攻撃をやめます
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドを使用できます。
 * なお、プラグインコマンドに指定する値には、数値だけでなく、ゲーム内変数を
 * 指定することが可能です。
 * 
 * 例) アクターIDの指定部に、変数ID1 の値を使用する場合
 *    ⇒ actor(v[1])
 *
 *  
 * 1. 指定した対象のスキルパラメータを変更する。
 *    なお、指定したアクターが指定したスキルの個別データを持っていない場合は無効。
 * 
 * <SEP SET ACTOR(x1) SKILL(x2) PROP VALUE>
 *     : x1 - アクターIDを指定する。
 *     : x2 - スキルIDを指定する。
 *     : PROP VALUE - 変更したいスキルパラメータによって以下から選択する。
 *     :              必ず小文字を入力すること。
 *     :   damages(y1) rate(y2) - ダメージID y1 の rate を y2 に変更する。
 *     :   effects(y1) rate(y2) - 使用効果ID y1 の rate を y2 に変更する。
 *     :   speed value(y)       - 速度補正を y に変更する。
 *     :   repeats rate(y)      - 連続回数の rate を y に変更する。
 *     :   repeats count(y)     - 連続回数の count を y に変更する。
 *     :   sepCost rate(y)      - 消費コストの rate を y に変更する。
 *     :   scope value(y)       - 範囲を y に変更する。
 *     :   scoperandom value(y) - ランダム対象数を y に変更する。
 *     :   name SKILLNAME       - スキル名を'SKILLNAME'に変更します。
 *     :   name v[y]            - スキル名を変数ID y に格納した文字列に
 *     :                          変更します。
 * 
 * 例)
 * <SEP SET ACTOR(1) SKILL(1) damages(0) rate(200)>
 *     :アクター1 が覚えている スキルID 1 に設定したダメージID 0 の
 *     :ダメージ倍率を 200 に変更。
 * 
 * 
 * 2. 指定したアクターのスキルの個別データをリセットする。
 *    なお、指定したアクターが指定したスキルの個別データを持っていない場合は無効。
 * 
 * <SEP RESET ACTOR(x1) SKILL(x2)>
 *     : x1 - アクターIDを指定する。
 *     : x2 - スキルIDを指定する。
 * 
 * 
 * 3. 指定したアクターのスキルの個別データを削除する。
 *    なお、指定したアクターが指定したスキルの個別データを持っていない場合は無効。
 *    削除後は、デフォルトのスキルデータを参照する。
 * 
 * <SEP ERASE ACTOR(x1) SKILL(x2)>
 *     : x1 - アクターIDを指定する。
 *     : x2 - スキルIDを指定する。
 * 
 * 
 * 4. 指定したアクターのスキルの個別データを作成する。
 *    なお、指定したアクターが指定したスキルの個別データを持ってる場合は無効。
 *    また、指定したスキルを覚えていない場合も無効。
 *    作成後は、個別のスキルデータを参照する。
 * 
 * <SEP MAKE ACTOR(x1) SKILL(x2)>
 *     : x1 - アクターIDを指定する。
 *     : x2 - スキルIDを指定する。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプトコマンド
 *-----------------------------------------------------------------------------
 * 以下のスクリプトコマンドによって、スキルの個別データの有無を取得できます。
 * 
 * $gameActors.actor(x).isMakedSepSkill(y)
 *    :指定したアクターが、スキルの個別データを持っている場合に、trueを返す。
 *    : x - アクターID
 *    : y - スキルID
 * 
 * 
 *-----------------------------------------------------------------------------
 * eval値の使用者パラメータについて
 *-----------------------------------------------------------------------------
 * 使用者パラメータとして、HPや命中などのパラメータ以外にも、アクターの
 * さまざまな状態を取得できます。以下はその一例です。
 * 
 * なお、これらは 'a'を'$gameActors.actor(y)'と変えることで、
 * スクリプトコマンドとして使用できます。(yはアクターID)
 * 
 * 1. 特定の装備をしているか判定する
 *  a.isEquipped(x)
 *    : x - 武器なら $dataWeapons[n], 防具なら $dataArmors[n]
 *    : n は武器防具のID
 * 
 * 2. 特定のスキルを取得しているか判定する
 *  a.isLearnedSkill(x)
 *    : x - スキルID
 * 
 * 3. 特定のステートを受けているか判定する
 *  a.isStateAffected(x)
 *    : x - ステートID
 * 
 * 4. 特定の強化を受けているか判定する
 *  a.isBuffAffected(x)
 *    : x - 強化ID(IDの対象は以下)
 *    : 0 - 最大HP、1 - 最大MP、2 - 攻撃力、3 - 防御力、4 - 魔法攻撃、
 *    : 5 - 魔法防御、6 - 敏捷性、7 - 運
 * 
 * 5. 特定の弱体を受けているか判定する
 *  a.isDebuffAffected(x)
 *    : x - 弱体ID(IDの対象は強化と同じ)
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
 * v1.3.3 - 2017/04/09 : 不具合修正
 *    1. ダメージが設定されていない場合の例外処理を追加。
 *    2. 使用者が設定されていない場合の例外処理を追加。
 * 
 * v1.3.2 - 2017/04/09 : 不具合修正
 *    1. アイテム使用時にエラーになる不具合を修正。
 * 
 * v1.3.1 - 2017/04/04 : 一部処理見直し、ヘルプ修正
 *    1. 本プラグインの機能を一部アイテムにも適用できるように処理見直し。
 *    2. ヘルプ修正。
 *    3. ライセンス表記を変更。
 * 
 * v1.3.0 - 2017/03/24 : 不具合修正、仕様変更、機能追加
 *    1. クリティカルダメージ倍率が正しく読み取れていなかった不具合を修正。
 *    2. ダメージ倍率設定用のノートタグのコード名を変更。
 *    3. ダメージ倍率のコードをダメージ計算式に入力不要にできる機能を追加。
 *    4. 特長欄の属性読み取り処理部に例外処理を追記。
 * 
 * v1.2.5 - 2017/03/23 : 不具合修正
 *    1. クリティカルダメージの処理部の誤記修正。
 *    2. ダメージID1以降のクリティカル判定に対して<Critical For Each>の設定が
 *       反映されない不具合を修正。
 * 
 * v1.2.4 - 2017/03/18 : 不具合修正
 *    1. アイテム使用時にエラーになる不具合を修正。
 * 
 * v1.2.3 - 2017/03/18 : 誤記修正
 * 
 * v1.2.2 - 2017/03/18 : 処理見直し、機能追加
 *    1. スキル実行処理におけるのダメージIDの処理方法を見直し。
 *    2. 各ダメージIDに設定したスキルの使用効果と得TPが発生するように変更。
 * 
 * v1.2.1 - 2017/03/17 : 機能追加
 *    1. 連続攻撃中に失敗判定になった時点で攻撃をやめるかどうかを設定できる
 *       機能を追加。
 * 
 * v1.2.0 - 2017/03/16 : 処理見直し
 *    1. FTKR_SEP_ShowSkillStatus.js v1.3.0 に合わせて処理を見直し。
 * 
 * v1.1.9 - 2017/03/16 : 不具合修正
 *    1. ダメージIDで設定した内容が、他のスキルにも共有されていた不具合を修正。
 * 
 * v1.1.8 - 2017/03/11 : 処理見直し
 *    1. YEP_BattleEngineCore.jsとの競合回避のため、使用効果の内容の値を
 *       読み取るタイミングを変更。
 * 
 * v1.1.7 - 2017/03/07 : 不具合修正
 *    1. 蘇生アイテム使用時にエラーになる不具合を修正。
 * 
 * v1.1.6 - 2017/03/05 : 機能追加
 *    1. スキルの使用条件に、スキルを削除できる条件を設定する機能を追加。
 * 
 * v1.1.5 - 2017/03/04 : 仕様変更、機能追加
 *    1. 使用条件の武器・装備タイプを複数に設定したときの、デフォルトの
 *       論理計算方法を'or'に変更。
 *    2. 使用条件の武器・装備タイプを複数に設定したときの、論理計算方法を追加。
 * 
 * v1.1.4 - 2017/03/04 : 不具合修正
 *    1. 使用条件の装備タイプの判定が正しく行われていない不具合を修正。
 * 
 * v1.1.3 - 2017/03/03 : 不具合修正
 *    1. 使用効果があるスキルを敵が使用した時にエラーになる不具合を修正。
 *    2. 味方の通常攻撃が正しく処理できない不具合を修正。
 *    3. プラグインコマンド、およびノートタグの取得関数の記述を見直し
 * 
 * v1.1.2 - 2017/02/26 : 一部記述見直し
 *    1. FTKR_SkillTreeSystem.jsの機能追加に合わせて、一部記述見直し
 * 
 * v1.1.1 - 2017/02/26 : 不具合修正
 *    1. アイテム使用時にエラーになる不具合を修正
 * 
 * v1.1.0 - 2017/02/24 : ダメージ計算処理見直し、機能追加
 *    1. ダメージID1 以降の計算処理を変更し、各ダメージIDのダメージタイプが
 *       機能するように変更。
 *    2. 消費コストにjS計算式を使用できる機能を追加。
 *    3. 使用効果のタグに使用できるコードを追加。
 *    4. 使用条件に、装備タイプを指定できるタグを追加。
 *    5. 使用条件のパラメータ判定を、js計算式を使用する機能に変更。
 *    6. 連続回数の成功率に、js計算式を使用できる機能を追加。
 *    7. ダメージと使用効果に発動条件を設定できる機能を追加。
 *    8. スキルの説明文を複数登録し、表示を変えることができる機能を追加。
 *    9. プラグインコマンドを追加。
 *   10. ヘルプの記載内容を見直し。
 * 
 * v1.0.4 - 2017/02/19 : 不具合修正
 *    1. アクター毎に作成したスキルデータを正しく読み取れていなかった不具合を
 *       修正。
 *
 * v1.0.3 - 2017/02/19 : 不具合修正
 *    1. itemEffectAddDebuff関数内の記述ミス修正
 *
 * v1.0.2 - 2017/02/19 : 不具合修正
 *    1. ダメージID 0 を変更せずに、計算式にd.rateを記入すると、正常に
 *       ダメージを与えられない不具合を修正。
 * 
 * v1.0.1 - 2017/02/19 : 不具合修正、ヘルプの内容を修正
 *    1. addTraitsElementId関数内に記述ミスがあり、正しく動作しない
 *       不具合を修正。
 *    2. HP回復以外の使用効果に対して、内容1と内容2の値の書き換えが
 *       適用できていなかった不具合を修正。
 *    3. ダメージID追加時の注意内容をヘルプに追記。
 *    4. 属性ダメージの計算方法の注意内容をヘルプに追記。
 * 
 * v1.0.0 - 2017/02/18 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SEP.parameters = PluginManager.parameters('FTKR_SkillExpansion');

FTKR.SEP.elementDamageCalc = Number(FTKR.SEP.parameters['Elements Damage Calc'] || 0);
FTKR.SEP.makeSepForEach = Number(FTKR.SEP.parameters['Make Sep For Each'] || 0);
FTKR.SEP.defDamageRate = Number(FTKR.SEP.parameters['Damage Rate'] || 0);
FTKR.SEP.defCriticalRate = Number(FTKR.SEP.parameters['Critical Rate'] || 0);
FTKR.SEP.criticalForEach = Number(FTKR.SEP.parameters['Critical For Each'] || 0);
FTKR.SEP.enabledRepeatFailure = Number(FTKR.SEP.parameters['Enabled Repeat Failure'] || 0);
FTKR.SEP.autoDamageRate = Number(FTKR.SEP.parameters['AutoAddition Damage Rate'] || 0);

FTKR.Utility = FTKR.Utility || {};

//引数の要素の中の重複部分を削除する。
FTKR.Utility.duplicateDelete = function(list) {
  var newlist = list.filter( function(x, i, self) {
      return self.indexOf(x) === i;
  });
  return newlist;
};

//=============================================================================
// Math
//=============================================================================

Math._getDec = function(value) {
  var list = (value + '').split('.');
  return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された割合をパーセント表示の整数に変換する (例:0.5 を 50 に変換)
Math.percent = function(dec) {
  var decnum = Math._getDec(dec);
  var int = +(dec + '').replace('.', '');
  var diffdec = 2 - decnum;
  return diffdec ? int * Math.pow(10, diffdec) : int;
}

Math.limit = function(value, lowerlimit, upperlimit) {
  return Math.min(Math.max(value, lowerlimit), upperlimit);
}

// 配列の要素の合計
Math.sam = function(arr) {
    return arr.reduce( function(prev, current, i, arr) {
        return prev + current;
    });
};

/*
a,b 二つの値の大小を比較して、
 a > b なら +1
 a < b なら -1
 それ以外の結果なら 0 を返す
*/
Math.code = function(a, b) {
  if (a > b) {
    return +1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
};

//=============================================================================
// Array
//=============================================================================

//配列の要素を、すべて数値に変換する。
Array.prototype.num = function() {
  return this.map(function(elm) {
      return Number(elm);
  });
}

//重複した要素を除いて、Array配列にlist配列の要素を加える。
Array.prototype.addExceptForDup = function(list) {
    list.forEach( function(item) {
        if (!this.contains(item)) this.push(item);
    },this);
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.SEP.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    FTKR.SEP.BattleManager_initMembers.call(this);
    this._repeatCount = 0;
    this._repeatFailure = false;
};

FTKR.SEP.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this._repeatCount = 0;
    this._repeatFailure = false;
    FTKR.SEP.BattleManager_startAction.call(this);
};

FTKR.SEP.BattleManager_updateAction = BattleManager.updateAction;
BattleManager.updateAction = function() {
    if(this._repeatFailure && FTKR.SEP.enabledRepeatFailure) {
        this.endAction();
    } else {
        FTKR.SEP.BattleManager_updateAction.call(this);
    }
};

FTKR.SEP.BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
    FTKR.SEP.BattleManager_invokeNormalAction.call(this, subject, target);
    var effectTarget = this._action._targetSepEffect;
    if(effectTarget) this._logWindow.displayActionSepResults(subject, effectTarget);
    this._repeatCount++;
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.SEP.DatabaseLoaded = false;
FTKR.SEP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.SEP.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.SEP.DatabaseLoaded) {
        DataManager.sepSkillNotetags($dataSkills);
        FTKR.SEP.DatabaseLoaded = true;
    }
    return true;
};

DataManager.sepSkillNotetags = function(group) {
    var note1a = /<(?:SET SEP DAMAGE):[ ]*(\d+)>/i;
    var note1b = /<\/(?:SET SEP DAMAGE)>/i;
    var note2a = /<(?:SET SEP EFFECT):[ ]*(\d+)>/i;
    var note2b = /<\/(?:SET SEP EFFECT)>/i;
    var note3a = /<(?:SET SEP REPEAT)>/i;
    var note3b = /<\/(?:SET SEP REPEAT)>/i;
    var note4  = /<(?:SEP SCOPE RANDOM):[ ]*(\d+)>/i;
    var note5a = /<(?:SET SEP REQUIRED)>/i;
    var note5b = /<\/(?:SET SEP REQUIRED)>/i;
    var note6a = /<(?:SET SEP COST)>/i;
    var note6b = /<\/(?:SET SEP COST)>/i;
    var note7a = /<(?:SET SEP DESC):[ ]*(\d+)>/i;
    var note7b = /<\/(?:SET SEP DESC)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.sep = {};
        obj.sep.damages = [];
        obj.sep.effects = [];
        obj.sep.repeats = '';
        obj.sep.required = '';
        obj.sep.cost = '';
        obj.sep.descs = [];
        var scope = obj.scope;
        obj.scoperandom = scope > 2 && scope < 7 ? scope - 2 : 0;

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a)) {
                var data = {
                  id:Number(RegExp.$1),
                  text:''
                };
                setMode = 'anydata';
            } else if (note1b.test(line)) {
                setMode = 'none';
                obj.sep.damages.push(data);
            } else if (line.match(note2a)) {
                var data = {
                  id:Number(RegExp.$1),
                  text:''
                };
                setMode = 'anydata';
            } else if (note2b.test(line)) {
                setMode = 'none';
                obj.sep.effects.push(data);
            } else if (note3a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note3b.test(line)) {
                setMode = 'none';
                obj.sep.repeats = text;
            } else if (note5a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note5b.test(line)) {
                setMode = 'none';
                obj.sep.required = text;
            } else if (note6a.test(line)) {
                var text = '';
                setMode = 'data';
            } else if (note6b.test(line)) {
                setMode = 'none';
                obj.sep.cost = text;
            } else if (line.match(note7a)) {
                var data = {
                  id:Number(RegExp.$1),
                  text:''
                };
                setMode = 'anydata';
            } else if (note7b.test(line)) {
                setMode = 'none';
                obj.sep.descs.push(data);
            } else if (setMode === 'anydata') {
                data.text += line + ';';
            } else if (setMode === 'data') {
                text += line + ';';
            } else if (line.match(note4)) {
                obj.scoperandom = Number(RegExp.$1);
            }
        }
        DataManager.makeSepData(obj);
    }
};

// skillの拡張部分(sepdata)を作成する
DataManager.makeSepData = function(skill) {
    this.makeSepBase(skill);
    this.setSepDamagesNotetags(skill);
    this.setSepEffects(skill);
    this.setSepRepeats(skill);
    this.setSepRequired(skill);
    this.setSepCost(skill);
    this.setSepDescriptions(skill);
//    this.showLogSkillData(skill);
};

DataManager.makeSepBase = function(skill) {
    this.makeSepDamagesBase(skill);
    this.makeSepEffectsBase(skill);
    skill.sepRepeats = {
      count:skill.repeats,
      successRate:'',
      damageRate:0
    };
    skill.required = {
        wtypeIds:[],
        logic:'or',
        etypeIds:[],
        condition:'',
        forget:'',
    };
    if (skill.requiredWtypeId1) skill.required.wtypeIds.push(skill.requiredWtypeId1);
    if (skill.requiredWtypeId2) skill.required.wtypeIds.push(skill.requiredWtypeId2);
    skill.sepCost = {};
    skill.descs = [];
    var desc = {};
    desc.enabled = true;
    desc.description = skill.description;
    skill.descs[0] = desc;
};

DataManager.makeSepDamagesBase = function(skill) {
    skill.damages = [];
    skill.damages[0] = this.setSepDamage(skill.id);
};

DataManager.setSepDamage = function(skillId) {
    var damage = {};
    var setSkill = $dataSkills[skillId]
    var setDamage = setSkill.damage;
    for (var list in setDamage) {
        damage[list] = setDamage[list];
    }
    damage.rate = FTKR.SEP.defDamageRate;
    damage.criticalRate = FTKR.SEP.defCriticalRate;
    damage.hitType = setSkill.hitType;
    damage.itemElements = [];
    damage.id = setSkill.id;
    damage.addElmIds = [];
    damage.enabled = '';
    return damage;
};

DataManager.makeSepEffectsBase = function(skill) {
    skill.effects.forEach( function(effect) {
        effect.target = '';
        effect.sepValue1 = '';
        effect.sepValue2 = '';
        effect.rate = 0;
        effect.enabled = '';
        effect.display = '';
    });
};

DataManager.setSepDamagesNotetags = function(skill) {
    for (var t = 0; t < skill.sep.damages.length; t++) {
        var sepdata = skill.sep.damages[t];
        if (sepdata) {
            var case1 = /(?:SKILLID):[ ]*(\d+)/i;
            var case2 = /(?:ELEMENTID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3 = /(?:DAMAGERATE):[ ]*(\d+)/i;
            var case4 = /(?:CRITICALRATE):[ ]*(\d+)/i;
            var case5 = /(?:TRAIT ELEMENTS):[ ]*(.+)/i;
            var case6 = /(?:ENABLED):[ ]*(.+)/i;

            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataId = sepdata.id;
                var item = skill.damages[dataId];
                if (data.match(case1)) {
                    var skillId = Number(RegExp.$1);
                    skill.damages[dataId] = this.setSepDamage(skillId);
                } else if(data.match(case2)) {
                    var elmIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    skill.damages[dataId].addElmIds = [];
                    if (item.elementId !== -1) {
                        elmIds.forEach( function(elmId) {
                            if (item.elementId !== elmId) {
                                skill.damages[dataId].addElmIds.push(elmId);
                            }
                        });
                    }
                } else if(data.match(case3)) {
                    skill.damages[dataId].rate = Number(RegExp.$1);
                } else if(data.match(case4)) {
                    skill.damages[dataId].criticalRate = Number(RegExp.$1);
                } else if (data.match(case5)) {
                    var text = String(RegExp.$1).replace(/\s/g, "");
                    var types = text.split(',');
                    types.forEach( function(type) {
                        skill.damages[dataId].itemElements.push(type);
                    });
                } else if(data.match(case6)) {
                    skill.damages[dataId].enabled = String(RegExp.$1);
                }
            }
        }
    }
};

DataManager.setSepEffects = function(skill) {
    for (var t = 0; t < skill.sep.effects.length; t++) {
        var sepdata = skill.sep.effects[t];
        if (sepdata) {
            var case1 = /(?:TARGET):[ ]*(.+)/i;
            var case2 = /(?:VALUE1):[ ]*(.+)/i;
            var case3 = /(?:VALUE2):[ ]*(.+)/i;
            var case4 = /(?:RATE):[ ]*(\d+)/i;
            var case5 = /(?:ENABLED):[ ]*(.+)/i;
            var case6 = /(?:DISPLAY):[ ]*(.+)/i;

            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataId = sepdata.id;
                if (data.match(case1)) {
                    skill.effects[dataId].target = String(RegExp.$1);
                } else if(data.match(case2)) {
                    skill.effects[dataId].sepValue1 = String(RegExp.$1);
                } else if(data.match(case3)) {
                    skill.effects[dataId].sepValue2 = String(RegExp.$1);
                } else if(data.match(case4)) {
                    skill.effects[dataId].rate = Number(RegExp.$1);
                } else if(data.match(case5)) {
                    skill.effects[dataId].enabled = String(RegExp.$1);
                } else if(data.match(case6)) {
                    skill.effects[dataId].display = String(RegExp.$1);
                }
            }
        }
    }
};

DataManager.setSepRepeats = function(skill) {
    var sepdata = skill.sep.repeats;
    if (sepdata) {
        var case1 = /(?:COUNT):[ ]*(\d+)/i;
        var case2 = /(?:SUCCESS RATE):[ ]*(.+)/i;
        var case3 = /(?:RATE):[ ]*(\d+)/i;

        var datas = sepdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1)) {
                skill.sepRepeats.count = Number(RegExp.$1);
            } else if(data.match(case2)) {
                skill.sepRepeats.successRate = String(RegExp.$1);
            } else if(data.match(case3)) {
                skill.sepRepeats.rate = Number(RegExp.$1);
            }
        }
    }
};

DataManager.setSepRequired = function(skill) {
    var sepdata = skill.sep.required;
    if (sepdata) {
        var case1 = /(?:WTYPEID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case2 = /(?:LOGIC):[ ]*(.+)/i;
        var case3 = /(?:ETYPEID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case4 = /(?:CONDITION):[ ]*(.+)/i;
        var case5 = /(?:FORGET):[ ]*(.+)/i;

        var datas = sepdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1)) {
                var wtypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                skill.required.wtypeIds.addExceptForDup(wtypeIds);
            } else if(data.match(case2)) {
                skill.required.logic = String(RegExp.$1);
            } else if (data.match(case3)) {
                var etypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                etypeIds.forEach( function(etypeId) {
                    skill.required.etypeIds.push(etypeId);
                });
            } else if(data.match(case4)) {
                skill.required.condition = String(RegExp.$1);
            } else if(data.match(case5)) {
                skill.required.forget = String(RegExp.$1);
            }
        }
    }
};

DataManager.setSepCost = function(skill) {
    var sepdata = skill.sep.cost;
    if (sepdata) {
        var case1 = /(?:MP):[ ]*(.+)/i;
        var case2 = /(?:TP):[ ]*(.+)/i;
        var case3 = /(?:HP):[ ]*(.+)/i;
        var case4 = /(?:RATE):[ ]*(\d+)/i;

        var datas = sepdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1)) {
                skill.sepCost.mp = String(RegExp.$1);
            } else if(data.match(case2)) {
                skill.sepCost.tp = String(RegExp.$1);
            } else if(data.match(case3)) {
                skill.sepCost.hp = String(RegExp.$1);
            } else if(data.match(case4)) {
                skill.sepCost.rate = Number(RegExp.$1);
            }
        }
    }
};

DataManager.setSepDescriptions = function(skill) {
    for (var t = 0; t < skill.sep.descs.length; t++) {
        var sepdata = skill.sep.descs[t];
        if (sepdata) {
            var case1 = /(?:ENABLED):[ ]*(.+)/i;
            var case2 = /(.+)/;
            var dataId = sepdata.id;
            skill.descs[dataId] = {};
            var desc = '';
            var datas = sepdata.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.match(case1)) {
                    skill.descs[dataId].enabled = RegExp.$1;
                } else if(data.match(case2)) {
                    desc += RegExp.$1 + '\r\n';
                }
            }
            skill.descs[dataId].description = desc;
        }
    }
};

DataManager.showLogSkillData = function(skill) {
    console.log('SHOW SEP DATA:' + skill.name);
    DataManager.showLogItem(skill, 'SKILL');
    DataManager.showLogItems(skill.damages, 'DAMAGES');
    DataManager.showLogItems(skill.effects, 'EFFECTS');
    DataManager.showLogItem(skill.sepRepeats, 'SEP REPEATS');
    DataManager.showLogItem(skill.required, 'REQUIRED');
    DataManager.showLogItem(skill.sepCost, 'SEP COST');
    DataManager.showLogItems(skill.descs, 'DESCS');
    DataManager.showLogItem(skill.sep, 'SEP');
    DataManager.showLogItems(skill.sep.descs, 'SEP DESCS');
};

DataManager.showLogItem = function(item, display) {
    var text = '';
    for (var prop in item) {
        text += ' ' + prop + ':' + item[prop] + ',';
    }
    console.log(display + ':' + text);
};

DataManager.showLogItems = function(items, display) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var text = '';
        for (var prop in item) {
            text += ' ' + prop + ':' + item[prop] + ',';
        }
        console.log(display + ' ' + i + ':' + text);
    }
};

FTKR.SEP.DataManager_isSkill = DataManager.isSkill;
DataManager.isSkill = function(item) {
    return DataManager.isSepSkill(item) ? true :
        FTKR.SEP.DataManager_isSkill.call(this, item);
};

DataManager.isSepSkill = function(skill) {
    return skill && skill.hasOwnProperty('actorId');
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.SEP.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    FTKR.SEP.Game_Actor_initMembers.call(this);
    this._sepIds = [];
    this._sepDataSkills = [];
};

FTKR.SEP.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    FTKR.SEP.Game_Actor_learnSkill.call(this, skillId);
    if (FTKR.SEP.makeSepForEach && !this.isMakedSepSkill(skillId)) {
        this.makeSepSkill(skillId);
    }
};

Game_Actor.prototype.isMakedSepSkill = function(skillId) {
    return this._sepIds.contains(skillId);
};

FTKR.SEP.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    var list = FTKR.SEP.Game_Actor_skills.call(this);
    var newlist = [];
    list.forEach( function(skill) {
        if (this.isMakedSepSkill(skill.id)) {
            newlist.push(this.sepSkill(skill.id));
        } else {
            newlist.push(skill);
        }
    },this);
    return newlist;
};

FTKR.SEP.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    this.eraseSepSkill(skillId);
    FTKR.SEP.Game_Actor_forgetSkill.call(this, skillId);
};

Game_Actor.prototype.getSkill = function(skillId) {
    return this.isMakedSepSkill(skillId) ? this.sepSkill(skillId) : $dataSkills[skillId];
}

//書き換え
Game_Actor.prototype.isSkillWtypeOk = function(skill) {
    var sreq = skill.required;
    var logicOks = sreq.wtypeIds.filter( function(item) {
        return item > 0 && this.isWtypeEquipped(item);
    },this);
    return this.isLogicOk(sreq.wtypeIds, logicOks, sreq.logic);
};

Game_Actor.prototype.isSkillEtypeOk = function(skill) {
    var sreq = skill.required;
    if (!sreq.etypeIds.length) return true;
    var logicOks = sreq.etypeIds.filter( function(item) {
        return item || item > 0 && this.isEtypeEquipped(item);
    },this);
    return this.isLogicOk(sreq.etypeIds, logicOks, sreq.logic);
};

Game_Actor.prototype.isLogicOk = function(items, logicOks, logic) {
    switch (true) {
        case (/(?:nor)/i).test(logic):
            return items.length && !logicOks.length;
        case (/(?:or)/i).test(logic):
            return !items.length || logicOks.length;
        case (/(?:nand)/i).test(logic):
            return items.length !== logicOks.length;
        case (/(?:and)/i).test(logic):
            return items.length == logicOks.length;
    }
    return false;
};

Game_Actor.prototype.isEtypeEquipped = function(etypeId) {
    var items = this.equips();
    for (var i = 0; i < items.length ; i++) {
        if (DataManager.isWeapon(items[i]) && items[i].etypeId === etypeId ) return true;
        if (DataManager.isArmor(items[i]) && items[i].etypeId === etypeId ) return true;
    }
    return false;
};

Game_Actor.prototype.isSkillRequiredParamOk = function(skill) {
    return this.evalEnabledFormula(skill.required.condition, skill);
};

Game_Actor.prototype.isForgetOk = function(skill) {
    return this.evalEnabledFormula(skill.required.forget, skill);
};

Game_Actor.prototype.evalEnabledFormula = function(formula, skill) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

Game_Actor.prototype.isRandomScope = function(skill) {
  return skill.scope > 2 && skill.scope < 7;
}

//skillIdからsepskillを返す
Game_Actor.prototype.sepSkill = function(skillId) {
    return this._sepDataSkills.filter( function(skill) {
        return skill.id === skillId;
    })[0];
};

Game_Actor.prototype.isSepDataId = function(sepSkill) {
    var len = this._sepDataSkills.length;
    for (var i = 0; i < len; i++) {
        if (sepSkill === this._sepDataSkills[i]) return i; 
    }
};

//sepSkillを作成する
Game_Actor.prototype.makeSepSkill = function(skillId) {
    this._sepIds.push(skillId);
    this._sepDataSkills.push(this.setSepSkill(skillId));
};

//sepSkillを削除する
Game_Actor.prototype.eraseSepSkill = function(skillId) {
    var sepSkill = this.sepSkill(skillId);
    if (sepSkill) {
        var index = this.isSepDataId(sepSkill);
        this._sepIds.splice(index, 1);
        this._sepDataSkills.splice(index, 1);
    }
};

Game_Actor.prototype.setSepSkill = function(skillId) {
    var skill = $dataSkills[skillId];
    var sepSkill = {};
    for (var prop in skill) {
        if (prop == 'damage') {
            sepSkill[prop] = {};
            var obj = skill[prop];
            for (var list in obj) {
                sepSkill[prop][list] = obj[list];
            }
        } else if (prop === 'damages') {
            sepSkill[prop] = [];
            skill[prop].forEach( function(obj) {
                var sepObj = {};
                for (var list in obj) {
                    sepObj[list] = obj[list];
                }
                sepSkill[prop].push(sepObj);
            });
        } else if (prop === 'effects') {
            sepSkill[prop] = [];
            skill[prop].forEach( function(obj) {
                var sepObj = {};
                for (var list in obj) {
                    sepObj[list] = obj[list];
                }
                sepSkill[prop].push(sepObj);
            });
        } else if (prop === 'sepRepeats') {
            sepSkill[prop] = {};
            var obj = skill[prop];
            for (var list in obj) {
                sepSkill[prop][list] = obj[list];
            }
        } else if (prop === 'sep') {
            continue;
        } else {
            sepSkill[prop] = skill[prop];
        }
    }
    sepSkill.actorId = this.actorId();
    return sepSkill;
};

Game_Actor.prototype.isSepEnabled = function(skillId, typeId, dataId) {
  var skill = this.getSkill(skillId);
  var prop = skill[FTKR.SSS.sepTypes[typeId].type];
  if (!prop.length) return true;
  return this.evalEnabledFormula(prop[dataId].enabled, skill);
};

Game_Actor.prototype.evalCostValue = function(cost) {
    if (!cost || !cost.value) return 0;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var cnt = this.sepSkillsCount(cost);
        var value = Math.max(eval(cost.value), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        return 0;
    }
};

Game_Actor.prototype.sepSkillsCount = function(cost) {
    return [];
};

Game_Actor.prototype.paySepCost = function(cost) {
    var value = this.evalCostValue(cost);
    switch (cost.type) {
        case 'item':
          return $gameParty.loseItem($dataItems[cost.id], value);
        case 'var':
          return $gameVariables.setValue(cost.id, $gameVariables.value(cost.id) - value);
        case 'gold':
          return $gameParty.loseGold(value);
        case 'weapon':
          return $gameParty.loseItem($dataWeapons[cost.id], value);
        case 'armor':
          return $gameParty.loseItem($dataArmors[cost.id], value);
    }
};

Game_Actor.prototype.isPayCostNg = function(cost) {
    var value = this.evalCostValue(cost);
    switch (cost.type) {
      case 'item':
        return $gameParty.numItems($dataItems[cost.id]) < value;
      case 'var':
        return $gameVariables.value(cost.id) < value;
      case 'gold':
        return $gameParty.gold() < value;
      case 'weapon':
        return $gameParty.numItems($dataWeapons[cost.id]) < value;
      case 'armor':
        return $gameParty.numItems($dataArmors[cost.id]) < value;
    }
};

//=============================================================================
// Game_Action
//=============================================================================

FTKR.SEP.Game_Action_initialize = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function(subject, forcing) {
    FTKR.SEP.Game_Action_initialize.call(this, subject, forcing);
    this._target = {};
    this._damageId = 0;
    this._targetSepEffect = null;
};

//書き換え
FTKR.SEP.Game_Action_item = Game_Action.prototype.item;
Game_Action.prototype.item = function() {
    if (!this.itemDamage()) return FTKR.SEP.Game_Action_item.call(this);
    return this._damageId ? this.getSkill(this.itemDamage().id) :
        this._item.sepObject(this.subject());
};

Game_Action.prototype.getSkill = function(skillId) {
    return this.subject().getSkill(skillId);
};

Game_Action.prototype.itemDamage = function() {
    var item = this._item.sepObject(this.subject());
    if (item && item.hasOwnProperty('damages')) {
        return item.damages[this._damageId];
    } else if (item && item.damage && this._item.isSkill()) {
        return item.damage;
    } else {
        return false;
    }
};

//書き換え
FTKR.SEP.Game_Action_setSkill = Game_Action.prototype.setSkill;
Game_Action.prototype.setSkill = function(skillId) {
    this.subject() ? this._item.setObject(this.getSkill(skillId)) :
        FTKR.SEP.Game_Action_setSkill.call(this, skillId);
};

//書き換え
Game_Action.prototype.numTargets = function() {
    if (!this.isForRandom()) return 0;
    return this.item().scoperandom ? this.item().scoperandom : this.item().scope - 2;
};

//書き換え
Game_Action.prototype.numRepeats = function() {
    var repeats = this.item().sepRepeats ? this.item().sepRepeats.count : this.item().repeats;
    if (this.isAttack()) repeats += this.subject().attackTimesAdd();
    return Math.floor(repeats);
};

//書き換え
Game_Action.prototype.isAttack = function() {
    return this.item() === this.getSkill(this.subject().attackSkillId());
};

//書き換え
Game_Action.prototype.isGuard = function() {
    return this.item() === this.getSkill(this.subject().guardSkillId());
};

/*-------------------------------------------------------------
  スキル実行処理の修正
-------------------------------------------------------------*/
FTKR.SEP.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this._targetSepEffect = null;
    this._damageId = 0;
    FTKR.SEP.Game_Action_apply.call(this, target);
    this.sepDamageIdApply(target);
};

Game_Action.prototype.sepDamageIdApply = function(target) {
    var result = target.result();
    if (result.isHit() && this.item().damages) {
        var len = this.item().damages.length;
        var mainItem = this._item.sepObject(this.subject());
        for (var i = 1; i < len; i++) {
            this._damageId = i;
            if (this.item().damage.type > 0 && 
                this.evalDamagesEnabled(mainItem.damages[this._damageId].enabled, mainItem)) {
                var critical = FTKR.SEP.criticalForEach ? 
                    (Math.random() < this.itemCri(target)) :
                    result.critical;
                var value = this.makeDamageValue(target, critical);
                this.executeDamage(target, value);
                this.item().effects.forEach(function(effect) {
                    this.applyItemEffect(target, effect);
                }, this);
                this.applyItemUserEffect(target);
            }
        }
    }
    this._damageId = 0;
};

if(Imported.FTKR_EID) {
Game_Action.prototype.eidDamageIdApply = function(target) {
};
}

/*-------------------------------------------------------------
  成功判定の修正
-------------------------------------------------------------*/
FTKR.SEP.Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    var base = FTKR.SEP.Game_Action_itemHit.call(this, target);
    if (this.item().sepRepeats) {
        var sepRep = this.item().sepRepeats;
        return sepRep.successRate ? this.evalSuccessRate(base, target, sepRep) : base;
    }
    return base;
};

Game_Action.prototype.evalSuccessRate = function(base, target, sepRepeats) {
    try {
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var rate = sepRepeats.rate;
        var rct = BattleManager._repeatCount;
        var value = Math.max(base + Math.floor(eval(sepRepeats.successRate)), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

/*-------------------------------------------------------------
  使用効果の処理修正
-------------------------------------------------------------*/
FTKR.SEP.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    if (effect && this.evalEffectEnabled(effect, this.item())) {
        target = this.changeTargetEffect(target, effect);
        this.setSepEffectValue();
        FTKR.SEP.Game_Action_applyItemEffect.call(this, target, effect);
    }
};

Game_Action.prototype.evalEffectEnabled = function(effect, item) {
    return this.subject().evalEnabledFormula(effect.enabled, item);
};

Game_Action.prototype.changeTargetEffect = function(target, effect) {
    this._target = target;
    if (effect.target) {
        switch (effect.target) {
            case 'user':
                this._targetSepEffect = this.subject();
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomOpponents':
                this._targetSepEffect = this.changeTargetForRandom(target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
            case 'randomFriends':
                this._targetSepEffect = this.changeTargetForRandom(!target.isEnemy());
                this._targetSepEffect.result().used = true;
                return this._targetSepEffect;
        }
    }
    return target;
};

Game_Action.prototype.changeTargetForRandom = function(isEnemy) {
    return isEnemy ? $gameTroop.randomTarget() : $gameParty.randomTarget();
};

Game_Action.prototype.setSepEffectValue = function() {
    if(this.item()) {
        this.item().effects.forEach(function(effect) {
            effect.value1 = this.setSepEffectValue1(effect);
            effect.value2 = this.setSepEffectValue2(effect);
        }, this);
    }
};

Game_Action.prototype.setSepEffectValue1 = function(effect) {
    return effect.sepValue1 ? this.evalEffectValue(effect.sepValue1, effect) : effect.value1;
};

Game_Action.prototype.setSepEffectValue2 = function(effect) {
    return effect.sepValue2 ? this.evalEffectValue(effect.sepValue2, effect) : effect.value2;
};

Game_Action.prototype.evalEffectValue = function(formula, effect) {
    try {
        var a = this.subject();
        var b = this._target;
        var hpDamage = b._result.hpDamage;
        var mpDamage = b._result.mpDamage;
        var e = effect;
        var v = $gameVariables._data;
        var value = Math.max(eval(formula), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

/*-------------------------------------------------------------
  ダメージ計算の修正
-------------------------------------------------------------*/

Game_Action.prototype.evalDamagesEnabled = function(enabled, item) {
    return this.subject().evalEnabledFormula(enabled, item);
};

//書き換え
Game_Action.prototype.evalDamageFormula = function(target) {
    var value = this.evalSepDamageFormula(target);
    return FTKR.SEP.autoDamageRate ? this.applyDamageRate(value) : value;
};

Game_Action.prototype.evalSepDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var d = this.itemDamage();
        var rct = BattleManager._repeatCount;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = Math.max(eval(item.damage.formula), 0) * sign;
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

Game_Action.prototype.applyDamageRate = function(damage) {
    return  this.itemDamage() ? damage * this.itemDamage().rate / 100 : damage;
};

FTKR.SEP.Game_Action_applyCritical = Game_Action.prototype.applyCritical;
Game_Action.prototype.applyCritical = function(damage) {
    return  this.itemDamage() ? damage * this.itemDamage().criticalRate / 100 :
        FTKR.SEP.Game_Action_applyCritical.call(this, damage);
};

/*-------------------------------------------------------------
  属性有効度の計算の修正
-------------------------------------------------------------*/

FTKR.SEP.Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    if (!this.itemDamage()) return FTKR.SEP.Game_Action_calcElementRate.call(this, target);
    var elementIds = this.isElementIds(this.itemDamage());
    switch (FTKR.SEP.elementDamageCalc) {
        case 1:
          return this.elementsAverageRate(target, elementIds);
        case 2:
          return this.elementsAccumlateRate(target, elementIds);
        case 3:
          return this.elementsMinRate(target, elementIds);
    }
    return this.elementsMaxRate(target, elementIds);
};

Game_Action.prototype.isElementIds = function(damage) {
    return  damage.elementId < 0 ? this.subject().attackElements() : this.isSkillElements(damage);
};

Game_Action.prototype.isSkillElements = function(damage) {
    return [damage.elementId].concat(damage.addElmIds, this.addTraitsElementId(damage));
};

Game_Action.prototype.addTraitsElementId = function(damage) {
    var list = [];
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
    if (!damage.itemElements) return list;
    damage.itemElements.forEach( function(type) {
        switch (type) {
            case 'Actor':
                list = list.concat(this.edTraitsSet(code, this.actorData()));
                break;
            case 'Class':
                list = list.concat(this.edTraitsSet(code, this.classData()));
                break;
            case 'Weapon':
                list = list.concat(this.edTraitsALLSet(code, this.weaponsData()));
                break;
            case 'Armor':
                list = list.concat(this.edTraitsALLSet(code, this.armorsData()));
                break;
            case 'States':
                list = list.concat(this.edTraitsALLSet(code, this.statesData()));
                break;
        }
    },this);
    return list;
};

Game_Action.prototype.edTraitsALLSet = function(code, subjects) {
    var list = [];
    for (var i = 0; i < subjects.length; i++) {
        list = list.concat(this.edTraitsSet(code, subjects[i]));
    }
    return list;
};

Game_Action.prototype.edTraitsSet = function(code, subject) {
    var list = [];
    subject.traits.forEach( function(trait) {
        if (trait.code === code) list.push(trait.dataId);
    });
    return list;
};

Game_Action.prototype.actorData = function() {
    return this.subject().isActor() ? $dataActors[this.subject().actorId()] : false;
};

Game_Action.prototype.classData = function() {
    return this.subject().isActor() ? this.subject().currentClass() : false;
};

Game_Action.prototype.weaponsData = function() {
    return this.subject().isActor() ? this.subject().weapons() : false;
};

Game_Action.prototype.armorsData = function() {
    return this.subject().isActor() ? this.subject().armors() : false;
};

Game_Action.prototype.statesData = function() {
    return this.subject().states();
};

Game_Action.prototype.elementsAverageRate = function(target, elements) {
    if (!elements.length) return 1;
   	var value = 0;
    elements.forEach(function(elementId) {
        value += target.elementRate(elementId);
    });
    return value / elements.length;
};

Game_Action.prototype.elementsAccumlateRate = function(target, elements) {
    if (!elements.length) return 1;
    var value = 1;
    elements.forEach(function(elementId) {
        value *= target.elementRate(elementId);
    });
    return value;
};

Game_Action.prototype.elementsMinRate = function(target, elements) {
    if (!elements.length) return 1;
    return Math.min.apply(null, elements.map(function(elementId) {
        return target.elementRate(elementId);
    }, this));
};

//=============================================================================
// Game_ActionResult
//=============================================================================

FTKR.SEP.Game_ActionResult_isHit = Game_ActionResult.prototype.isHit;
Game_ActionResult.prototype.isHit = function() {
    var result = FTKR.SEP.Game_ActionResult_isHit.call(this);
    if (!result) BattleManager._repeatFailure = true;
    return result;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

FTKR.SEP.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    var result = FTKR.SEP.Game_BattlerBase_meetsSkillConditions.call(this, skill);
    return result && this.isSkillRequiredParamOk(skill) && this.isSkillEtypeOk(skill);
};

Game_BattlerBase.prototype.isSkillRequiredParamOk = function(skill) {
    return true;
};

Game_BattlerBase.prototype.isSkillEtypeOk = function(skill) {
    return true;
};

//書き換え
Game_BattlerBase.prototype.canAttack = function() {
    return this.canUse(this.getSkill(this.attackSkillId()));
};

//書き換え
Game_BattlerBase.prototype.canGuard = function() {
    return this.canUse(this.getSkill(this.guardSkillId()));
};

FTKR.SEP.Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return this._hp >= this.skillHpCost(skill) && 
        FTKR.SEP.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

FTKR.SEP.Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    this._hp -= this.skillHpCost(skill);
    FTKR.SEP.Game_BattlerBase_paySkillCost.call(this, skill);
};

FTKR.SEP.Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    return skill.sepCost && skill.sepCost.mp ?
        Math.floor(this.evalUsedCostValue(skill, skill.sepCost.mp) * this.mcr) :
        FTKR.SEP.Game_BattlerBase_skillMpCost.call(this, skill);
};

FTKR.SEP.Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    return skill.sepCost && skill.sepCost.tp ?
        this.evalUsedCostValue(skill, skill.sepCost.tp) :
        FTKR.SEP.Game_BattlerBase_skillTpCost.call(this, skill);
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
    return skill.sepCost && skill.sepCost.hp ?
        this.evalUsedCostValue(skill, skill.sepCost.hp) : 0;
};

Game_BattlerBase.prototype.evalUsedCostValue = function(skill, formula) {
    try {
        var a = this;
        var v = $gameVariables._data;
        var rate = skill.sepCost.rate;
        var value = Math.max(Math.floor(eval(formula)), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

//=============================================================================
// Game_Battler
//=============================================================================

//書き換え
Game_Battler.prototype.gainHp = function(value) {
    this._result.hpDamage += -value;
    this._result.hpAffected = true;
    this.setHp(this.hp + value);
};

//書き換え
Game_Battler.prototype.gainMp = function(value) {
    this._result.mpDamage += -value;
    this.setMp(this.mp + value);
};

//書き換え
Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage += -value;
    this.setTp(this.tp + value);
};

//=============================================================================
// Game_Item
//=============================================================================

Game_Item.prototype.sepObject = function(subject) {
    if (this.isSkill()) {
        return subject ? subject.getSkill(this._itemId) : $dataSkills[this._itemId];
    } else {
        return this.object();
    }
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.getSkill = function(skillId) {
    return $dataSkills[skillId];
};

Game_Enemy.prototype.isRandomScope = function(skill) {
  return skill.scope > 2 && skill.scope < 7;
};

Game_Enemy.prototype.evalEnabledFormula = function(formula, skill) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

//=============================================================================
// Window_SkillList
//=============================================================================

FTKR.SEP.Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillHpCost(skill) > 0) {
        this.changeTextColor(this.textColor(21));
        this.drawText(this._actor.skillHpCost(skill), x, y, width, 'right');
    } else {
        FTKR.SEP.Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    }
};

//=============================================================================
// Window_Help
//=============================================================================

FTKR.SEP.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (item && item.actorId) {
        var actor = $gameActors.actor(item.actorId);
        var descs = item.descs.filter( function(desc) {
            return actor.evalEnabledFormula(desc.enabled, item);
        });
        var desc = descs.pop();
        this.setText(desc ? desc.description : '');
    } else {
        FTKR.SEP.Window_Help_setItem.call(this, item);
    }
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.displayActionSepResults = function(subject, target) {
    if (target.result().used) {
        this.push('pushBaseLine');
        this.displayCritical(target);
        this.push('popupDamage', target);
        this.displayDamage(target);
        this.displayAffectedStatus(target);
        this.displayFailure(target);
        this.push('waitForNewLine');
        this.push('popBaseLine');
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _SEP_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _SEP_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'SEP') {
        var com = args[0];
        var case0a = /(?:SET)/i;
        var case0b = /(?:RESET)/i;
        var case0c = /(?:ERASE)/i;
        var case0d = /(?:MAKE)/i;
        var case1 = /(?:ACTOR\()(.+)\)/i;
        var case2 = /(?:SKILL\()(.+)\)/i;
        switch (true) {
            // スキルのパラメータを変更する。
            // SEP Set Actor(1) Skill(1) Prop(0) Value(200)
            case case0a.test(com):
                var case3a = /(\D+)\((.+)\)/;
                var case3b = /(\D+)/;
                var case4a = /(?:RATE\()(.+)\)/i;
                var case4b = /(?:COUNT\()(.+)\)/i;
                var case4c = /(?:VALUE\()(.+)\)/i;
                var case4d = /(.+)/;

                if (!args[1].match(case1)) break;
                var actor = $gameActors.actor(this.setNum(RegExp.$1));
                if (!actor || !args[2].match(case2)) break;
                var sepSkill = actor.sepSkill(this.setNum(RegExp.$1));
                if (!sepSkill) break;
                if (args[3].match(case3a)) {
                    var prop = RegExp.$1;
                    if (!sepSkill.hasOwnProperty(prop)) break;
                    var propId = this.setNum(RegExp.$2);
                    var sepProp = sepSkill[prop][propId];
                    if (!sepProp) break;
                    if (args[4].match(case4a) && sepProp.hasOwnProperty('rate')) {
                        sepProp.rate = this.setNum(RegExp.$1);
                    }
                } else if (args[3].match(case3b)) {
                    var prop = RegExp.$1;
                    if (!sepSkill.hasOwnProperty(prop)) break;
                    var sepProp = sepSkill[prop];
                    if (args[4].match(case4a) && sepProp.hasOwnProperty('rate')) {
                        sepProp.rate = this.setNum(RegExp.$1);
                    } else if (args[4].match(case4b) && sepProp.hasOwnProperty('count')) {
                        sepProp.count = this.setNum(RegExp.$1);
                    } else if (args[4].match(case4c)) {
                        sepSkill[prop] = this.setNum(RegExp.$1);
                    } else if (prop === 'name' && args[4].match(case4d)) {
                        sepSkill.name = this.setStr(RegExp.$1);
                    }
                }
                break;
            // アクターの個別スキルデータをリセットする。
            case case0b.test(com):
                if (!args[1].match(case1)) break;
                var actor = $gameActors.actor(this.setNum(RegExp.$1));
                if (!actor || !args[2].match(case2)) break;
                var skillId = this.setNum(RegExp.$1);
                var sepSkill = actor.sepSkill(skillId);
                if (sepSkill) {
                    var index = actor.isSepDataId(sepSkill);
                    actor._sepDataSkills[index] = actor.setSepSkill(skillId);
                }
                break;
            // アクターの個別スキルデータを削除する。
            case case0c.test(com):
                if (!args[1].match(case1)) break;
                var actor = $gameActors.actor(this.setNum(RegExp.$1));
                if (!actor || !args[2].match(case2)) break;
                actor.eraseSepSkill(this.setNum(RegExp.$1));
                break;
            // アクターの個別スキルデータを作成する。
             case case0d.test(com):
                if (!args[1].match(case1)) break;
                var actor = $gameActors.actor(this.setNum(RegExp.$1));
                if (!actor || !args[2].match(case2)) break;
                var skillId = this.setNum(RegExp.$1);
                var sepSkill = actor.sepSkill(skillId);
                if (!sepSkill && actor.isLearnedSkill(skillId)) actor.makeSepSkill(skillId);
                break;
        }
    }
};

Game_Interpreter.prototype.setNum = function(data) {
    var data1 = /v\[(\d+)\]/i;
    var data2 = /(\d+)/i;
    if (data.match(data1)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(data2)) {
        return Number(RegExp.$1);
    } else {
        return 0;
    }
};

Game_Interpreter.prototype.setStr = function(data) {
    var data1 = /v\[(\d+)\]/i;
    var data2 = /(\D+)/i;
    if (data.match(data1)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(data2)) {
        return String(RegExp.$1);
    } else {
        return '';
    }
};

