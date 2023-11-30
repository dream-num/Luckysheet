import { columeHeader_word, columeHeader_word_index, luckysheetdefaultFont } from "../controllers/constant";
import menuButton from "../controllers/menuButton";
import { isdatatype, isdatatypemulti } from "../global/datecontroll";
import { hasChinaword, isRealNum } from "../global/validate";
import Store from "../store";
import locale from "../locale/locale";
import numeral from "numeral";
// import method from '../global/method';

/**
 * Common tool methods
 */

/**
 * Determine whether a string is in standard JSON format
 * @param {String} str
 */
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {}
    return false;
}

/**
 * extend two objects
 * @param {Object } jsonbject1
 * @param {Object } jsonbject2
 */
function common_extend(jsonbject1, jsonbject2) {
    let resultJsonObject = {};

    for (let attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }

    for (let attr in jsonbject2) {
        // undefined is equivalent to no setting
        if (jsonbject2[attr] == undefined) {
            continue;
        }
        resultJsonObject[attr] = jsonbject2[attr];
    }

    return resultJsonObject;
}

// 替换temp中的${xxx}为指定内容 ,temp:字符串，这里指html代码，dataarry：一个对象{"xxx":"替换的内容"}
// 例：luckysheet.replaceHtml("${image}",{"image":"abc","jskdjslf":"abc"})   ==>  abc
function replaceHtml(temp, dataarry) {
    return temp.replace(/\$\{([\w]+)\}/g, function(s1, s2) {
        let s = dataarry[s2];
        if (typeof s != "undefined") {
            return s;
        } else {
            return s1;
        }
    });
}

//获取数据类型
function getObjType(obj) {
    let toString = Object.prototype.toString;

    let map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
    };

    // if(obj instanceof Element){
    //     return 'element';
    // }

    return map[toString.call(obj)];
}

//获取当前日期时间
function getNowDateTime(format) {
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth(); //得到月份
    let date = now.getDate(); //得到日期
    let day = now.getDay(); //得到周几
    let hour = now.getHours(); //得到小时
    let minu = now.getMinutes(); //得到分钟
    let sec = now.getSeconds(); //得到秒

    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;

    let time = "";

    //日期
    if (format == 1) {
        time = year + "-" + month + "-" + date;
    }
    //日期时间
    else if (format == 2) {
        time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    }

    return time;
}

//颜色 16进制转rgb
function hexToRgb(hex) {
    let color = [],
        rgb = [];
    hex = hex.replace(/#/, "");

    if (hex.length == 3) {
        // 处理 "#abc" 成 "#aabbcc"
        let tmp = [];

        for (let i = 0; i < 3; i++) {
            tmp.push(hex.charAt(i) + hex.charAt(i));
        }

        hex = tmp.join("");
    }

    for (let i = 0; i < 3; i++) {
        color[i] = "0x" + hex.substr(i + 2, 2);
        rgb.push(parseInt(Number(color[i])));
    }

    return "rgb(" + rgb.join(",") + ")";
}

//颜色 rgb转16进制
function rgbTohex(color) {
    let rgb;

    if (color.indexOf("rgba") > -1) {
        rgb = color
            .replace("rgba(", "")
            .replace(")", "")
            .split(",");
    } else {
        rgb = color
            .replace("rgb(", "")
            .replace(")", "")
            .split(",");
    }

    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);

    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return hex;
}

//列下标  字母转数字
function ABCatNum(a) {
    // abc = abc.toUpperCase();

    // let abc_len = abc.length;
    // if (abc_len == 0) {
    //     return NaN;
    // }

    // let abc_array = abc.split("");
    // let wordlen = columeHeader_word.length;
    // let ret = 0;

    // for (let i = abc_len - 1; i >= 0; i--) {
    //     if (i == abc_len - 1) {
    //         ret += columeHeader_word_index[abc_array[i]];
    //     }
    //     else {
    //         ret += Math.pow(wordlen, abc_len - i - 1) * (columeHeader_word_index[abc_array[i]] + 1);
    //     }
    // }

    // return ret;
    if (a == null || a.length == 0) {
        return NaN;
    }
    var str = a.toLowerCase().split("");
    var num = 0;
    var al = str.length;
    var getCharNumber = function(charx) {
        return charx.charCodeAt() - 96;
    };
    var numout = 0;
    var charnum = 0;
    for (var i = 0; i < al; i++) {
        charnum = getCharNumber(str[i]);
        numout += charnum * Math.pow(26, al - i - 1);
    }
    // console.log(a, numout-1);
    if (numout == 0) {
        return NaN;
    }
    return numout - 1;
}

