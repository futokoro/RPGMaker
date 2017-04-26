//=============================================================================
// FTKRプラグイン用ライブラリ
// FTKR_BasicLibrary.js
// 作成者     : フトコロ
// 作成日     : 2017/04/26
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_BLB = true;

var FTKR = FTKR || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 FTKRプラグイン用ライブラリ
 * @author フトコロ
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * FTKRプラグイン用ライブラリ
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
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/02/21 : 初版作成
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

FTKR.parameters = PluginManager.parameters('FTKR_BasicLibrary');

//=============================================================================
// メモタグの取得
//=============================================================================

//------------------------------------------------------------------------
// 挟み込み形式
// <Header_codeTitle>
// text
// </Header_codeTitle>
//------------------------------------------------------------------------

// 挟み込み形式のメタデータを読み取ってtextを返す
var readEntrapmentCodeToText = function(obj, header, codeTitles) {
    regs = convertEntrapmentRegArray(header, codeTitles);
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';
    var text = '';

    notedata.forEach( function(line) {
        if (testRegs(line, regs, 'a')) {
            setMode = 'read';
        } else if (testRegs(line, regs, 'b')) {
            setMode = 'none';
        } else if (setMode === 'read') {
            text += line + ';';
        }
    });
    return text;
};

//文字列の配列を挟み込み形式用の正規表現オブジェクトの配列に変換する
var convertEntrapmentRegArray = function(header, codeTitles) {
    return codeTitles.map(function(str) {
        return {
            a:new RegExp('<' + header + '_' + str + '>', 'i'),
            b:new RegExp('<\/' + header + '_' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列regsとdataをテストする
var testRegs = function(data, regs, prop) {
    return regs.some(function(reg) {
        return prop ? reg[prop].test(data) : reg.test(data);
    });
};

// textを条件式に使える状態に変換する
var convertTextToConditions = function(text) {
    var result = '';
    if (text) {
        var datas = text.split(';');
        datas.forEach(function(data, i) {
            result += data;
            if (datas[i+1]) result += ')&&(';
        });
        result = '(' + result + ')';
    }
    return result;
};

//------------------------------------------------------------------------
// 拡張型挟み込み形式
// <Header_codeTitle: x>
// text1
// text2
// </Header_codeTitle>
//
// 戻数のobjのプロパティ
//   id   - x (タイトルメタデータ)
//   text - text1;text2
//------------------------------------------------------------------------

// 拡張型挟み込み形式のメタデータを読み取とってobjを返す
var readEntrapmentCodeToTextEx = function(obj, header, codeTitles) {
    notes = codeTitles.convertEntrapmentRegArray(header);
    var notedata = obj.note.split(/[\r\n]+/);
    var setMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (notes.matchRegs(line, 'a')) {
            var titleMeta = RegExp.$1;
            var text = '';
            setMode = 'read';
        } else if (notes.matchRegs(line, 'b')) {
            setMode = 'none';
        } else if (setMode === 'read') {
            text += line + ';';
        }
    }
    return {id:titleMeta, text:text};
};

//文字列の配列を拡張型挟み込み形式用の正規表現オブジェクトの配列に変換する
Array.prototype.convertEntrapmentRegArrayEx = function(header) {
    return this.map(function(str) {
        return {
            a:new RegExp('<' + header + '_' + str + ':[ ]*(.+)>', 'i'),
            b:new RegExp('<\/' + header + '_' + str + '>', 'i')
        };
    });
};

//正規表現オブジェクトの配列とdataをマッチさせる
Array.prototype.matchRegs = function(data, prop) {
    return this.some(function(reg){
        if (prop ? data.match(reg[prop]) : data.match(reg));
    });
};

//------------------------------------------------------------------------
// 単独形式
// <metacode: x, x, ...>
//------------------------------------------------------------------------

//objのメモ欄から <metacode: x, x,...> の値を読み取って配列で返す
var readSplitMeta = function(obj, metacodes) {
    var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
    if(obj.note.match(metaReg)) {
        var result = (RegExp.$1).replace(/\s/g, "");
        return result.split(',').numOrStr();
    }
    return [];
};

//objのメモ欄から <metacode[0]: x> から <metacode[n]: x>のいずれかの値を読み取って配列で返す
Array.prototype.readSplitMeta = function(obj) {
    var result = [];
    this.some(function(metacode) {
        result = readSplitMeta(obj, metacode);
        return result.length;
    });
    return result;
};

//配列内のobjのメモ欄から <metacode: x> の値を読み取って配列で返す
var getItemsMetaSplitTotal = function(items, metacodes) {
    var result = [];
    items.forEach( function(item) {
        Array.prototype.push.apply(result, metacodes.readSplitMeta(item));
    });
    return result;
};

//target(アクターまたはエネミー)が持つ、metacode[0] ~ metacode[n]のいずれかで指定したタグの値を配列にして返す
// クラス、装備、ステートも含む
var getItemsMetaArray = function(target, metacodes) {
    var result = [];
    if(target.isActor()) {
        return result.concat(
            getItemMetaSplit(target.actor(), metacodes),
            getItemMetaSplit($dataClasses[target.actor().classId], metacodes),
            getItemsMetaSplitTotal(target.equips(), metacodes),
            getItemsMetaSplitTotal(target.states(), metacodes)
        );
    } else if(target.isEnemy()) {
        return result.concat(
            getItemMetaSplit(target.enemy(), metacodes),
            getItemsMetaSplitTotal(target.states(), metacodes)
        );
    }
    return result;
};

//=============================================================================
// 数値の操作
//=============================================================================

Number.prototype._getDec = function() {
    var list = (this + '').split('.');
    return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された数値をパーセント表示の数値に変換する (例:0.5 を 50 に変換)
Number.prototype.percent = function(dec) {
    dec = dec || 0;
    var decnum = this._getDec();
    var int = +(this + '').replace('.', '');
    var diffdec = 2 + dec - decnum;
    return Math.floor(int * Math.pow(10, diffdec)) / Math.pow(10, dec);
}

//=============================================================================
// 文字列 - 数値の変換
//=============================================================================

//配列の要素を、すべて数値に変換する。
Array.prototype.num = function() {
  return this.map(function(elm) {
      return Number(elm);
  });
}

//配列の中身が数字なら数値に変換する
Array.prototype.numOrStr = function() {
    return this.map( function(elm, i) {
        return isNaN(parseInt(elm)) ? elm : parseInt(elm);
    });
};

//=============================================================================
// 配列の操作
//=============================================================================

// 配列の要素の合計
Math.sam = function(arr) {
    return arr.reduce( function(prev, current, i, arr) {
        return prev + current;
    });
};

// 配列の各要素のプロパティを検索して該当する要素の配列を返す
Array.prototype.searchProperty = function(props) {
    return this.filter( function(item) {
        return item && props.every( function(prop) {
            return item.hasOwnProperty(prop[0]) && item[prop[0]] === prop[1];
        });
    });
};

//重複した要素を除いて、Array配列にlist配列の要素を加える。
Array.prototype.addExceptForDup = function(list) {
    list.forEach( function(item) {
        if (!this.contains(item)) this.push(item);
    },this);
};

//find を追加
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

//findIndex を追加
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
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
        return i;
      }
    }
    return -1;
  };
}

//=============================================================================
// 配列・オブジェクトのコピー
//=============================================================================

//配列を複製する
var copyArray = function(arr) {
    var newArr = [];
    arr.forEach(function(data, prop) {
        newArr[prop] = copyData(data);
        if (data instanceof Object) {
            if (data instanceof Array) {
                newArr[prop] = copyArray(data);
            } else {
                newArr[prop] = copyObject(data);
            }
        } else {
            newArr[prop] = data;
        }
    });
    return newArr;
};

//オブジェクトを複製する
var copyObject = function(obj) {
    var newObj = {};
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
        newObj[prop] = copyData(obj[prop]);
    });
    return newObj;
};

//配列かオブジェクトかそれ以外かを判定して、引数を変換する
var copyData = function(data) {
    if (data instanceof Object) {
        if (data instanceof Array) {
            return copyArray(data);
        } else {
            return copyObject(data);
        }
    } else {
        return data;
    }
};
