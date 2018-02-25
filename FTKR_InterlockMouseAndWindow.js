//=============================================================================
// マウスポインタとウィンドウのカーソルを連動させるプラグイン
// FTKR_InterlockMouseAndWindow.js
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IMW = true;

var FTKR = FTKR || {};
FTKR.IMW = FTKR.IMW || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 マウスポインタとウィンドウのカーソルを連動させるプラグイン
 * @author フトコロ
 *
 * @param カーソル音を鳴らす
 * @desc マウスでカーソルを動かしたときに、SEを鳴らすか。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
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
 * v1.0.0 - 2018/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {
    var parameters = PluginManager.parameters('FTKR_OriginalSceneWindow');
    FTKR.IMW.enable = JSON.parse(parameters['カーソル音鳴らす'] || true),

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
        if (!this.onMouseInFrame()) return -1;
        var ih = this.itemHeight() || 36;
        var iw = this.itemWidth() || this.width;
        var index = Math.floor((TouchInput.y - this.y - this.padding) / ih) + this.topRow();
        var col = Math.floor((TouchInput.x - this.x - this.padding) / iw);
        return Math.min(index * this.maxCols() + col, this.maxItems() - 1);
    };

    //ウィンドウフレーム内にマウスポインタがあるか判定
    Window_Base.prototype.onMouseInFrame = function() {
        return this.x <= TouchInput.x && this.x + this.width >= TouchInput.x &&
                this.y <= TouchInput.y && this.y + this.height >= TouchInput.y;
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
        return this._windowLayer.children.filter( function(window){
            return !!window && !!window.select && window.active;
        });
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
                if (!!pointWindow && index >= 0 && pointWindow._index !== index) {
                    this.refreshWindowCursor(pointWindow, index);
                }
            }
        }
    };
    
    Scene_Base.prototype.notMouseTriggerd = function() {
        return !TouchInput.isTriggered() && !TouchInput.isCancelled() && TouchInput.isMoved();
    };

    Scene_Base.prototype.refreshWindowCursor = function(pointWndow, index) {
        if (FTKR.IMW.enable) SoundManager.playCursor();
        pointWindow.select(index);
    };

}());//EOF