//列下标  数字转字母
function chatatABC(n) {
    // let wordlen = columeHeader_word.length;

    // if (index < wordlen) {
    //     return columeHeader_word[index];
    // }
    // else {
    //     let last = 0, pre = 0, ret = "";
    //     let i = 1, n = 0;

    //     while (index >= (wordlen / (wordlen - 1)) * (Math.pow(wordlen, i++) - 1)) {
    //         n = i;
    //     }

    //     let index_ab = index - (wordlen / (wordlen - 1)) * (Math.pow(wordlen, n - 1) - 1);//970
    //     last = index_ab + 1;

    //     for (let x = n; x > 0; x--) {
    //         let last1 = last, x1 = x;//-702=268, 3

    //         if (x == 1) {
    //             last1 = last1 % wordlen;

    //             if (last1 == 0) {
    //                 last1 = 26;
    //             }

    //             return ret + columeHeader_word[last1 - 1];
    //         }

    //         last1 = Math.ceil(last1 / Math.pow(wordlen, x - 1));
    //         //last1 = last1 % wordlen;
    //         ret += columeHeader_word[last1 - 1];

    //         if (x > 1) {
    //             last = last - (last1 - 1) * wordlen;
    //         }
    //     }
    // }

    var orda = "a".charCodeAt(0);

    var ordz = "z".charCodeAt(0);

    var len = ordz - orda + 1;

    var s = "";

    while (n >= 0) {
        s = String.fromCharCode((n % len) + orda) + s;

        n = Math.floor(n / len) - 1;
    }

    return s.toUpperCase();
}

function ceateABC(index) {
    let wordlen = columeHeader_word.length;

    if (index < wordlen) {
        return columeHeader_word;
    } else {
        let relist = [];
        let i = 2,
            n = 0;

        while (index < (wordlen / (wordlen - 1)) * (Math.pow(wordlen, i) - 1)) {
            n = i;
            i++;
        }

        for (let x = 0; x < n; x++) {
            if (x == 0) {
                relist = relist.concat(columeHeader_word);
            } else {
                relist = relist.concat(createABCdim(x), index);
            }
        }
    }
}

function createABCdim(x, count) {
    let chwl = columeHeader_word.length;

    if (x == 1) {
        let ret = [];
        let c = 0,
            con = true;

        for (let i = 0; i < chwl; i++) {
            let b = columeHeader_word[i];

            for (let n = 0; n < chwl; n++) {
                let bq = b + columeHeader_word[n];
                ret.push(bq);
                c++;

                if (c > index) {
                    return ret;
                }
            }
        }
    } else if (x == 2) {
        let ret = [];
        let c = 0,
            con = true;

        for (let i = 0; i < chwl; i++) {
            let bb = columeHeader_word[i];

            for (let w = 0; w < chwl; w++) {
                let aa = columeHeader_word[w];

                for (let n = 0; n < chwl; n++) {
                    let bqa = bb + aa + columeHeader_word[n];
                    ret.push(bqa);
                    c++;

                    if (c > index) {
                        return ret;
                    }
                }
            }
        }
    }
}

/**
 * 计算字符串字节长度
 * @param {*} val 字符串
 * @param {*} subLen 要截取的字符串长度
 */
function getByteLen(val, subLen) {
    if (subLen === 0) {
        return "";
    }

    if (val == null) {
        return 0;
    }

    let len = 0;
    for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i);

        if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2;
        } else {
            len += 1;
        }

        if (isRealNum(subLen) && len === ~~subLen) {
            return val.substring(0, i);
        }
    }

    return len;
}

//数组去重
function ArrayUnique(dataArr) {
    let result = [];
    let obj = {};
    if (dataArr.length > 0) {
        for (let i = 0; i < dataArr.length; i++) {
            let item = dataArr[i];
            if (!obj[item]) {
                result.push(item);
                obj[item] = 1;
            }
        }
    }
    return result;
}

