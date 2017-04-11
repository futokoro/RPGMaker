//=======↓本プラグインを改変した場合でも、この欄は消さないでください↓===============
// スキル強化システム ウィンドウ関係プラグイン
// FTKR_SkillUpgradeSystem_Window.js
// 作成者     : フトコロ
// 作成日     : 2017/02/08
// 最終更新日 : 2017/03/16
// バージョン : v1.4.0
//=======↑本プラグインを改変した場合でも、この欄は消さないでください↑===============

var Imported = Imported || {};
Imported.FTKR_SUS_Window = true;

var FTKR = FTKR || {};
FTKR.SUS = FTKR.SUS || {};

//=============================================================================
/*:
 * @plugindesc v1.4.0 スキル強化システム ウィンドウ関係プラグイン
 * @author フトコロ
 *
 * @param ---Show Command---
 * @default
 * 
 * @param Show Skill Command
 * @desc メニュー欄のどこにスキル強化コマンドを追加するか。
 *  1 - メニュー欄, 2 - スキルメニュー欄, 3 - サブコマンド欄
 * @default 2
 *
 * @param Upgrade Skill Command Name
 * @desc スキル強化コマンドのコマンド名を設定します。
 * @default スキル強化
 *
 * @param Skill Menu Switch ID
 * @desc メニュー欄の表示のON/OFFを制御するスイッチIDを指定します。
 * @default 0
 *
 * @param Upgrade Disable Confirmation
 * @desc スキル強化実行時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない(コストが常に表示)
 * @default 1
 *
 * @param Always Display Cost
 * @desc 強化コストに常に表示するか。
 *  1 - 表示する, 0 - 表示しない
 * @default 0
 *
 * @param How Show NonUg Item
 * @desc 強化できないパラメータを薄く表示するか指定します。
 *  0 - 変更しない, 1 -薄く表示する
 * @default 0
 *
 * @param Hide Not Upgrade Item
 * @desc 強化不可設定のパラメータを非表示にするか指定します。
 *  1 - 表示しない, 0 - 表示する
 * @default 0
 *
 * @param Hide Cannot Pay Item
 * @desc 強化コスト不足のパラメータを非表示にするか指定します。
 *  1 - 表示しない, 0 - 表示する
 * @default 0
 *
 * @param Hide Limit Upgrade Item
 * @desc 最大強化レベルに達したパラメータを非表示にするか指定します。
 *  1 - 表示しない, 0 - 表示する
 * @default 0
 * 
 * @param --Skill List Window--
 * @default
 * 
 * @param Skill List Width
 * @desc スキルリストウィンドウの幅を指定します。
 *  デフォルトは 240
 * @default 240
 *
 * @param --Skill Status Title Window--
 * @default
 * 
 * @param Skill Status Title Format
 * @desc タイトルの表示内容を文字列で記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default [%2]のスキル情報\c[16]
 *
 * @param Discription Lines
 * @desc スキルの説明文の行数を設定します。
 * @default 2
 *
 * @param --Skill Status Window--
 * @default
 *
 * @param Skill Status Text1 Format
 * @desc スキルステータスのテキスト1の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default %1
 *
 * @param Skill Status Text2 Format
 * @desc スキルステータスのテキスト2の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default LV\sb[60]\l[2]\n%2\lR[2]\n/\c[17]\nMAX\sb[60]\c[17]\n%3\lR[2]\c[17]
 *
 * @param Skill Status Text3 Format
 * @desc スキルステータスのテキスト3の表示内容を記述します。
 *  詳細はヘルプ参照のこと
 * @default %4
 *
 * @param Skill Status Width Rate
 * @desc テキスト1～3を表示するテキスト幅の比率
 *  カンマ(,)で区切って表示すること
 * @default 1,1,1
 * 
 * @param Skill Status Line Color1
 * @desc ラインの色1を指定します。
 *  -1 を設定した場合は、ラインは非表示
 * @default 17
 * 
 * @param Skill Status Line Color2
 * @desc ラインの色2を指定します。
 *  -1 を設定した場合は、ラインは非表示
 * @default 17
 *
 * @param Skill Status Line Gauge
 * @desc スキルレベルの差により、ラインをゲージとして使用するか。
 *  1 - ゲージにする, 0 - ゲージにしない
 * @default 0
 *
 * @param Skill Status Max Cols
 * @desc 1行に表示するステータスの数を指定します。
 *  (最小値 1, 最大値 3)
 * @default 1
 * 
 * @param Skill Status Item Heigth
 * @desc 1つのステータスを表示する行数を指定します。
 *  (最小値 1, 最大値 3)
 * @default 1
 * 
 * @param --Upgrade Param Window--
 * @default
 *
 * @param Upgrade Param Title Format
 * @desc タイトルの表示内容を文字列で記述します。
 *  %1 - スキル名, %2 - 強化タイプ名
 * @default [%2]の情報\c[16]
 *
 * @param Upgrade Param SubTitle Format
 * @desc パラメータタイトルの表示内容を文字列で記述します。
 * @default 強化値：\c[16]
 *
 * @param Upgrade Param Text Format
 * @desc 表示内容を文字列で記述します。
 *  フォーマットのパラメータはヘルプ参照
 * @default \l[2]\nLV\n%1\lR[2]\n:\n%2\lR[6]\n⇒\l[2]\C\nLV\n%3\lR[2]\n:\n%4\lR[6]
 *
 * @param Upgrade Param CostTitle Format
 * @desc コストタイトルの表示内容を文字列で記述します。
 * @default コスト：\c[16]
 *
 * @param Upgrade Param CostItem Format
 * @desc コストの表示内容を文字列で記述します。
 *  %1 - コスト名, %2 - コスト数量, %3 - コストの手持ち量
 * @default %1\l[16]\n%2\lR[3]\c[17]\n%3\c[17]\lR[5]
 *
 * @param Upgrade Param MaxLv Message
 * @desc 最大強化レベルに達した時の表示内容を文字列で記述します。
 * @default \l[2]\nこれ以上強化できません
 *
 * @param Upgrade Param Cost Lines
 * @desc 3つのコストを並べ方を指定します。
 * parallel - 3行に並べる, series - 1行にまとめる,
 * @default parallel
 *
 * @param --Confirmation Window--
 * @default
 *
 * @param Confirmation Title Format
 * @desc スキル強化実行時の確認内容を記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default スキル強化の確認
 *
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param --Upgrade SE--
 * @default
 * 
 * @param Upgrade SE Name
 * @desc 強化実行時に鳴らすSEの名前を指定します。
 * @default Sound2
 *
 * @param Upgrade SE Volume
 * @desc 強化実行時に鳴らすSEの音量を指定します。
 * @default 90
 *
 * @param Upgrade SE Pitch
 * @desc 強化実行時に鳴らすSEのピッチを指定します。
 * @default 100
 *
 * @param Upgrade SE Pan
 * @desc 強化実行時に鳴らすSEの位相を指定します。
 * @default 0
 *
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、FTKR_SkillUpgradeSystem.jsの拡張プラグインです。
 *
 * 本プラグインを実装することで、スキル強化システムの専用画面を表示し、
 * 視覚的にスキルを強化することができるようになります。
 *
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください。
 *
 * 2. 本プラグインを動作させるには、以下のプラグインが必要です。
 *    FTKR_SkillExpansion.js  (v1.2.x)
 *    FTKR_SEP_ShowSkillStatus.js  (v1.3.x)
 *    FTKR_SkillUpgradeSystem_Window.js (v1.4.x)
 *    本プラグインは、それらのプラグインよりも下の位置になるように
 *    追加してください。
 * 
 * 4. アクターのステータスを表示するためには
 *    FTKR_CustomSimpleActorStatus.jsが必要です。
 *    本プラグインは、FTKR_CustomSimpleActorStatus.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 5. スキルに枠を表示するためにはsFTKR_DisplayCommandFrame.jsが必要です。
 *    本プラグインは、FTKR_DisplayCommandFrame.jsよりも下の位置に
 *    なるように追加してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ウィンドウの構成
 *-----------------------------------------------------------------------------
 * スキル強化システムは、以下のウィンドウで画面を構成しています。
 * 
 * [メニューのスキル画面またはサブコマンド欄から呼び出した場合]
 * プラグインパラメータ<Show Skill Command : 2, 3>の時にスキル画面に表示
 * 
 * ┌-----------─-------------------------------------┐
 * │                      <1>                         │
 * ├-----------┬-------------------------------------┤
 * │           │                                     │
 * │    <2>    │                <4>                  │
 * │           │                                     │
 * ├-----------┼-------------------------------------┤
 * │           │                <5>                  │
 * │           ├-------------------------------------┤
 * │           │                <6>                  │
 * │    <3>    ├-------------------------------------┤
 * │           │                                     │
 * │           │            <6> or <7>               │
 * │           │               (*1)                  │
 * └-----------┴-------------------------------------┘
 * 
 * 1. ヘルプウィンドウ
 * 2. コマンドウィンドウ
 * 3. スキルリストウィンドウ
 * 4. アクターステータスウィンドウ
 * 5. スキルステータスタイトルウィンドウ
 * 6. スキルステータスウィンドウ
 * 7. 強化パラメータウィンドウ    (*1)
 * 8. 強化確認ウィンドウ          (*2)
 * 
 * (*1) プラグインパラメータ<Always Display Cost>で表示するを
 *      設定した場合に表示します。表示しない場合、<6>のスキル
 *      ステータスウィンドウが広がります。
 * 
 * (*2) 強化タイプ選択後に表示するウィンドウ 
 *      (プラグインパラメータ<Upgrade Disable Confirmation>で
 *      確認するを設定した場合のみ)
 * 
 * 
 * [メニュー画面またはプラグインコマンドから呼び出した場合]
 * プラグインパラメータ<Show Skill Command : 1>の時にメニューに表示
 * プラグインコマンド
 *    <SUS Open>
 *      :スキル強化システムの画面を呼びます。
 *      :'PageUp','PageDown'キーによりアクターを変えることができます。
 * 
 * ┌-----------┬-------------------------------------┐
 * │    <1>    │                <4>                  │
 * ├-----------┤                                     │
 * │           ├-------------------------------------┤
 * │    <2>    │                                     │
 * │           │                                     │
 * ├-----------┤                                     │
 * │           │                <5>                  │
 * │           │                                     │
 * │           │                                     │
 * │    <3>    ├-------------------------------------┤
 * │           │                                     │
 * │           │            <5> or <6>               │
 * │           │               (*1)                  │
 * └-----------┴-------------------------------------┘
 * 
 * 1. アクターステータスウィンドウ
 * 2. スキルタイプリストウィンドウ
 * 3. スキルリストウィンドウ
 * 4. スキルステータスタイトルウィンドウ
 * 5. スキルステータスウィンドウ
 * 6. 強化パラメータウィンドウ    (*1)
 * 7. 強化確認ウィンドウ          (*2)
 * 
 * (*1) プラグインパラメータ<Always Display Cost>で表示するを
 *      設定した場合に表示します。表示しない場合、<6>のスキル
 *      ステータスウィンドウが広がります。
 * 
 * (*2) 強化タイプ選択後に表示するウィンドウ 
 *      (プラグインパラメータ<Upgrade Disable Confirmation>で
 *      確認するを設定した場合のみ)
 * 
 * 
 *-----------------------------------------------------------------------------
 * メニューの表示
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、スキル強化コマンドを追加する場所や
 * 表示方法を変更することができます。
 * 
 * <Show Skill Command>
 *          :メニュー欄、またはスキルメニュー欄に表示することを選べます。
 *          : 1 - メニューに表示
 *          : 2 - スキルメニューに表示
 *          : それ以外は、非表示になります。
 * 
 * <Upgrade Skill Command Name>
 *          :コマンドの表示名を変更できます。
 * 
 * <Skill Menu Switch ID>
 *          :ゲーム内のスイッチでメニューへの表示のON/OFFを制御できます。
 *          :スイッチIDを入力してください。
 *          : 0 を指定すると、無効になります。
 * 
 * <Upgrade Disable Confirmation>
 *           :スキル強化実行時に確認画面で実行確認するか選べます。
 *           :確認しないに設定すると、<Always Display Cost>の設定が
 *           :無効になり、コストウィンドウが常に表示されます。
 * 
 * <Always Display Cost>
 *          :強化コストに常に表示するか選べます。
 *          :表示するに設定すると、変わりに確認画面で
 *          :強化パラメータウィンドウが表示されなくなります。
 * 
 * <How Show NonUg Item>
 *          :強化できないパラメータの明示方法を設定できます。
 *          :
 *          :設定値は以下の通りです。
 *          : 0 - そのまま表示します。
 *          : 1 - 薄く表示します。
 * 
 * <Hide Not Upgrade Item>    (強化不可設定の場合)
 * <Hide Cannot Pay Item>     (強化コスト不足の場合)
 * <Hide Limit Upgrade Item>  (最大強化レベルに達した場合)
 *          :それぞれ、対象のパラメータを非表示にするか指定します。
 *          : 1 - 表示しない, 0 - 表示する
 * 
 * 
 * [使用可能なプラグインコマンド]
 * <SUS Hide Actor x>   :アクターID x の強化コマンドを非表示にする。
 * 
 * <SUS Show Actor x>   :アクターID x の強化コマンドを表示にする。
 * 
 * 
 * [使用可能なノートタグ]
 * 対象：アクター、クラス
 * <SUS Command Hide>   :このノートタグを設定した場合、初期状態で
 *                      :スキル強化コマンドを非表示にします。
 *                      :プラグインコマンドで、表示に変更できます。
 *
 * 
 *-----------------------------------------------------------------------------
 * スキルリストウィンドウ
 *-----------------------------------------------------------------------------
 * 強化可能な「スキル名」を表示します。
 * ノートタグで強化禁止設定にしたスキルは表示しません。
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Skill List Width>
 *          :スキルリストウィンドウの幅を設定します。
 *          :デフォルトは、コマンドリストと同じ 240 です。
 *          :この値を変更すると、これに紐付いている他の
 *          :ウィンドウの幅も自動的に変わります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルステータスタイトルウィンドウ (Upgrade Title Window)
 *-----------------------------------------------------------------------------
 * 自由に記述を変更できるタイトル行と、スキルの属性と説明文を表示するウィンドウです。
 * 以下のプラグインパラメータで変更できます。
 * 
 * スキルの属性で表示される内容は、ダメージID 0 の属性です。
 * ただし、スキル以外の追加属性の特徴を乗せていた場合でも、その属性は表示しません。
 * 
 * <Skill Status Title Format> 
 *          :タイトル行目の表示内容を文字列で設定します
 *          : %1 - アクター名, %2 - スキル名
 * 
 * <Discription Lines> 
 *          :スキルの説明文の行数を設定します
 *          :変更すると、スキルステータスウィンドウの高さも変わります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スキルステータスウィンドウ (Skill Status Window)
 *-----------------------------------------------------------------------------
 * 選択したスキルのステータス名、現在強化レベル、最大強化レベル、ステータス値を
 * 表示します。
 * 
 * [ステータス値の表示について]
 * 1. 強化タイプが「ダメージ」の場合
 *   ⇒「各ダメージIDで設定したスキル名」を表示します。
 *     なお、スキル名に'%1'を加えた場合、その箇所がダメージ倍率の値になります。
 *    例) 「炎攻撃%1%」というスキル名で、ダメージ倍率が100 の場合、「炎攻撃100%」
 * 
 * 2. 強化タイプが「使用効果」の場合
 *   ⇒「使用効果の名称 ＋ 強化量」で表示します。
 *    例) 使用効果がHP回復で、強化量が10 の場合、「HP回復10」
 * 
 *    ただし、<Display>タグを設定している場合はその記述を優先します。
 * 
 * 3. それ以外の場合
 *   ⇒「強化量」で表示します。
 * 
 * 
 * 以下のプラグインパラメータで変更できます。
 * 
 * 1. テキスト関係
 * <Skill Status Text1 Format>
 * <Skill Status Text2 Format>
 * <Skill Status Text3 Format>
 *          :スキルのスキル名/レベル/ステータス値の表示内容を文字列で設定します。
 *          :%1 - 強化タイプ名, %2 - 現在強化レベル, %3 - 最大強化レベル
 *          :%4 - 現在のステータス値
 *          :<Skill Status Item Heigth>の設定値により
 *          :Text1~3の表示位置が変わります。
 * 
 * <Skill Status Width Rate>
 *          :Text1~3の表示するテキスト幅の比率を設定します。
 *          :1行表示の場合
 *          : 1,1,1 に設定すると、同じ幅に3分割します。
 *          : 2,1,1 に設定すると、Text1を半分使用し、残りを2等分します。
 * 
 * 3. ライン
 * <Skill Status Line Color1>
 * <Skill Status Line Color2>
 *          :ラインの色を指定します。色1と色2を変えた場合は
 *          :ラインをグラデーション表示にします。
 *          : -1 を設定した場合は、非表示にします。
 * 
 * <Skill Status Line Gauge>
 *          :ラインをスキル強化状態を表すゲージとして使用するか
 *          :設定できます。現在レベルと最大レベルの差により、
 *          :ゲージの色が変化します。
 * 
 * 4. 枠
 * 枠表示に対しては、FTKR_SEP_ShowSkillStatus.jsの設定を適用します。
 *
 * 5. ステータスの表示数の設定
 * <Skill Status Max Cols>
 *          :1行に表示するステータスの数を指定します。
 * 
 * <Skill Status Item Heigth>
 *          :1つのステータスを表示する行数を指定します。
 *          :2行表示にすると、1行目にText1とText2を
 *          :2行目にText3を表示します。
 *          :3行表示にすると、1行目にText1、2行目にText2
 *          :3行目にText3を表示します。
 * 
 * 
 * [使用可能なノートタグ]
 * 対象：スキル
 * <SUS Show Switch x Type: y1,y2,...>
 *    :指定した強化タイプの表示をスイッチのON/OFFで制御する。
 *    : x - スイッチID
 *    : y - 強化タイプ番号
 *  
 *  例)  <SUS Show Switch 1 Type: 1,2,3>
 *    スイッチ1 がONの時、強化タイプ1,2,3を表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 強化パラメータウィンドウ (Upgrade Param Window)
 *-----------------------------------------------------------------------------
 * 選択した強化タイプの、強化パラメータを表示するウィンドウです。
 * 強化パラメータウィンドウは、以下の最大7行のテキストで構成しています。
 * コスト行は、プラグインパラメータの設定により、行数を変えることができます。
 * 
 *   1.タイトル(1行)
 *         :自由記述欄
 *   2.強化パラメータタイトル(1行)
 *         :自由記述欄
 *   3.強化パラメータ(1行)
 *         :強化パラメータを表示。自由記述欄
 *   4.コストタイトル(1行)
 *         :自由記述欄
 *   5.コスト(1行 または 3行)
 *         :設定したコスト名と数量、手持ちの総数を表示
 * 
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Always Display Cost>
 *          :強化パラメータのうち、コストタイトルとコストを
 *          :常に表示するか設定できます。
 *          :表示しないを選択した場合は、強化タイプを選択した時に
 *          :強化確認ウィンドウと一緒に画面中央に表示します。
 * 
 * <Upgrade Param Title Format>     
 *          :タイトル行の表示内容を文字列で記述します。
 *          :%1 - スキル名, %2 - 強化タイプ名
 * 
 * <Upgrade Param SubTitle Format>  
 *          :強化パラメータタイトル行の表示内容を文字列で記述します。
 * 
 * <Upgrade Param Text Format>  
 *          :強化パラメータ行の表示内容を文字列で記述します。
 *          :%1 - 現在強化レベル, %2 - 現在強化レベルの強化量
 *          :%3 - 次強化レベル, %4 - 次強化レベルの強化量
 * 
 * <Upgrade Param CostTitle Format> 
 *          :コストタイトルの表示内容を文字列で記述します。
 * 
 * <Upgrade Param CostItem Format> 
 *          :コストの表示内容を文字列で記述します。
 * 
 * <Upgrade Param MaxLv Message>    
 *          :最大強化レベルに達したときに強化パラメータ行に表示する
 *          :内容を文字列で記述します。
 *          :この内容は、強化パラメータ行の内容と入れ替わります。
 * 
  * <Upgrade Param Cost Lines>    
 *          :最大3つのコストを並べ方を指定します。
 *          : parallel - 1行に1つのコストを表示して、3行に並べます。
 *          : series   - 1行に、3つのコストを並べます。
 *          :seriesにすると、強化パラメータウィンドウの高さが変わります。
 * 
 * 
 * [表示されるコストアイコン]
 * 
 * コスト名を表示する際には、コスト名の頭にコストアイコンが付きます。
 * 
 * 表示するアイコンは、コストがアイテムであれば、そのアイテムで設定したアイコンを
 * 表示します。
 * 
 * コストが、お金および変数の場合は、FTKR_SEP_ShowSkillStatus.jsの
 * プラグインパラメータの設定を使用します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 強化確認ウィンドウ (Confirmation Window)
 *-----------------------------------------------------------------------------
 * スキル強化選択時に表示されるウィンドウです。
 * 以下のプラグインパラメータで変更できます。
 * 
 * <Confirmation Title Format> 
 *          :確認時のテキストの表示内容を文字列で設定します。
 *          : %1 - アクター名, %2 - スキル名
 * 
 * <Confirmation Ok Format> 
 *          :確認コマンドの「実行する」の表示内容を設定します。
 * 
 * <Confirmation Cancel Format> 
 *          :確認コマンドの「実行しない」の表示内容を設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターステータスウィンドウ (Actor Status Window)
 *-----------------------------------------------------------------------------
 * スキル強化画面を、メニュー画面またはプラグインコマンドから呼び出した場合に
 * 表示するアクターステータスウィンドウのレイアウトは
 * FTKR_SEP_ShowSkillStatus.jsのプラグインパラメータの設定を使用します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインパラメータで使用できる制御文字について
 *-----------------------------------------------------------------------------
 * 
 * 本プラグインでは、ウィンドウのテキスト欄に表示する内容を、プラグインパラメータで
 * 設定することができます。 
 * 
 * その際に、以下の制御文字を文字列に加えることで、テキストの書式を詳細に変更する
 * ことができるようになります。
 * 
 * [使用できるプラグインパラメータ]
 * パラメータ名に Format の文字が含まれているもの。
 * 
 * 
 * [使用できる制御文字]　注意:制御文字は大文字小文字を区別します
 * 
 * 1. 文字列幅を変更
 *      \l[x]   :字列幅を x に変更します。
 *              :x の単位は 1バイト文字分のサイズです。
 *              :'強化サイズ\l[5]'のように表記します。
 *              :
 *              :デフォルトでは、1バイト文字を 1 ,2バイト文字を 2 と換算し
 *              :最適な幅を自動で設定します。
 *              :上記の例の場合、通常の半分のサイズに縮めて表示します。
 * 
 *      \lR[x]  :字列幅を x に変更し、右揃えにします。
 * 
 *      \lC[x]  :字列幅を x に変更し、中央揃えにします。
 * 
 * 2. 文字色を変更
 *      \c[x]   :表示する文字色をx番に変更します。
 *              :番号と色の関係は、ツクールMV標準の色番号と同じです。
 *              :デフォルトでは白文字(x = 0)です。
 * 
 * 3. 文字サイズを変更
 *      \s[x]   :文字のサイズをデフォルトサイズの x% に変更します。
 *              :'レベル\s[60]'のように表記します。
 *              :なお、デフォルトの文字サイズは、28です。
 * 
 *      \sb[x]  :文字のサイズをデフォルトサイズの x% に変更して
 *              :表示行の下側に揃えます。
 * 
 *      \sp[x]  :文字のサイズをデフォルトサイズの x% に変更して
 *              :表示行の上側に揃えます。
 * 
 * 4. 表示位置を変更(他に制御文字を使っていない場合にのみ有効)
 *      \R      :右揃えにします。
 * 
 *      \C      :中央揃えにします。
 * 
 * 5. 書式の区切り
 *      \n      :1つの文字列に対して、複数の色やサイズを使い分けたい場合、
 *              :この制御文字を文中に加えることで、加えた箇所で文字列を
 *              :区切り、それぞれの文字列に対して異なる書式を適用できます。
 *              : 例) '強化\nタイプ' ⇒ '強化'と'タイプ'に区切る
 * 
 * 
 * [制御文字の使用例]
 * 
 * 1.区切りなしで、制御文字を1つ使った場合
 * '強化タイプ\c[16]' :この場合は'強化タイプ'をすべて文字色16に変更します。
 * 
 * 2.区切りなしで、同種の制御文字を複数使った場合
 * '強化\c[16]タイプ\c[17]'
 *                   :この場合は、始めの\c[16]が適用されて、'強化タイプ'を
 *                    すべて文字色16に変更します。
 * 
 * 3.区切りありで、制御文字を1つ使った場合
 * '強化\c[16]\nタイプ'
 *                   :この場合は、'強化'と'タイプ'が区切られ、強化'を
 *                    文字色16に変更し、'タイプ'はデフォルト色のままです。
 * 
 * 4.区切りありで、同種の制御文字を複数使った場合
 * '強化\c[16]\nタイプ\c[17]'
 *                   :この場合は、'強化'と'タイプ'が区切られ、強化'を
 *                    文字色16に、'タイプ'を文字色17に変更します。
 * 
 * 5.異なる種類の制御文字を複数使った場合
 * '強化タイプ\c[17]\s[60]'
 *                   :この場合は、'強化タイプ'をすべて文字色16に変更し
 *                    さらに、フォントサイズを60%に縮めます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 強化実行時のSEの設定
 *-----------------------------------------------------------------------------
 * 強化実行時に鳴らすSEは種類、音量、ピッチ、位相を変更可能です。
 * 以下のプラグインパラメータで書式を変更できます。
 * 
 * <Upgrade SE Name>    :SEに使用する種類を変更します。
 *                      :使用したいSE名を記載してください。
 * 
 * <Upgrade SE Volume>  :SEの音量を変更します。
 * 
 * <Upgrade SE Pitch>   :SEのピッチを変更します。
 * 
 * <Upgrade SE Pan>     :SEの位相を変更します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * パラメータ表示名の設定
 *-----------------------------------------------------------------------------
 * 「スキルステータス名」や「ダメージタイプ名」等の画面に表示されるパラメータ名は
 * FTKR_SEP_ShowSkillStatus.jsのプラグインパラメータで設定した名称を使用します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインを使用するに当たって    ☆重要☆
 *-----------------------------------------------------------------------------
 * 1.本プラグインは改変可です。
 *   ただし、一番始めに記載した作成者等の欄は残してください。
 * 
 * 2.本プラグインを使用するに当たって、ゲーム中にライセンス表示することは
 *   必須ではありません。ただ、どこかゲーム外のReadme等にでも記載して頂けると
 *   うれしいです。
 * 
 * 3.本プラグインを使用する、または改変するに当たって、私フトコロに許可を取る
 *   ことや、連絡することは必要ありません。
 * 
 * 4.本プラグインは、有料ゲームに使用することは構いません。
 *   ただし、改変した場合でも、プラグイン単体で販売することは止めてください。
 *   
 * 5.本プラグインは、年齢制限のあるゲームに使用することは構いません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインのヘルプについて
 *-----------------------------------------------------------------------------
 * 強化パラメータの設定方法や、ノートタグの使い方などについては
 * 別ファイルの「FTKR_SkillUpgradeSystem_Core.js」を参照してください。
 *
 *
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.4.0 - 2017/03/16 : 処理見直し、機能追加
 *    1. FTKR_SEP_ShowSkillStatus.js v1.3.0 に合わせて処理を見直し。
 *    2. 枠の表示処理を、FTKR_SEP_ShowSkillStatus.jsから読み取る方式に変更。
 *    3. サブコマンドからスキル強化画面を表示する機能を追加。
 *    4. ヘルプ記載内容を修正。
 * 
 * v1.3.0 - 2017/02/24 : 処理見直し
 *    1. FTKR_SkillExpansion.js v1.1.0 に合わせて処理を見直し。
 * 
 * v1.2.1 - 2017/02/20 : 不具合修正
 *    1. drawElement関数内の記述ミス修正
 *    2. ヘルプ記載内容を修正。
 * 
 * v1.2.0 - 2017/02/19 : FTKR_SkillExpansion.jsの適用(94.9kB)
 *    1. FTKR_SkillExpansion.jsに合わせて処理を見直し。
 *    2. ヘルプ記載内容を修正。
 * 
 * v1.1.0 - 2017/02/15 : 不具合修正、機能変更および追加(95.9kB)
 *    1. 強化実行SEを正しく鳴らすことができない不具合を修正。
 *    2. 強化できないパラメータに対する表示設定を変更
 *    3. スイッチで強化タイプの表示のON/OFFを制御できる機能を追加。
 *    4. FTKR_SkillUpgradeSystem_Coreの v1.5.0 に伴う修正を追加。
 *    5. FTKR_SkillUpgradeSystem_Coreのバージョン表記に合わせて
 *       バージョンを修正。(v1.02は、v1.0.2 とみなす)
 * 
 * v1.02 - 2017/02/13 : 強化できないパラメータに対する表示設定を追加(94.0kB)
 * 
 * v1.01 - 2017/02/12 : スキル強化画面のレイアウト変更、他微修正(92.5kB)
 *    1. スキル強化画面のレイアウト変更。
 *    2. メニュー画面にスキル強化コマンドを表示できるように変更。
 *    3. スキル強化実行時に確認のウィンドウを表示する機能を追加。
 *    4. ヘルプ記載内容を修正。
 *    5. 関数名を一部修正。
 *    6. Window_Base.drawFormatTextの引数にテキスト幅を追加し、テキスト幅を
 *       自動調整する機能を追加。
 *    7. 表示位置の制御文字を、文字列幅の制御文字と組み合わせて
 *       使用できるように変更。
 * 
 * v1.00 - 2017/02/08 : 初版作成(63.3kB)
 *    1. FTKR_SkillUpgradeSystem.jsからwindou関係の関数を分割して
 *       本プラグインを作成。
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//本プラグインはFTKR_SkillExpansion.jsとFTKR_SkillUpgradeSystem.jsが必要
if (Imported.FTKR_SEP && Imported.FTKR_SUS) {

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SUS.parameters = PluginManager.parameters('FTKR_SkillUpgradeSystem_Window');

//メニュー表示
FTKR.SUS.showCommand = Number(FTKR.SUS.parameters['Show Skill Command'] || 0);
FTKR.SUS.commandName = String(FTKR.SUS.parameters['Upgrade Skill Command Name'] || 'スキル強化');
FTKR.SUS.menuSwitchId = Number(FTKR.SUS.parameters['Skill Menu Switch ID'] || 0);
FTKR.SUS.enableConf = Number(FTKR.SUS.parameters['Upgrade Disable Confirmation'] || 0);
FTKR.SUS.alwaysDispCost = Number(FTKR.SUS.parameters['Always Display Cost'] || 0);
FTKR.SUS.showNonUgItem = Number(FTKR.SUS.parameters['How Show NonUg Item'] || 0);
FTKR.SUS.hideNotUgItem = Number(FTKR.SUS.parameters['Hide Not Upgrade Item'] || 0);
FTKR.SUS.hideCantPayItem = Number(FTKR.SUS.parameters['Hide Cannot Pay Item'] || 0);
FTKR.SUS.hideLimitUgItem = Number(FTKR.SUS.parameters['Hide Limit Upgrade Item'] || 0);

if (!FTKR.SUS.enableConf) FTKR.SUS.alwaysDispCost = 1;
FTKR.SUS.skillListWidth = Number(FTKR.SUS.parameters['Skill List Width'] || 240);
FTKR.SUS.subUpgradeOk = false;

//ステータス欄の表示名、色
FTKR.SUS.ustatusTitleFormat = String(FTKR.SUS.parameters['Skill Status Title Format'] || '');
FTKR.SUS.DiscriptionLines = Number(FTKR.SUS.parameters['Discription Lines'] || 2);

FTKR.SUS.utypeText1Format = String(FTKR.SUS.parameters['Skill Status Text1 Format'] || '');
FTKR.SUS.utypeText2Format = String(FTKR.SUS.parameters['Skill Status Text2 Format'] || '');
FTKR.SUS.utypeText3Format = String(FTKR.SUS.parameters['Skill Status Text3 Format'] || '');
FTKR.SUS.utypeWidthRate = String(FTKR.SUS.parameters['Skill Status Width Rate'] || '1,1,1');
FTKR.SUS.utypeLineColor1 = Number(FTKR.SUS.parameters['Skill Status Line Color1'] || -1);
FTKR.SUS.utypeLineColor2 = Number(FTKR.SUS.parameters['Skill Status Line Color2'] || -1);
FTKR.SUS.utypeLineGauge = Number(FTKR.SUS.parameters['Skill Status Line Gauge'] || 0);
FTKR.SUS.utypeMaxCols = Number(FTKR.SUS.parameters['Skill Status Max Cols'] || 1);
FTKR.SUS.utypeItemHeigth = Number(FTKR.SUS.parameters['Skill Status Item Heigth'] || 1);

FTKR.SUS.ucostTitleFormat = String(FTKR.SUS.parameters['Upgrade Param Title Format'] || '');
FTKR.SUS.ucostSubTitle1Text = String(FTKR.SUS.parameters['Upgrade Param SubTitle Format'] || '');
FTKR.SUS.ucostTextFromat = String(FTKR.SUS.parameters['Upgrade Param Text Format'] || '');
FTKR.SUS.ucostSubTitle2Text = String(FTKR.SUS.parameters['Upgrade Param CostTitle Format'] || '');
FTKR.SUS.ucostItemFormat = String(FTKR.SUS.parameters['Upgrade Param CostItem Format'] || '');
FTKR.SUS.CannotUpgradeMessage = String(FTKR.SUS.parameters['Upgrade Param MaxLv Message'] || '');
FTKR.SUS.ucostCostLines = String(FTKR.SUS.parameters['Upgrade Param Cost Lines'] || 'parallel');

FTKR.SUS.confTitleFormat = String(FTKR.SUS.parameters['Confirmation Title Format'] || '');
FTKR.SUS.confOkFormat = String(FTKR.SUS.parameters['Confirmation Ok Format'] || '');
FTKR.SUS.confCancelFormat  = String(FTKR.SUS.parameters['Confirmation Cancel Format'] || '');

//SE
FTKR.SUS.susSeName = String(FTKR.SUS.parameters['Upgrade SE Name'] || 'Sound2');
FTKR.SUS.susSeVolume = Number(FTKR.SUS.parameters['Upgrade SE Volume'] || 0);
FTKR.SUS.susSePitch = Number(FTKR.SUS.parameters['Upgrade SE Pitch'] || 0);
FTKR.SUS.susSePan = Number(FTKR.SUS.parameters['Upgrade SE Pan'] || 0);

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.SUS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  FTKR.SUS.Game_Actor_setup.call(this, actorId);
  ImageManager.loadFace(this.faceName());
};

Game_Actor.prototype.isNonUpgradeItem = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  return (this.isNotUpgrade(udata, skillId, dataId) && FTKR.SUS.hideNotUgItem > 0) ||
      (!this.canPayUpgradeCost(udata) && FTKR.SUS.hideCantPayItem > 0) ||
      (this.isUpgradeLimit(udata) && FTKR.SUS.hideLimitUgItem > 0) ||
      this.isHideSkillStatus(typeId, sepSkill, sepSkill.effects.length, dataId) ||
      !this.isSusShowSwitchOn(udata);
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSusSkillGauge = function(x, y, width, udata) {
  if (FTKR.SUS.utypeLineColor1 > -1 && FTKR.SUS.utypeLineColor2 > -1) {
    var rate = FTKR.SUS.utypeLineGauge && udata.limit ? udata.count/udata.limit : 1;
    this.drawGauge(x, y, width, rate, this.textColor(FTKR.SUS.utypeLineColor1),
        this.textColor(FTKR.SUS.utypeLineColor2));
  }
};

//書き換え
Window_Base.prototype.setSepSkillStatusFormats = function() {
  return [
    FTKR.SUS.utypeText1Format,
    FTKR.SUS.utypeText2Format,
    FTKR.SUS.utypeText3Format
  ];
};

//書き換え
Window_Base.prototype.setSepSkillStatusParams = function(skill, typeId, dataId) {
  var udata = this._actor.getSusUdata(skill.id, typeId, dataId);
  var utype = FTKR.SUS.utypes[typeId];
  return [
    TextManager.skillParam(utype.type, skill, dataId),
    udata.count,
    udata.limit,
    this.setSusUparam(utype.type, skill, udata.count, dataId, true)
  ];
};

//書き換え
Window_Base.prototype.sepTypeWidthRate = function() {
  return FTKR.SUS.utypeWidthRate;
};

//書き換え
Window_Base.prototype.sepTypeItemHeigth = function() {
  return FTKR.SUS.utypeItemHeigth;
};

//書き換え
Window_Base.prototype.exchangeFormat = function(format, skill, typeId, dataId) {
  var udata = this._actor.getSusUdata(skill.id, typeId, dataId);
  if (format.match(/%2|%3/) && !udata.limit) format = ''; 
};

Window_Base.prototype.setSusUparam = function(type, sepSkill, level, dataId, eflag) {
  var actor = this._actor;
  var id = this._skillId; 
  var skill = $dataSkills[id];
  if (type === 'scope' && !actor.isRandomScope(sepSkill)) {
    return this.getScopeName(actor, skill, level);
  } else {
    var uparam = actor.getSusUparamBase(id, type, level, dataId);
    if (type === 'damages') {
      return eflag ? TextManager.damageId(skill, dataId).format(uparam) : uparam + '%';
    } else if (type === 'effects') {
      var ueffect = sepSkill.effects[dataId];
      return eflag ? TextManager.effect(type, ueffect).format(uparam) : uparam;
    } else if (type === 'scope') {
      return this.getScopeName(actor, skill, 0).format(uparam);
    } else {
      return uparam;
    }
  }
};

Window_Base.prototype.getScopeName = function(actor, skill, level) {
  return TextManager.scope(actor.getSusScopeBase(skill.scope, level));
};

Window_Base.prototype.setUpgradeSound = function() {
  this._upgradeSound = {
    name:   FTKR.SUS.susSeName,
    volume: FTKR.SUS.susSeVolume,
    pitch:  FTKR.SUS.susSePitch,
    pan:    FTKR.SUS.susSePan
  };
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

FTKR.SUS.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  FTKR.SUS.Window_MenuCommand_addOriginalCommands.call(this);
  if (FTKR.SUS.showCommand === 1) {
    if (FTKR.SUS.menuSwitchId === 0) {
      this.addCommand(FTKR.SUS.commandName, 'upgrade skill', true);
    } else if (FTKR.SUS.menuSwitchId > 0 &&
      $gameSwitches.value(FTKR.SUS.menuSwitchId)) {
      this.addCommand(FTKR.SUS.commandName, 'upgrade skill', true);
    }
  }
};

//=============================================================================
// Window_SkillType
//=============================================================================

FTKR.SUS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
  FTKR.SUS.Window_SkillType_makeCommandList.call(this);
  if (this._actor) {
    if (!this._actor.isSusHide() && this.susShowCommand()) {
      this.addCommand(FTKR.SUS.commandName, 'susUpgrade', true);
    }
  }
};

Window_SkillType.prototype.susShowCommand = function() {
  if (FTKR.SUS.showCommand !== 2) return false;
  if (FTKR.SUS.menuSwitchId === 0) return true;
  return $gameSwitches.value(FTKR.SUS.menuSwitchId);
};

Window_SkillType.prototype.setSusConfTitleWindow = function(window) {
  this._susConfTitleWindow = window;
  this.update();
};

Window_SkillType.prototype.setSusCostWindow = function(window) {
  this._susCostWindow = window;
  this.update();
};

Window_SkillType.prototype.setSusSkillWindow = function(window) {
  this._susSkillListWindow = window;
  this.update();
};

Window_SkillType.prototype.setSusUpgradeWindow = function(window) {
  this._susSkillStatusWindow = window;
  this.update();
};

Window_SkillType.prototype.setSusUpgradeStatusWindow = function(window) {
  this._susStatusTitleWindow = window;
  this.update();
};

Window_SkillType.prototype.setSusConfirmationWindow = function(window) {
  this._susConfWindow = window;
  this.update();
};

FTKR.SUS.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
  FTKR.SUS.Window_SkillType_update.call(this);
  if (this._susSkillListWindow && this._susSkillStatusWindow  && this._susStatusTitleWindow) {
    this.updateSusShowHide();
  }
  if (this._susConfWindow && this._susConfTitleWindow) {
    this.updateSusConfirmation();
  }
  if (this._susCostWindow) {
    this.upgradeSusCost();
  }
};

Window_SkillType.prototype.updateSusShowHide = function() {
  if (this.currentSymbol() === 'susUpgrade') {
    this._susSkillListWindow.show();
  } else {
    this._susSkillListWindow.hide();
  }
  if (this.upgradeComOk()) {
    this._susStatusTitleWindow.show();
    this._susSkillStatusWindow.show();
  } else {
    this._susStatusTitleWindow.hide();
    this._susSkillStatusWindow.hide();
  }
};

Window_SkillType.prototype.updateSusConfirmation = function() {
  if (this.upgradeComOk() && this._susConfWindow._active) {
    this._susConfWindow.show();
    this._susConfTitleWindow.show();
  } else {
    this._susConfWindow.hide();
    this._susConfTitleWindow.hide();
  }
};

Window_SkillType.prototype.upgradeSusCost = function() {
  var flag = FTKR.SUS.alwaysDispCost;
  if (this.upgradeComOk() &&
      (!FTKR.SUS.enableConf || (this._susConfWindow._active && !flag) || flag)) {
    this._susCostWindow.show();
  } else {
    this._susCostWindow.hide();
  }
};

Window_SkillType.prototype.upgradeComOk = function() {
  return this.currentSymbol() === 'susUpgrade' || FTKR.SUS.subUpgradeOk;
};

//=============================================================================
// Window_UpgradeSkillList
//=============================================================================

function Window_UpgradeSkillList() {
  this.initialize.apply(this, arguments);
}

Window_UpgradeSkillList.prototype = Object.create(Window_Selectable.prototype);
Window_UpgradeSkillList.prototype.constructor = Window_UpgradeSkillList;

Window_UpgradeSkillList.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._stypeId = 0;
  this.refresh();
};

Window_UpgradeSkillList.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_UpgradeSkillList.prototype.maxItems = function() {
  return this._data ? this._data.length : 0;
};

Window_UpgradeSkillList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_UpgradeSkillList.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.item(this.index()));
};

Window_UpgradeSkillList.prototype.isEnabled = function(skillId) {
  return this._actor.isEnabledSusUpgrade(skillId, 0, 0) && this.includes($dataSkills[skillId]);
}

Window_UpgradeSkillList.prototype.includes = function(item) {
  return this._stypeId ? item && item.stypeId === this._stypeId : true;
}

Window_UpgradeSkillList.prototype.makeItemList = function() {
  this._data = [];
  var actor = this._actor;
  if (!actor) return false;
  this._data = actor._skills.filter( function(skillId) {
    return this.isEnabled(skillId);
  },this);
};

Window_UpgradeSkillList.prototype.item = function(index) {
  return this._data ? this._data[index] : null;
};

Window_UpgradeSkillList.prototype.drawItem = function(index) {
  if (this._actor) {
    var rect = this.itemRectForText(index);
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(true);
    var skillId = this.item(index);
    if (skillId) {
      var sepSkill = this._actor.sepSkill(skillId);
      this.drawItemName(sepSkill, rect.x, rect.y, rect.width);
    }
    this.changePaintOpacity(true);
  }
};

Window_UpgradeSkillList.prototype.setItemWindow = function(itemWindow) {
  this._itemWindow = itemWindow;
  this.update();
};

Window_UpgradeSkillList.prototype.setSusStatusWindow = function(susStatusWindow) {
  this._susActorStatusWindow = susStatusWindow;
  this.update();
};

Window_UpgradeSkillList.prototype.setStypeId = function(stypeId) {
    if (this._stypeId !== stypeId) {
        this._stypeId = stypeId;
        this.refresh();
        this.resetScroll();
    }
};

Window_UpgradeSkillList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  var skillId = this.item(this.index());
  if (this._stypeId) this._actor.setLastMenuSkill($dataSkills[skillId]);
  if (skillId) {
    if (this._itemWindow) this._itemWindow.setSkillId(skillId);
    if (this._susActorStatusWindow) this._susActorStatusWindow.setSkillId(skillId);
  }
};

Window_UpgradeSkillList.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
  this.callUpdateHelp();
};

Window_UpgradeSkillList.prototype.updateHelp = function() {
  Window_Selectable.prototype.updateHelp.call(this);
  var skillId = this.item(this.index());
  if (skillId !== undefined) {
    var sepSkill = this._actor.sepSkill(skillId);
    this.setHelpWindowItem(sepSkill);
  }
  if (this._statusWindow) this._statusWindow.setTempActor(null);
};

//=============================================================================
// Window_UpgradeTypeList
//=============================================================================

function Window_UpgradeTypeList() {
  this.initialize.apply(this, arguments);
}

Window_UpgradeTypeList.prototype = Object.create(Window_SepTypeList.prototype);
Window_UpgradeTypeList.prototype.constructor = Window_UpgradeTypeList;

Window_UpgradeTypeList.prototype.initialize = function(x, y, width, height) {
  Window_SepTypeList.prototype.initialize.call(this, x, y, width, height);
  this.defineUpgradeSound();
};

Window_UpgradeTypeList.prototype.maxCols = function() {
  return Math.limit(FTKR.SUS.utypeMaxCols, 1, 3);
};

Window_UpgradeTypeList.prototype.itemHeight = function() {
    return this.lineHeight() * Math.limit(FTKR.SUS.utypeItemHeigth, 1, 3);
};

Window_UpgradeTypeList.prototype.defineUpgradeSound = function() {
  this.setUpgradeSound();
};

Window_SepTypeList.prototype.drawSkillLine = function(x, y, width, skillId, typeId, dataId) {
    var udata = this._actor.getSusUdata(skillId, typeId, dataId);
    this.drawSusSkillGauge(x, y, width, udata);
};

Window_SepTypeList.prototype.drawSkillStatus = function(tx, ty, tw, rect, skill, typeId, dataId){
    this.drawSepSkillStatus(tx, ty, tw, rect, typeId, skill, dataId);
};

Window_SepTypeList.prototype.drawStatusIcon = function(x, y, typeId) {
    var utype = FTKR.SUS.utypes[typeId];
    var icon = utype.icon ? utype.icon : FTKR.SUS.utypes[0].icon;
    this.drawIcon(icon, x, y);
};

Window_UpgradeTypeList.prototype.setCostWindow = function(costWindow) {
  this._costWindow = costWindow;
  this.update();
};

Window_UpgradeTypeList.prototype.setConfWindow = function(confWindow) {
  this._confWindow = confWindow;
  this.update();
};

Window_UpgradeTypeList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this.item()) {
    this._susIndex = this.index();
    this._typeId = this.item().typeId;
    this._dataId = this.item().dataId;
    if (this._costWindow) this._costWindow.setTypeId(this._skillId, this._typeId, this._dataId);
    if (this._confWindow) this._confWindow.setEnabled(this._actor.canSusUpgrade(this._skillId, this._typeId, this._dataId));
  }
};

//=============================================================================
// Window_SusSkillType
//=============================================================================

function Window_SusSkillType() {
    this.initialize.apply(this, arguments);
}

Window_SusSkillType.prototype = Object.create(Window_Command.prototype);
Window_SusSkillType.prototype.constructor = Window_SusSkillType;

Window_SusSkillType.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this._actor = null;
};

Window_SusSkillType.prototype.windowWidth = function() {
    return FTKR.SUS.skillListWidth;
};

Window_SusSkillType.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.selectLast();
    }
};

Window_SusSkillType.prototype.numVisibleRows = function() {
    return 4;
};

Window_SusSkillType.prototype.isEnabled = function(stypeId) {
  return this._actor && !this._actor.actor().susNotUpgradeSkillType[stypeId];
};

Window_SusSkillType.prototype.makeCommandList = function() {
  if (this._actor) {
    var skillTypes = this._actor.addedSkillTypes();
    if (skillTypes) { 
      skillTypes.sort(function(a, b) {
        return a - b;
      });
      skillTypes.forEach(function(stypeId) {
        if (this.isEnabled(stypeId)) {
          var name = $dataSystem.skillTypes[stypeId];
          this.addCommand(name, 'skill', true, stypeId);
        }
      }, this);
    }
  }
};

Window_SusSkillType.prototype.drawItem = function(index) {
    if (Imported.FTKR_DCF && FTKR.DCF.enabled.skill) {
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawDcfFrame(index);
    }
    Window_Command.prototype.drawItem.call(this, index);
};

Window_SusSkillType.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._skillWindow) this._skillWindow.setStypeId(this.currentExt());
};

Window_SusSkillType.prototype.setSusSkillWindow = function(window) {
    this._skillWindow = window;
    this.update();
};

Window_SusSkillType.prototype.setSusConfTitleWindow = function(window) {
  this._susConfTitleWindow = window;
  this.update();
};

Window_SusSkillType.prototype.setSusCostWindow = function(window) {
  this._susCostWindow = window;
  this.update();
};

Window_SusSkillType.prototype.setSusUpgradeWindow = function(window) {
  this._susSkillStatusWindow = window;
  this.update();
};

Window_SusSkillType.prototype.setSusUpgradeStatusWindow = function(window) {
  this._susStatusTitleWindow = window;
  this.update();
};

Window_SusSkillType.prototype.setSusConfirmationWindow = function(window) {
  this._susConfWindow = window;
  this.update();
};

Window_SusSkillType.prototype.selectLast = function() {
    var skill = this._actor.lastMenuSkill();
    skill ? this.selectExt(skill.stypeId) : this.select(0);
};


//=============================================================================
// Window_SusCost
//=============================================================================

function Window_SusCost() {
  this.initialize.apply(this, arguments);
}

Window_SusCost.prototype = Object.create(Window_Base.prototype);
Window_SusCost.prototype.constructor = Window_SusCost;

Window_SusCost.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._draw = true;
  this.clearWindow()
};

Window_SusCost.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SusCost.prototype.clearWindow = function() {
  this._typeId = null;
  this._skillId = null;
  this._dataId = null;
  this.refresh();
};

Window_SusCost.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllCost();
};

Window_SusCost.prototype.drawAllCost = function() {
  if (this._actor && this._typeId && this._draw) {
    var actor = this._actor;
    var sId = this._skillId;
    var eId = this._dataId;
    var sepSkill = actor.sepSkill(sId);
    var udata = actor.getSusUdata(sId, this._typeId, eId);
    var type = FTKR.SUS.utypes[this._typeId].type;

    var width = this.width - this.standardPadding() * 2;
    var y = this.lineHeight();
    var cy = y * 3;

    if(!FTKR.SUS.alwaysDispCost) {
      this.drawSusUparam(y, width, sepSkill, type, udata, eId);
      cy = 0;
    }
    this.drawFormatText(FTKR.SUS.ucostSubTitle2Text, 0, y*3 - cy, width);
    var sp = this.textWidth('0');
    var dcx = [0,0,0];
    var sflag = 1;
    if (FTKR.SUS.ucostCostLines === 'series') {
      width = (width - sp*2)/3;
      dcx = [0, width + sp, width*2 + sp*2];
      sflag = 0;
    }
    for (var i = 0; i< 3; i++) {
      this.drawSepCost(FTKR.SUS.ucostItemFormat, udata.cost[i], dcx[i], y*4 - cy + y*i*sflag, width);
    }
  }
};

Window_SusCost.prototype.drawSusUparam = function(y, width, sepSkill, type, udata, dataId) {
  var defname = FTKR.SUS.susUpgradeDefName;
  var params = [
      sepSkill.name,
      defname.format(TextManager.skillParam(type, sepSkill, dataId))
  ];
  this.drawFormatText(FTKR.SUS.ucostTitleFormat, 0, 0, params, width);
  this.drawFormatText(FTKR.SUS.ucostSubTitle1Text, 0, y, false, width);
  if (udata.count < udata.limit) {
    var params = [
      udata.count,
      this.setSusUparam(type, sepSkill, udata.count, dataId),
      udata.count + 1,
      this.setSusUparam(type, sepSkill, udata.count + 1, dataId)
    ];
    this.drawFormatText(FTKR.SUS.ucostTextFromat, 0, y*2, params, width);
  } else {
    this.drawFormatText(FTKR.SUS.CannotUpgradeMessage, 0, y*2, width);
  }
};

Window_SusCost.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._typeId = 0;
  this._skillId = skillId;
  this.refresh();
};

Window_SusCost.prototype.setTypeId = function(skillId, typeId, dataId) {
  if (this._typeId === typeId && this._dataId === dataId) return;
  this._typeId = typeId;
  this._skillId = skillId;
  this._dataId = dataId;
  this.refresh();
};

//=============================================================================
// Window_SusConfTitle
//=============================================================================

function Window_SusConfTitle() {
  this.initialize.apply(this, arguments);
}

Window_SusConfTitle.prototype = Object.create(Window_Base.prototype);
Window_SusConfTitle.prototype.constructor = Window_SusConfTitle;

Window_SusConfTitle.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
  this.refresh();
};

Window_SusConfTitle.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_SusConfTitle.prototype.refresh = function () {
  this.contents.clear();
  this.drawStsText(FTKR.SUS.confTitleFormat);
};

Window_SusConfTitle.prototype.drawStsText = function(format) {
  if (this._actor && this._skillId) {
    var skill = this._actor.sepSkill(this._skillId);
    var width = this.width - this.standardPadding() * 2;
    this.drawDescTitle(format, 0, 0, width, skill);
  }
};

//=============================================================================
// Window_SusConf
//=============================================================================

function Window_SusConf() {
  this.initialize.apply(this, arguments);
}

Window_SusConf.prototype = Object.create(Window_SepConf.prototype);
Window_SusConf.prototype.constructor = Window_SusConf;

Window_SusConf.prototype.initialize = function(x, y, width, height) {
  Window_SepConf.prototype.initialize.call(this, x, y, width, height);
};

Window_SusConf.prototype.okFormat = function() {
  return FTKR.SUS.confOkFormat;
};

Window_SusConf.prototype.cancelFormat = function() {
  return FTKR.SUS.confCancelFormat;
};

Window_SusConf.prototype.defineSound = function() {
  this.setUpgradeSound();
};

//=============================================================================
// Window_SusActorStatus
//=============================================================================

function Window_SusActorStatus() {
  this.initialize.apply(this, arguments);
}

Window_SusActorStatus.prototype = Object.create(Window_Base.prototype);
Window_SusActorStatus.prototype.constructor = Window_SusActorStatus;

Window_SusActorStatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
};

Window_SusActorStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SusActorStatus.prototype.refresh = function() {
  this.contents.clear();
  var actor = this._actor;
  if (!actor) return;
  var w = this.width - this.padding * 2;
  var h = this.height - this.padding * 2;
  if (Imported.FTKR_CSS) {
    this.drawCssActorStatus(0, actor, 0, 0, w, h, FTKR.SSS.actorStatus);
  } else {
    this.drawText(actor._name, 0, 0, w, h);
  }
};

//=============================================================================
// Window_SepSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

FTKR.SUS.Window_SepSubCommand_makeItemList = Window_SepSubCommand.prototype.makeItemList;
Window_SepSubCommand.prototype.makeItemList = function() {
  FTKR.SUS.Window_SepSubCommand_makeItemList.call(this);
  if (!this._actor.isSusHide() && this.susShowCommand()) {
    var data = {
      symbol:'upgrade',
      enabled:true,
      disp:FTKR.SUS.commandName
    };
    this._data.splice(-1, 0, data);
  }
};

Window_SepSubCommand.prototype.susShowCommand = function() {
  if (FTKR.SUS.showCommand !== 3) return false;
  if (FTKR.SUS.menuSwitchId === 0) return true;
  return $gameSwitches.value(FTKR.SUS.menuSwitchId);
};

//=============================================================================
// Scene_Base
//=============================================================================

// ウィンドウ作成系
Scene_Base.prototype.susCreateSkillListWindow = function() {
  var refw = this._skillTypeWindow;

  var wy = refw.y + refw.height;
  var ww = FTKR.SUS.skillListWidth;
  var wh = Graphics.boxHeight - wy;

  this._susSkillListWindow = new Window_UpgradeSkillList(0, wy, ww, wh);
  var window = this._susSkillListWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('ok',     this.onSusSkillOk.bind(this));
  window.setHandler('cancel', this.onSusSkillCancel.bind(this));
  refw.setSusSkillWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.susCreateSkillStatusTitleWindow = function(wy, wh){
  var refw1 = this._susSkillListWindow;

  var wx = refw1.width;
  var ww = Graphics.boxWidth - wx;

  this._susStatusTitleWindow = new Window_SepStatus(wx, wy, ww, wh);
  var window = this._susStatusTitleWindow;
  this._skillTypeWindow.setSusUpgradeStatusWindow(window);
  refw1.setSusStatusWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.susCreateSkillStatusWindow = function() {
  var refw1 = this._susSkillListWindow;
  var refw2 = this._susStatusTitleWindow;

  var wx = refw1.width;
  var wy = refw2.y + refw2.height;
  var ww = Graphics.boxWidth - wx;
  var wh = Graphics.boxHeight - wy;
  if (FTKR.SUS.alwaysDispCost) wh -= this.susCostWindowHeight();

  this._susSkillStatusWindow = new Window_UpgradeTypeList(wx, wy, ww, wh);
  var window = this._susSkillStatusWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('ok',     this.onSusUpgradeOk.bind(this));
  window.setHandler('cancel', this.onSusUpgradeCancel.bind(this));
  this._skillTypeWindow.setSusUpgradeWindow(window);
  refw1.setItemWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.susCostWindowHeight = function() {
  var line = 7;
  if (FTKR.SUS.alwaysDispCost) line -= 3; 
  if (FTKR.SUS.ucostCostLines === 'series') line -=2;
  return this._helpWindow.lineHeight() * line + this._helpWindow.standardPadding() * 2;
};

Scene_Base.prototype.susCreateUpgradeCostWindow = function() {
  var flag = !FTKR.SUS.alwaysDispCost;
  var refw1 = this._susConfWindow;
  var refw2 = this._susSkillStatusWindow;

  var wx = flag ? refw1.x : this._susSkillListWindow.width;
  var wy = flag ? refw1.y + refw1.height : refw2.y + refw2.height;
  var ww = flag ? refw1.width : Graphics.boxWidth - wx;
  var wh = this.susCostWindowHeight();

  this._susCostWindow = new Window_SusCost(wx, wy, ww, wh);
  var window = this._susCostWindow;
  this._skillTypeWindow.setSusCostWindow(window);
  refw2.setCostWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.susCreateConfTitleWindow = function() {
  var wr = FTKR.SUS.ucostCostLines === 'series' ? 4 : 3;

  var wx = Graphics.boxWidth * (6 - wr) / 12;
  var ww = Graphics.boxWidth * wr / 6;
  var wh = this._helpWindow.lineHeight() + this._helpWindow.standardPadding() * 2;
  var defHeight = wh * 2;
  var confHeight = !FTKR.SUS.alwaysDispCost ? defHeight + this.susCostWindowHeight() : defHeight;
  var wy = (Graphics.boxHeight - confHeight) / 2;

  this._susConfTitleWindow = new Window_SusConfTitle(wx, wy, ww, wh);
  this._skillTypeWindow.setSusConfTitleWindow(this._susConfTitleWindow);
  this.addWindow(this._susConfTitleWindow);
};

Scene_Base.prototype.susCreateConfWindow = function() {
  var refw = this._susConfTitleWindow;

  var wx = refw.x;
  var wy = refw.y + refw.height;
  var ww = refw.width;
  var wh = this._helpWindow.lineHeight() * 1 + this._helpWindow.standardPadding() * 2;

  this._susConfWindow = new Window_SusConf(wx, wy, ww, wh);
  var window = this._susConfWindow;
  window.setHandler('ok', this.onSusConfirmationOk.bind(this));
  window.setHandler('cancel', this.onSusConfirmationCancel.bind(this));
  this._skillTypeWindow.setSusConfirmationWindow(window);
  this._susSkillStatusWindow.setConfWindow(window);
  this.addWindow(window);
};

Scene_Base.prototype.susRefreshActor = function(actor) {
  if (this._susSkillListWindow) this._susSkillListWindow.setActor(actor);
  if (this._susStatusTitleWindow) this._susStatusTitleWindow.setActor(actor);
  if (this._susSkillStatusWindow) this._susSkillStatusWindow.setActor(actor);
  var ctw = this._susConfTitleWindow;
  if (ctw) {
    ctw.setActor(actor);
    ctw.hide();
  }
  var cfw = this._susConfWindow;
  if (cfw) {
    cfw.setActor(actor);
    cfw.hide();
  }
  var csw = this._susCostWindow;
  if (csw) {
    csw.setActor(actor);
    if(!FTKR.SUS.alwaysDispCost) csw.hide();
  }
};

Scene_Base.prototype.onSusSkillOk = function() {
  var ssw = this._susSkillStatusWindow;
  if (ssw._skillId) {
    ssw.actSelect(0);
    this._susStatusTitleWindow._skillId = ssw._skillId;
    this._susStatusTitleWindow.refresh();
    var ctw = this._susConfTitleWindow;
    if (ctw) {
      ctw._skillId = ssw._skillId;
      ctw.refresh();
    }
    this._susCostWindow._draw = true;
    this._susCostWindow.refresh();
  }
};

Scene_Base.prototype.onSusSkillCancel = function() {
  this._skillTypeWindow.activate();
  this._susSkillListWindow.deselect();
  this._susStatusTitleWindow.clearWindow();
  this._susSkillStatusWindow.clearWindow();
  this._susCostWindow._draw = false;
  this._susCostWindow.clearWindow();
};

Scene_Base.prototype.onSusUpgradeOk = function() {
  var cfw = this._susConfWindow;
  if (cfw) {
    cfw.actSelect(0);
    this.susConfShow();
  } else {
    var ssw = this._susSkillStatusWindow;
    this.susUpgrade(ssw._skillId, ssw.item().typeId,
                    ssw.item().dataId, ssw._upgradeSound);
  }
};

Scene_Base.prototype.onSusUpgradeCancel = function() {
  FTKR.SSS.subComOk = false;
  if (FTKR.SUS.subUpgradeOk) {
    FTKR.SUS.subUpgradeOk = false;
    this._itemWindow.actSelect(this._itemWindow.index());
  } else {
    this._susSkillListWindow.activate();
  }
  this._susSkillStatusWindow.deselect();
  this._susCostWindow.clearWindow();
};

Scene_Base.prototype.onSusConfirmationOk = function() {
  var cfw = this._susConfWindow;
  if (cfw.item().dicision) {
    FTKR.SSS.confOk = false;
    cfw.deselect();
    this._susConfTitleWindow.refresh();
    var ssw = this._susSkillStatusWindow;
    this.susUpgrade(ssw._skillId, ssw._typeId, ssw._dataId,
                    cfw._upgradeSound);
    this.susConfHide();
  } else {
    this.onSusConfirmationCancel();
  }
};

Scene_Base.prototype.onSusConfirmationCancel = function() {
  this._susConfWindow.deselect();
  var ssw = this._susSkillStatusWindow;
  ssw.actSelect(ssw._susIndex);
  this._susCostWindow.clearWindow();
  this.susConfHide(this._susConfWindow._active);
};

Scene_Base.prototype.susUpgrade = function(skillId, typeId, dataId, sound) {
  var upgrade = this.actor().upgradeSepSkill(skillId, typeId, dataId);
  if (upgrade) AudioManager.playStaticSe(sound);
  this._susSkillListWindow.refresh();
  this._susSkillListWindow.updateHelp();
  this._susStatusTitleWindow.refresh();
  var ssw = this._susSkillStatusWindow
  ssw.actSelect(ssw.index());
  this._susCostWindow.refresh();
  if (this._statusWindow) this._statusWindow.refresh();
};

Scene_Base.prototype.susConfHide = function() {
  this._susConfWindow._active = false;
  this._susConfWindow.hide();
  this._susConfTitleWindow.hide();
  if(!FTKR.SUS.alwaysDispCost) this._susCostWindow.hide();
};

Scene_Base.prototype.susConfShow = function() {
  this._susConfWindow._active = true;
  this._susConfWindow.show();
  this._susConfTitleWindow.show();
  if(!FTKR.SUS.alwaysDispCost) this._susCostWindow.show();
};

//=============================================================================
// Scene_Menu
//=============================================================================

FTKR.SUS.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  FTKR.SUS.Scene_Menu_createCommandWindow.call(this);
  if (FTKR.SUS.showCommand === 1) {
    this._commandWindow.setHandler('upgrade skill', this.commandPersonal.bind(this));
  }
};

FTKR.SUS.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
  FTKR.SUS.Scene_Menu_onPersonalOk.call(this);
  switch (this._commandWindow.currentSymbol()) {
  case 'upgrade skill':
    SceneManager.push(Scene_SUS);
    break;
  }
};

//=============================================================================
// Scene_Skill
//=============================================================================

FTKR.SUS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
  FTKR.SUS.Scene_Skill_create.call(this);
  this.susCreateSkillListWindow();
  this.createSkillStatusTitleWindow();
  this.susCreateSkillStatusWindow();
  if (FTKR.SUS.enableConf) {
    this.susCreateConfTitleWindow();
    this.susCreateConfWindow();
  }
  this.susCreateUpgradeCostWindow();
  this.refreshActor();
};

FTKR.SUS.Scene_Skill_createSkillTypeWindow =
  Scene_Skill.prototype.createSkillTypeWindow;
Scene_Skill.prototype.createSkillTypeWindow = function() {
  FTKR.SUS.Scene_Skill_createSkillTypeWindow.call(this);
  this._skillTypeWindow.setHandler('susUpgrade', this.commandSusUpgrade.bind(this));
};

Scene_Skill.prototype.createSkillStatusTitleWindow = function() {
  var wy = this._statusWindow.y + this._statusWindow.height;
  var wh = this._helpWindow.lineHeight() * 2 + this._helpWindow.standardPadding() * 2;
  this.susCreateSkillStatusTitleWindow(wy, wh);
};

FTKR.SUS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
  FTKR.SUS.Scene_Skill_refreshActor.call(this);
  FTKR.SUS.subUpgradeOk = false;
  this.susRefreshActor(this.actor());
};

Scene_Skill.prototype.commandSusUpgrade = function() {
  this._susCostWindow._draw = false;
  this._susSkillListWindow.actSelect(0);
};

FTKR.SUS.Scene_Skill_onSubComOk = Scene_Skill.prototype.onSubComOk;
Scene_Skill.prototype.onSubComOk = function() {
    var scw = this._sepSubCommandWindow;
    if (scw.item().symbol === 'upgrade') {
        FTKR.SUS.subUpgradeOk = true;
        var ssw = this._susSkillStatusWindow;
        ssw._skillId = scw._skillId;
        this.onSusSkillOk();
    } else {
      FTKR.SUS.Scene_Skill_onSubComOk.call(this);
    }
};

//=============================================================================
// Scene_SUS
//=============================================================================

function Scene_SUS() {
  this.initialize.apply(this, arguments);
}

Scene_SUS.prototype = Object.create(Scene_Skill.prototype);
Scene_SUS.prototype.constructor = Scene_SUS;

Scene_SUS.prototype.initialize = function() {
  Scene_Skill.prototype.initialize.call(this);
};

Scene_SUS.prototype.start = function() {
  Scene_Skill.prototype.start.call(this);
};

Scene_SUS.prototype.create = function() {
  Scene_ItemBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createActorStatusWindow();
  this.createSkillTypeWindow();
  this.susCreateSkillListWindow();
  this.createSkillStatusTitleWindow();
  this.susCreateSkillStatusWindow();
  if (FTKR.SUS.enableConf) {
    this.susCreateConfTitleWindow();
    this.susCreateConfWindow();
  }
  this.susCreateUpgradeCostWindow();
  this.refreshActor();
};

Scene_SUS.prototype.createActorStatusWindow = function() {
  var ww = FTKR.SUS.skillListWidth;
  var wh = this._helpWindow.lineHeight() * 3 + this._helpWindow.standardPadding() * 2;
  this._susActorStatusWindow = new Window_SusActorStatus(0, 0, ww, wh);
  this.addWindow(this._susActorStatusWindow);
};

Scene_SUS.prototype.createSkillTypeWindow = function() {
  var wy = this._susActorStatusWindow.y + this._susActorStatusWindow.height;
  this._skillTypeWindow = new Window_SusSkillType(0, wy);
  var window = this._skillTypeWindow;
  window.setHelpWindow(this._helpWindow);
  window.setHandler('skill',    this.commandSkill.bind(this));
  window.setHandler('cancel',   this.popScene.bind(this));
  window.setHandler('pagedown', this.nextActor.bind(this));
  window.setHandler('pageup',   this.previousActor.bind(this));
  this.addWindow(window);
  window.actSelect(0);
};

Scene_SUS.prototype.createSkillStatusTitleWindow = function() {
  var wh = this._helpWindow.lineHeight() * (3 + Math.floor(FTKR.SUS.DiscriptionLines))
           + this._helpWindow.standardPadding() * 2;
  this.susCreateSkillStatusTitleWindow(0, wh);
};

Scene_SUS.prototype.refreshActor = function() {
  var actor = this.actor();
  this._skillTypeWindow.setActor(actor);
  this._susActorStatusWindow.setActor(actor);
  this.susRefreshActor(actor);
};

Scene_SUS.prototype.commandSkill = function() {
  this._susCostWindow._draw = false;
  this._susSkillListWindow.actSelect(0);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _SUSW_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  _SUSW_Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SUS') {
    switch (args[0]) {
      // システム画面を呼び出す
      case 'Open':
      case 'OPEN':
        SceneManager.push(Scene_SUS);
        break;
      case 'Show':
      case 'SHOW':
        if (args[1] === 'Actor') $dataActors[args[2]].susHide = false;
        break;
      case 'Hide':
      case 'HIDE':
        if (args[1] === 'Actor') $dataActors[args[2]].susHide = true;
        break;
    }
  }
};

};//FTKR_SkillUpgradeSystem END
