//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// 制御文字を拡張するプラグイン
// FTKR_ExEscapeCharacters.js
// 作成者     : フトコロ
// プラグインNo : 11
// 作成日     : 2017/03/27
// 最終更新日 : 2017/03/28
// バージョン : v1.0.2
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_EEC = true;

var FTKR = FTKR || {};
FTKR.EEC = FTKR.EEC || {};

/*:
 * @plugindesc v1.0.2 制御文字を拡張するプラグイン
 * @author フトコロ
 *
 * @param -- 画像の表示 --
 * @desc 
 * 
 * @param Advance Load Files
 * @desc ゲーム起動時に読み込む画像ファイル名を指定
 * 複数ある場合は、カンマ(,)で区切ること
 * @default 
 *
 * @param Enabled Adjust Height
 * @desc 画像高さに合わせて、行の高さを自動調整する
 * 0 - 無効にする, 1 - 有効にする
 * @default 0
 *
 * @param Image Width
 * @desc 制御文字\IMG[]で表示する画像の幅
 * @default 
 *
 * @param Image Height
 * @desc 制御文字\IMG[]で表示する画像の高さ
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 文章の表示等に使用できる制御文字に、以下の制御文字を追加します。
 * 
 * 1. 画像の表示
 * \IMG[画像ファイル名(, 画像番号, 画像幅, 画像高さ, 画像拡大率, 表示位置)]
 * 
 * 2. 行の高さの変更
 * \LH[行の高さ]
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 「画像の表示」機能
 *-----------------------------------------------------------------------------
 * 以下の制御文字で画像を表示できます。
 * 
 * \IMG[画像ファイル名(, 画像番号, 画像幅, 画像高さ, 画像拡大率, 表示位置)]
 * 
 * 画像ファイル名
 *    :表示させたい画像のファイル名を指定します。
 *    :画像ファイルは、/img/systemフォルダに保存してください。(*1)
 * 
 * 画像番号
 *    :画像ファイル内の何番目の画像を表示するか指定します。
 *    :アイコン画像のように、左上の画像を 0番、右上の画像を 15番、
 *    :左上から一段下の画像を 16番として数えます。
 *    :入力しない場合は、0番目の画像を表示します。
 * 
 * 画像幅
 *    :画像の幅を指定します。
 *    :0を指定、または入力しない場合は、プラグインパラメータ<Image Width>の値を
 *    :使用します。
 * 
 * 画像高さ
 *    :画像の高さを指定します。
 *    :0を指定、または入力しない場合は、プラグインパラメータ<Image Height>の値を
 *    :使用します。
 *    :プラグインパラメータ<Enabled Adjust Height>を有効にした場合、
 *    :画像の高さに合わせて以降の行の高さを自動で調整します。
 * 
 * 画像拡大率
 *    :100を基準として、画像の拡大率を指定します。
 *    :入力しない場合は、元のサイズのまま表示します。
 * 
 * 表示位置
 *    :行の高さよりも、画像高さが小さい場合に、画像を表示する位置を設定できます。
 *    : 中央(middle)   - 中央揃えで表示
 *    : 下揃え(bottom) - 下揃えで表示
 *    :入力しない場合は、上揃えで表示します。
 * 
 * 入力例)
 *    \IMG[file]
 *      画像ファイル file.png の 0番目の画像を表示する。
 *      画像の幅と高さは、プラグインパラメータの値を使用する。
 * 
 *    \IMG[file, 1, 48, 48, 80, 中央]
 *      48*48 の画像の画像ファイル file.png の 1番目の画像を80%に
 *      縮小して表示する。
 *      このとき、1行が48よりも大きい場合に中央揃えで表示する。
 * 
 * (*1):画像ファイルは、プラグインパラメータ<Advance Load File>に
 *      ファイル名を入力することで、ゲーム起動時に事前に読み込むことが
 *      できます。
 *      事前に読み込んでいない画像の場合、ゲーム起動後の最初の画像表示の際に
 *      正しく表示できない場合があります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 「行の高さの変更」機能
 *-----------------------------------------------------------------------------
 * 以下の制御文字で行の高さの変更できます。
 * 
 * \LH[行の高さ]
 * 
 * 行の高さ
 *    :この制御文字以降の1行の高さを、pixel単位で指定します。
 *    :MV標準の行の高さは 36 です。
 *    :0 を指定すると、標準の高さに変更します。
 * 
 * 入力例)
 *    \LH[48]
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
 * v1.0.2 - 2017/03/28 : 不具合修正
 * 
 * v1.0.1 - 2017/03/27 : 機能追加
 *    1. 制御文字「行の高さの変更」を追加
 *    2. 制御文字「画像の表示」に、行の高さと表示位置の調整機能を追加
 * 
 * v1.0.0 - 2017/03/27 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================



//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EEC.parameters = PluginManager.parameters('FTKR_ExEscapeCharacters');

FTKR.EEC.files = String(FTKR.EEC.parameters['Advance Load Files'] || '');
FTKR.EEC.width = Number(FTKR.EEC.parameters['Image Width'] || 0);
FTKR.EEC.height = Number(FTKR.EEC.parameters['Image Height'] || 0);
FTKR.EEC.enabledAdjustHeight = Number(FTKR.EEC.parameters['Enabled Adjust Height'] || 0);

//画像ファイル内で画像を横に並べられる数
Window_Base.EEC_IMG_LENGTH = 16;

//=============================================================================
// DataManager
//=============================================================================

//画像ファイルの事前ロード
FTKR.EEC.DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function(name, src) {
    FTKR.EEC.DataManager_loadDatabase.call(this, name, src);
    if(!FTKR.EEC.files) return;
    images = FTKR.EEC.files.split(',');
    if (!images.length) return;
    images.forEach( function(image) {
        ImageManager.loadSystem(image);
    });
};

//=============================================================================
// Window_Base
//=============================================================================

//画像表示関数 /img/system/に保存したname.pngを表示する。
Window_Base.prototype.drawEecImage = function(name, index, x, y, width, height, scale) {
    if (name) {
        var bitmap = ImageManager.loadSystem(name);
        var pw = width;
        var ph = height;
        scale = scale || 1;
        var len = Window_Base.EEC_IMG_LENGTH;
        var sx = index % len * pw;
        var sy = Math.floor(index / len) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    }
};

//=============================================================================
// 制御文字の表示処理の修正
//=============================================================================

FTKR.EEC.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'IMG':
        this.processDrawEecImg(this.obtainEscapeEecParam(textState), textState);
        break;
    case 'LH':
        textState.height = this.obtainEscapeParam(textState) || this.lineHeight();
        break;
    default:
        FTKR.EEC.Window_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
};

Window_Base.prototype.obtainEscapeEecParam = function(textState) {
    var arr = /^\[([^\]]+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var eec = arr[1].split(',');
        eec = eec.map( function(elm, i) {
            return isNaN(parseInt(elm)) ? elm : parseInt(elm);
        });
        return eec;
    } else {
        return '';
    }
};

Window_Base.prototype.processDrawEecImg = function(ececs, textState) {
    var index = ececs[1] || 0;
    var width = ececs[2] || FTKR.EEC.width;
    var height = ececs[3] || FTKR.EEC.height;
    var scale = ececs[4] / 100 || 1;
    var imgHeight = 0;
    var offset = 0; 
    if(FTKR.EEC.enabledAdjustHeight) {
        imgHeight = Math.floor(height * scale) + 4;
        var offset = 0; 
        switch (ececs[5]) {
            case 'middle':
            case '中央':
                offset = (textState.height - imgHeight) / 2;
                if(offset < 0) offset = 0;
                break;
            case 'bottom':
            case '下揃え':
                offset *= 2;
                break;
        }
    }
    this.drawEecImage(ececs[0], index, textState.x + 2, textState.y + 2 + offset, width, height, scale);
    textState.x += Math.floor(width * scale) + 4;
    textState.height = Math.max(imgHeight, textState.height);
};

