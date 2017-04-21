//=============================================================================
// スキル画面にサブコマンドを追加するプラグイン
// FTKR_SkillSubCommand.js
// 作成者     : フトコロ
// 作成日     : 2017/04/15
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SSC = true;

var FTKR = FTKR || {};
FTKR.SSC = FTKR.SSC || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 スキル画面にサブコマンドを追加するプラグイン
 * @author フトコロ
 *
 * @param Enable Confirmation
 * @desc スキルを忘れる時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 1
 *
 * @param --サブコマンド--
 * @default
 *
 * @param Command Use Format
 * @desc 実行コマンドの「使う」の表示内容を記述します。
 * @default 使う
 *
 * @param Command Forget Format
 * @desc 実行コマンドの「忘れる」の表示内容を記述します。
 * @default 忘れる
 *
 * @param Command Cancel Format
 * @desc 実行コマンドの「やめる」の表示内容を記述します。
 * @default やめる
 *
 * @param --確認画面--
 * @default
 *
 * @param Conf Title Format
 * @desc スキル削除実行時の確認内容を記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default [%2]を忘れますか？
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param --カスタムコマンド1--
 * @default
 * 
 * @param Custom1 Format
 * @desc 実行コマンドの「カスタムコマンド1」の表示内容を記述します。
 * @default 
 *
 * @param Custom1 EventID
 * @desc カスタムコマンド1で実行するコモンイベントのIDを設定します。
 * @default 
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、サブコマンドを表示する機能を追加します。
 * 
 * サブコマンドは標準で以下の機能を持っています。
 * 1. スキルを実行する。
 * 2. 習得済みのスキルを削除する(忘れる)。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。
 * 
 * 3. 本プラグインは、FTKR_SEP_ShowSkillStatus.jsと組み合わせて
 *    使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルの削除条件
 *-----------------------------------------------------------------------------
 * 標準でスキルは無条件に削除可能です。
 * これに対して、以下のノートタグをスキルに追記することで、削除するための
 * 条件を設定することができます。
 * 
 * <EIC 削除条件>
 * 条件式
 * </EIC 削除条件>
 * 
 * [条件式(eval) の値について]
 * 条件式(eval)は、ダメージ計算式のように、計算式を入力することで、
 * 固定値以外の値を使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 *  s[x]    - スイッチID x の状態を参照します。
 *  v[x]    - 変数ID x の値を参照します。
 *  iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)
 * 
 * (*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
 * 
 * 入力例）
 * スイッチID1 が ON の時に削除可能。
 * <EIC 削除条件>
 * s[1]
 * </EIC 削除条件>
 * 
 * 
 * [複数の条件を設定する場合]
 * 以下の2種類の入力例は同じ意味です。
 * 
 * 1. 縦に複数の条件式を並べる
 * <EIC 削除条件>
 * 条件式1
 * 条件式2
 * </EIC 削除条件>
 * 
 * 1. '&&'を使用して横に複数の条件式を並べる
 * <EIC 削除条件>
 * 条件式1 && 条件式2
 * </EIC 削除条件>
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムコマンドについて
 *-----------------------------------------------------------------------------
 * コモンイベントを実行できるカスタムコマンドを設定できます。
 * なお、コモンイベントを実行すると、自動的にメニューが閉じます。
 * 
 * 以下のプラグインパラメータで設定します。
 * 
 * <ustom1 Format>
 *    :サブコマンドで表示するコマンド名を設定してください。
 * 
 * <Custom1 EventID>
 *    :実行するコモンイベントのIDを設定してください。
 * 
 * 
 * サブコマンドを実行したアクターとスキルの情報は以下のスクリプトで
 * 取得できます。
 * 
 * アクターのゲームデータ
 * $gameParty.menuActor()
 *    ⇒ アクターID
 *        $gameParty.menuActor()._actorId
 *    ⇒ アクター名
 *        $gameParty.menuActor()._name
 * 
 * スキルのデータ
 * $gameParty.lastItem()
 *    ⇒ スキルID
 *        $gameParty.lastItem().id
 *    ⇒ スキル名
 *        $gameParty.lastItem().name
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
 * v1.0.0 - 2017/04/15 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SSC.parameters = PluginManager.parameters('FTKR_SkillSubCommand');

//メニュー表示
FTKR.SSC.enableConf = Number(FTKR.SSC.parameters['Enable Confirmation'] || 0);
FTKR.SSC.itemOk = false;
FTKR.SSC.subComOk = false;
FTKR.SSC.confOk = false;

//スキルのパラメータ名
FTKR.SSC.confTitle = {
    format:String(FTKR.SSC.parameters['Conf Title Format'] || ''),
};
FTKR.SSC.conf = {
    okFormat:String(FTKR.SSC.parameters['Confirmation Ok Format'] || ''),
    cancelFormat:String(FTKR.SSC.parameters['Confirmation Cancel Format'] || ''),
};
FTKR.SSC.sepSub = {
    useFormat:String(FTKR.SSC.parameters['Command Use Format'] || ''),
    forgetFormat:String(FTKR.SSC.parameters['Command Forget Format'] || ''),
    cancelFormat:String(FTKR.SSC.parameters['Command Cancel Format'] || ''),
};

FTKR.SSC.custom = [
    {format:String(FTKR.SSC.parameters['Custom1 Format'] || ''),
    eventId:Number(FTKR.SSC.parameters['Custom1 EventID'] || 0),}
];

//=============================================================================
// DataManager
//=============================================================================

FTKR.SSC.DatabaseLoaded = false;
FTKR.SSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.SSC.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.SSC.DatabaseLoaded) {
        this.eicForgetNoteTags($dataSkills);
        FTKR.SSC.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eicForgetNoteTags = function(group) {
    var note1a = /<EIC 削除条件>/i;
    var note1aj = /<EIC FORGET>/i;
    var note1b = /<\/EIC 削除条件>/i;
    var note1bj = /<\/EIC FORGET>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.seprequired = '';
        obj.forget = '';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                var text = '';
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.seprequired = text;
            } else if (setMode === 'anydata') {
                text += line + ';';
            }
        }
        this.makeSscData(obj);
        obj.seprequired = '';
    }
};

