# FTKR_CustomSimpleActorStatusプラグインおよび拡張プラグインの修正

# 現状の課題
表示するパラメータ数が多くなると、処理が重くなりすぎる。

特に装備画面で顕著。
30個程度のパラメータで、FPSが40前後まで落ちる場合がある。

# 推定要因
* evalメソッドの使用
* 正規表現のマッチングメソッド(match,exec)の使用
* ウィンドウリフレッシュ回数が多い

# 対応策
## evalメソッドの使用

プラグインパラメータやメモ欄のタグで設定した、スクリプト形式の入力内容を評価するために使用。

### 頻度大
全てのパラメータに対して、かならず実行するもの。

なし。

### 頻度中
全てのパラメータに対して必ずではないが、実行する可能性が高いもの。

* drawCssActorStatusText
    * statusListのx,y,widthの値が数値以外なら、eval()を使って評価し結果を求める。
    * 数値であれば実行しないため、頻度中。
    * FTKR_CSS_***プラグインの場合、プラグインパラメータの大部分がスクリプトになっており、そのせいで実行しているため、数値に直す。⇒対応済み
* drawCssActorStatusBase_A
    * statusListのvalueを、eval()を使って評価し結果を求める。
    * 「hp」「name」など、codeがvalueを必要とするパラメータ以外であれば実行しないが、「param(n)」や「custom(n)」などは使う可能性が高いため、頻度は中。
    * valueが数値なら実行しないように処理を見直す。⇒対応済み

### 頻度小
特定のコードに対してのみ実行するもの。

* drawCssActorCustom
    * カスタムパラメータのReferencesを、eval()を使って評価し結果を求める。
* drawCssActorGauge
    * カスタムゲージのReferences,Max,Currentを、eval()を使って評価し結果を求める。
* drawCssEval
    * JS評価式のvalueを、eval()を使って評価し結果を求める。
* drawCssText
    * テキストのvalueを、eval()を使って評価し結果を求める。


## 正規表現のマッチングメソッド(match,exec)の使用

プラグインパラメータやメモ欄のタグで設定した、入力内容のマッチングをするために使用。
主にコードを判別して、対応する処理を呼び出すときにswitch文と合わせて使用。

### 頻度大
全てのパラメータに対して、かならず実行するもの。

* match
    * Window_Base.prototype.drawCssActorStatusBases
        * statusListのcodeに[codeA/codeB]を使っているか判定し取得するために必ず実行
        * 新方式の場合に実行。
    * Window_Base.prototype.drawCssActorStatusBases_v2
        * statusのcodeに{code}を使っているか判定し取得するために必ず実行
        * statusのcodeに[codeA/codeB]を使っているか判定し取得するために必ず実行
        * 旧方式の場合に実行。
* exec
    * Window_Base.prototype.drawCssActorStatusBase
        * パラメータがcode(n)の形か判定するために必ず実行 ⇒ testに変える

### 頻度中
全てのパラメータに対して必ずではないが、実行する可能性が高いもの。

なし。

### 頻度小
特定のコードに対してのみ、または特定の状況のみ実行するもの。

* match
    * Game_Interpreter.prototype.pluginCommand
        * プラグインコマンドの内容を判定し取得するために必ず実行
    * DataManager.cssActorImageNotetags
        * メモ欄に<>～</>の記述があるか判定し取得するために必ず実行
    * Window_Base.prototype.drawCssActorCustom
        * カスタムパラメータのnameとunitの入力内容に制御文字LW[n]があるか判定し取得するために実行
        * 制御文字LW[n]は、FTKR_SkillTreeSystemsプラグイン専用。
    * Window_Base.prototype.drawCssActorGauge
        * カスタムゲージのnameとunitの入力内容に制御文字LW[n]があるか判定し取得するために実行
        * 制御文字LW[n]は、FTKR_SkillTreeSystemsプラグイン専用。
* exec
    * DataManager.readCssBgiMetaDatas
        * メモ欄のカスタム画像の設定を判定し取得するために必ず実行
    * DataManager.readCssCustomParamMetaDatas
        * メモ欄のカスタムパラメータの設定を判定し取得ために必ず実行

## ウィンドウリフレッシュ回数が多い

これは、コアスクリプト側の問題。

装備画面の場合の各操作とその時のリフレッシュ回数は、調べたところ以下のようになっている。
```
　　　　　　　　　　　　　　　　　　　ステ：アイ：ヘル：スロ
メニュー画面から装備画面に移る　　　：２回：２回：０回：２回
装備コマンドを選択　　　　　　　　　：０回：１回：１回：０回
最強装備コマンドを選択　　　　　　　：１回：０回：０回：１回
全て外すコマンドを選択　　　　　　　：１回：０回：０回：１回
コマンドウィンドウでキャンセル　　　：０回：０回：０回：０回

装備スロットでカーソルを動かす　　　：０回：１回：１回：０回
装備スロットでスロットを選択　　　　：２回：２回：２回：０回
装備スロットでキャンセル　　　　　　：０回：１回：１回：０回

アイテムウィンドウでカーソルを動かす：１回：０回：１回：０回
アイテムウィンドウでアイテムを選択　：２回：１回：２回：１回
アイテムウィンドウでキャンセル　　　：１回：０回：２回：０回
```
* ステ：装備ステータスウィンドウ
* アイ：装備アイテムウィンドウ
* ヘル：ヘルプウィンドウ
* スロ：装備スロットウィンドウ
