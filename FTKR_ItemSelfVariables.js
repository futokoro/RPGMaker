//=============================================================================
// アイテムやスキルにセルフ変数を実装するプラグイン
// FTKR_ItemSelfVariables.js
// プラグインNo : 10
// 作成者     : フトコロ
// 作成日     : 2017/03/26
// 最終更新日 : 2018/01/08
// バージョン : v1.2.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISV = true;

var FTKR = FTKR || {};
FTKR.ISV = FTKR.ISV || {};

//=============================================================================
/*:
 * @plugindesc v1.2.2 アイテムやスキルにセルフ変数を実装するプラグイン
 * @author フトコロ
 *
 * @param --セーブ設定--
 * @desc 
 * 
 * @param Enabled Save
 * @desc セーブ時にセルフ変数を保存するか
 * 0 - 保存しない, 1 - 保存する
 * @default 0
 *
 * @param --アイテム設定--
 * @desc 
 * 
 * @param Item Number
 * @desc アイテムで使用するセルフ変数の数を設定する
 * @default 0
 *
 * @param --武器設定--
 * @desc 
 * 
 * @param Weapon Number
 * @desc 武器で使用するセルフ変数の数を設定する
 * @default 0
 *
 * @param --防具設定--
 * @desc 
 * 
 * @param Armor Number
 * @desc 防具で使用するセルフ変数の数を設定する
 * @default 0
 *
 * @param --スキル設定--
 * @desc 
 * 
 * @param Skill Number
 * @desc スキルで使用するセルフ変数の数を設定する
 * @default 0
 *
 * @param --アクター設定--
 * @desc 
 * 
 * @param Actor Number
 * @desc アクターで使用するセルフ変数の数を設定する
 * @default 0
 *
 * @param --エネミー設定--
 * @desc 
 * 
 * @param Enemy Number
 * @desc エネミーで使用するセルフ変数の数を設定する
 * @default 0
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、以下の対象にセーブ時に記録し値の操作が
 * 可能な、セルフ変数を実装することができます。
 * 
 * 1. アイテム
 * 2. 武器
 * 3. 防具
 * 4. スキル
 * 5. アクター
 * 6. エネミー
 * 
 * セルフ変数は、制御文字で表示させることができます。
 * 
 * 
 * プラグインの使い方は、以下のHPを参照してください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_ItemSelfVariables.ja.md
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
 * <*** Number>
 *    :使用するセルフ変数の数を個別に設定します。
 * 
 * <Enabled Save>
 *    :セーブ時にセルフ変数を保存するか指定します。
 *    :保存しない場合、ゲーム起動毎にリセットします。
 *    :この設定は、アイテム、武器、防具、スキル、アクター、エネミー共通です。
 * 
 * 
 * 以下の、タグをアイテム(武器・防具含む)やスキル、アクターのメモ欄に
 * 追記すると初期値を設定できます。
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
 * スキルは'skill(x)'、アクターは'actor(x)'、エネミーは'enemy(x)'に
 * 変えてください。
 * 
 * １．セルフ変数の値の取得
 * $gameSelfVariables.item(x).value(y)
 *    :アイテムID x のセルフ変数 y の値を取得します。
 * 
 * ２．セルフ変数の値の変更
 * $gameSelfVariables.item(x).setValue(y, value (, 'code') )
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
 *    :   
 * 
 * ３．セルフ変数の削除
 * $gameSelfVariables.item(x).clear()
 *    :アイテムID x のセルフ変数をすべて削除します。
 *    :0 が代入されるわけではありません。
 * 
 * ４．セルフ変数の初期化
 * $gameSelfVariables.item(x).allReset(value)
 *    :アイテムID x のすべてのセルフ変数に value を代入します。
 *    :このときの'すべて'とは、<*** Number>で設定した数を指します。
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
 * スキル(skill)、アクター(actor)、エネミー(enemy)を代入してください。
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
 * スキル(skill)、アクター(actor)、エネミー(enemy)を代入してください。
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
 * 計算式に以下のコードを入力することで、セルフ変数ID x の値を参照します。
 * 
 *  av[x]   - 使用者のセルフ変数ID x の値を参照します。
 *  bv[x]   - 対象者のセルフ変数ID x の値を参照します。
 *  iv[x]   - 使用するアイテムまたはスキルのセルフ変数ID x の値を参照します。
 * 
 * 入力例）
 * a.atk * (4 + iv[1]) - b.def * 2
 * 
 * 
 * ＜'iv[x]'などセルフ変数を入力すると、必ずダメージを与えられなくなる場合＞
 * 他のプラグインと競合しており、コードが使用できません。
 * この場合は、コードの替わりに、以下のスクリプトを記述してください。
 * 
 * iv[x] ⇒ item._seflVariables._data[x]
 * av[x] ⇒ (a.isActor() ? a.actor()._seflVariables._data[x] : a.enemy()._seflVariables._data[x])
 * bv[x] ⇒ (b.isActor() ? b.actor()._seflVariables._data[x] : b.enemy()._seflVariables._data[x])
 * 
 * なお、av[x]のスクリプトについて、そのスキルやアイテムをアクターしか
 * 使用しない場合は、以下の様に記述を省くことも可能です。
 * 
 *    av[x] ⇒ a.actor()._seflVariables._data[x]
 * 
 * また、対象が味方のみであれば
 *    bv[x] ⇒ b.actor()._seflVariables._data[x]
 * 対象が敵のみであれば
 *    bv[x] ⇒ b.enemy()._seflVariables._data[x]
 * のように記述できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 制御文字
 *-----------------------------------------------------------------------------
 * 本プラグインでは、以下の制御文字を使用できます。
 * なお、大文字小文字は区別しないため、どちらを使用しても構いません。
 * 
 * \ITV[x,y]   : アイテムID x のセルフ変数ID y の値を参照する。
 * \WEV[x,y]   : 武器ID x のセルフ変数ID y の値を参照する。
 * \ARV[x,y]   : 防具ID x のセルフ変数ID y の値を参照する。
 * \SKV[x,y]   : スキルID x のセルフ変数ID y の値を参照する。
 * \ACV[x,y]   : アクターID x のセルフ変数ID y の値を参照する。
 * \ENV[x,y]   : エネミーID x のセルフ変数ID y の値を参照する。
 * 
 * 注意) x と y の数字はどちらも必要です
 * 
 * 説明文やプロフィールで、上記制御文字を使う場合に
 * []内の "x,"部分を省略することが可能です。
 * 省略した場合は、例えばアイテムならそのアイテムのセルフ変数を参照します。
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
 * v1.2.2 - 2018/01/08 : ヘルプ追記
 * 
 * v1.2.1 - 2017/10/20 : 機能追加
 *    1. アイテムの説明欄に制御文字を使用する場合に、アイテムIDを
 *       省略できる機能を追加。
 * 
 * v1.2.0 - 2017/10/19 : 制御文字に対応
 * 
 * v1.1.3 - 2017/05/03 : 計算式の機能追加
 * 
 * v1.1.2 - 2017/04/29 : ダメージ計算式の処理を見直し
 * 
 * v1.1.1 - 2017/04/26 : 不具合修正
 *    1. ダメージ計算式に例外処理を追加。
 * 
 * v1.1.0 - 2017/04/18 : 仕様変更、機能追加
 *    1. 使用するセルフ変数の数を、アイテムやスキル毎に設定できるように変更。
 *    2. アクターとエネミーにセルフ変数を追加。
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

function Game_IsvItems() {
  this.initialize.apply(this, arguments);
}

function Game_IsvSelfVariables() {
  this.initialize.apply(this, arguments);
}

(function() {
  
    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemSelfVariables');

    FTKR.ISV.enabledSave = Number(parameters['Enabled Save'] || 0);
    FTKR.ISV.number = {
        item:Number(parameters['Item Number'] || 0),
        weapon:Number(parameters['Weapon Number'] || 0),
        armor:Number(parameters['Armor Number'] || 0),
        skill:Number(parameters['Skill Number'] || 0),
        actor:Number(parameters['Actor Number'] || 0),
        enemy:Number(parameters['Enemy Number'] || 0),
    };

    //=============================================================================
    // 自作関数(グローバル)
    //=============================================================================

    FTKR.gameData = FTKR.gameData || {
        user   :null,
        target :null,
        item   :null,
        number :0,
    };

    if (!FTKR.setGameData) {
    FTKR.setGameData = function(user, target, item, number) {
        FTKR.gameData = {
            user   :user || null,
            target :target || null,
            item   :item || null,
            number :number || 0
        };
    };
    }

    FTKR.evalFormula = function(formula) {
        var datas = FTKR.gameData;
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var a = datas.user;
            var b = datas.target;
            var item   = datas.item;
            var number = datas.number;
            if (a) {
                var aData = a.isActor() ? a.actor() : a.enemy();
                if (aData._selfVariables) var av = aData._selfVariables._data;
            }
            if (b) {
                var result = b.result();
                var bData = b.isActor() ? b.actor() : b.enemy();
                if (bData._selfVariables) var bv = bData._selfVariables._data;
            }
            if (item && item._selfVariables) var iv = item._selfVariables._data;
            var value = eval(formula);
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    FTKR.evalCalcFormula = function(formula) {
        var datas = FTKR.gameData;
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var a = datas.user;
            var b = datas.target;
            var item   = datas.item;
            var number = datas.number;
            if (a) {
                var aData = a.isActor() ? a.actor() : a.enemy();
                if (aData._selfVariables) var av = aData._selfVariables._data;
            }
            if (b) {
                var result = b.result();
                var bData = b.isActor() ? b.actor() : b.enemy();
                if (bData._selfVariables) var bv = bData._selfVariables._data;
            }
            if (item && item._selfVariables) var iv = item._selfVariables._data;
            eval(formula);
        } catch (e) {
            console.error(e);
        }
    };

    //=============================================================================
    // Array
    //=============================================================================

    Array.prototype.setIsv = function() {
        return this.map(function(item) {
            return item ? item._selfVariables : null;
        });
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _ISV_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _ISV_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/ISV_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'セルフ変数変更':
            case 'set_Self_Variables':
                this.setSeflVariables(command, args);
                break;
            case 'セルフ変数取得':
            case 'get_Self_Variables':
                this.getSeflVariables(command, args);
                break;
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
            case /アクター/.test(args[0]):
            case /actor/i.test(args[0]):
                $gameSelfVariables.actor(itemId).setValue(selfId, value, args[3]);
                break;
            case /エネミー/.test(args[0]):
            case /enemy/i.test(args[0]):
                $gameSelfVariables.enemy(itemId).setValue(selfId, value, args[3]);
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
            case /アクター/.test(args[1]):
            case /actor/i.test(args[1]):
                value = $gameSelfVariables.actor(itemId).value(selfId);
                break;
            case /エネミー/.test(args[1]):
            case /enemy/i.test(args[1]):
                value = $gameSelfVariables.enemy(itemId).value(selfId);
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

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ISV_DatabaseLoaded = false;
    var _ISV_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_ISV_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ISV_DatabaseLoaded) {
            var isv = FTKR.ISV.number;
            if (isv.item) this.setSelfVariables($dataItems, isv.item);
            if (isv.weapon) this.setSelfVariables($dataWeapons, isv.weapon);
            if (isv.armor) this.setSelfVariables($dataArmors, isv.armor);
            if (isv.skill) this.setSelfVariables($dataSkills, isv.skill);
            if (isv.actor) this.setSelfVariables($dataActors, isv.actor);
            if (isv.enemy) this.setSelfVariables($dataEnemies, isv.enemy);
            _ISV_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.setSelfVariables = function(group, number) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            
            obj._selfVariables = new Game_IsvSelfVariables(number);
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

    var _ISV_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _ISV_DataManager_createGameObjects.call(this);
        $gameSelfVariables = new Game_IsvItems();
    };

    var _ISV_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _ISV_DataManager_makeSaveContents.call(this);
        if (FTKR.ISV.enabledSave) {
            var isv = FTKR.ISV.number;
            if (isv.item) {
                contents.iepItemSelf = $dataItems.setIsv();
            }
            if (isv.weapon) {
                contents.iepWeaponSelf = $dataWeapons.setIsv();
            }
            if (isv.armor) {
                contents.iepArmorSelf = $dataArmors.setIsv();
            }
            if (isv.skill) {
                contents.iepSkillSelf = $dataSkills.setIsv();
            }
            if (isv.actor) {
                contents.iepActorSelf = $dataActors.setIsv();
            }
            if (isv.enemy) {
                contents.iepEnemySelf = $dataEnemies.setIsv();
            }
        }
        return contents;
    };

    var _ISV_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _ISV_DataManager_extractSaveContents.call(this, contents);
        if (FTKR.ISV.enabledSave) {
            var isv = FTKR.ISV.number;
            if(isv.item) {
                $dataItems.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepItemSelf[i];
                });
            }
            if(isv.weapon) {
                $dataWeapons.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepWeaponSelf[i];
                });
            }
            if(isv.armor) {
                $dataArmors.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepArmorSelf[i];
                });
            }
            if(isv.skill) {
                $dataSkills.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepSkillSelf[i];
                });
            }
            if(isv.actor) {
                $dataActors.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepActorSelf[i];
                });
            }
            if(isv.enemy) {
                $dataEnemies.forEach( function(item, i) {
                    if(item) item._selfVariables = contents.iepEnemySelf[i];
                });
            }
        }
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    //書き換え
    Game_Action.prototype.evalDamageFormula = function(target) {
        var item = this.item();
        FTKR.setGameData(this.subject(), target, item);
        var value = FTKR.evalFormula(item.damage.formula);
        if (value) {
            var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            value = Math.max(value, 0) * sign;
        }
        return value;
    };

    //=============================================================================
    // Game_IsvItems
    //=============================================================================

    Game_IsvItems.prototype.initialize = function() {
        this._data = [[],[],[],[],[],[]];
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

    Game_IsvItems.prototype.actor = function(itemId) {
        if ($dataActors[itemId]) {
            if (!this._data[4][itemId]) {
                this._data[4][itemId] = $dataActors[itemId];
            }
            return this._data[4][itemId]._selfVariables;
        }
        return null;
    };

    Game_IsvItems.prototype.enemy = function(itemId) {
        if ($dataEnemies[itemId]) {
            if (!this._data[5][itemId]) {
                this._data[5][itemId] = $dataEnemies[itemId];
            }
            return this._data[5][itemId]._selfVariables;
        }
        return null;
    };

    //=============================================================================
    // Game_IsvSelfVariables
    //=============================================================================

    Game_IsvSelfVariables.prototype.initialize = function(number) {
        this.clear();
        this._number = number || 1;
    };

    Game_IsvSelfVariables.prototype.clear = function() {
        this._data = [];
    };

    Game_IsvSelfVariables.prototype.allReset = function(value) {
        for (var i = 0; i < this._number + 1; i++) {
            this._data[i] = value;
        }
    };

    Game_IsvSelfVariables.prototype.value = function(variableId) {
        return this._data[variableId] || 0;
    };

    Game_IsvSelfVariables.prototype.setValue = function(variableId, value, code) {
        if (variableId > 0 && variableId < this._number + 1) {
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
    // Window_Base
    //=============================================================================

    //制御文字の表示処理の修正
    var _ISV_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _ISV_Window_Base_convertEscapeCharacters.call(this, text);
        if (this._setItem) {
            text = text.replace(/\x1bITV\[(\d+)\]/gi, function() {
                return $gameSelfVariables.item(parseInt(this._setItem.id)).value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bWEV\[(\d+)\]/gi, function() {
                return $gameSelfVariables.weapon(parseInt(this._setItem.id)).value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bARV\[(\d+)\]/gi, function() {
                return $gameSelfVariables.armor(parseInt(this._setItem.id)).value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bSKV\[(\d+)\]/gi, function() {
                return $gameSelfVariables.skill(parseInt(this._setItem.id)).value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bACV\[(\d+)\]/gi, function() {
                return $gameSelfVariables.actor(parseInt(this._setItem.id)).value(parseInt(arguments[1]));
            }.bind(this));
        }
        text = text.replace(/\x1bITV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.item(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        text = text.replace(/\x1bWEV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.weapon(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        text = text.replace(/\x1bARV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.armor(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        text = text.replace(/\x1bSKV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.skill(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        text = text.replace(/\x1bACV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.actor(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        text = text.replace(/\x1bENV\[(\d+),(\d+)\]/gi, function() {
            return $gameSelfVariables.enemy(parseInt(arguments[1])).value(parseInt(arguments[2]));
        }.bind(this));
        return text;
    };

    var _ISV_Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function(item) {
        this._setItem = item;
        _ISV_Window_Help_setItem.call(this, item);
    };

    var _ISV_Window_Status_drawProfile = Window_Status.prototype.drawProfile;
    Window_Status.prototype.drawProfile = function(x, y) {
        this._setItem = this._actor.actor();
        _ISV_Window_Status_drawProfile.call(this, x, y);
    };

    
}());//EOF
