//=============================================================================
// 複数のマップを繋げて１つの大きなマップにするプラグイン
// FTKR_ConnectingMapGenerator.js
// プラグインNo : 83
// 作成者　　   : フトコロ
// 作成日　　   : 2018/04/22
// 最終更新日   : 
// バージョン   : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CMG = true;

var FTKR = FTKR || {};
FTKR.CMG = FTKR.CMG || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 複数のマップを繋げて１つの大きなマップにするプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 最大４つのマップを繋げて１つの大きなマップとして表示することができます。
 * 
 * 連結後のマップでは、各マップに設定したイベントも個々に実行することができます。
 * ただし、イベントのIDは、連結後のマップでは変わるため注意が必要です。
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
 * マップを連結する方法
 *-----------------------------------------------------------------------------
 * 場所移動コマンド実行前に、以下のプラグインコマンドを実行します。
 * ※[]は実際の入力に使用しません
 * 
 * 
 * CMG_マップ連結 [マップ1] [マップ2] [マップ3] [マップ4]
 * CMG_CONNECTING_MAP [map1] [map2] [map3] [map4]
 * 
 *    マップ1(map1)
 *        : 連結後にマップの左上に配置されるマップのIDを指定します。
 *          連結後のマップ設定は、マップ1の設定を引き継ぎます。
 * 
 *    マップ2(map2)
 *        : 連結後にマップの右上に配置されるマップのIDを指定します。
 * 
 *    マップ3(map3)
 *        : 連結後にマップの左下に配置されるマップのIDを指定します。
 * 
 *    マップ4(map4)
 *        : 連結後にマップの右下に配置されるマップのIDを指定します。
 * 
 * 
 * 入力例)
 * CMG_マップ連結 2 3 4 5
 * CMG_CONNECTING_MAP 2 3 4 5
 * 
 * 
 * マップを２つだけ連結させることも可能です。
 * 
 * 横に連結させる場合は、マップ3とマップ4に 0 を入力します。
 * 縦に連結させる場合は、マップ1とマップ4に 0 を入力します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連結マップから場所移動する場合
 *-----------------------------------------------------------------------------
 * 場所移動する場合は、必ず以下のコマンドを実行してください。
 * 
 * CMG_マップ連結解除
 * CMG_CLEAR_CONNECTING_MAP
 * 
 * 
 *-----------------------------------------------------------------------------
 * マップを連結させるための条件
 *-----------------------------------------------------------------------------
 * 連結させるマップ同士は幅や高さを合わせる必要があります。
 * 
 * 1. マップ1 と マップ2 の 高さ は同じにしてください。
 * 2. マップ1 と マップ3 の 幅 は同じにしてください。
 * 3. マップ2 と マップ4 の 幅 を同じにしてください。
 * 4. マップ3 と マップ4 の 高さ を同じにしてください。
 * 
 * また、タイルセットはすべてのマップで同じものを使用しなくてはいけません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連結後のマップ設定
 *-----------------------------------------------------------------------------
 * 連結後のマップ設定(*1)は、"マップ1"に使用したマップの設定を引き継ぎます。
 * 
 * (*1)引き継ぐマップ設定
 * ・スクロールタイプ
 * ・マップタイル
 * ・敵出現歩数
 * ・BGM自動演奏
 * ・BGS自動演奏
 * ・戦闘背景設定
 * ・ダッシュ禁止設定
 * ・遠景設定
 * ・メモの内容
 * 
 * 例えば、以下のコマンドで連結した場合
 *    CMG_マップ連結 2 3 4 5
 * 連結後のマップ設定は、マップID2と同じです。
 * 
 * 
 * 以下の設定については連結連結前後で変わるため注意が必要です。
 * 
 * ・エンカウント
 * ・イベントID
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連結後のマップのエンカウント
 *-----------------------------------------------------------------------------
 * 連結後のマップのエンカウントは、それぞれのマップで設定した
 * エンカウントの設定を合成したものになります。
 * 
 * 例えば、連結前のマップで
 * ・マップ1の全域に敵グループID1
 * ・マップ2の全域に敵グループID2
 * を設定していた場合は、連結後は
 * ・連結マップ全域に敵グループID1と敵グループID2
 * がエンカウントするようになります。
 * 
 * 
 * また、リージョンによるエンカウント設定の場合も、同様で
 * 例えば、連結前のマップで
 * ・マップ1のリージョン1に敵グループID1
 * ・マップ2のリージョン1に敵グループID2
 * ・マップ3のリージョン2に敵グループID3
 * を設定していた場合は、連結後は
 * ・連結マップのリージョン1に敵グループID1と敵グループID2
 * ・連結マップのリージョン2に敵グループID3
 * がエンカウントするようになります。
 * 
 * これは、連結前のマップ1でリージョン2に設定していたエリアにも
 * 連結後は、敵グループID3が出現するようになる、ということです。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 連結後のマップのイベントID
 *-----------------------------------------------------------------------------
 * 連結後のマップのイベントIDは、以下のスクリプトで取得できます。
 * 
 * this.cmgEventId(mapId, eventId)
 *    mapId   : そのイベントを作成したマップのID(データベース上のマップです)
 *    eventId : そのイベントを作成したマップ上のイベントID
 * 
 * 入力例)
 *    this.cmgEventId(2, 3)
 * 
 * 
 * ただし、そのイベント内であれば、this._eventId で自分のIDを取得できます。
 * これは、連結後も変わりません。
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
 * v1.0.0 - 2018/04/22 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
