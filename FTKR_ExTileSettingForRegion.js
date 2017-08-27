//=============================================================================
// 指定したリージョンの通行設定を一時的に変更するプラグイン
// FTKR_ExTileSettingForRegion.js
// 作成者     : フトコロ
// 作成日     : 2017/08/27
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ExTileSettingForRegion = true;

var FTKR = FTKR || {};
FTKR.ETR = FTKR.ETR || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 指定したリージョンの通行設定を一時的に変更するプラグイン
 * @author フトコロ
 *
 * @param スイッチID
 * @desc 指定したスイッチIDがONの間、リージョンの通行設定が変わります
 * @default 
 * @type switch
 *
 * @param リージョンID
 * @desc 指定したリージョンIDのタイルの通行設定が変わります
 * @default 
 * @type number
 *
 * @param 通行設定
 * @desc リージョンの通行設定を指定してください。
 * @default 通行可
 * @type select
 * @option 通行可
 * @option 通行不可
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 指定したリージョンIDを設定したタイルの通行設定を
 * スイッチのON/OFFで一時的に変更します。
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
 * v1.0.0 - 2017/08/27 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExTileSettingForRegion');

    FTKR.ETR = {
        switchId  :Number(parameters['スイッチID'] || 0),
        regionId  :Number(parameters['リージョンID'] || 0),
        passage   :String(parameters['通行設定'] || '通行可'),
    };
        
    _ETR_Game_Map_isPassable = Game_Map.prototype.isPassable;
    Game_Map.prototype.isPassable = function(x, y, d) {
        return this.checkETR(x, y) ? this.checkETRPassage() :
            _ETR_Game_Map_isPassable.call(this, x, y, d);
    };
  
    Game_Map.prototype.checkETR = function(x, y) {
        return this.checkETRRegionId(x, y) && this.checkETRSwitchId();
    };
  
    Game_Map.prototype.checkETRRegionId = function(x, y) {
        return FTKR.ETR.regionId && this.regionId(x, y) === FTKR.ETR.regionId;
    };

    Game_Map.prototype.checkETRSwitchId = function() {
        return FTKR.ETR.switchId && $gameSwitches.value(FTKR.ETR.switchId);
    };

    Game_Map.prototype.checkETRPassage = function() {
        return FTKR.ETR.passage === '通行可';
    };

}());//EOF
