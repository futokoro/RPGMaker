//=============================================================================
// パーティー内のパラメータに関するスクリプトを実装するプラグイン
// FTKR_SearchPartyParam.js
// 作成者     : フトコロ
// 作成日     : 2017/04/09
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SPP = true;

var FTKR = FTKR || {};
FTKR.SPP = FTKR.SPP || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 パーティー内のパラメータに関するスクリプトを実装するプラグイン
 * @author フトコロ
 *
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、パーティー内のパラメータや状態に関する
 * スクリプトを実装します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプトコマンド
 *-----------------------------------------------------------------------------
 * 以下のスクリプトコマンドを使用できます。
 * なお、(エネミー可)がついているスクリプトは、$gamePartyを$gameTroopに
 * 変えることで敵グループに対して使用できます。
 * 
 * ＜パラメータ値に関するスクリプト＞(エネミー可)
 * 
 * 1. 指定したパラメータのパーティー内の平均値を取得する
 * $gameParty.averageParam('param')
 *    :param には パラメータ名(英字) を入力してください。
 *    :例)
 *    : $gameParty.averageParam('hp')
 *    : パーティー内の現在HPの平均値を取得する。
 * 
 * 
 * 2. 指定したパラメータのパーティー内の最大値を取得する
 * $gameParty.maxParam('param')
 *    :param には パラメータ名(英字) を入力してください。
 *    :例)
 *    : $gameParty.maxParam('atk')
 *    : パーティー内の攻撃力の最大値を取得する。
 * 
 * 
 * 3. 指定したパラメータのパーティー内の最小値を取得する
 * $gameParty.minParam('param')
 *    :param には パラメータ名(英字) を入力してください。
 *    :例)
 *    : $gameParty.minParam('hit')
 *    : パーティー内の命中率の最小値を取得する。
 * 
 * 
 * 4. パーティー内で指定したパラメータの最大値を持つアクターIDを取得する
 * $gameParty.isHighestParam('param')
 *    :param には パラメータ名(英字) を入力してください。
 *    :該当者が複数いる場合は、並び順で前にいるアクターのIDを取得します。
 *    :例)
 *    : $gameParty.isHighestParam('atk')
 *    : パーティー内で最大の攻撃力を持つアクターのIDを取得する。
 * 
 * 
 * 5. パーティー内で指定したパラメータの最小値を持つアクターIDを取得する
 * $gameParty.isLowestParam('param')
 *    :param には パラメータ名(英字) を入力してください。
 *    :該当者が複数いる場合は、並び順で前にいるアクターのIDを取得します。
 *    :例)
 *    : $gameParty.isLowestParam('atk')
 *    : パーティー内で最小の攻撃力を持つアクターのIDを取得する。
 * 
 * 
 * 6. パーティー内で指定したパラメータが一定値を超えるアクターの
 *    IDリスト(配列)を取得する
 * $gameParty.isHigherParam('param', x)
 *    :param には パラメータ名(英字) を入力してください。
 *    :x には判定値を入力してください。
 *    :なお、x と等しいパラメータを持つアクターは数えません。
 *    :該当者がいない場合は、空の配列を取得します。
 *    :例)
 *    : $gameParty.isHigherParam('atk', 100)
 *    : パーティー内で攻撃力が 100 を超えるアクターのIDリストを取得する。
 *    :応用)
 *    : $gameParty.isHigherParam('atk', 100).length
 *    : パーティー内で攻撃力が 100 を超えるアクターの人数を取得する。
 * 
 * 
 * 6. パーティー内で指定したパラメータが一定値を下回るアクターの
 *    IDリスト(配列)を取得する
 * $gameParty.isLowerParam('param', x)
 *    :param には パラメータ名(英字) を入力してください。
 *    :x には判定値を入力してください。
 *    :なお、x と等しいパラメータを持つアクターは数えません。
 *    :該当者がいない場合は、空の配列を取得します。
 *    :例)
 *    : $gameParty.isLowerParam('atk', 100)
 *    : パーティー内で攻撃力が 100 未満のアクターのIDリストを取得する。
 *    :応用)
 *    : $gameParty.isLowerParam('atk', 100).length
 *    : パーティー内で攻撃力が 100 未満のアクターの人数を取得する。
 * 
 * 
 * ＜装備等の状態に関するスクリプト＞
 * 
 * 1. パーティー内で指定した装備をしているアクターのIDを取得する
 * $gameParty.isEquipped(equip)
 *    :equip には 武器なら $dataWeapons[n]、防具なら $dataArmors[n]を
 *    :入力してください。n は武器防具のID。
 *    :該当者がいない場合は、false を返します。
 *    :該当者が複数いる場合は、並び順で前にいるアクターのIDを取得します。
 *    :例)
 *    : $gameParty.isEquipped($dataWeapons[10])
 *    : パーティー内で武器ID10 の装備を持つアクターのIDを取得する。
 * 
 * 
 * 2. パーティー内で指定したスキルを習得しているアクターのIDを取得する
 * $gameParty.isLearnedSkill(x)
 *    :x には スキルIDを入力してください。
 *    :該当者がいない場合は、false を返します。
 *    :該当者が複数いる場合は、並び順で前にいるアクターのIDを取得します。
 *    :例)
 *    : $gameParty.isLearnedSkill(5)
 *    : パーティー内でスキルID5 のスキルを習得しているアクターのIDを取得する。
 * 
 * 
 * 3. パーティー内で指定したステートを付与されているアクターのIDを取得する
 * $gameParty.isStateAffected(x)      (エネミー可)
 *    :x には ステートIDを入力してください。
 *    :該当者がいない場合は、false を返します。
 *    :該当者が複数いる場合は、並び順で前にいるアクターのIDを取得します。
 *    :例)
 *    : $gameParty.isStateAffected(5)
 *    : パーティー内でステートID5 のステートを付与されているアクターの
 *    : IDを取得する。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/04/09 : 初版公開
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SPP.parameters = PluginManager.parameters('FTKR_SearchPartyParam');

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.memberId = function() {
    return this.actorId();
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.memberId = function() {
    return this.enemyId();
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.memberId = function(member) {
    return member !== undefined ? member.memberId() : false;
};

Game_Unit.prototype.averageParam = function(parameter) {
    var members = this.members();
    if (members.length === 0) {
        return 1;
    }
    var sum = members.reduce(function(r, member) {
        return r + member[parameter];
    }, 0);
    return sum / members.length;
};

Game_Unit.prototype.maxParam = function(parameter) {
    return Math.max.apply(null, this.members().map(function(member) {
        return member[parameter];
    }));
};

Game_Unit.prototype.isHighestParam = function(parameter) {
    var param = Math.max.apply(null, this.members().map(function(member) {
        return member[parameter];
    }));
    return this.members().find(function(member) {
        return member[parameter] === param;
    }).memberId();
};

Game_Unit.prototype.isHigherParam = function(parameter, param) {
    var members = this.members().filter(function(member) {
        return member[parameter] > param;
    });
    return members.map(function(member) {
        return member ? member.actorId() : null;
    });
};

Game_Unit.prototype.minParam = function(parameter) {
    return Math.min.apply(null, this.members().map(function(member) {
        return member[parameter];
    }));
};

Game_Unit.prototype.isLowestParam = function(parameter) {
    var param = Math.min.apply(null, this.members().map(function(member) {
        return member[parameter];
    }));
    return this.members().find(function(member) {
        return member[parameter] === param;
    }).memberId();
};

Game_Unit.prototype.isLowerParam = function(parameter, param) {
    var members = this.members().filter(function(member) {
        return member[parameter] < param;
    });
    return members.map(function(member) {
        return member ? member.actorId() : null;
    });
};

Game_Unit.prototype.isStateAffected = function(stateId) {
    return this.memberId(this.members().find(function(member) {
        return member.isStateAffected(stateId);
    }));
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.isEquipped = function(item) {
    return this.memberId(this.members().find(function(actor) {
        return actor.equips().contains(item);
    }));
};

Game_Party.prototype.isLearnedSkill = function(skillId) {
    return this.memberId(this.members().find(function(actor) {
        return actor.isLearnedSkill(skillId);
    }));
};

