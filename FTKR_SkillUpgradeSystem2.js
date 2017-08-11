//=============================================================================
// スキル強化システムを実装するプラグイン
// FTKR_SkillUpgradeSystem2.js
// 作成者     : フトコロ
// 作成日     : 2017/08/05
// 最終更新日 : 
// バージョン : v2.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SUS = true;

var FTKR = FTKR || {};
FTKR.SUS = FTKR.SUS || {};

//=============================================================================
/*:
 * @plugindesc v2.0.0 スキル強化システムを実装するプラグイン(v2)
 * @author フトコロ
 * 
 * @param ---Skill Name Format---
 * @default
 *
 * @param Skill Name Format
 * @desc 強化したスキルの表示名を変更します。
 *  %1 - スキル名,  %2 - 強化レベルの合計
 * @default %1(+%2)
 *
 * @param ---Show Command---
 * @default
 * 
 * @param Show Skill Command
 * @desc メニュー欄のどこにスキル強化コマンドを追加するか。
 *  1 - メニュー欄, 2 - スキルメニュー欄, 3 - サブコマンド欄
 * @default 1
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
 * @param ---Default Param---
 * @default
 *
 * @param Upgrade Default Name
 * @desc 強化項目のデフォルト名を設定します。
 *  %1 - 強化タイプのスキルステータス名
 * @default %1強化
 *
 * @param Upgrade Default Limit
 * @desc 最大強化レベルのデフォルト値を設定します。
 * @default 99
 *
 * @param Upgrade Default Value
 * @desc 強化時の上昇量のデフォルト値を設定します。
 * @default 1
 *
 * @param Upgrade Default Cost Type
 * @desc 強化に必要なコストタイプのデフォルト値を設定します。
 *  1 - gold, 2 - item, 3 - 変数
 * @default 1
 *
 * @param Upgrade Default Cost Id
 * @desc コストタイプをアイテムか変数にした場合のIDを設定します。
 * @default 
 *
 * @param Upgrade Default Cost Value
 * @desc 強化に必要なコスト数量のデフォルト値を設定します。
 * @default 1
 *
 * @param Upgrade Default Icon
 * @desc 強化項目リストに表示するアイコンのデフォルト値を設定します。
 * @default 73
 *
 * @param Upgrade Default Format
 * @desc 強化時のデフォルトの計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default %1+(%2*%3)
 *
 * @param ---Upgrade Type 1---
 * @default
 *
 * @param Upgrade Type 1 Type
 * @desc タイプ1の強化項目のタイプを設定します。
 * @default damages
 *
 * @param Upgrade Type 1 Icon
 * @desc タイプ1の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Limit
 * @desc タイプ1の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Value
 * @desc タイプ1の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Value
 * @desc タイプ1の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Type
 * @desc タイプ1の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Cost Id
 * @desc タイプ1の強化項目のタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 1 Format
 * @desc タイプ1の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 2---
 * @default
 *
 * @param Upgrade Type 2 Type
 * @desc タイプ2の強化項目のタイプを設定します。
 * @default mpCost
 *
 * @param Upgrade Type 2 Icon
 * @desc タイプ2の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Limit
 * @desc タイプ2の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Value
 * @desc タイプ2の強化項目の上昇量を設定します。
 * @default -1
 *
 * @param Upgrade Type 2 Cost Value
 * @desc タイプ2の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 2 Cost Type
 * @desc タイプ2の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Cost Id
 * @desc タイプ2の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 2 Format
 * @desc タイプ2の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 3---
 * @default
 *
 * @param Upgrade Type 3 Type
 * @desc タイプ3の強化項目のタイプを設定します。
 * @default tpCost
 *
 * @param Upgrade Type 3 Icon
 * @desc タイプ3の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Limit
 * @desc タイプ3の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Value
 * @desc タイプ3の強化項目の上昇量を設定します。
 * @default -1
 *
 * @param Upgrade Type 3 Cost Value
 * @desc タイプ3の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 3 Cost Type
 * @desc タイプ3の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Cost Id
 * @desc タイプ3の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 3 Format
 * @desc タイプ3の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 4---
 * @default
 *
 * @param Upgrade Type 4 Type
 * @desc タイプ4の強化項目のタイプを設定します。
 * @default speed
 *
 * @param Upgrade Type 4 Icon
 * @desc タイプ4の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Limit
 * @desc タイプ4の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Value
 * @desc タイプ4の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Value
 * @desc タイプ4の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Type
 * @desc タイプ4の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Cost Id
 * @desc タイプ4の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 4 Format
 * @desc タイプ4の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 5---
 * @default
 *
 * @param Upgrade Type 5 Type
 * @desc タイプ5の強化項目のタイプを設定します。
 * @default tpGain
 *
 * @param Upgrade Type 5 Icon
 * @desc タイプ5の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Limit
 * @desc タイプ5の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Value
 * @desc タイプ5の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Value
 * @desc タイプ5の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Type
 * @desc タイプ5の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Cost Id
 * @desc タイプ5の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 5 Format
 * @desc タイプ5の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 6---
 * @default
 *
 * @param Upgrade Type 6 Type
 * @desc タイプ6の強化項目のタイプを設定します。
 * @default repeats
 *
 * @param Upgrade Type 6 Icon
 * @desc タイプ6の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Limit
 * @desc タイプ6の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Value
 * @desc タイプ6の強化項目の上昇量を設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Value
 * @desc タイプ6の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Type
 * @desc タイプ6の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Cost Id
 * @desc タイプ6の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 6 Format
 * @desc タイプ6の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
 *
 * @param ---Upgrade Type 7---
 * @default
 *
 * @param Upgrade Type 7 Type
 * @desc タイプ7の強化項目のタイプを設定します。
 * @default scope
 *
 * @param Upgrade Type 7 Icon
 * @desc タイプ7の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Limit
 * @desc タイプ7の強化項目の最大強化レベルを設定します。
 * @default 1
 *
 * @param Upgrade Type 7 Value
 * @desc タイプ7の強化項目の上昇量を設定します。
 * @default 1
 *
 * @param Upgrade Type 7 Cost Value
 * @desc タイプ7の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 7 Cost Type
 * @desc タイプ7の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Cost Id
 * @desc タイプ7の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 7 Format
 * @desc タイプ7の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default %1+%3
 *
 * @param ---Upgrade Type 8---
 * @default
 *
 * @param Upgrade Type 8 Type
 * @desc タイプ8の強化項目のタイプを設定します。
 * @default effects
 *
 * @param Upgrade Type 8 Icon
 * @desc タイプ8の強化項目のアイコンを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Limit
 * @desc タイプ8の強化項目の最大強化レベルを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Value
 * @desc タイプ8の強化項目の上昇量を設定します。
 * @default 1
 *
 * @param Upgrade Type 8 Cost Value
 * @desc タイプ8の強化項目のコスト数値を設定します。
 * @default 
 *
 * @param Upgrade Type 8 Cost Type
 * @desc タイプ8の強化項目のコストタイプを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Cost Id
 * @desc タイプ8の強化項目のコストIDを設定します。
 * @default 
 *
 * @param Upgrade Type 8 Format
 * @desc タイプ8の強化項目の強化時の計算式を設定します。
 *  %1 - 元のパラメータ, %2 - 強化時の上昇量, %3 - 強化レベル
 * @default 
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
 * @param --Cost Icon--
 * @default
 *
 * @param Cost Gold Icon
 * @desc コストをお金に設定した場合に表示するアイコンを指定します。
 * @default 314
 *
 * @param Cost Variables Icon
 * @desc コストを変数に設定した場合に表示するアイコンを指定します。
 * @default 307
 *
 * @param ---Parameter Name---
 * @default
 *
 * @param Main damage Name
 * @desc ダメージID 0 の表示名
 *  %1 - ダメージ倍率
 * @default 通常%1%
 *
 * @param No damage Type Name
 * @desc ダメージタイプの「なし」の表示名
 * @default ダメージなし
 *
 * @param HP damage Name
 * @desc ダメージタイプの「HPダメージ」の表示名
 * @default HPダメージ
 *
 * @param MP damage Name
 * @desc ダメージタイプの「MPダメージ」の表示名
 * @default MPダメージ
 *
 * @param HP recovery Name
 * @desc ダメージタイプの「HP回復」の表示名
 * @default HP回復
 *
 * @param MP recovery Name
 * @desc ダメージタイプの「MP回復」の表示名
 * @default MP回復
 *
 * @param HP absorption Name
 * @desc ダメージタイプの「HP吸収」の表示名
 * @default HP吸収
 *
 * @param MP absorption Name
 * @desc ダメージタイプの「MP吸収」の表示名
 * @default MP吸収
 *
 * @param MP cost Name
 * @desc スキルパラメータの「MP消費」の表示名
 * @default MP消費
 *
 * @param TP cost Name
 * @desc スキルパラメータの「TP消費」の表示名
 * @default TP消費
 *
 * @param Scope Name
 * @desc スキルパラメータの「範囲」の表示名
 * @default 範囲
 *
 * @param Speed Name
 * @desc スキルパラメータの「速度補正」の表示名
 * @default 速度補正
 *
 * @param TP gain Name
 * @desc スキルパラメータの「得TP」の表示名
 * @default 得TP
 *
 * @param Repeats Name
 * @desc スキルパラメータの「連続回数」の表示名
 * @default 連続回数
 *
 * @param Effects Name
 * @desc スキルパラメータの「使用効果」の表示名
 * @default 使用効果
 *
 * @param Scope One Enemy Name
 * @desc 範囲の「敵単体」の表示名
 * @default 敵単体
 *
 * @param Scope All Enemies Name
 * @desc 範囲の「敵全体」の表示名
 * @default 敵全体
 *
 * @param Scope Random Enemies Name
 * @desc 範囲の「敵x体ランダム」の表示名
 *  %1 - 敵X体の X 
 * @default 敵%1体ランダム
 * 
 * @param Scope One Friend Name
 * @desc 範囲の「味方単体」の表示名
 * @default 味方単体
 *
 * @param Scope All Friends Name
 * @desc 範囲の「味方全体」の表示名
 * @default 味方全体
 *
 * @param Scope One Dead Name
 * @desc 範囲の「味方単体(戦闘不能)」の表示名
 * @default 味方単体(戦闘不能)
 *
 * @param Scope All Deads Name
 * @desc 範囲の「味方全体(戦闘不能)」の表示名
 * @default 味方全体(戦闘不能)
 *
 * @param Scope User Name
 * @desc 範囲の「使用者」の表示名
 * @default 使用者
 *
 * @param Scope Non Name
 * @desc 範囲の「なし」の表示名
 * @default なし
 *
 * @param Effects Non Name
 * @desc 使用効果の「なし」の表示名
 * @default なし
 *
 * @param Effects Add Name
 * @desc 使用効果の、ステートまたは強化/弱体を付加する場合の表示名
 *  実際の表示内容は、ステート名 + この文字列 + 数値
 * @default 付加
 *
 * @param Effects Remove Name
 * @desc 使用効果の、ステートまたは強化/弱体を解除する場合の表示名
 *  実際の表示内容は、ステート名 + この文字列 + 数値
 * @default 解除
 *
 * @param Effects Buff Name
 * @desc 使用効果の「強化」の表示名
 *  実際の表示内容は、ステータス名 + この文字列 + ターン数
 * @default 強化
 *
 * @param Effects Debuff Name
 * @desc 使用効果の「弱体」の表示名
 *  実際の表示内容は、ステータス名 + この文字列 + ターン数
 * @default 弱体
 *
 * @param Elements Name
 * @desc スキルパラメータの「属性」の表示名
 * @default 属性
 *
 * @param Normal Attack Elm Name
 * @desc 属性の「通常攻撃」の表示名
 * @default 通常攻撃
 *
 * @param Non Element Name
 * @desc 属性の「なし」の表示名
 * @default なし
 * 
 * @param --- Default Param ---
 * @desc 
 * 
 * @param Damage Rate
 * @desc デフォルトのダメージ倍率(%)
 * @default 100
 *
 * @param Critical Rate
 * @desc デフォルトのクリティカルダメージ倍率(%)
 * @default 300
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、習得したスキルの性能を強化する
 * スキル強化システムを利用することができます。
 *
 * スキル強化コマンドを実行することで、スキルのダメージ量や、MP消費量といった
 * スキルの性能を、ゲームの中で変化(強化)させることができます。
 * 
 * スキルの強化は、習得しているスキルの性能自体を変化させます。また、スキルの
 * 強化状態はアクター毎に記録しており、強化できる項目もアクター毎に別のものに
 * することができます。
 * 
 * このため、魔法が得意なキャラのみが強化できる魔法や、ダメージは強化できるが
 * MP消費は強化できないアクター、MP消費は強化できるがダメージは強化できない
 * アクターなど、表現することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 * 2. 本プラグインは以下のプラグインと組み合わせて使用できません。
 *    FTKR_SkillExpansion.js
 *    FTKR_SEP_ShowSkillStatus.js
 *    FTKR_SkillUpgradeSystem_Core.js
 *    FTKR_SkillUpgradeSystem_Window.js
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
 * v2.0.0 - 2017/08/05 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SUS.parameters = PluginManager.parameters('FTKR_SkillUpgradeSystem2');

//スキル名
FTKR.SUS.susSkillNameFormat = String(FTKR.SUS.parameters['Skill Name Format'] || '%1(+%2)');
FTKR.SUS.susUpgradeDefName = String(FTKR.SUS.parameters['Upgrade Default Name'] || '強化');
FTKR.SUS.defDamageRate = Number(FTKR.SUS.parameters['Damage Rate'] || 0);
FTKR.SUS.defCriticalRate = Number(FTKR.SUS.parameters['Critical Rate'] || 0);

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

//スキルリストウィンドウ設定
FTKR.SUS.skillListWidth = Number(FTKR.SUS.parameters['Skill List Width'] || 240);
FTKR.SUS.skillListMaxCols = Number(FTKR.SUS.parameters['Skill List Max Cols'] || 1);
FTKR.SUS.skillListSpacing = Number(FTKR.SUS.parameters['Skill List Spacing'] || 48);

//スキルステータスウィンドウ設定
FTKR.SUS.ustatusTitleFormat = String(FTKR.SUS.parameters['Skill Status Title Format'] || '');
FTKR.SUS.DiscriptionLines = Number(FTKR.SUS.parameters['Discription Lines'] || 2);

//強化タイプウィンドウ設定
FTKR.SUS.utype = {
    Text1Format:String(FTKR.SUS.parameters['Skill Status Text1 Format'] || ''),
    Text2Format:String(FTKR.SUS.parameters['Skill Status Text2 Format'] || ''),
    Text3Format:String(FTKR.SUS.parameters['Skill Status Text3 Format'] || ''),
    WidthRate:String(FTKR.SUS.parameters['Skill Status Width Rate'] || '1,1,1'),
    LineColor1:Number(FTKR.SUS.parameters['Skill Status Line Color1'] || -1),
    LineColor2:Number(FTKR.SUS.parameters['Skill Status Line Color2'] || -1),
    LineGauge:Number(FTKR.SUS.parameters['Skill Status Line Gauge'] || 0),
    MaxCols:Number(FTKR.SUS.parameters['Skill Status Max Cols'] || 1),
    ItemHeigth:Number(FTKR.SUS.parameters['Skill Status Item Heigth'] || 1),
};

//コストウィンドウ設定
FTKR.SUS.ucost = {
    TitleFormat:String(FTKR.SUS.parameters['Upgrade Param Title Format'] || ''),
    SubTitle1Text:String(FTKR.SUS.parameters['Upgrade Param SubTitle Format'] || ''),
    TextFromat:String(FTKR.SUS.parameters['Upgrade Param Text Format'] || ''),
    SubTitle2Text:String(FTKR.SUS.parameters['Upgrade Param CostTitle Format'] || ''),
    ItemFormat:String(FTKR.SUS.parameters['Upgrade Param CostItem Format'] || ''),
    CostLines:String(FTKR.SUS.parameters['Upgrade Param Cost Lines'] || 'parallel'),
};
FTKR.SUS.CannotUpgradeMessage = String(FTKR.SUS.parameters['Upgrade Param MaxLv Message'] || '');

//確認ウィンドウ設定
FTKR.SUS.confTitleFormat = String(FTKR.SUS.parameters['Confirmation Title Format'] || '');
FTKR.SUS.confOkFormat = String(FTKR.SUS.parameters['Confirmation Ok Format'] || '');
FTKR.SUS.confCancelFormat  = String(FTKR.SUS.parameters['Confirmation Cancel Format'] || '');

//SE
FTKR.SUS.susSeName = String(FTKR.SUS.parameters['Upgrade SE Name'] || 'Sound2');
FTKR.SUS.susSeVolume = Number(FTKR.SUS.parameters['Upgrade SE Volume'] || 0);
FTKR.SUS.susSePitch = Number(FTKR.SUS.parameters['Upgrade SE Pitch'] || 0);
FTKR.SUS.susSePan = Number(FTKR.SUS.parameters['Upgrade SE Pan'] || 0);

//コストアイコン
FTKR.SUS.costGoldIcon = Number(FTKR.SUS.parameters['Cost Gold Icon'] || 0);
FTKR.SUS.costVarIcon = Number(FTKR.SUS.parameters['Cost Variables Icon'] || 0);

//強化項目のデフォルト設定用
FTKR.SUS.uTypes = [
    {
      type:'default',
      limit:Number(FTKR.SUS.parameters['Upgrade Default Limit'] || 99),
      value:Number(FTKR.SUS.parameters['Upgrade Default Value'] || 1),
      ctype:Number(FTKR.SUS.parameters['Upgrade Default Cost Type'] || 1),
      cost:String(FTKR.SUS.parameters['Upgrade Default Cost Value'] || 1),
      cid:Number(FTKR.SUS.parameters['Upgrade Default Cost Id'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Default Icon'] || 73),
      format:String(FTKR.SUS.parameters['Upgrade Default Calc Format'] || '%1+(%2*%3)')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 1 Type'] || 'damages'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 1 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 1 Value'] || 0),
      cost:String(FTKR.SUS.parameters['Upgrade Type 1 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 1 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 1 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 1 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 1 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 2 Type'] || 'mpCost'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 2 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 2 Value'] || -1),
      cost:String(FTKR.SUS.parameters['Upgrade Type 2 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 2 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 2 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 2 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 2 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 3 Type'] || 'tpCost'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 3 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 3 Value'] || -1),
      cost:String(FTKR.SUS.parameters['Upgrade Type 3 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 3 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 3 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 3 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 3 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 4 Type'] || 'spead'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 4 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 4 Value'] || 0),
      cost:String(FTKR.SUS.parameters['Upgrade Type 4 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 4 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 4 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 4 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 4 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 5 Type'] || 'tpGain'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 5 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 5 Value'] || 0),
      cost:String(FTKR.SUS.parameters['Upgrade Type 5 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 5 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 5 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 5 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 5 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 6 Type'] || 'repeats'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 6 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 6 Value'] || 0),
      cost:String(FTKR.SUS.parameters['Upgrade Type 6 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 6 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 6 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 6 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 6 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 7 Type'] || 'scope'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 7 Limit'] || 1),
      value:Number(FTKR.SUS.parameters['Upgrade Type 7 Value'] || 1),
      cost:String(FTKR.SUS.parameters['Upgrade Type 7 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 7 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 7 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 7 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 7 Format'] || '')
    },
    {
      type:String(FTKR.SUS.parameters['Upgrade Type 8 Type'] || 'effects'),
      limit:Number(FTKR.SUS.parameters['Upgrade Type 8 Limit'] || 0),
      value:Number(FTKR.SUS.parameters['Upgrade Type 8 Value'] || 0),
      cost:String(FTKR.SUS.parameters['Upgrade Type 8 Cost Value'] || 0),
      icon:Number(FTKR.SUS.parameters['Upgrade Type 8 Icon'] || 0),
      ctype:Number(FTKR.SUS.parameters['Upgrade Type 8 Cost type'] || 0),
      cid:Number(FTKR.SUS.parameters['Upgrade Type 8 Cost Id'] || 0),
      format:String(FTKR.SUS.parameters['Upgrade Type 8 Format'] || '')
    },
];

//スキルのパラメータ名
FTKR.SUS.mainDamageName = String(FTKR.SUS.parameters['Main damage Name'] || '');
FTKR.SUS.damageNames = [
  String(FTKR.SUS.parameters['No damage Type Name'] || ''),
  String(FTKR.SUS.parameters['HP damage Name'] || ''),
  String(FTKR.SUS.parameters['MP damage Name'] || ''),
  String(FTKR.SUS.parameters['HP recovery Name'] || ''),
  String(FTKR.SUS.parameters['MP recovery Name'] || ''),
  String(FTKR.SUS.parameters['HP absorption Name'] || ''),
  String(FTKR.SUS.parameters['MP absorption Name'] || '')
];
FTKR.SUS.sepStatusNames = {
  mpCost:String(FTKR.SUS.parameters['MP cost Name'] || ''),
  tpCost:String(FTKR.SUS.parameters['TP cost Name'] || ''),
  speed:String(FTKR.SUS.parameters['Speed Name'] || ''),
  tpGain:String(FTKR.SUS.parameters['TP gain Name'] || ''),
  repeats:String(FTKR.SUS.parameters['Repeats Name'] || ''),
  scope:String(FTKR.SUS.parameters['Scope Name'] || ''),
};
FTKR.SUS.scopeNames = [
  String(FTKR.SUS.parameters['Scope Non Name'] || ''),
  String(FTKR.SUS.parameters['Scope One Enemy Name'] || ''),
  String(FTKR.SUS.parameters['Scope All Enemies Name'] || ''),
  String(FTKR.SUS.parameters['Scope Random Enemies Name'] || ''),
  '','','',
  String(FTKR.SUS.parameters['Scope One Friend Name'] || ''),
  String(FTKR.SUS.parameters['Scope All Friends Name'] || ''),
  String(FTKR.SUS.parameters['Scope One Dead Name'] || ''),
  String(FTKR.SUS.parameters['Scope All Deads Name'] || ''),
  String(FTKR.SUS.parameters['Scope User Name'] || '')
];
FTKR.SUS.Effects = {
  Name:String(FTKR.SUS.parameters['Effects Name'] || ''),
  NonName:String(FTKR.SUS.parameters['Effects Non Name'] || ''),
  AddName:String(FTKR.SUS.parameters['Effects Add Name'] || ''),
  RemoveName:String(FTKR.SUS.parameters['Effects Remove Name'] || ''),
  BuffName:String(FTKR.SUS.parameters['Effects Buff Name'] || ''),
  DebuffName:String(FTKR.SUS.parameters['Effects Debuff Name'] || ''),
};
FTKR.SUS.Elements = {
  NormalAttackName:String(FTKR.SUS.parameters['Normal Attack Elm Name'] || ''),
  NonName:String(FTKR.SUS.parameters['Non Element Name'] || ''),
  Name:String(FTKR.SUS.parameters['Elements Name'] || ''),
};

//アクターステータスウィンドウ設定
FTKR.SUS.actorStatus = {
  text1:String(FTKR.SUS.parameters['Actor Status Text1'] || ''),
  text2:String(FTKR.SUS.parameters['Actor Status Text2'] || ''),
  text3:String(FTKR.SUS.parameters['Actor Status Text3'] || ''),
  space:String(FTKR.SUS.parameters['Actor Status Space'] || ''),
  spaceIn:Number(FTKR.SUS.parameters['Actor Status Space In Text'] || 0),
  widthRate:String(FTKR.SUS.parameters['Actor Status Width Rate'] || ''),
  faceLine:Number(FTKR.SUS.parameters['Display Face Scale'] || 0),
};

//フレームオブジェクト
FTKR.SUS.frame = {
    //基本設定
    type:Number(FTKR.SUS.parameters['Display Frame Type'] || 0),
    whenToDisplay:Number(FTKR.SUS.parameters['When To Display Frame'] || 0),
    changeOnCursor:Number(FTKR.SUS.parameters['Change Frame On Cursor'] || 0),
    hideCursor:Number(FTKR.SUS.parameters['Hide Cursor'] || 0),
    //枠線の設定
    line:{
        defColor:Number(FTKR.SUS.parameters['Default Line Color'] || 0),
        csrColor:Number(FTKR.SUS.parameters['Line Color On Cursor'] || 0),
        thick:Number(FTKR.SUS.parameters['Line Thick'] || 0),
        subColor:Number(FTKR.SUS.parameters['Sub Line Color'] || 0),
        subThick:Number(FTKR.SUS.parameters['Sub Line Thick'] || 0),
        defInColor:Number(FTKR.SUS.parameters['Default Rect Color'] || 0),
        csrInColor:Number(FTKR.SUS.parameters['Rect Color On Cursor'] || 0),
    },
    //枠画像の設定
    image:{
        name:String(FTKR.SUS.parameters['Image Name'] || ''),
        width:Number(FTKR.SUS.parameters['Image Width'] || 0),
        height:Number(FTKR.SUS.parameters['Image Height'] || 0),
        offsetX:Number(FTKR.SUS.parameters['Image Offset X'] || 0),
        offsetY:Number(FTKR.SUS.parameters['Image Offset Y'] || 0),
        offsetW:Number(FTKR.SUS.parameters['Image Offset Width'] || 0),
        offsetH:Number(FTKR.SUS.parameters['Image Offset Height'] || 0),
        enabledScale:Number(FTKR.SUS.parameters['Enabled Change Scale'] || 0),
        defIndex:Number(FTKR.SUS.parameters['Default Image Index'] || 0),
        csrIndex:Number(FTKR.SUS.parameters['Image Index On Cursor'] || 0),
    },
};

//=============================================================================
// プラグイン 定数
//=============================================================================

FTKR.SUS.maxUtypeNum = 8;

if (!FTKR.SUS.enableConf) FTKR.SUS.alwaysDispCost = 1;
FTKR.SUS.subUpgradeOk = false;

//=============================================================================
// Math
//=============================================================================

Math._getDec = function(value) {
  var list = (value + '').split('.');
  return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された割合をパーセント表示の整数に変換する (例:0.5 を 50 に変換)
Math.percent = function(dec) {
  var decnum = Math._getDec(dec);
  var int = +(dec + '').replace('.', '');
  var diffdec = 2 - decnum;
  return diffdec ? int * Math.pow(10, diffdec) : int;
}

// 配列の要素の合計
Math.sam = function(arr) {
    return arr.reduce( function(prev, current, i, arr) {
        return prev + current;
    });
};

//=============================================================================
// Array
//=============================================================================

//配列の要素を、すべて数値に変換する。
Array.prototype.num = function() {
  return this.map(function(elm) {
      return Number(elm);
  });
}

//=============================================================================
// String
//=============================================================================

//1バイト文字は 1 , 2バイト文字は 2 と数えて文字列数を求める
String.prototype.charCount = function() {
  var len = 0;
  var str = escape(this);
  for (var i=0; i < str.length ; i++ , len++) {
    if (str.charAt(i) == '%') {
      if (str.charAt(++i) == 'u') {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
};

//文字列からstrを削除する
String.prototype.del = function(str) {
    return this.replace(str, '');
};

//=============================================================================
// TextManager
//=============================================================================

TextManager.skillParam = function(type, skill, dataId) {
  switch (type) {
    case 'damages':
      return TextManager.damage(skill.damages[dataId].type);
    case 'mpCost':
    case 'tpCost':
    case 'speed':
    case 'tpGain':
    case 'repeats':
    case 'scope':
      return FTKR.SUS.sepStatusNames[type];
    case 'effects':
      return FTKR.SUS.Effects.Name + (dataId + 1);
    default:
      return undefined;
  }
};

TextManager.damage = function(dtype) {
  return dtype >= 0 && dtype < 7 ? FTKR.SUS.damageNames[dtype] : undefined;
};

TextManager.damageId = function(skill, dataId) {
  return dataId === 0 ? FTKR.SUS.mainDamageName : $dataSkills[skill.damages[dataId].id].name;
};

TextManager.scope = function(scope) {
  if (scope > 2 && scope < 7) return FTKR.SUS.scopeNames[3];
  return scope >= 0 && scope < 12 ? FTKR.SUS.scopeNames[scope] : undefined;
};

TextManager.effect = function(typename, effect) {
  if (typename !== 'effects') return '';
  if (effect.display) return effect.display;
  var eff = FTKR.SUS.Effects;
  switch (effect.code) {
    case Game_Action.EFFECT_ADD_STATE:
      return effect.dataId === 0 ? '通常攻撃' + eff.AddName + '%1':
        $dataStates[effect.dataId].name + eff.AddName + '%1';
    case Game_Action.EFFECT_REMOVE_STATE:
      return $dataStates[effect.dataId].name + eff.RemoveName + '%1';
    case Game_Action.EFFECT_ADD_BUFF:
      return TextManager.param(effect.dataId) + eff.BuffName + eff.AddName + '%1';
    case Game_Action.EFFECT_ADD_DEBUFF:
      return TextManager.param(effect.dataId) + eff.DebuffName + eff.AddName + '%1';
    case Game_Action.EFFECT_REMOVE_BUFF:
      return TextManager.param(effect.dataId) + eff.BuffName + eff.RemoveName + '%1';
    case Game_Action.EFFECT_REMOVE_DEBUFF:
      return TextManager.param(effect.dataId) + eff.DebuffName + eff.RemoveName + '%1';
    case Game_Action.EFFECT_RECOVER_HP:
      return TextManager.basic(2) + '回復' + '%1';
    case Game_Action.EFFECT_RECOVER_MP:
      return TextManager.basic(4) + '回復' + '%1';
    case Game_Action.EFFECT_GAIN_TP:
      return TextManager.basic(6) + '増加' + '%1';
    default:
      return '';
  }
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.SUS.DatabaseLoaded = false;
FTKR.SUS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!FTKR.SUS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.SUS.DatabaseLoaded) {
        this.susActorNotetags($dataActors);
        this.susActorNotetags($dataClasses);
        this.sepSkillNotetags($dataSkills);
        this.susSkillNotetags($dataSkills);
        this.susHideNotetags($dataActors);
        this.susHideNotetags($dataClasses);
        FTKR.SUS.DatabaseLoaded = true;
    }
    return true;
};

DataManager.sepSkillNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var scope = obj.scope;
        obj.scoperandom = scope > 2 && scope < 7 ? scope - 2 : 0;
        this.makeSepBase(obj);
    }
};

DataManager.makeSepBase = function(skill) {
    this.makeSepDamagesBase(skill);
    this.makeSepEffectsBase(skill);
    skill.sepRepeats = {
      count:skill.repeats,
      successRate:'',
      damageRate:0
    };
    skill.required = {
        wtypeIds:[],
        logic:'or',
        etypeIds:[],
        condition:'',
        forget:'',
    };
    if (skill.requiredWtypeId1) skill.required.wtypeIds.push(skill.requiredWtypeId1);
    if (skill.requiredWtypeId2) skill.required.wtypeIds.push(skill.requiredWtypeId2);
    skill.sepCost = {};
    skill.descs = [];
    var desc = {};
    desc.enabled = true;
    desc.description = skill.description;
    skill.descs[0] = desc;
};

DataManager.makeSepDamagesBase = function(skill) {
    skill.damages = [];
    skill.damages[0] = this.setSepDamage(skill.id);
};

DataManager.setSepDamage = function(skillId) {
    var damage = {};
    var setSkill = $dataSkills[skillId]
    var setDamage = setSkill.damage;
    for (var list in setDamage) {
        damage[list] = setDamage[list];
    }
    damage.rate = FTKR.SUS.defDamageRate;
    damage.criticalRate = FTKR.SUS.defCriticalRate;
    damage.hitType = setSkill.hitType;
    damage.itemElements = [];
    damage.id = setSkill.id;
    damage.addElmIds = [];
    damage.enabled = '';
    return damage;
};

DataManager.makeSepEffectsBase = function(skill) {
    skill.effects.forEach( function(effect) {
        effect.target = '';
        effect.sepValue1 = '';
        effect.sepValue2 = '';
        effect.rate = 0;
        effect.enabled = '';
        effect.display = '';
    });
};

DataManager.susActorNotetags = function(group) {
  var note1 = /<(?:NOT UPGRADE)>/i;
  var note2 = /<(?:NOT UPGRADE SKILLTYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:NOT UPGRADE SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(?:SUS UPGRADE SKILL)[ ](\d+)[ ](?:TYPE)[ ](\d+)[ ](?:LIMIT):[ ]*(\d+)>/i;
  var note5 = /<(?:SUS UPGRADE SKILL)[ ](\d+)[ ](?:TYPE)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.susNotUpgrade = false;
    obj.susNotUpgradeSkillType = [];
    obj.susNotUpgradeSkill = [];
    obj.susUpgradeLimit  = [];
    obj.susUpgradeValue = [];

    for (var t = 0; t < $dataSystem.skillTypes.length; t++) {
      obj.susNotUpgradeSkillType[t] = false; 
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.susNotUpgrade = true;
      } else if (line.match(note2)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(stype) {
        obj.susNotUpgradeSkillType[stype] = true;
        });
      } else if (line.match(note3)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(skill) {
        obj.susNotUpgradeSkill.push(skill);
        });
      } else if (line.match(note4)) {
        var skill = Number(RegExp.$1);
        var type  = Number(RegExp.$2);
        var limit = Number(RegExp.$3);
        obj.susUpgradeLimit.push({'skillId':skill, 'typeId':type, 'value':limit});
      } else if (line.match(note5)) {
        var skill = Number(RegExp.$1);
        var type  = Number(RegExp.$2);
        var value = Number(RegExp.$3);
        obj.susUpgradeValue.push({'skillId':skill, 'typeId':type, 'value':value});
      }
    }
  }
};

DataManager.susSkillNotetags = function(group) {
  var note1 = /<(?:NOT UPGRADE SKILL)>/i;
  var note2 = /<(?:NOT UPGRADE TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:LIMIT):[ ]*(\d+)>/i;
  var note4 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:VALUE):[ ]*(\d+)>/i;
  var note5 = /<(?:SUS UPGRADE TYPE)[ ](\d+)[ ](?:FORMAT):[ ]*(.+)>/i;
  var note7a = /<(?:SUS UPGRADE COST)>/i;
  var note7b = /<\/(?:SUS UPGRADE COST)>/i;
  var note10 = /<(?:SUS SHOW SWITCH)[ ](\d+)[ ](?:TYPE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 = /<(?:SET SUS EFFECT)[ ](\d+)[ ](?:RATE):[ ]*(\d+)>/i;
  var note8 = /<(?:SET SUS EFFECT)[ ](\d+)[ ](?:DISPLAY):[ ]*(.+)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var CustomMode = 'none';
    obj.susNotUpgrade = [];
    obj.susUpgradeLimit  = [];
    obj.susUpgradeValue = [];
    obj.susUpgradeFormat = [];
    obj.susUpgradeCost = '';
    obj.susShowSwitch = [];

    for (var t = 0; t < FTKR.SUS.maxUtypeNum + 1; t++) {
      obj.susNotUpgrade[t] = false; 
      obj.susShowSwitch[t] = 0;
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.susNotUpgrade[0] = true;
      } else if (line.match(note2)) {
        var types = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        types.forEach( function(type) {
          obj.susNotUpgrade[type] = true;
        });
      } else if (line.match(note3)) {
        var type  = Number(RegExp.$1);
        var limit = Number(RegExp.$2);
        obj.susUpgradeLimit[type] = limit;
      } else if (line.match(note4)) {
        var type  = Number(RegExp.$1);
        var value = Number(RegExp.$2);
        obj.susUpgradeValue[type] = value;
      } else if (line.match(note5)) {
        var type  = Number(RegExp.$1);
        var fmt = String(RegExp.$2);
        obj.susUpgradeFormat[type] = fmt;
      } else if (line.match(note6)) {
        var dataId  = Number(RegExp.$1);
        var rate = Number(RegExp.$2);
        obj.effects[dataId].rate = rate;
      } else if (line.match(note8)) {
        var dataId  = Number(RegExp.$1);
        var display = String(RegExp.$2);
        obj.effects[dataId].display = display;
      } else if (line.match(note7a)) {
        var type  = Number(RegExp.$1);
        CustomMode = 'cost';
      } else if (line.match(note7b)) {
        CustomMode = 'none';
      } else if (CustomMode === 'cost') {
        obj.susUpgradeCost = obj.susUpgradeCost + line + ';';
      } else if (line.match(note10)) {
        var swId = Number(RegExp.$1);
        var types = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        types.forEach( function(type) {
          obj.susShowSwitch[type] = swId;
        });
      }
    }
  }
};

DataManager.susHideNotetags = function(group) {
  var note = /<(?:SUS COMMAND HIDE)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.susHide = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note)) obj.susHide = true;
    }
  }
};

FTKR.SUS.DataManager_isSkill = DataManager.isSkill;
DataManager.isSkill = function(item) {
    return DataManager.isSepSkill(item) ? true :
        FTKR.SUS.DataManager_isSkill.call(this, item);
};

DataManager.isSepSkill = function(skill) {
    return skill && skill.hasOwnProperty('actorId');
};

//=============================================================================
// Game_Actor
//=============================================================================

FTKR.SUS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  FTKR.SUS.Game_Actor_initMembers.call(this);
  this._sepIds = [];
  this._sepDataSkills = [];
  this._udatas = [];
};

FTKR.SUS.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    FTKR.SUS.Game_Actor_learnSkill.call(this, skillId);
    if (!this.isMakedSepSkill(skillId)) {
        this.makeSepSkill(skillId);
    }
};

Game_Actor.prototype.isMakedSepSkill = function(skillId) {
    return this._sepIds.contains(skillId);
};

FTKR.SUS.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    var list = FTKR.SUS.Game_Actor_skills.call(this);
    var newlist = [];
    list.forEach( function(skill) {
        if (this.isMakedSepSkill(skill.id)) {
            newlist.push(this.sepSkill(skill.id));
        } else {
            newlist.push(skill);
        }
    },this);
    return newlist;
};

Game_Actor.prototype.getSkill = function(skillId) {
    return this.isMakedSepSkill(skillId) ? this.sepSkill(skillId) : $dataSkills[skillId];
}

Game_Actor.prototype.evalEnabledFormula = function(formula, skill) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

Game_Actor.prototype.isRandomScope = function(skill) {
  return skill.scope > 2 && skill.scope < 7;
}

//skillIdからsepskillを返す
Game_Actor.prototype.sepSkill = function(skillId) {
    return this._sepDataSkills.filter( function(skill) {
        return skill.id === skillId;
    })[0];
};

Game_Actor.prototype.isSepDataId = function(sepSkill) {
    var len = this._sepDataSkills.length;
    for (var i = 0; i < len; i++) {
        if (sepSkill === this._sepDataSkills[i]) return i; 
    }
};

//sepSkillを作成する
Game_Actor.prototype.makeSepSkill = function(skillId) {
    this._sepIds.push(skillId);
    this._sepDataSkills.push(this.setSepSkill(skillId));
};

//sepSkillを削除する
Game_Actor.prototype.eraseSepSkill = function(skillId) {
    var sepSkill = this.sepSkill(skillId);
    if (sepSkill) {
        var index = this.isSepDataId(sepSkill);
        this._sepIds.splice(index, 1);
        this._sepDataSkills.splice(index, 1);
    }
};

Game_Actor.prototype.setSepSkill = function(skillId) {
    var skill = $dataSkills[skillId];
    var sepSkill = {};
    for (var prop in skill) {
        if (prop == 'damage') {
            sepSkill[prop] = {};
            var obj = skill[prop];
            for (var list in obj) {
                sepSkill[prop][list] = obj[list];
            }
        } else if (prop === 'damages') {
            sepSkill[prop] = [];
            skill[prop].forEach( function(obj) {
                var sepObj = {};
                for (var list in obj) {
                    sepObj[list] = obj[list];
                }
                sepSkill[prop].push(sepObj);
            });
        } else if (prop === 'effects') {
            sepSkill[prop] = [];
            skill[prop].forEach( function(obj) {
                var sepObj = {};
                for (var list in obj) {
                    sepObj[list] = obj[list];
                }
                sepSkill[prop].push(sepObj);
            });
        } else if (prop === 'sepRepeats') {
            sepSkill[prop] = {};
            var obj = skill[prop];
            for (var list in obj) {
                sepSkill[prop][list] = obj[list];
            }
        } else if (prop === 'sep') {
            continue;
        } else {
            sepSkill[prop] = skill[prop];
        }
    }
    sepSkill.actorId = this.actorId();
    return sepSkill;
};

Game_Actor.prototype.isSepEnabled = function(skillId, typeId, dataId) {
  var skill = this.getSkill(skillId);
  var prop = skill[FTKR.SUS.uTypes[typeId].type];
  if (!prop.length) return true;
  return this.evalEnabledFormula(prop[dataId].enabled, skill);
};

Game_Actor.prototype.evalCostValue = function(cost) {
    if (!cost || !cost.value) return 0;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var cnt = this.sepSkillsCount(cost);
        var value = Math.max(eval(cost.value), 0);
        if (isNaN(value)) value = 0;
        return value;
    } catch (e) {
        return 0;
    }
};

Game_Actor.prototype.sepSkillsCount = function(cost) {
    return [];
};

Game_Actor.prototype.paySepCost = function(cost) {
    var value = this.evalCostValue(cost);
    switch (cost.type) {
        case 'item':
          return $gameParty.loseItem($dataItems[cost.id], value);
        case 'var':
          return $gameVariables.setValue(cost.id, $gameVariables.value(cost.id) - value);
        case 'gold':
          return $gameParty.loseGold(value);
        case 'weapon':
          return $gameParty.loseItem($dataWeapons[cost.id], value);
        case 'armor':
          return $gameParty.loseItem($dataArmors[cost.id], value);
    }
};

Game_Actor.prototype.isPayCostNg = function(cost) {
    var value = this.evalCostValue(cost);
    switch (cost.type) {
      case 'item':
        return $gameParty.numItems($dataItems[cost.id]) < value;
      case 'var':
        return $gameVariables.value(cost.id) < value;
      case 'gold':
        return $gameParty.gold() < value;
      case 'weapon':
        return $gameParty.numItems($dataWeapons[cost.id]) < value;
      case 'armor':
        return $gameParty.numItems($dataArmors[cost.id]) < value;
    }
};

Game_Actor.prototype.isSusHide = function() {
  return this.actor().susHide || this.currentClass().susHide ? true : false;
};

Game_Actor.prototype.isRateEffects = function(code) {
  switch (code) {
    case Game_Action.EFFECT_ADD_STATE:
    case Game_Action.EFFECT_REMOVE_STATE:
    case Game_Action.EFFECT_RECOVER_HP:
    case Game_Action.EFFECT_RECOVER_MP:
      return true;
  }
  return false;
};

Game_Actor.prototype.isTurnEffects = function(code) {
  switch (code) {
    case Game_Action.EFFECT_ADD_BUFF:
    case Game_Action.EFFECT_ADD_DEBUFF:
      return true;
  }
  return false;
};

Game_Actor.prototype.isUpgradeEffects = function(code) {
  return this.isRateEffects(code) || this.isTurnEffects(code) ||
    code === Game_Action.EFFECT_GAIN_TP;
};

Game_Actor.prototype.isUpgradeTypes  = function(typename) {
  switch (typename) {
    case 'damages':
      return 1;
    case 'mpCost':
    case 'tpCost':
    case 'speed':
    case 'tpGain':
    case 'repeats':
      return 2;
    case 'scope':
      return 3;
    case 'effects':
      return 4;
    case 'default':
      return 0;
  }
  return undefined;
};

Game_Actor.prototype.isUtypeName = function(typeId) {
  return FTKR.SUS.uTypes[typeId].type;
};

Game_Actor.prototype.isHideSkillStatus = function(typeId, sepSkill, effectNum, dataId) {
  return (this.matchUtype(typeId, 'damages') && !sepSkill.damages[dataId].type) ||
         (this.matchUtype(typeId, 'effects') &&
         (!effectNum || !this.isUpgradeEffects(sepSkill.effects[dataId].code)));
};

Game_Actor.prototype.isEnabledSusUpgrade = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  return udata ? !this.isNotUpgrade(udata): false;
};

Game_Actor.prototype.isNotUpgrade = function(udata) {
  return udata.notupgrade;
};

Game_Actor.prototype.isUpgradeLimit = function(udata) {
  return udata.limit <= udata.count;
};

Game_Actor.prototype.isSusShowSwitchOn = function(udata) {
  return udata.sw ? $gameSwitches.value(udata.sw) : true;
};

Game_Actor.prototype.canSusUpgrade = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  return this.canPayUpgradeCost(udata) && !this.isUpgradeLimit(udata);
};

FTKR.SUS.Game_Actor_isPayCostNg = Game_Actor.prototype.isPayCostNg;
Game_Actor.prototype.isPayCostNg = function(cost) {
    switch (cost.type) {
        case 'jp': return this.jp(this._classId) < this.evalCostValue(cost);
    }
    return FTKR.SUS.Game_Actor_isPayCostNg.call(this, cost);
};

Game_Actor.prototype.canPayUpgradeCost = function(udata) {
  return !udata.cost.filter( function(cost) {
    return this.isPayCostNg(cost);
  },this).length;
};

// 'damages'等の文字列から、該当するtypeIdを取得
Game_Actor.prototype.getSusTypeId = function(typename) {
  if (!typename) return false;
  for(var t = 1; t < FTKR.SUS.maxUtypeNum + 1 ; t++) {
    if (FTKR.SUS.uTypes[t].type === typename) return t;
  }
};

// udataを取得
Game_Actor.prototype.getSusUdata = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  if(!sepSkill) return  undefined;
  if(!dataId) dataId = 0;
  if (typeId === 0) return sepSkill.udata[0];
  var udatas = sepSkill.udata.filter(function(type) {
    return type.id === typeId;
  });
  return udatas ? udatas[dataId] : undefined;
};

// skillIdと強化タイプ名('damages'等)から、該当するスキルの強化値(uparam)を取得
Game_Actor.prototype.getSusUparam = function(skillId, typename, dataId) {
  var skill = $dataSkills[skillId];
  if (!this.isUpgradeTypes(typename)) return undefined;
  if (typename === 'scope' && (skill.scope === 1 || skill.scope > 6)) {
    return this.getSusScope(skillId);
  } else {
    return this.getSusUparamBase(skillId, typename, -1, dataId);
  }
};

Game_Actor.prototype.getSusUparamBase = function(skillId, typename, ucount, dataId) {
  var skill = $dataSkills[skillId];
  if (!skill) return undefined;
  var udata = this.getSusUdata(skillId, this.getSusTypeId(typename), dataId);
  if (!udata) return undefined;
  ucount = ucount < 0 ? udata.count : ucount;
  var fmt = udata.format;
  var uvalue = udata.value;
  var result = eval(fmt.format(this.getUbasevalue(skill, typename, dataId), uvalue, ucount));
  return result;
};

Game_Actor.prototype.getUbasevalue = function(skill, type, dataId) {
  if (type === 'effects') {
    return skill.effects[dataId].rate;
  } else if (type === 'damages') {
    return skill.damages[dataId].rate;
  } else if (type === 'scope') {
    return Math.max(skill.scoperandom || skill.scope - 2);
  } else if (type === 'repeats') {
    return Math.max(skill.sepRepeats.count || skill.repeats);
  } else {
    return skill[type];
  }
};

Game_Actor.prototype.getSusScope = function(skillId) {
  var scope = $dataSkills[skillId].scope;
  var typeId = this.getSusTypeId('scope');
  var udata = this.getSusUdata(skillId, typeId);
  return udata ? this.getSusScopeBase(scope, udata.count) : false;
};

Game_Actor.prototype.getSusScopeBase = function(scope, value) {
  switch (scope) {
    case 1:
    case 7:
    case 9:
      return value ? scope + 1 : scope;
    case 3:
    case 4:
    case 5:
    case 6:
      return scope + value > 6 ? 2 : scope + value;
  }
  return scope;
};

Game_Actor.prototype.setUcost = function(type, id, value, count) {
  return {'type':type, 'id':id, 'value':value, 'count':count};
};

Game_Actor.prototype.getSusSkillNotetagsCost = function(skill, typeId) {
  var results = [];
  var type = false;
  var readCost = false;
  var costdata = skill.susUpgradeCost;
  if (costdata) {
    var case1 = /(?:Type)[ ](\d+)[ ](?:gold):[ ]*(.+)/i;
    var case2 = /(?:Type)[ ](\d+)[ ](?:item\[)(\d+)\]:[ ]*(.+)/i;
    var case2a = /(?:Type)[ ](\d+)[ ](?:weapon\[)(\d+)\]:[ ]*(.+)/i;
    var case2b = /(?:Type)[ ](\d+)[ ](?:armor\[)(\d+)\]:[ ]*(.+)/i;
    var case3 = /(?:Type)[ ](\d+)[ ](?:v\[)(\d+)\]:[ ]*(.+)/i;
    var case4 = /(?:Type)[ ](\d+)[ ](?:JP):[ ]*(.+)/i;

    var costs = costdata.split(';');
    for (var i = 0; i < costs.length; i++) {
      var cost = costs[i];
      if(cost.match(case1)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('gold', 0, String(RegExp.$2), 0));
        }
      } else if(cost.match(case2)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('item', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case2a)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('weapon', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case2b)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('armor', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case3)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('var', Number(RegExp.$2), String(RegExp.$3), 0));
        }
      } else if(cost.match(case4)) {
        type = Number(RegExp.$1);
        if (type === typeId) {
          readCost = true;
          results.push(this.setUcost('jp', 0, String(RegExp.$2), 0));
        }
      }
    }
    return readCost ? results : false;
  }
};

//sepSkillに強化用のパラメータ(udata)を追加
FTKR.SUS.Game_Actor_makeSepSkill = Game_Actor.prototype.makeSepSkill;
Game_Actor.prototype.makeSepSkill = function(skillId) {
  FTKR.SUS.Game_Actor_makeSepSkill.call(this, skillId);
  var sepSkill = this.sepSkill(skillId);
  var index = this.makeSusUdata(skillId);
  sepSkill.udata = this._udatas[index];
};

// udataの中身(_udatas[index][typeId])を作成し、this._udatas[index]のindexを返す
Game_Actor.prototype.makeSusUdata = function(skillId) {
  var udatas = [];
  for(var t = 0; t < FTKR.SUS.maxUtypeNum + 1 ; t++) {
    var flag = this.isUpgradeTypes(this.isUtypeName(t));
    if (flag === 'undefined') continue;
    udatas = udatas.concat(this.setSusUdata(skillId, t));
  }
  this._udatas.push(udatas);
  return this._udatas.length - 1;
};

Game_Actor.prototype.setSusUdata = function(skillId, typeId) {
  if (this.matchUtype(typeId, 'damages')) {
    var udatas = [];
    var damages = $dataSkills[skillId].damages;
    var len = damages.length ? damages.length : 1; 
    for (var i = 0; i < len; i++) {
      var udata = this.setSusUdataBase(skillId, typeId);
      if (!damages[i]) udata.notupgrade = true;
      udatas.push(udata);
    }
    return udatas;
  } else if (this.matchUtype(typeId, 'effects')) {
    var udatas = [];
    var effects = $dataSkills[skillId].effects;
    var len = effects.length ? effects.length : 1; 
    for (var i = 0; i < len; i++) {
      var udata = this.setSusUdataBase(skillId, typeId);
      if (!effects[i]) {
        udata.notupgrade = true;
      } else if (!this.isUpgradeEffects(effects[i].code)) {
        udata.notupgrade = true;
      }
      udatas.push(udata);
    }
    return udatas;
  } else {
    return this.setSusUdataBase(skillId, typeId);
  }
};

Game_Actor.prototype.setSusUdataBase = function(skillId, typeId, uflag) {
  var value = this.setUpgradeSkillValue(skillId, typeId);
  var limit = this.setUpgradeSkillLimit(skillId, typeId, value);
  var udata = {
    'id':typeId,
    'count':0,
    'value':value,
    'limit':limit,
    'notupgrade':this.setNotUpgradeSkill(skillId, typeId, limit),
    'cost':this.setUpgradeSkillCost(skillId, typeId),
    'format':this.setUpgradeSkillFormat(skillId, typeId),
    'sw':this.setShowSwitch(skillId, typeId)
  };
  return udata;
};

Game_Actor.prototype.setUpgradeSkillBase = function(lists, skillId, typeId) {
  for (var i in lists) {
    var list = lists[i];
    if (list.skillId == skillId && list.typeId == typeId) return list.value;
  }
  return NaN;
};

Game_Actor.prototype.setUpgradeSkillValue = function(skillId, typeId) {
  var result = this.setUpgradeSkillBase(this.actor().susUpgradeValue, skillId, typeId);
  if (result) return result;
  result = this.setUpgradeSkillBase(this.currentClass().susUpgradeValue, skillId, typeId);
  if (result) return result;
  result = $dataSkills[skillId].susUpgradeValue[typeId];
  if (result) return result;
  result = FTKR.SUS.uTypes[typeId].value;
  return result ? result : FTKR.SUS.uTypes[0].value;
};

Game_Actor.prototype.setUpgradeSkillLimitBase = function(skillId, typeId) {
  var result = this.setUpgradeSkillBase(this.actor().susUpgradeLimit, skillId, typeId);
  if (result > 0) return result;
  result = this.setUpgradeSkillBase(this.currentClass().susUpgradeLimit, skillId, typeId);
  if (result > 0) return result;
  result = $dataSkills[skillId].susUpgradeLimit[typeId];
  if (result > 0) return result;
  result = FTKR.SUS.uTypes[typeId].limit;
  return result > 0 ? result : FTKR.SUS.uTypes[0].limit;
};

Game_Actor.prototype.setUpgradeSkillLimit = function(skillId, typeId, value) {
  var limit = this.setUpgradeSkillLimitBase(skillId, typeId);
  var skill = $dataSkills[skillId];
  if (skill.susNotUpgrade[typeId]) {
    limit = 0;
  } else if (this.matchUtype(typeId, 'damages')&& !skill.damages[0].type) {
    limit = 0;
  } else if (this.matchUtype(typeId, 'mpCost')) {
    var defMpCost = skill.mpCost;
    if (defMpCost < Math.abs(limit * value)) limit = Math.ceil(defMpCost / Math.abs(value));
  } else if (this.matchUtype(typeId, 'tpCost')) {
    var defTpCost = skill.tpCost;
    if (defTpCost < Math.abs(limit * value)) limit = Math.ceil(defTpCost / Math.abs(value));
  } else if (this.matchUtype(typeId, 'scope')) {
    if ([1,7,9].contains(skill.scope)) { limit = 1; }
    else if ([3,4,5,6].contains(skill.scope)) { return limit; }
    else { limit = 0; }
  } else if (this.matchUtype(typeId, 'effects') && !skill.effects[0]) {
    limit = 0;
  }
  return limit;
};

Game_Actor.prototype.setNotUpgradeSkill = function(skillId, typeId, limit) {
  if (limit === 0) return true;
  var skill = $dataSkills[skillId];
  return (this.actor().susNotUpgrade ||
    this.actor().susNotUpgradeSkillType[skill.stypeId] ||
    !this.actor().susNotUpgradeSkill.indexOf(skillId) ||
    this.currentClass().susNotUpgrade || 
    this.currentClass().susNotUpgradeSkillType[skill.stypeId] ||
    !this.currentClass().susNotUpgradeSkill.indexOf(skillId) ||
    skill.susNotUpgrade[typeId] ) ? true : false;
};

Game_Actor.prototype.setShowSwitch = function(skillId, typeId) {
  return $dataSkills[skillId].susShowSwitch[typeId];
};

Game_Actor.prototype.setUpgradeSkillCost = function(skillId, typeId) {
  var results = [];
  var result = {};
  var skill = $dataSkills[skillId];
  results = this.getSusSkillNotetagsCost(skill, typeId);
  if (results) return results;
  var utype = FTKR.SUS.uTypes[typeId];
  if (utype) {
    results = [];
    result = {value:utype.cost, type:this.convertCtype(utype.ctype), id:utype.cid, count:0};
    if (result.value && result.type) {
      results.push(result);
      return results;
    }
  }
  var utype0 = FTKR.SUS.uTypes[0];
  if (!utype0) return false;
  result = {value:utype0.cost, type:this.convertCtype(utype0.ctype), id:utype0.cid, count:0};
  results.push(result);
  return results;
};

Game_Actor.prototype.convertCtype = function(ctype) {
    switch (ctype) {
      case 1: return 'gold';
      case 2: return 'item';
      case 3: return 'var';
      case 4: return 'jp';
      case 5: return 'weapon';
      case 6: return 'armor';
      default: return '';
    };
};

Game_Actor.prototype.setUpgradeSkillFormat = function(skillId, typeId) {
  var fmt = $dataSkills[skillId].susUpgradeFormat[typeId];
  if (fmt) return fmt;
  fmt = FTKR.SUS.uTypes[typeId].format;
  return fmt ? fmt : FTKR.SUS.uTypes[0].format;
};

Game_Actor.prototype.upgradeSepSkill = function(skillId, typeId, dataId) {
  this.payUpgradeCost(skillId, typeId, dataId);
  return this.susUpgradeSepSkill(skillId, typeId, dataId);
};

//スキルを強化する
Game_Actor.prototype.susUpgradeSepSkill = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  udata.count += 1;
  udata.cost.forEach( function(cost, i) {
      udata.cost[i].count += 1;
  });
  var type = FTKR.SUS.uTypes[typeId].type;
  var value = this.getSusUparam(skillId, type, dataId);
  this.setUpgradeParam(sepSkill, type, value, dataId);
  var fmt = FTKR.SUS.susSkillNameFormat;
  sepSkill.name = fmt.format($dataSkills[skillId].name, this.getSusTotalCount(sepSkill));
  return true;
};

Game_Actor.prototype.getSusTotalCount = function(sepSkill) {
  var totalcount = 0;
  sepSkill.udata.forEach( function(udata) {
    totalcount += udata.count;
  });
  return totalcount;
};

Game_Actor.prototype.setUpgradeParam = function(sepSkill, typename, value, dataId) {
  if (typename == 'damages') {
    sepSkill.damages[dataId].rate = value;
  } else if (typename === 'scope' && sepSkill.scoperandom){
    sepSkill.scoperandom = value;
  } else if (typename === 'effects') {
    sepSkill.effects[dataId].rate = value;
  } else if (typename === 'repeats') {
    sepSkill.sepRepeats.count = value;
  } else {
    sepSkill[typename] = value;
  }
};

//書き換え
Game_Actor.prototype.sepSkillsCount = function(cost) {
    return cost.count;
};

FTKR.SUS.Game_Actor_paySepCost = Game_Actor.prototype.paySepCost;
Game_Actor.prototype.paySepCost = function(cost) {
    switch (cost.type) {
        case 'jp': return this.gainJp(-this.evalCostValue(cost), this._classId);
    }
    return FTKR.SUS.Game_Actor_paySepCost.call(this,cost);
};

Game_Actor.prototype.payUpgradeCost = function(skillId, typeId, dataId) {
  var udata = this.getSusUdata(skillId, typeId, dataId);
  udata.cost.forEach( function(cost){
    return this.paySepCost(cost);
  },this);
  return true;
};

Game_Actor.prototype.matchUtype = function(typeId, typename) {
  return typeId === this.getSusTypeId(typename);
}

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

Game_Actor.prototype.isLightUpgradeItem = function(skillId, typeId, dataId) {
  var sepSkill = this.sepSkill(skillId);
  var udata = this.getSusUdata(skillId, typeId, dataId);
  if (!udata) return false;
  return (this.isNotUpgrade(udata, skillId, dataId) ||
      !this.canPayUpgradeCost(udata) ||
      this.isUpgradeLimit(udata)) && FTKR.SUS.showNonUgItem;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.getSkill = function(skillId) {
    return $dataSkills[skillId];
};

Game_Enemy.prototype.isRandomScope = function(skill) {
  return skill.scope > 2 && skill.scope < 7;
};

Game_Enemy.prototype.evalEnabledFormula = function(formula, skill) {
    if (!formula) return true;
    try {
        var a = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var value = eval(formula);
        if (isNaN(value)) value = false;
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSusSkillGauge = function(x, y, width, udata) {
  if (FTKR.SUS.utype.LineColor1 > -1 && FTKR.SUS.utype.LineColor2 > -1) {
    var rate = FTKR.SUS.utype.LineGauge && udata.limit ? udata.count/udata.limit : 1;
    this.drawGauge(x, y, width, rate, this.textColor(FTKR.SUS.utype.LineColor1),
        this.textColor(FTKR.SUS.utype.LineColor2));
  }
};

Window_Base.prototype.setSepSkillStatusFormats = function() {
  return [
    FTKR.SUS.utype.Text1Format,
    FTKR.SUS.utype.Text2Format,
    FTKR.SUS.utype.Text3Format
  ];
};

Window_Base.prototype.setSepSkillStatusParams = function(skill, typeId, dataId) {
  var udata = this._actor.getSusUdata(skill.id, typeId, dataId);
  var utype = FTKR.SUS.uTypes[typeId];
  return [
    TextManager.skillParam(utype.type, skill, dataId),
    udata.count,
    udata.limit,
    this.setSusUparam(utype.type, skill, udata.count, dataId, true)
  ];
};

Window_Base.prototype.sepTypeWidthRate = function() {
  return FTKR.SUS.utype.WidthRate;
};

Window_Base.prototype.sepTypeItemHeigth = function() {
  return FTKR.SUS.utype.ItemHeigth;
};

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

//アクター名、スキル名が使用できるタイトル文を表示する関数
Window_Base.prototype.drawDescTitle = function(format, x, y, width, skill) {
  var diff = this.diffPadding();
  var params = [this._actor._name, skill.name];
  this.drawFormatText(format, x + diff, y + diff, params, width);
};

//スキルの説明文を表示する関数
Window_Base.prototype.drawDescription = function(x, y, width, skill) {
  var diff = this.diffPadding();
  var desc = this.getDesc(skill);
  var texts = desc.split('\n');
  width *= 0.95;
  var dy = this.lineHeight();
  for (var i = 0; i < texts.length; i++) {
    this.drawFormatText(texts[i], x + diff, y + diff + dy * i, [], width);
  }
};

//スキルの説明文を取得する関数
Window_Base.prototype.getDesc = function(skill) {
  if (Imported.FTKR_SEP) {
    var actor = $gameActors.actor(skill.actorId);
    if (!actor) return skill.description;
    var descs = skill.descs.filter( function(desc) {
        return actor.evalEnabledFormula(desc.enabled, skill);
    });
    var desc = descs.pop();
    return desc ? desc.description : '';
  } else {
    return skill.description;
  }
};

/*-------------------------------------------------------------
  スキルパラメータを表示する関数
-------------------------------------------------------------*/
Window_Base.prototype.drawSepSkillStatus = function(tx, ty, tw, rect, typeId, skill, dataId){
  var formats = this.setSepSkillStatusFormats();
  var params = this.setSepSkillStatusParams(skill, typeId, dataId);
  var txs = []; var tys = []; var tws = [];
  var sih = this.sepTypeItemHeigth();
  var wr = this.sepTypeWidthRate().split(',').num();
  var wrs = Math.sam(wr);
  for (var i = 0; i < 3; i++) {
    txs[i] = (i === 0 || (i > 3 - sih)) ? tx : txs[i-1] + tws[i-1];
    tys[i] = rect.y + ty * (sih - 3 + i).clamp(0, 2);
    switch (sih) {
      case 1:
        tws[i] = tw * wr[i] / wrs; break;
      case 2:
        tws[i] = (i === 2) ? tw * wr[i] / wr[2] :
                tw * wr[i] / (wr[0] + wr[1]) ; break;
      default:
        tws[i] = tw; break;
    }
    this.exchangeFormat(formats[i], skill, typeId, dataId);
    this.drawFormatText(formats[i], txs[i], tys[i], params, tws[i]);
  }
};

