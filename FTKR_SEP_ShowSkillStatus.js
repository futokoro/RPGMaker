//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// スキルのステータスを表示するプラグイン
// FTKR_SEP_ShowSkillStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/02/24
// 最終更新日 : 2017/04/04
// バージョン : v1.4.2
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_SSS = true;

var FTKR = FTKR || {};
FTKR.SSS = FTKR.SSS || {};

//=============================================================================
/*:
 * @plugindesc v1.4.2 スキルのステータスを表示するプラグイン
 * @author フトコロ
 *
 * @param ---Layout---
 * @default
 * 
 * @param Apply SSS Layout
 * @desc スキルメニューのレイアウトをSSS仕様に変えるか。
 *  0 - 変えない, 1 - Aタイプに変える, 2 - Bタイプに変える
 * @default 0
 *
 * @param Show Disabled Item
 * @desc 無効になっているダメージや使用効果も表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 0
 *
 * @param Draw SSS Cost
 * @desc スキルのコスト表示をSSS仕様に変えるか。
 *  1 - 変える, 0 - 変えない
 * @default 0
 *
 * @param Enabled Sub Command
 * @desc スキル選択後にサブコマンドを表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 0
 *
 * @param Enable Confirmation
 * @desc スキルを忘れる時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 1
 *
 * @param --Skill List Window--
 * @default
 * 
 * @param Skill List Width
 * @desc スキルリストウィンドウの幅を指定します。
 *  デフォルトは 240
 * @default 240
 *
 * @param Skill List Max Cols
 * @desc スキルリスト1行に表示するスキルの数を指定します。
 *  (最小値 1)
 * @default 2
 * 
 * @param Skill List Spacing
 * @desc スキル複数列表示の場合のスキルの間隔を指定します。
 *  (デフォルト 48)
 * @default 48
 * 
 * @param SSS HP Cost Format
 * @desc SSS仕様のコスト表示内容を文字列で記述します。
 *  %1 - HPコスト
 * @default %1\c[21]\nHP\c[21]\sb[50]
 *
 * @param SSS TP Cost Format
 * @desc SSS仕様のコスト表示内容を文字列で記述します。
 *  %1 - TPコスト
 * @default %1\c[29]\nTP\c[29]\sb[50]
 *
 * @param SSS MP Cost Format
 * @desc SSS仕様のMPコスト表示内容を文字列で記述します。
 *  %1 - MPコスト
 * @default %1\c[23]\nMP\c[23]\sb[50]
 *
 * @param --Skill Status Title Window--
 * @default
 * 
 * @param Skill Status Title Format
 * @desc タイトルの表示内容を文字列で記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default [%2]のスキル情報\c[16]
 *
 * @param Discription Lines
 * @desc スキルの説明文の行数を設定します。
 * @default 2
 *
 * @param --Skill Status Window--
 * @default
 *
 * @param Skill Status Text1 Format
 * @desc スキルステータスのテキスト1の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default %1
 *
 * @param Skill Status Text2 Format
 * @desc スキルステータスのテキスト2の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default 
 *
 * @param Skill Status Text3 Format
 * @desc スキルステータスのテキスト3の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default %2\R
 *
 * @param Skill Status Width Rate
 * @desc テキスト1～3を表示するテキスト幅の比率
 *  カンマ(,)で区切って表示すること
 * @default 4,1,5
 * 
 * @param Skill Status Line Color1
 * @desc ラインの色1を指定します。
 *  -1 を設定した場合は、ラインは非表示
 * @default 17
 * 
 * @param Skill Status Line Color2
 * @desc ラインの色2を指定します。
 *  -1 を設定した場合は、ラインは非表示
 * @default 17
 *
 * @param Skill Status Max Cols
 * @desc 1行に表示するステータスの数を指定します。
 *  (最小値 1, 最大値 3)
 * @default 1
 * 
 * @param Skill Status Item Heigth
 * @desc 1つのステータスを表示する行数を指定します。
 *  (最小値 1, 最大値 3)
 * @default 1
 * 
 * @param --Actor Status Layout--
 * @default
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,hp,mp
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default 
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,5,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,1,0
 *
 * @param Display Face Scale
 * @desc アクターの顔画像を表示スケールを設定します
 * 標準は 4 で、それ以外の場合に画像を拡大縮小します
 * @default 3
 * 
 * @param ---Parameter Name---
 * @default
 *
 * @param Main damage Name
 * @desc ダメージID 0 の表示名
 *  %1 - ダメージ倍率
 * @default 通常%1%
 *
 * @param No damage Type Name
 * @desc ダメージタイプの「なし」の表示名
 * @default ダメージなし
 *
 * @param HP damage Name
 * @desc ダメージタイプの「HPダメージ」の表示名
 * @default HPダメージ
 *
 * @param MP damage Name
 * @desc ダメージタイプの「MPダメージ」の表示名
 * @default MPダメージ
 *
 * @param HP recovery Name
 * @desc ダメージタイプの「HP回復」の表示名
 * @default HP回復
 *
 * @param MP recovery Name
 * @desc ダメージタイプの「MP回復」の表示名
 * @default MP回復
 *
 * @param HP absorption Name
 * @desc ダメージタイプの「HP吸収」の表示名
 * @default HP吸収
 *
 * @param MP absorption Name
 * @desc ダメージタイプの「MP吸収」の表示名
 * @default MP吸収
 *
 * @param MP cost Name
 * @desc スキルパラメータの「MP消費」の表示名
 * @default MP消費
 *
 * @param TP cost Name
 * @desc スキルパラメータの「TP消費」の表示名
 * @default TP消費
 *
 * @param Scope Name
 * @desc スキルパラメータの「範囲」の表示名
 * @default 範囲
 *
 * @param Speed Name
 * @desc スキルパラメータの「速度補正」の表示名
 * @default 速度補正
 *
 * @param TP gain Name
 * @desc スキルパラメータの「得TP」の表示名
 * @default 得TP
 *
 * @param Repeats Name
 * @desc スキルパラメータの「連続回数」の表示名
 * @default 連続回数
 *
 * @param Effects Name
 * @desc スキルパラメータの「使用効果」の表示名
 * @default 使用効果
 *
 * @param Scope One Enemy Name
 * @desc 範囲の「敵単体」の表示名
 * @default 敵単体
 *
 * @param Scope All Enemies Name
 * @desc 範囲の「敵全体」の表示名
 * @default 敵全体
 *
 * @param Scope Random Enemies Name
 * @desc 範囲の「敵x体ランダム」の表示名
 *  %1 - 敵X体の X 
 * @default 敵%1体ランダム
 * 
 * @param Scope One Friend Name
 * @desc 範囲の「味方単体」の表示名
 * @default 味方単体
 *
 * @param Scope All Friends Name
 * @desc 範囲の「味方全体」の表示名
 * @default 味方全体
 *
 * @param Scope One Dead Name
 * @desc 範囲の「味方単体(戦闘不能)」の表示名
 * @default 味方単体(戦闘不能)
 *
 * @param Scope All Deads Name
 * @desc 範囲の「味方全体(戦闘不能)」の表示名
 * @default 味方全体(戦闘不能)
 *
 * @param Scope User Name
 * @desc 範囲の「使用者」の表示名
 * @default 使用者
 *
 * @param Scope Non Name
 * @desc 範囲の「なし」の表示名
 * @default なし
 *
 * @param Effects Non Name
 * @desc 使用効果の「なし」の表示名
 * @default なし
 *
 * @param Effects Add Name
 * @desc 使用効果の、ステートまたは強化/弱体を付加する場合の表示名
 *  実際の表示内容は、ステート名 + この文字列 + 数値
 * @default 付加
 *
 * @param Effects Remove Name
 * @desc 使用効果の、ステートまたは強化/弱体を解除する場合の表示名
 *  実際の表示内容は、ステート名 + この文字列 + 数値
 * @default 解除
 *
 * @param Effects Buff Name
 * @desc 使用効果の「強化」の表示名
 *  実際の表示内容は、ステータス名 + この文字列 + ターン数
 * @default 強化
 *
 * @param Effects Debuff Name
 * @desc 使用効果の「弱体」の表示名
 *  実際の表示内容は、ステータス名 + この文字列 + ターン数
 * @default 弱体
 *
 * @param Elements Name
 * @desc スキルパラメータの「属性」の表示名
 * @default 属性
 *
 * @param Normal Attack Elm Name
 * @desc 属性の「通常攻撃」の表示名
 * @default 通常攻撃
 *
 * @param Non Element Name
 * @desc 属性の「なし」の表示名
 * @default なし
 * 
 * @param --Conf Title Window--
 * @default
 *
 * @param Conf Title Format
 * @desc スキル削除実行時の確認内容を記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default [%2]を忘れますか？
 * 
 * @param Conf Title Position X
 * @desc 確認ウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 204
 *
 * @param Conf Title Position Y
 * @desc 確認ウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 240
 *
 * @param Conf Title Width
 * @desc 確認ウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 408
 *
 * @param --Confirmation Window--
 * @default
 *
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param --Sub Command Window--
 * @default
 *
 * @param Command Use Format
 * @desc 実行コマンドの「使う」の表示内容を記述します。
 * @default 使う
 *
 * @param Command Forget Format
 * @desc 実行コマンドの「忘れる」の表示内容を記述します。
 * @default 忘れる
 *
 * @param Command Cancel Format
 * @desc 実行コマンドの「やめる」の表示内容を記述します。
 * @default やめる
 *
 * @param --Cost Icon--
 * @default
 *
 * @param Cost Gold Icon
 * @desc コストをお金に設定した場合に表示するアイコンを指定します。
 * @default 314
 *
 * @param Cost Variables Icon
 * @desc コストを変数に設定した場合に表示するアイコンを指定します。
 * @default 307
 *
 * @param ---Parameter Icon---
 * @default
 *
 * @param SEP Default Icon
 * @desc デフォルトで表示するアイコンを設定します。
 * @default 73
 *
 * @param ---SEP Type 1---
 * @default
 *
 * @param SEP Type 1 Type
 * @desc タイプ1のパラメータを設定します。
 * @default damages
 *
 * @param SEP Type 1 Icon
 * @desc タイプ1のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 2---
 * @default
 *
 * @param SEP Type 2 Type
 * @desc タイプ2のパラメータを設定します。
 * @default mpCost
 *
 * @param SEP Type 2 Icon
 * @desc タイプ2のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 3---
 * @default
 *
 * @param SEP Type 3 Type
 * @desc タイプ3のパラメータを設定します。
 * @default tpCost
 *
 * @param SEP Type 3 Icon
 * @desc タイプ3のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 4---
 * @default
 *
 * @param SEP Type 4 Type
 * @desc タイプ4のパラメータを設定します。
 * @default speed
 *
 * @param SEP Type 4 Icon
 * @desc タイプ4のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 5---
 * @default
 *
 * @param SEP Type 5 Type
 * @desc タイプ5のパラメータを設定します。
 * @default tpGain
 *
 * @param SEP Type 5 Icon
 * @desc タイプ5のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 6---
 * @default
 *
 * @param SEP Type 6 Type
 * @desc タイプ6のパラメータを設定します。
 * @default repeats
 *
 * @param SEP Type 6 Icon
 * @desc タイプ6のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 7---
 * @default
 *
 * @param SEP Type 7 Type
 * @desc タイプ7のパラメータを設定します。
 * @default scope
 *
 * @param SEP Type 7 Icon
 * @desc タイプ7のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 8---
 * @default
 *
 * @param SEP Type 8 Type
 * @desc タイプ8のパラメータを設定します。
 * @default effects
 *
 * @param SEP Type 8 Icon
 * @desc タイプ8のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 9---
 * @default
 *
 * @param SEP Type 9 Type
 * @desc タイプ9のパラメータを設定します。
 * @default 
 *
 * @param SEP Type 9 Icon
 * @desc タイプ9のアイコンを設定します。
 * @default 
 *
 * @param ---SEP Type 10---
 * @default
 *
 * @param SEP Type 10 Type
 * @desc タイプ10のパラメータを設定します。
 * @default 
 *
 * @param SEP Type 10 Icon
 * @desc タイプ10のアイコンを設定します。
 * @default 
 *
 * @param --Basic Setting--
 * @default
 * 
 * @param Display Frame Type
 * @desc 表示するコマンド枠のタイプを設定します(0 - 非表示)
 * 1 - 単線, 2 - 複線, 3 - 画像, 4 - 単線+画像, 5 - 複線+画像
 * @default 1
 * 
 * @param When To Display Frame
 * @desc コマンド枠を表示するタイミング
 * 0 - 常時, 1 - カーソルと重なる時, 2 - カーソルと重ならない時
 * @default 1
 * 
 * @param Change Frame On Cursor
 * @desc カーソルと重なった時に枠を変更する機能
 * 0 - 無効, 1 - 有効
 * @default 1
 * 
 * @param Hide Cursor
 * @desc コマンドカーソルを非表示にする機能
 * 0 - 無効, 1 - 有効
 * @default 0
 * 
 * @param --Command Line Type--
 * @default
 * 
 * @param Default Line Color
 * @desc 標準で枠線に使用する色番号
 * @default 0
 * 
 * @param Line Color On Cursor
 * @desc カーソルと重なった時に使用する色番号
 * @default 17
 * 
 * @param Line Thick
 * @desc 枠線の太さ
 * @default 2
 * 
 * @param Sub Line Color
 * @desc 複線時に使用する枠線の色番号
 * @default 15
 * 
 * @param Sub Line Thick
 * @desc 複線時に使用する枠線の太さ
 * @default 1
 * 
 * @param Default Rect Color
 * @desc 標準で枠内塗潰しに使用する色番号
 * @default 
 * 
 * @param Rect Color On Cursor
 * @desc カーソルと重なった時に使用する色番号
 * @default
 * 
 * @param --Command Image Type--
 * @default
 * 
 * @param Image Name
 * @desc 使用する画像名
 * ファイルは /img/system/ に保存してください
 * @default 
 * 
 * @param Image Width
 * @desc 枠画像の幅
 * 注意：画像ファイルの幅ではありません
 * @default 
 * 
 * @param Image Height
 * @desc 枠画像の高さ
 * 注意：画像ファイルの高さではありません
 * @default 
 * 
 * @param Enabled Change Scale
 * @desc 枠画像とカーソルサイズが異なる時の自動サイズ調整機能
 * 0 - 無効, 1 - 有効
 * @default 1
 * 
 * @param Image Offset X
 * @desc カーソル枠に対する枠画像のX方向のズレ
 * @default 0
 * 
 * @param Image Offset Y
 * @desc カーソル枠に対する枠画像のY方向のズレ
 * @default 0
 * 
 * @param Image Offset Width
 * @desc カーソル枠に対する枠画像の幅の差
 * @default 0
 * 
 * @param Image Offset Height
 * @desc カーソル枠に対する枠画像の高さの差
 * @default 0
 * 
 * @param Default Image Index
 * @desc 標準で表示する画像の番号
 * @default 0
 * 
 * @param Image Index On Cursor
 * @desc カーソルと重なった時に表示する画像の番号
 * @default 1
 *
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、FTKR_SkillSepSystem.jsの拡張プラグインです。
 *
 * 本プラグインを実装することで、スキルメニュー画面にスキルのパラメータを
 * 表示することができます。
 *
 * また、メニューのスキル選択画面で、習得済みのスキルを忘れさせることができる
 * 機能を追加します。
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *
 * 2. 本プラグインを動作させるためには、FTKR_SkillExpansion.js(v1.2以降)が
 *    必要です。
 *    本プラグインは、FTKR_SkillExpansion.jsよりも下の位置になるように
 *    追加してください。
 * 
 * 3. ウィンドウ構成をBタイプにする場合、
 *    FTKR_CustomSimpleActorStatus.js(v1.1.x)が必要です。
 *    本プラグインは、FTKR_CustomSimpleActorStatus.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 4. スキルに枠を表示する場合、FTKR_DisplayCommandFrame.jsが必要です。
 *    本プラグインは、FTKR_DisplayCommandFrame.jsよりも下の位置に
 *    なるように追加してください。
 * 
 *-----------------------------------------------------------------------------
 * ウィンドウの構成
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Apply SSS Layout>の設定により、以下の2タイプの
 * ウィンドウ構成を選べます
 * 
 * [<Apply SSS Layout>が 1 - Aタイプに変える - の場合]
 * 
 * ┌-----------─-------------------------------------┐
 * │                      <1>                         │
 * ├-----------┬-------------------------------------┤
 * │           │                                     │
 * │    <2>    │                <4>                  │
 * │           │                                     │
 * ├-----------┼-------------------------------------┤
 * │           │                <5>                  │
 * │           ├-------------------------------------┤
 * │           │                <6>                  │
 * │    <3>    │                                     │
 * │           │                                     │
 * │           │                                     │
 * │           │                                     │
 * └-----------┴-------------------------------------┘
 * 
 * 1. ヘルプウィンドウ
 * 2. コマンドウィンドウ
 * 3. スキルリストウィンドウ)
 * 4. アクターステータスウィンドウ
 * 5. スキルステータスタイトルウィンドウ
 * 6. スキルステータスウィンドウ
 * 
 * 
 * [<Apply SSS Layout>が 2 - Bタイプに変える の場合]
 * 
 * ┌-----------┬-------------------------------------┐
 * │    <1>    │                <4>                  │
 * ├-----------┤                                     │
 * │           ├-------------------------------------┤
 * │    <2>    │                                     │
 * │           │                                     │
 * ├-----------┤                                     │
 * │           │                <5>                  │
 * │           │                                     │
 * │           │                                     │
 * │    <3>    │                                     │
 * │           │                                     │
 * │           │                                     │
 * │           │                                     │
 * └-----------┴-------------------------------------┘
 * 
 * 1. アクターステータスウィンドウ
 * 2. スキルタイプリストウィンドウ
 * 3. スキルリストウィンドウ
 * 4. スキルステータスタイトルウィンドウ
 * 5. スキルステータスウィンドウ
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルリストウィンドウ
 *-----------------------------------------------------------------------------
 * 習得済みの「スキル名」を表示します。
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Skill List Width>
 *          :スキルリストウィンドウの幅を設定します。
 *          :デフォルトは、コマンドリストと同じ 240 です。
 *          :この値を変更すると、これに紐付いている他の
 *          :ウィンドウの幅も自動的に変わります。
 * 
 * <Skill List Max Cols>
 *          :1行に表示するスキルの数を指定します。
 * 
 * <Skill List Spacing>
 *          :<Skill List Max Cols>の設定で、スキルを複数列表示にした場合の
 *          :スキルの間隔を指定します。
 * 
 * <SSS HP Cost Format>
 * <SSS TP Cost Format>
 * <SSS MP Cost Format>
 *          :<Draw SSS Cost>の設定で、コスト表示を変える場合の各コストの
 *          :表示内容を指定します。
 *          :複数種類のコストがある場合は、HP、TP、MPの順に表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルステータスタイトルウィンドウ (Sep Title Window)
 *-----------------------------------------------------------------------------
 * 自由に記述を変更できるタイトル行と、スキルの属性と説明文を表示する
 * ウィンドウです。以下のプラグインパラメータで変更できます。
 * 
 * スキルの属性で表示される内容は、ダメージID 0 の属性です。
 * ただし、スキル以外の追加属性の特徴を乗せていた場合でも、その属性は
 * 表示しません。
 * 
 * <Skill Status Title Format> 
 *          :タイトル行目の表示内容を文字列で設定します
 *          : %1 - アクター名, %2 - スキル名
 * 
 * <Discription Lines> 
 *          :スキルの説明文の行数を設定します
 *          :変更すると、スキルステータスウィンドウの高さも変わります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルステータスウィンドウ (Skill Status Window)
 *-----------------------------------------------------------------------------
 * 選択したスキルのステータス名とステータス値を表示します。
 * 
 * [ステータス値の表示について]
 * 1. ダメージの場合
 *   ⇒各ダメージIDで設定したスキル名を表示します。
 *    スキル名に'%1'を加えた場合、その箇所がダメージ倍率の値になります。
 *    例)「炎攻撃%1%」というスキル名で、ダメージ倍率が100 の場合、「炎攻撃100%」
 * 
 * 2. 使用効果の場合
 *   ⇒「使用効果の名称 ＋ 使用効果の rate値 」で表示します。
 *    例) 使用効果がHP回復で、rate値が10 の場合、「HP回復10」
 * 
 *    ただし、<Display>タグを設定している場合はその記述を優先します。
 * 
 * 3. 範囲の場合
 *   ⇒範囲名を表示します。
 * 
 * 4. それ以外の場合
 *   ⇒ステータス値をそのまま表示します。
 * 
 * 
 * 以下のプラグインパラメータで変更できます。
 * 
 * 1. 効果の表示有無
 * <Show Disabled Item>
 *           :ダメージと使用効果で、enabledで設定した条件が有効に
 *           :なっていないものを、表示するか選べます。
 *           :表示するを選択した場合、無効になっている対象は薄く
 *           :表示します。
 * 
 * 2. テキスト関係
 * <Skill Status Text1 Format>
 * <Skill Status Text2 Format>
 * <Skill Status Text3 Format>
 *          :スキルのステータス名/ステータス値の表示内容を文字列で設定します。
 *          :%1 - ステータス名, %2 - ステータス値
 *          :<Skill Status Item Heigth>の設定値により
 *          :Text1~3の表示位置が変わります。
 * 
 * <Skill Status Width Rate>
 *          :Text1~3の表示するテキスト幅の比率を設定します。
 *          :1行表示の場合
 *          : 1,1,1 に設定すると、同じ幅に3分割します。
 *          : 2,1,1 に設定すると、Text1を半分使用し、残りを2等分します。
 * 
 * 3. ライン
 * <Skill Status Line Color1>
 * <Skill Status Line Color2>
 *          :ラインの色を指定します。色1と色2を変えた場合は
 *          :ラインをグラデーション表示にします。
 *          : -1 を設定した場合は、非表示にします。
 * 
 * 4. 枠
 * 枠表示に関するプラグインパラメータ設定については、
 * FTKR_DisplayCommandFrame.jsのヘルプを参照してください。
 *
 * 5. ステータスの表示数の設定
 * <Skill Status Max Cols>
 *          :1行に表示するステータスの数を指定します。
 * 
 * <Skill Status Item Heigth>
 *          :1つのステータスを表示する行数を指定します。
 *          :2行表示にすると、1行目にText1とText2を
 *          :2行目にText3を表示します。
 *          :3行表示にすると、1行目にText1、2行目にText2
 *          :3行目にText3を表示します。
 * 
 * 
 * 6. ステータスアイコンの設定
 * <SEP Default Icon>
 *          :デフォルトで表示するアイコンを設定します。
 * 
 * <SEP Type x Type>
 * <SEP Type x Icon>
 *          :1つめのパラメータで、タイプx のステータスを設定し
 *          :2つめのパラメータで、タイプx のアイコンを設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターステータスウィンドウ (Actor Status Window)
 *-----------------------------------------------------------------------------
 * ウィンドウ構成がBタイプの場合、アクターステータスウィンドウのレイアウトを、
 * プラグインパラメータ<Actor Status Layout>の設定により変更することができます。
 * 
 * 設定方法は、FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。
 * 
 * なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
 * 個別設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインパラメータで使用できる制御文字について
 *-----------------------------------------------------------------------------
 * 
 * 本プラグインでは、ウィンドウのテキスト欄に表示する内容を、
 * プラグインパラメータで設定することができます。 
 * 
 * その際に、以下の制御文字を文字列に加えることで、テキストの書式を詳細に
 * 変更することができます。
 * 
 * [使用できるプラグインパラメータ]
 * パラメータ名に Format の文字が含まれているもの。
 * 
 * [使用できる制御文字] 注意:制御文字は大文字小文字を区別します
 * 
 * 1. 文字列幅を変更
 *      \l[x]   :字列幅を x に変更します。
 *              :x の単位は 1バイト文字分のサイズです。
 *              :'スキル名\l[5]'のように表記します。
 *              :
 *              :デフォルトでは、1バイト文字を 1 ,2バイト文字を 2 と換算し
 *              :最適な幅を自動で設定します。
 *              :上記の例の場合、通常の半分のサイズに縮めて表示します。
 * 
 *      \lR[x]  :字列幅を x に変更し、右揃えにします。
 * 
 *      \lC[x]  :字列幅を x に変更し、中央揃えにします。
 * 
 * 2. 文字色を変更
 *      \c[x]   :表示する文字色をx番に変更します。
 *              :番号と色の関係は、ツクールMV標準の色番号と同じです。
 *              :デフォルトでは白文字(x = 0)です。
 * 
 * 3. 文字サイズを変更
 *      \s[x]   :文字のサイズをデフォルトサイズの x% に変更します。
 *              :'レベル\s[60]'のように表記します。
 *              :なお、デフォルトの文字サイズは、28です。
 * 
 *      \sb[x]  :文字のサイズをデフォルトサイズの x% に変更して
 *              :表示行の下側に揃えます。
 * 
 *      \sp[x]  :文字のサイズをデフォルトサイズの x% に変更して
 *              :表示行の上側に揃えます。
 * 
 * 4. 表示位置を変更
 *      \R      :テキスト全体を右揃えにします。
 * 
 *      \C      :テキスト全体を中央揃えにします。
 * 
 * 5. 書式の区切り
 *      \n      :1つの文字列に対して、複数の色やサイズを使い分けたい場合、
 *              :この制御文字を文中に加えることで、加えた箇所で文字列を
 *              :区切り、それぞれの文字列に対して異なる書式を適用できます。
 *              : 例) 'スキル\nタイプ' ⇒ 'スキル'と'タイプ'に区切る
 * 
 * 
 * [制御文字の使用例]
 * 
 * 1.区切りなしで、制御文字を1つ使った場合
 * 'スキルタイプ\c[16]' :この場合は'スキルタイプ'をすべて文字色16に変更します。
 * 
 * 2.区切りなしで、同種の制御文字を複数使った場合
 * 'スキル\c[16]タイプ\c[17]'
 *                   :この場合は、始めの\c[16]が適用されて、'スキルタイプ'を
 *                    すべて文字色16に変更します。
 * 
 * 3.区切りありで、制御文字を1つ使った場合
 * 'スキル\c[16]\nタイプ'
 *                   :この場合は、'スキル'と'タイプ'が区切られ、スキル'を
 *                    文字色16に変更し、'タイプ'はデフォルト色のままです。
 * 
 * 4.区切りありで、同種の制御文字を複数使った場合
 * 'スキル\c[16]\nタイプ\c[17]'
 *                   :この場合は、'スキル'と'タイプ'が区切られ、スキル'を
 *                    文字色16に、'タイプ'を文字色17に変更します。
 * 
 * 5.異なる種類の制御文字を複数使った場合
 * 'スキルタイプ\c[17]\s[60]'
 *                   :この場合は、'スキルタイプ'をすべて文字色16に変更し
 *                    さらに、フォントサイズを60%に縮めます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * パラメータ表示名の設定
 *-----------------------------------------------------------------------------
 * 「スキルステータス名」や「ダメージタイプ名」等の画面に表示される
 * パラメータ名はプラグインパラメータによって変更することが可能です。表示する
 * 名称を変えたい場合は、該当するプラグインパラメータの項目の文字列を変更して
 * ください。
 * 
 * 注意) 制御文字は使用できません。
 * 
 * [変更可能なパラメータ名]
 * 1. スキルステータス名 (MP消費や速度補正、など)
 * 2. ダメージタイプ名 (HPダメージやHP回復、など)
 * 3. 範囲の各タイプの名称 (敵単体や味方単体、など)
 * 4. 使用効果の名称 (強化や弱体、など)
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
 * v1.4.2 - 2017/04/04 : 不具合修正
 *    1. <Enabled Sub Command>が有効の場合、スキル画面に何もスキルが無い
 *       場合でも選択できてしまう不具合を修正。
 *    2. ライセンス表記を変更。
 * 
 * v1.4.1 - 2017/03/24 : 不具合修正
 *    1. FTKR_DisplayCommandFrame.jsがない場合にエラーになる不具合を修正。
 * 
 * v1.4.0 - 2017/03/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.js v1.1.0 に合わせて
 *       プラグインパラメータを見直し。
 * 
 * v1.3.0 - 2017/03/16 : 仕様変更
 *    1. コストの値にjs計算式を使用できるように、処理を見直し。
 *    2. スキルステータスの枠の表示処理を、FTKR_DisplayCommandFrame.jsの
 *       方式に変更。
 * 
 * v1.2.0 - 2017/03/10 : 不具合修正、仕様変更
 *    1. スキル画面で表示できない不具合を修正。
 *    2. ウィンドウ構成がAタイプの時の、アクターの簡易ステータスの表示内容を
 *       変更する機能を削除。
 *    3. アクターステータスウィンドウの表示内容を変更する処理を、
 *       FTKR_CustomSimpleActorStatus.jsの方式に変更。
 * 
 * v1.1.2 - 2017/03/07 : 機能追加
 *    1. コストに関する処理に、武器と防具の項目を追加。
 * 
 * v1.1.1 - 2017/03/05 : 機能追加
 *    1. スキル選択後にサブコマンドを表示する機能を追加。
 *    2. サブコマンドにてスキルを実行または削除できる機能を追加。
 * 
 * v1.1.0 - 2017/03/03 : 機能追加
 *    1. アクターステータスウィンドウの表示内容を変更できる機能を追加。
 *    2. FTKR_SkillTreeSystem.jsから一部の関数を移動。
 * 
 * v1.0.3 - 2017/03/01 : 不具合修正、機能追加
 *    1. ステート付加で「通常攻撃」を設定した場合、ステータス表示で
 *       エラーになる不具合を修正。
 *    2. ウィンドウ構成をBタイプにした場合に、<Skill List Width>の設定が
 *       スキルタイプウィンドウのサイズに反映されない不具合を修正。
 *    3. FTKR_SkillTreeSystem.jsと組み合わせた時に、ダメージや使用効果の
 *       表示が正しく行われない不具合を修正。
 *    4. スキルウィンドウの構成をMVデフォルトから変えないようにする機能を追加。
 * 
 * v1.0.2 - 2017/02/26 : 不具合修正
 *    1. スキルメニューのレイアウトをSSS仕様にした時に、スキル説明文が
 *       条件を満たしても変わらない不具合を修正
 * 
 * v1.0.1 - 2017/02/25 : 不具合修正、プラグインパラメータ追加
 *    1. 記述ミスにより速度補正が表示されない不具合を修正
 *    2. 表示アイコンを設定するプラグインパラメータを追加。
 *    3. 消費コストの表示内容を変更するプラグインパラメータを追加。
 * 
 * v1.0.0 - 2017/02/24 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//以降はFTKR_SkillExpansion.jsが必要
if (Imported.FTKR_SEP) {

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SSS.parameters = PluginManager.parameters('FTKR_SEP_ShowSkillStatus');

//メニュー表示
FTKR.SSS.skillListWidth = Number(FTKR.SSS.parameters['Skill List Width'] || 240);
FTKR.SSS.applySSSLayout = Number(FTKR.SSS.parameters['Apply SSS Layout'] || 0);
FTKR.SSS.maxSepTypeNum = Number(FTKR.SSS.parameters['Max SEP Type Number'] || 8);
FTKR.SSS.showDisabledItem = Number(FTKR.SSS.parameters['Show Disabled Item'] || 0);
FTKR.SSS.drawSSSCost = Number(FTKR.SSS.parameters['Draw SSS Cost'] || 0);
FTKR.SSS.hpCostFormat = String(FTKR.SSS.parameters['SSS HP Cost Format'] || '');
FTKR.SSS.tpCostFormat = String(FTKR.SSS.parameters['SSS TP Cost Format'] || '');
FTKR.SSS.mpCostFormat = String(FTKR.SSS.parameters['SSS MP Cost Format'] || '');
FTKR.SSS.enabledSubCommand = Number(FTKR.SSS.parameters['Enabled Sub Command'] || 0);
FTKR.SSS.enableConf = Number(FTKR.SSS.parameters['Enable Confirmation'] || 0);
FTKR.SSS.itemOk = false;
FTKR.SSS.subComOk = false;
FTKR.SSS.confOk = false;

//スキルのパラメータ名
FTKR.SSS.mainDamageName = String(FTKR.SSS.parameters['Main damage Name'] || '');
FTKR.SSS.damageNames = [
  String(FTKR.SSS.parameters['No damage Type Name'] || ''),
  String(FTKR.SSS.parameters['HP damage Name'] || ''),
  String(FTKR.SSS.parameters['MP damage Name'] || ''),
  String(FTKR.SSS.parameters['HP recovery Name'] || ''),
  String(FTKR.SSS.parameters['MP recovery Name'] || ''),
  String(FTKR.SSS.parameters['HP absorption Name'] || ''),
  String(FTKR.SSS.parameters['MP absorption Name'] || '')
];
FTKR.SSS.sepStatusNames = {
  mpCost:String(FTKR.SSS.parameters['MP cost Name'] || ''),
  tpCost:String(FTKR.SSS.parameters['TP cost Name'] || ''),
  speed:String(FTKR.SSS.parameters['Speed Name'] || ''),
  tpGain:String(FTKR.SSS.parameters['TP gain Name'] || ''),
  repeats:String(FTKR.SSS.parameters['Repeats Name'] || ''),
  scope:String(FTKR.SSS.parameters['Scope Name'] || ''),
};
FTKR.SSS.scopeNames = [
  String(FTKR.SSS.parameters['Scope Non Name'] || ''),
  String(FTKR.SSS.parameters['Scope One Enemy Name'] || ''),
  String(FTKR.SSS.parameters['Scope All Enemies Name'] || ''),
  String(FTKR.SSS.parameters['Scope Random Enemies Name'] || ''),
  '','','',
  String(FTKR.SSS.parameters['Scope One Friend Name'] || ''),
  String(FTKR.SSS.parameters['Scope All Friends Name'] || ''),
  String(FTKR.SSS.parameters['Scope One Dead Name'] || ''),
  String(FTKR.SSS.parameters['Scope All Deads Name'] || ''),
  String(FTKR.SSS.parameters['Scope User Name'] || '')
];
FTKR.SSS.Effects = {
  Name:String(FTKR.SSS.parameters['Effects Name'] || ''),
  NonName:String(FTKR.SSS.parameters['Effects Non Name'] || ''),
  AddName:String(FTKR.SSS.parameters['Effects Add Name'] || ''),
  RemoveName:String(FTKR.SSS.parameters['Effects Remove Name'] || ''),
  BuffName:String(FTKR.SSS.parameters['Effects Buff Name'] || ''),
  DebuffName:String(FTKR.SSS.parameters['Effects Debuff Name'] || ''),
};
FTKR.SSS.Elements = {
  NormalAttackName:String(FTKR.SSS.parameters['Normal Attack Elm Name'] || ''),
  NonName:String(FTKR.SSS.parameters['Non Element Name'] || ''),
  Name:String(FTKR.SSS.parameters['Elements Name'] || ''),
};

//フレームオブジェクト
FTKR.SSS.frame = {
    //基本設定
    type:Number(FTKR.SSS.parameters['Display Frame Type'] || 0),
    whenToDisplay:Number(FTKR.SSS.parameters['When To Display Frame'] || 0),
    changeOnCursor:Number(FTKR.SSS.parameters['Change Frame On Cursor'] || 0),
    hideCursor:Number(FTKR.SSS.parameters['Hide Cursor'] || 0),
    //枠線の設定
    line:{
        defColor:Number(FTKR.SSS.parameters['Default Line Color'] || 0),
        csrColor:Number(FTKR.SSS.parameters['Line Color On Cursor'] || 0),
        thick:Number(FTKR.SSS.parameters['Line Thick'] || 0),
        subColor:Number(FTKR.SSS.parameters['Sub Line Color'] || 0),
        subThick:Number(FTKR.SSS.parameters['Sub Line Thick'] || 0),
        defInColor:Number(FTKR.SSS.parameters['Default Rect Color'] || 0),
        csrInColor:Number(FTKR.SSS.parameters['Rect Color On Cursor'] || 0),
    },
    //枠画像の設定
    image:{
        name:String(FTKR.SSS.parameters['Image Name'] || ''),
        width:Number(FTKR.SSS.parameters['Image Width'] || 0),
        height:Number(FTKR.SSS.parameters['Image Height'] || 0),
        offsetX:Number(FTKR.SSS.parameters['Image Offset X'] || 0),
        offsetY:Number(FTKR.SSS.parameters['Image Offset Y'] || 0),
        offsetW:Number(FTKR.SSS.parameters['Image Offset Width'] || 0),
        offsetH:Number(FTKR.SSS.parameters['Image Offset Height'] || 0),
        enabledScale:Number(FTKR.SSS.parameters['Enabled Change Scale'] || 0),
        defIndex:Number(FTKR.SSS.parameters['Default Image Index'] || 0),
        csrIndex:Number(FTKR.SSS.parameters['Image Index On Cursor'] || 0),
    },
};

//ステータス欄の表示名、色
FTKR.SSS.skillListMaxCols = Number(FTKR.SSS.parameters['Skill List Max Cols'] || 1);
FTKR.SSS.skillListSpacing = Number(FTKR.SSS.parameters['Skill List Spacing'] || 48);

FTKR.SSS.ustatusTitleFormat = String(FTKR.SSS.parameters['Skill Status Title Format'] || '');
FTKR.SSS.discriptionLines = Number(FTKR.SSS.parameters['Discription Lines'] || 2);

FTKR.SSS.sepType = {
  Text1Format:String(FTKR.SSS.parameters['Skill Status Text1 Format'] || ''),
  Text2Format:String(FTKR.SSS.parameters['Skill Status Text2 Format'] || ''),
  Text3Format:String(FTKR.SSS.parameters['Skill Status Text3 Format'] || ''),
  WidthRate:String(FTKR.SSS.parameters['Skill Status Width Rate'] || '1,1,1'),
  LineColor1:Number(FTKR.SSS.parameters['Skill Status Line Color1'] || -1),
  LineColor2:Number(FTKR.SSS.parameters['Skill Status Line Color2'] || -1),
  MaxCols:Number(FTKR.SSS.parameters['Skill Status Max Cols'] || 1),
  ItemHeigth:Number(FTKR.SSS.parameters['Skill Status Item Heigth'] || 1),
};
FTKR.SSS.actorStatus = {
  text1:String(FTKR.SSS.parameters['Actor Status Text1'] || ''),
  text2:String(FTKR.SSS.parameters['Actor Status Text2'] || ''),
  text3:String(FTKR.SSS.parameters['Actor Status Text3'] || ''),
  space:String(FTKR.SSS.parameters['Actor Status Space'] || ''),
  spaceIn:Number(FTKR.SSS.parameters['Actor Status Space In Text'] || 0),
  widthRate:String(FTKR.SSS.parameters['Actor Status Width Rate'] || ''),
  faceLine:Number(FTKR.SSS.parameters['Display Face Scale'] || 0),
};
FTKR.SSS.confTitle = {
  format:String(FTKR.SSS.parameters['Conf Title Format'] || ''),
  posiX:Number(FTKR.SSS.parameters['Conf Title Position X'] || 0),
  posiY:Number(FTKR.SSS.parameters['Conf Title Position Y'] || 0),
  width:Number(FTKR.SSS.parameters['Conf Title Width'] || 0),
};
FTKR.SSS.conf = {
  okFormat:String(FTKR.SSS.parameters['Confirmation Ok Format'] || ''),
  cancelFormat:String(FTKR.SSS.parameters['Confirmation Cancel Format'] || ''),
};
FTKR.SSS.sepSub = {
  useFormat:String(FTKR.SSS.parameters['Command Use Format'] || ''),
  forgetFormat:String(FTKR.SSS.parameters['Command Forget Format'] || ''),
  cancelFormat:String(FTKR.SSS.parameters['Command Cancel Format'] || ''),
};

//コスト
FTKR.SSS.costTitleFormat = String(FTKR.SSS.parameters['Cost Title Format'] || '');
FTKR.SSS.costItemFormat = String(FTKR.SSS.parameters['Cost Item Format'] || '');
FTKR.SSS.costGoldIcon = Number(FTKR.SSS.parameters['Cost Gold Icon'] || 0);
FTKR.SSS.costVarIcon = Number(FTKR.SSS.parameters['Cost Variables Icon'] || 0);

FTKR.SSS.sepTypes = [];
var paramType0 = {
  'type':'default',
  'icon':Number(FTKR.SSS.parameters['SEP Default Icon'] || 73),
};
FTKR.SSS.sepTypes.push(paramType0); 

// Type 1
var paramType1 = {
  'type':String(FTKR.SSS.parameters['SEP Type 1 Type'] || 'damages'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 1 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType1);

// Type 2
var paramType2 = {
  'type':String(FTKR.SSS.parameters['SEP Type 2 Type'] || 'mpCost'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 2 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType2);

// Type 3
var paramType3 = {
  'type':String(FTKR.SSS.parameters['SEP Type 3 Type'] || 'tpCost'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 3 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType3);

// Type 4
var paramType4 = {
  'type':String(FTKR.SSS.parameters['SEP Type 4 Type'] || 'speed'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 4 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType4);

// Type 5
var paramType5 = {
  'type':String(FTKR.SSS.parameters['SEP Type 5 Type'] || 'tpGain'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 5 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType5);

// Type 6
var paramType6 = {
  'type':String(FTKR.SSS.parameters['SEP Type 6 Type'] || 'repeats'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 6 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType6);

// Type 7
var paramType7 = {
  'type':String(FTKR.SSS.parameters['SEP Type 7 Type'] || 'scope'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 7 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType7);

// Type 8
var paramType8 = {
  'type':String(FTKR.SSS.parameters['SEP Type 8 Type'] || 'effects'),
  'icon':Number(FTKR.SSS.parameters['SEP Type 8 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType8);

// Type 9
var paramType9 = {
  'type':String(FTKR.SSS.parameters['SEP Type 9 Type'] || ''),
  'icon':Number(FTKR.SSS.parameters['SEP Type 9 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType9);

// Type 10
var paramType10 = {
  'type':String(FTKR.SSS.parameters['SEP Type 10 Type'] || ''),
  'icon':Number(FTKR.SSS.parameters['SEP Type 10 Icon'] || 0),
};
FTKR.SSS.sepTypes.push(paramType10);

Game_BattlerBase.MAX_SSS_SEP_TYPES = 10;

if (FTKR.SSS.maxSepTypeNum > Game_BattlerBase.MAX_SSS_SEP_TYPES) {
  FTKR.SSS.maxSepTypeNum = Game_BattlerBase.MAX_SSS_SEP_TYPES;
;}

//=============================================================================
// Bitmap
//=============================================================================

//座標(x1,y1)から座標(x2,y2)までの線を引く
Bitmap.prototype.drawLine = function(x1, y1, x2, y2, color, thick) {
    var context = this._context;
    context.strokeStyle = color;
    context.lineWidth = thick;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
    this._setDirty();
};

//=============================================================================
// String
//=============================================================================

//1バイト文字は 1 , 2バイト文字は 2 と数えて文字列数を求める
String.prototype.charCount = function() {
  var len = 0;
  var str = escape(this);
  for (var i=0; i < str.length ; i++ , len++) {
    if (str.charAt(i) == '%') {
      if (str.charAt(++i) == 'u') {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
};

//文字列からstrを削除する
String.prototype.del = function(str) {
    return this.replace(str, '');
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadSepImage = function(filename, hue) {
    return this.loadBitmap('img/sep/', filename, hue, false);
};

//=============================================================================
// TextManager
//=============================================================================

TextManager.skillParam = function(type, skill, dataId) {
  switch (type) {
    case 'damages':
      return TextManager.damage(skill.damages[dataId].type);
    case 'mpCost':
    case 'tpCost':
    case 'speed':
    case 'tpGain':
    case 'repeats':
    case 'scope':
      return FTKR.SSS.sepStatusNames[type];
    case 'effects':
      return FTKR.SSS.Effects.Name + (dataId + 1);
    default:
      return undefined;
  }
};

TextManager.damage = function(dtype) {
  return dtype >= 0 && dtype < 7 ? FTKR.SSS.damageNames[dtype] : undefined;
};

TextManager.damageId = function(skill, dataId) {
  return dataId === 0 ? FTKR.SSS.mainDamageName : $dataSkills[skill.damages[dataId].id].name;
};

TextManager.scope = function(scope) {
  if (scope > 2 && scope < 7) return FTKR.SSS.scopeNames[3];
  return scope >= 0 && scope < 12 ? FTKR.SSS.scopeNames[scope] : undefined;
};

TextManager.effect = function(typename, effect) {
  if (typename !== 'effects') return '';
  if (effect.display) return effect.display;
  var eff = FTKR.SSS.Effects;
  switch (effect.code) {
    case Game_Action.EFFECT_ADD_STATE:
      return effect.dataId === 0 ? '通常攻撃' + eff.AddName + '%1':
        $dataStates[effect.dataId].name + eff.AddName + '%1';
    case Game_Action.EFFECT_REMOVE_STATE:
      return $dataStates[effect.dataId].name + eff.RemoveName + '%1';
    case Game_Action.EFFECT_ADD_BUFF:
      return TextManager.param(effect.dataId) + eff.BuffName + eff.AddName + '%1';
    case Game_Action.EFFECT_ADD_DEBUFF:
      return TextManager.param(effect.dataId) + eff.DebuffName + eff.AddName + '%1';
    case Game_Action.EFFECT_REMOVE_BUFF:
      return TextManager.param(effect.dataId) + eff.BuffName + eff.RemoveName + '%1';
    case Game_Action.EFFECT_REMOVE_DEBUFF:
      return TextManager.param(effect.dataId) + eff.DebuffName + eff.RemoveName + '%1';
    case Game_Action.EFFECT_RECOVER_HP:
      return TextManager.basic(2) + '回復' + '%1';
    case Game_Action.EFFECT_RECOVER_MP:
      return TextManager.basic(4) + '回復' + '%1';
    case Game_Action.EFFECT_GAIN_TP:
      return TextManager.basic(6) + '増加' + '%1';
    default:
      return '';
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.SSS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  FTKR.SSS.Game_Actor_setup.call(this, actorId);
  ImageManager.loadFace(this.faceName());
};

//=============================================================================
// Window_Base
//=============================================================================

//アクター名、スキル名が使用できるタイトル文を表示する関数
Window_Base.prototype.drawDescTitle = function(format, x, y, width, skill) {
  var diff = this.diffPadding();
  var params = [this._actor._name, skill.name];
  this.drawFormatText(format, x + diff, y + diff, params, width);
};

//スキルの説明文を表示する関数
Window_Base.prototype.drawDescription = function(x, y, width, skill) {
  var diff = this.diffPadding();
  var desc = this.getDesc(skill);
  var texts = desc.split('\n');
  width *= 0.95;
  var dy = this.lineHeight();
  for (var i = 0; i < texts.length; i++) {
    this.drawFormatText(texts[i], x + diff, y + diff + dy * i, [], width);
  }
};

//スキルの説明文を取得する関数
Window_Base.prototype.getDesc = function(skill) {
  if (Imported.FTKR_SEP) {
    var actor = $gameActors.actor(skill.actorId);
    if (!actor) return skill.description;
    var descs = skill.descs.filter( function(desc) {
        return actor.evalEnabledFormula(desc.enabled, skill);
    });
    var desc = descs.pop();
    return desc ? desc.description : '';
  } else {
    return skill.description;
  }
};

/*-------------------------------------------------------------
  スキルパラメータを表示する関数
-------------------------------------------------------------*/
Window_Base.prototype.drawSepSkillStatus = function(tx, ty, tw, rect, typeId, skill, dataId){
  var formats = this.setSepSkillStatusFormats();
  var params = this.setSepSkillStatusParams(skill, typeId, dataId);
  var txs = []; var tys = []; var tws = [];
  var sih = this.sepTypeItemHeigth();
  var wr = this.sepTypeWidthRate().split(',').num();
  var wrs = Math.sam(wr);
  for (var i = 0; i < 3; i++) {
    txs[i] = (i === 0 || (i > 3 - sih)) ? tx : txs[i-1] + tws[i-1];
    tys[i] = rect.y + ty * Math.limit(sih - 3 + i, 0, 2);
    switch (sih) {
      case 1:
        tws[i] = tw * wr[i] / wrs; break;
      case 2:
        tws[i] = (i === 2) ? tw * wr[i] / wr[2] :
                tw * wr[i] / (wr[0] + wr[1]) ; break;
      default:
        tws[i] = tw; break;
    }
    this.exchangeFormat(formats[i], skill, typeId, dataId);
    this.drawFormatText(formats[i], txs[i], tys[i], params, tws[i]);
  }
};

