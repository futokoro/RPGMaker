//=============================================================================
// アクターのバトルコマンドの表示を変更するプラグイン
// FTKR_ExBattleCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/11/25
// 最終更新日 : 2020/01/03
// バージョン : v2.2.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBC = true;

var FTKR = FTKR || {};
FTKR.EBC = FTKR.EBC || {};

//=============================================================================
/*:
 * @plugindesc v2.2.2 アクターのバトルコマンドの表示を変更する
 * @author フトコロ
 *
 * @param --パーティーコマンド--
 * @default
 * 
 * @param Party Command List
 * @desc パーティーコマンドの表示内容と順番を設定します。コマンドの間は、カンマ(,)で区切ってください。空欄の場合はこの機能を無効にします。
 * @default fight,escape
 * 
 * @param Party Commands
 * @desc パーティーコマンドの内容を設定します。
 * @type struct<party>
 * @default {"fight":"{\"enabled\":\"\",\"ext\":\"\",\"skillId\":\"\"}","escape":"{\"enabled\":\"BattleManager.canEscape()\",\"ext\":\"\",\"skillId\":\"\"}","customs":"[]"}
 *
 * @param --コマンドアイコン--
 * @default
 * 
 * @param Show Command Icon
 * @desc コマンドに設定したスキルのアイコンを表示します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param --コマンド説明文--
 * @default
 * 
 * @param Show Command Description
 * @desc コマンドに設定したスキルの説明文を表示します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param --空欄コマンド--
 * @default
 * 
 * @param Enable Select Blank
 * @desc 空欄コマンドのカーソル選択を可能にするかどうか設定する。
 * @type boolean
 * @on 選択可
 * @off 選択不可
 * @default false
 * 
 * @param atcode
 * @text --- 特徴および使用効果コードID ---
 * 
 * @param TRAIT_ACTOR_COMMAND
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 200
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * アクターのバトルコマンドを変更します。
 * 変更可能な項目は以下の通りです。
 * 
 * 1．パーティーコマンドやアクターコマンドにアイコンや説明文を表示できます。
 * 2．パーティーコマンドの表示内容や順番を設定できます。
 * 3．アクターコマンドの表示内容をアクター毎に設定できます。
 * 4. アクターコマンドに直接スキルを設定できます。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_ExBattleCommand.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインは、FTKR_BattleCommandIcon.jsと組み合わせて使用できません。
 * 
 * 3. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_AlternatingTurnBattle.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_ExBattleCommand.js
 *    ↓このプラグインよりも下に登録↓
 *    FTKR_BattleActionPoints.js
 *    FTKR_DisplayCommandFrame.js
 *    
 * 
 * -----------------------------------------------------------------------------
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
 * v2.2.2 - 2020/01/03 : 機能追加、不具合修正
 *    1. 空欄コマンドのカーソル選択をプラグインパラメータで設定する機能を追加。
 *    2. カーソル選択不可設定の場合でコマンドが２列以上の場合に、カーソル移動で
 *       空欄部を飛ばす処理が正しく動作しない不具合を修正。
 *    3. カーソル選択不可設定の場合でタッチ操作の場合に、空欄部をタッチしてカーソルを
 *       移動できてしまう不具合を修正。
 * 
 * v2.2.1 - 2019/12/29 : 機能追加
 *    1. パーティーコマンドのカスタムコマンドに、指定したコモンイベントを実行する
 *       機能(実行時にターン進行しない)を追加。
 * 
 * v2.2.0 - 2019/12/29 : 機能追加
 *    1. パーティーコマンドのカスタムコマンドに、指定したコモンイベントを実行する
 *       機能(実行時にターン進行)を追加。
 * 
 * v2.1.0 - 2019/12/24 : 機能追加
 *    1. パーティーコマンドやアクターコマンドに空欄(カーソル選択不可)を空ける機能を追加。
 *          ⇒ v2.2.2 にて選択不可かどうかはプラグインパラメータで選択に変更。
 * 
 * v2.0.1 - 2018/12/11 : 不具合修正、ヘルプ削除
 *    1. パーティーコマンドに追加コマンドを設定するとエラーになる不具合を修正。
 * 
 * v2.0.0 - 2018/12/10 : 仕様見直し
 *    1. データベースのスキルを使って、コマンドのアイコンや説明文を設定するように変更。
 *    2. アクターコマンドの設定方法を変更。（タグ変更、プラグインパラメータ削除）
 *    2. カスタムコマンドの表示条件を設定する機能を削除。
 *    3. コストを表示する機能を削除。
 * 
 * v1.2.2 - 2018/10/09 : 不具合修正
 *    1. 説明文を表示した状態でパーティーコマンドを表示させた場合に、説明文が
 *       そのまま残ってしまう不具合を修正。
 * 
 * v1.2.1 - 2018/10/05 : 不具合修正
 *    1. カスタムコマンドのコストを非表示にしていても、コマンド名が左右につぶれて
 *       表示してしまう不具合を修正。
 * 
 * v1.2.0 - 2018/10/05 : 機能追加
 *    1. カスタムコマンド選択時にスキルに設定した説明文を表示する機能を追加。
 * 
 * v1.1.0 - 2018/04/09 : 機能追加
 *    1. FTKR_AlternatingTurnBattle.jsの v1.1.0 に対応。
 *    2. パーティーコマンドの表示順番を設定する機能を追加。
 *    3. カスタムコマンドのコストを表示する機能を追加。
 * 
 * v1.0.1 - 2018/03/27 : 不具合修正、ヘルプ修正
 *    1.複数の特徴欄で同じスキルタイプを追加したときに、コマンドが重複して
 *      表示してしまう不具合を修正。
 * 
 * v1.0.0 - 2017/11/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~party:
 * @param fight
 * @desc 「戦う」コマンドを設定します。
 * @type struct<command>
 * @default 
 *
 * @param escape
 * @desc 「逃げる」コマンドを設定します。
 * @type struct<command>
 * @default 
 *
 * @param customs
 * @desc 追加するパーティーコマンドを設定します。
 * @type struct<custom>[]
 * @default 
*/
/*~struct~command:
 * @param enabled
 * @desc コマンドの実行条件
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param ext
 * @desc コマンドの拡張パラメータ
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param skillId
 * @desc コマンドのスキルID
 * 0 は スキル未指定
 * @type number
 * @min 0
 * @default 
*/
/*~struct~custom:
 * @param name
 * @desc コマンドの表示名
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param symbol
 * @desc コマンドのシンボル
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param enabled
 * @desc コマンドの実行条件
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param ext
 * @desc コマンドの拡張パラメータ
 * コマンドの仕様に合わせてください。
 * @default 
 * 
 * @param skillId
 * @desc コマンドの説明用スキルID
 * 0 は スキル未指定
 * @type number
 * @min 0
 * @default 
 * 
 * @param show
 * @desc コマンドの表示条件
 * コマンドの仕様に合わせてください。
 * @default 
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

    var readMetadata = function(data, metacode, traitCode) {
        var re = /<([^<>:]+)(:?)[ ]*([^>]*)>/g;
        for (;;) {
            var match = re.exec(data.note);
            if (match) {
                if (metacode === match[1].toUpperCase()) {
                    var text = match[3];
                    var times = text.split(' ');
                    data.traits.push({
                        code     : Game_BattlerBase[traitCode],
                        dataId   : times[0],
                        ext      : times[1] || '',
                        enabled  : times[2] || 'true',       //enabled
                        skillId  : Number(times[3]) || 0,    //skillId
                        priority : Number(times[4]) || 0,
                    });
                }
            } else {
                break;
            }
        }
    };
    
    var readObjectMeta = function(obj, metacodes, traitCode) {
        if (!obj) return false;
        metacodes.forEach(function(metacode){
            readMetadata(obj, metacode, traitCode);
        }); 
    };

    var removeEndBlankCommand = function(list) {
        while(list[0].symbol == "blank"){
            list.shift();
        };
        while(list[list.length-1].symbol == "blank"){
            list.pop();
        };
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExBattleCommand');

    FTKR.EBC = {
        partyCmdList    : paramParse(parameters['Party Command List']),
        partyCmds       : paramParse(parameters['Party Commands']),
        showCommandIcon : paramParse(parameters['Show Command Icon']) || false,
        showCommandDesc : paramParse(parameters['Show Command Description']) || false,
        enableSelectBlank : paramParse(parameters['Enable Select Blank']) || false,
    };

    Game_BattlerBase.TRAIT_ACTOR_COMMAND = +(paramParse(parameters['TRAIT_ACTOR_COMMAND']));

    //=============================================================================
    // DataManager
    //=============================================================================

    var _EBC_DatabaseLoaded = false;
    var _EBC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_EBC_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_EBC_DatabaseLoaded) {
            this.ebcTraitNoteTags($dataActors);
            this.ebcTraitNoteTags($dataClasses);
            this.ebcTraitNoteTags($dataWeapons);
            this.ebcTraitNoteTags($dataArmors);
            this.ebcTraitNoteTags($dataStates);
            _EBC_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.ebcTraitNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            readObjectMeta(obj, ['FTKR_ACTOR_COMMAND'], 'TRAIT_ACTOR_COMMAND');
        }
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    BattleManager.processEbcEvent = function(eventId) {
        $gameTroop.setupEbcBattleEvent(eventId);
        $gameParty.clearActions();
        this.startTurn();
    };

    BattleManager.processEbcEventB = function(eventId) {
        $gameTroop.setupEbcBattleEvent(eventId);
        this._phase = 'start';
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.battleCommands = function() {
        return this.traits(Game_BattlerBase.TRAIT_ACTOR_COMMAND);
    };

    Game_Actor.prototype.sortBattleCommands = function() {
        return this.battleCommands().sort(function(a, b) {
            var p1 = a.priority;
            var p2 = b.priority;
            if (p1 !== p2) {
                return p2 - p1;
            }
            return a - b;
        });
    };
    
    //=============================================================================
    // Window_Command
    //=============================================================================

    Window_Command.prototype.drawBattleCommand = function(index, rect, align) {
        var x1 = this.drawBattleCommandIcon(index, rect.x, rect.y);
        this.drawBattleCommandName(index, rect.x + x1, rect.y, rect.width - x1, align);
    };

    Window_Command.prototype.drawBattleCommandIcon = function(index, x, y) {
        if (FTKR.EBC.showCommandIcon) {
            var skill = this.commandEbcSkill(index);
            if (skill) {
                var iconIndex = skill.iconIndex;
                if (iconIndex) {
                    this.drawIcon(iconIndex, x, y + 2);
                    return Window_Base._iconWidth + 2;
                }
            }
        }
        return 0;
    };

    Window_Command.prototype.drawBattleCommandName = function(index, x, y, width, align) {
        this.drawText(this.commandName(index), x, y, width, align);
    };

    Window_Command.prototype.addEbcCommand = function(name, symbol, enabled, ext, skillId) {
        if (enabled === null) {
            enabled = true;
        }
        if (skillId === null) {
            skillId = 0;
        }
        this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext, skillId:skillId});
    };

    Window_Command.prototype.commandEbcSkillId = function(index) {
        return this._list[index].skillId;
    };

    Window_Command.prototype.currentEbcSkillId = function() {
        return this.currentData() ? this.currentData().skillId : null;
    };

    Window_Command.prototype.findEbcSkillId = function(skillId) {
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[i].skillId === skillId) {
                return i;
            }
        }
        return 0;
    };

    Window_Command.prototype.isActionSkillCommand = function(index) {
        return ['attack', 'guard', 'custom'].contains(this.commandSymbol(index));
    };

    Window_Command.prototype.commandEbcSkill = function(index) {
        return this.ebcDataSkill(this.commandEbcSkillId(index));
    };

    Window_Command.prototype.ebcDataSkill = function(skillId) {
        return skillId > 0 ? $dataSkills[skillId] : null;
    };

    Window_Command.prototype.currentEbcSkill = function() {
        return this.ebcDataSkill(this.currentEbcSkillId());
    };
    
    Window_Command.prototype.isEbcCommandEnabled = function(index) {
        return eval(this._list[index].enabled);
    };

    Window_Command.prototype.isEbcCurrentItemEnabled = function() {
        return this.currentData() ? eval(this.currentData().enabled) : false;
    };

    Window_Command.prototype.addEbcBlankCommand = function() {
        this.addEbcCommand('', 'blank', false, null, null);
    };
    
    Window_Command.prototype.isEbcBlankCommand = function(index) {
        return this.commandSymbol(index) == 'blank';
    }

    Window_Command.prototype.updateEbcSkillHelp = function() {
        var item = this.currentEbcSkill();
        this.setHelpWindowItem(item);
        if (item && item.description) {
            this.showHelpWindow();
        } else {
            this.hideHelpWindow();
        }
    };

    Window_Command.prototype.selectEbc = function(index) {
        if (!this.isEbcBlankCommand(index)) {
            this.select(index);
            return true;
        }
        return false;
    };

    Window_Command.prototype.cursorDownEbc = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        var maxRows = Math.ceil(maxItems / maxCols);
        for (var i = 1; i < maxRows + 1; i++){
            var newIndex = index + maxCols * i;
            if (newIndex < maxItems || (wrap && maxCols === 1)){
                if (this.selectEbc(newIndex % maxItems)) return;
            }
        }
    };

    Window_Command.prototype.cursorUpEbc = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        var maxRows = Math.ceil(maxItems / maxCols);
        for (var i = 1; i < maxRows + 1; i++){
            var newIndex = index - maxCols * i;
            if (newIndex >= 0 || (wrap && maxCols === 1)){
                if (this.selectEbc((newIndex + maxItems) % maxItems)) return;
            }
        }
    };

    Window_Command.prototype.cursorRightEbc = function(wrap) {
        if (this.maxCols() >= 2) {
            for (var i = this.index(); i < this.maxItems() - 1;) {
                i++
                if (this.selectEbc(i)) return;
            }
        }
    };

    Window_Command.prototype.cursorLeftEbc = function(wrap) {
        if (this.maxCols() >= 2) {
            for (var i = this.index(); i > 0;) {
                i--
                if (this.selectEbc(i)) return;
            }
        }
    };

    Window_Command.prototype.disableTouchCommand = function(triggered) {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        return hitIndex >= 0 && this.isEbcBlankCommand(hitIndex) && !FTKR.EBC.enableSelectBlank;
    };
    
    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    var _EBC_Window_PartyCommand_initalize = Window_PartyCommand.prototype.initialize;
    Window_PartyCommand.prototype.initialize = function() {
        _EBC_Window_PartyCommand_initalize.call(this);
        this._windowType = 'party';
    };

    Window_PartyCommand.prototype.addEbcFightCommand = function() {
        var cmd = FTKR.EBC.partyCmds.fight;
        this.addEbcCommand(TextManager.fight, 'fight', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    Window_PartyCommand.prototype.addEbcEscapeCommand = function() {
        var cmd = FTKR.EBC.partyCmds.escape;
        this.addEbcCommand(TextManager.escape, 'escape', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    Window_PartyCommand.prototype.addEbcCustomCommand = function(symbol) {
        if (!symbol) return;
        var match = /custom(\d+)/i.exec(symbol);
        if (!match) return;
        var cmd = FTKR.EBC.partyCmds.customs[Number(match[1])-1];
        if (this.includeEbc(cmd)) {
            this.addEbcCommand(cmd.name, cmd.symbol, cmd.enabled, cmd.ext, cmd.skillId);
        }
    };

    Window_PartyCommand.prototype.includeEbc = function(command) {
        return command.show && eval(command.show) || !command.show;
    };
    
    var _EBC_Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        if (this.isEbcCommandOk()) {
            this.makeEbcCommandList();
        }else {
            _EBC_Window_PartyCommand_makeCommandList.call(this);
        }
    };

    Window_PartyCommand.prototype.isEbcCommandOk = function() {
        return FTKR.EBC.partyCmdList;
    };

    Window_PartyCommand.prototype.makeEbcCommandList = function() {
        FTKR.EBC.partyCmdList.split(',').forEach(function(symbol){
            this.makeEbcCommand(symbol);
        },this);
    //  removeEndBlankCommand(this._list);
    };

    Window_PartyCommand.prototype.makeEbcCommand = function(symbol) {
        switch(symbol.toUpperCase()) {
            case 'FIGHT':
                return this.addEbcFightCommand();
            case 'ESCAPE':
                return this.addEbcEscapeCommand();
            case 'BLANK':
                return this.addEbcBlankCommand();
            default:
                return this.addEbcCustomCommand(symbol);
        }
    };

    //書き換え
    Window_PartyCommand.prototype.isCommandEnabled = function(index) {
        return this.isEbcCommandEnabled(index);
    };

    //書き換え
    Window_PartyCommand.prototype.isCurrentItemEnabled = function() {
        return this.isEbcCurrentItemEnabled();
    };

    //書き換え
    Window_PartyCommand.prototype.updateHelp = function() {
        this.updateEbcSkillHelp();
    };

    //書き換え
    Window_PartyCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawBattleCommand(index, rect, align);
    };

    var _EBC_Window_PartyCommand_cursorDown = Window_PartyCommand.prototype.cursorDown;
    Window_PartyCommand.prototype.cursorDown = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorDownEbc(wrap);
        } else {
            _EBC_Window_PartyCommand_cursorDown.call(this, wrap);
        }
    };

    var _EBC_Window_PartyCommand_cursorUp = Window_PartyCommand.prototype.cursorUp;
    Window_PartyCommand.prototype.cursorUp = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorUpEbc(wrap);
        } else {
            _EBC_Window_PartyCommand_cursorUp.call(this, wrap);
        }
    };

    var _EBC_Window_PartyCommand_cursorRight = Window_PartyCommand.prototype.cursorRight;
    Window_PartyCommand.prototype.cursorRight = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorRightEbc(wrap);
        } else {
            _EBC_Window_PartyCommand_cursorRight.call(this, wrap);
        }
    };

    var _EBC_Window_PartyCommand_cursorLeft = Window_PartyCommand.prototype.cursorLeft;
    Window_PartyCommand.prototype.cursorLeft = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorLeftEbc(wrap);
        } else {
            _EBC_Window_PartyCommand_cursorLeft.call(this, wrap);
        }
    };

    var _EBC_Window_PartyCommand_onTouch = Window_PartyCommand.prototype.onTouch;
    Window_PartyCommand.prototype.onTouch = function(triggered) {
        if (this.disableTouchCommand(triggered)) return;
        _EBC_Window_PartyCommand_onTouch.call(this, triggered);
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    var _EBC_Window_ActorCommand_initalize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function() {
        _EBC_Window_ActorCommand_initalize.call(this);
        this._windowType = 'actor';
    };

    //書き換え
    Window_ActorCommand.prototype.addEbcAttackCommand = function(cmd) {
        this.addEbcCommand(TextManager.attack, 'attack', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    Window_ActorCommand.prototype.addEbcSkillCommand = function(cmd) {
        var stypeId = Number(cmd.ext);
        var name = $dataSystem.skillTypes[stypeId];
        this.addEbcCommand(name, 'skill', cmd.enabled, stypeId, cmd.skillId);
    };
    
    //書き換え
    Window_ActorCommand.prototype.addEbcGuardCommand = function(cmd) {
        this.addEbcCommand(TextManager.guard, 'guard', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    //書き換え
    Window_ActorCommand.prototype.addEbcItemCommand = function(cmd) {
        this.addEbcCommand(TextManager.item, 'item', cmd.enabled, cmd.ext, cmd.skillId);
    };

    //書き換え
    Window_ActorCommand.prototype.isCommandEnabled = function(index) {
        return this.isEbcCommandEnabled(index);
    };

    //書き換え
    Window_ActorCommand.prototype.isCurrentItemEnabled = function() {
        return this.isEbcCurrentItemEnabled();
    };

    //書き換え
    Window_ActorCommand.prototype.updateHelp = function() {
        this.updateEbcSkillHelp();
    };

    //書き換え
    Window_ActorCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawBattleCommand(index, rect, align);
    };

    var _EBC_Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            if (this.isEbcCommandOk()) {
                this.makeEbcCommandList();
            } else {
                _EBC_Window_ActorCommand_makeCommandList.call(this);
            }
        }
    };

    Window_ActorCommand.prototype.isEbcCommandOk = function() {
        return this._actor && this._actor.sortBattleCommands().length;
    };

    Window_ActorCommand.prototype.makeEbcCommandList = function() {
        this._actor.sortBattleCommands().forEach(function(cmd, i){
            this.makeEbcCommand(cmd);
        },this);
//                removeEndBlankCommand(this._list);
    };

    Window_ActorCommand.prototype.makeEbcCommand = function(cmd) {
        switch(cmd.dataId.toUpperCase()) {
            case 'CUSTOM':
                return this.addCustomCommand(cmd);
            case 'ATTACK':
                return this.addEbcAttackCommand(cmd);
            case 'GUARD':
                return this.addEbcGuardCommand(cmd);
            case 'SKILL':
                return this.addEbcSkillCommand(cmd);
            case 'ITEM':
                return this.addEbcItemCommand(cmd);
            case 'BLANK':
                return this.addEbcBlankCommand();
        }
    };

    Window_ActorCommand.prototype.addCustomCommand = function(cmd) {
        var skill = this.ebcDataSkill(cmd.skillId);
        var enabled = cmd.enabled + '&&this._actor.canUse(this.ebcDataSkill(' + cmd.skillId + '))';
        this.addEbcCommand(skill.name, 'custom', enabled, cmd.skillId, cmd.skillId);
    };

    var _EBC_Window_ActorCommand_selectLast = Window_ActorCommand.prototype.selectLast;
    Window_ActorCommand.prototype.selectLast = function() {
        _EBC_Window_ActorCommand_selectLast.call(this);
        this.selectLastEbc();
    };

    Window_ActorCommand.prototype.selectLastEbc = function() {
        if (this._actor && ConfigManager.commandRemember) {
            var symbol = this._actor.lastCommandSymbol();
            if (symbol === 'custom') {
                var skill = this._actor.lastBattleSkill();
                if (skill) {
                    this.selectExt(skill.id);
                }
            }
        }
    };

    var _EBC_Window_ActorCommand_cursorDown = Window_ActorCommand.prototype.cursorDown;
    //書き換え
    Window_ActorCommand.prototype.cursorDown = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorDownEbc(wrap);
        } else {
            _EBC_Window_ActorCommand_cursorDown.call(this, wrap);
        }
    };

    var _EBC_Window_ActorCommand_cursorUp = Window_ActorCommand.prototype.cursorUp;
    //書き換え
    Window_ActorCommand.prototype.cursorUp = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorUpEbc(wrap);
        } else {
            _EBC_Window_ActorCommand_cursorUp.call(this, wrap);
        }
    };

    var _EBC_Window_ActorCommand_cursorRight = Window_ActorCommand.prototype.cursorRight;
    //書き換え
    Window_ActorCommand.prototype.cursorRight = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorRightEbc(wrap);
        } else {
            _EBC_Window_ActorCommand_cursorRight.call(this, wrap);
        }
    };

    var _EBC_Window_ActorCommand_cursorLeft = Window_ActorCommand.prototype.cursorLeft;
    //書き換え
    Window_ActorCommand.prototype.cursorLeft = function(wrap) {
        if (!FTKR.EBC.enableSelectBlank) {
            this.cursorLeftEbc(wrap);
        } else {
            _EBC_Window_ActorCommand_cursorLeft.call(this, wrap);
        }
    };

    var _EBC_Window_ActorCommand_onTouch = Window_ActorCommand.prototype.onTouch;
    Window_ActorCommand.prototype.onTouch = function(triggered) {
        if (this.disableTouchCommand(triggered)) return;
        _EBC_Window_ActorCommand_onTouch.call(this, triggered);
    };
    
    //=============================================================================
    // Scene_Battle
    //=============================================================================

    // パーティーコマンドの修正
    var _EBC_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _EBC_Scene_Battle_createPartyCommandWindow.call(this);
        this._partyCommandWindow.setHandler('event', this.commandEvent.bind(this));
        this._partyCommandWindow.setHandler('eventB', this.commandEventB.bind(this));
    };

    Scene_Battle.prototype.commandEvent = function() {
        var commonEventId = this._partyCommandWindow.currentExt();
        BattleManager.processEbcEvent(commonEventId);
        this.changeInputWindow();
    };

    Scene_Battle.prototype.commandEventB = function() {
        var commonEventId = this._partyCommandWindow.currentExt();
        BattleManager.processEbcEventB(commonEventId);
        this.changeInputWindow();
    };

    var _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
    Scene_Battle.prototype.endCommandSelection = function() {
        _Scene_Battle_endCommandSelection.call(this);
        this._actorCommandWindow.hideHelpWindow();
    };

    // アクターコマンドの修正
    var _EBC_Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _EBC_Scene_Battle_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler('custom', this.commandCustom.bind(this));
    };

    Scene_Battle.prototype.commandCustom = function() {
        var skill = this._actorCommandWindow.currentEbcSkill();
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };
    
    // ヘルプウィンドウの修正
    var _EBC_Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function() {
        _EBC_Scene_Battle_createHelpWindow.call(this);
        if (FTKR.EBC.showCommandDesc) {
            this._partyCommandWindow.setHelpWindow(this._helpWindow);
            this._actorCommandWindow.setHelpWindow(this._helpWindow);
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    // スキルタイプ重複表示の不具合修正
    Game_BattlerBase.prototype.addedSkillTypes = function() {
        return this.traitsSet(Game_BattlerBase.TRAIT_STYPE_ADD).filter(function(x, i, self) {
            return self.indexOf(x) === i;
        });
    };

    //=============================================================================
    // Game_Troop
    //=============================================================================

    // 指定したコモンイベントをセット
    Game_Troop.prototype.setupEbcBattleEvent = function(eventId) {
        if (!this._interpreter.isRunning()) {
            if (this._interpreter.setupReservedCommonEvent()) {
                return false;
            }
            var event = $dataCommonEvents[eventId];
            if (event) {
                this._interpreter.setup(event.list, this.troop().id);
                return true;
            }
        }
        return false;
    };

}());//EOF
