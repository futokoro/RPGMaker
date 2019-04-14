//=============================================================================
// ステートの自動付与解除条件を設定するプラグイン
// FTKR_AutoStateConditions.js
// プラグインNo : 32
// 作成者     : フトコロ
// 作成日     : 2017/05/02
// 最終更新日 : 2019/04/14
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ASC = true;

var FTKR = FTKR || {};
FTKR.ASC = FTKR.ASC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 ステートの自動付与解除条件を設定するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、ステートの自動付与および解除条件を追加できます。
 * 
 * 以下のタグをステートのメモ欄に記入してください。
 * 
 * ・自動付与の場合 - 条件式を満たした時に自動で付与する
 * <ASC_付与条件>
 * 条件式
 * </ASC_付与条件>
 * 
 * または
 * 
 * <ASC_ADD_CONDITIONS>
 * 条件式
 * </ASC_ADD_CONDITIONS>
 * 
 * 
 * ・自動解除の場合 - 条件式を満たした時に自動で解除する
 * <ASC_解除条件>
 * 条件式
 * </ASC_解除条件>
 * 
 * または
 * 
 * <ASC_REMOVE_CONDITIONS>
 * 条件式
 * </ASC_REMOVE_CONDITIONS>
 * 
 * 
 * [条件式(eval) の値について]
 * 条件式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - ステート付与中のキャラのパラメータを参照します。
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 * 
 * 
 * 入力例）
 * スイッチID1 が ON の時にタグが有効になる。
 * <ASC_解除条件>
 * s[1]
 * </ASC_解除条件>
 * 
 * 
 * [複数の条件を設定する場合]
 * 以下の2種類の入力例は同じ意味です。
 * 
 * 1. 縦に複数の条件式を並べる
 * <ASC_付与条件>
 * 条件式1
 * 条件式2
 * </ASC_付与条件>
 * 
 * 1. '&&'を使用して横に複数の条件式を並べる
 * <ASC_付与条件>
 * 条件式1 && 条件式2
 * </ASC_付与条件>
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2019/04/13 : 処理見直し
 *    1. ステートの自動付与および自動解除判定の一部処理をゲーム起動時実行に変更。
 * 
 * v1.0.0 - 2017/05/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ASC.parameters = PluginManager.parameters('FTKR_AutoStateConditions');

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

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
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
// 自作関数(ローカル)
//=============================================================================

Array.prototype.convertEntrapmentRegArray = function() {
    return this.map(function(str) {
        return {
            a:new RegExp('<' + str + '>', 'i'),
            b:new RegExp('<\/' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列とdataをテストする
Array.prototype.testRegs = function(data, prop) {
    return this.some(function(reg) {
        return prop ? reg[prop].test(data) : reg.test(data);
    });
};

// <codeTitle>text</codeTitle>の形式のメタデータを読み取ってtextを返す
var readEntrapmentCodeToText = function(obj, codeTitles) {
    notes = codeTitles.convertEntrapmentRegArray();
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (notes.testRegs(line, 'a')) {
            var text = '';
            setMode = 'read';
        } else if (notes.testRegs(line, 'b')) {
            setMode = 'none';
        } else if (setMode === 'read') {
            text += line + ';';
        }
    }
    return text;
};

// textを条件式に使える状態に変換する
var convertTextToConditions = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        datas.forEach(function(data, i) {
            result += data;
            if (datas[i+1]) result += ')&&(';
        });
        result = '(' + result + ')';
    }
    return result;
};

//=============================================================================
// DataManager
//=============================================================================

var _DatabaseLoaded = false;
var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!_DataManager_isDatabaseLoaded.call(this)) return false;
    if (!_DatabaseLoaded) {
        this.ascStateNotetags($dataStates);
        _DatabaseLoaded = true;
    }
    return true;
};

DataManager.ascStateNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        obj.asc = {};
        obj.asc.add = convertTextToConditions(readEntrapmentCodeToText(obj, ['ASC_付与条件', 'ASC_ADD_CONDITIONS']));
        obj.asc.remove = convertTextToConditions(readEntrapmentCodeToText(obj, ['ASC_解除条件', 'ASC_REMOMVE_CONDITIONS']));
    }
};

DataManager.evalRemoveStateConditions = function(obj) {
    var formula = obj.asc.remove;
    if (!formula) return false;
    return FTKR.evalFormula(formula);
};

DataManager.evalAddStateConditions = function(obj) {
    var formula = obj.asc.add;
    if (!formula) return false;
    return FTKR.evalFormula(formula);
};


//=============================================================================
// ステートの自動付与＆自動解除判定
//=============================================================================

FTKR.ASC.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    FTKR.ASC.Game_Battler_refresh.call(this);
    if (this.isAlive()) {
        FTKR.setGameData(this);
        this.checkAutoAddState();
        this.states().forEach( function(state) {
            if (DataManager.evalRemoveStateConditions(state)) {
                this.removeState(state.id);
            }
        },this);
    }
};

Game_Battler.prototype.checkAutoAddState = function() {
    $dataStates.forEach( function(state){
        if (!state) return;
        if (DataManager.evalAddStateConditions(state)) {
            if (!this.isStateAffected(state.id)) {
                this.addState(state.id);
            }
        }
    },this);
};
