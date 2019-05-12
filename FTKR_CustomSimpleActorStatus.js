//=============================================================================
// アクターのステータス表示を変更するプラグイン
// FTKR_CustomSimpleActorStatus.js
// プラグインNo : 9
// 作成者     : フトコロ
// 作成日     : 2017/03/09
// 最終更新日 : 2019/05/12
// バージョン : v3.5.3
//=============================================================================
// GraphicalDesignMode.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};

//=============================================================================
/*:
 * @plugindesc v3.5.3 アクターのステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData items
 * 
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData weapons
 * 
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData armors
 * 
 * @param face
 * @text --顔画像の設定--
 * @default
 * 
 * @param Face Image Width
 * @desc アクターの顔画像幅を設定します
 * デフォルトは144
 * @default 144
 * @parent face
 * 
 * @param Face Image Height
 * @desc アクターの顔画像高さを設定します
 * デフォルトは144
 * @default 144
 * @parent face
 * 
 * @param Face Position X
 * @desc 顔画像を描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * @parent face
 * 
 * @param chara
 * @text --歩行キャラの設定--
 * @default
 * 
 * @param Chara Image Width
 * @desc アクターの歩行キャラの画像幅を設定します
 * デフォルトは48
 * @default 48
 * @parent chara
 * 
 * @param Chara Image Height
 * @desc アクターの歩行キャラの画像高さを設定します
 * デフォルトは48
 * @default 48
 * @parent chara
 * 
 * @param Chara Position X
 * @desc アクターの歩行キャラを描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * @parent chara
 * 
 * @param Chara Direction
 * @desc アクターの歩行キャラの向きを設定します。
 * 0 - 正面固定, 1 - マップ上の先頭プレイヤーの向き
 * @default 0
 * @parent chara
 * 
 * @param sv
 * @text --SVキャラの設定--
 * @default
 * 
 * @param Sv Image Width
 * @desc アクターのSVキャラの画像幅を設定します
 * デフォルトは64
 * @default 64
 * @parent sv
 * 
 * @param Sv Image Height
 * @desc アクターのSvキャラの画像高さを設定します
 * デフォルトは64
 * @default 64
 * @parent sv
 * 
 * @param Sv Position X
 * @desc アクターのSvキャラを描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * @parent sv
 * 
 * @param Enabled Sv Motion
 * @desc Svキャラのモーションを有効にするか設定します
 * 0 - 無効にする, 1 - 常に有効にする, 2 - 戦闘時以外有効
 * @default 1
 * @parent sv
 * 
 * @param Sv Image Motion
 * @desc Svキャラの標準モーションを設定します
 * @default wait
 * @parent sv
 * 
 * @param Enabled State Motion
 * @desc ステートモーションを有効にするか設定します
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
 * @parent sv
 * 
 * @param state
 * @text --ステートの設定--
 * @default
 * 
 * @param Enable CSS States
 * @desc ステートアイコンの表示を専用の描画処理に変えるか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
 * @parent state
 * 
 * @param Animation Wait
 * @desc ステートアイコンの切り替え時間を指定します
 * デフォルトは40
 * @default 40
 * @parent state
 * 
 * @param Enable Overlap
 * @desc ステートアイコンの重なり表示を有効にする
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * @parent state
 * 
 * @param Overlap Rate
 * @desc アイコンの重なりを許容する比率を設定します。
 * @default 0.5
 * @parent state
 * 
 * @param State Icon Padding
 * @desc アイコン表示に必要な余白を指定します。
 * @default 4
 * @type number
 * @min 0
 * @parent state
 * 
 * @param Enable Auto Scale
 * @desc 行の高さまたは表示幅に合わせてアイコンサイズを調整するか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * @parent state
 * 
 * @param pdiff
 * @text --通常能力値(差分)の設定--
 * @default
 * 
 * @param Enabled Escapecharacters By PDIFF
 * @desc 差分表示に制御文字使えるようにする
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @parent pdiff
 * 
 * @param Format PDIFF Plus
 * @desc 増加の場合の表示を設定します。
 * %1 - 増加値
 * @default \c[24]+ %1
 * @parent pdiff
 * 
 * @param Format PDIFF Minus
 * @desc 減少の場合の表示を設定します。
 * %1 - 減少値
 * @default \c[25]- %1
 * @parent pdiff
 * 
 * @param xparam
 * @text --能力値の設定--
 * @default
 * 
 * @param Disp Decimals Param
 * @desc 能力値が率で表されるパラメータの表示方法を選択します。
 * @type select
 * @option 少数で表示
 * @value 0
 * @option パーセント(%)で表示
 * @value 1
 * @default 0
 * @parent xparam
 * 
 * @param equip
 * @text --装備パラメータの設定--
 * @default
 * 
 * @param Equip Right Arrow
 * @desc 装備を変える時に表示する右矢印記号を指定します。
 * @default \c[16]→
 * @parent equip
 * 
 * @param ediff
 * @text --装備パラメータ(差分)の設定--
 * @default
 * 
 * @param Enabled Escapecharacters By EDIFF
 * @desc 差分表示に制御文字使えるようにする
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @parent ediff
 * 
 * @param Format EDIFF Plus
 * @desc 増加の場合の表示を設定します。
 * %1 - 増加値
 * @default \c[24]+ %1
 * @parent ediff
 * 
 * @param Format EDIFF Minus
 * @desc 減少の場合の表示を設定します。
 * %1 - 減少値
 * @default \c[25]- %1
 * @parent ediff
 * 
 * @param aopdiff
 * @text --AOP能力値(差分)の設定--
 * @default
 * 
 * @param Enabled Escapecharacters By AOPDIFF
 * @desc 差分表示に制御文字使えるようにする
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @parent aopdiff
 * 
 * @param Format AOPDIFF Plus
 * @desc 増加の場合の表示を設定します。
 * %1 - 増加値
 * @default \c[24]+ %1
 * @parent aopdiff
 * 
 * @param Format AOPDIFF Minus
 * @desc 減少の場合の表示を設定します。
 * %1 - 減少値
 * @default \c[25]- %1
 * @parent aopdiff
 * 
 * @param ediffaop
 * @text --AOP装備パラメータ(差分)の設定--
 * @default
 * 
 * @param Enabled Escapecharacters By EDIFFAOP
 * @desc 差分表示に制御文字使えるようにする
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @parent ediffaop
 * 
 * @param Format EDIFFAOP Plus
 * @desc 増加の場合の表示を設定します。
 * %1 - 増加値
 * @default \c[24]+ %1
 * @parent ediffaop
 * 
 * @param Format EDIFFAOP Minus
 * @desc 減少の場合の表示を設定します。
 * %1 - 減少値
 * @default \c[25]- %1
 * @parent ediffaop
 * 
 * @param image
 * @text --カスタム画像の設定--
 * @default
 * 
 * @param Image Position X
 * @desc カスタム画像を描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * @parent image
 * 
 * @param message
 * @text --メッセージの設定--
 * @default
 * 
 * @param Display LevelUp Message
 * @desc レベルアップ時のメッセージを設定します。
 * %1 - アクター名, %2 - 現在レベル, %3 - 上昇したレベル
 * @default \C[17]%3 Level Up!
 * @parent message
 * 
 * @param customParam
 * @text --カスタムパラメータの設定--
 * 
 * @param --Custom Param 0--
 * @default
 * @parent customParam
 * 
 * @param Custom 0 Display Name
 * @desc Custom(0)の表示名を設定します
 * @default \c[16]現在の経験値
 * @parent customParam
 * 
 * @param Custom 0 References
 * @desc Custom(0)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 0 Unit
 * @desc Custom(0)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 1--
 * @default
 * @parent customParam
 * 
 * @param Custom 1 Display Name
 * @desc Custom(1)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 1 References
 * @desc Custom(1)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.currentExp()
 * @parent customParam
 * 
 * @param Custom 1 Unit
 * @desc Custom(1)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 2--
 * @default
 * @parent customParam
 * 
 * @param Custom 2 Display Name
 * @desc Custom(2)の表示名を設定します
 * @default \c[16]次のレベルまで
 * @parent customParam
 * 
 * @param Custom 2 References
 * @desc Custom(2)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 2 Unit
 * @desc Custom(2)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 3--
 * @default
 * @parent customParam
 * 
 * @param Custom 3 Display Name
 * @desc Custom(3)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 3 References
 * @desc Custom(3)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.nextRequiredExp()
 * @parent customParam
 * 
 * @param Custom 3 Unit
 * @desc Custom(3)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 4--
 * @default
 * @parent customParam
 * 
 * @param Custom 4 Display Name
 * @desc Custom(4)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 4 References
 * @desc Custom(4)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 4 Unit
 * @desc Custom(4)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 5--
 * @default 
 * @parent customParam
 * 
 * @param Custom 5 Display Name
 * @desc Custom(5)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 5 References
 * @desc Custom(5)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 5 Unit
 * @desc Custom(5)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 6--
 * @default 
 * @parent customParam
 * 
 * @param Custom 6 Display Name
 * @desc Custom(6)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 6 References
 * @desc Custom(6)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 6 Unit
 * @desc Custom(6)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 7--
 * @default 
 * @parent customParam
 * 
 * @param Custom 7 Display Name
 * @desc Custom(7)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 7 References
 * @desc Custom(7)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 7 Unit
 * @desc Custom(7)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 8--
 * @default
 * @parent customParam
 * 
 * @param Custom 8 Display Name
 * @desc Custom(8)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 8 References
 * @desc Custom(8)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 8 Unit
 * @desc Custom(8)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 9--
 * @default
 * @parent customParam
 * 
 * @param Custom 9 Display Name
 * @desc Custom(9)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 9 References
 * @desc Custom(9)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 9 Unit
 * @desc Custom(9)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 10--
 * @default
 * @parent customParam
 * 
 * @param Custom 10 Display Name
 * @desc Custom(10)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 10 References
 * @desc Custom(10)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 10 Unit
 * @desc Custom(10)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 11--
 * @default
 * @parent customParam
 * 
 * @param Custom 11 Display Name
 * @desc Custom(11)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 11 References
 * @desc Custom(11)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 11 Unit
 * @desc Custom(11)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 12--
 * @default
 * @parent customParam
 * 
 * @param Custom 12 Display Name
 * @desc Custom(12)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 12 References
 * @desc Custom(12)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 12 Unit
 * @desc Custom(12)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 13--
 * @default
 * @parent customParam
 * 
 * @param Custom 13 Display Name
 * @desc Custom(13)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 13 References
 * @desc Custom(13)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 13 Unit
 * @desc Custom(13)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 14--
 * @default
 * @parent customParam
 * 
 * @param Custom 14 Display Name
 * @desc Custom(14)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 14 References
 * @desc Custom(14)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 14 Unit
 * @desc Custom(14)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 15--
 * @default
 * @parent customParam
 * 
 * @param Custom 15 Display Name
 * @desc Custom(15)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 15 References
 * @desc Custom(15)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 15 Unit
 * @desc Custom(15)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 16--
 * @default
 * @parent customParam
 * 
 * @param Custom 16 Display Name
 * @desc Custom(16)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 16 References
 * @desc Custom(16)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 16 Unit
 * @desc Custom(16)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 17--
 * @default
 * @parent customParam
 * 
 * @param Custom 17 Display Name
 * @desc Custom(17)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 17 References
 * @desc Custom(17)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 17Unit
 * @desc Custom(17)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 18--
 * @default
 * @parent customParam
 * 
 * @param Custom 18 Display Name
 * @desc Custom(18)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 18 References
 * @desc Custom(18)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 18 Unit
 * @desc Custom(18)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param --Custom Param 19--
 * @default
 * @parent customParam
 * 
 * @param Custom 19 Display Name
 * @desc Custom(19)の表示名を設定します
 * @default 
 * @parent customParam
 * 
 * @param Custom 19 References
 * @desc Custom(19)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customParam
 * 
 * @param Custom 19 Unit
 * @desc Custom(19)の単位を設定します。
 * @default 
 * @parent customParam
 * 
 * @param customGauge
 * @text --カスタムゲージの設定--
 * 
 * @param Gauge Param Digit
 * @desc 現在値と最大値の表示幅を指定した桁数に設定する
 * @default 4
 * @parent customGauge
 * 
 * @param --Gauge Param 0--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 0 Display Name
 * @desc Gauge(0)の表示名を設定します
 * @default \C[16]EXP
 * @parent customGauge
 * 
 * @param Gauge 0 References
 * @desc Gauge(0)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 0 Current
 * @desc Gauge(0)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.isMaxLevel() ? '--------' : a.currentExp()
 * @parent customGauge
 * 
 * @param Gauge 0 Max
 * @desc Gauge(0)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.isMaxLevel() ? '--------' : a.nextLevelExp()
 * @parent customGauge
 * 
 * @param Gauge 0 Color1
 * @desc Gauge(0)のゲージの色1を設定します。
 * @default 17
 * @parent customGauge
 * 
 * @param Gauge 0 Color2
 * @desc Gauge(0)のゲージの色2を設定します。
 * @default 6
 * @parent customGauge
 * 
 * @param --Gauge Param 1--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 1 Display Name
 * @desc Gauge(1)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 1 References
 * @desc Gauge(1)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 1 Current
 * @desc Gauge(1)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 1 Max
 * @desc Gauge(1)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 1 Color1
 * @desc Gauge(1)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 1 Color2
 * @desc Gauge(1)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 2--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 2 Display Name
 * @desc Gauge(2)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 2 References
 * @desc Gauge(2)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 2 Current
 * @desc Gauge(2)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 2 Max
 * @desc Gauge(2)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 2 Color1
 * @desc Gauge(2)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 2 Color2
 * @desc Gauge(2)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 3--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 3 Display Name
 * @desc Gauge(3)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 3 References
 * @desc Gauge(3)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 3 Current
 * @desc Gauge(3)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 3 Max
 * @desc Gauge(3)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 3 Color1
 * @desc Gauge(3)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 3 Color2
 * @desc Gauge(3)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 4--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 4 Display Name
 * @desc Gauge(4)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 4 References
 * @desc Gauge(4)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 4 Current
 * @desc Gauge(4)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 4 Max
 * @desc Gauge(4)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 4 Color1
 * @desc Gauge(4)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 4 Color2
 * @desc Gauge(4)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 5--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 5 Display Name
 * @desc Gauge(5)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 5 References
 * @desc Gauge(5)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 5 Current
 * @desc Gauge(5)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 5 Max
 * @desc Gauge(5)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 5 Color1
 * @desc Gauge(5)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 5 Color2
 * @desc Gauge(5)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 6--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 6 Display Name
 * @desc Gauge(6)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 6 References
 * @desc Gauge(6)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 6 Current
 * @desc Gauge(6)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 6 Max
 * @desc Gauge(6)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 6 Color1
 * @desc Gauge(6)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 6 Color2
 * @desc Gauge(6)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 7--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 7 Display Name
 * @desc Gauge(7)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 7 References
 * @desc Gauge(7)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 7 Current
 * @desc Gauge(7)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 7 Max
 * @desc Gauge(7)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 7 Color1
 * @desc Gauge(7)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 7 Color2
 * @desc Gauge(7)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 8--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 8 Display Name
 * @desc Gauge(8)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 8 References
 * @desc Gauge(8)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 8 Current
 * @desc Gauge(8)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 8 Max
 * @desc Gauge(8)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 8 Color1
 * @desc Gauge(8)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 8 Color2
 * @desc Gauge(8)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param --Gauge Param 9--
 * @default
 * @parent customGauge
 * 
 * @param Gauge 9 Display Name
 * @desc Gauge(9)の表示名を設定します
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 9 References
 * @desc Gauge(9)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 9 Current
 * @desc Gauge(9)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 9 Max
 * @desc Gauge(9)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 9 Color1
 * @desc Gauge(9)のゲージの色1を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param Gauge 9 Color2
 * @desc Gauge(9)のゲージの色2を設定します。
 * @default 
 * @parent customGauge
 * 
 * @param paramName
 * @text --表示名の設定--
 * 
 * @param XPARAM Name
 * @desc 追加能力値の表示名を設定します。
 * @type struct<xparam>
 * @default {"hit":"命中率","eva":"回避率","cri":"会心率","cev":"会心回避率","mev":"魔法回避率","mrf":"魔法反射率","cnt":"反撃率","hrg":"HP再生率","mrg":"MP再生率","trg":"TP再生率"}
 * @parent paramName
 * 
 * @param SPARAM Name
 * @desc 特殊能力値の表示名を設定します。
 * @type struct<sparam>
 * @default {"tgr":"狙われ率","grd":"防御効果率","rec":"回復効果率","pha":"薬の知識","mcr":"MP消費率","tcr":"TPチャージ率","pdr":"物理ダメージ率","mdr":"魔法ダメージ率","fdr":"床ダメージ率","exr":"経験獲得率"}
 * @parent paramName
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインは、アクターのステータス表示のレイアウトをより詳細に設定できる
 * 処理を実装します。
 * 
 * このプラグインの拡張プラグイン(FTKR_CSS_***.js)と組み合わせることで
 * メニュー画面や、バトル画面などさまざまなステータス画面を設定できるように
 * なります。
 * 
 * このプラグインの v3.0.0 から採用するステータスごとの表示位置指定方式については、
 * 拡張プラグインの v2.0.0 以降を使用してください。
 * ※従来の方式についても、v1の拡張プラグインで使用可能
 * 
 * 
 * プラグインの使い方は、下のオンラインマニュアルページを見てください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_CustomSimpleActorStatus.ja.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、このプラグインを追加して
 *    ください。
 * 
 * 2. 拡張プラグイン(FTKR_CSS_***.js)と組み合わせる場合は、このプラグインが
 *    上になるように配置してください。
 * 
 * 3. GraphicalDesignMode.jsと組み合わせる場合は、
 *    このプラグインが下になるように配置してください。
 * 
 * 4. このプラグインを使う上で、設定が必須なプラグインパラメータはありません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスのもとで公開しています。
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
 * v3.5.3 - 2019/05/12 : 機能追加
 *    1. アイテムの所持数を表示するコード(numItem)を追加。
 *    2. 装備品の表示コード(equip(%1))に、ショップ画面用の専用処理を追加。
 * 
 * v3.5.2 - 2019/04/14 : 機能追加
 *    1. 特殊能力値(xparam)と追加能力値(sparam)を表示するコード他を追加。
 * 
 * v3.5.1 - 2019/03/05 : 不具合修正、機能追加
 *    1. 拡張プラグインのパラメータ"statusList"の"value"の値を正しく読み取れない
 *       不具合を修正。
 *    2. 選択中の装備品を装備できない時に特定も文字を表示させるコード notequip を
 *       追加。※装備画面とショップ画面で使用可能
 * 
 * v3.5.0 - 2018/12/29 : 機能追加
 *    1. セーブしたウィンドウ設定を変更するプラグインコマンドを追加。
 * 
 * v3.4.7 - 2018/12/27 : 不具合修正
 *    1. FTKR_CSS_ShopStatus v2.2.2 の不具合修正対応。
 *    2. FTKR_OriginalSceneWindow でアイテムデータ画像が表示できない不具合対応。
 * 
 * v3.4.6 - 2018/12/15 : 不具合修正(軽量化)
 *    1. カスタムパラメータとカスタムゲージの表示処理を見直し。
 *    2. プラグインコマンドの判定処理を見直し。
 * 
 * v3.4.5 - 2018/12/13 : 不具合修正(軽量化)
 *    1. code(x)の形のパラメータの判定時に必ずeval()で評価していた処理を見直し。
 * 
 * v3.4.4 - 2018/12/02 : 不具合修正
 *    1. カスタム画像で、存在しない画像IDを指定した場合にエラーになる不具合を修正。
 * 
 * v3.4.3 - 2018/11/03 : 仕様変更
 *    1. ediff(x)、aopdiff(x)、ediffaop(x)の表示内容の設定を、pdiff(x)から独立。
 * 
 * v3.4.2 - 2018/10/28 : 不具合修正
 *    1. オリジナルパラメータおよびオリジナルゲージの数値が、一部のシーンで正常に
 *       表示できない不具合を修正。
 * 
 * v3.4.1 - 2018/10/11 : 機能追加、仕様変更
 *    1. パラメータの差分表示に制御文字を無効にする機能を追加。
 *    2. パラメータの差分表示で 0 の場合に表示しないように変更。
 * 
 * v3.4.0 - 2018/10/10 : 機能追加
 *    1. ediff(x)およびediffaop(x)のコードをFTKR_CSS_ShopStatusから移動。
 * 
 * v3.3.4 - 2018/09/28 : 機能追加
 *    1. ステータスコードに、AOPパラメータ表示用のコードを追加。
 * 
 * v3.3.3 - 2018/09/28 : 機能追加
 *    1. ステータスコードに、パラメータ表示用のコードを追加。
 * 
 * v3.3.2 - 2018/09/19 : 機能追加
 *    1. ステータスコードに、アイテム用のコードを追加。
 * 
 * v3.3.1 - 2018/09/19 : 不具合修正
 *    1. 戦闘不能時に、ステートアイコンを表示しない不具合を修正。
 * 
 * v3.3.0 - 2018/09/15 : 機能追加
 *    1. ステータスコードに、アイテム用のコードを追加。
 *    2. ステータスアイコン同士間の余白サイズを設定する機能を追加。
 *    3. ステータスアイコンを高さ幅が不足しても最低１つは表示させるように変更。
 *    4. プラグインパラメータ Enable Auto Scale を有効にした場合に、表示幅が小さい
 *       場合でもサイズ調整するように変更。
 * 
 * v3.2.0 - 2018/09/11 : FTKR_GDM_WindowEditor.js 用の記述を修正。
 * 
 * v3.1.1 - 2018/09/09 : GraphicalDesignMode.js 用の記述を削除
 * 
 * v3.1.0 - 2018/08/30 : 機能追加
 *    1. 拡張プラグインのプラグインパラメータで表示するステータスをリストで
 *       選択できる機能を追加。
 * 
 * v3.0.2 - 2018/08/25 : 不具合修正
 *    1. 拡張プラグインで、余白と背景透明度を 0 に設定した場合に、設定が無効になる
 *       不具合を修正。
 * 
 * v3.0.1 - 2018/08/20 : 不具合修正
 *    1. 拡張プラグインでステータスウィンドウの設定を有効にした場合にエラーになる
 *       不具合を修正。
 * 
 * v3.0.0 - 2018/08/19 : 仕様変更
 *    1. ステータスの表示とパラメータの入力に、ステータスごとの表示位置指定方式を採用。
 *    2. FTKR_GDM_WindowEditor対応版に修正。
 *    3. ヘルプの記述を削減。
 *    4. 顔画像のサイズを調整する機能を追加。
 *    5. GraphicalDesignMode.jsとの連携機能を、FTKR_GDM_Editorに移行。
 * 
 * v2.7.2 - 2018/08/18 : 不具合修正
 *    1. 拡張プラグイン使用時にステートアイコンが表示されない不具合を修正。
 * 
 * v2.7.1 - 2018/08/17 : 不具合修正
 *    1. バトルシーンでステータスウィンドウが非表示でも、ステートアイコンが
 *       表示される不具合を修正。
 * 
 * v2.7.0 - 2018/03/17 : 機能追加
 *    1. カスタム画像をゲーム中に変更するプラグインコマンドを追加。
 * 
 * v2.6.3 - 2018/03/12 : 処理変更
 *    1. 顔画像やカスタム画像の表示透過度の判定部を関数として独立。
 *    2. コード処理部にアクターが設定されていない場合の例外処理を追加。
 * 
 * v2.6.2 - 2018/03/11 : 不具合修正
 *    1. 角括弧で設定したコードが正しく表示されない不具合を修正。
 *    2. デザインモード中にstateコードを変更した際に、ステートアイコンの表示が
 *       一部更新されない不具合を修正。
 * 
 * v2.6.1 - 2018/01/07 : 処理変更
 *    1. 顔画像、歩行キャラ、SVキャラのX座標方向の寄せ表示部分を関数として独立。
 * 
 * v2.6.0 - 2017/11/18 : 機能追加
 *    1. FTKR_CSS_***Status系の拡張プラグインをGraphicalDesignMode.jsに
 *       対応する処理を追加。
 * 
 * v2.5.1 - 2017/11/08 : 不具合修正
 *    1. FTKR_OriginalSceneWindow.jsで生成したウィンドウが有る場合に
 *       シーン開始時にエラーになる不具合を修正。
 * 
 * v2.5.0 - 2017/11/08 : 機能追加
 *    1. 横線を表示するコード「line」を追加。
 *    2. GraphicalDesignMode.jsとFTKR_CSS_GDM.jsにより、デザインモード中に
 *       ゲーム内でレイアウトを変更する機能を追加。
 * 
 * v2.4.3 - 2017/11/02 : 不具合修正
 *    1. 装備画面でフリーズする不具合を修正。
 * 
 * v2.4.2 - 2017/11/01 : 不具合修正
 *    1. カスタムパラメータとカスタムゲージで、名前が表示されない不具合を修正。
 *    2. 装備のパラメータが表示されない不具合を修正。
 * 
 * v2.4.1 - 2017/10/19 : 不具合修正
 *    1. カスタムパラメータとカスタムゲージで、アイコンを表示したときに
 *       表示位置がずれる場合がある不具合を修正。
 * 
 * v2.4.0 - 2017/10/16 : 仕様変更
 *    1. カスタムゲージで、現在値および最大値に文字列を表示できるように変更。
 * 
 * v2.3.0 - 2017/07/23 : 機能追加
 *    1. 表示コードの判定部の記述を見直し。
 *    2. 括弧で数値を指定する表示コードに対して、数値ではなくスクリプトで
 *       指定できるように修正。
 *    3. FTKR_AddOriginalParametersで作成したオリジナルパラメータの
 *       装備パラメータを表示するコード「eaop(x)」を追加。
 * 
 * v2.2.0 - 2017/06/19 : 機能変更、機能追加
 *    1. テキストコードに、JS計算式の評価処理を追加。
 *    2. JS計算式の評価コードで、文字列のまま表示する機能を追加。
 * 
 * v2.1.0 - 2017/06/19 : 機能変更、機能追加
 *    1. カスタム画像の設定仕様を変更。
 *    2. カスタム画像を複数設定できる機能を追加。
 * 
 * v2.0.0 - 2017/06/18 : メニュー画面の変更機能を分離
 * 
 * v1.8.0 - 2017/06/17 : 機能追加
 *    1. カスタムパラメータに単位を表示する機能を追加。
 * 
 * v1.7.6 - 2017/06/10 : 不具合修正
 *    1. YEP_BuffsStatesCore.jsと組み合わせた時にステートカウントの表示が
 *       正しく更新されない不具合を修正。
 * 
 * v1.7.5 - 2017/06/10 : 不具合修正
 *    1. テキストコードに制御文字を入力すると、正しく表示できない不具合を修正。
 * 
 * v1.7.4 - 2017/06/09 : YEP_BuffsStatesCore.jsに対応
 * 
 * v1.7.3 - 2017/06/08 : 機能追加
 *    1. ステートアイコンの表示処理をMVデフォルトに戻す機能を追加。
 * 
 * v1.7.2 - 2017/06/07 : 不具合修正、機能追加
 *    1. 波括弧による描画エリアの拡張が正しく機能しない不具合を修正。
 *    2. eval()によるJS計算結果を表示するコードを追加。
 * 
 * v1.7.1 - 2017/06/05 : 不具合修正、機能追加
 *    1. 歩行キャラが正しく表示されない不具合を修正。
 *    2. 歩行キャラの向きを、マップ上のプレイヤーに合わせる機能を追加。
 *    3. SVキャラのモーションを無効にする機能を追加。
 *    4. カスタム画像を表示する位置を調整する機能を追加。
 * 
 * v1.7.0 - 2017/06/02 : 機能追加、不具合修正
 *    1. アクター毎に個別に設定できるカスタムゲージを追加。
 *    2. クラス毎に個別に設定できるカスタムゲージを追加。
 *    3. プラグインパラメータ<Enabled Skill Status>を無効にした場合
 *       スキル画面のステータス欄が表示しない不具合を修正。
 * 
 * v1.6.0 - 2017/06/01 : 機能見直し、機能追加
 *    1. カスタムゲージの表示内容の調整機能を見直し。
 *    2. カスタムゲージのゲージバーを非表示にする機能を追加。
 *    3. カスタムゲージに現在値と最大値の替わりに指定した値を設定する機能を追加。
 * 
 * v1.5.3 - 2017/05/13 : 機能追加
 *    1. 装備画面で使用可能な、パラメータ表示コードを追加。
 * 
 * v1.5.2 - 2017/05/12 : 不具合修正、機能追加、不要なパラメータを削除
 *    1. アクターを横に並べたときに描画エリアを拡張すると、隣のアクターの
 *       表示エリアにも拡張される不具合を修正。
 *    2. 画像の表示位置の調整機能を追加。
 * 
 * v1.5.1 - 2017/05/11 : 不具合修正、機能追加
 *    1. ステータスウィンドウに表示できる人数よりもパーティーが少ない場合に
 *       エラーになる不具合を修正。
 *    2. 表示したSVキャラの位置を固定するように変更。
 * 
 * v1.5.0 - 2017/05/10 : 機能追加
 *    1. FTKR_FacialImageDifference.jsに対応。
 * 
 * v1.4.4 - 2017/05/08 : 不具合修正
 *    1. メニュー画面のアクターのスプライトが正しく更新されない不具合を修正。
 * 
 * v1.4.3 - 2017/05/06 : 不具合修正、機能追加
 *    1. アクターを横に並べた時に、顔画像が正しく表示されない不具合を修正。
 *    2. 縦のカーソル間隔を設定する機能を追加。
 * 
 * v1.4.2 - 2017/05/04 : 機能追加
 *    1. カスタムパラメータとカスタムゲージに、セルフ変数を適用。
 * 
 * v1.4.1 - 2017/04/25 : 不具合修正
 *    1. 「逃げる」でバトルを終了した場合、ステータス上のSVキャラの
 *       表示位置がずれる不具合を修正。
 * 
 * v1.4.0 - 2017/04/21 : 仕様変更、機能追加
 *    1. 詳細ステータス画面の表示変更機能を拡張プラグインとして分離。
 *    2. スキル画面の表示変更機能を拡張プラグインとして分離。
 *    3. 顔画像の表示仕様を変更。
 *    4. カスタム画像をタグの仕様を変更し、ディプロイメントでカスタム画像を
 *       保存するように変更。
 *    5. メニュー画面の簡易ステータスウィンドウの設定変更機能を追加。
 * 
 * v1.3.1 - 2017/04/21 : 機能追加
 *    1. FTKR_ExSvMotion.jsに対応。
 * 
 * v1.3.0 - 2017/04/19 : 機能変更
 *    1. ステートアイコンの表示仕様を変更。
 * 
 * v1.2.5 - 2017/04/15 : 機能追加
 *    1. ステートアイコンの表示位置を微調整
 *    2. 行の高さに合わせてステートアイコンサイズを自動調整する機能を追加。
 * 
 * v1.2.4 - 2017/04/12 : 顔画像の縦横のサイズを合わせるように修正
 * 
 * v1.2.3 - 2017/04/11 : ヘルプ修正
 * 
 * v1.2.2 - 2017/04/11 : 機能追加
 *    1. 指定した画像を表示する機能を追加。
 *    2. 複数列を跨いで表示させる機能を追加。
 *    3. ステートを縦に並べて表示させる機能を追加。
 * 
 * v1.2.1 - 2017/04/01 : 機能削除、機能追加
 *    1. ステータスのparam(x)に対してMV標準の制御文字を使用できる機能を削除。
 *    2. カスタムパラメータを20個まで設定できるように変更。
 *    3. 詳細ステータス画面の表示エリア間のラインの線色、太さ、透明度を
 *       変更する機能を追加。
 *    4. 簡易ステータス画面の表示内容を変更する機能をON/OFFする
 *       プラグインパラメータを追加。
 * 
 * v1.2.0 - 2017/03/20 : 仕様変更
 *    1. ステートアイコンを並べて表示した時に表示エリア内に収まらない場合、
 *       アイコンを重ねて表示するように変更。
 *    2. ステータスのprofile、param(x)、custom(x)、gauge(x)、text(x)の表示に、
 *       MV標準の制御文字を使用できるように変更。
 * 
 * v1.1.1 - 2017/03/18 : 機能追加
 *    1. 詳細ステータスの表示内容を変更する機能をON/OFFする
 *       プラグインパラメータを追加。
 *    2. FTKR_SEP_ShowSkillStatus.jsと組み合わせている場合、プロフィール文に
 *       制御文字を使用できるように変更。
 *    3. ヘルプ内容を修正。
 * 
 * v1.1.0 - 2017/03/17 : 仕様変更、機能追加、不具合修正
 *    1. Text間のスペースを設定するプラグインパラメータの仕様を変更。
 *    2. 装備と好きな文字列を表示させるパラメータを追加。
 *    3. 詳細ステータスの表示内容を変更する機能を追加。
 *    4. カスタムパラメータとカスタムゲージを10個まで設定できるように変更。
 *    5. ニックネームが表示されない不具合を修正。
 * 
 * v1.0.3 - 2017/03/16 : 機能追加
 *    1. 表示名や値の参照先を自由に設定できるカスタムゲージの表示機能を追加。
 * 
 * v1.0.2 - 2017/03/16 : 機能追加
 *    1. <Actor Status Text>で、1行に複数のステータスを表示する機能を追加。
 * 
 * v1.0.1 - 2017/03/10 : 機能追加
 *    1. 攻撃力や防御力等のパラメータを表示できる機能を追加。
 *    2. 表示名や値の参照先を自由に設定できるカスタムパラメータの
 *       表示機能を追加。
 * 
 * v1.0.0 - 2017/03/09 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================
/*~struct~status:
 * @param text
 * @desc 表示するステータスを選択
 * リストにない場合は、直接テキストで記述
 * @default 
 * @type select
 * @option 名前
 * @value name
 * @option 二つ名
 * @value nickname
 * @option 職業
 * @value class
 * @option レベル
 * @value level
 * @option HP
 * @value hp
 * @option MP
 * @value mp
 * @option TP
 * @value tp
 * @option 顔画像
 * @value face
 * @option 顔画像(サイズ指定)
 * @value face(%1)
 * @option 歩行キャラ画像
 * @value chara
 * @option SV戦闘キャラ画像
 * @value sv
 * @option ステート(横)
 * @value state
 * @option ステート(縦)
 * @value state2(%1)
 * @option プロフィール
 * @value profile
 * @option 通常能力値
 * @value param(%1)
 * @option 通常能力値(素)
 * @value pbase(%1)
 * @option 通常能力値(増加分)
 * @value pdiff(%1)
 * @option 追加能力値
 * @value xparam(%1)
 * @option 特殊能力値
 * @value sparam(%1)
 * @option 装備
 * @value equip(%1)
 * @option 装備通常能力値
 * @value eparam(%1)
 * @option 装備追加能力値
 * @value exparam(%1)
 * @option 装備特殊能力値
 * @value esparam(%1)
 * @option 装備通常能力値差分
 * @value ediff(%1)
 * @option 装備追加能力値差分
 * @value exdiff(%1)
 * @option 装備特殊能力値差分
 * @value esdiff(%1)
 * @option 装備不可表示
 * @value notequip(%1)
 * @option カスタムパラメータ
 * @value custom(%1)
 * @option カスタムゲージ
 * @value gauge(%1)
 * @option アクター別カスタムゲージ
 * @value agauge(%1)
 * @option クラス別カスタムゲージ
 * @value cgauge(%1)
 * @option カスタム画像
 * @value image
 * @option カスタム画像(登録ID)
 * @value image(%1)
 * @option メッセージ
 * @value message
 * @option テキスト
 * @value text(%1)
 * @option JS計算式(数値表示)
 * @value eval(%1)
 * @option JS計算式(文字列表示)
 * @value streval(%1)
 * @option 横線
 * @value line
 * @option AOP能力値
 * @value aop(%1)
 * @option AOP能力値(素)
 * @value aopbase(%1)
 * @option AOP能力値(増加分)
 * @value aopdiff(%1)
 * @option AOP装備パラメータ
 * @value eaop(%1)
 * @option AOP装備パラメータ差分
 * @value ediffaop(%1)
 * @option アイテム名
 * @value iname
 * @option アイテムアイコン
 * @value iicon
 * @option アイテム説明
 * @value idesc
 * @option アイテムタイプ
 * @value itype
 * @option アイテム装備タイプ
 * @value ietype
 * @option アイテム範囲
 * @value iscope
 * @option アイテム属性
 * @value ielement
 * @option アイテム設定詳細
 * @value iparam(%1)
 * @option アイテムカスタム画像
 * @value iimage(%1)
 * @option アイテム所持数
 * @value inumber
 * @option マップ名
 * @value mapname
 *
 * @param value
 * @desc code(%1)の形式で設定するステータスの%1の内容を入力
 * @default 
 * 
 * @param x
 * @desc 表示するX座標
 * @default 0
 *
 * @param y
 * @desc 表示するY座標
 * @default 0
 *
 * @param width
 * @desc 表示する幅
 * @default 0
 *
 */
