//=============================================================================
// 複数のマップを繋げて１つの大きなマップにするプラグイン
// FTKR_ConnectingMapGenerator.js
// プラグインNo : 83
// 作成者　　   : フトコロ
// 作成日　　   : 2018/04/22
// 最終更新日   : 2018/04/22
// バージョン   : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CMG = true;

var FTKR = FTKR || {};
FTKR.CMG = FTKR.CMG || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 複数のマップを繋げて１つの大きなマップにするプラグイン
 * @author フトコロ
 *
 * @param 連結マップの横サイズ
 * @desc 横に連結させるマップの数。ゲーム中で変更可能です。
 * @default 2
 * @type number
 * @min 0
 *
 * @param 連結マップの縦サイズ
 * @desc 縦に連結させるマップの数。ゲーム中で変更可能です。
 * @default 2
 * @type number
 * @min 0
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 複数のマップを繋げて１つの大きなマップとして表示することができます。
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
 * まず、縦横に何枚のマップを連結させてマップを生成するか設定します。
 * 
 * 設定方法は以下の２通りです。
 * ・プラグインパラメータで縦横の枚数の初期値を設定。
 * ・以下のプラグインコマンドを実施し、場所移動ごとに設定。
 * 
 * プラグインコマンド
 * ※[]は実際の入力に使用しません
 * 
 * CMG_連結マップサイズ [横のマップ数] [縦のマップ数]
 * CMG_CONNECTING_MAP_SIZE [cols] [lines]
 * 
 *    横のマップ数(cols)
 *        : 横に連結させるマップの数を変更します。
 * 
 *    縦のマップ数(lines)
 *        : 縦に連結させるマップの数を変更します。
 * 
 * 
 * 
 * 次に、以下のプラグインコマンドを実行し、連結させるマップIDを指定します。
 * なお、この時に、同じマップIDを複数回入力することが可能です。
 * ※[]は実際の入力に使用しません
 * 
 * 
 * CMG_マップ連結 [マップ1] [マップ2] [マップ3] [マップ4] ...
 * CMG_CONNECTING_MAP [map1] [map2] [map3] [map4] ...
 * 
 *    マップ1(map1)
 *        : 連結後にマップの左上に配置されるマップのIDを指定します。
 *          連結後のマップ設定は、マップ1の設定を引き継ぎます。
 * 
 *    マップ*(map*)
 *        : 連結させるマップの数だけ、マップIDを指定します。
 *        : 縦横2*2の場合は マップ4 まで、縦横3*3の場合は マップ9 まで入力します。
 * 
  * 入力例) 2*2のマップを連結させる場合の入力
 * 　CMG_マップ連結 2 3 4 5
 * 　CMG_CONNECTING_MAP 2 3 4 5
 * 
 * 
 * 連結した時のマップの配置は、
 * マップ1を左上に、そこから右にマップ2、マップ3、...と配置します。
 * 横のマップ数上限に達した場合、１段下に下がり、マップを連結し
 * 画面右下が一番最後のマップになります。
 * 
 * 簡単なマップ配置イメージ
 * 
 * ・1*2の場合
 *    1 2 
 * 
 * ・2*2の場合　　　・3*2の場合
 *    1 2 　　　　　  1 2 3
 *    3 4 　　　　　  4 5 6
 * 
 * ・3*3の場合
 *    1 2 3
 *    4 5 6
 *    7 8 9
 * 
 * 
 * 連結マップのサイズと、連結させるマップIDを設定したら
 * 場所移動イベントを実行してください。
 * 
 * 場所移動時のマップIDと座標の設定は、連結させるマップのいずれかを選べば
 * 連結後のその位置に移動します。
 * 
 * なお、同じマップIDを複数回連結させている場合は、一番最初に配置した場所の
 * マップ上に移動します。
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
 * 連結させるマップ同士の幅や高さを合わせる必要があります。
 * 
 * 例えば、2*2のマップを連結させる場合、
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
 * $gameMap.cmgEventId(mapId, eventId)
 *    mapId   : そのイベントを作成したマップのID(データベース上のマップです)
 *    eventId : そのイベントを作成したマップ上のイベントID
 * 
 * 入力例)
 *    $gameMap.cmgEventId(2, 3)
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
 * v1.1.0 - 2018/04/22 : 仕様変更
 *    1. 連結する縦横のマップの数を設定する機能を追加。4つ以上のマップを連結可能。
 *    2. マップ数の設定機能に合わせて、連結するマップIDを設定する
 *       プラグインコマンドの仕様を変更。
 * 
 * v1.0.1 - 2018/04/22 : ヘルプの誤記修正
 * 
 * v1.0.0 - 2018/04/22 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
