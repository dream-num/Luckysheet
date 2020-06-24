import { columeHeader_word, columeHeader_word_index } from '../controllers/constant';

/**
 * Common tool methods
 */

/**
 * Determine whether a string is in standard JSON format
 * @param {String} str 
 */
export function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } 
    catch (e) { }
    return false;
}


/**
 * extend two objects
 * @param {Object } jsonbject1
 * @param {Object } jsonbject2 
 */
export function common_extend(jsonbject1, jsonbject2) {
    var resultJsonObject = {};

    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }

    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }

    return resultJsonObject;
};

// 替换temp中的${xxx}为指定内容 ,temp:字符串，这里指html代码，dataarry：一个对象{"xxx":"替换的内容"}
// 例：luckysheet.replaceHtml("${image}",{"image":"abc","jskdjslf":"abc"})   ==>  abc
export function replaceHtml(temp, dataarry) {
    return temp.replace(/\$\{([\w]+)\}/g, function (s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { return s; } else { return s1; } });
};

//获取数据类型
export function getObjType(obj) {
    var toString = Object.prototype.toString;

    var map = {
        '[object Boolean]':  'boolean',
        '[object Number]':   'number',
        '[object String]':   'string',
        '[object Function]': 'function',
        '[object Array]':    'array',
        '[object Date]':     'date',
        '[object RegExp]':   'regExp',
        '[object Undefined]':'undefined',
        '[object Null]':     'null',
        '[object Object]':   'object'
    }

    // if(obj instanceof Element){
    //     return 'element';
    // }

    return map[toString.call(obj)];
}

//列下标  字母转数字
export function ABCatNum(abc) {
    abc = abc.toUpperCase();

    let abc_len = abc.length;
    if (abc_len == 0) {
        return NaN;
    }

    let abc_array = abc.split("");
    let wordlen = columeHeader_word.length;
    let ret = 0;
    
    for (var i = abc_len - 1; i >= 0; i--) {
        if (i == abc_len - 1) {
            ret += columeHeader_word_index[abc_array[i]];
        }
        else {
            ret += Math.pow(wordlen, abc_len - i - 1) * (columeHeader_word_index[abc_array[i]] + 1);
        }
    }

    return ret;
};

//列下标  数字转字母
export function chatatABC(index) {
    let wordlen = columeHeader_word.length;
    
    if (index < wordlen) {
        return columeHeader_word[index];
    }
    else {
        let last = 0, pre = 0, ret = "";
        let i = 1, n = 0;
        
        while (index >= (wordlen / (wordlen - 1)) * (Math.pow(wordlen, i++) - 1)) {
            n = i;
        }

        let index_ab = index - (wordlen / (wordlen - 1)) * (Math.pow(wordlen, n - 1) - 1);//970
        last = index_ab + 1;

        for (let x = n; x > 0; x--) {
            let last1 = last, x1 = x;//-702=268, 3
            
            if (x == 1) {
                last1 = last1 % wordlen;
                
                if (last1 == 0) {
                    last1 = 26;
                }

                return ret + columeHeader_word[last1 - 1];
            }

            last1 = Math.ceil(last1 / Math.pow(wordlen, x - 1));
            //last1 = last1 % wordlen;
            ret += columeHeader_word[last1 - 1];
            
            if (x > 1) {
                last = last - (last1 - 1) * wordlen;
            }
        }
    }
};

//计算字符串字节长度
export function getByteLen(val) {
    if(val == null){
        return 0;
    }

    let len = 0;
    for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i);
        
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    
    return len;
};

//数组去重
export function ArrayUnique(dataArr) {
    let arr = [];

    if(dataArr.length > 0){
        for(let i = 0; i < dataArr.length; i++){
            if(arr.indexOf(dataArr[i]) == -1){
                arr.push(dataArr[i]);
            }
        }
    }

    return arr;
}