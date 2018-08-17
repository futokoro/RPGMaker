[トップページに戻る](README.md)

# [FTKR_BattleWindowLayout](FTKR_BattleWindowLayout.js) プラグイン

戦闘時のウィンドウ配置を変更するプラグインです。

ダウンロード: [FTKR_BattleWindowLayout.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_BattleWindowLayout.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

戦闘時のウィンドウ配置やサイズを変更します。

1. ステータスウィンドウの幅を画面サイズと同じにします。
2. ステータスウィンドウのアクターを横並びに変更します。
3. パーティーコマンドウィンドウをステータスウィンドウの上に表示しコマンドを横並びにします。

![画像](image/FTKR_BattleWindowLayout/n01_001.png)

アクターコマンドウィンドウの表示位置を、ステータスウィンドウの選択中のアクターに重ねます。

![画像](image/FTKR_BattleWindowLayout/n01_002.png)

### ステータスウィンドウの表示内容

ステータスウィンドウの表示内容は、顔画像、名前、ステート、HP、MP、TPです。<br>
顔画像は、プラグインパラメータで表示のON/OFFを変えられます。<br>
TPは、「バトル画面でTPを表示」にチェックが入っている場合に表示します。

[目次に戻る](#目次)

## プラグインの登録

FTKR_AlternatingTurnBattle.jsと組み合わせる場合は、このプラグインが下になるように配置してください。

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.1.1](FTKR_BattleWindowLayout.js)| 2018/08/17 | FTKR_FVActorAnimationと処理が重複していた部分を修正 |
| ver1.1.0| 2018/04/09 | ステータスウィンドウでアクター同士の表示が重なる場合がある不具合を修正<br>アクターコマンドウィンドウの表示位置を変更する機能を追加<br>FTKR_AlternatingTurnBattle.jsの v1.1.0 に対応 |
| ver1.0.0 | 2018/04/08 | 初版作成 |


## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)