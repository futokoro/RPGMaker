//=============================================================================
// tomoakyさんのシューティングプラグインの機能拡張プラグイン(試作版)
// FTKR_addon_TMShootng.js
// プラグインNo : 84
// 作成者　　   : フトコロ
// 作成日　　   : 2018/05/06
// 最終更新日   : 2018/05/09
// バージョン   : v0.2.1
//=============================================================================
//=============================================================================
// TMPlugin - シューティング(TMShooting.js)
// バージョン: 1.3.4
// 最終更新日: 2018/04/23
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_addon_TMShooing = true;

var FTKR = FTKR || {};
FTKR.TMS = FTKR.TMS || {};

//=============================================================================
/*:
 * @plugindesc v0.2.1 tomoakyさんのシューティングプラグインの機能拡張プラグイン(試作版)
 * @author フトコロ
 *
 * @param Default Break Animation
 * @desc タイル消去時のアニメーションを設定します。
 * @default 
 * @type animation
 * @require 1
 * 
 * @param MapID For Setting Tile
 * @text タイル設定用マップID
 * @desc タイル設定用マップIDを指定します。タイルセットごとに指定してください。
 * @default
 * @type struct<tileset>[]
 *
 * @noteParam shotCollideActor
 * @noteRequire 1
 * @noteType animation
 * @noteData actors
 * 
 * @noteParam shotCollideWeapon
 * @noteRequire 1
 * @noteType animation
 * @noteData weapons
 * 
 * @noteParam shotCollideState
 * @noteRequire 1
 * @noteType animation
 * @noteData states
 * 
 * @noteParam changeAnimeId
 * @noteRequire 1
 * @noteType animation
 * @noteData events
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * tomoakyさんのシューティングプラグイン(TMShooting.js)の拡張プラグインです。
 * 下記の機能を追加します。
 * このプラグインは(試作版)です。今後大きく仕様が変更する可能性があります。
 * 
 * 
 * 1. 特定のマップタイルにプレイヤーの弾が接触すると、そのタイルを別のタイルに変更する。
 * 
 *    ＜変更できるタイルの設定＞
 *    変更できるタイルは、レイヤーBおよびCのタイルのみです。
 *    １マスタイル(壺など)と、２マスタイル(木など)を設定できます。
 *    プラグインパラメータで、タイルセットとその設定用のマップIDを指定します。
 *    さらに１マスタイルと２マスタイルの設定を行う行を指定します。
 * 
 *    設定用マップでのタイルの設置について
 *      変更前のタイルは0,2,4,...と1列おきに設置します。
 *      変更後のタイルは、変更前の右隣の列に設置します。
 * 
 *    例えば２マスタイルの設定行が 2 の場合
 *      木のタイルの上部を 0列2行目、下部を0列3行目に設置します。
 *      変更後のタイルはその隣の列に設置します。消去の場合は設置しません。
 *      １マスタイルに変更する場合は、1列3行目に設置してください。
 * 
 *    タイルには変更までの接触回数の設定ができます。
 *      変更前のタイルにイベントを設置し、イベントのメモ欄に<tileHp:n>と入力します。
 *      この n の値が接触回数になります。例)<tileHp:5>
 *      ２マスタイルの場合は、上部に設置してください。
 * 
 * 
 *    ＜変更時のアニメーションの設定方法＞
 *    設定方法は、以下があります。
 *      1. プラグインパラメータで共通設定
 *      2. タイルイベントのメモ欄に<changeAnimeId:n>と入力。n がアニメーションID。
 * 
 *    両方で設定している場合は、２のタイルイベント側の設定を使用します。
 *    設定しない場合は、アニメーションは表示しません。
 * 
 * 
 * 
 * 2. プレイヤーの弾が通行不可タイルやイベントに接触し、タイルの変更やイベントの
 *    撃破がない場合に、アクターや装備、ステートで指定したアニメーションを表示する。
 * 
 *    以下のタグをメモ欄に設定すると、そのアニメーションを接触時に表示します。
 *    設定の優先度は、ステート＞武器＞アクターです。
 * 
 *    アクター
 *    <shotCollideActor:n>
 *        n : アニメーションID
 * 
 *    武器
 *    <shotCollideWeapon:n>
 *        n : アニメーションID
 *    
 *    ステート
 *    <shotCollideState:n>
 *        n : アニメーションID
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. このプラグインの動作には、TMShooting.jsプラグインが必要です。
 *    このプラグインは、TMShooting.jsの下に配置してください。
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
 * v0.2.1 - 2018/05/09 : 不具合修正
 *    1. ディプロイメント時にタイル接触アニメーションが残るように修正。
 *    2. タイル接触アニメーション設定用のタグを変更。
 * 
 * v0.2.0 - 2018/05/09 : 機能追加
 *    1. プレイヤーの弾が通行不可タイルやイベントに接触し、タイルの変更やイベントの
 *       撃破がない場合に、アクターやスキル、武器で指定したアニメーションを表示する
 *       機能を追加。
 *    2. タイルごとに変更時のアニメーションを設定する機能を追加。
 * 
 * v0.1.0 - 2018/05/06 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~tileset:
 * @param tileset
 * @text タイルセット
 * @desc タイルセットを指定します。
 * @type tileset
 * @default 
 * 
 * @param mapId
 * @text マップID
 * @desc 指定したタイルセット設定用のマップIDを設定します。
 * @type number
 * @default 
 * 
 * @param _1PartLine
 * @text 1マスタイルの設定行
 * @desc 1マスタイル設定用の行を指定します。複数行指定可能です。
 * @type number[]
 * @min 0
 * @default ["0"]
 * 
 * @param _2VPartsLine
 * @text 縦2マスタイルの設定行
 * @desc 縦2マスタイル設定用の行を指定します。複数行指定可能です。
 * @type number[]
 * @min 0
 * @default ["2"]
 * 
*/

