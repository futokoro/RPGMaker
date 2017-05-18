//=============================================================================
// アクターの状態によって顔画像を変えるプラグイン
// FTKR_FacialImageDifference.js
// 作成者     : フトコロ
// 作成日     : 2017/05/10
// 最終更新日 : 2017/05/18
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_FID = true;

var FTKR = FTKR || {};
FTKR.FID = FTKR.FID || {};

//=============================================================================
/*:
 * @plugindesc v1.0.3 アクターの状態によって顔画像を変えるプラグイン
 * @author フトコロ
 *
 * @noteParam FID_画像
 * @noteRequire 1
 * @noteDir img/face/
 * @noteType file
 * @noteData actors
 * 
 * @param Enable Animation
 * @desc バトル画面で顔画像にダメージポップアップやアニメーションを表示させるか (0 - 無効, 1 - 有効)
 * @default 0
 * 
 * @param --画像番号変更--
 * @desc 
 * 
 * @param Walk Face Index
 * @desc 前進時の顔画像番号を設定します
 * @default 0
 * 
 * @param Wait Face Index
 * @desc 待機時の顔画像番号を設定します
 * @default 0
 * 
 * @param Chant Face Index
 * @desc 詠唱時の顔画像番号を設定します
 * @default 0
 * 
 * @param Guard Face Index
 * @desc 防御時の顔画像番号を設定します
 * @default 0
 * 
 * @param Damage Face Index
 * @desc ダメージ時の顔画像番号を設定します
 * @default 0
 * 
 * @param Evade Face Index
 * @desc 回避時の顔画像番号を設定します
 * @default 0
 * 
 * @param Thrust Face Index
 * @desc 突き時の顔画像番号を設定します
 * @default 0
 * 
 * @param Swing Face Index
 * @desc 払い時の顔画像番号を設定します
 * @default 0
 * 
 * @param Missile Face Index
 * @desc 飛び道具時の顔画像番号を設定します
 * @default 0
 * 
 * @param Skill Face Index
 * @desc 防御使用時の顔画像番号を設定します
 * @default 0
 * 
 * @param Spell Face Index
 * @desc 魔法使用時の顔画像番号を設定します
 * @default 0
 * 
 * @param Item Face Index
 * @desc アイテム使用時の顔画像番号を設定します
 * @default 0
 * 
 * @param Escape Face Index
 * @desc 逃走時の顔画像番号を設定します
 * @default 0
 * 
 * @param Victory Face Index
 * @desc 戦闘勝利時の顔画像番号を設定します
 * @default 0
 * 
 * @param Dying Face Index
 * @desc 瀕死時の顔画像番号を設定します
 * @default 0
 * 
 * @param Abnormal Face Index
 * @desc 状態異常時の顔画像番号を設定します
 * @default 0
 * 
 * @param Sleep Face Index
 * @desc 睡眠時の顔画像番号を設定します
 * @default 0
 * 
 * @param Dead Face Index
 * @desc 戦闘不能時の顔画像番号を設定します
 * @default 0
 * 
 * @param --FTKR_ExSvMotionの設定--
 * @desc 
 * 
 * @param Recovery Face Index
 * @desc HP回復時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom1 Face Index
 * @desc Custom1の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom2 Face Index
 * @desc Custom2の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom3 Face Index
 * @desc Custom3の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom4 Face Index
 * @desc Custom4の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom5 Face Index
 * @desc Custom5の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom6 Face Index
 * @desc Custom6の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom7 Face Index
 * @desc Custom7の時の顔画像番号を設定します
 * @default 0
 * 
 * @param Custom8 Face Index
 * @desc Custom8の時の顔画像番号を設定します
 * @default 0
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アクターのさまざまな状態において
 * 表示する顔画像を変更します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 * 2. 他プラグインと組み合わせる場合
 *    当プラグインは以下のプラグインよりも下にしてください。
 *      FTKR_CustomSimpleActorStatus
 *      FTKR_ExSvMotion
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの顔画像について
 *-----------------------------------------------------------------------------
 * 本プラグインを使用する場合、アクターの顔画像は以下の規格のものを
 * 使用してください。
 * 
 * 一つの顔画像サイズ：144 * 144
 * 一つのファイルには、顔画像を横に６列、縦に３行まで配置できます。
 * 顔画像の番号は、左上を 0番、一つ右を 1番、一つ下を 6番と数えます。
 * 一つの画像ファイルで最大18種類の顔画像を設定できます。
 * 
 * ファイルは、img/face/ フォルダに保存してください。
 * 
 * どの状態で何番の顔画像を使用するかは、プラグインパラメータで
 * 設定してください。
 * なお、指定された番号の箇所に画像がない場合は、空欄で表示されますので
 * 注意してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 基本仕様
 *-----------------------------------------------------------------------------
 * 本プラグインを単独で使用する場合、アクターの状態によって
 * メニュー画面や、ステータス画面等で表示する顔画像が変わります。
 * 
 * 有効な状態は以下の通りです。
 * 1. 通常
 * 2. 瀕死時
 * 3. 状態異常
 * 4. 睡眠
 * 5. 戦闘不能
 * 
 * なお、デフォルトのプラグインの状態では、すべてのアクターの状態に対して 
 * 0番の画像を指定しています。
 * 必要に応じて、プラグインパラメータに値を設定してください。
 * 
 * 
 * プラグインパラメータ<Enable Animation>を有効にすると、
 * バトル中、ダメージポップアップやスキル等のアニメーションを
 * 顔画像上に表示させることができます。
 * 
 * サイドビュー戦闘の場合、バトルフィールドのSVキャラには
 * ダメージポップアップやアニメーションが表示しなくなります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * FTKR_CustomSimpleActorStatus と併用する場合
 *-----------------------------------------------------------------------------
 * FTKR_CustomSimpleActorStatusの設定によって表示する顔画像を変更します。
 * 有効な状態は、基本仕様と同じです。
 * 
 * 以下の拡張プラグインについても同様です。
 * FTKR_CSS_DetailedStatus
 * FTKR_CSS_SkillStatus
 * 
 * 
 *-----------------------------------------------------------------------------
 * FTKR_CSS_BattleStatus と併用する場合
 *-----------------------------------------------------------------------------
 * バトル中のアクターの状態によって、顔画像を変更します。
 * 
 * アクターのアクション時にも、顔画像を変更することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * FTKR_ExSvMotion と併用する場合
 *-----------------------------------------------------------------------------
 * FTKR_ExSvMotionの設定によって表示する顔画像を変更します。
 * 
 * FTKR_ExSvMotionの設定で、各状態のモーションを変更していた場合は、
 * その設定に合わせて、顔画像も同じモーションの番号に変更します。
 * 
 * また、回復時、およびカスタムモーション時に使用するの顔画像番号を
 * 設定できます。
 * 
 * 
 * 別画像モーション時には、アクターのメモ欄で設定した顔画像ファイルを
 * 使用します。
 * アクターのメモ欄に以下のタグを追記してください。
 * 
 * <FID_顔画像:filename>
 * <FID_FACE_IMAGE:filename>
 * 
 * 画像ファイル filename.png は img/face/ に保存してください。
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
 * v1.0.3 - 2017/05/18 : 不具合修正
 *    1. 防御時の顔画像設定用プラグインパラメータの誤記修正。
 * 
 * v1.0.2 - 2017/05/17 : 仕様変更
 *    1. 顔画像の表示レイヤーを、ステータスウィンドウのコンテンツよりも下に
 *       変更。
 * 
 * v1.0.1 - 2017/05/11 : 不具合修正、機能追加
 *    1. フロントビュー戦闘で顔画像が表示しない不具合を修正。
 *    2. 顔画像にダメージポップアップやアニメーションを表示する機能を追加
 *    3. YEP_BattleEngineCoreに対応。
 * 
 * v1.0.0 - 2017/05/10 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.FID.parameters = PluginManager.parameters('FTKR_FacialImageDifference');

FTKR.FID.enableAnimation = Number(FTKR.FID.parameters['Enable Animation'] || 0);

//オリジナルステータス設定オブジェクト
FTKR.FID.faces = {
    wait    :Number(FTKR.FID.parameters['Wait Face Index'] || 0),
    walk    :Number(FTKR.FID.parameters['Walk Face Index'] || 0),
    chant   :Number(FTKR.FID.parameters['Chant Face Index'] || 0),
    guard   :Number(FTKR.FID.parameters['Guard Face Index'] || 0),
    damage  :Number(FTKR.FID.parameters['Damage Face Index'] || 0),
    evade   :Number(FTKR.FID.parameters['Evade Face Index'] || 0),
    thrust  :Number(FTKR.FID.parameters['Thrust Face Index'] || 0),
    swing   :Number(FTKR.FID.parameters['Swing Face Index'] || 0),
    missile :Number(FTKR.FID.parameters['Missile Face Index'] || 0),
    skill   :Number(FTKR.FID.parameters['Skill Face Index'] || 0),
    spell   :Number(FTKR.FID.parameters['Spell Face Index'] || 0),
    item    :Number(FTKR.FID.parameters['Item Face Index'] || 0),
    escape  :Number(FTKR.FID.parameters['Escape Face Index'] || 0),
    victory :Number(FTKR.FID.parameters['Victory Face Index'] || 0),
    dying   :Number(FTKR.FID.parameters['Dying Face Index'] || 0),
    abnormal:Number(FTKR.FID.parameters['Abnormal Face Index'] || 0),
    sleep   :Number(FTKR.FID.parameters['Sleep Face Index'] || 0),
    dead    :Number(FTKR.FID.parameters['Dead Face Index'] || 0),
    recovery:Number(FTKR.FID.parameters['recovery Face Index'] || 0),
    custom1 :Number(FTKR.FID.parameters['Custom1 Face Index'] || 0),
    custom2 :Number(FTKR.FID.parameters['Custom2 Face Index'] || 0),
    custom3 :Number(FTKR.FID.parameters['Custom3 Face Index'] || 0),
    custom4 :Number(FTKR.FID.parameters['Custom4 Face Index'] || 0),
    custom5 :Number(FTKR.FID.parameters['Custom5 Face Index'] || 0),
    custom6 :Number(FTKR.FID.parameters['Custom6 Face Index'] || 0),
    custom7 :Number(FTKR.FID.parameters['Custom7 Face Index'] || 0),
    custom8 :Number(FTKR.FID.parameters['Custom8 Face Index'] || 0),
};

//objのメモ欄から <metacode: x> の値を読み取って配列で返す
var readObjectMeta = function(obj, metacodes) {
    if (!obj) return false;
    metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
        return obj.note.match(metaReg);
    }); 
    return RegExp.$1 ? RegExp.$1 : false;
};

//=============================================================================
// バトラーに顔画像の設定を追加
//=============================================================================

FTKR.FID.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    FTKR.FID.Game_Battler_initMembers.call(this);
    this._faceType = null;
    this._faceRefresh = false;
};

FTKR.FID.Game_Battler_requestMotion = Game_Battler.prototype.requestMotion;
Game_Battler.prototype.requestMotion = function(motionType) {
    FTKR.FID.Game_Battler_requestMotion.call(this, motionType);
    this._faceType = this._motionType;
};

Game_Battler.prototype.isFaceRequested = function() {
    return !!this._faceType;
};

Game_Battler.prototype.faceType = function() {
    return this._faceType;
};

Game_Battler.prototype.clearFace = function() {
    this._faceType = null;
    this._faceRefresh = false;
};

Game_Battler.prototype.isFaceRefreshRequested = function() {
    return this._faceRefresh;
};

Game_Battler.prototype.requestFaceRefresh = function() {
    this._faceRefresh = true;
};

FTKR.FID.Game_Battler_setActionState = Game_Battler.prototype.setActionState;
Game_Battler.prototype.setActionState = function(actionState) {
    FTKR.FID.Game_Battler_setActionState.call(this, actionState);
    this.requestFaceRefresh();
};

FTKR.FID.Game_Party_requestMotionRefresh = Game_Party.prototype.requestMotionRefresh;
Game_Party.prototype.requestMotionRefresh = function() {
    FTKR.FID.Game_Party_requestMotionRefresh.call(this);
    this.members().forEach(function(actor) {
        actor.requestFaceRefresh();
    });
};

//=============================================================================
// アクターの顔画像表示処理を修正
//=============================================================================

//書き換え
Window.prototype._createAllParts = function() {
    this._windowSpriteContainer = new PIXI.Container();
    this._windowBackSprite = new Sprite();
    this._windowCursorSprite = new Sprite();
    this._windowFrameSprite = new Sprite();
    this._windowCssSprite = new Sprite(); //追加
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
    this.addChild(this._windowCssSprite); //追加
    this.addChild(this._windowContentsSprite);
    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
    this.addChild(this._windowPauseSignSprite);
};

FTKR.FID.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    FTKR.FID.Window_Base_initialize.call(this, x, y, width, height);
    this._faceSprite = [];
};

//書き換え
Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    this.drawCssFace(actor, x, y, width, height);
};

Window_Base.prototype.showActorNum = function() {
    return this.maxPageItems ? this.maxPageItems() : 1;
};

//書き換え
Window_Base.prototype.drawCssFace = function(actor, dx, dy, width, height) {
    var index = actor.index() % this.showActorNum();
    var sprite = this._faceSprite[index];
    var fh = Window_Base._faceHeight;
    var scale = Imported.FTKR_CSS ? (Math.min(width, height) || fh) / fh : 1;
    if (!sprite) {
        sprite = new Sprite_ActorFace(actor);
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
    var sx = Math.floor(dx);
    var sy = Math.floor(dy + height + this.padding);
    sprite.setHome(sx, sy);
    sprite.startMove(0,0,0);
    sprite.setScale(scale);
};

FTKR.FID.Window_Base_clearCssSprite = Window_Base.prototype.clearCssSprite;
Window_Base.prototype.clearCssSprite = function(index) {
    FTKR.FID.Window_Base_clearCssSprite.call(this, index);
    if (this._faceSprite[index]) this._faceSprite[index].setBattler();
};

//=============================================================================
// Sprite_ActorFace
// アクターの顔画像表示スプライト
//=============================================================================

function Sprite_ActorFace() {
    this.initialize.apply(this, arguments);
}

Sprite_ActorFace.prototype = Object.create(Sprite_Actor.prototype);
Sprite_ActorFace.prototype.constructor = Sprite_ActorFace;

Sprite_ActorFace.prototype.initialize = function(battler) {
    Sprite_Battler.prototype.initialize.call(this, battler);
};

Sprite_ActorFace._imageWidth  = 144;
Sprite_ActorFace._imageHeight = 144;

Sprite_ActorFace.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._battlerName = '';
    this._motion = null;
    this._motionCount = 0;
    this._pattern = 0;
    this._faceType = '';
    this.createMainSprite();
};

Sprite_ActorFace.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    var changed = (battler !== this._actor);
    if (changed) {
        this._actor = battler;
        this.startEntryMotion();
    }
};

Sprite_ActorFace.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler) {
        this.updateMain();
        if (FTKR.FID.enableAnimation) {
            this.updateAnimation();
            this.updateDamagePopup();
            this.updateSelectionEffect();
        }
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

Sprite_ActorFace.prototype.updateMain = function() {
      this.updateBitmap();
      this.updateFrame();
//    this.updateMove();
//    this.updatePosition();
};

Sprite_ActorFace.prototype.setupMotion = function() {
    if (this._actor.isFaceRequested()) {
        this.startMotion(this._actor.faceType());
        this._actor.clearFace();
    }
};

Sprite_ActorFace.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = Imported.FTKR_ESM && this.isOtherMotion() ? this.otherBattlerName() : this._actor.faceName();
    if (this._battlerName !== name) {
        this._battlerName = name;
        this._mainSprite.bitmap = ImageManager.loadFace(name);
    }
};

Sprite_ActorFace.prototype.otherBattlerName = function() {
    return readObjectMeta(this._actor.actor(), ['FID_顔画像', 'FID_FACE_IMAGE']);
};

Sprite_ActorFace.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var bitmap = this._mainSprite.bitmap;
    if (bitmap) {
        var motionIndex = this.faceTypeIndex();
        var cw = Sprite_ActorFace._imageWidth;
        var ch = Sprite_ActorFace._imageHeight;
        var cx = motionIndex % 6;
        var cy = Math.floor(motionIndex / 6);
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
    }
};

Sprite_ActorFace.prototype.startMotion = function(motionType) {
    Sprite_Actor.prototype.startMotion.call(this, motionType);
    if (this._faceType !== motionType) {
        this._faceType = motionType;
        if (Imported.FTKR_ESM) this.setNewMotion(this._actor, motionType);
    }
};

Sprite_ActorFace.prototype.faceTypeIndex = function() {
    if (!this._motion) return 0;
    var faceType = Imported.FTKR_ESM ? 
        this.convertOtherMotion(this.motionName()) :
        this._faceType;
    return FTKR.FID.faces[faceType];
};

Sprite_ActorFace.prototype.updateMotion = function() {
    if (!Imported.YEP_BattleEngineCore) {
        this.setupMotion();
        if (this._actor.isFaceRefreshRequested()) {
            this.refreshMotion();
            this._actor.clearFace();
        }
    } else {
        if (this._actor._faceType && this._motionType !== this._actor._faceType) {
            this.startMotion(this._actor._faceType);
        }
    }
    this.updateMotionCount();
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
    if (!this._battler) {
        this.visible = false;
    }
};

Sprite_ActorFace.prototype.setupAnimation = function() {
    while (this._battler.isAnimationRequested()) {
        var data = this._battler.shiftAnimation();
        var animation = $dataAnimations[data.animationId];
        var mirror = data.mirror;
        var delay = animation.position === 3 ? 0 : data.delay;
        this.startAnimation(animation, mirror, delay);
    }
};

Sprite_ActorFace.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        var sprite = new Sprite_Damage();
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
        sprite.setup(this._battler);
        this._damages.push(sprite);
        this.parent.addChild(sprite);
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    }
};


