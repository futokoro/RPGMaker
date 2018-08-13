//=============================================================================
// マウスポインタとウィンドウのカーソルを連動させるプラグイン
// FTKR_InterlockMouseAndWindow.js
// プラグインNo : 70
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 2018/04/30
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IMW = true;

var FTKR = FTKR || {};
FTKR.IMW = FTKR.IMW || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 マウスポインタとウィンドウのカーソルを連動させるプラグイン
 * @author フトコロ
 *
 * @param カーソル音を鳴らす
 * @desc マウスでカーソルを動かしたときに、SEを鳴らすか。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @param 対象拡張フラグ
 * @desc ウィンドウにマウスポインタを乗せても動かないときに有効にしてください。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * マウスポインタの位置に合わせて、ウィンドウ上のカーソルが連動して動きます。
 * 
 * 通常、マウスでコマンドを実行するためには２度クリックする必要があります。
 * 
 * このプラグインでは、カーソルが連動して動くため、１度クリックするだけで
 * コマンドを実行できます。
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
 * v1.1.0 - 2018/04/30 : 機能追加
 *    1. 名前入力ウィンドウに対応。
 *    2. Scene_Base直下のchildrenに格納されたウィンドウも対象に出来る機能を追加。
 * 
 * v1.0.1 - 2018/03/24 : 不具合修正
 * 
 * v1.0.0 - 2018/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {
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

    var parameters = PluginManager.parameters('FTKR_InterlockMouseAndWindow');
    FTKR.IMW = {
        enable : paramParse(parameters['カーソル音鳴らす']) || false,
        flag   : paramParse(parameters['対象拡張フラグ']) || false,
    };

    //----------------------------------------------------------------------
    // TouchInput
    //  ポインタ位置を常に記憶 TouchInput._x と TouchInput._y
    //----------------------------------------------------------------------
    TouchInput._onMouseMove = function(event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    };

    //----------------------------------------------------------------------
    //マウスポインタが指している行を取得
    //----------------------------------------------------------------------
    Window_Base.prototype.isCursorIndexOnMouse = function() {
        return -1;
    };

    Window_Selectable.prototype.isCursorIndexOnMouse = function() {
        if (!this.isTouchedInsideFrame()) return -1;
        var ih = this.itemHeight() || 36;
        var iw = this.itemWidth() || this.width;
        var index = Math.floor((TouchInput.y - this.y - this.padding) / ih) + this.topRow();
        var x = this.x;
        for(var i = 0; i < this.maxCols(); i++) {
            if (TouchInput.x >= x && TouchInput.x < x + iw + this.spacing()) {
                var col = i;
                break;
            }
            x += iw + this.spacing() + this.imawOffset(i);
        }
        return Math.min(index * this.maxCols() + col, this.maxItems() - 1);
    };

    Window_Selectable.prototype.imawOffset = function(index) {
        return 0;
    };

    //ウィンドウフレーム内にマウスポインタがあるか判定
    Window_Base.prototype.onMouseInFrame = function() {
        return this.x <= TouchInput.x && this.x + this.width >= TouchInput.x &&
                this.y <= TouchInput.y && this.y + this.height >= TouchInput.y;
    };

    //名前入力欄用の補正
    Window_Selectable.prototype.imawOffset = function(index) {
        return ([4,5].contains(index)) ? 12 : 0;
    };

    //----------------------------------------------------------------------
    //マウスポインタの位置に合わせて、ウィンドウのカーソル位置を更新
    //----------------------------------------------------------------------
    var _IMW_Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        this.updateSmcMousePosition();
        _IMW_Scene_Base_update.call(this);
    };

    Scene_Base.prototype.activeSelectWindows = function() {
        return this.allWindowChildren().filter( function(window){
            return !!window && !!window.select && window.active;
        });
    };

    Scene_Base.prototype.allWindowChildren = function() {
        return FTKR.IMW.flag ?
            Array.prototype.concat.call(this._windowLayer.children, this.children) :
            this._windowLayer.children;
    };

    Scene_Base.prototype.updateSmcMousePosition = function() {
        if (this.notMouseTriggerd()) {
            if (!!this._windowLayer) {
                //マウスポインタと重なっているアクティブなウィンドウとカーソル位置を取得
                var index = -1;
                var pointWindow = null;
                this.activeSelectWindows().forEach( function(window){
                    var cIndex = window.isCursorIndexOnMouse();
                    if (cIndex >= 0) {
                        index = cIndex;
                        pointWindow = window;
                    }
                },this);
                //一番手前のウィンドウのカーソル位置を更新
                if (this.isRefreshWindowCursor(pointWindow, index)) {
                    this.refreshWindowCursor(pointWindow, index);
                }
            }
        }
    };
    
    Scene_Base.prototype.notMouseTriggerd = function() {
        return !TouchInput.isTriggered() && !TouchInput.isCancelled() && TouchInput.isMoved();
    };

    Scene_Base.prototype.isRefreshWindowCursor = function(pointWindow, index) {
        return !!pointWindow && index >= 0 && pointWindow._index !== index
    };

    Scene_Base.prototype.refreshWindowCursor = function(pointWindow, index) {
        //カーソル移動に合わせて、SEを鳴らす
        if (FTKR.IMW.enable) SoundManager.playCursor();
        pointWindow.select(index);
    };

}());//EOF