Window_Base.prototype.setSepSkillStatusFormats = function() {
  var stp = FTKR.SSS.sepType;
  return [stp.Text1Format, stp.Text2Format, stp.Text3Format];
};

Window_Base.prototype.setSepSkillStatusParams = function(skill, typeId, dataId) {
  var sepType = FTKR.SSS.sepTypes[typeId];
  return [
    TextManager.skillParam(sepType.type, skill, dataId),
    this.setSepParam(sepType.type, skill, dataId, true)
  ];
};

Window_Base.prototype.sepTypeWidthRate = function() {
  return FTKR.SSS.sepType.WidthRate;
};

Window_Base.prototype.sepTypeItemHeigth = function() {
  return FTKR.SSS.sepType.ItemHeigth;
};

Window_Base.prototype.exchangeFormat = function(format, skill, typeId, dataId) {
};

Window_Base.prototype.setSepParam = function(type, skill, dataId, eflag) {
  var actor = this._actor;
  if (type === 'scope' && !actor.isRandomScope(skill)) {
    return TextManager.scope(skill.scope);
  } else {
    if (type === 'damages') {
      var damage = skill.damages[dataId].rate;
      return eflag ? TextManager.damageId(skill, dataId).format(damage) : damage + '%';
    } else if (type === 'effects') {
      var effect = skill.effects[dataId];
      return eflag ? TextManager.effect(type, effect).format(effect.rate) : effect.rate;
    } else if (type === 'scope') {
      var fmt = TextManager.scope(skill.scope);
      return fmt.format(skill.scoperandom);
    } else {
      return skill[type];
    }
  }
};

