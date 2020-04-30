//=============================================================================
// セーブファイルを削除するコマンドを追加するプラグイン
// FTKR_DeleteSavefile.js
// プラグインNo : 69
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 2020/05/01
// バージョン : v1.0.5
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DSF = true;

var FTKR = FTKR || {};
FTKR.DSF = FTKR.DSF || {};

//=============================================================================
/*:
 * @plugindesc v1.0.5 セーブファイルを削除するコマンドを追加するプラグイン
 * @author フトコロ
 *
 * @param --コマンド名--
 * @default
 * 
 * @param Save Command Name
 * @desc セーブ画面でのセーブコマンドの名前
 * @default セーブ
 *
 * @param Load Command Name
 * @desc コンティニュー画面でのロードコマンドの名前
 * @default ロード
 *
 * @param Delete Command Name
 * @desc セーブファイルを削除するコマンドの名前
 * @default 削除
 *
 * @param --セーブファイル削除SE--
 * @default
 * 
 * @param Delete File Se
 * @desc セーブファイルを削除する時に鳴らすSEを指定します。設定しない場合は、「決定」音を鳴らします。
 * @default 
 * @type struct<sound>
 * 
 * @param --削除確認--
 * @default
 * 
 * @param Enable Confirmation
 * @desc 削除時に確認するか。
 * @type boolean
 * @on 確認する
 * @off 確認しない
 * @default true
 *
 * @param Conf Title Format
 * @desc セーブファイルを削除する時の確認内容を記述します。
 *  %1 - ファイル, %2 - ファイルID    (制御文字を使用できます)
 * @default %1%2 を削除しますか？
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param Enable Conf Window Setting
 * @desc 確認用ウィンドウ設定を、セーブ画面ウィンドウと別に設定する機能を有効にします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Conf Window Setting
 * @desc 確認用ウィンドウを設定します。<Enable Conf Window Setting>が有効の場合にこの設定を使用します。
 * @default 
 * @type struct<window>
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * セーブ画面やコンティニュー画面から、セーブファイルを削除できます。
 * 
 * 削除時に確認画面を表示させることもできます。
 * 
 * 
 * プラグインパラメータで、以下を設定できます。
 * 1. 表示するコマンドの名前
 * 2. 削除時のSE
 * 3. 削除時に表示する文章と、そのウィンドウ設定
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
 * v1.0.5 - 2020/05/01 : 不具合修正
 *    1. セーブデータロード時に決定キーを連打すると、カーソルを合わせていた
 *       セーブデータが消える不具合を修正。(by elleonard氏)
 *    2. <Enable Conf Window Setting>を無効にした場合に、確認用ウィンドウの
 *       ウィンドウ枠が表示されない不具合を修正。
 *    3. オーバーライドで定義していたメソッドを修正。
 * 
 * v1.0.4 - 2018/04/06 : 仕様変更
 *    1. プラグインパラメータが空欄だった場合の処理を一部見直し。
 * 
 * v1.0.3 - 2018/04/04 : 不具合修正
 *    1. windowskinを変更した場合に、初回表示時に反映されない不具合を修正。
 * 
 * v1.0.2 - 2018/04/03 : 機能追加
 *    1. 削除でファイルを選択した時に決定SEを鳴らすように変更。
 *    2. 確認画面のウィンドウを個別に設定する機能を追加。
 * 
 * v1.0.1 - 2018/03/01 : 仕様変更
 *    1. 確認画面でカーソルの初期位置を「実行しない」に変更。
 * 
 * v1.0.0 - 2018/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~sound:
 * @param name
 * @desc SEの名前を指定します。
 * @default Decision1
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param volume
 * @desc SEの音量を指定します。
 * @default 90
 * @type number
 * @max 100
 * 
 * @param pitch
 * @desc SEのピッチを指定します。
 * @default 100
 * @type number
 * @max 150
 * @min 50
 * 
 * @param pan
 * @desc SEの位相を指定します。
 * @default 0
 * @type number
 * @max 100
 * @min -100
 *
*/
/*~struct~window:
 * @param windowskin
 * @desc ウィンドウスキンに使用する画像を指定します。空欄にした場合はデフォルト画像を使用します。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param width
 * @desc ウィンドウの幅を設定します。
 * @default 544
 * @type number
 * @min 1
 *
 * @param opacity
 * @desc ウィンドウ内の背景の透明率を0~255で指定します。0 で透明です。
 * @default 192
 * @type number
 * @min 0
 * @max 255
 *
 * @param frame
 * @desc ウィンドウ枠を表示するか指定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
*/

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_DeleteSavefile');

    FTKR.DSF = {
        save     : String(parameters['Save Command Name'] || 'セーブ'),
        load     : String(parameters['Load Command Name'] || 'ロード'),
        delete   : String(parameters['Delete Command Name'] || '削除'),
        deleteSe : paramParse(parameters['Delete File Se']),
        conf     : {
            enabled : paramParse(parameters['Enable Confirmation']) || false,
            title : String(parameters['Conf Title Format'] || ''),
            ok    : String(parameters['Confirmation Ok Format'] || ''),
            cancel: String(parameters['Confirmation Cancel Format'] || ''),
            setting : paramParse(parameters['Conf Window Setting']) || {},
        }
    };
    FTKR.DSF.conf.setting.enabled = paramParse(parameters['Enable Conf Window Setting']) || false;

    //=============================================================================
    // SoundManager
    //=============================================================================

    SoundManager.playDeleteSavefile = function() {
        var sound = FTKR.DSF.deleteSe;
        if (sound && sound.name) {
            AudioManager.playStaticSe(sound);
        } else {
            this.playSystemSound(1);
        }
    };

    //=============================================================================
    // Scene_Boot
    //=============================================================================

    var _DSF_Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function() {
        _DSF_Scene_Boot_loadSystemWindowImage.call(this);
        var set = FTKR.DSF.conf.setting;
        if (set.enabled && set.windowskin) {
            if (!!ImageManager.reserveSystem) {
                ImageManager.reserveSystem(set.windowskin);
            } else {
                ImageManager.loadSystem(set.windowskin);
            }
        }
    };

    //=============================================================================
    // Scene_File
    //=============================================================================

    var _DSF_Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _DSF_Scene_File_create.call(this);
        this.createCommandWindow();
        this.changePositionWindow();
        if (FTKR.DSF.conf.enabled) {
            this.createDsdConfWindows();
        }
    };

    //atWindowで指定したウィンドウの後に、addWindowで指定したウィンドウを_windowLayerのchildに加える。
    Scene_File.prototype.addWindowAtW = function(addWindow, atWindow) {
        this._windowLayer.children.some(function(wchild, i){
            if (wchild === atWindow) {
                windowIndex = i;
                return true;
            }
        },this);
        this._windowLayer.addChildAt(addWindow, windowIndex);
    };

    Scene_File.prototype.createCommandWindow = function() {
        var wx = 0;
        var wy = this._helpWindow.height;
        this._commandWindow = new Window_SavefileCommand(wx, wy, this.mode());
        this._commandWindow.setHandler('list',   this.onListOk.bind(this));
        this._commandWindow.setHandler('delete', this.onDeleteOk.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindowAtW(this._commandWindow, this._helpWindow);
    };

    Scene_File.prototype.changePositionWindow = function() {
        this._listWindow.y = this._commandWindow.y + this._commandWindow.height;
        this._listWindow.height = Graphics.boxHeight - this._listWindow.y;
        this._listWindow.deactivate();
        this._listWindow.deselect();
    };

    Scene_File.prototype.createDsdConfWindows = function() {
        this.createDsdConfTitle();
        this.createDsdConfCommand();
    }

    Scene_File.prototype.createDsdConfTitle = function() {
        var wx = FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.width ?
                    (Graphics.boxWidth - FTKR.DSF.conf.setting.width) / 2 : Graphics.boxWidth / 6;
        var wy = Graphics.boxHeight / 2 - this._helpWindow.fittingHeight(1);
        this._confTitleWindow = new Window_DsdConfTitle(wx, wy);
        this.addWindow(this._confTitleWindow);
        this._confTitleWindow.hide();
    };

    Scene_File.prototype.createDsdConfCommand = function() {
        var wx = this._confTitleWindow.x;
        var wy = this._confTitleWindow.y + this._confTitleWindow.height;
        this._confCommandWindow = new Window_DsdConf(wx, wy);
        this._confCommandWindow.setHandler('delete', this.onConfirmationOk.bind(this));
        this._confCommandWindow.setHandler('cancel', this.onConfirmationCancel.bind(this));
        this.addWindow(this._confCommandWindow);
        this._confCommandWindow.hide();
        this._confCommandWindow.deactivate();
    };

    Scene_File.prototype.onListOk = function() {
        this._delete = false;
        this._commandWindow.deactivate();
        this._listWindow.activate();
        this._listWindow.select(0);
    }

    Scene_File.prototype.onDeleteOk = function() {
        this._delete = true;
        this._commandWindow.deactivate();
        this._listWindow.activate();
        this._listWindow.select(0);
    };

    Scene_File.prototype.onSavefileCancel = function() {
        this._delete = false;
        this._listWindow.deselect();
        this._commandWindow.activate();
    };

    Scene_File.prototype.deleteSavefile = function() {
        if (FTKR.DSF.conf.enabled) {
            this._confTitleWindow.setSavefileId(this.savefileId());
            this._confTitleWindow.show();
            this._confCommandWindow.show();
            this._confCommandWindow.activate();
            this._confCommandWindow.select(1);
        } else {
            SoundManager.playDeleteSavefile();
            StorageManager.remove(this.savefileId());
            this._listWindow.refresh();
            this._listWindow.activate();
        }
    };

    Scene_File.prototype.onConfirmationOk = function() {
        SoundManager.playDeleteSavefile();
        StorageManager.remove(this.savefileId());
        this._listWindow.refresh();
        this._listWindow.activate();
        this._confTitleWindow.hide();
        this._confCommandWindow.deactivate();
        this._confCommandWindow.hide();
      };

    Scene_File.prototype.onConfirmationCancel = function() {
        this._confTitleWindow.hide();
        this._confCommandWindow.deactivate();
        this._confCommandWindow.hide();
        this._listWindow.activate();
    };

    //=============================================================================
    // Scene_Save
    //=============================================================================
    var _DSF_Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
    Scene_Save.prototype.onSavefileOk = function() {
        if (this._delete) {
            if (DataManager.isThisGameFile(this.savefileId())) {
                SoundManager.playOk();
                this.deleteSavefile();
            } else {
                this.onSaveFailure();
            }
        } else {
            _DSF_Scene_Save_onSavefileOk.call(this);
        }
    };

    //=============================================================================
    // Scene_Load
    //=============================================================================
    var _DSF_Scene_Load_onSavefileOk = Scene_Load.prototype.onSavefileOk;
    Scene_Load.prototype.onSavefileOk = function() {
        if (this._delete) {
            if (DataManager.isThisGameFile(this.savefileId())) {
                SoundManager.playOk();
                this.deleteSavefile();
            } else {
                this.onLoadFailure();
            }
        } else {
            _DSF_Scene_Load_onSavefileOk.call(this);
        }
    };

    //=============================================================================
    // Window_SavefileCommand
    //=============================================================================
    function Window_SavefileCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_SavefileCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SavefileCommand.prototype.constructor = Window_SavefileCommand;

    Window_SavefileCommand.prototype.initialize = function(x, y, mode) {
        this._mode = mode;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_SavefileCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_SavefileCommand.prototype.maxCols = function() {
        return 2;
    };

    Window_SavefileCommand.prototype.makeCommandList = function() {
        var listname = this._mode === 'save' ? FTKR.DSF.save : FTKR.DSF.load;
        this.addCommand(listname,        'list');
        this.addCommand(FTKR.DSF.delete, 'delete', this.isDeleteFileEnabled());
    };

    Window_SavefileCommand.prototype.isDeleteFileEnabled = function() {
        return DataManager.isAnySavefileExists();
    };

    //=============================================================================
    // Window_DsdConfTitle
    //=============================================================================

    function Window_DsdConfTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_DsdConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_DsdConfTitle.prototype.constructor = Window_DsdConfTitle;

    Window_DsdConfTitle.prototype.initialize = function(x, y) {
        var set = FTKR.DSF.conf.setting;
        var width = set.enabled && set.width ? set.width : Graphics.boxWidth * 2 / 3;
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        if (set.enabled && !set.frame) this.margin = 0;
        this._savefileId = 0;
        this.refresh();
    };

    Window_DsdConfTitle.prototype.setSavefileId = function(savefileId) {
        this._savefileId = savefileId;
        this.refresh();
    }

    Window_DsdConfTitle.prototype.refresh = function () {
        this.contents.clear();
        var text = FTKR.DSF.conf.title.format(TextManager.file, this._savefileId);
        this.drawTextEx(text, 0, 0);
    };

    Window_DsdConfTitle.prototype.loadWindowskin = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.windowskin) {
            this.windowskin = ImageManager.loadSystem(FTKR.DSF.conf.setting.windowskin);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
    };

    Window_DsdConfTitle.prototype.standardBackOpacity = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.opacity >= 0) {
            return Number(FTKR.DSF.conf.setting.opacity);
        } else {
            return Window_Base.prototype.standardBackOpacity.call(this);
        }
    };

    Window_DsdConfTitle.prototype._refreshFrame = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.frame || !FTKR.DSF.conf.setting.enabled) {
            Window.prototype._refreshFrame.call(this);
        }
    };

    //=============================================================================
    // Window_DsdConf
    //=============================================================================

    function Window_DsdConf() {
        this.initialize.apply(this, arguments);
    }

    Window_DsdConf.prototype = Object.create(Window_HorzCommand.prototype);
    Window_DsdConf.prototype.constructor = Window_DsdConf;

    Window_DsdConf.prototype.initialize = function(x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        if (FTKR.DSF.conf.setting.enabled && !FTKR.DSF.conf.setting.frame) this.margin = 0;
    };

    Window_DsdConf.prototype.windowWidth = function() {
        return FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.width ? FTKR.DSF.conf.setting.width : Graphics.boxWidth * 2 / 3;
    };

    Window_DsdConf.prototype.maxCols = function() {
        return 2;
    };

    Window_DsdConf.prototype.makeCommandList = function() {
        this.addCommand(FTKR.DSF.conf.ok, 'delete');
        this.addCommand(FTKR.DSF.conf.cancel, 'cancel');
    };

    Window_DsdConf.prototype.loadWindowskin = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.windowskin) {
            this.windowskin = ImageManager.loadSystem(FTKR.DSF.conf.setting.windowskin);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
    };

    Window_DsdConf.prototype.standardBackOpacity = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.opacity >= 0) {
            return Number(FTKR.DSF.conf.setting.opacity);
        } else {
            return Window_Base.prototype.standardBackOpacity.call(this);
        }
    };

    Window_DsdConf.prototype._refreshFrame = function() {
        if (FTKR.DSF.conf.setting.enabled && FTKR.DSF.conf.setting.frame || !FTKR.DSF.conf.setting.enabled) {
            Window.prototype._refreshFrame.call(this);
        }
    };

}());//EOF
