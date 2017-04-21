//=============================================================================
// アイテムやスキルにセルフ変数を実装するプラグイン
// FTKR_ItemSelfVariables.js
// 作成者     : フトコロ
// 作成日     : 2017/03/26
// 最終更新日 : 2017/04/14
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISV = true;

var FTKR = FTKR || {};
FTKR.ISV = FTKR.ISV || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 アイテムやスキルにセルフ変数を実装するプラグイン
 * @author フトコロ
 *
 * @param Self Variables Number
 * @desc 使用するセルフ変数の数を設定する
 * @default 1
 *
 * @param --Enabled Setting--
 * @desc 
 * 
 * @param Enabled Item
 * @desc アイテムでセルフ変数を使用するか
 * 0 - 使用しない, 1 - 使用する
 * @default 0
 *
 * @param Enabled Weapon
 * @desc 武器でセルフ変数を使用するか
 * 0 - 使用しない, 1 - 使用する
 * @default 0
 *
 * @param Enabled Armor
 * @desc 防具でセルフ変数を使用するか
 * 0 - 使用しない, 1 - 使用する
 * @default 0
 *
 * @param Enabled Skill
 * @desc スキルでセルフ変数を使用するか
 * 0 - 使用しない, 1 - 使用する
 * @default 0
 *
 * @param Enabled Save
 * @desc セーブ時にセルフ変数を保存するか
 * 0 - 保存しない, 1 - 保存する
 * @default 0
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテム(武器・防具含む)やスキルに、
 * セーブ時に記録し値の操作が可能な、セルフ変数を実装することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *    本プラグインは、ダメージ計算式の処理部を書き換えています。
 *    そのため、プラグイン管理の出来るだけ上の位置に追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * セルフ変数の設定
 *-----------------------------------------------------------------------------
 * 以下の、プラグインパラメータで設定を変更します。
 * 
 * <Self Variables Number>
 *    :使用するセルフ変数の数を設定します。
 *    :この設定は、アイテム、武器、防具、スキル共通です。
 * 
 * <Enabled Item>
 * <Enabled Weapon>
 * <Enabled Armor>
 * <Enabled Skill>
 *    :アイテム、武器、防具、スキルのそれぞれでセルフ変数を使用するかを
 *    :個別に指定します。
 * 
 * <Enabled Save>
 *    :セーブ時にセルフ変数を保存するか指定します。
 *    :保存しない場合、ゲーム起動毎にリセットします。
 *    :この設定は、アイテム、武器、防具、スキル共通です。
 * 
 * 
 * 以下の、ノートタグをアイテム(武器・防具含む)やスキルのメモ欄に追記すると
 * 初期値を設定できます。
 * 
 * <ISV IV[x]: y>
 * <ISV セルフ変数[x]: y>
 *    :セルフ変数ID x の初期値を y に設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプトコマンド
 *-----------------------------------------------------------------------------
 * セルフ変数に対して、以下のスクリプトコマンドを使用できます。
 * なお、item(x)の部分は、武器は'weapon(x)'、防具は'armor(x)'、
 * スキルは'skill(x)'に変えてください。
 * 
 * １．セルフ変数の値の取得
 * $gameSelfVariables.item(x).value(y)
 *    :アイテムID x のセルフ変数 y の値を取得します。
 * 
 * ２．セルフ変数の値の変更
 * $gameSelfVariables.item(x).setValue(y, value (, code) )
 *    :アイテムID x のセルフ変数 y に value を代入します。
 *    :code部に以下の文字を入力することで、代入以外の計算が可能です。
 *    : 加算(+) - セルフ変数 y の値に value を加算します。
 *    : 減算(-) - セルフ変数 y の値から value を減算します。
 *    : 積算(*) - セルフ変数 y の値に value を積算します。
 *    : 除算(/) - セルフ変数 y の値から value を除算します。
 *    : 剰余(%) - セルフ変数 y の値から value を除算した余りを代入します。
 *    :
 *    :入力例)
 *    : $gameSelfVariables.item(10).setValue(1, 10)
 *    :   アイテムID 10 のセルフ変数 1 に 10 を代入する
 *    :
 *    : $gameSelfVariables.weapon(12).setValue(2, 6, '加算')
 *    : $gameSelfVariables.weapon(12).setValue(2, 6, '+')
 *    :   武器ID 12 のセルフ変数 2 に 6 を加算する
 * 
 * ３．セルフ変数の削除
 * $gameSelfVariables.item(x).clear()
 *    :アイテムID x のセルフ変数をすべて削除します。
 *    :0 が代入されるわけではありません。
 * 
 * ４．セルフ変数の初期化
 * $gameSelfVariables.item(x).allReset(value)
 *    :アイテムID x のすべてのセルフ変数に value を代入します。
 *    :このときの'すべて'とは、<Item Self Variables>で設定した数を指します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 本プラグインでは、以下のコマンドを使用できます。
 * なお、大文字小文字は区別しないため、どちらを使用しても構いません。
 * 
 * 1. セルフ変数の変更
 * 指定したアイテムIDのセルフ変数を変更します。
 * 
 * ISV_セルフ変数変更 アイテムタイプ アイテムID セルフ変数ID 演算方法 値
 * ISV_SET_SELF_VARIABLES ITEMTYPE itemId selfVariableId CALCTYPE value
 * 
 * アイテムタイプには、アイテム(item)、武器(weapon)、防具(armor)、
 * スキル(skill)を代入してください。
 * 演算方法には、代入(=)、加算(+)、減算(-)、積算(*)、除算(/)、剰余(%)を
 * 代入してください。
 * アイテムID、セルフ変数ID、代入する値には、ゲーム内変数を指定できます。
 * ゲーム内変数を使用する場合は、数値の変わりに v[n] を入力してください。
 * 
 * 入力例)
 * ISV_セルフ変数変更 アイテム 10 1 代入 v[5]
 * ISV_SET_SELF_VARIABLES item 10 1 = v[5]
 *    :アイテムID10 のセルフ変数ID1 に ゲーム内変数ID5 の値を代入する
 * 
 * 
 * 2. セルフ変数の取得
 * 指定したアイテムIDのセルフ変数を、ゲーム内変数に代入します。
 * 
 * ISV_セルフ変数取得 ゲーム内変数ID アイテムタイプ アイテムID セルフ変数ID
 * ISV_GET_SELF_VARIABLES variableId ITEMTYPE itemId selfVariableId
 * 
 * アイテムタイプには、アイテム(item)、武器(weapon)、防具(armor)、
 * スキル(skill)を代入してください。
 * ゲーム内変数ID、アイテムID、セルフ変数IDには、ゲーム内変数を指定できます。
 * ゲーム内変数を使用する場合は、数値の変わりに v[n] を入力してください。
 * 
 * 入力例)
 * ISV_セルフ変数取得 5 武器 10 1
 * ISV_GET_SELF_VARIABLES 5 weapon 10 1
 *    :武器ID10 のセルフ変数ID1 の値を ゲーム内変数ID5 に代入する
 * 
 * 
 *-----------------------------------------------------------------------------
 * セルフ変数のダメージ計算式への適用
 *-----------------------------------------------------------------------------
 * セルフ変数は、アイテムおよびスキルのダメージ計算式に使用できます。
 * 計算式に、'iv[x]'と入力することで、セルフ変数ID x の値を参照します。
 * 
 * 入力例）
 * a.atk * (4 + iv[1]) - b.def * 2
 * 
 * 
 * ＜'iv[x]'と入力すると、必ずダメージを与えられなくなる場合＞
 * 他のプラグインと競合しており、'iv[x]'が使用できません。
 * この場合は、'iv[x]'の替わりに、'item._seflVariables._data[x]'と
 * 入力してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2017/04/14 : 機能追加
 *    1. セルフ変数の初期値を設定する機能追加。
 *    2. セルフ変数に文字列を代入できる機能を追加。
 *    3. ライセンス変更。
 * 
 * v1.0.0 - 2017/03/26 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ISV.parameters = PluginManager.parameters('FTKR_ItemSelfVariables');