//获取字体配置
function luckysheetfontformat(format) {
    let fontarray = locale().fontarray;
    if (getObjType(format) == "object") {
        let font = "";

        //font-style
        if (format.it == "0" || format.it == null) {
            font += "normal ";
        } else {
            font += "italic ";
        }

        //font-variant
        font += "normal ";

        //font-weight
        if (format.bl == "0" || format.bl == null) {
            font += "normal ";
        } else {
            font += "bold ";
        }

        //font-size/line-height
        if (!format.fs) {
            font += Store.defaultFontSize + "pt ";
        } else {
            font += Math.ceil(format.fs) + "pt ";
        }

        if (!format.ff) {
            font +=
                fontarray[0] +
                ', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif';
        } else {
            let fontfamily = null;
            let fontjson = locale().fontjson;
            if (isdatatypemulti(format.ff)["num"]) {
                fontfamily = fontarray[parseInt(format.ff)];
            } else {
                // fontfamily = fontarray[fontjson[format.ff]];
                fontfamily = format.ff;

                fontfamily = fontfamily.replace(/"/g, "").replace(/'/g, "");

                if (fontfamily.indexOf(" ") > -1) {
                    fontfamily = '"' + fontfamily + '"';
                }

                if (fontfamily != null && document.fonts && !document.fonts.check("12px " + fontfamily)) {
                    menuButton.addFontTolist(fontfamily);
                }
            }

            if (fontfamily == null) {
                fontfamily = fontarray[0];
            }

            font +=
                fontfamily +
                ', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif';
        }

        return font;
    } else {
        return luckysheetdefaultFont();
    }
}

//右键菜单
function showrightclickmenu($menu, x, y) {
    let winH = $(window).height(),
        winW = $(window).width();
    let menuW = $menu.width(),
        menuH = $menu.height();
    let top = y,
        left = x;

    if (x + menuW > winW) {
        left = x - menuW;
    }

    if (y + menuH > winH) {
        top = y - menuH;
    }

    if (top < 0) {
        top = 0;
    }

    $menu.css({ top: top, left: left }).show();
}

//单元格编辑聚焦
function luckysheetactiveCell() {
    if (!!Store.fullscreenmode) {
        setTimeout(function() {
            // need preventScroll:true,fix Luckysheet has been set top, and clicking the cell will trigger the scrolling problem
            const input = document.getElementById("luckysheet-rich-text-editor");
            input.focus({ preventScroll: true });
            $("#luckysheet-rich-text-editor").select();
            // $("#luckysheet-rich-text-editor").focus().select();
        }, 50);
    }
}

//单元格编辑聚焦
function luckysheetContainerFocus() {
    // $("#" + Store.container).focus({
    //     preventScroll: true
    // });

    // fix jquery error: Uncaught TypeError: ((n.event.special[g.origType] || {}).handle || g.handler).apply is not a function
    // $("#" + Store.container).attr("tabindex", 0).focus();

    // need preventScroll:true,fix Luckysheet has been set top, and clicking the cell will trigger the scrolling problem fix #794 #152
    document.getElementById(Store.container).focus({ preventScroll: true });
}

//数字格式
function numFormat(num, type) {
    if (num == null || isNaN(parseFloat(num)) || hasChinaword(num) || num == -Infinity || num == Infinity) {
        return null;
    }

    let floatlen = 6,
        ismustfloat = false;
    if (type == null || type == "auto") {
        if (num < 1) {
            floatlen = 6;
        } else {
            floatlen = 1;
        }
    } else {
        if (isdatatype(type) == "num") {
            floatlen = parseInt(type);
            ismustfloat = true;
        } else {
            floatlen = 6;
        }
    }

    let format = "",
        value = null;
    for (let i = 0; i < floatlen; i++) {
        format += "0";
    }

    if (!ismustfloat) {
        format = "[" + format + "]";
    }

    if (num >= 1e21) {
        value = parseFloat(numeral(num).value());
    } else {
        value = parseFloat(numeral(num).format("0." + format));
    }

    return value;
}

function numfloatlen(n) {
    if (n != null && !isNaN(parseFloat(n)) && !hasChinaword(n)) {
        let value = numeral(n).value();
        let lens = value.toString().split(".");

        if (lens.length == 1) {
            lens = 0;
        } else {
            lens = lens[1].length;
        }

        return lens;
    } else {
        return null;
    }
}

//二级菜单显示位置
function mouseclickposition($menu, x, y, p) {
    let winH = $(window).height(),
        winW = $(window).width();
    let menuW = $menu.width(),
        menuH = $menu.height();
    let top = y,
        left = x;

    if (p == null) {
        p = "lefttop";
    }

    if (p == "lefttop") {
        $menu.css({ top: y, left: x }).show();
    } else if (p == "righttop") {
        $menu.css({ top: y, left: x - menuW }).show();
    } else if (p == "leftbottom") {
        $menu.css({ bottom: winH - y - 12, left: x }).show();
    } else if (p == "rightbottom") {
        $menu.css({ bottom: winH - y - 12, left: x - menuW }).show();
    }
}

/**
 * 元素选择器
 * @param {String}  selector css选择器
 * @param {String}  context  指定父级DOM
 */
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return elements.length == 1 ? Array.prototype.slice.call(elements)[0] : Array.prototype.slice.call(elements);
}

