//=============================================================================
// SVキャラのモーションを拡張するプラグイン
// FTKR_ExSvMotion.js
// 作成者     : フトコロ
// 作成日     : 2017/04/19
// 最終更新日 : 2017/04/27
// バージョン : v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESM = true;

var FTKR = FTKR || {};
FTKR.ESM = FTKR.ESM || {};

//=============================================================================
/*:
 * @plugindesc v1.1.2 SVキャラのモーションを拡張するプラグイン
 * @author フトコロ
 *
 * @param --行動モーションの設定--
 * @default
 * 
 * @param Damage Motion
 * @desc ダメージモーションを設定します
 * デフォルト damage
 * @default damage
 * 
 * @param Evade Motion
 * @desc 回避モーションを設定します
 * デフォルト evade
 * @default evade
 * 
 * @param Thrust Motion
 * @desc 突きモーションを設定します
 * デフォルト thrust
 * @default thrust
 * 
 * @param Swing Motion
 * @desc 払いモーションを設定します
 * デフォルト swing
 * @default swing
 * 
 * @param Missile Motion
 * @desc 飛び道具モーションを設定します
 * デフォルト missile
 * @default missile
 * 
 * @param Skill Motion
 * @desc 防御使用モーションを設定します
 * デフォルト skill
 * @default skill
 * 
 * @param Spell Motion
 * @desc 魔法使用モーションを設定します
 * デフォルト spell
 * @default spell
 * 
 * @param Item Motion
 * @desc アイテム使用モーションを設定します
 * デフォルト item
 * @default item
 * 
 * @param --状態モーション1 設定--
 * @default
 * 
 * @param Motion 1 name
 * @desc モーション1のコードを設定します。
 * デフォルト dying
 * @default dying
 * 
 * @param Motion 1 Condition
 * @desc モーション1の状態を設定します。
 * デフォルト dying
 * @default dying
 * 
 * @param --状態モーション2 設定--
 * @default
 * 
 * @param Motion 2 name
 * @desc モーション2のコードを設定します。
 * デフォルト abnormal
 * @default abnormal
 * 
 * @param Motion 2 Condition
 * @desc モーション2の状態を設定します。
 * デフォルト state1
 * @default state1
 * 
 * @param --状態モーション3 設定--
 * @default
 * 
 * @param Motion 3 name
 * @desc モーション3のコードを設定します。
 * デフォルト guard
 * @default guard
 * 
 * @param Motion 3 Condition
 * @desc モーション3の状態を設定します。
 * デフォルト guard
 * @default guard
 * 
 * @param --状態モーション4 設定--
 * @default
 * 
 * @param Motion 4 name
 * @desc モーション4のコードを設定します。
 * デフォルト chant
 * @default chant
 * 
 * @param Motion 4 Condition
 * @desc モーション4の状態を設定します。
 * デフォルト chant
 * @default chant
 * 
 * @param --状態モーション5 設定--
 * @default
 * 
 * @param Motion 5 name
 * @desc モーション5のコードを設定します。
 * デフォルト sleep
 * @default sleep
 * 
 * @param Motion 5 Condition
 * @desc モーション5の状態を設定します。
 * デフォルト state2
 * @default state2
 * 
 * @param --状態モーション6 設定--
 * @default
 * 
 * @param Motion 6 name
 * @desc モーション6のコードを設定します。
 * デフォルト dead
 * @default dead
 * 
 * @param Motion 6 Condition
 * @desc モーション6の状態を設定します。
 * デフォルト state3
 * @default state3
 * 
 * @param --状態モーション7 設定--
 * @default
 * 
 * @param Motion 7 name
 * @desc モーション7のコードを設定します。
 * @default 
 * 
 * @param Motion 7 Condition
 * @desc モーション7の状態を設定します。
 * @default 
 * 
 * @param --状態モーション8 設定--
 * @default
 * 
 * @param Motion 8 name
 * @desc モーション8のコードを設定します。
 * @default 
 * 
 * @param Motion 8 Condition
 * @desc モーション8の状態を設定します。
 * @default 
 * 
 * @param --状態モーション9 設定--
 * @default
 * 
 * @param Motion 9 name
 * @desc モーション9のコードを設定します。
 * デフォルト walk
 * @default walk
 * 
 * @param Motion 9 Condition
 * @desc モーション9の状態を設定します。
 * デフォルト input
 * @default input
 * 
 * @param --状態モーション10 設定--
 * @default
 * 
 * @param Motion 10 name
 * @desc モーション10のコードを設定します。
 * デフォルト victory
 * @default victory
 * 
 * @param Motion 10 Condition
 * @desc モーション10の状態を設定します。
 * デフォルト victory
 * @default victory
 * 
 * @param --状態モーション11 設定--
 * @default
 * 
 * @param Motion 11 name
 * @desc モーション11のコードを設定します。
 * デフォルト escape
 * @default escape
 * 
 * @param Motion 11 Condition
 * @desc モーション11の状態を設定します。
 * デフォルト escape
 * @default escape
 * 
 * @param --状態モーション12 設定--
 * @default
 * 
 * @param Motion 12 name
 * @desc モーション12のコードを設定します。
 * @default 
 * 
 * @param Motion 12 Condition
 * @desc モーション12の状態を設定します。
 * @default 
 * 
 * @param --状態モーション13 設定--
 * @default
 * 
 * @param Motion 13 name
 * @desc モーション13のコードを設定します。
 * @default 
 * 
 * @param Motion 13 Condition
 * @desc モーション13の状態を設定します。
 * @default 
 * 
 * @param --状態モーション14 設定--
 * @default
 * 
 * @param Motion 14 name
 * @desc モーション14のコードを設定します。
 * @default 
 * 
 * @param Motion 14 Condition
 * @desc モーション14の状態を設定します。
 * @default 
 * 
 * @param --状態モーション15 設定--
 * @default
 * 
 * @param Motion 15 name
 * @desc モーション15のコードを設定します。
 * @default 
 * 
 * @param Motion 15 Condition
 * @desc モーション7の状態を設定します。
 * @default 
 * 
 * @param --状態モーション16 設定--
 * @default
 * 
 * @param Motion 16 name
 * @desc モーション16のコードを設定します。
 * @default 
 * 
 * @param Motion 16 Condition
 * @desc モーション7の状態を設定します。
 * @default 
 * 
 * @param --カスタムモーション1 設定--
 * @default
 * 
 * @param Custom 1 Non Loop
 * @desc カスタムモーション1のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 1 Loop
 * @desc カスタムモーション1のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション2 設定--
 * @default
 * 
 * @param Custom 2 Non Loop
 * @desc カスタムモーション2のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 2 Loop
 * @desc カスタムモーション2のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション3 設定--
 * @default
 * 
 * @param Custom 3 Non Loop
 * @desc カスタムモーション3のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 3 Loop
 * @desc カスタムモーション3のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション4 設定--
 * @default
 * 
 * @param Custom 4 Non Loop
 * @desc カスタムモーション4のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 4 Loop
 * @desc カスタムモーション4のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション5 設定--
 * @default
 * 
 * @param Custom 5 Non Loop
 * @desc カスタムモーション5のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 5 Loop
 * @desc カスタムモーション5のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション6 設定--
 * @default
 * 
 * @param Custom 6 Non Loop
 * @desc カスタムモーション6のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 6 Loop
 * @desc カスタムモーション6のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション7 設定--
 * @default
 * 
 * @param Custom 7 Non Loop
 * @desc カスタムモーション7のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 7 Loop
 * @desc カスタムモーション7のループするモーションのコードを設定します。
 * @default 
 * 
 * @param --カスタムモーション8 設定--
 * @default
 * 
 * @param Custom 8 Non Loop
 * @desc カスタムモーション8のループしないモーションのコードを設定します。
 * @default 
 * 
 * @param Custom 8 Loop
 * @desc カスタムモーション8のループするモーションのコードを設定します。
 * @default 
 * 
 * @param -- デバッグ 設定--
 * @default
 * 
 * @param Output Motion Log
 * @desc モーションスプライト情報をログに出力する機能
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Output Motion Pattern Log
 * @desc モーションスプライトのパターン更新情報をログに出力する機能
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アクターのさまざまな状態における
 * SVキャラのモーションを変更します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. YEP_BattleEngineCoreと組み合わせて使用する場合は、
 *    当プラグインをYEP_BattleEngineCoreよりも下にしてください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動モーションの設定
 *-----------------------------------------------------------------------------
 * アクターの非ダメージ時や、攻撃時など行動時におけるモーション設定します。
 * 設定できる行動モーションは以下の通りです。
 * 
 * 被ダメージ、回避、突き、払い、飛び道具、スキル、魔法、アイテム
 * 
 * 
 * プラグインパラメータの行動モーションの設定で、以下のコード名から
 * 指定してください。
 * 
 * モーションのコード
 * walk, wait, chant, guard, damage, evade, thrust, swing,
 * missile, skill, spell, item, escape, victory, dying,
 * abnormal, sleep, dead, custom*
 * 
 * custom* はカスタムモーションです。
 * 
 *-----------------------------------------------------------------------------
 * カスタムモーションについて
 *-----------------------------------------------------------------------------
 * custom* (* は数字)で指定するモーションは、本プラグインで新規に設定可能な
 * モーションです。
 * 
 * 以下のプラグインパラメータで表示するモーションのコードを設定することで
 * 複数のモーションを連続して表示させることができます。
 * カスタムモーションは、8個まで設定できます。
 * 
 * <Custom * Non Loop>
 *    :ここに設定したコードのモーションはループしません。
 * <Custom * Loop>
 *    :ここに設定したコードのモーションをループさせます。
 * 
 * モーションのコードは、カンマ(,)を使うことで複数入力できます。
 * 
 * 
 * モーションのループについて
 * <Custom * Loop>に設定したモーションをループさせます。
 * 複数のコードを入力した場合も、それらを順に表示してループします。
 * 
 * 設定例)
 * <Custom * Non Loop> :victory, skill
 * <Custom * Loop>     :item, walk
 * 上記のように設定した場合、以下の順番でモーションを表示します。
 * 
 * victory ⇒ skill ⇒ item ⇒ walk ⇒ item ⇒ walk ⇒ ...
 *                  |→ここからループ
 * 
 * 
 *-----------------------------------------------------------------------------
 * 状態モーションの設定
 *-----------------------------------------------------------------------------
 * アクターの以下の状態におけるモーション設定します。
 * 
 *  input   : コマンド入力中
 *  chant   : 詠唱中
 *  guard   : 防御中/防御待機中
 *  state*  : ステート付加中( * がステートモーション番号)(例:state4)
 *  victory : 戦闘勝利中
 *  escape  : 逃走中
 *  dying   : 瀕死時
 * 
 * モーションは、モーション1～モーション16まで設定できます。
 * 数字が大きい方が、モーションの優先度が高くなります。
 * 
 * <Motion * Name>
 *    :モーション名のコードを指定してください。
 *    : walk, wait, chant, guard, damage, evade, thrust, swing,
 *    : missile, skill, spell, item, escape, victory, dying,
 *    : abnormal, sleep, dead, custom*
 * 
 * <Motion * Condition>
 *    :モーションの状態。上記の4種類から設定してください。
 *    :ステートモーションに設定したモーションは、ループします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ステートモーションの設定
 *-----------------------------------------------------------------------------
 * ステートのメモ欄に以下のタグを入力することで、ステート付加中のモーションを
 * 設定できます。
 * 
 * <ESM モーション: x>
 * <ESM MOTION: x>
 *    :ステートモーション番号を x に設定します。
 *    :タグで設定しない場合は、基本設定の[SV]モーションの設定に従います。
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
 * v1.1.2 - 2017/04/27 : 不具合修正
 *    1. 状態モーション10 以降が反映されない不具合を修正。
 * 
 * v1.1.1 - 2017/04/26 : YEP_BattleEngineCoreに対応
 * 
 * v1.1.0 - 2017/04/25 : 仕様変更、機能追加
 *    1. 攻撃等の行動モーションを変更する機能を追加。
 *    2. 状態モーションに、戦闘勝利、逃走、瀕死時のモーションを追加。
 *    3. 状態モーションのデフォルト設定を見直し
 *    4. 複数のモーションを組み合わせて連続で表示する機能を追加。
 * 
 * v1.0.1 - 2017/04/21 : 不具合修正
 *    1. ステートのタグ設定が正しく読み取れない不具合を修正。
 * 
 * v1.0.0 - 2017/04/19 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ESM.parameters = PluginManager.parameters('FTKR_ExSvMotion');

FTKR.ESM.motion = {
    debug:{
        enable:Number(FTKR.ESM.parameters['Output Motion Log'] || 0),
        pattern:Number(FTKR.ESM.parameters['Output Motion Pattern Log'] || 0),
    },
    basic:{
        damage:String(FTKR.ESM.parameters['Damage Motion'] || ''),
        evade:String(FTKR.ESM.parameters['Evade Motion'] || ''),
        thrust:String(FTKR.ESM.parameters['Thrust Motion'] || ''),
        swing:String(FTKR.ESM.parameters['Swing Motion'] || ''),
        missile:String(FTKR.ESM.parameters['Missile Motion'] || ''),
        skill:String(FTKR.ESM.parameters['Skill Motion'] || ''),
        speed:String(FTKR.ESM.parameters['Spell Motion'] || ''),
        item:String(FTKR.ESM.parameters['Item Motion'] || ''),
    },
    state:[
        {name:'', condition:'',},
        {name:String(FTKR.ESM.parameters['Motion 1 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 1 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 2 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 2 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 3 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 3 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 4 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 4 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 5 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 5 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 6 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 6 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 7 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 7 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 8 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 8 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 9 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 9 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 10 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 10 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 11 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 11 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 12 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 12 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 13 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 13 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 14 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 14 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 15 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 15 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 16 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 16 Condition'] || ''),},
    ],
    custom:[
        ['', ''],
        [String(FTKR.ESM.parameters['Custom 1 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 1 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 2 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 2 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 3 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 3 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 4 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 4 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 5 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 5 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 6 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 6 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 7 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 7 Loop'] || '')],
        [String(FTKR.ESM.parameters['Custom 8 Non Loop'] || ''),
          String(FTKR.ESM.parameters['Custom 8 Loop'] || '')],
    ],
};

Game_BattlerBase.ESM_MOTION_NUMBER = 16;

if (!Array.prototype.checkMeta) {
Array.prototype.checkMeta = function(obj) {
    return obj.meta ? this.map(function(meta) {
        return obj.meta[meta];
    }) : false;
};
}

//=============================================================================
// Game_Actor
// 基本モーションの設定を変更
//=============================================================================

FTKR.ESM.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    FTKR.ESM.Game_Battler_onBattleStart.call(this);
    this._requestVictory = false;
    this._requestEscape = false;
};

//書き換え
FTKR.ESM.Game_Battler_requestMotion = Game_Battler.prototype.requestMotion;
Game_Battler.prototype.requestMotion = function(motionType) {
    if (Imported.YEP_BattleEngineCore) {
        FTKR.ESM.Game_Battler_requestMotion.call(this);
    } else {
        var motion = FTKR.ESM.motion.basic[motionType];
        this._motionType = motion ? motion : motionType;
    }
};

//書き換え
Game_Actor.prototype.performVictory = function() {
    if (this.canMove()) {
        this.requestMotion('');
        this._requestVictory = true;
    }
};

//書き換え
Game_Actor.prototype.performEscape = function() {
    if (this.canMove()) {
        this.requestMotion('');
        this._requestEscape = true;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

//書き換え
Game_BattlerBase.prototype.stateMotionIndex = function() {
    var states = this.states();
    if (states.length > 0) {
        var motion = ['ESM モーション', 'ESM MOTION'].checkMeta(states[0]);
        return motion.length ? Number(motion[0]) : states[0].motion;
    } else {
        return 0;
    }
};

Game_BattlerBase.prototype.checkConditionAll = function() {
    for(var i = Game_BattlerBase.ESM_MOTION_NUMBER; i > 0; i--) {
        if(this.checkCondition(FTKR.ESM.motion.state[i].condition)) {
            return i;
        }
    }
    return 0;
};

Game_BattlerBase.prototype.checkCondition = function(condition) {
    var stateMotion = this.stateMotionIndex();
    if (condition.match(/state(\d+)/i)) {
        return stateMotion === Number(RegExp.$1);
    } 
    switch(true) {
        case /input/i.test(condition):
            return this.isInputting() || this.isActing();
        case /guard/i.test(condition):
            return this.isGuard() || this.isGuardWaiting();
        case /chant/i.test(condition):
            return this.isChanting();
        case /victory/i.test(condition):
            return $gameParty.inBattle() && $gameTroop.isAllDead() && this._requestVictory;
        case /escape/i.test(condition):
            return BattleManager.isEscaped() && this._requestEscape;
        case /dying/i.test(condition):
            return this.isDying();
        default:
            return false;
    };
};

Game_BattlerBase.prototype.getEsmMotion = function() {
    var index = this.checkConditionAll();
    if (index) {
        return FTKR.ESM.motion.state[index].name;
    } else if (this.isUndecided()) {
        return 'walk';
    } else {
        return 'wait';
    }
};

//=============================================================================
// Sprite_Weapon
// 武器のSVスプライトを修正
//=============================================================================

FTKR.ESM.Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    FTKR.ESM.Sprite_Weapon_setup.call(this, weaponImageId);
    this.consoleLog_weaponMotion('setup');
};

Sprite_Weapon.prototype.consoleLog_weaponMotion = function(text) {
    if (FTKR.ESM.motion.debug.enable && this._weaponImageId) {
    console.log('********************************************');
    console.log('Weapon Motion <', text, '>');
    console.log('---------------------------');
    console.log('ImageID :', this._weaponImageId);
    console.log('pattern :', this._pattern);
    console.log('********************************************');
    }
};

//=============================================================================
// Sprite_Actor
// アクターのSVスプライトを修正
//=============================================================================

FTKR.ESM.Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    FTKR.ESM.Sprite_Actor_initMembers.call(this);
    this._motionIndex = 0;
    this._motionTypes = [];
    this._motionType = '';
    this._index = 0;
};

Sprite_Actor.ESM_MOTIONS = {
    walk:     ['', 'walk'    ],
    wait:     ['', 'wait'    ],
    chant:    ['', 'chant'   ],
    guard:    ['', 'guard'   ],
    damage:   ['damage', ''  ],
    evade:    ['evade', ''   ],
    thrust:   ['thrust', ''  ],
    swing:    ['swing', ''   ],
    missile:  ['missile', '' ],
    skill:    ['skill', ''   ],
    spell:    ['spell', ''   ],
    item:     ['item', ''    ],
    escape:   ['', 'escape'  ],
    victory:  ['', 'victory' ],
    dying:    ['', 'dying'   ],
    abnormal: ['', 'abnormal'],
    sleep:    ['', 'sleep'   ],
    dead:     ['', 'dead'    ],
};

//書き換え
Sprite_Actor.prototype.updateMotionCount = function() {
    if (this.motion() && ++this._motionCount >= this.motionSpeed()) {
        // ループする場合
        if (this._motionIndex && this.motions().length <= 1) {
            this._pattern = (this._pattern + 1) % 4;
            this.consoleLog_ActorMotion('pattern')
        // ループしない場合 パターンを増やす
        } else if (this._pattern < 2) {
            this._pattern++;
            this.consoleLog_ActorMotion('pattern')
        // ループしない場合 パターンをリセット
        } else {
            this.refreshMotion();
        }
        this._motionCount = 0;
    }
};

//書き換え
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    var motionGuard = Sprite_Actor.MOTIONS['guard'];
    if (actor) {
        if (this.motion() === motionGuard && !BattleManager.isInputting()) {
            return;
        }
        var condition = actor.getEsmMotion();
        this.consoleLog_ActorMotion('refresh', [condition])
        if (this._motionType === condition) {
            if (!this._index && !this._pattern) {
            //index の更新
            } else if (!this.lastMotionType()) {
                this._pattern = 0;
                this._index++;
            //motionIndex の更新、index のリセット
            } else {
                if (!this._motionIndex) this._motionIndex = 1;
                this._index = 0;
                this._pattern = 0;
            }
            this.consoleLog_ActorMotion('data')
        //condition の更新
        } else {
            this._motionIndex = 0;
            this._index = 0;
            this.startMotion(condition);
        }
    }
};

//書き換え
Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var bitmap = this._mainSprite.bitmap;
    if (bitmap) {
        var motionIndex = this.motion() ? this.motion().index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var cw = bitmap.width / 9;
        var ch = bitmap.height / 6;
        var cx = Math.floor(motionIndex / 6) * 3 + pattern;
        var cy = motionIndex % 6;
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
    }
};

//書き換え
Sprite_Actor.prototype.startMotion = function(motionType) {
    if (this._motionType !== motionType) {
        this.setNewMotion(motionType);
    }
};

Sprite_Actor.prototype.setNewMotion = function(motionType) {
    if (!motionType) motionType = this._actor.getEsmMotion();
    this._motionType = motionType;
    if (motionType.match(/custom(\d+)/)) {
        var newMotions = FTKR.ESM.motion.custom[Number(RegExp.$1)];
    } else {
        var newMotions = Sprite_Actor.ESM_MOTIONS[motionType];
    }
    this._motionTypes = newMotions.map(function(motions) {
        return motions.split(',');
    });
    this._motionIndex = this.motionTypes()[0][0] ? 0 : 1;
    this._motionCount = 0;
    this._pattern = 0;
    this._index = 0;
    this.consoleLog_ActorMotion('start')
    this.consoleLog_ActorMotion('data')
};


Sprite_Actor.prototype.consoleLog_ActorMotion = function(type, datas) {
    if (FTKR.ESM.motion.debug.enable) {
        if (!FTKR.ESM.motion.debug.pattern && type === 'pattern') return;
        console.log('********************************************');
        console.log('Actor motion <', type, '>');
        console.log('---------------------------');
        switch (type) {
        case 'start':
        console.log('Input Motion   :', this._motionType);
        console.log('motionTypes[0] : ' + this.motionTypes()[0]);
        console.log('motionTypes[1] : ' + this.motionTypes()[1]);
        break;
        case 'refresh':
        console.log('motionType :', this._motionType);
        console.log('condition  :', datas[0]);
        console.log('motion num :', this.motions().length)
        if (this._motionType !== datas[0]) {
        console.log('⇒ Start Motion');
        }
        break;
        case 'data':
        console.log('Motion Name :', this.motionName());
        console.log('motionIndex :', this._motionIndex);
        console.log('index       :', this._index);
        break;
        case 'pattern':
        console.log('Motion Name :', this.motionName());
        console.log('motionIndex :', this._motionIndex);
        console.log('index       :', this._index);
        console.log('pattern     :', this._pattern);
        break;
        }
        console.log('********************************************');
    }
};

Sprite_Actor.prototype.motion = function() {
    return Sprite_Actor.MOTIONS[this.motionName()];
};

Sprite_Actor.prototype.motionTypes = function() {
    return this._motionTypes;
};

Sprite_Actor.prototype.motions = function() {
    return this._motionTypes[this._motionIndex];
};

Sprite_Actor.prototype.motionName = function() {
    return this._motionTypes[this._motionIndex][this._index];
};

Sprite_Actor.prototype.lastMotionType = function() {
    return this.motions().length === 1 || this.motions().length <= this._index + 1;
};

//=============================================================================
// YEP_BattleEngineCoreの修正
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

FTKR.ESM.Game_Battler_requestMotionRefresh = Game_Battler.prototype.requestMotionRefresh;
Game_Battler.prototype.requestMotionRefresh = function() {
    if (this._motionType) {
        this.requestMotion(this._motionType);
        this.clearMotion();
        return;
    }
    FTKR.ESM.Game_Battler_requestMotionRefresh.call(this);
};

//書き換え
Sprite_Actor.prototype.forceMotion = function(motionType) {
    this.setNewMotion(motionType);
};

}//Imported.YEP_BattleEngineCore