//=============================================================================
// ピクチャにフキダシアイコンを表示させるプラグイン
// FTKR_ShowPictureBalloon.js
// プラグインNo : 72
// 作成者     : フトコロ
// 作成日     : 2018/03/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SPB = true;

var FTKR = FTKR || {};
FTKR.SPB = FTKR.SPB || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 ピクチャにフキダシアイコンを表示させるプラグイン
 * @author フトコロ
 *
 * @param フキダシアイコン設定
 * @desc フキダシアイコンを設定します。
 * @type struct<balloon>
 * @default {"iconImage":"Balloon","width":"48","height":"48","speed":"8","waitTime":"12"}
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ピクチャーを指定してフキダシアイコンを表示させることができます。
 * ピクチャとフキダシアイコンが重なった場合は、フキダシアイコンが上に表示されます。
 * 
 * 以下のプラグインコマンドで表示できます。
 * ※[]は実際の入力に使用しません
 * 
 * SPB_フキダシアイコンの表示 [ピクチャID] [フキダシアイコンID] [表示位置X] [表示位置Y] [ウェイト]
 * 
 *    ピクチャID
 *      ：フキダシアイコンを表示させたいピクチャIDを指定します。
 *      　\v[n]で変数を指定することも可能です。
 * 
 *    フキダシアイコンID
 *      ：表示させるフキダシアイコンを番号で指定します。
 *      　フキダシアイコンに設定した画像内の上から1,2,3,...と数えます。
 *      　\v[n]で変数を指定することも可能です。
 * 
 *      　なお、デフォルトのBalloon.pngを指定している場合は、以下の文字列でも設定できます。
 *      　　1  - びっくり
 *      　　2  - はてな
 *      　　3  - 音符
 *      　　4  - ハート
 *      　　5  - 怒り
 *      　　6  - 汗
 *      　　7  - くしゃくしゃ
 *      　　8  - 沈黙
 *      　　9  - 汗
 *      　　10 - Zzz
 *      　　11 ~ 15 - ユーザー定義1 ~ ユーザー定義5
 *      　　※ユーザー定義の番号は半角です。
 * 
 *    表示位置X
 *    表示位置Y
 *      ：ピクチャに対して、フキダシアイコンを表示する位置を
 *      　ピクチャサイズに対する比率で指定します。
 *      　ピクチャ左上が原点です。
 *      　入力例）
 *      　x   y   
 *      　0   0   - 原点に表示
 *      　0.5 0.5 - ピクチャの中心に表示
 *      　1   1   - ピクチャの右下に表示
 *      　1   0   - ピクチャの右上に表示
 * 
 *    ウェイト
 *      ：完了までウェイトさせるか指定します。
 *      　ウェイトさせる場合は、true と記入してください。
 *      　ウェイトさせない場合は、記入不要です。
 * 
 * 
 * コマンド設定例）･･･デフォルトアイコン画像を使用している場合
 * 
 * ◆プラグインコマンド：SPB_フキダシアイコンの表示 1 びっくり 0.5 0 true
 * 
 *    ピクチャID1 に びっくりアイコン をピクチャの上部中央に表示します。
 *    完了までウェイトが掛かります。
 * 
 * 
 * コマンド設定例）･･･独自アイコン画像を使用している場合
 * 
 * ◆プラグインコマンド：SPB_フキダシアイコンの表示 1 2 0.5 0
 * 
 *    ピクチャID1 に 2列目のアイコン をピクチャの上部中央に表示します。
 *    ウェイトが掛からないため、即座に次のイベントコマンド実行に移ります。
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
 * フキダシアイコンの設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータで以下の設定を変更できます。
 * 
 * １．使用する画像
 *    iconImage
 *    ：使用する画像を選択してください。
 *    　画像ファイルはimg/systemフォルダに保存します。
 *    　アイコンサイズは自由ですが、以下の仕様を守ってください。
 *      １）一つのフキダシアイコンは横１列にまとめてください。
 *    　２）アイコンサイズは統一してください。
 *    　３）アイコンのアニメーション枚数は、デフォルトと同じ８枚です。
 * 
 * ２．サイズ
 *    width
 *    ：フキダシアイコンの１つ分の幅を設定します。
 *    　大きなアイコンを独自に作成した場合は、そのサイズに合わせて変更してください。
 * 
 *    height
 *    ：フキダシアイコンの１つ分の高さを設定します。
 *    　大きなアイコンを独自に作成した場合は、そのサイズに合わせて変更してください。
 * 
 * ３．１コマの表示時間
 *    speed
 *    ：フキダシアイコンの１コマの表示時間を設定します。
 * 
 * ４．表示後のウェイト
 *    waitTime
 *    ：フキダシアイコンの表示後のウェイト時間を設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
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
 * v1.0.0 - 2018/03/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~balloon:
 * @param iconImage
 * @desc 使用するフキダシアイコン画像ファイルを設定します。
 * 画像ファイルは/img/systemに保存すること
 * @default Balloon
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param width
 * @desc フキダシアイコンの幅を設定します。
 * @default 48
 * @type number
 * 
 * @param height
 * @desc フキダシアイコンの高さを設定します。
 * @default 48
 * @type number
 *
 * @param speed
 * @desc フキダシアイコンの１コマの表示時間を設定します。
 * @default 8
 * @type number
 *
 * @param waitTime
 * @desc フキダシアイコンの表示後のウェイト時間を設定します。
 * @default 12
 * @type number
 *