DataManager.makeSscData = function(skill) {
    var sepdata = skill.seprequired;
    if (sepdata) {
        var datas = sepdata.split(';');
        skill.forget += '(';
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(/(.+)/i)) {
                skill.forget += RegExp.$1;
                if (datas[i+1]) skill.forget += ')&&(';
            }
        }
        skill.forget += ')';
   }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.sscSkill = function(skillId) {
  return Imported.FTKR_SEP ? this.getSkill(skillId) : $dataSkills[skillId];
};

Game_Actor.prototype.isForgetOk = function(skillId) {
    var skill = this.sscSkill(skillId);
    return this.evalSscFormula(skill.forget, skill);
};

Game_Actor.prototype.evalSscFormula = function(formula, item) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        if(Imported.FTKR_ISV) var iv = item._selfVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.actSelect = function(index) {
  this.activate();
  this.select(index);
  this.refresh();
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.setSubComWindow = function(window) {
  this._ssCsubCommandWindow = window;
  this.update();
};

Window_SkillType.prototype.setConfTitleWindow = function(window) {
  this._sscConfTitleWindow = window;
  this.update();
};

Window_SkillType.prototype.setSepConfWindow = function(window) {
  this._sscConfWindow = window;
  this.update();
};

FTKR.SSC.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
  FTKR.SSC.Window_SkillType_update.call(this);
  var scw = this._ssCsubCommandWindow;
  if (scw) FTKR.SSC.subComOk ? scw.show() : scw.hide();
  var ctw = this._sscConfTitleWindow;
  var cfw = this._sscConfWindow;
  if (ctw && cfw) {
    if (FTKR.SSC.enableConf && FTKR.SSC.confOk) {
      ctw.show();
      cfw.show();
    } else {
      ctw.hide();
      cfw.hide();
    }
  }
};

//=============================================================================
// Window_SkillList
//=============================================================================

FTKR.SSC.Window_SkillList_isCurrentItemEnabled = 
    Window_SkillList.prototype.isCurrentItemEnabled;
Window_SkillList.prototype.isCurrentItemEnabled = function() {
    return this._data[this.index()] && !$gameParty.inBattle() ?
        true : FTKR.SSC.Window_SkillList_isCurrentItemEnabled.call(this);
};

Window_SkillList.prototype.setSubComWindow = function(window) {
  this._ssCsubCommandWindow = window;
  this.update();
};

Window_SkillList.prototype.setConfWindow = function(window) {
  this._sscConfWindow = window;
  this.update();
};

Window_SkillList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  var skillId = this.item() ? this.item().id : 0;
  if (skillId) {
    var scw = this._ssCsubCommandWindow;
    if (scw) {
      scw.setEnabled(this.isEnabled(this.item()));
      scw.setSkillId(skillId);
    }
    if (this._sscConfWindow) {
      var actor = this._actor;
      this._sscConfWindow.setEnabled(actor.isForgetOk(skillId));
    }
  }
};

