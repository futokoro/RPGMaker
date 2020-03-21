//=============================================================================
// オリジナルのパラメータを追加するプラグイン
// FTKR_AddOriginalParameters.js
// プラグインNo : 3
// 作成者     : フトコロ
// 作成日     : 2017/02/16
// 最終更新日 : 2020/03/21
// バージョン : v1.3.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AOP = true;

var FTKR = FTKR || {};
FTKR.AOP = FTKR.AOP || {};

//=============================================================================
/*:
 * @plugindesc v1.3.0 オリジナルのパラメータを追加するプラグイン
 * @author フトコロ
 *
 * @param Use Param Num
 * @desc 何個のオリジナルパラメータを使用するか
 * 最大10個まで設定できます
 * @default 4
 *
 * @param Max Level
 * @desc パラメータが上昇する最大のアクターレベルの設定
 * @default 99
 *
 * @param Max Param
 * @desc パラメータの最大値の設定
 * @default 999
 *
 * @param ---Parameter 0---
 * @default
 * 
 * @param Parameter 0 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 0 Code
 * @desc 計算式等で使用するコード名を設定
 * @default str
 *
 * @param Parameter 0 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 0 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 0 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 1---
 * @default
 * 
 * @param Parameter 1 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 1 Code
 * @desc 計算式等で使用するコード名を設定
 * @default vit
 *
 * @param Parameter 1 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 1 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 1 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 2---
 * @default
 * 
 * @param Parameter 2 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 2 Code
 * @desc 計算式等で使用するコード名を設定
 * @default int
 *
 * @param Parameter 2 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 2 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 2 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 3---
 * @default
 * 
 * @param Parameter 3 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 3 Code
 * @desc 計算式等で使用するコード名を設定
 * @default men
 *
 * @param Parameter 3 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 3 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 3 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 4---
 * @default
 * 
 * @param Parameter 4 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 4 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 4 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 4 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 4 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 5---
 * @default
 * 
 * @param Parameter 5 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 5 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 5 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 5 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 5 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 6---
 * @default
 * 
 * @param Parameter 6 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 6 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 6 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 6 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 6 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 7---
 * @default
 * 
 * @param Parameter 7 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 7 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 7 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 7 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 7 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 8---
 * @default
 * 
 * @param Parameter 8 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 8 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 8 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 8 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 8 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @param ---Parameter 9---
 * @default
 * 
 * @param Parameter 9 Text
 * @desc コードの表示名を設定
 * @default 
 *
 * @param Parameter 9 Code
 * @desc 計算式等で使用するコード名を設定
 * @default 
 *
 * @param Parameter 9 Current
 * @desc 計算式等で使用するコード名を設定(現在値)
 * 空欄の場合は、現在値を使用できません。
 * @default 
 *
 * @param Parameter 9 Max
 * @desc パラメータの最大値の設定
 * @default 
 *
 * @param Parameter 9 Min
 * @desc パラメータの最小値の設定
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ダメージの計算式に使用できる、オリジナルのパラメータを追加します。
 * 
 * 
 * オンラインマニュアル
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_AddOriginalParameters.ja.md
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1. 本プラグインを、プラグイン管理に追加してください。
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
 * v1.3.0 - 2020/03/21 : 機能追加、プラグイン内マニュアル削除
 *    1. アイテムやスキル使用時にパラメータを成長させる機能を追加。
 * 
 * v1.2.1 - 2018/10/16 : 機能追加
 *    1. オリジナルパラメータの入力ミス時のエラー表示機能を追加。(F12)
 * 
 * v1.2.0 - 2018/09/29 : 機能追加
 *    1. 各コードの表示名を設定する機能を追加。
 * 
 * v1.1.6 - 2017/11/05 : 不具合修正
 *    1. アイテム等に設定した現在値の減少効果が発生しない不具合を修正。
 * 
 * v1.1.5 - 2017/11/05 : 不具合修正、機能追加
 *    1. レベルアップやプラグインコマンドによるパラメータの増減が
 *       セーブデータに記録されない不具合を修正。
 *    2. プラグインコマンドに、パーティーの並び順を指定できる機能を追加。
 * 
 * v1.1.4 - 2017/04/30 : 不具合修正
 *    1. 現在値を回復させるアイテムが最大値の状態でも使用可能な不具合を修正。
 * 
 * v1.1.3 - 2017/04/25 : 不具合修正
 *    1. ステートに設定したパラメータの変更設定が反映されない不具合を修正。
 * 
 * v1.1.2 - 2017/04/14 : 機能追加
 *    1. プラグインコマンドを追加。
 * 
 * v1.1.1 - 2017/03/23 : 不具合修正
 *    1. <Parameter 6>以降のコードが使用できない不具合を修正。
 * 
 * v1.1.0 - 2017/03/17 : 機能追加、仕様変更
 *    1. HPやMPのように現在値と最大値を設定できる機能を追加。
 *    2. ステータス画面に表示する機能を削除。
 *    3. ノートタグにパラメータのコードを記述できるように変更。
 *    4. オリジナルパラメータを10個まで作れるように変更。
 * 
 * v1.0.1 - 2017/02/18 : プラグインパラメータ追加、不具合修正
 *    1. パラメータの最大値を、プラグインパラメータで変更できるようにした。
 *    2. definePropertiesの記述を見直し、パラメータのコードを計算式に
 *       使用した時に他の計算式を変更するプラグインと競合する不具合を修正した。
 * 
 * v1.0.0 - 2017/02/16 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_AddOriginalParameters');

    FTKR.AOP.useParamNum = Number(parameters['Use Param Num'] || 0);
    FTKR.AOP.maxLevel = Number(parameters['Max Level'] || 0);
    FTKR.AOP.maxParam = Number(parameters['Max Param'] || 0);

    FTKR.AOP.params = [
        {   text: String(parameters['Parameter 0 Text'] || ''),
            code:String(parameters['Parameter 0 Code'] || ''),
            current:String(parameters['Parameter 0 Current'] || ''),
            max:Number(parameters['Parameter 0 Max'] || 0),
            min:Number(parameters['Parameter 0 Min'] || 0),},
        {   text: String(parameters['Parameter 1 Text'] || ''),
            code:String(parameters['Parameter 1 Code'] || ''),
            current:String(parameters['Parameter 1 Current'] || ''),
            max:Number(parameters['Parameter 1 Max'] || 0),
            min:Number(parameters['Parameter 1 Min'] || 0),},
        {   text: String(parameters['Parameter 2 Text'] || ''),
            code:String(parameters['Parameter 2 Code'] || ''),
            current:String(parameters['Parameter 2 Current'] || ''),
            max:Number(parameters['Parameter 2 Max'] || 0),
            min:Number(parameters['Parameter 2 Min'] || 0),},
        {   text: String(parameters['Parameter 3 Text'] || ''),
            code:String(parameters['Parameter 3 Code'] || ''),
            current:String(parameters['Parameter 3 Current'] || ''),
            max:Number(parameters['Parameter 3 Max'] || 0),
            min:Number(parameters['Parameter 3 Min'] || 0),},
        {   text: String(parameters['Parameter 4 Text'] || ''),
            code:String(parameters['Parameter 4 Code'] || ''),
            current:String(parameters['Parameter 4 Current'] || ''),
            max:Number(parameters['Parameter 4 Max'] || 0),
            min:Number(parameters['Parameter 4 Min'] || 0),},
        {   text: String(parameters['Parameter 5 Text'] || ''),
            code:String(parameters['Parameter 5 Code'] || ''),
            current:String(parameters['Parameter 5 Current'] || ''),
            max:Number(parameters['Parameter 5 Max'] || 0),
            min:Number(parameters['Parameter 5 Min'] || 0),},
        {   text: String(parameters['Parameter 6 Text'] || ''),
            code:String(parameters['Parameter 6 Code'] || ''),
            current:String(parameters['Parameter 6 Current'] || ''),
            max:Number(parameters['Parameter 6 Max'] || 0),
            min:Number(parameters['Parameter 6 Min'] || 0),},
        {   text: String(parameters['Parameter 7 Text'] || ''),
            code:String(parameters['Parameter 7 Code'] || ''),
            current:String(parameters['Parameter 7 Current'] || ''),
            max:Number(parameters['Parameter 7 Max'] || 0),
            min:Number(parameters['Parameter 7 Min'] || 0),},
        {   text: String(parameters['Parameter 8 Text'] || ''),
            code:String(parameters['Parameter 8 Code'] || ''),
            current:String(parameters['Parameter 8 Current'] || ''),
            max:Number(parameters['Parameter 8 Max'] || 0),
            min:Number(parameters['Parameter 8 Min'] || 0),},
        {   text: String(parameters['Parameter 9 Text'] || ''),
            code:String(parameters['Parameter 9 Code'] || ''),
            current:String(parameters['Parameter 9 Current'] || ''),
            max:Number(parameters['Parameter 9 Max'] || 0),
            min:Number(parameters['Parameter 9 Min'] || 0),},
    ];

    Game_BattlerBase.MAX_AOP_PARAMS = 10;
    Game_BattlerBase.TRAIT_AOPPARAM = 99;
    Game_Action.EFFECT_GET_AOP = 990;
    Game_Action.EFFECT_GROW_AOP = 991;

    if (FTKR.AOP.useParamNum > Game_BattlerBase.MAX_AOP_PARAMS) {
        FTKR.AOP.useParamNum = Game_BattlerBase.MAX_AOP_PARAMS;
    }

    //=============================================================================
    // DataManager
    //=============================================================================

    FTKR.AOP.DatabaseLoaded = false;
    FTKR.AOP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!FTKR.AOP.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!FTKR.AOP.DatabaseLoaded) {
            DataManager.aopParamNotetags($dataActors);
            DataManager.aopParamNotetags($dataClasses);
            DataManager.aopParamPlusNotetags($dataWeapons);
            DataManager.aopParamPlusNotetags($dataArmors);
            DataManager.aopParamPlusNotetags($dataStates);
            DataManager.aopParamEquipNotetags($dataWeapons);
            DataManager.aopParamEquipNotetags($dataArmors);
            DataManager.aopParamEnemyNotetags($dataEnemies);
            DataManager.aopGetNotetags($dataItems);
            DataManager.aopGetNotetags($dataSkills);
            FTKR.AOP.DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.aopParamNotetags = function(group) {
        var note1 = /<(?:AOP)[ ](.+)[ ](?:LEVEL)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;
        var note2 = /<(?:AOP)[ ](.+)[ ](?:LEVEL)[ ](\d+)[ ](?:TO)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;
        var note3 = /<(?:AOP)[ ](.+)[ ](?:LEVEL)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)[ ](?:RAND)[ ](\d+)>/i;
        var note4 = /<(?:AOP)[ ](.+)[ ](?:LEVEL)[ ](\d+)[ ](?:TO)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)[ ](?:RAND)[ ](\d+)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.aopParams = [];
            obj.aopParamValues = [];

            for (var id = 0; id < FTKR.AOP.useParamNum + 1; id++) {
                obj.aopParamValues[id] = [];
                for (var lv = 0; lv < FTKR.AOP.maxLevel + 1; lv++) {
                    obj.aopParams[id] = 0;
                    obj.aopParamValues[id][lv] = 0;
                }
            }
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var level  = Number(RegExp.$2);
                    var value = Number(RegExp.$3);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParamValues[paramId][level] = value;
                } else if (line.match(note2)) {
                    var minlevel  = Number(RegExp.$2);
                    var maxlevel  = Number(RegExp.$3);
                    var value = Number(RegExp.$4);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    for (var t = minlevel; t < maxlevel + 1; t++) {
                        obj.aopParamValues[paramId][t] = value;
                    }
                } else if (line.match(note3)) {
                    var level  = Number(RegExp.$2);
                    var value = Number(RegExp.$3);
                    var rand = Number(RegExp.$4);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    var radvalue = value + Math.floor(Math.random()* rand * 2) - rand;
                    obj.aopParamValues[paramId][level] = radvalue > 0 ? radvalue : 0;
                } else if (line.match(note4)) {
                    var minlevel  = Number(RegExp.$2);
                    var maxlevel  = Number(RegExp.$3);
                    var value = Number(RegExp.$4);
                    var rand = Number(RegExp.$5);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    for (var t = minlevel; t < maxlevel + 1; t++) {
                        var radvalue = value + Math.floor(Math.random()* rand * 2) - rand;
                        obj.aopParamValues[paramId][t] = radvalue > 0 ? radvalue : 0;
                    }
                }
            }
        }
    };

    DataManager.aopParamPlusNotetags = function(group) {
        var note1 = /<(?:AOP)[ ](.+)[ ](?:PLUS):[ ]*(\d+)>/i;
        var note1a = /<(?:AOP)[ ](.+)[ ](?:PLUS):[ ]*(?:-)(\d+)>/i;
        var note2 = /<(?:AOP)[ ](.+)[ ](?:RATE):[ ]*(\d+)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.aopParams = [];
            obj.aopParamRates = [];
            for (var id = 0; id < Game_BattlerBase.MAX_AOP_PARAMS + 1; id++) {
                obj.aopParams[id] = 0;
                obj.aopParamRates[id] = 100;
            }

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParams[paramId] = value;
                } else if (line.match(note1a)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParams[paramId] = -value;
                } else if (line.match(note2)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParamRates[paramId] = value;
                }
            }
        }
    };

    DataManager.aopParamEquipNotetags = function(group) {
        var note1 = /<(?:AOP)[ ](.+)[ ](?:REQUIRE):[ ]*(\d+)>/i;
        var note2 = /<(?:AOP)[ ](.+)[ ](?:GROW):[ ]*(\d+)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.aopParamReqs = [];
            obj.aopParamGrows = [];
            for (var id = 0; id < Game_BattlerBase.MAX_AOP_PARAMS + 1; id++) {
                obj.aopParamReqs[id] = 0;
                obj.aopParamGrows[id] = 0;
            }

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParamReqs[paramId] = value;
                } else if (line.match(note2)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParamGrows[paramId] = value;
                }
            }
        }
    };

    DataManager.aopParamEnemyNotetags = function(group) {
        var note1 = /<(?:AOP)[ ](.+)[ ](?:VALUE):[ ]*(\d+)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var paramflag = false;
            obj.aopParams = [];

            for (var id = 0; id < FTKR.AOP.useParamNum + 1; id++) {
                obj.aopParams[id] = 0;
            }

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.aopParams[paramId] = value;
                }
            }
        }
    };

    DataManager.aopGetNotetags = function(group) {
        var note1 = /<(?:AOP)[ ](.+)[ ](?:GET):[ ]*(\d+)(?:%)>/i;
        var note2 = /<(?:AOP)[ ](.+)[ ](?:GET):[ ]*(\d+)>/i;
        var note3 = /<(?:AOP)[ ](.+)[ ](?:GET):[ ]*(?:-)(\d+)>/i;
        var note4 = /<(?:AOP)[ ](.+)[ ](?:GROW):[ ]*(\d+)(?:%)>/i;
        var note5 = /<(?:AOP)[ ](.+)[ ](?:GROW):[ ]*(\d+)>/i;
        var note6 = /<(?:AOP)[ ](.+)[ ](?:GROW):[ ]*(?:-)(\d+)>/i;
        
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var value = Number(RegExp.$2) * 0.01;
                    var paramId =this.getParamId(RegExp.$1, obj);
                    obj.effects.push(this.setGetAopEffect(paramId, value, 0));
                } else if (line.match(note2)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.effects.push(this.setGetAopEffect(paramId, 0, value));
                } else if (line.match(note3)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.effects.push(this.setGetAopEffect(paramId, 0, -value));
                } else if (line.match(note4)) {
                    var value = Number(RegExp.$2) * 0.01;
                    var paramId =this.getParamId(RegExp.$1, obj);
                    obj.effects.push(this.setGrowAopEffect(paramId, value, 0));
                } else if (line.match(note5)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.effects.push(this.setGrowAopEffect(paramId, 0, value));
                } else if (line.match(note6)) {
                    var value = Number(RegExp.$2);
                    var paramId = this.getParamId(RegExp.$1, obj);
                    
                    obj.effects.push(this.setGrowAopEffect(paramId, 0, -value));
                }
            }
        }
    };

    DataManager.getParamId = function(text, obj) {
        var paramId = -1;
        FTKR.AOP.params.forEach( function(param, i) {
            if (param.current === text || param.code === text) {
                paramId = i;
            } else if (text.match(/(?:param)[ ](\d+)/i) || text.match(/(\d+)/i)) {
                paramId = Number(RegExp.$1);
            }
        });
        if (paramId === -1) {
            console.error(
                '入力したパラメータは登録されていません。プラグインパラメータを見直してください\n',
                '入力内容：', text,'\n',
                '入力先　：', obj);
        }
        return paramId;
    };

    DataManager.setGetAopEffect = function(paramId, value1, value2) {
        return this.setEffect(Game_Action.EFFECT_GET_AOP, value1, value2, paramId);
    };

    DataManager.setGrowAopEffect = function(paramId, value1, value2) {
        return this.setEffect(Game_Action.EFFECT_GROW_AOP, value1, value2, paramId);
    };

    DataManager.setEffect = function(code, value1, value2, dataId) {
        return {code:code, value1:value1, value2:value2, dataId:dataId};
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    FTKR.AOP.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        FTKR.AOP.Game_Actor_setup.call(this, actorId);
        this.clearAopParamPlus();
        this.setupAopParams(actorId);
    };

    Game_Actor.prototype.setupAopParams = function(actorId) {
        var actor = $dataActors[actorId];
        for (var id = 0; id < FTKR.AOP.useParamNum + 1; id++) {
            actor.aopParams[id] = actor.aopParamValues[id][1];
            for (var lv = 2; lv < this._level + 1; lv++) {
                actor.aopParams[id] += actor.aopParamValues[id][lv];
            }
        }
    };

    FTKR.AOP.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        FTKR.AOP.Game_Actor_levelUp.call(this);
        this.aopParamGrows();
    };

    Game_Actor.prototype.aopParamGrows = function() {
        if (!this._aopParamPlus) this._aopParamPlus = [];
        for (var i = 0; i < FTKR.AOP.useParamNum; i++) {
            this._aopParamPlus[i] += this.aopParamGrow(i);
        }
    };

    Game_Actor.prototype.aopParamGrow = function(paramId) {
        return this.aopParamItemGrow(paramId);
    };

    Game_Actor.prototype.aopParamItemGrow = function(paramId) {
        var value = 0;
        this.equips().forEach(function(equip) {
            if (equip) value += equip.aopParamGrows[paramId];
        });
        return value;
    };

    Game_Actor.prototype.aopParamBase = function(paramId) {
        return this.aopActorParamBase(paramId) + this.aopClassParamBase(paramId);
    };

    Game_Actor.prototype.aopActorParamBase = function(paramId) {
        var value = 0;
        for(var i = 1; i <= this._level; i++){
            value += this.actor().aopParamValues[paramId][i];
        }
        return value;
    };

    Game_Actor.prototype.aopClassParamBase = function(paramId) {
        var value = 0;
        for(var i = 1; i <= this._level; i++){
            value += this.currentClass().aopParamValues[paramId][i];
        }
        return value;
    };

    Game_Actor.prototype.aopParamPlus = function(paramId) {
        var value = Game_Battler.prototype.aopParamPlus.call(this, paramId);
        return value + this.aopParamPlusEquips(paramId);
    };

    Game_Actor.prototype.aopParamPlusEquips = function(paramId) {
        var value = 0;
        this.equips().forEach(function(equip) {
            if (equip) value += equip.aopParams[paramId];
        });
        return value;
    };

    Game_Actor.prototype.aopParamRate = function(paramId) {
        var value = Game_Battler.prototype.aopParamRate.call(this, paramId);
        return value * this.aopParamRateEquips(paramId);
    };

    Game_Actor.prototype.aopParamRateEquips = function(paramId) {
        var value = 1;
        this.equips().forEach(function(equip) {
            if (equip) {
                value *= Math.abs(equip.aopParamRates[paramId]) / 100;
            }
        });
        return value;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    FTKR.AOP.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
    Game_Action.prototype.applyItemEffect = function(target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_GET_AOP:
                this.itemEffectGetAop(target, effect);
                return;
            case Game_Action.EFFECT_GROW_AOP:
                this.itemEffectGrowAop(target, effect);
                return;
            default:
                FTKR.AOP.Game_Action_applyItemEffect.call(this, target, effect);
                return;
        }
    };

    Game_Action.prototype.itemEffectGetAop = function(target, effect) {
        var value = (target.aopParam(effect.dataId) * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainCAop(effect.dataId, value);
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.itemEffectGrowAop = function(target, effect) {
        var value = target.aopParam(effect.dataId) * effect.value1 + effect.value2;
        value = Math.floor(value);
        if (value !== 0) {
            target.addAopParamPlus(effect.dataId, value);
            this.makeSuccess(target);
        }
    };

    FTKR.AOP.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
    Game_Action.prototype.testItemEffect = function(target, effect) {
        switch (effect.code) {
        case Game_Action.EFFECT_GET_AOP:
            var paramId = effect.dataId;
            return target._aop[paramId] < target.aopParam(paramId) || effect.value1 < 0 || effect.value2 < 0;
        case Game_Action.EFFECT_GROW_AOP:
            return true;
        default:
            return FTKR.AOP.Game_Action_testItemEffect.call(this, target, effect);
        }
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.aopParamBase = function(paramId) {
        return this.enemy().aopParams[paramId];
    };

    Game_Enemy.prototype.aopParamPlus = function(paramId) {
        return Game_Battler.prototype.aopParamPlus.call(this, paramId);
    };

    Game_Enemy.prototype.aopParamRate = function(paramId) {
        return Game_Battler.prototype.aopParamRate.call(this, paramId);
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================
    var prop = {};

    prop[FTKR.AOP.params[0].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 0); }, configurable: true };
    prop[FTKR.AOP.params[1].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 1); }, configurable: true };
    prop[FTKR.AOP.params[2].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 2); }, configurable: true };
    prop[FTKR.AOP.params[3].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 3); }, configurable: true };
    prop[FTKR.AOP.params[4].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 4); }, configurable: true };
    prop[FTKR.AOP.params[5].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 5); }, configurable: true };
    prop[FTKR.AOP.params[6].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 6); }, configurable: true };
    prop[FTKR.AOP.params[7].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 7); }, configurable: true };
    prop[FTKR.AOP.params[8].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 8); }, configurable: true };
    prop[FTKR.AOP.params[9].code] = { get: function() { return Game_BattlerBase.prototype.aopParam.call(this, 9); }, configurable: true };

    prop[FTKR.AOP.params[0].current] = { get: function() { return Game_BattlerBase.prototype._aop[0]; }, configurable: true };
    prop[FTKR.AOP.params[1].current] = { get: function() { return Game_BattlerBase.prototype._aop[1]; }, configurable: true };
    prop[FTKR.AOP.params[2].current] = { get: function() { return Game_BattlerBase.prototype._aop[2]; }, configurable: true };
    prop[FTKR.AOP.params[3].current] = { get: function() { return Game_BattlerBase.prototype._aop[3]; }, configurable: true };
    prop[FTKR.AOP.params[4].current] = { get: function() { return Game_BattlerBase.prototype._aop[4]; }, configurable: true };
    prop[FTKR.AOP.params[5].current] = { get: function() { return Game_BattlerBase.prototype._aop[5]; }, configurable: true };
    prop[FTKR.AOP.params[6].current] = { get: function() { return Game_BattlerBase.prototype._aop[6]; }, configurable: true };
    prop[FTKR.AOP.params[7].current] = { get: function() { return Game_BattlerBase.prototype._aop[7]; }, configurable: true };
    prop[FTKR.AOP.params[8].current] = { get: function() { return Game_BattlerBase.prototype._aop[8]; }, configurable: true };
    prop[FTKR.AOP.params[9].current] = { get: function() { return Game_BattlerBase.prototype._aop[9]; }, configurable: true };

    Object.defineProperties(Game_BattlerBase.prototype, prop);

    FTKR.AOP.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        FTKR.AOP.Game_BattlerBase_initMembers.call(this);
        this.initCurrentAopParams();
        this.clearAopParamPlus();
        this.clearAopBuffs();
    };

    Game_BattlerBase.prototype.initCurrentAopParams = function() {
        this._aop = [];
        for (var i = 0; i < FTKR.AOP.useParamNum; i++) {
            this._aop[i] = this.aopParamMax(i);
        };
    };

    FTKR.AOP.Game_BattlerBase_canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item){
        if (!FTKR.AOP.Game_BattlerBase_canEquip.call(this, item)) return false;
        for (var i = 0; i < FTKR.AOP.useParamNum; i++) {
            if (this.aopParam(i) < item.aopParamReqs[i]) return false;
        }
        return true;
    };

    Game_BattlerBase.prototype.clearAopParamPlus = function() {
        this._aopParamPlus = [0,0,0,0,0,0,0,0,0,0];
    };

    Game_BattlerBase.prototype.clearAopBuffs = function() {
        this._aopBuffs = [0,0,0,0,0,0,0,0,0,0];
        this._aopBuffTurns = [0,0,0,0,0,0,0,0,0,0];
    };

    Game_BattlerBase.prototype.setAopParamPlus = function(paramId, value) {
        this._aopParamPlus[paramId] = value || 0;
        this.refresh();
    };

    Game_BattlerBase.prototype.addAopParamPlus = function(paramId, value) {
        if (!this._aopParamPlus[paramId]) this._aopParamPlus[paramId] = 0;
        this._aopParamPlus[paramId] += value;
        this.refresh();
    };

    /*-----------------------------------
    aopParamBase()     :レベルアップ、装備等による固定値
    aopParamPlus()     :特徴による成長、プラグインコマンドによる増減値
    aopParamRate()     :装備等の特徴による積算値
    aopParamBuffRate() :強化による積算値

    $gameActor
    _aop              :現在値
    _maop             :最大値
    _aopParamPlus     :増減値

    $dataActors,$dataClasses
    aopParamValues    :各レベルでの増加値

    $dataItems,他
    aopParams         :初期値(固定値)

    -----------------------------------*/
    Game_BattlerBase.prototype.aopParam = function(paramId) {
        if (paramId >= FTKR.AOP.useParamNum) return 0;
        var value = this.aopParamBase(paramId) + this.aopParamPlus(paramId);
        value *= this.aopParamRate(paramId) * this.aopParamBuffRate(paramId);
        var maxValue = this.aopParamMax(paramId);
        var minValue = this.aopParamMin(paramId); //this.paramMin(2);
        var value = Math.round(Math.floor(value).clamp(minValue, maxValue));
        return value;
    };

    Game_BattlerBase.prototype.getAopParamBase = function(paramId) {
        if (paramId >= FTKR.AOP.useParamNum) return 0;
        var value = this.aopParamBase(paramId);
        var maxValue = this.aopParamMax(paramId);
        var minValue = this.aopParamMin(paramId); //this.paramMin(2);
        return Math.round(value.clamp(minValue, maxValue));
    }

    Game_BattlerBase.prototype.aopParamMax = function(paramId) {
        return Math.max(FTKR.AOP.maxParam, FTKR.AOP.params[paramId].max);
    };

    Game_BattlerBase.prototype.aopParamMin = function(paramId) {
        return Math.max(0, FTKR.AOP.params[paramId].min);
    };

    Game_BattlerBase.prototype.aopParamPlus = function(paramId) {
        return this._aopParamPlus[paramId] + this.aopParamPlusStates(paramId);
    };

    Game_BattlerBase.prototype.aopParamPlusStates = function(paramId) {
        var value = 0;
        this.states().forEach(function(state){
            if (state) value += state.aopParams[paramId];
        });
        return value;
    };

    Game_BattlerBase.prototype.aopParamRate = function(paramId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_AOPPARAM, paramId) * this.aopParamRateStates(paramId);
    };

    Game_BattlerBase.prototype.aopParamRateStates = function(paramId) {
        var value = 1;
        this.states().forEach(function(state){
            if (state) {
                value *= Math.abs(state.aopParamRates[paramId]) / 100;
            }
        });
        return value;
    };

    Game_BattlerBase.prototype.aopParamBuffRate = function(paramId) {
        return this._aopBuffs[paramId] * 0.25 + 1.0;
    };

    Game_BattlerBase.prototype.setCAop = function(paramId, aop) {
        this._aop[paramId] = aop;
        this.refresh();
    };

    Game_BattlerBase.prototype.gainCAop = function(paramId, value) {
        this.setCAop(paramId, this._aop[paramId] + value);
    };

    FTKR.AOP.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function() {
        FTKR.AOP.Game_BattlerBase_refresh.call(this);
        for (var i = 0; i < FTKR.AOP.useParamNum; i++) {
            this._aop[i] = this._aop[i].clamp(0, this.aopParam(i));
        };
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _AOP_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _AOP_Game_Interpreter_pluginCommand.call(this, command, args);
        if (/AOP_/i.test(command)) {
            command = command.replace(/AOP_/i, '');
            switch (true) {
                case /パラメータ変更/i.test(command):
                case /set_Parameters/i.test(command):
                    this.setAopParams(command, args);
                    break;
                case /パラメータ取得/i.test(command):
                case /get_Parameters/i.test(command):
                    this.getAopParams(command, args);
                    break;
            }
        }
    };

    Game_Interpreter.prototype.setAopParams = function(command, args) {
        var actor = this.setActor(args[0]);
        if(!actor) return;
        var paramId = DataManager.getParamId(args[1], actor);
        var base = actor._aopParamPlus[paramId];
        var value = this.calcValue(base, this.setNum(args[3]), args[2]);
        actor.setAopParamPlus(paramId, value);
    };

    Game_Interpreter.prototype.getAopParams = function(command, args) {
        var varId = this.setNum(args[0]);
        var actor = this.setActor(args[1]);
        if(!varId || !actor) return;
        var paramId = DataManager.getParamId(args[2], actor);
        $gameVariables.setValue(varId, actor.aopParam(paramId));
    };

    Game_Interpreter.prototype.setActor = function(arg) {
        var case1 = /ACTOR\((.+)\)/i;
        var case1j = /アクター\((.+)\)/i;
        var case2 = /PARTY\((.+)\)/i;
        var case2j = /パーティー\((.+)\)/i;
        if (arg.match(case1) || arg.match(case1j)) {
            return $gameActors.actor(this.setNum(RegExp.$1));
        } else if (arg.match(case2) || arg.match(case2j)) {
            return $gameParty.members()[this.setNum(RegExp.$1)];
        } else {
            return null;
        }
    };

    Game_Interpreter.prototype.calcValue = function(value1, value2, code) {
        switch (code) {
        case '加算':
        case '+':
            return value1 + value2;
        case '減算':
        case '-':
            return value1 - value2;
        case '積算':
        case '×':
        case '*':
            return value1 * value2;
        case '除算':
        case '／':
        case '/':
            return value1 / value2;
        case '剰余':
        case '％':
        case '%':
            return value1 % value2;
        case '代入':
        case '＝':
        case '=':
        default:
            return value2;
        }
    };

    Game_Interpreter.prototype.setNum = function(data) {
        var data1 = /v\[(\d+)\]/i;
        var data2 = /(\d+)/i;
        if (data.match(data1)) {
            return $gameVariables.value(Number(RegExp.$1));
        } else if (data.match(data2)) {
            return Number(RegExp.$1);
        } else {
            return 0;
        }
    };

}());//EOF