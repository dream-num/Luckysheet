import pivotTable from "../controllers/pivotTable";
import conditionformat from "../controllers/conditionformat";
import alternateformat from "../controllers/alternateformat";
import luckysheetSparkline from "../controllers/sparkline";
import menuButton from "../controllers/menuButton";
import dataVerificationCtrl from "../controllers/dataVerificationCtrl";
import { luckysheetdefaultstyle, luckysheet_CFiconsImg, luckysheetdefaultFont } from "../controllers/constant";
import { luckysheet_searcharray } from "../controllers/sheetSearch";
import { dynamicArrayCompute } from "./dynamicArray";
import browser from "./browser";
import { isRealNull, isRealNum } from "./validate";
import { getMeasureText, getCellTextInfo } from "./getRowlen";
import { getRealCellValue } from "./getdata";
import { getBorderInfoComputeRange } from "./border";
import { getSheetIndex } from "../methods/get";
import { getObjType, chatatABC, luckysheetfontformat } from "../utils/util";
import { isInlineStringCell } from "../controllers/inlineString";
import method from "./method";
import Store from "../store";
import locale from "../locale/locale";
import sheetmanage from "../controllers/sheetmanage";

function luckysheetDrawgridRowTitle(scrollHeight, drawHeight, offsetTop) {
    if (scrollHeight == null) {
        scrollHeight = $("#luckysheet-cell-main").scrollTop();
    }

    if (drawHeight == null) {
        drawHeight = Store.luckysheetTableContentHW[1];
    }

    if (offsetTop == null) {
        offsetTop = Store.columnHeaderHeight;
    }

    let luckysheetTableContent = $("#luckysheetTableContent")
        .get(0)
        .getContext("2d");
    luckysheetTableContent.save();
    luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);

    luckysheetTableContent.clearRect(0, offsetTop, Store.rowHeaderWidth - 1, drawHeight);

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

    luckysheetTableContent.save();
    luckysheetTableContent.beginPath();
    luckysheetTableContent.rect(0, offsetTop - 1, Store.rowHeaderWidth - 1, drawHeight - 2);
    luckysheetTableContent.clip();

    let end_r, start_r;
    let bodrder05 = 0.5; //Default 0.5
    let preEndR;
    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        end_r = Store.visibledatarow[r] - scrollHeight;

        //若超出绘制区域终止
        // if(end_r > scrollHeight + drawHeight){
        //     break;
        // }
        let firstOffset = dataset_row_st == r ? -2 : 0;
        let lastOffset = dataset_row_ed == r ? -2 : 0;
        //列标题单元格渲染前触发，return false 则不渲染该单元格
        if (
            !method.createHookFunction(
                "rowTitleCellRenderBefore",
                r + 1,
                {
                    r: r,
                    top: start_r + offsetTop + firstOffset,
                    width: Store.rowHeaderWidth - 1,
                    height: end_r - start_r + 1 + lastOffset - firstOffset,
                },
                luckysheetTableContent,
            )
        ) {
            continue;
        }

        if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
        } else {
            luckysheetTableContent.fillStyle = "#ffffff";
            luckysheetTableContent.fillRect(
                0,
                start_r + offsetTop + firstOffset,
                Store.rowHeaderWidth - 1,
                end_r - start_r + 1 + lastOffset - firstOffset,
            );
            luckysheetTableContent.fillStyle = "#000000";

            //行标题栏序列号
            luckysheetTableContent.save(); //save scale before draw text
            luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
            let textMetrics = getMeasureText(r + 1, luckysheetTableContent);
            //luckysheetTableContent.measureText(r + 1);

            let horizonAlignPos = (Store.rowHeaderWidth - textMetrics.width) / 2;
            let verticalAlignPos = start_r + (end_r - start_r) / 2 + offsetTop;

            luckysheetTableContent.fillText(
                r + 1,
                horizonAlignPos / Store.zoomRatio,
                verticalAlignPos / Store.zoomRatio,
            );
            luckysheetTableContent.restore(); //restore scale after draw text
        }

        //vertical
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(Store.rowHeaderWidth - 2 + bodrder05, start_r + offsetTop - 2);
        luckysheetTableContent.lineTo(Store.rowHeaderWidth - 2 + bodrder05, end_r + offsetTop - 2);
        luckysheetTableContent.lineWidth = 1;

        luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();

        //行标题栏横线,horizen
        if (
            Store.config["rowhidden"] != null &&
            Store.config["rowhidden"][r] == null &&
            Store.config["rowhidden"][r + 1] != null
        ) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(-1, end_r + offsetTop - 4 + bodrder05);
            luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, end_r + offsetTop - 4 + bodrder05);
            // luckysheetTableContent.lineWidth = 1;
            // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        } else if (Store.config["rowhidden"] == null || Store.config["rowhidden"][r] == null) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(-1, end_r + offsetTop - 2 + bodrder05);
            luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, end_r + offsetTop - 2 + bodrder05);

            // luckysheetTableContent.lineWidth = 1;
            // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        }

        if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r - 1] != null && preEndR != null) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(-1, preEndR + offsetTop + bodrder05);
            luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, preEndR + offsetTop + bodrder05);
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        }

        preEndR = end_r;

        //列标题单元格渲染前触发，return false 则不渲染该单元格
        method.createHookFunction(
            "rowTitleCellRenderAfter",
            r + 1,
            {
                r: r,
                top: start_r + offsetTop + firstOffset,
                width: Store.rowHeaderWidth - 1,
                height: end_r - start_r + 1 + lastOffset - firstOffset,
            },
            luckysheetTableContent,
        );
    }

    //行标题栏竖线
    // luckysheetTableContent.beginPath();
    // luckysheetTableContent.moveTo(
    //     (Store.rowHeaderWidth - 2 + 0.5) ,
    //     (offsetTop - 1)
    // );
    // luckysheetTableContent.lineTo(
    //     (Store.rowHeaderWidth - 2 + 0.5) ,
    //     (Store.rh_height + offsetTop)
    // );
    // luckysheetTableContent.lineWidth = 1;
    // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    // luckysheetTableContent.closePath();
    // luckysheetTableContent.stroke();

    //清除canvas左上角区域 防止列标题栏序列号溢出显示
    // luckysheetTableContent.clearRect(0, 0, Store.rowHeaderWidth , Store.columnHeaderHeight );

    // Must be restored twice, otherwise it will be enlarged under window.devicePixelRatio = 1.5
    luckysheetTableContent.restore();
    luckysheetTableContent.restore();
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

    let luckysheetTableContent = $("#luckysheetTableContent")
        .get(0)
        .getContext("2d");
    luckysheetTableContent.save();
    luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);
    luckysheetTableContent.clearRect(offsetLeft, 0, drawWidth, Store.columnHeaderHeight - 1);

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

    luckysheetTableContent.save();
    luckysheetTableContent.beginPath();
    luckysheetTableContent.rect(offsetLeft - 1, 0, drawWidth, Store.columnHeaderHeight - 1);
    luckysheetTableContent.clip();

    // console.log(offsetLeft, 0, drawWidth, Store.columnHeaderHeight -1);

    let end_c, start_c;
    let bodrder05 = 0.5; //Default 0.5
    let preEndC;
    for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
        if (c == 0) {
            start_c = -scrollWidth;
        } else {
            start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
        }
        end_c = Store.visibledatacolumn[c] - scrollWidth;

        //若超出绘制区域终止
        // if(end_c > scrollWidth + drawWidth+1){
        //     break;
        // }
        let abc = chatatABC(c);
        //列标题单元格渲染前触发，return false 则不渲染该单元格
        if (
            !method.createHookFunction(
                "columnTitleCellRenderBefore",
                abc,
                {
                    c: c,
                    left: start_c + offsetLeft - 1,
                    width: end_c - start_c,
                    height: Store.columnHeaderHeight - 1,
                },
                luckysheetTableContent,
            )
        ) {
            continue;
        }

        if (Store.config["colhidden"] != null && Store.config["colhidden"][c] != null) {
        } else {
            luckysheetTableContent.fillStyle = "#ffffff";
            luckysheetTableContent.fillRect(start_c + offsetLeft - 1, 0, end_c - start_c, Store.columnHeaderHeight - 1);
            luckysheetTableContent.fillStyle = "#000000";

            //列标题栏序列号
            luckysheetTableContent.save(); //save scale before draw text
            luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);

            let textMetrics = getMeasureText(abc, luckysheetTableContent);
            //luckysheetTableContent.measureText(abc);

            let horizonAlignPos = Math.round(start_c + (end_c - start_c) / 2 + offsetLeft - textMetrics.width / 2);
            let verticalAlignPos = Math.round(Store.columnHeaderHeight / 2);

            luckysheetTableContent.fillText(abc, horizonAlignPos / Store.zoomRatio, verticalAlignPos / Store.zoomRatio);
            luckysheetTableContent.restore(); //restore scale after draw text
        }

        //列标题栏竖线 vertical
        if (
            Store.config["colhidden"] != null &&
            Store.config["colhidden"][c] == null &&
            Store.config["colhidden"][c + 1] != null
        ) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - 4 + bodrder05, 0);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 4 + bodrder05, Store.columnHeaderHeight - 2);
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        } else if (Store.config["colhidden"] == null || Store.config["colhidden"][c] == null) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, 0);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, Store.columnHeaderHeight - 2);

            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        }

        if (Store.config["colhidden"] != null && Store.config["colhidden"][c - 1] != null && preEndC != null) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(preEndC + offsetLeft + bodrder05, 0);
            luckysheetTableContent.lineTo(preEndC + offsetLeft + bodrder05, Store.columnHeaderHeight - 2);
            // luckysheetTableContent.lineWidth = 1;
            // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.closePath();
            luckysheetTableContent.stroke();
        }

        //horizen
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(start_c + offsetLeft - 1, Store.columnHeaderHeight - 2 + bodrder05);
        luckysheetTableContent.lineTo(end_c + offsetLeft - 1, Store.columnHeaderHeight - 2 + bodrder05);
        // luckysheetTableContent.lineWidth = 1;

        // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();

        preEndC = end_c;

        method.createHookFunction(
            "columnTitleCellRenderAfter",
            abc,
            {
                c: c,
                left: start_c + offsetLeft - 1,
                width: end_c - start_c,
                height: Store.columnHeaderHeight - 1,
            },
            luckysheetTableContent,
        );
    }

    //列标题栏横线
    // luckysheetTableContent.beginPath();
    // luckysheetTableContent.moveTo(
    //     (offsetLeft - 1) ,
    //     (Store.columnHeaderHeight - 2 + 0.5)
    // );
    // luckysheetTableContent.lineTo(
    //     (Store.ch_width + offsetLeft - 2) ,
    //     (Store.columnHeaderHeight - 2 + 0.5)
    // );
    // luckysheetTableContent.lineWidth = 1;
    // luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    // luckysheetTableContent.closePath();
    // luckysheetTableContent.stroke();

    //清除canvas左上角区域 防止列标题栏序列号溢出显示
    // luckysheetTableContent.clearRect(0, 0, Store.rowHeaderWidth , Store.columnHeaderHeight );

    // Must be restored twice, otherwise it will be enlarged under window.devicePixelRatio = 1.5
    luckysheetTableContent.restore();
    luckysheetTableContent.restore();
}

