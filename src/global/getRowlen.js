import { luckysheetfontformat } from '../utils/util';
import menuButton from '../controllers/menuButton';
import { getcellvalue } from './getdata';
import { colLocationByIndex } from './location';
import { hasChinaword, isRealNull } from './validate';
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
                let spaceHeight = Math.ceil(oneLineTextHeight/3);
                let computeRowlen; //计算行高
                let word_space_height = oneLineTextHeight/3;
                if(cell.tb == "2"){
                    //自动换行
                    let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 4; //单元格宽度

                    if(textMetrics > cellWidth){
                        let strArr = []; //文本截断数组
                        strArr = getCellTextSplitArr(value, strArr, cellWidth, canvas);

                        computeRowlen = (oneLineTextHeight+word_space_height) * strArr.length + spaceHeight;
                    }
                    else{
                        computeRowlen = oneLineTextHeight + spaceHeight;
                    }
                }
                else if(cell.tr != null){
                    //单元格有旋转标示
                    let tr = cell.tr;
                                
                    if(tr == "0"){
                        //无旋转
                        computeRowlen = oneLineTextHeight + spaceHeight;    
                    }
                    else if(tr == "1" || tr == "2"){
                        //向下倾斜（45 旋转）----向上倾斜（-45 旋转）
                        computeRowlen = 0.707 * (textMetrics + oneLineTextHeight) + spaceHeight;
                    }
                    else if(tr == "3"){
                        //竖排文字
                        computeRowlen = value.length * oneLineTextHeight + spaceHeight;
                    }
                    else if(tr == "4" || tr == "5"){
                        //向下90（90 旋转）----向上90（-90 旋转）
                        computeRowlen = textMetrics + spaceHeight;
                    }

                    computeRowlen = Math.round(computeRowlen);
                }
                else{
                    computeRowlen = oneLineTextHeight + spaceHeight;
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
function getMeasureText(value, ctx, fontset){
    let mtc = Store.measureTextCache[value + "_" + ctx.font];

    if(mtc != null){
        return mtc;
    }
    else{
        let measureText = ctx.measureText(value), cache = {};
        if(measureText.actualBoundingBoxRight==null){
            cache.width = measureText.width;
        }
        else{
            //measureText.actualBoundingBoxLeft + 
            cache.width = measureText.actualBoundingBoxRight;
        }
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
    // let cell = Store.flowdata[r][c];
    let cellWidth = option.cellWidth;
    let cellHeight = option.cellHeight;
    let space_width = option.space_width, space_height = option.space_height; //宽高方向 间隙

    //水平对齐
    let horizonAlign = menuButton.checkstatusByCell(cell, "ht");
    //垂直对齐
    let verticalAlign = menuButton.checkstatusByCell(cell, "vt");

    let tb = menuButton.checkstatusByCell(cell ,"tb");//wrap overflow
    let tr = menuButton.checkstatusByCell(cell ,"tr");//rotate
    let rt = menuButton.checkstatusByCell(cell ,"rt");//rotate angle

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

    rt = parseInt(rt);
    if(rt>90){
        rt = 90 -rt;
        isRotateUp = 0;
        isRotateDown = 1;
    }

    let textContent = {};
    textContent.values = [];

    if(cell.ct!=null && cell.ct.t=="inlineStr" && cell.ct.sharedStrings!=null && cell.ct.sharedStrings.length>0){
        let strArr = [],lineMaxHeight=[];
        let sharedStrings = cell.ct.sharedStrings;
        for(let i=0;i<cell.ct.sharedStrings.length;i++){
            
        }

    }
    else{
        
        let fontset = luckysheetfontformat(cell);
        ctx.font = fontset;

        let value = cell.m;
        if(value == null){
            value = cell.v;
        }

        if(isRealNull(value)){
            return null;
        }

        // let measureText = getMeasureText(value, ctx); 
        // //luckysheetTableContent.measureText(value);
        // let textWidth = measureText.width;
        // let textHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;

        if(tr=="3"){//vertical text
            ctx.textBaseline = 'top';
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

            let textW_all = 0; //拆分后宽高度合计
            let textH_all = 0; 

            let oneWordWidth =  getMeasureText(vArr[0], ctx).width;
            let colIndex=0, textH_all_cache=0, textH_all_Column = {}, textH_all_ColumnHeight=[];

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
                });
                
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

                    textContent.values.push(word);
                }

                cumColumnWidth+=columnWidth;

            }

            textContent.type = "verticalWrap";
            textContent.textWidthAll = textW_all;
            textContent.textHeightAll = textH_all;
        }
        else{
            let supportBoundBox = isSupportBoundingBox(ctx);
            if(tb=="2"){//wrap
                value = value.toString();

                let textW_all = 0; //拆分后宽高度合计
                let textH_all = 0; 

                // let oneWordWidth =  getMeasureText(vArr[0], ctx).width;
                let splitIndex=0, text_all_cache=0, text_all_split = {}, text_all_splitLen=[];

                if(supportBoundBox){
                    ctx.textBaseline = 'alphabetic';
                }
                else{
                    ctx.textBaseline = 'bottom';
                }

                textContent.rotate = rt;
                rt = Math.abs(rt);

                let anchor = 0, preHeight = 0, preWidth=0, preStr;
                for(let i = 1; i <= value.length; i++){
                    let str = value.substring(anchor, i);
                    let measureText =  getMeasureText(str, ctx);
                    let textWidth = measureText.width;
                    let textHeight = measureText.actualBoundingBoxAscent+measureText.actualBoundingBoxDescent;

                    let width = textWidth * Math.cos(rt*Math.PI/180) + textHeight * Math.sin(rt*Math.PI/180);//consider text box wdith and line height

                    let height = textWidth * Math.sin(rt*Math.PI/180) + textHeight * Math.cos(rt*Math.PI/180);//consider text box wdith and line height
                    
                    // textW_all += textW;

                    if(text_all_split[splitIndex]==null){
                        text_all_split[splitIndex]= [];
                    }

                    if(rt!=0){//rotate
                        if(height>cellHeight){
                            anchor = i-1;
    
                            text_all_split[splitIndex].push({
                                content:preStr,
                                style:fontset,
                                width:preWidth,
                                height:preHeight,
                                left:0,
                                top:0,
                                splitIndex:splitIndex,
                            });

                            splitIndex +=1;
                        }
                        else if(i== value.length){
        
                            text_all_split[splitIndex].push({
                                content:str,
                                style:fontset,
                                width:width,
                                height:height,
                                left:0,
                                top:0,
                                colIndex:splitIndex,
                            });
                        }
                    }
                    else{//plain
                        if(width>cellWidth){

                            anchor = i-1;
                
                            text_all_split[splitIndex].push({
                                content:preStr,
                                style:fontset,
                                width:preWidth,
                                height:preHeight,
                                left:0,
                                top:0,
                                splitIndex:splitIndex,
                            });

                            splitIndex +=1;
                        }
                        else if(i== value.length){
        
                            text_all_split[splitIndex].push({
                                content:str,
                                style:fontset,
                                width:width,
                                height:height,
                                left:0,
                                top:0,
                                colIndex:splitIndex,
                            });
                        }
                    }

                    preWidth = width;
                    preHeight = height;
                    preStr = str;

                }

                let split_all_size = [];
                for(let i = 0; i <= splitIndex; i++){
                    let splitLists = text_all_split[i];
                    let sWidth = 0, sHeight=0;
                    for(let s=0;s<splitLists.length;s++){
                        let sp = splitLists[i];
                        if(rt!=0){//rotate
                            sWidth += sp.width;
                            sHeight += sp.height;
                        }
                        else{//plain
                            sWidth += sp.width;
                            sHeight = Math.max(sHeight, sp.height);
                        }
                    }

                    split_all_size.push({
                        width:sWidth,
                        height:sHeight
                    });
                }
                
                let cumColumnWidth = 0;
                for(let i = 0; i < text_all_split.length; i++){
                    let splitTexts = text_all_split[i];

                    let cumWordHeight = 0;
                    for(let c=0;c<splitTexts.length;c++){
                        let wordGroup = splitTexts[c];
                        

                        
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

                        textContent.values.push(word);
                    }

                    cumColumnWidth+=columnWidth;

                }

                textContent.type = "plainWrap";
                textContent.textWidthAll = textW_all;
                textContent.textHeightAll = textH_all;
            }
            else{
                ctx.textBaseline = 'top';
                let measureText = getMeasureText(value, ctx); 
                let textWidth = measureText.width;
                let textHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;

                // let centerFix = 0;
                // if(supportBoundBox){
                //     centerFix = measureText.actualBoundingBoxDescent/2;
                // }
                textContent.rotate = rt;

                rt = Math.abs(rt);

                textContent.textWidthAll = textWidth * Math.cos(rt*Math.PI/180) + textHeight * Math.sin(rt*Math.PI/180);//consider text box wdith and line height

                textContent.textHeightAll = textWidth * Math.sin(rt*Math.PI/180) + textHeight * Math.cos(rt*Math.PI/180);//consider text box wdith and line height

                let width = textContent.textWidthAll, height = textContent.textHeightAll;

                let left = space_width + textHeight * Math.sin(rt*Math.PI/180)*isRotateDown; //默认为1，左对齐
                if(horizonAlign == "0"){ //居中对齐
                    left = cellWidth / 2  - (width / 2) + textHeight * Math.sin(rt*Math.PI/180)*isRotateDown;
                }
                else if(horizonAlign == "2"){ //右对齐
                    left = (cellWidth - space_width)  - width + textHeight * Math.sin(rt*Math.PI/180)*isRotateDown;
                }
                
                let top = (cellHeight - space_height)  - height + textWidth * Math.sin(rt*Math.PI/180)*isRotateUp; //默认为2，下对齐
                if(verticalAlign == "0"){ //居中对齐 
                    top = cellHeight / 2  - (height / 2) + textWidth * Math.sin(rt*Math.PI/180)*isRotateUp;
                }
                else if(verticalAlign == "1"){ //上对齐
                    top = space_height + textWidth * Math.sin(rt*Math.PI/180)*isRotateUp;
                }

                textContent.type = "plain";
                textContent.values.push({
                    content:value,
                    style:fontset,
                    width:width,
                    height:height,
                    left:left,
                    top:top,
                });

                textContent.textLeftAll = left;
                textContent.textTopAll = top;
            }
        }



    }

    return textContent;
}

export {
    rowlenByRange,
    computeRowlenArr,
    getCellTextSplitArr,
    getMeasureText,
    getCellTextInfo
}