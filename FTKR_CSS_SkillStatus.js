//=============================================================================
// スキル画面のステータス表示を変更するプラグイン
// FTKR_CSS_SkillStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/04/21
// 最終更新日 : 2017/05/08
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_SS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.SS = FTKR.CSS.SS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 スキル画面のステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @param --レイアウト設定--
 * @desc 
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,level,state
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default class,hp,mp
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 2,2,3
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
 * @desc ステータスウィンドウの縦の行数
 * @default 4
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
 * @param Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、スキル画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * また、スキル画面のステータスウィンドウの設定を変更できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインを動作させるためには、
 *    FTKR_CustomSimpleActorStatus.jsが必要です。
 *    本プラグインは、FTKR_CustomSimpleActorStatus.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターのスキルステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、スキル画面で表示する
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
 * ステータスウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enabled Custom Window>
 *    :スキル画面のウィンドウ変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Number Visible Rows>
 *    :ステータスウィンドウの縦の行数を変更します。
 *    :デフォルトは4行です。
 *    :この値を変えても、コマンドウィンドウのサイズは変わりません。
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2017/05/08 : 不具合修正、デフォルト設定を変更。
 * 
 * v1.0.0 - 2017/04/21 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

if (Imported.FTKR_CSS) {

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.CSS.SS.parameters = PluginManager.parameters('FTKR_CSS_SkillStatus');

FTKR.CSS.SS.window = {
    enabled:Number(FTKR.CSS.SS.parameters['Enabled Custom Window'] || 0),
    numVisibleRows:Number(FTKR.CSS.SS.parameters['Number Visible Rows'] || 0),
    maxCols:Number(FTKR.CSS.SS.parameters['Number Max Cols'] || 0),
    fontSize:Number(FTKR.CSS.SS.parameters['Font Size'] || 0),
    padding:Number(FTKR.CSS.SS.parameters['Window Padding'] || 0),
    lineHeight:Number(FTKR.CSS.SS.parameters['Window Line Height'] || 0),
    opacity:Number(FTKR.CSS.SS.parameters['Window Opacity'] || 0),
    hideFrame:Number(FTKR.CSS.SS.parameters['Hide Window Frame'] || 0),
    cursolHeight:Number(FTKR.CSS.SS.parameters['Cursol Line Number'] || 0),
};

//簡易ステータスオブジェクト
FTKR.CSS.SS.simpleStatus = {
    text1:String(FTKR.CSS.SS.parameters['Actor Status Text1'] || ''),
    text2:String(FTKR.CSS.SS.parameters['Actor Status Text2'] || ''),
    text3:String(FTKR.CSS.SS.parameters['Actor Status Text3'] || ''),
    space:String(FTKR.CSS.SS.parameters['Actor Status Space'] || ''),
    spaceIn:Number(FTKR.CSS.SS.parameters['Actor Status Space In Text'] || 0),
    widthRate:String(FTKR.CSS.SS.parameters['Actor Status Width Rate'] || ''),
};

//=============================================================================
// Window_SkillStatus
// スキル画面のステータスウィンドウの表示クラス
//=============================================================================

//書き換え
Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        this.drawCssActorStatus(0, this._actor, 0, 0, w, h, FTKR.CSS.SS.simpleStatus);
    }
};

if(FTKR.CSS.SS.window.enabled) {

//書き換え
//ウィンドウの行数
Window_BattleStatus.prototype.numVisibleRows = function() {
    return FTKR.CSS.SS.window.numVisibleRows;
};

//書き換え
//ウィンドウのフォントサイズ
Window_BattleStatus.prototype.standardFontSize = function() {
    return FTKR.CSS.SS.window.fontSize;
};

//書き換え
//ウィンドウに周囲の余白サイズ
Window_BattleStatus.prototype.standardPadding = function() {
    return FTKR.CSS.SS.window.padding;
};

//書き換え
//ウィンドウ内の1行の高さ
Window_BattleStatus.prototype.lineHeight = function() {
    return FTKR.CSS.SS.window.lineHeight;
};

//書き換え
//ウィンドウの背景の透明度
Window_BattleStatus.prototype.standardBackOpacity = function() {
    return FTKR.CSS.SS.window.opacity;
};

//書き換え
//ウィンドウ枠の表示
Window_BattleStatus.prototype._refreshFrame = function() {
    if (!FTKR.CSS.SS.window.hideFrame) Window.prototype._refreshFrame.call(this);
};

}//ウィンドウカスタム有効

};//TKR_CustomSimpleActorStatus.jsが必要