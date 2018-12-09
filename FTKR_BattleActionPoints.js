//=============================================================================
// 消費コスト用のパラメータ「アクションポイント(AP)」を導入するプラグイン
// FTKR_BattleActionPoints.js
// プラグインNo : 91
// 作成者     : フトコロ
// 作成日     : 2018/12/02
// 最終更新日 : 2018/12/10
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BAP = true;

var FTKR = FTKR || {};
FTKR.BAP = FTKR.BAP || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 消費コスト用のパラメータ「アクションポイント(AP)」を導入するプラグイン
 * @author フトコロ
 *
 * @param Init Start AP
 * @desc パーティーのアクションポイントの初期値を設定します。
 * @default 4
 * @type number
 * @min 0
 *
 * @param Init Max AP
 * @desc パーティーのアクションポイントの最大値を設定します。
 * @default 4
 * @type number
 * @min 0
 *
 * @param Item AP Cost
 * @desc スキルやアイテムのアクションポイントを設定します。メモ欄で設定しない場合は、この値になります。
 * @default 1
 * @type number
 * @min 0
 *
 * @param Turn Refresh AP
 * @desc ターンごとに回復するアクションポイントをスクリプトで設定します。-1 にすると全回復します。
 * @default -1
 *
 * @param Enabled Preserve AP
 * @desc 戦闘毎にAPを持ち越しするか設定します。
 * @type boolean
 * @on 有効(AP持ち越し)
 * @off 無効
 * @default false
 * 
 * @param Enabled Use AP0Skills Regardless Of AP
 * @desc パーティーの残りAPが0でも、AP0スキルは使用可能にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param --- アクションポイントの表示 ---
 * 
 * @param Show AP Window
 * @desc アクションポイントをバトル画面に表示するか設定します。
 * @type select
 * @option 表示しない
 * @value 0
 * @option プレイヤーターンのみ表示する
 * @value 1
 * @option 常に表示する
 * @value 2
 * @default 2
 *
 * @param Display AP
 * @desc アクションポイントの表示名を設定します。
 * @default AP
 * 
 * @param AP Draw Type
 * @desc アクションポイントの表示方法を選択します。
 * @type select
 * @option 数値(現在値のみ)
 * @value 0
 * @option 数値(現在値と最大値)
 * @value 1
 * @option アイコン(現在値と最大値)
 * @value 2
 * @option アイコン(現在値のみ)
 * @value 3
 * @default 0
 * 
 * @param apGauge
 * @text ゲージ設定
 * 
 * @param Display AP Gauge
 * @parent apGauge
 * @desc アクションポイントのゲージを表示します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * 
 * @param AP Gauge Color1
 * @parent apGauge
 * @desc アクションポイントのゲージ色1を設定します。
 * @default 10
 * @type number
 * @min 0
 *
 * @param AP Gauge Color2
 * @parent apGauge
 * @desc アクションポイントのゲージ色2を設定します。
 * @default 2
 * @type number
 * @min 0
 *
 * @param apIcon
 * @text アイコン設定
 * 
 * @param AP Icon Index
 * @parent apIcon
 * @desc アクションポイントを表すアイコンを設定します。
 * @default 162
 * @type number
 * @min 0
 *
 * @param AP Empty Icon Index
 * @parent apIcon
 * @desc アクションポイントの空部分を表すアイコンを設定します。
 * @default 160
 * @type number
 * @min 0
 * 
 * @param Draw Icon Space
 * @parent apIcon
 * @desc アクションポイントのアイコンの表示間隔を設定します。
 * @default 0
 * @type number
 * @min 0
 * 
 * @param apCost
 * @text コスト表示設定
 * 
 * @param AP Cost Color
 * @parent apCost
 * @desc アクションポイントコストの表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @param Display AP Width Cmd
 * @parent apCost
 * @desc コマンド欄のアクションポイントコストの表示幅を設定します。(半角文字数、0で非表示)
 * @default 3
 * @type number
 * @min 0
 *
 * @param Display AP Width Item
 * @parent apCost
 * @desc スキルやアイテム欄のアクションポイントコストの表示幅を設定します。(半角文字数、0で非表示)
 * @default 4
 * @type number
 * @min 0
 *
 * @param AP Window Layout
 * @desc APウィンドウのレイアウト設定
 * 空欄の場合は、デフォルトの表示位置です。
 * @type struct<window>
 * @default 
 * 
 * @param --- 戦闘行動の強制 ---
 * 
 * @param Enabled Force Action AP Cost
 * @desc 戦闘行動の強制で実行したスキルのAP消費を有効にする。APが足りない場合は、スキルを実行できません。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param atcode
 * @text --- 特徴および使用効果コードID ---
 * 
 * @param TRAIT_AP_PLUS
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 163
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @param TRAIT_AP_RATE
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 164
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @param TRAIT_AP_COST_PLUS
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 165
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @param TRAIT_AP_COST_RATE
 * @desc 他のプラグインと競合を起こす場合以外は変更しないでください。
 * @default 166
 * @type number
 * @min 0
 * @parent atcode
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * パーティーメンバーで共有する消費コスト用のパラメータ「アクションポイント(AP)」を
 * 導入します。
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_BattleActionPoints.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。
 * 
 *    FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
 *    FTKR_AlternatingTurnBattle.js
 *    FTKR_ExBattleCommand.js
 *    ↑このプラグインよりも上に登録↑
 *    FTKR_BattleActionPoints.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * このプラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v1.1.0 - 2018/12/10 : FTKR_ExBattleCommand v2.0.0 に対応。
 * 
 * v1.0.3 - 2018/12/08 : 不具合修正
 *    1. FTKR_AlternatingTurnBattle のv2.0.2の修正に伴い、ターン回復の処理を修正。
 * 
 * v1.0.2 - 2018/12/04 : 不具合修正
 *    1. プラグインパラメータ Show AP Window が正しく反映されない不具合を修正。
 * 
 * v1.0.1 - 2018/12/03 : 不具合修正
 *    1. プラグインコマンドの誤記修正。
 * 
 * v1.0.0 - 2018/12/02 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~window:
 * @param width
 * @desc ウィンドウの幅を設定します。
 * @type number
 * @default 120
 *
 * @param positionY
 * @desc ウィンドウの表示Y座標を設定します。
 * @type number
 * @min 0
 * @default 372
 *
 * @param positionX
 * @desc ウィンドウの表示X座標を設定します。
 * @type number
 * @min 0
 * @default 0
 * 
 * @param background
 * @desc ウィンドウの背景を設定します。
 * @type select
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 *
*/