/*-------------------------------------------------------------
  コストデータ(アイコン,名前,必要数,手持ち数)を表示する関数
-------------------------------------------------------------*/
Window_Base.prototype.drawSepCost = function(format, cost, x, y, width) {
  var diff = this.diffPadding();
  x += diff;
  y += diff;
  var iw = Window_Base._iconWidth + 4;
  width = width - iw;
  if (cost) {
    this.drawIcon(this.setSepCost(cost).icon, x, y);
    var params = [
      this.setSepCost(cost).name,
      this._actor.evalCostValue(cost),
      '(' + this.setSepCost(cost).base + ')'
    ];
    this.drawFormatText(format, x + iw, y, params, width);
  }
};

Window_Base.prototype.setCost = function(icon, name, base) {
    return {icon:icon, name:name, base:base};
};

Window_Base.prototype.setSepCost = function(cost) {
  switch(cost.type) {
    case 'gold':
      return this.setCost(FTKR.SUS.costGoldIcon, $dataSystem.currencyUnit, $gameParty.gold());
    case 'item':
      var item = $dataItems[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    case 'var'://変数
      return this.setCost(FTKR.SUS.costVarIcon, $dataSystem.variables[cost.id], $gameVariables.value(cost.id));
    case 'weapon':
      var item = $dataWeapons[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    case 'armor':
      var item = $dataArmors[cost.id];
      return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
    default:
      return this.setCost(0, '', 0);
  }
};

//アイコンの表示スケールを指定できる表示関数
Window_Base.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
};

Window_Base.prototype.drawSepSkillLine = function(x, y, width) {
  if (FTKR.SUS.sepType.LineColor1 > -1 && FTKR.SUS.sepType.LineColor2 > -1) {
    this.drawGauge(x, y, width, 1, this.textColor(FTKR.SUS.sepType.LineColor1),
        this.textColor(FTKR.SUS.sepType.LineColor2));
  }
};

// 専用の制御文字を使えるテキスト描画関数
// 詳しくは、ヘルプ参照
Window_Base.prototype.drawFormatText = function(fmt, x, y, params, width, height) {
  var texts = fmt.split('\\n');
  var cxs = [], cws = [], chs = [], colors = [], sizes = [], fsizes = [], posis = [];
  var tw = this.textWidth('0');
  var space = 0;

  var case1 = /\\l\[(\d+)\]/g;
  var case1R = /\\lR\[(\d+)\]/g;
  var case1C = /\\lC\[(\d+)\]/g;
  var case2 = /\\c\[(\d+)\]/g;
  var case3 = /\\s\[(\d+)\]/g;
  var case3b = /\\sp\[(\d+)\]/g;
  var case3c = /\\sb\[(\d+)\]/g;
  var case4 = /\\R/g;
  var case5 = /\\C/g;

  if (!params) params = [];
  if (texts.length) {
    for (var i = 0; i < texts.length; i++) {
      var text = texts[i];
      var cflag = false;
      var pflag = '';
      cxs[i] = i > 0 ? cxs[i-1] + cws[i-1] : x;
      chs[i] = height || this.lineHeight();
      colors[i] = -1;
      var size = 100;
      var fsize = this.standardFontSize();
      if (text.match(case2)) {
        colors[i] = Number(RegExp.$1);
        text = text.del(case2);
      }
      if (text.match(case3)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3);
      } else if (text.match(case3b)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3b);
        chs[i] = chs[i] * (50 - size) / 150;
      } else if (text.match(case3c)) {
        size = Number(RegExp.$1);
        fsize = Math.floor(fsize * size / 100);
        text = text.del(case3c);
        chs[i] = chs[i] * (250 - size) / 150;
      }
      var scr = tw * size / 100;
      if (text.match(case1)) {
        cws[i] = Number(RegExp.$1) * scr;
        cflag = true;
        text = text.del(case1);
      } else if (text.match(case1R)) {
        cws[i] = Number(RegExp.$1) * scr;
        posis[i] = 'right';
        cflag = true;
        text = text.del(case1R);
      } else if (text.match(case1C)) {
        cws[i] = Number(RegExp.$1) * scr;
        cflag = true;
        posis[i] = 'center';
        text = text.del(case1C);
      }
      if (text.match(case4)) {
        posis[i] = 'right';
        pflag = 'right';
        if (texts.length === 1 && !cflag) {
          cws[i] = width;
          cflag = true;
        }
        text = text.del(case4);
      } else if (text.match(case5)) {
        posis[i] = 'center';
        pflag = 'center';
        if (texts.length === 1 && !cflag) {
          cws[i] = width;
          cflag = true;
        }
        text = text.del(case5);
      }
      text = text.format(params[0], params[1], params[2], params[3], params[4]);
      if (!cflag) cws[i] = text.charCount() * scr;
      texts[i] = text;
      fsizes[i] = fsize;
    }
    if (width) {
      var textWidth = Math.sam(cws);
      var diff = width - textWidth;
      if (diff < 0) {
        for(var i = 0; i < cws.length; i++) {
          cws[i] *= width / textWidth;
          cxs[i] = i > 0 ? cxs[i-1] + cws[i-1]: x;
        }
      } else if (diff > 0 && pflag === 'right') {
        space = diff;
      } else if (diff > 0 && pflag === 'center') {
        space = diff / 2;
      }
    }
    for (var i = 0; i < texts.length; i++) {
      if (colors[i] >= 0) this.changeTextColor(this.textColor(colors[i]));
      this.drawTextCustom(texts[i], cxs[i] + space, y, cws[i], chs[i], fsizes[i], posis[i]);
      if (colors[i] >= 0) this.changeTextColor(this.textColor(0));
    }
  }
  return textWidth;
};