//=============================================================================
// Window_SepSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_SepSubCommand() {
  this.initialize.apply(this, arguments);
}

Window_SepSubCommand.prototype = Object.create(Window_Selectable.prototype);
Window_SepSubCommand.prototype.constructor = Window_SepSubCommand;

Window_SepSubCommand.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._skillId = null;
  this._symbol = '';
};

Window_SepSubCommand.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SepSubCommand.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SepSubCommand.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SepSubCommand.prototype.makeItemList = function() {
    this._data = [];
    var actor = this._actor;
    if (!actor || !this._skillId) return;
    var sep = FTKR.SSC.sepSub;
    this._data = [
      {symbol:'use', enabled:this._enabled, disp:sep.useFormat},
      {symbol:'forget', enabled:actor.isForgetOk(this._skillId), disp:sep.forgetFormat},
      {symbol:'cancel', enabled:true, disp:sep.cancelFormat},
    ];
    if (FTKR.SSC.custom[0].format && FTKR.SSC.custom[0].eventId) {
        var data = {
          symbol:'custom',
          enabled:true,
          disp:FTKR.SSC.custom[0].format,
        };
        this._data.splice(-1, 0, data);
    }
};

Window_SepSubCommand.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_SepSubCommand.prototype.isEnabled = function(index) {
  return this._actor && this._data[index].enabled;
};

Window_SepSubCommand.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
  this.changePaintOpacity(1);
};

Window_SepSubCommand.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SepSubCommand.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

Window_SepSubCommand.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
};

//=============================================================================
// Window_SepConfTitle
//=============================================================================

function Window_SepConfTitle() {
  this.initialize.apply(this, arguments);
}

Window_SepConfTitle.prototype = Object.create(Window_Base.prototype);
Window_SepConfTitle.prototype.constructor = Window_SepConfTitle;

Window_SepConfTitle.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
  this.refresh();
};

Window_SepConfTitle.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_SepConfTitle.prototype.refresh = function () {
  this.contents.clear();
  this.drawStsText(FTKR.SSC.confTitle.format);
};

Window_SepConfTitle.prototype.drawStsText = function(format) {
  if (this._actor && this._skillId) {
    var skill = this._actor.sscSkill(this._skillId);
    var width = this.width - this.standardPadding() * 2;
    this.drawDescTitle(format, 0, 0, width, skill);
  }
};

//アクター名、スキル名が使用できるタイトル文を表示する関数
Window_SepConfTitle.prototype.drawDescTitle = function(format, x, y, width, skill) {
    var name = skill ? skill.name : '';
    var params = [this._actor._name, name];
    this.drawFormatTextEx(format, x, y, params, width);
};

// 制御文字を使えるフォーマットテキスト描画関数
Window_SepConfTitle.prototype.drawFormatTextEx = function(fmt, x, y, params) {
    var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
    return this.drawTextEx(text, x, y);
};

//=============================================================================
// Window_SepConf
// 確認用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_SepConf() {
  this.initialize.apply(this, arguments);
}

Window_SepConf.prototype = Object.create(Window_Selectable.prototype);
Window_SepConf.prototype.constructor = Window_SepConf;

Window_SepConf.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._dicision = false;
};

Window_SepConf.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SepConf.prototype.maxCols = function() {
    return 2;
};

Window_SepConf.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SepConf.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SepConf.prototype.makeItemList = function() {
  this._data = [
    {dicision:true, disp:FTKR.SSC.conf.okFormat},
    {dicision:false, disp:FTKR.SSC.conf.cancelFormat}
  ];
};

Window_SepConf.prototype.isEnabled = function(index) {
  return this._actor && (this._enabled || index > 0);
};

Window_SepConf.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_SepConf.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
  this.changePaintOpacity(1);
};

Window_SepConf.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SepConf.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
};

//=============================================================================
// Scene_Skill
//=============================================================================

FTKR.SSC.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
  FTKR.SSC.Scene_Skill_create.call(this);
    this.createSscSubCommandWindow();
    if (FTKR.SSC.enableConf) {
      this.createSscConfTitleWindow();
      this.createSscConfWindow();
    }
    this.refreshActor();
};

