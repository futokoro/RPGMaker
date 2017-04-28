//=============================================================================
// 変数の操作を拡張するプラグイン
// FTKR_ExVariablesChange.js
// 作成者     : フトコロ
// 作成日     : 2017/04/18
// 最終更新日 : 2017/04/28
// バージョン : v1.0.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EVC = true;

var FTKR = FTKR || {};
FTKR.EVC = FTKR.EVC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.4 変数の操作を拡張するプラグイン
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
 * ノートタグをメモ欄に追記すると以下の状況において、変数・スイッチの
 * 変更ができます。
 * 
 * 対象：アイテム、武器、防具
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
 * 対象：アイテム、スキル、アクター、エネミー、クラス、装備、ステート
 * 
 * なお、タグで設定した変数の計算が行われる順番は以下の通りです。
 * アイテム/スキル ⇒ アクター/エネミー ⇒ クラス ⇒ 装備 ⇒ ステート
 * 
 * 1. 成功失敗問わずに使用すると実行
 * 
 * <EVC 使用時>
 * 計算式
 * </EVC 使用時>
 * 
 * 
 * 2. 使用して成功すると実行
 * 
 * <EVC 使用成功時>
 * 計算式
 * </EVC 使用成功時>
 * 
 * 
 * 3. 使用して失敗(命中しない、回避される)すると実行
 * 
 * <EVC 使用失敗時>
 * 計算式
 * </EVC 使用失敗時>
 * 
 * 
 * 4. ダメージを与えると実行
 * 
 * <EVC ダメージ時>
 * 計算式
 * </EVC ダメージ時>
 * 
 * 
 * 5. ダメージを受けると実行
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
 * v1.0.4 - 2017/04/28 : 不具合修正
 *    1. アイテム増減時に例外処理を追加。
 * 
 * v1.0.3 - 2017/04/26 : 機能追加
 *    1. ダメージ時の変数操作機能を追加
 *    2. アイテム・スキル使用時のタグ適用先を拡張。
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

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

//=============================================================================
// 自作関数
//=============================================================================

var setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};

