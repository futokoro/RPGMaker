//=============================================================================
// 装備やステート等の特徴を詳細に設定できるプラグイン
// FTKR_ExTraitSetting.js
// プラグインNo : 60
// 作成者     : フトコロ
// 作成日     : 2017/12/02
// 最終更新日 : 2018/02/17
// バージョン : v1.0.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ETS = true;

var FTKR = FTKR || {};
FTKR.ETS = FTKR.ETS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.4 装備やステート等の特徴を詳細に設定できる
 * @author フトコロ
 *
 * @param 計算方法
 * @desc 特徴の数値で複数の積算値や除算値が有る場合の計算方法
 * @type select
 * @option 合計値を積算
 * @value 0
 * @option 個別に積算
 * @value 1
 * @default 1
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * アクター、職業、装備、エネミー、ステートの特徴を詳細に設定できるようになります。
 * 
 * 増減させる数値を、スクリプトで記述したり、通常、加算だけするパラメータや
 * 積算のみのパラメータなども、加算積算を自由に設定することができます。
 * 
 * 
 * 設定可能な特徴は、以下の通りです。
 * ・属性有効度
 * ・弱体有効度
 * ・ステート有効度
 * ・通常能力値
 * ・追加能力値
 * ・特殊能力値
 * ・攻撃時ステート
 * ・攻撃速度補正
 * ・攻撃追加回数
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
 * 機能
 *-----------------------------------------------------------------------------
 * データベースのメモ欄に以下のコードを記載することで、特徴を設定できます。
 * 
 * <ETS_特徴: n>
 * 内容:x
 * 数値:y
 * 計算:z
 * </ETS_特徴>
 * 
 * または
 * 
 * <ETS_TRAITS: n>
 * Contents:x
 * Value:y
 * Calc:z
 * </ETS_TRAITS>
 * 
 * n の値は、データベースの特徴欄の一番上を 0 とした並び順を指定します。
 * 例えば、２番目のパラメータの特徴を設定したい場合は、n = 1 となります。
 * 
 * 
 * ＜内容(contents):x＞
 * パラメータであれば最大HPや攻撃力といった、特徴の内容を x に変更します。
 * x はスクリプトの計算式で記述できます。
 * 「内容:x」を記述しない場合は、データベース上の値を使用します。
 * 
 * ＜数値(value):y＞
 * 特徴を増減する数値を y に変更します。
 * y はスクリプトの計算式で記述できます。
 * 「数値:y」を記述しない場合は、データベース上の値を使用します。
 * 
 * ＜計算(calc):z＞
 * 設定した数値をどのように計算するか指定します。
 * +, -, *, / のいずれかの記号を記載することで、デフォルトでは加算のみの
 * 特徴であっても、積算などの計算が可能になります。
 * 記号は半角で入力してください。
 * 「計算:z」を記述しない場合は、データベース上の計算式を使用します。
 * 
 * 
 * ＜内容と数値で記述するスクリプトについて＞
 * ダメージ計算式のように、ゲーム内変数や、アクター、エネミーのパラメータを
 * 参照できます。
 * ただし、命中率の特徴を変更する際に、数値で命中率を参照するなど、
 * 同じパラメータを参照してはいけません。エラーになります。
 * 
 * スクリプトには、以下のコードを使用できます。
 *  a.param - 対象者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 
 * ＜複数の同じ特徴の数値の合計方法について＞
 * 特徴の合計方法は以下の通りです。
 * プラグインパラメータで設定できます。
 * 
 * １．合計値を積算の場合
 * 
 * (加算と減算の数値の合計)　×　(1 or 乗算の数値の合計) / (1 or 除算の数値の合計)
 * 
 * 例えば、攻撃力の特徴が以下のように複数あった場合
 * 　　+10, -4, *1.2, *0.5, /0.2, /1.4
 * 
 * この合計値は以下になります。
 * 　　(+10 -4) × (1.2 + 0.5) / (0.2 + 1.4) = 6
 * 
 * 
 * ２．個別に積算の場合(MVデフォルトの計算方法)
 * 
 * (加算と減算の数値の合計)　×　(1 * 乗算値1 * 積算値２ * ... / 除算値1 / 除算値2 /...)
 * 
 * 例えば、攻撃力の特徴が以下のように複数あった場合
 * 　　+10, -4, *1.2, *0.5, /0.2, /1.4
 * 
 * この合計値は以下になります。
 * 　　(+10 -4) × (1 * 1.2 * 0.5 / 0.2 / 1.4) = 13
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
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.4 - 2018/02/17 : 不具合修正、仕様変更
 *    1. 計算(calc)コードを設定しない場合に正しく計算できていない不具合を修正。
 *    2. プラグインパラメータ<計算方法>の初期値を変更。
 * 
 * v1.0.3 - 2018/01/20 : 不具合修正
 *    1. スクリプト入力時に三項演算子を使うと反映されない不具合を修正。
 * 
 * v1.0.2 - 2017/12/03 : 仕様変更
 *    1. プラグインパラメータ追加して、積算除算の計算処理を見直し。
 * 
 * v1.0.1 - 2017/12/03 : 不具合修正
 *    1. 積算除算の計算処理が間違っていた不具合を修正。
 * 
 * v1.0.0 - 2017/12/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExTraitSetting');

    FTKR.ETS.multi = Number(parameters['計算方法'] || 0);

    //=============================================================================
    // 自作関数(グローバル)
    //=============================================================================

    FTKR.gameData = FTKR.gameData || {
        user   :null,
        target :null,
        item   :null,
        number :0,
        owner  :null,
    };

    if (!FTKR.setGameData) {
    FTKR.setGameData = function(user, target, item, number, owner) {
        FTKR.gameData = {
            user   :user || null,
            target :target || null,
            item   :item || null,
            number :number || 0,
            owner  :owner || null
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
            var c = datas.owner;
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

    var typeCalc = function(code) {
        switch (code) {
            case Game_BattlerBase.TRAIT_XPARAM:
            case Game_BattlerBase.TRAIT_ATTACK_STATE:
            case Game_BattlerBase.TRAIT_ATTACK_SPEED:
            case Game_BattlerBase.TRAIT_ATTACK_TIMES:
                return '+';
            case Game_BattlerBase.TRAIT_PARAM:
            case Game_BattlerBase.TRAIT_SPARAM:
            case Game_BattlerBase.TRAIT_ELEMENT_RATE:
            case Game_BattlerBase.TRAIT_DEBUFF_RATE:
            case Game_BattlerBase.TRAIT_STATE_RATE:
                return '*';
        }
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ETS_DatabaseLoaded = false;
    var _ETS_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_ETS_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ETS_DatabaseLoaded) {
            this.etsTraitNotetags($dataActors);
            this.etsTraitNotetags($dataClasses);
            this.etsTraitNotetags($dataWeapons);
            this.etsTraitNotetags($dataArmors);
            this.etsTraitNotetags($dataStates);
            this.etsTraitNotetags($dataEnemies);
            _ETS_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.etsTraitNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var datas = readEntrapmentCodeToTextEx(obj, ['ETS_特徴', 'ETS_TRAITS']);
            this.readTraitMetaData(obj, datas);
        }
    };

    DataManager.readTraitMetaData = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            var dataId = Number(metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            if (!datas || !obj.traits[dataId]) continue;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /([^:\s]+)[ ]*:[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch(match[1].toUpperCase()) {
                case '内容':
                case 'CONTENTS':
                    obj.traits[dataId].contents = match[2];
                    break;
                case '数値':
                case 'VALUE':
                    obj.traits[dataId].etsValue = match[2];
                    break;
                case '計算':
                case 'CALC':
                    obj.traits[dataId].calc = match[2];
                    break;
                }
            }
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    var matchTraitOperator = function(trait, ope) {
        return (ope === 'pi' && !/[\+\-]/.test(trait.calc) ||
          ope === 'sum' && !/[\*\\]/.test(trait.calc));
    };

    var matchTraitDataId = function(trait, id) {
        return trait.contents ? FTKR.evalFormula(trait.contents) === id : trait.dataId === id;
    };

    //------------------------------------------------------------------------
    //計算タグの演算子でフィルターを掛ける
    //------------------------------------------------------------------------
    Game_BattlerBase.prototype.traitsWithIdOperator = function(code, id, ope) {
        FTKR.setGameData(this);
        return this.allTraits().filter(function(trait) {
            return trait.code === code && matchTraitDataId(trait, id) &&
                matchTraitOperator(trait, ope);
        },this);
    };

    Game_BattlerBase.prototype.traitsWithOperator = function(code, ope) {
        FTKR.setGameData(this);
        return this.traits(code).filter(function(trait) {
            return matchTraitOperator(trait, ope);
        },this);
    };

    //------------------------------------------------------------------------
    //特徴の積算
    //------------------------------------------------------------------------
    Game_BattlerBase.prototype.traitsEtsPi = function(code, id, init) {
        var value = FTKR.ETS.multi ? this.traitsEtsMultiDiv(code, id, init) :
            this.traitsEtsMulti(code, id, init) / this.traitsEtsDiv(code, id, init);
        return value;
    }

    Game_BattlerBase.prototype.traitsEtsMultiDiv = function(code, id, init) {
        FTKR.setGameData(this);
        return this.traitsWithIdOperator(code, id, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '/':
                return r / value;
            case '*':
                return r * value;
            case '+':
            case '-':
                return r;
            default:
                return init ? r * value : r;
            }
        }, 1);
    };

    Game_BattlerBase.prototype.traitsEtsMulti = function(code, id, init) {
        FTKR.setGameData(this);
        return this.traitsWithIdOperator(code, id, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '+':
            case '-':
            case '/':
                return r;
            case '*':
                return r + value;
            default:
                return init ? r + value : r;
            }
        }, 1);
    };

    Game_BattlerBase.prototype.traitsEtsDiv = function(code, id, init) {
        FTKR.setGameData(this);
        return this.traitsWithIdOperator(code, id, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '/':
                return r + value;
            case '+':
            case '-':
            default:
                return r;
            }
        }, 1);
    };

    Game_BattlerBase.prototype.traitsEtsPiAll = function(code, init) {
        return FTKR.ETS.multi ? this.traitsEtsMultiDivAll(code, init) :
            this.traitsEtsMultiAll(code, init) / this.traitsEtsDivAll(code, init);
    }

    Game_BattlerBase.prototype.traitsEtsMultiDivAll = function(code, init) {
        FTKR.setGameData(this);
        return this.traitsWithOperator(code, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '/':
                return r / value;
            case '*':
                return r * value;
            case '+':
            case '-':
                return r;
            default:
                return init ? r * value : r;
            }
        }, 1);
    };

    Game_BattlerBase.prototype.traitsEtsMultiAll = function(code, init) {
        FTKR.setGameData(this);
        return this.traitsWithOperator(code, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '+':
            case '-':
            case '/':
                return r;
            case '*':
                return r + value;
            default:
                return init ? r + value : r;
            }
        }, 1);
    };

    Game_BattlerBase.prototype.traitsEtsDivAll = function(code, init) {
        FTKR.setGameData(this);
        return this.traitsWithOperator(code, 'pi').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '/':
                return r + value;
            default:
                return r;
            }
        }, 1);
    };
    //------------------------------------------------------------------------
    //特徴の加算
    //------------------------------------------------------------------------
    Game_BattlerBase.prototype.traitsEtsSum = function(code, id, init) {
        FTKR.setGameData(this);
        return this.traitsWithIdOperator(code, id, 'sum').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '-':
                return r - value;
            case '+':
                return r + value;
            case '*':
            case '/':
                return r;
            default:
                return !init ? r + value : r;
            }
        }, 0);
    };

    Game_BattlerBase.prototype.traitsEtsSumAll = function(code, init) {
        FTKR.setGameData(this);
        return this.traitsWithOperator(code, 'sum').reduce(function(r, trait) {
            var value = trait.etsValue ? FTKR.evalFormula(trait.etsValue) : trait.value;
            var calc = trait.calc || typeCalc(code);
            switch(calc) {
            case '-':
                return r - value;
            case '+':
                return r + value;
            case '*':
            case '/':
                return r;
            default:
                return !init ? r + value : r;
            }
        }, 0);
    };

    //------------------------------------------------------------------------
    // 特徴の合計
    //------------------------------------------------------------------------
    Game_BattlerBase.prototype.traitsEtsCalc = function(code, id, init) {
        return (init + this.traitsEtsSum(code, id, init)) * this.traitsEtsPi(code, id, init);
    };

    Game_BattlerBase.prototype.traitsEtsAllCalc = function(code, init) {
        return (init + this.traitsEtsSumAll(code, init)) * this.traitsEtsPiAll(code, init);
    };

    //------------------------------------------------------------------------
    // 特徴の計算の書き換え
    //------------------------------------------------------------------------
    var _ETS_Game_BattlerBase_paramPlus = Game_BattlerBase.prototype.paramPlus;
    Game_BattlerBase.prototype.paramPlus = function(paramId) {
        return _ETS_Game_BattlerBase_paramPlus.call(this, paramId) + this.traitsEtsSum(Game_BattlerBase.TRAIT_PARAM, paramId, 0);
    };

    Game_BattlerBase.prototype.paramRate = function(paramId) {
        return this.traitsEtsPi(Game_BattlerBase.TRAIT_PARAM, paramId, 1);
    };

    Game_BattlerBase.prototype.xparam = function(xparamId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_XPARAM, xparamId, 0);
    };

    Game_BattlerBase.prototype.sparam = function(sparamId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_SPARAM, sparamId, 1);
    };

    Game_BattlerBase.prototype.elementRate = function(elementId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId, 1);
    };

    Game_BattlerBase.prototype.debuffRate = function(paramId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId, 1);
    };

    Game_BattlerBase.prototype.stateRate = function(stateId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_STATE_RATE, stateId, 1);
    };

    Game_BattlerBase.prototype.attackStatesRate = function(stateId) {
        return this.traitsEtsCalc(Game_BattlerBase.TRAIT_ATTACK_STATE, stateId, 0);
    };

    Game_BattlerBase.prototype.attackSpeed = function() {
        return this.traitsEtsAllCalc(Game_BattlerBase.TRAIT_ATTACK_SPEED, 0);
    };

    Game_BattlerBase.prototype.attackTimesAdd = function() {
        return Math.max(this.traitsEtsAllCalc(Game_BattlerBase.TRAIT_ATTACK_TIMES, 0), 0);
    };

}());//EOF
