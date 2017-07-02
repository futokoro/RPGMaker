//=============================================================================
// トランプカードゲームプラグイン
// FTKR_CardGames.js
// 作成者     : フトコロ
// 作成日     : 2017/07/01
// 最終更新日 : 2017/07/01
// バージョン : v0.7.5
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_Card = true;

var FTKR = FTKR || {};
FTKR.CRD = FTKR.CRD || {};

//=============================================================================
/*:
 * @plugindesc v0.7.5 トランプカードゲーム
 * @author フトコロ
 *
 * @param --基本の設定--
 * @default
 * 
 * @param Suit Type
 * @desc 使用するスート(マーク)を選択します。
 * spade/club/heart/diamond カンマ(,)で区切ること
 * @default spade,heart,club,diamond
 *
 * @param Max Rank
 * @desc 使用する最大ランク(数字)を選択します。
 * 1 ~ 13 
 * @default 13
 * @type number
 *
 * @param Number Of Joker
 * @desc 使用するジョーカーの数を選択します。
 * 0 ~ 2
 * @default 1
 * @type number
 *
 * @param Player Number
 * @desc ゲームに参加する人数を設定します。
 * @default 4
 * @type number
 *
 * @param Hand Width
 * @desc 手札カードの表示幅を設定します。
 * @default 432
 * @type number
 *
 * @param Hand Height
 * @desc 手札カードの表示高さを設定します。
 * @default 180
 * @type number
 *
 * @param --画像の設定--
 * @default
 * 
 * @param Spade Images
 * @desc スペードのカード画像名を設定します。
 * @default 
 *
 * @param Culb Images
 * @desc クラブのカード画像名を設定します。
 * @default 
 *
 * @param Heart Images
 * @desc ハートのカード画像名を設定します。
 * @default 
 *
 * @param Diamond Images
 * @desc ダイヤのカード画像名を設定します。
 * @default 
 *
 * @param Back Image
 * @desc カードの裏面の画像を設定します。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Joker Image
 * @desc ジョーカーの画像を設定します。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Background Image
 * @desc 場の背景画像を設定します。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 以下のトランプゲームで遊べます。
 * 
 *    1. ババ抜き(2～4人まで)
 * 
 * 当プラグインは試作版です。
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. カードの画像を用意して、プラグインパラメータに設定してください。
 *    カード画像は、img/picturesフォルダに保存してください。
 * 
 *    ＜カード画像の形式＞
 *    1. 絵札および数札
 *        ***01.png のように個別に画像を用意します。
 *        *** はカードのスート(マーク)ごとに同じ文字列にしてください。
 *        01 の数字部は、カードのランク(数字)を二桁で記載してください。
 * 
 *    2. ジョーカーおよび裏面
 *        名前は自由に設定してください。
 * 
 *    ＜プラグインパラメータの設定方法＞
 *    1. 絵札および数札
 *        各スート毎に、用意した画像のファイル名を以下の形式で設定します。
 *        ***%1
 *          - ***は画像ファイルの文字列部分
 *    
 *    2. ジョーカーおよび裏面
 *        img/picturesフォルダから選択できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 遊び方
 *-----------------------------------------------------------------------------
 * 1. プレイヤーの設定
 * 
 * CRD_プレイヤー設定 [プレイヤー1] [プレイヤー2] ...
 * CRD_SETTING_PLAYER [player1] [player2] ...
 * 
 * ゲームに参加するプレイヤーを設定します。
 * アクターIDを設定してください。(最大4人まで)
 * -1 を設定すると、パーティーのリーダーキャラになります。
 * プレイヤー1が操作キャラになります。
 * 
 * 
 * 2. ゲーム画面の表示
 * 
 * CRD_カードゲーム表示
 * CRD_OPEN_CARDGAME
 * 
 * ゲーム画面を表示して、ゲームを開始します。
 * 最後の一人になるまでプレイできます。
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
 * v0.7.5 - 2017/07/01 : 機能追加
 *    1. プレイヤー設定機能を追加
 *    2. プレイヤーの名前と顔画像を表示する機能を追加。
 *    3. 最後の一人になるまでゲームを続けるように変更。
 *    4. カード選択時に、非選択のカードを透明にするように変更。
 * 
 * v0.7.0 - 2017/07/01 : 試作作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_CardGames');

    FTKR.CRD = {
        basic:{
            number     :Number(parameters['Player Number'] || 2).clamp(2,4),
            suit       :String(parameters['Suit Type'] || 'spade,club,heart,diamond'),
            rank       :Number(parameters['Max Rank'] || 13).clamp(1,13),
            joker      :Number(parameters['Number Of Joker'] || 1).clamp(0,2),
            width      :Number(parameters['Hand Width'] || 500),
            height     :Number(parameters['Hand Height'] || 200),
        },
        image:{
            spade      :String(parameters['Spade Images'] || ''),
            club       :String(parameters['Culb Images'] || ''),
            heart      :String(parameters['Heart Images'] || ''),
            diamond    :String(parameters['Diamond Images'] || ''),
            joker      :String(parameters['Joker Image'] || ''),
            back       :String(parameters['Back Image'] || ''),
            background :String(parameters['Background Image'] || ''),
        },
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgStr = function(arg) {
        return convertEscapeCharacters(arg);
    };

    var setArgNum = function(arg) {
        try {
            return Number(eval(setArgStr(arg)));
        } catch (e) {
            return 0;
        }
    };

    var shuffle = function(array) {
        var count = array.length, suit, rank, i;
        while (count) {
            i = Math.floor(Math.random() * count--);
            suit = array[count].suit;
            rank = array[count].rank;
            array[count].suit = array[i].suit;
            array[count].rank = array[i].rank;
            array[i] = {suit:suit, rank:rank};
        }
        return array;
    }

    //=============================================================================
    // DataManager
    //=============================================================================

    //カードゲーム設定用データクラスを登録
    var _CRD_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _CRD_DataManager_createGameObjects.call(this);
        $gameCardData = new Game_CardData();
    };

    //画像ファイルの事前ロード
    var  _CRD_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function(name, src) {
        _CRD_DataManager_loadDatabase.call(this, name, src);
        this.loadCardImages();
    };

    DataManager.loadCardImages = function() {
        ['spade', 'club', 'heart', 'diamond'].forEach( function(suit) {
            for( var i = 1; i < 14; i++) {
                ImageManager.loadPicture(FTKR.CRD.image[suit].format(i.padZero(2)));
            }
        });
        ImageManager.loadPicture(FTKR.CRD.image.back);
        ImageManager.loadPicture(FTKR.CRD.image.joker);
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _CRD_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _CRD_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/CRD_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'カードゲーム表示':
            case 'OPEN_CARDGAME':
                SceneManager.push(Scene_CRD);
                break;
            case 'プレイヤー設定':
            case 'SETTING_PLAYER':
                $gameCardData.resetPlayer();
                args.forEach( function(arg, i) {
                    if (i >= 4) return;
                    $gameCardData.addPlayer(setArgNum(arg));
                });
                break;
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _CRD_Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _CRD_Game_Actor_setup.call(this, actorId);
        ImageManager.loadFace(this.faceName());
    };

    //=============================================================================
    // Game_CardData
    // カードゲーム設定用データ
    //=============================================================================

    function Game_CardData() {
        this.initialize.apply(this, arguments);
    }

    Game_CardData.prototype.initialize = function() {
        this._players = [];
        this._suits = FTKR.CRD.basic.suit.split(',');
        this._maxRank = FTKR.CRD.basic.rank;
        this._joker = FTKR.CRD.basic.joker;
    };

    //プレイヤーの設定
    Game_CardData.prototype.players = function() {
        return this._players;
    };
    
    Game_CardData.prototype.playerNum = function() {
        return this._players.length;
    };

    Game_CardData.prototype.player = function(id) {
        return this._players[id];
    };

    Game_CardData.prototype.resetPlayer = function() {
        this._players = [];
    };

    Game_CardData.prototype.addPlayer = function(actorId) {
        this._players.push(actorId);
    };

    //スートの設定
    Game_CardData.prototype.suits = function() {
        return this._suits;
    };

    Game_CardData.prototype.resetSuits = function() {
        this._suits = FTKR.CRD.basic.suit.split(',');
    };

    Game_CardData.prototype.setSuits = function(suits) {
        this._suits = suits;
    };

    //ランクの設定
    Game_CardData.prototype.maxRank = function() {
        return this._maxRank;
    };

    Game_CardData.prototype.resetMaxRank = function() {
        this._maxRank = FTKR.CRD.basic.rank;
    };

    Game_CardData.prototype.setMaxRank = function(maxRank) {
        this._maxRank = maxRank;
    };

    //ジョーカーの設定
    Game_CardData.prototype.joker = function() {
        return this._joker;
    };

    Game_CardData.prototype.resetJoker = function() {
        this._joker = FTKR.CRD.basic.joker;
    };

    Game_CardData.prototype.setJoker = function(joker) {
        this._joker = joker;
    };

    //=============================================================================
    // Scene_CRD
    // カードゲームシーン
    //=============================================================================

    function Scene_CRD() {
        this.initialize.apply(this, arguments);
    }

    Scene_CRD.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CRD.prototype.constructor = Scene_CRD;

    Scene_CRD.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._handNum = FTKR.CRD.basic.number;
        this._gameEnd = false;
        this._endPeople = 0;
    };

    Scene_CRD.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = FTKR.CRD.image.background;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadPicture(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_CRD.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.setPlayer();
        this.createAllWindows();
        this.settingGame();
        this.setRoute();
        this.setSubjectId(0);
        this.setPlayerName();
        this.targetWindow().activate();
        this.targetWindow().select(0);
    };

    Scene_CRD.prototype.setRoute = function() {
        this._route = [];
        this._players.forEach( function(player, i){
            var n = i + 1;
            if (n >= $gameCardData.playerNum()) n = 0;
            this._route.push(n);
        },this);
    };

    Scene_CRD.prototype.setSubjectId = function(id) {
        this._subjectId = 0;
        this.setIndex();
    };

    Scene_CRD.prototype.shiftSubject = function() {
        this._subjectId += 1;
        if (this._subjectId >= $gameCardData.playerNum()) this._subjectId = 0;
        this.setIndex();
    };

    Scene_CRD.prototype.setIndex = function() {
        this._index = this._route[this._subjectId];
    };

    Scene_CRD.prototype.createAllWindows = function() {
        this.createDummyWindow();
        this.createHandWindows();
        this.createActorWindows();
        this.createMessageBoxWindow();
    };

    Scene_CRD.prototype.settingGame = function() {
        this.makeStock();
        this.stockShuffle();
        this.deal(-1);
        this.discardPair();
        if (this.checkGameEnd()) return;
    };

    Scene_CRD.prototype.player = function(id) {
        return this._players[id];
    };

    Scene_CRD.prototype.setPlayer = function() {
        this._players = [];
        $gameCardData.players().forEach(function(actorId){
            var actor = actorId === -1 ? 
                $gameParty.leader() :
                $gameActors.actor(actorId);
            this._players.push(actor);
        },this);
    };
    Scene_CRD.prototype.setPlayerName = function() {
        var name = this.player(this.subjectId()).name();
        this._messageBoxWindow.setPlayer(name);
    };

    Scene_CRD.prototype.stock = function() {
        return this._stock;
    };

    Scene_CRD.prototype.stockNum = function() {
        return this._stock.length;
    }

    Scene_CRD.prototype.handNum = function() {
        return this._handNum;
    };

    Scene_CRD.prototype.deal = function(dealNum) {
        var i = 0, num = this.stockNum();
        for (var n = 0; n < num; n++) {
            this._index = i;
            var hand = this.stock().shift();
            this.targetWindow().addHand(hand.suit, hand.rank);
            i++;
            if (i >= this.handNum()) i = 0;
        }
    };

    Scene_CRD.prototype.discardPair = function() {
        this._handWindows.forEach( function(window) {
            window.discardPair();
            window.refreshHand();
        });
    };

    Scene_CRD.prototype.makeStock = function() {
        var suitTypes = $gameCardData.suits();
        var maxRank = $gameCardData.maxRank();
        var jokerNum = $gameCardData.joker();
        this._stock = [];
        suitTypes.forEach( function(suit){
            for (var r = 1; r < maxRank + 1; r++) {
                this._stock.push({suit:suit, rank:r});
            }
        },this);
        for (var i = 0; i < jokerNum; i++) {
            this._stock.push({suit:'joker', rank:0});
        }
    };

    Scene_CRD.prototype.gameEnd = function() {
        this._gameEnd = true;
    };

    Scene_CRD.prototype.isGameEnd = function() {
        return this._gameEnd;
    };

    Scene_CRD.prototype.stockShuffle = function() {
        this._stock = shuffle(this._stock);
    };

    Scene_CRD.prototype.targetWindow = function() {
        return this._handWindows[this._index];
    };

    Scene_CRD.prototype.subjectWindow = function() {
        return this._handWindows[this._subjectId];
    };

    Scene_CRD.prototype.createDummyWindow = function() {
        this._dummyWindow = new Window_Base(0, 0, 0, 0);
        this.addWindow(this._dummyWindow);
    };

    Scene_CRD.prototype.index = function() {
        return this._index;
    };

    Scene_CRD.prototype.subjectId = function() {
        return this._subjectId;
    };

    Scene_CRD.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
    };

    Scene_CRD.prototype.createHandWindows = function() {
        this._handWindows = [];
        var number = $gameCardData.playerNum();
        this.createHandWindow1();
        if (number > 1) this.createHandWindow2();
        if (number > 2) this.createHandWindow3();
        if (number > 3) this.createHandWindow4();
    };

    Scene_CRD.prototype.createHandWindow1 = function() {
        var ww = FTKR.CRD.basic.width;
        var wh = FTKR.CRD.basic.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = Graphics.boxHeight - wh;
        this._handWindows[0] = new Window_PlayerHand(wx, wy, ww, wh, true);
        this._handWindows[0].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[0]);
    };

    Scene_CRD.prototype.createHandWindow2 = function() {
        var ww = FTKR.CRD.basic.width;
        var wh = FTKR.CRD.basic.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = 0;
        this._handWindows[1] = new Window_PlayerHand(wx, wy, ww, wh, false);
        this._handWindows[1].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[1]);
    };

    Scene_CRD.prototype.createHandWindow3 = function() {
        var wh = FTKR.CRD.basic.width;
        var ww = FTKR.CRD.basic.height;
        var wx = 0;
        var wy = (Graphics.boxHeight - wh) / 2;
        this._handWindows[2] = new Window_PlayerHandVar(wx, wy, ww, wh, false);
        this._handWindows[2].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[2]);
    };

    Scene_CRD.prototype.createHandWindow4 = function() {
        var wh = FTKR.CRD.basic.width;
        var ww = FTKR.CRD.basic.height;
        var wx = Graphics.boxWidth - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        this._handWindows[3] = new Window_PlayerHandVar(wx, wy, ww, wh, false);
        this._handWindows[3].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[3]);
    };

    Scene_CRD.prototype.createActorWindows = function() {
        this._actorWindows = [];
        var number = $gameCardData.playerNum();
        this.createActorWindow1();
        if (number > 1) this.createActorWindow2();
        if (number > 2) this.createActorWindow3();
        if (number > 3) this.createActorWindow4();
    };

    Scene_CRD.prototype.createActorWindow1 = function() {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = this._handWindows[0].y - wh;
        var actor = this.player(0);
        this._actorWindows[0] = new Window_PlayerStatus(actor, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[0]);
    };

    Scene_CRD.prototype.createActorWindow2 = function() {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = this._handWindows[1].y + this._handWindows[1].height;
        var actor = this.player(1);
        this._actorWindows[1] = new Window_PlayerStatus(actor, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[1]);
    };

    Scene_CRD.prototype.createActorWindow3 = function() {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2+ this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[2].x + this._handWindows[2].width;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(2);
        this._actorWindows[2] = new Window_PlayerStatus(actor, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[2]);
    };

    Scene_CRD.prototype.createActorWindow4 = function() {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2+ this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[3].x - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(3);
        this._actorWindows[3] = new Window_PlayerStatus(actor, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[3]);
    };

    Scene_CRD.prototype.createMessageBoxWindow = function() {
        this._messageBoxWindow = new Window_MessageBox();
        this._messageBoxWindow.setHandler('ok',     this.onMessageOk.bind(this));
        this._messageBoxWindow.setHandler('cancel',     this.onMessageOk.bind(this));
        this.addWindow(this._messageBoxWindow);
    };

    Scene_CRD.prototype.shiftIndex = function() {
        do {
            this.shiftSubject();
            if (!this.targetWindow().cardNum()) {
                this.refreshRoute(this._subjectId);
                this.setIndex();
            }
        } while (!this.subjectWindow().cardNum());
    };

    Scene_CRD.prototype.remainingNum = function() {
        return this._handWindows.filter( function(window, i){
            return window._hand.length;
        },this).length
    };

    Scene_CRD.prototype.checkGameEnd = function() {
        if (this.remainingNum() === 1) {
            this.gameEnd();
            this._messageBoxWindow.setGameEnd();
            this._messageBoxWindow.activate();
            return true;
        }
    };

    Scene_CRD.prototype.onSelectOk = function() {
        var hand = this.reduceHand(this.index(), true);
        this.addHand(this.subjectId(), hand);
        if (this.checkGameEnd()) return;
        this.targetWindow().deselect();
        this.shiftIndex();
        this.setPlayerName();
        this._messageBoxWindow.activate();
    };

    Scene_CRD.prototype.onMessageOk = function() {
        if (this.isGameEnd()) {
            this.popScene();
        } else {
            var hand = this.reduceHand(this.index(), false);
            this.addHand(this.subjectId(), hand);
            if (this.checkGameEnd()) return;
            this.shiftIndex();
            this.setPlayerName();
            if (this._subjectId === 0) {
                this.targetWindow().activate();
                this.targetWindow().select(0);
            } else {
                this._messageBoxWindow.activate();
            }
        }
    };

    Scene_CRD.prototype.addHand = function(index, hand) {
        var window = this._handWindows[index];
        window.addHand(hand.suit, hand.rank);
        window.discardPair();
        window.refreshHand();
        if (!window.cardNum()) {
            this._endPeople++;
            this._actorWindows[index].setRank(this._endPeople);
        }
        window.deselect();
    };

    Scene_CRD.prototype.reduceHand = function(index, isPlayer) {
        var window = this._handWindows[index];
        var handIndex = isPlayer ? window.index() :
            Math.floor(Math.randomInt(window._hand.length));
        var hand = window.reduceHand(handIndex);
        if (!window.cardNum()) {
            this._endPeople++;
            this._actorWindows[index].setRank(this._endPeople);
            this.refreshRoute(index);
        }
        return hand;
    };

    Scene_CRD.prototype.refreshRoute = function(index) {
        do {
            this._route[index] += 1;
            if (this._route[index] >= $gameCardData.playerNum()) this._route[index] = 0;
        } while (!this._handWindows[this._route[index]].cardNum());
    };

    //=============================================================================
    // Window_PlayerHand
    // 手札ウィンドウ
    //=============================================================================

    function Window_PlayerHand() {
        this.initialize.apply(this, arguments);
    }

    Window_PlayerHand.prototype = Object.create(Window_Selectable.prototype);
    Window_PlayerHand.prototype.constructor = Window_PlayerHand;

    Window_PlayerHand.prototype.initialize = function(x, y, width, height, isPlayer) {
        this._hand = [];
        this._sprites = [];
        this._isPlayer = isPlayer;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setCardSize();
        this.refresh();
    };

    Window_PlayerHand.prototype.cardScale = function() {
        var iw = this.standardCardWidth();
        var ih = this.standardCardHeight();
        return this.width > this.height ? 
            Math.min((this.height - this.standardPadding() * 2) / ih, 1) :
            Math.min((this.width - this.standardPadding() * 2) / iw, 1);
    };

    Window_PlayerHand.prototype.setCardSize = function() {
        this._cardWidth = this.standardCardWidth() * this.cardScale();
        this._cardHeight = this.standardCardHeight() * this.cardScale();
    };

    Window_Base.prototype.standardCardWidth = function() {
        return ImageManager.loadPicture(FTKR.CRD.image.joker).width;
    };

    Window_Base.prototype.standardCardHeight = function() {
        return ImageManager.loadPicture(FTKR.CRD.image.joker).height;
    };

    Window_PlayerHand.prototype.itemWidth = function() {
        return this._cardWidth;
    };

    Window_PlayerHand.prototype.spacing = function() {
        return this.maxCols() > 1 ? 
            Math.floor((this.contentsWidth() -
                          this.itemWidth() * this.maxCols()) / (this.maxCols() - 1)) : 0;
    };

    Window_PlayerHand.prototype.itemHeight = function() {
        return this._cardHeight;
    };

    Window_PlayerHand.prototype.cardNum = function() {
        return this._hand.length;
    };

    Window_PlayerHand.prototype.maxCols = function() {
        return this.cardNum();
    };

    Window_PlayerHand.prototype.maxItems = function() {
        return this.cardNum();
    };

    Window_PlayerHand.prototype.drawItem = function(index) {
        var card = this._hand[index];
        if (!card) return;
        var rect = this.itemRect(index);
        this.drawCardImage(index, rect.x, rect.y, this._isPlayer, card.suit, card.rank);
    };

    Window_PlayerHand.prototype.addHand = function(suit, rank) {
        this._hand.push({suit:suit, rank:rank});
        this.refreshHand();
    };

    Window_PlayerHand.prototype.reduceHand = function(index) {
        var hand = this._hand[index];
        this._hand.splice(index, 1);
        this.refreshHand();
        return hand;
    };

    Window_PlayerHand.prototype.discardPair = function() {
        var count = this._hand.length, i = 0;
        while (count) {
            if (!this._hand.length || this._hand.length <= i) break;
            var rank = this._hand[i].rank;
            if (!this._hand.some( function(hand, n){
                if (hand && i !== n && hand.rank === rank) {
                    this._hand.splice(n, 1);
                    this._hand.splice(i, 1);
                    return true;
                }
            },this)) i++;
            count--;
        };
    };

    Window_PlayerHand.prototype.refreshHand = function() {
        this.resetWindowSize();
        this.createContents();
        this.resetScroll();
        this.refresh();
    };

    Window_PlayerHand.prototype.resetWindowSize = function() {
        var width =  this.itemWidth() * this.maxCols() + this.standardPadding() * 2;
        width = Math.min(width, FTKR.CRD.basic.width);
        var x = (Graphics.boxWidth - width) / 2;
        this.move(x, this.y, width, this.height);
    };

    Window_PlayerHand.prototype.contentsWidth = function() {
        var width = this.width - this.standardPadding() * 2;
        var len = this.itemWidth() * this.maxCols();
        return Math.min(width, len);
    };

    Window_PlayerHand.prototype.contentsHeight = function() {
        var height = this.height - this.standardPadding() * 2;
        var len = this.itemHeight();
        return Math.min(height, len);
    };

    Window_PlayerHand.prototype.drawCardImage = function(index, dx, dy, front, suit, rank) {
        var cade = front ? FTKR.CRD.image[suit].format(rank.padZero(2)) : FTKR.CRD.image.back;
        if (!this._sprites[index]) {
            this._sprites[index] = new Sprite();
            this.addChild(this._sprites[index]);
        }
        var bitmap = ImageManager.loadPicture(cade);
        this._sprites[index].bitmap = bitmap;
        this._sprites[index].x = dx + this.padding;
        this._sprites[index].y = dy + this.padding;
        this._sprites[index].scale.x = this.cardScale();
        this._sprites[index].scale.y = this.cardScale();
        this._sprites[index].opacity = 255;
    };

    Window_PlayerHand.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();
            if (this.cardNum() < this._sprites.length) {
                for (var i = this.cardNum(); i < this._sprites.length; i++) {
                    this._sprites[i].bitmap = null;
                }
            }
        }
    };

    Window_PlayerHand.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (index >= 0 && index === this.index()) {
            this.refresh();
            this._sprites.forEach( function(sprite, i){
                if (i !== index) sprite.opacity = 100;
            });
        }
    };

    Window_PlayerHand.prototype.standardBackOpacity = function() {
        return 0
    };

    Window_PlayerHand.prototype._refreshFrame = function() {
    };

    //=============================================================================
    // Window_PlayerHandVar
    // 手札ウィンドウ
    //=============================================================================

    function Window_PlayerHandVar() {
        this.initialize.apply(this, arguments);
    }

    Window_PlayerHandVar.prototype = Object.create(Window_PlayerHand.prototype);
    Window_PlayerHandVar.prototype.constructor = Window_PlayerHandVar;

    Window_PlayerHandVar.prototype.maxCols = function() {
        return 1;
    };

    Window_PlayerHandVar.prototype.maxPageRows = function() {
        return this.cardNum();
    };

    Window_PlayerHandVar.prototype.contentsWidth = function() {
        var width = this.width - this.standardPadding() * 2;
        var len = this.itemWidth();
        return Math.min(width, len);
    };

    Window_PlayerHandVar.prototype.contentsHeight = function() {
        var height = this.height - this.standardPadding() * 2;
        var len = this.itemHeight() * this.cardNum();
        return Math.min(height, len);
    };

    Window_PlayerHandVar.prototype.hspacing = function() {
        return this.cardNum() > 1 ? 
            Math.floor((this.contentsHeight() -
                          this.itemHeight() * this.cardNum()) / (this.cardNum() - 1)) : 0;
    };

    Window_PlayerHandVar.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
        rect.y = Math.floor(index / maxCols) * (rect.height + this.hspacing()) - this._scrollY;
        return rect;
    };

    Window_PlayerHandVar.prototype.cardScale = function() {
        var ih = this.standardCardWidth();
        var iw = this.standardCardHeight();
        return this.width > this.height ? 
            Math.min((this.height - this.standardPadding() * 2) / ih, 1) :
            Math.min((this.width - this.standardPadding() * 2) / iw, 1);
    };

    Window_PlayerHandVar.prototype.setCardSize = function() {
        this._cardWidth = this.standardCardHeight() * this.cardScale();
        this._cardHeight = this.standardCardWidth() * this.cardScale();
    };

    Window_PlayerHandVar.prototype.resetWindowSize = function() {
        var height =  this.itemHeight() * this.maxItems() + this.standardPadding() * 2;
        height = Math.min(height, FTKR.CRD.basic.width);
        var y = (Graphics.boxHeight - height) / 2;
        this.move(this.x, y, this.width, height);
    };

    Window_PlayerHandVar.prototype.drawCardImage = function(index, dx, dy, front, suit, rank) {
        var cade = front ? FTKR.CRD.image[suit].format(rank.padZero(2)) : FTKR.CRD.image.back;
        if (!this._sprites[index]) {
            this._sprites[index] = new Sprite();
            this.addChild(this._sprites[index]);
        }
        var bitmap = ImageManager.loadPicture(cade);
        this._sprites[index].bitmap = bitmap;
        this._sprites[index].x = dx + this.padding + this.itemWidth();
        this._sprites[index].y = dy + this.padding;
        this._sprites[index].scale.x = this.cardScale();
        this._sprites[index].scale.y = this.cardScale();
        this._sprites[index].opacity = 255;
        this._sprites[index].rotation = Math.PI / 2;
    };

    //=============================================================================
    // Window_PlayerStatus
    // プレイヤーステータス
    //=============================================================================

    function Window_PlayerStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_PlayerStatus.prototype = Object.create(Window_Base.prototype);
    Window_PlayerStatus.prototype.constructor = Window_PlayerStatus;

    Window_PlayerStatus.prototype.initialize = function(actor, wx, wy, ww, wh) {
        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this._actor = actor;
        this._rank = 0;
        this.refresh();
    };

    Window_PlayerStatus.prototype.setRank = function(rank) {
        this._rank = rank;
        this.refresh();
    };

    Window_PlayerStatus.prototype.refresh = function() {
        if(this.contents) {
            this.contents.clear();
            var width = this.width - this.padding * 2;
            var x = 0, y = 0;
            if (this.width > this.height) {
                width /= 2;
                x += width;
            } else {
                y += width;
            }
            this.drawActorFace(this._actor, 0, 0, width);
            this.drawText(this._actor.name(), x, y, width, 'center');
            this.drawText(this.rank(), x, y + this.lineHeight(), width, 'center');
        }
    };

    Window_PlayerStatus.prototype.rank = function() {
        switch (this._rank) {
            case 1:
                return '一位';
            case 2:
                return '二位';
            case 3:
                return '三位';
            default:
                return '';
        }
    };

    Window_PlayerStatus.prototype.drawActorFace = function(actor, dx, dy, size) {
        var dh = size || Window_Base._faceHeight;
        var dw = size || Window_Base._faceWidth;
        var bitmap = ImageManager.reserveFace(actor.faceName());
        var sw = Window_Base._faceWidth;
        var sh = Window_Base._faceHeight;
        var sx = actor.faceIndex() % 4 * sw;
        var sy = Math.floor(actor.faceIndex() / 4) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };


    //=============================================================================
    // Window_MessageBox
    // メッセージボックス
    //=============================================================================

    function Window_MessageBox() {
        this.initialize.apply(this, arguments);
    }

    Window_MessageBox.prototype = Object.create(Window_Selectable.prototype);
    Window_MessageBox.prototype.constructor = Window_MessageBox;

    Window_MessageBox.prototype.initialize = function() {
        var ww = 240;
        var wh = 72;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = (Graphics.boxHeight - wh) / 2;
        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    };

    Window_MessageBox.prototype.setPlayer = function(player) {
        this._player = player;
        this.refresh();
    };

    Window_MessageBox.prototype.setGameEnd = function(player) {
        this._player = player;
        this.contents.clear();
        var text = 'ゲーム終了です';
        this.drawText(text, 0, 0, this.width - this.padding * 2, 'center');
    };

    Window_MessageBox.prototype.refresh = function() {
        if(this._player) {
            this.contents.clear();
            var text = this._player + 'のターンです';
            this.drawText(text, 0, 0, this.width - this.padding * 2, 'center');
        }
    };

}());//EOF
