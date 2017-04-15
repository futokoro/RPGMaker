//=============================================================================
// アイテムの基本設定を拡張するプラグイン
// FTKR_ExItemConfig_ItemBasic.js
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IEP = true;

var FTKR = FTKR || {};
FTKR.IEP = FTKR.IEP || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アイテムの基本設定を拡張するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテム(武器・防具含む)に、以下の仕様を
 * 追加します。
 * 
 * 1. アイテムの価格を数値以外を設定することができます。
 * 
 * 2. 事前に複数の設定を登録し、ゲーム内で条件付けでアイテムの設定を
 *    変えることができます。
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
 * アイテムの基本設定の変更
 *-----------------------------------------------------------------------------
 * アイテム(武器・防具含む)に以下のノートタグを追記することで、一つのアイテムに
 * 対して複数の基本設定を登録することができます。
 * 
 * データベース上の設定は、データID0 に登録されます。
 * データID0は、他のIDの適用条件が満たない場合に適用します。
 * 
 * **********************************************************************
 * 注意：データIDを追加する場合は、必ずID1 から順番に追加してください。
 * **********************************************************************
 * 
 * <EIC 基本設定: x>   :データID x に対して code部の設定を登録します。
 * code
 * </EIC 基本設定>
 * 
 * [code部で設定できる項目]
 * 有効条件: 計算式
 * enabled: eval
 *    :データID x の適用条件を 計算式(eval) で設定します。
 *    :適用条件が複数のIDで重なった場合は、IDが大きい方を適用します。
 *    :適用条件を設定しない場合、常に有効になります。
 * 
 * 以下のcodeは、設定しなかった場合、データベース上の設定を適用します。
 * 名前: アイテム名
 * name: アイテム名
 *    :アイテムの名前を'アイテム名'に変更します。
 * 
 * アイコン: y
 * icon: y
 *    :アイコンを y に変更します。
 * 
 * 価格: 計算式
 * price: eval
 *    :アイテムの価格を 計算式(eval) で設定した値に変更します。
 * 
 * 説明: 説明文
 * desc: 説明文
 *    :アイテムの説明を'説明文'に変更します。
 *    :制御文字を使用できます。
 *    :二つ設定することで、説明文を2行に表示できます。
 * 
 * 使用可能時: 状況
 * used: 状況
 *    :使用可能時の設定を'状況'に変更します。
 *    :'状況'には以下の文字または数字を入力します。
 *    : 常時(0), バトル画面(1), メニュー画面(2), 使用不可(3) 
 * 
 * 
 * [計算式(eval) の値について]
 * 計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a[x].param - アクターID x のパラメータを参照します。
 *  s[x]       - スイッチID x の状態を参照します。
 *  v[x]       - 変数ID x の値を参照します。
 *  iv[x]      - アイテムのセルフ変数ID x の値を参照します。(*1)
 * 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * 
 * 
 * 入力例）
 * アイテムのセルフ変数ID1 が O の時にアイテムの設定を変える場合の設定。
 * 鑑定イベント等を作成し、アイテムのセルフ変数ID1を 0 以外に変えると
 * アイテム本来の表示になります。
 *  
 * <EIC 基本設定: 1>
 * 有効条件: !iv[1]
 * 名前: 何かのアイテム
 * アイコン: 160
 * 価格: 0
 * 説明: 何に使えるか不明なアイテム。
 * 説明: 鑑定するまで使用できない。
 * 使用可能時: 使用不可
 * </EIC 基本設定>
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
 * v1.0.0 - 2017/04/14 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.IEP.parameters = PluginManager.parameters('FTKR_ExItemConfig_ItemBasic');


//=============================================================================
// DataManager
//=============================================================================

FTKR.IEP.DatabaseLoaded = false;
FTKR.IEP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.IEP.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.IEP.DatabaseLoaded) {
        this.iepDataNotetags($dataItems);
        this.iepDataNotetags($dataWeapons);
        this.iepDataNotetags($dataArmors);
        FTKR.IEP.DatabaseLoaded = true;
    }
    return true;
};

DataManager.iepDataNotetags = function(group) {
    var note1a = /<(?:EIC BASIC):[ ]*(\d+)>/i;
    var note1aj = /<(?:EIC 基本設定):[ ]*(\d+)>/i;
    var note1b = /<\/(?:EIC BASIC)>/i;
    var note1bj = /<\/(?:EIC 基本設定)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        var data = {};
        obj.iepData = [];
        obj.iepDatas = [];
        obj.iepDatas[0] = {
            name:obj.name,
            iconIndex:obj.iconIndex,
            description:obj.description,
            enabled:true,
            price:obj.price,
        };
        if (obj.hasOwnProperty('occasion')) {
            obj.iepDatas[0].occasion = obj.occasion;
        }

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                data = { id:Number(RegExp.$1), text:'' };
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.iepData.push(data);
            } else if (setMode === 'anydata') {
                data.text += line + ';';
            }
        }
        this.makeIepData(obj);
    }
};

