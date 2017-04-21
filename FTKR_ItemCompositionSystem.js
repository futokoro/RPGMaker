//=============================================================================
// アイテム合成システム
// FTKR_ItemConpositionSystem.js
// 作成者     : フトコロ
// 作成日     : 2017/04/08
// 最終更新日 : 2017/04/14
// バージョン : v0.9.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ICS = true;

var FTKR = FTKR || {};
FTKR.ICS = FTKR.ICS || {};

//=============================================================================
/*:
 * @plugindesc v0.9.2 アイテム合成システム
 * @author フトコロ
 *
 * @param --基本設定--
 * @default
 * 
 * @param Enabled Show Command
 * @desc メニューにアイテム合成コマンドを表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @param Command Name
 * @desc アイテム合成コマンドのコマンド名を設定します。
 * @default アイテム合成
 *
 * @param Show Command Switch ID
 * @desc メニュー欄の表示のON/OFFを制御するスイッチIDを指定します。
 * @default 0
 *
 * @param Show Number Button
 * @desc アイテム数の指定画面でタッチ用ボタンを表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @param Enable Confirmation
 * @desc アイテム合成実行時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 1
 *
 * @param Category Type ID
 * @desc カテゴリータイプを設定した武器タイプIDを設定します。
 * @default 
 *
 * @param --合成成功率の設定--
 * @default
 * 
 * @param Composition Parameter
 * @desc アイテム合成の成功率で参照するパラメータを指定します。
 * 設定しない場合は、アイテムの難易度が成功値になります。
 * @default 
 *
 * @param Success Base Rate
 * @desc 合成難易度とパラメータが一致した時の成功値を設定します。
 * @default 80
 *
 * @param Upper Add Rate
 * @desc 合成難易度よりもパラメータが高い場合の成功補正値を設定します。
 * @default 2
 *
 * @param Downer Reduce Rate
 * @desc 合成難易度よりもパラメータが低い場合の成功補正値を設定します。
 * @default -5
 *
 * @param Max Success Rate
 * @desc 成功値を何分率で計算するか設定します。
 * 成功率 = 成功値 / この値 (最大 10000)
 * @default 100
 *
 * @param Default Difficulty
 * @desc タグで設定しない時に使用する成功率
 * カンマ(,)で区切ること (大成功,成功,失敗)
 * @default 10,40,40
 *
 * @param --合成タイトルウィンドウの設定--
 * @default
 *
 * @param Composit Title Format
 * @desc 合成画面のタイトルの表示内容を設定します。
 * @default \c[16]合成
 * 
 * @param --合成コマンドウィンドウの設定--
 *
 * @param Command List
 * @desc コマンドの表示内容と順番を設定します。
 * カンマ(,)で区切ってください
 * @default action,item,weapon,armor,change,slot,end
 * 
 * @param Select From Materials
 * @desc 「素材から選ぶ」コマンドの表示内容を設定します。
 * @default 素材から選ぶ
 * 
 * @param Select From Resipes
 * @desc 「レシピから選ぶ」コマンドの表示内容を設定します。
 * @default レシピから選ぶ
 * 
 * @param Return Items
 * @desc 「アイテムを戻す」コマンドの表示内容を設定します。
 * @default アイテムを戻す
 * 
 * @param Do Composition
 * @desc 「合成を行う」コマンドの表示内容を設定します。
 * @default 合成を行う
 * 
 * @param End Composition
 * @desc 「合成を止める」コマンドの表示内容を設定します。
 * @default 合成を止める
 * 
 * @param --素材スロットウィンドウの設定--
 * @default
 *
 * @param Slot Title Format
 * @desc 素材スロットウィンドウのタイトル表示内容を設定します。
 * @default \c[16]合成アイテム
 * 
 * @param --スロットウィンドウの設定--
 * @default
 *
 * @param Empty Format
 * @desc 空きスロットの表示名を設定します。
 * @default 未設定
 * 
 * @param Empty Icon
 * @desc 空きスロットのアイコンを設定します。
 * @default 160
 * 
 * @param Return All Slot
 * @desc アイテムをすべて戻すコマンドの表示名を設定します。
 * @default アイテムをすべて戻す
 * 
 * @param --合成情報タイトルウィンドウの設定--
 * @default
 *
 * @param Status Title Format
 * @desc 合成情報ウィンドウのタイトル表示内容を設定します。
 * @default \c[16]合成情報
 * 
 * @param --合成情報タイトルウィンドウの設定--
 * @default
 *
 * @param Unkouwn Item Name
 * @desc 合成結果が不明な場合の表示内容を設定します。
 * @default ？？？？
 * 
 * @param Composit Number Format
 * @desc 合成アイテムの生成数の表示内容を設定します。
 * @default 生成数：
 * 
 * @param --確認ウィンドウの設定(Confirmation Window)--
 * @default
 *
 * @param Conf Title Format
 * @desc アイテム合成時の確認内容を記述します。
 * @default \c[16]合成実行の確認
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param --合成結果ウィンドウの設定--
 * @default
 *
 * @param Result Title Format
 * @desc 合成結果ウィンドウのタイトル表示内容を記述します。
 * @default \c[16]合成結果
 * 
 * @param Result Great Success
 * @desc 大成功時の表示内容を記述します。
 * @default 大成功
 * 
 * @param Result Success
 * @desc 成功時の表示内容を記述します。
 * @default 成功
 * 
 * @param Result Failure
 * @desc 失敗時の表示内容を記述します。
 * @default 失敗
 * 
 * @param Result Lost
 * @desc 消失時の表示内容を記述します。
 * @default 消失
 * 
 * @param Result Item Format
 * @desc 生成したアイテムの表示内容を記述します。
 * @default 
 * 
 * @param Result Ok Format
 * @desc 確認コマンドの表示内容を記述します。
 * @default 確認
 * 
 * @param --合成成功時のSEの設定--
 * @default
 * 
 * @param Success SE Name
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default Sound2
 *
 * @param Success SE Volume
 * @desc アイテム合成実行時に鳴らすSEの音量を指定します。
 * @default 90
 *
 * @param Success SE Pitch
 * @desc アイテム合成実行時に鳴らすSEのピッチを指定します。
 * @default 100
 *
 * @param Success SE Pan
 * @desc アイテム合成実行時に鳴らすSEの位相を指定します。
 * @default 0
 *
 * @param --合成大成功時のSEの設定--
 * @default
 * 
 * @param Great SE Name
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default Flash2
 *
 * @param Great SE Volume
 * @desc アイテム合成実行時に鳴らすSEの音量を指定します。
 * @default 90
 *
 * @param Great SE Pitch
 * @desc アイテム合成実行時に鳴らすSEのピッチを指定します。
 * @default 100
 *
 * @param Great SE Pan
 * @desc アイテム合成実行時に鳴らすSEの位相を指定します。
 * @default 0
 *
 * @param --合成失敗時のSEの設定--
 * @default
 * 
 * @param Failure SE Name
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default Bell1
 *
 * @param Failure SE Volume
 * @desc アイテム合成実行時に鳴らすSEの音量を指定します。
 * @default 90
 *
 * @param Failure SE Pitch
 * @desc アイテム合成実行時に鳴らすSEのピッチを指定します。
 * @default 100
 *
 * @param Failure SE Pan
 * @desc アイテム合成実行時に鳴らすSEの位相を指定します。
 * @default 0
 *
 * @param --合成消失時のSEの設定--
 * @default
 * 
 * @param Lost SE Name
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default Disappointment
 *
 * @param Lost SE Volume
 * @desc アイテム合成実行時に鳴らすSEの音量を指定します。
 * @default 90
 *
 * @param Lost SE Pitch
 * @desc アイテム合成実行時に鳴らすSEのピッチを指定します。
 * @default 100
 *
 * @param Lost SE Pan
 * @desc アイテム合成実行時に鳴らすSEの位相を指定します。
 * @default 0
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、アイテム合成システムを実装するプラグインです。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテム合成画面の設定
 *-----------------------------------------------------------------------------
 * アイテム合成画面は、以下の手段で呼び出します。
 * 
 * 1. メニューから呼び出す。
 * プラグインパラメータ<Enabled Show Command>により、メニュー上にコマンドを
 * 表示させることができます。
 * 
 * コマンド名は、<Command Name>で設定できます。
 * また、<Show Command Switch ID>にID番号を登録することで、メニューへの表示を
 * スイッチで制御できます。
 * 
 *  
 * 2. プラグインコマンドから呼び出す。
 * 以下のプラグインコマンドで画面を表示できます。
 * <ICS Open>
 * <ICS アイテム合成画面表示>
 * 
 * 
 * [その他の設定]
 * 
 * <Show Number Button>
 *     :アイテムを選択後の数値入力時にボタンを表示するか設定します。
 * 
 * <Enable Confirmation>
 *     :アイテム合成実行時に、確認画面を入れるか設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 合成用の素材アイテムの選択について
 *-----------------------------------------------------------------------------
 * 1. 素材から選ぶ場合
 * 
 * 手持ちのアイテム(大事なもの以外)であれば、何にでも合成スロットに
 * 移すことができます。
 * 
 * 合成スロットにある素材アイテムの組み合わせが、設定したレシピに合致して
 * いれば、レシピを覚えていなくても合成することができます。
 * 
 * レシピを覚えていない場合は、合成情報欄は「？？？？」という表示になります。
 * 
 * このとき、成功または大成功、かつ素材スロットのアイテムがレシピと同じ場合に
 * そのレシピを習得します。
 * 
 * レシピを習得した場合、合成情報欄に、合成して出来るアイテムが表示します。
 * 
 * レシピに合致しない組み合わせの場合は、素材スロットのアイテムは消失します。
 * 
 * 
 * 2. レシピから選ぶ場合
 * 
 * レシピを覚えている場合は、レシピから素材アイテムを自動選択することが
 * できます。
 * レシピの中にカテゴリー素材(後述)が含まれている場合、そのカテゴリーの中で
 * 一番ランクが低いアイテムが選ばれます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 合成の成功率について
 *-----------------------------------------------------------------------------
 * 合成の成功率は、合成して出来るアイテムの難易度と、パーティーのパラメータから
 * 算出します。
 * 
 * 1. 成功率の算出
 * 成功率は、以下の計算式で大成功、成功、失敗で個別に算出します。
 * 
 *  成功率 ＝ 成功値 / プラグインパラメータ<Max Success Rate>の設定値
 * 
 *  成功値 ＝ プラグインパラメータ<Success Base Rate>の設定値 + 成功補正値
 * 
 *  成功補正値
 *    (難易度 < パラメータ の場合)
 *    ＝ 差 × <Upper Add Rate>の設定値(正の値)
 * 
 *    (難易度 > パラメータ の場合)
 *    ＝ 差 × <Downer Reduce Rate>の設定値(負の値)
 * 
 * アイテムの合成難易度に対して、パラメータが高ければ成功率は上がり
 * 低い場合は成功率が下がるようになっています。
 * 
 * 
 * 2. 最終的な成功率の算出
 * 最終的に、大成功、成功、失敗、消失のどれになるかについては
 * 以下の計算式から算出します。
 * 
 * 大成功になる確率 ＝ 成功の成功率 × 大成功の成功率
 * 成功になる確率　 ＝ 成功の成功率 - 大成功になる確率
 * 失敗になる確率　 ＝ (1 - 成功の成功率) × 失敗の成功率
 * 消失になる確率　 ＝ (1 - 成功の成功率) - 失敗になる確率
 * 
 * 上の計算式で分かると思いますが、成功の成功率が基準になっています。
 * 
 * 
 * 3. パーティーのパラメータについて
 * プラグインパラメータ<Composition Parameter>で指定したパラメータ式を
 * 使用します。
 * 
 * [パラメータ式 の値について]
 * パラメータ式は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a[x].param - アクターID x のパラメータを参照します。
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * なお、この値を設定しない場合は、最終的な成功率の算出方法が変わります。
 * 
 * 
 * 4. パラメータを設定しない場合の最終的な成功率
 * この場合は、アイテムに設定した難易度がそのまま最終的な成功率になります。
 * 
 * 設定例)
 * <Max Success Rate>の設定値がデフォルト(100)
 * アイテムに以下のように設定した場合
 * 難易度: 10,50,30
 * 
 * 大成功になる確率 ＝ 10 / 100 = 10%
 * 成功になる確率　 ＝ 50 / 100 = 50%
 * 失敗になる確率　 ＝ 30 / 100 = 30%
 * 消失になる確率　 ＝ (100 - (10 + 50 + 30)) / 100 = 10%
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムの設定
 *-----------------------------------------------------------------------------
 * アイテムに対して、アイテム合成システム用の設定を追加します。
 * 
 * アイテムの設定には、以下のノートタグを入力します。
 * 
 * <ICS カテゴリー: カテゴリー名>
 *    :アイテムのカテゴリーを、'カテゴリー名'に設定します。
 *    :レシピに特定のアイテムではなく、カテゴリーを指定すると、
 *    :同じカテゴリーのアイテムであればどれでも使用できるようになります。
 *    :なおすべてのアイテムは、デフォルトカテゴリーが設定されます。
 * 
 * <ICS ランク: x>
 *    :アイテムのランクを、x に設定します。
 *    :合成後にできるアイテムのランクは、素材に使用したアイテムのランクの
 *    :平均値です。
 *    :ランク 0 のアイテムは、ランク計算には使いません。
 *    :このタグを設定しない場合は、ランク 0 と見なします。
 * 
 * <ICS 合成アイテム>
 *    :このタグをつけたアイテムは、以下のように扱います。
 *    : 1. このアイテムのカテゴリー設定は無効です。
 * 
 * <ICS レシピ>
 * 内容
 * </ICS レシピ>
 *    :アイテムに対してレシピを設定します。
 *    :内容については後述します。
 *    :複数のタグを入力することで、一つのアイテムに対して複数のレシピを
 *    :設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * デフォルトカテゴリーについて
 *-----------------------------------------------------------------------------
 * すべてのアイテムは、デフォルトカテゴリーが設定されています。
 * 分類がアイテムの場合は、「アイテム」カテゴリー
 * 武器の場合は「武器」カテゴリー、防具の場合は「防具」カテゴリーです。
 * 
 * これらのカテゴリーをレシピに設定すると、例えば武器カテゴリーなら
 * すべての武器が対象になります。
 * 
 * ただし、「合成アイテム」タグをつけたアイテムは、設定が除外されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 合成カテゴリーの設定
 *-----------------------------------------------------------------------------
 * アイテムやレシピで使用する合成カテゴリーを設定します。
 * 合成カテゴリーは、武器で作成します。
 * 
 * まず、武器タイプに合成カテゴリー用のIDを設定してください。
 * そのIDをプラグインパラメータ<Category Type ID>に設定してください。
 * 
 * 合成カテゴリーとして設定する項目は以下の通りです。
 * 
 * 1. 名前
 * アイテムやレシピで使用するカテゴリー名を設定してください。
 * 
 * 2. アイコン
 * 合成画面で表示するアイコンを設定してください。
 * 
 * 3. 武器タイプ
 * 武器タイプには、先ほど設定した合成カテゴリー用の武器タイプを
 * 設定してください。
 * 
 * 4. メモ欄
 * 合成カテゴリーの設定には、以下のノートタグを入力します。
 * 
 * <ICS アイテム>
 * <ICS 武器>
 * <ICS 防具>
 *    :合成カテゴリーの分類を設定します。
 *    :設定しない場合は、アイテムと見なします。
 * 
 * <ICS 特殊合成>
 *    :合成結果が通常の合成と変わります。
 *    :詳しくは特殊合成を参照してください。
 * 
 * <ICS レシピ>
 * 内容
 * </ICS レシピ>
 *    :カテゴリーに対してレシピを設定します。
 *    :内容については後述します。
 *    :複数のタグを入力することで、一つのアイテムに対して複数のレシピを
 *    :設定できます。
 *    :このレシピによって出来上がるアイテムは、このレシピを設定した
 *    :合成カテゴリーに属するアイテムの内、生成後のランクと同じランクの
 *    :アイテムが選ばれます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムレシピの設定
 *-----------------------------------------------------------------------------
 * アイテム合成システムを利用するためには、アイテムレシピの設定が必要です。
 * レシピは、一つのアイテムやカテゴリーに対して複数設定することができます。
 *
 * アイテムレシピは、以下のノートタグで設定を行います。
 * 対象：アイテム、武器、防具
 * 
 * <ICS レシピ>
 * code
 * </ICS レシピ>
 * 
 * [code に使用できる項目]
 * 生成数: y
 *    :合成でできあがるアイテムの数を y に設定します。
 * 
 * アイテム[x]: y
 *    :アイテムID x のアイテムを y 個使用します。
 * 
 * 武器[x]: y
 *    :武器ID x のアイテムを y 個使用します。
 * 
 * 防具[x]: y
 *    :防具ID x のアイテムを y 個使用します。
 * 
 * アイテム名: y
 *    :アイテム名のアイテムを y 個使用します。
 * 
 * カテゴリー カテゴリー名: y
 *    :'カテゴリー名'に属するアイテムを y 個使用します。(*1)
 * 
 * 難易度: x, y, z
 *    :合成の難易度を数値で設定します。
 *    :成功の難易度が x、大成功が y、失敗が z です。
 * 
 * 大成功: 内容
 * 失敗: 内容
 *    :大成功および失敗時の合成アイテムの内容を設定します。
 *    :以下の内容から選んで入力してください。
 *    : 生成数変更(x)
 *    :    - 生成数を変更します。負の値の場合は減ります。
 *    : ランク変更(x)
 *    :    - 生成後のアイテムのランクを変更します。負の値の場合は減ります。
 *    :      ランクが減ったことで 0 になる、またはそのランク以下のアイテムが
 *    :      ない場合は、何も生成しません。
 *    : カテゴリー変更(カテゴリー名)
 *    :    - 生成後のアイテムのカテゴリーを変更します。
 *    :      変更後のカテゴリーの同ランクのアイテムになります。
 *    : アイテム変更(アイテム名)
 *    :    - ランクやカテゴリーを無視して、指定したアイテムに変更します。
 *    : なし
 *    :    - 何も生成しません。生成数を 0 に変更します。
 * 
 * 必要条件: 条件式
 *    :成功および大成功するために必要な条件を設定します。
 *    :この条件に満たない場合は、必ず失敗、または消失になります。
 * 
 * [条件式 の値について]
 * 条件式は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a[x].param - アクターID x のパラメータを参照します。
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 特殊合成について
 *-----------------------------------------------------------------------------
 * 合成カテゴリーに特殊合成タグを設定すると、この特殊合成になります。
 * 通常の合成とは異なり、合成仕様が変わります。
 * 
 * 素材に使用できるアイテム分類は「武器」および「防具」だけです。
 * 
 * 1. レシピの一つ目に設定した素材をベースアイテムとします。
 * 2. レシピの二つ目以降に設定した素材を付加アイテムとします。
 *    なお、「合成アイテム」タグをつけたアイテムは除きます。
 * 3. 合成してできるアイテムは、以下の仕様のオリジナルアイテムです。
 *    このアイテムはデータベース上に無いアイテムです。
 * 4. 特殊合成は、レシピから選ぶことはできません。
 * 5. 特殊合成は、ランク変更、カテゴリー変更、アイテム変更は選べません。
 * 
 * ＜オリジナルアイテムの仕様＞
 * 1. アイテム分類および基本設定は、ベースアイテムと同じです。
 * 
 * 2. 合成により、付加アイテムの能力値、または特徴をベースアイテムに付与します。
 * 
 * 3. 付与する能力の数は、生成数に従います。
 *    生成数が 0 以下の場合は、何も付与しません。
 * 
 * 4. ベースアイテムと同じ見た目ですが、ベースアイテムとは別物です。
 *    アイテムIDが異なりますので、武器・防具の所持数を取得する場合に
 *    別アイテムとして数えます。
 * 
 * 5. オリジナルアイテムの名前は、「ベースアイテム名(+合成回数)」になります。
 *    例）ベースアイテムがショートソードで、合成回数が1回の場合
 *        ショートソード(+1)
 *        になります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 合成コマンドの表示順について
 *-----------------------------------------------------------------------------
 * 合成コマンドで表示するコマンドの表示項目と順番は
 * プラグインパラメータ<Command List>の設定で変更できます。
 * 
 * 以下の文字列を入力した順番にコマンドを上から表示します。
 * 入力する文字列は、必ず小文字にしてください。
 * 
 * action :合成を実行するコマンド
 * item   :アイテム分類の選択コマンド
 * weapon :武器分類の選択コマンド
 * armor  :防具分類の選択コマンド
 * change :右側のアイテムウィンドウに、アイテムを表示するか、
 *         レシピを表示するか変えるコマンド
 * slot   :素材スロットのアイテムを戻すコマンド
 * end    :合成を止めるコマンド
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドが使用できます。
 * 
 * 1. アイテム合成画面の表示
 * ICS Open
 * ICS アイテム合成画面表示
 * 
 * 
 * 2. レシピを追加
 * ICS ADD_RECIPE ITEMNAME RecipeId
 * ICS ADD_RECIPE ITEM ItemId RecipeId 
 * ICS レシピ追加 アイテム名 レシピID
 * ICS レシピ追加 アイテム アイテムID レシピID
 *    :'アイテム'部は、武器の場合は'武器'、防具の場合は'防具'と入力します。
 *    :指定したアイテムのレシピを覚えます。
 *    :アイテム名や、アイテム、アイテムID部に、v[n]と入力することで、
 *    :ゲーム内変数ID n の内容を参照できます。
 *    :レシピIDを入力しない場合は、指定したアイテムの1つめのレシピになります。
 *    :
 *    :入力例) アイテムID11 がポーションの場合、以下は同じ結果になります。
 *    : ICS レシピ追加 ポーション 1
 *    : ICS レシピ追加 アイテム 11 1
 * 
 * 
 * 3. レシピの削除
 * ICS REDUCE_RECIPE ITEMNAME RecipeId
 * ICS REDUCE_RECIPE ITEM ItemId RecipeId
 * ICS レシピ削除 アイテム名 レシピID
 * ICS レシピ削除 アイテム アイテムID レシピID
 *    :'アイテム'部は、武器の場合は'武器'、防具の場合は'防具'と入力します。
 *    :指定したアイテムのレシピを忘れます。
 *    :アイテム名や、アイテム、アイテムID部に、v[n]と入力することで、
 *    :ゲーム内変数ID n の内容を参照できます。
 *    :レシピIDを入力しない場合は、指定したアイテムの1つめのレシピになります。
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

 * v0.9.2 - 2017/04/14 : 機能追加
 *    1. 特殊合成を追加。
 * 
 * v0.9.1 - 2017/04/13 : 不具合修正、機能追加
 *    1. 起動できないエラーを修正
 *    2. 投入したアイテムが何のレシピにも該当しない場合に、合成結果が消失に
 *       なるように処理を追加。
 *    2. デフォルトカテゴリーとして「アイテム」「武器」「防具」追加
 * 
 * v0.9.0 - 2017/04/08 : 試作版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ICS.parameters = PluginManager.parameters('FTKR_ItemCompositionSystem');

//基本設定
FTKR.ICS.basic = {
    showCmd:Number(FTKR.ICS.parameters['Enabled Show Command'] || 0),
    cmdName:String(FTKR.ICS.parameters['Command Name'] || 'アイテム合成'),
    categoryId:Number(FTKR.ICS.parameters['Category Type ID'] || 0),
    menuSwId:Number(FTKR.ICS.parameters['Show Command Switch ID'] || 0),
    enableConf:Number(FTKR.ICS.parameters['Enable Confirmation'] || 0),
    showButton:Number(FTKR.ICS.parameters['Show Number Button'] || 0),
    varId:{
        itemId:Number(FTKR.ICS.parameters['Variables Get ItemId'] || 0),
        itemClass:Number(FTKR.ICS.parameters['Variables Get ItemClass'] || 0),
    },
};

//合成成功率の設定
FTKR.ICS.success = {
    param:String(FTKR.ICS.parameters['Composition Parameter'] || ''),
    baseRate:Number(FTKR.ICS.parameters['Success Base Rate'] || ''),
    upRate:Number(FTKR.ICS.parameters['Upper Add Rate'] || ''),
    downRate:Number(FTKR.ICS.parameters['Downer Reduce Rate'] || ''),
    maxRate:Number(FTKR.ICS.parameters['Max Success Rate'] || ''),
    defaultDifficulty:String(FTKR.ICS.parameters['Default Difficulty'] || ''),
};

//合成タイトルウィンドウ設定
FTKR.ICS.compositTitle = {
    format:String(FTKR.ICS.parameters['Composit Title Format'] || ''),
};

//合成コストウィンドウ設定
FTKR.ICS.cost = {
    format:String(FTKR.ICS.parameters['Composit Cost Format'] || ''),
};

//合成コマンド設定
FTKR.ICS.command = {
    maxCols:Number(FTKR.ICS.parameters['Category Window MaxCols'] || 1),
    list:String(FTKR.ICS.parameters['Command List'] || ''),
    format:{
        material:String(FTKR.ICS.parameters['Select From Materials'] || ''),
        recipe:String(FTKR.ICS.parameters['Select From Resipes'] || ''),
        slot:String(FTKR.ICS.parameters['Return Items'] || ''),
        action:String(FTKR.ICS.parameters['Do Composition'] || ''),
        end:String(FTKR.ICS.parameters['End Composition'] || ''),
    },
};

//素材スロットタイトルウィンドウ設定
FTKR.ICS.slotTitle = {
    format:String(FTKR.ICS.parameters['Slot Title Format'] || ''),
};

//素材スロットウィンドウ設定
FTKR.ICS.slot = {
    emptyIcon:String(FTKR.ICS.parameters['Empty Icon'] || ''),
    emptyFormat:String(FTKR.ICS.parameters['Empty Format'] || ''),
    return:String(FTKR.ICS.parameters['Return All Slot'] || ''),
};

//合成情報タイトルウィンドウ設定
FTKR.ICS.statusTitle = {
    format:String(FTKR.ICS.parameters['Status Title Format'] || ''),
};

//合成情報ウィンドウ設定
FTKR.ICS.status = {
    unkouwn:String(FTKR.ICS.parameters['Unkouwn Item Name'] || ''),
    number:String(FTKR.ICS.parameters['Composit Number Format'] || ''),
};

//確認ウィンドウ設定
FTKR.ICS.confTitle = {
    format:String(FTKR.ICS.parameters['Conf Title Format'] || ''),
};
FTKR.ICS.conf = {
    okFormat:String(FTKR.ICS.parameters['Confirmation Ok Format'] || ''),
    cancelFormat:String(FTKR.ICS.parameters['Confirmation Cancel Format'] || ''),
};

//合成結果ウィンドウ設定
FTKR.ICS.result = {
    format:String(FTKR.ICS.parameters['Result Title Format'] || ''),
    great:String(FTKR.ICS.parameters['Result Great Success'] || ''),
    success:String(FTKR.ICS.parameters['Result Success'] || ''),
    failure:String(FTKR.ICS.parameters['Result Failure'] || ''),
    lost:String(FTKR.ICS.parameters['Result Lost'] || ''),
    item:String(FTKR.ICS.parameters['Result Item Format'] || ''),
    okFormat:String(FTKR.ICS.parameters['Result Ok Format'] || ''),
};

//SE
FTKR.ICS.systemSe = {
    success:{
        name:String(FTKR.ICS.parameters['Success SE Name'] || 'Sound2'),
        volume:Number(FTKR.ICS.parameters['Success SE Volume'] || 0),
        pitch:Number(FTKR.ICS.parameters['Success SE Pitch'] || 0),
        pan:Number(FTKR.ICS.parameters['Success SE Pan'] || 0),
    },
    great:{
        name:String(FTKR.ICS.parameters['Great SE Name'] || 'Sound2'),
        volume:Number(FTKR.ICS.parameters['Great SE Volume'] || 0),
        pitch:Number(FTKR.ICS.parameters['Great SE Pitch'] || 0),
        pan:Number(FTKR.ICS.parameters['Great SE Pan'] || 0),
    },
    failure:{
        name:String(FTKR.ICS.parameters['Failure SE Name'] || 'Sound2'),
        volume:Number(FTKR.ICS.parameters['Failure SE Volume'] || 0),
        pitch:Number(FTKR.ICS.parameters['Failure SE Pitch'] || 0),
        pan:Number(FTKR.ICS.parameters['Failure SE Pan'] || 0),
    },
    lost:{
        name:String(FTKR.ICS.parameters['Lost SE Name'] || 'Sound2'),
        volume:Number(FTKR.ICS.parameters['Lost SE Volume'] || 0),
        pitch:Number(FTKR.ICS.parameters['Lost SE Pitch'] || 0),
        pan:Number(FTKR.ICS.parameters['Lost SE Pan'] || 0),
    },
};

Window_Base.SUCCESS_CORRECTION_RANK = 1;
Window_Base.SUCCESS_CORRECTION_CATEGORY = 2;
Window_Base.SUCCESS_CORRECTION_NUMBER = 3;
Window_Base.SUCCESS_CORRECTION_ITEM = 4;

Window_Base.SUCCESS_MAX_RATE = FTKR.ICS.success.maxRate.clamp(0, 10000);

FTKR.ICS.DATABASE_ITEMS_NUMBER = 0;
FTKR.ICS.DATABASE_WEAPONS_NUMBER = 0;
FTKR.ICS.DATABASE_ARMORS_NUMBER = 0;

//配列を複製する
function copyArray(arr) {
    var newArr = [];
    arr.forEach(function(data, prop) {
        if (data instanceof Object) {
            if (data instanceof Array) {
                newArr[prop] = copyArray(data);
            } else {
                newArr[prop] = copyObject(data);
            }
        } else {
            newArr[prop] = data;
        }
    });
    return newArr;
};

//オブジェクトを複製する
function copyObject(obj) {
    var newObj = {};
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
        var data = obj[prop];
        if (data instanceof Object) {
            if (data instanceof Array) {
                newObj[prop] = copyArray(data);
            } else {
                newObj[prop] = copyObject(data);
            }
        } else {
            newObj[prop] = data;
        }
    });
    return newObj;
};

//=============================================================================
// Array
//=============================================================================

Array.prototype.searchProperty = function(props) {
    return this.filter( function(item) {
        return item && props.every( function(prop) {
            return item.hasOwnProperty(prop[0]) && item[prop[0]] === prop[1];
        });
    });
};

//配列の要素を、すべて数値に変換する。
Array.prototype.num = function() {
  return this.map(function(elm) {
      return Number(elm);
  });
}

//find を追加
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

//findIndex を追加
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

//=============================================================================
// DataManager
//=============================================================================

FTKR.ICS.DatabaseLoaded = false;
FTKR.ICS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.ICS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.ICS.DatabaseLoaded) {
        this.icsIcsCategoryNoteTags($dataWeapons);
        this.icsCompositionNotetags($dataItems);
        this.icsCompositionNotetags($dataWeapons);
        this.icsCompositionNotetags($dataArmors);
        FTKR.ICS.DATABASE_ITEMS_NUMBER = $dataItems.length;
        FTKR.ICS.DATABASE_WEAPONS_NUMBER = $dataWeapons.length;
        FTKR.ICS.DATABASE_ARMORS_NUMBER = $dataArmors.length;
        FTKR.ICS.DatabaseLoaded = true;
    }
    return true;
};

DataManager.icsIcsCategoryNoteTags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        if (this.isIcsCategory(obj)) {
            var case3 = /<ICS ITEM>/i;
            var case3j = /<ICS アイテム>/i;
            var case4 = /<ICS WEAPON>/i;
            var case4j = /<ICS 武器>/i;
            var case5 = /<ICS ARMOR>/i;
            var case5j = /<ICS 防具>/i;
            var case6a = /<ICS RECIPES>/i;
            var case6aj = /<ICS レシピ>/i;
            var case6b = /<\/ICS RECIPES>/i;
            var case6bj = /<\/ICS レシピ>/i;

            var notedata = obj.note.split(/[\r\n]+/);
            var setMode = 'none';
            obj.icsDatas = [];
            obj.ics = new Game_Composit();
            obj.ics.setDataClass('item');

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if(line.match(case3) || line.match(case3j)) {
                    obj.ics.setDataClass('item');
                } else if(line.match(case4) || line.match(case4j)) {
                    obj.ics.setDataClass('weapon');
                } else if(line.match(case5) || line.match(case5j)) {
                    obj.ics.setDataClass('armor');
                } else if (case6a.test(line) || case6aj.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (case6b.test(line) || case6bj.test(line)) {
                    setMode = 'none';
                    obj.icsDatas.push(text);
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setIcsRecipes(obj);
        }
    }
};

DataManager.icsCompositionNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        if (!this.isIcsCategory(obj)) {
            var case1 = /<ICS CATEGORY:[ ]*(.+)>/i;
            var case1j = /<ICS カテゴリー:[ ]*(.+)>/i;
            var case2 = /<ICS RANK:[ ]*(\d+)>/i;
            var case2j = /<ICS ランク:[ ]*(\d+)>/i;
            var case6a = /<ICS RECIPES>/i;
            var case6aj = /<ICS レシピ>/i;
            var case6b = /<\/ICS RECIPES>/i;
            var case6bj = /<\/ICS レシピ>/i;

            var notedata = obj.note.split(/[\r\n]+/);
            var setMode = 'none';
            obj.icsDatas = [];
            obj.ics = new Game_Composit();
            obj.compositCount = 0;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if(line.match(case1) || line.match(case1j)) {
                    obj.ics.setCategory(RegExp.$1);
                } else if(line.match(case2) || line.match(case2j)) {
                    obj.ics.setRank(Number(RegExp.$1));
                } else if (case6a.test(line) || case6aj.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (case6b.test(line) || case6bj.test(line)) {
                    setMode = 'none';
                    obj.icsDatas.push(text);
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setIcsRecipes(obj);
        }
    }
};

DataManager.setIcsRecipes = function(obj) {
    var icsdatas = obj.icsDatas;
    for (var t = 0; t < icsdatas.length; t++) {
        var icsdata = icsdatas[t];
        if (icsdata) {
            var case1 = /ITEM\[(\d+)\]:[ ]*(\d+)/i;
            var case1j = /アイテム\[(\d+)\]:[ ]*(\d+)/i;
            var case2 = /WEAPON\[(\d+)\]:[ ]*(\d+)/i;
            var case2j = /武器\[(\d+)\]:[ ]*(\d+)/i;
            var case3 = /ARMOR\[(\d+)\]:[ ]*(\d+)/i;
            var case3j = /防具\[(\d+)\]:[ ]*(\d+)/i;
            var case4 = /CATEGORY[ ](.+):[ ]*(\d+)/i;
            var case4j = /カテゴリー[ ](.+):[ ]*(\d+)/i;
            var case5 = /NUNBER:[ ]*(\d+)/i;
            var case5j = /生成数:[ ]*(\d+)/i;
            var case6 = /GREAT SUCCESS:[ ]*(.+)/i;
            var case6j = /大成功:[ ]*(.+)/i;
            var case7 = /FAILURE:[ ]*(.+)/i;
            var case7j = /失敗:[ ]*(.+)/i;
            var case8 = /REQUIRED:[ ]*(.+)/i;
            var case8j = /必要条件:[ ]*(.+)/i;
            var case9 = /DIFFICULTY:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case9j = /難易度:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case0 = /(.+):[ ]*(\d+)/;

            var datas = icsdata.split(';');
            var recipe = new Game_IcsRecipe();
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.match(case1) || data.match(case1j)) {
                    var material = new Game_Material(0, 'item', Number(RegExp.$1), Number(RegExp.$2));
                    recipe.addMaterial(material);
                } else if (data.match(case2) || data.match(case2j)) {
                    var material = new Game_Material(0, 'weapon', Number(RegExp.$1), Number(RegExp.$2));
                    recipe.addMaterial(material);
                } else if (data.match(case3) || data.match(case3j)) {
                    var material = new Game_Material(0, 'armor', Number(RegExp.$1), Number(RegExp.$2));
                    recipe.addMaterial(material);
                } else if (data.match(case4) || data.match(case4j)) {
                    var material = new Game_Material(RegExp.$1, '', 0, Number(RegExp.$2));
                    recipe.addMaterial(material);
                } else if (data.match(case5) || data.match(case5j)) {
                    recipe._number = Number(RegExp.$1);
                } else if (data.match(case6) || data.match(case6j)) {
                    recipe._great = RegExp.$1;
                } else if (data.match(case7) || data.match(case7j)) {
                    recipe._failure = RegExp.$1;
                } else if (data.match(case8) || data.match(case8j)) {
                    recipe._required = RegExp.$1;
                } else if (data.match(case9) || data.match(case9j)) {
                    var rates = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    recipe.setDifficulty(rates);
                } else if (data.match(case0)) {
                    var itemName = RegExp.$1;
                    var number = Number(RegExp.$2);
                    var item = this.searchItemName(itemName);
                    if (item) {
                        var material = new Game_Material(0, this.itemDataClass(item), item.id, number);
                        recipe.addMaterial(material);
                    }
                }
            }
            obj.ics.addRecipe(recipe);
        }
        obj.icsDatas = [];
    }
};

FTKR.ICS.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = FTKR.ICS.DataManager_makeSaveContents.call(this);
    if (FTKR.ICS.DATABASE_ITEMS_NUMBER < $dataItems.length) {
        contents.icsItemDatas = $dataItems.slice(FTKR.ICS.DATABASE_ITEMS_NUMBER);
    }
    if (FTKR.ICS.DATABASE_WEAPONS_NUMBER < $dataWeapons.length) {
        contents.icsWeaponDatas = $dataWeapons.slice(FTKR.ICS.DATABASE_WEAPONS_NUMBER);
    }
    if (FTKR.ICS.DATABASE_ARMORS_NUMBER < $dataArmors.length) {
        contents.icsArmorDatas = $dataArmors.slice(FTKR.ICS.DATABASE_ARMORS_NUMBER);
    }
    return contents;
};

FTKR.ICS.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    FTKR.ICS.DataManager_extractSaveContents.call(this, contents);
    if (contents.icsItemDatas) {
        $dataItems = $dataItems.concat(contents.icsItemDatas);
    }
    if (contents.icsWeaponDatas) {
        $dataWeapons = $dataWeapons.concat(contents.icsWeaponDatas);
    }
    if (contents.icsArmorDatas) {
        $dataArmors = $dataArmors.concat(contents.icsArmorDatas);
    }
};

DataManager.isIcsCategory = function(item) {
    return this.isWeapon(item) && item.wtypeId === FTKR.ICS.basic.categoryId;
};

DataManager.itemDataClass = function(item) {
    if (this.isItem(item)) {
        return 'item';
    } else if (this.isWeapon(item)) {
        return 'weapon';
    } else if (this.isArmor(item)) {
        return 'armor';
    } else {
        return undefined;
    }
};

DataManager.convertDefaultCategory = function(category) {
    if (category.match(/^アイテム$/i) || category.match(/^ITEM$/i)) {
        return 'item';
    } else if (category.match(/^武器$/i) || category.match(/^WEAPON$/i)) {
        return 'weapon';
    } else if (category.match(/^防具$/i) || category.match(/^ARMOR$/i)) {
        return 'armor';
    } else {
        return category;
    }
}

DataManager.convertItem = function(dataClass, itemId) {
    if (!itemId) return null;
    switch (dataClass) {
        case 'item':
            return $dataItems[itemId];
        case 'weapon':
            return $dataWeapons[itemId];
        case 'armor':
            return $dataArmors[itemId];
        default:
            return null;
    }
};

DataManager.searchItemName = function(itemName) {
    var name = ['name', itemName];
    var item = this.searchItems(name);
    if (!item.length) {
        item = this.searchWeapons(name);
    }
    if (!item.length) {
        item = this.searchArmors(name);
    }
    return item.length ? item[0] : null;
};

DataManager.searchItems = function() {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    return $dataItems.searchProperty(args);
};

DataManager.searchWeapons = function() {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    return $dataWeapons.searchProperty(args);
};

DataManager.searchArmors = function() {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    return $dataArmors.searchProperty(args);
};

DataManager.changeItemRank = function(item, addRank) {
    var category = item.ics.category();
    if (!category) return item;
    var items = this.searchCategoryAllItems(category);
    items = this.sortItemsRank(items);
    return items.length ? this.findSomeRank(items, item.ics.rank() + addRank) : item;
};

DataManager.changeItemCategory = function(item, category) {
    var items = this.searchCategoryAllItems(category);
    return items.length ? this.findSomeRank(items, item.ics.rank()) : item;
};

DataManager.convertCategoryItem = function(item, rank) {
    if (!this.isIcsCategory(item)) return item;
    return this.findSomeRank(this.searchCategoryAllItems(item.name), rank);
};

DataManager.searchCategoryItems = function(datas, category) {
    return datas.filter( function(item) {
        if (!item) return false;
        var notComp = (/<ICS 合成アイテム>/i).test(item.note);
        return !notComp && (item.ics.category() === category ||
            this.itemDataClass(item) === this.convertDefaultCategory(category));
    },this);
};

DataManager.searchCategoryAllItems = function(category) {
    return this.searchCategoryItems($dataItems, category).concat(
        this.searchCategoryItems($dataWeapons, category),
        this.searchCategoryItems($dataArmors, category)
    );
};

DataManager.findSomeRank = function(items,rank) {
    return this.sortItemsRank(items).find( function(item) {
        return item && item.ics.rank() <= rank;
    });
};

//ランクが大きい順にソート
DataManager.sortItemsRank = function(items) {
    return items.sort( function(a, b){
        if( a.ics.rank() > b.ics.rank() ) return -1;
        if( a.ics.rank() < b.ics.rank() ) return 1;
        return 0;
    });
};

//=============================================================================
// Game_Composit
//=============================================================================

function Game_Composit() {
    this.initialize.apply(this, arguments);
}

Game_Composit.prototype.initialize = function() {
    this._category = '';
    this._rank = 0;
    this._dataClass = '';
    this._recipes = [];
};

Game_Composit.prototype.category = function() {
    return this._category;
};

Game_Composit.prototype.rank = function() {
    return this._rank;
};

Game_Composit.prototype.dataClass = function() {
    return this._dataClass;
};

Game_Composit.prototype.recipes = function() {
    return this._recipes;
};

Game_Composit.prototype.recipe = function(index) {
    return this._recipes[index];
};

Game_Composit.prototype.setCategory = function(category) {
    this._category = category;
};

Game_Composit.prototype.setRank = function(rank) {
    this._rank = rank;
};

Game_Composit.prototype.setDataClass = function(dataClass) {
    this._dataClass = dataClass;
};

Game_Composit.prototype.addRecipe = function(recipe) {
    this._recipes.push(recipe);
};

//=============================================================================
// Game_IcsRecipe
//=============================================================================

function Game_IcsRecipe() {
    this.initialize.apply(this, arguments);
}

Game_IcsRecipe.prototype.initialize = function() {
    this._required = '';
    this._materials = [];
    this._number = 0;
    this._great = '';
    this._failure = '';
    this._difficulty = {};
    this.setDefault();
};

Game_IcsRecipe.prototype.setDefault = function() {
    this._number = 1;
    this.setDifficulty(FTKR.ICS.success.defaultDifficulty.split(',').num());
};

Game_IcsRecipe.prototype.setDifficulty = function(datas) {
    this._difficulty = {
        great:datas[0],
        success:datas[1],
        failure:datas[2],
    };
};

Game_IcsRecipe.prototype.addMaterial = function(material) {
    this._materials.push(material);
};

Game_IcsRecipe.prototype.required = function() {
    return this._required;
};

Game_IcsRecipe.prototype.materials = function() {
    return this._materials;
};

Game_IcsRecipe.prototype.number = function() {
    return this._number;
};

Game_IcsRecipe.prototype.great = function() {
    return this._great;
};

Game_IcsRecipe.prototype.failure = function() {
    return this._failure;
};

Game_IcsRecipe.prototype.difficulty = function() {
    return this._difficulty;
};

//=============================================================================
// Game_Material
//=============================================================================

function Game_Material() {
    this.initialize.apply(this, arguments);
}

Game_Material.prototype.initialize = function(category, dataClass, itemId, number) {
    this._category = category || '';
    this._dataClass = dataClass || '';
    this._itemId = itemId || 0;
    this._number = number || 0;
};

Game_Material.prototype.category = function() {
    return this._category;
};

Game_Material.prototype.dataClass = function() {
    return this._dataClass;
};

Game_Material.prototype.itemId = function() {
    return this._itemId;
};

Game_Material.prototype.number = function() {
    return this._number;
};

Game_Material.prototype.item = function() {
    var item = DataManager.convertItem(this.dataClass(), this.itemId());
    if (item) return item;
    return this.category() ? $gameParty.matchCategoryItem(this) : null;
};

Game_Material.prototype.matchMaterial = function(material) {
    return (this.category() && this.matchMaterialCategory(material)) ||
        (!this.category() && this.matchDataClass(material) && this.matchItemId(material));
};

Game_Material.prototype.lowerMaterialNumber = function(material) {
    return this.matchMaterial(material) && this.number() <= material.number();
};

Game_Material.prototype.matchMaterialCategory = function(material) {
    return this.matchCategory(material.dataClass(), material.category());
};

Game_Material.prototype.matchCategory = function(dataClass, category) {
    var arg = this.category();
    if (arg.match(/^アイテム$/i) || arg.match(/^ITEM$/i)) {
        return 'item' === dataClass;
    } else if (arg.match(/^武器$/i) || arg.match(/^WEAPON$/i)) {
        return 'weapon' === dataClass;
    } else if (arg.match(/^防具$/i) || arg.match(/^ARMOR$/i)) {
        return 'armor' === dataClass;
    } else {
        return this.category() === category;
    }
};

Game_Material.prototype.matchDataClass = function(material) {
    return this.dataClass() === material.dataClass();
};

Game_Material.prototype.matchItemId = function(material) {
    return this.itemId() === material.itemId();
};

//=============================================================================
// Game_IcsRecipeBook
//=============================================================================

function Game_IcsRecipeBook() {
    this.initialize.apply(this, arguments);
}

Game_IcsRecipeBook.prototype.initialize = function(dataClass, itemId, typeId) {
    this._dataClass = dataClass || '';
    this._itemId = itemId || 0;
    this._typeId = typeId || 0;
};

Game_IcsRecipeBook.prototype.dataClass = function() {
    return this._dataClass;
};

Game_IcsRecipeBook.prototype.itemId = function() {
    return this._itemId;
};

Game_IcsRecipeBook.prototype.typeId = function() {
    return this._typeId;
};

Game_IcsRecipeBook.prototype.item = function() {
    return DataManager.convertItem(this.dataClass(), this.itemId());
};

Game_IcsRecipeBook.prototype.matchRecipe = function(dataClass, itemId, typeId) {
    return this._dataClass === dataClass && this._itemId === itemId && this._typeId === typeId;
};

//=============================================================================
// Game_Party
//=============================================================================

FTKR.ICS.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    FTKR.ICS.Game_Party_initialize.call(this);
    this._recipes = [];
    this._recipes.push(null);
};

Game_Party.prototype.recipes = function() {
    return this._recipes;
};

//レシピを覚えていたら、レシピ番号を返す
Game_Party.prototype.hasRecipe = function(dataClass, itemId, typeId) {
    return this._recipes.findIndex(function (recipe) {
        return recipe && recipe.matchRecipe(dataClass, itemId, typeId);
    });
};

//レシピを追加する
Game_Party.prototype.addRecipe = function(dataClass, itemId, typeId) {
    if (this.hasRecipe(dataClass, itemId, typeId) < 0) {
        this._recipes.push(new Game_IcsRecipeBook(dataClass, itemId, typeId));
    }
};

//レシピを削除する
Game_Party.prototype.reduceRecipe = function(dataClass, itemId, typeId) {
    var index = this.hasRecipe(dataClass, itemId, typeId);
    if (index > 0) this._recipes.splice(index, 1);
};

//指定した素材とカテゴリーが同じ手持ちアイテムのリストを返す
Game_Party.prototype.someCategoryAllItems = function(material) {
    return this.allItems().filter( function(item) {
        var notComp = (/<ICS 合成アイテム>/i).test(item.note);
        return !notComp && material.matchCategory(DataManager.itemDataClass(item), item.ics.category());
    });
};

//指定した素材を必要数以上もっているか
//持っている場合、そのアイテムデータを返す
Game_Party.prototype.matchCategoryItem = function(material) {
    return this.someCategoryAllItems(material).find( function(item) {
        return this.numItems(item) >= material.number();
    },this);
};

//指定したレシピと製作員数に必要なアイテムを持っているか
Game_Party.prototype.hasAllMaterials = function(recipe, number) {
    return recipe.materials().every( function(material) {
        return material && this.hasMaterial(material, number);
    },this);
};

//指定した素材と製作員数に必要なアイテムを持っているか
Game_Party.prototype.hasMaterial = function(material, number) {
    return this.hasCategoryMaterial(material, number) || this.hasNonCategoryMaterial(material, number);
};

//カテゴリ指定の素材と製作員数に必要なアイテムを持っているか
Game_Party.prototype.hasCategoryMaterial = function(material, number) {
    return material.category() && this.someCategoryAllItems(material).some( function(item) {
        return this.numItems(item) >= material.number() * number;
    },this);
};

//カテゴリ指定ではない素材と製作員数に必要なアイテムを持っているか
Game_Party.prototype.hasNonCategoryMaterial = function(material, number) {
    return !material.category() && this.numItems(material.item()) >= material.number() * number;
};

//指定したアイテムと製作員数に必要なアイテムを持っているか
Game_Party.prototype.hasRequiredRecipeMaterials = function(item, number) {
    number = number || 1;
    return item && item.ics.recipes().some( function(recipe) {
        return this.hasAllMaterials(recipe, number);
    },this);
};

//指定したアイテムを最大で何個まで製作できるか
Game_Party.prototype.hasMaxRequiredRecipeMaterials = function(item) {
    var number = 1;
    while(this.hasRequiredRecipeMaterials(item, number)) {
        number++;
    }
    return number - 1;
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.setActionSound = function(sts) {
    return {name:sts.name, volume:sts.volume, pitch:sts.pitch, pan:sts.pan};
};

Window_Base.prototype.setCompositSound = function() {
    var ics = FTKR.ICS.systemSe;
    this._actionSound = {
        success:this.setActionSound(ics.success),
        great:this.setActionSound(ics.great),
        failure:this.setActionSound(ics.failure),
        lost:this.setActionSound(ics.lost),
    };
};

Window_Selectable.prototype.actSelect = function(index) {
    if (index === -1) index = this.index();
    this.activate();
    this.select(index);
    this.refresh();
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

FTKR.ICS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    FTKR.ICS.Window_MenuCommand_addOriginalCommands.call(this);
    if (FTKR.ICS.basic.showCmd === 1) {
        if (FTKR.ICS.basic.menuSwId === 0) {
            this.addCommand(FTKR.ICS.basic.cmdName, 'composition', true);
        } else if (FTKR.ICS.basic.menuSwId > 0 &&
            $gameSwitches.value(FTKR.ICS.basic.menuSwId)) {
            this.addCommand(FTKR.ICS.basic.cmdName, 'composition', true);
        }
    }
};

//=============================================================================
// Window_IcsCompsiTitle
//=============================================================================

function Window_IcsCompsiTitle() {
    this.initialize.apply(this, arguments);
}

Window_IcsCompsiTitle.prototype = Object.create(Window_Base.prototype);
Window_IcsCompsiTitle.prototype.constructor = Window_IcsCompsiTitle;

Window_IcsCompsiTitle.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_IcsCompsiTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(FTKR.ICS.compositTitle.format, 0, 0);
};

//=============================================================================
// Window_IcsCommand
//=============================================================================

function Window_IcsCommand() {
  this.initialize.apply(this, arguments);
}

Window_IcsCommand.prototype = Object.create(Window_Command.prototype);
Window_IcsCommand.prototype.constructor = Window_IcsCommand;

Window_IcsCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.setCompositSound();
    this.clearWindow();
};

Window_IcsCommand.prototype.clearWindow = function() {
    this._cmdId = null;
    this._itemCount = 0;
    this._showResipe = false;
    this.refresh();
};

Window_IcsCommand.prototype.windowWidth = function() {
    return 240;
};

Window_IcsCommand.prototype.numVisibleRows = function() {
    return 5;
};

Window_IcsCommand.prototype.maxCols = function() {
    return Math.max(FTKR.ICS.command.maxCols, 1);
};

Window_IcsCommand.prototype.makeCommandList = function() {
    FTKR.ICS.command.list.split(',').forEach( function(list) {
        if(list) this.setCommand(list.replace(' ',''));
    },this);
};

Window_IcsCommand.prototype.setCommand = function(symbol) {
    var format = FTKR.ICS.command.format;
    switch (symbol){
        case 'item':
            this.addCommand(TextManager.item,   'item');
            break;
        case 'weapon':
            this.addCommand(TextManager.weapon, 'weapon');
            break;
        case 'armor':
            this.addCommand(TextManager.armor,  'armor');
            break;
        case 'slot':
             this.addCommand(format.slot,        'slot');
            break;
        case 'action':
            this.addCommand(format.action,      'action');
            break;
        case 'change':
            if (this._showResipe) {
                this.addCommand(format.material,'material');
            } else {
                this.addCommand(format.recipe,  'recipe');
            }
            break;
        case 'end':
            this.addCommand(format.end,         'end');
            break;
    }
};

Window_IcsCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_IcsCommand.prototype.setItemWindow = function(window) {
    this._itemWindow = window;
    this.update();
};

//=============================================================================
// Window_IcsItemList
//=============================================================================

function Window_IcsItemList() {
    this.initialize.apply(this, arguments);
}

Window_IcsItemList.prototype = Object.create(Window_ItemList.prototype);
Window_IcsItemList.prototype.constructor = Window_IcsItemList;

Window_IcsItemList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._itemCount = 0;
    this._typeId = [];
    this._showResipe = false;
};

Window_IcsItemList.prototype.isEnabled = function(item) {
    return this._showResipe ? $gameParty.hasRequiredRecipeMaterials(item) : item;
};

Window_IcsItemList.prototype.typeId = function() {
    return this._typeId[this.index()];
};

Window_IcsItemList.prototype.makeItemList = function() {
    if (this._showResipe) {
        this._typeId = [];
        this._data = this.filterCategory().map( function(recipe) {
            this._typeId.push(recipe.typeId());
            return recipe.item();
        },this);
        if (this.includes(null)) {
            this._data.push(null);
        }
    } else {
        Window_ItemList.prototype.makeItemList.call(this);
    }
};

Window_IcsItemList.prototype.filterCategory = function() {
    return $gameParty.recipes().filter(function(recipe) {
        if (!recipe) return false;
        return DataManager.isIcsCategory(recipe.item()) ?
            this._category === recipe.item().ics.dataClass() :
            this._category === recipe.dataClass();
    }, this);
};

Window_IcsItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        var typeId = this._showResipe && item.ics.recipes().length > 1 ? this._typeId[index] + 1 : '';
        this.drawItemName(item, rect.x, rect.y, rect.width - this.numberWidth(), typeId);
        if (!this._showResipe) this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_IcsItemList.prototype.drawItemName = function(item, x, y, width, typeId) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name + typeId, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//=============================================================================
// Window_IcsCompsiSlotTitle
//=============================================================================

function Window_IcsCompsiSlotTitle() {
    this.initialize.apply(this, arguments);
}

Window_IcsCompsiSlotTitle.prototype = Object.create(Window_Base.prototype);
Window_IcsCompsiSlotTitle.prototype.constructor = Window_IcsCompsiSlotTitle;

Window_IcsCompsiSlotTitle.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_IcsCompsiSlotTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(FTKR.ICS.slotTitle.format, 0, 0);
};

//=============================================================================
// Window_IcsCompsiSlot
//=============================================================================

function Window_IcsCompsiSlot() {
  this.initialize.apply(this, arguments);
}

Window_IcsCompsiSlot.prototype = Object.create(Window_Selectable.prototype);
Window_IcsCompsiSlot.prototype.constructor = Window_IcsCompsiSlot;

Window_IcsCompsiSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.clearWindow();
};

Window_IcsCompsiSlot.prototype.clearWindow = function() {
    this._itemCount = 0;
    this._slots = [];
    this.refresh();
};

Window_IcsCompsiSlot.prototype.maxCols = function() {
    return 1;
};

Window_IcsCompsiSlot.prototype.maxItems = function() {
    return this._data ? this._data.length : 0;
};

Window_IcsCompsiSlot.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_IcsCompsiSlot.prototype.item = function(index) {
    return this._data ? this._data[index] : null;
};

Window_IcsCompsiSlot.prototype.makeItemList = function() {
    this._data = [];
    var ics = FTKR.ICS.slot;
    for (var i = 0; i < 5; i++) {
        var emptySlot = this.setSlot(ics.emptyFormat, ics.emptyIcon, 0);
        var slot = this._slots[i];
        this._data[i] = slot && slot.item() ? this.setSlotItem(slot) : emptySlot;
    }
    var resetSlot = this.setSlot(ics.return, 0, 0);
    this._data.push(resetSlot);
};

Window_IcsCompsiSlot.prototype.setSlot = function(name, icon, number) {
    return {name:name, icon:icon, number:number};
};

Window_IcsCompsiSlot.prototype.setSlotItem = function(slot) {
    return this.setSlot(slot.item().name, slot.item().iconIndex, slot.number());
};

Window_IcsCompsiSlot.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var iw = Window_Base._iconWidth + 4;
    var item = this.item(index);
    this.changeTextColor(this.textColor(0));
    this.changePaintOpacity(true);
    this.drawIcon(item.icon, rect.x + 2, rect.y + 2);
    this.drawText(item.name, rect.x + iw, rect.y, rect.width - iw);
    if (item.number) this.drawText(item.number, rect.x + iw, rect.y, rect.width - iw, 'right');
    this.changePaintOpacity(true);
};

Window_IcsCompsiSlot.prototype.materials = function() {
    return this._slots.map( function(slot) {
        if (slot.item()) {
            var item = slot.item();
            return new Game_Material(item.ics.category(), slot.dataClass(), item.id, slot.number());
        } 
    });
}; 

Window_IcsCompsiSlot.prototype.setCompositioStateWindow = function(window) {
    this._compositionStateWindow = window;
    this.update();
};

Window_IcsCompsiSlot.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._compositionStateWindow) this._compositionStateWindow.setItems(this.materials());
};

//=============================================================================
// Window_IcsNumber
//=============================================================================

function Window_IcsNumber() {
    this.initialize.apply(this, arguments);
}

Window_IcsNumber.prototype = Object.create(Window_ShopNumber.prototype);
Window_IcsNumber.prototype.constructor = Window_IcsNumber;

Window_IcsNumber.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this._typeId = null;
    this._showResipe = false;
    this._max = 1;
    this._number = 1;
    this.createButtons();
};

Window_IcsNumber.prototype.updateButtonsVisiblity = function() {
    if (FTKR.ICS.basic.showButton) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_IcsNumber.prototype.refresh = function() {
    this.contents.clear();
    this.drawItemName(this._item, 0, this.itemY());
    if(this._showResipe) {
        var materials = this._item.ics.recipe(this._typeId).materials();
        materials.forEach( function(material, i) {
            var y = this.buttonY() + this.lineHeight() * (i + 1);
            if (material.category()) {
                this.drawText('カテゴリー ' + material.category(), 0, y);
            } else {
                var item = material.item();
                this.drawItemName(item, 0, y);
            }
            var width = this.width - this.padding * 2;
            this.drawText(material.number(), 0, y, width, 'right');
        },this);
    }
    this.drawMultiplicationSign();
    this.drawNumber();
};

Window_IcsNumber.prototype.itemY = function() {
    return 0;
};

Window_IcsNumber.prototype.buttonY = function() {
    return Math.round(this.itemY() + this.lineHeight() * 1.5);
};

//=============================================================================
// Window_IcsCompsiStateTitle
//=============================================================================

function Window_IcsCompsiStateTitle() {
    this.initialize.apply(this, arguments);
}

Window_IcsCompsiStateTitle.prototype = Object.create(Window_Base.prototype);
Window_IcsCompsiStateTitle.prototype.constructor = Window_IcsCompsiStateTitle;

Window_IcsCompsiStateTitle.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_IcsCompsiStateTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(FTKR.ICS.statusTitle.format, 0, 0);
};

//=============================================================================
// Window_IcsCompsiState
//=============================================================================

function Window_IcsCompsiState() {
    this.initialize.apply(this, arguments);
}

Window_IcsCompsiState.prototype = Object.create(Window_Base.prototype);
Window_IcsCompsiState.prototype.constructor = Window_IcsCompsiState;

Window_IcsCompsiState.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.clearWindow();
};

Window_IcsCompsiState.prototype.clearWindow = function() {
    this._slotMaterials = [];
    this._comps = [];
    this._comp = {};
    this._number = null;
    this._learnRecipe = false;
    this.refresh();
};

Window_IcsCompsiState.prototype.setItems = function(items) {
    if (this._slotMaterials === items) return;
    this._slotMaterials = items;
    this.refresh();
};

Window_IcsCompsiState.prototype.refresh = function() {
    this.contents.clear();
    var y = this.lineHeight();
    var w = this.width - this.padding * 2;
    var comp = this.compositionsItem();
    if (comp) {
        var number = this.compositionNumber(comp);
        var has = $gameParty.hasRecipe(DataManager.itemDataClass(comp.item), comp.item.id, comp.typeId);
//        console.log(has);
        if (has > 0 && number) {
            var recipe = comp.item.ics.recipe(comp.typeId);
            this.drawText('成功', 0, 0, w/2);
            var success = recipe.difficulty().success;
            if (!recipe.great()) success += recipe.difficulty().great;
            this.drawText('難易度：' + success, w/2, 0, w/2);
            this.drawText(comp.item.name, 0, y, w);
            this.drawText(number, 0, y, w, 'right');
            var dy = 0;
            if (recipe.great()) {
                this.drawText('大成功', 0, y*(2 + dy), w/2);
                this.drawText('難易度：' + recipe.difficulty().great, w/2, y*(2 + dy), w/2);
                dy += 1;
                this.drawText(recipe.great(), 0, y*(2 + dy), w/2);
                dy += 1;
            }
            if (recipe.failure()) {
                this.drawText('失敗', 0, y*(2 + dy), w/2);
                this.drawText('難易度：' + recipe.difficulty().failure, w/2, y*(2 + dy), w/2);
                dy += 1;
                this.drawText(recipe.failure(), 0, y*(2 + dy), w/2);
            }
        } else {
            this.drawTextEx(FTKR.ICS.status.unkouwn, 0, 0);
            this._learnRecipe = this.matchComposition(comp.item);
        }
        var totalRank = 0;
        var rankNum = 0;
        this._slotMaterials.forEach( function(slotMaterial) {
            var rank = slotMaterial.item().ics.rank();
            if (rank) {
                rankNum += 1;
                totalRank += rank;
            }
        });
        comp.rank = rankNum ? totalRank / rankNum : 1;
        comp.slots = this._slotMaterials;
//        console.log('composit data', comp, 'number', number);
        this._comp = comp;
        this._number = number;
    } else {
        this.drawTextEx(FTKR.ICS.status.unkouwn, 0, 0);
        this._comp = {};
        this._number = 0;
    }
};

//投入した材料から合成できるアイテムを取得する
Window_IcsCompsiState.prototype.compositionsItem = function() {
    var comps = this.checkMaterials($dataItems).concat(
          this.checkMaterials($dataWeapons), this.checkMaterials($dataArmors));
//    if (comps.length) console.log(comps);
    return comps.length ? this.maxRequireMaterials() : null;
};

//指定したアイテムのリストの中に、合成材料とレシピが合っているアイテムのリストを返す
//また、合っているアイテムのレシピ情報を this._comps に加える
Window_IcsCompsiState.prototype.checkMaterials = function(datas) {
    return datas.filter( function(item) {
        if (item) {
            var result = this.matchRecipeMaterials(item);
            if (result) this._comps.push(result);
            return result;
        }
        return false;
    },this);
};

//指定したアイテムのレシピと合成材料が合っているか判定し
//合っていれば、アイテムと合致したレシピとそのレシピのIDを返す
//合っていなければ null を返す
Window_IcsCompsiState.prototype.matchRecipeMaterials = function(item) {
    var typeId = 0;
    var recipes = item.ics.recipes().filter( function(recipe, t) {
        var result = this.hasMaterials(recipe.materials());
        if (result) {
            typeId = t;
            return result;
        }
    },this);
    return recipes.length ? {item:item, recipe:recipes[0], typeId:typeId,} : null;
};

//指定したアイテムのレシピの中で、合成素材と合っているものがあるか判定
Window_IcsCompsiState.prototype.hasMaterials = function(materials) {
    slotMaterials = this._slotMaterials.clone();
    var result = materials.every(function(material) {
        var index = this.hasMaterial(material, slotMaterials);
        if (index > -1) {
            slotMaterials.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },this);
    return result;
};

//指定したレシピ素材と合成素材が合っているか判定
Window_IcsCompsiState.prototype.hasMaterial = function(material, slotMaterials) {
    return slotMaterials.findIndex( function(slotMaterial) {
        return material.lowerMaterialNumber(slotMaterial);
    },this);
};

//生成できるアイテムの中から必要材料数が一番多いアイテムを選ぶ
Window_IcsCompsiState.prototype.maxRequireMaterials = function() {
    if (!this._comps.length) return null;
    var item = null;
    var materialNumber = 0;
    this._comps.forEach(function(comp) {
        var value = 0;
        comp.recipe.materials().forEach( function(material) {
            value += material.number();
        });
        if (materialNumber <= value) {
            materialNumber = value;
            item = comp;
        }
    },this);
    return item;
};

//投入した材料から合成できるアイテムの最大生成数を取得する
Window_IcsCompsiState.prototype.compositionNumber = function(composit) {
    var rates = [];
    var rate = 0;
//    console.log(this._slotMaterials);
    var recipe = composit.item.ics.recipe(composit.typeId);
    recipe.materials().forEach( function(material, i) {
        rates[i] = 0;
        this._slotMaterials.forEach( function(slotMaterial) {
            if (material.matchMaterial(slotMaterial))
                rates[i] = Math.floor(slotMaterial.number() / material.number());
        },this);
        if (i) rate = Math.min(rates[i], rates[i-1]);
    },this);
//    console.log('recipe num:', recipe.number(), 'rate:', rate, 'rates:', rates);
    return recipe.number() * rate;
};

//投入した材料と合成できるアイテムの材料数が一致するか
Window_IcsCompsiState.prototype.matchComposition = function(item) {
    return item.ics.recipes().some( function(recipe) {
        return recipe.materials().every( function(material) {
            return this._slotMaterials.some( function(slotMaterial) {
                if (material.matchMaterial(slotMaterial))
                    return slotMaterial.number() === material.number();
            },this);
        },this);
    },this);
};


//=============================================================================
// Window_IcsConfTitle
//=============================================================================

function Window_IcsConfTitle() {
    this.initialize.apply(this, arguments);
}

Window_IcsConfTitle.prototype = Object.create(Window_Base.prototype);
Window_IcsConfTitle.prototype.constructor = Window_IcsConfTitle;

Window_IcsConfTitle.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_IcsConfTitle.prototype.refresh = function () {
    this.contents.clear();
    this.drawTextEx(FTKR.ICS.confTitle.format, 0, 0);
};


//=============================================================================
// Window_IcsConf
//=============================================================================

function Window_IcsConf() {
    this.initialize.apply(this, arguments);
}

Window_IcsConf.prototype = Object.create(Window_Selectable.prototype);
Window_IcsConf.prototype.constructor = Window_IcsConf;

Window_IcsConf.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.setCompositSound();
    this._data = [];
    this._enabled = false;
    this._dicision = false;
    this.refresh();
};

Window_IcsConf.prototype.maxCols = function() {
    return 2;
};

Window_IcsConf.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_IcsConf.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_IcsConf.prototype.makeItemList = function() {
    this._data = [
        {dicision:true, disp:FTKR.ICS.conf.okFormat},
        {dicision:false, disp:FTKR.ICS.conf.cancelFormat}
    ];
};

Window_IcsConf.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_IcsConf.prototype.isEnabled = function(index) {
    return this._enabled || index > 0;
};

Window_IcsConf.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};

Window_IcsConf.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
    this.changePaintOpacity(1);
};

Window_IcsConf.prototype.setEnabled = function(enabled) {
    if (this._enabled === enabled) return;
    this._enabled = enabled;
    this.refresh();
};

//=============================================================================
// Window_IcsResult
//=============================================================================

function Window_IcsResult() {
    this.initialize.apply(this, arguments);
}

Window_IcsResult.prototype = Object.create(Window_Base.prototype);
Window_IcsResult.prototype.constructor = Window_IcsResult;

Window_IcsResult.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.clearWindow();
};

Window_IcsResult.prototype.clearWindow = function () {
    this._item = null;
    this._number = 0;
    this._result = '';
    this.refresh();
};

Window_IcsResult.prototype.refresh = function () {
    this.contents.clear();
    var y = this.lineHeight();
    var w = this.width - this.padding * 2;
    this.drawTextEx(FTKR.ICS.result.format, 0, 0);
    this.drawTextEx(this.resultText(), 0, y);
    if (this._item && this._number) {
        this.drawText(this._item.name, 0, y*2, w);
        this.drawText(this._number, 0, y*2, w, 'right');
    }
};

Window_IcsResult.prototype.resultText = function () {
    var result = FTKR.ICS.result;
    switch(this._result) {
        case 'great':
            return result.great;
        case 'success':
            return result.success;
        case 'failure':
            return result.failure;
        default:
            return result.lost;
    }
};

Window_IcsResult.prototype.setResult = function (result, item, number) {
    this._result = result;
    this._item = item;
    this._number = number;
    this.refresh();
};


//=============================================================================
// Window_IcsResultConf
//=============================================================================

function Window_IcsResultConf() {
    this.initialize.apply(this, arguments);
}

Window_IcsResultConf.prototype = Object.create(Window_Selectable.prototype);
Window_IcsResultConf.prototype.constructor = Window_IcsResultConf;

Window_IcsResultConf.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this.refresh();
};

Window_IcsResultConf.prototype.maxCols = function() {
    return 1;
};

Window_IcsResultConf.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_IcsResultConf.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_IcsResultConf.prototype.makeItemList = function() {
    this._data = [
        {dicision:true, disp:FTKR.ICS.result.okFormat},
    ];
};

Window_IcsResultConf.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_IcsResultConf.prototype.isEnabled = function(index) {
    return true;
};

Window_IcsResultConf.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};

Window_IcsResultConf.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
    this.changePaintOpacity(1);
};

//=============================================================================
// Scene_Menu
//=============================================================================

FTKR.ICS.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    FTKR.ICS.Scene_Menu_createCommandWindow.call(this);
    if (FTKR.ICS.basic.showCmd === 1) {
        this._commandWindow.setHandler('composition', this.commandIcs.bind(this));
    }
};

Scene_Menu.prototype.commandIcs = function() {
    SceneManager.push(Scene_ICS);
};

//=============================================================================
// Scene_ICS
//=============================================================================

function Scene_ICS() {
    this.initialize.apply(this, arguments);
}

Scene_ICS.prototype = Object.create(Scene_Item.prototype);
Scene_ICS.prototype.constructor = Scene_ICS;

Scene_ICS.prototype.initialize = function() {
    Scene_Item.prototype.initialize.call(this);
};

Scene_ICS.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this._helpWindow.hide();
    this.createCompositionTitleWindow();
    this.createCategoryWindow();
    this.createItemWindow();
    this.createCompositionSlotTitleWindow();
    this.createCompositionSlotWindow();
    this.createCompositionStateTitleWindow();
    this.createCompositionStateWindow();
    this.createNumberWindow();
    if (FTKR.ICS.basic.enableConf) {
        this.createConfTitleWindow();
        this.createConfWindow();
    }
    this.createResultWindow();
    this.createResultConfWindow();
};

Scene_ICS.prototype.createCompositionTitleWindow = function() {
    var ww = Graphics.boxWidth;
    var wh = this._helpWindow.fittingHeight(1);
    this._compositionTitleWindow = new Window_IcsCompsiTitle(0, 0, ww, wh);
    this.addWindow(this._compositionTitleWindow);
};

Scene_ICS.prototype.createCategoryWindow = function() {
    var wy = this._compositionTitleWindow.height;
    this._categoryWindow = new Window_IcsCommand(0, wy);
    var window = this._categoryWindow;
    window.setHelpWindow(this._helpWindow);
    window.setHandler('ok',       this.onCategoryOk.bind(this));
    window.setHandler('cancel',   this.onCategoryCancel.bind(this));
    this.addWindow(window);
};

Scene_ICS.prototype.createItemWindow = function() {
    var wx = this._categoryWindow.width;
    var wy = this._categoryWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._categoryWindow.height;
    this._itemWindow = new Window_IcsItemList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_ICS.prototype.createCompositionSlotTitleWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._helpWindow.fittingHeight(1);
    this._compositionSlotTitleWindow = new Window_IcsCompsiSlotTitle(0, wy, ww, wh);
    this.addWindow(this._compositionSlotTitleWindow);
};

Scene_ICS.prototype.createCompositionSlotWindow = function() {
    var wy = this._compositionSlotTitleWindow.y + this._compositionSlotTitleWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._compositionSlotWindow = new Window_IcsCompsiSlot(0, wy, ww, wh);
    var window = this._compositionSlotWindow;
    window.setHelpWindow(this._helpWindow);
    window.setHandler('ok',       this.onIcsSlotOk.bind(this));
    window.setHandler('cancel',   this.onIcsSlotCancel.bind(this));
    this.addWindow(window);
};

Scene_ICS.prototype.createCompositionStateTitleWindow = function() {
    var wx = this._compositionSlotWindow.width;
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._helpWindow.fittingHeight(1);
    this._compositionStateTitleWindow = new Window_IcsCompsiStateTitle(wx, wy, ww, wh);
    this.addWindow(this._compositionStateTitleWindow);
};

Scene_ICS.prototype.createCompositionStateWindow = function() {
    var wx = this._compositionSlotWindow.width;
    var wy = this._compositionStateTitleWindow.y + this._compositionStateTitleWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._compositionStateWindow = new Window_IcsCompsiState(wx, wy, ww, wh);
    this.addWindow(this._compositionStateWindow);
};

Scene_ICS.prototype.createNumberWindow = function() {
    var wx = this._categoryWindow.width;
    var wy = this._categoryWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._categoryWindow.height;
    this._numberWindow = new Window_IcsNumber(wx, wy, ww, wh);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_ICS.prototype.createConfTitleWindow = function() {
    var wx = Graphics.boxWidth / 4;
    var wh = this._helpWindow.fittingHeight(1);
    var ww = Graphics.boxWidth / 2;
    var wy = Graphics.boxHeight / 2 - wh;
    this._stsConfTitleWindow = new Window_IcsConfTitle(wx, wy, ww, wh);
    this.addWindow(this._stsConfTitleWindow);
    this._stsConfTitleWindow.hide();
};

Scene_ICS.prototype.createConfWindow = function() {
    var ctw = this._stsConfTitleWindow;
    var wx = ctw.x;
    var wy = ctw.y + ctw.height;
    var ww = ctw.width;
    var wh = this._helpWindow.fittingHeight(1);
    this._stsConfWindow = new Window_IcsConf(wx, wy, ww, wh);
    var window = this._stsConfWindow;
    window.setHandler('ok', this.onConfirmationOk.bind(this));
    window.setHandler('cancel', this.onConfirmationCancel.bind(this));
    this.addWindow(window);
    window.hide();
};

Scene_ICS.prototype.createResultWindow = function() {
    var wx = Graphics.boxWidth / 4;
    var wh = this._helpWindow.fittingHeight(3);
    var ww = Graphics.boxWidth / 2;
    var wy = Graphics.boxHeight / 2 - wh;
    this._resultWindow = new Window_IcsResult(wx, wy, ww, wh);
    this.addWindow(this._resultWindow);
    this._resultWindow.hide();
};

Scene_ICS.prototype.createResultConfWindow = function() {
    var ctw = this._resultWindow;
    var wx = ctw.x;
    var wy = ctw.y + ctw.height;
    var ww = ctw.width;
    var wh = this._helpWindow.fittingHeight(1);
    this._resultConfWindow = new Window_IcsResultConf(wx, wy, ww, wh);
    var window = this._resultConfWindow;
    window.setHandler('ok', this.onResultOk.bind(this));
    window.setHandler('cancel', this.onResultOk.bind(this));
    this.addWindow(window);
    window.hide();
};

Scene_ICS.prototype.slotsClear = function() {
    this._itemWindow.refresh();
    this._compositionSlotWindow.clearWindow();
    this._compositionStateWindow.clearWindow();
    this._resultWindow.clearWindow();
}

Scene_ICS.prototype.slotsReset = function() {
    this._compositionSlotWindow._slots.forEach( function(slot, i) {
        if(slot) $gameParty.gainItem(slot.item(), slot.number());
    });
    this.slotsClear();
};

Scene_ICS.prototype.onCategoryCancel = function() {
    this.slotsReset();
    this.popScene();
};

Scene_ICS.prototype.onCategoryOk = function() {
    switch(this._categoryWindow.currentSymbol()) {
        case 'slot':
            this._compositionSlotWindow.actSelect(0);
            break;
        case 'action':
            if (FTKR.ICS.basic.enableConf) {
                var materials = this._compositionSlotWindow.materials();
                this._stsConfWindow.setEnabled(materials.length);
                this.stsConfShow();
                this._stsConfWindow.actSelect(0);
            } else {
                this.composition();
            }
            break;
        case 'recipe':
            this._categoryWindow._showResipe = true;
            this._itemWindow._showResipe = true;
            this._categoryWindow.actSelect(-1);
            break;
        case 'material':
            this._categoryWindow._showResipe = false;
            this._itemWindow._showResipe = false;
            this._categoryWindow.actSelect(-1);
            break;
        case 'end':
            this.onCategoryCancel();
            break;
        default:
            this._itemWindow.activate();
            this._itemWindow.selectLast();
            break;
    }
};

Scene_ICS.prototype.onItemOk = function() {
    if(this._compositionSlotWindow._itemCount < 5) {
        if (this._itemWindow._showResipe) {
            var max = $gameParty.hasMaxRequiredRecipeMaterials(this.item());
            this._numberWindow._showResipe = this._itemWindow._showResipe;
            this._numberWindow._typeId = this._itemWindow.typeId();
        } else {
            var max = $gameParty.numItems(this.item());
            this._numberWindow._showResipe = false;
        }
        this._numberWindow.setup(this.item(), max, 0);
        this._numberWindow.show();
        this._numberWindow.activate();
    } else {
        this.onItemCancel();
    }
};

Scene_ICS.prototype.onNumberOk = function() {
    SoundManager.playOk();
    var number = this._numberWindow.number();
    if (this._itemWindow._showResipe) {
        var recipe = this.item().ics.recipe(this._itemWindow.typeId());
//        console.log(recipe);
        var items = recipe.materials().map( function(material) {
            return material.item();
        },this);
//        console.log(items);
        items.forEach( function(item) {
            this.setSlotItem(item, number);
        },this);
    } else {
        this.setSlotItem(this.item(), number);
    }
    this._numberWindow.hide();
    this._itemWindow.actSelect(-1);
    this.refreshWindow();
};

Scene_ICS.prototype.setSlotItem = function(item, number) {
    var csw = this._compositionSlotWindow;
    var compsiSlot = csw._slots.filter( function(slot) {
        return slot && slot.item() === item;
    },this);
    if (compsiSlot.length) {
//        console.log(compsiSlot);
        compsiSlot[0]._number += number;
    } else {
        csw._slots[csw._itemCount] = new Game_Material('', DataManager.itemDataClass(item), item.id, number);
        csw._itemCount++;
    }
    $gameParty.loseItem(item, number);
};

Scene_ICS.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
    this._numberWindow.hide();
    this._itemWindow.actSelect(-1);
};

Scene_ICS.prototype.onIcsSlotOk = function() {
    var csw = this._compositionSlotWindow;
    var index = csw.index();
    if (index === 5) {
        this.slotsReset();
    } else {
        var slot = csw._slots[index];
        if(csw._itemCount && slot) {
            $gameParty.gainItem(slot.item(), slot.number());
            csw._slots.splice(index, 1);
            csw._itemCount--;
        }
    }
    this.refreshWindow();
    csw.actSelect(-1);
};

Scene_ICS.prototype.refreshWindow = function() {
    this._itemWindow.refresh();
    this._compositionSlotWindow.refresh();
    this._compositionStateWindow.setItems(this._compositionSlotWindow.materials());
};

Scene_ICS.prototype.onIcsSlotCancel = function() {
    this._compositionSlotWindow.deselect();
    this._categoryWindow.actSelect(-1);
};

Scene_ICS.prototype.onConfirmationOk = function() {
    var cfw = this._stsConfWindow;
    if (cfw.item().dicision) {
        cfw.deselect();
        this.composition(cfw._actionSound)
        this.stsConfHide();
    } else {
        this.onConfirmationCancel();
    }
};

Scene_ICS.prototype.isSpecialComp = function(item) {
    return item && item.wtypeId === FTKR.ICS.basic.categoryId &&
        (/<ICS 特殊合成>/i).test(item.note);
}

//合成実行処理
Scene_ICS.prototype.composition = function(sound) {
    var composit = this._compositionStateWindow;
    var comp = composit._comp;
    var item = comp.item;
    var typeId = comp.typeId;
//    console.log('composit', comp);
    if (item) {
        var getItem = {
            item:this.convertCategoryItem(comp),
            number:composit._number,
        };
        var judg = this.successJudg(item, typeId);
//        console.log('getBaseItem', getItem, judg);
        if (this.successApply(judg, getItem, item.ics.recipe(typeId), sound) && composit._learnRecipe) {
            $gameParty.addRecipe(DataManager.itemDataClass(item), item.id, typeId);
        }
//        console.log('getItem', getItem);
        if (this.isSpecialComp(item) && judg !== 'lost') {
            var baseItem = comp.slots[0].item();
            var addItem = comp.slots[1].item();
//            console.log('特殊合成');
//            console.log('ベースアイテム:', baseItem.name);
            var number = getItem.number;
            var newItem = copyObject(baseItem);
            newItem.ics = new Game_Composit();
            if(!newItem.compositCount) newItem.baseName = newItem.name;
            newItem.compositCount += 1 + addItem.compositCount;
            newItem.name = newItem.baseName + '(+' + newItem.compositCount + ')';
            if(DataManager.isWeapon(baseItem)) {
                newItem.id = $dataWeapons.length;
                this.setItemTraits(newItem, addItem, number);
                $dataWeapons.push(newItem);
            } else if (DataManager.isArmor(baseItem)){
                newItem.id = $dataArmors.length;
                this.setItemTraits(newItem, addItem, number);
                $dataArmors.push(newItem);
            } else {
                newItem = null;
            }
//            console.log('アイテムID', newItem.id);
            getItem.item = newItem;
            getItem.number = 1;
        }
        if (judg === 'lost') {
            getItem.item = null;
            getItem.number = 0;
        }
        $gameParty.gainItem(getItem.item, getItem.number);
        this._resultWindow.setResult(judg, getItem.item, getItem.number);
    } else {
        this._resultWindow.setResult('lost', null, 0);
    }
    this._resultWindow.show();
    this._resultConfWindow.show();
    this._resultConfWindow.actSelect(0);
};

Scene_ICS.prototype.setItemTraits = function(baseItem, addItem, number) {
    var traits = addItem.params.map(function(param, i){
        return {type:'param', data:{id:i, value:param}};
    }).filter(function(trait) {
        return trait.data.value;
    });
    traits = traits.concat(addItem.traits.map(function(trait) {
        if(trait) return {type:'trait', data:trait};
    }));
    for(var i = 0; i < number; i++) {
        var num = Math.floor(Math.random() * (traits.length - 1));
        var add = traits[num];
        if (add.type === 'param') {
            baseItem.params[add.data.id] += add.data.value;
        } else if (add.type === 'trait') {
            baseItem.traits.push(add.data);
        }
        traits.splice(num, 1);
    }
    return baseItem;
};

Scene_ICS.prototype.convertCategoryItem = function(composit) {
    return DataManager.convertCategoryItem(composit.item, composit.rank);
};

Scene_ICS.prototype.successApply = function(judg, getItem, recipe, sound) {
    var success = true;
    var correct = {};
    switch(judg) {
        case 'success':
            AudioManager.playStaticSe(sound.success);
            break;
        case 'great':
            AudioManager.playStaticSe(sound.great);
            correct = this.successCorrection(recipe.great());
            break;
        case 'failure':
            AudioManager.playStaticSe(sound.failure);
            correct = this.successCorrection(recipe.failure());
            success = false;
            break;
        default:
            AudioManager.playStaticSe(sound.lost);
            correct = this.successCorrection('なし');
            success = false;
            break;
    }
//    console.log('correct', correct);
    this.setCorrection(correct, getItem);
    return success;
};

Scene_ICS.prototype.successCorrection = function(success) {
    if(success.match(/ランク変更\((.+)\)/i)) {
        return {code:Window_Base.SUCCESS_CORRECTION_RANK, value:Number(RegExp.$1),};
    } else if (success.match(/カテゴリー変更\((.+)\)/i)) {
        return {code:Window_Base.SUCCESS_CORRECTION_CATEGORY, value:RegExp.$1,};
    } else if (success.match(/生成数変更\((.+)\)/i)) {
        return {code:Window_Base.SUCCESS_CORRECTION_NUMBER, value:Number(RegExp.$1),};
    } else if (success.match(/アイテム変更\((.+)\)/i)) {
        return {code:Window_Base.SUCCESS_CORRECTION_ITEM, value:RegExp.$1,};
    } else {
        return {code:Window_Base.SUCCESS_CORRECTION_NUMBER, value:0,};
    };
};

Scene_ICS.prototype.calcBaseRate = function(difficulty, param) {
    var max = Window_Base.SUCCESS_MAX_RATE;
    var baseRate = FTKR.ICS.success.baseRate.clamp(0, max);
    var upRate = Math.max(FTKR.ICS.success.upRate, 0);
    var downRate = Math.min(FTKR.ICS.success.downRate, 0);
    var diff = difficulty - param;
    if (diff) {
        return Math.max(baseRate + downRate * diff, 0);
    } else {
        return Math.min(baseRate - upRate * diff, max);
    }
};

Scene_ICS.prototype.calcSuccessRate = function(difficulty, param) {
    var max = Window_Base.SUCCESS_MAX_RATE;
    var success = this.calcBaseRate(difficulty.success, param);
    var great = this.calcBaseRate(difficulty.great, param);
    var failure = this.calcBaseRate(difficulty.failure, param);
    var result = {
        great:great * success / max,
        success:(max - great) * success / max,
        failure:(max - success) * failure / max,
    };
    return result;
};

Scene_ICS.prototype.calcCompositParam = function(item) {
    return this.calcIcsFormula(item, FTKR.ICS.success.param);
};

Scene_ICS.prototype.calcSuccessRequired = function(item, typeId) {
    var formula = item.ics.recipe(typeId).required();
    return formula ? this.calcIcsFormula(item, formula) : true;
};

Scene_ICS.prototype.calcIcsFormula = function(item, formula) {
    try {
        var a = $gameActors._data;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var value = Math.max(Math.floor(eval(formula)), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        return 0;
    }
};

Scene_ICS.prototype.successJudg = function(item, typeId) {
    var max = Window_Base.SUCCESS_MAX_RATE;
    var param = this.calcCompositParam(item);
    var recipe = item.ics.recipe(typeId);
    var difficulty = recipe.difficulty();
    var rate = param ? this.calcSuccessRate(difficulty, param) :
        difficulty;
    var great = rate.great.clamp(0, max);
    var success = rate.success.clamp(0, max - great);
    if (!this.calcSuccessRequired(item, typeId)) {
        great = 0;
        success = 0;
    }
    if (!recipe.great()) {
        success += great;
        great = 0;
    }
    var failure = recipe.failure() ? 
        rate.failure.clamp(0, max - great - success) : 0;
    var lost = Math.max(max - great - success - failure, 0);
    var rand = Math.random() * max + 1;
//    console.log('great', great, 'success', success, 'failure', failure, 'lost', lost, 'rand', rand);
    if (rand <= great) {
        return 'great';
    } else if (rand <= great + success) {
        return 'success';
    } else if (rand <= great + success + failure) {
        return 'failure';
    } else {
        return 'lost';
    }
};

//成功補正処理
Scene_ICS.prototype.setCorrection = function(correct, getItem) {
    if (!correct) return;
    switch (correct.code) {
        case Window_Base.SUCCESS_CORRECTION_RANK:
            getItem.item = DataManager.changeItemRank(getItem.item, correct.value);
            break;
        case Window_Base.SUCCESS_CORRECTION_CATEGORY:
            getItem.item = DataManager.changeItemCategory(getItem.item, correct.value);
            break;
        case Window_Base.SUCCESS_CORRECTION_NUMBER:
            getItem.number = correct.value;
            break;
        case Window_Base.SUCCESS_CORRECTION_ITEM:
            getItem.item = DataManager.searchItemName(correct.value);
            break;
    }
};

Scene_ICS.prototype.onConfirmationCancel = function() {
    this._stsConfWindow.deselect();
    var stw = this._categoryWindow;
    stw.actSelect(stw.index());
    this.stsConfHide();
};

Scene_ICS.prototype.stsConfHide = function() {
    this._stsConfWindow.hide();
    this._stsConfTitleWindow.hide();
};

Scene_ICS.prototype.stsConfShow = function() {
    this._stsConfWindow.show();
    this._stsConfTitleWindow.show();
};

Scene_ICS.prototype.onResultOk = function() {
    this._resultConfWindow.deselect();
    this._categoryWindow.actSelect(-1);
    this.slotsClear();
    this._resultWindow.hide();
    this._resultConfWindow.hide();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _ICS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _ICS_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ICS') {
        var com = args[0];
        switch (true) {
            // システム画面を呼び出す
            case /OPEN/i.test(com):
            case /アイテム合成画面表示/i.test(com):
                SceneManager.push(Scene_ICS);
                break;
            // レシピを覚える
            case /ADD_RECIPE/i.test(com):
            case /レシピ追加/i.test(com):
                var arg = this.setStr(args[1]);
                var item = DataManager.searchItemName(arg);
                if (item) {
                    $gameParty.addRecipe(DataManager.itemDataClass(item), item.id, this.setNum(args[2]));
                } else {
                    var dataClass = this.setDataClass(this.setStr(args[1]));
                    if(dataClass) $gameParty.addRecipe(dataClass, this.setNum(args[2]), this.setNum(args[3]));
                }
                break;
            // レシピを忘れる
            case /REDUCE_RECIPE/i.test(com):
            case /レシピ削除/i.test(com):
                var arg = this.setStr(args[1]);
                var item = DataManager.searchItemName(arg);
                if (item) {
                    $gameParty.reduceRecipe(DataManager.itemDataClass(item), item.id, this.setNum(args[2]));
                } else {
                    var dataClass = this.setDataClass(this.setStr(args[1]));
                    if(dataClass) $gameParty.reduceRecipe(dataClass, this.setNum(args[2]), this.setNum(args[3]));
                }
                break;
        }
    }
};

Game_Interpreter.prototype.setDataClass = function(arg) {
    if (/^ITEM/i.test(arg) || /^アイテム/.test(arg)) {
        return 'item';
    } else if (/^WEAPON/i.test(arg) || /^武器/.test(arg)) {
        return 'weapon';
    } else if (/^ARMOR/i.test(arg) || /^防具/.test(arg)) {
        return 'armor';
    } else {
        return '';
    }
};

Game_Interpreter.prototype.setNum = function(data) {
    if (!data) return 0;
    if (data.match(/v\[(\d+)\]/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(/(\d+)/i)) {
        return Number(RegExp.$1);
    } else {
        return 0;
    }
};

Game_Interpreter.prototype.setStr = function(data) {
    if (!data) return '';
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