Window_Base.prototype.drawTextCustom = function(text, x, y, w, h ,fontsize, align) {
  this.contents.fontSize = fontsize;
  this.contents.drawText(text, x, y, w, h, align);
  this.contents.fontSize = this.standardFontSize();
};

Window_Base.prototype.defaultPadding = function() {
    return 18;
};

Window_Base.prototype.diffPadding = function() {
    return this.defaultPadding() - this.standardPadding();
};

Window_Base.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.actSelect = function(index) {
  this.activate();
  this.select(index);
  this.refresh();
};

Window_Selectable.prototype.itemHeightSpace = function() {
    return 0;
};

Window_Selectable.prototype.unitHeight = function() {
    return this.itemHeight() + this.itemHeightSpace();
};

Window_Selectable.prototype.unitWidth = function() {
    return this.itemWidth() + this.spacing();
};

//書き換え
Window_Selectable.prototype.itemWidth = function() {
    return Math.floor((this.width - (this.padding + this.diffPadding()) * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
};

//書き換え
Window_Selectable.prototype.maxPageRows = function() {
    var pageHeight = this.height - (this.padding + this.diffPadding()) * 2;
    return Math.floor(pageHeight / this.unitHeight());
};

//書き換え
Window_Selectable.prototype.topRow = function() {
    return Math.floor(this._scrollY / this.unitHeight());
};

//書き換え
Window_Selectable.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

//書き換え
Window_Selectable.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    var diff = this.diffPadding();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * this.unitWidth() - this._scrollX + diff;
    rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY + diff;
    return rect;
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

Window_UpgradeTypeList.prototype = Object.create(Window_Selectable.prototype);
Window_UpgradeTypeList.prototype.constructor = Window_UpgradeTypeList;

Window_UpgradeTypeList.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._data = [];
  this.clearWindow();
  this.defineUpgradeSound();
};

Window_UpgradeTypeList.prototype.defineUpgradeSound = function() {
  this.setUpgradeSound();
};

Window_UpgradeTypeList.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.clearWindow();
    this.resetScroll();
  }
};