/*-------------------------------------------------------------
  コストデータ(アイコン,名前,必要数,手持ち数)を表示する関数
-------------------------------------------------------------*/
Window_Base.prototype.drawSepCost = function(format, cost, x, y, width) {
  var diff = this.diffPadding();
  x += diff;
  y += diff;
  var iw = Window_Base._iconWidth + 4;
  width = width - iw;
  if (cost) {
    this.drawIcon(this.setSepCost(cost).icon, x, y);
    var params = [
      this.setSepCost(cost).name,
      this._actor.evalCostValue(cost),
      '(' + this.setSepCost(cost).base + ')'
    ];
    this.drawFormatText(format, x + iw, y, params, width);
  }
};

Window_Base.prototype.setCost = function(icon, name, base) {
    return {icon:icon, name:name, base:base};
};

Window_Base.prototype.setSepCost = function(cost) {
  switch(cost.type) {
    case 'gold':
      return this.setCost(FTKR.SSS.costGoldIcon, $dataSystem.currencyUnit, $gameParty.gold());
    case 'item':
      var item = $dataItems[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    case 'var'://変数
      return this.setCost(FTKR.SSS.costVarIcon, $dataSystem.variables[cost.id], $gameVariables.value(cost.id));
    case 'weapon':
      var item = $dataWeapons[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    case 'armor':
      var item = $dataArmors[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    default:
      return this.setCost(0, '', 0);
  }
};

//画像表示関数 /img/sep/に保存したname.pngを表示する。
Window_Base.prototype.drawSepImage = function(name, index, x, y, width, height, scale) {
    if (name) {
        var bitmap = ImageManager.loadSepImage(name);
        var pw = width;
        var ph = height;
        scale = scale || 1;
        var sx = index % 4 * pw;
        var sy = Math.floor(index / 4) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    }
};

Window_Base.prototype.drawBackgroundImage = function(bgi) {
  var x = bgi.offsetX || 0;
  var y = bgi.offsetY || 0;
  if (bgi.name) this.drawSepImage(bgi.name, 0, x, y, bgi.width, bgi.height, 1);
};

//斜線描画関数
Window_Base.prototype.drawDiagLine = function(x1, y1, x2, y2, color, thick) {
    this.contents.drawLine(x1, y1, x2, y2, this.textColor(color), thick);
};

//アイコンの表示スケールを指定できる表示関数
Window_Base.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
};

Window_Base.prototype.drawSepSkillLine = function(x, y, width) {
  if (FTKR.SSS.sepType.LineColor1 > -1 && FTKR.SSS.sepType.LineColor2 > -1) {
    this.drawGauge(x, y, width, 1, this.textColor(FTKR.SSS.sepType.LineColor1),
        this.textColor(FTKR.SSS.sepType.LineColor2));
  }
};

// 専用の制御文字を使えるテキスト描画関数
// 詳しくは、ヘルプ参照
Window_Base.prototype.drawFormatText = function(fmt, x, y, params, width, height) {
  var texts = fmt.split('\\n');
  var cxs = [], cws = [], chs = [], colors = [], sizes = [], fsizes = [], posis = [];
  var tw = this.textWidth('0');
  var space = 0;

  var case1 = /\\l\[(\d+)\]/g;
  var case1R = /\\lR\[(\d+)\]/g;
  var case1C = /\\lC\[(\d+)\]/g;
  var case2 = /\\c\[(\d+)\]/g;
  var case3 = /\\s\[(\d+)\]/g;
  var case3b = /\\sp\[(\d+)\]/g;
  var case3c = /\\sb\[(\d+)\]/g;
  var case4 = /\\R/g;
  var case5 = /\\C/g;

  if (!params) params = [];
  if (texts.length) {
    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];
      var cflag = false;
      var pflag = '';
      cxs[i] = i > 0 ? cxs[i-1] + cws[i-1] : x;
      chs[i] = height || this.lineHeight();
      colors[i] = -1;
      var size = 100;
      var fsize = this.standardFontSize();
      if (text.match(case2)) {
        colors[i] = Number(RegExp.$1);
        text = text.del(case2);
      }
      if (text.match(case3)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3);
      } else if (text.match(case3b)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3b);
        chs[i] = chs[i] * (50 - size) / 150;
      } else if (text.match(case3c)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3c);
        chs[i] = chs[i] * (250 - size) / 150;
      }
      var scr = tw * size / 100;
      if (text.match(case1)) {
        cws[i] = Number(RegExp.$1) * scr;
        cflag = true;
        text = text.del(case1);
      } else if (text.match(case1R)) {
        cws[i] = Number(RegExp.$1) * scr;
        posis[i] = 'right';
        cflag = true;
        text = text.del(case1R);
      } else if (text.match(case1C)) {
        cws[i] = Number(RegExp.$1) * scr;
        cflag = true;
        posis[i] = 'center';
        text = text.del(case1C);
      }
      if (text.match(case4)) {
        posis[i] = 'right';
        pflag = 'right';
        if (texts.length === 1 && !cflag) {
          cws[i] = width;
          cflag = true;
        }
        text = text.del(case4);
      } else if (text.match(case5)) {
        posis[i] = 'center';
        pflag = 'center';
        if (texts.length === 1 && !cflag) {
          cws[i] = width;
          cflag = true;
        }
        text = text.del(case5);
      }
      text = text.format(params[0], params[1], params[2], params[3], params[4]);
      if (!cflag) cws[i] = text.charCount() * scr;
      texts[i] = text;
      fsizes[i] = fsize;
    }
    if (width) {
      var textWidth = Math.sam(cws);
      var diff = width - textWidth;
      if (diff < 0) {
        for(var i = 0; i < cws.length; i++) {
          cws[i] *= width / textWidth;
          cxs[i] = i > 0 ? cxs[i-1] + cws[i-1]: x;
        }
      } else if (diff > 0 && pflag === 'right') {
        space = diff;
      } else if (diff > 0 && pflag === 'center') {
        space = diff / 2;
      }
    }
    for (var i = 0; i < texts.length; i++) {
      if (colors[i] >= 0) this.changeTextColor(this.textColor(colors[i]));
      this.drawTextCustom(texts[i], cxs[i] + space, y, cws[i], chs[i], fsizes[i], posis[i]);
      if (colors[i] >= 0) this.changeTextColor(this.textColor(0));
    }
  }
  return textWidth;
};

