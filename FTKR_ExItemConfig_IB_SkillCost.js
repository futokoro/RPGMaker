//=============================================================================
// スキルの消費コストを拡張するプラグイン
// FTKR_ExItemConfig_IB_SkillCost.js
// 作成者     : フトコロ
// 作成日     : 2017/04/30
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IEP_SC = true;

var FTKR = FTKR || {};
FTKR.IEP = FTKR.IEP || {};
FTKR.IEP.SC = FTKR.IEP.SC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 スキルの消費コストを拡張するプラグイン
 * @author フトコロ
 *
 * @param Draw All Cost
 * @desc スキルのすべてのコストを表示するか。
 * 0 - 表示しない, 1 - 表示する
 * @default 0
 *
 * @param HP Cost Format
 * @desc HPコストの表示内容を文字列で記述します。
 *  %1 - HPコスト
 * @default \c[21]%1\}HP\{
 *
 * @param MP Cost Format
 * @desc MPコストの表示内容を文字列で記述します。
 *  %1 - MPコスト
 * @default \c[23]%1\}MP\{
 *
 * @param TP Cost Format
 * @desc TPコストの表示内容を文字列で記述します。
 *  %1 - TPコスト
 * @default \c[29]%1\}TP\{
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、スキルの消費コストをより詳細に設定できます。
 * 
 * 本プラグインは、FTKR_ExItemConfig_ItemBasic.jsの拡張プラグインです。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインには、FTKR_ExItemConfig_ItemBasic.js が必要です。
 * 
 * 3. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用条件の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、消費コストの設定ができます。
 * 消費コストはFTKR_ExItemConfig_ItemBasic.jsのデータID毎に設定できます。
 * 
 * <EIC コスト: x>
 * code
 * </EIC コスト>
 *    :データID x に対して code部の設定を登録します。
 * 
 * [code に使用できる項目]
 * Mp: eval
 *    :消費MPを eval で設定した値に変更します。
 * Tp: eval
 *    :消費TPを eval で設定した値に変更します。
 * Hp: eval
 *    :消費HPを eval で設定した値にします。
 * 
 * 
 * [計算式(eval) の値について]
 * 計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 *  iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)
 * 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * 
 * 
 * 入力例）
 * 使用者の現在MPと現在TPをすべて消費する。
 * ただし、最低1は必要とする。
 * <EIC コスト: 0>
 * Mp: Math.max(a.mp, 1)
 * Tp: Math.max(a.tp, 1)
 * </EIC コスト>
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
 * v1.0.0 - 2017/04/30 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

if (Imported.FTKR_IEP) {

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.IEP.SC.parameters = PluginManager.parameters('FTKR_ExItemConfig_IB_SkillCost');

FTKR.IEP.SC.drawAllCost = Number(FTKR.IEP.SC.parameters['Draw All Cost'] || 0);
FTKR.IEP.SC.format = {
    hpCost:String(FTKR.IEP.SC.parameters['HP Cost Format'] || ''),
    mpCost:String(FTKR.IEP.SC.parameters['MP Cost Format'] || ''),
    tpCost:String(FTKR.IEP.SC.parameters['TP Cost Format'] || ''),
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
// 自作関数(ローカル)
//=============================================================================

var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
    regs = convertEntrapmentRegArrayEx('EIC ', codeTitles);
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';
    var results = [];

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (matchRegs(line, regs, 'start')) {
            var data = {
                id:RegExp.$1,
                text:''
            };
            setMode = 'read';
        } else if (matchRegs(line, regs, 'end')) {
            setMode = 'none';
            results.push(data);
        } else if (setMode === 'read') {
            data.text += line + ';';
        }
    }
    return results;
};

var convertRegs = function(metacodes) {
    return metacodes.map(function(metacode){
        return new RegExp(metacode + ':[ ]*(.+)', 'i');
    });
};

var convertEntrapmentRegArrayEx = function(header, codeTitles) {
    return codeTitles.map(function(codeTitle) {
        return {
            start:new RegExp('<' + header + codeTitle + ':[ ]*(.+)>', 'i'),
            end  :new RegExp('<\/' + header + codeTitle + '>', 'i')
        };
    });
};

var matchRegs = function(data, regs, prop) {
    return regs.some(function(reg){
        return prop ? data.match(reg[prop]) : data.match(reg);
    });
};

var matchTexts = function(data, texts, prop) {
    return convertRegs(texts).some(function(reg){
        return prop ? data.match(reg[prop]) : data.match(reg);
    });
};

//=============================================================================
// メタデータの読み取り
//=============================================================================

