//=============================================================================
// アイテム合成システム
// FTKR_ItemConpositionSystem.js
// 作成者     : フトコロ
// 作成日     : 2017/04/08
// 最終更新日 : 2017/11/01
// バージョン : v1.5.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ICS = true;

var FTKR = FTKR || {};
FTKR.ICS = FTKR.ICS || {};

//=============================================================================
/*:
 * @plugindesc v1.5.2 アイテム合成システム
 * @author フトコロ
 *
 * @param --基本設定--
 * @default
 * 
 * @param Menu Command
 * @desc メニューに表示するコマンドを設定します。
 * @default ["{\"enabled\":\"1\",\"name\":\"アイテム合成\",\"switchId\":\"0\"}"]
 * @type struct<menu>[]
 * 
 * @param Enable Confirmation
 * @desc アイテム合成実行時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 1
 *
 * @param Enable End Confirmation
 * @desc アイテム合成終了時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 0
 *
 * @param Category Type ID
 * @desc カテゴリータイプを設定した武器タイプIDを設定します。
 * @default 
 *
 * @param Category Format
 * @desc カテゴリータイプの表示内容を設定します。
 * %1 - カテゴリータイプ
 * @default カテゴリー %1
 *
 * @param Not Applicable to Recipe
 * @desc レシピが無い組み合わせの場合の結果を設定します。
 * lost - 消失, reset - 復元
 * @default lost
 *
 * @param Recipe Matching Pattern
 * @desc レシピに対してセットした素材がどの程度合致すると合成成功するか設定します。1 - レシピと同一, 0 - レシピを含む
 * @default 0
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
 * @type string[]
 * @default ["\\c[16]合成"]
 * 
 * @param Comp Title Opacity
 * @desc 合成タイトルウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Comp Title Frame Hide
 * @desc 合成タイトルウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --合成コマンドウィンドウの設定--
 *
 * @param Command List
 * @desc コマンドの表示内容と順番を設定します。
 * カンマ(,)で区切ってください
 * @type string[]
 * @default ["action,item,weapon,armor,change,slot,end"]
 * 
 * @param Change Materials Name
 * @desc 「素材から選ぶ」コマンドの表示内容を設定します。
 * @type string[]
 * @default ["素材から選ぶ"]
 * 
 * @param Change Resipes Name
 * @desc 「レシピから選ぶ」コマンドの表示内容を設定します。
 * @type string[]
 * @default ["レシピから選ぶ"]
 * 
 * @param Slot Cmd Name
 * @desc 「アイテムを戻す」コマンドの表示内容を設定します。
 * @type string[]
 * @default ["アイテムを戻す"]
 * 
 * @param Action Cmd Name
 * @desc 「合成を行う」コマンドの表示内容を設定します。
 * @type string[]
 * @default ["合成を行う"]
 * 
 * @param End Cmd Name
 * @desc 「合成を止める」コマンドの表示内容を設定します。
 * @type string[]
 * @default ["合成を止める"]
 * 
 * @param Item Cmd Name
 * @desc 「アイテム」コマンドの表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @type string[]
 * @default ["アイテム"]
 * 
 * @param Weapon Cmd Name
 * @desc 「武器」コマンドの表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @type string[]
 * @default ["武器"]
 * 
 * @param Armor Cmd Name
 * @desc 「防具」コマンドの表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @type string[]
 * @default ["防具"]
 * 
 * @param Comp Cmd Opacity
 * @desc 合成コマンドウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Comp Cmd Frame Hide
 * @desc 合成コマンドウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --アイテムリストウィンドウの設定--
 * @default
 *
 * @param Item List Opacity
 * @desc アイテムリストウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Item List Frame Hide
 * @desc アイテムリストウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --素材数指定ウィンドウの設定--
 * @default
 *
 * @param Show Number Button
 * @desc アイテム数の指定画面でタッチ用ボタンを表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @param Display Materials On Number
 * @desc 素材数指定ウィンドウにレシピ素材を表示するか。
 * 0 - 表示させない, 1 - 表示する
 * @default 1
 * 
 * @param Number Opacity
 * @desc 素材数指定ウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Number Frame Hide
 * @desc 素材数指定ウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --スロットタイトルウィンドウの設定--
 * @default
 *
 * @param Slot Title Format
 * @desc スロットタイトルウィンドウのタイトル表示内容を設定します。
 * @type string[]
 * @default ["\\c[16]合成アイテム"]
 * 
 * @param Slot Title Opacity
 * @desc スロットタイトルウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Slot Title Frame Hide
 * @desc スロットタイトルウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --素材スロットウィンドウの設定--
 * @default
 *
 * @param Empty Format
 * @desc 空きスロットの表示名を設定します。
 * @type string[]
 * @default ["未設定"]
 * 
 * @param Empty Icon
 * @desc 空きスロットのアイコンを設定します。
 * @default 160
 * 
 * @param Return All Slot
 * @desc アイテムをすべて戻すコマンドの表示名を設定します。
 * @type string[]
 * @default ["アイテムをすべて戻す"]
 * 
 * @param Slot Opacity
 * @desc 素材スロットウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Slot Frame Hide
 * @desc 素材スロットウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --合成情報タイトルウィンドウの設定--
 * @default
 *
 * @param Status Title Format
 * @desc 合成情報ウィンドウのタイトル表示内容を設定します。
 * @type string[]
 * @default ["\\c[16]合成情報"]
 * 
 * @param Status Title Opacity
 * @desc 合成情報タイトルウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Status Title Frame Hide
 * @desc 合成情報タイトルウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --合成情報ウィンドウの設定--
 * @default
 *
 * @param Unkouwn Item Name
 * @desc 合成結果が不明な場合の表示内容を設定します。
 * @type string[]
 * @default ["？？？？"]
 * 
 * @param Display Difficulty
 * @desc 合成の難易度を表示するか設定します。
 * 1 - 表示する, 0 - 表示しない
 * @default 1
 * 
 * @param Difficulty Format
 * @desc 合成アイテムの生成数の難易度の表示内容を設定します。
 * %1 - 合成の難易度
 * @type string[]
 * @default ["難易度：%1"]
 * 
 * @param Composit Number Format
 * @desc 合成アイテムの生成数の表示内容を設定します。
 * @type string[]
 * @default ["生成数："]
 * 
 * @param Display Recipe Materials
 * @desc レシピから選んでいる場合に、必要素材を表示する。
 * 1 - 表示する, 0 - 表示しない
 * @default 1
 * 
 * @param Recipe Title Format
 * @desc 必要素材を表示する時のタイトル文字列を設定します。
 * @type string[]
 * @default ["必要素材"]
 * 
 * @param Status Opacity
 * @desc 合成情報ウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Status Frame Hide
 * @desc 合成情報ウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --確認ウィンドウの設定(Confirmation Window)--
 * @default
 *
 * @param Conf Title Format
 * @desc アイテム合成時の確認内容を記述します。
 * @type string[]
 * @default ["\\c[16]合成実行の確認"]
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @type string[]
 * @default ["実行する"]
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @type string[]
 * @default ["実行しない"]
 *
 * @param Confirmation Opacity
 * @desc 確認ウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Confirmation Frame Hide
 * @desc 確認ウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --合成結果ウィンドウの設定--
 * @default
 *
 * @param Result Title Format
 * @desc 合成結果ウィンドウのタイトル表示内容を記述します。
 * @type string[]
 * @default ["\\c[16]合成結果"]
 * 
 * @param Result Great Success
 * @desc 大成功時の表示内容を記述します。
 * @type string[]
 * @default ["大成功"]
 * 
 * @param Result Success
 * @desc 成功時の表示内容を記述します。
 * @type string[]
 * @default ["成功"]
 * 
 * @param Result Failure
 * @desc 失敗時の表示内容を記述します。
 * @type string[]
 * @default ["失敗"]
 * 
 * @param Result Lost
 * @desc 消失時の表示内容を記述します。
 * @type string[]
 * @default ["消失"]
 * 
 * @param Result Reset
 * @desc 復元時の表示内容を記述します。
 * @type string[]
 * @default ["復元"]
 * 
 * @param Result Ok Format
 * @desc 確認コマンドの表示内容を記述します。
 * @type string[]
 * @default ["確認"]
 * 
 * @param Result Opacity
 * @desc 合成結果ウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param Result Frame Hide
 * @desc 合成結果ウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --終了確認ウィンドウの設定--
 * @default
 *
 * @param End Title Format
 * @desc アイテム合成を終了する時の確認内容を記述します。
 * @type string[]
 * @default ["\\c[16]合成を終了しますか？"]
 * 
 * @param End Ok Format
 * @desc 終了確認コマンドの「終了する」の表示内容を記述します。
 * @type string[]
 * @default ["終了する"]
 *
 * @param End Cancel Format
 * @desc 終了確認コマンドの「終了しない」の表示内容を記述します。
 * @type string[]
 * @default ["終了しない"]
 *
 * @param End Opacity
 * @desc 終了確認ウィンドウの透明率を指定します。
 * @default 192
 * @type number
 *
 * @param End Frame Hide
 * @desc 終了確認ウィンドウの枠を非表示にするか。
 * @type select
 * @default 表示する(show)
 * @option 表示する(show)
 * @option 表示しない(hide)
 *
 * @param --背景設定(Background Window)--
 * @default 
 * 
 * @param Background Image Name
 * @desc 背景に使用する画像ファイル名を指定します。
 * 画像ファイルは/img/systemに保存すること
 * @default 
 * @require 1
 * @dir img/system/
 * @type file[]
 * 
 * @param --合成時のSEの設定--
 * @default
 * 
 * @param Success SE
 * @desc アイテム合成実行時に鳴らすSEを指定します。
 * @default ["{\"name\":\"Sound2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * @type struct<sound>[]
 * 
 * @param Great SE
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default ["{\"name\":\"Sound2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * @type struct<sound>[]
 *
 * @param Failure SE
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default ["{\"name\":\"Sound2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * @type struct<sound>[]
 *
 * @param Lost SE
 * @desc アイテム合成実行時に鳴らすSEの名前を指定します。
 * @default ["{\"name\":\"Sound2\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * @type struct<sound>[]
 *
 * @param --カテゴリー別の合成コマンドの設定--
 * @default
 * 
 * @param Custom Cmd 1 Name
 * @desc カテゴリー別のコマンド1の表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @default 
 * 
 * @param Custom Cmd 1 Category
 * @desc コマンド1のカテゴリーを設定します。
 * 合成カテゴリーで設定したカテゴリー名と同じ文字列を入力します。
 * @default 
 * 
 * @param Custom Cmd 2 Name
 * @desc カテゴリー別のコマンド2の表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @default 
 * 
 * @param Custom Cmd 2 Category
 * @desc コマンド2のカテゴリーを設定します。
 * 合成カテゴリーで設定したカテゴリー名と同じ文字列を入力します。
 * @default 
 * 
 * @param Custom Cmd 3 Name
 * @desc カテゴリー別のコマンド3の表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @default 
 * 
 * @param Custom Cmd 3 Category
 * @desc コマンド3のカテゴリーを設定します。
 * 合成カテゴリーで設定したカテゴリー名と同じ文字列を入力します。
 * @default 
 * 
 * @param Custom Cmd 4 Name
 * @desc カテゴリー別のコマンド4の表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @default 
 * 
 * @param Custom Cmd 4 Category
 * @desc コマンド4のカテゴリーを設定します。
 * 合成カテゴリーで設定したカテゴリー名と同じ文字列を入力します。
 * @default 
 * 
 * @param Custom Cmd 5 Name
 * @desc カテゴリー別のコマンド5の表示内容を設定します。
 * ';'で区切ると、素材選択時とレシピ選択時の表示が変わります。
 * @default 
 * 
 * @param Custom Cmd 5 Category
 * @desc コマンド5のカテゴリーを設定します。
 * 合成カテゴリーで設定したカテゴリー名と同じ文字列を入力します。
 * @default 
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
 * プラグインパラメータ<Menu Command>を設定することで、メニュー上にコマンドを
 * 表示させることができます。
 * また、複数のコマンドを設定した場合、他のプラグインパラメータにて、リスト方式で
 * 設定した番号の入力内容を反映します。
 * 
 * パラメータの構造
 * <enable>   :メニュー上に表示するか設定します。
 * <name>     :メニューで表示するコマンド名を設定します。
 * <switchId> :設定した番号のスイッチIDがONの時にコマンドを表示します。
 * 
 *  
 * 2. プラグインコマンドから呼び出す。
 * 以下のプラグインコマンドで画面を表示できます。
 * ICS_Open [listNumber]
 * ICS_合成画面表示 [リスト番号]
 * 
 * リスト番号を指定すると、プラグインパラメータでリスト方式で設定した入力内容を
 * 反映します。
 * 指定しない場合は、リストの１番の設定が適用されます。
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
 * プラグインパラメータのリスト入力設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータには、リストを入力する項目がいくつかあります。
 * 例）Composit Title Format、Command Listなど
 * 
 * これらのパラメータについて、リストの２番目以降も設定することで、
 * プラグインコマンドで画面を表示したときに、表示内容をリストの内容に
 * 合わせて変更することができます。
 * 
 * 例えば、プラグインコマンド < ICS_合成画面表示 2 > を実行した場合
 * プラグインパラメータでリストの2番目に設定した表示内容を呼び出します。
 * 
 * これによって、イベントによって画面の表示内容や、実行できるコマンド、背景画像、
 * 成功時等のSEなどを変えることができます。
 * 
 * なお、メニュー画面から実行した場合や、該当するリストの番号の入力がない場合は
 * リストの１番を呼び出します。
 * リストの2番以降は入力は必須ではありませんが、1番目は必ず入力してください。
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
 * 合成スロットにある素材アイテムの組み合わせが、設定したレシピに合致(*1)して
 * いれば、レシピを覚えていなくても合成することができます。
 * 
 * (*1)合致するパターンは、プラグインパラメータ<Recipe Matching Pattern>で
 *     以下の様に設定できます。
 *      0 - レシピと同じ素材を含んでいれば、不要な素材をセットしても合致
 *      1 - レシピと素材アイテムの組み合わせが同一の場合に合致
 * 
 * レシピを覚えていない場合は、合成情報欄は「？？？？」という表示になります。
 * 
 * このとき、成功または大成功、かつ素材スロットのアイテムがレシピと同じ場合に
 * そのレシピを習得します。
 * 
 * レシピを習得した場合、合成情報欄に、合成して出来るアイテムが表示します。
 * 
 * レシピに合致しない組み合わせの場合の結果は、以下の通りです。
 * プラグインパラメータ<Not Applicable to Recipe>の設定で、
 *    消失設定 - 使用したアイテムは無くなります。
 *    復元設定 - 使用したアイテムが戻ります。
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
 * カテゴリー[カテゴリー名]: y
 *    :'カテゴリー名'に属するアイテムを y 個使用します。(*1)
 * 
 * 難易度: x, y, z
 *    :合成の難易度を数値で設定します。
 *    :大成功の難易度が x、成功が y、失敗が z です。
 * 
 * 大成功: 内容
 * 失敗: 内容
 *    :大成功および失敗時の合成アイテムの内容を設定します。
 *    :以下の内容から選んで入力してください。
 *    : 生成数変更(x)
 *    :    - 生成数を変更します。
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
 * item   :アイテム分類の選択コマンド(*1)
 * weapon :武器分類の選択コマンド(*1)
 * armor  :防具分類の選択コマンド(*1)
 * change :右側のアイテムウィンドウに、アイテムを表示するか、
 *         レシピを表示するか変えるコマンド
 * slot   :素材スロットのアイテムを戻すコマンド
 * end    :合成を止めるコマンド
 * custom*:特定のカテゴリーだけ表示する選択コマンドで、
 *         *の番号はプラグインパラメータの設定番号と同じ(*1)(*2)
 * 
 * 各コマンド名は、プラグインパラメータで設定できます。
 * 
 * (*1)';'で入力したコマンド名を区切って２種類設定すると、素材選択時と
 * レシピ選択時でコマンド名を変えることが出来ます。
 * 
 * (*2)customコマンドで表示できるカテゴリーは、アイテム等のメモ欄で、
 * <ICS カテゴリー: カテゴリー名>のタグで設定したカテゴリーです。
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドが使用できます。
 * 
 * 1. アイテム合成画面の表示
 * ICS_Open [compositTitle] [slotTitle] [statusTitle] [commandList]
 * ICS_合成画面表示 [合成タイトル] [スロットタイトル] [情報タイトル] [コマンドリスト]
 *    :[]部の入力は必須ではありません。
 *    :入力した場合、合成画面の各表示を変更します。
 *    :タイトルの文字列に制御文字を使用できます。
 *    :
 *    :コマンドリスト - プラグインパラメータ<Command List>と同じ入力方式です。
 * 
 * ICS_Open [listNumber]
 * ICS_合成画面表示 [リスト番号]
 *    :リスト番号を指定すると、合成画面の表示内容をプラグインパラメータで設定した
 *    :リストの番号のものに変更します。
 * 
 * 2. レシピを追加
 * ICS_ADD_RECIPE ITEMNAME RecipeId
 * ICS_ADD_RECIPE ITEM ItemId RecipeId 
 * ICS_レシピ追加 アイテム名 レシピID
 * ICS_レシピ追加 アイテム アイテムID レシピID
 *    :'アイテム'部は、武器の場合は'武器'、防具の場合は'防具'と入力します。
 *    :指定したアイテムのレシピを覚えます。
 *    :アイテム名や、アイテム、アイテムID部に、v[n]と入力することで、
 *    :ゲーム内変数ID n の内容を参照できます。
 *    :レシピIDを入力しない場合は、指定したアイテムの1つめのレシピになります。
 *    :
 *    :入力例) アイテムID11 がポーションの場合、以下は同じ結果になります。
 *    : ICS_レシピ追加 ポーション 1
 *    : ICS_レシピ追加 アイテム 11 1
 * 
 * 
 * 3. レシピの削除
 * ICS_REDUCE_RECIPE ITEMNAME RecipeId
 * ICS_REDUCE_RECIPE ITEM ItemId RecipeId
 * ICS_レシピ削除 アイテム名 レシピID
 * ICS_レシピ削除 アイテム アイテムID レシピID
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
 * 
 * v1.5.2 - 2017/11/01 : ヘルプ修正
 *    1. レシピの素材にカテゴリーを設定する場合の説明が間違っていたため修正。
 * 
 * v1.5.1 - 2017/10/16 : 機能追加
 *    1. 合成画面を表示するメニューコマンドの設定方式をリスト方式に変更。
 *    2. メニュー画面に複数の合成コマンドを設定する機能を追加。
 * 
 * v1.5.0 - 2017/10/11 : 機能追加、仕様変更
 *    1. 合成画面の表示内容を設定するプラグインパラメータの入力方式を
 *       リスト方式に変更。
 *    2. プラグインコマンドで合成画面を表示するときに、オプションでリスト番号を
 *       指定すると表示内容をリストの番号に合わせて変更する機能を追加。
 *    3. 合成終了時に確認画面を表示する機能を追加。
 * 
 * v1.4.0 - 2017/10/07 : 機能追加
 *    1. プラグインコマンドで背景画像を設定する機能を追加。
 *    2. 特定のカテゴリーのアイテムだけ表示する合成コマンドを作成する機能を追加。
 * 
 * v1.3.2 - 2017/09/03 : 不具合修正
 *    1. 1.3.0の変更部の不具合修正
 * 
 * v1.3.1 - 2017/09/02 : 機能追加
 *    1. 背景画像を設定する機能を追加。
 * 
 * v1.3.0 - 2017/09/01 : 機能追加
 *    1. ウィンドウ背景の透明度と枠の有無を設定する機能を追加。
 * 
 * v1.2.0 - 2017/08/29 : 不具合修正、機能追加
 *    1. １つのアイテムに複数設定したレシピを正しく読み取れない不具合を修正。
 *    2. 合成コマンドの、「アイテム」「武器」「防具」の表示名を
 *       素材選択時とレシピ選択時で変える機能を追加。
 * 
 * v1.1.0 - 2017/08/22 : 機能追加
 *    1. 合成コマンドの、「アイテム」「武器」「防具」の表示名を
 *       プラグインパラメータで設定できる機能を追加。
 *    2. 合成レシピと使用素材の合致条件を設定する機能を追加。
 *    3. 素材を何もセットしていない場合に、合成実行できないように変更。
 * 
 * v1.0.6 - 2017/08/19 : 不具合修正
 *    1. 確認ウィンドウを無効にして合成を実行するとエラーになる不具合を修正。
 * 
 * v1.0.5 - 2017/07/12 : 仕様変更
 *    1. レシピ素材が１種類でも合成可能なように変更。
 * 
 * v1.0.4 - 2017/07/07 : 不具合修正
 *    1. プラグインコマンドで、レシピIDを指定しない場合に正しく処理できない
 *       不具合を修正。
 * 
 * v1.0.3 - 2017/06/27 : 不具合修正、機能追加
 *    1. 合成情報ウィンドウに必要レシピを表示する機能が、正しく動作しない
 *       不具合を修正。
 *    2. 素材数指定ウィンドウに、必要レシピを表示するかどうか設定する
 *       プラグインパラメータを追加。
 * 
 * v1.0.2 - 2017/06/27 不具合修正、ヘルプ修正
 *    1. レシピタグで難易度を設定すると、正しく反映されない不具合を修正。
 * 
 * v1.0.1 - 2017/06/27 ヘルプ修正
 * 
 * v1.0.0 - 2017/06/26 : 正式版公開
 *    1. レシピから選んで生成数を設定しても、スロットに正しい素材員数が
 *       セットされない不具合を修正。
 *    2. 合成画面の表示コマンドの機能拡張。
 *    3. コマンド名を設定するプラグインパラメータの名称変更
 *    4. プラグインコマンドの表記変更
 * 
 * v0.9.4 - 2017/06/11 : 機能追加
 *    1. 合成情報ウィンドウの難易度表示をON/OFFする機能を追加。
 *    2. レシピから選ぶ場合、合成情報ウィンドウに必要レシピを表示する機能を追加。
 * 
 * v0.9.3 - 2017/06/08 : 機能追加
 *    1. 投入したアイテムが何のレシピにも該当しない場合に、使用したアイテムが
 *       戻る処理を追加。
 * 
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

/*~struct~sound:
 * @param name
 * @desc SEの名前を指定します。
 * @default Sound2
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param volume
 * @desc SEの音量を指定します。
 * @default 90
 * @type number
 * @max 100
 * 
 * @param pitch
 * @desc SEのピッチを指定します。
 * @default 100
 * @type number
 * @max 150
 * @min 50
 * 
 * @param pan
 * @desc SEの位相を指定します。
 * @default 0
 * @type number
 * @max 100
 * @min -100
 *
*/
/*~struct~menu:
 * @param enabled
 * @desc メニューにコマンドを表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 * @default 0
 *
 * @param name
 * @desc コマンド名を設定します。
 * @default アイテム合成
 * 
 * @param switchId
 * @desc メニュー欄の表示のON/OFFを制御するスイッチIDを指定します。
 * @default 0
 *
*/