Window_Base.prototype.drawTextCustom = function(text, x, y, w, h ,fontsize, align) {
  this.contents.fontSize = fontsize;
  this.contents.drawText(text, x, y, w, h, align);
  this.contents.fontSize = this.standardFontSize();
};

Window_Base.prototype.defaultPadding = function() {
    return 18;
};

Window_Base.prototype.diffPadding = function() {
    return this.defaultPadding() - this.standardPadding();
};

Window_Base.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.actSelect = function(index) {
  this.activate();
  this.select(index);
  this.refresh();
};

Window_Selectable.prototype.itemHeightSpace = function() {
    return 0;
};

Window_Selectable.prototype.unitHeight = function() {
    return this.itemHeight() + this.itemHeightSpace();
};

Window_Selectable.prototype.unitWidth = function() {
    return this.itemWidth() + this.spacing();
};

//書き換え
Window_Selectable.prototype.itemWidth = function() {
    return Math.floor((this.width - (this.padding + this.diffPadding()) * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
};

//書き換え
Window_Selectable.prototype.maxPageRows = function() {
    var pageHeight = this.height - (this.padding + this.diffPadding()) * 2;
    return Math.floor(pageHeight / this.unitHeight());
};

//書き換え
Window_Selectable.prototype.topRow = function() {
    return Math.floor(this._scrollY / this.unitHeight());
};

//書き換え
Window_Selectable.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

//書き換え
Window_Selectable.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    var diff = this.diffPadding();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * this.unitWidth() - this._scrollX + diff;
    rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY + diff;
    return rect;
};

//=============================================================================
// Window_SepConf
// 確認用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_SepConf() {
  this.initialize.apply(this, arguments);
}

