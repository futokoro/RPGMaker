//=============================================================================
// フロントビューモードでアクター側にアニメーションを表示するプラグイン
// FTKR_FVActorAnimation.js
// 作成者     : フトコロ
// 作成日     : 2017/11/12
// 最終更新日 : 2017/11/13
// バージョン : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_FAA = true;

var FTKR = FTKR || {};
FTKR.FAA = FTKR.FAA || {};

//=============================================================================
/*:ja
 * @plugindesc v1.0.2 フロントビューモードでアクター側にアニメーションを表示するプラグイン
 * @author フトコロ
 *
 * @param --アニメーション--
 * @desc 
 * 
 * @param アニメーションの表示先
 * @desc アニメーションの表示先を、顔画像かカスタム画像(*1)のどちらかを選択します。(*1)FTKR_CustomSimpleActorStatus.jsが必要
 * @type select
 * @option 表示しない
 * @value 0
 * @option 顔画像
 * @value 1
 * @option カスタム画像
 * @value 2
 * @default 1
 * 
 * @param --ダメージポップアップ--
 * @desc 
 * 
 * @param ポップアップ表示
 * @desc ダメージポップアップを表示するか選択します
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 * @default 1
 * 
 * @param X座標のずれ
 * @desc 画像に対するダメージポップアップ位置のX座標のずれ
 * @default -32
 * 
 * @param Y座標のずれ
 * @desc 画像に対するダメージポップアップ位置のY座標のずれ
 * @default 0
 * 
 * @param 画面揺れ効果
 * @desc ダメージ時の画面揺れ効果の有無を設定します。
 * @type select
 * @option 揺らす
 * @value 1
 * @option 揺らさない
 * @value 0
 * @default 1
 * 
 * @param --選択中のアクターエフェクト--
 * @desc この設定はバトル画面のみ有効です。
 * 
 * @param 色調設定
 * @desc 選択中のアクター画像の色調をデフォルトから設定した色調に交互に変化させます。
 * @type struct<tone>
 * @default {"enable":"0","color":"0,0,0,0","pattern":"6","count":"10"}
 * 
 * @param カーソル設定
 * @desc 選択中のアクターのカーソル表示を設定します。
 * @type select
 * @option カーソル表示あり
 * @value 1
 * @option カーソル表示なし
 * @value 0
 * @default 1
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、フロントビューモードで
 * アクター側にもアニメーションやダメージポップアップを表示します。
 * 
 * 
 * このプラグインは、FTKR_FacialImageDifference.jsと
 * 組み合わせて使用できません。
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 * 2. アニメーションを表示させるためには、バトル画面のアクターの
 *    ステータスウィンドウに、顔画像かカスタム画像(*1)を表示する
 *    必要があります。
 * 
 *    (*1) FTKR_CustomSimpleActorStatus.jsが必要。
 * 
 *    別途プラグインを用いて、画像をウィンドウに表示させてください。
 *    ただし、すべてのプラグインで本機能が必ず使用できるわけではありません。
 * 
 *    なお、FTKR_CustomSimpleActorStatus.jsとFTKR_CSS_BattleStatus.js
 *    または FTKR_CSS_GDM.jsを使って、ステータスウィンドウに
 *    顔画像またはカスタム画像を表示させることができます。
 * 
 * 
 * 3. FTKR_CustomSimpleActorStatus.jsと組み合わせて使用する場合は
 *    「プラグインマネージャー(プラグイン管理)」で、本プラグインが
 *    下になるように追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインの注意点
 *-----------------------------------------------------------------------------
 * 1. アニメーションの設定について
 *    アニメーションの設定で合成方法が「加算」の場合、ステータスウィンドウと
 *    アニメーションが重なって、ウィンドウの色が一部変色したりする場合があります。
 * 
 *    この現象を回避するためには、アニメーションの合成方法を「通常」などに変えるか
 *    ステータスウィンドウの背景を非表示にしてください。
 * 
 * 
 * 2. サイドビューモードでの使用
 *    このプラグインをサイドビューモードで使用すると、アクターのSVキャラに
 *    アニメーションやダメージポップアップが表示しなくなります。
 *    このプラグインは、フロントビューモードでのみ使用してください。
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
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.2 - 2017/11/13 : 不具合修正
 *    1. カスタム画像のID指定が反映されない不具合を修正。
 * 
 * v1.0.1 - 2017/11/13 : 不具合修正、機能追加、ヘルプ修正
 *    1. 顔画像が正しく表示されない不具合を修正。
 *    2. カスタム画像のトリミング設定がない場合にエラーになる不具合を修正。
 *    3. カスタム画像にスケールを設定したときに、画像の表示位置が
 *       ずれる不具合を修正。
 *    4. 選択中のアクターのカーソル表示の有無を設定する機能を追加。
 *    5. 選択中のアクターの画像のトーンを変化させる機能を追加。
 * 
 * v1.0.0 - 2017/11/12 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================
/*~struct~tone:
 * @param enable
 * @desc 色調設定を有効にするか設定します。
 * @type select
 * @option 有効にする
 * @value 1
 * @option 無効にする
 * @value 0
 * @default 0
 * 
 * @param color
 * @desc 色調の設定。「赤,緑,青,グレー」の順にカンマで区切って設定してください。
 * @default 0,0,0,0
 * 
 * @param pattern
 * @desc 設定した色調に何段階で変化させるか設定します。
 * @type number
 * @min 1
 * @default 6
 * 
 * @param count
 * @desc 色調の段階変化の間隔を設定します。
 * @type number
 * @min 1
 * @default 10
 */

