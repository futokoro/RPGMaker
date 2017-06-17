//=============================================================================
// アクターのステータス表示を変更するプラグイン
// FTKR_CustomSimpleActorStatus.js
// 作成者     : フトコロ
// 作成日     : 2017/03/09
// 最終更新日 : 2017/06/17
// バージョン : v1.8.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};

//=============================================================================
/*:
 * @plugindesc v1.8.0 アクターのステータス表示を変更するプラグイン
 * @author フトコロ
 *
 * @noteParam CSS_画像
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 * 
 * @param --簡易ステータス表示--
 * @default
 * 
 * @param Enabled Simple Status
 * @desc 簡易ステータス画面のレイアウト変更機能を使うか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,level,state
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default class,hp,mp
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,20,50,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 5
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 2,2,3
 *
 * @param --ステータスウィンドウ設定--
 * @default
 * 
 * @param Enabled Custom Window
 * @desc ウィンドウのレイアウト変更機能を使うか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * 
 * @param Number Visible Rows
 * @desc ステータスウィンドウの縦の行数：デフォルト 16
 * @default 16
 * 
 * @param Number Max Cols
 * @desc アクターを横に並べる数：デフォルト 1
 * @default 1
 * 
 * @param Cursol Line Number
 * @desc カーソル高さの行数：デフォルト 4
 * @default 4
 * 
 * @param Cursol Height Space
 * @desc 縦のカーソル間隔：デフォルト 0
 * @default 0
 * 
 * @param Font Size
 * @desc フォントサイズ：デフォルト 28
 * @default 28
 * 
 * @param Window Padding
 * @desc ウィンドウの周囲の余白：デフォルト 18
 * @default 18
 * 
 * @param Window Line Height
 * @desc ウィンドウ内の1行の高さ：デフォルト 36
 * @default 36
 * 
 * @param Window Opacity
 * @desc ウィンドウ内の背景の透明度：デフォルト 192
 * @default 192
 * 
 * @param Hide Window Frame
 * @desc ウィンドウ枠を非表示にするか
 * 1 - 非表示にする、0 - 表示する
 * @default 0
 * 
 * @param --スキル画面の設定--
 * @default
 * 
 * @param Enabled Skill Status
 * @desc スキル画面のステータスをメニュー画面と同じにするか。
 * 1 - 有効にする, 0 - 無効にする
 * @default 1
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
 * @default a.currentExp()
 * 
 * @param Gauge 0 Max
 * @desc Gauge(0)の最大値の参照先を設定します。
 * アクターを a として、ステータスの参照先を記述すること。
 * @default a.nextLevelExp()
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
 * 本プラグインを実装することで、メニューや、スキル画面で表示するアクターの
 * ステータス表示のレイアウトを変更できます。
 * 
 * なお、この機能はプラグインパラメータで個別にON/OFFできます。
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
 * アクターの簡易ステータス表示の設定
 *-----------------------------------------------------------------------------
 * プラグインパラメータの設定により、メニュー画面およびスキル画面で表示する
 * 簡易ステータスの表示レイアウトを変更することができます。
 * 
 * <Enabled Simple Status>
 *    :メニュー画面のレイアウト変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Enabled Skill Status>
 *    :スキル画面のレイアウト変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
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
 *    :equip(x), text(x), image, eparam(x), agauge(x), cgauge(x)です。
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
 *    :agauge(x) - 
 *    : アクターのメモ欄で設定したカスタムゲージを表示します。
 *    :
 *    :cgauge(x) - 
 *    : クラスのメモ欄で設定したカスタムゲージを表示します。
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
 * カスタム画像を表示する [ image ]
 *-----------------------------------------------------------------------------
 * プラグインパラメータ<Actor Status Text*>にて、'image'を入力した場合
 * 以下のタグをアクターのメモ欄に追記することで、指定した画像を表示する
 * ことができます。
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
 * (*1)画像は、プロジェクトフォルダ内の/img/picture/に保存してください。
 * 
 * [code に使用できる項目]
 * 以下のタグで、画像を四角に切り取って表示することができます。
 * Bgi offset X: n
 *    :画像ファイルを四角に切り取る時の左上のX座標を入力します。
 * 
 * Bgi offset Y: n
 *    :画像ファイルを四角に切り取る時の左上のY座標を入力します。
 * 
 * Bgi width: n
 *    :画像ファイルを四角に切り取る時の幅を入力します。
 * 
 * Bgi height: n
 *    :画像ファイルを四角に切り取る時の高さを入力します。
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
 * メニュー画面のステータスウィンドウの設定
 *-----------------------------------------------------------------------------
 * 以下のプラグインパラメータで設定できます。
 * 
 * <Enabled Custom Window>
 *    :メニュー画面のウィンドウ変更機能を使うか指定します。
 *    :0 - 無効, 1 - 有効
 * 
 * <Number Visible Rows>
 *    :ステータスウィンドウの縦の行数を変更します。
 *    :デフォルトは16行です。
 * 
 * <Number Max Cols>
 *    :ウィンドウ内でアクターを横に並べる数を変更します。
 *    :デフォルトは 1 です。
 * 
 * <Cursol Line Number>
 *    :カーソル(アクター１人分)の高さを何行分にするか設定します。
 *    :デフォルトは 4 です。
 * 
 * <Cursol Height Space>
 *    :縦のカーソル間隔を設定します。
 *    :デフォルトは 0 です。(単位はpixel)
 * 
 * <Font Size>
 *    :ウィンドウ内のフォントサイズを変更します。
 *    :デフォルトは 28 です。(単位はpixel)
 * 
 * <Window Padding>
 *    :ウィンドウの周囲の余白を変更します。
 *    :デフォルトは 18 です。(単位はpixel)
 * 
 * <Window Line Height>
 *    :ウィンドウ内の1行の高さを変更します。
 *    :デフォルトは 36 です。(単位はpixel)
 * 
 * <Window Opacity>
 *    :ウィンドウ内の背景の透明度を変更します。
 *    :デフォルトは 192 です。
 *    :0 - 透明、255 - 不透明
 * 
 * <Hide Window Frame>
 *    :ウィンドウ枠を非表示にするか指定します。
 *    :1 - 非表示にする、0 - 表示する
 *    :デフォルトは表示します。
 * 
 * 
 * ＜ウィンドウの高さ＞
 * ウィンドウの高さは、以下の計算式で算出します。
 *    [ウィンドウ高さ] ＝ [縦の行数] × [1行の高さ] + [余白のサイズ] × 2
 * 
 * 
 * ＜フォントサイズと行の高さ＞
 * 基本的に、下の大小関係になるように設定しましょう。
 *    フォントサイズ ＜ 1行の高さ
 * 
 * 
 * ＜ウィンドウを消す方法＞
 * 以下の設定にすると、ウィンドウ枠とウィンドウの背景が消えて
 * アクターのステータスだけを表示します。
 * 
 * <Window Opacity>     : 0
 * <Hide Window Frame>  : 1
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

    FTKR.CSS.enabledSS = Number(parameters['Enabled Simple Status'] || 0);
    FTKR.CSS.enabledSkill = Number(parameters['Enabled Skill Status'] || 0);

    //簡易ステータスオブジェクト
    FTKR.CSS.simpleStatus = {
        text1:String(parameters['Actor Status Text1'] || ''),
        text2:String(parameters['Actor Status Text2'] || ''),
        text3:String(parameters['Actor Status Text3'] || ''),
        space:String(parameters['Actor Status Space'] || ''),
        spaceIn:Number(parameters['Actor Status Space In Text'] || 0),
        widthRate:String(parameters['Actor Status Width Rate'] || ''),
    };

    //ウィンドウ設定オブジェクト
    FTKR.CSS.window = {
        enabled:Number(parameters['Enabled Custom Window'] || 0),
        numVisibleRows:Number(parameters['Number Visible Rows'] || 0),
        maxCols:Number(parameters['Number Max Cols'] || 0),
        fontSize:Number(parameters['Font Size'] || 0),
        padding:Number(parameters['Window Padding'] || 0),
        lineHeight:Number(parameters['Window Line Height'] || 0),
        opacity:Number(parameters['Window Opacity'] || 0),
        hideFrame:Number(parameters['Hide Window Frame'] || 0),
        cursolHeight:Number(parameters['Cursol Line Number'] || 0),
        hspace:Number(parameters['Cursol Height Space'] || 0),
    };

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
            obj.cssbgi = {
                name:'',
                offsetX:0,
                offsetY:0,
                width:0,
                height:0,
            };
            var datas = readEntrapmentCodeToTextEx(obj, ['CSS_画像', 'CSS_IMAGE']);
            this.readCssBgiMetaDatas(obj, datas);
        }
    };

    DataManager.readCssBgiMetaDatas = function(obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            obj.cssbgi.name = metaDatas[t].id;

            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /(.+):[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case 'BGI OFFSET X':
                        obj.cssbgi.offsetX = Number(match[2]);
                        break;
                    case 'BGI OFFSET Y':
                      obj.cssbgi.offsetY = Number(match[2]);
                        break;
                    case 'BGI WIDTH':
                        obj.cssbgi.width = Number(match[2]);
                        break;
                    case 'BGI HEIGHT':
                        obj.cssbgi.height = Number(match[2]);
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
        ImageManager.loadPicture(this.actor().cssbgi.name);
        ImageManager.loadSvActor(this.battlerName());
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
        if (len > 1) width = (width - lss.spaceIn * (len - 1))/ len;
        statuses.forEach( function(element, i) {
            var dx = (width + lss.spaceIn) * i;
            line = Math.max(this.drawCssActorStatusBase(index, actor, x + dx, y, width, element, lss), line);
        },this);
        return line;
    };

    Window_Base.prototype.drawCssActorStatusBase = function(index, actor, x, y, width, status, lss) {
        var css = FTKR.CSS.cssStatus;
        var match = /(.+)\((.+)\)/.exec(status);
        if (match) {
            switch(match[1].toUpperCase()) {
                case 'EPARAM':
                    return this.drawCssActorEquipParam(actor, x, y, width, Number(match[2]), lss);
                case 'AGAUGE':
                    return this.drawCssActorCustomGauge(actor, x, y, width, Number(match[2]));
                case 'CGAUGE':
                    return this.drawCssClassCustomGauge(actor, x, y, width, Number(match[2]));
                case 'PARAM':
                    return this.drawCssActorParam(actor, x, y, width, Number(match[2]));
                case 'CUSTOM':
                    var customId = Number(match[2]);
                    return this.drawCssActorCustom(actor, x, y, width, css.customs[customId]);
                case 'GAUGE':
                    var gaugeId = Number(match[2]);
                    return this.drawCssActorGauge(actor, x, y, width, css.gauges[gaugeId]);
                case 'EQUIP':
                    return this.drawCssActorEquip(actor, x, y, width, Number(match[2]));
                case 'TEXT':
                    return this.drawCssText(actor, x, y, width, match[2]);
                case 'STATE2':
                    return this.drawCssActorIcons(index, actor, x, y, width, Number(match[2]));
                case 'FACE':
                    return this.drawCssActorFace(actor, x, y, width, lss, Number(match[2]));
                case 'EVAL':
                    return this.drawCssEval(actor, x, y, width, match[2]);
            }
        } else {
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
                    return this.drawCssActorImage(actor, x, y, width);
                case 'MESSAGE':
                    return this.drawCssActorMessage(actor, x, y, width);
            }
        }
        return 1;
    };

    //------------------------------------------------------------------------
    //アクターの顔画像の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorFace = function(actor, x, y, width, lss, scale) {
        var dy = this.lineHeight();
        scale = scale || Math.ceil(Window_Base._faceHeight / dy);
        this.changePaintOpacity(actor.isBattleMember());
        this.drawCssFace(actor, x, y, width, dy * scale);
        this.changePaintOpacity(true);
        return scale;
    };

    Window_Base.prototype.drawCssFace = function(actor, dx, dy, width, height) {
        var len = Math.min(width, height);
        var dh = len || Window_Base._faceHeight;
        var dw = len || Window_Base._faceWidth;
        var offsetX = FTKR.CSS.cssStatus.face.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        var bitmap = ImageManager.loadFace(actor.faceName());
        var sw = Window_Base._faceWidth;
        var sh = Window_Base._faceHeight;
        var sx = actor.faceIndex() % 4 * sw;
        var sy = Math.floor(actor.faceIndex() / 4) * sh;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    //------------------------------------------------------------------------
    //アクターの歩行キャラの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorChara = function(actor, x, y, width, chara) {
        var dy = this.lineHeight();
        var line = Math.ceil(chara.height / dy);
        this.changePaintOpacity(actor.isBattleMember());
        this.drawCssChara(actor, x, y, width, dy * line, chara);
        this.changePaintOpacity(true);
        return line;
    };

    Window_Base.prototype.drawCssChara = function(actor, dx, dy, width, height, chara) {
        var faceName = actor.characterName();
        var index = actor.characterIndex();
        var dh = chara.height;
        var dw = dh || width || chara.width;
        var offsetX = chara.posiX * (width - dw) / 2;
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

    //------------------------------------------------------------------------
    //アクターのSV戦闘キャラの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorSvChara = function(index, actor, x, y, width, svChara) {
        var dy = this.lineHeight();
        var line = Math.ceil(svChara.height / dy);
        this.changePaintOpacity(actor.isBattleMember());
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
        var offsetX = svChara.posiX * (width - svChara.width) / 2;
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
        var offsetX = svChara.posiX * (width - dw) / 2;
        var offsetY = (height - dh) / 2;
        dx = Math.floor(dx + offsetX);
        dy = Math.floor(dy + offsetY);
        var bitmap = ImageManager.loadSvActor(actor.battlerName());
        var sw = svChara.width;
        var sh = svChara.height;
        this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh);
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
        if (!this._stateIconSprite[index]) {
            this._stateIconSprite[index] = [];
        }
        if(css.autoScale) {
            var scale = this.iconScale();
            iw = iw * scale;
        }
        var maxlen = line ? this.lineHeight() * line : width;
        var offset = css.overlap ? this.getOverlapValue(actor, iw, maxlen, css) : iw;
        var showNum = Math.min(Math.floor((maxlen - 4) / offset));
        for (var i = 0; i < showNum; i++) {
            var sprite = this._stateIconSprite[index][i];
            if (!sprite) {
                sprite = new Sprite_CssStateIcon(i, showNum);
                this.addChild(sprite);
                this._stateIconSprite[index][i] = sprite;
            } else {
                sprite.setup(actor, showNum);
            }
            sprite.move(x + this.padding, y + this.padding);
            sprite.offsetMove(offset * i, line);
            if(css.autoScale) sprite.setScale(scale);
        }
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
        var tux = this.textWidth(this.convertEscapeCharacters(unit));
        var value = this.evalCssCustomFormula(actor, formula);
        this.changeTextColor(this.systemColor());
        var tx = this.drawTextEx(name, x, y);
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
        var current = this.evalCssCustomFormula(actor, gauge.current);
        var max = this.evalCssCustomFormula(actor, gauge.max);
        if (gauge.color1 >= 0 && gauge.color2 >= 0) {
            var rate = current / max;
            var color1 = this.textColor(gauge.color1);
            var color2 = this.textColor(gauge.color2);
            this.drawGauge(x, y, width, rate, color1, color2);
        }
        this.changeTextColor(this.systemColor());
        var tx = this.drawTextEx(gauge.name, x, y, width);
        if (gauge.ref) {
            var ref = this.evalCssCustomFormula(actor, gauge.ref);
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
        this.changeTextColor(this.systemColor());
        this.drawTextEx(text, x, y);
        this.resetTextColor();
        return 1;
    };

    //------------------------------------------------------------------------
    //JS計算式の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssEval = function(actor, x, y, width, text) {
        if (!text) return 1;
        var value = this.evalCssCustomFormula(actor, text);
        this.resetTextColor();
        this.drawText(value, x, y, width, 'right');
        return 1;
    };

    //------------------------------------------------------------------------
    //指定画像の表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorImage = function(actor, x, y, width) {
        var dy = this.lineHeight();
        var line = Math.ceil(actor.actor().cssbgi.height / dy) || 1;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawCssImage(actor, x, y, width);
        this.changePaintOpacity(true);
        return line;
    };

    Window_Base.prototype.drawCssImage = function(actor, dx, dy, width) {
        var bgi = actor.actor().cssbgi;
        var dh = bgi.height || this.lineHeight();
        var dw = bgi.width.clamp(0, width) || width;
        var offsetX = FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
        dx = Math.floor(dx + offsetX);
        var bitmap = ImageManager.loadPicture(bgi.name);
        var sw = bgi.width || dh;
        var sh = bgi.height || dw;
        var sx = bgi.offsetX || 0;
        var sy = bgi.offsetY || 0;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    //------------------------------------------------------------------------
    //指定したアイテムを装備した時のパラメータの表示関数
    //------------------------------------------------------------------------
    Window_Base.prototype.drawCssActorEquipParam = function(actor, x, y, width, paramId, lss) {
        if (paramId < 0 && paramId > 7) return 0;
        this.drawTextEx(FTKR.CSS.cssStatus.equip.arrow, x, y);
        var target = lss.target;
        if(target) {
            var newValue = target.param(paramId);
            var diffvalue = newValue - actor.param(paramId);
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

    //=============================================================================
    // Window_MenuStatus
    // メニュー画面のステータスウィンドウの表示クラス
    //=============================================================================

    FTKR.CSS.Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        if (!FTKR.CSS.enabledSS) FTKR.CSS.Window_MenuStatus_drawItemImage.call(this, index);
    };

    FTKR.CSS.Window_MenuStatus_drawItemStatus = Window_MenuStatus.prototype.drawItemStatus;
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        if (FTKR.CSS.enabledSS) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(index);
            this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height);
        } else {
            FTKR.CSS.Window_MenuStatus_drawItemStatus.call(this, index);
        }
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

    if(FTKR.CSS.window.enabled) {

    //書き換え
    //ウィンドウの行数
    Window_MenuStatus.prototype.numVisibleRows = function() {
        return FTKR.CSS.window.numVisibleRows;
    };

    //書き換え
    //ウィンドウに横に並べるアクター数
    Window_MenuStatus.prototype.maxCols = function() {
        return FTKR.CSS.window.maxCols;
    };

    //書き換え
    //カーソルの高さ
    Window_MenuStatus.prototype.itemHeight = function() {
        return this.lineHeight() * FTKR.CSS.window.cursolHeight;
    };

    //書き換え
    //ウィンドウに横に並べるアクターの表示間隔
    //ステータスレイアウト側で変更できるのでここでは 0 とする。
    Window_MenuStatus.prototype.spacing = function() {
        return 0;
    };

    //書き換え
    //ウィンドウのフォントサイズ
    Window_MenuStatus.prototype.standardFontSize = function() {
        return FTKR.CSS.window.fontSize;
    };

    //書き換え
    //ウィンドウに周囲の余白サイズ
    Window_MenuStatus.prototype.standardPadding = function() {
        return FTKR.CSS.window.padding;
    };

    //書き換え
    //ウィンドウ内の1行の高さ
    Window_MenuStatus.prototype.lineHeight = function() {
        return FTKR.CSS.window.lineHeight;
    };

    //書き換え
    //ウィンドウの背景の透明度
    Window_MenuStatus.prototype.standardBackOpacity = function() {
        return FTKR.CSS.window.opacity;
    };

    //書き換え
    //ウィンドウ枠の表示
    Window_MenuStatus.prototype._refreshFrame = function() {
        if (!FTKR.CSS.window.hideFrame) Window.prototype._refreshFrame.call(this);
    };

    Window_MenuStatus.prototype.itemHeightSpace = function() {
        return FTKR.CSS.window.hspace;
    };

    Window_MenuStatus.prototype.unitHeight = function() {
        return this.itemHeight() + this.itemHeightSpace();
    };

    Window_MenuStatus.prototype.unitWidth = function() {
        return this.itemWidth() + this.spacing();
    };

    if (FTKR.CSS.window.hspace) {
    //書き換え
    Window_MenuStatus.prototype.maxPageRows = function() {
        var pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.unitHeight());
    };

    //書き換え
    Window_MenuStatus.prototype.topRow = function() {
        return Math.floor(this._scrollY / this.unitHeight());
    };

    //書き換え
    Window_MenuStatus.prototype.setTopRow = function(row) {
        var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    //書き換え
    Window_MenuStatus.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * this.unitWidth() - this._scrollX;
        rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
        return rect;
    };
    }//FTKR.CSS.window.hspace

    }//ウィンドウカスタム有効

    //=============================================================================
    // Window_SkillStatus
    // スキル画面のステータスウィンドウの表示クラス
    //=============================================================================

    var _window_SkillStatus_refresh = Window_SkillStatus.prototype.refresh;
    Window_SkillStatus.prototype.refresh = function() {
        if(FTKR.CSS.enabledSkill) {
            this.contents.clear();
            if (this._actor) {
                var w = this.width - this.padding * 2;
                var h = this.height - this.padding * 2;
                this.drawCssActorStatus(0, this._actor, 0, 0, w, h);
            }
        } else {
            _window_SkillStatus_refresh.call(this);
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
  //  this.contents = new Bitmap(32, 32);
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