Window_SepConf.prototype = Object.create(Window_Selectable.prototype);
Window_SepConf.prototype.constructor = Window_SepConf;

Window_SepConf.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.defineSound();
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._dicision = false;
};

Window_SepConf.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SepConf.prototype.maxCols = function() {
    return 2;
};

Window_SepConf.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SepConf.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SepConf.prototype.makeItemList = function() {
  this._data = [
    {dicision:true, disp:this.okFormat() || FTKR.SSS.conf.okFormat},
    {dicision:false, disp:this.cancelFormat() || FTKR.SSS.conf.cancelFormat}
  ];
};

Window_SepConf.prototype.okFormat = function() {
  return ;
};

Window_SepConf.prototype.cancelFormat = function() {
  return ;
};

Window_SepConf.prototype.isEnabled = function(index) {
  return this._actor && (this._enabled || index > 0);
};

Window_SepConf.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_SepConf.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
  this.changePaintOpacity(1);
};

Window_SepConf.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SepConf.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
};

Window_SepConf.prototype.defineSound = function() {
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.setsssSkillWindow = function(window) {
  this._sssSkillListWindow = window;
  this.update();
};

Window_SkillType.prototype.setsssSepWindow = function(window) {
  this._sssSkillStatusWindow = window;
  this.update();
};

Window_SkillType.prototype.setsssSepStatusWindow = function(window) {
  this._sssStatusTitleWindow = window;
  this.update();
};

Window_SkillType.prototype.setSepSubComWindow = function(window) {
  this._sepSubCommandWindow = window;
  this.update();
};

Window_SkillType.prototype.setSepConfTitleWindow = function(window) {
  this._stsConfTitleWindow = window;
  this.update();
};

Window_SkillType.prototype.setSepConfWindow = function(window) {
  this._stsConfWindow = window;
  this.update();
};

Window_SkillType.prototype.windowWidth = function() {
    return FTKR.SSS.skillListWidth;
};

FTKR.SSS.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
  FTKR.SSS.Window_SkillType_update.call(this);
  if (this._sssSkillStatusWindow  && this._sssStatusTitleWindow) {
    this.updatesssShowHide();
  }
  var scw = this._sepSubCommandWindow;
  if (scw) FTKR.SSS.subComOk ? scw.show() : scw.hide();
  var ctw = this._stsConfTitleWindow;
  var cfw = this._stsConfWindow;
  if (ctw && cfw) {
    if (FTKR.SSS.enableConf && FTKR.SSS.confOk) {
      ctw.show();
      cfw.show();
    } else {
      ctw.hide();
      cfw.hide();
    }
  }
};

