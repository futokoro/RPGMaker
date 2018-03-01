//=============================================================================
// セーブファイルを削除するコマンドを追加するプラグイン
// FTKR_DeleteSavefile.js
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 2018/03/01
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DSF = true;

var FTKR = FTKR || {};
FTKR.DSF = FTKR.DSF || {};

//=============================================================================
/*:
 * @plugindesc v1.0.1 セーブファイルを削除するコマンドを追加するプラグイン
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
 *  %1 - ファイル, %2 - ファイルID
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
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * セーブ画面やコンティニュー画面から、セーブファイルを削除できます。
 * 
 * 削除時に確認画面を表示させることもできます。
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
        }
    };

    console.log(FTKR.DSF);

    SoundManager.playDeleteSavefile = function() {
        var sound = FTKR.DSF.deleteSe;
        if (sound && sound.name) {
            AudioManager.playStaticSe(sound);
        } else {
            this.playSystemSound(1);
        }
    };

    //=============================================================================
    // Scene_File
    //=============================================================================
    //書き換え
    Scene_File.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        DataManager.loadAllSavefileImages();
        this.createHelpWindow();
        this.createCommandWindow();
        this.createListWindow();
        if (FTKR.DSF.conf.enabled) {
            this.createDsdConfWindows();
        }
    };

    Scene_File.prototype.createCommandWindow = function() {
        var x = 0;
        var y = this._helpWindow.height;
        this._commandWindow = new Window_SavefileCommand(x, y, this.mode());
        this._commandWindow.setHandler('list',   this.onListOk.bind(this));
        this._commandWindow.setHandler('delete', this.onDeleteOk.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    //書き換え
    Scene_File.prototype.createListWindow = function() {
        var x = 0;
        var y = this._commandWindow.y + this._commandWindow.height;
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight - y;
        this._listWindow = new Window_SavefileList(x, y, width, height);
        this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.onSavefileCancel.bind(this));
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.setMode(this.mode());
        this._listWindow.refresh();
        this._listWindow.deactivate();
        this._listWindow.deselect();
        this.addWindow(this._listWindow);
    };

    Scene_File.prototype.createDsdConfWindows = function() {
        this.createDsdConfTitle();
        this.createDsdConfCommand();
    }

    Scene_File.prototype.createDsdConfTitle = function() {
        var wx = Graphics.boxWidth / 6;
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
        var width = Graphics.boxWidth * 2 / 3;
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
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
    };

    Window_DsdConf.prototype.windowWidth = function() {
        return Graphics.boxWidth * 2 / 3;
    };

    Window_DsdConf.prototype.maxCols = function() {
        return 2;
    };

    Window_DsdConf.prototype.makeCommandList = function() {
        this.addCommand(FTKR.DSF.conf.ok, 'delete');
        this.addCommand(FTKR.DSF.conf.cancel, 'cancel');
    };

}());//EOF