/*~struct~xparam:
 *
 * @param hit
 * @desc 命中率の表示名
 * @default 命中率
 *
 * @param eva
 * @desc 回避率の表示名
 * @default 回避率
 *
 * @param cri
 * @desc 会心率の表示名
 * @default 会心率
 *
 * @param cev
 * @desc 会心回避率の表示名
 * @default 会心回避率
 *
 * @param mev
 * @desc 魔法回避率の表示名
 * @default 魔法回避率
 *
 * @param mrf
 * @desc 魔法反射率の表示名
 * @default 魔法反射率
 *
 * @param cnt
 * @desc 反撃率の表示名
 * @default 反撃率
 *
 * @param hrg
 * @desc HP再生率の表示名
 * @default HP再生率
 *
 * @param mrg
 * @desc MP再生率の表示名
 * @default MP再生率
 *
 * @param trg
 * @desc TP再生率の表示名
 * @default TP再生率
 *
 */
/*~struct~sparam:
 *
 * @param tgr
 * @desc 狙われ率の表示名
 * @default 狙われ率
 *
 * @param grd
 * @desc 防御効果率の表示名
 * @default 防御効果率
 *
 * @param rec
 * @desc 回復効果率の表示名
 * @default 回復効果率
 *
 * @param pha
 * @desc 薬の知識の表示名
 * @default 薬の知識
 *
 * @param mcr
 * @desc MP消費率の表示名
 * @default MP消費率
 *
 * @param tcr
 * @desc TPチャージ率の表示名
 * @default TPチャージ率
 *
 * @param pdr
 * @desc 物理ダメージ率の表示名
 * @default 物理ダメージ率
 *
 * @param mdr
 * @desc 魔法ダメージ率の表示名
 * @default 魔法ダメージ率
 *
 * @param fdr
 * @desc 床ダメージ率の表示名
 * @default 床ダメージ率
 *
 * @param exr
 * @desc 経験獲得率の表示名
 * @default 経験獲得率
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
    var parameters = PluginManager.parameters('FTKR_CustomSimpleActorStatus');

    //オリジナルステータス設定オブジェクト
    FTKR.CSS.cssStatus = {
        face:{
            width:Number(parameters['Face Image Width'] || 0),
            height:Number(parameters['Face Image Height'] || 0),
            posiX:Number(parameters['Face Position X'] || 0),
        },
        chara:{
            width:Number(parameters['Chara Image Width'] || 0),
            height:Number(parameters['Chara Image Height'] || 0),
            posiX:Number(parameters['Chara Position X'] || 0),
            direction:Number(parameters['Chara Direction'] || 0),
        },
        svChara:{
            width:Number(parameters['Sv Image Width'] || 0),
            height:Number(parameters['Sv Image Height'] || 0),
            enable:Number(parameters['Enabled Sv Motion'] || 0),
            motion:String(parameters['Sv Image Motion'] || ''),
            state:Number(parameters['Enabled State Motion'] || 0),
            posiX:Number(parameters['Sv Position X'] || 0),
        },
        state:{
            enable      :Number(parameters['Enable CSS States'] || 0),
            wait        :Number(parameters['Animation Wait'] || 0),
            overlap     :Number(parameters['Enable Overlap'] || 0),
            autoScale   :Number(parameters['Enable Auto Scale'] || 0),
            rate        :Number(parameters['Overlap Rate'] || 0),
            iconPadding :Number(parameters['State Icon Padding'] || 0),
        },
        param:{
            decimals    :paramParse(parameters['Disp Decimals Param']),
        },
        pdiff:{
            plus        :paramParse(parameters['Format PDIFF Plus']),
            minus       :paramParse(parameters['Format PDIFF Minus']),
            enabledEc   :paramParse(parameters['Enabled Escapecharacters By PDIFF']),
        },
        equip:{
            arrow:String(parameters['Equip Right Arrow'] || ''),
        },
        ediff:{
            plus        :paramParse(parameters['Format EDIFF Plus']),
            minus       :paramParse(parameters['Format EDIFF Minus']),
            enabledEc   :paramParse(parameters['Enabled Escapecharacters By EDIFF']),
        },
        aopdiff:{
            plus        :paramParse(parameters['Format AOPDIFF Plus']),
            minus       :paramParse(parameters['Format AOPDIFF Minus']),
            enabledEc   :paramParse(parameters['Enabled Escapecharacters By AOPDIFF']),
        },
        ediffaop:{
            plus        :paramParse(parameters['Format EDIFFAOP Plus']),
            minus       :paramParse(parameters['Format EDIFFAOP Minus']),
            enabledEc   :paramParse(parameters['Enabled Escapecharacters By EDIFFAOP']),
        },
        gauge:{
            digit :Number(parameters['Gauge Param Digit'] || 0),
        },
        image:{
            posiX:Number(parameters['Image Position X'] || 0),
        },
        message:{
            levelUp:String(parameters['Display LevelUp Message'] || ''),
        },
        customs:[
            {name:String(parameters['Custom 0 Display Name'] || ''),
              unit:String(parameters['Custom 0 Unit'] || ''),
              formula:String(parameters['Custom 0 References'] || ''),},
            {name:String(parameters['Custom 1 Display Name'] || ''),
              unit:String(parameters['Custom 1 Unit'] || ''),
              formula:String(parameters['Custom 1 References'] || ''),},
            {name:String(parameters['Custom 2 Display Name'] || ''),
              unit:String(parameters['Custom 2 Unit'] || ''),
              formula:String(parameters['Custom 2 References'] || ''),},
            {name:String(parameters['Custom 3 Display Name'] || ''),
              unit:String(parameters['Custom 3 Unit'] || ''),
              formula:String(parameters['Custom 3 References'] || ''),},
            {name:String(parameters['Custom 4 Display Name'] || ''),
              unit:String(parameters['Custom 4 Unit'] || ''),
              formula:String(parameters['Custom 4 References'] || ''),},
            {name:String(parameters['Custom 5 Display Name'] || ''),
              unit:String(parameters['Custom 5 Unit'] || ''),
              formula:String(parameters['Custom 5 References'] || ''),},
            {name:String(parameters['Custom 6 Display Name'] || ''),
              unit:String(parameters['Custom 6 Unit'] || ''),
              formula:String(parameters['Custom 6 References'] || ''),},
            {name:String(parameters['Custom 7 Display Name'] || ''),
              unit:String(parameters['Custom 7 Unit'] || ''),
              formula:String(parameters['Custom 7 References'] || ''),},
            {name:String(parameters['Custom 8 Display Name'] || ''),
              unit:String(parameters['Custom 8 Unit'] || ''),
              formula:String(parameters['Custom 8 References'] || ''),},
            {name:String(parameters['Custom 9 Display Name'] || ''),
              unit:String(parameters['Custom 9 Unit'] || ''),
              formula:String(parameters['Custom 9 References'] || ''),},
            {name:String(parameters['Custom 10 Display Name'] || ''),
              unit:String(parameters['Custom 10 Unit'] || ''),
              formula:String(parameters['Custom 10 References'] || ''),},
            {name:String(parameters['Custom 11 Display Name'] || ''),
              unit:String(parameters['Custom 11 Unit'] || ''),
              formula:String(parameters['Custom 11 References'] || ''),},
            {name:String(parameters['Custom 12 Display Name'] || ''),
              unit:String(parameters['Custom 12 Unit'] || ''),
              formula:String(parameters['Custom 12 References'] || ''),},
            {name:String(parameters['Custom 13 Display Name'] || ''),
              unit:String(parameters['Custom 13 Unit'] || ''),
              formula:String(parameters['Custom 13 References'] || ''),},
            {name:String(parameters['Custom 14 Display Name'] || ''),
              unit:String(parameters['Custom 14 Unit'] || ''),
              formula:String(parameters['Custom 14 References'] || ''),},
            {name:String(parameters['Custom 15 Display Name'] || ''),
              unit:String(parameters['Custom 15 Unit'] || ''),
              formula:String(parameters['Custom 15 References'] || ''),},
            {name:String(parameters['Custom 16 Display Name'] || ''),
              unit:String(parameters['Custom 16 Unit'] || ''),
              formula:String(parameters['Custom 16 References'] || ''),},
            {name:String(parameters['Custom 17 Display Name'] || ''),
              unit:String(parameters['Custom 17 Unit'] || ''),
              formula:String(parameters['Custom 17 References'] || ''),},
            {name:String(parameters['Custom 18 Display Name'] || ''),
              unit:String(parameters['Custom 18 Unit'] || ''),
              formula:String(parameters['Custom 18 References'] || ''),},
            {name:String(parameters['Custom 19 Display Name'] || ''),
              unit:String(parameters['Custom 19 Unit'] || ''),
              formula:String(parameters['Custom 19 References'] || ''),},
        ],
        gauges:[
            {name:String(parameters['Gauge 0 Display Name'] || ''),
              ref:String(parameters['Gauge 0 References'] || ''),
              current:String(parameters['Gauge 0 Current'] || ''),
              max:String(parameters['Gauge 0 Max'] || ''),
              color1:Number(parameters['Gauge 0 Color1'] || 0),
              color2:Number(parameters['Gauge 0 Color2'] || 0),},
            {name:String(parameters['Gauge 1 Display Name'] || ''),
              ref:String(parameters['Gauge 1 References'] || ''),
              current:String(parameters['Gauge 1 Current'] || ''),
              max:String(parameters['Gauge 1 Max'] || ''),
              color1:Number(parameters['Gauge 1 Color1'] || 0),
              color2:Number(parameters['Gauge 1 Color2'] || 0),},
            {name:String(parameters['Gauge 2 Display Name'] || ''),
              ref:String(parameters['Gauge 2 References'] || ''),
              current:String(parameters['Gauge 2 Current'] || ''),
              max:String(parameters['Gauge 2 Max'] || ''),
              color1:Number(parameters['Gauge 2 Color1'] || 0),
              color2:Number(parameters['Gauge 2 Color2'] || 0),},
            {name:String(parameters['Gauge 3 Display Name'] || ''),
              ref:String(parameters['Gauge 3 References'] || ''),
              current:String(parameters['Gauge 3 Current'] || ''),
              max:String(parameters['Gauge 3 Max'] || ''),
              color1:Number(parameters['Gauge 3 Color1'] || 0),
              color2:Number(parameters['Gauge 3 Color2'] || 0),},
            {name:String(parameters['Gauge 4 Display Name'] || ''),
              ref:String(parameters['Gauge 4 References'] || ''),
              current:String(parameters['Gauge 4 Current'] || ''),
              max:String(parameters['Gauge 4 Max'] || ''),
              color1:Number(parameters['Gauge 4 Color1'] || 0),
              color2:Number(parameters['Gauge 4 Color2'] || 0),},
            {name:String(parameters['Gauge 5 Display Name'] || ''),
              ref:String(parameters['Gauge 5 References'] || ''),
              current:String(parameters['Gauge 5 Current'] || ''),
              max:String(parameters['Gauge 5 Max'] || ''),
              color1:Number(parameters['Gauge 5 Color1'] || 0),
              color2:Number(parameters['Gauge 5 Color2'] || 0),},
            {name:String(parameters['Gauge 6 Display Name'] || ''),
              ref:String(parameters['Gauge 6 References'] || ''),
              current:String(parameters['Gauge 6 Current'] || ''),
              max:String(parameters['Gauge 6 Max'] || ''),
              color1:Number(parameters['Gauge 6 Color1'] || 0),
              color2:Number(parameters['Gauge 6 Color2'] || 0),},
            {name:String(parameters['Gauge 7 Display Name'] || ''),
              ref:String(parameters['Gauge 7 References'] || ''),
              current:String(parameters['Gauge 7 Current'] || ''),
              max:String(parameters['Gauge 7 Max'] || ''),
              color1:Number(parameters['Gauge 7 Color1'] || 0),
              color2:Number(parameters['Gauge 7 Color2'] || 0),},
            {name:String(parameters['Gauge 8 Display Name'] || ''),
              ref:String(parameters['Gauge 8 References'] || ''),
              current:String(parameters['Gauge 8 Current'] || ''),
              max:String(parameters['Gauge 8 Max'] || ''),
              color1:Number(parameters['Gauge 8 Color1'] || 0),
              color2:Number(parameters['Gauge 8 Color2'] || 0),},
            {name:String(parameters['Gauge 9 Display Name'] || ''),
              ref:String(parameters['Gauge 9 References'] || ''),
              current:String(parameters['Gauge 9 Current'] || ''),
              max:String(parameters['Gauge 9 Max'] || ''),
              color1:Number(parameters['Gauge 9 Color1'] || 0),
              color2:Number(parameters['Gauge 9 Color2'] || 0),},
        ],
    };

    var xparamName = paramParse(parameters['XPARAM Name']);
    if (xparamName) {
        FTKR.CSS.cssStatus.xparam = Object.entries(xparamName).map(function(obj){return obj[1];});
    } else {
        console.error('プラグインパラメータ XPARAM Name が設定されていません。');
        return;
    }
    var sparamName = paramParse(parameters['SPARAM Name']);
    if (sparamName) {
        FTKR.CSS.cssStatus.sparam = Object.entries(sparamName).map(function(obj){return obj[1];});
    } else {
        console.error('プラグインパラメータ SPARAM Name が設定されていません。');
        return;
    }

    //SV戦闘キャラ用の影画像の高さ
    Window_Base.SV_SHADOW_HEIGHT = 48;

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

    if (!FTKR.evalStrFormula) {
    FTKR.evalStrFormula = function(formula) {
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
            return value;
        } catch (e) {
            return formula;
        }
    };
    }

    //=============================================================================
    // 自作処理
    //=============================================================================

    // <codeTitle:id>text</codeTitle>の形式のメタデータを読み取って{id,text}を返す
    var readEntrapmentCodeToTextEx = function(obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
                    id:RegExp.$1,
                    text:''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertEntrapmentRegArrayEx = function(codeTitles) {
        return codeTitles.map(function(codeTitle) {
            return {
                start:new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end  :new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function(data, regs, prop) {
        return regs.some(function(reg){
            return prop ? data.match(reg[prop]) : data.match(reg);
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

    // 配列の要素の合計
    Math.sam = function(arr) {
        return arr.reduce( function(prev, current, i, arr) {
            return prev + current;
        });
    };

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

    Number.prototype._getDec = function() {
        var list = (this + '').split('.');
        return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
    };

    // 少数で表現された数値をパーセント表示の数値に変換する (例:0.5 を 50 に変換)
    Number.prototype.percent = function(dec) {
        dec = dec || 0;
        var decnum = this._getDec();
        var int = +(this + '').replace('.', '');
        var diffdec = 2 + dec - decnum;
        return Math.floor(int * Math.pow(10, diffdec)) / Math.pow(10, dec);
    }

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function() {
      return this.map(function(elm) {
          return Number(elm);
      });
    }

    //=============================================================================
    // バトル終了後に、逃走フラグを削除
    //=============================================================================

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        BattleManager._escaped = false;
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _DatabaseLoaded = false;
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_DatabaseLoaded) {
            this.cssActorImageNotetags($dataActors);
            this.cssActorImageNotetags($dataItems);
            this.cssActorImageNotetags($dataWeapons);
            this.cssActorImageNotetags($dataArmors);
            this.cssCustomParamNotetags($dataActors);
            this.cssCustomParamNotetags($dataClasses);
            _DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.cssActorImageNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.cssbgi = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['CSS_画像', 'CSS_IMAGE']);
            if (datas.length) this.readCssBgiMetaDatas(obj, datas);
        }
    };

    DataManager.setCssBgiBase = function(obj, index, name) {
        obj.cssbgi[index] = {
            name    :name,
            offsetX :0,
            offsetY :0,
            width   :0,
            height  :0,
            scale   :100,
        };
    };

    DataManager.readCssBgiMetaDatas = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            this.setCssBgiBase(obj, t, metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /(.+):[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case 'BGI OFFSET X':
                        obj.cssbgi[t].offsetX = Number(match[2]);
                        break;
                    case 'BGI OFFSET Y':
                      obj.cssbgi[t].offsetY = Number(match[2]);
                        break;
                    case 'BGI WIDTH':
                        obj.cssbgi[t].width = Number(match[2]);
                        break;
                    case 'BGI HEIGHT':
                        obj.cssbgi[t].height = Number(match[2]);
                        break;
                    case 'BGI SCALE':
                        obj.cssbgi[t].scale = Number(match[2]);
                        break;
                }
            }
        }
    };

    DataManager.cssCustomParamNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.cssGauges = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['CSS_カスタム', 'CSS_CUSTOM']);
            this.readCssCustomParamMetaDatas(obj, datas);
        }
    };

    DataManager.readCssCustomParamMetaDatas = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            var dataId = Number(metaDatas[t].id);
            obj.cssGauges[dataId] = {};

            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /(.+):[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case 'NAME':
                    case '表示名':
                        obj.cssGauges[dataId].name = match[2];
                        break;
                    case 'REFERENCES':
                    case '参照先':
                        obj.cssGauges[dataId].ref = match[2];
                        break;
                    case 'CURRENT':
                    case '現在値':
                        obj.cssGauges[dataId].current = match[2];
                        break;
                    case 'MAX':
                    case '最大値':
                        obj.cssGauges[dataId].max = match[2];
                        break;
                    case 'COLOR':
                    case '色':
                        var colors = match[2].replace(/\s/g,'').split(',');
                        obj.cssGauges[dataId].color1 = Number(colors[0]);
                        obj.cssGauges[dataId].color2 = colors[1] ? Number(colors[1]) : Number(colors[0]);
                        break;
                }
            }
        }
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _CSS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        switch (command.toUpperCase()) {
            case 'CSS_カスタム画像変更':
            case 'CSS_CHANGE_CUSTOM_IMAGE':
                this.cssChangeCustomImage(args);
                break;
            case 'CSS_ウィンドウ設定変更':
            case 'CSS_CHANGE_WINDOW_SETTING':
                this.cssChangeWindowSetting(args);
                break;
            default:
                _CSS_Game_Interpreter_pluginCommand.call(this, command, args);
                break;
        }
    };

    Game_Interpreter.prototype.cssChangeCustomImage = function(args) {
        switch (setArgStr(args[0]).toUpperCase()) {
            case 'アクター':
            case 'ACTOR':
                var actor = $gameActors.actor(setArgNum(args[1]));
                break;
            case 'パーティー':
            case 'PARTY':
                var actor = $gameParty.members()[setArgNum(args[1])];
                break;
            default : 
                return;
        }
        if (!actor) return;
        actor.setupCssbgi(
            setArgNum(args[2]),
            setArgStr(args[3]),
            setArgNum(args[4]),
            setArgNum(args[5]),
            setArgNum(args[6]),
            setArgNum(args[7]),
            setArgNum(args[8])
        );
    };

    Game_Interpreter.prototype.cssChangeWindowSetting = function(args) {
        switch(setArgStr(args[0].toUpperCase())) {
            case 'バトル':
            case 'BATTLE':
                this.cssChangeWindowSettingParam($gameSystem._cssBattleWindow, args);
                return;
            default:
                return;
        }
    };

    Game_Interpreter.prototype.cssChangeWindowSettingParam = function(param, args) {
        if (!param) return;
        switch(setArgStr(args[1].toUpperCase())) {
            case 'ENABLED':
            case 'カスタム機能':
                param.enabled = Boolean(setArgStr(args[2]));
                break;
            case 'NUMVISIBLEROUS':
            case '表示行数':
                param.numVisibleRows = setArgNum(args[2]);
                break;
            case 'FONTSIZE':
            case 'フォントサイズ':
                param.fontSize = setArgNum(args[2]);
                break;
            case 'PADDING':
            case '余白':
                param.padding = setArgNum(args[2]);
                break;
            case 'LINEHEIGHT':
            case '行高さ':
                param.lineHeight = setArgNum(args[2]);
                break;
            case 'OPACITY':
            case '背景透明度':
                param.opacity = setArgNum(args[2]);
                break;
            case 'HIDEFRAME':
            case '枠非表示':
                param.hideFrame = Boolean(setArgStr(args[2]));
                break;
            case 'MAXCOLS':
            case '表示列数':
                param.maxCols = setArgNum(args[2]);
                break;
            case 'CURSORHEIGHT':
            case 'カーソル行数':
                param.cursorHeight = setArgNum(args[2]);
                break;
            case 'HSPACE':
            case '表示行間隔':
                param.hspace = setArgNum(args[2]);
                break;
            default:
                break;
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        if (!this._levelUpCount) this._levelUpCount = 0;
        this._levelUpCount += 1;
    };

    var _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        ImageManager.loadFace(this.faceName());
        this.actor().cssbgi.forEach( function(bgi){
            if (bgi) ImageManager.loadPicture(bgi.name);
        });
        this._cssbgi = this.actor().cssbgi.filter(function(bgi){
            return bgi && bgi.name;
        });
        ImageManager.loadSvActor(this.battlerName());
    };

    Game_Actor.prototype.cssbgi = function(imageId) {
        return this._cssbgi[imageId];
    };

    Game_Actor.prototype.setupCssbgi = function(imageId, name, x, y, width, height, scale) {
        var bgi = this._cssbgi[imageId];
        bgi = {
            name    : name || bgi.name,
            offsetX : x >= 0 ? x : bgi.offsetX,
            offsetY : y >= 0 ? y : bgi.offsetY,
            width   : width >= 0 ? width : bgi.width,
            height  : height >= 0 ? height : bgi.height,
            scale   : scale >= 0 ? scale : bgi.scale,
        };
        this._cssbgi[imageId] = bgi;
    };

    //ステートモーションを取得する
    Game_Actor.prototype.getStateMotion = function() {
        if(Imported.FTKR_ESM) {
            return this.getEsmMotion();
        } else {
            switch (this.stateMotionIndex()) {
                case 1: return 'abnormal';
                case 2: return 'sleep';
                case 3: return 'dead';
            }
            return '';
        }
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    var _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _Window_Base_initialize.call(this, x, y, width, height);
        this.sprite = [];
        this._stateIconSprite = [];
        this._faceSprite = [];
    };

    Window_Base.prototype.clearCssSprite = function(index) {
        if (this.sprite && this.sprite[index]) {
            this.sprite[index].setBattler();
        }
        if (this._stateIconSprite && this._stateIconSprite[index]) {
            this._stateIconSprite[index].forEach( function(sprite){
                sprite.setup(null);
            });
        }
    };

    Window_Base.prototype.clearItem = function(index) {
        this.clearCssSprite(index);
    };

    var _CSS_Window_Selectable_clearItem = Window_Selectable.prototype.clearItem;
    Window_Selectable.prototype.clearItem = function(index) {
        _CSS_Window_Selectable_clearItem.call(this, index);
        Window_Base.prototype.clearItem.call(this, index);
    };

    Window_Base.prototype.showActorNum = function() {
        return this.maxPageItems ? this.maxPageItems() : 1;
    };

    Window_Base.prototype.convertCssNumber = function(actor, value) {
        if (!value) return 0;
        if (!isNaN(value)) {
            return Number(value);
        }
        return Number(this.evalCssCustomFormula(actor, value));
    };

    Window_Base.prototype.evalCssCustomFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor);
        return FTKR.evalFormula(formula);
    };

    Window_Base.prototype.evalCssStrFormula = function(actor, formula) {
        if (!formula) return '';
        FTKR.setGameData(actor);
        return FTKR.evalStrFormula(formula);
    };

    Window_Base.prototype.isEnabledChangePaintOpacity = function(actor) {
        return actor && actor.isBattleMember();
    };

    //制御文字を考慮して入力したテキスト長を求める
    Window_Base.prototype.convertTextWidth = function(text) {
        var textObj = { text : text, width : 0 };
        textObj.text = this.convertEscapeCharacters(textObj.text);
        this.convertEscapeCharactersTextWidth(textObj);
        textObj.width += this.textWidth(textObj.text);
        return textObj.width;
    };

    Window_Base.prototype.convertEscapeCharactersTextWidth = function(obj) {
        var reg = /i\[(\d+)\]/i;
        while (reg.test(obj.text)) {
            obj.text = (conv.toUpperCase()).replace(reg, '');
            obj.width += Window_Base._iconWidth + 4;
        }
        reg = /c\[(\d+)\]/i;
        while (reg.test(obj.text)) {
            obj.text = (obj.text.toUpperCase()).replace(reg, '');
        }
        reg = /lw\[(\d+),?([^\]]+)\]/i;
        var result;
        while (result = reg.exec(obj.text)) {
            obj.width += Number(result[1]);
            obj.text = (obj.text.toUpperCase()).replace(reg, '');
        }
        return obj;
    };

    /*-------------------------------------------------------------
    アクターの簡易ステータスを表示する関数
    drawCssActorStatus(index, actor, x, y, width, height, lss)
    index :アクターの表示番号
    actor :アクターオブジェクト
    x     :x座標
    y     :y座標
    width :表示エリアの幅
    height:表示エリアの高さ
    lss   :簡易ステータスオブジェクト
    -------------------------------------------------------------*/
    Window_Base.prototype.drawCssActorStatus = function(index, actor, x, y, width, height, lss) {
        if (lss && lss.statusList) {
            lss.statusList.forEach(function(status){
                this.drawCssActorStatusText(index, actor, x, y, width, height, status, lss);
            },this);
        } else {
            this.drawCssActorStatus_v2(index, actor, x, y, width, height, lss);
        }
    };

    Window_Base.prototype.drawCssActorStatus_v2 = function(index, actor, x, y, width, height, lss) {
        if (!lss) lss = {};
        var w = width;
        var h = height;
        var wrs = lss.widthRate.split(',').num();
        var spc = lss.space.split(',').num();
        this._dispWidth = width - spc[0] - spc[3];
        var aws = [];
        var axs = [];
        var status = [lss.text1.split(','), lss.text2.split(','), lss.text3.split(',')];
        for (var i = 0; i < 3; i++) {
            aws[i] = (w - Math.sam(spc)) * wrs[i] / Math.sam(wrs);
            axs[i] = i > 0 ? axs[i-1] + aws[i-1] + spc[i]: x + spc[0];
            this.drawCssActorStatusText(index, actor, axs[i], y, aws[i], height, status[i], lss);
            this._dispWidth -= aws[i] + spc[i+1];
        }
    };

    /*-------------------------------------------------------------
    描画エリアを表示する関数
    drawCssActorStatusText(index, actor, x, y, width, statusnames, lss)
    index       :アクターの表示番号
    actor       :アクターオブジェクト
    x           :描画エリアのx座標
    y           :描画エリアのy座標
    width       :描画エリアの幅
    statusnames :描画エリアの表示コードの配列
    lss         :簡易ステータスオブジェクト
    -------------------------------------------------------------*/
    Window_Base.prototype.drawCssActorStatusText = function(index, actor, x, y, width, height, status, lss) {
        if (lss && lss.statusList) {
            var dx = this.parseIntCssStatus(status.x, x, y, width, height);
            var dy = this.parseIntCssStatus(status.y, x, y, width, height);
            var dw = this.parseIntCssStatus(status.width, x, y, width, height);
            dw = dw < 0 ? width - x - dx : Math.min(dw, width);
            var text = status.text;
            if (/([^\(]+)\(\%1\)/i.test(status.text)) {
                text = text.format(status.value);
            }
            this.drawCssActorStatusBases(index, actor, x + dx, y + dy, dw, text, lss);
        } else {
            this.drawCssActorStatusText_v2(index, actor, x, y, width, height, status, lss);
        }
    };

    Window_Base.prototype.parseIntCssStatus = function(value, x, y, width, height) {
        if (!isNaN(value)) {
            return parseInt(value);
        } else {
            var line = this.lineHeight();
            return eval(value);
        }
    };

    Window_Base.prototype.drawCssActorStatusText_v2 = function(index, actor, x, y, width, height, statusnames, lss) {
        var dy = this.lineHeight();
        var line = 0;
        statusnames.forEach( function(status) {
            line += this.drawCssActorStatusBases(index, actor, x, y + dy * line, width, status, lss);
        },this);
    };

    Window_Base.prototype.drawCssActorStatusBases = function(index, actor, x, y, width, status, lss) {
        if (lss && lss.statusList) {
            var match = status.match(/^\[(.+)\]$/);
            var statuses = !match ? [status] : match[1].split('/');
            var len = statuses.length;
            var sIn = Number(lss.spaceIn);
            if (len > 1) width = (width - sIn * (len - 1))/ len;
            statuses.forEach( function(element, i) {
                var dx = (width + sIn) * i;
                this.drawCssActorStatusBase(index, actor, x + dx, y, width, element, lss);
            },this);
        } else {
            return this.drawCssActorStatusBases_v2(index, actor, x, y, width, status, lss);
        }
    };

    Window_Base.prototype.drawCssActorStatusBases_v2 = function(index, actor, x, y, width, status, lss) {
        var matchA = status.match(/^\{(.+)\}$/);
        if (matchA) {
            status = matchA[1];
            width = this._dispWidth;
        }
        var matchB = status.match(/^\[(.+)\]$/);
        var statuses = !matchB ? [status] : matchB[1].split('/');
        var line = 0;
        var len = statuses.length;
        var sIn = Number(lss.spaceIn);
        if (len > 1) width = (width - sIn * (len - 1))/ len;
        statuses.forEach( function(element, i) {
            var dx = (width + sIn) * i;
            line = Math.max(this.drawCssActorStatusBase(index, actor, x + dx, y, width, element, lss), line);
        },this);
        return line;
    };

    /*-------------------------------------------------------------
    表示コードを判定する関数
    drawCssActorStatusBase(index, actor, x, y, width, status, lss)
    index       :アクターの表示番号
    actor       :アクターオブジェクト
    x           :描画エリアのx座標
    y           :描画エリアのy座標
    width       :描画エリアの幅
    status    　:描画する表示コード
    lss         :簡易ステータスオブジェクト
    -------------------------------------------------------------*/
    Window_Base.prototype.drawCssActorStatusBase = function(index, actor, x, y, width, status, lss) {
        var css = FTKR.CSS.cssStatus;
        var match = status.match(/([^\(]+)\((.+)\)/);
        if (match) {
            return this.drawCssActorStatusBase_A(index, actor, x, y, width, match, lss, css);
        } else {
            return this.drawCssActorStatusBase_B(index, actor, x, y, width, status, lss, css);
        }
    };

    // 括弧で表示する内容を指定する表示コード
    Window_Base.prototype.drawCssActorStatusBase_A = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'IPARAM':
                return this.drawCssItemParam(actor, x, y, width, match[2], lss);
            case 'STREVAL':
                return this.drawCssEval(actor, x, y, width, match[2], false);
            case 'EVAL':
                return this.drawCssEval(actor, x, y, width, match[2], true);
            case 'TEXT':
                return this.drawCssText(actor, x, y, width, match[2]);
            case 'NOTEQUIP':
                return this.drawCssCannotEquip(actor, x, y, width, match[2], lss);
            case 'EQUIP':
                return this.drawCssActorEquip(actor, x, y, width, match[2], lss);
            default:
//                if (!actor) return 1;
                FTKR.setGameData(actor, lss.target, lss.item);
                match[2] = this.convertCssNumber(actor, match[2]);
                return this.drawCssActorStatusBase_A1(index, actor, x, y, width, match, lss, css);
        }
    };

    // 括弧で表示する内容を指定する表示コード(括弧内をevalで計算させる場合)
    Window_Base.prototype.drawCssActorStatusBase_A1 = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'EDIFFAOP':
                return this.drawCssActorEquipAopDiff(actor, x, y, width, match[2], lss);
            case 'EXDIFF':
                return this.drawCssActorEquipXPDiff(actor, x, y, width, match[2], lss);
            case 'ESDIFF':
                return this.drawCssActorEquipSPDiff(actor, x, y, width, match[2], lss);
            case 'EDIFF':
                return this.drawCssActorEquipDiff(actor, x, y, width, match[2], lss);
            case 'AOPDIFF':
                return this.drawCssActorAopParamDiff(actor, x, y, width, match[2], lss);
            case 'AOPBASE':
                return this.drawCssActorAopParamBase(actor, x, y, width, match[2], lss);
            case 'PDIFF':
                return this.drawCssActorParamDiff(actor, x, y, width, match[2], lss);
            case 'PBASE':
                return this.drawCssActorParamBase(actor, x, y, width, match[2], lss);
            case 'IIMAGE':
                return this.drawCssItemImage(actor, x, y, width, match[2], lss);
            case 'EXPARAM':
                return this.drawCssActorEquipXParam(actor, x, y, width, match[2], lss);
            case 'ESPARAM':
                return this.drawCssActorEquipSParam(actor, x, y, width, match[2], lss);
            case 'EPARAM':
                return this.drawCssActorEquipParam(actor, x, y, width, match[2], lss);
            case 'EAOP':
                return this.drawCssActorEquipAopParam(actor, x, y, width, match[2], lss);
            case 'AOP':
                return this.drawCssActorAopParam(actor, x, y, width, match[2], lss);
            case 'AGAUGE':
                return this.drawCssActorCustomGauge(actor, x, y, width, match[2]);
            case 'CGAUGE':
                return this.drawCssClassCustomGauge(actor, x, y, width, match[2]);
            case 'XPARAM':
                return this.drawCssActorXParam(actor, x, y, width, match[2]);
            case 'SPARAM':
                return this.drawCssActorSParam(actor, x, y, width, match[2]);
            case 'PARAM':
                return this.drawCssActorParam(actor, x, y, width, match[2]);
            case 'CUSTOM':
                return this.drawCssActorCustom(actor, x, y, width, css.customs[match[2]]);
            case 'GAUGE':
                return this.drawCssActorGauge(actor, x, y, width, css.gauges[match[2]]);
            case 'STATE2':
                return this.drawCssActorIcons(index, actor, x, y, width, match[2]);
            case 'FACE':
                return this.drawCssActorFace(actor, x, y, width, lss, match[2]);
            case 'IMAGE':
                return this.drawCssActorImage(actor, x, y, width, match[2]);
            default:
                return 1;
        }
    };

    // 括弧を使わない表示コード
    Window_Base.prototype.drawCssActorStatusBase_B = function(index, actor, x, y, width, status, lss, css) {
        switch (status.toUpperCase()) {
            case 'IICON':
                return this.drawCssItemIcon(actor, x, y, width, lss);
            case 'INAME':
                return this.drawCssItemName(actor, x, y, width, lss);
            case 'IDESC':
                return this.drawCssItemDesc(actor, x, y, width, lss);
            case 'ITYPE':
                return this.drawCssItemType(actor, x, y, width, lss);
            case 'IETYPE':
                return this.drawCssItemEType(actor, x, y, width, lss);
            case 'ISCOPE':
                return this.drawCssItemScope(actor, x, y, width, lss);
            case 'IELEMENT':
                return this.drawCssItemElement(actor, x, y, width, lss);
            case 'INUMBER':
                return this.drawCssItemNumber(actor, x, y, width, lss);
            case 'MAPNAME':
                return this.drawCssMapName(actor, x, y, width, lss);
            case 'FACE':
                return this.drawCssActorFace(actor, x, y, width, lss);
            case 'ECHARA':
                return this.drawCssEnemyChara(actor, x, y, width);
            case 'CHARA':
                return this.drawCssActorChara(actor, x, y, width, css.chara);
            case 'SV':
                return this.drawCssActorSvChara(index, actor, x, y, width, css.svChara);
            case 'NICKNAME':
                return this.drawCssActorNickname(actor, x, y, width);
            case 'NAME':
                return this.drawCssActorName(actor, x, y, width);
            case 'LEVEL':
                return this.drawCssActorLevel(actor, x, y, width);
            case 'HP':
                return this.drawCssActorHp(actor, x, y, width);
            case 'MP':
                return this.drawCssActorMp(actor, x, y, width);
            case 'TP':
                return this.drawCssActorTp(actor, x, y, width);
            case 'CLASS':
                return this.drawCssActorClass(actor, x, y, width);
            case 'STATE':
                return this.drawCssActorIcons(index, actor, x, y, width);
            case 'PROFILE':
                return this.drawCssProfile(actor, x, y, width);
            case 'IMAGE':
                return this.drawCssActorImage(actor, x, y, width, 0);
            case 'MESSAGE':
                return this.drawCssActorMessage(actor, x, y, width);
            case 'LINE':
                return this.drawCssLine(x, y, width);
            default:
                return 1;
        }
    };

    //------------------------------------------------------------------------
    //アイテム名の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemIcon = function(actor, x, y, width, lss) {
        var index = lss.item ? lss.item.iconIndex : 0;
        this.drawIcon(index, x, y);
        return 1;
    };

    //------------------------------------------------------------------------
    //アイテムアイコンの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemName = function(actor, x, y, width, lss) {
        var name = lss.item ? lss.item.name : '';
        this.drawText(name, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アイテムの説明の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemDesc = function(actor, x, y, width, lss) {
        var name = lss.item ? lss.item.description : '';
        this.drawTextEx(name, x, y);
        return 2;
    };

    //------------------------------------------------------------------------
    //アイテムの設定の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemParam = function(actor, x, y, width, param, lss) {
        var item = lss.item;
        if (!item) return 1;
        this.drawText(item[param], x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アイテムのタイプ（スキルタイプ、武器タイプ、防具タイプ）
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemType = function(actor, x, y, width, lss) {
        this.drawText(DataManager.itemTypeName(lss.item), x, y, width);
        return 1;
    };

    Window_Base.ITEM_TYPES = [
        '',
        '一般アイテム',
        '大事なもの',
        '隠しアイテムA',
        '隠しアイテムB',
    ];

    DataManager.itemTypeName = function(item) {
        if (this.isSkill(item)) {
            return $dataSystem.skillTypes[item.stypeId];
        } else if (this.isItem(item)) {
            return Window_Base.ITEM_TYPES[item.itypeId];
        } else if (this.isWeapon(item)) {
            return $dataSystem.weaponTypes[item.wtypeId];
        } else if (this.isArmor(item)) {
            return $dataSystem.armorTypes[item.atypeId];
        } else {
            return '';
        }
    };

    //------------------------------------------------------------------------
    //アイテムの装備タイプ
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemEType = function(actor, x, y, width, lss) {
        var name = lss.item ?  $dataSystem.equipTypes[lss.item.etypeId] : '';
        this.drawText(name, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アイテムの範囲
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemScope = function(actor, x, y, width, lss) {
        var name = lss.item ? Window_Base.ITEM_SCOPE[lss.item.scope] : '';
        this.drawText(name, x, y, width);
        return 1;
    };

    Window_Base.ITEM_SCOPE = [
        '',
        '敵単体',
        '敵全体',
        '敵１体ランダム',
        '敵２体ランダム',
        '敵３体ランダム',
        '敵４体ランダム',
        '味方単体',
        '味方全体',
        '味方単体（戦闘不能）',
        '味方全体（戦闘不能）',
        '使用者'
    ];

    //------------------------------------------------------------------------
    //アイテムの属性
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemElement = function(actor, x, y, width, lss) {
        var name = lss.item && lss.item.damage ? $dataSystem.elements[lss.item.damage.elementId] : '';
        this.drawText(name, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アイテムのカスタム画像の表示
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemImage = function(actor, dx, dy, width, id, lss) {
        var item = lss.item;
        if (!item || !item.cssbgi) return 1;
        id = id || 0;
        var bgi = item.cssbgi[id];
        if (!bgi) return 1;
        var bitmap = ImageManager.loadPicture(bgi.name);
        if (!bitmap) return 1;
        var sw = bgi.width || bitmap.width;
        var sh = bgi.height || bitmap.height;
        var sx = bgi.offsetX || 0;
        var sy = bgi.offsetY || 0;

        var dh = sh * bgi.scale / 100;
        var dw = sw * bgi.scale / 100;
        var offsetX = FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        return Math.ceil(dh / this.lineHeight()) || 1;
    };

    //------------------------------------------------------------------------
    //アイテムの所持数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssItemNumber = function(actor, x, y, width, lss) {
        if (lss.item){
            var numItems = $gameParty.numItems(lss.item);
            this.drawText(numItems, x, y, width, 'right');
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //マップ名の表示
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssMapName = function(actor, x, y, width, lss) {
        this.drawText($gameMap.displayName(), x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターの顔画像の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorFace = function(actor, x, y, width, lss, scale) {
        var dy = this.lineHeight();
        scale = scale || Math.ceil(Window_Base._faceHeight / dy);
        this.changePaintOpacity(this.isEnabledChangePaintOpacity(actor));
        this.drawCssFace(actor, x, y, width, dy * scale);
        this.changePaintOpacity(true);
        return scale;
    };

    Window_Base.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        var fw = FTKR.CSS.cssStatus.face.width || Window_Base._faceWidth;
        var fh = FTKR.CSS.cssStatus.face.height || Window_Base._faceHeight;
        var scaleh = height / fh;
        var scaleW = width / fw;
        if (scaleh < scaleW) {
            var dh = height;
            var dw = fw * scaleh;
        } else {
            var dh = fh * scaleW;
            var dw = width;
        }
        var offsetX = this.cssFacePositionX(actor) * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        var bitmap = ImageManager.loadFace(actor.faceName());
        var sw = fw;
        var sh = fh;
        var sx = actor.faceIndex() % 4 * sw;
        var sy = Math.floor(actor.faceIndex() / 4) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_Base.prototype.cssFacePositionX = function(actor) {
        return FTKR.CSS.cssStatus.face.posiX;
    };

    //------------------------------------------------------------------------
    //エネミーの戦闘画像の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssEnemyChara = function(actor, dx, dy, width) {
        if (!actor) return 1;
        var bitmap = ImageManager.loadPicture(actor.battlerName());
        if (!bitmap) return 1;
        var sw = bitmap.width;
        var sh = bitmap.height;
        var sx = 0;
        var sy = 0;
        var dh = sh;
        var dw = sw;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        return Math.ceil(dh / this.lineHeight()) || 1;
    };

    //------------------------------------------------------------------------
    //アクターの歩行キャラの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorChara = function(actor, x, y, width, chara) {
        var dy = this.lineHeight();
        var line = Math.ceil(chara.height / dy);
        this.changePaintOpacity(this.isEnabledChangePaintOpacity(actor));
        this.drawCssChara(actor, x, y, width, dy * line, chara);
        this.changePaintOpacity(true);
        return line;
    };

    Window_Base.prototype.drawCssChara = function(actor, dx, dy, width, height, chara) {
        var faceName = actor.characterName();
        var index = actor.characterIndex();
        var dh = chara.height;
        var dw = dh || width || chara.width;
        var offsetX = this.cssCharaPositionX(actor, chara) * (width - dw) / 2;
        var offsetY = (height - dh) / 2;
        dx = Math.floor(dx + offsetX);
        dy = Math.floor(dy + offsetY);
        var bitmap = ImageManager.loadCharacter(faceName);
        var direction = chara.direction ? $gamePlayer._direction / 2 - 1 : 0;
        var sw = chara.width;
        var sh = chara.height;
        var sx = (index % 4 * 3 + 1) * sw;
        var sy = (Math.floor(index / 4) * 4 + direction) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_Base.prototype.cssCharaPositionX = function(actor, chara) {
        return chara.posiX;
    };

    //------------------------------------------------------------------------
    //アクターのSV戦闘キャラの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorSvChara = function(index, actor, x, y, width, svChara) {
        var dy = this.lineHeight();
        var line = Math.ceil(svChara.height / dy);
        this.changePaintOpacity(this.isEnabledChangePaintOpacity(actor));
        this.drawCssSvChara(index, actor, x, y, width, dy * line, svChara);
        this.changePaintOpacity(true);
        return line;
    };

    Window_Base.prototype.drawCssSvChara = function(index, actor, dx, dy, width, height, svChara) {
        if (this.enableCssSvCharaMotion(svChara)) {
            this.drawCssSvSprite(index, actor, dx, dy, width, height, svChara);
        } else {
            this.drawCssSvImage(index, actor, dx, dy, width, height, svChara);
        }
    };

    Window_Base.prototype.enableCssSvCharaMotion = function(svChara) {
        return $gameSystem.isSideView() &&
            (svChara.enable === 1 || svChara.enable === 2 && !$gameParty.inBattle());
    };

    Window_Base.prototype.drawCssSvSprite = function(index, actor, dx, dy, width, height, svChara) {
        index = index % this.showActorNum();
        var sprite = this.sprite[index];
        if (!sprite) {
            sprite = new Sprite_Actor(actor);
            this.addChild(sprite);
            this.sprite[index] = sprite;
        } else {
            sprite.setBattler(actor);
        }
        var offsetX = this.cssSvPositionX(actor, svChara) * (width - svChara.width) / 2;
        var sx = Math.floor(dx + offsetX + this.padding + svChara.width / 2);
        var sy = Math.floor(dy + height + this.padding);
        sprite.setHome(sx, sy);
        sprite.startMove(0,0,0);
        sprite.stopMove();
        if (!Imported.FTKR_ESM) {
            var stateMotion = actor.getStateMotion();
            var motion = svChara.state && stateMotion ? stateMotion : svChara.motion;
            sprite.startMotion(motion);
        }
    };
    

    Window_Base.prototype.drawCssSvImage = function(index, actor, dx, dy, width, height, svChara) {
        var dh = svChara.height;
        var dw = dh || width || svChara.width;
        var offsetX = this.cssSvPositionX(actor, svChara) * (width - dw) / 2;
        var offsetY = (height - dh) / 2;
        dx = Math.floor(dx + offsetX);
        dy = Math.floor(dy + offsetY);
        var bitmap = ImageManager.loadSvActor(actor.battlerName());
        var sw = svChara.width;
        var sh = svChara.height;
        this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh);
    };

    Window_Base.prototype.cssSvPositionX = function(actor, svChara) {
        return svChara.posiX;
    };

    //------------------------------------------------------------------------
    //アクターの名前の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorName = function(actor, x, y, width) {
        if (!actor) return 1;
        this.changeTextColor(this.hpColor(actor));
        this.drawText(actor.name(), x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターのクラス名の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorClass = function(actor, x, y, width) {
        this.resetTextColor();
        this.drawText(actor.currentClass().name, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターの二つ名の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorNickname = function(actor, x, y, width) {
        this.resetTextColor();
        this.drawText(actor.nickname(), x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターのレベルの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorLevel = function(actor, x, y, width) {
        var value = actor.level;
        var tw = this.textWidth(String(value));
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, width - tw - 4);
        this.resetTextColor();
        this.drawText(value, x + width - tw, y, tw, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターのステートアイコンの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorIcons = function(index, actor, x, y, width, line) {
        if (FTKR.CSS.cssStatus.state.enable) {
            return this.drawCssIconsSprite(index, actor, x, y, width, line);
        } else {
            this.drawActorIcons(actor, x, y, width);
            return 1;
        }
    };

    Window_Base.prototype.drawCssIconsSprite = function(index, actor, x, y, width, line) {
        var css = FTKR.CSS.cssStatus.state;
        var iw = Window_Base._iconWidth;
        var iconPadding = css.iconPadding;
        index = index % this.showActorNum();
        var iconSprites = this._stateIconSprite[index];
        if (!iconSprites) {
            iconSprites = [];
        }
        if(css.autoScale) {
            var scale = this.iconScale(width);
            iw = iw * scale;
        }
        var maxlen = line ? this.lineHeight() * line : width;
        var offset = css.overlap ? this.getOverlapValue(actor, iw, maxlen, css) : iw;
        var showNum = Math.max(Math.floor((maxlen - iconPadding) / offset), 1);
        if (showNum < iconSprites.length) {
            iconSprites.forEach(function(sprite,i){
                if (i < showNum) return;
                this.removeChild(sprite);
            },this);
            iconSprites = iconSprites.slice(0, showNum);
        }
        for (var i = 0; i < showNum; i++) {
            var sprite = iconSprites[i];
            if (!sprite) {
                sprite = new Sprite_CssStateIcon(i, showNum);
                this.addChild(sprite);
                sprite.setup(actor, showNum);
                iconSprites[i] = sprite;
            } else {
                sprite.setup(actor, showNum);
            }
            sprite.move(x + this.padding, y + this.padding);
            sprite.offsetMove(offset * i, line);
            if(css.autoScale) sprite.setScale(scale);
        }
        this._stateIconSprite[index] = iconSprites;
        return line ? line : 1;
    };

    Window_Base.prototype.getOverlapValue = function(actor, iw, maxlen, css) {
        var iconlen = actor.allIcons().length;
        var iconPadding = FTKR.CSS.cssStatus.state.iconPadding;
        var diff = Math.max((maxlen - iw - iconPadding) / (iconlen - 1), iw * css.rate);
        return diff && diff < iw ? diff : iw;
    };

    Window_Base.prototype.iconOverlapOffset = function(iw, number, width, vartical) {
        var iconPadding = FTKR.CSS.cssStatus.state.iconPadding;
        var len = vartical ? (number - 1) * this.lineHeight() + iconPadding : width - iw - iconPadding;
        var diff = number > 1 ? len / (number - 1) : 0;
        return diff < iw ? diff : iw;
    };

    Window_Base.prototype.iconScale = function(width) {
        var iconPadding = FTKR.CSS.cssStatus.state.iconPadding;
        var iw = Window_Base._iconWidth;
        var len = Math.min(this.lineHeight(), width);
        return Math.min(Math.max(len - iconPadding, 0) / iw);
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_Base.prototype.drawCssIcon = function(iconIndex, x, y, scale, auto) {
        var iconPadding = FTKR.CSS.cssStatus.state.iconPadding;
        scale = scale || 1;
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        if (auto) scale = Math.min(Math.max(this.lineHeight() - iconPadding, 0) / pw, 1);
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    };

    //------------------------------------------------------------------------
    //アクターのHPの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorHp = function(actor, x, y, width) {
        this.drawActorHp(actor, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターのMPの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorMp = function(actor, x, y, width) {
        this.drawActorMp(actor, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターのTPの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorTp = function(actor, x, y, width) {
        this.drawActorTp(actor, x, y, width);
        return 1;
    };

    //------------------------------------------------------------------------
    //パラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorParam = function(actor, x, y, width, paramId) {
        if (paramId < 0 && paramId > 7) return 0;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y, width);
        this.resetTextColor();
        this.drawText(actor.param(paramId), x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //素のパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorParamBase = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 0;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y, width);
        this.resetTextColor();
        this.drawText(actor.paramBase(paramId), x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //パラメータ差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorParamDiff = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 1;
        var param = actor.param(paramId);
        var base = actor.paramBase(paramId);
        var diff = param - base;
        this.drawParamDiffValue(diff, x, y, width, FTKR.CSS.cssStatus.pdiff);
        return 1;
    };

    Window_Base.prototype.drawParamDiffValue = function(value, x, y, width, formatParams) {
        this.changeTextColor(this.paramchangeTextColor(value));
        var text = '';
        if (value > 0) {
            text = formatParams.plus.format(value);
        } else if (value < 0) {
            text = formatParams.minus.format(-value);
        }
        if (formatParams.enabledEc) {
            this.drawTextEx(text, x, y);
        } else {
            this.drawText(text, x, y, width, 'right');
        }
        this.resetTextColor();
    };

    //------------------------------------------------------------------------
    //追加能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorXParam = function(actor, x, y, width, paramId) {
        if (paramId < 0 && paramId > 9) return 0;
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.CSS.cssStatus.xparam[paramId], x, y, width);
        this.resetTextColor();
        var text = actor.xparam(paramId);
        if (FTKR.CSS.cssStatus.param.decimals) {
            text = text.percent() + '%';
        }
        this.drawText(text, x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //特殊能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorSParam = function(actor, x, y, width, paramId) {
        if (paramId < 0 && paramId > 9) return 0;
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.CSS.cssStatus.sparam[paramId], x, y, width);
        this.resetTextColor();
        var text = actor.sparam(paramId);
        if (FTKR.CSS.cssStatus.param.decimals) {
            text = text.percent() + '%';
        }
        this.drawText(text, x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時のパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipParam = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 0;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (this.checkShowEquipParam(actor, target)) {
            var newValue = target.param(paramId);
            var diffvalue = newValue - actor.param(paramId);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            this.drawText(newValue, x, y, width, 'right');
        }
        return 1;
    };

    Window_Base.prototype.checkShowEquipParam = function(actor, target) {
        return !!actor && !!target;
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時の追加能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipXParam = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 9) return 0;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (this.checkShowEquipParam(actor, target)) {
            var newValue = target.xparam(paramId);
            var diffvalue = newValue - actor.xparam(paramId);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            if (FTKR.CSS.cssStatus.param.decimals) {
                newValue = newValue.percent() + '%';
            }
            this.drawText(newValue, x, y, width, 'right');
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時の特殊能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipSParam = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 9) return 0;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (this.checkShowEquipParam(actor, target)) {
            var newValue = target.sparam(paramId);
            var diffvalue = newValue - actor.sparam(paramId);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            if (FTKR.CSS.cssStatus.param.decimals) {
                newValue = newValue.percent() + '%';
            }
            this.drawText(newValue, x, y, width, 'right');
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //装備パラメータ差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipDiff = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 1;
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (target) {
            var newValue = target.param(paramId);
            var diffvalue = newValue - actor.param(paramId);
            this.drawParamDiffValue(diffvalue, x, y, width, FTKR.CSS.cssStatus.ediff);
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //追加能力値の装備パラメータ差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipXPDiff = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 9) return 1;
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (target) {
            var newValue = target.xparam(paramId);
            var diffvalue = newValue - actor.xparam(paramId);
            if (FTKR.CSS.cssStatus.param.decimals) {
                diffvalue = diffvalue.percent() + '%';
            }
            this.drawParamDiffValue(diffvalue, x, y, width, FTKR.CSS.cssStatus.ediff);
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //特殊能力値の装備パラメータ差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipSPDiff = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 9) return 1;
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (target) {
            var newValue = target.sparam(paramId);
            var diffvalue = newValue - actor.sparam(paramId);
            if (FTKR.CSS.cssStatus.param.decimals) {
                diffvalue = diffvalue.percent() + '%';
            }
            this.drawParamDiffValue(diffvalue, x, y, width, FTKR.CSS.cssStatus.ediff);
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //AOP能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorAopParam = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 9) return 1;
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.AOP.params[paramId].text, x, y, width);
        this.resetTextColor();
        this.drawText(actor.aopParam(paramId), x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //素のAOP能力値の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorAopParamBase = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 9) return 1;
        this.changeTextColor(this.systemColor());
        this.drawText(FTKR.AOP.params[paramId].text, x, y, width);
        this.resetTextColor();
        this.drawText(actor.aopParamBase(paramId), x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //AOP能力値差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorAopParamDiff = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 9) return 1;
        var param = actor.aopParam(paramId);
        var base = actor.aopParamBase(paramId);
        var diff = param - base;
        this.drawParamDiffValue(diff, x, y, width, FTKR.CSS.cssStatus.aopdiff);
        return 1;
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時のAOPパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipAopParam = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 9) return 1;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (this.checkShowEquipParam(actor, target)) {
            var newValue = target.aopParam(paramId);
            var diffvalue = newValue - actor.aopParam(paramId);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            this.drawText(newValue, x, y, width, 'right');
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //AOP装備パラメータ差分の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipAopDiff = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 7) return 1;
        var target = lss.target;
        var item = FTKR.gameData.item;
        if (item && !actor.canEquip(item)) return 1;
        if (target) {
            var newValue = target.aopParam(paramId);
            var diffvalue = newValue - actor.aopParam(paramId);
            this.drawParamDiffValue(diffvalue, x, y, width, FTKR.CSS.cssStatus.ediffaop);
        }
        return 1;
    };
    

    //------------------------------------------------------------------------
    //カスタムパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorCustom = function(actor, x, y, width, custom) {
        if (!custom) return 1;
        var name = custom.name || '';
        var formula = custom.formula || '';
        var unit = custom.unit || '';
        var tux = this.convertTextWidth(unit);
        var value = this.evalCssCustomFormula(actor, formula);
        this.changeTextColor(this.systemColor());
        var tx = this.convertTextWidth(name);
        this.drawTextEx(name, x, y);
        this.resetTextColor();
        this.drawText(value, x + tx, y, width - tx - tux, 'right');
        if (unit) this.drawTextEx(unit, x + width - tux, y);
        return 1;
    };

    //------------------------------------------------------------------------
    //カスタムゲージの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorGauge = function(actor, x, y, width, gauge) {
        if (!gauge) return 1;
        var current = this.evalCssStrFormula(actor, gauge.current);
        var max = this.evalCssStrFormula(actor, gauge.max);
        if (gauge.color1 >= 0 && gauge.color2 >= 0) {
            var rate = isNaN(max) ? 1 : current / max;
            var color1 = this.textColor(gauge.color1);
            var color2 = this.textColor(gauge.color2);
            this.drawGauge(x, y, width, rate, color1, color2);
        }
        this.changeTextColor(this.systemColor());
        var tx = this.convertTextWidth(gauge.name);
        this.drawTextEx(gauge.name, x, y);
        if (gauge.ref) {
            var ref = this.evalCssStrFormula(actor, gauge.ref);
            this.resetTextColor();
            this.drawText(ref, x + tx, y, width - tx, 'right');
        } else {
            if (tx) this.drawCssCurrentAndMax(tx, current, max, x, y, width,
                                this.normalColor(), this.normalColor());
        }
        return 1;
    };

    Window_Base.prototype.drawCssCurrentAndMax = function(labelWidth, current, max, x, y,
                                                      width, color1, color2) {
        var gauge = FTKR.CSS.cssStatus.gauge;
        var valueWidth = this.textWidth('0') * gauge.digit;
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    //------------------------------------------------------------------------
    //装備の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquip = function(actor, x, y, width, equipId, lss) {
        if ((equipId +'').toUpperCase() === 'SHOP') {
            equipId = lss.item.etypeId - 1;
        } else {
            FTKR.setGameData(actor, lss.target, lss.item);
            equipId = this.convertCssNumber(actor, equipId);
        }
        var equip = actor.equips()[equipId];
        if (equip) {
            this.drawCssIcon(equip.iconIndex, x, y, 1, true);
            var iw = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawText(equip.name, x + iw, y, width - iw);
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //装備可否の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssCannotEquip = function(actor, x, y, width, text, lss) {
        var item = FTKR.gameData.item || lss.item;
        if (!item) return 1;
        if (!actor.canEquip(item)) {
            text = text == 'null' ? '装備不可' : text;
            this.drawTextEx(text, x, y);
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //プロフィールの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssProfile = function(actor, x, y, width) {
        this._setItem = actor.actor();
        var texts = actor.profile().split('\n');
        var dy = this.lineHeight();
        texts.forEach( function(text, i) {
            this.drawTextEx(text, x, y + dy * i);
        },this);
        return texts.length;
    };

    //------------------------------------------------------------------------
    //テキストの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssText = function(actor, x, y, width, text) {
        if (!text) return 1;
        var text = this.evalCssStrFormula(actor, text);
        this.changeTextColor(this.systemColor());
        this.drawTextEx(text, x, y);
        this.resetTextColor();
        return 1;
    };

    //------------------------------------------------------------------------
    //JS評価式の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssEval = function(actor, x, y, width, text, isNumber) {
        if (!text) return 1;
        if (isNumber) {
            var value = this.evalCssCustomFormula(actor, text);
            var align = 'right';
        } else {
            var value = this.evalCssStrFormula(actor, text);
            var align = 'left';
        }
        this.resetTextColor();
        this.drawText(value, x, y, width, align);
        return 1;
    };

    //------------------------------------------------------------------------
    //カスタム画像の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorImage = function(actor, x, y, width, id) {
        if (!actor) return 1;
        this.changePaintOpacity(this.isEnabledChangePaintOpacity(actor));
        var line = this.drawCssImage(actor, x, y, width, id);
        this.changePaintOpacity(true);
        return line;
    };

    Window_Base.prototype.drawCssImage = function(actor, dx, dy, width, id) {
        var bgi = actor.cssbgi(id) ? actor.cssbgi(id) : actor.actor().cssbgi[id];
        if (!bgi) return 1;
        var bitmap = ImageManager.loadPicture(bgi.name);
        if (!bitmap) return 1;
        var sw = bgi.width || bitmap.width;
        var sh = bgi.height || bitmap.height;
        var sx = bgi.offsetX || 0;
        var sy = bgi.offsetY || 0;
        var dh = sh * bgi.scale / 100;
        var dw = sw * bgi.scale / 100;
        var offsetX = FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        return Math.ceil(dh / this.lineHeight()) || 1;
    };

    //------------------------------------------------------------------------
    //アクターに設定したカスタムゲージの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorCustomGauge = function(actor, x, y, width, paramId) {
        var gauge = actor.actor().cssGauges[paramId];
        if (!gauge) return 1;
        return this.drawCssActorGauge(actor, x, y, width, gauge);
    };

    //------------------------------------------------------------------------
    //クラスに設定したカスタムゲージの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssClassCustomGauge = function(actor, x, y, width, paramId) {
        var gauge = actor.currentClass().cssGauges[paramId];
        if (!gauge) return 1;
        return this.drawCssActorGauge(actor, x, y, width, gauge);
    };

    //------------------------------------------------------------------------
    //アクターの状態の変化に対するメッセージの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorMessage = function(actor, x, y, width) {
        if (!actor._levelUpCount) return 1;
        var text = FTKR.CSS.cssStatus.message.levelUp.format(actor.name(), actor.level, actor._levelUpCount);
        this.drawTextEx(text, x, y);
        actor._levelUpMessage = true;
        return 1;
    };

    var _Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        _Scene_Base_start.call(this);
        if ($gameParty) {
            $gameParty.members().forEach( function(actor){
                if (actor && actor._levelUpMessage) {
                    actor._levelUpCount = 0;
                    actor._levelUpMessage = false;
                }
            });
        }
    };

    //------------------------------------------------------------------------
    //横線の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssLine = function(x, y, width, thick, color) {
        var thick = thick > 0 ? thick : 2;
        var color = color > 0 ? color : 0;
        var lineY = y + this.lineHeight() / 2 - thick / 2;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, thick, this.textColor(color));
        this.contents.paintOpacity = 255;
        return 1;
    };

    //------------------------------------------------------------------------
    // ウィンドウレイアウトの初期値設定用の修正
    //------------------------------------------------------------------------

    var _CSS_Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        this.initCssLayout();
        _CSS_Window_Base_initialize.call(this, x, y, width, height);
    };

    Window_Base.prototype.initCssLayout = function() {
        var lss = this.standardCssLayout();
        if (lss && lss.enabled) {
            this._customFontSize    = lss.fontSize;
            this._customPadding     = lss.padding;
            this._customLineHeight  = lss.lineHeight;
            this._customBackOpacity = lss.opacity;
            this._customHideFrame   = lss.hideFrame;
        }
        this._lssStatus = this.standardCssStatus();
    };

    Window_Base.prototype.standardCssLayout = function() {
        return {};
    }

    Window_Base.prototype.standardCssStatus = function() {
        return {};
    };

    Window_Selectable.prototype.initCssLayout = function() {
        Window_Base.prototype.initCssLayout.call(this);
        var lss = this.standardCssLayout();
        if (lss && lss.enabled) {
            this._customMaxCols = lss.maxCols;
            this._customCursorHeight = lss.cursorHeight;
            this._customHorSpacing = lss.hspace;
        }
    };

    //=============================================================================
    // customデータの参照
    //=============================================================================

    var _CSS_Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
    Window_Base.prototype.standardFontSize = function() {
        return this._customFontSize ? this._customFontSize : _CSS_Window_Base_standardFontSize.call(this);
    };

    var _CSS_Window_Base_standardPadding = Window_Base.prototype.standardPadding;
    Window_Base.prototype.standardPadding = function() {
        return this._customPadding >= 0 ? this._customPadding : _CSS_Window_Base_standardPadding.call(this);
    };

    var _CSS_Window_Base_lineHeight = Window_Base.prototype.lineHeight;
    Window_Base.prototype.lineHeight = function() {
        return this._customLineHeight ? this._customLineHeight : _CSS_Window_Base_lineHeight.call(this);
    };

    var _CSS_Window_Base_standardBackOpacity = Window_Base.prototype.standardBackOpacity;
    Window_Base.prototype.standardBackOpacity = function() {
        return this._customBackOpacity >= 0 ? this._customBackOpacity : _CSS_Window_Base_standardBackOpacity.call(this);
    };

    //------------------------------------------------------------------------
    // _customHideFrame
    //------------------------------------------------------------------------
    //ウィンドウ枠の表示
    Window_Base.prototype._refreshFrame = function() {
        Window.prototype._refreshFrame.call(this);
        if (this._customHideFrame) {
            this._windowFrameSprite.alpha = 0;//フレームだけ消す
        } else {
            this._windowFrameSprite.alpha = 1;
        }
    };

    //------------------------------------------------------------------------
    // _customSpacing
    //------------------------------------------------------------------------
    Window_Base.prototype.spacing = function() {
        return 0;
    };

    var _CSS_Window_Selectable_spacing = Window_Selectable.prototype.spacing;
    Window_Selectable.prototype.spacing = function() {
        return this._customSpacing !== undefined ? this._customSpacing : _CSS_Window_Selectable_spacing.call(this);
    };

    Window_Selectable.prototype.customSpacing = function() {
        return this._customSpacing !== undefined ? this._customSpacing : this.spacing();
    };

    //------------------------------------------------------------------------
    // _customMaxCols
    //------------------------------------------------------------------------

    var _CSS_Window_Selectable_maxCols = Window_Selectable.prototype.maxCols;
    Window_Selectable.prototype.maxCols = function() {
        return this._customMaxCols ? this._customMaxCols : _CSS_Window_Selectable_maxCols.call(this);
    };

    Window_Selectable.prototype.customMaxCols = function() {
        return this._customMaxCols ? this._customMaxCols : this.maxCols();
    };

    //------------------------------------------------------------------------
    // _customCursorHeight
    //------------------------------------------------------------------------

    Window_Selectable.prototype.cursorHeight = function() {
        return this._customCursorHeight;
    };

    //------------------------------------------------------------------------
    // _customHorSpacing
    //------------------------------------------------------------------------

    Window_Selectable.prototype.itemHeightSpace = function() {
        return this._customHorSpacing;
    };
    
    //=============================================================================
    // customデータの反映
    //=============================================================================

    //書き換え
    Window_Selectable.prototype.maxRows = function() {
        return Math.max(Math.ceil(this.maxItems() / this.customMaxCols()), 1);
    };
    
    //書き換え
    Window_Selectable.prototype.row = function() {
        return Math.floor(this.index() / this.customMaxCols());
    };
    
    //書き換え
    Window_Selectable.prototype.maxPageItems = function() {
        return this.maxPageRows() * this.customMaxCols();
    };
    
    //書き換え
    Window_Selectable.prototype.topIndex = function() {
        return this.topRow() * this.customMaxCols();
    };
    
    //書き換え
    Window_Selectable.prototype.cursorDown = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.customMaxCols();
        if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
            this.select((index + maxCols) % maxItems);
        }
    };
    
    //書き換え
    Window_Selectable.prototype.cursorUp = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.customMaxCols();
        if (index >= maxCols || (wrap && maxCols === 1)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
    };
    
    //書き換え
    Window_Selectable.prototype.cursorRight = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.customMaxCols();
        if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
            this.select((index + 1) % maxItems);
        }
    };
    
    //書き換え
    Window_Selectable.prototype.cursorLeft = function(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.customMaxCols();
        if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
            this.select((index - 1 + maxItems) % maxItems);
        }
    };
    
    //書き換え
    Window_Command.prototype.numVisibleRows = function() {
        return Math.ceil(this.maxItems() / this.customMaxCols());
    };
        
    //書き換え
    Window_Selectable.prototype.itemWidth = function() {
        return Math.floor((this.width - this.padding * 2 +
                           this.customSpacing()) / this.customMaxCols() - this.customSpacing());
    };
    
    var _Window_Selectable_itemHeight = Window_Selectable.prototype.itemHeight;
    Window_Selectable.prototype.itemHeight = function() {
        return this.cursorHeight() ? 
            this.lineHeight() * this.cursorHeight() :
            _Window_Selectable_itemHeight.call(this);
    };

    Window_Selectable.prototype.unitHeight = function() {
        return this.itemHeight() + this.itemHeightSpace();
    };

    Window_Selectable.prototype.unitWidth = function() {
        return this.itemWidth() + this.customSpacing();
    };

    var _CSS_Window_Selectable_maxPageRows = Window_Selectable.prototype.maxPageRows;
    Window_Selectable.prototype.maxPageRows = function() {
        if (this.itemHeightSpace() !== undefined) {
            var pageHeight = this.height - this.padding * 2;
            return Math.floor(pageHeight / this.unitHeight());
        } else {
            return _CSS_Window_Selectable_maxPageRows.call(this);
        }
    };

    var _CSS_Window_Selectable_topRow = Window_Selectable.prototype.topRow;
    Window_Selectable.prototype.topRow = function() {
        return this.itemHeightSpace() !== undefined ? Math.floor(this._scrollY / this.unitHeight()) :
            _CSS_Window_Selectable_topRow.call(this);
    };

    var _CSS_Window_Selectable_setTopRow = Window_Selectable.prototype.setTopRow;
    Window_Selectable.prototype.setTopRow = function(row) {
        if (this.itemHeightSpace() !== undefined) {
            var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
            if (this._scrollY !== scrollY) {
                this._scrollY = scrollY;
                this.refresh();
                this.updateCursor();
            }
        } else {
            return _CSS_Window_Selectable_setTopRow.call(this, row);
        }
    };

    var _CSS_Window_Selectable_itemRect = Window_Selectable.prototype.itemRect;
    Window_Selectable.prototype.itemRect = function(index) {
        if (this.itemHeightSpace() !== undefined) {
            var rect = new Rectangle();
            var maxCols = this.customMaxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * this.unitWidth() - this._scrollX;
            rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
            return rect;
        } else {
            return _CSS_Window_Selectable_itemRect.call(this, index);
        }
    };

    //=============================================================================
    // Sprite_Battlerの修正
    // Sprite_Actorの修正
    //=============================================================================

    FTKR.CSS.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function() {
        FTKR.CSS.Sprite_Battler_initMembers.call(this);
        this._canMove = true;
    };

    //------------------------------------------------------------------------
    // SV戦闘キャラの位置を変更できないようにする
    //------------------------------------------------------------------------
    Sprite_Actor.prototype.stopMove = function() {
        this._canMove = false;
    };

    Sprite_Actor.prototype.canMove = function() {
        return this._canMove;
    };

    FTKR.CSS.Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
    Sprite_Actor.prototype.updateTargetPosition = function() {
        if (!this.canMove()) return;
        FTKR.CSS.Sprite_Actor_updateTargetPosition.call(this);
    };

}());//END

//=============================================================================
// Sprite_CssStateIcon
// ステートアイコン用のスプライト
//=============================================================================

function Sprite_CssStateIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_CssStateIcon.prototype = Object.create(Sprite_StateIcon.prototype);
Sprite_CssStateIcon.prototype.constructor = Sprite_CssStateIcon;

Sprite_CssStateIcon.prototype.initialize = function(index, showNum) {
    Sprite_StateIcon.prototype.initialize.call(this);
    this._index = index;
    this._showNum = showNum;
};

Sprite_CssStateIcon._iconWidth  = 32;
Sprite_CssStateIcon._iconHeight = 32;

Sprite_CssStateIcon.prototype.initMembers = function() {
    this._battler = null;
    this._iconIndex = 0;
    this._animationCount = this.animationWait();
    this._animationIndex = 0;
    this.anchor.x = 0;
    this.anchor.y = 0;
    if (Imported.YEP_BuffsStatesCore) {
        if (!this._turnCounterSprite) {
            this._turnCounterSprite = new Sprite();
            this.addChild(this._turnCounterSprite);
        }
        var w = Window_Base._iconWidth;
        var h = Window_Base._iconHeight;
        this._turnCounterSprite.bitmap = new Bitmap(w, h);
        this._turnCounterSprite.anchor.x = 0;
        this._turnCounterSprite.anchor.y = 0;
    }
};

Sprite_CssStateIcon.prototype.setup = function(battler, showNum) {
    this.initMembers();
    this._battler = battler;
    this._showNum = showNum;
    this.setFrame();
};

Sprite_CssStateIcon.prototype.updateIcon = function() {
    var icons = [];
//    if (this._battler && this._battler.isAlive()) {
    if (this._battler) {
            icons = this._battler.allIcons();
    }
    if (icons.length > 0) {
        this._animationIndex++;
        if (this._animationIndex >= Math.ceil(icons.length / this._showNum)) {
            this._animationIndex = 0;
        }
        this._iconIndex = icons[this._animationIndex * this._showNum + this._index];
    } else {
        this._animationIndex = 0;
        this._iconIndex = 0;
    }
};

Sprite_CssStateIcon.prototype.animationWait = function() {
    return FTKR.CSS.cssStatus.state.wait;
};

Sprite_CssStateIcon.prototype.setScale = function(scale) {
    this.scale._x = scale;
    this.scale._y = scale;
};

Sprite_CssStateIcon.prototype.offsetMove = function(offset, vartical) {
    !vartical ? this.x += offset : this.y += offset;
};

Sprite_CssStateIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpacity();
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updateIcon();
        this.updateFrame();
        this._animationCount = 0;
    }
};

Sprite_CssStateIcon.prototype.updateOpacity = function() {
    if (this.opacity != this.parent.openness) {
        this.opacity = this.parent.openness;
    }
};

//=============================================================================
// YEP_BuffsStatesCoreの修正
//=============================================================================
if (Imported.YEP_BuffsStatesCore) {

Sprite_CssStateIcon.prototype.updateTurnAndCounter = function() {
    this._turnCounterSprite.bitmap.clear();
    if (!this._battler) return;
    var group = this._battler.statesAndBuffs();
    if (group.length <= 0) return;
    var state = group[this._animationIndex * this._showNum + this._index];
    if (!state) return;
    if (typeof state === 'number') {
        if (Yanfly.Param.BSCEnemyBTurn) {
            this.drawBuffTurns(state);
            if (Yanfly.Param.BSCShowBuffRate) {
                this.drawBuffRate(state)
            }
        }
    } else {
        if (Yanfly.Param.BSCEnemyTurn) this.drawStateTurns(state);
        if (Yanfly.Param.BSCEnemyCounter) this.drawStateCounter(state);
    }
};

}//YEP_BuffsStatesCore.js END

//EOF