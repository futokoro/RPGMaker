//=============================================================================
// アクターのバトルコマンドの表示を変更するプラグイン
// FTKR_ExBattleCommand.js
// プラグインNo : 58
// 作成者     : フトコロ
// 作成日     : 2017/11/25
// 最終更新日 : 2018/04/09
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBC = true;

var FTKR = FTKR || {};
FTKR.EBC = FTKR.EBC || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 アクターのバトルコマンドの表示を変更する
 * @author フトコロ
 *
 * @param --パーティーコマンド--
 * @default
 * 
 * @param Party Command List
 * @desc パーティーコマンドの表示内容と順番を設定します。
 * コマンドの間は、カンマ(,)で区切ってください。
 * @default fight,escape
 * 
 * @param Party Command Icons
 * @desc パーティーコマンドのアイコンを設定します。
 * @type struct<party>
 * @default {"fight":"0","escape":"0"}
 *
 * @param --アクターコマンド--
 * @default
 * 
 * @param Actor Command Icons
 * @desc アクターコマンドのアイコンを設定します。
 * @type struct<actor>
 * @default {"attack":"0","skills":"","guard":"0","item":"0","custom":"false"}
 *
 * @param Show Custom Cmd Cost
 * @desc カスタムコマンドのコストを表示するか指定します。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * アクターのバトルコマンドを変更します。
 * 変更可能な項目は以下の通りです。
 * 
 * １．コマンドにアイコンを表示できます。
 * ２．パーティーコマンドの表示内容や順番を設定できます。
 * ３．アクターコマンドの表示内容をアクター毎に設定できます。
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
 * 3. FTKR_AlternatingTurnBattle.jsと組み合わせる場合は、このプラグインが
 *    下になるように配置してください。
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
 * 
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
 * @desc 「戦う」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param escape
 * @desc 「逃げる」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param custom
 * @desc 他のプラグインで追加したパーティーコマンドのアイコンを設定します。
 * @type struct<custom>[]
 * @default 
 *
