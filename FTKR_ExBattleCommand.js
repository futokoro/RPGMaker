//=============================================================================
// アクターのバトルコマンドを変更するプラグイン
// FTKR_ExBattleCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/11/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBC = true;

var FTKR = FTKR || {};
FTKR.EBC = FTKR.EBC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アクターのバトルコマンドを変更する
 * @author フトコロ
 *
 * @param --パーティーコマンド--
 * @default
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
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * アクターのバトルコマンドを変更します。
 * 変更可能な項目は以下の通りです。
 * 
 * １．アクターコマンドの表示内容をアクター毎に設定できます。
 * ２．コマンドにアイコンを表示できます。
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
 * 
 *-----------------------------------------------------------------------------
 * コマンドの設定方法
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
 *    スキル　 or skill  - 各スキルコマンド
 *    アイテム or item   - 「アイテム」コマンド
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
 *                設定できます。true と記載すると、常に表示します。(*1)
 *    
 *    (*1)条件式に使用可能なコードについて
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
 * Copyright (c) 2017 Futokoro
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
        icons : {
            party : paramParse(parameters['Party Command Icons']),
            actor : paramParse(parameters['Actor Command Icons']),
        },
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

    Window_Command.prototype.drawItemIcon = function(index, type) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var commandType = FTKR.EBC.icons[type]
        var ext = this.commandExt(index);
        var symbol = this.commandSymbol(index);
        if (symbol === 'custom') {
            var id = Number(convertEscapeCharacters(ext+''));
            var icon = commandType[symbol] ? $dataSkills[id].iconIndex : 0;
        } else {
            var icon = ext ?
                commandType[this.commandSymbol(index)][ext]:
                commandType[this.commandSymbol(index)];
        }
        var offset = 0;
        if (icon) {
            this.drawIcon(icon, rect.x + 2, rect.y + 2);
            offset = Window_Base._iconWidth + 4;
        }
        this.drawText(this.commandName(index), rect.x + offset, rect.y, rect.width - offset, align);
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    //書き換え
    Window_PartyCommand.prototype.drawItem = function(index) {
        this.drawItemIcon(index, 'party');
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    //書き換え
    Window_ActorCommand.prototype.drawItem = function(index) {
        this.drawItemIcon(index, 'actor');
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
    

}());//EOF