function Game_Composit() {
    this.initialize.apply(this, arguments);
}

function Game_IcsRecipe() {
    this.initialize.apply(this, arguments);
}

function Game_Material() {
    this.initialize.apply(this, arguments);
}

function Game_IcsRecipeBook() {
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

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemCompositionSystem');

    //基本設定
    FTKR.ICS.basic = {
        menuCmd       :paramParse(parameters['Menu Command']),
        categoryId    :Number(parameters['Category Type ID'] || 0),
        enableConf    :Number(parameters['Enable Confirmation'] || 0),
        enableEndConf :Number(parameters['Enable End Confirmation'] || 0),
        varId:{
            itemId    :Number(parameters['Variables Get ItemId'] || 0),
            itemClass :Number(parameters['Variables Get ItemClass'] || 0),
        },
        notApp        :String(parameters['Not Applicable to Recipe'] || 'lost'),
        category      :String(parameters['Category Format'] || 'カテゴリー %1'),
        match         :Number(parameters['Recipe Matching Pattern'] || 0),
    };

    //合成成功率の設定
    FTKR.ICS.success = {
        param         :String(parameters['Composition Parameter'] || ''),
        baseRate      :Number(parameters['Success Base Rate'] || ''),
        upRate        :Number(parameters['Upper Add Rate'] || ''),
        downRate      :Number(parameters['Downer Reduce Rate'] || ''),
        maxRate       :Number(parameters['Max Success Rate'] || ''),
        defDiff       :String(parameters['Default Difficulty'] || ''),
    };

    //背景設定
    FTKR.ICS.background = {
        name          :JSON.parse(parameters['Background Image Name'] || '[]'),
    };

    //合成タイトルウィンドウ設定
    FTKR.ICS.compositTitle = {
        format        :JSON.parse(parameters['Composit Title Format'] || '[]'),
        opacity       :Number(parameters['Comp Title Opacity'] || 192),
        frame         :String(parameters['Comp Title Frame Hide'] || '表示する(show)'),
    };

    //合成コマンド設定
    FTKR.ICS.command = {
        maxCols       :Number(parameters['Category Window MaxCols'] || 1),
        list          :JSON.parse(parameters['Command List'] || '[]'),
        format:{
            material  :JSON.parse(parameters['Change Materials Name'] || '[]'),
            recipe    :JSON.parse(parameters['Change Resipes Name'] || '[]'),
            slot      :JSON.parse(parameters['Slot Cmd Name'] || '[]'),
            action    :JSON.parse(parameters['Action Cmd Name'] || '[]'),
            end       :JSON.parse(parameters['End Cmd Name'] || '[]'),
            item      :JSON.parse(parameters['Item Cmd Name'] || '[]'),
            weapon    :JSON.parse(parameters['Weapon Cmd Name'] || '[]'),
            armor     :JSON.parse(parameters['Armor Cmd Name'] || '[]'),
        },
        opacity       :Number(parameters['Comp Cmd Opacity'] || 192),
        frame         :String(parameters['Comp Cmd Frame Hide'] || '表示する(show)'),
        custom:[
            {},
            { format  :String(parameters['Custom Cmd 1 Name'] || ''),
              category:String(parameters['Custom Cmd 1 Category'] || ''),},
            { format  :String(parameters['Custom Cmd 2 Name'] || ''),
              category:String(parameters['Custom Cmd 2 Category'] || ''),},
            { format  :String(parameters['Custom Cmd 3 Name'] || ''),
              category:String(parameters['Custom Cmd 3 Category'] || ''),},
            { format  :String(parameters['Custom Cmd 4 Name'] || ''),
              category:String(parameters['Custom Cmd 4 Category'] || ''),},
            { format  :String(parameters['Custom Cmd 5 Name'] || ''),
              category:String(parameters['Custom Cmd 5 Category'] || ''),},
        ],
    };

    //合成コストウィンドウ設定
    FTKR.ICS.itemList = {
        opacity       :Number(parameters['Item List Opacity'] || 192),
        frame         :String(parameters['Item List Frame Hide'] || '表示する(show)'),
    };

    //素材数指定ウィンドウ設定
    FTKR.ICS.number = {
        showButton    :Number(parameters['Show Number Button'] || 0),
        dispMaterials :Number(parameters['Display Materials On Number'] || 0),
        opacity       :Number(parameters['Number Opacity'] || 192),
        frame         :String(parameters['Number Frame Hide'] || '表示する(show)'),
    };

    //素材スロットタイトルウィンドウ設定
    FTKR.ICS.slotTitle = {
        format        :JSON.parse(parameters['Slot Title Format'] || '[]'),
        opacity       :Number(parameters['Slot Title Opacity'] || 192),
        frame         :String(parameters['Slot Title Frame Hide'] || '表示する(show)'),
    };

    //素材スロットウィンドウ設定
    FTKR.ICS.slot = {
        emptyIcon     :String(parameters['Empty Icon'] || ''),
        emptyFormat   :JSON.parse(parameters['Empty Format'] || '[]'),
        return        :JSON.parse(parameters['Return All Slot'] || '[]'),
        opacity       :Number(parameters['Slot Opacity'] || 192),
        frame         :String(parameters['Slot Frame Hide'] || '表示する(show)'),
    };

    //合成情報タイトルウィンドウ設定
    FTKR.ICS.statusTitle = {
        format        :JSON.parse(parameters['Status Title Format'] || '[]'),
        opacity       :Number(parameters['Status Title Opacity'] || 192),
        frame         :String(parameters['Status Title Frame Hide'] || '表示する(show)'),
    };

    //合成情報ウィンドウ設定
    FTKR.ICS.status = {
        dispRecipe    :Number(parameters['Display Recipe Materials'] || 0),
        unkouwn       :JSON.parse(parameters['Unkouwn Item Name'] || '[]'),
        number        :JSON.parse(parameters['Composit Number Format'] || '[]'),
        recipeTitle   :JSON.parse(parameters['Recipe Title Format'] || '[]'),
        dispDiff      :Number(parameters['Display Difficulty'] || 0),
        diffFormat    :JSON.parse(parameters['Difficulty Format'] || '[]'),
        opacity       :Number(parameters['Status Opacity'] || 192),
        frame         :String(parameters['Status Frame Hide'] || '表示する(show)'),
    };

    //確認ウィンドウ設定
    FTKR.ICS.confTitle = {
        format        :JSON.parse(parameters['Conf Title Format'] || '[]'),
    };
    FTKR.ICS.conf = {
        okFormat      :JSON.parse(parameters['Confirmation Ok Format'] || '[]'),
        cancelFormat  :JSON.parse(parameters['Confirmation Cancel Format'] || '[]'),
        opacity       :Number(parameters['Confirmation Opacity'] || 192),
        frame         :String(parameters['Confirmation Frame Hide'] || '表示する(show)'),
    };

    //合成結果ウィンドウ設定
    FTKR.ICS.result = {
        format        :JSON.parse(parameters['Result Title Format'] || '[]'),
        great         :JSON.parse(parameters['Result Great Success'] || '[]'),
        success       :JSON.parse(parameters['Result Success'] || '[]'),
        failure       :JSON.parse(parameters['Result Failure'] || '[]'),
        reset         :JSON.parse(parameters['Result Reset'] || '[]'),
        lost          :JSON.parse(parameters['Result Lost'] || '[]'),
        okFormat      :JSON.parse(parameters['Result Ok Format'] || '[]'),
        opacity       :Number(parameters['Result Opacity'] || 192),
        frame         :String(parameters['Result Frame Hide'] || '表示する(show)'),
    };

    //確認ウィンドウ設定
    FTKR.ICS.endConf = {
        format        :JSON.parse(parameters['End Title Format'] || '[]'),
        okFormat      :JSON.parse(parameters['End Ok Format'] || '[]'),
        cancelFormat  :JSON.parse(parameters['End Cancel Format'] || '[]'),
        opacity       :Number(parameters['End Opacity'] || 192),
        frame         :String(parameters['End Frame Hide'] || '表示する(show)'),
    };

    //SE
    FTKR.ICS.systemSe = {
        success   :paramParse(parameters['Success SE']),
        great     :paramParse(parameters['Great SE']),
        failure   :paramParse(parameters['Failure SE']),
        lost      :paramParse(parameters['Lost SE']),
    };

    Window_Base.SUCCESS_CORRECTION_RANK = 1;
    Window_Base.SUCCESS_CORRECTION_CATEGORY = 2;
    Window_Base.SUCCESS_CORRECTION_NUMBER = 3;
    Window_Base.SUCCESS_CORRECTION_ITEM = 4;
    Window_Base.SUCCESS_MAX_RATE = FTKR.ICS.success.maxRate.clamp(0, 10000);

    FTKR.ICS.DATABASE_ITEMS_NUMBER = 0;
    FTKR.ICS.DATABASE_WEAPONS_NUMBER = 0;
    FTKR.ICS.DATABASE_ARMORS_NUMBER = 0;
    FTKR.ICS.windowText = {};

    //=============================================================================
    // 自作関数
    //=============================================================================

    //配列を複製する
    var copyArray = function(arr) {
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
    var copyObject = function(obj) {
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

    var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
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
                start:new RegExp('<' + codeTitle + '>', 'i'),
                end  :new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function(data, regs, prop) {
        return regs.some(function(reg){
            return prop ? data.match(reg[prop]) : data.match(reg);
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

    //objのメモ欄に <metacode> があれば真を返す
    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
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
        arg = arg || 0;
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
    };

    var convertDataClass = function(arg) {
        switch ((arg + '').toUpperCase()) {
            case 'ITEM':
            case 'アイテム':
                return 'item';
            case 'WEAPON':
            case '武器':
                return 'weapon';
            case 'ARMOR':
            case '防具':
                return 'armor';
            default:
                return arg;
        }
    };

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

    Array.prototype.icsType = function() {
        return this[FTKR.ICS.openType-1] ? this[FTKR.ICS.openType-1] : this[0];
    };

    Array.prototype.icsSoundType = function() {
        return this[FTKR.ICS.openType-1] && this[FTKR.ICS.openType-1].name !== '' ? this[FTKR.ICS.openType-1] : this[0];
    };

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
    // Game_Interpreter
    //=============================================================================

    var _ICS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _ICS_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/ICS_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'OPEN':
            case '合成画面表示':
                if (args.length === 1 && !isNaN(args[0])) {
                    FTKR.ICS.openType = Number(args[0]);
                } else {
                    if (args[0]) FTKR.ICS.windowText.title = args[0];
                    if (args[1]) FTKR.ICS.windowText.slotTitle = args[1];
                    if (args[2]) FTKR.ICS.windowText.statusTitle = args[2];
                    if (args[3]) FTKR.ICS.windowText.command = setArgStr(args[3]);
                    if (args[4]) FTKR.ICS.windowText.background = setArgStr(args[4]);
                }
                SceneManager.push(Scene_ICS);
                break;
            case 'ADD_RECIPE':
            case 'レシピ追加':
                this.addRecipe(args);
                break;
            case 'REDUCE_RECIPE':
            case 'レシピ削除':
                this.reduceRecipe(args);
                break;
        }
    };

    Game_Interpreter.prototype.addRecipe = function(args) {
        var dataClass = convertDataClass(setArgStr(args[0]));
        var item = DataManager.searchItemName(dataClass);
        if (item) {
            $gameParty.addRecipe(DataManager.itemDataClass(item), item.id, setArgNum(args[1]));
        } else if (dataClass) {
            $gameParty.addRecipe(dataClass, setArgNum(args[1]), setArgNum(args[2]));
        }
    };

    Game_Interpreter.prototype.reduceRecipe = function(args) {
        var dataClass = convertDataClass(setArgStr(args[0]));
        var item = DataManager.searchItemName(dataClass);
        if (item) {
            $gameParty.reduceRecipe(DataManager.itemDataClass(item), item.id, setArgNum(args[1]));
        } else if (dataClass) {
            $gameParty.reduceRecipe(dataClass, setArgNum(args[1]), setArgNum(args[2]));
        }
    };

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
                obj.ics = new Game_Composit();
                obj.ics.setDataClass('item');

                if (hasObjectMeta(obj, ['ICS ITEM', 'ICS アイテム'])) {
                    obj.ics.setDataClass('item');
                } else if (hasObjectMeta(obj, ['ICS WEAPON', 'ICS 武器'])) {
                    obj.ics.setDataClass('weapon');
                } else if (hasObjectMeta(obj, ['ICS ARMOR', 'ICS 防具'])) {
                    obj.ics.setDataClass('armor');
                } else {
                    var category = readObjectMeta(obj, ['ICS CATEGORY','ICS カテゴリー']);
                    if (category) obj.ics.setDataClass(category);
                }
                var datas = readEntrapmentCodeToTextEx(obj, ['ICS RECIPES', 'ICS レシピ']);
                if(datas) console.log(datas);
                this.setIcsRecipes(obj, datas);
            }
        }
    };

    DataManager.icsCompositionNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (!this.isIcsCategory(obj)) {
                obj.ics = new Game_Composit();
                obj.compositCount = 0;
                obj.ics.setCategory(readObjectMeta(obj, ['ICS CATEGORY','ICS カテゴリー']));
                obj.ics.setRank(Number(readObjectMeta(obj, ['ICS RANK','ICS ランク'])));

                var datas = readEntrapmentCodeToTextEx(obj, ['ICS RECIPES', 'ICS レシピ']);
                this.setIcsRecipes(obj, datas);
            }
        }
    };

    DataManager.setIcsRecipes = function(obj, metaDatas) {
      for (var t = 0; t < metaDatas.length; t++) {
        var datas = metaDatas[t].text.split(';');
        var recipe = new Game_IcsRecipe();
        for (var i = 0; i < datas.length; i++) {
            var match = /(.+):[ ]*(.+)/.exec(datas[i]);
            if (!match) continue;
            var code = /(.+)\[(.+)\]/.exec(match[1]);
            if (code) {
                switch (code[1].toUpperCase()) {
                    case 'ITEM':
                    case 'アイテム':
                        var material = new Game_Material(0, 'item', Number(code[2]), Number(match[2]));
                        recipe.addMaterial(material);
                        break;
                    case 'WEAPON':
                    case '武器':
                        var material = new Game_Material(0, 'weapon', Number(code[2]), Number(match[2]));
                        recipe.addMaterial(material);
                        break;
                    case 'ARMOR':
                    case '防具':
                        var material = new Game_Material(0, 'armor', Number(code[2]), Number(match[2]));
                        recipe.addMaterial(material);
                        break;
                    case 'CATEGORY':
                    case 'カテゴリー':
                        var material = new Game_Material(code[2], '', 0, Number(match[2]));
                        recipe.addMaterial(material);
                        break;
                }
            } else {
                switch (match[1].toUpperCase()) {
                    case 'NUMBER':
                    case '生成数':
                        recipe._number = Number(match[2]);
                        break;
                    case 'GREAT SUCCESS':
                    case '大成功':
                        recipe._great = match[2];
                        break;
                    case 'FAILURE':
                    case '失敗':
                        recipe._failure = match[2];
                        break;
                    case 'REQUIRED':
                    case '必要条件':
                        recipe._required = match[2];
                        break;
                    case 'DIFFICULTY':
                    case '難易度':
                        recipe.setDifficulty((match[2].replace(/\s/g, '')).split(',').num());
                        break;
                    default:
                        var item = this.searchItemName(match[1]);
                        if (item) {
                            var material = new Game_Material(0, this.itemDataClass(item), item.id, Number(match[2]));
                            recipe.addMaterial(material);
                        }
                        break;
                }
            }
        }
        obj.ics.addRecipe(recipe);
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
            var notComp = hasObjectMeta(item, ['ICS 合成アイテム', 'ICS COMPOSIT_ITEM']);
            return !notComp && (item.ics.category() === category ||
                this.itemDataClass(item) === convertDataClass(category));
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

    Game_Composit.prototype.hasRecipe = function() {
        return this.recipe(0) && this.recipe(0).materials().length;
    };

    //=============================================================================
    // Game_IcsRecipe
    //=============================================================================

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
        this.setDifficulty(FTKR.ICS.success.defDiff.split(',').num());
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
        switch ((arg + '').toUpperCase()) {
            case 'ITEM':
            case 'アイテム':
                return 'item' === dataClass;
            case 'WEAPON':
            case '武器':
                return 'weapon' === dataClass;
            case 'ARMOR':
            case '防具':
                return 'armor' === dataClass;
            default:
                return arg === category;
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
            var notComp = hasObjectMeta(item, ['ICS 合成アイテム', 'ICS COMPOSIT_ITEM']);
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
        FTKR.ICS.basic.menuCmd.forEach(function(cmd, i){
            if (cmd.enabled === 1) {
                if (cmd.switchId === 0) {
                    this.addCommand(cmd.name, 'composition', true, i);
                } else if (cmd.switchId > 0 &&
                    $gameSwitches.value(cmd.switchId)) {
                    this.addCommand(cmd.name, 'composition', true, i);
                }
            }
        },this);
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
        var text = FTKR.ICS.windowText.title || FTKR.ICS.compositTitle.format.icsType();
        this.drawTextEx(text, 0, 0);
    };

    Window_IcsCompsiTitle.prototype.standardBackOpacity = function() {
        return FTKR.ICS.compositTitle.opacity;
    };

    Window_IcsCompsiTitle.prototype._refreshFrame = function() {
        if (FTKR.ICS.compositTitle.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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
        this.clearWindow();
    };

    Window_IcsCommand.prototype.clearWindow = function() {
        this._cmdId = null;
        this._itemCount = 0;
        this._showResipe = false;
        this._setMaterials = false;
        this.refresh();
    };

    Window_IcsCommand.prototype.windowWidth = function() {
        return 240;
    };

    Window_IcsCommand.prototype.numVisibleRows = function() {
        return 5;
    };

    Window_IcsCommand.prototype.standardBackOpacity = function() {
        return FTKR.ICS.command.opacity;
    };

    Window_IcsCommand.prototype._refreshFrame = function() {
        if (FTKR.ICS.command.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsCommand.prototype.maxCols = function() {
        return Math.max(FTKR.ICS.command.maxCols, 1);
    };

    Window_IcsCommand.prototype.makeCommandList = function() {
        var commandList = FTKR.ICS.windowText.command || FTKR.ICS.command.list.icsType();
        commandList.split(',').forEach( function(list) {
            if(list) this.setCommand(list.replace(' ',''));
        },this);
    };

    Window_IcsCommand.prototype.icsCmd = function(cmd) {
        var cmds = cmd.split(';');
        return this._showResipe && cmds.length > 1 ? cmds[1] : cmds[0];
    };

    Window_IcsCommand.prototype.setCommand = function(symbol) {
        var format = FTKR.ICS.command.format;
        switch (symbol){
            case 'item':
                var name = this.icsCmd(format.item.icsType());
                if (name) this.addCommand(name,   'item');
                break;
            case 'weapon':
                var name = this.icsCmd(format.weapon.icsType());
                if (name) this.addCommand(name,   'weapon');
                break;
            case 'armor':
                var name = this.icsCmd(format.armor.icsType());
                if (name) this.addCommand(name,   'armor');
                break;
            case 'slot':
                this.addCommand(format.slot.icsType(), 'slot');
                break;
            case 'action':
                this.addCommand(format.action.icsType(), 'action', this._setMaterials);
                break;
            case 'change':
                if (this._showResipe) {
                    this.addCommand(format.material.icsType(),'material');
                } else {
                    this.addCommand(format.recipe.icsType(),  'recipe');
                }
                break;
            case 'end':
                this.addCommand(format.end.icsType(),         'end');
                break;
            default:
                var match = /custom(\d+)/i.exec(symbol);
                if (match) {
                    var custom = FTKR.ICS.command.custom[Number(match[1])];
                    var name = this.icsCmd(custom.format);
                    if (name) this.addCommand(name, custom.category);
                }
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

    Window_IcsCommand.prototype.refreshCom = function(materials) {
        this._setMaterials = !!materials.length
        Window_Command.prototype.refresh.call(this);
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

    Window_IcsItemList.prototype.standardBackOpacity = function() {
        return FTKR.ICS.itemList.opacity;
    };

    Window_IcsItemList.prototype._refreshFrame = function() {
        if (FTKR.ICS.itemList.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsItemList.prototype.isEnabled = function(item) {
        return this._showResipe ? $gameParty.hasRequiredRecipeMaterials(item) : item;
    };

    Window_IcsItemList.prototype.typeId = function() {
        return this._typeId[this.index()];
    };

    Window_IcsItemList.prototype.includes = function(item) {
        if (item && item.ics.category() === this._category) {
            return true;
        } else {
            return Window_ItemList.prototype.includes.call(this, item);
        }
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

    Window_IcsItemList.prototype.setCompositioStateWindow = function(window) {
        this._compositionStateWindow = window;
        this.update();
    };

    Window_IcsItemList.prototype.update = function() {
        Window_ItemList.prototype.update.call(this);
        if (this._showResipe && this._compositionStateWindow) {
            var item = this._data[this._index];
            this._compositionStateWindow.setRecipe(item, this.typeId());
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
        var text = FTKR.ICS.windowText.slotTitle || FTKR.ICS.slotTitle.format.icsType();
        this.drawTextEx(text, 0, 0);
    };

    Window_IcsCompsiSlotTitle.prototype.standardBackOpacity = function() {
        return FTKR.ICS.slotTitle.opacity;
    };

    Window_IcsCompsiSlotTitle.prototype._refreshFrame = function() {
        if (FTKR.ICS.slotTitle.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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

    Window_IcsCompsiSlot.prototype.standardBackOpacity = function() {
        return FTKR.ICS.slot.opacity;
    };

    Window_IcsCompsiSlot.prototype._refreshFrame = function() {
        if (FTKR.ICS.slot.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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
            var emptySlot = this.setSlot(ics.emptyFormat.icsType(), ics.emptyIcon, 0);
            var slot = this._slots[i];
            this._data[i] = slot && slot.item() ? this.setSlotItem(slot) : emptySlot;
        }
        var resetSlot = this.setSlot(ics.return.icsType(), 0, 0);
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

    Window_IcsNumber.prototype.standardBackOpacity = function() {
        return FTKR.ICS.number.opacity;
    };

    Window_IcsNumber.prototype._refreshFrame = function() {
        if (FTKR.ICS.number.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsNumber.prototype.updateButtonsVisiblity = function() {
        if (FTKR.ICS.number.showButton) {
            this.showButtons();
        } else {
            this.hideButtons();
        }
    };

    Window_Base.prototype.drawResipeMaterials = function(item, typeId, x, y) {
        var materials = item.ics.recipe(typeId).materials();
        materials.forEach( function(material, i) {
            var dy = y + this.lineHeight() * i;
            if (material.category()) {
                var text = FTKR.ICS.basic.category.format(material.category());
                this.drawText(text, x, dy);
            } else {
                this.drawItemName(material.item(), x, dy);
            }
            var width = this.width - this.padding * 2;
            this.drawText(material.number(), x, dy, width, 'right');
        },this);
    };

    Window_IcsNumber.prototype.refresh = function() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        if(this._showResipe && FTKR.ICS.number.dispMaterials) {
            var y = this.buttonY() + this.lineHeight();
            this.drawResipeMaterials(this._item, this._typeId, 0, y);
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
        var text = FTKR.ICS.windowText.statusTitle || FTKR.ICS.statusTitle.format.icsType();
        this.drawTextEx(text, 0, 0);
    };

    Window_IcsCompsiStateTitle.prototype.standardBackOpacity = function() {
        return FTKR.ICS.statusTitle.opacity;
    };

    Window_IcsCompsiStateTitle.prototype._refreshFrame = function() {
        if (FTKR.ICS.statusTitle.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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
        this._showResipe = false;
        this.clearWindow();
    };

    Window_IcsCompsiState.prototype.standardBackOpacity = function() {
        return FTKR.ICS.status.opacity;
    };

    Window_IcsCompsiState.prototype._refreshFrame = function() {
        if (FTKR.ICS.status.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsCompsiState.prototype.clearWindow = function() {
        this._slotMaterials = [];
        this._comps = [];
        this._comp = {};
        this._number = null;
        this._learnRecipe = false;
        this._resipeItem = null;
        this._resipeTypeId = null;
        this.refresh();
    };

    Window_IcsCompsiState.prototype.setItems = function(items) {
        if (this._slotMaterials === items) return;
        this._slotMaterials = items;
        this.refresh();
    };

    Window_IcsCompsiState.prototype.setRecipe = function(item, typeId) {
        if (this._resipeItem === item && this._resipeTypeId === typeId) return;
        this._resipeItem = item;
        this._resipeTypeId = typeId;
        this.refresh();
    };

    Window_IcsCompsiState.prototype.resetRecipe = function() {
        this._resipeItem = null;
        this._resipeTypeId = null;
        this.refresh();
    };

    Window_IcsCompsiState.prototype.drawDifficulty = function(value, x, y) {
        if (!FTKR.ICS.status.dispDiff) return;
        var text = FTKR.ICS.status.diffFormat.icsType().format(value);
        this.drawTextEx(text, x, y);
    };

    Window_IcsCompsiState.prototype.refresh = function() {
        this.contents.clear();
        var y = this.lineHeight();
        var w = this.width - this.padding * 2;
        var comp = this.compositionsItem();
        if (comp) {
            var number = this.compositionNumber(comp);
            var has = $gameParty.hasRecipe(DataManager.itemDataClass(comp.item), comp.item.id, comp.typeId);
            if (has > 0 && number) {
                var recipe = comp.item.ics.recipe(comp.typeId);
                var difficulty = recipe.difficulty();
                this.drawText(FTKR.ICS.result.success.icsType(), 0, 0, w/2);
                var success = difficulty.success;
                if (!recipe.great()) success += difficulty.great;
                this.drawDifficulty(success, w/2, 0);
                this.drawText(comp.item.name, 0, y, w);
                this.drawText(number, 0, y, w, 'right');
                var dy = 0;
                if (recipe.great()) {
                    this.drawText(FTKR.ICS.result.great.icsType(), 0, y*(2 + dy), w/2);
                    this.drawDifficulty(difficulty.great, w/2, y*(2 + dy));
                    dy += 1;
                    this.drawText(recipe.great(), 0, y*(2 + dy), w/2);
                    dy += 1;
                }
                if (recipe.failure()) {
                    this.drawText(FTKR.ICS.result.failure.icsType(), 0, y*(2 + dy), w/2);
                    this.drawDifficulty(difficulty.failure, w/2, y*(2 + dy));
                    dy += 1;
                    this.drawText(recipe.failure(), 0, y*(2 + dy), w/2);
                }
            } else {
                this.drawTextEx(FTKR.ICS.status.unkouwn.icsType(), 0, 0);
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
            this._comp = comp;
            this._number = number;
        } else if (FTKR.ICS.status.dispRecipe && this._showResipe && this._resipeItem) {
            this.drawTextEx(FTKR.ICS.status.recipeTitle.icsType(), 0, 0);
            this.resetTextColor();
            var y = FTKR.ICS.status.recipeTitle ? this.lineHeight() : 0;
            this.drawResipeMaterials(this._resipeItem, this._resipeTypeId, 0, y);
            this._comp = {};
            this._number = 0;
        } else {
            this.drawTextEx(FTKR.ICS.status.unkouwn.icsType(), 0, 0);
            this._comp = {};
            this._number = 0;
        }
    };

    //投入した材料から合成できるアイテムを取得する
    Window_IcsCompsiState.prototype.compositionsItem = function() {
        var comps = this.checkMaterials($dataItems).concat(
              this.checkMaterials($dataWeapons), this.checkMaterials($dataArmors));
        return comps.length ? this.maxRequireMaterials() : null;
    };

    //指定したアイテムのリストの中に、合成材料とレシピが合っているアイテムのリストを返す
    //また、合っているアイテムのレシピ情報を this._comps に加える
    Window_IcsCompsiState.prototype.checkMaterials = function(datas) {
        return datas.filter( function(item) {
            if (item && item.ics.hasRecipe()) {
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
        var slotMaterials = this._slotMaterials.clone();
        if (FTKR.ICS.basic.match && materials.length !== slotMaterials.length) return false;
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
        var recipe = composit.item.ics.recipe(composit.typeId);
        recipe.materials().forEach( function(material, i) {
            rates[i] = 0;
            this._slotMaterials.forEach( function(slotMaterial) {
                if (material.matchMaterial(slotMaterial))
                    rates[i] = Math.floor(slotMaterial.number() / material.number());
            },this);
            if (rates[i] > 0) {
                rate = i > 0 ? Math.min(rates[i], rates[i-1]) : rates[i];
            }
        },this);
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
        this.drawTextEx(FTKR.ICS.confTitle.format.icsType(), 0, 0);
    };

    Window_IcsConfTitle.prototype.standardBackOpacity = function() {
        return FTKR.ICS.conf.opacity;
    };

    Window_IcsConfTitle.prototype._refreshFrame = function() {
        if (FTKR.ICS.conf.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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
        this._data = [];
        this._enabled = false;
        this._dicision = false;
        this.refresh();
    };

    Window_IcsConf.prototype.maxCols = function() {
        return 2;
    };

    Window_IcsConf.prototype.standardBackOpacity = function() {
        return FTKR.ICS.conf.opacity;
    };

    Window_IcsConf.prototype._refreshFrame = function() {
        if (FTKR.ICS.conf.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_IcsConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_IcsConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.ICS.conf.okFormat.icsType()},
            {dicision:false, disp:FTKR.ICS.conf.cancelFormat.icsType()}
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
    // Window_IcsEndConfTitle
    //=============================================================================

    function Window_IcsEndConfTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_IcsEndConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_IcsEndConfTitle.prototype.constructor = Window_IcsEndConfTitle;

    Window_IcsEndConfTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_IcsEndConfTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTextEx(FTKR.ICS.endConf.format.icsType(), 0, 0);
    };

    Window_IcsEndConfTitle.prototype.standardBackOpacity = function() {
        return FTKR.ICS.endConf.opacity;
    };

    Window_IcsEndConfTitle.prototype._refreshFrame = function() {
        if (FTKR.ICS.endConf.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    //=============================================================================
    // Window_IcsEndConf
    //=============================================================================

    function Window_IcsEndConf() {
        this.initialize.apply(this, arguments);
    }

    Window_IcsEndConf.prototype = Object.create(Window_Selectable.prototype);
    Window_IcsEndConf.prototype.constructor = Window_IcsEndConf;

    Window_IcsEndConf.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._dicision = false;
        this.refresh();
    };

    Window_IcsEndConf.prototype.maxCols = function() {
        return 2;
    };

    Window_IcsEndConf.prototype.standardBackOpacity = function() {
        return FTKR.ICS.endConf.opacity;
    };

    Window_IcsEndConf.prototype._refreshFrame = function() {
        if (FTKR.ICS.endConf.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsEndConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_IcsEndConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_IcsEndConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.ICS.endConf.okFormat.icsType()},
            {dicision:false, disp:FTKR.ICS.endConf.cancelFormat.icsType()}
        ];
    };

    Window_IcsEndConf.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_IcsEndConf.prototype.isEnabled = function() {
        return true;
    };

    Window_IcsEndConf.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled();
    };

    Window_IcsEndConf.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        this.changePaintOpacity(this.isEnabled());
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
        this.changePaintOpacity(1);
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

    Window_IcsResult.prototype.standardBackOpacity = function() {
        return FTKR.ICS.result.opacity;
    };

    Window_IcsResult.prototype._refreshFrame = function() {
        if (FTKR.ICS.result.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
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
        this.drawTextEx(FTKR.ICS.result.format.icsType(), 0, 0);
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
                return result.great.icsType();
            case 'success':
                return result.success.icsType();
            case 'failure':
                return result.failure.icsType();
            case 'reset':
                return result.reset.icsType();
            default:
                return result.lost.icsType();
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

    Window_IcsResultConf.prototype.standardBackOpacity = function() {
        return FTKR.ICS.result.opacity;
    };

    Window_IcsResultConf.prototype._refreshFrame = function() {
        if (FTKR.ICS.result.frame === '表示する(show)') Window.prototype._refreshFrame.call(this);
    };
  
    Window_IcsResultConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_IcsResultConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_IcsResultConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.ICS.result.okFormat.icsType()},
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
        if (this.isIcsShowCommand()){
            this._commandWindow.setHandler('composition', this.commandIcs.bind(this));
        };/*
        if (FTKR.ICS.basic.showCmd === 1) {
            this._commandWindow.setHandler('composition', this.commandIcs.bind(this));
        }*/
    };

    Scene_Menu.prototype.isIcsShowCommand = function() {
        return FTKR.ICS.basic.menuCmd.some( function(cmd){
            return cmd.enabled;
        });
    };

    Scene_Menu.prototype.commandIcs = function() {
        FTKR.ICS.openType = 1 + Number(this._commandWindow.currentExt());
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

    Scene_ICS.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = this.loadBackGroundImage();
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadSystem(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_ICS.prototype.loadBackGroundImage = function() {
        return FTKR.ICS.windowText.background || FTKR.ICS.background.name.icsType();
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
        if (FTKR.ICS.basic.enableEndConf) {
            this.createEndConfTitleWindow();
            this.createEndConfWindow();
        }
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
        this._itemWindow.setCompositioStateWindow(this._compositionStateWindow);
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

    Scene_ICS.prototype.createEndConfTitleWindow = function() {
        var wx = Graphics.boxWidth / 4;
        var wh = this._helpWindow.fittingHeight(1);
        var ww = Graphics.boxWidth / 2;
        var wy = Graphics.boxHeight / 2 - wh;
        this._stsEndConfTitleWindow = new Window_IcsEndConfTitle(wx, wy, ww, wh);
        this.addWindow(this._stsEndConfTitleWindow);
        this._stsEndConfTitleWindow.hide();
    };

    Scene_ICS.prototype.createEndConfWindow = function() {
        var ctw = this._stsEndConfTitleWindow;
        var wx = ctw.x;
        var wy = ctw.y + ctw.height;
        var ww = ctw.width;
        var wh = this._helpWindow.fittingHeight(1);
        this._stsEndConfWindow = new Window_IcsEndConf(wx, wy, ww, wh);
        var window = this._stsEndConfWindow;
        window.setHandler('ok', this.onEndConfOk.bind(this));
        window.setHandler('cancel', this.onEndConfCancel.bind(this));
        this.addWindow(window);
        window.hide();
    };

    Scene_ICS.prototype.slotsClear = function() {
        this._itemWindow.refresh();
        this._compositionSlotWindow.clearWindow();
        this._compositionStateWindow.clearWindow();
        this._categoryWindow.refreshCom(this._compositionSlotWindow.materials());
        this._resultWindow.clearWindow();
    }

    Scene_ICS.prototype.resetItems = function() {
        this._compositionSlotWindow._slots.forEach( function(slot, i) {
            if(slot) $gameParty.gainItem(slot.item(), slot.number());
        });
    };

    Scene_ICS.prototype.slotsReset = function() {
        this.resetItems();
        this.slotsClear();
      };

    Scene_ICS.prototype.onCompositionEnd = function() {
        this.slotsReset();
        FTKR.ICS.windowText = {};
        this.popScene();
    };
    
    Scene_ICS.prototype.onCategoryCancel = function() {
        if (FTKR.ICS.basic.enableEndConf) {
            this.stsEndConfShow();
            this._stsEndConfWindow.actSelect(0);
        } else {
            this.onCompositionEnd();
        }/*
        this.slotsReset();
        FTKR.ICS.windowText = {};
        this.popScene();*/
    };

    Scene_ICS.prototype.onCategoryOk = function() {
        switch(this._categoryWindow.currentSymbol()) {
            case 'slot':
                this._compositionSlotWindow.actSelect(0);
                break;
            case 'action':
                var materials = this._compositionSlotWindow.materials();
                if (!materials.length) {
                    this._categoryWindow.actSelect(-1);
                } else if (FTKR.ICS.basic.enableConf) {
                    this._stsConfWindow.setEnabled(materials.length);
                    this.stsConfShow();
                    this._stsConfWindow.actSelect(0);
                } else {
                    this.composition(FTKR.ICS.systemSe);
                }
                break;
            case 'recipe':
                this._categoryWindow._showResipe = true;
                this._itemWindow._showResipe = true;
                this._compositionStateWindow._showResipe = true;
                this._categoryWindow.actSelect(-1);
                break;
            case 'material':
                this._categoryWindow._showResipe = false;
                this._itemWindow._showResipe = false;
                this._compositionStateWindow._showResipe = false;
                this._categoryWindow.actSelect(-1);
                break;
            case 'end':
                if (FTKR.ICS.basic.enableEndConf) {
                    this.stsEndConfShow();
                    this._stsEndConfWindow.actSelect(0);
                } else {
                    this.onCategoryCancel();
                }
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
            var numbers = [];
            var items = recipe.materials().map( function(material,i) {
                numbers[i] = number * material.number();
                return material.item();
            },this);
            items.forEach( function(item, i) {
                this.setSlotItem(item, numbers[i]);
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
            compsiSlot[0]._number += number;
        } else {
            csw._slots[csw._itemCount] = new Game_Material('', DataManager.itemDataClass(item), item.id, number);
            csw._itemCount++;
        }
        $gameParty.loseItem(item, number);
        this._categoryWindow._setMaterials = true;
        this._categoryWindow.refresh();
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
        this._categoryWindow.refreshCom(this._compositionSlotWindow.materials());
    };

    Scene_ICS.prototype.onIcsSlotCancel = function() {
        this._compositionSlotWindow.deselect();
        this._categoryWindow.actSelect(-1);
    };

    Scene_ICS.prototype.onConfirmationOk = function() {
        var cfw = this._stsConfWindow;
        if (cfw.item().dicision) {
            cfw.deselect();
            this.composition(FTKR.ICS.systemSe)
            this.stsConfHide();
        } else {
            this.onConfirmationCancel();
        }
    };

    Scene_ICS.prototype.isSpecialComp = function(item) {
        return item && item.wtypeId === FTKR.ICS.basic.categoryId &&
            hasObjectMeta(item, ['ICS 特殊合成', 'ICS SPECIAL_COMPOSITION']);
    }

    //合成実行処理
    Scene_ICS.prototype.composition = function(sound) {
        var composit = this._compositionStateWindow;
        var comp = composit._comp;
        var item = comp.item;
        var typeId = comp.typeId;
        if (item) {
            var getItem = {
                item:this.convertCategoryItem(comp),
                number:composit._number,
            };
            var judg = this.successJudg(item, typeId);
            if (this.successApply(judg, getItem, item.ics.recipe(typeId), sound) && composit._learnRecipe) {
                $gameParty.addRecipe(DataManager.itemDataClass(item), item.id, typeId);
            }
            if (this.isSpecialComp(item) && judg !== 'lost') {
                var baseItem = comp.slots[0].item();
                var addItem = comp.slots[1].item();
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
            AudioManager.playStaticSe(sound.lost.icsSoundType());
            if (FTKR.ICS.basic.notApp === 'reset') {
                this.resetItems();
                this._resultWindow.setResult('reset', null, 0);
            } else {
                this._resultWindow.setResult('lost', null, 0);
            }
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
                console.log(sound.success);
                AudioManager.playStaticSe(sound.success.icsSoundType());
                break;
            case 'great':
                console.log(sound.great);
                AudioManager.playStaticSe(sound.great.icsSoundType());
                correct = this.successCorrection(recipe.great());
                break;
            case 'failure':
                console.log(sound.failure);
                AudioManager.playStaticSe(sound.failure.icsSoundType());
                correct = this.successCorrection(recipe.failure());
                success = false;
                break;
            default:
                console.log(sound.lost);
                AudioManager.playStaticSe(sound.lost.icsSoundType());
                correct = this.successCorrection('なし');
                success = false;
                break;
        }
        this.setCorrection(correct, getItem);
        return success;
    };

    Scene_ICS.prototype.successCorrection = function(success) {
        var match = /(.+)\((.+)\)/.exec(success);
        if (!match) return {code:Window_Base.SUCCESS_CORRECTION_NUMBER, value:0,};
        switch (match[1].toUpperCase()) {
            case 'ランク変更':
            case 'CHANGE_RANK':
                return {code:Window_Base.SUCCESS_CORRECTION_RANK, value:Number(match[2]),};
            case 'カテゴリー変更':
            case 'CHANGE_CATEGORY':
                return {code:Window_Base.SUCCESS_CORRECTION_CATEGORY, value:match[2],};
            case '生成数変更':
            case 'CHANGE_NUMBER':
                return {code:Window_Base.SUCCESS_CORRECTION_NUMBER, value:Number(match[2]),};
            case 'アイテム変更':
            case 'CHANGE_ITEM':
                return {code:Window_Base.SUCCESS_CORRECTION_ITEM, value:match[2],};
        }
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
        FTKR.setGameData(null, null, item);
        return Math.max(Math.floor(FTKR.evalFormula(formula)), 0);
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

    Scene_ICS.prototype.stsEndConfShow = function() {
        this._stsEndConfWindow.show();
        this._stsEndConfTitleWindow.show();
    };

    Scene_ICS.prototype.onResultOk = function() {
        this._resultConfWindow.deselect();
        this._categoryWindow.actSelect(-1);
        this.slotsClear();
        this._resultWindow.hide();
        this._resultConfWindow.hide();
    };

    Scene_ICS.prototype.onEndConfOk = function() {
        var cfw = this._stsEndConfWindow;
        console.log(cfw.item());
        if (cfw.item().dicision) {
            cfw.deselect();
            this.onCompositionEnd();
        } else {
            this.onEndConfCancel();
        }
    };
    Scene_ICS.prototype.onEndConfCancel = function() {
        this._stsEndConfWindow.deselect();
        this._stsEndConfWindow.hide();
        this._stsEndConfTitleWindow.hide();
        this._categoryWindow.actSelect(-1);
    };

}());//EOF