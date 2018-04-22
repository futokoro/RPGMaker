//=============================================================================
// メタデータを拡張するプラグイン
// FTKR_ExMetaData.js
// プラグインNo : 36
// 作成者     : フトコロ
// 作成日     : 2017/05/05
// 最終更新日 : 2018/02/19
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EMD = true;

var FTKR = FTKR || {};
FTKR.EMD = FTKR.EMD || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 メタデータを拡張するプラグイン
 * @author フトコロ
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、下記のメタデータ(*1)を各オブジェクトデータに取り込みます。
 * 
 * (*1) <name:data>形式で記述したデータ
 * 
 * 
 * 1. 敵グループのバトルイベント１ページ目の注釈内のメタデータを
 *    ゲーム起動時に $dataTroops[n].meta に取り込みます。
 *    (n は敵グループID)
 * 
 * 
 * 2. イベントの１ページ目の注釈内のメタデータを、マップのデータ読み込み時に
 *    $dataMap.events[n].meta に取り込みます。
 *    (n はイベントID)
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
 * v1.0.1 - 2018/02/19 : 不具合修正
 *    1. メニュー開閉で、メタデータが消える不具合を修正。
 * 
 * v1.0.0 - 2017/05/05 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EMD.parameters = PluginManager.parameters('FTKR_ExMetaData');

var readMetadata = function(data, note) {
    var re = /<([^<>:]+)(:?)([^>]*)>/g;
    data.meta = data.meta || {};
    for (;;) {
        var match = re.exec(note);
        if (match) {
            if (match[2] === ':') {
                data.meta[match[1]] = match[3]; 
            } else {
                data.meta[match[1]] = true;
            }
        } else {
            break;
        }
    }
};

var readPagesCommentMetadata = function(obj, pages) {
    for (var v = 0; v < pages[0].list.length; v++) {
        var list = pages[0].list[v];
        if (list && ([108, 408].contains(list.code))) {
            readMetadata(obj, list.parameters[0]);
        }
    }
};

//=============================================================================
// イベントのコメント欄のメタデータ取得
//=============================================================================
/*
FTKR.EMD.Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
    this.readEventsCommentMetadata();
    FTKR.EMD.Game_Map_setupEvents.call(this);
};
*/

Game_Map.prototype.readEventsCommentMetadata = function() {
    for (var i = 1; i < $dataMap.events.length; i++ ) {
        var event = $dataMap.events[i];
        if(event && event.pages.length) {
            readPagesCommentMetadata(event, event.pages);
        }
    }
};

FTKR.EMD.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    FTKR.EMD.Scene_Map_start.call(this);
    $gameMap.readEventsCommentMetadata();
};

//=============================================================================
// 敵グループのバトルイベントのコメント欄のメタデータ取得
//=============================================================================
FTKR.EMD.DatabaseLoaded = false;
FTKR.EMD.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.EMD.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EMD.DatabaseLoaded) {
        this.readCommentNotetags($dataTroops);
        FTKR.EMD.DatabaseLoaded = true;
    }
    return true;
};

DataManager.readCommentNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        obj.meta = {};
        var pages = obj.pages;
        if (pages.length) {
            readPagesCommentMetadata(obj, pages);
        }
    }
};
