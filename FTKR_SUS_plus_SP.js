//=============================================================================
// ツリー型スキル習得システム(Tree-type Skill Learning System)
// FTKR_SUS_plus_SP.js
// プラグインNo : 95
// 作成者　　   : フトコロ(futokoro)
// 作成日　　   : 2019/12/17
// 最終更新日   : 
// バージョン   : v1.0.0
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0.0 スキル強化システムにスキルツリープラグインのSPを導入する
 * @author フトコロ
 * 
 * @help
 * 
 * スキル強化システムにスキルツリープラグインのSPを導入します。
 * 
 * SP のスキル強化コストタイプIDは 7 です。
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2019 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 */
//=============================================================================
(function() {

    Game_Actor.prototype.getSusSkillNotetagsCost = function(skill, typeId) {
        var results = [];
        var type = false;
        var readCost = false;
        var costdata = skill.susUpgradeCost;
        if (costdata) {
            var case1 = /(?:Type)[ ](\d+)[ ](?:gold):[ ]*(.+)/i;
            var case2 = /(?:Type)[ ](\d+)[ ](?:item\[)(\d+)\]:[ ]*(.+)/i;
            var case2a = /(?:Type)[ ](\d+)[ ](?:weapon\[)(\d+)\]:[ ]*(.+)/i;
            var case2b = /(?:Type)[ ](\d+)[ ](?:armor\[)(\d+)\]:[ ]*(.+)/i;
            var case3 = /(?:Type)[ ](\d+)[ ](?:v\[)(\d+)\]:[ ]*(.+)/i;
            var case4 = /(?:Type)[ ](\d+)[ ](?:JP):[ ]*(.+)/i;
            var case5 = /(?:Type)[ ](\d+)[ ](?:SP):[ ]*(.+)/i;

            var costs = costdata.split(';');
            for (var i = 0; i < costs.length; i++) {
                var cost = costs[i];
                if(cost.match(case1)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('gold', 0, String(RegExp.$2), 0));
                    }
                } else if(cost.match(case2)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('item', Number(RegExp.$2), String(RegExp.$3), 0));
                    }
                } else if(cost.match(case2a)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('weapon', Number(RegExp.$2), String(RegExp.$3), 0));
                    }
                } else if(cost.match(case2b)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('armor', Number(RegExp.$2), String(RegExp.$3), 0));
                    }
                } else if(cost.match(case3)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('var', Number(RegExp.$2), String(RegExp.$3), 0));
                    }
                } else if(cost.match(case4)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('jp', 0, String(RegExp.$2), 0));
                    }
                } else if(cost.match(case5)) {
                    type = Number(RegExp.$1);
                    if (type === typeId) {
                    readCost = true;
                    results.push(this.setUcost('sp', 0, String(RegExp.$2), 0));
                    }
                }
            }
            return readCost ? results : false;
        }
    };

    var _pSP_Game_Actor_convertCtype = Game_Actor.prototype.convertCtype;
    Game_Actor.prototype.convertCtype = function(ctype) {
        console.log(ctype);
        switch (ctype) {
          case 7:
            return 'sp';
          default:
            return _pSP_Game_Actor_convertCtype.call(this, ctype);
        };
    };
    
    var _pSP_Game_Actor_paySepCost = Game_Actor.prototype.paySepCost;
    Game_Actor.prototype.paySepCost = function(cost) {
        switch (cost.type) {
            case 'sp': return this.getSp(-this.evalCostValue(cost));
        }
        return _pSP_Game_Actor_paySepCost.call(this, cost);
    };

    var _pSP_Window_Base_setSepCost = Window_Base.prototype.setSepCost;
    Window_Base.prototype.setSepCost = function(cost) {
        switch(cost.type) {
          case 'sp':
            return this.setCost(FTKR.STS.sp.icon, FTKR.STS.sp.dispName, this._actor.stsSp());
          default:
            return _pSP_Window_Base_setSepCost.call(this, cost);
        }
    };
      

})();
