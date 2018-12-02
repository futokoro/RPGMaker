[トップページに戻る](README.md)

# [FTKR_AltTB_BattleEventConditions](FTKR_AltTB_BattleEventConditions.js) プラグイン

バトルイベントにFTKR_AltTB専用のターン条件を設定できるプラグインです。

ダウンロード: [FTKR_AltTB_BattleEventConditions.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_AltTB_BattleEventConditions.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [プラグインの登録](#プラグインの登録)
1. [バトルイベントの設定](#バトルイベントの設定)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

このプラグインを導入すると、敵グループに設定したバトルイベントの実行条件に、 FTKR_AlternatingTurnBattle 専用のターン条件を設定できます。

このプラグインは、[FTKR_AlternatingTurnBattleプラグイン](FTKR_AlternatingTurnBattle.ja.md)が必要です。

[目次に戻る](#目次)

## プラグインの登録

以下のプラグインと組み合わせる場合は、プラグイン管理画面で、以下の順の配置になるように登録してください。
```
FTKR_AlternatingTurnBattle.js   (味方交互にターンが進むターン制戦闘システム)
↑このプラグインよりも上に登録↑
FTKR_AltTB_BattleEventConditions.js
```

[目次に戻る](#目次)

# バトルイベントの設定

下の図のように、敵グループのバトルイベントに注釈でタグを追記することで、さまざまなターン条件を追加できます。
このターン条件は、既存のツクールMVのエディタで設定できる条件と同時に満たす必要があります。

![画像](image/FTKR_AltTB_BattleEventConditions/n01_001.png)

## ターン開始時に実行
### タグ
```
<ターン開始>
<TURN_STAETINS>
```

### 内容
このタグを追記したページのイベントを、ターン開始時に実行します。
「ターン終了」および、他のターン条件と同時に使用できません。

## プレイヤーターン開始時に実行
### タグ
```
<プレイヤーターン開始>
<PLAYER_TURN_STAETINS>
```

### 内容
このタグを追記したページのイベントを、プレイヤーターン開始時に実行します。
「ターン終了」および、他のターン条件と同時に使用できません。

## プレイヤーターン終了時に実行
### タグ
```
<プレイヤーターン終了>
<PLAYER_TURN_ENDINS>
```

### 内容
このタグを追記したページのイベントを、プレイヤーターン終了時に実行します。
「ターン終了」および、他のターン条件と同時に使用できません。

## エネミーターン開始時に実行
### タグ
```
<エネミーターン開始>
<ENEMY_TURN_STAETINS>
```

### 内容
このタグを追記したページのイベントを、エネミーターン開始時に実行します。
「ターン終了」および、他のターン条件と同時に使用できません。

## エネミーターン終了時に実行
### タグ
```
<エネミーターン終了>
<ENEMY_TURN_ENDINS>
```

### 内容
このタグを追記したページのイベントを、エネミーターン終了時に実行します。
「ターン終了」および、他のターン条件と同時に使用できません。

[目次に戻る](#目次)

# プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.0](FTKR_AltTB_BattleEventConditions.js) | 2018/12/02 | 新規作成 |

# ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)