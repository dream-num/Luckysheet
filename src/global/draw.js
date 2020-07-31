import pivotTable from '../controllers/pivotTable';
import conditionformat from '../controllers/conditionformat';
import alternateformat from '../controllers/alternateformat';
import luckysheetSparkline from '../controllers/sparkline';
import menuButton from '../controllers/menuButton';
import { luckysheetdefaultstyle, luckysheet_CFiconsImg,luckysheetdefaultFont } from '../controllers/constant';
import { luckysheet_searcharray } from '../controllers/sheetSearch';
import { dynamicArrayCompute } from './dynamicArray';
import browser from './browser';
import { isRealNull } from './validate';
import { getCellTextSplitArr } from './getRowlen';
import { getcellvalue } from './getdata';
import { getBorderInfoCompute } from './border';
import { getSheetIndex } from '../methods/get';
import { getObjType, chatatABC, luckysheetfontformat } from '../utils/util';
import Store from '../store';

function luckysheetDrawgrid(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop) {
    if($("#luckysheetTableContent").length == 0){
        return;
    }

    // if(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["isPivotTable"]){
    //     luckysheetDrawMain_back(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop);  
    // }
    // else{
    luckysheetDrawMain(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop);
    // }
    
    $("#luckysheetTableContent").get(0).getContext("2d").clearRect(0, 0, 46, 20);
    
    luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, offsetLeft);
    luckysheetDrawgridRowTitle(scrollHeight, drawHeight, offsetTop);
}

function luckysheetDrawgridRowTitle(scrollHeight, drawHeight, offsetTop) {
    if (scrollHeight == null) {
        scrollHeight = $("#luckysheet-cell-main").scrollTop();
    }

    if (drawHeight == null) {
        drawHeight = Store.luckysheetTableContentHW[1];
    }

    if (offsetTop == null) {
        offsetTop = Store.columeHeaderHeight;
    }
    
    let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
    luckysheetTableContent.clearRect(
        0,
        offsetTop * Store.devicePixelRatio,
        (Store.rowHeaderWidth - 1) * Store.devicePixelRatio,
        drawHeight * Store.devicePixelRatio
    );

    luckysheetTableContent.font = luckysheetdefaultFont();
    luckysheetTableContent.textBaseline = luckysheetdefaultstyle.textBaseline; //基准线 垂直居中
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    let dataset_row_st, dataset_row_ed;
    dataset_row_st = luckysheet_searcharray(Store.visibledatarow, scrollHeight);
    dataset_row_ed = luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);

    if (dataset_row_st == -1) {
        dataset_row_st = 0;
    }
    if (dataset_row_ed == -1) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }

    let end_r, start_r;

    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        end_r = Store.visibledatarow[r] - scrollHeight;

        //若超出绘制区域终止
        if(end_r > scrollHeight + drawHeight){
            break;
        }

        if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {

        }
        else {
            //行标题栏序列号
            let textMetrics = luckysheetTableContent.measureText(r + 1);

            let horizonAlignPos = (Store.rowHeaderWidth * Store.devicePixelRatio - textMetrics.width) / 2;
            let verticalAlignPos = (start_r + (end_r - start_r) / 2 + offsetTop) * Store.devicePixelRatio;

            luckysheetTableContent.fillText(r + 1, horizonAlignPos, verticalAlignPos);
        }

        //行标题栏横线
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(
            -1,
            (end_r + offsetTop - 2 + 0.5) * Store.devicePixelRatio
        );
        luckysheetTableContent.lineTo(
            (Store.rowHeaderWidth - 1) * Store.devicePixelRatio,
            (end_r + offsetTop - 2 + 0.5) * Store.devicePixelRatio
        );
        luckysheetTableContent.lineWidth = Store.devicePixelRatio;
        luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.closePath();
        luckysheetTableContent.stroke();
    }

    //行标题栏竖线
    luckysheetTableContent.beginPath();
    luckysheetTableContent.moveTo(
        (Store.rowHeaderWidth - 2 + 0.5) * Store.devicePixelRatio,
        (offsetTop - 1) * Store.devicePixelRatio
    );
    luckysheetTableContent.lineTo(
        (Store.rowHeaderWidth - 2 + 0.5) * Store.devicePixelRatio,
        (Store.rh_height + offsetTop) * Store.devicePixelRatio
    );
    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
    luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    luckysheetTableContent.closePath();
    luckysheetTableContent.stroke();


    //清除canvas左上角区域 防止列标题栏序列号溢出显示
    luckysheetTableContent.clearRect(0, 0, Store.rowHeaderWidth * Store.devicePixelRatio, Store.columeHeaderHeight * Store.devicePixelRatio);
}

function luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, offsetLeft) {
    if (scrollWidth == null) {
        scrollWidth = $("#luckysheet-cell-main").scrollLeft();
    }

    if (drawWidth == null) {
        drawWidth = Store.luckysheetTableContentHW[0];
    }

    if (offsetLeft == null) {
        offsetLeft = Store.rowHeaderWidth;
    }
    
    let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
    luckysheetTableContent.clearRect(
        offsetLeft * Store.devicePixelRatio,
        -0.5,
        drawWidth * Store.devicePixelRatio,
        (Store.columeHeaderHeight - 1.5) * Store.devicePixelRatio
    );


    luckysheetTableContent.font = luckysheetdefaultFont();
    luckysheetTableContent.textBaseline = luckysheetdefaultstyle.textBaseline; //基准线 垂直居中
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    let dataset_col_st, dataset_col_ed;
    dataset_col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
    dataset_col_ed = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);

    if (dataset_col_st == -1) {
        dataset_col_st = 0;
    }
    if (dataset_col_ed == -1) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }

    let end_c, start_c;

    for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
        if (c == 0) {
            start_c = -scrollWidth;
        }
        else {
            start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
        }
        end_c = Store.visibledatacolumn[c] - scrollWidth;

        //若超出绘制区域终止
        if(end_c > scrollWidth + drawWidth){
            break;
        }

        //列标题栏序列号
        let abc = chatatABC(c);
        let textMetrics = luckysheetTableContent.measureText(abc);

        let horizonAlignPos = Math.round((start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - textMetrics.width / 2);
        let verticalAlignPos = Math.round(Store.columeHeaderHeight / 2 * Store.devicePixelRatio);
        
        luckysheetTableContent.fillText(abc, horizonAlignPos, verticalAlignPos);

        //列标题栏竖线
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(
            (end_c + offsetLeft - 2 + 0.5) * Store.devicePixelRatio,
            0.5
        );
        luckysheetTableContent.lineTo(
            (end_c + offsetLeft - 2 + 0.5) * Store.devicePixelRatio,
            (Store.columeHeaderHeight - 2) * Store.devicePixelRatio
        );
        luckysheetTableContent.lineWidth = Store.devicePixelRatio;
        luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.closePath();
        luckysheetTableContent.stroke();
    }

    //列标题栏横线
    luckysheetTableContent.beginPath();
    luckysheetTableContent.moveTo(
        (offsetLeft - 1) * Store.devicePixelRatio,
        (Store.columeHeaderHeight - 2 + 0.5) * Store.devicePixelRatio
    );
    luckysheetTableContent.lineTo(
        (Store.ch_width + offsetLeft - 2) * Store.devicePixelRatio,
        (Store.columeHeaderHeight - 2 + 0.5) * Store.devicePixelRatio
    );
    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
    luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    luckysheetTableContent.closePath();
    luckysheetTableContent.stroke();

    //清除canvas左上角区域 防止列标题栏序列号溢出显示
    luckysheetTableContent.clearRect(0, 0, Store.rowHeaderWidth * Store.devicePixelRatio, Store.columeHeaderHeight * Store.devicePixelRatio);
}

