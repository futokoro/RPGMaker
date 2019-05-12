//=============================================================================
// ショップ画面のステータスレイアウトを変更するプラグイン
// FTKR_CSS_ShopStatus.js
// プラグインNo : 52
// 作成者     : フトコロ
// 作成日     : 2017/07/23
// 最終更新日 : 2019/05/12
// バージョン : v2.3.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_SpS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.SpS = FTKR.CSS.SpS || {};

//=============================================================================
/*:
 * @plugindesc v2.3.0 ショップ画面のステータスレイアウトを変更する
 * @author フトコロ
 *
 * @param --共通レイアウト設定--
 * @desc 
 * 
 * @param commonStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"text(%1)\",\"value\":\"\\\\c[16]持っている数\",\"x\":\"0\",\"y\":\"0\",\"width\":\"162\"}","{\"text\":\"inumber\",\"value\":\"\",\"x\":\"162\",\"y\":\"0\",\"width\":\"162\"}"]
 * 
 * @param Common Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --武器のレイアウト設定--
 * @desc 
 * 
 * @param weaponStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"name\",\"value\":\"\",\"x\":\"0\",\"y\":\"0\",\"width\":\"162\"}","{\"text\":\"eparam(%1)\",\"value\":\"2\",\"x\":\"162\",\"y\":\"0\",\"width\":\"162\"}","{\"text\":\"equip(%1)\",\"value\":\"shop\",\"x\":\"0\",\"y\":\"36\",\"width\":\"324\"}"]
 * 
 * @param Weapon Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --防具のレイアウト設定--
 * @desc 
 * 
 * @param armorStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"name\",\"value\":\"\",\"x\":\"0\",\"y\":\"0\",\"width\":\"162\"}","{\"text\":\"eparam(%1)\",\"value\":\"3\",\"x\":\"162\",\"y\":\"0\",\"width\":\"162\"}","{\"text\":\"equip(%1)\",\"value\":\"shop\",\"x\":\"0\",\"y\":\"36\",\"width\":\"324\"}"]
 * 
 * @param Armor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --武器防具以外のレイアウト設定--
 * @desc 
 * 
 * @param itemStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default []
 * 
 * @param Item Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --共通ウィンドウ設定--
 * @desc 
 * 
 * @param Common Number Visible Rows
 * @desc ステータスウィンドウの縦の行数
 * @default 1
 * 
 * @param Common Font Size
 * @desc フォントサイズ
 * @default 28
 * 
 * @param Common Window Padding
 * @desc ウィンドウの周囲の余白
 * @default 18
 * 
 * @param Common Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * 
 * @param Common Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @default 192
 * 
 * @param Common Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @param --アイテム別のウィンドウ設定--
 * @desc 
 * 
 * @param Item Number Visible Rows
 * @desc ステータスウィンドウの縦の行数
 * @default 8
 * 
 * @param Item Page Size
 * @desc 表示するアクターの数
 * @default 4
 * 
 * @param Item Actor Status Rows
 * @desc アクター毎の縦の行数
 * @default 2
 * 
 * @param Item Height Space
 * @desc アクター毎の間隔
 * @default 5
 * 
 * @param Item Font Size
 * @desc フォントサイズ
 * @default 28
 * 
 * @param Item Window Padding
 * @desc ウィンドウの周囲の余白
 * @default 18
 * 
 * @param Item Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * 
 * @param Item Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @default 192
 * 
 * @param Item Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、ショップ画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_ShopStatus.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_CSS_ShopStatus.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * ショップ画面のステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、ショップ画面で表示する
 * ステータスの表示レイアウトを変更することができます。
 * 
 * ステータスの表示内容は、武器、防具、アイテムカテゴリー毎に設定します。
 * 
 * なお、共通レイアウトはどのカテゴリーでも共通して表示するステータスです。
 * 
 * 
 * 各パラメータの意味と、設定方法は、
 * FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。
 * 
 * なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
 * 設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * CSS表示コードの追加
 *-----------------------------------------------------------------------------
 * 本プラグインにより以下の表示コードを使用できます。
 * 
 * 1. カーソルで選択中の装備をしたときのパラメータ差分
 *    :ediff(x)
 *    : 指定した x の値に従い、下記のパラメータの差分を表示します。
 *    : 0 - 最大HP、1 - 最大MP、2 - 攻撃力、3 - 防御力、4 - 魔法攻撃、
 *    : 5 - 魔法防御、6 - 敏捷性、7 - 運
 * 
 * 
 * 2. カーソルで選択中の装備をしたときのAOPパラメータ差分
 *    :ediffaop(x)
 *    : 指定した x の値に従い、AOPパラメータの差分を表示します。
 *    : AOPパラメータとは、FTKR_AddOriginalParameters.js により作成した
 *    : オリジナルパラメータのことです。
 *    : x は　オリジナルパラメータIDを指定してください。
 * 
 * 
 * 3. カーソルで選択中のアイテムの画像表示
 *    :itemimage(x)
 *    : アイテムのメモ欄で設定した画像id x を表示します。
 *    : 設定方法は、FTKR_CustomSimpleActorStatus.jsのカスタム画像コードを
 *    : 参照してください。
 * 
 *-----------------------------------------------------------------------------
 * ステータスウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enabled Custom Window>
 *    :スキル画面のウィンドウ変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Number Visible Rows>
 *    :ステータスウィンドウの縦の行数を変更します。
 *    :共通ウィンドウのデフォルトは1行です。
 *    :アイテム別ウィンドウのデフォルトは8行です。
 * 
 * <Font Size>
 *    :ウィンドウ内のフォントサイズを変更します。
 *    :デフォルトは 28 です。(単位はpixel)
 * 
 * <Window Padding>
 *    :ウィンドウの周囲の余白を変更します。
 *    :デフォルトは 18 です。(単位はpixel)
 * 
 * <Window Line Height>
 *    :ウィンドウ内の1行の高さを変更します。
 *    :デフォルトは 36 です。(単位はpixel)
 * 
 * <Window Opacity>
 *    :ウィンドウ内の背景の透明度を変更します。
 *    :デフォルトは 192 です。
 *    :0 - 透明、255 - 不透明
 * 
 * <Hide Window Frame>
 *    :ウィンドウ枠を非表示にするか指定します。
 *    :1 - 非表示にする、0 - 表示する
 *    :デフォルトは表示します。
 * 
 * 
 * ＜ウィンドウの高さ＞
 * ウィンドウの高さは、以下の計算式で算出します。
 *    [ウィンドウ高さ] ＝ [縦の行数] × [1行の高さ] + [余白のサイズ] × 2
 * 
 * 
 * ＜フォントサイズと行の高さ＞
 * 基本的に、下の大小関係になるように設定しましょう。
 *    フォントサイズ ＜ 1行の高さ
 * 
 * 
 * ＜ウィンドウを消す方法＞
 * 以下の設定にすると、ウィンドウ枠とウィンドウの背景が消えて
 * アクターのステータスだけを表示します。
 * 
 * <Window Opacity>     : 0
 * <Hide Window Frame>  : 1
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v2.3.0 - 2019/05/12 : FTKR_CustomSimpleActorStatus の v3.5.3 に対応
 *    1. プラグインパラメータの初期値を変更。
 * 
 * v2.2.2 - 2018/12/27 : 不具合修正
 *    1. 武器防具のアイテム用パラメータのコードが正しく反映されない不具合を修正。
 * 
 * v2.2.1 - 2018/12/13 : プラグインパラメータstatusListの初期値変更
 * 
 * v2.2.0 - 2018/10/10 : 仕様変更
 *    1. ediff(x)およびediffaop(x)のコードをFTKR_CustomSimpleActorStatusに移動。
 * 
 * v2.1.2 - 2018/09/29 : 機能追加
 *    1. プラグインパラメータのリストで選択できる項目を追加。
 * 
 * v2.1.1 - 2018/09/19 : 不具合修正
 *    1. 武器防具以外のパラメータ表示コードの一部が正しく反映されない不具合を修正。
 * 
 * v2.1.0 - 2018/08/30 : 機能追加
 *    1. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。
 * 
 * v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更
 * 
 * v1.2.2 - 2017/12/02 : 不具合修正
 *    1. GraphicalDesignMode.jsがないとエラーで立ち上がらない不具合を修正。
 * 
 * v1.2.1 - 2017/11/14 : 不具合修正
 *    1. GraphicalDesignMode.jsのレイアウト変更が一部反映されない不具合を修正。
 * 
 * v1.2.0 - 2017/11/08 : 機能追加
 *    1. GraphicalDesignMode.jsとFTKR_CSS_GDM.jsにより、デザインモード中に
 *       ゲーム内でレイアウトを変更する機能を追加。
 * 
 * v1.1.1 - 2017/11/01 : 不具合修正
 *    1. 装備のパラメータが正しく表示できない場合がある不具合を修正。
 * 
 * v1.1.0 - 2017/08/22 : 機能追加
 *    1. カーソル選択中のアイテムの画像を表示するコードを追加。
 * 
 * v1.0.0 - 2017/07/23 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~status:
 * @param text
 * @desc 表示するステータスを選択
 * リストにない場合は、直接テキストで記述
 * @default 
 * @type select
 * @option 名前
 * @value name
 * @option 二つ名
 * @value nickname
 * @option 職業
 * @value class
 * @option レベル
 * @value level
 * @option HP
 * @value hp
 * @option MP
 * @value mp
 * @option TP
 * @value tp
 * @option 顔画像
 * @value face
 * @option 顔画像(サイズ指定)
 * @value face(%1)
 * @option 歩行キャラ画像
 * @value chara
 * @option SV戦闘キャラ画像
 * @value sv
 * @option ステート(横)
 * @value state
 * @option ステート(縦)
 * @value state2(%1)
 * @option プロフィール
 * @value profile
 * @option 通常能力値
 * @value param(%1)
 * @option 通常能力値(素)
 * @value pbase(%1)
 * @option 通常能力値(増加分)
 * @value pdiff(%1)
 * @option 追加能力値
 * @value xparam(%1)
 * @option 特殊能力値
 * @value sparam(%1)
 * @option 装備
 * @value equip(%1)
 * @option 装備通常能力値
 * @value eparam(%1)
 * @option 装備追加能力値
 * @value exparam(%1)
 * @option 装備特殊能力値
 * @value esparam(%1)
 * @option 装備通常能力値差分
 * @value ediff(%1)
 * @option 装備追加能力値差分
 * @value exdiff(%1)
 * @option 装備特殊能力値差分
 * @value esdiff(%1)
 * @option 装備不可表示
 * @value notequip(%1)
 * @option カスタムパラメータ
 * @value custom(%1)
 * @option カスタムゲージ
 * @value gauge(%1)
 * @option アクター別カスタムゲージ
 * @value agauge(%1)
 * @option クラス別カスタムゲージ
 * @value cgauge(%1)
 * @option カスタム画像
 * @value image
 * @option カスタム画像(登録ID)
 * @value image(%1)
 * @option メッセージ
 * @value message
 * @option テキスト
 * @value text(%1)
 * @option JS計算式(数値表示)
 * @value eval(%1)
 * @option JS計算式(文字列表示)
 * @value streval(%1)
 * @option 横線
 * @value line
 * @option AOP能力値
 * @value aop(%1)
 * @option AOP能力値(素)
 * @value aopbase(%1)
 * @option AOP能力値(増加分)
 * @value aopdiff(%1)
 * @option AOP装備パラメータ
 * @value eaop(%1)
 * @option AOP装備パラメータ差分
 * @value ediffaop(%1)
 * @option アイテム名
 * @value iname
 * @option アイテムアイコン
 * @value iicon
 * @option アイテム説明
 * @value idesc
 * @option アイテムタイプ
 * @value itype
 * @option アイテム装備タイプ
 * @value ietype
 * @option アイテム範囲
 * @value iscope
 * @option アイテム属性
 * @value ielement
 * @option アイテム設定詳細
 * @value iparam(%1)
 * @option アイテムカスタム画像
 * @value iimage(%1)
 * @option アイテム所持数
 * @value inumber
 * @option マップ名
 * @value mapname
 *
 * @param value
 * @desc code(%1)の形式で設定するステータスの%1の内容を入力
 * @default 
 * 
 * @param x
 * @desc 表示するX座標
 * @default 0
 *
 * @param y
 * @desc 表示するY座標
 * @default 0
 *
 * @param width
 * @desc 表示する幅
 * @default 0
 *
 */

