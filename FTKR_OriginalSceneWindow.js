//=============================================================================
// オリジナルのシーンやウィンドウを作成するプラグイン
// FTKR_OriginalSceneWindow.js
// プラグインNo : 46
// 作成者     : フトコロ
// 作成日     : 2017/06/17
// 最終更新日 : 2020/03/21
// バージョン : v1.7.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_OSW = true;

var FTKR = FTKR || {};
FTKR.OSW = FTKR.OSW || {};

//=============================================================================
/*:
 * @plugindesc v1.7.1 オリジナルのシーンやウィンドウを作成する
 * @author フトコロ
 *
 * @param --ウィンドウの共通設定--
 * @desc 
 * 
 * @param Font Size
 * @desc フォントサイズ
 * @type number
 * @default 28
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白
 * @type number
 * @default 18
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @type number
 * @default 36
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @type number
 * @default 192
 * 
 * @param Window Frame
 * @desc ウィンドウ枠を表示にするか
 * 1 - 表示する, 0 - 表示しない
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 * @default 1
 * 
 * @param --オリジナルシーンの設定--
 * @desc 
 * 
 * @param Background Image Name
 * @desc 背景に使用する画像ファイル名を指定します。
 * 画像ファイルは/img/systemに保存すること
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param --コマンドウィンドウの設定--
 * @desc 
 * 
 * @param Enable Escape Code
 * @desc コマンドに制御文字を使えるようにします。
 * 1 - 有効, 0 - 無効
 * @type select
 * @option 有効
 * @value 1
 * @option 無効
 * @value 0
 * @default 0
 * 
 * @param Command Position X
 * @desc コマンドウィンドウを表示するX座標を設定します。
 * @default 0
 * 
 * @param Command Position Y
 * @desc コマンドウィンドウを表示するY座標を設定します。
 * @default 0
 * 
 * @param Command Width
 * @desc コマンドウィンドウの幅を設定します。
 * @type number
 * @default 240
 * 
 * @param Command Max Cols
 * @desc コマンドウィンドウの最大列数を設定します。
 * @type number
 * @default 1
 * 
 * @param Command Align
 * @desc コマンドウィンドウのコマンド表示位置を設定します。
 * left / center / right
 * @default left
 * @type select
 * @option 左寄せ
 * @value left
 * @option 中央
 * @value center
 * @option 右寄せ
 * @value right
 * 
 * @param --コモンウィンドウの設定--
 * @desc 
 * 
 * @param Common Width
 * @desc コモンウィンドウの幅を設定します。
 * @default 240
 * 
 * @param Common Height
 * @desc コモンウィンドウの高さを設定します。
 * @default 240
 * 
 * @param --コモンウィンドウの表示内容設定--
 * @desc 
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @default 0,0,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @type number
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @default 1,0,0
 * 
 * @param --セレクトウィンドウの設定--
 * @desc 
 * 
 * @param Select Width
 * @desc セレクトウィンドウの幅を設定します。
 * @default 240
 * 
 * @param Select Height
 * @desc セレクトウィンドウの高さを設定します。
 * @default 240
 * 
 * @param Select Cursor Height
 * @desc セレクトウィンドウのカーソル高さを設定します。
 * @type number
 * @default 1
 * 
 * @param Select Max Cols
 * @desc セレクトウィンドウの最大列数を設定します。
 * @type number
 * @default 2
 * 
 * @param --セレクトウィンドウの表示内容設定--
 * @desc 
 * 
 * @param Select Status Space
 * @desc 各Textの間隔を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @default 0,0,0,0
 * 
 * @param Select Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @type number
 * @default 5
 * 
 * @param Select Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * FTKR_CustomSimpleActorStatus.js が必要
 * @default 1,0,0
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * オリジナルのシーンやウィンドウを作成します。
 * 
 * 1. オリジナルシーンの簡易作成機能
 * 2. オリジナルシーンおよびマップシーン、バトルシーンにおける
 *    ウィンドウの作成機能
 * 
 * 
 * 作成できるウィンドウは、以下の３種類です。
 *   1. コマンドウィンドウ - シーン変更やコモンイベントを実行するコマンドを表示
 *   2. コモンウィンドウ　 - さまざまな文字列や数値、画像などを表示(*1)
 *   3. セレクトウィンドウ - さまざまな文字列や数値、画像などをリストとして表示(*1)
 * 
 * (*1) コモンウィンドウに、文字列以外を表示させたい場合は
 *      FTKR_CustomSimpleActorStatus.js が必要です。
 * 
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_OriginalSceneWindow.ja.md
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
 * v1.7.1 - 2020/03/21 : 不具合修正
 *    1. アクティブウィンドウ命令が正常に動作しない不具合を修正。
 *    2. ウィンドウの高さと幅を個別に設定する機能を追加。
 *    3. コマンドウィンドウの高さをコマンド数に寄らずに設定する機能を追加。
 * 
 * v1.7.0 - 2019/12/16 : 機能追加
 *    1. コモンウィンドウに対して、FTKR_CustomSimpleActorStatus.js の
 *       statusList方式で表示内容を設定する機能を追加。
 * 
 * v1.6.0 - 2018/10/08 : 機能追加、ヘルプを削減
 *    1. ウィンドウスキンを設定するプラグインコマンドを追加。
 * 
 * v1.5.7 - 2018/09/17 : 不具合修正
 *    1. 一度作成したウィンドウのコマンド内容を変更しても、「更新」後に反映されない
 *       不具合を修正。
 * 
 * v1.5.6 - 2018/07/31 : 不具合修正
 *    1. セレクトウィンドウで、リストにアクターを設定した場合に、アクターの
 *       ゲームデータが正常に反映されない不具合を修正。
 *    2. コマンドまたはセレクトウィンドウの選択情報を、正しく取得できない不具合を修正
 * 
 * v1.5.5 - 2018/06/18 : 不具合修正
 *    1．プラグインパラメータEnable Escape Codeの設定が反映されない不具合を修正
 * 
 * v1.5.4 - 2018/05/24 : 機能修正
 *    1. FTKR_CustomSimpleActorStatus.jsと組み合わせた時でも、
 *       テキスト表示コマンドが使えるように修正。
 * 
 * v1.5.3 - 2018/05/20 : ヘルプ修正
 *    1. セレクトウィンドウのリストで、選択した対象のデータを取得する
 *       スクリプトを追記。
 * 
 * v1.5.2 - 2018/03/12 : 不具合修正
 *    1. アクター画像関係の表示透過度が変わってしまう不具合を修正。
 * 
 * v1.5.1 - 2018/02/15 : 機能追加
 *    1. コマンドウィンドウとセレクトウィンドウで、カーソル位置を初期位置に戻す
 *       コマンドを追加。
 * 
 * v1.5.0 - 2018/02/14 : 機能追加、仕様変更、ヘルプ修正
 *    1. ゲーム内スイッチで、ウィンドウの表示のON/OFFを切り替える機能を追加。
 *    2. プラグインパラメータで、ウィンドウの生成数を設定する機能を削除。
 *    3. バトルシーンでも、ウィンドウを作成するために生成コマンドの実行が
 *       必要なように変更。
 * 
 * v1.4.0 - 2018/01/16 : 機能追加
 *    1. コマンドウィンドウのキャンセル時の動作を設定するコマンドを追加。
 *    2. オリジナルシーンを終了するプラグインコマンドを追加。
 * 
 * v1.3.0 - 2017/07/09 : 機能追加
 * 
 * v1.2.1 - 2017/06/23 : 不具合修正
 *    1. 表示内容の設定で、ステータスに制御文字を使用すると正しく反映されない
 *       不具合を修正。
 *    2. ウィンドウの表示をOFFにした時に、アクティブがOFFにならない不具合を修正。
 *    3. プラグインパラメータに@typeを対応
 * 
 * v1.2.0 - 2017/06/20 : 機能追加
 *    1. セレクトウィンドウのリスト設定の表示内容を追加。
 *    2. セレクトウィンドウのアクターやデータをコモンウィンドウが受け取る
 *       参照コマンドを追加。
 * 
 * v1.1.1 - 2017/06/19 : ヘルプ修正
 * 
 * v1.1.0 - 2017/06/19 : 機能追加、仕様変更
 *    1. オリジナルシーンの「閉じる」コマンドのデフォルト設定を削除。
 *    2. コマンドウィンドウを表示OFFにした時に、アクティブもOFFにするように変更。
 *    3. コマンド追加のメソッドに、シーンを閉じる機能と、別のウィンドウを
 *       アクティブONにする機能を追加。
 *    4. オリジナルシーンでコモンイベントを呼び出せるように修正。
 *    5. セレクトウィンドウの作成機能を追加。
 * 
 * v1.0.0 - 2017/06/17 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

function Game_OswBase() {
    this.initialize.apply(this, arguments);
}

function Game_OswCommand() {
    this.initialize.apply(this, arguments);
}

function Game_OswCommon() {
    this.initialize.apply(this, arguments);
}

function Game_OswSelectable() {
    this.initialize.apply(this, arguments);
}

function Game_OswScene() {
    this.initialize.apply(this, arguments);
}

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_OriginalSceneWindow');

    FTKR.OSW = {
        basic:{
            fontSize  :Number(parameters['Font Size'] || 28),
            padding   :Number(parameters['Window Padding'] || 0),
            lineHeight:Number(parameters['Window Line Height'] || 36),
            opacity   :Number(parameters['Window Opacity'] || 0),
            frame     :Number(parameters['Window Frame'] || 0),
        },
        original:{
            bgimage   :String(parameters['Background Image Name'] || ''),
        },
        command:{
            x             :Number(parameters['Command Position X'] || 0),
            y             :Number(parameters['Command Position Y'] || 0),
            width         :Number(parameters['Command Width'] || 240),
            maxCols       :Number(parameters['Command Max Cols'] || 1),
            align         :String(parameters['Command Align'] || 'left'),
            escape        :Number(parameters['Enable Escape Code'] || 0),
        },
        common:{
            width         :Number(parameters['Common Width'] || 240),
            height        :Number(parameters['Common Height'] || 240),
            content:{
                space     :String(parameters['Actor Status Space'] || '0,0,0,0'),
                spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
                widthRate :String(parameters['Actor Status Width Rate'] || '1,0,0'),
            },
        },
        select:{
            width         :Number(parameters['Select Width'] || -1),
            height        :Number(parameters['Select Height'] || 240),
            maxCols       :Number(parameters['Select Max Cols'] || 1),
            cursorHeight  :Number(parameters['Select Cursor Height'] || 1),
            content:{
                space     :String(parameters['Select Status Space'] || '0,0,0,0'),
                spaceIn   :Number(parameters['Select Status Space In Text'] || 0),
                widthRate :String(parameters['Select Status Width Rate'] || '1,0,0'),
            },
        },
    };

    Game_OswBase.WINDOW_COMMON     = 0;
    Game_OswBase.WINDOW_COMMAND    = 1;
    Game_OswBase.WINDOW_SELECTABLE = 2;

    Game_OswBase.SCENE_ORIGINAL = 0;
    Game_OswBase.SCENE_MAP      = 1;
    Game_OswBase.SCENE_BATTLE   = 2;

    Game_OswBase.SELECT_TEXT_LIST   = 0;
    Game_OswBase.SELECT_PARTY_LIST  = 1;
    Game_OswBase.SELECT_ACTOR_LIST  = 2;
    Game_OswBase.SELECT_CLASS_LIST  = 3;
    Game_OswBase.SELECT_SKILL_LIST  = 4;
    Game_OswBase.SELECT_ITEM_LIST   = 5;
    Game_OswBase.SELECT_WEAPON_LIST = 6;
    Game_OswBase.SELECT_ARMOR_LIST  = 7;
    Game_OswBase.SELECT_ENEMY_LIST  = 8;
    Game_OswBase.SELECT_TROOP_LIST  = 9;
    
    Game_OswBase.SELECT_PARTY_ALL     = 0;
    Game_OswBase.SELECT_PARTY_BATTLE  = 1;
    Game_OswBase.SELECT_PARTY_RESERVE = 2;
    Game_OswBase.SELECT_ACTOR         = 3;

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgStr = function(arg) {
        return convertEscapeCharacters(arg);
    };

    var setArgNum = function(arg) {
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
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

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _EBE_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _EBE_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/OSW_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'オリジナルシーン表示':
            case 'OPEN_ORIGINAL_SCENE':
                SceneManager.push(Scene_OSW);
                break;
            case 'オリジナルシーン終了':
            case 'CLOSE_ORIGINAL_SCENE':
                if (SceneManager._scene.isOSWScene()) SceneManager._scene.popScene();
                break;
            case 'コモン設定':
            case 'SET_COMMON':
                this.setOswWindowParam(args, Game_OswBase.WINDOW_COMMON);
                break;
            case 'コマンド設定':
            case 'SET_COMMAND':
                this.setOswWindowParam(args, Game_OswBase.WINDOW_COMMAND);
                break;
            case 'セレクト設定':
            case 'SET_SELECT':
                this.setOswWindowParam(args, Game_OswBase.WINDOW_SELECTABLE);
                break;
        }
    };
    Game_Interpreter.prototype.gameData = function(arg) {
        switch (setArgStr(arg).toUpperCase()) {
            case 'オリジナル':
            case 'ORIGINAL':
                return $gameOswData;
            case 'マップ':
            case 'MAP':
                return $gameMap;
            case 'バトル':
            case 'BATTLE':
                return $gameParty;
            default:
                return {};
        }
    };

    Game_Interpreter.prototype.setOswWindowParam = function(args, type) {
        var windowId = setArgNum(args[1]);
        var gameData = this.gameData(args[0]);
        switch (type) {
            case Game_OswBase.WINDOW_COMMON:
                var window = gameData.commonWindow(windowId);
                break;
            case Game_OswBase.WINDOW_COMMAND:
                var window = gameData.commandWindow(windowId);
                break;
            case Game_OswBase.WINDOW_SELECTABLE:
                var window = gameData.selectWindow(windowId);
                break;
            default:
                return;
        };
        this.setOswWindowArgs(window, 2, args, type);
    };

    Game_Interpreter.prototype.createOswList = function(args, type) {
        var windowId = setArgNum(args[1]);
        switch (setArgStr(args[0]).toUpperCase()) {
            case 'オリジナル':
            case 'ORIGINAL':
                $gameOswData.addOswList(type, windowId);
                break;
            case 'マップ':
            case 'MAP':
                $gameMap.addOswList(type, windowId);
                break;
            case 'バトル':
            case 'BATTLE':
                $gameParty.addOswList(type, windowId);
                break;
            default:
                return {};
        }
    };

    Game_Interpreter.prototype.setOswWindowArgs = function(window, index, args, type) {
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case '生成':
                case 'CREATE':
                    this.createOswList(args, type);
                    return;
                case '位置':
                case 'POSITION':
                    var x = setArgNum(args[i+1]);
                    var y = setArgNum(args[i+2]);
                    window.setPosition(x, y);
                    i += 2;
                    break;
                case 'サイズ':
                case 'SIZE':
                    var w = setArgNum(args[i+1]);
                    var h = window.isCommand() ? null : setArgNum(args[i+2]);
                    window.setSize(w, h);
                    i += window.isCommand() ? 1 : 2;
                    break;
                case '幅':
                case 'WIDTH':
                    var w = setArgNum(args[i+1]);
                    window.setWidth(w);
                    i += 1;
                    break;
                case '高さ':
                case 'HEIGHT':
                    var match = /(\d+)L/i.exec(args[i+1]);
                    if(match) {
                        var h = window._lineHeight * match[1] + window._padding * 2;
                    } else {
                        var h = setArgNum(args[i+1]);
                    }
                    window.setHeight(h);
                    i += 1;
                    break;
                case 'カーソル残す':
                case 'LEAVE_CURSOR':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            window.leaveSelect();
                            break;
                        case 'OFF':
                            window.deselect();
                            break;
                    }
                    i += 1;
                    break;
                case '表示':
                case 'SHOW':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            window.show();
                            break;
                        case 'OFF':
                            window.deactivate();
                            window.hide();
                            break;
                    }
                    i += 1;
                    break;
                case '表示スイッチ':
                case 'SHOW_SWITCH':
                    var switchId = setArgNum(args[i+1]);
                    window.setShowSwitch(switchId);
                    i += 1;
                    break;
                case 'アクティブ':
                case 'ACTIVE':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            window.activate();
                            break;
                        case 'OFF':
                            window.deactivate();
                            break;
                    }
                    i += 1;
                    break;
                case '最大列数':
                case 'MAX_COLS':
                    var value = setArgNum(args[i+1]);
                    window.setMaxCols(value);
                    i += 1;
                    break;
                case 'カーソル高さ':
                case 'CURSOR_HEIGHT':
                    var value = setArgNum(args[i+1]);
                    window.setCursorHeight(value);
                    i += 1;
                    break;
                case 'コマンド位置':
                case 'COMMAND_ALIGN':
                    window.setTextAlign(args[i+1]);
                    i += 1;
                    break;
                case 'コマンド追加':
                case 'ADD_COMMAND':
                    i += this.setOswCommandArgs(window, i + 1, args);
                    break;
                case 'キャンセル実行設定':
                case 'ADD_CANCEL_ACTION':
                    this.setOswCommandCancel(window, args[i+1]);
                    i += 1;
                    break;
                case 'コマンド初期化':
                case 'CLEAR_COMMAND':
                    window.clearList();
                    break;
                case 'リスト設定':
                case 'SET_LIST':
                    i += this.setOswSelectList(window, i, args);
                    break;
                case 'リスト初期化':
                case 'CLEAR_LIST':
                    window.clearList();
                    break;
                case 'リスト実行設定':
                case 'SET_LIST_ACTION':
                    i += this.setOswSelectArgs(window, i + 1, args);
                    break;
                case 'テキスト初期化':
                case 'CLEAR_TEXT':
                    window.clearTexts();
                    break;
                case 'テキスト':
                case 'TEXT':
                    var line = setArgNum(args[i+1]);
                    var text = setArgStr(args[i+2]);
                    window.setText(line, text);
                    window._cssContent = false;
                    i += 2;
                    break;
                case 'ステータスリスト初期化':
                case 'SL初期化':
                case 'CLEAR_STATUSLIST':
                case 'CLEAR_SL':
                    window.clearStatusList();
                    i += 1;
                    window._cssContent = false;
                    break;
                case 'ステータスリスト設定':
                case 'SL設定':
                case 'SET_STATUSLIST':
                case 'SET_SL':
                    i += this.setOswStatusListContentArgs(window, i + 1, args);
                    window._cssContent = true;
                    break;
                case '内容':
                case 'CONTENT':
                    i += this.setOswContentArgs(window, i + 1, args);
                    window._cssContent = true;
                    break;
                case 'アクター':
                case 'ACTOR':
                    var actor = $gameActors.actor(setArgNum(args[i+1]));
                    window.setActor(actor);
                    i += 1;
                    break;
                case 'パーティー':
                case 'PARTY':
                    var actor = $gameParty.members()[setArgNum(args[i+1])];
                    window.setActor(actor);
                    i += 1;
                    break;
                case 'セレクト参照':
                case 'REFERENCE_SELECT':
                    var windowId = setArgNum(args[i+1]);
                    window.setReference(windowId);
                    i += 1;
                    break;
                case '更新':
                case 'REFRESH':
                    window.setRequestRefresh();
                    break;
                case 'カーソル位置初期化':
                case 'CLEAR_CURSOR':
                    window.clearSelectIndex();
                    break;
                case 'フォントサイズ':
                case 'FONT_SIZE':
                    var value = setArgNum(args[i+1]);
                    window.setFontSize(value);
                    i += 1;
                    break;
                case '余白':
                case 'PADDING':
                    var value = setArgNum(args[i+1]);
                    window.setPadding(value);
                    i += 1;
                    break;
                case '行の高さ':
                case 'LINEHEIGHT':
                    var value = setArgNum(args[i+1]);
                    window.setLineHeight(value);
                    i += 1;
                    break;
                case '透明度':
                case 'OPACITY':
                    var value = setArgNum(args[i+1]);
                    window.setBackOpacity(value);
                    i += 1;
                    break;
                case 'ウィンドウスキン':
                case 'WINDOWSKIN':
                    var skin = setArgStr(args[i+1]);
                    window.setWindowSkin(skin);
                    i += 1;
                    break;
                case 'フレーム':
                case 'FRAME':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            window.showFrame();
                            break;
                        case 'OFF':
                            window.hideFrame();
                            break;
                        default:
                            return;
                    }
                    i += 1;
                    break;
                default:
                    return;
            }
        }
    };

    Game_Interpreter.prototype.setOswCommandArgs = function(window, i, args) {
        var name = setArgStr(args[i]);
        var symbol = setArgStr(args[i+1]);
        var enabled = args[i+2];
        var method = this.setOswMethod(args[i+3]);
        window.addCommand(name, symbol, enabled, null, method);
        return 4;
    };

    Game_Interpreter.prototype.setOswCommandCancel = function(window, method) {
        window.setCancelAction(this.setOswMethod(method));
    };

    Game_Interpreter.prototype.setOswMethod = function(text) {
        var match = /(.+)\((.+)\)/.exec(text) || [];
        switch ((match[1] + '').toUpperCase()) {
            case 'ウィンドウアクティブ':
            case 'WINDOW_ACTIVE':
                var newwindow = match[2].split(',');
                switch (newwindow[0].toUpperCase()) {
                    case 'コマンド':
                    case 'COMMAND':
                        var windowType = Game_OswBase.WINDOW_COMMAND;
                        break;
                    case 'セレクト':
                    case 'SELECT':
                        var windowType = Game_OswBase.WINDOW_SELECTABLE;
                        break;
                }
                console.log(newwindow);
                var windowId = Number(newwindow[1]);
                var hide = Boolean(eval(newwindow[2]));
                var deselect = Boolean(eval(newwindow[3]));
                var varId = Number(newwindow[4]) || 0;
                var action = windowType + ',' + windowId + ',' + hide + ',' + deselect+ ',' + varId;
                return 'SceneManager._scene.changeActivateWindow.bind(SceneManager._scene, this,' + action + ')';
            case 'シーン変更':
            case 'CHANGE_SCENE':
                return 'SceneManager.push.bind(SceneManager,' + match[2] + ')';
            case 'コモンイベント':
            case 'COMMON_EVENT':
                return '$gameTemp.reserveCommonEvent.bind($gameTemp,' + match[2] + ')';
            default:
                switch ((text + '').toUpperCase()) {
                    case 'シーン終了':
                    case 'END_SCENE':
                        return 'SceneManager._scene.popScene.bind(SceneManager._scene)';
                    default:
                        return text;
                }
        }
    };

    Game_Interpreter.prototype.setOswContentArgs = function(window, index, args) {
        var count = 0;
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case 'ステータス':
                case 'STATUS':
                    window.setContentStatus(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case '描画間隔':
                case 'DRAW_SPACE':
                    window.setContentSpace(setArgStr(args[i+1]));
                    i += 1;
                    count += 2;
                    break;
                case '並列間隔':
                case 'PARALLEL_SPACE':
                    window.setContentSpaceIn(setArgNum(args[i+1]));
                    i += 1;
                    count += 2;
                    break;
                case '幅比率':
                case 'WIDTH_RATE':
                    window.setContentWidthRate(setArgStr(args[i+1]));
                    i += 1;
                    count += 2;
                    break;
                default:
                    return count;
            }
        }
        return count;
    };

    Game_Interpreter.prototype.setOswStatusListContentArgs = function(window, index, args) {
        var count = 0;
        var statuslist = {};
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case 'TEXT':
                    statuslist.text = setArgStr(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case 'VALUE':
                    statuslist.value = setArgStr(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case 'X':
                    statuslist.x = setArgStr(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case 'Y':
                    statuslist.y = setArgStr(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case 'WIDTH':
                    statuslist.width = setArgStr(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                default:
                    return count;
            }
        }
        window.addStatusList(statuslist);
        return count;
    };

    Game_Interpreter.prototype.setOswSelectArgs = function(window, i, args) {
        var method = this.setOswMethod(args[i+1]);
        console.log(method);
        switch (args[i].toUpperCase()) {
            case '決定':
            case 'OK':
                window.setOkAction(method);
                return 3;
            case 'キャンセル':
            case 'CANCEL':
                window.setCancelAction(method);
                return 3;
        }
        return;
    };

    Game_Interpreter.prototype.setOswSelectList = function(window, i, args) {
        switch (setArgStr(args[i+1]).toUpperCase()) {
            case 'テキスト':
            case 'TEXT':
                var list = (args[i+2] + '').split(',');
                window.setList(Game_OswBase.SELECT_TEXT_LIST,
                    list);
                return 2;
            case 'パーティー':
            case 'PARTY':
                switch ((args[i+2]).toUpperCase()) {
                    case '全メンバー':
                    case 'ALL_MEMBER':
                        var type = Game_OswBase.SELECT_PARTY_ALL;
                        break;
                    case 'バトルメンバー':
                    case 'BATTLE_MEMBER':
                        var type = Game_OswBase.SELECT_PARTY_BATTLE;
                        break;
                    case '控えメンバー':
                    case 'RESERVE_MEMBER':
                        var type = Game_OswBase.SELECT_PARTY_RESERVE;
                        break;
                }
                window.setList(Game_OswBase.SELECT_PARTY_LIST, 
                    null, type, true);
                return 2;
            case 'アクター':
            case 'ACTOR':
                window.setList(Game_OswBase.SELECT_ACTOR_LIST, 
                    null, Game_OswBase.SELECT_ACTOR, args[i+2]);
                return 2;
            case '職業':
            case 'CLASS':
                window.setList(Game_OswBase.SELECT_CLASS_LIST, 
                    null, null, args[i+2]);
                return 2;
            case 'スキル':
            case 'SKILL':
                window.setList(Game_OswBase.SELECT_SKILL_LIST, 
                    null, null, args[i+2]);
                return 2;
            case 'アイテム':
            case 'ITEM':
                window.setList(Game_OswBase.SELECT_ITEM_LIST, 
                    null, null, args[i+2]);
                return 2;
            case '武器':
            case 'WEAPON':
                window.setList(Game_OswBase.SELECT_WEAPON_LIST, 
                    null, null, args[i+2]);
                return 2;
            case '防具':
            case 'ARMOR':
                window.setList(Game_OswBase.SELECT_ARMOR_LIST, 
                    null, null, args[i+2]);
                return 2;
            case '敵キャラ':
            case 'ENEMY':
                window.setList(Game_OswBase.SELECT_ENEMY_LIST, 
                    null, null, args[i+2]);
                return 2;
            case '敵グループ':
            case 'TROOP':
                window.setList(Game_OswBase.SELECT_TROOP_LIST, 
                    null, null, args[i+2]);
                return 2;
            default:
                return 0;
        }
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    //シーン設定用データクラスを登録
    var _OSW_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _OSW_DataManager_createGameObjects.call(this);
        $gameOswData = new Game_OswScene();
    };

    //シーン設定用データをセーブデータに保存
    var _OSW_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _OSW_DataManager_makeSaveContents.call(this);
        contents.oswDatas = $gameOswData;
        return contents;
    };

    var _OSW_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _OSW_DataManager_extractSaveContents.call(this, contents);
        if (contents.oswDatas) {
            $gameOswData = contents.oswDatas;
        }
    };

    //=============================================================================
    // Game_OswBase
    // ウィンドウ設定用ベースデータクラス
    //=============================================================================

    Game_OswBase.prototype.initialize = function(scene, windowId) {
        var basic = FTKR.OSW.basic;
        this._scene = scene;
        this._windowId = windowId;
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._maxCols = 1;
        this._index = 0;
        this._actor = null;
        this._deselect = false;
        this._show = false;
        this._active = false;
        this._deactivate = false;
        this._requestRefresh = false;
        this._creative = false;
        this._opacity = basic.opacity;
        this._padding = basic.padding;
        this._fontSize = basic.fontSize;
        this._lineHeight = basic.lineHeight;
        this._frame = basic.frame;
        this._content = {
            text1     : '',
            text2     : '',
            text3     : '',
            space     : '0,0,0,0',
            spaceIn   : 0,
            widthRate : '1,1,1',
            item      : null,
            statusList: null,
        }
    };

    Game_OswBase.prototype.isOriginal = function() {
        return this._scene === Game_OswBase.SCENE_ORIGINAL;
    };

    Game_OswBase.prototype.isMap = function() {
        return this._scene === Game_OswBase.SCENE_MAP;
    };

    Game_OswBase.prototype.isBattle = function() {
        return this._scene === Game_OswBase.SCENE_BATTLE;
    };

    Game_OswBase.prototype.requestRefresh = function() {
        return this._requestRefresh;
    };

    Game_OswBase.prototype.setPosition = function(x, y) {
        this._x = x === -1 ? Graphics.boxWidth - this._width : x;
        this._y = y === -1 ? Graphics.boxHeight - this._height : y;
    };

    Game_OswBase.prototype.setSize = function(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };

    Game_OswBase.prototype.setWidth = function(width) {
        this._width = width === -1 ? Graphics.boxWidth : width;
    };

    Game_OswBase.prototype.setHeight = function(height) {
        this._height = height=== -1 ? Graphics.boxHeight : height;
    };

    Game_OswBase.prototype.deselect = function() {
        this._deselect = true;
    };

    Game_OswBase.prototype.leaveSelect = function() {
        this._deselect = false;
    };

    Game_OswBase.prototype.show = function() {
        this._show = true;
    };

    Game_OswBase.prototype.hide = function() {
        this._show = false;
    };

    Game_OswBase.prototype.setActor = function(actor) {
        this._actor = actor;
    };

    Game_OswBase.prototype.setMaxCols = function(value) {
        this._maxCols = value;
    };

    Game_OswBase.prototype.activate = function() {
        this._active = true;
    };

    Game_OswBase.prototype.deactivate = function() {
        this._active = false;
    };

    Game_OswBase.prototype.setRequestRefresh = function() {
        this._requestRefresh = true;
    };

    Game_OswBase.prototype.clearRequestRefresh = function() {
        this._requestRefresh = false;
    };

    Game_OswBase.prototype.clearSelectIndex = function() {
        this._clearSelectIndex = true;
    };

    Game_OswBase.prototype.showFrame = function() {
        this._frame = true;
    };

    Game_OswBase.prototype.hideFrame = function() {
        this._frame = false;
    };

    Game_OswBase.prototype.setBackOpacity = function(value) {
        this._opacity = value;
    };

    Game_OswBase.prototype.setWindowSkin = function(value) {
        this._windowSkin = value;
    };

    Game_OswBase.prototype.setPadding = function(value) {
        this._padding = value;
    };

    Game_OswBase.prototype.setFontSize = function(value) {
        this._fontSize = value;
    };

    Game_OswBase.prototype.setLineHeight = function(value) {
        this._lineHeight = value;
    };

    Game_OswBase.prototype.createWindow = function() {
        this._creative = true;
    };

    Game_OswBase.prototype.content = function() {
        return this._content;
    };

    Game_OswBase.prototype.setContent = function(status, space, spaceIn, widthRate) {
        this.setContentStatus(status);
        this.setContentSpace(space);
        this.setContentSpaceIn(spaceIn);
        this.setContentWidthRate(widthRate);
    };

    Game_OswBase.prototype.setContentStatus = function(status) {
        var texts = status.split(';');
        this._content.text1 = texts[0] || '';
        this._content.text2 = texts[1] || '';
        this._content.text3 = texts[2] || '';
    };

    Game_OswBase.prototype.setContentSpace = function(space) {
        this._content.space = space;
    };

    Game_OswBase.prototype.setContentSpaceIn = function(spaceIn) {
        this._content.spaceIn = spaceIn;
    };

    Game_OswBase.prototype.setContentWidthRate = function(widthRate) {
        this._content.widthRate = widthRate;
    };

    Game_OswBase.prototype.setShowSwitch = function(switchId) {
        this._showSwitchId = switchId;
    };

    Game_OswBase.prototype.addStatusList = function(status) {
        if (!this._content.statusList) this._content.statusList = [];
        this._content.statusList.push(status);
    };

    Game_OswBase.prototype.clearStatusList = function() {
        this._content.statusList.length = 0;
        this._content.statusList = null;
    };

    //=============================================================================
    // Game_OswSelectable
    // セレクトウィンドウ設定用データクラス
    //=============================================================================

    Game_OswSelectable.prototype = Object.create(Game_OswBase.prototype);
    Game_OswSelectable.prototype.constructor = Game_OswSelectable;

    Game_OswSelectable.prototype.initialize = function(scene, windowId) {
        Game_OswBase.prototype.initialize.call(this, scene, windowId);
        var select = FTKR.OSW.select;
        var content = select.content;
        this._drawType = 0;
        this.clearList();
        this.setOkAction(false, false, null, null, null);
        this.setCancelAction(null, null);
        this.setMaxCols(select.maxCols);
        this.setCursorHeight(select.cursorHeight);
        this.setPosition(select.x, select.y);
        this.setSize(select.width, select.height);
        this.setContent('', content.space, content.spaceIn, content.widthRate);
    };

    Game_OswSelectable.prototype.clearList = function() {
        this._list = [];
        this._listType = null;
        this._enable = true;
    };

    Game_OswSelectable.prototype.setList = function(drawType, list, listType, enable) {
        this._drawType = drawType;
        this._list = list || [];
        this._listType = listType;
        this._enable = enable || true;
    };

    Game_OswSelectable.prototype.isCommand = function() {
        return false;
    }

    Game_OswSelectable.prototype.setCursorHeight = function(value) {
        this._cursorHeight = value;
    };

    Game_OswSelectable.prototype.setOkAction = function(method, varId) {
        this._ok = {
            method :method,
            varId  :varId,
        }
    };

    Game_OswSelectable.prototype.setCancelAction = function(method, varId) {
        this._cancel = {
            method :method,
            varId  :varId,
        }
    };

    //=============================================================================
    // Game_OswCommand
    // コマンドウィンドウ設定用データクラス
    //=============================================================================

    Game_OswCommand.prototype = Object.create(Game_OswBase.prototype);
    Game_OswCommand.prototype.constructor = Game_OswCommand;

    Game_OswCommand.prototype.initialize = function(scene, windowId) {
        Game_OswBase.prototype.initialize.call(this, scene, windowId);
        var cmd = FTKR.OSW.command;
        this.clearList();
        this.setTextAlign(cmd.align);
        this.setMaxCols(cmd.maxCols);
        this.setPosition(cmd.x, cmd.y);
        this.setCancelAction(false, false, null, null);
        this.setSize(cmd.width);
    };

    Game_OswCommand.prototype.commandNum = function() {
        return this._list.length;
    };

    Game_OswCommand.prototype.windowHeight = function() {
        var line = Math.ceil(this.commandNum() / this._maxCols);
        return this._padding * 2 + this._lineHeight * line;
    };

    Game_OswCommand.prototype.clearList = function() {
        this._list = [];
    };

    Game_OswCommand.prototype.isCommand = function() {
        return true;
    }

    Game_OswCommand.prototype.setSize = function(width) {
        if (width) this.setWidth(width);
        this.setHeight(this.windowHeight());
    };

    Game_OswCommand.prototype.setTextAlign = function(align) {
        this._align = align;
    };

    Game_OswCommand.prototype.addCommand = function(name, symbol, enabled, ext, method) {
        this._list.push({
            name    :name,
            symbol  :symbol,
            enabled :enabled,
            ext     :ext,
            method  :method,
        });
    };

    Game_OswCommand.prototype.setCancelAction = function(method, varId) {
        this._cancel = {
            method :method,
            varId  :varId,
        }
    };

    //=============================================================================
    // Game_OswCommon
    // コモンウィンドウ設定用データクラス
    //=============================================================================

    Game_OswCommon.prototype = Object.create(Game_OswBase.prototype);
    Game_OswCommon.prototype.constructor = Game_OswCommon;

    Game_OswCommon.prototype.initialize = function(scene, windowId) {
        Game_OswBase.prototype.initialize.call(this, scene, windowId);
        var common = FTKR.OSW.common;
        var content = common.content;
        this._referenceId = -1;
        this.clearTexts();
        this.setSize(common.width, common.height);
        this.setContent('', content.space, content.spaceIn, content.widthRate);
    };

    Game_OswCommon.prototype.isCommand = function() {
        return false;
    }

    Game_OswCommon.prototype.texts = function() {
        return this._texts;
    };

    Game_OswCommon.prototype.referenceId = function() {
        return this._referenceId;
    }
    
    Game_OswCommon.prototype.clearTexts = function() {
        this._texts = [];
    };

    Game_OswCommon.prototype.setText = function(line, text) {
        this._texts[line] = text;
    };

    Game_OswCommon.prototype.setReference = function(windowId) {
        this._referenceId = windowId;
    };

    //=============================================================================
    // Game_Map
    // マップデータクラスにマップシーン用のウィンドウ設定を追加
    //=============================================================================

    var _OSW_Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _OSW_Game_Map_initialize.call(this);
        this._oswIndex = -1;
        this._oswList = [];
        this._oswCommandWindows = [];
        this._oswCommonWindows = [];
        this._oswSelectWindows = [];
    };

    Game_Map.prototype.addOswList = function(type, id) {
        if (!this._oswList) this._oswList = [];
        if (!this._oswList.some(function(list){
            return list.type === type && list.id === id;
        })) this._oswList.push({type:type, id:id, creative:false});
        if (type === Game_OswBase.WINDOW_COMMON && !this._oswCommonWindows[id]) {
            this._oswCommonWindows[id] = new Game_OswCommon(Game_OswBase.SCENE_MAP, id);
        }
        if (type === Game_OswBase.WINDOW_COMMAND && !this._oswCommandWindows[id]) {
            this._oswCommandWindows[id] = new Game_OswCommand(Game_OswBase.SCENE_MAP, id);
        }
        if (type === Game_OswBase.WINDOW_SELECTABLE && !this._oswSelectWindows[id]) {
            this._oswSelectWindows[id] = new Game_OswSelectable(Game_OswBase.SCENE_MAP, id);
        }
    };

    Game_Map.prototype.commandWindow = function(windowId) {
        return this._oswCommandWindows[windowId];
    };

    Game_Map.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_Map.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_Map.prototype.selectWindow = function(windowId) {
        return this._oswSelectWindows[windowId];
    };

    //=============================================================================
    // Game_Party
    // パーティーデータクラスに、バトルシーン用のウィンドウ設定を追加
    //=============================================================================

    Game_Party.prototype.reserveMembers = function() {
        return this.allMembers().slice(this.battleMembers().length);
    };

    var _OSW_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _OSW_Game_Party_initialize.call(this);
        this._oswList = [];
        this._oswCommonWindows = [];
    };

    Game_Party.prototype.addOswList = function(type, id) {
        if (!this._oswList) this._oswList = [];
        if (!this._oswList.some(function(list){
            return list.type === type && list.id === id;
        })) this._oswList.push({type:type, id:id, creative:false});
        if (type === Game_OswBase.WINDOW_COMMON && !this._oswCommonWindows[id]) {
            this._oswCommonWindows[id] = new Game_OswCommon(Game_OswBase.SCENE_BATTLE, id);
            this._oswCommonWindows[id].createWindow();
        }
    };

    Game_Party.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    //=============================================================================
    // Game_OswScene
    // オリジナルシーン設定用データクラス
    //=============================================================================

    Game_OswScene.prototype.initialize = function() {
        this._interpreter = new Game_Interpreter();
        this._oswIndex = -1;
        this._active = false;
        this._oswList = [];
        this._oswCommandWindows = [];
        this._oswCommonWindows = [];
        this._oswSelectWindows = [];
    };

    Game_OswScene.prototype.addOswList = function(type, id) {
        if (!this._oswList) this._oswList = [];
        if (!this._oswList.some(function(list){
            return list.type === type && list.id === id;
        })) this._oswList.push({type:type, id:id, creative:false});
        if (type === Game_OswBase.WINDOW_COMMON && !this._oswCommonWindows[id]) {
            this._oswCommonWindows[id] = new Game_OswCommon(Game_OswBase.SCENE_ORIGINAL, id);
        }
        if (type === Game_OswBase.WINDOW_COMMAND && !this._oswCommandWindows[id]) {
            this._oswCommandWindows[id] = new Game_OswCommand(Game_OswBase.SCENE_ORIGINAL, id);
        }
        if (type === Game_OswBase.WINDOW_SELECTABLE && !this._oswSelectWindows[id]) {
            this._oswSelectWindows[id] = new Game_OswSelectable(Game_OswBase.SCENE_ORIGINAL, id);
        }
    };

    Game_OswScene.prototype.commandWindow = function(windowId) {
        return this._oswCommandWindows[windowId];
    };

    Game_OswScene.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_OswScene.prototype.selectWindow = function(windowId) {
        return this._oswSelectWindows[windowId];
    };

    Game_OswScene.prototype.update = function(sceneActive) {
        if (sceneActive) {
            this._active = true;
            this.updateInterpreter();
        } else {
            this._active = false;
        }
    };

    Game_OswScene.prototype.updateInterpreter = function() {
        for (;;) {
            this._interpreter.update();
            if (this._interpreter.isRunning()) {
                return;
            }
            if (!this.setupStartingEvent()) {
                return;
            }
        }
    };

    Game_OswScene.prototype.setupStartingEvent = function() {
        if (this._interpreter.setupReservedCommonEvent()) {
            return true;
        }
        if (this.setupTestEvent()) {
            return true;
        }
        return false;
    };

    Game_OswScene.prototype.setupTestEvent = function() {
        if ($testEvent) {
            this._interpreter.setup($testEvent, 0);
            $testEvent = null;
            return true;
        }
        return false;
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================
    //専用のレイヤーを作成
    Scene_Base.prototype.createOswWindowLayer = function() {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._oswWindowLayer = new WindowLayer();
        this._oswWindowLayer.move(x, y, width, height);
        this.addChild(this._oswWindowLayer);
    };

    Scene_Base.prototype.addOswWindow = function(window) {
        this._oswWindowLayer.addChild(window);
    };

    Scene_Base.prototype.isOSWScene = function() {
        return false;
    };

    //------------------------------------------------------------------------
    // 全ウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createAllOswWindows = function(gameData) {
        this._oswCommandWindows = [];
        this._oswCommonWindows = [];
        this._oswSelectWindows = [];
        gameData._oswList.forEach( function(window) {
            this.createOswWindow(gameData, window);
        },this);
    };

    Scene_Base.prototype.createOswWindow = function(gameData, window) {
        switch (window.type) {
            case Game_OswBase.WINDOW_COMMON:
                if (this._oswCommonWindows[window.id]) return;
                var gameWindow = gameData.commonWindow(window.id);
                this.createCommonWindow(window.id, gameWindow);
                break;
            case Game_OswBase.WINDOW_COMMAND:
                if (this._oswCommandWindows[window.id]) return;
                var gameWindow = gameData.commandWindow(window.id);
                this.createCommandWindow(window.id, gameWindow);
                break;
            case Game_OswBase.WINDOW_SELECTABLE:
                if (this._oswSelectWindows[window.id]) return;
                var gameWindow = gameData.selectWindow(window.id);
                this.createSelectWindow(window.id, gameWindow);
                break;
        }
    };

    Scene_Base.prototype.updateCreateOswWindows = function(gameData) {
        gameData._oswList.forEach( function(window) {
            if (window.creative) return;
            this.createOswWindow(gameData, window);
            window.creative = true;
        },this);
    };

    //------------------------------------------------------------------------
    // コマンドウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createCommandWindow = function(windowId, gameWindow) {
        this._oswCommandWindows[windowId] = new Window_OswCommand(gameWindow);
        var window = this._oswCommandWindows[windowId];
        window.setMethodHandler(gameWindow);
        this.addOswWindow(window);
    };

    //------------------------------------------------------------------------
    // コモンウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createCommonWindow = function(windowId, window) {
        this._oswCommonWindows[windowId] = new Window_OswCommon(window);
        if (window.isBattle()) {
            this.addWindow(this._oswCommonWindows[windowId]);
        } else {
            this.addOswWindow(this._oswCommonWindows[windowId]);
        }
    };

    //------------------------------------------------------------------------
    // セレクトウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createSelectWindow = function(windowId, gameWindow) {
        this._oswSelectWindows[windowId] = new Window_OswSelect(gameWindow);
        var window = this._oswSelectWindows[windowId];
        window.setMethodHandler(gameWindow);
        this.addOswWindow(window);
    };

    Scene_Base.prototype.changeActivateWindow = function(window, windowType, windowId, hide, deselect, varId) {
        if (hide) window.hide();
        if (deselect) window.deselect();
        window._window.deactivate();
        if (varId) $gameVariables.setValue(varId, window.index());
        switch (windowType) {
            case Game_OswBase.WINDOW_COMMAND:
                var newWindow = this._oswCommandWindows[windowId];
                break;
            case Game_OswBase.WINDOW_SELECTABLE:
                var newWindow = this._oswSelectWindows[windowId];
                break;
        }
        if (newWindow) {
            newWindow._window.activate();
            newWindow.show();
            newWindow.select(newWindow.index());
        }
    };
    
    //=============================================================================
    // Scene_Map
    // マップシーンに追加
    //=============================================================================

    var _OSW_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _OSW_Scene_Map_createSpriteset.call(this);
        this.createOswWindowLayer();
    };

    var _OSW_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createAllOswWindows($gameMap);
        _OSW_Scene_Map_createAllWindows.call(this);
    };

    var _OSW_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _OSW_Scene_Map_update.call(this);
        this.updateCreateOswWindows($gameMap);
    };

    //=============================================================================
    // Scene_Battle
    // バトルシーンに追加
    //=============================================================================

    var _OSW_Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
    Scene_Battle.prototype.createStatusWindow = function() {
        this.createAllOswWindows($gameParty);
        _OSW_Scene_Battle_createStatusWindow.call(this);
    };

    //=============================================================================
    // Scene_OSW
    // オリジナルシーン
    //=============================================================================

    function Scene_OSW() {
        this.initialize.apply(this, arguments);
    }

    Scene_OSW.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_OSW.prototype.constructor = Scene_OSW;

    Scene_OSW.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_OSW.prototype.createWindowLayer = function() {
        this.createOswWindowLayer();
        Scene_MenuBase.prototype.createWindowLayer.call(this);
    };

    Scene_OSW.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createAllOswWindows($gameOswData);
    };

    Scene_OSW.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = FTKR.OSW.original.bgimage;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadSystem(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_OSW.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        var active = this.isActive();
        $gameOswData.update(active);
        this.updateCreateOswWindows($gameOswData);
    };

    Scene_OSW.prototype.isOSWScene = function() {
        return true;
    };

    //=============================================================================
    // Window_Base
    // 共通処理を追加
    //=============================================================================

    Window_Base.prototype.updateOswShow = function() {
        if (this._window._showSwitchId > 0) {
            if ($gameSwitches.value(this._window._showSwitchId)) {
                this._window._show = true;
            } else {
                this._window._show = false;
                this.deactivate();
            }
        }
        if (this._show !== this._window._show) {
            this._show = this._window._show;
            if (this._show) {
                this.updateOswPlacement();
                this.show();
                this.refresh();
            } else {
                this.hide();
            }
        }
    };

    Window_Base.prototype.updateOswActive = function() {
        if (this.active !== this._window._active) {
            if (this._window._active) {
                this.activate();
                var index = Math.max(this._window._index, 0);
                this.select(index);
            } else {
                this.deactivate();
            }
        }
    };

    Window_Base.prototype.updateOswSelect = function() {
        if (!this.active && this._window._deselect) {
            this.deselect();
        }
    };

    Window_Base.prototype.updateOswRefresh = function() {
        if (this._window.requestRefresh()) {
            this.updateOswPlacement();
            this.refresh();
            console.log(this);
            this._window.clearRequestRefresh();
        }
    };

    Window_Base.prototype.updateOswPlacement = function() {
        this.move(
            this._window._x,
            this._window._y,
            this._window._width,
            this._window._height
        );
    };

    Window_Base.prototype.updateOswIndex = function() {
        if (!this.active) return;
        if ($gameOswData._active && ($gameOswData._oswIndex !== this.index() || $gameOswData._oswItem !== this.item(this.index()))) {
            $gameOswData._oswIndex = this.index();
            $gameOswData._oswItem = this.item(this.index());
        } else if (!$gameOswData._active && ($gameMap._oswIndex !== this.index() !== $gameMap._oswItem !== this.item(this.index()))) {
            $gameMap._oswIndex = this.index();
            $gameMap._oswItem = this.item(this.index());
        }
        if (this._window._clearSelectIndex) {
            this.select(0);
            this._window._clearSelectIndex = false;
        }
    };

    Window_Base.prototype.convertTextWidth = function(text) {
        var tw = 0;
        var conv = this.convertEscapeCharacters(text);
        if (/i\[(\d+)\]/i.test(conv)) {
            conv = (conv.toUpperCase()).replace(/i\[(\d+)\]/ig, '');
            tw += Window_Base._iconWidth;
        }
        if (/c\[(\d+)\]/i.test(conv)) {
            conv = (conv.toUpperCase()).replace(/c\[(\d+)\]/ig, '');
        }
        if (conv.match(/lw\[(\d+),?([^\]]+)\]/i)) {
            tw += RegExp.$1;
            conv = (conv.toUpperCase()).replace(/lw\[(\d+),?([^\]]+)\]/ig, '');
        }
        tw += this.textWidth(conv);
        return tw;
    };

    Window_Base.prototype.convertAlign = function(align) {
        switch (align) {
            case 'left':
                return 0;
            case 'center':
                return 1;
            case 'right':
                return 2;
        }
        return 0;
    };

    //=============================================================================
    // Window_OswCommand
    // コマンドウィンドウクラス
    //=============================================================================

    function Window_OswCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_OswCommand.prototype = Object.create(Window_Command.prototype);
    Window_OswCommand.prototype.constructor = Window_OswCommand;

    Window_OswCommand.prototype.initialize = function(window) {
        this._window = window;
        this._width = window._width;
        this._height = window._height;
        Window_Command.prototype.initialize.call(this, window._x, window._y);
        this._show = false;
        this.hide();
        this.deactivate();
        this.select(this._window._index);
        this.refresh();
    };

    Window_OswCommand.prototype.item = function(index) {
        return null;
    };

    Window_OswCommand.prototype.windowWidth = function() {
        return this._width;
    };

    Window_OswCommand.prototype.windowHeight = function() {
        return !!this._height ? this._height : this.fittingHeight(this.numVisibleRows());
    };

    Window_OswCommand.prototype.maxCols = function() {
        return this._window._maxCols;
    };

    Window_OswCommand.prototype.itemTextAlign = function() {
        return this._window ? this._window._align : 'left';
    };

    Window_OswCommand.prototype.standardFontSize = function() {
        return this._window._fontSize;
    };

    Window_OswCommand.prototype.standardPadding = function() {
        return this._window._padding;
    };

    Window_OswCommand.prototype.lineHeight = function() {
        return this._window._lineHeight;
    };

    Window_OswCommand.prototype.standardBackOpacity = function() {
        return this._window._opacity;
    };

    Window_OswCommand.prototype.loadWindowskin = function() {
        var skin = this._window && this._window._windowSkin || 'Window';
        this.windowskin = ImageManager.loadSystem(skin);
    };
    
    Window_OswCommand.prototype._refreshFrame = function() {
        if (this._window._frame) Window.prototype._refreshFrame.call(this);
    };

    Window_OswCommand.prototype.makeCommandList = function() {
        this._window._list.forEach( function(cmd) {
            var enabled = eval(this.convertEscapeCharacters(cmd.enabled));
            this.addCommand(cmd.name, cmd.symbol, enabled);
        },this);
    };

    Window_OswCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        if (FTKR.OSW.command.escape) {
            var tw = this.convertTextWidth(this.commandName(index));
            var offset = this.convertAlign(align) * (rect.width - tw) / 2;
            this.drawTextEx(this.commandName(index), rect.x + offset, rect.y);
        } else {
            this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
        }
    };

    Window_OswCommand.prototype.update = function() {
        if (this._window._index !== this.index()) {
            this._window._index = this.index();
        }
        this.updateOswIndex();
        this.updateOswShow();
        this.updateOswActive();
        this.updateOswSelect();
        this.updateOswRefresh();
        Window_Command.prototype.update.call(this);
    };

    Window_OswCommand.prototype.refresh = function() {
        if (this._window && this._window._windowSkin) {
            this.loadWindowskin();
            this._refreshAllParts();
        }
        Window_Command.prototype.refresh.call(this);
        this.setMethodHandler(this._window);
    };

    Window_OswCommand.prototype.setMethodHandler = function(gameWindow) {
        for (var prop in this._handlers) {
            delete this._handlers[prop];
        }
        gameWindow._list.forEach(function(cmd) {
            var method = eval(cmd.method);
            this.setHandler(cmd.symbol, method);
        },this);
        if (gameWindow._cancel.method) this.setHandler('cancel', eval(gameWindow._cancel.method));
    };

    //=============================================================================
    // Window_OswCommon
    // コモンウィンドウクラス
    //=============================================================================

    function Window_OswCommon() {
        this.initialize.apply(this, arguments);
    }

    Window_OswCommon.prototype = Object.create(Window_Base.prototype);
    Window_OswCommon.prototype.constructor = Window_OswCommon;

    Window_OswCommon.prototype.initialize = function(window) {
        this._window = window;
        this._actor = window._actor || null;
        this._item = null;
        Window_Base.prototype.initialize.call(this, 
            window._x, window._y, window._width, window._height);
        this._show = false;
        this._referenceIndex = -1;
        this.hide();
        this.refresh();
    };

    Window_OswCommon.prototype.standardFontSize = function() {
        return this._window._fontSize;
    };

    Window_OswCommon.prototype.standardPadding = function() {
        return this._window._padding;
    };

    Window_OswCommon.prototype.lineHeight = function() {
        return this._window._lineHeight;
    };

    Window_OswCommon.prototype.standardBackOpacity = function() {
        return this._window._opacity;
    };

    Window_OswCommon.prototype.loadWindowskin = function() {
        var skin = this._window && this._window._windowSkin || 'Window';
        this.windowskin = ImageManager.loadSystem(skin);
    };
    
    Window_OswCommon.prototype._refreshFrame = function() {
        if (this._window._frame) Window.prototype._refreshFrame.call(this);
    };

    Window_OswCommon.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateOswShow();
        this.updateReference();
        this.updateOswRefresh();
    };

    Window_OswCommon.prototype.refresh = function() {
        if (this._window && this._window._windowSkin) {
            this.loadWindowskin();
            this._refreshAllParts();
        }
        if (this.contents) {
            this.contents.clear();
            this._actor = this._window._actor || this._actor;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawContent(0, 0, w, h);
        }
    };

    Window_OswCommon.prototype.isEnabledChangePaintOpacity = function(actor) {
        return true;
    };

    Window_OswCommon.prototype.drawContent = function(x, y, width, height) {
        if (Imported.FTKR_CSS && this._window._cssContent) {
            this._window.content().item = this._item;
            this.drawCssActorStatus(0, this._actor, x, y, width, height,
                                    this._window.content());
        } else {
            this._window.texts().forEach( function(text, i){
                this.drawTextEx(text, x, y + this.lineHeight() * i);
            },this);
        }
    };

    Window_OswCommon.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        var item = this._window.content().item;
        FTKR.setGameData(actor, null, item);
        return FTKR.evalFormula(formula);
    };

    Window_OswCommon.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        var item = this._window.content().item;
        FTKR.setGameData(actor, null, item);
        return FTKR.evalStrFormula(formula);
    };

    Window_OswCommon.prototype.updateReference = function() {
        if (this._window.referenceId() == -1) return;
        var window = SceneManager._scene._oswSelectWindows[this._window.referenceId()];
        if (this._referenceIndex === window.index()) return;
        this._referenceIndex = window.index();
        this._actor = window._actor;
        this._item = window.item(window.index());
        this.refresh();
    };

    //=============================================================================
    // Window_OswSelect
    // セレクトウィンドウクラス
    //=============================================================================

    function Window_OswSelect() {
        this.initialize.apply(this, arguments);
    }

    Window_OswSelect.prototype = Object.create(Window_Selectable.prototype);
    Window_OswSelect.prototype.constructor = Window_OswSelect;

    Window_OswSelect.prototype.initialize = function(window) {
        this._window = window;
        Window_Selectable.prototype.initialize.call(this, window._x, window._y, window._width, window._height);
        this._actor = null;
        this._data = [];
        this._show = false;
        this._reference = [];
        this.hide();
        this.deactivate();
        this.refresh();
    };

    Window_OswSelect.prototype.maxCols = function() {
        return this._window._maxCols;
    };

    Window_OswSelect.prototype.standardFontSize = function() {
        return this._window._fontSize;
    };

    Window_OswSelect.prototype.standardPadding = function() {
        return this._window._padding;
    };

    Window_OswSelect.prototype.lineHeight = function() {
        return this._window._lineHeight;
    };

    Window_OswSelect.prototype.itemHeight = function() {
        return this.lineHeight() * this._window._cursorHeight;
    };

    Window_OswSelect.prototype.standardBackOpacity = function() {
        return this._window._opacity;
    };

    Window_OswSelect.prototype.loadWindowskin = function() {
        var skin = this._window && this._window._windowSkin || 'Window';
        this.windowskin = ImageManager.loadSystem(skin);
    };
    
    Window_OswSelect.prototype._refreshFrame = function() {
        if (this._window._frame) Window.prototype._refreshFrame.call(this);
    };

    Window_OswSelect.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_OswSelect.prototype.setItemsList = function() {
        switch (this._window._drawType) {
            case Game_OswBase.SELECT_TEXT_LIST:
                return this._window._list;
            case Game_OswBase.SELECT_PARTY_LIST:
                switch (this._window._listType) {
                    case Game_OswBase.SELECT_PARTY_ALL:
                        return $gameParty.allMembers();
                    case Game_OswBase.SELECT_PARTY_BATTLE:
                        return $gameParty.battleMembers();
                    case Game_OswBase.SELECT_PARTY_RESERVE:
                        return $gameParty.reserveMembers();
                }
            case Game_OswBase.SELECT_ACTOR_LIST:
                return $dataActors;
            case Game_OswBase.SELECT_CLASS_LIST:
                return $dataClasses;
            case Game_OswBase.SELECT_SKILL_LIST:
                return $dataSkills;
            case Game_OswBase.SELECT_ITEM_LIST:
                return $dataItems;
            case Game_OswBase.SELECT_WEAPON_LIST:
                return $dataWeapons;
            case Game_OswBase.SELECT_ARMOR_LIST:
                return $dataArmors;
            case Game_OswBase.SELECT_ENEMY_LIST:
                return $dataEnemies;
            case Game_OswBase.SELECT_TROOP_LIST:
                return $dataTroops;
        }
        return [];
    };

    Window_OswSelect.prototype.setMethodHandler = function(gameWindow) {
        for (var prop in this._handlers) {
            delete this._handlers[prop];
        }
        this.setHandler('ok', eval(gameWindow._ok.method));
        this.setHandler('cancel', eval(gameWindow._cancel.method));
    };

    Window_OswSelect.prototype.refresh = function() {
        if (this._window && this._window._windowSkin) {
            this.loadWindowskin();
            this._refreshAllParts();
        }
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
        this.setMethodHandler(this._window);
    };

    Window_OswSelect.prototype.isEnabledChangePaintOpacity = function(actor) {
        return true;
    };

    Window_OswSelect.prototype.item = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_OswSelect.prototype.isEnabled = function(item) {
        FTKR.setGameData(this._window._actor, null, item);
        var result = FTKR.evalFormula(this._window._enable);
        return result;
    };

    Window_OswSelect.prototype.makeItemList = function() {
        var list = this.setItemsList();
        if (this._window._drawType) {
            this._data = list.filter( function(item) {
                return item && item.name && this.isEnabled(item);
            },this);
        } else {
            this._data = list;
        }
    };

    Window_OswSelect.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        var item = this._window.content().item;
        FTKR.setGameData(actor, null, item);
        return FTKR.evalFormula(formula);
    };

    Window_OswSelect.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        var item = this._window.content().item;
        FTKR.setGameData(actor, null, item);
        return FTKR.evalStrFormula(formula);
    };

    Window_OswSelect.prototype.drawItem = function(index) {
        var lss = this._window.content();
        var rect = this.itemRect(index);
        if (this._window._drawType) {
            this._actor = this.setActor(index);
            lss.item = this.item(index);
            lss.opacity = this.setCssOpacity(index);
            this.drawCssActorStatus(index, this._actor, rect.x, rect.y, rect.width, rect.height, lss);
            lss.opacity = false;
        } else {
            this._actor = null;
            lss.item = null;
            this.drawTextEx(this._data[index], rect.x, rect.y, rect.width);
        }
    };

    Window_OswSelect.prototype.setActor = function(index) {
        switch (this._window._listType) {
            case Game_OswBase.SELECT_PARTY_ALL:
                return $gameParty.allMembers()[index];
            case Game_OswBase.SELECT_PARTY_BATTLE:
                return $gameParty.battleMembers()[index];
            case Game_OswBase.SELECT_PARTY_RESERVE:
                return $gameParty.reserveMembers()[index];
            case Game_OswBase.SELECT_ACTOR:
                return this.item(index) ? $gameActors.actor(this.item(index).id) : null;
        }
        return this._window._actor;
    };

    Window_OswSelect.prototype.setCssOpacity = function(index) {
        switch (this._window._listType) {
            case Game_OswBase.SELECT_ACTOR:
                return true;
        }
        return false;
    };

    Window_OswSelect.prototype.update = function() {
        if (this._window._index !== this.index()) {
            this._window._index = this.index();
        }
        this.updateOswIndex();
        this.updateOswShow();
        this.updateOswActive();
        this.updateOswSelect();
        this.updateOswRefresh();
        Window_Selectable.prototype.update.call(this);
    };

    Window_OswSelect.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this._window._drawType) {
            this._actor = this.setActor(index);
            this._window.content().item = this.item(index);
        }
    };

}());//EOF
