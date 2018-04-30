//=============================================================================
// 敵味方交互にターンが進むターン制戦闘システムのプラグイン
// FTKR_AlternatingTurnBattle.js
// 作成者     : フトコロ
// 作成日     : 2018/04/08
// 最終更新日 : 2018/04/30
// バージョン : v1.2.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AltTB = true;

var FTKR = FTKR || {};
FTKR.AltTB = FTKR.AltTB || {};

//=============================================================================
/*:
 * @plugindesc v1.2.2 敵味方交互にターンが進むターン制戦闘システム
 * @author フトコロ
 *
 * @param TurnEnd Command
 * @desc プレイヤーターンを途中で終了させるコマンド名
 * @default ターン終了
 *
 * @param Change Player
 * @desc プレイヤーターンでアクターを変更する操作方法を指定します。
 * @type select
 * @option PgUpキー + PgDnキー
 * @value 0
 * @option Rightキー + Leftキー
 * @value 1
 * @default 0
 *
 * @param Start Actor Command
 * @desc プレイヤーターンでアクターのコマンドから始める
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Enable Auto Player Turn End
 * @desc パーティーが行動できなくなった時に、自動でターン終了する。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param --- 行動回数 ---
 * 
 * @param Disable AC
 * @desc アクターの行動回数による行動制限を無効にする
 * @type boolean
 * @on 無効にする
 * @off 無効にしない
 * @default false
 * 
 * @param Show Action Count
 * @desc アクターの残り行動回数を表示する
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Display AC Format
 * @desc 行動回数の表示内容を設定します。
 * %1 - 行動回数
 * @default [%1]
 * 
 * @param AC Color
 * @desc 行動回数の表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @param Display AC Width
 * @desc 行動回数の表示幅を設定します。(半角文字数)
 * @default 3
 * @type number
 *
 * @param --- 行動済みのアクター ---
 * 
 * @param Activated Actor Sign
 * @desc 行動済みのアクターの表し方を指定します。
 * @type select
 * @option 特になし
 * @value 0
 * @option 名前をグレー表示にする
 * @value 1
 * @option 名前＋顔画像をグレー表示
 * @value 2
 * @default 0
 *
 * @param Activated Sv Actor Sign
 * @desc 行動済みのSVアクターの表し方を指定します。
 * @type select
 * @option 待機モーション
 * @value 0
 * @option 停止
 * @value 1
 * @default 0
 *
 * @param Cannot Select Activated Actor
 * @desc 行動済みのアクターを選択できないようにします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default ture
 *
 * @param --- アクションポイント ---
 * 
 * @param Enable AP
 * @desc アクションポイントによる行動回数制限を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param Display AP
 * @desc アクションポイントの表示名を設定します。
 * @default AP
 * 
 * @param Party AP
 * @desc パーティーのアクションポイントの初期値を設定します。
 * @default 4
 * @type number
 * @min 0
 *
 * @param Item AP
 * @desc スキルやアイテムのアクションポイントを設定します。メモ欄で設定しない場合は、この値になります。
 * @default 1
 * @type number
 * @min 0
 *
 * @param Turn Refresh AP
 * @desc ターンごとに回復するアクションポイントをスクリプトで設定します。-1 にすると全回復します。
 * @default -1
 *
 * @param Show AP Window
 * @desc アクションポイントをバトル画面に表示するか設定します。
 * @type select
 * @option 表示しない
 * @value 0
 * @option プレイヤーターンのみ表示する
 * @value 1
 * @option 常に表示する
 * @value 2
 * @default 2
 *
 * @param AP Cost Color
 * @desc アクションポイントコストの表示色を設定します。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @param Display AP Width Cmd
 * @desc コマンド欄のアクションポイントコストの表示幅を設定します。(半角文字数)
 * @default 3
 * @type number
 *
 * @param Display AP Width Item
 * @desc スキルやアイテム欄のアクションポイントコストの表示幅を設定します。(半角文字数)
 * @default 4
 * @type number
 *
 * @param Enable Reset AP Every Battle
 * @desc 戦闘毎にAPをリセットするか設定します。
 * @type boolean
 * @on 有効
 * @off 無効(AP持ち越し)
 * @default true
 * 
 * @param AP Window Layout
 * @desc APウィンドウのレイアウト設定
 * 空欄の場合は、デフォルトの表示位置です。
 * @type struct<window>
 * @default 
 * 
 * @param --- 戦闘行動の強制 ---
 * 
 * @param Enable Force Action AP
 * @desc 戦闘行動の強制で実行したスキルのAP消費を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @param Enable Force Action AC
 * @desc 戦闘行動の強制でスキルを使用したアクターの行動回数消費を有効にする。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを導入すると、敵味方交互にターンが進むターン制戦闘システムに
 * 変更します。
 * 
 * この戦闘システムは、基本的にプレイヤー側が有利に戦闘を進めることができます。
 * 
 * 
 * ＜お勧めの組み合わせプラグイン＞
 * AttackChain.js
 *    トリアコンタン氏作成。
 *    同一のエネミーに連続してアクターがダメージを与えると
 *    コンボが発生し、ダメージがアップします。
 *    画面にコンボ数や累計ダメージも表示するため、演出を強化できます。
 * 
 * YEP_BattleEngineCore.js
 * YEP_X_ActSeqPack1~3.js
 *    Yanlfy氏の作成した、非常に有名な戦闘システム改変系のプラグイン。
 *    ActSeqPackと合わせて使うことで、戦闘時にアクターを
 *    ダイナミックに動かすことができます。(サイドビュー戦闘用)
 *    当然ですが、Yanlfy氏のATBプラグインやCTBプラグインは使えません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 他のプラグインとの組み合わせについて
 *    組み合わせて使用する場合は、以下の順番にしてください。
 * 
 *      YEP_BattleEngineCore.js
 *      YEP_X_ActSeqPack*.js
 *      FTKR_AlternatingTurnBattle.js
 *      AttackChain.js
 * 
 * 
 *-----------------------------------------------------------------------------
 * ターンの進行
 *-----------------------------------------------------------------------------
 * ターンの進行は、以下の様になります。
 *  戦闘開始メッセージ表示(0ターン目)⇒
 *  １ターン目開始⇒プレイヤーの１ターン目⇒エネミーの１ターン目⇒１ターン目終了
 *    ２ターン目開始⇒プレイヤーの２ターン目⇒･･･
 * 
 * 先制攻撃が発生すると、エネミーの１ターン目が無くなり、
 * 連続でプレイヤーが行動できます。
 * 
 * 不意打ちが発生すると、プレイヤーの１ターン目が無くなり
 * エネミーの１ターン目から始まります。
 * 
 * 
 * 敵グループのバトルイベントで、0ターン目実行の条件の場合は、
 * 戦闘開始メッセージ後から１ターン目のプレイヤーコマンド表示の間に
 * イベントを実行します。
 * 
 * ターン終了条件の場合は、*ターン目終了の所で実行します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プレイヤーのターン
 *-----------------------------------------------------------------------------
 * プレイヤーのターンでは、以下の仕様になります。
 * 
 * 1. アクターの行動順は任意に選択できます。
 * 2. pgUpキーとpgDnキーで行動させるアクターを選択できます。(*1)
 * 3. アクターを選択し行動を決定すると、即座にスキルが発動し、
 *    その後に次に行動するアクター選択に移ります。
 * 4. キャラが行動すると、そのキャラの行動回数を１消費し、
 *    さらに、使用したスキルのアクションポイントの分、パーティーの
 *    アクションポイントを消費します。
 * 5. 全員が行動済みになるか、パーティーのアクションポイントが 0 になるか
 *    パーティーコマンドの「ターン終了」を選ぶと、エネミーのターンに移ります。
 * 6. キャンセルキーで、パーティーコマンドを表示できます。
 * 7. 誰かが行動したターンでは、パーティーコマンドの「逃げる」は
 *    実行できなくなります。
 * 
 * 
 * (*1)プラグインパラメータ Change Player でキー操作方法は変更できます。
 *     また、マウスでステータスウィンドウ上をクリックすることで
 *     クリックした位置のアクターに選択を変えることもできます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * エネミーのターン
 *-----------------------------------------------------------------------------
 * エネミーのターンでは、従来のMVのシステムとほぼ同じです。
 * 
 * 1. エネミーの行動順は、エネミーの敏捷性と使用するスキルの速度補正によって
 *    決まります。
 * 2. エネミーは、各ターン開始時に使用するスキルと行動順を決めます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動回数
 *-----------------------------------------------------------------------------
 * アクターは設定された行動回数の分だけ、毎ターン行動できます。
 * 
 * アクターの行動回数は、特徴の行動回数追加の合計＋１回です。
 * この値が毎ターンの行動回数になります。
 * 
 * ただし、ターン中にプラグインコマンドを実行することで
 * そのターンだけ行動回数を増減させることができます。
 * 
 * プラグインコマンドで変化させた行動回数は、次のターンには元に戻ります。
 * 
 * 行動回数は、プラグインパラメータ Show AC を有効にすると
 * 画面に各アクターの残り回数を表示します。
 * 
 * 
 * なお、プラグインパラメータ Disable AC を"無効にする"に設定すると
 * アクターは行動しても行動回数が減らなくなります。
 * この状態では、アクションポイントがある限り、何度でも同じアクターで
 * 行動することが可能です。
 * 
 * 
 * スキルやアイテムのメモ欄に、<AltTB_noAC>と記入すると
 * そのスキルやアイテムを使用しても行動回数を消費ません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクションポイント
 *-----------------------------------------------------------------------------
 * アクションポイントは、プラグインパラメータ Enable AP を有効にすると
 * 使用できます。
 * 
 * パーティーはアクションポイントというパラメータを持っています。
 * 各アクターは行動時に、行動回数とは別に、このアクションポイントを消費します。
 * アクションポイントの現在値を超える行動はすることができません。
 * 
 * 消費したアクションポイントは、ターン開始時に一定量回復します。
 * 
 * アクションポイントの消費量は、使用したスキルごとに個別に変わります。
 * 
 * 
 * ＜パーティーのアクションポイントの設定＞
 * パーティーのアクションポイント最大値は、プラグインパラメータ Party AP で
 * 設定できます。
 * また、プラグインコマンドで、現在値や最大値を変更できます。
 * 
 * 
 * ＜スキルやアイテムのアクションポイントの設定＞
 * スキルやアイテム使用時に消費するアクションポイントは、以下の方法で設定します。
 * １．プラグインパラメータ Item AP で、全スキル・アイテム共通のデフォルト値を設定。
 * ２．個別に、メモ欄に<AltTB_AP: n>で設定。n が消費量です。
 * なお、個別の設定を優先します。
 * 
 * また、スキルのメモ欄に<AltTB_GainAP: n>と設定すると、
 * そのスキルを使用した時に、命中時に n ポイントAPを取得できます。
 * 
 * 
 * ＜ターン毎のアクションポイント回復量＞
 * プラグインパラメータ Turn Refresh AP で、ターン毎の回復量を設定できます。
 * 回復量はスクリプトで設定できます。
 * 
 * 例)偶数ターンなら３回復、奇数ターンなら２回復するスクリプト
 *  $gameTroop.turnCount() % 2 ? 2 : 3
 * 
 * 
 * ＜戦闘毎のアクションポイントのリセット＞
 * アクションポイントは戦闘毎にリセットされ、0 から開始します。
 * ただし、プラグインパラメータ Enable Reset AP Every Battle を無効にすることで
 * 残ったアクションポイントを次の戦闘に持ち越すことができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプト
 *-----------------------------------------------------------------------------
 * このプラグインでは、以下のスクリプトが使用できます。
 * 
 * １．行動回数の現在値の取得
 *    アクターID n の場合
 *       $gameActors.actor(n).actionCount();
 *
 *    パーティーの n 番目のキャラの場合
 *       $gameParty.members()[n-1].actionCount();
 * 
 *    敵グループの n 番目のキャラの場合
 *       $gameTroop.members()[n-1].actionCount();
 *  
 * 
 * ２．パーティーのアクションポイントの現在値の取得
 *       $gameParty.actionPoint();
 * 
 * 
 * ３．パーティーのアクションポイントの最大値の取得
 *       $gameParty.maxActionPoint();
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * このプラグインでは、以下のプラグインコマンドが使用できます。
 * ※[]は実際の入力に使用しません
 * 
 * １．行動回数の増加
 * 対象の行動回数を操作します。減らすことも出来ます。
 * 減らしたことで、行動回数が 0 になった対象は、そのターン行動できなくなります。
 * 
 * AltTB_行動回数増加 [対象分類] [対象ID] [増加量]
 * AltTB_ADD_AC [targetType] [targetId] [value]
 * 
 *    対象分類(targetType)
 *        ：行動回数を増加させる対象をどのように選ぶかを指定します。
 *        　以下の文字列を入力してください。
 *        　　アクター   または Actor
 *        　　パーティー または Party
 *        　　敵グループ または Troop
 * 
 *    対象ID(targetId)
 *        ：対象分類に合わせて、以下のIDを指定します。
 *        　アクターなら、対象のアクターID。
 *        　パーティーなら、パーティー先頭を 1 とした並び順。
 *        　敵グループなら、敵グループ先頭を 1 とした並び順。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 *    増加量(value)
 *        ：行動回数を増加させる値を指定します。
 *        　負の値を指定した場合、対象の行動回数は減少します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 * 入力例)
 *    AltTB_行動回数増加 アクター 1 1
 *    AltTB_ADD_AC Actor 1 1
 *        ：アクターID 1 の行動回数を 1 増やします。
 * 
 *    AltTB_行動回数増加 パーティー 2 \v[5]
 *    AltTB_ADD_AC Party 2 \v[5]
 *        ：パーティーの 2 番目のキャラの行動回数を 変数ID 5 の値分、増やします。
 * 
 *    AltTB_行動回数増加 敵グループ 3 -1
 *    AltTB_ADD_AC Troop 3 -1
 *        ：敵グループの 3 番目のキャラの行動回数を 1 減らします。
 * 
 * 
 * ２．アクションポイントの増加
 * パーティーのアクションポイントの現在値を操作します。減らすこともできます。
 * 減らしたことで、アクションポイントが 0 になった場合は、プレイヤーターンを終了します。
 * 
 * AltTB_アクションポイント増加 [増加量]
 * AltTB_ADD_AP [value]
 * 
 *    増加量(value)
 *        ：アクションポイントを増加させる値を指定します。
 *        　負の値を指定した場合、アクションポイントは減少します。
 *        　\v[n] と指定することで変数 n の値を参照できます。
 * 
 * 入力例)
 *    AltTB_アクションポイント増加 1
 *    AltTB_ADD_AP 1
 *        ：アクションポイントを 1 増やします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * YEP_BattleEngineCore.js との組み合わせについて
 *-----------------------------------------------------------------------------
 * YEP_BattleEngineCoreプラグインの以下の機能は使用できません。
 * ※他にもあるかもしれません。
 * 
 * プラグインパラメータ
 *  Default System     ：dtb 固定
 *  Start Actor Command：無効
 * 
 * 
 *-----------------------------------------------------------------------------
 * このプラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v1.2.2 - 2018/04/30 : 不具合修正、機能追加
 *    1. 自動でプレイヤーターンを飛ばす処理が正常に動作しない不具合を修正。
 *    2. エネミーターンに移行した直後にゲームが止まる不具合を修正。
 *    3. 特定のスキル・アイテムの行動回数の消費を無効にする機能を追加。
 * 
 * v1.2.1 - 2018/04/29 : 不具合修正、機能追加
 *    1. AP0になった時に、ゲームがフリーズする不具合を修正。
 *    2. 戦闘行動の強制で消費APを無効にしても、AP0になった際に戦闘行動の強制を
 *       実行できない不具合を修正。
 *    3. アクターの行動回数を無効にした時に、同じアクターを２回以上行動させると
 *       エラーになる不具合を修正。
 *    4. アクターの行動回数を無効にした時に、エネミーターンが終わらない不具合を修正。
 *    5. プレイヤーが全員行動できなくなった時に、自動でプレイヤーターンを
 *       飛ばすかどうか設定する機能を追加。
 *    6. パーティーの初期APとスキル・アイテムの消費APのデフォルト値を、どちらも 0 に
 *       設定できるように変更。
 * 
 * v1.2.0 - 2018/04/29 : 機能追加
 *    1. アクションポイントウィンドウのレイアウト設定機能を追加。
 *    2. スキル使用後にAPを一定値自動取得可能な機能を追加。
 *    3. アクターの行動回数による行動制限を無効にする機能を追加。
 * 
 * v1.1.0 - 2018/04/09 : 機能追加
 *    1. アクターコマンドのAP表示部の処理を見直し。
 *    2. APの表示幅や表示色を設定する機能を追加。
 *    3. 残り行動回数を表示する機能を追加。
 *    4. マウスクリックでアクターを変更する機能を追加。
 * 
 * v1.0.0 - 2018/04/08 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================
/*~struct~window:
 * @param width
 * @desc ウィンドウの幅を設定します。
 * @type number
 * @default 120
 *
 * @param positionY
 * @desc ウィンドウの表示Y座標を設定します。
 * @type number
 * @min 0
 * @default 372
 *
 * @param positionX
 * @desc ウィンドウの表示X座標を設定します。
 * @type number
 * @min 0
 * @default 0
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

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        }); 
    };

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

    Array.prototype.everyOk = function (){
        return this.every( function(arr){
            return !!arr;
        });
    };

    Array.prototype.someOk = function (){
        return this.some( function(arr){
            return !!arr;
        });
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_AlternatingTurnBattle');

    FTKR.AltTB = {
        textTurnEnd     : (parameters['TurnEnd Command'] || 'ターン終了'),
        changePlayer    : (paramParse(parameters['Change Player']) || 0),
        startActorCmd   : (paramParse(parameters['Start Actor Command']) || false),
        enableAutoTurnEnd : (paramParse(parameters['Enable Auto Player Turn End']) || false),
        disableAC       : (paramParse(parameters['Disable AC']) || false),
        showAC          : (paramParse(parameters['Show Action Count']) || false),
        dispACFormat    : (paramParse(parameters['Display AC Format']) || '[%1]'),
        acColor         : (paramParse(parameters['AC Color']) || 0),
        dispAcWidth     : (paramParse(parameters['Display AC Width']) || 3),
        activated       : (paramParse(parameters['Activated Actor Sign']) || 0),
        activatedSv     : (paramParse(parameters['Activated Sv Actor Sign']) || 0),
        enableAP        : (paramParse(parameters['Enable AP']) || false),
        dispAP          : (paramParse(parameters['Display AP']) || 'AP'),
        partyAp         : (paramParse(parameters['Party AP']) || 0),
        itemAp          : (paramParse(parameters['Item AP']) || 0),
        apCostPos       : (paramParse(parameters['AP Cost Position']) || 0),
        apCostColor     : (paramParse(parameters['AP Cost Color']) || 0),
        dispApWidthCmd  : (paramParse(parameters['Display AP Width Cmd']) || 3),
        dispApWidthItem : (paramParse(parameters['Display AP Width Item']) || 4),
        turnRefreshAP   : (paramParse(parameters['Turn Refresh AP']) || -1),
        enableResetAP   : (paramParse(parameters['Enable Reset AP Every Battle']) || true),
        layoutAPWindow  : (paramParse(parameters['AP Window Layout']) || null),
        enableFAAC      : (paramParse(parameters['Enable Force Action AC']) || false),
        enableFAAP      : (paramParse(parameters['Enable Force Action AP']) || false),
        showApWindow    : (paramParse(parameters['Show AP Window']) || 0),
        notSelectActivatedActor: (paramParse(parameters['Cannot Select Activated Actor']) || false),
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _AltTB_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _AltTB_BattleManager_initMembers.call(this);
        this._actionPlayers = [];
        this._actionEnemies = [];
        this._inputCount = 0;
        this._lastActorIndex = -1;
        this._partyApWindow = null;
        this._actorCommandWindow = null;
        this.setPlayerTurn();
    };

    BattleManager.setActorWindow = function(actorWindow) {
        this._actorCommandWindow = actorWindow;
    };

    BattleManager.setPartyApWindow = function(apWindow) {
        this._partyApWindow = apWindow;
    };

    BattleManager.isTouchedOutsideActorCommandWindow = function() {
        return this._actorCommandWindow.active && !this._actorCommandWindow.isTouchedInsideFrame()
    };

    BattleManager.setPlayerTurn = function() {
        this._isPlayerTurn = true;
    };

    BattleManager.setEnemyTurn = function() {
        this._isPlayerTurn = false;
    };

    BattleManager.isPlayerTurn = function() {
        return this._isPlayerTurn;
    };

    BattleManager.changeTrunSide = function(flag) {
        if (!flag) this._phase = 'turn';
        this._isPlayerTurn = !this._isPlayerTurn;
        this._inputCount = 0;
        if (FTKR.AltTB.enableAP) this.changeAPWindow();
    };

    BattleManager.changeAPWindow = function() {
        if (FTKR.AltTB.showApWindow === 1) {
            if (this.isPlayerTurn()) {
                this._partyApWindow.open();
            } else {
                this._partyApWindow.close();
            }
        }
    };

    BattleManager.changeActorAltTB = function(index) {
        if (!FTKR.AltTB.activatedSv) {
            var state = 'undecided';
        } else {
            var state = this.actor() && this.actor().canInputAction() ? 'undecided' : '';
        }
        this.changeActor(index, state);
    };

    BattleManager.resetLastActorIndex = function() {
        this._lastActorIndex = -1;
    };

    BattleManager.lastActorIndex = function() {
        return this._lastActorIndex;
    };

    BattleManager.reserveLastActorIndex = function() {
        this._lastActorIndex = this._actorIndex;
    };

    BattleManager.inputCount = function() {
        return this._inputCount;
    };

    BattleManager.actionBattlers = function() {
        if (this.isPlayerTurn()) {
            return this._actionPlayers;
        } else {
            return this._actionEnemies;
        }
    };

    BattleManager.setActionBattlers = function(battlers) {
        if (this.isPlayerTurn()) {
            this._actionPlayers = battlers;
        } else {
            this._actionEnemies = battlers;
        }
    };

    //書き換え
    BattleManager.getNextSubject = function() {
        for (;;) {
            var battler = this.actionBattlers().shift();
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };

    BattleManager.sortActionSpeed = function(battlers) {
        battlers.forEach(function(battler) {
            battler.makeSpeed();
        });
        battlers.sort(function(a, b) {
            return b.speed() - a.speed();
        });
        return battlers;
    };

    //書き換え
    BattleManager.makePlayerOrders = function() {
        var battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat($gameParty.members());
        }
        this._actionPlayers = battlers;
    };

    //書き換え
    BattleManager.makeEnemyOrders = function() {
        var battlers = [];
        if (!this._preemptive) {
            battlers = battlers.concat($gameTroop.members());
        }
        this._actionEnemies = this.sortActionSpeed(battlers);
    };

    //書き換え
    BattleManager.makeActionOrders = function() {
        this.makeEnemyOrders();
        this.makePlayerOrders();
    };

    //書き換え
    BattleManager.forceAction = function(battler) {
        this._actionForcedBattler = battler;
        if (battler.isActor()) {
            this.forcePartyAction(battler);
        } else {
            this.forceEnemyAction(battler);
        }
    };

    BattleManager.forcePartyAction = function(battler){
        battler.payActionCount();
        this.payActionPoint(battler);
    };

    BattleManager.payActionPoint = function(battler) {
        if (FTKR.AltTB.enableAP && battler.isActor()) {
            var action = battler.currentAction();
            if (action._forcing && !FTKR.AltTB.enableFAAP) return;
            var usedAp = action.item().actionPoint;
            $gameParty.getActionPoint(-usedAp);
            this._partyApWindow.refresh();
        }
    };

    BattleManager.forceEnemyAction = function(battler){
        var index = this.actionBattlers().indexOf(battler);
        if (index >= 0) {
            this.actionBattlers().splice(index, 1);
        }
    };

    var _AltTB_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _AltTB_BattleManager_startBattle.call(this);
        this.resetAPWindow();
    };

    BattleManager.resetAPWindow = function() {
        if (FTKR.AltTB.enableAP) {
            if (FTKR.AltTB.enableResetAP) $gameParty.resetActionPoint();
            if (FTKR.AltTB.showApWindow) this._partyApWindow.open();
        }
    };

    //書き換え
    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();
                break;
            case 'turnStart':
                this.updateTurnStart();
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'actionEnd':
                this.updateActionEnd();
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    BattleManager.updateStart = function() {
        this._phase = 'turnStart';
        this.clearActor();
        if (this._surprise) this.setEnemyTurn();
    };

    BattleManager.updateTurnStart = function() {
        this._phase = 'turn';
        $gameParty.makeActions();
        $gameTroop.makeActions();
        $gameParty.resetActionCount();
        this.resetLastActorIndex();
        if (FTKR.AltTB.enableAP) $gameParty.turnRefreshAP();
        this.clearActor();
        $gameTroop.increaseTurn();
        this.makeActionOrders();
        $gameParty.requestMotionRefresh();
        this._logWindow.startTurn();
        this._statusWindow.refresh();
        if (FTKR.AltTB.enableAP) this._partyApWindow.refresh();
        if (FTKR.AltTB.startActorCmd) this.changeActorAltTB(0);
    };

    //書き換え
    BattleManager.updateTurn = function() {
        $gameParty.requestMotionRefresh();
        if (this.isPlayerTurn()) {
            this.resetPlayerActions();
            this.updatePlayerTurn();
        } else {
            this.updateEnemyTurn();
        }
    };

    BattleManager.resetPlayerActions = function() {
        if (FTKR.AltTB.disableAC) $gameParty.makeActions();
    };

    BattleManager.checkAutoTurnChange = function() {
        return FTKR.AltTB.enableAutoTurnEnd && $gameParty.cannotInputPlayerAction();
    };

    BattleManager.updatePlayerTurn = function() {
        if (!this.checkAutoTurnChange()) {
            this._phase = 'input';
            this.autoSelectNextActor();
        } else {
            this.changeTrunSide();
        }
    };

    BattleManager.autoSelectNextActor = function() {
        if (!FTKR.AltTB.notSelectActivatedActor) return;
        if (this.actor() && !this.actor().canSelectInput()){
            this.selectNextCommand();
        }
    };

    BattleManager.updateEnemyTurn = function() {
        if (this._subject && this._subject.isActor()) this._subject = null;
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        } else {
            this._phase = 'turnEnd';
        }
    };

    //書き換え
    BattleManager.processTurn = function() {
        var subject = this._subject;
        var action = subject.currentAction();
        if (action) {
            this.processBeforeAction(subject, action);
        } else {
            this.endAction();
        }
    };

    BattleManager.processBeforeAction = function(subject, action) {
        action.prepare();
        if (action.isValid()) {
            subject.payActionCount();
            this.payActionPoint(subject);
            this.startAction();
        }
        subject.removeCurrentAction();
    };

    //書き換え
    BattleManager.endAction = function() {
        this._phase = 'actionEnd';
        this._logWindow.endAction(this._subject);
    };

    BattleManager.updateActionEnd = function() {
        this._phase = 'turn';
        var subject = this._subject;
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
        this._subject = null;
    };

    //書き換え
    BattleManager.updateTurnEnd = function() {
        this._phase = 'turnStart';
        this._preemptive = false;
        this._surprise = false;
        this.allBattleMembers().forEach(function(battler) {
            battler.onTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }, this);
        if (this.isForcedTurn()) {
            this._turnForced = false;
        }
        this.changeTrunSide(1);
    };

    BattleManager.selectActorActions = function() {
        if (this.lastActorIndex() >= 0) {
            this.changeActorAltTB(this.lastActorIndex());
        } else {
            this.selectNextCommand();
        }
    };

    BattleManager.setNextCommand = function(index) {
        this.changeActorAltTB(index);
    };

    //書き換え
    BattleManager.selectNextCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                if (this._actorIndex + 1 >= $gameParty.size()) {
                    this.changeActorAltTB(0);
                } else {
                    this.changeActorAltTB(this._actorIndex + 1);
                }
            }
            if (!$gameParty.canInputAction()) return;
        } while (!this.actor().canSelectInput());
    };

    //書き換え
    BattleManager.selectPreviousCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                if (this._actorIndex - 1 < 0) {
                    this.changeActorAltTB($gameParty.size() - 1);
                } else {
                    this.changeActorAltTB(this._actorIndex - 1);
                }
            }
            if (!$gameParty.canInputAction()) return;
        } while (!this.actor().canSelectInput());
    };
    
    //=============================================================================
    // DataManager
    //=============================================================================

    var _AltTB_DatabaseLoaded = false;
    var _AltTB_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_AltTB_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_AltTB_DatabaseLoaded) {
            if (FTKR.AltTB.enableAP) {
                this.altTBSkillNoteTags($dataSkills);
                this.altTBSkillNoteTags($dataItems);
            }
        }
        return true;
    };

    DataManager.altTBSkillNoteTags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.actionPoint = Number(readObjectMeta(obj, ['AltTB_AP']) || FTKR.AltTB.itemAp);
            obj.gainAp = Number(readObjectMeta(obj, ['AltTB_GAINAP']) || 0);
            obj.noAC = Boolean(testObjectMeta(obj, ['AltTB_NOAC']) || false);
        }
    };

    DataManager.isHaveAp = function(item) {
        return FTKR.AltTB.enableAP && (this.isSkill(item) || this.isItem(item));
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _AltTB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _AltTB_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/AltTB_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '行動回数増加':
            case 'ADD_AC':
                this.addTargetAC(args);
                break;
            case 'アクションポイント増加':
            case 'ADD_AP':
                if (FTKR.AltTB.enableAP) this.addPartyAP(args);
                break;
        }
    };

    Game_Interpreter.prototype.addTargetAC = function(args) {
        var target = null;
        var targetId = setArgNum(args[1]);
        switch(args[0].toUpperCase()) {
            case 'アクター':
            case 'ACTOR':
                target = $gameActors.actor(targetId);
                break;
            case 'パーティー':
            case 'PARTY':
                target = $gameParty.members()[targetId];
                break;
            case '敵グループ':
            case 'TROOP':
                target = $gameTroop.members()[targetId];
                break;
        }
        if (target) {
            target.getActionCount(setArgNum(args[2]));
        }
    };

    Game_Interpreter.prototype.addPartyAP = function(args) {
        var ap = setArgNum(args[0]);
        if (ap) $gameParty.getActionPoint(ap);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    var _AltTB_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _AltTB_Game_Battler_initMembers.call(this);
        this._actionCount = 0;
    };

    Game_Battler.prototype.canInputAction = function() {
        return this.canInput() && this.hasActionCount();
    };

    Game_Battler.prototype.canSelectInput = function() {
        return FTKR.AltTB.notSelectActivatedActor ? this.canInputAction() : this.canInput();
    };

    Game_Battler.prototype.resetActionCount = function() {
        this._actionCount = this.numActions();
    };

    Game_Battler.prototype.actionCount = function() {
        return this._actionCount;
    };

    Game_Battler.prototype.hasActionCount = function() {
        return this.actionCount() > 0 || FTKR.AltTB.disableAC;
    };

    Game_Battler.prototype.canPayAC = function(item) {
        return item.noAC || this.hasActionCount();
    };

    Game_Battler.prototype.getActionCount = function(value) {
        this._actionCount += value;
        if (this._actionCount < 0) this._actionCount = 0;
    };

    Game_Battler.prototype.payActionCount = function() {
        if (!FTKR.AltTB.disableAC) {
            var action = this.currentAction();
            if (action.item().noAC || action._forcing && !FTKR.AltTB.enableFAAC) return;
            this.getActionCount(-1);
        }
    };

    Game_Battler.prototype.canAction = function() {
        return this.hasActionCount() && this.isAlive();
    };

    Game_Battler.prototype.canPayAP = function(item) {
        return true;
    };

    Game_Battler.prototype.canPayFAAP = function(item) {
        return true;
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _AltTB_Game_Actor_canUse = Game_Actor.prototype.canUse;
    Game_Actor.prototype.canUse = function(item) {
        var result = _AltTB_Game_Actor_canUse.call(this, item);
        if ($gameParty.inBattle()) {
            return result && this.canPayAP(item) && this.canPayAC(item);
        } else {
            return result;
        }
    };

    Game_Actor.prototype.canPayAP = function(item) {
        //AP無効 または APが0 または 消費APが現在AP以下 または 戦闘行動の強制で消費無効
        return !FTKR.AltTB.enableAP || !item.actionPoint ||
            item.actionPoint <= $gameParty.actionPoint() ||
            this.currentAction() && this.currentAction()._forcing && !FTKR.AltTB.enableFAAP;
    };

    Game_Actor.prototype.removeCurrentAction = function() {
        Game_Battler.prototype.removeCurrentAction.call(this);
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    var _AltTB_Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _AltTB_Game_Party_initialize.call(this);
        this._maxActionPoint = FTKR.AltTB.partyAp;
        this._actionPoint = 0;
    };

    Game_Party.prototype.actionPoint = function() {
        return this._actionPoint;
    };

    Game_Party.prototype.maxActionPoint = function() {
        return this._maxActionPoint;
    };

    Game_Party.prototype.addMaxActionPoint = function(value) {
        this._maxActionPoint += value;
    };

    Game_Party.prototype.payActionPoint = function(point) {
        this.getActionPoint(-point);
    };

    Game_Party.prototype.getActionPoint = function(point) {
        this._actionPoint += point;
        this._actionPoint = this._actionPoint.clamp(0, this.maxActionPoint());
    };

    Game_Party.prototype.turnRefreshAP = function() {
        var point = FTKR.AltTB.turnRefreshAP === -1 ?
            this.maxActionPoint() : eval(FTKR.AltTB.turnRefreshAP);
        this.getActionPoint(point);
    };

    Game_Party.prototype.resetActionPoint = function() {
        this._actionPoint = 0;
    };

    Game_Party.prototype.refreshAPAll = function() {
        this._actionPoint = this.maxActionPoint();
    };

    Game_Party.prototype.cannotInputPlayerAction = function() {
        var results = [
            FTKR.AltTB.enableAP && !this.actionPoint(),
            !this.battleMembers().some( function(battler){
                return battler.canInputAction();
            })
        ];
        return results[0] || results[1];
    };

    Game_Party.prototype.hasActionPoint = function() {
        return !FTKR.AltTB.enableAP || FTKR.AltTB.enableAP && this.actionPoint() > 0;
    };

    Game_Party.prototype.canInputAction = function() {
        return this.hasActionPoint() && 
            this.battleMembers().some( function(battler){
                return battler.canInputAction();
            });
    };

    Game_Party.prototype.resetActionCount = function() {
        this.battleMembers().forEach( function(member){
            member.resetActionCount();
        });
    };

    Game_Party.prototype.canUseAltTBnoForcing = function(item) {
        return this.members().some(function(actor) {
            return actor.canUseAltTBnoForcing(item);
        });
    };

    //=============================================================================
    // Game_Action
    //=============================================================================
    
    var _AltTB_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _AltTB_Game_Action_applyItemUserEffect.call(this, target);
        this.applyItemPartyGainAp(target);
    };

    Game_Action.prototype.applyItemPartyGainAp = function(target) {
        if (this.subject().isActor() && this.item().gainAp) {
            $gameParty.getActionPoint(this.item().gainAp);
            BattleManager._partyApWindow.refresh();
        }
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    
    var _AltTB_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _AltTB_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setActorWindow(this._actorCommandWindow);
        if (FTKR.AltTB.enableAP) BattleManager.setPartyApWindow(this._partyApWindow);
    };

    var _AltTB_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _AltTB_Scene_Battle_createAllWindows.call(this);
        if (FTKR.AltTB.enableAP) this.createPartyActionPointWindow();
    };

    Scene_Battle.prototype.addWindowAtW = function(addWindow, atWindow) {
        this._windowLayer.children.some(function(wchild, i){
            if (wchild === atWindow) {
                windowIndex = i;
                return true;
            }
        },this);
        this._windowLayer.addChildAt(addWindow, windowIndex);
    };

    Scene_Battle.prototype.createPartyActionPointWindow = function() {
        var y = this._statusWindow.y;
        this._partyApWindow = new Window_BattleActionPoint(0, y);
        this.addWindowAtW(this._partyApWindow, this._actorCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        this._partyCommandWindow = new Window_PartyCommand();
        this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
        this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        this._partyCommandWindow.setHandler('turnEnd', this.commandTurnEnd.bind(this));
        this._partyCommandWindow.deselect();
        this.addWindow(this._partyCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.commandFight = function() {
        BattleManager.selectActorActions();
        this.changeInputWindow();
    };

    //書き換え
    Scene_Battle.prototype.commandEscape = function() {
        this.commandTurnEnd();
        BattleManager.processEscape();
    };

    //書き換え
    Scene_Battle.prototype.commandTurnEnd = function() {
        this.endCommandSelection();
        BattleManager.changeTrunSide();
    };

    //書き換え
    Scene_Battle.prototype.createActorCommandWindow = function() {
        this._actorCommandWindow = new Window_ActorCommand();
        this._actorCommandWindow.setHandler('attack',  this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('skill',   this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler('guard',   this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item',    this.commandItem.bind(this));
        this._actorCommandWindow.setHandler('pageup',  this.commandPageup.bind(this));
        this._actorCommandWindow.setHandler('pagedown',this.commandPagedown.bind(this));
        this._actorCommandWindow.setHandler('cancel',  this.commandCancel.bind(this));
        this._actorCommandWindow.setStatusWindow(this._statusWindow);
        this.addWindow(this._actorCommandWindow);
    };

    //書き換え
    Scene_Battle.prototype.commandCancel = function() {
        BattleManager.reserveLastActorIndex()
        BattleManager.changeActorAltTB(-1);
        this.changeInputWindow();
    };

    Scene_Battle.prototype.commandPageup = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectPreviousCommand();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.commandPagedown = function() {
        if (FTKR.AltTB.changePlayer === 0) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        }
    };

    //書き換え
    Scene_Battle.prototype.selectNextCommand = function() {
        this.endCommandSelection();
        BattleManager._subject = BattleManager.actor();
        BattleManager._inputCount++;
        BattleManager.processTurn();
    };

    //=============================================================================
    // Window_Selectable
    //=============================================================================

    Window_Selectable.prototype.apCostWidth = function() {
        return this.textWidth('0') * FTKR.AltTB.dispApWidthItem || 0;
    };

    Window_Selectable.prototype.drawApCost = function(cost, x, y, width) {
        this.drawText(FTKR.AltTB.dispAP + cost, x, y, width, 'right');
    };

    Window_Selectable.prototype.drawItemCost = function(item, x, y) {
        this.changeTextColor(this.textColor(FTKR.AltTB.apCostColor));
        this.drawApCost(item.actionPoint, x, y, this.apCostWidth());
        this.resetTextColor();
    };

    //=============================================================================
    // Window_PartyCommand
    //=============================================================================

    //書き換え
    Window_PartyCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.fight,  'fight');
        this.addCommand(TextManager.escape, 'escape', this.isEscapeEnabled());
        this.addCommand(FTKR.AltTB.textTurnEnd, 'turnEnd');
    };

    Window_PartyCommand.prototype.isEscapeEnabled = function() {
        return !BattleManager.inputCount() && BattleManager.canEscape();
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
    };

    var _AltTB_Window_ActorCommand_isCurrentItemEnabled = 
        Window_ActorCommand.prototype.isCurrentItemEnabled;
    Window_ActorCommand.prototype.isCurrentItemEnabled = function() {
        return _AltTB_Window_ActorCommand_isCurrentItemEnabled.call(this) && BattleManager.actor() && BattleManager.actor().canAction();
    };

    var _AltTB_Window_ActorCommand_isCommandEnabled =
         Window_ActorCommand.prototype.isCommandEnabled;
    Window_ActorCommand.prototype.isCommandEnabled = function(index) {
        return BattleManager.actor() && BattleManager.actor().canAction() && _AltTB_Window_ActorCommand_isCommandEnabled.call(this, index);
    };

    Window_ActorCommand.prototype.changeInputWindow = function() {
        this._statusWindow.select(BattleManager.actor().index());
        this.setup(BattleManager.actor());
    };

    Window_ActorCommand.prototype.iconWidth = function(index) {
        return 0;
    };

    Window_ActorCommand.prototype.drawCmdIcon = function(index, x, y) {
        return x + this.iconWidth(index);
    };

    Window_ActorCommand.prototype.nameWidth = function(index, width) {
        width = width || this.contentsWidth();
        return Math.max(width - this.iconWidth(index) - this.costWidth(index), 0);
    };

    Window_ActorCommand.prototype.drawCmdName = function(index, x, y, width) {
        var nw = this.nameWidth(index, width);
        var align = !this.costWidth(index) && !this.iconWidth(index) ? this.itemTextAlign() : 'left';
        this.drawText(this.commandName(index), x, y, nw, align);
        return x + nw;
    };

    Window_ActorCommand.prototype.costWidth = function(index) {
        return this.hasCost(index) ? this.textWidth('0') * FTKR.AltTB.dispApWidthCmd : 0;
    };

    Window_ActorCommand.prototype.drawCmdCost = function(index, x, y) {
        this.changeTextColor(this.textColor(FTKR.AltTB.apCostColor));
        this.drawApCost(this.commandAP(index), x, y, this.costWidth(index));
        this.resetTextColor();
    };

    Window_ActorCommand.prototype.hasCost = function(index) {
        return FTKR.AltTB.enableAP && this.commandAP(index) >= 0;
    };

    Window_ActorCommand.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var x1 = this.drawCmdIcon(index, rect.x, rect.y);
        var x2 = this.drawCmdName(index, x1, rect.y, rect.width);
        if (this.hasCost(index)) {
            this.drawCmdCost(index, x2, rect.y);
        }
    };

    Window_ActorCommand.prototype.commandAP = function(index) {
        if (this.commandSymbol(index) === 'attack') {
            return $dataSkills[this._actor.attackSkillId()].actionPoint;
        } else if (this.commandSymbol(index) === 'guard') {
            return $dataSkills[this._actor.guardSkillId()].actionPoint;
        } else {
            return -1;
        }
    };

    Window_ActorCommand.prototype.cursorRight = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
            SoundManager.playCursor();
        } else {
            Window_Selectable.prototype.cursorRight.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorLeft = function(wrap) {
        if (FTKR.AltTB.changePlayer === 1) {
            BattleManager.selectPreviousCommand();
            this.changeInputWindow();
            SoundManager.playCursor();
        } else {
            Window_Selectable.prototype.cursorLeft.call(this, wrap);
        }
    };

    //=============================================================================
    // Window_BattleStatus
    //=============================================================================

    var _AltTB_Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function() {
        _AltTB_Window_BattleStatus_initialize.call(this);
        this._windowName = 'Window_BattleStatus';
    };

    var _AltTB_Window_BattleStatus_drawActorName = Window_BattleStatus.prototype.drawActorName;
    Window_BattleStatus.prototype.drawActorName = function(actor, x, y, width) {
        if (FTKR.AltTB.activated) this.changePaintOpacity(actor.canAction());
        if (FTKR.AltTB.showAC) {
            var acw = this.textWidth('0') * FTKR.AltTB.dispAcWidth;
            width -= acw;
            var text = FTKR.AltTB.dispACFormat.format(actor.actionCount());
            this.changeTextColor(this.textColor(FTKR.AltTB.acColor));
            this.drawText(text, x + width, y, acw, 'right');
            this.resetTextColor();
        }
        _AltTB_Window_BattleStatus_drawActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
    };

    var _AltTB_Window_BattleStatus_drawActorFace = Window_BattleStatus.prototype.drawActorFace;
    Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        if (FTKR.AltTB.activated === 2) this.changePaintOpacity(actor.canAction());
        _AltTB_Window_BattleStatus_drawActorFace.call(this, actor, x, y, width, height);
        this.changePaintOpacity(true);
    };

    var _AltTB_Window_BattleStatus_drawCssActorName = Window_BattleStatus.prototype.drawCssActorName;
    Window_BattleStatus.prototype.drawCssActorName = function(actor, x, y, width) {
        if (FTKR.AltTB.activated) this.changePaintOpacity(actor.canAction());
        var line = _AltTB_Window_BattleStatus_drawCssActorName.call(this, actor, x, y, width);
        this.changePaintOpacity(true);
        return line;
    };

    var _AltTB_Window_BattleStatus_drawCssActorFace = Window_BattleStatus.prototype.drawCssActorFace;
    Window_BattleStatus.prototype.drawCssActorFace = function(actor, x, y, width, lss, scale) {
        if (FTKR.AltTB.activated === 2) this.changePaintOpacity(actor.canAction());
        var line = _AltTB_Window_BattleStatus_drawCssActorFace.call(this, actor, x, y, width, lss, scale);
        this.changePaintOpacity(true);
        return line;
    };

    Window_BattleStatus.prototype.isCursorIndexOnMouse = function() {
        if (!this.isTouchedInsideFrame()) return -1;
        var ih = this.itemHeight() || 36;
        var iw = this.itemWidth() || this.width;
        var index = Math.floor((TouchInput.y - this.y - this.padding) / ih) + this.topRow();
        var x = this.x;
        for(var i = 0; i < this.maxCols(); i++) {
            if (TouchInput.x >= x && TouchInput.x < x + iw + this.spacing()) {
                var col = i;
                break;
            }
            x += iw + this.spacing();
        }
        return Math.min(index * this.maxCols() + col, this.maxItems() - 1);
    };

    Window_BattleStatus.prototype.isTouchedInsideDeactive = function() {
        return TouchInput.isTriggered() && this.isTouchedInsideFrame() && !this.active;
    };

    Window_BattleStatus.prototype.processTouch = function() {
        if (this.isTouchedInsideDeactive()) {
            var index = this.isCursorIndexOnMouse();
            if (index >= 0 && BattleManager.isTouchedOutsideActorCommandWindow()) {
                this.changeActorOnMouse(index);
            }
        } else {
            Window_Selectable.prototype.processTouch.call(this);
        }
    };

    Window_BattleStatus.prototype.changeActorOnMouse = function(index) {
        BattleManager.setNextCommand(index);
        this.select(BattleManager.actor().index());
        BattleManager._actorCommandWindow.setup(BattleManager.actor());
        SoundManager.playCursor();
        TouchInput.clear();
    };

    //=============================================================================
    // Window_BattleItem
    //=============================================================================

    Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
        var tw = this.apCostWidth();
        var nw = FTKR.AltTB.enableAP ? width - tw : width;
        Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, nw);
        if (FTKR.AltTB.enableAP) {
            this.drawItemCost(item, x + nw, y);
        }
    };

    //=============================================================================
    // Window_BattleSkill
    //=============================================================================

    Window_BattleSkill.prototype.drawSkillCost = function(skill, x, y, width) {
        var tw = this.apCostWidth();
        var nw = FTKR.AltTB.enableAP ? width - tw : width;
        Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, nw);
        if (FTKR.AltTB.enableAP) {
            this.drawItemCost(skill, x + nw, y);
        }
    };

    //=============================================================================
    // Window_BattleActionPoint
    //=============================================================================

    function Window_BattleActionPoint() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleActionPoint.prototype = Object.create(Window_Base.prototype);
    Window_BattleActionPoint.prototype.constructor = Window_BattleActionPoint;

    Window_BattleActionPoint.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        y -= height;
        if (!!FTKR.AltTB.layoutAPWindow) {
            x = FTKR.AltTB.layoutAPWindow.positionX;
            y = FTKR.AltTB.layoutAPWindow.positionY;
        }
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.close();
    };

    Window_BattleActionPoint.prototype.windowWidth = function() {
        return !!FTKR.AltTB.layoutAPWindow ? FTKR.AltTB.layoutAPWindow.width : 120;
    };

    Window_BattleActionPoint.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_BattleActionPoint.prototype.refresh = function() {
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        var disp = FTKR.AltTB.dispAP, tw = 0;
        if (disp) {
            tw = this.textWidth(disp + ':');
            this.drawText(disp + ':', 0, 0, tw);
        }
        this.drawText(this.value(), tw, 0, width - tw, 'right');
    };

    Window_BattleActionPoint.prototype.value = function() {
        return $gameParty.actionPoint();
    };

    Window_BattleActionPoint.prototype.open = function() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    //=============================================================================
    // Yanfly YEP_BattleEngineCore.js の対応
    //=============================================================================
    if (Imported.YEP_BattleEngineCore) {
    
    var _YPE_BEC_BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        this._processTurn = true;
        _YPE_BEC_BattleManager_processTurn.call(this);
        this._processTurn = false;
    };

    var _YPE_BEC_BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function() {
        _YPE_BEC_BattleManager_updateTurnEnd.call(this);
        if (this.isTurnBased() && this._spriteset.isPopupPlaying()) return;
        if (this.isTurnBased() && this._enteredEndPhase) return;
        this._enteredEndPhase = true;
        BattleManager.refreshAllMembers();
    };

    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
            case 'start':
                this.updateStart();
                break;
            case 'turnStart':
                this.updateTurnStart();
                break;
            case 'turn':
                this.updateTurn();
                break;
            case 'action':
                this.updateAction();
                break;
            case 'phaseChange':
                this.updatePhase();
                break;
            case 'actionList':
                this.updateActionList()
                break;
            case 'actionTargetList':
                this.updateActionTargetList()
                break;
            case 'actionEnd':
                this.updateActionEnd();
                break;
            case 'turnEnd':
                this.updateTurnEnd();
                break;
            case 'battleEnd':
                this.updateBattleEnd();
                break;
            }
        }
    };

    var _YPE_BEC_BattleManager_forceAction = BattleManager.forceAction;
    BattleManager.forceAction = function(battler) {
        if (this._subject) this._subject.clearResult();
        this.createForceActionFailSafes();
        this.savePreForceActionSettings();
        _YPE_BEC_BattleManager_forceAction.call(this, battler);
    };

    var _YPE_BEC_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (this._subject) {
          this._subject.onAllActionsEnd();
        }
        if (this._processingForcedAction) {
        this._subject.removeCurrentAction();
          this._phase = this._preForcePhase;
        }
        this._processingForcedAction = false;
        if (this.loadPreForceActionSettings()) return;
        _YPE_BEC_BattleManager_endAction.call(this);
    };

    Game_System.prototype.initBattleSystem = function() {
        this._battleSystem = 'dtb';
    };

    Scene_Battle.prototype.isStartActorCommand = function() {
        return false
    };

    var _YPE_BEC_Scene_Battle_startPartyCommandSelection =
        Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        if (this.isStartActorCommand()) {
            BattleManager.selectNextCommand();
            this.changeInputWindow();
        } else {
            _YPE_BEC_Scene_Battle_startPartyCommandSelection.call(this);
        }
    };

    var _YPE_BEC_Scene_Battle_selectNextCommand =
        Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
        _YPE_BEC_Scene_Battle_selectNextCommand.call(this);
        this._helpWindow.clear();
        BattleManager.stopAllSelection();
    };

    }// YEP_BattleEngineCore.js

}());//EOF