FTKR.ISV.selfVariablesNumber = Number(FTKR.ISV.parameters['Self Variables Number'] || 0);
FTKR.ISV.enabledItem = Number(FTKR.ISV.parameters['Enabled Item'] || 0);
FTKR.ISV.enabledWeapon = Number(FTKR.ISV.parameters['Enabled Weapon'] || 0);
FTKR.ISV.enabledArmor = Number(FTKR.ISV.parameters['Enabled Armor'] || 0);
FTKR.ISV.enabledSkill = Number(FTKR.ISV.parameters['Enabled Skill'] || 0);
FTKR.ISV.enabledSave = Number(FTKR.ISV.parameters['Enabled Save'] || 0);

//=============================================================================
// Array
//=============================================================================

Array.prototype.setIsv = function() {
    return this.map(function(item) {
        return item ? item._selfVariables : null;
    });
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.ISV.DatabaseLoaded = false;
FTKR.ISV.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.ISV.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.ISV.DatabaseLoaded) {
        if (FTKR.ISV.enabledItem) this.setSelfVariables($dataItems);
        if (FTKR.ISV.enabledWeapon) this.setSelfVariables($dataWeapons);
        if (FTKR.ISV.enabledArmor) this.setSelfVariables($dataArmors);
        if (FTKR.ISV.enabledSkill) this.setSelfVariables($dataSkills);
        FTKR.ISV.DatabaseLoaded = true;
    }
    return true;
};

