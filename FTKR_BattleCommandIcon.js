//=============================================================================
// バトルコマンドにアイコンを追加するプラグイン
// FTKR_BattleCommandIcon.js
// 作成者     : フトコロ
// 作成日     : 2017/06/24
// 最終更新日 : 2017/06/24
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BCI = true;

var FTKR = FTKR || {};
FTKR.BCI = FTKR.BCI || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 バトルコマンドにアイコンを追加する
 * @author フトコロ
 *
 * @param --パーティーコマンド--
 * @default
 * 
 * @param Fight Command Icon
 * @desc 「戦う」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param Escape Command Icon
 * @desc 「逃げる」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param --アクターコマンド--
 * @default
 * 
 * @param Attack Command Icon
 * @desc 「たたかう」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param Skill Commands Icon
 * @desc スキルコマンドのアイコン
 * カンマ(,)で区切って、スキルタイプ毎に指定
 * @default 
 *
 * @param Guard Command Icon
 * @desc 「防御」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @param Item Command Icon
 * @desc 「アイテム」コマンドのアイコン
 * 0 は アイコン表示なし
 * @type number
 * @default 
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * バトルコマンドにアイコンを追加します。
 * 
 * コマンド毎にプラグインパラメータで設定してください。
 * 
 * 
 * ＜スキルコマンドについて＞
 * スキルコマンドの設定は、カンマ(,)を使います。
 * 
 * 例）スキルタイプ1が「魔法」スキルタイプ2が「必殺技」の場合
 * プラグインパラメータには、以下の様に２つのアイコン番号を指定します。
 * 
 *    79,76
 * 
 * この時、「魔法」のアイコンが 79、「必殺技」のアイコンが 76 になります。
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
 * v1.0.1 - 2017/06/24 : 不具合修正
 * 
 * v1.0.0 - 2017/06/24 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_BattleCommandIcon');

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
    }

    FTKR.BCI.icons = {
        party:{
          fight  :Number(parameters['Fight Command Icon'] || 0),
          escape :Number(parameters['Escape Command Icon'] || 0),
        },
        actor:{
          attack :Number(parameters['Attack Command Icon'] || 0),
          skill  :(',' + parameters['Skill Commands Icon']).split(',').num(),
          guard  :Number(parameters['Guard Command Icon'] || 0),
          item   :Number(parameters['Item Command Icon'] || 0),
        },
    };

    Window_Command.prototype.commandExt = function(index) {
        return this._list[index].ext;
    };

    Window_Command.prototype.drawItemIcon = function(index, type) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var commandType = FTKR.BCI.icons[type]
        var ext = this.commandExt(index);
        var icon = ext ?
            commandType[this.commandSymbol(index)][ext]:
            commandType[this.commandSymbol(index)];
        var offset = 0;
        if (icon) {
            this.drawIcon(icon, rect.x + 2, rect.y + 2);
            offset = Window_Base._iconWidth + 4;
        }
        this.drawText(this.commandName(index), rect.x + offset, rect.y, rect.width - offset, align);
    };

    //書き換え
    Window_PartyCommand.prototype.drawItem = function(index) {
        this.drawItemIcon(index, 'party');
    };

    //書き換え
    Window_ActorCommand.prototype.drawItem = function(index) {
        this.drawItemIcon(index, 'actor');
    };

}());//EOF