function luckysheetDrawMain(
    scrollWidth,
    scrollHeight,
    drawWidth,
    drawHeight,
    offsetLeft,
    offsetTop,
    columnOffsetCell,
    rowOffsetCell,
    mycanvas,
) {
    if (Store.flowdata == null) {
        return;
    }

    let sheetFile = sheetmanage.getSheetByIndex();

    // console.trace();
    clearTimeout(Store.measureTextCacheTimeOut);

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
        offsetTop = Store.columnHeaderHeight;
    }

    if (columnOffsetCell == null) {
        columnOffsetCell = 0;
    }
    if (rowOffsetCell == null) {
        rowOffsetCell = 0;
    }

    //表格canvas
    let luckysheetTableContent = null;
    if (mycanvas == null) {
        luckysheetTableContent = $("#luckysheetTableContent")
            .get(0)
            .getContext("2d");
    } else {
        if (getObjType(mycanvas) == "object") {
            try {
                luckysheetTableContent = mycanvas.get(0).getContext("2d");
            } catch (err) {
                luckysheetTableContent = mycanvas;
            }
        } else {
            luckysheetTableContent = $("#" + mycanvas)
                .get(0)
                .getContext("2d");
        }
    }

    luckysheetTableContent.save();
    luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);

    luckysheetTableContent.clearRect(0, 0, Store.luckysheetTableContentHW[0], Store.luckysheetTableContentHW[1]);

    //表格渲染区域 起止行列下标
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

    //表格渲染区域 起止行列坐标
    let fill_row_st, fill_row_ed, fill_col_st, fill_col_ed;

    if (dataset_row_st == 0) {
        fill_row_st = 0;
    } else {
        fill_row_st = Store.visibledatarow[dataset_row_st - 1];
    }

    fill_row_ed = Store.visibledatarow[dataset_row_ed];

    if (dataset_col_st == 0) {
        fill_col_st = 0;
    } else {
        fill_col_st = Store.visibledatacolumn[dataset_col_st - 1];
    }

    fill_col_ed = Store.visibledatacolumn[dataset_col_ed];

    //表格canvas 初始化处理
    luckysheetTableContent.fillStyle = "#ffffff";
    luckysheetTableContent.fillRect(
        offsetLeft - 1,
        offsetTop - 1,
        fill_col_ed - scrollWidth,
        fill_row_ed - scrollHeight,
    );
    luckysheetTableContent.font = luckysheetdefaultFont();
    // luckysheetTableContent.textBaseline = "top";
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    //表格渲染区域 非空单元格行列 起止坐标
    let cellupdate = [];
    let mergeCache = {};
    let borderOffset = {};

    let bodrder05 = 0.5; //Default 0.5

    // 钩子函数
    method.createHookFunction("cellAllRenderBefore", Store.flowdata, sheetFile, luckysheetTableContent);

    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        let end_r = Store.visibledatarow[r] - scrollHeight;

        if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
            continue;
        }

        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            let start_c;
            if (c == 0) {
                start_c = -scrollWidth;
            } else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }

            let end_c = Store.visibledatacolumn[c] - scrollWidth;

            if (Store.config["colhidden"] != null && Store.config["colhidden"][c] != null) {
                continue;
            }

            let firstcolumnlen = Store.defaultcollen;
            if (Store.config["columnlen"] != null && Store.config["columnlen"][c] != null) {
                firstcolumnlen = Store.config["columnlen"][c];
            }

            if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
                let value = Store.flowdata[r][c];

                if (getObjType(value) == "object" && "mc" in value) {
                    borderOffset[r + "_" + c] = {
                        start_r: start_r,
                        start_c: start_c,
                        end_r: end_r,
                        end_c: end_c,
                    };

                    if ("rs" in value["mc"]) {
                        let key = "r" + r + "c" + c;
                        mergeCache[key] = cellupdate.length;
                    } else {
                        let key = "r" + value["mc"].r + "c" + value["mc"].c;
                        let margeMain = cellupdate[mergeCache[key]];

                        if (margeMain == null) {
                            mergeCache[key] = cellupdate.length;
                            cellupdate.push({
                                r: r,
                                c: c,
                                start_c: start_c,
                                start_r: start_r,
                                end_r: end_r,
                                end_c: end_c,
                                firstcolumnlen: firstcolumnlen,
                            });
                        } else {
                            if (margeMain.c == c) {
                                margeMain.end_r += end_r - start_r - 1;
                            }

                            if (margeMain.r == r) {
                                margeMain.end_c += end_c - start_c;
                                margeMain.firstcolumnlen += firstcolumnlen;
                            }
                        }

                        continue;
                    }
                }
            } else {
                //空单元格渲染前
                // if(!method.createHookFunction("cellRenderBefore", Store.flowdata[r][c], {
                //     r:r,
                //     c:c,
                //     "start_r": cellsize[1],
                //     "start_c":cellsize[0],
                //     "end_r": cellsize[3],
                //     "end_c": cellsize[2]
                // }, sheetFile,luckysheetTableContent)){ continue; }
            }

            cellupdate.push({
                r: r,
                c: c,
                start_r: start_r,
                start_c: start_c,
                end_r: end_r,
                end_c: end_c,
                firstcolumnlen: firstcolumnlen,
            });
            borderOffset[r + "_" + c] = {
                start_r: start_r,
                start_c: start_c,
                end_r: end_r,
                end_c: end_c,
            };
        }
    }

    //动态数组公式计算
    let dynamicArray_compute = dynamicArrayCompute(
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray"],
    );

    //交替颜色计算
    let af_compute = alternateformat.getComputeMap();

    //条件格式计算
    let cf_compute = conditionformat.getComputeMap();

    //表格渲染区域 溢出单元格配置保存
    let cellOverflowMap = getCellOverflowMap(
        luckysheetTableContent,
        dataset_col_st,
        dataset_col_ed,
        dataset_row_st,
        dataset_row_ed,
    );

    let mcArr = [];

    for (let cud = 0; cud < cellupdate.length; cud++) {
        let item = cellupdate[cud];
        let r = item.r,
            c = item.c,
            start_r = item.start_r,
            start_c = item.start_c,
            end_r = item.end_r,
            end_c = item.end_c;
        let firstcolumnlen = item.firstcolumnlen;

        if (Store.flowdata[r] == null) {
            continue;
        }

        // //有值单元格渲染前
        // if(!method.createHookFunction("cellRenderBefore", Store.flowdata[r][c], {
        //     r:r,
        //     c:c,
        //     "start_r": cellsize[1],
        //     "start_c":cellsize[0],
        //     "end_r": cellsize[3],
        //     "end_c": cellsize[2]
        // }, sheetFile,luckysheetTableContent)){ continue; }

        if (Store.flowdata[r][c] == null) {
            //空单元格
            nullCellRender(
                r,
                c,
                start_r,
                start_c,
                end_r,
                end_c,
                luckysheetTableContent,
                af_compute,
                cf_compute,
                offsetLeft,
                offsetTop,
                dynamicArray_compute,
                cellOverflowMap,
                dataset_col_st,
                dataset_col_ed,
                scrollHeight,
                scrollWidth,
                bodrder05,
            );
        } else {
            let cell = Store.flowdata[r][c];
            let value = null;

            if (typeof cell == "object" && "mc" in cell) {
                mcArr.push(cellupdate[cud]);
                // continue;
            } else {
                value = getRealCellValue(r, c);
            }

            if (value == null || value.toString().length == 0) {
                nullCellRender(
                    r,
                    c,
                    start_r,
                    start_c,
                    end_r,
                    end_c,
                    luckysheetTableContent,
                    af_compute,
                    cf_compute,
                    offsetLeft,
                    offsetTop,
                    dynamicArray_compute,
                    cellOverflowMap,
                    dataset_col_st,
                    dataset_col_ed,
                    scrollHeight,
                    scrollWidth,
                    bodrder05,
                );

                //sparklines渲染
                let borderfix = menuButton.borderfix(Store.flowdata, r, c);
                let cellsize = [
                    start_c + offsetLeft + borderfix[0],
                    start_r + offsetTop + borderfix[1],
                    end_c - start_c - 3 + borderfix[2],
                    end_r - start_r - 3 - 1 + borderfix[3],
                ];
                sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
            } else {
                if (r + "_" + c in dynamicArray_compute) {
                    //动态数组公式
                    value = dynamicArray_compute[r + "_" + c].v;
                }

                cellRender(
                    r,
                    c,
                    start_r,
                    start_c,
                    end_r,
                    end_c,
                    value,
                    luckysheetTableContent,
                    af_compute,
                    cf_compute,
                    offsetLeft,
                    offsetTop,
                    dynamicArray_compute,
                    cellOverflowMap,
                    dataset_col_st,
                    dataset_col_ed,
                    scrollHeight,
                    scrollWidth,
                    bodrder05,
                );
            }
        }

        // method.createHookFunction("cellRenderAfter", Store.flowdata[r][c], {
        //     r:r,
        //     c:c,
        //     "start_r": start_r,
        //     "start_c": start_c,
        //     "end_r": end_r,
        //     "end_c": end_c
        // }, sheetFile,luckysheetTableContent)
    }

    //合并单元格再处理
    for (let m = 0; m < mcArr.length; m++) {
        let item = mcArr[m];
        let r = item.r,
            c = item.c,
            start_r = item.start_r,
            start_c = item.start_c,
            end_r = item.end_r - 1,
            end_c = item.end_c - 1;
        let firstcolumnlen = item.firstcolumnlen;

        let cell = Store.flowdata[r][c];
        let value = null;

        let margeMaindata = cell["mc"];

        value = getRealCellValue(margeMaindata.r, margeMaindata.c);

        r = margeMaindata.r;
        c = margeMaindata.c;

        let mainCell = Store.flowdata[r][c];

        if (c == 0) {
            start_c = -scrollWidth;
        } else {
            start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
        }

        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        end_r = Store.visibledatarow[r + mainCell["mc"].rs - 1] - scrollHeight;
        end_c = Store.visibledatacolumn[c + mainCell["mc"].cs - 1] - scrollWidth;

        if (value == null || value.toString().length == 0) {
            nullCellRender(
                r,
                c,
                start_r,
                start_c,
                end_r,
                end_c,
                luckysheetTableContent,
                af_compute,
                cf_compute,
                offsetLeft,
                offsetTop,
                dynamicArray_compute,
                cellOverflowMap,
                dataset_col_st,
                dataset_col_ed,
                scrollHeight,
                scrollWidth,
                bodrder05,
                true,
            );

            //sparklines渲染
            let borderfix = menuButton.borderfix(Store.flowdata, r, c);
            let cellsize = [
                start_c + offsetLeft + borderfix[0],
                start_r + offsetTop + borderfix[1],
                end_c - start_c - 3 + borderfix[2],
                end_r - start_r - 3 - 1 + borderfix[3],
            ];
            sparklinesRender(r, c, cellsize[0], cellsize[1], "luckysheetTableContent", luckysheetTableContent);
        } else {
            if (r + "_" + c in dynamicArray_compute) {
                //动态数组公式
                value = dynamicArray_compute[r + "_" + c].v;
            }
            cellRender(
                r,
                c,
                start_r,
                start_c,
                end_r,
                end_c,
                value,
                luckysheetTableContent,
                af_compute,
                cf_compute,
                offsetLeft,
                offsetTop,
                dynamicArray_compute,
                cellOverflowMap,
                dataset_col_st,
                dataset_col_ed,
                scrollHeight,
                scrollWidth,
                bodrder05,
                true,
            );
        }
    }

    //数据透视表边框渲染
    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }

        let end_r = Store.visibledatarow[r] - scrollHeight;

        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            let start_c;
            if (c == 0) {
                start_c = -scrollWidth;
            } else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }

            let end_c = Store.visibledatacolumn[c] - scrollWidth;

            //数据透视表
            if (!!Store.luckysheetcurrentisPivotTable && pivotTable.drawPivotTable) {
                if ((c == 0 || c == 5) && r <= 11) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(end_c - 2 + bodrder05 + offsetLeft, start_r + offsetTop);
                    luckysheetTableContent.lineTo(
                        end_c - 2 + bodrder05 + offsetLeft,
                        end_r - 2 + bodrder05 + offsetTop,
                    );
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }

                if ((r == 2 || r == 11) && c <= 5) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(start_c - 1 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                    luckysheetTableContent.lineTo(
                        end_c - 2 + bodrder05 + offsetLeft,
                        end_r - 2 + bodrder05 + offsetTop,
                    );
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }

                if (r == 6 && c == 3) {
                    luckysheetTableContent.save();
                    luckysheetTableContent.font = "bold 30px Arial";
                    luckysheetTableContent.fillStyle = "#626675";
                    luckysheetTableContent.textAlign = "center";
                    luckysheetTableContent.fillText(
                        locale().pivotTable.title,
                        start_c + (end_c - start_c) / 2 + 4 + offsetLeft,
                        start_r + (end_r - start_r) / 2 - 1 + offsetTop,
                    );
                    luckysheetTableContent.restore();
                }
            } else if (!!Store.luckysheetcurrentisPivotTable) {
                if (c < pivotTable.pivotTableBoundary[1] && r < pivotTable.pivotTableBoundary[0]) {
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(end_c - 2 + bodrder05 + offsetLeft, start_r + offsetTop);
                    luckysheetTableContent.lineTo(
                        end_c - 2 + bodrder05 + offsetLeft,
                        end_r - 2 + bodrder05 + offsetTop,
                    );
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(start_c - 1 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                    luckysheetTableContent.lineTo(end_c - 2 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = "#000000";
                    luckysheetTableContent.closePath();
                    luckysheetTableContent.stroke();
                }
            }
        }
    }

    //边框单独渲染
    if (Store.config["borderInfo"] != null && Store.config["borderInfo"].length > 0) {
        //边框渲染
        let borderLeftRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
            let linetype = style;

            let m_st = start_c - 2 + bodrder05 + offsetLeft;
            let m_ed = start_r + offsetTop - 1;
            let line_st = start_c - 2 + bodrder05 + offsetLeft;
            let line_ed = end_r - 2 + bodrder05 + offsetTop;
            canvas.save();
            menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;

            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        };

        let borderRightRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
            let linetype = style;

            let m_st = end_c - 2 + bodrder05 + offsetLeft;
            let m_ed = start_r + offsetTop - 1;
            let line_st = end_c - 2 + bodrder05 + offsetLeft;
            let line_ed = end_r - 2 + bodrder05 + offsetTop;
            canvas.save();
            menuButton.setLineDash(canvas, linetype, "v", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;

            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        };

        let borderBottomRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
            let linetype = style;

            let m_st = start_c - 2 + bodrder05 + offsetLeft;
            let m_ed = end_r - 2 + bodrder05 + offsetTop;
            let line_st = end_c - 2 + bodrder05 + offsetLeft;
            let line_ed = end_r - 2 + bodrder05 + offsetTop;
            canvas.save();
            menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;

            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        };

        let borderTopRender = function(style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
            let linetype = style;

            let m_st = start_c - 2 + bodrder05 + offsetLeft;
            let m_ed = start_r - 1 + bodrder05 + offsetTop;
            let line_st = end_c - 2 + bodrder05 + offsetLeft;
            let line_ed = start_r - 1 + bodrder05 + offsetTop;
            canvas.save();
            menuButton.setLineDash(canvas, linetype, "h", m_st, m_ed, line_st, line_ed);

            canvas.strokeStyle = color;

            canvas.stroke();
            canvas.closePath();
            canvas.restore();
        };

        let borderInfoCompute = getBorderInfoComputeRange(
            dataset_row_st,
            dataset_row_ed,
            dataset_col_st,
            dataset_col_ed,
        );

        for (let x in borderInfoCompute) {
            //let bd_r = x.split("_")[0], bd_c = x.split("_")[1];

            let bd_r = x.substr(0, x.indexOf("_"));
            let bd_c = x.substr(x.indexOf("_") + 1);

            // if(bd_r < dataset_row_st || bd_r > dataset_row_ed || bd_c < dataset_col_st || bd_c > dataset_col_ed){
            //     continue;
            // }

            if (borderOffset[bd_r + "_" + bd_c]) {
                let start_r = borderOffset[bd_r + "_" + bd_c].start_r;
                let start_c = borderOffset[bd_r + "_" + bd_c].start_c;
                let end_r = borderOffset[bd_r + "_" + bd_c].end_r;
                let end_c = borderOffset[bd_r + "_" + bd_c].end_c;

                let cellOverflow_colInObj = cellOverflow_colIn(
                    cellOverflowMap,
                    bd_r,
                    bd_c,
                    dataset_col_st,
                    dataset_col_ed,
                );

                let borderLeft = borderInfoCompute[x].l;
                if (borderLeft != null && (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.stc == bd_c)) {
                    borderLeftRender(
                        borderLeft.style,
                        borderLeft.color,
                        start_r,
                        start_c,
                        end_r,
                        end_c,
                        offsetLeft,
                        offsetTop,
                        luckysheetTableContent,
                    );
                }

                let borderRight = borderInfoCompute[x].r;
                if (borderRight != null && (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.colLast)) {
                    borderRightRender(
                        borderRight.style,
                        borderRight.color,
                        start_r,
                        start_c,
                        end_r,
                        end_c,
                        offsetLeft,
                        offsetTop,
                        luckysheetTableContent,
                    );
                }

                let borderTop = borderInfoCompute[x].t;
                if (borderTop != null) {
                    borderTopRender(
                        borderTop.style,
                        borderTop.color,
                        start_r,
                        start_c,
                        end_r,
                        end_c,
                        offsetLeft,
                        offsetTop,
                        luckysheetTableContent,
                    );
                }

                let borderBottom = borderInfoCompute[x].b;
                if (borderBottom != null) {
                    borderBottomRender(
                        borderBottom.style,
                        borderBottom.color,
                        start_r,
                        start_c,
                        end_r,
                        end_c,
                        offsetLeft,
                        offsetTop,
                        luckysheetTableContent,
                    );
                }
            }
        }
    }

    //渲染表格时有尾列时，清除右边灰色区域，防止表格有值溢出
    if (dataset_col_ed == Store.visibledatacolumn.length - 1) {
        luckysheetTableContent.clearRect(
            fill_col_ed - scrollWidth + offsetLeft - 1,
            offsetTop - 1,
            Store.ch_width - Store.visibledatacolumn[dataset_col_ed],
            fill_row_ed - scrollHeight,
        );
    }

    luckysheetTableContent.restore();

    Store.measureTextCacheTimeOut = setTimeout(() => {
        Store.measureTextCache = {};
        Store.measureTextCellInfoCache = {};
        Store.cellOverflowMapCache = {};
    }, 100);
}

