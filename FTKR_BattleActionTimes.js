//=============================================================================
// 戦闘中の行動回数を表示・操作するプラグイン
// FTKR_BattleActionTimes.js
// プラグインNo : 90
// 作成者     : フトコロ
// 作成日     : 2018/12/02
// 最終更新日 : 2018/12/19
// バージョン : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BAT = true;

var FTKR = FTKR || {};
FTKR.BAT = FTKR.BAT || {};

//=============================================================================
/*:
 * @plugindesc v1.0.2 戦闘中の行動回数を表示・操作するプラグイン
 * @author フトコロ
 *
 * @param Default Max AT
 * @desc 行動回数に最大値を設定します。
 * 0 の場合は最大値なし
 * @default 0
 * @type number
 * @min 0
 *
 * @param --- 行動回数の表示 ---
 * 
 * @param Show AT
 * @desc アクターの残り行動回数を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param AT Draw Type
 * @desc 行動回数の表示方法を選択します。
 * @type select
 * @option 数値
 * @value 0
 * @option アイコン(現在値のみ)
 * @value 1
 * @option アイコン(現在値と最大値)
 * @value 2
 * @default 0
 * 
 * @param acvalue
 * @text 数値で表示
 * 
 * @param Display AT Format
 * @desc 行動回数の表示内容を設定します。
 * %1 - 行動回数, %2 - 最大値
 * @default [%1]
 * @parent acvalue
 * 
 * @param AT Color
 * @desc 行動回数の表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 * @parent acvalue
 *
 * @param Display AT Width
 * @desc 行動回数の表示幅を設定します。(半角文字数)
 * @default 3
 * @type number
 * @parent acvalue
 *
 * @param atgauge
 * @text ゲージで表示
 * 
 * @param Display AT Gauge
 * @desc 行動回数のゲージを表示します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent atgauge
 * 
 * @param AT Gauge Color1
 * @desc 行動回数のゲージ色1を設定します。
 * @default 13
 * @type number
 * @min 0
 * @max 31
 * @parent atgauge
 *
 * @param AT Gauge Color2
 * @desc 行動回数のゲージ色2を設定します。
 * @default 5
 * @type number
 * @min 0
 * @max 31
 * @parent atgauge
 * 
 * @param acicon
 * @text アイコンで表示
 * 
 * @param AT Icon Index
 * @desc 行動回数の現在値を表すアイコンを設定します。
 * @default 163
 * @type number
 * @min 0
 * @parent acicon
 *
 * @param AT Empty Icon Index
 * @desc 行動回数の空部分を表すアイコンを設定します。
 * 行動回数の最大値を設定した場合のみ有効です。
 * @default 160
 * @type number
 * @min 0
 * @parent acicon
 *
 * @param --- ステータスウィンドウ ---
 * 
 * @param Activated Actor Sign
 * @desc ステータスウィンドウに対して行動済みのアクターの表し方を指定します。
 * @type select
 * @option 特になし
 * @value 0
 * @option 名前をグレー表示にする
 * @value 1
 * @option 名前＋顔画像をグレー表示
 * @value 2
 * @default 0
 *
 * @param --- 戦闘行動の強制 ---
 * 
 * @param Enabled Force Action AT
 * @desc 戦闘行動の強制でスキルを使用したアクターの行動回数消費を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param atcode
 * @text --- 特徴および使用効果コードID ---
 * 
 * @param TRAIT_ACTION_MINUS
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 161
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @param TRAIT_ACTION_MAX
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 162
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @param EFFECT_ACTION_PLUS
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 160
 * @type number
 * @min 0
 * @parent atcode
 * 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを導入すると、以下の機能を追加します。
 * 
 * 戦闘シーンでパーティーメンバーの行動回数を表示
 * 特徴によって増加する行動回数に最大値を設定
 * アクター、職業、武器、防具、ステート、敵キャラに行動回数を減らす特徴の設定
 * スキル・アイテムに、行動回数の一時増減させる効果の設定
 * スキル・アイテム使用時の行動回数を消費しない効果の設定
 * 
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_BattleActionTimes.ja.md
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
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    FTKR_FVActorAnimation.js        (フロントビューでアクター画像にアニメーション)
 *    FTKR_AlternatingTurnBattle.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_BattleActionTimes.js
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
 * v1.0.2 - 2018/12/19 : 不具合修正
 *    1. 戦闘行動の強制を実行するとエラーになる不具合を修正。
 * 
 * v1.0.1 - 2018/12/03 : 不具合修正
 *    1. プラグインコマンドの誤記修正。
 * 
 * v1.0.0 - 2018/12/02 : 初版作成
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

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function(obj, metacodes) {
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
            var metaReg = new RegExp('<' + metacode + '[ ]*:[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //objのメモ欄から <metacode x: y> の値を読み取って返す
    var readObjectMetaEx = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '[ ]*(.+)[ ]*:[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match : '';
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

    var setArgBool = function(arg) {
        switch((setArgStr(arg)).toUpperCase()) {
            case 'TRUE':
                return true;
            default :
                return false;
        }
    }

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_BattleActionTimes');

    FTKR.BAT = {
        defaultMaxAT    : (paramParse(parameters['Default Max AT']) || 0),
        showAT          : (paramParse(parameters['Show AT']) || false),
        atDrawType      : (paramParse(parameters['AT Draw Type']) || 0),
        dispATFormat    : (paramParse(parameters['Display AT Format']) || '[%1]'),
        atColor         : (paramParse(parameters['AT Color']) || 0),
        dispAtWidth     : (paramParse(parameters['Display AT Width']) || 3),
        dispATGauge     : (paramParse(parameters['Display AT Gauge']) || false),
        atGaugeColor1   : (paramParse(parameters['AT Gauge Color1']) || 0),
        atGaugeColor2   : (paramParse(parameters['AT Gauge Color2']) || 0),
        atIcon          : (paramParse(parameters['AT Icon Index']) || 163),
        atEmptyIcon     : (paramParse(parameters['AT Empty Icon Index']) || 160),
        activated       : +(paramParse(parameters['Activated Actor Sign']) || 0),
        enabledForceActionAT : (paramParse(parameters['Enabled Force Action AT']) || false),
    };

    Game_BattlerBase.TRAIT_ACTION_MINUS = +(paramParse(parameters['TRAIT_ACTION_MINUS']));
    Game_BattlerBase.TRAIT_ACTION_MAX   = +(paramParse(parameters['TRAIT_ACTION_MAX']));
    Game_Action.EFFECT_ADD_ACTION_TIMES = +(paramParse(parameters['EFFECT_ADD_ACTION_TIMES']));


    //=============================================================================
    // DataManager
    //=============================================================================

    var _DatabaseLoaded = false;
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_DatabaseLoaded) {
            this.BATTraitNoteTags($dataActors);
            this.BATTraitNoteTags($dataClasses);
            this.BATTraitNoteTags($dataWeapons);
            this.BATTraitNoteTags($dataArmors);
            this.BATTraitNoteTags($dataStates);
            this.BATTraitNoteTags($dataEnemies);
            this.BATEffectNoteTags($dataSkills);
            this.BATEffectNoteTags($dataItems);
            _DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.BATTraitNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var times = readObjectMetaEx(obj, ['FTKR_ACTION_MINUS']);
            if (times) {
                obj.traits.push({
                    code   : Game_BattlerBase.TRAIT_ACTION_MINUS,
                    value1 : Number(times[1]), //確率
                    value2 : Number(times[2]), //減少数
                });
            }
        }
    };

    DataManager.BATEffectNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.noAC = Boolean(testObjectMeta(obj, ['FTKR_NOAT', 'ALTTB_NOAC']) || false);
            var times = readObjectMetaEx(obj, ['FTKR_ADD_ACTION_TIMES']);
            if (times) {
                obj.effects.push({
                    code   : Game_Action.EFFECT_ACTION_PLUS,
                    value1 : Number(times[1]), //確率　
                    value2 : Number(times[2]), //増加数
                });
            }
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.actionMinusSet = function() {
        return this.traits(Game_BattlerBase.TRAIT_ACTION_MINUS);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Game_Battler.prototype.baseActionTimes = function() {
        return this.actionTimePlus() - this.actionTimeMinus();
    };

    Game_Battler.prototype.actionTimePlus = function() {
        return this.actionPlusSet().reduce(function(r, p) {
            return Math.random() < p ? r + 1 : r;
        }, 1);
    }

    Game_Battler.prototype.actionTimeMinus = function() {
        return this.actionMinusSet().reduce(function(r, p) {
            return Math.random() * 100 < p.value1 ? r + p.value2 : r;
        }, 0);
    };

    Game_Battler.prototype.actionTimeOffset = function() {
        return this._actionTimeOffset || 0;
    }

    Game_Battler.prototype.actionTimes = function() {
        return $gameParty.inBattle() ? this.numActions() : this.makeActionTimes();
    }

    Game_Battler.prototype.maxActionTimes = function() {
        return FTKR.BAT.defaultMaxAT;
    };

    Game_Battler.prototype.atRate = function() {
        return this.maxActionTimes() ? this.actionTimes() / this.maxActionTimes() : 0;
    };

    Game_Battler.prototype.clearActionTimeOffset = function() {
        this._actionTimeOffset = 0;
    }

    Game_Battler.prototype.setActionTimeOffset = function(times) {
        this._actionTimeOffset = times;
    }

    Game_Battler.prototype.addActionTimeOffset = function(times) {
        this.setActionTimeOffset(times + this.actionTimeOffset());
    }

    //書き換え
    Game_Battler.prototype.makeActionTimes = function() {
        var times = this.baseActionTimes();
        times += this.actionTimeOffset();
        if (this.maxActionTimes() > 0) times = Math.min(this.maxActionTimes(), times);
        if (times < 0) times = 0;
        return times;
    };

    Game_Battler.prototype.addActionTimes = function(times) {
        this.addActionTimeOffset(times);
        if (times > 0) {
            this.addActions(times);
        } else if (times < 0) {
            this.reduceActions(times);
        }
    };

    Game_Battler.prototype.addActions = function(times) {
        for (var i = 0; i < times; i++) {
            if (this.maxActionTimes() > 0 && this.numActions() >= this.maxActionTimes()) return;
            this._actions.push(new Game_Action(this));
        }
    };

    Game_Battler.prototype.reduceActions = function(times) {
        for (var i = 0; i < -times; i++) {
            if (this.numActions() <= 0) return;
            this._actions.shift();
        }
    };

    Game_Battler.prototype.catResetActions = function() {
    };

    Game_Battler.prototype.canPayActionTimes = function(item) {
        return !this.numActions() && item.noAC || this.numActions();
    };

    var _Game_Battler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
    Game_Battler.prototype.removeCurrentAction = function() {
        var action = this.currentAction();
        if (!action || action.item() && action.item().noAC || !FTKR.BAT.enabledForceActionAT && this.currentAction()._forcing) return;
        _Game_Battler_removeCurrentAction.call(this);
    };

    var _Game_Battler_forceAction = Game_Battler.prototype.forceAction;
    Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
        if (FTKR.BAT.enabledForceActionAT && !$dataSkills[skillId].noAC && !this.numActions()) return;
        _Game_Battler_forceAction.call(this, skillId, targetIndex);
    };
    
    var _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        this.clearActionTimeOffset();
        _Game_Battler_onBattleStart.call(this);
    };

    var _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        _Game_Battler_onTurnEnd.call(this);
        this.clearActionTimeOffset();
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.maxActionTimes = function() {
        return +readObjectMeta(this.actor(), ['FTKR_MAX_AT','ALTTB_MAX_AC']) || Game_Battler.prototype.maxActionTimes.call(this);
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.maxActionTimes = function() {
        return +readObjectMeta(this.enemy(), ['FTKR_MAX_AT','ALTTB_MAX_AC']) || Game_Battler.prototype.maxActionTimes.call(this);
    };

    Game_Enemy.prototype.catResetActions = function() {
        Game_Battler.prototype.catResetActions.call(this);
        if (this.numActions() > 0) {
            var actionList = this.enemy().actions.filter(function(a) {
                return this.isActionValid(a);
            }, this);
            if (actionList.length > 0) {
                this.selectAllActions(actionList);
            }
        }
        this.setActionState('waiting');
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
    Game_Action.prototype.testItemEffect = function(target, effect) {
        switch (effect.code) {
        case Game_Action.EFFECT_ADD_ACTION_TIMES:
            return true;
        default:
            return _Game_Action_testItemEffect.call(this, target, effect);
        }
    };
    
    var _Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
    Game_Action.prototype.applyItemEffect = function(target, effect) {
        switch (effect.code) {
        case Game_Action.EFFECT_ADD_ACTION_TIMES:
            this.itemEffectAddActionTimes(target, effect);
            break;
        default:
            _Game_Action_applyItemEffect.call(this, target, effect);
            break;
        }
    };

    Game_Action.prototype.itemEffectAddActionTimes = function(target, effect) {
        var times = effect.value2;
        if (Math.random() * 100 < effect.value1 && target.isAlive()) {
            target.addActionTimes(times);
            return;
        }
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        switch (command.toUpperCase()) {
            case 'FTKR_行動回数増加':
            case 'AltTB_行動回数増加':
            case 'FTKR_ACTION_PLUS':
            case 'AltTB_ACTION_PLUS':
                this.addActionTimes(args);
                break;
            case 'FTKR_行動再設定':
            case 'FTKR_RESET_ACTIONS':
                this.catResetActions(args);
                break;
            default:
                _Game_Interpreter_pluginCommand.call(this, command, args);
                break;
        }
    };

    Game_Interpreter.prototype.addActionTimes = function(args) {
        var target = null;
        var targetId = setArgNum(args[1]);
        switch(args[0].toUpperCase()) {
            case 'アクター':
            case 'ACTOR':
                target = $gameActors.actor(targetId);
                break;
            case 'パーティー':
            case 'PARTY':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameParty.members()[targetId];
                break;
            case '敵グループ':
            case 'TROOP':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameTroop.members()[targetId];
                break;
        }
        if (target && target.isAlive()) {
            target.addActionTimes(setArgNum(args[2]));
            BattleManager._statusWindow.refresh();
        }
    };

    Game_Interpreter.prototype.catResetActions = function(args) {
        var target = null;
        var targetId = setArgNum(args[1]);
        switch(args[0].toUpperCase()) {
            case 'アクター':
            case 'ACTOR':
                target = $gameActors.actor(targetId);
                break;
            case 'パーティー':
            case 'PARTY':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameParty.members()[targetId];
                break;
            case '敵グループ':
            case 'TROOP':
                var targetId = Math.max(targetId - 1, 0);
                target = $gameTroop.members()[targetId];
                break;
        }
        if (target && target.isAlive()) {
            target.catResetActions();
        }
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.drawActorActionTimes = function(actor, x, y, width) {
        var ac = actor.actionTimes();
        var mac = actor.maxActionTimes();
        var icon1 = FTKR.BAT.atIcon;
        var icon2 = FTKR.BAT.atEmptyIcon;
        this.drawATGauge(actor,x, y, width);
        switch (+FTKR.BAT.atDrawType) {
            case 1:
                this.drawCssIconValue(x, y, width, ac, icon1);
                break;
            case 2:
                if (mac) this.drawIconGauge(x, y, width, ac, mac, icon1, icon2);
                break;
            default:
                var acw = this.textWidth('0') * FTKR.BAT.dispAtWidth;
                width -= acw;
                this.drawCssNumberValue(x + width, y, acw, ac, mac);
                break;
        }
        return 1;
    };

    Window_Base.prototype.drawCssNumberValue = function(x, y, width, value, max) {
        var text = FTKR.BAT.dispATFormat.format(value, max);
        this.changeTextColor(this.textColor(FTKR.BAT.atColor));
        this.drawText(text, x, y, width, 'right');
        this.resetTextColor();
    };

    Window_Base.prototype.drawCssIconValue = function(x, y, width, value, icon) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (value > 1) {
            if (width >= (iw + 2) * value - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (value - 1);
            }
        }
        for (var i = 0; i < value; i++) {
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };

    Window_Base.prototype.drawIconGauge = function(x, y, width, current, max, icon1, icon2) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (max > 1) {
            if (width >= (iw + 2) * max - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (max - 1);
            }
        }
        for (var i = 0; i < max; i++) {
            var icon = i < current ? icon1 : icon2;
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };
    
    Window_Base.prototype.drawATGauge = function(actor, x, y, width) {
        if (FTKR.BAT.dispATGauge && !FTKR.BAT.atDrawType && actor.maxActionTimes() > 0) {
            var color1 = this.atGaugeColor1();
            var color2 = this.atGaugeColor2();
            this.drawGauge(x, y, width, actor.atRate(), color1, color2);
        }
    };

    Window_Base.prototype.atGaugeColor1 = function() {
        return this.textColor(FTKR.BAT.atGaugeColor1);
    };

    Window_Base.prototype.atGaugeColor2 = function() {
        return this.textColor(FTKR.BAT.atGaugeColor2);
    };

    //=============================================================================
    // Window_BattleStatus
    //=============================================================================

    var _BAT_Window_BattleStatus_drawActorName = Window_BattleStatus.prototype.drawActorName;
    Window_BattleStatus.prototype.drawActorName = function(actor, x, y, width) {
        if (FTKR.BAT.activated) this.changePaintOpacity(actor.canAction());
        if (FTKR.BAT.showAT) {
            this.drawActorActionTimes(actor, x, y, width);
        }
        _BAT_Window_BattleStatus_drawActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
    };

    var _BAT_Window_BattleStatus_drawActorFace = Window_BattleStatus.prototype.drawActorFace;
    Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        if (FTKR.BAT.activated === 2) this.changePaintOpacity(actor.canAction());
        _BAT_Window_BattleStatus_drawActorFace.call(this, actor, x, y, width, height);
        this.changePaintOpacity(true);
    };

    //=============================================================================
    //FTKR_CustomSimpleActorStatus.js の対応
    //=============================================================================

    var _BAT_Window_BattleStatus_drawCssActorName = Window_BattleStatus.prototype.drawCssActorName;
    Window_BattleStatus.prototype.drawCssActorName = function(actor, x, y, width) {
        if (FTKR.BAT.activated) this.changePaintOpacity(actor.canAction());
        var line = _BAT_Window_BattleStatus_drawCssActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
        return line;
    };

    var _BAT_Window_BattleStatus_drawCssFace = Window_BattleStatus.prototype.drawCssFace;
    Window_BattleStatus.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        _BAT_Window_BattleStatus_drawCssFace.call(this, actor, dx, dy, width, height);
        if (Imported.FTKR_FAA &&!(!$gameParty.inBattle() || FTKR.FAA.destination !== 1)) {
            var index = actor.index() % this.showActorNum();
            this._faceSprite[index].opacity = this.isEnabledChangePaintOpacity(actor) ?
                255 : this.translucentOpacity();
        }
    };

    Window_BattleStatus.prototype.isEnabledChangePaintOpacity = function(actor) {
        var result = FTKR.BAT.activated === 2 && actor && actor.canAction() || FTKR.BAT.activated !== 2;
        if (Imported.FTKR_CSS) {
            result = Window_Base.prototype.isEnabledChangePaintOpacity.call(this, actor) && result;
        }
        return result;
    };

    if (Imported.FTKR_CSS) {

    var _BAT_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'ACTC':
                return this.drawActorActionTimes(actor, x, y, width);
            default:
                return _BAT_Window_Base_drawCssActorStatusBase_B.apply(this, arguments);
        }
    };

    }//FTKR_CustomSimpleActorStatus.js


}());//EOF