Scene_Skill.prototype.createSscSubCommandWindow = function() {
  var wy = this._itemWindow.y;
  var ww = 240;
  var wh = Graphics.boxHeight - wy;
  this._ssCsubCommandWindow = new Window_SepSubCommand(0, wy, ww, wh);
  var window = this._ssCsubCommandWindow;
  window.setHandler('ok', this.onSubComOk.bind(this));
  window.setHandler('cancel', this.onSubComCancel.bind(this));
  this._skillTypeWindow.setSubComWindow(window);
  this._itemWindow.setSubComWindow(window);
  this.addWindow(window);
};

Scene_Skill.prototype.createSscConfTitleWindow = function() {
    var wx = Graphics.boxWidth / 4;
    var wh = this._helpWindow.fittingHeight(1);
    var ww = Graphics.boxWidth / 2;
    var wy = Graphics.boxHeight / 2 - wh;
    this._sscConfTitleWindow = new Window_SepConfTitle(wx, wy, ww, wh);
    this._skillTypeWindow.setConfTitleWindow(this._sscConfTitleWindow);
    this.addWindow(this._sscConfTitleWindow);
};

Scene_Skill.prototype.createSscConfWindow = function() {
  var ctw = this._sscConfTitleWindow;
  var wx = ctw.x;
  var wy = ctw.y + ctw.height;
  var ww = ctw.width;
  var wh = this._helpWindow.lineHeight() * 1 + this._helpWindow.standardPadding() * 2;

  this._sscConfWindow = new Window_SepConf(wx, wy, ww, wh);
  var window = this._sscConfWindow;
  window.setHandler('ok', this.onConfirmationOk.bind(this));
  window.setHandler('cancel', this.onConfirmationCancel.bind(this));
  this._skillTypeWindow.setSepConfWindow(window);
  this._itemWindow.setConfWindow(window);
  this.addWindow(window);
};

FTKR.SSC.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
  FTKR.SSC.Scene_Skill_refreshActor.call(this);
  var actor = this.actor();
  if (this._ssCsubCommandWindow) this._ssCsubCommandWindow.setActor(actor);
  var ctw = this._sscConfTitleWindow;
  if (ctw) ctw.setActor(actor);
  var cfw = this._sscConfWindow;
  if (cfw) cfw.setActor(actor);
  FTKR.SSC.itemOk = false;
  FTKR.SSC.subComOk = false;
  FTKR.SSC.confOk = false;
};

Scene_Skill.prototype.commandsssSep = function() {
  this._sssSkillListWindow.actSelect(0);
};

FTKR.SSC.Scene_Skill_onitemOk = Scene_Skill.prototype.onItemOk;
Scene_Skill.prototype.onItemOk = function() {
    FTKR.SSC.subComOk = true;
    this._ssCsubCommandWindow.actSelect(0);
};

Scene_Skill.prototype.onSubComOk = function() {
    var scw = this._ssCsubCommandWindow;
    if (scw.item().symbol === 'use') {
        FTKR.SSC.itemOk = true;
        FTKR.SSC.subComOk = false;
        FTKR.SSC.Scene_Skill_onitemOk.call(this);
    } else if (scw.item().symbol === 'forget'){
        FTKR.SSC.confOk = true;
        var ctw = this._sscConfTitleWindow;
        ctw._skillId = scw._skillId;
        ctw.refresh();
        this._sscConfWindow.actSelect(0);
    } else if (scw.item().symbol === 'custom'){
        $gameParty.setLastItem(this._actor.sscSkill(scw._skillId));
        $gameTemp.reserveCommonEvent(FTKR.SSC.custom[0].eventId);
        this.checkCommonEvent();
    } else {
        this.onSubComCancel();
    }
};

Scene_Skill.prototype.onSubComCancel = function() {
    FTKR.SSC.subComOk = false;
    this._ssCsubCommandWindow.deselect();
    this._itemWindow.actSelect(this._itemWindow.index());
};

Scene_Skill.prototype.onConfirmationOk = function() {
  var cfw = this._sscConfWindow;
  if (cfw.item().dicision) {
    FTKR.SSC.confOk = false;
    cfw.deselect();
    this._actor.forgetSkill(this._sscConfTitleWindow._skillId);
    this._itemWindow.refresh();
    this.onSubComCancel();
  } else {
    this.onConfirmationCancel();
  }
};

Scene_Skill.prototype.onConfirmationCancel = function() {
  FTKR.SSC.confOk = false;
  FTKR.SSC.subComOk = false;
  this._sscConfWindow.deselect();
  this._ssCsubCommandWindow.deselect();
  this.onSubComCancel();
};

Scene_ItemBase.prototype.onActorCancel = function() {
    FTKR.SSC.itemOk = false;
    FTKR.SSC.subComOk = false;
    this.hideSubWindow(this._actorWindow);
};
