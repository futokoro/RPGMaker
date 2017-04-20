[トップページに戻る](README.ja.md)

# [FTKR_ExSvMotion](FTKR_ExSvMotion.js) プラグイン

SVキャラのモーションを拡張するプラグインです。

ダウンロード: [FTKR_ExSvMotion.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExSvMotion.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [モーションの設定](#モーションの設定)
3. [ステートモーションの設定](#ステートモーションの設定)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、アクターのさまざまな状態における
SVキャラのモーションを変更します。

## モーションの設定

モーションは、モーション1～モーション9まで設定できます。
数字が大きい方が、モーションの優先度が高くなります。

`<Motion * Condition>`<br>
モーションの状態を設定します。
以下の状態の中から、モーションを設定する対象を選択します。
* input  : コマンド入力中
* chant  : 詠唱中
* guard  : 防御中/防御待機中
* state* : ステート付加中(state + ステートモーション番号)(例:state4)

ステートモーション番号の 1 ~ 3は、基本設定で選べる以下の状態を示します。
* 1 - 状態異常
* 2 - 睡眠
* 3 - 戦闘不能

`<Motion * Name>`<br>
`<Motion * Condition>`で設定したアクターの状態の時に表示するモーションのコードを以下の中から指定してください。<br>
 walk, wait, chant, guard, damage, evade, thrust, swing,
 missile, skill, spell, item, escape, victory, dying,
 abnormal, sleep, dead<br>
ステートモーションに設定したモーションは、ループします。

## ステートモーションの設定
ステートのメモ欄に以下のタグを入力することで、ステート付加中のモーションを
設定できます。

```
<ESM モーション: x>
<ESM MOTION: x>
```
ステートモーション番号を x に設定します。
タグで設定しない場合は、基本設定の[SV]モーションの設定に従います。

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.1](FTKR_ExSvMotion.js) | 2017/04/19 | ステートのメモ欄が正しく読み取れない不具合修正 |
| ver1.0.0 | 2017/04/19 | 初版公開 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.ja.md)