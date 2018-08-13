//=============================================================================
// メニューやショップ画面などに背景画像を設定するプラグイン
// FTKR_SceneBackImages.js
// プラグインNo : 67
// 作成者     : フトコロ
// 作成日     : 2018/02/24
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SBI = true;

var FTKR = FTKR || {};
FTKR.SBI = FTKR.SBI || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 メニューやショップ画面などに背景画像を設定するプラグイン
 * @author フトコロ
 *
 * @param --メニュー画面--
 * @default
 * 
 * @param Menu BackImages
 * @desc メニュー画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Item BackImages
 * @desc アイテム画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Skill BackImages
 * @desc スキル画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Equip BackImages
 * @desc 装備画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Status BackImages
 * @desc ステータス画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Options BackImages
 * @desc オプション画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param Save BackImages
 * @desc セーブ画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param GameEnd BackImages
 * @desc ゲーム終了画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType
 * 
 * @param --ロード画面--
 * @default
 * 
 * @param Load BackImages
 * @desc ロード画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType

 *
 * @param --ショップ画面--
 * @default
 * 
 * @param Shop BackImages
 * @desc ショップ画面の背景を設定します。
 * @type struct<backImage>
 * @default {"images":"[]","variableId":"0"}
 * @parent dataType

 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * メニューやショップ画面などに背景画像を設定することができます。
 * 
 * ※使用する画像は img/picturesフォルダに保存してください。
 * 
 * 
 * 各画面のプラグインパラメータの背景画像<images>を複数設定し
 * 切替変数<variableId>を設定した場合は、切替変数の値に合わせて
 * 表示する背景画像の番号が変わります。
 * 
 * 例）
 * 背景画像<images>のリスト１番に設定した画像は
 * 切替変数の値が１の時に表示します。
 * 
 * 
 * 背景画像を一つも設定しない、または切替変数の値が０かリストにない番号の時は、
 * デフォルトの背景（マップ画面のコピー）になります。
 * 
 * 切替変数を設定しない場合は、背景画像の１番目を表示します。
 * 
 * 
 * なお、以下の画面の画像を設定しない場合、メニュー画面の画像設定が適用されます。
 * ・アイテム画面
 * ・スキル画面
 * ・装備画面
 * ・ステータス画面
 * ・オプション画面
 * ・セーブ画面
 * ・ゲーム終了画面
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
 * v1.0.0 - 2018/02/24 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~backImage:
 * @param images
 * @desc 背景に設定する画像を設定します。複数設定することで、ゲーム中に変数で切り替えられます。
 * @type file[]
 * @default []
 * @require 1
 * @dir img/pictures
 * @parent otherType
 *
 * @param variableId
 * @desc 背景画像を切り替えるための変数IDを設定します。
 * @type variable
 * @default 0
 * @parent database
*/