function Window_ShopItemStatus() {
  this.initialize.apply(this, arguments);
}

function Window_ShopWeaponStatus() {
  this.initialize.apply(this, arguments);
}

function Window_ShopArmorStatus() {
  this.initialize.apply(this, arguments);
}

if (Imported.FTKR_CSS) (function() {

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
    var parameters = PluginManager.parameters('FTKR_CSS_ShopStatus');

    //簡易ステータスオブジェクト
    FTKR.CSS.SpS.comStatus = {
        statusList : paramParse(parameters['commonStatusList']),
        spaceIn   :Number(parameters['Common Status Space In Text'] || 0),
        target    :null,
    };

    FTKR.CSS.SpS.itemStatus = {
        statusList : paramParse(parameters['itemStatusList']),
        spaceIn   :Number(parameters['Item Status Space In Text'] || 0),
        target    :null,
    };

    FTKR.CSS.SpS.weaponStatus = {
        statusList : paramParse(parameters['weaponStatusList']),
        spaceIn   :Number(parameters['Weapon Status Space In Text'] || 0),
        target    :null,
    };

    FTKR.CSS.SpS.armorStatus = {
        statusList : paramParse(parameters['armorStatusList']),
        spaceIn   :Number(parameters['Armor Status Space In Text'] || 0),
        target    :null,
    };

    FTKR.CSS.SpS.comWindow = {
        numVisibleRows:Number(parameters['Common Number Visible Rows'] || 0),
        fontSize      :Number(parameters['Common Font Size'] || 0),
        padding       :Number(parameters['Common Window Padding'] || 0),
        lineHeight    :Number(parameters['Common Window Line Height'] || 0),
        opacity       :Number(parameters['Common Window Opacity'] || 0),
        hideFrame     :Number(parameters['Common Hide Window Frame'] || 0),
    };

    FTKR.CSS.SpS.itemWindow = {
        enabled       :true,
        numVisibleRows:Number(parameters['Item Number Visible Rows'] || 0),
        maxCols       :Number(parameters['Item Page Size'] || 0),
        actorRows     :Number(parameters['Item Actor Status Rows'] || 0),
        fontSize      :Number(parameters['Item Font Size'] || 0),
        padding       :Number(parameters['Item Window Padding'] || 0),
        lineHeight    :Number(parameters['Item Window Line Height'] || 0),
        opacity       :Number(parameters['Item Window Opacity'] || 0),
        hideFrame     :Number(parameters['Item Hide Window Frame'] || 0),
        hspace        :Number(parameters['Item Height Space'] || 0),
    };

    //=============================================================================
    // CSS表示コードを追加
    //=============================================================================

    var _SpS_Window_Base_drawCssActorStatusBase_A1 = Window_Base.prototype.drawCssActorStatusBase_A1;
    Window_Base.prototype.drawCssActorStatusBase_A1 = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'ITEMIMAGE':
                return this.drawCssItemImage(actor, x, y, width, match[2], lss);
        }
        return _SpS_Window_Base_drawCssActorStatusBase_A1.call(this, index, actor, x, y, width, match, lss, css);
    };

    Window_Base.prototype.drawCssItemImage = function(actor, dx, dy, width, id, lss) {
        var item = FTKR.gameData.item || lss.item;
        if (!item || !item.cssbgi) return 1;
        id = id || 0;
        var bgi = item.cssbgi[id];
        if (!bgi) return 1;
        var bitmap = ImageManager.loadPicture(bgi.name);
        if (!bitmap) return 1;
        var sw = bgi.width || bitmap.width;
        var sh = bgi.height || bitmap.height;
        var sx = bgi.offsetX || 0;
        var sy = bgi.offsetY || 0;

        var dh = sh * bgi.scale / 100;
        var dw = sw * bgi.scale / 100;
        var offsetX = FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        return Math.ceil(dh / this.lineHeight()) || 1;
    };

    //=============================================================================
    // Window_ShopStatus
    //=============================================================================

    var _SpS_Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
        height = this.fittingHeight(this.numVisibleRows());
        _SpS_Window_ShopStatus_initialize.call(this, x, y, width, height);
    };

    Window_ShopStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.SpS.comStatus;
    };

    Window_ShopStatus.prototype.standardCssLayout = function() {
        return FTKR.CSS.SpS.comWindow;
    };

    Window_ShopStatus.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalStrFormula(formula);
    };

    Window_ShopStatus.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalFormula(formula);
    };

    Window_ShopStatus.prototype.checkShowEquipParam = function(actor, target) {
        var item = this._item;
        return !!target && item && actor.canEquip(item);
    };

    //書き換え
    Window_ShopStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            lss.item = this._item;
            this.drawCssActorStatus(0, null, 0, 0, w, h, lss);
        }
    };

    //書き換え
    //ウィンドウの行数
    Window_ShopStatus.prototype.numVisibleRows = function() {
        return FTKR.CSS.SpS.comWindow.numVisibleRows;
    };

    //=============================================================================
    // Window_ShopBuy
    //=============================================================================

    Window_ShopBuy.prototype.showItemstatusWindows = function(item) {
        if (DataManager.isWeapon(item)) {
            this._itemStatusWindow.hide();
            this._weaponStatusWindow.show();
            this._armorStatusWindow.hide();
        } else if (DataManager.isArmor(item)) {
            this._itemStatusWindow.hide();
            this._weaponStatusWindow.hide();
            this._armorStatusWindow.show();
        } else {
            this._itemStatusWindow.show();
            this._weaponStatusWindow.hide();
            this._armorStatusWindow.hide();
        }
    };

    Window_ShopBuy.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this.index() >= 0 && this._itemStatusWindow) this.showItemstatusWindows(this.item())
    };

    Window_ShopBuy.prototype.setItemStatusWindow = function(statusWindow) {
        this._itemStatusWindow = statusWindow;
        this.callUpdateHelp();
    };

    Window_ShopBuy.prototype.setWeaponStatusWindow = function(statusWindow) {
        this._weaponStatusWindow = statusWindow;
        this.callUpdateHelp();
    };

    Window_ShopBuy.prototype.setArmorStatusWindow = function(statusWindow) {
        this._armorStatusWindow = statusWindow;
        this.callUpdateHelp();
    };

    var _SpS_Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
    Window_ShopBuy.prototype.updateHelp = function() {
        _SpS_Window_ShopBuy_updateHelp.call(this);
        if (this._itemStatusWindow) {
            this._itemStatusWindow.setItem(this.item());
        }
        if (this._weaponStatusWindow) {
            this._weaponStatusWindow.setItem(this.item());
        }
        if (this._armorStatusWindow) {
            this._armorStatusWindow.setItem(this.item());
        }
    };

    //=============================================================================
    // Window_ShopItemStatus
    // アイテムステータスウィンドウ
    //=============================================================================

    Window_ShopItemStatus.prototype = Object.create(Window_Base.prototype);
    Window_ShopItemStatus.prototype.constructor = Window_ShopItemStatus;

    Window_ShopItemStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._actor = null;
        this._tempActor = null;
        this._pageIndex = 0;
        this.refresh();
    };

    Window_ShopItemStatus.prototype.initCssLayout = function() {
        Window_Base.prototype.initCssLayout.call(this);
        var lss = this.standardCssLayout();
        if (lss) {
            this._css_maxCols = lss.maxCols;
            this._css_cursorHeight = lss.actorRows;
            this._css_hSpace = lss.hspace;
        }
    };

    Window_ShopItemStatus.prototype.standardCssLayout = function() {
        return FTKR.CSS.SpS.itemWindow;
    };

    Window_ShopItemStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.SpS.itemStatus;
    };

    Window_ShopItemStatus.prototype.actorRows = function() {
        return this._css_cursorHeight ?
            this._css_cursorHeight : FTKR.CSS.SpS.itemWindow.actorRows;
    };

    Window_ShopItemStatus.prototype.pageSize = function() {
        return this._css_maxCols ? this._css_maxCols :
            FTKR.CSS.SpS.itemWindow.maxCols;
    };

    Window_ShopItemStatus.prototype.heightSpace = function() {
        return this._css_hSpace ? this._css_hSpace :
            FTKR.CSS.SpS.itemWindow.hspace;
    };

    Window_ShopItemStatus.prototype.setTempActor = function(actor) {
        var tempActor = JsonEx.makeDeepCopy(actor);
        tempActor.forceChangeEquip(this._item.etypeId - 1, this._item);
        this._tempActor = tempActor;
    };

    Window_ShopItemStatus.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, this._tempActor, this._item);
        return FTKR.evalStrFormula(formula);
    };

    Window_ShopItemStatus.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, this._tempActor, this._item);
        return FTKR.evalFormula(formula);
    };

    Window_ShopItemStatus.prototype.checkShowEquipParam = function(actor, target) {
        var item = this._item;
        return !!target && item && actor.canEquip(item);
    };

    Window_ShopItemStatus.prototype.drawItem = function(index, w, h) {
        var lss = this._lssStatus;
        var actor = $gameParty.members()[index];
        this.setTempActor(actor);
        var lineHeight = this.lineHeight() + this.heightSpace();
        var y = lineHeight * this.actorRows() * (index % this.pageSize());
        lss.target = this._tempActor;
        lss.item = this._item;
        this.drawCssActorStatus(index, actor, 0, y, w, h, lss);
    };

    Window_ShopItemStatus.prototype.topIndex = function() {
        return this._pageIndex * this.pageSize();
    };

    Window_ShopItemStatus.prototype.drawAllItems = function(w, h) {
        var topIndex = this.topIndex();
        for (var i = 0; i < this.pageSize(); i++) {
            var index = topIndex + i;
            if (index < $gameParty.members().length) {
                this.drawItem(index, w, h);
            } else {
                this.clearCssSprite(index % this.pageSize());
            }
        }
    };

    Window_ShopItemStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            if (!this.isEquipItem()) {
                var lss = this._lssStatus;
                lss.item = this._item;
                var actor = $gameParty.members()[0];
                this.drawCssActorStatus(0, actor, 0, 0, w, h, lss);
            }
        }
    };

    Window_ShopItemStatus.prototype.setItem = function(item) {
        this._item = item;
        this.refresh();
    };

    Window_ShopItemStatus.prototype.isEquipItem = function() {
        return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
    };

    Window_ShopItemStatus.prototype.maxPages = function() {
        return Math.floor(($gameParty.size() + this.pageSize() - 1) / this.pageSize());
    };

    Window_ShopItemStatus.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updatePage();
    };

    Window_ShopItemStatus.prototype.updatePage = function() {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };

    Window_ShopItemStatus.prototype.isPageChangeEnabled = function() {
        return this.visible && this.maxPages() >= 2;
    };

    Window_ShopItemStatus.prototype.isPageChangeRequested = function() {
        if (Input.isTriggered('shift')) {
            return true;
        }
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            return true;
        }
        return false;
    };

    Window_ShopItemStatus.prototype.isTouchedInsideFrame = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Window_ShopItemStatus.prototype.changePage = function() {
        this._pageIndex = (this._pageIndex + 1) % this.maxPages();
        this.refresh();
        SoundManager.playCursor();
    };

    //書き換え
    //ウィンドウの行数
    Window_ShopItemStatus.prototype.numVisibleRows = function() {
        return FTKR.CSS.SpS.itemWindow.numVisibleRows;
    };

    //=============================================================================
    // Window_ShopWeaponStatus
    // 武器ステータスウィンドウ
    //=============================================================================

    Window_ShopWeaponStatus.prototype = Object.create(Window_ShopItemStatus.prototype);
    Window_ShopWeaponStatus.prototype.constructor = Window_ShopWeaponStatus;

    Window_ShopWeaponStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.SpS.weaponStatus;
    };

    Window_ShopWeaponStatus.prototype.initialize = function(x, y, width, height) {
        Window_ShopItemStatus.prototype.initialize.apply(this, arguments);
        if (typeof $dataContainerProperties !== 'undefined') {
            if(this.pageSize) this._customCssMaxCols = this.pageSize();
            if(this.actorRows) this._customCssCursorHeight = this.actorRows();
            if(this.heightSpace) this._customCssHSpace = this.heightSpace();
        }
    };

    Window_ShopWeaponStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            if (this.isEquipItem()) {
                this.drawAllItems(w, h);
            }
        }
    };
    
    //=============================================================================
    // Window_ShopArmorStatus
    // 防具ステータスウィンドウ
    //=============================================================================

    Window_ShopArmorStatus.prototype = Object.create(Window_ShopWeaponStatus.prototype);
    Window_ShopArmorStatus.prototype.constructor = Window_ShopArmorStatus;

    Window_ShopArmorStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.SpS.armorStatus;
    };

    //=============================================================================
    // Scene_Shop
    //=============================================================================
    var _SpS_Scene_Shop_prepare = Scene_Shop.prototype.prepare;
    Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
        _SpS_Scene_Shop_prepare.call(this, goods, purchaseOnly);
        this._goods.forEach(function(goods) {
            var item = null;
            switch (goods[0]) {
            case 0:
                item = $dataItems[goods[1]];
                break;
            case 1:
                item = $dataWeapons[goods[1]];
                break;
            case 2:
                item = $dataArmors[goods[1]];
                break;
            }
            if (item) {
                item.cssbgi.forEach(function(bgi){
                    ImageManager.loadPicture(bgi.name);
                });
            }
        }, this);
    };
  
    //書き換え
    Scene_Shop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createNumberWindow();
        this.createStatusWindow();
        this.createItemStatusWindow();
        this.createWeaponStatusWindow();
        this.createArmorStatusWindow();
        this.createBuyWindow();
        this.createCategoryWindow();
        this.createSellWindow();
    };

    Scene_Shop.prototype.createItemStatusWindow = function() {
        var wx = this._numberWindow.width;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var ww = Graphics.boxWidth - wx;
        var wh = Graphics.boxHeight - wy;
        this._itemStatusWindow = new Window_ShopItemStatus(wx, wy, ww, wh);
        this._itemStatusWindow.hide();
        this.addWindow(this._itemStatusWindow);
    };

    Scene_Shop.prototype.createWeaponStatusWindow = function() {
        var wx = this._numberWindow.width;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var ww = Graphics.boxWidth - wx;
        var wh = Graphics.boxHeight - wy;
        this._weaponStatusWindow = new Window_ShopWeaponStatus(wx, wy, ww, wh);
        this._weaponStatusWindow.hide();
        this.addWindow(this._weaponStatusWindow);
    };

    Scene_Shop.prototype.createArmorStatusWindow = function() {
        var wx = this._numberWindow.width;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var ww = Graphics.boxWidth - wx;
        var wh = Graphics.boxHeight - wy;
        this._armorStatusWindow = new Window_ShopArmorStatus(wx, wy, ww, wh);
        this._armorStatusWindow.hide();
        this.addWindow(this._armorStatusWindow);
    };

    var _SpS_Scene_Shop_createBuyWindow = Scene_Shop.prototype.createBuyWindow;
    Scene_Shop.prototype.createBuyWindow = function() {
        _SpS_Scene_Shop_createBuyWindow.call(this);
        this._buyWindow.setItemStatusWindow(this._itemStatusWindow);
        this._buyWindow.setWeaponStatusWindow(this._weaponStatusWindow);
        this._buyWindow.setArmorStatusWindow(this._armorStatusWindow);
    };

    Scene_Shop.prototype.showItemstatusWindows = function(item) {
        if (DataManager.isWeapon(item)) {
            this._weaponStatusWindow.show();
        } else if (DataManager.isArmor(item)) {
            this._armorStatusWindow.show();
        } else {
            this._itemStatusWindow.show();
        }
    };

    Scene_Shop.prototype.hideItemstatusWindows = function() {
        this._itemStatusWindow.hide();
        this._weaponStatusWindow.hide();
        this._armorStatusWindow.hide();
    };

    Scene_Shop.prototype.setItemstatusWindows = function(item) {
        this._itemStatusWindow.setItem(item);
        this._weaponStatusWindow.setItem(item);
        this._armorStatusWindow.setItem(item);
    };

    Scene_Shop.prototype.clearItemstatusWindows = function() {
        this._itemStatusWindow.setItem(null);
        this._weaponStatusWindow.setItem(null);
        this._armorStatusWindow.setItem(null);
    };

    Scene_Shop.prototype.refreshItemstatusWindows = function() {
        this._itemStatusWindow.refresh();
        this._weaponStatusWindow.refresh();
        this._armorStatusWindow.refresh();
    };

    var _SpS_Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
    Scene_Shop.prototype.activateBuyWindow = function() {
        _SpS_Scene_Shop_activateBuyWindow.call(this);
        this.showItemstatusWindows(this._buyWindow.item());
    };

    var _SpS_Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
    Scene_Shop.prototype.activateSellWindow = function() {
        _SpS_Scene_Shop_activateSellWindow.call(this);
        this.hideItemstatusWindows();
    };

    var _SpS_Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
    Scene_Shop.prototype.onBuyCancel = function() {
        _SpS_Scene_Shop_onBuyCancel.call(this);
        this.hideItemstatusWindows();
        this.clearItemstatusWindows();
    };

    var _SpS_Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        _SpS_Scene_Shop_onSellOk.call(this);
        this.setItemstatusWindows(this._item);
        this.showItemstatusWindows(this._item);
    };

    var _SpS_Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
    Scene_Shop.prototype.onSellCancel = function() {
        _SpS_Scene_Shop_onSellCancel.call(this);
        this.clearItemstatusWindows();
    };

    var _SpS_Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
    Scene_Shop.prototype.onNumberOk = function() {
        _SpS_Scene_Shop_onNumberOk.call(this);
        this.refreshItemstatusWindows();
    };

}());//FTKR_CustomSimpleActorStatus.jsが必要