//=============================================================================
// 戦闘画面にエネミーのパラメータを表示するプラグイン
// FTKR_DisplayEnemyParameters.js
// プラグインNo : 82
// 作成者     : フトコロ
// 作成日     : 2018/04/17
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DEP = true;

var FTKR = FTKR || {};
FTKR.DEP = FTKR.DEP || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 戦闘画面にエネミーのパラメータを表示するプラグイン
 * @author フトコロ
 *
 * @param Display Enemy Name
 * @desc エネミーの名前を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param Display Enemy HP
 * @desc エネミーのHPを表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param Display Enemy MP
 * @desc エネミーのMPを表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param Display Enemy TP
 * @desc エネミーのTPを表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param Display Width
 * @desc ステータスの表示幅を指定する
 * @type number
 * @default 144
 *
 * @param Display Line Height
 * @desc ステータスの１行の表示高さを指定する
 * @type number
 * @default 36
 *
 * @param Display Font Size
 * @desc ステータスのフォントサイズを指定する
 * @type number
 * @default 28
 *
 * @param Display Offset X
 * @desc ステータスとエネミー画像の表示位置のX座標の差（負の値で左にずれる）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param Display Offset Y
 * @desc ステータスとエネミー画像の表示位置のY座標の差（負の値で上にずれる）
 * @type number
 * @min -9999
 * @max 9999
 * @default -40
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 戦闘画面で、エネミーの頭上に以下のパラメータを表示します。
 * ・名前
 * ・HP
 * ・MP
 * ・TP
 * 
 * これらのパラメータは、プラグインパラメータで表示のON/OFFを切り替えられます。
 * また、表示位置やサイズなども変更可能です。
 * 
 * 
 * なお、これらのパラメータはエネミー画像の表示位置に合わせているため、
 * エネミーが動くと、それに合わせてパラメータの表示位置も変わります。
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
 * v1.0.0 - 2018/04/17 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    }

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
    var parameters = PluginManager.parameters('FTKR_DisplayEnemyParameters');

    FTKR.DEP = {
        enable : {
            name : paramParse(parameters['Display Enemy Name']) || false,
            hp   : paramParse(parameters['Display Enemy HP']) || false,
            mp   : paramParse(parameters['Display Enemy MP']) || false,
            tp   : paramParse(parameters['Display Enemy TP']) || false,
        },
        width      : paramParse(parameters['Display Widht']) || 144,
        lineHeight : paramParse(parameters['Display Line Height']) || 36,
        fontSize   : paramParse(parameters['Display Font Size']) || 28,
        offsetX    : paramParse(parameters['Display Offset X']) || 0,
        offsetY    : paramParse(parameters['Display Offset Y']) || 0,
    };

    //=============================================================================
    // Sprite_Enemy
    //=============================================================================
    var _DEP_Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _DEP_Sprite_Enemy_initMembers.call(this);
        this.createBattleStatusSprite();
    };

    Sprite_Enemy.prototype.createBattleStatusSprite = function() {
        this._battleStatusSprite = new Sprite_BattleStatus();
        this.addChild(this._battleStatusSprite);
    };

    var _DEP_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        _DEP_Sprite_Enemy_setBattler.call(this, battler);
        this._battleStatusSprite.setup(battler);
    };

    var _DEP_Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _DEP_Sprite_Enemy_update.call(this);
        if (this._enemy) {
            this.updateStatusSprite();
        }
    };

    Sprite_Enemy.prototype.updateStatusSprite = function() {
        var y = FTKR.DEP.offsetY;
        this._battleStatusSprite.y = -this.bitmap.height +y - this._battleStatusSprite.bitmap.height/2;
    };

    //=============================================================================
    // Sprite_BattleStatus
    //=============================================================================

    function Sprite_BattleStatus() {
        this.initialize.apply(this, arguments);
    }

    Sprite_BattleStatus.prototype = Object.create(Sprite.prototype);
    Sprite_BattleStatus.prototype.constructor = Sprite_BattleStatus;

    Sprite_BattleStatus.prototype.initialize = function() {
        this.loadWindowskin();
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.setupBitmap();
        this.update();
    };

    Sprite_BattleStatus.prototype.setupBitmap = function() {
        var width = FTKR.DEP.width;
        var line = 0;
        if (FTKR.DEP.enable.name) line++;
        if (FTKR.DEP.enable.hp) line++;
        if (FTKR.DEP.enable.mp) line++;
        if (FTKR.DEP.enable.tp) line++;
        var height = line * this.lineHeight();
        this.bitmap = new Bitmap(width, height);
        this.bitmap.fontSize = this.standardFontSize();
        this.x = FTKR.DEP.offsetX;
    };

    Sprite_BattleStatus.prototype.standardFontSize = function() {
        return FTKR.DEP.fontSize;
    };

    Sprite_BattleStatus.prototype.lineHeight = function() {
        return FTKR.DEP.lineHeight;
    };

    Sprite_BattleStatus.prototype.initMembers = function() {
        this._battler = null;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._hp = 0;
        this._mp = 0;
        this._tp = 0;
    };

    Sprite_BattleStatus.prototype.setup = function(battler) {
        this._battler = battler;
    };

    Sprite_BattleStatus.prototype.setupPosition = function(x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
    };

    Sprite_BattleStatus.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateStatus();
    };

    Sprite_BattleStatus.prototype.updateStatus = function() {
        if (this._battler && this._battler.isAlive()) {
            if (this.isChangedStatus()) {
                this.bitmap.clear();
                var i = 0;
                var h = this.lineHeight();
                var w = this.bitmap.width;
                this._hp = this._battler.hp;
                this._mp = this._battler.mp;
                this._tp = this._battler.tp;
                if (FTKR.DEP.enable.name) {
                    this.drawText(this._battler.name(), 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enable.hp) {
                    this.drawBattlerHp(this._battler, 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enable.mp) {
                    this.drawBattlerMp(this._battler, 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enable.tp) {
                    this.drawBattlerTp(this._battler, 0, h*i, w);
                }
            }
        }
    };

    Sprite_BattleStatus.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem('Window');
    };

    Sprite_BattleStatus.prototype.isChangedStatus = function() {
        return this._battler && 
          (this._hp !== this._battler.hp || this._mp !== this._battler.mp || this._tp !== this._battler.tp);
    };

    Sprite_BattleStatus.prototype.textColor = function(n) {
        var px = 96 + (n % 8) * 12 + 6;
        var py = 144 + Math.floor(n / 8) * 12 + 6;
        return this.windowskin.getPixel(px, py);
    };

    Sprite_BattleStatus.prototype.normalColor = function() {
        return this.textColor(0);
    };

    Sprite_BattleStatus.prototype.systemColor = function() {
        return this.textColor(16);
    };

    Sprite_BattleStatus.prototype.crisisColor = function() {
        return this.textColor(17);
    };

    Sprite_BattleStatus.prototype.deathColor = function() {
        return this.textColor(18);
    };

    Sprite_BattleStatus.prototype.gaugeBackColor = function() {
        return this.textColor(19);
    };

    Sprite_BattleStatus.prototype.hpGaugeColor1 = function() {
        return this.textColor(20);
    };

    Sprite_BattleStatus.prototype.hpGaugeColor2 = function() {
        return this.textColor(21);
    };

    Sprite_BattleStatus.prototype.mpGaugeColor1 = function() {
        return this.textColor(22);
    };

    Sprite_BattleStatus.prototype.mpGaugeColor2 = function() {
        return this.textColor(23);
    };

    Sprite_BattleStatus.prototype.tpGaugeColor1 = function() {
        return this.textColor(28);
    };

    Sprite_BattleStatus.prototype.tpGaugeColor2 = function() {
        return this.textColor(29);
    };

    Sprite_BattleStatus.prototype.changeTextColor = function(color) {
        this.bitmap.textColor = color;
    };

    Sprite_BattleStatus.prototype.drawText = function(text, x, y, maxWidth, align) {
        this.bitmap.drawText(text, x, y, maxWidth, this.lineHeight(), align);
    };

    Sprite_BattleStatus.prototype.textWidth = function(text) {
        return this.bitmap.measureTextWidth(text);
    };

    Sprite_BattleStatus.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        var fillW = Math.floor(width * rate);
        var gaugeY = y + this.lineHeight() - 8;
        this.bitmap.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
        this.bitmap.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };

    Sprite_BattleStatus.prototype.hpColor = function(actor) {
        if (actor.isDead()) {
            return this.deathColor();
        } else if (actor.isDying()) {
            return this.crisisColor();
        } else {
            return this.normalColor();
        }
    };

    Sprite_BattleStatus.prototype.mpColor = function(actor) {
        return this.normalColor();
    };

    Sprite_BattleStatus.prototype.tpColor = function(actor) {
        return this.normalColor();
    };

    Sprite_BattleStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                      width, color1, color2) {
        var labelWidth = this.textWidth('HP');
        var valueWidth = this.textWidth('0000');
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    Sprite_BattleStatus.prototype.drawBattlerHp = function(battler, x, y, width) {
        width = width || 144;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, battler.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(battler.hp, battler.mhp, x, y, width,
                              this.hpColor(battler), this.normalColor());
    };

    Sprite_BattleStatus.prototype.drawBattlerMp = function(battler, x, y, width) {
        width = width || 144;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, battler.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(battler.mp, battler.mmp, x, y, width,
                              this.mpColor(battler), this.normalColor());
    };

    Sprite_BattleStatus.prototype.drawBattlerTp = function(battler, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, battler.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(battler));
        this.drawText(battler.tp, x + width - 64, y, 64, 'right');
    };

}());//EOF
