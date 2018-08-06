//=============================================================================
// 戦闘行動の強制コマンドの機能を拡張するプラグイン
// FTKR_ExForceAction.js
// プラグインNo : 78
// 作成者     : フトコロ
// 作成日     : 2018/04/14
// 最終更新日 : 2018/08/06
// バージョン : v1.1.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EFA = true;

var FTKR = FTKR || {};
FTKR.EFA = FTKR.EFA || {};

//=============================================================================
/*:
 * @plugindesc v1.1.1 戦闘行動の強制コマンドの機能を拡張する
 * @author フトコロ
 *
 * @param Load Face In Battle Start
 * @desc 戦闘開始時にアクターの顔画像をすべて読み込む。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Face Window Setting
 * @desc 顔画像表示用のウィンドウ設定
 * @type struct<face>
 * @default {"imageWidth":"144","imageHeight":"54","windowY":"144","padding":"6","hideFrame":"false"}
 *
 * @param -- イベントコマンドの動作 --
 * @desc 
 * 
 * @param Enable Show Face
 * @desc イベントコマンドで実行した時に、アクターの顔画像を表示する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Enable Show SvChara
 * @desc イベントコマンドで実行した時に、アクターのSV戦闘キャラを表示する。※サイドビュー戦闘のみ有効
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Disable Reset Action Num
 * @desc イベントコマンドで実行した時に、その後の行動のキャンセルを無効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Enable Add Action
 * @desc イベントコマンドで実行した時に、行動を追加して実行する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * イベントコマンドの「戦闘行動の強制」の動作を変更できます。
 * プラグインパラメータで変更してください。
 * 
 * 
 * また、イベントコマンドの「戦闘行動の強制」の替わりに、以下のプラグインコマンドを
 * 実行することで、イベントごとに動作を変えることができます。
 * ※[]や()は実際の入力に使用しません
 * 
 * 
 * EFA_戦闘行動の強制 [主体分類] [主体ID] スキル [スキルID] 対象 [対象ID] (顔表示) (リセット無効) (行動追加)
 * EFA_FORCE_ACTION [battlerType] [battlerId] SKILL [skillId] TARGET [targetId] (SHOW_FACE) (DISABLE_RESET) (ADD_ACTION)
 * 
 * "スキル(SKILL)"の変わりに"アイテム(ITEM)"に変えることで、アイテムを使用できます。
 * アイテムにした場合は、"スキルID(skillId)"を"アイテムID(itemId)"を設定してください。
 * 
 *    主体分類(battlerType)
 *        ：行動させる主体キャラをどのように選ぶかを指定します。
 *        　以下の文字列を入力してください。
 *        　　アクター   または Actor
 *        　　パーティー または Party
 *        　　敵グループ または Troop
 * 
 *    主体ID(battlerId)
 *        ：主体分類に合わせて、以下のIDを指定します。
 *        　アクターなら、主体のアクターID。
 *        　パーティーなら、パーティー先頭を 1 とした並び順。
 *        　敵グループなら、敵グループ先頭を 1 とした並び順。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 *    スキル [スキルID]
 *    SKILL [skillId]
 *        ：主体キャラに使用させるスキルのIDを指定します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 *        　主体キャラがアクターで、0 と指定した場合は、そのキャラが
 *        　覚えているスキルから、自動戦闘と同じ手法でスキルと対象を自動選択します。
 * 
 *    アイテム [アイテムID]
 *    ITEM [itemId]
 *        ：主体キャラに使用させるアイテムのIDを指定します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 *        　上記のスキルとは別に使用してください。
 * 
 *    対象 [対象ID]
 *    TARGET [targetId]
 *        ：主体キャラが使用するスキルの対象を指定します。
 *        　パーティーなら、パーティー先頭を 1 とした並び順。
 *        　敵グループなら、敵グループ先頭を 1 とした並び順。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 *        　なお、スキルIDを 0 に設定した場合は、入力不要です。
 *  
 *    顔表示(SHOW_FACE)
 *        ：この文字列は必要な場合のみ入力してください。
 *        　この文字列を入力すると、スキル使用時に主体キャラがアクターかつ
 *        　戦闘メンバー以外なら、データベースで設定された顔画像を画面右端に
 *        　表示します。(*1)
 *        　顔画像は、スキル動作が完了したら消えます。
 *        　この顔画像の表示サイズや位置は、プラグインパラメータで設定できます。
 * 
 *    キャラ表示(SHOW_CHARA)
 *        ：この文字列は必要な場合のみ入力してください。
 *        　この文字列を入力すると、スキル使用時に主体キャラがアクターかつ
 *        　戦闘メンバー以外なら、データベースで設定されたSV戦闘キャラを画面に
 *        　表示しモーションを実行します。(*1)
 *        　SV戦闘キャラは、スキル動作が完了したら消えます。
 *        　この機能はサイドビュー戦闘のみ有効です。
 * 
 *    リセット無効(DISABLE_RESET)
 *        ：この文字列は必要な場合のみ入力してください。(*2)
 *        　ツクールMVでは、戦闘行動の強制を実行した時に、主体キャラの
 *        　その後の行動はすべてキャンセルしてしまいますが、この文字列を
 *        　入力すると、リセットを無効にできます。
 * 
 *    行動追加(ADD_ACTION)
 *        ：この文字列は必要な場合のみ入力してください。(*2)
 *        　この文字列を入力すると、アクターコマンドで予約していた行動とは
 *        　別に指定したスキルを実行します。
 *        　この文字列を入力しない場合は、予約していた行動と入れ替わりで
 *        　スキルを実行します。
 * 
 * 使用例）
 * ◆プラグインコマンド：EFA_戦闘行動の強制 アクター 3 スキル 5 対象 2
 *  アクターID 3 のキャラに、スキルID 5 のスキルを使用します。
 *  スキルの対象が味方の場合は、パーティーの２番目のキャラにスキルを使用します。
 *  スキルの対象が敵の場合は、敵グループの２番目のキャラにスキルを使用します。
 * 
 * ◆プラグインコマンド：EFA_戦闘行動の強制 アクター 5 スキル 0 顔表示 リセット無効 行動追加
 *  アクターID 5 のキャラに、行動を追加して自動戦闘を行わせます。
 *  顔画像を表示します。
 *  
 * 
 * (*1)
 * 顔画像の表示のためには、事前に画像の読込を行う必要があります。
 * メニューで表示していない場合など、一度も画像の読込を行っていない場合は
 * 画像が正しく表示できない場合があります。
 * プラグインパラメータ Load Face In Battle Start を有効にすると
 * 戦闘開始時に、すべてのアクターの顔画像を読み込むようになります。
 * 
 * (*2)
 * この機能は、FTKR_AlternatingTurnBattle.jsと組み合わせて使用する場合は無効です。
 * 行動追加をさせたい場合は、FTKR_AlternatingTurnBattle.jsのプラグインパラメータ
 * Enable Force Action AC を無効に設定してください。
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
 * v1.1.1 - 2018/08/06 : 不具合修正
 *    1. スキルやアイテムで「逃げる」を実行した場合に、SVキャラが消えずに
 *       残ってしまう不具合を修正。
 * 
 * v1.1.0 - 2018/05/01 : 機能追加
 *    1. 戦闘行動の強制で、アイテムを使用できる機能を追加。
 * 
 * v1.0.0 - 2018/04/14 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~face:
 * @param imageWidth
 * @desc 表示させる画像の横のサイズを指定します。デフォルトの顔画像よりも、小さいサイズにすることが可能です。
 * @type number
 * @default 144
 *
 * @param imageHeight
 * @desc 表示させる画像の縦のサイズを指定します。デフォルトの顔画像よりも、小さいサイズにすることが可能です。
 * @type number
 * @default 54
 *
 * @param windowY
 * @desc 顔画像を表示させる位置(Y座標)を指定します。
 * @type number
 * @default 144
 *
 * @param padding
 * @desc ウィンドウ内の余白サイズを指定します。
 * @type number
 * @default 6
 *
 * @param hideFrame
 * @desc ウィンドウの枠を非表示にします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
*/
(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    }

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgStr = function(arg) {
        return convertEscapeCharacters(arg);
    };

    var setArgNum = function(arg) {
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExForceAction');

    FTKR.EFA = {
        load         : paramParse(parameters['Load Face In Battle Start']),
        face         : paramParse(parameters['Face Window Setting']),
        enableFace   : paramParse(parameters['Enable Show Face']) || false,
        enableChara  : paramParse(parameters['Enable Show SvChara']) || false,
        disableReset : paramParse(parameters['Disable Reset Action Num']) || false,
        enableAdd    : paramParse(parameters['Enable Add Action']) || false,
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================
    //書き換え
    Game_Interpreter.prototype.command339 = function() {
        this.iterateBattler(this._params[0], this._params[1], function(battler) {
            if (!battler.isDeathStateAffected()) {
                this.setBattlerForceAction(
                    battler, this._params[2], this._params[3],
                    FTKR.EFA.enableFace, FTKR.EFA.enableChara,
                    !FTKR.EFA.disableReset, FTKR.EFA.enableAdd
                );
            }
        }.bind(this));
        return true;
    };

    var _EFA_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _EFA_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/EFA_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '戦闘行動の強制':
            case 'FORCE_ACTION':
                this.setForceAction(args);
                break;
        }
    };

    Game_Interpreter.prototype.setForceAction = function(args) {
        var battler = null, battlerId = 0, skillId = 0, targetId = 0,
            face = FTKR.EFA.showFace, chara = false, reset = true, add = false, useItem = false;
        for (var i = 0; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case 'アクター':
                case 'ACTOR':
                    battlerId = setArgNum(args[i+1]);
                    battler = $gameActors.actor(battlerId);
                    i += 1;
                    break;
                case 'パーティー':
                case 'PARTY':
                    battlerId = setArgNum(args[i+1]);
                    battler = $gameParty.members()[Math.max(battlerId-1, 0)];
                    i += 1;
                    break;
                case '敵グループ':
                case 'TROOP':
                    battlerId = setArgNum(args[i+1]);
                    battler = $gameTroop.members()[Math.max(battlerId-1, 0)];
                    i += 1;
                    break;
                case 'スキル':
                case 'SKILL':
                    skillId = setArgNum(args[i+1]);
                    useItem = false;
                    i += 1;
                    break;
                case 'アイテム':
                case 'ITEM':
                    skillId = setArgNum(args[i+1]);
                    useItem = true;
                    i += 1;
                    break;
                case '対象':
                case 'TARGET':
                    targetId = setArgNum(args[i+1]) - 1;
                    i += 1;
                    break;
                case '顔表示':
                case 'SHOW_FACE':
                    face = true;
                    break;
                case 'キャラ表示':
                case 'SHOW_CHARA':
                    chara = true;
                    break;
                case 'リセット無効':
                case 'DISABLE_RESET':
                    reset = false;
                    break;
                case '行動追加':
                case 'ADD_ACTION':
                    add = true;
                    break;
                default:
                    return false;
            }
        }
        if (battler && !battler.isDeathStateAffected()) {
            return this.setBattlerForceAction(battler, skillId, targetId, face, chara, reset, add, useItem);
        }
        return false;
    };

    Game_Interpreter.prototype.setBattlerForceAction = function(battler, skillId, targetId, face, chara, reset, add, useItem) {
        if (battler.isActor() && !skillId && !useItem) {
            var action = battler.getAutoBattleAction();
            if (action) {
                skillId = action.item().id;
                targetId = action._targetIndex;
            }
        }
        if (!skillId) return false;
        if (chara && battler.isActor() && !battler.isBattleMember()) {
            BattleManager.sideBattler().setBattler(battler);
        }
        battler.forceActionEx(skillId, targetId, reset, add, useItem);
        BattleManager.forceAction(battler);
        this.setWaitMode('action');
        if (face && battler.isActor() && !battler.isBattleMember()) {
            BattleManager._battlerFaceWindow.openFace(battler);
        }
        return true;
    };
    
    Game_Interpreter.prototype.getBoolean = function(arg) {
         switch ((arg + '').toUpperCase()) {
            case 'ON':
            case 'TRUE':
                return true;
         }
         return false;
    };

    var _EFA_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var isAction = false;
        if (this._waitMode === 'action') isAction = true;
        var waiting = _EFA_Game_Interpreter_updateWaitMode.call(this);
        if (isAction && !waiting) {
            BattleManager._battlerFaceWindow.close();
            BattleManager.sideBattler().resetBattler();
        };
        return waiting;
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Game_Battler.prototype.forceActionEx = function(itemId, targetIndex, reset, add, useItem) {
        if (reset) this.clearActions();
        var action = new Game_Action(this, true);
        if (useItem) {
            action.setItem(itemId);
        } else {
            action.setSkill(itemId);
        }
        if (targetIndex === -2) {
            action.setTarget(this._lastTargetIndex);
        } else if (targetIndex === -1) {
            action.decideRandomTarget();
        } else {
            action.setTarget(targetIndex);
        }
        if (!add) {
            this._actions.shift();
        }
        this._actions.unshift(action);
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.getAutoBattleAction = function() {
        var list = this.makeActionList();
        var maxValue = Number.MIN_VALUE;
        var action = null;
        for (var j = 0; j < list.length; j++) {
            var value = list[j].evaluate();
            if (value > maxValue) {
                maxValue = value;
                action = list[j];
            }
        }
        return action;
    };
    
    //=============================================================================
    // BattleManagers
    //=============================================================================

    BattleManager.setBattlerFaceWindow = function(bfWindow) {
        this._battlerFaceWindow = bfWindow;
    };

    BattleManager.sideBattler = function() {
        return this._spriteset.sideBattler();
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    var _EFA_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _EFA_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setBattlerFaceWindow(this._battlerFaceWindow);
    };

    var _EFA_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _EFA_Scene_Battle_createAllWindows.call(this);
        this.createBattleBattlerFaceWindow();
    };

    Scene_Battle.prototype.createBattleBattlerFaceWindow = function() {
        this._battlerFaceWindow = new Window_BattleBattlerFace();
        this._battlerFaceWindow.reserveFaceImages();
        this.addWindow(this._battlerFaceWindow);
    };

    //=============================================================================
    // Sprite_actor
    //=============================================================================

    Sprite_Actor.prototype.resetBattler = function() {
        this.setBattler(null);
        this.moveToStartPosition();
    };

    //=============================================================================
    // Spriteset_Battle
    //=============================================================================

    var _EFA_Spriteset_Battle_createActor = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _EFA_Spriteset_Battle_createActor.call(this);
        var i = $gameParty.maxBattleMembers();
        this._sideBattlerSprite = new Sprite_Actor();
        this._battleField.addChild(this._sideBattlerSprite);
    };

    Spriteset_Battle.prototype.sideBattler = function() {
        return this._sideBattlerSprite;
    };

    var _EFA_Spriteset_Battle_battlerSprites = Spriteset_Battle.prototype.battlerSprites;
    Spriteset_Battle.prototype.battlerSprites = function() {
        return _EFA_Spriteset_Battle_battlerSprites.call(this).concat(this._sideBattlerSprite);
    };

    //=============================================================================
    // Window_BattleBattlerFace
    //=============================================================================

    function Window_BattleBattlerFace() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleBattlerFace.prototype = Object.create(Window_Base.prototype);
    Window_BattleBattlerFace.prototype.constructor = Window_BattleBattlerFace;

    Window_BattleBattlerFace.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = Graphics.boxWidth - width;
        var y = FTKR.EFA.face.windowY || 144;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._battler = null;
        if (FTKR.EFA.face.hideFrame) this.margin = 0;
        this.refresh();
        this.close();
    };

    Window_BattleBattlerFace.prototype.standardPadding = function() {
        return FTKR.EFA.face.padding;
    };

    Window_BattleBattlerFace.prototype.windowWidth = function() {
        return (FTKR.EFA.face.imageWidth || 144) + this.standardPadding() * 2;
    };

    Window_BattleBattlerFace.prototype.windowHeight = function() {
        return (FTKR.EFA.face.imageHeight || 36) + this.standardPadding() * 2;
    };

    Window_BattleBattlerFace.prototype.refresh = function() {
        this.contents.clear();
        if (this._battler) {
            var faceName = '';
            var faceIndex = 0;
            if (this._battler.isActor()) {
                faceName = this._battler.faceName();
                faceIndex = this._battler.faceIndex();
                var h = this.contentsHeight();
                if (faceName) this.drawFace(faceName, faceIndex, 0, 0, 144, h);
            }
        }
    };

    Window_BattleBattlerFace.prototype.openFace = function(battler, time) {
        this._battler = battler;
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    Window_BattleBattlerFace.prototype._refreshFrame = function() {
        if (!FTKR.EFA.face.hideFrame) Window_Base.prototype._refreshFrame.call(this);
    };

    Window_BattleBattlerFace.prototype.reserveFaceImages = function() {
        if (FTKR.EFA.load) {
            $dataActors.forEach(function(actor){
                if (actor && actor.faceName) {
                    if(!!ImageManager.reserveFace) {
                        ImageManager.reserveFace(actor.faceName);
                    } else {
                        ImageManager.loadFace(actor.faceName);
                    }
                }
            });
        }
    };

}());//EOF
