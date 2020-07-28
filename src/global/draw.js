import pivotTable from '../controllers/pivotTable';
import conditionformat from '../controllers/conditionformat';
import alternateformat from '../controllers/alternateformat';
import luckysheetSparkline from '../controllers/sparkline';
import menuButton from '../controllers/menuButton';
import { luckysheetdefaultstyle, luckysheet_CFiconsImg } from '../controllers/constant';
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

    if(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["isPivotTable"]){
        luckysheetDrawMain_back(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop);  
    }
    else{
        luckysheetDrawMain(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop);
    }
    
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

    luckysheetTableContent.font = luckysheetdefaultstyle.font;
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


    luckysheetTableContent.font = luckysheetdefaultstyle.font;
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

let offlinecanvasElement_cache = {};

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
    luckysheetTableContent.font = luckysheetdefaultstyle.font;
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

            //数据透视表
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
                        "数据透视表", 
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
                    temp1.pixelWidth, 
                    temp1.pixelHeight, 
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
            let fontset = luckysheetdefaultstyle.font;
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

        //右边框
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

        if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
            luckysheetTableContent.strokeStyle = "#000000";
        }
        else{
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        }
        
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();

        //下边框
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

        if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
            luckysheetTableContent.strokeStyle = "#000000";
        }
        else{
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        }
        
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();
    }

    //非空白单元格渲染
    let cellRender = function(r, c, start_r, start_c, end_r, end_c, value, canvasType){
        let cell = Store.flowdata[r][c];
        let cellWidth = end_c - start_c - 2;
        let cellHeight = end_r - start_r - 2;
        let space_width = 2, space_height = 2; //宽高方向 间隙

        let fontset = luckysheetfontformat(cell);
        luckysheetTableContent.font = fontset;

        //文本计算 宽度和高度
        let cellValueSize = getCellValueSize(cell, value, luckysheetTableContent, cellWidth, cellHeight, space_width, space_height);

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
            (end_r - start_r + 1) * Store.devicePixelRatio
        )

        // 非Safari浏览器
        //（canvasType为offline）
        //（水平对齐方式为居中或右对齐 且 文本宽度大于单元格宽度）
        //（文本高度大于单元格高度）
        // 走离屏canvas方法
        if(browser.BrowserType() != "Safari" && ( canvasType == "offline" || ( (horizonAlign == "0" || horizonAlign == "2") && cellWidth < cellValueSize.width ) || cellHeight < cellValueSize.height )){
            //取渲染单元格大小离屏canvas
            let offlinecanvasElement = offlinecanvasElement_cache[cellWidth + '_' + cellHeight];
            if(offlinecanvasElement == null){
                offlinecanvasElement = document.createElement('canvas');
                offlinecanvasElement.width = cellWidth * Store.devicePixelRatio;
                offlinecanvasElement.height = cellHeight * Store.devicePixelRatio;
                offlinecanvasElement_cache[cellWidth + '_' + cellHeight] = offlinecanvasElement;
            }
            let offlinecanvas = offlinecanvasElement.getContext("2d");

            offlinecanvas.clearRect(
                0, 
                0, 
                cellWidth * Store.devicePixelRatio, 
                cellHeight * Store.devicePixelRatio
            );
            offlinecanvas.font = fontset;

            //若单元格有批注（单元格右上角红色小三角标示）
            if(cell.ps != null){
                let ps_w = 5, ps_h = 5; //红色小三角宽高

                offlinecanvas.beginPath();
                offlinecanvas.moveTo(
                    Store.devicePixelRatio * (cellWidth - ps_w), 
                    0
                );
                offlinecanvas.lineTo(
                    Store.devicePixelRatio * cellWidth, 
                    0
                );
                offlinecanvas.lineTo(
                    Store.devicePixelRatio * cellWidth, 
                    Store.devicePixelRatio * ps_h
                );
                offlinecanvas.fillStyle = "#FC6666";
                offlinecanvas.fill();
                offlinecanvas.closePath();
            }

            //若单元格有条件格式数据条
            if(checksCF != null && checksCF["dataBar"] != null){
                let x = Store.devicePixelRatio * space_width;
                let y = Store.devicePixelRatio * space_height;
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
                        let my_gradient = offlinecanvas.createLinearGradient(
                            x + w * minusLen * (1 - valueLen), 
                            y, 
                            x + w * minusLen, 
                            y
                        );
                        my_gradient.addColorStop(0, "#ffffff");
                        my_gradient.addColorStop(1, "#ff0000");

                        offlinecanvas.fillStyle = my_gradient;
                    }
                    else{
                        //单色
                        offlinecanvas.fillStyle = "#ff0000";
                    }
                    
                    offlinecanvas.fillRect(
                        x + w * minusLen * (1 - valueLen), 
                        y, 
                        w * minusLen * valueLen, 
                        h
                    );

                    offlinecanvas.beginPath();
                    offlinecanvas.moveTo(
                        x + w * minusLen * (1 - valueLen), 
                        y
                    );
                    offlinecanvas.lineTo(
                        x + w * minusLen * (1 - valueLen), 
                        y + h
                    );
                    offlinecanvas.lineTo(
                        x + w * minusLen, 
                        y + h
                    );
                    offlinecanvas.lineTo(
                        x + w * minusLen, 
                        y
                    );
                    offlinecanvas.lineTo(
                        x + w * minusLen * (1 - valueLen), 
                        y
                    );
                    offlinecanvas.lineWidth = Store.devicePixelRatio;
                    offlinecanvas.strokeStyle = "#ff0000";
                    offlinecanvas.stroke();
                    offlinecanvas.closePath();
                }
                else if(valueType == 'plus'){
                    //正数
                    let plusLen = checksCF["dataBar"]["plusLen"];

                    if(plusLen == 1){
                        if(format.length > 1){
                            //渐变
                            let my_gradient = offlinecanvas.createLinearGradient(
                                x, 
                                y, 
                                x + w * valueLen, 
                                y
                            );
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
        
                            offlinecanvas.fillStyle = my_gradient;
                        }
                        else{
                            //单色
                            offlinecanvas.fillStyle = format[0];
                        }
                        
                        offlinecanvas.fillRect(
                            x, 
                            y, 
                            w * valueLen, 
                            h
                        );

                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(
                            x, 
                            y
                        );
                        offlinecanvas.lineTo(
                            x, 
                            y + h
                        );
                        offlinecanvas.lineTo(
                            x + w * valueLen, 
                            y + h
                        );
                        offlinecanvas.lineTo(
                            x + w * valueLen, 
                            y
                        );
                        offlinecanvas.lineTo(
                            x, 
                            y
                        );
                        offlinecanvas.lineWidth = Store.devicePixelRatio;
                        offlinecanvas.strokeStyle = format[0];
                        offlinecanvas.stroke();
                        offlinecanvas.closePath();
                    }
                    else{
                        let minusLen = checksCF["dataBar"]["minusLen"];

                        if(format.length > 1){
                            //渐变
                            let my_gradient = offlinecanvas.createLinearGradient(
                                x + w * minusLen, 
                                y, 
                                x + w * minusLen + w * plusLen * valueLen, 
                                y
                            );
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
        
                            offlinecanvas.fillStyle = my_gradient;
                        }
                        else{
                            //单色
                            offlinecanvas.fillStyle = format[0];
                        }
                        
                        offlinecanvas.fillRect(
                            x + w * minusLen, 
                            y, 
                            w * plusLen * valueLen, 
                            h
                        );

                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(
                            x + w * minusLen, 
                            y
                        );
                        offlinecanvas.lineTo(
                            x + w * minusLen, 
                            y + h
                        );
                        offlinecanvas.lineTo(
                            x + w * minusLen + w * plusLen * valueLen, 
                            y + h
                        );
                        offlinecanvas.lineTo(
                            x + w * minusLen + w * plusLen * valueLen, 
                            y
                        );
                        offlinecanvas.lineTo(
                            x + w * minusLen, 
                            y
                        );
                        offlinecanvas.lineWidth = Store.devicePixelRatio;
                        offlinecanvas.strokeStyle = format[0];
                        offlinecanvas.stroke();
                        offlinecanvas.closePath();
                    }
                }
            }

            let horizonAlignPos = space_width * Store.devicePixelRatio; //默认为1，左对齐
            if(horizonAlign == "0"){ //居中对齐
                horizonAlignPos = (cellWidth / 2) * Store.devicePixelRatio - (textMetrics / 2);
            }
            else if(horizonAlign == "2"){ //右对齐
                horizonAlignPos = (cellWidth - space_width) * Store.devicePixelRatio - textMetrics;
            }
            
            let verticalAlignPos = (cellHeight - space_height) * Store.devicePixelRatio - oneLineTextHeight; //默认为2，下对齐
            let verticalAlignPos_text = (cellHeight - space_height) * Store.devicePixelRatio; //文本垂直方向基准线
            offlinecanvas.textBaseline = "bottom";
            if(verticalAlign == "0"){ //居中对齐 
                verticalAlignPos = (cellHeight / 2) * Store.devicePixelRatio - (oneLineTextHeight / 2);
                
                verticalAlignPos_text = (cellHeight / 2) * Store.devicePixelRatio;
                offlinecanvas.textBaseline = "middle";
            }
            else if(verticalAlign == "1"){ //上对齐
                verticalAlignPos = space_height * Store.devicePixelRatio;
                
                verticalAlignPos_text = space_height * Store.devicePixelRatio;
                offlinecanvas.textBaseline = "top";
            }
          
            //若单元格有条件格式图标集
            if(checksCF != null && checksCF["icons"] != null){
                let l = checksCF["icons"]["left"];
                let t = checksCF["icons"]["top"];

                offlinecanvas.drawImage(
                    luckysheet_CFiconsImg, 
                    l * 42, 
                    t * 32, 
                    32, 
                    32, 
                    0, 
                    verticalAlignPos,  
                    oneLineTextHeight, 
                    oneLineTextHeight
                );
                
                if(horizonAlign != "0" && horizonAlign != "2"){ //左对齐时 文本渲染空出一个图标的距离
                    horizonAlignPos = horizonAlignPos + oneLineTextHeight;
                }
            }

            //单元格 文本颜色
            offlinecanvas.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "fc");
            
            //若单元格有交替颜色 文本颜色
            if(checksAF != null && checksAF[0] != null){ 
                offlinecanvas.fillStyle = checksAF[0];
            }
            //若单元格有条件格式 文本颜色
            if(checksCF != null && checksCF["textColor"] != null){ 
                offlinecanvas.fillStyle = checksCF["textColor"];
            }

            //单元格是否有删除线
            let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");

            if(cell.tb == '2'){
                //自动换行
                offlinecanvas.textBaseline = 'top'; //textBaseline以top计算
                
                let strArr = [];//文本截断数组
                strArr = getCellTextSplitArr(value.toString(), strArr, cellWidth - space_width * 2, offlinecanvas);

                for(let i = 0; i < strArr.length; i++){
                    let strV = strArr[i];

                    let strWidth = offlinecanvas.measureText(strV).width;
                    let strHeight = oneLineTextHeight;

                    //水平对齐计算
                    if(horizonAlign == "0"){
                        horizonAlignPos = (cellWidth / 2) * Store.devicePixelRatio - (strWidth / 2);
                    }
                    else if(horizonAlign == "2"){
                        horizonAlignPos = (cellWidth - space_width) * Store.devicePixelRatio - strWidth;
                    }
                    else{
                        horizonAlignPos = space_width * Store.devicePixelRatio;
                    }
                    
                    //垂直对齐计算
                    if(verticalAlign == "0"){
                        verticalAlignPos = (cellHeight / 2) * Store.devicePixelRatio - (strHeight / 2) * strArr.length;
                    }
                    else if(verticalAlign == "1"){
                        verticalAlignPos = space_height * Store.devicePixelRatio;
                    }
                    else{
                        verticalAlignPos = (cellHeight - space_height) * Store.devicePixelRatio - strHeight * strArr.length;
                    }

                    offlinecanvas.fillText(strV, horizonAlignPos, (verticalAlignPos + i * strHeight));

                    if(cl == "1" && !isRealNull(strV)){
                        offlinecanvas.beginPath();
                        offlinecanvas.strokeStyle = "#000";
                        offlinecanvas.moveTo(
                            horizonAlignPos, 
                            (verticalAlignPos + i * strHeight) + strHeight / 2
                        );
                        offlinecanvas.lineTo(
                            horizonAlignPos + strWidth, 
                            (verticalAlignPos + i * strHeight) + strHeight / 2
                        );
                        offlinecanvas.stroke();
                        offlinecanvas.closePath();
                    }
                }
            }
            else if(cell.tr != null && cell.tr != '0'){
                //旋转
                offlinecanvas.textBaseline = 'top'; //textBaseline以top计算

                //单元格旋转属性
                let tr = cell.tr;

                //旋转重新计算水平、垂直方向坐标
                if(cell.tr == "1" || cell.tr == "2"){
                    let textW = 0.707 * (textMetrics + oneLineTextHeight);
                    let textH = 0.707 * (textMetrics + oneLineTextHeight);

                    let hAP = space_width * Store.devicePixelRatio;
                    if(horizonAlign == "0"){
                        hAP = (cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                    }
                    else if(horizonAlign == "2"){
                        hAP = (cellWidth - space_width) * Store.devicePixelRatio - textW;
                    }

                    let vAP = (cellHeight - space_height) * Store.devicePixelRatio - textH;
                    if(verticalAlign == "0"){
                        vAP = (cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                    }
                    else if(verticalAlign == "1"){
                        vAP = space_height * Store.devicePixelRatio;
                    }
                    
                    //向下倾斜（45 旋转）
                    if(cell.tr == "1"){
                        offlinecanvas.save();
                        offlinecanvas.translate(hAP, vAP);
                        offlinecanvas.rotate(45 * Math.PI / 180);
                        offlinecanvas.translate(-hAP, -vAP);
                        offlinecanvas.fillText(
                            value == null ? "" : value, 
                            hAP + (0.707 * 0.707 * oneLineTextHeight), 
                            vAP - (0.707 * 0.707 * oneLineTextHeight)
                        );
                        offlinecanvas.restore();
                        
                        if(cl == "1" && !isRealNull(value)){
                            offlinecanvas.beginPath();
                            offlinecanvas.strokeStyle = "#000";
                            offlinecanvas.moveTo(
                                hAP + oneLineTextHeight / 2, 
                                vAP + oneLineTextHeight / 2
                            );
                            offlinecanvas.lineTo(
                                hAP + textW - oneLineTextHeight / 2, 
                                vAP + textH - oneLineTextHeight / 2
                            );
                            offlinecanvas.closePath();
                            offlinecanvas.stroke();
                        }
                    }
                    
                    //向上倾斜（-45 旋转）
                    if(cell.tr == "2"){
                        offlinecanvas.save();
                        offlinecanvas.translate(hAP, vAP + textH);
                        offlinecanvas.rotate(-45 * Math.PI / 180);
                        offlinecanvas.translate(-hAP, -(vAP + textH));
                        offlinecanvas.fillText(
                            value == null ? "" : value, 
                            hAP + (0.707 * 0.707 * oneLineTextHeight), 
                            vAP + textH - (0.707 * 0.707 * oneLineTextHeight)
                        );
                        offlinecanvas.restore();
                        
                        if(cl == "1" && !isRealNull(value)){
                            offlinecanvas.beginPath();
                            offlinecanvas.strokeStyle = "#000";
                            offlinecanvas.moveTo(
                                hAP + oneLineTextHeight / 2, 
                                vAP + textH - oneLineTextHeight / 2
                            );
                            offlinecanvas.lineTo(
                                hAP + textW - oneLineTextHeight / 2, 
                                vAP + oneLineTextHeight / 2
                            );
                            offlinecanvas.closePath();
                            offlinecanvas.stroke();
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
                            let textW = offlinecanvas.measureText(vArr[i]).width;
                            let textH = oneLineTextHeight;
                            
                            textW_all += textW;
                            textH_all += textH;

                            let hAP = space_width * Store.devicePixelRatio;
                            if(horizonAlign == "0"){
                                hAP = (cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                            }
                            else if(horizonAlign == "2"){
                                hAP = (cellWidth - space_width) * Store.devicePixelRatio - textW;
                            }

                            let vAP = (cellHeight - space_height) * Store.devicePixelRatio - textH * vArr.length;
                            if(verticalAlign == "0"){
                                vAP = (cellHeight / 2) * Store.devicePixelRatio - (textH / 2) * vArr.length;
                            }
                            else if(verticalAlign == "1"){
                                vAP = space_height * Store.devicePixelRatio;
                            }
                            
                            offlinecanvas.fillText(vArr[i], hAP, (vAP + i * textH));
                        }

                        if(cl == "1" && !isRealNull(value)){
                            let textW = textW_all / vArr.length;
                            let textH = textH_all;

                            let hAP = space_width * Store.devicePixelRatio;
                            if(horizonAlign == "0"){
                                hAP = (cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                            }
                            else if(horizonAlign == "2"){
                                hAP = (cellWidth - space_width) * Store.devicePixelRatio - textW;
                            }

                            let vAP = (cellHeight - space_height) * Store.devicePixelRatio - textH;
                            if(verticalAlign == "0"){
                                vAP = (cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                            }
                            else if(verticalAlign == "1"){
                                vAP = space_height * Store.devicePixelRatio;
                            }

                            offlinecanvas.beginPath();
                            offlinecanvas.strokeStyle = "#000";
                            offlinecanvas.moveTo(
                                hAP + textW / 2, 
                                vAP
                            );
                            offlinecanvas.lineTo(
                                hAP + textW / 2, 
                                vAP + textH
                            );
                            offlinecanvas.closePath();
                            offlinecanvas.stroke();
                        }
                    }
                }
                else if(cell.tr == "4" || cell.tr == "5"){
                    let textW = oneLineTextHeight;
                    let textH = textMetrics;

                    let hAP = space_width * Store.devicePixelRatio;
                    if(horizonAlign == "0"){
                        hAP = (cellWidth / 2) * Store.devicePixelRatio - (textW / 2);
                    }
                    else if(horizonAlign == "2"){
                        hAP = (cellWidth - space_width) * Store.devicePixelRatio - textW;
                    }

                    let vAP = (cellHeight - space_height) * Store.devicePixelRatio - textH;
                    if(verticalAlign == "0"){
                        vAP = (cellHeight / 2) * Store.devicePixelRatio - (textH / 2);
                    }
                    else if(verticalAlign == "1"){
                        vAP = space_height * Store.devicePixelRatio;
                    }

                    //向下90（90 旋转）
                    if(tr == "4"){
                        offlinecanvas.save();
                        offlinecanvas.translate(hAP, vAP);
                        offlinecanvas.rotate(90 * Math.PI / 180);
                        offlinecanvas.translate(-hAP, -vAP);
                        offlinecanvas.fillText(value == null ? "" : value, hAP, vAP - textW);
                        offlinecanvas.restore();
                    }
                    
                    //向上90（-90 旋转）
                    if(tr == "5"){
                        offlinecanvas.save();
                        offlinecanvas.translate(hAP + textH, vAP);
                        offlinecanvas.rotate(-90 * Math.PI / 180);
                        offlinecanvas.translate(-(hAP + textH), -vAP);
                        offlinecanvas.fillText(value == null ? "" : value, hAP, vAP - textH);
                        offlinecanvas.restore();
                    }

                    if(cl == "1" && !isRealNull(value)){
                        offlinecanvas.beginPath();
                        offlinecanvas.strokeStyle = "#000";
                        offlinecanvas.moveTo(hAP + textW / 2, vAP);
                        offlinecanvas.lineTo(hAP + textW / 2, vAP + textH);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
            }
            else{
                //单元格有下钻属性，文本颜色变成超链接的颜色
                if(cell.dd != null){
                    offlinecanvas.fillStyle = "#0000ff";

                    offlinecanvas.beginPath();
                    offlinecanvas.strokeStyle = "#0000ff";
                    offlinecanvas.moveTo(
                        horizonAlignPos, 
                        verticalAlignPos + oneLineTextHeight
                    );
                    offlinecanvas.lineTo(
                        horizonAlignPos + textMetrics, 
                        verticalAlignPos + oneLineTextHeight
                    );
                    offlinecanvas.stroke();
                    offlinecanvas.closePath();
                }

                offlinecanvas.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos_text);
                    
                if(cl == "1" && !isRealNull(value)){
                    offlinecanvas.beginPath();
                    offlinecanvas.strokeStyle = "#000";
                    offlinecanvas.moveTo(
                        horizonAlignPos, 
                        verticalAlignPos + oneLineTextHeight / 2
                    );
                    offlinecanvas.lineTo(
                        horizonAlignPos + textMetrics, 
                        verticalAlignPos + oneLineTextHeight / 2
                    );
                    offlinecanvas.stroke();
                    offlinecanvas.closePath();
                }
            }

            //将离屏canvas 画到主表格canvas上
            luckysheetTableContent.drawImage(
                offlinecanvasElement, 
                0, 
                0, 
                cellWidth * Store.devicePixelRatio, 
                cellHeight * Store.devicePixelRatio, 
                (start_c + offsetLeft) * Store.devicePixelRatio, 
                (start_r + offsetTop) * Store.devicePixelRatio, 
                cellWidth * Store.devicePixelRatio, 
                cellHeight * Store.devicePixelRatio, 
            );
        }
        //走主表格canvas方法
        else{
            let pos_x = start_c + offsetLeft;
            let pos_y = start_r + offsetTop + 1;

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
        }  

        //右边框重绘
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

        if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
            luckysheetTableContent.strokeStyle = "#000000";
        }
        else{
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        }
        
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();

        //下边框重绘
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

        if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
            luckysheetTableContent.strokeStyle = "#000000";
        }
        else{
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        }
        
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();
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

// function luckysheetDrawMain(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop, columnOffsetCell, rowOffsetCell, mycanvas, ctx, ctxdata) {
//     if(ctxdata != null){
//         Store.flowdata = ctxdata;
//     }

//     if(Store.flowdata == null){
//         return;
//     }

//     if (scrollWidth == null) {
//         scrollWidth = $("#luckysheet-cell-main").scrollLeft();
//     }
//     if (scrollHeight == null) {
//         scrollHeight = $("#luckysheet-cell-main").scrollTop();
//     }

//     if (drawWidth == null) {
//         drawWidth = Store.luckysheetTableContentHW[0];
//     }
//     if (drawHeight == null) {
//         drawHeight = Store.luckysheetTableContentHW[1];
//     }

//     if (offsetLeft == null) {
//         offsetLeft = Store.rowHeaderWidth;
//     }
//     if (offsetTop == null) {
//         offsetTop = Store.columeHeaderHeight;
//     }

//     if (columnOffsetCell == null) {
//         columnOffsetCell = 0;
//     }
//     if (rowOffsetCell == null) {
//         rowOffsetCell = 0;
//     }

//     let luckysheetTableContent = null;
//     if(ctx != null){
//         let luckysheetTableElement = document.createElement('canvas');
//         luckysheetTableElement.width = drawWidth;
//         luckysheetTableElement.height = drawHeight;
//         luckysheetTableContent = luckysheetTableElement.getContext("2d");
//     }
//     else{
//         if(mycanvas == null){
//             luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
//         }
//         else {
//             if(getObjType(mycanvas) == "object"){
//                 try{
//                     luckysheetTableContent = mycanvas.get(0).getContext("2d");
//                 }
//                 catch(err){
//                     luckysheetTableContent = mycanvas;
//                 }
//             }
//             else{
//                 luckysheetTableContent = $("#" + mycanvas).get(0).getContext("2d");
//             }
//         }
//     }
    
//     luckysheetTableContent.clearRect(
//         0, 
//         0, 
//         Store.luckysheetTableContentHW[0] * Store.devicePixelRatio,
//         Store.luckysheetTableContentHW[1] * Store.devicePixelRatio
//     );

//     //离屏canvas
//     let offlinecanvas = null;
//     if(ctx != null){
//         let offlineElement = document.createElement('canvas');
//         offlineElement.width = drawWidth;
//         offlineElement.height = drawHeight;
//         offlinecanvas = offlineElement.getContext("2d");
//     }
//     else{
//         offlinecanvas = $("#luckysheetTableContentF").get(0).getContext("2d");
//     }
//     offlinecanvas.fillStyle = "#ffffff";
//     offlinecanvas.fillRect(
//         0,
//         0, 
//         Store.luckysheetTableContentHW[0] * Store.devicePixelRatio, 
//         Store.luckysheetTableContentHW[1] * Store.devicePixelRatio
//     );
//     offlinecanvas.font = luckysheetdefaultstyle.font;
//     offlinecanvas.textBaseline = "top";
//     offlinecanvas.fillStyle = luckysheetdefaultstyle.fillStyle;

//     //
//     let dataset_row_st, dataset_row_ed, dataset_col_st, dataset_col_ed;

//     dataset_row_st = luckysheet_searcharray(Store.visibledatarow, scrollHeight);
//     dataset_row_ed = luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);

//     if (dataset_row_st == -1) {
//         dataset_row_st = 0;
//     }

//     dataset_row_st += rowOffsetCell;

//     if (dataset_row_ed == -1) {
//         dataset_row_ed = Store.visibledatarow.length - 1;
//     }

//     dataset_row_ed += rowOffsetCell;

//     if (dataset_row_ed >= Store.visibledatarow.length) {
//         dataset_row_ed = Store.visibledatarow.length - 1;
//     }

//     dataset_col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
//     dataset_col_ed = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);
    
//     if (dataset_col_st == -1) {
//         dataset_col_st = 0;
//     }

//     dataset_col_st += columnOffsetCell;

//     if (dataset_col_ed == -1) {
//         dataset_col_ed = Store.visibledatacolumn.length - 1;
//     }

//     dataset_col_ed += columnOffsetCell;

//     if (dataset_col_ed >= Store.visibledatacolumn.length) {
//         dataset_col_ed = Store.visibledatacolumn.length - 1;
//     }


//     let fill_row_st, fill_row_ed, fill_col_st, fill_col_ed;
//     if(dataset_row_st == 0){
//         fill_row_st = 0;
//     }
//     else{
//         fill_row_st = Store.visibledatarow[dataset_row_st - 1];
//     }

//     fill_row_ed = Store.visibledatarow[dataset_row_ed];

//     if(dataset_col_st == 0){
//         fill_col_st = 0;
//     }
//     else{
//         fill_col_st = Store.visibledatacolumn[dataset_col_st - 1];
//     }

//     fill_col_ed = Store.visibledatacolumn[dataset_col_ed];

//     luckysheetTableContent.fillStyle = "#ffffff";
//     luckysheetTableContent.fillRect(
//         (offsetLeft - 1) * Store.devicePixelRatio, 
//         (offsetTop - 1) * Store.devicePixelRatio, 
//         (fill_col_ed - scrollWidth) * Store.devicePixelRatio, 
//         (fill_row_ed - scrollHeight) * Store.devicePixelRatio
//     );
//     luckysheetTableContent.font = luckysheetdefaultstyle.font;
//     luckysheetTableContent.textBaseline = "top";
//     luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

//     let end_r, start_r, end_c, start_c;

//     let cellupdate = [];
//     let mergeCache = {};

//     let borderOffset = {};

//     for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
//         if (r == 0) {
//             start_r = -scrollHeight - 1;
//         }
//         else {
//             start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
//         }

//         end_r = Store.visibledatarow[r] - scrollHeight;
        
//         for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
//             if (c == 0) {
//                 start_c = -scrollWidth;
//             }
//             else {
//                 start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
//             }

//             end_c = Store.visibledatacolumn[c] - scrollWidth;

//             //横线
//             if(c == dataset_col_ed && !Store.luckysheetcurrentisPivotTable){
//                 luckysheetTableContent.beginPath();
//                 luckysheetTableContent.moveTo(
//                     Store.devicePixelRatio * (offsetLeft - 1), 
//                     Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
//                 );
//                 luckysheetTableContent.lineTo(
//                     Store.devicePixelRatio * (fill_col_ed - scrollWidth + offsetLeft - 2), 
//                     Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
//                 );
//                 luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                 luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//                 luckysheetTableContent.closePath();
//                 luckysheetTableContent.stroke();
//             }

//             //竖线
//             if(r == dataset_row_st && !Store.luckysheetcurrentisPivotTable){
//                 luckysheetTableContent.beginPath();
//                 luckysheetTableContent.moveTo(
//                     Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
//                     Store.devicePixelRatio * (offsetTop - 1)
//                 );
//                 luckysheetTableContent.lineTo(
//                     Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
//                     Store.devicePixelRatio * (fill_row_ed - scrollHeight + offsetTop - 2)
//                 );
//                 luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                 luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//                 luckysheetTableContent.closePath();
//                 luckysheetTableContent.stroke();
//             }

//             //数据透视表
//             if (!!Store.luckysheetcurrentisPivotTable && pivotTable.drawPivotTable) {
//                 if ((c == 0 || c == 5) && r <= 11) {
//                     luckysheetTableContent.beginPath();
//                     luckysheetTableContent.moveTo(
//                         Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
//                         Store.devicePixelRatio * (start_r + offsetTop)
//                     );
//                     luckysheetTableContent.lineTo(
//                         Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
//                         Store.devicePixelRatio * (end_r - 2 + offsetTop)
//                     );
//                     luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                     luckysheetTableContent.strokeStyle = "#000000";
//                     luckysheetTableContent.closePath();
//                     luckysheetTableContent.stroke();
//                 }

//                 if ((r == 2 || r == 11) && c <= 5) {
//                     luckysheetTableContent.beginPath();
//                     luckysheetTableContent.moveTo(
//                         Store.devicePixelRatio * (start_c - 1 + offsetLeft), 
//                         Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
//                     );
//                     luckysheetTableContent.lineTo(
//                         Store.devicePixelRatio * (end_c - 2 + offsetLeft), 
//                         Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
//                     );
//                     luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                     luckysheetTableContent.strokeStyle = "#000000";
//                     luckysheetTableContent.closePath();
//                     luckysheetTableContent.stroke();
//                 }

//                 if (r == 6 && c == 3) {
//                     luckysheetTableContent.fillText(
//                         "数据透视表", 
//                         Store.devicePixelRatio * (start_c + 4 + offsetLeft), 
//                         Store.devicePixelRatio *(start_r + (end_r - start_r) / 2 - 1 + offsetTop)
//                     );
//                 }
//             }
//             else if (!!Store.luckysheetcurrentisPivotTable) {
//                 if (c < pivotTable.pivotTableBoundary[1] && r < pivotTable.pivotTableBoundary[0]) {
//                     luckysheetTableContent.beginPath();
//                     luckysheetTableContent.moveTo(
//                         Store.devicePixelRatio*(end_c - 2 + 0.5 + offsetLeft), 
//                         Store.devicePixelRatio*(start_r + offsetTop)
//                     );
//                     luckysheetTableContent.lineTo(
//                         Store.devicePixelRatio*(end_c - 2 + 0.5 + offsetLeft), 
//                         Store.devicePixelRatio*(end_r - 2 + offsetTop)
//                     );
//                     luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                     luckysheetTableContent.strokeStyle = "#000000";
//                     luckysheetTableContent.closePath();
//                     luckysheetTableContent.stroke();

//                     luckysheetTableContent.beginPath();
//                     luckysheetTableContent.moveTo(
//                         Store.devicePixelRatio*(start_c - 1 + offsetLeft), 
//                         Store.devicePixelRatio*(end_r - 2 + 0.5 + offsetTop)
//                     );
//                     luckysheetTableContent.lineTo(
//                         Store.devicePixelRatio*(end_c - 2 + offsetLeft), 
//                         Store.devicePixelRatio*(end_r - 2 + 0.5 + offsetTop)
//                     );
//                     luckysheetTableContent.lineWidth = Store.devicePixelRatio;
//                     luckysheetTableContent.strokeStyle = "#000000";
//                     luckysheetTableContent.closePath();
//                     luckysheetTableContent.stroke();
//                 }
//             }

//             if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {

//             }
//             else {
//                 let firstcolumlen = Store.defaultcollen;
//                 if (Store.config["columlen"] != null && Store.config["columlen"][c] != null) {
//                     firstcolumlen = Store.config["columlen"][c];
//                 }

//                 if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
//                     let value = Store.flowdata[r][c];

//                     if(getObjType(value) == "object" && ("mc" in value)){
//                         borderOffset[r + "_" + c] = { 
//                             "start_r": start_r,
//                             "start_c": start_c, 
//                             "end_r": end_r, 
//                             "end_c": end_c 
//                         };

//                         if("rs" in value["mc"]){
//                             let key = "r"+ r + "c" + c;
//                             mergeCache[key] = cellupdate.length;
//                         }
//                         else{
//                             let key = "r"+ value["mc"].r + "c" + value["mc"].c;
//                             let margeMain = cellupdate[mergeCache[key]];

//                             if(margeMain == null){
//                                 mergeCache[key] = cellupdate.length;
//                                 cellupdate.push({
//                                     "r": r, 
//                                     "c": c, 
//                                     "start_c": start_c, 
//                                     "start_r": start_r, 
//                                     "end_r": end_r, 
//                                     "end_c": end_c, 
//                                     "firstcolumlen": firstcolumlen, 
//                                     startlist: []
//                                 });
//                             }
//                             else{
//                                 if(margeMain.c == c){
//                                     margeMain.end_r += (end_r - start_r - 1);
//                                     margeMain.startlist.push(start_r);
//                                 }
                                
//                                 if(margeMain.r == r){
//                                     margeMain.end_c += (end_c - start_c);
//                                     margeMain.firstcolumlen += firstcolumlen;
//                                 }
//                             }

//                             continue;
//                         }
//                     }
//                 }

//                 cellupdate.push({
//                     "r": r, 
//                     "c": c, 
//                     "start_r": start_r, 
//                     "start_c": start_c, 
//                     "end_r": end_r, 
//                     "end_c": end_c, 
//                     "firstcolumlen": firstcolumlen, 
//                     startlist: []
//                 });
//                 borderOffset[r + "_" + c] = { 
//                     "start_r": start_r, 
//                     "start_c": start_c, 
//                     "end_r": end_r, 
//                     "end_c": end_c 
//                 };
//             }
//         }
//     }

//     //动态数组公式计算
//     let dynamicArray_compute = dynamicArrayCompute(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray"]);

//     //交替颜色计算
//     let af_compute = alternateformat.getComputeMap();

//     //条件格式计算
//     let cf_compute = conditionformat.getComputeMap();

//     //sparklines渲染
//     let sparklinesRender = function(r, c, offsetX, offsetY, canvasid, ctx){
//         if(Store.flowdata[r] == null || Store.flowdata[r][c] == null){
//             return;
//         }

//         let sparklines = Store.flowdata[r][c].spl;
//         if(sparklines != null){
//             if(typeof sparklines == "string"){
//                 sparklines = eval('('+ sparklines +')');
//             }

//             if(getObjType(sparklines) == "object"){
//                 let temp1 = sparklines;
//                 let x = temp1.offsetX;
//                 let y = temp1.offsetY;
//                 x = x == null ? 0 : x;
//                 y = y == null ? 0 : y;
//                 luckysheetSparkline.render(
//                     temp1.shapeseq, 
//                     temp1.shapes, 
//                     offsetX + x, 
//                     offsetY + y, 
//                     temp1.pixelWidth, 
//                     temp1.pixelHeight, 
//                     canvasid, 
//                     ctx
//                 );
//             }
//             else if(getObjType(sparklines) == "array" && getObjType(sparklines[0]) == "object"){
//                 for(let i = 0; i < sparklines.length; i++){
//                     let temp1 = sparklines[i];
//                     let x = temp1.offsetX;
//                     let y = temp1.offsetY;
//                     x = x == null ? 0 : x;
//                     y = y == null ? 0 : y;
//                     luckysheetSparkline.render(
//                         temp1.shapeseq, 
//                         temp1.shapes, 
//                         offsetX + x, 
//                         offsetY + y, 
//                         temp1.pixelWidth, 
//                         temp1.pixelHeight, 
//                         canvasid, 
//                         ctx
//                     );
//                 }
//             }
//         }
//     }

//     //空白单元格渲染 
//     let nullCellRender = function(r, c, start_r, start_c, end_r, end_c){
//         let checksAF = alternateformat.checksAF(r, c, af_compute); //交替颜色
//         let checksCF = conditionformat.checksCF(r, c, cf_compute); //条件格式

//         let borderfix = menuButton.borderfix(Store.flowdata, r, c);

//         //背景色
//         luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "bg");

//         if(checksAF != null && checksAF[1] != null){//交替颜色 
//             luckysheetTableContent.fillStyle = checksAF[1];
//         }

//         if(checksCF != null && checksCF["cellColor"] != null){//条件格式 
//             luckysheetTableContent.fillStyle = checksCF["cellColor"];
//         }

//         if(Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null){//标题色
//             luckysheetTableContent.fillStyle = Store.flowdata[r][c].tc;
//         }

//         let cellsize = [
//             Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
//             Store.devicePixelRatio * (start_r + offsetTop + 1 + borderfix[1]), 
//             Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
//             Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
//         ];
//         luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

//         if((r + "_" + c) in dynamicArray_compute){
//             let value = dynamicArray_compute[r + "_" + c].v;

//             luckysheetTableContent.fillStyle = "#000000";
//             //文本宽度和高度
//             let fontset = luckysheetdefaultstyle.font;
//             luckysheetTableContent.font = fontset;

//             let textMetrics = luckysheetTableContent.measureText(value).width;
//             let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

//             //水平对齐 (默认为1，左对齐)
//             let horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;

//             //垂直对齐 (默认为2，下对齐)
//             let verticalFixed = browser.luckysheetrefreshfixed();
//             let verticalAlignPos = (end_r + offsetTop - 2) * Store.devicePixelRatio; 
//             luckysheetTableContent.textBaseline = 'bottom';
            
//             luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos);
//         }

//         //若单元格有批注
//         if(Store.flowdata[r][c] != null && Store.flowdata[r][c].ps != null){
//             luckysheetTableContent.beginPath();
//             luckysheetTableContent.moveTo(Store.devicePixelRatio * (end_c + offsetLeft - 6), Store.devicePixelRatio * (start_r + offsetTop));
//             luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop));
//             luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop + 5));
//             luckysheetTableContent.fillStyle = "#FC6666";
//             luckysheetTableContent.fill();
//             luckysheetTableContent.closePath();
//         }

//         //右边框
//         luckysheetTableContent.beginPath();
//         luckysheetTableContent.moveTo(Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), Store.devicePixelRatio * (start_r + offsetTop));
//         luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), Store.devicePixelRatio * (end_r - 2 + offsetTop));
//         luckysheetTableContent.lineWidth = Store.devicePixelRatio;

//         if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
//             luckysheetTableContent.strokeStyle = "#000000";
//         }
//         else{
//             luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//         }
        
//         luckysheetTableContent.stroke();
//         luckysheetTableContent.closePath();

//         //下边框
//         luckysheetTableContent.beginPath();
//         luckysheetTableContent.moveTo(Store.devicePixelRatio * (start_c - 2 + offsetLeft), Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop));
//         luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 2), Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop));
//         luckysheetTableContent.lineWidth = Store.devicePixelRatio;

//         if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
//             luckysheetTableContent.strokeStyle = "#000000";
//         }
//         else{
//             luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//         }
        
//         luckysheetTableContent.stroke();
//         luckysheetTableContent.closePath();
//     }

//     //非空白单元格渲染
//     let cellRender = function(r, c, start_r, start_c, end_r, end_c, value, canvasType){
//         let checksAF = alternateformat.checksAF(r, c, af_compute); //交替颜色
//         let checksCF = conditionformat.checksCF(r, c, cf_compute); //条件格式

//         let borderfix = menuButton.borderfix(Store.flowdata, r, c);

//         //文本宽度和高度
//         let fontset = luckysheetfontformat(Store.flowdata[r][c]);
//         luckysheetTableContent.font = fontset;

//         let measureText = luckysheetTableContent.measureText(value);
//         let textMetrics = measureText.width;
//         // let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];
//         // let oneLineTextHeight = menuButton.getTextSize(value, fontset)[1];
//         let oneLineTextHeight = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;

//         let textW, textH; 

//         if(Store.flowdata[r][c].tb == "2"){
//             let strValue = value.toString();
//             let tbWidth = luckysheetTableContent.measureText(strValue).width;
//             let cellWidth = end_c - start_c - 8;

//             if(tbWidth > cellWidth){
//                 let strArr = [];//文本截断数组
//                 strArr = getCellTextSplitArr(strValue, strArr, cellWidth, luckysheetTableContent);
//                 textH = strArr.length * oneLineTextHeight;
//             }
//             else{
//                 textH = oneLineTextHeight;
//             }
//         }
//         else if(Store.flowdata[r][c].tr != null && Store.flowdata[r][c].tr != "0"){
//             let tr = Store.flowdata[r][c].tr;
                
//             if(tr == "1" || tr == "2"){
//                 textW = 0.707 * (textMetrics + oneLineTextHeight);
//                 textH = 0.707 * (textMetrics + oneLineTextHeight);
//             }
//             else if(tr == "3"){
//                 value = value.toString();
                
//                 let vArr;
//                 if(value.length > 1){
//                     vArr = value.split("");    
//                 }
//                 else{
//                     vArr = [];
//                     vArr.push(value);
//                 }
                
//                 textW = luckysheetTableContent.measureText(vArr[0]).width;
//                 textH = vArr.length * oneLineTextHeight;
//             }
//             else if(tr == "4" || tr == "5"){
//                 textW = oneLineTextHeight;
//                 textH = textMetrics;
//             }
//         }
//         else{
//             textW = textMetrics;
//             textH = oneLineTextHeight;
//         }

//         //水平对齐
//         let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c , "ht"); 
//         //垂直对齐
//         let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c , "vt"); 

//         //水平对齐方式是 居中或居右对齐 且单元格宽度小于文字宽度 （用离屏canvas渲染）
//         let canvasName, cellsize; 
//         if(browser.BrowserType() != "Safari" && (canvasType == "offline" || ((horizonAlign == "0" || horizonAlign == "2") && (end_c - start_c) < textW) || ((end_r - start_r) < textH))){
//             canvasName = offlinecanvas;
//             canvasName.font = fontset;

//             cellsize = [
//                 Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
//                 Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
//                 Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
//                 Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
//             ];
//         }
//         else{
//             canvasName = luckysheetTableContent;

//             cellsize = [
//                 Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
//                 Store.devicePixelRatio * (start_r + offsetTop + 1 + borderfix[1]), 
//                 Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
//                 Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
//             ];
//         }

//         //horizonAlign默认为1，左对齐
//         let horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio; 
//         if(horizonAlign == "0"){ 
//             //居中对齐
//             horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textMetrics) / 2;
//         }
//         else if(horizonAlign == "2"){ 
//             //右对齐
//             horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textMetrics);
//         }
        
//         //verticalAlign默认为2，下对齐
//         let verticalFixed = browser.luckysheetrefreshfixed();
//         let verticalAlignPos = (end_r + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight;
//         let verticalAlignPos_text = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio; 
//         canvasName.textBaseline = "bottom";
        
//         if(verticalAlign == "0"){
//             //居中对齐 
//             verticalAlignPos = (start_r + offsetTop + (end_r - start_r) / 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight / 2;
//             verticalAlignPos_text = (start_r + offsetTop + (end_r - start_r) / 2 + verticalFixed) * Store.devicePixelRatio;
//             canvasName.textBaseline = "middle";
//         }
//         else if(verticalAlign == "1"){
//             //上对齐 
//             verticalAlignPos = (start_r + offsetTop + 2 + verticalFixed) * Store.devicePixelRatio;
//             verticalAlignPos_text = (start_r + offsetTop + 2 + verticalFixed) * Store.devicePixelRatio;
//             canvasName.textBaseline = "top";
//         }
            
//         //单元格 背景颜色
//         canvasName.fillStyle= menuButton.checkstatus(Store.flowdata, r, c , "bg");
        
//         //若单元格有交替颜色 背景颜色
//         if(checksAF != null && checksAF[1] != null){ 
//             canvasName.fillStyle = checksAF[1];
//         }

//         //若单元格有条件格式 背景颜色
//         if(checksCF != null && checksCF["cellColor"] != null){ 
//             canvasName.fillStyle = checksCF["cellColor"];
//         }

//         //若单元格有标题色
//         if(Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null){
//             luckysheetTableContent.fillStyle = Store.flowdata[r][c].tc;
//         }
        
//         canvasName.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

//         //若单元格有批注
//         if(Store.flowdata[r][c].ps != null){
//             canvasName.beginPath();
//             canvasName.moveTo(Store.devicePixelRatio * (end_c + offsetLeft - 6), Store.devicePixelRatio * (start_r + offsetTop));
//             canvasName.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop));
//             canvasName.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 1), Store.devicePixelRatio * (start_r + offsetTop + 5));
//             canvasName.fillStyle = "#FC6666";
//             canvasName.fill();
//             canvasName.closePath();
//         }

//         //若单元格有条件格式数据条
//         if(checksCF != null && checksCF["dataBar"] != null){
//             let x = Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0] + 2);
//             let y = Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1] + 2);
//             let w = Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2] - 4);
//             let h = Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3] - 4);

//             let valueType = checksCF["dataBar"]["valueType"];
//             let valueLen = checksCF["dataBar"]["valueLen"];
//             let format = checksCF["dataBar"]["format"];

//             if(format.length > 1){ //渐变
//                 if(valueType == "minus"){
//                     //负数
//                     let minusLen = checksCF["dataBar"]["minusLen"];

//                     let my_gradient = canvasName.createLinearGradient(x + w * minusLen * (1 - valueLen), y, x + w * minusLen, y);
//                     my_gradient.addColorStop(0, "#ffffff");
//                     my_gradient.addColorStop(1, "#ff0000");
//                     canvasName.fillStyle = my_gradient;
//                     canvasName.fillRect(x + w * minusLen * (1 - valueLen), y, w * minusLen * valueLen, h);

//                     canvasName.beginPath();
//                     canvasName.moveTo(x + w * minusLen * (1 - valueLen), y);
//                     canvasName.lineTo(x + w * minusLen * (1 - valueLen), y + h);
//                     canvasName.lineTo(x + w * minusLen, y + h);
//                     canvasName.lineTo(x + w * minusLen, y);
//                     canvasName.lineTo(x + w * minusLen * (1 - valueLen), y);
//                     canvasName.lineWidth = Store.devicePixelRatio;
//                     canvasName.strokeStyle = "#ff0000";
//                     canvasName.stroke();
//                     canvasName.closePath();
//                 }
//                 else if(valueType == "plus"){
//                     //正数
//                     let plusLen = checksCF["dataBar"]["plusLen"];

//                     if(plusLen == 1){
//                         let my_gradient = canvasName.createLinearGradient(x, y, x + w * valueLen, y);
//                         my_gradient.addColorStop(0, format[0]);
//                         my_gradient.addColorStop(1, format[1]);
//                         canvasName.fillStyle = my_gradient;
//                         canvasName.fillRect(x, y, w * valueLen, h);

//                         canvasName.beginPath();
//                         canvasName.moveTo(x, y);
//                         canvasName.lineTo(x, y + h);
//                         canvasName.lineTo(x + w * valueLen, y + h);
//                         canvasName.lineTo(x + w * valueLen, y);
//                         canvasName.lineTo(x, y);
//                         canvasName.lineWidth = Store.devicePixelRatio;
//                         canvasName.strokeStyle = format[0];
//                         canvasName.stroke();
//                         canvasName.closePath();
//                     }
//                     else{
//                         let minusLen = checksCF["dataBar"]["minusLen"];

//                         let my_gradient = canvasName.createLinearGradient(x + w * minusLen, y, x + w * minusLen + w * plusLen * valueLen, y);
//                         my_gradient.addColorStop(0, format[0]);
//                         my_gradient.addColorStop(1, format[1]);
//                         canvasName.fillStyle = my_gradient;
//                         canvasName.fillRect(x + w * minusLen, y, w * plusLen * valueLen, h);

//                         canvasName.beginPath();
//                         canvasName.moveTo(x + w * minusLen, y);
//                         canvasName.lineTo(x + w * minusLen, y + h);
//                         canvasName.lineTo(x + w * minusLen + w * plusLen * valueLen, y + h);
//                         canvasName.lineTo(x + w * minusLen + w * plusLen * valueLen, y);
//                         canvasName.lineTo(x + w * minusLen, y);
//                         canvasName.lineWidth = Store.devicePixelRatio;
//                         canvasName.strokeStyle = format[0];
//                         canvasName.stroke();
//                         canvasName.closePath();
//                     }
//                 }
//             }
//             else{ //单色
//                 if(valueType == "minus"){
//                     //负数
//                     let minusLen = checksCF["dataBar"]["minusLen"];
                    
//                     canvasName.fillStyle = "#ff0000";
//                     canvasName.fillRect(x + w * minusLen * (1 - valueLen), y, w * minusLen * valueLen, h);

//                     canvasName.beginPath();
//                     canvasName.moveTo(x + w * minusLen * (1 - valueLen), y);
//                     canvasName.lineTo(x + w * minusLen * (1 - valueLen), y + h);
//                     canvasName.lineTo(x + w * minusLen, y + h);
//                     canvasName.lineTo(x + w * minusLen, y);
//                     canvasName.lineTo(x + w * minusLen * (1 - valueLen), y);
//                     canvasName.lineWidth = Store.devicePixelRatio;
//                     canvasName.strokeStyle = "#ff0000";
//                     canvasName.stroke();
//                     canvasName.closePath();
//                 }
//                 else if(valueType == "plus"){
//                     //正数
//                     let plusLen = checksCF["dataBar"]["plusLen"];

//                     if(plusLen == 1){
//                         canvasName.fillStyle = format[0];
//                         canvasName.fillRect(x, y, w * valueLen, h);

//                         canvasName.beginPath();
//                         canvasName.moveTo(x, y);
//                         canvasName.lineTo(x, y + h);
//                         canvasName.lineTo(x + w * valueLen, y + h);
//                         canvasName.lineTo(x + w * valueLen, y);
//                         canvasName.lineTo(x, y);
//                         canvasName.lineWidth = Store.devicePixelRatio;
//                         canvasName.strokeStyle = format[0];
//                         canvasName.stroke();
//                         canvasName.closePath();
//                     }
//                     else{
//                         let minusLen = checksCF["dataBar"]["minusLen"];

//                         canvasName.fillStyle = format[0];
//                         canvasName.fillRect(x + w * minusLen, y, w * plusLen * valueLen, h);

//                         canvasName.beginPath();
//                         canvasName.moveTo(x + w * minusLen, y);
//                         canvasName.lineTo(x + w * minusLen, y + h);
//                         canvasName.lineTo(x + w * minusLen + w * plusLen * valueLen, y + h);
//                         canvasName.lineTo(x + w * minusLen + w * plusLen * valueLen, y);
//                         canvasName.lineTo(x + w * minusLen, y);
//                         canvasName.lineWidth = Store.devicePixelRatio;
//                         canvasName.strokeStyle = format[0];
//                         canvasName.stroke();
//                         canvasName.closePath();
//                     }
//                 }
//             }
//         }

//         //若单元格有条件格式图标集
//         if(checksCF != null && checksCF["icons"] != null){
//             let l = checksCF["icons"]["left"];
//             let t = checksCF["icons"]["top"];

//             canvasName.drawImage(
//                 luckysheet_CFiconsImg, 
//                 l * 42, 
//                 t * 32, 
//                 32, 
//                 32, 
//                 cellsize[0], 
//                 verticalAlignPos + 2,  
//                 oneLineTextHeight - 2, 
//                 oneLineTextHeight - 2
//             );
            
//             if(horizonAlign != "0" && horizonAlign != "2"){ //左对齐时 文本渲染空出一个图标的距离
//                 horizonAlignPos = horizonAlignPos + oneLineTextHeight - 2;
//             }
//         }

//         //单元格 文本颜色
//         canvasName.fillStyle = menuButton.checkstatus(Store.flowdata, r, c , "fc");
        
//         //若单元格有交替颜色 文本颜色
//         if(checksAF != null && checksAF[0] != null){ 
//             canvasName.fillStyle = checksAF[0];
//         }
        
//         //若单元格有条件格式 文本颜色
//         if(checksCF != null && checksCF["textColor"] != null){ 
//             canvasName.fillStyle = checksCF["textColor"];
//         }

//         //单元格有下钻属性，文本颜色变成超链接的颜色
//         if(Store.flowdata[r][c].dd != null){
//             canvasName.fillStyle = "#0000ff";

//             canvasName.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos_text);

//             canvasName.beginPath();
//             canvasName.strokeStyle = "#0000ff";
//             canvasName.moveTo(horizonAlignPos, verticalAlignPos + oneLineTextHeight);
//             canvasName.lineTo(horizonAlignPos + textMetrics, verticalAlignPos + oneLineTextHeight);
//             canvasName.closePath();
//             canvasName.stroke();
//         }
//         else{
//             //自动换行、旋转、删除线功能
//             if(Store.flowdata[r][c].tb == "2"){
//                 canvasName.textBaseline = 'top'; //自动换行 textBaseline以top计算

//                 let strValue = value.toString();
//                 let cellWidth = end_c - start_c - 8;

//                 let strArr = [];//文本截断数组
//                 strArr = getCellTextSplitArr(strValue, strArr, cellWidth, canvasName);

//                 for(let iFill = 0; iFill < strArr.length; iFill++){
//                     //水平对齐计算
//                     let strWidth = canvasName.measureText(strArr[iFill]).width;
//                     if(horizonAlign == "0"){
//                         horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (strWidth)/2;
//                     }
//                     else if(horizonAlign == "2"){
//                         horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (strWidth);
//                     }
                    
//                     //垂直对齐计算
//                     if(verticalAlign == "0"){
//                         verticalAlignPos = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * strArr.length / 2;
//                     }
//                     else if(verticalAlign == "1"){
//                         verticalAlignPos = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
//                     }
//                     else{
//                         verticalAlignPos = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * strArr.length;
//                     }

//                     canvasName.fillText(strArr[iFill], horizonAlignPos, (verticalAlignPos + iFill * oneLineTextHeight));
//                 }
//             }
//             else if(Store.flowdata[r][c].tr != null && Store.flowdata[r][c].tr != "0"){
//                 canvasName.textBaseline = 'top'; //旋转 textBaseline以top计算

//                 //单元格旋转属性
//                 let tr = Store.flowdata[r][c].tr;
                
//                 if(tr == "1" || tr == "2"){
//                     //旋转重新计算水平、垂直方向坐标
//                     let textW = 0.707 * (textMetrics + oneLineTextHeight);
//                     let textH = 0.707 * (textMetrics + oneLineTextHeight);

//                     let hAP = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
//                     if(horizonAlign == "0"){
//                         hAP = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textW) / 2;
//                     }
//                     else if(horizonAlign == "2"){
//                         hAP = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textW);
//                     }

//                     let vAP = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - textH;
//                     if(verticalAlign == "0"){
//                         vAP = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - textH / 2;
//                     }
//                     else if(verticalAlign == "1"){
//                         vAP = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
//                     }
                    
//                     //向下倾斜（45 旋转）
//                     if(tr == "1"){
//                         canvasName.save();
//                         canvasName.translate(hAP, vAP);
//                         canvasName.rotate(45 * Math.PI / 180);
//                         canvasName.translate(-hAP, -vAP);
//                         canvasName.fillText(value == null ? "" : value, hAP + (0.707 * 0.707 * oneLineTextHeight), vAP - (0.707 * 0.707 * oneLineTextHeight));
//                         canvasName.restore();

//                         //是否有删除线
//                         let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                         if(cl == "1" && !isRealNull(value)){
//                             canvasName.beginPath();
//                             canvasName.strokeStyle = "#000";
//                             canvasName.moveTo(hAP + oneLineTextHeight / 2, vAP + oneLineTextHeight / 2);
//                             canvasName.lineTo(hAP + textW - oneLineTextHeight / 2, vAP + textH - oneLineTextHeight / 2);
//                             canvasName.closePath();
//                             canvasName.stroke();
//                         }
//                     }
                    
//                     //向上倾斜（-45 旋转）
//                     if(tr == "2"){
//                         canvasName.save();
//                         canvasName.translate(hAP, vAP + textH);
//                         canvasName.rotate(-45 * Math.PI / 180);
//                         canvasName.translate(-hAP, -(vAP + textH));
//                         canvasName.fillText(value == null ? "" : value, hAP + (0.707 * 0.707 * oneLineTextHeight), vAP + textH - (0.707 * 0.707 * oneLineTextHeight));
//                         canvasName.restore();
                        
//                         //是否有删除线
//                         let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                         if(cl == "1" && !isRealNull(value)){
//                             canvasName.beginPath();
//                             canvasName.strokeStyle = "#000";
//                             canvasName.moveTo(hAP + oneLineTextHeight / 2, vAP + textH - oneLineTextHeight / 2);
//                             canvasName.lineTo(hAP + textW - oneLineTextHeight / 2, vAP + oneLineTextHeight / 2);
//                             canvasName.closePath();
//                             canvasName.stroke();
//                         }
//                     }
//                 }
//                 else if(tr == "3"){
//                     if(!isRealNull(value)){
//                         value = value.toString();
                        
//                         let vArr;
//                         if(value.length > 1){
//                             vArr = value.split("");    
//                         }
//                         else{
//                             vArr = [];
//                             vArr.push(value);
//                         }
                        
//                         let textW = canvasName.measureText(vArr[0]).width;
//                         let textH = vArr.length * oneLineTextHeight;
                        
//                         for(let i = 0; i < vArr.length; i++){
//                             let vWidth = canvasName.measureText(vArr[i]).width;
                            
//                             //水平对齐计算
//                             if(horizonAlign == "0"){
//                                 horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (vWidth)/2;
//                             }
//                             else if(horizonAlign == "2"){
//                                 horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (vWidth);
//                             }
//                             else{
//                                 horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
//                             }
                            
//                             //垂直对齐计算
//                             if(verticalAlign == "0"){
//                                 verticalAlignPos = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * vArr.length/2;
//                             }
//                             else if(verticalAlign == "1"){
//                                 verticalAlignPos = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
//                             }
//                             else{
//                                 verticalAlignPos = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * vArr.length;
//                             }
                            
//                             canvasName.fillText(vArr[i], horizonAlignPos, (verticalAlignPos + i * oneLineTextHeight));
//                         }
                        
//                         //是否有删除线
//                         let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                         if(cl == "1" && !isRealNull(value)){
//                             canvasName.beginPath();
//                             canvasName.strokeStyle = "#000";
//                             canvasName.moveTo(horizonAlignPos + textW / 2, verticalAlignPos);
//                             canvasName.lineTo(horizonAlignPos + textW / 2, verticalAlignPos + textH);
//                             canvasName.closePath();
//                             canvasName.stroke();
//                         }
//                     }
//                 }
//                 else if(tr == "4" || tr == "5"){
//                     //旋转重新计算水平、垂直方向坐标
//                     let textW = oneLineTextHeight;
//                     let textH = textMetrics;

//                     let hAP = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
//                     if(horizonAlign == "0"){
//                         hAP = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textW) / 2;
//                     }
//                     else if(horizonAlign == "2"){
//                         hAP = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textW);
//                     }

//                     let vAP = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - textH;
//                     if(verticalAlign == "0"){
//                         vAP = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - textH / 2;
//                     }
//                     else if(verticalAlign == "1"){
//                         vAP = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
//                     }
                    
//                     //向下90（90 旋转）
//                     if(tr == "4"){
//                         canvasName.save();
//                         canvasName.translate(hAP, vAP);
//                         canvasName.rotate(90 * Math.PI / 180);
//                         canvasName.translate(-hAP, -vAP);
//                         canvasName.fillText(value == null ? "" : value, hAP, vAP - textW);
//                         canvasName.restore();

//                         //是否有删除线
//                         let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                         if(cl == "1" && !isRealNull(value)){
//                             canvasName.beginPath();
//                             canvasName.strokeStyle = "#000";
//                             canvasName.moveTo(hAP + textW / 2, vAP);
//                             canvasName.lineTo(hAP + textW / 2, vAP + textH);
//                             canvasName.closePath();
//                             canvasName.stroke();
//                         }
//                     }
                    
//                     //向上90（-90 旋转）
//                     if(tr == "5"){
//                         canvasName.save();
//                         canvasName.translate(hAP + textH, vAP);
//                         canvasName.rotate(-90 * Math.PI / 180);
//                         canvasName.translate(-(hAP + textH), -vAP);
//                         canvasName.fillText(value == null ? "" : value, hAP, vAP - textH);
//                         canvasName.restore();

//                         //是否有删除线
//                         let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                         if(cl == "1" && !isRealNull(value)){
//                             canvasName.beginPath();
//                             canvasName.strokeStyle = "#000";
//                             canvasName.moveTo(hAP + textW / 2, vAP);
//                             canvasName.lineTo(hAP + textW / 2, vAP + textH);
//                             canvasName.closePath();
//                             canvasName.stroke();
//                         }
//                     }
//                 }
//             }
//             else{
//                 canvasName.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos_text);
                
//                 //是否有删除线
//                 let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
//                 if(cl == "1" && !isRealNull(value)){
//                     canvasName.beginPath();
//                     canvasName.strokeStyle = "#000";
//                     canvasName.moveTo(horizonAlignPos, verticalAlignPos + oneLineTextHeight / 2);
//                     canvasName.lineTo(horizonAlignPos + textMetrics, verticalAlignPos + oneLineTextHeight / 2);
//                     canvasName.closePath();
//                     canvasName.stroke();
//                 }
//             }
//         }

//         //水平对齐方式是 居中或居右对齐 且单元格宽度小于文字宽度 （用离屏canvas渲染）
//         if(browser.BrowserType() != "Safari" && (canvasType == "offline" || ((horizonAlign == "0" || horizonAlign == "2") && (end_c - start_c) < textW) || ((verticalAlign == "0" || verticalAlign == "2") && (end_r - start_r) < textH))){
//             canvasName.font = luckysheetdefaultstyle.font;
            
//             if($("#luckysheetTableContentF").length > 0){
//                 luckysheetTableContent.drawImage($("#luckysheetTableContentF").get(0), cellsize[0], cellsize[1], cellsize[2], cellsize[3], cellsize[0], cellsize[1], cellsize[2], cellsize[3]);
//             }
//             else{
//                 luckysheetTableContent.drawImage(offlineElement, cellsize[0], cellsize[1], cellsize[2], cellsize[3], cellsize[0], cellsize[1], cellsize[2], cellsize[3]);
//             }
//         }

//         luckysheetTableContent.font = luckysheetdefaultstyle.font;

//         //右边框
//         luckysheetTableContent.beginPath();
//         luckysheetTableContent.moveTo(Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), Store.devicePixelRatio * (start_r + offsetTop));
//         luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), Store.devicePixelRatio * (end_r - 2 + offsetTop));
//         luckysheetTableContent.lineWidth = Store.devicePixelRatio;

//         if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
//             luckysheetTableContent.strokeStyle = "#000000";
//         }
//         else{
//             luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//         }
        
//         luckysheetTableContent.stroke();
//         luckysheetTableContent.closePath();

//         //下边框
//         luckysheetTableContent.beginPath();
//         luckysheetTableContent.moveTo(Store.devicePixelRatio * (start_c - 2 + offsetLeft), Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop));
//         luckysheetTableContent.lineTo(Store.devicePixelRatio * (end_c + offsetLeft - 2), Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop));
//         luckysheetTableContent.lineWidth = Store.devicePixelRatio;

//         if (!!Store.luckysheetcurrentisPivotTable && !pivotTable.drawPivotTable) {
//             luckysheetTableContent.strokeStyle = "#000000";
//         }
//         else{
//             luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
//         }
        
//         luckysheetTableContent.stroke();
//         luckysheetTableContent.closePath();
//     }

//     let mcArr = [];

//     for(let cud = 0; cud < cellupdate.length; cud++){
//         let item = cellupdate[cud];
//         let r = item.r, 
//             c = item.c, 
//             start_r = item.start_r, 
//             start_c = item.start_c, 
//             end_r = item.end_r, 
//             end_c = item.end_c;
//         let firstcolumlen = item.firstcolumlen;

//         if(Store.flowdata[r] == null){
//             continue;
//         }
        
//         if(Store.flowdata[r][c] == null){ //空单元格
//             nullCellRender(r, c, start_r, start_c, end_r, end_c);
//         }
//         else{
//             let cell = Store.flowdata[r][c];
//             let value = null, er = r, ec = c, end_ec = end_c;

//             if((typeof cell == "object") && "mc" in cell){
//                 mcArr.push(cellupdate[cud]);

//                 let margeMaindata = cell["mc"];
//                 value = getcellvalue(margeMaindata.r, margeMaindata.c, null, "m");
                
//                 if(value == null){
//                     value = getcellvalue(margeMaindata.r, margeMaindata.c);
//                 }

//                 r = margeMaindata.r;
//                 c = margeMaindata.c;

//                 er += margeMaindata.rs;
//                 ec += margeMaindata.rc;

//                 if (c == 0) {
//                     start_c = -scrollWidth;
//                 }
//                 else {
//                     start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
//                 }

//                 if (r == 0) {
//                     start_r = -scrollHeight - 1;
//                 }
//                 else {
//                     start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
//                 }

//                 end_ec = Store.visibledatacolumn[ec] - scrollWidth;
//             }
//             else{
//                 value = getcellvalue(r, c, null, "m");
//                 if(value == null){
//                     value = getcellvalue(r, c);
//                 }
//             }  

//             if(value == null || value.toString().length == 0){
//                 nullCellRender(r, c, start_r, start_c, end_r, end_c);
                
//                 //sparklines渲染
//                 let borderfix = menuButton.borderfix(Store.flowdata, r, c);
//                 let cellsize = [
//                     Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
//                     Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
//                     Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
//                     Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
//                 ];
//                 sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
//             }
//             else{
//                 if((r + "_" + c) in dynamicArray_compute){//动态数组公式
//                     value = dynamicArray_compute[r + "_" + c].v;
//                 }

//                 cellRender(r, c, start_r, start_c, end_r, end_c, value);
//             }
//         }
//     }

//     //合并单元格再处理
//     for(let m = 0; m < mcArr.length; m++){
//         let item = mcArr[m];
//         let r = item.r, 
//             c = item.c, 
//             start_r = item.start_r, 
//             start_c = item.start_c, 
//             end_r = item.end_r, 
//             end_c = item.end_c;
//         let firstcolumlen = item.firstcolumlen;

//         let cell = Store.flowdata[r][c];
//         let value = null, er = r, ec = c, end_ec = end_c;

//         let margeMaindata = cell["mc"];
//         value = getcellvalue(margeMaindata.r, margeMaindata.c, null, "m");
        
//         if(value == null){
//             value = getcellvalue(margeMaindata.r, margeMaindata.c);
//         }

//         r = margeMaindata.r;
//         c = margeMaindata.c;

//         er += margeMaindata.rs;
//         ec += margeMaindata.rc;

//         if (c == 0) {
//             start_c = -scrollWidth;
//         }
//         else {
//             start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
//         }

//         if (r == 0) {
//             start_r = -scrollHeight - 1;
//         }
//         else {
//             start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
//         }

//         end_ec = Store.visibledatacolumn[ec] - scrollWidth;

//         if(value == null || value.toString().length == 0){
//             nullCellRender(r, c, start_r, start_c, end_r, end_c);
            
//             //sparklines渲染
//             let borderfix = menuButton.borderfix(Store.flowdata, r, c);
//             let cellsize = [
//                 Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
//                 Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
//                 Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
//                 Store.devicePixelRatio * (end_r - start_r - 3 - 0.5 + borderfix[3])
//             ];
//             sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
//         }
//         else{
//             if((r + "_" + c) in dynamicArray_compute){//动态数组公式
//                 value = dynamicArray_compute[r + "_" + c].v;
//             }

//             cellRender(r, c, start_r, start_c, end_r, end_c, value, "offline");
//         }
//     }

//     //边框单独渲染
//     if(Store.config["borderInfo"] != null && Store.config["borderInfo"].length > 0){
//         //边框渲染
//         let borderLeftRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
//             let linetype = style;

//             let m_st = Store.devicePixelRatio * (start_c - 2 + 0.5 + offsetLeft);
//             let m_ed = Store.devicePixelRatio * (start_r + offsetTop);
//             let line_st = Store.devicePixelRatio * (start_c - 2 + 0.5 + offsetLeft);
//             let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

//             menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

//             canvas.strokeStyle = color;
            
//             canvas.stroke();
//             canvas.closePath();
//             canvas.restore();
//         }

//         let borderRightRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
//             let linetype = style;

//             let m_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
//             let m_ed = Store.devicePixelRatio * (start_r + offsetTop);
//             let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
//             let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

//             menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

//             canvas.strokeStyle = color;
            
//             canvas.stroke();
//             canvas.closePath();
//             canvas.restore();
//         }

//         let borderBottomRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
//             let linetype = style;

//             let m_st = Store.devicePixelRatio * (start_c - 2 + offsetLeft);
//             let m_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);
//             let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
//             let line_ed = Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop);

//             menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

//             canvas.strokeStyle = color;
            
//             canvas.stroke();
//             canvas.closePath();
//             canvas.restore();
//         }

//         let borderTopRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas){
//             let linetype = style;

//             let m_st = Store.devicePixelRatio * (start_c - 2 + offsetLeft);
//             let m_ed = Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop);
//             let line_st = Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft);
//             let line_ed = Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop);

//             menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

//             canvas.strokeStyle = color;
            
//             canvas.stroke();
//             canvas.closePath();
//             canvas.restore();
//         }

//         let borderInfoCompute = getBorderInfoCompute();
        
//         for(let x in borderInfoCompute){
//             let bd_r = x.split("_")[0], bd_c = x.split("_")[1];

//             if(borderOffset[bd_r + "_" + bd_c]){
//                 let start_r = borderOffset[bd_r + "_" + bd_c].start_r;
//                 let start_c = borderOffset[bd_r + "_" + bd_c].start_c;
//                 let end_r = borderOffset[bd_r + "_" + bd_c].end_r;
//                 let end_c = borderOffset[bd_r + "_" + bd_c].end_c;

//                 let borderLeft = borderInfoCompute[x].l;
//                 if(borderLeft != null){
//                     borderLeftRender(borderLeft.style, borderLeft.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
//                 }

//                 let borderRight = borderInfoCompute[x].r;
//                 if(borderRight != null){
//                     borderRightRender(borderRight.style, borderRight.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
//                 }

//                 let borderTop = borderInfoCompute[x].t;
//                 if(borderTop != null){
//                     borderTopRender(borderTop.style, borderTop.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
//                 }

//                 let borderBottom = borderInfoCompute[x].b;
//                 if(borderBottom != null){
//                     borderBottomRender(borderBottom.style, borderBottom.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
//                 }
//             }
//         }
//     }

//     //渲染表格时有尾列时，清除右边灰色区域，防止表格有值溢出
//     if(dataset_col_ed == Store.visibledatacolumn.length - 1){
//         luckysheetTableContent.clearRect(
//             (fill_col_ed - scrollWidth + offsetLeft - 1) * Store.devicePixelRatio, 
//             (offsetTop - 1) * Store.devicePixelRatio, 
//             (Store.ch_width - Store.visibledatacolumn[dataset_col_ed]) * Store.devicePixelRatio, 
//             (fill_row_ed - scrollHeight) * Store.devicePixelRatio
//         );
//     }

//     if(ctx != null){
//         ctx.drawImage(
//             luckysheetTableElement, 
//             0, 
//             0, 
//             drawWidth, 
//             drawHeight, 
//             -drawWidth/2 + offsetLeft, 
//             -drawHeight/2 + offsetTop, 
//             drawWidth, 
//             drawHeight
//         );
//     }
// }

function luckysheetDrawMain_back(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop, columnOffsetCell, rowOffsetCell, mycanvas) {
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
        offsetLeft * Store.devicePixelRatio, 
        offsetTop * Store.devicePixelRatio, 
        drawWidth * Store.devicePixelRatio, 
        drawHeight * Store.devicePixelRatio
    );

    //离屏canvas
    let offlinecanvas = $("#luckysheetTableContentF").get(0).getContext("2d");
    offlinecanvas.fillStyle = "#ffffff";
    offlinecanvas.fillRect(
        0, 
        0, 
        Store.luckysheetTableContentHW[0] * Store.devicePixelRatio, 
        Store.luckysheetTableContentHW[1] * Store.devicePixelRatio
    );

    offlinecanvas.font = luckysheetdefaultstyle.font;
    offlinecanvas.textBaseline = "top";
    offlinecanvas.fillStyle = luckysheetdefaultstyle.fillStyle;

    let dataset_row_st, dataset_row_ed, dataset_col_st, dataset_col_ed;

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

    let fill_row_st, fill_row_ed, fill_col_st, fill_col_ed;
    if(dataset_row_st==0){
        fill_row_st = 0;
    }
    else{
        fill_row_st = Store.visibledatarow[dataset_row_st-1];
    }

    fill_row_ed = Store.visibledatarow[dataset_row_ed];

    if(dataset_col_st==0){
        fill_col_st = 0;
    }
    else{
        fill_col_st = Store.visibledatacolumn[dataset_col_st-1];
    }

    fill_col_ed = Store.visibledatacolumn[dataset_col_ed];

    luckysheetTableContent.fillStyle="#ffffff";
    luckysheetTableContent.fillRect(
        (offsetLeft - 1) * Store.devicePixelRatio, 
        (offsetTop - 1) * Store.devicePixelRatio, 
        (fill_col_ed - fill_col_st) * Store.devicePixelRatio, 
        (fill_row_ed - fill_row_st) * Store.devicePixelRatio
    );

    let end_r, start_r, end_c, start_c;
    
    let cellupdate = [];
    let mergeCache = {};
    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        if (r == 0) {
            start_r = -scrollHeight - 1;
        }
        else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        end_r = Store.visibledatarow[r] - scrollHeight;
        
        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            if (c == 0) {
                start_c = -scrollWidth;
            }
            else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }
            end_c = Store.visibledatacolumn[c] - scrollWidth;

            if(c==dataset_col_ed){
                if (!Store.luckysheetcurrentisPivotTable && end_r <= drawHeight && start_r >= -1) {
                    //行
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio * (offsetLeft - 1), 
                        Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio * (end_c + offsetLeft-2), 
                        Store.devicePixelRatio * (end_r + offsetTop - 2 + 0.5)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }
            }

            if (r == dataset_row_st) {
                if (!Store.luckysheetcurrentisPivotTable && end_c <= drawWidth + 18 && start_c >= -1) {
                    //列
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                        Store.devicePixelRatio * (offsetTop - 1)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio * (end_c + offsetLeft - 2 + 0.5), 
                        Store.devicePixelRatio * (fill_row_ed - fill_row_st + offsetTop-2)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }
            }

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
                        Store.devicePixelRatio * (end_c + offsetLeft-2), 
                        Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }

                if (r == 6 && c == 3) {
                    luckysheetTableContent.fillText(
                        "数据透视表", 
                        Store.devicePixelRatio * (start_c + 4 + offsetLeft), 
                        Store.devicePixelRatio * (start_r + (end_r - start_r) / 2 - 1 + offsetTop)
                    );
                }
            }
            else if (!!Store.luckysheetcurrentisPivotTable) {
                if (c < pivotTable.pivotTableBoundary[1] && r < pivotTable.pivotTableBoundary[0]) {
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

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(
                        Store.devicePixelRatio * (start_c - 1 + offsetLeft), 
                        Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
                    );
                    luckysheetTableContent.lineTo(
                        Store.devicePixelRatio * (end_c + offsetLeft - 2), 
                        Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop));
                    luckysheetTableContent.lineWidth = Store.devicePixelRatio;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }
            }

            if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {

            }
            else {
                if (Store.flowdata[r] != null && Store.flowdata[r][c] != null && start_r >= -1 && start_c >= -1 ) {
                    let value = Store.flowdata[r][c];

                    let firstcolumlen = Store.defaultcollen;
                    if (Store.config["columlen"] != null && Store.config["columlen"][c] != null) {
                        firstcolumlen = Store.config["columlen"][c];
                    }

                    if(getObjType(value) == "object" && ("mc" in value)){
                        if("rs" in value["mc"]){
                            let key = "r"+ r + "c" + c;
                            mergeCache[key] = cellupdate.length;
                        }
                        else{
                            let key = "r"+ value["mc"].r + "c" + value["mc"].c;
                            let margeMain = cellupdate[mergeCache[key]];

                            if(margeMain==null){
                                mergeCache[key] = cellupdate.length;
                                cellupdate.push({
                                    "r": r, 
                                    "c": c,
                                    "start_c": start_c, 
                                    "start_r": start_r, 
                                    "end_r": end_r, 
                                    "end_c": end_c, 
                                    "firstcolumlen": firstcolumlen, 
                                    "startlist": []
                                });
                            }
                            else{
                                if(margeMain.c==c){
                                    margeMain.end_r += (end_r-start_r-1);
                                    margeMain.startlist.push(start_r);
                                }
                                
                                if(margeMain.r==r){
                                    margeMain.end_c += (end_c-start_c);
                                    margeMain.firstcolumlen += firstcolumlen;
                                }
                                

                                let margeMaindata = Store.flowdata[margeMain.r][margeMain.c];
                                if((margeMain.c + margeMaindata.mc.cs-1)==c && (margeMain.r + margeMaindata.mc.rs-1)==r){
                                    //margeMain.end_r -= 10;
                                    //margeMain.end_c -= 1;
                                }
                            }

                            continue;
                        }
                    }
                    cellupdate.push({
                        "r": r, 
                        "c": c,
                        "start_c": start_c, 
                        "start_r": start_r, 
                        "end_r": end_r, 
                        "end_c": end_c, 
                        "firstcolumlen": firstcolumlen, 
                        "startlist": []
                    });
                }
            }
        }
    }

    for(let cud = 0; cud < cellupdate.length; cud++){
        let item = cellupdate[cud];
        let r= item.r, 
            c = item.c, 
            start_c = item.start_c, 
            start_r = item.start_r, 
            end_c = item.end_c, 
            end_r = item.end_r;
        let firstcolumlen = item.firstcolumlen;
        
        let cell = Store.flowdata[r][c];
        let value = null, er = r, ec = c, end_ec = end_c;
        if((typeof cell == "object") && "mc" in cell){
            let margeMaindata = cell["mc"];
            value = getcellvalue(margeMaindata.r, margeMaindata.c, null,"m");
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
            value = getcellvalue(r, c, null,"m");
            if(value == null){
                value = getcellvalue(r, c);
            }
        }

        let borderfix = menuButton.borderfix(Store.flowdata, r, c);
        offlinecanvas.fillStyle= menuButton.checkstatus(Store.flowdata, r, c , "bg");

        let cellsize = [
            Store.devicePixelRatio * (start_c + offsetLeft + borderfix[0]), 
            Store.devicePixelRatio * (start_r + offsetTop + 0.5 + borderfix[1]), 
            Store.devicePixelRatio * (end_c - start_c - 3 + borderfix[2]), 
            Store.devicePixelRatio * (end_r - start_r-3 - 0.5 + borderfix[3])
        ];
        offlinecanvas.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

        offlinecanvas.fillStyle= menuButton.checkstatus(Store.flowdata, r, c , "fc");

        let fontset = luckysheetfontformat(Store.flowdata[r][c]);
        offlinecanvas.font = fontset;

        let textMetrics = offlinecanvas.measureText(value).width;
        let oneLineTextHeight = menuButton.getTextSize("田", fontset)[1];

        offlinecanvas.fillStyle= menuButton.checkstatus(Store.flowdata, r, c , "fc");

        let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c , "ht");
        let horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
        if(horizonAlign == "0"){
            horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textMetrics)/2;
        }
        else if(horizonAlign=="2"){
            horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textMetrics);
        }

        let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c , "vt");
        let verticalFixed = browser.luckysheetrefreshfixed();
        let verticalAlignPos = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight;
        if(verticalAlign == "0"){
            verticalAlignPos = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight/2;
        }
        else if(verticalAlign == "1"){
            verticalAlignPos = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
        }

        //自动换行、旋转、删除线功能
        if(Store.flowdata[r][c].tb == "2" && textMetrics > (end_c - start_c)){
            let strValue = value.toString();
            let cellWidth = end_c-start_c-8;
            let strArr = [];

            for(let strI = 1; strI <= strValue.length; strI++){
                let strV = strValue.substring(strArr.join("").length,strI);
                let strtextMetrics = offlinecanvas.measureText(strV).width;
                if(strtextMetrics > cellWidth){
                    strArr.push(strValue.substring(strArr.join("").length,strI - 1));
                    strI = strI - 2;
                }
                else if(strtextMetrics <= cellWidth && strI == strValue.length){
                    strArr.push(strV);
                }
            }

            for(let iFill = 0; iFill < strArr.length; iFill++){
                //水平对齐计算
                let strWidth = offlinecanvas.measureText(strArr[iFill]).width;
                if(horizonAlign == "0"){
                    horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (strWidth)/2;
                }
                else if(horizonAlign == "2"){
                    horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (strWidth);
                }
                else{
                    horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
                }

                //垂直对齐计算
                if(verticalAlign == "0"){
                    verticalAlignPos = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * strArr.length / 2;
                }
                else if(verticalAlign == "1"){
                    verticalAlignPos = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
                }
                else{
                    verticalAlignPos = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight * strArr.length;
                }

                offlinecanvas.fillText(strArr[iFill], horizonAlignPos, (verticalAlignPos + iFill * Store.oneLineTextHeight));
            }
        }
        else if(!!Store.flowdata[r][c].tr && Store.flowdata[r][c].tr != "0"){
            //单元格旋转属性
            let tr = Store.flowdata[r][c].tr;

            if(tr == "1" || tr == "2"){
                //旋转重新计算水平、垂直方向坐标
                let textW = 0.707 * (textMetrics + oneLineTextHeight);
                let textH = 0.707 * (textMetrics + oneLineTextHeight);

                let hAP = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
                if(horizonAlign=="0"){
                    hAP = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textW)/2;
                }
                else if(horizonAlign=="2"){
                    hAP = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textW);
                }

                let vAP = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - textH;
                if(verticalAlign=="0"){
                    vAP = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - textH/2;
                }
                else if(verticalAlign=="1"){
                    vAP = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
                }

                //向下倾斜（45 旋转）
                if(tr == "1"){
                    offlinecanvas.save();
                    offlinecanvas.translate(hAP, vAP);
                    offlinecanvas.rotate(45 * Math.PI / 180);
                    offlinecanvas.translate(-hAP, -vAP);
                    offlinecanvas.fillText(
                        value == null ? "" : value, 
                        hAP + (0.707 * 0.707 * oneLineTextHeight), 
                        vAP - (0.707 * 0.707 * oneLineTextHeight)
                    );
                    offlinecanvas.restore();

                    //是否有删除线
                    let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
                    if(cl == "1" && !!value){
                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(hAP + oneLineTextHeight/2, vAP + oneLineTextHeight/2);
                        offlinecanvas.lineTo(hAP + textW - oneLineTextHeight/2, vAP + textH - oneLineTextHeight/2);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
                //向上倾斜（-45 旋转）
                if(tr == "2"){
                    offlinecanvas.save();
                    offlinecanvas.translate(hAP + textW, vAP);
                    offlinecanvas.rotate(-45 * Math.PI / 180);
                    offlinecanvas.translate(-(hAP + textW), -vAP);
                    offlinecanvas.fillText(
                        value == null ? "" : value, 
                        hAP - (0.707 * 0.707 * oneLineTextHeight), 
                        vAP - (0.707 * 0.707 * oneLineTextHeight)
                    );
                    offlinecanvas.restore();
                    
                    //是否有删除线
                    let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
                    if(cl == "1" && !!value){
                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(hAP + oneLineTextHeight/2, vAP + textH - oneLineTextHeight/2);
                        offlinecanvas.lineTo(hAP + textW - oneLineTextHeight/2, vAP + oneLineTextHeight/2);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
            }
            else if(tr == "3"){
                if(!!value){
                    value = value.toString();
                    
                    let vArr;
                    if(value.length > 1){
                        vArr = value.split("");    
                    }
                    else{
                        vArr = [];
                        vArr.push(value);
                    }
                    
                    let textW = offlinecanvas.measureText(vArr[0]).width;
                    let textH = vArr.length * oneLineTextHeight;

                    for(let i = 0; i < vArr.length; i++){
                        let vWidth = offlinecanvas.measureText(vArr[i]).width;

                        //水平对齐计算
                        if(horizonAlign == "0"){
                            horizonAlignPos = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (vWidth)/2;
                        }
                        else if(horizonAlign == "2"){
                            horizonAlignPos = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (vWidth);
                        }
                        else{
                            horizonAlignPos = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
                        }

                        //垂直对齐计算
                        if(verticalAlign == "0"){
                            verticalAlignPos = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight*vArr.length/2;
                        }
                        else if(verticalAlign == "1"){
                            verticalAlignPos = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
                        }
                        else{
                            verticalAlignPos = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - oneLineTextHeight*vArr.length;
                        }

                        offlinecanvas.fillText(vArr[i], horizonAlignPos, (verticalAlignPos + i * oneLineTextHeight));
                    }

                    //是否有删除线
                    let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
                    if(cl == "1" && !!value){
                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(horizonAlignPos + textW/2, verticalAlignPos);
                        offlinecanvas.lineTo(horizonAlignPos + textW/2, verticalAlignPos + textH);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
            }
            else if(tr == "4" || tr == "5"){
                //旋转重新计算水平、垂直方向坐标
                let textW = oneLineTextHeight;
                let textH = textMetrics;

                let hAP = (start_c + 4 + offsetLeft) * Store.devicePixelRatio;
                if(horizonAlign=="0"){
                    hAP = (start_c + (end_c - start_c) / 2 + offsetLeft) * Store.devicePixelRatio - (textW)/2;
                }
                else if(horizonAlign=="2"){
                    hAP = (end_c + offsetLeft - 8) * Store.devicePixelRatio - (textW);
                }

                let vAP = (end_r  + offsetTop - 2 + verticalFixed) * Store.devicePixelRatio - textH;
                if(verticalAlign=="0"){
                    vAP = (start_r + (end_r - start_r) / 2  + offsetTop + verticalFixed) * Store.devicePixelRatio - textH/2;
                }
                else if(verticalAlign=="1"){
                    vAP = (start_r + offsetTop + verticalFixed) * Store.devicePixelRatio;
                }

                //向下90（90 旋转）
                if(tr == "4"){
                    offlinecanvas.save();
                    offlinecanvas.translate(hAP, vAP);
                    offlinecanvas.rotate(90 * Math.PI / 180);
                    offlinecanvas.translate(-hAP, -vAP);
                    offlinecanvas.fillText(value == null ? "" : value, hAP, vAP - textW);
                    offlinecanvas.restore();

                    //是否有删除线
                    let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
                    if(cl == "1" && !!value){
                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(hAP + textW/2, vAP);
                        offlinecanvas.lineTo(hAP + textW/2, vAP + textH);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
                //向上90（-90 旋转）
                if(tr == "5"){
                    offlinecanvas.save();
                    offlinecanvas.translate(hAP + textH, vAP);
                    offlinecanvas.rotate(-90 * Math.PI / 180);
                    offlinecanvas.translate(-(hAP + textH), -vAP);
                    offlinecanvas.fillText(value == null ? "" : value, hAP, vAP - textH);
                    offlinecanvas.restore();

                    //是否有删除线
                    let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
                    if(cl == "1" && !!value){
                        offlinecanvas.beginPath();
                        offlinecanvas.moveTo(hAP + textW/2, vAP);
                        offlinecanvas.lineTo(hAP + textW/2, vAP + textH);
                        offlinecanvas.closePath();
                        offlinecanvas.stroke();
                    }
                }
            }
        }
        else{
            //是否有删除线
            let cl = menuButton.checkstatus(Store.flowdata, r, c , "cl");
            if(cl == "1" && !!value){
                luckysheetTableContent.strokeStyle = "#000000";
                
                offlinecanvas.beginPath();
                offlinecanvas.moveTo(horizonAlignPos, verticalAlignPos + oneLineTextHeight/2);
                offlinecanvas.lineTo(horizonAlignPos + textMetrics, verticalAlignPos + oneLineTextHeight/2);
                offlinecanvas.closePath();
                offlinecanvas.stroke();

                offlinecanvas.textBaseline = "middle";
                offlinecanvas.fillText(value==null?"":value, horizonAlignPos, verticalAlignPos + oneLineTextHeight/2);
            }
            else{
                offlinecanvas.textBaseline = "top";
                offlinecanvas.fillText(value==null?"":value, horizonAlignPos, verticalAlignPos);
            }
        }

        offlinecanvas.font = luckysheetdefaultstyle.font;

        luckysheetTableContent.drawImage($("#luckysheetTableContentF").get(0), cellsize[0], cellsize[1], cellsize[2], cellsize[3], cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

        let bs = menuButton.checkstatus(Store.flowdata, r, c , "bs");
        let bc = menuButton.checkstatus(Store.flowdata, r, c , "bc");
        let bs_t = menuButton.checkstatus(Store.flowdata, r, c , "bs_t");
        let bc_t = menuButton.checkstatus(Store.flowdata, r, c , "bc_t");
        let bs_b = menuButton.checkstatus(Store.flowdata, r, c , "bs_b");
        let bc_b = menuButton.checkstatus(Store.flowdata, r, c , "bc_b");
        let bs_l = menuButton.checkstatus(Store.flowdata, r, c , "bs_l");
        let bc_l = menuButton.checkstatus(Store.flowdata, r, c , "bc_l");
        let bs_r = menuButton.checkstatus(Store.flowdata, r, c , "bs_r");
        let bc_r = menuButton.checkstatus(Store.flowdata, r, c , "bc_r");

        //左边框
        if(bs_l!="none" || bs!="none"){
            let linetype = bs_l=="none" ?bs:bs_l;

            menuButton.setLineDash(
                luckysheetTableContent, 
                linetype, 
                "v", 
                Store.devicePixelRatio * (start_c - 2+ 0.5 + offsetLeft), 
                Store.devicePixelRatio * (start_r + offsetTop), 
                Store.devicePixelRatio * (start_c - 2+ 0.5 + offsetLeft), 
                Store.devicePixelRatio * (end_r - 2 + offsetTop)
            );

            luckysheetTableContent.strokeStyle = bs_l == "none" ? bc : bc_l;
            
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }

        // //右边框
        if(bs_r!="none" || bs!="none"){
            let linetype = bs_r=="none" ?bs:bs_r;

            menuButton.setLineDash(
                luckysheetTableContent, 
                linetype, 
                "v", 
                Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
                Store.devicePixelRatio * (start_r + offsetTop), 
                Store.devicePixelRatio * (end_c - 2 + 0.5 + offsetLeft), 
                Store.devicePixelRatio * (end_r - 2 + offsetTop)
            );

            luckysheetTableContent.strokeStyle = bs_r == "none" ? bc : bc_r;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }

        //下边框
        if(bs_b!="none" || bs!="none"){
            let linetype = bs_b=="none" ?bs:bs_b;

            menuButton.setLineDash(
                luckysheetTableContent, 
                linetype, 
                "h", 
                Store.devicePixelRatio * (start_c - 2 + offsetLeft), 
                Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop), 
                Store.devicePixelRatio * (end_c + offsetLeft-2), 
                Store.devicePixelRatio * (end_r - 2 + 0.5 + offsetTop)
            );

            luckysheetTableContent.strokeStyle = bs_b == "none" ? bc : bc_b;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }

        //上边框
        if(bs_t!="none" || bs!="none"){
            let linetype = bs_t=="none" ?bs:bs_t;

            menuButton.setLineDash(
                luckysheetTableContent, 
                linetype, 
                "h", 
                Store.devicePixelRatio * (start_c - 2 + offsetLeft), 
                Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop), 
                Store.devicePixelRatio * (end_c + offsetLeft-2), 
                Store.devicePixelRatio * (start_r - 1 + 0.5 + offsetTop)
            );

            luckysheetTableContent.strokeStyle = bs_t == "none" ? bc : bc_t;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }
}

export {
    luckysheetDrawgrid,
    luckysheetDrawgridRowTitle,
    luckysheetDrawgridColumnTitle,
    luckysheetDrawMain,
    luckysheetDrawMain_back,
}