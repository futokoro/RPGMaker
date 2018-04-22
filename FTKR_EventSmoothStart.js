//=============================================================================
// イベント起動時のプレイヤーの移動停止を無視する
// FTKR_EventSmoothStart.js
// プラグインNo : 48
// 作成者     : フトコロ
// 作成日     : 2017/06/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESS = true;

var FTKR = FTKR || {};
FTKR.ESS = FTKR.ESS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 イベント起動時のプレイヤーの移動停止を無視する
 * @author フトコロ
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のタグをイベントのメモ欄に追記すると、
 * 「○○に接触」や「決定ボタン」でイベントを起動する時の
 * プレイヤーの移動停止を無視します。
 * 
 * <ESS_停止無視> または <ESS_STOP_NEGLECT>
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
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/06/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //objのメモ欄に <metacode> があれば真を返す
    var hasObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    //書き換え
    Game_Player.prototype.canMove = function() {
        if (this.isEventRunning() || $gameMessage.isBusy()) {
            return false;
        }
        if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
            return false;
        }
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        if (this.isInVehicle() && !this.vehicle().canMove()) {
            return false;
        }
        return true;
    };

    Game_Player.prototype.isEventRunning = function() {
        if (!$gameMap.isEventSmoothStart()) {
            return $gameMap.isEventRunning();
        }
        return false;
    };

    Game_Map.prototype.isEventSmoothStart = function() {
        var eventId = this._interpreter._eventId;
        if (!eventId) return false;
        var event = $dataMap.events[eventId];
        return hasObjectMeta(event, ['ESS_停止無視', 'ESS_STOP_NEGLECT']);
    };

})();