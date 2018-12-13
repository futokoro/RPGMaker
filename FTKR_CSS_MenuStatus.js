//=============================================================================
// メニュー画面のステータス表示を変更するプラグイン
// FTKR_CSS_MenuStatus.js
// プラグインNo : 47
// 作成者     : フトコロ
// 作成日     : 2017/06/18
// 最終更新日 : 2018/12/13
// バージョン : v2.1.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_MS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.MS = FTKR.CSS.MS || {};

//=============================================================================
/*:
 * @plugindesc v2.1.3 メニュー画面のステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @param --簡易ステータス表示--
 * @default
 * 
 * @param statusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"face\",\"x\":\"0\",\"y\":\"0\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"162\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"level\",\"x\":\"162\",\"y\":\"36\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"162\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"class\",\"value\":\"\",\"x\":\"342\",\"y\":\"0\",\"width\":\"198\"}","{\"text\":\"hp\",\"value\":\"\",\"x\":\"342\",\"y\":\"36\",\"width\":\"198\"}","{\"text\":\"mp\",\"value\":\"\",\"x\":\"342\",\"y\":\"72\",\"width\":\"198\"}"]
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param --ステータスウィンドウ設定--
 * @default
 * 
 * @param Enabled Custom Window
 * @desc ウィンドウのレイアウト変更機能を使うか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Number Max Cols
 * @desc アクターを横に並べる数：デフォルト 1
 * @default 1
 * 
 * @param Cursor Line Number
 * @desc カーソル高さの行数：デフォルト 4
 * @default 4
 * 
 * @param Cursor Height Space
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
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、メニュー画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_MenuStatus.ja.md
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
 *    FTKR_CSS_MenuStatus.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの簡易ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、メニュー画面で表示する
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
 * メニュー画面のステータスウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enabled Custom Window>
 *    :メニュー画面のウィンドウ変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Number Max Cols>
 *    :ウィンドウ内でアクターを横に並べる数を変更します。
 *    :デフォルトは 1 です。
 * 
 * <Cursor Line Number>
 *    :カーソル(アクター１人分)の高さを何行分にするか設定します。
 *    :デフォルトは 4 です。
 * 
 * <Cursor Height Space>
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
 * v2.1.3 - 2018/12/13 : プラグインパラメータstatusListの初期値変更
 * 
 * v2.1.2 - 2018/09/29 : 機能追加
 *    1. プラグインパラメータのリストで選択できる項目を追加。
 * 
 * v2.1.1 - 2018/09/12 : 不要なプラグインパラメータを削除
 * 
 * v2.1.0 - 2018/08/30 : 機能追加
 *    1. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。
 * 
 * v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更
 * 
 * v1.1.0 - 2017/11/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。
 * 
 * v1.0.0 - 2017/06/18 : 初版作成
 *    FTKR_CustomSimpleActorStatus.js v1.8.0 から分離
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
    var parameters = PluginManager.parameters('FTKR_CSS_MenuStatus');

    //簡易ステータスオブジェクト
    FTKR.CSS.MS.simpleStatus = {
        statusList : paramParse(parameters['statusList']),
        spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
    };

    //ウィンドウ設定オブジェクト
    FTKR.CSS.MS.window = {
        enabled         :Number(parameters['Enabled Custom Window'] || 0),
        maxCols         :Number(parameters['Number Max Cols'] || 0),
        fontSize        :Number(parameters['Font Size'] || 0),
        padding         :Number(parameters['Window Padding'] || 0),
        lineHeight      :Number(parameters['Window Line Height'] || 0),
        opacity         :Number(parameters['Window Opacity'] || 0),
        hideFrame       :Number(parameters['Hide Window Frame'] || 0),
        cursorHeight    :Number(parameters['Cursor Line Number'] || 0),
        hspace          :Number(parameters['Cursor Height Space'] || 0),
    };

    //=============================================================================
    // Window_MenuStatus
    // メニュー画面のステータスウィンドウの表示クラス
    //=============================================================================
    Window_MenuStatus.prototype.standardCssLayout = function() {
        return FTKR.CSS.MS.window;
    };

    Window_MenuStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.MS.simpleStatus;
    };

    var _Window_MenuStatus_itemHeight = Window_MenuStatus.prototype.itemHeight;
    Window_MenuStatus.prototype.itemHeight = function() {
        return FTKR.CSS.MS.window.enabled ? 
            this.lineHeight() * this.cursorHeight() :
            _Window_MenuStatus_itemHeight.call(this);
    };

    //書き換え
    Window_MenuStatus.prototype.drawItemImage = function(index) {
    };

    //書き換え
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        var lss = this._lssStatus;
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };

    //書き換え
    Window_MenuStatus.prototype.drawAllItems = function() {
        var topIndex = this.topIndex();
        for (var i = 0; i < this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
            } else {
                this.clearCssSprite(index % this.maxPageItems());
            }
        }
    };

}());//EOF