Window_SkillType.prototype.updatesssShowHide = function() {
  if (this.currentSymbol() === 'skill' && !FTKR.SSS.itemOk) {
    this._sssStatusTitleWindow.show();
    this._sssSkillStatusWindow.show();
  } else {
    this._sssStatusTitleWindow.hide();
    this._sssSkillStatusWindow.hide();
  }
};

//=============================================================================
// Window_SkillList
//=============================================================================

// 書き換え
Window_SkillList.prototype.maxCols = function() {
    return Math.max(FTKR.SSS.skillListMaxCols, 1);
};

// 書き換え
Window_SkillList.prototype.spacing = function() {
    return FTKR.SSS.skillListSpacing;
};

FTKR.SSS.Window_SkillList_isCurrentItemEnabled = 
    Window_SkillList.prototype.isCurrentItemEnabled;
Window_SkillList.prototype.isCurrentItemEnabled = function() {
    return this._data[this.index()] && FTKR.SSS.enabledSubCommand && !$gameParty.inBattle() ?
        true : FTKR.SSS.Window_SkillList_isCurrentItemEnabled.call(this);
};

Window_SkillList.prototype.setItemWindow = function(sssStatuWsindow) {
  this._sssStatuWsindow = sssStatuWsindow;
  this.update();
};

Window_SkillList.prototype.setsssStatusWindow = function(sssStatusWindow) {
  this._sssActorStatusWindow = sssStatusWindow;
  this.update();
};

Window_SkillList.prototype.setSepSubComWindow = function(window) {
  this._sepSubCommandWindow = window;
  this.update();
};

Window_SkillList.prototype.setConfWindow = function(window) {
  this._stsConfWindow = window;
  this.update();
};

Window_SkillList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  var skillId = this.item() ? this.item().id : 0;
  if (skillId) {
    if (this._sssStatuWsindow) this._sssStatuWsindow.setSkillId(skillId);
    if (this._sssActorStatusWindow) this._sssActorStatusWindow.setSkillId(skillId);
    var scw = this._sepSubCommandWindow;
    if (scw) {
      scw.setEnabled(this.isEnabled(this.item()));
      scw.setSkillId(skillId);
    }
    if (this._stsConfWindow) {
      var actor = this._actor;
      var skill = actor.getSkill(skillId);
      this._stsConfWindow.setEnabled(actor.isForgetOk(skill));
    }
  }
};

