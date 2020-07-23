import mobileinit from './mobile';
import luckysheetConfigsetting from './luckysheetConfigsetting';
import luckysheetFreezen from './freezen';
import pivotTable from './pivotTable';
import luckysheetDropCell from './dropCell';
import luckysheetPostil from './postil';
import menuButton from './menuButton';
import conditionformat from './conditionformat';
import alternateformat from './alternateformat';
import ifFormulaGenerator from './ifFormulaGenerator';
import sheetmanage from './sheetmanage';
import server from './server';
import luckysheetupdateCell from './updateCell';
import { luckysheet_searcharray } from './sheetSearch';
import { modelHTML, sheetselectlistitemHTML, sheetselectlistHTML, keycode } from './constant';
import luckysheetsizeauto from './resize'; 
import { 
    luckysheetMoveHighlightCell, 
    luckysheetMoveHighlightCell2, 
    luckysheetMoveHighlightRange, 
    luckysheetMoveHighlightRange2 
} from './sheetMove';
import { selectHightlightShow, selectIsOverlap, selectionCopyShow, luckysheet_count_show } from './select';
import selection from './selection';
import searchReplace from './searchReplace';
import controlHistory from './controlHistory';
import splitColumn from './splitColumn';
import { labelFilterOptionState, orderbydatafiler, createFilter, createFilterOptions } from './filter';
import insertFormula from './insertFormula';
import { 
    replaceHtml,
    getObjType, 
    chatatABC, 
    ArrayUnique,
    getByteLen,
    rgbTohex, 
    showrightclickmenu, 
    luckysheetactiveCell, 
    numFormat,
    mouseclickposition, 
} from '../utils/util';
import { getSheetIndex, getRangetxt } from '../methods/get';
import { 
    rowLocation, 
    rowLocationByIndex, 
    colLocation, 
    colLocationByIndex, 
    mouseposition 
} from '../global/location';
import { rowlenByRange } from '../global/getRowlen';
import { isRealNull, isRealNum, hasPartMC, isEditMode } from '../global/validate';
import { countfunc } from '../global/count';
import browser from '../global/browser';
import formula from '../global/formula';
import { luckysheetextendtable, luckysheetdeletetable } from '../global/extend';
import cleargridelement from '../global/cleargridelement';
import luckysheetscrollevent from '../global/scroll';
import { 
    jfrefreshgrid, 
    jfrefreshgridall, 
    jfrefreshgrid_rhcw,
    luckysheetrefreshgrid, 
} from '../global/refresh';
import { getdatabyselection, getcellvalue, datagridgrowth } from '../global/getdata';
import { orderbydata, orderbydata1D, sortColumnSeletion } from '../global/sort';
import tooltip from '../global/tooltip';
import editor from '../global/editor';
import { isdatatype } from '../global/datecontroll';
import json from '../global/json';
import { update, genarate } from '../global/format';
import method from '../global/method';
import { getBorderInfoCompute } from '../global/border';
import { luckysheetDrawMain } from '../global/draw';
import Store from '../store';

