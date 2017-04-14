//=============================================================================
// アイテムとスキルの使用条件を拡張するプラグイン
// FTKR_ExItemConfig_Required.js
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIR = true;

var FTKR = FTKR || {};
FTKR.EIR = FTKR.EIR || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 アイテムとスキルの使用条件を拡張するプラグイン
 * @author フトコロ
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アイテムやスキルの使用条件を
 * より詳細に設定できます。
 * 
 * 1. 必要武器を二つ以上設定できます。
 * 
 * 2. 装備タイプを条件に設定できます。
 * 
 * 3. 使用者の必要パラメータ等の条件を設定できます。
 * 
 * 4. アイテムに使用条件を設定できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 使用条件の設定
 *-----------------------------------------------------------------------------
 * スキルに以下のノートタグを追記することで、使用条件の設定ができます。
 * 
 * <EIC 使用条件>
 * code
 * </EIC 使用条件>
 * 
 * [code に使用できる項目]
 * WtypeId: y1,y2,...
 * 武器タイプID: y1,y2,...
 *    :必要武器の武器タイプID y1,y2,... を追加します。
 * 
 * EtypeId: y1,y2,...
 * 装備タイプID: y1,y2,...
 *    :スキルを使用するために、特定の装備タイプが必要になります。
 *    :必要装備タイプID y1,y2,... を追加します。
 * 
 * Logic: type
 * 論理計算: type
 *    :必要武器や装備を複数設定した場合の、論理計算方法を設定します。
 *    :type に以下のコードを設定してください。
 *    : and - すべて装備する必要がある
 *    : or  - いずれか1つ装備すればよい
 *    : nand- 設定した装備の組合せをしてはいけない
 *    : nor - いずれか1つでも装備してはいけない
 *    :コードで設定しない場合は、'or'を適用します。
 * 
 * Condition: eval
 * 追加条件: 計算式
 *    :スキルの使用条件に 計算式(eval) で設定した条件を追加します。
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
 * 入力例)
 * スキルを使用するために必要な武器を、武器タイプ1,2に設定する。
 * ただし、武器タイプ1,2の両方を装備していなければならない。
 * また、使用するために、LV10以上とスイッチID1がONが必要になる。
 * <EIC 使用条件>
 * 武器タイプID: 1,2
 * 論理計算: and
 * 追加条件: a.level >= 10 && s[1]
 * </EIC 使用条件>
 * 
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
 * v1.0.0 - 2017/04/14 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EIR.parameters = PluginManager.parameters('FTKR_ExItemConfig_Required');

//=============================================================================
// DataManager
//=============================================================================

FTKR.EIR.DatabaseLoaded = false;
FTKR.EIR.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.EIR.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EIR.DatabaseLoaded) {
        this.eicReqiredNoteTags($dataSkills);
        this.eicReqiredNoteTags($dataItems);
        FTKR.EIR.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eicReqiredNoteTags = function(group) {
    var note1a = /<(?:EIC 使用条件)>/i;
    var note1aj = /<(?:EIC REQUIRED)>/i;
    var note1b = /<\/(?:EIC 使用条件)>/i;
    var note1bj = /<\/(?:EIC REQUIRED)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.seprequired = '';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                var text = '';
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.seprequired = text;
            } else if (setMode === 'anydata') {
                text += line + ';';
            }
        }
        this.makeEirData(obj);
        obj.seprequired = '';
    }
};

DataManager.makeEirData = function(skill) {
    skill.required = {
        wtypeIds:[],
        logic:'or',
        etypeIds:[],
        condition:'',
    };
    if (skill.requiredWtypeId1) skill.required.wtypeIds.push(skill.requiredWtypeId1);
    if (skill.requiredWtypeId2) skill.required.wtypeIds.push(skill.requiredWtypeId2);
    this.setSepRequired(skill);
};

DataManager.setSepRequired = function(skill) {
    var sepdata = skill.seprequired;
    if (sepdata) {
        var case1 = /(?:WTYPEID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case1j = /(?:武器タイプID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case2 = /(?:LOGIC):[ ]*(.+)/i;
        var case2j = /(?:論理計算):[ ]*(.+)/i;
        var case3 = /(?:ETYPEID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case3j = /(?:装備タイプID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
        var case4 = /(?:CONDITION):[ ]*(.+)/i;
        var case4j = /(?:追加条件):[ ]*(.+)/i;

        var datas = sepdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1) || data.match(case1j)) {
                var wtypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                skill.required.wtypeIds.addExceptForDup(wtypeIds);
            } else if(data.match(case2) || data.match(case2j)) {
                skill.required.logic = String(RegExp.$1);
            } else if (data.match(case3) || data.match(case3j)) {
                var etypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                etypeIds.forEach( function(etypeId) {
                    skill.required.etypeIds.push(etypeId);
                });
            } else if(data.match(case4) || data.match(case4j)) {
                skill.required.condition = String(RegExp.$1);
            }
        }
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

//書き換え
Game_Actor.prototype.isSkillWtypeOk = function(skill) {
    var sreq = skill.required;
    var logicOks = sreq.wtypeIds.filter( function(item) {
        return item > 0 && this.isWtypeEquipped(item);
    },this);
    return this.isLogicOk(sreq.wtypeIds, logicOks, sreq.logic);
};

Game_Actor.prototype.isSkillEtypeOk = function(skill) {
    var sreq = skill.required;
    if (!sreq.etypeIds.length) return true;
    var logicOks = sreq.etypeIds.filter( function(item) {
        return item || item > 0 && this.isEtypeEquipped(item);
    },this);
    return this.isLogicOk(sreq.etypeIds, logicOks, sreq.logic);
};

Game_Actor.prototype.isLogicOk = function(items, logicOks, logic) {
    switch (true) {
        case (/(?:nor)/i).test(logic):
            return items.length && !logicOks.length;
        case (/(?:or)/i).test(logic):
            return !items.length || logicOks.length;
        case (/(?:nand)/i).test(logic):
            return items.length !== logicOks.length;
        case (/(?:and)/i).test(logic):
            return items.length == logicOks.length;
    }
    return false;
};

Game_Actor.prototype.isEtypeEquipped = function(etypeId) {
    var items = this.equips();
    for (var i = 0; i < items.length ; i++) {
        if (DataManager.isWeapon(items[i]) && items[i].etypeId === etypeId ) return true;
        if (DataManager.isArmor(items[i]) && items[i].etypeId === etypeId ) return true;
    }
    return false;
};

Game_Actor.prototype.isSkillRequiredParamOk = function(skill) {
    return this.evalEirFormula(skill.required.condition, skill);
};

Game_Actor.prototype.evalEirFormula = function(formula, item) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

FTKR.EIR.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return FTKR.EIR.Game_BattlerBase_meetsSkillConditions.call(this, skill) &&
        this.isSkillRequiredParamOk(skill) && this.isSkillEtypeOk(skill);
};

Game_BattlerBase.prototype.isSkillRequiredParamOk = function(skill) {
    return true;
};

Game_BattlerBase.prototype.isSkillEtypeOk = function(skill) {
    return true;
};

FTKR.EIR.Game_BattlerBase_meetsItemConditions =
    Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return FTKR.EIR.Game_BattlerBase_meetsItemConditions.call(this, item) &&
        this.isSkillWtypeOk(item) && 
        this.isSkillRequiredParamOk(item) && 
        this.isSkillEtypeOk(item);
};
