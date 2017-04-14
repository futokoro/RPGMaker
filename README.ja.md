# RPGツクールMV プラグイン

## パラメータ系 プラグイン
| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_AddOriginalParameters](FTKR_AddOriginalParameters.js) | [あり](FTKR_AddOriginalParameters.ja.md) | [v1.1.2](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_AddOriginalParameters.js) | なし | オリジナルパラメータを追加する |
| [FTKR_SearchPartyParam](FTKR_SearchPartyParam.js) | [あり](FTKR_SearchPartyParam.ja.md) | [v1.0.1](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SearchPartyParam.js) | なし | パーティー内のパラメータに関するスクリプトを実装する |

## メニュー系 プラグイン

| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_CustomSimpleActorStatus](FTKR_CustomSimpleActorStatus.js) | [あり](FTKR_CustomSimpleActorStatus.ja.md) | [v1.2.4](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_CustomSimpleActorStatus.js) | なし | 簡易ステータス表示を変更する |
| [FTKR_CSS_BattleStatus](CSS_BattleStatus.js) | [あり](FTKR_CSS_BattleStatus.ja.md) | [v1.0.1](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_CSS_BattleStatus.js) | [FTKR_CustomSimpleActorStatus](FTKR_CustomSimpleActorStatus.js) | バトルステータス表示を変更する |
| [FTKR_DisplayCommandFrame](FTKR_DisplayCommandFrame.js) | [仮版](FTKR_DisplayCommandFrame.ja.md) | [v1.1.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_DisplayCommandFrame.js) | なし | コマンドに枠を付ける |

## メッセージ系 プラグイン

| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_ExEscapeCharacters](FTKR_ExEscapeCharacters.js) | [仮版](FTKR_ExEscapeCharacters.ja.md) | [v1.0.2](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExEscapeCharacters.js) | なし | 制御文字を追加する |
| [FTKR_ExMessageWindow](FTKR_ExMessageWindow.js) | [仮版](FTKR_ExMessageWindow.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExMessageWindow.js) | なし | 一度に複数のメッセージウィンドウを表示する |

## アイテム・スキル系 共通プラグイン

| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_ItemSelfVariables](FTKR_ItemSelfVariables.js) | [あり](FTKR_ItemSelfVariables.ja.md) | [v1.0.1](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ItemSelfVariables.js) | なし | アイテムとスキルにセルフ変数を追加する |
| [FTKR_ExItemConfig_Damage](FTKR_ExItemConfig_Damage.js) | [仮版](FTKR_ExItemConfig_Damage.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_Damage.js) | なし | アイテムとスキルのダメージ処理を拡張する |
| [FTKR_ExItemConfig_Effect](FTKR_ExItemConfig_Effect.js) | [仮版](FTKR_ExItemConfig_Effect.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_Effect.js) | なし | アイテムとスキルの使用効果を拡張する |
| [FTKR_ExItemConfig_Activate](FTKR_ExItemConfig_Activate.js) | [仮版](FTKR_ExItemConfig_Damage.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_Activate.js) | なし | アイテムとスキルの発動設定を拡張する |
| [FTKR_ExItemConfig_Required](FTKR_ExItemConfig_Required.js) | [仮版](FTKR_ExItemConfig_Required.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_Required.js) | なし | アイテムとスキルの使用条件を拡張する |

注意）FTKR_ExItemConfig_* と FTKR_SkillExpansion は組み合わせて使用できません。

## スキル系 プラグイン

| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_SkillExpansion](FTKR_SkillExpansion.js) | [作成中](#FTKR_SkillExpansion.ja.md) | [v1.3.3](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SkillExpansion.js) | なし | スキルの仕様を拡張する |
| [FTKR_SEP_ShowSkillStatus](FTKR_SEP_ShowSkillStatus.js) | [作成中](#FTKR_SEP_ShowSkillStatus.ja.md) | [v1.4.2](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SEP_ShowSkillStatus.js) | [FTKR_SkillExpansion](FTKR_SkillExpansion.js) | スキル画面の表示を拡張する |
| [FTKR_SkillTreeSystem](FTKR_SkillTreeSystem.js) | [あり](FTKR_SkillTreeSystem.ja.md) | [v1.6.3](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SkillTreeSystem.js) | なし | ツリー型のスキル習得システム |
| [FTKR_STS_CustomWindow](FTKR_STS_CustomWindow.js) | [作成中](#FTKR_STS_CustomWindow.ja.md) | [v1.0.2](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_STS_CustomWindow.js) | [FTKR_SkillTreeSystem](FTKR_SkillTreeSystem.js) | スキルツリー習得画面のレイアウトを変更する |
| [FTKR_SkillCounter](FTKR_SkillCounter.js) | [あり](FTKR_SkillCounter.ja.md) | [v1.0.1](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SkillCounter.js) | なし | 相手のスキルに対抗して効果を変える |
| [FTKR_SkillUpgradeSystem_Core](FTKR_SkillUpgradeSystem_Core.js) | [作成中](#FTKR_SkillUpgradeSystem_Core.ja.md) | [v1.4.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SkillUpgradeSystem_Core.js) | [FTKR_SkillExpansion](FTKR_SkillExpansion.js) | スキル強化システム |
| [FTKR_SkillUpgradeSystem_Window](FTKR_SkillUpgradeSystem_Window.js) | [作成中](#FTKR_SkillUpgradeSystem_Window.ja.md) | [v1.4.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_SkillUpgradeSystem_Window.js) | [FTKR_SkillExpansion](FTKR_SkillExpansion.js) <br>[FTKR_SEP_ShowSkillStatus](FTKR_SEP_ShowSkillStatus.js) <br> [FTKR_SkillUpgradeSystem_Core](FTKR_SkillUpgradeSystem_Core.js) | スキル強化システムの専用画面を実装する |

## アイテム系 プラグイン

| プラグイン | マニュアル | ダウンロード | 必須プラグイン | 説明 |
|:-----------|:-----------:|:-------------|:-------------|:-------------|
| [FTKR_ItemCompositionSystem](FTKR_ItemCompositionSystem.js) | [仮版](FTKR_ItemCompositionSystem.ja.md) | [v0.9.2](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ItemCompositionSystem.js) | なし | アイテム合成システム |
| [FTKR_ExItemConfig_ItemBasic](FTKR_ExItemConfig_ItemBasic.js) | [仮版](FTKR_ExItemConfig_ItemBasic.ja.md) | [v1.0.0](https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_ExItemConfig_ItemBasic.js) | なし | アイテムの基本設定を拡張する |
