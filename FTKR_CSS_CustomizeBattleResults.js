//=============================================================================
// カスタム可能な戦闘結果画面を表示するプラグイン
// FTKR_CSS_CustomizeBattleResults.js
// 作成者     : フトコロ
// 作成日     : 2017/06/07
// 最終更新日 : 2018/01/12
// バージョン : v1.4.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CBR = true;

var FTKR = FTKR || {};
FTKR.CBR = FTKR.CBR || {};

/*:
 * @plugindesc v1.4.3 カスタム可能な戦闘結果画面を表示する
 * @author フトコロ
 *
 * @param --タイトル設定--
 * @default
 *
 * @param Title Text
 * @desc タイトルに表示する文章を設定します。制御文字が使えます。
 * @default 戦闘結果
 *
 * @param Title Text Position
 * @desc タイトル文章の表示位置をを設定します。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @type number
 * @default 1
 *
 * @param Title Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Title Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Title Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Title Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Title Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --共通戦績設定--
 * @default
 *
 * @param Party Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default text(入手経験値),text(入手ゴールド)
 * 
 * @param Party Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default eval(BattleManager._rewards.exp),eval(BattleManager._rewards.gold)
 * 
 * @param Party Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default 
 * 
 * @param Party Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,0,0,0
 * 
 * @param Party Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @type number
 * @default 5
 * 
 * @param Party Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,1,1
 *
 * @param Party Visible Rows
 * @desc 共通戦績ウィンドウの縦の行数
 * @type number
 * @default 2
 *
 * @param Party Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Party Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Party Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Party Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Party Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --戦績コマンド設定--
 * @default
 *
 * @param Enable Select Command
 * @desc 終了コマンド以外を選択できるようにするか設定します。
 * @type select
 * @option 選択不可(グレー表示)
 * @value 0
 * @option 選択不可(白表示)
 * @value 1
 * @option 選択可
 * @value 2
 * @default 2
 * 
 * @param Command Display Status
 * @desc アクターのステータスを表示するコマンド名を設定します。
 * @default ステータス
 * 
 * @param Command Display Item
 * @desc 入手したアイテムを表示するコマンド名を設定します。
 * @default アイテム
 * 
 * @param Command Finish
 * @desc 戦績画面を終了するコマンド名を設定します。
 * @default 終了
 * 
 * @param Command Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Command Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Command Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Command Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Command Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --アクター別戦績設定--
 * @default
 *
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face(3)
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,{gauge(0)},{message}
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default level
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,0,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @type number
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 1,1,1
 * 
 * @param Actor Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 8
 * @type number
 * @default 9
 * 
 * @param Actor Max Cols
 * @desc アクターを横に並べる数：デフォルト 2
 * @type number
 * @default 2
 * 
 * @param Actor Cursor Lines
 * @desc カーソル高さの行数：デフォルト 4
 * @type number
 * @default 3
 * 
 * @param Actor Cursor Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @type number
 * @default 0
 * 
 * @param Actor Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Actor Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Actor Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Actor Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Actor Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --入手アイテム設定--
 * @default
 *
 * @param Enable Change Paint Opacity
 * @desc アイテムを入手しなかった場合に、グレー表示にして選択できないようにするか
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 * 
 * @param Combine Same Items
 * @desc 同じアイテムを纏めて表示する
 * 0 - まとめない, 1 - まとめる
 * @type number
 * @default 0
 * 
 * @param Item Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 8
 * @type number
 * @default 8
 * 
 * @param Item Max Cols
 * @desc アイテムを横に並べる数：デフォルト 2
 * @type number
 * @default 2
 * 
 * @param Item Cursor Lines
 * @desc カーソル高さの行数：デフォルト 1
 * @type number
 * @default 1
 * 
 * @param Item Cursor Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @type number
 * @default 0
 * 
 * @param Item Font Size
 * @desc フォントサイズ：デフォルト 28
 * @type number
 * @default 28
 * 
 * @param Item Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @type number
 * @default 18
 * 
 * @param Item Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @type number
 * @default 36
 * 
 * @param Item Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @type number
 * @default 192
 * 
 * @param Item Hide Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @type number
 * @default 0
 * 
 * @param --CSSメッセージの設定--
 * @default
 * 
 * @param Display LevelUp Message
 * @desc レベルアップ時のメッセージを設定します。
 * %1 - アクター名, %2 - 現在レベル, %3 - 上昇したレベル
 * @default \C[17]%3 Level Up!
 * 
 * @param Display NewSkill Message
 * @desc レベルアップ時のスキル習得メッセージを設定します。
 * %1 - アクター名, %2 - 習得したスキル名, %3 - 習得したスキル数
 * @default \C[17]%3 New Skill!
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、戦闘終了時にカスタム可能な戦闘結果画面を
 * 表示します。
 * 
 * マニュアルは以下のサイトをご覧ください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_CustomizeBattleResults.ja.md
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインを動作させるためには、
 *    FTKR_CustomSimpleActorStatus.jsが必要です。
 *    本プラグインは、FTKR_CustomSimpleActorStatus.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 3. ゲーム画面でレイアウトを変更する場合は、以下のプラグインが必要です。
 * 
 *    GraphicalDesignMode.js
 *    FTKR_CSS_GDM.js
 * 
 * 4. FTKR_ExBattleEvent.js と組み合わせると、戦闘終了時イベントのなかで
 *    プラグインコマンドで戦績画面を表示できます。
 *    この場合は、当プラグインをFTKR_ExBattleEvent.jsよりも上にしてください。
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
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.4.3 - 2018/01/12 : 不具合修正、機能追加
 *    1. FTKR_ExBattleEventと組み合わせたときに、戦闘終了時イベント中に
 *       正しく戦績画面の処理が実行できない不具合を修正。
 *    2. 経験値のゲージが上昇している間に戦績画面を閉じると、ゲージが止まった
 *       時点までの経験値しか入手していなかった不具合を修正。
 *    3. 戦績画面で終了コマンドを実行するまで、戦闘終了時イベントの処理を
 *       止めるプラグインコマンドを追加。
 * 
 * v1.4.2 - 2017/11/26 : 機能変更
 *    1. アクターコマンドとアイテムコマンドを選択できないようにする機能を変更し
 *       白表示のまま選択できないようにする機能を追加。
 * 
 * v1.4.1 : 2017/11/26 : 機能追加
 *    1. アクターコマンドとアイテムコマンドを選択できないようにする機能を追加。
 * 
 * v1.4.0 - 2017/11/20 : 機能追加
 *    1. アイテムを入手しなかった場合に、アイテムコマンドをグレー表示にして
 *       選択できないようにする機能を追加。
 * 
 * v1.3.1 - 2017/11/18 : 不具合修正
 *    1. GraphicalDesignMode.jsのレイアウト変更が一部反映されない不具合を修正。
 * 
 * v1.3.0 - 2017/11/08 : 機能追加
 *    1. GraphicalDesignMode.jsとFTKR_CSS_GDM.jsにより、デザインモード中に
 *       ゲーム内でレイアウトを変更する機能を追加。
 * 
 * v1.2.0 - 2017/08/22 : 機能追加
 *    1. レベルアップ時のスキル習得状態を表示するメッセージコードを追加。
 * 
 * v1.1.0 - 2017/07/13 : 機能追加
 *    1. 同じアイテムを入手した場合にまとめて表示する機能を追加。
 * 
 * v1.0.2 - 2017/06/23 : 不具合修正
 *    1. 入手経験値が29以下の場合に、アクターが経験値を入手できない不具合を修正。
 *    2. 戦績画面タイトルの文字列の表示位置を修正。
 *    3. プラグインパラメータに@typeを適用
 * 
 * v1.0.1 - 2017/06/08 : 不要なプラグインパラメータを削除
 * 
 * v1.0.0 - 2017/06/07 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

function Window_BattleResultParty() {
    this.initialize.apply(this, arguments);
}

function Window_BattleResultActor() {
    this.initialize.apply(this, arguments);
}

if (Imported.FTKR_CSS) (function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_CSS_CustomizeBattleResults');

    FTKR.CBR = {
        title:{
            text        :String(parameters['Title Text'] || ''),
            position    :Number(parameters['Title Text Position'] || 0),
            fontSize    :Number(parameters['Title Font Size'] || 0),
            padding     :Number(parameters['Title Padding'] || 0),
            lineHeight  :Number(parameters['Title Line Height'] || 0),
            opacity     :Number(parameters['Title Opacity'] || 0),
            hideFrame   :Number(parameters['Title Hide Frame'] || 0),
        },
        party:{
            visibleRows :Number(parameters['Party Visible Rows'] || 0),
            fontSize    :Number(parameters['Party Font Size'] || 0),
            padding     :Number(parameters['Party Padding'] || 0),
            lineHeight  :Number(parameters['Party Line Height'] || 0),
            opacity     :Number(parameters['Party Opacity'] || 0),
            hideFrame   :Number(parameters['Party Hide Frame'] || 0),
            text1       :String(parameters['Party Status Text1'] || ''),
            text2       :String(parameters['Party Status Text2'] || ''),
            text3       :String(parameters['Party Status Text3'] || ''),
            space       :String(parameters['Party Status Space'] || ''),
            spaceIn     :Number(parameters['Party Status Space In Text'] || 0),
            widthRate   :String(parameters['Party Status Width Rate'] || ''),
        },
        command:{
            status      :String(parameters['Command Display Status'] || ''),
            item        :String(parameters['Command Display Item'] || ''),
            finish      :String(parameters['Command Finish'] || ''),
            fontSize    :Number(parameters['Command Font Size'] || 0),
            padding     :Number(parameters['Command Padding'] || 0),
            lineHeight  :Number(parameters['Command Line Height'] || 0),
            opacity     :Number(parameters['Command Opacity'] || 0),
            hideFrame   :Number(parameters['Command Hide Frame'] || 0),
            enable      :Number(parameters['Enable Select Command'] || 2),
        },
        actor:{
            enabled     :true,
            visibleRows :Number(parameters['Actor Visible Rows'] || 0),
            maxCols     :Number(parameters['Actor Max Cols'] || 0),
            fontSize    :Number(parameters['Actor Font Size'] || 0),
            padding     :Number(parameters['Actor Padding'] || 0),
            lineHeight  :Number(parameters['Actor Line Height'] || 0),
            opacity     :Number(parameters['Actor Opacity'] || 0),
            hideFrame   :Number(parameters['Actor Hide Frame'] || 0),
            cursorHeight:Number(parameters['Actor Cursor Lines'] || 0),
            hspace      :Number(parameters['Actor Cursor Height Space'] || 0),
            text1       :String(parameters['Actor Status Text1'] || ''),
            text2       :String(parameters['Actor Status Text2'] || ''),
            text3       :String(parameters['Actor Status Text3'] || ''),
            space       :String(parameters['Actor Status Space'] || ''),
            spaceIn     :Number(parameters['Actor Status Space In Text'] || 0),
            widthRate   :String(parameters['Actor Status Width Rate'] || ''),
        },
        item:{
            enabled     :true,
            changeOpacity:Number(parameters['Enable Change Paint Opacity'] || 0),
            visibleRows :Number(parameters['Item Visible Rows'] || 0),
            maxCols     :Number(parameters['Item Max Cols'] || 0),
            fontSize    :Number(parameters['Item Font Size'] || 0),
            padding     :Number(parameters['Item Padding'] || 0),
            lineHeight  :Number(parameters['Item Line Height'] || 0),
            opacity     :Number(parameters['Item Opacity'] || 0),
            hideFrame   :Number(parameters['Item Hide Frame'] || 0),
            cursorHeight:Number(parameters['Item Cursor Lines'] || 0),
            combine     :Number(parameters['Combine Same Items'] || 0),
        },
        message:{
            levelUp     :String(parameters['Display LevelUp Message'] || ''),
            newSkill    :String(parameters['Display NewSkill Message'] || ''),
        },
    };

    Scene_Battle.CBR_SPLIT_NUMBER = 30;
    Scene_Battle.CBR_COUNT_MAX    = 2;

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

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var textWidth = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.textWidth(text) : 0;
    };

    var convertTextWidth = function(text) {
        var tw = 0;
        text = convertEscapeCharacters(text);
        if (/\\i\[(\d+)\]/i.test(text)) {
            tw += Window_Base._iconWidth;
            text = (text.toUpperCase()).replace(/\\i\[(\d+)\]/ig, '');
        }
        if (/\\c\[(\d+)\]/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\c\[(\d+)\]/ig, '');
        }
        if (/\\{/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\{/ig, '');
        }
        if (/\\}/i.test(text)) {
            text = (text.toUpperCase()).replace(/\\}/ig, '');
        }
        if (text.match(/\\lw\[(\d+),?([^\]]+)\]/i)) {
            tw += RegExp.$1;
            text = (text.toUpperCase()).replace(/\\lw\[(\d+),?([^\]]+)\]/ig, '');
        }
        tw += textWidth(text);
        return tw;
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _CBR_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _CBR_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/CBR_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '戦績画面表示':
            case 'SHOW_BATTLE_RESULT':
                BattleManager.showCBR();
                break;
            case '戦績画面終了待ち':
            case 'WAIT_BATTLE_RESULT_END':
                this.setWaitMode('battleResult');
                break;
        }
    };

    var _CBR_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = false;
        if (this._waitMode === 'battleResult' ) {
            waiting =  BattleManager.isCbrBattleResult();
            if (!waiting) {
                this._waitMode = '';
            }
            return waiting;
        }
        return _CBR_Game_Interpreter_updateWaitMode.call(this);
    };
  
    //=============================================================================
    // FTKR_CustomSimpleActorStatus.jsの修正
    //=============================================================================
    var _CBR_Window_Base_drawCssActorStatusBase_B = Window_Base.prototype.drawCssActorStatusBase_B;
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'MESSAGE2':
                return this.drawCssActorMessageCBR(actor, x, y, width);
            default:
                return _CBR_Window_Base_drawCssActorStatusBase_B.call(this, index, actor, x, y, width, status, lss, css);
        }
    };

    // アクターの状態の変化に対するメッセージの表示関数
    Window_Base.prototype.drawCssActorMessageCBR = function(actor, x, y, width) {
        if (!actor._levelUpCount) return 1;
        var text = FTKR.CBR.message.levelUp.format(actor.name(), actor.level, actor._levelUpCount);
        if (actor._newSkills && actor._newSkills.length) {
            var newSkills= [];
            actor._newSkills.forEach(function(newSkill){
                if (newSkill) newSkills.push(newSkill.name);
            });
            skills = newSkills.join();
            var text2 = FTKR.CBR.message.newSkill.format(actor.name(), skills, actor._newSkills.length);
        }
        this.drawTextEx(text, x, y);
        if (text2) this.drawTextEx(text2, x, y + this.lineHeight());
        actor._levelUpMessage = true;
        return 2;
    };

    var _CBR_Game_Actor_findNewSkills = Game_Actor.prototype.findNewSkills;
    Game_Actor.prototype.findNewSkills = function(lastSkills) {
        if (!this._newSkills) this._newSkills = [];
        this._newSkills = this._newSkills.concat(_CBR_Game_Actor_findNewSkills.call(this, lastSkills));
        return this._newSkills;
    };

    var _CBR_Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        if ($gameParty) {
            $gameParty.members().forEach( function(actor){
                if (actor && actor._levelUpMessage) {
                    actor._newSkills = [];
                  }
            });
        }
        _CBR_Scene_Base_start.call(this);
    };

    //=============================================================================
    // バトルシーンに戦績画面表示を追加
    //BattleManager
    //=============================================================================

    var _CBR_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _CBR_BattleManager_initMembers.call(this);
        this._showBattleResultOk = false;
    }

    //書き換え
    BattleManager.processVictory = function() {
        this._showBattleResultOk = true;
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        this.showCBR();
        this.gainRewards();
        this.endBattle(0);
    };

    //書き換え
    BattleManager.gainExp = function() {
        this._cbrGainExp = this._rewards.exp;
        SceneManager._scene.setGainExp(this._cbrGainExp);
        this._rewards.exp = 0;
    };

    var _CBR_BattleManager_updateEvent = BattleManager.updateEvent;
    BattleManager.updateEvent = function() {
        if (BattleManager.isCbrBattleResult()) {
            SceneManager._scene.updateExp(this._cbrGainExp);
            return true;
        }
        return _CBR_BattleManager_updateEvent.call(this);
    };

    BattleManager.showCBR = function() {
        this._showBattleResultOk = true;
        SceneManager._scene.showBattleResult(this._rewards);
    };

    BattleManager.isCbrBattleResult = function() {
        return this._showBattleResultOk;
    };

    //書き換え
    Scene_Battle.prototype.updateBattleProcess = function() {
        if (this.checkBattleProcessBusy()) {
            BattleManager.update();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.checkBattleProcessBusy = function() {
        return !this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd() || BattleManager.isCbrBattleResult();
    };

    //=============================================================================
    // 戦闘中のレベルアップメッセージを無効
    //Game_Actor
    //=============================================================================

    var _CBR_Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if ($gameParty.inBattle()) return;
        _CBR_Game_Actor_displayLevelUp.call(this, newSkills);
    };

    //=============================================================================
    // 戦績ウィンドウの追加
    //Scene_Battle
    //=============================================================================

    var _CBR_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        _CBR_Scene_Battle_initialize.call(this);
        this._cbrCount = 0;
        this._cbrExp = 0;
        this._cbrModExp = 0;
    };

    var _CBR_Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (_CBR_Scene_Battle_isAnyInputWindowActive.call(this) ||
            this.isCbrBusy());
    };

    Scene_Battle.prototype.isCbrBusy = function() {
        return (this._battleResultCommandWindow.active ||
            this._battleResultActorWindow.active ||
            this._battleResultItemWindow.active);
    };

    var _CBR_Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _CBR_Scene_Battle_create.call(this);
        this.createBattleResultTitle();
        this.createBattlePartyResult();
        this.createBattleResultCommand();
        this.createBattleActorResult();
        this.createBattleResultItem();
    };

    Scene_Battle.prototype.createBattleResultTitle = function() {
        var ww = Graphics.boxWidth;
        var wh = this._helpWindow.fittingHeight(1);
        this._battleResultTitleWindow = new Window_BattleResultTitle(0, 0, ww, wh);
        this._battleResultTitleWindow.hide();
        this.addWindow(this._battleResultTitleWindow);
    };

    Scene_Battle.prototype.createBattlePartyResult = function() {
        var wy = this._battleResultTitleWindow.height;
        var ww = Graphics.boxWidth;
        var wh = this._helpWindow.fittingHeight(FTKR.CBR.party.visibleRows);
        this._battleResultPartyWindow = new Window_BattleResultParty(0, wy, ww, wh);
        this._battleResultPartyWindow.hide();
        this.addWindow(this._battleResultPartyWindow);
    };

    Scene_Battle.prototype.createBattleResultCommand = function() {
        var wy = this._battleResultPartyWindow.y + this._battleResultPartyWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultCommandWindow = new Window_BattleResultCommand(0, wy, ww, wh);
        this._battleResultCommandWindow.setHandler('status', this.cbrStatus.bind(this));
        this._battleResultCommandWindow.setHandler('item',   this.cbrItem.bind(this));
        this._battleResultCommandWindow.setHandler('finish', this.cbrFinish.bind(this));
        this._battleResultCommandWindow.hide();
        this.addWindow(this._battleResultCommandWindow);
    };

    Scene_Battle.prototype.createBattleActorResult = function() {
        var wy = this._battleResultCommandWindow.y + this._battleResultCommandWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultActorWindow = new Window_BattleResultActor(0, wy, ww, wh);
        this._battleResultActorWindow.setHandler('cancel', this.onCBRActorCancel.bind(this));
        this._battleResultActorWindow.hide();
        this._battleResultCommandWindow.setActorWindow(this._battleResultActorWindow);
        this.addWindow(this._battleResultActorWindow);
    };

    Scene_Battle.prototype.createBattleResultItem = function() {
        var wy = this._battleResultCommandWindow.y + this._battleResultCommandWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._battleResultItemWindow = new Window_BattleResultItem(0, wy, ww, wh);
        this._battleResultItemWindow.setHandler('cancel', this.onCBRItemCancel.bind(this));
        this._battleResultItemWindow.hide();
        this._battleResultCommandWindow.setItemWindow(this._battleResultItemWindow);
        this.addWindow(this._battleResultItemWindow);
    };

    Scene_Battle.prototype.setGainExp = function(gainExp) {
        this._cbrExp = 0;
        this._cbrGainExp = gainExp;
        var splitNum = Scene_Battle.CBR_SPLIT_NUMBER;
        this._cbrSplitExp = Math.floor(gainExp / splitNum);
        this._cbrModExp = gainExp % splitNum;
        this._cbrCount = Scene_Battle.CBR_COUNT_MAX;
    };

    Scene_Battle.prototype.updateExp = function(gainExp) {
        if (!gainExp) return;
        if (this._cbrExp >= gainExp) return;
        if (this._cbrCount < Scene_Battle.CBR_COUNT_MAX) {
            this._cbrCount += 1;
        } else {
            this._cbrCount = 0;
            var modexp = this._cbrModExp ? 1 : 0;
            var exp = this._cbrSplitExp + modexp;
            if (modexp) this._cbrModExp -= 1;
            this._cbrExp += exp;
            $gameParty.allMembers().forEach(function(actor) {
                actor.gainExp(exp);
            },this);
            this._battleResultActorWindow.refresh();
        }
    };

    Scene_Battle.prototype.showBattleResult = function(rewards) {
        this._statusWindow.hide();
        this._battleResultTitleWindow.show();
        this._battleResultPartyWindow.show();
        this._battleResultPartyWindow.refresh();
        this._battleResultCommandWindow.setDropItem(rewards.items);
        this._battleResultCommandWindow.show();
        this._battleResultCommandWindow.activate();
        this._battleResultActorWindow.show();
        this._battleResultActorWindow.refresh();
        this._battleResultItemWindow.setDropItem(rewards.items);
    };

    Scene_Battle.prototype.hideBattleResult = function() {
        this._battleResultTitleWindow.hide();
        this._battleResultPartyWindow.hide();
        this._battleResultCommandWindow.hide();
        this._battleResultActorWindow.hide();
        this._battleResultItemWindow.hide();
    };

    Scene_Battle.prototype.cbrStatus = function() {
        this._battleResultActorWindow.activate();
        this._battleResultActorWindow.select(0);
    };
    
    Scene_Battle.prototype.cbrItem = function() {
        this._battleResultItemWindow.activate();
        this._battleResultItemWindow.select(0);
    };
    
    Scene_Battle.prototype.cbrFinish = function() {
        this.hideBattleResult();
        BattleManager._showBattleResultOk = false;
        var difExp = this._cbrGainExp - this._cbrExp;
        if (difExp) {
            $gameParty.allMembers().forEach(function(actor) {
                actor.gainExp(difExp);
            },this);
        }
    };

    Scene_Battle.prototype.onCBRActorCancel = function() {
        this._battleResultCommandWindow.activate();
        this._battleResultCommandWindow.select(0);
        this._battleResultActorWindow.deactivate();
        this._battleResultActorWindow.deselect();
    };

    Scene_Battle.prototype.onCBRItemCancel = function() {
        this._battleResultCommandWindow.activate();
        this._battleResultCommandWindow.select(1);
        this._battleResultItemWindow.deactivate();
        this._battleResultItemWindow.deselect();
    };

    //=============================================================================
    // 戦績タイトルウィンドウクラス
    //Window_BattleResultTitle
    //=============================================================================

    function Window_BattleResultTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultTitle.prototype = Object.create(Window_Base.prototype);
    Window_BattleResultTitle.prototype.constructor = Window_BattleResultTitle;

    Window_BattleResultTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_BattleResultTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTitle();
    };

    Window_BattleResultTitle.prototype.standardCssLayout = function() {
        return FTKR.CBR.title;
    };

    Window_BattleResultTitle.prototype.drawTitle = function() {
        var textWidth = convertTextWidth(FTKR.CBR.title.text);
        var x = FTKR.CBR.title.position * (this.width - textWidth) / 2;
        this.drawTextEx(FTKR.CBR.title.text, x, 0);
    };

    //=============================================================================
    // 共通戦績結果ウィンドウクラス
    //Window_BattleResultParty
    //=============================================================================

    Window_BattleResultParty.prototype = Object.create(Window_Base.prototype);
    Window_BattleResultParty.prototype.constructor = Window_BattleResultParty;

    Window_BattleResultParty.prototype.standardCssStatus = function() {
        return FTKR.CBR.party;
    };
      
    Window_BattleResultTitle.prototype.standardCssLayout = function() {
        return FTKR.CBR.party;
    };

    Window_BattleResultParty.prototype.refresh = function() {
        this.contents.clear();
        var lss = this._lssStatus;
        var actor = $gameParty.members()[0];
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        this.drawCssActorStatus(0, actor, 0, 0, w, h, lss);
    };

    //=============================================================================
    // 戦績結果コマンドウィンドウクラス
    //Window_BattleResultCommand
    //=============================================================================

    function Window_BattleResultCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_BattleResultCommand.prototype.constructor = Window_BattleResultCommand;

    Window_BattleResultCommand.prototype.initialize = function(x, y, width) {
        this._windowWidth = width;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this._symbol = 'status';
        this._items = [];
        this.deactivate();
    };

    Window_BattleResultCommand.prototype.windowWidth = function() {
        return this._windowWidth;
    };

    Window_BattleResultCommand.prototype.maxCols = function() {
        return 3;
    };

    Window_BattleResultCommand.prototype.standardCssLayout = function() {
        return FTKR.CBR.command;
    };

    Window_BattleResultCommand.prototype.makeCommandList = function() {
        this.addCommand(FTKR.CBR.command.status, 'status', this.canSelectActor());
        this.addCommand(FTKR.CBR.command.item,   'item'   ,this.canSelectItem());
        this.addCommand(FTKR.CBR.command.finish, 'finish');
    };

    Window_BattleResultCommand.prototype.canSelectActor = function() {
        return FTKR.CBR.command.enable !== 0;
    };

    Window_BattleResultCommand.prototype.canSelectItem = function() {
        return FTKR.CBR.command.enable !== 0 && this.isGotItems();
    };

    Window_BattleResultCommand.prototype.isGotItems = function() {
        var flag = FTKR.CBR.item.changeOpacity;
        return !flag ? true : this._items && this._items.length > 0;
    };

    Window_BattleResultCommand.prototype.isCurrentItemEnabled = function() {
        return (Window_Command.prototype.isCurrentItemEnabled.call(this) &&
            FTKR.CBR.command.enable === 2) || this.currentSymbol() === 'finish';
    };

    Window_BattleResultCommand.prototype.setDropItem = function(items) {
        this._items = items;
        this.refresh();
    };

    Window_BattleResultCommand.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (BattleManager._showBattleResultOk && this._symbol !== this.currentSymbol()) {
            this._symbol = this.currentSymbol();
            if (!this._battleResultActorWindow || !this._battleResultItemWindow) return;
            switch (this._symbol) {
                case 'status':
                    this._battleResultActorWindow.show();
                    this._battleResultItemWindow.hide();
                    break;
                case 'item':
                    this._battleResultActorWindow.hide();
                    this._battleResultItemWindow.show();
                    break;
                case 'finish':
                    break;
            }
        }
    };

    Window_BattleResultCommand.prototype.setActorWindow = function(window) {
        this._battleResultActorWindow = window;
    };

    Window_BattleResultCommand.prototype.setItemWindow = function(window) {
        this._battleResultItemWindow = window;
    };
    
    //=============================================================================
    // 個別戦績結果ウィンドウクラス
    //Window_BattleResultActor
    //=============================================================================

    Window_BattleResultActor.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleResultActor.prototype.constructor = Window_BattleResultActor;

    Window_BattleResultActor.prototype.standardCssStatus = function() {
        return FTKR.CBR.actor;
    };
      
    Window_BattleResultActor.prototype.standardCssLayout = function() {
        return FTKR.CBR.actor;
    };

    Window_BattleResultActor.prototype.maxItems = function() {
        return $gameParty.size();
    };

    Window_BattleResultActor.prototype.drawItem = function(index) {
        var lss = this._lssStatus;
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };

    //ウィンドウに横に並べるアクターの表示間隔
    //ステータスレイアウト側で変更できるのでここでは 0 とする。
    Window_BattleResultActor.prototype.spacing = function() {
        return 0;
    };

    //カーソルの高さ
    Window_BattleResultActor.prototype.itemHeight = function() {
        return this.lineHeight() * this.cursorHeight();
    };

    //=============================================================================
    // アイテム報酬ウィンドウクラス
    //Window_BattleResultItem
    //=============================================================================

    function Window_BattleResultItem() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleResultItem.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleResultItem.prototype.constructor = Window_BattleResultItem;

    Window_BattleResultItem.prototype.initialize = function(wx, wy, ww, wh) {
        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
        this._datas = [];
    };

    Window_BattleResultItem.prototype.standardCssLayout = function() {
        return FTKR.CBR.item;
    };

    Window_BattleResultItem.prototype.setDropItem = function(items) {
        this._datas = items.map(function(item){
            return {item:item, number:1};
        });
        if (FTKR.CBR.item.combine) this.combineItems();
        this.refresh();
    };

    Window_BattleResultItem.prototype.combineItems = function() {
        var count = this._datas.length;
        var i = 0;
        while(count >= i) {
            for (var n = i + 1; n < count;) {
                if (this._datas[n] && this._datas[i].item === this._datas[n].item) {
                    this._datas[i].number += this._datas[n].number;
                    this._datas.splice(n, 1);
                    count--;
                } else {
                    n++;
                }
            }
            i++;
        }
    };

    Window_BattleResultItem.prototype.maxItems = function() {
        return this._datas ? this._datas.length : 0;
    };

    Window_BattleResultItem.prototype.drawItem = function(index) {
        if (!this._datas) return;
        var data = this._datas[index];
        if (data) {
            var numberWidth = this.textWidth('000');
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.drawItemName(data.item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(data.number, rect.x, rect.y, rect.width);
        }
    };

    Window_BattleResultItem.prototype.needsNumber = function() {
        return true;
    };

    Window_BattleResultItem.prototype.drawItemNumber = function(number, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText(number, x, y, width, 'right');
        }
    };

    //カーソルの高さ
    Window_BattleResultItem.prototype.itemHeight = function() {
        return this.lineHeight() * this.cursorHeight();
    };

    //ウィンドウに横に並べるアクターの表示間隔
    //ステータスレイアウト側で変更できるのでここでは 0 とする。
    Window_BattleResultItem.prototype.spacing = function() {
        return 0;
    };
    
}());//FTKR_CustomizeBattleResults.js END