var $dataCmgMaps = [];

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

    FTKR.CMG = {
        mapW : paramParse(parameters['連結マップの横サイズ']),
        mapH : paramParse(parameters['連結マップの縦サイズ']),
    };

    //=============================================================================
    // DataManager
    //=============================================================================
    DataManager._mapLoaders = [];
    DataManager._errorUrls = [];
    
    DataManager.loadConnectingMapData = function(mapId, index) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this._mapLoaders[index] = ResourceHandler.createLoader('data/' + filename, this.loadConnectingDataFile.bind(this, '$dataCmgMaps', filename, index));
            this.loadConnectingDataFile('$dataCmgMaps', filename, index);
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
                if (!window[name]) window[name] = [];
                window[name][index] = JSON.parse(xhr.responseText);
                DataManager.onConnectingLoad(window[name][index]);
            }
        };
        xhr.onerror = this._mapLoaders[index] || function() {
            DataManager._errorUrls[index] = DataManager._errorUrl || url;
        };
        window[name][index] = null;
        xhr.send();
    };

    DataManager.onConnectingLoad = function(object) {
        var array;
        this.extractMetadata(object);
        array = object.events;
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
        return $dataCmgMaps[cmgMapId] || $dataMap;
    };

    DataManager.pushMapData = function(data, mapId, index) {
        var dataMap = this.dataMap(mapId);
        if (!!dataMap) {
            var len = dataMap.width;
            var newdata = dataMap.data.slice(index * len, (index + 1) * len);
            Array.prototype.push.apply(data, newdata);
        }
    };

    DataManager.cmgMapId = function(mapId) {
        if (!$gamePlayer._connectingMaps) return -1;
        var cmgMapId = -1;
        $gamePlayer._connectingMaps.some(function(cMap, i){
            if (cMap && cMap === mapId) {
                cmgMapId = i;
                return true;
            }
        });
        return cmgMapId;
    };

    DataManager.cmgMapW = function() {
        return this._cmgMapW || 0;
    };

    DataManager.cmgMapH = function() {
        return this._cmgMapH || 0;
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
            case '連結マップサイズ':
            case 'CONNECTING_MAP_SIZE':
                DataManager._cmgMapW = setArgNum(args[0]);
                DataManager._cmgMapH = setArgNum(args[1]);
                break;
            case 'マップ連結':
            case 'CONNECTING_MAP':
                $gamePlayer._connectingMaps = args.map(function(arg){
                    return setArgNum(arg);
                });
                break;
            case 'マップ連結解除':
            case 'CLEAR_CONNECTING_MAP':
                $gamePlayer._connectingMaps = null;
                $dataCmgMaps = [];
                break;
        }
    };

    //=============================================================================
    // Game_Player
    //=============================================================================

    Game_Character.prototype.getCmgMapX = function(cmgMapId, mapX) {
        for (var i = 0; i < cmgMapId % DataManager.cmgMapW(); i++) {
            mapX += DataManager.dataMap(i).width;
        }
        return mapX;
    };

    Game_Character.prototype.getCmgMapY = function(cmgMapId, mapY) {
        var m = 0;
        if (cmgMapId >= DataManager.cmgMapW()){
            for (var i = 0; i < Math.ceil(cmgMapId / DataManager.cmgMapH()); i++) {
                mapY += DataManager.dataMap(m).height;
                m += DataManager.cmgMapW();
            }
        }
        return mapY;
    };

    //=============================================================================
    // Game_Player
    //=============================================================================

    var _CMG_Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _CMG_Game_Player_initMembers.call(this);
        DataManager._cmgMapW = FTKR.CMG.mapW;
        DataManager._cmgMapH = FTKR.CMG.mapH;
    };

    var _CMG_Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring()) {
            var maps = this._connectingMaps;
            if (maps) {
                var cmgMapId = DataManager.cmgMapId(this._newMapId);
                this._newX = this.getCmgMapX(cmgMapId, this._newX);
                this._newY = this.getCmgMapY(cmgMapId, this._newY);
                this._newMapId = this._connectingMaps[0];
                console.log(this._newX, this._newY);
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
        var x = this.getCmgMapX(this._cmgMapId, this.event().x);
        var y = this.getCmgMapY(this._cmgMapId, this.event().y);
        this.locate(x, y);
        this.refresh();
    };

    //=============================================================================
    // Game_Map
    //=============================================================================

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
        var cmgMapId = -1;
        var len = 0;
        $dataCmgMaps.some(function(dataMap, i){
            if (dataMap) {
                len += dataMap.events.length;
                if (len > index) {
                    cmgMapId = i;
                    return true;
                }
            }
        });
        return cmgMapId;
    };

    Game_Map.prototype.cmgEventId = function(mapId, eventId) {
        var cmgMapId = 0;
        var num = 0;
        $gamePlayer._connectingMaps.some( function(cmapId, i){
            if (cmapId === mapId) {
                cmgMapId = i;
                return true;
            }
        });
        $dataCmgMaps.forEach( function(dataMap, i){
            if (i < $dataCmgMaps.length - 1) {
                if (cmgMapId > i) num += dataMap.events.length;
            }
        });
        return num + eventId;
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
        this.setupConnectingMapWidth();
        this.setupConnectingMapHeight();
        this.setupConnectingMapEvents();
        this.setupConnectingMapEncounterList();
    };

    Scene_Map.prototype.setupConnectingMapData = function() {
        var data = [];
        var mapH = DataManager.cmgMapH();
        var mapW = DataManager.cmgMapW();
        var dataMap = null;
        for (var i = 0; i < 6; i++) {
            for (var m = 0; m < mapH; m++) {
                dataMap = DataManager.dataMap(mapW * m);
                if (!!dataMap) {
                    var num = dataMap.height;
                    for (var h = num * i; h < num * (i + 1); h++) {
                        for (var v = mapW * m; v < mapW * (m + 1); v++) {
                            DataManager.pushMapData(data, v, h);
                        }
                    }
                }
            }
        }
        $dataMap.data = data;
    };

    Scene_Map.prototype.setupConnectingMapWidth = function() {
        var width = 0;
        $dataCmgMaps.some( function(dataMap, i){
            if (i >= DataManager.cmgMapW()) return true;
            if (dataMap) {
                width += dataMap.width;
            }
        });
        $dataMap.width = width;
    };

    Scene_Map.prototype.setupConnectingMapHeight = function() {
        var height = 0;
        $dataCmgMaps.forEach( function(dataMap, i){
            if (!(i % DataManager.cmgMapW())) {
                if (dataMap) {
                    height += dataMap.height;
                }
            }
        });
        $dataMap.height = height;
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
