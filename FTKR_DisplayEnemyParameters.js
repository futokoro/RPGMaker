//=============================================================================
// 戦闘画面にエネミーのパラメータを表示するプラグイン
// FTKR_DisplayEnemyParameters.js
// プラグインNo : 82
// 作成者     : フトコロ
// 作成日     : 2018/04/17
// 最終更新日 : 2018/12/20
// バージョン : v1.1.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DEP = true;

var FTKR = FTKR || {};
FTKR.DEP = FTKR.DEP || {};

//=============================================================================
/*:
 * @plugindesc v1.1.1 戦闘画面にエネミーのパラメータを表示するプラグイン
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
 * 空欄の場合は無効になります
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
 *
 * @param Display Enemy MP
 * @desc エネミーのMPを表示する
 * 空欄の場合は無効になります
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
 *
 * @param Display Enemy TP
 * @desc エネミーのTPを表示する
 * 空欄の場合は無効になります
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
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
 * 表示位置とサイズは、エネミーのメモ欄で個別に設定可能です。
 * 
 *  <FTKR_STATUS_POS_X: x>
 *      x : 表示位置のX座標の差（負の値で左にずれる）
 * 
 *  <FTKR_STATUS_POS_Y: y>
 *      y : 表示位置のY座標の差（負の値で上にずれる）
 * 
 *  <FTKR_STATUS_WIDTH: w>
 *      w : ステータスの表示幅
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
 * v1.1.1 - 2018/12/20 : 不具合修正
 *    1. プラグインパラメータ Display Width が正しく反映されない不具合を修正。
 * 
 * v1.1.0 - 2018/12/19 : 機能追加
 *    1. エネミーごとにステータスの表示位置と表示幅を設定する機能を追加。
 *    2. パラメータのラベル、数値、ゲージの表示ON/OFF機能追加。
 * 
 * v1.0.0 - 2018/04/17 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~gauge:
 * 
 * @param label
 * @desc パラメータの数値を表示します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param value
 * @desc パラメータの数値を表示します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param gauge
 * @desc パラメータのゲージを表示します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
*/

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

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '[ ]*:[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_DisplayEnemyParameters');

    FTKR.DEP = {
        enemyName  : paramParse(parameters['Display Enemy Name']) || false,
        enemyHp    : paramParse(parameters['Display Enemy HP']) || null,
        enemyMp    : paramParse(parameters['Display Enemy MP']) || null,
        enemyTp    : paramParse(parameters['Display Enemy TP']) || null,
        width      : paramParse(parameters['Display Width']) || 144,
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
        this.setupStatusSprite(battler);
    };

    Sprite_Enemy.prototype.setupStatusSprite = function(battler) {
        var offsetX = readObjectMeta(battler.enemy(), ['FTKR_STATUS_POS_X']);
        var offsetY = readObjectMeta(battler.enemy(), ['FTKR_STATUS_POS_Y']);
        var swidth  = readObjectMeta(battler.enemy(), ['FTKR_STATUS_WIDTH']);
        this._battleStatusSpriteOffsetY = offsetY ? +offsetY : FTKR.DEP.offsetY;
        offsetX = offsetX ? +offsetX : FTKR.DEP.offsetX;
        swidth = swidth ? +swidth : FTKR.DEP.width;
        this._battleStatusSprite.setup(battler, offsetX, swidth);
    };

    var _DEP_Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _DEP_Sprite_Enemy_update.call(this);
        if (this._enemy) {
            this.updateStatusSprite();
        }
    };

    Sprite_Enemy.prototype.updateStatusSprite = function() {
        var y = this._battleStatusSpriteOffsetY;
        this._battleStatusSprite.y = -this.bitmap.height + y - this._battleStatusSprite.bitmap.height/2;
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
    };

    Sprite_BattleStatus.prototype.initMembers = function() {
        this._battler = null;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._hp = 0;
        this._mp = 0;
        this._tp = 0;
    };

    Sprite_BattleStatus.prototype.setup = function(battler, x, width) {
        this._battler = battler;
        this.setupBitmap(x, width);
        this.update();
    };

    Sprite_BattleStatus.prototype.standardFontSize = function() {
        return FTKR.DEP.fontSize;
    };

    Sprite_BattleStatus.prototype.lineHeight = function() {
        return FTKR.DEP.lineHeight;
    };

    Sprite_BattleStatus.prototype.setupBitmap = function(x, width) {
        width = width ? +width : FTKR.DEP.width;
        var line = 0;
        if (FTKR.DEP.enemyName) line++;
        if (FTKR.DEP.enemyHp) line++;
        if (FTKR.DEP.enemyMp) line++;
        if (FTKR.DEP.enemyTp) line++;
        var height = line * this.lineHeight();
        this.bitmap = new Bitmap(width, height);
        this.bitmap.fontSize = this.standardFontSize();
        this.x = x ? +x : FTKR.DEP.offsetX;
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
                if (FTKR.DEP.enemyName) {
                    this.drawText(this._battler.name(), 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enemyHp) {
                    this.drawBattlerHp(this._battler, 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enemyMp) {
                    this.drawBattlerMp(this._battler, 0, h*i, w);
                    i++;
                }
                if (FTKR.DEP.enemyTp) {
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
        if(FTKR.DEP.enemyHp.gauge) this.drawGauge(x, y, width, battler.hpRate(), color1, color2);
        if(FTKR.DEP.enemyHp.label) {
            this.drawText(TextManager.hpA, x, y, 44);
            this.changeTextColor(this.systemColor());
        }
        if(FTKR.DEP.enemyHp.value) this.drawCurrentAndMax(battler.hp, battler.mhp, x, y, width,
                              this.hpColor(battler), this.normalColor());
    };

    Sprite_BattleStatus.prototype.drawBattlerMp = function(battler, x, y, width) {
        width = width || 144;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        if(FTKR.DEP.enemyMp.gauge) this.drawGauge(x, y, width, battler.mpRate(), color1, color2);
        if(FTKR.DEP.enemyMp.label) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.mpA, x, y, 44);
        }
        if(FTKR.DEP.enemyMp.value) this.drawCurrentAndMax(battler.mp, battler.mmp, x, y, width,
                              this.mpColor(battler), this.normalColor());
    };

    Sprite_BattleStatus.prototype.drawBattlerTp = function(battler, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        if(FTKR.DEP.enemyTp.gauge) this.drawGauge(x, y, width, battler.tpRate(), color1, color2);
        if(FTKR.DEP.enemyTp.label) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.tpA, x, y, 44);
        }
        if(FTKR.DEP.enemyTp.value) {
            this.changeTextColor(this.tpColor(battler));
            this.drawText(battler.tp, x + width - 64, y, 64, 'right');
        }
    };

}());//EOF