DataManager.makeIepData = function(item) {
    for (var t = 0; t < item.iepData.length; t++) {
        var iepData = item.iepData[t];
        if (iepData) {
            var case1 = /(?:ENABLED):[ ]*(.+)/i;
            var case1j = /(?:有効条件):[ ]*(.+)/i;
            var case2 = /(?:NAME):[ ]*(.+)/i;
            var case2j = /(?:名前):[ ]*(.+)/i;
            var case3 = /(?:ICON):[ ]*(\d+)/i;
            var case3j = /(?:アイコン):[ ]*(\d+)/i;
            var case4 = /(?:DESC):[ ]*(.+)/i;
            var case4j = /(?:説明):[ ]*(.+)/i;
            var case5 = /(?:USED):[ ]*(.+)/i;
            var case5j = /(?:使用可能時):[ ]*(.+)/i;
            var case6 = /(?:PRICE):[ ]*(.+)/i;
            var case6j = /(?:価格):[ ]*(.+)/i;

            var dataId = iepData.id;
            if (!item.iepDatas[dataId]) item.iepDatas[dataId] = {};
            item.iepDatas[dataId].name = item.name;
            item.iepDatas[dataId].iconIndex = item.iconIndex;
            item.iepDatas[dataId].description = item.description;
            item.iepDatas[dataId].price = item.price;
            if (item.hasOwnProperty('occasion')) {
                item.iepDatas[dataId].occasion = item.occasion;
            }
            var desc = '';
            var datas = iepData.text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.match(case1) || data.match(case1j)) {
                    item.iepDatas[dataId].enabled = RegExp.$1;
                } else if(data.match(case2) || data.match(case2j)) {
                    item.iepDatas[dataId].name = RegExp.$1;
                } else if(data.match(case3) || data.match(case3j)) {
                    item.iepDatas[dataId].iconIndex = Number(RegExp.$1);
                } else if(data.match(case4) || data.match(case4j)) {
                    desc += RegExp.$1 + '\r\n';
                } else if(data.match(case5) || data.match(case5j)) {
                     item.iepDatas[dataId].occasion = this.occasion(RegExp.$1);
                } else if(data.match(case6) || data.match(case6j)) {
                    item.iepDatas[dataId].price = RegExp.$1;
                }
            }
            if(desc) item.iepDatas[dataId].description = desc;
        }
    }
    item.iepData = [];
};

DataManager.occasion = function(value) {
    switch(value) {
        case '常時':
        case '0':
            return 0;
        case 'バトル画面':
        case '1':
            return 1;
        case 'メニュー画面':
        case '2':
            return 2;
        case '使用不可':
        case '3':
        default:
            return 3;
    }
};

DataManager.evalEnabledFormula = function(formula, item) {
    if (!formula) return true;
    try {
        var a = $gameActors._data;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        return false;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

FTKR.IEP.Game_BattlerBase_isOccasionOk = Game_BattlerBase.prototype.isOccasionOk;
Game_BattlerBase.prototype.isOccasionOk = function(item) {
    if (DataManager.isItem(item)) {
        var iepItem = this.itemIepData(item);
        if ($gameParty.inBattle()) {
            return iepItem.occasion === 0 || iepItem.occasion === 1;
        } else {
            return iepItem.occasion === 0 || iepItem.occasion === 2;
        }
    } else {
        return FTKR.IEP.Game_BattlerBase_isOccasionOk.call(this, item);
    }
};

Game_BattlerBase.prototype.itemIepData = function(item) {
    var iepDatas = item.iepDatas.filter( function(data) {
        return DataManager.evalEnabledFormula(data.enabled, item);
    },this);
    return iepDatas.pop();
};

//=============================================================================
// Window_Base
//=============================================================================

FTKR.IEP.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item && item.iepDatas) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(this.itemIepData(item).iconIndex, x + 2, y + 2);
        this.drawText(this.itemIepData(item).name, x + iconBoxWidth, y, width - iconBoxWidth);
    } else {
        FTKR.IEP.Window_Base_drawItemName.call(this, item, x, y, width);
    }
};

Window_Base.prototype.itemIepData = function(item) {
    var iepDatas = item.iepDatas.filter( function(data) {
        return DataManager.evalEnabledFormula(data.enabled, item);
    },this);
    return iepDatas.pop();
};

Window_Base.prototype.itemIepPrice = function(item) {
    return Number(DataManager.evalEnabledFormula(this.itemIepData(item).price, item));
};

//=============================================================================
// アイテムの購入価格
//=============================================================================

//書き換え
Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]]; break;
        case 1:
            item = $dataWeapons[goods[1]]; break;
        case 2:
            item = $dataArmors[goods[1]]; break;
        }
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? this.itemIepPrice(item) : goods[3]);
        }
    }, this);
};

//=============================================================================
// アイテムの売却価格
//=============================================================================

//書き換え
Window_ShopSell.prototype.isEnabled = function(item) {
    return item && this.itemIepPrice(item) > 0;
};

//書き換え
Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this.itemIepPrice(this._item) / 2);
};

Scene_Shop.prototype.itemIepData = function(item) {
    var iepDatas = item.iepDatas.filter( function(data) {
        return DataManager.evalEnabledFormula(data.enabled, item);
    },this);
    return iepDatas.pop();
};

Scene_Shop.prototype.itemIepPrice = function(item) {
    return Number(DataManager.evalEnabledFormula(this.itemIepData(item).price, item));
};

//=============================================================================
// Window_Help
//=============================================================================

FTKR.IEP.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (item && item.iepDatas) {
        this.setText(this.itemIepData(item).description);
    } else {
        FTKR.IEP.Window_Help_setItem.call(this, item);
    }
};

