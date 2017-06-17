//=============================================================================
// オリジナルのシーンやウィンドウを作成するプラグイン
// FTKR_OriginalSceneWindow.js
// 作成者     : フトコロ
// 作成日     : 2017/06/17
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_OSW = true;

var FTKR = FTKR || {};
FTKR.OSW = FTKR.OSW || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 オリジナルのシーンやウィンドウを作成する
 * @author フトコロ
 *
 * @param --ウィンドウの共通設定--
 * @desc 
 * 
 * @param Font Size
 * @desc フォントサイズ
 * @default 28
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白
 * @default 18
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @default 192
 * 
 * @param Window Frame
 * @desc ウィンドウ枠を表示にするか
 * 1 - 表示する, 0 - 表示しない
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
 * @default 0
 * 
 * @param Cancel Command Name
 * @desc シーンを閉じるコマンドの名前を設定します。
 * @default 閉じる
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
 * @default 240
 * 
 * @param Command Number In Original
 * @desc オリジナルシーンのコマンドウィンドウ生成数を設定します。
 * @default 
 * 
 * @param Command Number In Map
 * @desc マップシーンのコマンドウィンドウ生成数を設定します。
 * @default 
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
 * @param Common Number In Original
 * @desc オリジナルシーンのコモンウィンドウ生成数を設定します。
 * @default 
 * 
 * @param Common Number In Map
 * @desc マップシーンのコモンウィンドウ生成数を設定します。
 * @default 
 * 
 * @param Common Number In Battle
 * @desc バトルシーンのコモンウィンドウ生成数を設定します。
 * @default 
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
 * @default 5
 * 
 * @param Actor Status Width Rate
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
 * 作成できるウィンドウは、以下の２種類です。
 *   1. コマンドウィンドウ - シーン変更やコモンイベントを実行するコマンドを表示
 *   2. コモンウィンドウ　 - さまざまな文字列や数値、画像などを表示(*1)
 * 
 * (*1) コモンウィンドウに、文字列以外を表示させたい場合は
 *      FTKR_CustomSimpleActorStatus.js が必要です。
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
 * ウィンドウのプライオリティについて
 *-----------------------------------------------------------------------------
 * オリジナルシーンとマップシーンの場合は、独立したレイヤーに表示します。
 * レイヤーのプライオリティは以下の通りです。
 * 
 * オリジナルシーンの場合
 *    :背景 ＜ 当プラグインレイヤー ＜ デフォルトレイヤー
 * 
 * マップシーンの場合
 *    :マップスプライト ＜ 当プラグインレイヤー ＜ マップ名
 *              ＜ デフォルトレイヤー ＜ スクリーンスプライト
 * 
 * 当プラグインのウィンドウ間のプライオリティは、生成コマンドを実行した
 * 順番です。
 * つまり、後に生成したウィンドウの方が手前に表示されます。
 * 
 * 
 * バトルシーンの場合は、デフォルトレイヤーに追加します。
 * 
 * バトルシーンの場合(デフォルトレイヤー内)
 *    :ログウィンドウ ＜ 当プラグインウィンドウ ＜ ステータスウィンドウ ＜ ...
 * 
 * 当プラグインのウィンドウ間のプライオリティは、ウィンドウID順です。
 * ウィンドウIDが大きい方が手前に表示されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * オリジナルシーンの表示
 *-----------------------------------------------------------------------------
 * 以下のプラグインコマンドを実行すると、オリジナルシーンを表示します。
 * 
 * OSW_オリジナルシーン表示
 * OSW_OPEN_SCENE
 * 
 * オリジナルシーンは、デフォルトでは何も表示しません。
 * 
 * コマンドウィンドウやコモンウィンドウを追加する場合は
 * 以降の設定方法に従い、オリジナルシーンの設定を行ってください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * コマンドウィンドウの設定
 *-----------------------------------------------------------------------------
 * コマンドウィンドウの生成数はプラグインパラメータで設定します。
 * 
 * Command Number In Original
 *    :オリジナルシーンでの生成数
 * 
 * Command Number In Map
 *    :マップシーンでの生成数
 * 
 * 
 * コマンドウィンドウの設定は、以下のプラグインコマンドで行います。
 * 
 * OSW_コマンドウィンドウ設定 [シーン名] [ウィンドウID] [設定内容]
 * OSW_SET_COMMAND_WINDOW [scene] [windowId] [setting]
 * 
 * [シーン名]に、以下を設定してください。
 *    オリジナル or ORIGINAL
 *        :オリジナルシーンを設定する
 *    マップ or MAP
 *        :マップシーンを設定する
 * 
 * [ウィンドウID]で、設定するウィンドウのIDを指定します。
 * 
 * [設定内容]には、以下があります。
 * この設定は、プラグインパラメータの設定よりも優先します。
 * 
 *    生成
 *    CREATE
 *        :ウィンドウを生成します。
 *        :オリジナルシーンおよびマップシーンでのみ使用できます。
 *        :このパラメータは単独で使用してください。
 * 
 *    位置 [x] [y]
 *    POSITION [x] [y]
 *        :ウィンドウの表示位置を pixel単位 で指定します。
 *        :x に -1 を入力すると、ウィンドウサイズに合わせて画面右寄せします。
 *        :y に -1 を入力すると、ウィンドウサイズに合わせて画面下寄せします。
 * 
 *    サイズ [width]
 *    SIZE [width]
 *        :ウィンドウのサイズを pixel単位 で指定します。
 *        :ウィンドウの高さは、設定したコマンドの数と最大列数により決まります。
 *        :width に -1 を入力すると、画面の幅に合わせます。
 * 
 *    最大列数 [value]
 *    MAX_COLS [value]
 *        :コマンドを横に並べる数を設定します。
 *        :デフォルトは１です。
 * 
 *    コマンド位置 [align]
 *    COMMAND_ALIGN [align]
 *        :ウィンドウ枠内で、コマンド名を表示する位置を設定します。
 *        : left   - 左寄せ
 *        : center - 中央
 *        : right  - 右寄せ
 *        :デフォルトは左寄せです。
 * 
 *    フォントサイズ [value]
 *    FONTSIZE [value]
 *        :ウィンドウのフォントサイズを pixel単位 で指定します。
 * 
 *    行の高さ [value]
 *    LINEHEIGHT [value]
 *        :ウィンドウの１行の高さを pixel単位 で指定します。
 * 
 *    余白 [value]
 *    PADDING [value]
 *        :ウィンドウの周囲の余白を pixel単位 で指定します。
 * 
 *    透明度 [value]
 *    OPACITY [value]
 *        :ウィンドウの透明度を pixel単位 で指定します。
 * 
 *    フレーム [ON or OFF]
 *    FRAME [ON or OFF]
 *        :ウィンドウのフレームを表示するかどうか設定します。
 *        :デフォルトでは表示(ON)します。
 * 
 *    コマンド初期化
 *    CLEAR_COMMAND
 *        :設定したコマンドをすべて初期化します。
 *    
 *    コマンド追加 [コマンド名] [シンボル名] [実行条件] [メソッド]
 *    ADD_COMMAND [name] [symbol] [enabled] [method]
 *        :コマンドを追加します。
 *        :なお、オリジナルシーンでは、デフォルトで「閉じる」コマンドを
 *        :設定しています。
 *        :
 *        :[実行条件]
 *        : true と入力すると、常にコマンドを実行できます。
 *        : JS計算式を入力すると、実行条件を動的に変えることができます。
 *        :
 *        :[メソッド]の入力例
 *        :  シーン変更(scene)
 *        :  CHANGE_SCENE(scene)
 *        :    :コマンドを実行すると、scene で指定したシーンを表示します。
 *        :    :  sceneの例)
 *        :    :    Scene_Item  - アイテムシーン
 *        :    :    Scene_Skill - スキルシーン
 *        :  コモンイベント(イベントId)
 *        :  COMMON_EVENT(eventId)
 *        :    :コマンドを実行すると、イベントID で指定した
 *        :    :コモンイベント実行します。
 *        :    :なお実行するコモンイベントは、最後に以下のプラグインコマンドを
 *        :    :実行してください。
 *        :    :  OSW_コマンドウィンドウ設定 [シーン名] アクティブ ON
 * 
 *    アクティブ [ON or OFF]
 *    ACTIVE [ON or OFF
 *        :コマンドウィンドウを選択可能な状態にするかどうか設定します。
 *        :複数のコマンドウィンドウを表示させる場合には、
 *        :アクティブをONにするウィンドウは一つだけにしてください。
 * 
 *    表示 [ON or OFF]
 *    SHOW [ON or OFF]
 *        :ウィンドウの表示のON/OFFを切り替えます。
 *        :表示をONに切り替える時に、更新を行います。
 *        :基本的に最後に設定してください。
 * 
 *-----------------------------------------------------------------------------
 * コモンウィンドウの表示
 *-----------------------------------------------------------------------------
 * コモンウィンドウの生成数はプラグインパラメータで設定します。
 * 
 * Common Number In Original
 *    :オリジナルシーンでの生成数
 * 
 * Common Number In Map
 *    :マップシーンでの生成数
 * 
 * Common Number In Battle
 *    :バトルシーンでの生成数
 *    :バトルシーンでは、ログウィンドウよりも手前に表示します。
 * 
 * 
 * コモンウィンドウの設定は以下のプラグインコマンドで行います。
 * 
 * OSW_コモンウィンドウ設定 [シーン名] [ウィンドウID] [設定内容]
 * OSW_SET_COMMON_WINDOW [scene] [windowId] [setting]
 * 
 * [シーン名]に、以下を設定してください。
 *    オリジナル or ORIGINAL
 *        :オリジナルシーンを設定する
 *    マップ or MAP
 *        :マップシーンを設定する
 *    バトル or BATTLE
 *        :バトルシーンを設定する
 * 
 * 
 * [ウィンドウID]で、設定するウィンドウのIDを指定します。
 * 
 * [設定内容]には、以下があります。
 * この設定は、プラグインパラメータの設定よりも優先します。
 * 
 *    生成
 *    CREATE
 *        :ウィンドウを生成します。
 *        :オリジナルシーンおよびマップシーンでのみ使用できます。
 *        :このパラメータは単独で使用してください。
 * 
 *    位置 [x] [y]
 *    POSITION [x] [y]
 *        :ウィンドウの表示位置を pixel単位 で指定します。
 *        :x に -1 を入力すると、ウィンドウサイズに合わせて画面右寄せします。
 *        :y に -1 を入力すると、ウィンドウサイズに合わせて画面下寄せします。
 * 
 *    サイズ [width] [height]
 *    SIZE [width] [height]
 *        :ウィンドウのサイズを pixel単位 で指定します。
 *        :width に -1 を入力すると、画面の幅に合わせます。
 *        :height に -1 を入力すると、画面の高さに合わせます。
 * 
 *    フォントサイズ [value]
 *    FONTSIZE [value]
 *        :ウィンドウのフォントサイズを pixel単位 で指定します。
 * 
 *    行の高さ [value]
 *    LINEHEIGHT [value]
 *        :ウィンドウの１行の高さを pixel単位 で指定します。
 * 
 *    余白 [value]
 *    PADDING [value]
 *        :ウィンドウの周囲の余白を pixel単位 で指定します。
 * 
 *    透明度 [value]
 *    OPACITY [value]
 *        :ウィンドウの透明度を pixel単位 で指定します。
 * 
 *    フレーム [表示 or 非表示]
 *    FRAME [SHOW or HIDE]
 *        :ウィンドウのフレームを表示するかどうか設定します。
 *        :(デフォルトでは表示)
 * 
 *    テキスト [行数] [表示する文字列]
 *    TEXT [line] [displayText]
 *        :ウィンドウに表示する文字列を設定します。
 *        :行数で、文字列を何行目(最上段を0とする)に表示するか指定します。
 *        :制御文字を使用できます。
 *        :FTKR_CustomSimpleActorStatus.js と組み合わせている場合には
 *        :この記述は使用できません。
 *    
 *    テキスト初期化
 *    CLEAR_TEXT
 *        :設定したテキストをすべて初期化します。
 *    
 *    アクター [アクターID]
 *    ACTOR [actorId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターを指定します。
 *        :アクターIDには、\V[x]でゲーム内変数を使用できます。
 * 
 *    内容 [表示内容]
 *    CONTENT [contentSetting]
 *        :FTKR_CustomSimpleActorStatus.js と組み合わせている場合に
 *        :使用可能な記述です。
 *        :[表示内容]には以下の記述で設定します。
 *        :
 *        :   ステータス [表示させるステータス]
 *        :   STATUS [displayStatus]
 *        :       :Actor Status Text1 ~ 3に相当する設定です。
 *        :       :セミコロン(;)でText1,Text2,Text3の内容を区切って
 *        :       :入力してください。
 *        :
 *        :   描画間隔 [値1,値2,値3,値4]
 *        :   DRAW_SPACE [value1,value2,value3,value4]
 *        :       :Actor Status Space に相当する設定です。
 *        :       :カンマ(,)で区切って、入力してください。
 *        :
 *        :   並列間隔 [値]
 *        :   PARALEL_SPACE [value]
 *        :       :Actor Status Space In Text に相当する設定です。
 *        :
 *        :   幅比率 [表示させるステータス]
 *        :   WIDTH_RATE [表示させるステータス]
 *        :       :Actor Status Width Rate に相当する設定です。
 *        :       :カンマ(,)で区切って、入力してください。
 * 
 *    更新
 *    REFRESH
 *        :設定内容をウィンドウに反映させます。
 *        :位置やサイズなど、設定した後には更新が必要です。
 * 
 *    表示 [ON or OFF]
 *    SHOW [ON or OFF]
 *        :ウィンドウの表示のON/OFFを切り替えます。
 *        :基本的に最後に設定してください。
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
            fontSize  :Number(parameters['Font Size'] || 0),
            padding   :Number(parameters['Window Padding'] || 0),
            lineHeight:Number(parameters['Window Line Height'] || 0),
            opacity   :Number(parameters['Window Opacity'] || 0),
            frame     :Number(parameters['Window Frame'] || 0),
        },
        original:{
            bgimage   :String(parameters['Background Image Name'] || ''),
        },
        command:{
            cancel        :String(parameters['Cancel Command Name'] || 'CANCEL'),
            x             :Number(parameters['Command Position X'] || 0),
            y             :Number(parameters['Command Position Y'] || 0),
            width         :Number(parameters['Command Width'] || 0),
            number:{
                original  :Number(parameters['Command Number In Original'] || 0),
                map       :Number(parameters['Command Number In Map'] || 0),
            },
        },
        common:{
            width         :Number(parameters['Common Width'] || 0),
            height        :Number(parameters['Common Height'] || 0),
            content:{
                space     :String(parameters['Actor Status Space'] || ''),
                spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
                widthRate :String(parameters['Actor Status Width Rate'] || ''),
            },
            number:{
                original  :Number(parameters['Common Number In Original'] || 0),
                map       :Number(parameters['Common Number In Map'] || 0),
                battle    :Number(parameters['Common Number In Battle'] || 0),
            },
        },
    };

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
            console.error(e);
            return 0;
        }
    };

    var setArgObj = function(arg) {
        try {
            return eval(setArgStr(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
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
            case 'コモン設定':
            case 'SET_COMMON':
                this.setOswWindowParam(args, 0);
                break;
            case 'コマンド設定':
            case 'SET_COMMAND':
                this.setOswWindowParam(args, 1);
                break;
        }
    };

    Game_Interpreter.prototype.setOswWindowParam = function(args, type) {
        var windowId = setArgNum(args[1]);
        switch (setArgStr(args[0]).toUpperCase()) {
            case 'オリジナル':
            case 'ORIGINAL':
                var window = type ?
                    $gameOswData.commandWindow(windowId) :
                    $gameOswData.commonWindow(windowId);
                break;
            case 'マップ':
            case 'MAP':
                var window = type ?
                    $gameMap.commandWindow(windowId) :
                    $gameMap.commonWindow(windowId);
                break;
            case 'バトル':
            case 'BATTLE':
                var window = type ?
                    $gameParty.commandWindow(windowId) :
                    $gameParty.commonWindow(windowId);
                break;
            default:
                return;
        }
        this.setOswWindowArgs(window, 2, args, type);
    };

    Game_Interpreter.prototype.setOswWindowArgs = function(window, index, args, type) {
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case '生成':
                case 'CREATE':
                    var windowId = setArgNum(args[1]);
                    if (window.isOriginal()) {
                        $gameOswData.addOswList(type, windowId);
                    } else if (window.isMap()) {
                        $gameMap.addOswList(type, windowId);
                    }
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
                case '表示':
                case 'SHOW':
                    switch (setArgStr(args[i+1]).toUpperCase()) {
                        case 'ON':
                            window.show();
                            break;
                        case 'OFF':
                            window.hide();
                            break;
                        default:
                            setArgNum(args[i+1]) ? window.show() : window.hide();
                            break;
                    }
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
                case 'コマンド位置':
                case 'COMMAND_ALIGN':
                    window.setTextAlign(args[i+1]);
                    i += 1;
                    break;
                case 'コマンド追加':
                case 'ADD_COMMAND':
                    i += this.setOswCommandArgs(window, i + 1, args);
                    break;
                case 'コマンド初期化':
                case 'CLEAR_COMMAND':
                    window.clearCommands();
                    break;
                case 'テキスト':
                case 'TEXT':
                    var line = setArgNum(args[i+1]);
                    var text = setArgStr(args[i+2]);
                    window.setText(line, text);
                    i += 2;
                    break;
                case 'テキスト初期化':
                case 'CLEAR_TEXT':
                    window.clearTexts();
                    break;
                case '内容':
                case 'CONTENT':
                    i += this.setOswCommonContentArgs(window, i + 1, args);
                    break;
                case 'アクター':
                case 'ACTOR':
                    var actor = $gameActors.actor(setArgNum(args[i+1]));
                    window.setActor(actor);
                    i += 1;
                    break;
                case '更新':
                case 'REFRESH':
                    window.setRequestRefresh();
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
        var match = /(.+)\((.+)\)/.exec(args[i+3]) || [];
        switch ((match[1] + '').toUpperCase()) {
            case 'シーン変更':
            case 'CHANGE_SCENE':
                var method = 'SceneManager.push.bind(SceneManager,' + match[2] + ')';
                break;
            case 'コモンイベント':
            case 'COMMON_EVENT':
                var method = '$gameTemp.reserveCommonEvent.bind($gameTemp,' + match[2] + ')';
                break;
            default:
                var method = args[i+3];
                break;
        }
        window.addCommand(name, symbol, enabled, null, method);
        return 4;
    };

    Game_Interpreter.prototype.setOswCommonContentArgs = function(window, index, args) {
        var count = 0;
        for (var i = index; i < args.length; i++) {
            var arg = (args[i] + '').toUpperCase();
            switch (arg) {
                case 'ステータス':
                case 'STATUS':
                    window.setContentStatus(setArgStr(args[i+1]));
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
                    window.setContentInSpace(setArgNum(args[i+1]));
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

    Game_OswBase.WINDOW_COMMON = 0;
    Game_OswBase.WINDOW_COMMAND = 1;

    Game_OswBase.prototype.initialize = function(scene) {
        this._scene = scene;
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._show = false;
        this._requestRefresh = false;
        var basic = FTKR.OSW.basic;
        this._opacity = basic.opacity;
        this._padding = basic.padding;
        this._fontSize = basic.fontSize;
        this._lineHeight = basic.lineHeight;
        this._frame = basic.frame;
        this._creative = false;
    };

    Game_OswBase.prototype.isOriginal = function() {
        return this._scene === 0;
    };

    Game_OswBase.prototype.isMap = function() {
        return this._scene === 1;
    };

    Game_OswBase.prototype.isBattle = function() {
        return this._scene === 2;
    };

    Game_OswBase.prototype.setPosition = function(x, y) {
        this._x = x === -1 ? Graphics.boxWidth - this._width : x;
        this._y = y === -1 ? Graphics.boxHeight - this._height : y;
    };

    Game_OswBase.prototype.setWidth = function(width) {
        this._width = width === -1 ? Graphics.boxWidth : width;
    };

    Game_OswBase.prototype.setHeight = function(height) {
        this._height = height=== -1 ? Graphics.boxHeight : height;
    };

    Game_OswBase.prototype.show = function() {
        this._show = true;
    };

    Game_OswBase.prototype.hide = function() {
        this._show = false;
    };

    Game_OswBase.prototype.requestRefresh = function() {
        return this._requestRefresh;
    };

    Game_OswBase.prototype.setRequestRefresh = function() {
        this._requestRefresh = true;
    };

    Game_OswBase.prototype.clearRequestRefresh = function() {
        this._requestRefresh = false;
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

    //=============================================================================
    // Game_OswCommand
    // コマンドウィンドウ設定用データクラス
    //=============================================================================

    Game_OswCommand.prototype = Object.create(Game_OswBase.prototype);
    Game_OswCommand.prototype.constructor = Game_OswCommand;

    Game_OswCommand.prototype.initialize = function(scene) {
        Game_OswBase.prototype.initialize.call(this, scene);
        this._list = [];
        this._index = 0;
        this._maxCols = 1;
        this._align = 'left';
        this._active = false;
        this._deactivate = false;
        var cmd = FTKR.OSW.command;
        this.setPosition(cmd.x, cmd.y);
        this.setWidth(cmd.width);
        this.setHeight(this.windowHeight());
    };

    Game_OswCommand.prototype.commandNum = function() {
        return this._list.length + (!this._scene ? 1 : 0);
    };

    Game_OswCommand.prototype.windowHeight = function() {
        var line = Math.ceil(this.commandNum() / this._maxCols);
        return this._padding * 2 + this._lineHeight * line;
    };

    Game_OswCommand.prototype.activate = function() {
        this._active = true;
    };

    Game_OswCommand.prototype.deactivate = function() {
        this._active = false;
    };
    
    Game_OswCommand.prototype.clearCommands = function() {
        this._list = [];
    };

    Game_OswCommand.prototype.isCommand = function() {
        return true;
    }

    Game_OswCommand.prototype.setSize = function(width) {
        this.setWidth(width);
        this.setHeight(this.windowHeight());
    };

    Game_OswCommand.prototype.setMaxCols = function(value) {
        this._maxCols = value;
    };

    Game_OswCommand.prototype.setTextAlign = function(align) {
        this._align = align;
    };

    Game_OswCommand.prototype.setCommand = function(list, name, symbol, enabled, ext, method) {
        this._list[line] = {
            name    :name,
            symbol  :symbol,
            enabled :enabled,
            ext     :ext,
            method  :method,
        };
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

    //=============================================================================
    // Game_OswCommon
    // コモンウィンドウ設定用データクラス
    //=============================================================================

    Game_OswCommon.prototype = Object.create(Game_OswBase.prototype);
    Game_OswCommon.prototype.constructor = Game_OswCommon;

    Game_OswCommon.prototype.initialize = function(scene) {
        Game_OswBase.prototype.initialize.call(this, scene);
        this._actor = null;
        var common = FTKR.OSW.common;
        this.setSize(common.width, common.height);
        this._texts = [];
        this._content = {
            text1     : '',
            text2     : '',
            text3     : '',
            space     : common.content.space,
            spaceIn   : common.content.spaceIn,
            widthRate : common.content.widthRate,
        }
    };

    Game_OswCommon.prototype.isCommand = function() {
        return false;
    }

    Game_OswCommon.prototype.content = function() {
        return this._content;
    };

    Game_OswCommon.prototype.texts = function() {
        return this._texts;
    };

    Game_OswCommon.prototype.clearTexts = function() {
        this._texts = [];
    };

    Game_OswCommon.prototype.setText = function(line, text) {
        this._texts[line] = text;
    };

    Game_OswCommon.prototype.setSize = function(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };

    Game_OswCommon.prototype.setActor = function(actor) {
        this._actor = actor;
    };

    Game_OswCommon.prototype.setContentStatus = function(status) {
        var texts = status.split(';');
        this._content.text1 = texts[0] || '';
        this._content.text2 = texts[1] || '';
        this._content.text3 = texts[2] || '';
    };

    Game_OswCommon.prototype.setContentSpace = function(space) {
        this._content.space = space;
    };

    Game_OswCommon.prototype.setContentSpaceIn = function(spaceIn) {
        this._content.spaceIn = spaceIn;
    };

    Game_OswCommon.prototype.setContentWidthRate = function(widthRate) {
        this._content.widthRate = widthRate;
    };

    //=============================================================================
    // Game_Map
    // マップデータクラスにマップシーン用のウィンドウ設定を追加
    //=============================================================================

    var _OSW_Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _OSW_Game_Map_initialize.call(this);
        this._oswList = [];
        this.initCommandWindows();
        this.initCommonWindows();
    };

    Game_Map.prototype.addOswList = function(type, id) {
        if (type === Game_OswBase.WINDOW_COMMAND && id >= this.commandWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_COMMON && id >= this.commonWindowNumber()) return;
        this._oswList.push({type:type, id:id, creative:false});
    };

    Game_Map.prototype.initCommandWindows = function() {
        this._oswCommandWindows = [];
        for (var i = 0; i < this.commandWindowNumber(); i++) {
            this._oswCommandWindows[i] = new Game_OswCommand(1);
        }
    };

    Game_Map.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(1);
        }
    };

    Game_Map.prototype.commandWindow = function(windowId) {
        return this._oswCommandWindows[windowId];
    };

    Game_Map.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_Map.prototype.commandWindowNumber = function() {
        return FTKR.OSW.command.number.map;
    };

    Game_Map.prototype.commonWindowNumber = function() {
        return FTKR.OSW.common.number.map;
    };

    //=============================================================================
    // Game_Party
    // パーティーデータクラスに、バトルシーン用のウィンドウ設定を追加
    //=============================================================================

    var _OSW_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _OSW_Game_Party_initialize.call(this);
        this.initCommonWindows();
    };

    Game_Party.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(2);
            this._oswCommonWindows[i].createWindow();
        }
    };

    Game_Party.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_Party.prototype.commonWindowNumber = function() {
        return FTKR.OSW.common.number.battle;
    };

    //=============================================================================
    // Game_OswScene
    // オリジナルシーン設定用データクラス
    //=============================================================================

    Game_OswScene.prototype.initialize = function() {
        this._oswList = [];
        this.initCommandWindows();
        this.initCommonWindows();
    };

    Game_OswScene.prototype.addOswList = function(type, id) {
        if (type === Game_OswBase.WINDOW_COMMAND && id >= this.commandWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_COMMON && id >= this.commonWindowNumber()) return;
        this._oswList.push({type:type, id:id, creative:false});
    };

    Game_OswScene.prototype.initCommandWindows = function() {
        this._oswCommandWindows = [];
        for (var i = 0; i < this.commandWindowNumber(); i++) {
            this._oswCommandWindows[i] = new Game_OswCommand(0);
        }
    };

    Game_OswScene.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(0);
        }
    };

    Game_OswScene.prototype.commandWindow = function(windowId) {
        return this._oswCommandWindows[windowId];
    };

    Game_OswScene.prototype.commonWindow = function(windowId) {
        return this._oswCommonWindows[windowId];
    };

    Game_OswScene.prototype.commandWindowNumber = function() {
        return FTKR.OSW.command.number.original;
    };

    Game_OswScene.prototype.commonWindowNumber = function() {
        return FTKR.OSW.common.number.original;
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

    //------------------------------------------------------------------------
    // 全ウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createAllOswWindows = function(gameData) {
        this._oswCommandWindows = [];
        this._oswCommonWindows = [];
        gameData._oswList.forEach( function(window) {
            this.createOswWindow(gameData, window);
        },this);
    };

    Scene_Base.prototype.createOswWindow = function(gameData, window) {
        if (window.type === Game_OswBase.WINDOW_COMMON) {
            if (this._oswCommonWindows[window.id]) return;
            this.createCommonWindow(window.id, gameData.commonWindow(window.id));
        } else if (window.type === Game_OswBase.WINDOW_COMMAND) {
            if (this._oswCommandWindows[window.id]) return;
            this.createCommandWindow(window.id, gameData.commandWindow(window.id));
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
    Scene_Base.prototype.createAllCommandWindows = function(gameData) {
        this._oswCommandWindows = [];
        var number = gameData.commandWindowNumber();
        for (var i = 0; i < number; i++) {
            this.createCommandWindow(i, gameData.commandWindow(i));
        }
    };
  
    Scene_Base.prototype.createCommandWindow = function(windowId, window) {
        this._oswCommandWindows[windowId] = new Window_OswCommand(window);
        window._list.forEach(function(cmd) {
            var method = eval(cmd.method);
            this._oswCommandWindows[windowId].setHandler(cmd.symbol, method);
        },this);
        if(window.isOriginal()) this._oswCommandWindows[windowId].setHandler('cancel',  this.popScene.bind(this));
        this.addOswWindow(this._oswCommandWindows[windowId]);
    };

    //------------------------------------------------------------------------
    // コモンウィンドウの作成
    //------------------------------------------------------------------------
    Scene_Base.prototype.createAllCommonWindows = function(gameData) {
        this._oswCommonWindows = [];
        var number = gameData.commonWindowNumber();
        for (var i = 0; i < number; i++) {
            this.createCommonWindow(i, gameData.commonWindow(i));
        }
    };

    Scene_Base.prototype.createCommonWindow = function(windowId, window) {
        this._oswCommonWindows[windowId] = new Window_OswCommon(window);
        if (window.isBattle()) {
            this.addWindow(this._oswCommonWindows[windowId]);
        } else {
            this.addOswWindow(this._oswCommonWindows[windowId]);
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
        this.createAllCommonWindows($gameParty);
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
        this.updateCreateOswWindows($gameOswData);
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
        Window_Command.prototype.initialize.call(this, window._x, window._y);
        this._show = false;
        this.hide();
        this.deactivate();
        this.select(this._window._index);
        this.refresh();
    };

    Window_OswCommand.prototype.windowWidth = function() {
        return this._width;
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

    Window_OswCommand.prototype._refreshFrame = function() {
        if (this._window._frame) Window.prototype._refreshFrame.call(this);
    };

    Window_OswCommand.prototype.makeCommandList = function() {
        this._window._list.forEach( function(cmd) {
            var enabled = eval(this.convertEscapeCharacters(cmd.enabled));
            this.addCommand(cmd.name, cmd.symbol, enabled);
        },this);
        if(this._window.isOriginal()) this.addCommand(FTKR.OSW.command.cancel, 'cancel', true);
    };

    Window_OswCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        if (FTKR.OSW.command.excape) {
            var tw = this.convertTextWidth(this.commandName(index));
            var offset = this.convertAlign(align) * (rect.width - tw) / 2;
            this.drawTextEx(this.commandName(index), rect.x + offset, rect.y);
        } else {
            this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
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

    Window_OswCommand.prototype.update = function() {
        if (this._window._index !== this.index()) {
            this._window._index = this.index();
        }
        this.updateShow();
        this.updateActive();
        this.updateRefresh();
        Window_Command.prototype.update.call(this);
    };

    Window_OswCommand.prototype.updateShow = function() {
        if (this._show !== this._window._show) {
            this._show = this._window._show;
            if (this._show) {
                this.updatePlacement();
                this.show();
                this.refresh();
            } else {
                this.hide();
            }
        }
    };

    Window_OswCommand.prototype.updateActive = function() {
        if (this.active !== this._window._active) {
            if (this._window._active) {
                this.activate();
                this.select(this._window._index);
            } else {
                this.deactivate();
            }
        }
    };

    Window_OswCommand.prototype.updateRefresh = function() {
        if (this._window.requestRefresh()) {
            this.updatePlacement();
            this.refresh();
            this._window.clearRequestRefresh();
        }
    };

    Window_OswCommand.prototype.updatePlacement = function() {
        this.move(
            this._window._x,
            this._window._y,
            this._window._width,
            this._window._height
        );
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
        Window_Base.prototype.initialize.call(this, 
            window._x, window._y, window._width, window._height);
        this._show = false;
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

    Window_OswCommon.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateShow();
        this.updateRefresh();
    };

    Window_OswCommon.prototype.updateShow = function() {
        if (this._show !== this._window._show) {
            this._show = this._window._show;
            if (this._show) {
                this.updatePlacement();
                this.show();
                this.refresh();
            } else {
                this.hide();
            }
        }
    };

    Window_OswCommon.prototype.updateRefresh = function() {
        if (this._window.requestRefresh()) {
            this.updatePlacement();
            this.refresh();
            this._window.clearRequestRefresh();
        }
    };

    Window_OswCommon.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            this._actor = this._window._actor || this._actor;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawContent(0, 0, w, h);
        }
    };

    Window_OswCommon.prototype.drawContent = function(x, y, width, height) {
        if (Imported.FTKR_CSS) {
            this.drawCssActorStatus(0, this._actor, x, y, width, height,
                                    this._window.content());
        } else {
            this._window.texts().forEach( function(text, i){
                this.drawTextEx(text, x, y + this.lineHeight() * i);
            },this);
        }
    };

    Window_OswCommon.prototype.updatePlacement = function() {
        this.move(
            this._window._x,
            this._window._y,
            this._window._width,
            this._window._height
        );
    };

    Window_OswCommon.prototype._refreshFrame = function() {
        if (this._window._frame) Window.prototype._refreshFrame.call(this);
    };

}());//EOF