Window_UpgradeTypeList.prototype.clearWindow = function() {
  this._sssIndex = 0;
  this._skillId = null;
  this._typeId = null;
  this._dataId = null;
  this.refresh();
};

Window_UpgradeTypeList.prototype.maxCols = function() {
  return FTKR.SUS.utype.MaxCols.clamp(1, 3);
};

Window_UpgradeTypeList.prototype.itemHeight = function() {
    return this.lineHeight() * FTKR.SUS.utype.ItemHeigth.clamp(1, 3);
};

Window_UpgradeTypeList.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_UpgradeTypeList.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_UpgradeTypeList.prototype.isCurrentItemEnabled = function() {
  return this._actor.canSusUpgrade(this._skillId, this._typeId, this._dataId);
};

Window_UpgradeTypeList.prototype.isEnabled = function(typeId, dataId) {
  return this._actor && !this._actor.isNonUpgradeItem(this._skillId, typeId, dataId);
};

Window_UpgradeTypeList.prototype.isShowItem = function(typeId, dataId) {
  return this._actor && !this._actor.isLightUpgradeItem(this._skillId, typeId, dataId);
};

Window_UpgradeTypeList.prototype.makeItemList = function() {
  this._data = [];
  var actor = this._actor;
  if (!actor) return false;
  var count = 0;
  var data = {};
  if (this._skillId === null) return false;
  var skill = actor.getSkill(this._skillId);
  for(var t = 1; t < FTKR.SUS.maxUtypeNum + 1; t++) {
    for (var prop in skill) {
      if (prop === FTKR.SUS.uTypes[t].type) {
        var len = prop === 'damages' || prop === 'effects' ? skill[prop].length : 1;
        for (var i = 0; i < len; i++) {
          if (prop === 'damages' && skill.damages[i].type < 1) continue;
          if (this.isEnabled(t, i)) {
            data = { typeId:t, dataId:i };
            this._data.push(data);
          }
        }
        continue;
      }
    }
  }
};