*/
/*~struct~custom:
 * @param name
 * @desc コマンドの表示名
 * @default 
 * 
 * @param symbol
 * @desc コマンドのシンボル
 * 追加するパーティーコマンドの仕様に合わせてください。
 * @default 
 * 
 * @param enabled
 * @desc コマンドの表示条件
 * 追加するパーティーコマンドの仕様に合わせてください。
 * @default 
 * 
 * @param ext
 * @desc コマンドの拡張パラメータ
 * 追加するパーティーコマンドの仕様に合わせてください。
 * @default 
 * 
 * @param iconId
 * @desc コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
*/
/*~struct~actor:
* @param attack
* @desc 「たたかう」コマンドのアイコン
* 0 は アイコン表示なし
* @type number
* @default 
*
* @param skills
* @desc スキルコマンドのアイコン
* カンマ(,)で区切って、スキルタイプ毎に指定
* @default 
*
* @param guard
* @desc 「防御」コマンドのアイコン
* 0 は アイコン表示なし
* @type number
* @default 
*
* @param item
* @desc 「アイテム」コマンドのアイコン
* 0 は アイコン表示なし
* @type number
* @default 

* @param custom
* @desc カスタムコマンドのアイコンの表示有無
* 表示するアイコンは、スキル毎に設定したアイコン
* @type boolean
* @on 表示する
* @off 表示しない
* @default false
*/

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace), paramRevive);
    }

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    var paramRevive = function(key, value) {
        try {
            return eval(value || value);
        } catch (e) {
            return value;
        }
    };

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
    }

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExBattleCommand');

    FTKR.EBC = {
        list : {
            party : paramParse(parameters['Party Command List'], '').split(','),
        },
        icons : {
            party : paramParse(parameters['Party Command Icons']),
            actor : paramParse(parameters['Actor Command Icons']),
        },
        showCustomCost : paramParse(parameters['Show Custom Cmd Cost']) || false,
    };
    FTKR.EBC.icons.actor.skill = (',' + FTKR.EBC.icons.actor.skills).split(',').num();

    //=============================================================================
    // 自作関数(グローバル)
    //=============================================================================

    FTKR.gameData = FTKR.gameData || {
        user   :null,
        target :null,
        item   :null,
        number :0,
        owner  :null,
    };

    if (!FTKR.setGameData) {
    FTKR.setGameData = function(user, target, item, number, owner) {
        FTKR.gameData = {
            user   :user || null,
            target :target || null,
            item   :item || null,
            number :number || 0,
            owner  :owner || null
        };
    };
    }

    if (!FTKR.evalFormula) {
    FTKR.evalFormula = function(formula) {
        var datas = FTKR.gameData;
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var a = datas.user;
            var b = datas.target;
            var c = datas.owner;
            var item   = datas.item;
            var number = datas.number;
            if (b) var result = b.result();
            var value = eval(formula);
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            console.error(e);
            return 0;
        }
    };
    }

    //=============================================================================
    // 自作処理
    //=============================================================================

    //挟み込み形式のメタデータを読み取ってtextを返す
    var readEntrapmentCodeToText = function(obj, codeTitles) {
        regs = convertEntrapmentRegArray(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var text = '';
        notedata.forEach( function(line) {
            if (testRegs(line, regs, 'a')) {
                setMode = 'read';
            } else if (testRegs(line, regs, 'b')) {
                setMode = 'none';
            } else if (setMode === 'read') {
                text += line + ';';
            }
        });
        return text;
    };

    //文字列の配列を挟み込み形式用の正規表現オブジェクトの配列に変換する
    var convertEntrapmentRegArray = function(codeTitles) {
        return codeTitles.map(function(str) {
            return {
                a:new RegExp('<' + str + '>', 'i'),
                b:new RegExp('<\/' + str + '>', 'i')
            };
        });
    };

    //正規表現オブジェクトの配列regsとdataをテストする
    var testRegs = function(data, regs, prop) {
        return regs.some(function(reg) {
            return prop ? reg[prop].test(data) : reg.test(data);
        });
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _EBC_DatabaseLoaded = false;
    var _EBC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_EBC_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_EBC_DatabaseLoaded) {
            this.actorCommandNotetags($dataActors);
            _EBC_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.actorCommandNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.ebc = {};
            obj.ebc.cmds = [];
            var datas = readEntrapmentCodeToText(obj, ['EBC_コマンド', 'EBC_COMMAND']);
            this.readActorCmdMeta(obj, datas);
        }
    };

    DataManager.readActorCmdMeta = function(obj, metaDatas) {
        var datas = metaDatas.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            switch(data.toUpperCase()) {
            case 'ATTACK':
            case '攻撃':
                obj.ebc.cmds.push(['attack']);
                break;
            case 'GUARD':
            case '防御':
                obj.ebc.cmds.push(['guard']);
                break;
            case 'SKILL':
            case 'スキル':
                obj.ebc.cmds.push(['skill']);
                break;
            case 'ITEM':
            case 'アイテム':
                obj.ebc.cmds.push(['item']);
                break;
            default:
                var match = /(.+)[ ]*,[ ]*(.+)[ ]*:[ ]*(.+)/.exec(data);
                /*-----------------------
                    match[1] = 表示名
                    match[2] = スキルID
                    match[3] = 表示条件
                -----------------------*/
                if (!match) break;
                obj.ebc.cmds.push(['custom', match[1], match[2], match[3]]);
                break;
            }
        }
    };

    //=============================================================================
    // Window_Command
    //=============================================================================

    Window_Command.prototype.commandExt = function(index) {
        return this._list[index].ext;
    };
    Window_Command.prototype.commandIconId = function(index) {
        return this._list[index].iconId;
    };

    Window_Command.prototype.cmdIconId = function(index) {
        var commandType = FTKR.EBC.icons[this._windowType]
        if (!commandType) return 0;
        var ext = this.commandExt(index);
        var symbol = this.commandSymbol(index);
        var pCmdId = this.commandIconId(index);
        if (symbol === 'custom') {
            var id = Number(convertEscapeCharacters(ext+''));
            var icon = commandType[symbol] ? $dataSkills[id].iconIndex : 0;
        } else if (pCmdId) {
            var icon = pCmdId;
        } else {
            var icon = ext ?
                commandType[this.commandSymbol(index)][ext]:
                commandType[this.commandSymbol(index)];
        }
        return icon
    };

    Window_Command.prototype.iconWidth = function(index) {
        return this.cmdIconId(index) ? Window_Base._iconWidth + 4 : 0;
    };

    Window_Command.prototype.costWidth = function(index) {
        return this.cmdSkillId(index) ? this.textWidth('000') : 0;
    };

    Window_Command.prototype.nameWidth = function(index, width) {
        width = width || this.contentsWidth();
        return Math.max(width - this.iconWidth(index) - this.costWidth(index), 0);
    };

    Window_Command.prototype.drawCmdIcon = function(index, x, y) {
        var icon = this.cmdIconId(index);
        if (icon) {
            this.drawIcon(icon, x + 2, y + 2);
        }
        return x + this.iconWidth(index);
    };

    Window_Command.prototype.drawCmdName = function(index, x, y, width) {
        var nw = this.nameWidth(index, width);
        var align = !this.costWidth(index) && !this.iconWidth(index) ? this.itemTextAlign() : 'left';
        this.drawText(this.commandName(index), x, y, nw, align);
        return x + nw;
    };

    Window_Command.prototype.drawCmdCost = function(index, x, y) {
        var skill = $dataSkills[this.cmdSkillId(index)];
        var width = this.costWidth(index);
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
        } else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
        }
    };

    Window_Command.prototype.cmdSkillId = function(index) {
        if (this.commandSymbol(index) === 'custom') {
            var ext = this.commandExt(index);
            return Number(convertEscapeCharacters(ext+''));
        }
        return 0;
    };

    Window_Command.prototype.hasCost = function(index) {
        return FTKR.EBC.showCustomCost ? this.cmdSkillId(index) : false;
    };

    Window_Command.prototype.drawBattleItem = function(index) {
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var x1 = this.drawCmdIcon(index, rect.x, rect.y);
        var x2 = this.drawCmdName(index, x1, rect.y, rect.width);
        if (this.hasCost(index)) {
            this.drawCmdCost(index, x2, rect.y);
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

    //書き換え
    Window_PartyCommand.prototype.addCommand = function(name, symbol, enabled, ext, iconId) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (ext === undefined) {
            ext = null;
        }
        if (iconId === undefined) {
            iconId = 0;
        }
        this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext, iconId:iconId});
    };

    Window_PartyCommand.prototype.isEscapeEnabled = function() {
        return Imported.FTKR_AltTB ? !BattleManager.inputCount() && BattleManager.canEscape() :
            BattleManager.canEscape();
    };

    //書き換え
    Window_PartyCommand.prototype.makeCommandList = function() {
        FTKR.EBC.list.party.forEach(function(list){
            switch(list.toUpperCase()) {
              case 'FIGHT':
                  this.addCommand(TextManager.fight,  'fight');
                  break;
              case 'ESCAPE':
                  this.addCommand(TextManager.escape, 'escape', this.isEscapeEnabled());
                  break;
              default:
                  var match = /custom(\d+)/i.exec(list);
                  if (!match) break;
                  var cmd = FTKR.EBC.icons.party.custom[Number(match[1])-1];
                  var enabled = !cmd.enabled ? true : eval(cmd.enabled);
                  this.addCommand(cmd.name, cmd.symbol, enabled, cmd.ext, cmd.iconId);
                  break;
              }
        },this);
    };

    //書き換え
    Window_PartyCommand.prototype.drawItem = function(index) {
        this.drawBattleItem(index);
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    var _EBC_Window_ActorCommand_initalize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function() {
        _EBC_Window_ActorCommand_initalize.call(this);
        this._windowType = 'actor';
    };

    Window_ActorCommand.prototype.iconWidth = function(index) {
        return this.cmdIconId(index) ? Window_Base._iconWidth + 4 : 0;
    };

    Window_ActorCommand.prototype.drawCmdIcon = function(index, x, y) {
        var icon = this.cmdIconId(index);
        if (icon) {
            this.drawIcon(icon, x + 2, y + 2);
        }
        return x + this.iconWidth(index);
    };

    var _EBC_Window_ActorCommand_commandAP = Window_ActorCommand.prototype.commandAP;
    Window_ActorCommand.prototype.commandAP = function(index) {
        if (this.commandSymbol(index) === 'custom') {
            var ext = this.commandExt(index);
            var id = Number(convertEscapeCharacters(ext+''));
            return $dataSkills[id].actionPoint;
        } else {
            return _EBC_Window_ActorCommand_commandAP.call(this, index);
        }
    };

    //書き換え
    Window_ActorCommand.prototype.drawItem = function(index) {
        this.drawBattleItem(index);
    };

    var _EBC_Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            var cmds = this._actor.actor().ebc.cmds;
            if (cmds.length) {
                cmds.forEach(function(cmd, i){
                    switch(cmd[0].toUpperCase()) {
                    case 'CUSTOM':
                        this.addCustomCommand(cmd);
                        break;
                    case 'ATTACK':
                        this.addAttackCommand();
                        break;
                    case 'GUARD':
                        this.addGuardCommand();
                        break;
                    case 'SKILL':
                        this.addSkillCommands();
                        break;
                    case 'ITEM':
                        this.addItemCommand();
                        break;
                    }
                },this);
            } else {
                _EBC_Window_ActorCommand_makeCommandList.call(this);
            }
        }
    };

    Window_ActorCommand.prototype.addCustomCommand = function(cmd) {
        var name = convertEscapeCharacters(cmd[1]);
        var id = Number(convertEscapeCharacters(cmd[2]));
        var skill = $dataSkills[id];
        FTKR.setGameData(this._actor, null, skill);
        if (!FTKR.evalFormula(cmd[3])) return;
        this.addCommand(name, 'custom', this._actor.canUse(skill), id);
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

    Scene_Battle.prototype.commandCustom = function() {
        var skillId = this._actorCommandWindow.currentExt();
        var skill = $dataSkills[skillId];
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
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
