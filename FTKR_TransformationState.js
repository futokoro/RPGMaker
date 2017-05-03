//=============================================================================
// ステートが掛かっている間キャラ画像を変えるプラグイン
// FTKR_TransformationState.js
// 作成者     : フトコロ
// 作成日     : 2017/05/02
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_TFS = true;

var FTKR = FTKR || {};
FTKR.TFS = FTKR.TFS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 ステートが掛かっている間キャラ画像を変えるプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、ステートが掛かっている間アクターの
 * SVキャラ画像を変更することができます。
 * 
 * 以下のタグをステートのメモ欄に記入してください。
 * 
 * <TFS_変身:filename>
 * <TFS_TRANSFORM:filename>
 * 
 * アクターのSVキャラ画像を filename.png に変えます。
 * 画像ファイルは、img/sv_actors内に保存してください。
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/05/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.TFS.parameters = PluginManager.parameters('FTKR_TransformationState');

//objのメモ欄から <metacode: x> の値を読み取って配列で返す
var readObjectMetaData = function(obj, metacodes) {
    if (!obj) return false;
    metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
        return obj.note.match(metaReg);
    }); 
    return RegExp.$1 ? RegExp.$1 : false;
};

//objのメモ欄から <metacode> の値を読み取って真偽で返す
var readObjectMeta = function(obj, metacodes) {
    if (!obj) return false;
    return metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + '>', 'i');
        return metaReg.test(obj.note);
    }); 
};

//=============================================================================
// ステートのメモ欄の読み取り
//=============================================================================

Sprite_Actor.prototype.clearTransformData = function() {
    this._transformName = '';
    this._transformWeaponLess = false;
};

Sprite_Actor.prototype.checkTfState = function() {
    if (this._actor) {
        return this.readTransformData();
    }
    return null;
};

Sprite_Actor.prototype.readTransformData = function() {
    return this._actor.states().some( function(state) {
        this._transformName = readObjectMetaData(state, ['TFS_変身', 'TFS_TRANSFORM']);
        this._transformWeaponLess = readObjectMeta(state, ['TFS_武器非表示', 'TFS_WEAPON_LESS']);
        return this._transformName;
    },this);
};

//=============================================================================
// アクターのSV戦闘画像を変える
//=============================================================================

FTKR.TFS.Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    if (this.checkTfState() && this._transformName) {
        Sprite_Battler.prototype.updateBitmap.call(this);
        var name = this._transformName;
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadSvActor(name);
        }
    } else {
        this.clearTransformData();
        FTKR.TFS.Sprite_Actor_updateBitmap.call(this);
    }
};

//=============================================================================
// アクターの武器画像を表示させない
//=============================================================================

FTKR.TFS.Sprite_Actor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
Sprite_Actor.prototype.setupWeaponAnimation = function() {
    if (this._transformWeaponLess) {
        this._weaponSprite.setup();
    } else {
        FTKR.TFS.Sprite_Actor_setupWeaponAnimation.call(this);
    }
};
