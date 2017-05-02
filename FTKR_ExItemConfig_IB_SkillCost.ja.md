[トップページに戻る](README.ja.md)

# [FTKR_ExItemConfig_IB_SkillCost](FTKR_ExItemConfig_IB_SkillCost.js) プラグイン

スキルの消費コストを拡張するプラグインです。<br>
本プラグインは、[FTKR_ExItemConfig_ItemBasic](FTKR_ExItemConfig_ItemBasic.ja.md)の拡張プラグインです。

ダウンロード: [FTKR_ExItemConfig_IB_SkillCost.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_IB_SkillCost.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [プラグインの登録](#プラグインの登録)
3. [使用条件の設定](#使用条件の設定)
4. [消費コストの表示設定](#消費コストの表示設定)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、スキルの消費コストをより詳細に設定できます。

[目次に戻る](#目次)

## プラグインの登録

本プラグインを使用するためには、[FTKR_ExItemConfig_ItemBasic](FTKR_ExItemConfig_ItemBasic.js)の事前登録が必要です。
プラグイン管理画面で、以下の順の配置になるように登録してください。
```
FTKR_ExItemConfig_ItemBasic.js
FTKR_ExItemConfig_IB_SkillCost.js
```

[目次に戻る](#目次)

## 使用条件の設定

スキルに以下のノートタグを追記することで、消費コストの設定ができます。
消費コストはFTKR_ExItemConfig_ItemBasic.jsのデータID毎に設定できます。

```
<EIC コスト: x>
code
</EIC コスト>
```
データID x に対して code部の設定を登録します。

### code に使用できる項目
```
Mp: eval
```
消費MPを eval で設定した値に変更します。
```
Tp: eval
```
消費TPを eval で設定した値に変更します。
```
Hp: eval
```
消費HPを eval で設定した値にします。


### 計算式(eval) の値について
計算式(eval)は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を使用することができます。以下のコードを使用できます。
* a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
* s[x]    - スイッチID x の状態を参照します。
* v[x]    - 変数ID x の値を参照します。
* iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)

(*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。

### 入力例）
使用者の現在MPと現在TPをすべて消費する。
ただし、最低1は必要とする。
```
<EIC コスト: 0>
Mp: Math.max(a.mp, 1)
Tp: Math.max(a.tp, 1)
</EIC コスト>
```

[目次に戻る](#目次)

## 消費コストの表示設定

以下のプラグインパラメータで設定ができます。

`<Draw All Cost>`

有効にすることで、HP、MP、TPのすべての消費コストをスキルメニュー画面に表示します。
* 1 - 有効にする
* 0 - 無効にする

`<HP Cost Format>`

HPコストの表示内容を文字列で記述します。
%1 と記述した箇所がHPコストに変換されます。
制御文字が使用できます。

`<MP Cost Format>`

MPコストの表示内容を文字列で記述します。
%1 と記述した箇所がMPコストに変換されます。
制御文字が使用できます。

`<TP Cost Format>`

TPコストの表示内容を文字列で記述します。
%1 と記述した箇所がTPコストに変換されます。
制御文字が使用できます。

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.0](FTKR_ExItemConfig_IB_SkillCost.js) | 2017/04/30 | 初版作成 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.ja.md)