//=============================================================================
// 戦闘時のウィンドウ配置を変更するプラグイン
// FTKR_BattleWindowLayout.js
// プラグインNo : 76
// 作成者     : フトコロ
// 作成日     : 2018/04/08
// 最終更新日 : 2018/08/19
// バージョン : v1.2.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BWL = true;

var FTKR = FTKR || {};
FTKR.BWL = FTKR.BWL || {};

//=============================================================================
/*:
 * @plugindesc v1.2.0 戦闘時のウィンドウ配置を変更する
 * @author フトコロ
 *
 * @param Show Actor Face
 * @desc アクターの顔画像を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @param Party
 * @text パーティーコマンドの設定
 * 
 * @param Party Command PositionY
 * @desc パーティーコマンドウィンドウを表示する縦の位置を指定します。
 * @type select
 * @option ステータスウィンドウの上に横に表示
 * @value 0
 * @option 画面中央
 * @value 1
 * @default 0
 * @parent Party
 * 
 * @param Party Command PositionX
 * @desc パーティーコマンドウィンドウを表示する横の位置を指定します。
 * @type select
 * @option 左寄せ
 * @value 0
 * @option 中央
 * @value 1
 * @option 右寄せ
 * @value 2
 * @default 0
 * @parent Party
 * 
 * @param Party Command Window
 * @desc パーティーコマンドウィンドウの表示設定
 * @type struct<window>
 * @default {"width":"","height":"","background":"0"}
 * @parent Party
 * 
 * @param Actor
 * @text アクターコマンドの設定
 * 
 * @param Actor Command Position
 * @desc アクターコマンドウィンドウを表示する場所を指定します。
 * @type select
 * @option ステータスウィンドウのアクターに重ねる
 * @value 0
 * @option ステータスウィンドウの上に横に表示
 * @value 1
 * @option ステータスウィンドウのアクターの上に縦に表示
 * @value 2
 * @default 0
 * @parent Actor
 *
 * @param Actor Command PositionY
 * @desc アクターコマンドウィンドウを表示する縦の位置を指定します。
 * ステータスウィンドウの上表示の場合は無効です。
 * @type select
 * @option 上寄せ
 * @value 0
 * @option 中央
 * @value 1
 * @option 下寄せ
 * @value 2
 * @default 0
 * @parent Actor
 *
 * @param Actor Command PositionX
 * @desc アクターコマンドウィンドウを表示する横の位置を指定します。
 * @type select
 * @option 右寄せ
 * @value 0
 * @option 中央
 * @value 1
 * @option 左寄せ
 * @value 2
 * @default 0
 * @parent Actor
 *
 * @param Actor Command Window
 * @desc アクターコマンドウィンドウの表示設定
 * Actor Command Position の設定により一部の設定が無効になる
 * @type struct<window>
 * @default {"width":"","height":"","background":"0"}
 * @parent Actor
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
 * 　　選択中のアクターに重ねます。(*2)
 * ４．パーティーコマンドウィンドウをステータスウィンドウの上に表示し
 * 　　コマンドを横並びにします。
 * 
 * 
 * (*1) ステータスウィンドウの表示内容は、顔画像、名前、ステート、HP、MP、TPです。
 *      顔画像は、プラグインパラメータで表示のON/OFFを変えられます。
 *      TPは、「バトル画面でTPを表示」にチェックが入っている場合に表示します。
 * 
 * (*2) プラグインパラメータで、パーティーコマンドウィンドウと同じ表示位置に
 *      変更できます。
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
 * v1.2.0 - 2018/08/19 : 機能追加
 *    1. パーティーコマンドとアクターコマンドの設定機能を追加。
 * 
 * v1.1.1 - 2018/08/17 : 不具合修正
 *    1. FTKR_FVActorAnimationと処理が重複していた部分を修正。
 * 
 * v1.1.0 - 2018/04/09 : 機能追加、不具合修正
 *    1. ステータスウィンドウでアクター同士の表示が重なる場合がある不具合を修正。
 *    2. アクターコマンドウィンドウの表示位置を変更する機能を追加。
 *    3. FTKR_AlternatingTurnBattle.jsの v1.1.0 に対応。
 * 
 * v1.0.0 - 2018/04/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~window:
 * @param width
 * @desc ウィンドウの幅をpixel単位で設定します。
 * 空欄：デフォルト設定、-1：画面幅
 * @type number
 * @min -1
 * @default 
 *
 * @param height
 * @desc ウィンドウの高さを行数(lineNumber)で設定します。
 * 空欄：デフォルト設定
 * @type number
 * @default 
 *
 * @param background
 * @desc ウィンドウの背景を設定します。
 * @type select
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 *
*/

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

    FTKR.BWL = {
        showFace       : (paramParse(parameters['Show Actor Face']) || false),
        partyCmdPosY   : +(paramParse(parameters['Party Command PositionY']) || 0),
        partyCmdPosX   : +(paramParse(parameters['Party Command PositionX']) || 0),
        partyCmdWindow : paramParse(parameters['Party Command Window']),
        actorCmdPos    : +(paramParse(parameters['Actor Command Position']) || 0),
        actorCmdPosY   : +(paramParse(parameters['Actor Command PositionY']) || 0),
        actorCmdPosX   : +(paramParse(parameters['Actor Command PositionY']) || 0),
        actorCmdWindow : paramParse(parameters['Actor Command Window']),
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    Scene_Battle.prototype.updateWindowPositions = function() {
    };

    var _BWL_Scene_Battle_startActorCommandSelection =
         Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _BWL_Scene_Battle_startActorCommandSelection.call(this);
        this._actorCommandWindow.refreshPosition();
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

    var _BWL_Window_BattleStatus_changeActorOnMouse =
        Window_BattleStatus.prototype.changeActorOnMouse;
    Window_BattleStatus.prototype.changeActorOnMouse = function(index) {
        _BWL_Window_BattleStatus_changeActorOnMouse.call(this, index);
        BattleManager._actorCommandWindow.refreshPosition();
    };

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
            this.drawActorFace(actor, x2, y, width);
        }
        this.drawActorName(actor, x, y, width);
        this.drawActorIcons(actor, x, y + lineHeight * 1, width);
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
        var x = +FTKR.BWL.partyCmdPosX * (Graphics.boxWidth - this.windowWidth()) / 2;
        Window_Command.prototype.initialize.call(this, x, 0);
        switch(+FTKR.BWL.partyCmdPosY) {
            case 1:
                var y = (Graphics.boxHeight - this.windowHeight()) / 2;
                break;
            default:
                var y = Graphics.boxHeight - this.statusWindow().windowHeight() - this.windowHeight();
                break;
        }
        this.y = y;
        this.setBackgroundType(+FTKR.BWL.partyCmdWindow.background);
        this.openness = 0;
        this.deactivate();
    };

    Window_PartyCommand.prototype.statusWindow = function() {
        return SceneManager._scene._statusWindow;
    }

    Window_PartyCommand.prototype.windowWidth = function() {
        return this.windowBwlWidth();
    };

    Window_PartyCommand.prototype.windowBwlWidth = function() {
        var width = FTKR.BWL.partyCmdWindow.width;
        switch(width) {
            case -1:
                return Graphics.boxWidth;
            default:
                return !width ? Graphics.boxWidth : +width;
        }
    };

    Window_PartyCommand.prototype.numVisibleRows = function() {
        return +FTKR.BWL.partyCmdWindow.height || 1;
    };

    Window_PartyCommand.prototype.maxCols = function() {
        return Math.ceil(this.maxItems() / this.numVisibleRows());
    };

    Window_PartyCommand.prototype.itemTextAlign = function() {
        return 'center';
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================
    
    Window_ActorCommand.prototype.initialize = function() {
        switch(FTKR.BWL.actorCmdPos) {
            case 1://上横
            case 2://上縦
                var y = Graphics.boxHeight - this.statusWindow().windowHeight() - this.windowHeight();
                break;
            default://重ね
                var y = Graphics.boxHeight - this.statusWindow().windowHeight() + FTKR.BWL.actorCmdPosY * (this.statusWindow().windowHeight() - this.windowHeight()) / 2;
                break;
        }
        var x = this.offsetX();
        Window_Command.prototype.initialize.call(this, x, y);
        console.log(this.x, this.y, this.width, this.height);
        this.setBackgroundType(+FTKR.BWL.actorCmdWindow.background);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };

    Window_ActorCommand.prototype.offsetX = function() {
        return +FTKR.BWL.actorCmdPosX * ((FTKR.BWL.actorCmdPos == 1 ? Graphics.boxWidth : this.actorWidth()) - this.windowWidth()) / 2;
    };

    Window_ActorCommand.prototype.actorWidth = function() {
        return SceneManager._scene._statusWindow.width / SceneManager._scene._statusWindow.maxCols();
    };

    Window_ActorCommand.prototype.statusWindow = function() {
        return SceneManager._scene._statusWindow;
    }

    Window_ActorCommand.prototype.windowWidth = function() {
        return this.windowBwlWidth() ||
            (FTKR.BWL.actorCmdPos == 1 ?
                Graphics.boxWidth : this.actorWidth());
    };

    Window_ActorCommand.prototype.windowBwlWidth = function() {
        var width = +FTKR.BWL.actorCmdWindow.width;
        switch(width) {
            case -1:
                return Graphics.boxWidth;
            default:
                return width;
        }
    };

    Window_ActorCommand.prototype.refreshPosition = function() {
        if (FTKR.BWL.actorCmdPos != 1) this.x = this.actorWidth() * BattleManager.actor().index() + this.offsetX();;
    };

    Window_ActorCommand.prototype.numVisibleRows = function() {
        return +FTKR.BWL.actorCmdWindow.height ||
            (FTKR.BWL.actorCmdPos == 1 ? 1 : 4);
    };

    Window_ActorCommand.prototype.maxCols = function() {
        return FTKR.BWL.actorCmdPos == 1 ? 4 : 1;
    };

    Window_ActorCommand.prototype.itemTextAlign = function() {
        return FTKR.BWL.actorCmdPos == 1 ? 'center' : 'left';
    };

    var _BWL_Window_ActorCommand_changeInputWindow =
        Window_ActorCommand.prototype.changeInputWindow;
    Window_ActorCommand.prototype.changeInputWindow = function() {
        _BWL_Window_ActorCommand_changeInputWindow.call(this);
        this.refreshPosition();
    };

}());//EOF
