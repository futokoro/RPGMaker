//=============================================================================
// アイテムボックスの仕様を変更するプラグイン
// FTKR_ExItemBox.js
// 作成者     : フトコロ
// 作成日     : 2017/06/04
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

/*:
 * @plugindesc v1.0.0 アイテムボックスの仕様を変更する
 * @author フトコロ
 *
 * @param --機能の有効無効設定--
 * @default
 * 
 * @param Enable Category
 * @desc カテゴリー設定機能を有効にするか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Enable Capacity
 * @desc 所持容量およびスタック設定機能を有効にするか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Enable SubCommand
 * @desc サブコマンド機能を有効にするか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param --表示設定--
 * @default
 * 
 * @param Number of Columns
 * @desc アイテムを横に並べる数
 * @default 2
 * 
 * @param Horizontal Space
 * @desc アイテムを横に並べた時の表示間隔
 * @default 48
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * 
 * @param Display Item Icon
 * @desc アイテムアイコンを表示するか
 * 1 - 表示する, 0 - 表示しない
 * @default 1
 * 
 * @param Icon Scale
 * @desc アイコンの表示サイズ(%)を設定する
 * 100%以上に設定すると行の高さも変わります
 * @default 100
 * 
 * @param Display Item Name
 * @desc アイテム名を表示するか
 * 1 - 表示する, 0 - 表示しない
 * @default 1
 * 
 * @param Font Size
 * @desc フォントサイズを設定する
 * サイズによって行の高さも変わります
 * @default 28
 * 
 * @param Display Separator
 * @desc アイテム名と所持数の区切り記号を指定する
 * @default :
 * 
 * @param Display Item Number
 * @desc アイテム所持数を表示するか
 * 0 - 表示しない, 1 - 表示する, 2 - 所持数が1の時表示しない
 * @default 1
 * 
 * @param Display Number of Digit
 * @desc アイテム所持数の表示桁数を設定する
 * 所持数が表示桁数を超えると横に圧縮して表示する
 * @default 2
 * 
 * @param Display Text Position Y
 * @desc アイテム名と所持数の表示高さを設定
 * 0 - 上揃え, 1 - 中央, 2 - 下揃え
 * @default 1
 * 
 * @param --カテゴリー設定--
 * @default
 * 
 * @param Items Category
 * @desc アイテムボックスで表示するカテゴリー
 * カンマ(,)で分けること
 * @default item, weapon, armor, keyItem
 * 
 * @param Category All Name
 * @desc カテゴリー'all'の表示名
 * @default すべて
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
 * @param --サブコマンド--
 * @default
 *
 * @param Command Use Format
 * @desc 実行コマンドの「使う」のコマンド名を設定します。
 * @default 使う
 *
 * @param Command Discard Format
 * @desc 実行コマンドの「捨てる」のコマンド名を設定します。
 * @default 捨てる
 *
 * @param Command Cancel Format
 * @desc 実行コマンドの「やめる」のコマンド名を設定します。
 * @default やめる
 *
 * @param --確認画面--
 * @default
 *
 * @param Enable Confirmation
 * @desc アイテム廃棄実行時に確認画面を表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 *
 * @param Conf Title Format
 * @desc アイテム廃棄実行時の確認内容を設定します。
 * %1 - アイテム名, %2 - 捨てる数
 * @default [%1]を[%2]個 捨てますか？
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」のコマンド名を設定します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」のコマンド名を設定します。
 * @default 実行しない
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムボックスの仕様を変更します。
 * 
 * １．アイテムボックス内の表示レイアウトを変更できます。
 * ２．アイテムカテゴリー(アイテム、武器、防具、大事なもの)を変更できます。
 * ３．アイテムボックスに所持容量を設定できます。
 * ４．アイテムの最大スタック数を超えた場合、別にスタックすることができます。
 * ５．アイテム選択後にサブコマンドを表示して、アイテムを捨てることができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. アイテムボックスの所持容量の設定とスタックの変更機能を使う場合は、
 *    既存のセーブデータは使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 表示レイアウトの変更
 *-----------------------------------------------------------------------------
 * アイテムボックスの表示レイアウトを変更できます。
 * プラグインパラメータ--表示設定--で設定できます。
 * 変更できる内容は以下の通りです。
 * 
 * 1. アイテムボックスの表示列数と列同士の間隔
 * 2. アイコンの表示有無とアイコンサイズ
 * 3. アイテム名の表示有無とフォントサイズ
 * 4. アイテム名と所持数の区切り記号
 * 5. 所持数の表示有無と表示桁数
 * 6. 行に対するアイテム名と所持数の表示高さ
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムカテゴリーの変更
 *-----------------------------------------------------------------------------
 * アイテム画面や、ショップ画面のアイテムカテゴリーの表示を変更します。
 * この機能を使うためには、プラグインパラメータ<Enable Category>を
 * 有効にしてください。
 * 
 * 1. アイテムカテゴリーの表示を変える
 * プラグインパラメータ<Items Category>に設定した内容によって
 * アイテムカテゴリーの表示を変えることができます。
 * 
 * 入力内容は以下。
 *   item      - 「アイテム」を表示
 *   weapon    - 「武器」を表示
 *   armor     - 「防具」を表示
 *   keyItem   - 「大事なもの」を表示
 *   all       - プラグインパラメータ<Category All Name>で設定した表示名を表示
 *               アイテムボックスにはアイテム・武器・防具・大事なものをすべて表示
 *   任意の文字 - 入力した任意の文字を表示
 *               この文字列を新たなカテゴリー名(*1)として設定します
 * 
 * カンマ(,)を使って複数設定できます。
 * 入力した順番にアイテムカテゴリーを表示します。
 * 
 * (*1)カテゴリーの追加
 * アイテムや武器・防具のメモ欄に以下のタグを記入することで
 * 追加したカテゴリーをアイテム・武器・防具に設定することができます。
 * 
 * <EIB_カテゴリー: カテゴリー名>
 * <EIB_CATEGORY: category_name>
 * 
 * 
 * 2．アイテムカテゴリーの選択を無くす
 * プラグインパラメータ<Enable Category>を無効にすると、アイテムカテゴリーの
 * 選択をなくして、直接アイテムボックスを選択できます。
 * 
 * この時アイテムボックスに表示されるアイテムのカテゴリーは
 * プラグインパラメータ<Items Category>の１番目に設定したカテゴリーです。
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
 * 2. プラグインコマンドで[追加分]を設定
 *    この追加分は、プラグインパラメータの値とは別に計算します。
 * 
 *    EIB_所持容量設定 [カテゴリー] [数値] [計算方法]
 *    EIB_SET_CAPACITY [category] [value] [calc_method]
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
 *    EIB_所持容量設定 アイテム 10 加算
 *    EIB_所持容量設定 防具 \V[1] 代入
 *    EIB_SET_CAPACITY WEAPON 5 SUBTRACT
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
 *    <EIB_スタック: x>
 *    <EIB_STACK: x>
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
 * サブコマンドについて
 *-----------------------------------------------------------------------------
 * 当プラグインによりメニューのアイテム画面で、アイテム選択後に
 * サブコマンドを追加します。
 * この機能を使うためには、プラグインパラメータ<Enable Subcommand>を
 * 有効にしてください。
 * 
 * 
 * サブコマンドには以下のコマンドがあります。
 * 1. 使う　 - アイテムを使用します。使用できない場合はグレー表示になります。
 * 2. 捨てる - アイテムを捨てます。「大事なもの」は捨てることが出来ません。
 * 3. やめる - サブコマンドを閉じます。
 * 
 * 
 * 「捨てる」を実行すると、捨てるアイテムの数を設定します。
 * 数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
 * アイテムを捨てることができます。
 * 
 * 確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
 * することができます。
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
 * v1.0.0 - 2017/06/04 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIB = true;

var FTKR = FTKR || {};
FTKR.EIB = FTKR.EIB || {};

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExItemBox');

    FTKR.EIB = {
        enable:{
            category  :Number(parameters['Enable Category'] || 0),
            capacity  :Number(parameters['Enable Capacity'] || 0),
            subcommand:Number(parameters['Enable SubCommand'] || 0),
        },
        disp:{
            maxCols   :Number(parameters['Number of Columns'] || 0),
            spacing   :Number(parameters['Horizontal Space'] || 0),
            lineHeight:Number(parameters['Window Line Height'] || 0),
            iconScale :Number(parameters['Icon Scale'] || 0),
            itemIcon  :Number(parameters['Display Item Icon'] || 0),
            itemName  :Number(parameters['Display Item Name'] || 0),
            fontsize  :Number(parameters['Font Size'] || 0),
            number    :Number(parameters['Display Item Number'] || 0),
            digit     :Number(parameters['Display Number of Digit'] || 0),
            separator :String(parameters['Display Separator'] || ''),
            positionY :Number(parameters['Display Text Position Y'] || 0),
            category  :Number(parameters['Enable Category'] || 0),
        },
        party:{
            category  :String(parameters['Items Category'] || ''),
        },
        category:{
            all       :String(parameters['Category All Name'] || ''),
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
        subcom:{
            enableConf:Number(parameters['Enable Confirmation'] || 0),
            command:{
                use     :String(parameters['Command Use Format'] || ''),
                discard :String(parameters['Command Discard Format'] || ''),
                cancel  :String(parameters['Command Cancel Format'] || ''),
            },
            conf:{
                title       :String(parameters['Conf Title Format'] || ''),
                okFormat    :String(parameters['Confirmation Ok Format'] || ''),
                cancelFormat:String(parameters['Confirmation Cancel Format'] || ''),
            },
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

    var _EIB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _EIB_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/EIB_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '所持容量設定':
            case 'SET_CAPACITY':
                if (FTKR.EIB.enable.capacity) this.setItemBoxCapacity(args);
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
// アイテムボックスの表示レイアウトの修正
//=============================================================================

    //書き換え
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber() && this.showNumber(item)) {
            var tw = this.textWidth('0') * this.itemNumberDigit();
            this.drawTextCustom(this.itemNumberSeparator(), x, y, width - tw, 'right');
            this.drawTextCustom(this.itemNumber(item), x, y, width, 'right');
        }
    };

    Window_ItemList.prototype.showNumber = function(item) {
        return FTKR.EIB.disp.number === 1 || 
            FTKR.EIB.disp.number === 2 && $gameParty.numItems(item) !== 1;
    };

    Window_ItemList.prototype.itemNumberDigit = function() {
        return FTKR.EIB.disp.digit;
    };

    Window_ItemList.prototype.itemNumberSeparator = function() {
        return FTKR.EIB.disp.separator;
    };

    Window_ItemList.prototype.itemNumber = function(item) {
        return FTKR.EIB.enable.capacity ? this._boxData[this._listIndex].number : $gameParty.numItems(item);
    };

    Window_ItemList.prototype.drawTextCustom = function(text, x, y, maxWidth, align) {
        var height = this.standardFontSize() + 8;
        y += FTKR.EIB.disp.positionY * (this.lineHeight() - height) / 2;
        this.contents.drawText(text, x, y, maxWidth, height, align);
    };

    //書き換え
    Window_ItemList.prototype.maxCols = function() {
        return FTKR.EIB.disp.maxCols;
    };

    //書き換え
    Window_ItemList.prototype.spacing = function() {
        return FTKR.EIB.disp.spacing;
    };

    //書き換え
    Window_ItemList.prototype.standardFontSize = function() {
        return FTKR.EIB.disp.fontsize;
    };

    //書き換え
    Window_ItemList.prototype.lineHeight = function() {
        var scale = FTKR.EIB.disp.iconScale / 100;
        return Math.max(FTKR.EIB.disp.lineHeight,
            Window_Base._iconHeight * scale + 4, FTKR.EIB.disp.fontsize + 8);
    };

    //書き換え
    Window_ItemList.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            var scale = FTKR.EIB.disp.iconScale / 100;
            var iconBoxWidth = Window_Base._iconWidth * scale + 4;
            var diff = Math.max((this.lineHeight() - iconBoxWidth) / 2, 0);
            this.resetTextColor();
            if (FTKR.EIB.disp.itemIcon) {
                this.drawIconCustom(item.iconIndex, x + 2, y + 2 + diff, scale);
            } else {
                iconBoxWidth = 0;
            }
            if (FTKR.EIB.disp.itemName) this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_ItemList.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    };

//=============================================================================
// アイテムボックスのカテゴリーを変更する
//=============================================================================
if (FTKR.EIB.enable.category) {

    //=============================================================================
    // DataManager
    // アイテムに詳細カテゴリーを設定する
    //=============================================================================

    var _EIB_DatabaseLoaded = false;
    var _EIB_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_EIB_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_EIB_DatabaseLoaded) {
            this.itemCategoryNotetags($dataItems);
            this.itemCategoryNotetags($dataWeapons);
            this.itemCategoryNotetags($dataArmors);
            _EIB_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.itemCategoryNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.category = readObjectMeta(obj, ['EIB_カテゴリー', 'EIB_CATEGORY']);
        }
    };

    TextManager.convertItemCategory = function(category) {
        switch (category) {
            case TextManager.item:
                return 'item';
            case TextManager.weapon:
                return 'weapon';
            case TextManager.armor:
                return 'armor';
            case TextManager.keyItem:
                return 'keyItem';
            case FTKR.EIB.category.all:
                return 'all';
            default:
                return category;
        }
    };

    //=============================================================================
    //Window_Item
    // アイテムボックスのカテゴリーを変更する
    //=============================================================================

    //書き換え
    Window_ItemCategory.prototype.makeCommandList = function() {
        var lists = FTKR.EIB.party.category.replace(/\s/g,'').split(',');
        for (var i = 0; i < lists.length; i++) {
            var command = TextManager[lists[i]] || FTKR.EIB.category[lists[i]] || lists[i];
            this.addCommand(command, lists[i]);
        }
    };

    //書き換え
    Window_ItemList.prototype.includes = function(item) {
        var lists = FTKR.EIB.party.category.replace(/\s/g,'').split(',');
        var category = FTKR.EIB.disp.category ? this._category : lists[0];
        switch (TextManager.convertItemCategory(category)) {
        case 'item':
            return DataManager.isItem(item) && item.itypeId === 1;
        case 'weapon':
            return DataManager.isWeapon(item);
        case 'armor':
            return DataManager.isArmor(item);
        case 'keyItem':
            return DataManager.isItem(item) && item.itypeId === 2;
        case 'all':
            return this.isAllItems(item);
        default:
            return item ? item.category === category : false;
        }
    };

    Window_ItemList.prototype.isAllItems = function(item) {
        return DataManager.isItem(item) ||
            DataManager.isWeapon(item) || DataManager.isArmor(item);
    }

    var _Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
    Scene_Item.prototype.createCategoryWindow = function() {
        _Scene_Item_createCategoryWindow.call(this);
        if (!FTKR.EIB.disp.category) {
            this._categoryWindow.hide();
            this._categoryWindow.deselect();
            this._categoryWindow.deactivate();
        }
    };


    var _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.call(this);
        if (!FTKR.EIB.disp.category) {
            this._itemWindow.y = this._helpWindow.height;
            this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y;
            this._itemWindow.activate();
            this._itemWindow.selectLast();
        }
    };

    var _Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
    Scene_Item.prototype.onItemCancel = function() {
        if (!FTKR.EIB.disp.category) {
            this._itemWindow.deselect();
            this.popScene();
        } else {
            _Scene_Item_onItemCancel.call(this);
        }
    };

    //=============================================================================
    //アイテム売却画面のカテゴリーの修正
    //=============================================================================
    var _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
    Scene_Shop.prototype.createSellWindow = function() {
        _Scene_Shop_createSellWindow.call(this);
        if (!FTKR.EIB.disp.category) {
            this._sellWindow.y = this._dummyWindow.y;
            this._sellWindow.height = Graphics.boxHeight - this._sellWindow.y;
        }
    };

    var _Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
    Scene_Shop.prototype.activateSellWindow = function() {
        if (!FTKR.EIB.disp.category) {
            this._sellWindow.refresh();
            this._sellWindow.show();
            this._sellWindow.activate();
            this._statusWindow.hide();
        } else {
            _Scene_Shop_activateSellWindow.call(this);
        }
    };

    var _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
    Scene_Shop.prototype.commandSell = function() {
        if (!FTKR.EIB.disp.category) {
            this._dummyWindow.hide();
            this._sellWindow.show();
            this._sellWindow.activate();
            this._sellWindow.select(0);
            this._sellWindow.refresh();
        } else {
            _Scene_Shop_commandSell.call(this);
        }
    };

    var _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
    Scene_Shop.prototype.onSellCancel = function() {
        if (!FTKR.EIB.disp.category) {
            this._sellWindow.deselect();
            this._statusWindow.setItem(null);
            this._helpWindow.clear();
            this._commandWindow.activate();
            this._dummyWindow.show();
            this._sellWindow.hide();
        } else {
            _Scene_Shop_onSellCancel.call(this);
        }
    };

}//カテゴリー

//=============================================================================
// アイテムボックスの所持容量とスタック設定を変更する
//=============================================================================
if (FTKR.EIB.enable.capacity) {

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
        var stack = Number(readObjectMeta(item, ['EIB_スタック', 'EIB_STACK'])) || FTKR.EIB.stack.max;
        return stack || 1;
    };

    //書き換え
    Game_Party.prototype.hasMaxItems = function(item) {
        return FTKR.EIB.stack.dup ? false : this.numItems(item) >= this.maxItems(item);
    };

    Game_Party.prototype.isEmptyStack = function(item) {
        if (!this.hasItem(item)) return false;
        var diff = this.maxItems(item) * this.dupItems(item).length - this.numItems(item);
        if (!FTKR.EIB.stack.dup) return diff;
        var rem = this.numItems(item) % this.maxItems(item);
        return diff ? this.maxItems(item) - rem : 0;
    };

    Game_Party.prototype.itemsCapacityPlus = function() {
        return this._itemsCapacityPlus || 0;
    };

    Game_Party.prototype.maxItemsCapacity = function() {
        return FTKR.EIB.capacity.item + this.itemsCapacityPlus();
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
        return FTKR.EIB.capacity.weapon + this.weaponsCapacityPlus();
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
        return FTKR.EIB.capacity.armor + this.armorsCapacityPlus();
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
        var cap = FTKR.EIB.capacity;
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
                    if (number && FTKR.EIB.stack.dup) {
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
        var addNum = FTKR.EIB.stack.dup ? number : 1;
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
            Math.min(FTKR.EIB.buy.max, $gameParty.emptyNumber(this._item)) :
            Math.min(FTKR.EIB.buy.max, $gameParty.maxItems(this._item));
        var price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

}//所持容量

//=============================================================================
// サブコマンドの追加
//=============================================================================
if (FTKR.EIB.enable.subcommand) {

    //=============================================================================
    // アイテム画面の変更
    //=============================================================================

    Window_Selectable.prototype.actSelect = function(index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    var _EIB_Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _EIB_Scene_Item_create.call(this);
        this.createSubCommandWindow();
        this.createNumberWindow();
        if (FTKR.EIB.subcom.enableConf) {
            this.createConfTitleWindow();
            this.createConfWindow();
        }
    };

    //------------------------------------------------------------------------
    //サブコマンドの追加
    //------------------------------------------------------------------------
    //書き換え
    Window_ItemList.prototype.isEnabled = function(item) {
        return true;
    };
    
    Scene_Item.prototype.createSubCommandWindow = function() {
        var wy = this._itemWindow.y;
        var ww = 240;
        var wh = Graphics.boxHeight - wy;
        this._subCommandWindow = new Window_ItemSubCommand(0, wy, ww, wh);
        var window = this._subCommandWindow;
        window.setHandler('ok', this.onSubComOk.bind(this));
        window.setHandler('cancel', this.onSubComCancel.bind(this));
        window.hide();
        this.addWindow(window);
    };

    var _EIB_Scene_Item_onitemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function() {
        this._subCommandWindow._item = this._itemWindow.item();
        this._subCommandWindow.show();
        this._subCommandWindow.actSelect(0);
    };

    Scene_Item.prototype.onSubComOk = function() {
        switch (this._subCommandWindow.item().symbol) {
            case 'use':
                this._subCommandWindow.hide();
                _EIB_Scene_Item_onitemOk.call(this);
                break;
            case 'discard':
                var item = this._subCommandWindow._item;
                this._numberWindow.setup(item, $gameParty.numItems(item));
                this._numberWindow.show();
                this._numberWindow.activate();
                break;
            default:
                this.onSubComCancel();
                break;
        }
    };

    Scene_Item.prototype.onSubComCancel = function() {
        this._subCommandWindow.hide();
        this._subCommandWindow.deselect();
        this._numberWindow.hide();
        this._itemWindow.actSelect(this._itemWindow.index());
    };

    //------------------------------------------------------------------------
    //アイテムを捨てる処理の追加
    //------------------------------------------------------------------------
    Scene_Item.prototype.createNumberWindow = function() {
        var wy = this._itemWindow.y;
        var wx = this._subCommandWindow.width;
        var wh = Graphics.boxHeight - wy;
        this._numberWindow = new Window_ItemNumber(wx, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_Item.prototype.onNumberOk = function() {
        if (FTKR.EIB.subcom.enableConf) {
            this._confTitleWindow.setItem(this._subCommandWindow._item, this._numberWindow.number());
            this._confTitleWindow.show();
            this._confWindow.show();
            this._confWindow.actSelect(0);
        } else {
            this.itemDiscard();
        }
    };

    Scene_Item.prototype.onNumberCancel = function() {
        this._numberWindow.hide();
        this._subCommandWindow.actSelect(this._subCommandWindow.index());
    };

    Scene_Item.prototype.itemDiscard = function() {
        SoundManager.playOk();
        $gameParty.gainItem(this._subCommandWindow._item, -this._numberWindow.number());
        this.onSubComCancel();
    };

    //------------------------------------------------------------------------
    //確認画面の追加
    //------------------------------------------------------------------------
    Scene_Item.prototype.createConfTitleWindow = function() {
        var wx = Graphics.boxWidth / 4;
        var wh = this._helpWindow.fittingHeight(1);
        var ww = Graphics.boxWidth / 2;
        var wy = Graphics.boxHeight / 2 - wh;
        this._confTitleWindow = new Window_ItemConfTitle(wx, wy, ww, wh);
        this._confTitleWindow.hide();
        this.addWindow(this._confTitleWindow);
    };

    Scene_Item.prototype.createConfWindow = function() {
        var ctw = this._confTitleWindow;
        var wx = ctw.x;
        var wy = ctw.y + ctw.height;
        var ww = ctw.width;
        var wh = this._helpWindow.fittingHeight(1);
        this._confWindow = new Window_ItemConf(wx, wy, ww, wh);
        this._confWindow.setHandler('ok', this.onConfirmationOk.bind(this));
        this._confWindow.setHandler('cancel', this.onConfirmationCancel.bind(this));
        this._confWindow.hide();
        this._confTitleWindow.setWindow(this._confWindow);
        this.addWindow(this._confWindow);
    };

    Scene_Item.prototype.onConfirmationOk = function() {
        if (this._confWindow.item().dicision) {
            this._confTitleWindow.hide();
            this._confWindow.hide();
            this._confWindow.deselect();
            this.itemDiscard();
        } else {
            this.onConfirmationCancel();
        }
    };

    Scene_Item.prototype.onConfirmationCancel = function() {
        this._confTitleWindow.hide();
        this._confWindow.hide();
        this._confWindow.deselect();
        this.onSubComCancel();
    };

    //=============================================================================
    // Window_ItemNumber
    //=============================================================================

    function Window_ItemNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_ItemNumber.prototype.constructor = Window_ItemNumber;

    Window_ItemNumber.prototype.refresh = function() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        var width = this.width - this.standardPadding() * 2;
        this.drawText('/MAX ' + this._max, 0, this.itemY() + this.lineHeight(), width, 'right');
    };

    //=============================================================================
    // Window_ItemConfTitle
    //=============================================================================

    function Window_ItemConfTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_ItemConfTitle.prototype.constructor = Window_ItemConfTitle;

    Window_ItemConfTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._number = 0;
        this._confWindow = null;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTitle();
    };

    Window_ItemConfTitle.prototype.drawTitle = function() {
        if (this._item) {
            var text = FTKR.EIB.subcom.conf.title.format(this._item.name, this._number);
            var width = this.drawTextEx(text, 0, 0);
            this.resizeWindow(width);
            this._confWindow.resizeWindow(width);
            this.drawTextEx(text, 0, 0);
        }
    };

    Window_ItemConfTitle.prototype.resizeWindow = function(width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
    };

    Window_ItemConfTitle.prototype.setItem = function(item, number) {
        this._item = item;
        this._number = number;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.setWindow = function(window) {
        this._confWindow = window;
    };

    //=============================================================================
    // Window_ItemConf
    // 確認用コマンドを表示・処理するウィンドウ
    //=============================================================================

    function Window_ItemConf() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConf.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemConf.prototype.constructor = Window_ItemConf;

    Window_ItemConf.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._dicision = false;
    };

    Window_ItemConf.prototype.maxCols = function() {
        return 2;
    };

    Window_ItemConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_ItemConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_ItemConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.EIB.subcom.conf.okFormat},
            {dicision:false, disp:FTKR.EIB.subcom.conf.cancelFormat}
        ];
    };

    Window_ItemConf.prototype.isEnabled = function(index) {
        return true;
    };

    Window_ItemConf.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_ItemConf.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
        this.changePaintOpacity(1);
    };

    Window_ItemConf.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemConf.prototype.resizeWindow = function(width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
        this.refresh();
    };

}//さぶコマンド

}());//FTKR_ExItemBox.js END

//=============================================================================
// Window_ItemSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

Window_ItemSubCommand.prototype = Object.create(Window_Selectable.prototype);
Window_ItemSubCommand.prototype.constructor = Window_ItemSubCommand;

Window_ItemSubCommand.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this._enabled = false;
    this._item = null;
    this._symbol = '';
};

Window_ItemSubCommand.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ItemSubCommand.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ItemSubCommand.prototype.makeItemList = function() {
    this._data = [];
    if (!this._item) return;
    var sep = FTKR.EIB.subcom.command;
    this._data = [
        {symbol:'use',     enabled:$gameParty.canUse(this._item), disp:sep.use},
        {symbol:'discard', enabled:this._item.itypeId !== 2, disp:sep.discard},
        {symbol:'cancel',  enabled:true, disp:sep.cancel},
    ];
};

Window_ItemSubCommand.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};

Window_ItemSubCommand.prototype.isEnabled = function(index) {
    return this._data[index].enabled;
};

Window_ItemSubCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.changePaintOpacity(this.isEnabled(index));
    this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
    this.changePaintOpacity(1);
};

Window_ItemSubCommand.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ItemSubCommand.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

//EOF