/**
 * 串行加载指定的脚本
 * 串行加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Object} options 属性设置
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */

function seriesLoadScripts(scripts, options, callback) {
    if (typeof scripts !== "object") {
        var scripts = [scripts];
    }
    var HEAD = document.getElementsByTagName("head")[0] || document.documentElement;
    var s = [];
    var last = scripts.length - 1;
    //递归
    var recursiveLoad = function(i) {
        s[i] = document.createElement("script");
        s[i].setAttribute("type", "text/javascript");
        // Attach handlers for all browsers
        // 异步
        s[i].onload = s[i].onreadystatechange = function() {
            if (!(/*@cc_on!@*/ 0) || this.readyState === "loaded" || this.readyState === "complete") {
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
                if (i !== last) {
                    recursiveLoad(i + 1);
                } else if (typeof callback === "function") {
                    callback();
                }
            }
        };
        // 同步
        s[i].setAttribute("src", scripts[i]);

        // 设置属性
        if (typeof options === "object") {
            for (var attr in options) {
                s[i].setAttribute(attr, options[attr]);
            }
        }

        HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
}

/**
 * 并行加载指定的脚本
 * 并行加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Object} options 属性设置
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */

function parallelLoadScripts(scripts, options, callback) {
    if (typeof scripts !== "object") {
        var scripts = [scripts];
    }
    var HEAD = document.getElementsByTagName("head")[0] || document.documentElement;
    var s = [];
    var loaded = 0;
    for (var i = 0; i < scripts.length; i++) {
        s[i] = document.createElement("script");
        s[i].setAttribute("type", "text/javascript");
        // Attach handlers for all browsers
        // 异步
        s[i].onload = s[i].onreadystatechange = function() {
            if (!(/*@cc_on!@*/ 0) || this.readyState === "loaded" || this.readyState === "complete") {
                loaded++;
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
                if (loaded === scripts.length && typeof callback === "function") callback();
            }
        };
        // 同步
        s[i].setAttribute("src", scripts[i]);

        // 设置属性
        if (typeof options === "object") {
            for (var attr in options) {
                s[i].setAttribute(attr, options[attr]);
            }
        }

        HEAD.appendChild(s[i]);
    }
}

/**
 * 动态添加css
 * @param {String}  url 指定要加载的css地址
 */
function loadLink(url) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length) {
        heads[0].appendChild(link);
    } else {
        doc.documentElement.appendChild(link);
    }
}

/**
 * 动态添加一组css
 * @param {String}  url 指定要加载的css地址
 */
function loadLinks(urls) {
    if (typeof urls !== "object") {
        urls = [urls];
    }
    if (urls.length) {
        urls.forEach((url) => {
            loadLink(url);
        });
    }
}

function transformRangeToAbsolute(txt1) {
    if (txt1 == null || txt1.length == 0) {
        return null;
    }

    let txtArray = txt1.split(",");
    let ret = "";
    for (let i = 0; i < txtArray.length; i++) {
        let txt = txtArray[i];
        let txtSplit = txt.split("!"),
            sheetName = "",
            rangeTxt = "";
        if (txtSplit.length > 1) {
            sheetName = txtSplit[0];
            rangeTxt = txtSplit[1];
        } else {
            rangeTxt = txtSplit[0];
        }

        let rangeTxtArray = rangeTxt.split(":");

        let rangeRet = "";
        for (let a = 0; a < rangeTxtArray.length; a++) {
            let t = rangeTxtArray[a];

            let row = t.replace(/[^0-9]/g, "");
            let col = t.replace(/[^A-Za-z]/g, "");
            let rangeTT = "";
            if (col != "") {
                rangeTT += "$" + col;
            }

            if (row != "") {
                rangeTT += "$" + row;
            }

            rangeRet += rangeTT + ":";
        }

        rangeRet = rangeRet.substr(0, rangeRet.length - 1);

        ret += sheetName + rangeRet + ",";
    }

    return ret.substr(0, ret.length - 1);
}

