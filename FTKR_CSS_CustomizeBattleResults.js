//=============================================================================
// カスタム可能な戦闘結果画面を表示するプラグイン
// FTKR_CSS_CustomizeBattleResults.js
// プラグインNo : 44
// 作成者     : フトコロ
// 作成日     : 2017/06/07
// 最終更新日 : 2018/12/13
// バージョン : v2.1.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CBR = true;

var FTKR = FTKR || {};
FTKR.CBR = FTKR.CBR || {};

//=============================================================================
/*:
 * @plugindesc v2.1.4 カスタム可能な戦闘結果画面を表示する
 * @author フトコロ
 *
 * @param --タイトル設定--
 * @default
 *
 * @param Title Text
 * @desc タイトルに表示する文章を設定します。制御文字が使えます。
 * @default 戦闘結果
 *
 * @param Title Text Position
 * @desc タイトル文章の表示位置をを設定します。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @type number
 * @default 1
 *
 * @param Title Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Title Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Title Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Title Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Title Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --共通戦績設定--
 * @default
 *
 * @param partyStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"text(%1)\",\"value\":\"入手経験値\",\"x\":\"0\",\"y\":\"0\",\"width\":\"390\"}","{\"text\":\"text(%1)\",\"value\":\"入手ゴールド\",\"x\":\"0\",\"y\":\"36\",\"width\":\"390\"}","{\"text\":\"eval(%1)\",\"value\":\"BattleManager._rewards.exp\",\"x\":\"390\",\"y\":\"0\",\"width\":\"390\"}","{\"text\":\"eval(%1)\",\"value\":\"BattleManager._rewards.gold\",\"x\":\"390\",\"y\":\"36\",\"width\":\"390\"}"]
 * 
 * @param Party Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @type number
 * @default 5
 * 
 * @param Party Visible Rows
 * @desc 共通戦績ウィンドウの縦の行数
 * @type number
 * @default 2
 *
 * @param Party Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Party Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Party Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Party Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Party Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --戦績コマンド設定--
 * @default
 *
 * @param Command Cursor Position
 * @desc カーソルの初期位置を設定します。
 * @type select
 * @option ステータス
 * @value 0
 * @option アイテム
 * @value 1
 * @option 終了
 * @value 2
 * @default 0
 * 
 * @param Enable Select Command
 * @desc 終了コマンド以外を選択できるようにするか設定します。
 * @type select
 * @option 選択不可(グレー表示)
 * @value 0
 * @option 選択不可(白表示)
 * @value 1
 * @option 選択可
 * @value 2
 * @default 2
 * 
 * @param Command Display Status
 * @desc アクターのステータスを表示するコマンド名を設定します。
 * @default ステータス
 * 
 * @param Command Display Item
 * @desc 入手したアイテムを表示するコマンド名を設定します。
 * @default アイテム
 * 
 * @param Command Finish
 * @desc 戦績画面を終了するコマンド名を設定します。
 * @default 終了
 * 
 * @param Command Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Command Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Command Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Command Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Command Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --アクター別戦績設定--
 * @default
 *
 * @param Displayed Members
 * @desc 画面に表示するメンバーを選択します。
 * テキスト入力でスクリプトを記述可能です。
 * @type select
 * @option バトルメンバー
 * @value 0
 * @option 全パーティーメンバー
 * @value 1
 * @default 0
 * 
 * @param actorStatusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"face(%1)\",\"value\":\"3\",\"x\":\"0\",\"y\":\"0\",\"width\":\"width/3\"}","{\"text\":\"name\",\"x\":\"width/3\",\"y\":\"0\",\"width\":\"width/3\"}","{\"text\":\"level\",\"x\":\"width*2/3\",\"y\":\"0\",\"width\":\"width/3\"}","{\"text\":\"gauge(%1)\",\"value\":\"0\",\"x\":\"width/3\",\"y\":\"line\",\"width\":\"width*2/3\"}","{\"text\":\"message\",\"value\":\"\",\"x\":\"width/3\",\"y\":\"line*2\",\"width\":\"width*2/3\"}"]
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @type number
 * @default 5
 * 
 * @param Actor Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 8
 * @type number
 * @default 9
 * 
 * @param Actor Max Cols
 * @desc アクターを横に並べる数：デフォルト 2
 * @type number
 * @default 2
 * 
 * @param Actor Cursor Lines
 * @desc カーソル高さの行数：デフォルト 4
 * @type number
 * @default 3
 * 
 * @param Actor Cursor Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @type number
 * @default 0
 * 
 * @param Actor Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Actor Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Actor Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Actor Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Actor Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --入手アイテム設定--
 * @default
 *
 * @param Enable Change Paint Opacity
 * @desc アイテムを入手しなかった場合に、グレー表示にして選択できないようにするか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 * 
 * @param Combine Same Items
 * @desc 同じアイテムを纏めて表示する
 * 0 - まとめない, 1 - まとめる
 * @type number
 * @default 0
 * 
 * @param Item Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 8
 * @type number
 * @default 8
 * 
 * @param Item Max Cols
 * @desc アイテムを横に並べる数：デフォルト 2
 * @type number
 * @default 2
 * 
 * @param Item Cursor Lines
 * @desc カーソル高さの行数：デフォルト 1
 * @type number
 * @default 1
 * 
 * @param Item Cursor Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @type number
 * @default 0
 * 
 * @param Item Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Item Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Item Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Item Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Item Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --CSSメッセージの設定--
 * @default
 * 
 * @param Display LevelUp Message
 * @desc レベルアップ時のメッセージを設定します。
 * %1 - アクター名, %2 - 現在レベル, %3 - 上昇したレベル
 * @default \C[17]%3 Level Up!
 * 
 * @param Display NewSkill Message
 * @desc レベルアップ時のスキル習得メッセージを設定します。
 * %1 - アクター名, %2 - 習得したスキル名, %3 - 習得したスキル数
 * @default \C[17]%3 New Skill!
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、戦闘終了時にカスタム可能な戦闘結果画面を
 * 表示します。
 * 
 * このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_CustomizeBattleResults.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    ↑このプラグインよりも上に登録↑
 * 
 *    FTKR_CSS_CustomizeBattleResults.js
 * 
 *    ↓このプラグインよりも下に登録↓
 *    FTKR_ExBattleEvent.js
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
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v2.1.4 - 2018/12/13 : プラグインパラメータstatusListの初期値変更
 * 
 * v2.1.3 - 2018/09/29 : 機能追加
 *    1. 戦績コマンドのカーソル初期値を設定する機能を追加。
 * 
 * v2.1.2 - 2018/09/29 : 機能追加
 *    1. プラグインパラメータのリストで選択できる項目を追加。
 * 
 * v2.1.1 - 2018/09/28 : 不具合修正
 *    1. 経験獲得率の値によっては、獲得経験値が正しく計算されない不具合を修正。
 * 
 * v2.1.0 - 2018/08/30 : 機能追加
 *    1. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。
 * 
 * v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更
 * 
 * v1.5.0 - 2018/08/04 : 機能追加
 *    1. バトルメンバー以外も画面に表示する機能を追加。
 * 
 * v1.4.3 - 2018/01/12 : 不具合修正、機能追加
 *    1. FTKR_ExBattleEventと組み合わせたときに、戦闘終了時イベント中に
 *       正しく戦績画面の処理が実行できない不具合を修正。
 *    2. 経験値のゲージが上昇している間に戦績画面を閉じると、ゲージが止まった
 *       時点までの経験値しか入手していなかった不具合を修正。
 *    3. 戦績画面で終了コマンドを実行するまで、戦闘終了時イベントの処理を
 *       止めるプラグインコマンドを追加。
 * 
 * v1.4.2 - 2017/11/26 : 機能変更
 *    1. アクターコマンドとアイテムコマンドを選択できないようにする機能を変更し
 *       白表示のまま選択できないようにする機能を追加。
 * 
 * v1.4.1 : 2017/11/26 : 機能追加
 *    1. アクターコマンドとアイテムコマンドを選択できないようにする機能を追加。
 * 
 * v1.4.0 - 2017/11/20 : 機能追加
 *    1. アイテムを入手しなかった場合に、アイテムコマンドをグレー表示にして
 *       選択できないようにする機能を追加。
 * 
 * v1.3.1 - 2017/11/18 : 不具合修正
 *    1. GraphicalDesignMode.jsのレイアウト変更が一部反映されない不具合を修正。
 * 
 * v1.3.0 - 2017/11/08 : 機能追加
 *    1. GraphicalDesignMode.jsとFTKR_CSS_GDM.jsにより、デザインモード中に
 *       ゲーム内でレイアウトを変更する機能を追加。
 * 
 * v1.2.0 - 2017/08/22 : 機能追加
 *    1. レベルアップ時のスキル習得状態を表示するメッセージコードを追加。
 * 
 * v1.1.0 - 2017/07/13 : 機能追加
 *    1. 同じアイテムを入手した場合にまとめて表示する機能を追加。
 * 
 * v1.0.2 - 2017/06/23 : 不具合修正
 *    1. 入手経験値が29以下の場合に、アクターが経験値を入手できない不具合を修正。
 *    2. 戦績画面タイトルの文字列の表示位置を修正。
 *    3. プラグインパラメータに@typeを適用
 * 
 * v1.0.1 - 2017/06/08 : 不要なプラグインパラメータを削除
 * 
 * v1.0.0 - 2017/06/07 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~status:
 * @param text
 * @desc 表示するステータスを選択
 * リストにない場合は、直接テキストで記述
 * @default 
 * @type select
 * @option 名前
 * @value name
 * @option 二つ名
 * @value nickname
 * @option 職業
 * @value class
 * @option レベル
 * @value level
 * @option HP
 * @value hp
 * @option MP
 * @value mp
 * @option TP
 * @value tp
 * @option 顔画像
 * @value face
 * @option 顔画像(サイズ指定)
 * @value face(%1)
 * @option 歩行キャラ画像
 * @value chara
 * @option SV戦闘キャラ画像
 * @value sv
 * @option ステート(横)
 * @value state
 * @option ステート(縦)
 * @value state2(%1)
 * @option プロフィール
 * @value profile
 * @option 通常能力値
 * @value param(%1)
 * @option 通常能力値(素)
 * @value pbase(%1)
 * @option 通常能力値(増加分)
 * @value pdiff(%1)
 * @option 装備
 * @value equip(%1)
 * @option 装備パラメータ
 * @value eparam(%1)
 * @option カスタムパラメータ
 * @value custom(%1)
 * @option カスタムゲージ
 * @value gauge(%1)
 * @option アクター別カスタムゲージ
 * @value agauge(%1)
 * @option クラス別カスタムゲージ
 * @value cgauge(%1)
 * @option カスタム画像
 * @value image
 * @option カスタム画像(登録ID)
 * @value image(%1)
 * @option メッセージ
 * @value message
 * @option テキスト
 * @value text(%1)
 * @option JS計算式(数値表示)
 * @value eval(%1)
 * @option JS計算式(文字列表示)
 * @value streval(%1)
 * @option 横線
 * @value line
 * @option AOP能力値
 * @value aop(%1)
 * @option AOP能力値(素)
 * @value aopbase(%1)
 * @option AOP能力値(増加分)
 * @value aopdiff(%1)
 * @option AOP装備パラメータ
 * @value eaop(%1)
 * @option アイテム名
 * @value iname
 * @option アイテムアイコン
 * @value iicon
 * @option アイテム説明
 * @value idesc
 * @option アイテムタイプ
 * @value itype
 * @option アイテム装備タイプ
 * @value ietype
 * @option アイテム範囲
 * @value iscope
 * @option アイテム属性
 * @value ielement
 * @option アイテム設定詳細
 * @value iparam(%1)
 * @option アイテムカスタム画像
 * @value iimage(%1)
 * @option マップ名
 * @value mapname
 *
 * @param value
 * @desc code(%1)の形式で設定するステータスの%1の内容を入力
 * @default 
 * 
 * @param x
 * @desc 表示するX座標
 * @default 0
 *
 * @param y
 * @desc 表示するY座標
 * @default 0
 *
 * @param width
 * @desc 表示する幅
 * @default 0
 *
 */

