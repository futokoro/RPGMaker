//=============================================================================
// バトル画面のステータス表示を変更するプラグイン
// FTKR_CSS_BattleStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/04/11
// 最終更新日 : 2017/05/31
// バージョン : v1.2.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_BS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.BS = FTKR.CSS.BS || {};

//=============================================================================
/*:
 * @plugindesc v1.2.0 バトル画面のステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @param --レイアウト設定--
 * @desc 
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default state
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default [hp/mp/tp]
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,5,5,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,1,3
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
 * また、バトル画面のステータスウィンドウの設定を変更できます。
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
 *    :バトルメンバーがこの数以上になった場合、超過分の人数を後列に配置します。
 * 
 * <Center Position *>
 *    :前列の中心の座標を設定します。
 * 
 * <Diff Position *>
 *    :2番目以降のアクターの位置を先頭のアクターから
 *    :どの程度ずらすか設定します。
 * 
 * <Diff Column>
 *    :横方向の列の間隔(前列に対して後列をどの程度ずらすか)を設定します。
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

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.CSS.BS.parameters = PluginManager.parameters('FTKR_CSS_BattleStatus');

//ウィンドウ設定オブジェクト
FTKR.CSS.BS.window = {
    enabled:Number(FTKR.CSS.BS.parameters['Enabled Custom Window'] || 0),
    numVisibleRows:Number(FTKR.CSS.BS.parameters['Number Visible Rows'] || 0),
    maxCols:Number(FTKR.CSS.BS.parameters['Number Max Cols'] || 0),
    fontSize:Number(FTKR.CSS.BS.parameters['Font Size'] || 0),
    padding:Number(FTKR.CSS.BS.parameters['Window Padding'] || 0),
    lineHeight:Number(FTKR.CSS.BS.parameters['Window Line Height'] || 0),
    opacity:Number(FTKR.CSS.BS.parameters['Window Opacity'] || 0),
    hideFrame:Number(FTKR.CSS.BS.parameters['Hide Window Frame'] || 0),
    cursolHeight:Number(FTKR.CSS.BS.parameters['Cursol Line Number'] || 0),
    hspace:Number(FTKR.CSS.BS.parameters['Cursol Height Space'] || 0),
};

//簡易ステータスオブジェクト
FTKR.CSS.BS.simpleStatus = {
    text1:String(FTKR.CSS.BS.parameters['Actor Status Text1'] || ''),
    text2:String(FTKR.CSS.BS.parameters['Actor Status Text2'] || ''),
    text3:String(FTKR.CSS.BS.parameters['Actor Status Text3'] || ''),
    space:String(FTKR.CSS.BS.parameters['Actor Status Space'] || ''),
    spaceIn:Number(FTKR.CSS.BS.parameters['Actor Status Space In Text'] || 0),
    widthRate:String(FTKR.CSS.BS.parameters['Actor Status Width Rate'] || ''),
};

FTKR.CSS.BS.position = {
    enable:Number(FTKR.CSS.BS.parameters['Enable Custom Position'] || 0),
    diffX:Number(FTKR.CSS.BS.parameters['Diff Position X'] || 0),
    diffY:Number(FTKR.CSS.BS.parameters['Diff Position Y'] || 0),
    diffCol:Number(FTKR.CSS.BS.parameters['Diff Column'] || 0),
    centerX:Number(FTKR.CSS.BS.parameters['Center Position X'] || 0),
    centerY:Number(FTKR.CSS.BS.parameters['Center Position Y'] || 0),
    maxVer:Number(FTKR.CSS.BS.parameters['Max Number of Vertical'] || 0),
};

//=============================================================================
// Window_BattleStatus
// バトル画面のステータスウィンドウの表示クラス
//=============================================================================

if(FTKR.CSS.BS.window.enabled) {

//書き換え
//ウィンドウの行数
Window_BattleStatus.prototype.numVisibleRows = function() {
    return FTKR.CSS.BS.window.numVisibleRows;
};

//書き換え
//ウィンドウに横に並べるアクター数
Window_BattleStatus.prototype.maxCols = function() {
    return FTKR.CSS.BS.window.maxCols;
};

//書き換え
//カーソルの高さ
Window_BattleStatus.prototype.itemHeight = function() {
    return this.lineHeight() * FTKR.CSS.BS.window.cursolHeight;
};

//書き換え
//ウィンドウに横に並べるアクターの表示間隔
//ステータスレイアウト側で変更できるのでここでは 0 とする。
Window_BattleStatus.prototype.spacing = function() {
    return 0;
};

//書き換え
//ウィンドウのフォントサイズ
Window_BattleStatus.prototype.standardFontSize = function() {
    return FTKR.CSS.BS.window.fontSize;
};

//書き換え
//ウィンドウに周囲の余白サイズ
Window_BattleStatus.prototype.standardPadding = function() {
    return FTKR.CSS.BS.window.padding;
};

//書き換え
//ウィンドウ内の1行の高さ
Window_BattleStatus.prototype.lineHeight = function() {
    return FTKR.CSS.BS.window.lineHeight;
};

//書き換え
//ウィンドウの背景の透明度
Window_BattleStatus.prototype.standardBackOpacity = function() {
    return FTKR.CSS.BS.window.opacity;
};

//書き換え
//ウィンドウ枠の表示
Window_BattleStatus.prototype._refreshFrame = function() {
    if (!FTKR.CSS.BS.window.hideFrame) Window.prototype._refreshFrame.call(this);
};

Window_BattleStatus.prototype.itemHeightSpace = function() {
    return FTKR.CSS.BS.window.hspace;
};

Window_BattleStatus.prototype.unitHeight = function() {
    return this.itemHeight() + this.itemHeightSpace();
};

Window_BattleStatus.prototype.unitWidth = function() {
    return this.itemWidth() + this.spacing();
};

if (FTKR.CSS.BS.window.hspace) {
//書き換え
Window_BattleStatus.prototype.maxPageRows = function() {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.unitHeight());
};

//書き換え
Window_BattleStatus.prototype.topRow = function() {
    return Math.floor(this._scrollY / this.unitHeight());
};

//書き換え
Window_BattleStatus.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

//書き換え
Window_BattleStatus.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * this.unitWidth() - this._scrollX;
    rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
    return rect;
};
}//FTKR.CSS.BS.window.hspace

}//ウィンドウカスタム有効

//書き換え
//アクター1人分のステータス表示
if (Imported.FTKR_CSS) {
  Window_BattleStatus.prototype.drawItem = function(index) {
      var actor = $gameParty.battleMembers()[index];
      var rect = this.itemRectForText(index);
      var lss = FTKR.CSS.BS.simpleStatus;
      this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
  };
};//FTKR_CustomSimpleActorStatus.jsが必要

//=============================================================================
// Sprite_Actor
// バトルフィールド上のSVキャラの位置変更
//=============================================================================
FTKR.CSS.BS.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    FTKR.CSS.BS.Sprite_Actor_setActorHome.call(this, index);
    if (FTKR.CSS.BS.position.enable) {
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