FTKR.SSS.Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function(index) {
    if (FTKR.SSS.drawSSSCost) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth() * this.checkCostNum(skill);
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            var len = this.drawSepSkillCost(skill, rect.x, rect.y, rect.width);
            this.drawItemName(skill, rect.x, rect.y, rect.width - len);
            this.changePaintOpacity(1);
        }
    } else {
        FTKR.SSS.Window_SkillList_drawItem.call(this, index);
    }
};

Window_SkillList.prototype.checkCostNum = function(skill) {
    var count = 0;
    var actor = this._actor;
    if (actor.skillMpCost(skill) > 0) count += 1;
    if (actor.skillTpCost(skill) > 0) count += 1;
    if (actor.skillHpCost(skill) > 0) count += 1;
    return count;
};

Window_SkillList.prototype.drawSepSkillCost = function(skill, x, y, width) {
    var dx = x + width - this.costWidth();
    var len = 0;
    var samlen = 0;
    if (this._actor.skillMpCost(skill) > 0) {
        var param3 = [this._actor.skillMpCost(skill)];
        len = this.drawFormatText(FTKR.SSS.mpCostFormat, dx, y, param3, this.costWidth());
        dx -= len;
        samlen += len;
    }
    if (this._actor.skillTpCost(skill) > 0) {
        var param2 = [this._actor.skillTpCost(skill)];
        len = this.drawFormatText(FTKR.SSS.tpCostFormat, dx, y, param2, this.costWidth());
        dx -= len;
        samlen += len;
    }
    if (this._actor.skillHpCost(skill) > 0) {
        var param1 = [this._actor.skillHpCost(skill)];
        len = this.drawFormatText(FTKR.SSS.hpCostFormat, dx, y, param1, this.costWidth());
        samlen += len;
    }
    return samlen;
};


FTKR.SSS.Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillHpCost(skill) > 0) {
        this.changeTextColor(this.textColor(21));
        this.drawText(this._actor.skillHpCost(skill), x, y, width, 'right');
    } else {
        FTKR.SSS.Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    }
};

//=============================================================================
// Window_SepTypeList
//=============================================================================

function Window_SepTypeList() {
  this.initialize.apply(this, arguments);
}

Window_SepTypeList.prototype = Object.create(Window_Selectable.prototype);
Window_SepTypeList.prototype.constructor = Window_SepTypeList;

Window_SepTypeList.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._data = [];
  this.clearWindow();
};

Window_SepTypeList.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.clearWindow();
    this.resetScroll();
  }
};

Window_SepTypeList.prototype.clearWindow = function() {
  this._sssIndex = 0;
  this._skillId = null;
  this._typeId = null;
  this._dataId = null;
  this.refresh();
};

Window_SepTypeList.prototype.maxCols = function() {
  return Math.limit(FTKR.SSS.sepType.MaxCols, 1, 3);
};

Window_SepTypeList.prototype.itemHeight = function() {
    return this.lineHeight() * Math.limit(FTKR.SSS.sepType.ItemHeigth, 1, 3);
};

Window_SepTypeList.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SepTypeList.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SepTypeList.prototype.isShowItem = function(typeId, dataId) {
  return this._actor && this._actor.isSepEnabled(this._skillId, typeId, dataId);
};

Window_SepTypeList.prototype.makeItemList = function() {
  this._data = [];
  var actor = this._actor;
  if (!actor) return false;
  var count = 0;
  var data = {};
  if (this._skillId === null) return false;
  var skill = actor.getSkill(this._skillId);
  for(var t = 1; t < FTKR.SSS.maxSepTypeNum + 1; t++) {
    for (var prop in skill) {
      if (prop === FTKR.SSS.sepTypes[t].type) {
        var len = prop === 'damages' || prop === 'effects' ? skill[prop].length : 1;
        for (var i = 0; i < len; i++) {
          if (prop === 'damages' && skill.damages[i].type < 1) continue;
          if (this.isShowItem(t, i) || FTKR.SSS.showDisabledItem) {
            data = { typeId:t, dataId:i };
            this._data.push(data);
          }
        }
        continue;
      }
    }
  }
};

Window_SepTypeList.prototype.drawItem = function(index) {
  var actor = this._actor;
  var skillId = this._skillId;
  var typeId = this._data[index].typeId;
  var dataId = this._data[index].dataId;
  var skill = actor.getSkill(skillId);

  var rect = this.itemRect(index);
  var iw = Window_Base._iconWidth + 4;
  var tx = rect.x + iw;
  var ty = this.lineHeight();
  var tw = rect.width - iw;

  if (typeId) {
    this.changePaintOpacity(this.isShowItem(typeId, dataId));
    this.drawSepFrame(index);
    this.drawSkillLine(tx, rect.y, tw-4, skillId, typeId, dataId);
    this.drawStatusIcon(rect.x + 2, rect.y + 2, typeId);
    this.drawSkillStatus(tx, ty, tw - this.frameThick()*2, rect, skill, typeId, dataId);
    this.changePaintOpacity(1);
  }
};

Window_SepTypeList.prototype.drawSepFrame = function(index) {
  if (Imported.FTKR_DCF) {
    this.drawDcfFrame(index, FTKR.SSS.frame);
  }
};

Window_SepTypeList.prototype.drawSkillLine = function(x, y, width, skillId, typeId, dataId) {
    this.drawSepSkillLine(x, y, width);
};

Window_SepTypeList.prototype.frameThick = function() {
    return FTKR.SSS.frame.line.thick;
};

Window_SepTypeList.prototype.drawSkillStatus = function(tx, ty, tw, rect, skill, typeId, dataId){
    this.drawSepSkillStatus(tx, ty, tw, rect, typeId, skill, dataId);
};

Window_SepTypeList.prototype.drawStatusIcon = function(x, y, typeId) {
    var sepType = FTKR.SSS.sepTypes[typeId];
    var icon = sepType.icon ? sepType.icon : FTKR.SSS.sepTypes[0].icon;
    this.drawIcon(icon, x, y);
};

Window_SepTypeList.prototype.updateHelp = function() {
  this.setHelpWindowItem(this._actor.getSkill(this._skillId));
};

Window_SepTypeList.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SepTypeList.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this._typeId = 1;
  this.refresh();
};

Window_SepTypeList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if (Imported.FTKR_DCF) this.updateDcfFrame(index, FTKR.SSS.frame);
};

//=============================================================================
// Window_SepStatus
//=============================================================================

function Window_SepStatus() {
  this.initialize.apply(this, arguments);
}

Window_SepStatus.prototype = Object.create(Window_Base.prototype);
Window_SepStatus.prototype.constructor = Window_SepStatus;

Window_SepStatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
};

Window_SepStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_SepStatus.prototype.clearWindow = function() {
  this._skillId = null;
  this.refresh();
};

Window_SepStatus.prototype.refresh = function() {
  this.contents.clear();
  this.drawSepState();
};

Window_SepStatus.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

Window_SepStatus.prototype.drawSepState = function() {
  if (this._actor && this._skillId) {
    var skill = this._actor.getSkill(this._skillId);
    var y = this.lineHeight();
    var width = this.width - this.textPadding() * 2;
    this.drawDescTitle(FTKR.SSS.ustatusTitleFormat, 0, 0, width, skill);
    this.drawElement(0, y, width, skill);
    this.drawDescTitle('説明:\\c[16]', 0, y*2, width, skill);
    this.drawDescription(0, y*3, width, skill);
  }
};

Window_SepStatus.prototype.drawElement = function(x, y, width, skill) {
  var elmId = skill.damages[0].elementId;
  if (elmId === -1) {
    var elmname = FTKR.SSS.Elements.NormalAttackName;
  } else if (elmId === 0) {
    var elmname = FTKR.SSS.Elements.NonName;
  } else {
    var elmname = $dataSystem.elements[skill.damages[0].elementId];
    var elmIds = skill.damages[0].addElmIds;
    if (elmIds) {
      elmIds.forEach( function(id) {
        elmname += ',' + $dataSystem.elements[id];
      });
    }
  }
  var params1 = [FTKR.SSS.Elements.Name, elmname];
  this.drawFormatText('%1:\\c[16]\\n%2', x, y, params1, width);
};

//=============================================================================
// Window_SepActorstatus
//=============================================================================

function Window_SepActorstatus() {
  this.initialize.apply(this, arguments);
}

Window_SepActorstatus.prototype = Object.create(Window_Base.prototype);
Window_SepActorstatus.prototype.constructor = Window_SepActorstatus;

Window_SepActorstatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
};

Window_SepActorstatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SepActorstatus.prototype.refresh = function() {
  this.contents.clear();
  var actor = this._actor;
  if (!actor) return;
  var w = this.width - this.padding * 2;
  var h = this.height - this.padding * 2;
  if (Imported.FTKR_CSS) {
    this.drawCssActorStatus(0, actor, 0, 0, w, h, FTKR.SSS.actorStatus);
  } else {
    this.drawText(actor._name, 0, 0, w, h);
  }
};

//=============================================================================
// Window_SepSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_SepSubCommand() {
  this.initialize.apply(this, arguments);
}

Window_SepSubCommand.prototype = Object.create(Window_Selectable.prototype);
Window_SepSubCommand.prototype.constructor = Window_SepSubCommand;

Window_SepSubCommand.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._skillId = null;
  this._symbol = '';
};

Window_SepSubCommand.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SepSubCommand.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SepSubCommand.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SepSubCommand.prototype.makeItemList = function() {
  this._data = [];
  var actor = this._actor;
  if (!actor || !this._skillId) return;
  var sep = FTKR.SSS.sepSub;
  var skill = actor.getSkill(this._skillId);
  this._data = [
    {symbol:'use', enabled:this._enabled, disp:sep.useFormat},
    {symbol:'forget', enabled:actor.isForgetOk(skill), disp:sep.forgetFormat},
    {symbol:'cancel', enabled:true, disp:sep.cancelFormat},
  ];
};

Window_SepSubCommand.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_SepSubCommand.prototype.isEnabled = function(index) {
  return this._actor && this._data[index].enabled;
};

Window_SepSubCommand.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
  this.changePaintOpacity(1);
};

Window_SepSubCommand.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SepTypeList.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

Window_SepSubCommand.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
};

//=============================================================================
// Window_SepConfTitle
//=============================================================================