function Window_BattleResultParty() {
    this.initialize.apply(this, arguments);
}

function Window_BattleResultActor() {
    this.initialize.apply(this, arguments);
}

if (Imported.FTKR_CSS) (function() {

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
    var parameters = PluginManager.parameters('FTKR_CSS_CustomizeBattleResults');

    FTKR.CBR = {
        title:{
            text        :String(parameters['Title Text'] || ''),
            position    :Number(parameters['Title Text Position'] || 0),
            fontSize    :Number(parameters['Title Font Size'] || 0),
            padding     :Number(parameters['Title Padding'] || 0),
            lineHeight  :Number(parameters['Title Line Height'] || 0),
            opacity     :Number(parameters['Title Opacity'] || 0),
            hideFrame   :Number(parameters['Title Hide Frame'] || 0),
        },
        party:{
            statusList  :paramParse(parameters['partyStatusList']),
            visibleRows :Number(parameters['Party Visible Rows'] || 0),
            fontSize    :Number(parameters['Party Font Size'] || 0),
            padding     :Number(parameters['Party Padding'] || 0),
            lineHeight  :Number(parameters['Party Line Height'] || 0),
            opacity     :Number(parameters['Party Opacity'] || 0),
            hideFrame   :Number(parameters['Party Hide Frame'] || 0),
            spaceIn     :Number(parameters['Party Status Space In Text'] || 0),
        },
        command:{
            cursorPosi  :Number(paramParse(parameters['Command Cursor Position']) || 0),
            status      :String(parameters['Command Display Status'] || ''),
            item        :String(parameters['Command Display Item'] || ''),
            finish      :String(parameters['Command Finish'] || ''),
            fontSize    :Number(parameters['Command Font Size'] || 0),
            padding     :Number(parameters['Command Padding'] || 0),
            lineHeight  :Number(parameters['Command Line Height'] || 0),
            opacity     :Number(parameters['Command Opacity'] || 0),
            hideFrame   :Number(parameters['Command Hide Frame'] || 0),
            enable      :Number(parameters['Enable Select Command'] || 2),
        },
        actor:{
            enabled     :true,
            statusList  :paramParse(parameters['actorStatusList']),
            memberType  :paramParse(parameters['Displayed Members'] || 0),
            visibleRows :Number(parameters['Actor Visible Rows'] || 0),
            maxCols     :Number(parameters['Actor Max Cols'] || 0),
            fontSize    :Number(parameters['Actor Font Size'] || 0),
            padding     :Number(parameters['Actor Padding'] || 0),
            lineHeight  :Number(parameters['Actor Line Height'] || 0),
            opacity     :Number(parameters['Actor Opacity'] || 0),
            hideFrame   :Number(parameters['Actor Hide Frame'] || 0),
            cursorHeight:Number(parameters['Actor Cursor Lines'] || 0),
            hspace      :Number(parameters['Actor Cursor Height Space'] || 0),
            spaceIn     :Number(parameters['Actor Status Space In Text'] || 0),
        },
        item:{
            enabled     :true,
            changeOpacity:Number(parameters['Enable Change Paint Opacity'] || 0),
            visibleRows :Number(parameters['Item Visible Rows'] || 0),
            maxCols     :Number(parameters['Item Max Cols'] || 0),
            fontSize    :Number(parameters['Item Font Size'] || 0),
            padding     :Number(parameters['Item Padding'] || 0),
            lineHeight  :Number(parameters['Item Line Height'] || 0),
            opacity     :Number(parameters['Item Opacity'] || 0),
            hideFrame   :Number(parameters['Item Hide Frame'] || 0),
            cursorHeight:Number(parameters['Item Cursor Lines'] || 0),
            combine     :Number(parameters['Combine Same Items'] || 0),
        },
        message:{
            levelUp     :String(parameters['Display LevelUp Message'] || ''),
            newSkill    :String(parameters['Display NewSkill Message'] || ''),
        },
    };

    Scene_Battle.CBR_SPLIT_NUMBER = 30;
    Scene_Battle.CBR_COUNT_MAX    = 2;

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

    var textWidth = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.textWidth(text) : 0;
    };

    var convertTextWidth = function(text) {
        var tw = 0;
        text = convertEscapeCharacters(text);
        if (/\\i\[(\d+)\]/i.test(text)) {
            tw += Window_Base._iconWidth;
            text = (text.toUpperCase()).replace(/\\i\[(\d+)\]/ig, '');
        }
        if (/\\c\[(\d+)\]/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\c\[(\d+)\]/ig, '');
        }
        if (/\\{/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\{/ig, '');
        }
        if (/\\}/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\}/ig, '');
        }
        if (text.match(/\\lw\[(\d+),?([^\]]+)\]/i)) {
            tw += RegExp.$1;
            text = (text.toUpperCase()).replace(/\\lw\[(\d+),?([^\]]+)\]/ig, '');
        }
        tw += textWidth(text);
        return tw;
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _CBR_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _CBR_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/CBR_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '戦績画面表示':
            case 'SHOW_BATTLE_RESULT':
                BattleManager.showCBR();
                break;
            case '戦績画面終了待ち':
            case 'WAIT_BATTLE_RESULT_END':
                this.setWaitMode('battleResult');
                break;
        }
    };

    var _CBR_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = false;
        if (this._waitMode === 'battleResult' ) {
            waiting =  BattleManager.isCbrBattleResult();
            if (!waiting) {
                this._waitMode = '';
            }
            return waiting;
        }
        return _CBR_Game_Interpreter_updateWaitMode.call(this);
    };
  
    //=============================================================================
    // FTKR_CustomSimpleActorStatus.jsの修正
    //=============================================================================
    var _CBR_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'MESSAGE2':
                return this.drawCssActorMessageCBR(actor, x, y, width);
            default:
                return _CBR_Window_Base_drawCssActorStatusBase_B.call(this, index, actor, x, y, width, status, lss, css);
        }
    };

    // アクターの状態の変化に対するメッセージの表示関数
    Window_Base.prototype.drawCssActorMessageCBR = function(actor, x, y, width) {
        if (!actor._levelUpCount) return 1;
        var text = FTKR.CBR.message.levelUp.format(actor.name(), actor.level, actor._levelUpCount);
        if (actor._newSkills && actor._newSkills.length) {
            var newSkills= [];
            actor._newSkills.forEach(function(newSkill){
                if (newSkill) newSkills.push(newSkill.name);
            });
            skills = newSkills.join();
            var text2 = FTKR.CBR.message.newSkill.format(actor.name(), skills, actor._newSkills.length);
        }
        this.drawTextEx(text, x, y);
        if (text2) this.drawTextEx(text2, x, y + this.lineHeight());
        actor._levelUpMessage = true;
        return 2;
    };

    var _CBR_Game_Actor_findNewSkills = Game_Actor.prototype.findNewSkills;
    Game_Actor.prototype.findNewSkills = function(lastSkills) {
        if (!this._newSkills) this._newSkills = [];
        this._newSkills = this._newSkills.concat(_CBR_Game_Actor_findNewSkills.call(this, lastSkills));
        return this._newSkills;
    };

    var _CBR_Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        if ($gameParty) {
            $gameParty.members().forEach( function(actor){
                if (actor && actor._levelUpMessage) {
                    actor._newSkills = [];
                  }
            });
        }
        _CBR_Scene_Base_start.call(this);
    };

    //=============================================================================
    // バトルシーンに戦績画面表示を追加
    //BattleManager
    //=============================================================================

    var _CBR_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _CBR_BattleManager_initMembers.call(this);
        this._showBattleResultOk = false;
        this._cbrGainExps = [];
        this._cbrExps = [];
        this._cbrModExps = [];
        this._cbrSplitExps = [];
    }

    //書き換え
    BattleManager.processVictory = function() {
        this._showBattleResultOk = true;
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        this.showCBR();
        this.gainRewards();
        this.endBattle(0);
    };

    //書き換え
    BattleManager.gainExp = function() {
        this._cbrGainExp = this._rewards.exp;
        this._cbrCount = Scene_Battle.CBR_COUNT_MAX;
        var splitNum = Scene_Battle.CBR_SPLIT_NUMBER;
        $gameParty.allMembers().forEach(function(actor, i) {
            this._cbrExps[i] = 0;
            var gainExp = Math.round(this._cbrGainExp * actor.finalExpRate());
            this._cbrGainExps[i] = gainExp
            this._cbrSplitExps[i] = Math.floor(gainExp / splitNum);
            this._cbrModExps[i] = gainExp % splitNum;
        },this);
        this._rewards.exp = 0;
    };

    var _CBR_BattleManager_updateEvent = BattleManager.updateEvent;
    BattleManager.updateEvent = function() {
        if (BattleManager.isCbrBattleResult()) {
            this.updateExp(this._cbrGainExp);
            return true;
        }
        return _CBR_BattleManager_updateEvent.call(this);
    };

    BattleManager.updateExp = function(gainExp) {
        if (!gainExp) return;
        if (this._cbrCount < Scene_Battle.CBR_COUNT_MAX) {
            this._cbrCount += 1;
        } else {
            this._cbrCount = 0;
            $gameParty.allMembers().forEach(function(actor, i) {
                if (this._cbrExps[i] >= this._cbrGainExps[i]) return;
                var modexp = this._cbrModExps[i] ? 1 : 0;
                var exp = this._cbrSplitExps[i] + modexp;
                if (modexp) this._cbrModExps[i] -= 1;
                this._cbrExps[i] += exp;
                actor.gainExp(exp);
            },this);
            SceneManager._scene._battleResultActorWindow.refresh();
        }
    };

    BattleManager.cbrFinish = function() {
        this._showBattleResultOk = false;
        $gameParty.allMembers().forEach(function(actor, i) {
            var difExp = this._cbrGainExps[i] - this._cbrExps[i];
            if (difExp) {
                actor.gainExp(difExp);
            }
        },this);
        this._cbrGainExp = 0;
        this._cbrGainExps.length = 0;
    };

    BattleManager.showCBR = function() {
        this._showBattleResultOk = true;
        SceneManager._scene.showBattleResult(this._rewards);
    };

    BattleManager.isCbrBattleResult = function() {
        return this._showBattleResultOk;
    };

    //書き換え
    Scene_Battle.prototype.updateBattleProcess = function() {
        if (this.checkBattleProcessBusy()) {
            BattleManager.update();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.checkBattleProcessBusy = function() {
        return !this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd() || BattleManager.isCbrBattleResult();
    };

    //=============================================================================
    //Game_Actor
    //=============================================================================

    // 戦闘中のレベルアップメッセージを無効
    //書き換え
    var _CBR_Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if ($gameParty.inBattle()) return;
        _CBR_Game_Actor_displayLevelUp.call(this, newSkills);
    };

    //書き換え
    Game_Actor.prototype.gainExp = function(exp) {
        var newExp = this.currentExp() + Math.round(exp);
        this.changeExp(newExp, this.shouldDisplayLevelUp());
    };
    
    //=============================================================================
    // 戦績ウィンドウの追加
    //Scene_Battle
    //=============================================================================

    var _CBR_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        _CBR_Scene_Battle_initialize.call(this);
        this._cbrCount = 0;
        this._cbrExp = 0;
        this._cbrModExp = 0;
    };

    var _CBR_Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (_CBR_Scene_Battle_isAnyInputWindowActive.call(this) ||
            this.isCbrBusy());
    };

    Scene_Battle.prototype.isCbrBusy = function() {
        return (this._battleResultCommandWindow.active ||
            this._battleResultActorWindow.active ||
            this._battleResultItemWindow.active);
    };

    var _CBR_Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _CBR_Scene_Battle_create.call(this);
        this.createBattleResultTitle();
        this.createBattlePartyResult();
        this.createBattleResultCommand();
        this.createBattleActorResult();
        this.createBattleResultItem();
    };

    Scene_Battle.prototype.createBattleResultTitle = function() {
        var ww = Graphics.boxWidth;
        var wh = this._helpWindow.fittingHeight(1);
        this._battleResultTitleWindow = new Window_BattleResultTitle(0, 0, ww, wh);
        this._battleResultTitleWindow.hide();
        this.addWindow(this._battleResultTitleWindow);
    };

    Scene_Battle.prototype.createBattlePartyResult = function() {
        var wy = this._battleResultTitleWindow.height;
        var ww = Graphics.boxWidth;
        var wh = this._helpWindow.fittingHeight(FTKR.CBR.party.visibleRows);
        this._battleResultPartyWindow = new Window_BattleResultParty(0, wy, ww, wh);
        this._battleResultPartyWindow.hide();
        this.addWindow(this._battleResultPartyWindow);
    };

    Scene_Battle.prototype.createBattleResultCommand = function() {
        var wy = this._battleResultPartyWindow.y + this._battleResultPartyWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultCommandWindow = new Window_BattleResultCommand(0, wy, ww, wh);
        this._battleResultCommandWindow.setHandler('status', this.cbrStatus.bind(this));
        this._battleResultCommandWindow.setHandler('item',   this.cbrItem.bind(this));
        this._battleResultCommandWindow.setHandler('finish', this.cbrFinish.bind(this));
        this._battleResultCommandWindow.hide();
        this.addWindow(this._battleResultCommandWindow);
    };

    Scene_Battle.prototype.createBattleActorResult = function() {
        var wy = this._battleResultCommandWindow.y + this._battleResultCommandWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultActorWindow = new Window_BattleResultActor(0, wy, ww, wh);
        this._battleResultActorWindow.setHandler('cancel', this.onCBRActorCancel.bind(this));
        this._battleResultActorWindow.hide();
        this._battleResultCommandWindow.setActorWindow(this._battleResultActorWindow);
        this.addWindow(this._battleResultActorWindow);
    };

    Scene_Battle.prototype.createBattleResultItem = function() {
        var wy = this._battleResultCommandWindow.y + this._battleResultCommandWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultItemWindow = new Window_BattleResultItem(0, wy, ww, wh);
        this._battleResultItemWindow.setHandler('cancel', this.onCBRItemCancel.bind(this));
        this._battleResultItemWindow.hide();
        this._battleResultCommandWindow.setItemWindow(this._battleResultItemWindow);
        this.addWindow(this._battleResultItemWindow);
    };

    Scene_Battle.prototype.showBattleResult = function(rewards) {
        this._statusWindow.hide();
        this._battleResultTitleWindow.show();
        this._battleResultPartyWindow.show();
        this._battleResultPartyWindow.refresh();
        this._battleResultCommandWindow.setDropItem(rewards.items);
        this._battleResultCommandWindow.show();
        this._battleResultCommandWindow.activate();
        this._battleResultCommandWindow.select(FTKR.CBR.command.cursorPosi);
        this._battleResultActorWindow.show();
        this._battleResultActorWindow.refresh();
        this._battleResultItemWindow.setDropItem(rewards.items);
    };

    Scene_Battle.prototype.hideBattleResult = function() {
        this._battleResultTitleWindow.hide();
        this._battleResultPartyWindow.hide();
        this._battleResultCommandWindow.hide();
        this._battleResultActorWindow.hide();
        this._battleResultItemWindow.hide();
    };

    Scene_Battle.prototype.cbrStatus = function() {
        this._battleResultActorWindow.activate();
        this._battleResultActorWindow.select(0);
    };
    
    Scene_Battle.prototype.cbrItem = function() {
        this._battleResultItemWindow.activate();
        this._battleResultItemWindow.select(0);
    };
    
    Scene_Battle.prototype.cbrFinish = function() {
        this.hideBattleResult();
        BattleManager.cbrFinish();
    };

    Scene_Battle.prototype.onCBRActorCancel = function() {
        this._battleResultCommandWindow.activate();
        this._battleResultCommandWindow.select(0);
        this._battleResultActorWindow.deactivate();
        this._battleResultActorWindow.deselect();
    };

    Scene_Battle.prototype.onCBRItemCancel = function() {
        this._battleResultCommandWindow.activate();
        this._battleResultCommandWindow.select(1);
        this._battleResultItemWindow.deactivate();
        this._battleResultItemWindow.deselect();
    };

    //=============================================================================
    // 戦績タイトルウィンドウクラス
    //Window_BattleResultTitle
    //=============================================================================

    function Window_BattleResultTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultTitle.prototype = Object.create(Window_Base.prototype);
    Window_BattleResultTitle.prototype.constructor = Window_BattleResultTitle;

    Window_BattleResultTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_BattleResultTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTitle();
    };

    Window_BattleResultTitle.prototype.standardCssLayout = function() {
        return FTKR.CBR.title;
    };

    Window_BattleResultTitle.prototype.drawTitle = function() {
        var textWidth = convertTextWidth(FTKR.CBR.title.text);
        var x = FTKR.CBR.title.position * (this.width - textWidth) / 2;
        this.drawTextEx(FTKR.CBR.title.text, x, 0);
    };

    //=============================================================================
    // 共通戦績結果ウィンドウクラス
    //Window_BattleResultParty
    //=============================================================================

    Window_BattleResultParty.prototype = Object.create(Window_Base.prototype);
    Window_BattleResultParty.prototype.constructor = Window_BattleResultParty;

    Window_BattleResultParty.prototype.standardCssStatus = function() {
        return FTKR.CBR.party;
    };
      
    Window_BattleResultTitle.prototype.standardCssLayout = function() {
        return FTKR.CBR.party;
    };

    Window_BattleResultParty.prototype.refresh = function() {
        this.contents.clear();
        var lss = this._lssStatus;
        var actor = $gameParty.members()[0];
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        this.drawCssActorStatus(0, actor, 0, 0, w, h, lss);
    };

    //=============================================================================
    // 戦績結果コマンドウィンドウクラス
    //Window_BattleResultCommand
    //=============================================================================

    function Window_BattleResultCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_BattleResultCommand.prototype.constructor = Window_BattleResultCommand;

    Window_BattleResultCommand.prototype.initialize = function(x, y, width) {
        this._windowWidth = width;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this._symbol = 'status';
        this._items = [];
        this.deactivate();
    };

    Window_BattleResultCommand.prototype.windowWidth = function() {
        return this._windowWidth;
    };

    Window_BattleResultCommand.prototype.maxCols = function() {
        return 3;
    };

    Window_BattleResultCommand.prototype.standardCssLayout = function() {
        return FTKR.CBR.command;
    };

    Window_BattleResultCommand.prototype.makeCommandList = function() {
        this.addCommand(FTKR.CBR.command.status, 'status', this.canSelectActor());
        this.addCommand(FTKR.CBR.command.item,   'item'   ,this.canSelectItem());
        this.addCommand(FTKR.CBR.command.finish, 'finish');
    };

    Window_BattleResultCommand.prototype.canSelectActor = function() {
        return FTKR.CBR.command.enable !== 0;
    };

    Window_BattleResultCommand.prototype.canSelectItem = function() {
        return FTKR.CBR.command.enable !== 0 && this.isGotItems();
    };

    Window_BattleResultCommand.prototype.isGotItems = function() {
        var flag = FTKR.CBR.item.changeOpacity;
        return !flag ? true : this._items && this._items.length > 0;
    };

    Window_BattleResultCommand.prototype.isCurrentItemEnabled = function() {
        return (Window_Command.prototype.isCurrentItemEnabled.call(this) &&
            FTKR.CBR.command.enable === 2) || this.currentSymbol() === 'finish';
    };

    Window_BattleResultCommand.prototype.setDropItem = function(items) {
        this._items = items;
        this.refresh();
    };

    Window_BattleResultCommand.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (BattleManager._showBattleResultOk && this._symbol !== this.currentSymbol()) {
            this._symbol = this.currentSymbol();
            if (!this._battleResultActorWindow || !this._battleResultItemWindow) return;
            switch (this._symbol) {
                case 'status':
                    this._battleResultActorWindow.show();
                    this._battleResultItemWindow.hide();
                    break;
                case 'item':
                    this._battleResultActorWindow.hide();
                    this._battleResultItemWindow.show();
                    break;
                case 'finish':
                    break;
            }
        }
    };

    Window_BattleResultCommand.prototype.setActorWindow = function(window) {
        this._battleResultActorWindow = window;
    };

    Window_BattleResultCommand.prototype.setItemWindow = function(window) {
        this._battleResultItemWindow = window;
    };
    
    //=============================================================================
    // 個別戦績結果ウィンドウクラス
    //Window_BattleResultActor
    //=============================================================================

    Window_BattleResultActor.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleResultActor.prototype.constructor = Window_BattleResultActor;

    Window_BattleResultActor.prototype.standardCssStatus = function() {
        return FTKR.CBR.actor;
    };
      
    Window_BattleResultActor.prototype.standardCssLayout = function() {
        return FTKR.CBR.actor;
    };

    Window_BattleResultActor.prototype.displayMembers = function() {
        switch(FTKR.CBR.actor.memberType) {
            case 0:
                return $gameParty.battleMembers();
            case 1:
                return $gameParty.allMembers();
            default:
                return eval(FTKR.CBR.actor.memberType);
        }
    };

    Window_BattleResultActor.prototype.maxItems = function() {
        return this.displayMembers().length;
    };

    Window_BattleResultActor.prototype.drawItem = function(index) {
        var lss = this._lssStatus;
        var actor = this.displayMembers()[index];
        var rect = this.itemRect(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };

    //ウィンドウに横に並べるアクターの表示間隔
    //ステータスレイアウト側で変更できるのでここでは 0 とする。
    Window_BattleResultActor.prototype.spacing = function() {
        return 0;
    };

    //カーソルの高さ
    Window_BattleResultActor.prototype.itemHeight = function() {
        return this.lineHeight() * this.cursorHeight();
    };
    
    //=============================================================================
    // アイテム報酬ウィンドウクラス
    //Window_BattleResultItem
    //=============================================================================

    function Window_BattleResultItem() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultItem.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleResultItem.prototype.constructor = Window_BattleResultItem;

    Window_BattleResultItem.prototype.initialize = function(wx, wy, ww, wh) {
        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
        this._datas = [];
    };

    Window_BattleResultItem.prototype.standardCssLayout = function() {
        return FTKR.CBR.item;
    };

    Window_BattleResultItem.prototype.setDropItem = function(items) {
        this._datas = items.map(function(item){
            return {item:item, number:1};
        });
        if (FTKR.CBR.item.combine) this.combineItems();
        this.refresh();
    };

    Window_BattleResultItem.prototype.combineItems = function() {
        var count = this._datas.length;
        var i = 0;
        while(count >= i) {
            for (var n = i + 1; n < count;) {
                if (this._datas[n] && this._datas[i].item === this._datas[n].item) {
                    this._datas[i].number += this._datas[n].number;
                    this._datas.splice(n, 1);
                    count--;
                } else {
                    n++;
                }
            }
            i++;
        }
    };

    Window_BattleResultItem.prototype.maxItems = function() {
        return this._datas ? this._datas.length : 0;
    };

    Window_BattleResultItem.prototype.drawItem = function(index) {
        if (!this._datas) return;
        var data = this._datas[index];
        if (data) {
            var numberWidth = this.textWidth('000');
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.drawItemName(data.item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(data.number, rect.x, rect.y, rect.width);
        }
    };

    Window_BattleResultItem.prototype.needsNumber = function() {
        return true;
    };

    Window_BattleResultItem.prototype.drawItemNumber = function(number, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText(number, x, y, width, 'right');
        }
    };

    //カーソルの高さ
    Window_BattleResultItem.prototype.itemHeight = function() {
        return this.lineHeight() * this.cursorHeight();
    };

    //ウィンドウに横に並べるアクターの表示間隔
    //ステータスレイアウト側で変更できるのでここでは 0 とする。
    Window_BattleResultItem.prototype.spacing = function() {
        return 0;
    };
    
}());//FTKR_CustomizeBattleResults.js END