function Window_BattleActionPoint() {
    this.initialize.apply(this, arguments);
}

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

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '[ ]*:[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    var setObjBattlerTrait = function(obj, metacodes, codeName, dataId) {
        var times = readObjectMeta(obj, metacodes);
        if (times) {
            obj.traits.push({
                code   : Game_BattlerBase[codeName],
                value  : Number(times),
                dataId : dataId,
            });
        }
    };

    var setObjBattlerTraitFloat = function(obj, metacodes, codeName, dataId) {
        var times = readObjectMeta(obj, metacodes);
        if (times) {
            obj.traits.push({
                code   : Game_BattlerBase[codeName],
                value  : Number(times) / 100,
                dataId : dataId,
            });
        }
    };

    var setObjBattlerTraitEx = function(obj, metacodes, codeName) {
        var text = readObjectMeta(obj, metacodes);
        if (text) {
            var times = text.split(' ');
            obj.traits.push({
                code   : Game_BattlerBase[codeName],
                value  : Number(times[0]) || 0, //増加量
                dataId : times[1] || '',        //対象の種類
                ext    : Number(times[2]) || 0, //対象ID
            });
        }
    };

    // <codeTitle>text</codeTitle>の形式のメタデータを読み取ってtextを返す
    var readEntrapmentCodeToText = function(obj, codeTitles) {
        notes = convertEntrapmentRegArray(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (testRegs(line, notes, 'a')) {
                var text = '';
                setMode = 'read';
            } else if (testRegs(line, notes, 'b')) {
                setMode = 'none';
            } else if (setMode === 'read') {
                text += line + ';';
            }
        }
        return text;
    };

    var convertEntrapmentRegArray = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                a:new RegExp('<' + codeTitle + '>', 'i'),
                b:new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    //正規表現オブジェクトの配列とdataをテストする
    var testRegs = function(data, regs, prop) {
        return regs.some(function(reg) {
            return prop ? reg[prop].test(data) : reg.test(data);
        });
    };

    // textを条件式に使える状態に変換する
    var convertTextToConditions = function(text) {
        var result = '';
        if (text) {
            var datas = text.split(';');
            datas.forEach(function(data, i) {
                result += data;
                if (datas[i+1]) result += ')&&(';
            });
            result = '(' + result + ')';
        }
        return result;
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

    var setArgBool = function(arg) {
        switch((setArgStr(arg)).toUpperCase()) {
            case 'TRUE':
                return true;
            default :
                return false;
        }
    }

    var matchTraitToItem = function(trait, item) {
        switch ((trait.dataId + '').toUpperCase()) {
            case 'SKILLID'://スキルID
                return DataManager.isSkill(item) && trait.ext === item.id;
            case 'SKILLTYPE'://スキルタイプ
                return trait.ext === item.stypeId;
            case 'ELEMENTID'://属性ID
                return trait.ext === item.damage.elementId;
            case 'ITEMID'://アイテムID
                return DataManager.isItem(item) && trait.ext === item.id;
            default:
                return true;
        }
    }

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
    var parameters = PluginManager.parameters('FTKR_BattleActionPoints');

    FTKR.BAP = {
        initStartAp     : (paramParse(parameters['Init Start AP']) || 0),
        initMaxAp       : (paramParse(parameters['Init Max AP']) || 0),
        itemApCost      : (paramParse(parameters['Item AP Cost']) || 0),
        turnRefreshAP   : (paramParse(parameters['Turn Refresh AP']) || 0),
        enabledPreserveAP : (paramParse(parameters['Enabled Preserve AP']) || false),
        enabledAP0SkillsRegardlessAP : (paramParse(parameters['Enabled Use AP0Skills Regardless Of AP']) || false),
        showApWindow    : (paramParse(parameters['Show AP Window']) || 0),
        dispAP          : (paramParse(parameters['Display AP']) || 'AP'),
        apDrawType      : (paramParse(parameters['AP Draw Type']) || 0),
        dispAPGauge     : (paramParse(parameters['Display AP Gauge']) || false),
        apGaugeColor1   : (paramParse(parameters['AP Gauge Color1']) || 0),
        apGaugeColor2   : (paramParse(parameters['AP Gauge Color2']) || 0),
        apIcon          : (paramParse(parameters['AP Icon Index']) || 162),
        apEmptyIcon     : (paramParse(parameters['AP Empty Icon Index']) || 160),
        iconSpace       : (paramParse(parameters['Draw Icon Space']) || 0),
        apCostColor     : (paramParse(parameters['AP Cost Color']) || 0),
        dispApWidthCmd  : (paramParse(parameters['Display AP Width Cmd']) || 0),
        dispApWidthItem : (paramParse(parameters['Display AP Width Item']) || 0),
        layoutAPWindow  : (paramParse(parameters['AP Window Layout']) || null),
        enabledForceActionApCost : (paramParse(parameters['Enabled Force Action AP Cost']) || false),
        actionPointMax  : 999,
        actionPointMin  : 0,
    };

    Game_BattlerBase.TRAIT_AP_PLUS = +(paramParse(parameters['TRAIT_AP_PLUS']));
    Game_BattlerBase.TRAIT_AP_RATE = +(paramParse(parameters['TRAIT_AP_RATE']));
    Game_BattlerBase.TRAIT_AP_COST_PLUS = +(paramParse(parameters['TRAIT_AP_COST_PLUS']));
    Game_BattlerBase.TRAIT_AP_COST_RATE = +(paramParse(parameters['TRAIT_AP_COST_RATE']));

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._partyApWindow = null;
        this._usedActionPoints = [];
    };

    BattleManager.setPartyApWindow = function(apWindow) {
        this._partyApWindow = apWindow;
    };

    var _BAP_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BAP_BattleManager_startBattle.call(this);
        this.resetAPWindow();
    };

    BattleManager.resetAPWindow = function() {
        if (!FTKR.BAP.enabledPreserveAP) $gameParty.resetActionPoint();
        if (FTKR.BAP.showApWindow) this._partyApWindow.open();
    };

    var _BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        if (FTKR.BAP.showApWindow) this._partyApWindow.open();
        this.turnRefreshAP();
        _BattleManager_startInput.call(this);
    };

    //APの回復
    BattleManager.turnRefreshAP = function() {
        if ($gameTroop.turnCount() > 1) {
            $gameParty.gainActionPoint($gameParty.turnRefreshAP());
            this._partyApWindow.refresh();
        }
    };

    var _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        if (!Imported.FTKR_AltTB && FTKR.BAP.showApWindow !== 2) this._partyApWindow.close();
        _BattleManager_startTurn.call(this);
    };

    if (Imported.FTKR_AltTB) {
    var _BattleManager_updatePlayerTurnEnd = BattleManager.updatePlayerTurnEnd;
    BattleManager.updatePlayerTurnEnd = function() {
        _BattleManager_updatePlayerTurnEnd.call(this);
        if (FTKR.BAP.showApWindow !== 2) this._partyApWindow.close();
    };
    }
    
    BattleManager.payItemApCost = function(battler) {
        if (battler && battler.isActor()) {
            var action = battler.inputtingAction();
            this._usedActionPoints.push(battler.payApCost(action.item()));
            this._partyApWindow.refresh();
        }
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _BAP_DatabaseLoaded = false;
    var _BAP_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_BAP_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_BAP_DatabaseLoaded) {
            this.bapTraitNoteTags($dataActors);
            this.bapTraitNoteTags($dataClasses);
            this.bapTraitNoteTags($dataWeapons);
            this.bapTraitNoteTags($dataArmors);
            this.bapTraitNoteTags($dataStates);
            this.BAPSkillNoteTags($dataSkills);
            this.BAPSkillNoteTags($dataItems);
            _BAP_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.BAPSkillNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.apCost = Number(readObjectMeta(obj, ['FTKR_AP_COST','ALTTB_AP']) || FTKR.BAP.itemApCost);
            obj.gainAp = Number(readObjectMeta(obj, ['FTKR_GAIN_AP','ALTTB_GAIN_AP']) || 0);
            var datas = readEntrapmentCodeToText(obj, ['FTKR_GAINAP_CONDITIONS','ALTTB_GAINAP_CONDITIONS']) || '';
            obj.gainApConditions = convertTextToConditions(datas);
        }
    };

    DataManager.bapTraitNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            setObjBattlerTrait(obj, ['FTKR_MAX_AP_PLUS'], 'TRAIT_AP_PLUS', 0);
            setObjBattlerTrait(obj, ['FTKR_START_AP_PLUS'], 'TRAIT_AP_PLUS', 1);
            setObjBattlerTrait(obj, ['FTKR_REFRESH_AP_PLUS'], 'TRAIT_AP_PLUS', 2);
            setObjBattlerTraitFloat(obj, ['FTKR_MAX_AP_RATE'], 'TRAIT_AP_RATE', 0);
            setObjBattlerTraitFloat(obj, ['FTKR_START_AP_RATE'], 'TRAIT_AP_RATE', 1);
            setObjBattlerTraitFloat(obj, ['FTKR_REFRESH_AP_RATE'], 'TRAIT_AP_RATE', 2);
            setObjBattlerTraitEx(obj, ['FTKR_AP_COST_PLUS'], 'TRAIT_AP_COST_PLUS');
            setObjBattlerTraitEx(obj, ['FTKR_AP_COST_RATE'], 'TRAIT_AP_COST_RATE');
        }
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Game_BattlerBase.prototype.itemApCostBase = function(item) {
        return item.apCost;
    };

    Game_BattlerBase.prototype.itemApCostPlus = function(item) {
        return this.traitsSumItemPlus(Game_BattlerBase.TRAIT_AP_COST_PLUS, item);
    };

    Game_BattlerBase.prototype.itemApCostRate = function(item) {
        return this.traitsPiItemRate(Game_BattlerBase.TRAIT_AP_COST_RATE, item);
    };

    Game_BattlerBase.prototype.itemApCostMax = function(item) {
        return FTKR.BAP.actionPointMax;
    };

    Game_BattlerBase.prototype.itemApCostMin = function(item) {
        return 0;
    };

    Game_BattlerBase.prototype.itemApCost = function(item) {
        var value = this.itemApCostBase(item) + this.itemApCostPlus(item);
        value *= this.itemApCostRate(item);
        var maxValue = this.itemApCostMax(item);
        var minValue = this.itemApCostMin(item);
        return Math.round(value.clamp(minValue, maxValue));
    };

    Game_BattlerBase.prototype.traitsSumItemPlus = function(code, item) {
        return this.traits(code).reduce(function(r, trait) {
            return r + (matchTraitToItem(trait, item) ? trait.value : 0);
        }, 0);
    };

    Game_BattlerBase.prototype.traitsPiItemRate = function(code, item) {
        return this.traits(code).reduce(function(r, trait) {
            return r * (matchTraitToItem(trait, item) ? trait.value / 100 : 1);
        }, 1);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    var _Game_Battler_forceAction = Game_Battler.prototype.forceAction;
    Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
        var skill = $dataSkills[skillId];
        if (FTKR.BAP.enabledForceActionApCost && !this.canPayAP(skill)) return;
        _Game_Battler_forceAction.call(this, skillId, targetIndex);
        if (FTKR.BAP.enabledForceActionApCost) {
            this.payApCost(skill);
            BattleManager._partyApWindow.refresh();
        }
    };
    
    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _Game_Actor_canInput = Game_Actor.prototype.canInput;
    Game_Actor.prototype.canInput = function() {
        return _Game_Actor_canInput.call(this) && this.canUseEitherApSkills();
    };

    Game_Actor.prototype.canPayAP = function(item) {
        //AP無効 または APが0 または 消費APが現在AP以下 または 戦闘行動の強制で消費無効
        return FTKR.BAP.enabledAP0SkillsRegardlessAP && !this.itemApCost(item) ||
                $gameParty.actionPoint() && this.itemApCost(item) <= $gameParty.actionPoint();
    };

    Game_Actor.prototype.canUseEitherApSkills = function() {
        var skills = [$dataSkills[1], $dataSkills[2]];
        skills = skills.concat(this.skills());
        return skills.some(function(skill){ 
                return this.canPayAP(skill);
            },this);
    };

    Game_Actor.prototype.payApCost = function(item) {
        var cost = this.itemApCost(item);
        $gameParty.gainActionPoint(-cost);
        return cost;
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    var _BAP_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _BAP_Game_Party_initialize.call(this);
        this._actionPoint = FTKR.BAP.initStartAp;
        this._maxActionPoint = FTKR.BAP.initMaxAp;
    };

    Game_Party.prototype.paramApBase = function(paramId) {
        if (paramId === 0) {
            return this._maxActionPoint;
        } else if (paramId === 1) {
            return FTKR.BAP.initStartAp;
        } else if (paramId === 2) {
            return this.turnRefreshApBase();
        } else {
            return 0;
        }
    };

    Game_Party.prototype.turnRefreshApBase = function() {
        return FTKR.BAP.turnRefreshAP === -1 ? this.maxActionPoint() : Math.round(Number(eval(FTKR.BAP.turnRefreshAP)));
    };

    Game_Party.prototype.paramApPlus = function(paramId) {
        return this.battleMembers().reduce(function(r, member){
            return r + member.traitsSum(Game_BattlerBase.TRAIT_AP_PLUS, paramId);
        }, 0);
    };

    Game_Party.prototype.paramApRate = function(paramId) {
        return this.battleMembers().reduce(function(r, member){
            return r * member.traitsPi(Game_BattlerBase.TRAIT_AP_RATE, paramId);
        }, 1);
    };

    Game_Party.prototype.paramApMax = function(paramId) {
        if (paramId === 0) {
            return FTKR.BAP.actionPointMax;
        } else {
            return this.maxActionPoint();
        }
    };

    Game_Party.prototype.paramApMin = function(paramId) {
        return FTKR.BAP.actionPointMin;
    };

    Game_Party.prototype.paramAp = function(paramId) {
        var value = this.paramApBase(paramId) + this.paramApPlus(paramId);
        value *= this.paramApRate(paramId);
        var maxValue = this.paramApMax(paramId);
        var minValue = this.paramApMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    };

    Game_Party.prototype.maxActionPoint = function() {
        return this.paramAp(0);
    };

    Game_Party.prototype.startAp = function() {
        return this.paramAp(1);
    };

    Game_Party.prototype.turnRefreshAP = function() {
        return this.paramAp(2);
    };

    Game_Party.prototype.actionPoint = function() {
        return this._actionPoint;
    };

    Game_Party.prototype.apRate = function() {
        return this.actionPoint() / this.maxActionPoint();
    };

    Game_Party.prototype.gainActionPoint = function(value) {
        this._actionPoint += value;
        this.refreshActionPoint();
    };

    Game_Party.prototype.growActionPoint = function(value) {
        this._maxActionPoint += value;
        this.refreshActionPoint();
    };

    Game_Party.prototype.refreshActionPoint = function() {
        this._actionPoint = this._actionPoint.clamp(0, this.maxActionPoint());
    };

    Game_Party.prototype.resetActionPoint = function() {
        this._actionPoint = this.startAp();
    };

    //=============================================================================
    // Game_Action
    //=============================================================================
    
    var _BAP_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _BAP_Game_Action_applyItemUserEffect.call(this, target);
        this.applyItemPartyGainAp(target);
    };

    Game_Action.prototype.applyItemPartyGainAp = function(target) {
        if (this.subject().isActor() && this.item().gainAp) {
            FTKR.setGameData(this.subject(), target, this.item());
            if (!this.item().gainApConditions || FTKR.evalFormula(this.item().gainApConditions)) {
                $gameParty.gainActionPoint(this.item().gainAp);
                BattleManager._partyApWindow.refresh();
            }
        }
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _BAP_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        switch (command.toUpperCase()) {
            case 'AltTB_アクションポイント増加':
            case 'AltTB_ADD_AP':
                if (this.addPartyAP(args) && $gameParty.inBattle()) {
                    BattleManager._partyApWindow.refresh();
                };
                break;
            case 'FTKR_最大AP増加':
            case 'FTKR_ADD_MAX_AP':
                var ap = setArgNum(args[0]);
                if (ap && $gameParty.inBattle()) {
                    $gameParty.growActionPoint(ap);
                    BattleManager._partyApWindow.refresh();
                };
                break;
            case 'FTKR_現在AP増加':
            case 'FTKR_ADD_CURRENT_AP':
                var ap = setArgNum(args[0]);
                if (ap && $gameParty.inBattle()) {
                    $gameParty.gainActionPoint(ap);
                    BattleManager._partyApWindow.refresh();
                };
                break;
            default:
                _BAP_Game_Interpreter_pluginCommand.call(this, command, args);
                break;
        }
    };

    Game_Interpreter.prototype.addPartyAP = function(args) {
        var ap = setArgNum(args[0]);
        if (ap) {
            switch((args[1] + '').toUpperCase()) {
                case '最大値':
                case 'MAX':
                    $gameParty.growActionPoint(ap);
                    return true;
                default:
                    $gameParty.gainActionPoint(ap);
                    return true;
            }
        }
        return false;
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    
    var _Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
         BattleManager.payItemApCost(BattleManager.actor());
        _Scene_Battle_selectNextCommand.call(this);
    };

    var _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
    Scene_Battle.prototype.selectPreviousCommand = function() {
        if (BattleManager.actor()) {
            var point = BattleManager._usedActionPoints.pop();
            $gameParty.gainActionPoint(point);
            BattleManager._partyApWindow.refresh();
        }
        _Scene_Battle_selectPreviousCommand.call(this);
    };

    var _BAP_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _BAP_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setPartyApWindow(this._partyApWindow);
    };

    var _BAP_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _BAP_Scene_Battle_createAllWindows.call(this);
        this.createPartyActionPointWindow();
    };

    Scene_Battle.prototype.addWindowAtW = function(addWindow, atWindow) {
        this._windowLayer.children.some(function(wchild, i){
            if (wchild === atWindow) {
                windowIndex = i;
                return true;
            }
        },this);
        this._windowLayer.addChildAt(addWindow, windowIndex);
    };

    Scene_Battle.prototype.createPartyActionPointWindow = function() {
        var y = this._statusWindow.y;
        this._partyApWindow = new Window_BattleActionPoint(0, y);
        this.addWindowAtW(this._partyApWindow, this._partyCommandWindow);
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.drawCssIconValue = function(x, y, width, value, icon) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (value > 1) {
            if (width >= (iw + 2) * value - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (value - 1);
            }
        }
        for (var i = 0; i < value; i++) {
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };

    Window_Base.prototype.drawIconGauge = function(x, y, width, current, max, icon1, icon2) {
        var space = 0;
        var iw = Window_Base._iconWidth;
        if (max > 1) {
            if (width >= (iw + 2) * max - 2) {
                space = iw + 2;
            } else {
                space = (width - iw - 4) / (max - 1);
            }
        }
        for (var i = 0; i < max; i++) {
            var icon = i < current ? icon1 : icon2;
            this.drawIcon(icon, x + space * i, y + 2);
        }
    };

    Window_Base.prototype.drawActionPoint = function(x, y, width) {
        width = width || 186;
        var tw = 44;
        this.drawAPGauge(x, y, width);
        this.drawAPLabel(x, y, tw);
        this.drawAPValue(x + tw, y, width - tw);
        return 1;
    };

    Window_Base.prototype.drawAPGauge = function(x, y, width) {
        if (FTKR.BAP.dispAPGauge && FTKR.BAP.apDrawType !== 2) {
            var color1 = this.apGaugeColor1();
            var color2 = this.apGaugeColor2();
            this.drawGauge(x, y, width, $gameParty.apRate(), color1, color2);
        }
    };

    Window_Base.prototype.apGaugeColor1 = function() {
        return this.textColor(FTKR.BAP.apGaugeColor1);
    };

    Window_Base.prototype.apGaugeColor2 = function() {
        return this.textColor(FTKR.BAP.apGaugeColor2);
    };

    Window_Base.prototype.drawAPLabel = function(x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.BAP.dispAP, x, y, width);
    };

    Window_Base.prototype.drawAPValue = function(x, y, width) {
        var ap = $gameParty.actionPoint();
        var map = $gameParty.maxActionPoint();
        var icon = FTKR.BAP.apIcon;
        switch (+FTKR.BAP.apDrawType) {
            case 2:
                this.drawIconGauge(x, y, width, ap, map, icon, FTKR.BAP.apEmptyIcon);
                break;
            case 3:
                this.drawCssIconValue(x, y, width, ap, icon);
                break;
            default:
                var color = this.normalColor();
                this.drawApCurrentAndMax(ap, map, x, y, width, color, color);
                break;
        }
    };

    Window_Base.prototype.apValueWidth = function() {
        return this.textWidth('0000');
    };

    Window_Base.prototype.drawApCurrentAndMax = function(current, max, x, y,
                                                      width, color1, color2) {
        var valueWidth = this.apValueWidth();
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x && FTKR.BAP.apDrawType == 1) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    //=============================================================================
    // Window_Selectable
    //=============================================================================

    Window_Selectable.prototype.apCostWidth = function() {
        return this.textWidth('0') * FTKR.BAP.dispApWidthItem || 0;
    };

    Window_Selectable.prototype.drawApCost = function(cost, x, y, width) {
        this.drawText(FTKR.BAP.dispAP + cost, x, y, width, 'right');
    };

    Window_Selectable.prototype.drawItemCost = function(cost, x, y, width) {
        this.changeTextColor(this.textColor(FTKR.BAP.apCostColor));
        this.drawApCost(cost, x, y, width);
        this.resetTextColor();
    };

    Window_Selectable.prototype.isEnabledDispItemAp = function() {
        return FTKR.BAP.dispApWidthItem > 0;
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    var _Window_ActorCommand_isCommandEnabled = Window_ActorCommand.prototype.isCommandEnabled;
    Window_ActorCommand.prototype.isCommandEnabled = function(index) {
        var result = _Window_ActorCommand_isCommandEnabled.call(this, index);
        return result && this.canPayAP(index);
    };

    var _Window_ActorCommand_isCurrentItemEnabled = Window_ActorCommand.prototype.isCurrentItemEnabled;
    Window_ActorCommand.prototype.isCurrentItemEnabled = function() {
        var result = _Window_ActorCommand_isCurrentItemEnabled.call(this);
        return result && this.canPayAP(this.index());
    };

    Window_ActorCommand.prototype.canPayAP = function(index) {
        return this.commandAP(index) === -1 ||
                FTKR.BAP.enabledAP0SkillsRegardlessAP && !this.commandAP(index) ||
                $gameParty.actionPoint() && this.commandAP(index) <= $gameParty.actionPoint();
    };

    //FTKR_ExBattleCommand----------------------------------
    if (!Imported.FTKR_EBC) {
    //書き換え
    Window_ActorCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawBattleCommandName(index, rect.x, rect.y, rect.width, align);
    };

    Window_ActorCommand.prototype.drawBattleCommandName = function(index, x, y, width, align) {
        this.drawText(this.commandName(index), x, y, width, align);
    };

    Window_ActorCommand.prototype.commandEbcSkill = function(index) {
        if (this.commandSymbol(index) === 'attack') {
            return $dataSkills[this._actor.attackSkillId()];
        } else if (this.commandSymbol(index) === 'guard') {
            return $dataSkills[this._actor.guardSkillId()];
        } else {
            return null;
        }
    };

    Window_Command.prototype.isActionSkillCommand = function(index) {
        return ['attack', 'guard'].contains(this.commandSymbol(index));
    };

    }//FTKR_ExBattleCommand----------------------------------

    var _Window_ActorCommand_drawBattleCommandName = Window_ActorCommand.prototype.drawBattleCommandName;
    Window_ActorCommand.prototype.drawBattleCommandName = function(index, x, y, width, align) {
        var cw = this.costWidth(index);
        _Window_ActorCommand_drawBattleCommandName.call(this, index, x, y, width - cw, align);
        if (cw) this.drawItemCost(this.commandAP(index), x + width - cw, y, cw);
    };

    Window_ActorCommand.prototype.hasCost = function(index) {
        return this.commandAP(index) >= 0 && FTKR.BAP.dispApWidthCmd > 0;
    };

    Window_ActorCommand.prototype.costWidth = function(index) {
        return this.hasCost(index) ? this.apCostWidth() : 0;
    };

    Window_ActorCommand.prototype.commandAP = function(index) {
        if (!this.isActionSkillCommand(index)) return -1;
        var skill = this.commandEbcSkill(index);
        return skill ? this._actor.itemApCost(skill) : -1;
    };

    //=============================================================================
    // Window_BattleItem
    //=============================================================================

    Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
        var cw = this.apCostWidth();
        var nw = width - cw;
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, nw);
        if (this.isEnabledDispItemAp()) {
            this.drawItemCost(BattleManager.actor().itemApCost(item), x + nw, y, cw);
        }
    };

    Window_BattleItem.prototype.isEnabled = function(item) {
        return Window_ItemList.prototype.isEnabled.call(this, item) && BattleManager.actor().canPayAP(item);
    };

    //=============================================================================
    // Window_BattleSkill
    //=============================================================================

    Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
        var cw = this.apCostWidth();
        var nw = width - this.apCostWidth();
        Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, nw);
        if (this.isEnabledDispItemAp()) {
            this.drawItemCost(BattleManager.actor().itemApCost(skill), x + nw, y, cw);
        }
    };

    Window_BattleSkill.prototype.isEnabled = function(item) {
        return Window_SkillList.prototype.isEnabled.call(this, item) && this._actor.canPayAP(item);
    };

    //=============================================================================
    // Window_BattleActionPoint
    //=============================================================================

    Window_BattleActionPoint.prototype = Object.create(Window_Base.prototype);
    Window_BattleActionPoint.prototype.constructor = Window_BattleActionPoint;

    Window_BattleActionPoint.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        y -= height;
        if (!!FTKR.BAP.layoutAPWindow) {
            x = FTKR.BAP.layoutAPWindow.positionX;
            y = FTKR.BAP.layoutAPWindow.positionY;
        }
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        if (!!FTKR.BAP.layoutAPWindow) {
            this.setBackgroundType(+FTKR.BAP.layoutAPWindow.background);
        }
        this.refresh();
        this.close();
    };

    Window_BattleActionPoint.prototype.windowWidth = function() {
        return !!FTKR.BAP.layoutAPWindow ? FTKR.BAP.layoutAPWindow.width : 120;
    };

    Window_BattleActionPoint.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_BattleActionPoint.prototype.refresh = function() {
        this.contents.clear();
        var width = this.contents.width - this.textPadding() * 2;
        this.drawActionPoint(this.textPadding(), 0, width);
    };

    Window_BattleActionPoint.prototype.open = function() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    //=============================================================================
    //FTKR_CustomSimpleActorStatus.js の対応
    //=============================================================================
    if (Imported.FTKR_CSS) {

    var _BAP_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'ACTP':
                return this.drawActionPoint(x, y, width);
            default:
                return _BAP_Window_Base_drawCssActorStatusBase_B.apply(this, arguments);
        }
    };

    }//FTKR_CustomSimpleActorStatus.js


}());//EOF