function luckysheetDrawMain(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop, columnOffsetCell, rowOffsetCell, mycanvas) {
    if(Store.flowdata == null){
        return;
    }
    
    //参数未定义处理
    if (scrollWidth == null) {
        scrollWidth = $("#luckysheet-cell-main").scrollLeft();
    }
    if (scrollHeight == null) {
        scrollHeight = $("#luckysheet-cell-main").scrollTop();
    }

    if (drawWidth == null) {
        drawWidth = Store.luckysheetTableContentHW[0];
    }
    if (drawHeight == null) {
        drawHeight = Store.luckysheetTableContentHW[1];
    }

    if (offsetLeft == null) {
        offsetLeft = Store.rowHeaderWidth;
    }
    if (offsetTop == null) {
        offsetTop = Store.columeHeaderHeight;
    }

    if (columnOffsetCell == null) {
        columnOffsetCell = 0;
    }
    if (rowOffsetCell == null) {
        rowOffsetCell = 0;
    }

    //表格canvas
    let luckysheetTableContent = null;
    if(mycanvas == null){
        luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
    }
    else {
        if(getObjType(mycanvas) == "object"){
            try{
                luckysheetTableContent = mycanvas.get(0).getContext("2d");
            }
            catch(err){
                luckysheetTableContent = mycanvas;
            }
        }
        else{
            luckysheetTableContent = $("#" + mycanvas).get(0).getContext("2d");
        }
    }
    
    luckysheetTableContent.clearRect(
        0, 
        0, 
        Store.luckysheetTableContentHW[0] * Store.devicePixelRatio,
        Store.luckysheetTableContentHW[1] * Store.devicePixelRatio
    );

    //表格渲染区域 起止行列下标
    let dataset_row_st, 
        dataset_row_ed, 
        dataset_col_st, 
        dataset_col_ed;

    dataset_row_st = luckysheet_searcharray(Store.visibledatarow, scrollHeight);
    dataset_row_ed = luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);

    if (dataset_row_st == -1) {
        dataset_row_st = 0;
    }

    dataset_row_st += rowOffsetCell;

    if (dataset_row_ed == -1) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }

    dataset_row_ed += rowOffsetCell;

    if (dataset_row_ed >= Store.visibledatarow.length) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }

    dataset_col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
    dataset_col_ed = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);
    
    if (dataset_col_st == -1) {
        dataset_col_st = 0;
    }

    dataset_col_st += columnOffsetCell;

    if (dataset_col_ed == -1) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }

    dataset_col_ed += columnOffsetCell;

    if (dataset_col_ed >= Store.visibledatacolumn.length) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }

    //表格渲染区域 起止行列坐标
    let fill_row_st, 
        fill_row_ed, 
        fill_col_st, 
        fill_col_ed;

    if(dataset_row_st == 0){
        fill_row_st = 0;
    }
    else{
        fill_row_st = Store.visibledatarow[dataset_row_st - 1];
    }

    fill_row_ed = Store.visibledatarow[dataset_row_ed];

    if(dataset_col_st == 0){
        fill_col_st = 0;
    }
    else{
        fill_col_st = Store.visibledatacolumn[dataset_col_st - 1];
    }

    fill_col_ed = Store.visibledatacolumn[dataset_col_ed];

    //表格canvas 初始化处理
    luckysheetTableContent.fillStyle = "#ffffff";
    luckysheetTableContent.fillRect(
        (offsetLeft - 1) * Store.devicePixelRatio, 
        (offsetTop - 1) * Store.devicePixelRatio, 
        (fill_col_ed - scrollWidth) * Store.devicePixelRatio, 
        (fill_row_ed - scrollHeight) * Store.devicePixelRatio
    );
    luckysheetTableContent.font = luckysheetdefaultFont();
    luckysheetTableContent.textBaseline = "top";
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    //表格渲染区域 非空单元格行列 起止坐标
    let cellupdate = [];
    let mergeCache = {};
    let borderOffset = {};

    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        let end_r = Store.visibledatarow[r] - scrollHeight;
        
        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            let start_c;
            if (c == 0) {
                start_c = -scrollWidth;
            }
            else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }

            let end_c = Store.visibledatacolumn[c] - scrollWidth;
            
            if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {

            }
            else {
                let firstcolumlen = Store.defaultcollen;
                if (Store.config["columlen"] != null && Store.config["columlen"][c] != null) {
                    firstcolumlen = Store.config["columlen"][c];
                }

                if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
                    let value = Store.flowdata[r][c];

                    if(getObjType(value) == "object" && ("mc" in value)){
                        borderOffset[r + "_" + c] = { 
                            "start_r": start_r,
                            "start_c": start_c, 
                            "end_r": end_r, 
                            "end_c": end_c 
                        };

                        if("rs" in value["mc"]){
                            let key = "r"+ r + "c" + c;
                            mergeCache[key] = cellupdate.length;
                        }
                        else{
                            let key = "r"+ value["mc"].r + "c" + value["mc"].c;
                            let margeMain = cellupdate[mergeCache[key]];

                            if(margeMain == null){
                                mergeCache[key] = cellupdate.length;
                                cellupdate.push({
                                    "r": r, 
                                    "c": c, 
                                    "start_c": start_c, 
                                    "start_r": start_r, 
                                    "end_r": end_r, 
                                    "end_c": end_c, 
                                    "firstcolumlen": firstcolumlen, 
                                });
                            }
                            else{
                                if(margeMain.c == c){
                                    margeMain.end_r += (end_r - start_r - 1);
                                }
                                
                                if(margeMain.r == r){
                                    margeMain.end_c += (end_c - start_c);
                                    margeMain.firstcolumlen += firstcolumlen;
                                }
                            }

                            continue;
                        }
                    }
                }

                cellupdate.push({
                    "r": r, 
                    "c": c, 
                    "start_r": start_r, 
                    "start_c": start_c, 
                    "end_r": end_r, 
                    "end_c": end_c, 
                    "firstcolumlen": firstcolumlen, 
                });
                borderOffset[r + "_" + c] = { 
                    "start_r": start_r, 
                    "start_c": start_c, 
                    "end_r": end_r, 
                    "end_c": end_c 
                };
            }
        }
    }

    //动态数组公式计算
    let dynamicArray_compute = dynamicArrayCompute(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray"]);

    //交替颜色计算
    let af_compute = alternateformat.getComputeMap();

    //条件格式计算
    let cf_compute = conditionformat.getComputeMap();

    //表格渲染区域 溢出单元格配置保存
    let cellOverflowMap = getCellOverflowMap(luckysheetTableContent, dataset_col_st, dataset_col_ed);

    //sparklines渲染
    let sparklinesRender = function(r, c, offsetX, offsetY, canvasid, ctx){
        if(Store.flowdata[r] == null || Store.flowdata[r][c] == null){
            return;
        }

        let sparklines = Store.flowdata[r][c].spl;
        if(sparklines != null){
            if(typeof sparklines == "string"){
                sparklines = eval('('+ sparklines +')');
            }

            if(getObjType(sparklines) == "object"){
                let temp1 = sparklines;
                let x = temp1.offsetX;
                let y = temp1.offsetY;
                x = x == null ? 0 : x;
                y = y == null ? 0 : y;
                luckysheetSparkline.render(
                    temp1.shapeseq, 
                    temp1.shapes, 
                    offsetX + x, 
                    offsetY + y, 
                    temp1.pixelWidth*Store.devicePixelRatio, 
                    temp1.pixelHeight*Store.devicePixelRatio, 
                    canvasid, 
                    ctx
                );
            }
            else if(getObjType(sparklines) == "array" && getObjType(sparklines[0]) == "object"){
                for(let i = 0; i < sparklines.length; i++){
                    let temp1 = sparklines[i];
                    let x = temp1.offsetX;
                    let y = temp1.offsetY;
                    x = x == null ? 0 : x;
                    y = y == null ? 0 : y;
                    luckysheetSparkline.render(
                        temp1.shapeseq, 
                        temp1.shapes, 
                        offsetX + x, 
                        offsetY + y, 
                        temp1.pixelWidth, 
                        temp1.pixelHeight, 
                        canvasid, 
                        ctx
                    );
                }
            }
        }
    }

    //空白单元格渲染 
    let nullCellRender = function(r, c, start_r, start_c, end_r, end_c){
        let checksAF = alternateformat.checksAF(r, c, af_compute); //交替颜色
        let checksCF = conditionformat.checksCF(r, c, cf_compute); //条件格式

        let borderfix = menuButton.borderfix(Store.flowdata, r, c);

        //背景色
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "bg");

        if(checksAF != null && checksAF[1] != null){//交替颜色 
            luckysheetTableContent.fillStyle = checksAF[1];
        }

        if(checksCF != null && checksCF["cellColor"] != null){//条件格式 
            luckysheetTableContent.fillStyle = checksCF["cellColor"];
        }

        if(Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null){//标题色
            luckysheetTableContent.fillStyle = Store.flowdata[r][c].tc;
        }

        let cellsize = [
            Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
            Store.devicePixelRatio * (start_r + offsetTop + 1 + borderfix[1]), 
            Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
            Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
        ];
        luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

        if((r + "_" + c) in dynamicArray_compute){
            let value = dynamicArray_compute[r + "_" + c].v;

            luckysheetTableContent.fillStyle = "#000000";
            //文本宽度和高度
            let fontset = luckysheetdefaultFont();
            luckysheetTableContent.font = fontset;

            let textMetrics = luckysheetTableContent.measureText(value).width;
            let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

            //水平对齐 (默认为1，左对齐)
            let horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;

            //垂直对齐 (默认为2，下对齐)
            let verticalFixed = browser.luckysheetrefreshfixed();
            let verticalAlignPos = (end_r + offsetTop - 2) * Store.devicePixelRatio; 
            luckysheetTableContent.textBaseline = 'bottom';
            
            luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos);
        }

        //若单元格有批注
        if(Store.flowdata[r][c] != null && Store.flowdata[r][c].ps != null){
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(Store.devicePixelRatio * (end_c + offsetLeft - 6), Store.devicePixelRatio * (start_r + offsetTop));
            luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop));
            luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop + 5));
            luckysheetTableContent.fillStyle = "#FC6666";
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }

        //此单元格 与  溢出单元格关系
        let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);

        //此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
        if(cellOverflow_colInObj.colLast){
            cellOverflowRender(
                cellOverflow_colInObj.rowIndex,
                cellOverflow_colInObj.colIndex,
                cellOverflow_colInObj.stc,
                cellOverflow_colInObj.edc
            );
        }

        //即溢出单元格跨此单元格，此单元格不绘制右边框
        if(!cellOverflow_colInObj.colIn || cellOverflow_colInObj.colLast){
            //右边框
            if(!Store.luckysheetcurrentisPivotTable){
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(
                    Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                    Store.devicePixelRatio * (start_r + offsetTop - 2)
                );
                luckysheetTableContent.lineTo(
                    Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                    Store.devicePixelRatio * (end_r + offsetTop - 2)
                );
                luckysheetTableContent.lineWidth = Store.devicePixelRatio;

                luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            }
        }

        //下边框
        if(!Store.luckysheetcurrentisPivotTable){
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(
                Store.devicePixelRatio * (start_c + offsetLeft - 2), 
                Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
            );
            luckysheetTableContent.lineTo(
                Store.devicePixelRatio * (end_c + offsetLeft - 2), 
                Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
            );
            luckysheetTableContent.lineWidth = Store.devicePixelRatio;

            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;        
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }

    //非空白单元格渲染
    let cellRender = function(r, c, start_r, start_c, end_r, end_c, value, canvasType){
        let cell = Store.flowdata[r][c];
        let cellWidth = end_c - start_c - 2;
        let cellHeight = end_r - start_r - 2;
        let space_width = 2, space_height = 2; //宽高方向 间隙

        let fontset = luckysheetfontformat(cell);
        luckysheetTableContent.font = fontset;
        luckysheetTableContent.textBaseline = 'top';

        //文本计算 宽度和高度
        // let cellValueSize = getCellValueSize(cell, value, luckysheetTableContent, cellWidth, cellHeight, space_width, space_height);

        //水平对齐
        let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c, "ht");
        //垂直对齐
        let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c, "vt");

        //文本单行 宽度和高度
        let measureText = luckysheetTableContent.measureText(value);
        let textMetrics = measureText.width;
        let oneLineTextHeight = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;
        //交替颜色
        let checksAF = alternateformat.checksAF(r, c, af_compute); 
        //条件格式
        let checksCF = conditionformat.checksCF(r, c, cf_compute); 

        //单元格 背景颜色
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "bg");
        if(checksAF != null && checksAF[1] != null){ //若单元格有交替颜色 背景颜色
            luckysheetTableContent.fillStyle = checksAF[1];
        }
        if(checksCF != null && checksCF["cellColor"] != null){ //若单元格有条件格式 背景颜色
            luckysheetTableContent.fillStyle = checksCF["cellColor"];
        }
        luckysheetTableContent.fillRect(
            (start_c + offsetLeft - 1) * Store.devicePixelRatio, 
            (start_r + offsetTop) * Store.devicePixelRatio, 
            (end_c - start_c + 2) * Store.devicePixelRatio,
            (end_r - start_r) * Store.devicePixelRatio
        )
        //若单元格有批注（单元格右上角红色小三角标示）
        if(cell.ps != null){
            let ps_w = 5, ps_h = 5; //红色小三角宽高

            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(
                Store.devicePixelRatio * (end_c + offsetLeft - ps_w), 
                start_r + offsetTop
            );
            luckysheetTableContent.lineTo(
                Store.devicePixelRatio * end_c + offsetLeft, 
                start_r + offsetTop
            );
            luckysheetTableContent.lineTo(
                Store.devicePixelRatio * end_c + offsetLeft, 
                Store.devicePixelRatio * (start_r + offsetTop + ps_h)
            );
            luckysheetTableContent.fillStyle = "#FC6666";
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }

        //溢出单元格
        let cellOverflow_bd_r_render = true; //溢出单元格右边框是否需要绘制
        let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);

        if(cell.tb == '1' && cellOverflow_colInObj.colIn){
            //此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
            if(cellOverflow_colInObj.colLast){
                cellOverflowRender(
                    cellOverflow_colInObj.rowIndex,
                    cellOverflow_colInObj.colIndex,
                    cellOverflow_colInObj.stc,
                    cellOverflow_colInObj.edc
                );
            }
            else{
                cellOverflow_bd_r_render = false;
            }
        }
        //非溢出单元格
        else{
            //若单元格有条件格式数据条
            if(checksCF != null && checksCF["dataBar"] != null){
                let x = Store.devicePixelRatio * (start_c + offsetLeft + space_width);
                let y = Store.devicePixelRatio * (start_r + offsetTop + space_height);
                let w = Store.devicePixelRatio * (cellWidth - space_width * 2);
                let h = Store.devicePixelRatio * (cellHeight - space_height * 2);

                let valueType = checksCF["dataBar"]["valueType"];
                let valueLen = checksCF["dataBar"]["valueLen"];
                let format = checksCF["dataBar"]["format"];

                if(valueType == 'minus'){
                    //负数
                    let minusLen = checksCF["dataBar"]["minusLen"];
                    
                    if(format.length > 1){
                        //渐变
                        let my_gradient = luckysheetTableContent.createLinearGradient(
                            x + w * minusLen * (1 - valueLen), 
                            y, 
                            x + w * minusLen, 
                            y
                        );
                        my_gradient.addColorStop(0, "#ffffff");
                        my_gradient.addColorStop(1, "#ff0000");

                        luckysheetTableContent.fillStyle = my_gradient;
                    }
                    else{
                        //单色
                        luckysheetTableContent.fillStyle = "#ff0000";
                    }
                    
                    luckysheetTableContent.fillRect(
                        x + w * minusLen * (1 - valueLen), 
                        y, 
                        w * minusLen * valueLen, 
                        h
                    );

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        x + w * minusLen * (1 - valueLen), 
                        y
                    );
                    luckysheetTableContent.lineTo(
                        x + w * minusLen * (1 - valueLen), 
                        y + h
                    );
                    luckysheetTableContent.lineTo(
                        x + w * minusLen, 
                        y + h
                    );
                    luckysheetTableContent.lineTo(
                        x + w * minusLen, 
                        y
                    );
                    luckysheetTableContent.lineTo(
                        x + w * minusLen * (1 - valueLen), 
                        y
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#ff0000";
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                }
                else if(valueType == 'plus'){
                    //正数
                    let plusLen = checksCF["dataBar"]["plusLen"];

                    if(plusLen == 1){
                        if(format.length > 1){
                            //渐变
                            let my_gradient = luckysheetTableContent.createLinearGradient(
                                x, 
                                y, 
                                x + w * valueLen, 
                                y
                            );
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
        
                            luckysheetTableContent.fillStyle = my_gradient;
                        }
                        else{
                            //单色
                            luckysheetTableContent.fillStyle = format[0];
                        }
                        
                        luckysheetTableContent.fillRect(
                            x, 
                            y, 
                            w * valueLen, 
                            h
                        );

                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(
                            x, 
                            y
                        );
                        luckysheetTableContent.lineTo(
                            x, 
                            y + h
                        );
                        luckysheetTableContent.lineTo(
                            x + w * valueLen, 
                            y + h
                        );
                        luckysheetTableContent.lineTo(
                            x + w * valueLen, 
                            y
                        );
                        luckysheetTableContent.lineTo(
                            x, 
                            y
                        );
                        luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                        luckysheetTableContent.strokeStyle = format[0];
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.closePath();
                    }
                    else{
                        let minusLen = checksCF["dataBar"]["minusLen"];

                        if(format.length > 1){
                            //渐变
                            let my_gradient = luckysheetTableContent.createLinearGradient(
                                x + w * minusLen, 
                                y, 
                                x + w * minusLen + w * plusLen * valueLen, 
                                y
                            );
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
        
                            luckysheetTableContent.fillStyle = my_gradient;
                        }
                        else{
                            //单色
                            luckysheetTableContent.fillStyle = format[0];
                        }
                        
                        luckysheetTableContent.fillRect(
                            x + w * minusLen, 
                            y, 
                            w * plusLen * valueLen, 
                            h
                        );

                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(
                            x + w * minusLen, 
                            y
                        );
                        luckysheetTableContent.lineTo(
                            x + w * minusLen, 
                            y + h
                        );
                        luckysheetTableContent.lineTo(
                            x + w * minusLen + w * plusLen * valueLen, 
                            y + h
                        );
                        luckysheetTableContent.lineTo(
                            x + w * minusLen + w * plusLen * valueLen, 
                            y
                        );
                        luckysheetTableContent.lineTo(
                            x + w * minusLen, 
                            y
                        );
                        luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                        luckysheetTableContent.strokeStyle = format[0];
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.closePath();
                    }
                }
            }

            let pos_x = start_c + offsetLeft;
            let pos_y = start_r + offsetTop + 1;

            luckysheetTableContent.save();
            luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
            luckysheetTableContent.clip();

            let horizonAlignPos = (pos_x + space_width) * Store.devicePixelRatio; //默认为1，左对齐
            if(horizonAlign == "0"){ //居中对齐
                horizonAlignPos = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textMetrics / 2);
            }
            else if(horizonAlign == "2"){ //右对齐
                horizonAlignPos = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textMetrics;
            }
            
            let verticalAlignPos = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - oneLineTextHeight; //默认为2，下对齐
            let verticalAlignPos_text = (pos_y + cellHeight - space_height) * Store.devicePixelRatio; //文本垂直方向基准线
            luckysheetTableContent.textBaseline = "bottom";
            if(verticalAlign == "0"){ //居中对齐 
                verticalAlignPos = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (oneLineTextHeight / 2);
                
                verticalAlignPos_text = (pos_y + cellHeight / 2) * Store.devicePixelRatio;
                luckysheetTableContent.textBaseline = "middle";
            }
            else if(verticalAlign == "1"){ //上对齐
                verticalAlignPos = (pos_y + space_height) * Store.devicePixelRatio;
                
                verticalAlignPos_text = (pos_y + space_height) * Store.devicePixelRatio;
                luckysheetTableContent.textBaseline = "top";
            }
        
            //若单元格有条件格式图标集
            if(checksCF != null && checksCF["icons"] != null){
                let l = checksCF["icons"]["left"];
                let t = checksCF["icons"]["top"];

                luckysheetTableContent.drawImage(
                    luckysheet_CFiconsImg, 
                    l * 42, 
                    t * 32, 
                    32, 
                    32, 
                    pos_x * Store.devicePixelRatio, 
                    verticalAlignPos,  
                    oneLineTextHeight, 
                    oneLineTextHeight
                );
                
                if(horizonAlign != "0" && horizonAlign != "2"){ //左对齐时 文本渲染空出一个图标的距离
                    horizonAlignPos = horizonAlignPos + oneLineTextHeight;
                }
            }

            //单元格 文本颜色
            luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "fc");
            
            //若单元格有交替颜色 文本颜色
            if(checksAF != null && checksAF[0] != null){ 
                luckysheetTableContent.fillStyle = checksAF[0];
            }
            //若单元格有条件格式 文本颜色
            if(checksCF != null && checksCF["textColor"] != null){ 
                luckysheetTableContent.fillStyle = checksCF["textColor"];
            }

            //单元格是否有删除线
            let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");

            if(cell.tb == '2'){
                //自动换行
                luckysheetTableContent.textBaseline = 'top'; //textBaseline以top计算
                
                let strArr = [];//文本截断数组
                strArr = getCellTextSplitArr(value.toString(), strArr, cellWidth - space_width * 2, luckysheetTableContent);

                for(let i = 0; i < strArr.length; i++){
                    let strV = strArr[i];

                    let strWidth = luckysheetTableContent.measureText(strV).width;
                    let strHeight = oneLineTextHeight;

                    //水平对齐计算
                    if(horizonAlign == "0"){
                        horizonAlignPos = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (strWidth / 2);
                    }
                    else if(horizonAlign == "2"){
                        horizonAlignPos = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - strWidth;
                    }
                    else{
                        horizonAlignPos = (pos_x + space_width) * Store.devicePixelRatio;
                    }
                    
                    //垂直对齐计算
                    if(verticalAlign == "0"){
                        verticalAlignPos = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (strHeight / 2) * strArr.length;
                    }
                    else if(verticalAlign == "1"){
                        verticalAlignPos = (pos_y + space_height) * Store.devicePixelRatio;
                    }
                    else{
                        verticalAlignPos = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - strHeight * strArr.length;
                    }

                    luckysheetTableContent.fillText(strV, horizonAlignPos, (verticalAlignPos + i * strHeight));

                    if(cl == "1" && !isRealNull(strV)){
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.strokeStyle = "#000";
                        luckysheetTableContent.moveTo(
                            horizonAlignPos, 
                            (verticalAlignPos + i * strHeight) + strHeight / 2
                        );
                        luckysheetTableContent.lineTo(
                            horizonAlignPos + strWidth, 
                            (verticalAlignPos + i * strHeight) + strHeight / 2
                        );
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.closePath();
                    }
                }
            }
            else if(cell.tr != null && cell.tr != '0'){
                //旋转
                luckysheetTableContent.textBaseline = 'top'; //textBaseline以top计算

                //单元格旋转属性
                let tr = cell.tr;

                //旋转重新计算水平、垂直方向坐标
                if(cell.tr == "1" || cell.tr == "2"){
                    let textW = 0.707 * (textMetrics + oneLineTextHeight);
                    let textH = 0.707 * (textMetrics + oneLineTextHeight);

                    let hAP = (pos_x + space_width) * Store.devicePixelRatio;
                    if(horizonAlign == "0"){
                        hAP = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                    }
                    else if(horizonAlign == "2"){
                        hAP = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textW;
                    }

                    let vAP = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - textH;
                    if(verticalAlign == "0"){
                        vAP = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                    }
                    else if(verticalAlign == "1"){
                        vAP = (pos_y + space_height) * Store.devicePixelRatio;
                    }
                    
                    //向下倾斜（45 旋转）
                    if(cell.tr == "1"){
                        luckysheetTableContent.save();
                        luckysheetTableContent.translate(hAP, vAP);
                        luckysheetTableContent.rotate(45 * Math.PI / 180);
                        luckysheetTableContent.translate(-hAP, -vAP);
                        luckysheetTableContent.fillText(
                            value == null ? "" : value, 
                            hAP + (0.707 * 0.707 * oneLineTextHeight), 
                            vAP - (0.707 * 0.707 * oneLineTextHeight)
                        );
                        luckysheetTableContent.restore();
                        
                        if(cl == "1" && !isRealNull(value)){
                            luckysheetTableContent.beginPath();
                            luckysheetTableContent.strokeStyle = "#000";
                            luckysheetTableContent.moveTo(
                                hAP + oneLineTextHeight / 2, 
                                vAP + oneLineTextHeight / 2
                            );
                            luckysheetTableContent.lineTo(
                                hAP + textW - oneLineTextHeight / 2, 
                                vAP + textH - oneLineTextHeight / 2
                            );
                            luckysheetTableContent.closePath();
                            luckysheetTableContent.stroke();
                        }
                    }
                    
                    //向上倾斜（-45 旋转）
                    if(cell.tr == "2"){
                        luckysheetTableContent.save();
                        luckysheetTableContent.translate(hAP, vAP + textH);
                        luckysheetTableContent.rotate(-45 * Math.PI / 180);
                        luckysheetTableContent.translate(-hAP, -(vAP + textH));
                        luckysheetTableContent.fillText(
                            value == null ? "" : value, 
                            hAP + (0.707 * 0.707 * oneLineTextHeight), 
                            vAP + textH - (0.707 * 0.707 * oneLineTextHeight)
                        );
                        luckysheetTableContent.restore();
                        
                        if(cl == "1" && !isRealNull(value)){
                            luckysheetTableContent.beginPath();
                            luckysheetTableContent.strokeStyle = "#000";
                            luckysheetTableContent.moveTo(
                                hAP + oneLineTextHeight / 2, 
                                vAP + textH - oneLineTextHeight / 2
                            );
                            luckysheetTableContent.lineTo(
                                hAP + textW - oneLineTextHeight / 2, 
                                vAP + oneLineTextHeight / 2
                            );
                            luckysheetTableContent.closePath();
                            luckysheetTableContent.stroke();
                        }
                    }
                }
                else if(cell.tr == "3"){
                    if(!isRealNull(value)){
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

                        for(let i = 0; i < vArr.length; i++){
                            let textW = luckysheetTableContent.measureText(vArr[i]).width;
                            let textH = oneLineTextHeight;
                            
                            textW_all += textW;
                            textH_all += textH;

                            let hAP = (pos_x + space_width) * Store.devicePixelRatio;
                            if(horizonAlign == "0"){
                                hAP = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                            }
                            else if(horizonAlign == "2"){
                                hAP = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textW;
                            }

                            let vAP = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - textH * vArr.length;
                            if(verticalAlign == "0"){
                                vAP = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (textH / 2) * vArr.length;
                            }
                            else if(verticalAlign == "1"){
                                vAP = (pos_y + space_height) * Store.devicePixelRatio;
                            }
                            
                            luckysheetTableContent.fillText(vArr[i], hAP, (vAP + i * textH));
                        }

                        if(cl == "1" && !isRealNull(value)){
                            let textW = textW_all / vArr.length;
                            let textH = textH_all;

                            let hAP = (pos_x + space_width) * Store.devicePixelRatio;
                            if(horizonAlign == "0"){
                                hAP = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                            }
                            else if(horizonAlign == "2"){
                                hAP = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textW;
                            }

                            let vAP = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - textH;
                            if(verticalAlign == "0"){
                                vAP = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                            }
                            else if(verticalAlign == "1"){
                                vAP = (pos_y + space_height) * Store.devicePixelRatio;
                            }

                            luckysheetTableContent.beginPath();
                            luckysheetTableContent.strokeStyle = "#000";
                            luckysheetTableContent.moveTo(
                                hAP + textW / 2, 
                                vAP
                            );
                            luckysheetTableContent.lineTo(
                                hAP + textW / 2, 
                                vAP + textH
                            );
                            luckysheetTableContent.closePath();
                            luckysheetTableContent.stroke();
                        }
                    }
                }
                else if(cell.tr == "4" || cell.tr == "5"){
                    let textW = oneLineTextHeight;
                    let textH = textMetrics;

                    let hAP = (pos_x + space_width) * Store.devicePixelRatio;
                    if(horizonAlign == "0"){
                        hAP = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                    }
                    else if(horizonAlign == "2"){
                        hAP = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textW;
                    }

                    let vAP = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - textH;
                    if(verticalAlign == "0"){
                        vAP = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                    }
                    else if(verticalAlign == "1"){
                        vAP = (pos_y + space_height) * Store.devicePixelRatio;
                    }

                    //向下90（90 旋转）
                    if(tr == "4"){
                        luckysheetTableContent.save();
                        luckysheetTableContent.translate(hAP, vAP);
                        luckysheetTableContent.rotate(90 * Math.PI / 180);
                        luckysheetTableContent.translate(-hAP, -vAP);
                        luckysheetTableContent.fillText(value == null ? "" : value, hAP, vAP - textW);
                        luckysheetTableContent.restore();
                    }
                    
                    //向上90（-90 旋转）
                    if(tr == "5"){
                        luckysheetTableContent.save();
                        luckysheetTableContent.translate(hAP + textH, vAP);
                        luckysheetTableContent.rotate(-90 * Math.PI / 180);
                        luckysheetTableContent.translate(-(hAP + textH), -vAP);
                        luckysheetTableContent.fillText(value == null ? "" : value, hAP, vAP - textH);
                        luckysheetTableContent.restore();
                    }

                    if(cl == "1" && !isRealNull(value)){
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.strokeStyle = "#000";
                        luckysheetTableContent.moveTo(hAP + textW / 2, vAP);
                        luckysheetTableContent.lineTo(hAP + textW / 2, vAP + textH);
                        luckysheetTableContent.closePath();
                        luckysheetTableContent.stroke();
                    }
                }
            }
            else{
                //单元格有下钻属性，文本颜色变成超链接的颜色
                if(cell.dd != null){
                    luckysheetTableContent.fillStyle = "#0000ff";

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.strokeStyle = "#0000ff";
                    luckysheetTableContent.moveTo(
                        horizonAlignPos, 
                        verticalAlignPos + oneLineTextHeight
                    );
                    luckysheetTableContent.lineTo(
                        horizonAlignPos + textMetrics, 
                        verticalAlignPos + oneLineTextHeight
                    );
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                }

                luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos_text);
                    
                if(cl == "1" && !isRealNull(value)){
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.strokeStyle = "#000";
                    luckysheetTableContent.moveTo(
                        horizonAlignPos, 
                        verticalAlignPos + oneLineTextHeight / 2
                    );
                    luckysheetTableContent.lineTo(
                        horizonAlignPos + textMetrics, 
                        verticalAlignPos + oneLineTextHeight / 2
                    );
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                }
            }

            luckysheetTableContent.restore();
        }  

        if(cellOverflow_bd_r_render){
            //右边框
            if(!Store.luckysheetcurrentisPivotTable){
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(
                    Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                    Store.devicePixelRatio * (start_r + offsetTop - 2)
                );
                luckysheetTableContent.lineTo(
                    Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                    Store.devicePixelRatio * (end_r + offsetTop - 2)
                );
                luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            }
        }

        

        //下边框
        if(!Store.luckysheetcurrentisPivotTable){
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(
                Store.devicePixelRatio * (start_c + offsetLeft - 2), 
                Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
            );
            luckysheetTableContent.lineTo(
                Store.devicePixelRatio * (end_c + offsetLeft - 2), 
                Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
            );
            luckysheetTableContent.lineWidth = Store.devicePixelRatio;
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }

    //溢出单元格渲染
    let cellOverflowRender = function(r, c, stc, edc){
        //溢出单元格 起止行列坐标
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        let end_r = Store.visibledatarow[r] - scrollHeight;

        let start_c;
        if (stc == 0) {
            start_c = -scrollWidth;
        }
        else {
            start_c = Store.visibledatacolumn[stc - 1] - scrollWidth;
        }

        let end_c = Store.visibledatacolumn[edc] - scrollWidth;

        //
        let cell = Store.flowdata[r][c];
        let cellWidth = end_c - start_c - 2;
        let cellHeight = end_r - start_r - 2;
        let space_width = 2, space_height = 2; //宽高方向 间隙

        let fontset = luckysheetfontformat(cell);
        luckysheetTableContent.font = fontset;
        luckysheetTableContent.textBaseline = 'top';

        //溢出单元格 值
        let value = getcellvalue(r, c, null, "m");
        if(value == null){
            value = getcellvalue(r, c);
        }

        //文本单行 宽度和高度
        let measureText = luckysheetTableContent.measureText(value);
        let textMetrics = measureText.width;
        let oneLineTextHeight = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;
        
        let pos_x = start_c + offsetLeft;
        let pos_y = start_r + offsetTop + 1;

        luckysheetTableContent.save();
        luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
        luckysheetTableContent.clip();
        
        //溢出单元格 水平对齐
        let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c, "ht");
        let horizonAlignPos = (pos_x + space_width) * Store.devicePixelRatio; //默认为1，左对齐
        if(horizonAlign == "0"){ //居中对齐
            horizonAlignPos = (pos_x + cellWidth / 2) * Store.devicePixelRatio - (textMetrics / 2);
        }
        else if(horizonAlign == "2"){ //右对齐
            horizonAlignPos = (pos_x + cellWidth - space_width) * Store.devicePixelRatio - textMetrics;
        }
        
        //溢出单元格 垂直对齐
        let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c, "vt"); 
        let verticalAlignPos = (pos_y + cellHeight - space_height) * Store.devicePixelRatio - oneLineTextHeight; //默认为2，下对齐
        let verticalAlignPos_text = (pos_y + cellHeight - space_height) * Store.devicePixelRatio; //文本垂直方向基准线
        luckysheetTableContent.textBaseline = "bottom";
        if(verticalAlign == "0"){ //居中对齐 
            verticalAlignPos = (pos_y + cellHeight / 2) * Store.devicePixelRatio - (oneLineTextHeight / 2);
            
            verticalAlignPos_text = (pos_y + cellHeight / 2) * Store.devicePixelRatio;
            luckysheetTableContent.textBaseline = "middle";
        }
        else if(verticalAlign == "1"){ //上对齐
            verticalAlignPos = (pos_y + space_height) * Store.devicePixelRatio;
            
            verticalAlignPos_text = (pos_y + space_height) * Store.devicePixelRatio;
            luckysheetTableContent.textBaseline = "top";
        }

        //交替颜色
        let checksAF = alternateformat.checksAF(r, c, af_compute); 
        //条件格式
        let checksCF = conditionformat.checksCF(r, c, cf_compute); 

        //单元格 文本颜色
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "fc");
            
        //若单元格有交替颜色 文本颜色
        if(checksAF != null && checksAF[0] != null){ 
            luckysheetTableContent.fillStyle = checksAF[0];
        }
        //若单元格有条件格式 文本颜色
        if(checksCF != null && checksCF["textColor"] != null){ 
            luckysheetTableContent.fillStyle = checksCF["textColor"];
        }

        luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos_text);

        luckysheetTableContent.restore();
        
        //单元格是否有删除线
        let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
        if(cl == "1" && !isRealNull(value)){
            luckysheetTableContent.beginPath();
            luckysheetTableContent.strokeStyle = "#000";
            luckysheetTableContent.moveTo(
                horizonAlignPos, 
                verticalAlignPos + oneLineTextHeight / 2
            );
            luckysheetTableContent.lineTo(
                horizonAlignPos + textMetrics, 
                verticalAlignPos + oneLineTextHeight / 2
            );
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }

    let mcArr = [];

    for(let cud = 0; cud < cellupdate.length; cud++){
        let item = cellupdate[cud];
        let r = item.r, 
            c = item.c, 
            start_r = item.start_r, 
            start_c = item.start_c, 
            end_r = item.end_r, 
            end_c = item.end_c;
        let firstcolumlen = item.firstcolumlen;

        if(Store.flowdata[r] == null){
            continue;
        }
        
        if(Store.flowdata[r][c] == null){ //空单元格
            nullCellRender(r, c, start_r, start_c, end_r, end_c);
        }
        else{
            let cell = Store.flowdata[r][c];
            let value = null, er = r, ec = c, end_ec = end_c;

            if((typeof cell == "object") && "mc" in cell){
                mcArr.push(cellupdate[cud]);

                let margeMaindata = cell["mc"];
                value = getcellvalue(margeMaindata.r, margeMaindata.c, null, "m");
                
                if(value == null){
                    value = getcellvalue(margeMaindata.r, margeMaindata.c);
                }

                r = margeMaindata.r;
                c = margeMaindata.c;

                er += margeMaindata.rs;
                ec += margeMaindata.rc;

                if (c == 0) {
                    start_c = -scrollWidth;
                }
                else {
                    start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
                }

                if (r == 0) {
                    start_r = -scrollHeight - 1;
                }
                else {
                    start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
                }

                end_ec = Store.visibledatacolumn[ec] - scrollWidth;
            }
            else{
                value = getcellvalue(r, c, null, "m");
                if(value == null){
                    value = getcellvalue(r, c);
                }
            }  

            if(value == null || value.toString().length == 0){
                nullCellRender(r, c, start_r, start_c, end_r, end_c);
                
                //sparklines渲染
                let borderfix = menuButton.borderfix(Store.flowdata, r, c);
                let cellsize = [
                    Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
                    Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
                    Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
                    Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
                ];
                sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
            }
            else{
                if((r + "_" + c) in dynamicArray_compute){//动态数组公式
                    value = dynamicArray_compute[r + "_" + c].v;
                }

                cellRender(r, c, start_r, start_c, end_r, end_c, value);
            }
        }
    }

    //合并单元格再处理
    for(let m = 0; m < mcArr.length; m++){
        let item = mcArr[m];
        let r = item.r, 
            c = item.c, 
            start_r = item.start_r, 
            start_c = item.start_c, 
            end_r = item.end_r, 
            end_c = item.end_c;
        let firstcolumlen = item.firstcolumlen;

        let cell = Store.flowdata[r][c];
        let value = null, er = r, ec = c, end_ec = end_c;

        let margeMaindata = cell["mc"];
        value = getcellvalue(margeMaindata.r, margeMaindata.c, null, "m");
        
        if(value == null){
            value = getcellvalue(margeMaindata.r, margeMaindata.c);
        }

        r = margeMaindata.r;
        c = margeMaindata.c;

        er += margeMaindata.rs;
        ec += margeMaindata.rc;

        if (c == 0) {
            start_c = -scrollWidth;
        }
        else {
            start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
        }

        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        end_ec = Store.visibledatacolumn[ec] - scrollWidth;

        if(value == null || value.toString().length == 0){
            nullCellRender(r, c, start_r, start_c, end_r, end_c);
            
            //sparklines渲染
            let borderfix = menuButton.borderfix(Store.flowdata, r, c);
            let cellsize = [
                Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
                Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
                Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
                Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
            ];
            sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
        }
        else{
            if((r + "_" + c) in dynamicArray_compute){//动态数组公式
                value = dynamicArray_compute[r + "_" + c].v;
            }

            cellRender(r, c, start_r, start_c, end_r, end_c, value, "offline");
        }
    }


    //数据透视表边框渲染
    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        let end_r = Store.visibledatarow[r] - scrollHeight;
        
        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            let start_c;
            if (c == 0) {
                start_c = -scrollWidth;
            }
            else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }

            let end_c = Store.visibledatacolumn[c] - scrollWidth;

            //数据透视表\
            if (!!Store.luckysheetcurrentisPivotTable && pivotTable.drawPivotTable) {
                if ((c == 0 || c == 5) && r <= 11) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
                        Store.devicePixelRatio * (start_r + offsetTop)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
                        Store.devicePixelRatio * (end_r - 2 + offsetTop)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }

                if ((r == 2 || r == 11) && c <= 5) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio * (start_c - 1 + offsetLeft), 
                        Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio * (end_c - 2 + offsetLeft), 
                        Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }

                if (r == 6 && c == 3) {
                    luckysheetTableContent.fillText(
                        "Pivot Table", 
                        Store.devicePixelRatio * (start_c + 4 + offsetLeft), 
                        Store.devicePixelRatio *(start_r + (end_r - start_r) / 2 - 1 + offsetTop)
                    );
                }
            }
            else if (!!Store.luckysheetcurrentisPivotTable) {
                if (c < pivotTable.pivotTableBoundary[1] && r < pivotTable.pivotTableBoundary[0]) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio*(end_c - 2 + 0.5 + offsetLeft), 
                        Store.devicePixelRatio*(start_r + offsetTop)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio*(end_c - 2 + 0.5 + offsetLeft), 
                        Store.devicePixelRatio*(end_r - 2 + offsetTop)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio*(start_c - 1 + offsetLeft), 
                        Store.devicePixelRatio*(end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio*(end_c - 2 + offsetLeft), 
                        Store.devicePixelRatio*(end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }
            }
        }
    }

    //边框单独渲染
    if(Store.config["borderInfo"] != null && Store.config["borderInfo"].length > 0){
        //边框渲染
        let borderLeftRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
            let linetype = style;

            let m_st = Store.devicePixelRatio * (start_c - 2 + 0.5 + offsetLeft);
            let m_ed = Store.devicePixelRatio * (start_r + offsetTop);
            let line_st = Store.devicePixelRatio * (start_c - 2 + 0.5 + offsetLeft);
            let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

            menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;
            
            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        }

        let borderRightRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
            let linetype = style;

            let m_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
            let m_ed = Store.devicePixelRatio * (start_r + offsetTop);
            let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
            let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

            menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;
            
            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        }

        let borderBottomRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
            let linetype = style;

            let m_st = Store.devicePixelRatio * (start_c - 2 + offsetLeft);
            let m_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);
            let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
            let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

            menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;
            
            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        }

        let borderTopRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
            let linetype = style;

            let m_st = Store.devicePixelRatio * (start_c - 2 + offsetLeft);
            let m_ed = Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop);
            let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
            let line_ed = Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop);

            menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;
            
            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        }

        let borderInfoCompute = getBorderInfoCompute();
        
        for(let x in borderInfoCompute){
            let bd_r = x.split("_")[0], bd_c = x.split("_")[1];

            if(borderOffset[bd_r + "_" + bd_c]){
                let start_r = borderOffset[bd_r + "_" + bd_c].start_r;
                let start_c = borderOffset[bd_r + "_" + bd_c].start_c;
                let end_r = borderOffset[bd_r + "_" + bd_c].end_r;
                let end_c = borderOffset[bd_r + "_" + bd_c].end_c;

                let borderLeft = borderInfoCompute[x].l;
                if(borderLeft != null){
                    borderLeftRender(borderLeft.style, borderLeft.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                }

                let borderRight = borderInfoCompute[x].r;
                if(borderRight != null){
                    borderRightRender(borderRight.style, borderRight.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                }

                let borderTop = borderInfoCompute[x].t;
                if(borderTop != null){
                    borderTopRender(borderTop.style, borderTop.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                }

                let borderBottom = borderInfoCompute[x].b;
                if(borderBottom != null){
                    borderBottomRender(borderBottom.style, borderBottom.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                }
            }
        }
    }

    //渲染表格时有尾列时，清除右边灰色区域，防止表格有值溢出
    if(dataset_col_ed == Store.visibledatacolumn.length - 1){
        luckysheetTableContent.clearRect(
            (fill_col_ed - scrollWidth + offsetLeft - 1) * Store.devicePixelRatio, 
            (offsetTop - 1) * Store.devicePixelRatio, 
            (Store.ch_width - Store.visibledatacolumn[dataset_col_ed]) * Store.devicePixelRatio, 
            (fill_row_ed - scrollHeight) * Store.devicePixelRatio
        );
    }
}

//获取表格渲染范围 溢出单元格 
function getCellOverflowMap(canvas, col_st, col_ed){
    let map = {};

    let data = Store.flowdata;

    for(let r = 0; r < data.length; r++){
        for(let c = 0; c < data[r].length; c++){
            let cell = data[r][c];

            if(cell != null && !isRealNull(cell.v) && cell.mc == null && cell.tb == '1'){
                let fontset = luckysheetfontformat(cell);
                canvas.font = fontset;

                //水平对齐
                let horizonAlign = menuButton.checkstatus(data, r, c, "ht");

                //文本宽度
                let value = getcellvalue(r, c, null, "m");
                if(value == null){
                    value = getcellvalue(r, c);
                } 
                let textMetrics = canvas.measureText(value).width;

                let start_c = c - 1 < 0 ? 0 : Store.visibledatacolumn[c - 1];
                let end_c = Store.visibledatacolumn[c];

                let stc, edc;

                if((end_c - start_c) < textMetrics){
                    if(horizonAlign == '0'){//居中对齐
                        let trace_forward = cellOverflow_trace(r, c, c - 1, 'forward', horizonAlign, textMetrics);
                        let trace_backward = cellOverflow_trace(r, c, c + 1, 'backward', horizonAlign, textMetrics);
                    
                        if(trace_forward.success){
                            stc = trace_forward.c;
                        }
                        else{
                            stc = trace_forward.c + 1;
                        }

                        if(trace_backward.success){
                            edc = trace_backward.c;
                        }
                        else{
                            edc = trace_backward.c - 1;
                        }
                    }
                    else if(horizonAlign == '1'){//左对齐
                        let trace = cellOverflow_trace(r, c, c + 1, 'backward', horizonAlign, textMetrics);
                        stc = c;

                        if(trace.success){
                            edc = trace.c;
                        }
                        else{
                            edc = trace.c - 1;
                        }
                    }
                    else if(horizonAlign == '2'){//右对齐
                        let trace = cellOverflow_trace(r, c, c - 1, 'forward', horizonAlign, textMetrics);
                        edc = c;

                        if(trace.success){
                            stc = trace.c;
                        }
                        else{
                            stc = trace.c + 1;
                        }
                    }
                }
                else{
                    stc = c;
                    edc = c;
                }

                if(((stc >= col_st && stc <= col_ed) || (edc >= col_st && edc <= col_ed)) && stc < edc){
                    map[r + '_' + c] = {
                        r: r,
                        stc: stc,
                        edc: edc 
                    }
                }
            }
        }
    }

    return map;
}

function cellOverflow_trace(r, curC, traceC, traceDir, horizonAlign, textMetrics){
    let data = Store.flowdata; 

    //追溯单元格列超出数组范围 则追溯终止
    if(traceDir == 'forward' && traceC < 0){
        return {
            success: false,
            r: r,
            c: traceC
        }; 
    }
    
    if(traceDir == 'backward' && traceC > data[r].length - 1){
        return {
            success: false,
            r: r,
            c: traceC
        };
    }

    //追溯单元格是 非空单元格或合并单元格 则追溯终止
    let cell = data[r][traceC];
    if(cell != null && (!isRealNull(cell.v) || cell.mc != null)){
        return {
            success: false,
            r: r,
            c: traceC
        };
    }

    let start_curC = curC - 1 < 0 ? 0 : Store.visibledatacolumn[curC - 1];
    let end_curC = Store.visibledatacolumn[curC];

    let w = textMetrics - (end_curC - start_curC);

    if(horizonAlign == '0'){//居中对齐
        start_curC -= w / 2;
        end_curC += w / 2;
    }
    else if(horizonAlign == '1'){//左对齐
        end_curC += w;
    }
    else if(horizonAlign == '2'){//右对齐
        start_curC -= w;
    }

    let start_traceC = traceC - 1 < 0 ? 0 : Store.visibledatacolumn[traceC - 1];
    let end_traceC = Store.visibledatacolumn[traceC];

    if(traceDir == 'forward'){
        if(start_curC < start_traceC){
            return cellOverflow_trace(r, curC, traceC - 1, traceDir, horizonAlign, textMetrics);
        }
        else if(start_curC < end_traceC){
            return {
                success: true,
                r: r,
                c: traceC
            }
        }
        else{
            return {
                success: false,
                r: r,
                c: traceC
            }
        }
    }
    
    if(traceDir == 'backward'){
        if(end_curC > end_traceC){
            return cellOverflow_trace(r, curC, traceC + 1, traceDir, horizonAlign, textMetrics);
        }
        else if(end_curC > start_traceC){
            return {
                success: true,
                r: r,
                c: traceC
            }
        }
        else{
            return {
                success: false,
                r: r,
                c: traceC
            }
        }
    }
}

function cellOverflow_colIn(map, r, c, col_st, col_ed){
    let colIn = false, //此单元格 是否在 某个溢出单元格的渲染范围
        colLast = false, //此单元格 是否是 某个溢出单元格的渲染范围的最后一列
        rowIndex, //溢出单元格 行下标 
        colIndex, //溢出单元格 列下标
        stc,
        edc;

    for(let key in map){
        rowIndex = key.split('_')[0];
        colIndex = key.split('_')[1];

        stc = map[key].stc;
        edc = map[key].edc;

        if(rowIndex == r){
            if(c >= stc && c <= edc){
                colIn = true;

                if(c == edc || c == col_ed){
                    colLast = true;
                    break;
                }
            }
        }
    }

    return {
        colIn: colIn,
        colLast: colLast,
        rowIndex: rowIndex,
        colIndex: colIndex,
        stc: stc,
        edc: edc
    }
}

//获取有值单元格文本大小
function getCellValueSize(cell, value, canvas, cellWidth, cellHeight, space_width, space_height){
    let textWidth, textHeight;

    value = value.toString();

    let measureText = canvas.measureText(value);
    let textW = measureText.width;
    let textH = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;

    if(cell.tb == '2' && textW > cellWidth - space_width * 2){
        //自动换行 且 文本长度超出单元格长度
        let strArr = [];//文本截断数组
        strArr = getCellTextSplitArr(value, strArr, cellWidth - space_width * 2, canvas);

        textWidth = cellWidth - space_width * 2;
        textHeight = textH * strArr.length;
    }
    else if(cell.tr != null && cell.tr != '0'){
        //旋转
        if(cell.tr == '1' || cell.tr == '2'){
            textWidth = 0.707 * (textW + textH);
            textHeight = 0.707 * (textW + textH);
        }
        else if(cell.tr == '3'){
            let vArr = [];

            if(value.length > 1){
                vArr = value.split('');
            }
            else{
                vArr.push(value);
            }

            let textW_all, textH_all;

            for(let i = 0; i < vArr.length; i++){
                let measureText_i = canvas.measureText(vArr[i]);
                textW_all += measureText_i.width;
                textH_all += measureText_i.actualBoundingBoxDescent - measureText_i.actualBoundingBoxAscent;
            }

            textWidth = textW_all / vArr.length;
            textHeight = textH_all;
        }
        else if(cell.tr == '4' || cell.tr == '5'){
            textWidth = textH;
            textHeight = textW;
        }
    }
    else{
        textWidth = textW;
        textHeight = textH;
    }

    return {
        width: textWidth,
        height: textHeight
    }
}


export {
    luckysheetDrawgrid,
    luckysheetDrawgridRowTitle,
    luckysheetDrawgridColumnTitle,
    luckysheetDrawMain,
}