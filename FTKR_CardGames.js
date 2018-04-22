//=============================================================================
// トランプカードゲームプラグイン
// FTKR_CardGames.js
// プラグインNo : 51
// 作成者     : フトコロ
// 作成日     : 2017/07/02
// 最終更新日 : 2017/10/02
// バージョン : v1.2.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_Card = true;

var FTKR = FTKR || {};
FTKR.CRD = FTKR.CRD || {};

//=============================================================================
/*:
 * @plugindesc v1.2.1 トランプカードゲーム
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
 * @min 1
 * @max 13
 * @type number
 *
 * @param Number Of Jokers
 * @desc 使用するジョーカーの数を選択します。
 * 0 ~ 2
 * @default 1
 * @min 0
 * @max 2
 * @type number
 *
 * @param --ゲームの設定--
 * @default
 * 
 * @param Subject Player Color
 * @desc 現在ターンのプレイヤーのカラーを設定します。
 * @default 18
 * @type number
 * 
 * @param Subject Window Tone
 * @desc 現在ターンのプレイヤーのウィンドウカラーを設定します。
 * R,G,B  とカンマ(,)で区切って入力してください。
 * @default 255,255,0
 * 
 * @param Target Player Color
 * @desc 手札を引く相手プレイヤーのカラーを設定します。
 * @default 29
 * @type number
 * 
 * @param Ranking Points
 * @desc ゲームの勝敗の結果で取得するポイントを設定します。
 * カンマ(,)で区切って、1位から4位まで設定してください。
 * @default 2,1,-1,-2
 * 
 * @param Draw Speed
 * @desc 手札を引く速さを設定します。
 * @default 30
 * @type number
 * 
 * @param Draw Height
 * @desc 手札を引く高さを設定します。
 * @default 60
 * @type number
 * 
 * @param Deal Speed
 * @desc 山札を配る時の速さを設定します。
 * @default 5
 * @type number
 * 
 * @param First Discard Speed
 * @desc 初期の手札からカードを捨てる時の速さを設定します。
 * @default 10
 * @type number
 * 
 * @param --サウンドの設定--
 * @default
 * 
 * @param Game BGM Name
 * @desc カードゲーム時のBGMを設定します。
 * @default 
 * @type file
 * @require 1
 * @dir audio/bgm
 * 
 * @param Game BGM Pitch
 * @desc カードゲーム時のBGMのピッチを設定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 * 
 * @param Game BGM Volume
 * @desc カードゲーム時のBGMの音量を設定します。
 * @default 90
 * @min 0
 * @max 100
 * @type number
 * 
 * @param Draw SE Name
 * @desc 手札を引く時のSEを設定します。
 * @default Book1
 * @type file
 * @require 1
 * @dir audio/se
 * 
 * @param Draw SE Pitch
 * @desc 手札を引く時のSEのピッチを設定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 * 
 * @param Draw SE Volume
 * @desc 手札を引く時のSEの音量を設定します。
 * @default 90
 * @min 0
 * @max 100
 * @type number
 * 
 * @param Deal SE Name
 * @desc カードを配る時のSEを設定します。
 * @default Wind4
 * @type file
 * @require 1
 * @dir audio/se
 * 
 * @param Deal SE Pitch
 * @desc カードを配る時のSEのピッチを設定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 * 
 * @param Deal SE Volume
 * @desc カードを配る時のSEの音量を設定します。
 * @default 30
 * @min 0
 * @max 100
 * @type number
 * 
 * @param --ゲーム変数の設定--
 * @default
 * 
 * @param Game Count ID
 * @desc ゲーム数を設定する変数のIDを指定します。
 * @default 
 * @type number
 *
 * @param Draw Speed ID
 * @desc カードを引く早さを設定する変数のIDを指定します。
 * 設定しない場合は、Draw Speedの設定で固定します。
 * @default 
 * @type number
 *
 * @param Player 1 ID
 * @desc プレイヤー１のアクターIDを指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 1 Result
 * @desc プレイヤー１の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 2 ID
 * @desc プレイヤー2のアクターIDを指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 2 Result
 * @desc プレイヤー２の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 3 ID
 * @desc プレイヤー3のアクターIDを指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 3 Result
 * @desc プレイヤー３の結果を指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 4 ID
 * @desc プレイヤー4のアクターIDを指定した変数に格納します。
 * @default 
 * @type number
 *
 * @param Player 4 Result
 * @desc プレイヤー４の結果を指定した変数に格納します。
 * @default 
 * @type number
 * 
 * @param --ゲームスイッチの設定--
 * @default
 * 
 * @param Random Start ID
 * @desc 開始プレイヤーをランダムにする機能の有効無効を設定するスイッチのIDを指定します。
 * @default 
 * @type number
 *
 * @param NPC Dialogues ID
 * @desc NPCの台詞の有効無効を設定するスイッチのIDを指定します。
 * @default 
 * @type number
 *
 * @param NPC Facial Expressions ID
 * @desc NPCの表情の有効無効を設定するスイッチのIDを指定します。
 * @default 
 * @type number
 *
 * @param NPC Characteristics ID
 * @desc NPCの特徴の有効無効を設定するスイッチのIDを指定します。
 * @default 
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
 * @param --画面レイアウト--
 * @default
 * 
 * @param Hand Width
 * @desc 手札カードの表示幅を設定します。
 * @default 408
 * @type number
 *
 * @param Hand Height
 * @desc 手札カードの表示高さを設定します。
 * @default 180
 * @type number
 *
 * @param Dialogue Width
 * @desc 台詞ウィンドウの幅を設定します。
 * @default 240
 * @type number
 *
 * @param Dialogue Height
 * @desc 台詞ウィンドウの高さを設定します。
 * @default 72
 * @type number
 *
 * @param Dialogue Offset Y
 * @desc 台詞ウィンドウとアクターウィンドウのY座標の差を設定します。
 * @default 18
 * @type number
 *
 * @param Dialogue Skin
 * @desc 台詞ウィンドウのスキンを設定します。
 * 設定しない場合は、デフォルトスキンを使用します。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param --コマンドの設定--
 * @default
 * 
 * @param Turn End Command
 * @desc ターンを終了するコマンド名を設定します。
 * @default ターン終了
 *
 * @param Sort Command
 * @desc 手札を並び替えるコマンド名を設定します。
 * @default 並び替え
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
 * @param --イベントの設定--
 * @default
 * 
 * @param Card Game Events
 * @desc カードゲーム中に実行するコモンイベントのIDを設定します。
 * 0 - 実行しない、カンマ(,)で区切って複数設定できます
 * @default 0
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
 * まず、プラグインパラメータ<Player * ID>でゲーム内変数を
 * 指定してください。
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
 * 
 * 1セット内で行うゲーム数を設定します。
 * プラグインパラメータ<Game Count ID>で指定したゲーム変数の
 * 値を変更してください。
 * 
 * 
 * 3. ゲームポイントの設定
 * 　1ゲームで、上がり順に取得するポイントを設定します。
 * 　各プレイヤーが取得したポイントは、プラグインパラメータで設定した
 * 　ゲーム内変数に保存します。
 * 　複数回のゲームを行うと、ポイントは加算していきます。
 * 
 * プラグインパラメータで設定する
 * 　<Ranking Points>
 * 
 * 
 * 4. ゲーム画面の表示
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
 * 後述のNPCの特徴により、手札の中の位置が重要になるため
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
 * <NPCのターン>
 * NPCのターンは自動で進みます。
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
 * 特徴および表情の設定の場合
 * <CRD_特徴>
 * 内容: 確率
 * </CRD_特徴>
 * 
 * 台詞の設定の場合
 * <CRD_台詞>
 * 内容: 確率, 台詞
 * </CRD_台詞>
 * 
 * 確率は、1～10の値で、10％刻みで内容を実行する確率を設定できます。
 * 台詞は、表示させる文字列を記入してください。
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
 * <台詞に関する内容>
 * ※この台詞は自分のターンが終わると消去されます
 * 
 * 1. ジョーカーを引く　　 - ジョーカーを引いた時に指定の台詞を表示します
 * 2. ジョーカー以外を引く - ジョーカー以外を引いた時に指定の台詞を表示します
 * 3. ペアができた　　　　 - ペアができた時に指定の台詞を表示します
 * 4. ペアができない　　　 - ペアができなかった時に指定の台詞を表示します
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
 * <CRD_台詞>
 * ジョーカーを引く: 7, ジョーカーだ！
 * </CRD_台詞>
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
 * また、ジョーカーを引くと7割の確率で台詞を話すようになります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カードゲーム中のコモンイベントについて
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Card Game Event>にコモンイベントIDを設定すると
 * カードゲーム中にコモンイベントを実行できます。
 * 
 * プラグインパラメータ<Card Game Event>には、カンマ(,)とハイフン(-)を使うことで
 * 複数のコモンイベントIDを設定できます。
 * ハイフン(-)は、繋げた前後のIDの間のすべてのIDを登録します。
 * 
 * 入力例)
 * 　1, 4, 5, 10-15
 * 
 * 複数のイベントIDを入力した場合、入力した順番(左から)に実行条件を
 * 判定して、条件を満たしていればそのイベントを実行します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カードゲーム中のコモンイベントの実行条件の設定
 *-----------------------------------------------------------------------------
 * コモンイベントに以下の注釈を入力することで、実行条件を設定できます。
 * 
 * <スパン: [タイミング]>
 * <SPAN: [TIMING]>
 * 実行回数に関する条件を設定します。
 * スパンを指定しない場合は、この設定を適用します。
 * [タイミング] には以下を入力してください。
 * 　ゲーム or GAME　　   - ゲーム中に１回だけ実行します。
 * 　ターン or TURN　　   - ターン中に１回だけ実行します。
 * 　モーメント or MOMENT - 条件を満たす度に実行します。
 * 
 * 
 * <ターン終了>
 * <TURNEND>
 * ターン終了時に実行します。
 * 
 * <カード引く>
 * <DRAWCARD>
 * カードを引いた時に実行します。
 * 
 * <アクター:a>
 * <ACTOR:a>
 * アクターID a のターンに実行します。
 * 
 * <ターン:a + b *X>
 * <TURN:a + b *X>
 * 指定したターンに実行します。
 * a と b に数値を入力してください。(* と X は半角, XはそのままXと入力)
 * 　a - 最初に実行するターン数
 * 　b - 次に何ターン後に実行するか(以降この値のターンが経過する毎に実行)
 * 　例)
 * 　　<ターン:1 + 2 *X>
 * 　　<TURN:2 + 4 *X>
 * 
 * <カード枚数: #a b 枚以下>
 * <CARD_NUMBERS: #a LESS THAN b>
 * 指定したプレイヤーのカード枚数によって実行します。
 * a と b に数値を入力してください。
 * a と b の間には必ず半角スペースを入れてください。
 * 　a - プレイヤーNo(1~4)
 * 　b - 残りカード枚数
 * 　例)
 * 　　<カード枚数: #1 5 枚以下>
 * 　　<CARD_NUMBERS: #2 LESS THAN 7>
 * 
 * <スイッチ: a>
 * <SWITCH: a>
 * 指定したスイッチがONの時に実行します。
 * a に数値を入力してください。
 * 　a - スイッチID
 * 
 * 
 *-----------------------------------------------------------------------------
 * コモンイベントで使用できるスクリプト
 *-----------------------------------------------------------------------------
 * コモンイベントには以下のスクリプトが使用できます。
 * 
 * CardGameManager._turnCount
 *    :ターン数
 * 
 * CardGameManager.drawCard()
 *    :引いたカードの情報
 *    : CardGameManager.drawCard().suit - カードのスート(マーク)
 *    : CardGameManager.drawCard().rank - カードのランク
 * 
 * CardGameManager.isDrawJoker()
 *    :ジョーカーを引いたかどうか判定する
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
 * v1.2.1 - 2017/10/02 : ヘルプ修正
 *    1. NPCの台詞の設定に関する誤記修正
 * 
 * v1.2.0 - 2017/07/29 : 機能追加
 *    1. カードゲーム中にコモンイベントを実行する機能を追加。
 * 
 * v1.1.1 - 2017/07/22 : 機能追加
 *    1. カードを配る時とペアを捨てる時にカードに動きをつける機能を追加。
 *    2. カードを配る時のSEを設定する機能を追加。
 * 
 * v1.1.0 - 2017/07/19 : 機能追加
 *    1. カードを引く時と手札に入れる時にカードに動きをつける機能を追加。
 *    2. NPCのターンを自動で進めるように変更。
 *    3. ターン中のキャラのステータスウィンドウの色を変更する機能を追加。
 *    4. ２人プレイと、３人プレイの時の配置を見直し。
 *    5. ゲーム中のBGMとカードを引くときのSEを設定する機能を追加。
 * 
 * v1.0.2 - 2017/07/11 : 不具合修正
 *    1. カードゲーム画面表示時にゲームが進まない場合がある不具合を修正。
 * 
 * v1.0.1 - 2017/07/09 : 不具合修正
 *    1. プレイヤーを設定するプラグインコマンドでエラーになる不具合を修正。
 * 
 * v1.0.0 - 2017/07/09 : 正式版公開
 *    1. NPCの台詞を設定する機能を追加。
 *    2. NPCの台詞、表情、特徴をゲーム内スイッチでON/OFFできる機能を追加。
 *    3. ゲーム数を、ゲーム内変数で設定するように変更。
 *    4. プラグインパラメータを一部削除。
 *    5. コマンド名をプラグインパラメータで設定する機能を追加。
 *    6. 開始プレイヤーをランダムに決める機能を追加。
 *    7. NPCの配置を見直し。
 *    8. ターン中のプレイヤーの名前の表示色を変更する機能を追加。
 * 
 * v0.9.0 - 2017/07/06 : 機能追加
 *    1. カードを引いたときに任意の場所にセットする機能を追加。
 *    2. 手札の並び替え機能を追加。
 *    3. NPCの特徴を設定する機能を追加。
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

function CardGameManager() {
    throw new Error('This is a static class');
}

(function() {

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
    }

    var splitConvertNumber = function(param) {
        var results = [];
        (param + '').split(',').forEach( function(split){
            match = /[ ]*(\d+)[ ]*-[ ]*(\d+)/.exec(split);
            if (match) {
                for (var i = Number(match[1]); i <= Number(match[2]); i++) {
                    results.push(i);
                }
            } else {
                if(!isNaN(split)) results.push(Number(split));
            }
        });
        return results;
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_CardGames');

    FTKR.CRD = {
        card:{
            suit       :String(parameters['Suit Type'] || 'spade,club,heart,diamond'),
            rank       :Number(parameters['Max Rank'] || 13).clamp(1,13),
            jokerNum   :Number(parameters['Number Of Jokers'] || 1).clamp(0,2),
        },
        layout:{
            targetPosi :Number(parameters['Target Position'] || 0),
            width      :Number(parameters['Hand Width'] || 432),
            height     :Number(parameters['Hand Height'] || 180),
            dialogue:{
                skin   :String(parameters['Dialogue Skin'] || ''),
                width  :Number(parameters['Dialogue Width'] || 240),
                height :Number(parameters['Dialogue Height'] || 72),
                offsetY:Number(parameters['Dialogue Offset Y'] || 18),
            },
        },
        game:{
            subjectColor:Number(parameters['Subject Player Color'] || 18),
            subjectTone :String(parameters['Subject Window Tone'] || '255,255,0').split(',').num(),
            targetColor :Number(parameters['Target Player Color'] || 29),
            points      :String(parameters['Ranking Points'] || '2,1,-1,-2'),
            drawSpeed   :Number(parameters['Draw Speed'] || 30),
            drawHeight  :Number(parameters['Draw Height'] || 60),
            dealSpeed   :Number(parameters['Deal Speed'] || 5),
            discardSpeed:Number(parameters['First Discard Speed'] || 10),
        },
        sound:{
            bgm:{
                name    :String(parameters['Game BGM Name'] || ''),
                pitch   :Number(parameters['Game BGM Pitch'] || 100),
                pan     :0,
                volume  :Number(parameters['Game BGM Volume'] || 90),
            },
            drawSe:{
                name    :String(parameters['Draw SE Name'] || ''),
                pitch   :Number(parameters['Draw SE Pitch'] || 100),
                pan     :0,
                volume  :Number(parameters['Draw SE Volume'] || 90),
            },
            dealSe:{
                name    :String(parameters['Deal SE Name'] || ''),
                pitch   :Number(parameters['Deal SE Pitch'] || 100),
                pan     :0,
                volume  :Number(parameters['Deal SE Volume'] || 90),
            },
        },
        setting:{
            playerId:[
                Number(parameters['Player 1 ID'] || 0),
                Number(parameters['Player 2 ID'] || 0),
                Number(parameters['Player 3 ID'] || 0),
                Number(parameters['Player 4 ID'] || 0),
            ],
            randomStart:Number(parameters['Random Start ID'] || 0),
            gameCount  :Number(parameters['Game Count ID'] || 0),
            dialogue   :Number(parameters['NPC Dialogues ID'] || 0),
            faces      :Number(parameters['NPC Facial Expressions ID'] || 0),
            chara      :Number(parameters['NPC Characteristics ID'] || 0),
            drawSpeed  :Number(parameters['Draw Speed ID'] || 0),
        },
        command:{
            turnEnd    :String(parameters['Turn End Command'] || 'ターン終了'),
            sort       :String(parameters['Sort Command'] || '並び替え'),
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
        cardEvents     :splitConvertNumber(parameters['Card Game Events']),
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

    var variableId = function(prop) {
        return $gameVariables.value(FTKR.CRD.setting[prop]);
    };

    var setVarId = function(prop, value) {
        $gameVariables.setValue(FTKR.CRD.setting[prop], value);
    };

    var switchId = function(prop) {
        return $gameSwitches.value(FTKR.CRD.setting[prop]);
    };

    var switchOnId = function(prop) {
        $gameSwitches.setValue(FTKR.CRD.setting[prop], true);
    };

    var switchOffId = function(prop) {
        $gameSwitches.setValue(FTKR.CRD.setting[prop], false);
    };

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
    var _CRD_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function() {
        _CRD_Scene_Boot_loadSystemImages.call(this);
        ImageManager.loadCardImages();
    };

    ImageManager.loadCardImages = function() {
        ['spade', 'club', 'heart', 'diamond'].forEach( function(suit) {
            for( var i = 1; i < 14; i++) {
                this.reservePicture(FTKR.CRD.image[suit].format(i.padZero(2)));
            }
        },this);
        this.reservePicture(FTKR.CRD.image.back);
        this.reservePicture(FTKR.CRD.image.joker);
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

    //アクターの台詞タグを読み取る
    DataManager.readCrdDialogues = function(obj) {
        var metaData = readEntrapmentCodeToText(obj, ['CRD_台詞']);
        var datas = metaData.split(';');
        var dialogues = [];
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var match = /(.+):[ ]*(\d+),[ ]*(.+)/.exec(data);
            if (!match) continue;
            switch (match[1].toUpperCase()) {
                case 'ジョーカーを引く':
                    dialogues.push({type:Scene_CRD.LOG_DRAW_JOKER, rate:Number(match[2]), text:match[3]});
                    break;
                case 'ジョーカー以外を引く':
                    dialogues.push({type:Scene_CRD.LOG_DRAW_NOT_JOKER, rate:Number(match[2]), text:match[3]});
                    break;
                case 'ペアができた':
                    dialogues.push({type:Scene_CRD.LOG_MADE_PAIR, rate:Number(match[2]), text:match[3]});
                    break;
                case 'ペアができない':
                    dialogues.push({type:Scene_CRD.LOG_NOT_MADE_PAIR, rate:Number(match[2]), text:match[3]});
                    break;
            }
        }
        return dialogues;
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
                CardGameManager.setGameType(0);
                CardGameManager.saveBgmAndBgs();
                CardGameManager.stopAudioOnStart();
                SceneManager.push(Scene_CRD);
                break;
            case 'プレイヤー設定':
            case 'SETTING_PLAYER':
                $gameCardData.resetPlayer();
                args.forEach( function(arg, i) {
                    if (i >= 4) return;
                    $gameVariables.setValue(FTKR.CRD.setting.playerId[i], setArgNum(arg));
                });
                break;
        }
    };

    //=============================================================================
    // CardGameManager
    // カードゲームマネージャー
    //=============================================================================

    CardGameManager.initMembers = function() {
        this._interpreter = new Game_Interpreter();
        this._phase = 'init';
        this._type = 0;
        this._turnCount = 0;
        this._mapBgm = null;
        this._mapBgs = null;
    };

    CardGameManager.clearEventFlags = function() {
        this._commonEventFlags = [];
        var eventIds = FTKR.CRD.cardEvents;
        eventIds.forEach( function(id, i) {
            this._commonEventFlags[i] = false;
        },this);
    };

    CardGameManager.setHandWindows = function(windows) {
        this._handWindows = windows;
    };

    CardGameManager.setGameType = function(type){
        this._type = type || 0;
    };
    
    CardGameManager.gameType = function() {
        return this._type;
    };

    CardGameManager.saveBgmAndBgs = function() {
        this._mapBgm = AudioManager.saveBgm();
        this._mapBgs = AudioManager.saveBgs();
    };

    CardGameManager.stopAudioOnStart = function() {
        if (!AudioManager.isCurrentBgm(FTKR.CRD.sound.bgm.name)) {
            AudioManager.stopBgm();
        }
        AudioManager.stopBgs();
        AudioManager.stopMe();
        AudioManager.stopSe();
    };

    CardGameManager.playGameBgm = function() {
        AudioManager.playBgm(FTKR.CRD.sound.bgm);
        AudioManager.stopBgs();
    };
    
    CardGameManager.replayBgmAndBgs = function() {
        if (this._mapBgm) {
            AudioManager.replayBgm(this._mapBgm);
        } else {
            AudioManager.stopBgm();
        }
        if (this._mapBgs) {
            AudioManager.replayBgs(this._mapBgs);
        }
    };

    CardGameManager.increaseTurn = function() {
        var eventIds = FTKR.CRD.cardEvents;
        for (var i = 0; i < eventIds.length; i++) {
            if (eventIds[i]) {
                var event = $dataCommonEvents[eventIds[i]];
                if (this.commonEventSpan(event) === 1) {
                    this._commonEventFlags[i] = false;
                }
            }
        }
    };

    CardGameManager.updateEvent = function(phase) {
        switch (phase) {
            case 'turnStart':
            case 'select':
            case 'draw':
            case 'checkPair':
            case 'disCard':
            case 'turnEnd':
                return this.updateInterpreter();
        }
        return false;
    };

    CardGameManager.updateInterpreter = function() {
        this._interpreter.update();
        if (this._interpreter.isRunning()) {
            return true;
        }
        this.setupStartingEvent()
        if (this._interpreter.isRunning()) {
            return true;
        }
        return false;
    };

   CardGameManager.setupStartingEvent = function() {
        if (this._interpreter.setupReservedCommonEvent()) {
            return;
        }
        var eventIds = FTKR.CRD.cardEvents;
        for (var i = 0; i < eventIds.length; i++) {
            if (eventIds[i]) {
                var event = $dataCommonEvents[eventIds[i]];
                if (this.meetsCommonEventCommentConditions(event) && !this._commonEventFlags[i]) {
                    this._interpreter.setup(event.list, this.subjectId());
                    if (this.commonEventSpan(event) <= 1) {
                        this._commonEventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    };

    CardGameManager.commonEventSpan = function(event) {
        for (var v = 0; v < event.list.length; v++) {
            var list = event.list[v];
            if (list && ([108, 408].contains(list.code))) {
                var match = /<([^<>:]+)(:?)([^>]*)>/g.exec(list.parameters[0]);
                switch((match[1] + '').toUpperCase()) {
                    case 'スパン':
                    case 'SPAN':
                        switch((match[3] + '').toUpperCase()) {
                            case 'ゲーム':
                            case 'GAME':
                                return 0;
                            case 'ターン':
                            case 'TURN':
                                return 1;
                            case 'モーメント':
                            case 'MOMENT':
                                return 2;
                        }
                }
            }
        }
        return 0;
    };

    CardGameManager.meetsCommonEventCommentConditions = function(event) {
        return this.meetsConditions(this.convertCommonEventConditions(event));
    };

    CardGameManager.convertCommonEventConditions = function(event) {
        var conditions = {};
        var code = false;
        for (var i = 0; i < event.list.length; i++) {
            var list = event.list[i];
            if (list && ([108, 408].contains(list.code))) {
                var match = /<([^<>:]+)(:?)([^>]*)>/g.exec(list.parameters[0]);
                if (match) {
                    switch((match[1] + '').toUpperCase()){
                        case 'ターン終了':
                        case 'TURNEND':
                            conditions.turnEnding = true;
                            break;
                        case 'カード引く':
                        case 'DRAWCARD':
                            conditions.drawCarding = true;
                            break;
                        case 'アクター':
                        case 'ACTOR':
                            if (match[2] === ':') {
                                conditions.actorValid = true;
                                conditions.actorId = Number(match[3]);
                            }
                            break;
                        case 'ターン':
                        case 'TURN':
                            if (match[2] === ':') {
                                var turn = /(\d+)[ ]*\+[ ]*(\d+)[ ]*\*X/i.exec(match[3]);
                                if (turn) {
                                    conditions.turnValid = true;
                                    conditions.turnA = Number(turn[1]);
                                    conditions.turnB = Number(turn[2]);
                                }
                            }
                            break;
                        case 'カード枚数':
                        case 'CARD_NUMBERS':
                            if (match[2] === ':') {
                                var value = /#(\d+)[ ]*(\d+)[ ]*枚以下/i.exec(match[3]);
                                if (!value) value = /#(\d+)[ ]*less[ ]than[ ]*(\d+)[ ]*/i.exec(match[3]);
                                if (value) {
                                    conditions.cardValid = true;
                                    conditions.actorId = Number(value[1]) - 1;
                                    conditions.cardNum = Number(value[2]);
                                }
                            }
                            break;
                        case 'スイッチ':
                        case 'SWITCH':
                            if (match[2] === ':') {
                                conditions.switchValid = true;
                                conditions.switchId = Number(match[3]);
                            }
                            break;
                    }
                }
            }
        }
        var page = {conditions:conditions};
        return page;
    };

    CardGameManager.phase = function() {
        return SceneManager._scene._phase;
    };

    CardGameManager.drawCard = function() {
        return SceneManager._scene._hand;
    };

    CardGameManager.isDrawJoker = function() {
        return this.drawCard() && this.drawCard().suit === 'joker';
    };

    CardGameManager.isTurnEnd = function() {
        return this.phase() === 'turnEnd';
    };

    CardGameManager.isDrawCard = function() {
        return this.phase() === 'checkPair';
    };

    CardGameManager.subjectId = function() {
        return SceneManager._scene._subjectId;
    };

    CardGameManager.meetsConditions = function(page) {
        var c = page.conditions;
        if (!c.turnEnding && !c.drawCarding &&
              !c.turnValid && !c.actorValid &&
              !c.cardValid && !c.switchValid) {
            return false;  // Conditions not set
        }
        if (c.turnEnding) {
            if (!this.isTurnEnd()) {
                return false;
            }
        }
        if (c.drawCarding) {
            if (!this.isDrawCard()) {
                return false;
            }
        }
        if (c.actorValid) {
            var actor = $gameCardData.players()[this.subjectId()];
            if (!actor || actor !== c.actorId) {
                return false;
            }
        }
        if (c.turnValid) {
            var n = this._turnCount;
            var a = c.turnA;
            var b = c.turnB;
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }
        }
        if (c.cardValid) {
            var actor = this._handWindows[c.actorId];
            if (!actor || actor.cardNum() > c.cardNum) {
                return false;
            }
        }
        if (c.switchValid) {
            if (!$gameSwitches.value(c.switchId)) {
                return false;
            }
        }
        return true;
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
        this._joker = FTKR.CRD.card.jokerNum;
        this._points = ('0,' + FTKR.CRD.game.points).split(',').num();
        this._playerPoints = [0,0,0,0];
        this._cardHeight = 0;
        this._cardWidth = 0;
    };

    //プレイヤーの設定
    Game_CardData.prototype.players = function() {
        var players = [];
        FTKR.CRD.setting.playerId.filter( function(id){
            var value = $gameVariables.value(id);
            if (value !== 0) {
                players.push(value);
                return true;
            }
        });
        return players;
    };
    
    Game_CardData.prototype.playerNum = function() {
        return FTKR.CRD.setting.playerId.filter( function(id){
            return $gameVariables.value(id) !== 0;
        }).length;
    };

    Game_CardData.prototype.resetPlayer = function() {
        this._players = [];
    };

    Game_CardData.prototype.chara = function(id) {
        return this._charas[id];
    };

    Game_CardData.prototype.setChara = function(id, chara) {
        this._charas[id] = chara;
    };

    Game_CardData.prototype.setDialogue = function(id, dialogue) {
        this._charas[id].dialogues = dialogue;
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
        this._joker = FTKR.CRD.card.jokerNum;
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

    Game_CardData.prototype.setCardSize = function(card) {
        this._cardHeight = card.height;
        this._cardWidth = card.width;
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

    Scene_CRD.LOG_DRAW_JOKER     = 101;
    Scene_CRD.LOG_DRAW_NOT_JOKER = 102;
    Scene_CRD.LOG_MADE_PAIR      = 103;
    Scene_CRD.LOG_NOT_MADE_PAIR  = 104;

    Scene_CRD.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this.initMembers();
    };

    Scene_CRD.prototype.initMembers = function() {
        this.clearGame();
        this.clearVariables();
        CardGameManager.initMembers();
        CardGameManager.playGameBgm();
        $gameCardData.resetPlayerPoints();
        this.setPlayerCharacteristics();
        this._setEnd = false;
        this._gameCount = 1;
    };

    Scene_CRD.prototype.clearGame = function() {
        ImageManager.loadCardImages();
        CardGameManager.clearEventFlags();
        CardGameManager._turnCount = 0;
        this._gameEnd = false;
        this._hand = null;
        this._endPeople = 0;
        this._cardNum = 0;
        this._startId = 0;
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

    Scene_CRD.prototype.clearVariables = function() {
        if (!FTKR.CRD.result.reset) return;
        FTKR.CRD.result.varId.forEach( function(varId){
            if (varId) $gameVariables.setValue(varId, 0);
        });
        if (!variableId('gameCount')) {
            setVarId('gameCount', 1);
        }
    };
      
    Scene_CRD.prototype.targetId = function() {
        return this._targetId;
    };

    Scene_CRD.prototype.subjectId = function() {
        return this._subjectId;
    };

    Scene_CRD.prototype.targetWindow = function() {
        return this._handWindows[this.targetId()];
    };

    Scene_CRD.prototype.subjectWindow = function() {
        return this._handWindows[this.subjectId()];
    };

    Scene_CRD.prototype.setSubjectId = function(id) {
        this._subjectId = id;
        this.setTarget();
    };

    Scene_CRD.prototype.setTarget = function() {
        this._targetId = this._route[this._subjectId];
    };

    Scene_CRD.prototype.shiftSubject = function() {
        this._subjectId += 1;
        if (this._subjectId >= $gameCardData.playerNum()) this._subjectId = 0;
        this.setTarget();
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

    Scene_CRD.prototype.refreshRoute = function(index) {
        do {
            this._route[index] += 1;
            if (this._route[index] >= $gameCardData.playerNum()) this._route[index] = 0;
        } while (!this._handWindows[this._route[index]].cardNum());
    };

    //------------------------------------------------------------------------
    // プレイヤーの処理
    //------------------------------------------------------------------------
    Scene_CRD.prototype.setPlayerCharacteristics = function() {
        $gameCardData.players().forEach( function(id, i){
            if (id === -1) id = $gameParty.leader().actorId();
            var actor = $dataActors[id];
            $gameCardData.setChara(i, DataManager.readCrdCharacteristics(actor));
            $gameCardData.setDialogue(i, DataManager.readCrdDialogues(actor));
        });
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

    Scene_CRD.prototype.setStartPlayer = function() {
        this._startId = switchId('randomStart') ?
            Math.randomInt($gameCardData.playerNum()) : 0;
        this.setSubjectId(this._startId);
        var name = this.player(this.subjectId()).name();
        this._messageBoxWindow.setText(name + 'から開始します');
    };

    Scene_CRD.prototype.remainingNum = function() {
        return this._handWindows.filter( function(window, i){
            return window.cardNum();
        },this).length;
    };

    Scene_CRD.prototype.lastPlayer = function() {
        var index = -1;
        this._handWindows.some( function(window, i){
            if(window.cardNum()) index = i;
        },this);
        return index;
    };

    //------------------------------------------------------------------------
    // 山札
    //------------------------------------------------------------------------
    Scene_CRD.prototype.stock = function() {
        return this._stock;
    };

    Scene_CRD.prototype.stockNum = function() {
        return this._stock.length;
    }

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
        this._cardNum = this._stock.length;
    };

    Scene_CRD.prototype.stockShuffle = function() {
        this._stock = shuffle(this._stock);
    };

    //------------------------------------------------------------------------
    // ゲームとセットの終了
    //------------------------------------------------------------------------
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

    //------------------------------------------------------------------------
    // ゲームの初期設定
    //------------------------------------------------------------------------
    Scene_CRD.prototype.setRoute = function() {
        this._route = [];
        this._players.forEach( function(player, i){
            var n = i + 1;
            if (n >= $gameCardData.playerNum()) n = 0;
            this._route.push(n);
        },this);
    };

    Scene_CRD.prototype.settingGame = function() {
        this.setRoute();
        this.setStartPlayer();
        this.makeStock();
        this.stockShuffle();
        this._phase = 'deal';
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
            ImageManager.reservePicture(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_CRD.prototype.createAllWindows = function() {
        this.createDummyWindow();
        this.createHandWindows();
        this.createActorWindows();
        this.createMessageBoxWindow();
        this.createDialogueWindows();
        this.createCommandBoxWindow();
        this.createMessageWindow();
    };

    Scene_CRD.prototype.createDummyWindow = function() {
        this._dummyWindow = new Window_Base(0, 0, 0, 0);
        this.addWindow(this._dummyWindow);
    };

    Scene_CRD.prototype.createHandWindows = function() {
        this._handWindows = [];
        var number = $gameCardData.playerNum();
        this.createHandWindowBottom(0);
        switch (number) {
            case 2:
                this.createHandWindowTop(1);
                break;
            case 3:
                this.createHandWindowTop(1);
                this.createHandWindowRight(2);
                break;
            case 4:
            default:
                this.createHandWindowLeft(1);
                this.createHandWindowTop(2);
                this.createHandWindowRight(3);
                break;
        }
        CardGameManager.setHandWindows(this._handWindows);
    };

    Scene_CRD.prototype.createHandWindowBottom = function(index) {
        var ww = FTKR.CRD.layout.width;
        var wh = FTKR.CRD.layout.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = Graphics.boxHeight - wh;
        this._handWindows[index] = new Window_PlayerHand(index, wx, wy, ww, wh, true, 0);
        this._handWindows[index].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[index]);
    };

    Scene_CRD.prototype.createHandWindowLeft = function(index) {
        var wh = FTKR.CRD.layout.width;
        var ww = FTKR.CRD.layout.height;
        var wx = 0;
        var wy = (Graphics.boxHeight - wh) / 2;
        var open = FTKR.CRD.debug.open;
        this._handWindows[index] = new Window_PlayerHandVar(index, wx, wy, ww, wh, open, 1);
        this._handWindows[index].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[index]);
    };

    Scene_CRD.prototype.createHandWindowTop = function(index) {
        var ww = FTKR.CRD.layout.width;
        var wh = FTKR.CRD.layout.height;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = 0;
        var open = FTKR.CRD.debug.open;
        this._handWindows[index] = new Window_PlayerHand(index, wx, wy, ww, wh, open, 2);
        this._handWindows[index].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[index]);
    };

    Scene_CRD.prototype.createHandWindowRight = function(index) {
        var wh = FTKR.CRD.layout.width;
        var ww = FTKR.CRD.layout.height;
        var wx = Graphics.boxWidth - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        var open = FTKR.CRD.debug.open;
        this._handWindows[index] = new Window_PlayerHandVar(index, wx, wy, ww, wh, open, 3);
        this._handWindows[index].setHandler('ok',     this.onSelectOk.bind(this));
        this.addWindow(this._handWindows[index]);
    };

    Scene_CRD.prototype.createActorWindows = function() {
        this._actorWindows = [];
        var number = $gameCardData.playerNum();
        this.createActorWindowBottom(0);
        switch (number) {
            case 2:
                this.createActorWindowTop(1);
                break;
            case 3:
                this.createActorWindowTop(1);
                this.createActorWindowRight(2);
                break;
            case 4:
            default:
                this.createActorWindowLeft(1);
                this.createActorWindowTop(2);
                this.createActorWindowRight(3);
                break;
        }
    };

    Scene_CRD.prototype.createActorWindowSide = function(index, x, y) {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) * x;
        var wy = (Graphics.boxHeight - wh) * y;
        var actor = this.player(index);
        this._actorWindows[index] = new Window_PlayerStatus(actor, index, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[index]);
    };

    Scene_CRD.prototype.createActorWindowBottom = function(index) {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = this._handWindows[index].y - wh;
        var actor = this.player(index);
        this._actorWindows[index] = new Window_PlayerStatus(actor, index, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[index]);
    };

    Scene_CRD.prototype.createActorWindowLeft = function(index) {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[index].x + this._handWindows[index].width;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(index);
        this._actorWindows[index] = new Window_PlayerStatus(actor, index, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[index]);
    };

    Scene_CRD.prototype.createActorWindowTop = function(index) {
        var wh = Window_Base._faceHeight / 2 + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = this._handWindows[index].y + this._handWindows[index].height;
        var actor = this.player(index);
        this._actorWindows[index] = new Window_PlayerStatus(actor, index, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[index]);
    };

    Scene_CRD.prototype.createActorWindowRight = function(index) {
        var wh = Window_Base._faceHeight + this._dummyWindow.standardPadding() * 2;
        var ww = Window_Base._faceHeight / 2+ this._dummyWindow.standardPadding() * 2;
        var wx = this._handWindows[index].x - ww;
        var wy = (Graphics.boxHeight - wh) / 2;
        var actor = this.player(index);
        this._actorWindows[index] = new Window_PlayerStatus(actor, index, wx, wy, ww, wh);
        this.addWindow(this._actorWindows[index]);
    };

    Scene_CRD.prototype.createFieldWindows = function() {
        this._fieldWindows = [];
        this._suitIds = {};
        if (CardGameManager.gameType()) {
            $gameCardData.suits().forEach( function(suit, i){
                this.createFieldWindow(i);
                this._suitIds[suit] = i;
            },this);
        }
    };

    Scene_CRD.prototype.suitId = function(suit) {
        return this._suitIds[suit];
    };

    Scene_CRD.prototype.createFieldWindow = function(index) {
        var ww = FTKR.CRD.layout.width;
        var wh = (Graphics.boxHeight - FTKR.CRD.layout.height * 2) / $gameCardData.suits().length;
        var wx = (Graphics.boxWidth - ww) / 2;
        var wy = wh * index + FTKR.CRD.layout.height;
        this._fieldWindows[index] = new Window_PlayerHand(index, wx, wy, ww, wh, true, 0);
        this.addWindow(this._fieldWindows[index]);
    };

    Scene_CRD.prototype.createDialogueWindows = function() {
        this._dialogueWindows = [];
        var number = $gameCardData.playerNum();
        this.createDialogueWindow(0);
        if (number > 1) this.createDialogueWindow(1);
        if (number > 2) this.createDialogueWindow(2);
        if (number > 3) this.createDialogueWindow(3);
    };

    Scene_CRD.prototype.createDialogueWindow = function(index) {
        this._dialogueWindows[index] = new Window_Dialogue(this._actorWindows[index]);
        this.addWindow(this._dialogueWindows[index]);
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
        this._commandBoxWindow.setHandler('sort', this.onShuffle.bind(this));
        this.addWindow(this._commandBoxWindow);
    };

    Scene_CRD.prototype.createMessageWindow = function() {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
        this._messageWindow.subWindows().forEach(function(window) {
            this.addWindow(window);
        }, this);
    };

    Scene_CRD.prototype.onTurnEnd = function() {
        this._commandBoxWindow.deselect();
        this._commandBoxWindow.hide();
        CardGameManager._turnCount++;
        CardGameManager.increaseTurn();
        this.shiftIndex();
        this.refreshActor();
        this._phase = 'turnStart';
    };

    Scene_CRD.prototype.onShuffle = function() {
        this._commandBoxWindow.deselect();
        this._commandBoxWindow.hide();
        this._input = 'sortSelect';
        this.subjectWindow().activate();
        this.subjectWindow().select(0);
    }; 

    Scene_CRD.prototype.onSelectOk = function() {
        this.inputAction();
    };

    Scene_CRD.prototype.inputAction = function() {
        this._messageBoxWindow.clearText();
        this.resetTempFace();
        this.resetDialogue();
        switch (this._input) {
            case 'select':
                this.inputSelect();
                break;
            case 'dispair':
                this._input = 'select';
                this._phase = 'checkPair';
                SoundManager.playOk();
                break;
            case 'sortSelect':
                var index = this.subjectWindow().index();
                this._hand = this.subjectWindow()._hand[index];
                this._sortHoldId = index;
                this.subjectWindow().setHoldId(index);
                this.subjectWindow().activate();
                this._input = 'sortEnd';
                break;
            case 'sortEnd':
                var index = this.subjectWindow().index();
                if (index === this._sortHoldId) this._hand.up = !this._hand.up;
                this._input = 'select';
                this.showCommand();
                break;
            case 'sortCancel':
                this._input = 'select';
                this.showCommand();
                break;
        }
    };

    Scene_CRD.prototype.inputSelect = function() {
        var cardId = this.targetId();
        this._input = 'draw';
        this._handIndex = this.selectCard(cardId, true);
        AudioManager.playSe(FTKR.CRD.sound.drawSe);
    };

    Scene_CRD.prototype.showCommand = function() {
        this.subjectWindow().deselect();
        this.subjectWindow().refresh();
        this.subjectWindow().resetHoldId();
        this._commandBoxWindow.show();
        this._commandBoxWindow.activate();
        this._commandBoxWindow.select(0);
    };

    Scene_CRD.prototype.onMessageOk = function() {
        this._messageBoxWindow.clearText();
        switch (this._input) {
            case 'setEnd':
                CardGameManager.replayBgmAndBgs();
                this.popScene();
                break;
            case 'nextGame':
                this.nextGame();
                break;
            case 'start':
                this.gameStart();
                break;
        }
    };

    Scene_CRD.prototype.nextGame = function() {
        this.clearGame();
        this.clearHands();
        this.clearRanks();
        this.settingGame();
        this._messageBoxWindow.activate();
        this._input = 'start';
    };

    Scene_CRD.prototype.clearHands = function() {
        this._handWindows.forEach( function(window){
            window.clearHand();
        });
    };

    Scene_CRD.prototype.clearRanks = function() {
        this._actorWindows.forEach( function(window){
            window.setRank(0);
        });
    };

    Scene_CRD.prototype.gameStart = function() {
        CardGameManager._turnCount = 1;
        this._phase = 'turnStart';
    };
    
    //------------------------------------------------------------------------
    // メイン処理
    //------------------------------------------------------------------------
    Scene_CRD.prototype.update = function() {
        this.updatePhase();
        Scene_MenuBase.prototype.update.call(this);
    };

    Scene_CRD.prototype.isBusy = function() {
        return this.isCardMoving() || $gameMessage.isBusy();
    };

    Scene_CRD.prototype.isCardMoving = function() {
        return this._handWindows.some( function(window){
            return window.isBusy();
        });
    };

    Scene_CRD.prototype.updateTouch = function() {
        if (this.isBusy()) return false;
        if (this._phase === 'input' && TouchInput.isTriggered()) {
            switch (this._input) {
                case 'setEnd':
                case 'nextGame':
                case 'start':
                    SceneManager._scene.onMessageOk();
                    return true;
            }
        }
        return false;
    };

    Scene_CRD.prototype.updateEvent = function() {
        return CardGameManager.updateEvent(this._phase);
    };

    Scene_CRD.prototype.updatePhase = function() {
        this.updateTouch();
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
                case 'deal':
                    this.updateDeal();
                    break;
                case 'turnStart':
                    this.updateTurnStart();
                    break;
                case 'input':
                    this.updateInput();
                    break;
                case 'select':
                    this.updateSelect();
                    break;
                case 'draw':
                    this.updateDraw();
                    break;
                case 'checkPair':
                    this.subjectWindow().checkPair();
                    this._phase = 'disCard';
                    break;
                case 'disCard':
                    this.updateDiscard();
                    break;
                case 'turnEnd':
                    this.updateTurnEnd();
                    break;
                case 'nextGame':
                    this._messageBoxWindow.clearText();
                    this._messageBoxWindow.activate();
                    this._phase = 'input';
                    this._input = 'nextGame';
                    break;
                case 'setEnd':
                    this._messageBoxWindow.clearText();
                    this._messageBoxWindow.activate();
                    this._phase = 'input';
                    this._input = 'setEnd';
                    break;
            }
        }
    };

    Scene_CRD.prototype.checkAllPairCard = function() {
        if (CardGameManager.gameType()) return false;
        return this._handWindows.some( function(window){
            return window.hasPair().length;
        });
    };

    Scene_CRD.prototype.updateDeal = function() {
        if (this.stockNum()) {
            var hand = this.stock().shift();
            if (this._subjectId === this._startId) AudioManager.playSe(FTKR.CRD.sound.dealSe);
            this.subjectWindow().pushHand(hand.suit, hand.rank, false, FTKR.CRD.game.dealSpeed);
            this.shiftSubject();
        } else if (this.checkAllPairCard()) {
            if (this.subjectWindow()._pair.length) {
                this.subjectWindow().discardPair();
                this.subjectWindow().refreshHand();
                this.checkOutGame(this.subjectId());
                this.shiftSubject();
            } else {
                var pair = this.subjectWindow().hasPair();
                if (pair.length) {
                    this.subjectWindow().picupPair(pair, FTKR.CRD.game.discardSpeed);
                } else {
                    this.shiftSubject();
                }
            }
        } else {
            this.setSubjectId(this._startId);
            this.setTarget();
            if (this.checkGameEnd()) return;
            this.refreshActor();
            this._messageBoxWindow.activate();
            this._phase = 'input';
            this._input = 'start';
        }
    };

    Scene_CRD.prototype.updateTurnStart = function() {
        if (this._subjectId === 0) {
            this.targetWindow().activate();
            this.targetWindow().select(0);
            this._phase = 'input';
            this._input = 'select';
        } else {
            this._phase = 'select';
        }
    };

    Scene_CRD.prototype.updateInput = function() {
        switch (this._input) {
            case 'draw':
                var hand = this.reduceCard(this.targetId(), this._handIndex);
                var holdId = this.subjectWindow().cardNum();
                this.subjectWindow().addHand(holdId, hand.suit, hand.rank);
                this.subjectWindow().setHoldId(holdId);
                if (this.checkGameEnd()) return;
                this.targetWindow().deselect();
                this.targetWindow().refresh();
                this.subjectWindow().activate();
                this.subjectWindow().select(holdId);
                this._input = 'dispair';
                break;
        }
    };

    Scene_CRD.prototype.updateTurnEnd = function() {
        this.checkOutGame(this.subjectId());
        this.subjectWindow().deselect();
        if (this.checkGameEnd()) return;
        if (this._subjectId === 0) {
            this._hand = null;
            this._phase = 'input';
            this.showCommand();
        } else {
            this.shiftIndex();
            this.refreshActor();
            this._hand = null;
            CardGameManager._turnCount++;
            CardGameManager.increaseTurn();
            this._phase = 'turnStart';
        }
    };
    
    Scene_CRD.prototype.updateSelect = function() {
        this._messageBoxWindow.clearText();
        switch (CardGameManager.gameType()) {
            case 1:
                var cardId = this.subjectId();
                this._phase = 'discard';
                break;
            case 0:
                var cardId = this.targetId();
                this._phase = 'draw';
                break;
        }
        this._handIndex = this.selectCard(cardId, false);
        AudioManager.playSe(FTKR.CRD.sound.drawSe);
    };

    Scene_CRD.prototype.updateDraw = function() {
        this.resetTempFace();
        this.resetDialogue();
        this._messageBoxWindow.clearText();
        this._hand = this.reduceCard(this.targetId(), this._handIndex);
        this.addHand(this.subjectId(), this._hand);
        this._phase = 'checkPair';
    };

    Scene_CRD.prototype.updateDiscard = function() {
        this.subjectWindow().discardPair();
        this.subjectWindow().refreshHand();
        this._phase = 'turnEnd';
    };

    Scene_CRD.prototype.refreshActor = function() {
        this._actorWindows.forEach(function(window){
            window.refresh();
        });
    };

    Scene_CRD.prototype.resetTempFace = function() {
        this._actorWindows.forEach(function(window){
            window.resetTempFace();
        });
    };

    Scene_CRD.prototype.resetDialogue = function() {
        this._dialogueWindows.forEach(function(window){
            window.setDialogue('');
        });
    };

    Scene_CRD.prototype.checkGameEnd = function() {
        if (this.remainingNum() === 1) {
            this._endPeople++;
            this.setGameOutPoint(this.lastPlayer());
            this._actorWindows[this.lastPlayer()].setRank(this._endPeople);
            if (this._gameCount >= variableId('gameCount')) {
                this._phase = 'setEnd';
                this.setEnd();
            } else {
                this.gameEnd();
                this._phase = 'nextGame';
                this._gameCount++;
            }
            this._messageBoxWindow.setText('ゲーム終了です');
            this._messageBoxWindow.activate();
            return true;
        }
    };

    Scene_CRD.prototype.addHand = function(index, hand) {
        var window = this._handWindows[index];
        var handIndex = this.putinNPCHand();
        window.addHand(handIndex, hand.suit, hand.rank);
        window.pushoutNPCHand();
        var faceIndex = window.changeTempFace(hand);
        if (faceIndex >= 0) this._actorWindows[index].setTempFace(faceIndex);
        var logText = window.setDialogue(hand);
        if (logText) this._dialogueWindows[index].setDialogue(logText);
    };

    Scene_CRD.prototype.putinNPCHand = function() {
        var handIndex = null;
        var hands = setArrNum(0, this.subjectWindow().cardNum() + 1);
        if (switchId('chara')) {
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
        }
        return hands[Math.randomInt(hands.length)];
    };

    Scene_CRD.prototype.selectCard = function(index, isPlayer) {
        var window = this._handWindows[index];
        var handIndex = isPlayer ? window.index() :
            this.drawNPCHand();
        window.moveCardUp(handIndex);
        return handIndex;
    };

    Scene_CRD.prototype.checkOutGame = function(subjectId) {
        var window = this._handWindows[subjectId];
        if (!window.cardNum()) {
            this._endPeople++;
            this.setGameOutPoint(subjectId);
            this._actorWindows[subjectId].setRank(this._endPeople);
            this.refreshRoute(subjectId);
            return true;
        }
        return false;
    };

    Scene_CRD.prototype.reduceCard = function(index, handIndex) {
        var window = this._handWindows[index];
        var hand = window.reduceHand(handIndex);
        this.checkOutGame(index);
        return hand;
    };

    Scene_CRD.prototype.reduceHand = function(index, isPlayer) {
        var window = this._handWindows[index];
        var handIndex = isPlayer ? window.index() :
            this.drawNPCHand();
        var hand = window.reduceHand(handIndex);
        this.checkOutGame(index);
        return hand;
    };

    Scene_CRD.prototype.drawNPCHand = function() {
        var handIndex = null;
        var hands = this.targetWindow()._hand.clone();
        if (switchId('chara')) {
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
                            return hand && hand.up;
                        });
                        break;
                    case Scene_CRD.NOT_DRAW_PICKUP:
                        hands = hands.filter(function(hand){
                            return hand && !hand.up;
                        });
                        break;
                };
                if (!hands.length) {
                    hands = lastHands.clone();
                } else {
                    lastHands = hands.clone();
                }
            },this);
        }
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

    //=============================================================================
    // Window_PlayerHand
    // 手札ウィンドウ
    //=============================================================================

    function Window_PlayerHand() {
        this.initialize.apply(this, arguments);
    }

    Window_PlayerHand.prototype = Object.create(Window_Selectable.prototype);
    Window_PlayerHand.prototype.constructor = Window_PlayerHand;

    Window_PlayerHand.prototype.initialize = function(playerId, x, y, width, height, isPlayer, position) {
        this._playerId = playerId;
        this._isPlayer = isPlayer;
        this._position = position;
        this.clearHand();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setCardSize();
        this.refresh();
    };

    Window_PlayerHand.prototype.clearHand = function() {
        this._hand = [];
        this._pair = [];
        this._holdId = -1;
        this.removeAllSprites();
    };

    Window_PlayerHand.prototype.removeAllSprites = function() {
        if (this._sprites && this._sprites.length) {
            this._sprites.forEach( function(sprite){
                this.removeChild(sprite);
            },this);
        }
        this._sprites = [];
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
        return ImageManager.reservePicture(FTKR.CRD.image.joker).width;
    };

    Window_Base.prototype.standardCardHeight = function() {
        return ImageManager.reservePicture(FTKR.CRD.image.joker).height;
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
        return this._hand.length === 1 && this._hand[0] === null ?
            0 : this._hand.length;
    };

    Window_PlayerHand.prototype.maxCols = function() {
        return this._hand.length;
    };

    Window_PlayerHand.prototype.maxItems = function() {
        return this._hand.length;
    };

    Window_PlayerHand.prototype.pushHand = function(suit, rank, up, speed) {
        this.addHand(this.cardNum(), suit, rank, up, speed);
    };

    Window_PlayerHand.prototype.addHand = function(index, suit, rank, up, speed) {
        var card = {suit:suit, rank:rank, up:up || false, front:this._isPlayer};
        this._hand.splice(index, 0, card);
        var sprite = this._sprites[index];
        if (!sprite) {
            sprite = new Sprite_Card(card, this._position);
            this._sprites[index] = sprite;
            sprite.setCardSize(this.itemWidth(), this.itemHeight());
            sprite.setScale(this.cardScale());
            this.addChild(sprite);
        } else {
            sprite.setCard(card, this._position);
        }
        var offsetX = 0, offsetY = 0;
        sprite.resetOffset();
        if (FTKR.CRD.game.drawSpeed) {
            var height = FTKR.CRD.game.drawHeight;
            if (this._position % 2) {
                offsetX = Math.pow(-1, Math.floor((this._position - 1)/2)) * height;
            } else {
                offsetY = -1 * Math.pow(-1, Math.floor(this._position/2)) * height;
            }
            sprite.setOffset(offsetX, offsetY);
            sprite.moveCardDown(speed);
        }
        this.refreshHand();
    };

    Window_PlayerHand.prototype.moveCardUp = function(index, speed) {
        var sprite = this._sprites[index];
        if (!sprite) return;
        sprite.resetOffset();
        sprite.moveCardUp(speed);
    };

    Window_PlayerHand.prototype.reduceHand = function(index) {
        var hand = this._hand[index];
        var sprite = this._sprites[index];
        sprite.resetOffset();
        this._hand.splice(index, 1);
        if (!this._hand.length) this._hand.push(null);
        this.refreshHand();
        return hand;
    };

    Window_PlayerHand.prototype.hasPair = function() {
        var pair = [];
        var count = this._hand.length, i = 0;
        while (count) {
            if (!this._hand.length || this._hand.length <= i) break;
            var rank = this._hand[i].rank;
            if (!this._hand.some( function(hand, n){
                if (hand && i !== n && hand.rank === rank) {
                    pair = [n, i];
                    count = 0;
                    return true;
                }
            },this)) i++;
            if(count) count--;
        };
        return pair;
    };

    Window_PlayerHand.prototype.picupPair = function(pair, speed) {
        this._pair = pair;
        pair.forEach( function(i){
            this.moveCardUp(i, speed);
        },this);
    };

    Window_PlayerHand.prototype.checkPair = function() {
        this.picupPair(this.hasPair());
    };

    Window_PlayerHand.prototype.discardPair = function() {
        this._pair.forEach( function(index){
            this._hand.splice(index, 1);
        },this);
        if (!this._hand.length) this._hand.push(null);
        this._sprites.forEach(function(sprite){
            if(sprite) sprite.resetOffset();
        });
        this._pair = [];
    };

    Window_PlayerHand.prototype.refreshHand = function() {
        this.resetWindowSize();
        this.createContents();
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

    Window_PlayerHand.prototype.drawItem = function(index) {
        var card = this._hand[index];
        if (!card) return;
        var rect = this.itemRect(index);
        this.drawCardImage(index, rect.x, rect.y);
    };

    Window_PlayerHand.prototype.drawCardImage = function(index, dx, dy) {
        var sprite = this._sprites[index];
        if (!sprite) {
            sprite = new Sprite_Card(this._hand[index], this._position);
            this._sprites[index] = sprite;
            sprite.setCardSize(this.itemWidth(), this.itemHeight());
            sprite.setScale(this.cardScale());
            this.addChild(sprite);
        } else {
            sprite.setCard(this._hand[index], this._position);
        }
        sprite.setHome(dx + this.padding, dy + this.padding);
        var opacity = this.active ? 100 : 255;
        sprite.changeOpacity(opacity);
    };

    Window_PlayerHand.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();
            if (this.cardNum() < this._sprites.length) {
                for (var i = this.cardNum(); i < this._sprites.length; i++) {
                    this.removeChild(this._sprites[i]);
                    this._sprites[i] = null;
                }
            }
        }
    };

    Window_PlayerHand.prototype.drawAllItems = function() {
        var topIndex = this.topIndex();
        var maxCards = SceneManager._scene._cardNum;
        var maxNum = Math.min(this.maxPageItems(), maxCards);
        for (var i = 0; i < maxNum; i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
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
                if (i === index && sprite) sprite.changeOpacity(255);
            });
        }
    };

    Window_PlayerHand.prototype.pushoutNPCHand = function() {
        this._hand.forEach(function(hand){
            if (hand) hand.up = false;
        });
        if (!switchId('chara')) return;
        $gameCardData.chara(this._playerId).pushouts.some( function(pushout){
            if (!pushout) return true;
            if (!checkRate(pushout.rate)) return false;
            switch (pushout.type) {
                case Scene_CRD.PUSHOUT_JOKER:
                    this._hand.forEach( function(hand) {
                        if (hand && hand.suit === 'joker') hand.up = true;
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
                        return hand.rank === card.rank && hand.suit !== card.suit;
                    })) faceIndex = face.index;
                    break;
                case Scene_CRD.FACE_NOT_MADE_PAIR:
                    if (this._hand.every( function(hand){
                        return hand.rank !== card.rank && hand.suit !== card.suit;
                    })) faceIndex = face.index;
                    break;
            }
        },this);
        return faceIndex;
    };

    Window_PlayerHand.prototype.setDialogue = function(card) {
        var logText = '';
        $gameCardData.chara(this._playerId).dialogues.some( function(log){
            if (!log) return true;
            if (!checkRate(log.rate)) return false;
            switch (log.type) {
                case Scene_CRD.LOG_DRAW_JOKER:
                    if (card.suit === 'joker') logText = log.text;
                    break;
                case Scene_CRD.LOG_DRAW_NOT_JOKER:
                    if (card.suit !== 'joker') logText = log.text;
                    break;
                case Scene_CRD.LOG_MADE_PAIR:
                    if (this._hand.some(function(hand){
                        return hand.rank === card.rank && hand.suit !== card.suit;
                    })) logText = log.text;
                    break;
                case Scene_CRD.LOG_NOT_MADE_PAIR:
                    if (this._hand.every( function(hand){
                        return hand.rank !== card.rank && hand.suit !== card.suit;
                    })) logText = log.text;
                    break;
            }
        },this);
        return logText;
    };
