[トップページに戻る](README.md)

# RPGツクールMVの戦闘システムの解析

プラグイン作成用にメモとして作成。

大きな流れは以下の通り。

1. [戦闘シーンの呼び出し](#戦闘シーンの呼び出し)
1. [マップシーンと戦闘シーンの切替](#マップシーンと戦闘シーンの切替)
1. [戦闘シーンの初期化](#戦闘シーンの初期化)
1. [戦闘の開始](#戦闘の開始)
1. [コマンド選択](#コマンド選択)
1. [ターン処理](#ターン処理)
1. [ターン終了](#ターン終了)
1. [戦闘中断の判定](#戦闘中断の判定)
1. [戦闘終了](#戦闘終了)

戦闘が中断しない限り、「コマンド選択」～「戦闘中断の判定」を繰り返す。

## 戦闘シーンの呼び出し

戦闘シーンを呼び出す方法は、以下の２通り。

* マップ上でエンカウント
* イベントで「戦闘の処理」実行

### マップ上でエンカウント

`Scene_Map.prototype.update()`内の`Scene_Map.prototype.updateScene()`で<br>
`Scene_Map.prototype.updateEncounter()`を実行
```
Scene_Map.prototype.updateEncounter = function() {
   if ($gamePlayer.executeEncounter()) {
       SceneManager.push(Scene_Battle);
   }
};
```
`$gamePlayer.executeEncounter()`を判定する
```
Game_Player.prototype.executeEncounter = function() {
    if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
        this.makeEncounterCount();
        var troopId = this.makeEncounterTroopId();
        if ($dataTroops[troopId]) {
            BattleManager.setup(troopId, true, false);
            BattleManager.onEncounter();
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
```
#### 内部の処理
`Game_Player._encounterCount`はプレイヤーがマップ上で移動すると減っていく値。カウント(敵出現歩数)。この値が０以下なら、以下を実行。

`$gamePlayer.makeEncounterCount()`<br>
エンカウント戦闘をするためのカウント(敵出現歩数)をリセット。

`BattleManager.setup(troopId, true, false)`<br>
戦闘の初期化処理。内部では以下を実行。
```
BattleManager.setup = function(troopId, canEscape, canLose) {
    this.initMembers();           //BattleManagerクラスの初期化
    this._canEscape = canEscape;  //逃走可能フラグ(エンカウント戦闘は可能)
    this._canLose = canLose;      //敗北可能フラグ(エンカウント戦闘は不可)
    $gameTroop.setup(troopId);    //出現する敵グループの設定
    $gameScreen.onBattleStart();  //イベントコマンドによる「画面」効果を止める。
    this.makeEscapeRatio();       //逃走確率の計算
};
```

`BattleManager.onEncounter()`<br>
先制攻撃と不意打ちの判定

を実行した後に

`SceneManager.push(Scene_Battle)`を実行、戦闘シーンを予約する。
```
SceneManager.push = function(sceneClass) {
    this._stack.push(this._scene.constructor);//今のシーンを保存
    this.goto(sceneClass);//次のシーンに移る
};
```

`SceneManager.goto()`内で以下の処理を実行。

```
SceneManager.goto = function(sceneClass) {
    if (sceneClass) {
        this._nextScene = new sceneClass();//入力されたシーンを次のシーンに予約
    }
    if (this._scene) {
        this._scene.stop();//今のシーンの終了処理を実行
    }
};
```
これにより、マップシーンを終了して、戦闘シーンに切り替える処理が動作する。

### イベントで「戦闘の処理」実行
`Game_Interpreter.prototype.command301()`を実行
```
Game_Interpreter.prototype.command301 = function() {
    if (!$gameParty.inBattle()) {
        var troopId;
        if (this._params[0] === 0) {  // Direct designation
            troopId = this._params[1];
        } else if (this._params[0] === 1) {  // Designation with a variable
            troopId = $gameVariables.value(this._params[1]);
        } else {  // Same as Random Encounter
            troopId = $gamePlayer.makeEncounterTroopId();
        }
        if ($dataTroops[troopId]) {
            BattleManager.setup(troopId, this._params[2], this._params[3]);
            BattleManager.setEventCallback(function(n) {
                this._branch[this._indent] = n;
            }.bind(this));
            $gamePlayer.makeEncounterCount();
            SceneManager.push(Scene_Battle);
        }
    }
    return true;
};
```

#### 内部の処理

`BattleManager.setup(troopId, canEscape, canLose)`<br>
戦闘の初期化処理。逃走可否と敗北可否は、イベントコマンドの設定による。

`BattleManager.setEventCallback(callback)`<br>
戦闘終了後に、勝利イベントや敗北イベントを実行するために、それらのイベントを予約する処理。

`$gamePlayer.makeEncounterCount()`<br>
エンカウント戦闘をするためのカウント(敵出現歩数)をリセット。

`SceneManager.push(Scene_Battle)`を実行、戦闘シーンを予約する。

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## マップシーンと戦闘シーンの切替

`Scene_Map.prototype.stop()`内で`Scene_Map.prototype.launchBattle`を実行。

```
Scene_Map.prototype.launchBattle = function() {
    BattleManager.saveBgmAndBgs();  //現在のBGMとBGSを保存
    this.stopAudioOnBattleStart();  //オーディオの再生を停止
    SoundManager.playBattleStart(); //戦闘開始時のSEを鳴らす
    this.startEncounterEffect();    //戦闘シーンへの切替エフェクトを実行
    this._mapNameWindow.hide();
};
```

戦闘シーンへの切替エフェクトを実行処理
```
Scene_Map.prototype.startEncounterEffect = function() {
    this._spriteset.hideCharacters();
    this._encounterEffectDuration = this.encounterEffectSpeed();
};
```

その後、`Scene_Map.prototype.update()`内で以下を実行するようになる<br>
`Scene_Map.prototype.updateEncounterEffect()`

```
Scene_Map.prototype.updateEncounterEffect = function() {
    if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        var speed = this.encounterEffectSpeed();
        var n = speed - this._encounterEffectDuration;
        var p = n / speed;
        var q = ((p - 1) * 20 * p + 5) * p + 1;
        var zoomX = $gamePlayer.screenX();
        var zoomY = $gamePlayer.screenY() - 24;
        if (n === 2) {
            $gameScreen.setZoom(zoomX, zoomY, 1);
            this.snapForBattleBackground();       //現在の画面をスナップショットとして保存
            this.startFlashForEncounter(speed / 2);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if (n === Math.floor(speed / 6)) {
            this.startFlashForEncounter(speed / 2);
        }
        if (n === Math.floor(speed / 2)) {
            BattleManager.playBattleBgm();        //戦闘BGMを再生
            this.startFadeOut(this.fadeSpeed());  //フェードアウト開始
        }
    }
};
```

処理が完了するとマップシーンを完全に終了し、戦闘シーンに切り替わる。

[上に戻る](#RPGツクールMVの戦闘システムの解析)

# 戦闘シーンの構成

RPGツクールMVの戦闘シーンに係るクラスは以下の通り。

## 戦闘シーンの流れに係るクラス

* `rpg_scenes.js`
    * `Scene_Battle`クラス
* `rpg_managers.js`
    * `BattleManager`クラス

これらのクラスの処理は、[戦闘シーンの流れの基本](#戦闘シーンの流れの基本)で説明する。
なお、それぞれのクラスの主従関係は、`Scene_Battle`が主で、`BattleManager`では従である。
まず、`Scene_Battle`が処理を行い、その中で`BattleManager`が動く。

## 戦闘シーンの表示に係るクラス

* `rpg_sprites.js`
    * `Spriteset_Battle`クラス …以下のSprite_***の全体をまとめているクラスで、戦闘背景もここで表示させている
    * `Sprite_Actor`クラス  …主にアクターのSVキャラを表示するクラスだが、フロントビューでも使用する
    * `Sprite_Enemy`クラス
    * `Sprite_Animation`クラス  …戦闘アニメーションを表示する
    * `Sprite_Damage`クラス …ダメージポップアップを表示する
    * `Sprite_StateOverlay`クラス　…アクターのSVキャラにステートの重ね合わせアニメを表示する
    * `Sprite_StateIcon`クラス …エネミーにステートアイコン表示する
    * `Sprite_Weapon`クラス　…アクターのSVキャラのモーションに、武器画像を重ねて表示する
* `rpg_windows.js`
    * `Window_BattleLog`クラス  …戦闘ログを表示させるクラスだが、戦闘アニメーションやダメージポップアップのタイミングなども制御する
    * `Window_PartyCommand`クラス
    * `Window_ActorCommand`クラス
    * `Window_BattleStatus`クラス
    * `Window_BattleActor`クラス
    * `Window_BattleEnemy`クラス
    * `Window_BattleSkill`クラス
    * `Window_BattleItem`クラス

これらのクラスの処理は、[戦闘シーンの表示の基本](#戦闘シーンの表示の基本)で説明する。

## 戦闘シーンで扱うデータ類およびその処理に係るクラス

* `rpg_objects.js`
    * `Game_Temp`クラス　…コモンイベントを予約する際の格納先
    * `Game_System`クラス
    * `Game_Switches`クラス
    * `Game_Variables`クラス
    * `Game_Screen`クラス   …画面効果（フラッシュや揺れなど）を制御するほか、イベントでピクチャを表示する場合にも係る
    * `Game_Item`クラス …スキルやアイテムのデータを管理する
    * `Game_Action`クラス   …スキルやアイテムを使用した時の効果(成功失敗、命中回避、ダメージ量など)を制御する
    * `Game_ActionResult`クラス …スキルやアイテムを使用した時の結果を管理する
    * `Game_Actor`クラス
    * `Game_Enemy`クラス
    * `Game_Party`クラス
    * `Game_Troop`クラス    …敵グループをまとめているクラスで、敵グループに設定したバトルイベントを制御するクラスでもある
    * `Game_Interpreter`クラス  …コモンイベントやバトルイベントの中のイベントコマンドの実行内容を制御する

# 戦闘シーンの流れの基本

PRGツクールMVでは、戦闘シーンの流れを大まかに７つのプロセスに分けている。
このそれぞれのプロセスを、ここではフェーズ(※1)と呼ぶこととする。

※1 戦闘中の現在フェーズは`BattleManager._phase`で取得できる。

７つのフェーズは、以下の通り。

| # | フェーズ名 | `BattleManager._phase`の中身 |
|:-----------|:-----------:|:-------------|
| 1 | [戦闘初期化フェーズ](#戦闘初期化フェーズ) |`init`|
| 2 | [戦闘開始フェーズ](#戦闘開始フェーズ) |`start`|
| 3 | [コマンド入力フェーズ](#コマンド入力フェーズ) |`input`|
| 4 | [ターンフェーズ](#ターンフェーズ) |`turn`|
| 5 | [行動フェーズ](#行動フェーズ) |`action`|
| 6 | [ターン終了フェーズ](#ターン終了フェーズ) |`turnEnd`|
| 7 | [戦闘終了フェーズ](#戦闘終了フェーズ) |`battleEnd`|

フェーズの中で、「戦闘初期化」「戦闘開始」「戦闘終了」フェーズは、１戦闘でそれぞれ１回ずつ実行するが、「コマンド入力」「ターン」「行動」「ターン終了」フェーズは、戦闘が続くかぎり何度も実行する。

この、「コマンド入力」～「ターン終了」までの一連の流れが、戦闘における１ターンを意味する。

また１ターンの中では、「ターン」と「行動」フェーズは戦闘に参加しているアクターとエネミーの数だけ繰り返し実行する。
例えば、アクター１とアクター２、エネミー１が戦闘に参加していた場合に、
```
コマンド入力フェーズ ⇒
　アクター１のターンフェーズ（開始） ⇒ アクター１の行動フェーズ ⇒ アクター１のターンフェーズ（終了） ⇒
　　アクター２のターンフェーズ（開始） ⇒ アクター２の行動フェーズ ⇒ アクター２のターンフェーズ（終了） ⇒
　　　エネミー１のターンフェーズ（開始） ⇒ エネミー１の行動フェーズ ⇒ エネミー１のターンフェーズ（終了） ⇒
　　　　ターン終了フェーズ ⇒
　　　　　次のターンのコマンド入力フェーズ ⇒...
```
のように、ターンが進んだりする。

フェーズそれぞれの処理内容については、以降で説明する。

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# 戦闘初期化フェーズ

戦闘初期化フェーズでは、まず戦闘シーンの立ち上げ処理が走る。

1. まず戦闘シーンデータを作成し `Scene_Battle.prototype.create()`
2. 次に戦闘シーンの開始処理を実行し `Scene_Battle.prototype.start()`
3. その後は戦闘シーンが終了するまで、更新処理を繰り返し実行する `Scene_Battle.prototype.update()`

## create
```
Scene_Battle.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();
};
```
コアスクリプト上では、`Scene_Base.prototype.create`は空(何も実行しない)である。

```
Scene_Battle.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
    BattleManager.setLogWindow(this._logWindow);
    BattleManager.setStatusWindow(this._statusWindow);
    BattleManager.setSpriteset(this._spriteset);
    this._logWindow.setSpriteset(this._spriteset);
};
```
ここで、戦闘画面を構成するキャラクタ画像や、背景、ウィンドウなどのオブジェクトを生成する。

### オブジェクトの生成順番

生成の順番は以下の通り。

1. `Spriteset_Battle`
    1. 戦闘背景の下地
    2. マップで設定した戦闘背景
    3. エネミーキャラクター
    4. アクターキャラクター(フロントビューの場合は透明なキャラを生成する)
1. 戦闘ログウィンドウ `Window_BattleLog`
1. ステータスウィンドウ `Window_BattleStatus`
1. パーティーコマンドウィンドウ
1. アクターコマンドウィンドウ
1. 説明文ウィンドウ
1. スキル選択ウィンドウ
1. アイテム選択ウィンドウ
1. アクター選択ウィンドウ
1. エネミー選択ウィンドウ
1. メッセージウィンドウ
1. 文章スクロールウィンドウ

### オブジェクトの紐づけ

以下のオブジェクトは`BattleManager`に紐づけされる。
* `Spriteset_Battle`
* `Window_BattleLog`
* `Window_BattleStatus`

これは、`BattleManager`の中で、各種スプライトや、戦闘ログ、ステータス表示を制御するため。

また、`Spriteset_Battle`は、`Window_BattleLog`にも紐づけされる。
これは、戦闘ログの表示タイミングと、スキルのモーションやアニメーションの表示タイミングを合わせるため、`Window_BattleLog`側でスプライトを制御しているから。

### レイヤー

なお、`Spriteset_Battle`と、戦闘シーンウィンドウは別のレイヤーに紐づいて表示しているため、スプライトとウィンドウが重なっても透過して表示できる。
ただし、スプライト同士や、ウィンドウ同士などの同じレイヤーに表示しているものが重なった場合は、透過できずに後に生成したオブジェクトのみ表示される。

## start
`Scene_Battle.prototype.start()`を実行。この中で、`BattleManager.startBattle()`を実行する。
```
Scene_Battle.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.fadeSpeed(), false);  //フェードイン実行
    BattleManager.playBattleBgm();              //戦闘BGMの再生
    BattleManager.startBattle();
};
```

`BattleManager.startBattle()`の中で、戦闘フェーズを`start`に変更する。
```
BattleManager.startBattle = function() {
    this._phase = 'start';        //戦闘フェーズをstartにセット
    $gameSystem.onBattleStart();  //戦闘回数を１増加
    $gameParty.onBattleStart();   //行動ステート、SVキャラのモーションとTPの初期化
    $gameTroop.onBattleStart();   //行動ステート、TPの初期化
    this.displayStartMessages();  //戦闘開始時のメッセージを表示
};
```

#### 行動ステート(ActionState)
そのキャラが現在どういう状態かを設定するパラメータ。(造語)<br>
undecided(未定),inputting(コマンド入力中),waitting(待機中),acting(行動中)のいずれかの文字列を格納する。<br>
戦闘開始時では`undecided`状態になる。


## update
`Scene_Battle.prototype.update`の処理内容は以下の通り。
```
Scene_Battle.prototype.update = function() {
    var active = this.isActive();
    $gameTimer.update(active);
    $gameScreen.update();
    this.updateStatusWindow();
    this.updateWindowPositions();
    if (active && !this.isBusy()) {
        this.updateBattleProcess();
    }
    Scene_Base.prototype.update.call(this);
};
```

#### `$gameTimer.update(active)`
タイマー処理を更新。

#### `$gameScreen.update()`
画面効果処理を更新。

#### `Scene_Battle.prototype.updateStatusWindow()`
この処理は、ステータスウィンドウの表示非表示を制御する。具体的には
* メッセージを表示している時には、ステータスウィンドウとコマンドウィンドウを隠す
* メッセージを表示していない時には、ステータスウィンドウを表示する

#### `Scene_Battle.prototype.updateWindowPositions()`
この処理は、ステータスウィンドウの表示位置を制御する。具体的には
* コマンドウィンドウを表示している間は、画面右寄せで表示
* コマンドウィンドウを表示していない間は、画面中央に表示

#### `Scene_Battle.prototype.updateBattleProcess()`
この中で、`BattleManager.update()`と`Scene_Battle.prototype.changeInputWindow()`を実行して、戦闘シーンの処理を行う。
```
Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
        BattleManager.update();
        this.changeInputWindow();
    }
};
```

#### `Scene_Base.prototype.update`
```
Scene_Base.prototype.update = function() {
    this.updateFade();      //画面のフェード効果を更新する
    this.updateChildren();  //Scene_Battleのchildrenを更新する
};
```

#### `Scene_Base.prototype.updateChildren`
addChild()でScene_Battleのchildrenにしたオブジェクトを更新する。
```
Scene_Base.prototype.updateChildren = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};
```

### BattleManager.update
`BattleManager.update()`は以下の内容になっており、戦闘フェーズに従って、戦闘のプロセスが進行する。
```
BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'start':
            this.startInput();
            break;
        case 'turn':
            this.updateTurn();
            break;
        case 'action':
            this.updateAction();
            break;
        case 'turnEnd':
            this.updateTurnEnd();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};
```

また、`Scene_Battle.prototype.changeInputWindow()`は以下の内容になっており、戦闘フェーズが`input`の時に、アクターのコマンド選択を行う処理を実行する。
```
Scene_Battle.prototype.changeInputWindow = function() {
    if (BattleManager.isInputting()) {
        if (BattleManager.actor()) {
            this.startActorCommandSelection();//アクターごとのコマンドの表示と選択処理
        } else {
            this.startPartyCommandSelection();//パーティーコマンドの表示と選択処理
        }
    } else {
        this.endCommandSelection();//コマンドウィンドウを非表示化
    }
};
```

`BattleManager.isInputting`は、戦闘フェーズが`input`かどうかを判定する。
```
BattleManager.isInputting = function() {
    return this._phase === 'input';
};
```

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# 戦闘開始フェーズ

戦闘フェーズが`start`の時、`BattleManager.update()`で以下を実行する。

`BattleManager.startInput()`
```
BattleManager.startInput = function() {
    this._phase = 'input';    //次のフェーズを予約
    $gameParty.makeActions(); //アクターの行動について初期設定する
    $gameTroop.makeActions(); //エネミーの行動について初期設定する
    this.clearActor();        //アクターの選択状態を初期化し、誰も選択していない状態にする
    if (this._surprise || !$gameParty.canInput()) {
        this.startTurn();     //不意打ち、またはアクターが誰もコマンド入力できない場合、turnフェーズに移る処理を実行
    }
};
```
処理が終わると、inputフェーズに移行する。

### 補足

`$gameParty.makeActions()`<br>
アクターの行動について初期設定する。ここでは、各アクターの行動回数を特徴から読み取り、コマンド入力可能な回数を設定する。

`$gameTroop.makeActions()`<br>
エネミーの行動について初期設定する。エネミーの場合は、この段階でどのスキルを使用するかの設定も行う。

`BattleManager.clearActor()`<br>
アクターの選択状態を初期化し、誰も選択していない状態にする。
アクターの選択状態は、`BattleManager.actor()`で取得できる。
`Scene_Battle.prototype.changeInputWindow()`の内容にあるとおりに、誰も選択していない状態でないとパーティーコマンドを表示しないため、この処理を行う必要がある。

`$gameParty.canInput()`<br>
パーティーの誰かがコマンド入力を受け付けるか判定を行う。
行動入力を受け付けない状態とは、<br>
1. 隠れている(敵グループで「途中から出現」に設定し、まだ出現していない場合)
2. 行動制約を「なし」以外に設定したステートが付与されている
3. 自動戦闘の特徴を持っている

のいずれかである。<br>
アクターには隠れる設定はないが、これはcanInput()メソッドは、アクターとエネミー共通の処理だからである。

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# コマンド入力フェーズ

戦闘フェーズが`input`の時、`Scene_Battle.prototype.changeInputWindow()`で、コマンドを呼び出す処理を実行する。

アクターが誰も選択されていない状態で始まるため、まず`Scene_Battle.prototype.startPartyCommandSelection()`でパーティーコマンドを表示する。

「戦う」コマンドを選択すると、`Scene_Battle.prototype.commandFight()`を実行。内部では、`Scene_Battle.prototype.selectNextCommand()`を実行する。

```
Scene_Battle.prototype.selectNextCommand = function() {
    BattleManager.selectNextCommand(); 
    this.changeInputWindow();
};
```
`BattleManager.selectNextCommand()`<br>
パーティーの次のキャラにアクター選択を移す。誰も選択していない状態では、パーティーの先頭に移る。戦闘パーティーの最後のキャラから実行した場合、`BattleManager.startTurn()`が実行される。

アクターを次のキャラに移した後に、`Scene_Battle.prototype.schangeInputWindow()`でアクターコマンドを表示させる。

戦闘パーティーの最後のキャラのコマンドを選択すると、turnフェーズに移る処理を実行。

```
BattleManager.startTurn = function() {
    this._phase = 'turn';               //次のフェーズをturnにする。
    this.clearActor();                  //誰も選択していない状態にする。
    $gameTroop.increaseTurn();          //ターンを１増やす
    this.makeActionOrders();            //アクターとエネミーの行動順を設定。
    $gameParty.requestMotionRefresh();  //SVキャラのモーションを再設定。
    this._logWindow.startTurn();        //ターン開始のログ処理を実行。
};
```
`BattleManager.makeActionOrders()`<br>
アクターとエネミーの行動順を設定。速度は、アクターとエネミーのそれぞれで、
以下のメソッドに従い数値化し、速度の大きい順に行動順を決定する。
```
Game_Action.prototype.speed = function() {
    var agi = this.subject().agi;   //ベースはキャラの敏捷性(AGI)
    //その値に、0 ~ (5 + 敏捷性の25%)のランダム値を加算
    var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    if (this.item()) {
        speed += this.item().speed; //さらにスキルの速度補正を加算
    }
    if (this.isAttack()) {
        //通常攻撃なら、さらにアクター等の特徴の攻撃速度補正値を加算する
        speed += this.subject().attackSpeed(); 
    }
    return speed;
};
```

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# ターンフェーズ
戦闘フェーズが turn の時、`BattleManager.updateTurn()`を実行する。
turnフェーズでは、`BattleManager.makeActionOrders()`で決定した行動順に従い、１キャラずつ行動を実行させる。

この時、行動実行しているキャラは`BattleManager._subject`に格納されている。

```
BattleManager.updateTurn = function() {
    $gameParty.requestMotionRefresh();
    if (!this._subject) {
        this._subject = this.getNextSubject();
    }
    if (this._subject) {
        this.processTurn();
    } else {
        this.endTurn();
    }
};
```
`BattleManager.getNextSubject()`<br>
次の行動順のキャラを参照する。上記のif文では、行動実行キャラが設定されていない場合、このメソッドを実行し、次の行動順のキャラを`BattleManager._subject`に格納する。
ただし、全員が行動済みの場合は、実行しても`null`になる。

`BattleManager.processTurn()`<br>
行動実行キャラがいる場合は、そのキャラが選択したスキルを実行する処理を呼び出す。
このメソッドは、１キャラに対して２回実行する。１回目は行動選択済みにより、行動の実行処理を、２回目は行動初期化後により終了処理を実行し、次のキャラに移行する。

```
BattleManager.processTurn = function() {
    var subject = this._subject;
    var action = subject.currentAction(); //そのキャラが選択した行動を参照
    if (action) {
        //そのキャラが混乱中で、行動が強制されていない場合は、通常攻撃に変更
        action.prepare(); 
        if (action.isValid()) {   //選択した行動を実行可能か判定
            this.startAction();   //スキル実行処理を呼び出す
        }
        subject.removeCurrentAction();    //選択していた行動を初期化
    } else {//行動を選択していない場合は以下の処理
        subject.onAllActionsEnd();    //そのキャラに対して行動終了処理を行う
        this.refreshStatus();         //ステータスウィンドウの再描画
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
        this._subject = this.getNextSubject();    //次のキャラに移行
    }
};
```
`Game_Battler.prototype.onAllActionsEnd()`<br>
そのキャラに対して次の行動終了処理を行う。
行動結果の初期化、ステートや強化の解除判定。

`Window_BattleLog.prototype.displayAutoAffectedStatus(subject)`<br>
スキルの対象になったキャラに付与されたステートの、状態になったときのログを表示。

`Window_BattleLog.prototype.displayCurrentState(subject)`<br>
行動したキャラが現在付与されているステートで、一番優先度の高いものの継続ログを表示。

`Window_BattleLog.prototype.displayRegeneration(subject)`<br>
HP再生率によるHPダメージをポップアップ表示。

 `BattleManager.endTrun()`<br>
行動実行キャラがいない(全員が行動済み)場合は、ターン終了の処理を呼び出す。
```
BattleManager.endTurn = function() {
    this._phase = 'turnEnd';    //次のフェーズをturnEndにする
    this._preemptive = false;   //先制攻撃フラグをOFF
    this._surprise = false;     //不意打ちフラグをOFF
    this.allBattleMembers().forEach(function(battler) {
        battler.onTurnEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayRegeneration(battler);
    }, this);
    //イベントコマンドの「行動の強制」で行動を追加した場合は、そのフラグを消す
    if (this.isForcedTurn()) {
        this._turnForced = false;
    }
};
```

`Game_Battler.prototype.onTurnEnd()`<br>
バトルに参加している全キャラに対してターン終了処理を実行。

```
Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();     //行動結果の初期化
    this.regenerateAll();   //HP、MP、TPの再生効果を発動
    if (!BattleManager.isForcedTurn()) {
        this.updateStateTurns();   //ターン経過によるステートの更新
        this.updateBuffTurns();    //ターン経過による強化の更新
    }
    this.removeStatesAuto(2);      //ターン経過によるステートの解除
};
```

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# ターン終了フェーズ
戦闘フェーズが turnEnd の時、`BattleManager.updateTurnEnd()`を実行する。
ただし、内容は`BattleManager.startInput()`を実行するだけ。
```
BattleManager.updateTurnEnd = function() {
    this.startInput();
};
```

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## 戦闘中断の判定
戦闘中、以下の条件を満たすと`BattleManager.endBattle()`が実行され、フェーズが battleEnd に移行する。

1. エネミーが全滅
2. アクターが全滅
3. 逃走が成功

なお、この判定は`BattleManager.checkBattleEnd()`で行っており、このメソッドは`BattleManager.update()`の中で毎回判定している。

エネミーが全滅の場合＝戦闘に勝利
```
BattleManager.processVictory = function() {
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
    this.playVictoryMe();
    this.replayBgmAndBgs();
    this.makeRewards();
    this.displayVictoryMessage();
    this.displayRewards();
    this.gainRewards();
    this.endBattle(0);
};
```

アクターが全滅の場合＝戦闘に敗北
```
BattleManager.processDefeat = function() {
    this.displayDefeatMessage();
    this.playDefeatMe();
    if (this._canLose) {
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    this.endBattle(2);
};
```

```
BattleManager.endBattle = function(result) {
    this._phase = 'battleEnd';    //次のフェーズを battleEnd にする。
    //戦闘終了後イベントを予約していたら、それを呼び出す。
    if (this._eventCallback) {
        this._eventCallback(result);
    }
    if (result === 0) {
        $gameSystem.onBattleWin();
    } else if (this._escaped) {
        $gameSystem.onBattleEscape();
    }
};
```
[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

# 戦闘終了フェーズ
戦闘フェーズが battleEnd の時、`BattleManager.updateTurnEnd()`を実行する。

```
BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    } else {
        SceneManager.pop();
    }
    this._phase = null;
};
```

[戦闘シーンの基本に戻る](#戦闘シーンの基本) [上に戻る](#RPGツクールMVの戦闘システムの解析)

[トップページに戻る](README.md)

# 戦闘シーンの表示の基本

# 戦闘シーンのスプライトの表示

戦闘シーンのスプライトは、`Spriteset_Battle`クラスでまとめて管理している。このクラスで生成するスプライトは

1. 戦闘背景の下地
2. マップで設定した戦闘背景
3. エネミーキャラクター
4. アクターキャラクター(フロントビューの場合は透明なキャラを生成する)

### 戦闘シーンスプライトの生成
```
Spriteset_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.setFrame(0, 0, Graphics.width, Graphics.height);
    this._tone = [0, 0, 0, 0];
    this.opaque = true;
    this.createLowerLayer();
    this.createToneChanger();
    this.createUpperLayer();
    this.update();
};
```

```
Spriteset_Battle.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createBackground();
    this.createBattleField();
    this.createBattleback();
    this.createEnemies();
    this.createActors();
};
```

```
Spriteset_Base.prototype.createToneChanger = function() {
    if (Graphics.isWebGL()) {
        this.createWebGLToneChanger();
    } else {
        this.createCanvasToneChanger();
    }
};
```

```
Spriteset_Base.prototype.createUpperLayer = function() {
    this.createPictures();
    this.createTimer();
    this.createScreenSprites();
};
```

### 戦闘シーンスプライトの更新
```
Spriteset_Battle.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateActors();
    this.updateBattleback();
};
```

## 戦闘背景の下地

## 戦闘背景

## エネミーキャラクター

## アクターキャラクター

### アクタースプライトの生成

アクターキャラクターは`Spriteset_Battle.prototype.createActors`で生成される。
```
Spriteset_Battle.prototype.createActors = function() {
    this._actorSprites = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
        this._actorSprites[i] = new Sprite_Actor();
        this._battleField.addChild(this._actorSprites[i]);
    }
};
```
生成したスプライトオブジェクトは`Spriteset_Battle._actorSprites[n]`に格納される。
また、`Spriteset_Battle._battleFirld`のchildrenとして登録される。

ただし、この時点では生成したスプライトオブジェクトは、アクターデータと紐づいていない。

`new Sprite_Actor()`でアクタースプライトが生成されるが、この時に実行するメソッドは、以下の通り。

* `initialize()`
    * `initMembers()`
        * `createShadowSprite()`    影画像用のスプライトを生成
        * `createWeaponSprite()`    武器画像用のスプライトを生成
        * `createMainSprite()`      ここでキャラクタ画像用のスプライトを生成
        * `createStateSprite()`     ステート重ね合わせ用スプライトを生成
    * `setBattler(battler)`     アクターデータと紐づけ、ただしスプライト生成時には空データ
    * `moveToStartPosition()`   初期位置を設定

#### moveToStartPosition()
アクタースプライトを初期位置に移動させる。
```
Sprite_Actor.prototype.moveToStartPosition = function() {
    this.startMove(300, 0, 0);
};
```
数値の意味は、左からX座標を+300、Y座標を+0、移動時間を0である。

アクタースプライトの位置や移動については、[アクタースプライトの移動](#アクタースプライトの移動)で説明する。

### アクターデータとの紐づけ

アクターデータと紐づけられるのは、`Spriteset_Battle.prototype.updateActors`を実行した時になる。
```
Spriteset_Battle.prototype.updateActors = function() {
    var members = $gameParty.battleMembers();
    for (var i = 0; i < this._actorSprites.length; i++) {
        this._actorSprites[i].setBattler(members[i]);
    }
};
```

`setBattler()`で、パーティーの並び順に合わせて、アクタースプライトにアクターデータを紐づける。

#### setBattler(battler)
```
Sprite_Actor.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    var changed = (battler !== this._actor);
    if (changed) {
        this._actor = battler;
        if (battler) {
            this.setActorHome(battler.index());
        }
        this.startEntryMotion();
        this._stateSprite.setup(battler);
    }
};
```
空の状態から、アクターデータがセットされることで、以下の処理を実行する。

#### setActorHome(index)
ここで、アクターの並び順に合わせた基準立ち位置を設定する。（現在位置とは別）

```
Sprite_Actor.prototype.setActorHome = function(index) {
    this.setHome(600 + index * 32, 280 + index * 48);
};
```
先頭キャラの座標(600,280)を基準に、Xに+32、Yに+48ずつずれて表示させる。
なお、画面の左上が(0,0)である。

この処理の前に、`moveToStartPosition`でX座標を+300に設定しているため、戦闘開始時の初期位置は画面外になる。

アクタースプライトの位置や移動については、[アクタースプライトの移動](#アクタースプライトの移動)で説明する。

#### startEntryMotion()
ここで、戦闘開始時のアクタースプライトの初期モーションを設定する。
```
Sprite_Actor.prototype.startEntryMotion = function() {
    if (this._actor && this._actor.canMove()) {
        this.startMotion('walk');
        this.startMove(0, 0, 30);
    } else if (!this.isMoving()) {
        this.refreshMotion();
        this.startMove(0, 0, 0);
    }
};
```
行動可能(`this._actor.canMove()`で判定)なら前進モーション(`walk`)、行動不可（行動できないステート付与中など）ならその時のアクターの状態に合わせたモーションを設定する。

更に、`startMove(0, 0, 30)`で戦闘開始位置(画面外)から基準立ち位置に移動させることで、戦闘開始時に画面外から移動してくる動作を行う。

アクタースプライトのモーションについては、[アクタースプライトのモーション](#アクタースプライトのモーション)で説明する。

### アクタースプライトの更新

アクタースプライトの更新は、`Sprite_Actor.prototype.update`で実行される。
アクタースプライトの更新内容とその順番は以下の通り。

* アニメーションスプライトの更新
* キャラクタ画像スプライトの更新
* アニメーションの更新
* ダメージポップアップの更新
* キャラクタ選択効果の更新
* 影スプライトの更新
* モーションの更新

```
Sprite_Actor.prototype.update = function() {
    Sprite_Battler.prototype.update.call(this);
    this.updateShadow();
    if (this._actor) {
        this.updateMotion();
    }
};

Sprite_Battler.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler) {
        this.updateMain();
        this.updateAnimation();
        this.updateDamagePopup();
        this.updateSelectionEffect();
    } else {
        this.bitmap = null;
    }
};
```

#### キャラクタ画像スプライトの更新
```
Sprite_Actor.prototype.updateMain = function() {
    Sprite_Battler.prototype.updateMain.call(this);
    if (this._actor.isSpriteVisible() && !this.isMoving()) {
        this.updateTargetPosition();
    }
};

Sprite_Battler.prototype.updateMain = function() {
    if (this._battler.isSpriteVisible()) {
        this.updateBitmap();
        this.updateFrame();
    }
    this.updateMove();
    this.updatePosition();
};
```

#### アニメーションの更新

### アクタースプライトの移動
アクタースプライトを移動させるためには、基本的に`startMove()`を使用する。

#### startMove(x, y, direction)
`startMove()`は、基準立ち位置からの相対座標で移動先を指示するメソッド。
```
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
        this._targetOffsetX = x;
        this._targetOffsetY = y;
        this._movementDuration = duration;
        if (duration === 0) {
            this._offsetX = x;
            this._offsetY = y;
        }
    }
};
```
移動先を設定するメソッドであり、実際に移動させる処理は`updateMove()`メソッドと`updatePosition()`メソッドで行う。
どちらのメソッドも`updateMain()`メソッドの中で実行される。

なお、`startMove(0, 0, 任意)`を実行した場合には、基準立ち位置に戻る、という動作になる。

#### updateMove()
ここでは、`startMove`で指定した移動時間に合わせたフレーム単位の移動距離を算出し、それを`_offsetX`と`_offsetY`に設定する。
```
Sprite_Actor.prototype.updateMove = function() {
    var bitmap = this._mainSprite.bitmap;
    if (!bitmap || bitmap.isReady()) {
        Sprite_Battler.prototype.updateMove.call(this);
    }
};

Sprite_Battler.prototype.updateMove = function() {
    if (this._movementDuration > 0) {
        var d = this._movementDuration;
        this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
        this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
        this._movementDuration--;
        if (this._movementDuration === 0) {
            this.onMoveEnd();
        }
    }
};
```

#### updatePosition()
`updateMove`で設定した`_offsetX`と`_offsetY`を基準立ち位置(`_homeX`,`_homeY`)に足すことで、現在位置を更新する。
```
Sprite_Battler.prototype.updatePosition = function() {
    this.x = this._homeX + this._offsetX;
    this.y = this._homeY + this._offsetY;
};
```

なお、ここでの`x`と`y`は、アクタースプライトの表示位置であって、アクターのキャラクタ画像の表示位置とは別であることに注意。

#### Sprite_Actor.prototype.updateTargetPosition()
戦闘中にアクタースプライトが前後に移動する処理は、`updateTargetPosition()`で制御している。
アクターのゲームデータ(`$gameActor`)、アクタースプライトの立ち位置、戦闘シーンの状態から判定し、どのように動くか決めている。
```
Sprite_Actor.prototype.updateTargetPosition = function() {
    if (this._actor.isInputting() || this._actor.isActing()) {
        this.stepForward();
    } else if (this._actor.canMove() && BattleManager.isEscaped()) {
        this.retreat();
    } else if (!this.inHomePosition()) {
        this.stepBack();
    }
};
```

このメソッドが実行される構成は、以下の通り。
* `Scene_Battle`クラスの`update()`
    * `Spriteset_Battle`クラスの`update()`
        * `Sprite_Actor`クラスの`update()`
            * `Sprite_Actor`クラスの`updateMain()`
                * `Sprite_Actor`クラスの`updateTargetPosition()`

```
Sprite_Actor.prototype.updateMain = function() {
    Sprite_Battler.prototype.updateMain.call(this);
    if (this._actor.isSpriteVisible() && !this.isMoving()) {
        this.updateTargetPosition();
    }
};
```
###### this._actor.isSpriteVisible()
アクターデータを参照し、アクターのスプライトを表示しているか判定する。
実際には、アクターの場合はサイドビューモードかどうかで判定している。
```
Game_Actor.prototype.isSpriteVisible = function() {
    return $gameSystem.isSideView();
};
```

###### this.isMoving()
アクターのスプライトデータを参照し、移動中かどうか判定する。
```
Sprite_Battler.prototype.isMoving = function() {
    return this._movementDuration > 0;
};
```
移動中とは、スプライトデータの`_movementDuration`が0よりも大きい状態のこと。
この値は、`startMove()`メソッドで移動時間を設定すると変動する。

##### 一歩前進
アクターデータを参照し、アクターの[行動ステート](#行動ステート(actionstate))が`inputting`か`acting`なら、48pixel分、基準立位置から画面左側に12フレーム使って移動する。
```
Sprite_Actor.prototype.stepForward = function() {
    this.startMove(-48, 0, 12);
};
```
行動ステート`inputting`は、`BattleManager`クラスの`changeActor(newActorIndex, lastActorActionState)`メソッドで、`newActorIndex`で指定されたアクターがなる状態。
このメソッドは、コマンド入力フェーズでアクターを切り替える時に実行している。
このメソッドが実行される構成は、以下の通り。

* `Scene_Battle`クラスの`selectNextCommand()`メソッド
    * `BattleManager`クラスの`selectNextCommand()`メソッド
        * `BattleManager`クラスの`changeActor(newActorIndex, lastActorActionState)`メソッド
            * `Game_Actor`クラスの`setActionState(actionState)`メソッド ← `actionState`=`inputting`

`Scene_Battle`クラスの`selectNextCommand()`メソッドが実行される構成は、以下の通り。

* `Scene_Battle`クラスの`changeInputWindow()`(コマンド入力フェーズ)
    * `Scene_Battle`クラスの`startPartyCommandSelection()`
        * `Scene_Battle`クラスの`commandFight()` 
            * `Scene_Battle`クラスの`selectNextCommand()` → パーティーコマンドで「戦う」選択した場合
    * `Scene_Battle`クラスの`startActorCommandSelection()`
        * `Scene_Battle`クラスの`commandAttack()`
            * `Scene_Battle`クラスの`selectEnemySelection()`
                * `Scene_Battle`クラスの`onEnemyOk()`
                    * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「攻撃」を選択し、その対象エネミーを選択した場合
        * `Scene_Battle`クラスの`commandGuard()`
            * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「防御」選択した場合
        * `Scene_Battle`クラスの`onSkillOk()`
            * `Scene_Battle`クラスの`onSelectAction()`
                * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「スキル」を選択し、そのスキルの対象選択が不要な場合
            * `Scene_Battle`クラスの`selectActorSelection()`
                * `Scene_Battle`クラスの`onActorOk()`
                    * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「スキル」を選択し、その対象アクターを選択した場合
            * `Scene_Battle`クラスの`selectEnemySelection()`
                * `Scene_Battle`クラスの`onEnemyOk()`
                    * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「スキル」を選択し、その対象エネミーを選択した場合
        * `Scene_Battle`クラスの`onItemOk()`
            * `Scene_Battle`クラスの`onSelectAction()`
                * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「アイテム」を選択し、そのスアイテムの対象選択が不要な場合
            * `Scene_Battle`クラスの`selectActorSelection()`
                * `Scene_Battle`クラスの`onActorOk()`
                    * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「アイテム」を選択し、その対象アクターを選択した場合
            * `Scene_Battle`クラスの`selectEnemySelection()`
                * `Scene_Battle`クラスの`onEnemyOk()`
                    * `Scene_Battle`クラスの`selectNextCommand()` → アクターコマンドで「アイテム」を選択し、その対象エネミーを選択した場合

行動ステート`acting`は、`Game_Actor`クラスの`performActionStart(action)`メソッドを実行したアクターが、`action`に指定した行動が防御以外の時になる状態。このメソッドが実行される構成は、以下の通り。

* `BattleManager`クラスの`updateTurn()`メソッド(ターンフェーズ)
    * `BattleManager`クラスの`processTurn()`メソッド
        * `BattleManager`クラスの`startAction()`メソッド
            * `Window_BattleLog`クラスの`startAction(subject, action, targets)`メソッド
                * `Window_BattleLog`クラスの`performActionStart(subject, action)`メソッド
                    * `Game_Actor`クラスの`performActionStart(action)`メソッド
                        * `Game_Actor`クラスの`setActionState(actionState)`メソッド ← `actionState`=`acting`

なお、正確には、このメソッドは一歩前進ではなく、基準立ち位置からX座標方向で-48pixelの位置に立つ、というもの。
そのため、何らかの方法で更に前進(画面左側に移動)していた場合にこのメソッドが呼ばれると、後退してしまうので注意。

##### 退却
アクターが行動可能(`chanMove()`)で、逃走フラグが立つ(`BattleManager.isEscaped()`)と、基準立位置から画面右側に300pixel分、30フレーム使って移動する。
```
Sprite_Actor.prototype.retreat = function() {
    this.startMove(300, 0, 30);
};
```
通常ツクールMVでは画面幅は816pixelで、パーティーの先頭キャラの基準立ち位置は600pixelの位置になる。
ここから右側に300pixel移動した場合、900pixelになるため、アクタースプライトは画面外に移動することになる。

これが、「逃げる」時に画面外に移動する仕組み。

##### 一歩後退(基準位置に戻る)
一歩前進でも退却でもなく基準立ち位置に居ない場合は、基準立ち位置に戻るように移動する。
```
Sprite_Actor.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};
```

### アクタースプライトのモーション

#### refreshMotion()

### アクタースプライトへのアニメーション

### アクタースプライトへのダメージポップアップ

### アクタースプライトのステート重ね合わせ

# 戦闘シーンのウィンドウの表示
