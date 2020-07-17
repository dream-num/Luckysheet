import { luckysheetfontformat } from '../utils/util';
import menuButton from '../controllers/menuButton';
import { getcellvalue } from './getdata';
import { colLocationByIndex } from './location';
import Store from '../store';

//计算范围行高
function rowlenByRange(d, r1, r2, cfg) {
    let cfg_clone = $.extend(true, {}, cfg);
    if(cfg_clone["rowlen"] == null){
        cfg_clone["rowlen"] = {};
    }

    let ctcanvas = $("#luckysheetTableContent").get(0).getContext("2d");
    
    for(let r = r1; r <= r2; r++){
        if (cfg_clone["rowhidden"] != null && cfg_clone["rowhidden"][r] != null) {
            continue;
        }

        let currentRowLen = Store.defaultrowlen;
        if(cfg_clone["rowlen"][r] != null){
            currentRowLen = cfg_clone["rowlen"][r];
        }

        for(let c = 0; c < d[r].length; c++){
            if(d[r][c] != null && d[r][c]["v"] != null && d[r][c]["tb"] != null && d[r][c]["tb"] == "2"){
                //自动换行
                let fontset = luckysheetfontformat(d[r][c]);
                ctcanvas.font = fontset;
                let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

                let cellText = getcellvalue(r, c, d).toString(); //单元格文本
                let textWidth = ctcanvas.measureText(cellText).width; //文本宽度
                let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 8; //单元格宽度

                let computeRowlen; //计算行高
                if(textWidth > cellWidth){
                    let strArr = []; //文本截断数组
                    
                    for(let strI = 1; strI <= cellText.length; strI++){
                        let strV = cellText.substring(strArr.join("").length, strI);
                        let strtextMetrics = ctcanvas.measureText(strV).width;
                        
                        if(strtextMetrics > cellWidth){
                            strArr.push(cellText.substring(strArr.join("").length, strI-1));
                            strI = strI-2;
                        }
                        else if(strtextMetrics <= cellWidth && strI == cellText.length){
                            strArr.push(strV);
                        }
                    }

                    computeRowlen = oneLineTextHeight * strArr.length;
                }
                else{
                    computeRowlen = oneLineTextHeight;
                }

                //比较计算行高和当前行高取最大高度
                if(computeRowlen > currentRowLen){
                    currentRowLen = computeRowlen;
                }
            }
            else if(d[r][c] != null && d[r][c]["v"] != null && d[r][c]["tr"] != null){
                //文本旋转
                let fontset = luckysheetfontformat(d[r][c]);
                ctcanvas.font = fontset;
                let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

                let cellText = getcellvalue(r,c,d).toString(); //单元格文本
                let textWidth = ctcanvas.measureText(cellText).width; //文本宽度

                let computeRowlen; //计算行高
                if(d[r][c]["tr"] == "0"){
                    //无旋转
                    computeRowlen = oneLineTextHeight;
                }
                else if(d[r][c]["tr"] == "1" || d[r][c]["tr"] == "2"){
                    //向下倾斜（45 旋转）----向上倾斜（-45 旋转）
                    computeRowlen = 0.707 * (textWidth + oneLineTextHeight) + 4;
                }
                else if(d[r][c]["tr"] == "3"){
                    //竖排文字
                    computeRowlen = cellText.length * oneLineTextHeight + 4;
                }
                else if(d[r][c]["tr"] == "4" || d[r][c]["tr"] == "5"){
                    //向下90（90 旋转）----向上90（-90 旋转）
                    computeRowlen = textWidth + 4;
                }
                computeRowlen = Math.round(computeRowlen);

                //比较计算高度和当前高度取最大高度
                if(computeRowlen > currentRowLen){
                    currentRowLen = computeRowlen;
                }
            } 
            else{
                let fontset = luckysheetfontformat(d[r][c]);
                let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

                //比较计算高度和当前高度取最大高度
                if(oneLineTextHeight > currentRowLen){
                    currentRowLen = oneLineTextHeight;
                }
            }
        }

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

export {
    rowlenByRange,
    computeRowlenArr,
}