//=============================================================================
// アクターの状態によって顔画像を変えるプラグイン
// FTKR_FacialImageDifference.js
// 作成者     : フトコロ
// 作成日     : 2017/05/10
// 最終更新日 : 2017/12/02
// バージョン : v1.1.7
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_FID = true;

var FTKR = FTKR || {};
FTKR.FID = FTKR.FID || {};

//=============================================================================
/*:
 * @plugindesc v1.1.7 アクターの状態によって顔画像を変えるプラグイン
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
 * @param Enable Face Difference
 * @desc 顔画像の変更機能を有効にするか (0 - 無効, 1 - 有効)
 * @default 1
 * 
 * @param --ダメージポップアップ位置--
 * @desc 
 * 
 * @param Offset X
 * @desc 顔画像に対するダメージポップアップ位置のX座標のずれ
 * @default -32
 * 
 * @param Offset Y
 * @desc 顔画像に対するダメージポップアップ位置のY座標のずれ
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
 * 本プラグインを実装することで、アクターの顔画像に以下の機能を追加します。
 * 
 * １．アクターのさまざまな状態において表示する顔画像を変更します。
 * ２．アクターの顔画像にアニメーションやダメージポップアップを表示します。
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
 * ※その他の状態を有効にしたい場合は、FTKR_SvMotion.jsを併用してください。
 * 
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.7 - 2017/12/02 : 不具合修正
 *    1. ステータス画面でアクターを変えた場合に、変更前のアクターの画像が残る
 *       不具合を修正。
 * 
 * v1.1.6 - 2017/11/24 : 不具合修正
 *    1. 5人パーティー以上で並べ替えを実施すると、正しく表示できない不具合を修正。
 * 
 * v1.1.5 - 2017/10/01 : 不具合修正
 *    1. フロントビューモードで、ダメージ時の顔画像の変更が動作しない不具合を修正。
 *    2. 睡眠ステート時の顔画像変更が動作しない不具合を修正。
 * 
 * v1.1.4 - 2017/10/01 : 不具合修正
 *    1. ステータス画面でキャラチェンジした場合に、前のキャラの顔画像が
 *       残る不具合を修正。
 * 
 * v1.1.3 - 2017/09/24 : 機能追加
 *    1. 顔画像を初期化する関数を追加。
 * 
 * v1.1.2 - 2017/07/08 : 不具合修正
 *    1. シーン変更時に現在の顔画像をリセットする機能を追加。
 * 
 * v1.1.1 - 2017/05/27 : 不具合修正、機能追加
 *    1. メニュー画面で顔画像が戦闘不能以外に変わらない不具合修正。
 *    2. ダメージポップアップ位置を調整する機能を追加。
 *    3. 単体スキルを受けたときのアニメーション表示位置を調整。
 * 
 * v1.1.0 - 2017/05/23 : 仕様変更
 *    1. パーティーが全体魔法を受けた時のアニメーション表示位置を調整。
 *    2. パーティーが全体魔法を受けた時のダメージポップアップタイミングを調整。
 *    3. 顔画像の変更機能の有効無効設定を追加。
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
 *    3. YEP_BattleEngineCoreに対応(顔画像変更機能のみ)。
 * 
 * v1.0.0 - 2017/05/10 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

(function (){

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_FacialImageDifference');

    FTKR.FID.enableAnimation = Number(parameters['Enable Animation'] || 0);
    FTKR.FID.enableFaceDifference = Number(parameters['Enable Face Difference'] || 0);

    FTKR.FID.damage = {
        offsetX :Number(parameters['Offset X'] || 0),
        offsetY :Number(parameters['Offset Y'] || 0),
    };

    //オリジナルステータス設定オブジェクト
    FTKR.FID.faces = {
        wait    :Number(parameters['Wait Face Index'] || 0),
        walk    :Number(parameters['Walk Face Index'] || 0),
        chant   :Number(parameters['Chant Face Index'] || 0),
        guard   :Number(parameters['Guard Face Index'] || 0),
        damage  :Number(parameters['Damage Face Index'] || 0),
        evade   :Number(parameters['Evade Face Index'] || 0),
        thrust  :Number(parameters['Thrust Face Index'] || 0),
        swing   :Number(parameters['Swing Face Index'] || 0),
        missile :Number(parameters['Missile Face Index'] || 0),
        skill   :Number(parameters['Skill Face Index'] || 0),
        spell   :Number(parameters['Spell Face Index'] || 0),
        item    :Number(parameters['Item Face Index'] || 0),
        escape  :Number(parameters['Escape Face Index'] || 0),
        victory :Number(parameters['Victory Face Index'] || 0),
        dying   :Number(parameters['Dying Face Index'] || 0),
        abnormal:Number(parameters['Abnormal Face Index'] || 0),
        sleep   :Number(parameters['Sleep Face Index'] || 0),
        dead    :Number(parameters['Dead Face Index'] || 0),
        recovery:Number(parameters['recovery Face Index'] || 0),
        custom1 :Number(parameters['Custom1 Face Index'] || 0),
        custom2 :Number(parameters['Custom2 Face Index'] || 0),
        custom3 :Number(parameters['Custom3 Face Index'] || 0),
        custom4 :Number(parameters['Custom4 Face Index'] || 0),
        custom5 :Number(parameters['Custom5 Face Index'] || 0),
        custom6 :Number(parameters['Custom6 Face Index'] || 0),
        custom7 :Number(parameters['Custom7 Face Index'] || 0),
        custom8 :Number(parameters['Custom8 Face Index'] || 0),
    };

    //objのメモ欄から <metacode: x> の値を読み取って配列で返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //=============================================================================
    // バトラーに顔画像の設定を追加
    //=============================================================================

    var _FID_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _FID_Game_Battler_initMembers.call(this);
        this._faceType = null;
        this._faceRefresh = false;
    };

    var _FID_Game_Battler_requestMotion = Game_Battler.prototype.requestMotion;
    Game_Battler.prototype.requestMotion = function(motionType) {
        _FID_Game_Battler_requestMotion.call(this, motionType);
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

    var _FID_Game_Battler_setActionState = Game_Battler.prototype.setActionState;
    Game_Battler.prototype.setActionState = function(actionState) {
        _FID_Game_Battler_setActionState.call(this, actionState);
        this.requestFaceRefresh();
    };

    var _FID_Game_Party_requestMotionRefresh = Game_Party.prototype.requestMotionRefresh;
    Game_Party.prototype.requestMotionRefresh = function() {
        _FID_Game_Party_requestMotionRefresh.call(this);
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
        this.addChild(this._windowCssSprite); //追加
        this.addChild(this._windowContentsSprite);
        this.addChild(this._downArrowSprite);
        this.addChild(this._upArrowSprite);
        this.addChild(this._windowPauseSignSprite);
    };

    var _FID_Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _FID_Window_Base_initialize.call(this, x, y, width, height);
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
        var sx = Math.floor(dx);
        var sy = Math.floor(dy + height + this.padding);
        sprite.setHome(sx, sy);
        sprite.startEntryMotion();
        sprite.setScale(scale);
    };

    var _FID_Window_Base_clearCssSprite = Window_Base.prototype.clearCssSprite;
    Window_Base.prototype.clearCssSprite = function(index) {
        _FID_Window_Base_clearCssSprite.call(this, index);
        if (this._faceSprite[index]) this._faceSprite[index].setBattler();
    };

    Window_Base.prototype.clearFaceSprites = function() {
        this._faceSprite.forEach( function(sprite){
            sprite.setBattler();
        });
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

    Sprite_ActorFace.prototype.initialize = function(battler, window) {
        Sprite_Battler.prototype.initialize.call(this, battler);
        this._spriteWindow = window;
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

    Sprite_ActorFace.prototype.startEntryMotion = function() {
        this.refreshMotion();
        this.startMove(0, 0, 0);
    };

    Sprite_ActorFace.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        if (this._actor) {
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
    //      this.updateMove();
    //      this.updatePosition();
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
            var cw = Sprite_ActorFace._imageWidth;
            var ch = Sprite_ActorFace._imageHeight;
            if (FTKR.FID.enableFaceDifference) {
                var motionIndex = this.faceTypeIndex();
                var cx = motionIndex % 6;
                var cy = Math.floor(motionIndex / 6);
            } else {
                var motionIndex = this._actor.faceIndex();
                var cx = motionIndex % 4;
                var cy = Math.floor(motionIndex / 4);
            }
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
    //書き換え
    Game_Actor.prototype.performDamage = function() {
        Game_Battler.prototype.performDamage.call(this);
        this.requestMotion('damage');
        SoundManager.playActorDamage();
    };

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
        return FTKR.FID.damage.offsetX;
    };

    Sprite_ActorFace.prototype.damageOffsetY = function() {
        return FTKR.FID.damage.offsetY;
    };

    //=============================================================================
    // Sprite_FaceAnimation
    // アクターの顔画像用アニメーション表示スプライト
    //=============================================================================

    function Sprite_FaceAnimation() {
        this.initialize.apply(this, arguments);
    }

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

    //=============================================================================
    // メニュー画面のステータス表示用ウィンドウクラス
    //=============================================================================

    var _FID_Window_Status_refresh = Window_Status.prototype.refresh;
    Window_Status.prototype.refresh = function() {
        this.clearFaceSprites();
        _FID_Window_Status_refresh.call(this);
    };

    var _FID_Scene_Menu_onFormationOk = Scene_Menu.prototype.onFormationOk;
    Scene_Menu.prototype.onFormationOk = function() {
        _FID_Scene_Menu_onFormationOk.call(this);
        this._statusWindow.refresh();
    };

    var _FID_Scene_MenuBase_nextActor = Scene_MenuBase.prototype.nextActor;
    Scene_MenuBase.prototype.nextActor = function() {
        if (this._statusWindow) this._statusWindow.clearFaceSprites();
        _FID_Scene_MenuBase_nextActor.call(this);
    };

    var _FID_Scene_MenuBase_previousActor = Scene_MenuBase.prototype.previousActor;
    Scene_MenuBase.prototype.previousActor = function() {
        if (this._statusWindow) this._statusWindow.clearFaceSprites();
        _FID_Scene_MenuBase_previousActor.call(this);
    };

    //=============================================================================
    // BattleManager
    // バトルマネージャー
    //=============================================================================

    var _FID_BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function() {
        return (_FID_BattleManager_isBusy.call(this) || this._statusWindow.isBusy());
    };

    //=============================================================================
    // Scene_Base
    // シーン変更時に顔番号をリセット
    //=============================================================================

    var _FID_Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        _FID_Scene_Base_start.call(this);
        this.resetActorFaceType();
    };

    Scene_Base.prototype.resetActorFaceType = function() {
        if (!$gameParty) return;
        $gameParty.members().forEach( function(member) {
            member.clearFace();
        });
    };

}());//EOF