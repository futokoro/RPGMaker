//=============================================================================
// アイテムボックスにサブコマンドを追加するプラグイン
// FTKR_ItemSubCommand.js
// 作成者     : フトコロ
// プラグインNo : 43
// 作成日     : 2017/06/04
// 最終更新日 : 2018/08/30
// バージョン : v1.6.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISC = true;

var FTKR = FTKR || {};
FTKR.ISC = FTKR.ISC || {};

/*:
 * @plugindesc v1.6.0 アイテムボックスにサブコマンドを追加する
 * @author フトコロ
 *
 * @param --アイテム情報取得--
 * @default
 *
 * @param Use Item Id
 * @desc 選択したアイテムのIDを指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param --サブコマンド--
 * @default
 *
 * @param Command List
 * @desc 実行コマンドの表示する対象と順番を設定します。
 * @default use,discard,cancel
 *
 * @param Command Use Format
 * @desc 実行コマンドの「使う」のコマンド名を設定します。
 * @default 使う
 *
 * @param Command Equip Format
 * @desc 実行コマンドの「装備する」のコマンド名を設定します。
 * @default 装備する
 *
 * @param Command Discard Format
 * @desc 実行コマンドの「捨てる」のコマンド名を設定します。
 * @default 捨てる
 *
 * @param Command Cancel Format
 * @desc 実行コマンドの「やめる」のコマンド名を設定します。
 * @default やめる
 * 
 * @param Command Position X
 * @desc コマンドウィンドウの左上のX座標を指定します。
 * (デフォルト 0)(-1 で、画面右寄せ)
 * @default 0
 *
 * @param Command Position Y
 * @desc コマンドウィンドウの左上のY座標を指定します。
 * (デフォルト 180)(-1 で、画面下寄せ)
 * @default 180
 *
 * @param Command Width
 * @desc コマンドウィンドウの幅を指定します。
 * (デフォルト 240)(参考値：余白 = 18)(-1 で、画面右端まで)
 * @default 240
 *
 * @param Command Height
 * @desc コマンドウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18)(-1 :画面下端まで、0 :自動調整)
 * @default -1
 * 
 * @param --数値入力画面--
 * @default
 * 
 * @param Max Number Format
 * @desc 数値入力ウィンドウで最大数を示す表示内容を設定します。
 * %1 - 手持ちのアイテム数
 * @default /MAX %1
 * 
 * @param Number Position X
 * @desc 数値入力ウィンドウの左上のX座標を指定します。
 * (デフォルト 0)(-1 で、画面右寄せ)
 * @default 240
 *
 * @param Number Position Y
 * @desc 数値入力ウィンドウの左上のY座標を指定します。
 * (デフォルト 180)(-1 で、画面下寄せ)
 * @default 180
 *
 * @param Number Width
 * @desc 数値入力ウィンドウの幅を指定します。
 * (デフォルト 456)(参考値：余白 = 18)(-1 で、画面右端まで)
 * @default 456
 *
 * @param Number Height
 * @desc 数値入力ウィンドウの高さを指定します。
 * (参考値：1行 = 36、余白 = 18)(-1 で、画面下端まで)
 * @default -1
 * 
 * @param --アクター選択画面--
 * @default
 * 
 * @param Disable Select Single Actor
 * @desc アクターが１人の時にアクター選択画面を表示しない。
 * @default 0
 * @type select
 * @option 表示する
 * @value 0
 * @option 表示しない
 * @value 1
 *
 * @param --確認画面--
 * @default
 *
 * @param Enable Confirmation
 * @desc アイテム廃棄実行時に確認画面を表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 1
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
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
 * @param --サウンド--
 * @default
 *
 * @param Disposal SE Name
 * @desc アイテムを捨てる時のSEを設定します。
 * @default Decision1
 * @type file
 * @require 1
 * @dir audio/se
 * 
 * @param Disposal SE Pitch
 * @desc アイテムを捨てる時のSEのピッチを設定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 * 
 * @param Disposal SE Volume
 * @desc アイテムを捨てる時のSEの音量を設定します。
 * @default 90
 * @min 0
 * @max 100
 * @type number
 * 
 * @param --カスタムコマンド0--
 * @default
 *
 * @param Custom0 Format
 * @desc 実行コマンドの「カスタムコマンド0」のコマンド名を設定します。
 * @default 
 *
 * @param Custom0 EventID
 * @desc カスタムコマンド0で実行するコモンイベントのIDを設定します。
 * @default 
 * @type number
 *
 * @param Custom0 Show Condition
 * @desc カスタムコマンド0を表示する条件を設定します。
 * @default 
 *
 * @param Custom0 Enabled Condition
 * @desc カスタムコマンド0を実行する条件を設定します。
 * @default 
 *
 * @param --カスタムコマンド1--
 * @default
 *
 * @param Custom1 Format
 * @desc 実行コマンドの「カスタムコマンド1」のコマンド名を設定します。
 * @default 
 *
 * @param Custom1 EventID
 * @desc カスタムコマンド1で実行するコモンイベントのIDを設定します。
 * @default 
 * @type number
 *
 * @param Custom1 Show Condition
 * @desc カスタムコマンド1を表示する条件を設定します。
 * @default 
 *
 * @param Custom1 Enabled Condition
 * @desc カスタムコマンド1を実行する条件を設定します。
 * @default 
 *
 * @param --カスタムコマンド2--
 * @default
 *
 * @param Custom2 Format
 * @desc 実行コマンドの「カスタムコマンド2」のコマンド名を設定します。
 * @default 
 *
 * @param Custom2 EventID
 * @desc カスタムコマンド2で実行するコモンイベントのIDを設定します。
 * @default 
 * @type number
 *
 * @param Custom2 Show Condition
 * @desc カスタムコマンド2を表示する条件を設定します。
 * @default 
 *
 * @param Custom2 Enabled Condition
 * @desc カスタムコマンド2を実行する条件を設定します。
 * @default 
 *
 * @param --カスタムコマンド3--
 * @default
 *
 * @param Custom3 Format
 * @desc 実行コマンドの「カスタムコマンド3」のコマンド名を設定します。
 * @default 
 *
 * @param Custom3 EventID
 * @desc カスタムコマンド3で実行するコモンイベントのIDを設定します。
 * @default 
 * @type number
 *
 * @param Custom3 Show Condition
 * @desc カスタムコマンド3を表示する条件を設定します。
 * @default 
 *
 * @param Custom3 Enabled Condition
 * @desc カスタムコマンド3を実行する条件を設定します。
 * @default 
 *
 * @param --カスタムコマンド4--
 * @default
 *
 * @param Custom4 Format
 * @desc 実行コマンドの「カスタムコマンド4」のコマンド名を設定します。
 * @default 
 *
 * @param Custom4 EventID
 * @desc カスタムコマンド4で実行するコモンイベントのIDを設定します。
 * @default 
 * @type number
 *
 * @param Custom4 Show Condition
 * @desc カスタムコマンド4を表示する条件を設定します。
 * @default 
 *
 * @param Custom4 Enabled Condition
 * @desc カスタムコマンド4を実行する条件を設定します。
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテム選択後にサブコマンドを表示して
 * 実行内容を選択できます。
 * 
 * サブコマンドには以下のコマンドがあります。
 * 1. 使う　　 - アイテムを使用します。使用できない場合はグレー表示になります。
 * 2. 捨てる　 - アイテムを捨てます。「大事なもの」は捨てることが出来ません。
 * 3. 装備する - そのアイテムが、武器や防具ならアクターに装備させます。
 *    　　　　   アクター選択画面を表示して装備させる対象を選びます。
 * 4. やめる　 - サブコマンドを閉じます。
 * 5. カスタム - プラグインパラメータで設定したコモンイベントを実行します。
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
 * 表示するサブコマンドの設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Command List>で、表示するコマンドを設定します。
 * 表示させたいコマンドのコードを、カンマ(,)で区切って入力すると
 * 入力した順番にコマンドを表示します。(すべて小文字)
 * 
 * <コマンド>　<コード>
 * 使う　　　　use
 * 捨てる　　　discard
 * 装備する　　equip
 * やめる　　　cancel
 * カスタム　　custom*　　(*は各カスタムコマンド番号)
 * 
 * 例)
 *  use,discard,custom0,cancel
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムを捨てる
 *-----------------------------------------------------------------------------
 * サブコマンドの「捨てる」を実行すると、捨てるアイテムの数を設定します。
 * 数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
 * アイテムを捨てることができます。
 * 捨てるときのＳＥはプラグインパラメータで設定できます。
 * 
 * 確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
 * することができます。
 * 
 * 以下のタグをアイテムのメモ欄に記載すると、そのアイテムは捨てることが
 * できません。
 * 
 * <捨てられない>
 * <NOT_DISCARDABLE>
 * 
 * また、タグの後ろに数字をつけると、そのＩＤのスイッチがＯＮの間は
 * 捨てることが出来なくなります。
 * 
 * <捨てられない: x>
 * <NOT_DISCARDABLE: x>
 *    x : スイッチＩＤ
 * 
 * 
 *-----------------------------------------------------------------------------
 * アイテムを装備する
 *-----------------------------------------------------------------------------
 * サブコマンドの「装備する」を実行すると、選択したアイテムが武器や防具なら
 * アクターを選択して装備を変更することができます。
 * 
 * このサブコマンドは、武器、防具以外のアイテムのを選択した場合は
 * サブコマンドウィンドウ上に表示しません。
 * 
 * ！注意！
 * 装備先のスロットは、そのアイテムの装備タイプによって自動的に設定されます。
 * 他のプラグインにより、同じ装備タイプを複数装備できるようにしていた場合に
 * 正しく動作しない可能性があります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムコマンド
 *-----------------------------------------------------------------------------
 * 任意のコモンイベントを実行するカスタムコマンドを設定することができます。
 * 設定したコマンドは、プラグインパラメータ<Command List>に追加してください。
 * 
 * コマンド名
 *    プラグインパラメータ<Custom* Format>で設定します。
 * 
 * 実行するコモンイベントＩＤ
 *    プラグインパラメータ<Custom* EventID>で設定します。
 *    アイテム毎に実行するコモンイベントＩＤを設定することもできます。(*1)
 *    プラグインパラメータとアイテムの個別設定が両方ある場合は
 *    アイテムの設定を優先します。
 * 
 * 表示条件：サブコマンドウィンドウに表示するための条件
 *    プラグインパラメータ<Custom* Show Condition>と
 *    アイテム毎の個別条件(*1)を設定できます。
 *    スクリプト形式の条件式を入力します(*2)。
 *    設定しない場合は、表示しません。
 *    プラグインパラメータとアイテムの個別設定が両方ある場合は
 *    両方の条件を満たした場合にのみ表示します。
 * 
 * 有効条件：サブコマンドウィンドウを実行するための条件
 *    プラグインパラメータ<Custom* Enabled Condition>と
 *    アイテム毎の個別条件(*1)を設定できます。
 *    スクリプト形式の条件式を入力します(*2)。
 *    設定しない場合は、実行できません。
 *    プラグインパラメータとアイテムの個別設定が両方ある場合は
 *    両方の条件を満たした場合にのみ実行できます。
 * 
 * (*1)アイテム毎の個別条件の設定方法
 *    以下のタグをメモ欄に記入することで、アイテム別にs設定できます。
 *    <カスタムコマンド:x>
 *    表示条件: 条件式
 *    有効条件: 条件式
 *    コモンイベントID: y
 *    </カスタムコマンド>
 *        x : カスタムコマンドの番号
 *        y : 実行するコモンイベントID
 * 
 * (*2)条件式の入力方法
 *    ダメージ計算式のように、スクリプト形式の計算式を入力することで、
 *    固定値以外の値を使用することができます。以下のコードを使用できます。
 *      item   - 使用するアイテムのデータを参照します。(item.id でアイテムＩＤ)
 *      number - 使用するアイテムの所持数を参照します。
 *      v[x]   - 変数ID x の値を参照します。
 *      s[x]   - スイッチID x の値を参照します。
 *      true   - 常に有効になります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 条件式に使用可能なスクリプト例
 *-----------------------------------------------------------------------------
 * １．アイテムの種別（アイテム、武器、防具）を判別する
 * 
 *  DataManager.isWeapon(item)  :選択したアイテムが、種別「武器」
 *  DataManager.isArmor(item)   :選択したアイテムが、種別「防具」
 *  DataManager.isItem(item)    :選択したアイテムが、種別「アイテム」
 * 
 * 
 * ２．選択したアイテムの所持数を取得
 * 
 *  $gameParty.numItems(item)
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.6.0 - 2018/08/30 : 機能追加
 *    1. アクターが１人の場合に、装備コマンドでアクター選択を不要にする機能を追加。
 * 
 * v1.5.2 - 2018/03/15 : 不具合修正
 *    1. カスタムコマンド名が表示されない不具合を修正。
 * 
 * v1.5.1 - 2018/02/24 : 不具合修正
 *    1. スクリプト入力時に三項演算子を使うと反映されない不具合を修正。
 * 
 * v1.5.0 - 2018/02/22 : 機能追加
 *    1. アイテム画面から装備する機能を追加。
 * 
 * v1.4.1 - 2017/12/02 : 不具合修正
 *    1. プラグインパラメータ「Disposal SE Name」の初期値の誤字を修正。
 * 
 * v1.4.0 - 2017/09/24 : 機能追加
 *    1. アイテム別に実行するコモンイベントIDを設定する機能を追加。
 *    2. サブコマンドウィンドウの高さをコマンドの数で自動調整する機能を追加。
 * 
 * v1.3.0 - 2017/09/19 : 機能追加
 *    1. 任意のコモンイベントを実行するコマンドの追加機能を追加。
 * 
 * v1.2.1 - 2017/08/19 : 不具合修正
 *    1. アイテム無所持でもサブコマンドウィンドウを表示できてしまう不具合修正
 * 
 * v1.2.0 - 2017/07/23 : 機能追加
 *    1. アイテムに個別に捨てられるかどうか設定する機能を追加。
 *    2. アイテムを捨てる時に任意のＳＥを鳴らす機能を追加。
 * 
 * v1.1.0 - 2017/06/11 : 機能追加
 *    1. サブコマンドのウィンドウサイズと位置を調整する機能を追加。
 *    2. 数値入力画面の最大数の表示内容を変更する機能を追加。
 * 
 * v1.0.0 - 2017/06/04 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

(function() {
    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemSubCommand');

    FTKR.ISC = {
        subcom:{
            enableConf    :paramParse(parameters['Enable Confirmation'] || 0),
            disableSelect :paramParse(parameters['Disable Select Single Actor'] || 0),
            data:{
                itemId  :Number(parameters['Use Item Id'] || 0),
            },
            command:{
                list    :(parameters['Command List'] || 'use,cancel').split(','),
                use     :String(parameters['Command Use Format'] || ''),
                discard :String(parameters['Command Discard Format'] || ''),
                equip   :String(parameters['Command Equip Format'] || ''),
                cancel  :String(parameters['Command Cancel Format'] || ''),
                posiX   :Number(parameters['Command Position X'] || 0),
                posiY   :Number(parameters['Command Position Y'] || 0),
                width   :Number(parameters['Command Width'] || 0),
                height  :Number(parameters['Command Height'] || 0),
            },
            custom:[
                {//cmd0
                format  :String(parameters['Custom0 Format'] || ''),
                eventId :Number(parameters['Custom0 EventID'] || 0),
                show    :String(parameters['Custom0 Show Condition'] || ''),
                enabled :String(parameters['Custom0 Enabled Condition'] || ''),
                },
                {//cmd1
                format  :String(parameters['Custom1 Format'] || ''),
                eventId :Number(parameters['Custom1 EventID'] || 0),
                show    :String(parameters['Custom1 Show Condition'] || ''),
                enabled :String(parameters['Custom1 Enabled Condition'] || ''),
                },
                {//cmd2
                format  :String(parameters['Custom2 Format'] || ''),
                eventId :Number(parameters['Custom2 EventID'] || 0),
                show    :String(parameters['Custom2 Show Condition'] || ''),
                enabled :String(parameters['Custom2 Enabled Condition'] || ''),
                },
                {//cmd3
                format  :String(parameters['Custom3 Format'] || ''),
                eventId :Number(parameters['Custom3 EventID'] || 0),
                show    :String(parameters['Custom3 Show Condition'] || ''),
                enabled :String(parameters['Custom3 Enabled Condition'] || ''),
                },
                {//cmd4
                format  :String(parameters['Custom4 Format'] || ''),
                eventId :Number(parameters['Custom4 EventID'] || 0),
                show    :String(parameters['Custom4 Show Condition'] || ''),
                enabled :String(parameters['Custom4 Enabled Condition'] || ''),
                },
            ],
            number:{
                maxFormat:String(parameters['Max Number Format'] || ''),
                posiX   :Number(parameters['Number Position X'] || 0),
                posiY   :Number(parameters['Number Position Y'] || 0),
                width   :Number(parameters['Number Width'] || 0),
                height  :Number(parameters['Number Height'] || 0),
            },
            conf:{
                title       :String(parameters['Conf Title Format'] || ''),
                okFormat    :String(parameters['Confirmation Ok Format'] || ''),
                cancelFormat:String(parameters['Confirmation Cancel Format'] || ''),
            },
            sound:{
                disposal:{
                    name    :String(parameters['Disposal SE Name'] || ''),
                    pitch   :Number(parameters['Disposal SE Pitch'] || 100),
                    pan     :0,
                    volume  :Number(parameters['Disposal SE Volume'] || 90),
                },
            },
        },
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

    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
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

    var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
                    id:RegExp.$1,
                    text:''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertEntrapmentRegArrayEx = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                start:new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end  :new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function(data, regs, prop) {
        return regs.some(function(reg){
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ISC_DatabaseLoaded = false;
    var _ISC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_ISC_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ISC_DatabaseLoaded) {
            this.ItemSubCommandNotetags($dataItems);
            this.ItemSubCommandNotetags($dataWeapons);
            this.ItemSubCommandNotetags($dataArmors);
            _ISC_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.ItemSubCommandNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.isc = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['カスタムコマンド', 'CUSTOM_COMMAND']);
            this.readIscMetaDatas(obj, datas);
        }
    };

    DataManager.setIscBase = function(obj, index) {
        obj.isc[index] = {
            show    :true,
            enabled :true,
            eventId :0,
        };
    };

    DataManager.readIscMetaDatas = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            this.setIscBase(obj, metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /([^:\s]+)[ ]*:[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case '表示条件':
                    case 'SHOW_CONDITION':
                        obj.isc[t].show = match[2];
                        break;
                    case '有効条件':
                    case 'ENABLED_CONDITION':
                        obj.isc[t].enabled = match[2];
                        break;
                    case 'コモンイベントID':
                    case 'COMMON_EVENT_ID':
                        obj.isc[t].eventId = Number(match[2]);
                        break;
                }
            }
        }
    };

    //=============================================================================
    // アイテム画面の変更
    //=============================================================================

    Window_Selectable.prototype.actSelect = function(index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    var _ISC_Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _ISC_Scene_Item_create.call(this);
        this.createSubCommandWindow();
        this.createNumberWindow();
        if (FTKR.ISC.subcom.enableConf) {
            this.createConfTitleWindow();
            this.createConfWindow();
        }
    };

    //------------------------------------------------------------------------
    //サブコマンドの追加
    //------------------------------------------------------------------------
    //書き換え
    Window_ItemList.prototype.isEnabled = function(item) {
        return !!item;
    };
    
    Scene_Item.prototype.convertX = function(layout) {
        return layout.posiX === -1 ? Graphics.boxWidth - layout.width : layout.posiX;
    };

    Scene_Item.prototype.convertY = function(layout) {
        return layout.posiY === -1 ? Graphics.boxHeight - layout.height : layout.posiY;
    };

    Scene_Item.prototype.convertWidth = function(layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Scene_Item.prototype.convertHeight = function(layout) {
        return layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height;
    };

    Scene_Item.prototype.createSubCommandWindow = function() {
        var wnd = FTKR.ISC.subcom.command;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var ww = this.convertWidth(wnd);
        var wh = this.convertHeight(wnd);
        this._subCommandWindow = new Window_ItemSubCommand(wx, wy, ww, wh);
        var window = this._subCommandWindow;
        window.setHandler('ok', this.onSubComOk.bind(this));
        window.setHandler('cancel', this.onSubComCancel.bind(this));
        window.hide();
        this.addWindow(window);
    };

    var _ISC_Scene_Item_onitemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function() {
        this._subCommandWindow._item = this._itemWindow.item();
        if (!FTKR.ISC.subcom.command.height) this._subCommandWindow.refreshHeight();
        this._subCommandWindow.show();
        this._subCommandWindow.actSelect(0);
    };

    Scene_Item.prototype.onSubComOk = function() {
        var symbol = this._subCommandWindow.item().symbol;
        var item = this._subCommandWindow._item;
        if (FTKR.ISC.subcom.data.itemId) {
            $gameVariables.setValue(FTKR.ISC.subcom.data.itemId, item.id);
        }
        switch (symbol) {
            case 'use':
                this._subCommandWindow.hide();
                if (FTKR.ISC.subcom.disableSelect && $gameParty.members().length == 1) {
                    $gameParty.setLastItem(this.item());
                    this._actorWindow.selectLast();
                    this.onActorOk();
                    this.activateItemWindow();
                } else {
                    _ISC_Scene_Item_onitemOk.call(this);
                }
                break;
            case 'discard':
                this._numberWindow.setup(item, $gameParty.numItems(item));
                this._numberWindow.show();
                this._numberWindow.activate();
                break;
            case 'equip':
                if (FTKR.ISC.subcom.disableSelect && $gameParty.members().length == 1) {
                    var item = this._subCommandWindow._item;
                    this.equipTargetActor($gameParty.members()[0], item)
                } else {
                    this._isSubComEquip = true;
                    this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
                    this._actorWindow.show();
                    this._actorWindow.activate();
                    this._actorWindow.select(0);
                }
                break;
            default:
                var match = /custom(\d+)/i.exec(symbol);
                if (match) {
                    var cmdId = Number(match[1]);
                    var eventId = item.isc[cmdId] && item.isc[cmdId].eventId ?
                        item.isc[cmdId].eventId :
                        FTKR.ISC.subcom.custom[cmdId].eventId;
                    $gameParty.setLastItem(item);
                    $gameTemp.reserveCommonEvent(eventId);
                    this.checkCommonEvent();
                } else {
                    this.onSubComCancel();
                }
                break;
        }
    };

    var _ISC_Scene_Item_onActorOk = Scene_Item.prototype.onActorOk;
    Scene_Item.prototype.onActorOk = function() {
        if (this._isSubComEquip) {
            this._isSubComEquip = false;
            var item = this._subCommandWindow._item;
            var actor = $gameParty.targetActor();
            this.equipTargetActor(actor, item);
            this._actorWindow.deactivate();
            this._actorWindow.hide();
        } else {
            _ISC_Scene_Item_onActorOk.call(this);
        }
    };



    Scene_Item.prototype.equipTargetActor = function(actor, item) {
        if (actor && actor.canEquip(item)) {
            SoundManager.playEquip();
            actor.changeEquip(item.etypeId - 1, item);
            this._actorWindow.refresh();
            this._subCommandWindow.hide();
            this._itemWindow.refresh();
            this._itemWindow.select(0);
            this._itemWindow.activate();
        } else {
            SoundManager.playBuzzer();
            this._subCommandWindow.activate();
        }
    };

    var _ISC_Scene_Item_onActorCancel = Scene_Item.prototype.onActorCancel;
    Scene_Item.prototype.onActorCancel = function() {
        if (this._isSubComEquip) {
            this._isSubComEquip = false;
            this._actorWindow.hide();
            this._actorWindow.deactivate();
            this._subCommandWindow.activate();
        } else {
            _ISC_Scene_Item_onActorCancel.call(this);
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
        var wnd = FTKR.ISC.subcom.number;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var wh = this.convertHeight(wnd);
        this._numberWindow = new Window_ItemNumber(wx, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_Item.prototype.onNumberOk = function() {
        if (FTKR.ISC.subcom.enableConf) {
            SoundManager.playOk();
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
        AudioManager.playSe(FTKR.ISC.subcom.sound.disposal);
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
            SoundManager.playCancel();
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
    // 数値入力用クラス
    //=============================================================================

    function Window_ItemNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_ItemNumber.prototype.constructor = Window_ItemNumber;

    Window_ItemNumber.prototype.convertWidth = function(layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Window_ItemNumber.prototype.windowWidth = function() {
        return this.convertWidth(FTKR.ISC.subcom.number);
    };

    Window_ItemNumber.prototype.refresh = function() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        var width = this.width - this.standardPadding() * 2;
        var text = FTKR.ISC.subcom.number.maxFormat.format(this._max);
        var x = width - this.textWidth(text);
        this.drawTextEx(text, x, this.itemY() + this.lineHeight());
    };

    Window_ItemNumber.prototype.playOkSound = function() {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemConfTitle
    // 確認画面用ウィンドウクラス
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
            var text = FTKR.ISC.subcom.conf.title.format(this._item.name, this._number);
            var width = this.textWidth(text);
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
            {dicision:true, disp:FTKR.ISC.subcom.conf.okFormat},
            {dicision:false, disp:FTKR.ISC.subcom.conf.cancelFormat}
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

    Window_ItemConf.prototype.playOkSound = function() {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemSubCommand
    // スキル選択後の実行用コマンドを表示・処理するウィンドウ
    //=============================================================================

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

    Window_ItemSubCommand.prototype.refreshHeight = function() {
        this.refresh();
        var height = Math.min(this.fittingHeight(this._data.length), Graphics.boxHeight - this.y);
        this.move(this.x, this.y, this.width, height);
    };

    Window_ItemSubCommand.prototype.addSubCommand = function(symbol, enabled, disp) {
        this._data.push({symbol:symbol, enabled:enabled, disp:disp});
    };

    Window_ItemSubCommand.prototype.makeItemList = function() {
        this._data = [];
        if (!this._item) return;
        var sep = FTKR.ISC.subcom.command;
        var ctm = FTKR.ISC.subcom.custom;
        sep.list.forEach( function(list){
            switch (list) {
                case 'use':
                    this.addSubCommand(list, this.isUsable(this._item), sep.use);
//                    this._data.push({symbol:'use', enabled:this.isUsable(this._item), disp:sep.use});
                    break;
                case 'discard':
                    this.addSubCommand(list, this.isDiscardable(), sep.discard);
//                    this._data.push({symbol:'discard', enabled:this.isDiscardable(), disp:sep.discard});
                    break;
                case 'cancel':
                    this.addSubCommand(list, true, sep.cancel);
//                    this._data.push({symbol:'cancel',  enabled:true, disp:sep.cancel});
                    break;
                case 'equip':
                    if (!this.isEquipItem(this._item)) break;
                    this.addSubCommand(list, true, sep.equip);
//                    this._data.push({symbol:'equip',  enabled:true, disp:sep.equip});
                    break;
                default:
                    var match = /custom(\d+)/i.exec(list);
                    if (match) {
                        var cmdId = Number(match[1]);
                        var cmd = ctm[cmdId];
                        if (cmd && this.isCustomShow(this._item, cmdId, cmd)) {
                            this.addSubCommand(list, this.isCustomEnabled(this._item,cmdId,cmd), cmd.format);
                            /*
                            this._data.push({
                                symbol:list,
                                enabled:this.isCustomEnabled(this._item,cmdId,cmd),
                                disp:cmd.format,
                            });*/
                        }
                    }
                    break;
            }
        },this);
    };

    Window_ItemSubCommand.prototype.isEquipItem = function(item) {
        return DataManager.isWeapon(item) || DataManager.isArmor(item);
    };

    Window_ItemSubCommand.prototype.isUsable = function(item) {
        return $gameParty.canUse(item);
    };

    Window_ItemSubCommand.prototype.isDiscardable = function() {
        return this._item.itypeId !== 2 &&
            !hasObjectMeta(this._item, ['捨てられない','Not_discardable']) &&
            !this.checkSw();
    };

    Window_ItemSubCommand.prototype.isCustomShow = function(item,cmdId,cmd) {
        FTKR.setGameData(null, null, item, $gameParty.numItems(item));
        return !(!cmd.show && !item.isc[cmdId] ||
            cmd.show && !FTKR.evalFormula(cmd.show) ||
            item.isc[cmdId] && !FTKR.evalFormula(item.isc[cmdId].show));
    };
    
    Window_ItemSubCommand.prototype.isCustomEnabled = function(item,cmdId,cmd) {
        FTKR.setGameData(null, null, item, $gameParty.numItems(item));
        return !(!cmd.enabled && !item.isc[cmdId] ||
            cmd.enabled && !FTKR.evalFormula(cmd.enabled) ||
            item.isc[cmdId] && !FTKR.evalFormula(item.isc[cmdId].enabled));
  };
    
    Window_ItemSubCommand.prototype.checkSw = function() {
        var id = Number(readObjectMeta(this._item, ['捨てられない','Not_discardable']));
        if (id > 0) {
            return $gameSwitches.value(id);
        } else {
            return false;
        }
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

}());//FTKR_ItemSubCommand.js END

//EOF