var $dataMap0         = null;
var $dataMap1         = null;
var $dataMap2         = null;
var $dataMap3         = null;

function Game_CmgEvent() {
    this.initialize.apply(this, arguments);
}

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
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ConnectingMapGenerator');

    //=============================================================================
    // DataManager
    //=============================================================================
    DataManager._mapLoaders = [];
    DataManager._errorUrls = [];
    
    DataManager.loadConnectingMapData = function(mapId, index) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this._mapLoaders[index] = ResourceHandler.createLoader('data/' + filename, this.loadConnectingDataFile.bind(this, '$dataMap' + index, filename, index));
            this.loadConnectingDataFile('$dataMap' + index, filename, index);
        } else {
            this.makeEmptyMap();
        }
    };

    DataManager.loadConnectingDataFile = function(name, src, index) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                window[name] = JSON.parse(xhr.responseText);
                DataManager.onConnectingLoad(window[name]);
            }
        };
        xhr.onerror = this._mapLoaders[index] || function() {
            DataManager._errorUrls[index] = DataManager._errorUrl || url;
        };
        window[name] = null;
        xhr.send();
    };

    DataManager.onConnectingLoad = function(object) {
        var array;
        if (object === $dataMap) {
            this.extractMetadata(object);
            array = object.events;
        }
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
    };

    DataManager.checkCmgError = function(index) {
        if (DataManager._errorUrls[index]) {
            throw new Error('Failed to load: ' + DataManager._errorUrls[index]);
        }
    };

    DataManager.isConnectingMapsLoaded = function(arr) {
        if (Array.isArray(arr)) {
            return arr.every(function(ar, i){
                if (!$gamePlayer._connectingMaps[i]) return true;
                var result = this.isConnectingMapLoaded(i);
                return result
            },this);
        }
        return false;
    };

    DataManager.isConnectingMapLoaded = function(index) {
        this.checkCmgError(index);
        return this.dataMap(index);
    };

    DataManager.dataMap = function(cmgMapId) {
        switch(cmgMapId) {
            case 0:
                return $dataMap0;
            case 1:
                return $dataMap1;
            case 2:
                return $dataMap2;
            case 3:
                return $dataMap3;
        }
        return $dataMap;
    };

    DataManager.pushMapData = function(data, mapId, index) {
        var dataMap = this.dataMap(mapId);
        if (!!dataMap) {
            var len = dataMap.width;
            var newdata = dataMap.data.slice(index * len, (index + 1) * len);
            Array.prototype.push.apply(data, newdata);
        }
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _CMG_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _CMG_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/CMG_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'マップ連結':
            case 'CONNECTING_MAP':
                $gamePlayer._connectingMaps = [setArgNum(args[0]),setArgNum(args[1]),setArgNum(args[2]),setArgNum(args[3])];
                break;
            case 'マップ連結解除':
            case 'CLEAR_CONNECTING_MAP':
                $gamePlayer._connectingMaps = null;
                $dataMap0 = null;
                $dataMap1 = null;
                $dataMap2 = null;
                $dataMap3 = null;
                break;
        }
    };

    Game_Interpreter.prototype.cmgEventId = function(mapId, eventId) {
        var cmgMapId = 0;
        var num = 0;
        $gamePlayer._connectingMaps.some( function(cmapId, i){
            if (cmapId === mapId) {
                cmgMapId = i;
                return true;
            }
        });
        if (cmgMapId > 0) num += $dataMap0.events.length;
        if (cmgMapId > 1) num += $dataMap1.events.length;
        if (cmgMapId > 2) num += $dataMap2.events.length;
        return num + eventId;
    };

    //=============================================================================
    // Game_Player
    //=============================================================================

    var _CMG_Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring()) {
            var maps = this._connectingMaps;
            if (maps) {
                if ([maps[1],maps[3]].contains(this._newMapId)) this._newX += $dataMap0.width;
                if ([maps[2],maps[3]].contains(this._newMapId)) this._newY += $dataMap0.height;
                this._newMapId = this._connectingMaps[0];
            }
        }
        _CMG_Game_Player_performTransfer.call(this);
    };

    //=============================================================================
    // Game_CmgEvent
    //=============================================================================

    Game_CmgEvent.prototype = Object.create(Game_Event.prototype);
    Game_CmgEvent.prototype.constructor = Game_CmgEvent;

    Game_CmgEvent.prototype.initialize = function(mapId, eventId, cmgMapId) {
        this._cmgMapId = cmgMapId;
        Game_Event.prototype.initialize.call(this, mapId, eventId);
        var x = this.event().x;
        if ([1,3].contains(cmgMapId)) x += $dataMap0.width;
        var y = this.event().y;
        if ([2,3].contains(cmgMapId)) y += $dataMap0.height;
        this.locate(x, y);
        this.refresh();
    };

    //=============================================================================
    // Game_Map
    //=============================================================================

    //書き換え
    var _CMG_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _CMG_Game_Map_setupEvents.call(this);
        if ($gamePlayer._connectingMaps) {
            this._events = [];
            for (var i = 0; i < $dataMap.events.length; i++) {
                if ($dataMap.events[i]) {
                    var cmgMapId = this.cmgMapId(i);
                    this._events[i] = new Game_CmgEvent(this._mapId, i, cmgMapId);
                }
            }
        }
    };

    Game_Map.prototype.cmgMapId = function(index) {
        if (!$gamePlayer._connectingMaps) return -1;
        if ($dataMap0) {
            var len = $dataMap0.events.length;
            if (len > index) return 0;
        }
        if ($dataMap1) {
            len += $dataMap1.events.length;
            if (len > index) return 1;
        }
        if ($dataMap2) {
            len += $dataMap2.events.length;
            if (len > index) return 2;
        }
        if ($dataMap3) {
            len += $dataMap3.events.length;
            if (len > index) return 3;
        }
        return -1;
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    var _CMG_Scene_Map_create = Scene_Map.prototype.create
    Scene_Map.prototype.create = function() {
        if ($gamePlayer._connectingMaps && $gamePlayer._connectingMaps.length) {
            Scene_Base.prototype.create.call(this);
            this._transfer = $gamePlayer.isTransferring();
            $gamePlayer._connectingMaps.forEach(function(cmapId, i){
                if (cmapId > 0) DataManager.loadConnectingMapData(cmapId, i);
            });
            this._cmgMapCreate = true;
        } else {
            _CMG_Scene_Map_create.call(this);
        }
    };

    var _CMG_Scene_Map_isReady = Scene_Map.prototype.isReady;
    Scene_Map.prototype.isReady = function() {
        if ($gamePlayer._connectingMaps) {
            if (!DataManager.isConnectingMapsLoaded($gamePlayer._connectingMaps)) {
                return false;
            } else {
                if (this._cmgMapCreate) {
                    var mapId = $gamePlayer._connectingMaps[0];
                    DataManager.loadMapData(mapId);
                    this._cmgMapCreate = false;
                }
                if (!this._mapLoaded && DataManager.isMapLoaded()) {
                    if ($gamePlayer._connectingMaps) this.createConnectingMap();
                    this.onMapLoaded();
                    this._mapLoaded = true;
                }
                return this._mapLoaded && Scene_Base.prototype.isReady.call(this);
            }
        } else {
            return _CMG_Scene_Map_isReady.call(this);
        }
    };

    Scene_Map.prototype.createConnectingMap = function() {
        this.setupConnectingMapData();
        this.setupConnectingMapEvents();
        this.setupConnectingMapEncounterList();
    };

    Scene_Map.prototype.setupConnectingMapData = function() {
        var data = [];
        var newdata = [];
        var len0 = $dataMap0 ? $dataMap0.width : 0;
        var len1 = $dataMap1 ? $dataMap1.width : 0;
        var num0 = $dataMap0 ? $dataMap0.height : 0;
        for (var i = 0; i < 6; i++) {
            if (!!$dataMap0) {
                for (var h = num0 * i; h < num0 * (i + 1); h++) {
                    DataManager.pushMapData(data, 0, h);
                    DataManager.pushMapData(data, 1, h);
                }
                $dataMap.width = len0 + len1;
            }
            if (!!$dataMap2) {
                var num1 = $dataMap2.height;
                for (var h = num1 * i; h < num1 * (i + 1); h++) {
                    DataManager.pushMapData(data, 2, h);
                    DataManager.pushMapData(data, 3, h);
                }
                $dataMap.height = num0 + num1;
            }
        }
        $dataMap.data = data;
    };

    Scene_Map.prototype.setupConnectingMapEvents = function() {
        var events = [];
        $gamePlayer._connectingMaps.forEach(function(map, i){
            if (map) {
                var cmgEvents = DataManager.dataMap(i).events;
                Array.prototype.push.apply(events, cmgEvents);
            }
        });
        $dataMap.events = events;
    };
    Scene_Map.prototype.setupConnectingMapEncounterList = function() {
        var encounterList = [];
        $gamePlayer._connectingMaps.forEach(function(map, i){
            if (map) {
                var list = DataManager.dataMap(i).encounterList;
                Array.prototype.push.apply(encounterList, list);
            }
        });
        $dataMap.encounterList = encounterList;
    };

}());//EOF