Window_UpgradeTypeList.prototype.drawItem = function(index) {
  var actor = this._actor;
  var skillId = this._skillId;
  var typeId = this._data[index].typeId;
  var dataId = this._data[index].dataId;
  var skill = actor.getSkill(skillId);

  var rect = this.itemRect(index);
  var iw = Window_Base._iconWidth + 4;
  var tx = rect.x + iw;
  var ty = this.lineHeight();
  var tw = rect.width - iw;

  if (typeId) {
    this.changePaintOpacity(this.isShowItem(typeId, dataId));
    this.drawSepFrame(index);
    this.drawSkillLine(tx, rect.y, tw-4, skillId, typeId, dataId);
    this.drawStatusIcon(rect.x + 2, rect.y + 2, typeId);
    this.drawSkillStatus(tx, ty, tw - this.frameThick()*2, rect, skill, typeId, dataId);
    this.changePaintOpacity(1);
  }
};

Window_UpgradeTypeList.prototype.drawSepFrame = function(index) {
  if (Imported.FTKR_DCF) {
    this.drawDcfFrame(index, FTKR.SUS.frame);
  }
};

Window_UpgradeTypeList.prototype.drawSkillLine = function(x, y, width, skillId, typeId, dataId) {
    var udata = this._actor.getSusUdata(skillId, typeId, dataId);
    this.drawSusSkillGauge(x, y, width, udata);
};