DataManager.setSelfVariables = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        obj._selfVariables = new Game_IsvSelfVariables();
        obj._selfVariables.allReset(0);

        var notedata = obj.note.split(/[\r\n]+/);

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<ISV IV\[(\d+)\]:[ ]*(.+)>/i) ||
                line.match(/<ISV セルフ変数\[(\d+)\]:[ ]*(.+)>/i)) {
                var id = Number(RegExp.$1);
                var value = RegExp.$2;
                obj._selfVariables.setValue(id, value);
            }
        }
    }
};

FTKR.ISV.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    FTKR.ISV.DataManager_createGameObjects.call(this);
    $gameSelfVariables = new Game_IsvItems();
};

FTKR.ISV.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = FTKR.ISV.DataManager_makeSaveContents.call(this);
    if (FTKR.ISV.enabledSave) {
        if (FTKR.ISV.enabledItem) {
            contents.iepItemSelf = $dataItems.setIsv();
        }
        if (FTKR.ISV.enabledWeapon) {
            contents.iepWeaponSelf = $dataWeapons.setIsv();
        }
        if (FTKR.ISV.enabledArmor) {
            contents.iepArmorSelf = $dataArmors.setIsv();
        }
        if (FTKR.ISV.enabledSkill) {
            contents.iepSkillSelf = $dataSkills.setIsv();
        }
    }
    return contents;
};

FTKR.ISV.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    FTKR.ISV.DataManager_extractSaveContents.call(this, contents);
    if (FTKR.ISV.enabledSave) {
        if(FTKR.ISV.enabledItem) {
            $dataItems.forEach( function(item, i) {
                if(item) item._selfVariables = contents.iepItemSelf[i];
            });
        }
        if(FTKR.ISV.enabledWeapon) {
            $dataWeapons.forEach( function(item, i) {
                if(item) item._selfVariables = contents.iepWeaponSelf[i];
            });
        }
        if(FTKR.ISV.enabledArmor) {
            $dataArmors.forEach( function(item, i) {
                if(item) item._selfVariables = contents.iepArmorSelf[i];
            });
        }
        if(FTKR.ISV.enabledSkill) {
            $dataSkills.forEach( function(item, i) {
                if(item) item._selfVariables = contents.iepSkillSelf[i];
            });
        }
    }
};

//=============================================================================
// Game_Action
//=============================================================================

//書き換え
Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var iv = item._selfVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = Math.max(eval(item.damage.formula), 0) * sign;
		if (isNaN(value)) value = 0;
		return value;
    } catch (e) {
        return 0;
    }
};

//=============================================================================
// Game_IsvItems
//=============================================================================

function Game_IsvItems() {
    this.initialize.apply(this, arguments);
}

Game_IsvItems.prototype.initialize = function() {
    this._data = [[],[],[],[]];
};

Game_IsvItems.prototype.item = function(itemId) {
    if ($dataItems[itemId]) {
        if (!this._data[0][itemId]) {
            this._data[0][itemId] = $dataItems[itemId];
        }
        return this._data[0][itemId]._selfVariables;
    }
    return null;
};

Game_IsvItems.prototype.weapon = function(itemId) {
    if ($dataWeapons[itemId]) {
        if (!this._data[1][itemId]) {
            this._data[1][itemId] = $dataWeapons[itemId];
        }
        return this._data[1][itemId]._selfVariables;
    }
    return null;
};

Game_IsvItems.prototype.armor = function(itemId) {
    if ($dataArmors[itemId]) {
        if (!this._data[2][itemId]) {
            this._data[2][itemId] = $dataArmors[itemId];
        }
        return this._data[2][itemId]._selfVariables;
    }
    return null;
};

Game_IsvItems.prototype.skill = function(itemId) {
    if ($dataSkills[itemId]) {
        if (!this._data[3][itemId]) {
            this._data[3][itemId] = $dataSkills[itemId];
        }
        return this._data[3][itemId]._selfVariables;
    }
    return null;
};

//=============================================================================
// Game_IsvSelfVariables
//=============================================================================

function Game_IsvSelfVariables() {
    this.initialize.apply(this, arguments);
}

Game_IsvSelfVariables.prototype.initialize = function() {
    this.clear();
};

Game_IsvSelfVariables.prototype.clear = function() {
    this._data = [];
};

Game_IsvSelfVariables.prototype.allReset = function(value) {
    for (var i = 0; i < FTKR.ISV.selfVariablesNumber + 1; i++) {
        this._data[i] = value;
    }
};

Game_IsvSelfVariables.prototype.value = function(variableId) {
    return this._data[variableId] || 0;
};

