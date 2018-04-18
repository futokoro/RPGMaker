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

## 戦闘シーンの初期化
戦闘シーンに切り替わると以下の順で、シーンの初期化を行う。

`Scene_Battle.prototype.create()`<br>
戦闘背景や、各種ウィンドウ、アクターやエネミー等のキャラクターを生成する。

`Scene_Battle.prototype.start()`
```
Scene_Battle.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.fadeSpeed(), false);  //フェードイン実行
    BattleManager.playBattleBgm();              //戦闘BGMの再生
    BattleManager.startBattle();
};
```

`BattleManager.startBattle()`を実行する。
```
BattleManager.startBattle = function() {
    this._phase = 'start';        //戦闘フェーズをstartにセット
    $gameSystem.onBattleStart();  //戦闘回数を１増加
    $gameParty.onBattleStart();   //行動ステート、SVキャラのモーションとTPの初期化
    $gameTroop.onBattleStart();   //行動ステート、TPの初期化
    this.displayStartMessages();  //戦闘開始時のメッセージを表示
};
```
※行動ステート(ActionState)：<br>
そのキャラが現在どういう状態かを設定するパラメータ。(造語)<br>
undecided(未定),inputting(コマンド入力中),waitting(待機中),acting(行動中)のいずれかの文字列を格納する。<br>
戦闘開始時では`undecided`状態になる。

初期化の処理がすべて完了したら、以下のupdate処理が動作。<br>
`Scene_Battle.prototype.update()`

この中で、`Scene_Battle.prototype.updateBattleProcess()`を実行。
```
Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
        BattleManager.update();
        this.changeInputWindow();
    }
};
```
`BattleManager.update()`と`Scene_Battle.prototype.changeInputWindow()`を実行して、戦闘シーンの処理を行う。

`BattleManager.update()`は以下の内容になっており、戦闘フェーズ(`BattleManager._phase`の内容)に従って、戦闘のプロセスが進行する。
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
        }//inputフェーズの場合は、何も実行しない
    }
};
```

また、`Scene_Battle.prototype.changeInputWindow()`は以下の内容になっており、戦闘フェーズが`input`の時に、アクターのコマンド選択を行う処理を実行する。
```
Scene_Battle.prototype.changeInputWindow = function() {
    if (BattleManager.isInputting()) {//BattleManager._phase === 'input'のこと
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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## 戦闘の開始
戦闘フェーズがstartの時、`BattleManager.update()`で以下を実行する。

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

補足

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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## コマンド選択

戦闘フェーズがinputの時、`Scene_Battle.prototype.changeInputWindow()`で、コマンドを呼び出す処理を実行する。

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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## ターン処理
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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## ターン終了
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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

## 戦闘終了
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

[上に戻る](#RPGツクールMVの戦闘システムの解析)

[トップページに戻る](README.md)
