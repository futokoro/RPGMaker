//=============================================================================
// 詳細ステータス画面の表示内容を変更するプラグイン
// FTKR_CSS_DetailedStatus.js
// プラグインNo : 27
// 作成者     : フトコロ
// 作成日     : 2017/04/21
// 最終更新日 : 2018/08/19
// バージョン : v2.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_DS = true;

var FTKR = FTKR || {};
FTKR.CSS.DS = FTKR.CSS.DS || {};

//=============================================================================
/*:
 * @plugindesc v2.0.0 詳細ステータス画面の表示内容を変更するプラグイン
 * @author フトコロ
 *
 * @param --詳細ステータスの表示設定--
 * @default
 * 
 * @param statusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"name\",\"x\":\"6\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"class\",\"x\":\"192\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"nickname\",\"x\":\"432\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"line\",\"x\":\"0\",\"y\":\"36\",\"width\":\"width\"}","{\"text\":\"face\",\"x\":\"12\",\"y\":\"72\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"204\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"204\",\"y\":\"108\",\"width\":\"150\"}","{\"text\":\"hp\",\"x\":\"204\",\"y\":\"144\",\"width\":\"150\"}","{\"text\":\"mp\",\"x\":\"204\",\"y\":\"180\",\"width\":\"150\"}","{\"text\":\"custom(0)\",\"x\":\"456\",\"y\":\"72\",\"width\":\"270\"}","{\"text\":\"custom(1)\",\"x\":\"456\",\"y\":\"108\",\"width\":\"270\"}","{\"text\":\"custom(2)\",\"x\":\"456\",\"y\":\"144\",\"width\":\"270\"}","{\"text\":\"custom(3)\",\"x\":\"456\",\"y\":\"180\",\"width\":\"270\"}","{\"text\":\"line\",\"x\":\"0\",\"y\":\"line*6\",\"width\":\"width\"}","{\"text\":\"param(2)\",\"x\":\"48\",\"y\":\"line*7\",\"width\":\"160\"}","{\"text\":\"param(3)\",\"x\":\"48\",\"y\":\"line*8\",\"width\":\"160\"}","{\"text\":\"param(4)\",\"x\":\"48\",\"y\":\"line*9\",\"width\":\"160\"}","{\"text\":\"param(5)\",\"x\":\"48\",\"y\":\"line*10\",\"width\":\"160\"}","{\"text\":\"param(6)\",\"x\":\"48\",\"y\":\"line*11\",\"width\":\"160\"}","{\"text\":\"param(7)\",\"x\":\"48\",\"y\":\"line*12\",\"width\":\"160\"}","{\"text\":\"equip(0)\",\"x\":\"432\",\"y\":\"line*7\",\"width\":\"312\"}","{\"text\":\"equip(1)\",\"x\":\"432\",\"y\":\"line*8\",\"width\":\"312\"}","{\"text\":\"equip(2)\",\"x\":\"432\",\"y\":\"line*9\",\"width\":\"312\"}","{\"text\":\"equip(3)\",\"x\":\"432\",\"y\":\"line*10\",\"width\":\"312\"}","{\"text\":\"equip(4)\",\"x\":\"432\",\"y\":\"line*11\",\"width\":\"312\"}","{\"text\":\"equip(5)\",\"x\":\"432\",\"y\":\"line*12\",\"width\":\"312\"}","{\"text\":\"equip(0)\",\"x\":\"432\",\"y\":\"line*7\",\"width\":\"312\"}","{\"text\":\"line\",\"x\":\"0\",\"y\":\"line*13\",\"width\":\"width\"}","{\"text\":\"profile\",\"x\":\"0\",\"y\":\"line*14\",\"width\":\"width\"}"]
 * 
 * @param DS Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --ウィンドウ設定--
 * @desc 
 * 
 * @param Enabled Custom Window
 * @desc ウィンドウのレイアウト変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 0
 * 
 * @param Number Visible Rows
 * @desc ステータスウィンドウの縦の行数
 * @default 16
 * 
 * @param Font Size
 * @desc フォントサイズ
 * @default 28
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白
 * @default 18
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @default 192
 * 
 * @param Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、詳細ステータス画面のレイアウトを変更できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインを動作させるためには、
 *    FTKR_CustomSimpleActorStatus.js(v3.0.0以降)が必要です。
 *    本プラグインは、FTKR_CustomSimpleActorStatus.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの詳細ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、ステータス画面で表示する表示レイアウトを
 * 変更することができます。
 * 
 * 各パラメータの意味と、設定方法は、
 * FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。
 * 
 * なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
 * 設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。
 * 
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
 *    :デフォルトは16行です。
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更
 * 
 * v1.1.0 - 2017/11/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。
 * 
 * v1.0.2 - 2017/05/13 : 不具合修正
 *    1. ウィンドウ設定が正常に機能していない不具合を修正。
 * 
 * v1.0.1 - 2017/05/08 : 機能追加、不要なパラメータを削除
 *    1. ウィンドウの設定変更機能を追加。
 * 
 * v1.0.0 - 2017/04/21 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================
/*~struct~status:
 * @param text
 * @desc 表示するステータス
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
if (Imported.FTKR_CSS) (function(){
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
    var parameters = PluginManager.parameters('FTKR_CSS_DetailedStatus');

    //詳細ステータスオブジェクト
    FTKR.CSS.DS.detailedStatus = {
        statusList : paramParse(parameters['statusList']),
        spaceIn    : Number(parameters['DS Space In Text'] || 0),
    };

    FTKR.CSS.DS.window = {
        enabled       :Number(parameters['Enabled Custom Window'] || 0),
        numVisibleRows:Number(parameters['Number Visible Rows'] || 0),
        fontSize      :Number(parameters['Font Size'] || 0),
        padding       :Number(parameters['Window Padding'] || 0),
        lineHeight    :Number(parameters['Window Line Height'] || 0),
        opacity       :Number(parameters['Window Opacity'] || 0),
        hideFrame     :Number(parameters['Hide Window Frame'] || 0),
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    //=============================================================================
    // Window_Status
    // ステータス画面のステータスウィンドウの表示クラス
    //=============================================================================

    //書き換え
    Window_Status.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, FTKR.CSS.DS.detailedStatus);
        }
    };

    Window_Status.prototype.standardCssLayout = function() {
        return FTKR.CSS.DS.window;
    };

    //ウィンドウの行数
    var _DS_Window_Status_numVisibleRows = Window_Status.prototype.numVisibleRows;
    Window_Status.prototype.numVisibleRows = function() {
        return FTKR.CSS.DS.window.enable ? FTKR.CSS.DS.window.numVisibleRows :
        _DS_Window_Status_numVisibleRows.call(this);
    };

}());//TKR_CustomSimpleActorStatus.jsが必要
/*
//=============================================================================
// GraphicalDesignMode.jsに対応
// 
//=============================================================================
if (typeof $dataContainerProperties !== 'undefined') (function() {
  
    //=============================================================================
    // Window_Status
    // ステータス画面のステータスウィンドウの表示クラス
    //=============================================================================

    //書き換え
    Window_Status.prototype.refresh = function() {
    };

    //=============================================================================
    // Window_StatusArea
    // ステータス画面の表示エリアごとのステータスウィンドウの表示クラス
    //=============================================================================

    function Window_StatusArea() {
        this.initialize.apply(this, arguments);
    }

    Window_StatusArea.prototype = Object.create(Window_Status.prototype);
    Window_StatusArea.prototype.constructor = Window_StatusArea;
    
    Window_StatusArea.prototype.initialize = function(x, y, width, height, lss) {
        this._lssStatus = lss;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this.refresh();
    };

    Window_StatusArea.prototype.standardCssStatus = function() {
        return this._lssStatus;
    };

    Window_StatusArea.prototype.standardPadding = function() {
        return 0;
    };

    Window_StatusArea.prototype._refreshFrame = function() {
        this._margin = 0;
    };

    Window_StatusArea.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
        }
    };

    //=============================================================================
    // Scene_Status
    // ステータス画面のシーンクラス
    //=============================================================================

    var _CSS_Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _CSS_Scene_Status_create.call(this);
        this.createCssArea1();
        this.createCssArea2();
        this.createCssArea3();
        this.createCssArea4();
    };

    Scene_Status.prototype.createCssArea1 = function() {
        var stw = this._statusWindow;
        var x = stw.x + stw.standardPadding();
        var y = stw.y + stw.standardPadding();
        var width = Graphics.boxWidth - stw.standardPadding() * 2;
        var height = stw.lineHeight() * 2;
        var lss = this.cssStatusArea1();
        this._statusArea1Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea1Window.reserveFaceImages();
        this.addWindow(this._statusArea1Window);
    };

    Scene_Status.prototype.detailedStatus = function(index) {
        var ds = FTKR.CSS.DS.detailedStatus;
        index -= 1;
        var texts = ds.line[index].split(';');
        return {
            text1     :texts[0] + ',{line}',
            text2     :texts[1],
            text3     :texts[2],
            space     :ds.space[index],
            spaceIn   :ds.spaceIn[index],
            widthRate :ds.widthRate[index],
        };
    };

    Scene_Status.prototype.cssStatusArea1 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(1) : {
            text1     :'name,{line}',
            text2     :'class',
            text3     :'nickname',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'1,1,1',
        };
    };

    Scene_Status.prototype.createCssArea2 = function() {
        var stw = this._statusArea1Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 5;
        var lss = this.cssStatusArea2();
        this._statusArea2Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea2Window.reserveFaceImages();
        this.addWindow(this._statusArea2Window);
    };

    Scene_Status.prototype.cssStatusArea2 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(2) : {
            text1     :'face(4),{line}',
            text2     :'level,state,hp,mp',
            text3     :'custom(0),custom(1),custom(2),custom(3)',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'2,2,3',
        };
    };

    Scene_Status.prototype.createCssArea3 = function() {
        var stw = this._statusArea2Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 7;
        var lss = this.cssStatusArea3();
        this._statusArea3Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea3Window.reserveFaceImages();
        this.addWindow(this._statusArea3Window);
    };

    Scene_Status.prototype.cssStatusArea3 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(3) : {
            text1     :'param(2),param(3),param(4),param(5),param(6),param(7),{line}',
            text2     :'',
            text3     :'equip(0),equip(1),equip(2),equip(3),equip(4)',
            space     :'0,100,0,0',
            spaceIn   :'5',
            widthRate :'4,1,5',
        };
    };

    Scene_Status.prototype.createCssArea4 = function() {
        var stw = this._statusArea3Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 2;
        var lss = this.cssStatusArea4();
        this._statusArea4Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea4Window.reserveFaceImages();
        this.addWindow(this._statusArea4Window);
    };

    Scene_Status.prototype.cssStatusArea4 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(4) : {
            text1     :'profile',
            text2     :'',
            text3     :'',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'1,0,0',
        };
    };

    var _CSS_Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
    Scene_Status.prototype.refreshActor = function() {
        _CSS_Scene_Status_refreshActor.call(this);
        var actor = this.actor();
        this._statusArea1Window.setActor(actor);
        this._statusArea2Window.setActor(actor);
        this._statusArea3Window.setActor(actor);
        this._statusArea4Window.setActor(actor);
    };
}()); 

*/
