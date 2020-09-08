//=============================================================================
// 防御の効果を拡張するプラグイン
// FTKR_ExGuardEffect.js
// プラグインNo : 79
// 作成者     : フトコロ
// 作成日     : 2018/04/15
// 最終更新日 : 2020/09/08
// バージョン : v1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EGF = true;

var FTKR = FTKR || {};
FTKR.EGF = FTKR.EGF || {};

//=============================================================================
/*:
 * @plugindesc v1.0.2 防御の効果を拡張するプラグイン
 * @author フトコロ
 *
 * @param Guard Effect Value
 * @desc 防御が成功した時のダメージ低減値を設定します。
 * @default 2
 * @type number
 * @min 1
 * @decimals 2
 *
 * @param Disable Damage Motion
 * @desc 防御が成功した時はダメージモーションを実行しない。
 * @type boolean
 * @on 実行しない
 * @off 実行する
 * @default true
 *
 * @param Actor Guard Text
 * @desc アクターの防御が成功した時のバトルログの表示テキストを設定します。
 * @default %1は攻撃を防御した！
 * 
 * @param Actor Guard Damage SE
 * @desc アクターの防御が成功した時のダメージSEを指定します。
 * @default {"name":"Damage5","volume":"90","pitch":"100","pan":"0"}
 * @type struct<sound>
 * 
 * @param Enemy Guard Text
 * @desc エネミーの防御が成功した時のバトルログの表示テキストを設定します。
 * @default %1に攻撃を防御された！
 * 
 * @param Enemy Guard Damage SE
 * @desc エネミーの防御が成功した時のダメージSEを指定します。
 * @default {"name":"Damage4","volume":"90","pitch":"100","pan":"0"}
 * @type struct<sound>
 * 
 * @param TRAIT_GUARD_RATE
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 101
 * @type number
 * @min 0
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを導入すると、ダメージを受けるときに防御判定を行い
 * 判定に成功すると、防御コマンドを使用していなくても防御できるようになります。
 * 
 * ＜防御判定＞
 * 防御判定には、このプラグイン専用の防御率を使用します。
 * ※防御ダメージ率とは別です。
 * 
 * この防御率は、アクターやクラス、装備、ステート、エネミーのメモ欄に
 * 以下のタグを記載すると設定できます。
 * 
 * <EGF_防御率: x>
 * <EGF_GUARD_RATE: x>
 *    x : 防御率の値を設定します。0 = 0%、100 = 100% です。
 *        スクリプト形式で入力できます。
 * 
 * そのキャラのすべての特徴の防御率を合計した値が、最終的な防御率になります。
 * 
 * 
 * ＜判定に成功すると＞
 * 防御判定に成功すると、ダメージを受けたときのモーションが
 * 防御モーションに変わります。(*1)
 * また、この時のダメージSEや、バトルログのメッセージ(*2)を
 * プラグインパラメータで設定できます。
 * 
 * (*1)
 * この状態では、防御中はダメージモーションを表示しません。
 * 元のダメージモーションに戻したい場合は、プラグインパラメータ
 * Disable Damage Motion の設定を変えてください。
 * 
 * (*2)
 * バトルログのメッセージは、プラグインパラメータを空欄にすると表示しません。
 * また、このメッセージは、防御コマンド実行時も表示します。
 * 
 * 
 * ＜防御時のダメージ量＞
 * 防御時に、受けるダメージ量は以下の計算式で算出します。
 * この計算は、防御コマンド実行時も同じです。
 * 
 * ダメージ量 ＝ 防御前のダメージ量 ÷ (ダメージ低減値 × 特徴の防御ダメージ率)
 * 
 *    ダメージ低減値：プラグインパラメータ Guard Effect Value で設定した値
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
 * Copyright (c) 2020 Futokoro
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
 * v1.0.2 - 2020/09/08 : 不具合修正
 *      1. HP回復時にも防御を実行していた不具合を修正。
 * 
 * v1.0.1 - 2020/02/11 : 不具合修正
 *      1. プラグインパラメータDisable Damage Motionの初期値を修正。
 *      2. 防御率の設定値が2倍に計算される不具合を修正。
 *      3. FTKR_ExSvMotionとの競合回避。
 * 
 * v1.0.0 - 2018/04/15 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~sound:
 * @param name
 * @desc SEの名前を指定します。
 * @default Damage4
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param volume
 * @desc SEの音量を指定します。
 * @default 90
 * @type number
 * @max 100
 * 
 * @param pitch
 * @desc SEのピッチを指定します。
 * @default 100
 * @type number
 * @max 150
 * @min 50
 * 
 * @param pan
 * @desc SEの位相を指定します。
 * @default 0
 * @type number
 * @max 100
 * @min -100
 *
*/
(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    }

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgStr = function(arg) {
        return convertEscapeCharacters(arg);
    };

    var setArgNum = function(arg) {
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
    };

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
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExGuardEffect');

    FTKR.EGF = {
        guardEffectValue    : Number(parameters['Guard Effect Value'] || 1),
        disableDamageMotion : !!paramParse(parameters['Disable Damage Motion']),
        actorGuard          : parameters['Actor Guard Text'] || '',
        actorGuardDamageSe  : paramParse(parameters['Actor Guard Damage SE']),
        enemyGuard          : parameters['Enemy Guard Text'] || '',
        enemyGuardDamageSe  : paramParse(parameters['Enemy Guard Damage SE']),
    };

    Game_BattlerBase.TRAIT_GUARD_RATE = +(paramParse(parameters['TRAIT_GUARD_RATE']));

    //=============================================================================
    // DataManager
    //=============================================================================

    var _EGF_DatabaseLoaded = false;
    var _EGF_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_EGF_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_EGF_DatabaseLoaded) {
            this.egfEffectNoteTags($dataActors);
            this.egfEffectNoteTags($dataClasses);
            this.egfEffectNoteTags($dataWeapons);
            this.egfEffectNoteTags($dataArmors);
            this.egfEffectNoteTags($dataEnemies);
            this.egfEffectNoteTags($dataStates);
            _EGF_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.egfEffectNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var value = readObjectMeta(obj, ['EGF_GUARD_RATE', 'EGF_防御率']);
            if (value) {
                obj.traits.push(this.setObjTrait(Game_BattlerBase.TRAIT_GUARD_RATE, value, 0));
            }
        }
    };

    DataManager.setObjTrait = function(code, value, dataId) {
        return {code:code, value:value, dataId:dataId};
    };

    //=============================================================================
    // SoundManager
    //=============================================================================
    SoundManager.playEnemyGuardDamage = function() {
        AudioManager.playStaticSe(FTKR.EGF.enemyGuardDamageSe);
    };

    SoundManager.playActorGuardDamage = function() {
        AudioManager.playStaticSe(FTKR.EGF.actorGuardDamageSe);
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _EGF_Game_Action_applyGuard = Game_Action.prototype.applyGuard;
    Game_Action.prototype.applyGuard = function(damage, target) {
        var result = target.result();
        result.guarded = this.canGuard(damage, target);
        if (result.guarded) {
            return this.makeGuardDamage(damage, target);
        } else {
            return _EGF_Game_Action_applyGuard.call(this, damage, target);
        }
    };

    Game_Action.prototype.canGuard = function(damage, target) {
        return damage > 0 && Math.random() < this.itemGuard(target);
    };

    Game_Action.prototype.itemGuard = function(target) {
        return target.isGuard() ? 1 : target.guardRate();
    };

    Game_Action.prototype.makeGuardDamage = function(damage, target) {
        return damage / (this.guardEffectValue(target) * target.grd);
    };

    Game_Action.prototype.guardEffectValue = function(target) {
        return FTKR.EGF.guardEffectValue;
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.guardRate = function() {
        return this.traitsSumAllEval(Game_BattlerBase.TRAIT_GUARD_RATE) / 100;
    };

    Game_BattlerBase.prototype.traitsSumAllEval = function(code) {
        FTKR.setGameData(this);
        return this.traits(code).reduce(function(r, trait) {
            return r + FTKR.evalFormula(trait.value);
        }, 0);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Game_Battler.prototype.performGuardDamage = function() {
    };

    Game_Battler.prototype.guardDamageMotion = function() {
        return FTKR.EGF.disableDamageMotion ? 'guard' : 'damage';
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.performGuardDamage = function() {
        Game_Battler.prototype.performGuardDamage.call(this);
        if (this.isSpriteVisible()) {
            var motion = this.guardDamageMotion();
            this.requestMotion(motion);
        }
        SoundManager.playActorGuardDamage();
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.performGuardDamage = function() {
        Game_Battler.prototype.performGuardDamage.call(this);
        SoundManager.playEnemyGuardDamage();
        this.requestEffect('blink');
    };

    //=============================================================================
    // Game_ActionResult
    //=============================================================================

    var _EGF_Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _EGF_Game_ActionResult_clear.call(this);
        this.guarded = false;
    };

    Game_ActionResult.prototype.isGuard = function() {
        return this.isHit() && this.guarded;
    };

    //=============================================================================
    // Window_BattleLog
    //=============================================================================

    var _EGF_Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        _EGF_Window_BattleLog_displayDamage.call(this, target);
        if (target.result().guarded) {
            this.displayGuard(target);
        }
    };

    Window_BattleLog.prototype.displayGuard = function(target) {
        var fmt;
        fmt = target.isActor() ? FTKR.EGF.actorGuard : FTKR.EGF.enemyGuard;
        if (fmt) this.push('addText', fmt.format(target.name()));
    };

    var _EGF_Window_BattleLog_performDamage = Window_BattleLog.prototype.performDamage;
    Window_BattleLog.prototype.performDamage = function(target) {
        if (target.result().guarded) {
            target.performGuardDamage();
        } else {
            _EGF_Window_BattleLog_performDamage.call(this, target);
        }
    };
   
}());//EOF
