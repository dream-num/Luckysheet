import { luckysheetfontformat } from '../utils/util';
import menuButton from '../controllers/menuButton';
import { getcellvalue } from './getdata';
import { colLocationByIndex } from './location';
import { hasChinaword } from './validate';
import Store from '../store';

//计算范围行高
function rowlenByRange(d, r1, r2, cfg) {
    let cfg_clone = $.extend(true, {}, cfg);
    if(cfg_clone["rowlen"] == null){
        cfg_clone["rowlen"] = {};
    }

    let canvas = $("#luckysheetTableContent").get(0).getContext("2d");
    canvas.textBaseline = 'top'; //textBaseline以top计算
    
    for(let r = r1; r <= r2; r++){
        if (cfg_clone["rowhidden"] != null && cfg_clone["rowhidden"][r] != null) {
            continue;
        }

        let currentRowLen = Store.defaultrowlen;
        // if(cfg_clone["rowlen"][r] != null){
        //     currentRowLen = cfg_clone["rowlen"][r];
        // }

        delete cfg_clone["rowlen"][r];

        for(let c = 0; c < d[r].length; c++){
            let cell = d[r][c];

            if(cell == null){
                continue;
            }

            if(cell != null && cell.v != null){
                let fontset = luckysheetfontformat(cell);
                canvas.font = fontset;

                let value = getcellvalue(r, c, d).toString(); //单元格文本
                let measureText = getMeasureText(value, canvas);

                let textMetrics = measureText.width; //文本宽度
                let oneLineTextHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;
                
                let computeRowlen; //计算行高
                let word_space_height = oneLineTextHeight/3;
                if(cell.tb == "2"){
                    //自动换行
                    let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 4; //单元格宽度

                    if(textMetrics > cellWidth){
                        let strArr = []; //文本截断数组
                        strArr = getCellTextSplitArr(value, strArr, cellWidth, canvas);

                        computeRowlen = (oneLineTextHeight+word_space_height) * strArr.length + 4;
                    }
                    else{
                        computeRowlen = oneLineTextHeight + 4;
                    }
                }
                else if(cell.tr != null){
                    //单元格有旋转标示
                    let tr = cell.tr;
                                
                    if(tr == "0"){
                        //无旋转
                        computeRowlen = oneLineTextHeight + 4;    
                    }
                    else if(tr == "1" || tr == "2"){
                        //向下倾斜（45 旋转）----向上倾斜（-45 旋转）
                        computeRowlen = 0.707 * (textMetrics + oneLineTextHeight) + 4;
                    }
                    else if(tr == "3"){
                        //竖排文字
                        computeRowlen = value.length * oneLineTextHeight + 4;
                    }
                    else if(tr == "4" || tr == "5"){
                        //向下90（90 旋转）----向上90（-90 旋转）
                        computeRowlen = textMetrics + 4;
                    }

                    computeRowlen = Math.round(computeRowlen);
                }
                else{
                    computeRowlen = oneLineTextHeight + 4;
                }

                //比较计算高度和当前高度取最大高度
                if(computeRowlen > currentRowLen){
                    currentRowLen = computeRowlen;
                }
            }
        }

        currentRowLen = currentRowLen/Store.zoomRatio;

        if(currentRowLen != Store.defaultrowlen){
            cfg_clone["rowlen"][r] = currentRowLen;
        }
    }

    return cfg_clone;
}

//计算表格行高数组
function computeRowlenArr(rowHeight, cfg) {
    let rowlenArr = [];
    let rh_height = 0;

    for (let i = 0; i < rowHeight; i++) {
        let rowlen = Store.defaultrowlen;
        
        if (cfg["rowlen"] != null && cfg["rowlen"][i] != null) {
            rowlen = cfg["rowlen"][i];
        }

        if (cfg["rowhidden"] != null && cfg["rowhidden"][i] != null) {
            rowlen = cfg["rowhidden"][i];
            rowlenArr.push(rh_height);
            continue;
        }
        else {
            rh_height += rowlen + 1;
        }
        
        rowlenArr.push(rh_height);//行的临时长度分布
    }

    return rowlenArr;
}

//获取换行单元格截断数组
function getCellTextSplitArr(strValue, strArr, cellWidth, canvas){
    for(let strI = 1; strI <= strValue.length; strI++){
        let strV = strValue.substring(0, strI);
        let strtextMetrics = getMeasureText(strV, canvas).width;

        if(strtextMetrics > cellWidth){
            if(strI - 1 <= 0){
                return strArr;
            }
            else{
                strArr.push(strValue.substring(0, strI - 1));
                return getCellTextSplitArr(strValue.substring(strI - 1), strArr, cellWidth, canvas);
            }
        }
        else if(strI == strValue.length){
            strArr.push(strV);
        }
    }

    return strArr;
}

//获取有值单元格文本大小
// let measureTextCache = {}, measureTextCacheTimeOut = null;
function getMeasureText(value, ctx){
    let mtc = Store.measureTextCache[value + "_" + ctx.font];

    if(mtc != null){
        return mtc;
    }
    else{
        let measureText = ctx.measureText(value), cache = {};
        cache.width = measureText.width;
        cache.actualBoundingBoxDescent = measureText.actualBoundingBoxDescent;
        cache.actualBoundingBoxAscent = measureText.actualBoundingBoxAscent;
        if(cache.actualBoundingBoxDescent==null || cache.actualBoundingBoxAscent==null || isNaN(cache.actualBoundingBoxDescent) || isNaN(cache.actualBoundingBoxAscent)){
            let commonWord = "M"
            if(hasChinaword(value)){
                commonWord = "田";
            }
            let oneLineTextHeight = menuButton.getTextSize(commonWord, ctx.font)[1]*0.8;
            cache.actualBoundingBoxDescent = oneLineTextHeight/2;
            cache.actualBoundingBoxAscent = oneLineTextHeight/2;

            //console.log(value, oneLineTextHeight, measureText.actualBoundingBoxDescent+measureText.actualBoundingBoxAscent,ctx.font);
        }
        cache.width *= Store.zoomRatio;
        cache.actualBoundingBoxDescent *= Store.zoomRatio;
        cache.actualBoundingBoxAscent *= Store.zoomRatio;
        Store.measureTextCache[value + "_" + Store.zoomRatio +  "_" + ctx.font] = cache;

        return cache;
    }
}

export {
    rowlenByRange,
    computeRowlenArr,
    getCellTextSplitArr,
    getMeasureText
}