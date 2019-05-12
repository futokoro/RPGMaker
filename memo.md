# 対応するかもしれないプラグインのメモ

あくまでも「対応するかもしれない」の一覧。<br>
不具合についてはできる限り優先して対応しますが、それ以外の要望や他プラグインとの競合回避については、余裕がある時に気が向いたら対応します。

## 要望

## 要望はないがやりたいと思っていること
* FTKR_SkillUpgradeSystem
    * 複数に分かれているプラグイン１つにまとめる⇒リメイク要
* FTKR_SkillTreeSystem
    * スキルツリー作成がもう少し簡単にできないか⇒リメイク要
* FTKR_FacialImageDifference2
    * 非戦闘時に顔画像を切り替える機能
* FTKR_AISkillEvalute
    * AIの設定方法をもう少し簡単にできないか
    * FF12のガンビット的な機能も付けてみたい
* FTKR_AddOriginalParameters
    * パラメータの追加方法をもう少し簡単にできないか⇒リメイク要

## 保留
* FTKR_SkillTreeSystem
    * スキルツリー画面の負荷軽減⇒リメイク要のため保留
    * スキルツリー画面でスキルの配置を自由に設定できないか⇒リメイク要のため保留
* FTKR_ConnectingMapGenerator
    * 各マップの遠景画像をそのまま使用できないか(遠景画像を複数組み合わせて表示)⇒実装厳しいです
* FTKR_ExBattleEvent
    * 他プラグイン(YEP_X_BattleSysCBT)との競合回避⇒厳しいです。
* FTKR_ExMessageWindow2
    * 他プラグイン(YEP_X_MessageBackLog)との競合回避⇒リメイク要のため保留

## 対応済み
* FTKR_CSS_EquipStatusを使うと処理が重くなる？
* FTKR_CustomSimpleActorStatusのマニュアルページを v3.0.0 に合わせて修正
* FTKR_CSS_ShopStatus
    * ショップ画面で装備品選択時のカーソル操作が鈍くなる、FTKR_AddOriginalParametersと併用有りでさらに遅くなる⇒軽減策導入
* FTKR_ChangeBattleSpeed
    * 不具合)変数を使わずに固定値に設定する機能が使えない
* FTKR_ExSvMotion
    * 状態モーションの優先度設定に、行動モーションも追加できるようにする
* FTKR_SkillTreeSystem
    * 習得回数ごとに別のスキルを習得させる機能
    * スキルツリー画面でスキル間の線を非表示にする機能
    * FTKR_CustomSimpleActorStatus との競合(Cursor Line Number)
* FTKR_TitleScene
    * 不具合)クレジットを設定しないとエラーになる
* FTKR_AutoStateConditions
    * 不具合)マップ移動中にFPSが下がる⇒自動付与処理内容と実行タイミングを見直し
* FTKR_CustomSimpleActorStatus
    * 通常能力値以外の各種能力値を表示する機能を追加
* FTKR_ExItemConfig_Effect
    * 不具合)内容1/内容2 で設定した内容が反映されない？FTKR_ExStateEffectsと併用


[トップページに戻る](README.md)