function openSelfModel(id, isshowMask = true) {
    let $t = $("#" + id)
            .find(".luckysheet-modal-dialog-content")
            .css("min-width", 300)
            .end(),
        myh = $t.outerHeight(),
        myw = $t.outerWidth();
    let winw = $(window).width(),
        winh = $(window).height();
    let scrollLeft = $(document).scrollLeft(),
        scrollTop = $(document).scrollTop();
    $t.css({
        left: (winw + scrollLeft - myw) / 2,
        top: (winh + scrollTop - myh) / 3,
    }).show();

    if (isshowMask) {
        $("#luckysheet-modal-dialog-mask").show();
    }
}

/**
 * 监控对象变更
 * @param {*} data
 */
// const createProxy = (data,list=[]) => {
//     if (typeof data === 'object' && data.toString() === '[object Object]') {
//       for (let k in data) {
//         if(list.includes(k)){
//             if (typeof data[k] === 'object') {
//               defineObjectReactive(data, k, data[k])
//             } else {
//               defineBasicReactive(data, k, data[k])
//             }
//         }
//       }
//     }
// }

const createProxy = (data, k, callback) => {
    if (!data.hasOwnProperty(k)) {
        console.info("No %s in data", k);
        return;
    }

    if (getObjType(data) === "object") {
        if (getObjType(data[k]) === "object" || getObjType(data[k]) === "array") {
            defineObjectReactive(data, k, data[k], callback);
        } else {
            defineBasicReactive(data, k, data[k], callback);
        }
    }
};

function defineObjectReactive(obj, key, value, callback) {
    // 递归
    obj[key] = new Proxy(value, {
        set(target, property, val, receiver) {
            setTimeout(() => {
                callback(target, property, val, receiver);
            }, 0);

            return Reflect.set(target, property, val, receiver);
        },
    });
}

function defineBasicReactive(obj, key, value, callback) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            console.log(`发现 ${key} 属性 ${value} -> ${newValue}`);

            setTimeout(() => {
                callback(value, newValue);
            }, 0);

            value = newValue;
        },
    });
}

/**
 * Remove an item in the specified array
 * @param {array} array Target array
 * @param {string} item What needs to be removed
 */
function arrayRemoveItem(array, item) {
    array.some((curr, index, arr) => {
        if (curr === item) {
            arr.splice(index, 1);
            return curr === item;
        }
    });
}

/**
 * camel 形式的单词转换为 - 形式 如 fillColor -> fill-color
 * @param {string} camel camel 形式
 * @returns
 */
function camel2split(camel) {
    return camel.replace(/([A-Z])/g, function(all, group) {
        return "-" + group.toLowerCase();
    });
}