*/

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

    var convertBalloonIconName = function(name) {
        name = setArgStr(name);
        if (!isNaN(name)) return Number(name);
        name = name + '';
        switch(name.toUpperCase()) {
            case 'びっくり':
                return 1;
            case 'はてな':
                return 2;
            case '音符':
                return 3;
            case 'ハート':
                return 4;
            case '怒り':
                return 5;
            case '汗':
                return 6;
            case 'くしゃくしゃ':
                return 7;
            case '沈黙':
                return 8;
            case '汗':
                return 9;
            case 'Zzz':
                return 10;
            case 'ユーザー定義1':
                return 11;
            case 'ユーザー定義2':
                return 12;
            case 'ユーザー定義3':
                return 13;
            case 'ユーザー定義4':
                return 14;
            case 'ユーザー定義5':
                return 15;
            default:
                return 0;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ShowPictureBalloon');

    FTKR.SPB.balloon = paramParse(parameters['フキダシアイコン設定']);

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _SPB_Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _SPB_Game_Interpreter_clear.call(this);
        this._picture = null;
    };

    var _SPB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _SPB_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/SPB_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'フキダシアイコンの表示':
                this.setupPictureBalloon(args);
                break;
        }
    };

    Game_Interpreter.prototype.setupPictureBalloon = function(args) {
        this._picture = $gameScreen.picture(setArgNum(args[0]));
        if (this._picture) {
            this._picture.requestBalloon(convertBalloonIconName(args[1]),
                setArgNum(args[2]), setArgNum(args[3]));
            if (Boolean(args[4])) {
                this.setWaitMode('pictureBalloon');
            }
        }
        return true;
    };

    var _SPB_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = false;
        switch (this._waitMode) {
            case 'pictureBalloon':
                waiting = this._picture.isBalloonPlaying();
                break;
        }
        if (waiting) return waiting;
        return _SPB_Game_Interpreter_updateWaitMode.call(this);
    };

    //=============================================================================
    // Game_Picture
    //=============================================================================
    Game_Picture.prototype.requestBalloon = function(balloonId, anchorX, anchorY) {
        this._balloonId = balloonId;
        this._balloonAnchorX = anchorX || 0;
        this._balloonAnchorY = anchorY || 0;
    };

    Game_Picture.prototype.balloonId = function() {
        return this._balloonId;
    };

    Game_Picture.prototype.balloonAnchorX = function() {
        return this._balloonAnchorX;
    };

    Game_Picture.prototype.balloonAnchorY = function() {
        return this._balloonAnchorY;
    };

    Game_Picture.prototype.startBalloon = function() {
        this._balloonId = 0;
        this._balloonPlaying = true;
    };

    Game_Picture.prototype.isBalloonPlaying = function() {
        return this._balloonId > 0 || this._balloonPlaying;
    };

    Game_Picture.prototype.endBalloon = function() {
        this._balloonPlaying = false;
        this._balloonId = 0;
    };

    //=============================================================================
    // Sprite_Picture
    //=============================================================================

    var _SPB_Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function(pictureId) {
        _SPB_Sprite_Picture_initialize.call(this, pictureId);
        this._balloonDuration = 0;
    };

    var _SPB_Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
    Sprite_Picture.prototype.updatePosition = function() {
        _SPB_Sprite_Picture_updatePosition.call(this);
        this.updateBalloon();
    };

    Sprite_Picture.prototype.setupBalloon = function() {
        if (!!this.picture() && this.picture().balloonId() > 0) {
            this.startBalloon();
            this.picture().startBalloon();
        }
    };

    Sprite_Picture.prototype.startBalloon = function() {
        if (!this._balloonSprite) {
            this._balloonSprite = new Sprite_PictureBalloon();
        }
        this._balloonSprite.setup(this.picture().balloonId());
        this.parent.addChild(this._balloonSprite);
    };

    Sprite_Picture.prototype.updateBalloon = function() {
        this.setupBalloon();
        if (this._balloonSprite) {
            this._balloonSprite.x = this.x + this.width * this.picture().balloonAnchorX();
            this._balloonSprite.y = this.y + this.height * this.picture().balloonAnchorY();
            if (!this._balloonSprite.isPlaying()) {
                this.endBalloon();
            }
        }
    };

    Sprite_Picture.prototype.endBalloon = function() {
        if (this._balloonSprite) {
            this.picture().endBalloon();
            this.parent.removeChild(this._balloonSprite);
            this._balloonSprite = null;
        }
    };

    Sprite_Picture.prototype.isBalloonPlaying = function() {
        return !!this._balloonSprite;
    };
    
    //=============================================================================
    // Sprite_PictureBalloon
    //=============================================================================

    function Sprite_PictureBalloon() {
        this.initialize.apply(this, arguments);
    }

    Sprite_PictureBalloon.prototype = Object.create(Sprite_Balloon.prototype);
    Sprite_PictureBalloon.prototype.constructor = Sprite_PictureBalloon;

    Sprite_PictureBalloon.prototype.loadBitmap = function() {
        this.bitmap = ImageManager.loadSystem(FTKR.SPB.balloon.iconImage);
        this.setFrame(0, 0, 0, 0);
    };

    Sprite_PictureBalloon.prototype.updateFrame = function() {
        var w = this.frameWidth();
        var h = this.frameHeight();
        var sx = this.frameIndex() * w;
        var sy = (this._balloonId - 1) * h;
        this.setFrame(sx, sy, w, h);
    };

    Sprite_PictureBalloon.prototype.frameWidth = function() {
        return FTKR.SPB.balloon.width;
    };

    Sprite_PictureBalloon.prototype.frameHeight = function() {
        return FTKR.SPB.balloon.height;
    };

    Sprite_PictureBalloon.prototype.speed = function() {
        return FTKR.SPB.balloon.speed;
    };

    Sprite_PictureBalloon.prototype.waitTime = function() {
        return FTKR.SPB.balloon.waitTime;
    };

}());//EOF