Window_UpgradeTypeList.prototype.frameThick = function() {
    return FTKR.SUS.frame.line.thick;
};

Window_UpgradeTypeList.prototype.drawSkillStatus = function(tx, ty, tw, rect, skill, typeId, dataId){
    this.drawSepSkillStatus(tx, ty, tw, rect, typeId, skill, dataId);
};

Window_UpgradeTypeList.prototype.drawStatusIcon = function(x, y, typeId) {
    var utype = FTKR.SUS.uTypes[typeId];
    var icon = utype.icon ? utype.icon : FTKR.SUS.uTypes[0].icon;
    this.drawIcon(icon, x, y);
};

Window_UpgradeTypeList.prototype.updateHelp = function() {
  this.setHelpWindowItem(this._actor.getSkill(this._skillId));
};

Window_UpgradeTypeList.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_UpgradeTypeList.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this._typeId = 1;
  this.refresh();
};

Window_UpgradeTypeList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if (Imported.FTKR_DCF) this.updateDcfFrame(index, FTKR.SUS.frame);
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
    var type = FTKR.SUS.uTypes[this._typeId].type;

    var width = this.width - this.standardPadding() * 2;
    var y = this.lineHeight();
    var cy = y * 3;

    if(!FTKR.SUS.alwaysDispCost) {
      this.drawSusUparam(y, width, sepSkill, type, udata, eId);
      cy = 0;
    }
    this.drawFormatText(FTKR.SUS.ucost.SubTitle2Text, 0, y*3 - cy, width);
    var sp = this.textWidth('0');
    var dcx = [0,0,0];
    var sflag = 1;
    if (FTKR.SUS.ucost.CostLines === 'series') {
      width = (width - sp*2)/3;
      dcx = [0, width + sp, width*2 + sp*2];
      sflag = 0;
    }
    for (var i = 0; i< 3; i++) {
      this.drawSepCost(FTKR.SUS.ucost.ItemFormat, udata.cost[i], dcx[i], y*4 - cy + y*i*sflag, width);
    }
  }
};

