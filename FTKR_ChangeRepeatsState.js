//=============================================================================
// 連続回数を倍加させるステートを作成するプラグイン
// FTKR_ChangeRepeatsState.js
// プラグインNo : 54
// 作成者     : フトコロ
// 作成日     : 2017/08/23
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CRS = true;

var FTKR = FTKR || {};
FTKR.CRS = FTKR.CRS || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 連続回数を倍加させるステートを作成するプラグイン
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * ステートのメモ欄に以下のタグを追記すると、ステート付加中の連続回数を
 * 倍加します。
 * 
 * <CRS_連続回数倍加: x>
 * x - 連続回数を x倍 にします
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
 * v1.0.0 - 2017/08/23 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

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
    // Game_Action
    //=============================================================================
    var _CRS_Game_Action_numRepeats = Game_Action.prototype.numRepeats;
    Game_Action.prototype.numRepeats = function() {
        var defRepeats = _CRS_Game_Action_numRepeats.call(this);
        return defRepeats * this.subject().readRepeatRate();
    };
    
    Game_BattlerBase.prototype.readRepeatRate = function() {
        var rate = 1;
        this.states().forEach( function(state) {
            var rate2 = Number(readObjectMeta(state, ['CRS_連続回数倍加']));
            if (rate < rate2) rate = rate2;
        },this);
        return rate;
    };

}());//EOF
