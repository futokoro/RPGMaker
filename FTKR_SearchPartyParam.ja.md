[トップページに戻る](README.ja.md)

# [FTKR_SearchPartyParam](FTKR_SearchPartyParam.js) プラグイン

本プラグインを実装することで、パーティー内のパラメータや状態に関するスクリプトを実装します。

ダウンロード: [FTKR_SearchPartyParam.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SearchPartyParam.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [スクリプトコマンド](#スクリプトコマンド)
3. [パラメータ名](#パラメータ名)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、パーティー内のパラメータや状態に関するスクリプトを実装します。

[目次に戻る](#目次)

## スクリプトコマンド

スクリプトの引数で入力する'param'については、[パラメータ名](#パラメータ名)を参照してください。

### パーティー内の情報取得

#### パーティー内のパラメータ値を取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameParty.averageParam('param') | パーティー内の'param'の平均値 |  |
| $gameParty.maxParam('param') | パーティー内の'param'の最大値 |  |
| $gameParty.minParam('param') | パーティー内の'param'の最小値 |  |

#### 指定条件のアクターIDを取得
該当者が複数いる場合は、並び順で前にいるアクターのIDを取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameParty.isHighestParam('param') | パーティー内の'param'の最大の値を持つアクターのID |  |
| $gameParty.isLowestParam('param') | パーティー内の'param'の最小の値を持つアクターのID |  |
| $gameParty.isEquipped($dataWeapons[n]) | 武器ID n の装備をしているアクターのID |  |
| $gameParty.isEquipped($dataArmors[n]) | 防具ID n の装備をしているアクターのID |  |
| $gameParty.isLearnedSkill(x) | スキルID x を習得しているアクターのID |  |
| $gameParty.isStateAffected(x) | ステートID x を付与されているアクターのID |  |

#### 指定条件のアクターIDリスト(配列)を取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameParty.isHigherParam('param', x) | 'param'が x を超えるアクターのIDリスト |  |
| $gameParty.isLowerParam('param', x) | 'param'が x 未満のアクターのIDリスト |  |

[目次に戻る](#目次)

### 敵グループ内の情報取得

#### 敵グループ内のパラメータ値を取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameTroop.averageParam('param') | 敵グループ内の'param'の平均値 |  |
| $gameTroop.maxParam('param') | 敵グループ内の'param'の最大値 |  |
| $gameTroop.minParam('param') | 敵グループ内の'param'の最小値 |  |

#### 指定条件のエネミーIDを取得
該当者が複数いる場合は、並び順で前にいるエネミーのIDを取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameTroop.isHighestParam('param') | 敵グループ内の'param'の最大の値を持つエネミーのID |  |
| $gameTroop.isLowestParam('param') | 敵グループ内の'param'の最小の値を持つエネミーのID |  |
| $gameTroop.isStateAffected(x) | ステートID x を付与されているエネミーのID |  |

#### 指定条件のエネミーIDリスト(配列)を取得

| スクリプト | 取得する値 | 備考 |
| --- | --- | --- |
| $gameTroop.isHigherParam('param', x) | 'param'が x を超えるエネミーのIDリスト |  |
| $gameTroop.isLowerParam('param', x) | 'param'が x 未満のエネミーのIDリスト |  |

[目次に戻る](#目次)

## パラメータ名

スクリプトに使用できるパラメータは以下の通りです。

| パラメータ名 | コード | 備考 |
| --- | --- | --- |
| 現在HP | hp |  |
| 現在MP | mp |  |
| 現在TP | tp |  |
| 現在LV | level |  |
| 最大HP | mhp |  |
| 最大MP | mmp |  |
| 攻撃力 | atk |  |
| 防御力 | def |  |
| 魔法攻撃 | mat |  |
| 魔法防御 | mdf |  |
| 敏捷性 | agi |  |
| 運 | luk |  |
| 命中率 | hit |  |
| 回避率 | eva |  |
| 会心率 | cri |  |
| 会心回避率 | cev |  |
| 魔法回避率 | mev |  |
| 魔法反射率 | mrf |  |
| 反撃率 | cnt |  |
| HP再生率 | hrg |  |
| MP再生率 | mrg |  |
| TP再生率 | trg |  |
| 狙われ率 | tgr |  |
| 防御効果率 | grd |  |
| 回復効果率 | rec |  |
| 薬の知識 | pha |  |
| MP消費率 | mcr |  |
| TPチャージ率 | tcr |  |
| 物理ダメージ率 | pdr |  |
| 魔法ダメージ率 | mdr |  |
| 床ダメージ率 | fdr |  |
| 経験獲得率 | exr |  |

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.0](FTKR_SearchPartyParam.js) | 2017/04/09 | 初版作成 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.ja.md)