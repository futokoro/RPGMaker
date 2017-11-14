//=============================================================================
// EventReSpawn.jsとTemplateEvent.jsで生成した一時イベントの座標とセルフスイッチを記録するプラグイン
// FTKR_EventReSpawnEx.js
// 作成者     : フトコロ
// 作成日     : 2017/11/14
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================
// EventReSpawn.js および TemplateEvent.jsは、
// トリアコンタン氏製のプラグインです。
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ERS = true;

var FTKR = FTKR || {};
FTKR.ERS = FTKR.ERS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 EventReSpawn.jsとTemplateEvent.jsで生成した一時イベントの座標とセルフスイッチを記録する
 * @author フトコロ
 * 
 * @param Save Condition When Transfer
 * @desc 場所移動時に一時イベントの状態を記録する
 * 1 - 記録する, 0 - 記録しない
 * @type select
 * @option 記録する
 * @value 1
 * @option 記録しない
 * @value 0
 * @default 1
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * トリアコンタンさん製のイベント動的生成プラグインEventReSpawn.jsと
 * 同じくトリアコンタンさん製のテンプレートイベントプラグインTemplateEvent.jsを
 * 組み合わせて生成した一時イベントの座標とセルフスイッチの状態を記録します。
 * 
 * 
 * 一度別の場所に移動した後に、再度同じマップに移動した場合に、
 * 記録した位置およびセルフスイッチの状態で一時イベントを生成します。
 * 
 * 
 * 以下のバージョンで動作確認済み。
 * EventReSpawn.js v1.7.0
 * TemplateEvent.js v1.7.1 
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 * 2. このプラグインを動作させるためには EventReSpawn.js が必要です。
 *    プラグイン管理画面では、当プラグインはEventReSpawn.jsの下に
 *    登録してください。
 *    
 *    EventReSpawn.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * イベントの位置とセルフスイッチの状態を記録する
 *-----------------------------------------------------------------------------
 * 一時イベントの座標とセルフスイッチの状態を記録するためには、
 * コピー元のイベントのメモ欄に、以下のタグを記入します。
 * 
 *     <ERS_記録> or <RES_SAVE>
 * 
 * 
 * 上記タグを記入した一時イベントに対して、以下のタイミングで状態を記録します。
 * 
 * 1. 場所移動時
 * プラグインパラメータ<Save Condition When Transfer>を 1 に設定すると
 * 場所移動時に、マップ上のすべての一時イベントの状態を記録します。
 * 
 * 
 * 2. プラグインコマンドで記録
 * 以下のプラグインコマンドを実行すると、その時点の状態を記録します。
 * 
 * ERS_一時イベント記録 [イベントID]
 * ERS_SAVE_PREFABEVENT [eventId]
 * 
 * イベントIDは、生成した一時イベントのIDです。
 * 元となるイベントのIDではありません。
 * イベントIDを指定しない場合は、マップ上のすべての一時イベントの
 * 状態を記録します。
 * 
 * 生成した一時イベントのIDは、以下のプラグインコマンド等で取得してください。
 * ERS_最終生成イベントID取得 10  # 最後に生成したイベントIDを変数[10]に設定
 * ERS_GET_LAST_SPAWN_EVENT_ID 10 # 同上
 * 
 * イベントIDには、\V[x]のようにすることでゲーム内変数の値を指定できます。
 * 
 * 元となるイベントの実行内容欄で記述する場合は、
 * this._eventId で一時イベント自身のIDを指定できます。
 * 
 * 例)
 * 生成したマップ上でのイベントID10の座標とセルフ変数の状態を記録
 *   ERS_一時イベント記録 10
 * 
 * 元となるイベントに初めから記録するコマンドを設定しておく場合
 *   ERS_一時イベント記録 this._eventId
 * 
 * 
 *-----------------------------------------------------------------------------
 * 位置とセルフスイッチの状態を初期化する
 *-----------------------------------------------------------------------------
 * 記録した一時イベントの状態は、以下のプラグインコマンドで初期化できます。
 * 
 * ERS_一時イベント初期化 [マップID] [イベントID]
 * ERS_RESET_PREFABEVENT [mapId] [eventId]
 * 
 * イベントIDは、生成した一時イベントのIDです。
 * イベントIDを指定しない場合は、指定したマップIDのすべての一時イベントを
 * 初期化します。
 * また、元となるイベントの実行内容欄で記述する場合は、
 * this._eventId で一時イベント自身のIDを指定できます。
 * 
 * マップIDも指定しない場合は、すべてのマップの一時イベントを初期化します。
 * 
 * マップIDやイベントIDには、\V[x]のようにすることでゲーム内変数の値を
 * 指定できます。
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
 * プラグイン公開場所
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/11/14 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {
    //EventReSpawn.jsがない場合、プラグインを無効にする
    if (typeof Game_PrefabEvent == 'undefined') return;

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_EventReSpawnEx');

    /*---------------------------------------------------------------*/
    //objのメモ欄に指定したメタ情報があれば真を返す
    // metacodes の記述は配列形式で入力します
    //
    // 例) metacodes = ["メタA","メタB"]
    //   この場合、<メタA>または<メタB>の記述があるかどうか判定する
    /*---------------------------------------------------------------*/
    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgNumber = function(arg) {
        try {
            var arg = convertEscapeCharacters(arg);
            return Number(eval(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _ERS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _ERS_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/ERS_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '一時イベント初期化':
            case 'RESET_PREFABEVENT':
                this.resetPrefabEventCondition(args);
                break;
            case '一時イベント記録':
            case 'SAVE_PREFABEVENT':
                this.savePrefabEventCondition(args);
                break;
        }
    };

    Game_Interpreter.prototype.resetPrefabEventCondition = function(args) {
        var mapId = setArgNumber(args[0]);
        var datas = $gameSystem._prefabEventDatas;
        if (mapId) {
            var eventId = setArgNumber(args[1]);
            if (eventId) {
                datas[mapId][eventId] = null;
            } else {
                datas[mapId] = [];
            }
        } else {
            $gameSystem._prefabEventDatas = [];
        }
    };

    Game_Interpreter.prototype.savePrefabEventCondition = function(args) {
        var datas = $gameSystem._prefabEventDatas;
        var eventId = setArgNumber(args[0]);
        if (eventId) {
            $gameMap.events()[eventId].savePrefabEventCondition();
        } else {
            $gameSystem.savePrefabEventCondition(this._mapId);
        }
    };

    //=============================================================================
    // Game_Event
    // イベントのセルフスイッチに関する操作処理を追加
    //=============================================================================

    //各セルフスイッチの状態を読み取って配列で返す
    Game_Event.prototype.readSelfSwitchies = function() {
        return ['A', 'B', 'C', 'D'].map( function(code) {
            var key = [this._mapId, this._eventId, code];
            return $gameSelfSwitches.value(key);
        },this);
    };

    //引数で指定した配列の内容に従い、各セルフスイッチの状態を変更する
    Game_Event.prototype.setSelfSwitchies = function(conditions) {
        if (!conditions) return;
        ['A', 'B', 'C', 'D'].forEach( function(code, i) {
            var key = [this._mapId, this._eventId, code];
            $gameSelfSwitches.setValue(key, conditions[i]);
        },this);
    };

    //=============================================================================
    // Game_System
    // 一時イベントの座標とセルフスイッチの状態の保存先を定義
    //=============================================================================
    var _ERS_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _ERS_Game_System_initialize.call(this);
        this._prefabEventDatas = [];
    }

    Game_System.prototype.makePrefabEventConditionDatas = function(mapId) {
        if (!this._prefabEventDatas) this._prefabEventDatas = [];
        if (!this._prefabEventDatas[mapId]) this._prefabEventDatas[mapId] = [];
    };

    Game_System.prototype.savePrefabEventCondition = function(mapId) {
        $gameMap.events().forEach( function(event){
            if (event.isPrefab()) event.savePrefabEventCondition();
        },this);
    };

    //=============================================================================
    // Scene_Map
    // 場所移動時に一時イベントの状態を記録する処理を追加
    //=============================================================================
    var _ERS_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _ERS_Scene_Map_start.call(this);
        $gameSystem.makePrefabEventConditionDatas($gameMap.mapId());
    };

    var _ERS_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        if (SceneManager.isNextScene(Scene_Map)) {
            $gameSystem.savePrefabEventCondition($gameMap.mapId());
        }
        _ERS_Scene_Map_terminate.call(this);
    };

    //=============================================================================
    // Game_PrefabEvent
    // 一時イベント生成時に、記録した状態を読み込む処理を追加
    //=============================================================================
    Game_PrefabEvent.prototype.conditionData = function() {
        $gameSystem.makePrefabEventConditionDatas($gameMap.mapId());
        return $gameSystem._prefabEventDatas[this._mapId][this._eventId];
    };

    Game_PrefabEvent.prototype.setCondtionData = function(self, x, y) {
        $gameSystem._prefabEventDatas[this._mapId][this._eventId] = {
            self: self,
            x: x,
            y: y,
        };
    };

    Game_PrefabEvent.prototype.savePrefabEventCondition = function() {
        if (this.isSaveConditions()) {
            $gameSystem.makePrefabEventConditionDatas($gameMap.mapId());
            this.setCondtionData(
                this.readSelfSwitchies(),
                this._x,
                this._y
            );
        }
    };
   
    var _ERS_Game_PrefabEvent_locateWithoutStraighten = Game_PrefabEvent.prototype.locateWithoutStraighten;
    Game_PrefabEvent.prototype.locateWithoutStraighten = function(x, y) {
        if (!!this.conditionData()) {
            this.loadConditionData();
        } else {
            _ERS_Game_PrefabEvent_locateWithoutStraighten.call(this, x, y);
        }
    };

    Game_PrefabEvent.prototype.isSaveConditions = function() {
        return hasObjectMeta(this.event(), ['ERS_記録', 'ERS_SAVE']);
    };

    Game_PrefabEvent.prototype.loadConditionData = function() {
        var data = this.conditionData();
        this.setPosition(data.x, data.y);
        this.setSelfSwitchies(data.self);
        this.refreshBushDepth();
    };

}());//END

