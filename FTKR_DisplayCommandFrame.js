//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// コマンドに枠を付けるプラグイン
// FTKR_DisplayCommandFrame.js
// プラグインNo : 8
// 作成者     : フトコロ
// 作成日     : 2017/03/08
// 最終更新日 : 2017/11/26
// バージョン : v1.2.1
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_DCF = true;

var FTKR = FTKR || {};
FTKR.DCF = FTKR.DCF || {};

//=============================================================================
/*:
 * @plugindesc v1.2.1 コマンドに枠を付けるプラグイン
 * @author フトコロ
 *
 * @param --Basic Setting--
 * @default
 * 
 * @param Display Frame Type
 * @desc 表示するコマンド枠のタイプを設定します
 * @type select
 * @option 非表示
 * @value 0
 * @option 単線
 * @value 1
 * @option 複線
 * @value 2
 * @option 画像
 * @value 3
 * @option 単線＋画像
 * @value 4
 * @option 複線＋画像
 * @value 5
 * @option 単線＋塗潰し
 * @value 6
 * @option 複線＋塗潰し
 * @value 7
 * @default 1
 * 
 * @param When To Display Frame
 * @desc コマンド枠を表示するタイミング
 * @type select
 * @option 常時
 * @value 0
 * @option カーソルと重なる時
 * @value 1
 * @option カーソルと重ならない時
 * @value 2
 * @default 1
 * 
 * @param Change Frame On Cursor
 * @desc カーソルと重なった時に枠を変更する機能
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 * 
 * @param Hide Cursor
 * @desc コマンドカーソルを非表示にする機能
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 * 
 * @param --Frame Line Setting--
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
 * @param --Rect Frame Setting--
 * @default
 * 
 * @param Default Rect Color
 * @desc 標準で枠内塗潰しに使用する色番号
 * @default 11
 * 
 * @param Default Rect Color2
 * @desc 標準で枠内塗潰しに使用する色番号
 * (グラデーション表示用の2色目の色番号)
 * @default 
 * 
 * @param Rect Color On Cursor
 * @desc カーソルと重なった時に使用する色番号
 * @default 3
 * 
 * @param Rect Color On Cursor2
 * @desc カーソルと重なった時に使用する色番号
 * (グラデーション表示用の2色目の色番号)
 * @default 
 * 
 * @param Rect Color Opacity
 * @desc 枠内塗潰し色の透明度
 * 0 - 透明, 255 - 不透明
 * @default 255
 * 
 * @param --Image Frame Setting--
 * @default
 * 
 * @param Image Name
 * @desc 使用する画像名
 * ファイルは /img/system/ に保存してください
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
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
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
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
 * @param --Enabled Command--
 * @default
 * 
 * @param Enabled Title Command
 * @desc タイトルコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Menu Command
 * @desc メニューコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Item Command
 * @desc アイテムコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Skill Command
 * @desc スキルコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Equip Command
 * @desc 装備コマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Option Command
 * @desc オプションコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Shop Command
 * @desc ショップコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Choice Command
 * @desc ショップコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Battle Command
 * @desc 戦闘コマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled GameEnd Command
 * @desc ショップコマンドに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 *
 * @param Enabled Menu Skill List
 * @desc メニュー画面のスキルリストに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 *
 * @param Enabled Battle Skill List
 * @desc バトル画面のスキルリストに枠を付けるか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、メニュー等のコマンド(*1)やリスト(*2)に
 * 枠を付けることができます。
 * 
 * 枠は、単線や複線、画像などから選ぶことが出来ます。
 * また、どのタイミングで枠を付けるかも選ぶことが出来ます。
 * 
 * (*1)本プラグインにおけるコマンドとは、Window_Commandオブジェクトを使って
 *     生成しているウィンドウのコマンドを指します。
 *     MV標準では、以下のウィンドウが相当します。
 *      1.タイトルコマンド
 *      2.メニュー
 *      3.アイテム選択後のアイテムタイプリスト
 *      4.装備選択後の装備変更、最強装備、等のリスト
 *      5.スキル選択後のスキルタイプリスト
 *      6.オプション
 *      7.ショップメニュー
 *      8.選択肢コマンド
 *      9.戦闘コマンド
 *      10.ゲームエンドコマンド
 *    それぞれに対して、プラグインパラメータで個別に機能のON/OFFを設定可能。
 * 
 * 
 * (*2)本プラグインにおけるリストとは、以下のウィンドウが相当します。
 *      1.メニュー画面のスキルリスト
 *      2.バトル画面のスキルリスト
 *    それぞれに対して、プラグインパラメータで個別に機能のON/OFFを設定可能。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. FTKR_ExBattleCommand.jsと組み合わせる場合は、本プラグインが下になるように
 *    配置してください。
 * 
 *    FTKR_ExBattleCommand.js
 *    FTKR_DisplayCommandFrame.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * 基本設定
 *-----------------------------------------------------------------------------
 * 枠のタイプや表示タイミングなどの基本設定は、以下のプラグインパラメータで
 * 変更できます。
 * 
 * <Display Frame Type>
 *    :表示する枠のタイプを設定します
 *    :0 - 非表示, 1 - 単線, 2 - 複線, 3 - 画像
 *    :4 - 単線 + 画像, 5 - 複線 + 画像
 *    :6 - 単線 + 塗潰し, 7 - 複線 + 塗潰し
 * 
 * <When To Display Frame>
 *    :枠を表示するタイミングを設定します
 *    :0 - 常時, 1 - カーソルと重なる時, 2 - カーソルと重ならない時
 * 
 * <Change Frame On Cursor>
 *    :カーソルと重なった時に枠を変更する機能を設定します
 *    :0 - 無効, 1 - 有効
 * 
 * <Hide Cursor>
 *    :カーソルを非表示にする機能を設定します
 *    :0 - 無効, 1 - 有効
 * 
 * 
 *-----------------------------------------------------------------------------
 * 単線、複線の設定
 *-----------------------------------------------------------------------------
 * 枠のタイプを単線または複線にした場合の表示設定は、
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Default Line Color>
 *    :標準で枠線に使用する色番号
 * 
 * <Line Color On Cursor>
 *    :カーソルと重なった時に使用する色番号
 * 
 * <Line Thick>
 *    :枠線の太さ
 * 
 * <Sub Line Color>
 *    :複線時に使用する枠線の色番号
 *    :複線専用の線色は、カーソルと重なっても変わりません
 * 
 * <Sub Line Thick>
 *    :複線時に使用する枠線の太さ
 * 
 * 
 *-----------------------------------------------------------------------------
 * 枠内塗潰しの設定
 *-----------------------------------------------------------------------------
 * 枠のタイプを枠内塗潰し有にした場合の表示設定は、
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Default Fill Color>
 *    :標準で枠内塗潰しに使用する色番号
 * 
 * <Fill Color On Cursor>
 *    :カーソルと重なった時に使用する色番号
 * 
 * <Fill Color Opacity>
 *    :枠内塗潰し色の透明度
 * 
 * 
 *-----------------------------------------------------------------------------
 * 画像の設定
 *-----------------------------------------------------------------------------
 * 枠のタイプを画像にした場合のや表示設定は、以下のプラグインパラメータで
 * 変更できます。
 * 
 * <Image Name>
 *    :使用する画像名を設定します。
 *    :画像は、プロジェクトフォルダ内の/img/system/に保存してください。(*1)
 * 
 * <Image Width>
 *    :枠画像の幅を設定します。(*1)
 * 
 * <Image Height>
 *    :枠画像の高さを設定します。(*1)
 * 
 * <Enabled Change Scale>
 *    :枠画像とカーソルサイズが異なる時の自動サイズ調整機能(*2)を設定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Image Offset X>
 *    :カーソル枠に対して枠画像の表示位置をX方向にずらしたい場合に設定します。
 *    :単位はpixelで、正の値の場合に画面右側にずれます。
 * 
 * <Image Offset Y>
 *    :カーソル枠に対して枠画像の表示位置をY方向にずらしたい場合に設定します。
 *    :単位はpixelで、正の値の場合に画面下側にずれます。
 * 
 * <Image Offset Width>
 *    :カーソル枠の幅に対して枠画像の幅を変える場合に設定します。(*3)
 *    :単位はpixelで、正の値の場合に幅が大きくなります。
 * 
 * <Image Offset Height>
 *    :カーソル枠の高さに対して枠画像の高さを変える場合に設定します。(*3)
 *    :単位はpixelで、正の値の場合に高さが大きくなります。
 * 
 * <Default Image Index>
 *    :標準で表示する画像の番号を設定します。(*4)
 * 
 * <Image Index On Cursor>
 *    :カーソルと重なった時に表示する画像の番号を設定します。(*4)
 * 
 * 
 * (*1)複数の枠画像を使用する場合は、画像ファイル内に複数の枠画像を
 *     並べてください。横に並べる数は4つまでです。
 *     このとき、それぞれの枠画像のサイズは同じにしてください。
 *     そのサイズを、<Flame Image Width><Flame Image Height>に
 *     設定してください。
 * (*2)自動サイズ調整機能は、枠画像の四隅6*6の部分を固定として、
 *     それ以外の部分を拡大縮小するものです。そのため、本機能を
 *     有効にするためには、枠画像は最低でも13*13のサイズが必要です。
 * (*3)自動サイズ調整機能を有効にする必要があります。
 * (*4)画像ファイル内に並べた枠画像の内、左上にある画像が0番になります。
 *     そこから右に1番、2番、...と数えます。
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
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.2.1 - 2017/11/24 : 不具合修正
 *    1. FTKR_ExBattleCommand.jsとの競合回避。
 * 
 * v1.2.0 - 2017/11/20 : 機能追加
 *    1. スキルリストに枠を表示する機能を追加。
 *    2. プラグインパラメータの入力方式を見直し。
 * 
 * v1.1.1 - 2017/04/21 : 枠画像ディプロイメント対応
 * 
 * v1.1.0 - 2017/03/31 : 仕様変更
 *    1. 枠線の表示仕様を変更。
 *    2. 枠内塗りつぶしに透明度の設定を追加。
 * 
 * v1.0.5 - 2017/03/15 : 機能追加
 *    1. 枠内を指定の色で塗潰す機能を追加。
 * 
 * v1.0.4 - 2017/03/10 : 機能追加
 *    1. 枠の表示タイプに、枠線と枠画像を両方表示する項目を追加。
 * 
 * v1.0.3 - 2017/03/09 : 機能追加
 *    1. コマンド毎に有効無効にできる機能を追加。
 *    2. 選択肢コマンドにも枠が付けられるように修正。
 * 
 * v1.0.2 - 2017/03/09 : 機能追加
 *    1. 枠画像のサイズ調整機能を追加。
 * 
 * v1.0.1 - 2017/03/08 : 不具合修正、一部処理を見直し
 *    1. FTKR.DCF.frame.image.offsetXとFTKR.DCF.frame.image.offsetYの
 *       プラグインパラメータに対する記述ミスを修正。
 *    2. 単線タイプの枠線の太さに対して、プラグインパラメータ<Line Thick>の値が
 *       適用されていない不具合を修正。
 *    3. 一部処理を見直し。
 * 
 * v1.0.0 - 2017/03/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_DisplayCommandFrame');

    //フレームオブジェクト
    FTKR.DCF.frame = {
        //基本設定
        type          :Number(parameters['Display Frame Type'] || 0),
        whenToDisplay :Number(parameters['When To Display Frame'] || 0),
        changeOnCursor:Number(parameters['Change Frame On Cursor'] || 0),
        hideCursor    :Number(parameters['Hide Cursor'] || 0),
        //枠線の設定
        line:{
            defColor  :Number(parameters['Default Line Color'] || 0),
            csrColor  :Number(parameters['Line Color On Cursor'] || 0),
            thick     :Number(parameters['Line Thick'] || 0),
            subColor  :Number(parameters['Sub Line Color'] || 0),
            subThick  :Number(parameters['Sub Line Thick'] || 0),
        },
        //枠内塗りつぶしの設定
        fill:{
            defColor  :Number(parameters['Default Rect Color'] || 0),
            csrColor  :Number(parameters['Rect Color On Cursor'] || 0),
            defColor2 :Number(parameters['Default Rect Color2'] || 0),
            csrColor2 :Number(parameters['Rect Color On Cursor2'] || 0),
            opacity   :Number(parameters['Rect Color Opacity'] || 0),
        },
        //枠画像の設定
        image:{
            name      :String(parameters['Image Name'] || ''),
            width     :Number(parameters['Image Width'] || 0),
            height    :Number(parameters['Image Height'] || 0),
            offsetX   :Number(parameters['Image Offset X'] || 0),
            offsetY   :Number(parameters['Image Offset Y'] || 0),
            offsetW   :Number(parameters['Image Offset Width'] || 0),
            offsetH   :Number(parameters['Image Offset Height'] || 0),
            enabledScale:Number(parameters['Enabled Change Scale'] || 0),
            defIndex  :Number(parameters['Default Image Index'] || 0),
            csrIndex  :Number(parameters['Image Index On Cursor'] || 0),
        },
    };

    //コマンド別の有効設定
    FTKR.DCF.enabled = {
        title   :Number(parameters['Enabled Title Command'] || 0),
        menu    :Number(parameters['Enabled Menu Command'] || 0),
        item    :Number(parameters['Enabled Item Command'] || 0),
        skill   :Number(parameters['Enabled Skill Command'] || 0),
        equip   :Number(parameters['Enabled Equip Command'] || 0),
        option  :Number(parameters['Enabled Option Command'] || 0),
        shop    :Number(parameters['Enabled Shop Command'] || 0),
        choice  :Number(parameters['Enabled Choice Command'] || 0),
        battle  :Number(parameters['Enabled Battle Command'] || 0),
        gameEnd :Number(parameters['Enabled GameEnd Command'] || 0),
        list : {
            menuSkill   : Number(parameters['Enabled Menu Skill List'] || 0),
            battleSkill : Number(parameters['Enabled Battle Skill List'] || 0),
        },
    };

    //画像ファイル内に横に並べられる枠画像の数
    Window_Base.IMAGE_INDEX_COLS = 4;

    //枠画像の4隅の固定部分のサイズ(pixel)
    Window_Base.IMAGE_FIXED_SIZE = 6;

    //=============================================================================
    // Bitmap
    //=============================================================================

    //枠線を描く
    Bitmap.prototype.drawDcfFrame = function(x, y, width, height, thick, color) {
        var context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.strokeRect(x + thick/2, y + thick/2, width - thick, height - thick);
        this._setDirty();
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    //枠画像ファイルの事前ロード
    var _DCF_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function(name, src) {
        _DCF_DataManager_loadDatabase.call(this, name, src);
        ImageManager.loadSystem(FTKR.DCF.frame.image.name);
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    /*-------------------------------------------------------------
    枠表示関数 drawDcfFrameBase(frame, rect, onCursor, item, type)
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、表示項目毎に枠を変えたい場合に入れる
    type    :枠タイプ(Number)、プラグインパラメータの設定を使うなら false
    -------------------------------------------------------------*/
    Window_Base.prototype.drawDcfFrameBase = function(frame, rect, onCursor, item, type) {
        switch (type || frame.type) {
            case 1:
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 2:
                return this.drawLineFrame(true, frame, rect, onCursor, item);
            case 3:
                return this.drawImageFrame(frame, rect, onCursor, item);
            case 4:
                this.drawImageFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 5:
                this.drawImageFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(true, frame, rect, onCursor, item);
            case 6:
                this.drawInFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 7:
                this.drawInFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(true, frame, rect, onCursor, item);
        }
    };

    /*-------------------------------------------------------------
    枠画像表示関数 drawImageFrame()
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に画像を変えたい場合に入れる
    画像の6*6の四つ角はそのまま使い、それ以外の部分を拡大縮小してサイズ調整する。
    ただし、画像が12*12より大きくない場合は、そのまま拡大縮小する。
    -------------------------------------------------------------*/
    Window_Base.prototype.drawImageFrame = function(frame, rect, onCursor, item) {
        if (!frame) return;
        var image = frame.image;
        if (image && image.name) {
            var iic = Window_Base.IMAGE_INDEX_COLS;
            var ifs = Window_Base.IMAGE_FIXED_SIZE; 

            var bitmap = ImageManager.loadSystem(image.name);
            var rx = rect.x + image.offsetX;
            var ry = rect.y + image.offsetY;
            var rw = rect.width;
            var rh = rect.height;
            var csrIndex = item ? item.csrIndex : 0;
            var defIndex = item ? item.defIndex : 0;
            var index = frame.changeOnCursor && onCursor ?
                csrIndex || image.csrIndex : defIndex || image.defIndex;
            var iw = image.width;
            var ih = image.height;
            var ix = index % iic * iw;
            var iy = Math.floor(index / iic) * ih;
            var flag = image.enabledScale;
            var dx = flag ? rx : rx - (iw - rw) / 2;
            var dy = flag ? ry : ry - (ih - rh) / 2;
            var dw = flag ? rw + image.offsetW : iw;
            var dh = flag ? rh + image.offsetH : ih;
            if (iw > ifs * 2 && ih > ifs * 2) {
                //上側
                this.contents.blt(bitmap, ix, iy, ifs, ifs, dx, dy, ifs, ifs);
                this.contents.blt(bitmap, ix + ifs, iy, iw - ifs*2, ifs, dx + ifs, dy, dw - ifs*2, ifs);
                this.contents.blt(bitmap, ix + iw - ifs, iy, ifs, ifs, dx + dw - ifs, dy, ifs, ifs);
                //中央
                this.contents.blt(bitmap, ix, iy + ifs, ifs, ih - ifs*2, dx, dy + ifs, ifs, dh - ifs*2);
                this.contents.blt(bitmap, ix + ifs, iy + ifs, iw - ifs*2, ih - ifs*2, dx + ifs, dy + ifs, dw - ifs*2, dh - ifs*2);
                this.contents.blt(bitmap, ix + iw - ifs, iy + ifs, ifs, ih - ifs*2, dx + dw - ifs, dy + ifs, ifs, dh - ifs*2);
                //下側
                this.contents.blt(bitmap, ix, iy + ih - ifs, ifs, ifs, dx, dy + dh - ifs, ifs, ifs);
                this.contents.blt(bitmap, ix + ifs, iy + ih - ifs, iw - ifs*2, ifs, dx + ifs, dy + dh - ifs, dw - ifs*2, ifs);
                this.contents.blt(bitmap, ix + iw - ifs, iy + ih - ifs, ifs, ifs, dx + dw - ifs, dy + dh - ifs, ifs, ifs);
            } else {
                this.contents.blt(bitmap, ix, iy, iw, iw, dx, dy, dw, dh);
            }
        }
    };

    /*-------------------------------------------------------------
    枠線表示関数 drawLineFrame()
    double  :複線タイプか(boolean)
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に枠線色を変えたい場合に入れる
    -------------------------------------------------------------*/
    Window_Base.prototype.drawLineFrame = function(double, frame, rect, onCursor, item) {
        if (!frame) return;
        var line = frame.line;
        if (line && line.thick) {
            var offset = double ? line.subThick : 0;
            var csrColor = item ? item.csrColor : 0;
            var defColor = item ? item.defColor : 0;
            var color = frame.changeOnCursor && onCursor ?
                csrColor || line.csrColor : defColor || line.defColor;
            if (double) this.drawLineFrameBase(rect, 0, line.subColor, line.subThick);
            this.drawLineFrameBase(rect, offset, color, line.thick);
            if (double) {
                offset += line.thick;
                this.drawLineFrameBase(rect, offset, line.subColor, line.subThick);
            }
        }
    };

    /*-------------------------------------------------------------
    枠内塗潰し関数 drawInFrame()
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に枠内色を変えたい場合に入れる
    -------------------------------------------------------------*/
    Window_Base.prototype.drawInFrame = function(frame, rect, onCursor, item) {
        if (!frame) return;
        var fill = frame.fill;
        if (fill) {
            var csrColor = item ? item.csrInColor : 0;
            var defColor = item ? item.defInColor : 0;
            var csrColor2 = item ? item.csrInColor2 : csrColor;
            var defColor2 = item ? item.defInColor2 : defColor;
            var color1 = frame.changeOnCursor && onCursor ?
                csrColor || fill.csrColor : defColor || fill.defColor;
            var color2 = frame.changeOnCursor && onCursor ?
                csrColor2 || fill.csrColor2 || fill.csrColor :
                defColor2 || fill.defColor2 || fill.defColor;
            var opacity = item ? item.opacity : fill.opacity;
            this.drawRect(rect.x, rect.y, rect.width, rect.height, this.textColor(color1), this.textColor(color2), opacity);
        }
    };

    //カーソルサイズに枠線を描画
    Window_Base.prototype.drawLineFrameBase = function(rect, offset, color, thick) {
        var sx = rect.x + offset;
        var sy = rect.y + offset;
        var sw = rect.width - offset * 2;
        var sh = rect.height - offset * 2;
        this.drawDcfFrameLine(sx, sy, sw, sh, color, thick);
    };

    //枠線を描画
    Window_Base.prototype.drawDcfFrameLine = function(x, y, width, height, colorNum, thick) {
      if (colorNum < 0) return false;
      var color = this.textColor(colorNum);
      this.contents.drawDcfFrame(x, y, width, height, thick, color);
    };

    //矩形を描画
    Window_Base.prototype.drawRect = function(x, y, width, thick, color1, color2, opacity) {
        color2 = color2 || color1;
        this.contents.paintOpacity = opacity || 255;
        this.contents.gradientFillRect(x, y, width, thick, color1, color2);
        this.contents.paintOpacity = 255;
    };

    //=============================================================================
    // Window_Selectable
    //=============================================================================

    /*-------------------------------------------------------------
    枠表示関数 drawDcfFrame(index, frame, type)
    index   :表示項目の番号、基本的にdrawItem(index)の引数をそのまま使う。
    frame   :フレームオブジェクト、false で本プラグインの設定を使用する。
    type    :枠タイプ(Number)、プラグインパラメータの設定を使うなら false
    item    :アイテムオブジェクト、表示項目毎に枠を変えたい場合に入れる
    表示項目毎に枠を表示する関数。基本的に、drawItem関数内の最初に追加する。
    -------------------------------------------------------------*/
    Window_Selectable.prototype.drawDcfFrame = function(index, frame, type, item) {
        frame = frame || FTKR.DCF.frame;
        var onCursor = index === this.index();
        var rect = this.itemRect(index);
        if (frame.whenToDisplay === 1 && !onCursor ||
            frame.whenToDisplay === 2 && onCursor) {
            return;
        }
        this.drawDcfFrameBase(frame, rect, onCursor, item, type);
    };

    /*-------------------------------------------------------------
    枠表示を更新する関数 updateDcfFrame(index, frame, hide)
    index   :表示項目の番号、基本的にselect(index)の引数をそのまま使う。
    frame   :フレームオブジェクト、false で本プラグインの設定を使用する。
    hide    :カーソル非表示フラグ(boolean)
    カーソルに連動して枠の表示を変える関数。
    基本的に、select関数内の最後に追加する。
    -------------------------------------------------------------*/
    Window_Selectable.prototype.updateDcfFrame = function(index, frame, hide) {
        frame = frame || FTKR.DCF.frame;
        if (hide || frame.hideCursor) {
            this.setCursorRect(0, 0, 0, 0);
        }
        var onCursor = index === this.index();
        if (frame.changeOnCursor && onCursor ||
            frame.whenToDisplay === 1 && onCursor ||
            frame.whenToDisplay === 2 && !onCursor) {
            this.refresh();
        }
    };

    //=============================================================================
    // Window_Command
    //=============================================================================
    /*
    コマンド別に設定するため、コメントアウト
    FTKR.DCF.Window_Command_drawItem = Window_Command.prototype.drawItem;
    Window_Command.prototype.drawItem = function(index) {
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawDcfFrame(index);
        FTKR.DCF.Window_Command_drawItem.call(this, index);
    };
    */
    
    //コマンド枠の更新処理を追加
    Window_Command.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.updateDcfFrame(index);
    };
    
    //=============================================================================
    // Window_TitleCommand
    //=============================================================================

    var _DCF_Window_TitleCommand_drawItem = Window_TitleCommand.prototype.drawItem;
    Window_TitleCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.title) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_TitleCommand_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_MenuCommand
    //=============================================================================

    var _DCF_Window_MenuCommand_drawItem = Window_MenuCommand.prototype.drawItem;
    Window_MenuCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.menu) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_MenuCommand_drawItem.call(this ,index);
    };

    //=============================================================================
    // Window_ItemCategory
    //=============================================================================

    var _DCF_Window_ItemCategory_drawItem = Window_ItemCategory.prototype.drawItem;
    Window_ItemCategory.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.item) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_ItemCategory_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_SkillType
    //=============================================================================

    var _DCF_Window_SkillType_drawItem = Window_SkillType.prototype.drawItem;
    Window_SkillType.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.skill) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_SkillType_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_EquipCommand
    //=============================================================================

    var _DCF_Window_EquipCommand_drawItem = Window_EquipCommand.prototype.drawItem;
    Window_EquipCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.equip) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_EquipCommand_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_Options
    //=============================================================================

    var _DCF_Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.option) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_Options_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_ShopCommand
    //=============================================================================

    var _DCF_Window_ShopCommand_drawItem = Window_ShopCommand.prototype.drawItem;
    Window_ShopCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.shop) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_ShopCommand_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_ChoiceList
    //=============================================================================

    var _DCF_Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
    Window_ChoiceList.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.choice) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_ChoiceList_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    var _DCF_Window_PartyCommand_drawItem = Window_PartyCommand.prototype.drawItem;
    Window_PartyCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.battle) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_PartyCommand_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    var _DCF_Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
    Window_ActorCommand.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.battle) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_ActorCommand_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_GameEnd
    //=============================================================================

    var _DCF_Window_GameEnd_drawItem = Window_GameEnd.prototype.drawItem;
    Window_GameEnd.prototype.drawItem = function(index) {
        if (FTKR.DCF.enabled.gameEnd) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawDcfFrame(index);
        }
        _DCF_Window_GameEnd_drawItem.call(this, index);
    };

    //=============================================================================
    // Window_SkillList
    //=============================================================================

    var _DCF_Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        var skill = this._data[index];
        if (skill) {
            if (this.checkEnableDcf()) {
                this.changePaintOpacity(this.isEnabled(skill));
                this.drawDcfFrame(index);
            }
            _DCF_Window_SkillList_drawItem.call(this, index);
        }
    };

    Window_SkillList.prototype.checkEnableDcf = function() {
        return $gameParty.inBattle() ? 
            FTKR.DCF.enabled.list.battleSkill :
            FTKR.DCF.enabled.list.menuSkill;
    };

    Window_SkillList.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.updateDcfFrame(index);
    };


}());//EOF
