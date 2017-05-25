//=============================================================================
// ゲーム内で敵グループの編成を設定するプラグイン
// FTKR_SetupTroops.js
// 作成者     : フトコロ
// 作成日     : 2017/05/19
// 最終更新日 : 2017/05/25
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STP = true;

var FTKR = FTKR || {};
FTKR.STP = FTKR.STP || {};

/*:
 * @plugindesc v1.1.0 ゲーム内で敵グループの編成を設定するプラグイン
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
 * 以下のプラグインコマンドを使用します。
 * なお、敵グループIDや、エネミーID、座標等の値には、'\V[x]'でゲーム内変数IDxを
 * 指定できます。
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
 * v1.1.0 - 2017/05/25 : 機能追加
 *    1. バトル中でも敵グループメンバー追加が可能なように変更。
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

var convertEscapeCharacters = function(text) {
    if (text == null) text = '';
    var window = SceneManager._scene._windowLayer.children[0];
    return window ? window.convertEscapeCharacters(text) : text;
};

//=============================================================================
// プラグインコマンド
//=============================================================================

Game_Interpreter.prototype.setArgNumber = function(arg) {
    try {
        var arg = convertEscapeCharacters(arg);
        return Number(eval(arg));
    } catch (e) {
        console.error(e);
        return 0;
    }
};

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
        var troopId = this.setArgNumber(args[0]);
        if (troopId) $dataTroops[troopId].members = [];
        break;
    case '追加':
    case 'ADD':
        var troopId = this.setArgNumber(args[0]);
        var enemyId = this.setArgNumber(args[1]);
        var x = this.setArgNumber(args[2]);
        var y = this.setArgNumber(args[3]);
        if (!troopId || !enemyId || !x || !y) break;
        var hidden = Boolean(this.setArgNumber(args[4]));
        var enemy = {
            enemyId:enemyId,
            x:x,
            y:y,
            hidden:hidden
        };
        var memberId = $dataTroops[troopId].members.length;
        $dataTroops[troopId].members.push(enemy);
        if ($gameParty.inBattle()) {
            $gameTroop.addEnemy(enemy);
            $gameTroop.members()[memberId].onBattleStart();
            BattleManager._spriteset.addEnemy(memberId);
        }
        break;
    }
};

Game_Troop.prototype.addEnemy = function(member) {
    if ($dataEnemies[member.enemyId]) {
        var enemyId = member.enemyId;
        var x = member.x;
        var y = member.y;
        var enemy = new Game_Enemy(enemyId, x, y);
        if (member.hidden) {
            enemy.hide();
        }
        this._enemies.push(enemy);
    }
};

Spriteset_Battle.prototype.addEnemy = function(memberId) {
    var enemy = $gameTroop.members()[memberId];
    this._enemySprites[memberId] = new Sprite_Enemy(enemy);
    this._battleField.addChild(this._enemySprites[memberId]);
};

