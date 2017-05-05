[トップページに戻る](README.md)

# [FTKR_SearchPartyParam](FTKR_SearchPartyParam.js) プラグイン

本プラグインを実装することで、パーティー内のパラメータや状態に関するスクリプトを実装します。

ダウンロード: [FTKR_SearchPartyParam.js](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SearchPartyParam.js)

## 目次

以下の項目の順でプラグインの使い方を説明します。
1. [概要](#概要)
2. [スクリプトコマンド](#スクリプトコマンド)
* [プラグインの更新履歴](#プラグインの更新履歴)
* [ライセンス](#ライセンス)

## 概要

本プラグインを実装することで、パーティー内のパラメータや状態に関するスクリプトを実装します。

[目次に戻る](#目次)

## 基本仕様

スクリプトの大文字で記述している文字列は、調べたい対象によって以下の記述に
変更してください。

### GROUP

以下の記述に置き換えます。
1. パーティー<br>
   `$gameParty`

2. 敵グループ(*1)<br>
   `$gameTroop`

3. パーティーと敵グループ(*2)<br>
   `$gameMember`

(*1) 戦闘中のみ使えます<br>
(*2) 戦闘中以外はパーティーのみになります
     なお、パーティーと敵グループでメンバーのIDが被るため
     使用時には、アクターかどうか判定する処理も合わせて実行してください。


### MEMBER

以下の記述に置き換えます。
1. GROUP内のすべてのメンバー(*3)<br>
   `members()`

2. GROUP内の生存メンバー<br>
   `aliveMembers()`

3. GROUP内の戦闘不能メンバー<br>
   `deadMembers()`

(*3) 戦闘中はバトルに参加しているメンバーのみ


### 入力例
パーティー内の生存しているメンバー<br>
`$gameParty.aliveMembers()`

敵グループ内の戦闘不能メンバー<br>
`$gameTroop.deadMembers()`

敵味方含む戦闘中のすべてのメンバー<br>
`$gameMember.members()`


## スクリプトコマンド

スクリプトの引数で入力する'param'については、[コードリスト](Code_List.ja.md#パラメータ名)を参照してください。

### パラメータ値を取得

| スクリプト | 取得する値 | 入力例 |
| --- | --- | --- |
| GROUP.MEMBER.sumParam('param') | メンバーの'param'の平均値 | $gameParty.member().sumParam('hp') |
| GROUP.MEMBER.averageParam('param') | メンバーの'param'の平均値 | $gameParty.member().averageParam('hp') |
| GROUP.MEMBER.maxParam('param') | メンバーの'param'の最大値 | $gameParty.member().maxParam('hp') |
| GROUP.MEMBER.minParam('param') | メンバーの'param'の最小値 | $gameParty.member().minParam('hp') |

### 指定条件のメンバーのIDを取得
該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得

| スクリプト | 取得する値 | 入力例 |
| --- | --- | --- |
| GROUP.MEMBER.isHighestParam('param') | 'param'の最大の値を持つメンバーのID | $gameParty.member().isHighestParam('hp') |
| GROUP.MEMBER.isLowestParam('param') | 'param'の最小の値を持つメンバーのID | $gameParty.member().isLowestParam('hp') |
| GROUP.MEMBER.isEquippedWeapon(n) | 武器ID n の装備をしているメンバーのID | $gameParty.member().isEquippedWeapon(10) |
| GROUP.MEMBER.isEquippedArmor(n)) | 防具ID n の装備をしているメンバーのID | $gameParty.member().isEquippedArmor(10) |
| GROUP.MEMBER.isLearnedSkill(x) | スキルID x を習得しているメンバーのID | $gameParty.member().isLearnedSkill(10) |
| GROUP.MEMBER.isStateAffected(x) | ステートID x を付与されているメンバーのID | $gameParty.member().isStateAffected(10) |

### 指定条件のメンバーのIDリスト(配列)を取得

| スクリプト | 取得する値 | 入力例 |
| --- | --- | --- |
| GROUP.MEMBER.isHigherParam('param', x) | 'param'が x を超えるメンバーのIDリスト | $gameParty.member().isHigherParam('hp', 500) |
| GROUP.MEMBER.isLowerParam('param', x) | 'param'が x 未満のメンバーのIDリスト | $gameParty.member().isLowerParam('hp', 500) |

[目次に戻る](#目次)

## プラグインの更新履歴

| バージョン | 公開日 | 更新内容 |
| --- | --- | --- |
| [ver1.0.1](FTKR_SearchPartyParam.js) | 2017/04/14 | 機能追加 |
| ver1.0.0 | 2017/04/09 | 初版作成 |

## ライセンス

本プラグインはMITライセンスのもとで公開しています。

[The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)

#
[目次に戻る](#目次)

[トップページに戻る](README.md)