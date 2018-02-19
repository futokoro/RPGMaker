//=============================================================================
// バトルイベントを拡張するプラグイン
// FTKR_ExBattleEvent.js
// 作成者     : フトコロ
// 作成日     : 2017/05/25
// 最終更新日 : 2018/02/19
// バージョン : v1.3.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EBE = true;

var FTKR = FTKR || {};
FTKR.EBE = FTKR.EBE || {};

/*:
 * @plugindesc v1.3.3 バトルイベントを拡張するプラグイン
 * @author フトコロ
 * 
 * @param Battle Event
 * @desc 戦闘中に実行するコモンイベントID
 * 0 - 実行しない、カンマ(,)で区切って複数設定できます
 * @default 
 * 
 * @param --勝利時イベント--
 * @desc 
 * 
 * @param Custom Victory Event
 * @desc 戦闘勝利時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @default 0
 * 
 * @param Victory Event
 * @desc 戦闘勝利時に実行するコモンイベントID
 * 0 - 実行しない
 * @default 
 * 
 * @param --敗北時イベント--
 * @desc 
 * 
 * @param Custom Defeat Event
 * @desc 戦闘敗北時の処理を変更できるようにするか
 * 0 - 変更しない, 1 - 変更する
 * @default 0
 * 
 * @param Defeat Event
 * @desc 戦闘敗北時に実行するコモンイベントID
 * 0 - 実行しない
 * @default 
 * 
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、バトルイベントを拡張します。
 * 
 * １．戦闘勝利時の処理(*1)の前に、コモンイベントまたは敵グループに
 * 　　設定したイベントを実行します。
 * 
 * ２．戦闘敗北時の処理(*1)の前に、コモンイベントまたは敵グループに
 * 　　設定したイベントを実行します。
 * 
 * ３．バトル中に、バトルイベントとしてコモンイベントを実行します。
 * 
 * (*1)戦闘終了時のステートの解除から、勝利等のメッセージ、戦闘報酬の処理など
 * 
 * 
 * 戦闘終了時のイベントの処理が終了すると、バトル画面が終了します。
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
 * 戦闘勝利時のイベントの設定
 *-----------------------------------------------------------------------------
 * 戦闘勝利時の処理の前に、コモンイベントまたは敵グループに
 * 設定したイベントを実行します。
 * 
 * 実行するイベントは以下のいずれかです。
 * １．プラグインパラメータ<Victory Event>に設定したIDのコモンイベント
 * ２．敵グループのバトルイベントで、注釈で<EBE_戦闘勝利時>と記入したページ
 * 
 * １と２どちらもある場合は、バトルイベントを実行します。
 * 
 * バトルイベント内では、this._eventId で敵グループIdを取得できます。
 * 
 *-----------------------------------------------------------------------------
 * 戦闘勝利時の処理について
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Custom Victory Event>を 1 に設定していると
 * 戦闘終了時の処理を独自に設定することができます。
 * 
 * 通常、戦闘勝利時には以下の処理を実行しています。
 * 独自処理にする場合、これらの処理が必要な場合はイベント内で実行しなくては
 * いけません。
 * 
 * １．戦闘終了時のステート解除
 * パーティー内に、戦闘終了時に解除されるステートを受けている場合に
 * それを解除します。
 * 
 * プラグインコマンド
 * 　EBE_戦闘終了時ステート解除
 * 　EBE_REMOVE_BATTLE_STATES
 * 
 * 
 * ２．勝利モーションの実行
 * パーティーメンバーが、戦闘勝利モーションを実行します。
 * 
 * プラグインコマンド
 * 　EBE_勝利モーション実行
 * 　EBE_PREFORM_VICTORY
 * 
 * 
 * ３．勝利MEの演奏
 * データベースの[システム]-[音楽]で設定した勝利MEを演奏します。
 * 
 * プラグインコマンド
 * 　EBE_勝利ME演奏
 * 　EBE_PLAY_VICTORY_ME
 * 
 * 
 * ４．BGMBGSの再開
 * 戦闘前のBGMとBGSを再開します。
 * 
 * プラグインコマンド
 * 　EBE_BGMBGS再開
 * 　EBE_REPLAY_BGM_AND_BGS
 * 
 * 
 * ５．戦闘報酬の計算
 * 経験値やお金、アイテムの計算を行います。
 * 入手するアイテムはこのコマンドで選定されます。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬計算
 * 　EBE_MAKE_REWARDS
 * 
 * 
 * ６．勝利メッセージの表示
 * データベースの[用語]-[メッセージ]で設定した勝利メッセージを表示します。
 * 半角スペースを空けて"-s"を付けると、メッセージを閉じるまでイベント処理を
 * 止めます。
 * 
 * プラグインコマンド
 * 　EBE_勝利メッセージ表示 (-s)
 * 　EBE_DISPLAY_VICTORY_MESSAGE (-s)
 * 
 * 
 * ７．戦闘報酬の表示
 * 戦闘報酬の計算結果に合わせて、データベースの[用語]-[メッセージ]で設定した
 * メッセージを表示します。
 * 半角スペースを空けて"-s"を付けると、メッセージを閉じるまでイベント処理を
 * 止めます。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬表示 (-s)
 * 　EBE_DISPLAY_REWARDS (-s)
 * 
 * 　
 * ８．戦闘報酬の入手
 * 戦闘報酬の計算結果をパーティーメンバーに反映します。
 * このコマンドを実行しないと、経験値やお金アイテムは実際に入手できません。
 * 
 * プラグインコマンド
 * 　EBE_戦闘報酬入手
 * 　EBE_GAIN_REWARDS
 * 
 * 
 *-----------------------------------------------------------------------------
 * 戦闘敗北時のイベントの設定
 *-----------------------------------------------------------------------------
 * 戦闘敗北時の処理の前に、コモンイベントまたは敵グループに
 * 設定したイベントを実行します。
 * 
 * 実行するイベントは以下のいずれかです。
 * １．プラグインパラメータ<Defeat Event>に設定したIDのコモンイベント
 * ２．敵グループのバトルイベントで、注釈で<EBE_戦闘敗北時>と記入したページ
 * 
 * １と２どちらもある場合は、バトルイベントを実行します。
 * 
 * バトルイベント内では、this._eventId で敵グループIdを取得できます。
 * 
 *-----------------------------------------------------------------------------
 * 戦闘敗北時の処理について
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Custom Defeat Event>を 1 に設定していると
 * 戦闘終了時の処理を独自に設定することができます。
 * 
 * 通常、戦闘敗北時には以下の処理を実行しています。
 * 独自処理にする場合、これらの処理が必要な場合はイベント内で実行しなくては
 * いけません。
 * 
 * １．敗北メッセージの表示
 * データベースの[用語]-[メッセージ]で設定した敗北メッセージを表示します。
 * 半角スペースを空けて"-s"を付けると、メッセージを閉じるまでイベント処理を
 * 止めます。
 * 
 * プラグインコマンド
 * 　EBE_敗北メッセージ表示 (-s)
 * 　EBE_DISPLAY_DEFEAT_MESSAGE (-s)
 * 
 * 
 * ２．敗北MEの演奏
 * データベースの[システム]-[音楽]で設定した敗北MEを演奏します。
 * 
 * プラグインコマンド
 * 　EBE_敗北ME演奏
 * 　EBE_PLAY_DEFEAT_ME
 * 
 * 
 * ３．BGMBGSの再開　または　BGMの停止
 * 戦闘前のBGMとBGSを再開するか、またはBGMを停止します。
 * マップイベントで戦闘の敗北を許可しているかどうかで条件分岐します。
 * 
 * 戦闘の敗北フラグ
 * 　BattleManager._canLose
 * 
 * BGMBGSの再開のプラグインコマンド
 * 　EBE_BGMBGS再開
 * 　EBE_REPLAY_BGM_AND_BGS
 * 
 * BGMの停止のプラグインコマンド
 * 　EBE_BGM停止
 * 　EBE_STOP_BGM
 * 
 * 
 *-----------------------------------------------------------------------------
 * バトル中のコモンイベントについて
 *-----------------------------------------------------------------------------
 * 敵グループに設定するバトルイベントの替わりに、コモンイベントを実行します。
 * 
 * 実行するイベントは以下のとおりです。
 * １．プラグインパラメータ<Battle Event>に設定したIDのコモンイベントの中で
 * 　　実行条件を満たすイベント。
 * 
 * プラグインパラメータ<Battle Event>にはカンマ(,)とハイフン(-)を使うことで
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
 * バトル中のコモンイベントの実行条件の設定
 *-----------------------------------------------------------------------------
 * コモンイベントに以下の注釈を入力することで、実行条件を設定できます。
 * 
 * <スパン: [タイミング]>
 * <SPAN: [TIMING]>
 * 実行回数に関する条件を設定します。
 * スパンを指定しない場合は、この設定を適用します。
 * [タイミング] には以下を入力してください。
 * 　バトル or BATTLE　　 - 戦闘中に１回だけ実行します。
 * 　ターン or TURN　　   - ターン中に１回だけ実行します。
 * 　モーメント or MOMENT - 条件を満たす度に実行します。
 * 
 * 
 * <ターン終了>
 * <TURNEND>
 * ターン終了時に実行します。
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
 * <敵キャラHP: #a b %以下>
 * <ENEMY_HP: #a LESS THAN b %>
 * 指定した敵キャラのHP残量によって実行します。
 * a と b に数値を入力してください。(# と % は半角)
 * a と b の間には必ず半角スペースを入れてください。
 * 　a - 敵キャラの番号(グループに追加した順番)
 * 　b - 残りHPの割合値
 * 　例)
 * 　　<敵キャラHP: #1 50 %以下>
 * 　　<ENEMY_HP: #2 LESS THAN 70 %>
 * 
 * <アクターHP: #a b %以下>
 * <ACTOR_HP: #a LESS THAN b %>
 * 指定したアクターのHP残量によって実行します。
 * a と b に数値を入力してください。
 * a と b の間には必ず半角スペースを入れてください。
 * 　a - アクターID
 * 　b - 残りHPの割合値
 * 　例)
 * 　　<アクターHP: #1 50 %以下>
 * 　　<ACTOR_HP: #2 LESS THAN 70 %>
 * 
 * <スイッチ: a>
 * <SWITCH: a>
 * 指定したスイッチがONの時に実行します。
 * a に数値を入力してください。
 * 　a - スイッチID
 * 
 * <実行条件>
 * 条件式
 * </実行条件>
 * または
 * <Conditions>
 * code
 * </Conditions>
 * 条件式(code)で記述したJavaScript計算式を判定して実行します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * バトルイベント用に以下のプラグインコマンドが使用できます。
 * 
 * １．パーティーメンバーに指定のモーションをとらせる
 * 　EBE_モーション実行 [モーション名] [対象メンバー]
 * 　EBE_REQUEST_MOTION [MOTION NAME] [TARGET MEMBER]
 * 
 * モーション名(MOTION NAME)には以下を入力してください。(要小文字)
 * 　walk, wait, chant, guard, damage, evade, thrust, swing,
 * 　missile, skill, spell, item, escape, victory, dying,
 * 　abnormal, sleep, dead,
 * 対象メンバーには以下を入力してください。
 * 空欄の場合は、すべてのメンバーを対象にします。
 * 　0~ - 先頭を 0番としたときの隊列順
 * 　全員 or ALL - すべてのメンバー
 * 
 * 例)
 * 　EBE_モーション実行 victory 1
 * 　EBE_REQUEST_MOTION wait ALL
 * 
 * 
 * ２．戦闘を再開する
 * 　EBE_戦闘再開
 * 　EBE_RESTART_BATTLE
 * 
 * 勝利イベントや敗北イベントはイベント終了時にバトルが終了しますが
 * このコマンドを実行することで、バトルを再開します。
 * ただし、エネミーが何もいない場合や、アクターが全員戦闘不能な場合は
 * バトルを再開しても、すぐに勝利イベントや敗北イベントを再度実行します。
 * 
 * このコマンドがイベント中常に実行する場合はバトルが終わりません。
 * バトルを終わらせる時に、条件分岐等で再開コマンドを実行しないように
 * イベントを組んでください。
 * 
 * 
 * ３．画面に数字をポップアップさせる
 * 　EBE_数字ポップアップ [スプライト番号] [設定内容]
 * 　EBE_POPUP_NUMBER [SPRITE_NUMBER] [SETTING]
 * 
 * 画面に数字をポップアップさせます。
 * スプライト番号を変えることで、複数の数字を表示できます。
 * 設定内容には以下を入力してください。(順不同)
 * なお、数値には \V[x] でゲーム内変数を指定できます。
 * 　
 * 　画像番号 [数値]
 * 　IMAGENUM [Number]
 * 　- 使用する画像は ダメージポップアップ用の img/system/damage.png です。
 * 　　上から 0番として、指定した列の数字スプライトを使用します。
 * 　　指定しない場合は、0番(白)を使用します。
 * 
 * 　表示内容 [数値]
 * 　VALUE [Number]
 * 　- 入力した数値を画面に表示します。
 * 
 * 　ポップアップ高さ [高さ] [差分]
 * 　POPUP_HEIGHT [Number] [Offset]
 * 　- ポップアップする高さを指定します。
 * 　　高さで、基準の高さを指定します。(デフォルト 40)
 * 　　差分で、桁毎の高さの差を指定します。(デフォルト 0.5)
 * 　　差分は変えたい場合にのみ指定してください。
 * 
 * 　表示時間 [数値]
 * 　DURATION [Number]
 * 　- スプライトを表示している時間を指定します。(デフォルト 30)
 * 　　実際の表示時間は、この値と表示する数字の桁数を掛けた値です。
 * 　　残り時間が10未満になると、画像の透明度が上がり、0で透明になります。
 * 
 * 　表示差 [数値]
 * 　DIFF_COUNT [Number]
 * 　- 数字の桁毎の表示タイミングのずれを指定します。(デフォルト 0)
 * 
 * 　表示座標 [X] [Y]
 * 　POSITION [X] [Y]
 * 　- スプライト画像を表示する位置を指定します。
 * 　　x座標とy座標両方を指定してください。
 * 　
 * 　消去しない
 * 　REMAIN
 * 　- この引数を入力すると透明度が変化せず、画面に表示しつづけます。
 * 
 * 　消去
 * 　ERASE
 * 　- この引数を入力すると、指定したスプライト番号の画像を消します。
 * 　
 * 　例)
 * 　　EBE_数字ポップアップ 1 表示内容 1234 表示座標 100 100
 * 　　EBE_POPUP_NUMBER 1 VALUE 1234 POSITION 100 100
 * 
 * 　　EBE_数字ポップアップ 2 画像番号 1 表示内容 12345 表示座標 100 100 消去しない
 * 　　EBE_POPUP_NUMBER 2 IMAGENUM 1 VALUE 12345 POSITION 100 100 REMAIN
 * 
 * 　　EBE_数字ポップアップ 1 消去
 * 　　EBE_POPUP_NUMBER 1 ERASE
 * 
 * 
 * ４．戦闘行動の設定
 * 　EBE_敵キャラの戦闘行動の設定 [メンバーID]
 * 　EBE_BATTLE_ENEMY_ACTION [MEMBERID]
 * 
 * 　指定の敵キャラの戦闘行動を再設定します。
 * 　敵キャラがターン開始時に行動を設定してからターン中に行動する間に
 * 　このコマンドを実行することで、行動を変えることができます。
 * 
 * 　[メンバーID]の入力内容
 * 　0~ - 最初を 0番として、敵グループに追加した順番で敵キャラを指定します
 * 
 * 　(参考)
 * 　指定の敵キャラが行動済みかどうかを調べるスクリプト
 * 　BattleManager.isActedEnemy(メンバーID)
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
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
 * v1.3.3 - 2018/02/19 : 不具合修正
 *    1. Custom Victory Eventが0の時に、戦闘勝利イベントを実行すると
 *       戦闘勝利回数が2回増加してしまう不具合を修正。
 * 
 * v1.3.2 - 2018/01/13 : 機能追加
 *    1. メッセージ表示関係のプラグインコマンドに、イベント処理を止める機能を追加。
 * 
 * v1.3.1 - 2018/01/12 : 不具合修正
 *    1. 戦闘終了時イベント中にウェイトコマンドを実行すると、アクターの
 *       モーションが正常に再生されない不具合を修正。
 * 
 * v1.3.0 - 2017/06/30 : 機能追加
 *    1. 戦闘終了時のイベントの後に、MVデフォルトの戦闘終了処理を実行する
 *       機能を追加。
 * 
 * v1.2.0 - 2017/06/01 : 機能追加
 *    1. 敵キャラの戦闘行動を再設定するプラグインコマンドを追加。
 * 
 * v1.1.0 - 2017/05/26 : 機能追加
 *    1. バトル中にコモンイベントを実行できる機能を追加。
 *    2. モーション実行コマンドにアクターを対象にできる機能を追加。
 *    3. 画面に数字をポップアップさせるプラグインコマンドを追加。
 * 
 * v1.0.0 - 2017/05/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

var matchTextToRegs = function(test, regs) {
    return regs.some( function(reg){
        return test.match(reg);
    });
};

var readCommentMeta = function(comment, metacodes) {
    if (!comment) return false;
    return metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + '>', 'i');
        return metaReg.test(comment);
    });
};

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

// textを条件式に使える状態に変換する
var convertTextToConditions = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        datas.forEach(function(data, i) {
            result += data;
            if (datas[i+1]) result += ')&&(';
        });
        result = '(' + result + ')';
    }
    return result;
};

var convertEscapeCharacters = function(text) {
    if (text == null) text = '';
    var window = SceneManager._scene._windowLayer.children[0];
    return window ? window.convertEscapeCharacters(text) : text;
};

//=============================================================================
// 自作関数(グローバル)
//=============================================================================

FTKR.gameData = FTKR.gameData || {
    user   :null,
    target :null,
    item   :null,
    number :0,
};

if (!FTKR.setGameData) {
FTKR.setGameData = function(user, target, item, number) {
    FTKR.gameData = {
        user   :user || null,
        target :target || null,
        item   :item || null,
        number :number || 0
    };
};
}

if (!FTKR.evalFormula) {
FTKR.evalFormula = function(formula) {
    var datas = FTKR.gameData;
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = datas.user;
        var b = datas.target;
        var item   = datas.item;
        var number = datas.number;
        if (b) var result = b.result();
        var value = eval(formula);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
}

//=============================================================================
// プラグイン パラメータ
//=============================================================================
var parameters = PluginManager.parameters('FTKR_ExBattleEvent');

FTKR.EBE.battleEvents = splitConvertNumber(parameters['Battle Event']);
FTKR.EBE.battleEnd = {
    customV : Number(parameters['Custom Victory Event'] || 0),
    customD : Number(parameters['Custom Defeat Event'] || 0),
    victory : Number(parameters['Victory Event'] || 0),
    defeat  : Number(parameters['Defeat Event'] || 0),
};

//=============================================================================
// プラグインコマンド
//=============================================================================

Game_Interpreter.prototype.setArgNumber = function(arg) {
    try {
        var arg = convertEscapeCharacters(arg);
        return Number(eval(arg));
    } catch (e) {
        console.error(e);
        return 0;
    }
};

var _EBE_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _EBE_Game_Interpreter_pluginCommand.call(this, command, args);
    if (!command.match(/EBE_(.+)/i)) return;
    command = (RegExp.$1 + '').toUpperCase();
    switch (command) {
        case '戦闘終了時ステート解除':
        case 'REMOVE_BATTLE_STATES':
            $gameParty.removeBattleStates();
            break;
        case '勝利モーション実行':
        case 'PREFORM_VICTORY':
            $gameParty.performVictory();
            break;
        case 'モーション実行':
        case 'REQUEST_MOTION':
            if(!args[1] || args[1] === '全員' || args[1].toUpperCase() === 'ALL') {
                $gameParty.requestMotion(args[0]);
            } else if (Number(args[1]) >= 0) {
                var actor = $gameActors.actor(Number(args[1]));
                if (actor) actor.requestMotion(args[0]);
            }
            break;
        case '勝利ME演奏':
        case 'PLAY_VICTORY_ME':
            BattleManager.playVictoryMe();
            break;
        case '敗北ME演奏':
        case 'PLAY_DEFEAT_ME':
            BattleManager.playDefeatMe();
            break;
        case 'BGMBGS再開':
        case 'REPLAY_BGM_AND_BGS':
            BattleManager.replayBgmAndBgs();
            break;
        case 'BGM停止':
        case 'STOP_BGM':
            AudioManager.stopBgm();
            break;
        case '戦闘報酬計算':
        case 'MAKE_REWARDS':
            BattleManager.makeRewards();
            break;
        case '勝利メッセージ表示':
        case 'DISPLAY_VICTORY_MESSAGE':
            BattleManager.displayVictoryMessage();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '敗北メッセージ表示':
        case 'DISPLAY_DEFEAT_MESSAGE':
            BattleManager.displayDefeatMessage();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '戦闘報酬表示':
        case 'DISPLAY_REWARDS':
            BattleManager.displayRewards();
            if (args[0] === '-s')this.setWaitMode('message');
            break;
        case '戦闘報酬入手':
        case 'GAIN_REWARDS':
            BattleManager.gainRewards();
            break;
        case '戦闘再開':
        case 'RESTART_BATTLE':
            BattleManager._isBattleEndEvent = false;
            BattleManager._checkEbeBattleEvent = false;
            break;
        case '数字ポップアップ':
        case 'POPUP_NUMBER':
            this.setupNumberPopup(args);
            break;
        case '敵キャラの戦闘行動の設定':
        case 'SET_BATTLE_ENEMY_ACTION':
            var memberId = this.setArgNumber(args[0]);
            $gameTroop.members()[memberId].makeActions();
            break;
    }
};

Game_Interpreter.prototype.setupNumberPopup = function(args) {
    var index = this.setArgNumber(args[0]);
    for (var i = 1; i < args.length; i++) {
        var arg = (args[i] + '').toUpperCase();
        switch (arg) {
            case '画像番号':
            case 'IMAGENUM':
                i++;
                var baseRow = this.setArgNumber(args[i]);
                break;
            case '表示内容':
            case 'VALUE':
                i++;
                var value = this.setArgNumber(args[i]);
                break;
            case 'ポップアップ高さ':
            case 'POPUP_HEIGHT':
                i++;
                var height = this.setArgNumber(args[i]);
                if (!isNaN(args[i+1])) {
                    i++;
                    var offsetY = this.setArgNumber(args[i]);
                }
                break;
            case '表示時間':
            case 'DURATION':
                i++;
                var duration = this.setArgNumber(args[i]);
                break;
            case '表示差':
            case 'DIFF_COUNT':
                i++;
                var maxcount = this.setArgNumber(args[i]);
                break;
            case '表示座標':
            case 'POSITION':
                i++;
                var x = this.setArgNumber(args[i]);
                i++;
                var y = this.setArgNumber(args[i]);
                break;
            case '消去しない':
            case 'REMAIN':
                var remain = true;
                break;
            case '消去':
            case 'ERASE':
                BattleManager.eraseNumberPopup(index);
                return ;
        }
    }
    var sprite = BattleManager.setupNumberPopup(index);
    if (!isNaN(baseRow)) sprite.setBaseRow(baseRow);
    if (!isNaN(height)) sprite.setPopupHeight(height, offsetY);
    if (!isNaN(duration)) sprite.setDuration(duration);
    if (!isNaN(maxcount)) sprite.setMaxcount(maxcount);
    if (!isNaN(x) && !isNaN(y))sprite.setPosition(x, y);
    if (remain) sprite.setRemain();
    if (!isNaN(value)) sprite.setValue(value);
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.EBE.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    FTKR.EBE.BattleManager_initMembers.call(this);
    this._checkEbeBattleEvent = false;
    this._battleEndPattern = 0;
    this._numberSprite = [];
    this._isBattleEndEvent = false;
};

var _EBE_Game_Party_requestMotionRefresh = Game_Party.prototype.requestMotionRefresh;
Game_Party.prototype.requestMotionRefresh = function() {
    if (!BattleManager.isBattleEndEvent()) {
        _EBE_Game_Party_requestMotionRefresh.call(this);
    }
};

BattleManager.isBattleEndEvent = function() {
    return $gameParty.inBattle() && this._isBattleEndEvent;
};

FTKR.EBE.BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if (this._checkEbeBattleEvent) {
            switch(this._battleEndPattern) {
                case 0:
                    if (FTKR.EBE.battleEnd.customV) break;
                    FTKR.EBE.BattleManager_processVictory.call(this);
                    return true;
                case 2:
                    if (FTKR.EBE.battleEnd.customD) break;
                    FTKR.EBE.BattleManager_processDefeat.call(this);
                    return true;
            }
            this.endBattle(this._battleEndPattern);
            return true;
        }
    }
    return FTKR.EBE.BattleManager_checkBattleEnd.call(this);
};

FTKR.EBE.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    if (FTKR.EBE.battleEnd.victory && !this._checkEbeBattleEvent) {
        if ($gameTroop.setupEbeBattleEvent('victory', ['EBE_戦闘勝利時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 0;
        }
        return true;
    }
    FTKR.EBE.BattleManager_processVictory.call(this);
};

FTKR.EBE.BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
    if (FTKR.EBE.battleEnd.defeat && !this._checkEbeBattleEvent) {
        if ($gameTroop.setupEbeBattleEvent('defeat', ['EBE_戦闘敗北時'])) {
            this._checkEbeBattleEvent = true;
            this._battleEndPattern = 2;
        }
        return true;
    }
    FTKR.EBE.BattleManager_processDefeat.call(this);
};

BattleManager.setupNumberPopup = function(index) {
    if (!this._numberSprite[index]) {
        var sprite = new Sprite_Number();
        this._numberSprite[index] = sprite;
        this._spriteset._battleField.addChild(this._numberSprite[index]);
    }
    return this._numberSprite[index];
};

BattleManager.eraseNumberPopup = function(index) {
    this._spriteset._battleField.removeChild(this._numberSprite[index]);
    this._numberSprite[index] = {};
};

BattleManager.isActed = function(battler) {
    return !this._actionBattlers.contains(battler);
};

BattleManager.isActedEnemy = function(battlerId) {
    return !this.isActed($gameTroop.members()[battlerId]);
};

BattleManager.isActedActor = function(battlerId) {
    return !this.isActed($gameParty.members()[battlerId]);
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.requestMotion = function(motionName) {
    this.members().forEach(function(actor) {
        if (actor.canMove()) actor.requestMotion(motionName);
    });
};

//=============================================================================
// Game_Troop
//=============================================================================

FTKR.EBE.Game_Troop_clear = Game_Troop.prototype.clear;
Game_Troop.prototype.clear = function() {
    FTKR.EBE.Game_Troop_clear.call(this);
    this._commonEventFlags = [];
};

FTKR.EBE.Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
Game_Troop.prototype.setupBattleEvent = function() {
    FTKR.EBE.Game_Troop_setupBattleEvent.call(this);
    if (!this._interpreter.isRunning()) {
        if (this._interpreter.setupReservedCommonEvent()) {
            return;
        }
        var eventIds = FTKR.EBE.battleEvents;
        for (var i = 0; i < eventIds.length; i++) {
            if (eventIds[i]) {
                var event = $dataCommonEvents[eventIds[i]];
                if (this.meetsCommonEventCommentConditions(event) && !this._commonEventFlags[i]) {
                    this._interpreter.setup(event.list, this.troop().id);
                    if (this.commonEventSpan(event) <= 1) {
                        this._commonEventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    }
};

FTKR.EBE.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    var eventIds = FTKR.EBE.battleEvents;
    for (var i = 0; i < eventIds.length; i++) {
        if (eventIds[i]) {
            var event = $dataCommonEvents[eventIds[i]];
            if (this.commonEventSpan(event) === 1) {
                this._commonEventFlags[i] = false;
            }
        }
    }
    FTKR.EBE.Game_Troop_increaseTurn.call(this);
};

Game_Troop.prototype.setupEbeBattleEvent = function(condition, metacodes) {
    if (!this._interpreter.isRunning()) {
        if (this._interpreter.setupReservedCommonEvent()) {
            return false;
        }
        var pages = this.troop().pages;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (this.meetsPagesCommentConditions(page, metacodes) && !this._eventFlags[i]) {
                this._interpreter.setup(page.list, this.troop().id);
                this._eventFlags[i] = true;
                return true;
            }
        }
        var event = $dataCommonEvents[FTKR.EBE.battleEnd[condition]];
        BattleManager._isBattleEndEvent = true;
        this._interpreter.setup(event.list, this.troop().id);
        return true;
    }
    return false;
};

Game_Troop.prototype.meetsPagesCommentConditions = function(page, metacodes) {
    for (var v = 0; v < page.list.length; v++) {
        var list = page.list[v];
        if (list && ([108, 408].contains(list.code))) {
            return readCommentMeta(list.parameters[0], metacodes);
        }
    }
};

Game_Troop.prototype.commonEventSpan = function(event) {
    for (var v = 0; v < event.list.length; v++) {
        var list = event.list[v];
        if (list && ([108, 408].contains(list.code))) {
            var match = /<([^<>:]+)(:?)([^>]*)>/g.exec(list.parameters[0]);
            switch((match[1] + '').toUpperCase()) {
                case 'スパン':
                case 'SPAN':
                    switch((match[3] + '').toUpperCase()) {
                        case 'バトル':
                        case 'BATTLE':
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

Game_Troop.prototype.meetsCommonEventCommentConditions = function(event) {
    return this.meetsConditions(this.convertCommonEventConditions(event));
};

Game_Troop.prototype.convertCommonEventConditions = function(event) {
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
                    case '敵キャラHP':
                    case 'ENEMY_HP':
                        if (match[2] === ':') {
                            var value = /#(\d+)[ ]*(\d+)[ ]*\%以下/i.exec(match[3]);
                            if (!value) value = /#(\d+)[ ]*less[ ]than[ ]*(\d+)[ ]*\%/i.exec(match[3]);
                            if (value) {
                                conditions.enemyValid = true;
                                conditions.enemyIndex = Number(value[1]);
                                conditions.enemyHp = Number(value[2]);
                            }
                        }
                        break;
                    case 'アクターHP':
                    case 'ACTOR_HP':
                        if (match[2] === ':') {
                            var value = /#(\d+)[ ]*(\d+)[ ]*\%以下/i.exec(match[3]);
                            if (!value) value = /#(\d+)[ ]*less[ ]than[ ]*(\d+)[ ]*\%/i.exec(match[3]);
                            if (value) {
                                conditions.actorValid = true;
                                conditions.actorId = Number(value[1]);
                                conditions.actorHp = Number(value[2]);
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
                    case '/実行条件':
                    case '/CONDITIONS':
                        code = false;
                        break;
                    case '実行条件':
                    case 'CONDITIONS':
                        conditions.customValid = true;
                        conditions.custom = '';
                        code = true;
                        break;
                }
            } else {
                 if (code) conditions.custom += list.parameters[0] + ';';
            }
        }
    }
    var page = {conditions:conditions};
    return page;
};

Game_Troop.prototype.evalConditionsFormula = function(text) {
    var formula = convertTextToConditions(text);
    if (!formula) return true;
    return FTKR.evalFormula(formula);
};

FTKR.EBE.Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
Game_Troop.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    var result = FTKR.EBE.Game_Troop_meetsConditions.call(this, page);
    if (!c.turnEnding && !result) {
        return false;
    }
    if ((c.turnEnding || c.turnValid || c.enemyValid ||
            c.actorValid || c.switchValid) && !result) {
        return false;
    }
    if (c.customValid && !this.evalConditionsFormula(c.custom)) {
        return false;
    }
    return true;
};

//=============================================================================
// Sprite_Number
// 数字をスプライトで表示する
//=============================================================================

function Sprite_Number() {
    this.initialize.apply(this, arguments);
}

Sprite_Number.prototype = Object.create(Sprite.prototype);
Sprite_Number.prototype.constructor = Sprite_Number;

Sprite_Number.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._flashColor = [0, 0, 0, 0];
    this._flashDuration = 0;
    this._damageBitmap = ImageManager.loadSystem('Damage');
    this._remain = false;
    this._duration = 30;
    this._maxcount = 0;
    this._count = 0;
    this._baseRow = 0;
    this._value = 0;
    this._index = 0;
    this._popupHeight = 40;
    this._popupOffsetY = 0.5;
    this._fullDuration = this._duration;
};

Sprite_Number.prototype.setupCriticalEffect = function() {
    this._flashColor = [255, 0, 0, 160];
    this._flashDuration = 60;
};

Sprite_Number.prototype.digitWidth = function() {
    return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
};

Sprite_Number.prototype.digitHeight = function() {
    return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
};

Sprite_Number.prototype.setBaseRow = function(baseRow) {
    this._baseRow = baseRow;
};

Sprite_Number.prototype.setDuration = function(duration) {
    this._duration = duration;
};

Sprite_Number.prototype.setValue = function(value) {
    this._value = value;
    this.resetFullDuration();
};

Sprite_Number.prototype.setMaxcount = function(maxcount) {
    this._maxcount = maxcount;
    this._count = this._maxcount;
};

Sprite_Number.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Sprite_Number.prototype.setRemain = function() {
    this._remain = true;
};

Sprite_Number.prototype.setPopupHeight = function(popupHeight, popupOffsetY) {
    this._popupHeight = popupHeight;
    if(!isNaN(popupOffsetY)) this._popupOffsetY = popupOffsetY;
};

Sprite_Number.prototype.resetFullDuration = function() {
    var string = Math.abs(this._value).toString();
    this._fullDuration = this._duration * string.length;
};

Sprite_Number.prototype.updateOpacity = function() {
    if (this._remain) return;
    if (this._fullDuration < 10) {
        this.opacity = 255 * this._fullDuration / 10;
    }
};

Sprite_Number.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._count >= this._maxcount) {
        this.createDigit(this._index);
        this._index++;
        this._count = 0;
    } else {
        this._count++;
    }
    if (this._fullDuration > 0) {
        this._fullDuration--;
        for (var i = 0; i < this.children.length; i++) {
            this.updateChild(this.children[i]);
        }
    }
    this.updateFlash();
    this.updateOpacity();
};

Sprite_Number.prototype.createChildSprite = function() {
    var sprite = new Sprite();
    sprite.bitmap = this._damageBitmap;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = -this._popupHeight;
    sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
};

Sprite_Number.prototype.createDigit = function(index) {
    var value = this._value;
    var baseRow = this._baseRow;
    var string = Math.abs(value).toString();
    if (index >= string.length) return;
    var row = baseRow + (value < 0 ? 1 : 0);
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    var n = Number(string[index]);
    sprite.setFrame(n * w, row * h, w, h);
    sprite.x = (index - (string.length - 1) / 2) * w;
    sprite.dy = -this._popupOffsetY * 2 * index;
};

Sprite_Number.prototype.updateChild = function(sprite) {
    sprite.dy += this._popupOffsetY;
    sprite.ry += sprite.dy;
    if (sprite.ry >= 0) {
        sprite.ry = 0;
        sprite.dy *= -0.6;
    }
    sprite.y = Math.round(sprite.ry);
    sprite.setBlendColor(this._flashColor);
};

Sprite_Number.prototype.updateFlash = function() {
    if (this._flashDuration > 0) {
        var d = this._flashDuration--;
        this._flashColor[3] *= (d - 1) / d;
    }
};

Sprite_Number.prototype.isPlaying = function() {
    return this._duration > 0;
};

