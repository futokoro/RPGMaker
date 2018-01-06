//=============================================================================
// 自動戦闘時に使用するスキルの優先度を個別に設定するプラグイン
// FTKR_AISkillEvaluate.js
// 作成者     : フトコロ
// 作成日     : 2018/01/06
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BAM = true;

var FTKR = FTKR || {};
FTKR.BAM = FTKR.BAM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 自動戦闘時に使用するスキルの優先度を個別に設定するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * スキルのメモ欄に以下のタグを追記すると、自動戦闘時に使用するスキルの
 * 選択する優先度計算を個別に設定することができます。
 * 
 * <BAM_優先度式:***>
 * <BAM_EBARUATE:***>
 *    ***に計算式を入力
 * 
 * 計算式には、ダメージ計算式と同様の記述が可能です。
 * 
 * 
 * 上記の優先度式を設定しない場合は、MVデフォルトの優先度計算式(※)を使用します。
 * ※後述
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 自動戦闘時の優先度計算式
 *-----------------------------------------------------------------------------
 * MVのデフォルトでは、自動戦闘時には以下のルールに従い使用可能なスキルを
 * 選択可能な対象ごとに優先度を計算し、その優先度がもっとも高くなる相手に
 * 対してスキルを使用します。
 * 
 * 1. ダメージタイプが「HPダメージ、HP回復、HP吸収」以外のスキルは優先度0
 * 2. HPダメージの場合は、与えるダメージと相手の残りHPの比が優先度になる
 * 3. HP回復の場合は、回復量と相手の最大HPの比が優先度になる
 * 4. 全体を対象とするスキルは、すべての対象の優先度を合計する
 * 5. 連続回数が設定されている場合は、算出した優先度に回数の数値をかける
 * 6. ルール5までで優先度が 0 でなければ、その値にランダムで 0 ～ 1 を加算する
 * 　
 * 
 * 上記ルールを見て分かるとおりに、ダメージタイプがMP系や
 * ダメージタイプなしで使用効果のみ設定したスキルは、自動戦闘では
 * MVのデフォルトでは絶対に使用しないことになります。
 * 
 * 
 * 当プラグインを使い、タグで優先度式をそれらのスキルに設定することで
 * 自動戦闘でも使用する可能性がでるようになります。
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
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2018/01/06 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

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
    // DataManager
    // スキルに優先度式を設定する
    //=============================================================================

    var _BAM_DatabaseLoaded = false;
    var _BAM_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_BAM_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_BAM_DatabaseLoaded) {
            this.itemEvaluateNotetags($dataSkills);
            _BAM_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.itemEvaluateNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.evaluateFormura = readObjectMeta(obj, ['BAM_優先度式', 'BAM_EVALUATE']);
        }
    };
   
    //=============================================================================
    // Game_Actor
    //=============================================================================
    //書き換え
    Game_Actor.prototype.makeAutoBattleActions = function() {
        for (var i = 0; i < this.numActions(); i++) {
            this.makeAutoBattleAction(i);
        }
        this.setActionState('waiting');
    };

    Game_Actor.prototype.makeAutoBattleAction = function(index) {
        var list = this.makeActionList();//使用可能なスキルを抽出
        var maxValue = Number.MIN_VALUE;
        for (var j = 0; j < list.length; j++) {
            var value = list[j].evaluate();//スキルごとに優先度を算出
            if (value > maxValue) {
                maxValue = value;
                this.setAction(index, list[j]);//優先度が一番高いスキルをセット
            }
        }
    };

    var _BAM_Game_Action_evaluateWithTarget = Game_Action.prototype.evaluateWithTarget;
    Game_Action.prototype.evaluateWithTarget = function(target) {
        if (this.item().evaluateFormura) {
            return this.bamEvaluateFormura(target);
        } else {
            return _BAM_Game_Action_evaluateWithTarget.call(this, target) || 0;
        }
    };

    Game_Action.prototype.bamEvaluateFormura = function(target) {
        FTKR.setGameData(this.subject(), target, this.item());
        return FTKR.evalFormula(this.item().evaluateFormura);
    };

}());//EOF
