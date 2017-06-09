//=============================================================================
// アイテムボックスに所持容量を追加するプラグイン
// FTKR_ItemBoxCapacity.js
// 作成者     : フトコロ
// 作成日     : 2017/06/09
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IBC = true;

var FTKR = FTKR || {};
FTKR.IBC = FTKR.IBC || {};

/*:
 * @plugindesc v1.0.0 アイテムボックスに所持容量を追加する
 * @author フトコロ
 *
 * @param --アイテムボックス容量設定--
 * @default
 * 
 * @param Item Capacity
 * @desc アイテムの所持容量
 * 0 - 無制限, 1~ - 指定した数
 * @default 0
 * 
 * @param Weapon Capacity
 * @desc 武器の所持容量
 * 0 - 無制限, 1~ - 指定した数
 * @default 0
 * 
 * @param Armor Capacity
 * @desc 防具の所持容量
 * 0 - 無制限, 1~ - 指定した数
 * @default 0
 * 
 * @param --スタック設定--
 * @default
 * 
 * @param Display Number of Digit
 * @desc アイテム所持数の表示桁数を設定する
 * 所持数が表示桁数を超えると横に圧縮して表示する
 * @default 2
 * 
 * @param Max Stack Number
 * @desc スタック数の最大値
 * @default 99
 * 
 * @param Enable Duplicate Stack
 * @desc 同一アイテムを重複してスタックできるか
 * 1 - 許可する, 0 - 許可しない
 * @default 0
 * 
 * @param --購入設定--
 * @default
 * 
 * @param Max Buy Number
 * @desc 一度に購入できる最大数
 * @default 99
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムボックスに所持容量を追加します。
 * 
 * また、アイテムの最大スタック数を超えた場合、別にスタックすることができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 既存のセーブデータは使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムボックスの所持容量の設定
 *-----------------------------------------------------------------------------
 * アイテムボックスに所持容量を設定することができます。
 * この機能を使うためには、プラグインパラメータ<Enable Capacity>を
 * 有効にしてください。
 * 
 * 所持容量を設定すると、そのカテゴリーは設定した数の種類までしか所持することが
 * できなくなります。
 * この設定数以上のアイテムは所持することができず、入手しても自動的に破棄します。
 * 
 * アイテムの所持容量を 10 に設定した場合、アイテムは 10種類までしか
 * 所持できません。
 * この時、各アイテムが何個持っているかは関係ありません。
 * 
 * 設定できるカテゴリーは「アイテム」「武器」「防具」の３つです。
 * 「大事なもの」は、アイテムに含まれます。
 * 
 * 
 * アイテムボックスに空きがあるかどうかは、以下のスクリプトで判定できます。
 * 
 * $gameParty.isItemsCapacityOk()   - アイテムの所持容量
 * $gameParty.isWeaponsCapacityOk() - 武器の所持容量
 * $gameParty.isArmorsCapacityOk()  - 防具の所持容量
 * 
 * 
 * 所持容量の設定方法は以下の通りです。
 * 1. プラグインパラメータで[初期値]を設定
 *    <Item Capacity>
 *    <Weapon Capacity>
 *    <Armor Capacity>
 *    : 0 を設定した場合は、容量が無制限になります。
 * 
 * 
 * 2. プラグインコマンドで[追加分]を設定
 *    この追加分は、プラグインパラメータの値とは別に計算します。
 * 
 *    IBC_所持容量設定 [カテゴリー] [数値] [計算方法]
 *    IBC_SET_CAPACITY [category] [value] [calc_method]
 * 
 *    [カテゴリー]の入力内容で、どのカテゴリーの容量を変えるか指定します。
 *      アイテム or ITEM
 *      武器 or WEAPON
 *      防具 or ARMOR
 * 
 *    [数値]の入力内容
 *      \V[x] でゲーム内変数ID x の値を参照できます。
 *    
 *    [計算方法]の入力内容で、[数値]をどのように計算するか指定します。
 *    計算方法を指定しない場合は、代入を適用します。
 *      加算 or ADD or +
 *      減算 or SUBTRACT or -
 *      乗算 or MULTIPLY or *
 *      除算 or DIVIDE or /
 *      剰余 or MOD or %
 *      代入 or SUBSTITUTE or =
 * 
 *    例)
 *    IBC_所持容量設定 アイテム 10 加算
 *    IBC_所持容量設定 防具 \V[1] 代入
 *    IBC_SET_CAPACITY WEAPON 5 SUBTRACT
 * 
 * 
 * 上記の設定によって所持容量は以下の結果になります。
 * 
 * 　所持容量　＝　初期値　＋　追加分
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムのスタックの設定
 *-----------------------------------------------------------------------------
 * アイテムボックスの中で、１つのアイテムは１行にまとめて表示します。
 * そして、所持数を表示することでそのアイテムを何個所持しているか分かります。
 * これがアイテムのスタックです。
 * 
 * 当プラグインでは、このスタック機能を変更することができます。
 * この機能を使うためには、プラグインパラメータ<Enable Capacity>を
 * 有効にしてください。
 * 
 * 
 * アイテムをスタックできる数は以下の方法で設定できます。
 * 1. プラグインパラメータで設定
 *    <Max Stack Number>
 * 
 * 2. アイテムのメモ欄に以下のタグを記入
 *    <IBC_スタック: x>
 *    <IBC_STACK: x>
 *        : x - 最大スタック数
 * 
 * 設定が被った場合、メモ欄の設定を優先します。
 * この設定数以上のアイテムは所持することができず、入手しても自動的に破棄します。
 * 
 * 
 * プラグインパラメータ<Enable Duplicate Stack>を許可設定すると
 * スタック数以上にアイテムを所持することができます。
 * スタック数を超えた分は、別の行に表示します。
 * なお、この別の行に表示したアイテムは、所持容量上別のアイテムとして計算します。
 * 
 * 例えば「ポーション」を20個所持していて、スタック数の最大が10の場合
 * 「ポーション」の行が 2つできます。
 * この時、アイテムを２種類持っていると数えます。
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
 * v1.0.0 - 2017/06/09 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemBoxCapacity');

    FTKR.IBC = {
        disp:{
            digit     :Number(parameters['Display Number of Digit'] || 0),
        },
        capacity:{
            item      :Number(parameters['Item Capacity'] || 0),
            weapon    :Number(parameters['Weapon Capacity'] || 0),
            armor     :Number(parameters['Armor Capacity'] || 0),
        },
        stack:{
            max       :Number(parameters['Max Stack Number'] || 0),
            dup       :Number(parameters['Enable Duplicate Stack'] || 0),
        },
        buy:{
            max       :Number(parameters['Max Buy Number'] || 0),
        },
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgNumber = function(arg) {
        try {
            var arg = convertEscapeCharacters(arg);
            return Number(eval(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    var calcValueCode = function(value1, value2, code) {
        switch ((code + '').toUpperCase()) {
            case '加算':
            case 'ADD':
            case '＋':
            case '+':
                return value1 + value2;
            case '減算':
            case 'SUBTRACT':
            case 'ー':
            case '-':
                return value1 - value2;
            case '積算':
            case 'MULTIPLY':
            case '×':
            case '*':
                return value1 * value2;
            case '除算':
            case 'DIVIDE':
            case '／':
            case '/':
                return value1 / value2;
            case '剰余':
            case  'MOD':
            case '％':
            case '%':
                return value1 % value2;
            case '代入':
            case 'SUBSTITUT':
            case '＝':
            case '=':
            default:
                return value2;
        }
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _IBC_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _IBC_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/IBC_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '所持容量設定':
            case 'SET_CAPACITY':
                if (FTKR.IBC.enable.capacity) this.setItemBoxCapacity(args);
                break;
        }
    };

    Game_Interpreter.prototype.setItemBoxCapacity = function(args) {
        var arg = (args[0] + '').toUpperCase();
        switch (arg) {
            case 'アイテム':
            case 'ITEM':
                var oldvalue = $gameParty.itemsCapacityPlus();
                $gameParty.setItemsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            case '武器':
            case 'WEAPON':
                var oldvalue = $gameParty.weaponsCapacityPlus();
                $gameParty.setWeaponsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            case '防具':
            case 'ARMOR':
                var oldvalue = $gameParty.armorsCapacityPlus();
                $gameParty.setArmorsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            default :
                return;
        }
    };

    //=============================================================================
    // アイテムボックスの仕様を変える
    // Game_Party
    //=============================================================================
    //------------------------------------------------------------------------
    //アイテムボックスのデータ保存形式を変更
    //------------------------------------------------------------------------
    //書き換え
    Game_Party.prototype.initAllItems = function() {
        this._items = [];
        this._weapons = [];
        this._armors = [];
        this._itemsCapacityPlus = 0;
        this._weaponsCapacityPlus = 0;
        this._armorsCapacityPlus = 0;
    };

    //書き換え
    Game_Party.prototype.items = function() {
        var list = [];
        this._items.forEach( function(item){
            list.push($dataItems[item.id]);
        });
        return list;
    };

    //書き換え
    Game_Party.prototype.weapons = function() {
        var list = [];
        this._weapons.forEach( function(item){
            list.push($dataWeapons[item.id]);
        });
        return list;
    };

    //書き換え
    Game_Party.prototype.armors = function() {
        var list = [];
        this._armors.forEach( function(item){
            list.push($dataArmors[item.id]);
        });
        return list;
    };

    Game_Party.prototype.equipItemBoxs = function() {
        return this._weapons.concat(this._armors);
    };

    Game_Party.prototype.allItemBoxs = function() {
        return this._items.concat(this.equipItemBoxs());
    };

    //------------------------------------------------------------------------
    //アイテムの所持数の処理の修正
    //------------------------------------------------------------------------
    //書き換え
    Game_Party.prototype.numItems = function(item) {
        var list = this.dupItems(item);
        if (list) {
            return list.reduce( function(prev, current, i, arr) {
                return prev + current.number;
            }, 0);
        }
        return 0;
    };

    Game_Party.prototype.dupItems = function(item) {
        var cont = [];
        var container = this.itemContainer(item);
        if (container) {
            cont = container.filter( function(box) {
                return box.id === item.id;
            });
        }
        return cont;
    };

    Game_Party.prototype.numItem = function(item, index) {
        var container = this.itemContainer(item);
        return container && container[index] ? container[index].number : 0;
    };

    //書き換え
    Game_Party.prototype.maxItems = function(item) {
        var stack = Number(readObjectMeta(item, ['IBC_スタック', 'IBC_STACK'])) || FTKR.IBC.stack.max;
        return stack || 1;
    };

    //書き換え
    Game_Party.prototype.hasMaxItems = function(item) {
        return FTKR.IBC.stack.dup ? false : this.numItems(item) >= this.maxItems(item);
    };

    Game_Party.prototype.isEmptyStack = function(item) {
        if (!this.hasItem(item)) return false;
        var diff = this.maxItems(item) * this.dupItems(item).length - this.numItems(item);
        if (!FTKR.IBC.stack.dup) return diff;
        var rem = this.numItems(item) % this.maxItems(item);
        return diff ? this.maxItems(item) - rem : 0;
    };

    Game_Party.prototype.itemsCapacityPlus = function() {
        return this._itemsCapacityPlus || 0;
    };

    Game_Party.prototype.maxItemsCapacity = function() {
        return FTKR.IBC.capacity.item + this.itemsCapacityPlus();
    };

    Game_Party.prototype.isItemsCapacity = function() {
        return this.maxItemsCapacity() - this._items.length;
    };

    Game_Party.prototype.setItemsCapacityPlus = function(value) {
        this._itemsCapacityPlus = value;
    };

    Game_Party.prototype.weaponsCapacityPlus = function() {
        return this._weaponsCapacityPlus || 0;
    };

    Game_Party.prototype.maxWeaponsCapacity = function() {
        return FTKR.IBC.capacity.weapon + this.weaponsCapacityPlus();
    };

    Game_Party.prototype.isWeaponsCapacity = function() {
        return this.maxWeaponsCapacity() - this._weapons.length;
    };

    Game_Party.prototype.setWeaponsCapacityPlus = function(value) {
        this._weaponsCapacityPlus = value;
    };
    Game_Party.prototype.armorsCapacityPlus = function() {
        return this._armorsCapacityPlus || 0;
    };

    Game_Party.prototype.maxArmorsCapacity = function() {
        return FTKR.IBC.capacity.armor + this.armorsCapacityPlus();
    };

    Game_Party.prototype.isArmorsCapacityOk = function() {
        return this.maxArmorsCapacity() - this._armors.length;
    };

    Game_Party.prototype.setArmorsCapacityPlus = function(value) {
        this._armorsCapacityPlus = value;
    };
    Game_Party.prototype.isItemCapacityOk = function(item) {
        return this.isItemCapacity(item) > 0;
    };

    Game_Party.prototype.isItemCapacity = function(item) {
        var cap = FTKR.IBC.capacity;
        if (!item) {
            return false;
        } else if (DataManager.isItem(item)) {
            return !cap.item ? Infinity : Math.max(this.isItemsCapacity(), 0);
        } else if (DataManager.isWeapon(item)) {
            return !cap.weapon ? Infinity : Math.max(this.isWeaponsCapacity(), 0);
        } else if (DataManager.isArmor(item)) {
            return !cap.armor ? Infinity : Math.max(this.isArmorsCapacity(), 0);
        } else {
            return false;
        }
    };

    Game_Party.prototype.emptyNumber = function(item) {
        return this.isEmptyStack(item) + this.isItemCapacity(item) * this.maxItems(item);
    };

    //------------------------------------------------------------------------
    //アイテムの入手処理の修正
    //------------------------------------------------------------------------
    //書き換え
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        if (this.hasItem(item) || this.isItemCapacityOk(item)) {
            var container = this.itemContainer(item);
            if (container) {
                var lastNumber = this.numItems(item);
                var newNumber = lastNumber + amount;
                if (this.hasItem(item)) {
                    var number = newNumber;
                    container.forEach( function(box) {
                        if (box.id === item.id) {
                            box.number = number.clamp(0, this.maxItems(item));
                            number -= this.maxItems(item);
                        }
                    },this);
                    if (number && FTKR.IBC.stack.dup) {
                        this.addItemBoxs(item, number);
                    }
                } else {
                    this.addItemBoxs(item, amount);
                }
                for (var i = 0; i < container.length; i++) {
                    var box = container[i];
                    if (box && box.id === item.id && box.number === 0) {
                        container.splice(i, 1);
                        i -= 1;
                    }
                }
                if (includeEquip && newNumber < 0) {
                    this.discardMembersEquip(item, -newNumber);
                }
                $gameMap.requestRefresh();
            }
        }
    };

    Game_Party.prototype.addItemBoxs = function(item, number) {
        var container = this.itemContainer(item);
        var addNum = FTKR.IBC.stack.dup ? number : 1;
        for (var i = 0; i < addNum / this.maxItems(item); i++) {
            if (!this.isItemCapacityOk(item)) return;
            var newItem = {
                id    :item.id,
                number:number.clamp(0, this.maxItems(item)),
            };
            container.push(newItem);
            number -= this.maxItems(item);
        }
    };

    //=============================================================================
    //アイテムボックスで表示する所持数の修正
    //=============================================================================

    var _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) {
        this._listIndex = index;
        _Window_ItemList_drawItem.call(this, index);
    };

    //書き換え
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            var tw = this.textWidth('0') * this.itemNumberDigit();
            this.drawText(':', x, y, width - tw, 'right');
            this.drawText(this.itemNumber(item), x, y, width, 'right');
        }
    };

    Window_ItemList.prototype.itemNumberDigit = function() {
        return FTKR.IBC.disp.digit;
    };

    Window_ItemList.prototype.itemNumber = function(item) {
        return this._boxData[this._listIndex].number;
    };

    var _Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function() {
        _Window_ItemList_makeItemList.call(this);
        this._boxData = $gameParty.allItemBoxs().filter(function(box, i) {
            return this.includes($gameParty.allItems()[i]);
        }, this);
        if (this.includes(null)) {
            this._boxData.push(null);
        }
    };

    //=============================================================================
    //アイテム売買の処理の修正
    //=============================================================================
    //容量以上に購入させない
    var _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
    Window_ShopBuy.prototype.isEnabled = function(item) {
        return _Window_ShopBuy_isEnabled.call(this, item) &&
            ($gameParty.isEmptyStack(item) || $gameParty.isItemCapacityOk(item));
    };

    //書き換え
    Scene_Shop.prototype.maxBuy = function() {
        var max = $gameParty.hasItem(this._item) ? 
            Math.min(FTKR.IBC.buy.max, $gameParty.emptyNumber(this._item)) :
            Math.min(FTKR.IBC.buy.max, $gameParty.maxItems(this._item));
        var price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

}());//EOF