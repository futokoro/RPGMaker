[トップページに戻る](README.md)

# [FTKR_CSS_DetailedStatus](FTKR_CSS_DetailedStatus.js) プラグイン

アクターのステータス画面のステータス表示を変更するプラグインです。<br>
本プラグインは、[FTKR_CustomSimpleActorStatus](FTKR_CustomSimpleActorStatus.ja.md)の拡張プラグインです。

ダウンロード: [FTKR_CSS_DetailedStatus.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_CSS_DetailedStatus.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [プラグインの登録](#プラグインの登録)
3. [レイアウト設定](#レイアウト設定)
    1. [表示エリアサイズの設定](#表示エリアサイズの設定)
    2. [表示エリア間のラインの設定](#表示エリア間のラインの設定)
    3. [表示エリアの設定](#表示エリアの設定)
    4. [顔画像サイズの設定](#詳細ステータスの顔画像サイズの設定)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、ステータス画面で表示するアクターのステータス表示のレイアウトを変更できます。

![画像](image/FTKR_CSS_DetailedStatus/n01_001.png)

[目次に戻る](#目次)

## プラグインの登録

本プラグインを使用するためには、[FTKR_CustomSimpleActorStatus](FTKR_CustomSimpleActorStatus.js)の事前登録が必要です。
プラグイン管理画面で、以下の順の配置になるように登録してください。
```
FTKR_CustomSimpleActorStatus.js
FTKR_CSS_DetailedStatus.js
```
[目次に戻る](#目次)

## レイアウト設定

## 表示エリアサイズの設定

### ステータス画面の表示エリア

ステータス画面は、下の図の(1)～(4)の4つの表示エリアで構成しています。
各表示エリア内の構成は、レイアウトの基本構成と同じです。

![画像](image/FTKR_CustomSimpleActorStatus/n03_006.png)

### 表示エリアサイズの設定

表示エリアのサイズ(行数)は、プラグインパラメータ`DS Lines Number`で設定します。４つの表示エリアの行数を、カンマ(,)で区切って入力してください。

下の図の設定の場合は、表示エリアの行数は以下になります。
* 表示エリア(1)の高さ - 1 行
* 表示エリア(2)の高さ - 4 行
* 表示エリア(3)の高さ - 6 行
* 表示エリア(4)の高さ - 2 行

なお、デフォルトの画面サイズの場合、表示可能な行数は最大で16行です。
ラインも1本 1行と数えます。

![画像](image/FTKR_CustomSimpleActorStatus/n03_002.png)

[目次に戻る](#目次)

## 表示エリア間のラインの設定

表示エリア間のラインの色、太さ、透明度を設定できます。

![画像](image/FTKR_CustomSimpleActorStatus/n03_007.png)

以下のプラグインパラメータで設定します。

`DS Horz Line Color`

ラインの色番号を指定します。<br>
-1 を入力した場合は非表示になり、表示エリアが上にずれます。

`DS Horz Line Thick`

ラインの太さを指定します。<br>
0 を入力した場合は非表示になりますが、表示エリアはずれません。

`DS Horz Line Opacity`

ラインの色の透明度を指定します。<br>
0 で透明、255で不透明になります。

![画像](image/FTKR_CustomSimpleActorStatus/n03_003.png)

[目次に戻る](#目次)

## 表示エリアの設定

表示エリアは、以下の4つのプラグインパラメータで設定します。

`DS Line* Status`<br>
`DS Space*`<br>
`DS Space In Text*`<br>
`DS Width Rate*`<br>

プラグインパラメータの*印の番号と表示エリアの番号は以下の組み合わせです。
* *印の 0番 - 表示エリア(1)の設定
* *印の 1番 - 表示エリア(2)の設定
* *印の 2番 - 表示エリア(3)の設定
* *印の 3番 - 表示エリア(4)の設定

![画像](image/FTKR_CustomSimpleActorStatus/n03_004.png)

### ステータス画面の描画エリアの表示設定

プラグインパラメータ`DS Line* Status`で、描画エリアの表示内容を設定します。

以下のようにセミコロン(;)を使用して、各描画エリアのコードを区切ります。
```
描画エリア(1);描画エリア(2);描画エリア(3)
```
各描画エリアのコード入力は、`Actor Status Text*`の設定と同じです。

#### 入力例
表示エリア(2)のデフォルト設定
```
face;level,state,hp,mp;custom(0),custom(1),custom(2),custom(3)
```
上記の入力の場合、各描画エリアの表示内容は以下の通りです。
* 描画エリア(1) - 顔画像 を表示
* 描画エリア(2) - レベル、ステートアイコン、HPゲージ、MPゲージ を縦に表示
* 描画エリア(3) - カスタムパラメータの0～3 を縦に表示

### ステータス画面の表示エリアのその他の設定

`DS Space*`

空白エリアのサイズを設定します。
`Actor Status Space`の設定と同じです。

`DS Space In Text*`

角括弧を使ったときの表示間隔を設定します。
`Actor Status Space In Text`の設定と同じです。

`DS Width Rate*`

描画エリアのサイズの比率を設定します。
`Actor Status Width Rate`の設定と同じです。

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.0](FTKR_CSS_DetailedStatus.js) | 2017/04/21 | 初版作成 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)