Window_SusCost.prototype.drawSusUparam = function(y, width, sepSkill, type, udata, dataId) {
  var defname = FTKR.SUS.susUpgradeDefName;
  var params = [
      sepSkill.name,
      defname.format(TextManager.skillParam(type, sepSkill, dataId))
  ];
  this.drawFormatText(FTKR.SUS.ucost.TitleFormat, 0, 0, params, width);
  this.drawFormatText(FTKR.SUS.ucost.SubTitle1Text, 0, y, false, width);
  if (udata.count < udata.limit) {
    var params = [
      udata.count,
      this.setSusUparam(type, sepSkill, udata.count, dataId),
      udata.count + 1,
      this.setSusUparam(type, sepSkill, udata.count + 1, dataId)
    ];
    this.drawFormatText(FTKR.SUS.ucost.TextFromat, 0, y*2, params, width);
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

Window_SusConf.prototype = Object.create(Window_Selectable.prototype);
Window_SusConf.prototype.constructor = Window_SusConf;

Window_SusConf.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.setUpgradeSound();
  this._actor = null;
  this._data = [];
  this._enabled = false;
  this._dicision = false;
};

Window_SusConf.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  }
};

Window_SusConf.prototype.maxCols = function() {
    return 2;
};

Window_SusConf.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_SusConf.prototype.item = function() {
  return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_SusConf.prototype.makeItemList = function() {
  this._data = [
    {dicision:true, disp:FTKR.SUS.confOkFormat},
    {dicision:false, disp:FTKR.SUS.confCancelFormat}
  ];
};

Window_SusConf.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_SusConf.prototype.isEnabled = function(index) {
  return this._actor && (this._enabled || index > 0);
};

Window_SusConf.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.index());
};

