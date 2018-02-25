//=============================================================================
// バトルメンバーの最大人数を変数で管理するプラグイン
// FTKR_MaxBattleMembers.js
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MBM = true;

var FTKR = FTKR || {};
FTKR.MBM = FTKR.MBM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 バトルメンバーの最大人数を変数で管理するプラグイン
 * @author フトコロ
 *
 * @param VariableId
 * @desc バトルメンバーの最大数を管理する変数IDを設定します。
 * @type variable
 * @default 0
 * @parent database
 *
 * @param Initial Value
 * @desc バトルメンバーの最大数の初期値を設定します。
 * @type number
 * @default 4
 * @min 1
 * @parent dataType
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ゲーム中にパーティーの人数を変えずに、バトルメンバーの人数を変更できます。
 * 
 * プラグインパラメータで指定した変数<VariableId>に格納した値が
 * そのときのバトルメンバーの人数になります。
 * 
 * 初期の最大人数は<Initial Value>で設定してください。
 * ニューゲーム開始時に設定した値を変数に書き込みます。
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
 * v1.0.0 - 2018/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_MaxBattleMembers');

    FTKR.MBM = {
        variableId : Number(parameters['VariableId'] || 0),
        initValue  : Number(parameters['Initial Value'] || 1),
    };

    var _MBM_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _MBM_DataManager_setupNewGame.call(this);
        if (FTKR.MBM.variableId) $gameVariables.setValue(FTKR.MBM.variableId, FTKR.MBM.initValue);
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    Game_Party.prototype.maxBattleMembers = function() {
        var vid = FTKR.MBM.variableId;
        var value = FTKR.MBM.initValue;
        if (vid) {
            var num = $gameVariables.value(vid);
            if (num > 0) {
                return num;
            } else {
                $gameVariables.setValue(vid, value);
            }
        }
        return value;
    };


}());//EOF
