//=============================================================================
// アクターのステータス表示を変更するプラグイン
// FTKR_CustomSimpleActorStatus.js
// プラグインNo : 9
// 作成者     : フトコロ
// 作成日     : 2017/03/09
// 最終更新日 : 2018/03/17
// バージョン : v2.7.0
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
 * @plugindesc v2.7.0 アクターのステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 * 
 * @param --顔画像の設定--
 * @default
 * 
 * @param Face Position X
 * @desc 顔画像を描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * 
 * @param --歩行キャラの設定--
 * @default
 * 
 * @param Chara Image Width
 * @desc アクターの歩行キャラの画像幅を設定します
 * デフォルトは48
 * @default 48
 * 
 * @param Chara Image Height
 * @desc アクターの歩行キャラの画像高さを設定します
 * デフォルトは48
 * @default 48
 * 
 * @param Chara Position X
 * @desc アクターの歩行キャラを描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * 
 * @param Chara Direction
 * @desc アクターの歩行キャラの向きを設定します。
 * 0 - 正面固定, 1 - マップ上の先頭プレイヤーの向き
 * @default 0
 * 
 * @param --SVキャラの設定--
 * @default
 * 
 * @param Sv Image Width
 * @desc アクターのSVキャラの画像幅を設定します
 * デフォルトは64
 * @default 64
 * 
 * @param Sv Image Height
 * @desc アクターのSvキャラの画像高さを設定します
 * デフォルトは64
 * @default 64
 * 
 * @param Sv Position X
 * @desc アクターのSvキャラを描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * 
 * @param Enabled Sv Motion
 * @desc Svキャラのモーションを有効にするか設定します
 * 0 - 無効にする, 1 - 常に有効にする, 2 - 戦闘時以外有効
 * @default 1
 * 
 * @param Sv Image Motion
 * @desc Svキャラの標準モーションを設定します
 * @default wait
 * 
 * @param Enabled State Motion
 * @desc ステートモーションを有効にするか設定します
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
 * 
 * @param --ステートの設定--
 * @default
 * 
 * @param Enable CSS States
 * @desc ステートアイコンの表示を専用の描画処理に変えるか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
 * 
 * @param Animation Wait
 * @desc ステートアイコンの切り替え時間を指定します
 * デフォルトは40
 * @default 40
 * 
 * @param Enable Overlap
 * @desc ステートアイコンの重なり表示を有効にする
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Overlap Rate
 * @desc アイコンの重なりを許容する比率を設定します。
 * @default 0.5
 * 
 * @param Enable Auto Scale
 * @desc 行の高さに合わせてアイコンサイズを調整するか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param --装備パラメータの設定--
 * @default
 * 
 * @param Equip Right Arrow
 * @desc 装備を変える時に表示する右矢印記号を指定します。
 * @default \c[16]→
 * 
 * @param --カスタム画像の設定--
 * @default
 * 
 * @param Image Position X
 * @desc カスタム画像を描画エリア内のどこに表示するか。
 * 0 - 左寄せ, 1 - 中央, 2 - 右寄せ
 * @default 1
 * 
 * @param --メッセージの設定--
 * @default
 * 
 * @param Display LevelUp Message
 * @desc レベルアップ時のメッセージを設定します。
 * %1 - アクター名, %2 - 現在レベル, %3 - 上昇したレベル
 * @default \C[17]%3 Level Up!
 * 
 * @param --カスタムパラメータの設定--
 * @default
 * 
 * @param --Custom Param 0--
 * @default
 * 
 * @param Custom 0 Display Name
 * @desc Custom(0)の表示名を設定します
 * @default \c[16]現在の経験値
 * 
 * @param Custom 0 References
 * @desc Custom(0)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 0 Unit
 * @desc Custom(0)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 1--
 * @default
 * 
 * @param Custom 1 Display Name
 * @desc Custom(1)の表示名を設定します
 * @default 
 * 
 * @param Custom 1 References
 * @desc Custom(1)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.currentExp()
 * 
 * @param Custom 1 Unit
 * @desc Custom(1)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 2--
 * @default
 * 
 * @param Custom 2 Display Name
 * @desc Custom(2)の表示名を設定します
 * @default \c[16]次のレベルまで
 * 
 * @param Custom 2 References
 * @desc Custom(2)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 2 Unit
 * @desc Custom(2)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 3--
 * @default
 * 
 * @param Custom 3 Display Name
 * @desc Custom(3)の表示名を設定します
 * @default 
 * 
 * @param Custom 3 References
 * @desc Custom(3)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.nextRequiredExp()
 * 
 * @param Custom 3 Unit
 * @desc Custom(3)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 4--
 * @default
 * 
 * @param Custom 4 Display Name
 * @desc Custom(4)の表示名を設定します
 * @default 
 * 
 * @param Custom 4 References
 * @desc Custom(4)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 4 Unit
 * @desc Custom(4)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 5--
 * @default
 * 
 * @param Custom 5 Display Name
 * @desc Custom(5)の表示名を設定します
 * @default 
 * 
 * @param Custom 5 References
 * @desc Custom(5)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 5 Unit
 * @desc Custom(5)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 6--
 * @default
 * 
 * @param Custom 6 Display Name
 * @desc Custom(6)の表示名を設定します
 * @default 
 * 
 * @param Custom 6 References
 * @desc Custom(6)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 6 Unit
 * @desc Custom(6)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 7--
 * @default
 * 
 * @param Custom 7 Display Name
 * @desc Custom(7)の表示名を設定します
 * @default 
 * 
 * @param Custom 7 References
 * @desc Custom(7)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 7 Unit
 * @desc Custom(7)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 8--
 * @default
 * 
 * @param Custom 8 Display Name
 * @desc Custom(8)の表示名を設定します
 * @default 
 * 
 * @param Custom 8 References
 * @desc Custom(8)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 8 Unit
 * @desc Custom(8)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 9--
 * @default
 * 
 * @param Custom 9 Display Name
 * @desc Custom(9)の表示名を設定します
 * @default 
 * 
 * @param Custom 9 References
 * @desc Custom(9)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 9 Unit
 * @desc Custom(9)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 10--
 * @default
 * 
 * @param Custom 10 Display Name
 * @desc Custom(10)の表示名を設定します
 * @default 
 * 
 * @param Custom 10 References
 * @desc Custom(10)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 10 Unit
 * @desc Custom(10)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 11--
 * @default
 * 
 * @param Custom 11 Display Name
 * @desc Custom(11)の表示名を設定します
 * @default 
 * 
 * @param Custom 11 References
 * @desc Custom(11)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 11 Unit
 * @desc Custom(11)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 12--
 * @default
 * 
 * @param Custom 12 Display Name
 * @desc Custom(12)の表示名を設定します
 * @default 
 * 
 * @param Custom 12 References
 * @desc Custom(12)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 12 Unit
 * @desc Custom(12)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 13--
 * @default
 * 
 * @param Custom 13 Display Name
 * @desc Custom(13)の表示名を設定します
 * @default 
 * 
 * @param Custom 13 References
 * @desc Custom(13)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 13 Unit
 * @desc Custom(13)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 14--
 * @default
 * 
 * @param Custom 14 Display Name
 * @desc Custom(14)の表示名を設定します
 * @default 
 * 
 * @param Custom 14 References
 * @desc Custom(14)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 14 Unit
 * @desc Custom(14)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 15--
 * @default
 * 
 * @param Custom 15 Display Name
 * @desc Custom(15)の表示名を設定します
 * @default 
 * 
 * @param Custom 15 References
 * @desc Custom(15)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 15 Unit
 * @desc Custom(15)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 16--
 * @default
 * 
 * @param Custom 16 Display Name
 * @desc Custom(16)の表示名を設定します
 * @default 
 * 
 * @param Custom 16 References
 * @desc Custom(16)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 16 Unit
 * @desc Custom(16)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 17--
 * @default
 * 
 * @param Custom 17 Display Name
 * @desc Custom(17)の表示名を設定します
 * @default 
 * 
 * @param Custom 17 References
 * @desc Custom(17)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 17Unit
 * @desc Custom(17)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 18--
 * @default
 * 
 * @param Custom 18 Display Name
 * @desc Custom(18)の表示名を設定します
 * @default 
 * 
 * @param Custom 18 References
 * @desc Custom(18)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 18 Unit
 * @desc Custom(18)の単位を設定します。
 * @default 
 * 
 * @param --Custom Param 19--
 * @default
 * 
 * @param Custom 19 Display Name
 * @desc Custom(19)の表示名を設定します
 * @default 
 * 
 * @param Custom 19 References
 * @desc Custom(19)の値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Custom 19 Unit
 * @desc Custom(19)の単位を設定します。
 * @default 
 * 
 * @param --カスタムゲージの設定--
 * @default
 * 
 * @param Gauge Param Digit
 * @desc 現在値と最大値の表示幅を指定した桁数に設定する
 * @default 4
 * 
 * @param --Gauge Param 0--
 * @default
 * 
 * @param Gauge 0 Display Name
 * @desc Gauge(0)の表示名を設定します
 * @default \C[16]EXP
 * 
 * @param Gauge 0 References
 * @desc Gauge(0)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 0 Current
 * @desc Gauge(0)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.isMaxLevel() ? '--------' : a.currentExp()
 * 
 * @param Gauge 0 Max
 * @desc Gauge(0)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.isMaxLevel() ? '--------' : a.nextLevelExp()
 * 
 * @param Gauge 0 Color1
 * @desc Gauge(0)のゲージの色1を設定します。
 * @default 17
 * 
 * @param Gauge 0 Color2
 * @desc Gauge(0)のゲージの色2を設定します。
 * @default 6
 * 
 * @param --Gauge Param 1--
 * @default
 * 
 * @param Gauge 1 Display Name
 * @desc Gauge(1)の表示名を設定します
 * @default 
 * 
 * @param Gauge 1 References
 * @desc Gauge(1)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 1 Current
 * @desc Gauge(1)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 1 Max
 * @desc Gauge(1)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 1 Color1
 * @desc Gauge(1)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 1 Color2
 * @desc Gauge(1)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 2--
 * @default
 * 
 * @param Gauge 2 Display Name
 * @desc Gauge(2)の表示名を設定します
 * @default 
 * 
 * @param Gauge 2 References
 * @desc Gauge(2)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 2 Current
 * @desc Gauge(2)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 2 Max
 * @desc Gauge(2)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 2 Color1
 * @desc Gauge(2)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 2 Color2
 * @desc Gauge(2)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 3--
 * @default
 * 
 * @param Gauge 3 Display Name
 * @desc Gauge(3)の表示名を設定します
 * @default 
 * 
 * @param Gauge 3 References
 * @desc Gauge(3)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 3 Current
 * @desc Gauge(3)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 3 Max
 * @desc Gauge(3)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 3 Color1
 * @desc Gauge(3)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 3 Color2
 * @desc Gauge(3)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 4--
 * @default
 * 
 * @param Gauge 4 Display Name
 * @desc Gauge(4)の表示名を設定します
 * @default 
 * 
 * @param Gauge 4 References
 * @desc Gauge(4)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 4 Current
 * @desc Gauge(4)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 4 Max
 * @desc Gauge(4)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 4 Color1
 * @desc Gauge(4)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 4 Color2
 * @desc Gauge(4)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 5--
 * @default
 * 
 * @param Gauge 5 Display Name
 * @desc Gauge(5)の表示名を設定します
 * @default 
 * 
 * @param Gauge 5 References
 * @desc Gauge(5)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 5 Current
 * @desc Gauge(5)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 5 Max
 * @desc Gauge(5)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 5 Color1
 * @desc Gauge(5)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 5 Color2
 * @desc Gauge(5)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 6--
 * @default
 * 
 * @param Gauge 6 Display Name
 * @desc Gauge(6)の表示名を設定します
 * @default 
 * 
 * @param Gauge 6 References
 * @desc Gauge(6)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 6 Current
 * @desc Gauge(6)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 6 Max
 * @desc Gauge(6)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 6 Color1
 * @desc Gauge(6)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 6 Color2
 * @desc Gauge(6)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 7--
 * @default
 * 
 * @param Gauge 7 Display Name
 * @desc Gauge(7)の表示名を設定します
 * @default 
 * 
 * @param Gauge 7 References
 * @desc Gauge(7)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 7 Current
 * @desc Gauge(7)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 7 Max
 * @desc Gauge(7)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 7 Color1
 * @desc Gauge(7)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 7 Color2
 * @desc Gauge(7)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 8--
 * @default
 * 
 * @param Gauge 8 Display Name
 * @desc Gauge(8)の表示名を設定します
 * @default 
 * 
 * @param Gauge 8 References
 * @desc Gauge(8)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 8 Current
 * @desc Gauge(8)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 8 Max
 * @desc Gauge(8)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 8 Color1
 * @desc Gauge(8)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 8 Color2
 * @desc Gauge(8)のゲージの色2を設定します。
 * @default 
 * 
 * @param --Gauge Param 9--
 * @default
 * 
 * @param Gauge 9 Display Name
 * @desc Gauge(9)の表示名を設定します
 * @default 
 * 
 * @param Gauge 9 References
 * @desc Gauge(9)で表示する値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 9 Current
 * @desc Gauge(9)の現在値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 9 Max
 * @desc Gauge(9)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default 
 * 
 * @param Gauge 9 Color1
 * @desc Gauge(9)のゲージの色1を設定します。
 * @default 
 * 
 * @param Gauge 9 Color2
 * @desc Gauge(9)のゲージの色2を設定します。
 * @default 
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 当プラグインは、アクターのステータス表示のレイアウトをより詳細に設定できる
 * 処理を実装します。
 * 
 * 当プラグインの拡張プラグイン(FTKR_CSS_***.js)と組み合わせることで
 * メニュー画面や、バトル画面などさまざまなステータス画面を設定できるように
 * なります。
 * 
 * 
 * また、トリアコンタンさん製作のGraphicalDesignMode.jsを使って
 * 拡張プラグインのステータス表示のレイアウトをゲーム画面上で変更できます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. 拡張プラグインと組み合わせる場合は、当プラグインが上になるように
 *    配置してください。
 * 
 * 3. GraphicalDesignMode.jsと組み合わせる場合は、
 *    本プラグインが下になるように配置してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクターの簡易ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、アクターのステータスの表示レイアウトを
 * 変更することができます。
 * この仕様は、当プラグインの拡張プラグインで共通です。
 * 
 * <Actor Status Text1>
 * <Actor Status Text2>
 * <Actor Status Text3>
 *    :ステータスウィンドウは、表示の処理を縦に3分割で分けています。
 *    :Text1~Text3が、それぞれ左側、中央、右側の表示に相当します。
 *    :各パラメータに入力したステータスが、それぞれの部位で表示します。
 *    :
 *    :入力できるパラメータ名は、
 *    :face(x), chara, sv, name, class, nickname, hp, mp, tp, level, 
 *    :state, state2(x), profile, param(x), custom(x), gauge(x), 
 *    :equip(x), text(x), image, eparam(x), agauge(x), cgauge(x)
 *    :eval(x), streval(x), eaop(x) です。
 *    :
 *    :face, face(x) -
 *    : 顔画像を表示します。
 *    : x を数値で指定すると、x行分に画像を拡大収縮して表示します。
 *    : デフォルトサイズは 4行分です。
 *    :
 *    :state, state2(x) - 
 *    : アクターが付与されているステートを並べて表示します。
 *    :
 *    :profile - 
 *    : アクターのプロフィール文を表示します。
 *    : 制御文字が使用できます。
 *    :
 *    :param(x) -
 *    : x は 0 ~ 7 の値を指定します。
 *    : 指定した x の値に従い、下記のパラメータを表示します。
 *    : 0 - 最大HP、1 - 最大MP、2 - 攻撃力、3 - 防御力、4 - 魔法攻撃、
 *    : 5 - 魔法防御、6 - 敏捷性、7 - 運
 *    : パラメータの名称は、データベースの用語で登録した文字列を使用します。
 *    :
 *    :custom(x) -
 *    : x は 0 ~ 19 の値を指定します。
 *    : プラグインパラメータの Custom Param x で設定したパラメータを表示します。
 *    :
 *    :gauge(x) -
 *    : x は 0 ~ 9 の値を指定します。
 *    : プラグインパラメータの Gauge Param x で設定したパラメータを表示します。
 *    :
 *    :equip(x) -
 *    : x は 装備タイプを指定します。
 *    : 該当する装備タイプの武器・防具のアイコンおよび名前を表示します。
 *    : 装備していない場合は、空欄を表示します。
 *    :
 *    :text(x) -
 *    : 文字列 x を表示します。
 *    : 制御文字が使用できます。
 *    : なお、x はパラメータの参照コードを入力することが可能です。
 *    : 例) text($dataItems[1].name) で、アイテムID1の名前を表示
 *    :
 *    :image - 
 *    : アクターのメモ欄で設定したカスタム画像を表示します。
 *    :
 *    :eparam(x) -
 *    : 装備画面にて使用可能な、パラメータ表示用コードです。
 *    : 選択したアイテムを装備した時のパラメータを表示します。
 *    : x は 0 ~ 7 の値で、下記のパラメータを指定します。
 *    : 0 - 最大HP、1 - 最大MP、2 - 攻撃力、3 - 防御力、4 - 魔法攻撃、
 *    : 5 - 魔法防御、6 - 敏捷性、7 - 運
 *    : 矢印記号は、プラグインパラメータ<Equip Right Arror>で変更できます。
 *    :
 *    :eaop(x) -
 *    : 装備画面にて使用可能な、AOPパラメータ(*)表示用コードです。
 *    : 選択したアイテムを装備した時のパラメータを表示します。
 *    : AOPパラメータとは、FTKR_AddOriginalParameters.js により作成した
 *    : オリジナルパラメータのことです。
 *    : x は AOOPパラメータIDを指定します。
 *    : 矢印記号は、プラグインパラメータ<Equip Right Arror>で変更できます。
 *    :
 *    :agauge(x) - 
 *    : アクターのメモ欄で設定したカスタムゲージを表示します。
 *    :
 *    :cgauge(x) - 
 *    : クラスのメモ欄で設定したカスタムゲージを表示します。
 *    :
 *    :eval(x) - 
 *    : JS計算式 x を評価して、その結果を数値で表示します。
 *    :
 *    :streval(x) - 
 *    : JS計算式 x を評価して、その結果を文字列で表示します。
 *    :
 *    :カンマ(,)で区切って複数のパラメータを入力した場合は、
 *    :行を変えてそれぞれのパラメータを表示します。
 *    :表示に必要な行数は、 faceが4、charaとsvが2、それ以外が1行です。
 *    :
 *    :角括弧[]を使用することで、複数のステータスを1つの行内に表示する
 *    :ことができます。
 *    :角括弧内では、スラッシュ(/)でパラメータを区切ってください。
 *    :入力例)
 *    : class,[hp/mp],tp
 *    :  - 1行目にクラス名を表示し、2行目にHPとMPを表示、3行目にTPを表示する。
 *    :
 *    :波括弧{}を使用することで、括弧内のステータスをすべての列を使用して
 *    :表示させることができます。
 *    :入力例) Text1に以下を入力
 *    : {name},hp,mp
 *    :  - 1行目すべて(Text1~Text3の表示エリア)を使ってアクター名を表示し
 *    :    2行目と3行目はText1の表示エリア内で表示します。
 * 
 * <Actor Status Space>
 *    :各Textの間隔をカンマ(,)で区切って指定します。単位はpixelです。
 *    :入力例)
 *    : 10,20,30,40
 *    : - 左端からText1までの間隔を10、Text1とText2の間隔を20、
 *    :   Text2とText3の間隔を30、Text3から右端までの間隔を40に設定します。
 * 
 * <Actor Status Space In Text>
 *    :角括弧[]を使用して、複数のステータスを1つのText内に表示した場合の間隔を
 *    :指定します。単位はpixelです。
 * 
 * <Actor Status Width Rate>
 *    :ウィンドウを3分割する場合に、Text1~Text3の表示エリアをどのような比率で
 *    :確保するか設定します。
 *    :それぞれの比率を、カンマ(,)で区切って入力します。
 *    : 0 を入力した部位は、表示しません。
 *    :入力例)
 *    : 1,1,1 - 3等分します。それぞれの表示サイズは同じです。
 *    : 1,1,0 - Text1とText2だけで2等分します。Text3のサイズは 0 になり
 *    :         表示しません。
 *    : 2,1,1 - Text1で全体の半分を使用します。
 *    :         Text2とText3で残りの半分を2等分します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 顔画像の設定 [ face ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'face'を入力した場合
 * アクターの顔画像を表示します。
 * 顔画像について、以下のパラメータで設定を変更できます。
 * 
 * <Face Position X>
 *    :アクターの顔画像を描画エリアのどの位置に表示するか設定します。
 *    :0 - 左寄せ, 1 - 中央(デフォルト), 2 - 右寄せ
 *    :描画エリアの幅が、顔画像の表示幅よりも大きい場合に機能します。
 *    :また、波括弧を使って描画エリアを拡張した場合にも有効です。
 * 
 * 
 *-----------------------------------------------------------------------------
 * キャラクタ画像の設定 [ chara ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'chara'を入力した場合
 * アクターのキャラクタ画像(歩行キャラ)を表示します。
 * キャラクタ画像について、以下のパラメータで設定を変更できます。
 * 
 * <Chara Image Width>
 * <Chara Image Height>
 *    :アクターのキャラクタ画像のサイズを設定します。
 *    :標準では48*48の画像を使用していますが、それ以外のサイズの
 *    :キャラ画像を使用している場合に、設定値を変えてください。
 * 
 * <Chara Position X>
 *    :アクターのキャラクタ画像を描画エリアのどの位置に表示するか設定します。
 *    :0 - 左寄せ, 1 - 中央(デフォルト), 2 - 右寄せ
 * 
 * <Chara Direction>
 *    :アクターのキャラクタ画像の向きを設定します。
 *    :0 - 正面固定, 1 - マップ上の先頭プレイヤーの向き
 * 
 * 
 *-----------------------------------------------------------------------------
 * SVキャラクタ画像の設定 [ sv ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'sv'を入力した場合
 * アクターのSVキャラクタ画像(SV戦闘キャラ)を表示します。
 * SVキャラクタ画像について、以下のパラメータで設定を変更できます。
 * 
 * <Sv Image Width>
 * <Sv Image Height>
 *    :アクターのSVキャラクタ画像のサイズを設定します。
 *    :標準では64*64の画像を使用していますが、それ以外のサイズの
 *    :キャラ画像を使用している場合に、設定値を変えてください。
 * 
 * <Sv Position X>
 *    :アクターのSVキャラクタ画像を描画エリアのどの位置に表示するか設定します。
 *    :0 - 左寄せ, 1 - 中央(デフォルト), 2 - 右寄せ
 * 
 * <Enabled Sv Motion>
 *    :アクターのSVキャラクタ画像のモーションを有効にするか設定します。
 *    :0 - 無効, 1 - 有効, 2 - 戦闘時以外有効
 *    :無効にした場合は、モーションを表示しません。
 *    :表示する画像は、画像ファイル内の左上のSVキャラクタ画像で固定です。
 *    :フロントビューモードの場合は、強制的に無効になります。
 * 
 * <Sv Image Motion>
 *    :標準で表示するモーションを設定します。
 *    :入力するパラメータ名は、以下から選択できます。
 *    : walk, wait, chant, guard, damage, evade, thrust, swing,
 *    : missile, skill, spell, item, escape, victory, dying,
 *    : abnormal, sleep, dead
 * 
 * <Enabled State Motion>
 *    :ステートモーションを有効にするか設定します。
 *    :0 - 無効, 1 - 有効
 *    :状態異常、戦闘不能、睡眠になっているキャラは、そのステートの
 *    :モーションが表示されます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ステートの設定 [ state/state2(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'state'を入力した場合
 * アクターのステートを表示します。
 * 
 * state     - 横に並べられるだけ表示します。
 * state2(x) - 縦に x 行分表示します。(Enable CSS Statesが有効の場合のみ)
 * 
 * 並べきれないアイコンは、切り替え時間に合わせて表示が替わります。
 * 
 * 
 * 以下のパラメータで設定を変更できます。
 * <Enable CSS States>
 *    :ステートアイコンの表示について当プラグインの専用描画処理を有効にするか
 *    :設定します。
 *    :有効にすると、以下のプラグインの設定に従いステートアイコンを表示します。
 *    :無効の場合はMVのデフォルトの描画処理を使用します。
 * 
 * <Animation Wait>
 *    :ステートアイコンの切り替え時間を指定します。
 * 
 * <Enable Overlap>
 *    :ステートアイコンの重なり表示を有効にする。
 *    :0 - 無効, 1 - 有効
 *    :有効にすると、アイコンを重ねて表示させることで
 *    :一度に表示できるアイコン数を増やします。
 * 
 * <Overlap Rate>
 *    :ステートアイコンの重なり表示を有効にした場合に、
 *    :アイコンサイズの重なりの許容できる比率を指定します。
 *    : 0 ~ 1 の値を設定してください。
 * 
 * <Enable Auto Scale>
 *    :行の高さに合わせてアイコンサイズを縮小するか。
 *    :0 - 無効, 1 - 有効
 *    :アイコンサイズ以上に拡大はしません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムパラメータの設定 [ custom(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'custom(x)'を入力した場合
 * <Custom Param x>で設定したパラメータを表示することができます。
 * カスタムパラメータは、最大で20種類設定できます。
 * 
 * <Custom x Display Name>
 *    :パラメータの表示名を設定します。
 *    :表示名には制御文字が使用できます。
 * 
 * <Custom x References>
 *    :パラメータの値の参照先をeval値で設定します。
 * 
 * <Custom x Unit>
 *    :パラメータの値の単位を設定します。
 *    :単位には制御文字が使用できます。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 命中率のような百分率の値の場合、'a.hit'のように記述すると少数で表示します。
 * そのため、'a.hit * 100'や、'Math.parcent(a.hit)'などと記述して
 * 整数に変換するようにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタムゲージの設定 [ gauge(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'gauge(x)'を入力した場合
 * <Gauge Param x>で設定したゲージを表示することができます。
 * カスタムゲージは、最大で10種類設定できます。
 * 
 * １．共通設定
 * <Gauge Param Digit>
 *    :現在値と最大値の表示幅を指定した桁数に設定します。
 *    :この桁数以上の値の場合、横に圧縮して表示します。
 * 
 * ２．個別設定
 * <Gauge x Display Name>
 *    :ゲージの表示名を設定します。
 *    :表示名には制御文字が使用できます。
 *    :表示名を設定しない場合、ゲージの現在値と最大値の数値を表示しません。
 * 
 * <Gauge x References>
 *    :ゲージで表示する値の参照先をeval値で設定します。
 *    :この値を設定すると、現在値と最大値は表示しません。
 * 
 * <Gauge x Current>
 *    :ゲージの現在値の参照先をeval値で設定します。
 * 
 * <Gauge x Max>
 *    :ゲージの最大値の参照先をeval値で設定します。
 *    :最大値の数値は、描画エリアの幅が足りない場合には表示しません。
 * 
 * <Gauge x Color1>
 * <Gauge x Color2>
 *    :ゲージの色1と色2を設定します。
 *    :色1と色2の値を変えることで、HPゲージのようにグラデーションになります。
 *    :-1 を指定すると、ゲージバーが非表示になります。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 命中率のような百分率の値の場合、'a.hit'のように記述すると少数で表示します。
 * そのため、'a.hit * 100'や、'Math.parcent(a.hit)'などと記述して
 * 整数に変換するようにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * カスタム画像を表示する [ image / image(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'image' または 'image(x)'を
 * 入力した場合、以下のタグをアクターのメモ欄に追記することで、指定した画像を
 * 表示することができます。
 * 画像は複数登録することができます。
 * 
 *    image    - 最初に登録した画像を表示します。
 *    image(x) - 画像を登録した順番に x = 0,1,2,... と指定します。
 *               この番号をカスタム画像IDと呼びます。
 * 
 * <CSS_画像:ImageName>
 * code
 * </CSS_画像>
 *    :ImageName - 表示させたい画像名を入力します。(*1)
 * 
 * または
 * <CSS_IMAGE:ImageName>
 * code
 * </CSS_IMAGE>
 * 
 * (*1)画像は、プロジェクトフォルダ内の/img/pictures/に保存してください。
 * 
 * [code に使用できる項目]
 * 以下のタグで、画像を四角に切り取って表示(トリミング)することができます。
 * 
 * Bgi offset X: n
 *    :画像ファイルを四角に切り取る時の左上のX座標を入力します。
 *    :指定しない場合は 0 になります。
 * 
 * Bgi offset Y: n
 *    :画像ファイルを四角に切り取る時の左上のY座標を入力します。
 *    :指定しない場合は 0 になります。
 * 
 * Bgi width: n
 *    :画像ファイルを四角に切り取る時の幅を入力します。
 *    :指定しない場合は 画像のサイズ になります。
 * 
 * Bgi height: n
 *    :画像ファイルを四角に切り取る時の高さを入力します。
 *    :指定しない場合は 画像のサイズ になります。
 * 
 * Bgi scale: n
 *    :画像ファイルを表示するときの拡大率(%)を入力します。
 *    :指定しない場合は原寸サイズで表示します。(原寸サイズ = 100)
 * 
 * 
 * 指定した画像は、以下のプラグインパラメータで設定を変更できます。
 * 
 * <Image Position X>
 *    :指定した画像を描画エリアのどの位置に表示するか設定します。
 *    :0 - 左寄せ, 1 - 中央(デフォルト), 2 - 右寄せ
 *    :描画エリアの幅が、顔画像の表示幅よりも大きい場合に機能します。
 *    :また、波括弧を使って描画エリアを拡張した場合にも有効です。
 * 
 * 
 * なお、設定したカスタム画像は、以下のプラグインコマンドを実行することで
 * ゲーム中に変更できます。
 * ※[]は実際の入力に使用しません
 * 
 * CSS_カスタム画像変更 [アクター または パーティー] [アクターID または パーティー順番] [カスタム画像ID] [画像名] [X座標] [Y座標] [幅] [高さ] [拡大率]
 * CSS_CHANGE_CUSTOM_IMAGE [ACTOR or PARTY] [actorID or partyNumber] [customImageID] [imageName] [offsetX] [offsetY] [width] [height] [scale]
 * 
 *    アクター または パーティー(ACTOR or PARTY)
 *      ：変更したい対象アクターの指定方法を選択します。
 *        いずれかの文字列を記載してください。
 * 
 *    アクターID または パーティー順番(actorID or partyNumber)
 *      ：上記で設定した指定方法に合わせて
 *        アクターIDかパーティー順番の番号を入力します。
 *        なお、パーティー順番は、先頭キャラを 0番と数えます。
 *        \v[n]で変数を指定することも可能です。
 * 
 *    カスタム画像ID(customImageID)
 *      ：変更したいカスタム画像IDを設定します。
 *        \v[n]で変数を指定することも可能です。
 * 
 *    画像名(imageName)
 *      ：変更する画像ファイル名を文字列で設定します。
 *        画像は、プロジェクトフォルダ内の/img/pictures/に保存してください。
 *        なお、このファイルはディプロイメントの「未使用ファイルを含まない」の対象外です。
 *        別途イベントでピクチャとして登録しておくなど、回避手段を講じてください。
 * 
 *    X座標(offsetX)
 *    Y座標(offsetY)
 *    幅(width)
 *    高さ(height)
 *    拡大率(scale)
 *      ：画像ファイルの表示設定を変更します。
 *        アクターのメモ欄の設定方法と同じです。
 *        変更しない場合は、-1 と入力します。
 *        \v[n]で変数を指定することも可能です。
 * 
 * 入力例）
 * ◆プラグインコマンド：CSS_カスタム画像変更 アクター 1 0 Package1_2 -1 -1 -1 -1 50
 * 
 * このコマンドで、アクターID 1 のカスタム画像ID 0 の画像を
 * /img/pictures/Package1_2.png に変更した上で
 * トリミングサイズは変更せず、拡大率を 50% に設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * アクター別のカスタムゲージの設定 [ agauge(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'agauge(x)'を入力した場合
 * アクターのメモ欄で設定したゲージを表示することができます。
 * 現在値と最大値の表示桁数はカスタムゲージの設定を使用します。
 * 
 * 使用する場合は、以下のタグをアクターのメモ欄に追記してください。
 * 
 * <CSS_カスタム:x>
 * code
 * </CSS_カスタム>
 * 
 * または
 * 
 * <CSS_CUSTOM:x>
 * code
 * </CSS_CUSTOM>
 * 
 * [code に使用できる項目]
 * 表示名: y
 * NAME: y
 *    :ゲージの表示名を y に設定します。
 *    :表示名には制御文字が使用できます。
 *    :表示名を設定しない場合、ゲージの現在値と最大値の数値を表示しません。
 * 
 * 参照先: eval
 * REFERENCES: eval
 *    :ゲージで表示する値の参照先をeval値で設定します。
 *    :この値を設定すると、現在値と最大値は表示しません。
 * 
 * 現在値: eval
 * CURRENT: eval
 *    :ゲージの現在値の参照先をeval値で設定します。
 * 
 * 最大値: eval
 * MAX: eval
 *    :ゲージの最大値の参照先をeval値で設定します。
 *    :最大値の数値は、描画エリアの幅が足りない場合には表示しません。
 * 
 * 色: y1,y2
 * COLOR: y1,y2
 *    :ゲージの色1を y1 に、色2を y2 に設定します。
 *    :色1と色2の値を変えることで、HPゲージのようにグラデーションになります。
 *    :-1 を指定すると、ゲージバーが非表示になります。
 * 
 * [eval の値について]
 * eval部は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
 * 使用することができます。以下のコードを使用できます。
 *  a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 *  v[x]    - 変数ID x の値を参照します。
 *  s[x]    - スイッチID x の値を参照します。
 * 
 * 命中率のような百分率の値の場合、'a.hit'のように記述すると少数で表示します。
 * そのため、'a.hit * 100'や、'Math.parcent(a.hit)'などと記述して
 * 整数に変換するようにします。
 * 
 * 
 *-----------------------------------------------------------------------------
 * クラス別のカスタムゲージの設定 [ cgauge(x) ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'cgauge(x)'を入力した場合
 * クラスのメモ欄で設定したゲージを表示することができます。
 * 現在値と最大値の表示桁数はカスタムゲージの設定を使用します。
 * 
 * 使用する場合は、以下のタグをアクターのメモ欄に追記してください。
 * code部の仕様は、アクター別のカスタムゲージと同じです。
 * 
 * <CSS_カスタム:x>
 * code
 * </CSS_カスタム>
 * 
 * または
 * 
 * <CSS_CUSTOM:x>
 * code
 * </CSS_CUSTOM>
 * 
 * 
 *-----------------------------------------------------------------------------
 * GraphicalDesignMode.jsと連動したGUIベース画面設定
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
 * 補足情報
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

(function() {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_CustomSimpleActorStatus');

    //オリジナルステータス設定オブジェクト
    FTKR.CSS.cssStatus = {
        face:{
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
            enable:Number(parameters['Enable CSS States'] || 0),
            wait:Number(parameters['Animation Wait'] || 0),
            overlap:Number(parameters['Enable Overlap'] || 0),
            autoScale:Number(parameters['Enable Auto Scale'] || 0),
            rate:Number(parameters['Overlap Rate'] || 0),
        },
        equip:{
            arrow:String(parameters['Equip Right Arrow'] || ''),
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

    var convertTextWidth = function(text) {
        var tw = 0;
        var window = SceneManager._scene._windowLayer.children[0];
        if (!window) return tw;
        var conv = window.convertEscapeCharacters(text);
        var reg = /i\[(\d+)\]/i
        while (reg.test(conv)) {
            conv = (conv.toUpperCase()).replace(reg, '');
            tw += Window_Base._iconWidth + 4;
        }
        if (/c\[(\d+)\]/i.test(conv)) {
            conv = (conv.toUpperCase()).replace(/c\[(\d+)\]/ig, '');
        }
        if (conv.match(/lw\[(\d+),?([^\]]+)\]/i)) {
            tw += RegExp.$1;
            conv = (conv.toUpperCase()).replace(/lw\[(\d+),?([^\]]+)\]/ig, '');
        }
        tw += window.textWidth(conv);
        return tw;
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

    FTKR.CSS.Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        FTKR.CSS.Scene_Map_start.call(this);
        BattleManager._escaped = false;
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    FTKR.CSS.DatabaseLoaded = false;
    FTKR.CSS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!FTKR.CSS.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!FTKR.CSS.DatabaseLoaded) {
            this.cssActorImageNotetags($dataActors);
            this.cssCustomParamNotetags($dataActors);
            this.cssCustomParamNotetags($dataClasses);
            FTKR.CSS.DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.cssActorImageNotetags = function(group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.cssbgi = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['CSS_画像', 'CSS_IMAGE']);
            this.readCssBgiMetaDatas(obj, datas);
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
        _CSS_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/CSS_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'カスタム画像変更':
            case 'CHANGE_CUSTOM_IMAGE':
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
                if (!actor) break;
                actor.setupCssbgi(
                    setArgNum(args[2]),
                    setArgStr(args[3]),
                    setArgNum(args[4]),
                    setArgNum(args[5]),
                    setArgNum(args[6]),
                    setArgNum(args[7]),
                    setArgNum(args[8])
                );
                break;
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    FTKR.CSS.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        FTKR.CSS.Game_Actor_levelUp.call(this);
        if (!this._levelUpCount) this._levelUpCount = 0;
        this._levelUpCount += 1;
    };

    FTKR.CSS.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        FTKR.CSS.Game_Actor_setup.call(this, actorId);
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

    FTKR.CSS.Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        FTKR.CSS.Window_Base_initialize.call(this, x, y, width, height);
        this.sprite = [];
        this._stateIconSprite = [];
        this._faceSprite = [];
    };

    Window_Base.prototype.clearCssSprite = function(index) {
        if (this.sprite[index]) {
            this.sprite[index].setBattler();
            this._stateIconSprite[index].forEach( function(sprite){
                sprite.setup();
            });
        }
    };

    Window_Base.prototype.showActorNum = function() {
        return this.maxPageItems ? this.maxPageItems() : 1;
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
        if (!lss) lss = FTKR.CSS.simpleStatus;
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
            this.drawCssActorStatusText(index, actor, axs[i], y, aws[i], status[i], lss);
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
    Window_Base.prototype.drawCssActorStatusText = function(index, actor, x, y, width, statusnames, lss) {
        var dy = this.lineHeight();
        var line = 0;
        statusnames.forEach( function(status) {
            line += this.drawCssActorStatusBases(index, actor, x, y + dy * line, width, status, lss);
        },this);
    };

    Window_Base.prototype.drawCssActorStatusBases = function(index, actor, x, y, width, status, lss) {
        if (status.match(/^\{(.+)\}$/i)) {
            status = RegExp.$1;
            width = this._dispWidth;
        }
        var statuses = status.match(/^\[(.+)\]$/i) ? RegExp.$1.split('/') : [status];
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
        var match = /([^\(]+)\((.+)\)/.exec(status);
        if (match) {
            return this.drawCssActorStatusBase_A(index, actor, x, y, width, match, lss, css);
        } else {
            if (!actor) return 1;
            return this.drawCssActorStatusBase_B(index, actor, x, y, width, status, lss, css);
        }
    };

    // 括弧で表示する内容を指定する表示コード
    Window_Base.prototype.drawCssActorStatusBase_A = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'STREVAL':
                return this.drawCssEval(actor, x, y, width, match[2], false);
            case 'EVAL':
                return this.drawCssEval(actor, x, y, width, match[2], true);
            case 'TEXT':
                return this.drawCssText(actor, x, y, width, match[2]);
            default:
                if (!actor) return 1;
                match[2] = this.evalCssCustomFormula(actor, match[2]);
                return this.drawCssActorStatusBase_A1(index, actor, x, y, width, match, lss, css);
        }
    };

    // 括弧で表示する内容を指定する表示コード(括弧内をevalで計算させる場合)
    Window_Base.prototype.drawCssActorStatusBase_A1 = function(index, actor, x, y, width, match, lss, css) {
        switch(match[1].toUpperCase()) {
            case 'EPARAM':
                return this.drawCssActorEquipParam(actor, x, y, width, match[2], lss);
            case 'EAOP':
                return this.drawCssActorEquipAopParam(actor, x, y, width, match[2], lss);
            case 'AGAUGE':
                return this.drawCssActorCustomGauge(actor, x, y, width, match[2]);
            case 'CGAUGE':
                return this.drawCssClassCustomGauge(actor, x, y, width, match[2]);
            case 'PARAM':
                return this.drawCssActorParam(actor, x, y, width, match[2]);
            case 'CUSTOM':
                return this.drawCssActorCustom(actor, x, y, width, css.customs[match[2]]);
            case 'GAUGE':
                return this.drawCssActorGauge(actor, x, y, width, css.gauges[match[2]]);
            case 'EQUIP':
                return this.drawCssActorEquip(actor, x, y, width, match[2]);
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
            case 'FACE':
                return this.drawCssActorFace(actor, x, y, width, lss);
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
        var len = Math.min(width, height);
        var dh = len || Window_Base._faceHeight;
        var dw = len || Window_Base._faceWidth;
        var offsetX = this.cssFacePositionX(actor) * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        var bitmap = ImageManager.loadFace(actor.faceName());
        var sw = Window_Base._faceWidth;
        var sh = Window_Base._faceHeight;
        var sx = actor.faceIndex() % 4 * sw;
        var sy = Math.floor(actor.faceIndex() / 4) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_Base.prototype.cssFacePositionX = function(actor) {
        return FTKR.CSS.cssStatus.face.posiX;
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
        index = index % this.showActorNum();
        var iconSprites = this._stateIconSprite[index];
        if (!iconSprites) {
            iconSprites = [];
        }
        if(css.autoScale) {
            var scale = this.iconScale();
            iw = iw * scale;
        }
        var maxlen = line ? this.lineHeight() * line : width;
        var offset = css.overlap ? this.getOverlapValue(actor, iw, maxlen, css) : iw;
        var showNum = Math.min(Math.floor((maxlen - 4) / offset));
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
        var diff = Math.max((maxlen - iw - 4) / (iconlen - 1), iw * css.rate);
        return diff && diff < iw ? diff : iw;
    };

    Window_Base.prototype.iconOverlapOffset = function(iw, number, width, vartical) {
        var len = vartical ? (number - 1) * this.lineHeight() + 4 : width - iw - 4;
        var diff = number > 1 ? len / (number - 1) : 0;
        return diff < iw ? diff : iw;
    };

    Window_Base.prototype.iconScale = function() {
        var iw = Window_Base._iconWidth;
        return Math.min(Math.max(this.lineHeight() - 4, 0) / iw, 1);
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_Base.prototype.drawCssIcon = function(iconIndex, x, y, scale, auto) {
        scale = scale || 1;
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        if (auto) scale = Math.min(Math.max(this.lineHeight() - 4, 0) / pw, 1);
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
    //カスタムパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorCustom = function(actor, x, y, width, custom) {
        if (!custom) return 1;
        var name = custom.name || '';
        var formula = custom.formula || '';
        var unit = custom.unit || '';
        var tux = convertTextWidth(unit);
        var value = this.evalCssCustomFormula(actor, formula);
        this.changeTextColor(this.systemColor());
        var tx = convertTextWidth(name, x, y);
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
        var tx = convertTextWidth(gauge.name, x, y);
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
    Window_Base.prototype.drawCssActorEquip = function(actor, x, y, width, equipId) {
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
        var bitmap = ImageManager.loadPicture(bgi.name);
        if (!bitmap) return 1;
        var sw = bgi.width || bitmap.width;
        var sh = bgi.height || bitmap.height;
        var sx = bgi.offsetX || 0;
        var sy = bgi.offsetY || 0;
        console.log(bgi);
        var dh = sh * bgi.scale / 100;
        var dw = sw * bgi.scale / 100;
        var offsetX = FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        return Math.ceil(dh / this.lineHeight()) || 1;
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時のパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipParam = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 0;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        if(this.checkShowEquipParam(actor, target)) {
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
    //指定したアイテムを装備した時のAOPパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipAopParam = function(actor, x, y, width, paramId, lss) {
        if (!Imported.FTKR_AOP) return 1;
        if (paramId < 0 && FTKR.AOP.useParamNum > 7) return 1;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        if(this.checkShowEquipParam(actor, target)) {
            var newValue = target.aopParam(paramId);
            var diffvalue = newValue - actor.aopParam(paramId);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            this.drawText(newValue, x, y, width, 'right');
        }
        return 1;
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

    FTKR.CSS.Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        FTKR.CSS.Scene_Base_start.call(this);
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
            this._css_spacing = 0;
            this._css_fontSize = lss.fontSize;
            this._css_numVisibleRows = lss.numVisibleRows;
            this._css_padding = lss.padding;
            this._css_lineHeight = lss.lineHeight;
            this._css_opacity = lss.opacity;
            this._css_hideFrame = lss.hideFrame;
        }
        this._lssStatus = this.standardCssStatus();
    };

    Window_Base.prototype.standardCssLayout = function() {
        return {};
    }

    Window_Base.prototype.standardCssStatus = function() {
        return {};
    };

    var _CSS_Window_Base_numVisibleRows = Window_Base.prototype.numVisibleRows;
    Window_Base.prototype.numVisibleRows = function() {
        return this._css_numVisibleRows ? this._css_numVisibleRows :
            _CSS_Window_Base_numVisibleRows.call(this);
    };

    var _CSS_Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
    Window_Base.prototype.standardFontSize = function() {
        return this._css_fontSize ? this._css_fontSize : _CSS_Window_Base_standardFontSize.call(this);
    };

    var _CSS_Window_Base_standardPadding = Window_Base.prototype.standardPadding;
    Window_Base.prototype.standardPadding = function() {
        return this._css_padding ? this._css_padding : _CSS_Window_Base_standardPadding.call(this);
    };

    var _CSS_Window_Base_lineHeight = Window_Base.prototype.lineHeight;
    Window_Base.prototype.lineHeight = function() {
        return this._css_lineHeight ? this._css_lineHeight : _CSS_Window_Base_lineHeight.call(this);
    };

    var _CSS_Window_Base_standardBackOpacity = Window_Base.prototype.standardBackOpacity;
    Window_Base.prototype.standardBackOpacity = function() {
        return this._css_opacity ? this._css_opacity : _CSS_Window_Base_standardBackOpacity.call(this);
    };

    //書き換え
    //ウィンドウ枠の表示
    Window_Base.prototype._refreshFrame = function() {
        if (!this._css_hideFrame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_Selectableの修正
    //=============================================================================

    Window_Selectable.prototype.initCssLayout = function() {
        Window_Base.prototype.initCssLayout.call(this);
        var lss = this.standardCssLayout();
        if (lss && lss.enabled) {
            this._css_maxCols = lss.maxCols;
            this._css_cursorHeight = lss.cursorHeight;
            this._css_hSpace = lss.hspace;
        }
    };

    var _CSS_Window_Selectable_spacing = Window_Selectable.prototype.spacing;
    Window_Selectable.prototype.spacing = function() {
        return this._css_spacing ? this._css_spacing : _CSS_Window_Selectable_spacing.call(this);
    };

    var _CSS_Window_Selectable_maxCols = Window_Selectable.prototype.maxCols;
    Window_Selectable.prototype.maxCols = function() {
        return this._css_maxCols ? this._css_maxCols : _CSS_Window_Selectable_maxCols.call(this);
    };

    Window_Selectable.prototype.cursorHeight = function() {
        return this._css_cursorHeight;
    };

    Window_Selectable.prototype.itemHeightSpace = function() {
        return this._css_hSpace;
    };

    Window_Selectable.prototype.unitHeight = function() {
        return this.itemHeight() + this.itemHeightSpace();
    };

    Window_Selectable.prototype.unitWidth = function() {
        return this.itemWidth() + this.spacing();
    };

    var _CSS_Window_Selectable_maxPageRows = Window_Selectable.prototype.maxPageRows;
    Window_Selectable.prototype.maxPageRows = function() {
        if (this.itemHeightSpace()) {
            var pageHeight = this.height - this.padding * 2;
            return Math.floor(pageHeight / this.unitHeight());
        } else {
            return _CSS_Window_Selectable_maxPageRows.call(this);
        }
    };

    var _CSS_Window_Selectable_topRow = Window_Selectable.prototype.topRow;
    Window_Selectable.prototype.topRow = function() {
        return this.itemHeightSpace() ? Math.floor(this._scrollY / this.unitHeight()) :
            _CSS_Window_Selectable_topRow.call(this);
    };

    var _CSS_Window_Selectable_setTopRow = Window_Selectable.prototype.setTopRow;
    Window_Selectable.prototype.setTopRow = function(row) {
        if (this.itemHeightSpace()) {
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
        if (this.itemHeightSpace()) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
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

    //=============================================================================
    // GraphicalDesignMode.jsに対応
    //=============================================================================
    if (typeof $dataContainerProperties !== 'undefined') {
    
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

    }//GraphicalDesignMode.js

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
    if (this._battler && this._battler.isAlive()) {
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
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updateIcon();
        this.updateFrame();
        this._animationCount = 0;
    }
};

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