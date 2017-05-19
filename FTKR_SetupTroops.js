//=============================================================================
// ゲーム内で敵グループの編成を設定するプラグイン
// FTKR_SetupTroops.js
// 作成者     : フトコロ
// 作成日     : 2017/05/19
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STP = true;

var FTKR = FTKR || {};
FTKR.STP = FTKR.STP || {};

/*:
 * @plugindesc v1.0.0 ゲーム内で敵グループの編成を設定するプラグイン
 * @author フトコロ
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、ゲーム内で敵グループの編成を設定できます。
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
 * 敵グループ編成の設定方法
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータを使用します。
 * 
 * １．メンバーの初期化
 * 
 * STP_敵グループメンバー初期化 id
 * STP_TroopMembers_Reset id
 * 
 * id で初期化(メンバーを空にする)する敵グループIDを設定します。
 * メンバーの追加をする前に実行してください。
 * 
 * 例)
 * STP_敵グループメンバー初期化 1
 * STP_TroopMembers_Reset 2
 * 
 * 
 * ２．メンバーの追加
 * 
 * STP_敵グループメンバー追加 id エネミーID X座標 Y座標 非表示フラグ
 * STP_TroopMembers_Add id enemyId x y hidden
 * 
 * id でメンバーを追加する敵グループIDを設定します。
 * 非表示フラグは途中から出現させる場合に true、最初からいる場合に false と
 * してください。
 * 
 * 例)
 * STP_敵グループメンバー追加 1 5 200 300 false
 * STP_TroopMembers_Add 2 10 150 400 true
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
 * v1.0.0 - 2017/05/19 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.STP.parameters = PluginManager.parameters('FTKR_SetupTroops');

var matchTextToRegs = function(test, regs) {
    return regs.some( function(reg){
        return test.match(reg);
    });
};

//=============================================================================
// プラグインコマンド
//=============================================================================

var _STP_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _STP_Game_Interpreter_pluginCommand.call(this, command, args);
    if (!command.match(/STP_(.+)/i)) return;
    command = RegExp.$1;
    if(!matchTextToRegs(command, [/敵グループメンバー(.+)/, /TroopMembers_(.+)/i])) return;
    command = (RegExp.$1 + '').toUpperCase();
    switch (command) {
    case '初期化':
    case 'RESET':
        var troopId = Number(args[0]);
        if (troopId) $dataTroops[troopId].members = [];
        break;
    case '追加':
    case 'ADD':
        var troopId = Number(args[0]);
        var enemyId = Number(args[1]);
        var x = Number(args[2]);
        var y = Number(args[3]);
        if (!troopId || !enemyId || !x || !y) break;
        var hidden = Boolean(Number(args[4]));
        var enemy = {
            enemyId:enemyId,
            x:x,
            y:y,
            hidden:hidden
        };
        $dataTroops[troopId].members.push(enemy);
        break;
    }
};