Game_IsvSelfVariables.prototype.setValue = function(variableId, value, code) {
    if (variableId > 0 && variableId < FTKR.ISV.selfVariablesNumber + 1) {
        if (!isNaN(parseInt(value))) {
            value = parseInt(value);
        }
        this._data[variableId] = this.calcValue(this._data[variableId], value, code);
        this.onChange();
    }
};

Game_IsvSelfVariables.prototype.calcValue = function(value1, value2, code) {
    switch (code) {
    case '加算':
    case '+':
        return value1 + value2;
    case '減算':
    case '-':
        return value1 - value2;
    case '積算':
    case '×':
    case '*':
        return value1 * value2;
    case '除算':
    case '／':
    case '/':
        return value1 / value2;
    case '剰余':
    case '％':
    case '%':
        return value1 % value2;
    case '代入':
    case '＝':
    case '=':
    default:
        return value2;
    }
};

Game_IsvSelfVariables.prototype.onChange = function() {
    if($gameMap) $gameMap.requestRefresh();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _ISV_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _ISV_Game_Interpreter_pluginCommand.call(this, command, args);
    if (/ISV_/i.test(command)) {
        command = command.replace(/ISV_/i, '');
        switch (true) {
            case /セルフ変数変更/i.test(command):
            case /set_Self_Variables/i.test(command):
                this.setSeflVariables(command, args);
                break;
            case /セルフ変数取得/i.test(command):
            case /get_Self_Variables/i.test(command):
                this.getSeflVariables(command, args);
                break;
        }
    }
};

Game_Interpreter.prototype.setSeflVariables = function(command, args) {
    var itemId = this.setNum(args[1]);
    var selfId = this.setNum(args[2]);
    var value = this.setNum(args[4]);
    if (!itemId || !selfId) return this.showLog(command, args, [0,1,1,0,1]);
    switch (true) {
        case /アイテム/.test(args[0]):
        case /item/i.test(args[0]):
            $gameSelfVariables.item(itemId).setValue(selfId, value, args[3]);
            break;
        case /武器/.test(args[0]):
        case /weapon/i.test(args[0]):
            $gameSelfVariables.weapon(itemId).setValue(selfId, value, args[3]);
            break;
        case /防具/.test(args[0]):
        case /armor/i.test(args[0]):
            $gameSelfVariables.armor(itemId).setValue(selfId, value, args[3]);
            break;
        case /スキル/.test(args[0]):
        case /skill/i.test(args[0]):
            $gameSelfVariables.skill(itemId).setValue(selfId, value, args[3]);
            break;
        default:
            this.showLog(command, args, [1,0,0,0,0]);
            break;
    }
};

Game_Interpreter.prototype.getSeflVariables = function(command, args) {
    var varId = this.setNum(args[0]);
    var itemId = this.setNum(args[2]);
    var selfId = this.setValue(args[3]);
    if (!varId || !itemId || !selfId) return this.showLog(command, args, [1,0,1,1]);
    var value = null;
    switch (true) {
        case /アイテム/.test(args[1]):
        case /item/i.test(args[1]):
            value = $gameSelfVariables.item(itemId).value(selfId);
            break;
        case /武器/.test(args[1]):
        case /weapon/i.test(args[1]):
            value = $gameSelfVariables.weapon(itemId).value(selfId);
            break;
        case /防具/.test(args[1]):
        case /armor/i.test(args[1]):
            value = $gameSelfVariables.armor(itemId).value(selfId);
            break;
        case /スキル/.test(args[1]):
        case /skill/i.test(args[1]):
            value = $gameSelfVariables.skill(itemId).value(selfId);
            break;
        default:
            this.showLog(command, args, [0,1,0,0]);
            break;
    }
    $gameVariables.setValue(varId, value);
};

Game_Interpreter.prototype.setNum = function(data) {
    var data1 = /v\[(\d+)\]/i;
    var data2 = /(\d+)/i;
    if (data.match(data1)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(data2)) {
        return Number(RegExp.$1);
    } else {
        return 0;
    }
};

Game_Interpreter.prototype.setValue = function(data) {
    var data1 = /v\[(\d+)\]/i;
    var data2 = /(.+)/i;
    if (data.match(data1)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (data.match(data2)) {
        var value = RegExp.$1;
        return isNaN(parseInt(value)) ? value : parseInt(value);
    } else {
        return 0;
    }
};

Game_Interpreter.prototype.showLog = function(command, args, errors) {
    console.log('プラグイン名:','FTKR_ItemSelfVariables.js');
    console.log('コマンド名  :', command);
    console.log('エラー内容  :','不正な値を入力しています');
    for (var i = 0; i < errors.length; i++) {
        if (errors[i]) console.log('エラーINDEX:', i, '引数:', args[i]);
    }
};