//sparklines渲染
let sparklinesRender = function(r, c, offsetX, offsetY, canvasid, ctx) {
    if (Store.flowdata[r] == null || Store.flowdata[r][c] == null) {
        return;
    }

    let sparklines = Store.flowdata[r][c].spl;
    if (sparklines != null) {
        if (typeof sparklines == "string") {
            sparklines = new Function("return " + sparklines)();
        }

        if (getObjType(sparklines) == "object") {
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
                ctx,
            );
        } else if (getObjType(sparklines) == "array" && getObjType(sparklines[0]) == "object") {
            for (let i = 0; i < sparklines.length; i++) {
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
                    ctx,
                );
            }
        }
    }
};

//空白单元格渲染
let nullCellRender = function(
    r,
    c,
    start_r,
    start_c,
    end_r,
    end_c,
    luckysheetTableContent,
    af_compute,
    cf_compute,
    offsetLeft,
    offsetTop,
    dynamicArray_compute,
    cellOverflowMap,
    dataset_col_st,
    dataset_col_ed,
    scrollHeight,
    scrollWidth,
    bodrder05,
    isMerge,
) {
    let checksAF = alternateformat.checksAF(r, c, af_compute); //交替颜色
    let checksCF = conditionformat.checksCF(r, c, cf_compute); //条件格式

    let borderfix = menuButton.borderfix(Store.flowdata, r, c);

    //背景色
    let fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "bg");

    if (checksAF != null && checksAF[1] != null) {
        //交替颜色
        fillStyle = checksAF[1];
    }

    if (checksCF != null && checksCF["cellColor"] != null) {
        //条件格式
        fillStyle = checksCF["cellColor"];
    }

    if (Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null) {
        //标题色
        fillStyle = Store.flowdata[r][c].tc;
    }

    if (fillStyle == null) {
        luckysheetTableContent.fillStyle = "#FFFFFF";
    } else {
        luckysheetTableContent.fillStyle = fillStyle;
    }

    // 这里计算canvas需要绘制的矩形范围时,需要留下原本单元格边框的位置
    // 让 fillRect 绘制矩形的起始xy坐标增加1,绘制长宽减少1

    let cellsize = [
        start_c + offsetLeft + borderfix[0] + 1,
        start_r + offsetTop + borderfix[1] + 1,
        end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0) - 1,
        end_r - start_r + borderfix[3] - 1,
    ];

    //单元格渲染前，考虑到合并单元格会再次渲染一遍，统一放到这里
    if (
        !method.createHookFunction(
            "cellRenderBefore",
            Store.flowdata[r][c],
            {
                r: r,
                c: c,
                start_r: cellsize[1],
                start_c: cellsize[0],
                end_r: cellsize[3] + cellsize[1],
                end_c: cellsize[2] + cellsize[0],
            },
            sheetmanage.getSheetByIndex(),
            luckysheetTableContent,
        )
    ) {
        return;
    }

    luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

    if (r + "_" + c in dynamicArray_compute) {
        let value = dynamicArray_compute[r + "_" + c].v;

        luckysheetTableContent.fillStyle = "#000000";
        //文本宽度和高度
        let fontset = luckysheetdefaultFont();
        luckysheetTableContent.font = fontset;

        //水平对齐 (默认为1，左对齐)
        let horizonAlignPos = start_c + 4 + offsetLeft;

        //垂直对齐 (默认为2，下对齐)
        let verticalFixed = browser.luckysheetrefreshfixed();
        let verticalAlignPos = end_r + offsetTop - 2;
        luckysheetTableContent.textBaseline = "bottom";

        luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos, verticalAlignPos);
    }

    //若单元格有批注
    if (Store.flowdata[r][c] != null && Store.flowdata[r][c].ps != null) {
        let ps_w = 8 * Store.zoomRatio,
            ps_h = 8 * Store.zoomRatio;
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(end_c + offsetLeft - 1 - ps_w, start_r + offsetTop);
        luckysheetTableContent.lineTo(end_c + offsetLeft - 1, start_r + offsetTop);
        luckysheetTableContent.lineTo(end_c + offsetLeft - 1, start_r + offsetTop + ps_h);
        luckysheetTableContent.fillStyle = "#FC6666";
        luckysheetTableContent.fill();
        luckysheetTableContent.closePath();
    }

    //此单元格 与  溢出单元格关系
    let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);

    //此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
    if (cellOverflow_colInObj.colLast) {
        cellOverflowRender(
            cellOverflow_colInObj.rowIndex,
            cellOverflow_colInObj.colIndex,
            cellOverflow_colInObj.stc,
            cellOverflow_colInObj.edc,
            luckysheetTableContent,
            scrollHeight,
            scrollWidth,
            offsetLeft,
            offsetTop,
            af_compute,
            cf_compute,
        );
    }

    //即溢出单元格跨此单元格，此单元格不绘制右边框
    if (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.colLast) {
        // 右边框
        // 无论是否有背景色，都默认绘制右边框
        if (!Store.luckysheetcurrentisPivotTable && Store.showGridLines) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, end_r + offsetTop);
            luckysheetTableContent.lineWidth = 1;

            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }

    // 下边框
    // 无论是否有背景色，都默认绘制下边框
    if (!Store.luckysheetcurrentisPivotTable && Store.showGridLines) {
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(start_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
        luckysheetTableContent.lineTo(end_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
        luckysheetTableContent.lineWidth = 1;

        luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();
    }

    // 单元格渲染后
    method.createHookFunction(
        "cellRenderAfter",
        Store.flowdata[r][c],
        {
            r: r,
            c: c,
            start_r: cellsize[1],
            start_c: cellsize[0],
            end_r: cellsize[3] + cellsize[1],
            end_c: cellsize[2] + cellsize[0],
        },
        sheetmanage.getSheetByIndex(),
        luckysheetTableContent,
    );
};

let cellRender = function(
    r,
    c,
    start_r,
    start_c,
    end_r,
    end_c,
    value,
    luckysheetTableContent,
    af_compute,
    cf_compute,
    offsetLeft,
    offsetTop,
    dynamicArray_compute,
    cellOverflowMap,
    dataset_col_st,
    dataset_col_ed,
    scrollHeight,
    scrollWidth,
    bodrder05,
    isMerge,
) {
    let cell = Store.flowdata[r][c];
    let cellWidth = end_c - start_c - 2;
    let cellHeight = end_r - start_r - 2;
    let space_width = 2,
        space_height = 2; //宽高方向 间隙

    //水平对齐
    let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c, "ht");
    //垂直对齐
    let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c, "vt");

    //交替颜色
    let checksAF = alternateformat.checksAF(r, c, af_compute);
    //条件格式
    let checksCF = conditionformat.checksCF(r, c, cf_compute);

    //单元格 背景颜色
    let fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "bg");
    if (checksAF != null && checksAF[1] != null) {
        //若单元格有交替颜色 背景颜色
        fillStyle = checksAF[1];
    }
    if (checksCF != null && checksCF["cellColor"] != null) {
        //若单元格有条件格式 背景颜色
        fillStyle = checksCF["cellColor"];
    }
    // luckysheetTableContent.textBaseline = 'top';
    if (fillStyle == null) {
        luckysheetTableContent.fillStyle = "#FFFFFF";
    } else {
        luckysheetTableContent.fillStyle = fillStyle;
    }

    let borderfix = menuButton.borderfix(Store.flowdata, r, c);

    // 这里计算canvas需要绘制的矩形范围时,需要留下原本单元格边框的位置
    // 让 fillRect 绘制矩形的起始xy坐标增加1,绘制长宽减少1

    let cellsize = [
        start_c + offsetLeft + borderfix[0] + 1,
        start_r + offsetTop + borderfix[1] + 1,
        end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0) - 1,
        end_r - start_r + borderfix[3] + 1,
    ];

    //单元格渲染前，考虑到合并单元格会再次渲染一遍，统一放到这里
    if (
        !method.createHookFunction(
            "cellRenderBefore",
            Store.flowdata[r][c],
            {
                r: r,
                c: c,
                start_r: cellsize[1],
                start_c: cellsize[0],
                end_r: cellsize[3] + cellsize[1],
                end_c: cellsize[2] + cellsize[0],
            },
            sheetmanage.getSheetByIndex(),
            luckysheetTableContent,
        )
    ) {
        return;
    }

    luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

    let dataVerification = dataVerificationCtrl.dataVerification;

    if (
        dataVerification != null &&
        dataVerification[r + "_" + c] != null &&
        !dataVerificationCtrl.validateCellData(value, dataVerification[r + "_" + c])
    ) {
        //单元格左上角红色小三角标示
        let dv_w = 5 * Store.zoomRatio,
            dv_h = 5 * Store.zoomRatio; //红色小三角宽高

        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(start_c + offsetLeft, start_r + offsetTop);
        luckysheetTableContent.lineTo(start_c + offsetLeft + dv_w, start_r + offsetTop);
        luckysheetTableContent.lineTo(start_c + offsetLeft, start_r + offsetTop + dv_h);
        luckysheetTableContent.fillStyle = "#FC6666";
        luckysheetTableContent.fill();
        luckysheetTableContent.closePath();
    }

    //若单元格有批注（单元格右上角红色小三角标示）
    if (cell.ps != null) {
        let ps_w = 8 * Store.zoomRatio,
            ps_h = 8 * Store.zoomRatio; //红色小三角宽高

        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(end_c + offsetLeft - ps_w, start_r + offsetTop);
        luckysheetTableContent.lineTo(end_c + offsetLeft, start_r + offsetTop);
        luckysheetTableContent.lineTo(end_c + offsetLeft, start_r + offsetTop + ps_h);
        luckysheetTableContent.fillStyle = "#FC6666";
        luckysheetTableContent.fill();
        luckysheetTableContent.closePath();
    }

    //若单元格强制为字符串，则显示绿色小三角
    if (cell.qp == 1 && isRealNum(cell.v)) {
        let ps_w = 6 * Store.zoomRatio,
            ps_h = 6 * Store.zoomRatio; //红色小三角宽高

        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(start_c + offsetLeft + ps_w - 1, start_r + offsetTop);
        luckysheetTableContent.lineTo(start_c + offsetLeft - 1, start_r + offsetTop);
        luckysheetTableContent.lineTo(start_c + offsetLeft - 1, start_r + offsetTop + ps_h);
        luckysheetTableContent.fillStyle = "#487f1e";
        luckysheetTableContent.fill();
        luckysheetTableContent.closePath();
    }

    //溢出单元格
    let cellOverflow_bd_r_render = true; //溢出单元格右边框是否需要绘制
    let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);

    if (cell.tb == "1" && cellOverflow_colInObj.colIn) {
        //此单元格 为 溢出单元格渲染范围最后一列，绘制溢出单元格内容
        if (cellOverflow_colInObj.colLast) {
            cellOverflowRender(
                cellOverflow_colInObj.rowIndex,
                cellOverflow_colInObj.colIndex,
                cellOverflow_colInObj.stc,
                cellOverflow_colInObj.edc,
                luckysheetTableContent,
                scrollHeight,
                scrollWidth,
                offsetLeft,
                offsetTop,
                af_compute,
                cf_compute,
            );
        } else {
            cellOverflow_bd_r_render = false;
        }
    }
    //数据验证 复选框
    else if (
        dataVerification != null &&
        dataVerification[r + "_" + c] != null &&
        dataVerification[r + "_" + c].type == "checkbox"
    ) {
        let pos_x = start_c + offsetLeft;
        let pos_y = start_r + offsetTop + 1;

        luckysheetTableContent.save();
        luckysheetTableContent.beginPath();
        luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
        luckysheetTableContent.clip();
        luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);

        let measureText = getMeasureText(value, luckysheetTableContent);
        let textMetrics = measureText.width + 14;
        let oneLineTextHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;

        let horizonAlignPos = pos_x + space_width; //默认为1，左对齐
        if (horizonAlign == "0") {
            //居中对齐
            horizonAlignPos = pos_x + cellWidth / 2 - textMetrics / 2;
        } else if (horizonAlign == "2") {
            //右对齐
            horizonAlignPos = pos_x + cellWidth - space_width - textMetrics;
        }

        let verticalCellHeight = cellHeight > oneLineTextHeight ? cellHeight : oneLineTextHeight;

        let verticalAlignPos_text = pos_y + verticalCellHeight - space_height; //文本垂直方向基准线
        luckysheetTableContent.textBaseline = "bottom";
        let verticalAlignPos_checkbox = verticalAlignPos_text - 13 * Store.zoomRatio;

        if (verticalAlign == "0") {
            //居中对齐
            verticalAlignPos_text = pos_y + verticalCellHeight / 2;
            luckysheetTableContent.textBaseline = "middle";
            verticalAlignPos_checkbox = verticalAlignPos_text - 6 * Store.zoomRatio;
        } else if (verticalAlign == "1") {
            //上对齐
            verticalAlignPos_text = pos_y + space_height;
            luckysheetTableContent.textBaseline = "top";
            verticalAlignPos_checkbox = verticalAlignPos_text + 1 * Store.zoomRatio;
        }

        horizonAlignPos = horizonAlignPos / Store.zoomRatio;
        verticalAlignPos_text = verticalAlignPos_text / Store.zoomRatio;
        verticalAlignPos_checkbox = verticalAlignPos_checkbox / Store.zoomRatio;

        //复选框
        luckysheetTableContent.lineWidth = 1;
        luckysheetTableContent.strokeStyle = "#000";
        luckysheetTableContent.strokeRect(horizonAlignPos, verticalAlignPos_checkbox, 10, 10);

        if (dataVerification[r + "_" + c].checked) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.lineTo(horizonAlignPos + 1, verticalAlignPos_checkbox + 6);
            luckysheetTableContent.lineTo(horizonAlignPos + 4, verticalAlignPos_checkbox + 9);
            luckysheetTableContent.lineTo(horizonAlignPos + 9, verticalAlignPos_checkbox + 2);
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }

        //文本
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "fc");
        luckysheetTableContent.fillText(value == null ? "" : value, horizonAlignPos + 14, verticalAlignPos_text);

        luckysheetTableContent.restore();
    } else {
        //若单元格有条件格式数据条
        if (
            checksCF != null &&
            checksCF["dataBar"] != null &&
            checksCF["dataBar"]["valueLen"] &&
            checksCF["dataBar"]["valueLen"].toString() !== "NaN"
        ) {
            let x = start_c + offsetLeft + space_width;
            let y = start_r + offsetTop + space_height;
            let w = cellWidth - space_width * 2;
            let h = cellHeight - space_height * 2;

            let valueType = checksCF["dataBar"]["valueType"];
            let valueLen = checksCF["dataBar"]["valueLen"];
            let format = checksCF["dataBar"]["format"];

            if (valueType == "minus") {
                //负数
                let minusLen = checksCF["dataBar"]["minusLen"];

                if (format.length > 1) {
                    //渐变
                    let my_gradient = luckysheetTableContent.createLinearGradient(
                        x + w * minusLen * (1 - valueLen),
                        y,
                        x + w * minusLen,
                        y,
                    );
                    my_gradient.addColorStop(0, "#ffffff");
                    my_gradient.addColorStop(1, "#ff0000");

                    luckysheetTableContent.fillStyle = my_gradient;
                } else {
                    //单色
                    luckysheetTableContent.fillStyle = "#ff0000";
                }

                luckysheetTableContent.fillRect(x + w * minusLen * (1 - valueLen), y, w * minusLen * valueLen, h);

                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(x + w * minusLen * (1 - valueLen), y);
                luckysheetTableContent.lineTo(x + w * minusLen * (1 - valueLen), y + h);
                luckysheetTableContent.lineTo(x + w * minusLen, y + h);
                luckysheetTableContent.lineTo(x + w * minusLen, y);
                luckysheetTableContent.lineTo(x + w * minusLen * (1 - valueLen), y);
                luckysheetTableContent.lineWidth = 1;
                luckysheetTableContent.strokeStyle = "#ff0000";
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            } else if (valueType == "plus") {
                //正数
                let plusLen = checksCF["dataBar"]["plusLen"];

                if (plusLen == 1) {
                    if (format.length > 1) {
                        //渐变
                        let my_gradient = luckysheetTableContent.createLinearGradient(x, y, x + w * valueLen, y);
                        my_gradient.addColorStop(0, format[0]);
                        my_gradient.addColorStop(1, format[1]);

                        luckysheetTableContent.fillStyle = my_gradient;
                    } else {
                        //单色
                        luckysheetTableContent.fillStyle = format[0];
                    }

                    luckysheetTableContent.fillRect(x, y, w * valueLen, h);

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(x, y);
                    luckysheetTableContent.lineTo(x, y + h);
                    luckysheetTableContent.lineTo(x + w * valueLen, y + h);
                    luckysheetTableContent.lineTo(x + w * valueLen, y);
                    luckysheetTableContent.lineTo(x, y);
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = format[0];
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                } else {
                    let minusLen = checksCF["dataBar"]["minusLen"];

                    if (format.length > 1) {
                        //渐变
                        let my_gradient = luckysheetTableContent.createLinearGradient(
                            x + w * minusLen,
                            y,
                            x + w * minusLen + w * plusLen * valueLen,
                            y,
                        );
                        my_gradient.addColorStop(0, format[0]);
                        my_gradient.addColorStop(1, format[1]);

                        luckysheetTableContent.fillStyle = my_gradient;
                    } else {
                        //单色
                        luckysheetTableContent.fillStyle = format[0];
                    }

                    luckysheetTableContent.fillRect(x + w * minusLen, y, w * plusLen * valueLen, h);

                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(x + w * minusLen, y);
                    luckysheetTableContent.lineTo(x + w * minusLen, y + h);
                    luckysheetTableContent.lineTo(x + w * minusLen + w * plusLen * valueLen, y + h);
                    luckysheetTableContent.lineTo(x + w * minusLen + w * plusLen * valueLen, y);
                    luckysheetTableContent.lineTo(x + w * minusLen, y);
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = format[0];
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                }
            }
        }

        let pos_x = start_c + offsetLeft;
        let pos_y = start_r + offsetTop + 1;

        luckysheetTableContent.save();
        luckysheetTableContent.beginPath();
        luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
        luckysheetTableContent.clip();
        luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);

        let textInfo = getCellTextInfo(cell, luckysheetTableContent, {
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            space_width: space_width,
            space_height: space_height,
            r: r,
            c: c,
        });

        //若单元格有条件格式图标集
        if (checksCF != null && checksCF["icons"] != null && textInfo.type == "plain") {
            let l = checksCF["icons"]["left"];
            let t = checksCF["icons"]["top"];

            let value = textInfo.values[0];
            let horizonAlignPos = pos_x + value.left;
            let verticalAlignPos = pos_y + value.top - textInfo.textHeightAll;

            if (verticalAlign == "0") {
                //居中对齐
                verticalAlignPos = pos_y + cellHeight / 2 - textInfo.textHeightAll / 2;
            } else if (verticalAlign == "1") {
                //上对齐
                verticalAlignPos = pos_y;
            } else if (verticalAlign == "2") {
                //下对齐
                verticalAlignPos = verticalAlignPos - textInfo.desc;
            }

            verticalAlignPos = verticalAlignPos / Store.zoomRatio;
            horizonAlignPos = horizonAlignPos / Store.zoomRatio;

            luckysheetTableContent.drawImage(
                luckysheet_CFiconsImg,
                l * 42,
                t * 32,
                32,
                32,
                pos_x / Store.zoomRatio,
                verticalAlignPos,
                textInfo.textHeightAll / Store.zoomRatio,
                textInfo.textHeightAll / Store.zoomRatio,
            );

            if (horizonAlign != "0" && horizonAlign != "2") {
                //左对齐时 文本渲染空出一个图标的距离
                horizonAlignPos = horizonAlignPos + textInfo.textHeightAll / Store.zoomRatio;
            }
        }

        //单元格 文本颜色
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "fc");

        //若单元格有交替颜色 文本颜色
        if (checksAF != null && checksAF[0] != null) {
            luckysheetTableContent.fillStyle = checksAF[0];
        }
        //若单元格有条件格式 文本颜色
        if (checksCF != null && checksCF["textColor"] != null) {
            luckysheetTableContent.fillStyle = checksCF["textColor"];
        }

        //若单元格格式为自定义数字格式（[red]） 文本颜色为红色
        if (cell.ct && cell.ct.fa && cell.ct.fa.indexOf("[Red]") > -1 && cell.ct.t == "n" && cell.v < 0) {
            luckysheetTableContent.fillStyle = "#ff0000";
        }

        cellTextRender(textInfo, luckysheetTableContent, {
            pos_x: pos_x,
            pos_y: pos_y,
        });

        luckysheetTableContent.restore();
    }

    if (cellOverflow_bd_r_render) {
        // 右边框
        // 无论是否有背景色，都默认绘制右边框
        if (!Store.luckysheetcurrentisPivotTable && Store.showGridLines) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, end_r + offsetTop);
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
    }

    // 下边框
    // 无论是否有背景色，都默认绘制下边框
    if (!Store.luckysheetcurrentisPivotTable && Store.showGridLines) {
        luckysheetTableContent.beginPath();
        luckysheetTableContent.moveTo(start_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
        luckysheetTableContent.lineTo(end_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
        luckysheetTableContent.lineWidth = 1;
        luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        luckysheetTableContent.stroke();
        luckysheetTableContent.closePath();
    }

    // 单元格渲染后
    method.createHookFunction(
        "cellRenderAfter",
        Store.flowdata[r][c],
        {
            r: r,
            c: c,
            start_r: cellsize[1],
            start_c: cellsize[0],
            end_r: cellsize[3] + cellsize[1],
            end_c: cellsize[2] + cellsize[0],
        },
        sheetmanage.getSheetByIndex(),
        luckysheetTableContent,
    );
};

//溢出单元格渲染
let cellOverflowRender = function(
    r,
    c,
    stc,
    edc,
    luckysheetTableContent,
    scrollHeight,
    scrollWidth,
    offsetLeft,
    offsetTop,
    af_compute,
    cf_compute,
) {
    //溢出单元格 起止行列坐标
    let start_r;
    if (r == 0) {
        start_r = -scrollHeight - 1;
    } else {
        start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
    }

    let end_r = Store.visibledatarow[r] - scrollHeight;

    let start_c;
    if (stc == 0) {
        start_c = -scrollWidth;
    } else {
        start_c = Store.visibledatacolumn[stc - 1] - scrollWidth;
    }

    let end_c = Store.visibledatacolumn[edc] - scrollWidth;

    //
    let cell = Store.flowdata[r][c];
    let cellWidth = end_c - start_c - 2;
    let cellHeight = end_r - start_r - 2;
    let space_width = 2,
        space_height = 2; //宽高方向 间隙

    let pos_x = start_c + offsetLeft;
    let pos_y = start_r + offsetTop + 1;

    let fontset = luckysheetfontformat(cell);
    luckysheetTableContent.font = fontset;

    luckysheetTableContent.save();
    luckysheetTableContent.beginPath();
    luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
    luckysheetTableContent.clip();
    luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);

    let textInfo = getCellTextInfo(cell, luckysheetTableContent, {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        space_width: space_width,
        space_height: space_height,
        r: r,
        c: c,
    });

    //交替颜色
    let checksAF = alternateformat.checksAF(r, c, af_compute);
    //条件格式
    let checksCF = conditionformat.checksCF(r, c, cf_compute);

    //单元格 文本颜色
    luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, "fc");

    //若单元格有交替颜色 文本颜色
    if (checksAF != null && checksAF[0] != null) {
        luckysheetTableContent.fillStyle = checksAF[0];
    }
    //若单元格有条件格式 文本颜色
    if (checksCF != null && checksCF["textColor"] != null) {
        luckysheetTableContent.fillStyle = checksCF["textColor"];
    }

    cellTextRender(textInfo, luckysheetTableContent, {
        pos_x: pos_x,
        pos_y: pos_y,
    });

    luckysheetTableContent.restore();
};

