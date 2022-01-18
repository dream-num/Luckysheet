import menuButton from './menuButton';
import {luckysheetupdateCell} from './updateCell';
import { keycode } from './constant';
import { 
    luckysheetMoveHighlightCell,
} from './sheetMove';

import insertFormula from './insertFormula';
import { 
    rowLocation, 
    colLocation, 
    mouseposition 
} from '../global/location';
import { isEditMode } from '../global/validate';
import formula from '../global/formula';
import tooltip from '../global/tooltip';
import locale from '../locale/locale';
import Store from '../store';

export function formulaBarInitial(){
    //公式栏处理

    const _locale = locale();
    const locale_formula= _locale.formula;

    $("#luckysheet-functionbox-cell").focus(function () {
        if(isEditMode()){//此模式下禁用公式栏
            return;
        }

        if(Store.luckysheet_select_save.length > 0){
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

            let row_index = last["row_focus"], col_index = last["column_focus"];
            
            // let $input = $("#luckysheet-rich-text-editor"),value = $input.text();
            // if(value) {
            //     formula.updatecell(row_index, col_index);
            // }
            luckysheetupdateCell(row_index, col_index, Store.flowdata, null, true);
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
                //$("#luckysheet-functionbox-cell").blur();
                $("#luckysheet-rich-text-editor").focus();
            }
            event.preventDefault();
        }
        else if (kcode == keycode.ESC && parseInt($inputbox.css("top")) > 0) {
            formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            //$("#luckysheet-functionbox-cell").blur();
            $("#luckysheet-rich-text-editor").focus();
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
                alert(locale_formula.tipSelectCell);
            }
            else{
                tooltip.info(locale_formula.tipSelectCell,"");
            }

            return;
        }

        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

        let row_index = last["row_focus"], col_index = last["column_focus"];

        luckysheetupdateCell(row_index, col_index, Store.flowdata);
        
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

    $("#luckysheet-formula-functionrange").on("mousedown", ".luckysheet-highlight", function (event) {
        formula.rangeResize = $(this).data("type");//开始状态resize
        formula.rangeResizeIndex = $(this).parent().attr("rangeindex");
        
        let mouse = mouseposition(event.pageX, event.pageY), 
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
}