function Sprite_ActorFace() {
  this.initialize.apply(this, arguments);
}

function Sprite_ActorImage() {
  this.initialize.apply(this, arguments);
}

function Sprite_FaceAnimation() {
  this.initialize.apply(this, arguments);
}

(function() {

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
    }

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
    var parameters = PluginManager.parameters('FTKR_FVActorAnimation');

    FTKR.FAA = {
        destination :Number(parameters['アニメーションの表示先'] || 0),
        damage : {
            enable  :Number(parameters['ポップアップ表示'] || 0),
            offsetX :Number(parameters['X座標のずれ'] || 0),
            offsetY :Number(parameters['Y座標のずれ'] || 0),
            shake   :Number(parameters['画面揺れ効果'] || 0),
        },
        select : {
            tone    :paramParse(parameters['トーン設定']),
            cursor  :Number(parameters['カーソル設定'] || 0),
        },
    };

    //=============================================================================
    // バトル終了後に、逃走フラグを削除
    //=============================================================================

    var _FAA_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _FAA_Scene_Map_start.call(this);
        BattleManager._escaped = false;
    };

    //=============================================================================
    // フロントビューモードでも、アクター側にダメージエフェクトが発生するように修正
    //=============================================================================

    //書き換え
    Game_Actor.prototype.performDamage = function() {
        Game_Battler.prototype.performDamage.call(this);
        this.requestMotion('damage');
        if (FTKR.FAA.damage.shake) $gameScreen.startShake(5, 5, 10);
        SoundManager.playActorDamage();
    };

    //=============================================================================
    // アクター側のアニメーション表示用レイヤーを追加
    //=============================================================================

    //書き換え
    Window.prototype._createAllParts = function() {
        this._windowSpriteContainer = new PIXI.Container();
        this._windowBackSprite = new Sprite();
        this._windowCursorSprite = new Sprite();
        this._windowFrameSprite = new Sprite();
        this._windowCssSprite = new Sprite(); //追加
        this._windowCssSprite.setFrame(0, 0, Graphics.width, Graphics.height);
        this._windowContentsSprite = new Sprite();
        this._downArrowSprite = new Sprite();
        this._upArrowSprite = new Sprite();
        this._windowPauseSignSprite = new Sprite();
        this._windowBackSprite.bitmap = new Bitmap(1, 1);
        this._windowBackSprite.alpha = 192 / 255;
        this.addChild(this._windowSpriteContainer);
        this._windowSpriteContainer.addChild(this._windowBackSprite);
        this._windowSpriteContainer.addChild(this._windowFrameSprite);
        this.addChild(this._windowCursorSprite);
        this.addChild(this._windowCssSprite); //カーソルとステータスの間に追加
        this.addChild(this._windowContentsSprite);
        this.addChild(this._downArrowSprite);
        this.addChild(this._upArrowSprite);
        this.addChild(this._windowPauseSignSprite);
    };

    //=============================================================================
    // アクターの顔画像表示処理を修正
    //=============================================================================

    var _FAA_Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _FAA_Window_Base_initialize.call(this, x, y, width, height);
        this._faceSprite = [];
    };

    //書き換え
    var _FAA_Window_Base_drawActorFace = Window_Base.prototype.drawActorFace;
    Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
        if (FTKR.FAA.destination !== 1) {
            return _FAA_Window_Base_drawActorFace.call(this, actor, x, y, width, height);
        } else {
            width = width || Window_Base._faceWidth;
            height = height || Window_Base._faceHeight;
            this.drawCssFace(actor, x, y, width, height);
        }
    };

    Window_Base.prototype.showActorNum = function() {
        return this.maxPageItems ? this.maxPageItems() : 1;
    };

    //書き換え
    var _FAA_Window_Base_drawCssFace = Window_Base.prototype.drawCssFace;
    Window_Base.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        if (FTKR.FAA.destination !== 1) {
            return _FAA_Window_Base_drawCssFace.call(this, actor, dx, dy, width, height);
        } else {
            var index = actor.index() % this.showActorNum();
            var sprite = this._faceSprite[index];
            var fh = Window_Base._faceHeight;
            var scale = Imported.FTKR_CSS ? (Math.min(width, height) || fh) / fh : 1;
            if (!sprite) {
                sprite = new Sprite_ActorFace(actor, this);
                this._windowCssSprite.addChild(sprite);
                this._faceSprite[index] = sprite;
            } else if (sprite._actor !== actor){
                sprite.setBattler(actor);
            }
            dx = dx + fh * scale / 2 + this.padding;
            if (Imported.FTKR_CSS) {
                var len = Math.min(width, height);
                var dw = len || Window_Base._faceWidth * scale;
                dx += FTKR.CSS.cssStatus.face.posiX * (width - dw) / 2;
            }
            var sx = dx;
            var sy = dy + height * scale + this.padding;
            sprite.setHome(sx, sy);
            sprite.startEntryMotion();
            sprite.setScale(scale);
        }
    };

    //書き換え
    var _FAA_Window_Base_drawCssImage = Window_Base.prototype.drawCssImage;
    Window_Base.prototype.drawCssImage = function(actor, dx, dy, width, id) {
        if (FTKR.FAA.destination !== 2) {
            return _FAA_Window_Base_drawCssImage.call(this, actor, dx, dy, width, id);
        } else {
            var bgi = actor.actor().cssbgi[id];
            var bitmap = ImageManager.loadPicture(bgi.name);
            if (!bitmap) return 1;
            var index = actor.index() % this.showActorNum();
            var sprite = this._faceSprite[index];
            var fw = bgi.width || bitmap.width;
            var fh = bgi.height || bitmap.height;
            var scale = bgi.scale / 100;
            var dh = fh * scale;
            var dw = fw * scale;
            if (!sprite) {
                sprite = new Sprite_ActorImage(actor, this);
                this._windowCssSprite.addChild(sprite);
                this._faceSprite[index] = sprite;
            } else if (sprite._actor !== actor){
                sprite.setBattler(actor);
            }
            dx = dx + dw / 2 + this.padding;
            dx += FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
            var sx = dx;
            var sy = dy + dh + this.padding;
            sprite.setImageId(id);
            sprite.setHome(sx, sy);
            sprite.startEntryMotion();
            sprite.setScale(scale);
            return Math.ceil(dh / this.lineHeight()) || 1;
        }
    };

    var _FAA_Window_Base_clearCssSprite = Window_Base.prototype.clearCssSprite;
    Window_Base.prototype.clearCssSprite = function(index) {
        _FAA_Window_Base_clearCssSprite.call(this, index);
        if (this._faceSprite[index]) this._faceSprite[index].setBattler();
    };

    Window_Base.prototype.clearFaceSprites = function() {
        this._faceSprite.forEach( function(sprite){
            sprite.setBattler();
        });
    };

    var  _FAA_Window_Status_refresh = Window_Status.prototype.refresh;
    Window_Status.prototype.refresh = function() {
        this.clearFaceSprites();
        _FAA_Window_Status_refresh.call(this);
    };

    //=============================================================================
    // Sprite_ActorFace
    // アクターの顔画像表示スプライト
    //=============================================================================

    Sprite_ActorFace.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_ActorFace.prototype.constructor = Sprite_ActorFace;

    Sprite_ActorFace.prototype.initialize = function(battler, window) {
        Sprite_Battler.prototype.initialize.call(this, battler);
        this._spriteWindow = window;
    };

    Sprite_ActorFace._imageWidth  = 144;
    Sprite_ActorFace._imageHeight = 144;

    Sprite_ActorFace.prototype.setBattler = function(battler) {
        Sprite_Battler.prototype.setBattler.call(this, battler);
        var changed = (battler !== this._actor);
        if (changed) {
            this._actor = battler;
            this.startEntryMotion();
        }
    };

    Sprite_ActorFace.prototype.startEntryMotion = function() {
    };

    Sprite_ActorFace.prototype.updateMain = function() {
          this.updateBitmap();
          this.updateFrame();
    };

    Sprite_ActorFace.prototype.initMembers = function() {
        Sprite_Battler.prototype.initMembers.call(this);
        this._battlerName = '';
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;
        this._tone = [0, 0, 0, 0];
        this._toneCount = 0;
        this._tonePattern = 0;
        this._code = 1;
        this._requestUpdateTone = false;
        this.createMainSprite();
    };

    Sprite_ActorFace.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        if (this._actor) {
            this.updateMain();
            this.updateTone();
            if (FTKR.FAA.destination > 0) this.updateAnimation();
            if (FTKR.FAA.damage.enable) this.updateDamagePopup();
            this.updateSelectionEffect();
        } else {
            this.bitmap = null;
        }
        if (Imported.YEP_BattleEngineCore) {
            if (!this._postSpriteInitialized) this.postSpriteInitialize();
        }
        if (this._actor) {
            this.updateMotion();
        }
    };

    Sprite_ActorFace.prototype.startToneChange = function() {
        this._requestUpdateTone = true;
    };

    Sprite_ActorFace.prototype.stopToneChange = function() {
        this._requestUpdateTone = false;
        if (this._mainSprite) this._mainSprite.setColorTone([0,0,0,0]);
    };

    Sprite_ActorFace.prototype.updateTone = function() {
        var toneSet = FTKR.FAA.select.tone;
        if (!toneSet.enable || !this._mainSprite || !this._requestUpdateTone) return;
        var tone = toneSet.color.split(',').num();
        if (this._toneCount >= toneSet.count) {
            var pattern = toneSet.pattern;
            if (this._tonePattern == pattern) {
                this._code *= -1;
                this._tonePattern = 0;
            }
            this._tone = [
                this._tone[0] + this._code * tone[0] / pattern,
                this._tone[1] + this._code * tone[1] / pattern,
                this._tone[2] + this._code * tone[2] / pattern,
                this._tone[3] + this._code * tone[3] / pattern
            ];
            this._tonePattern += 1;
            this._mainSprite.setColorTone(this._tone);
            this._toneCount = 0;
        } else {
            this._toneCount += 1;
        }
    };

    Sprite_ActorFace.prototype.updateBitmap = function() {
        Sprite_Battler.prototype.updateBitmap.call(this);
        var name = this._actor.faceName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadFace(name);
        }
    };

    Sprite_ActorFace.prototype.updateFrame = function() {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var cw = Sprite_ActorFace._imageWidth;
            var ch = Sprite_ActorFace._imageHeight;
            var motionIndex = this._actor.faceIndex();
            var cx = motionIndex % 4;
            var cy = Math.floor(motionIndex / 4);
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_ActorFace.prototype.setScale = function(scale) {
        this.scale._x = scale;
        this.scale._y = scale;
    };

    //------------------------------------------------------------------------
    // フロントビュー戦闘でも顔画像を表示させる
    //------------------------------------------------------------------------
    Sprite_ActorFace.prototype.updateVisibility = function() {
        Sprite_Base.prototype.updateVisibility.call(this);
        if (!this._actor) {
            this.visible = false;
        }
    };

    Sprite_ActorFace.prototype.setupAnimation = function() {
        while (this._actor.isAnimationRequested()) {
            var data = this._actor.shiftAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
        }
    };

    Sprite_ActorFace.prototype.startAnimation = function(animation, mirror, delay) {
        var sprite = new Sprite_FaceAnimation(this._spriteWindow);
        sprite.setup(this._effectTarget, animation, mirror, delay);
        if (this.scale._y !== 1) sprite.setHeight(Sprite_ActorFace._imageHeight * this.scale._y);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    Sprite_ActorFace.prototype.setupDamagePopup = function() {
        if (this._actor.isDamagePopupRequested()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._actor);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
            this._actor.clearDamagePopup();
            this._actor.clearResult();
        }
    };

    Sprite_ActorFace.prototype.damageOffsetX = function() {
        return FTKR.FAA.damage.offsetX;
    };

    Sprite_ActorFace.prototype.damageOffsetY = function() {
        return FTKR.FAA.damage.offsetY;
    };

    //=============================================================================
    // Sprite_ActorImage
    // アクターの顔画像表示スプライト
    //=============================================================================

    Sprite_ActorImage.prototype = Object.create(Sprite_ActorFace.prototype);
    Sprite_ActorImage.prototype.constructor = Sprite_ActorImage;

    Sprite_ActorImage.prototype.updateBitmap = function() {
        Sprite_Battler.prototype.updateBitmap.call(this);
        var id = this._imageId || 0;
        var name = this._actor.actor().cssbgi[id].name;
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadPicture(name);
        }
    };

    Sprite_ActorImage.prototype.setImageId = function(id) {
        this._imageId = id;
    };

    Sprite_ActorImage.prototype.updateFrame = function() {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var id = this._imageId || 0;
            var bgi = this._actor.actor().cssbgi[id];
            var sw = bgi.width || bitmap.width;
            var sh = bgi.height || bitmap.height;
            var sx = bgi.offsetX || 0;
            var sy = bgi.offsetY || 0;
            this._mainSprite.setFrame(sx, sy, sw, sh);
        }
    };

    //=============================================================================
    // Sprite_FaceAnimation
    // アクターの顔画像用アニメーション表示スプライト
    //=============================================================================

    Sprite_FaceAnimation.prototype = Object.create(Sprite_Animation.prototype);
    Sprite_FaceAnimation.prototype.constructor = Sprite_FaceAnimation;

    Sprite_FaceAnimation._checker1 = {};
    Sprite_FaceAnimation._checker2 = {};

    Sprite_FaceAnimation.prototype.initialize = function(window) {
        Sprite_Animation.prototype.initialize.call(this);
        this._spriteWindow = window;
        this._spriteHeight = 144;
    };

    Sprite_FaceAnimation.prototype.setHeight = function(height) {
        this._spriteHeight = height;
    };

    Sprite_FaceAnimation.prototype.updatePosition = function() {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2 - this._spriteWindow.x;
            this.y = this.parent.height / 2 - this._spriteWindow.y;
        } else {
            var parent = this._target.parent;
            var grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._spriteHeight;
            } else if (this._animation.position === 1) {
                this.y -= this._spriteHeight / 2;
            }
        }
    };

    //=============================================================================
    // Window_BattleStatus
    // バトル画面のステータス表示用ウィンドウクラス
    //=============================================================================

    Window_BattleStatus.prototype.isBusy = function() {
        return this.isFaceSpriteBusy();
    };

    Window_BattleStatus.prototype.isFaceSpriteBusy = function() {
        return this._faceSprite.some( function(sprite) {
            return sprite.isAnimationPlaying();
        });
    };

    var _FAA_Window_BattleStatus_select = Window_BattleStatus.prototype.select;
    Window_BattleStatus.prototype.select = function(index) {
        _FAA_Window_BattleStatus_select.call(this, index);
        if (!FTKR.FAA.select.cursor) {
            this.setCursorRect(0, 0, 0, 0);
        }
        if (FTKR.FAA.select.tone.enable) {
            this._faceSprite.forEach( function(sprite, i){
                i === index ? sprite.startToneChange() : sprite.stopToneChange();
            });
        }
    };

    //=============================================================================
    // BattleManager
    // バトルマネージャー
    //=============================================================================

    var _FAA_BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function() {
        return (_FAA_BattleManager_isBusy.call(this) || this._statusWindow.isBusy());
    };

}());//EOF