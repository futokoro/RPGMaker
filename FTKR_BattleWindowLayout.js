//=============================================================================
// 戦闘時のウィンドウ配置を変更するプラグイン
// FTKR_BattleWindowLayout.js
// 作成者     : フトコロ
// 作成日     : 2018/04/08
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BWL = true;

var FTKR = FTKR || {};
FTKR.BWL = FTKR.BWL || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 戦闘時のウィンドウ配置を変更する
 * @author フトコロ
 *
 * @param Show Actor Face
 * @desc アクターの顔画像を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 戦闘時のウィンドウ配置やサイズを変更します。
 * 
 * １．ステータスウィンドウの幅を画面サイズと同じにします。
 * ２．ステータスウィンドウのアクターを横並びに変更します。(*1)
 * ３．アクターコマンドウィンドウの表示位置を、ステータスウィンドウの
 * 　　選択中のアクターに重ねます。
 * ４．パーティーコマンドウィンドウをステータスウィンドウの上に表示し
 * 　　コマンドを横並びにします。
 * 
 * 
 * (*1) ステータスウィンドウの表示内容は、顔画像、名前、ステート、HP、MP、TPです。
 *      顔画像は、プラグインパラメータで表示のON/OFFを変えられます。
 *      TPは、「バトル画面でTPを表示」にチェックが入っている場合に表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. FTKR_AlternatingTurnBattle.jsと組み合わせる場合は、このプラグインが
 *    下になるように配置してください。
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
 * v1.0.0 - 2018/04/08 : 初版作成
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

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_BattleWindowLayout');

    FTKR.BWL.showFace = (paramParse(parameters['Show Actor Face']) || false);

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    Scene_Battle.prototype.updateWindowPositions = function() {
    };

    Scene_Battle.prototype.createStatusWindow = function() {
    };

    Scene_Battle.prototype.createFaaStatusWindow = function() {
        this._statusWindow = new Window_BattleStatus();
        this.addChild(this._statusWindow);
    };

    var _FAA_Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _FAA_Scene_Battle_createSpriteset.call(this);
        this.createFaaStatusWindow();
    };

    var _BWL_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _BWL_Scene_Battle_startActorCommandSelection.call(this);
        this._actorCommandWindow.x = this._actorCommandWindow.width * BattleManager.actor().index();
    };

    var _BWL_Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
        _BWL_Scene_Battle_selectActorSelection.call(this);
        this._statusWindow.hide();
    };

    var _BWL_Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        _BWL_Scene_Battle_onActorOk.call(this);
        this._statusWindow.show();
    };

    var _BWL_Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _BWL_Scene_Battle_onActorCancel.call(this);
        this._statusWindow.show();
    };

    var _BWL_Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        _BWL_Scene_Battle_selectEnemySelection.call(this);
        this._statusWindow.hide();
    };

    var _BWL_Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        _BWL_Scene_Battle_onEnemyOk.call(this);
        this._statusWindow.show();
    };

    var _BWL_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        _BWL_Scene_Battle_onEnemyCancel.call(this);
        this._statusWindow.show();
    };

    //=============================================================================
    // Window_BattleStatus
    //=============================================================================

    Window_BattleStatus.prototype.maxCols = function() {
        return $gameParty.battleMembers().length;
    };

    Window_BattleStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_BattleStatus.prototype.spacing = function() {
        return this.padding * 2;
    };

    Window_BattleStatus.prototype.numVisibleRows = function() {
        return 4;
    };

    Window_BattleStatus.prototype.itemHeight = function() {
        return this.lineHeight() * this.numVisibleRows();
    };

    Window_BattleStatus.prototype.drawItem = function(index) {
        var lineHeight = this.lineHeight();
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRect(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        if (FTKR.BWL.showFace) {
            var x2 = x + Math.max((width - 144)/2, 0);
            this.drawActorFace(actor, x2, y);
        }
        this.drawActorName(actor, x, y);
        this.drawActorIcons(actor, x, y + lineHeight * 1);
        this.drawActorHp(actor, x, y + lineHeight * 2, width);
        if ($dataSystem.optDisplayTp) {
            var width2 = (width - 4) / 2;
            this.drawActorMp(actor, x, y + lineHeight * 3, width2);
            this.drawActorTp(actor, x + width2 + 4, y + lineHeight * 3, width2)
        } else {
            this.drawActorMp(actor, x, y + lineHeight * 3, width);
        }
    };

    //=============================================================================
    // Window_BattleEnemy
    //=============================================================================
    
    Window_BattleEnemy.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================
    
    Window_PartyCommand.prototype.initialize = function() {
        var y = Graphics.boxHeight - this.fittingHeight(6);
        var x = this.apWidth();
        Window_Command.prototype.initialize.call(this, x, y);
        this.openness = 0;
        this.deactivate();
    };

    Window_PartyCommand.prototype.apWidth = function() {
        return Imported.FTKR_AltTB && FTKR.AltTB.enableAP && FTKR.AltTB.showApWindow ? 120 : 0;
    };

    Window_PartyCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth - this.apWidth();
    };

    Window_PartyCommand.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_PartyCommand.prototype.maxCols = function() {
        return this.maxItems();
    };

    Window_PartyCommand.prototype.itemTextAlign = function() {
        return 'center';
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================
    
    Window_ActorCommand.prototype.initialize = function() {
        var y = Graphics.boxHeight - this.windowHeight();
        Window_Command.prototype.initialize.call(this, 0, y);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };

    Window_ActorCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth / $gameParty.battleMembers().length;
    };

    Window_ActorCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    var _BWL_Window_ActorCommand_changeInputWindow = Window_ActorCommand.prototype.changeInputWindow;
    Window_ActorCommand.prototype.changeInputWindow = function() {
        _BWL_Window_ActorCommand_changeInputWindow.call(this);
        this.x = this.width * BattleManager.actor().index();
    };

}());//EOF