$tileSettingDatas = [];

(function() {

    var parameters = PluginManager.parameters('FTKR_addon_TMShooting');

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

    FTKR.TMS = {
        defaultAnime  : paramParse(parameters['Default Break Animation']) || 0,
        settingMapIds : paramParse(parameters['MapID For Setting Tile']) || [],
    };

    if (!FTKR.TMS.settingMapIds._1PartLine) FTKR.TMS.settingMapIds._1PartLine = [];
    if (!FTKR.TMS.settingMapIds._2VPartsLine) FTKR.TMS.settingMapIds._2VPartsLine = [];
//    if (!FTKR.TMS.settingMapIds._3SPartsLine) FTKR.TMS.settingMapIds._3SPartsLine = [];

    //=============================================================================
    // 弾の衝突判定の処理軽減
    //=============================================================================
/*
    var _TMS_Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _TMS_Game_Map_initialize.call(this);
        this._eventIdsXyTable = [];
    };

    var _TMS_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        this.initializeEventIdXyTable();
        _TMS_Game_Map_setupEvents.call(this);
        this.setupEventIdXyTable();
    };

    Game_Map.prototype.eventXyTableInterval = function() {
        return 0.5;
    };

    Game_Map.prototype.initializeEventIdXyTable = function() {
        var interval = this.eventXyTableInterval();
        for (var x = -1; x <= $dataMap.width; x += interval) {
            if (!this._eventIdsXyTable[x]) {
                this._eventIdsXyTable[x] = [];
            }
            for (var y = -1; y <= $dataMap.height; y += interval) {
                if (!this._eventIdsXyTable[x][y]) {
                    this._eventIdsXyTable[x][y] = [];
                }
            }
        }
    };

    Game_Map.prototype.setupEventIdXyTable = function() {
        this._events.forEach(function(event){
            if (event) {
                this._eventIdsXyTable[event.x][event.y].push(event.eventId());
            }
        },this);
    };

    //書き換え
    Game_Map.prototype.eventsXy = function(x, y) {
        return this._eventIdsXyTable[x][y].map( function(eventId){
            return this.event(eventId);
        },this);
    };

    //中心(x,y)で距離zまでの正方形範囲のイベントリストを取得
    Game_Map.prototype.eventsXySquare = function(x, y, z) {
        var lists = [];
        for (var dx = -z; dx <= z; dx = dx + 0.5) {
            if (x + dx < 0 || x + dx > $dataMap.width - 1) continue;
            for (var dy = -z; dy <= z; dy = dy + 0.5) {
                if (y + dy < 0 || y + dy > $dataMap.height - 1) continue;
                $gameMap.eventsXy(x + dx, y + dy).forEach(function(event){
                   if(event && event.eventId()) {
                      lists.push(event);
                   }
                },this);
            }
        }
        return lists;
    };

    // イベントキャラクターと接触しているかどうかを返す
    // 書き換え
    Game_Bullet.prototype.isCollidedWithEvents = function() {
      var x = Math.round(this._x);
      var y = Math.round(this._y);
      var events = $gameMap.eventsXySquare(x, y, 1);//修正
//      var events = $gameMap.events();
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (!event._through && this.isCollidedWithCharacter(event)) {
          if (this._collidedCharacters.indexOf(event.ownerId()) === -1) {
            this.executeDamage(event);
            this._collidedCharacters.push(event.ownerId());
            event.refresh();//追加
            return !this._penetrate;
          }
        }
      }
      return false;
    };
*/
    //=============================================================================
    // 弾の衝突によるマップタイルの消去とアニメーション表示機能
    //=============================================================================
    /*-------------------------------------------------------------------------/
    // Scene_Boot
    /-------------------------------------------------------------------------*/
    //タイル設定用のマップデータをゲーム開始時に読み込む
    var _Scene_Boot_create      = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function() {
        _Scene_Boot_create.apply(this, arguments);
        if (FTKR.TMS.settingMapIds.length) {
            this._loadSettingMapIndex = 0;
            DataManager.loadMapData(this.loadSettingMap().mapId);
        }
    };

    Scene_Boot.prototype.loadSettingMap = function() {
        return FTKR.TMS.settingMapIds[this._loadSettingMapIndex];
    };

    var _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function() {
        if (!this._mapLoaded && DataManager.isMapLoaded()) {
            this.onSettingMapLoaded();
            if (FTKR.TMS.settingMapIds.length > this._loadSettingMapIndex + 1) {
                this._loadSettingMapIndex++;
                var mapId = this.loadSettingMap().mapId;
                DataManager.loadMapData(mapId);
            } else {
                this._mapLoaded = true;
            }
        } else if (!FTKR.TMS.settingMapIds.length) {
            this._mapLoaded = true;
        }
        return this._mapLoaded && _Scene_Boot_isReady.call(this);
    };

    Scene_Boot.prototype.onSettingMapLoaded = function() {
        var tileset = this.loadSettingMap().tileset;
        $tileSettingDatas[tileset] = {
            data    : $dataMap.data,
            events  : $dataMap.events,
            width   : $dataMap.width,
            height  : $dataMap.height,
            setting : this.loadSettingMap()
        }
        $dataMap = undefined;
    };

    /*-------------------------------------------------------------------------/
    // Game_Character
    /-------------------------------------------------------------------------*/
    // プレイヤー（フォロワー）のショット処理
    var _TMS_Game_Character_executeShot = Game_Character.prototype.executeShot;
    Game_Character.prototype.executeShot = function() {
        var result = _TMS_Game_Character_executeShot.call(this);
        if (result) {
            var battler = this.battler();
            var shotParams = battler.shotParams();
            $gameMap.setShotCollideAnimeId(shotParams.collideAnimeId);
            return true;
        }
        return false;
    };

    /*-------------------------------------------------------------------------/
    // Game_Actor
    /-------------------------------------------------------------------------*/
    var _TMS_Game_Actor_refreshShotParam = Game_Actor.prototype.refreshShotParam;
    Game_Actor.prototype.refreshShotParam = function() {
        _TMS_Game_Actor_refreshShotParam.call(this);
        if (!!this._shotParams) {
            this._shotParams.collideAnimeId = 0;
            var data = this.actor();
            this._shotParams.collideAnimeId = +(data.meta.shotCollideActor || 0);
            var weapon = this.weapons()[0];
            if (weapon) {
              this._shotParams.collideAnimeId = +(weapon.meta.shotCollideWeapon || 0);
            }
            var items = this.states();
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              if (item) {
                if (item.meta.shotCollideState) this._shotParams.collideAnimeId = +item.meta.shotCollideState;
              }
            }
        }
    };

    /*-------------------------------------------------------------------------/
    // Game_Player
    /-------------------------------------------------------------------------*/

    var _Game_Player_initialize = Game_Player.prototype.initialize;
    Game_Player.prototype.initialize = function() {
        _Game_Player_initialize.call(this);
        this._changeTileMaps = [];
    };

    /*-------------------------------------------------------------------------/
    // Game_Bullet
    /-------------------------------------------------------------------------*/

    // フレーム更新
    var _Game_Bullet_update = Game_Bullet.prototype.update;
    Game_Bullet.prototype.update = function() {
        if (this.isAnimationPlaying()) {
            this._isBreakAnimationStarting = true;
            this._opacity = 0;
            return true;
        }
        return _Game_Bullet_update.call(this);
    };

    Game_Bullet.prototype.startAnimation = function(animationId) {
        this._animationId = animationId;
        this._animationPlaying = true;
    };

    Game_Bullet.prototype.isAnimationPlaying = function() {
        return this._animationId > 0 || this._animationPlaying || this._requestBreakAnimation;
    };

    Game_Bullet.prototype.endAnimation = function() {
        this._animationId = 0;
        this._animationPlaying = false;
    };

    /*-------------------------------------------------------------------------/
    // Game_PlayerBullet
    /-------------------------------------------------------------------------*/

    // 接触判定
    var _Game_PlayerBullet_updateCollide = Game_PlayerBullet.prototype.updateCollide;
    Game_PlayerBullet.prototype.updateCollide = function() {
        var result = _Game_PlayerBullet_updateCollide.call(this);
        if (this._isBreakAnimationStarting) {
            this._isBreakAnimationStarting = false;
            return true;
        }
        return this.isAnimationPlaying() ? false : result;
    };

    // 削除
    Game_PlayerBullet.prototype.erase = function() {
        Game_Bullet.prototype.erase.call(this);
        this._isBreaking = false;
    };

    // マップと接触しているかどうかを返す
    Game_PlayerBullet.prototype.isCollideMap = function() {
      var result = Game_Bullet.prototype.isCollideMap.call(this);
      if (result) {
          var x = Math.floor(this._x);
          var y = Math.floor(this._y);
          //var x = Math.round(this._x);
          //var y = Math.round(this._y);
          if (!this._isBreaking && $gameMap.changeMapTilesByBullet(x, y)) {
              this._isBreaking = true;
              var animeId = $gameMap.changeAnimeId() || FTKR.TMS.defaultAnime;
              if (animeId) {
                  this._breakAnimationId = animeId;
                  this._requestBreakAnimation = true;
              }
          } else if (!this._isBreaking && $gameMap.isValid(x, y) && this.collideAnimeId()) {
              this._isBreaking = true;
              this._breakAnimationId = this.collideAnimeId();
              this._requestBreakAnimation = true;
          }
      }
      return result;
    }

    // イベントキャラクターと接触しているかどうかを返す
    Game_PlayerBullet.prototype.isCollidedWithEvents = function() {
        var result = Game_Bullet.prototype.isCollidedWithEvents.call(this);
        if (result) {
            var x = Math.floor(this._x);
            var y = Math.floor(this._y);
            if (!this._isBreaking && this.collideAnimeId()) {
                this._isBreaking = true;
                this._breakAnimationId = this.collideAnimeId();
                this._requestBreakAnimation = true;
            }
        }
        return result;
    };

    Game_PlayerBullet.prototype.collideAnimeId = function() {
        return this._collideAnimeId;
    };

    Game_PlayerBullet.prototype.setShotCollideAnimeId = function(animeId) {
        this._collideAnimeId = animeId;
    };

    /*-------------------------------------------------------------------------/
    // Game_Map
    /-------------------------------------------------------------------------*/

    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        this.checkChangeTile(mapId);
        _Game_Map_setup.call(this, mapId);
        this.setupChangeTileList();
        this.createMapTileParamTable();
    };

    Game_Map.prototype.checkChangeTile = function(mapId) {
        if (!this.changeTileMap(mapId)) {
            $gamePlayer._changeTileMaps[mapId] = [];
        } else {
            if (this.changeTileMap(mapId).length) {
                this.changeTileMap(mapId).forEach( function(changeData){
                    this.changeTileId(changeData.x, changeData.y, changeData.z, changeData.id);
                },this);
            }
        }
    };

    Game_Map.prototype.settingMapTileId = function(x, y, z) {
        var dataMap = $tileSettingDatas[this._tilesetId];
        if (!dataMap) return 0;
        var width = dataMap.width;
        var height = dataMap.height;
        return dataMap.data[(z * height + y) * width + x] || 0;
    };

    Game_Map.prototype.settingMapEvent = function(x, y) {
        var dataMap = $tileSettingDatas[this._tilesetId];
        var meta = null;
        if (!dataMap) return meta;
        dataMap.events.some(function(event) {
            if (event && event.x == x && event.y == y) {
                meta = event.meta;
                return;
            }
        });
        return meta;
    };

    Game_Map.prototype.setChangeTileData = function(x, y) {
        var tile2Id = this.settingMapTileId(x, y, 2);
        var tile3Id = this.settingMapTileId(x, y, 3);
        var cTile2Id = this.settingMapTileId(x + 1, y, 2);
        var cTile3Id = this.settingMapTileId(x + 1, y, 3);
        if (!tile3Id && !tile2Id) return false;
        return {
            tile2Id   :tile2Id,
            tile3Id   :tile3Id,
            cTile2Id  :cTile2Id,
            cTile3Id  :cTile3Id,
            meta      :this.settingMapEvent(x, y)
        };
    };

    //マップタイル設定用マップから設定を読み込む
    Game_Map.prototype.setupChangeTileList = function() {
        this._1PartList = [];
        this._2VPartsList = [];
//        this._3SPartsList = [];
        var settingData = $tileSettingDatas[this._tilesetId];
        if (!settingData || !settingData.setting) return;
        //1Part
        settingData.setting._1PartLine.forEach( function(line) {
            for (var x = 0; x < settingData.width; x += 2) {
                this._1PartList.push(this.setChangeTileData(x, line));
            }
        },this);
        //2VParts
        settingData.setting._2VPartsLine.forEach( function(line) {
            for (var x = 0; x < settingData.width; x += 2) {
                var top     = this.setChangeTileData(x, line);
                var bottom  = this.setChangeTileData(x, line + 1);
                this._2VPartsList.push({top:top, bottom:bottom});
            }
        },this);
        /*
        //3SParts
        settingData.setting._3SPartsLine.forEach( function(line) {
            for (var x = 0; x < settingData.width; x += 3) {
                var data    = [
                    [
                        this.setChangeTileData(x, line),
                        this.setChangeTileData(x, line + 1),
                        this.setChangeTileData(x, line + 2)
                    ],
                    [
                        this.setChangeTileData(x + 1, line),
                        this.setChangeTileData(x + 1, line + 1),
                        this.setChangeTileData(x + 1, line + 2)
                    ],
                    [
                        this.setChangeTileData(x + 2, line),
                        this.setChangeTileData(x + 2, line + 1),
                        this.setChangeTileData(x + 2, line + 2)
                    ]
                ];
                this._3SPartsList.push(data);
            }
        },this);
        */
    };

    var _Game_Map_data = Game_Map.prototype.data;
    Game_Map.prototype.data = function() {
        this.checkChangeTile(this.mapId());
        return _Game_Map_data.call(this);
    };

    Game_Map.prototype.changeTileMap = function(mapId) {
        return $gamePlayer._changeTileMaps[mapId];
    };

    // マップのタイルの耐久設定
    Game_Map.prototype.createMapTileParamTable = function() {
        this._mapTileParamTable = [];
        for (var x = 0; x < $dataMap.width; x++) {
            this._mapTileParamTable.push([]);
            for (var y = 0; y < $dataMap.height; y++) {
                this.refreshMapTileParamTable(x, y);
            }
        }
    };

    Game_Map.prototype.refreshMapTileParamTable = function(x, y) {
        var tile2Id = this.tileId(x, y, 2);
        var tile3Id = this.tileId(x, y, 3);
        if (!tile2Id && !tile3Id) {
            this._mapTileParamTable[x][y] = {};
        } else if (this._1PartList.some(function(list){
            if (list.tile2Id == tile2Id && list.tile3Id == tile3Id) {
                if (list.meta) {
                    this._mapTileParamTable[x][y] = {
                        hp            : list.meta.tileHp || 0,
                        changeAnimeId : +list.meta.changeAnimeId || 0
                    };
                    return true;
                }
            }
        },this)) {
            //continue;
        } else if (this._2VPartsList.some(function(list){
            var data = list.bottom;
            if (data.tile2Id == tile2Id && data.tile3Id == tile3Id) {
                if (list.top.meta) {
                    this._mapTileParamTable[x][y] = {
                        hp            : list.top.meta.tileHp || 0,
                        changeAnimeId : list.top.meta.changeAnimeId || 0
                    };
                    return true;
                }
            }
        },this)) {
            //continue;
        } else {
            this._mapTileParamTable[x][y] = {};
        }
    };

    Game_Map.prototype.getMapTileChangeAnimeId = function(x, y) {
        return this._mapTileParamTable[x][y].changeAnimeId || 0;
    };

    //座標(X,Y)のマスの弾の通行を再チェック
    Game_Map.prototype.refreshBulletPassageTableXy = function(x, y) {
        if (this.regionId(x, y) === TMPlugin.Shooting.BulletBlockRegion) {
            this._bulletPassageTable[x][y] = false;
            return;
        }
        var flags = this.tilesetFlags();
        var passage = false;
        var tiles = this.layeredTiles(x, y);
        for (var i = 0; i < tiles.length; i++) {
            var flag = flags[tiles[i]];
            if (flag >> 12 === TMPlugin.Shooting.BulletBlockTag) {
                passage = false;
                break;
            };
            if ((flag & 0x10) !== 0) continue;
            if ((flag & 0x0f) !== 0x0f) {
                passage = true;
                break;
            }
            if ((flag & 0x0f) !== 0) break;
        }
        this._bulletPassageTable[x][y] = passage;
    };

    //指定したタイルの変更
    Game_Map.prototype.changeMapTilesByBullet = function(x, y) {
        if (this.isValid(x, y) && !this._bulletPassageTable[x][y]) {
            if (this.check1PartTiles(x, y) || this.check2VPartsTiles(x, y)) {
                //タイルを変更したら、弾の通過再チェックと画面の更新を行う
                if (this._changeMapTile) {
                    this._changeAnimeId = this.getMapTileChangeAnimeId(x, y);
                    this.refreshMapTileParamTable(x, y);
                    this.refreshBulletPassageTableXy(x, y);
                    SceneManager._spriteset._tilemap._requestRefreshTile = true;
                    this._changeMapTile = false;
                    return true;
                }
            }
        }
        return false;
    };

    Game_Map.prototype.changeAnimeId = function() {
        return this._changeAnimeId || 0;
    };

    Game_Map.prototype.checkUpperLayerTileId = function(x, y, data) {
        return (this.tileId(x, y, 2) == data.tile2Id &&
            this.tileId(x, y, 3) == data.tile3Id) ||
            (!this.tileId(x, y, 2) || !this.tileId(x, y, 3)) &&
            (!data.tile2Id || !data.tile3Id) &&
            Math.max(this.tileId(x, y, 2), this.tileId(x, y, 3)) == Math.max(data.tile2Id, data.tile3Id);
    };

    //１マスタイルの変更
    Game_Map.prototype.check1PartTiles = function(x, y) {
        var list = this._1PartList;
        return list.some( function(data) {
            return this.change1PartTileCollide(x, y, data);
        },this);
    };

    Game_Map.prototype.change1PartTileCollide = function(x, y, data) {
        if (this.checkUpperLayerTileId(x, y, data)) {
            if (this.executeDamage(x, y)) {
                this.changeTileIdLayers(x, y, data);
                this._changeMapTile = true;
            }
            return true;
        }
        return false;
    };

    // 弾によるタイルのダメージ処理
    Game_Map.prototype.executeDamage = function(x, y) {
        var map = this._mapTileParamTable[x][y];
        if (!map.hp) return true;
        map.hp--;
        return map.hp > 0 ? false : true;
    };

    //縦２マスタイル(木など)の変更
    Game_Map.prototype.check2VPartsTiles = function(x, y) {
        var list = this._2VPartsList;
        return list.some( function(data){
            return this.change2VPartsTiles(x, y, data);
        },this);
    };

    Game_Map.prototype.change2VPartsTiles = function(x, y, data) {
        if (!this.checkUpperLayerTileId(x, y, data.bottom)) return false;
        if (!this.checkUpperLayerTileId(x, y-1, data.top)) return false;
        if (this.executeDamage(x, y)) {
            this.changeTileIdLayers(x, y, data.bottom);
            this.changeTileIdLayers(x, y-1, data.top);
            this._changeMapTile = true;
        }
        return true;
    };

    //縦3横3マスタイル(テントなど)の変更
    Game_Map.prototype.check3SPartsTiles = function(x, y) {
        var list = this._3SPartsList;
        return list.some( function(data){
            return this.change3SPartsTiles(x, y, data);
        },this);
    };

    Game_Map.prototype.change3SPartsTiles = function(x, y, data) {
        var result = false;
        for (var v = 0; v < 3; v++) {
            for (var h = 0; v < 3; v++) {
                if (this.checkUpperLayerTileId(x + v, y + h, data[v][h])) {
                    result = true;
                    if (this.executeDamage(x, y)) {
                        this._changeMapTile = true;
                    }
                }
            }
        }
        if (!result) return false;
        for (var v = 0; v < 3; v++) {
            for (var h = 0; v < 3; v++) {
                this.changeTileIdLayers(x + v, y + h, data[v][h]);
            }
        }
        return true;
        /*
        if (!this.checkUpperLayerTileId(x, y, data.bottom)) return false;
        if (!this.checkUpperLayerTileId(x, y-1, data.top)) return false;
        if (this.executeDamage(x, y)) {
            this.changeTileIdLayers(x, y, data.bottom);
            this.changeTileIdLayers(x, y-1, data.top);
            this._changeMapTile = true;
        }
        return true;
        */
    };

    Game_Map.prototype.changeTileIdLayers = function(x, y, data) {
        this.changeTileId(x, y, 2, data.cTile2Id);
        this.saveChangeTileId(x, y, 2, data.cTile2Id);
        this.changeTileId(x, y, 3, data.cTile3Id);
        this.saveChangeTileId(x, y, 3, data.cTile3Id);
    };

    Game_Map.prototype.saveChangeTileId = function(x, y, z, changeId) {
        this.changeTileMap(this.mapId()).push({x:x, y:y, z:z, id:changeId});
    };

    Game_Map.prototype.changeTileId = function(x, y, z, changeId) {
        var width = $dataMap.width;
        var height = $dataMap.height;
        $dataMap.data[(z * height + y) * width + x] = changeId;
    };

    Game_Map.prototype.setShotCollideAnimeId = function(animeId) {
        var lastAlivePlayerBurretIndex = this._alivePlayerBullets.length - 1;
        var bulletIndex = this._alivePlayerBullets[lastAlivePlayerBurretIndex];
        this._playerBullets[bulletIndex].setShotCollideAnimeId(animeId);
    };


    /*-------------------------------------------------------------------------/
    // Spriteset_Map
    /-------------------------------------------------------------------------*/

    var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.call(this);
        SceneManager._spriteset = this;
    };

    // 弾スプライトの作成
    // 書き換え(タイル消去はプレイヤーの弾のみ)
    Spriteset_Map.prototype.createBullets = function() {
      this._bulletSprites = [];
      $gameMap.playerBullets().forEach(function(bullet) {
        this._bulletSprites.push(new Sprite_PlayerBullet(bullet));
      }, this);
      $gameMap.enemyBullets().forEach(function(bullet) {
        this._bulletSprites.push(new Sprite_Bullet(bullet));
      }, this);
      for (var i = 0; i < this._bulletSprites.length; i++) {
        this._baseSprite.addChild(this._bulletSprites[i]);
      }
    };

    /*-------------------------------------------------------------------------//
    // Sprite_PlayerBullet
    //   Sprite_Bulletをコピー(TMShooting.js内の即時関数だったため)
    /-------------------------------------------------------------------------*/

    //Sprite_BurretクラスをTMShooting.jsからコピー↓
    function Sprite_Bullet() {
      this.initialize.apply(this, arguments);
    }
  
    Sprite_Bullet.prototype = Object.create(Sprite.prototype);
    Sprite_Bullet.prototype.constructor = Sprite_Bullet;
  
    // 初期化
    Sprite_Bullet.prototype.initialize = function(bullet) {
      Sprite.prototype.initialize.call(this);
      this.anchor.x = 0.5;
      this.anchor.y = 0.5;
      this._bullet = bullet;
      this._bulletName  = '';
      this._bulletIndex = 0;
    };
  
    // フレーム更新
    Sprite_Bullet.prototype.update = function() {
      Sprite.prototype.update.call(this);
      this.opacity = this._bullet.opacity();
      if (this.opacity > 0) {
        this.updateBitmap();
        this.x = this._bullet.screenX();
        this.y = this._bullet.screenY();
        this.z = this._bullet.screenZ();
        this.rotation = this._bullet.angle();
      }
    };
  
    // 転送元ビットマップの更新
    Sprite_Bullet.prototype.updateBitmap = function() {
      if (this._bulletName !== this._bullet.bulletName() ||
          this._bulletIndex !== this._bullet.bulletIndex()) {
        this._bulletName = this._bullet.bulletName();
        this._bulletIndex = this._bullet.bulletIndex();
        this.setBulletBitmap();
      }
    };
  
    // ビットマップの設定
    Sprite_Bullet.prototype.setBulletBitmap = function() {
      this.bitmap = ImageManager.loadSystem(this._bulletName);
      if (this.bitmap.width === 0) {
        this._bulletName = '';
      } else {
        var pw = Math.floor(this.bitmap.width / 8);
        var sx = this._bulletIndex % 8 * pw;
        var sy = Math.floor(this._bulletIndex / 8) * pw;
        this.setFrame(sx, sy, pw, pw);
        this.blendMode = TMPlugin.Shooting.BulletBlendTable[this._bullet.type()];
      }
    };
    //ここまでコピー↑

    function Sprite_PlayerBullet() {
        this.initialize.apply(this, arguments);
    }

    Sprite_PlayerBullet.prototype = Object.create(Sprite_Bullet.prototype);
    Sprite_PlayerBullet.prototype.constructor = Sprite_PlayerBullet;
  
    Sprite_PlayerBullet.prototype.initialize = function(bullet) {
        Sprite_Bullet.prototype.initialize.call(this, bullet);
        this._animationSprites = [];
    };

    Sprite_PlayerBullet.prototype.update = function() {
        Sprite_Bullet.prototype.update.call(this);
        this.updateAnimation();
    };

    Sprite_PlayerBullet.prototype.updateAnimation = function() {
        this.setupAnimation();
        this.updateAnimationSprite();
    };

    Sprite_PlayerBullet.prototype.requestStartAnimation = function() {
        return this._bullet && this._bullet._requestBreakAnimation;
    };

    Sprite_PlayerBullet.prototype.setupAnimation = function() {
        if (this.requestStartAnimation()) {
            var animationId = this._bullet._breakAnimationId;
            var animation = $dataAnimations[animationId];
            this.startAnimation(animation, false, 0);
            this._bullet.startAnimation(animationId);
            this._bullet._requestBreakAnimation = false;
        }
    };

    Sprite_PlayerBullet.prototype.startAnimation = function(animation, mirror, delay) {
        var sprite = new Sprite_Animation();
        sprite.setup(this, animation, mirror, delay);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    Sprite_PlayerBullet.prototype.isAnimationPlaying = function() {
        return this._animationSprites.length > 0;
    };

    Sprite_PlayerBullet.prototype.updatePosition = function() {
        this.x = this._bullet.screenX();
        this.y = this._bullet.screenY();
        this.z = this._bullet.screenZ();
        this.rotation = this._bullet.angle();
    };

    Sprite_PlayerBullet.prototype.updateAnimationSprite = function() {
        if (this.isAnimationPlaying()) {
            this.updatePosition();
            var sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                } else {
                    sprite.remove();
                    this._bullet.endAnimation();
                }
            }
        }
    };

    Sprite_PlayerBullet.prototype.show = function() {
        this._hiding = false;
        this.updateVisibility();
    };

    Sprite_PlayerBullet.prototype.updateVisibility = function() {
        this.visible = !this._hiding;
    };

    /*-------------------------------------------------------------------------//
    // Tilemap
    /-------------------------------------------------------------------------*/

    var _TMS_Tilemap_updateTransform = Tilemap.prototype.updateTransform;
    Tilemap.prototype.updateTransform = function() {
        this._refreshTilemap();
        _TMS_Tilemap_updateTransform.call(this);
    };

    Tilemap.prototype._clearRequestRefresh = function() {
        this._requestRefreshTile = false;
        this._refreshCount = 15;
    };

    Tilemap.prototype._checkMoveRefreshTilemap = function() {
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
        var startX = Math.floor((ox - this._margin) / this._tileWidth);
        var startY = Math.floor((oy - this._margin) / this._tileHeight);
        this._updateLayerPositions(startX, startY);
        if (this._needsRepaint || this._lastAnimationFrame !== this.animationFrame ||
          this._lastStartX !== startX || this._lastStartY !== startY) {
            this._clearRequestRefresh();
            return true;
        }
        return false;
    };

    Tilemap.prototype._refreshTilemap = function() {
        if (this._requestRefreshTile) {
            if (this._checkMoveRefreshTilemap()) return;
            if (!this._refreshCount || this._refreshCount < 0) {
                this._paintAllTiles(this._lastStartX, this._lastStartY);
                this._clearRequestRefresh();
            } else {
                this._refreshCount--;
            }
        }
    };

    /*-------------------------------------------------------------------------//
    // ShaderTilemap
    /-------------------------------------------------------------------------*/

    var _TMS_ShaderTilemap_updateTransform = ShaderTilemap.prototype.updateTransform;
    ShaderTilemap.prototype.updateTransform = function() {
        this._refreshTilemap();
        _TMS_ShaderTilemap_updateTransform.call(this);
    };

    ShaderTilemap.prototype._clearRequestRefresh = function() {
        this._requestRefreshTile = false;
        this._refreshCount = 15;
    };

    ShaderTilemap.prototype._checkMoveRefreshTilemap = function() {
        if (this.roundPixels) {
            var ox = Math.floor(this.origin.x);
            var oy = Math.floor(this.origin.y);
        } else {
            ox = this.origin.x;
            oy = this.origin.y;
        }
        var startX = Math.floor((ox - this._margin) / this._tileWidth);
        var startY = Math.floor((oy - this._margin) / this._tileHeight);
        if (this._needsRepaint ||
          this._lastStartX !== startX || this._lastStartY !== startY) {
            this._clearRequestRefresh();
            return true;
        }
        return false;
    };

    ShaderTilemap.prototype._refreshTilemap = function() {
        if (this._requestRefreshTile) {
            if (this._checkMoveRefreshTilemap()) return;
            if (!this._refreshCount || this._refreshCount < 0) {
                this._paintAllTiles(this._lastStartX, this._lastStartY);
                this._clearRequestRefresh();
            } else {
                this._refreshCount--;
            }
        }
    };

}());//EOF