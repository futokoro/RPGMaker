//=============================================================================
// スキル毎に詠唱モーションのONOFFを設定するプラグイン
// FTKR_SkillCastingMotion.js
// プラグインNo : 77
// 作成者     : フトコロ
// 作成日     : 2018/04/11
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SCM = true;

var FTKR = FTKR || {};
FTKR.SCM = FTKR.SCM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 スキル毎に詠唱モーションのONOFFを設定する
 * @author フトコロ
 *
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * スキル、アイテムのメモ欄に以下のタグを設定すると、詠唱モーションのONOFFを
 * 設定することができます。
 * 
 * <ESM 詠唱ON>
 * <ESM CHANT_ON>
 * このタグがあると、スキル実行待機中のモーションを詠唱モーションに設定できます。
 * 
 * 
 * <ESM 詠唱OFF>
 * <ESM CHANT_OFF>
 * このタグがあると、詠唱モーションをOFFに設定できます。
 * SV魔法スキルに設定したスキルであっても、詠唱モーションを実行しません。
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
 * v1.0.0 - 2018/04/11 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

(function() {

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

    var _ESM_Game_Action_isMagicSkill = Game_Action.prototype.isMagicSkill;
    Game_Action.prototype.isMagicSkill = function() {
        if (testObjectMeta(this.item(), ['ESM 詠唱ON', 'ESM CHANT_ON'])) {
            return true;
        } else if (testObjectMeta(this.item(), ['ESM 詠唱OFF', 'ESM CHANT_OFF'])){
            return false;
        } else {
            return _ESM_Game_Action_isMagicSkill.call(this);
        }
    };

}());//EOF