//=============================================================================
// ステートが掛かっている間キャラ画像を変えるプラグイン
// FTKR_TransformationState.js
// 作成者     : フトコロ
// 作成日     : 2017/05/02
// 最終更新日 : 2017/10/08
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_TFS = true;

var FTKR = FTKR || {};
FTKR.TFS = FTKR.TFS || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 ステートが掛かっている間キャラ画像を変えるプラグイン
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
 * なお、ファイル名に filename%1と "%1"と付けて指定すると
 * %1の部分がステートが掛かっているアクターのID(4桁表示)に
 * 変換された画像ファイルを読み込むことが出来ます。
 * 
 * 例) アクターID1のキャラに<TFS_変身:変身_%1>のタグが付いたステートが
 *     掛かっている場合
 * 
 *     読み込む画像は、 変身_0001.png になります。
 *     （ID1 を 4桁表示の 0001 に変換しています）
 * 
 * 
 * 変身中に武器を振らせたくない場合は、以下のタグをステートに記入してください。
 * 
 * <TFS_武器非表示>
 * <TFS_WEAPON_LESS>
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
 * v1.0.2 - 2017/08/02 : 不具合修正
 *    1. 他プラグインとの競合回避処理を追加。
 * 
 * v1.0.1 - 2017/05/03 : ヘルプ追記
 * v1.0.0 - 2017/05/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_TransformationState');

    //objのメモ欄に <metacode> があれば真を返す
    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
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
            this._transformName = readObjectMeta(state, ['TFS_変身', 'TFS_TRANSFORM']);
            if (this._transformName) {
                this._transformName = this._transformName.format(this._actor.actorId().padZero(4));
            }
            this._transformWeaponLess = hasObjectMeta(state, ['TFS_武器非表示', 'TFS_WEAPON_LESS']);
            return this._transformName;
        },this);
    };

    //=============================================================================
    // アクターのSV戦闘画像を変える
    //=============================================================================

    var _TFS_Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
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
            _TFS_Sprite_Actor_updateBitmap.call(this);
        }
    };

    //=============================================================================
    // アクターの武器画像を表示させない
    //=============================================================================

    var _TFS_Sprite_Actor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if (this._transformWeaponLess) {
            this._weaponSprite.setup();
        } else {
            _TFS_Sprite_Actor_setupWeaponAnimation.call(this);
        }
    };

}());//EOF