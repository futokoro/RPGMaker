# 対応するかもしれないプラグインのメモ

あくまでも「対応するかもしれない」の一覧。<br>
対応しないかもしれないし、対応できないかもしれないし、いつやるかも決めていません。

※不具合については、できる限り優先して対応します。

## 要望
* FTKR_ConnectingMapGenerator
    * 各マップの遠景画像をそのまま使用できないか(遠景画像を複数組み合わせて表示)
* FTKR_CustomSimpleActorStatus
    * 通常能力値以外の各種能力値を表示する機能を追加
* FTKR_ExBattleEvent
    * 他プラグインとの競合回避

## 要望はないがやりたいと思っていること
* FTKR_SkillUpgradeSystem
    * 複数に分かれているプラグイン１つにまとめる⇒リメイク要
* FTKR_SkillTreeSystem
    * スキルツリー作成がもう少し簡単にできないか⇒リメイク要
* FTKR_FacialImageDifference2
    * 非戦闘時に顔画像を切り替える機能

## 保留
* FTKR_SkillTreeSystem
    * スキルツリー画面の負荷軽減⇒リメイク要のため保留
    * スキルツリー画面でスキルの配置を自由に設定できないか⇒リメイク要のため保留

## 対応済み
* FTKR_CSS_EquipStatusを使うと処理が重くなる？
* FTKR_CustomSimpleActorStatusのマニュアルページを v3.0.0 に合わせて修正
* FTKR_ChangeBattleSpeed
    * 不具合)変数を使わずに固定値に設定する機能が使えない
* FTKR_ExSvMotion
    * 状態モーションの優先度設定に、行動モーションも追加できるようにする
* FTKR_SkillTreeSystem
    * 習得回数ごとに別のスキルを習得させる機能
    * スキルツリー画面でスキル間の線を非表示にする機能
* FTKR_TitleScene
    * 不具合)クレジットを設定しないとエラーになる
* FTKR_AutoStateConditions
    * 不具合)マップ移動中にFPSが下がる⇒自動付与処理内容と実行タイミングを見直し

[トップページに戻る](README.md)

