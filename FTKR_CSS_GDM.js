//=============================================================================
// GraphicalDesignMode.jsを使ってFTKR_CSSステータス表示を変更するプラグイン
// FTKR_CSS_GDM.js
// 作成者     : フトコロ
// 作成日     : 2017/11/08
// 最終更新日 : 2017/11/14
// バージョン : v1.1.0
//=============================================================================
// GraphicalDesignMode.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_GDM = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.GDM = FTKR.CSS.GDM || {};

//=============================================================================
/*:
 * @plugindesc v1.1.0 GDMを使ってFTKR_CSSステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * トリアコンタンさん製作のGraphicalDesignMode.jsを使って
 * FTKR_CSSプラグインのステータス表示のレイアウトをゲーム画面上で変更できます。
 * 
 * デザインモードにて、ウィンドウ内にマウスカーソルを合わせて
 * 英字キーを押下すると、各プロパティを変更できます。
 * 
 * ※英字とプロパティの対応
 *
 * R. Text1部に表示するステータス
 * F. Text2部に表示するステータス
 * V. Text3部に表示するステータス
 * T. 各Textの間隔
 * G. Text内で複数表示する場合の間隔
 * B. Text1~Text3の表示幅の比率
 * 
 * 以下のキー操作はメニュー画面、バトル画面、戦績画面のみ有効
 * Y. アクターを横に並べる数
 * H. アクター１人分の表示高さ
 * N. 縦のカーソル間隔
 * 
 * 
 * 設定可能なステータスウィンドウ
 * ・メニュー画面
 * ・スキル画面
 * ・装備画面
 * ・ステータス画面(*1)
 * ・バトル画面
 * ・戦績画面(FTKR_CSS_CustomizeBattleResults.jsが必要)
 * ・ショップ画面(FTKR_CSS_ShopStatus.jsが必要)
 * 
 * (*1)ステータス画面の設定は、FTKR_CSS_DetailedStatus.jsと異なります。
 *     ステータス画面を縦に４分割した表示エリアごとに個別に設定します。
 *     設定する際には、マウスカーソル位置を各表示エリアに合わせてください。
 *  
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 本プラグインを動作させるためには、以下のプラグインが必要です。
 *    本プラグインは、これらのプラグインよりも下の位置に配置してください。
 * 
 *    GraphicalDesignMode.js
 *    FTKR_CustomSimpleActorStatus.js
 * 
 * 3. 以下のプラグインと組み合わせる場合は、本プラグインはこれらよりも
 *    下に配置してください。
 * 
 *    FTKR_CSS_MenuStatus.js
 *    FTKR_CSS_SkillStatus.js
 *    FTKR_CSS_DetailedStatus.js
 *    FTKR_CSS_EquipStatus.js
 *    FTKR_CSS_BattleStatus.js(*1)
 *    FTKR_CSS_CustomizeBattleResults.js
 *    FTKR_CSS_ShopStatus.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * 補足情報
 *-----------------------------------------------------------------------------
 * 1．Text1～Text3の表示を消したい場合。
 * 
 *    半角スペースだけを入力することで、無表示になります。
 *    何も入力しない(空欄)の場合は、デフォルトの表示になります。
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
 * v1.1.0 - 2017/11/18 : 仕様変更
 *    1. FTKR_CustomSimpleActorStatus.jsの v2.6.0 に対応。
 * 
 * v1.0.2 - 2017/11/10 : 機能追加
 *    1. FTKR_CSS_MenuStatus.jsとFTKR_CSS_BattleStatus.jsの
 *       ウィンドウ設定をデフォルトとして読み込む機能を追加。
 * 
 * v1.0.1 - 2017/11/10 : 不具合修正、機能追加、ヘルプ修正
 *    1. FTKR_FacialImageDifference.jsと組み合わた場合、顔画像の表示を
 *       削除しても表示が残ってしまう不具合を修正。
 *    2. FTKR_CSS系の拡張プラグインの設定を読み込む機能を追加。
 *    3. ヘルプに、ステータス画面の設定に関する注意を追記。
 * 
 * v1.0.0 - 2017/11/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

(function() {
    Input.keyMapper[82] = 'keyR';
    Input.keyMapper[70] = 'keyF';
    Input.keyMapper[86] = 'keyV';
    Input.keyMapper[84] = 'keyT';
    Input.keyMapper[71] = 'keyG';
    Input.keyMapper[66] = 'keyB';
    Input.keyMapper[89] = 'keyY';
    Input.keyMapper[72] = 'keyH';
    Input.keyMapper[78] = 'keyN';
    
    var _Window_Base_loadProperty = Window_Base.prototype.loadProperty;
    Window_Base.prototype.loadProperty = function(containerInfo) {
        _Window_Base_loadProperty.apply(this, arguments);
        if (containerInfo._customCssText1) this._customCssText1    = containerInfo._customCssText1;
        if (containerInfo._customCssText2) this._customCssText2    = containerInfo._customCssText2;
        if (containerInfo._customCssText3) this._customCssText3    = containerInfo._customCssText3;
        if (containerInfo._customCssSpace) this._customCssSpace    = containerInfo._customCssSpace;
        if (containerInfo._customCssSpaceIn) this._customCssSpaceIn   = containerInfo._customCssSpaceIn;
        if (containerInfo._customCssWidthRate) this._customCssWidthRate = containerInfo._customCssWidthRate;
        if (containerInfo._customCssMaxCols) this._customCssMaxCols = containerInfo._customCssMaxCols;
        if (containerInfo._customCssCursorHeight) this._customCssCursorHeight = containerInfo._customCssCursorHeight;
        if (containerInfo._customCssHSpace) this._customCssHSpace = containerInfo._customCssHSpace;
        this.setCssStatus();
        this.setMaxCols();
        this.setCursorHeight();
        this.setHSpace();
        this.refresh();
    };
    
    var _Window_Base_saveProperty = Window_Base.prototype.saveProperty;
    Window_Base.prototype.saveProperty = function(containerInfo) {
        _Window_Base_saveProperty.apply(this, arguments);
        containerInfo._customCssText1    = this._customCssText1;
        containerInfo._customCssText2    = this._customCssText2;
        containerInfo._customCssText3    = this._customCssText3;
        containerInfo._customCssSpace    = this._customCssSpace;
        containerInfo._customCssSpaceIn    = this._customCssSpaceIn;
        containerInfo._customCssWidthRate  = this._customCssWidthRate;
        containerInfo._customCssMaxCols  = this._customCssMaxCols;
        containerInfo._customCssCursorHeight  = this._customCssCursorHeight;
        containerInfo._customCssHSpace  = this._customCssHSpace;
      };
      
    var _Window_Base_initialize      = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _Window_Base_initialize.apply(this, arguments);
        if (this._lssStatus) {
            var lss = this.standardCssStatus();
            this._customCssText1    = lss.text1;
            this._customCssText2    = lss.text2;
            this._customCssText3    = lss.text3;
            this._customCssSpace    = lss.space;
            this._customCssSpaceIn   = lss.spaceIn;
            this._customCssWidthRate = lss.widthRate;
        }
        if(this.maxCols) this._customCssMaxCols = this.maxCols();
        if(this.cursorHeight) this._customCssCursorHeight = this.cursorHeight();
        if(this.itemHeightSpace) this._customCssHSpace = this.itemHeightSpace();
    };

    var _CSS_Window_Base_processInput = Window_Base.prototype.processInput;
    Window_Base.prototype.processInput = function() {
        if (this.isPreparedEvent()) {
            var cssparams = [
                ['keyR', 'Text1', '_customCssText1', null, null, this.setCssStatus.bind(this), true],
                ['keyF', 'Text2', '_customCssText2', null, null, this.setCssStatus.bind(this), true],
                ['keyV', 'Text3', '_customCssText3', null, null, this.setCssStatus.bind(this), true],
                ['keyT', '列間隔',  '_customCssSpace', null, null, this.setCssStatus.bind(this), true],
                ['keyG', '列内の間隔', '_customCssSpaceIn', null, null, this.setCssStatus.bind(this), true],
                ['keyB', '表示幅の比率', '_customCssWidthRate', null, null, this.setCssStatus.bind(this), true],
                ['keyY', 'アクターの列数', '_customCssMaxCols', null, null, this.setMaxCols.bind(this), true],
                ['keyH', 'アクター１人分の行数', '_customCssCursorHeight', null, null, this.setCursorHeight.bind(this), true],
                ['keyN', '縦のカーソル間隔', '_customCssHSpace', null, null, this.setHSpace.bind(this), true],
            ];
            return cssparams.some(function(param) {
                return this.processSetProperty.apply(this, param);
            }.bind(this)) ? true : _CSS_Window_Base_processInput.apply(this);
        }
        return false
    };
    
    Window_Base.prototype.clearCssSpriteAll = function() {
        $gameParty.allMembers().forEach( function(member, i) {
            this.clearCssSprite(i);
        },this);
    };

    Window_Base.prototype.setCssStatus = function() {
        if (this._lssStatus) {
            this.clearCssSpriteAll();
            if (this._customCssText1) this._lssStatus.text1 = this._customCssText1;
            if (this._customCssText2) this._lssStatus.text2 = this._customCssText2;
            if (this._customCssText3) this._lssStatus.text3 = this._customCssText3;
            if (this._customCssSpace) this._lssStatus.space = this._customCssSpace;
            if (this._customCssSpaceIn) this._lssStatus.spaceIn = this._customCssSpaceIn;
            if (this._customCssWidthRate) this._lssStatus.widthRate = this._customCssWidthRate;
        }
    };

    Window_Base.prototype.setMaxCols = function() {
        this.clearCssSpriteAll();
        if (this._customCssMaxCols) this._css_maxCols = Number(this._customCssMaxCols);
    };

    Window_Base.prototype.setCursorHeight = function() {
        this.clearCssSpriteAll();
        if (this._customCssCursorHeight) this._css_cursorHeight = Number(this._customCssCursorHeight);
    };

    Window_Base.prototype.setHSpace = function(){
        this.clearCssSpriteAll();
        if (this._customCssHSpace) this._css_hSpace = Number(this._customCssHSpace);
    };

    //=============================================================================
    // Window_MenuStatus
    // メニュー画面のステータスウィンドウの表示クラス
    //=============================================================================
    Window_MenuStatus.prototype.standardCssStatus = function() {
        return {
            text1     :'face',
            text2     :'name,level,state',
            text3     :'class,hp,mp',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'2,2,3',
        };
    };

    var _Window_MenuStatus_itemHeight = Window_MenuStatus.prototype.itemHeight;
    Window_MenuStatus.prototype.itemHeight = function() {
        return this.cursorHeight() ? 
            this.lineHeight() * this.cursorHeight() :
            _Window_MenuStatus_itemHeight.call(this);
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        var lss = this._lssStatus;
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };

    Window_MenuStatus.prototype.drawAllItems = function() {
        var topIndex = this.topIndex();
        for (var i = 0; i < this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
            } else {
                this.clearCssSprite(index % this.maxPageItems());
            }
        }
    };

    //=============================================================================
    // Window_EquipStatus
    //=============================================================================
    Window_EquipStatus.prototype.standardCssStatus = function() {
        return {
            text1     :'name,param(2),param(3),param(4),param(5),param(6),param(7)',
            text2     :',eparam(2),eparam(3),eparam(4),eparam(5),eparam(6),eparam(7)',
            text3     :'',
            space     :'0,0,0,0',
            spaceIn   :'5',
            widthRate :'2,1,0',
        };
    };

    //書き換え
    Window_EquipStatus.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor, this._tempActor);
        return FTKR.evalFormula(formula);
    };

    //書き換え
    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            lss.target = this._tempActor;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
        }
    };

    //=============================================================================
    // Window_SkillStatus
    // スキル画面のステータスウィンドウの表示クラス
    //=============================================================================
    Window_SkillStatus.prototype.standardCssStatus = function() {
        return {
            text1     :'face',
            text2     :'name,level,state',
            text3     :'class,hp,mp',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'2,2,3',
        };
    };

    //書き換え
    Window_SkillStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
        }
    };

    //=============================================================================
    // Window_BattleStatus
    // バトル画面のステータスウィンドウの表示クラス
    //=============================================================================
    Window_BattleStatus.prototype.standardCssStatus = function() {
        return {
            text1     :'name',
            text2     :'state',
            text3     :'[hp/mp/tp]',
            space     :'0,5,5,0',
            spaceIn   :'5',
            widthRate :'1,1,3',
        };
    };

    Window_BattleStatus.prototype.itemHeight = function() {
        return this.cursorHeight() ? 
            this.lineHeight() * this.cursorHeight() :
            Window_Selectable.prototype.itemHeight.call(this);
    };

    //書き換え
    //アクター1人分のステータス表示
    Window_BattleStatus.prototype.drawItem = function(index) {
        var lss = this._lssStatus;
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRectForText(index);
        this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
    };

    //=============================================================================
    // Window_Status
    // ステータス画面のステータスウィンドウの表示クラス
    //=============================================================================

    //書き換え
    Window_Status.prototype.refresh = function() {
    };

    //=============================================================================
    // Window_StatusArea
    // ステータス画面の表示エリアごとのステータスウィンドウの表示クラス
    //=============================================================================

    function Window_StatusArea() {
        this.initialize.apply(this, arguments);
    }

    Window_StatusArea.prototype = Object.create(Window_Status.prototype);
    Window_StatusArea.prototype.constructor = Window_StatusArea;
    
    Window_StatusArea.prototype.initialize = function(x, y, width, height, lss) {
        this._lssStatus = lss;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this.refresh();
    };

    Window_StatusArea.prototype.standardCssStatus = function() {
        return this._lssStatus;
    };

    Window_StatusArea.prototype.standardPadding = function() {
        return 0;
    };

    Window_StatusArea.prototype._refreshFrame = function() {
        this._margin = 0;
    };

    Window_StatusArea.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lss = this._lssStatus;
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
        }
    };

    //=============================================================================
    // Scene_Status
    // ステータス画面のシーンクラス
    //=============================================================================

    var _CSS_Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _CSS_Scene_Status_create.call(this);
        this.createCssArea1();
        this.createCssArea2();
        this.createCssArea3();
        this.createCssArea4();
    };

    Scene_Status.prototype.createCssArea1 = function() {
        var stw = this._statusWindow;
        var x = stw.x + stw.standardPadding();
        var y = stw.y + stw.standardPadding();
        var width = Graphics.boxWidth - stw.standardPadding() * 2;
        var height = stw.lineHeight() * 2;
        var lss = this.cssStatusArea1();
        this._statusArea1Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea1Window.reserveFaceImages();
        this.addWindow(this._statusArea1Window);
    };

    Scene_Status.prototype.detailedStatus = function(index) {
        var ds = FTKR.CSS.DS.detailedStatus;
        index -= 1;
        var texts = ds.line[index].split(';');
        return {
            text1     :texts[0] + ',{line}',
            text2     :texts[1],
            text3     :texts[2],
            space     :ds.space[index],
            spaceIn   :ds.spaceIn[index],
            widthRate :ds.widthRate[index],
        };
    };

    Scene_Status.prototype.cssStatusArea1 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(1) : {
            text1     :'name,{line}',
            text2     :'class',
            text3     :'nickname',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'1,1,1',
        };
    };

    Scene_Status.prototype.createCssArea2 = function() {
        var stw = this._statusArea1Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 5;
        var lss = this.cssStatusArea2();
        this._statusArea2Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea2Window.reserveFaceImages();
        this.addWindow(this._statusArea2Window);
    };

    Scene_Status.prototype.cssStatusArea2 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(2) : {
            text1     :'face(4),{line}',
            text2     :'level,state,hp,mp',
            text3     :'custom(0),custom(1),custom(2),custom(3)',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'2,2,3',
        };
    };

    Scene_Status.prototype.createCssArea3 = function() {
        var stw = this._statusArea2Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 7;
        var lss = this.cssStatusArea3();
        this._statusArea3Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea3Window.reserveFaceImages();
        this.addWindow(this._statusArea3Window);
    };

    Scene_Status.prototype.cssStatusArea3 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(3) : {
            text1     :'param(2),param(3),param(4),param(5),param(6),param(7),{line}',
            text2     :'',
            text3     :'equip(0),equip(1),equip(2),equip(3),equip(4)',
            space     :'0,100,0,0',
            spaceIn   :'5',
            widthRate :'4,1,5',
        };
    };

    Scene_Status.prototype.createCssArea4 = function() {
        var stw = this._statusArea3Window;
        var x = stw.x;
        var y = stw.y + stw.height;
        var width = stw.width;
        var height = stw.lineHeight() * 2;
        var lss = this.cssStatusArea4();
        this._statusArea4Window = new Window_StatusArea(x, y, width, height, lss);
        this._statusArea4Window.reserveFaceImages();
        this.addWindow(this._statusArea4Window);
    };

    Scene_Status.prototype.cssStatusArea4 = function() {
        return FTKR.CSS.DS ? this.detailedStatus(4) : {
            text1     :'profile',
            text2     :'',
            text3     :'',
            space     :'0,20,50,0',
            spaceIn   :'5',
            widthRate :'1,0,0',
        };
    };

    var _CSS_Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
    Scene_Status.prototype.refreshActor = function() {
        _CSS_Scene_Status_refreshActor.call(this);
        var actor = this.actor();
        this._statusArea1Window.setActor(actor);
        this._statusArea2Window.setActor(actor);
        this._statusArea3Window.setActor(actor);
        this._statusArea4Window.setActor(actor);
    };

    //=============================================================================
    // FTKR_CSS_ShopStatus.jsの修正
    //=============================================================================
    if (Imported.FTKR_CSS_SpS) {

    Window_ShopWeaponStatus.prototype.initialize = function(x, y, width, height) {
        Window_ShopItemStatus.prototype.initialize.apply(this, arguments);
        if(this.pageSize) this._customCssMaxCols = this.pageSize();
        if(this.actorRows) this._customCssCursorHeight = this.actorRows();
        if(this.heightSpace) this._customCssHSpace = this.heightSpace();
    };

    };//FTKR_CSS_ShopStatus.js

}());//EOF