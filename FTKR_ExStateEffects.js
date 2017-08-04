//=============================================================================
// ステートが掛かっている間に使用したスキルに別のスキルの特徴を追加するプラグイン
// FTKR_ExStateEffects.js
// 作成者     : フトコロ
// 作成日     : 2017/08/04
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESE = true;

var FTKR = FTKR || {};
FTKR.ESE = FTKR.ESE || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 ステートが掛かっている間に使用したスキルに別のスキルの特徴を追加する
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ステート付与中に使用したスキルに、別のスキルの特徴を追加することができます。
 * 
 * FTKR_ExItemConfig_Effect.jsと併用できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ステートの設定方法
 *-----------------------------------------------------------------------------
 * ステートのメモ欄に以下のタグを追加します。
 * 
 * <ESE_特徴追加: x>
 * 追加条件
 * </ESE_特徴追加>
 * 
 * または
 * 
 * <ESE_ADD_EFFECT: x>
 * 追加条件
 * </ESE_ADD_EFFECT>
 *    : x - スキルID
 *    :ここで設定したスキルIDの特徴が、使用したスキルに追加して発動します。
 * 
 * 
 * 以下の内容をタグ内に追記することで、特徴を追加する条件を設定できます。
 * 条件は複数設定できます。
 * 
 * スキルタイプ: タイプ
 * SKILLTYPE: type
 *    :指定したスキルタイプのスキルを使用した時のみ特徴を追加します。
 *    :タイプには、データベースのタイプで設定したスキルタイプを記載します。
 * 
 * 命中タイプ: タイプ
 * HITTYPE: type
 *    :指定した命中タイプのスキルを使用した時のみ特徴を追加します。
 *    :タイプには、以下の中のいずれかを記載します。
 *    : 必中
 *    : 物理攻撃
 *    : 魔法攻撃
 * 
 * ダメージタイプ: タイプ
 * DAMAGETYPE: type
 *    :指定したダメージタイプのスキルを使用した時のみ特徴を追加します。
 *    :タイプには、以下の中のいずれかを記載します。
 *    : HPダメージ
 *    : MPダメージ
 *    : HP回復
 *    : MP回復
 *    : HP吸収
 *    : MP吸収
 *    :※HPとMPは半角にすること
 * 
 * 属性: 属性名
 * ELEMENT: elementname
 *    :指定した属性のスキルを使用した時のみ特徴を追加します。
 *    :属性名には、データベースのタイプで設定した属性、または'通常攻撃'の
 *    :いずれかを記載します。
 * 
 * 
 * 記載例
 * 
 * <ESE_特徴追加: 10>
 * 命中タイプ:物理攻撃
 * 属性:通常攻撃
 * </ESE_特徴追加>
 * 
 * このステートが付加されているアクターが
 * 命中タイプが物理攻撃で属性が通常攻撃のスキルを使用した時に
 * スキルID10の特徴が追加発動します。
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
 * v1.0.0 - 2017/08/04 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    // 拡張型挟み込み形式のメタデータを読み取とってobjを返す
    var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
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

    //文字列の配列を拡張型挟み込み形式用の正規表現オブジェクトの配列に変換する
    var convertEntrapmentRegArrayEx = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                start:new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end  :new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    //正規表現オブジェクトの配列とdataをマッチさせる
    var matchRegs = function(data, regs, prop) {
        return regs.some(function(reg){
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    //findIndex を追加
    if (!Array.prototype.findIndex) {
      Array.prototype.findIndex = function(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return i;
          }
        }
        return -1;
      };
    }

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExStateEffects');

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ESE_DatabaseLoaded = false;
    var _ESE_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_ESE_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ESE_DatabaseLoaded) {
            this.eseSkillConditionNotetags($dataStates);
            _ESE_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.eseSkillConditionNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.eseCon = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['ESE_特徴追加', 'ESE_ADD_EFFECTS']);
            this.readEseConditionMetaDatas(obj, datas);
        }
    };

    DataManager.readEseConditionMetaDatas = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            obj.eseCon[t] = {};
            obj.eseCon[t].skillId = Number(metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /(.+):[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case 'スキルタイプ':
                    case 'SKILLTYPE':
                        obj.eseCon[t].skilltype = match[2];
                        break;
                    case '命中タイプ':
                    case 'HITTYPE':
                        obj.eseCon[t].hitType = match[2];
                        break;
                    case 'ダメージタイプ':
                    case 'DAMAGETYPE':
                        obj.eseCon[t].damageType = match[2];
                        break;
                    case '属性':
                    case 'ELEMENT':
                        obj.eseCon[t].element = match[2];
                        break;
                }
            }
        }
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _ESE_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        this.applyEseStateEffects(target);
        _ESE_Game_Action_applyItemUserEffect.call(this, target);
    };

    Game_Action.prototype.applyEseStateEffects = function(target){
        var skillIds = [];
        this.subject().states().forEach(function(state){
            state.eseCon.forEach(function(condition){
                if (this.checkActionItemConditions(condition)) skillIds.push(condition.skillId);
            },this);
        },this);
        skillIds.forEach(function(skillId) {
            var skill = $dataSkills[skillId];
            if (skill) {
                skill.effects.forEach(function(effect){
                    this.applyItemEffect(target, effect);
                },this);
            }
        }, this);
    };

    Game_Action.prototype.checkActionItemConditions = function(conditions) {
        var c = conditions;
        var item = this.item();
        if (c.skilltype) {
            if (c.skilltype === 'なし') {
                var skilltype = 0;
            } else {
                var skilltype = $dataSystem.skilltypes.findIndex(function(type) {
                    return type === c.skilltype;
                });
            }
            if (skilltype !== item.stypeId) return false;
        }
        if (c.hitType) {
            var hitType = ['必中','物理攻撃','魔法攻撃'].findIndex(function(type){
                return type === c.hitType;
            });
            if (hitType !== item.hitType) return false;
        }
        if (c.damageType) {
            var damageType = ['なし','HPダメージ','MPダメージ','HP回復','MP回復','HP吸収','MP吸収'].findIndex(function(type){
                return type === c.damageType;
            });
            if (damageType !== item.damage.type) return false;
        }
        if (c.element) {
            if (c.element === '通常攻撃') {
                var element = -1;
            } else {
                var element = $dataSystem.elements.findIndex(function(type) {
                    return type === c.element;
                });
            }
            if (element !== item.damage.elementId) return false;
        }
        return true;
    };

}());//EOF
