//=============================================================================
// 変数の操作を拡張するプラグイン
// FTKR_ExVariablesChange.js
// 作成者     : フトコロ
// 作成日     : 2017/04/18
// 最終更新日 : 2017/04/26
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EVC = true;

var FTKR = FTKR || {};
FTKR.EVC = FTKR.EVC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.3 変数の操作を拡張するプラグイン
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
 * 1. アイテム、武器、防具の増減時
 * 2. アイテム、スキルの使用時
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
 * アイテム、武器、防具の増減時
 *-----------------------------------------------------------------------------
 * ノートタグをアイテム(武器・防具含む)のメモ欄に追記すると
 * 以下の状況において、変数・スイッチの変更設定ができます。
 * 
 * 1. ショップで購入した時に実行
 * <EVC 購入時>
 * 計算式
 * </EVC 購入時>
 * 
 * 
 * 2. ショップで売却した時に実行
 * <EVC 売却時>
 * 計算式
 * </EVC 売却時>
 * 
 * 
 * 3. アイテム数が増加すると実行
 * <EVC 増加時>
 * 計算式
 * </EVC 増加時>
 * 
 * 
 * 4. アイテム数が減少すると実行
 * <EVC 減少時>
 * 計算式
 * </EVC 減少時>
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテム、スキルの使用時
 *-----------------------------------------------------------------------------
 * ノートタグをメモ欄に追記すると以下の状況において、変数・スイッチの
 * 変更ができます。
 * 
 * 1. 成功失敗問わずに使用すると実行
 * 対象：アイテム、スキル、アクター、エネミー
 * 
 * <EVC 使用時>
 * 計算式
 * </EVC 使用時>
 * 
 * 
 * 2. 使用して成功すると実行
 * 対象：アイテム、スキル、アクター、エネミー
 * 
 * <EVC 使用成功時>
 * 計算式
 * </EVC 使用成功時>
 * 
 * 
 * 3. 使用して失敗(命中しない、回避される)すると実行
 * 対象：アイテム、スキル、アクター、エネミー
 * 
 * <EVC 使用失敗時>
 * 計算式
 * </EVC 使用失敗時>
 * 
 * 
 * 4. ダメージを与えると実行
 * 対象：アイテム、スキル、アクター、エネミー
 * 
 * <EVC ダメージ時>
 * 計算式
 * </EVC ダメージ時>
 * 
 * 
 * 5. ダメージを受けると実行
 * 対象：アイテム、スキル、アクター、エネミー
 * 
 * <EVC 被ダメージ時>
 * 計算式
 * </EVC 被ダメージ時>
 * 
 * 
 *-----------------------------------------------------------------------------
 * 計算式について
 *-----------------------------------------------------------------------------
 * 計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  s[x]    - スイッチID x の値を意味します。
 *  v[x]    - 変数ID x の値を意味します。
 *  av[x]   - 使用者のセルフ変数ID x の値を意味します。(*1)
 *  bv[x]   - 対象者のセルフ変数ID x の値を意味します。(*1)
 *  iv[x]   - アイテムのセルフ変数ID x の値を意味します。(*1)(*2)
 *  number  - 購入・売却・増減時のアイテム数を意味します。
 *  result  - スキル・アイテムを使用した結果を参照します。
 *            result.hpDamage でHPダメージ量を取得します。
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.3 - 2017/04/26 : ダメージ時の変数操作機能を追加
 * 
 * v1.0.2 - 2017/04/25 : 不具合修正
 *    1. 対象者のセルフ変数が正しく反映されない不具合を修正。
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

DataManager.evcVariablesNoteTags = function(conditions, obj, subject, target, item, number) {
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
    this.evcChangeVariables(formula, subject, target, item, number);
};

DataManager.evcChangeVariables = function(formula, subject, target, item, number) {
    if (!formula) return;
    var evals = formula.split(';');
    for (var i = 0; i < evals.length; i++) {
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            if (target) var result = target.result();
            if(Imported.FTKR_ISV) {
                if (subject && subject._selfVariables) var av = subject._selfVariables._data;
                if (target && target.evcData()._selfVariables) var bv = target.evcData()._selfVariables._data;
                if (item && item._selfVariables) var iv = item._selfVariables._data;
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
// データの取得
//=============================================================================

Game_Actor.prototype.evcData = function() {
    return $dataActors[this._actorId];
};

Game_Enemy.prototype.evcData = function() {
    return $dataEnemies[this._enemyId];
};


//=============================================================================
// 使用時
//=============================================================================

FTKR.EVC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    FTKR.EVC.Game_Action_apply.call(this, target);
    this.evcVariablesNoteTags(['使用時', 'USE'], [this.item(), this.subject().evcData()], target);
    var result = target.result();
    if (result.isHit()) {
        this.evcVariablesNoteTags(['使用成功時', 'SUCCESS'], [this.item(), this.subject().evcData()], target);
        if (result.hpDamage || result.mpDamage) {
            this.evcVariablesNoteTags(['与ダメージ時', 'DAMAGE'], [this.item(), this.subject().evcData()], target);
            this.evcVariablesNoteTags(['被ダメージ時', 'RECEIVE_DAM'], [this.item(), target.evcData()], target);
        }
    } else {
        this.evcVariablesNoteTags(['使用失敗時', 'FAILURE'], [this.item(), this.subject().evcData()], target);
    }
};

Game_Action.prototype.evcVariablesNoteTags = function(metacodes, objs, target) {
    objs.forEach(function(obj){
        DataManager.evcVariablesNoteTags(metacodes, obj, this.subject().evcData(), target, this.item());
    },this); 
};

//=============================================================================
// 購入時
//=============================================================================

FTKR.EVC.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    DataManager.evcVariablesNoteTags(['購入時', 'BUY'], this._item, null, null, this._item, number);
    FTKR.EVC.Scene_Shop_doBuy.call(this, number);
};

//=============================================================================
// 増加・減少時
//=============================================================================

FTKR.EVC.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    FTKR.EVC.Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (amount > 0) {
        DataManager.evcVariablesNoteTags(['増加時', 'GAIN'], item, null, null, item, amount);
    } else if (amount < 0) {
        DataManager.evcVariablesNoteTags(['減少時', 'LOSE'], item, null, null, item, amount);
    }
};

//=============================================================================
// 売却時
//=============================================================================

FTKR.EVC.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    DataManager.evcVariablesNoteTags(['売却時', 'SELL'], this._item, null, null, this._item, number);
    FTKR.EVC.Scene_Shop_doSell.call(this, number);
};