(function() {

    var parameters = PluginManager.parameters('FTKR_SceneBackImages');

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

    var setPluginBackImages = function(param) {
        param = paramParse(parameters[param]);
        return param instanceof Object ? param : {images:[],variableId:0};
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================

    FTKR.SBI = {
        menu    : setPluginBackImages('Menu BackImages'),
        item    : setPluginBackImages('Item BackImages'),
        skill   : setPluginBackImages('Skill BackImages'),
        equip   : setPluginBackImages('Equip BackImages'),
        status  : setPluginBackImages('Status BackImages'),
        save    : setPluginBackImages('Save BackImages'),
        options : setPluginBackImages('Options BackImages'),
        gameEnd : setPluginBackImages('GameEnd BackImages'),
        load    : setPluginBackImages('Load BackImages'),
        shop    : setPluginBackImages('Shop BackImages'),
    };

    //=============================================================================
    // 共通処理
    //=============================================================================

    Scene_Base.prototype.setBackgoundImage = function(scene) {
        this._backgroundSprite = new Sprite();
        var index = scene.variableId ? $gameVariables.value(scene.variableId) - 1 : 0;
        var bgiName = index >= 0 ? scene.images[index] : null;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadPicture(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_Base.prototype.setSbiParams = function(scene) {
        return Array.isArray(scene.images) && scene.images[0] ? scene : FTKR.SBI.menu;
    };

    Scene_Base.prototype.enabledSceneBackImage = function(scene) {
        return Array.isArray(scene.images) && !scene.images[0];
    };

    //=============================================================================
    // メニュー画面の変更
    //=============================================================================

    var _SBI_Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function() {
        var scene = FTKR.SBI.menu;
        if (this.enabledSceneBackImage(scene)) {
            _SBI_Scene_Menu_createBackground.call(this);
        } else {
            this.setBackgoundImage(scene);
        }
    };

    var _SBI_Scene_Item_createBackground = Scene_Item.prototype.createBackground;
    Scene_Item.prototype.createBackground = function() {
        var menu = this.setSbiParams(FTKR.SBI.item);
        if (this.enabledSceneBackImage(menu)) {
            _SBI_Scene_Item_createBackground.call(this);
        } else {
            this.setBackgoundImage(menu);
        }
    };

    var _SBI_Scene_Skill_createBackground = Scene_Skill.prototype.createBackground;
    Scene_Skill.prototype.createBackground = function() {
        var menu = this.setSbiParams(FTKR.SBI.skill);
        if (this.enabledSceneBackImage(menu)) {
            _SBI_Scene_Skill_createBackground.call(this);
        } else {
            this.setBackgoundImage(menu);
        }
    };

    var _SBI_Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
    Scene_Equip.prototype.createBackground = function() {
        var menu = this.setSbiParams(FTKR.SBI.equip);
        if (this.enabledSceneBackImage(menu)) {
            _SBI_Scene_Equip_createBackground.call(this);
        } else {
            this.setBackgoundImage(menu);
        }
    };

    var _SBI_Scene_Status_createBackground = Scene_Status.prototype.createBackground;
    Scene_Status.prototype.createBackground = function() {
        var menu = this.setSbiParams(FTKR.SBI.status);
        if (this.enabledSceneBackImage(menu)) {
            _SBI_Scene_Status_createBackground.call(this);
        } else {
            this.setBackgoundImage(menu);
        }
    };

    var _SBI_Scene_Options_createBackground = Scene_Options.prototype.createBackground;
    Scene_Options.prototype.createBackground = function() {
        var options = this.setSbiParams(FTKR.SBI.options);
        if (this.enabledSceneBackImage(options)) {
            _SBI_Scene_Options_createBackground.call(this);
        } else {
            this.setBackgoundImage(options);
        }
    };

    var _SBI_Scene_Save_createBackground = Scene_Save.prototype.createBackground;
    Scene_Save.prototype.createBackground = function() {
        var save = this.setSbiParams(FTKR.SBI.save);
        if (this.enabledSceneBackImage(save)) {
            _SBI_Scene_Save_createBackground.call(this);
        } else {
            this.setBackgoundImage(save);
        }
    };

    var _SBI_Scene_GameEnd_createBackground = Scene_GameEnd.prototype.createBackground;
    Scene_GameEnd.prototype.createBackground = function() {
        var menu = this.setSbiParams(FTKR.SBI.gameEnd);
        if (this.enabledSceneBackImage(menu)) {
            _SBI_Scene_GameEnd_createBackground.call(this);
        } else {
            this.setBackgoundImage(menu);
            this.setBackgroundOpacity(128);
        }
    };

    //=============================================================================
    // ロード画面の変更
    //=============================================================================

    var _SBI_Scene_Load_createBackground = Scene_Load.prototype.createBackground;
    Scene_Load.prototype.createBackground = function() {
        var load = FTKR.SBI.load;
        if (this.enabledSceneBackImage(load)) {
            _SBI_Scene_Load_createBackground.call(this);
        } else {
            this.setBackgoundImage(load);
        }
    };

    //=============================================================================
    // ショップ画面の変更
    //=============================================================================

    var _SBI_Scene_Shop_createBackground = Scene_Shop.prototype.createBackground;
    Scene_Shop.prototype.createBackground = function() {
        var shop = FTKR.SBI.shop;
        if (this.enabledSceneBackImage(shop)) {
            _SBI_Scene_Shop_createBackground.call(this);
        } else {
            this.setBackgoundImage(shop);
        }
    };

}());//EOF
