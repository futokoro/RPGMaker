//=============================================================================
//  ステータスウィンドウ内をクリックして、その行または列のアクターを選択するプラグイン
// FTKR_AltTB_SelectTouchedActor.js
// プラグインNo : 92
// 作成者     : フトコロ
// 作成日     : 2018/12/02
// 最終更新日 : 2018/12/04
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AltTB_STA = true;

var FTKR = FTKR || {};
FTKR.AltTB = FTKR.AltTB || {};
FTKR.AltTB.STA = FTKR.AltTB.STA || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 ステータスウィンドウ内をクリックして、その行または列のアクターを選択する
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ステータスウィンドウ内をタッチ、またはクリックすることで、その行または列に
 * 表示されているアクターに選択状態を変更することができます。
 * 
 * このプラグインには、FTKR_AlternatingTurnBattle.js (v2.0.0以降)が必要です。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_AlternatingTurnBattle.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_AltTB_SelectTouchedActor.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * このプラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v1.0.1 - 2018/12/04 : 不具合修正
 *    1. アクターを選択するとエラーになる不具合を修正。
 * 
 * v1.0.0 - 2018/12/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

if(Imported.FTKR_AltTB) (function() {

    //=============================================================================
    // BattleManager
    //=============================================================================

    BattleManager.setActorWindow = function(actorWindow) {
        this._actorCommandWindow = actorWindow;
    };

    BattleManager.isTouchedOutsideActorCommandWindow = function() {
        return this._actorCommandWindow.active && !this._actorCommandWindow.isTouchedInsideFrame()
    };

    var _AltTB_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _AltTB_BattleManager_initMembers.call(this);
        this._actorCommandWindow = null;
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    
    var _AltTB_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _AltTB_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setActorWindow(this._actorCommandWindow);
    };

    //=============================================================================
    // Window_BattleStatus
    //=============================================================================

    Window_BattleStatus.prototype.isCursorIndexOnMouse = function() {
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
            x += iw + this.spacing();
        }
        return Math.min(index * this.maxCols() + col, this.maxItems() - 1);
    };

    Window_Selectable.prototype.isOpenAndDeactive = function() {
        return this.isOpen() && !this.active;
    };

    Window_BattleStatus.prototype.isTouchedInsideDeactive = function() {
        return TouchInput.isTriggered() && this.isTouchedInsideFrame() && this.isOpenAndDeactive();
    };

    Window_BattleStatus.prototype.processTouch = function() {
        if (this.isTouchedInsideDeactive()) {
            var index = this.isCursorIndexOnMouse();
            if (index >= 0 && BattleManager.isTouchedOutsideActorCommandWindow()) {
                if ($gameParty.members()[index].canInput()) {
                    this.changeActorOnMouse(index);
                } else {
                    SoundManager.playBuzzer();
                    TouchInput.clear();
                }
            }
        } else {
            Window_Selectable.prototype.processTouch.call(this);
        }
    };

    Window_BattleStatus.prototype.changeActorOnMouse = function(index) {
        BattleManager.changeActorAltTB(index);
        this.select(BattleManager.actor().index());
        BattleManager._actorCommandWindow.setup(BattleManager.actor());
        SoundManager.playCursor();
        TouchInput.clear();
    };

}());//EOF
