[トップページに戻る](README.md)

# [FTKR_SetupTroops](FTKR_SetupTroops.js) プラグイン

ゲーム内で敵グループの編成を設定するプラグインです。

ダウンロード: [FTKR_SetupTroops.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SetupTroops.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [敵グループ編成の設定方法](#敵グループ編成の設定方法)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 敵グループ編成の設定方法

以下のプラグインコマンドを使用します。
なお、敵グループIDや、エネミーID、座標等の値には、`\V[x]`でゲーム内変数ID x を指定できます。

１．メンバーの初期化
```
STP_敵グループメンバー初期化 id
STP_TroopMembers_Reset id
```
id で初期化(メンバーを空にする)する敵グループIDを設定します。
メンバーの追加をする前に実行してください。

バトル中には実行しないでください。

例)
```
STP_敵グループメンバー初期化 1
STP_TroopMembers_Reset 2
```

２．メンバーの追加

```
STP_敵グループメンバー追加 id エネミーID X座標 Y座標 非表示フラグ
STP_TroopMembers_Add id enemyId x y hidden
```

id でメンバーを追加する敵グループIDを設定します。
非表示フラグは途中から出現させる場合に true、最初からいる場合に false と
してください。

このコマンドをバトル中に実行すると、そのエネミーが画面に追加されます。

例)
```
STP_敵グループメンバー追加 1 5 200 300 false
STP_TroopMembers_Add 2 10 150 400 true
```

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.1.0](FTKR_SetupTroops.js) | 2017/05/25 | バトル中でも敵グループメンバー追加が可能なように変更 |
| ver1.0.0 | 2017/05/19 | 初版公開 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)