FTKR.IEP.SC.DatabaseLoaded = false;
FTKR.IEP.SC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.IEP.SC.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.IEP.SC.DatabaseLoaded) {
        this.iepDataCostNotetags($dataSkills);
        FTKR.IEP.SC.DatabaseLoaded = true;
    }
    return true;
};

DataManager.iepDataCostNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        this.setIepCostData(obj);
        var datas = readEntrapmentCodeToTextEx(obj, ['コスト', 'COST']);
        this.readIepCostMetaDatas(obj, datas);
    }
};

DataManager.setIepCostData = function(obj, dataId) {
    dataId = dataId || 0;
    obj.iepDatas[dataId].cost = {
        hp : 0,
        mp : obj.mpCost,
        tp : obj.tpCost,
    };
};

DataManager.readIepCostMetaDatas = function(obj, metaDatas) {
    for (var t = 0; t < metaDatas.length; t++) {
        var dataId = Number(metaDatas[t].id);
        var datas = metaDatas[t].text.split(';');
        this.setIepCostData(obj, dataId);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (matchTexts(data, ['HP'])) {
                obj.iepDatas[dataId].cost.hp = RegExp.$1;
            } else if (matchTexts(data, ['MP'])) {
                obj.iepDatas[dataId].cost.mp = RegExp.$1;
            } else if (matchTexts(data, ['TP'])) {
                obj.iepDatas[dataId].cost.tp = RegExp.$1;
            }
        }
    }
};

//=============================================================================
// コストの取得
//=============================================================================

Game_BattlerBase.prototype.skillIepCost = function(skill, prop) {
    var iepSkill = DataManager.itemIepData(skill, this);
    FTKR.setGameData(this, null, skill);
    return Math.max(Math.floor(FTKR.evalFormula(iepSkill.cost[prop])), 0);
};

//=============================================================================
// コストの消費処理の修正
//=============================================================================

FTKR.IEP.SC.Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return this._hp >= this.skillHpCost(skill) && 
        FTKR.IEP.SC.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

FTKR.IEP.SC.Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    this._hp -= this.skillHpCost(skill);
    FTKR.IEP.SC.Game_BattlerBase_paySkillCost.call(this, skill);
};

FTKR.IEP.SC.Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    if (skill.iepDatas) {
        return this.skillIepCost(skill, 'mp') * this.mcr;
    } else {
        return FTKR.IEP.SC.Game_BattlerBase_skillMpCost.call(this, skill);
    }
};

FTKR.IEP.SC.Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    if (skill.iepDatas) {
        return this.skillIepCost(skill, 'tp');
    } else {
        return FTKR.IEP.SC.Game_BattlerBase_skillTpCost.call(this, skill);
    }
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
    return skill.iepDatas ? this.skillIepCost(skill, 'hp') : 0;
};

//=============================================================================
// スキルのコスト表示の修正
//=============================================================================

FTKR.IEP.SC.Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function(index) {
    if (FTKR.IEP.SC.drawAllCost) {
        var skill = this._data[index];
        if (skill) {
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            var len = this.drawSepSkillCost(skill, rect.x, rect.y, rect.width);
            this.drawItemName(skill, rect.x, rect.y, rect.width - len);
            this.changePaintOpacity(1);
        }
    } else {
        FTKR.IEP.SC.Window_SkillList_drawItem.call(this, index);
    }
};

Window_SkillList.prototype.drawSepSkillCost = function(skill, x, y, width) {
    var dx = x + width - this.costWidth();
    var len = this.costWidth();
    var samlen = 0;
    if (this._actor.skillMpCost(skill) > 0) {
        var param3 = [this._actor.skillMpCost(skill)];
        this.drawFormatTextEx(FTKR.IEP.SC.format.mpCost, dx, y, param3);
        dx -= len;
        samlen += len;
    }
    if (this._actor.skillTpCost(skill) > 0) {
        var param2 = [this._actor.skillTpCost(skill)];
        this.drawFormatTextEx(FTKR.IEP.SC.format.tpCost, dx, y, param2);
        dx -= len;
        samlen += len;
    }
    if (this._actor.skillHpCost(skill) > 0) {
        var param1 = [this._actor.skillHpCost(skill)];
        this.drawFormatTextEx(FTKR.IEP.SC.format.hpCost, dx, y, param1);
        samlen += len;
    }
    return samlen;
};

// 制御文字を使えるフォーマットテキスト描画関数
Window_SkillList.prototype.drawFormatTextEx = function(fmt, x, y, params) {
    var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
    return this.drawTextEx(text, x, y);
};

FTKR.IEP.SC.Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillHpCost(skill) > 0) {
        this.changeTextColor(this.textColor(21));
        this.drawText(this._actor.skillHpCost(skill), x, y, width, 'right');
    } else {
        FTKR.IEP.SC.Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    }
};

}//END