Window_SusConf.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.changePaintOpacity(this.isEnabled(index));
  this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
  this.changePaintOpacity(1);
};

Window_SusConf.prototype.setEnabled = function(enabled) {
  if (this._enabled === enabled) return;
  this._enabled = enabled;
  this.refresh();
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
    this.drawCssActorStatus(0, actor, 0, 0, w, h, FTKR.SUS.actorStatus);
  } else {
    this.drawText(actor._name, 0, 0, w, h);
  }
};

//=============================================================================
// Window_SepSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================
/*
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
*/

//=============================================================================
// Window_SepStatus
//=============================================================================

function Window_SepStatus() {
  this.initialize.apply(this, arguments);
}

Window_SepStatus.prototype = Object.create(Window_Base.prototype);
Window_SepStatus.prototype.constructor = Window_SepStatus;

Window_SepStatus.prototype.initialize = function(x, y, width, height) {
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._actor = null;
  this._skillId = null;
};

Window_SepStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) this._actor = actor;
};

Window_SepStatus.prototype.clearWindow = function() {
  this._skillId = null;
  this.refresh();
};

Window_SepStatus.prototype.refresh = function() {
  this.contents.clear();
  this.drawSepState();
};

Window_SepStatus.prototype.setSkillId = function(skillId) {
  if (this._skillId === skillId) return;
  this._skillId = skillId;
  this.refresh();
};

Window_SepStatus.prototype.drawSepState = function() {
  if (this._actor && this._skillId) {
    var skill = this._actor.getSkill(this._skillId);
    var y = this.lineHeight();
    var width = this.width - this.textPadding() * 2;
    this.drawDescTitle(FTKR.SUS.ustatusTitleFormat, 0, 0, width, skill);
    this.drawElement(0, y, width, skill);
    this.drawDescTitle('説明:\\c[16]', 0, y*2, width, skill);
    this.drawDescription(0, y*3, width, skill);
  }
};

Window_SepStatus.prototype.drawElement = function(x, y, width, skill) {
  var elmId = skill.damages[0].elementId;
  if (elmId === -1) {
    var elmname = FTKR.SUS.Elements.NormalAttackName;
  } else if (elmId === 0) {
    var elmname = FTKR.SUS.Elements.NonName;
  } else {
    var elmname = $dataSystem.elements[skill.damages[0].elementId];
    var elmIds = skill.damages[0].addElmIds;
    if (elmIds) {
      elmIds.forEach( function(id) {
        elmname += ',' + $dataSystem.elements[id];
      });
    }
  }
  var params1 = [FTKR.SUS.Elements.Name, elmname];
  this.drawFormatText('%1:\\c[16]\\n%2', x, y, params1, width);
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
  if (FTKR.SUS.ucost.CostLines === 'series') line -=2;
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
  var wr = FTKR.SUS.ucost.CostLines === 'series' ? 4 : 3;

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
  FTKR.SUS.subComOk = false;
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
    FTKR.SUS.confOk = false;
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

var _SUS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  _SUS_Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SUS') {
    switch (args[0]) {
      // システム画面上ではなく、直接プラグインコマンドで強化する。
      case 'Upgrade':
      case 'UPGRADE':
        if (args[1] === 'Actor' && args[3] === 'Skill' && args[5] === 'Type' && args[7] === 'Levelup') {
          if ($gameActors.actor(args[2]) && Number(args[8]) > 0) {
            var actor = $gameActors.actor(args[2]);
            var dataId = 0;
            if (args[9] === 'dataId') dataId = Number(args[10]);
            for (var i = 0; i < Number(args[8]); i++) {
              actor.susUpgradeSepSkill(Number(args[4]), Number(args[6]), dataId);
            }
          }
        }
        break;
      // 指定した強化タイプの最大レベルを変更する。
      case 'Set':
      case 'SET':
        if (args[1] === 'Limit' && Number(args[2]) >= 0) {
          if (args[3] === 'Actor' && args[5] === 'Skill' && args[7] === 'Type') {
            var udata = this.getSusUdata(args[4], args[6], args[8], args[9], args[10]);
            if (!udata) return false;
            udata.limit = Number(args[2]) >= udata.count ? Number(args[2]) : false;
          }
        }
        break;
      case 'Get':
      case 'GET':
        // 指定の変数に、アクター、スキル、強化タイプを指定して強化回数を代入する
        if (args[1] === 'Variables' && Number(args[2]) > 0) {
          if (args[3] === 'Actor' && args[5] === 'Skill' && args[7] === 'Type') {
            var udata = this.getSusUdata(args[4], args[6], args[8], args[9], args[10]);
            if (!udata) return false;
            $gameVariables.setValue(Number(args[2]), udata.count);
          }
        // 指定のスイッチを、アクター、スキル、強化タイプの強化回数が指定の値と比べてどうか判定して、結果を代入する
        } else if (args[1] === 'Switches' && Number(args[2]) > 0　) {
          if (args[5] === 'Actor' && args[7] === 'Skill' && args[9] === 'Type') {
            var udata = this.getSusUdata(args[6], args[8], args[10], args[11], args[12]);
            if (!udata) return false;
            if (args[3] === 'CountOver') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) < udata.count);
            } else if (args[3] === 'CountUnder') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) > udata.count);
            } else if (args[3] === 'CountEqual') {
                $gameSwitches.setValue(Number(args[2]), Number(args[4]) == udata.count);
            }
          }
        }
    }
  }
};

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

Game_Interpreter.prototype.getSusUdata = function(Actor, SkillId, TypeId, Effect, dataId) {
  var actor = $gameActors.actor(Number(Actor));
  if (!actor) return false;
  var skillId = Number(SkillId);
  var typeId = Number(TypeId);
  if (!actor.sepSkill(SkillId)) return false;
  var dataId = Effect === 'dataId' ? Number(dataId) : 0;
  var udata = actor.getSusUdata(skillId, typeId, dataId);
  return udata ? udata : false;
};