function borderInfoMergeCore (borderInfo) {
    if (!borderInfo || !borderInfo.length) {
        return []
    }
    const borderRange = {
        r: [Infinity, 0],
        c: [Infinity, 0],
    }
    const borderLineMap = new Map([['', {style: '', color: '', styleKey: ''}]])
    borderLineMap.clear();
    const createLinePos = (r, c, d) => {
        if (d === 't') {
            return `${r}_${c}_${r}_${c+1}`
        } else if (d === 'b') {
            return `${r+1}_${c}_${r+1}_${c+1}`
        } else if (d === 'l') {
            return `${r}_${c}_${r+1}_${c}`
        } else if (d === 'r') {
            return `${r}_${c+1}_${r+1}_${c+1}`
        } else {
            throw new Error('createLinePos 越界')
        }
    }
    // 对边框数据进行拆分，精确到每个单元格的边框情况
    for (let i = 0; i < borderInfo.length; i++) {
        const t = borderInfo[i]
        if (t.rangeType === 'cell') {
            borderRange.r[0] > (t.value.row_index - 1) && (borderRange.r[0] = t.value.row_index - 1);
            borderRange.r[1] < (t.value.row_index + 1) && (borderRange.r[1] = t.value.row_index + 1);
            borderRange.c[0] > (t.value.col_index - 1) && (borderRange.c[0] = t.value.col_index - 1);
            borderRange.c[1] < (t.value.col_index + 1) && (borderRange.c[1] = t.value.col_index + 1);

            ['l', 'r', 't', 'b'].forEach(d => {
                if (t.value[d] && !isUndefined(t.value[d].style) && !isNull(t.value[d].style)) {
                    const linePos = createLinePos(t.value.row_index, t.value.col_index, d)
                    const style = `${t.value[d]}` === '0' ? undefined : {
                        style: t.value[d].style,
                        color: t.value[d].color,
                        styleKey: `${t.value[d].style}_${t.value[d].color}`
                    }
                    style ? borderLineMap.set(linePos, style) : borderLineMap.delete(linePos)
                }
            })
        }
        else if (t.rangeType === 'range') {
            for (let i = 0; i < t.range.length; i++) {
                const range = t.range[i]
                borderRange.r[0] >(range.row[0] - 1) && (borderRange.r[0] = range.row[0]-1)
                borderRange.r[1] < (range.row[1]+1) && (borderRange.r[1] = range.row[1]+1)
                borderRange.c[0] > (range.column[0]-1) && (borderRange.c[0] = range.column[0]-1)
                borderRange.c[1] < (range.column[1]+1) && (borderRange.c[1] = range.column[1]+1)

                for (let r = range.row[0]; r <= range.row[1]; r++) {
                    for (let c = range.column[0]; c <= range.column[1]; c++) {
                        const style = {
                            style: t.style, color: t.color, styleKey: `${t.style}_${t.color}`
                        }
                        if (t.borderType === 'border-all') {
                            borderLineMap.set(createLinePos(r, c, 't'), style)
                            borderLineMap.set(createLinePos(r, c, 'b'), style)
                            borderLineMap.set(createLinePos(r, c, 'r'), style)
                            borderLineMap.set(createLinePos(r, c, 'l'), style)
                        } else if (t.borderType === 'border-top') {
                            r === range.row[0] && borderLineMap.set(createLinePos(r, c, 't'), style)
                        } else if (t.borderType === 'border-bottom') {
                            r === range.row[1] && borderLineMap.set(createLinePos(r, c, 'b'), style)
                        } else if (t.borderType === 'border-left') {
                            c === range.column[0] && borderLineMap.set(createLinePos(r, c, 'l'), style)
                        } else if (t.borderType === 'border-right') {
                            c === range.column[1] && borderLineMap.set(createLinePos(r, c, 'r'), style)
                        } else if (t.borderType === 'border-outside') {
                            r === range.row[0] && borderLineMap.set(createLinePos(r, c, 't'), style)
                            r === range.row[1] && borderLineMap.set(createLinePos(r, c, 'b'), style)
                            c === range.column[0] && borderLineMap.set(createLinePos(r, c, 'l'), style)
                            c === range.column[1] && borderLineMap.set(createLinePos(r, c, 'r'), style)
                        } else if (t.borderType === 'border-inside') {
                            r !== range.row[0] && borderLineMap.set(createLinePos(r, c, 't'), style)
                            r !== range.row[1] && borderLineMap.set(createLinePos(r, c, 'b'), style)
                            c !== range.column[0] && borderLineMap.set(createLinePos(r, c, 'l'), style)
                            c !== range.column[1] && borderLineMap.set(createLinePos(r, c, 'r'), style)
                        } else if (t.borderType === 'border-horizontal') {
                            r !== range.row[0] && borderLineMap.set(createLinePos(r, c, 't'), style)
                        } else if (t.borderType === 'border-vertical') {
                            c !== range.column[0] && borderLineMap.set(createLinePos(r, c, 'l'), style)
                        } else if (t.borderType === 'border-none') {
                            // 设置为无边框时，删除边框数据
                            borderLineMap.delete(createLinePos(r, c, 't'))
                            borderLineMap.delete(createLinePos(r, c, 'b'))
                            borderLineMap.delete(createLinePos(r, c, 'r'))
                            borderLineMap.delete(createLinePos(r, c, 'l'))
                        }
                    }
                }
            }
        }
    }
    // 创建边框样式key值
    // 判断4边边框内容是一样的
    const isBorderAll = (r, c) => {
        const topLine = borderLineMap.get(createLinePos(r, c, 't'))
        const bottomLine = borderLineMap.get(createLinePos(r, c, 'b'))
        const leftLine = borderLineMap.get(createLinePos(r, c, 'l'))
        const rightLine = borderLineMap.get(createLinePos(r, c, 'r'))
        return topLine
            && bottomLine
            && leftLine
            && rightLine
            && topLine.styleKey === bottomLine.styleKey
            && topLine.styleKey === leftLine.styleKey
            && topLine.styleKey === rightLine.styleKey
    }
    const borderAllResult = []
    // 被合并成 borderType为all的坐标集合
    const borderAllMergedPosSet = new Set()
    const dfsBorderAll = (d, styleKey, r = 0, cArray = [0, 0], resultItem) => {
        // 判断能否被合并
        const ableMerge = (task) => {
            let able = true
            for (let c = task.cArray[0]; c <= task.cArray[1]; c++) {
                // 接触到已经被合并的单元格，判断该区间为不可合并
                if (borderAllMergedPosSet.has(`${task.r}_${c}`)) {
                    able = false
                    break
                }
                const topLine = borderLineMap.get(createLinePos(task.r, c, 't'));
                const bottomLine = borderLineMap.get(createLinePos(task.r, c, 'b'));
                const leftLine = borderLineMap.get(createLinePos(task.r, c, 'l'));
                const rightLine = borderLineMap.get(createLinePos(task.r, c, 'r'));
                if (
                    topLine && bottomLine && leftLine && rightLine
                    && styleKey === topLine.styleKey
                    && styleKey === bottomLine.styleKey
                    && styleKey === leftLine.styleKey
                    && styleKey === rightLine.styleKey
                ) {
                    // do nothing
                }
                else {
                    able = false
                    break
                }
            }
            return able
        }
        const taskArr = [{
            r, cArray, d,
        }]
        // 使用栈遍历，避免出现递归次数超出限制的问题
        while (taskArr.length) {
            const task = taskArr.shift()
            if (task.d === 'right') {
                // 不能被合并，开始向下尝试合并
                if (!ableMerge(task)) {
                    taskArr.push({
                        d: 'down', r: task.r+1, cArray: resultItem.c
                    })
                } else {
                    resultItem.c[1] = task.cArray[1]
                    for (let c = task.cArray[0]; c <= task.cArray[1]; c++) {
                        borderAllMergedPosSet.add(`${task.r}_${c}`)
                    }
                    taskArr.push({
                        d: 'right', r: task.r, cArray: [task.cArray[0] + 1, task.cArray[1] + 1]
                    })
                }

            }
            else if (task.d === 'down') {
                // 不能继续向下合并，直接跳出
                if (!ableMerge(task)) {
                    break
                } else {
                    resultItem.r[1] = task.r
                    for (let c = task.cArray[0]; c <= task.cArray[1]; c++) {
                        borderAllMergedPosSet.add(`${task.r}_${c}`)
                    }
                    taskArr.push({
                        d: 'down', r: task.r + 1, cArray: resultItem.c
                    })
                }
            }
        }
    }
    // 第一次遍历，找出所有能合并成borderAll的数据
    for (let r = borderRange.r[0]; r <= borderRange.r[1]; r++) {
        for (let c = borderRange.c[0]; c <= borderRange.c[1]; c++) {
            if (isBorderAll(r, c) && !borderAllMergedPosSet.has(`${r}_${c}`)) {
                borderAllMergedPosSet.add(`${r}_${c}`)
                const leftLine = borderLineMap.get(createLinePos(r, c, 'l'))
                const resultItem = {
                    borderType: 'border-all',
                    r: [r, r],
                    c: [c, c],
                    line: leftLine,
                }
                borderAllResult.push(resultItem)
                dfsBorderAll('right', leftLine.styleKey, r, [c+1, c+1], resultItem)
            }
        }
    }

    // 删除borderAll的线条，准备进行第二次聚合
    for (let i = 0; i < borderAllResult.length; i++) {
        const item = borderAllResult[i]
        for (let r = item.r[0]; r <= item.r[1]; r++) {
            for (let c = item.c[0]; c <= item.c[1]; c++) {
                borderLineMap.delete(createLinePos(r, c, 'l'))
                borderLineMap.delete(createLinePos(r, c, 'r'))
                borderLineMap.delete(createLinePos(r, c, 't'))
                borderLineMap.delete(createLinePos(r, c, 'b'))
            }
        }
    }
    if (!borderLineMap.size) {
        return borderAllResult
    }
    const borderBottomResult = []
    const borderBottomMergedPosSet = new Set()

    const dfsBorderBottom = (styleKey, r, c, resultItem) => {
        const posKey = `${r}_${c}`
        if (borderBottomMergedPosSet.has(posKey)) {
            return;
        }
        const bottomLine = borderLineMap.get(createLinePos(r, c, 'b'))
        if (!bottomLine || bottomLine.styleKey !== styleKey) {
            return
        }
        borderBottomMergedPosSet.add(posKey)
        resultItem.c[1] = c
        return dfsBorderBottom(styleKey, r, c + 1, resultItem)
    }

    const borderRightResult = []
    const borderRightMergedPosSet = new Set()
    const dfsBorderRight = (styleKey, r, c, resultItem) => {
        const posKey = `${r}_${c}`
        if (borderRightMergedPosSet.has(posKey)) {
            return;
        }
        const rightLine = borderLineMap.get(createLinePos(r, c, 'r'))
        if (!rightLine || rightLine.styleKey !== styleKey) {
            return
        }
        borderRightMergedPosSet.add(posKey)
        resultItem.r[1] = r
        return dfsBorderRight(styleKey, r+1, c, resultItem)
    }

    // 第二次遍历，找出所有能合并成borderBottom、borderRight的数据
    for (let r = borderRange.r[0]; r <= borderRange.r[1]; r++) {
        for (let c = borderRange.c[0]; c <= borderRange.c[1]; c++) {
            const bottomLine = borderLineMap.get(createLinePos(r, c, 'b'))
            const rightLine = borderLineMap.get(createLinePos(r, c, 'r'))
            if (bottomLine && !borderBottomMergedPosSet.has(`${r}_${c}`)) {
                const resultItem = {
                    borderType: 'border-bottom',
                    r: [r, r],
                    c: [c, c],
                    line: bottomLine,
                }
                borderBottomMergedPosSet.add(`${r}_${c}`)
                borderBottomResult.push(resultItem)
                dfsBorderBottom(bottomLine.styleKey, r, c+1, resultItem)
            }
            if (rightLine && !borderRightMergedPosSet.has(`${r}_${c}`)) {
                const resultItem = {
                    borderType: 'border-right',
                    r: [r, r],
                    c: [c, c],
                    line: rightLine,
                }
                borderBottomMergedPosSet.add(`${r}_${c}`)
                borderRightResult.push(resultItem)
                dfsBorderRight(rightLine.styleKey, r+1, c, resultItem)
            }
        }
    }
    // return [...borderBottomResult, ...borderRightResult]
    return borderAllResult.concat(borderBottomResult, borderRightResult)
}
function borderInfoMerge(infoList) {
    console.log('start merge border info')
    if (!infoList || !infoList.length) {
        return []
    }
    // 如果边框数据少于120，就不进行合并
    if (infoList.length < 120) {
        return infoList
    }
    const mergeInfo = borderInfoMergeCore(infoList).map(o => ({
        rangeType: 'range',
        borderType: o.borderType,
        color: o.line.color,
        style: o.line.style,
        range: [{column: o.c, row: o.r}],
    }))
    return mergeInfo
}

export {
    isJsonString,
    common_extend,
    replaceHtml,
    getObjType,
    getNowDateTime,
    hexToRgb,
    rgbTohex,
    ABCatNum,
    chatatABC,
    ceateABC,
    createABCdim,
    getByteLen,
    ArrayUnique,
    luckysheetfontformat,
    showrightclickmenu,
    luckysheetactiveCell,
    numFormat,
    numfloatlen,
    mouseclickposition,
    $$,
    seriesLoadScripts,
    parallelLoadScripts,
    loadLinks,
    luckysheetContainerFocus,
    transformRangeToAbsolute,
    openSelfModel,
    createProxy,
    arrayRemoveItem,
    camel2split,
    borderInfoMerge,
};
