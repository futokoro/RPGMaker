//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// メッセージウィンドウを拡張するプラグイン
// FTKR_ExMessageWindow.js
// プラグインNo : 12
// 作成者     : フトコロ
// 作成日     : 2017/03/28
// 最終更新日 : 2017/04/02
// バージョン : v1.0.2
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_EMW = true;

var FTKR = FTKR || {};
FTKR.EMW = FTKR.EMW || {};

/*:
 * @plugindesc v1.0.2 メッセージウィンドウを拡張するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 文章の表示等に使用できる制御文字に、以下の制御文字を追加します。
 * 
 * 1. サブウィンドウで文章の表示
 * \SUBA[表示位置, 文章, 顔画像ファイル名, 顔画像番号)]
 * \SUBB[表示位置, 文章, 顔画像ファイル名, 顔画像番号)]
 * \SUBW[ウィンドウ番号, 顔画像設定, ウィンドウ設定, 表示位置, 文章]
 *    :サブAとサブBのウィンドウは同時に表示できます。
 *    :この制御文字は、文章の表示時にのみ使用できます。
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
 * 「サブウィンドウで文章の表示」機能
 *-----------------------------------------------------------------------------
 * 以下の制御文字で画像を表示できます。
 * 顔画像ファイル名と顔画像番号の入力方式はどちらを使用しても同じ結果になります。
 * 
 * \SUBA[表示位置, 文章, 顔画像ファイル名, 顔画像番号]
 * \SUBA[表示位置, 文章, 顔画像ファイル名(顔画像番号)]
 * 
 * \SUBB[表示位置, 文章(, 顔画像ファイル名, 顔画像番号)]
 * \SUBB[表示位置, 文章, 顔画像ファイル名(顔画像番号)]
 * 
 * \SUBW[ウィンドウ番号, 顔画像ファイル名(顔画像番号), 背景設定, 表示位置, 文章]
 * 
 * ウィンドウ番号
 *    :表示するサブウィンドウの番号を指定します。
 *    : 0 - サブウィンドウA
 *    : 1 - サブウィンドウB
 *    :後述するスクリプトで指定するウィンドウ番号と同じ意味です。
 * 
 * 表示位置
 *    :画面内でサブウィンドウを表示する位置を指定します。
 *    : 0 または 上 - 画面上部
 *    : 1 または 中 - 画面中央
 *    : 2 または 下 - 画面下部
 *    : 左         - 画面左寄せ
 *    : 右         - 画面左寄せ
 *    : 「左上」のように組み合わせて指定できます。
 * 
 * 文章
 *    :サブウィンドウに表示する文章を記載します。
 *    :制御文字を使用したい場合は、別途入力が必要です。
 * 
 * 顔画像ファイル名
 *    :表示させたい顔画像のファイル名を指定します。
 *    :入力しない場合は表示しません。
 * 
 * 顔画像番号
 *    :顔画像ファイル内の何番目の画像を表示するか指定します。
 *    :入力しない場合は0番目を表示します。
 * 
 * 背景設定
 *    :背景設定は、以下の数字または文字で指定します。
 *    : 0 または ウィンドウ
 *    : 1 または 暗くする
 *    : 2 または 透明 
 *    :空欄の場合は、ウィンドウタイプになります。
 * 
 * 入力例)
 *    \SUBA[上,こんにちは]
 *      画面上部に、サブウィンドウAに「こんにちは」を表示します。
 * 
 *    \SUBA[0,こんにちは,Actor1,2]
 *    \SUBA[上,こんにちは,Actor1(2)]
 *      画面上部に、Actor1.pngの2番目の顔画像付きで
 *      サブウィンドウAに「こんにちは」を表示します。
 * 
 *    \SUBW[0, Actor1(2), 暗くする, 上, こんにちは]
 *      画面上部に、Actor1.pngの2番目の顔画像付きでサブウィンドウ0番を
 *      「こんにちは」という内容で表示します。
 *      背景設定は「暗くする」になります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * サブウィンドウを表示するタイミングについて
 *-----------------------------------------------------------------------------
 * サブウィンドウを表示するタイミングは、文章の表示欄に制御文字を
 * 挿入した箇所で決まります。
 * 
 * 入力例）下のようにイベントで文章の表示を実行したとします。
 * 
 * ◆文章：Actor1(1),ウィンドウ,下
 * ：   ：こんにちは
 * ：   ：\SUBA[0,こんにちは,Actor1,2]いい天気ですね
 * ◆
 * 
 * この場合は、下の順番で表示します。
 * 
 * 1.メインウィンドウが画面下部に表示
 * 2.メインウィンドウに「こんにちは」が表示
 * 3.画面上部にサブウィンドウAが表示
 * 4.サブウィンドウAに「こんにちは」が表示し、入力待ち
 * 5.入力後、メインウィンドウに「いい天気ですね」が表示、入力待ち
 * 6.入力後、メインウィンドウとサブウィンドウAが消える
 * 
 * 上記の通りに、サブウィンドウが消えるタイミングは、メインウィンドウの表示が
 * 終了した後になります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * サブウィンドウに制御文字を使用したい場合
 *-----------------------------------------------------------------------------
 * サブウィンドウに制御文字を使用したい場合は、スクリプトで表示内容を設定する
 * 必要があります。
 * 
 * 以下のスクリプトコマンドを、文章を表示するイベントコマンドの前に
 * 実行してください。
 * 
 * $gameSubMessage.add(ウィンドウ番号,'表示内容')
 * 
 * ウィンドウ番号
 *    :表示するサブウィンドウに合わせて、以下の数値を指定してください。
 *    :0 - サブウィンドウA
 *    :1 - サブウィンドウB
 * 
 * 表示内容
 *    :表示したい内容を''で囲って入力してください。
 *    :制御文字を使用できますが、制御文字を入力する場合は
 *    :必ずバックスラッシュ(\)を2重にしてください。
 *    :なお、ここで入力した内容を、1行分として表示します。
 * 
 * 
 * 入力例)アイコンID76を、サブウィンドウAに表示させる場合
 * ◆スクリプト：$gameSubMessage.add(0,'これでアイコン\\I[76]を表示します')
 * ◆文章：Actor1(1),ウィンドウ,下
 * ：   ：サブウィンドウでアイコンを表示させます。
 * ：   ：\SUBA[0,ここは2行目です,Actor1,2]
 * ◆
 * この場合、
 * 1.メインウィンドウに「サブウィンドウでアイコンを表示させます。」が表示
 * 2.画面上部にサブウィンドウAが表示
 * 3.サブウィンドウAに
 * 「これでアイコン***を表示します
 * 　ここは2行目です」
 * が表示し、入力待ち
 * ⇒***の部分にアイコンを表示します。
 * 3の結果のように、スクリプトで入力した文章の次の行に、
 * 制御文字で入力した文章を表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * サブウィンドウのサイズを変更したい場合
 *-----------------------------------------------------------------------------
 * サブウィンドウのサイズを変更したい場合は、以下のスクリプトを
 * 文章を表示するイベントコマンドの前に実行してください。
 * 
 * $gameSubMessage.setWindowSize(ウィンドウ番号, ウィンドウ幅, 行数)
 * 
 * ウィンドウ番号
 *    :表示するサブウィンドウに合わせて、以下の数値を指定してください。
 *    :0 - サブウィンドウA
 *    :1 - サブウィンドウB
 * 
 * ウィンドウ幅
 *    :ウィンドウの横幅を、画面サイズと同じ幅を100として百分率で
 *    :指定してください。
 * 
 * 行数
 *    :ウィンドウの高さを、表示できる行数で指定してください。
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
 * v1.0.2 - 2017/04/02 : 機能追加
 *    1. サブウィンドウの表示位置を日本語で指定できる機能を追加。
 *    2. サブウィンドウ表示用の制御文字を追加。
 * 
 * v1.0.1 - 2017/03/30 : ヘルプ修正
 * 
 * v1.0.0 - 2017/03/28 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================



//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EMW.parameters = PluginManager.parameters('FTKR_ExMessageWindow');

//=============================================================================
// DataManager
//=============================================================================

FTKR.EMW.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    FTKR.EMW.DataManager_createGameObjects.call(this);
    $gameSubMessage = new Game_SubMessage();
};

//=============================================================================
// Game_SubMessage
//=============================================================================

function Game_SubMessage() {
    this.initialize.apply(this, arguments);
}

Game_SubMessage.prototype.initialize = function() {
    this.initMembers();
};

Game_SubMessage.prototype.initMembers = function() {
    this._texts = [[],[]];
    this._faceName = ['',''];
    this._faceIndex = [0,0];
    this._background = [0,0];
    this._positionType = [0,1];
    this._scrollMode = [false,false];
    this._scrollSpeed = [2,2];
    this._scrollNoFast = [false,false];
    this._windowWidthRate = [100,100];
    this._windowHeightLines = [4,4];
};

Game_SubMessage.prototype.clear = function(index) {
    this._texts[index] = [];
    this._faceName[index] = '';
    this._faceIndex[index] = 0;
    this._background[index] = 0;
    this._positionType[index] = 0;
    this._scrollMode[index] = false;
    this._scrollSpeed[index] = 2;
    this._scrollNoFast[index] = false;
    this._windowWidthRate[index] = 100;
    this._windowHeightLines[index] = 4;
};

Game_SubMessage.prototype.faceName = function(index) {
    index = index || 0;
    return this._faceName[index];
};

Game_SubMessage.prototype.faceIndex = function(index) {
    index = index || 0;
    return this._faceIndex[index];
};

Game_SubMessage.prototype.background = function(index) {
    index = index || 0;
    return this._background[index];
};

Game_SubMessage.prototype.positionType = function(index) {
    index = index || 0;
    return this._positionType[index];
};

Game_SubMessage.prototype.scrollMode = function(index) {
    index = index || 0;
    return this._scrollMode[index];
};

Game_SubMessage.prototype.scrollSpeed = function(index) {
    index = index || 0;
    return this._scrollSpeed[index];
};

Game_SubMessage.prototype.scrollNoFast = function(index) {
    index = index || 0;
    return this._scrollNoFast[index];
};

Game_SubMessage.prototype.windowWidthRate = function(index) {
    index = index || 0;
    return this._windowWidthRate[index];
};

Game_SubMessage.prototype.windowHeightLines = function(index) {
    index = index || 0;
    return this._windowHeightLines[index];
};

Game_SubMessage.prototype.add = function(index, text) {
    this._texts[index].push(text);
};

Game_SubMessage.prototype.setFaceImage = function(index, faceName, faceIndex) {
    this._faceName[index] = faceName;
    this._faceIndex[index] = faceIndex;
};

Game_SubMessage.prototype.setBackground = function(index, background) {
    this._background[index] = background;
};

Game_SubMessage.prototype.setPositionType = function(index, positionType) {
    this._positionType[index] = positionType;
};

Game_SubMessage.prototype.setScroll = function(index, speed, noFast) {
    this._scrollMode[index] = true;
    this._scrollSpeed[index] = speed;
    this._scrollNoFast[index] = noFast;
};

Game_SubMessage.prototype.hasText = function(index) {
    index = index || 0;
    return this._texts[index].length > 0;
};

Game_SubMessage.prototype.isBusy = function(index) {
    return (this.hasText(index));
};

Game_SubMessage.prototype.newPage = function(index) {
    index = index || 0;
    if (this._texts[index].length > 0) {
        this._texts[index][this._texts.length - 1] += '\f';
    }
};

Game_SubMessage.prototype.allText = function(index) {
    index = index || 0;
    return this._texts[index].reduce(function(previousValue, currentValue) {
        return previousValue + '\n' + currentValue;
    });
};

Game_SubMessage.prototype.setWindowSize = function(index, widthRate, heightLines) {
    this._windowWidthRate[index] = widthRate;
    this._windowHeightLines[index] = heightLines;
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.obtainEscapeEmwParam = function(textState) {
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

//=============================================================================
// Window_Message
//=============================================================================

FTKR.EMW.Window_Message_subWindows = Window_Message.prototype.subWindows;
Window_Message.prototype.subWindows = function() {
    return FTKR.EMW.Window_Message_subWindows.call(this).concat([this._subMessageWindow1, this._subMessageWindow2]);
};

FTKR.EMW.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    FTKR.EMW.Window_Message_createSubWindows.call(this);
    this._subMessageWindow1 = new Window_SubMessage(this, 0);
    this._subMessageWindow2 = new Window_SubMessage(this, 1);
};

FTKR.EMW.Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
Window_Message.prototype.isAnySubWindowActive = function() {
    return (FTKR.EMW.Window_Message_isAnySubWindowActive.call(this) ||
            this._subMessageWindow1.active || this._subMessageWindow2.active);
};

FTKR.EMW.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'SUBA':
        this._subMessageWindow1.startMessage(this.obtainEscapeEmwParam(textState));
        break;
    case 'SUBB':
        this._subMessageWindow2.startMessage(this.obtainEscapeEmwParam(textState));
        break;
    case 'SUBW':
        var params = this.obtainEscapeEmwParam(textState);
        var window = !params[0] ? this._subMessageWindow1 : this._subMessageWindow2;
        window.setBackground(params[2]);
        window.startMessage([params[3],params[4],params[1]]);
        break;
    default:
        FTKR.EMW.Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
};

FTKR.EMW.Window_Base_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    FTKR.EMW.Window_Base_terminateMessage.call(this);
    if(this._subMessageWindow1) this._subMessageWindow1.terminateMessage();
    if(this._subMessageWindow2) this._subMessageWindow2.terminateMessage();
};

//=============================================================================
// Window_SubMessage
//=============================================================================

function Window_SubMessage() {
    this.initialize.apply(this, arguments);
}

Window_SubMessage.prototype = Object.create(Window_Message.prototype);
Window_SubMessage.prototype.constructor = Window_SubMessage;

Window_SubMessage.prototype.initialize = function(messageWindow, index) {
    this._messageWindow = messageWindow;
    this._index = index || 0;
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    Window_Base.prototype.initialize.call(this, x, 0, width, height);
    this.openness = 0;
    this.initMembers();
    this.updatePlacement();
    this.deactivate();
};

Window_SubMessage.prototype.initMembers = function() {
    Window_Message.prototype.initMembers.call(this);
    this._positionX = 1;
};

Window_SubMessage.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            if(!this.active) break;
            this.startMessage();
        } else {
            return;
        }
    }
};

Window_SubMessage.prototype.canStart = function() {
    return $gameSubMessage.hasText(this._index) && !$gameSubMessage.scrollMode(this._index);
};

Window_SubMessage.prototype.startMessage = function(args) {
    if(args) {
        this.setPositionX(args[0].replace(' ',''));
        $gameSubMessage.setPositionType(this._index, this.convertPositionType(args[0]));
        if(args[1] && args[1].match(/^[ ]*(.+)/)) $gameSubMessage.add(this._index, RegExp.$1);
        if(args[2] && !/^[ ]*なし/.test(args[2])) {
            if (args[2].match(/^[ ]*(.+)\((\d+)\)/)) {
                var faceName = RegExp.$1;
                var faceIndex = Number(RegExp.$2);
            } else {
                var faceName = args[2].replace(' ','');
                var faceIndex = Number(args[3]) || 0;
            }
            $gameSubMessage.setFaceImage(this._index, faceName, faceIndex);
        }
    }
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameSubMessage.allText(this._index));
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this.activate();
};

Window_SubMessage.prototype.convertPositionType = function(arg) {
    switch (arg) {
        case 0:
        case '上':
            return 0;
        case 1:
        case '中':
            return 1;
        case 2:
        case '下':
            return 2;
        default:
            return this._positionType;
    }
};

Window_SubMessage.prototype.convertPositionX = function(arg) {
    if (/左/.test(arg)) {
        arg.replace(/左/, '');
        return 0;
    } else if (/右/.test(arg)) {
        arg.replace(/右/, '');
        return 2;
    }
    return 1;
};

Window_SubMessage.prototype.setPositionX = function(arg) {
    this._positionX = this.convertPositionX(arg);
};

Window_SubMessage.prototype.setBackground = function(arg) {
    if (arg.match(/^[ ]*(.+)/)) {
        var type = RegExp.$1;
        $gameSubMessage.setBackground(this._index, this.convertBackgroundType(type));
    }
};

Window_SubMessage.prototype.convertBackgroundType = function(arg) {
    switch (arg) {
        case 1:
        case '暗くする':
            return 1;
        case 2:
        case '透明':
            return 2;
        case 'ウィンドウ':
        case 0:
        default:
            return 0;
    }
};

Window_SubMessage.prototype.updatePlacement = function() {
    this._positionType = $gameSubMessage.positionType(this._index);
    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
    this.width = Graphics.boxWidth * $gameSubMessage.windowWidthRate(this._index) / 100;
    this.height = this.fittingHeight($gameSubMessage.windowHeightLines(this._index));
    this.x = this._positionX * (Graphics.boxWidth - this.width) / 2;
};

Window_SubMessage.prototype.updateBackground = function() {
    this._background = $gameSubMessage.background(this._index);
    this.setBackgroundType(this._background);
};

Window_SubMessage.prototype.terminateMessage = function() {
    this.deactivate();
    this._messageWindow.activate();
    this.close();
    $gameSubMessage.clear(this._index);
};

Window_SubMessage.prototype.updateInput = function() {
    if (this.pause) {
        if (this.isTriggered()) {
            Input.update();
            this.pause = false;
            if (!this._textState) {
                if (!this._messageWindow._textState) {
                    this.terminateMessage();
                } else {
                    this.deactivate();
                    this._messageWindow.activate();
                }
            }
        }
        return true;
    }
    return false;
};

Window_SubMessage.prototype.doesContinue = function() {
    return ($gameSubMessage.hasText(this._index) && !$gameSubMessage.scrollMode(this._index) &&
            !this.areSettingsChanged());
};

Window_SubMessage.prototype.areSettingsChanged = function() {
    return (this._background !== $gameSubMessage.background(this._index) ||
            this._positionType !== $gameSubMessage.positionType(this._index));
};

Window_SubMessage.prototype.loadMessageFace = function() {
    this._faceBitmap = ImageManager.loadFace($gameSubMessage.faceName(this._index));
};

Window_SubMessage.prototype.drawMessageFace = function() {
    this.drawFace($gameSubMessage.faceName(this._index), $gameSubMessage.faceIndex(this._index), 0, 0);
};

Window_SubMessage.prototype.newLineX = function() {
    return $gameSubMessage.faceName(this._index) === '' ? 0 : 168;
};