//获取表格渲染范围 溢出单元格
function getCellOverflowMap(canvas, col_st, col_ed, row_st, row_end) {
    let map = {};

    let data = Store.flowdata;

    for (let r = row_st; r <= row_end; r++) {
        if (data[r] == null) {
            continue;
        }

        if (Store.cellOverflowMapCache[r] != null) {
            map[r] = Store.cellOverflowMapCache[r];
            continue;
        }

        let hasCellOver = false;

        for (let c = 0; c < data[r].length; c++) {
            let cell = data[r][c];

            // if(Store.cellOverflowMapCache[r + '_' + c]!=null){
            //     map[r + '_' + c] = Store.cellOverflowMapCache[r + '_' + c];
            //     continue;
            // }

            if (Store.config["colhidden"] != null && Store.config["colhidden"][c] != null) {
                continue;
            }

            if (
                cell != null &&
                (!isRealNull(cell.v) || isInlineStringCell(cell)) &&
                cell.mc == null &&
                cell.tb == "1"
            ) {
                //水平对齐
                let horizonAlign = menuButton.checkstatus(data, r, c, "ht");

                let textMetricsObj = getCellTextInfo(cell, canvas, {
                    r: r,
                    c: c,
                });
                let textMetrics = 0;
                if (textMetricsObj != null) {
                    textMetrics = textMetricsObj.textWidthAll;
                }

                //canvas.measureText(value).width;

                let start_c = c - 1 < 0 ? 0 : Store.visibledatacolumn[c - 1];
                let end_c = Store.visibledatacolumn[c];

                let stc, edc;

                if (end_c - start_c < textMetrics) {
                    if (horizonAlign == "0") {
                        //居中对齐
                        let trace_forward = cellOverflow_trace(r, c, c - 1, "forward", horizonAlign, textMetrics);
                        let trace_backward = cellOverflow_trace(r, c, c + 1, "backward", horizonAlign, textMetrics);

                        if (trace_forward.success) {
                            stc = trace_forward.c;
                        } else {
                            stc = trace_forward.c + 1;
                        }

                        if (trace_backward.success) {
                            edc = trace_backward.c;
                        } else {
                            edc = trace_backward.c - 1;
                        }
                    } else if (horizonAlign == "1") {
                        //左对齐
                        let trace = cellOverflow_trace(r, c, c + 1, "backward", horizonAlign, textMetrics);
                        stc = c;

                        if (trace.success) {
                            edc = trace.c;
                        } else {
                            edc = trace.c - 1;
                        }
                    } else if (horizonAlign == "2") {
                        //右对齐
                        let trace = cellOverflow_trace(r, c, c - 1, "forward", horizonAlign, textMetrics);
                        edc = c;

                        if (trace.success) {
                            stc = trace.c;
                        } else {
                            stc = trace.c + 1;
                        }
                    }
                } else {
                    stc = c;
                    edc = c;
                }

                // if(((stc >= col_st && stc <= col_ed) || (edc >= col_st && edc <= col_ed)) && stc < edc){
                if ((stc <= col_ed || edc >= col_st) && stc < edc) {
                    let item = {
                        r: r,
                        stc: stc,
                        edc: edc,
                    };

                    if (map[r] == null) {
                        map[r] = {};
                    }

                    map[r][c] = item;

                    // Store.cellOverflowMapCache[r + '_' + c] = item;

                    hasCellOver = true;
                }
            }
        }

        if (hasCellOver) {
            Store.cellOverflowMapCache[r] = map[r];
        }
    }

    return map;
}

