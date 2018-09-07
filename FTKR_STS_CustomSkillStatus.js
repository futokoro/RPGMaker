//=============================================================================
// ツリー型スキル習得システム用 スキルツリーウィンドウ表示変更プラグイン
// FTKR_STS_CustomSkillStatus.js
// プラグインNo : 89
// 作成者     : フトコロ(futokoro)
// 作成日     : 2018/09/04
// 最終更新日 : 2018/09/07
// バージョン : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STS_CST = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};
FTKR.STS.CST = FTKR.STS.CST || {};

//=============================================================================
/*:
 * @plugindesc v1.0.2 ツリー型スキル習得システム用 スキルツリーウィンドウ表示変更プラグイン
 * @author フトコロ
 *
 * @param --ステータス表示設定--
 * @default
 * 
 * @param statusList
 * @desc 表示するステータスとその位置を設定します。
 * @type struct<status>[]
 * @default ["{\"text\":\"iicon\",\"value\":\"\",\"x\":\"4\",\"y\":\"4\",\"width\":\"0\"}"]
 * 
 * @param Skill Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * @number
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * FTKR_CustomSimpleActorStatus の v3.0.0 以降から追加した
 * ステータスごとの表示位置指定方式を使って、スキルツリーウィンドウ上の
 * スキルの表示を変更できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *-----------------------------------------------------------------------------
 * 1. 本プラグインには、FTKR_SkillTreeSystem.js (v1.16.0以降) が必要です。
 * 
 *    FTKR_SkillTreeSystem.js is required.
 * 
 * 
 * 2. 本プラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。
 * 
 *    FTKR_CustomSimpleActorStatus.js is required.
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
 * v1.0.2 - 2018/09/07 : 機能追加
 *    1. スキル習得回数を表示するパラメータを追加。
 * v1.0.1 - 2018/09/04 : 不具合修正
 * v1.0.0 - 2018/09/04 : 初版作成
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
 * @option 装備
 * @value equip(%1)
 * @option 装備パラメータ
 * @value eparam(%1)
 * @option AOP装備パラメータ
 * @value eaop(%1)
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
 * @option スキル名
 * @value iname
 * @option スキルアイコン
 * @value iicon
 * @option スキル習得コスト
 * @value istscost(%1)
 * @option スキル習得回数
 * @value istscount
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

if(Imported.FTKR_STS) {

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
    var parameters = PluginManager.parameters('FTKR_STS_CustomSkillStatus');

    //簡易ステータスオブジェクト
    FTKR.STS.CST.simpleStatus = {
        statusList : paramParse(parameters['statusList']),
        spaceIn    : Number(parameters['Skill Status Space In Text'] || 0),
    };

    var _AltTB_Window_Base_drawCssActorStatusBase_A1 = Window_Base.prototype.drawCssActorStatusBase_A1;
    Window_Base.prototype.drawCssActorStatusBase_A1 = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'ISTSCOST':
                return this.drawCssItemStsCost(actor, x, y, width, match[2]);
            default:
                return _AltTB_Window_Base_drawCssActorStatusBase_A1.apply(this, arguments);
        }
    };

    var _AltTB_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'IICON':
                return this.drawCssItemIcon(actor, x, y, width);
            case 'INAME':
                return this.drawCssItemName(actor, x, y, width);
            case 'ISTSCOUNT':
                return this.drawCssItemStsCount(actor, x, y, width);
            default:
                return _AltTB_Window_Base_drawCssActorStatusBase_B.apply(this, arguments);
        }
    };

    Window_Base.prototype.drawCssItemIcon = function(actor, x, y, width) {
        var index = FTKR.gameData.item ? FTKR.gameData.item.iconIndex : 0;
        this.drawIcon(index, x, y);
        return 1;
    };

    Window_Base.prototype.drawCssItemName = function(actor, x, y, width) {
        var name = FTKR.gameData.item ? FTKR.gameData.item.name : '';
        this.drawText(name, x, y, width);
        return 1;
    };

    Window_Base.prototype.drawCssItemStsCost = function(actor, x, y, width, costId) {
        var item = FTKR.gameData.item;
        if (item) {
            var cost = item.sts.costs[+costId];
            this.drawStsCost(cost, x, y, width, item.id);
        }
        return 1;
    };

    Window_Base.prototype.drawCssItemStsCount = function(actor, x, y, width) {
        var item = FTKR.gameData.item;
        if (item) {
            var iw = Window_Base._iconWidth;
            var cfl = FTKR.STS.cFrame;
            var scx = x + width + cfl.offsetX;
            var scy = y + cfl.offsetY;
            var sch = cfl.height;
            var rate = sch / iw;
            var thick = cfl.thick;
            var sctx = scx + thick + cfl.count.offsetX;
            var scty = scy + thick + cfl.count.offsetY;
            var count = !actor.isStsLearnedSkill(skill.id) ? 0 : actor.stsCount(skill.id);
            if (FTKR.STS.enableSkillCount) {
                this.drawFormatTextEx(cfl.format, sctx, scty, [count]);
            }
            if (actor.isStsLearnedSkill(skill.id) && !actor.isStsLearnedOk(skill.id)) {
                this.drawIconCustom(FTKR.STS.skillLearnedIcon, scx, scy, rate);
            }
        }
        return 1;
    };
    
    Window_SkillTree.prototype.drawCssItemStsCount = function(actor, x, y, width) {
        var item = FTKR.gameData.item;
        if (item) {
            var color = this.setFrameColor(item);
            this.drawSkillCount(actor, item, item, x, y, width, color);
        }
        return 1;
    };

    //=============================================================================
    // Window_SkillTree
    //=============================================================================

    Window_SkillTree.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, FTKR.gameData.item);
        return FTKR.evalStrFormula(formula);
    };

    Window_SkillTree.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, null, FTKR.gameData.item);
        return FTKR.evalFormula(formula);
    };

    Window_SkillTree.prototype.drawItem = function(index) {
        var data = this._data[index];
        if (!data) return false;
        var rect = this.itemRect(index);
        var skill = this._actor.stsSkill(data.id);
        if (skill) {
            this.changePaintOpacity(this.isShowItem(data));
            this.drawTreeLineRect(data, rect);
            this.drawFrame(index, skill, data);
            var lss = FTKR.STS.CST.simpleStatus;
            var rect = this.itemRect(index);
            FTKR.setGameData(this._actor, null, skill);
            this.drawCssActorStatus(index, this._actor, rect.x, rect.y, rect.width, rect.height, lss);
            this.changeTextColor(this.textColor(0));
            this.changePaintOpacity(1);
        }
    };

}());
//=============================================================================
} else {
    var text = '';
    var textj = '<FTKR_SkillTreeSystem.js>がありません!\r\n'
    textj += 'プラグイン管理に<FTKR_SkillTreeSystem.js>を追加してください!'
    console.log(textj);
    var text = 'There is no FTKR_SkillTreeSystem.js!\r\n'
    text += 'Please add FTKR_SkillTreeSystem.js to the plugin manager!'
    console.log(text);
}//FTKR_STS_CustomWindow.js END
