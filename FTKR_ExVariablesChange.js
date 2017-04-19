//=============================================================================
// 変数の操作を拡張するプラグイン
// FTKR_ExVariablesChange.js
// 作成者     : フトコロ
// 作成日     : 2017/04/18
// 最終更新日 : 2017/04/19
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EVC = true;

var FTKR = FTKR || {};
FTKR.EVC = FTKR.EVC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 変数の操作を拡張するプラグイン
 * @author フトコロ
 *
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、以下の状況において変数やスイッチを
 * 操作することができます。
 * 
 * 1. アイテム、武器、防具の購入（増加）・売却（減少）時
 * 2. アイテム、スキルの使用時(成功時、失敗時)
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
 * 変数・スイッチの変更設定
 *-----------------------------------------------------------------------------
 * ノートタグをアイテム(武器・防具含む)やスキルのメモ欄に追記すると
 * 以下の状況において、変数・スイッチの変更設定ができます。
 * 
 * 1. アイテム・武器・防具用
 * <EVC 購入時>
 * 計算式
 * </EVC 購入時>
 * 
 * <EVC 売却時>
 * 計算式
 * </EVC 売却時>
 * 
 * <EVC 増加時>
 * 計算式
 * </EVC 増加時>
 *    :購入、イベントで入手、敵から入手などで実行
 * 
 * <EVC 減少時>
 * 計算式
 * </EVC 減少時>
 *    :売却、イベントで減少などで実行
 * 
 * 
 * 2. アイテム・スキル用
 * <EVC 使用時>
 * 計算式
 * </EVC 使用時>
 *    :成功失敗問わずに、常に実行する
 * 
 * <EVC 使用成功時>
 * 計算式
 * </EVC 使用成功時>
 *    :使用時とは別に、成功すると実行する。
 * 
 * <EVC 使用失敗時>
 * 計算式
 * </EVC 使用失敗時>
 *    :使用時とは別に、失敗すると実行する。
 * 
 * 
 * [計算式について]
 * 計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  s[x]    - スイッチID x の値を意味します。
 *  v[x]    - 変数ID x の値を意味します。
 *  av[x]   - 使用者のセルフ変数ID x の値を意味します。(*1)
 *  bv[x]   - 対象者のセルフ変数ID x の値を意味します。(*1)
 *  iv[x]   - アイテムのセルフ変数ID x の値を意味します。(*1)(*2)
 *  number  - 購入・売却・増減時のアイテム数を意味します。
 * 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * (*2) アイテムとは、使用したスキルまたはアイテム、購入・売却したアイテムの
 *      ことです。
 * 
 * 
 * [設定例]
 * 購入時に変数を操作するためアイテムに以下のノートタグを設定する。
 * 
 * <EVC 購入時>
 * s[1] = true
 * v[10] = 10
 * iv[1] += v[5]
 * iv[2] += number
 * </EVC 購入時>
 * 
 * スイッチID1 を ON にします。
 * 変数ID10 に 10 を代入します。
 * 購入したアイテムのセルフ変数ID1 に 変数ID5 の値を加算します。
 * 購入したアイテムのセルフ変数ID2 に 購入数を加算します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2017/04/19 : 不具合修正
 * 
 * v1.0.0 - 2017/04/18 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EVC.parameters = PluginManager.parameters('FTKR_ExVariablesChange');

//=============================================================================
// Array
//=============================================================================

Array.prototype.someTexts = function(str) {
    return this.some(function(text) {
        return text.toUpperCase() === str.toUpperCase();
    });
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.evcVariablesNoteTags = function(conditions, obj, subject, number) {
    var case1a = /<EVC (.+)>/i;
    var case1b = /<\/EVC (.+)>/i;

    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';
    var formula = '';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(case1a) && conditions.someTexts(RegExp.$1)) {
            setMode = 'data';
        } else if (line.match(case1b) && conditions.someTexts(RegExp.$1)) {
            setMode = 'none';
        } else if (setMode === 'data') {
            formula += line + ';';
        }
    }
    this.evcChangeVariables(formula, obj, subject, number);
};

DataManager.evcChangeVariables = function(formula, obj, subject, target, number) {
    if (!formula) return;
    var evals = formula.split(';');
    for (var i = 0; i < evals.length; i++) {
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            if(Imported.FTKR_ISV) {
                if (subject && subject._selfVariables) var av = subject._selfVariables._data;
                if (target && target._selfVariables) var bv = target._selfVariables._data;
                if (obj && obj._selfVariables) var iv = obj._selfVariables._data;
            }
            eval(evals[i]);
            continue;
        } catch (e) {
            console.log(e);
            continue;
        }
    }
    if($gameMap) $gameMap.requestRefresh();
};

//=============================================================================
// 使用時
//=============================================================================

FTKR.EVC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    console.log('apply');
    FTKR.EVC.Game_Action_apply.call(this, target);
    DataManager.evcVariablesNoteTags(['使用時', 'USE'], this.item(), this.subject(), target);
    var result = target.result();
    if (result.isHit()) {
        DataManager.evcVariablesNoteTags(['使用成功時', 'SUCCESS'], this.item(), this.subject(), target);
    } else {
        DataManager.evcVariablesNoteTags(['使用失敗時', 'FAILURE'], this.item(), this.subject(), target);
    }
};

//=============================================================================
// 購入時
//=============================================================================

FTKR.EVC.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    DataManager.evcVariablesNoteTags(['購入時', 'BUY'], this._item, null, null, number);
    FTKR.EVC.Scene_Shop_doBuy.call(this, number);
};

//=============================================================================
// 増加・減少時
//=============================================================================

FTKR.EVC.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    FTKR.EVC.Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (amount > 0) {
        DataManager.evcVariablesNoteTags(['増加時', 'GAIN'], item, null, null, amount);
    } else if (amount < 0) {
        DataManager.evcVariablesNoteTags(['減少時', 'LOSE'], item, null, null, amount);
    }
};

//=============================================================================
// 売却時
//=============================================================================

FTKR.EVC.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    DataManager.evcVariablesNoteTags(['売却時', 'SELL'], this._item, null, null, number);
    FTKR.EVC.Scene_Shop_doSell.call(this, number);
};
