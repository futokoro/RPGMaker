//=============================================================================
// 移動ルートの設定のスクリプトを使ってIF文などの処理を追加する
// FTKR_AddRoutineMoveCommands.js
// プラグインNo : 88
// 作成者　　   : フトコロ
// 作成日　　   : 2018/08/15
// 最終更新日   : 
// バージョン   : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_RMC = true;

var FTKR = FTKR || {};
FTKR.RMC = FTKR.RMC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 移動ルートの設定のスクリプトを使ってIF文などの処理を追加する
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 移動ルートの設定で、スクリプトを使って以下の処理ができます。
 * 
 * ・IF文     :指定した条件を満たしている間だけ、設定した処理を実行します。
 * ・LOOP文   :指定した回数だけ、設定した処理を繰り返し実行します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 以下のプラグインと組み合わせる場合は、プラグインの登録順番を以下のように
 *    してください。
 * 
 *    FTKR_AddRoutineMoveCommands.js
 *    FTKR_ConvertEscapeCharactersInScript.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * IF文
 *-----------------------------------------------------------------------------
 *    START_IF : 条件式1
 *      条件1を満たした時の処理
 *    ELSE_IF : 条件式2
 *      条件2を満たした時の処理
 *    ELSE
 *      条件1と条件2を満たさない時の処理
 *    END_IF
 * 
 *    スクリプトで上記のコマンドおよび条件式を入力することで
 *    条件を満たした場合にのみそれぞれの間の処理部を実行します。
 *    処理部には、何個でもコマンドを設定できます。
 *    JavaScript の if文 と同じです。
 *    ELSE_IFおよびその処理部や、ELSEおよびその処理部は必須ではありません。
 *    なお、このIF文内の処理に、別のIF文を入れることはできません。
 * 
 * 例）
 * ◆移動ルートの設定：このイベント (ウェイト)
 * ：　　　　　　　　：◇プレイヤーの方を向く
 * ：　　　　　　　　：◇スクリプト：START_IF : this.distanceEvent(-1) > 2
 * ：　　　　　　　　：◇一歩前進
 * ：　　　　　　　　：◇スクリプト：END_IF
 * ：　　　　　　　　：◇ランダムに方向転換
 * 
 * この例では、このイベントが
 * 1. 「プレイヤーの方を向く」を実行
 * 2. 条件式(this.distanceEvent(-1) > 2)を判定
 * 3. 上記条件満たした場合にのみ「一歩前進」の処理を実行
 * 4. 条件に関係なく「ランダムに方向転換」を実行
 * となります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * LOOP文
 *-----------------------------------------------------------------------------
 *    START_LOOP : 回数
 *      指定した回数だけ繰り返し実行する処理
 *    END_LOOP
 * 
 *    指定した回数だけ、コマンドの間に設定した処理を繰り返し実行します。
 *    回数はスクリプト方式で記述できます。
 *    回数が 0 の場合は実行しません。
 *    処理部には、何個でもコマンドを設定できます。
 * 
 * 例）
 * ◆移動ルートの設定：このイベント (ウェイト)
 * ：　　　　　　　　：◇プレイヤーの方を向く
 * ：　　　　　　　　：◇スクリプト：START_LOOP : 5
 * ：　　　　　　　　：◇一歩前進
 * ：　　　　　　　　：◇スクリプト：END_LOOP
 * ：　　　　　　　　：◇180度回転
 * 
 * この例では、このイベントが
 * 1. 「プレイヤーの方を向く」を実行
 * 2. TART_LOOP ~ END_LOOP 間の処理(「一歩前進」)を 5回 実行
 * 3. その後「180度回転」を実行
 * となります。
 * 
 *-----------------------------------------------------------------------------
 * スクリプト(移動ルート)
 *-----------------------------------------------------------------------------
 * このプラグインを導入することで、以下のスクリプトが移動ルートで使えます。
 * 
 * this.distanceEvent(n)
 *    このイベントと、指定したイベントまたはプレイヤーとの距離を取得します。
 *    プレイヤーの場合は n = -1、イベントの場合は n = イベントID を指定します。
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
 * v1.0.1 - 2018/08/15 : ELSE_IFの処理が正しく行えない不具合を修正
 * v1.0.0 - 2018/08/15 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        var params = command.parameters;
        if (command.code === Game_Character.ROUTE_SCRIPT) {
            var args = /([^:\s]+)[ ]*:[ ]*(.*)/.exec(params[0]);
            if (args) {
                switch(args[1].toUpperCase()) {
                    case 'START_IF':
                        this._isIfProcess = true;
                        this._passIfProcess = !eval(args[2]);
                        return;
                    case 'ELSE_IF':
                        if (this._isIfProcess && this._passIfProcess) {
                            this._passIfProcess = !eval(args[2]);
                        } else if (this._isIfProcess && !this._passIfProcess) {
                            this._passIfProcess = !this._passIfProcess
                        }
                        return;
                    case 'START_LOOP':
                        this._isLoopProcess = true;
                        this._loopCount = Math.floor(eval(args[2]));
                        this._loopPoint = this._moveRouteIndex;
                        if (!this._loopCount) this._passLoopProcess = true;
                        return;
                }
            } else {
                switch(params[0].toUpperCase()) {
                    case 'ELSE':
                        if (this._isIfProcess) {
                            this._passIfProcess = !this._passIfProcess;
                        }
                        return;
                    case 'END_IF':
                        this._passIfProcess = false;
                        this._isIfProcess = false;
                        return;
                    case 'END_LOOP':
                        if (this._isLoopProcess && this._loopCount > 1) {
                            this._moveRouteIndex = this._loopPoint;
                            this._loopCount--;
                        } else {
                            this._loopCount = 0;
                            this._loopPoint = 0;
                            this._isLoopProcess = false;
                            this._passLoopProcess = false;
                        }
                        return;
                }
            }
        }
        if (this._passIfProcess || this._passLoopProcess) return;
        _Game_Character_processMoveCommand.call(this, command);
    };

    Game_Character.prototype.distanceEvent = function(eventId) {
        var chara = null;
        if (eventId === -1) {
            chara = $gamePlayer;
        } else if (eventId > 0) {
            chara = $gameMap.event(eventId);
        }
        if (chara) return $gameMap.distance(this.x, this.y, chara.x, chara.y);
        return 0;
    };

}());//EOF