/*
    Window_PlayerHand.prototype.standardBackOpacity = function() {
        return 0
    };

    Window_PlayerHand.prototype._refreshFrame = function() {
    };
*/
    Window_PlayerHand.prototype.updateArrows = function() {
        this.downArrowVisible = false;
    };

    Window_PlayerHand.prototype.isBusy = function() {
        return this._sprites.some( function(sprite){
            return !!sprite && sprite.isMoving();
        });
    };

    Window_PlayerHand.prototype.playOkSound = function() {
        //SoundManager.playOk();
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

    Window_PlayerStatus.prototype.updateTone = function() {
        if (this._index === SceneManager._scene.subjectId()) {
            var tone = FTKR.CRD.game.subjectTone;
            this.setTone(tone[0], tone[1], tone[2]);
        } else {
            Window_Base.prototype.updateTone.call(this);
        }
    };

    Window_PlayerStatus.prototype.refresh = function() {
        if(this.contents) {
            this.contents.clear();
            var width = this.width - this.padding * 2;
            var height = this.height - this.padding * 2;
            var x = 0, y = 0;
            if (this.width > this.height) {
                width /= 2;
                x += width;
            } else {
                y += width;
            }
            this.drawActorFace(this._actor, 0, 0, width);
            this.drawPlayerName(x, y, width);
            if (this.rank()) {
                this.drawText(this.rank(), x, y + this.lineHeight(), width, 'center');
            } else {
                var point = $gameCardData.playerPoint(this._index);
                this.drawText(point, x, y + this.lineHeight(), width, 'right');
            }
        }
    };

    Window_PlayerStatus.prototype.drawRect = function(x, y, width, thick, color1, color2, opacity) {
        color2 = color2 || color1;
        this.contents.paintOpacity = opacity || 255;
        this.contents.gradientFillRect(x, y, width, thick, color1, color2);
        this.contents.paintOpacity = 255;
    };

    Window_PlayerStatus.prototype.drawPlayerName = function(x, y, width) {
        if (this._index === SceneManager._scene.subjectId()) {
            this.changeTextColor(this.textColor(FTKR.CRD.game.subjectColor));
        } else if (this._index === SceneManager._scene.targetId()) {
            this.changeTextColor(this.textColor(FTKR.CRD.game.targetColor));
        }
        this.drawText(this._actor.name(), x, y, width, 'center');
        this.resetTextColor();
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
        var faceIndex = this._tempFaceIndex >= 0 && switchId('faces') ? this._tempFaceIndex : actor.faceIndex();
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
                        return hand && hand.suit === 'joker';
                    })) this._tempFaceIndex = face.index;
                    break;
                case Scene_CRD.FACE_NOT_HAS_JOKER:
                    if (hands.every( function(hand) {
                        return hand && hand.suit !== 'joker';
                    })) this._tempFaceIndex = face.index;
                    break;
            }
        },this);
        this.refresh();
    };

    //=============================================================================
    // Window_Dialogue
    // 台詞ウィンドウ
    //=============================================================================

    function Window_Dialogue() {
        this.initialize.apply(this, arguments);
    }

    Window_Dialogue.prototype = Object.create(Window_Base.prototype);
    Window_Dialogue.prototype.constructor = Window_Dialogue;

    Window_Dialogue.prototype.initialize = function(window) {
        this._window = window;
        this._text = '';
        var log = FTKR.CRD.layout.dialogue;
        var ww = log.width;
        var wh = log.height;
        var wx = this._window.x + this._window.width / 2 - ww / 2;
        var wy = this._window.y - wh - log.offsetY;
        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this._windowPauseSignSprite.y += log.offsetY;
        this.hide();
    };

    Window_Dialogue.prototype.setDialogue = function(text) {
        this._text = text;
        if (switchId('dialogue')) this.refresh();
    };

    Window_Dialogue.prototype.refresh = function() {
        this.contents.clear();
        this.drawText(this._text, 0, 0, this.width - this.padding * 2);
        if (this._text) {
            this.show()
        } else {
            this.hide();
        };
    };

    var _CRD_Window_Dialogue_updatePauseSign = Window_Dialogue.prototype._updatePauseSign;
    Window_Dialogue.prototype._updatePauseSign = function() {
        _CRD_Window_Dialogue_updatePauseSign.call(this);
        if (this.visible) this._windowPauseSignSprite.alpha = 1.0;
    };

    var _CRD_Window_Base_loadWindowskin = Window_Dialogue.prototype.loadWindowskin;
    Window_Dialogue.prototype.loadWindowskin = function() {
        var skin = FTKR.CRD.layout.dialogue.skin;
        if (skin) {
            this.windowskin = ImageManager.loadSystem(skin);
        } else {
            _CRD_Window_Base_loadWindowskin.call(this);
        }
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
        this._text = '';
        this.hide();
    };

    Window_MessageBox.prototype.setText = function(text) {
        this._text = text;
        this.refresh();
    };

    Window_MessageBox.prototype.clearText = function() {
        this._text = '';
        this.refresh();
    };

    Window_MessageBox.prototype.refresh = function() {
        if (this._text) {
            this.contents.clear();
            this.drawText(this._text, 0, 0, this.width - this.padding * 2, 'center');
            this.show();
        } else {
            this.hide();
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
        var cmd = FTKR.CRD.command;
        this.addCommand(cmd.turnEnd, 'turnEnd', true);
        this.addCommand(cmd.sort, 'sort', true);
    };

    //=============================================================================
    // Sprite_Card
    // カード用スプライト
    //=============================================================================

    function Sprite_Card() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Card.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Card.prototype.constructor = Sprite_Card;

    Sprite_Card.prototype.initialize = function(card, direction) {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers();
        this.setCard(card, direction);
    };

    Sprite_Card.prototype.initMembers = function() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._card = null;
        this._cardName = null;
        this._direction = 0;
        this._homeX = 0;
        this._homeY = 0;
        this._cardWidth = 0;
        this._cardHeight = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._offsetX2 = 0;
        this._offsetY2 = 0;
        this._targetOffsetX = NaN;
        this._targetOffsetY = NaN;
        this._movementDuration = 0;
        this._selectionEffectCount = 0;
        this.createMainSprite();
        this.setDrawSpeed();
    };
    
    Sprite_Card.prototype.setDrawSpeed = function() {
        this._drawSpeed = !FTKR.CRD.setting.drawSpeed ? 
            FTKR.CRD.game.drawSpeed :
            variableId('drawSpeed');
    };

    Sprite_Card.prototype.createMainSprite = function() {
        this._mainSprite = new Sprite_Base();
        this._mainSprite.anchor.x = 0.5;
        this._mainSprite.anchor.y = 1;
        this.addChild(this._mainSprite);
        this._effectTarget = this._mainSprite;
    };

    Sprite_Card.prototype.setCard = function(card, direction) {
        this._card = card;
        this._direction = direction || 0;
    };

    Sprite_Card.prototype.setHome = function(x, y) {
        this._homeX = x;
        this._homeY = y;
        this.updatePosition();
    };

    Sprite_Card.prototype.resetOffset = function() {
        this._offsetX = 0;
        this._offsetY = 0;
        this._targetOffsetX = 0;
        this._targetOffsetY = 0;
        this._offsetX2 = 0;
        this._offsetY2 = 0;
    };

    Sprite_Card.prototype.setOffset = function(x, y) {
        this._offsetX2 = x;
        this._offsetY2 = y;
        this.updatePosition();
    };

    Sprite_Card.prototype.setScale = function(scale) {
        this.scale.x = scale;
        this.scale.y = scale;
    };

    Sprite_Card.prototype.setCardSize = function(width, height) {
        this._cardWidth = width;
        this._cardHeight = height;
    };

    Sprite_Card.prototype.changeOpacity = function(opacity) {
        this._mainSprite.opacity = opacity;
    };

    Sprite_Card.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        if (this._card) {
            this.updateMain();
        } else {
            this.bitmap = null;
        }
    };

    Sprite_Card.prototype.updateMain = function() {
        this.updateBitmap();
        this.updateDirection();
        this.updateMove();
        this.updatePosition();
    };

    Sprite_Card.prototype.updateBitmap = function() {
        if (this._card) {
            var name = this._card.front ?
                FTKR.CRD.image[this._card.suit].format(this._card.rank.padZero(2)) :
                FTKR.CRD.image.back;
            if (this._cardName !== name) {
                this._cardName = name;
                this._mainSprite.bitmap = ImageManager.reservePicture(name);
            }
        } else {
            this._mainSprite.bitmap = null;
        }
    };

    Sprite_Card.prototype.updateDirection = function() {
        if (!this._card) return;
        if (this._direction * Math.PI / 2 !== this._mainSprite.rotation) {
            this._mainSprite.rotation = this._direction * Math.PI / 2;
        }
    };

    Sprite_Card.prototype.moveCardUp = function(speed) {
        var len = FTKR.CRD.game.drawHeight;
        this._movementDuration = speed ? speed : this._drawSpeed;
        if (this._movementDuration) {
            if (this._direction % 2) {
                this._targetOffsetX = Math.pow(-1, Math.floor((this._direction - 1)/2)) * len;
                this._targetOffsetY = 0;
            } else {
                this._targetOffsetY = -1 * Math.pow(-1, Math.floor(this._direction/2)) * len;
                this._targetOffsetX = 0;
            }
        }
    };

    Sprite_Card.prototype.moveCardDown = function(speed) {
        var len = FTKR.CRD.game.drawHeight;
        this._movementDuration = speed ? speed : this._drawSpeed;
        if (this._movementDuration) {
            if (this._direction % 2) {
                this._targetOffsetX = -1 * Math.pow(-1, Math.floor((this._direction - 1)/2)) * len;
                this._targetOffsetY = 0;
            } else {
                this._targetOffsetY = Math.pow(-1, Math.floor(this._direction/2)) * len;
                this._targetOffsetX = 0;
            }
        }
    };

    Sprite_Card.prototype.updateMove = function() {
        var bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            if (this._movementDuration > 0) {
                var d = this._movementDuration;
                this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
                this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
                this._movementDuration--;
                if (this._movementDuration === 0) {
                    this.onMoveEnd();
                }
            }
        }
    };

    Sprite_Card.prototype.updatePosition = function() {
        var pushoutX = 0;
        var pushoutY = 0;
        if (this._card && this._card.up) {
            if (this._direction % 2) {
                pushoutX = Math.pow(-1, Math.floor((this._direction - 1)/2)) * 8;
            } else {
                pushoutY = Math.pow(-1, Math.floor(this._direction/2)) * 8;
            }
        }
        var cardWidth = this._cardWidth;
        var cardHeight = this._cardHeight;
        if (this._direction % 2) {
            cardHeight /= 2;
            cardWidth = cardWidth * Math.floor((this._direction - 1)/2);
        } else {
            cardWidth /= 2;
            cardHeight -= cardHeight * Math.floor(this._direction/2)
        }
        this.x = this._homeX + this._offsetX - pushoutX + cardWidth + this._offsetX2;
        this.y = this._homeY + this._offsetY - pushoutY + cardHeight + this._offsetY2;
    };

    Sprite_Card.prototype.updateAnimation = function() {
        this.setupAnimation();
    };

    Sprite_Card.prototype.updateSelectionEffect = function() {
        var target = this._effectTarget;
        if (this._card.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 64]);
            } else {
                target.setBlendColor([0, 0, 0, 0]);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor([0, 0, 0, 0]);
        }
    };

    Sprite_Card.prototype.setupAnimation = function() {
        while (this._card.isAnimationRequested()) {
            var data = this._card.shiftAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
            for (var i = 0; i < this._animationSprites.length; i++) {
                var sprite = this._animationSprites[i];
                sprite.visible = this._card.isSpriteVisible();
            }
        }
    };

    Sprite_Card.prototype.startMove = function(x, y, duration) {
        if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
            this._targetOffsetX = x;
            this._targetOffsetY = y;
            this._movementDuration = duration;
            if (duration === 0) {
                this._offsetX = x;
                this._offsetY = y;
            }
        }
    };

    Sprite_Card.prototype.onMoveEnd = function() {
    };

    Sprite_Card.prototype.isEffecting = function() {
        return false;
    };

    Sprite_Card.prototype.isMoving = function() {
        return this._movementDuration > 0;
    };

    Sprite_Card.prototype.inHomePosition = function() {
        return this._offsetX === 0 && this._offsetY === 0;
    };

}());//EOF