function cellOverflow_trace(r, curC, traceC, traceDir, horizonAlign, textMetrics) {
    let data = Store.flowdata;

    //追溯单元格列超出数组范围 则追溯终止
    if (traceDir == "forward" && traceC < 0) {
        return {
            success: false,
            r: r,
            c: traceC,
        };
    }

    if (traceDir == "backward" && traceC > data[r].length - 1) {
        return {
            success: false,
            r: r,
            c: traceC,
        };
    }

    //追溯单元格是 非空单元格或合并单元格 则追溯终止
    let cell = data[r][traceC];
    if (cell != null && (!isRealNull(cell.v) || cell.mc != null)) {
        return {
            success: false,
            r: r,
            c: traceC,
        };
    }

    let start_curC = curC - 1 < 0 ? 0 : Store.visibledatacolumn[curC - 1];
    let end_curC = Store.visibledatacolumn[curC];

    let w = textMetrics - (end_curC - start_curC);

    if (horizonAlign == "0") {
        //居中对齐
        start_curC -= w / 2;
        end_curC += w / 2;
    } else if (horizonAlign == "1") {
        //左对齐
        end_curC += w;
    } else if (horizonAlign == "2") {
        //右对齐
        start_curC -= w;
    }

    let start_traceC = traceC - 1 < 0 ? 0 : Store.visibledatacolumn[traceC - 1];
    let end_traceC = Store.visibledatacolumn[traceC];

    if (traceDir == "forward") {
        if (start_curC < start_traceC) {
            return cellOverflow_trace(r, curC, traceC - 1, traceDir, horizonAlign, textMetrics);
        } else if (start_curC < end_traceC) {
            return {
                success: true,
                r: r,
                c: traceC,
            };
        } else {
            return {
                success: false,
                r: r,
                c: traceC,
            };
        }
    }

    if (traceDir == "backward") {
        if (end_curC > end_traceC) {
            return cellOverflow_trace(r, curC, traceC + 1, traceDir, horizonAlign, textMetrics);
        } else if (end_curC > start_traceC) {
            return {
                success: true,
                r: r,
                c: traceC,
            };
        } else {
            return {
                success: false,
                r: r,
                c: traceC,
            };
        }
    }
}

