//=============================================================================
// ツリー型スキル習得システム用 ウィンドウレイアウト変更プラグイン
// FTKR_STS_CustomWindow.js
// プラグインNo : 13
// 作成者     : フトコロ(futokoro)
// 作成日     : 2017/03/31
// 最終更新日 : 2018/09/08
// バージョン : v1.3.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STS_CW = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};
FTKR.STS.CW = FTKR.STS.CW || {};

//=============================================================================
/*:
 * @plugindesc v1.3.1 ツリー型スキル習得システム用 ウィンドウレイアウト変更プラグイン
 * @author フトコロ
 *
 * @param --ツリータイプウィンドウの設定(Tree Types Window)--
 * @default 
 * 
 * @param Tree Types Max Cols
 * @desc ツリータイプを横に並べられる数
 * @default 1
 * 
 * @param Tree Types Height Space
 * @desc ツリータイプの縦のコマンド間隔
 * @default 0
 * 
 * @param Tree Types Position X
 * @desc ツリータイプウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 0
 *
 * @param Tree Types Position Y
 * @desc ツリータイプウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 144
 *
 * @param Tree Types Width
 * @desc ツリータイプウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 240
 *
 * @param Tree Types Height
 * @desc ツリータイプウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default 288
 *
 * @param Tree Types Opacity
 * @desc ツリータイプウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Tree Types Padding
 * @desc ツリータイプウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Tree Types Frame Hide
 * @desc ツリータイプウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --スキルツリーウィンドウの設定(Skill Tree Window)--
 * @default 
 *
 * @param Skill Tree Position X
 * @desc スキルツリーウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 240
 *
 * @param Skill Tree Position Y
 * @desc スキルツリーウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 144
 *
 * @param Skill Tree Width
 * @desc スキルツリーウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default -1
 *
 * @param Skill Tree Height
 * @desc スキルツリーウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default -1
 *
 * @param Skill Tree Opacity
 * @desc スキルツリーウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Skill Tree Padding
 * @desc スキルツリーウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Skill Tree Frame Hide
 * @desc スキルツリーウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --スキル説明ウィンドウの設定(Skill Status Window)--
 * @default 
 * 
 * @param Skill Status Position X
 * @desc スキルステータスウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 240
 *
 * @param Skill Status Position Y
 * @desc スキルステータスウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 0
 *
 * @param Skill Status Width
 * @desc スキルステータスウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default -1
 *
 * @param Skill Status Height
 * @desc スキルステータスウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default 144
 *
 * @param Skill Status Opacity
 * @desc スキルステータスウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Skill Status Padding
 * @desc スキルステータスウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Skill Status Frame Hide
 * @desc スキルステータスウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --アクターステータスウィンドウの設定(Actor Status Window)--
 * @default
 * 
 * @param Actor Status Position X
 * @desc アクターステータスウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 0
 *
 * @param Actor Status Position Y
 * @desc アクターステータスウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 0
 *
 * @param Actor Status Width
 * @desc アクターステータスウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 240
 *
 * @param Actor Status Height
 * @desc アクターステータスウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default 144
 *
 * @param Actor Status Opacity
 * @desc アクターステータスウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Actor Status Padding
 * @desc アクターステータスウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Actor Status Frame Hide
 * @desc アクターステータスウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --コストウィンドウの設定(Cost Window)--
 * @default 
 *
 * @param Always Display Cost
 * @desc コストに常に表示するか。
 * @default 1
 * @type select
 * @option 表示しない(選択時のみ表示)
 * @value 0
 * @option 表示する
 * @value 1
 * @option 表示しない(常時)
 * @value 2
 *
 * @param Cost Max Cols
 * @desc コストを横に並べる最大数を指定します。
 * @default 1
 *
 * @param Cost Spacing
 * @desc コストを横に並べた時の間隔を指定します。
 * @default 24
 *
 * @param Cost Position X
 * @desc コストウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 0
 *
 * @param Cost Position Y
 * @desc コストウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 432
 *
 * @param Cost Width
 * @desc コストウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 240
 *
 * @param Cost Height
 * @desc コストウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default -1
 *
 * @param Cost Opacity
 * @desc コストウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Cost Padding
 * @desc コストウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Cost Frame Hide
 * @desc コストウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --前提スキルウィンドウの設定(Pre Skill Window)--
 * @default 
 *
 * @param Always Display Preskill
 * @desc 前提スキルに常に表示するか。
 * @default 0
 * @type select
 * @option 表示しない(選択時のみ表示)
 * @value 0
 * @option 表示する
 * @value 1
 * @option 表示しない(常時)
 * @value 2
 *
 * @param Preskill Max Cols
 * @desc 前提スキルを横に並べる最大数を指定します。
 * @default 1
 *
 * @param Preskill Spacing
 * @desc 前提スキルを横に並べた時の間隔を指定します。
 * @default 24
 *
 * @param Preskill Position X
 * @desc 前提スキルウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 204
 *
 * @param Preskill Position Y
 * @desc 前提スキルウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 264
 *
 * @param Preskill Width
 * @desc 前提スキルウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 408
 *
 * @param Preskill Height
 * @desc 前提スキルウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @default 216
 *
 * @param Preskill Opacity
 * @desc 前提スキルウィンドウの透明率を指定します。
 * @default 192
 *
 * @param Preskill Padding
 * @desc 前提スキルウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Preskill Frame Hide
 * @desc 前提スキルウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --確認ウィンドウの設定(Confirmation Window)--
 * @default 
 *
 * @param Conf Title Position X
 * @desc 確認ウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 204
 *
 * @param Conf Title Position Y
 * @desc 確認ウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 120
 *
 * @param Conf Title Width
 * @desc 確認ウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 408
 *
 * @param Conf Title Height
 * @desc 確認ウィンドウの高さを指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 72
 *
 * @param Conf Title Opacity
 * @desc 確認ウィンドウの透明率を指定します。
 * @default 192
 * 
 * @param Conf Title Padding
 * @desc 確認ウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Conf Title Frame Hide
 * @desc 確認ウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --確認コマンドウィンドウの設定(Confirmation Window)--
 * @default 
 *
 * @param Confirmation Opacity
 * @desc 確認コマンドウィンドウの透明率を指定します。
 * @default 192
 * 
 * @param Confirmation Padding
 * @desc 確認コマンドウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Confirmation Frame Hide
 * @desc 確認コマンドウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
 *
 * @param --ツリータイトルウィンドウの設定(TreeTitle Window)--
 * @default 
 *
 * @param Tree Title Format
 * @desc ツリータイトルウィンドウの表示内容を設定します。
 * 制御文字が使用可能です。空欄の場合はウィンドウを表示しません。
 * @default 
 * 
 * @param Tree Title Position X
 * @desc ツリータイトルウィンドウの左上のX座標を指定します。
 * (参考値：デフォルト画面幅サイズ = 816)
 * @default 
 *
 * @param Tree Title Position Y
 * @desc ツリータイトルウィンドウの左上のY座標を指定します。
 * (参考値：デフォルト画面高さサイズ = 624)
 * @default 
 *
 * @param Tree Title Width
 * @desc ツリータイトルウィンドウの幅を指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 
 *
 * @param Tree Title Height
 * @desc ツリータイトルウィンドウの高さを指定します。
 * (参考値：余白 = 18) (-1 で、画面右端まで)
 * @default 
 *
 * @param Tree Title Opacity
 * @desc ツリータイトルウィンドウの透明率を指定します。
 * @default 192
 * 
 * @param Tree Title Padding
 * @desc ツリータイトルウィンドウの余白幅を指定します。
 * @default 18
 *
 * @param Tree Title Frame Hide
 * @desc ツリータイトルウィンドウの枠を非表示にするか。
 * 0 - 表示する(show), 1 - 表示しない(hide)
 * @default 0
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
 * @type file
 * 
 * @noteParam STS_画像
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam STS_IMAGE
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData actors
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、ツリー型のスキル習得システム(v1.6.ｘ)用の拡張プラグインです。
 *
 * 本プラグインにより、スキル習得システムの専用画面のウィンドウレイアウトを
 * 変更することができます。
 * 
 * ＜変更できる設定＞
 *  1. スキルツリーウィンドウで、スキルツリータイプを横に並べられる数
 *  1. 各ウィンドウの位置
 *  2. 各ウィンドウのサイズ
 *  3. 各ウィンドウの透明度
 *  4. 背景に画像を表示
 *  5. 背景にアクターの立ち絵を表示
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *-----------------------------------------------------------------------------
 * 1. 本プラグインには、FTKR_SkillTreeSystem.js (v1.16.0以降) が必要です。
 * 
 *    FTKR_SkillTreeSystem.js is required.
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルツリーウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定ができます。
 * 
 * <Tree Types Max Cols>
 *    :スキルツリータイプを横に並べられる数
 *    :ウィンドウのサイズ変更に合わせて変更してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで各ウィンドウの設定ができます。
 * 
 * <windowname Position X>
 *    :ウィンドウの左上の位置のX座標を指定します。(*1)
 * <windowname Position Y>
 *    :ウィンドウの左上の位置のY座標を指定します。(*1)
 * 
 * <windowname Width>
 *    :ウィンドウの幅を指定します。(*1)
 * <windowname Height>
 *    :ウィンドウの高さを指定します。(*1)
 * 
 * <windowname Opacity>
 *    :ウィンドウの透明率を指定します。
 *    :背景に画像を使用する場合は、透明の 0 を設定するとよいでしょう。
 * 
 * (*1)確認コマンドウィンドウのサイズと位置は、確認ウィンドウに合わせて
 *     自動調整するため、設定できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 背景の設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで背景の設定ができます。
 * 
 * <Background Image Name>
 *    :背景に使用する画像ファイル名を指定します。
 *    :画像ファイルは、/img/systemフォルダに保存してください。
 * 
 * 
 * また、以下のタグをアクターのメモ欄に追記することで、背景にアクターの
 * 立ち絵を表示できます。
 * 
 * <STS_画像:ImageName>
 * code
 * </STS_画像>
 * 
 * または
 * 
 * <STS_IMAGE:ImageName>
 * code
 * </STS_IMAGE>
 *    :ImageName - 背景に表示させたい画像名を入力します。(*1)
 * 
 * [code に使用できる項目]
 * Bgi offset X: n
 *    :ウィンドウ左上を原点として画像左上のX座標を入力します。
 * Bgi offset Y: n
 *    :ウィンドウ左上を原点として画像左上のY座標を入力します。
 * 
 * (*1)画像は、プロジェクトフォルダ内の/img/system/に保存してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
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
 * v1.3.1 : 2018/09/08 : 不具合修正
 *    1. コストウィンドウと前提スキルウィンドウを常時表示させない設定にした場合に
 *       正しく機能しない不具合修正。
 * 
 * v1.3.0 : 2018/09/04 : 機能追加
 *    1. コストウィンドウと前提スキルウィンドウを常時表示させない機能を追加。
 *    2. スキルツリータイトルとして固定の文字列を表示可能なウィンドウを追加。
 * 
 * v1.2.1 : 2017/06/07 : 不具合修正
 *    1. アクター立ち絵のタグが正しく読み取れない不具合を修正。
 * 
 * v1.2.0 : 2017/06/06 : 機能追加
 *    1. 習得コストと前提スキルを横に並べて表示する機能を追加。
 * 
 * v1.1.1 - 2017/04/22 : 不具合修正
 *    1. ウィンドウサイズを変更した際に、コンテンツエリアが変わっていない
 *       不具合を修正。
 * 
 * v1.1.0 - 2017/04/21 : 機能変更
 *    1. 背景画像ディプロイメント対応
 *    2. アクター立ち絵のディプロイメント対応ため、タグ変更
 * 
 * v1.0.2 - 2017/04/07 : 機能追加
 *    1. コストウィンドウと前提スキルウィンドウの常時表示設定を移動。
 * 
 * v1.0.1 - 2017/04/01 : 不具合修正、機能追加
 *    1. プラグインパラメータ<Tree Types Max Cols>の値が取得できていなかった
 *       不具合を修正。
 *    2. ウィンドウの余白の幅の変更、および枠を消すパラメータを追加。
 *    3. スキルツリータイプのコマンドの縦の間隔を設定するパラメータを追加。
 * 
 * v1.0.0 - 2017/03/31 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

if(Imported.FTKR_STS) {

function Window_SkillTreeTitle() {
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
    var parameters = PluginManager.parameters('FTKR_STS_CustomWindow');

    FTKR.STS.CW.alwaysDispCost     = Number(paramParse(parameters['Always Display Cost'] || 0));
    FTKR.STS.CW.alwaysDispPreskill = Number(paramParse(parameters['Always Display Preskill'] || 0));

    //背景設定
    FTKR.STS.CW.background = {
        name    :String(parameters['Background Image Name'] || ''),
    };

    //ツリータイプウィンドウ設定
    FTKR.STS.CW.treeTypes = {
        maxCols :Number(parameters['Tree Types Max Cols'] || 0),
        hspace  :Number(parameters['Tree Types Height Space'] || 0),
        posiX   :Number(parameters['Tree Types Position X'] || 0),
        posiY   :Number(parameters['Tree Types Position Y'] || 0),
        width   :Number(parameters['Tree Types Width'] || 0),
        height  :Number(parameters['Tree Types Height'] || 0),
        opacity :Number(parameters['Tree Types Opacity'] || 0),
        padding :Number(parameters['Tree Types Padding'] || 0),
        frame   :Number(parameters['Tree Types Frame Hide'] || 0),
    };
    //スキルツリーウィンドウ設定
    FTKR.STS.CW.skillTree = {
        posiX   :Number(parameters['Skill Tree Position X'] || 0),
        posiY   :Number(parameters['Skill Tree Position Y'] || 0),
        width   :Number(parameters['Skill Tree Width'] || 0),
        height  :Number(parameters['Skill Tree Height'] || 0),
        opacity :Number(parameters['Skill Tree Opacity'] || 0),
        padding :Number(parameters['Skill Tree Padding'] || 0),
        frame   :Number(parameters['Skill Tree Frame Hide'] || 0),
    };
    //スキルツリータイトルウィンドウ設定
    FTKR.STS.CW.treeTitle = {
        format  :String(parameters['Tree Title Format']),
        posiX   :Number(parameters['Tree Title Position X'] || 0),
        posiY   :Number(parameters['Tree Title Position Y'] || 0),
        width   :Number(parameters['Tree Title Width'] || 0),
        height  :Number(parameters['Tree Title Height'] || 0),
        opacity :Number(parameters['Tree Title Opacity'] || 0),
        padding :Number(parameters['Tree Title Padding'] || 0),
        frame   :Number(parameters['Tree Title Frame Hide'] || 0),
    };

    //スキルステータスウィンドウ設定
    FTKR.STS.CW.skillStatus = {
        posiX   :Number(parameters['Skill Status Position X'] || 0),
        posiY   :Number(parameters['Skill Status Position Y'] || 0),
        width   :Number(parameters['Skill Status Width'] || 0),
        height  :Number(parameters['Skill Status Height'] || 0),
        opacity :Number(parameters['Skill Status Opacity'] || 0),
        padding :Number(parameters['Skill Status Padding'] || 0),
        frame   :Number(parameters['Skill Status Frame Hide'] || 0),
    };
    //アクターステータスウィンドウ設定
    FTKR.STS.CW.actorStatus = {
        posiX   :Number(parameters['Actor Status Position X'] || 0),
        posiY   :Number(parameters['Actor Status Position Y'] || 0),
        width   :Number(parameters['Actor Status Width'] || 0),
        height  :Number(parameters['Actor Status Height'] || 0),
        opacity :Number(parameters['Actor Status Opacity'] || 0),
        padding :Number(parameters['Actor Status Padding'] || 0),
        frame   :Number(parameters['Actor Status Frame Hide'] || 0),
    };
    //コストウィンドウ設定
    FTKR.STS.CW.cost = {
        maxCols :Number(parameters['Cost Max Cols'] || 0),
        spacing :Number(parameters['Cost Spacing'] || 0),
        posiX   :Number(parameters['Cost Position X'] || 0),
        posiY   :Number(parameters['Cost Position Y'] || 0),
        width   :Number(parameters['Cost Width'] || 0),
        height  :Number(parameters['Cost Height'] || 0),
        opacity :Number(parameters['Cost Opacity'] || 0),
        padding :Number(parameters['Cost Padding'] || 0),
        frame   :Number(parameters['Cost Frame Hide'] || 0),
    };
    //前提スキルウィンドウ設定
    FTKR.STS.CW.preskill = {
        maxCols :Number(parameters['Preskill Max Cols'] || 0),
        spacing :Number(parameters['Preskill Spacing'] || 0),
        posiX   :Number(parameters['Preskill Position X'] || 0),
        posiY   :Number(parameters['Preskill Position Y'] || 0),
        width   :Number(parameters['Preskill Width'] || 0),
        height  :Number(parameters['Preskill Height'] || 0),
        opacity :Number(parameters['Preskill Opacity'] || 0),
        padding :Number(parameters['Preskill Padding'] || 0),
        frame   :Number(parameters['Preskill Frame Hide'] || 0),
    };
    //確認ウィンドウ設定
    FTKR.STS.CW.confTitle = {
        posiX   :Number(parameters['Conf Title Position X'] || 0),
        posiY   :Number(parameters['Conf Title Position Y'] || 0),
        width   :Number(parameters['Conf Title Width'] || 0),
        height  :Number(parameters['Conf Title Height'] || 0),
        opacity :Number(parameters['Conf Title Opacity'] || 0),
        padding :Number(parameters['Conf Title Padding'] || 0),
        frame   :Number(parameters['Conf Title Frame Hide'] || 0),
    };
    //確認コマンドウィンドウ設定
    FTKR.STS.CW.conf = {
        opacity :Number(parameters['Confirmation Opacity'] || 0),
        padding :Number(parameters['Confirmation Padding'] || 0),
        frame   :Number(parameters['Confirmation Frame Hide'] || 0),
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    FTKR.STS.CW.DatabaseLoaded = false;
    FTKR.STS.CW.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!FTKR.STS.CW.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!FTKR.STS.CW.DatabaseLoaded) {
            this.stsBgiDataNotetags($dataActors);
            FTKR.STS.CW.DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.stsBgiDataNotetags = function(group) {
        var note1a = /<STS_IMAGE:(.+)>/i;
        var note1aj = /<STS_画像:(.+)>/i;
        var note1b = /<\/STS_IMAGE>/i;
        var note1bj = /<\/STS_画像>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var setMode = 'none';
            obj.sts.bgi = {
            name:'',
            offsetX:0,
            offsetY:0,
            };
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1a) || line.match(note1aj)) {
                    var text = '';
                    setMode = 'data';
                    obj.sts.bgi.name = RegExp.$1;
                } else if (note1b.test(line) || note1bj.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setStsBgiData(obj);
        }
    };

    DataManager.setStsBgiData = function(obj) {
        var stsdata = obj.sts.data;
        if (stsdata) {
            var case2 = /(?:BGI OFFSET X):[ ]*(\d+)/i;
            var case3 = /(?:BGI OFFSET Y):[ ]*(\d+)/i;

            var datas = stsdata.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if(data.match(case2)) {
                    obj.sts.bgi.offsetX = Number(RegExp.$1);
                } else if(data.match(case3)) {
                    obj.sts.bgi.offsetY = Number(RegExp.$1);
                }
            }
            obj.sts.data = '';
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    FTKR.STS.CW.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        FTKR.STS.CW.Game_Actor_setup.call(this, actorId);
        ImageManager.loadSystem(this.actor().sts.bgi.name);
    };

    //=============================================================================
    // Scene_STS
    //=============================================================================

    Scene_STS.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = FTKR.STS.CW.background.name;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadSystem(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
        this._contents = new Sprite();
        this.addChild(this._contents);
    };

    FTKR.STS.CW.Scene_STS_refreshActor = Scene_STS.prototype.refreshActor;
    Scene_STS.prototype.refreshActor = function() {
        FTKR.STS.CW.Scene_STS_refreshActor.call(this);
        var actor = this.actor();
        if (actor) {
            var bgi = actor.actor().sts.bgi;
            if (bgi.name) {
                this._contents.bitmap = ImageManager.loadSystem(bgi.name);
                this._contents.move(bgi.offsetX, bgi.offsetY);
            }
        }
        if(FTKR.STS.CW.alwaysDispCost !== 1) this._stsCostWindow.hide();
        if(FTKR.STS.CW.alwaysDispPreskill == 1) this._stsPreskillWindow.show();
    };

    Scene_STS.prototype.stsConfHide = function() {
        this._stsConfWindow.hide();
        this._stsConfTitleWindow.hide();
        if(FTKR.STS.CW.alwaysDispCost !== 1) {
            this._stsCostWindow.hide();
        }
        if(FTKR.STS.CW.alwaysDispPreskill !== 1) {
            this._stsPreskillWindow.hide();
        }
    };

    Scene_STS.prototype.stsConfShow = function() {
        this._stsConfWindow.show();
        this._stsConfTitleWindow.show();
        if(!FTKR.STS.CW.alwaysDispCost) {
            this._stsCostWindow.show();
        }
        if(!FTKR.STS.CW.alwaysDispPreskill) {
            this._stsPreskillWindow.show();
        }
    };

    var _Scene_STS_createSkillTreeWindow = Scene_STS.prototype.createSkillTreeWindow;
    Scene_STS.prototype.createSkillTreeWindow = function() {
        _Scene_STS_createSkillTreeWindow.call(this);
        if (FTKR.STS.CW.treeTitle.format) {
            this.createStsSkillTreeTitleWindow();
        }
    };

    Scene_STS.prototype.createStsSkillTreeTitleWindow = function() {
        this._stsTreeTitleWindow = new Window_SkillTreeTitle();
        this.addWindow(this._stsTreeTitleWindow);
    };
  
  
    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.setWubdiwLayout = function(layout) {
        this.x = layout.posiX;
        this.y = layout.posiY;
        this.width = layout.width === -1 ? Graphics.boxWidth - this.x : layout.width;
        this.height = layout.height === -1 ? Graphics.boxHeight - this.y : layout.height;
    };

    Window_Base.prototype.getWindowLayout = function(layout) {
        return {
            x:layout.posiX,
            y:layout.posiY,
            width:layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width,
            height:layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height,
        };
    };

    //=============================================================================
    // Window_TreeType
    //=============================================================================

    FTKR.STS.CW.Window_TreeType_initialize = Window_TreeType.prototype.initialize;
    Window_TreeType.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.treeTypes);
        FTKR.STS.CW.Window_TreeType_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_TreeType.prototype.itemHeightSpace = function() {
        return FTKR.STS.CW.treeTypes.hspace;
    };

    Window_TreeType.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.treeTypes.opacity;
    };

    Window_TreeType.prototype.standardPadding = function() {
        return FTKR.STS.CW.treeTypes.padding;
    };

    Window_TreeType.prototype.maxCols = function() {
    return Math.max(FTKR.STS.CW.treeTypes.maxCols, 1);
    };

    Window_TreeType.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.treeTypes.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_TreeType.prototype.maxPageRows = function() {
        var pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.unitHeight());
    };

    Window_TreeType.prototype.topRow = function() {
        return Math.floor(this._scrollY / this.unitHeight());
    };

    Window_TreeType.prototype.setTopRow = function(row) {
        var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    Window_TreeType.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * this.unitWidth() - this._scrollX;
        rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
        return rect;
    };

    //=============================================================================
    // Window_SkillTree
    //=============================================================================

    FTKR.STS.CW.Window_SkillTree_initialize = Window_SkillTree.prototype.initialize;
    Window_SkillTree.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.skillTree);
        FTKR.STS.CW.Window_SkillTree_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_SkillTree.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.skillTree.opacity;
    };

    Window_SkillTree.prototype.standardPadding = function() {
        return FTKR.STS.CW.skillTree.padding;
    };

    Window_SkillTree.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.skillTree.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsSkillStatus
    //=============================================================================

    FTKR.STS.CW.Window_StsSkillStatus_initialize = Window_StsSkillStatus.prototype.initialize;
    Window_StsSkillStatus.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.skillStatus);
        FTKR.STS.CW.Window_StsSkillStatus_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_StsSkillStatus.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.skillStatus.opacity;
    };

    Window_StsSkillStatus.prototype.standardPadding = function() {
        return FTKR.STS.CW.skillStatus.padding;
    };

    Window_StsSkillStatus.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.skillStatus.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsActorStatus
    //=============================================================================

    FTKR.STS.CW.Window_StsActorStatus_initialize = Window_StsActorStatus.prototype.initialize;
    Window_StsActorStatus.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.actorStatus);
        FTKR.STS.CW.Window_StsActorStatus_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_StsActorStatus.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.actorStatus.opacity;
    };

    Window_StsActorStatus.prototype.standardPadding = function() {
        return FTKR.STS.CW.actorStatus.padding;
    };

    Window_StsActorStatus.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.actorStatus.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsCost
    //=============================================================================

    FTKR.STS.CW.Window_StsCost_initialize = Window_StsCost.prototype.initialize;
    Window_StsCost.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.cost);
        FTKR.STS.CW.Window_StsCost_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_StsCost.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.cost.opacity;
    };

    Window_StsCost.prototype.standardPadding = function() {
        return FTKR.STS.CW.cost.padding;
    };

    Window_StsCost.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.cost.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_StsCost.prototype.drawCostValues = function(skill, x, y, width) {
        if (!this._skillId) return;
        var lh = this.lineHeight();
        var costs = skill.sts.costs;
        var cols = FTKR.STS.CW.cost.maxCols;
        var spacing = FTKR.STS.CW.cost.spacing;
        var cw = (width - spacing * (cols - 1))/ cols
        var cx = 0, cy = 0;
        for (var i = 0, n = 0; i< costs.length; i++) {
            var cost = costs[i];
            if (cost) {
                if (FTKR.STS.sp.hideCost0 && cost.type === 'sp' &&
                    (!cost.value || Number(cost.value) === 0)) {
                    n -= 1;
                    continue;
                }
                if (!((i + n) % cols)) {
                    cx = 0;
                    cy += 1;
                } else {
                    cx += cw + spacing;
                }
                FTKR.setGameData(this._actor, null, skill);
                this.drawStsCost(cost, x + cx, y + lh * (cy - 1), cw);
            }
        }
    };

    //=============================================================================
    // Window_StsPreskill
    //=============================================================================

    FTKR.STS.CW.Window_StsPreskill_initialize = Window_StsPreskill.prototype.initialize;
    Window_StsPreskill.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.preskill);
        FTKR.STS.CW.Window_StsPreskill_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_StsPreskill.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.preskill.opacity;
    };

    Window_StsPreskill.prototype.standardPadding = function() {
        return FTKR.STS.CW.preskill.padding;
    };

    Window_StsPreskill.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.preskill.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_StsPreskill.prototype.drawPreSkills = function(x, y, width) {
        if (this._skillId && this._tTypeId) {
            var actor = this._actor;
            var lh = this.lineHeight();
            var preskillIds = actor.getPreskillId(this._skillId, this._tTypeId);
            var cols = FTKR.STS.CW.preskill.maxCols;
            var spacing = FTKR.STS.CW.preskill.spacing;
            var cw = (width - spacing * (cols - 1))/ cols
            var cx = 0, cy = 0;
            for (var i = 0; i< preskillIds.length; i++) {
                var preskill = actor.stsSkill(preskillIds[i]);
                if (preskill) {
                    if (!(i % cols)) {
                        cx = 0;
                        cy += 1;
                    } else {
                        cx += cw + spacing;
                    }
                    this.changePaintOpacity(actor.isStsLearnedSkill(preskill.id));
                    this.drawFormatTextEx(FTKR.STS.preskill.itemFormat, x + cx, y + lh * (cy - 1), [preskill.name], cw);
                    this.changePaintOpacity(1);
                }
            }
        }
    };

    //=============================================================================
    // Window_StsConfTitle
    //=============================================================================

    FTKR.STS.CW.Window_StsConfTitle_initialize = Window_StsConfTitle.prototype.initialize;
    Window_StsConfTitle.prototype.initialize = function(x, y, width, height) {
        var layout = this.getWindowLayout(FTKR.STS.CW.confTitle);
        FTKR.STS.CW.Window_StsConfTitle_initialize.call(this, layout.x, layout.y, layout.width, layout.height);
    };

    Window_StsConfTitle.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.confTitle.opacity;
    };

    Window_StsConfTitle.prototype.standardPadding = function() {
        return FTKR.STS.CW.confTitle.padding;
    };

    Window_StsConfTitle.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.confTitle.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsConf
    //=============================================================================

    Window_StsConf.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.conf.opacity;
    };

    Window_StsConf.prototype.standardPadding = function() {
        return FTKR.STS.CW.conf.padding;
    };

    Window_StsConf.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.conf.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_SkillTreeTitle
    //=============================================================================

    Window_SkillTreeTitle.prototype = Object.create(Window_Base.prototype);
    Window_SkillTreeTitle.prototype.constructor = Window_SkillTreeTitle;

    Window_SkillTreeTitle.prototype.initialize = function() {
        var layout = this.getWindowLayout(FTKR.STS.CW.treeTitle);
        Window_Base.prototype.initialize.call(this, layout.x, layout.y, layout.width, layout.height);
        this.refresh();
    };

    Window_SkillTreeTitle.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.treeTitle.opacity;
    };

    Window_SkillTreeTitle.prototype.standardPadding = function() {
        return FTKR.STS.CW.treeTitle.padding;
    };

    Window_SkillTreeTitle.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.treeTitle.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_SkillTreeTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawStsText(FTKR.STS.CW.treeTitle.format);
    };

    Window_SkillTreeTitle.prototype.drawStsText = function(format) {
        //var width = this.width - this.standardPadding() * 2;
        this.drawTextEx(format, 0, 0);
    };


}());
//=============================================================================
} else {
    var text = '';
    var textj = '<FTKR_SkillTreeSystem.js>がありません!\r\n'
    textj += 'プラグイン管理に<FTKR_SkillTreeSystem.js>を追加してください!'
    console.log(textj);
    var text = 'There is no FTKR_SkillTreeSystem.js!\r\n'
    text += 'Please add FTKR_SkillTreeSystem.js to the plugin manager!'
    console.log(text);
}//FTKR_STS_CustomWindow.js END
