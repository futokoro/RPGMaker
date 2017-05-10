[トップページに戻る](README.md)

# [FTKR_FacialImageDifference](FTKR_FacialImageDifference.js) プラグイン

アクターの状態によって顔画像を変えるプラグインです。

ダウンロード: [FTKR_FacialImageDifference.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_FacialImageDifference.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [プラグインの登録](#プラグインの登録)
2. [基本仕様](#基本仕様)
2. [FTKR_CustomSimpleActorStatusと併用する場合](#FTKR_CustomSimpleActorStatusと併用する場合)
3. [FTKR_CSS_BattleStatusと併用する場合](#FTKR_CSS_BattleStatusと併用する場合)
3. [FTKR_ExSvMotionと併用する場合](#FTKR_ExSvMotionと併用する場合)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、アクターのさまざまな状態において表示する顔画像を変更します。

## プラグインの登録

以下のプラグインと組み合わせて使用する場合は。
プラグイン管理画面で、以下の順の配置になるように登録してください。
```
FTKR_CustomSimpleActorStatus.js
FTKR_CSS_BattleStatus.js
FTKR_ExSvMotion.js
FTKR_FacialImageDifference.js
```

## 基本仕様

本プラグインを単独で使用する場合、アクターのステート状態によってメニュー画面で表示する顔画像は、以下の番号の顔画像なります。

* 通常　　： 1番
* 状態異常： 15番
* 睡眠　　： 16番
* 戦闘不能： 17番

プラグインパラメータ`<Enable Custom Index>`を有効にした場合は--画像番号変更--以降のパラメータで設定した番号の顔画像を使用します。

### アクターの顔画像について

本プラグインを使用する場合、アクターの顔画像は以下の規格のものを使用してください。

* 一つの顔画像サイズ：144 * 144
* 一つのファイルには、顔画像を横に６列、縦に３行まで配置できます。
* 顔画像の番号は、左上を 0番、一つ右を 1番、一つ下を 6番と数えます。
* 一つの画像ファイルで最大18種類の顔画像を設定できます。

ファイルは、img/face/ フォルダに保存してください。

指定された番号の箇所に、画像がない場合は空欄で表示されますので注意してください。

[目次に戻る](#目次)

## FTKR_CustomSimpleActorStatusと併用する場合

`FTKR_CustomSimpleActorStatus`の設定によって表示する顔画像を変更します。
使用する番号は、基本仕様と同じです。

また、`FTKR_CustomSimpleActorStatus`の拡張プラグインによって、メニュー以外に表示した顔画像についても、同様に変更します。


## FTKR_CSS_BattleStatusと併用する場合

バトル中のアクターの状態によって、顔画像を変更します。

以下の状態は、一時的に顔画像を以下の番号に変更します。
* ダメージ　　： 4番
* 回避　　　　： 5番
* 突き使用　　： 6番
* 払い使用　　： 7番
* 飛び道具使用： 8番
* スキル使用　： 9番
* 魔法使用　　： 10番
* アイテム使用： 11番

以下の状態でいる間は、顔画像を以下の番号に変更します。
* 入力中　　　： 0番
* 待機　　　　： 1番
* 詠唱中　　　： 2番
* 防御中　　　： 3番
* 逃走中　　　： 12番
* 戦闘勝利中　： 13番
* 瀕死時　　　： 14番
* 状態異常時　： 15番
* 睡眠時　　　： 16番
* 戦闘不能時　： 17番

なお、プラグインパラメータ`<Enable Custom Index>`を有効にした場合は--画像番号変更--以降のパラメータで設定した番号の顔画像を使用します。

[目次に戻る](#目次)

## FTKR_ExSvMotionと併用する場合

`FTKR_ExSvMotion`の設定によって表示する顔画像を変更します。

`FTKR_ExSvMotion`の設定で、各状態のモーションを変更していた場合は、その設定に合わせて、顔画像も同じモーションの番号の画像に変更します。


なお、プラグインパラメータ`<Enable Custom Index>`を有効にした場合は--画像番号変更--以降のパラメータで設定した番号の顔画像を使用します。

また、回復時、およびカスタムモーション時に使用するの顔画像番号を
設定できます。

### 別画像モーション時の画像
別画像モーション時には、アクターのメモ欄で設定した顔画像ファイルを使用します。
アクターのメモ欄に以下のタグを追記してください。

```
<FID_顔画像:filename>
<FID_FACE_IMAGE:filename>
```

画像ファイル filename.png は img/face/ に保存してください。

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.0](FTKR_FacialImageDifference.js) | 2017/05/10 | 初版公開 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)