//, columeflowset, rowflowset
export default function luckysheetHandler() {
    //移动端
    if(browser.mobilecheck()){
        mobileinit();
    }

    //滚动监听
    $("#luckysheet-cell-main").scroll(function () {
        
    })
    .mousewheel(function (event, delta) {
        event.preventDefault();
    });

    $("#luckysheet-grid-window-1").mousewheel(function (event, delta) {
        let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(), 
            scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
        let visibledatacolumn_c = Store.visibledatacolumn, 
            visibledatarow_c = Store.visibledatarow;

        if (luckysheetFreezen.freezenhorizontaldata != null) {
            visibledatarow_c = luckysheetFreezen.freezenhorizontaldata[3];
        }

        if (luckysheetFreezen.freezenverticaldata != null) {
            visibledatacolumn_c = luckysheetFreezen.freezenverticaldata[3];
        }

        visibledatacolumn_c = ArrayUnique(visibledatacolumn_c);
        visibledatarow_c = ArrayUnique(visibledatarow_c);

        let col_st = luckysheet_searcharray(visibledatacolumn_c, scrollLeft);
        let row_st = luckysheet_searcharray(visibledatarow_c, scrollTop);

        let colscroll = 0;
        let rowscroll = 0;

        //一次滚动三行或三列
        if(event.deltaX != 0){
            let col_ed;
            
            if(event.deltaX < 0){
                col_ed = col_st + 3;
                
                if(col_ed >= visibledatacolumn_c.length){
                    col_ed = visibledatacolumn_c.length - 1;
                }
            }
            else{
                col_ed = col_st - 3;
                
                if(col_ed < 0){
                    col_ed = 0;
                }
            }

            colscroll = col_ed == 0 ? 0 : visibledatacolumn_c[col_ed - 1];

            $("#luckysheet-scrollbar-x").scrollLeft(colscroll);
        }

        if(event.deltaY != 0){
            let row_ed;

            if(event.deltaY < 0){
                row_ed = row_st + 3;
                
                if(row_ed >= visibledatarow_c.length){
                    row_ed = visibledatarow_c.length - 1;
                }
            }
            else{
                row_ed = row_st - 3;
                
                if(row_ed < 0){
                    row_ed = 0;
                }
            }

            rowscroll = row_ed == 0 ? 0 : visibledatarow_c[row_ed - 1];

            $("#luckysheet-scrollbar-y").scrollTop(rowscroll);
        }
    });

    $("#luckysheet-scrollbar-x").scroll(function(){
        setTimeout(function(){
            luckysheetscrollevent(true);
        },10); 
    })
    .mousewheel(function (event, delta) {
        event.preventDefault();
    });

    $("#luckysheet-scrollbar-y").scroll(function(){
		setTimeout(function(){
            luckysheetscrollevent(true);
        },10);
    })
    .mousewheel(function (event, delta) {
        event.preventDefault();
    });

    //页面resize
    $(window).resize(function () {
        let luckysheetDocument = document.getElementById(Store.container);
        if(luckysheetDocument){
            luckysheetsizeauto();
        }            
    });

    // //禁止前台编辑
    // if(!Store.allowEdit){
    //     return;
    // }

    //选区拖动替换
    $("#luckysheet-cell-main div.luckysheet-cs-draghandle").mousedown(function (event) {
        if(isEditMode()){//此模式下禁用选区拖动
            return;
        }

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle")
        .css("cursor","move")
        .end()
        .find(".luckysheet-cs-draghandle")
        .css("cursor","move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","move");

        Store.luckysheet_cell_selected_move = true;
        Store.luckysheet_scroll_status = true;

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        let row_location = rowLocation(y), 
            row_pre = row_location[0], 
            row = row_location[1], 
            row_index = row_location[2];
        let col_location = colLocation(x), 
            col_pre = col_location[0], 
            col = col_location[1], 
            col_index = col_location[2];

        Store.luckysheet_cell_selected_move_index = [row_index, col_index];

        $("#luckysheet-cell-selected-move").css({ 
            "left": col_pre, 
            "width": col - col_pre - 1, 
            "top": row_pre, 
            "height": row - row_pre - 1, 
            "display": "block" 
        });

        event.stopPropagation();
    });

    //选区下拉
    $("#luckysheet-cell-main div.luckysheet-cs-fillhandle").mousedown(function (event) {
        if(isEditMode()){//此模式下禁用选区下拉
            return;
        }

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle")
        .css("cursor","crosshair")
        .end()
        .find(".luckysheet-cs-draghandle")
        .css("cursor","crosshair");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","crosshair");

        Store.luckysheet_cell_selected_extend_time = setTimeout(function () {
            Store.luckysheet_cell_selected_extend = true;
            Store.luckysheet_scroll_status = true;

            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft() - 5;
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop() - 5;

            let row_location = rowLocation(y), 
                row_pre = row_location[0], 
                row = row_location[1], 
                row_index = row_location[2];
            let col_location = colLocation(x), 
                col_pre = col_location[0], 
                col = col_location[1], 
                col_index = col_location[2];

            Store.luckysheet_cell_selected_extend_index = [row_index, col_index];

            $("#luckysheet-cell-selected-extend").css({ 
                "left": col_pre, 
                "width": col - col_pre - 1, 
                "top": row_pre, 
                "height": row - row_pre - 1, 
                "display": "block" 
            });
        }, 100);

        event.stopPropagation();
    }).click(function () {
        clearTimeout(Store.luckysheet_cell_selected_extend_time);
        event.stopPropagation();
    }).dblclick(function () {
        let last = Store.luckysheet_select_save[0];

        let r0 = last.row[0], 
            r1 = last.row[1], 
            c0 = last.column[0], 
            c1 = last.column[1];

        if(pivotTable.isPivotRange(r0, c0)){
            return;
        }

        let dropCellState = false;
        let step = 0;

        for(let r = r1 + 1; r < Store.flowdata.length; r++){
            if(c0 - 1 >= 0 && c1 + 1 < Store.flowdata[0].length){
                let cell1 = Store.flowdata[r][c0 - 1];
                let cell2 = Store.flowdata[r][c1 + 1];

                if(r == r1 + 1){
                    if((cell1 == null || isRealNull(cell1.v)) && (cell2 == null || isRealNull(cell2.v))){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if((cell1 == null || isRealNull(cell1.v)) && (cell2 == null || isRealNull(cell2.v))){
                        break;
                    }

                    step++;
                }
            }
            else if(c0 - 1 >= 0){
                let cell = Store.flowdata[r][c0 - 1];

                if(r == r1 + 1){
                    if(cell == null || isRealNull(cell.v)){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if(cell == null || isRealNull(cell.v)){
                        break;
                    }

                    step++;
                }
            }
            else if(c1 + 1 < Store.flowdata[0].length){
                let cell = Store.flowdata[r][c1 + 1];

                if(r == r1 + 1){
                    if(cell == null || isRealNull(cell.v)){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if(cell == null || isRealNull(cell.v)){
                        break;
                    }

                    step++;
                }
            }
        }

        if(!dropCellState || step == 0){
            event.stopPropagation();
            return;
        }

        //复制范围
        luckysheetDropCell.copyRange = { "row": [r0, r1], "column": [c0, c1] };

        //applyType
        let typeItemHide = luckysheetDropCell.typeItemHide();

        if(!typeItemHide[0] && !typeItemHide[1] && !typeItemHide[2] && !typeItemHide[3] && !typeItemHide[4] && !typeItemHide[5] && !typeItemHide[6]){
            luckysheetDropCell.applyType = "0";
        }
        else{
            luckysheetDropCell.applyType = "1";
        }

        luckysheetDropCell.applyRange = { "row": [r1 + 1, r1 + step], "column": [c0, c1] };
        luckysheetDropCell.direction = "down";

        Store.luckysheet_select_save = [{ "row": [r0, r1 + step], "column": [c0, c1] }];

        luckysheetDropCell.update();
        luckysheetDropCell.createIcon();

        $("#luckysheet-cell-selected-move").hide();

        $("#luckysheet-sheettable").css("cursor", "default");
        clearTimeout(Store.countfuncTimeout);
        Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);

        event.stopPropagation();
    });

    //表格mousedown
    $("#luckysheet-cell-main, #luckysheetTableContent").mousedown(function (event) {
        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle")
        .css("cursor","default")
        .end()
        .find(".luckysheet-cs-draghandle")
        .css("cursor","default");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","default");

        //有批注在编辑时
        luckysheetPostil.removeActivePs();

        //luckysheetautoadjustmousedown = 1;
        let mouse = mouseposition(event.pageX, event.pageY);
        if (mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize || mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize) {
            return;
        }

        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        if(luckysheetFreezen.freezenverticaldata != null && mouse[0] < (luckysheetFreezen.freezenverticaldata[0] - luckysheetFreezen.freezenverticaldata[2])){
            x = mouse[0] + luckysheetFreezen.freezenverticaldata[2];
        }

        if(luckysheetFreezen.freezenhorizontaldata != null && mouse[1] < (luckysheetFreezen.freezenhorizontaldata[0] - luckysheetFreezen.freezenhorizontaldata[2])){
            y = mouse[1] + luckysheetFreezen.freezenhorizontaldata[2];
        }

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];
        
        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        let row_index_ed = row_index, col_index_ed = col_index;
        let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];
            row_index = margeset.row[2];
            row_index_ed = margeset.row[3];

            col = margeset.column[1];
            col_pre = margeset.column[0];
            col_index = margeset.column[2];
            col_index_ed = margeset.column[3];
        }

        //若点击单元格部分不在视图内
        if(col_pre < $("#luckysheet-cell-main").scrollLeft()){
            $("#luckysheet-scrollbar-x").scrollLeft(col_pre);
        }

        if(row_pre < $("#luckysheet-cell-main").scrollTop()){
            $("#luckysheet-scrollbar-y").scrollTop(row_pre);
        }

        //mousedown是右键
        if (event.which == "3") {
            let isright = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                if (Store.luckysheet_select_save[s]["row"] != null && (row_index >= Store.luckysheet_select_save[s]["row"][0] && row_index <= Store.luckysheet_select_save[s]["row"][1] && col_index >= Store.luckysheet_select_save[s]["column"][0] && col_index <= Store.luckysheet_select_save[s]["column"][1])) {
                    isright = true;
                    break;
                }    
            }

            if(isright){
                return;
            }
        }

        //单元格数据下钻
        if(Store.flowdata[row_index] != null && Store.flowdata[row_index][col_index] != null && Store.flowdata[row_index][col_index].dd != null){
            if(luckysheetConfigsetting.fireMousedown != null && getObjType(luckysheetConfigsetting.fireMousedown) == "function"){
                luckysheetConfigsetting.fireMousedown(Store.flowdata[row_index][col_index].dd);
                return;
            }
        }

        Store.luckysheet_scroll_status = true;

        //公式相关
        let $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {
            if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()) {
                //公式选区
                let rowseleted = [row_index, row_index_ed];
                let columnseleted = [col_index, col_index_ed];

                let left = col_pre;
                let width = col - col_pre - 1;
                let top = row_pre;
                let height = row - row_pre - 1;

                if(event.shiftKey){
                    let last = formula.func_selectedrange;

                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if(last.row[1] > last.row_focus){
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    }
                    else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    }
                    else {
                        top = last.top;
                        height = row - last.top - 1;

                        if(last.row[0] < last.row_focus){
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if(last.column[1] > last.column_focus){
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    }
                    else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    }
                    else {
                        left = last.left;
                        width = col - last.left - 1;

                        if(last.column[0] < last.column_focus){
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                    if(changeparam != null){
                        columnseleted = changeparam[0];
                        rowseleted= changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    let vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            let currSelection = window.getSelection();
                            formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            let textRange = document.selection.createRange();
                            formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        formula.canceFunctionrangeSelected();
                        formula.createRangeHightlight();
                    }

                    formula.rangestart = false;
                    formula.rangedrag_column_start = false;
                    formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    formula.israngeseleciton();
                    formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": top, 
                        "height": height, 
                        "left_move": left, 
                        "width_move": width, 
                        "top_move": top, 
                        "height_move": height, 
                        "row": rowseleted, 
                        "column": columnseleted, 
                        "row_focus": row_index, 
                        "column_focus": col_index 
                    };
                }
                else{
                    formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": top, 
                        "height": height, 
                        "left_move": left, 
                        "width_move": width, 
                        "top_move": top, 
                        "height_move": height, 
                        "row": rowseleted, 
                        "column": columnseleted, 
                        "row_focus": row_index, 
                        "column_focus": col_index 
                    };
                }

                formula.rangeSetValue({ "row": rowseleted, "column": columnseleted });

                formula.rangestart = true;
                formula.rangedrag_column_start = false;
                formula.rangedrag_row_start = false;

                $("#luckysheet-formula-functionrange-select").css({ 
                    "left": left, 
                    "width": width, 
                    "top": top, 
                    "height": height 
                }).show();
                $("#luckysheet-formula-help-c").hide();
                luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                setTimeout(function(){
                    let currSelection = window.getSelection();
                    let anchorOffset = currSelection.anchorNode;
                    
                    let $editor;
                    if($("#luckysheet-search-formula-parm").is(":visible") || $("#luckysheet-search-formula-parm-select").is(":visible")){
                        $editor = $("#luckysheet-rich-text-editor");
                        formula.rangechangeindex = formula.data_parm_index;
                    }
                    else{
                        $editor = $(anchorOffset).closest("div");
                    }

                    let $span = $editor.find("span[rangeindex='" + formula.rangechangeindex + "']");

                    formula.setCaretPosition($span.get(0), 0, $span.html().length);
                }, 1);
                
                return;
            }
            else {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                Store.luckysheet_select_status = true;

                if($("#luckysheet-info").is(":visible")){
                    Store.luckysheet_select_status = false;
                }
            }
        }
        else {
            Store.luckysheet_select_status = true;
        }

        //条件格式 应用范围可选择多个单元格
        if($("#luckysheet-multiRange-dialog").is(":visible")){
            conditionformat.selectStatus = true;
            Store.luckysheet_select_status = false;

            if(event.shiftKey){
                let last = conditionformat.selectRange[conditionformat.selectRange.length - 1];

                let top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                let left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    rowseleted= changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                last["row"] = rowseleted;
                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;
                last["top_move"] = top;
                last["height_move"] = height;

                conditionformat.selectRange[conditionformat.selectRange.length - 1] = last;
            }
            else if(event.ctrlKey){
                conditionformat.selectRange.push({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": row_pre, 
                    "height": row - row_pre - 1, 
                    "left_move": col_pre, 
                    "width_move": col - col_pre - 1, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [row_index, row_index_ed], 
                    "column": [col_index, col_index_ed], 
                    "row_focus": row_index, 
                    "column_focus": col_index 
                });
            }
            else{
                conditionformat.selectRange = [];
                conditionformat.selectRange.push({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": row_pre, 
                    "height": row - row_pre - 1, 
                    "left_move": col_pre, 
                    "width_move": col - col_pre - 1, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [row_index, row_index_ed], 
                    "column": [col_index, col_index_ed], 
                    "row_focus": row_index, 
                    "column_focus": col_index 
                });
            }
            
            selectionCopyShow(conditionformat.selectRange);
            
            let range = conditionformat.getTxtByRange(conditionformat.selectRange);
            $("#luckysheet-multiRange-dialog input").val(range);
            
            return;
        }
        else{
            conditionformat.selectStatus = false;
            conditionformat.selectRange = [];
        }

        //条件格式 条件值只能选择单个单元格
        if($("#luckysheet-singleRange-dialog").is(":visible")){
            Store.luckysheet_select_status = false;

            selectionCopyShow([{"row": [row_index, row_index], "column": [col_index, col_index]}]);

            let range = getRangetxt(
                Store.currentSheetIndex, 
                { "row": [row_index, row_index], "column": [col_index, col_index] }, 
                Store.currentSheetIndex
            );
            $("#luckysheet-singleRange-dialog input").val(range);

            return;
        }

        //if公式生成器
        if(ifFormulaGenerator.singleRangeFocus){
            $("#luckysheet-ifFormulaGenerator-dialog .singRange").click();
        }
        if($("#luckysheet-ifFormulaGenerator-singleRange-dialog").is(":visible")){
            //选择单个单元格
            Store.luckysheet_select_status = false;
            formula.rangestart = false;

            $("#luckysheet-formula-functionrange-select").css({ 
                "left": col_pre, 
                "width": col - col_pre - 1, 
                "top": row_pre, 
                "height": row - row_pre - 1 
            }).show();
            $("#luckysheet-formula-help-c").hide();

            let range = getRangetxt(
                Store.currentSheetIndex, 
                { "row": [row_index, row_index], "column": [col_index, col_index] }, 
                Store.currentSheetIndex
            );
            $("#luckysheet-ifFormulaGenerator-singleRange-dialog input").val(range);

            return;
        }
        if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){
            //选择范围
            Store.luckysheet_select_status = false;
            formula.func_selectedrange = { 
                "left": col_pre, 
                "width": col - col_pre - 1, 
                "top": row_pre, 
                "height": row - row_pre - 1, 
                "left_move": col_pre, 
                "width_move": col - col_pre - 1, 
                "top_move": row_pre, 
                "height_move": row - row_pre - 1, 
                "row": [row_index, row_index], 
                "column": [col_index, col_index], 
                "row_focus": row_index, 
                "column_focus": col_index 
            };
            formula.rangestart = true;

            $("#luckysheet-formula-functionrange-select").css({ 
                "left": col_pre, 
                "width": col - col_pre - 1, 
                "top": row_pre, 
                "height": row - row_pre - 1 
            }).show();
            $("#luckysheet-formula-help-c").hide();

            let range = getRangetxt(
                Store.currentSheetIndex, 
                { "row": [row_index, row_index], "column": [col_index, col_index] }, 
                Store.currentSheetIndex
            );
            $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);

            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();

            return;
        }

        if (Store.luckysheet_select_status) {
            if(event.shiftKey){
                //按住shift点击，选择范围
                let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]); //选区最后一个

                let top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                let left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    rowseleted= changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                last["row"] = rowseleted;
                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;
                last["top_move"] = top;
                last["height_move"] = height;

                Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                //交替颜色选择范围
                if($("#luckysheet-alternateformat-rangeDialog").is(":visible")){
                    $("#luckysheet-alternateformat-rangeDialog input").val(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save));
                }

                if (pivotTable.luckysheet_pivotTable_select_state) {
                    $("#luckysheet-pivotTable-range-selection-input").val(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name + "!" + chatatABC(Store.luckysheet_select_save[0]["column"][0]) + (Store.luckysheet_select_save[0]["row"][0] + 1) + ":" + chatatABC(Store.luckysheet_select_save[0]["column"][1]) + (Store.luckysheet_select_save[0]["row"][1] + 1));
                }
            }
            else if(event.ctrlKey){
                //选区添加
                Store.luckysheet_select_save.push({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": row_pre, 
                    "height": row - row_pre - 1, 
                    "left_move": col_pre, 
                    "width_move": col - col_pre - 1, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [row_index, row_index_ed], 
                    "column": [col_index, col_index_ed], 
                    "row_focus": row_index, 
                    "column_focus": col_index 
                });
            }
            else{
                Store.luckysheet_select_save = [];
                Store.luckysheet_select_save.push({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": row_pre, 
                    "height": row - row_pre - 1, 
                    "left_move": col_pre, 
                    "width_move": col - col_pre - 1, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [row_index, row_index_ed], 
                    "column": [col_index, col_index_ed], 
                    "row_focus": row_index, 
                    "column_focus": col_index 
                });

                //单元格格式icon对应
                menuButton.menuButtonFocus(Store.flowdata, row_index, col_index);
                //函数公式显示栏
                formula.fucntionboxshow(row_index, col_index);
            }

            selectHightlightShow();

            if(luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null){
                luckysheetFreezen.scrollAdaptOfselect();    
            }

            if(!browser.mobilecheck()){ //非移动端聚焦输入框
                luckysheetactiveCell();
            }
            
            if(server.allowUpdate){
                //允许编辑后的后台更新时
                server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
            }
        }

        //交替颜色
        if(alternateformat.rangefocus){
            alternateformat.rangefocus = false;
            $("#luckysheet-alternateformat-range .fa-table").click();
        }

        $("#luckysheet-row-count-show, #luckysheet-column-count-show").hide();

        if(!isEditMode()){
            //chartMix 隐藏当前页的数据选择区域高亮
            !!window.store && store.commit("hideAllNeedRangeShow");  
        }
        
        $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]));

        //数据透视表
        pivotTable.pivotclick(row_index, col_index, Store.currentSheetIndex);

        $("#" + Store.container).attr("tabindex", 0).focus();

        //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-sel").removeClass("luckysheet-cols-h-cell-sel").addClass("luckysheet-cols-h-cell-nosel");

        //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-sel").removeClass("luckysheet-rows-h-cell-sel").addClass("luckysheet-rows-h-cell-nosel");


        //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-nosel").eq(col_index).removeClass("luckysheet-cols-h-cell-nosel").addClass("luckysheet-cols-h-cell-sel");

        //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-nosel").eq(row_index).removeClass("luckysheet-rows-h-cell-nosel").addClass("luckysheet-rows-h-cell-sel");

        //event.stopImmediatePropagation();

    }).mouseup(function (event) {
        if (event.which == "3") {
            if(isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            let x = event.pageX;
            let y = event.pageY;
            let data = Store.flowdata;

            let obj_s = Store.luckysheet_select_save[0];

            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-handleincell").show();
            $("#luckysheet-cols-rows-add, #luckysheet-cols-rows-shift").hide();

            if (obj_s["row"] != null && obj_s["row"][0] == 0 && obj_s["row"][1] == Store.flowdata.length - 1) {
                Store.luckysheetRightHeadClickIs = "column";

                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("宽");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

                $("#luckysheet-cols-rows-add").show();
                $("#luckysheet-cols-rows-data").show();
                $("#luckysheet-cols-rows-shift").hide();
                $("#luckysheet-cols-rows-handleincell").hide();
                
                Store.luckysheet_cols_menu_status = true;

                //列宽默认值
                let cfg = $.extend(true, {}, Store.config);
                if(cfg["columlen"] == null){
                    cfg["columlen"] = {};
                }

                let first_collen = cfg["columlen"][Store.luckysheet_select_save[0].column[0]] == null ? Store.defaultcollen : cfg["columlen"][Store.luckysheet_select_save[0].column[0]];
                let isSame = true;

                for(let i = 0; i < Store.luckysheet_select_save.length; i++){
                    let s = Store.luckysheet_select_save[i];
                    let c1 = s.column[0], c2 = s.column[1];

                    for(let c = c1; c <= c2; c++){
                        let collen = cfg["columlen"][c] == null ? Store.defaultcollen : cfg["columlen"][c];

                        if(collen != first_collen){
                            isSame = false;
                            break;
                        }
                    }
                }

                if(isSame){
                    $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val(first_collen);
                }
                else{
                    $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val("");
                }
            }
            else if (obj_s["column"] != null && obj_s["column"][0] == 0 && obj_s["column"][1] == Store.flowdata[0].length - 1) {
                Store.luckysheetRightHeadClickIs = "row";

                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("行");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("高");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("上");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("下");
                
                $("#luckysheet-cols-rows-add").show();
                $("#luckysheet-cols-rows-data").show();
                $("#luckysheet-cols-rows-shift").hide();
                $("#luckysheet-cols-rows-handleincell").hide();

                Store.luckysheet_cols_menu_status = true;

                //行高默认值
                let cfg = $.extend(true, {}, Store.config);
                if(cfg["rowlen"] == null){
                    cfg["rowlen"] = {};
                }

                let first_rowlen = cfg["rowlen"][Store.luckysheet_select_save[0].row[0]] == null ? Store.defaultrowlen : cfg["rowlen"][Store.luckysheet_select_save[0].row[0]];
                let isSame = true;

                for(let i = 0; i < Store.luckysheet_select_save.length; i++){
                    let s = Store.luckysheet_select_save[i];
                    let r1 = s.row[0], r2 = s.row[1];

                    for(let r = r1; r <= r2; r++){
                        let rowlen = cfg["rowlen"][r] == null ? Store.defaultrowlen : cfg["rowlen"][r];

                        if(rowlen != first_rowlen){
                            isSame = false;
                            break;
                        }
                    }
                }

                if(isSame){
                    $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val(first_rowlen);
                }
                else{
                    $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val("");
                }
            }

            showrightclickmenu($("#luckysheet-rightclick-menu"), x, y);
        }
    }).dblclick(function (event) {
        if(parseInt($("#luckysheet-input-box").css("top")) > 0){
            return;
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        if (mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize || mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize) {
            return;
        }

        let scrollLeft = $("#luckysheet-cell-main").scrollLeft(), 
            scrollTop = $("#luckysheet-cell-main").scrollTop();
        let x = mouse[0] + scrollLeft;
        let y = mouse[1] + scrollTop;

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];

        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        if (pivotTable.isPivotRange(row_index, col_index)) {
            //数据透视表没有 任何数据
            if((pivotTable.filter == null || pivotTable.filter.length == 0) && (pivotTable.row == null || pivotTable.row.length == 0) && (pivotTable.column == null || pivotTable.column.length == 0) && (pivotTable.values == null || pivotTable.values.length == 0)){
                return;
            }

            //数据透视表没有 数值数据
            if(pivotTable.values == null || pivotTable.values.length == 0){
                return;
            }

            //点击位置不是 数值数据 所在区域
            if(row_index == 0 || col_index == 0){
                return;
            }

            if(pivotTable.column != null && pivotTable.column.length > 0){
                if(pivotTable.values.length >= 2 && pivotTable.showType == "column"){
                    if(row_index <= pivotTable.column.length || col_index >= pivotTable.pivotDatas[0].length - pivotTable.values.length){
                        return;
                    }
                }
                else{
                    if(row_index <= pivotTable.column.length - 1 || col_index >= pivotTable.pivotDatas[0].length - 1){
                        return;
                    }
                }
            }

            if(pivotTable.row != null && pivotTable.row.length > 0){
                if(pivotTable.values.length >= 2 && pivotTable.showType == "row"){
                    if(col_index <= pivotTable.row.length || row_index >= pivotTable.pivotDatas.length - pivotTable.values.length){
                        return;
                    }
                }
                else{
                    if(col_index <= pivotTable.row.length - 1 || row_index >= pivotTable.pivotDatas.length - 1){
                        return;
                    }
                }
            }

            sheetmanage.addNewSheet(event);

            pivotTable.drillDown(row_index, col_index);
            
            return;
        }

        let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];
            row_index = margeset.row[2];
            col = margeset.column[1];
            col_pre = margeset.column[0];
            col_index = margeset.column[2];
        }

        if($("#luckysheet-search-formula-parm").is(":visible")||$("#luckysheet-search-formula-parm-select").is(":visible")){
            //公式参数栏显示
            $("#luckysheet-cell-selected").hide();
        }
        else if($("#luckysheet-conditionformat-dialog").is(":visible")||$("#luckysheet-administerRule-dialog").is(":visible")||$("#luckysheet-newConditionRule-dialog").is(":visible")||$("#luckysheet-editorConditionRule-dialog").is(":visible")||$("#luckysheet-singleRange-dialog").is(":visible")||$("#luckysheet-multiRange-dialog").is(":visible")){
            //条件格式
            return;
        }
        else if($("#luckysheet-modal-dialog-slider-alternateformat").is(":visible") || $("#luckysheet-alternateformat-rangeDialog").is(":visible")){
            //交替颜色
            return;
        }
        else{
            if(menuButton.luckysheetPaintModelOn){
                menuButton.cancelPaintModel();
            }
            
            luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata);
        }
    });

    //
    $("#luckysheet-bottom-add-row, #luckysheet-bottom-add-row-input, #luckysheet-bottom-return-top").on("mousedown dblclick mouseup",function(e){
        e.stopPropagation();
    });

    //底部添加行按钮
    $("#luckysheet-bottom-add-row").on("click", function(e) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        let $t = $(this), value = $("#luckysheet-bottom-add-row-input").val();
        
        if(value == ""){
            value = 100;
        }

        if (isNaN(parseInt(value))) {
            if(isEditMode()){
                alert("请输入数字");
            }
            else{
                tooltip.info("增加错误", "请输入数字");
            }
            return;
        }

        value = parseInt(value);
        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误", "增加范围限制在1-100");
            }
            return;
        }

        luckysheetextendtable("row", Store.flowdata.length - 1, value);
    });

    $("#luckysheet-bottom-return-top").on("click", function(e) {
        $("#luckysheet-scrollbar-y").scrollTop(0);
    });

    //单元格编辑输入
    let luckysheet_shiftkeydown = false;

    $("#luckysheet-input-box").click(function () {
        formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));
    }).add("#" + Store.container).on("keydown", function (event) {
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("formulaInputFocus")) {
            return;
        }

        let ctrlKey = event.ctrlKey;
        let altKey = event.altKey;
        let shiftKey = event.shiftKey;
        let kcode = event.keyCode;
        
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("sp-input") || (parseInt($("#luckysheet-input-box").css("top")) > 0 && $(event.target).closest(".luckysheet-input-box").length > 0 && kcode != keycode.ENTER && kcode != keycode.TAB && kcode != keycode.UP && kcode != keycode.DOWN && kcode != keycode.LEFT && kcode != keycode.RIGHT)) {
            let anchor = $(window.getSelection().anchorNode);
            
            if(anchor.parent().is("#luckysheet-helpbox-cell") || anchor.is("#luckysheet-helpbox-cell")){
                if(kcode == keycode.ENTER){
                    let helpboxValue = $("#luckysheet-helpbox-cell").text();

                    if(formula.iscelldata(helpboxValue)){
                        let cellrange = formula.getcellrange(helpboxValue);
                        
                        Store.luckysheet_select_save = [{ "row": cellrange["row"], "column": cellrange["column"], "row_focus": cellrange["row"][0], "column_focus": cellrange["column"][0] }];
                        selectHightlightShow();
                        
                        $("#luckysheet-helpbox-cell").blur();

                        let scrollLeft = $("#luckysheet-cell-main").scrollLeft(), 
                            scrollTop = $("#luckysheet-cell-main").scrollTop();
                        let winH = $("#luckysheet-cell-main").height(), 
                            winW = $("#luckysheet-cell-main").width();

                        let row = Store.visibledatarow[cellrange["row"][1]], 
                            row_pre = cellrange["row"][0] - 1 == -1 ? 0 : Store.visibledatarow[cellrange["row"][0] - 1];
                        let col = Store.visibledatacolumn[cellrange["column"][1]], 
                            col_pre = cellrange["column"][0] - 1 == -1 ? 0 : Store.visibledatacolumn[cellrange["column"][0] - 1];

                        if (col - scrollLeft - winW + 20 > 0) {
                            $("#luckysheet-scrollbar-x").scrollLeft(col - winW + 20);
                        }
                        else if (col_pre - scrollLeft - 20 < 0) {
                            $("#luckysheet-scrollbar-x").scrollLeft(col_pre - 20);
                        }

                        if (row - scrollTop - winH + 20 > 0) {
                            $("#luckysheet-scrollbar-y").scrollTop(row - winH + 20);
                        }
                        else if (row_pre - scrollTop - 20 < 0) {
                            $("#luckysheet-scrollbar-y").scrollTop(row_pre - 20);
                        }
                    }
                }
            }
            
            return;
        }
        
        let $inputbox = $("#luckysheet-input-box");
        
        if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && formula.searchFunctionCell != null) {
                formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                Store.luckysheet_select_save = [{ 
                    "row": [Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[0]], 
                    "column": [Store.luckysheetCellUpdate[1], Store.luckysheetCellUpdate[1]], 
                    "row_focus": Store.luckysheetCellUpdate[0], 
                    "column_focus": Store.luckysheetCellUpdate[1] 
                }];
                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
            }

            //若有参数弹出框，隐藏
            if($("#luckysheet-search-formula-parm").is(":visible")){
                $("#luckysheet-search-formula-parm").hide();
            }
            //若有参数选取范围弹出框，隐藏
            if($("#luckysheet-search-formula-parm-select").is(":visible")){
                $("#luckysheet-search-formula-parm-select").hide();
            }
            event.preventDefault();
        }
        else if (kcode == keycode.TAB) {
            if (parseInt($inputbox.css("top")) > 0) {
                return;
            }

            luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
            event.preventDefault();
        }
        else if(kcode == keycode.F2){
            if (parseInt($inputbox.css("top")) > 0) {
                return;
            }

            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

            let row_index = last["row_focus"], col_index = last["column_focus"];
            let row = Store.visibledatarow[row_index], 
                row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
            let col = Store.visibledatacolumn[col_index], 
                col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

            luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata);
            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.ESC && parseInt($inputbox.css("top")) > 0) {
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.ENTER) {
            if($(event.target).hasClass("formulaInputFocus") || $("#luckysheet-conditionformat-dialog").is(":visible")){
                return;
            }
            else if (String.fromCharCode(kcode) != null && $("#luckysheet-cell-selected").is(":visible")) {
                let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

                let row_index = last["row_focus"], col_index = last["column_focus"];
                let row = Store.visibledatarow[row_index], 
                    row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
                let col = Store.visibledatacolumn[col_index], 
                    col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

                let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
                if(!!margeset){
                    row = margeset.row[1];
                    row_pre = margeset.row[0];
                    row_index = margeset.row[2];
                    col = margeset.column[1];
                    col_pre = margeset.column[0];
                    col_index = margeset.column[2];
                }

                luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata);
                event.preventDefault();
            }
        }
        else {
            if (ctrlKey || event.metaKey) {
                if (shiftKey) {
                    if (!luckysheet_shiftkeydown) {
                        Store.luckysheet_shiftpositon = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);
                        Store.luckysheet_shiftkeydown = true;
                    }

                    //Ctrl + shift + 方向键  调整选区
                    if (kcode == keycode.UP) {
                        if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                            return;
                        }

                        luckysheetMoveHighlightRange2("up", "rangeOfSelect");
                    }
                    else if (kcode == keycode.DOWN) {
                        if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                            return;
                        }

                        luckysheetMoveHighlightRange2("down", "rangeOfSelect");
                    }
                    else if (kcode == keycode.LEFT) {
                        if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                            return;
                        }

                        luckysheetMoveHighlightRange2("left", "rangeOfSelect");
                    }
                    else if (kcode == keycode.RIGHT) {
                        if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                            return;
                        }

                        luckysheetMoveHighlightRange2("right", "rangeOfSelect");
                    }
                }
                else if (kcode == 66) {//Ctrl + B  加粗
                    $("#luckysheet-icon-bold").click();
                }
                else if (kcode == 67) {//Ctrl + C  复制
                    //复制时存在格式刷状态，取消格式刷
                    if(menuButton.luckysheetPaintModelOn){
                        menuButton.cancelPaintModel();
                    }
                    
                    if(Store.luckysheet_select_save.length == 0){
                        return;
                    }

                    //复制范围内包含部分合并单元格，提示
                    if(Store.config["merge"] != null){
                        let has_PartMC = false;

                        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                            let r1 = Store.luckysheet_select_save[s].row[0], 
                                r2 = Store.luckysheet_select_save[s].row[1];
                            let c1 = Store.luckysheet_select_save[s].column[0], 
                                c2 = Store.luckysheet_select_save[s].column[1];

                            has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                            if(has_PartMC){
                                break;
                            }
                        }

                        if(has_PartMC){
                            if(isEditMode()){
                                alert("无法对部分合并单元格执行此操作");
                            }
                            else{
                                tooltip.info("无法对部分合并单元格执行此操作", ""); 
                            }
                            return;    
                        }
                    }

                    //多重选区 有条件格式时 提示
                    let cdformat = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].luckysheet_conditionformat_save;
                    if(Store.luckysheet_select_save.length > 1 && cdformat != null && cdformat.length > 0){
                        let hasCF = false;

                        let cf_compute = conditionformat.getComputeMap();

                        label:
                        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                            if(hasCF){
                                break;
                            }
                            
                            let r1 = Store.luckysheet_select_save[s].row[0], 
                                r2 = Store.luckysheet_select_save[s].row[1];
                            let c1 = Store.luckysheet_select_save[s].column[0], 
                                c2 = Store.luckysheet_select_save[s].column[1];

                            for(let r = r1; r <= r2; r++){
                                for(let c = c1; c <= c2; c++){
                                    if(conditionformat.checksCF(r, c, cf_compute) != null){
                                        hasCF = true;
                                        continue label;
                                    }
                                }
                            }
                        }

                        if(hasCF){
                            if(isEditMode()){
                                alert("无法对多重选择区域执行此操作");
                            }
                            else{
                                tooltip.info("无法对多重选择区域执行此操作", "");
                            }
                            return;
                        }
                    }

                    //多重选区 行不一样且列不一样时 提示
                    if(Store.luckysheet_select_save.length > 1){ 
                        let isSameRow = true, 
                            str_r = luckysheet_select_save[0].row[0], 
                            end_r = luckysheet_select_save[0].row[1];
                        let isSameCol = true, 
                            str_c = luckysheet_select_save[0].column[0], 
                            end_c = luckysheet_select_save[0].column[1];
                        
                        for(let s = 1; s < luckysheet_select_save.length; s++){
                            if(luckysheet_select_save[s].row[0] != str_r || luckysheet_select_save[s].row[1] != end_r){
                                isSameRow = false;
                            }
                            if(luckysheet_select_save[s].column[0] != str_c || luckysheet_select_save[s].column[1] != end_c){
                                isSameCol = false;
                            }
                        }

                        if((!isSameRow && !isSameCol) || selectIsOverlap()){
                            if(isEditMode()){
                                alert("无法对多重选择区域执行此操作");
                            }
                            else{
                                tooltip.info("无法对多重选择区域执行此操作", ""); 
                            }
                            return;
                        }    
                    }

                    selection.copy(event);

                    Store.luckysheet_paste_iscut = false;
                    luckysheetactiveCell();

                    event.stopPropagation();
                    return;
                }
                else if (kcode == 70) {//Ctrl + F  查找
                    searchReplace.createDialog(0);
                    searchReplace.init();

                    $("#luckysheet-search-replace #searchInput input").focus();
                }
                else if (kcode == 72) {//Ctrl + H  替换
                    searchReplace.createDialog(1);
                    searchReplace.init();

                    $("#luckysheet-search-replace #searchInput input").focus();
                }
                else if (kcode == 73) {//Ctrl + I  斜体
                    $("#luckysheet-icon-italic").click();
                }
                else if (kcode == 86) {//Ctrl + V  粘贴
                    if(isEditMode()){//此模式下禁用粘贴
                        return;
                    }

                    if($(event.target).hasClass("formulaInputFocus")){
                        return;
                    }

                    if(Store.luckysheet_select_save.length > 1){
                        if(isEditMode()){
                            alert("无法在此处粘贴此内容，请选择粘贴区域的一个单元格，然后再次尝试粘贴");
                        }
                        else{
                            tooltip.info("无法在此处粘贴此内容，请选择粘贴区域的一个单元格，然后再次尝试粘贴", "");
                        }
                        return;
                    }

                    selection.isPasteAction = true;
                    luckysheetactiveCell();

                    event.stopPropagation();
                    return;
                }
                else if (kcode == 88) {//Ctrl + X  剪切
                    //复制时存在格式刷状态，取消格式刷
                    if(menuButton.luckysheetPaintModelOn){
                        menuButton.cancelPaintModel();
                    }

                    if(Store.luckysheet_select_save.length == 0){
                        return;
                    }

                    //复制范围内包含部分合并单元格，提示
                    if(Store.config["merge"] != null){
                        let has_PartMC = false;

                        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                            let r1 = Store.luckysheet_select_save[s].row[0], 
                                r2 = Store.luckysheet_select_save[s].row[1];
                            let c1 = Store.luckysheet_select_save[s].column[0], 
                                c2 = Store.luckysheet_select_save[s].column[1];

                            has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                            if(has_PartMC){
                                break;
                            }
                        }

                        if(has_PartMC){
                            if(luckysheetConfigsetting.editMode){
                                alert("无法对合并单元格执行此操作");
                            }
                            else{
                                tooltip.info("无法对合并单元格执行此操作", ""); 
                            }
                            return;    
                        }
                    }

                    //多重选区时 提示
                    if(Store.luckysheet_select_save.length > 1){
                        if(isEditMode()){
                            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                        }
                        else{
                            tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                        }
                        return;
                    }

                    selection.copy(event);

                    Store.luckysheet_paste_iscut = true;
                    luckysheetactiveCell();
                    
                    event.stopPropagation();
                    return;
                }
                else if (kcode == 90) {//Ctrl + Z  撤销
                    controlHistory.redo(event);
                    luckysheetactiveCell();
                    event.stopPropagation();
                    return;
                }
                else if (kcode == 89) {//Ctrl + Y  重做
                    controlHistory.undo(event);
                    luckysheetactiveCell();
                    event.stopPropagation();
                    return;
                }
                else if (kcode == keycode.UP) {//Ctrl + up  调整单元格
                    if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                        return;
                    }

                    luckysheetMoveHighlightCell2("up", "rangeOfSelect");
                }
                else if (kcode == keycode.DOWN) {//Ctrl + down  调整单元格
                    if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                        return;
                    }

                    luckysheetMoveHighlightCell2("down", "rangeOfSelect");
                }
                else if (kcode == keycode.LEFT) {//Ctrl + top  调整单元格
                    if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                        return;
                    }

                    luckysheetMoveHighlightCell2("left", "rangeOfSelect");
                }
                else if (kcode == keycode.RIGHT) {//Ctrl + right  调整单元格
                    if (parseInt($inputbox.css("top")) > 0 || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                        return;
                    }

                    luckysheetMoveHighlightCell2("right", "rangeOfSelect");
                }
                else if (String.fromCharCode(kcode).toLocaleUpperCase() == "A") {//Ctrl + A  全选
                    $("#luckysheet-left-top").trigger("mousedown");
                    $(document).trigger("mouseup");
                }

                event.preventDefault();
                return;
            }
            else if (shiftKey && (kcode == keycode.UP || kcode == keycode.DOWN || kcode == keycode.LEFT || kcode == keycode.RIGHT || (altKey && (kcode == 53 || kcode == 101)))) {
                if (parseInt($inputbox.css("top")) > 0 || $(event.target).hasClass("formulaInputFocus")) {
                    return;
                }

                if (!luckysheet_shiftkeydown) {
                    Store.luckysheet_shiftpositon = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);
                    Store.luckysheet_shiftkeydown = true;
                }

                //shift + 方向键 调整选区
                if (kcode == keycode.UP) {
                    if($("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")){
                        return;
                    } 

                    luckysheetMoveHighlightRange("down", -1, "rangeOfSelect");
                }
                else if (kcode == keycode.DOWN) {
                    if($("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")){
                        return;
                    }

                    luckysheetMoveHighlightRange("down", 1, "rangeOfSelect");
                }
                else if (kcode == keycode.LEFT) {
                    if($("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")){
                        return;
                    }

                    luckysheetMoveHighlightRange("right", -1, "rangeOfSelect");
                }
                else if (kcode == keycode.RIGHT) {
                    if($("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")){
                        return;
                    }
                    
                    luckysheetMoveHighlightRange("right", 1, "rangeOfSelect");
                }
                else if (altKey && (kcode == 53 || kcode == 101)) {
                    //Alt + Shift + 5（删除线）
                    $("#luckysheet-icon-strikethrough").click();
                }

                event.preventDefault();
            }
            else if (kcode == keycode.ESC) {
                if(menuButton.luckysheetPaintModelOn){
                    menuButton.cancelPaintModel();
                }
                else{
                    cleargridelement(event);
                    event.preventDefault(); 
                }

                selectHightlightShow();
            }
            else if (kcode == keycode.DELETE) {
                $("#luckysheet-delete-text").click();

                event.preventDefault();
            }
            else if (kcode == keycode.UP) {
                if (parseInt($inputbox.css("top")) > 0 || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.DOWN) {
                if (parseInt($inputbox.css("top")) > 0 || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.LEFT) {
                if (parseInt($inputbox.css("top")) > 0 || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.RIGHT) {
                if (parseInt($inputbox.css("top")) > 0 || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || kcode == 0 || (event.ctrlKey && kcode == 86)) {
                if (String.fromCharCode(kcode) != null && $("#luckysheet-cell-selected").is(":visible") && (kcode != keycode.CAPSLOCK && kcode != keycode.WIN && kcode != 18)) {
                    let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

                    let row_index = last["row_focus"], col_index = last["column_focus"];
                    let row = Store.visibledatarow[row_index], 
                        row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
                    let col = Store.visibledatacolumn[col_index], 
                        col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];
                    
                    let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
                    if(!!margeset){
                        row = margeset.row[1];
                        row_pre = margeset.row[0];
                        row_index = margeset.row[2];
                        col = margeset.column[1];
                        col_pre = margeset.column[0];
                        col_index = margeset.column[2];
                    }

                    luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata, true);
                    if(kcode == 8){
                        $("#luckysheet-rich-text-editor").html("<br/>");
                    }
                    formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                }
            }
        }
        
        luckysheetactiveCell();

        event.stopPropagation();
    });

    //右键菜单 复制按钮
    $("#luckysheet-copy-btn, #luckysheet-cols-copy-btn, #luckysheet-paste-btn-title").click(function (event) {
        $(this).parent().hide();

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        //多重选区 有条件格式时 提示
        let cdformat = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].luckysheet_conditionformat_save;
        if(Store.luckysheet_select_save.length > 1 && cdformat != null && cdformat.length > 0){
            let hasCF = false;

            let cf_compute = conditionformat.getComputeMap();

            label:
            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                if(hasCF){
                    break;
                }
                
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                for(let r = r1; r <= r2; r++){
                    for(let c = c1; c <= c2; c++){
                        if(conditionformat.checksCF(r, c, cf_compute) != null){
                            hasCF = true;
                            continue label;
                        }
                    }
                }
            }

            if(hasCF){
                if(isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    tooltip.info("无法对多重选择区域执行此操作", "");
                }
                return;
            }
        }

        //多重选区 行不一样且列不一样时 提示       
        if(Store.luckysheet_select_save.length > 1){
            let isSameRow = true, 
                str_r = Store.luckysheet_select_save[0].row[0], 
                end_r = Store.luckysheet_select_save[0].row[1];
            let isSameCol = true, 
                str_c = Store.luckysheet_select_save[0].column[0], 
                end_c = Store.luckysheet_select_save[0].column[1];
            
            for(let s = 1; s < Store.luckysheet_select_save.length; s++){
                if(Store.luckysheet_select_save[s].row[0] != str_r || Store.luckysheet_select_save[s].row[1] != end_r){
                    isSameRow = false;
                }
                if(Store.luckysheet_select_save[s].column[0] != str_c || Store.luckysheet_select_save[s].column[1] != end_c){
                    isSameCol = false;
                }
            }

            if((!isSameRow && !isSameCol) || selectIsOverlap()){
                if(isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    tooltip.info("无法对多重选择区域执行此操作", "");  
                }
                return;
            }    
        }
        
        selection.copy(event);
    });

    //右键菜单 粘贴按钮
    $("#luckysheet-copy-paste, #luckysheet-cols-paste-btn, #luckysheet-paste-btn-title").click(function (event) {
        selection.paste(event, "btn");
        $(this).parent().hide();
    });

    //菜单栏 图表按钮
    $("#luckysheet-chart-btn-title").click(function () {
        $("#luckysheetdatavisual").click();
    });

    //菜单栏 数据透视表
    $("#luckysheet-pivot-btn-title").click(function (e) {
        pivotTable.createPivotTable(e);
    });

    //菜单栏 截图按钮
    $("#luckysheet-chart-btn-screenshot").click(function () {
        if(Store.luckysheet_select_save.length == 0){
            if(isEditMode()){
                alert("请框选需要截图的范围");
            }
            else{
                tooltip.info("提示！", "请框选需要截图的范围"); 
            }
            return;
        }

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("无法对多重选择区域执行此操作");
            }
            else{
                tooltip.info("提示！", "无法对多重选择区域执行此操作");  
            }

            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    tooltip.info("提示！", "无法对合并单元格执行此操作");
                }
                return;    
            }
        }

        let st_r = Store.luckysheet_select_save[0].row[0], 
            ed_r = Store.luckysheet_select_save[0].row[1];
        let st_c = Store.luckysheet_select_save[0].column[0], 
            ed_c = Store.luckysheet_select_save[0].column[1];

        let shotData = datagridgrowth([], ed_r + 1, ed_c + 1);

        for(let r = st_r; r <= ed_r; r++){
            for(let c = st_c; c <= ed_c; c++){
                shotData[r][c] = Store.flowdata[r][c];
            }
        }

        let scrollHeight, rh_height;
        if(st_r - 1 < 0){
            scrollHeight = 0;
            rh_height = Store.visibledatarow[ed_r];
        }
        else{
            scrollHeight = Store.visibledatarow[st_r - 1];
            rh_height = Store.visibledatarow[ed_r] - Store.visibledatarow[st_r - 1];
        }

        let scrollWidth, ch_width;
        if(st_c - 1 < 0){
            scrollWidth = 0;
            ch_width = Store.visibledatacolumn[ed_c];
        }
        else{
            scrollWidth = Store.visibledatacolumn[st_c - 1];
            ch_width = Store.visibledatacolumn[ed_c] - Store.visibledatacolumn[st_c - 1];
        }

        let newCanvas = $("<canvas>").attr({ 
            width: Math.ceil(ch_width * devicePixelRatio), 
            height: Math.ceil(rh_height * devicePixelRatio) 
        }).css({ width: ch_width, height: rh_height });

        let d = Store.flowdata;
        Store.flowdata = shotData;

        luckysheetDrawMain(scrollWidth, scrollHeight, ch_width, rh_height, 1, 1, null, null, newCanvas);

        Store.flowdata = d;
        editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

        let image = new Image();
        let url = newCanvas.get(0).toDataURL("image/png");
        image.src = url;

        if(ch_width > rh_height){
            image.style.width = "100%";
        }
        else{
            image.style.height = "100%";
        }

        let maxHeight = $(window).height() - 200;
        tooltip.screenshot("截取成功！", '<div id="luckysheet-confirm-screenshot-save" style="height:'+ maxHeight +'px;overflow:auto;"></div>', url);
        $("#luckysheet-confirm-screenshot-save").append(image);
        newCanvas.remove();
    });

    //截图下载
    $(document).on("click", "a.download", function(){ 
        let dataURI = $("#luckysheet-confirm-screenshot-save img").attr("src");

        let binStr = atob(dataURI.split(",")[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for(let i = 0; i < len; i++){
            arr[i] = binStr.charCodeAt(i);
        }

        let blob = new Blob([arr]);

        let element = document.createElement('a');
        element.setAttribute('href', URL.createObjectURL(blob));
        element.setAttribute('download', '截图.png');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        let clickHandler;
        element.addEventListener('click', clickHandler = function(){
            requestAnimationFrame(function(){
                URL.revokeObjectURL(element.href);
            });    

            element.removeAttribute('href');
            element.removeEventListener('click', clickHandler);
        })

        document.body.removeChild(element);
    })
    
    //菜单栏 分列按钮
    $("#luckysheet-splitColumn-btn-title").click(function(){
        if(Store.luckysheet_select_save == null || Store.luckysheet_select_save.length == 0){
            return;
        }

        if(Store.luckysheet_select_save.length > 1){
            tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            return;
        }

        if(Store.luckysheet_select_save[0].column[0] != Store.luckysheet_select_save[0].column[1]){
            tooltip.info("一次只能转换一列数据，选定区域可以有多行，但不能有多列，请在选定单列区域以后再试", "");
            return;   
        }

        splitColumn.createDialog();
        splitColumn.init();
    });

    //冻结行列
    $("#luckysheet-freezen-btn-horizontal").click(function () {
        if($.trim($(this).text())=="取消冻结"){
            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            if (luckysheetFreezen.freezenhorizontaldata != null) {
                luckysheetFreezen.cancelFreezenHorizontal();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            luckysheetFreezen.scrollAdapt();
        }
        else{
            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            if (luckysheetFreezen.freezenhorizontaldata == null) {
                luckysheetFreezen.createFreezenHorizontal();
                luckysheetFreezen.createAssistCanvas();
            }
        }
    });

    $("#luckysheet-freezen-btn-vertical").click(function () {
        if (luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.cancelFreezenVertical();
            luckysheetrefreshgrid();
        }
        else {
            luckysheetFreezen.createFreezenVertical();
        }
        luckysheetFreezen.createAssistCanvas();
    });

    //右键菜单 菜单项hover
    let submenuhide = null, rightclickmenu = null;
    $(".luckysheet-cols-menu .luckysheet-cols-submenu").hover(
        function () {
            let $t = $(this), attrid = $t.attr("id"), $attr = $("#" + attrid + "_sub"), $con = $t.parent();
            let winW = $(window).width(), winH = $(window).height();
            let menuW = $con.width(), attrH = $attr.height() + 25, attrW = $attr.width() + 5;
            let offset = $t.offset();
            let top = offset.top, left = offset.left + menuW;

            if (left + attrW > winW) {
                left = offset.left - attrW;
            }

            if (top + attrH > winH) {
                top = winH - attrH;
            }

            $attr.css({ "top": top, "left": left }).show();
            rightclickmenu = $t;
        },
        function () {
            let $t = $(this), attrid = $t.attr("id"), $attr = $("#" + attrid + "_sub");
            submenuhide = setTimeout(function () { $attr.hide(); }, 200);
        }
    );

    $(".luckysheet-rightgclick-menu-sub").hover(
        function () {
            rightclickmenu.addClass("luckysheet-cols-menuitem-hover");
            clearTimeout(submenuhide);
        },
        function () {
            rightclickmenu.removeClass("luckysheet-cols-menuitem-hover");
            $(this).hide();
        }
    );

    $(".luckysheet-grid-container, #luckysheet-rightclick-menu").on("contextmenu", function (e) {
        e.preventDefault();
    });

    $("#luckysheet-rightclick-menu input").on("keydown", function (e) {
        e.stopPropagation();
    });

    $("#luckysheet-modal-dialog-mask").on("click dbclick mousedown mousemove mouseup", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    let copychange = function () {
        if (document.hidden || document.webkitHidden || document.msHidden) {
            Store.iscopyself = false;
        }
    }

    $(document).on("visibilitychange webkitvisibilitychange msvisibilitychange", copychange).mouseleave(function () {
        Store.iscopyself = false;
    }).mousedown(function (event) {
        //有批注在编辑时
        luckysheetPostil.removeActivePs();

        if (!$(event.target).hasClass("luckysheet-mousedown-cancel") && $(event.target).filter("[class*='sp-palette']").length == 0 && $(event.target).filter("[class*='sp-thumb']").length == 0 && $(event.target).filter("[class*='sp-']").length == 0) {
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu").hide();
            $("body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu").hide();
            //$("body > luckysheet-menuButton").hide();
            Store.luckysheet_cols_menu_status = false;
        }

        //点击功能栏时 如果是单元格编辑模式 则退出编辑模式 
        if($(event.target).closest("#luckysheet-wa-editor").length > 0 && parseInt($("#luckysheet-input-box").css("top")) > 0){
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
    });

    //单元格编辑 keydown (公式 上下左右键移动)
    $("#" + Store.container).add("#luckysheet-input-box").keydown(function (event) {
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("formulaInputFocus")) {
            return;
        }

        let ctrlKey = event.ctrlKey;
        let altKey = event.altKey;
        let shiftKey = event.shiftKey;
        let kcode = event.keyCode;

        let $inputbox = $("#luckysheet-input-box");
        if (kcode == keycode.ESC && parseInt($("#luckysheet-input-box").css("top")) > 0) {
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && formula.searchFunctionCell != null) {
                formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
                event.preventDefault();
            }
        }
        else if(kcode == keycode.TAB && parseInt($inputbox.css("top")) > 0){
            if ($("#luckysheet-formula-search-c").is(":visible") && formula.searchFunctionCell != null) {
                formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else{
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
            }

            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.UP && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("up", ctrlKey, shiftKey);
        }
        else if (kcode == keycode.DOWN && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("down", ctrlKey, shiftKey);
        }
        else if (kcode == keycode.LEFT && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("left", ctrlKey, shiftKey);
        }
        else if (kcode == keycode.RIGHT && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("right", ctrlKey, shiftKey);
        }
        else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || (event.ctrlKey && kcode == 86)) {
            formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
        }
    }).keyup(function (e) {
        let kcode = e.keyCode;
        
        if (!e.shiftKey && kcode == 16) {
            Store.luckysheet_shiftkeydown = false;
            Store.luckysheet_shiftpositon = null;
        }

        //输入框中文输入后 shift 和 空格 处理
        if(parseInt($("#luckysheet-input-box").css("top")) > 0 && (kcode == 13 || kcode == 16 || kcode == 32)){
            formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
        }

        e.preventDefault();
    });

    function formulaMoveEvent(dir, ctrlKey, shiftKey){
        if ($("#luckysheet-formula-search-c").is(":visible")) {
            let $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").next();
            if ($up.length == 0) {
                $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").first();
            }

            $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
            $up.addClass("luckysheet-formula-search-item-active");

            event.preventDefault();
        }
        else{
            if($("#luckysheet-formula-functionrange-select").is(":visible")){
                if(ctrlKey && shiftKey){
                    luckysheetMoveHighlightRange2(dir, "rangeOfFormula");
                }
                else if(ctrlKey){
                    luckysheetMoveHighlightCell2(dir, "rangeOfFormula");
                }
                else if(shiftKey){
                    let dir_n = dir, step = 1;
                    if(dir == 'up'){
                        dir_n = 'down';
                        step = -1;
                    }
                    if(dir == 'left'){
                        dir_n = 'right';
                        step = -1;
                    }

                    luckysheetMoveHighlightRange(dir_n, step, "rangeOfFormula");
                }
                else{
                    let dir_n = dir, step = 1;
                    if(dir == 'up'){
                        dir_n = 'down';
                        step = -1;
                    }
                    if(dir == 'left'){
                        dir_n = 'right';
                        step = -1;
                    }

                    luckysheetMoveHighlightCell(dir_n, step, "rangeOfFormula");
                }   
            }
            else if(formula.israngeseleciton()){
                let anchor = $(window.getSelection().anchorNode);
                
                if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                    let vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                    let range = formula.getcellrange(vText);

                    if(range == null){
                        range = formula.getcellrange($("#luckysheet-input-box-index").text());
                    }

                    let r1 = range["row"][0], r2 = range["row"][1];
                    let c1 = range["column"][0], c2 = range["column"][1];

                    let row = Store.visibledatarow[r2], 
                        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
                    let col = Store.visibledatacolumn[c2], 
                        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

                    formula.func_selectedrange = {
                        "left": col_pre,
                        "width": col - col_pre - 1,
                        "top": row_pre,
                        "height": row - row_pre - 1,
                        "left_move": col_pre,
                        "width_move": col - col_pre - 1,
                        "top_move": row_pre,
                        "height_move": row - row_pre - 1,
                        "row": [r1, r2],
                        "column": [c1, c2],
                        "row_focus": r1,
                        "column_focus": c1
                    };

                    formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                    formula.rangestart = true;
                    formula.rangedrag_column_start = false;
                    formula.rangedrag_row_start = false;
                    
                    if(ctrlKey && shiftKey){
                        luckysheetMoveHighlightRange2(dir, "rangeOfFormula");
                    }
                    else if(ctrlKey){
                        luckysheetMoveHighlightCell2(dir, "rangeOfFormula");
                    }
                    else if(shiftKey){
                        let dir_n = dir, step = 1;
                        if(dir == 'up'){
                            dir_n = 'down';
                            step = -1;
                        }
                        if(dir == 'left'){
                            dir_n = 'right';
                            step = -1;
                        }
                        
                        luckysheetMoveHighlightRange(dir_n, step, "rangeOfFormula");
                    }
                    else{
                        let dir_n = dir, step = 1;
                        if(dir == 'up'){
                            dir_n = 'down';
                            step = -1;
                        }
                        if(dir == 'left'){
                            dir_n = 'right';
                            step = -1;
                        }
                        
                        luckysheetMoveHighlightCell(dir_n, step, "rangeOfFormula");
                    } 
                }
            }
            else if(!ctrlKey && !shiftKey){
                let anchor = $(window.getSelection().anchorNode);
                let anchorOffset = window.getSelection().anchorOffset;

                let dir_n = dir, step = 1;
                if(dir == 'up'){
                    dir_n = 'down';
                    step = -1;
                }
                if(dir == 'left'){
                    dir_n = 'right';
                    step = -1;
                }

                if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell(dir_n, step, "rangeOfSelect");
                }
                else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell(dir_n, step, "rangeOfSelect");
                }
                else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell(dir_n, step, "rangeOfSelect");
                }
            }

            event.preventDefault();
        }
    }

    //表格mousemove
    $(document).mousemove(function (event) {
        luckysheetPostil.overshow(event); //有批注显示

        clearInterval(Store.jfautoscrollTimeout);
        
        if(formula.functionResizeStatus){
            let y = event.pageY;
            let movepx = y - formula.functionResizeData.y;
            let mpx = formula.functionResizeData.calculatebarHeight + movepx;
            let winh = Math.round($(window).height()/2);
            
            if(mpx <= 28){
                if(mpx <= 20){
                    return;
                }
                mpx = 28;
            }
            else if(mpx >= winh){
                if(mpx >= winh + 8){
                    return;
                }
                mpx = winh;
            }

            Store.calculatebarHeight = mpx;
            $("#luckysheet-wa-calculate").css("height", Store.calculatebarHeight - 2);
            $("#luckysheet-wa-calculate-size").css({"background":"#5e5e5e", "cursor":"ns-resize"});
            
            clearTimeout(formula.functionResizeTimeout);
            formula.functionResizeTimeout = setTimeout(function(){
                luckysheetsizeauto();
            }, 15);
        }
        else if (!!luckysheetFreezen.horizontalmovestate) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let row_location = rowLocation(y), 
                row = row_location[1], 
                row_pre = row_location[0], 
                row_index = row_location[2];
            let top = mouse[1] + Store.columeHeaderHeight;

            if (top < Store.columeHeaderHeight) {
                top = Store.columeHeaderHeight;
            }

            if (top > luckysheetFreezen.windowHeight - 4) {
                top = luckysheetFreezen.windowHeight - 4;
            }

            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css({ "top": top });

            if (top + scrollTop - Store.columeHeaderHeight >= row_pre + (row - row_pre) / 2) {
                top = row - 2 - scrollTop + Store.columeHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [row, row_index + 1, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_index + 1), top];
            }
            else {
                top = row_pre - 2 - scrollTop + Store.columeHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [row_pre, row_index, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_index), top];
            }

            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-drop").css({ "top": top });
            luckysheetFreezen.saveFreezen(luckysheetFreezen.freezenhorizontaldata, top, null, null);
        }
        else if (!!luckysheetFreezen.verticalmovestate) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let col_location = colLocation(x), 
                col = col_location[1], 
                col_pre = col_location[0], 
                col_index = col_location[2];

            let left = mouse[0] + Store.rowHeaderWidth;

            if (left < Store.rowHeaderWidth) {
                left = Store.rowHeaderWidth;
            }

            if (left > luckysheetFreezen.windowWidth - 4) {
                left = luckysheetFreezen.windowWidth - 4;
            }

            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css({ "left": left });

            if (left + scrollLeft - Store.rowHeaderWidth >= col_pre + (col - col_pre) / 2) {
                left = col - 2 - scrollLeft + Store.rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [col, col_index + 1, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_index + 1), left];
            }
            else {
                left = col_pre - 2 - scrollLeft + Store.rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [col_pre, col_index, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_index), left];
            }

            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-drop").css({ "left": left });
            luckysheetFreezen.saveFreezen(null, null, luckysheetFreezen.freezenverticaldata, left);
            luckysheetsizeauto();//调节选区时下部单元格溢出
        }
        else if (!!pivotTable && pivotTable.movestate) {
            let x = event.pageX, y = event.pageY;
            $("#luckysheet-modal-dialog-slider-pivot-move").css({ 
                "left": x - pivotTable.movesave.width / 2, 
                "top": y - pivotTable.movesave.height 
            });
        }
        else if (Store.luckysheet_sheet_move_status) {
            let scrollLeft = $("#luckysheet-sheet-container-c").scrollLeft();
            let x = event.pageX + scrollLeft;

            if (Math.abs(event.pageX - Store.luckysheet_sheet_move_data.pageX) < 3) {
                return;
            }

            let winW = $("#luckysheet-sheet-container").width();
            let left = x - Store.luckysheet_sheet_move_data.curleft - $("#luckysheet-sheet-container").offset().left;
            Store.luckysheet_sheet_move_data.activeobject.css({ "left": left });

            let row_index = luckysheet_searcharray(Store.luckysheet_sheet_move_data.widthlist, left + Store.luckysheet_sheet_move_data.curleft);
            Store.luckysheet_sheet_move_data.cursorobject.css({ "cursor": "move" });

            if (left - scrollLeft <= 6) {
                $("#luckysheet-sheets-leftscroll").click();
            }

            if (left - scrollLeft >= winW - 40) {
                $("#luckysheet-sheets-rightscroll").click();
            }

            if (row_index != Store.luckysheet_sheet_move_data.curindex) {
                if (row_index == -1 && left > 0) {
                    row_index = Store.luckysheet_sheet_move_data.widthlist.length - 1;
                    $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
                }
                else if (row_index == -1 && left <= 0) {
                    $("#luckysheet-sheets-item-clone").insertBefore($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(0));
                }
                else {
                    $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
                }

                Store.luckysheet_sheet_move_data.widthlist = [];
                $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function (i) {
                    if (i == 0) {
                        Store.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                    }
                    else {
                        Store.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()) + Store.luckysheet_sheet_move_data.widthlist[i - 1]);
                    }
                });

                Store.luckysheet_sheet_move_data.curindex = $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").index($("#luckysheet-sheets-item-clone"));
            }
        }
        else if (Store.luckysheet_model_move_state) {
            let scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft();
            let y = event.pageY + scrollTop, x = event.pageX + scrollLeft;
            let winH = $(window).height(), winW = $(window).width();
            let myh = Store.luckysheet_model_move_obj.height(), 
                myw = Store.luckysheet_model_move_obj.width();
            let top = y - Store.luckysheet_model_xy[1], 
                left = x - Store.luckysheet_model_xy[0];

            if (top < 0) {
                top = 0;
            }

            if (top + myh + 62 > winH) {
                top = winH - myh - 62;
            }

            if (left < 0) {
                left = 0;
            }

            if (left + myw + 86 > winW) {
                left = winW - myw - 86;
            }

            Store.luckysheet_model_move_obj.css({ "top": top, "left": left });
            event.preventDefault();
        }
        else if (!!Store.luckysheet_scroll_status || !!Store.luckysheet_select_status || !!Store.luckysheet_rows_selected_status || !!Store.luckysheet_cols_selected_status || !!Store.luckysheet_cell_selected_move || !!Store.luckysheet_cell_selected_extend || !!Store.luckysheet_cols_change_size || !!Store.luckysheet_rows_change_size || !!formula.rangeResize || !!formula.rangeMove) {
            if (Store.luckysheet_select_status) {
                clearTimeout(Store.countfuncTimeout);
                Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);
            }
            
            Store.jfautoscrollTimeout = setInterval(function () {
                if (Store.luckysheet_scroll_status  && !Store.luckysheet_cols_change_size && !Store.luckysheet_rows_change_size) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let left = $("#luckysheet-scrollbar-x").scrollLeft(), 
                        top = $("#luckysheet-scrollbar-y").scrollTop();
                    let x = mouse[0];
                    let y = mouse[1];
                    let winH = $("#luckysheet-cell-main").height() - 20, 
                        winW = $("#luckysheet-cell-main").width() - 60;

                    if (y < 0 || y > winH) {
                        let stop;
                        if (y < 0) {
                            stop = top + y/2;
                        }
                        else {
                            stop = top + (y - winH)/2;
                        }
                        $("#luckysheet-scrollbar-y").scrollTop(stop);
                    }

                    if (x < 0 || x > winW) {
                        let sleft;
                        if (x < 0) {
                            sleft = left + x/2;
                        }
                        else {
                            sleft = left + (x - winW)/2;
                        }
                        $("#luckysheet-scrollbar-x").scrollLeft(sleft);
                    }
                }
                if (Store.luckysheet_select_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];

                    let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);

                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if(last.row[1] > last.row_focus){
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    }
                    else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    }
                    else {
                        top = last.top;
                        height = row - last.top - 1;

                        if(last.row[0] < last.row_focus){
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if(last.column[1] > last.column_focus){
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    }
                    else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    }
                    else {
                        left = last.left;
                        width = col - last.left - 1;

                        if(last.column[0] < last.column_focus){
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                    if(changeparam != null){
                        columnseleted = changeparam[0];
                        rowseleted= changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    
                    luckysheetFreezen.scrollFreezen();

                    $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]));

                    //交替颜色选择范围
                    if($("#luckysheet-alternateformat-rangeDialog").is(":visible")){
                        $("#luckysheet-alternateformat-rangeDialog input").val(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]));
                    }

                    if (pivotTable.luckysheet_pivotTable_select_state) {
                        $("#luckysheet-pivotTable-range-selection-input").val(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name + "!" + chatatABC(Store.luckysheet_select_save[0]["column"][0]) + (Store.luckysheet_select_save[0]["row"][0] + 1) + ":" + chatatABC(Store.luckysheet_select_save[0]["column"][1]) + (Store.luckysheet_select_save[0]["row"][1] + 1));
                    }
                }
                else if(conditionformat.selectStatus){
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];

                    let last = conditionformat.selectRange[conditionformat.selectRange.length - 1];

                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if(last.row[1] > last.row_focus){
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    }
                    else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    }
                    else {
                        top = last.top;
                        height = row - last.top - 1;

                        if(last.row[0] < last.row_focus){
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if(last.column[1] > last.column_focus){
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    }
                    else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    }
                    else {
                        left = last.left;
                        width = col - last.left - 1;

                        if(last.column[0] < last.column_focus){
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                    if(changeparam != null){
                        columnseleted = changeparam[0];
                        rowseleted= changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    conditionformat.selectRange[conditionformat.selectRange.length - 1] = last;

                    selectionCopyShow(conditionformat.selectRange);

                    let range = conditionformat.getTxtByRange(conditionformat.selectRange);
                    $("#luckysheet-multiRange-dialog input").val(range);
                }
                else if (formula.rangestart) {
                    formula.rangedrag(event);
                }
                else if (formula.rangedrag_row_start) {
                    formula.rangedrag_row(event);
                }
                else if (formula.rangedrag_column_start) {
                    formula.rangedrag_column(event);
                }
                else if (Store.luckysheet_rows_selected_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let y = mouse[1] + $("#luckysheet-rows-h").scrollTop();
                    if (y < 0) {
                        return false;
                    }

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    let col_index = Store.visibledatacolumn.length - 1, 
                        col = Store.visibledatacolumn[col_index], 
                        col_pre = 0;

                    let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);

                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if(last.row[1] > last.row_focus){
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    }
                    else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    }
                    else {
                        top = last.top;
                        height = row - last.top - 1;

                        if(last.row[0] < last.row_focus){
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    last["row"] = rowseleted;

                    last["top_move"] = top;
                    last["height_move"] = height;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    
                    clearTimeout(Store.countfuncTimeout);
                    Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);
                }
                else if (Store.luckysheet_cols_selected_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();
                    if (x < 0) {
                        return false;
                    }

                    let row_index = Store.visibledatarow.length - 1, 
                        row = Store.visibledatarow[row_index], 
                        row_pre = 0;
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];

                    let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);

                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if(last.column[1] > last.column_focus){
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    }
                    else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    }
                    else {
                        left = last.left;
                        width = col - last.left - 1;

                        if(last.column[0] < last.column_focus){
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    
                    clearTimeout(Store.countfuncTimeout);
                    Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);
                }
                else if (Store.luckysheet_cell_selected_move) {
                    let mouse = mouseposition(event.pageX, event.pageY);

                    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    let scrollTop = $("#luckysheet-cell-main").scrollTop();

                    let x = mouse[0] + scrollLeft;
                    let y = mouse[1] + scrollTop;

                    let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight, 
                        winW = $(window).width() + scrollLeft;

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];

                    let row_index_original = Store.luckysheet_cell_selected_move_index[0], 
                        col_index_original = Store.luckysheet_cell_selected_move_index[1];

                    let row_s = Store.luckysheet_select_save[0]["row"][0] - row_index_original + row_index, 
                        row_e = Store.luckysheet_select_save[0]["row"][1] - row_index_original + row_index;

                    let col_s = Store.luckysheet_select_save[0]["column"][0] - col_index_original + col_index, 
                        col_e = Store.luckysheet_select_save[0]["column"][1] - col_index_original + col_index;

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = Store.luckysheet_select_save[0]["row"][1] - Store.luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e = Store.luckysheet_select_save[0]["column"][1] - Store.luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                        row_s = Store.visibledatarow.length - 1 - Store.luckysheet_select_save[0]["row"][1] + Store.luckysheet_select_save[0]["row"][0];
                        row_e = Store.visibledatarow.length - 1;
                    }

                    if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                        col_s = Store.visibledatacolumn.length - 1 - Store.luckysheet_select_save[0]["column"][1] + Store.luckysheet_select_save[0]["column"][0];
                        col_e = Store.visibledatacolumn.length - 1;
                    }

                    col_pre = col_s - 1 == -1 ? 0 : Store.visibledatacolumn[col_s - 1];
                    col = Store.visibledatacolumn[col_e];
                    row_pre = row_s - 1 == -1 ? 0 : Store.visibledatarow[row_s - 1];
                    row = Store.visibledatarow[row_e];

                    $("#luckysheet-cell-selected-move").css({ 
                        "left": col_pre, 
                        "width": col - col_pre - 2, 
                        "top": row_pre, 
                        "height": row - row_pre - 2, 
                        "display": "block" 
                    });
                }
                else if (Store.luckysheet_cell_selected_extend) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollLeft = $("#luckysheet-cell-main").scrollLeft() - 5;
                    let scrollTop = $("#luckysheet-cell-main").scrollTop() - 5;

                    let x = mouse[0] + scrollLeft;
                    let y = mouse[1] + scrollTop;

                    let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight, 
                        winW = $(window).width() + scrollLeft;

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];

                    let row_index_original = Store.luckysheet_cell_selected_extend_index[0], 
                        col_index_original = Store.luckysheet_cell_selected_extend_index[1];

                    let row_s = Store.luckysheet_select_save[0]["row"][0], 
                        row_e = Store.luckysheet_select_save[0]["row"][1];
                    let col_s = Store.luckysheet_select_save[0]["column"][0], 
                        col_e = Store.luckysheet_select_save[0]["column"][1];

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = Store.luckysheet_select_save[0]["row"][1] - Store.luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e = Store.luckysheet_select_save[0]["column"][1] - Store.luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                        row_s = Store.visibledatarow.length - 1 - Store.luckysheet_select_save[0]["row"][1] + Store.luckysheet_select_save[0]["row"][0];
                        row_e = Store.visibledatarow.length - 1;
                    }

                    if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                        col_s = Store.visibledatacolumn.length - 1 - Store.luckysheet_select_save[0]["column"][1] + Store.luckysheet_select_save[0]["column"][0];
                        col_e = Store.visibledatacolumn.length - 1;
                    }

                    let top = Store.luckysheet_select_save[0].top_move, 
                        height = Store.luckysheet_select_save[0].height_move;
                    let left = Store.luckysheet_select_save[0].left_move, 
                        width = Store.luckysheet_select_save[0].width_move;

                    if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                        if (!(row_index >= row_s && row_index <= row_e)) {
                            if (Store.luckysheet_select_save[0].top_move >= row_pre) {
                                top = row_pre;
                                height = Store.luckysheet_select_save[0].top_move + Store.luckysheet_select_save[0].height_move - row_pre;
                            }
                            else {
                                top = Store.luckysheet_select_save[0].top_move;
                                height = row - Store.luckysheet_select_save[0].top_move - 1;
                            }
                        }
                    }
                    else {
                        if (!(col_index >= col_s && col_index <= col_e)) {
                            if (Store.luckysheet_select_save[0].left_move >= col_pre) {
                                left = col_pre;
                                width = Store.luckysheet_select_save[0].left_move + Store.luckysheet_select_save[0].width_move - col_pre;
                            }
                            else {
                                left = Store.luckysheet_select_save[0].left_move;
                                width = col - Store.luckysheet_select_save[0].left_move - 1;
                            }
                        }
                    }

                    $("#luckysheet-cell-selected-extend").css({ 
                        "left": left, 
                        "width": width, 
                        "top": top, 
                        "height": height, 
                        "display": "block" 
                    });
                }
                else if (Store.luckysheet_cols_change_size) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
                    let x = mouse[0] + scrollLeft;
                    let winW = $(window).width();

                    let row_index = Store.visibledatarow.length - 1, 
                        row = Store.visibledatarow[row_index], 
                        row_pre = 0;
                    let col_location = colLocation(x), 
                        col = col_location[1], 
                        col_pre = col_location[0], 
                        col_index = col_location[2];
                    
                    if ((x + 3) - Store.luckysheet_cols_change_size_start[0] > 30 && x < winW + scrollLeft - 100) {
                        $("#luckysheet-change-size-line").css({ "left": x });
                        $("#luckysheet-cols-change-size").css({ "left": x - 2 });
                    }
                }
                else if (Store.luckysheet_rows_change_size) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollTop = $("#luckysheet-rows-h").scrollTop();
                    let y = mouse[1] + scrollTop;
                    let winH = $(window).height();

                    let row_location = rowLocation(y), 
                        row = row_location[1], 
                        row_pre = row_location[0], 
                        row_index = row_location[2];
                    
                    if ((y + 3) - Store.luckysheet_rows_change_size_start[0] > 19 && y < winH + scrollTop - 200) {
                        $("#luckysheet-change-size-line").css({ "top": y });
                        $("#luckysheet-rows-change-size").css({ "top": y });
                    }
                }
                else if (luckysheetPostil.move){
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let myh = luckysheetPostil.currentObj.outerHeight(), 
                        myw = luckysheetPostil.currentObj.outerWidth();
                    
                    let top = y - luckysheetPostil.moveXY[1], 
                        left = x - luckysheetPostil.moveXY[0];

                    if (top < 0) {
                        top = 0;
                    }

                    if (top + myh + 42 + 6 > luckysheetPostil.currentWinH) {
                        top = luckysheetPostil.currentWinH - myh - 42 - 6;
                    }

                    if (left < 0) {
                        left = 0;
                    }

                    if (left + myw + 22 + 36 > luckysheetPostil.currentWinW) {
                        left = luckysheetPostil.currentWinW - myw - 22 - 36;
                    }

                    luckysheetPostil.currentObj.css({ "left": left, "top": top });
                }
                else if (!!luckysheetPostil.resize){
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    let resizeXY = luckysheetPostil.resizeXY;

                    let topchange = y - resizeXY[1], 
                        leftchange = x - resizeXY[0];
                    
                    let top = resizeXY[5],
                        height = resizeXY[3],
                        left = resizeXY[4],
                        width = resizeXY[2];

                    let resize = luckysheetPostil.resize;

                    if(resize == "lm" || resize == "lt" || resize == "lb"){
                        left = x;
                        width = resizeXY[2] - leftchange;

                        if(left > resizeXY[2] + resizeXY[4] - 60){
                            left = resizeXY[2] + resizeXY[4] - 60;
                            width = resizeXY[2] - (resizeXY[2] + resizeXY[4] - 60 - resizeXY[0]);
                        }
                        else if(left <= 0){
                            left = 0;
                            width = resizeXY[2] + resizeXY[0];
                        }
                    }

                    if(resize == "rm" || resize == "rt" || resize == "rb"){
                        width = resizeXY[2] + leftchange;

                        if(width < 60){
                            width = 60;
                        }
                        else if(width >= luckysheetPostil.currentWinW - resizeXY[4] - 22 - 36){
                            width = luckysheetPostil.currentWinW - resizeXY[4] - 22 - 36;
                        }
                    }

                    if(resize == "mt" || resize == "lt" || resize == "rt"){
                        top = y;
                        height = resizeXY[3] - topchange;

                        if(top > resizeXY[3] + resizeXY[5] - 60){
                            top = resizeXY[3] + resizeXY[5] - 60;
                            height = resizeXY[3] - (resizeXY[3] + resizeXY[5] - 60 - resizeXY[1]);
                        }
                        else if(top <= 0){
                            top = 0;
                            height = resizeXY[3] + resizeXY[1];
                        }
                    }

                    if(resize == "mb" || resize == "lb" || resize == "rb"){
                        height = resizeXY[3] + topchange;

                        if(height < 60){
                            height = 60;
                        }
                        else if(height >= luckysheetPostil.currentWinH - resizeXY[5] - 42 - 6){
                            height = luckysheetPostil.currentWinH - resizeXY[5] - 42 - 6;
                        }
                    }

                    luckysheetPostil.currentObj.css({ "width": width, "height": height, "left": left, "top": top });
                }
                else if (!!formula.rangeResize) {
                    formula.rangeResizeDraging(event, formula.rangeResizeObj, formula.rangeResizexy, formula.rangeResize, formula.rangeResizeWinW, formula.rangeResizeWinH, Store.ch_width, Store.rh_height);
                }
                else if (!!formula.rangeMove) {
                    formula.rangeMoveDraging(event, formula.rangeMovexy, formula.rangeMoveObj.data("range"), formula.rangeMoveObj, Store.sheetBarHeight, Store.statisticBarHeight);
                }
            }, 1);
        }
    });
    
    //表格mouseup
    $(document).mouseup(function (event) {
        //数据窗格主体
        if (Store.luckysheet_select_status) {
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function(){
                countfunc();
            }, 0);

            //格式刷
            if(menuButton.luckysheetPaintModelOn){
                selection.pasteHandlerOfPaintModel(Store.luckysheet_copy_save);

                if(menuButton.luckysheetPaintSingle){
                    //单次 格式刷
                    menuButton.cancelPaintModel();
                }
            }
        }

        Store.luckysheet_select_status = false;
        clearTimeout(Store.jfautoscrollTimeout);
        Store.luckysheet_scroll_status = false;

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","crosshair").end().find(".luckysheet-cs-draghandle").css("cursor","move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","default");

        //行标题窗格主体
        Store.luckysheet_rows_selected_status = false;

        //列标题窗格主体
        Store.luckysheet_cols_selected_status = false;

        Store.luckysheet_model_move_state = false;

        if(formula.functionResizeStatus){
            formula.functionResizeStatus = false;
            $("#luckysheet-wa-calculate-size").removeAttr("style");
        }

        if (!!luckysheetFreezen.horizontalmovestate) {
            luckysheetFreezen.horizontalmovestate = false;
            $("#luckysheet-freezebar-horizontal").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenhorizontaldata[4] <= Store.columeHeaderHeight) {
                luckysheetFreezen.cancelFreezenHorizontal();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        if (!!luckysheetFreezen.verticalmovestate) {
            luckysheetFreezen.verticalmovestate = false;
            $("#luckysheet-freezebar-vertical").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenverticaldata[4] <= Store.rowHeaderWidth) {
                luckysheetFreezen.cancelFreezenVertical();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        if (!!pivotTable && pivotTable.movestate) {
            $("#luckysheet-modal-dialog-slider-pivot-move").remove();
            pivotTable.movestate = false;
            $("#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").css("cursor", "default");
            
            if (pivotTable.movesave.containerid != "luckysheet-modal-dialog-pivotTable-list") {
                let $cur = $(event.target).closest(".luckysheet-modal-dialog-slider-config-list");
                if ($cur.length == 0) {
                    if (pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value") {
                        pivotTable.resetOrderby(pivotTable.movesave.obj);
                    }

                    pivotTable.movesave.obj.remove();
                    pivotTable.showvaluecolrow();
                    
                    $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                        $(this).find(".luckysheet-slider-list-item-selected").find("i").remove();
                    });

                    $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                        let index = $(this).data("index");

                        $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                            let $seleted = $(this).find(".luckysheet-slider-list-item-selected");
                            if ($(this).data("index") == index && $seleted.find("i").length == 0) {
                                $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                            }
                        });

                    });

                    pivotTable.refreshPivotTable();
                }
            }
        }

        if (Store.luckysheet_sheet_move_status) {
            Store.luckysheet_sheet_move_status = false;
            Store.luckysheet_sheet_move_data.activeobject.insertBefore($("#luckysheet-sheets-item-clone"));
            Store.luckysheet_sheet_move_data.activeobject.removeAttr("style");
            $("#luckysheet-sheets-item-clone").remove();
            Store.luckysheet_sheet_move_data.cursorobject.css({ "cursor": "pointer" });
            Store.luckysheet_sheet_move_data = {};
            sheetmanage.reOrderAllSheet();
        }

        if (!!formula.rangeResize) {
            formula.rangeResizeDragged(event, formula.rangeResizeObj, formula.rangeResize, formula.rangeResizexy, formula.rangeResizeWinW, formula.rangeResizeWinH);
        }

        //批注框 移动
        if (luckysheetPostil.move) {
            luckysheetPostil.move = false;

            let ps_id = luckysheetPostil.currentObj.closest(".luckysheet-postil-show").attr("id");

            let ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            let ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            let d = editor.deepCopyFlowData(Store.flowdata);
            let rc = [];

            d[ps_r][ps_c].ps.left = luckysheetPostil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheetPostil.currentObj.position().top;
            d[ps_r][ps_c].ps.value = luckysheetPostil.currentObj.find(".formulaInputFocus").text();

            rc.push(ps_r + "_" + ps_c);

            luckysheetPostil.ref(d, rc);

            $("#" + ps_id).remove();

            if(d[ps_r][ps_c].ps.isshow){
                luckysheetPostil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
            }
            else{
                luckysheetPostil.editPs(ps_r, ps_c);
            }
        }

        //批注框 改变大小
        if (!!luckysheetPostil.resize) {
            luckysheetPostil.resize = null;

            let ps_id = luckysheetPostil.currentObj.closest(".luckysheet-postil-show").attr("id");

            let ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            let ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            let d = editor.deepCopyFlowData(Store.flowdata);
            let rc = [];

            d[ps_r][ps_c].ps.left = luckysheetPostil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheetPostil.currentObj.position().top;
            d[ps_r][ps_c].ps.width = luckysheetPostil.currentObj.outerWidth();
            d[ps_r][ps_c].ps.height = luckysheetPostil.currentObj.outerHeight();
            d[ps_r][ps_c].ps.value = luckysheetPostil.currentObj.find(".formulaInputFocus").text();

            rc.push(ps_r + "_" + ps_c);

            luckysheetPostil.ref(d, rc);

            $("#" + ps_id).remove();

            if(d[ps_r][ps_c].ps.isshow){
                luckysheetPostil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
            }
            else{
                luckysheetPostil.editPs(ps_r, ps_c);
            }
        }

        //改变行高
        if (Store.luckysheet_rows_change_size) {
            Store.luckysheet_rows_change_size = false;

            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-rows-change-size").css("opacity", 0);
            $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "default");

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollTop = $("#luckysheet-rows-h").scrollTop();
            let y = mouse[1] + scrollTop;
            let winH = $(window).height();

            let row_location = rowLocation(y), 
                row = row_location[1], 
                row_pre = row_location[0], 
                row_index = row_location[2];
           
            let size = (y + 3) - Store.luckysheet_rows_change_size_start[0];

            if ((y + 3) - Store.luckysheet_rows_change_size_start[0] < 19) {
                size = 19;
            }

            if (y >= winH - 200 + scrollTop) {
                size = winW - 200 - Store.luckysheet_rows_change_size_start[0] + scrollTop;
            }

            let cfg = $.extend(true, {}, Store.config);
            if (cfg["rowlen"] == null) {
                cfg["rowlen"] = {};
            }

            cfg["rowlen"][Store.luckysheet_rows_change_size_start[1]] = Math.ceil(size);

            if (Store.clearjfundo) {
                Store.jfundo = [];

                Store.jfredo.push({
                    "type": "resize",
                    "ctrlType": "resizeR",
                    "config": $.extend(true, {}, Store.config),
                    "curconfig": $.extend(true, {}, cfg),
                    "sheetIndex": Store.currentSheetIndex
                });
            }

            //config
            Store.config = cfg;
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

            server.saveParam("cg", Store.currentSheetIndex, cfg["rowlen"], { "k": "rowlen" });

            jfrefreshgrid_rhcw(Store.flowdata.length, null);
        }

        //改变列宽
        if (Store.luckysheet_cols_change_size) {
            Store.luckysheet_cols_change_size = false;
            
            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-cols-change-size").css("opacity", 0);
            $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "default");

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
            let x = mouse[0] + scrollLeft;
            let winW = $(window).width();

            let row_index = Store.visibledatarow.length - 1, 
                row = Store.visibledatarow[row_index], 
                row_pre = 0;
            let col_location = colLocation(x), 
                col = col_location[1], 
                col_pre = col_location[0], 
                col_index = col_location[2];
            
            let size = (x + 3) - Store.luckysheet_cols_change_size_start[0];

            let firstcolumlen = Store.defaultcollen;
            if (Store.config["columlen"] != null && Store.config["columlen"][Store.luckysheet_cols_change_size_start[1]] != null) {
                firstcolumlen = Store.config["columlen"][Store.luckysheet_cols_change_size_start[1]];
            }

            if (Math.abs(size - firstcolumlen) < 3) {
                return;
            }
            
            if ((x + 3) - Store.luckysheet_cols_change_size_start[0] < 30) {
                size = 30;
            }

            if (x >= winW - 100 + scrollLeft) {
                size = winW - 100 - Store.luckysheet_cols_change_size_start[0] + scrollLeft;
            }

            let cfg = $.extend(true, {}, Store.config);
            if (cfg["columlen"] == null) {
                cfg["columlen"] = {};
            }

            cfg["columlen"][Store.luckysheet_cols_change_size_start[1]] = Math.ceil(size);

            if (Store.clearjfundo) {
                Store.jfundo = [];

                Store.jfredo.push({
                    "type": "resize",
                    "ctrlType": "resizeC",
                    "config": $.extend(true, {}, Store.config),
                    "curconfig": $.extend(true, {}, cfg),
                    "sheetIndex": Store.currentSheetIndex
                });
            }

            //config
            Store.config = cfg;
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

            server.saveParam("cg", Store.currentSheetIndex, cfg["columlen"], { "k": "columlen" });

            jfrefreshgrid_rhcw(null, Store.flowdata[0].length);

            setTimeout(function () {
                luckysheetrefreshgrid();
            }, 1);
        }

        if (formula.rangeMove) {
            formula.rangeMoveDragged(formula.rangeMoveObj);
        }

        //改变选择框的位置并替换目标单元格
        if (Store.luckysheet_cell_selected_move) {
            $("#luckysheet-cell-selected-move").hide();

            Store.luckysheet_cell_selected_move = false;
            let mouse = mouseposition(event.pageX, event.pageY);

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();

            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight, 
                winW = $(window).width() + scrollLeft;

            let row_index = rowLocation(y)[2];
            let col_index = colLocation(x)[2];

            let row_index_original = Store.luckysheet_cell_selected_move_index[0], 
                col_index_original = Store.luckysheet_cell_selected_move_index[1];

            if(row_index == row_index_original && col_index == col_index_original){
                return;
            }

            let d = editor.deepCopyFlowData(Store.flowdata);
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
           
            let data = getdatabyselection(last);

            let cfg = $.extend(true, {}, Store.config);
            if(cfg["merge"] == null){
                cfg["merge"] = {};
            }
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            //选区包含部分单元格
            if(hasPartMC(cfg, last["row"][0], last["row"][1], last["column"][0], last["column"][1])){
                if(isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                }
                return;
            }

            let row_s = last["row"][0] - row_index_original + row_index, 
                row_e = last["row"][1] - row_index_original + row_index;
            let col_s = last["column"][0] - col_index_original + col_index, 
                col_e = last["column"][1] - col_index_original + col_index;
            
            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                row_s = Store.visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = Store.visibledatarow.length - 1;
            }

            if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                col_s = Store.visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = Store.visibledatacolumn.length - 1;
            }

            //替换的位置包含部分单元格
            if(hasPartMC(cfg, row_s, row_e, col_s, col_e)){
                if(isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                }
                return;
            }

            let borderInfoCompute = getBorderInfoCompute(Store.currentSheetIndex);

            //删除原本位置的数据
            let RowlChange = null;
            for (let r = last["row"][0]; r <= last["row"][1]; r++) {
                if(r in cfg["rowlen"]){
                    RowlChange = true;
                }

                for (let c = last["column"][0]; c <= last["column"][1]; c++) {
                    let cell = d[r][c];

                    if(getObjType(cell) == "object" && ("mc" in cell)){
                        if((cell["mc"].r + "_" + cell["mc"].c) in cfg["merge"]){
                            delete cfg["merge"][cell["mc"].r + "_" + cell["mc"].c];
                        }
                    }

                    d[r][c] = null;
                }
            }

            //边框
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                let borderInfo = [];

                for(let i = 0; i < cfg["borderInfo"].length; i++){
                    let bd_rangeType = cfg["borderInfo"][i].rangeType;

                    if(bd_rangeType == "range"){
                        let bd_range = cfg["borderInfo"][i].range;
                        let bd_emptyRange = [];

                        for(let j = 0; j < bd_range.length; j++){
                            bd_emptyRange = bd_emptyRange.concat(conditionformat.CFSplitRange(bd_range[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "restPart"));
                        }

                        cfg["borderInfo"][i].range = bd_emptyRange;

                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                    else if(bd_rangeType == "cell"){
                        let bd_r = cfg["borderInfo"][i].value.row_index;
                        let bd_c = cfg["borderInfo"][i].value.col_index;

                        if(!(bd_r >= last["row"][0] && bd_r <= last["row"][1] && bd_c >= last["column"][0] && bd_c <= last["column"][1])){
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            
            //替换位置数据更新
            let offsetMC = {};
            for (let r = 0; r < data.length; r++) {
                for (let c = 0; c < data[0].length; c++) {
                    if(borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])]){
                        let bd_obj = {
                            "rangeType": "cell",
                            "value": {
                                "row_index": r + row_s,
                                "col_index": c + col_s,
                                "l": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].l,
                                "r": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].r,
                                "t": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].t,
                                "b": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].b
                            }
                        }

                        if(cfg["borderInfo"] == null){
                            cfg["borderInfo"] = [];
                        }

                        cfg["borderInfo"].push(bd_obj);
                    }

                    let value = "";
                    if (data[r] != null && data[r][c] != null) {
                        value = data[r][c];
                    }

                    if(getObjType(value) == "object" && ("mc" in value)){
                        let mc = $.extend(true, {}, value["mc"]);
                        if("rs" in value["mc"]){
                            offsetMC[mc.r + "_" + mc.c] = [r + row_s, c + col_s];

                            value["mc"].r = r + row_s;
                            value["mc"].c = c + col_s;

                            cfg["merge"][(r + row_s) + "_" + (c + col_s)] = value["mc"];
                        }
                        else{
                            value["mc"].r = offsetMC[mc.r + "_" + mc.c][0];
                            value["mc"].c = offsetMC[mc.r + "_" + mc.c][1];   
                        }
                    }
                    d[r + row_s][c + col_s] = value;
                }
            }

            if(RowlChange){
                cfg = rowlenByRange(d, last["row"][0], last["row"][1], cfg);
                cfg = rowlenByRange(d, row_s, row_e, cfg);
            }

            //条件格式
            let cdformat = $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"]);
            if(cdformat != null && cdformat.length > 0){
                for(let i = 0; i < cdformat.length; i++){
                    let cdformat_cellrange = cdformat[i].cellrange;
                    let emptyRange = [];
                    for(let j = 0; j < cdformat_cellrange.length; j++){
                        let range = conditionformat.CFSplitRange(cdformat_cellrange[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "allPart");
                        emptyRange = emptyRange.concat(range);
                    }
                    cdformat[i].cellrange = emptyRange;
                }
            }

            let rf;
            if(Store.luckysheet_select_save[0].row_focus == Store.luckysheet_select_save[0].row[0]){
                rf = row_s;
            }
            else{
                rf = row_e;
            }

            let cf;
            if(Store.luckysheet_select_save[0].column_focus == Store.luckysheet_select_save[0].column[0]){
                cf = col_s;
            }
            else{
                cf = col_e;
            }

            let range = [];
            range.push({ "row": last["row"], "column": last["column"] });
            range.push({ "row": [row_s, row_e], "column": [col_s, col_e] });

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];
            last["row_focus"] = rf;
            last["column_focus"] = cf;

            jfrefreshgrid(d, range, cfg, cdformat, RowlChange);

            selectHightlightShow();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);
        }

        //选区下拉
        if (Store.luckysheet_cell_selected_extend) {
            Store.luckysheet_cell_selected_extend = false;
            $("#luckysheet-cell-selected-extend").hide();

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();

            let x = mouse[0] + scrollLeft - 5;
            let y = mouse[1] + scrollTop - 5;

            let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight, 
                winW = $(window).width() + scrollLeft;

            let row_location = rowLocation(y), 
                row = row_location[1], 
                row_pre = row_location[0], 
                row_index = row_location[2];
            let col_location = colLocation(x), 
                col = col_location[1], 
                col_pre = col_location[0], 
                col_index = col_location[2];

            let row_index_original = Store.luckysheet_cell_selected_extend_index[0], 
                col_index_original = Store.luckysheet_cell_selected_extend_index[1];

            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let row_s = last["row"][0], row_e = last["row"][1];
            let col_s = last["column"][0], col_e = last["column"][1];

            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                row_s = Store.visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = Store.visibledatarow.length - 1;
            }

            if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                col_s = Store.visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = Store.visibledatacolumn.length - 1;
            }

            //复制范围
            luckysheetDropCell.copyRange = {"row": $.extend(true, [], last["row"]), "column": $.extend(true, [], last["column"])};
            //applyType
            let typeItemHide = luckysheetDropCell.typeItemHide();
            
            if(!typeItemHide[0] && !typeItemHide[1] && !typeItemHide[2] && !typeItemHide[3] && !typeItemHide[4] && !typeItemHide[5] && !typeItemHide[6]){
                luckysheetDropCell.applyType = "0";
            }
            else{
                luckysheetDropCell.applyType = "1";
            }

            if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                if (!(row_index >= row_s && row_index <= row_e)) {
                    if (Store.luckysheet_select_save[0].top_move >= row_pre) {//当往上拖拽时
                        luckysheetDropCell.applyRange = {"row": [row_index, last["row"][0] - 1], "column": last["column"]};
                        luckysheetDropCell.direction = "up";

                        row_s -= last["row"][0] - row_index;

                        //是否有数据透视表范围
                        if(pivotTable.isPivotRange(row_s, col_e)){
                            tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                    else {//当往下拖拽时
                        luckysheetDropCell.applyRange = {"row": [last["row"][1] + 1, row_index], "column": last["column"]};
                        luckysheetDropCell.direction = "down";

                        row_e += row_index - last["row"][1];

                        //是否有数据透视表范围
                        if(pivotTable.isPivotRange(row_e, col_e)){
                            tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                }
                else{
                    return;
                }
            }
            else {
                if (!(col_index >= col_s && col_index <= col_e)) {
                    if (Store.luckysheet_select_save[0].left_move >= col_pre) {//当往左拖拽时
                        luckysheetDropCell.applyRange = {"row": last["row"], "column": [col_index, last["column"][0] - 1]};
                        luckysheetDropCell.direction = "left";

                        col_s -= last["column"][0] - col_index;

                        //是否有数据透视表范围
                        if(pivotTable.isPivotRange(row_e, col_s)){
                            tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                    else {//当往右拖拽时
                        luckysheetDropCell.applyRange = {"row": last["row"], "column": [last["column"][1] + 1, col_index]};
                        luckysheetDropCell.direction = "right";

                        col_e += col_index - last["column"][1];

                        //是否有数据透视表范围
                        if(pivotTable.isPivotRange(row_e, col_e)){
                            tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                }
                else{
                    return;
                }
            }

            if(Store.config["merge"] != null){
                let hasMc = false;

                for(let r = last["row"][0]; r <= last["row"][1]; r++){
                    for(let c = last["column"][0]; c <= last["column"][1]; c++){
                        let cell = Store.flowdata[r][c];

                        if(cell != null && cell.mc != null){
                            hasMc = true;
                            break;
                        }
                    }
                }

                if(hasMc){
                    if(isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        tooltip.info("无法对合并单元格执行此操作", ""); 
                    }

                    return;
                }

                for(let r = row_s; r <= row_e; r++){
                    for(let c = col_s; c <= col_e; c++){
                        let cell = Store.flowdata[r][c];

                        if(cell != null && cell.mc != null){
                            hasMc = true;
                            break;
                        }
                    }
                }

                if(hasMc){
                    if(isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        tooltip.info("无法对合并单元格执行此操作", ""); 
                    }

                    return;
                }
            }

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];

            luckysheetDropCell.update();
            luckysheetDropCell.createIcon();

            $("#luckysheet-cell-selected-move").hide();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);
        }
    });

    //表格左上角点击 全选表格
    $("#luckysheet-left-top").mousedown(function (event) {
        $("#luckysheet-wa-functionbox-confirm").click();
        Store.luckysheet_select_status = false;
        
        Store.luckysheet_select_save = [{ "row": [0, Store.flowdata.length - 1], "column": [0, Store.flowdata[0].length - 1], "row_focus": 0, "column_focus": 0 }];
        selectHightlightShow();
        
        clearTimeout(Store.countfuncTimeout);
        Store.countfuncTimeout = setTimeout(function () { countfunc() }, 500);

        event.stopPropagation();
    });

    //表格行标题 mouse事件
    $("#luckysheet-rows-h").mousedown(function (event) {
        //有批注在编辑时
        luckysheetPostil.removeActivePs();

        let mouse = mouseposition(event.pageX, event.pageY);
        let y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];
        let col_index = Store.visibledatacolumn.length - 1, 
            col = Store.visibledatacolumn[col_index], col_pre = 0;

        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        //mousedown是右键
        if (event.which == "3") {
            let isright = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let obj_s = Store.luckysheet_select_save[s];

                if(obj_s["row"] != null && (row_index >= obj_s["row"][0] && row_index <= obj_s["row"][1]) && (obj_s["column"][0] == 0 && obj_s["column"][1] == Store.flowdata[0].length - 1)){
                    isright = true;
                    break;
                }
            }

            if(isright){
                return;
            }
        }

        let top = row_pre, height = row - row_pre - 1;
        let rowseleted = [row_index, row_index];

        Store.luckysheet_scroll_status = true;

        //公式相关
        let $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {
            if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton() || $("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")) {
                //公式选区
                let changeparam = menuButton.mergeMoveMain([0, col_index], rowseleted, {"row_focus": row_index, "column_focus": 0}, top, height, col_pre, col);
                if(changeparam != null){
                    //columnseleted = changeparam[0];
                    rowseleted = changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    //left = changeparam[4];
                    //width = changeparam[5];
                }

                if(event.shiftKey){
                    let last = formula.func_selectedrange;

                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if(last.row[1] > last.row_focus){
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    }
                    else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    }
                    else {
                        top = last.top;
                        height = row - last.top - 1;

                        if(last.row[0] < last.row_focus){
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let changeparam = menuButton.mergeMoveMain([0, col_index], rowseleted, {"row_focus": row_index, "column_focus": 0}, top, height, col_pre, col);
                    if(changeparam != null){
                        // columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        // left = changeparam[4];
                        // width = changeparam[5];
                    }

                    last["row"] = rowseleted;

                    last["top_move"] = top;
                    last["height_move"] = height;

                    formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    let vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            let currSelection = window.getSelection();
                            formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            let textRange = document.selection.createRange();
                            formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        formula.canceFunctionrangeSelected();
                        formula.createRangeHightlight();
                    }

                    formula.rangestart = false;
                    formula.rangedrag_column_start = false;
                    formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    formula.israngeseleciton();
                    formula.func_selectedrange = {
                        "left": colLocationByIndex(0)[0],
                        "width": colLocationByIndex(0)[1] - colLocationByIndex(0)[0] - 1,
                        "top": top,
                        "height": height,
                        "left_move": col_pre, 
                        "width_move": col - col_pre - 1, 
                        "top_move": top, 
                        "height_move": height, 
                        "row": rowseleted, 
                        "column": [0, col_index], 
                        "row_focus": row_index, 
                        "column_focus": 0
                    }
                }
                else{
                    formula.func_selectedrange = {
                        "left": colLocationByIndex(0)[0],
                        "width": colLocationByIndex(0)[1] - colLocationByIndex(0)[0] - 1,
                        "top": top,
                        "height": height,
                        "left_move": col_pre, 
                        "width_move": col - col_pre - 1, 
                        "top_move": top, 
                        "height_move": height, 
                        "row": rowseleted, 
                        "column": [0, col_index], 
                        "row_focus": row_index, 
                        "column_focus": 0
                    }
                }

                if(formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()){
                    formula.rangeSetValue({ "row": rowseleted, "column": [null, null] });
                }
                else if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){//if公式生成器
                    let range = getRangetxt(Store.currentSheetIndex, { "row": rowseleted, "column": [0, col_index] }, Store.currentSheetIndex);
                    $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);
                }

                formula.rangedrag_row_start = true;
                formula.rangestart = false;
                formula.rangedrag_column_start = false;

                $("#luckysheet-formula-functionrange-select").css({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": top, 
                    "height": height 
                }).show();
                $("#luckysheet-formula-help-c").hide();

                luckysheet_count_show(col_pre, top, col - col_pre - 1, height, rowseleted, [0, col_index]);

                setTimeout(function(){
                    let currSelection = window.getSelection();
                    let anchorOffset = currSelection.anchorNode;
                    
                    let $editor;
                    if($("#luckysheet-search-formula-parm").is(":visible")||$("#luckysheet-search-formula-parm-select").is(":visible")){
                        $editor = $("#luckysheet-rich-text-editor");
                        formula.rangechangeindex = formula.data_parm_index;
                    }
                    else{
                        $editor = $(anchorOffset).closest("div");
                    }

                    let $span = $editor.find("span[rangeindex='" + formula.rangechangeindex + "']");

                    formula.setCaretPosition($span.get(0), 0, $span.html().length);
                }, 1);

                return;
            }
            else {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                Store.luckysheet_rows_selected_status = true;
            }
        }
        else {
            Store.luckysheet_rows_selected_status = true;
        }

        if (Store.luckysheet_rows_selected_status) {
            if(event.shiftKey){
                //按住shift点击行索引选取范围
                let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]); //选区最后一个

                let top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                last["row"] = rowseleted;

                last["top_move"] = top;
                last["height_move"] = height;

                Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;
            }
            else if(event.ctrlKey){
                Store.luckysheet_select_save.push({ 
                    "left": colLocationByIndex(0)[0],
                    "width": colLocationByIndex(0)[1] - colLocationByIndex(0)[0] - 1,
                    "top": top,
                    "height": height,
                    "left_move": col_pre,
                    "width_move": col - col_pre - 1,
                    "top_move": top,
                    "height_move": height,
                    "row": rowseleted,
                    "column": [0, col_index],
                    "row_focus": row_index,
                    "column_focus": 0
                });
            }
            else{
                Store.luckysheet_select_save = [];
                Store.luckysheet_select_save.push({ 
                    "left": colLocationByIndex(0)[0],
                    "width": colLocationByIndex(0)[1] - colLocationByIndex(0)[0] - 1,
                    "top": top,
                    "height": height,
                    "left_move": col_pre, 
                    "width_move": col - col_pre - 1, 
                    "top_move": top, 
                    "height_move": height, 
                    "row": rowseleted, 
                    "column": [0, col_index], 
                    "row_focus": row_index, 
                    "column_focus": 0
                });
            }

            selectHightlightShow();

            if(server.allowUpdate){
                //允许编辑后的后台更新时
                server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
            }
        }

        $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]));

        setTimeout(function () {
            clearTimeout(Store.countfuncTimeout);
            countfunc();
        }, 101);
    }).mousemove(function (event) {
        if (Store.luckysheet_rows_selected_status || Store.luckysheet_rows_change_size || Store.luckysheet_select_status) {
            $("#luckysheet-rows-h-hover").hide();
            return;
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        let y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];

        $("#luckysheet-rows-h-hover").css({ "top": row_pre, "height": row - row_pre - 1, "display": "block" });

        if (y < row - 1 && y >= row - 5) {
            $("#luckysheet-rows-change-size").css({ "top": row - 3, "opacity": 0 });
        }
        else {
            $("#luckysheet-rows-change-size").css("opacity", 0);
        }
    }).mouseleave(function (event) {
        $("#luckysheet-rows-h-hover").hide();
        $("#luckysheet-rows-change-size").css("opacity", 0);
    }).mouseup(function (event) {
        if (event.which == 3) {
            if(isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            $("#luckysheet-cols-rows-shift").hide();
            Store.luckysheetRightHeadClickIs = "row";
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("行");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("高");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("上");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("下");

            $("#luckysheet-cols-rows-add").show();
            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-shift").hide();
            $("#luckysheet-cols-rows-handleincell").hide();

            showrightclickmenu($("#luckysheet-rightclick-menu"), $(this).offset().left + 46, event.pageY);
            Store.luckysheet_cols_menu_status = true;

            //行高默认值
            let cfg = $.extend(true, {}, Store.config);
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            let first_rowlen = cfg["rowlen"][Store.luckysheet_select_save[0].row[0]] == null ? Store.defaultrowlen : cfg["rowlen"][Store.luckysheet_select_save[0].row[0]];
            let isSame = true;

            for(let i = 0; i < Store.luckysheet_select_save.length; i++){
                let s = Store.luckysheet_select_save[i];
                let r1 = s.row[0], r2 = s.row[1];

                for(let r = r1; r <= r2; r++){
                    let rowlen = cfg["rowlen"][r] == null ? Store.defaultrowlen : cfg["rowlen"][r];

                    if(rowlen != first_rowlen){
                        isSame = false;
                        break;
                    }
                }
            }

            if(isSame){
                $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val(first_rowlen);
            }
            else{
                $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val("");
            }
        }
    });
    
    //表格列标题 mouse事件
    $("#luckysheet-cols-h-c").mousedown(function (event) {
        //有批注在编辑时
        luckysheetPostil.removeActivePs();

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $(this).scrollLeft();

        let row_index = Store.visibledatarow.length - 1, 
            row = Store.visibledatarow[row_index], row_pre = 0;
        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        Store.orderbyindex = col_index;//排序全局函数

        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

        //mousedown是右键
        if (event.which == "3") {
            let isright = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let obj_s = Store.luckysheet_select_save[s];

                if(obj_s["column"] != null && (col_index >= obj_s["column"][0] && col_index <= obj_s["column"][1]) && (obj_s["row"][0] == 0 && obj_s["row"][1] == Store.flowdata.length - 1)){
                    isright = true;
                    break;
                }
            }

            if(isright){
                return;
            }
        }

        let left = col_pre, width = col - col_pre - 1;
        let columnseleted = [col_index, col_index];

        Store.luckysheet_scroll_status = true;

        //公式相关
        let $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {
            if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton() || $("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")) {
                //公式选区
                let changeparam = menuButton.mergeMoveMain(columnseleted, [0, row_index], {"row_focus": 0, "column_focus": col_index}, row_pre, row, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    //rowseleted= changeparam[1];
                    //top = changeparam[2];
                    //height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                if(event.shiftKey){
                    let last = formula.func_selectedrange;

                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if(last.column[1] > last.column_focus){
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    }
                    else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    }
                    else {
                        left = last.left;
                        width = col - last.left - 1;

                        if(last.column[0] < last.column_focus){
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(columnseleted , [0, row_index], {"row_focus": 0, "column_focus": col_index}, row_pre, row, left, width);
                    if(changeparam != null){
                        columnseleted = changeparam[0];
                        //rowseleted= changeparam[1];
                        //top = changeparam[2];
                        //height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;

                    formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    let vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            let currSelection = window.getSelection();
                            formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            let textRange = document.selection.createRange();
                            formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        formula.canceFunctionrangeSelected();
                        formula.createRangeHightlight();
                    }

                    formula.rangestart = false;
                    formula.rangedrag_column_start = false;
                    formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    formula.israngeseleciton();
                    formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": rowLocationByIndex(0)[0], 
                        "height": rowLocationByIndex(0)[1] - rowLocationByIndex(0)[0] - 1, 
                        "left_move": left, 
                        "width_move": width, 
                        "top_move": row_pre, 
                        "height_move": row - row_pre - 1, 
                        "row": [0, row_index], 
                        "column": columnseleted,
                        "row_focus": 0, 
                        "column_focus": col_index 
                    }
                }
                else{
                    formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": rowLocationByIndex(0)[0], 
                        "height": rowLocationByIndex(0)[1] - rowLocationByIndex(0)[0] - 1, 
                        "left_move": left, 
                        "width_move": width, 
                        "top_move": row_pre, 
                        "height_move": row - row_pre - 1, 
                        "row": [0, row_index], 
                        "column": columnseleted,
                        "row_focus": 0, 
                        "column_focus": col_index 
                    }
                }

                if(formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()){
                    formula.rangeSetValue({ "row": [null, null], "column": columnseleted });
                }
                else if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){//if公式生成器
                    let range = getRangetxt(Store.currentSheetIndex, { "row": [0, row_index], "column": columnseleted }, Store.currentSheetIndex);
                    $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);
                }

                formula.rangedrag_column_start = true;
                formula.rangestart = false;
                formula.rangedrag_row_start = false;

                $("#luckysheet-formula-functionrange-select").css({ 
                    "left": left, 
                    "width": width, 
                    "top": row_pre, 
                    "height": row - row_pre - 1 
                }).show();
                $("#luckysheet-formula-help-c").hide();

                luckysheet_count_show(left, row_pre, width, row - row_pre - 1, [0, row_index], columnseleted);

                return;
            }
            else {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                Store.luckysheet_cols_selected_status = true;
            }
        }
        else {
            Store.luckysheet_cols_selected_status = true;
        }

        if (Store.luckysheet_cols_selected_status) {
            if(event.shiftKey){
                //按住shift点击列索引选取范围
                let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]); //选区最后一个

                let left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;

                Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;
            }
            else if(event.ctrlKey){
                //选区添加
                Store.luckysheet_select_save.push({ 
                    "left": left, 
                    "width": width, 
                    "top": rowLocationByIndex(0)[0], 
                    "height": rowLocationByIndex(0)[1] - rowLocationByIndex(0)[0] - 1, 
                    "left_move": left, 
                    "width_move": width, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [0, row_index], 
                    "column": columnseleted,
                    "row_focus": 0,  
                    "column_focus": col_index 
                });
            }
            else{
                Store.luckysheet_select_save = [];
                Store.luckysheet_select_save.push({ 
                    "left": left, 
                    "width": width, 
                    "top": rowLocationByIndex(0)[0], 
                    "height": rowLocationByIndex(0)[1] - rowLocationByIndex(0)[0] - 1, 
                    "left_move": left, 
                    "width_move": width, 
                    "top_move": row_pre, 
                    "height_move": row - row_pre - 1, 
                    "row": [0, row_index], 
                    "column": columnseleted,
                    "row_focus": 0, 
                    "column_focus": col_index 
                });
            }

            selectHightlightShow();

            if(server.allowUpdate){
                //允许编辑后的后台更新时
                server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
            }
        }
        
        $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]));

        setTimeout(function () {
            clearTimeout(Store.countfuncTimeout);
            countfunc();
        }, 101);

        if (Store.luckysheet_cols_menu_status) {
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            Store.luckysheet_cols_menu_status = false;
        }
        event.stopPropagation();
    }).mousemove(function (event) {
        if (Store.luckysheet_cols_selected_status || Store.luckysheet_select_status) {
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            return;
        }

        if (Store.luckysheet_cols_menu_status || Store.luckysheet_cols_change_size) {
            return;
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();

        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        $("#luckysheet-cols-h-hover").css({ "left": col_pre, "width": col - col_pre - 1, "display": "block" });
        $("#luckysheet-cols-menu-btn").css({ "left": col - 19, "display": "block" });

        $("#luckysheet-cols-change-size").css({ "left": col - 5 });
        if (x < col && x >= col - 5) {
            $("#luckysheet-cols-change-size").css({ "opacity": 0 });
            $("#luckysheet-cols-menu-btn").hide();
        }
        else {
            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-cols-change-size").css("opacity", 0);
        }
    }).mouseleave(function (event) {
        if (Store.luckysheet_cols_menu_status || Store.luckysheet_cols_change_size) {
            return;
        }

        $("#luckysheet-cols-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        $("#luckysheet-cols-change-size").css("opacity", 0);
    }).mouseup(function (event) {
        if (event.which == 3) {
            if(isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            Store.luckysheetRightHeadClickIs = "column";
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("宽");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

            $("#luckysheet-cols-rows-add").show();
            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-shift").hide();
            $("#luckysheet-cols-rows-handleincell").hide();

            showrightclickmenu($("#luckysheet-rightclick-menu"), event.pageX, $(this).offset().top + 18);
            Store.luckysheet_cols_menu_status = true;

            //列宽默认值
            let cfg = $.extend(true, {}, Store.config);
            if(cfg["columlen"] == null){
                cfg["columlen"] = {};
            }

            let first_collen = cfg["columlen"][Store.luckysheet_select_save[0].column[0]] == null ? Store.defaultcollen : cfg["columlen"][Store.luckysheet_select_save[0].column[0]];
            let isSame = true;

            for(let i = 0; i < Store.luckysheet_select_save.length; i++){
                let s = Store.luckysheet_select_save[i];
                let c1 = s.column[0], c2 = s.column[1];

                for(let c = c1; c <= c2; c++){
                    let collen = cfg["columlen"][c] == null ? Store.defaultcollen : cfg["columlen"][c];

                    if(collen != first_collen){
                        isSame = false;
                        break;
                    }
                }
            }

            if(isSame){
                $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val(first_collen);
            }
            else{
                $("#luckysheet-cols-rows-add").find("input[type='number'].rcsize").val("");
            }
        }
    });

    //表格列标题 改变列宽按钮
    $("#luckysheet-cols-change-size").mousedown(function (event) {
        //有批注在编辑时
        luckysheetPostil.removeActivePs();

        $("#luckysheet-input-box").hide();
        $("#luckysheet-cols-change-size").css({ "opacity": 1 });

        let mouse = mouseposition(event.pageX, event.pageY);
        let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
        let scrollTop = $("#luckysheet-cell-main").scrollTop();
        let winH = $("#luckysheet-cell-main").height();
        let x = mouse[0] + scrollLeft;

        let row_index = Store.visibledatarow.length - 1, 
            row = Store.visibledatarow[row_index], row_pre = 0;
        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        Store.luckysheet_cols_change_size = true;
        Store.luckysheet_scroll_status = true;
        $("#luckysheet-change-size-line").css({ 
            "height": winH + scrollTop, 
            "border-width": "0 1px 0 0", 
            "top": 0, 
            "left": col - 3, 
            "width": "1px", 
            "display": "block", 
            "cursor": "ew-resize" 
        });
        $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "ew-resize");
        Store.luckysheet_cols_change_size_start = [col_pre, col_index];
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-cols-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        Store.luckysheet_cols_dbclick_times = 0;
        event.stopPropagation();
    }).dblclick(function () {
        luckysheetcolsdbclick();
    })

    function luckysheetcolsdbclick() {
        Store.luckysheet_cols_change_size = false;
        $("#luckysheet-change-size-line").hide();
        $("#luckysheet-cols-change-size").css("opacity", 0);
        $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "default");

        let mouse = mouseposition(event.pageX, event.pageY);
        let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
        let x = mouse[0] + scrollLeft;
        let winW = $(window).width();

        let row_index = Store.visibledatarow.length - 1, 
            row = Store.visibledatarow[row_index], 
            row_pre = 0;
        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];
        Store.luckysheet_cols_change_size_start = [col_pre, col_index];
        let dataflow = $("#luckysheetTableContent").get(0).getContext("2d");
        let cfg = $.extend(true, {}, Store.config);

        let matchColumn = {};
        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
            let c1 = Store.luckysheet_select_save[s].column[0], 
                c2 = Store.luckysheet_select_save[s].column[1];

            if (col_index < c1 || col_index > c2) {
                if(col_index in matchColumn){//此列已计算过
                    continue;
                }

                x = -Infinity;
                let countret = 0;
                let fontsize = 13;
                for (let r = 0; r < Store.flowdata.length; r++) {
                    if (countret >= 15) {
                        break;
                    }

                    let value = getcellvalue(r, Store.luckysheet_cols_change_size_start[1], Store.flowdata);
                    let mask = getcellvalue(r, Store.luckysheet_cols_change_size_start[1], Store.flowdata, "m");

                    if(mask != null){
                        value = mask;
                    }

                    let cell = Store.flowdata[r][Store.luckysheet_cols_change_size_start[1]];
                    if(getObjType(cell) == "object" && ("fs" in cell)){
                        if(cell.fs > fontsize){
                            fontsize = cell.fs;
                        }
                    }

                    if (value == null || value.toString().length == 0) {
                        countret++;
                        continue;
                    }
                    let textMetrics = dataflow.measureText(value).width;
                    if (textMetrics > x) {
                        x = textMetrics;
                    }
                }

                let size = x + fontsize * 1.5;
                if ((x + 3) < 30) {
                    size = 30;
                }

                if (x >= winW - 100 + scrollLeft) {
                    size = winW - 100 + scrollLeft;
                }

                if (cfg["columlen"] == null) {
                    cfg["columlen"] = {};
                }

                cfg["columlen"][Store.luckysheet_cols_change_size_start[1]] = Math.ceil(size);

                matchColumn[col_index] = 1;
            }
            else {
                for (let c = c1; c <= c2; c++) {
                    if(c in matchColumn){//此列已计算过
                        continue;
                    }

                    x = -Infinity;
                    let countret = 0;
                    let fontsize = 13;
                    for (let r = 0; r < Store.flowdata.length; r++) {
                        if (countret >= 15) {
                            break;
                        }
                        let value = getcellvalue(r, c, Store.flowdata);

                        let cell = Store.flowdata[r][c];
                        if(getObjType(cell) == "object" && ("fs" in cell)){
                            if(cell.fs > fontsize){
                                fontsize = cell.fs;
                            }
                        }

                        if (isRealNull(value)) {
                            countret++;
                            continue;
                        }

                        let textMetrics = dataflow.measureText(value).width;
                        if (textMetrics > x) {
                            x = textMetrics;
                        }
                    }

                    let size = x + fontsize*1.5;;
                    if ((x + 3) < 30) {
                        size = 30;
                    }

                    if (x >= winW - 100 + scrollLeft) {
                        size = winW - 100 + scrollLeft;
                    }

                    if (cfg["columlen"] == null) {
                        cfg["columlen"] = {};
                    }
                    cfg["columlen"][c] = Math.ceil(size);

                    matchColumn[c] = 1;
                }
            }
        }
       
        jfrefreshgridall(Store.flowdata[0].length, Store.flowdata.length, Store.flowdata, cfg, Store.luckysheet_select_save, "resizeC", "columlen");
    }

    //表格行标题 改变行高按钮
    $("#luckysheet-rows-change-size").mousedown(function (event) {
        //有批注在编辑时
        luckysheetPostil.removeActivePs();
        
        $("#luckysheet-input-box").hide();
        $("#luckysheet-rows-change-size").css({ "opacity": 1 });

        let mouse = mouseposition(event.pageX, event.pageY);
        let y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        let winW = $("#luckysheet-cell-main").width();

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];

        Store.luckysheet_rows_change_size = true;
        Store.luckysheet_scroll_status = true;
        $("#luckysheet-change-size-line").css({ 
            "height": "1px", 
            "border-width": 
            "0 0px 1px 0", 
            "top": row - 3, 
            "left": 0, 
            "width": scrollLeft + winW, 
            "display": "block", 
            "cursor": "ns-resize" 
        });
        $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "ns-resize");
        Store.luckysheet_rows_change_size_start = [row_pre, row_index];
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-rows-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        event.stopPropagation();
    });

    $("#luckysheet-cols-menu-btn").click(function (event) {
        let $menu = $("#luckysheet-rightclick-menu");
        let offset = $(this).offset();
        $("#luckysheet-cols-rows-shift").show();
        Store.luckysheetRightHeadClickIs = "column";
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

        $("#luckysheet-cols-rows-add").show();
        $("#luckysheet-cols-rows-data").hide();
        $("#luckysheet-cols-rows-shift").show();
        $("#luckysheet-cols-rows-handleincell").hide();

        showrightclickmenu($menu, offset.left, offset.top + 18);
        Store.luckysheet_cols_menu_status = true;
    });

    //菜单栏 排序按钮
    $("#luckysheetorderbyasc, #luckysheetorderbyasc_t").mousedown(function (event) {
        cleargridelement(event);
        sortColumnSeletion(Store.orderbyindex, true);
        selectHightlightShow();
    });

    $("#luckysheetorderbydesc, #luckysheetorderbydesc_t").click(function (event) {
        cleargridelement(event);
        sortColumnSeletion(Store.orderbyindex, false);
        selectHightlightShow();
    });
    
    //右键功能键
    //复制为json格式字符串，首行为标题
    $("#luckysheet-copy-json-head").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");   
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        if (getdata.length == 1) {
            let obj = {};
            for (let i = 0; i < getdata[0].length; i++) {
                obj[getcellvalue(0, i, getdata)] = "";
            }
            arr.push(obj);
        }
        else {
            for (let r = 1; r < getdata.length; r++) {
                let obj = {};
                for (let c = 0; c < getdata[0].length; c++) {
                    if(getcellvalue(0, c, getdata) == undefined){
                        obj[""] = getcellvalue(r, c, getdata);
                    }else{
                        obj[getcellvalue(0, c, getdata)] = getcellvalue(r, c, getdata);
                    }
                }
                arr.push(obj);
            }
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为json格式字符串，无标题，采用ABCD作为标题
    $("#luckysheet-copy-json-nohead").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        let st = Store.luckysheet_select_save[0]["column"][0];
        for (let r = 0; r < getdata.length; r++) {
            let obj = {};
            for (let c = 0; c < getdata[0].length; c++) {
                obj[chatatABC(c + st)] = getcellvalue(r, c, getdata);
            }
            arr.push(obj);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为一维数组
    $("#luckysheet-copy-array1").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            for (let c = 0; c < getdata[0].length; c++) {
                arr.push(getcellvalue(r, c, getdata));
            }
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为二维数组
    $("#luckysheet-copy-array2").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                a.push(getcellvalue(r, c, getdata));
            }
            arr.push(a);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为多维数组
    $("#luckysheet-copy-arraymore-confirm").click(function (event) {
        $("body .luckysheet-cols-menu").hide();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        for (let r = 0; r < getdata.length; r++) {
            for (let c = 0; c < getdata[0].length; c++) {
                arr.push(getdata[r][c]);
            }
        }

        let row = $("#luckysheet-copy-arraymore-row").val(), col = $("#luckysheet-copy-arraymore-col").val();

        if (row == "" && col == "") {
            selection.copybyformat(event, JSON.stringify(arr));
            $("body .luckysheet-cols-menu").hide();
            return;
        }

        if (row == "") {
            row = 1;
        }
        else {
            row = parseInt(row);
            if (row == null) {
                row = 1;
            }
        }

        if (col == "") {
            col = 1;
        }
        else {
            col = parseInt(col);
            if (col == null) {
                col = 1;
            }
        }

        if(row.toString() == "NaN" || col.toString() == "NaN"){
            if(isEditMode()){
                alert("请输入正确的数值!");
            }
            else{
                tooltip.info("请输入正确的数值!", "");
            }
            return;
        }

        if(row < 1 || col < 1){
            if(isEditMode()){
                alert("行列数不能小于1!");
            }
            else{
                tooltip.info("行列数不能小于1!", "");
            }
            return;
        }

        let arrlen = arr.length, i = 0, ret = [];
        for (let r = 0; r < row; r++) {
            let a = [];
            for (let c = 0; c < col; c++) {
                a.push(arr[i++]);
                if (i >= arrlen) {
                    selection.copybyformat(event, JSON.stringify(ret));
                    $("body .luckysheet-cols-menu").hide();
                    return;
                }
            }
            ret.push(a);
        }

        selection.copybyformat(event, JSON.stringify(ret));
    });

    //复制为对角线
    $("#luckysheet-copy-diagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][r]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为反对角线
    $("#luckysheet-copy-antidiagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][clen - r - 1]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为对角偏移n列
    $("#luckysheet-copy-diagonaloffset").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length, 
            offset = parseInt($("#luckysheet-copy-diagonaloffset-value").val());

        if(offset.toString() == "NaN"){
            if(isEditMode()){
                alert("请输入正确的数值！");
            }
            else{
                tooltip.info("请输入正确的数值！", "");
            }
            return;
        }

        if(offset < 0){
            if(isEditMode()){
                alert("偏移列不能为负数！");
            }
            else{
                tooltip.info("偏移列不能为负数！", "");
            }
            return;
        }

        if (offset == null) {
            offset = 1;
        }

        for (let r = 0; r < getdata.length; r++) {
            if (r + offset >= clen) {
                break;
            }
            arr.push(getdata[r][r + offset]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为布尔值
    $("#luckysheet-copy-boolvalue").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                let bool = false;

                if(getObjType(getdata[r][c]) == "object"){
                    let v = getdata[r][c].v;
                }
                else{
                    let v = getdata[r][c];
                }

                if (v == null || v == "") {
                    bool = false;
                }
                else {
                    v = parseInt(v);
                    if (v == null || v > 0) {
                        bool = true;
                    }
                    else {
                        bool = false;
                    }
                }
                a.push(bool);
            }
            arr.push(a);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //矩阵操作选区 翻转 上下
    $("#luckysheet-matrix-turn-up").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let r = getdata.length - 1; r >= 0; r--) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 左右
    $("#luckysheet-matrix-turn-left").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = getdata[0].length - 1; c >= 0; c--) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 顺时针
    $("#luckysheet-matrix-turn-cw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let a = [];
            for (let r = getdata.length - 1; r >= 0; r--) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    //矩阵操作选区 翻转 逆时针
    $("#luckysheet-matrix-turn-anticw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        let arr = [];
        for (let c = getdata[0].length - 1; c >= 0; c--) {
            let a = [];
            for (let r = 0; r < getdata.length; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    //矩阵操作选区 转置
    $("#luckysheet-matrix-turn-trans").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let a = [];
            for (let r = 0; r < getdata.length; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    let jfnqrt = function (x, p) {
        if (x == 0)
            return 0;
        let x0, x1;
        x0 = x;
        x1 = ((p - 1) * x0 / p) + (x / (Math.pow(x0, p - 1) * p));//利用迭代法求解
        while (Math.abs(x1 - x0) > 0.000001) {
            x0 = x1;
            x1 = ((p - 1) * x0 / p) + (x / (Math.pow(x0, p - 1) * p));
        }
        return x1;
    }

    //矩阵操作选区 矩阵计算
    $("#luckysheet-matrix-cal-confirm").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let caltype = $("#luckysheet-matrix-cal-type").val(), 
            calvalue = parseInt($("#luckysheet-matrix-cal-value").val());

        if(calvalue.toString() == "NaN"){
            if(isEditMode()){
                alert("请输入正确的数值！");
            }
            else{
                tooltip.info("请输入正确的数值！", "");
            }
            return;
        }

        if (calvalue == null) {
            calvalue = 2;
        }

        let arr = [];

        for (let r = 0; r < getdata.length; r++) {
            let a = [];

            for (let c = 0; c < getdata[0].length; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if (parseInt(value) != null && getdata[r][c].ct != undefined && getdata[r][c].ct.t == "n") {
                        if (caltype == "minus") {
                            value.v = value.v - calvalue;
                        }
                        else if (caltype == "multiply") {
                            value.v = value.v * calvalue;
                        }
                        else if (caltype == "divided") {
                            value.v = numFormat(value.v / calvalue, 4);
                        }
                        else if (caltype == "power") {
                            value.v = Math.pow(value.v, calvalue);
                        }
                        else if (caltype == "root") {
                            if (calvalue == 2) {
                                value.v = numFormat(Math.sqrt(value.v), 4);
                            }
                            else if (calvalue == 3 && Math.cbrt) {
                                value.v = numFormat(Math.cbrt(value.v), 4);
                            }
                            else {
                                value.v = numFormat(jfnqrt(value.v, calvalue), 4);
                            }
                        }
                        else if (caltype == "log") {
                            value.v = numFormat(Math.log(value.v) * 10000 / Math.log(Math.abs(calvalue)), 4);
                        }
                        else {
                            value.v = value.v + calvalue;
                        }

                        if(value.v == null){
                            value.m = "";
                        }
                        else{
                            value.m = value.v.toString();
                        }
                    }
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按行
    $("#luckysheet-matrix-delezero-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        let arr = [];
        let getdatalen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            let a = [], stdel = true, eddel = true;
            for (let c = 0; c < getdatalen; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if ((value.v == "0" || value.v == 0) && stdel) {
                        continue;
                    }
                    else {
                        stdel = false;
                    }
                }
                a.push(value);
            }

            let a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (let c = a.length - 1; c >= 0; c--) {
                    let value = "";
                    if (a[c] != null) {
                        value = a[c];
                        if ((value.v == "0" || value.v == 0) && eddel) {
                            continue;
                        }
                        else {
                            eddel = false;
                        }
                    }
                    a1.unshift(value);
                }

                let l = getdatalen - a1.length;
                for (let c1 = 0; c1 < l; c1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按列
    $("#luckysheet-matrix-delezero-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata.length, collen = getdata[0].length;
        for (let c = 0; c < collen; c++) {
            let a = [], stdel = true, eddel = true;
            for (let r = 0; r < getdatalen; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if ((value.v == "0" || value.v == 0) && stdel) {
                        continue;
                    }
                    else {
                        stdel = false;
                    }
                }
                a.push(value);
            }

            let a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (let r = a.length - 1; r >= 0; r--) {
                    let value = "";
                    if (a[r] != null) {
                        value = a[r];
                        if ((value.v == "0" || value.v == 0) && eddel) {
                            continue;
                        }
                        else {
                            eddel = false;
                        }
                    }
                    a1.unshift(value);
                }

                let l = getdatalen - a1.length;
                for (let r1 = 0; r1 < l; r1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        let arr1 = [];
        for (let c = 0; c < arr[0].length; c++) {
            let a = [];
            for (let r = 0; r < arr.length; r++) {
                let value = "";
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        editor.controlHandler(arr1);
    });

    //矩阵操作选区 删除重复值 按行
    $("#luckysheet-matrix-delerpt-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            let a = [], repeat = {};

            for (let c = 0; c < getdatalen; c++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(value.v in repeat){
                        repeat[value.v].push(value);
                    }
                    else{
                        repeat[value.v] = [];
                        repeat[value.v].push(value);
                    }
                }
            }

            for (let c = 0; c < getdatalen; c++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            let l = getdatalen - a.length;
            for (let c1 = 0; c1 < l; c1++) {
                a.push(null);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除重复值 按列
    $("#luckysheet-matrix-delerpt-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata.length, collen = getdata[0].length;
        for (let c = 0; c < collen; c++) {
            let a = [], repeat = {};

            for (let r = 0; r < getdatalen; r++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(value.v in repeat){
                        repeat[value.v].push(value);
                    }
                    else{
                        repeat[value.v] = [];
                        repeat[value.v].push(value);
                    }
                }
            }

            for (let r = 0; r < getdatalen; r++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            a1 = a;
            let l = getdatalen - a1.length;
            for (let r1 = 0; r1 < l; r1++) {
                a1.push(null);
            }
            arr.push(a1);
        }

        let arr1 = [];
        for (let c = 0; c < arr[0].length; c++) {
            let a = [];
            for (let r = 0; r < arr.length; r++) {
                let value = null;
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        editor.controlHandler(arr1);
    });

    //回退 重做 按钮
    $("#luckysheet-icon-undo").click(function (event) {
        controlHistory.redo(event);
    });
    $("#luckysheet-icon-redo").click(function (event) {
        controlHistory.undo(event);
    });

    //表格底部名称栏区域 相关事件（增、删、改、隐藏显示、颜色等等）
    let isInitialSheetConfig = false, luckysheetcurrentSheetitem = null, jfdbclicklagTimeout = null;
    function showsheetconfigmenu() {
        if (!isInitialSheetConfig) {
            isInitialSheetConfig = true;
            $("#luckysheetsheetconfigcolorur").spectrum({
                showPalette: true,
                preferredFormat: "hex",
                clickoutFiresChange: false,
                showInitial: true,
                showInput: true,
                flat: true,
                hideAfterPaletteSelect: false,
                showSelectionPalette: true,
                maxPaletteSize: 10,
                cancelText: "取消",
                chooseText: "确定颜色",
                togglePaletteMoreText: "更多",
                togglePaletteLessText: "少于",
                clearText: "清除颜色选择",
                noColorSelectedText: "没有颜色被选择",
                palette: [["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"], ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)"], ["rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)"], ["rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)"], ["rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)"], ["rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"], ["#c1232b", "#27727b", "#fcce10", "#e87c25", "#b5c334", "#fe8463", "#9bca63", "#fad860", "#f3a43b", "#60c0dd", "#d7504b", "#c6e579", "#f4e001", "#f0805a", "#26c0c0", "#c12e34", "#e6b600", "#0098d9", "#2b821d", "#005eaa", "#339ca8", "#cda819", "#32a487", "#3fb1e3", "#6be6c1", "#626c91", "#a0a7e6", "#c4ebad", "#96dee8"]],
                change: function (color) {
                    let $input = $(this);
                    if (color != null) {
                        color = color.toHexString();
                    }
                    else {
                        color = "rgb(0, 0, 0)";
                    }

                    let oldcolor = null;
                    if(luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").length>0){
                        oldcolor = luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").css("background-color");
                    }

                    luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").remove();
                    luckysheetcurrentSheetitem.append('<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + color + ';"></div>');
                    let index = getSheetIndex(Store.currentSheetIndex);
                    Store.luckysheetfile[index].color = color;
                    server.saveParam("all", Store.currentSheetIndex, color, { "k": "color" });

                    if (Store.clearjfundo) {
                        let redo = {};
                        redo["type"] = "sheetColor";
                        redo["sheetIndex"] = Store.currentSheetIndex;
                        
                        redo["oldcolor"] = oldcolor;
                        redo["color"] = color;
                        
                        Store.jfundo = [];
                        Store.jfredo.push(redo);
                    }
                }
            });

            $("#luckysheetsheetconfigcolorreset").click(function () {
                let oldcolor = null;
                if(luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").length>0){
                    oldcolor = luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").css("background-color");
                }

                luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").remove();
                let index = getSheetIndex(Store.currentSheetIndex);
                Store.luckysheetfile[index].color = null;
                server.saveParam("all", Store.currentSheetIndex, null, { "k": "color" } );

                if (Store.clearjfundo) {
                    let redo = {};
                    redo["type"] = "sheetColor";
                    redo["sheetIndex"] = Store.currentSheetIndex;
                    
                    redo["oldcolor"] = oldcolor;
                    redo["color"] = null;

                    Store.jfundo = [];
                    Store.jfredo.push(redo);
                }
            });
        }

        let index = getSheetIndex(Store.currentSheetIndex);
        if (Store.luckysheetfile[index].color != null && Store.luckysheetfile[index].color.length > 0) {
            $("#luckysheetsheetconfigcolorur").spectrum("set", Store.luckysheetfile[index].color);

        }

        $("#luckysheetsheetconfigcolorur").parent().find("span, div, button, input, a").addClass("luckysheet-mousedown-cancel");
        setTimeout(function(){
            mouseclickposition($("#luckysheet-rightclick-sheet-menu"), luckysheetcurrentSheetitem.offset().left + luckysheetcurrentSheetitem.width(), luckysheetcurrentSheetitem.offset().top - 18, "leftbottom");
        },1);
    }

    let luckysheetsheetrightclick = function ($t, $cur, e) {
        clearTimeout(jfdbclicklagTimeout);
        if ($cur.hasClass("luckysheet-sheets-item-name") && $cur.attr("contenteditable") == "true") {
            return;
        }
        if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()) {
            setTimeout(function () {
                formula.setCaretPosition(formula.rangeSetValueTo.get(0), 0, formula.rangeSetValueTo.text().length);
                formula.createRangeHightlight();
                $("#luckysheet-input-box-index").find(".luckysheet-input-box-index-sheettxt").remove().end().prepend("<span class='luckysheet-input-box-index-sheettxt'>" + sheetmanage.getSheetName(formula.rangetosheet) + "!</span>").show();
                $("#luckysheet-input-box-index").css({"left": $("#luckysheet-input-box").css("left"), "top": (parseInt($("#luckysheet-input-box").css("top")) - 20) + "px", "z-index": $("#luckysheet-input-box").css("z-index")});
            }, 1);
        }
        else {
            $("#luckysheet-input-box").removeAttr("style");
            $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove();
        }

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $t.addClass("luckysheet-sheets-item-active");
        cleargridelement(e);
        sheetmanage.changeSheet($t.data("index"));

        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if ($cur.hasClass("luckysheet-sheets-item-menu") || $cur.hasClass("fa-sort-desc") || e.which == "3") {
            luckysheetcurrentSheetitem = $cur.closest(".luckysheet-sheets-item");
            showsheetconfigmenu();
        }
    }

    $("#luckysheet-sheet-area").on("mousedown", "div.luckysheet-sheets-item", function (e) {
        if(isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        let $t = $(this), $cur = $(e.target), $item = $cur.closest(".luckysheet-sheets-item");

        if (e.which == "3") {
            luckysheetsheetrightclick($t, $cur, e);
            luckysheetcurrentSheetitem = $item;
            showsheetconfigmenu();
            return;
        }

        if ($item.hasClass("luckysheet-sheets-item-active") && $item.find(".luckysheet-sheets-item-name").attr("contenteditable") == "false") {
            jfdbclicklagTimeout = setTimeout(function () {
                Store.luckysheet_sheet_move_status = true;
                Store.luckysheet_sheet_move_data = {};
                Store.luckysheet_sheet_move_data.widthlist = [];
                
                $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function (i) {
                    if (i == 0) {
                        Store.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                    }
                    else {
                        Store.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()) + Store.luckysheet_sheet_move_data.widthlist[i - 1]);
                    }
                });

                Store.luckysheet_sheet_move_data.curindex = $("#luckysheet-sheet-area div.luckysheet-sheets-item").index($item);
                let x = e.pageX;
                Store.luckysheet_sheet_move_data.curleft = x - $item.offset().left;
                Store.luckysheet_sheet_move_data.pageX = x;
                Store.luckysheet_sheet_move_data.activeobject = $item;
                Store.luckysheet_sheet_move_data.cursorobject = $cur;
                let $itemclone = $item.clone().css("visibility", "hidden").attr("id", "luckysheet-sheets-item-clone");
                $item.after($itemclone);
                $item.css({ "position": "absolute", "opacity": 0.8, "cursor": "move", "transition": "initial", "z-index": 10 });
            }, 200);
        }
    }).on("click", "div.luckysheet-sheets-item", function (e) {
        if(isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }
        
        let $t = $(this), $cur = $(e.target);
        luckysheetsheetrightclick($t, $cur, e);
    });

    let luckysheetsheetnameeditor = function ($t) {
        $t.attr("contenteditable", "true").addClass("luckysheet-mousedown-cancel").data("oldtxt", $t.text());

        setTimeout(function () {
            if (document.selection) {
                let range = document.body.createTextRange();
                range.moveToElementText($t.get(0));
                range.select();
            } else if (window.getSelection) {
                let range = document.createRange();
                range.selectNodeContents($t.get(0));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        }, 1);
    }

    $("#luckysheet-sheet-area").on("dblclick", "span.luckysheet-sheets-item-name", function (e) {
        luckysheetsheetnameeditor($(this));
    });

    $("#luckysheet-sheet-area").on("blur", "span.luckysheet-sheets-item-name", function (e) {
        let $t = $(this);
        let txt = $t.text(), oldtxt = $t.data("oldtxt");
        let index = getSheetIndex(Store.currentSheetIndex);
        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (index != i && Store.luckysheetfile[i].name == txt) {
                if(isEditMode()){
                    alert("标签页的名称不能重复！请重新修改");
                }
                else{
                    tooltip.info("提示", "标签页的名称不能重复！请重新修改");
                }
                $t.text(oldtxt).attr("contenteditable", "false");
                return;
            }
        }

        let winW = $(window).width();

        let c_width = 0;
        $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible").each(function(){
            c_width += $(this).outerWidth();
        });

        if (c_width >= winW * 0.7) {
            $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
            $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        }

        Store.luckysheetfile[index].name = txt;
        server.saveParam("all", Store.currentSheetIndex, txt, { "k": "name" });

        $t.attr("contenteditable", "false").removeClass("luckysheet-mousedown-cancel");

        if (Store.clearjfundo) {
            let redo = {};
            redo["type"] = "sheetName";
            redo["sheetIndex"] = Store.currentSheetIndex;
            
            redo["oldtxt"] = oldtxt;
            redo["txt"] = txt;

            Store.jfundo = [];
            Store.jfredo.push(redo);
        }
    });

    $("#luckysheet-sheet-area").on("keydown", "span.luckysheet-sheets-item-name", function (e) {
        let kcode = e.keyCode;
        let $t = $(this);
        if (kcode == keycode.ENTER) {
            let index = getSheetIndex(Store.currentSheetIndex);
            Store.luckysheetfile[index].name = $t.text();
            $t.attr("contenteditable", "false");
        }
    });

    $("#luckysheetsheetconfigrename").click(function () {
        luckysheetsheetnameeditor(luckysheetcurrentSheetitem.find("span.luckysheet-sheets-item-name"));
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfigshow").click(function () {
        $("#luckysheet-sheets-m").click();
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfigmoveleft").click(function () {
        if (luckysheetcurrentSheetitem.prevAll(":visible").length > 0) {
            luckysheetcurrentSheetitem.insertBefore(luckysheetcurrentSheetitem.prevAll(":visible").eq(0));
            sheetmanage.reOrderAllSheet();
        }
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfigmoveright").click(function () {
        if (luckysheetcurrentSheetitem.nextAll(":visible").length > 0) {
            luckysheetcurrentSheetitem.insertAfter(luckysheetcurrentSheetitem.nextAll(":visible").eq(0));
            sheetmanage.reOrderAllSheet();
        }
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfigdelete").click(function (e) {
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if($("#luckysheet-sheet-container-c .luckysheet-sheets-item:visible").length <= 1){
            if(isEditMode()){
                alert("工作薄内至少含有一张可视工作表。若需删除选定的工作表，请先插入一张新工作表或显示一张隐藏的工作表。");
            }
            else{
                tooltip.info("工作薄内至少含有一张可视工作表。若需删除选定的工作表，请先插入一张新工作表或显示一张隐藏的工作表。", "");
            }

            return;
        }

        let index = getSheetIndex(Store.currentSheetIndex);

        tooltip.confirm("是否删除【" + Store.luckysheetfile[index].name + "】？", "<span style='color:#9e9e9e;font-size:12px;'>可以通过Ctrl+Z撤销删除</span>", function () {
            sheetmanage.deleteSheet(luckysheetcurrentSheetitem.data("index"));
        }, null);
        
        $("#luckysheet-input-box").removeAttr("style");
    });

    $("#luckysheetsheetconfigcopy").click(function (e) {
        sheetmanage.copySheet(luckysheetcurrentSheetitem.data("index"), e);
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfighide").click(function () {
        if ($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").length == 1) {
            if(isEditMode()){
                alert("不能隐藏, 至少保留一个sheet标签");
            }
            else{
                tooltip.info("不能隐藏", "至少保留一个sheet标签");
            }
            return;
        }
        sheetmanage.setSheetHide(luckysheetcurrentSheetitem.data("index"));
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheet-sheets-add").click(function (e) {
        sheetmanage.addNewSheet(e);
        sheetmanage.locationSheet();
        $("#luckysheet-input-box").removeAttr("style");
    });

    let sheetscrollani = null, sheetscrollstart = 0, sheetscrollend = 0, sheetscrollstep = 150;
    $("#luckysheet-sheets-leftscroll").click(function () {
        let $c = $("#luckysheet-sheet-container-c");
        sheetscrollstart = $c.scrollLeft();
        sheetscrollend = $c.scrollLeft() - sheetscrollstep;
        
        if (sheetscrollend <= 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
        }
        $("#luckysheet-sheet-container .docs-sheet-fade-right").show();

        clearInterval(sheetscrollani);
        sheetscrollani = setInterval(function () {
            sheetscrollstart -= 4;
            $c.scrollLeft(sheetscrollstart);
            if (sheetscrollstart <= sheetscrollend) {
                clearInterval(sheetscrollani);
            }
        }, 1);
    });

    $("#luckysheet-sheets-rightscroll").click(function () {
        let $c = $("#luckysheet-sheet-container-c");
        sheetscrollstart = $c.scrollLeft();
        sheetscrollend = $c.scrollLeft() + sheetscrollstep;

        if (sheetscrollstart > 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").hide();
        }
        $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        
        clearInterval(sheetscrollani);
        sheetscrollani = setInterval(function () {
            sheetscrollstart += 4;
            $c.scrollLeft(sheetscrollstart);
            if (sheetscrollstart >= sheetscrollend) {
                clearInterval(sheetscrollani);
            }
        }, 1);
    });

    let initialOpenSheet = true;
    $("#luckysheet-sheets-m").click(function (e) {
        $("#luckysheet-sheet-list").html("");

        let item = "";
        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            let f = Store.luckysheetfile[i], icon = '', style = "";
            if (f["status"] == 1) {
                icon = '<i class="fa fa-check" aria-hidden="true"></i>';
            }

            if (f["hide"] == 1) {
                icon = '<i class="fa fa-low-vision" aria-hidden="true"></i>';
                style += "color:#BBBBBB;";
            }

            if (f["color"] != null && f["color"].length > 0) {
                style += "border-right:4px solid " + f["color"] + ";";
            }

            item += replaceHtml(sheetselectlistitemHTML, { "index": f["index"], "name": f["name"], "icon": icon, "style": style });
        }

        if (initialOpenSheet) {
            $("#" + Store.container).append(replaceHtml(sheetselectlistHTML, { "item": item }));
            $("#luckysheet-sheet-list").on("click", ".luckysheet-cols-menuitem", function (e) {
                if(isEditMode()){
                    // tooltip.info("提示", "图表编辑模式下不允许该操作！");
                    alert("图表编辑模式下不允许该操作！");
                    return;
                }

                let $item = $(this), index = $item.data("index");

                if ($item.data("index") != Store.currentSheetIndex) {
                    sheetmanage.setSheetShow(index);
                    sheetmanage.locationSheet();
                }
            });

            initialOpenSheet = false;
        }
        else {
            $("#luckysheet-sheet-list").html(item);
        }

        let $t = $("#luckysheet-sheet-list");

        mouseclickposition($t, $(this).offset().left, $(this).offset().top - 12, "leftbottom");
        $("#luckysheet-input-box").removeAttr("style");
    });

    //向左增加列，向上增加行
    $("#luckysheet-add-lefttop, #luckysheet-add-lefttop_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();
        
        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", "");
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", ""); 
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][0];
        luckysheetextendtable(Store.luckysheetRightHeadClickIs, st_index, value, "lefttop");
    });
    $("#luckysheet-addTopRows").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();
        
        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", "");
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", ""); 
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0].row[0];
        luckysheetextendtable('row', st_index, value, "lefttop");
    })
    $("#luckysheet-addLeftCols").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();
        
        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", "");
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", ""); 
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0].column[0];
        luckysheetextendtable('column', st_index, value, "lefttop");
    })

    //向右增加列，向下增加行
    $("#luckysheet-add-rightbottom, #luckysheet-add-rightbottom_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", ""); 
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", "");
            }

            return;
        }

        let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][1];
        luckysheetextendtable(Store.luckysheetRightHeadClickIs, st_index, value, "rightbottom");
    });
    $("#luckysheet-addBottomRows").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", ""); 
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", "");
            }

            return;
        }

        let st_index = Store.luckysheet_select_save[0].row[1];
        luckysheetextendtable('row', st_index, value, "rightbottom");
    });
    $("#luckysheet-addRightCols").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        let $t = $(this), value = $t.parent().find("input").val();
        if (!isRealNum(value)) {
            if(isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                tooltip.info("增加错误, 请输入数字", ""); 
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                tooltip.info("增加错误, 增加范围限制在1-100", "");
            }

            return;
        }

        let st_index = Store.luckysheet_select_save[0].column[1];
        luckysheetextendtable('column', st_index, value, "rightbottom");
    });
    
    //删除选中行列
    $("#luckysheet-del-selected, #luckysheet-del-selected_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(Store.luckysheetRightHeadClickIs == "row"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                }
            }
            else if(Store.luckysheetRightHeadClickIs == "column"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                }
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][0], 
            ed_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][1];
        luckysheetdeletetable(Store.luckysheetRightHeadClickIs, st_index, ed_index);
    });
    $("#luckysheet-delRows").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(Store.luckysheetRightHeadClickIs == "row"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                }
            }
            else if(Store.luckysheetRightHeadClickIs == "column"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                }
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0].row[0], 
            ed_index = Store.luckysheet_select_save[0].row[1];
        luckysheetdeletetable('row', st_index, ed_index);
    })
    $("#luckysheet-delCols").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 1){
            if(Store.luckysheetRightHeadClickIs == "row"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                }
            }
            else if(Store.luckysheetRightHeadClickIs == "column"){
                if(isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                }
            }
            return;
        }

        let st_index = Store.luckysheet_select_save[0].column[0], 
            ed_index = Store.luckysheet_select_save[0].column[1];
        luckysheetdeletetable('column', st_index, ed_index);
    })

    //隐藏、显示行
    $("#luckysheet-hidRows").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        let cfg = $.extend(true, {}, Store.config);
        if(cfg["rowhidden"] == null){
            cfg["rowhidden"] = {};
        }

        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
            let r1 = Store.luckysheet_select_save[s].row[0],
                r2 = Store.luckysheet_select_save[s].row[1],
                c1 = Store.luckysheet_select_save[s].column[0],
                c2 = Store.luckysheet_select_save[s].column[1];

            for(let r = r1; r <= r2; r++){
                cfg["rowhidden"][r] = 0;
            }
        }
    
        //保存撤销
        if(Store.clearjfundo){
            let redo = {};
            redo["type"] = "showHidRows";
            redo["sheetIndex"] = Store.currentSheetIndex;
            redo["config"] = $.extend(true, {}, Store.config);
            redo["curconfig"] = cfg;
    
            Store.jfundo = [];
            Store.jfredo.push(redo);
        }
    
        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;
    
        server.saveParam("cg", Store.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });
    
        //行高、列宽 刷新  
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    })
    $("#luckysheet-showHidRows").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        let cfg = $.extend(true, {}, Store.config);
        if(cfg["rowhidden"] == null){
            return;
        }

        for(let s = 0; s < Store.luckysheet_select_save.length; s++){
            let r1 = Store.luckysheet_select_save[s].row[0],
                r2 = Store.luckysheet_select_save[s].row[1],
                c1 = Store.luckysheet_select_save[s].column[0],
                c2 = Store.luckysheet_select_save[s].column[1];

            for(let r = r1; r <= r2; r++){
                delete cfg["rowhidden"][r];
            }
        }
    
        //保存撤销
        if(Store.clearjfundo){
            let redo = {};
            redo["type"] = "showHidRows";
            redo["sheetIndex"] = Store.currentSheetIndex;
            redo["config"] = $.extend(true, {}, Store.config);
            redo["curconfig"] = cfg;
    
            Store.jfundo = [];
            Store.jfredo.push(redo);
        }
    
        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;
    
        server.saveParam("cg", Store.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });
    
        //行高、列宽 刷新  
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    })

    //清除单元格内容
    $("#luckysheet-delete-text").click(function(){
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        if(Store.luckysheet_select_save.length > 0){
            let d = editor.deepCopyFlowData(Store.flowdata);

            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                if(hasPartMC(Store.config, r1, r2, c1, c2)){
                    has_PartMC = true;
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    tooltip.info("无法对部分合并单元格执行此操作", "");
                }

                return;
            }

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                for(let r = r1; r <= r2; r++){
                    for(let c = c1; c <= c2; c++){
                        if(pivotTable.isPivotRange(r, c)){
                            continue;
                        }

                        if(getObjType(d[r][c]) == "object"){
                            delete d[r][c]["m"];
                            delete d[r][c]["v"];

                            if(d[r][c]["f"] != null){
                                delete d[r][c]["f"];
                                formula.delFunctionGroup(r, c, Store.currentSheetIndex);

                                delete d[r][c]["spl"];
                            }
                        }
                        else{
                            d[r][c] = null;
                        }
                    }
                }
            }

            jfrefreshgrid(d, Store.luckysheet_select_save);
        }
    });

    //行高列宽设置
    $("#luckysheet-rows-cols-changesize").click(function(){
        $("#luckysheet-rightclick-menu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        let size = parseInt($(this).siblings("input[type='number']").val().trim());

        if(size < 0 || size > 255){
            if(isEditMode()){
                alert("数值必须在0 ~ 255之间");
            }
            else{
                tooltip.info("数值必须在0 ~ 255之间", "");
            }
            
            return;
        }

        let cfg = $.extend(true, {}, Store.config);
        let type;

        if(Store.luckysheetRightHeadClickIs == "row"){
            type = "resizeR";

            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0];
                let r2 = Store.luckysheet_select_save[s].row[1];

                for(let r = r1; r <= r2; r++){
                    cfg["rowlen"][r] = size;
                }
            }
        }
        else if(Store.luckysheetRightHeadClickIs == "column"){
            type = "resizeC";

            if(cfg["columlen"] == null){
                cfg["columlen"] = {};
            }

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let c1 = Store.luckysheet_select_save[s].column[0];
                let c2 = Store.luckysheet_select_save[s].column[1];

                for(let c = c1; c <= c2; c++){
                    cfg["columlen"][c] = size;
                }
            }
        }

        if (Store.clearjfundo) {
            Store.jfundo = [];
            Store.jfredo.push({
                "type": "resize",
                "ctrlType": type,
                "config": $.extend(true, {}, Store.config),
                "curconfig": $.extend(true, {}, cfg),
                "sheetIndex": Store.currentSheetIndex
            });
        }

        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

        if(Store.luckysheetRightHeadClickIs == "row"){
            server.saveParam("cg", Store.currentSheetIndex, cfg["rowlen"], { "k": "rowlen" });
            jfrefreshgrid_rhcw(Store.flowdata.length, null);
        }
        else if(Store.luckysheetRightHeadClickIs == "column"){
            server.saveParam("cg", Store.currentSheetIndex, cfg["columlen"], { "k": "columlen" });
            jfrefreshgrid_rhcw(null, Store.flowdata[0].length);
        }
    });

    //模态框拖动
    $(document).on("mousedown", "div.luckysheet-modal-dialog", function (e) {
        if (!$(e.target).is(".luckysheet-modal-dialog")) {
            return;
        }

        Store.luckysheet_model_move_state = true;

        Store.luckysheet_model_move_obj = $(e.currentTarget);
        let toffset = Store.luckysheet_model_move_obj.offset();
        Store.luckysheet_model_xy = [e.pageX - toffset.left, e.pageY - toffset.top];
    });

    //模态框关闭
    $(document).on("click", ".luckysheet-modal-dialog-title-close, .luckysheet-model-close-btn", function (e) {
        //选择文本颜色和单元格颜色弹出框取消
        if($("#textcolorselect").is(":visible")||$("#cellcolorselect").is(":visible")){
            $("#luckysheet-conditionformat-dialog").show();
        }
        $(e.currentTarget).parents(".luckysheet-modal-dialog").hide();
        $("#luckysheet-modal-dialog-mask").hide();

        //函数查找功能所有弹出框关闭和取消
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula")){
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula-parm")){
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula-parm-select")){
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }

        $("#" + Store.container).attr("tabindex", 0).focus();
    });

    //排序事件
    let luckysheet_sort_initial = true;
    $("#luckysheetorderby").click(function () {
        $("body .luckysheet-cols-menu").hide();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
            }
            return;
        }

        let last = Store.luckysheet_select_save[0];
        let r1 = last["row"][0], r2 = last["row"][1];
        let c1 = last["column"][0], c2 = last["column"][1];

        if (luckysheet_sort_initial) {
            luckysheet_sort_initial = false;
            let content = '<div style="overflow: hidden;" class="luckysheet-sort-modal"><div><label><input type="checkbox" id="luckysheet-sort-haveheader"/><span>数据具有标题行</span></label></div><div style="overflow-y:auto;" id="luckysheet-sort-dialog-tablec"><table data-itemcount="0" cellspacing="0"> <tr><td>排序依据 <select name="sort_0"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </td> <td> <div><label><input value="asc" type="radio" checked="checked" name="sort_0"><span>正序A-Z</span></label></div> <div><label><input value="desc" type="radio" name="sort_0"><span>倒序Z-A</span></label></div></td></tr></table></div><div style="background: #e5e5e5;border-top: 1px solid #f5f5f5; height: 1px; width: 100%;margin:2px 0px;margin-bottom:10px;"></div> <div> <span style="font-weight: bold; text-decoration: underline;text-align:center;color: blue;cursor: pointer;" class="luckysheet-sort-dialog-additem">+ 添加其他排序列</span> </div> </div>';

            $("body").append(replaceHtml(modelHTML, { "id": "luckysheet-sort-dialog", "addclass": "", "title": "排序范围", "content": content, "botton": '<button id="luckysheet-sort-modal-confirm" class="btn btn-primary">排序</button><button class="btn btn-default luckysheet-model-close-btn">关闭</button>' }));

            $("#luckysheet-sort-dialog .luckysheet-sort-dialog-additem").click(function () {
                let last = Store.luckysheet_select_save[0];
                let r1 = last["row"][0], r2 = last["row"][1];
                let c1 = last["column"][0], c2 = last["column"][1];

                let option = "", i = $("#luckysheet-sort-dialog table").data("itemcount") + 1;
                let t = $("#luckysheet-sort-haveheader").is(':checked');

                for (let c = c1; c <= c2; c++) {
                    if (t) {
                        let v = getcellvalue(r1, c, Store.flowdata, "m");

                        if(v == null){
                            v = "列" + (c - c1 + 1); 
                        }

                        option += '<option value="' + c + '">' + v + '</option>';
                    }
                    else {
                        option += '<option value="' + c + '">' + chatatABC(c) + '</option>';
                    }
                }

                $("#luckysheet-sort-dialog table").append('<tr class="luckysheet-sort-dialog-tr"><td><span class="luckysheet-sort-item-close" onclick="$(this).parent().parent().remove();"><i class="fa fa-times" aria-hidden="true"></i></span>次要排序 <select name="sort_' + i + '">' + option + '</select> </td> <td> <div><label><input value="asc" type="radio" checked="checked" name="sort_' + i + '"><span>正序A-Z</span></label></div> <div><label><input value="desc" type="radio" name="sort_' + i + '"><span>倒序Z-A</span></label></div></td></tr>');
                $("#luckysheet-sort-dialog table").data("itemcount", i);
            });

            $("#luckysheet-sort-haveheader").change(function () {
                let last = Store.luckysheet_select_save[0];
                let r1 = last["row"][0], r2 = last["row"][1];
                let c1 = last["column"][0], c2 = last["column"][1];

                let t = $(this).is(':checked');
                let option = "";

                for (let c = c1; c <= c2; c++) {
                    if (t) {
                        let v = getcellvalue(r1, c, Store.flowdata, "m");
                        
                        if(v == null){
                            v = "列" + (c - c1 + 1); 
                        }

                        option += '<option value="' + c + '">' + v + '</option>';
                    }
                    else {
                        option += '<option value="' + c + '">' + chatatABC(c) + '</option>';
                    }
                }

                $("#luckysheet-sort-dialog tr select").each(function () {
                    $(this).html(option);
                });
            });

            //自定义排序
            $("#luckysheet-sort-modal-confirm").click(function () {
                if(Store.luckysheet_select_save.length > 1){
                    if(isEditMode()){
                        alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                    }
                    else{
                        tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                    }

                    return;
                }

                let d = editor.deepCopyFlowData(Store.flowdata);

                let last = Store.luckysheet_select_save[0];
                let r1 = last["row"][0], r2 = last["row"][1];
                let c1 = last["column"][0], c2 = last["column"][1];

                //数据具有标题行
                let t = $("#luckysheet-sort-haveheader").is(':checked');

                let str;
                if(t){
                    str = r1 + 1;
                }
                else{
                    str = r1;
                }

                let hasMc = false; //排序选区是否有合并单元格
                let data = [];

                for(let r = str; r <= r2; r++){
                    let data_row = [];

                    for(let c = c1; c <= c2; c++){
                        if(d[r][c] != null && d[r][c].mc != null){
                            hasMc = true;
                            break;
                        }

                        data_row.push(d[r][c]);
                    }

                    data.push(data_row);
                }

                if(hasMc){
                    if(isEditMode()){
                        alert("选区有合并单元格，无法执行此操作！");
                    }
                    else{
                        tooltip.info("选区有合并单元格，无法执行此操作！", "");
                    }

                    return;
                }
                
                $($("#luckysheet-sort-dialog table tr").toArray().reverse()).each(function () {
                    let i = $(this).find("select").val(), 
                        asc = $(this).find('input:radio:checked').val();
                    
                    i -= c1;
                    
                    if (asc == "asc") {
                        asc = true;
                    }
                    else {
                        asc = false;
                    }

                    data = orderbydata([].concat(data), i, asc);
                });

                for(let r = str; r <= r2; r++){
                    for(let c = c1; c <= c2; c++){
                        d[r][c] = data[r - str][c - c1];
                    }
                }

                if(Store.config["rowlen"] != null){
                    let cfg = $.extend(true, {}, Store.config);
                    cfg = rowlenByRange(d, str, r2, cfg);

                    jfrefreshgrid(d, [{ "row": [str, r2], "column": [c1, c2] }], cfg, null, true);
                }
                else{
                    jfrefreshgrid(d, [{ "row": [str, r2], "column": [c1, c2] }]);
                }

                $("#luckysheet-sort-dialog").hide();
                $("#luckysheet-modal-dialog-mask").hide();
            });
        }

        let option = "";
        for (let c = c1; c <= c2; c++) {
            option += '<option value="' + c + '">' + chatatABC(c) + '</option>';
        }

        $("#luckysheet-sort-dialog select").html(option);

        $("#luckysheet-sort-dialog .luckysheet-sort-dialog-tr").remove();

        $("#luckysheet-sort-haveheader").prop("checked", false);
        $("#luckysheet-sort-dialog input:radio:first").prop("checked", "checked");

        $("#luckysheet-sort-dialog .luckysheet-modal-dialog-title-text").html("排序范围从<span>" + chatatABC(c1) + (r1 + 1) + "</span>到<span>" + chatatABC(c2) + (r2 + 1) + "</span>");

        let $t = $("#luckysheet-sort-dialog"), myh = $t.outerHeight(), myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();

        $("#luckysheet-sort-dialog-tablec").css("max-height", (winh - myh) / 2);
        $("#luckysheet-sort-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 2 }).show();
        $("#luckysheet-modal-dialog-mask").show();

        if (r1 < r2) {
            setTimeout(function () {
                let flowrowdata1 = Store.flowdata[r1], 
                    flowrowdata2 = Store.flowdata[r1 + 1], 
                    hastitle = false;
                
                for (let i = c1; i <= c2; i++) {
                    let isdatatype_r1 = isdatatype(flowrowdata1[i]), 
                        isdatatype_r2 = isdatatype(flowrowdata2[i]);
                    
                    if (isdatatype_r1 != isdatatype_r2) {
                        hastitle = true;
                    }
                }

                if (hastitle) {
                    $("#luckysheet-sort-haveheader").prop("checked", true).change();
                }
            }, 10);
        }
    });

    //筛选事件处理
    let hidefilersubmenu = null;
    $("#luckysheetfilter").click(createFilter);

    $("#luckysheet-filter-menu").mouseover(function () {
        clearTimeout(hidefilersubmenu);
        
        hidefilersubmenu = setTimeout(function () {
            $("#luckysheet-filter-submenu").hide();
        }, 500);
    });

    $("#luckysheet-filter-submenu").mouseover(function () {
        clearTimeout(hidefilersubmenu);
    }).find(".luckysheet-cols-menuitem").click(function (e) {
        $("#luckysheet-filter-selected span").html($(this).find(".luckysheet-cols-menuitem-content").text()).data("value", $(this).data("value"));
        $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide();

        let $type = $(this).data("type");
        let $value = $(this).attr("data-value");
        
        if ($type == "2") {
            $("#luckysheet-filter-selected span").data("type", "2");
            $("#luckysheet-filter-menu .luckysheet-filter-selected-input2").show();
            $("#luckysheet-filter-menu .luckysheet-filter-selected-input input").prop("type", "number");
        }
        else if ($type == "0") {
            $("#luckysheet-filter-selected span").data("type", "0");
        }
        else {
            $("#luckysheet-filter-selected span").data("type", "1");
            $("#luckysheet-filter-menu .luckysheet-filter-selected-input").eq(0).show();
            
            //若是日期 改变input type类型为date
            if($value == "dateequal" || $value == "datelessthan" || $value == "datemorethan"){
                $("#luckysheet-filter-menu .luckysheet-filter-selected-input input").prop("type", "date");
            }
            else if($value == "morethan" || $value == "moreequalthan" || $value == "lessthan" || $value == "lessequalthan" || $value == "equal" || $value == "noequal"){
                $("#luckysheet-filter-menu .luckysheet-filter-selected-input input").prop("type", "number");
            }
            else{
                $("#luckysheet-filter-menu .luckysheet-filter-selected-input input").prop("type", "text");
            }
        }

        $("#luckysheet-filter-byvalue").next().slideUp();
        $("#luckysheet-filter-submenu").hide();
    });

    $("#luckysheet-filter-bycondition, #luckysheet-filter-byvalue").click(function () {
        let $t = $(this);
        $t.next().slideToggle(200);

        setTimeout(function () {
            if ($t.attr("id") == "luckysheet-filter-bycondition" && $("#luckysheet-filter-bycondition").next().is(":visible")) {
                if ($("#luckysheet-filter-selected span").text() != "无") {
                    $("#luckysheet-filter-byvalue").next().slideUp(200);
                }
            }

            if ($t.is($("#luckysheet-filter-bycondition"))) {
                if ($("#luckysheet-filter-bycondition").next().is(":hidden") && $("#luckysheet-filter-byvalue").next().is(":hidden")) {
                    $("#luckysheet-filter-byvalue").next().slideDown(200);
                }
            }
        }, 300);
    });

    $("#luckysheet-filter-selected").click(function () {
        let $t = $(this), toffset = $t.offset(), $menu = $("#luckysheet-filter-submenu");
        $menu.hide();
    
        let winH = $(window).height(), winW = $(window).width();
        let menuW = $menu.width(), menuH = $menu.height();
        let top = toffset.top, left = toffset.left, mheight = winH - toffset.top - 20;
        
        if (toffset.left + menuW > winW) {
            left = toffset.left - menuW;
        }
    
        if (toffset.top > winH / 2) {
            top = winH - toffset.top;
            
            if (top < 0) {
                top = 0;
            }
    
            mheight = toffset.top - 20;
        }
    
        $menu.css({ "top": top, "left": left, "height": mheight }).show();
        clearTimeout(hidefilersubmenu);
    });

    //筛选按钮点击事件
    $("#luckysheet-cell-main").on("click", ".luckysheet-filter-options", function (e) {
        let $t = $(e.currentTarget), 
            toffset = $t.offset(), 
            $menu = $("#luckysheet-filter-menu"), 
            winH = $(window).height(), 
            winW = $(window).width();

        let st_r = $t.data("str"), 
            ed_r = $t.data("edr"), 
            cindex = $t.data("cindex"), 
            st_c = $t.data("stc"), 
            ed_c = $t.data("edc"), 
            rowhidden = $t.data("rowhidden") == "" ? {} : JSON.parse($t.data("rowhidden").replace(/\'/g, '"'));

        $("body .luckysheet-cols-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        $("#luckysheet-filter-byvalue-input").val("");
        $("#luckysheet-filter-bycondition").next().hide();
        $("#luckysheet-filter-byvalue").next().show();
        
        $menu.data("str", st_r);
        $menu.data("edr", ed_r);
        $menu.data("cindex", cindex);
        $menu.data("stc", st_c);
        $menu.data("edc", ed_c);

        $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide().find("input").val();
        $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text("无");

        let byconditiontype = $t.data("byconditiontype");
        $("#luckysheet-filter-selected span").data("value", $t.data("byconditionvalue")).data("type", byconditiontype).text($t.data("byconditiontext"));

        if (byconditiontype == "2") {
            let $input = $("#luckysheet-filter-menu .luckysheet-filter-selected-input2").show().find("input");
            $input.eq(0).val($t.data("byconditionvalue1"));
            $input.eq(1).val($t.data("byconditionvalue2"));
        }
        else if (byconditiontype == "1") {
            $("#luckysheet-filter-menu .luckysheet-filter-selected-input").eq(0).show().find("input").val($t.data("byconditionvalue1"));
        }

        $("#luckysheet-filter-orderby-asc").off("click").on("click", function () {
            orderbydatafiler(st_r, st_c, ed_r, ed_c, cindex, true);
        });

        $("#luckysheet-filter-orderby-desc").off("click").on("click", function () {
            orderbydatafiler(st_r, st_c, ed_r, ed_c, cindex, false);
        });

        $("#luckysheet-filter-byvalue-select").empty().html('<div style="width:100%;text-align:center;position:relative;top:45%;font-size:14px;"><div class="luckysheetLoaderGif"></div><span>数据量大！请稍后</span></div>');

        let rowhiddenother = {}; //其它筛选列的隐藏行
        $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").not(this).each(function () {
            let $t = $(this), rh = $t.data("rowhidden");
            
            if (rh == "") {
                return true;
            }

            rh = JSON.parse(rh.replace(/\'/g, '"'));
            
            for (let r in rh) {
                rowhiddenother[r] = 0;
            }
        });

        let data = Store.flowdata;

        setTimeout(function () {
            //日期值
            let dvmap = {};  
            let dvmap_uncheck = {};

            //除日期以外的值
            let vmap = {}; 
            let vmap_uncheck = {};  

            for (let r = st_r + 1; r <= ed_r; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(Store.flowdata[r] == null){
                    continue;
                }

                let cell = Store.flowdata[r][cindex];

                if(cell != null && !isRealNull(cell.v) && cell.ct != null && cell.ct.t == "d" ){ //单元格是日期
                    let v = update("YYYY-MM-DD", cell.v);

                    let y = v.split("-")[0];
                    let m = v.split("-")[1];
                    let d = v.split("-")[2];

                    if(!(y in dvmap)){
                        dvmap[y] = {};
                    }

                    if(!(m in dvmap[y])){
                        dvmap[y][m] = {};
                    }

                    if(!(d in dvmap[y][m])){
                        dvmap[y][m][d] = 0;
                    }
                    
                    dvmap[y][m][d]++;

                    if(r in rowhidden){
                        dvmap_uncheck[y] = 0;
                        dvmap_uncheck[m] = 0;
                        dvmap_uncheck[d] = 0;
                    }
                }
                else{
                    let v, m;
                    if(cell == null || isRealNull(cell.v)){
                        v = null;
                        m = null;
                    }
                    else{
                        v = cell.v;
                        m = cell.m;
                    }

                    if(!(v in vmap)){
                        vmap[v] = {};
                    }

                    if(!(m in vmap[v])){
                        vmap[v][m] = 0;                            
                    }

                    vmap[v][m]++;

                    if(r in rowhidden){
                        vmap_uncheck[v + "#$$$#" + m] = 0;
                    }
                }
            }

            //遍历数据加到页面
            let item = [];

            if(JSON.stringify(dvmap).length > 2){
                for(let y in dvmap){
                    let ysum = 0;
                    let monthHtml = '';

                    for(let m in dvmap[y]){
                        let msum = 0;
                        let dayHtml = '';

                        for(let d in dvmap[y][m]){
                            let dayL = dvmap[y][m][d];
                            msum += dayL;

                            //月 小于 10
                            let mT;
                            if(Number(m) < 10){
                                mT = "0" + Number(m);
                            }
                            else{
                                mT = m;    
                            }

                            //日 小于 10
                            let dT;
                            if(Number(d) < 10){
                                dT = "0" + Number(d);
                            }
                            else{
                                dT = d;    
                            }

                            //日是否选中状态
                            if((y in dvmap_uncheck) && (m in dvmap_uncheck) && (d in dvmap_uncheck)){
                                dayHtml +=  '<div class="day luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'-'+ mT +'-'+ dT +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + d + '</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' +
                                            '</div>';
                            }
                            else{
                                dayHtml +=  '<div class="day luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'-'+ mT +'-'+ dT +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + d + '</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' +
                                            '</div>';
                            }
                        }

                        ysum += msum;
                        
                        //月 小于 10
                        let mT2;
                        if(Number(m) < 10){
                            mT2 = "0" + Number(m);
                        }
                        else{
                            mT2 = m;    
                        }

                        //月是否选中状态
                        if((y in dvmap_uncheck) && (m in dvmap_uncheck)){
                            monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' +
                                            '<div class="month luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'-'+ mT2 +'">' +
                                                '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + m + '月</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' +
                                            '</div>' +
                                            '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' +
                                        '</div>';
                        }
                        else{
                            monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' +
                                            '<div class="month luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'-'+ mT2 +'">' +
                                                '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + m + '月</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' +
                                            '</div>' +
                                            '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' +
                                        '</div>';
                        }
                    }

                    //年是否选中状态
                    let yearHtml;
                    if(y in dvmap_uncheck){
                        yearHtml =  '<div class="yearBox luckysheet-mousedown-cancel">' +
                                            '<div class="year luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'">' +
                                                '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + y + '年</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' +
                                            '</div>' +
                                            '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' +
                                        '</div>';
                    }
                    else{
                        yearHtml =  '<div class="yearBox luckysheet-mousedown-cancel">' +
                                            '<div class="year luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'">' +
                                                '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + y + '年</label>' +
                                                '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' +
                                            '</div>' +
                                            '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' +
                                        '</div>';
                    }

                    item.unshift(yearHtml);
                }
            }

            if(JSON.stringify(vmap).length > 2){
                let vmapKeys = Object.keys(vmap);
                vmapKeys = orderbydata1D(vmapKeys, true);

                for(let i = 0; i < vmapKeys.length; i++){
                    let v = vmapKeys[i];

                    for(let x in vmap[v]){
                        let text;
                        if((v + "#$$$#" + x) == "null#$$$#null"){
                            text = "(空白)";
                        }
                        else{
                            text = x;
                        }

                        //是否选中状态
                        let dataHtml;
                        if((v + "#$$$#" + x) in vmap_uncheck){
                            dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="false" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ text +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                                '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                            '</div>';
                        }
                        else{
                            dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="true" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ text +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                                '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                            '</div>';
                        }

                        item.push(dataHtml);
                    }
                }
            }

            $("#luckysheet-filter-byvalue-select").html("<div class='ListBox luckysheet-mousedown-cancel' style='min-height: 100px; max-height: " + (winH - toffset.top - 350) + "px; overflow-y: auto; overflow-x: hidden;'><table cellspacing='0' style='width:100%;' class='luckysheet-mousedown-cancel'>" + item.join("") + "</table></div>");
        }, 1);

        showrightclickmenu($menu, toffset.left, toffset.top + 20);

        e.stopPropagation();
        return false;
    });

    //按颜色筛选
    $("#luckysheet-filter-orderby-color").hover(
        function(){
            //遍历筛选列颜色
            let $menu = $("#luckysheet-filter-menu");
            let st_r = $menu.data("str"), 
                ed_r = $menu.data("edr"), 
                cindex = $menu.data("cindex"), 
                st_c = $menu.data("stc"), 
                ed_c = $menu.data("edc");
            let bgMap = {}; //单元格颜色
            let fcMap = {}; //字体颜色
    
            let af_compute = alternateformat.getComputeMap();
            let cf_compute = conditionformat.getComputeMap();
    
            for (let r = st_r + 1; r <= ed_r; r++) {
                let cell = Store.flowdata[r][cindex];
    
                //单元格颜色
                let bg = menuButton.checkstatus(Store.flowdata, r, cindex , "bg");
    
                let checksAF = alternateformat.checksAF(r, cindex, af_compute);
                if(checksAF != null){//若单元格有交替颜色
                    bg = checksAF[1];
                }
    
                let checksCF = conditionformat.checksCF(r, cindex, cf_compute);
                if(checksCF != null && checksCF["cellColor"] != null){//若单元格有条件格式
                    bg = checksCF["cellColor"];
                }
    
                if(bg.indexOf("rgb") > -1){
                    bg = rgbTohex(bg);
                }
    
                if(bg.length == 4){
                    bg = bg.substr(0, 1) + bg.substr(1, 1).repeat(2) + bg.substr(2, 1).repeat(2) + bg.substr(3, 1).repeat(2);
                }
    
                //字体颜色
                let fc = menuButton.checkstatus(Store.flowdata, r, cindex , "fc");
                
                if(checksAF != null){//若单元格有交替颜色
                    fc = checksAF[0];
                }
    
                if(checksCF != null && checksCF["textColor"] != null){//若单元格有条件格式
                    fc = checksCF["textColor"];
                }
    
                if(fc.indexOf("rgb") > -1){
                    fc = rgbTohex(fc);
                }
    
                if(fc.length == 4){
                    fc = fc.substr(0, 1) + fc.substr(1, 1).repeat(2) + fc.substr(2, 1).repeat(2) + fc.substr(3, 1).repeat(2);
                }
    
                if(Store.config != null && Store.config["rowhidden"] != null && r in Store.config["rowhidden"]){
                    bgMap[bg] = 1;
    
                    if(cell != null && !isRealNull(cell.v)){
                        fcMap[fc] = 1;
                    }
                }
                else{
                    bgMap[bg] = 0;
    
                    if(cell != null && !isRealNull(cell.v)){
                        fcMap[fc] = 0;
                    }
                }
            }
            //
            let filterBgColorHtml = '';
            if(JSON.stringify(bgMap).length > 2 && Object.keys(bgMap).length > 1){
                let bgColorItemHtml = '';
                for(let b in bgMap){
                    if(bgMap[b] == 0){
                        bgColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + b + '" title="' + b + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/></div>';
                    }
                    else{
                        bgColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + b + '" title="' + b + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox"/></div>';
                    }
                }
                filterBgColorHtml = '<div id="filterBgColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">按单元格颜色筛选</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + bgColorItemHtml + '</div></div>';
            }
    
            let filterFcColorHtml = '';
            if(JSON.stringify(fcMap).length > 2 && Object.keys(fcMap).length > 1){
                let fcColorItemHtml = '';
                for(let f in fcMap){
                    if(fcMap[f] == 0){
                        fcColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + f + '" title="' + f + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/></div>';
                    }
                    else{
                        fcColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + f + '" title="' + f + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox"/></div>';
                    }
                }
                filterFcColorHtml = '<div id="filterFcColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">按字体颜色筛选</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + fcColorItemHtml + '</div></div>';
            }
            //
            let content;
            if(filterBgColorHtml == '' && filterFcColorHtml == ''){
                content = '<div class="luckysheet-mousedown-cancel" style="padding: 10px 30px;text-align: center;">本列仅包含一种颜色</div>';
            }
            else{
                content = filterBgColorHtml + filterFcColorHtml + '<div class="luckysheet-mousedown-cancel"><button id="luckysheet-filter-orderby-color-confirm" class="btn btn-primary luckysheet-mousedown-cancel" style="margin: 5px 20px;width: 70px;">确认</button></div>';
            }
            //颜色筛选子菜单
            $("#luckysheet-filter-orderby-color-submenu").remove();
            $("body").append('<div id="luckysheet-filter-orderby-color-submenu" class="luckysheet-cols-menu luckysheet-mousedown-cancel">'+content+'</div>');
            let $t = $("#luckysheet-filter-orderby-color-submenu").end();
            let $con = $(this).parent();
            let winW = $(window).width(), winH = $(window).height();
            let menuW = $con.width(), 
                myh = $t.height() + 25, 
                myw = $t.width() + 5;
            let offset = $(this).offset();
            let top = offset.top, left = offset.left + menuW;
    
            if (left + myw > winW) {
                left = offset.left - myw;
            }
    
            if (top + myh > winH) {
                top = winH - myh;
            }
    
            $("#luckysheet-filter-orderby-color-submenu").css({ "top": top, "left": left }).show();
        },
        function(){
            submenuhide = setTimeout(function () { $("#luckysheet-filter-orderby-color-submenu").hide(); }, 200);
        }
    );

    $(document).on("mouseover mouseleave", "#luckysheet-filter-orderby-color-submenu", function(e){
        if (e.type === "mouseover") {
            clearTimeout(submenuhide);
        } 
        else {
            $(this).hide();
        }
    });
    $(document).on("click", "#luckysheet-filter-orderby-color-submenu .item label", function(){
        $(this).siblings("input[type='checkbox']").click();
    });
    $(document).off("click.orderbyColorConfirm").on("click.orderbyColorConfirm", "#luckysheet-filter-orderby-color-submenu #luckysheet-filter-orderby-color-confirm", function(){
        let bg_colorMap = {};
        let fc_colorMap = {};
        
        $("#luckysheet-filter-orderby-color-submenu .item").each(function(i, e){
            if($(e).find("input[type='checkbox']").is(":checked")){
                let color = $(this).find("label").attr("title");
                let $id = $(this).closest(".box").attr("id");
    
                if($id == "filterBgColor"){
                    bg_colorMap[color] = 0;
                }
                else if($id == "filterFcColor"){
                    fc_colorMap[color] = 0;
                }
            }
        });
        
        let bg_filter;
        if($("#luckysheet-filter-orderby-color-submenu #filterBgColor").length > 0){
            bg_filter = true;
        }
        else{
            bg_filter = false;
        }
        
        let fc_filter;
        if($("#luckysheet-filter-orderby-color-submenu #filterFcColor").length > 0){
            fc_filter = true;
        }
        else{
            fc_filter = false;
        }
    
        let $menu = $("#luckysheet-filter-menu");
        let st_r = $menu.data("str"), 
            ed_r = $menu.data("edr"), 
            cindex = $menu.data("cindex"), 
            st_c = $menu.data("stc"), 
            ed_c = $menu.data("edc");
    
        let rowhiddenother = {}; //其它筛选列的隐藏行
        $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").not($("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c).get(0)).each(function () {
            let $t = $(this), rh = $t.data("rowhidden");
    
            if (rh == "") {
                return true;
            }
    
            rh = JSON.parse(rh);
            
            for (let r in rh) {
                rowhiddenother[r] = 0;
            }
        });
    
        let filterdata = {};
        let rowhidden = {};
        let caljs = {};
    
        let af_compute = alternateformat.getComputeMap();
        let cf_compute = conditionformat.getComputeMap();
    
        for (let r = st_r + 1; r <= ed_r; r++) {
            if(r in rowhiddenother){
                continue;
            }
    
            if(Store.flowdata[r] == null){
                continue;
            }
    
            let cell = Store.flowdata[r][cindex];
    
            //单元格颜色
            let bg = menuButton.checkstatus(Store.flowdata, r, cindex , "bg");
    
            let checksAF = alternateformat.checksAF(r, cindex, af_compute);
            if(checksAF != null){//若单元格有交替颜色
                bg = checksAF[1];
            }
    
            let checksCF = conditionformat.checksCF(r, cindex, cf_compute);
            if(checksCF != null && checksCF["cellColor"] != null){//若单元格有条件格式
                bg = checksCF["cellColor"];
            }
    
            if(bg.indexOf("rgb") > -1){
                bg = rgbTohex(bg);
            }
    
            if(bg.length == 4){
                bg = bg.substr(0, 1) + bg.substr(1, 1).repeat(2) + bg.substr(2, 1).repeat(2) + bg.substr(3, 1).repeat(2);
            }
    
            //文本颜色
            let fc = menuButton.checkstatus(Store.flowdata, r, cindex , "fc");
    
            if(checksAF != null){//若单元格有交替颜色
                fc = checksAF[0];
            }
    
            if(checksCF != null && checksCF["textColor"] != null){//若单元格有条件格式
                fc = checksCF["textColor"];
            }
    
            if(fc.indexOf("rgb") > -1){
                fc = rgbTohex(fc);
            }
    
            if(fc.length == 4){
                fc = fc.substr(0, 1) + fc.substr(1, 1).repeat(2) + fc.substr(2, 1).repeat(2) + fc.substr(3, 1).repeat(2);
            }
    
            if(bg_filter && fc_filter){
                if(!(bg in bg_colorMap) && (!(fc in fc_colorMap) || cell == null || isRealNull(cell.v))){
                    rowhidden[r] = 0;
                }
            }
            else if(bg_filter){
                if(!(bg in bg_colorMap)){
                    rowhidden[r] = 0;
                }
            }
            else if(fc_filter){
                if(!(fc in fc_colorMap) || cell == null || isRealNull(cell.v)){
                    rowhidden[r] = 0;
                }
            }
        }
    
        let $top = $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c);
    
        let optionstate = Object.keys(rowhidden).length > 0;
    
        let rowhiddenall = $.extend(true, rowhiddenother, rowhidden), 
            rowhidenPre = json.parseJsonParm($top.data("rowhidden"));
    
        labelFilterOptionState($top, optionstate, rowhidden, caljs, true, st_r, ed_r, cindex, st_c, ed_c);
    
        let cfg = $.extend(true, {}, Store.config);
        cfg["rowhidden"] = rowhiddenall;
    
        //保存撤销
        if(Store.clearjfundo){
            let redo = {};
            redo["type"] = "datachangeAll_filter";
            redo["sheetIndex"] = Store.currentSheetIndex;
    
            redo["config"] = $.extend(true, {}, Store.config);
            redo["curconfig"] = cfg;
    
            redo["optionstate"] = optionstate;
            redo["optionsindex"] = cindex - st_c;
    
            redo["rowhidden"] = $.extend(true, {}, rowhidden);
            redo["rowhidenPre"] = $.extend(true, {}, rowhidenPre);
    
            if (caljs != null) {
                redo["caljs"] = caljs;
            }
    
            Store.jfundo = [];
            Store.jfredo.push(redo);
        }
    
        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;
    
        server.saveParam("cg", Store.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });
    
        //行高、列宽 刷新  
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu, #luckysheet-filter-orderby-color-submenu").hide();
        cleargridelement();
    });

    //点击复选框
    $(document).off("click.filterCheckbox1").on("click.filterCheckbox1", "#luckysheet-filter-byvalue-select .textBox",function(){
        if($(this).attr("data-check") == "true"){
            $(this).attr("data-check", "false");
            $(this).find("input[type='checkbox']").removeAttr("checked");
        }
        else{
            $(this).attr("data-check", "true");
            $(this).find("input[type='checkbox']").prop("checked", true);
        }
    })
    $(document).off("click.filterCheckbox2").on("click.filterCheckbox2", "#luckysheet-filter-byvalue-select .year",function(){
        if($(this).attr("data-check") == "true"){
            $(this).attr("data-check", "false");
            $(this).parents(".yearBox").find(".month").attr("data-check", "false");
            $(this).parents(".yearBox").find(".day").attr("data-check", "false");
            $(this).parents(".yearBox").find("input[type='checkbox']").removeAttr("checked");
        }
        else{
            $(this).attr("data-check", "true");
            $(this).parents(".yearBox").find(".month").attr("data-check", "true");
            $(this).parents(".yearBox").find(".day").attr("data-check", "true");
            $(this).parents(".yearBox").find("input[type='checkbox']").prop("checked", true);
        }
    })
    $(document).off("click.filterCheckbox3").on("click.filterCheckbox3", "#luckysheet-filter-byvalue-select .month",function(){
        //月份 对应的 天
        if($(this).attr("data-check") == "true"){
            $(this).attr("data-check", "false");
            $(this).parents(".monthBox").find(".day").attr("data-check", "false");
            $(this).parents(".monthBox").find("input[type='checkbox']").removeAttr("checked");
        }
        else{
            $(this).attr("data-check", "true");
            $(this).parents(".monthBox").find(".day").attr("data-check", "true");
            $(this).parents(".monthBox").find("input[type='checkbox']").prop("checked", true);
        }
        //月份 对应的 年份
        let yearDayAllCheck = true;
        let $yearDay = $(this).parents(".yearBox").find(".day");
        $yearDay.each(function(i,e){
            if($(e).attr("data-check") == "true"){
                
            }
            else{
                yearDayAllCheck = false;
            }
        });
        if(yearDayAllCheck){
            $(this).parents(".yearBox").find(".year").attr("data-check", "true");
            $(this).parents(".yearBox").find(".year input[type='checkbox']").prop("checked", true);
        }
        else{
            $(this).parents(".yearBox").find(".year").attr("data-check", "false");
            $(this).parents(".yearBox").find(".year input[type='checkbox']").removeAttr("checked");
        }
    })
    $(document).off("click.filterCheckbox4").on("click.filterCheckbox4", "#luckysheet-filter-byvalue-select .day",function(){
        if($(this).attr("data-check") == "true"){
            $(this).attr("data-check", "false");
            $(this).find("input[type='checkbox']").removeAttr("checked");
        }
        else{
            $(this).attr("data-check", "true");
            $(this).find("input[type='checkbox']").prop("checked", true);
        }
        //天 对应的 月份
        let monthDayAllCheck = true;
        let $monthDay = $(this).parents(".monthBox").find(".day");
        $monthDay.each(function(i,e){
            if($(e).attr("data-check") == "true"){
                
            }
            else{
                monthDayAllCheck = false;
            }
        });
        if(monthDayAllCheck){
            $(this).parents(".monthBox").find(".month").attr("data-check", "true");
            $(this).parents(".monthBox").find(".month input[type='checkbox']").prop("checked", true);
        }
        else{
            $(this).parents(".monthBox").find(".month").attr("data-check", "false");
            $(this).parents(".monthBox").find(".month input[type='checkbox']").removeAttr("checked");
        }
        //天 对应的 年份
        let yearDayAllCheck = true;
        let $yearDay = $(this).parents(".yearBox").find(".day");
        $yearDay.each(function(i,e){
            if($(e).attr("data-check") == "true"){
                
            }
            else{
                yearDayAllCheck = false;
            }
        });
        if(yearDayAllCheck){
            $(this).parents(".yearBox").find(".year").attr("data-check", "true");
            $(this).parents(".yearBox").find(".year input[type='checkbox']").prop("checked", true);
        }
        else{
            $(this).parents(".yearBox").find(".year").attr("data-check", "false");
            $(this).parents(".yearBox").find(".year input[type='checkbox']").removeAttr("checked");
        }
    })

    //日期 三级下拉显示
    $(document).off("click.filterYearDropdown").on("click.filterYearDropdown", "#luckysheet-filter-byvalue-select .yearBox .fa-caret-right",function(event){
        let $p = $(this).parents(".luckysheet-mousedown-cancel");
        if($p.hasClass("year")){
            $(this).parents(".yearBox").find(".monthList").slideToggle();
        }
        if($p.hasClass("month")){
            $(this).parents(".monthBox").find(".dayList").slideToggle();
        }

        event.stopPropagation();
    });

    //全选
    $("#luckysheet-filter-byvalue-btn-all").click(function () {
        $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").prop("checked", true);
        $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "true");
    });

    //清除
    $("#luckysheet-filter-byvalue-btn-clear").click(function () {
        $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").removeAttr("checked");
        $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "false");
    });

    //反选
    $("#luckysheet-filter-byvalue-btn-contra").click(function () {
        let $input = $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']");
        $input.each(function(i, e){
            if($(e).is(":checked")){
                $(e).removeAttr("checked");
                $(e).parents(".luckysheet-mousedown-cancel").attr("data-check", "false");
            }
            else{
                $(e).prop("checked", true);
                $(e).parents(".luckysheet-mousedown-cancel").attr("data-check", "true");
            }
        });
        //天 对应的 月份
        let $month = $("#luckysheet-filter-byvalue-select .ListBox .monthBox");
        $month.each(function(index, event){
            let monthDayAllCheck = true;
            let $monthDay = $(event).find(".day input[type='checkbox']");
            $monthDay.each(function(i,e){
                if($(e).is(":checked")){
                    
                }
                else{
                    monthDayAllCheck = false;
                }
            });
            if(monthDayAllCheck){
                $(event).find(".month input[type='checkbox']").prop("checked", true);
                $(event).attr("data-check", "true");
            }
            else{
                $(event).find(".month input[type='checkbox']").removeAttr("checked");
                $(event).attr("data-check", "false");
            }
        });
        //天 对应的 年份
        let $year = $("#luckysheet-filter-byvalue-select .ListBox .yearBox");
        $year.each(function(index, event){
            let yearDayAllCheck = true;
            let $yearDay = $(event).find(".day input[type='checkbox']");
            $yearDay.each(function(i,e){
                if($(e).is(":checked")){
                    
                }
                else{
                    yearDayAllCheck = false;
                }
            });
            if(yearDayAllCheck){
                $(event).find(".year input[type='checkbox']").prop("checked", true);
                $(event).attr("data-check", "true");
            }
            else{
                $(event).find(".year input[type='checkbox']").removeAttr("checked");
                $(event).attr("data-check", "false");
            }
        });
    });

    //清除筛选
    $("#luckysheet-filter-initial").click(function () {
        $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide().find("input").val();
        $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text("无");

        $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).remove();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

        let redo = {};
        redo["type"] = "datachangeAll_filter_clear";
        redo["sheetIndex"] = Store.currentSheetIndex;

        redo["config"] = $.extend(true, {}, Store.config);
        Store.config["rowhidden"] = {};
        redo["curconfig"] = $.extend(true, {}, Store.config);

        redo["filter_save"] = $.extend(true, {}, Store.luckysheet_filter_save);

        let optiongroups = [];
        $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").each(function () {
            let $t = $(this);

            let optionstate = $t.hasClass("luckysheet-filter-options-active");
            let rowhidden = json.parseJsonParm($t.data("rowhidden"));
            let caljs = json.parseJsonParm($t.data("caljs"));

            optiongroups.push({
                "optionstate":optionstate,
                "rowhidden": rowhidden, 
                "caljs":caljs, 
                "str": $t.data("str"),
                "edr": $t.data("edr"),
                "cindex": $t.data("cindex"),
                "stc": $t.data("stc"),
                "edc": $t.data("edc")
            });
        });
        redo["optiongroups"] = optiongroups;

        Store.jfundo = [];
        Store.jfredo.push(redo);

        //清除筛选发送给后台
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].filter = null;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].filter_select = null;

        server.saveParam("fsc", Store.currentSheetIndex, null);

        //config
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

        server.saveParam("cg", Store.currentSheetIndex, {}, { "k": "rowhidden" });

        //行高、列宽 刷新  
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    });

    //按照值进行筛选
    $("#luckysheet-filter-byvalue-input").on('input propertychange', function () {
        let v = $(this).val().toString();
        $("#luckysheet-filter-byvalue-select .ListBox .luckysheet-mousedown-cancel").show();
        
        if(v != ""){
            $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").each(function(i, e){
                if($(e).closest(".day").length > 0){
                    let day = $(e).siblings("label").text().toString();
                    let month = $(e).closest(".monthBox").find(".month label").text().toString();
                    let year = $(e).closest(".yearBox").find(".year label").text().toString();
                    let itemV = year + "-" + month + "-" + day;

                    if(itemV.indexOf(v) == -1){
                        $(e).closest(".day").hide();
                        
                        //天 对应的 月份
                        let $monthDay = $(e).closest(".dayList").find(".day:visible");
                        if($monthDay.length == 0){
                            $(e).closest(".monthBox").find(".month").hide();
                        }

                        //天 对应的 年份
                        let $yearDay = $(e).closest(".monthList").find(".day:visible");
                        if($yearDay.length == 0){
                            $(e).closest(".yearBox").find(".year").hide();
                        }
                    }
                }

                if($(e).closest(".textBox").length > 0){
                    let itemV = $(e).siblings("label").text().toString();
                    
                    if(itemV.indexOf(v) == -1){
                        $(e).parents(".textBox").hide();
                    }
                }
            });
        }
    });

    //筛选取消
    $("#luckysheet-filter-cancel").click(function () {
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
    });

    //筛选 确认
    $("#luckysheet-filter-confirm").click(function () {
        let $menu = $("#luckysheet-filter-menu");
        let st_r = $menu.data("str"), 
            ed_r = $menu.data("edr"), 
            cindex = $menu.data("cindex"), 
            st_c = $menu.data("stc"), 
            ed_c = $menu.data("edc");

        let rowhiddenother = {}; //其它筛选列的隐藏行
        $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").not($("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c).get(0)).each(function () {
            let $t = $(this), rh = $t.data("rowhidden");

            if (rh == "") {
                return true;
            }

            rh = JSON.parse(rh.replace(/\'/g, '"'));
            
            for (let r in rh) {
                rowhiddenother[r] = 0;
            }
        });

        let filterdata = {};
        let rowhidden = {};
        let caljs = {};

        if ($("#luckysheet-filter-bycondition").next().is(":visible") && $("#luckysheet-filter-byvalue").next().is(":hidden") && $("#luckysheet-filter-selected span").data("value") != "null") {
            let $t = $("#luckysheet-filter-selected span");
            let type = $t.data("type"), value = $t.data("value");

            caljs["value"] = value;
            caljs["text"] = $t.text();

            if (type == "0") {
                caljs["type"] = "0";
            }
            else if (type == "2") {
                let $input = $("#luckysheet-filter-menu .luckysheet-filter-selected-input2 input");
                caljs["type"] = "2";
                caljs["value1"] = $input.eq(0).val();
                caljs["value2"] = $input.eq(1).val();
            }
            else {
                caljs["type"] = "1";
                caljs["value1"] = $("#luckysheet-filter-menu .luckysheet-filter-selected-input").eq(0).find("input").val();
            }

            for (let r = st_r + 1; r <= ed_r; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(Store.flowdata[r] == null){
                    continue;
                }

                let cell = Store.flowdata[r][cindex];
                
                if (value == "cellnull") { //单元格为空
                    if(cell != null && !isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "cellnonull") { //单元格有数据
                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "textinclude") { //文本包含 
                    let value1 = caljs["value1"];

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m.indexOf(value1) == -1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textnotinclude") { //文本不包含
                    let value1 = caljs["value1"];

                    if(cell == null || isRealNull(cell.v)){

                    }
                    else{
                        if(cell.m.indexOf(value1) > -1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textstart") { //文本开头为
                    let value1 = caljs["value1"], valuelen = value1.length;

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m.substr(0, valuelen) != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textend") { //文本结尾为
                    let value1 = caljs["value1"], valuelen = value1.length;

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(valuelen > cell.m.length || cell.m.substr(cell.m.length - valuelen, valuelen) != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textequal") { //文本等于
                    let value1 = caljs["value1"];

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "dateequal") { //日期等于
                    let value1 = genarate(caljs["value1"])[2];

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "d"){
                        if(parseInt(cell.v) != value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "datelessthan") { //日期早于
                    let value1 = genarate(caljs["value1"])[2];

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "d"){
                        if(parseInt(cell.v) >= value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "datemorethan") { //日期晚于
                    let value1 = genarate(caljs["value1"])[2];

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "d"){
                        if(parseInt(cell.v) <= value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "morethan") { //大于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v <= value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "moreequalthan") { //大于等于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v < value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "lessthan") { //小于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v >= value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "lessequalthan") { //小于等于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v > value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "equal") { //等于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v != value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "noequal") { //不等于
                    let value1 = parseFloat(caljs["value1"]);

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v == value1){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "include") { //介于
                    let value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                    let min, max;
                    if(value1 < value2){
                        min = value1;
                        max = value2;
                    }
                    else{
                        max = value1;
                        min = value2;   
                    }

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v < min || cell.v > max){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "noinclude") { //不在其中
                    let value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                    let min, max;
                    if(value1 < value2){
                        min = value1;
                        max = value2;
                    }
                    else{
                        max = value1;
                        min = value2;   
                    }

                    if(cell == null || isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else if(cell.ct != null && cell.ct.t == "n"){
                        if(cell.v >= min && cell.v <= max){
                            rowhidden[r] = 0;
                        }
                    }
                    else{
                        rowhidden[r] = 0;
                    }
                }
            }
        }
        else {
            $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").each(function(i, e){
                if($(e).is(":visible") && $(e).is(":checked")){
                    return true;
                }

                if($(e).closest(".day").length > 0){
                    let day = $(e).siblings("label").text();
                    if(Number(day) < 10){
                        day = "0" + Number(day);
                    }

                    let month = $(e).closest(".monthBox").find(".month label").text().replace("月", "");
                    if(Number(month) < 10){
                        month = "0" + Number(month);
                    }

                    let year = $(e).closest(".yearBox").find(".year label").text().replace("年", "");

                    let itemV = "日期格式#$$$#" + year + "-" + month + "-" + day;

                    filterdata[itemV] = "1";
                }

                if($(e).closest(".textBox").length > 0){
                    let itemV = $(e).closest(".textBox").data("filter");

                    filterdata[itemV] = "1";
                }
            });
            
            for (let r = st_r + 1; r <= ed_r; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(Store.flowdata[r] == null){
                    continue;
                }

                let cell = Store.flowdata[r][cindex];

                let value;
                if(cell == null || isRealNull(cell.v)){
                    value = "null#$$$#null";
                }
                else if(cell.ct != null && cell.ct.t == "d"){
                    let fmt = update("YYYY-MM-DD", cell.v);
                    value = "日期格式#$$$#" + fmt;
                }
                else{
                    value = cell.v + "#$$$#" + cell.m;
                }

                if(value in filterdata){
                    rowhidden[r] = 0;
                }
            }
        }

        let $top = $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c);

        let optionstate = $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']:visible:checked").length < $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']:visible").length || $("#luckysheet-filter-byvalue-input").val().length > 0 || ($("#luckysheet-filter-bycondition").next().is(":visible") && $("#luckysheet-filter-byvalue").next().is(":hidden") && $("#luckysheet-filter-selected span").data("value") != "null");

        let rowhiddenall = $.extend(true, rowhiddenother, rowhidden), 
            rowhidenPre = json.parseJsonParm($top.data("rowhidden"));

        labelFilterOptionState($top, optionstate, rowhidden, caljs, true, st_r, ed_r, cindex, st_c, ed_c);

        let cfg = $.extend(true, {}, Store.config);
        cfg["rowhidden"] = rowhiddenall;

        //保存撤销
        if(Store.clearjfundo){
            let redo = {};
            redo["type"] = "datachangeAll_filter";
            redo["sheetIndex"] = Store.currentSheetIndex;

            redo["config"] = $.extend(true, {}, Store.config);
            redo["curconfig"] = cfg;

            redo["optionstate"] = optionstate;
            redo["optionsindex"] = cindex - st_c;

            redo["rowhidden"] = $.extend(true, {}, rowhidden);
            redo["rowhidenPre"] = $.extend(true, {}, rowhidenPre);

            if (caljs != null) {
                redo["caljs"] = caljs;
            }

            Store.jfundo = [];
            Store.jfredo.push(redo);
        }

        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

        server.saveParam("cg", Store.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });

        //行高、列宽 刷新  
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);

        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        cleargridelement();
    });

    //左上角返回按钮
    $("#luckysheet_info_detail_title").click(function(){
        window.open(luckysheetConfigsetting.myFolderUrl, "_self");
    });

    $("#luckysheet_info_detail_input").val(server.title).css("width", getByteLen(server.title) * 10).keydown(function(){
        let ctrlKey = event.ctrlKey;
        let altKey = event.altKey;
        let shiftKey = event.shiftKey;
        let kcode = event.keyCode;
        let $t = $(this);
        if(kcode == keycode.ENTER){
            $t.blur().change();
        }
    }).bind('input propertychange', function() { 
        let $t = $(this);
        let inputlen = getByteLen($t.val())*10;
        let updatelen = $("#luckysheet_info_detail_update").outerWidth();
        let savelen = $("#luckysheet_info_detail_save").outerWidth();
        let userlen = $("#luckysheet_info_detail_user").parent().outerWidth()+60;
        let containerlen = $("#" + Store.container).outerWidth();
        let otherlen = 100;

        let minuslen = containerlen- savelen - updatelen - userlen - otherlen;
        if(inputlen > minuslen){
            $("#luckysheet_info_detail_input").css("width", minuslen);
        }
        else{
            $("#luckysheet_info_detail_input").css("width", inputlen);
        }
    }).change(function(){
        server.saveParam("na", null, $(this).val());
    });

    //公式栏处理
    $("#luckysheet-functionbox-cell").focus(function () {
        if(isEditMode()){//此模式下禁用公式栏
            return;
        }

        if(Store.luckysheet_select_save.length > 0){
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

            let row_index = last["row_focus"], col_index = last["column_focus"];
            let row = Store.visibledatarow[row_index], 
                row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
            let col = Store.visibledatacolumn[col_index], 
                col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if(!!margeset){
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];
                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
            }
            
            luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata, null, true);
            formula.rangeResizeTo = $("#luckysheet-functionbox-cell");
        }
    }).keydown(function (event) {
        if(isEditMode()){//此模式下禁用公式栏
            return;
        }

        let ctrlKey = event.ctrlKey;
        let altKey = event.altKey;
        let shiftKey = event.shiftKey;
        let kcode = event.keyCode;
        let $inputbox = $("#luckysheet-input-box");

        if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && formula.searchFunctionCell != null) {
                formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                Store.luckysheet_select_save = [{ "row": [Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[0]], "column": [Store.luckysheetCellUpdate[1], Store.luckysheetCellUpdate[1]], "row_focus": Store.luckysheetCellUpdate[0], "column_focus": Store.luckysheetCellUpdate[1] }];
                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
                $("#luckysheet-functionbox-cell").blur();
            }
            event.preventDefault();
        }
        else if (kcode == keycode.ESC && parseInt($inputbox.css("top")) > 0) {
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.UP && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")) {
                let $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").prev();
                if ($up.length == 0) {
                    $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").last();
                }
                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $up.addClass("luckysheet-formula-search-item-active");
                event.preventDefault();
            }
        }
        else if (kcode == keycode.DOWN && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")) {
                let $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").next();
                if ($up.length == 0) {
                    $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").first();
                }
                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $up.addClass("luckysheet-formula-search-item-active");
                event.preventDefault();
            }
        }
        else if (kcode == keycode.LEFT && parseInt($inputbox.css("top")) > 0) {
            formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
        }
        else if (kcode == keycode.RIGHT && parseInt($inputbox.css("top")) > 0) {
            formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
        }
        else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || (event.ctrlKey && kcode == 86)) {
            formula.functionInputHanddler($("#luckysheet-rich-text-editor"), $("#luckysheet-functionbox-cell"), kcode);
        }
    }).click(function () {
        if(isEditMode()){//此模式下禁用公式栏
            return;
        }

        formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
    });

    //公式栏 取消（X）按钮
    $("#luckysheet-wa-functionbox-cancel").click(function () {
        if (!$(this).hasClass("luckysheet-wa-calculate-active")) {
            return;
        }
        //若有参数弹出框，隐藏
        if($("#luckysheet-search-formula-parm").is(":visible")){
            $("#luckysheet-search-formula-parm").hide();
        }
        //若有参数选取范围弹出框，隐藏
        if($("#luckysheet-search-formula-parm-select").is(":visible")){
            $("#luckysheet-search-formula-parm-select").hide();
        }

        formula.dontupdate();
        luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
    });

    //公式栏 确认（）按钮
    $("#luckysheet-wa-functionbox-confirm").click(function () {
        if (!$(this).hasClass("luckysheet-wa-calculate-active")) {
            return;
        }
        //若有参数弹出框，隐藏
        if($("#luckysheet-search-formula-parm").is(":visible")){
            $("#luckysheet-search-formula-parm").hide();
        }
        //若有参数选取范围弹出框，隐藏
        if($("#luckysheet-search-formula-parm-select").is(":visible")){
            $("#luckysheet-search-formula-parm-select").hide();
        }

        formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
    });

    //公式栏 fx按钮
    $("#luckysheet-wa-functionbox-fx").click(function () {
        //点击函数查找弹出框
        if(Store.luckysheet_select_save.length == 0){
            if(isEditMode()){
                alert("请选择单元格插入函数");
            }
            else{
                tooltip.info("请选择单元格插入函数","");
            }

            return;
        }

        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

        let row_index = last["row_focus"], col_index = last["column_focus"];
        let row = Store.visibledatarow[row_index], 
            row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
        let col = Store.visibledatacolumn[col_index], 
            col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

        luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, Store.flowdata);
        
        let cell = Store.flowdata[row_index][col_index];
        if(cell != null && cell.f != null){
            //单元格有计算
            let functionStr = formula.getfunctionParam(cell.f);
            if(functionStr.fn != null){
                //有函数公式
                insertFormula.formulaParmDialog(functionStr.fn, functionStr.param);
            }
            else{
                //无函数公式
                insertFormula.formulaListDialog();
            }
        }
        else{
            //单元格无计算
            $("#luckysheet-rich-text-editor").html('<span dir="auto" class="luckysheet-formula-text-color">=</span>');
            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
            insertFormula.formulaListDialog();
        }

        insertFormula.init();
    });

    //公式选区操作
    $("#luckysheet-formula-functionrange").on("mousedown", ".luckysheet-copy", function (event) {
        formula.rangeMove = true;
        Store.luckysheet_scroll_status = true;
        formula.rangeMoveObj = $(this).parent();
        formula.rangeMoveIndex = $(this).parent().attr("rangeindex");
        
        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        $("#luckysheet-formula-functionrange-highlight-" + formula.rangeMoveIndex).find(".luckysheet-selection-copy-hc").css("opacity", 0.13);
        
        let type = $(this).data("type");
        if (type == "top") {
            y += 3;
        }
        else if (type == "right") {
            x -= 3;
        }
        else if (type == "bottom") {
            y -= 3;
        }
        else if (type == "left") {
            x += 3;
        }

        let row_index = rowLocation(y)[2];
        let col_index = colLocation(x)[2];

        formula.rangeMovexy = [row_index, col_index];
        $("#luckysheet-sheettable").css("cursor", "move");
        event.stopPropagation();
    });

    $("#luckysheet-formula-functionrange").on("mousedown", ".luckysheet-highlight", function (e) {
        formula.rangeResize = $(this).data("type");//开始状态resize
        formula.rangeResizeIndex = $(this).parent().attr("rangeindex");
        
        let mouse = mouseposition(e.pageX, e.pageY), 
            scrollLeft = $("#luckysheet-cell-main").scrollLeft(), 
            scrollTop = $("#luckysheet-cell-main").scrollTop();
        let x = mouse[0] + scrollLeft;
        let y = mouse[1] + scrollTop;
        formula.rangeResizeObj = $(this).parent();
        $("#luckysheet-formula-functionrange-highlight-" + formula.rangeResizeIndex).find(".luckysheet-selection-copy-hc").css("opacity", 0.13);
        
        if (formula.rangeResize == "lt") {
            x += 3;
            y += 3;
        }
        else if (formula.rangeResize == "lb") {
            x += 3;
            y -= 3;
        }
        else if (formula.rangeResize == "rt") {
            x -= 3;
            y += 3;
        }
        else if (formula.rangeResize == "rb") {
            x -= 3;
            y -= 3;
        }

        let row_location = rowLocation(y), 
            row = row_location[1], 
            row_pre = row_location[0], 
            row_index = row_location[2];
        let col_location = colLocation(x), 
            col = col_location[1], 
            col_pre = col_location[0], 
            col_index = col_location[2];

        let position = formula.rangeResizeObj.position();
        formula.rangeResizexy = [
            col_pre, 
            row_pre, 
            formula.rangeResizeObj.width(), 
            formula.rangeResizeObj.height(), 
            position.left + scrollLeft, 
            position.top + scrollTop, col, row
        ];
        formula.rangeResizeWinH = $("#luckysheet-cell-main")[0].scrollHeight;
        formula.rangeResizeWinW = $("#luckysheet-cell-main")[0].scrollWidth;
        Store.luckysheet_scroll_status = true;
        event.stopPropagation();
    });

    //图表选区mousedown
    $("#luckysheet-chart-rangeShow").on("mousedown.chartRangeShowMove", ".luckysheet-chart-rangeShow-move", function(event){
        Store.chart_selection.rangeMove = true;
        Store.luckysheet_scroll_status = true;

        Store.chart_selection.rangeMoveObj = $(this).parent();

        let chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");
        let chart_json = !!window.store && store.state.chartSetting.chartList[chart_id];
        
        let $id = $(this).parent().attr("id");
        if($id == "luckysheet-chart-rangeShow-content"){
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];

            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }
        else if($id == "luckysheet-chart-rangeShow-rowtitle"){
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];

            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }
        else if($id == "luckysheet-chart-rangeShow-coltitle"){
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];
            
            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        
        let type = $(this).data("type");
        if (type == "top") {
            y += 3;
        }
        else if (type == "right") {
            x -= 3;
        }
        else if (type == "bottom") {
            y -= 3;
        }
        else if (type == "left") {
            x += 3;
        }

        let row_index = rowLocation(y)[2];
        let col_index = colLocation(x)[2];

        luckysheet.chart_selection.rangeMovexy = [row_index, col_index];

        event.stopPropagation();
    });

    $("#luckysheet-chart-rangeShow").on("mousedown.chartRangeShowResize", ".luckysheet-chart-rangeShow-resize", function(event){
        luckysheet.chart_selection.rangeResize = $(this).data("type");//开始状态resize
        Store.luckysheet_scroll_status = true;

        luckysheet.chart_selection.rangeResizeObj = $(this).parent();

        let chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");
        // let vue = !!window.generator && generator.chartEditorComponent;
        let chart_json = !!window.store && store.state.chartSetting.chartList[chart_id];
        
        let $id = $(this).parent().attr("id");
        if($id == "luckysheet-chart-rangeShow-content"){
            if(chart_json.rangeRowCheck.exits){
                let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
                let row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[1];
            }
            else{
                let row_s = chart_json.rangeSplitArray.content.row[0];
                let row_e = chart_json.rangeSplitArray.content.row[0];
            }

            if(chart_json.rangeColCheck.exits){
                let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];
                let col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[1];
            }
            else{
                let col_s = chart_json.rangeSplitArray.content.column[0];
                let col_e = chart_json.rangeSplitArray.content.column[1];
            }

            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }
        else if($id == "luckysheet-chart-rangeShow-rowtitle"){
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
            let row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[1];

            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];
            let col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[1];

            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }
        else if($id == "luckysheet-chart-rangeShow-coltitle"){
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
            let row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[1];

            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];
            let col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[1];
            
            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        if (luckysheet.chart_selection.rangeResize == "lt") {
            x += 3;
            y += 3;
        }
        else if (luckysheet.chart_selection.rangeResize == "lb") {
            x += 3;
            y -= 3;
        }
        else if (luckysheet.chart_selection.rangeResize == "rt") {
            x -= 3;
            y += 3;
        }
        else if (luckysheet.chart_selection.rangeResize == "rb") {
            x -= 3;
            y -= 3;
        }

        let row_index = rowLocation(y)[2];
        let col_index = colLocation(x)[2];

        luckysheet.chart_selection.rangeResizexy = [row_index, col_index];

        event.stopPropagation();
    })

    $("#luckysheet-wa-calculate-size").mousedown(function(e){
        let y = e.pageY;
        formula.functionResizeData.y = y;
        formula.functionResizeStatus = true;
        formula.functionResizeData.calculatebarHeight = Store.calculatebarHeight;
        if(formula.rangetosheet != null){
        	formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        }
    });

    //toolbar菜单
    $("#"+ Store.container +" .luckysheet-wa-editor").on("click", ".luckysheet-toolbar-zoom-combobox", function(e){
        $(e.currentTarget).addClass("luckysheet-toolbar-combo-button-open");
        $(e.currentTarget).find(".luckysheet-toolbar-combo-button-input").focus();
    });

    $("#"+ Store.container +" .luckysheet-wa-editor").on("blur", ".luckysheet-toolbar-combo-button-input", function(e){
        $(e.currentTarget).closest(".luckysheet-toolbar-zoom-combobox").removeClass("luckysheet-toolbar-combo-button-open");
    });

    //表格格式处理
    menuButton.initialMenuButton();

    let dpi_x = document.getElementById('testdpidiv').offsetWidth * Store.devicePixelRatio;
    let dpi_y = document.getElementById('testdpidiv').offsetHeight * Store.devicePixelRatio;

    //粘贴事件处理
    $(document).on("paste", function(e){
        if(isEditMode()){//此模式下禁用粘贴
            return;
        }

        if(selection.isPasteAction){
            $("#luckysheet-rich-text-editor").blur();
            selection.isPasteAction = false;

            let clipboardData = window.clipboardData; //for IE
            if (!clipboardData) { // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }

            let txtdata = clipboardData.getData("text/html");

            //如果标示是qksheet复制的内容，判断剪贴板内容是否是当前页面复制的内容
            let isEqual = true;
            if(txtdata.indexOf("luckysheet_copy_action_table") >- 1 && Store.luckysheet_copy_save["copyRange"] != null && Store.luckysheet_copy_save["copyRange"].length > 0){
                //剪贴板内容解析
                let cpDataArr = [];

                let reg = new RegExp('<tr.*?>(.*?)</tr>', 'g');
                let reg2 = new RegExp('<td.*?>(.*?)</td>', 'g');

                let regArr = txtdata.match(reg);

                for(let i = 0; i < regArr.length; i++){
                    let cpRowArr = [];

                    let reg2Arr = regArr[i].match(reg2);

                    for(let j = 0; j < reg2Arr.length; j++){
                        let cpValue = reg2Arr[j].replace(/<td.*?>/g, "").replace(/<\/td>/g, "");
                        cpRowArr.push(cpValue);
                    }

                    cpDataArr.push(cpRowArr);
                }

                //当前页面复制区内容
                let copy_r1 = Store.luckysheet_copy_save["copyRange"][0].row[0],
                    copy_r2 = Store.luckysheet_copy_save["copyRange"][0].row[1],
                    copy_c1 = Store.luckysheet_copy_save["copyRange"][0].column[0],
                    copy_c2 = Store.luckysheet_copy_save["copyRange"][0].column[1];

                let copy_index = Store.luckysheet_copy_save["dataSheetIndex"];

                let d;
                if(copy_index == Store.currentSheetIndex){
                    d = editor.deepCopyFlowData(Store.flowdata);
                }
                else{
                    d = Store.luckysheetfile[getSheetIndex(copy_index)].data;
                }

                for(let r = copy_r1; r <= copy_r2; r++){
                    if(r - copy_r1 > cpDataArr.length - 1){
                        break;
                    }

                    for(let c = copy_c1; c <= copy_c2; c++){
                        let cell = d[r][c];

                        let v;
                        if(cell != null){
                            if(cell.ct != null && cell.ct.fa.indexOf("w") > -1){
                                v = d[r][c].v;
                            }
                            else{
                                v = d[r][c].m;
                            }
                        }
                        else{
                            v = "";
                        }

                        if(cpDataArr[r - copy_r1][c - copy_c1] != v){
                            isEqual = false;
                            break;
                        }
                    }
                }
            }

            if(txtdata.indexOf("luckysheet_copy_action_table") >- 1 && Store.luckysheet_copy_save["copyRange"] != null && Store.luckysheet_copy_save["copyRange"].length > 0 && isEqual){
                //剪切板内容 和 luckysheet本身复制的内容 一致
                if(Store.luckysheet_paste_iscut){
                    Store.luckysheet_paste_iscut = false;
                    selection.pasteHandlerOfCutPaste(Store.luckysheet_copy_save);
                    selection.clearcopy(e);
                }
                else{
                    selection.pasteHandlerOfCopyPaste(Store.luckysheet_copy_save);
                }
            }
            else{
                if(txtdata.indexOf("table") > -1){
                    $("#luckysheet-copy-content").html(txtdata);

                    let data = new Array($("#luckysheet-copy-content").find("table tr").length);
                    let colLen = 0;
                    $("#luckysheet-copy-content").find("table tr").eq(0).find("td").each(function(){
                        let colspan = parseInt($(this).attr("colspan"));
                        if(isNaN(colspan)){
                            colspan = 1;
                        }
                        colLen += colspan;
                    });

                    for(let i = 0; i < data.length; i++){
                        data[i] = new Array(colLen);
                    }

                    let r = 0;
                    let borderInfo = {};
                    $("#luckysheet-copy-content").find("table tr").each(function(){
                        let $tr = $(this);
                        let c = 0;
                        $tr.find("td").each(function(){
                            let $td = $(this);
                            let cell = {};
                            let txt = $td.text();

                            if($.trim(txt).length == 0){
                                cell.v = null;
                                cell.m = "";
                            }
                            else{
                                let mask = genarate($td.text());
                                cell.v = mask[2];
                                cell.ct = mask[1];
                                cell.m = mask[0]; 
                            }

                            let bg = $td.css("background-color");
                            if(bg == "rgba(0, 0, 0, 0)"){
                                bg = "rgba(255,255,255)";
                            }
                            
                            cell.bg = bg;

                            let bl = $td.css("font-weight");
                            if(bl == 400 || bl == "normal"){
                                cell.bl = 0;
                            }
                            else{
                                cell.bl = 1;
                            }

                            let it = $td.css("font-style");
                            if(it == "normal"){
                                cell.it = 0;
                            }
                            else{
                                cell.it = 1;
                            }

                            let ff = $td.css("font-family");
                            let ffs = ff.split(",");
                            for(let i = 0; i < ffs.length; i++){
                                let fa = $.trim(ffs[i].toLowerCase());
                                fa = menuButton.fontjson[fa];
                                if(fa == null){
                                    cell.ff = 0;
                                }
                                else{
                                    cell.ff = fa;
                                    break;
                                }
                            }

                            let fs = Math.floor(parseInt($td.css("font-size")) * 72 / dpi_y) + 1;
                            cell.fs = fs;

                            let fc = $td.css("color");
                            cell.fc = fc;

                            let ht = $td.css("text-align");
                            if(ht == "center"){
                                cell.ht = 0;
                            }
                            else if(ht == "right"){
                                cell.ht = 2;
                            }
                            else{
                                cell.ht = 1;
                            }

                            let vt = $td.css("vertical-align");
                            if(vt == "middle"){
                                cell.vt = 0;
                            }
                            else if(vt == "top" || vt == "text-top"){
                                cell.vt = 1;
                            }
                            else{
                                cell.vt = 2;
                            }

                            while (c < colLen && data[r][c] != null) {
                                c++;
                            }

                            if(c == colLen){
                                return true;
                            }

                            if(data[r][c] == null){
                                data[r][c] = cell;
                                let rowspan = parseInt($td.attr("rowspan"));
                                let colspan = parseInt($td.attr("colspan"));
                                
                                if(isNaN(rowspan)){
                                    rowspan = 1;
                                }

                                if(isNaN(colspan)){
                                    colspan = 1;
                                }

                                let r_ab = Store.luckysheet_select_save[0]["row"][0] + r;
                                let c_ab = Store.luckysheet_select_save[0]["column"][0] + c;

                                for(let rp = 0; rp < rowspan; rp++){
                                    for(let cp = 0; cp < colspan; cp++){
                                        if(rp == 0){
                                            let bt = $td.css("border-top");
                                            if(bt != null && bt.length > 0 && bt.substr(0, 3).toLowerCase() != "0px"){
                                                let width = $td.css("border-top-width");
                                                let type = $td.css("border-top-style");
                                                let color = $td.css("border-top-color");
                                                let borderconfig = menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].t = { "style": borderconfig[0], "color": borderconfig[1] }; 
                                            }
                                        }

                                        if(rp == rowspan - 1){
                                            let bb = $td.css("border-bottom");
                                            if(bb != null && bb.length > 0 && bb.substr(0, 3).toLowerCase() != "0px"){
                                                let width = $td.css("border-bottom-width");
                                                let type = $td.css("border-bottom-style");
                                                let color = $td.css("border-bottom-color");
                                                let borderconfig = menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].b = { "style": borderconfig[0], "color": borderconfig[1] };
                                            }
                                        }

                                        if(cp == 0){
                                            let bl = $td.css("border-left");
                                            if(bl != null && bl.length > 0 && bl.substr(0, 3).toLowerCase() != "0px"){
                                                let width = $td.css("border-left-width");
                                                let type = $td.css("border-left-style");
                                                let color = $td.css("border-left-color");
                                                let borderconfig = menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].l = { "style": borderconfig[0], "color": borderconfig[1] };
                                            }
                                        }

                                        if(cp == colspan - 1){
                                            let br = $td.css("border-right");
                                            if(br != null && br.length > 0 && br.substr(0, 3).toLowerCase() != "0px"){
                                                let width = $td.css("border-right-width");
                                                let type = $td.css("border-right-style");
                                                let color = $td.css("border-right-color");
                                                let borderconfig = menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }
                                                
                                                borderInfo[(r + rp) + "_" + (c + cp)].r = { "style": borderconfig[0], "color": borderconfig[1] };
                                            }
                                        }

                                        if(rp == 0 && cp == 0){
                                            continue;
                                        }

                                        data[r + rp][c + cp] = { "mc": {"r": r_ab, "c": c_ab} };
                                    }
                                }

                                if(rowspan > 1 || colspan > 1){
                                    let first = { "rs": rowspan, "cs": colspan, "r": r_ab, "c": c_ab};
                                    data[r][c].mc = first;
                                }
                            }
                            
                            c++;

                            if(c == colLen){
                                return true;
                            }
                        });

                        r++;
                    });

                    Store.luckysheet_selection_range = [];
                    selection.pasteHandler(data, borderInfo);
                    $("#luckysheet-copy-content").empty();
                }
                else{
                    txtdata = clipboardData.getData("text/plain");
                    selection.pasteHandler(txtdata);
                }
            }
        }
    });

    //是否允许加载下一页
    if(luckysheetConfigsetting.enablePage){
        $("#luckysheet-bottom-page-next").click(function(){
            // rptapp
            let queryExps = luckysheetConfigsetting.pageInfo.queryExps;
            let reportId = luckysheetConfigsetting.pageInfo.reportId;
            let fields = luckysheetConfigsetting.pageInfo.fields;
            let mobile = luckysheetConfigsetting.pageInfo.mobile;
            let frezon = luckysheetConfigsetting.pageInfo.frezon;
            let currentPage = luckysheetConfigsetting.pageInfo.currentPage;
            let totalPage = luckysheetConfigsetting.pageInfo.totalPage;
            let pageUrl = luckysheetConfigsetting.pageInfo.pageUrl;

            // rptapp
            method.addDataAjax({
                "queryExps": queryExps, 
                "reportId": reportId, 
                "fields": fields, 
                "mobile": mobile, 
                "frezon": frezon ,
                "pageIndex": currentPage,
                "currentPage": currentPage
            }, Store.currentSheetIndex, pageUrl, function(){
                luckysheetConfigsetting.pageInfo.currentPage++;
                if(luckysheetConfigsetting.pageInfo.totalPage == (luckysheetConfigsetting.pageInfo.currentPage)){
                    $("#luckysheet-bottom-page-next").hide();
                    $("#luckysheet-bottom-page-info").html('共'+luckysheetConfigsetting.total +'条，'+ luckysheetConfigsetting.pageInfo.totalPage +'页，'+'已显示全部数据');
                }
                else{
                    $("#luckysheet-bottom-page-info").html('共'+luckysheetConfigsetting.total +'条，'+ luckysheetConfigsetting.pageInfo.totalPage +'页，当前已显示'+ (luckysheetConfigsetting.pageInfo.currentPage) +'页');
                }
            });
        }).mousedown(function(e){
            e.stopPropagation();
        });
    }

    //回到顶部
    $("#luckysheet-bottom-bottom-top").click(function(){
        $("#luckysheet-scrollbar-y").scrollTop(0);
    }).mousedown(function(e){
        e.stopPropagation();
    });
}