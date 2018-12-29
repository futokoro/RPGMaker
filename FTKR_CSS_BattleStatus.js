//=============================================================================
// バトル画面のステータス表示を変更するプラグイン
// FTKR_CSS_BattleStatus.js
// プラグインNo : 16
// 作成者     : フトコロ
// 作成日     : 2017/04/11
// 最終更新日 : 2018/12/29
// バージョン : v2.2.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_BS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.BS = FTKR.CSS.BS || {};

//=============================================================================
/*:
 * @plugindesc v2.2.0 バトル画面のステータス表示を変更するプラグイン
 * @author フトコロ
 * 
 * @param Enabled Save WindowLayout
 * @desc ウィンドウ設定データをセーブできるようにする。
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * 
 * @param --バトルパーティー設定--
 * @desc 
 * 
 * @param Max Battle Members
 * @desc バトルに参加する最大人数を設定します。
 * 0 - この機能を無効にします
 * @default 0
 * 
 * @param --レイアウト設定--
 * @desc 
 * 
 * @param statusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"name\",\"x\":\"0\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"156\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"[hp/mp]\",\"value\":\"\",\"x\":\"312\",\"y\":\"0\",\"width\":\"width - 312\"}"]
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --ウィンドウ設定--
 * @desc 
 * 
 * @param Enabled Custom Window
 * @desc ウィンドウのレイアウト変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 0
 * 
 * @param Number Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 4
 * @default 4
 * 
 * @param Number Max Cols
 * @desc アクターを横に並べる数：デフォルト 1
 * @default 1
 * 
 * @param Cursol Line Number
 * @desc カーソル高さの行数：デフォルト 1
 * @default 1
 * 
 * @param Cursol Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @default 0
 * 
 * @param Font Size
 * @desc フォントサイズ：デフォルト 28
 * @default 28
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @default 18
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @default 36
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @default 192
 * 
 * @param Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @param --アクターの位置設定--
 * @desc 
 * 
 * @param Enable Custom Position
 * @desc アクターの位置変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 0
 * 
 * @param Max Number of Vertical
 * @desc アクターを縦に並べる最大数
 * @default 4
 * 
 * @param Center Position X
 * @desc 前列の中心のX座標
 * @default 600
 *
 * @param Center Position Y
 * @desc 前列の中心のY座標
 * @default 312
 *
 * @param Diff Position X
 * @desc 横方向のアクターの間隔
 * @default 32
 *
 * @param Diff Position Y
 * @desc 縦方向のアクターの間隔
 * @default 48
 * 
 * @param Diff Column
 * @desc 横方向の列の間隔
 * @default 96
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、バトル画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_BattleStatus.ja.md
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
 *    FTKR_CSS_BattleStatus.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターのバトルステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、バトル画面で表示する
 * ステータスの表示レイアウトを変更することができます。
 * 
 * 各パラメータの意味と、設定方法は、
 * FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。
 * 
 * なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
 * 設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。
 * 
 * 
 *-----------------------------------------------------------------------------
 * バトルステータスウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enabled Custom Window>
 *    :バトル画面のウィンドウ変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Number Visible Rows>
 *    :ステータスウィンドウの縦の行数を変更します。
 *    :デフォルトは4行です。
 *    :この値を変えても、コマンドウィンドウのサイズは変わりません。
 * 
 * <Number Max Cols>
 *    :ウィンドウ内でアクターを横に並べる数を変更します。
 *    :デフォルトは 1 です。
 * 
 * <Cursol Line Number>
 *    :カーソルの高さを何行分にするか設定します。
 *    :デフォルトは 1 です。
 * 
 * <Cursol Height Space>
 *    :縦のカーソル間隔を設定します。
 *    :デフォルトは 0 です。(単位はpixel)
 * 
 * <Font Size>
 *    :ウィンドウ内のフォントサイズを変更します。
 *    :デフォルトは 28 です。(単位はpixel)
 * 
 * <Window Padding>
 *    :ウィンドウの周囲の余白を変更します。
 *    :デフォルトは 18 です。(単位はpixel)
 * 
 * <Window Line Height>
 *    :ウィンドウ内の1行の高さを変更します。
 *    :デフォルトは 36 です。(単位はpixel)
 * 
 * <Window Opacity>
 *    :ウィンドウ内の背景の透明度を変更します。
 *    :デフォルトは 192 です。
 *    :0 - 透明、255 - 不透明
 * 
 * <Hide Window Frame>
 *    :ウィンドウ枠を非表示にするか指定します。
 *    :1 - 非表示にする、0 - 表示する
 *    :デフォルトは表示します。
 * 
 * 
 * ＜ウィンドウの高さ＞
 * ウィンドウの高さは、以下の計算式で算出します。
 *    [ウィンドウ高さ] ＝ [縦の行数] × [1行の高さ] + [余白のサイズ] × 2
 * 
 * 
 * ＜フォントサイズと行の高さ＞
 * 基本的に、下の大小関係になるように設定しましょう。
 *    フォントサイズ ＜ 1行の高さ
 * 
 * 
 * ＜ウィンドウを消す方法＞
 * 以下の設定にすると、ウィンドウ枠とウィンドウの背景が消えて
 * アクターのステータスだけを表示します。
 * 
 * <Window Opacity>     : 0
 * <Hide Window Frame>  : 1
 * 
 * 
 *-----------------------------------------------------------------------------
 * バトルフィールド上のアクターの位置設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enable Custom Position>
 *    :アクターの位置変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Max Number of Vertical>
 *    :アクターを縦に何人まで並べるか設定します。
 *    :バトルメンバーがこの数以上になった場合、後列に配置します。
 * 
 * <Center Position *>
 *    :前列の中心の座標を設定します。
 * 
 * <Diff Position *>
 *    :2番目以降のアクターの位置を先頭のアクターから
 *    :どの程度ずらすか設定します。
 * 
 * <Diff Column>
 *    :横方向の列の間隔を設定します。
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
 * v2.2.0 - 2018/12/29 : 機能追加
 *    1. ウィンドウ設定をセーブできる機能を追加。
 * 
 * v2.1.3 - 2018/12/13 : プラグインパラメータstatusListの初期値変更
 * 
 * v2.1.2 - 2018/09/29 : 機能追加
 *    1. プラグインパラメータのリストで選択できる項目を追加。
 * 
 * v2.1.1 - 2018/09/12 : 不具合修正
 *    1. プラグインパラメータ Number Visible Rows が反映されない不具合を修正。
 * 
 * v2.1.0 - 2018/08/30 : 機能追加
 *    1. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。
 * 
 * v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更
 * 
 * v1.3.0 - 2017/11/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。
 * 
 * v1.2.1 - 2017/06/11 : 機能追加
 *    1. バトルに参加する最大人数を設定する機能を追加。
 * 
 * v1.2.0 - 2017/05/31 : 機能追加
 *    1. バトルフィールド上のSVキャラの初期位置変更機能を拡張。
 * 
 * v1.1.2 - 2017/05/11 : 機能追加
 *    1. バトルフィールド上のSVキャラの初期位置変更機能追加。
 * 
 * v1.1.1 - 2017/05/06 : 機能追加
 *    1. 縦のカーソル間隔を設定する機能を追加。
 * 
 * v1.1.0 - 2017/04/21 : 機能変更
 *    1. FTKR_CustomSimpleActorStatus.jsのv1.4.0に対応
 *    2. ウィンドウのレイアウト変更のON/OFF機能を追加。
 * 
 * v1.0.1 - 2017/04/12 : 機能追加
 *    1. ウィンドウの余白と1行の高さ、透明度、枠の有無を変更する機能を追加。
 *    2. カーソル高さを変更する機能を追加。
 * 
 * v1.0.0 - 2017/04/11 : 初版作成
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
    var parameters = PluginManager.parameters('FTKR_CSS_BattleStatus');

    var saveCssWindow = paramParse(parameters['Enabled Save WindowLayout']) || false;

    FTKR.CSS.BS.party = {
        maxMembers    :Number(parameters['Max Battle Members'] || 0),
    };

    //ウィンドウ設定オブジェクト
    FTKR.CSS.BS.window = {
        enabled       :Number(parameters['Enabled Custom Window'] || 0),
        numVisibleRows:Number(parameters['Number Visible Rows'] || 0),
        fontSize      :Number(parameters['Font Size'] || 0),
        padding       :Number(parameters['Window Padding'] || 0),
        lineHeight    :Number(parameters['Window Line Height'] || 0),
        opacity       :Number(parameters['Window Opacity'] || 0),
        hideFrame     :Number(parameters['Hide Window Frame'] || 0),
        maxCols       :Number(parameters['Number Max Cols'] || 0),
        cursorHeight  :Number(parameters['Cursol Line Number'] || 0),
        hspace        :Number(parameters['Cursol Height Space'] || 0),
    };

    //簡易ステータスオブジェクト
    FTKR.CSS.BS.simpleStatus = {
        statusList : paramParse(parameters['statusList']),
        spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
    };

    FTKR.CSS.BS.position = {
        enabled   :Number(parameters['Enable Custom Position'] || 0),
        diffX     :Number(parameters['Diff Position X'] || 0),
        diffY     :Number(parameters['Diff Position Y'] || 0),
        diffCol   :Number(parameters['Diff Column'] || 0),
        centerX   :Number(parameters['Center Position X'] || 0),
        centerY   :Number(parameters['Center Position Y'] || 0),
        maxVer    :Number(parameters['Max Number of Vertical'] || 0),
    };

    //=============================================================================
    // Game_System
    //=============================================================================
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        if (saveCssWindow) {
            this.resetCssBattleWindow();
        }
    };

    Game_System.prototype.resetCssBattleWindow = function() {
        this._cssBattleWindow = JsonEx.makeDeepCopy(FTKR.CSS.BS.window);
    };

    Game_System.prototype.cssBattleWindow = function() {
        return saveCssWindow ? this._cssBattleWindow : FTKR.CSS.BS.window;
    };

    //=============================================================================
    // Game_Party
    //=============================================================================
    if (FTKR.CSS.BS.party.maxMembers) {

    Game_Party.prototype.maxBattleMembers = function() {
        return FTKR.CSS.BS.party.maxMembers;
    };

    }

    //=============================================================================
    // Window_BattleStatus
    // バトル画面のステータスウィンドウの表示クラス
    //=============================================================================
    if (Imported.FTKR_CSS) {

    Window_BattleStatus.prototype.standardCssLayout = function() {
      return $gameSystem.cssBattleWindow();
    };

    Window_BattleStatus.prototype.standardCssStatus = function() {
      return FTKR.CSS.BS.simpleStatus;
    };

    Window_BattleStatus.prototype.itemHeight = function() {
        return this.cursorHeight() ? 
            this.lineHeight() * this.cursorHeight() :
            Window_Selectable.prototype.itemHeight.call(this);
    };

    //ウィンドウの行数
    var _DS_Window_BattleStatus_numVisibleRows = Window_BattleStatus.prototype.numVisibleRows;
    Window_BattleStatus.prototype.numVisibleRows = function() {
        return $gameSystem.cssBattleWindow().enabled ? $gameSystem.cssBattleWindow().numVisibleRows : _DS_Window_BattleStatus_numVisibleRows.call(this);
    };

    //書き換え
    //アクター1人分のステータス表示
    Window_BattleStatus.prototype.drawItem = function(index) {
        var lss = this._lssStatus;
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRectForText(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };
    };//FTKR_CustomSimpleActorStatus.jsが必要

    //=============================================================================
    // Sprite_Actor
    // バトルフィールド上のSVキャラの位置変更
    //=============================================================================
    var _BS_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        _BS_Sprite_Actor_setActorHome.call(this, index);
        if (FTKR.CSS.BS.position.enabled) {
            this.setHome(this.partyPositionX(index), this.partyPositionY(index));
        }
    };

    Sprite_Actor.prototype.partyPositionX = function(index) {
        var party = Math.min($gameParty.battleMembers().length, FTKR.CSS.BS.position.maxVer);
        var col = Math.floor(index / party);
        var centerX = FTKR.CSS.BS.position.centerX - this.centerDiffX(party) + col * FTKR.CSS.BS.position.diffCol;
        var positionX = centerX + (index % party) * FTKR.CSS.BS.position.diffX;
        return positionX;
    };

    Sprite_Actor.prototype.partyPositionY = function(index) {
        var party = Math.min($gameParty.battleMembers().length, FTKR.CSS.BS.position.maxVer);
        var centerY = FTKR.CSS.BS.position.centerY - this.centerDiffY(party);
        var positionY = centerY + (index % party) * FTKR.CSS.BS.position.diffY;
        return positionY;
    };

    Sprite_Actor.prototype.centerDiffY = function(party) {
        var value1 = Math.floor((party + 1) / 2) * FTKR.CSS.BS.position.diffY;
        var value2 = (Math.floor(party / 2 - 1) * 2 + 1) * FTKR.CSS.BS.position.diffY / 2;
        return party % 2 ? value1 : value2;
    };

    Sprite_Actor.prototype.centerDiffX = function(party) {
        var value1 = Math.floor((party + 1) / 2) * FTKR.CSS.BS.position.diffX;
        var value2 = (Math.floor(party / 2 - 1) * 2 + 1) * FTKR.CSS.BS.position.diffX / 2;
        return party % 2 ? value1 : value2;
    };

}());//EOF