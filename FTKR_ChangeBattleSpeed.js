//=============================================================================
// バトル中の各種速度を変更するプラグイン
// FTKR_ChangeBattleSpeed.js
// 作成者     : フトコロ
// 作成日     : 2018/02/26
// 最終更新日 : 2018/02/27
// バージョン : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CBS = true;

var FTKR = FTKR || {};
FTKR.CBS = FTKR.CBS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.2 バトル中の各種速度を変更するプラグイン
 * @author フトコロ
 *
 * @param Message Speed
 * @desc バトルログの表示速度を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"16"}
 *
 * @param Aniamtion Base Delay
 * @desc アニメーションを再生するまでのウェイト時間を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"8"}
 *
 * @param Animation Next Delay
 * @desc 複数の対象に別々にアニメーションを表示する場合の２キャラ目以降の再生ウェイト時間を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"12"}
 *
 * @param Aniamtion Enemy Delay
 * @desc 敵がアニメーションを再生するまでのウェイト時間を設定します。Base Delayと別に処理されます。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"0"}
 *
 * @param Animation Rate
 * @desc アニメーションの１フレームごとの表示時間を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"4"}
 *
 * @param Damage Popup Duration
 * @desc ダメージのポップアップ時間を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"90"}
 *
 * @param Enemy Collapse Duration
 * @desc 敵キャラの消滅時間を設定します。
 * @type struct<variable>
 * @default {"variableId":"0","initValue":"32"}
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * バトル中の以下の各処理時間をゲーム内変数で管理することができます。
 * 
 * 変更可能な処理
 * ・バトルログの表示時間　　　　　　　　　　　（MVデフォルト：16）
 * ・アニメーションを開始するまでのディレイ時間（MVデフォルト：8）
 * ・アニメーションのフレームごとの表示時間　　（MVデフォルト：4）
 * ・敵のアニメーション開始前のディレイ時間　　（MVデフォルトにはありません）　　　　　
 * ・ダメージポップアップの時間　　　　　　　　（MVデフォルト：90）
 * ・敵通常キャラの消滅時間　　　　　　　　　　（MVデフォルト：32）
 * 
 * プラグインパラメータで、変数ID(variableId)を指定しない場合は
 * 初期値(initValue)を固定で使用します。
 * 
 * 初期値も設定しない(空欄にする)場合は、MVデフォルトの値を使用します。
 * 
 * 
 * なお、敵のアニメーションを開始する前のディレイ時間は
 * 「アニメーションを開始するまでのディレイ時間」+
 * 　　　　　　　「敵のアニメーション開始前のディレイ時間」
 * という結果になります。
 * 
 * 「アニメーションを開始するまでのディレイ時間」はアクターも使用するため
 * 敵の行動だけ遅くしたい場合は、「敵のアニメーション開始前のディレイ時間」で
 * 調整してください。
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
 * v1.0.2 - 2018/02/27 : 仕様変更
 *    1. プラグインパラメータで変数IDを設定しない場合に、初期値を設定していれば
 *       その値を固定で使用するように変更。
 * 
 * v1.0.1 - 2018/02/27 : 機能追加
 *    1. 敵だけアニメーション開始前のディレイ時間を変更する機能を追加。
 * 
 * v1.0.0 - 2018/02/26 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~variable:
 * @param variableId
 * @desc 数値を管理する変数IDを設定します。
 * @type variable
 * @default 0
 *
 * @param initValue
 * @desc 変数の初期値を設定します。
 * @type number
 * @default 1
 * @min 1
 * 
*/

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

    var setPluginStructVariable = function(param) {
        param = paramParse(parameters[param]);
        return param instanceof Object ? param : {initValue:0, variableId:0};
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ChangeBattleSpeed');

    FTKR.CBS = {
        messageSpeed       : setPluginStructVariable('Message Speed'),
        animationBaseDelay : setPluginStructVariable('Aniamtion Base Delay'),
        animationNextDelay : setPluginStructVariable('Animation Next Delay'),
        animationRate      : setPluginStructVariable('Animation Rate'),
        damageDuration     : setPluginStructVariable('Damage Popup Duration'),
        collapseDuration   : setPluginStructVariable('Enemy Collapse Duration'),
        animationEnemyDelay: setPluginStructVariable('Aniamtion Enemy Delay'),
    };

    var getParamVariableValue = function(param, base){
        return param.variableId ? $gameVariables.value(param.variableId) :
            !isNaN(param.initValue) ? param.initValue : base;
    };

    var setParamVariableValue = function(param) {
        if (param.variableId) $gameVariables.setValue(param.variableId, param.initValue);
    };

    var _CBS_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _CBS_DataManager_setupNewGame.call(this);
        for (var prop in FTKR.CBS) {
            setParamVariableValue(FTKR.CBS[prop]);
        }
    };

    var _CBS_Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;
    Window_BattleLog.prototype.messageSpeed = function() {
        return getParamVariableValue(FTKR.CBS.messageSpeed, _CBS_Window_BattleLog_messageSpeed.call(this));
    };

    var _CBS_Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function(subject, targets, animationId) {
        this._subject = subject;
        _CBS_Window_BattleLog_showAnimation.call(this, subject, targets, animationId);
    };

    Window_BattleLog.prototype.animationEnemyDelay = function() {
        return getParamVariableValue(FTKR.CBS.animationEnemyDelay, 0);
    };

    var _CBS_Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
    Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
        _CBS_Window_BattleLog_showEnemyAttackAnimation.call(this, subject, targets);
        this._waitCount = this.animationEnemyDelay();
    };

    var _CBS_Window_BattleLog_animationBaseDelay = Window_BattleLog.prototype.animationBaseDelay;
    Window_BattleLog.prototype.animationBaseDelay = function() {
        var delay = this._subject && !this._subject.isActor() ? this.animationEnemyDelay() : 0;
        return delay + getParamVariableValue(FTKR.CBS.animationBaseDelay, _CBS_Window_BattleLog_animationBaseDelay.call(this));
    };

    var _CBS_Window_BattleLog_animationNextDelay = Window_BattleLog.prototype.animationNextDelay;
    Window_BattleLog.prototype.animationNextDelay = function() {
        return getParamVariableValue(FTKR.CBS.animationNextDelay, _CBS_Window_BattleLog_animationNextDelay.call(this));
    };


    var _CBS_Sprite_Enemy_startCollapse = Sprite_Enemy.prototype.startCollapse;
    Sprite_Enemy.prototype.startCollapse = function() {
        _CBS_Sprite_Enemy_startCollapse.call(this);
        var varId = FTKR.CBS.collapseDuration.variableId;
        if (varId) {
            this._effectDuration = $gameVariables.value(varId);
        }
    };

    var _CBS_Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
    Sprite_Animation.prototype.initMembers = function() {
        _CBS_Sprite_Animation_initMembers.call(this);
        var varId = FTKR.CBS.animationRate.variableId;
        if (varId) {
            this._rate = $gameVariables.value(varId);
        }
    };

    var _CBS_Sprite_Animation_setupRate = Sprite_Animation.prototype.setupRate;
    Sprite_Animation.prototype.setupRate = function() {
        var varId = FTKR.CBS.animationRate.variableId;
        if (varId) {
            this._rate = $gameVariables.value(varId);
        } else {
            _CBS_Sprite_Animation_setupRate.call(this);
        }
    };

    var _CBS_Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function() {
        _CBS_Sprite_Damage_initialize.call(this);
        var varId = FTKR.CBS.damageDuration.variableId;
        if (varId) {
            this._duration = $gameVariables.value(varId);
        }
    };

}());//EOF
