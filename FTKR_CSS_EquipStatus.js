//=============================================================================
// 装備画面のステータスレイアウトを変更するプラグイン
// FTKR_CSS_EquipStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/05/13
// 最終更新日 : 2017/11/18
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_ES = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.ES = FTKR.CSS.ES || {};

/*:
 * @plugindesc v1.1.0 装備画面のステータスレイアウトを変更する
 * @author フトコロ
 *
 * @param --レイアウト設定--
 * @default
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,param(2),param(3),param(4),param(5),param(6),param(7)
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default ,eparam(2),eparam(3),eparam(4),eparam(5),eparam(6),eparam(7)
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default 
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,0,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * @number
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 2,1,0
 *
 * @param --ウィンドウ設定--
 * @desc 
 * 
 * @param Enabled Custom Window
 * @desc ウィンドウのレイアウト変更機能を使うか。
 * 0 - 無効, 1 - 有効
 * @default 0
 * @number
 * 
 * @param Number Visible Rows
 * @desc ステータスウィンドウの縦の行数
 * @default 7
 * @number
 * 
 * @param Font Size
 * @desc フォントサイズ
 * @default 28
 * @number
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白
 * @default 18
 * @number
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ
 * @default 36
 * @number
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度
 * @default 192
 * @number
 * 
 * @param Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * @number
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、装備画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * また、装備画面のステータスウィンドウの設定を変更できます。
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
 * デフォルトで表示しているパラメータは以下のコードを使用しています。
 * 
 * アクターの名前　　　　　：name
 * パラメータの名称と現在値：param(x)
 * 矢印と装備変更後の値　　：eparam(x)
 * 
 * 矢印記号を別のものに変えたい場合は、FTKR_CustomSimpleActorStatus.jsの
 * プラグインパラメータ<Equip Right Arrow>で指定してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムパラメータおよびカスタムゲージの計算式(eval)に使用できるコード
 *-----------------------------------------------------------------------------
 * 選択中の武器または防具を装備した時のパラメータは b.param で参照できます。
 * 
 * 補足)
 * a.param は現在装備中のパラメータを参照する
 * 
 * よって、以下のコードで攻撃力の差分を取得できます。
 *   b.atk - a.atk
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
 *    :デフォルトは7行です。
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.1.0 - 2017/11/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。
 * 
 * v1.0.2 - 2017/07/23 : 不具合修正
 *    1. ウィンドウの設定が反映されない不具合を修正。
 * 
 * v1.0.1 - 2017/05/17 : 機能追加
 *    1. 選択中の武器または防具を装備した時のパラメータを参照する機能を追加。
 * 
 * v1.0.0 - 2017/05/13 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

if (Imported.FTKR_CSS) (function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_CSS_EquipStatus');

    //簡易ステータスオブジェクト
    FTKR.CSS.ES.simpleStatus = {
        text1     :String(parameters['Actor Status Text1'] || ''),
        text2     :String(parameters['Actor Status Text2'] || ''),
        text3     :String(parameters['Actor Status Text3'] || ''),
        space     :String(parameters['Actor Status Space'] || ''),
        spaceIn   :Number(parameters['Actor Status Space In Text'] || 0),
        widthRate :String(parameters['Actor Status Width Rate'] || ''),
        target    :null,
    };

    FTKR.CSS.ES.window = {
        enabled       :Number(parameters['Enabled Custom Window'] || 0),
        numVisibleRows:Number(parameters['Number Visible Rows'] || 0),
        fontSize      :Number(parameters['Font Size'] || 0),
        padding       :Number(parameters['Window Padding'] || 0),
        lineHeight    :Number(parameters['Window Line Height'] || 0),
        opacity       :Number(parameters['Window Opacity'] || 0),
        hideFrame     :Number(parameters['Hide Window Frame'] || 0),
    };

    //=============================================================================
    // Window_EquipStatus
    //=============================================================================

    Window_EquipStatus.prototype.standardCssLayout = function() {
        return FTKR.CSS.ES.window;
    };

    Window_EquipStatus.prototype.standardCssStatus = function() {
        return FTKR.CSS.ES.simpleStatus;
    };

    //書き換え
    Window_EquipStatus.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, this._tempActor);
        return FTKR.evalFormula(formula);
    };

    //書き換え
    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            lss.target = this._tempActor;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
        }
    };

    //ウィンドウの行数
    var _DS_Window_EquipStatus_numVisibleRows = Window_EquipStatus.prototype.numVisibleRows;
    Window_EquipStatus.prototype.numVisibleRows = function() {
        return FTKR.CSS.ES.window.enable ? FTKR.CSS.ES.window.numVisibleRows :
        _DS_Window_EquipStatus_numVisibleRows.call(this);
    };
    
}());//FTKR_CustomSimpleActorStatus.jsが必要