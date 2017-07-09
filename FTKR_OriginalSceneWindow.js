//=============================================================================
// オリジナルのシーンやウィンドウを作成するプラグイン
// FTKR_OriginalSceneWindow.js
// 作成者     : フトコロ
// 作成日     : 2017/06/17
// 最終更新日 : 2017/07/09
// バージョン : v1.3.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_OSW = true;

var FTKR = FTKR || {};
FTKR.OSW = FTKR.OSW || {};

//=============================================================================
/*:
 * @plugindesc v1.3.0 オリジナルのシーンやウィンドウを作成する
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
 * @type number
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
 * @type number
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
 * 
 * @param Command Number In Original
 * @desc オリジナルシーンのコマンドウィンドウ生成数を設定します。
 * @type number
 * @default 
 * 
 * @param Command Number In Map
 * @desc マップシーンのコマンドウィンドウ生成数を設定します。
 * @type number
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
 * @type number
 * @default 
 * 
 * @param Common Number In Map
 * @desc マップシーンのコモンウィンドウ生成数を設定します。
 * @type number
 * @default 
 * 
 * @param Common Number In Battle
 * @desc バトルシーンのコモンウィンドウ生成数を設定します。
 * @type number
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
 * @param Select Number In Original
 * @desc オリジナルシーンのセレクトウィンドウ生成数を設定します。
 * @type number
 * @default 
 * 
 * @param Select Number In Map
 * @desc マップシーンのセレクトウィンドウ生成数を設定します。
 * @type number
 * @default 
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
 *   3. セレクトウィンドウ - さまざまな文字列や数値、画像などをリストに表示(*1)
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
 * ウィンドウを追加する場合は、以降の設定方法に従い
 * オリジナルシーンの設定を行ってください。
 * 
 * オリジナルシーンでは、コモンイベントの呼び出しが可能です。
 * ただし、文章を表示するタイプのイベントコマンドや、
 * アニメーション、ピクチャ表示のイベントコマンドなど
 * 使用できないイベントコマンドがあります。
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
 *        :width に 0 を入力すると、幅は変えずに高さだけ設定します。
 *        :コマンドを追加した場合は、サイズの再設定を行ってください。
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
 *        :
 *        :[実行条件]
 *        : true と入力すると、常にコマンドを実行できます。
 *        : JS計算式を入力すると、実行条件を動的に変えることができます。
 *        :
 *        :[メソッド]の入力例
 *        :  シーン終了
 *        :  END_SCENE
 *        :    :コマンドを実行すると、シーンを終了します。
 *        :    :オリジナルシーンからマップシーンに戻すときに使います。
 *        :    :このコマンドをオリジナルシーン以外で使わないでください。
 *        :
 *        :  シーン変更(scene)
 *        :  CHANGE_SCENE(scene)
 *        :    :コマンドを実行すると、scene で指定したシーンを表示します。
 *        :    :  sceneの例)
 *        :    :    Scene_Item  - アイテムシーン
 *        :    :    Scene_Skill - スキルシーン
 *        :
 *        :  コモンイベント(イベントId)
 *        :  COMMON_EVENT(eventId)
 *        :    :コマンドを実行すると、イベントID で指定した
 *        :    :コモンイベント実行します。
 *        :    :なお実行するコモンイベントは、最後に以下のプラグインコマンドを
 *        :    :実行してください。
 *        :    :  OSW_コマンドウィンドウ設定 [シーン名] アクティブ ON
 *        :
 *        :  ウィンドウアクティブ([ウィンドウタイプ],[ウィンドウID],[非表示化])
 *        :  WINDOW_ACTIVE([windowType],[windowId],[hideOn])
 *        :    :コマンドを実行すると、指定したウィンドウにアクティブ状態が移ります。
 *        :    :[ウィンドウタイプ] には以下を指定してください。 
 *        :    :    コマンド or COMMAND
 *        :    :    セレクト or SELECT
 *        :    :[非表示化]には、以下を指定してください。
 *        :    :    true  - コマンド選択後にウィンドウを非表示にします。
 *        :    :    false - コマンド選択後にウィンドウを表示したままにします。
 *        :
 *        :どのメソッドに限らずにコマンドを実行すると
 *        :選択したコマンドの番号(先頭が0番)を記録します。
 *        :記録した番号は、以下のスクリプトで取得できます。
 *        :   オリジナルシーンの場合 - $gameOswData._oswIndex
 *        :   マップシーンの場合　　 - $gameMap._oswIndex
 * 
 *    カーソル残す [ON or OFF]
 *    LEAVE_CURSOR
 *        :アクティブOFFにした時に、カーソルを残すかどうか設定します。
 *        :アクティブ設定よりも前に設定してください。
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
 *    アクター [アクターID]
 *    ACTOR [actorId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターを指定します。
 *        :アクターIDには、\V[x]でゲーム内変数を使用できます。
 * 
 *    パーティー [メンバーID]
 *    PARTY [memberId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターを指定します。
 *        :メンバーIDは、先頭を0番としたパーティー内の並び順です。
 *        :メンバーIDには、\V[x]でゲーム内変数を使用できます。
 * 
 *    セレクト参照 [セレクトウィンドウID]
 *    REFERENCE_SELECT [selectWindowId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターとデータを
 *        :指定したセレクトウィンドウから参照します。
 *        :この設定が有る場合、セレクトウィンドウのカーソル操作に連動して
 *        :コモンウィンドウの表示を更新します。
 * 
 *    テキスト初期化
 *    CLEAR_TEXT
 *        :設定したテキストをすべて初期化します。
 *    
 *    テキスト [行数] [表示する文字列]
 *    TEXT [line] [displayText]
 *        :ウィンドウに表示する文字列を設定します。
 *        :行数で、文字列を何行目(最上段を0とする)に表示するか指定します。
 *        :制御文字を使用できます。
 *        :FTKR_CustomSimpleActorStatus.js と組み合わせている場合には
 *        :この記述は使用できません。
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
 * セレクトウィンドウの設定
 *-----------------------------------------------------------------------------
 * セレクトウィンドウの生成数はプラグインパラメータで設定します。
 * 
 * Select Number In Original
 *    :オリジナルシーンでの生成数
 * 
 * Select Number In Map
 *    :マップシーンでの生成数
 * 
 * 
 * セレクトウィンドウの設定は、以下のプラグインセレクトで行います。
 * 
 * OSW_セレクトウィンドウ設定 [シーン名] [ウィンドウID] [設定内容]
 * OSW_SET_SELECT_WINDOW [scene] [windowId] [setting]
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
 *    サイズ [width] [height]
 *    SIZE [width] [height]
 *        :ウィンドウのサイズを pixel単位 で指定します。
 *        :width に -1 を入力すると、画面の幅に合わせます。
 *        :height に -1 を入力すると、画面の高さに合わせます。
 * 
 *    最大列数 [value]
 *    MAX_COLS [value]
 *        :セレクトを横に並べる数を設定します。
 *        :デフォルトは１です。
 * 
 *    カーソル高さ [value]
 *    CURSOR_HEIGHT [value]
 *        :カーソルの高さ(行数)を設定します。
 *        :デフォルトは１です。
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
 *    アクター [アクターID]
 *    ACTOR [actorId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターを指定します。
 *        :アクターIDには、\V[x]でゲーム内変数を使用できます。
 * 
 *    パーティー [メンバーID]
 *    PARTY [memberId]
 *        :ウィンドウ内で表示するパラメータの参照元のアクターを指定します。
 *        :メンバーIDは、先頭を0番としたパーティー内の並び順です。
 *        :メンバーIDには、\V[x]でゲーム内変数を使用できます。
 * 
 *    リスト初期化
 *    CLEAR_LIST
 *        :設定したリストをすべて初期化します。
 *    
 *    リスト設定 [設定内容]
 *    SET_LIST [setting]
 *        :表示リストを設定します。
 *        :
 *        :テキスト [リスト1,リスト2,...]
 *        :TEXT [list1,list2,...]
 *        :   リストの表示名を直接設定します。
 *        :   カンマで区切って入力してください。
 *        :
 *        :パーティー [メンバー]
 *        :PARTY [MEMBER]
 *        :   リストをパーティーメンバーの人数分に設定します。
 *        :   別途、内容コマンドで表示するステータスを設定します。
 *        :   [メンバー]には以下を指定します。
 *        :     全メンバー　　 or ALL_MENBAR
 *        :          - パーティー全員をリストに設定します。
 *        :     バトルメンバー or BATTLE_MENBAR
 *        :          - バトルメンバーをリストに設定します。
 *        :     控えメンバー　 or RESERVE_MENBAR
 *        :          - 戦闘に参加しないパーティーメンバーをリストに設定します。
 *        :
 *        :アクター [条件式]
 *        :ACTOR [enable]
 *        :   リストをデータベースのアクターに設定します。
 *        :
 *        :職業 [条件式]
 *        :CLASS [enable]
 *        :   リストをデータベースの職業に設定します。
 *        :
 *        :スキル [条件式]
 *        :SKILL [enable]
 *        :   リストをデータベースのスキルに設定します。
 *        :
 *        :アイテム [条件式]
 *        :ITEM [enable]
 *        :   リストをデータベースのアイテムに設定します。
 *        :
 *        :武器 [条件式]
 *        :WEAPON [enable]
 *        :   リストをデータベースの武器に設定します。
 *        :
 *        :防具[条件式]
 *        :ARMOR [enable]
 *        :   リストをデータベースの防具に設定します。
 *        :
 *        :敵キャラ [条件式]
 *        :ENEMY [enable]
 *        :   リストをデータベースの敵キャラに設定します。
 *        :
 *        :敵グループ [条件式]
 *        :TROOP [enable]
 *        :   リストをデータベースの敵グループに設定します。
 *        :
 *        :[条件式]にJS計算式記述の表示条件を設定します。
 *        : item で対象のデータを参照できます。(例: item.id = 対象のID)
 *        :なお、名前が設定されていないデータは表示しません。
 *        :条件式を設定しない場合は、名前が設定されているすべてのデータを表示します。
 * 
 *    リスト実行設定 [実行タイプ] [メソッド]
 *    SET_LIST_ACTION [action_type] [method]
 *        :セレクトウィンドウ上での実行操作の結果を設定します。
 *        :
 *        :[実行タイプ]には以下を指定します。
 *        :   決定 or OK - リストを選択したときの処理
 *        :   キャンセル or CANCEL - キャンセルボタンを押したときの処理
 *        :
 *        :[メソッド]は、コマンドウィンドウのメソッドと仕様は同じです。
 *        :
 *        :また、どのメソッドに限らずにリストを実行すると
 *        :選択したリストの番号(先頭が0番)を記録します。
 *        :記録した番号は、以下のスクリプトで取得できます。
 *        :   オリジナルシーンの場合 - $gameOswData._oswIndex
 *        :   マップシーンの場合　　 - $gameMap._oswIndex
 * 
 * 
 *    内容 [表示内容]
 *    CONTENT [contentSetting]
 *        :FTKR_CustomSimpleActorStatus.js と組み合わせている場合に
 *        :使用可能な記述です。
 *        :[表示内容]の記述は、コモンウィンドウと同じです。
 * 
 *    カーソル残す [ON or OFF]
 *    LEAVE_CURSOR
 *        :アクティブOFFにした時に、カーソルを残すかどうか設定します。
 *        :アクティブ設定よりも前に設定してください。
 * 
 *    アクティブ [ON or OFF]
 *    ACTIVE [ON or OFF
 *        :セレクトウィンドウを選択可能な状態にするかどうか設定します。
 *        :複数のセレクトウィンドウを表示させる場合には、
 *        :アクティブをONにするウィンドウは一つだけにしてください。
 * 
 *    表示 [ON or OFF]
 *    SHOW [ON or OFF]
 *        :ウィンドウの表示のON/OFFを切り替えます。
 *        :表示をONに切り替える時に、更新を行います。
 *        :基本的に最後に設定してください。
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
            number:{
                original  :Number(parameters['Command Number In Original'] || 0),
                map       :Number(parameters['Command Number In Map'] || 0),
            },
        },
        common:{
            width         :Number(parameters['Common Width'] || 240),
            height        :Number(parameters['Common Height'] || 240),
            content:{
                space     :String(parameters['Actor Status Space'] || '0,0,0,0'),
                spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
                widthRate :String(parameters['Actor Status Width Rate'] || '1,0,0'),
            },
            number:{
                original  :Number(parameters['Common Number In Original'] || 0),
                map       :Number(parameters['Common Number In Map'] || 0),
                battle    :Number(parameters['Common Number In Battle'] || 0),
            },
        },
        select:{
            width         :Number(parameters['Select Width'] || -1),
            height        :Number(parameters['Select Height'] || 240),
            maxCols       :Number(parameters['Select Max Cols'] || 1),
            cursorHeight  :Number(parameters['Select Cursor Height'] || 1),
            number:{
                original  :Number(parameters['Select Number In Original'] || 0),
                map       :Number(parameters['Select Number In Map'] || 0),
            },
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
                return  $gameMap;
            case 'バトル':
            case 'BATTLE':
                return  $gameParty;
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
                    i += this.setOswContentArgs(window, i + 1, args);
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
        var method = this.setOswMethod(args[i+3]);
        window.addCommand(name, symbol, enabled, null, method);
        return 4;
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

    Game_Interpreter.prototype.setOswSelectArgs = function(window, i, args) {
        var method = this.setOswMethod(args[i+1]);
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

    Game_OswBase.prototype.initialize = function(scene) {
        var basic = FTKR.OSW.basic;
        this._scene = scene;
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

    //=============================================================================
    // Game_OswSelectable
    // セレクトウィンドウ設定用データクラス
    //=============================================================================

    Game_OswSelectable.prototype = Object.create(Game_OswBase.prototype);
    Game_OswSelectable.prototype.constructor = Game_OswSelectable;

    Game_OswSelectable.prototype.initialize = function(scene) {
        Game_OswBase.prototype.initialize.call(this, scene);
        var select = FTKR.OSW.select;
        var content = select.content;
        this._drawType = 0;
        this.clearList();
        this.setOkAction(false, false, null, null, null);
        this.setCancelAction(false, false, null, null);
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

    Game_OswCommand.prototype.initialize = function(scene) {
        Game_OswBase.prototype.initialize.call(this, scene);
        var cmd = FTKR.OSW.command;
        this.clearList();
        this.setTextAlign(cmd.align);
        this.setMaxCols(cmd.maxCols);
        this.setPosition(cmd.x, cmd.y);
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

    //=============================================================================
    // Game_OswCommon
    // コモンウィンドウ設定用データクラス
    //=============================================================================

    Game_OswCommon.prototype = Object.create(Game_OswBase.prototype);
    Game_OswCommon.prototype.constructor = Game_OswCommon;

    Game_OswCommon.prototype.initialize = function(scene) {
        Game_OswBase.prototype.initialize.call(this, scene);
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
        this.initCommandWindows();
        this.initCommonWindows();
        this.initSelectWindows();
    };

    Game_Map.prototype.addOswList = function(type, id) {
        if (!this._oswList) this._oswList = [];
        if (type === Game_OswBase.WINDOW_COMMAND && id >= this.commandWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_COMMON && id >= this.commonWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_SELECTABLE && id >= this.selectWindowNumber()) return;
        this._oswList.push({type:type, id:id, creative:false});
    };

    Game_Map.prototype.initCommandWindows = function() {
        this._oswCommandWindows = [];
        for (var i = 0; i < this.commandWindowNumber(); i++) {
            this._oswCommandWindows[i] = new Game_OswCommand(Game_OswBase.SCENE_MAP);
        }
    };

    Game_Map.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(Game_OswBase.SCENE_MAP);
        }
    };

    Game_Map.prototype.initSelectWindows = function() {
        this._oswSelectWindows = [];
        for (var i = 0; i < this.selectWindowNumber(); i++) {
            this._oswSelectWindows[i] = new Game_OswSelectable(Game_OswBase.SCENE_MAP);
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

    Game_Map.prototype.commandWindowNumber = function() {
        return FTKR.OSW.command.number.map;
    };

    Game_Map.prototype.selectWindowNumber = function() {
        return FTKR.OSW.select.number.map;
    };

    Game_Map.prototype.commonWindowNumber = function() {
        return FTKR.OSW.common.number.map;
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
        this.initCommonWindows();
    };

    Game_Party.prototype.addOswList = function(id) {
        if (!this._oswList) this._oswList = [];
        this._oswList.push({type:Game_OswBase.WINDOW_COMMON, id:id, creative:false});
    };

    Game_Party.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(Game_OswBase.SCENE_BATTLE);
            this._oswCommonWindows[i].createWindow();
            this.addOswList(i);
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
        this._interpreter = new Game_Interpreter();
        this._oswIndex = -1;
        this._active = false;
        this._oswList = [];
        this.initCommandWindows();
        this.initCommonWindows();
        this.initSelectWindows();
    };

    Game_OswScene.prototype.addOswList = function(type, id) {
        if (!this._oswList) this._oswList = [];
        if (type === Game_OswBase.WINDOW_COMMAND && id >= this.commandWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_COMMON && id >= this.commonWindowNumber()) return;
        if (type === Game_OswBase.WINDOW_SELECTABLE && id >= this.selectWindowNumber()) return;
        this._oswList.push({type:type, id:id, creative:false});
    };

    Game_OswScene.prototype.initCommandWindows = function() {
        this._oswCommandWindows = [];
        for (var i = 0; i < this.commandWindowNumber(); i++) {
            this._oswCommandWindows[i] = new Game_OswCommand(Game_OswBase.SCENE_ORIGINAL);
        }
    };

    Game_OswScene.prototype.initCommonWindows = function() {
        this._oswCommonWindows = [];
        for (var i = 0; i < this.commonWindowNumber(); i++) {
            this._oswCommonWindows[i] = new Game_OswCommon(Game_OswBase.SCENE_ORIGINAL);
        }
    };

    Game_OswScene.prototype.initSelectWindows = function() {
        this._oswSelectWindows = [];
        for (var i = 0; i < this.selectWindowNumber(); i++) {
            this._oswSelectWindows[i] = new Game_OswSelectable(Game_OswBase.SCENE_ORIGINAL);
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

    Game_OswScene.prototype.commandWindowNumber = function() {
        return FTKR.OSW.command.number.original;
    };

    Game_OswScene.prototype.commonWindowNumber = function() {
        return FTKR.OSW.common.number.original;
    };

    Game_OswScene.prototype.selectWindowNumber = function() {
        return FTKR.OSW.select.number.original;
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
        gameWindow._list.forEach(function(cmd) {
            var method = eval(cmd.method);
            window.setHandler(cmd.symbol, method);
        },this);
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
        window.setHandler('ok', eval(gameWindow._ok.method));
        window.setHandler('cancel', eval(gameWindow._cancel.method));
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

    //=============================================================================
    // Window_Base
    // 共通処理を追加
    //=============================================================================

    Window_Base.prototype.updateOswShow = function() {
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
        if ($gameOswData._active && $gameOswData._oswIndex !== this.index()) {
            $gameOswData._oswIndex = this.index();
            $gameOswData._oswItem = this.item(this.index());
        } else if (!$gameOswData._active && $gameMap._oswIndex !== this.index()) {
            $gameMap._oswIndex = this.index();
            $gameMap._oswItem = this.item(this.index());
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

    Window_OswSelect.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_OswSelect.prototype.item = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_OswSelect.prototype.isEnabled = function(item) {
        FTKR.setGameData(this._window._actor, null, item);
        return FTKR.evalFormula(this._window._enable);
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
                return this.item(index) ? new Game_Actor(this.item(index).id) : null;
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
