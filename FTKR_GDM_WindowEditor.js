//=============================================================================
// トリアコンタンさんのGUI画面デザインプラグインの機能追加
// FTKR_GDM_WindowEditor.js
// プラグインNo : 86
// 作成者     : フトコロ
// 作成日     : 2018/07/15
// 最終更新日 : 2018/09/15
// バージョン : v0.9.17
//=============================================================================
// GraphicalDesignMode.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================


var Imported = Imported || {};
Imported.FTKR_GDM = true;

var FTKR = FTKR || {};
FTKR.GDM = FTKR.GDM || {};

//=============================================================================
/*:
 * @plugindesc v0.9.17 トリアコンタンさんのGUI画面デザインプラグインの機能追加
 * @author フトコロ
 *
 * @param autoCreate
 * @text ウィンドウ設定自動生成
 * @desc 各シーン表示時にウィンドウ設定を自動で作成する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
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
 * @param Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * @type boolean
 * @on 非表示
 * @off 表示する
 * @default false
 * 
 * @param Window Background Image Name
 * @desc ウィンドウの背景に使用する画像ファイル名を指定します。
 * 画像ファイルは/img/picturesに保存すること
 * @default []
 * @require 1
 * @dir img/pictures/
 * @type file[]
 * 
 * @param --オリジナルシーンの設定--
 * @desc 
 * 
 * @param Scene Background Image Name
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
 * @type select
 * @option left
 * @option center
 * @option right
 * @default left
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
 * @default 1
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
 * このプラグインは、トリアコンタンさんの
 * GUI画面デザインプラグイン(GraphicalDesignMode.js)の機能拡張プラグインです。
 * 
 * ウィンドウの作成、編集、および削除(*1)が可能です。
 * 
 * (*1)削除可能なウィンドウは、このプラグインで作成したウィンドウのみです。
 * 
 * 
 * このプラグインは、試作版です。
 * 
 * 動作がまだ十分に安定していないため、使用にはご注意ください。
 * また、正式版になるまでに仕様が変わり、従来のセーブデータと
 * 互換性がなくなる可能性があります。
 * 
 * 不具合と思われる現象が発生したら、↓ までご連絡ください。
 * [ツクマテさん] https://tm.lucky-duet.com/viewtopic.php?f=68&t=6309
 * [Twitter    ] https://twitter.com/futokoro_mv
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使い方
 *-----------------------------------------------------------------------------
 * １．このプラグインは、マウスとキーボードを使います。
 * 
 * ２．ウィンドウの作成・編集・削除を行うためには、
 * GUI画面デザインプラグイン(GraphicalDesignMode.js)をデザインモードに
 * 設定してください。
 * 
 * ３．右クリックでウィンドウ編集用のメニューを表示します。
 *    ウィンドウ上で右クリック　　　　：そのウィンドウを編集できます。
 *    ウィンドウがない場所で右クリック：ウィンドウを新規作成できます。
 * 
 * ４．ウィンドウ上で左クリックで表示内容の編集メニューを表示します。
 * コマンドウィンドウのコマンドにマウスポインタを合わせて、左クリックすると
 * そのコマンドの表示や実行内容を編集できます。
 * 
 * ５．編集した内容は、「Ctrl + S」でJSONファイルに保存します。
 * JSONファイルを作成した後は、デザインモードを解除してもその設定は有効です。
 * 
 * なお、作成したJSONファイルの内部データは
 * GUI画面デザインプラグイン(GraphicalDesignMode.js)単体で作成されるものと
 * 別物です。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. このプラグインには、GraphicalDesignMode.jsプラグインが必要です。
 *    このプラグインは、GraphicalDesignMode.jsの下に配置してください。
 * 
 * 3. このプラグインには、 FTKR_CustomSimpleActorStatus プラグインが必要です。
 *    このプラグインは、FTKR_CustomSimpleActorStatusの下に配置してください。
 *    なお、FTKR_CustomSimpleActorStatus v3.2.0 以降が必要です。
 * 
 * 4. このプラグインは、FTKR_OriginalSceneWindowプラグインと組み合わせて
 *    使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2018 Futokoro
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
 * v0.9.17 - 表示エリアのパラメータの初期設定を見直し。
 * v0.9.16 - アイテム(スキルや武器防具なども含む)用の表示パラメータをリストに追加。
 * v0.9.15 - カーソル高さおよび、表示列数を編集しても正しく反映されない不具合を修正。
 *           一部の処理を FTKR_CustomSimpleActorStatus に移動。
 * v0.9.14 - スキル画面のスキルタイプウィンドウが正しく表示できない不具合を修正。
 *           FTKR_ItemSubCommand.jsとの競合回避
 * v0.9.13 - 表示エリアのパラメータ入力方式を、リストから選択する方式に変更。
 * v0.9.12 - 一部コマンドの選択可否処理を見直し。
 *           セレクトウィンドウのアクター設定が正しく反映されない不具合を修正。
 *           リスト形式の編集項目を、ウィンドウを新たに表示し選択する方式に変更。
 * v0.9.11 - 一部のウィンドウの編集内容(表示列、表示列間隔)が反映されない不具合を修正。
 * v0.9.10 - 編集ウィンドウの表示位置が画面右に寄ってしまう不具合を修正。
 *           一部のウィンドウの編集内容反映されない不具合を修正。
 * v0.9.9 - 表示していないウィンドウも編集できてしまう不具合を修正。
 *          FTKR_CustomSimpleActorStatusのv3.0.0に追加したステータスの
 *          新表示方式に対応。
 *          マウスポインタを合わせたウィンドウの行の色を変える機能を修正。
 * v0.9.8 - 背景画像を指定しない場合にエラーになる不具合修正。
 *          マップシーンで作成したウィンドウが生成されない不具合修正。
 *          作成したウィンドウの自動更新機能を追加。
 *          FTKR_CustomSimpleActorStatusのv3.0.0に追加したステータスの
 *          新表示方式に変更、仮実装。
 * v0.9.7 - FTKR_OriginalSceneWindow.js v1.5.6 の不具合修正を反映
 * v0.9.6 - ウィンドウ背景画像の設定機能を実装
 * v0.9.5 - コモンウィンドウのセレクト参照機能を実装
 * v0.9.4 - 表示スイッチを無効にできない不具合を修正
 *          プラグインパラメータの初期値見直し
 *          マウスポインタで選択したウィンドウの行の個別編集処理を見直し
 * v0.9.3 - マップ上のキャラのマウス操作を無効化
 *          コマンドの実行処理を見直し
 *          コモンウィンドウで初期のテキストが表示されない不具合を修正
 *          セレクトウィンドウのテキスト入力処理を実装
 *          マウスポインタを合わせたウィンドウの枠色を変更する処理を無効化(暫定)
 * v0.9.2 - 編集メニューの文字サイズや表示位置を調整
 *          表示列間隔と表示幅間隔が正しく反映されない不具合を修正
 * v0.9.1 - シーン切替時に作成したウィンドウが再表示されない不具合修正
 * v0.9.0 - 2018/07/15 : 試作版作成
 * 
*/
//=============================================================================

function Game_OswData() {
    this.initialize.apply(this, arguments);
}

function Window_OswCommon() {
    this.initialize.apply(this, arguments);
}

function Window_OswCommand() {
    this.initialize.apply(this, arguments);
}

function Window_OswSelect() {
    this.initialize.apply(this, arguments);
}

function Scene_OSW() {
    this.initialize.apply(this, arguments);
}

