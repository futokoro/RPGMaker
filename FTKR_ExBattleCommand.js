//=============================================================================
// アクターのバトルコマンドの表示を変更するプラグイン
// FTKR_ExBattleCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/11/25
// 最終更新日 : 2018/12/10
// バージョン : v2.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBC = true;

var FTKR = FTKR || {};
FTKR.EBC = FTKR.EBC || {};

//=============================================================================
/*:
 * @plugindesc v2.0.0 アクターのバトルコマンドの表示を変更する
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
 *-----------------------------------------------------------------------------
 * パーティーコマンドの設定方法
 *-----------------------------------------------------------------------------
 * プラグインパラメータ Party Command List で、パーティーコマンドの
 * 表示内容と順番を設定できます。
 * 
 * リストに設定できる内容は以下の通りです。
 * 
 * ・基本のコマンドの場合
 *    fight   - 「戦う」コマンド
 *    escape  - 「逃げる」コマンド
 *    custom* - プラグインパラメータ Party Command Icons の
 *              custom に追加したコマンド
 *              custom* の * 部には、リストの番号を記載します。
 * 
 * 例)※半角スペースは入れない
 *    fight,escap,custom1
 * 
 * 
 * ＜プラグインパラメータ Party Command Icons の custom の設定＞
 * このパラメータでは、他のプラグインで追加したパーティーコマンドを定義し、
 * そのコマンドアイコンを設定します。
 * 
 * 設定時には、以下のパラメータの内容に気をつけてください。
 * これらは、他のプラグイン内のコマンド定義と同じにする必要があります。
 * 
 *    symbol
 *    ext
 *    enabled(コマンド実行条件)
 * 
 * 具体的に何を設定するかは、他のプラグインによります。
 * 
 * 例)
 * FTKR_AlternatingTurnBattle.jsの「ターン終了」コマンドの場合は
 * 以下の通りです。名前は自由に設定できます。
 * 
 *    symbol    ：trunEnd
 *    ext       ：空欄
 *    enabled   ：空欄
 *    skillId   ：任意
 * 
 *-----------------------------------------------------------------------------
 * アクターコマンドの設定方法
 *-----------------------------------------------------------------------------
 * アクターのメモ欄に以下のタグを設定することで
 * リストで設定した順番にアクターコマンドを表示します。
 * 
 * <EBC_コマンド>
 * リスト
 * </EBC_コマンド>
 * 
 * または
 * 
 * <EBC_COMMAND>
 * list
 * </EBC_COMMAND>
 * 
 * 
 * ＜リスト(list)の設定＞
 * リストに設定できる内容は以下の通りです。
 * 
 * ・基本のコマンドの場合
 *    攻撃　　 or attack - 「攻撃」コマンド
 *    防御　　 or guard  - 「防御」コマンド
 *    スキル　 or skill  - 各スキルコマンド(*1)
 *    アイテム or item   - 「アイテム」コマンド
 * 
 *    (*1)「スキル」と記載したときに表示するスキルタイプは、
 *        アクター等の特徴で追加したスキルタイプです。
 * 
 * 
 * ・カスタムコマンド
 *    スキルIDを指定することで、特定のスキルを直接コマンドで選択できます。
 *    以下の記述で設定してください。
 * 
 *    表示名, スキルID : 表示条件
 *    displayName, skillId : displayCondition
 * 
 *      表示名   - 記載した文字列をコマンド名として表示します。
 *                \v[n]で、変数ID n の値を参照できます。
 *      スキルID - このIDで指定したスキルを実行します。
 *                \v[n]で、変数ID n の値を参照できます。
 *      表示条件 - スクリプトの条件式で、コマンドを表示させる条件を
 *                設定できます。true と記載すると、常に表示します。(*2)
 *    
 *    (*2)条件式に使用可能なコードについて
 *    条件式には以下のコードが使用できます。
 *      a.param    - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *      v[x]       - 変数ID x の値を参照します。
 *      s[x]       - スイッチID x の値を参照します。
 *    
 *    例)
 *    ファイア, 9 : true
 *    スパーク, 10 : a.level >= 10
 * 
 * 
 * コマンド設定例)
 * 以下の様に、カスタムコマンドと基本コマンドは併用可能です。
 * 
 * <EBC_コマンド>
 * ファイア, 9 : tare
 * guard
 * item
 * </EBC_コマンド>
 * 
 *-----------------------------------------------------------------------------
 * コマンドにアイコンを追加
 *-----------------------------------------------------------------------------
 * バトルコマンドにアイコンを追加します。
 * コマンド毎にプラグインパラメータで設定してください。
 * 
 * 
 * ＜スキルコマンドについて＞
 * スキルコマンドの設定は、カンマ(,)を使います。
 * 
 * 例）スキルタイプ1が「魔法」スキルタイプ2が「必殺技」の場合
 * プラグインパラメータには、以下の様に２つのアイコン番号を指定します。
 * 
 *    79,76
 * 
 * この時、「魔法」のアイコンが 79、「必殺技」のアイコンが 76 になります。
 * 
 * 
 * ＜カスタムコマンドについて＞
 * カスタムコマンドのアイコンを「表示する」に設定すると、カスタムコマンドで
 * 指定したスキルのアイコンを表示するようになります。
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
 * @desc コマンドのスキルID
 * 0 は スキル未指定
 * @type number
 * @min 0
 * @default 
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

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExBattleCommand');

    FTKR.EBC = {
        partyCmdList    : paramParse(parameters['Party Command List']),
        partyCmds       : paramParse(parameters['Party Commands']),
        showCommandIcon : paramParse(parameters['Show Command Icon']) || false,
        showCommandDesc : paramParse(parameters['Show Command Description']) || false,
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

    Window_Command.prototype.updateEbcSkillHelp = function() {
        var item = this.currentEbcSkill();
        this.setHelpWindowItem(item);
        if (item && item.description) {
            this.showHelpWindow();
        } else {
            this.hideHelpWindow();
        }
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    var _EBC_Window_PartyCommand_initalize = Window_PartyCommand.prototype.initialize;
    Window_PartyCommand.prototype.initialize = function() {
        _EBC_Window_PartyCommand_initalize.call(this);
        this._windowType = 'party';
    };

    Window_PartyCommand.prototype.addFightCommand = function() {
        var cmd = FTKR.EBC.partyCmds.fight;
        this.addEbcCommand(TextManager.fight, 'fight', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    Window_PartyCommand.prototype.addEscapeCommand = function() {
        var cmd = FTKR.EBC.partyCmds.escape;
        this.addEbcCommand(TextManager.escape, 'escape', cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    Window_PartyCommand.prototype.addCustomCommand = function(list) {
        var match = /custom(\d+)/i.exec(list);
        if (!match) break;
        var cmd = FTKR.EBC.partyCmds.customs[Number(match[1])-1];
        this.addEbcCommand(cmd.name, cmd.symbol, cmd.enabled, cmd.ext, cmd.skillId);
    };
    
    var _EBC_Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        if (FTKR.EBC.partyCmdList) {
            FTKR.EBC.partyCmdList.split(',').forEach(function(list){
                switch(list.toUpperCase()) {
                case 'FIGHT':
                    this.addFightCommand();
                    break;
                case 'ESCAPE':
                    this.addEscapeCommand();
                    break;
                default:
                    this.addCustomCommand(list);
                    break;
                }
            },this);
        }else {
            _EBC_Window_PartyCommand_makeCommandList.call(this);
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
            var cmds = this._actor.sortBattleCommands();
            if (cmds.length) {
                cmds.forEach(function(cmd, i){
                    switch(cmd.dataId.toUpperCase()) {
                    case 'CUSTOM':
                        this.addCustomCommand(cmd);
                        break;
                    case 'ATTACK':
                        this.addEbcAttackCommand(cmd);
                        break;
                    case 'GUARD':
                        this.addEbcGuardCommand(cmd);
                        break;
                    case 'SKILL':
                        this.addEbcSkillCommand(cmd);
                        break;
                    case 'ITEM':
                        this.addEbcItemCommand(cmd);
                        break;
                    }
                },this);
            } else {
                _EBC_Window_ActorCommand_makeCommandList.call(this);
            }
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

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    var _EBC_Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _EBC_Scene_Battle_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler('custom', this.commandCustom.bind(this));
    };

    var _EBC_Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function() {
        _EBC_Scene_Battle_createHelpWindow.call(this);
        if (FTKR.EBC.showCommandDesc) {
            this._partyCommandWindow.setHelpWindow(this._helpWindow);
            this._actorCommandWindow.setHelpWindow(this._helpWindow);
        }
    };

    Scene_Battle.prototype.commandCustom = function() {
        var skill = this._actorCommandWindow.currentEbcSkill();
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };
    
    var _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
    Scene_Battle.prototype.endCommandSelection = function() {
        _Scene_Battle_endCommandSelection.call(this);
        this._actorCommandWindow.hideHelpWindow();
    };

    //=============================================================================
    // スキルタイプ重複表示の不具合修正
    //=============================================================================

    Game_BattlerBase.prototype.addedSkillTypes = function() {
        return this.traitsSet(Game_BattlerBase.TRAIT_STYPE_ADD).filter(function(x, i, self) {
            return self.indexOf(x) === i;
        });
    };

}());//EOF