function Window_SepConfTitle() {
  this.initialize.apply(this, arguments);
}

Window_SepConfTitle.prototype = Object.create(Window_Base.prototype);
Window_SepConfTitle.prototype.constructor = Window_SepConfTitle;

Window_SepConfTitle.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
  this.refresh();
};

Window_SepConfTitle.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_SepConfTitle.prototype.refresh = function () {
  this.contents.clear();
  this.drawStsText(FTKR.SSS.confTitle.format);
};

Window_SepConfTitle.prototype.drawStsText = function(format) {
  if (this._actor && this._skillId) {
    var skill = this._actor.getSkill(this._skillId);
    var width = this.width - this.standardPadding() * 2;
    this.drawDescTitle(format, 0, 0, width, skill);
  }
};

//=============================================================================
// Scene_Base
//=============================================================================

// ウィンドウ作成系
Scene_Base.prototype.sssCreateSkillListWindow = function() {
  var refw = this._skillTypeWindow;

  var wy = refw.y + refw.height;
  var ww = FTKR.SSS.skillListWidth;
  var wh = Graphics.boxHeight - wy;

  this._sssSkillListWindow = new Window_SepSkillList(0, wy, ww, wh);
  var window = this._sssSkillListWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('ok',     this.onsssSkillOk.bind(this));
  window.setHandler('cancel', this.onsssSkillCancel.bind(this));
  refw.setsssSkillWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.sssCreateSkillStatusTitleWindow = function(wy, wh, refw1){
  var wx = refw1.width;
  var ww = Graphics.boxWidth - wx;

  this._sssStatusTitleWindow = new Window_SepStatus(wx, wy, ww, wh);
  var window = this._sssStatusTitleWindow;
  this._skillTypeWindow.setsssSepStatusWindow(window);
  refw1.setsssStatusWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.sssCreateSkillStatusWindow = function(refw1) {
  var refw2 = this._sssStatusTitleWindow;

  var wx = refw1.width;
  var wy = refw2.y + refw2.height;
  var ww = Graphics.boxWidth - wx;
  var wh = Graphics.boxHeight - wy;

  this._sssSkillStatusWindow = new Window_SepTypeList(wx, wy, ww, wh);
  var window = this._sssSkillStatusWindow;
  window.setHelpWindow(this._helpWindow);
  this._skillTypeWindow.setsssSepWindow(window);
  refw1.setItemWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.sssRefreshActor = function(actor) {
  if (this._sssSkillListWindow) this._sssSkillListWindow.setActor(actor);
  if (this._sssStatusTitleWindow) this._sssStatusTitleWindow.setActor(actor);
  if (this._sssSkillStatusWindow) this._sssSkillStatusWindow.setActor(actor);
  if (this._sssActorStatusWindow) this._sssActorStatusWindow.setActor(actor);
  if (this._sepSubCommandWindow) this._sepSubCommandWindow.setActor(actor);
  var ctw = this._stsConfTitleWindow;
  if (ctw) ctw.setActor(actor);
  var cfw = this._stsConfWindow;
  if (cfw) cfw.setActor(actor);
};

Scene_Base.prototype.onsssSkillOk = function() {
  this.onsssSkillCancel();
};

Scene_Base.prototype.onsssSkillCancel = function() {
  this._skillTypeWindow.activate();
  this._sssSkillListWindow.deselect();
  this._sssStatusTitleWindow.clearWindow();
  this._sssSkillStatusWindow.clearWindow();
};

//=============================================================================
// Scene_Skill
//=============================================================================

FTKR.SSS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
  FTKR.SSS.Scene_Skill_create.call(this);
  this.ssscreateSkillStatusTitleWindow();
  this.sssCreateSkillStatusWindow(this._itemWindow);
  if (FTKR.SSS.applySSSLayout === 2) {
    this.ssscreateActorStatusWindow();
  }
  if (FTKR.SSS.enabledSubCommand) {
    this.ssscreateSepSubCommandWindow();
    if (FTKR.SSS.enableConf) {
      this.createSepConfTitleWindow();
      this.createSepConfWindow();
    }
  }
  this.refreshActor();
};

Scene_Skill.prototype.createHelpWindow = function() {
    var line = FTKR.SSS.applySSSLayout === 2 ? 3 : 2;
    this._helpWindow = new Window_Help(line);
    this.addWindow(this._helpWindow);
};

//書き換え
Scene_Skill.prototype.createItemWindow = function() {
    var wx = 0;
    var wy =this._skillTypeWindow.y + this._skillTypeWindow.height;
    var ww = FTKR.SSS.applySSSLayout === 0 ? Graphics.boxWidth - wx :
        FTKR.SSS.skillListWidth ? FTKR.SSS.skillListWidth : Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._skillTypeWindow.setSkillWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};

Scene_Skill.prototype.ssscreateSkillStatusTitleWindow = function() {
  var wy = FTKR.SSS.applySSSLayout === 2 ? 0 : this._statusWindow.y + this._statusWindow.height;
  var line = FTKR.SSS.applySSSLayout === 2 ? 3 + FTKR.SSS.discriptionLines : 2;
  var wh = this._helpWindow.lineHeight() * line + this._helpWindow.standardPadding() * 2;
  this.sssCreateSkillStatusTitleWindow(wy, wh, this._itemWindow);
};

Scene_Skill.prototype.ssscreateActorStatusWindow = function() {
  var ww = FTKR.SSS.skillListWidth;
  var wh = this._helpWindow.lineHeight() * 3 + this._helpWindow.standardPadding() * 2;
  this._sssActorStatusWindow = new Window_SepActorstatus(0, 0, ww, wh);
  this.addWindow(this._sssActorStatusWindow);
};

Scene_Skill.prototype.ssscreateSepSubCommandWindow = function() {
  var wy = this._itemWindow.y;
  var ww = 240;
  var wh = Graphics.boxHeight - wy;
  this._sepSubCommandWindow = new Window_SepSubCommand(0, wy, ww, wh);
  var window = this._sepSubCommandWindow;
  window.setHandler('ok', this.onSubComOk.bind(this));
  window.setHandler('cancel', this.onSubComCancel.bind(this));
  this._skillTypeWindow.setSepSubComWindow(window);
  this._itemWindow.setSepSubComWindow(window);
  this.addWindow(window);
};

Scene_Skill.prototype.createSepConfTitleWindow = function() {
  var ref = FTKR.SSS.confTitle;
  var wx = ref.posiX;
  var wy = ref.posiY;
  var ww = ref.width === -1 ? Graphics.boxWidth - wx : ref.width;
  var wh = this._helpWindow.lineHeight() + this._helpWindow.standardPadding() * 2;
  this._stsConfTitleWindow = new Window_SepConfTitle(wx, wy, ww, wh);
  this._skillTypeWindow.setSepConfTitleWindow(this._stsConfTitleWindow);
  this.addWindow(this._stsConfTitleWindow);
};

Scene_Skill.prototype.createSepConfWindow = function() {
  var ctw = this._stsConfTitleWindow;
  var wx = ctw.x;
  var wy = ctw.y + ctw.height;
  var ww = ctw.width;
  var wh = this._helpWindow.lineHeight() * 1 + this._helpWindow.standardPadding() * 2;

  this._stsConfWindow = new Window_SepConf(wx, wy, ww, wh);
  var window = this._stsConfWindow;
  window.setHandler('ok', this.onConfirmationOk.bind(this));
  window.setHandler('cancel', this.onConfirmationCancel.bind(this));
  this._skillTypeWindow.setSepConfWindow(window);
  this._itemWindow.setConfWindow(window);
  this.addWindow(window);
};

FTKR.SSS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
  FTKR.SSS.Scene_Skill_refreshActor.call(this);
  this.sssRefreshActor(this.actor());
  FTKR.SSS.itemOk = false;
  FTKR.SSS.subComOk = false;
  FTKR.SSS.confOk = false;
};

Scene_Skill.prototype.commandsssSep = function() {
  this._sssSkillListWindow.actSelect(0);
};

FTKR.SSS.Scene_Skill_onitemOk = Scene_Skill.prototype.onItemOk;
Scene_Skill.prototype.onItemOk = function() {
  if (FTKR.SSS.enabledSubCommand) {
    FTKR.SSS.subComOk = true;
    this._sepSubCommandWindow.actSelect(0);
  } else {
    FTKR.SSS.itemOk = true;
    FTKR.SSS.Scene_Skill_onitemOk.call(this);
  }
};

FTKR.SSS.Scene_Skill_onitemCancel = Scene_Skill.prototype.onItemCancel;
Scene_Skill.prototype.onItemCancel = function() {
    this._sssStatusTitleWindow.clearWindow();
    this._sssSkillStatusWindow.clearWindow();
    FTKR.SSS.Scene_Skill_onitemCancel.call(this);
};

Scene_Skill.prototype.onSubComOk = function() {
    var scw = this._sepSubCommandWindow;
    if (scw.item().symbol === 'use') {
        FTKR.SSS.itemOk = true;
        FTKR.SSS.subComOk = false;
        FTKR.SSS.Scene_Skill_onitemOk.call(this);
    } else if (scw.item().symbol === 'forget'){
        FTKR.SSS.confOk = true;
        var ctw = this._stsConfTitleWindow;
        ctw._skillId = scw._skillId;
        ctw.refresh();
        this._stsConfWindow.actSelect(0);
    } else {
        this.onSubComCancel();
    }
};

Scene_Skill.prototype.onSubComCancel = function() {
    FTKR.SSS.subComOk = false;
    this._sssStatusTitleWindow.clearWindow();
    this._sssSkillStatusWindow.clearWindow();
    this._sepSubCommandWindow.deselect();
    this._itemWindow.actSelect(this._itemWindow.index());
};

Scene_Skill.prototype.onConfirmationOk = function() {
  var cfw = this._stsConfWindow;
  if (cfw.item().dicision) {
    FTKR.SSS.confOk = false;
    cfw.deselect();
    this._actor.forgetSkill(this._stsConfTitleWindow._skillId);
    this._itemWindow.refresh();
    this.onSubComCancel();
  } else {
    this.onConfirmationCancel();
  }
};

Scene_Skill.prototype.onConfirmationCancel = function() {
  FTKR.SSS.confOk = false;
  FTKR.SSS.subComOk = false;
  this._stsConfWindow.deselect();
  this._sepSubCommandWindow.deselect();
  this.onSubComCancel();
};

Scene_ItemBase.prototype.onActorCancel = function() {
    FTKR.SSS.itemOk = false;
    FTKR.SSS.subComOk = false;
    this.hideSubWindow(this._actorWindow);
};

};//FTKR_SkillSepSystem END
