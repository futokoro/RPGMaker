//=============================================================================
// イベントのセルフスイッチを操作するプラグイン
// FTKR_EventSelfSwOperation.js
// 作成者     : フトコロ
// 作成日     : 2017/04/25
// 最終更新日 : 2017/04/29
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESO = true;

var FTKR = FTKR || {};
FTKR.ESO = FTKR.ESO || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 イベントのセルフスイッチを操作するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、イベントのセルフスイッチを自動で
 * 操作することができます。
 * 
 * 以下のタグをイベントに入力してください。
 * 
 * 
 * 1. 場所移動でセルフスイッチをOFFにする
 * 
 * <ESO_リセット: A,B,C,D>
 * <ESO_RESET: A,B,C,D>
 *   :指定したセルフスイッチをOFFにします。
 *   :セルフスイッチの文字同士はカンマ(,)で区切ってください。
 * 
 * 
 * <ESO_リセット: ALL>
 * <ESO_RESET: ALL>
 *   :すべてのセルフスイッチをOFFにします。
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
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.1 - 2017/04/29 : 不具合修正
 * v1.0.0 - 2017/04/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ESO.parameters = PluginManager.parameters('FTKR_EventSelfSwReset');

//配列の中身が数字なら数値に変換する
Array.prototype.numOrStr = function() {
    return this.map( function(elm, i) {
        return isNaN(parseInt(elm)) ? elm : parseInt(elm);
    });
};

//objのメモ欄から <metacode: x> の値を読み取って配列で返す
var readSplitMeta = function(obj, metacode) {
    var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
    if(obj.note.match(metaReg)) {
        var result = (RegExp.$1).replace(/\s/g, "");
        return result.split(',').numOrStr();
    }
    return [];
};

//objのメモ欄から <metacode[0]: x> から <metacode[n]: x>のいずれかの値を読み取って配列で返す
Array.prototype.readSplitMeta = function(obj) {
    var result = [];
    this.some(function(metacode) {
        result = readSplitMeta(obj, metacode);
        return result.length;
    });
    return result;
};

//マップ内の指定したイベントのセルフスイッチを変更する
Game_Interpreter.prototype.setEventSelfSw = function(eventId, selfSwitch, value) {
    return $gameSelfSwitches.setValue([this._mapId, eventId, selfSwitch], value);
};

//マップ内の指定したイベントの対象のセルフスイッチをOFFにする
Game_Interpreter.prototype.eventSelfSwOFF = function(eventId, selfSwitch) {
    this.setEventSelfSw(eventId, selfSwitch, false);
};

//マップ内の指定したイベントのすべてのセルフスイッチをOFFにする
Game_Interpreter.prototype.eventSelfSwReset = function(eventId) {
    ['A','B','C','D'].forEach( function(selfSwitch) {
        this.eventSelfSwOFF(eventId, selfSwitch);
    },this);
};

// イベントコマンド 場所移動 に処理追加
FTKR.ESO.Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function() {
    var result = FTKR.ESO.Game_Interpreter_command201.call(this);
    if (this._waitMode === 'transfer') {
        $dataMap.events.forEach(function(event){
            if (event) {
                ['ESO_リセット','ESO_RESET'].readSplitMeta(event).forEach( function(type) {
                    if (type.toUpperCase() === 'ALL') {
                        this.eventSelfSwReset(event.id);
                    } else {
                        this.eventSelfSwOFF(event.id, type);
                    }
                },this);
            }
        },this);
    }
    return result;
};