function cellOverflow_colIn(map, r, c, col_st, col_ed) {
    let colIn = false, //此单元格 是否在 某个溢出单元格的渲染范围
        colLast = false, //此单元格 是否是 某个溢出单元格的渲染范围的最后一列
        rowIndex, //溢出单元格 行下标
        colIndex, //溢出单元格 列下标
        stc,
        edc;

    for (let rkey in map) {
        for (let ckey in map[rkey]) {
            rowIndex = rkey;
            colIndex = ckey;
            // rowIndex = key.substr(0, key.indexOf('_'));
            // colIndex = key.substr(key.indexOf('_') + 1);
            let mapItem = map[rkey][ckey];
            stc = mapItem.stc;
            edc = mapItem.edc;

            if (rowIndex == r) {
                if (c >= stc && c <= edc) {
                    colIn = true;

                    if (c == edc || c == col_ed) {
                        colLast = true;
                        break;
                    }
                }
            }
        }

        if (colLast) {
            break;
        }
    }

    return {
        colIn: colIn,
        colLast: colLast,
        rowIndex: rowIndex,
        colIndex: colIndex,
        stc: stc,
        edc: edc,
    };
}

function cellTextRender(textInfo, ctx, option) {
    if (textInfo == null) {
        return;
    }
    let values = textInfo.values;
    let pos_x = option.pos_x,
        pos_y = option.pos_y;
    if (values == null) {
        return;
    }
    // console.log(textInfo, pos_x, pos_y, values[0].width, values[0].left, ctx);

    // for(let i=0;i<values.length;i++){
    //     let word = values[i];
    //     ctx.font = word.style;
    //     ctx.fillText(word.content, (pos_x + word.left)/Store.zoomRatio, (pos_y+word.top)/Store.zoomRatio);
    // }

    // ctx.fillStyle = "rgba(255,255,0,0.2)";
    // ctx.fillRect((pos_x + values[0].left)/Store.zoomRatio, (pos_y+values[0].top-values[0].asc)/Store.zoomRatio, textInfo.textWidthAll, textInfo.textHeightAll)

    if (textInfo.rotate != 0 && textInfo.type != "verticalWrap") {
        ctx.save();
        ctx.translate(
            (pos_x + textInfo.textLeftAll) / Store.zoomRatio,
            (pos_y + textInfo.textTopAll) / Store.zoomRatio,
        );
        ctx.rotate((-textInfo.rotate * Math.PI) / 180);
        ctx.translate(
            -(textInfo.textLeftAll + pos_x) / Store.zoomRatio,
            -(pos_y + textInfo.textTopAll) / Store.zoomRatio,
        );
    }

    // ctx.fillStyle = "rgb(0,0,0)";
    for (let i = 0; i < values.length; i++) {
        let word = values[i];
        if (word.inline === true && word.style != null) {
            ctx.font = word.style.fontset;
            ctx.fillStyle = word.style.fc;
        } else {
            ctx.font = word.style;
        }

        // 暂时未排查到word.content第一次会是object，先做下判断来渲染，后续找到问题再复原
        let txt = typeof word.content === "object" ? word.content.m : word.content;
        ctx.fillText(txt, (pos_x + word.left) / Store.zoomRatio, (pos_y + word.top) / Store.zoomRatio);

        if (word.cancelLine != null) {
            let c = word.cancelLine;
            ctx.beginPath();
            ctx.moveTo(
                Math.floor((pos_x + c.startX) / Store.zoomRatio) + 0.5,
                Math.floor((pos_y + c.startY) / Store.zoomRatio) + 0.5,
            );
            ctx.lineTo(
                Math.floor((pos_x + c.endX) / Store.zoomRatio) + 0.5,
                Math.floor((pos_y + c.endY) / Store.zoomRatio) + 0.5,
            );
            ctx.lineWidth = Math.floor(c.fs / 9);
            ctx.strokeStyle = ctx.fillStyle;
            ctx.stroke();
            ctx.closePath();
        }

        if (word.underLine != null) {
            let underLines = word.underLine;
            for (let a = 0; a < underLines.length; a++) {
                let item = underLines[a];
                ctx.beginPath();
                ctx.moveTo(
                    Math.floor((pos_x + item.startX) / Store.zoomRatio) + 0.5,
                    Math.floor((pos_y + item.startY) / Store.zoomRatio),
                );
                ctx.lineTo(
                    Math.floor((pos_x + item.endX) / Store.zoomRatio) + 0.5,
                    Math.floor((pos_y + item.endY) / Store.zoomRatio) + 0.5,
                );
                ctx.lineWidth = Math.floor(item.fs / 9);
                ctx.strokeStyle = ctx.fillStyle;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    // ctx.fillStyle = "rgba(0,0,0,0.2)";
    // ctx.fillRect((pos_x + values[0].left)/Store.zoomRatio, (pos_y+values[0].top-values[0].asc)/Store.zoomRatio, textInfo.textWidthAll, textInfo.textHeightAll)
    // ctx.fillStyle = "rgba(255,0,0,1)";
    // ctx.fillRect(pos_x+textInfo.textLeftAll-2, pos_y+textInfo.textTopAll-2, 4,4);
    if (textInfo.rotate != 0 && textInfo.type != "verticalWrap") {
        ctx.restore();
    }
}

export {
    luckysheetDrawgridRowTitle,
    luckysheetDrawgridColumnTitle,
    luckysheetDrawMain,
    getCellOverflowMap,
    sparklinesRender,
    cellOverflow_colIn,
    cellOverflowRender,
    cellTextRender,
};
