//=============================================================================
// アクターの状態によって顔画像を変えるプラグイン
// FTKR_FacialImageDifference2.js
// 作成者     : フトコロ
// 作成日     : 2017/12/16
// 最終更新日 : 2017/12/16
// バージョン : v2.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_FID = true;

var FTKR = FTKR || {};
FTKR.FID = FTKR.FID || {};

//=============================================================================
/*:
 * @plugindesc v2.0.1 アクターの状態によって顔画像を変えるプラグイン
 * @author フトコロ
 *
 * @noteParam FID_画像
 * @noteRequire 1
 * @noteDir img/face/
 * @noteType file
 * @noteData actors
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
 * 本プラグインを実装することで、戦闘中のアクターの顔画像を、
 * アクターのさまざまな状態によって変更します。
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
 *      FTKR_FVActorAnimation.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの顔画像について
 *-----------------------------------------------------------------------------
 * 本プラグインを使用する場合、アクターの顔画像は以下の規格のものを
 * 使用してください。
 * 
 * 一つの顔画像サイズ：144 * 144
 * 一つのファイルには、顔画像を横に６列、縦に３行まで配置してください。
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
 * 戦闘画面で表示する顔画像が変わります。
 * 
 * デフォルトのプラグインの状態では、すべてのアクターの状態に対して 
 * 0番の画像を指定しています。
 * 必要に応じて、プラグインパラメータに値を設定してください。
 * 
 * なお、戦闘以外の画面での顔画像は、すべて 0番を使用します。
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
 * v2.0.1 - 2017/12/16 : 不具合修正
 *    1. FTKR_SvMotion.jsと併用できるように見直し。
 *    2. 戦闘終了後に顔画像がデフォルトに戻らない不具合修正。
 * 
 * v2.0.0 - 2017/12/16 : 初版作成(FTKR_FacialImageDifference v1.1.7から派生)
 *    1. アニメーションおよびダメージポップアップ機能を削除。
 *    2. 顔画像のスプライトをFTKR_FVActorAnimation.jsから参照する方式に変更。
 * 
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

(function (){

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_FacialImageDifference2');

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
        this._faceIndex = 0;
    };

    Game_Battler.prototype.clearFace = function() {
        this._faceIndex = 0;
    };

    var _FID_Game_Battler_requestMotion = Game_Battler.prototype.requestMotion;
    Game_Battler.prototype.requestMotion = function(motionType) {
        _FID_Game_Battler_requestMotion.call(this, motionType);
        this._faceType = this._motionType;
    };

    if (!Imported.FTKR_FAA) {
    var _FID_Game_Actor_performDamage = Game_Actor.prototype.performDamage;
    Game_Actor.prototype.performDamage = function() {
        _FID_Game_Actor_performDamage.call(this);
        this.requestMotion('damage');
    };
    }

    //=============================================================================
    // Sprite_Actorの修正
    // アクターの顔画像表示処理を追加
    //=============================================================================

    var _FID_Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
    Sprite_Actor.prototype.startMotion = function(motionType) {
        _FID_Sprite_Actor_startMotion.call(this, motionType);
        this.refreshFace(this.faceTypeIndex(motionType));
    };

    Sprite_Actor.prototype.faceTypeIndex = function(motionType) {
        if (!motionType) return 0;
        if (Imported.FTKR_ESM && !this._motion) return 0;
        var faceType = Imported.FTKR_ESM ? 
            this.convertOtherMotion(this.motionName()) :
            motionType;
        return FTKR.FID.faces[faceType];
    };

    Sprite_Actor.prototype.refreshFace = function(faceIndex) {
        if (this._actor && this._actor._faceIndex !== faceIndex) {
            this._actor._faceIndex = faceIndex;
            if (BattleManager._statusWindow) BattleManager._statusWindow.refresh();
        }
    };

    //書き換え
    Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        this.drawFace(actor.faceName(), actor._faceIndex, x, y, width, height);
    };

    //書き換え
    Window_BattleStatus.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = faceIndex % 6 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 6) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    //書き換え
    Window_Base.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        var len = Math.min(width, height);
        var dh = len || Window_Base._faceHeight;
        var dw = len || Window_Base._faceWidth;
        var offsetX = FTKR.CSS.cssStatus.face.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        var bitmap = ImageManager.loadFace(actor.faceName());
        var sw = Window_Base._faceWidth;
        var sh = Window_Base._faceHeight;
        var sx = actor._faceIndex % 6 * sw;
        var sy = Math.floor(actor.faceIndex() / 6) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    //=============================================================================
    // FTKR_FVActorAnimation.jsの修正
    // アクターの顔画像表示処理を修正
    //=============================================================================
    if (Imported.FTKR_FAA && FTKR.FAA.destination == 1) {

    Sprite_ActorFace.prototype.refreshFace = function(faceIndex) {};

    Sprite_ActorFace.prototype.updateFrame = function() {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var cw = Sprite_ActorFace._imageWidth;
            var ch = Sprite_ActorFace._imageHeight;
            var motionIndex = this._actor._faceIndex;
            var cx = motionIndex % 6;
            var cy = Math.floor(motionIndex / 6);
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    }
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