// 挟み込み形式のメタデータを読み取ってtextを返す
var readEntrapmentCodeToText = function(obj, codeTitles) {
    regs = convertEntrapmentRegArray('EVC', codeTitles);
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
var convertEntrapmentRegArray = function(header, codeTitles) {
    return codeTitles.map(function(str) {
        return {
            a:new RegExp('<' + header + ' ' + str + '>', 'i'),
            b:new RegExp('<\/' + header + ' ' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列regsとdataをテストする
var testRegs = function(data, regs, prop) {
    return regs.some(function(reg) {
        return prop ? reg[prop].test(data) : reg.test(data);
    });
};

//objのメモ欄から <codeTitle[0]: x> から <codeTitle[n]: x>のいずれかの値を読み取って配列で返す
var readSplitAnyEntrapmentCode = function(obj, codeTitles) {
    var evalsText = readEntrapmentCodeToText(obj, codeTitles);
    return evalsText ? evalsText.split(';') : [];
};

//配列内のobjのメモ欄から <codeTitle: x> の値を読み取って配列で返す
var readItemsEntrapmentCodeSplitTotal = function(items, codeTitles) {
    var result = [];
    items.forEach( function(item) {
        if(item) Array.prototype.push.apply(result, readSplitAnyEntrapmentCode(item, codeTitles));
    });
    return result;
};

//target(アクターまたはエネミー)が持つ、codeTitle[0] ~ codeTitle[n]のいずれかで指定したタグの値を配列にして返す
// クラス、装備、ステートも含む
var readItemsEntrapmentCodeArray = function(target, codeTitles) {
    var result = [];
    if(target.isActor()) {
        return result.concat(
            readSplitAnyEntrapmentCode(target.actor(), codeTitles),
            readSplitAnyEntrapmentCode($dataClasses[target.actor().classId], codeTitles),
            readItemsEntrapmentCodeSplitTotal(target.equips(), codeTitles),
            readItemsEntrapmentCodeSplitTotal(target.states(), codeTitles)
        );
    } else if(target.isEnemy()) {
        return result.concat(
            readSplitAnyEntrapmentCode(target.enemy(), codeTitles),
            readItemsEntrapmentCodeSplitTotal(target.states(), codeTitles)
        );
    }
    return result;
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.variablesChangeNoteTags = function(codeTitles, item, target) {
    if(item) this.variablesChangeItemNoteTags(codeTitles, item);
    if(target) this.variablesChangeUnitNoteTags(codeTitles, target);
};

DataManager.variablesChangeItemNoteTags = function(codeTitles, obj) {
    var evalsText = readEntrapmentCodeToText(obj, codeTitles);
    if (!evalsText) return;
    this.evcEvalsFormula(evalsText.split(';'));
};

DataManager.variablesChangeUnitNoteTags = function(codeTitles, obj) {
    var evalsTexts = readItemsEntrapmentCodeArray(obj, codeTitles);
    this.evcEvalsFormula(evalsTexts);
};

DataManager.evcEvalsFormula = function(evals) {
    var datas = FTKR.gameData;
    for (var i = 0; i < evals.length; i++) {
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var a = datas.user;
            var b = datas.target;
            var item   = datas.item;
            var number = datas.number;
            if (b) var result = b.result();
            if(Imported.FTKR_ISV) {
                if (a && a.evcData()._selfVariables) var av = a.evcData()._selfVariables._data;
                if (b && b.evcData()._selfVariables) var bv = b.evcData()._selfVariables._data;
                if (item && item._selfVariables) var iv = item._selfVariables._data;
            }
            eval(evals[i]);
            continue;
        } catch (e) {
            console.error(e);
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
    this.evcVariablesChange(target);
};

Game_Action.prototype.evcVariablesChange = function(target) {
    var result = target.result();
    if (!result.used) return false;
    setGameData(this.subject(), target, this.item());
    this.variablesChangeItemNoteTags(['使用時', 'USE'], this.subject());
    if (result.isHit()) {
        this.variablesChangeItemNoteTags(['使用成功時', 'SUCCESS'], this.subject());
        if (result.hpDamage || result.mpDamage) {
            this.variablesChangeItemNoteTags(['与ダメージ時', 'DAMAGE'], this.subject());
            this.variablesChangeItemNoteTags(['被ダメージ時', 'RECEIVE_DAM'], target);
        }
    } else {
        this.variablesChangeItemNoteTags(['使用失敗時', 'FAILURE'], this.subject());
    }
    return true;
};

Game_Action.prototype.variablesChangeItemNoteTags = function(codeTitles, target) {
    DataManager.variablesChangeNoteTags(codeTitles, this.item(), target);
};

//=============================================================================
// 購入時
//=============================================================================

FTKR.EVC.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    setGameData(null, null, this._item, number);
    DataManager.variablesChangeNoteTags(['購入時', 'BUY'], this._item);
    FTKR.EVC.Scene_Shop_doBuy.call(this, number);
};

//=============================================================================
// 増加・減少時
//=============================================================================

FTKR.EVC.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    FTKR.EVC.Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (this.itemContainer(item) && amount) {
        setGameData(null, null, item, amount);
        if (amount > 0) {
            DataManager.variablesChangeNoteTags(['増加時', 'GAIN'], item);
        } else if (amount < 0) {
            DataManager.variablesChangeNoteTags(['減少時', 'LOSE'], item);
        }
    }
};

//=============================================================================
// 売却時
//=============================================================================

FTKR.EVC.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    setGameData(null, null, this._item, number);
    DataManager.variablesChangeNoteTags(['売却時', 'SELL'], this._item);
    FTKR.EVC.Scene_Shop_doSell.call(this, number);
};