(function() {
    if (!DataManager._databaseFileCp) {
        return;
    }

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
    //プラグインパラメータを取得
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_GDM_WindowEditor');
    var autoCreate = paramParse(parameters['autoCreate'] || false);
    FTKR.GDM = {
        basic:{
            enabled    :true,
            fontSize   :Number(parameters['Font Size'] || 28),
            padding    :Number(parameters['Window Padding'] || 0),
            lineHeight :Number(parameters['Window Line Height'] || 36),
            opacity    :Number(parameters['Window Opacity'] || 0),
            hideFrame  :paramParse(parameters['Hide Frame'] || false),
        },
        backgrounds   :paramParse(parameters['Window Background Image Name']) || [],
        original:{
            bgimage   :String(parameters['Scene Background Image Name'] || ''),
        },
        command:{
            x             :Number(parameters['Command Position X'] || 0),
            y             :Number(parameters['Command Position Y'] || 0),
            width         :Number(parameters['Command Width'] || 240),
            maxCols       :Number(parameters['Command Max Cols'] || 1),
            align         :String(parameters['Command Align'] || 'left'),
        },
        common:{
            width         :Number(parameters['Common Width'] || 240),
            height        :Number(parameters['Common Height'] || 240),
            content:{
                text1     :'',
                text2     :'',
                text3     :'',
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
                text1     :'',
                text2     :'',
                text3     :'',
                space     :String(parameters['Select Status Space'] || '0,0,0,0'),
                spaceIn   :Number(parameters['Select Status Space In Text'] || 0),
                widthRate :String(parameters['Select Status Width Rate'] || '1,0,0'),
            },
        },
    };

    //=============================================================================
    //GraphicalDesignMode側のプラグインパラメータを取得
    //=============================================================================
    var pluginName    = 'GraphicalDesignMode';
    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (value == null) return null;
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return value.toUpperCase() === 'ON' || value.toUpperCase() === 'TRUE';
    };

    var paramAutoSave        = getParamBoolean(['AutoSave', '自動保存']);
    var paramGridSize        = getParamNumber(['GridSize', 'グリッドサイズ'], 0) || 0;

    var getClassName = function(object) {
        return object.constructor.toString().replace(/function\s+(.*)\s*\([\s\S]*/m, '$1');
    };

    //=============================================================================
    // 自作定数
    //=============================================================================

    var optionFontSize   = 21;
    var optionLineHeight = 28;
    var optionOffsetX    = 50;

    var $configSelectLists = {};

    var SCENE_LISTS = [
        '直接入力',
        'Scene_Item',
        'Scene_Skill',
        'Scene_Equip',
        'Scene_Status',
        'Scene_Save',
        'Scene_Load',
        'Scene_Options',
        'Scene_OSW',
    ];

    var COMMAND_METHOD = [
        'なし',
        'シーン終了',
        'シーン変更',
        'コモンイベント',
        'ウィンドウアクティブ'
    ];

    var WINDOW_NAME = [
        'Window_OswCommon',
        'Window_OswCommand',
        'Window_OswSelect'
    ];

    Game_OswData.WINDOW_COMMON     = 0;
    Game_OswData.WINDOW_COMMAND    = 1;
    Game_OswData.WINDOW_SELECTABLE = 2;

    Game_OswData.SCENE_ORIGINAL = 0;
    Game_OswData.SCENE_MAP      = 1;
    Game_OswData.SCENE_BATTLE   = 2;

    Game_OswData.SELECT_TEXT_LIST   = 0;
    Game_OswData.SELECT_PARTY_LIST  = 1;
    Game_OswData.SELECT_ACTOR_LIST  = 2;
    Game_OswData.SELECT_CLASS_LIST  = 3;
    Game_OswData.SELECT_SKILL_LIST  = 4;
    Game_OswData.SELECT_ITEM_LIST   = 5;
    Game_OswData.SELECT_WEAPON_LIST = 6;
    Game_OswData.SELECT_ARMOR_LIST  = 7;
    Game_OswData.SELECT_ENEMY_LIST  = 8;
    Game_OswData.SELECT_TROOP_LIST  = 9;
    
    Game_OswData.SELECT_PARTY_ALL     = 0;
    Game_OswData.SELECT_PARTY_BATTLE  = 1;
    Game_OswData.SELECT_PARTY_RESERVE = 2;
    Game_OswData.SELECT_ACTOR         = 3;

    //=============================================================================
    // 自作関数
    //=============================================================================

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

    //配列を複製する
    var copyArray = function(arr) {
        var newArr = [];
        arr.forEach(function(data, prop) {
            if (data instanceof Object) {
                if (data instanceof Array) {
                    newArr[prop] = copyArray(data);
                } else {
                    newArr[prop] = copyObject(data);
                }
            } else {
                newArr[prop] = data;
            }
        });
        return newArr;
    };

    //オブジェクトを複製する
    var copyObject = function(obj) {
        var newObj = {};
        Object.getOwnPropertyNames(obj).forEach(function(prop) {
            var data = obj[prop];
            if (data instanceof Object) {
                if (data instanceof Array) {
                    newObj[prop] = copyArray(data);
                } else {
                    newObj[prop] = copyObject(data);
                }
            } else {
                newObj[prop] = data;
            }
        });
        return newObj;
    };

    //指定したコンフィグコンテンツに設定したシンボルのデータをオブジェクトからコピーする
    var copyConfigSymbolvalues = function(symbolArr, obj){
        var newObj = {};
        symbolArr.forEach(function(content){
            var type = content.type;
            if (type == 'subConfig') {
                content.options.subConfigs.forEach(function(sub){
                    if (sub.symbol &&
                      !['COMMAND', 'HANDLER'].contains(sub.symbol.toUpperCase())) {
                        var prop = sub.symbol;
                        newObj[prop] = obj[prop];
                    }
                });
            } else if (type == 'window') {
                var prop = content.symbol;
                newObj[prop] = copyArray(obj[prop]);
            } else if (content.symbol &&
                    !['COMMAND', 'HANDLER'].contains(content.symbol.toUpperCase())) {
                var prop = content.symbol;
                newObj[prop] = obj[prop];
            }
        });
        return newObj;
    };

    //オブジェクトbaseObjのプロパティをオブジェクトdestObjにコピーする
    var saveConfigValues = function(destObj, baseObj) {
        if (!(destObj instanceof Object) || !(baseObj instanceof Object)) return;
        Object.getOwnPropertyNames(baseObj).forEach(function(prop) {
            var data = baseObj[prop];
            if (data instanceof Object) {
                if (data instanceof Array) {
                    destObj[prop] = copyArray(data);
                } else {
                    destObj[prop] = copyObject(data);
                }
            } else {
                destObj[prop] = data;
            }
        });
    };

    //コンソール入力を呼び出す
    var getPromptResult = function(value) {
        var text = '値を入力してください';
        var result = window.prompt(text, value);//コンソールで直接入力
        TouchInput.clear();
        return !result ? value : result;
    };

    var graphicsMinSize = function() {
        return Math.min(Graphics.boxWidth, Graphics.boxHeight);
    };

    //入力した文字列から、データベースのオブジェクトデータを参照する
    var convertDataBase = function(data) {
        switch ((data + '').toUpperCase()) {
            case 'ACTOR':
                return $dataActors;
            case 'CLASS':
                return $dataClasses;
            case 'SKILL':
                return $dataSkills;
            case 'ITEM':
                return $dataItems;
            case 'WEAPON':
                return $dataWeapons;
            case 'ARMOR':
                return $dataArmors;
            case 'ENEMY':
                return $dataEnemies;
            case 'TROOP':
                return $dataTroops;
            case 'STATE':
                return $dataStates;
            case 'VARIABLE':
                return $dataSystem.variables;
            case 'SWITCH':
                return $dataSystem.switches;
        };
        return null;
    };

    var sceneName = function(arg) {
        switch (setArgStr(arg).toUpperCase()) {
            case 'オリジナル':
            case 'ORIGINAL':
                return 'Scene_OSW';
            case 'マップ':
            case 'MAP':
                return 'Scene_Map';
            case 'バトル':
            case 'BATTLE':
                return 'Scene_Battle';
            default:
                return null;
        }
    };

    var convertAlign = function(align) {
        switch (align) {
            case 'left':
                return 0;
            case 'center':
                return 1;
            case 'right':
                return 2;
            case 0:
                return 'left';
            case 1:
                return 'center';
            case 2:
                return 'right';
        }
        return undefined;
    };

    var deconvertOswMethod = function(text) {
        var method = {};
        var match = /(.+)\((.+)\)/.exec(text) || [];
        switch ((match[1] + '').toUpperCase()) {
            case 'ウィンドウアクティブ':
            case 'WINDOW_ACTIVE':
                method.type = 4;
                var newwindow = match[2].split(',');
                switch (newwindow[0].toUpperCase()) {
                    case 'コマンド':
                    case 'COMMAND':
                        var windowType = Game_OswData.WINDOW_COMMAND;
                        break;
                    case 'セレクト':
                    case 'SELECT':
                        var windowType = Game_OswData.WINDOW_SELECTABLE;
                        break;
                }
                var windowId = Number(newwindow[1]);
                method.detail = windowId + ',' + windowName(windowType);
                method.detail2 = Boolean(eval(newwindow[2]));
                break;
            case 'シーン変更':
            case 'CHANGE_SCENE':
                method.type = 2;
                SCENE_LISTS.some(function(list, i){
                    if (list == match[2]) {
                        method.detail = i;
                        return true;
                    }
                });
                break;
            case 'コモンイベント':
            case 'COMMON_EVENT':
                method.type = 3;
                method.detail = match[2];
                break;
            default:
                switch ((text + '').toUpperCase()) {
                    case 'シーン終了':
                    case 'END_SCENE':
                        method.type = 1;
                        break;
                    default:
                        method.type = 0;
                        break;
                }
        }
        return method;
    };

    var convertOswMethod = function(methodType, methodDetail, methodDetail2) {
        var method = COMMAND_METHOD[methodType];
        switch(methodType) {
            case 1://シーン終了
                return method;
            case 2://シーン変更
                var detail = isNaN(methodDetail) ? methodDetail : SCENE_LISTS[methodDetail];
                break;
            case 3://コモンイベント
                var detail = methodDetail;
                break;
            case 4://ウィンドウアクティブ
                var targetName = methodDetail;
                var detail = targetName + ';' + Boolean(methodDetail2);
                break;
            case 0://なし
            default:
                return '';
        }
        method += '(' + detail + ')';
        return method;
    };

    var setOswMethod = function(text) {
        var match = /(.+)\((.+)\)/.exec(text) || [];
        switch ((match[1] + '').toUpperCase()) {
            case 'ウィンドウアクティブ':
            case 'WINDOW_ACTIVE':
                var newwindow = match[2].split(';');
                var name = newwindow[0];
                var hide = Boolean(eval(newwindow[1]));
                var deselect = Boolean(eval(newwindow[2]));
                var varId = Number(newwindow[3]) || 0;
                var action = '"' + name + '",' + hide + ',' + deselect+ ',' + varId;
                return 'SceneManager._scene.changeActivateWindow.bind(SceneManager._scene,this,' + action + ')';
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

    var convertWindowName = function(windowType) {
        switch(windowType) {
            case Game_OswData.WINDOW_COMMON://0
                return 'Window_OswCommon';
            case Game_OswData.WINDOW_COMMAND://1
                return 'Window_OswCommand';
            case Game_OswData.WINDOW_SELECTABLE://2
                return 'Window_OswSelect';
        }
        return windowType;
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
    // デザインモード時の処理
    // 　デザインモードのみ実行
    //=============================================================================
    if (Utils.isDesignMode()) {

        var FTKR_METHOD_DATALIST = function(scene) {
            var list = scene ? scene._windowLayer.children : [];
            return [
                {type:'none'},
                {type:'none'},
                {type:'selectwindow', options:{select:SCENE_LISTS, string: true, prompt: true}},
                {type:'datawindow',   options:{data:$dataCommonEvents, property:'name'}},
                {type:'datawindow',   options:{data:list, property:'name', enabled:'data.isList()', string:true}}
            ];
        };

        var FTKR_METHOD_DATALIST2 = [
            {type:'none'},
            {type:'none'},
            {type:'none'},
            {type:'none'},
            {type:'selectwindow', options:{select:['ウィンドウ残す', 'ウィンドウ非表示化']}}
        ];

        FTKR_CSS = {
            NAME    :'名前',
            NICKNAME:'二つ名',
            CLASS   :'職業',
            LEVEL   :'レベル',
            HP      :'HP',
            MP      :'MP',
            TP      :'TP',
            FACE    :'顔画像',
            CHARA   :'歩行キャラ画像',
            SV      :'SV戦闘キャラ画像',
            STATE   :'ステート(横)', 
            STATE2  :'ステート(縦)',
            PROFILE :'プロフィール',
            PARAM   :'通常能力値',
            EQUIP   :'装備', 
            EPARAM  :'装備パラメータ', 
            EAOP    :'AOP装備パラメータ', 
            CUSTOM  :'カスタムパラメータ',
            GAUGE   :'カスタムゲージ', 
            AGAUGE  :'アクター別カスタムゲージ', 
            CGAUGE  :'職業別カスタムゲージ', 
            IMAGE   :'カスタム画像', 
            MESSAGE :'メッセージ', 
            TEXT    :'テキスト表示',
            EVAL    :'JS計算式(数値表示)',
            STREVAL :'JS計算式(文字列表示)', 
            LINE    :'横線', 
            INAME   :'アイテム名', 
            IICON   :'アイテムアイコン', 
            ITYPE   :'アイテムタイプ',
            IETYPE  :'アイテム装備タイプ',
            IDESC   :'アイテム説明', 
            ISCOPE  :'アイテム範囲', 
            IELEMENT:'アイテム属性', 
            IPARAM  :'アイテム設定詳細', 
        };

        TextManager.paramNames = function() {
            return $dataSystem ? $dataSystem.terms.params.slice(0, 8) : [];
        };

        TextManager.equipTypes = function() {
            return $dataSystem ? $dataSystem.equipTypes.slice(1, $dataSystem.equipTypes.length) : [];
        };

        var FTKR_CSS_CODES = function() {
            return [
                {text:'直接入力'},
                {text:FTKR_CSS.NAME,    value:'name',       type:'none'},
                {text:FTKR_CSS.NICKNAME,value:'nickname',   type:'none'},
                {text:FTKR_CSS.CLASS,   value:'class',      type:'none'},
                {text:FTKR_CSS.LEVEL,   value:'level',      type:'none'},
                {text:FTKR_CSS.HP,      value:'hp',         type:'none'},
                {text:FTKR_CSS.MP,      value:'mp',         type:'none'},
                {text:FTKR_CSS.TP,      value:'tp',         type:'none'},
                {text:FTKR_CSS.FACE,    value:'face(%1)',   type:'string',         options:{}},
                {text:FTKR_CSS.CHARA,   value:'chara',      type:'none'},
                {text:FTKR_CSS.SV,      value:'sv',         type:'none'},
                {text:FTKR_CSS.STATE,   value:'state',      type:'none'},
                {text:FTKR_CSS.STATE2,  value:'state2(%1)', type:'string',         options:{}},
                {text:FTKR_CSS.PROFILE, value:'profile',    type:'none'},
                {text:FTKR_CSS.PARAM,   value:'param(%1)',  type:'selectwindow',   options:{select:TextManager.paramNames()}},
                {text:FTKR_CSS.EQUIP,   value:'equip(%1)',  type:'selectwindow',   options:{select:TextManager.equipTypes()}},
                {text:FTKR_CSS.EPARAM,  value:'eparam(%1)', type:'selectwindow',   options:{select:TextManager.paramNames()}},
                {text:FTKR_CSS.EAOP,    value:'eaop(%1)',   type:'string',         options:{}},
                {text:FTKR_CSS.CUSTOM,  value:'custom(%1)', type:'datawindow',     options:{data:FTKR.CSS.cssStatus.customs, property:'name'}},
                {text:FTKR_CSS.GAUGE,   value:'gauge(%1)',  type:'datawindow',     options:{data:FTKR.CSS.cssStatus.gauges, property:'name'}},
                {text:FTKR_CSS.AGAUGE,  value:'agauge(%1)', type:'string',         options:{}},
                {text:FTKR_CSS.CGAUGE,  value:'cgauge(%1)', type:'string',         options:{}},
                {text:FTKR_CSS.IMAGE,   value:'image(%1)',  type:'string',         options:{}},
                {text:FTKR_CSS.MESSAGE, value:'message',    type:'none'},
                {text:FTKR_CSS.TEXT,    value:'text(%1)',   type:'string',         options:{}},
                {text:FTKR_CSS.EVAL,    value:'eval(%1)',   type:'string',         options:{}},
                {text:FTKR_CSS.STREVAL, value:'streval(%1)',type:'string',         options:{}},
                {text:FTKR_CSS.LINE,    value:'line',       type:'none'},
                {text:FTKR_CSS.INAME,   value:'iname',      type:'none'},
                {text:FTKR_CSS.IICON,   value:'iicon',      type:'none'},
                {text:FTKR_CSS.ITYPE,   value:'itype',      type:'none'},
                {text:FTKR_CSS.IETYPE,  value:'ietype',     type:'none'},
                {text:FTKR_CSS.IDESC,   value:'idesc',      type:'none'},
                {text:FTKR_CSS.ISCOPE,  value:'iscope',     type:'none'},
                {text:FTKR_CSS.IELEMENT,value:'ielement',   type:'none'},
                {text:FTKR_CSS.IPARAM,  value:'iparam(%1)', type:'string',         options:{}},
            ];
        };

        //=============================================================================
        //シーン開始時にウィンドウデータを自動保存
        //=============================================================================
        var _GDM_Scene_Base_start1 = Scene_Base.prototype.start;
        Scene_Base.prototype.start = function() {
            if (autoCreate && this._windowLayer) {
                this._windowLayer.children.forEach(function(child){
                    if (!child.containerProp()) {
                        child.saveContainerInfo();
                    }
                });
            }
            _GDM_Scene_Base_start1.call(this);
        };

        //=============================================================================
        // StorageManager
        //  ウィンドウポジションをjson形式で保存する処理を追加定義します。
        //=============================================================================
        StorageManager.saveToLocalDataFile = function(fileName, json) {
            var data     = JSON.stringify(json, null, 2);//整形して出力
            var fs       = require('fs');
            var dirPath  = this.localDataFileDirectoryPath();
            var filePath = dirPath + fileName;
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, data);
        };

        //=============================================================================
        // デザインモード中の一部操作の変更
        //=============================================================================

        //編集ウィンドウを表示していない間は、カーソルのマウス操作を無効にする
        Window_Selectable.prototype.processTouch = function() {
            if (!SceneManager.isWindowSettingMode()) return;
            this.processTouchDefault();
        };

        Window_Selectable.prototype.processTouchDefault = function() {
            if (this.isOpenAndActive()) {
                if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                    this._touching = true;
                    this.onTouch(true);
                } else if (TouchInput.isCancelled()) {
                    if (this.isCancelEnabled()) {
                        this.processCancel();
                    }
                }
                if (this._touching) {
                    if (TouchInput.isPressed()) {
                        this.onTouch(false);
                    } else {
                        this._touching = false;
                    }
                }
            } else {
                this._touching = false;
            }
        };

        //マウスによるマップへのタッチ操作を無効化
        Scene_Map.prototype.processMapTouch = function() {
        };

        //マウス右ボタンによるメニュー開閉を禁止する
        Scene_Map.prototype.isMenuCalled = function() {
            return !this.isWindowSettingMode() && Input.isTriggered('menu');//TouchInput.isCancelled()
        };

        //編集メニュー表示中はキャラの移動禁止
        var _Game_Player_canMove = Game_Player.prototype.canMove;
        Game_Player.prototype.canMove = function() {
            if(SceneManager.isWindowSettingMode()) return false;
            return _Game_Player_canMove.call(this);
        };

        //右クリックで枠を非表示にする処理を無効化
        Window_Base.prototype.processOpacity = function() {
            return false;
        };

        //マウスポインタを合わせたウィンドウの枠色を変更する処理を無効化
        Window_Base.prototype.processFrameChange = function() {
        };

        //ウィンドウ編集モードの判定
        SceneManager.isWindowSettingMode = function() {
            return this._scene.isWindowSettingMode();
        };

        Scene_Base.prototype.isWindowSettingMode = function() {
            return this._mainConfigWindow.visible ||
                this._cmdConfigWindow.visible ||
                this._commonConfigWindow.visible ||
                this._selectConfigWindow.visible ||
                this._cwCreateNewW.visible;
        };

        //=============================================================================
        //マウスのボタン操作の処理を変更
        //=============================================================================

        //初期化
        Scene_Base.prototype.clearTouchedParam = function() {
            this._touchedFrame = false;
            this._touchHolding = false;
            this._touchHoldCount = 0;
            this._smcInitX = 0;
            this._smcInitY = 0;
            this._holdX = 0;
            this._holdY = 0;
            this._holdW = 0;
            this._holdH = 0;
        };

        Scene_Base.prototype.releaceTouchWindow = function() {
            this._touchWindow = null;
            this._touchWindowIndex = -2;
            this.clearTouchedParam();
        }

        Window_Base.prototype.releaseByCmdSet = function() {
            this._holding = false;
            this._windowBackSprite.setBlendColor([0, 0, 0, 0]);
            this._windowContentsSprite.setBlendColor([0, 0, 0, 0]);
        };

        //ウィンドウのドラッグ＆ドロップ操作
        var _OSW_Scene_Base_updateDrag = Scene_Base.prototype.updateDrag;
        Scene_Base.prototype.updateDrag = function() {
            if (this.isWindowSettingMode()) {
                return false;
            } else if (TouchInput.isCancelled()) {
                this.actionMouseRightPush();
            } else {
                if (this.updateWidnowFrameTouch()) {
                    this.updateWindowSize();
                    this.processFrameChange();
                } else {
                    _OSW_Scene_Base_updateDrag.call(this);
                }
            }
        };

        //マウスのクリック、ドラッグ＆ドロップを判定
        Scene_Base.prototype.updateWidnowFrameTouch = function() {
            if (TouchInput.isTriggered()) {
                return this.actionMouseLeftPush();
            } else if (this._touchHolding && TouchInput.isPressed()) {
                return this.actionMouseLeftKeep();
            } else if (this._touchHolding && !TouchInput.isPressed()) {
                return this.actionMouseLeftRelease();
            }
            return false;
        };

        //マウスの左ボタンを押したときの処理
        Scene_Base.prototype.actionMouseLeftPush = function() {
            this._touchHoldCount = 0;
            this._touchHolding = true;
            this._touchedFrame = false;
            //クリックした場所にウィンドウがあるか調べる
            var windowOnMouse = this.getWindowOnMouse();
            this._touchWindow = windowOnMouse;
            if (!!windowOnMouse) {
                this._touchWindowIndex = windowOnMouse.isCursorIndexOnMouse();
                //フレームにタッチしたか
                if (windowOnMouse.isTouchedFrame()) {
                    this._holding = true;
                    this._touchedFrame = true;
                    this._touchWindow.sizeHold();
                    this._smcInitX = TouchInput.x;
                    this._smcInitY = TouchInput.y;
                    return true;
                }
            } else {
                this._touchHolding = false;
            }
            return false;
        };

        //マウスの左ボタンを押しつづけているときの処理
        Scene_Base.prototype.actionMouseLeftKeep = function() {
            if (this._touchedFrame) return true;
            this._touchHoldCount++;
            if (this._touchHoldCount > 10) {
                this._touchHolding = false;
                this._touchHoldCount = 0;
                this._touchWindow = null;
                return false;
            } else {
                return true;
            }
        };

        //マウスの左ボタンを離したときの処理
        Scene_Base.prototype.actionMouseLeftRelease = function() {
            //短時間クリックで、クリックした行を個別編集するウィンドウを表示
            if (this._touchHolding && !this._touchedFrame && this._touchWindow && this._touchWindow.visible) {
                if (this._touchWindow.isCommand()) {
                    if(this.setupCommandConfigWindow()) return true;
                } else if (this._touchWindow.isSelect()) {
                    if(this.setupSelectConfigWindow()) return true;
                } else if (this._touchWindow.isCommon()) {
                    if(this.setupCommonConfigWindow()) return true;
                }
            }
            this.releaceTouchWindow();
            return false;
        }

        //コマンドウィンドウの個別編集メニューを表示
        Scene_Base.prototype.setupCommandConfigWindow = function() {
            var command = this.currentListCommand();
            if (this._touchWindowIndex < 0 || !command) {
                return false;
            }
            this._touchWindow.releaseByCmdSet();
            this.reserveActiveWindow();
            this.setConfigContents_command(command);
            console.log(command);
            this._cmdConfigWindow.activateWindow();
            this.clearTouchedParam();
            return true;
        };

        //セレクトウィンドウの個別編集メニューを表示
        Scene_Base.prototype.setupSelectConfigWindow = function() {
            var command = this.currentListCommand()
            if (this._touchWindowIndex < 0 || !command || this._touchWindow._customDrawType) {
                return false;
            }
            this._touchWindow.releaseByCmdSet();
            this.reserveActiveWindow();
            this.setConfigContents_select(this._touchWindow);
            this._selectConfigWindow.activateWindow();
            this.clearTouchedParam();
            return true;
        };

        //コモンウィンドウの個別編集メニューを表示
        Scene_Base.prototype.setupCommonConfigWindow = function() {
            var command = this.currentListCommand()
            if (this._touchWindowIndex < 0 || !command || this._touchWindow._customDrawType) {
                return false;
            }
            this._touchWindow.releaseByCmdSet();
            this.reserveActiveWindow();
            this.setConfigContents_common(this._touchWindow);
            this._commonConfigWindow.activateWindow();
            this.clearTouchedParam();
            return true;
        };

        //マウスの右ボタンを押したときの処理
        Scene_Base.prototype.actionMouseRightPush = function() {
            //クリックした場所にウィンドウがあるか調べる
            var windowOnMouse = this.getWindowOnMouse();
            this.reserveActiveWindow();
            if (!!windowOnMouse) {
                //ウィンドウをクリックした場合、ウィンドウデータを取得、編集画面を表示
                this._touchWindow = windowOnMouse;
                this._mainConfigWindow.setWindow(this._touchWindow);
            } else {
                this._mainConfigWindow.setWindow(null);
            }
            this._mainConfigWindow.activateWindow();
            return true;
        };

        SceneManager.gdmTouchWindow = function() {
            return this._scene._touchWindow;
        };

        //=============================================================================
        // アクティブ状態がONのウィンドウの保存処理
        //=============================================================================

        var _GDM_Scene_Base_initialize = Scene_Base.prototype.initialize;
        Scene_Base.prototype.initialize = function() {
            _GDM_Scene_Base_initialize.call(this);
            this._activeWindows = [];
        };

        //アクティブ状態がONのウィンドウを記録し、OFFに変更
        Scene_Base.prototype.reserveActiveWindow = function() {
            if (this._windowLayer && this._windowLayer.children.length) {
                this._windowLayer.children.forEach( function(window){
                    if (window.active) {
                        this._activeWindows.push(window);
                        window.deactivate();
                    }
                    window._holdDeactivate = true;
                },this);
            }
        };

        Scene_Base.prototype.releaseActiveWindow = function() {
            if (this._windowLayer && this._windowLayer.children.length) {
                this._windowLayer.children.forEach( function(window){
                    window._holdDeactivate = false;
                },this);
            }
            this._activeWindows.forEach( function(window){
                window.activate();
            });
            this._activeWindows = [];
        };

        var _GDM_Window_Base_activate = Window_Base.prototype.activate;
        Window_Base.prototype.activate = function() {
            if (this._holdDeactivate) return;
            _GDM_Window_Base_activate.call(this);
        };

        //=============================================================================
        // ウィンドウの枠とマウスポインタ位置の判別処理
        //=============================================================================

        Window_Base.prototype.isTouchedInsideFrame = function() {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            return x >= 0 && y >= 0 && x < this.width && y < this.height;
        };

        Window_Base.prototype.isTouchedInsideMargin = function() {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var left = this.margin;
            var top = this.margin;
            var right = this.width - this.margin;
            var bottom = this.height - this.margin;
            return (x >= left && y >= top && x < right && y < bottom);
        };

        Window_Base.prototype.isTouchedFrame = function() {
            return this.isTouchedInsideFrame() && !this.isTouchedInsideMargin();
        };

        Window_Base.prototype.isTouchedFrameTop = function() {
            return this.isTouchedFrame() && this.y + this.margin >= TouchInput.y;
        }

        Window_Base.prototype.isTouchedFrameBottom = function() {
            return this.isTouchedFrame() && this.y + this.height - this.margin <= TouchInput.y;
        }

        Window_Base.prototype.isTouchedFrameLeft = function() {
            return this.isTouchedFrame() && this.x + this.margin >= TouchInput.x;
        }

        Window_Base.prototype.isTouchedFrameRight = function() {
            return this.isTouchedFrame() && this.x + this.width - this.margin <= TouchInput.x;
        }

        //マウスポインタと重なっているウィンドウを取得
        Scene_Base.prototype.getWindowOnMouse = function() {
            var pointWindow = null;
            console.log('----------------------------------------')
            console.log('getWindowOnMouse', 'search window');
            this.allWindowChildren().forEach( function(window){
//                console.log(window.name, window.visible, window.isOpen());
                if (window.visible && window.isOpen() && window.isTouchedInsideFrame()) {
                    pointWindow = window;
//                    console.log('get window');
                }
            },this);
            console.log('return');
            console.log(pointWindow);
            console.log('----------------------------------------')
            return pointWindow;
        };

        Scene_Base.prototype.allWindowChildren = function() {
            return !!this._windowLayer ? this._windowLayer.children : [];
        };

        //マウスポインタが指している行を取得
        Window_Base.prototype.isCursorIndexOnMouse = function() {
            if (!this.isTouchedInsideFrame()) return -2;
            var pd = this._padding;
            var lh = this.lineHeight() || 36;
            return Math.floor((TouchInput._y - this.y - pd) / lh);
        };

        Window_Selectable.prototype.isCursorIndexOnMouse = function() {
            if (!this.isTouchedInsideFrame()) return -2;
            var ih = this.itemHeight() || 36;
            var iw = this.itemWidth() || this.width;
            var index = Math.floor((TouchInput.y - this.y - this.padding) / ih) + this.topRow();
            var x = this.x;
            for(var i = 0; i < this.customMaxCols(); i++) {
                if (TouchInput.x >= x && TouchInput.x < x + iw + this.customSpacing()) {
                    var col = i;
                    break;
                }
                x += iw + this.customSpacing();
            }
            return index * this.customMaxCols() + col;
    //          return Math.min(index * this.customMaxCols() + col, this.maxItems() - 1);
        };

        //マウスポインタが指している行のリスト番号を取得
        Scene_Base.prototype.currentListIndex = function() {
            var touchIndex = -1;
            if (!!this._touchWindow && this._touchWindowIndex >= 0) {
                if (!this._touchWindow.isCommand()) return this._touchWindowIndex;
                var list = this._touchWindow._list[this._touchWindowIndex];
                this._touchWindow._customList.some(function(cmd, i){
                    if(list && list.symbol === cmd.symbol && (list.ext !== undefined && list.ext == cmd.ext)) {
                        touchIndex = i;
                        return true;
                    }
                },this);
            }
            if(!!this._touchWindow) {
                console.log('windowname', this._touchWindow.name, 'touchWindowIndex', this._touchWindowIndex ,'listIndex', touchIndex, );
            }
            return touchIndex;
        };

        //マウスポインタが指している行のリストデータを取得
        Scene_Base.prototype.currentListCommand = function() {
            return this._touchWindow ? this._touchWindow._customList[this.currentListIndex()] : null;
        };

        //=============================================================================
        // ウィンドウサイズの拡大縮小処理
        //=============================================================================

        //ウィンドウサイズの更新
        Scene_Base.prototype.updateWindowSize = function() {
            if (!!this._touchWindow && this._touchHolding && this._touchedFrame) {
                this._touchWindow.updateSmcSize(
                    TouchInput.x - this._smcInitX,
                    TouchInput.y - this._smcInitY);
            }
        };

        //サイズ変更前の状態を一時保存
        Window_Base.prototype.sizeHold = function() {
            this._holdX = this.x;
            this._holdY = this.y;
            this._holdW = this.width;
            this._holdH = this.height;
            if (this.isTouchedFrameLeft()) {
                this._onFrameX = -1;
            } else if (this.isTouchedFrameRight()) {
                this._onFrameX = 1;
            } else {
                this._onFrameX = 0;
            }
            if (this.isTouchedFrameTop()) {
                this._onFrameY = -1;
            } else if (this.isTouchedFrameBottom()) {
                this._onFrameY = 1;
            } else {
                this._onFrameY = 0;
            }
        };

        //サイズ変更
        Window_Base.prototype.updateSmcSize = function(dx, dy) {
            var x = this.x;
            var y = this.y;
            var width = this.width;
            var height = this.height;
            if (Input.isPressed('control')) {
                var size = paramGridSize;
                if (size !== 0) {
                    if (this._onFrameX > 0) {
                        width = this._holdW + dx;
                        width += (width % size > size / 2 ? size - width % size : -(width % size));
                    } else if (this._onFrameX < 0) {
                        x = this._holdX + dx;
                        x += (x % size > size / 2 ? size - x % size : -(x % size));
                        width = this._holdW + this._holdX - x;
                    }
                    if (this._onFrameY > 0) {
                        height = this._holdH + dy;
                        height += (height % size > size / 2 ? size - height % size : -(height % size));
                    } else if (this._onFrameY < 0) {
                        y = this._holdY + dy;
                        y += (y % size > size / 2 ? size - y % size : -(y % size));
                        height = this._holdH + this._holdY - y;
                    }
                }
            } else {
                if (this._onFrameX > 0) {
                    width = this._holdW + dx;
                } else if (this._onFrameX < 0) {
                    width = this._holdW - dx;
                    x = this._holdX + dx;
                }
                if (this._onFrameY > 0) {
                    height = this._holdH + dy;
                } else if (this._onFrameY < 0) {
                    height = this._holdH - dy;
                    y = this._holdY + dy;
                }
            }
            this.position.x = x;
            this.position.y = y;
            this.move(x, y, width, height);
            this.saveContainerInfo();
            this.reDrawContents();
        };

        //=============================================================================
        // マウスポインタの位置に合わせてウィンドウ内の行の色を変更する処理を追加
        //=============================================================================

        var _OSW_Window_Base_update = Window_Base.prototype.update;
        Window_Base.prototype.update = function() {
            _OSW_Window_Base_update.call(this);
            this.updateOswContentAreaColor();
            this.updateScaleArrows();
        };

        Window_Base.prototype.itemRect = function(index) {
            index = Math.min(index, this._customList.length - 1);
            var rect = new Rectangle();
            rect.width = this.contentsWidth();
            rect.height = this.lineHeight();
            rect.x = 0;
            rect.y = index * this.lineHeight();
            return rect;
        };
        
        //コモンウィンドウのテキストモードなら行ごとに変更
        Window_Base.prototype.updateOswContentAreaColor = function() {
            if (this.isOswOption()) return;
            if (SceneManager.isWindowSettingMode()) return;
            var index = this.isCursorIndexOnMouse();
            if (index >= 0) {
                var rect = this.itemRect(index);
                this.setMousePointRect(rect.x, rect.y, rect.width, rect.height);
            } else if (index < 0) {
                this.setMousePointRect(0, 0, 0, 0);
            }
        };

        Window_Base.prototype.setMousePointRect = function(x, y, width, height) {
            var cx = Math.floor(x || 0);
            var cy = Math.floor(y || 0);
            var cw = Math.floor(width || 0);
            var ch = Math.floor(height || 0);
            var rect = this._mousePointRect;
            if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
                this._mousePointRect.x = cx;
                this._mousePointRect.y = cy;
                this._mousePointRect.width = cw;
                this._mousePointRect.height = ch;
                this._refreshMousePointRect();
            }
        };

        Window_Base.prototype._refreshMousePointRect = function() {
            var pad = this._padding;
            var x = this._mousePointRect.x + pad - this.origin.x;
            var y = this._mousePointRect.y + pad - this.origin.y;
            var w = this._mousePointRect.width;
            var h = this._mousePointRect.height;
            var x2 = Math.max(x, pad);
            var y2 = Math.max(y, pad);
            var w2 = Math.min(w, this._width - pad - x2);
            var h2 = Math.min(h, this._height - pad - y2);
            var color1 = 6;
            var color2 = 6;
            var bitmap = new Bitmap(w2, h2);
        
            this._windowMousePointSprite.bitmap = bitmap;
            this._windowMousePointSprite.setFrame(0, 0, w2, h2);
            this._windowMousePointSprite.move(x2, y2);
            if (w > 0 && h > 0) {
                bitmap.paintOpacity = 108;
                bitmap.gradientFillRect(0, 0, w2, h2, this.textColor(color1), this.textColor(color2));
                bitmap.paintOpacity = 255;
            }
        };

        //=============================================================================
        // ウィンドウサイズ変更時に表示するカーソルを定義
        //=============================================================================

        Window_Base.prototype.updateScaleArrows = function() {
            if (this.isTouchedFrame() && !this.isOswOption()) {
                this.oswUpDownArrowVisible = this.isTouchedFrameTop() || this.isTouchedFrameBottom();
                this.oswLeftRightArrowVisible = this.isTouchedFrameLeft() || this.isTouchedFrameRight();
            } else {
                this.oswUpDownArrowVisible = false;
                this.oswLeftRightArrowVisible = false;
            }
        };

        var _OSW_Window_createAllParts = Window.prototype._createAllParts;
        Window.prototype._createAllParts = function() {
            _OSW_Window_createAllParts.call(this);
            this._oswDownArrowSprite = new Sprite();
            this._oswUpArrowSprite = new Sprite();
            this._oswLeftArrowSprite = new Sprite();
            this._oswRightArrowSprite = new Sprite();
            this._mousePointRect = new Rectangle();
            this._windowMousePointSprite = new Sprite();
            this.addChild(this._windowMousePointSprite);
            this.addChild(this._oswDownArrowSprite);
            this.addChild(this._oswUpArrowSprite);
            this.addChild(this._oswLeftArrowSprite);
            this.addChild(this._oswRightArrowSprite);
        };

        var _OSW_Window_refreshAllParts = Window.prototype._refreshAllParts;
        Window.prototype._refreshAllParts = function() {
            _OSW_Window_refreshAllParts.call(this);
            this._refreshMousePointRect();
            this._refreshScaleArrows();
        };

        Window.prototype._refreshScaleArrows = function() {
            var p = 24;
            var q = p/2;
            var sx = 96+p;
            var sy = 0+p;
            this._oswDownArrowSprite.bitmap = this._windowskin;
            this._oswDownArrowSprite.anchor.x = 0;
            this._oswDownArrowSprite.anchor.y = 0;
            this._oswDownArrowSprite.setFrame(sx+q, sy+q+p, p, q);
            this._oswDownArrowSprite.move(0, 0);
            this._oswUpArrowSprite.bitmap = this._windowskin;
            this._oswUpArrowSprite.anchor.x = 0;
            this._oswUpArrowSprite.anchor.y = 0;
            this._oswUpArrowSprite.setFrame(sx+q, sy, p, q);
            this._oswUpArrowSprite.move(0, 0);
            this._oswLeftArrowSprite.bitmap = this._windowskin;
            this._oswLeftArrowSprite.anchor.x = 0;
            this._oswLeftArrowSprite.anchor.y = 0;
            this._oswLeftArrowSprite.setFrame(sx, sy+q/2+p/2, q, p);
            this._oswLeftArrowSprite.move(0, 0);
            this._oswRightArrowSprite.bitmap = this._windowskin;
            this._oswRightArrowSprite.anchor.x = 0;
            this._oswRightArrowSprite.anchor.y = 0;
            this._oswRightArrowSprite.setFrame(sx+q+p, sy+q/2+p/2, q, p);
            this._oswRightArrowSprite.move(0, 0);
        };

        var _OSW_Window_updateTransform = Window.prototype.updateTransform;
        Window.prototype.updateTransform = function() {
            this._updateScaleArrows();
            _OSW_Window_updateTransform.call(this);
        };

        Window.prototype._updateScaleArrows = function() {
            if (this.isOpen() && this.oswUpDownArrowVisible) {
                this._oswDownArrowSprite.visible = true;
                this._oswUpArrowSprite.visible = true;
                var bitmap = this._oswDownArrowSprite;
                this._oswDownArrowSprite.move(
                    TouchInput._x - this.x - bitmap.width,
                    TouchInput._y - this.y
                );
                this._oswUpArrowSprite.move(
                    TouchInput._x - this.x - bitmap.width,
                    TouchInput._y - this.y - bitmap.height
                );
            } else {
                this._oswDownArrowSprite.visible = false;
                this._oswUpArrowSprite.visible = false;
            }
            if (this.isOpen() && this.oswLeftRightArrowVisible) {
                this._oswLeftArrowSprite.visible = true;
                this._oswRightArrowSprite.visible = true;
                var bitmap = this._oswLeftArrowSprite;
                this._oswLeftArrowSprite.move(
                    TouchInput._x - this.x - bitmap.width,
                    TouchInput._y - this.y - bitmap.height*3/4
                );
                this._oswRightArrowSprite.move(
                    TouchInput._x - this.x,
                    TouchInput._y - this.y - bitmap.height*3/4
                );
            } else {
                this._oswLeftArrowSprite.visible = false;
                this._oswRightArrowSprite.visible = false;
            }
        };

        //=============================================================================
        // 編集メニューコマンドウィンドウの設定
        //=============================================================================
        var _OSW_Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
        Scene_Base.prototype.createWindowLayer = function() {
            _OSW_Scene_Base_createWindowLayer.call(this);
            this.createSettingLayer();
            this.createFtkrOptionWindows();
            this.createSettingNewWindow();
        };

        Scene_Base.prototype.createSettingLayer = function() {
            var width = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            var x = (Graphics.width - width) / 2;
            var y = (Graphics.height - height) / 2;
            this._settingLayer = new WindowLayer();
            this._settingLayer.move(x, y, width, height);
            this.addChild(this._settingLayer);
        };

        //------------------------------------------------------------------------
        //編集用ウィンドウの作成
        //------------------------------------------------------------------------
        /*
        configContetns配列内のオプジェクトのプロパティ
            name    : 表示名
            symbol  : コンフィグデータの参照先
            type    : 表示データの分類名
                    :   number    表示されるデータは数値に変換
                    :   select    リスト内の文字列に変換
                    :   data      データベースのデータに変換
                    :   boolean   ON か OFF に変換
                    :   string    文字列としてそのまま表示
                    :   line      横線を描写する(type以外の設定不要)
                    :   subConfig サブウィンドウを表示する
                    :   handler   setHander(symbol, xxx)で設定した実行処理を呼び出す(xxxメソッドは別途定義が必要)
                    :   command   optionsで指定したメソッドを呼び出す。
                    :   none      何も表示しない
            enabled : コンフィグ変更可否のフラグ
            options : 上記分類ごとの個別設定
                    :   numberの場合は最小値x、最大値y、変化量z を指定
                    :     options = {min: x, max: y, offset: z}
                    :   selectの場合はリストの表示内容をselectで指定する。valueを設定することで、取得する値も指定可能。
                    :     options = {select :[list1, list2, ...], value:[value1, value2,...]}
                    :   dataの場合は参照するデータベースと表示させるプロパティを指定
                    :     options = {data: xxx, property: yyy, enabled: zzz}
                    :   boolean および文字列の場合は設定不要
                    :   subConfigの場合は、サブウィンドウに表示するコンフィグおよびサブウィンドウ幅の設定
                    :     options = {subConfigs: [{name:xxx, type:yyy, symbol:zzz, options:{}},... ]
                    :                width: www,
                    :                textWidth: ttt,
                    :                statusWidth: sss}
                    :   command の場合は、実行するメソッドを指定(xxxメソッドは別途定義が必要)
                    :     options = {method: this.xxx.bind(this)}
        */
        Scene_Base.prototype.createFtkrOptionWindows = function() {
            this.createMainConfigCommand();
            this.createFtkrEditOptions();
            this.createFtkrDisplayOptions();
            this.createFtkrCommandOptions();
            this.createFtkrSelectOptions();
            this.createFtkrCommonOptions();
            this.createOswConfTitleWindow();
            this.createOswConfWindow();
        };

        Scene_Base.prototype.configLayer = function() {
            return this._settingLayer;
        };

        Window_Base.prototype.activateWindow = function() {
            this.select(0);
            this.activate();
            this.refresh();
            this.show();
        };

        Window_Base.prototype.setPosition = function(x, y) {
            this.x = x;
            this.y = y;
        };

        Window_Base.prototype.setPositionReferWindowIndex = function(window) {
            var x = window.x + optionOffsetX;
            if (x + this.width > Graphics.boxWidth) {
                x = Graphics.boxWidth - this.width;
            }
            var y = window.y + window.index() * window.lineHeight();
            if (y + this.height > Graphics.boxHeight) {
                y = Graphics.boxHeight - this.height;
            }
            this.setPosition(x, y);
        };

        //------------------------------------------------------------------------
        //メインコマンドウィンドウの設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createMainConfigCommand = function() {
            this._mainConfigWindow = new Window_MainConfigCommand();
            this._mainConfigWindow.setHandler('create',  this.cwCreateCmd.bind(this));
            this._mainConfigWindow.setHandler('edit',    this.cwEditCmd.bind(this));
            this._mainConfigWindow.setHandler('display', this.cwDisplayCmd.bind(this));
            this._mainConfigWindow.setHandler('delete',  this.cwDeleteCmd.bind(this));
            this._mainConfigWindow.setHandler('cancel',  this.cwCloseConfig.bind(this));
            this.configLayer().addChild(this._mainConfigWindow);
        };

        //ウィンドウ作成コマンド
        Scene_Base.prototype.cwCreateCmd = function() {
            this._cwCreateNewW.setPositionReferWindowIndex(this._mainConfigWindow);
            this._cwCreateNewW.activateWindow();
        };

        //ウィンドウ編集コマンド
        Scene_Base.prototype.cwEditCmd = function() {
            this._touchWindow.readCssStatus();
            this.setConfigContents_edit(this._touchWindow);
            this._editConfigWindow.setPositionReferWindowIndex(this._mainConfigWindow);
            this._editConfigWindow.activateWindow();
        };

        //ウィンドウ表示コマンド
        Scene_Base.prototype.cwDisplayCmd = function() {
            this.setConfigContents_Display(this._touchWindow);
            this._dispConfigWindow.setPositionReferWindowIndex(this._mainConfigWindow);
            this._dispConfigWindow.activateWindow();
        };

        //ウィンドウ削除コマンド
        Scene_Base.prototype.cwDeleteCmd = function() {
            this._stsConfTitleWindow.setConf(this._touchWindow.name);
            this._stsConfWindow.activateWindow();
        };

        //コンフィグウィンドウの終了
        Scene_Base.prototype.cwCloseConfig = function() {
            this._touchWindow = null;
            this._mainConfigWindow.hide();
            this._mainConfigWindow.deactivate();
            this._cmdConfigWindow.hideAll();
            this._commonConfigWindow.hideAll();
            this._selectConfigWindow.hideAll();
            this.releaseActiveWindow();
        };

        Window_Base.prototype.updateWindowConfig = function() {
            this.updatePadding();
            this.resetFontSettings();
            this.updateBackOpacity();
        };

        //コンフィグデータをセーブして再描画する
        Scene_Base.prototype.saveConfigValues = function() {
            if (this._touchWindow) {
                this._touchWindow.updateWindowConfig();
                this._touchWindow.setOswMethod();
                this._touchWindow.saveContainerInfo();
                if (Imported.FTKR_CSS) {
                    this._touchWindow.setCssStatus();
                }
                this._touchWindow._refreshAllParts();
                this._touchWindow.refresh();
                this.refreshDisplayPriority();
            }
        };

        //------------------------------------------------------------------------
        //オプションウィンドウの生成
        //------------------------------------------------------------------------
        //編集コマンド用
        Scene_Base.prototype.createFtkrEditOptions = function() {
            var width = 240, textWidth = 206, statusWidth = 0;
            var layer = this.configLayer();
            this._editConfigWindow = new Window_FtkrOptions(layer, width, textWidth, statusWidth, 'editConfig');
            this._editConfigWindow.setHandler('cancel', this.closeOptions.bind(this));
            layer.addChild(this._editConfigWindow);
        };

        Scene_Base.prototype.closeOptions = function() {
            this._mainConfigWindow.activate();
            this._editConfigWindow.hideAll();
            this._dispConfigWindow.hideAll();
        };

        //編集コンテンツの設定読込
        Scene_Base.prototype.setConfigContents_edit = function(configValues) {
            var configContents = [
                {type: 'subConfig', name: 'ウィンドウ', symbol: 'windowEdit', enabled: true, options: {subConfigs: [
                    {type: 'string', name: '名前',      symbol: 'name',               enabled: true, options: {}},
                    {type: 'number', name: 'X座標',     symbol: 'x',                  enabled: true, options: {min:0, max: Graphics.boxWidth, offset: 1}},
                    {type: 'number', name: 'Y座標',     symbol: 'y',                  enabled: true, options: {min:0, max: Graphics.boxHeight, offset: 1}},
                    {type: 'number', name: '横幅',      symbol: 'width',              enabled: true, options: {min:0, max: Graphics.boxWidth, offset: 1}},
                    {type: 'number', name: '高さ',      symbol: 'height',            enabled: true, options: {min:0, max: Graphics.boxHeight, offset: 1}},
                    {type: 'number', name: '余白',      symbol: '_customPadding',     enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                    {type: 'line'},
                    {type: 'save',  name: '決定'},
                ], width: 400, textWidth: 120, statusWidth: 220}},
                {type: 'subConfig', name: 'フォント設定', symbol: 'fontEdit', enabled: true, options: {subConfigs: [
                    {type: 'string', name: 'フォント　　　', symbol: '_customFontFace', enabled: true, options: {}},
                    {type: 'number', name: 'フォントサイズ', symbol: '_customFontSize', enabled: true, options: {min:1, max: graphicsMinSize(), offset: 1}},
                    {type: 'line'},
                    {type: 'save',  name: '決定'},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'line'},
                {type: 'subConfig', name: '行列設定', symbol: 'lineEdit', enabled: true, options: {subConfigs: [
                    {type: 'number', name: '行高さ',    symbol: '_customLineHeight',  enabled: true, options: {min:1, max: graphicsMinSize(), offset: 1}},
    //                  {type: 'number', name: '高さ(行数)', symbol: '_customLineNumber', enabled: true, options: {min:0, max: 99, offset: 1}},
                    {type: 'number', name: '表示行間隔　', symbol: '_customHorSpacing',   enabled: configValues.isList(), options: {min:0, max: graphicsMinSize(), offset: 1}},
                    {type: 'number', name: '表示列数　　', symbol: '_customMaxCols',      enabled: configValues.isList(), options: {min:1, max: 99, offset: 1}},
                    {type: 'number', name: '表示列間隔　', symbol: '_customSpacing',      enabled: configValues.isList(), options: {min:0, max: graphicsMinSize(), offset: 1}},
                    {type: 'number', name: 'カーソル行数', symbol: '_customCursorHeight', enabled: configValues.isList(), options: {min:1, max: 99, offset: 1}},
                    {type: 'line'},
                    {type: 'save',   name: '決定'},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'subConfig',  name: '処理設定', symbol: 'methodEdit', enabled: configValues.isList(), options: {subConfigs: [
                    {type: 'selectwindow', name: '実行設定　　　　', symbol: '_customOkMethodType',       enabled: configValues.isSelect(), options: {select:COMMAND_METHOD}},
                    {type: 'refer',  name: '実行詳細　　　　', symbol: '_customOkMethodDetail',     enabled: configValues.isSelect(), options: {refSymbol:['_customOkMethodType'], refData:FTKR_METHOD_DATALIST(this)}},
                    {type: 'refer',  name: '実行詳細２　　　', symbol: '_customOkMethodDetail2',    enabled: configValues.isSelect(), options: {refSymbol:['_customOkMethodType'], refData:FTKR_METHOD_DATALIST2}},
                    {type: 'selectwindow', name: 'キャンセル設定　', symbol: '_customCancelMethodType',   enabled: true, options: {select:COMMAND_METHOD}},
                    {type: 'refer',  name: 'キャンセル詳細　', symbol: '_customCancelMethodDetail', enabled: true, options: {refSymbol:['_customCancelMethodType'], refData:FTKR_METHOD_DATALIST(this)}},
                    {type: 'refer',  name: 'キャンセル詳細２', symbol: '_customCancelMethodDetail2',enabled: true, options: {refSymbol:['_customCancelMethodType'], refData:FTKR_METHOD_DATALIST2}},
                    {type: 'line'},
                    {type: 'save',   name: '決定'},
                ], width: 500, textWidth: 220, statusWidth: 220}},
            ];
            //設定したコンテンツデータをオプションウィンドウに反映
            this._editConfigWindow.setConfigContents(configContents, configValues);
        };
        
        //------------------------------------------------------------------------
        //表示コマンド用のウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createFtkrDisplayOptions = function() {
            var width = 240, textWidth = 206, statusWidth = 0;
            var layer = this.configLayer();
            this._dispConfigWindow = new Window_FtkrOptions(layer, width, textWidth, statusWidth, 'dispConfig');
            this._dispConfigWindow.setHandler('cancel', this.closeOptions.bind(this));
            layer.addChild(this._dispConfigWindow);
        };

        Scene_Base.prototype.windowChildren = function() {
            return this._windowLayer ? this._windowLayer.children : [];
        };

        //表示コンテンツの設定読込
        Scene_Base.prototype.setConfigContents_Display = function(configValues) {
            var configContents = [
                {type: 'subConfig', name: '背景', symbol: 'backGround', enabled: true, options: {subConfigs: [
                    {type: 'number', name: '背景透明度', symbol: '_customBackOpacity',  enabled: true, options: {min:0, max: 255, offset: 1}},
                    {type: 'select', name: '背景画像　', symbol: '_customBackFileName', enabled: true, options: {select:[null].concat(FTKR.GDM.backgrounds), string:true}},
                    {type: 'line'},
                    {type: 'save',  name: '決定'},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'subConfig', name: '表示設定', symbol: 'showEdit', enabled: true, options: {subConfigs: [
                    {type: 'datawindow',    name: '表示スイッチ',   symbol: '_customShowSwId',  enabled: true, options: {data:$dataSystem.switches}},
                    {type: 'boolean', name: '枠非表示　　',   symbol: '_customHideFrame', enabled: true, options: {}},
                    {type: 'boolean', name: '表示自動更新',   symbol: '_autoRefreshed', enabled: true, options: {}},
                    {type: 'line'},
                    {type: 'save', name: '決定'},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'line'},
                {type: 'subConfig', name: 'コマンド設定', symbol: 'cmdDisp', enabled: configValues.isCommand(), options: {subConfigs: [
                    {type: 'selectwindow',  name: 'コマンド表示位置',   symbol: '_customTextAlign',  enabled: true, options: {select:['左寄せ','中央','右寄せ']}},
                    {type: 'command', name: 'コマンド非表示解除', symbol: 'cmdShow',           enabled: true, options: {method:this.allCmdVisible.bind(this)}},
                    {type: 'line'},
                    {type: 'save',    name: '決定'},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'subConfig', name: 'セレクト設定', symbol: 'selectDisp', enabled: configValues.isSelect(), options: {subConfigs: [
                    {type: 'selectwindow', name: '表示タイプ　', symbol: '_customDrawType',    enabled: true, options: {select:['テキスト','パーティー','アクター','職業','スキル','アイテム','武器','防具','敵キャラ','敵グループ']}},
                    {type: 'refer',  name: 'リストタイプ', symbol: '_customListType',    enabled: true, options: {refSymbol:['_customDrawType'], refData:[
                        {type: 'none'},
                        {type: 'selectwindow', options:{select:['全メンバー', 'バトルメンバー', '控えメンバー']}},
                    ]}},
                    {type: 'string', name: '表示条件　　', symbol: '_customListEnabled', enabled: true, options: {}},
                    {type: 'line'},
                    {type: 'save',   name: '決定', options:{refreshWindow:['dispConfig']}},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'subConfig', name: 'コモン設定', symbol: 'commonDisp', enabled: configValues.isCommon(), options: {subConfigs: [
                    {type: 'selectwindow', name: '表示タイプ　', symbol: '_customDrawType',  enabled: true, options: {select:['テキスト','詳細']}},
                    {type: 'refer',  name: 'アクター設定', symbol: '_customActorId',   enabled: true, options: {refSymbol:['_customDrawType'], refData:[
                        {type:'none'},
                        {type:'datawindow', options:{data:$dataActors, property:'name'}}
                    ]}},
                    {type: 'refer', name: 'セレクト参照', symbol: '_customReference', enabled: true, options: {refSymbol:['_customDrawType','_customActorId'], refData:[
                        [
                            {type:'none'}
                        ],
                        [
                            {type:'datawindow', options:{data:[null].concat(this.windowChildren()), property:'name', enabled:'data.isList()' ,string:true}},
                            {type:'none'}
                        ]
                    ]}},
                    {type: 'line'},
                    {type: 'save',   name: '決定', options:{refreshWindow:['dispConfig']}},
                ], width: 400, textWidth: 220, statusWidth: 120}},
                {type: 'subConfig', name: '表示エリア', symbol: 'cssArea', enabled: 'SceneManager.gdmTouchWindow().isCssContentsWindow()', options: {subConfigs: [
                    {type: 'window', name: 'パラメータリスト',  symbol: '_customCssStatus', enabled: true, options: {subConfigs: [
                        {type: 'subConfig', name: 'パラメータ編集', symbol: 'editStatus', enabled: true, options: {subConfigs: [
                            {type: 'subConfig', name: 'パラメータ設定', symbol: 'customCssStatus', enabled: 'this.hasCssStatus()', options: {subConfigs: [
                                {type: 'selectwindow',  name: 'パラメータ名',   symbol: '_customCssStatus[index].text',  enabled: true, options: {setArray: true, select:FTKR_CSS_CODES(), property:'text', value: true, prompt: true}},
//                                {type: 'string',        name: 'パラメータ詳細', symbol: '_customCssStatus[index].value', enabled: true, options: {setArray: true}},
                                {type: 'refer',         name: 'パラメータ詳細', symbol: '_customCssStatus[index].value', enabled: true, options: {refSymbol:['_customCssStatus[index].text'], refIndex: FTKR_CSS_CODES(), property: 'value', refData:FTKR_CSS_CODES()}},
                                {type: 'string',        name: 'X座標',         symbol: '_customCssStatus[index].x',     enabled: true, options: {setArray: true}},
                                {type: 'string',        name: 'Y座標',         symbol: '_customCssStatus[index].y',     enabled: true, options: {setArray: true}},
                                {type: 'string',        name: '幅',            symbol: '_customCssStatus[index].width', enabled: true, options: {setArray: true}},
                                {type: 'line'},
                                {type: 'save',   name: '決定', options: {refreshWindow:['_customCssStatus']}},
                            ], width: 360, textWidth: 120, statusWidth: 220}},
                            {type: 'line'},
                            {type: 'subConfig', name: '表示順番', symbol: 'order', enabled: 'this.hasCssStatus()', options: {subConfigs: [
                                {type: 'command', name: '上部に移動　', symbol: 'toTop',       enabled: true, options: {method:this.csspToTop.bind(this, '_customCssStatus')}},
                                {type: 'command', name: '最上部に移動', symbol: 'toTheTop',    enabled: true, options: {method:this.csspToTheTop.bind(this, '_customCssStatus')}},
                                {type: 'line'},
                                {type: 'command', name: '下部に移動　', symbol: 'toBottom',    enabled: true, options: {method:this.csspToBottom.bind(this, '_customCssStatus')}},
                                {type: 'command', name: '最下部に移動', symbol: 'toTheBottom', enabled: true, options: {method:this.csspToTheBottom.bind(this, '_customCssStatus')}},
                            ], width: 240, textWidth: 204, statusWidth: 0}},
                            {type: 'line'},
                            {type: 'subConfig', name: 'パラメータ追加', symbol: 'addCmd', enabled: true, options: {subConfigs: [
                                {type: 'command', name: '上部に追加', symbol: 'addTop',       enabled: true, options: {method:this.csspAddTop.bind(this, '_customCssStatus')}},
                                {type: 'command', name: '下部に追加', symbol: 'addBottom',    enabled: true, options: {method:this.csspAddBottom.bind(this, '_customCssStatus')}},
                            ], width: 240, textWidth: 204, statusWidth: 0}},
                            {type: 'line'},
                            {type: 'command', name: 'パラメータ削除　',   symbol: 'delete', enabled: 'this.hasCssStatus()', options: {method:this.csspDeleteCommand.bind(this, '_customCssStatus')}},
                        ], width: 240, textWidth: 204, statusWidth: 0}},
                    ], width:480}},
                    {type: 'subConfig', name: '旧方式編集', symbol: 'editCssText', enabled: true, options: {subConfigs: [
                        {type: 'string', name: '描画エリア１内容', symbol: '_customCssText1',      enabled: true, options: {}},
                        {type: 'string', name: '描画エリア２内容', symbol: '_customCssText2',      enabled: true, options: {}},
                        {type: 'string', name: '描画エリア３内容', symbol: '_customCssText3',      enabled: true, options: {}},
                        {type: 'line'},
                        {type: 'number', name: '空白エリア１幅　', symbol: '_customCssSpace1',     enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                        {type: 'number', name: '空白エリア２幅　', symbol: '_customCssSpace2',     enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                        {type: 'number', name: '空白エリア３幅　', symbol: '_customCssSpace3',     enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                        {type: 'number', name: '空白エリア４幅　', symbol: '_customCssSpace4',     enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                        {type: 'line'},
                        {type: 'number', name: '描画エリア１比率', symbol: '_customCssWidthRate1', enabled: true, options: {min:0, max: 100, offset: 1}},
                        {type: 'number', name: '描画エリア２比率', symbol: '_customCssWidthRate2', enabled: true, options: {min:0, max: 100, offset: 1}},
                        {type: 'number', name: '描画エリア３比率', symbol: '_customCssWidthRate3', enabled: true, options: {min:0, max: 100, offset: 1}},
                        {type: 'line'},
                        {type: 'save',   name: '決定'},
                    ], width: 500, textWidth: 220, statusWidth: 220}},
                    {type: 'line'},
                    {type: 'number', name: '複数列間隔　　　', symbol: '_customCssSpaceIn',    enabled: true, options: {min:0, max: graphicsMinSize(), offset: 1}},
                    {type: 'save',   name: '決定'},
                ], width: 500, textWidth: 220, statusWidth: 220}},
                {type: 'line'},
                {type: 'subConfig', name: '配置', symbol: 'priority', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '前面に配置　', symbol: 'toFront',    enabled: true, options: {method:this.cwToFront.bind(this)}},
                    {type: 'command', name: '最前面に配置', symbol: 'totheFront', enabled: true, options: {method:this.cwToTheFront.bind(this)}},
                    {type: 'line'},
                    {type: 'command', name: '背面に配置　', symbol: 'toBack',     enabled: true, options: {method:this.cwToBack.bind(this)}},
                    {type: 'command', name: '最背面に配置', symbol: 'totheBack',  enabled: true, options: {method:this.cwToTheBack.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
            ];
            //設定したコンテンツデータをオプションウィンドウに反映
            this._dispConfigWindow.setConfigContents(configContents, configValues);
        };

        //コマンド非表示解除
        Scene_Base.prototype.allCmdVisible = function() {
            SoundManager.playSave();
            this._touchWindow._customList.forEach(function(list){
                list.visible = true;
            });
            this.saveConfigValues();
            this._dispConfigWindow.hideAll();
            this.cwCloseConfig();
        };

        //配置変更
        Scene_Base.prototype.cwhidePriority = function() {
            SoundManager.playMagicEvasion();
            this._windowLayer.children.forEach(function(child){
                child.saveContainerInfo();
            });
            this._touchWindow.refresh();
            this._touchWindow = null;
            this._dispConfigWindow.hideAll();
            this.cwCloseConfig();
            this.refreshDisplayPriority();
        };

        Scene_Base.prototype.cwToFront = function() {
            this._windowLayer.children.some(function(child){
                if (child.priority === this._touchWindow.priority + 1) {
                    child.priority--;
                    this._touchWindow.priority++;
                    return true;
                }
            },this);
            this.cwhidePriority();
        };

        Scene_Base.prototype.cwToTheFront = function() {
            this._windowLayer.children.forEach(function(child){
                if (child.priority > this._touchWindow.priority) {
                    child.priority--;
                    return true;
                }
            },this);
            this._touchWindow.priority = this._windowLayer.children.length - 1;
            this.cwhidePriority();
        };

        Scene_Base.prototype.cwToBack = function() {
            this._windowLayer.children.some(function(child){
                if (child.priority === this._touchWindow.priority - 1) {
                    child.priority++;
                    this._touchWindow.priority--;
                    return true;
                }
            },this);
            this.cwhidePriority();
        };

        Scene_Base.prototype.cwToTheBack = function() {
            this._windowLayer.children.forEach(function(child){
                if (child.priority < this._touchWindow.priority) {
                    child.priority++;
                    return true;
                }
            },this);
            this._touchWindow.priority = 0;
            this.cwhidePriority();
        };

        /*
        パラメータ表示設定変更
        */
        Scene_Base.prototype.csspSetCmdListOrder = function(parentSymbol) {
            SoundManager.playSave();
            this._touchWindow.refresh();
            this.saveConfigValues();
            parent = this.getOptionWindow(parentSymbol);
            parent.hideChildWindowsAll();
            parent.refresh();
            parent.activate();
        };

        Scene_Base.prototype.getOptionWindow = function(symbol) {
            var result = null;
            this._settingLayer.children.some(function(child) {
                if (child && child._windowSymbol === symbol) result = child;
            },this);
            return result;
        };

        Scene_Base.prototype.currentOptionWindow = function() {
            var result = null;
            this._settingLayer.children.some(function(child) {
                if (child && child.active) result = child;
            },this);
            return result;
        };

        Scene_Base.prototype.currentCssStatusIndex = function(parent) {
            var current = this.getOptionWindow(parent);
            if (current) {
                var index = current.index();
                return index;
            }
            return -1;
        };

        Scene_Base.prototype.csspToTop = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            consoleLogWIndex('パラメータ順番変更', this.currentCssStatusIndex(parent), this._touchWindow._customCssStatus[index]);
            var currentStatus = this._touchWindow._customCssStatus.splice(index, 1)[0];
            this._touchWindow._customCssStatus.splice(Math.max(index - 1, 0), 0, currentStatus);
            consoleLogWCssStatus();
            this.csspSetCmdListOrder(parent);
        };

        Scene_Base.prototype.csspToTheTop = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            consoleLogWIndex('パラメータ順番変更', this.currentCssStatusIndex(parent), this._touchWindow._customCssStatus[index]);
            var currentStatus = this._touchWindow._customCssStatus.splice(index, 1)[0];
            this._touchWindow._customCssStatus.unshift(currentStatus);
            consoleLogWCssStatus();
            this.csspSetCmdListOrder(parent);
        };

        Scene_Base.prototype.csspToBottom = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            consoleLogWIndex('パラメータ順番変更', this.currentCssStatusIndex(parent), this._touchWindow._customCssStatus[index]);
            var currentStatus = this._touchWindow._customCssStatus.splice(index, 1)[0];
            var max = this._touchWindow._customCssStatus.length;
            this._touchWindow._customCssStatus.splice(Math.min(index + 1, max - 1), 0, currentStatus);
            consoleLogWCssStatus();
            this.csspSetCmdListOrder(parent);
        };

        Scene_Base.prototype.csspToTheBottom = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            consoleLogWIndex('パラメータ順番変更', this.currentCssStatusIndex(parent), this._touchWindow._customCssStatus[index]);
            var currentStatus = this._touchWindow._customCssStatus.splice(index, 1)[0];
            this._touchWindow._customCssStatus.push(currentStatus);
            consoleLogWCssStatus();
            this.csspSetCmdListOrder(parent);
        };

        Scene_Base.prototype.addCustomCssStatusAt = function(index, parent) {
            var i = this._touchWindow._customCssStatus.length;
            if (index >= i) {
                this._touchWindow._customCssStatus.push({text: 'null', x: 0, y: 0, width:0});
            } else if (index <= 0){
                this._touchWindow._customCssStatus.unshift({text: 'null', x: 0, y: 0, width:0});
            } else {
                this._touchWindow._customCssStatus.splice(index, 0, {text: 'null', x: 0, y: 0, width:0});
            }
            consoleLogWIndex('パラメータ追加', index, this._touchWindow._customCssStatus);
            this.csspSetCmdListOrder(parent);
        };

        Scene_Base.prototype.csspAddTop = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            this.addCustomCssStatusAt(index, parent);
        };
        
        Scene_Base.prototype.csspAddBottom = function(parent) {
            var index = this.currentCssStatusIndex(parent) + 1;
            this.addCustomCssStatusAt(index, parent);
        };

        Scene_Base.prototype.csspDeleteCommand = function(parent) {
            var index = this.currentCssStatusIndex(parent);
            console.log(index, this._touchWindow._customCssStatus.length);
            var data = this._touchWindow._customCssStatus.splice(index, 1);
            consoleLogWIndex('パラメータ削除', null, data);
            this.csspSetCmdListOrder(parent);
        };

        var consoleLogWCssStatus = function() {
            SceneManager._scene._touchWindow._customCssStatus.forEach(function(cmd, i){
                console.log('表示番号', i, 'パラメータ名', cmd.text, '表示位置', cmd.x, cmd.y, cmd.width);
            });
        };

        //------------------------------------------------------------------------
        //コマンドウィンドウのコマンド編集用ウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createFtkrCommandOptions = function() {
            var width = 240, textWidth = 220, statusWidth = 0;
            var layer = this.configLayer();
            this._cmdConfigWindow = new Window_FtkrOptions(layer, width, textWidth, statusWidth, 'cmdConfig');
            this._cmdConfigWindow.setHandler('cancel', this.cwCloseConfig.bind(this));
            layer.addChild(this._cmdConfigWindow);
        };

        //コマンドコンテンツの設定読込
        Scene_Base.prototype.setConfigContents_command = function(configValues) {
            var configContents = [
                {type: 'subConfig', name: 'コマンド編集', symbol: 'editCmd', enabled: true, options: {subConfigs: [
                    {type: 'string', name: '表示名',   symbol: 'name',         enabled: true, options: {}},
                    {type: 'string', name: '実行条件', symbol: 'enabled',      enabled: true, options: {}},
                    {type: 'line'},
                    {type: 'selectwindow', name: '実行設定', symbol: 'methodType',   enabled: true, options: {select:COMMAND_METHOD}},
                    {type: 'refer',  name: '実行詳細', symbol: 'methodDetail', enabled: true, options: {refSymbol:['methodType'], refData:FTKR_METHOD_DATALIST(this)}},
                    {type: 'refer',  name: '実行詳細2', symbol: 'methodDetail2', enabled: true, options:  {refSymbol:['methodType'], refData:FTKR_METHOD_DATALIST2}},
                    {type: 'line'},
                    {type: 'save',   name: '決定'},
                ], width: 500, textWidth: 220, statusWidth: 220}},
                {type: 'line'},
                {type: 'subConfig', name: '表示順番', symbol: 'order', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '上部に移動　', symbol: 'toTop',       enabled: true, options: {method:this.cwToTop.bind(this)}},
                    {type: 'command', name: '最上部に移動', symbol: 'toTheTop',    enabled: true, options: {method:this.cwToTheTop.bind(this)}},
                    {type: 'line'},
                    {type: 'command', name: '下部に移動　', symbol: 'toBottom',    enabled: true, options: {method:this.cwToBottom.bind(this)}},
                    {type: 'command', name: '最下部に移動', symbol: 'toTheBottom', enabled: true, options: {method:this.cwToTheBottom.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
                {type: 'line'},
                {type: 'subConfig', name: 'コマンド追加', symbol: 'addCmd', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '上部に追加', symbol: 'addTop',       enabled: true, options: {method:this.cwAddTop.bind(this)}},
                    {type: 'command', name: '下部に追加', symbol: 'addBottom',    enabled: true, options: {method:this.cwAddBottom.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
                {type: 'line'},
                {type: 'command', name: 'コマンド非表示',   symbol: 'hide',   enabled: true, options: {method:this.cwHideCommand.bind(this)}},
                {type: 'command', name: 'コマンド削除　',   symbol: 'delete', enabled: true, options: {method:this.cwDeleteCommand.bind(this)}},
            ];
            //設定したコンテンツデータをオプションウィンドウに反映
            this._cmdConfigWindow.setConfigContents(configContents, configValues);
        };

        Scene_Base.prototype.cwSetCmdListOrder = function() {
            SoundManager.playMagicEvasion();
            this._touchWindow.saveContainerInfo();
            this._touchWindow.createContents();
            this._touchWindow.refresh();
            if (this._cmdConfigWindow.visible) {
                this._cmdConfigWindow.hideAll();
            } else if (this._selectConfigWindow.visible) {
                this._selectConfigWindow.hideAll();
            } else if (this._commonConfigWindow.visible) {
                this._commonConfigWindow.hideAll();
            }
            this.releaceTouchWindow();
            this.releaseActiveWindow();
        };
        
        Scene_Base.prototype.cwToTop = function() {
            var currentCmd = this.currentListCommand();
            consoleLogWIndex('コマンド順番変更', this.currentListIndex(), currentCmd);
            this._touchWindow._customList.some(function(child){
                if (child.index === currentCmd.index - 1) {
                    child.index++;
                    currentCmd.index--;
                    return true;
                }
            },this);
            this._touchWindow.sortCustomList();
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.cwToTheTop = function() {
            var currentCmd = this.currentListCommand();
            consoleLogWIndex('コマンド順番変更', this.currentListIndex(), currentCmd);
            this._touchWindow._customList.forEach(function(child){
                if (child.index < currentCmd.index) {
                    child.index++;
                    return true;
                }
            },this);
            currentCmd.index = 0;
            this._touchWindow.sortCustomList();
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.cwToBottom = function() {
            var currentCmd = this.currentListCommand();
            consoleLogWIndex('コマンド順番変更', this.currentListIndex(), currentCmd);
            this._touchWindow._customList.some(function(child){
                if (child.index === currentCmd.index + 1) {
                    child.index--;
                    currentCmd.index++;
                    return true;
                }
            },this);
            this._touchWindow.sortCustomList();
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.cwToTheBottom = function() {
            var currentCmd = this.currentListCommand();
            consoleLogWIndex('コマンド順番変更', this.currentListIndex(), currentCmd);
            this._touchWindow._customList.forEach(function(child){
                if (child.index > currentCmd.index) {
                    child.index--;
                    return true;
                }
            },this);
            currentCmd.index = this._touchWindow._customList.length - 1;
            this._touchWindow.sortCustomList();
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.addCustomCommandAt = function(index) {
            var i = this._touchWindow._customList.length;
            this._touchWindow.addCustomCommandAt(index, 'コマンド' + i, 'cmd' + i, 'true');
            consoleLogWIndex('コマンド追加', index, this._touchWindow._customList);
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.cwAddTop = function() {
            var index = this.currentListIndex();
            this.addCustomCommandAt(index);
        };
        
        Scene_Base.prototype.cwAddBottom = function() {
            var index = this.currentListIndex() + 1;
            this.addCustomCommandAt(index);
        };

        Scene_Base.prototype.cwHideCommand = function() {
            var index = this.currentListIndex();
            this._touchWindow._customList[index].visible = false;
            consoleLogWIndex('コマンド非表示', index, this._touchWindow._customList[index]);
            this.cwSetCmdListOrder();
        };
        
        Scene_Base.prototype.cwDeleteCommand = function() {
            var index = this.currentListIndex();
            var data = this._touchWindow._customList.splice(index, 1);
            this._touchWindow._customList.forEach(function(cmd, i){
                if (i >= index) {
                    cmd.index--;
                }
            });
            consoleLogWIndex('コマンド削除', null, data);
            this.cwSetCmdListOrder();
        };

        var consoleLogWIndex = function(text, index, result) {
            var scene = SceneManager._scene;
            text = text + '：';
            if(index == null) index = this._touchWindowIndex;
            var name = !!scene._touchWindow ? scene._touchWindow.name : undefined;
            console.log(text, name, '行数', index, '内容', result);
        };

        var consoleLogWCommand = function() {
            SceneManager._scene._touchWindow._customList.forEach(function(cmd){
                console.log('行番', cmd.index, 'コマンド名', cmd.name, '表示', cmd.visible);
            });
        };

        //------------------------------------------------------------------------
        //セレクトウィンドウのテキスト編集用ウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createFtkrSelectOptions = function() {
            var width = 240, textWidth = 220, statusWidth = 0;
            var layer = this.configLayer();
            this._selectConfigWindow = new Window_FtkrOptions(layer, width, textWidth, statusWidth);
            this._selectConfigWindow.setHandler('cancel', this.cwCloseConfig.bind(this));
            layer.addChild(this._selectConfigWindow);
        };

        //セレクトコンテンツの設定読込
        Scene_Base.prototype.setConfigContents_select = function(configValues) {
            var configContents = [
                {type: 'command', name: 'テキスト編集', symbol: 'setText', enabled: true, options: {method:this.cwSetText.bind(this)}},
                {type: 'subConfig', name: 'テキスト追加', symbol: 'addText', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '上部に追加', symbol: 'addTop',       enabled: true, options: {method:this.cwAddTopText.bind(this)}},
                    {type: 'command', name: '下部に追加', symbol: 'addBottom',    enabled: true, options: {method:this.cwAddBottomText.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
                {type: 'command', name: 'テキスト削除　',   symbol: 'delete', enabled: true, options: {method:this.cwDeleteCommand.bind(this)}},
            ];
            //設定したコンテンツデータをオプションウィンドウに反映
            this._selectConfigWindow.setConfigContents(configContents, configValues);
        };
        
        //------------------------------------------------------------------------
        //コモンウィンドウのテキスト編集用ウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createFtkrCommonOptions = function() {
            var width = 240, textWidth = 220, statusWidth = 0;
            var layer = this.configLayer();
            this._commonConfigWindow = new Window_FtkrOptions(layer, width, textWidth, statusWidth);
            this._commonConfigWindow.setHandler('cancel', this.cwCloseConfig.bind(this));
            layer.addChild(this._commonConfigWindow);
        };

        //コモンコンテンツの設定読込
        Scene_Base.prototype.setConfigContents_common = function(configValues) {
            var configContents = [
                {type: 'command', name: 'テキスト編集', symbol: 'setText', enabled: true, options: {method:this.cwSetText.bind(this)}},
                {type: 'subConfig', name: '表示順番', symbol: 'order', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '上部に移動　', symbol: 'toTop',       enabled: true, options: {method:this.cwToTop.bind(this)}},
                    {type: 'command', name: '最上部に移動', symbol: 'toTheTop',    enabled: true, options: {method:this.cwToTheTop.bind(this)}},
                    {type: 'line'},
                    {type: 'command', name: '下部に移動　', symbol: 'toBottom',    enabled: true, options: {method:this.cwToBottom.bind(this)}},
                    {type: 'command', name: '最下部に移動', symbol: 'toTheBottom', enabled: true, options: {method:this.cwToTheBottom.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
                {type: 'subConfig', name: 'テキスト追加', symbol: 'addText', enabled: true, options: {subConfigs: [
                    {type: 'command', name: '上部に追加', symbol: 'addTop',       enabled: true, options: {method:this.cwAddTopText.bind(this)}},
                    {type: 'command', name: '下部に追加', symbol: 'addBottom',    enabled: true, options: {method:this.cwAddBottomText.bind(this)}},
                ], width: 240, textWidth: 204, statusWidth: 0}},
                {type: 'command', name: 'テキスト削除　',   symbol: 'delete', enabled: true, options: {method:this.cwDeleteCommand.bind(this)}},
            ];
            //設定したコンテンツデータをオプションウィンドウに反映
            this._commonConfigWindow.setConfigContents(configContents, configValues);
        };
        
        Scene_Base.prototype.cwSetText = function() {
            var list = this._touchWindow._customList[this._touchWindowIndex];
            if (!(list instanceof Object)) list = {name:'', index:this._touchWindowIndex, visible:true};
            var oldStr = list.name;
            list.name = getPromptResult(list.name);
            if (oldStr !== list.name) {
                consoleLogWIndex('テキスト編集', null, list.name);
            }
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.addCustomTextAt = function(index) {
            var i = this._touchWindow._customList.length;
            this._touchWindow.addCustomCommandAt(index, 'テキスト' + i);
            consoleLogWIndex('テキスト追加', index, this._touchWindow._customList);
            consoleLogWCommand();
            this.cwSetCmdListOrder();
        };

        Scene_Base.prototype.cwAddTopText = function() {
            var index = this._touchWindowIndex;
            this.addCustomTextAt(index);
        };
        
        Scene_Base.prototype.cwAddBottomText = function() {
            var index = this._touchWindowIndex + 1;
            this.addCustomTextAt(index);
        };

        //------------------------------------------------------------------------
        //ウィンドウ削除時の確認ウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createOswConfTitleWindow = function() {
            var layer = this.configLayer();
            this._stsConfTitleWindow = new Window_OSWConfTitle();
            layer.addChild(this._stsConfTitleWindow);
            this._stsConfTitleWindow.hide();
        };

        Scene_Base.prototype.createOswConfWindow = function() {
            this._stsConfWindow = new Window_OSWConf();
            var layer = this.configLayer();
            var window = this._stsConfWindow;
            window.setHandler('delete', this.onOswConfirmationOk.bind(this));
            window.setHandler('cancel', this.onOswConfirmationCancel.bind(this));
            layer.addChild(window);
        };

        Scene_Base.prototype.onOswConfirmationOk = function() {
            this.deleteTouchWindow();
            this._touchWindow = null;
            this._stsConfTitleWindow.hide();
            this._stsConfWindow.hide();
            this._stsConfWindow.deactivate();
            this._mainConfigWindow.hide();
        };

        Scene_Base.prototype.deleteTouchWindow = function() {
            console.log('ウィンドウ削除：', this._touchWindow.name);
            this._windowLayer.removeChild(this._touchWindow);
            var type = this._touchWindow._windowType;
            var windowId = this._touchWindow._windowId;
            switch(type) {
                case Game_OswData.WINDOW_COMMON:
                    this._oswCommonWindows[windowId] = null;
                    break;
                case Game_OswData.WINDOW_COMMAND:
                    this._oswCommandWindows[windowId] = null;
                    break;
                case Game_OswData.WINDOW_SELECTABLE:
                    this._oswSelectWindows[windowId] = null;
                    break;
                default:
                    return;
            }
            this.removeOswWindow(convertWindowName(type), windowId);
        };

        Scene_Base.prototype.removeOswWindow = function(windowType, windowId) {
            this._oswWindowList.some(function(list, i){
                if (list.type == windowType && list.id == windowId) {
                    this._oswWindowList.splice(i, 1);
                    return true;
                }
            },this);
            this.saveOswWindowList();
        };

        Scene_Base.prototype.onOswConfirmationCancel = function() {
            this._stsConfTitleWindow.hide();
            this._stsConfWindow.hide();
            this._stsConfWindow.deactivate();
            this._mainConfigWindow.activate();
        };

        //------------------------------------------------------------------------
        //ウィンドウ作成コマンド用のウィンドウを設定
        //------------------------------------------------------------------------
        Scene_Base.prototype.createSettingNewWindow = function() {
            this._cwCreateNewW = new Window_CreateNewWindowCommand();
            this._cwCreateNewW.setHandler('common', this.cwSetCommon.bind(this));
            this._cwCreateNewW.setHandler('select', this.cwSetSelect.bind(this));
            this._cwCreateNewW.setHandler('command', this.cwSetCommand.bind(this));
            this._cwCreateNewW.setHandler('cancel', this.cwCreateNewCancel.bind(this));
            this._settingLayer.addChild(this._cwCreateNewW);
        };

        Scene_Base.prototype.cwSetCommon = function() {
            this.cwCreateNewWindow(Game_OswData.WINDOW_COMMON);
        };

        Scene_Base.prototype.cwSetSelect = function() {
            this.cwCreateNewWindow(Game_OswData.WINDOW_SELECTABLE);
        };

        Scene_Base.prototype.cwSetCommand = function() {
            this.cwCreateNewWindow(Game_OswData.WINDOW_COMMAND);
        };

        Scene_Base.prototype.cwCreateNewWindow = function(windowType, windowId) {
            var createWindow = null;
            switch (windowType) {
                case Game_OswData.WINDOW_COMMON:
                    if(window !== undefined) {
                        if (!this._oswCommonWindows) this._oswCommonWindows = [];
                        if(!this._oswCommonWindows.some(function(window, i){
                            if (!window) {
                                windowId = i;
                                return true;
                            }
                        })) windowId = this._oswCommonWindows.length;
                    }
                    this.createOswCommonWindow(windowId);
                    createWindow = this._oswCommonWindows[windowId];
                    break;
                case Game_OswData.WINDOW_COMMAND:
                    if(window !== undefined) {
                        if(!this._oswCommandWindows) this._oswCommandWindows = [];
                        if(!this._oswCommandWindows.some(function(window, i){
                            if (!window) {
                                windowId = i;
                                return true;
                            }
                        })) windowId = this._oswCommandWindows.length;
                    }
                    this.createOswCommandWindow(windowId);
                    createWindow = this._oswCommandWindows[windowId];
                    break;
                case Game_OswData.WINDOW_SELECTABLE:
                    if(window !== undefined) {
                        if(!this._oswSelectWindows) this._oswSelectWindows = [];
                        if(!this._oswSelectWindows.some(function(window, i){
                            if (!window) {
                                windowId = i;
                                return true;
                            }
                        })) windowId = this._oswSelectWindows.length;
                    }
                    this.createOswSelectWindow(windowId);
                    createWindow = this._oswSelectWindows[windowId];
                    break;
            }
            SoundManager.playMagicEvasion();
            this.addOswWindow(convertWindowName(windowType), windowId);
            this.saveOswWindowList();
            createWindow.priority = this._windowLayer.children.length - 1;
            createWindow.name = windowId + '_' + getClassName(createWindow);
            createWindow.saveContainerInfo();
            this._cwCreateNewW.hide();
            console.log('ウィンドウ作成：', createWindow.name);
            this.cwCloseConfig();
            return createWindow;
        };

        Scene_Base.prototype.cwCreateNewCancel = function() {
            this._mainConfigWindow.activate();
            this._cwCreateNewW.hide();
        };

        Scene_Base.prototype.cwStatusListOk = function() {
            this._statusListWindow.activate();
        };

        Scene_Base.prototype.cwStatusListCancel = function() {
            this._statusListWindow.hide();
            this._dispConfigWindow.childWindows()[5].activate();
        };

        //=============================================================================
        // 編集メニューのサブコマンドウィンドウの設定
        //=============================================================================
        function Window_CreateNewWindowCommand() {
            this.initialize.apply(this, arguments);
        }

        Window_CreateNewWindowCommand.prototype = Object.create(Window_Command.prototype);
        Window_CreateNewWindowCommand.prototype.constructor = Window_CreateNewWindowCommand;
        
        Window_CreateNewWindowCommand.prototype.initialize = function() {
            this._ftkrEditor = true;
            Window_Command.prototype.initialize.call(this, 0, 0);
            var x = Graphics.boxWidth - this.windowWidth();
            var y = Graphics.boxHeight - this.windowHeight();
            this.move(x/2, y/2, this.width, this.height);
            this.deactivate();
            this.hide();
        };

        Window_CreateNewWindowCommand.prototype.isOswOption = function() {
            return true;
        };

        Window_CreateNewWindowCommand.prototype.windowWidth = function() {
            return 240;
        };

        Window_CreateNewWindowCommand.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_CreateNewWindowCommand.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_CreateNewWindowCommand.prototype.makeCommandList = function() {
            this.addCommand('コモンウィンドウ',   'common');
            this.addCommand('セレクトウィンドウ', 'select');
            this.addCommand('コマンドウィンドウ', 'command');
        };

        //=============================================================================
        // パラメータ設定用ウィンドウベース
        //=============================================================================
        function Window_FtkrOptionsBase() {
            this.initialize.apply(this, arguments);
        }

        Window_FtkrOptionsBase.prototype = Object.create(Window_Command.prototype);
        Window_FtkrOptionsBase.prototype.constructor = Window_FtkrOptionsBase;
        
        Window_FtkrOptionsBase.prototype.initialize = function(layer, width, textWidth, statusWidth, symbol, parentConfig, parentWindow, masterWindow) {
            this._ftkrEditor = true;
            this._parentConfig   = parentConfig;
            this._masterWindow   = masterWindow;
            this._parentWindow   = parentWindow;
//            this._parentIndex    = -1;
            this._childWindows = [];
            this._windowSymbol   = symbol;
            this._windowWidth    = width;
            this._textWidth      = textWidth;
            this._statusWidth    = statusWidth;
            this._configContents = [];
            this._configValues   = {};
            this._oldConfigValues = {};
            this.setWindowLayer(layer);
            Window_Command.prototype.initialize.call(this, 0, 0);
    //          this.updatePlacement();
            this.deactivate();
            this.hide();
        };

        Window_FtkrOptionsBase.prototype.isOswOption = function() {
            return true;
        };

        //親ウィンドウかどうかの判定
        Window_FtkrOptionsBase.prototype.isParent = function() {
            return !this._parentWindow;
        };

        Window_FtkrOptionsBase.prototype.childWindows = function() {
            return this._childWindows;
        };

        Window_FtkrOptionsBase.prototype.windowLayer = function() {
            return this._windowLayer;
        };

        Window_FtkrOptionsBase.prototype.setWindowLayer = function(layer) {
            this._windowLayer = layer;
        };

        Window_FtkrOptionsBase.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_FtkrOptionsBase.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        //再描画処理
        Window_FtkrOptionsBase.prototype.refresh = function() {
            this.clearCommandList();
            this.makeCommandList();
            this.updatePlacement();
            this.createContents();
            Window_Selectable.prototype.refresh.call(this);
            this.childWindows().forEach(function(window){
                if (window) window.refresh();
            },this);
        };

        //------------------------------------------------------------------------
        //コンフィグ内容の参照
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.setConfigContents = function(configContents, configValues) {
            this._configContents = configContents;
            this._oldConfigValues = configValues;
            this._configValues = copyConfigSymbolvalues(configContents, configValues);
            this.refresh();
        };

        Window_FtkrOptionsBase.prototype.configContentOptions = function(index) {
            return this.configContents()[index].options;
        };

        Window_FtkrOptionsBase.prototype.findConfigContentSymbol = function(symbol) {
            for (var i = 0; i < this.configContents().length; i++) {
                if (this.configContents()[i].symbol === symbol) {
                    return i;
                }
            }
            return -1;
        };

        Window_FtkrOptionsBase.prototype.configContents = function() {
            return this._parentConfig;
        };

        //------------------------------------------------------------------------
        //コンフィグデータの参照
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.oldConfigValues = function() {
            return this._masterWindow._oldConfigValues;
        };

        Window_FtkrOptionsBase.prototype.configValues = function() {
            return this._masterWindow._configValues;
        };

        Window_FtkrOptionsBase.prototype.getConfigValue = function(symbol) {
            var match = /([^\[]+)\[([^\]]+)\].(.+)/i.exec(symbol);
            if (match) {
                var refSymbol = this._masterWindow._configValues[match[1]]
                var prop = match[2] == 'index' ? this._parentWindow._parentIndex : match[2];
                if (refSymbol && !(prop < 0)) {
                    var refSymbolA = refSymbol[prop];
                    if (refSymbolA) {
                        return refSymbolA[match[3]];
                    }
                }
            }
            return this._masterWindow._configValues[symbol];
        };

        Window_FtkrOptionsBase.prototype.setConfigValue = function(symbol, value) {
            var match = /([^\[]+)\[([^\]]+)\].(.+)/i.exec(symbol);
            if (match) {
                var refSymbol = this._masterWindow._configValues[match[1]]
                var prop = match[2] == 'index' ? this._parentWindow._parentIndex : match[2];
                if (refSymbol && !(prop < 0)) {
                    var refSymbolA = refSymbol[prop];
                    if (refSymbolA) {
                        refSymbolA[match[3]] = value;
                        return;
                    }
                }
            }
            this._masterWindow._configValues[symbol] = value;
        };

        //------------------------------------------------------------------------
        //サイズ設定
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.windowWidth = function() {
            return this._windowWidth;
        };
        
        Window_FtkrOptionsBase.prototype.windowHeight = function() {
            return this.fittingHeight(Math.min(this._list.length, 12));
        };
        
        Window_FtkrOptionsBase.prototype.textWidth = function() {
            return this._textWidth;
        };

        Window_FtkrOptionsBase.prototype.statusWidth = function() {
            return this._statusWidth;
        };

        Window_FtkrOptionsBase.prototype.updatePlacement = function() {
            this.width  = this.windowWidth();
            this.height = this.windowHeight();
        };
        
        //------------------------------------------------------------------------
        //表示するコンテンツリストの設定
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.makeCommandList = function() {
            this.configContents().forEach( function(item) {
                this.addConfig(item.name, item.type, item.symbol, item.enabled, item.options);
            },this);
        };

        Window_FtkrOptionsBase.prototype.addConfig = function(name, type, symbol, enabled, options) {
            if (enabled === undefined) {
                enabled = true;
            }
            if (options === undefined || !(options instanceof Object)) {
                options = {};
            }
            if (type !== undefined && type.toUpperCase() === 'COMMAND' && !!this._handlers) {
                this.setHandler(symbol, options.method);
            }
            this._list.push({ name: name, type: type, symbol: symbol, enabled: enabled, ext: null, options:options});
        };

        Window_FtkrOptionsBase.prototype.list = function(index) {
            return this._list[index];
        };

        Window_FtkrOptionsBase.prototype.commandName = function(index) {
            return this.list(index).name;
        };

        Window_FtkrOptionsBase.prototype.commandSymbol = function(index) {
            return this.list(index).symbol;
        };

        Window_FtkrOptionsBase.prototype.isCommandEnabled = function(index) {
            var enabled = this.list(index).enabled;
            return typeof enabled === 'string' ? !!eval(enabled) : enabled;
        };

        Window_FtkrOptionsBase.prototype.commandType = function(index) {
            return this.list(index).type;
        };

        Window_FtkrOptionsBase.prototype.commandOptions = function(index) {
            return this.list(index).options;
        };

        //------------------------------------------------------------------------
        //描画処理
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.drawItem = function(index) {
            var rect = this.itemRectForText(index);
            var statusWidth = this.statusWidth();
            var titleWidth = this.textWidth();
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            if (this.commandType(index).toUpperCase() === 'LINE') {
                this.drawHorzLine(rect.y);
            } else {
                this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
                this.drawText(this.statusText(index), rect.width - statusWidth, rect.y, statusWidth, 'right');
            }
        };
        
        Window_FtkrOptionsBase.prototype.statusText = function(index) {
            var type   = this.commandType(index);
            var symbol = this.commandSymbol(index);
            var value  = this.getConfigValue(symbol);
            var options = this.commandOptions(index);
            return this.statusTextBase(type, options, value);
        };

        Window_FtkrOptionsBase.prototype.statusTextBase = function(type, options, value) {
            switch((type + '').toUpperCase()) {
                case 'NUMBER':
                    return this.numberStatusText(options, value);
                case 'SELECT':
                case 'SELECTWINDOW':
                    return this.selectStatusText(options, value);
                case 'BOOLEAN':
                    return this.booleanStatusText(value);
                case 'DATA':
                case 'DATAWINDOW':
                    return this.dataStatusText(options, value);
                case 'REFER':
                    return this.referenceStatusText(options, value);
                case 'STRING':
                    return value;
                case 'NONE':
                case 'COMMAND':
                case 'HANDLER':
                case 'SUBCONFIG':
                case 'WINDOW':
                default:
                    return '';
            }
        };

        //------------------------------------------------------------------------
        // コンフィグデータの変更処理
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.redrawAllItems = function() {
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    this.redrawItem(index);
                }
            }
        };

        Window_FtkrOptionsBase.prototype.changeValue = function(symbol, value) {
            var lastValue = this.getConfigValue(symbol);
            if (lastValue !== value) {
                this.setConfigValue(symbol, value);
                this.redrawAllItems();
                SoundManager.playCursor();
            }
        };

        //------------------------------------------------------------------------
        //行線 LINE
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.drawHorzLine = function(y) {
            var lineY = y + this.lineHeight() / 2 - 1;
            this.contents.paintOpacity = 48;
            this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
            this.contents.paintOpacity = 255;
        };

        Window_FtkrOptionsBase.prototype.lineColor = function() {
            return this.normalColor();
        };
        
        //------------------------------------------------------------------------
        //文字列 STRING
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.inputStringValue = function(symbol) {
            var value  = this.getConfigValue(symbol);
            value = getPromptResult(value);
            this.changeValue(symbol, value);
        };

        //------------------------------------------------------------------------
        //数値 NUMBER
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.adjustNumberStatus = function(options, value) {
            value = (value === undefined || isNaN(value)) ? 0 : Number(value);
            if (options.min !== undefined) value = Math.max(value, options.min);
            if (options.max !== undefined) value = Math.min(value, options.max);
            return value;
        };

        Window_FtkrOptionsBase.prototype.numberStatusText = function(options, value) {
            return this.adjustNumberStatus(options, value);
        };

        Window_FtkrOptionsBase.prototype.inputNumberValue = function(symbol) {
            var value  = this.getConfigValue(symbol);
            value = Number(getPromptResult(value));
            this.changeValue(symbol, value);
        };

        Window_FtkrOptionsBase.prototype.changeNumberValue = function(symbol, options, flag) {
            var value  = this.getConfigValue(symbol);
            value += this.numberOffset(options) * flag;
            value = this.adjustNumberStatus(options, value);
            this.changeValue(symbol, value);
        };

        Window_FtkrOptionsBase.prototype.numberOffset = function(options) {
            var offset = Number(options.offset) || 0;
            return offset * (Input.isPressed('shift') ? 10 : 1);
        };

        //------------------------------------------------------------------------
        //論理型 BOOLEAN
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.booleanStatusText = function(value) {
            return !!value ? 'ON' : 'OFF';
        };

        Window_FtkrOptionsBase.prototype.changeBooleanValue = function(symbol) {
            var value  = this.getConfigValue(symbol);
            this.changeValue(symbol, !value);
        };

        //------------------------------------------------------------------------
        //セレクトリスト SELECT
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.convertOptionSelectValue = function(options, value) {
            if(isNaN(value)) {
                options.select.some(function(data, i){
                    if(options.value) {
                        if(data && data.value== value) {
                            value = i;
                            return true;
                        }
                    } else {
                        if(data && data == value) {
                            value = i;
                            return true;
                        }
                    }
                });
            }
            return this.adjustSelectStatus(options, value);
        };

        Window_FtkrOptionsBase.prototype.adjustSelectStatus = function(options, value) {
            value = (value === undefined || isNaN(value)) ? 0 : Number(value);
            var min = 0;
            var max = options.select.length - 1;
            if (value < min) value = max;
            if (value > max) value = min;
            return value;
        };

        Window_FtkrOptionsBase.prototype.selectStatusText = function(options, value) {
            value = this.convertOptionSelectValue(options, value);
            return (options.value ? options.select[value].text : options.select[value]) || 'なし';
        };
        
        Window_FtkrOptionsBase.prototype.selectStatusTextValue = function(options, value) {
            value = this.convertOptionSelectValue(options, value);
            return options.select[value].value || '';
        };
        
        Window_FtkrOptionsBase.prototype.inputSelectValue = function(symbol, options) {
            
        };

        Window_FtkrOptionsBase.prototype.changeSelectValue = function(symbol, options, flag) {
            var value  = this.getConfigValue(symbol);
            value = this.convertOptionSelectValue(options, value);
            value += flag;
            value = this.adjustSelectStatus(options, value);
            this.changeValue(symbol, value);
        };

        //------------------------------------------------------------------------
        //データリスト DATA
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.optionDataList = function(options) {
            return options.enabled ? options.data.filter(function(data){
                return !!data ? eval(options.enabled) : true;
            }) : options.data;
        };

        Window_FtkrOptionsBase.prototype.adjustDataStatus = function(options, value) {
            var min = 0;
            var max = this.optionDataList(options).length - 1;
            value = (value === undefined || isNaN(value)) ? min : Number(value);
            if (value < min) value = max;
            if (value > max) value = min;
            return value;
        };

        Window_FtkrOptionsBase.prototype.convertOptionDataValue = function(options, value) {
            if(isNaN(value)) {
                this.optionDataList(options).some(function(data, i){
                    if(data && (options.property && data[options.property] == value) || data == value) {
                        value = i;
                        return true;
                    }
                });
            }
            return this.adjustDataStatus(options, value);
        };

        Window_FtkrOptionsBase.prototype.dataStatusText = function(options, value) {
            var data = this.optionDataList(options);
            var prop = options.property;
            value = this.convertOptionDataValue(options, value);
            if (!value && !data[0]) return 'なし';
            return prop ? data[value][prop] : data[value];
        };

        Window_FtkrOptionsBase.prototype.changeDataValue = function(symbol, options, flag) {
            var data = this.optionDataList(options);
            var value  = this.getConfigValue(symbol);
            value = this.convertOptionDataValue(options, value);
            value += flag;
            value = this.adjustDataStatus(options, value);
            this.changeValue(symbol, value);
        };

        //------------------------------------------------------------------------
        //参照 REFER
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.getReferenceConfig = function(options) {
            var refValues = options.refSymbol.map(function(symbol){
                return this.getConfigValue(symbol);
            },this);
            if (options.refIndex) {
                refValues = refValues.map(function(value){
                    var index = -1;
                    var prop = options.property;
                    options.refIndex.some(function(data, i) {
                        if ((prop ? data[prop] : data) == value) {
                            index = i;
                            return true;
                        }
                    },this);
                    return index >= 0 ? index : value;
                },this);
            }
            var config = options.refData;
            refValues.forEach(function(value, i){
                if (value !== undefined && config) {
                    config = config[value];
                }
            });
            /*
            refValues.forEach(function(value){
                console.log(value);
                config = config[value];
            });*/
            if (!config) config = {type:'none'};
            return config;
        };

        Window_FtkrOptionsBase.prototype.referenceStatusText = function(options, value) {
            var config = this.getReferenceConfig(options);
            var result = this.statusTextBase(config.type, config.options, value);
            return result;
        };

        Window_FtkrOptionsBase.prototype.inputReferenceValue = function(symbol, options, flag) {
            var config = this.getReferenceConfig(options);
            this.processInputValueBase(config.type, symbol, config.options);
        };

        Window_FtkrOptionsBase.prototype.changeReferenceValue = function(symbol, options, flag) {
            var config = this.getReferenceConfig(options);
            this.processChangeValueBase(config.type, symbol, config.options, flag);
        };

        //------------------------------------------------------------------------
        //サブコンフィグ SUBCONFIG
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.showSubConfigs = function(symbol, list, options) {
            if(this.childWindows().some(function(window){
                if (window._windowSymbol === symbol) {
                    if (list) window.setSelectList(list, options);
                    window.setPositionReferWindowIndex(this);
                    window.activateWindow();
                    return true;
                }
            },this)) {
                this.deactivate();
                SoundManager.playCursor();
            }
        };

        //------------------------------------------------------------------------
        //決定(コンフィグデータの保存) SAVE
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.callSaveConfigValues = function(options) {
            this.deactivate();
            this.hide();
            console.log('call save config value', options);
            if (options && options.refreshWindow) {
                options.refreshWindow.forEach(function(symbol){
                    var child = SceneManager._scene.getOptionWindow(symbol);
                    if (child) child.refresh();
                    console.log(symbol, child);
                },this);
            }
            this.configContents().forEach(function(config){
                if (config.type.toUpperCase() == 'SUBCONFIG') {
                    config.options.subConfigs.forEach(function(subConf){
                        this.saveConfigValue(subConf);
                    },this);
                } else {
                    this.saveConfigValue(config);
                }
            },this);
            SoundManager.playSave();
            this.callHandler('saveConfig');
        };

        Window_FtkrOptionsBase.prototype.saveConfigValue = function(config) {
            var type    = config.type;
            var symbol  = config.symbol;
            var options = config.options;
            if (!symbol) return;
            var value = this.getConfigValue(symbol);
            var oldValue = this.oldConfigValues()[symbol];
            if (type.toUpperCase() == 'REFER') {
                var referConfig = this.getReferenceConfig(options);
                value = this.convertConfigValue(referConfig, value);
            } else {
                value = this.convertConfigValue(config, value);
                if(value === undefined) return;
            }
            if (this.oldConfigValues()[symbol] !== value) {
                this.oldConfigValues()[symbol] = value;
                console.log('データ更新：', symbol, value, '←', oldValue);
            }
        };

        Window_FtkrOptionsBase.prototype.convertConfigValue = function(config, value) {
            var type    = config.type;
            var options = config.options;
            switch(type.toUpperCase()) {
                case 'STRING':
                    return value + '';
                case 'NUMBER':
                    return this.adjustNumberStatus(options, value);
                case 'SELECT':
                case 'SELECTWINDOW':
                    value = this.convertOptionSelectValue(options, value);
                    if (options.string) {
                        value = this.selectStatusText(options, value);
                    } else if (options.value) {
                        value = this.selectStatusTextValue(options, value);
                    }
                    return value === 'なし' ? '' : value;
                case 'BOOLEAN':
                    return !!value;
                case 'DATA':
                case 'DATAWINDOW':
                    value = this.convertOptionDataValue(options, value);
                    return options.string ? this.dataStatusText(options, value) : value;
                default:
                    return undefined;
            }
        };

        //------------------------------------------------------------------------
        //決定キーを押したときの処理
        //------------------------------------------------------------------------
        Window_FtkrOptionsBase.prototype.isCurrentItemEnabled = function() {
            return this.isCommandEnabled(this.index());
        };

        Window_FtkrOptionsBase.prototype.processOk = function() {
            if (this.isCurrentItemEnabled()) {
                this.processInputValue();
            } else {
                this.playBuzzerSound();
            }
        };

        Window_FtkrOptionsBase.prototype.processInputValue = function() {
            var index  = this.index();
            var type   = this.commandType(index);
            var symbol = this.commandSymbol(index);
            var options = this.commandOptions(index);
            this.processInputValueBase(type, symbol, options);
        };

        Window_FtkrOptionsBase.prototype.processInputValueBase = function(type, symbol, options) {
            console.log(type, symbol, options);
            switch((type + '').toUpperCase()) {
                case 'STRING':
                    this.inputStringValue(symbol);
                    break;
                case 'NUMBER':
                    this.inputNumberValue(symbol);
                    break;
                case 'SELECT':
                    this.changeSelectValue(symbol, options);
                    break;
                case 'BOOLEAN':
                    this.changeBooleanValue(symbol);
                    break;
                case 'DATA':
                    this.changeDataValue(symbol, options, 1);
                    break;
                case 'REFER':
                    this.inputReferenceValue(symbol, options);
                    break;
                case 'SUBCONFIG':
                case 'WINDOW':
                    this.showSubConfigs(symbol);
                    break;
                case 'SELECTWINDOW':
                    this.showSubConfigs(symbol, options.select, options);
                    break;
                case 'DATAWINDOW':
                    this.showSubConfigs(symbol, options.data, options);
                    break;
                case 'HANDLER':
                    this.callHandler(symbol);
                    break;
                case 'SAVE':
                    this.callSaveConfigValues(options);
                    break;
                case 'COMMAND':
                    this.callHandler(symbol);
                    break;
            }
            this.updateInputData();
        };

        //------------------------------------------------------------------------
        //キャンセルキーを押したときの処理
        //------------------------------------------------------------------------
    /*
        Window_FtkrOptionsBase.prototype.processCancel = function() {
            SoundManager.playCancel();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
        };
    */
        //------------------------------------------------------------------------
        //左右キーを押したときの処理
        //------------------------------------------------------------------------
        //右キー
        Window_FtkrOptionsBase.prototype.cursorRight = function(wrap) {
            if (this.isCurrentItemEnabled()) {
                this.processChangeValue(1);
            } else {
    //            this.playBuzzerSound();
            }
        };

        //左キー
        Window_FtkrOptionsBase.prototype.cursorLeft = function(wrap) {
            if (this.isCurrentItemEnabled()) {
                this.processChangeValue(-1);
            } else {
    //            this.playBuzzerSound();
            }
        };    

        Window_FtkrOptionsBase.prototype.processChangeValue = function(flag) {
            var index  = this.index();
            var type   = this.commandType(index);
            var symbol = this.commandSymbol(index);
            var options = this.commandOptions(index);
            this.processChangeValueBase(type, symbol, options, flag);
        };

        Window_FtkrOptionsBase.prototype.processChangeValueBase = function(type, symbol, options, flag) {
            switch((type + '').toUpperCase()) {
                case 'NUMBER':
                    this.changeNumberValue(symbol, options, flag);
                    break;
                case 'SELECT':
                    this.changeSelectValue(symbol, options, flag);
                    break;
                case 'BOOLEAN':
                    this.changeBooleanValue(symbol);
                    break;
                case 'DATA':
                    this.changeDataValue(symbol, options, flag);
                    break;
                case 'REFER':
                    this.changeReferenceValue(symbol, options, flag);
                    break;
                default:
                    return;
            }
            this.updateInputData();
        };

        Window_FtkrOptionsBase.prototype.hideChildWindows = function(symbol) {
            this._parentWindow.activate();
            this.hide();
        };

        Window_FtkrOptionsBase.prototype.saveConfigValues = function(symbol) {
            this.hideChildWindows();
            this._parentWindow.refresh();
            SceneManager._scene.saveConfigValues();
            this.callHandler('cancel');
        };

        Window_FtkrOptionsBase.prototype.hasCssStatus = function() {
            return this._parentWindow && this._parentWindow.item();
        };

        Window_FtkrOptionsBase.prototype.setSelectListIndex = function(symbol, index, prompt) {
            if (!index && prompt) {
                index = this.getConfigValue(symbol);
                index = getPromptResult(index);
            }
            this.setConfigValue(symbol, index);
            this.refresh();
        };

        //=============================================================================
        // パラメータ設定用ウィンドウ
        //=============================================================================
        function Window_FtkrOptions() {
            this.initialize.apply(this, arguments);
        }

        Window_FtkrOptions.prototype = Object.create(Window_FtkrOptionsBase.prototype);
        Window_FtkrOptions.prototype.constructor = Window_FtkrOptions;
        
        Window_FtkrOptions.prototype.initialize = function(layer, width, textWidth, statusWidth, symbol) {
            width = width || 400;
            textWidth = textWidth || 240;
            statusWidth = statusWidth || 120;
            Window_FtkrOptionsBase.prototype.initialize.call(this, layer, width, textWidth, statusWidth, symbol);
            this.createChildWindows(width, textWidth, statusWidth);
        };

        Window_FtkrOptions.prototype.createChildWindows = function(width, textWidth, statusWidth) {
            this._childWindows.length = 0;
            var configs = this.configContents();
            var parent = this;
            var childConfigs = [];
            while(!!configs) {
                configs.forEach(function(config){
                    if (!!config.parent) parent = config.parent;
                    var childWindow = this.createChildOptionWindow(this, parent, config, width, textWidth, statusWidth);
                    if (!!childWindow && !!config.options.subConfigs) {
                        config.options.subConfigs.forEach(function(subConf){
                            subConf.parent = childWindow;
                        },this);
                        childConfigs = childConfigs.concat(config.options.subConfigs);
                    }
                    if (config.options && config.options.refData) {
                        var subchildren = [];
                        config.options.refData.forEach(function(ref){
                            if (ref instanceof Array) {
                                ref.forEach(function(subref){
                                    subref.parent = parent;
                                    subref.symbol = config.symbol;
                                    subchildren.push(subref);
                                });
                            } else {
                                ref.parent = parent;
                                ref.symbol = config.symbol;
                                subchildren.push(ref);
                            }
                        });
                        childConfigs = childConfigs.concat(subchildren);
                    }
                },this);
                configs = null;
                parent = null;
                if (childConfigs.length) {
                    configs = childConfigs;
                    childConfigs = [];
                }
            }
        };

        Window_FtkrOptions.prototype.createChildOptionWindow = function(master, parent, config, width, textWidth, statusWidth) {
            if(config.type && config.type.toUpperCase() === 'SUBCONFIG' && config.symbol) {
                var cwd = config.options.width || width;
                var ctw = config.options.textWidth || textWidth;
                var csw = config.options.statusWidth || statusWidth;
                var childWindow = new Window_FtkrOptionsBase(this.windowLayer(), cwd, ctw, csw, config.symbol, config.options.subConfigs, parent, master);
                childWindow.setHandler('cancel',     childWindow.hideChildWindows.bind(childWindow, config.symbol));
                childWindow.setHandler('saveConfig', childWindow.saveConfigValues.bind(childWindow, config.symbol));
                parent._childWindows.push(childWindow);
                this.windowLayer().addChild(childWindow);
                return childWindow;
            } else if (config.type && config.type.toUpperCase() === 'WINDOW' && config.symbol) {
                var cwd = config.options.width || width;
                var childWindow = new Window_StatusListConfig(this.windowLayer(), cwd, config.symbol, config.options.subConfigs, parent, master);
                childWindow.setHandler('ok',         childWindow.cwStatusListOk.bind(childWindow));
                childWindow.setHandler('cancel',     childWindow.hideChildWindows.bind(childWindow, config.symbol));
                parent._childWindows.push(childWindow);
                this.windowLayer().addChild(childWindow);
                return childWindow;
             } else if (config.type && config.type.toUpperCase() === 'SELECTWINDOW' && config.symbol) {
                var cwd = config.options.width || width;
                var childWindow = new Window_SelectListOptions(this.windowLayer(), cwd, config.symbol, config.options.select, parent, master);
                childWindow.setHandler('ok',         childWindow.cwSelectListOk.bind(childWindow));
                childWindow.setHandler('cancel',     childWindow.hideChildWindows.bind(childWindow, config.symbol));
                parent._childWindows.push(childWindow);
                this.windowLayer().addChild(childWindow);
                return childWindow;
            } else if (config.type && config.type.toUpperCase() === 'DATAWINDOW' && config.symbol) {
                var cwd = config.options.width || width;
                var childWindow = new Window_SelectListOptions(this.windowLayer(), cwd, config.symbol, config.options.data, parent, master, config.options.property);
                childWindow.setHandler('ok',         childWindow.cwSelectListOk.bind(childWindow));
                childWindow.setHandler('cancel',     childWindow.hideChildWindows.bind(childWindow, config.symbol));
                parent._childWindows.push(childWindow);
                this.windowLayer().addChild(childWindow);
                return childWindow;
            }
            return null;
        };

        Window_FtkrOptions.prototype.cwStatusListCancel = function() {
            this.hide();
            this._dispConfigWindow.childWindows()[5].activate();
        };

        Window_FtkrOptions.prototype.setConfigContents = function(configContents, configValues) {
            this.childWindows().forEach(function(window){
                this.windowLayer().removeChild(window);
            },this);
            this._configContents = configContents;
            this._oldConfigValues = configValues;
            this._configValues = copyConfigSymbolvalues(configContents, configValues);
            this.createChildWindows(this.windowWidth(), this.textWidth(), this.statusWidth());
            this.refresh();
            console.log('setConfigContents');
        };

        Window_FtkrOptionsBase.prototype.hideAll = function() {
            this.hideChildWindowsAll();
            this.deactivate();
            this.hide();
        };

        Window_FtkrOptions.prototype.hideAll = function() {
            this.hideChildWindowsAll();
            this.deactivate();
            this.hide();
        };

        Window_FtkrOptionsBase.prototype.hideChildWindowsAll = function(symbol) {
            var children = this.childWindows();
            var nextChildren = [];
            while(!!children) {
                children.forEach(function(window){
                    window.hide();
                    window.deactivate();
                    if (window._childWindows) {
                        nextChildren = nextChildren.concat(window._childWindows);
                    }
                });
                children = null;
                if (nextChildren.length) {
                    children = nextChildren;
                    nextChildren = [];
                }
            }
        };

        Window_FtkrOptions.prototype.configContents = function() {
            return this._configContents;
        };

        Window_FtkrOptions.prototype.oldConfigValues = function() {
            return this._oldConfigValues;
        };

        Window_FtkrOptions.prototype.configValues = function() {
            return this._configValues;
        };

        Window_FtkrOptions.prototype.getConfigValue = function(symbol) {
            return this._configValues[symbol];
        };

        Window_FtkrOptions.prototype.setConfigValue = function(symbol, value) {
            this._configValues[symbol] = value;
        };

        //=============================================================================
        // オプション用コマンドウィンドウ
        //=============================================================================
        function Window_MainConfigCommand() {
            this.initialize.apply(this, arguments);
        }

        Window_MainConfigCommand.prototype = Object.create(Window_Command.prototype);
        Window_MainConfigCommand.prototype.constructor = Window_MainConfigCommand;

        Window_MainConfigCommand.prototype.initialize = function() {
            this._ftkrEditor = true;
            this._touchWindow = null;
            Window_Command.prototype.initialize.call(this, 0, 0);
            this.deactivate();
            this.hide();
        };

        Window_MainConfigCommand.prototype.isOswOption = function() {
            return true;
        };

        Window_MainConfigCommand.prototype.windowWidth = function() {
            return 240;
        };

        Window_MainConfigCommand.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_MainConfigCommand.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_MainConfigCommand.prototype.setWindow = function(window) {
            this._touchWindow = window;
            this.refresh();
        };

        Window_MainConfigCommand.prototype.updatePlacement = function() {
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.y = (Graphics.boxHeight - this.height) / 2;
        };

        Window_MainConfigCommand.prototype.refresh = function() {
            this.clearCommandList();
            this.makeCommandList();
            this.createContents();
            Window_Selectable.prototype.refresh.call(this);
        };

        Window_MainConfigCommand.prototype.makeCommandList = function() {
            this.addCommand('作成', 'create',  !this._touchWindow);
            this.addCommand('編集', 'edit',    this._touchWindow);
            this.addCommand('表示', 'display', this._touchWindow);
            this.addCommand('削除', 'delete',  this._touchWindow && this._touchWindow.isOsw());
        };

        //=============================================================================
        // Window_OSWConfTitle
        //=============================================================================

        function Window_OSWConfTitle() {
            this.initialize.apply(this, arguments);
        }

        Window_OSWConfTitle.prototype = Object.create(Window_Base.prototype);
        Window_OSWConfTitle.prototype.constructor = Window_OSWConfTitle;

        Window_OSWConfTitle.prototype.initialize = function() {
            this._ftkrEditor = true;
            this._text = '';
            Window_Base.prototype.initialize.call(this, 0, 0, 500, this.fittingHeight(1));
            this.updatePlacement();
            this.refresh();
        };

        Window_OSWConfTitle.prototype.isOswOption = function() {
            return true;
        };

        Window_OSWConfTitle.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_OSWConfTitle.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_OSWConfTitle.prototype.updatePlacement = function() {
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.y = Graphics.boxHeight / 2 - this.height;
        };

        Window_OSWConfTitle.prototype.refresh = function () {
            this.contents.clear();
            this.drawText(this._text, 0, 0, this.contentsWidth(), 'center');
        };

        Window_OSWConfTitle.prototype.setConf = function(text) {
            this._text = text + ' を削除しますか？';
            this.refresh();
            this.show();
        };
        
        //=============================================================================
        // Window_OSWConf
        //=============================================================================

        function Window_OSWConf() {
            this.initialize.apply(this, arguments);
        }

        Window_OSWConf.prototype = Object.create(Window_HorzCommand.prototype);
        Window_OSWConf.prototype.constructor = Window_OSWConf;

        Window_OSWConf.prototype.initialize = function() {
            this._ftkrEditor = true;
            Window_HorzCommand.prototype.initialize.call(this, 0, 0);
            this.updatePlacement();
            this.deactivate();
            this.hide();
        };

        Window_OSWConf.prototype.isOswOption = function() {
            return true;
        };

        Window_OSWConf.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_OSWConf.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_OSWConf.prototype.maxCols = function() {
            return 2;
        };

        Window_OSWConf.prototype.windowWidth = function() {
            return 500;
        };

        Window_OSWConf.prototype.updatePlacement = function() {
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.y = Graphics.boxHeight / 2;
        };

        Window_OSWConf.prototype.refresh = function() {
            this.clearCommandList();
            this.makeCommandList();
            this.createContents();
            Window_Selectable.prototype.refresh.call(this);
        };

        Window_OSWConf.prototype.makeCommandList = function() {
            this.addCommand('削除する', 'delete');
            this.addCommand('削除しない', 'cancel');
        };

        //=============================================================================
        // パラメータリスト設定用ウィンドウ
        //=============================================================================
        function Window_StatusListConfig() {
            this.initialize.apply(this, arguments);
        }

        Window_StatusListConfig.prototype = Object.create(Window_Selectable.prototype);
        Window_StatusListConfig.prototype.constructor = Window_StatusListConfig;

        Window_StatusListConfig.prototype.initialize = function(layer, width, symbol, parentConfig, parentWindow, masterWindow) {
            this._ftkrEditor = true;
            this._parentConfig   = parentConfig;
            this._masterWindow   = masterWindow;
            this._parentWindow   = parentWindow;
            this._childWindows = [];
            this._windowSymbol   = symbol;
            this._windowWidth    = width;
            this._statusList = [];
            this.setWindowLayer(layer);
            var height = this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
            this.setStatusList(this._masterWindow._configValues._customCssStatus);
            console.log(this._masterWindow._configValues, this._masterWindow._oldConfigValues);
            this.hide();
        };

        Window_StatusListConfig.prototype.isOswOption = function() {
            return true;
        };

        Window_StatusListConfig.prototype.windowLayer = function() {
            return this._windowLayer;
        };

        Window_StatusListConfig.prototype.setWindowLayer = function(layer) {
            this._windowLayer = layer;
        };

        Window_StatusListConfig.prototype.windowWidth = function() {
            return this._windowWidth;
        };
        
        Window_StatusListConfig.prototype.windowHeight = function() {
            return this.fittingHeight(10);
        };

        Window_StatusListConfig.prototype.setStatusList = function(list) {
            if (!list) return;
            this._statusList = list;
            this.refresh();
        };

        Window_StatusListConfig.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_StatusListConfig.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_StatusListConfig.prototype.maxItems = function() {
            return this._statusList.length;
        };

        Window_StatusListConfig.prototype.item = function() {
            return this.index() >=0 ? this._statusList[this.index()] : null;
        };

        Window_StatusListConfig.prototype.drawItem = function(index) {
            var item = this._statusList[index];
            if (item) {
                var rect = this.itemRect(index);
                var width = rect.width / 4;
                this.drawText(item.text, rect.x, rect.y, width);
                this.drawText(item.x, rect.x + width*1, rect.y, width);
                this.drawText(item.y, rect.x + width*2, rect.y, width);
                this.drawText(item.width, rect.x + width*3, rect.y, width);
            }
        };

        Window_StatusListConfig.prototype.cwStatusListOk = function(symbol) {
            this._childWindows[0].setPositionReferWindowIndex(this);
            this._childWindows[0]._parentIndex = this.index();
            this._childWindows[0].activateWindow();
            console.log(this._childWindows[0]);
            this.deactivate();
        };

        Window_StatusListConfig.prototype.hideChildWindows = function(symbol) {
            this._parentWindow.activate();
            this.hide();
        };

        Window_StatusListConfig.prototype.childWindows = function() {
            return this._childWindows;
        };

        Window_StatusListConfig.prototype.hideAll = function() {
            this.hideChildWindowsAll();
            this.deactivate();
            this.hide();
        };

        Window_StatusListConfig.prototype.hideChildWindowsAll = function(symbol) {
            var children = this.childWindows();
            var nextChildren = [];
            while(!!children) {
                children.forEach(function(window){
                    window.hide();
                    window.deactivate();
                    if (window._childWindows) {
                        nextChildren = nextChildren.concat(window._childWindows);
                    }
                });
                children = null;
                if (nextChildren.length) {
                    children = nextChildren;
                    nextChildren = [];
                }
            }
        };

        //=============================================================================
        // セレクト・リスト選択用ウィンドウ
        //=============================================================================
        function Window_SelectListOptions() {
            this.initialize.apply(this, arguments);
        }

        Window_SelectListOptions.prototype = Object.create(Window_Selectable.prototype);
        Window_SelectListOptions.prototype.constructor = Window_SelectListOptions;

        Window_SelectListOptions.prototype.initialize = function(layer, width, symbol, list, parentWindow, masterWindow, prop) {
            this._ftkrEditor = true;
            this._masterWindow   = masterWindow;
            this._parentWindow   = parentWindow;
            this._childWindows = [];
            this._windowSymbol   = symbol;
            this._windowWidth    = width;
            this._prop = prop;
            this._list = list || [];
            this.setWindowLayer(layer);
            var height = this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
            this.hide();
        };

        Window_SelectListOptions.prototype.setSelectList = function(list, options) {
            this._list = list;
            if (options) {
                this._prop = options.property;
                this._enabled = options.enabled;
                this._value = options.value;
                this._prompt = options.prompt;
            } else {
                this._prop = null;
                this._enabled = null;
                this._value = false;
                this._prompt = false;
            }
            this.refresh();
        };

        Window_SelectListOptions.prototype.isOswOption = function() {
            return true;
        };

        Window_SelectListOptions.prototype.standardFontSize = function() {
            return optionFontSize;
        };

        Window_SelectListOptions.prototype.lineHeight = function() {
            return optionLineHeight;
        };

        Window_SelectListOptions.prototype.windowLayer = function() {
            return this._windowLayer;
        };

        Window_SelectListOptions.prototype.setWindowLayer = function(layer) {
            this._windowLayer = layer;
        };

        Window_SelectListOptions.prototype.maxItems = function() {
            return this.lists().length;
        };

        Window_SelectListOptions.prototype.windowHeight = function() {
            return this.fittingHeight(Math.min(this.maxItems(), 10));
        };

        Window_SelectListOptions.prototype.lists = function() {
            return this._enabled ? this._list.filter(function(data){
                return !!data ? eval(this._enabled) : true;
            },this) : this._list;
        };

        Window_SelectListOptions.prototype.drawItem = function(index) {
            var item = this.lists()[index];
            var rect = this.itemRect(index);
            var nw = this.textWidth('0') * 5;
            this.drawText(index, rect.x, rect.y, nw);
            var text = item ? (this._prop ? item[this._prop] : item) : item;
            this.drawText(text, rect.x + nw, rect.y, rect.width - nw);
        };

        Window_SelectListOptions.prototype.cwSelectListOk = function(symbol) {
            var value = this._value ? this.lists()[this.index()].value : this.index();
            this._parentWindow.setSelectListIndex(this._windowSymbol, value, this._prompt);
            this.deactivate();
            this.hideChildWindows();
        };

        Window_SelectListOptions.prototype.hideChildWindows = function(symbol) {
            this._parentWindow.activate();
            this.hide();
        };

        Window_SelectListOptions.prototype.childWindows = function() {
            return this._childWindows;
        };

        Window_SelectListOptions.prototype.hideAll = function() {
            this.hideChildWindowsAll();
            this.deactivate();
            this.hide();
        };

        Window_SelectListOptions.prototype.hideChildWindowsAll = function(symbol) {
            var children = this.childWindows();
            var nextChildren = [];
            while(!!children) {
                children.forEach(function(window){
                    window.hide();
                    window.deactivate();
                    if (window._childWindows) {
                        nextChildren = nextChildren.concat(window._childWindows);
                    }
                });
                children = null;
                if (nextChildren.length) {
                    children = nextChildren;
                    nextChildren = [];
                }
            }
        };


    };//デザインモード

//ここから下は、デザインモードと関係なく実行


























      //=============================================================================
      //ウィンドウのタイプ判別処理を追加
      //=============================================================================

      Window_Base.prototype.isOswOption = function() {
        return false;
    };

    Window_Base.prototype.isCssContentsWindow = function() {
        return Imported.FTKR_CSS && this._customDrawType;
        /*
        return Imported.FTKR_CSS && !!this._lssStatus &&
          (!isNaN(this._lssStatus.widthRate) || 
            (this._lssStatus.statusList && this._lssStatus.statusList.length) ||
            this._customDrawType);*/
    };

    Window_Base.prototype.isCommon = function() {
        return !this.isList();
    };

    Window_Base.prototype.isList = function() {
        return this.isCommand() || this.isSelect();
    };

    Window_Base.prototype.isCommand = function() {
        return false;
    };

    Window_Base.prototype.isSelect = function() {
        return false;
    };

    Window_Selectable.prototype.isSelect = function() {
        return true;
    };

    Window_Command.prototype.isSelect = function() {
        return false;
    };

    Window_Command.prototype.isCommand = function() {
        return true;
    };

    //=============================================================================
    // JSONにウィンドウデータを保存
    //=============================================================================

    PIXI.Container.prototype.containerProp = function() {
        var sceneName  = SceneManager.getSceneName();
        var parentName = getClassName(this.parent);
        var containerName = getClassName(this);
        if (!$dataContainerProperties[sceneName]) return null;
        var sceneInfo = $dataContainerProperties[sceneName];
        if (!sceneInfo[parentName]) return null;
        var parentInfo = sceneInfo[parentName];
        if (!parentInfo[containerName]) return null;
        return parentInfo[containerName];
    };

    PIXI.Container.prototype.saveContainerInfo = function() {
        var sceneName  = SceneManager.getSceneName();
        var parentName = getClassName(this.parent);
        if (!$dataContainerProperties[sceneName]) $dataContainerProperties[sceneName] = {};
        var sceneInfo = $dataContainerProperties[sceneName];
        if (!sceneInfo[parentName]) sceneInfo[parentName] = {};
        var containerInfo = sceneInfo[parentName];
        if (this._windowId >= 0) {
            var key = [this._windowId, getClassName(this)];
        } else {
            if (this.containerIndex === undefined) {
                this.containerIndex = this.parent.getChildIndex(this);
            }
            var key = [this.containerIndex, getClassName(this)];
        }
        if (!containerInfo[key]) containerInfo[key] = {};
        this.saveProperty(containerInfo[key]);
        if (paramAutoSave) {
            DataManager.saveDataFileWp();
        }
    };

    PIXI.Container.prototype.saveProperty = function(containerInfo) {
        containerInfo.priority = this.priority >= 0 ? this.priority : this.parent.getChildIndex(this);
        containerInfo.containerIndex = this.containerIndex;
        containerInfo.x = this.x;
        containerInfo.y = this.y;
    };
    
    var _Window_Base_saveProperty = Window_Base.prototype.saveProperty;
    Window_Base.prototype.saveProperty = function(containerInfo) {
        _Window_Base_saveProperty.apply(this, arguments);
        containerInfo.name             = this.name;
        containerInfo._customActorId   = this._customActorId;
        containerInfo._customReference = this._customReference;
        containerInfo._customList      = copyArray(this._customList);
        containerInfo._customShowSwId  = this._customShowSwId;
        containerInfo._customShow      = this._customShow;
        containerInfo._customHideFrame = this._customHideFrame;
        containerInfo._customActivate  = this._customActivate;
        containerInfo._customSpacing      = this._customSpacing;
        containerInfo._customMaxCols      = this._customMaxCols;
        containerInfo._customCursorHeight = this._customCursorHeight;
        containerInfo._customHorSpacing   = this._customHorSpacing;
        containerInfo._autoRefreshed   = this._autoRefreshed;
    };

    Window_Selectable.prototype.saveProperty = function(containerInfo) {
        Window_Base.prototype.saveProperty.call(this, containerInfo);
        containerInfo._customListType    = this._customListType;
        containerInfo._customListEnabled = this._customListEnabled;
        containerInfo._customDrawType    = this._customDrawType;
        containerInfo._customTextAlign   = this._customTextAlign;
        containerInfo._customOkMethodType = this._customOkMethodType;
        containerInfo._customOkMethodDetail = this._customOkMethodDetail;
        containerInfo._customCancelMethodType = this._customCancelMethodType;
        containerInfo._customCancelMethodDetail = this._customCancelMethodDetail;
    };

    Scene_Base.prototype.saveOswWindowList = function() {
        var sceneName  = SceneManager.getSceneName();
        if (!$dataContainerProperties[sceneName]) $dataContainerProperties[sceneName] = {};
        var sceneInfo = $dataContainerProperties[sceneName];
        sceneInfo._oswWindowList = this._oswWindowList.clone();
    };

    //変更したJSONデータ構造で読込
    PIXI.Container.prototype.loadContainerInfo = function() {
        var sceneName  = SceneManager.getSceneName();
        var parentName = getClassName(this.parent);
        var sceneInfo  = $dataContainerProperties[sceneName];
        if (sceneInfo) {
            var containerInfo = sceneInfo[parentName];
            if (this._windowId >= 0) {
                var key = [this._windowId, getClassName(this)];
            } else {
                if (this.containerIndex === undefined) {
                    this.containerIndex = this.parent.getChildIndex(this);
                }
                var key = [this.containerIndex, getClassName(this)];
            }
            if (containerInfo && containerInfo[key]) {
                this.loadProperty(containerInfo[key]);
                this._positionLock = true;
            }
        }
    };

    PIXI.Container.prototype.loadOswContainerInfo = function(windowId) {
        var sceneName  = SceneManager.getSceneName();
        var parentName = getClassName(this.parent);
        var sceneInfo  = $dataContainerProperties[sceneName];
        if (sceneInfo) {
            var containerInfo = sceneInfo[parentName];
            var key           = [windowId, getClassName(this)];
            if (containerInfo && containerInfo[key]) {
                this.loadProperty(containerInfo[key]);
                this._positionLock = true;
            }
        }
    };

    PIXI.Container.prototype.loadProperty = function(containerInfo) {
        if(containerInfo.priority !== undefined) this.priority = containerInfo.priority;
        if(containerInfo.containerIndex === undefined) {
            this.containerIndex = this.parent.getChildIndex(this);
        } else {
            this.containerIndex = containerInfo.containerIndex;
        }
        this.position.x     = containerInfo.x;
        this.position.y     = containerInfo.y;
    };

    var _Window_Base_loadProperty = Window_Base.prototype.loadProperty;
    Window_Base.prototype.loadProperty = function(containerInfo) {
        if(containerInfo.name) this.name = containerInfo.name;
        if(containerInfo._customActorId !== undefined)   this._customActorId = containerInfo._customActorId;
        if(containerInfo._customReference !== undefined) this._customReference = containerInfo._customReference;
        if(containerInfo._customShowSwId !== undefined)  this._customShowSwId = containerInfo._customShowSwId;
        if(containerInfo._customShow !== undefined)      this._customShow = containerInfo._customShow;
        if(containerInfo._customHideFrame !== undefined) this._customHideFrame = containerInfo._customHideFrame;
        if(containerInfo._customActivate !== undefined)  this._customActivate = containerInfo._customActivate;
        if(containerInfo._customSpacing !== undefined)   this._customSpacing   = containerInfo._customSpacing;
        if(containerInfo._customMaxCols !== undefined)   this._customMaxCols = containerInfo._customMaxCols;
        if(containerInfo._customCursorHeight !== undefined) this._customCursorHeight = containerInfo._customCursorHeight;
        if(containerInfo._customHorSpacing !== undefined) this._customHorSpacing = containerInfo._customHorSpacing;
        if(containerInfo._customList !== undefined)      this._customList = copyArray(containerInfo._customList);
        if(containerInfo._autoRefreshed !== undefined)   this._autoRefreshed = containerInfo._autoRefreshed;
        _Window_Base_loadProperty.apply(this, arguments);
        this._firstUpdated = false;
    };

    var _Window_Selectable_loadProperty = Window_Selectable.prototype.loadProperty;
    Window_Selectable.prototype.loadProperty = function(containerInfo){
        if(containerInfo._customListType !== undefined)  this._customListType = containerInfo._customListType;
        if(containerInfo._customListEnabled !== undefined) this._customListEnabled = containerInfo._customListEnabled;
        if(containerInfo._customDrawType !== undefined)  this._customDrawType = containerInfo._customDrawType;
        if(containerInfo._customHandlers !== undefined)  this._customHandlers = copyObject(containerInfo._customHandlers);
        if(containerInfo._customTextAlign !== undefined) this._customTextAlign = containerInfo._customTextAlign;
        if(containerInfo._customOkMethodType !== undefined) this._customOkMethodType = containerInfo._customOkMethodType;
        if(containerInfo._customOkMethodDetail !== undefined) this._customOkMethodDetail = containerInfo._customOkMethodDetail;
        if(containerInfo._customCancelMethodType !== undefined) this._customCancelMethodType = containerInfo._customCancelMethodType;
        if(containerInfo._customCancelMethodDetail !== undefined) this._customCancelMethodDetail = containerInfo._customCancelMethodDetail;
        _Window_Selectable_loadProperty.call(this, containerInfo);
        this.setOswMethod();
    };

    //=============================================================================
    // customデータの初期設定
    //=============================================================================

    SceneManager.getWindowTypeNumber = function(windowType) {
        var num = 0;
        this._scene._oswWindowList.forEach(function(window){
            if(window.type == windowType) num++;
        });
        return num;
    };

    var _GDM_Scene_Base_initialize1 = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _GDM_Scene_Base_initialize1.call(this);
        this._oswWindowList = [];
    };

    var _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        this._customActorId   = 0;
        this._customReference = '';
        this._customList      = [];
        this._customShowSwId  = 0;
        this._customHideFrame = false;
        this._customShow      = false;
        this._customActivate  = false;
        this._customSpacing   = this.spacing();
        this._autoRefreshed   = false;
        if(this.maxCols) this._customMaxCols = this.maxCols();
        if(this.cursorHeight) this._customCursorHeight = this.cursorHeight();
        if(this.itemHeightSpace) this._customHorSpacing = this.itemHeightSpace();
        if(!this._ftkrEditor && this._windowId == undefined) {
            var windowType = getClassName(this);
            this._windowId = SceneManager.getWindowTypeNumber(windowType);
            SceneManager._scene.addOswWindow(windowType, this._windowId, true);
        }
        this.name = this._windowId + ',' + getClassName(this);
        _Window_Base_initialize.apply(this, arguments);
    };

    var _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function(x, y, width, height) {
        this._customListType  = 0;
        this._customDrawType  = 0;
        this._customTextAlign = 0;
        this._customListEnabled = 'true';
        this._customOkMethodType = 0;
        this._customOkMethodDetail = 0;
        this._customCancelMethodType = 0;
        this._customCancelMethodDetail = 0;
        _Window_Selectable_initialize.apply(this, arguments);
    };

    var _Window_Command_initialize      = Window_Command.prototype.initialize;
    Window_Command.prototype.initialize = function(x, y, width, height) {
        _Window_Command_initialize.apply(this, arguments);
        this._customTextAlign = convertAlign(this.itemTextAlign());
        /*
        if (!this._customList.length) {
          this._list.forEach(function(list, i){
              this._customList.push({name: list.name, symbol: list.symbol, enabled: true, ext: null, index: i, visible:true});
          },this);
        }*/
    };

    //=============================================================================
    // customデータの参照
    //=============================================================================

    Window_Base.prototype.setCustomActorId = function(actorId) {
        this._customActorId = actorId;
    }

    Window_Base.prototype.setFontSize = function(value) {
        this._customFontSize = value;
    };

    Window_Base.prototype.setPadding = function(value) {
        this._customPadding = value;
    };

    Window_Base.prototype.setLineHeight = function(value) {
        this._customLineHeight = value;
    };

    Window_Base.prototype.setBackOpacity = function(value) {
        this._customBackOpacity = value;
    };

    //------------------------------------------------------------------------
    // _customReference
    //------------------------------------------------------------------------
    Window_Base.prototype.setReference = function(windowName) {
        this._customReference = windowName;
    };

    //------------------------------------------------------------------------
    // _customSpacing
    //------------------------------------------------------------------------
    Window_Base.prototype.setSpacing = function(value){
        this._customSpacing = value;
    };

    //------------------------------------------------------------------------
    // _customMaxCols
    //------------------------------------------------------------------------
    Window_Base.prototype.setMaxCols = function(value) {
        this._customMaxCols = value;
    };

    //------------------------------------------------------------------------
    // _customCursorHeight
    //------------------------------------------------------------------------
    Window_Base.prototype.setCursorHeight = function(value) {
        this._customCursorHeight = value;
    };

    //------------------------------------------------------------------------
    // _customHorSpacing
    //------------------------------------------------------------------------
    Window_Base.prototype.setHorSpacing = function(value){
        this._customHorSpacing = value;
    };

    //------------------------------------------------------------------------
    // _customHideFrame
    //------------------------------------------------------------------------
    Window_Base.prototype.showFrame = function() {
        this._customHideFrame = false;
        this._refreshFrame();
    };

    Window_Base.prototype.hideFrame = function() {
        this._customHideFrame = true;
        this._refreshFrame();
    };

    //------------------------------------------------------------------------
    // _customShow
    // _customActivate
    //------------------------------------------------------------------------
    var _SA_Window_Base_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        if (!this._firstUpdated) {
            if(this._customShow) this.show();
            if(this._customActivate) this.activate();
            this._firstUpdated = true;
        }
        _SA_Window_Base_update.call(this);
    };

    //------------------------------------------------------------------------
    // _reserveCursor
    //------------------------------------------------------------------------
    Window_Selectable.prototype.leaveSelect = function() {
        this._reserveCursor = true;
    };

    Window_Selectable.prototype.releaceSelect = function() {
        this._reserveCursor = false;
    };

    var _Window_Selectable_deactivate = Window_Selectable.prototype.deactivate;
    Window_Selectable.prototype.deactivate = function() {
        _Window_Selectable_deactivate.call(this);
        if (this._reserveCursor) this.deselect();
    };


    //------------------------------------------------------------------------
    // FTKR_CSS
    //------------------------------------------------------------------------
    Window_Base.prototype.setContentStatus = function(status) {
        var texts = status.split(';');
        this._customCssText1 = texts[0] || '';
        this._customCssText2 = texts[1] || '';
        this._customCssText3 = texts[2] || '';
        this.setCssStatus();
    };

    Window_Base.prototype.setContentSpace = function(values) {
        var spaces = values.split(',');
        this._customCssSpace1 = spaces[0] || 0;
        this._customCssSpace2 = spaces[1] || 0;
        this._customCssSpace3 = spaces[2] || 0;
        this._customCssSpace4 = spaces[3] || 0;
        this.setCssStatus();
    };

    Window_Base.prototype.setContentSpaceIn = function(value) {
        this._customCssSpaceIn = value;
        this.setCssStatus();
    };
    
    Window_Base.prototype.setContentWidthRate = function(values) {
        var rates = values.split(',');
        this._customCssWidthRate1 = rates[0] || 0;
        this._customCssWidthRate2 = rates[1] || 0;
        this._customCssWidthRate3 = rates[2] || 0;
        this.setCssStatus();
    };

    Window_Base.prototype.readCssStatus = function() {
        if (this._lssStatus) {
            if (this._lssStatus.space) {
                var space = this._lssStatus.space.split(',');
                this._customCssSpace1 = space[0] || 0;
                this._customCssSpace2 = space[1] || 0;
                this._customCssSpace3 = space[2] || 0;
                this._customCssSpace4 = space[3] || 0;
            }
            if (this._lssStatus.widthRate) {
                var rate = this._lssStatus.widthRate.split(',');
                this._customCssWidthRate1 = rate[0] || 0,
                this._customCssWidthRate2 = rate[1] || 0,
                this._customCssWidthRate3 = rate[2] || 0
            }
        }
    };

    var _CSS_Window_Base_loadProperty = Window_Base.prototype.loadProperty;
    Window_Base.prototype.loadProperty = function(containerInfo) {
        _CSS_Window_Base_loadProperty.apply(this, arguments);
        if (containerInfo._customCssStatus) this._customCssStatus  = copyArray(containerInfo._customCssStatus);
        if (containerInfo._customCssSpaceIn) this._customCssSpaceIn = containerInfo._customCssSpaceIn;
        if (containerInfo._customCssText1) this._customCssText1    = containerInfo._customCssText1;
        if (containerInfo._customCssText2) this._customCssText2    = containerInfo._customCssText2;
        if (containerInfo._customCssText3) this._customCssText3    = containerInfo._customCssText3;
        if (containerInfo._customCssSpace) this._customCssSpace    = containerInfo._customCssSpace;
        if (containerInfo._customCssWidthRate) this._customCssWidthRate = containerInfo._customCssWidthRate;
        this.setCssStatus();
        this.refresh();
    };
    
    var _CSS_Window_Base_saveProperty = Window_Base.prototype.saveProperty;
    Window_Base.prototype.saveProperty = function(containerInfo) {
        _CSS_Window_Base_saveProperty.apply(this, arguments);
        containerInfo._customCssStatus   = copyArray(this._customCssStatus);
        containerInfo._customCssSpaceIn  = this._customCssSpaceIn;
        containerInfo._customCssText1    = this._customCssText1;
        containerInfo._customCssText2    = this._customCssText2;
        containerInfo._customCssText3    = this._customCssText3;
        containerInfo._customCssSpace    = this._customCssSpace;
        containerInfo._customCssWidthRate  = this._customCssWidthRate;
      };
      
    var _CSS_Window_Base_initialize      = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _CSS_Window_Base_initialize.apply(this, arguments);
        var lss = this._lssStatus ? this.standardCssStatus() : {};
        this._customCssStatus    = lss.statusList ? copyArray(lss.statusList) : [{text: 'null', x: 0, y: 0, width:0}];
        this._customCssSpaceIn   = lss.spaceIn;
        this._customCssText1     = lss.text1;
        this._customCssText2     = lss.text2;
        this._customCssText3     = lss.text3;
        this._customCssSpace     = lss.space;
        this._customCssWidthRate = lss.widthRate;
    };

    Window_Base.prototype.clearCssSpriteAll = function() {
        $gameParty.allMembers().forEach( function(member, i) {
            this.clearCssSprite(i);
        },this);
    };

    Window_Base.prototype.setCssStatus = function() {
        if (this._lssStatus) {
            this.clearCssSpriteAll();
            if (this._customCssStatus) this._lssStatus.statusList = copyArray(this._customCssStatus);
            if (this._customCssSpaceIn) this._lssStatus.spaceIn = this._customCssSpaceIn;
            if (this._customCssText1) this._lssStatus.text1 = this._customCssText1;
            if (this._customCssText2) this._lssStatus.text2 = this._customCssText2;
            if (this._customCssText3) this._lssStatus.text3 = this._customCssText3;
            if (this._customCssSpace) this._lssStatus.space = this._customCssSpace;
            if (this._customCssWidthRate) this._lssStatus.widthRate = this._customCssWidthRate;
            if (this._customCssSpace1 !== undefined) {
                var space = [
                    this._customCssSpace1 || 0,
                    this._customCssSpace2 || 0,
                    this._customCssSpace3 || 0,
                    this._customCssSpace4 || 0
                ];
                this._lssStatus.space = space.join(',');
            }
            if (this._customCssWidthRate1 !== undefined) {
                var rate = [
                    this._customCssWidthRate1 || 0,
                    this._customCssWidthRate2 || 0,
                    this._customCssWidthRate3 || 0
                ];
                this._lssStatus.widthRate = rate.join(',');
            }
        }
    };

    //------------------------------------------------------------------------
    // customList
    //------------------------------------------------------------------------
    Window_Base.prototype.clearList = function() {
        this._customList.length = 0;
    };

    Window_Base.prototype.setText = function(line, text) {
        if (!this._customList[line]) {
            this._customList[line] = {
                name : text,
                index : line,
                visible : true
            }
        } else {
            this._customList[line].name = text;
            this._customList[line].visible = true;
        }
    };

    Window_Base.prototype.setLists = function(drawType, list, listType, enabled) {
        this._customDrawType = drawType;
        if (list) {
            var lists  = list.split(',');
            lists.forEach(function(text, i){
                this._customList[i] = {name:text, index:i, visible:true};
            },this);
        }
        this._customListType = listType;
        this._customListEnabled = enabled;
    };

    Window_Base.prototype.addCustomCommand = function(name, symbol, enabled, methodType, methodDetail) {
        var index = this._customList.length;
        this._customList.push({
            name: name,
            symbol: symbol,
            enabled: enabled, ext: null,
            methodType : methodType,
            methodDetail : methodDetail,
            index: index, visible:true
        });
    };

    Window_Base.prototype.addCustomCommandAt = function(index, name, symbol, enabled, methodType, methodDetail) {
        var addCmd = {
            name: name,
            symbol: symbol,
            enabled: enabled, ext: null,
            methodType : methodType,
            methodDetail : methodDetail,
            index: index, visible:true
        };
        this._customList.splice(index, 0, addCmd);
        this._customList.forEach(function(cmd, i){
            if (i > index) {
                cmd.index++;
            }
        });
    };

    Window_Base.prototype.sortCustomList = function() {
        if(!this._customList) return;
        this._customList.sort(function(a, b){
            return a.index - b.index;
        });
    };

    Window_Command.prototype.makeCustomCommandList = function() {
        if (!this._customList) this._customList = [];
        if (!this._customList.length) {
            this._list.forEach(function(cmd, i){
                cmd.visible = true;
                cmd.index = i;
                this._customList.push(cmd);
            },this);
        }
        this._customList.forEach(function(list){
            if (list.symbol && list.method) {
                var method = eval(list.method);
                this.setHandler(list.symbol, method);
            }
            return true;
        },this);
        this._list = this._customList.filter(function(list){
            return list.visible;
        });
        this._list.sort(function(a, b){
            return a.index - b.index;
        });
        /*
        if (this._customList) {
            this._list.forEach(function(mlist){
                var result = this._customList.some(function(list){
                    return !!mlist.symbol && mlist.symbol === list.symbol; 
                },this);
                if (!result) {
                    mlist.visible = true;
                    mlist.index = this._customList.length;
                    this._customList.push({name: mlist.name, symbol: mlist.symbol, enabled: true, ext: null, index: mlist.index, visible:true});
                }
            },this);
            this._customList.forEach(function(list){
                if (list.symbol && list.method) {
                    var method = eval(list.method);
                    this.setHandler(list.symbol, method);
                }
                return true;
            },this);
            this._list = this._customList.filter(function(list){
                return list.visible;
            });
            this._list.sort(function(a, b){
                return a.index - b.index;
            });
        }
        */
    };

    Window_Command.prototype.refresh = function() {
        this.clearCommandList();
        this.makeCommandList();
        this.makeCustomCommandList();
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
    };

    //------------------------------------------------------------------------
    // priority
    //------------------------------------------------------------------------

    var _GDM_Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        _GDM_Scene_Base_start.call(this);
        this.initPriority();
        this.refreshDisplayPriority();
    };

    Scene_Base.prototype.initPriority = function() {
        if (this._windowLayer) {
            this._windowLayer.children.forEach( function(child, i){
                if (child.priority === undefined) {
                    child.priority = i;
                }
            },this);
        }
    };

    Scene_Base.prototype.refreshDisplayPriority = function() {
        if (this._windowLayer) {
            var newLayer = [];
            this._windowLayer.children.clone().forEach( function(child, i){
                this._windowLayer.removeChild(child);
                if (newLayer[child.priority]) {
                    newLayer.splice(child.priority, 0, child);
                } else {
                    newLayer[child.priority] = child;
                }
            },this);
            newLayer.clone().forEach( function(child){
                this._windowLayer.addChild(child);
            },this);
        }
    };
    
    //------------------------------------------------------------------------
    // itemTextAlign
    //------------------------------------------------------------------------
    Window_Base.prototype.setTextAlign = function(align) {
        this._customTextAlign = align;
    }

    Window_Base.prototype.itemTextAlign = function() {
        return '';
    };

    var _Window_Command_itemTextAlign = Window_Command.prototype.itemTextAlign;
    Window_Command.prototype.itemTextAlign = function() {
        return this._customTextAlign ? convertAlign(this._customTextAlign) :
            _Window_Command_itemTextAlign.call(this);
    };

    var _Window_HorzCommand_itemTextAlign = Window_HorzCommand.prototype.itemTextAlign;
    Window_HorzCommand.prototype.itemTextAlign = function() {
        return this._customTextAlign ? convertAlign(this._customTextAlign) :
            _Window_HorzCommand_itemTextAlign.call(this);
    };

    //------------------------------------------------------------------------
    // method
    //------------------------------------------------------------------------
    Window_Base.prototype.setOswMethod = function() {};

    Window_Selectable.prototype.setOswMethod = function() {
        Window_Base.prototype.setOswMethod.call(this);
        if (this._customOkMethodType) {
            var okMethod = convertOswMethod(this._customOkMethodType, this._customOkMethodDetail);
            this.setHandler('ok', eval(setOswMethod(okMethod)));
        }
        if (this._customCancelMethodType) {
            var cancelMethod = convertOswMethod(this._customCancelMethodType, this._customCancelMethodDetail);
            this.setHandler('cancel', eval(setOswMethod(cancelMethod)));
        }
    };

    Window_Command.prototype.setOswMethod = function() {
        Window_Selectable.prototype.setOswMethod.call(this);
        this._customList.forEach(function(cmd){
            if (cmd) {
                var method = convertOswMethod(cmd.methodType, cmd.methodDetail, cmd.methodDetail2);
                cmd.method = setOswMethod(method);
            }
        });
    };

    Scene_Base.prototype.changeActivateWindow = function(window, name, hide, deselect, varId) {
        if (hide) window.hide();
        if (deselect) window.deselect();
        window.deactivate();
        if (varId) $gameVariables.setValue(varId, window.index());
        var newWindow = null;
        this._windowLayer.children.some(function(child){
            if(child.name === name) {
                newWindow = child;
                return true;
            }
        });
        if (newWindow) {
            newWindow.activate();
            newWindow.show();
            var index = Math.max(newWindow.index(), 0);
            newWindow.select(index);
        }
    };

    //------------------------------------------------------------------------
    // _cusotmShowSwId
    //------------------------------------------------------------------------
    Window_Base.prototype.updateShowSwId = function() {
        if (this._customShowSwId > 0) {
            if ($gameSwitches.value(this._customShowSwId)) {
                this.show();
            } else {
                this.hide();
                this.deactivate();
            }
        }
    };

    var _SW_Window_Base_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _SW_Window_Base_update.call(this);
        this.updateShowSwId();
    };

    //------------------------------------------------------------------------
    // 全ウィンドウの作成
    //------------------------------------------------------------------------

    Scene_Base.prototype.oswWindowList = function() {
        return this._oswWindowList;
    };

    Scene_Base.prototype.checkOswWindow = function(windowType, windowId) {
        return this._oswWindowList.some(function(list){
            return list && list.type == windowType && list.id == windowId;
        });
    }

    Scene_Base.prototype.addOswWindow = function(windowType, windowId, creative) {
        if (!this.checkOswWindow(windowType, windowId)) {
            this._oswWindowList.push({type:windowType, id:windowId, creative:creative});
        }
    };

    //ブートシーンでは作成しない
    var _Scene_Boot_initialize = Scene_Boot.prototype.initialize;
    Scene_Boot.prototype.initialize = function() {
        _Scene_Boot_initialize.call(this);
        this._oswDisale = true;
    };

    //マップシーンは処理を変更
    var _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        this._oswDisale = true;
    };

    var _SceneManager_onSceneCreate = SceneManager.onSceneCreate;
    SceneManager.onSceneCreate = function() {
        console.log('SceneManager', 'onSceneCreate');
        if (this._scene && !this._scene._oswDisale && this._scene._windowLayer) {
            this._scene.createAllOswWindows();
        }
        _SceneManager_onSceneCreate.call(this);
    };

    var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        console.log('Scene_Map', 'createObjects');
        _Scene_Map_createDisplayObjects.call(this);
        this.createAllOswWindows();
    };

    Scene_Base.prototype.createAllOswWindows = function() {
        this._oswCommandWindows = [];
        this._oswCommonWindows = [];
        this._oswSelectWindows = [];
        var sceneName  = SceneManager.getSceneName();
        var sceneInfo  = $dataContainerProperties[sceneName];
        if (sceneInfo && sceneInfo._oswWindowList) {
            this._oswWindowList = sceneInfo._oswWindowList.clone();
        }
        console.log('createOswWindows');
        this.oswWindowList().forEach( function(data) {
            this.createOswWindow(data);
            data.creative = true;
            console.log(data);
        },this);
    };

    Scene_Base.prototype.createOswWindow = function(data) {
        switch (data.type) {
            case Game_OswData.WINDOW_COMMON:
            case 'Window_OswCommon':
                this.createOswCommonWindow(data.id);
                break;
            case Game_OswData.WINDOW_COMMAND:
            case 'Window_OswCommand':
                this.createOswCommandWindow(data.id);
                break;
            case Game_OswData.WINDOW_SELECTABLE:
            case 'Window_OswSelect':
                this.createOswSelectWindow(data.id);
                break;
        }
        return;
    };

    //------------------------------------------------------------------------
    // コモンウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createOswCommonWindow = function(windowId) {
        this._oswCommonWindows[windowId] = new Window_OswCommon(windowId);
        var window = this._oswCommonWindows[windowId];
        this._windowLayer.addChild(window);
        window._customList = [];
        window._customDrawType = 0;
        window._customList.push({name:'テキスト0', index:0, visible:true});
        window.loadOswContainerInfo(windowId);
        window.refresh();
    };

    //------------------------------------------------------------------------
    // セレクトウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createOswSelectWindow = function(windowId) {
        this._oswSelectWindows[windowId] = new Window_OswSelect(windowId);
        var window = this._oswSelectWindows[windowId];
        this._windowLayer.addChild(window);
        window._customList = [];
        window._customDrawType = 0;
        window._customList.push({name:'テキスト0', index:0, visible:true});
        window.loadOswContainerInfo(windowId);
        window.refresh();
    };

    //------------------------------------------------------------------------
    // コマンドウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createOswCommandWindow = function(windowId) {
        this._oswCommandWindows[windowId] = new Window_OswCommand(windowId);
        var window = this._oswCommandWindows[windowId];
        window.addCustomCommand('コマンド0', 'cmd0', 'true', 0, 0);
        window.setCustomListHeight();
        window.refresh();
        this._windowLayer.addChild(window);
        window.loadOswContainerInfo(windowId);
    };

    //=============================================================================
    // SceneManager
    // ウィンドウ名やウィンドウIDから対象ウィンドウのデータを参照
    //=============================================================================

    //ウィンドウクラス名とウィンドウIDから参照
    SceneManager.oswWindowDataBase = function(windowClass, windowId) {
        var sceneName  = this.getSceneName();
        var sceneInfo  = $dataContainerProperties[sceneName];
        if (sceneInfo) {
            var parentName = 'WindowLayer';
            var containerInfo = sceneInfo[parentName];
            var key           = [windowId, windowClass];
            if (containerInfo && containerInfo[key]) {
                var priority = containerInfo[key].priority;
                return this._scene._windowLayer.children[priority];
            }
        }
        return null;
    };

    //ウィンドウタイプIDとウィンドウIDから参照
    SceneManager.oswWindowData = function(windowType, windowId) {
        var windowName = convertWindowName(windowType);
        return this.oswWindowDataBase(windowName, windowId);
    };

    //ウィンドウ名から参照
    SceneManager.searchWindowByName = function(windowName) {
        if (!this._scene || !this._scene._windowLayer) return null;
        var window = null;
        this._scene._windowLayer.children.some(function(child){
            if(child.name == windowName) window = child;
        },this);
        return window;
    };

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
                this.setOswWindowParam(args, Game_OswData.WINDOW_COMMON);
                break;
            case 'コマンド設定':
            case 'SET_COMMAND':
                this.setOswWindowParam(args, Game_OswData.WINDOW_COMMAND);
                break;
            case 'セレクト設定':
            case 'SET_SELECT':
                this.setOswWindowParam(args, Game_OswData.WINDOW_SELECTABLE);
                break;
        }
    };

    var getContainerProp = function(sceneName, windowName, windowType, windowId) {
        var parentName = 'WindowLayer';
        if (!$dataContainerProperties[sceneName]) $dataContainerProperties[sceneName] = {};
        var sceneInfo = $dataContainerProperties[sceneName];
        if (!sceneInfo[parentName]) sceneInfo[parentName] = {};
        var parentInfo = sceneInfo[parentName];
        if (!parentInfo[windowName]) {
            parentInfo[windowName] = {};
            parentInfo[windowName].name = windowName;
            if (!sceneInfo._oswWindowList) sceneInfo._oswWindowList = [];
            sceneInfo._oswWindowList.push({type:windowType, id:windowId});
        }
        return parentInfo[windowName];
    };

    Game_Interpreter.prototype.setOswWindowParam = function(args, type) {
        var scene = sceneName(args[0]);
        var windowId = setArgNum(args[1]);
        var windowName = windowId + ',' + WINDOW_NAME[type];
        var container = getContainerProp(scene, windowName, type, windowId);
        this.setOswWindowArgs(container, 2, args, type);
    };

    Game_Interpreter.prototype.createOswList = function(container, args, type) {
        var basic   = FTKR.GDM.basic;
        var common  = FTKR.GDM.common;
        var command = FTKR.GDM.command;
        var select  = FTKR.GDM.select;
        container._customFontSize    = basic.fontSize;
        container._customPadding     = basic.padding;
        container._customLineHeight  = basic.lineHeight;
        container._customBackOpacity = basic.opacity;
        container._customHideFrame   = basic.frame;
        container.opacity = 255;
        container.visible = true;
        switch(type) {
            case Game_OswData.WINDOW_COMMON:
                container.width = common.width;
                container.height = common.height;
                break;
            case Game_OswData.WINDOW_COMMAND:
                container.width = command.width;
                container._customMaxCols = command.maxCols;
                container._customTextAlign = command.align;
                break;
            case Game_OswData.WINDOW_SELECTABLE:
                container.width = select.width;
                container.height = select.height;
                container._customMaxCols = select.maxCols;
                container._customCursorHeight = select.cursorHeight;
                break;
        }
    };

    Game_Interpreter.prototype.setOswWindowArgs = function(container, index, args, type) {
        var windowId = setArgNum(args[1]);
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case '生成':
                case 'CREATE':
                    this.createOswList(container, args, type);
                    return;
                case '位置':
                case 'POSITION':
                    var x = setArgNum(args[i+1]);
                    var y = setArgNum(args[i+2]);
                    container.x = x === -1 ? Graphics.boxWidth - container.width : x;
                    container.y = y === -1 ? Graphics.boxHeight - container.height : y;
                    i += 2;
                    break;
                case 'サイズ':
                case 'SIZE':
                    var width = setArgNum(args[i+1]);
                    container.width = width === -1 ? Graphics.boxWidth : width;
                    if(!type == Game_OswData.WINDOW_COMMAND) {
                        var height = setArgNum(args[i+2]);
                        container.height = height=== -1 ? Graphics.boxHeight : height;
                    }
                    i += type == Game_OswData.WINDOW_COMMAND ? 1 : 2;
                    break;
                case 'カーソル残す':
                case 'LEAVE_CURSOR':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            container._reserveCursor = true;
                            break;
                        case 'OFF':
                            container._reserveCursor = false;
                            break;
                    }
                    i += 1;
                    break;
                case '表示':
                case 'SHOW':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            container._customShow = true;
                            break;
                        case 'OFF':
                            container._customShow = false;
                            break;
                    }
                    var window = SceneManager.oswWindowData(type, windowId);
                    if (!window) {
                        window = SceneManager._scene.cwCreateNewWindow(type, windowId);
                    }
                    if (window) {
                        switch (setArgStr(args[i+1]).toUpperCase()) {
                            case 'ON':
                                window.show();
                                break;
                            case 'OFF':
                                window.deactivate();
                                window.hide();
                                break;
                        }
                    }
                    i += 1;
                    break;
                case '表示スイッチ':
                case 'SHOW_SWITCH':
                    var switchId = setArgNum(args[i+1]);
                    container._customShowSwId = switchId;
                    i += 1;
                    break;
                case 'アクティブ':
                case 'ACTIVE':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            container._customActivate = true;
                            break;
                        case 'OFF':
                            container._customActivate = false;
                            break;
                    }
                    var window = SceneManager.oswWindowData(type, windowId);
                    if (!window) {
                        window = SceneManager._scene.cwCreateNewWindow(type, windowId);
                    }
                    if (window) {
                        switch (setArgStr(args[i+1]).toUpperCase()) {
                            case 'ON':
                                window.activate();
                                break;
                            case 'OFF':
                                window.deactivate();
                                break;
                        }
                    }
                    i += 1;
                    break;
                case '最大列数':
                case 'MAX_COLS':
                    var value = setArgNum(args[i+1]);
                    container._customMaxCols = value;
                    i += 1;
                    break;
                case 'カーソル高さ':
                case 'CURSOR_HEIGHT':
                    var value = setArgNum(args[i+1]);
                    container._customCursorHeight = value;
                    i += 1;
                    break;
                case 'コマンド位置':
                case 'COMMAND_ALIGN':
                    container._customTextAlign = args[i+1];
                    i += 1;
                    break;
                case 'コマンド追加':
                case 'ADD_COMMAND':
                    i += this.setOswCommandArgs(container, i + 1, args);
                    break;
                case 'キャンセル実行設定':
                case 'ADD_CANCEL_ACTION':
                    this.setOswCommandCancel(container, args[i+1]);
                    i += 1;
                    break;
                case 'コマンド初期化':
                case 'CLEAR_COMMAND':
                    if (!container._customList) container._customList = [];
                    container._customList.length = 0;
                    break;
                case 'リスト設定':
                case 'SET_LIST':
                    i += this.setOswSelectList(container, i, args);
                    break;
                case 'リスト初期化':
                case 'CLEAR_LIST':
                    if (!container._customList) container._customList = [];
                    container._customList.length = 0;
                    container._customListType = 0;
                    container._customListEnabled = 'true';
                    container._customDrawType = 0;
                    break;
                case 'リスト実行設定':
                case 'SET_LIST_ACTION':
                    i += this.setOswSelectArgs(container, i + 1, args);
                    break;
                case 'テキスト':
                case 'TEXT':
                    var line = setArgNum(args[i+1]);
                    var text = setArgStr(args[i+2]);
                    if (!container._customList) container._customList = [];
                    container._customList[line] = {
                        name : text,
                        index : line,
                        visible : true
                    }
                    container._customDrawType = 0;
                    i += 2;
                    break;
                case 'テキスト初期化':
                case 'CLEAR_TEXT':
                    if (!container._customList) container._customList = [];
                    container._customList.length = 0;
                    break;
                case '内容':
                case 'CONTENT':
                    i += this.setOswContentArgs(container, i + 1, args);
                    container._customDrawType = 1;
                    break;
                case 'アクター':
                case 'ACTOR':
                    container._customActorId = setArgNum(args[i+1]);
                    i += 1;
                    break;
                case 'パーティー':
                case 'PARTY':
                    var actor = $gameParty.members()[setArgNum(args[i+1])];
                    container._customActorId = actor.actorId();
                    i += 1;
                    break;
                case 'セレクト参照':
                case 'REFERENCE_SELECT':
                    var containerId = setArgNum(args[i+1]);
                    container._customReference = containerId;
                    i += 1;
                    break;
                case '更新':
                case 'REFRESH':
                    var window = SceneManager.oswWindowData(type, windowId);
                    if (window) {
                        window = SceneManager._scene.cwCreateNewWindow(type, windowId);
                    }
                    window.refresh();
                    break;
                case 'カーソル位置初期化':
                case 'CLEAR_CURSOR':
                    var window = SceneManager.oswWindowData(type, windowId);
                    if (window) {
                        window = SceneManager._scene.cwCreateNewWindow(type, windowId);
                    }
                    window.select(0);
                    break;
                case 'フォントサイズ':
                case 'FONT_SIZE':
                    var value = setArgNum(args[i+1]);
                    container._customFontSize = value;
                    i += 1;
                    break;
                case '余白':
                case 'PADDING':
                    var value = setArgNum(args[i+1]);
                    container._customPadding = value;
                    i += 1;
                    break;
                case '行の高さ':
                case 'LINEHEIGHT':
                    var value = setArgNum(args[i+1]);
                    container._customLineHeight = value;
                    i += 1;
                    break;
                case '透明度':
                case 'OPACITY':
                    var value = setArgNum(args[i+1]);
                    container._customBackOpacity = value;
                    i += 1;
                    break;
                case 'フレーム':
                case 'FRAME':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            container._customHideFrame = false;
                            break;
                        case 'OFF':
                            container._customHideFrame = true;
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
        if (!window._customList) window._customList = [];
        window._customList.push({
            name:name, symbol:symbol, enabled:enabled, ext:null, method:method,
            index: window._customList.length - 1, visible : true
        });
        window.height = window._customList.length * window._customLineHeight + window._customPadding * 2;
        return 4;
    };

    Game_Interpreter.prototype.setOswCommandCancel = function(window, method) {
        window._customCancelMethodType = deconvertOswMethod(method).type;
        window._customCancelMethodDetail = deconvertOswMethod(method).detail;
        window._customCancelMethodDetail2 = deconvertOswMethod(method).detail2;
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
                        var windowType = Game_OswData.WINDOW_COMMAND;
                        break;
                    case 'セレクト':
                    case 'SELECT':
                        var windowType = Game_OswData.WINDOW_SELECTABLE;
                        break;
                }
                var windowId = Number(newwindow[1]);
                var hide = Boolean(eval(newwindow[2]));
                var deselect = Boolean(eval(newwindow[3]));
                var varId = Number(newwindow[4]) || 0;
                var action = windowType + ',' + windowId + ',' + hide + ',' + deselect+ ',' + varId;
                return 'this.changeActivateWindow.bind(this, window,' + action + ')';
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
                        return 'this.popScene.bind(this)';
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
                    var texts = args[i+1].split(';');
                    window._customCssText1 = texts[0] || '';
                    window._customCssText2 = texts[1] || '';
                    window._customCssText3 = texts[2] || '';
                    i += 1;
                    count += 2;
                    break;
                case '描画間隔':
                case 'DRAW_SPACE':
                    var spaces = setArgStr(args[i+1]).split(',');
                    window._customCssSpace1 = spaces[0] || 0;
                    window._customCssSpace2 = spaces[1] || 0;
                    window._customCssSpace3 = spaces[2] || 0;
                    window._customCssSpace4 = spaces[3] || 0;
                    i += 1;
                    count += 2;
                    break;
                case '並列間隔':
                case 'PARALLEL_SPACE':
                    window._customCssSpaceIn = setArgNum(args[i+1]);
                    i += 1;
                    count += 2;
                    break;
                case '幅比率':
                case 'WIDTH_RATE':
                    var rates = setArgStr(args[i+1]).split(',');
                    window._customCssWidthRate1 = rates[0] || 0;
                    window._customCssWidthRate2 = rates[1] || 0;
                    window._customCssWidthRate3 = rates[2] || 0;
                    i += 1;
                    count += 2;
                    break;
                default:
                    return count;
            }
        }
        return count;
    };

    Game_Interpreter.prototype.setOswSelectArgs = function(window, i, args) {
        var method = deconvertOswMethod(args[i+1]);
        switch (args[i].toUpperCase()) {
            case '決定':
            case 'OK':
                window._customOkMethodType = method.type;
                window._customOkMethodDetail = method.detail;
                window._customOkMethodDetail2 = method.detail2;
                return 3;
            case 'キャンセル':
            case 'CANCEL':
                window._customCancelMethodType = method.type;
                window._customCancelMethodDetail = method.detail;
                window._customCancelMethodDetail2 = method.detail2;
                return 3;
        }
        return;
    };

    Game_Interpreter.prototype.setOswSelectList = function(window, i, args) {
        switch (setArgStr(args[i+1]).toUpperCase()) {
            case 'テキスト':
            case 'TEXT':
                var list = (args[i+2] + '').split(',');
                window._customDrawType = Game_OswData.SELECT_TEXT_LIST;
                if(window._customList) window._customList = [];
                window._customList.length = 0;
                list.forEach(function(text, i){
                    window._customList[i] = {name:text, index:i, visible:true};
                });
                return 2;
            case 'パーティー':
            case 'PARTY':
                switch ((args[i+2]).toUpperCase()) {
                    case '全メンバー':
                    case 'ALL_MEMBER':
                        var type = Game_OswData.SELECT_PARTY_ALL;
                        break;
                    case 'バトルメンバー':
                    case 'BATTLE_MEMBER':
                        var type = Game_OswData.SELECT_PARTY_BATTLE;
                        break;
                    case '控えメンバー':
                    case 'RESERVE_MEMBER':
                        var type = Game_OswData.SELECT_PARTY_RESERVE;
                        break;
                }
                window._customDrawType = Game_OswData.SELECT_PARTY_LIST;
                window._customListType = type;
                window._customListEnabled = true;
                return 2;
            case 'アクター':
            case 'ACTOR':
                window._customDrawType = Game_OswData.SELECT_ACTOR_LIST;
                window._customListType = Game_OswData.SELECT_ACTOR;
                window._customListEnabled = args[i+2];
                return 2;
            case '職業':
            case 'CLASS':
                window._customDrawType = Game_OswData.SELECT_CLASS_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case 'スキル':
            case 'SKILL':
                window._customDrawType = Game_OswData.SELECT_SKILL_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case 'アイテム':
            case 'ITEM':
                window._customDrawType = Game_OswData.SELECT_ITEM_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case '武器':
            case 'WEAPON':
                window._customDrawType = Game_OswData.SELECT_WEAPON_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case '防具':
            case 'ARMOR':
                window._customDrawType = Game_OswData.SELECT_ARMOR_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case '敵キャラ':
            case 'ENEMY':
                window._customDrawType = Game_OswData.SELECT_ENEMY_LIST;
                window._customListEnabled = args[i+2];
                return 2;
            case '敵グループ':
            case 'TROOP':
                window._customDrawType = Game_OswData.SELECT_TROOP_LIST;
                window._customListEnabled = args[i+2];
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
        $gameOswData = new Game_OswData();
    };

    //=============================================================================
    // Game_OswData
    // オリジナルシーンにコモンイベントを実装する
    //=============================================================================

    Game_OswData.prototype.initialize = function() {
        this._interpreter = new Game_Interpreter();
        this._oswIndex = -1;
        this._oswItem = null;
        this._active = false;
    };

    Game_OswData.prototype.update = function(sceneActive) {
        if (sceneActive) {
            this._active = true;
            this.updateInterpreter();
        } else {
            this._active = false;
        }
    };

    Game_OswData.prototype.updateInterpreter = function() {
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

    Game_OswData.prototype.setupStartingEvent = function() {
        if (this._interpreter.setupReservedCommonEvent()) {
            return true;
        }
        if (this.setupTestEvent()) {
            return true;
        }
        return false;
    };

    Game_OswData.prototype.setupTestEvent = function() {
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

    Scene_Base.prototype.isOSWScene = function() {
        return false;
    };

    //=============================================================================
    // Window_Base
    // 共通処理を追加
    //=============================================================================

    Window_Base.prototype.isOsw = function() {
        return false;
    };

    Window_Base.prototype.updateOswIndex = function() {
        if (!this.active) return;
        if ($gameOswData._active && ($gameOswData._oswIndex !== this.index() || $gameOswData._oswItem !== this.item(this.index()))) {
            $gameOswData._oswIndex = this.index();
            $gameOswData._oswItem = this.item(this.index());
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

    //=============================================================================
    // Scene_OSW
    // オリジナルシーンを定義
    //=============================================================================

    Scene_OSW.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_OSW.prototype.constructor = Scene_OSW;

    Scene_OSW.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_OSW.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = FTKR.GDM.original.bgimage;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadSystem(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_OSW.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        var active = this.isActive();
        $gameOswData.update(active);
    };

    Scene_OSW.prototype.isOSWScene = function() {
        return true;
    };

    //=============================================================================
    // Window_OswCommand
    // コマンドウィンドウクラス
    //=============================================================================

    Window_OswCommand.prototype = Object.create(Window_Command.prototype);
    Window_OswCommand.prototype.constructor = Window_OswCommand;

    Window_OswCommand.prototype.initialize = function(windowId) {
        this._windowId = windowId;
        this._windowType = Game_OswData.WINDOW_COMMAND;
        this._width = FTKR.GDM.command.width;
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.show();
        this.deactivate();
        this.select(0);
        this.refresh();
    };

    Window_OswCommand.prototype.isOsw = function() {
        return true;
    };

    Window_OswCommand.prototype.standardCssLayout = function() {
        var layout = copyObject(FTKR.GDM.basic);
        layout.maxCols = FTKR.GDM.command.maxCols;
        return layout;
    };

    Window_OswCommand.prototype.item = function(index) {
        return null;
    };

    Window_OswCommand.prototype.windowWidth = function() {
        return this._width;
    };

    Window_OswCommand.prototype.makeCommandList = function() {
        if (!this._customList) return;
        this._customList.forEach( function(cmd) {
            var enabled = eval(this.convertEscapeCharacters(cmd.enabled));
            this.addCommand(cmd.name, cmd.symbol, enabled);
        },this);
    };

    Window_OswCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        if (FTKR.GDM.command.excape) {
            var tw = this.convertTextWidth(this.commandName(index));
            var offset = convertAlign(align) * (rect.width - tw) / 2;
            this.drawTextEx(this.commandName(index), rect.x + offset, rect.y);
        } else {
            this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
        }
    };

    Window_OswCommand.prototype.update = function() {
        this.updateOswIndex();
        Window_Command.prototype.update.call(this);
        if (this._autoRefreshed) this.refresh();
    };

    Window_OswCommand.prototype.setCustomListHeight = function() {
        this.move(this.x, this.y, this.width, this.fittingHeight(this._customList.length));
    };

    //=============================================================================
    // Window_OswCommon
    // コモンウィンドウクラス
    //=============================================================================

    Window_OswCommon.prototype = Object.create(Window_Base.prototype);
    Window_OswCommon.prototype.constructor = Window_OswCommon;

    Window_OswCommon.prototype.initialize = function(windowId) {
        this._windowId = windowId;
        this._windowType = Game_OswData.WINDOW_COMMON;
        this._actor = null;
        this._item = null;
        this._list = [];
        this._referenceWindow = null;
        var common = FTKR.GDM.common;
        Window_Base.prototype.initialize.call(this, 
            0, 0, common.width, common.height);
        this.show();
        this._show = false;
        this._referenceIndex = -1;
        this.refresh();
        console.log(this);
    };

    Window_OswCommon.prototype.isOsw = function() {
        return true;
    };

    Window_OswCommon.prototype.referenceWindow = function() {
        return SceneManager.searchWindowByName(this._customReference);
    };

    Window_OswCommon.prototype.updateReference = function() {
        if (!this.isCommon() || !this.referenceWindow()) return;
        var window = this.referenceWindow();
        if (this._referenceIndex === window.index()) return;
        this._referenceIndex = window.index();
        this._actor = window._actor;
        if(!!window.item) this._item = window.item(window.index());
        this.refresh();
    };

    Window_OswCommon.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateReference();
        if (this._autoRefreshed) this.refresh();
    };

    Window_OswCommon.prototype.actor = function() {
        return this._customActorId ?
            $gameActors.actor(this._customActorId) : this._actor;
    };

    Window_OswCommon.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawContent(0, 0, w, h);
        }
    };

    Window_OswCommon.prototype.isEnabledChangePaintOpacity = function(actor) {
        return true;
    };

    Window_OswCommon.prototype.standardCssLayout = function() {
        return copyObject(FTKR.GDM.basic);
    };

    Window_OswCommon.prototype.standardCssStatus = function() {
        return copyObject(FTKR.GDM.common.content);
    };

    Window_OswCommon.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalFormula(formula);
    };

    Window_OswCommon.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalStrFormula(formula);
    };

    Window_OswCommon.prototype.drawContent = function(x, y, width, height) {
        if (this.isCssContentsWindow()) {
            this.drawCssActorStatus(0, this.actor(), x, y, width, height, this._lssStatus);
        } else {
            var i = 0;
            this._customList.forEach( function(list){
                if (list.visible) {
                    this.drawTextEx(list.name, x, y + this.lineHeight() * i);
                    i++;
                }
            },this);
        }
    };

    //=============================================================================
    // Window_OswSelect
    // セレクトウィンドウクラス
    //=============================================================================

    Window_OswSelect.prototype = Object.create(Window_Selectable.prototype);
    Window_OswSelect.prototype.constructor = Window_OswSelect;

    Window_OswSelect.prototype.initialize = function(windowId) {
        this._windowId = windowId;
        this._windowType = Game_OswData.WINDOW_SELECTABLE;
        var select = FTKR.GDM.select;
        Window_Selectable.prototype.initialize.call(this, 0, 0, select.width, select.height);
        this._actor = null;
        this._data = [];
        this._show = false;
        this._reference = [];
        this.show();
        this.deactivate();
        this.refresh();
    };

    var _Window_OswSelect_itemHeight = Window_OswSelect.prototype.itemHeight;
    Window_OswSelect.prototype.itemHeight = function() {
        return this.cursorHeight() ? 
            this.lineHeight() * this.cursorHeight() :
            _Window_OswSelect_itemHeight.call(this);
    };

    Window_OswSelect.prototype.isOsw = function() {
        return true;
    };

    Window_OswSelect.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_OswSelect.prototype.actor = function() {
        return this._customActorId ?
            $gameActors.actor(this._customActorId) : this._actor;
    };

    Window_OswSelect.prototype.standardCssLayout = function() {
        var layout = copyObject(FTKR.GDM.basic);
        layout.maxCols = FTKR.GDM.select.maxCols;
        layout.cursorHeight = FTKR.GDM.select.cursorHeight;
        return layout;
    };

    Window_OswSelect.prototype.standardCssStatus = function() {
        return copyObject(FTKR.GDM.select.content);
    };

    Window_OswSelect.prototype.setItemsList = function() {
        console.log('setItemList');
        switch (this._customDrawType) {
            case Game_OswData.SELECT_TEXT_LIST:
                return this._customList;
            case Game_OswData.SELECT_PARTY_LIST:
                switch (this._customListType) {
                    case Game_OswData.SELECT_PARTY_ALL:
                        return $gameParty.allMembers();
                    case Game_OswData.SELECT_PARTY_BATTLE:
                        return $gameParty.battleMembers();
                    case Game_OswData.SELECT_PARTY_RESERVE:
                        return $gameParty.reserveMembers();
                }
            case Game_OswData.SELECT_ACTOR_LIST:
                return $dataActors;
            case Game_OswData.SELECT_CLASS_LIST:
                return $dataClasses;
            case Game_OswData.SELECT_SKILL_LIST:
                return $dataSkills;
            case Game_OswData.SELECT_ITEM_LIST:
                return $dataItems;
            case Game_OswData.SELECT_WEAPON_LIST:
                return $dataWeapons;
            case Game_OswData.SELECT_ARMOR_LIST:
                return $dataArmors;
            case Game_OswData.SELECT_ENEMY_LIST:
                return $dataEnemies;
            case Game_OswData.SELECT_TROOP_LIST:
                return $dataTroops;
        }
        return [];
    };

    Window_OswSelect.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_OswSelect.prototype.isEnabledChangePaintOpacity = function(actor) {
        return true;
    };

    Window_OswSelect.prototype.item = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_OswSelect.prototype.isEnabled = function(item) {
        FTKR.setGameData(this.actor(), null, item);
        return FTKR.evalFormula(this._customListEnabled);
    };

    Window_OswSelect.prototype.makeItemList = function() {
        var list = this.setItemsList();
        if (this._customDrawType) {
            this._data = list.filter( function(item) {
                return item && item.name && this.isEnabled(item);
            },this);
        } else {
            this._data = list;
        }
    };

    Window_OswSelect.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalFormula(formula);
    };

    Window_OswSelect.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, this._item);
        return FTKR.evalStrFormula(formula);
    };

    Window_OswSelect.prototype.drawItem = function(index) {
        var lss = this._lssStatus;
        var rect = this.itemRect(index);
        if (this._customDrawType) {
            this._actor = this.setActor(index);
            lss.item = this.item(index);
            lss.opacity = this.setCssOpacity(index);
            this.drawCssActorStatus(index, this._actor, rect.x, rect.y, rect.width, rect.height, lss);
            lss.opacity = false;
        } else {
            this._actor = null;
            lss.item = null;
            this.drawText(this._data[index].name, rect.x, rect.y, rect.width);
        }
    };

    Window_OswSelect.prototype.setActor = function(index) {
        switch (this._customDrawType) {
            case Game_OswData.SELECT_PARTY_LIST:
                switch (this._customListType) {
                    case Game_OswData.SELECT_PARTY_ALL:
                        return $gameParty.allMembers()[index];
                    case Game_OswData.SELECT_PARTY_BATTLE:
                        return $gameParty.battleMembers()[index];
                    case Game_OswData.SELECT_PARTY_RESERVE:
                        return $gameParty.reserveMembers()[index];
                }
                break;
            case Game_OswData.SELECT_ACTOR_LIST:
                return this.item(index) ? $gameActors.actor(this.item(index).id) : null;
        }
        return this.actor();
    };

    Window_OswSelect.prototype.setCssOpacity = function(index) {
        switch (this._customDrawType) {
            case Game_OswData.SELECT_ACTOR_LIST:
                return true;
        }
        return false;
    };

    Window_OswSelect.prototype.update = function() {
        this.updateOswIndex();
        Window_Selectable.prototype.update.call(this);
        if (this._autoRefreshed) this.refresh();
    };

    Window_OswSelect.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this._customDrawType) {
            this._actor = this.setActor(index);
            this._lssStatus.item = this.item(index);
        }
    };

}());//EOF
