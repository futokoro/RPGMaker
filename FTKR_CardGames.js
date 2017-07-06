//=============================================================================
// トランプカードゲームプラグイン
// FTKR_CardGames.js
// 作成者     : フトコロ
// 作成日     : 2017/07/02
// 最終更新日 : 2017/07/06
// バージョン : v0.9.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_Card = true;

var FTKR = FTKR || {};
FTKR.CRD = FTKR.CRD || {};

//=============================================================================
/*:
 * @plugindesc v0.9.0 トランプカードゲーム
 * @author フトコロ
 *
 * @param --カードの設定--
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
 * @param --ゲームの設定--
 * @default
 * 
 * @param Number Of Jokers
 * @desc 使用するジョーカーの数を選択します。
 * 0 ~ 2
 * @default 1
 * @type number
 *
 * @param Number Of Players
 * @desc ゲームに参加する人数を設定します。
 * @default 4
 * @type number
 *
 * @param Number Of Games
 * @desc ゲーム数を設定します。
 * @default 1
 * @type number
 *
 * @param Ranking Points
 * @desc ゲームの勝敗の結果で取得するポイントを設定します。
 * カンマ(,)で区切って、1位から4位まで設定してください。
 * @default 2,1,-1,-2
 *
 * @param --画面レイアウト--
 * @default
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
 * @param --勝敗結果の取得--
 * @default
 * 
 * @param Reset Variables
 * @desc ゲーム画面表示時に、指定した変数に 0 を代入します。
 * 0 - 無効、1 - 有効
 * @default 1
 * @type number
 *
 * @param Player 1 Result
 * @desc プレイヤー１の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 2 Result
 * @desc プレイヤー２の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 3 Result
 * @desc プレイヤー３の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 4 Result
 * @desc プレイヤー４の結果を指定した変数に格納します。
 * @default 
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
 * @param --デバッグ用--
 * @default
 * 
 * @param Open Card Mode
 * @desc すべてのカードを表にした状態でゲームを行います。
 * 0 - 無効にする, 1 - 有効にする
 * @default 0
 * @type number
 *
 * @requiredAssets img/pictures/s01
 * @requiredAssets img/pictures/s02
 * @requiredAssets img/pictures/s03
 * @requiredAssets img/pictures/s04
 * @requiredAssets img/pictures/s05
 * @requiredAssets img/pictures/s06
 * @requiredAssets img/pictures/s07
 * @requiredAssets img/pictures/s08
 * @requiredAssets img/pictures/s09
 * @requiredAssets img/pictures/s10
 * @requiredAssets img/pictures/s11
 * @requiredAssets img/pictures/s12
 * @requiredAssets img/pictures/s13
 * @requiredAssets img/pictures/c01
 * @requiredAssets img/pictures/c02
 * @requiredAssets img/pictures/c03
 * @requiredAssets img/pictures/c04
 * @requiredAssets img/pictures/c05
 * @requiredAssets img/pictures/c06
 * @requiredAssets img/pictures/c07
 * @requiredAssets img/pictures/c08
 * @requiredAssets img/pictures/c09
 * @requiredAssets img/pictures/c10
 * @requiredAssets img/pictures/c11
 * @requiredAssets img/pictures/c12
 * @requiredAssets img/pictures/c13
 * @requiredAssets img/pictures/h01
 * @requiredAssets img/pictures/h02
 * @requiredAssets img/pictures/h03
 * @requiredAssets img/pictures/h04
 * @requiredAssets img/pictures/h05
 * @requiredAssets img/pictures/h06
 * @requiredAssets img/pictures/h07
 * @requiredAssets img/pictures/h08
 * @requiredAssets img/pictures/h09
 * @requiredAssets img/pictures/h10
 * @requiredAssets img/pictures/h11
 * @requiredAssets img/pictures/h12
 * @requiredAssets img/pictures/h13
 * @requiredAssets img/pictures/d01
 * @requiredAssets img/pictures/d02
 * @requiredAssets img/pictures/d03
 * @requiredAssets img/pictures/d04
 * @requiredAssets img/pictures/d05
 * @requiredAssets img/pictures/d06
 * @requiredAssets img/pictures/d07
 * @requiredAssets img/pictures/d08
 * @requiredAssets img/pictures/d09
 * @requiredAssets img/pictures/d10
 * @requiredAssets img/pictures/d11
 * @requiredAssets img/pictures/d12
 * @requiredAssets img/pictures/d13
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
 * 3. ディプロイメント対応について
 *    ティプロイメントで、「未使用ファイルを含まない」を有効にする場合は
 *    絵札および数札のファイル名を、以下にしてください。
 * 
 *    スペード : s01.png ~ s13.png
 *    クラブ　 : c01.png ~ c13.png
 *    ハート　 : h01.png ~ h13.png
 *    ダイヤ　 : d01.png ~ d13.png
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
 * 2. ゲーム数の設定
 * 　1セット内で行うゲーム数を設定します。
 * 　プラグインコマンドの設定は、プラグインパラメータの設定を上書きします。
 * 
 * プラグインパラメータで設定する
 * 　<Number Of Games>
 * 
 * プラグインコマンドで設定する
 * 　CRD_ゲーム数設定 [ゲーム数]
 *　 CRD_SETTING_GAMES [number of games]
 * 
 * 
 * 2. ゲームポイントの設定
 * 　1ゲームで、上がり順に取得するポイントを設定します。
 * 　各プレイヤーが取得したポイントは、プラグインパラメータで設定した
 * 　ゲーム内変数に保存します。
 * 　複数回のゲームを行うと、ポイントは加算していきます。
 * 
 * プラグインパラメータで設定する
 * 　<Ranking Points>
 * 
 * 
 * 3. ゲーム画面の表示
 * 
 * CRD_カードゲーム表示
 * CRD_OPEN_CARDGAME
 * 
 * ゲーム画面を表示して、ゲームを開始します。
 * 設定したゲームの回数の分、プレイすると元の画面に戻ります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プレイヤーの操作
 *-----------------------------------------------------------------------------
 * プレイヤー1は操作キャラとして、ゲームに参加します。
 * 
 * 相手からカードを引くときは、任意の場所にカーソルを合わせることで
 * 好きな位置のカードを引くことが出来ます。
 * 
 * また、引いたカードは手札の任意の場所にセットすることができます。
 * 
 * 後述のNPCの特徴により、手札の中の位置に重要になるため
 * 配置する場所を考えながらゲームを進めましょう。
 * 
 * 
 * <並び替えコマンドについて>
 * 引いたカードの配置を決めると、ターンを終了するか、並び替えをするか
 * 選択できます。
 * 
 * 並び替えコマンドを選択すると、再度手札にカーソルが移り
 * 手札の配置を変更することができます。
 * 
 * 手順は、位置を変えたいカードにカーソルを合わせて決定ボタンを押し
 * その後、移したい場所にカーソルを合わせて、決定ボタンを押します。
 * 
 * この時、同じ場所を選択すると、カードを突き出した状態にすることができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * NPCの特徴の設定
 *-----------------------------------------------------------------------------
 * プレイヤー1以外に設定されたアクターは、NPCとしてゲームに参加します。
 * 
 * この時、それぞれのアクターのメモ欄に以下のタグを記載することで
 * NPC時に特徴を設定することができます。
 * 
 * <CRD_特徴>
 * 内容: 確率
 * </CRD_特徴>
 * 
 * 確率は、1～10の値で、10％刻みで内容を実行する確率を設定できます。
 * 内容には以下の項目があります。
 * 
 * <カードの取り方に関する内容>
 * 
 * 1. 端を取る　　　　　 - 相手の手札の両端のカードから選びます
 * 2. 端を取らない　　　 - 相手の手札の両端のカードを選びません
 * 
 * 3. 中心を取る　　　　 - 相手の手札の中心のカードを選びます
 *                        (手札が偶数の場合は中心2枚から選ぶ)
 * 4. 中心を取らない　　 - 相手の手札の中心のカードを選びません
 *                        (手札が偶数の場合は中心2枚を選ばない)
 * 
 * 5. 右から取る　　　　 - 相手の手札の中心よりも右側のカードから選びます
 * 6. 左から取る　　　　 - 相手の手札の中心よりも左側のカードから選びます
 * 
 * 7. 突き出しを取る　　 - 相手の手札で突き出しているカードを選びます
 * 8. 突き出しを取らない - 相手の手札で突き出しているカードを選びません
 * 
 * 
 * <取ったカードの並べ方に関する内容>
 * 
 * 1. 端に入れる　　　　 - 自分の手札の両端のどちらかに入れます
 * 2. 端に入れない　　　 - 自分の手札の両端には入れません
 * 
 * 3. 中心に入れる　　　 - 自分の手札の中心に入れます
 * 4. 中心に入れない　　 - 自分の手札の中心には入れません
 * 
 * 5. 右に入れる　　　　 - 自分の手札の中心よりも右側に入れます
 * 6. 左に入れる　　　　 - 自分の手札の中心よりも左側に入れます
 * 
 * 
 * <手札カードの突き出しに関する内容>
 * 
 * 1. ジョーカーを突き出す　　 - 手札にジョーカーが有る場合、突き出します
 * 2. ジョーカー以外を突き出す - 手札のジョーカー以外のカードを、突き出します
 * 
 * 
 * <一時的な表情の変化に関する内容>
 * ※この変化は自分のターンが終わると解除されます
 * 
 * 1. ジョーカーを引く(x)　　 - ジョーカーを引いた時に顔画像をx番に変えます
 * 2. ジョーカー以外を引く(x) - ジョーカー以外を引いた時に顔画像をx番に変えます
 * 3. ペアができた(x)　　　　 - ペアができた時に顔画像をx番に変えます
 * 4. ペアができない(x)　　　 - ペアができなかった時に顔画像をx番に変えます
 * 
 * 
 * <常時変化する表情に関する内容>
 * 
 * 1. ジョーカーを持っている(x)　 - ジョーカーを持っている間、顔画像をx番に変えます
 * 2. ジョーカーを持っていない(x) - ジョーカーを持っていない間、顔画像をx番に変えます
 * 
 * 
 * 特徴は複数設定することができます。
 * 複数の特徴がある場合は、上から順番に内容を処理します。
 * 
 * 例)
 * <CRD_特徴>
 * 端から取る: 7
 * 右から取る: 10
 * </CRD_特徴>
 * 
 * この場合、NPCのカードの取り方は以下の様になります。
 * まず、相手の端のカードを取るかどうか判定します。
 * 判定に成功すると、カードを取る対象が２枚に絞られますが
 * 失敗すると、対象はすべてのカードになります。
 * 
 * その後、対象の中の右側に絞ります。(２番目の内容を処理)
 * 「端から取る」に成功している場合、対象は２枚しかないため、
 * その右側、つまり相手の手札の右端のカードが最終的に選ばれます。
 * 失敗している場合は、相手の手札の右側の中からランダムで選ばれます。
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
 * v0.9.0 - 2017/07/06 : 機能追加
 *    1. カードを引いたときに任意の場所にセットする機能を追加。
 *    2. 手札の並び替え機能を追加。
 *    3. NPCに特徴を設定する機能を追加。
 * 
 * v0.8.0 - 2017/07/03 : 機能追加、プラグインパラメータ名変更
 *    1. ディプロイメントの「未使用ファイル」に対応する機能を追加。
 *    2. ゲーム数を設定する機能を追加。
 *    3. 上がり順でポイントを取得し、画面に表示する機能を追加。
 *    4. 上がりポイントをゲーム内変数に格納する機能を追加。
 *    5. 一部のプラグインパラメータ名を変更。
 *    6. 上がり順位を四位も表示するように変更。
 * 
 * v0.7.5 - 2017/07/02 : 機能追加
 *    1. プレイヤー設定機能を追加
 *    2. プレイヤーの名前と顔画像を表示する機能を追加。
 *    3. 最後の一人になるまでゲームを続けるように変更。
 *    4. カード選択時に、非選択のカードを透明にするように変更。
 * 
 * v0.7.0 - 2017/07/02 : 試作作成
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
        card:{
            suit       :String(parameters['Suit Type'] || 'spade,club,heart,diamond'),
            rank       :Number(parameters['Max Rank'] || 13).clamp(1,13),
        },
        layout:{
            width      :Number(parameters['Hand Width'] || 500),
            height     :Number(parameters['Hand Height'] || 200),
        },
        game:{
            jokerNum   :Number(parameters['Number Of Jokers'] || 1).clamp(0,2),
            playerNum  :Number(parameters['Number Of Players'] || 2).clamp(2,4),
            gameNum    :Number(parameters['Number Of Games'] || 1),
            points     :String(parameters['Ranking Points'] || '2,1,-1,-2'),
        },
        result:{
            reset:Number(parameters['Reset Variables'] || 0),
            varId:[
                Number(parameters['Player 1 Result'] || 0),
                Number(parameters['Player 2 Result'] || 0),
                Number(parameters['Player 3 Result'] || 0),
                Number(parameters['Player 4 Result'] || 0),
            ],
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
        debug:{
            open       :Number(parameters['Open Card Mode'] || 0),
        }
    };

    //=============================================================================
    // 自作処理
    //=============================================================================

    var readEntrapmentCodeToText = function(obj, codeTitles) {
        notes = convertEntrapmentRegArray(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var text = '';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (testRegs(line, notes, 'start')) {
                setMode = 'read';
            } else if (testRegs(line, notes, 'end')) {
                setMode = 'none';
            } else if (setMode === 'read') {
                text += line + ';';
            }
        }
        return text;
    };

    var convertEntrapmentRegArray = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                start:new RegExp('<' + codeTitle + '>', 'i'),
                end:new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var testRegs = function(data, regs, prop) {
        return regs.some(function(reg) {
            return prop ? reg[prop].test(data) : reg.test(data);
        });
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

    var setArrNum = function(min, max) {
        var arr = [];
        for (var i = 0; i < max - min; i++) {
            arr[i] = min + i;
        }
        return arr;
    };

    var checkRate = function(rate) {
        return Math.randomInt(100) < rate * 10;
    };

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
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
    var _CRD_DataManager_loadDatabase = DataManager.loadDatabase;
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

    //アクターの特徴タグを読み取る
    DataManager.readCrdCharacteristics = function(obj) {
        var metaData = readEntrapmentCodeToText(obj, ['CRD_特徴']);
        var crdData = {
            draws : [],
            putins : [],
            pushouts : [],
            faces : [],
            dialogues : [],
        };
        var datas = metaData.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var match = /(.+)\((\d+)\):[ ]*(.+)/.exec(data);
            if (match) {
                switch (match[1].toUpperCase()) {
                    case 'ジョーカーを引く':
                        crdData.faces.push({type:Scene_CRD.FACE_DRAW_JOKER, index:Number(match[2]), rate:Number(match[3])});
                        break;
                    case 'ジョーカー以外を引く':
                        crdData.faces.push({type:Scene_CRD.FACE_DRAW_NOT_JOKER, index:Number(match[2]), rate:Number(match[3])});
                        break;
                    case 'ペアができた':
                        crdData.faces.push({type:Scene_CRD.FACE_MADE_PAIR, index:Number(match[2]), rate:Number(match[3])});
                        break;
                    case 'ペアができない':
                        crdData.faces.push({type:Scene_CRD.FACE_NOT_MADE_PAIR, index:Number(match[2]), rate:Number(match[3])});
                        break;
                    case 'ジョーカーを持っている':
                        crdData.faces.push({type:Scene_CRD.FACE_HAS_JOKER, index:Number(match[2]), rate:Number(match[3])});
                        break;
                    case 'ジョーカーを持っていない':
                        crdData.faces.push({type:Scene_CRD.FACE_NOT_HAS_JOKER, index:Number(match[2]), rate:Number(match[3])});
                        break;
                }
            } else {
                var match = /(.+):[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case '端を取る':
                        crdData.draws.push({type:Scene_CRD.DRAW_END, rate:Number(match[2])});
                        break;
                    case '端を取らない':
                        crdData.draws.push({type:Scene_CRD.NOT_DRAW_END, rate:Number(match[2])});
                        break;
                    case '中心を取る':
                        crdData.draws.push({type:Scene_CRD.DRAW_MIDDLE, rate:Number(match[2])});
                        break;
                    case '中心を取らない':
                        crdData.draws.push({type:Scene_CRD.NOT_DRAW_MIDDLE, rate:Number(match[2])});
                        break;
                    case '右から取る':
                        crdData.draws.push({type:Scene_CRD.DRAW_RIGHT, rate:Number(match[2])});
                        break;
                    case '左から取る':
                        crdData.draws.push({type:Scene_CRD.DRAW_LEFT, rate:Number(match[2])});
                        break;
                    case '突き出しを取る':
                        crdData.draws.push({type:Scene_CRD.DRAW_PICKUP, rate:Number(match[2])});
                        break;
                    case '突き出しを取らない':
                        crdData.draws.push({type:Scene_CRD.NOT_DRAW_PICKUP, rate:Number(match[2])});
                        break;
                    case '端に入れる':
                        crdData.putins.push({type:Scene_CRD.PUTIN_END, rate:Number(match[2])});
                        break;
                    case '端に入れない':
                        crdData.putins.push({type:Scene_CRD.NOT_PUTIN_END, rate:Number(match[2])});
                        break;
                    case '中心に入れる':
                        crdData.putins.push({type:Scene_CRD.PUTIN_MIDDLE, rate:Number(match[2])});
                        break;
                    case '中心に入れない':
                        crdData.putins.push({type:Scene_CRD.NOT_PUTIN_MIDDLE, rate:Number(match[2])});
                        break;
                    case '右に入れる':
                        crdData.putins.push({type:Scene_CRD.PUTIN_RIGHT, rate:Number(match[2])});
                        break;
                    case '左に入れる':
                        crdData.putins.push({type:Scene_CRD.PUTIN_LEFT, rate:Number(match[2])});
                        break;
                    case 'ジョーカーを突き出す':
                        crdData.pushouts.push({type:Scene_CRD.PUSHOUT_JOKER, rate:Number(match[2])});
                        break;
                    case 'ジョーカー以外を突き出す':
                        crdData.pushouts.push({type:Scene_CRD.PUSHOUT_NOT_JOKER, rate:Number(match[2])});
                        break;
                }
            }
        }
        return crdData;
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
            case 'ゲーム数設定':
            case 'SETTING_GAMES':
                $gameCardData.setGames(setArgNum(args[0]));
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
        this._charas = [];
        this._suits = FTKR.CRD.card.suit.split(',');
        this._maxRank = FTKR.CRD.card.rank;
        this._joker = FTKR.CRD.game.jokerNum;
        this._points = ('0,' + FTKR.CRD.game.points).split(',').num();
        this._games = FTKR.CRD.game.gameNum;
        this._playerPoints = [0,0,0,0];
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

    Game_CardData.prototype.chara = function(id) {
        return this._charas[id];
    };

    Game_CardData.prototype.setChara = function(id, chara) {
        this._charas[id] = chara;
    };

    //スートの設定
    Game_CardData.prototype.suits = function() {
        return this._suits;
    };

    Game_CardData.prototype.resetSuits = function() {
        this._suits = FTKR.CRD.card.suit.split(',');
    };

    Game_CardData.prototype.setSuits = function(suits) {
        this._suits = suits;
    };

    //ランクの設定
    Game_CardData.prototype.maxRank = function() {
        return this._maxRank;
    };

    Game_CardData.prototype.resetMaxRank = function() {
        this._maxRank = FTKR.CRD.card.rank;
    };

    Game_CardData.prototype.setMaxRank = function(maxRank) {
        this._maxRank = maxRank;
    };

    //ジョーカーの設定
    Game_CardData.prototype.joker = function() {
        return this._joker;
    };

    Game_CardData.prototype.resetJoker = function() {
        this._joker = FTKR.CRD.game.jokerNum;
    };

    Game_CardData.prototype.setJoker = function(joker) {
        this._joker = joker;
    };

    //勝敗ポイントの設定
    Game_CardData.prototype.point = function(rank) {
        return this._points[rank];
    };

    Game_CardData.prototype.resetPoints = function() {
        this._points = ('0,' + FTKR.CRD.game.points).split(',').num();
    };

    Game_CardData.prototype.setPoints = function(points) {
        this._points = points;
    };

    //ゲーム数の設定
    Game_CardData.prototype.games = function() {
        return this._games;
    };

    Game_CardData.prototype.resetGames = function() {
        this._games = FTKR.CRD.game.gameNum;
    };

    Game_CardData.prototype.setGames = function(games) {
        this._games = games;
    };

    //プレイヤーポイントの設定
    Game_CardData.prototype.playerPoint = function(index) {
        return this._playerPoints[index];
    };

    Game_CardData.prototype.resetPlayerPoints = function() {
        this._playerPoints = [0,0,0,0];
    };

    Game_CardData.prototype.addPlayerPoint = function(index, point) {
        this._playerPoints[index] += point;
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

    Scene_CRD.DRAW_END         = 1;
    Scene_CRD.NOT_DRAW_END     = 2;
    Scene_CRD.DRAW_MIDDLE      = 3;
    Scene_CRD.NOT_DRAW_MIDDLE  = 4;
    Scene_CRD.DRAW_RIGHT       = 5;
    Scene_CRD.DRAW_LEFT        = 6;
    Scene_CRD.DRAW_PICKUP      = 7;
    Scene_CRD.NOT_DRAW_PICKUP  = 8;

    Scene_CRD.PUTIN_END        = 21;
    Scene_CRD.NOT_PUTIN_END    = 22;
    Scene_CRD.PUTIN_MIDDLE     = 23;
    Scene_CRD.NOT_PUTIN_MIDDLE = 24;
    Scene_CRD.PUTIN_RIGHT      = 25;
    Scene_CRD.PUTIN_LEFT       = 26;

    Scene_CRD.PUSHOUT_JOKER     = 41;
    Scene_CRD.PUSHOUT_NOT_JOKER = 42;

    Scene_CRD.FACE_DRAW_JOKER     = 61;
    Scene_CRD.FACE_DRAW_NOT_JOKER = 62;
    Scene_CRD.FACE_MADE_PAIR      = 63;
    Scene_CRD.FACE_NOT_MADE_PAIR  = 64;

    Scene_CRD.FACE_HAS_JOKER      = 81;
    Scene_CRD.FACE_NOT_HAS_JOKER  = 82;

    Scene_CRD.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._handNum = FTKR.CRD.game.playerNum;
        this.clearGame();
        this.clearVariables();
        $gameCardData.resetPlayerPoints();
        this.setPlayerCharacteristics();
        this._setEnd = false;
        this._hand = null;
        this._pickup = false;
        this._gameCount = 1;
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
        this.setTarget();
    };

    Scene_CRD.prototype.shiftSubject = function() {
        this._subjectId += 1;
        if (this._subjectId >= $gameCardData.playerNum()) this._subjectId = 0;
        this.setTarget();
    };

    Scene_CRD.prototype.setTarget = function() {
        this._targetId = this._route[this._subjectId];
    };

    Scene_CRD.prototype.setPlayerCharacteristics = function() {
        $gameCardData.players().forEach( function(id, i){
            if (id === -1) id = $gameParty.leader().actorId();
            var actor = $dataActors[id];
            $gameCardData.setChara(i, DataManager.readCrdCharacteristics(actor));
        });
    };

    Scene_CRD.prototype.clearGame = function() {
        this._gameEnd = false;
        this._endPeople = 0;
    };

    Scene_CRD.prototype.clearVariables = function() {
        if (!FTKR.CRD.result.reset) return;
        FTKR.CRD.result.varId.forEach( function(varId){
            if (varId) $gameVariables.setValue(varId, 0);
        });
    };

    Scene_CRD.prototype.settingGame = function() {
        this.makeStock();
        this.stockShuffle();
        this.deal(-1);
        this.discardPair();
        if (this.checkGameEnd()) return;
        this.setRoute();
        this.setSubjectId(0);
        this.setPlayerName();
        this.targetWindow().activate();
        this.targetWindow().select(0);
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
            this._targetId = i;
            var hand = this.stock().shift();
            this.targetWindow().pushHand(hand.suit, hand.rank);
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

    Scene_CRD.prototype.setEnd = function() {
        this._setEnd = true;
    };

    Scene_CRD.prototype.isSetEnd = function() {
        return this._setEnd;
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
        return this._handWindows[this._targetId];
    };

    Scene_CRD.prototype.subjectWindow = function() {
        return this._handWindows[this._subjectId];
    };

    Scene_CRD.prototype.targetId = function() {
        return this._targetId;
    };

    Scene_CRD.prototype.subjectId = function() {
        return this._subjectId;
    };

    Scene_CRD.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
    };

    Scene_CRD.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.setPlayer();
        this.createAllWindows();
        this.settingGame();
    };

    Scene_CRD.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        var bgiName = FTKR.CRD.image.background;
        this._backgroundSprite.bitmap = bgiName ?
            ImageManager.loadPicture(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_CRD.prototype.createAllWindows = function() {
        this.createDummyWindow();
        this.createHandWindows();
        this.createActorWindows();
        this.createMessageBoxWindow();
        this.createCommandBoxWindow();
    };

    Scene_CRD.prototype.createDummyWindow = function() {
        this._dummyWindow = new Window_Base(0, 0, 0, 0);
        this.addWindow(this._dummyWindow);
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
        var ww = FTKR.CRD.layout.width;
        var wh = FTKR.CRD.layout.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = Graphics.boxHeight - wh;
        this._handWindows[0] = new Window_PlayerHand(0, wx, wy, ww, wh, true);
        this._handWindows[0].setHandler('ok',     this.onSelectOk.bind(this));
        this._handWindows[0].setHandler('cancel', this.onShuffleEnd.bind(this));
        this.addWindow(this._handWindows[0]);
    };

    Scene_CRD.prototype.createHandWindow2 = function() {
        var ww = FTKR.CRD.layout.width;
        var wh = FTKR.CRD.layout.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = 0;
        var open = FTKR.CRD.debug.open;
        this._handWindows[1] = new Window_PlayerHand(1, wx, wy, ww, wh, open);
        this._handWindows[1].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[1]);
    };

    Scene_CRD.prototype.createHandWindow3 = function() {
        var wh = FTKR.CRD.layout.width;
        var ww = FTKR.CRD.layout.height;
        var wx = 0;
        var wy = (Graphics.boxHeight - wh) / 2;
        var open = FTKR.CRD.debug.open;
        this._handWindows[2] = new Window_PlayerHandVar(2, wx, wy, ww, wh, open);
        this._handWindows[2].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[2]);
    };

    Scene_CRD.prototype.createHandWindow4 = function() {
        var wh = FTKR.CRD.layout.width;
        var ww = FTKR.CRD.layout.height;
        var wx = Graphics.boxWidth - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        var open = FTKR.CRD.debug.open;
        this._handWindows[3] = new Window_PlayerHandVar(3, wx, wy, ww, wh, open);
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
        this._actorWindows[0] = new Window_PlayerStatus(actor, 0, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[0]);
    };

    Scene_CRD.prototype.createActorWindow2 = function() {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = this._handWindows[1].y + this._handWindows[1].height;
        var actor = this.player(1);
        this._actorWindows[1] = new Window_PlayerStatus(actor, 1, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[1]);
    };

    Scene_CRD.prototype.createActorWindow3 = function() {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2+ this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[2].x + this._handWindows[2].width;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(2);
        this._actorWindows[2] = new Window_PlayerStatus(actor, 2, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[2]);
    };

    Scene_CRD.prototype.createActorWindow4 = function() {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2+ this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[3].x - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(3);
        this._actorWindows[3] = new Window_PlayerStatus(actor, 3, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[3]);
    };

    Scene_CRD.prototype.createMessageBoxWindow = function() {
        this._messageBoxWindow = new Window_MessageBox();
        this._messageBoxWindow.setHandler('ok',     this.onMessageOk.bind(this));
        this._messageBoxWindow.setHandler('cancel',     this.onMessageOk.bind(this));
        this.addWindow(this._messageBoxWindow);
    };

    Scene_CRD.prototype.createCommandBoxWindow = function() {
        var wx = Graphics.boxWidth - 240;
        var wy = Graphics.boxHeight - this._dummyWindow.fittingHeight(2);
        this._commandBoxWindow = new Window_CmdBox(wx, wy);
        this._commandBoxWindow.setHandler('turnEnd', this.onTurnEnd.bind(this));
        this._commandBoxWindow.setHandler('shuffle', this.onShuffle.bind(this));
        this.addWindow(this._commandBoxWindow);
    };

    Scene_CRD.prototype.onTurnEnd = function() {
        this._commandBoxWindow.deselect();
        this._commandBoxWindow.hide();
        this._pickup = false;
        this.shiftIndex();
        this.setPlayerName();
        this._messageBoxWindow.activate();
    };

    Scene_CRD.prototype.onShuffle = function() {
        this._commandBoxWindow.deselect();
        this._commandBoxWindow.hide();
        this.subjectWindow().activate();
        this.subjectWindow().select(0);
    }; 

    Scene_CRD.prototype.shiftIndex = function() {
        do {
            this.shiftSubject();
            if (!this.targetWindow().cardNum()) {
                this.refreshRoute(this._subjectId);
                this.setTarget();
            }
        } while (!this.subjectWindow().cardNum());
    };

    Scene_CRD.prototype.remainingNum = function() {
        return this._handWindows.filter( function(window, i){
            return window._hand.length;
        },this).length;
    };

    Scene_CRD.prototype.lastPlayer = function() {
        var index = -1;
        this._handWindows.some( function(window, i){
            if(window._hand.length) index = i;
        },this);
        return index;
    };

    Scene_CRD.prototype.checkGameEnd = function() {
        if (this.remainingNum() === 1) {
            this._endPeople++;
            this.setGameOutPoint(this.lastPlayer());
            this._actorWindows[this.lastPlayer()].setRank(this._endPeople);
            if (this._gameCount >= $gameCardData.games()) {
                this.setEnd();
            } else {
                this.gameEnd();
                this._gameCount++;
            }
            this._messageBoxWindow.setGameEnd();
            this._messageBoxWindow.activate();
            return true;
        }
    };

    Scene_CRD.prototype.onSelectOk = function() {
        this.resetTempFace();
        if (!this._hand && !this._pickup) {
            this._hand = this.reduceHand(this.targetId(), true);
            var holdId = this.subjectWindow().cardNum();
            this.subjectWindow().addHand(holdId, this._hand.suit, this._hand.rank);
            this.subjectWindow().setHoldId(holdId);
            if (this.checkGameEnd()) return;
            this.targetWindow().deactivate();
            this.targetWindow().deselect();
            this.targetWindow().refresh();
            this.subjectWindow().activate();
            this.subjectWindow().select(holdId);
        } else if (!this._hand && this._pickup) {
            var index = this.subjectWindow().index();
            this._hand = this.subjectWindow()._hand[index];
            this.subjectWindow().setHoldId(index);
            this.subjectWindow().activate();
        } else if (this._hand && this._pickup) {
            var holdid = this.subjectWindow()._holdId;
            var index = this.subjectWindow().index();
            if (index === holdid) this._hand.up = !this._hand.up;
            this.onShuffleEnd();
        } else {
            this.onShuffleEnd();
        }
    };

    Scene_CRD.prototype.onShuffleEnd = function() {
        this._hand = null;
        this._pickup = true;
        this.discardPairHand(this.subjectId());
        if (this.checkGameEnd()) return;
        this.subjectWindow().deselect();
        this.subjectWindow().refresh();
        this.subjectWindow().resetHoldId();
        this._commandBoxWindow.show();
        this._commandBoxWindow.activate();
        this._commandBoxWindow.select(0);
    };

    Scene_CRD.prototype.clearHands = function() {
        this._handWindows.forEach( function(window){
            window._hand = [];
        });
    };

    Scene_CRD.prototype.clearRanks = function() {
        this._actorWindows.forEach( function(window){
            window.setRank(0);
        });
    };

    Scene_CRD.prototype.onMessageOk = function() {
        if (this.isGameEnd()) {
            this.clearGame();
            this.clearHands();
            this.clearRanks();
            this.settingGame();
        } else if (this.isSetEnd()){
            this.popScene();
        } else {
            this.resetTempFace();
            var hand = this.reduceHand(this.targetId(), false);
            this.addHand(this.subjectId(), hand);
            this.discardPairHand(this.subjectId());
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

    Scene_CRD.prototype.resetTempFace = function() {
        this._actorWindows.forEach(function(window){
            window.resetTempFace();
        });
    };

    Scene_CRD.prototype.addHand = function(index, hand) {
        var window = this._handWindows[index];
        var handIndex = this.putinNPCHand();
        window.addHand(handIndex, hand.suit, hand.rank);
        window.pushoutNPCHand();
        var faceIndex = window.changeTempFace(hand);
        if (faceIndex >= 0) this._actorWindows[index].setTempFace(faceIndex);
    };

    Scene_CRD.prototype.putinNPCHand = function() {
        var handIndex = null;
        var hands = setArrNum(0, this.subjectWindow().cardNum() + 1);
        var lastHands = hands.clone();
        $gameCardData.chara(this.subjectId()).putins.some( function(putin){
            if (!putin) return true;
            if (!checkRate(putin.rate)) return false;
            switch (putin.type) {
                case Scene_CRD.PUTIN_END:
                    hands = [hands.shift(), hands.pop()];
                    break;
                case Scene_CRD.NOT_PUTIN_END:
                    hands.shift();
                    hands.pop();
                    break;
                case Scene_CRD.PUTIN_MIDDLE:
                    var len = Math.floor((hands.length - 1) / 2);
                    var mod = (hands.length - 1) % 2;
                    hands = hands.splice(len, 1 + mod);
                    break;
                case Scene_CRD.NOT_PUTIN_MIDDLE:
                    var len = Math.floor((hands.length - 1) / 2);
                    var mod = (hands.length - 1) % 2;
                    hands.splice(len, 1 + mod);
                    break;
                case Scene_CRD.PUTIN_RIGHT:
                    var len = Math.floor((hands.length + 1) / 2);
                    hands = hands.slice(len);
                    break;
                case Scene_CRD.PUTIN_LEFT:
                    var len = Math.ceil((hands.length - 1) / 2);
                    hands = hands.slice(0, len);
                    break;
            };
            if (!hands.length) {
                hands = lastHands.clone();
            } else {
                lastHands = hands.clone();
            }
        },this);
        return hands[Math.randomInt(hands.length)];
    };

    Scene_CRD.prototype.discardPairHand = function(index) {
        var window = this._handWindows[index];
        window.discardPair();
        window.refreshHand();
        if (!window.cardNum()) {
            this._endPeople++;
            this.setGameOutPoint(index);
            this._actorWindows[index].setRank(this._endPeople);
        }
        window.deselect();
    };

    Scene_CRD.prototype.reduceHand = function(index, isPlayer) {
        var window = this._handWindows[index];
        var handIndex = isPlayer ? window.index() :
            this.drawNPCHand();
        var hand = window.reduceHand(handIndex);
        if (!window.cardNum()) {
            this._endPeople++;
            this.setGameOutPoint(index);
            this._actorWindows[index].setRank(this._endPeople);
            this.refreshRoute(index);
        }
        return hand;
    };

    Scene_CRD.prototype.drawNPCHand = function() {
        var handIndex = null;
        var hands = this.targetWindow()._hand.clone();
        var lastHands = hands.clone();
        $gameCardData.chara(this.subjectId()).draws.some( function(draw){
            if (!draw) return true;
            if (!checkRate(draw.rate)) return false;
            switch (draw.type) {
                case Scene_CRD.DRAW_END:
                    hands = [hands.shift(), hands.pop()];
                    break;
                case Scene_CRD.NOT_DRAW_END:
                    hands.shift();
                    hands.pop();
                    break;
                case Scene_CRD.DRAW_MIDDLE:
                    var len = Math.floor((hands.length - 1) / 2);
                    var mod = (hands.length - 1) % 2;
                    hands = hands.splice(len, 1 + mod);
                    break;
                case Scene_CRD.NOT_DRAW_MIDDLE:
                    var len = Math.floor((hands.length - 1) / 2);
                    var mod = (hands.length - 1) % 2;
                    hands.splice(len, 1 + mod);
                    break;
                case Scene_CRD.DRAW_RIGHT:
                    var len = Math.floor((hands.length + 1) / 2);
                    hands = hands.slice(len);
                    break;
                case Scene_CRD.DRAW_LEFT:
                    var len = Math.ceil((hands.length - 1) / 2);
                    hands = hands.slice(0, len);
                    break;
                case Scene_CRD.DRAW_PICKUP:
                    hands = hands.filter(function(hand){
                        return hand.up;
                    });
                    break;
                case Scene_CRD.NOT_DRAW_PICKUP:
                    hands = hands.filter(function(hand){
                        return !hand.up;
                    });
                    break;
            };
            if (!hands.length) {
                hands = lastHands.clone();
            } else {
                lastHands = hands.clone();
            }
        },this);
        var handIndex = 0;
        var card = hands[Math.randomInt(hands.length)];
        this.targetWindow()._hand.some( function(hand, i){
            if (hand === card) {
                handIndex = i;
                return true;
            }
        });
        return handIndex;
    };

    Scene_CRD.prototype.setGameOutPoint = function(index) {
        var point = $gameCardData.point(this._endPeople);
        $gameCardData.addPlayerPoint(index, point);
        var varId = FTKR.CRD.result.varId[index];
        if (varId) {
            var value = $gameVariables.value(varId) || 0;
            $gameVariables.setValue(varId, value + point);
        }
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

    Window_PlayerHand.prototype.initialize = function(playerId, x, y, width, height, isPlayer) {
        this._playerId = playerId;
        this._hand = [];
        this._sprites = [];
        this._isPlayer = isPlayer;
        this._holdId = -1;
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

    Window_PlayerHand.prototype.pushHand = function(suit, rank, up) {
        var card = {suit:suit, rank:rank, up:up || false};
        this._hand.push(card);
        this.refreshHand();
    };

    Window_PlayerHand.prototype.addHand = function(index, suit, rank, up) {
        var card = {suit:suit, rank:rank, up:up || false};
        this._hand.splice(index, 0, card);
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
        width = Math.min(width, FTKR.CRD.layout.width);
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
        var offset = this._hand[index].up ? this.padding / 2 : 0;
        if (this._playerId === 1) offset *= -1;
        this._sprites[index].y = dy + this.padding - offset;
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

    Window_PlayerHand.prototype.setHoldId = function(id) {
        this._holdId = id;
    };

    Window_PlayerHand.prototype.resetHoldId = function() {
        this._holdId = -1;
    };

    Window_PlayerHand.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (index >= 0 && index === this.index()) {
            if (this.active && this._holdId >= 0 ) {
                var hand = this._hand.splice(this._holdId, 1);
                this._hand.splice(this.index(), 0, hand[0]);
                this.setHoldId(this.index());
            }
            this.refresh();
            this._sprites.forEach( function(sprite, i){
                if (i !== index) sprite.opacity = 100;
            });
        }
    };

    Window_PlayerHand.prototype.pushoutNPCHand = function() {
        this._hand.forEach(function(hand){
            hand.up = false;
        });
        $gameCardData.chara(this._playerId).pushouts.some( function(pushout){
            if (!pushout) return true;
            if (!checkRate(pushout.rate)) return false;
            switch (pushout.type) {
                case Scene_CRD.PUSHOUT_JOKER:
                    this._hand.forEach( function(hand) {
                        if (hand.suit === 'joker') hand.up = true;
                    });;
                    break;
                case Scene_CRD.PUSHOUT_NOT_JOKER:
                    var hands = setArrNum(0, this.cardNum());
                    hands = hands.filter( function(hand){
                        return this._hand[hand].suit !== 'joker';
                    },this);
                    var index = hands[Math.randomInt(hands.length)];
                    this._hand[index].up = true;
                    break;
            }
        },this);
    };

    Window_PlayerHand.prototype.changeTempFace = function(card) {
        var faceIndex = -1;
        $gameCardData.chara(this._playerId).faces.some( function(face){
            if (!face) return true;
            if (!checkRate(face.rate)) return false;
            switch (face.type) {
                case Scene_CRD.FACE_DRAW_JOKER:
                    if (card.suit === 'joker') faceIndex = face.index;
                    break;
                case Scene_CRD.FACE_DRAW_NOT_JOKER:
                    if (card.suit !== 'joker') faceIndex = face.index;
                    break;
                case Scene_CRD.FACE_MADE_PAIR:
                    if (this._hand.some(function(hand){
                        return hand.rank === card.rank;
                    })) faceIndex = face.index;
                    break;
                case Scene_CRD.FACE_NOT_MADE_PAIR:
                    if (this._hand.every( function(hand){
                        return hand.rank !== card.rank;
                    })) faceIndex = face.index;
                    break;
            }
        },this);
        return faceIndex;
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
        height = Math.min(height, FTKR.CRD.layout.width);
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
        var offset = this._hand[index].up ? this.padding / 2 : 0;
        if (this._playerId === 3) offset *= -1;
        this._sprites[index].x = dx + this.padding + this.itemWidth() - offset;
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

    Window_PlayerStatus.prototype.initialize = function(actor, index, wx, wy, ww, wh) {
        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this._index = index;
        this._actor = actor;
        this._tempFaceIndex = -1;
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
            if (this.rank()) {
                this.drawText(this.rank(), x, y + this.lineHeight(), width, 'center');
            } else {
                var point = $gameCardData.playerPoint(this._index);
                this.drawText(point, x, y + this.lineHeight(), width, 'right');
            }
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
            case 4:
                return '四位';
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
        var faceIndex = this._tempFaceIndex >= 0 ? this._tempFaceIndex : actor.faceIndex();
        var sx = faceIndex % 4 * sw;
        var sy = Math.floor(faceIndex / 4) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_PlayerStatus.prototype.setTempFace = function(faceIndex) {
        this._tempFaceIndex = faceIndex;
        this.refresh();
    };

    Window_PlayerStatus.prototype.resetTempFace = function() {
        this._tempFaceIndex = -1;
        var hands = SceneManager._scene._handWindows[this._index]._hand;
        $gameCardData.chara(this._index).faces.some( function(face){
            if (!face) return true;
            if (!checkRate(face.rate)) return false;
            switch (face.type) {
                case Scene_CRD.FACE_HAS_JOKER:
                    if (hands.some( function(hand) {
                        return hand.suit === 'joker';
                    })) this._tempFaceIndex = face.index;
                    break;
                case Scene_CRD.FACE_NOT_HAS_JOKER:
                    if (hands.every( function(hand) {
                        return hand.suit !== 'joker';
                    })) this._tempFaceIndex = face.index;
                    break;
            }
        },this);
        this.refresh();
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

    //=============================================================================
    // Window_CmdBox
    // コマンドボックス
    //=============================================================================

    function Window_CmdBox() {
        this.initialize.apply(this, arguments);
    }

    Window_CmdBox.prototype = Object.create(Window_Command.prototype);
    Window_CmdBox.prototype.constructor = Window_CmdBox;

    Window_CmdBox.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
        this.deactivate();
        this.hide();
    };

    Window_CmdBox.prototype.makeCommandList = function() {
        this.addCommand('ターン終了', 'turnEnd', true);
        this.addCommand('並び替え', 'shuffle', true);
    };

}());//EOF
