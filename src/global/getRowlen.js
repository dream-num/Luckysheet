import {luckysheetfontformat} from '../utils/util';
import menuButton from '../controllers/menuButton';
import {checkstatusByCell} from './getdata';
import {colLocationByIndex,colSpanLocationByIndex} from './location';
import {checkWordByteLength, hasChinaword, isRealNull} from './validate';
import {isInlineStringCell} from '../controllers/inlineString';

import Store from '../store';

/**
 * 计算范围行高
 *
 * @param d 原始数据
 * @param r1 起始行
 * @param r2 截至行
 * @param cfg 配置
 * @returns 计算后的配置
 */
function rowlenByRange(d, r1, r2, cfg) {
    let cfg_clone = $.extend(true, {}, cfg);
    if(cfg_clone["rowlen"] == null){
        cfg_clone["rowlen"] = {};
    }

    if(cfg_clone["customHeight"] == null){
        cfg_clone["customHeight"] = {};
    }

    let canvas = $("#luckysheetTableContent").get(0).getContext("2d");
    canvas.textBaseline = 'top'; //textBaseline以top计算

    for(let r = r1; r <= r2; r++){
        if (cfg_clone["rowhidden"] != null && cfg_clone["rowhidden"][r] != null) {
            continue;
        }

        let currentRowLen = Store.defaultrowlen;

        if(cfg_clone["customHeight"][r]==1){
            continue;
        }

        delete cfg_clone["rowlen"][r];

        for(let c = 0; c < d[r].length; c++){
            let cell = d[r][c];

            if(cell == null){
                continue;
            }

            if(cell != null && (cell.v != null || isInlineStringCell(cell)) ){
                let cellWidth;
                if(cell.mc){
                    if(c === cell.mc.c){
                        let st_cellWidth = colLocationByIndex(c)[0];
                        let ed_cellWidth = colLocationByIndex(cell.mc.c + cell.mc.cs - 1)[1];
                        cellWidth = ed_cellWidth - st_cellWidth - 2;
                    }else{
                        continue;
                    }
                } else {
                    cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 2;
                }

                let textInfo = getCellTextInfo(cell, canvas,{
                    r:r,
                    c:c,
                    cellWidth:cellWidth
                });

                let computeRowlen = 0;

                if(textInfo!=null){
                    computeRowlen = textInfo.textHeightAll+2;
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
        }else{
            if(cfg["rowlen"]?.[r]){
                cfg_clone["rowlen"][r] = cfg["rowlen"][r]
            }
        }
    }

    return cfg_clone;
}

//根据内容计算行高
function computeRowlenByContent(d, r) {
    let currentRowLen = 0;

    let canvas = $("#luckysheetTableContent").get(0).getContext("2d");
    canvas.textBaseline = 'top'; //textBaseline以top计算

    for(let c = 0; c < d[r].length; c++){
        let cell = d[r][c];

        if (cell == null) {
            continue;
        }

        if (cell.mc != null) {
            if (1 !== cell.mc.rs) {
                continue;
            }
        }

        if(Store.config["colhidden"] != null && Store.config["colhidden"][c] != null){
            continue;
        }


        if(cell != null && (cell.v != null || isInlineStringCell(cell)) ){
            let cellWidth = computeCellWidth(cell, c);

            let textInfo = getCellTextInfo(cell, canvas,{
                r:r,
                c:c,
                cellWidth:cellWidth
            });

            let computeRowlen = 0;

            if (textInfo != null) {
                computeRowlen = textInfo.textHeightAll + 2;
            }

            //比较计算高度和当前高度取最大高度
            if (computeRowlen > currentRowLen) {
                currentRowLen = computeRowlen;
            }
        }
    }

    return currentRowLen;
}

function computeCellWidth(cell, col_index) {
    let colLocationArr = colLocationByIndex(col_index);
    if (cell.mc && 1 !== cell.mc.cs) {
        colLocationArr = colSpanLocationByIndex(col_index, cell.mc.cs);
    }

    return colLocationArr[1] - colLocationArr[0] - 2;
}

function computeColWidthByContent(d, c, rh) {
    let currentColLen = 0;
    let rowlenArr = computeRowlenArr(rh, c)

    let canvas = $("#luckysheetTableContent").get(0).getContext("2d");
    canvas.textBaseline = 'top'; //textBaseline以top计算

    for (var i = 0; i < d.length; i++) {
        var cell = d[i][c]

        if (cell != null && (cell.v != null || isInlineStringCell(cell))) {
            let cellHeight = rowlenArr[c];
            let textInfo = getCellTextInfo(cell, canvas, {
                r: i,
                c: c,
                cellHeight: cellHeight
            });

            let computeCollen = 0;

            if (textInfo != null) {
                computeCollen = textInfo.textWidthAll + 2;
            }

            //比较计算高度和当前高度取最大高度
            if (computeCollen > currentColLen) {
                currentColLen = computeCollen;
            }
        }
    }

    return currentColLen;
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
function getMeasureText(value, ctx, fontset){

    let mtc = Store.measureTextCache[value + "_" + ctx.font];
    if(fontset!=null){
        mtc = Store.measureTextCache[value + "_" + fontset];
    }

    if(mtc != null){
        return mtc;
    }
    else{
        if(fontset!=null){
            let preFont = ctx.font;
            ctx.font = fontset;
        }

        let measureText = ctx.measureText(value), cache = {};
        // var regu = "^[ ]+$";
        // var re = new RegExp(regu);
        // if(measureText.actualBoundingBoxRight==null || re.test(value)){
        //     cache.width = measureText.width;
        // }
        // else{
        //     //measureText.actualBoundingBoxLeft +
        //     cache.width = measureText.actualBoundingBoxRight;
        // }

        cache.width = measureText.width;

        if(fontset!=null){
            ctx.font = fontset;
        }

        cache.actualBoundingBoxDescent = measureText.actualBoundingBoxDescent;
        cache.actualBoundingBoxAscent = measureText.actualBoundingBoxAscent;
        if(cache.actualBoundingBoxDescent==null || cache.actualBoundingBoxAscent==null || isNaN(cache.actualBoundingBoxDescent) || isNaN(cache.actualBoundingBoxAscent)){
            let commonWord = "M"
            if(hasChinaword(value)){
                commonWord = "田";
            }
            let oneLineTextHeight = menuButton.getTextSize(commonWord, ctx.font)[1]*0.8;
            if(ctx.textBaseline=="top"){
                cache.actualBoundingBoxDescent = oneLineTextHeight;
                cache.actualBoundingBoxAscent = 0;
            }
            else if(ctx.textBaseline=="middle"){
                cache.actualBoundingBoxDescent = oneLineTextHeight/2;
                cache.actualBoundingBoxAscent = oneLineTextHeight/2;
            }
            else{
                cache.actualBoundingBoxDescent = 0;
                cache.actualBoundingBoxAscent = oneLineTextHeight;
            }

            //console.log(value, oneLineTextHeight, measureText.actualBoundingBoxDescent+measureText.actualBoundingBoxAscent,ctx.font);
        }

        if(ctx.textBaseline == 'alphabetic'){
            let descText = "gjpqy", matchText="abcdABCD";
            let descTextMeasure = Store.measureTextCache[descText + "_" + ctx.font];
            if(fontset!=null){
                descTextMeasure = Store.measureTextCache[descText + "_" + fontset];
            }

            let matchTextMeasure = Store.measureTextCache[matchText + "_" + ctx.font];
            if(fontset!=null){
                matchTextMeasure = Store.measureTextCache[matchText + "_" + fontset];
            }

            if(descTextMeasure == null){
                descTextMeasure = ctx.measureText(descText);
            }

            if(matchTextMeasure == null){
                matchTextMeasure = ctx.measureText(matchText);
            }

            if(cache.actualBoundingBoxDescent<=matchTextMeasure.actualBoundingBoxDescent){
                cache.actualBoundingBoxDescent = descTextMeasure.actualBoundingBoxDescent;
                if(cache.actualBoundingBoxDescent==null){
                    cache.actualBoundingBoxDescent = 0;
                }
            }


        }

        cache.width *= Store.zoomRatio;
        cache.actualBoundingBoxDescent *= Store.zoomRatio;
        cache.actualBoundingBoxAscent *= Store.zoomRatio;
        Store.measureTextCache[value + "_" + Store.zoomRatio +  "_" + ctx.font] = cache;
        // console.log(measureText, value);
        return cache;
    }
}

function isSupportBoundingBox(ctx){
    let measureText = ctx.measureText("田");
    if(measureText.actualBoundingBoxAscent==null){
        return false;
    }
    return true;
}


//获取单元格文本内容的渲染信息
// let measureTextCache = {}, measureTextCacheTimeOut = null;
// option {cellWidth,cellHeight,space_width,space_height}
function getCellTextInfo(cell , ctx, option){
    let cellWidth = option.cellWidth;
    let cellHeight = option.cellHeight;
    let isMode = "", isModeSplit = "";
    // console.log("initialinfo", cell, option);
    if(cellWidth==null){
        isMode = "onlyWidth";
        isModeSplit = "_";
    }
    let textInfo = Store.measureTextCellInfoCache[option.r + "_" + option.c + isModeSplit + isMode];
    if(textInfo != null){
        return textInfo;
    }

    // let cell = Store.flowdata[r][c];
    let space_width = option.space_width, space_height = option.space_height; //宽高方向 间隙

    if(space_width==null){
        space_width = 2;
    }

    if(space_height==null){
        space_height = 2;
    }

    //水平对齐
    let horizonAlign = checkstatusByCell(cell, "ht");
    //垂直对齐
    let verticalAlign = checkstatusByCell(cell, "vt");

    let tb = checkstatusByCell(cell ,"tb");//wrap overflow
    let tr = checkstatusByCell(cell ,"tr");//rotate
    let rt = checkstatusByCell(cell ,"rt");//rotate angle

    let isRotateUp = 1, isRotateDown=0;

    if(rt==null){
        if(tr=="0"){
            rt = 0;
        }
        else if(tr=="1"){
            rt = 45;
        }
        else if(tr=="4"){
            rt = 90;
        }
        else if(tr=="2"){
            rt = 135;
        }
        else if(tr=="5"){
            rt = 180;
        }

        if(rt==null){
            rt = 0;
        }
    }

    if(rt>180 || rt<0){
        rt = 0;
    }

    rt = parseInt(rt);
    if(rt>90){
        rt = 90 -rt;
        isRotateUp = 0;
        isRotateDown = 1;
    }

    ctx.textAlign="start";

    let textContent = {};
    textContent.values = [];

    let fontset, cancelLine="0", underLine="0", fontSize=11, isInline=false, value, inlineStringArr=[];
    if(isInlineStringCell(cell)){
        let sharedStrings = cell.ct.s, similarIndex = 0;
        for(let i=0;i<sharedStrings.length;i++){
            let shareCell = sharedStrings[i];
            let scfontset = luckysheetfontformat(shareCell);
            let fc = shareCell.fc, cl=shareCell.cl,un = shareCell.un, v = shareCell.v, fs=shareCell.fs;
            v = v.replace(/\r\n/g, "_x000D_").replace(/&#13;&#10;/g, "_x000D_").replace(/\r/g, "_x000D_").replace(/\n/g, "_x000D_");
            let splitArr = v.split("_x000D_");
            for(let x=0;x<splitArr.length;x++){
                let newValue = splitArr[x];

                if(newValue=="" && x!=splitArr.length-1){
                    inlineStringArr.push({
                        fontset:scfontset,
                        fc:fc==null?"#000":fc,
                        cl:cl==null?0:cl,
                        un:un==null?0:un,
                        wrap:true,
                        fs:fs==null?11:fs,
                    });
                    similarIndex++;
                }
                else{
                    let newValueArray = newValue.split("");
                    for(let n=0;n<newValueArray.length;n++){
                        let nv = newValueArray[n];

                        inlineStringArr.push({
                            fontset:scfontset,
                            fc:fc==null?"#000":fc,
                            cl:cl==null?0:cl,
                            un:un==null?0:un,
                            v: nv,
                            si:similarIndex,
                            fs:fs==null?11:fs,
                        });

                    }

                    if(x!=splitArr.length-1 ){
                        inlineStringArr.push({
                            fontset:scfontset,
                            fc:fc==null?"#000":fc,
                            cl:cl==null?0:cl,
                            un:un==null?0:un,
                            wrap:true,
                            fs:fs==null?11:fs,
                        });
                        similarIndex++;
                    }
                }

            }

            similarIndex++;
        }
        isInline = true;
    }
    else{
        fontset = luckysheetfontformat(cell);
        ctx.font = fontset;

        cancelLine = checkstatusByCell(cell ,"cl");//cancelLine
        underLine = checkstatusByCell(cell ,"un");//underLine
        fontSize = checkstatusByCell(cell ,"fs");

        if(cell instanceof Object){
            value = cell.m;
            if(value == null){
                value = cell.v;
            }
        }
        else{
            value = cell;
        }

        if(isRealNull(value)){
            return null;
        }
    }

    if(tr=="3"){//vertical text
        ctx.textBaseline = 'top';


        let textW_all = 0; //拆分后宽高度合计
        let textH_all = 0;
        let colIndex=0, textH_all_cache=0, textH_all_Column = {}, textH_all_ColumnHeight=[];
        if(isInline){
            let preShareCell = null;
            for(let i = 0; i < inlineStringArr.length; i++){
                let shareCell = inlineStringArr[i];
                let value = shareCell.v, showValue=shareCell.v;
                if(shareCell.wrap===true){
                    value = "M";
                    showValue = "";


                    if( preShareCell!=null && preShareCell.wrap!==true && (i<inlineStringArr.length-1)){
                        // console.log("wrap",i,colIndex,preShareCell.wrap);
                        textH_all_ColumnHeight.push(textH_all_cache);
                        textH_all_cache = 0;
                        colIndex +=1;

                        preShareCell = shareCell;
                        continue;
                    }
                }

                let measureText = getMeasureText(value, ctx, shareCell.fontset);

                let textW = measureText.width + space_width;
                let textH = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent + space_height;

                // textW_all += textW;
                textH_all_cache += textH;


                if(tb=="2" && !shareCell.wrap){
                    if(textH_all_cache>cellHeight && textH_all_Column[colIndex]!=null){
                        // textW_all += textW;
                        // textH_all = Math.max(textH_all,textH_all_cache);
                        // console.log(">",i,colIndex);
                        textH_all_ColumnHeight.push(textH_all_cache-textH);
                        textH_all_cache = textH;
                        colIndex +=1;
                    }
                }

                if(i== inlineStringArr.length-1){
                    textH_all_ColumnHeight.push(textH_all_cache);
                }

                if(textH_all_Column[colIndex]==null){
                    textH_all_Column[colIndex]= [];
                }

                let item = {
                    content:showValue,
                    style:shareCell,
                    width:textW,
                    height:textH,
                    left:0,
                    top:0,
                    colIndex:colIndex,
                    asc:measureText.actualBoundingBoxAscent,
                    desc:measureText.actualBoundingBoxDescent,
                    inline:true,
                }

                if(shareCell.wrap===true){
                    item.wrap=true;
                }

                textH_all_Column[colIndex].push(item);
                console.log("normal",i,colIndex,shareCell, preShareCell, textH_all_Column);
                preShareCell = shareCell;

            }
        }
        else{
            let measureText = getMeasureText(value, ctx);
            let textHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;

            value = value.toString();

            let vArr = [];
            if(value.length > 1){
                vArr = value.split("");
            }
            else{
                vArr.push(value);
            }
            let oneWordWidth =  getMeasureText(vArr[0], ctx).width;

            for(let i = 0; i < vArr.length; i++){
                let textW = oneWordWidth + space_width;
                let textH = textHeight + space_height;

                // textW_all += textW;
                textH_all_cache += textH;


                if(tb=="2"){
                    if(textH_all_cache>cellHeight && textH_all_Column[colIndex]!=null){
                        // textW_all += textW;
                        // textH_all = Math.max(textH_all,textH_all_cache);
                        textH_all_ColumnHeight.push(textH_all_cache-textH);
                        textH_all_cache = textH;
                        colIndex +=1;
                    }
                }

                if(i== vArr.length-1){
                    textH_all_ColumnHeight.push(textH_all_cache);
                }

                if(textH_all_Column[colIndex]==null){
                    textH_all_Column[colIndex]= [];
                }

                textH_all_Column[colIndex].push({
                    content:vArr[i],
                    style:fontset,
                    width:textW,
                    height:textH,
                    left:0,
                    top:0,
                    colIndex:colIndex,
                    asc:measureText.actualBoundingBoxAscent,
                    desc:measureText.actualBoundingBoxDescent
                });

            }
        }

        let textH_all_ColumWidth = [];
        for(let i = 0; i < textH_all_ColumnHeight.length; i++){
            let columnHeight = textH_all_ColumnHeight[i];
            let col = textH_all_Column[i], colMaxW=0;
            for(let c=0;c<col.length;c++){
                let word = col[c];
                colMaxW = Math.max(colMaxW, word.width);
            }
            textH_all_ColumWidth.push(colMaxW);
            textW_all += colMaxW;
            textH_all = Math.max(textH_all, columnHeight);
        }

        textContent.type = "verticalWrap";
        textContent.textWidthAll = textW_all;
        textContent.textHeightAll = textH_all;

        if(isMode=="onlyWidth"){
            // console.log("verticalWrap", textContent,cell, option);
            return textContent;
        }

        let cumColumnWidth = 0;
        for(let i = 0; i < textH_all_ColumnHeight.length; i++){
            let columnHeight = textH_all_ColumnHeight[i];
            let columnWidth = textH_all_ColumWidth[i];

            let col = textH_all_Column[i];
            let cumWordHeight = 0;
            for(let c=0;c<col.length;c++){
                let word = col[c];

                let left = space_width + cumColumnWidth;
                if(horizonAlign == "0"){
                    left = cellWidth / 2 + cumColumnWidth - textW_all/2 + space_width*textH_all_ColumnHeight.length;
                }
                else if(horizonAlign == "2"){
                    left = cellWidth + cumColumnWidth - textW_all + space_width;
                }

                let top = (cellHeight - space_height)  + cumWordHeight - columnHeight;
                if(verticalAlign == "0"){
                    top = cellHeight / 2 + cumWordHeight - columnHeight/2;
                }
                else if(verticalAlign == "1"){
                    top = space_height  + cumWordHeight;
                }

                cumWordHeight += word.height;

                word.left = left;
                word.top = top;

                drawLineInfo(word, cancelLine, underLine,{
                    width:columnWidth,
                    height:word.height,
                    left:left,
                    top:top+word.height-space_height,
                    asc:word.height,
                    desc:0,
                    fs:fontSize
                });

                textContent.values.push(word);
            }

            cumColumnWidth+=columnWidth;

        }
    }
    else{
        let supportBoundBox = isSupportBoundingBox(ctx);
        if(supportBoundBox){
            ctx.textBaseline = 'alphabetic';
        }
        else{
            ctx.textBaseline = 'bottom';
        }

        if(tb=="2" || isInline){//wrap

            let textW_all = 0; //拆分后宽高度合计
            let textH_all = 0;
            let textW_all_inner = 0;

            // let oneWordWidth =  getMeasureText(vArr[0], ctx).width;
            let splitIndex=0, text_all_cache=0, text_all_split = {}, text_all_splitLen=[];

            textContent.rotate = rt;
            rt = Math.abs(rt);

            let anchor = 0, preHeight = 0, preWidth=0, preStr, preTextHeight, preTextWidth, preMeasureText, i=1, wrapStyle={}, spaceOrTwoByte=null, spaceOrTwoByteIndex=null;
            if(isInline){
                while(i <= inlineStringArr.length){
                    let shareCells = inlineStringArr.slice(anchor, i);
                    if(shareCells[shareCells.length-1].wrap===true){

                        anchor = i;

                        if(shareCells.length>1){
                            for(let s=0;s<shareCells.length-1;s++){
                                let sc = shareCells[s];
                                let item = {
                                    content:sc.v,
                                    style:sc,
                                    width:sc.measureText.width,
                                    height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:sc.measureText.actualBoundingBoxAscent,
                                    desc:sc.measureText.actualBoundingBoxDescent,
                                    inline:true,
                                    fs:sc.fs
                                }

                                // if(rt!=0){//rotate
                                //     item.textHeight = sc.textHeight;
                                //     item.textWidth = sc.textWidth;
                                // }

                                text_all_split[splitIndex].push(item);
                            }
                        }

                        if(shareCells.length==1 || i==inlineStringArr.length){
                            let sc = shareCells[0];
                            let measureText = getMeasureText("M", ctx, sc.fontset);
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex] = [];
                            }
                            text_all_split[splitIndex].push({
                                content:"",
                                style:sc,
                                width:measureText.width,
                                height:measureText.actualBoundingBoxAscent+measureText.actualBoundingBoxDescent,
                                left:0,
                                top:0,
                                splitIndex:splitIndex,
                                asc:measureText.actualBoundingBoxAscent,
                                desc:measureText.actualBoundingBoxDescent,
                                inline:true,
                                wrap:true,
                                fs:sc.fs
                            });
                        }



                        splitIndex +=1;

                        i++;

                        continue;
                    }

                    let textWidth=0, textHeight=0;
                    for(let s=0;s<shareCells.length;s++){
                        let sc = shareCells[s];
                        if(sc.measureText==null){
                            sc.measureText = getMeasureText(sc.v, ctx, sc.fontset);
                        }
                        textWidth += sc.measureText.width;
                        textHeight = Math.max(sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent);
                        // console.log(sc.v,sc.measureText.width,sc.measureText.actualBoundingBoxAscent,sc.measureText.actualBoundingBoxDescent);
                    }

                    let width = textWidth * Math.cos(rt*Math.PI/180) + textHeight * Math.sin(rt*Math.PI/180);//consider text box wdith and line height

                    let height = textWidth * Math.sin(rt*Math.PI/180) + textHeight * Math.cos(rt*Math.PI/180);//consider text box wdith and line height

                    // textW_all += textW;


                    let lastWord = shareCells[shareCells.length-1];
                    if(lastWord.v==" " || checkWordByteLength(lastWord.v)==2){
                        spaceOrTwoByteIndex = i;
                    }


                    if(rt!=0){//rotate
                        // console.log("all",anchor, i , str);
                        console.log(height,space_height, cellHeight, shareCells,(height+space_height)>cellHeight);
                        if((height+space_height)>cellHeight && text_all_split[splitIndex]!=null && tb=="2" && i!= inlineStringArr.length){
                            // console.log("cut",anchor, i , str);

                            if(spaceOrTwoByteIndex!=null && spaceOrTwoByteIndex<i){

                                for(let s=0;s<spaceOrTwoByteIndex-anchor;s++){
                                    let sc = shareCells[s];
                                    text_all_split[splitIndex].push({
                                        content:sc.v,
                                        style:sc,
                                        width:sc.measureText.width,
                                        height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                        left:0,
                                        top:0,
                                        splitIndex:splitIndex,
                                        asc:sc.measureText.actualBoundingBoxAscent,
                                        desc:sc.measureText.actualBoundingBoxDescent,
                                        inline:true,
                                        fs:sc.fs
                                    });
                                }
                                anchor = spaceOrTwoByteIndex;

                                i = spaceOrTwoByteIndex + 1;

                                splitIndex +=1;

                                spaceOrTwoByteIndex = null;

                            }
                            else{

                                anchor = i-1;

                                for(let s=0;s<shareCells.length-1;s++){
                                    let sc = shareCells[s];
                                    text_all_split[splitIndex].push({
                                        content:sc.v,
                                        style:sc,
                                        width:sc.measureText.width,
                                        height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                        left:0,
                                        top:0,
                                        splitIndex:splitIndex,
                                        asc:sc.measureText.actualBoundingBoxAscent,
                                        desc:sc.measureText.actualBoundingBoxDescent,
                                        inline:true,
                                        fs:sc.fs
                                    });
                                }

                                splitIndex +=1;
                            }

                        }
                        else if(i== inlineStringArr.length){
                            // console.log("last",anchor, i , str);
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            for(let s=0;s<shareCells.length;s++){
                                let sc = shareCells[s];
                                text_all_split[splitIndex].push({
                                    content:sc.v,
                                    style:sc,
                                    width:sc.measureText.width,
                                    height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:sc.measureText.actualBoundingBoxAscent,
                                    desc:sc.measureText.actualBoundingBoxDescent,
                                    inline:true,
                                    fs:sc.fs
                                });
                            }
                            break;
                        }
                        else{
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            i++;
                        }
                    }
                    else{//plain
                        if((width+space_width)>cellWidth && text_all_split[splitIndex]!=null && tb=="2" && i!= inlineStringArr.length){


                            if(spaceOrTwoByteIndex!=null && spaceOrTwoByteIndex<i){

                                for(let s=0;s<spaceOrTwoByteIndex-anchor;s++){
                                    let sc = shareCells[s];
                                    text_all_split[splitIndex].push({
                                        content:sc.v,
                                        style:sc,
                                        width:sc.measureText.width,
                                        height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                        left:0,
                                        top:0,
                                        splitIndex:splitIndex,
                                        asc:sc.measureText.actualBoundingBoxAscent,
                                        desc:sc.measureText.actualBoundingBoxDescent,
                                        inline:true,
                                        fs:sc.fs
                                    });
                                }
                                anchor = spaceOrTwoByteIndex;

                                i = spaceOrTwoByteIndex + 1;

                                splitIndex +=1;

                                spaceOrTwoByteIndex = null;

                            }
                            else{
                                anchor = i-1;

                                for(let s=0;s<shareCells.length-1;s++){
                                    let sc = shareCells[s];
                                    text_all_split[splitIndex].push({
                                        content:sc.v,
                                        style:sc,
                                        width:sc.measureText.width,
                                        height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                        left:0,
                                        top:0,
                                        splitIndex:splitIndex,
                                        asc:sc.measureText.actualBoundingBoxAscent,
                                        desc:sc.measureText.actualBoundingBoxDescent,
                                        inline:true,
                                        fs:sc.fs
                                    });
                                }

                                splitIndex +=1;
                            }

                        }
                        else if(i== inlineStringArr.length){
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }

                            for(let s=0;s<shareCells.length;s++){
                                let sc = shareCells[s];
                                text_all_split[splitIndex].push({
                                    content:sc.v,
                                    style:sc,
                                    width:sc.measureText.width,
                                    height:sc.measureText.actualBoundingBoxAscent+sc.measureText.actualBoundingBoxDescent,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:sc.measureText.actualBoundingBoxAscent,
                                    desc:sc.measureText.actualBoundingBoxDescent,
                                    inline:true,
                                    fs:sc.fs
                                });
                            }

                            break;
                        }
                        else{
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            i++;
                        }
                    }

                }
            }
            else{
                value = value.toString();
                while(i <= value.length){
                    let str = value.substring(anchor, i);
                    let measureText =  getMeasureText(str, ctx);
                    let textWidth = measureText.width;
                    let textHeight = measureText.actualBoundingBoxAscent+measureText.actualBoundingBoxDescent;

                    let width = textWidth * Math.cos(rt*Math.PI/180) + textHeight * Math.sin(rt*Math.PI/180);//consider text box wdith and line height

                    let height = textWidth * Math.sin(rt*Math.PI/180) + textHeight * Math.cos(rt*Math.PI/180);//consider text box wdith and line height
                    let lastWord = str.substr(str.length-1,1);
                    if(lastWord==" " || checkWordByteLength(lastWord)==2){
                        if(preMeasureText!=null){
                            spaceOrTwoByte = {
                                index:i,
                                str:preStr + lastWord,
                                width:preTextWidth,
                                height:preTextHeight,
                                asc:preMeasureText.actualBoundingBoxAscent,
                                desc:preMeasureText.actualBoundingBoxDescent,
                            };
                        }

                    }
                    // textW_all += textW;
                    // console.log(str,anchor,i);
                    if(rt!=0){//rotate
                        // console.log("all",anchor, i , str);
                        if((height+space_height)>cellHeight && text_all_split[splitIndex]!=null && i!= value.length){
                            // console.log("cut",anchor, i , str);

                            if(spaceOrTwoByte!=null && spaceOrTwoByte.index<i){

                                anchor = spaceOrTwoByte.index;

                                i = spaceOrTwoByte.index + 1;

                                text_all_split[splitIndex].push({
                                    content:spaceOrTwoByte.str,
                                    style:fontset,
                                    width:spaceOrTwoByte.width,
                                    height:spaceOrTwoByte.height,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:spaceOrTwoByte.asc,
                                    desc:spaceOrTwoByte.desc,
                                    fs:fontSize,
                                });

                                // console.log(1,anchor,i,splitIndex , spaceOrTwoByte.str);

                                splitIndex +=1;

                                spaceOrTwoByte = null;



                            }
                            else{
                                anchor = i-1;

                                text_all_split[splitIndex].push({
                                    content:preStr,
                                    style:fontset,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    height:preTextHeight,
                                    width:preTextWidth,
                                    asc:measureText.actualBoundingBoxAscent,
                                    desc:measureText.actualBoundingBoxDescent,
                                    fs:fontSize,
                                });

                                // console.log(2,anchor,i, splitIndex, preStr);

                                splitIndex +=1;


                            }
                        }
                        else if(i== value.length){
                            // console.log("last",anchor, i , str);
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            text_all_split[splitIndex].push({
                                content:str,
                                style:fontset,
                                left:0,
                                top:0,
                                splitIndex:splitIndex,
                                height:textHeight,
                                width:textWidth,
                                asc:measureText.actualBoundingBoxAscent,
                                desc:measureText.actualBoundingBoxDescent,
                                fs:fontSize,
                            });
                            break;
                        }
                        else{
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            i++;
                        }
                    }
                    else{//plain
                        if((width+space_width)>cellWidth && text_all_split[splitIndex]!=null && i!= value.length){
                            // console.log(spaceOrTwoByte, i, anchor);
                            if(spaceOrTwoByte!=null && spaceOrTwoByte.index<i){

                                anchor = spaceOrTwoByte.index;

                                i = spaceOrTwoByte.index + 1;

                                text_all_split[splitIndex].push({
                                    content:spaceOrTwoByte.str,
                                    style:fontset,
                                    width:spaceOrTwoByte.width,
                                    height:spaceOrTwoByte.height,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:spaceOrTwoByte.asc,
                                    desc:spaceOrTwoByte.desc,
                                    fs:fontSize,
                                });

                                splitIndex +=1;

                                spaceOrTwoByte = null;



                            }
                            else{

                                spaceOrTwoByte = null;
                                anchor = i-1;

                                text_all_split[splitIndex].push({
                                    content:preStr,
                                    style:fontset,
                                    width:preTextWidth,
                                    height:preTextHeight,
                                    left:0,
                                    top:0,
                                    splitIndex:splitIndex,
                                    asc:measureText.actualBoundingBoxAscent,
                                    desc:measureText.actualBoundingBoxDescent,
                                    fs:fontSize,
                                });

                                // console.log(2);



                                splitIndex +=1;
                            }
                        }
                        else if(i== value.length){
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            text_all_split[splitIndex].push({
                                content:str,
                                style:fontset,
                                width:textWidth,
                                height:textHeight,
                                left:0,
                                top:0,
                                splitIndex:splitIndex,
                                asc:measureText.actualBoundingBoxAscent,
                                desc:measureText.actualBoundingBoxDescent,
                                fs:fontSize,
                            });

                            break;
                        }
                        else{
                            if(text_all_split[splitIndex]==null){
                                text_all_split[splitIndex]= [];
                            }
                            i++;
                        }
                    }

                    preStr = str;
                    preTextHeight = textHeight;
                    preTextWidth = textWidth;
                    preMeasureText = measureText;

                }

                // console.log(text_all_split)
            }

            let split_all_size = [], oneLinemaxWordCount=0;
            // console.log("split",splitIndex, text_all_split);
            let splitLen = Object.keys(text_all_split).length;
            for(let i = 0; i < splitLen; i++){
                let splitLists = text_all_split[i];
                if(splitLists==null){
                    continue;
                }
                let sWidth = 0, sHeight=0, maxDesc=0,maxAsc=0, lineHeight=0, maxWordCount=0;
                for(let s=0;s<splitLists.length;s++){
                    let sp = splitLists[s];
                    if(rt!=0){//rotate
                        sWidth += sp.width;
                        sHeight = Math.max(sHeight, sp.height-(supportBoundBox?sp.desc:0));
                    }
                    else{//plain
                        sWidth += sp.width;
                        sHeight = Math.max(sHeight, sp.height-(supportBoundBox?sp.desc:0));
                    }
                    maxDesc = Math.max(maxDesc,(supportBoundBox?sp.desc:0));
                    maxAsc = Math.max(maxAsc, sp.asc);
                    maxWordCount++;
                }

                lineHeight = sHeight/2;
                oneLinemaxWordCount = Math.max(oneLinemaxWordCount, maxWordCount);
                if(rt!=0){//rotate
                    sHeight+=lineHeight;
                    textW_all_inner =  Math.max(textW_all_inner, sWidth);
                    // textW_all =  Math.max(textW_all, sWidth+ (textH_all)/Math.tan(rt*Math.PI/180));
                    textH_all += sHeight;
                }
                else{//plain
                    // console.log("textH_all",textW_all, textH_all);
                    sHeight+=lineHeight;
                    textW_all=Math.max(textW_all, sWidth);
                    textH_all+=sHeight;
                }


                split_all_size.push({
                    width:sWidth,
                    height:sHeight,
                    desc:maxDesc,
                    asc:maxAsc,
                    lineHeight:lineHeight,
                    wordCount: maxWordCount
                });
            }
            // console.log(textH_all,textW_all,textW_all_inner);
            // let cumColumnWidth = 0;
            let cumWordHeight = 0,cumColumnWidth = 0;
            let rtPI = rt*Math.PI/180;
            let lastLine = split_all_size[splitLen-1];
            let lastLineSpaceHeight = lastLine.lineHeight;
            textH_all = textH_all - lastLineSpaceHeight + lastLine.desc;
            let rw = (textH_all)/Math.sin(rtPI) + textW_all_inner*Math.cos(rtPI);
            let rh = textW_all_inner*Math.sin(rtPI), fixOneLineLeft = 0;

            if(rt!=0){
                if(splitLen==1){
                    textW_all = textW_all_inner + 2*(textH_all/Math.tan(rtPI));
                    fixOneLineLeft = textH_all/Math.tan(rtPI);
                }
                else{
                    textW_all = textW_all_inner + textH_all/Math.tan(rtPI);
                }
                textContent.textWidthAll = rw;
                textContent.textHeightAll = rh;
            }
            else{
                textContent.textWidthAll = textW_all;
                textContent.textHeightAll = textH_all;
            }

            if(isMode=="onlyWidth"){
                // console.log("plainWrap", textContent,cell, option);
                return textContent;
            }

            if(rt!=0 && isRotateUp=="1"){
                ctx.textAlign="end";
                for(let i = 0; i < splitLen; i++){
                    let splitLists = text_all_split[i];
                    if(splitLists==null){
                        continue;
                    }
                    let size = split_all_size[i];

                    cumColumnWidth = 0;

                    for(let c=splitLists.length-1;c>=0;c--){
                        let wordGroup = splitLists[c];
                        let left, top;
                        if(rt!=0){//rotate
                            let x, y = cumWordHeight+size.asc;

                            x = (cumWordHeight)/Math.tan(rtPI) - cumColumnWidth + textW_all_inner;
                            if(horizonAlign == "0"){//center
                                let sh = textH_all/Math.sin(rtPI);
                                if(verticalAlign == "0"){//mid

                                    left = x + cellWidth/2 - (textW_all/2) + lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y + cellHeight/2 - textH_all/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top
                                    left = x + cellWidth/2 - textW_all/2;
                                    top = y - (textH_all/2 - rh/2);
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x + cellWidth/2 - (textW_all/2)+lastLineSpaceHeight*Math.cos(rtPI);
                                    top = y + cellHeight - rh/2 - textH_all/2 - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }
                            else if(horizonAlign == "1"){//left
                                if(verticalAlign == "0"){//mid
                                    left = x - rh*Math.sin(rtPI)/2 + lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y + cellHeight/2 + rh*Math.cos(rtPI)/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top
                                    left = x - rh*Math.sin(rtPI);
                                    top = y + rh*Math.cos(rtPI);
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x + lastLineSpaceHeight*Math.cos(rtPI);
                                    top = y + cellHeight - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }
                            else if(horizonAlign == "2"){//right
                                if(verticalAlign == "0"){//mid
                                    left = x + cellWidth - rw/2 - (textW_all_inner/2+(textH_all/2)/Math.tan(rtPI))+ lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y + cellHeight/2 - textH_all/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top fixOneLineLeft
                                    left = x + cellWidth - textW_all + fixOneLineLeft;
                                    top = y - textH_all;
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x + cellWidth - rw*Math.cos(rtPI) + lastLineSpaceHeight*Math.cos(rtPI);
                                    top = y + cellHeight - rw*Math.sin(rtPI) - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }

                        }

                        wordGroup.left = left;
                        wordGroup.top = top;

                        // console.log(left, top,  cumWordHeight, size.height);

                        drawLineInfo(wordGroup, cancelLine, underLine,{
                            width:wordGroup.width,
                            height:wordGroup.height,
                            left:left-wordGroup.width,
                            top:top,
                            asc:size.asc,
                            desc:size.desc,
                            fs:wordGroup.fs
                        });

                        textContent.values.push(wordGroup);

                        cumColumnWidth += wordGroup.width;
                    }


                    cumWordHeight += size.height;


                }
            }
            else{
                for(let i = 0; i < splitLen; i++){
                    let splitLists = text_all_split[i];
                    if(splitLists==null){
                        continue;
                    }
                    let size = split_all_size[i];

                    cumColumnWidth = 0;

                    for(let c=0;c<splitLists.length;c++){
                        let wordGroup = splitLists[c];
                        let left, top;
                        if(rt!=0){//rotate
                            let x, y = cumWordHeight+size.asc;

                            x = (textH_all-cumWordHeight)/Math.tan(rtPI) + cumColumnWidth;

                            if(horizonAlign == "0"){//center
                                let sh = textH_all/Math.sin(rtPI);
                                if(verticalAlign == "0"){//mid

                                    left = x + cellWidth/2 - (textW_all/2) - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y + cellHeight/2 - textH_all/2 + lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top
                                    left = x + cellWidth/2 - textW_all/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y - (textH_all/2 - rh/2)+lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x + cellWidth/2 - (textW_all/2)-lastLineSpaceHeight*Math.cos(rtPI);
                                    top = y + cellHeight - rh/2 - textH_all/2 - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }
                            else if(horizonAlign == "1"){//left
                                if(verticalAlign == "0"){//mid
                                    left = x - rh*Math.sin(rtPI)/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y - textH_all + cellHeight/2 - rh*Math.cos(rtPI)/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top
                                    left = x;
                                    top = y - textH_all;
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x - rh*Math.sin(rtPI) - lastLineSpaceHeight*Math.cos(rtPI);
                                    top = y - textH_all + cellHeight - rh*Math.cos(rtPI) - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }
                            else if(horizonAlign == "2"){//right
                                if(verticalAlign == "0"){//mid
                                    left = x + cellWidth - rw/2 - textW_all/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                    top = y + cellHeight/2 - textH_all/2 - lastLineSpaceHeight*Math.cos(rtPI)/2;
                                }
                                else if(verticalAlign == "1"){//top fixOneLineLeft
                                    left = x + cellWidth - rw*Math.cos(rtPI);
                                    top = y + rh*Math.cos(rtPI);
                                }
                                else if(verticalAlign == "2"){//bottom
                                    left = x + cellWidth - textW_all - lastLineSpaceHeight*Math.cos(rtPI) + fixOneLineLeft;
                                    top = y + cellHeight - lastLineSpaceHeight*Math.cos(rtPI);
                                }
                            }

                            drawLineInfo(wordGroup, cancelLine, underLine,{
                                width:wordGroup.width,
                                height:wordGroup.height,
                                left:left,
                                top:top,
                                asc:size.asc,
                                desc:size.desc,
                                fs:wordGroup.fs
                            });

                        }
                        else{//plain
                            left = space_width + cumColumnWidth;
                            if(horizonAlign == "0"){
                                //+ space_width*textH_all_ColumnHeight.length
                                left = cellWidth / 2 + cumColumnWidth - size.width/2;
                            }
                            else if(horizonAlign == "2"){
                                left = cellWidth + cumColumnWidth - size.width;
                            }

                            top = (cellHeight - space_height)  + cumWordHeight +size.asc-textH_all;
                            if(verticalAlign == "0"){
                                top = cellHeight / 2 + cumWordHeight - textH_all/2 + size.asc;
                            }
                            else if(verticalAlign == "1"){
                                top = space_height  + cumWordHeight+ size.asc;
                            }



                            drawLineInfo(wordGroup, cancelLine, underLine,{
                                width:wordGroup.width,
                                height:wordGroup.height,
                                left:left,
                                top:top,
                                asc:size.asc,
                                desc:size.desc,
                                fs:wordGroup.fs
                            });
                        }


                        wordGroup.left = left;
                        wordGroup.top = top;

                        textContent.values.push(wordGroup);

                        cumColumnWidth += wordGroup.width;
                    }


                    cumWordHeight += size.height;


                }
            }

            textContent.type = "plainWrap";

            if(rt!=0){
                // let leftCenter = (textW_all + textH_all/Math.tan(rt*Math.PI/180))/2;
                // let topCenter = textH_all/2;

                // if(isRotateUp=="1"){
                //     textContent.textLeftAll += leftCenter;
                //     textContent.textTopAll += topCenter;
                // }
                // else {
                //     textContent.textLeftAll += leftCenter;
                //     textContent.textTopAll -= topCenter;
                // }

                if(horizonAlign == "0"){//center
                    if(verticalAlign == "0"){//mid
                        textContent.textLeftAll = cellWidth/2;
                        textContent.textTopAll = cellHeight/2;
                    }
                    else if(verticalAlign == "1"){//top
                        textContent.textLeftAll = cellWidth/2;
                        textContent.textTopAll = rh/2;

                    }
                    else if(verticalAlign == "2"){//bottom
                        textContent.textLeftAll = cellWidth/2;
                        textContent.textTopAll = cellHeight - rh/2;
                    }
                }
                else if(horizonAlign == "1"){//left
                    if(verticalAlign == "0"){//mid
                        textContent.textLeftAll = 0;
                        textContent.textTopAll = cellHeight/2;
                    }
                    else if(verticalAlign == "1"){//top
                        textContent.textLeftAll = 0;
                        textContent.textTopAll = 0;
                    }
                    else if(verticalAlign == "2"){//bottom
                        textContent.textLeftAll = 0;
                        textContent.textTopAll = cellHeight;
                    }
                }
                else if(horizonAlign == "2"){//right
                    if(verticalAlign == "0"){//mid
                        textContent.textLeftAll = cellWidth - rw/2;
                        textContent.textTopAll = cellHeight/2;
                    }
                    else if(verticalAlign == "1"){//top
                        textContent.textLeftAll = cellWidth;
                        textContent.textTopAll = 0;
                    }
                    else if(verticalAlign == "2"){//bottom
                        textContent.textLeftAll = cellWidth;
                        textContent.textTopAll = cellHeight;
                    }
                }

            }
            // else{
            //     textContent.textWidthAll = textW_all;
            //     textContent.textHeightAll = textH_all;
            // }

        }
        else{
            let measureText = getMeasureText(value, ctx);
            let textWidth = measureText.width;
            let textHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;

            textContent.rotate = rt;

            rt = Math.abs(rt);
            let rtPI = rt*Math.PI/180;

            let textWidthAll = textWidth * Math.cos(rtPI) + textHeight * Math.sin(rtPI);//consider text box wdith and line height

            let textHeightAll = textWidth * Math.sin(rtPI) + textHeight * Math.cos(rtPI);//consider text box wdith and line height

            if(rt!=0){
                textContent.textHeightAll = textHeightAll;
            }
            else{
                textContent.textHeightAll = textHeightAll+textHeight/2-measureText.actualBoundingBoxDescent-space_height;
            }
            textContent.textWidthAll = textWidthAll;

            // console.log(textContent.textWidthAll , textContent.textHeightAll);
            if(isMode=="onlyWidth"){
                // console.log("plain", textContent,cell, option);
                return textContent;
            }

            let width = textWidthAll, height = textHeightAll;

            let left = space_width + textHeight * Math.sin(rtPI)*isRotateUp; //默认为1，左对齐
            if(horizonAlign == "0"){ //居中对齐
                left = cellWidth / 2  - (width / 2) + textHeight * Math.sin(rtPI)*isRotateUp;
            }
            else if(horizonAlign == "2"){ //右对齐
                left = (cellWidth - space_width)  - width + textHeight * Math.sin(rtPI)*isRotateUp;
            }

            let top = (cellHeight - space_height)  - height + measureText.actualBoundingBoxAscent * Math.cos(rtPI) + textWidth * Math.sin(rtPI)*isRotateUp; //默认为2，下对齐
            if(verticalAlign == "0"){ //居中对齐
                top = cellHeight / 2  - (height / 2) + measureText.actualBoundingBoxAscent* Math.cos(rtPI) + textWidth * Math.sin(rtPI)*isRotateUp;
            }
            else if(verticalAlign == "1"){ //上对齐
                top = space_height + measureText.actualBoundingBoxAscent* Math.cos(rtPI) + textWidth * Math.sin(rtPI)*isRotateUp;
            }

            textContent.type = "plain";

            let wordGroup = {
                content:value,
                style:fontset,
                width:width,
                height:height,
                left:left,
                top:top,
            }

            drawLineInfo(wordGroup, cancelLine, underLine,{
                width:textWidth,
                height:textHeight,
                left:left,
                top:top,
                asc:measureText.actualBoundingBoxAscent,
                desc:measureText.actualBoundingBoxDescent,
                fs:fontSize,
            });

            textContent.values.push(wordGroup);

            textContent.textLeftAll = left;
            textContent.textTopAll = top;

            textContent.asc = measureText.actualBoundingBoxAscent;
            textContent.desc = measureText.actualBoundingBoxDescent;

            // console.log("plain",left,top);
        }
    }

    return textContent;
}


function drawLineInfo(wordGroup, cancelLine,underLine,option){
    let left = option.left, top = option.top, width=option.width, height = option.height, asc = option.asc,desc = option.desc,fs = option.fs;

    if(wordGroup.wrap===true){
        return;
    }

    if(wordGroup.inline==true && wordGroup.style!=null){
        cancelLine = wordGroup.style.cl;
        underLine = wordGroup.style.un;
    }

    if(cancelLine!="0"){
        wordGroup.cancelLine = {};
        wordGroup.cancelLine.startX = left;
        wordGroup.cancelLine.startY = top-asc/2+1;

        wordGroup.cancelLine.endX = left + width;
        wordGroup.cancelLine.endY = top-asc/2+1;

        wordGroup.cancelLine.fs = fs;

    }

    if(underLine!="0"){
         wordGroup.underLine = [];
         if(underLine=="1" || underLine=="2"){
            let item = {};
            item.startX = left;
            item.startY = top + 3;

            item.endX = left + width;
            item.endY = top + 3;

            item.fs = fs;

            wordGroup.underLine.push(item);
         }

         if(underLine=="2"){
            let item = {};
            item.startX = left;
            item.startY = top+desc;

            item.endX = left + width;
            item.endY = top+desc;

            item.fs = fs;

            wordGroup.underLine.push(item);
         }

         if(underLine=="3" || underLine=="4"){
            let item = {};
            item.startX = left;
            item.startY = top+desc;

            item.endX = left + width;
            item.endY = top+desc;

            item.fs = fs;

            wordGroup.underLine.push(item);
         }

         if(underLine=="4"){
            let item = {};
            item.startX = left;
            item.startY = top+desc+2;

            item.endX = left + width;
            item.endY = top+desc+2;

            item.fs = fs;

            wordGroup.underLine.push(item);
         }
    }
}



export {
    computeColWidthByContent,
    rowlenByRange,
    computeRowlenByContent,
    computeRowlenArr,
    getCellTextSplitArr,
    getMeasureText,
    getCellTextInfo
}
