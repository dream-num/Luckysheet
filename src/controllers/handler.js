import luckysheetscrollevent from '../event/scroll';
import luckysheetFreezen from './freezen';
import { luckysheet_searcharray } from './sheetSearch';
import { ArrayUnique } from '../utils/util';
import luckysheetsizeauto from './resize'; 
import Store from '../store';

let visibledatarow = Store.visibledatarow;
let visibledatacolumn = Store.visibledatacolumn;

//, columeflowset, rowflowset
export default function luckysheetHandler() {
    //滚动监听
    $("#luckysheet-cell-main").scroll(function () {
        
    })
    .mousewheel(function (event, delta) {
        event.preventDefault();
    });

    $("#luckysheet-grid-window-1").mousewheel(function (event, delta) {
        let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(), 
            scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
        let visibledatacolumn_c = visibledatacolumn, 
            visibledatarow_c = visibledatarow;

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
            if(event.deltaX < 0){
                let col_ed = col_st + 3;
                if(col_ed >= visibledatacolumn_c.length){
                    col_ed = visibledatacolumn_c.length - 1;
                }
            }
            else{
                let col_ed = col_st - 3;
                if(col_ed < 0){
                    col_ed = 0;
                }
            }

            colscroll = col_ed == 0 ? 0 : visibledatacolumn_c[col_ed - 1];

            $("#luckysheet-scrollbar-x").scrollLeft(colscroll);
        }

        if(event.deltaY != 0){
            if(event.deltaY < 0){
                let row_ed = row_st + 3;
                if(row_ed >= visibledatarow_c.length){
                    row_ed = visibledatarow_c.length - 1;
                }
            }
            else{
                let row_ed = row_st - 3;
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
        let luckysheetDocument = document.getElementById("luckysheet");
        if(luckysheetDocument){
            luckysheetsizeauto();
        }            
    });

    //选区拖动替换
    var luckysheet_cell_selected_move = false, luckysheet_cell_selected_move_index = [];
    $("#luckysheet-cell-main div.luckysheet-cs-draghandle").mousedown(function (event) {
        if(luckysheet.isEditMode()){//此模式下禁用选区拖动
            return;
        }

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","move").end().find(".luckysheet-cs-draghandle").css("cursor","move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","move");

        luckysheet_cell_selected_move = true;
        luckysheet_scroll_status = true;

        var mouse = mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        var rowLocation = luckysheet.rowLocation(y), row_pre = rowLocation[0], row = rowLocation[1], row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(x), col_pre = colLocation[0], col = colLocation[1], col_index = colLocation[2];

        luckysheet_cell_selected_move_index = [row_index, col_index];

        $("#luckysheet-cell-selected-move").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1, "display": "block" });

        event.stopPropagation();
    });

    //选区下拉
    var luckysheet_cell_selected_extend = false, luckysheet_cell_selected_extend_index = [], luckysheet_cell_selected_extend_time = null;
    $("#luckysheet-cell-main div.luckysheet-cs-fillhandle").mousedown(function (event) {
        if(luckysheet.isEditMode()){//此模式下禁用选区下拉
            return;
        }

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","crosshair").end().find(".luckysheet-cs-draghandle").css("cursor","crosshair");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","crosshair");

        luckysheet_cell_selected_extend_time = setTimeout(function () {
            luckysheet_cell_selected_extend = true;
            luckysheet_scroll_status = true;

            var mouse = mouseposition(event.pageX, event.pageY);
            var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft() - 5;
            var y = mouse[1] + $("#luckysheet-cell-main").scrollTop() - 5;

            var rowLocation = luckysheet.rowLocation(y), row_pre = rowLocation[0], row = rowLocation[1], row_index = rowLocation[2];
            var colLocation = luckysheet.colLocation(x), col_pre = colLocation[0], col = colLocation[1], col_index = colLocation[2];

            luckysheet_cell_selected_extend_index = [row_index, col_index];

            $("#luckysheet-cell-selected-extend").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1, "display": "block" });
        }, 100);

        event.stopPropagation();
    }).click(function () {
        clearTimeout(luckysheet_cell_selected_extend_time);
        event.stopPropagation();
    }).dblclick(function () {
        var last = luckysheet_select_save[0];

        var r0 = last.row[0], 
            r1 = last.row[1], 
            c0 = last.column[0], 
            c1 = last.column[1];

        if(luckysheet.pivotTable.isPivotRange(r0, c0)){
            return;
        }

        var dropCellState = false;
        var step = 0;

        for(var r = r1 + 1; r < luckysheet.flowdata.length; r++){
            if(c0 - 1 >= 0 && c1 + 1 < luckysheet.flowdata[0].length){
                var cell1 = luckysheet.flowdata[r][c0 - 1];
                var cell2 = luckysheet.flowdata[r][c1 + 1];

                if(r == r1 + 1){
                    if((cell1 == null || luckysheet.func_methods.isRealNull(cell1.v)) && (cell2 == null || luckysheet.func_methods.isRealNull(cell2.v))){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if((cell1 == null || luckysheet.func_methods.isRealNull(cell1.v)) && (cell2 == null || luckysheet.func_methods.isRealNull(cell2.v))){
                        break;
                    }

                    step++;
                }
            }
            else if(c0 - 1 >= 0){
                var cell = luckysheet.flowdata[r][c0 - 1];

                if(r == r1 + 1){
                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        break;
                    }

                    step++;
                }
            }
            else if(c1 + 1 < luckysheet.flowdata[0].length){
                var cell = luckysheet.flowdata[r][c1 + 1];

                if(r == r1 + 1){
                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        dropCellState = false;
                        break;
                    }
                    else{
                        dropCellState = true;
                        step++;
                    }
                }
                else{
                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
        luckysheet.dropCell.copyRange = { "row": [r0, r1], "column": [c0, c1] };

        //applyType
        var typeItemHide = luckysheet.dropCell.typeItemHide();

        if(!typeItemHide[0] && !typeItemHide[1] && !typeItemHide[2] && !typeItemHide[3] && !typeItemHide[4] && !typeItemHide[5] && !typeItemHide[6]){
            luckysheet.dropCell.applyType = "0";
        }
        else{
            luckysheet.dropCell.applyType = "1";
        }

        luckysheet.dropCell.applyRange = { "row": [r1 + 1, r1 + step], "column": [c0, c1] };
        luckysheet.dropCell.direction = "down";

        luckysheet_select_save = [{ "row": [r0, r1 + step], "column": [c0, c1] }];

        luckysheet.dropCell.update();
        luckysheet.dropCell.createIcon();

        $("#luckysheet-cell-selected-move").hide();

        $("#luckysheet-sheettable").css("cursor", "default");
        clearTimeout(jfcountfuncTimeout);
        jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);

        event.stopPropagation();
    });

    $("#luckysheet-cell-main, #luckysheetTableContent").mousedown(function (event) {
        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","default").end().find(".luckysheet-cs-draghandle").css("cursor","default");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","default");

        //有批注在编辑时
        luckysheet.postil.removeActivePs();

        //luckysheetautoadjustmousedown = 1;
        var mouse = mouseposition(event.pageX, event.pageY);
        if (mouse[0] >= cellmainWidth - cellMainSrollBarSize || mouse[1] >= cellmainHeight - cellMainSrollBarSize) {
            return;
        }

        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        if(luckysheetFreezen.freezenverticaldata != null && mouse[0] < (luckysheetFreezen.freezenverticaldata[0] - luckysheetFreezen.freezenverticaldata[2])){
            x = mouse[0] + luckysheetFreezen.freezenverticaldata[2];
        }

        if(luckysheetFreezen.freezenhorizontaldata != null && mouse[1] < (luckysheetFreezen.freezenhorizontaldata[0] - luckysheetFreezen.freezenhorizontaldata[2])){
            y = mouse[1] + luckysheetFreezen.freezenhorizontaldata[2];
        }

        var rowLocation = luckysheet.rowLocation(y), 
            row = rowLocation[1], 
            row_pre = rowLocation[0], 
            row_index = rowLocation[2];
        
        var colLocation = luckysheet.colLocation(x), 
            col = colLocation[1], 
            col_pre = colLocation[0], 
            col_index = colLocation[2];

        var row_index_ed = row_index, col_index_ed = col_index;
        var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, row_index, col_index);
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
            var isright = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                if (luckysheet_select_save[s]["row"] != null && (row_index >= luckysheet_select_save[s]["row"][0] && row_index <= luckysheet_select_save[s]["row"][1] && col_index >= luckysheet_select_save[s]["column"][0] && col_index <= luckysheet_select_save[s]["column"][1])) {
                    isright = true;
                    break;
                }    
            }

            if(isright){
                return;
            }
        }

        //单元格数据下钻
        if(luckysheet.flowdata[row_index] != null && luckysheet.flowdata[row_index][col_index] != null && luckysheet.flowdata[row_index][col_index].dd != null){
            if(luckysheetConfigsetting.fireMousedown != null && luckysheet.getObjType(luckysheetConfigsetting.fireMousedown) == "function"){
                luckysheetConfigsetting.fireMousedown(luckysheet.flowdata[row_index][col_index].dd);
                return;
            }
        }

        luckysheet_scroll_status = true;

        //公式相关
        var $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {
            if (luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton()) {
                //公式选区
                var rowseleted = [row_index, row_index_ed];
                var columnseleted = [col_index, col_index_ed];

                var left = col_pre;
                var width = col - col_pre - 1;
                var top = row_pre;
                var height = row - row_pre - 1;

                if(event.shiftKey){
                    var last = luckysheet.formula.func_selectedrange;

                    var top = 0, height = 0, rowseleted = [];
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

                    var left = 0, width = 0, columnseleted = [];
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

                    var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                    if(changeparam != null){
                        columnseleted = changeparam[0];
                        rowseleted= changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    luckysheet.luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    luckysheet.formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    var vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = luckysheet.formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            var currSelection = window.getSelection();
                            luckysheet.formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            var textRange = document.selection.createRange();
                            luckysheet.formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        luckysheet.formula.canceFunctionrangeSelected();
                        luckysheet.formula.createRangeHightlight();
                    }

                    luckysheet.formula.rangestart = false;
                    luckysheet.formula.rangedrag_column_start = false;
                    luckysheet.formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    luckysheet.formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    luckysheet.formula.israngeseleciton();
                    luckysheet.formula.func_selectedrange = {
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
                    luckysheet.formula.func_selectedrange = {
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

                luckysheet.formula.rangeSetValue({ "row": rowseleted, "column": columnseleted });

                luckysheet.formula.rangestart = true;
                luckysheet.formula.rangedrag_column_start = false;
                luckysheet.formula.rangedrag_row_start = false;

                $("#luckysheet-formula-functionrange-select").css({ "left": left, "width": width, "top": top, "height": height }).show();
                $("#luckysheet-formula-help-c").hide();
                luckysheet.luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                setTimeout(function(){
                    var currSelection = window.getSelection();
                    var anchorOffset = currSelection.anchorNode;
                    if($("#luckysheet-search-formula-parm").is(":visible")||$("#luckysheet-search-formula-parm-select").is(":visible")){
                        $editor=$("#luckysheet-rich-text-editor");
                        luckysheet.formula.rangechangeindex = luckysheet.formula.data_parm_index;
                    }
                    else{
                        $editor = $(anchorOffset).closest("div");
                    }
                    var $span = $editor.find("span[rangeindex='" + luckysheet.formula.rangechangeindex + "']");

                    luckysheet.formula.setCaretPosition($span.get(0), 0, $span.html().length);
                }, 1);
                
                return;
            }
            else {
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheet_select_status = true;

                if($("#luckysheet-info").is(":visible")){
                    luckysheet_select_status = false;
                }
            }
        }
        else {
            luckysheet_select_status = true;
        }

        //条件格式 应用范围可选择多个单元格
        if($("#luckysheet-multiRange-dialog").is(":visible")){
            luckysheet.conditionformat.selectStatus = true;
            luckysheet_select_status = false;

            if(event.shiftKey){
                var last = luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1];

                var top = 0, height = 0, rowseleted = [];
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

                var left = 0, width = 0, columnseleted = [];
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

                var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
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

                luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1] = last;
            }
            else if(event.ctrlKey){
                luckysheet.conditionformat.selectRange.push({ 
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
                luckysheet.conditionformat.selectRange = [];
                luckysheet.conditionformat.selectRange.push({ 
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
            
            luckysheet.selectionCopyShow(luckysheet.conditionformat.selectRange);
            
            var range = luckysheet.conditionformat.getTxtByRange(luckysheet.conditionformat.selectRange);
            $("#luckysheet-multiRange-dialog input").val(range);
            
            return;
        }
        else{
            luckysheet.conditionformat.selectStatus = false;
            luckysheet.conditionformat.selectRange = [];
        }

        //条件格式 条件值只能选择单个单元格
        if($("#luckysheet-singleRange-dialog").is(":visible")){
            luckysheet_select_status = false;

            luckysheet.selectionCopyShow([{"row": [row_index, row_index], "column": [col_index, col_index]}]);

            var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": [row_index, row_index], "column": [col_index, col_index] }, luckysheet.currentSheetIndex);
            $("#luckysheet-singleRange-dialog input").val(range);

            return;
        }

        //if公式生成器
        if(luckysheet.ifFormulaGenerator.singleRangeFocus){
            $("#luckysheet-ifFormulaGenerator-dialog .singRange").click();
        }
        if($("#luckysheet-ifFormulaGenerator-singleRange-dialog").is(":visible")){
            //选择单个单元格
            luckysheet_select_status = false;
            luckysheet.formula.rangestart = false;

            $("#luckysheet-formula-functionrange-select").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1 }).show();
            $("#luckysheet-formula-help-c").hide();

            var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": [row_index, row_index], "column": [col_index, col_index] }, luckysheet.currentSheetIndex);
            $("#luckysheet-ifFormulaGenerator-singleRange-dialog input").val(range);

            return;
        }
        if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){
            //选择范围
            luckysheet_select_status = false;
            luckysheet.formula.func_selectedrange = { "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1, "left_move": col_pre, "width_move": col - col_pre - 1, "top_move": row_pre, "height_move": row - row_pre - 1, "row": [row_index, row_index], "column": [col_index, col_index], "row_focus": row_index, "column_focus": col_index };
            luckysheet.formula.rangestart = true;

            $("#luckysheet-formula-functionrange-select").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1 }).show();
            $("#luckysheet-formula-help-c").hide();

            var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": [row_index, row_index], "column": [col_index, col_index] }, luckysheet.currentSheetIndex);
            $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);

            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();
            return;
        }

        if (luckysheet_select_status) {
            if(event.shiftKey){
                //按住shift点击，选择范围
                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]); //选区最后一个

                var top = 0, height = 0, rowseleted = [];
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

                var left = 0, width = 0, columnseleted = [];
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

                var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
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

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                //交替颜色选择范围
                if($("#luckysheet-alternateformat-rangeDialog").is(":visible")){
                    $("#luckysheet-alternateformat-rangeDialog input").val(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save));
                }

                if (luckysheet.chartparam.luckysheet_chart_data_select_state) {
                    $("#luckysheet-datavisual-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                }

                if (luckysheet.pivotTable.luckysheet_pivotTable_select_state) {
                    $("#luckysheet-pivotTable-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                }
            }
            else if(event.ctrlKey){
                //选区添加
                luckysheet_select_save.push({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1, "left_move": col_pre, "width_move": col - col_pre - 1, "top_move": row_pre, "height_move": row - row_pre - 1, "row": [row_index, row_index_ed], "column": [col_index, col_index_ed], "row_focus": row_index, "column_focus": col_index });
            }
            else{
                luckysheet_select_save = [];
                luckysheet_select_save.push({ 
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
                luckysheet.menuButton.menuButtonFocus(luckysheet.flowdata, row_index, col_index);
                //函数公式显示栏
                luckysheet.formula.fucntionboxshow(row_index, col_index);
            }

            luckysheet.selectHightlightShow();

            if(luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null){
                luckysheetFreezen.scrollAdaptOfselect();    
            }

            if(!mobilecheck){ //非移动端聚焦输入框
                luckysheetactiveCell();
            }
            
            if(luckysheet.server.allowUpdate){
                //允许编辑后的后台更新时
                luckysheet.server.saveParam("mv", luckysheet.currentSheetIndex, luckysheet_select_save);
            }
        }

        clearTimeout(luckysheet.chartparam.luckysheet_chart_rangefocus_timeout);
        if (luckysheet.chartparam.luckysheet_chart_rangefocus) {
            luckysheet.chartparam.luckysheet_chart_rangefocus = false;
            $("#luckysheet-datavisual-range-button").click();
        }

        //交替颜色
        if(luckysheet.alternateformat.rangefocus){
            luckysheet.alternateformat.rangefocus = false;
            $("#luckysheet-alternateformat-range .fa-table").click();
        }

        $("#luckysheet-row-count-show, #luckysheet-column-count-show").hide();

        if(!luckysheet.isEditMode()){
            //chartMix 隐藏当前页的数据选择区域高亮
            !!window.store && store.commit("hideAllNeedRangeShow");  
        }
        
        $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));

        //数据透视表
        luckysheet.pivotTable.pivotclick(row_index, col_index, luckysheet.currentSheetIndex);

        $("#" + container).attr("tabindex", 0).focus();

        //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-sel").removeClass("luckysheet-cols-h-cell-sel").addClass("luckysheet-cols-h-cell-nosel");

        //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-sel").removeClass("luckysheet-rows-h-cell-sel").addClass("luckysheet-rows-h-cell-nosel");


        //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-nosel").eq(col_index).removeClass("luckysheet-cols-h-cell-nosel").addClass("luckysheet-cols-h-cell-sel");

        //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-nosel").eq(row_index).removeClass("luckysheet-rows-h-cell-nosel").addClass("luckysheet-rows-h-cell-sel");

        //event.stopImmediatePropagation();

    }).mouseup(function (event) {
        if (event.which == "3") {
            if(luckysheet.isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            var x = event.pageX;
            var y = event.pageY;
            var data = luckysheet.flowdata;

            var obj_s = luckysheet_select_save[0];

            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-add, #luckysheet-cols-rows-shift").hide();

            if (obj_s["row"] != null && obj_s["row"][0] == 0 && obj_s["row"][1] == luckysheet.flowdata.length - 1) {
                luckysheetRightHeadClickIs = "column";
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("宽");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

                $("#luckysheet-cols-rows-add").show();
                $("#luckysheet-cols-rows-data").show();
                $("#luckysheet-cols-rows-shift").hide();
                
                luckysheet_cols_menu_status = true;

                //列宽默认值
                var cfg = $.extend(true, {}, config);
                if(cfg["columlen"] == null){
                    cfg["columlen"] = {};
                }

                var first_collen = cfg["columlen"][luckysheet_select_save[0].column[0]] == null ? luckysheet.defaultcollen : cfg["columlen"][luckysheet_select_save[0].column[0]];
                var isSame = true;

                for(var i = 0; i < luckysheet_select_save.length; i++){
                    var s = luckysheet_select_save[i];
                    var c1 = s.column[0], c2 = s.column[1];

                    for(var c = c1; c <= c2; c++){
                        var collen = cfg["columlen"][c] == null ? luckysheet.defaultcollen : cfg["columlen"][c];

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
            else if (obj_s["column"] != null && obj_s["column"][0] == 0 && obj_s["column"][1] == luckysheet.flowdata[0].length - 1) {
                luckysheetRightHeadClickIs = "row";
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("行");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("高");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("上");
                $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("下");
                
                $("#luckysheet-cols-rows-add").show();
                $("#luckysheet-cols-rows-data").show();
                $("#luckysheet-cols-rows-shift").hide();

                luckysheet_cols_menu_status = true;

                //行高默认值
                var cfg = $.extend(true, {}, config);
                if(cfg["rowlen"] == null){
                    cfg["rowlen"] = {};
                }

                var first_rowlen = cfg["rowlen"][luckysheet_select_save[0].row[0]] == null ? luckysheet.defaultrowlen : cfg["rowlen"][luckysheet_select_save[0].row[0]];
                var isSame = true;

                for(var i = 0; i < luckysheet_select_save.length; i++){
                    var s = luckysheet_select_save[i];
                    var r1 = s.row[0], r2 = s.row[1];

                    for(var r = r1; r <= r2; r++){
                        var rowlen = cfg["rowlen"][r] == null ? luckysheet.defaultrowlen : cfg["rowlen"][r];

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

        var mouse = mouseposition(event.pageX, event.pageY);
        if (mouse[0] >= cellmainWidth - cellMainSrollBarSize || mouse[1] >= cellmainHeight - cellMainSrollBarSize) {
            return;
        }

        var scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

        //row_index = luckysheetFreezen.changeFreezenIndex(row_index, "h");
        //col_index = luckysheetFreezen.changeFreezenIndex(col_index, "v");

        if (luckysheet.pivotTable.isPivotRange(row_index, col_index)) {
            //数据透视表没有 任何数据
            if((luckysheet.pivotTable.filter == null || luckysheet.pivotTable.filter.length == 0) && (luckysheet.pivotTable.row == null || luckysheet.pivotTable.row.length == 0) && (luckysheet.pivotTable.column == null || luckysheet.pivotTable.column.length == 0) && (luckysheet.pivotTable.values == null || luckysheet.pivotTable.values.length == 0)){

                return;
            }

            //数据透视表没有 数值数据
            if(luckysheet.pivotTable.values == null || luckysheet.pivotTable.values.length == 0){
                return;
            }

            //点击位置不是 数值数据 所在区域
            if(row_index == 0 || col_index == 0){
                return;
            }

            if(luckysheet.pivotTable.column != null && luckysheet.pivotTable.column.length > 0){
                if(luckysheet.pivotTable.values.length >= 2 && luckysheet.pivotTable.showType == "column"){
                    if(row_index <= luckysheet.pivotTable.column.length || col_index >= luckysheet.pivotTable.pivotDatas[0].length - luckysheet.pivotTable.values.length){

                        return;
                    }
                }
                else{
                    if(row_index <= luckysheet.pivotTable.column.length - 1 || col_index >= luckysheet.pivotTable.pivotDatas[0].length - 1){

                        return;
                    }
                }
            }

            if(luckysheet.pivotTable.row != null && luckysheet.pivotTable.row.length > 0){
                if(luckysheet.pivotTable.values.length >= 2 && luckysheet.pivotTable.showType == "row"){
                    if(col_index <= luckysheet.pivotTable.row.length || row_index >= luckysheet.pivotTable.pivotDatas.length - luckysheet.pivotTable.values.length){

                        return;
                    }
                }
                else{
                    if(col_index <= luckysheet.pivotTable.row.length - 1 || row_index >= luckysheet.pivotTable.pivotDatas.length - 1){

                        return;
                    }
                }
            }

            luckysheet.sheetmanage.addNewSheet(event);

            luckysheet.pivotTable.drillDown(row_index, col_index);
            
            return;
        }

        var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, row_index, col_index);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];
            row_index = margeset.row[2];
            col = margeset.column[1];
            col_pre = margeset.column[0];
            col_index = margeset.column[2];
        }

        // $("#luckysheet-cell-selected").hide();

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
            if(luckysheet.menuButton.luckysheetPaintModelOn){
                luckysheet.menuButton.cancelPaintModel();
            }
            
            luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata);
        }

        //luckysheetCellUpdate = [row_index, col_index];
        //$("#luckysheet-rich-text-editor").focus().select();
        //$("#luckysheet-input-box").css({ "background-color": "rgb(255, 255, 255)", "padding": "0px 2px", "font-size": "13px", "max-width": winW - col_pre - 20 + scrollLeft, "max-height": winH - row_index - 20 + scrollTop, "min-width": col - col_pre + 1 - 8, "min-height": row - row_pre + 1 - 4, "left": left - 2, "top": top - 2, "right": "auto" }).show();
        //$("#luckysheet-rich-text-editor").text(d[row_index][col_index]);
        //luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
    });

    $("#luckysheet-bottom-add-row, #luckysheet-bottom-add-row-input, #luckysheet-bottom-return-top").on("mousedown dblclick mouseup",function(e){
        e.stopPropagation();
    });

    $("#luckysheet-bottom-add-row").on("click",function(e){
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        var $t = $(this), value = $("#luckysheet-bottom-add-row-input").val();
        
        if(value == ""){
            value = 100;
        }

        if (isNaN(parseInt(value))) {
            if(luckysheet.isEditMode()){
                alert("请输入数字");
            }
            else{
                luckysheet.tooltip.info("增加错误", "请输入数字");
            }
            return;
        }

        value = parseInt(value);
        if (value < 1 || value > 100) {
            if(luckysheet.isEditMode()){
                alert("增加范围限制在1-100");
            }
            else{
                luckysheet.tooltip.info("增加错误", "增加范围限制在1-100");
            }
            return;
        }

        //var st_index = luckysheet_select_save[luckysheetRightHeadClickIs][0];
        luckysheetextendtable("row", luckysheet.flowdata.length - 1, value);
    });

    $("#luckysheet-bottom-return-top").on("click",function(e){
        $("#luckysheet-scrollbar-y").scrollTop(0);
    });

    var luckysheetactiveCell = function () {
        if (!!fullscreenmode) {
            setTimeout(function () {
                $("#luckysheet-rich-text-editor").focus().select();
            }, 50);
        }
    }

    luckysheet.luckysheetactiveCell = luckysheetactiveCell;

    luckysheet.luckysheetupdateCell = function (row, row_pre, row_index, col, col_pre, col_index, d, cover, isnotfocus) {
        if(luckysheet.isEditMode()){//此模式下禁用单元格编辑
            return;
        }

        if($("#luckysheet-dropCell-icon").is(":visible")){
            $("#luckysheet-dropCell-icon").remove();
        }

        var winH = $(window).height(), winW = $(window).width();
        var container_offset = $("#" + container).offset();
        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        var scrollTop = $("#luckysheet-cell-main").scrollTop();

        if(luckysheetConfigsetting.pointEdit){
            var left = col_pre * luckysheetConfigsetting.pointEditZoom + container_offset.left + rowHeaderWidth * luckysheetConfigsetting.pointEditZoom - scrollLeft,
                top = row_pre * luckysheetConfigsetting.pointEditZoom + container_offset.top + (infobarHeight + toolbarHeight + calculatebarHeight + columeHeaderHeight) * luckysheetConfigsetting.pointEditZoom - scrollTop;
        }
        else{
            var left = col_pre + container_offset.left + rowHeaderWidth - scrollLeft,
                top = row_pre + container_offset.top + infobarHeight + toolbarHeight + calculatebarHeight + columeHeaderHeight - scrollTop;
        }

        if (luckysheet.pivotTable.isPivotRange(row_index, col_index)) {
            return;
        }

        luckysheetCellUpdate = [row_index, col_index];
        if (!isnotfocus) {
            $("#luckysheet-rich-text-editor").focus().select();
        }

        if(luckysheetConfigsetting.pointEdit){
            $("#luckysheet-input-box").removeAttr("style").css({ 
                "background-color": "rgb(255, 255, 255)", 
                "padding": "0px 2px", 
                "font-size": "13px", 
                "max-width": winW + scrollLeft - col_pre - 20 - rowHeaderWidth, 
                "max-height": winH + scrollTop - row_pre - 20 - 15 - toolbarHeight - infobarHeight - calculatebarHeight - sheetBarHeight - statisticBarHeight, 
                "min-width": col - col_pre + 1 - 8, 
                "min-height": row - row_pre + 1 - 4, 
                "left": left - 2 * luckysheetConfigsetting.pointEditZoom, 
                "top": top - 2 * luckysheetConfigsetting.pointEditZoom, 
                "right": "auto", 
                "overflow-y": "auto",
                "box-sizing": "initial",
                "transform-origin": "0 0",
                "transform": "scale("+ luckysheetConfigsetting.pointEditZoom +")",
                "z-index": 1000
            });
        }
        else{
            $("#luckysheet-input-box").removeAttr("style").css({ 
                "background-color": "rgb(255, 255, 255)", 
                "padding": "0px 2px", 
                "font-size": "13px", 
                "max-width": winW + scrollLeft - col_pre - 20 - rowHeaderWidth, 
                "max-height": winH + scrollTop - row_pre - 20 - 15 - toolbarHeight - infobarHeight - calculatebarHeight - sheetBarHeight - statisticBarHeight, 
                "min-width": col - col_pre + 1 - 8, 
                "min-height": row - row_pre + 1 - 4, 
                "left": left - 2, 
                "top": top - 2, 
                "right": "auto", 
                "overflow-y": "auto",
                "box-sizing": "initial"
            });
        }

        if(luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null){
            $("#luckysheet-input-box").css("z-index", 10002);
        }
        
        $("#luckysheet-input-box-index").html(luckysheet.luckysheetchatatABC(col_index) + (row_index + 1)).hide();
        $("#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm").addClass("luckysheet-wa-calculate-active");
        var value = "";
        
        if (d[row_index] != null && d[row_index][col_index] != null) {
            var cell = d[row_index][col_index];
            if (!cover) {
                if(cell.f!=null){
                    value = luckysheet.getcellvalue(row_index, col_index, d, "f");
                }
                else{
                    value = luckysheet.mask.valueShowEs(row_index, col_index, d);
                }
            }
            
            var style = luckysheet.menuButton.getStyleByCell(d, row_index, col_index);
            style = $("#luckysheet-input-box").get(0).style.cssText + style;

            $("#luckysheet-input-box").get(0).style.cssText = style;
            if($("#luckysheet-input-box").get(0).style.backgroundColor == "rgba(0, 0, 0, 0)"){
                $("#luckysheet-input-box").get(0).style.background = "rgb(255,255,255)";
            }
        }
        else{
            //交替颜色
            var af_compute = luckysheet.alternateformat.getComputeMap();
            var checksAF = luckysheet.alternateformat.checksAF(row_index, col_index, af_compute);

            //条件格式
            var cf_compute = luckysheet.conditionformat.getComputeMap();
            var checksCF = luckysheet.conditionformat.checksCF(row_index, col_index, cf_compute);

            if(checksCF != null && checksCF["cellColor"] != null){
                $("#luckysheet-input-box").get(0).style.background = checksCF["cellColor"];
            }
            else if(checksAF != null){
                $("#luckysheet-input-box").get(0).style.background = checksAF[1];
            }
        }
       
        if((value == null || value.toString() == "") && !cover){
            value = "<br/>";
        }

        $("#luckysheet-rich-text-editor").html(value);
        if (!isnotfocus) {
            luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
        }
        luckysheet.formula.rangetosheet = luckysheet.currentSheetIndex;
        luckysheet.formula.createRangeHightlight();
        luckysheet.formula.rangeResizeTo = $("#luckysheet-rich-text-editor");
        luckysheet.cleargridelement();
    }

    $("#luckysheet-input-box").click(function () {
        luckysheet.formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));
    }).add("#" + container).on("keydown", function (event) {
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("formulaInputFocus")) {
            return;
        }

        var ctrlKey = event.ctrlKey;
        var altKey = event.altKey;
        var shiftKey = event.shiftKey;
        var kcode = event.keyCode;
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("sp-input") || (parseInt($("#luckysheet-input-box").css("top")) > 0 && $(event.target).closest(".luckysheet-input-box").length > 0 && kcode != keycode.ENTER && kcode != keycode.TAB && kcode != keycode.UP && kcode != keycode.DOWN && kcode != keycode.LEFT && kcode != keycode.RIGHT)) {
            var anchor = $(window.getSelection().anchorNode);
            
            if(anchor.parent().is("#luckysheet-helpbox-cell") || anchor.is("#luckysheet-helpbox-cell")){
                if(kcode == keycode.ENTER){
                    var helpboxValue = $("#luckysheet-helpbox-cell").text();
                    if(luckysheet.formula.iscelldata(helpboxValue)){
                        var cellrange = luckysheet.formula.getcellrange(helpboxValue);
                        
                        luckysheet_select_save = [{ "row": cellrange["row"], "column": cellrange["column"], "row_focus": cellrange["row"][0], "column_focus": cellrange["column"][0] }];
                        luckysheet.selectHightlightShow();
                        
                        $("#luckysheet-helpbox-cell").blur();

                        var scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();
                        var winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

                        var row = visibledatarow[cellrange["row"][1]], row_pre = cellrange["row"][0] - 1 == -1 ? 0 : visibledatarow[cellrange["row"][0] - 1];
                        var col = visibledatacolumn[cellrange["column"][1]], col_pre = cellrange["column"][0] - 1 == -1 ? 0 : visibledatacolumn[cellrange["column"][0] - 1];

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
        
        var $inputbox = $("#luckysheet-input-box");
        if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && luckysheet.formula.searchFunctionCell != null) {
                luckysheet.formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else {
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheet_select_save = [{ "row": [luckysheetCellUpdate[0], luckysheetCellUpdate[0]], "column": [luckysheetCellUpdate[1], luckysheetCellUpdate[1]], "row_focus": luckysheetCellUpdate[0], "column_focus": luckysheetCellUpdate[1] }];
                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
                //$("#luckysheet-input-box").blur();
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

            // luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
            luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
            event.preventDefault();
        }
        else if(kcode == keycode.F2){
            if (parseInt($inputbox.css("top")) > 0) {
                return;
            }

            var last = luckysheet_select_save[luckysheet_select_save.length - 1];

            var row_index = last["row_focus"], col_index = last["column_focus"];
            var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
            var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];

            luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata);
            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.ESC && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.ENTER) {
            if($(event.target).hasClass("formulaInputFocus") || $("#luckysheet-conditionformat-dialog").is(":visible")){
                return;
            }
            else if (String.fromCharCode(kcode) != null && $("#luckysheet-cell-selected").is(":visible")) {
                var last = luckysheet_select_save[luckysheet_select_save.length - 1];

                var row_index = last["row_focus"], col_index = last["column_focus"];
                var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
                var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];

                var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, row_index, col_index);
                if(!!margeset){
                    row = margeset.row[1];
                    row_pre = margeset.row[0];
                    row_index = margeset.row[2];
                    col = margeset.column[1];
                    col_pre = margeset.column[0];
                    col_index = margeset.column[2];
                }

                luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata);
                event.preventDefault();
            }
        }
        else {

            if (ctrlKey || event.metaKey) {
                if (shiftKey) {
                    if (!luckysheet_shiftkeydown) {
                        luckysheet.luckysheet_shiftpositon = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);
                        luckysheet_shiftkeydown = true;
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
                    if(luckysheet.menuButton.luckysheetPaintModelOn){
                        luckysheet.menuButton.cancelPaintModel();
                    }
                    
                    if(luckysheet_select_save.length == 0){
                        return;
                    }

                    //复制范围内包含部分合并单元格，提示
                    if(config["merge"] != null){
                        var hasPartMC = false;

                        for(var s = 0; s < luckysheet_select_save.length; s++){
                            var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                            var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                            hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                            if(hasPartMC){
                                break;
                            }
                        }

                        if(hasPartMC){
                            if(luckysheet.isEditMode()){
                                alert("无法对部分合并单元格执行此操作");
                            }
                            else{
                                luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                            }
                            return;    
                        }
                    }

                    //多重选区 有条件格式时 提示
                    var cdformat = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].luckysheet_conditionformat_save;
                    if(luckysheet_select_save.length > 1 && cdformat != null && cdformat.length > 0){
                        var hasCF = false;

                        var cf_compute = luckysheet.conditionformat.getComputeMap();

                        label:
                        for(var s = 0; s < luckysheet_select_save.length; s++){
                            if(hasCF){
                                break;
                            }
                            
                            var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                            var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                            for(var r = r1; r <= r2; r++){
                                for(var c = c1; c <= c2; c++){
                                    if(luckysheet.conditionformat.checksCF(r, c, cf_compute) != null){
                                        hasCF = true;
                                        continue label;
                                    }
                                }
                            }
                        }

                        if(hasCF){
                            if(luckysheet.isEditMode()){
                                alert("无法对多重选择区域执行此操作");
                            }
                            else{
                                luckysheet.tooltip.info("无法对多重选择区域执行此操作", "");
                            }
                            return;
                        }
                    }

                    //多重选区 行不一样且列不一样时 提示
                    if(luckysheet_select_save.length > 1){ 
                        var isSameRow = true, str_r = luckysheet_select_save[0].row[0], end_r = luckysheet_select_save[0].row[1];
                        var isSameCol = true, str_c = luckysheet_select_save[0].column[0], end_c = luckysheet_select_save[0].column[1];
                        
                        for(var s = 1; s < luckysheet_select_save.length; s++){
                            if(luckysheet_select_save[s].row[0] != str_r || luckysheet_select_save[s].row[1] != end_r){
                                isSameRow = false;
                            }
                            if(luckysheet_select_save[s].column[0] != str_c || luckysheet_select_save[s].column[1] != end_c){
                                isSameCol = false;
                            }
                        }

                        if((!isSameRow && !isSameCol) || luckysheet.selectIsOverlap()){
                            if(luckysheet.isEditMode()){
                                alert("无法对多重选择区域执行此操作");
                            }
                            else{
                                luckysheet.tooltip.info("无法对多重选择区域执行此操作", ""); 
                            }
                            return;
                        }    
                    }

                    luckysheet.selection.copy(event);

                    luckysheet_paste_iscut = false;
                    luckysheetactiveCell();

                    event.stopPropagation();
                    return;
                }
                else if (kcode == 70) {//Ctrl + F  查找
                    luckysheet.searchReplace.createDialog(0);
                    luckysheet.searchReplace.init();

                    $("#luckysheet-search-replace #searchInput input").focus();
                }
                else if (kcode == 72) {//Ctrl + H  替换
                    luckysheet.searchReplace.createDialog(1);
                    luckysheet.searchReplace.init();

                    $("#luckysheet-search-replace #searchInput input").focus();
                }
                else if (kcode == 73) {//Ctrl + I  斜体
                    $("#luckysheet-icon-italic").click();
                }
                else if (kcode == 86) {//Ctrl + V  粘贴
                    if(luckysheet.isEditMode()){//此模式下禁用粘贴
                        return;
                    }

                    if($(event.target).hasClass("formulaInputFocus")){
                        return;
                    }

                    if(luckysheet_select_save.length > 1){
                        if(luckysheet.isEditMode()){
                            alert("无法在此处粘贴此内容，请选择粘贴区域的一个单元格，然后再次尝试粘贴");
                        }
                        else{
                            luckysheet.tooltip.info("无法在此处粘贴此内容，请选择粘贴区域的一个单元格，然后再次尝试粘贴", "");
                        }
                        return;
                    }

                    luckysheet.selection.isPasteAction = true;
                    luckysheetactiveCell();

                    event.stopPropagation();
                    return;
                }
                else if (kcode == 88) {//Ctrl + X  剪切
                    //复制时存在格式刷状态，取消格式刷
                    if(luckysheet.menuButton.luckysheetPaintModelOn){
                        luckysheet.menuButton.cancelPaintModel();
                    }

                    if(luckysheet_select_save.length == 0){
                        return;
                    }

                    //复制范围内包含部分合并单元格，提示
                    if(config["merge"] != null){
                        var hasPartMC = false;

                        for(var s = 0; s < luckysheet_select_save.length; s++){
                            var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                            var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                            hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                            if(hasPartMC){
                                break;
                            }
                        }

                        if(hasPartMC){
                            if(luckysheet.luckysheetConfigsetting.editMode){
                                alert("无法对合并单元格执行此操作");
                            }
                            else{
                                luckysheet.tooltip.info("无法对合并单元格执行此操作", ""); 
                            }
                            return;    
                        }
                    }

                    //多重选区时 提示
                    if(luckysheet_select_save.length > 1){
                        if(luckysheet.isEditMode()){
                            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                        }
                        else{
                            luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                        }
                        return;
                    }

                    luckysheet.selection.copy(event);

                    luckysheet_paste_iscut = true;
                    luckysheetactiveCell();
                    
                    event.stopPropagation();
                    return;
                }
                else if (kcode == 90) {//Ctrl + Z  撤销
                    luckysheet.controlHistory.redo(event);
                    luckysheetactiveCell();
                    event.stopPropagation();
                    return;
                }
                else if (kcode == 89) {//Ctrl + Y  重做
                    luckysheet.controlHistory.undo(event);
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
                    luckysheet.luckysheet_shiftpositon = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);
                    luckysheet_shiftkeydown = true;
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
                if(luckysheet.menuButton.luckysheetPaintModelOn){
                    luckysheet.menuButton.cancelPaintModel();
                }
                else{
                    luckysheet.cleargridelement(event);
                    event.preventDefault(); 
                }

                luckysheet.selectHightlightShow();
            }
            else if (kcode == keycode.DELETE) {
                if (luckysheet.chartparam.luckysheetCurrentChartActive && !luckysheet.isEditMode()) {
                    luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-controll-del").click();
                }
                else {
                    $("#luckysheet-delete-text").click();
                }

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
                    var last = luckysheet_select_save[luckysheet_select_save.length - 1];

                    var row_index = last["row_focus"], col_index = last["column_focus"];
                    var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
                    var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];
                    
                    var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, row_index, col_index);
                    if(!!margeset){
                        row = margeset.row[1];
                        row_pre = margeset.row[0];
                        row_index = margeset.row[2];
                        col = margeset.column[1];
                        col_pre = margeset.column[0];
                        col_index = margeset.column[2];
                    }

                    luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata, true);
                    if(kcode == 8){
                        $("#luckysheet-rich-text-editor").html("<br/>");
                    }
                    luckysheet.formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                }
            }
        }
        
        luckysheetactiveCell();

        event.stopPropagation();
    });

    

    var luckysheetRangeLast = function (obj) {
        var range;
        if(document.createRange){ //chrome, firefox, opera, safari, ie9+
            if(obj.innerHTML != obj.innerText || obj.innerHTML == ""){
                obj.focus(); //解决ff不获取焦点无法定位问题
                range = window.getSelection();//创建range
                range.selectAllChildren(obj);//range 选择obj下所有子内容
                range.collapseToEnd();//光标移至最后
            }
            else{
                var len = obj.innerText.length;

                range = document.createRange();
                range.selectNodeContents(obj);
                range.setStart(obj.childNodes[0], len);
                range.collapse(true);

                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);    
            }
        }
        else if(document.selection){ //ie8 and lower
            range = document.body.createTextRange();
            range.moveToElementText(obj);
            range.collapse(false);
            range.select();
        }

        // if (window.getSelection) {//ie11 10 9 ff safari
        //     obj.focus(); //解决ff不获取焦点无法定位问题
        //     var range = window.getSelection();//创建range
        //     range.selectAllChildren(obj);//range 选择obj下所有子内容
        //     range.collapseToEnd();//光标移至最后
        // }
        // else if (document.selection) {//ie10 9 8 7 6 5
        //     var range = document.selection.createRange();//创建选择对象
        //     //var range = document.body.createTextRange();
        //     range.moveToElementText(obj);//range定位到obj
        //     range.collapse(false);//光标移至最后
        //     range.select();
        // }
    }

    function getCursortPosition(textDom){
        var cursorPos = 0;
        if(document.selection){
            textDom.focus();
            var selectRange = document.selection.createRange();
            selectRange.moveStart("character", -textDom.value.length);
            cursorPos = selectRange.text.length;
        }
        else if(textDom.selectionStart || textDom.selectionStart == "0"){
            cursorPos = textDom.selectionStart;
        }
        return cursorPos;
    }

    luckysheet.luckysheetRangeLast = luckysheetRangeLast;

    $("#luckysheet-copy-btn, #luckysheet-cols-copy-btn, #luckysheet-paste-btn-title").click(function (event) {
        $(this).parent().hide();

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        //多重选区 有条件格式时 提示
        var cdformat = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].luckysheet_conditionformat_save;
        if(luckysheet_select_save.length > 1 && cdformat != null && cdformat.length > 0){
            var hasCF = false;

            var cf_compute = luckysheet.conditionformat.getComputeMap();

            label:
            for(var s = 0; s < luckysheet_select_save.length; s++){
                if(hasCF){
                    break;
                }
                
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                for(var r = r1; r <= r2; r++){
                    for(var c = c1; c <= c2; c++){
                        if(luckysheet.conditionformat.checksCF(r, c, cf_compute) != null){
                            hasCF = true;
                            continue label;
                        }
                    }
                }
            }

            if(hasCF){
                if(luckysheet.isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对多重选择区域执行此操作", "");
                }
                return;
            }
        }

        //多重选区 行不一样且列不一样时 提示       
        if(luckysheet_select_save.length > 1){
            var isSameRow = true, str_r = luckysheet_select_save[0].row[0], end_r = luckysheet_select_save[0].row[1];
            var isSameCol = true, str_c = luckysheet_select_save[0].column[0], end_c = luckysheet_select_save[0].column[1];
            
            for(var s = 1; s < luckysheet_select_save.length; s++){
                if(luckysheet_select_save[s].row[0] != str_r || luckysheet_select_save[s].row[1] != end_r){
                    isSameRow = false;
                }
                if(luckysheet_select_save[s].column[0] != str_c || luckysheet_select_save[s].column[1] != end_c){
                    isSameCol = false;
                }
            }

            if((!isSameRow && !isSameCol) || luckysheet.selectIsOverlap()){
                if(luckysheet.isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对多重选择区域执行此操作", "");  
                }
                return;
            }    
        }
        
        luckysheet.selection.copy(event);
    });

    $("#luckysheet-copy-paste, #luckysheet-cols-paste-btn, #luckysheet-paste-btn-title").click(function (event) {
        luckysheet.selection.paste(event, "btn");
        $(this).parent().hide();
    });

    $("#luckysheet-chart-btn-title").click(function () {
        $("#luckysheetdatavisual").click();
    });

    $("#luckysheet-pivot-btn-title").click(function (e) {
        luckysheet.pivotTable.createPivotTable(e);
    });

    $("#luckysheet-selectall-btn-title").click(function () {
        $("#luckysheet-left-top").trigger("mousedown");
        $(document).trigger("mouseup");
    });

    $("#luckysheet-download-btn-title").click(function () {
        if(luckysheet.isEditMode()){
            alert("正在下载！");
        }
        else{
            luckysheet.tooltip.info("正在下载！", ""); 
        }
    });

    //截图
    $("#luckysheet-chart-btn-screenshot").click(function () {
        if(luckysheet_select_save.length == 0){
            if(luckysheet.isEditMode()){
                alert("请框选需要截图的范围");
            }
            else{
                luckysheet.tooltip.info("提示！", "请框选需要截图的范围"); 
            }
            return;
        }

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("无法对多重选择区域执行此操作");
            }
            else{
                luckysheet.tooltip.info("提示！", "无法对多重选择区域执行此操作");  
            }

            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("提示！", "无法对合并单元格执行此操作");
                }
                return;    
            }
        }

        var st_r = luckysheet_select_save[0].row[0], ed_r = luckysheet_select_save[0].row[1];
        var st_c = luckysheet_select_save[0].column[0], ed_c = luckysheet_select_save[0].column[1];

        var shotData = luckysheet.datagridgrowth([], ed_r + 1, ed_c + 1);

        for(var r = st_r; r <= ed_r; r++){
            for(var c = st_c; c <= ed_c; c++){
                shotData[r][c] = luckysheet.flowdata[r][c];
            }
        }

        if(st_r - 1 < 0){
            var scrollHeight = 0;
            var rh_height = visibledatarow[ed_r];
        }
        else{
            var scrollHeight = visibledatarow[st_r - 1];
            var rh_height = visibledatarow[ed_r] - visibledatarow[st_r - 1];
        }

        if(st_c - 1 < 0){
            var scrollWidth = 0;
            var ch_width = visibledatacolumn[ed_c];
        }
        else{
            var scrollWidth = visibledatacolumn[st_c - 1];
            var ch_width = visibledatacolumn[ed_c] - visibledatacolumn[st_c - 1];
        }

        var newCanvas = $("<canvas>").attr({ width: Math.ceil(ch_width * devicePixelRatio), height: Math.ceil(rh_height * devicePixelRatio) }).css({ width: ch_width, height: rh_height });

        var d = luckysheet.flowdata;
        luckysheet.flowdata = shotData;

        luckysheetDrawMain(scrollWidth, scrollHeight, ch_width, rh_height, 1, 1, null, null, newCanvas);
        // luckysheetDrawMain(scrollWidth, scrollHeight, ch_width, rh_height, 0, 0, null, null, newCanvas);

        luckysheet.flowdata = d;
        luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据

        var image = new Image();
        var url = newCanvas.get(0).toDataURL("image/png");
        image.src = url;

        if(ch_width > rh_height){
            image.style.width = "100%";
        }
        else{
            image.style.height = "100%";
        }

        var maxHeight = $(window).height() - 200;
        luckysheet.tooltip.screenshot("截取成功！", '<div id="luckysheet-confirm-screenshot-save" style="height:'+ maxHeight +'px;overflow:auto;"></div>', url);
        $("#luckysheet-confirm-screenshot-save").append(image);
        newCanvas.remove();
        //newCanvas.appendTo("body");
    });
    $(document).on("click", "a.download", function(){ //截图下载
        var dataURI = $("#luckysheet-confirm-screenshot-save img").attr("src");

        var binStr = atob(dataURI.split(",")[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for(var i = 0; i < len; i++){
            arr[i] = binStr.charCodeAt(i);
        }

        var blob = new Blob([arr]);

        var element = document.createElement('a');
        element.setAttribute('href', URL.createObjectURL(blob));
        element.setAttribute('download', '截图.png');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        var clickHandler;
        element.addEventListener('click', clickHandler=function(){
            requestAnimationFrame(function(){
                URL.revokeObjectURL(element.href);
            });    

            element.removeAttribute('href');
            element.removeEventListener('click', clickHandler);
        })

        document.body.removeChild(element);
    })

    $("#luckysheet-share-btn-title").click(function () {
        var savedata = [];
        for (var i = 0; i < luckysheetfile.length; i++) {
            var charts = luckysheetfile[i].chart;
            if (charts == null) {
                continue;
            }
            for (var c = 0; c < charts.length; c++) {
                var chart = charts[c];
                var data = luckysheet.getdatabyselectionD(luckysheetfile[i].data, { "row": eval('(' + chart.row + ')'), "column": eval('(' + chart.column + ')') });
                savedata.push([chart.defaultOption, chart.selfOption, chart.chartType, chart.chartStyle, chart.chartMarkConfig, chart.chartTitleConfig, data]);
            }
        }

        luckysheet.tooltip.info("正在发布数据", '<div style="width:100%;text-align:center;position:relative;top:45%;font-size: 16px;"> <div class="luckysheetLoaderGif"> </div><span>渲染中...</span></div>');
        $.post("../Home/seth5js", { "text": JSON.stringify(savedata) }, function (data) {
            if (data == "0") {
                if(luckysheet.isEditMode()){
                    alert("发布数据失败, 请稍后再试！");
                }
                else{
                    luckysheet.tooltip.info("发布数据失败", '请稍后再试！');
                }
            }
            else {
                var img = '<img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAgAElEQVR4nO3df2wk91038PfaPt8P3+R+5JJLd5IrKTTZhOOg5DZP9unzUFq3txS1OiOsCKEsaKEV4gTxI6qni2DFH4/8qM+W53kk949FKUhLZQRIWGAkquIjBtRSuWQDBfUaljbJNUl3Q5pr4rtJfD7bO8Mf9m721jO7M975fma+6/dLihTvrec7M9/5fjzf3wnHcRwQEWlgJOoTICLyiwGLiLTBgEVE2mDAIiJtMGARkTYYsIhIGwxYRKQNBiwi0gYDFhFpgwGLiLTBgEVE2mDAIiJtMGARkTYYsIhIGwxYRKQNBiwi0gYDFhFpgwGLiLTBgEVE2mDAIiJtMGARkTYYsIhIGwxYRKSNMdUJnD17tu93rly5Eug4uVwOhUIhULpzc3OYnJz0/H61WkU+n2//vLS0BNM0e6ZRLpdRLpcBAIZhYGVlpef3Z2ZmsLy83P45nU6jUqn0/J1sNot6vd7+ud+9siwLmUym/XOlUkE6ne75O933ql8andft5/vdaVy6dAmXLl0KdE5B829lZQWGYfRMo/M6TNPE0tJSz+/n83lUq9X2z5OTk5ibm+v5O5lMBpZltX/ud6/q9Tqy2Wz7ZxX5VyqVMD8/7/v7bmm48XOug9LyDavzofHr2Wef7fnvnUEBAGq1Wt9jNhqN9v9blrXrGN26j9n5+278HLPbM8880zPNMOzl/g/6+/3yr/s6u++Dm877X6/Xbwss/b7vlmY3P8fs1n3MoPnvx6D5F6VYBKxsNuuZsZZl3fYXB9jO1M6/pt3cHqTOvyhuisXibT/PzMz0zNhSqYTFxcXbPpuenu6ZRvfD1+9hvHDhQt/z7FStVjEzM7PrPHtde+ebUkuvguh2X4Lmn9t59ku/X/6VSqW+59mpWCzuyj+3+90paP65PQ/d59nJ7b64nWenoPmXz+d3/XvQ/ItSLAJWvV73DED5fN71wfB6GGu1mmdh8Mp4r2M9+eSTnoXHrQB5vRFZluUZaIrFouvDYlmW6+eLi4uehffJJ590/dyrkCwuLro+8G4PdUtnlbZlL/nndhyg9x8jr/zz+twr/8rlsuvveN3zveSf19uV17PTOl83QfNvZmbGM//cnvW95F9UEo7jOCoT8FP37ZZKpQJVZdLpNBqNRqAbm06nA70aG4YR+PU+6HWkUikAwapxpmkGvu5areb7WkzTRDKZDHSvVOefYRhIpVKxzL+g1fhhyL8WiTasWAYsItIPG92JiDowYBGRNhiwiEgbytuwWroHQBKR/vwMuA2T2BvWwsJCuxeMiPSXSqWwsLAgmqbYG1ZLr15DP1MEiEhO3Mor27CISBviAYvVQiL9RVWOxQOWism4RCQrqnLMKiERaUMsYFmW1Xc1AyLSx/T0dOD5mYMSC1jT09OsDhINkVqtJv4SEosVR4lIT/V6vV3GOfmZiKgDAxYRaUN5wMrlchx7RTTEUqkUcrkcksmk8rTEpuZ07zjiJshQ/0QiMegpKeN1S4Oc86DZ4pWWqnMLkl7Qc1Nl0HMO415KC3qP+7VB+9n5KUzKG91bWhfFRnii4cC5hEREPYgHLNXdnkSkXlTlWDxg9ds8lIjiL6pyLNaG1aJy1VHpRltg8AbWoOfsN72gDcJBzkPVNUt2SoR1HmGkp4rKxv+oVg8WfcPi1Byi4RFFeRYLWL12ZCYi/fTaYVqVWG2kOug4rLhUCYNUNYa9ShiH4wYVh3schjCetyDll3MJiYg6MGARkTYYsIhIG8qHNczNzeHZZ5/F/Py86qR6kh5+4JeqrmfpuYRBzsPr94OcWxjnG8b8x0GFcdwo2m475XI5nD9/XmSRA9F9CRcXF1EsFj3/XWWju+TYoThPio1zwApyjCBUBay4BEKVnTy9Gt1nZ2cxNTUV6HiDEq0SSl8cEakTRXkWb8MyDEM6SSIaEtxIlYgCi2rys/hcwn6L+A2zMAZR+j2GdHuZysGSg7b9xKHtcNhEVY45rIGItCEasPbz2xXRsImiPCuvElarVdTr9Z7DGYhIP/l8HsD28AbTNJFKpZR3qu2byc9xGIcVhKo2rDhsQhEGle1SHIf1jrhNfhZvdKfbxaWgBylMgzZ4x2XxvahHiFNwbHQnIm0of8NaWlri4n1EQ2xubg6pVAqmaSpPS/kblmmamJycRKVS4Sh3oiFiGAYqlQomJydFghUgWCWU3iGWiNSSaGTvJtqGxWk5RMMjivIs3ktommYkWwTFoUcojC5sv71ucV/CJQhVQy7CSG9QcXgu9yKq5h3xXsKo9jMjovBYlhVJuhzWQETaEA1YUS+TTEThiaI8iwWsUqmEUqkklRwRKRZFmVbe6F4ul9FoNLC4uKg6KSISNj8/D8uykEwmcfHiReXjsUQClhQdF2rTcYMEye96UbkpiKpJyjo+n360XkbS6bTygMVGdyLShvKAxek4RMPPMAyRsq68SriysoJ6vY7p6enIxm4QkRqGYWBhYUFsLqHISHfTNNuBK5vNSiRJRIotLS2JBaoW0ak5YV6crlMauoWxMqh0Y3UQ0rvbxOG5iMM5SJAOVgAb3YlII9xIlYgCi6ociwesWq0mnSQRhSyqciwasNhLSDQ8oijPogGLcwmJhkcU5Vn5voQzMzOo1Wq+1sEKsi9hUHHYl1By2kgYC/gN856CQY/hRrpXM4peVD/7ErY2Uf30pz+t/9Sc5eVlLtpHNMTq9TqWl5fRaDSUp8VhDUSkDQYsItKG8pHu6XQajUaD1UKiIWWaJpLJpMjkZ+WN7p2KxWLPhfyCNLrHpSFV1dpJQdJzE8aUnyBU7poz6D1WtYOQyo4NldcXRK9G96mpKczOzipL241olbBQKEgmR0QKRVGeRQMW18YiGh5RlGfOJSSiwPbNXEJOzyGiveLOz0QUWFSTn0UX8FP9dhVGb4mqHiWvY0vvxhKX3W2GmXR+RNWjaFmWeDuWSMCyLAsXLlxgdZBoiGQyGRiGgcuXL4sFLuVVwmw2i0wmw2BFNIQsy0Imk0E2mxWpJioPWGyzIhp+9Xpd5KWEcwmJSBsMWESkDeWN7q35gf3mEarmdx5X0J6xQRdgCzqXbNB5btI9SqrSU3luqno2pedESpCeTyg2rGF2dhbJZBLlclkqSSJSqFAoIJfLiaYpuloD0Hv296CrNfS6FFVvWEGomq3vJoyll8MQ5zcIVfdCeqybSmGV17CwDYuItCEesLhiA5H+otimHhCemgOonZ4TtBolvdtMGFWCOOz+4/f3wzgHlecR5BiSDfFe5xDWscMQ1fhKVgmJSBtiAatarSKTyUglR0SKZTIZVKtV0TSVByzLsrC8vIx8Ps/5hERDxLIs5PN5LC8vi5Vt5cMa/Owc26JyEwq/pHdMVtWGFZfrcBP3NixV5xD3XZ7dBCm/lUoF6XR64DR7EW90D0sc1pYKeh6SAUB6958gQUjl/ZEMCmH8sYnLeCtdsNGdiLSh/A2rUqmgVquhVCqpToqIIlAoFJBKpUQ2phDZ+TmdTsMwDBSLRdXJkRC/VRmV44woetLzCbWdS+gmikIwaBtWHHZGDnKMsB+XzjTi3IalatBv3AeOxm0uobaN7iRL9UhvvnGRH+IBK51OKxtsFnS1hjCOHdeenyh2EAorre57Kj28QtXvq0ovyNppYeWp6uELXsR7CaPaz4yIwhNVOebOzxQ7juPE4i2VvEVVjkUDVpRLJJN+GLjiLYryLBawyuUyhzUQDZFisSi+5Lm2cwmDimuje1y6r3Uz7PdN1RCIoNfMuYQhicMk1718P+zf9xLntdT3aq95rmoieBhj3aS/qzvOJdzHdGsj0ulcSQ0GLNIKg9b+JraRaq1W4yJ+MaJzwXcchyPjY8AwDFQqFZFJzy1ib1ipVAqVSkUqOepB52DVMgzXoDvpYAUIN7qrvjjprdXDIL0y6DAVdL/XEue3sThMlN8r6WAFRNBLaJpmZFsEUfzYjoOXrQ389dVVvP72BlbXN3H84CjMiXGcu3sC504fxfgom1rjZt/sS5hMJhmw9rG/uHodf/L8KpZfXoXTtAEHMEaAT/34aXz43cdw7q4JTIyPRn2a1EcymYwkXfGAJb0tEL0jyurgtfUtPFV7E6V/fg0jdhMJx0HugZP42P3H8d+SR9G0Hbywuo6nr76J515/C6vrmxgFcPLQGN5/5jjO3WNgYlzbYYNDJ6pyzCeAlPufz7yGLzy/irVbWxizm/jJ5FH84oMn8dg9E/iH797Ab3/lJSw89z1sbNmA7cCxmxhxHIw4Nhzbwf9t2jgyCrz/zAnM//wjUV8ORUgsYM3MzGB5eVkqOeoi/Xb1J1dv4Hf++Xt45e0tHLSb+IUfOo5fTp3Ab3z5FXzllRv4h5dWMWY3AWcnSG3ZsB0bCcfBmN2EYzuwbQdwHBx0bPzS+TP4jQ+8V/QaqLezZ89icnISc3NzYmkqn0tYLpdRrVZ9vULGYV/CoKS3+dprz5hkwPrWjQ2c+8urgOMg4Tj4fOYefKVh4a9efBPrmzZG7O3/Rp3twOTYDuzmdjVxxHGQaG5/jp23rL/7lf+KB+86uufzUZUfKnt447IwpJ+5hK19Gy5evKi8MV7byc8MWP5/f9Asfu2WjW/e2MJz1hb+5j/W8craFlY3bKze2oTj2Gg6QMoYxZnDozh1cAR//OINbGw0cWp8BB++5zAWn38DiZ3gNdLcCVhwgFZg6qoG2ls2joyNYOqhu/GJR8/g4dPGQOfPgLV3nPxMsWdtOfj4167jxbeb2MB2QIHjoGnbWN+yAceB49jYbDbRtB3YjoN/uraBrzsORne+O9Zs4sbaFhafv4kRe7s3cMS2MWY3kdhpm2pVA4+OJfBL70visfuO47H7jsM4yMeS3PHJoLYN28EfvXILv3f1Jl67ZW8HK2f7L7tt29jYCUZwbMCx28EKO1W5VrBqVe1avYHG2AiOHxjBOBz8gHEYx8ZH8a6JcbzfvAM/dPIwzhw7xLFW5IvYXMJsNsvxVzE39TULtbe20ASwge3YhI5gZdvbb1ZwbGzaDh6/7wgevmMcZ46M4r4jo9hoOnh1bQtff30NX3ju9XY18NjYCL78+EM4xjenoWOaJpaWlsTSE9uX0LIs5PP5novX69iG5UblQmsq2jY+/52b+Oy317G5s9xMqxro7FQDb23ZGIWDx+89jM+fP+nrmI/86Tdx9frGTjVwC7mH78LvfvA9A53nXoWxf2AY4rqHZS+92rBa84MNY7A2xiDE3sMNw8DCwoJUcuTTX756C5/99jrsdrBCuxrYtG1sNB3cf2QEl3/ilO9gtWU77WA1Ym8PVfiRUxNKr4PkLSwsiAYrgG1Y+9oLbzVR/Lc12A46qoHb1bhWsHIcB3/7gbtx6qC/6TL/em0Nha9+tx2sRmDjA/fegZ97+C6l10L7g3jASqVS3JswJv73t9bw9hbQhPPO6qOtN62dYDUKx1ew+uqrb+GpK6/ji1dX4TjA2E6wGoWDP/xYio3qQyaKlRqACAIWg1V8LF/bhO042MRO24Ztt9+sbNtGwrHxgHF7sPr9b6/iu29t4sUbG/jSS9exsWVjxG62hy4chIPzdx3BUxfuR/LowWgujJSLqhyzSriPbQcrp90b2A5WO0MXHMfGv642b/udn7nvKL7+xjpOHxrFyTFgbbMJYyyBcycP473HD+LcqSMwuNoCKSIWsFq9hFEZtNdFeusuCZ3BCh3VwNZYq03bQdN28OmvX8Nv/fAJHB8fxalDY/hI8ig+EmB1kX/87ipeevMm0uYx3H/yiJJrad1zVbMJVPXwBhHGyPowTU9Pi/cSig1r8DMOS+WwBt0ClsSwhnu+9PptvYGOvT3Gyna2hzK0BoWO2k2M2tsj3A80bRw/kMBd4wnceWBku5G+6eDaW+tY39zC6voWbNtB7VfSOPt7X4PdbOIT70vi46m78ei9x/d0nn70ClhxeVakt14L41npNzVHehyW8jesIHORSNZtwWrnrcreebNqBauE806wSjhAwnFgrW/hrZsOvmPbGGluz/87lLAxPpLAe44dwrm7J3Di8AFc+dXHAAAnDh9wTf/VGzfx9L+/hofvuQOP3OdvyATFS71eb5dxziUkpZrN7RHsrWqg3VEN3A5QNkZ2qoyJnZ6/wwkb5Q+ewYPHD+HQaAITB0aQAGAcGL1tpdAX3ljD899fw8urN/HJ9H270m5cv4nH/v/TeHtjE0+cfzcDFvnCgLWPzaeP4/GV77ffrNa37Pab1qht31YNTOzMDdy0bXzy6asYaToYc7baE6O/8YlH8Jmvfgef/6c6Rh0bP376KH70tIH0vccAAOtbTTz78ps4f98JPPyZL6HZdPD3v/5BvOfU3peNof1HecC6dOmS7/WwgpBuq5Buwwjzu17n89F7DuGT9x/BUy/cwKb9TrUw4di7qoGticxwnHY18GPvOQHjwAiOHhjFnYcPYPaDP4hL5+/FCIB7jIOwHQcvfP9t/Nqf/wue/tb3cGNtA43/9TFUP/URHBwbxVEFcwsHXcIl6DFUCeN5kzrn1npYEuu8iwQsgCuORimRSHg+vP/n3HE0bm7iz15+ux2suquBrWCV6AhWI7DxBx994LZjXV/fxGvWOmrX1vAX33gVz/3Hdbzx9i0kbBuHRoGffug0AODOCY7PGhZDt+Jot16N8EF6Cd30+qskuYed9KRaP/xcf3LhBbxxc3NXNXDEtnHq4BgeOj6OxvU13FjfwvpmE81NG5l7DfzZ9I/A/Ozf4UAigdMTB/DAnRN44seSeOTeYzg1cRAvv7mGv//29/DFb9bxmx95GO+790To17eXvI9Dr10YVBZhleV1L9iGtU/0estqufLxH8DvfuP7+P1/fwMbW7dXA2cfS+LxB+8EsD25eaNpAwAOjW1PufnW//jvSCQSOHJgu+H9+vomvvriNXz5hWv4wjMvYqvpYHwsgffeFf6YHV3GvdHgxANWOp3mVl8xdfLgKD5z/m586uxJfPyLL6D2xhYSjoPRpoNff/pFPPUvDfzUu4/h+MEx3DE+ihEACThIAHhjbQOHRkfwE/efxLtPHMEj/28Za7e2AMfBhx84jY8+9C589OF3KWm3Inmqhy94EX96Go2GdJK0w89bFgCcOjSGlZ99sP2z7Ti4traJq9fXsfLKdby0ehOrNzexvrG5vfio4+DMHQfx3jsn2gHp+d/+KWXX0YlvV9GIqhyLB6ywVh2Nw6YAe0nTr0HbXcI8r5FEAndPjOPuiXH8l+QdoR03DCru/6DtnUHOSWXbmMq2rahWDxZd84MrNRANjyjKs1jAqtVqkU5+JqJw9VvyXAXOJSSiPbEsC9PT0+2fJeYSchlIItIGAxYRaWNfD4oJYz6i9KJsqo4xLCTnfAa973GYj6j7s6L8DWtubg65XE51MkQUkVwuh0qlIrIxhehcwsXFRRSLRc9/H3TF0TjP9/KicuzYfhTnNyxVVM6J7NVpNjs7i6mpqUDHG5RoG5b0xRGROlGUZ/FGd+mdYokofFGV40g2UlU1+TmKpWFUVQuiTi8u1Z0whJGnbt8NmkfS1XmVx943G6lypQY9dBauYQpeFI6oyjHHYVFfXBGB4kI0YC0uLkomRyFKJBIMXHSbKMqz8mEN1WoVtVoNpVKp73dVbqTqF9uw9iYu7TaqlgxSNVwi7svL+JkLXCgUkEqlkEqllDfGKw9YQSY/M2DFLz2/GLD2lt4wBKwWbqTaQ9CHatCeHy/SU3PiMKhx0GOHsR1bGOnFIfiHETTj8sdCAhvdiUgbygPWysqK6L5lRCRrbm4OKysrIhtTKA9YhmFgcnISlUqFo9yJhohhGKhUKpicnBQr22JVwnQ6jUqlIpUcESkm0cjeTbTRPczh/EEbFAdtgFTVo6SqAVplQ/OgPWYqz03V9Uk3gqucZhaWKKbniDe6m6YpnSQRhSyq5h3xgBXVfmZEFB7LsiJJl8MaiEgbogFrfn5eMjkiUqhcLounKdboXiwWOfmZaIiUy2U0Gg3Mzs6Kpak8YLUuKupgJTk/TCW/PU1x39EliDisEhGHxfe87oPKNd37aZXrZDKJixcvKu9UEwlYRDS8WkErnU4rD1hsdCcibSgPWBx3RTT8TNMUGZulvEq4tLQEy7Jw4cKFyMZuEJEahmHg8uXLYgNJRXoJDcPAysoKLMtCJpORSJKIFFtZWREf8S46l1CH1RrisuLooFT2rKmaHyg9f046T1X1VEclivLMRnci0oZ4wIpqA0YiCk9U5Vg8YNVqNekkiShkUZVj0YDFXkKi4RFFeRYNWH72JlSltRFo539+v9erYdTr+0GOMSi3tBzHCfSfmzC+G8a5+T2HIPdnL7sjqfhP5TmoFkV5Vr4vYT6fR6PR8LUO1qD7EgZdcVSa5LZSYWwfJrl6ZxjH9Tp2GKu6xuH5CUpqX0LTNJFMJtsbqqqkfFhDtVpVnQQRRaher6Ner4tUETmsgYi0wYBFRNpQXiWcnJxErVYLfS13Hdd7khzJLT3yvFdj/CDH9TqGyh12/J6fdFtcXJmmiVQqhWQyqTwt5Y3unfqtOhqk0V1HqgJWHBYiVDkFZ9BHNIztuIL8fhBxD1i9Gt2npqZEVxsFhKuEhUJBMjkiUiiK8iwasHSY/ExE/uyLyc+cS0ikv30zl5DTc4j0F1U5Fl0PCwhv5+c4jzwOo8csSIOwdM+fZAO9V3px2cUoyDkMmk9hXHNYjflR7eAu+obFbeqJhkcU5VkkYNXrdWQyGWSzWYnkiEhANptFJpMRDVzKq4SZTIbtVkRDyrKs9ovIwsKC8sZ45W9YDFZE+wMnPxMRdRDvJVQpiukM0r1Sg15jkJ4mVWtOSeeTdI+iynmOqtLThfI3rCtXruDKlSvI5XKqkyIiYblcrl3G0+m08vTEqoSFQoFzCYmGSBRlWrQNi29ZRMMjivLMRnci0oZ4o7thGJEMdZCeTjLoOcRhnSRVDb/SHRWq1sPS8TrCen5M0wzlOEFx8jMRBbYv5hISEQ1CLGBVq1VkMhmp5IhIsUwmI76Nn/KAVa/Xsby8jHw+z+og0RCxLAv5fB7Ly8tiVUTlm1D42Tm2Jc47P4fRsCm5a05QKhto/aQVlMq1oeKwplYc1k4DgpXfSqWifPDoUE3N0VFctpQfVFyCUJDjhvX9bmFMadJt0UIpbHQnIm0of8OqVCqo1+soFouqkyKiCMzOzrY3U1VNecBKp9Ptem2pVGLDO9GQMAwDhUIBU1NTYmmK7vwM9G7E24+N7nFpw5Lc3MJLXO7xoKSX5VG5tE9Y5TUsbHSPmPQOK0GEcW6DNjQHTU+VIPdYei2r/dQYL97oLrFmDhGpFVU5Fg9Y0iNjiSh8tVotknQ5rIGIAouq80w0YC0uLkomR0QKRVGexQJWuVzmWCyiIVIsFlEul0XT3DdzCVVRNRxg0J4fHeczeonDsAbpXYHiMgQmbnMJ2YZFRNpgwCIibTBgEZE2lI90b7VL1Wo1zMzMRLYWNBGFyzRNzM3NiUx6bhF7w0qlUpibm5NKjogUkw5WgPBcQtUXN4xzp/xQtTqllzjMXZTeMi2MOZGDnkPcnm/pYAVE0IYV1X5mRBSefbMvYTKZlE6SiEIWVTnm5GciCiyqcsxhDUSkDbFG93w+H2pUjsOibmFQtaOL9E4xYZBe+G5QKs8hDtfXz9mzZ5FOp1GpVMTSVD6XsFQqoVqt+lo/J4olV4nIm5+5hKlUCul0Gk888YTyxnjlb1jz8/OqkyCiCNVqNdRqNXzoQx9SHrDYhkVE2mDAIiJtiM0lzGaznEdINGRM08TS0pJYemJvWAsLC5EM5SciNVKpFBYWFkTT1HYjVSJSL27llW1YRKQN8YDFaiGR/qIqx+IBK6oNGIkoPNxIlYioD7FGd8uykM/n+YZFNCRSqRQqlQoMwxBLUyxgcRwW0fCRHocVq41UiUhf3EiViKgDAxYRaYMBi4i0EcuAFXRQWjqdDrQOj2EYgevae1nnJ+h1pFKpwOkE7aFJp9OBfsc0zcD3ivnn317yLwiJ/JMkui9hL14TKaenpz2HQrjNZeq1w/Ts7CympqZ2fV6tVpHP53d9bhgGKpXKrgycn59HqVRyPaelpSXXh7ZYLGJxcXHX51NTUygUCrseXMuykMlkXNO4dOkSLl26tOvzTCYDy7Jcf8ftXi0uLqJYLO763Ou6Ae9OlDDzL5/Pu16HV/4FvY5e+beysuKaF6VSKVD+1et1ZLNZ1zQKhQJyudyuz73yzzAMrKys7Prc67p77cgcZv5FIRZvWKZpeq4LXalUXAOA11+NXjtMuz3svY71uc99zjXTc7mc6wNnGIbnX9jZ2VnPz93+yhqG4fr51NSUa7BqnW+QtL2O5RWsAGBycnLXZ3vJP7fjAO+M7fE63yCf98o/t9/xuueGYQTOP9M0XT/3enZa5+umUCi4fu6Vf712ZHZ71veSf1GJRcBaWlryfDU2DGPXOI9eD3Xr37t5PSQt3Q/k3Nxcz1fpQqGw66Hvt9RGd8b3exAuX77c9zw7pdPpXcHa7Tw7uT3wvaoEbvclaP65nWe/9PvlX3eh7pd/bm9rbve7U9D8c3sevIIP4H5fvN4qW4Lmn9sfo6D5F6VYBKyg9jLW4/z58z3/vfvh81OP79xMstfbldcx+21G6eeY3R599NGeaYZh0LE2KvKv+zq774Obzvvv9Ubk9X23NLv5OWa37mOqeLtRPVZKJeUDR/1s7eXnBnYeJ5lM9s3I7nRTqVTPh8eyrNvq6n7OqV6vo9FoANgOLv0e4M7v+/2dWq12W7tG0HvV77q7v+8nje7r2C/5150Xfq5jGPPPi59zHZT4An5ERHulZZWQiPYnBiwi0gYDFhFpgwGLiLTBgEVE2mDAIiJtMGARkTYYsIhIGwxYRKQNBiwi0gYDFhFpgwGLiLTBgEVE2mDAIiJtMGARkTYYsIhIGwxYRKQNBiwi0gYDFgsBXbcAAAAcSURBVBFpgwGLiLTBgEVE2mDAIiJtMGARkTb+E290dzfWDONJAAAAAElFTkSuQmCC" />';

                luckysheet.tooltip.info("发布成功！请扫二维码", img);
                
            }
        });
    });
    
    //分列
    $("#luckysheet-splitColumn-btn-title").click(function(){
        if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
            return;
        }

        if(luckysheet_select_save.length > 1){
            luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            return;
        }

        if(luckysheet_select_save[0].column[0] != luckysheet_select_save[0].column[1]){
            luckysheet.tooltip.info("一次只能转换一列数据，选定区域可以有多行，但不能有多列，请在选定单列区域以后再试", "");
            return;   
        }

        luckysheet.splitColumn.createDialog();
        luckysheet.splitColumn.init();
    });

    $("#luckysheet-freezen-btn-horizontal").click(function () {
        if($.trim($(this).text())=="取消冻结"){
            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheet.luckysheetrefreshgrid();
            }

            if (luckysheetFreezen.freezenhorizontaldata != null) {
                luckysheetFreezen.cancelFreezenHorizontal();
                luckysheetFreezen.createAssistCanvas();
                luckysheet.luckysheetrefreshgrid();
            }

            luckysheetFreezen.scrollAdapt();
        }
        else{
            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheet.luckysheetrefreshgrid();
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
            luckysheet.luckysheetrefreshgrid();
        }
        else {
            luckysheetFreezen.createFreezenVertical();
        }
        luckysheetFreezen.createAssistCanvas();
    });


    var submenuhide = null, rightclickmenu = null;
    $(".luckysheet-cols-menu .luckysheet-cols-submenu").hover(
        function () {
            var $t = $(this), attrid = $t.attr("id"), $attr = $("#" + attrid + "_sub"), $con = $t.parent();
            var winW = $(window).width(), winH = $(window).height();
            var menuW = $con.width(), attrH = $attr.height() + 25, attrW = $attr.width() + 5;
            var offset = $t.offset();
            var top = offset.top, left = offset.left + menuW;

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
            var $t = $(this), attrid = $t.attr("id"), $attr = $("#" + attrid + "_sub");
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

    var copychange = function () {
        if (document.hidden || document.webkitHidden || document.msHidden) {
            iscopyself = false;
        }
    }

    $("#luckysheet-modal-dialog-mask").on("click dbclick mousedown mousemove mouseup", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    //$("#" + container).mouseover(function () {
    //    luckysheet.luckysheetactiveCell();
    //});

    $(document).on("visibilitychange webkitvisibilitychange msvisibilitychange", copychange).mouseleave(function () {
        iscopyself = false;
    }).mousedown(function (event) {
        //有批注在编辑时
        luckysheet.postil.removeActivePs();

        //luckysheet.luckysheetactiveCell();
        if (!$(event.target).hasClass("luckysheet-mousedown-cancel") && $(event.target).filter("[class*='sp-palette']").length == 0 && $(event.target).filter("[class*='sp-thumb']").length == 0 && $(event.target).filter("[class*='sp-']").length == 0) {
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu").hide();
            $("body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu").hide();
            //$("body > luckysheet-menuButton").hide();
            luckysheet_cols_menu_status = false;
        }

        //点击功能栏时 如果是单元格编辑模式 则退出编辑模式 
        if($(event.target).closest("#luckysheet-wa-editor").length > 0 && parseInt($("#luckysheet-input-box").css("top")) > 0){
            luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
    });

    $("#" + container).add("#luckysheet-input-box").keydown(function (event) {
        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("formulaInputFocus")) {
            return;
        }

        var ctrlKey = event.ctrlKey;
        var altKey = event.altKey;
        var shiftKey = event.shiftKey;
        var kcode = event.keyCode;
        //luckysheet.formula.rangeHightlightselected();
        var $inputbox = $("#luckysheet-input-box");
        if (kcode == keycode.ESC && parseInt($("#luckysheet-input-box").css("top")) > 0) {
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && luckysheet.formula.searchFunctionCell != null) {
                luckysheet.formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
                event.preventDefault();
            }
        }
        else if(kcode == keycode.TAB && parseInt($inputbox.css("top")) > 0){
            if ($("#luckysheet-formula-search-c").is(":visible") && luckysheet.formula.searchFunctionCell != null) {
                luckysheet.formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else{
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
            }

            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.UP && parseInt($inputbox.css("top")) > 0) {
            if($("#luckysheet-formula-search-c").is(":visible")){
                var $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").prev();
                if ($up.length == 0) {
                    $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").last();
                }

                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $up.addClass("luckysheet-formula-search-item-active");

                event.preventDefault();
            }
            else if(ctrlKey && shiftKey){ 
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange2("up", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange2("up", "rangeOfFormula");
                    }

                    event.preventDefault();
                }
            }
            else if(ctrlKey){ 
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell2("up", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell2("up", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(shiftKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange("down", -1, "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange("down", -1, "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else{
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell("down", -1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell("down", -1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
                else{
                    var anchor = $(window.getSelection().anchorNode);
                    var anchorOffset = window.getSelection().anchorOffset;

                    if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                }
            }
        }
        else if (kcode == keycode.DOWN && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")) {
                var $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").next();
                if ($up.length == 0) {
                    $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").first();
                }

                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $up.addClass("luckysheet-formula-search-item-active");

                event.preventDefault();
            }
            else if(ctrlKey && shiftKey){ //ctrl + shift + up 调整公式选区
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange2("down", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange2("down", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(ctrlKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell2("down", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell2("down", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(shiftKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange("down", 1, "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange("down", 1, "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else{
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell("down", 1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell("down", 1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
                else{
                    var anchor = $(window.getSelection().anchorNode);
                    var anchorOffset = window.getSelection().anchorOffset;

                    if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                }
            }
        }
        else if (kcode == keycode.LEFT && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")){
                event.preventDefault();
            }
            else if(ctrlKey && shiftKey){ //ctrl + shift + up 调整公式选区
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange2("left", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange2("left", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(ctrlKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell2("left", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell2("left", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(shiftKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange("right", -1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange("right", -1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
            }
            else{
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell("right", -1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell("right", -1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
                else{
                    var anchor = $(window.getSelection().anchorNode);
                    var anchorOffset = window.getSelection().anchorOffset;

                    if(anchor.parent().is("span") && anchor.parent().prev().length == 0 && anchorOffset == 0){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.is("#luckysheet-rich-text-editor") && anchorOffset == 1){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchorOffset == 0){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                        event.preventDefault();
                    }
                }
            }
        }
        else if (kcode == keycode.RIGHT && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")){
                event.preventDefault();
            }
            else if(ctrlKey && shiftKey){ //ctrl + shift + up 调整公式选区
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange2("right", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange2("right", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(ctrlKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell2("right", "rangeOfFormula");
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell2("right", "rangeOfFormula");
                    }
                }

                event.preventDefault();
            }
            else if(shiftKey){
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightRange("right", 1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightRange("right", 1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
            }
            else{
                if($("#luckysheet-formula-functionrange-select").is(":visible")){
                    luckysheetMoveHighlightCell("right", 1, "rangeOfFormula");

                    event.preventDefault();
                }
                else if(luckysheet.formula.israngeseleciton()){
                    var anchor = $(window.getSelection().anchorNode);
                    if(anchor.parent().next().text() == null || anchor.parent().next().text() == ""){
                        var vText = $("#luckysheet-input-box #luckysheet-input-box-index").text();
                        var range = luckysheet.formula.getcellrange(vText);

                        if(range == null){
                            range = luckysheet.formula.getcellrange($("#luckysheet-input-box-index").text());
                        }

                        var r1 = range["row"][0], r2 = range["row"][1];
                        var c1 = range["column"][0], c2 = range["column"][1];

                        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
                        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                        luckysheet.formula.func_selectedrange = {
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

                        luckysheet.formula.rangeSetValue({ "row": [r1, r2], "column": [c1, c2] });

                        luckysheet.formula.rangestart = true;
                        luckysheet.formula.rangedrag_column_start = false;
                        luckysheet.formula.rangedrag_row_start = false;

                        luckysheetMoveHighlightCell("right", 1, "rangeOfFormula");

                        event.preventDefault();
                    }
                }
                else{
                    var anchor = $(window.getSelection().anchorNode);
                    var anchorOffset = window.getSelection().anchorOffset;

                    if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                    else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                        luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                        event.preventDefault();
                    }
                }
            }
        }
        else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || (event.ctrlKey && kcode == 86)) {
            luckysheet.formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
        }
    }).keyup(function (e) {
        var kcode = e.keyCode;
        if (!e.shiftKey && kcode == 16) {
            luckysheet_shiftkeydown = false;
            luckysheet.luckysheet_shiftpositon = null;
        }

        //输入框中文输入后 shift 和 空格 处理
        if(parseInt($("#luckysheet-input-box").css("top")) > 0 && (kcode == 13 || kcode == 16 || kcode == 32)){
            luckysheet.formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
        }

        e.preventDefault();
    });

    $(document).mousemove(function (event) {
        luckysheet.postil.overshow(event); //有批注显示

        clearInterval(jfautoscrollTimeout);
        if(luckysheet.formula.functionResizeStatus){
            var y = event.pageY;
            var movepx = y - luckysheet.formula.functionResizeData.y;
            var mpx = luckysheet.formula.functionResizeData.calculatebarHeight + movepx;
            var winh = Math.round($(window).height()/2);
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
            calculatebarHeight = mpx;
            $("#luckysheet-wa-calculate").css("height", calculatebarHeight - 2);
            $("#luckysheet-wa-calculate-size").css({"background":"#5e5e5e", "cursor":"ns-resize"});
            clearTimeout(luckysheet.formula.functionResizeTimeout);
            luckysheet.formula.functionResizeTimeout = setTimeout(function(){
                luckysheet.luckysheetsizeauto();
            }, 15);
        }
        else if (!!luckysheetFreezen.horizontalmovestate) {
            var mouse = mouseposition(event.pageX, event.pageY);
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var x = mouse[0] + scrollLeft;
            var y = mouse[1] + scrollTop;

            var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
            var top = mouse[1] + columeHeaderHeight;

            if (top < columeHeaderHeight) {
                top = columeHeaderHeight;
            }

            if (top > luckysheetFreezen.windowHeight - 4) {
                top = luckysheetFreezen.windowHeight - 4;
            }

            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css({ "top": top });

            if (top + scrollTop - columeHeaderHeight >= row_pre + (row - row_pre) / 2) {
                top = row - 2 - scrollTop + columeHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [row, row_index + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_index + 1), top];
            }
            else {
                top = row_pre - 2 - scrollTop + columeHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [row_pre, row_index, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_index), top];
            }

            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-drop").css({ "top": top });
            luckysheetFreezen.saveFreezen(luckysheetFreezen.freezenhorizontaldata, top, null, null);
        }
        else if (!!luckysheetFreezen.verticalmovestate) {
            var mouse = mouseposition(event.pageX, event.pageY);
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var x = mouse[0] + scrollLeft;
            var y = mouse[1] + scrollTop;

            var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

            var left = mouse[0] + rowHeaderWidth;

            if (left < rowHeaderWidth) {
                left = rowHeaderWidth;
            }

            if (left > luckysheetFreezen.windowWidth - 4) {
                left = luckysheetFreezen.windowWidth - 4;
            }

            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css({ "left": left });

            if (left + scrollLeft - rowHeaderWidth >= col_pre + (col - col_pre) / 2) {
                left = col - 2 - scrollLeft + rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [col, col_index + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_index + 1), left];
            }
            else {
                left = col_pre - 2 - scrollLeft + rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [col_pre, col_index, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_index), left];
            }

            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-drop").css({ "left": left });
            luckysheetFreezen.saveFreezen(null, null, luckysheetFreezen.freezenverticaldata, left);
            luckysheet.luckysheetsizeauto();//调节选区时下部单元格溢出
        }
        else if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
            var x = event.pageX, y = event.pageY;
            $("#luckysheet-modal-dialog-slider-pivot-move").css({ "left": x - luckysheet.pivotTable.movesave.width / 2, "top": y - luckysheet.pivotTable.movesave.height });
        }
        else if (!!luckysheet.chartparam.luckysheet_chart_point_config && luckysheet.chartparam.luckysheet_chart_point_config.movestart) {
            var x = event.pageX, y = event.pageY, $container = luckysheet.chartparam.luckysheet_chart_point_config.container;
            var curleft = x - $container.offset().left + $container.scrollLeft();
            var curtop = y - $container.offset().top + $container.scrollTop();
            //var $cur = $(event.target), $item = $(event.target).closest(".luckysheet-chart-point-searchitem");
            //$item.addClass("luckysheet-chart-point-searchitem-active");
            var top = 0, height = 0;
            if (luckysheet.chartparam.luckysheet_chart_point_config.top > curtop) {
                top = curtop;
                height = luckysheet.chartparam.luckysheet_chart_point_config.top - curtop;
            }
            else if (luckysheet.chartparam.luckysheet_chart_point_config.top == curtop) {
                top = curtop;
                height = luckysheet.chartparam.luckysheet_chart_point_config.top - curtop;
            }
            else {
                top = luckysheet.chartparam.luckysheet_chart_point_config.top;
                height = curtop - luckysheet.chartparam.luckysheet_chart_point_config.top - 1;
            }

            var left = 0, width = 0;
            if (luckysheet.chartparam.luckysheet_chart_point_config.left > curleft) {
                left = curleft;
                width = luckysheet.chartparam.luckysheet_chart_point_config.left - curleft;
            }
            else if (luckysheet.chartparam.luckysheet_chart_point_config.left == curleft) {
                left = curleft;
                width = luckysheet.chartparam.luckysheet_chart_point_config.left - curleft;
            }
            else {
                left = luckysheet.chartparam.luckysheet_chart_point_config.left;
                width = curleft - luckysheet.chartparam.luckysheet_chart_point_config.left - 1;
            }

            for (var i = 0; i < luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator.length; i++) {
                var obj = luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator[i];
                if (!(((obj.left + obj.width + $container.scrollLeft()) <= left || (obj.top + obj.height + $container.scrollTop()) <= top) || ((obj.left + $container.scrollLeft()) >= (left + width) || (obj.top + $container.scrollTop()) >= (top + height)))) {
                    if (obj.isselected) {
                        obj.item.removeClass("luckysheet-chart-point-searchitem-active");
                    }
                    else {
                        obj.item.addClass("luckysheet-chart-point-searchitem-active");
                    }
                }
                else {
                    if (!obj.isselected) {
                        obj.item.removeClass("luckysheet-chart-point-searchitem-active");
                    }
                }
            }

            $("#luckysheet-chart-point-selectedhelp").css({ "left": left, "width": width, "top": top, "height": height });
        }
        else if (luckysheet_sheet_move_status) {
            var scrollLeft = $("#luckysheet-sheet-container-c").scrollLeft();
            var x = event.pageX + scrollLeft;

            if (Math.abs(event.pageX - luckysheet_sheet_move_data.pageX) < 3) {
                return;
            }

            var winW = $("#luckysheet-sheet-container").width();
            var left = x - luckysheet_sheet_move_data.curleft - $("#luckysheet-sheet-container").offset().left;
            luckysheet_sheet_move_data.activeobject.css({ "left": left });
            var row_index = luckysheet_searcharray(luckysheet_sheet_move_data.widthlist, left + luckysheet_sheet_move_data.curleft);
            luckysheet_sheet_move_data.cursorobject.css({ "cursor": "move" });

            if (left - scrollLeft <= 6) {
                $("#luckysheet-sheets-leftscroll").click();
            }

            if (left - scrollLeft >= winW - 40) {
                $("#luckysheet-sheets-rightscroll").click();
            }

            if (row_index != luckysheet_sheet_move_data.curindex) {
                if (row_index == -1 && left > 0) {
                    row_index = luckysheet_sheet_move_data.widthlist.length - 1;
                    $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
                }
                else if (row_index == -1 && left <= 0) {
                    $("#luckysheet-sheets-item-clone").insertBefore($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(0));
                }
                else {
                    $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
                }

                luckysheet_sheet_move_data.widthlist = [];
                //luckysheet_sheet_move_data.curleft = x;
                $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function (i) {
                    if (i == 0) {
                        luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                    }
                    else {
                        luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()) + luckysheet_sheet_move_data.widthlist[i - 1]);
                    }
                });

                luckysheet_sheet_move_data.curindex = $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").index($("#luckysheet-sheets-item-clone"));
            }
        }
        else if (luckysheet_model_move_state) {
            var scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft();
            var y = event.pageY + scrollTop, x = event.pageX + scrollLeft;
            var winH = $(window).height(), winW = $(window).width();
            var myh = luckysheet_model_move_obj.height(), myw = luckysheet_model_move_obj.width();
            var top = y - luckysheet_model_xy[1], left = x - luckysheet_model_xy[0];

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

            luckysheet_model_move_obj.css({ "top": top, "left": left });
            event.preventDefault();
        }
        else if (!!luckysheet_scroll_status || !!luckysheet_select_status || !!luckysheet_rows_selected_status || !!luckysheet_cols_selected_status || !!luckysheet_cell_selected_move || !!luckysheet_cell_selected_move || !!luckysheet_cell_selected_extend || !!luckysheet_cols_change_size || !!luckysheet_rows_change_size || !!luckysheet.chartparam.luckysheetCurrentChartMove || !!luckysheet.chartparam.luckysheetCurrentChartResize || !!luckysheet.formula.rangeResize || !!luckysheet.formula.rangeMove) {
            if (luckysheet_select_status) {
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
            }
            
            jfautoscrollTimeout = setInterval(function () {
                if (luckysheet_scroll_status  && !luckysheet_cols_change_size && !luckysheet_rows_change_size) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var left = $("#luckysheet-scrollbar-x").scrollLeft(), top = $("#luckysheet-scrollbar-y").scrollTop();
                    var x = mouse[0];
                    var y = mouse[1];
                    var winH = $("#luckysheet-cell-main").height() - 20, winW = $("#luckysheet-cell-main").width() - 60;

                    if (y < 0 || y > winH) {
                        var stop;
                        if (y < 0) {
                            stop = top + y/2;
                        }
                        else {
                            stop = top + (y - winH)/2;
                        }
                        $("#luckysheet-scrollbar-y").scrollTop(stop);
                    }

                    if (x < 0 || x > winW) {
                        var sleft;
                        if (x < 0) {
                            sleft = left + x/2;
                        }
                        else {
                            sleft = left + (x - winW)/2;
                        }
                        $("#luckysheet-scrollbar-x").scrollLeft(sleft);
                    }
                }
                if (luckysheet_select_status) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                    var top = 0, height = 0, rowseleted = [];
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

                    var left = 0, width = 0, columnseleted = [];
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

                    var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
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

                    luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                    luckysheet.selectHightlightShow();
                    
                    luckysheetFreezen.scrollFreezen();

                    $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));

                    //交替颜色选择范围
                    if($("#luckysheet-alternateformat-rangeDialog").is(":visible")){
                        $("#luckysheet-alternateformat-rangeDialog input").val(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));
                    }

                    if (luckysheet.chartparam.luckysheet_chart_data_select_state) {
                        $("#luckysheet-datavisual-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                    }

                    if (luckysheet.pivotTable.luckysheet_pivotTable_select_state) {
                        $("#luckysheet-pivotTable-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                    }
                }
                else if(luckysheet.conditionformat.selectStatus){
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    var last = luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1];

                    var top = 0, height = 0, rowseleted = [];
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

                    var left = 0, width = 0, columnseleted = [];
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

                    var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
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

                    luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1] = last;

                    luckysheet.selectionCopyShow(luckysheet.conditionformat.selectRange);

                    var range = luckysheet.conditionformat.getTxtByRange(luckysheet.conditionformat.selectRange);
                    $("#luckysheet-multiRange-dialog input").val(range);
                }
                else if (luckysheet.formula.rangestart) {
                    luckysheet.formula.rangedrag(event);
                }
                else if (luckysheet.formula.rangedrag_row_start) {
                    luckysheet.formula.rangedrag_row(event);
                }
                else if (luckysheet.formula.rangedrag_column_start) {
                    luckysheet.formula.rangedrag_column(event);
                }
                else if (luckysheet_rows_selected_status) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var y = mouse[1] + $("#luckysheet-rows-h").scrollTop();
                    if (y < 0) {
                        return false;
                    }

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                    var col_index = visibledatacolumn.length - 1, col = visibledatacolumn[col_index], col_pre = 0;

                    var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                    var top = 0, height = 0, rowseleted = [];
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

                    // var changeparam = luckysheet.menuButton.mergeMoveMain([0, col_index], rowseleted, last, top, height, col_pre, col);
                    // if(changeparam != null){
                    //     //columnseleted = changeparam[0];
                    //     rowseleted= changeparam[1];
                    //     top = changeparam[2];
                    //     height = changeparam[3];
                    //     //left = changeparam[4];
                    //     //width = changeparam[5];
                    // }

                    last["row"] = rowseleted;

                    last["top_move"] = top;
                    last["height_move"] = height;

                    luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                    luckysheet.selectHightlightShow();
                    
                    clearTimeout(jfcountfuncTimeout);
                    jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                    //event.preventDefault();
                }
                else if (luckysheet_cols_selected_status) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();
                    if (x < 0) {
                        return false;
                    }

                    var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                    var left = 0, width = 0, columnseleted = [];
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

                    // var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, [0, row_index], last, row_pre, row, left, width);
                    // if(changeparam != null){
                    //     columnseleted = changeparam[0];
                    //     //rowseleted= changeparam[1];
                    //     //top = changeparam[2];
                    //     //height = changeparam[3];
                    //     left = changeparam[4];
                    //     width = changeparam[5];
                    // }

                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;

                    luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                    luckysheet.selectHightlightShow();
                    
                    clearTimeout(jfcountfuncTimeout);
                    jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                    //event.preventDefault();
                }
                else if (luckysheet_cell_selected_move) {
                    var mouse = mouseposition(event.pageX, event.pageY);

                    var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    var scrollTop = $("#luckysheet-cell-main").scrollTop();

                    var x = mouse[0] + scrollLeft;
                    var y = mouse[1] + scrollTop;

                    var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    var row_index_original = luckysheet_cell_selected_move_index[0], col_index_original = luckysheet_cell_selected_move_index[1];

                    var row_s = luckysheet_select_save[0]["row"][0] - row_index_original + row_index, row_e = luckysheet_select_save[0]["row"][1] - row_index_original + row_index;

                    var col_s = luckysheet_select_save[0]["column"][0] - col_index_original + col_index, col_e = luckysheet_select_save[0]["column"][1] - col_index_original + col_index;

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = luckysheet_select_save[0]["row"][1] - luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e = luckysheet_select_save[0]["column"][1] - luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                        row_s = visibledatarow.length - 1 - luckysheet_select_save[0]["row"][1] + luckysheet_select_save[0]["row"][0];
                        row_e = visibledatarow.length - 1;
                    }

                    if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                        col_s = visibledatacolumn.length - 1 - luckysheet_select_save[0]["column"][1] + luckysheet_select_save[0]["column"][0];
                        col_e = visibledatacolumn.length - 1;
                    }

                    var col_pre = col_s - 1 == -1 ? 0 : visibledatacolumn[col_s - 1], col = visibledatacolumn[col_e];
                    var row_pre = row_s - 1 == -1 ? 0 : visibledatarow[row_s - 1], row = visibledatarow[row_e];

                    $("#luckysheet-cell-selected-move").css({ "left": col_pre, "width": col - col_pre - 2, "top": row_pre, "height": row - row_pre - 2, "display": "block" });
                    //clearTimeout(jfcountfuncTimeout);
                    //jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                    //event.preventDefault();
                }
                else if (luckysheet_cell_selected_extend) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var scrollLeft = $("#luckysheet-cell-main").scrollLeft() - 5;
                    var scrollTop = $("#luckysheet-cell-main").scrollTop() - 5;

                    var x = mouse[0] + scrollLeft;
                    var y = mouse[1] + scrollTop;

                    var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                    /*                        if (x < 0 || y < 0) {
                                                return;
                                            }*/

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    var row_index_original = luckysheet_cell_selected_extend_index[0], col_index_original = luckysheet_cell_selected_extend_index[1];

                    var row_s = luckysheet_select_save[0]["row"][0], row_e = luckysheet_select_save[0]["row"][1];
                    var col_s = luckysheet_select_save[0]["column"][0], col_e = luckysheet_select_save[0]["column"][1];

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = luckysheet_select_save[0]["row"][1] - luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e = luckysheet_select_save[0]["column"][1] - luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                        row_s = visibledatarow.length - 1 - luckysheet_select_save[0]["row"][1] + luckysheet_select_save[0]["row"][0];
                        row_e = visibledatarow.length - 1;
                    }

                    if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                        col_s = visibledatacolumn.length - 1 - luckysheet_select_save[0]["column"][1] + luckysheet_select_save[0]["column"][0];
                        col_e = visibledatacolumn.length - 1;
                    }

                    var top = luckysheet_select_save[0].top_move, height = luckysheet_select_save[0].height_move;
                    var left = luckysheet_select_save[0].left_move, width = luckysheet_select_save[0].width_move;

                    if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                        if (!(row_index >= row_s && row_index <= row_e)) {
                            if (luckysheet_select_save[0].top_move >= row_pre) {
                                top = row_pre;
                                height = luckysheet_select_save[0].top_move + luckysheet_select_save[0].height_move - row_pre;
                            }
                            else {
                                top = luckysheet_select_save[0].top_move;
                                height = row - luckysheet_select_save[0].top_move - 1;
                            }
                        }
                    }
                    else {
                        if (!(col_index >= col_s && col_index <= col_e)) {
                            if (luckysheet_select_save[0].left_move >= col_pre) {
                                left = col_pre;
                                width = luckysheet_select_save[0].left_move + luckysheet_select_save[0].width_move - col_pre;
                            }
                            else {
                                left = luckysheet_select_save[0].left_move;
                                width = col - luckysheet_select_save[0].left_move - 1;
                            }
                        }
                    }

                    $("#luckysheet-cell-selected-extend").css({ "left": left, "width": width, "top": top, "height": height, "display": "block" });
                    //event.preventDefault();
                }
                else if (luckysheet_cols_change_size) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
                    var x = mouse[0] + scrollLeft;
                    var winW = $(window).width();

                    var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
                    var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                    if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                        if ((x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0] > 30 && x / luckysheetConfigsetting.pointEditZoom < winW + scrollLeft - 100) {
                            $("#luckysheet-change-size-line").css({ "left": x / luckysheetConfigsetting.pointEditZoom });
                            $("#luckysheet-cols-change-size").css({ "left": (x - 2) / luckysheetConfigsetting.pointEditZoom });
                        }
                    }
                    else{
                        if ((x + 3) - luckysheet_cols_change_size_start[0] > 30 && x < winW + scrollLeft - 100) {
                            $("#luckysheet-change-size-line").css({ "left": x });
                            $("#luckysheet-cols-change-size").css({ "left": x - 2 });
                        }
                    }
                    //event.preventDefault();
                }
                else if (luckysheet_rows_change_size) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var scrollTop = $("#luckysheet-rows-h").scrollTop();
                    var y = mouse[1] + scrollTop;
                    var winH = $(window).height();

                    var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                    if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                        if ((y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0] > 19 && y / luckysheetConfigsetting.pointEditZoom < winH + scrollTop - 200) {
                            $("#luckysheet-change-size-line").css({ "top": y / luckysheetConfigsetting.pointEditZoom });
                            $("#luckysheet-rows-change-size").css({ "top": y / luckysheetConfigsetting.pointEditZoom });
                        }
                    }
                    else{
                        if ((y + 3) - luckysheet_rows_change_size_start[0] > 19 && y < winH + scrollTop - 200) {
                            $("#luckysheet-change-size-line").css({ "top": y });
                            $("#luckysheet-rows-change-size").css({ "top": y });
                        }
                    }
                    //event.preventDefault();
                }
                else if (luckysheet.chartparam.luckysheetCurrentChartMove) {
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
                    // var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    // var y = event.pageY + scrollTop, x = event.pageX + scrollLeft;

                    var myh = luckysheet.chartparam.luckysheetCurrentChartMoveObj.height(), myw = luckysheet.chartparam.luckysheetCurrentChartMoveObj.width();
                    var top = y - luckysheet.chartparam.luckysheetCurrentChartMoveXy[1], left = x - luckysheet.chartparam.luckysheetCurrentChartMoveXy[0];

                    if (top < 0) {
                        top = 0;
                    }

                    if (top + myh + 42 + 6 > luckysheet.chartparam.luckysheetCurrentChartMoveWinH) {
                        top = luckysheet.chartparam.luckysheetCurrentChartMoveWinH - myh - 42 - 6;
                    }

                    if (left < 0) {
                        left = 0;
                    }

                    if (left + myw + 22 + 36 > luckysheet.chartparam.luckysheetCurrentChartMoveWinW) {
                        left = luckysheet.chartparam.luckysheetCurrentChartMoveWinW - myw - 22 - 36;
                    }

                    luckysheet.chartparam.luckysheetCurrentChartMoveObj.css({ "top": top, "left": left });

                    if(luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null){
                        luckysheetFreezen.scrollAdapt();

                        var toffset = luckysheet.chartparam.luckysheetCurrentChartMoveObj.offset();
                        var tpsition = luckysheet.chartparam.luckysheetCurrentChartMoveObj.position();
                        luckysheet.chartparam.luckysheetCurrentChartMoveXy = [event.pageX - toffset.left, event.pageY - toffset.top, tpsition.left, tpsition.top, $("#luckysheet-scrollbar-x").scrollLeft(), $("#luckysheet-scrollbar-y").scrollTop()];
                    }
                    //event.preventDefault();
                }
                else if (!!luckysheet.chartparam.luckysheetCurrentChartResize) {
                    var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + scrollLeft;
                    var y = mouse[1] + scrollTop;

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    var myh = luckysheet.chartparam.luckysheetCurrentChartResizeObj.height(), myw = luckysheet.chartparam.luckysheetCurrentChartResizeObj.width();
                    var topchange = y - luckysheet.chartparam.luckysheetCurrentChartResizeXy[1], leftchange = x - luckysheet.chartparam.luckysheetCurrentChartResizeXy[0];

                    var top = luckysheet.chartparam.luckysheetCurrentChartResizeXy[5], height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3], left = luckysheet.chartparam.luckysheetCurrentChartResizeXy[4], width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2];

                    if (luckysheet.chartparam.luckysheetCurrentChartResize == "lm" || luckysheet.chartparam.luckysheetCurrentChartResize == "lt" || luckysheet.chartparam.luckysheetCurrentChartResize == "lb") {
                        left = x;
                        width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] - leftchange;
                        if (left > luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60) {
                            left = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60;
                            width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] - (luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60 - luckysheet.chartparam.luckysheetCurrentChartResizeXy[0]);
                        }
                        else if (left <= 0) {
                            left = 0;
                            width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[0];
                        }
                    }

                    if (luckysheet.chartparam.luckysheetCurrentChartResize == "rm" || luckysheet.chartparam.luckysheetCurrentChartResize == "rt" || luckysheet.chartparam.luckysheetCurrentChartResize == "rb") {
                        width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + leftchange;
                        if (width < 60) {
                            width = 60;
                        }
                        else if (width >= luckysheet.chartparam.luckysheetCurrentChartResizeWinW - luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 22 - 36) {
                            width = luckysheet.chartparam.luckysheetCurrentChartResizeWinW - luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 22 - 36;
                        }
                    }

                    if (luckysheet.chartparam.luckysheetCurrentChartResize == "mt" || luckysheet.chartparam.luckysheetCurrentChartResize == "lt" || luckysheet.chartparam.luckysheetCurrentChartResize == "rt") {
                        top = y;
                        height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] - topchange;
                        if (top > luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60) {
                            top = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60;
                            height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] - (luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60 - luckysheet.chartparam.luckysheetCurrentChartResizeXy[1]);
                        }
                        else if (top <= 0) {
                            top = 0;
                            height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[1];
                        }
                    }

                    if (luckysheet.chartparam.luckysheetCurrentChartResize == "mb" || luckysheet.chartparam.luckysheetCurrentChartResize == "lb" || luckysheet.chartparam.luckysheetCurrentChartResize == "rb") {
                        height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + topchange;
                        if (height < 60) {
                            height = 60;
                        }
                        else if (height >= luckysheet.chartparam.luckysheetCurrentChartResizeWinH - luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 42 - 6) {
                            height = luckysheet.chartparam.luckysheetCurrentChartResizeWinH - luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 42 - 6;
                        }
                    }

                    //if (top < 0) {
                    //    top = 0;
                    //}

                    //if (top + myh > luckysheet.chartparam.luckysheetCurrentChartResizeWinH) {
                    //    top = luckysheet.chartparam.luckysheetCurrentChartResizeWinH - myh;
                    //}

                    //if (left < 0) {
                    //    left = 0;
                    //}

                    //if (left + myw > luckysheet.chartparam.luckysheetCurrentChartResizeWinW) {
                    //    left = luckysheet.chartparam.luckysheetCurrentChartResizeWinW - myw;
                    //}

                    var resizedata = { "top": top, "left": left, "height": height, "width": width };
                    luckysheet.chartparam.luckysheetCurrentChartResizeObj.css(resizedata);
                    //echarts.getInstanceById(luckysheet.chartparam.luckysheetCurrentChartResizeObj.find(".luckysheet-modal-dialog-content").attr("_echarts_instance_")).resize();
                    !!window.generator && generator.resize(luckysheet.chartparam.luckysheetcurrentChart);
                    //event.preventDefault();
                }
                else if (luckysheet.postil.move){
                    var mouse = mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    var myh = luckysheet.postil.currentObj.outerHeight(), 
                        myw = luckysheet.postil.currentObj.outerWidth();
                    
                    var top = y - luckysheet.postil.moveXY[1], left = x - luckysheet.postil.moveXY[0];

                    if (top < 0) {
                        top = 0;
                    }

                    if (top + myh + 42 + 6 > luckysheet.postil.currentWinH) {
                        top = luckysheet.postil.currentWinH - myh - 42 - 6;
                    }

                    if (left < 0) {
                        left = 0;
                    }

                    if (left + myw + 22 + 36 > luckysheet.postil.currentWinW) {
                        left = luckysheet.postil.currentWinW - myw - 22 - 36;
                    }

                    luckysheet.postil.currentObj.css({ "left": left, "top": top });
                }
                else if (!!luckysheet.postil.resize){
                    var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
                    var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    var topchange = y - luckysheet.postil.resizeXY[1], 
                        leftchange = x - luckysheet.postil.resizeXY[0];
                    
                    var top = luckysheet.postil.resizeXY[5],
                        height = luckysheet.postil.resizeXY[3],
                        left = luckysheet.postil.resizeXY[4],
                        width = luckysheet.postil.resizeXY[2];

                    if(luckysheet.postil.resize == "lm" || luckysheet.postil.resize == "lt" || luckysheet.postil.resize == "lb"){
                        left = x;
                        width = luckysheet.postil.resizeXY[2] - leftchange;

                        if(left > luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60){
                            left = luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60;
                            width = luckysheet.postil.resizeXY[2] - (luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60 - luckysheet.postil.resizeXY[0]);
                        }
                        else if(left <= 0){
                            left = 0;
                            width = luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[0];
                        }
                    }

                    if(luckysheet.postil.resize == "rm" || luckysheet.postil.resize == "rt" || luckysheet.postil.resize == "rb"){
                        width = luckysheet.postil.resizeXY[2] + leftchange;

                        if(width < 60){
                            width = 60;
                        }
                        else if(width >= luckysheet.postil.currentWinW - luckysheet.postil.resizeXY[4] - 22 - 36){
                            width = luckysheet.postil.currentWinW - luckysheet.postil.resizeXY[4] - 22 - 36;
                        }
                    }

                    if(luckysheet.postil.resize == "mt" || luckysheet.postil.resize == "lt" || luckysheet.postil.resize == "rt"){
                        top = y;
                        height = luckysheet.postil.resizeXY[3] - topchange;

                        if(top > luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60){
                            top = luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60;
                            height = luckysheet.postil.resizeXY[3] - (luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60 - luckysheet.postil.resizeXY[1]);
                        }
                        else if(top <= 0){
                            top = 0;
                            height = luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[1];
                        }
                    }

                    if(luckysheet.postil.resize == "mb" || luckysheet.postil.resize == "lb" || luckysheet.postil.resize == "rb"){
                        height = luckysheet.postil.resizeXY[3] + topchange;

                        if(height < 60){
                            height = 60;
                        }
                        else if(height >= luckysheet.postil.currentWinH - luckysheet.postil.resizeXY[5] - 42 - 6){
                            height = luckysheet.postil.currentWinH - luckysheet.postil.resizeXY[5] - 42 - 6;
                        }
                    }

                    luckysheet.postil.currentObj.css({ "width": width, "height": height, "left": left, "top": top });
                }
                else if (!!luckysheet.formula.rangeResize) {
                    luckysheet.formula.rangeResizeDraging(event, luckysheet.formula.rangeResizeObj, luckysheet.formula.rangeResizexy, luckysheet.formula.rangeResize, luckysheet.formula.rangeResizeWinW, luckysheet.formula.rangeResizeWinH, ch_width, rh_height);
                }
                else if (!!luckysheet.formula.rangeMove) {
                    luckysheet.formula.rangeMoveDraging(event, luckysheet.formula.rangeMovexy, luckysheet.formula.rangeMoveObj.data("range"), luckysheet.formula.rangeMoveObj, sheetBarHeight, statisticBarHeight);
                }
                else if (!!luckysheet.chart_selection.rangeResize) {
                    luckysheet.chart_selection.rangeResizeDraging(event, sheetBarHeight, statisticBarHeight);
                }
                else if (!!luckysheet.chart_selection.rangeMove) {
                    luckysheet.chart_selection.rangeMoveDraging(event, sheetBarHeight, statisticBarHeight);
                }
            }, 1);
        }
    });

    $(document).mouseup(function (event) {
        //数据窗格主体

        if (luckysheet_select_status) {
            clearTimeout(jfcountfuncTimeout);
            jfcountfuncTimeout = setTimeout(function(){
                jfcountfunc();
            }, 0);

            //格式刷
            if(luckysheet.menuButton.luckysheetPaintModelOn){
                luckysheet.selection.pasteHandlerOfPaintModel(luckysheet_copy_save);

                if(luckysheet.menuButton.luckysheetPaintSingle){
                    //单次 格式刷
                    luckysheet.menuButton.cancelPaintModel();
                }
            }
        }

        //$("#text-select").remove();

        luckysheet_select_status = false;
        clearTimeout(jfautoscrollTimeout);
        luckysheet_scroll_status = false;

        $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","crosshair").end().find(".luckysheet-cs-draghandle").css("cursor","move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","default");

        //行标题窗格主体
        luckysheet_rows_selected_status = false;

        //列标题窗格主体
        luckysheet_cols_selected_status = false;

        luckysheet_model_move_state = false;

        // if (luckysheetautoadjustmousedown == 1) {
        //     //luckysheet.luckysheetscrollevent(true);
        //     luckysheetautoadjustmousedown = 2;
        // }

        if(luckysheet.formula.functionResizeStatus){
            luckysheet.formula.functionResizeStatus = false;
            $("#luckysheet-wa-calculate-size").removeAttr("style");
        }


        if (!!luckysheetFreezen.horizontalmovestate) {
            luckysheetFreezen.horizontalmovestate = false;
            $("#luckysheet-freezebar-horizontal").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenhorizontaldata[4] <= columeHeaderHeight) {
                luckysheetFreezen.cancelFreezenHorizontal();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheet.luckysheetrefreshgrid();
        }

        if (!!luckysheetFreezen.verticalmovestate) {
            luckysheetFreezen.verticalmovestate = false;
            $("#luckysheet-freezebar-vertical").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenverticaldata[4] <= rowHeaderWidth) {
                luckysheetFreezen.cancelFreezenVertical();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheet.luckysheetrefreshgrid();
        }

        if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
            $("#luckysheet-modal-dialog-slider-pivot-move").remove();
            luckysheet.pivotTable.movestate = false;
            $("#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").css("cursor", "default");
            if (luckysheet.pivotTable.movesave.containerid != "luckysheet-modal-dialog-pivotTable-list") {
                var $cur = $(event.target).closest(".luckysheet-modal-dialog-slider-config-list");
                if ($cur.length == 0) {
                    if (luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value") {
                        luckysheet.pivotTable.resetOrderby(luckysheet.pivotTable.movesave.obj);
                    }
                    luckysheet.pivotTable.movesave.obj.remove();
                    luckysheet.pivotTable.showvaluecolrow();
                    $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                        $(this).find(".luckysheet-slider-list-item-selected").find("i").remove();
                    });

                    $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                        var index = $(this).data("index");

                        $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                            var $seleted = $(this).find(".luckysheet-slider-list-item-selected");
                            if ($(this).data("index") == index && $seleted.find("i").length == 0) {
                                $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                            }
                        });

                    });
                    luckysheet.pivotTable.refreshPivotTable();
                }
            }
        }

        if (!!luckysheet.chartparam.luckysheet_chart_point_config && luckysheet.chartparam.luckysheet_chart_point_config.movestart) {
            clearTimeout(luckysheet.chartparam.luckysheet_chart_point_config.lagTimeoutclick);
            luckysheet.chartparam.luckysheet_chart_point_config.mouseupdone = true;
            luckysheet.chartparam.luckysheet_chart_point_config.movestart = false;

            $("#luckysheet-chart-point-selectedhelp").hide();

            luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator = [];
            luckysheet.chartparam.luckysheet_chart_point_config.changeindex = [];

            var dataOpt = null, initialpointset = true;
            var currentOpt = luckysheet.chartparam.luckysheet_chart_point_config.pointchart.getOption();
            $("#luckysheet-chart-point-config .luckysheet-chart-point-searchitem-c").find(".luckysheet-chart-point-searchitem-active").each(function () {
                luckysheet.chartparam.luckysheet_chart_point_config.changeindex.push($(this).data("index"));

                var dataOpt1 = currentOpt.series[0].data[$(this).data("index")];
                if (initialpointset && !(dataOpt1 instanceof Array)) {
                    initialpointset = false;
                    dataOpt = dataOpt1;
                }
            });

            luckysheet.luckysheetactivepointconfig(currentOpt, dataOpt);
            //var data = luckysheet.chartparam.luckysheet_chart_point_config.pointchart.series[0].data[luckysheet.chartparam.luckysheet_chart_point_config.changeindex[0]]
        }

        if (luckysheet_sheet_move_status) {
            luckysheet_sheet_move_status = false;
            luckysheet_sheet_move_data.activeobject.insertBefore($("#luckysheet-sheets-item-clone"));
            luckysheet_sheet_move_data.activeobject.removeAttr("style");
            //luckysheet_sheet_move_data.activeobject.css({ "position": "relative", "opacity": 1, "cursor": "pointer", "transition": "all 0.1s", "z-index": "initial" });
            $("#luckysheet-sheets-item-clone").remove();
            luckysheet_sheet_move_data.cursorobject.css({ "cursor": "pointer" });
            luckysheet_sheet_move_data = {};
            luckysheet.sheetmanage.reOrderAllSheet();
        }

        clearTimeout(luckysheet.chartparam.luckysheetCurrentChartMoveTimeout);
        
        //图表拖动 chartMix
        if (luckysheet.chartparam.luckysheetCurrentChartMove) {
            luckysheet.chartparam.luckysheetCurrentChartMove = false;
            if (luckysheet.chartparam.luckysheetInsertChartTosheetChange) {

                //myTop, myLeft: 本次的chart框位置，scrollLeft,scrollTop: 上一次的滚动条位置
                var myTop = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("top"), myLeft = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("left"), scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();

                //点击时候存储的信息，即上一次操作结束的图表信息，x,y: chart框位置，scrollLeft1,scrollTop1: 滚动条位置
                var x = luckysheet.chartparam.luckysheetCurrentChartMoveXy[2];
                var y = luckysheet.chartparam.luckysheetCurrentChartMoveXy[3];

                var scrollLeft1 = luckysheet.chartparam.luckysheetCurrentChartMoveXy[4];
                var scrollTop1 = luckysheet.chartparam.luckysheetCurrentChartMoveXy[5];

                var chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");

                var sheetIndex = !!window.store && store.state.chartSetting.chartList[chart_id].sheetIndex;

                //去除chartobj,改用chart_id代替即可定位到此图表
                luckysheet.jfredo.push({ "type": "moveChart", "chart_id": chart_id, "sheetIndex": sheetIndex, "myTop": myTop, "myLeft": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft, "x": x, "y": y, "scrollTop1": scrollTop1, "scrollLeft1": scrollLeft1  });
                
                //在store中更新数据
                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"left",
                    value:myLeft,
                    chartId:chart_id
                });

                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"top",
                    value:myTop,
                    chartId:chart_id
                });

                // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "top": myTop, "left": myLeft });
                //存储滚动条位置
                luckysheet.server.saveParam("c", sheetIndex, { "left":myLeft, "top":myTop,"scrollTop": scrollTop, "scrollLeft": scrollLeft }, { "op":"xy", "cid": chart_id});
                //协同编辑时可能影响用户操作，可以考虑不存储滚动条位置（google sheet没有存储滚动条位置）
                // luckysheet.server.saveParam("c", sheetIndex, { "left":myLeft, "top":myTop }, { "op":"xy", "cid": chart_id});
            }
        }

        if (!!luckysheet.formula.rangeResize) {
            luckysheet.formula.rangeResizeDragged(event, luckysheet.formula.rangeResizeObj, luckysheet.formula.rangeResize, luckysheet.formula.rangeResizexy, luckysheet.formula.rangeResizeWinW, luckysheet.formula.rangeResizeWinH);
        }


         //图表改变大小 chartMix
        if (!!luckysheet.chartparam.luckysheetCurrentChartResize) {
            luckysheet.chartparam.luckysheetCurrentChartResize = null;
            if (luckysheet.chartparam.luckysheetInsertChartTosheetChange) {
                var myHeight = luckysheet.chartparam.luckysheetCurrentChartResizeObj.height(), myWidth = luckysheet.chartparam.luckysheetCurrentChartResizeObj.width(), scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();

                var myTop = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("top"),
                    myLeft = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("left")

               
                var chart_id = luckysheet.chartparam.luckysheetCurrentChartResizeObj.find(".luckysheet-modal-dialog-content").attr("id");
                var sheetIndex = !!window.store && store.state.chartSetting.chartList[chart_id].sheetIndex;

                var myWidth1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2];
                var myHeight1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3];
                var x = luckysheet.chartparam.luckysheetCurrentChartResizeXy[4];//增加上一次的位置x，y
                var y = luckysheet.chartparam.luckysheetCurrentChartResizeXy[5];
                var scrollLeft1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[6];
                var scrollTop1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[7];

                luckysheet.jfredo.push({ "type": "resizeChart", "chart_id": chart_id, "sheetIndex": sheetIndex,"myTop": myTop, "myLeft": myLeft, "myHeight": myHeight, "myWidth": myWidth, "scrollTop": scrollTop, "scrollLeft": scrollLeft, "x": x, "y": y, "myWidth1": myWidth1, "myHeight1": myHeight1, "scrollTop1": scrollTop1, "scrollLeft1": scrollLeft1 });

                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"height",
                    value:myHeight,
                    chartId:chart_id
                });

                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"width",
                    value:myWidth,
                    chartId:chart_id
                });

                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"left",
                    value:myLeft,
                    chartId:chart_id
                });

                !!window.store && store.commit({
                    type:"updateChartItem",
                    key:"top",
                    value:myTop,
                    chartId:chart_id
                });

                //加上滚动条的位置
                // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "height": myHeight, "width": myWidth, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft });

                luckysheet.server.saveParam("c", sheetIndex, { "width":myWidth, "height":myHeight, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft}, { "op":"wh", "cid": chart_id});
                // luckysheet.server.saveParam("c", sheetIndex, { "width":myWidth, "height":myHeight, "top": myTop, "left": myLeft }, { "op":"wh", "cid": chart_id});
            }
        }

        //批注框 移动
        if (luckysheet.postil.move) {
            luckysheet.postil.move = false;

            var ps_id = luckysheet.postil.currentObj.closest(".luckysheet-postil-show").attr("id");

            var ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            var ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var rc = [];

            d[ps_r][ps_c].ps.left = luckysheet.postil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheet.postil.currentObj.position().top;
            d[ps_r][ps_c].ps.value = luckysheet.postil.currentObj.find(".formulaInputFocus").text();

            rc.push(ps_r + "_" + ps_c);

            luckysheet.postil.ref(d, rc);

            $("#" + ps_id).remove();

            if(d[ps_r][ps_c].ps.isshow){
                luckysheet.postil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
            }
            else{
                luckysheet.postil.editPs(ps_r, ps_c);
            }
        }

        //批注框 改变大小
        if (!!luckysheet.postil.resize) {
            luckysheet.postil.resize = null;

            var ps_id = luckysheet.postil.currentObj.closest(".luckysheet-postil-show").attr("id");

            var ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            var ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var rc = [];

            d[ps_r][ps_c].ps.left = luckysheet.postil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheet.postil.currentObj.position().top;
            d[ps_r][ps_c].ps.width = luckysheet.postil.currentObj.outerWidth();
            d[ps_r][ps_c].ps.height = luckysheet.postil.currentObj.outerHeight();
            d[ps_r][ps_c].ps.value = luckysheet.postil.currentObj.find(".formulaInputFocus").text();

            rc.push(ps_r + "_" + ps_c);

            luckysheet.postil.ref(d, rc);

            $("#" + ps_id).remove();

            if(d[ps_r][ps_c].ps.isshow){
                luckysheet.postil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
            }
            else{
                luckysheet.postil.editPs(ps_r, ps_c);
            }
        }

        //改变行高
        if (luckysheet_rows_change_size) {
            luckysheet_rows_change_size = false;

            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-rows-change-size").css("opacity", 0);
            $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "default");

            var mouse = mouseposition(event.pageX, event.pageY);
            var scrollTop = $("#luckysheet-rows-h").scrollTop();
            var y = mouse[1] + scrollTop;
            var winH = $(window).height();

            var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

            if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                var size = (y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0];

                if ((y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0] < 19) {
                    size = 19;
                }

                if (y / luckysheetConfigsetting.pointEditZoom >= winH - 200 + scrollTop) {
                    size = winW - 200 - luckysheet_rows_change_size_start[0] + scrollTop;
                }
            }
            else{
                var size = (y + 3) - luckysheet_rows_change_size_start[0];

                if ((y + 3) - luckysheet_rows_change_size_start[0] < 19) {
                    size = 19;
                }

                if (y >= winH - 200 + scrollTop) {
                    size = winW - 200 - luckysheet_rows_change_size_start[0] + scrollTop;
                }
            }

            var cfg = $.extend(true, {}, config);
            if (cfg["rowlen"] == null) {
                cfg["rowlen"] = {};
            }

            cfg["rowlen"][luckysheet_rows_change_size_start[1]] = Math.ceil(size);

            if (clearjfundo) {
                luckysheet.jfundo = [];

                luckysheet.jfredo.push({
                    "type": "resize",
                    "ctrlType": "resizeR",
                    "config": $.extend(true, {}, config),
                    "curconfig": $.extend(true, {}, cfg),
                    "sheetIndex": luckysheet.currentSheetIndex
                });
            }

            //config
            config = cfg;
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

            luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["rowlen"], { "k": "rowlen" });

            luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, null);

            // if ($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length > 0) {
            //     var $t = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).find(".luckysheet-filter-options").eq(0);
            //     var st_r = $t.data("str"), ed_r = $t.data("edr"), cindex = $t.data("cindex"), st_c = $t.data("stc"), ed_c = $t.data("edc");
            //     luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
            // }

            //luckysheet.cleargridelement(event);
        }

        //改变列宽
        if (luckysheet_cols_change_size) {
            luckysheet_cols_change_size = false;
            
            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-cols-change-size").css("opacity", 0);
            $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "default");

            var mouse = mouseposition(event.pageX, event.pageY);
            var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
            var x = mouse[0] + scrollLeft;
            var winW = $(window).width();

            var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
            var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

            if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                var size = (x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0];
            }
            else{
                var size = (x + 3) - luckysheet_cols_change_size_start[0];
            }

            var firstcolumlen = defaultcollen;
            if (config["columlen"] != null && config["columlen"][luckysheet_cols_change_size_start[1]] != null) {
                firstcolumlen = config["columlen"][luckysheet_cols_change_size_start[1]];
            }

            if (Math.abs(size - firstcolumlen) < 3) {
                return;
            }

            if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                if ((x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0] < 30) {
                    size = 30;
                }

                if (x / luckysheetConfigsetting.pointEditZoom >= winW - 100 + scrollLeft) {
                    size = winW - 100 - luckysheet_cols_change_size_start[0] + scrollLeft;
                }
            }
            else{
                if ((x + 3) - luckysheet_cols_change_size_start[0] < 30) {
                    size = 30;
                }

                if (x >= winW - 100 + scrollLeft) {
                    size = winW - 100 - luckysheet_cols_change_size_start[0] + scrollLeft;
                }
            }

            var cfg = $.extend(true, {}, config);
            if (cfg["columlen"] == null) {
                cfg["columlen"] = {};
            }

            cfg["columlen"][luckysheet_cols_change_size_start[1]] = Math.ceil(size);

            if (clearjfundo) {
                luckysheet.jfundo = [];

                luckysheet.jfredo.push({
                    "type": "resize",
                    "ctrlType": "resizeC",
                    "config": $.extend(true, {}, config),
                    "curconfig": $.extend(true, {}, cfg),
                    "sheetIndex": luckysheet.currentSheetIndex
                });
            }

            //config
            config = cfg;
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

            luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["columlen"], { "k": "columlen" });

            luckysheet.jfrefreshgrid_rhcw(null, luckysheet.flowdata[0].length);

            // if ($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length > 0) {
            //     var $t = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).find(".luckysheet-filter-options").eq(0);
            //     var st_r = $t.data("str"), ed_r = $t.data("edr"), cindex = $t.data("cindex"), st_c = $t.data("stc"), ed_c = $t.data("edc");
            //     luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
            // }

            setTimeout(function () {
                luckysheet.luckysheetrefreshgrid();
            }, 1);
            //luckysheet.cleargridelement(event);
        }

        if (luckysheet.formula.rangeMove) {
            luckysheet.formula.rangeMoveDragged(luckysheet.formula.rangeMoveObj);
        }

        //改变选择框的位置并替换目标单元格
        if (luckysheet_cell_selected_move) {
            $("#luckysheet-cell-selected-move").hide();

            luckysheet_cell_selected_move = false;
            var mouse = mouseposition(event.pageX, event.pageY);

            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            var scrollTop = $("#luckysheet-cell-main").scrollTop();

            var x = mouse[0] + scrollLeft;
            var y = mouse[1] + scrollTop;

            var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

            var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];
            var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

            var row_index_original = luckysheet_cell_selected_move_index[0], col_index_original = luckysheet_cell_selected_move_index[1];

            if(row_index == row_index_original && col_index == col_index_original){
                return;
            }

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var last = luckysheet_select_save[luckysheet_select_save.length - 1];
           
            var data = luckysheet.getdatabyselection(last);

            var cfg = $.extend(true, {}, config);
            if(cfg["merge"] == null){
                cfg["merge"] = {};
            }
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            //选区包含部分单元格
            if(luckysheet.hasPartMC(cfg, last["row"][0], last["row"][1], last["column"][0], last["column"][1])){
                if(luckysheet.isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                }
                return;
            }

            var row_s = last["row"][0] - row_index_original + row_index, row_e = last["row"][1] - row_index_original + row_index;
            var col_s = last["column"][0] - col_index_original + col_index, col_e = last["column"][1] - col_index_original + col_index;
            
            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                row_s = visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = visibledatarow.length - 1;
            }

            if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                col_s = visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = visibledatacolumn.length - 1;
            }

            //替换的位置包含部分单元格
            if(luckysheet.hasPartMC(cfg, row_s, row_e, col_s, col_e)){
                if(luckysheet.isEditMode()){
                    alert("无法对合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                }
                return;
            }

            var borderInfoCompute = luckysheet.getBorderInfoCompute(luckysheet.currentSheetIndex);


            //删除原本位置的数据
            var RowlChange = null;
            for (var r = last["row"][0]; r <= last["row"][1]; r++) {
                if(r in cfg["rowlen"]){
                    RowlChange = true;
                }

                for (var c = last["column"][0]; c <= last["column"][1]; c++) {
                    var cell = d[r][c];

                    if(luckysheet.getObjType(cell) == "object" && ("mc" in cell)){
                        if((cell["mc"].r + "_" + cell["mc"].c) in cfg["merge"]){
                            delete cfg["merge"][cell["mc"].r + "_" + cell["mc"].c];
                        }
                    }

                    d[r][c] = null;
                }
            }

            //边框
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                var borderInfo = [];

                for(var i = 0; i < cfg["borderInfo"].length; i++){
                    var bd_rangeType = cfg["borderInfo"][i].rangeType;

                    if(bd_rangeType == "range"){
                        var bd_range = cfg["borderInfo"][i].range;
                        var bd_emptyRange = [];

                        for(var j = 0; j < bd_range.length; j++){
                            bd_emptyRange = bd_emptyRange.concat(luckysheet.conditionformat.CFSplitRange(bd_range[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "restPart"));
                        }

                        cfg["borderInfo"][i].range = bd_emptyRange;

                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                    else if(bd_rangeType == "cell"){
                        var bd_r = cfg["borderInfo"][i].value.row_index;
                        var bd_c = cfg["borderInfo"][i].value.col_index;

                        if(!(bd_r >= last["row"][0] && bd_r <= last["row"][1] && bd_c >= last["column"][0] && bd_c <= last["column"][1])){
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            
            //替换位置数据更新
            var offsetMC = {};
            for (var r = 0; r < data.length; r++) {
                for (var c = 0; c < data[0].length; c++) {
                    if(borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])]){
                        var bd_obj = {
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

                    var value = "";
                    if (data[r] != null && data[r][c] != null) {
                        value = data[r][c];
                    }

                    if(luckysheet.getObjType(value) == "object" && ("mc" in value)){
                        var mc = $.extend(true, {}, value["mc"]);
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
                cfg = luckysheet.rowlenByRange(d, last["row"][0], last["row"][1], cfg);
                cfg = luckysheet.rowlenByRange(d, row_s, row_e, cfg);
            }

            //条件格式
            var cdformat = $.extend(true, [], luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"]);
            if(cdformat != null && cdformat.length > 0){
                for(var i = 0; i < cdformat.length; i++){
                    var cdformat_cellrange = cdformat[i].cellrange;
                    var emptyRange = [];
                    for(var j = 0; j < cdformat_cellrange.length; j++){
                        var range = luckysheet.conditionformat.CFSplitRange(cdformat_cellrange[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "allPart");
                        emptyRange = emptyRange.concat(range);
                    }
                    cdformat[i].cellrange = emptyRange;
                }
            }

            if(luckysheet_select_save[0].row_focus == luckysheet_select_save[0].row[0]){
                var rf = row_s;
            }
            else{
                var rf = row_e;
            }

            if(luckysheet_select_save[0].column_focus == luckysheet_select_save[0].column[0]){
                var cf = col_s;
            }
            else{
                var cf = col_e;
            }

            var range = [];
            range.push({ "row": last["row"], "column": last["column"] });
            range.push({ "row": [row_s, row_e], "column": [col_s, col_e] });

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];
            last["row_focus"] = rf;
            last["column_focus"] = cf;

            luckysheet.jfrefreshgrid(d, range, cfg, cdformat, RowlChange);

            luckysheet.selectHightlightShow();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(jfcountfuncTimeout);
            jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
        }

        //图表选区拖拽移动
        if (luckysheet.chart_selection.rangeMove) {
            luckysheet.chart_selection.rangeMoveDragged();
        }

        //图表选区拖拽拉伸
        if (!!luckysheet.chart_selection.rangeResize) {
            luckysheet.chart_selection.rangeResizeDragged();
        }

        //选区下拉
        if (luckysheet_cell_selected_extend) {
            luckysheet_cell_selected_extend = false;
            $("#luckysheet-cell-selected-extend").hide();

            var mouse = mouseposition(event.pageX, event.pageY);
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            var scrollTop = $("#luckysheet-cell-main").scrollTop();

            var x = mouse[0] + scrollLeft - 5;
            var y = mouse[1] + scrollTop - 5;

            var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

            var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
            var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

            var row_index_original = luckysheet_cell_selected_extend_index[0], col_index_original = luckysheet_cell_selected_extend_index[1];

            var last = luckysheet_select_save[luckysheet_select_save.length - 1];
            var row_s = last["row"][0], row_e = last["row"][1];
            var col_s = last["column"][0], col_e = last["column"][1];

            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                row_s = visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = visibledatarow.length - 1;
            }

            if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                col_s = visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = visibledatacolumn.length - 1;
            }

            //复制范围
            luckysheet.dropCell.copyRange = {"row": $.extend(true, [], last["row"]), "column": $.extend(true, [], last["column"])};
            //applyType
            var typeItemHide = luckysheet.dropCell.typeItemHide();
            
            if(!typeItemHide[0] && !typeItemHide[1] && !typeItemHide[2] && !typeItemHide[3] && !typeItemHide[4] && !typeItemHide[5] && !typeItemHide[6]){
                luckysheet.dropCell.applyType = "0";
            }
            else{
                luckysheet.dropCell.applyType = "1";
            }

            if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                if (!(row_index >= row_s && row_index <= row_e)) {
                    if (luckysheet_select_save[0].top_move >= row_pre) {//当往上拖拽时
                        luckysheet.dropCell.applyRange = {"row": [row_index, last["row"][0] - 1], "column": last["column"]};
                        luckysheet.dropCell.direction = "up";

                        row_s -= last["row"][0] - row_index;

                        //是否有数据透视表范围
                        if(luckysheet.pivotTable.isPivotRange(row_s, col_e)){
                            luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                    else {//当往下拖拽时
                        luckysheet.dropCell.applyRange = {"row": [last["row"][1] + 1, row_index], "column": last["column"]};
                        luckysheet.dropCell.direction = "down";

                        row_e += row_index - last["row"][1];

                        //是否有数据透视表范围
                        if(luckysheet.pivotTable.isPivotRange(row_e, col_e)){
                            luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
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
                    if (luckysheet_select_save[0].left_move >= col_pre) {//当往左拖拽时
                        luckysheet.dropCell.applyRange = {"row": last["row"], "column": [col_index, last["column"][0] - 1]};
                        luckysheet.dropCell.direction = "left";

                        col_s -= last["column"][0] - col_index;

                        //是否有数据透视表范围
                        if(luckysheet.pivotTable.isPivotRange(row_e, col_s)){
                            luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                    else {//当往右拖拽时
                        luckysheet.dropCell.applyRange = {"row": last["row"], "column": [last["column"][1] + 1, col_index]};
                        luckysheet.dropCell.direction = "right";

                        col_e += col_index - last["column"][1];

                        //是否有数据透视表范围
                        if(luckysheet.pivotTable.isPivotRange(row_e, col_e)){
                            luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                            return;
                        }
                    }
                }
                else{
                    return;
                }
            }

            if(config["merge"] != null){
                var hasMc = false;

                for(var r = last["row"][0]; r <= last["row"][1]; r++){
                    for(var c = last["column"][0]; c <= last["column"][1]; c++){
                        var cell = luckysheet.flowdata[r][c];

                        if(cell != null && cell.mc != null){
                            hasMc = true;
                            break;
                        }
                    }
                }

                if(hasMc){
                    if(luckysheet.isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        luckysheet.tooltip.info("无法对合并单元格执行此操作", ""); 
                    }

                    return;
                }

                for(var r = row_s; r <= row_e; r++){
                    for(var c = col_s; c <= col_e; c++){
                        var cell = luckysheet.flowdata[r][c];

                        if(cell != null && cell.mc != null){
                            hasMc = true;
                            break;
                        }
                    }
                }

                if(hasMc){
                    if(luckysheet.isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        luckysheet.tooltip.info("无法对合并单元格执行此操作", ""); 
                    }

                    return;
                }
            }

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];

            luckysheet.dropCell.update();
            luckysheet.dropCell.createIcon();

            $("#luckysheet-cell-selected-move").hide();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(jfcountfuncTimeout);
            jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
        }
    });

    $("#luckysheet-left-top").mousedown(function (event) {
        $("#luckysheet-wa-functionbox-confirm").click();
        luckysheet_select_status = false;
        
        luckysheet_select_save = [{ "row": [0, luckysheet.flowdata.length - 1], "column": [0, luckysheet.flowdata[0].length - 1], "row_focus": 0, "column_focus": 0 }];
        luckysheet.selectHightlightShow();
        
        clearTimeout(jfcountfuncTimeout);
        jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);

        event.stopPropagation();
    });

    var luckysheet_rows_selected_status = false;
    $("#luckysheet-rows-h").mousedown(function (event) {
        //有批注在编辑时
        luckysheet.postil.removeActivePs();

        var mouse = mouseposition(event.pageX, event.pageY);
        var y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
        var col_index = visibledatacolumn.length - 1, col = visibledatacolumn[col_index], col_pre = 0;

        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        //mousedown是右键
        if (event.which == "3") {
            var isright = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var obj_s = luckysheet_select_save[s];

                if(obj_s["row"] != null && (row_index >= obj_s["row"][0] && row_index <= obj_s["row"][1]) && (obj_s["column"][0] == 0 && obj_s["column"][1] == luckysheet.flowdata[0].length - 1)){
                    isright = true;
                    break;
                }
            }

            if(isright){
                return;
            }
        }

        var top = row_pre, height = row - row_pre - 1;
        var rowseleted = [row_index, row_index];

        luckysheet_scroll_status = true;

        //公式相关
        var $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {
            if (luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton() || $("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")) {
                //公式选区
                var changeparam = luckysheet.menuButton.mergeMoveMain([0, col_index], rowseleted, {"row_focus": row_index, "column_focus": 0}, top, height, col_pre, col);
                if(changeparam != null){
                    //columnseleted = changeparam[0];
                    rowseleted = changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    //left = changeparam[4];
                    //width = changeparam[5];
                }

                if(event.shiftKey){
                    var last = luckysheet.formula.func_selectedrange;

                    var top = 0, height = 0, rowseleted = [];
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

                    var changeparam = luckysheet.menuButton.mergeMoveMain([0, col_index], rowseleted, {"row_focus": row_index, "column_focus": 0}, top, height, col_pre, col);
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

                    luckysheet.formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    var vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = luckysheet.formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            var currSelection = window.getSelection();
                            luckysheet.formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            var textRange = document.selection.createRange();
                            luckysheet.formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        luckysheet.formula.canceFunctionrangeSelected();
                        luckysheet.formula.createRangeHightlight();
                    }

                    luckysheet.formula.rangestart = false;
                    luckysheet.formula.rangedrag_column_start = false;
                    luckysheet.formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    luckysheet.formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    luckysheet.formula.israngeseleciton();
                    luckysheet.formula.func_selectedrange = {
                        "left": luckysheet.colLocationByIndex(0)[0],
                        "width": luckysheet.colLocationByIndex(0)[1] - luckysheet.colLocationByIndex(0)[0] - 1,
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
                    luckysheet.formula.func_selectedrange = {
                        "left": luckysheet.colLocationByIndex(0)[0],
                        "width": luckysheet.colLocationByIndex(0)[1] - luckysheet.colLocationByIndex(0)[0] - 1,
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

                if(luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton()){
                    luckysheet.formula.rangeSetValue({ "row": rowseleted, "column": [null, null] });
                }
                else if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){//if公式生成器
                    var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": rowseleted, "column": [0, col_index] }, luckysheet.currentSheetIndex);
                    $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);
                }

                luckysheet.formula.rangedrag_row_start = true;
                luckysheet.formula.rangestart = false;
                luckysheet.formula.rangedrag_column_start = false;

                $("#luckysheet-formula-functionrange-select").css({ "left": col_pre, "width": col - col_pre - 1, "top": top, "height": height }).show();
                $("#luckysheet-formula-help-c").hide();

                luckysheet.luckysheet_count_show(col_pre, top, col - col_pre - 1, height, rowseleted, [0, col_index]);

                setTimeout(function(){
                    var currSelection = window.getSelection();
                    var anchorOffset = currSelection.anchorNode;
                    if($("#luckysheet-search-formula-parm").is(":visible")||$("#luckysheet-search-formula-parm-select").is(":visible")){
                        $editor=$("#luckysheet-rich-text-editor");
                        luckysheet.formula.rangechangeindex = luckysheet.formula.data_parm_index;
                    }
                    else{
                        $editor = $(anchorOffset).closest("div");
                    }
                    var $span = $editor.find("span[rangeindex='" + luckysheet.formula.rangechangeindex + "']");

                    luckysheet.formula.setCaretPosition($span.get(0), 0, $span.html().length);
                }, 1);

                return;
            }
            else {
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheet_rows_selected_status = true;
            }
        }
        else {
            luckysheet_rows_selected_status = true;
        }

        if (luckysheet_rows_selected_status) {
            if(event.shiftKey){
                //按住shift点击行索引选取范围
                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]); //选区最后一个

                var top = 0, height = 0, rowseleted = [];
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

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;
            }
            else if(event.ctrlKey){
                luckysheet_select_save.push({ 
                    "left": luckysheet.colLocationByIndex(0)[0],
                    "width": luckysheet.colLocationByIndex(0)[1] - luckysheet.colLocationByIndex(0)[0] - 1,
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
                luckysheet_select_save = [];
                luckysheet_select_save.push({ 
                    "left": luckysheet.colLocationByIndex(0)[0],
                    "width": luckysheet.colLocationByIndex(0)[1] - luckysheet.colLocationByIndex(0)[0] - 1,
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

            luckysheet.selectHightlightShow();

            if(luckysheet.server.allowUpdate){
                //允许编辑后的后台更新时
                luckysheet.server.saveParam("mv", luckysheet.currentSheetIndex, luckysheet_select_save);
            }
        }

        $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));

        setTimeout(function () {
            clearTimeout(jfcountfuncTimeout);
            jfcountfunc();
        }, 101);
    }).mousemove(function (event) {
        if (luckysheet_rows_selected_status || luckysheet_rows_change_size || luckysheet_select_status) {
            $("#luckysheet-rows-h-hover").hide();
            return;
        }

        var mouse = mouseposition(event.pageX, event.pageY);
        var y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

        $("#luckysheet-rows-h-hover").css({ "top": row_pre, "height": row - row_pre - 1, "display": "block" });

        if (y < row - 1 && y >= row - 5) {
            $("#luckysheet-rows-change-size").css({ "top": row - 3, "opacity": 0 });
        }
        else {
            //$("#luckysheet-rows-change-size").hide();
            $("#luckysheet-rows-change-size").css("opacity", 0);
        }
    }).mouseleave(function (event) {
        $("#luckysheet-rows-h-hover").hide();
        //$("#luckysheet-rows-change-size").hide();
        $("#luckysheet-rows-change-size").css("opacity", 0);
    }).mouseup(function (event) {
        if (event.which == 3) {
            if(luckysheet.isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            $("#luckysheet-cols-rows-shift").hide();
            luckysheetRightHeadClickIs = "row";
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("行");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("高");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("上");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("下");

            $("#luckysheet-cols-rows-add").show();
            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-shift").hide();

            showrightclickmenu($("#luckysheet-rightclick-menu"), $(this).offset().left + 46, event.pageY);
            luckysheet_cols_menu_status = true;

            //行高默认值
            var cfg = $.extend(true, {}, config);
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            var first_rowlen = cfg["rowlen"][luckysheet_select_save[0].row[0]] == null ? luckysheet.defaultrowlen : cfg["rowlen"][luckysheet_select_save[0].row[0]];
            var isSame = true;

            for(var i = 0; i < luckysheet_select_save.length; i++){
                var s = luckysheet_select_save[i];
                var r1 = s.row[0], r2 = s.row[1];

                for(var r = r1; r <= r2; r++){
                    var rowlen = cfg["rowlen"][r] == null ? luckysheet.defaultrowlen : cfg["rowlen"][r];

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


    

    var luckysheet_cols_selected_status = false;
    $("#luckysheet-cols-h-c").mousedown(function (event) {
        //有批注在编辑时
        luckysheet.postil.removeActivePs();

        var mouse = mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $(this).scrollLeft();

        var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

        orderbyindex = col_index;//排序全局函数

        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

        //mousedown是右键
        if (event.which == "3") {
            var isright = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var obj_s = luckysheet_select_save[s];

                if(obj_s["column"] != null && (col_index >= obj_s["column"][0] && col_index <= obj_s["column"][1]) && (obj_s["row"][0] == 0 && obj_s["row"][1] == luckysheet.flowdata.length - 1)){
                    isright = true;
                    break;
                }
            }

            if(isright){
                return;
            }
        }

        var left = col_pre, width = col - col_pre - 1;
        var columnseleted = [col_index, col_index];

        // var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted , [0, row_index], luckysheet_select_save[luckysheet_select_save.length - 1], row_pre, row, left, width);
        // if(changeparam != null){
        //     columnseleted = changeparam[0];
        //     //rowseleted= changeparam[1];
        //     //top = changeparam[2];
        //     //height = changeparam[3];
        //     left = changeparam[4];
        //     width = changeparam[5];
        // }

        luckysheet_scroll_status = true;

        //公式相关
        var $input = $("#luckysheet-input-box");
        if (parseInt($input.css("top")) > 0) {

            if (luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton() || $("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")) {
                //公式选区
                var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, [0, row_index], {"row_focus": 0, "column_focus": col_index}, row_pre, row, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    //rowseleted= changeparam[1];
                    //top = changeparam[2];
                    //height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                if(event.shiftKey){
                    var last = luckysheet.formula.func_selectedrange;

                    var left = 0, width = 0, columnseleted = [];
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

                    var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted , [0, row_index], {"row_focus": 0, "column_focus": col_index}, row_pre, row, left, width);
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

                    luckysheet.formula.func_selectedrange = last;
                }
                else if(event.ctrlKey && $("#luckysheet-rich-text-editor").find("span").last().text() != ","){
                    //按住ctrl 选择选区时  先处理上一个选区
                    var vText = $("#luckysheet-rich-text-editor").text() + ",";
                    if(vText.length > 0 && vText.substr(0, 1) == "="){
                        vText = luckysheet.formula.functionHTMLGenerate(vText);

                        if (window.getSelection) { // all browsers, except IE before version 9
                            var currSelection = window.getSelection();
                            luckysheet.formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                        } 
                        else { // Internet Explorer before version 9
                            var textRange = document.selection.createRange();
                            luckysheet.formula.functionRangeIndex = textRange;
                        }

                        $("#luckysheet-rich-text-editor").html(vText);

                        luckysheet.formula.canceFunctionrangeSelected();
                        luckysheet.formula.createRangeHightlight();
                    }

                    luckysheet.formula.rangestart = false;
                    luckysheet.formula.rangedrag_column_start = false;
                    luckysheet.formula.rangedrag_row_start = false;

                    $("#luckysheet-functionbox-cell").html(vText);
                    luckysheet.formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                    //再进行 选区的选择
                    luckysheet.formula.israngeseleciton();
                    luckysheet.formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": luckysheet.rowLocationByIndex(0)[0], 
                        "height": luckysheet.rowLocationByIndex(0)[1] - luckysheet.rowLocationByIndex(0)[0] - 1, 
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
                    luckysheet.formula.func_selectedrange = {
                        "left": left, 
                        "width": width, 
                        "top": luckysheet.rowLocationByIndex(0)[0], 
                        "height": luckysheet.rowLocationByIndex(0)[1] - luckysheet.rowLocationByIndex(0)[0] - 1, 
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

                if(luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton()){
                    luckysheet.formula.rangeSetValue({ "row": [null, null], "column": columnseleted });
                }
                else if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){//if公式生成器
                    var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": [0, row_index], "column": columnseleted }, luckysheet.currentSheetIndex);
                    $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);
                }

                luckysheet.formula.rangedrag_column_start = true;
                luckysheet.formula.rangestart = false;
                luckysheet.formula.rangedrag_row_start = false;

                $("#luckysheet-formula-functionrange-select").css({ "left": left, "width": width, "top": row_pre, "height": row - row_pre - 1 }).show();
                $("#luckysheet-formula-help-c").hide();

                luckysheet.luckysheet_count_show(left, row_pre, width, row - row_pre - 1, [0, row_index], columnseleted);

                return;
            }
            else {
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheet_cols_selected_status = true;
            }
        }
        else {
            luckysheet_cols_selected_status = true;
        }

        if (luckysheet_cols_selected_status) {
            if(event.shiftKey){
                //按住shift点击列索引选取范围
                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]); //选区最后一个

                var left = 0, width = 0, columnseleted = [];
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

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;
            }
            else if(event.ctrlKey){
                //选区添加
                luckysheet_select_save.push({ 
                    "left": left, 
                    "width": width, 
                    "top": luckysheet.rowLocationByIndex(0)[0], 
                    "height": luckysheet.rowLocationByIndex(0)[1] - luckysheet.rowLocationByIndex(0)[0] - 1, 
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
                luckysheet_select_save = [];
                luckysheet_select_save.push({ 
                    "left": left, 
                    "width": width, 
                    "top": luckysheet.rowLocationByIndex(0)[0], 
                    "height": luckysheet.rowLocationByIndex(0)[1] - luckysheet.rowLocationByIndex(0)[0] - 1, 
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

            luckysheet.selectHightlightShow();

            if(luckysheet.server.allowUpdate){
                //允许编辑后的后台更新时
                luckysheet.server.saveParam("mv", luckysheet.currentSheetIndex, luckysheet_select_save);
            }
        }
        
        $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));

        setTimeout(function () {
            clearTimeout(jfcountfuncTimeout);
            jfcountfunc();
        }, 101);

        if (luckysheet_cols_menu_status) {
            $("#luckysheet-rightclick-menu").hide();
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            luckysheet_cols_menu_status = false;
        }
        event.stopPropagation();
    }).mousemove(function (event) {
        if (luckysheet_cols_selected_status || luckysheet_select_status) {
            $("#luckysheet-cols-h-hover").hide();
            $("#luckysheet-cols-menu-btn").hide();
            return;
        }

        if (luckysheet_cols_menu_status || luckysheet_cols_change_size) {
            return;
        }

        var mouse = mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();

        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

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
        if (luckysheet_cols_menu_status || luckysheet_cols_change_size) {
            return;
        }

        $("#luckysheet-cols-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        $("#luckysheet-cols-change-size").css("opacity", 0);
    }).mouseup(function (event) {
        if (event.which == 3) {
            if(luckysheet.isEditMode()){ //非编辑模式下禁止右键功能框
                return;
            }

            luckysheetRightHeadClickIs = "column";
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text("宽");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
            $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

            $("#luckysheet-cols-rows-add").show();
            $("#luckysheet-cols-rows-data").show();
            $("#luckysheet-cols-rows-shift").hide();

            showrightclickmenu($("#luckysheet-rightclick-menu"), event.pageX, $(this).offset().top + 18);
            luckysheet_cols_menu_status = true;

            //列宽默认值
            var cfg = $.extend(true, {}, config);
            if(cfg["columlen"] == null){
                cfg["columlen"] = {};
            }

            var first_collen = cfg["columlen"][luckysheet_select_save[0].column[0]] == null ? luckysheet.defaultcollen : cfg["columlen"][luckysheet_select_save[0].column[0]];
            var isSame = true;

            for(var i = 0; i < luckysheet_select_save.length; i++){
                var s = luckysheet_select_save[i];
                var c1 = s.column[0], c2 = s.column[1];

                for(var c = c1; c <= c2; c++){
                    var collen = cfg["columlen"][c] == null ? luckysheet.defaultcollen : cfg["columlen"][c];

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

    var luckysheet_cols_change_size = false, luckysheet_cols_change_size_start = [], luckysheet_cols_dbclick_timeout = null, luckysheet_cols_dbclick_times = 0;
    $("#luckysheet-cols-change-size").mousedown(function (event) {
        //有批注在编辑时
        luckysheet.postil.removeActivePs();

        $("#luckysheet-input-box").hide();
        $("#luckysheet-cols-change-size").css({ "opacity": 1 });

        var mouse = mouseposition(event.pageX, event.pageY);
        var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
        var scrollTop = $("#luckysheet-cell-main").scrollTop();
        var winH = $("#luckysheet-cell-main").height();
        var x = mouse[0] + scrollLeft;

        var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

        luckysheet_cols_change_size = true;
        luckysheet_scroll_status = true;
        $("#luckysheet-change-size-line").css({ "height": winH + scrollTop, "border-width": "0 1px 0 0", "top": 0, "left": col - 3, "width": "1px", "display": "block", "cursor": "ew-resize" });
        $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "ew-resize");
        luckysheet_cols_change_size_start = [col_pre, col_index];
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-cols-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        luckysheet_cols_dbclick_times = 0;
        event.stopPropagation();
    }).dblclick(function () {
        luckysheetcolsdbclick();
        // console.log(luckysheet_cols_dbclick_times, luckysheet_cols_dbclick_timeout);
        // luckysheet_cols_dbclick_times += 1;
        // if(luckysheet_cols_dbclick_times>=2){
        // 	luckysheet_cols_dbclick_times = 0;
        // 	luckysheetcolsdbclick();
        // 	clearTimeout(luckysheet_cols_dbclick_timeout);
        // }

        // luckysheet_cols_dbclick_timeout = setTimeout(function(){
        // 	luckysheet_cols_dbclick_times = 0;
        // }, 300);
    })


    function luckysheetcolsdbclick() {
        luckysheet_cols_change_size = false;
        //$("#luckysheet-change-size-line, #luckysheet-cols-change-size").hide();
        $("#luckysheet-change-size-line").hide();
        $("#luckysheet-cols-change-size").css("opacity", 0);
        $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "default");

        var mouse = mouseposition(event.pageX, event.pageY);
        var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
        var x = mouse[0] + scrollLeft;
        var winW = $(window).width();

        var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];
        //console.log(luckysheet_select_save["column"], col_index, luckysheet_select_save["column"][0], col_index, luckysheet_select_save["column"][1]);
        luckysheet_cols_change_size_start = [col_pre, col_index];
        var dataflow = $("#luckysheetTableContent").get(0).getContext("2d");
        var cfg = $.extend(true, {}, config);

        var matchColumn = {};
        for(var s = 0; s < luckysheet_select_save.length; s++){
            var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

            if (col_index < c1 || col_index > c2) {
                if(col_index in matchColumn){//此列已计算过
                    continue;
                }

                x = -Infinity;
                var countret = 0;
                var fontsize = 13;
                for (var r = 0; r < luckysheet.flowdata.length; r++) {
                    if (countret >= 15) {
                        break;
                    }

                    var value = luckysheet.getcellvalue(r, luckysheet_cols_change_size_start[1], luckysheet.flowdata);
                    var mask = luckysheet.getcellvalue(r, luckysheet_cols_change_size_start[1], luckysheet.flowdata, "m");

                    if(mask != null){
                        value = mask;
                    }

                    var cell = luckysheet.flowdata[r][luckysheet_cols_change_size_start[1]];
                    if(luckysheet.getObjType(cell) == "object" && ("fs" in cell)){
                        if(cell.fs > fontsize){
                            fontsize = cell.fs;
                        }
                    }

                    if (value == null || value.toString().length == 0) {
                        countret++;
                        continue;
                    }
                    var textMetrics = dataflow.measureText(value).width;
                    if (textMetrics > x) {
                        x = textMetrics;
                    }
                }

                var size = x + fontsize * 1.5;
                if ((x + 3) < 30) {
                    size = 30;
                }

                if (x >= winW - 100 + scrollLeft) {
                    size = winW - 100 + scrollLeft;
                }

                if (cfg["columlen"] == null) {
                    cfg["columlen"] = {};
                }

                cfg["columlen"][luckysheet_cols_change_size_start[1]] = Math.ceil(size);

                matchColumn[col_index] = 1;
            }
            else {
                for (var c = c1; c <= c2; c++) {
                    if(c in matchColumn){//此列已计算过
                        continue;
                    }

                    x = -Infinity;
                    var countret = 0;
                    var fontsize = 13;
                    for (var r = 0; r < luckysheet.flowdata.length; r++) {
                        if (countret >= 15) {
                            break;
                        }
                        var value = luckysheet.getcellvalue(r, c, luckysheet.flowdata);

                        var cell = luckysheet.flowdata[r][c];
                        if(luckysheet.getObjType(cell) == "object" && ("fs" in cell)){
                            if(cell.fs > fontsize){
                                fontsize = cell.fs;
                            }
                        }

                        if (luckysheet.func_methods.isRealNull(value)) {
                            countret++;
                            continue;
                        }

                        var textMetrics = dataflow.measureText(value).width;
                        if (textMetrics > x) {
                            x = textMetrics;
                        }
                    }

                    var size = x + fontsize*1.5;;
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

        // if (luckysheet_select_save[0]["column"] == null || col_index < luckysheet_select_save[0]["column"][0] || col_index > luckysheet_select_save[0]["column"][1]) {
        //     x = -Infinity;
        //     var countret = 0;
        //     var fontsize = 13;
        //     for (var r = 0; r < luckysheet.flowdata.length; r++) {
        //         if (countret >= 15) {
        //             break;
        //         }

        //         var value = luckysheet.getcellvalue(r, luckysheet_cols_change_size_start[1], luckysheet.flowdata);
        //         var mask = luckysheet.getcellvalue(r, luckysheet_cols_change_size_start[1], luckysheet.flowdata, "m");

        //         if(mask != null){
        //             value = mask;
        //         }

        //         var cell = luckysheet.flowdata[r][luckysheet_cols_change_size_start[1]];
        //         if((cell instanceof Object) && "fs" in cell){
        //             if(cell.fs > fontsize){
        //                 fontsize = cell.fs;
        //             }
        //         }

        //         if (value == null || value.toString().length == 0) {
        //             countret++;
        //             continue;
        //         }
        //         var textMetrics = dataflow.measureText(value).width;
        //         if (textMetrics > x) {
        //             x = textMetrics;
        //         }
        //     }

        //     var size = x + fontsize*1.5;
        //     if ((x + 3) < 30) {
        //         size = 30;
        //     }

        //     if (x >= winW - 100 + scrollLeft) {
        //         size = winW - 100 + scrollLeft;
        //     }

        //     if (cfg["columlen"] == null) {
        //         cfg["columlen"] = {};
        //     }

        //     cfg["columlen"][luckysheet_cols_change_size_start[1]] = Math.ceil(size);
        // }
        // else {
        //     for (var c = luckysheet_select_save[0]["column"][0]; c <= luckysheet_select_save[0]["column"][1]; c++) {
        //         x = -Infinity;
        //         var countret = 0;
        //         var fontsize = 13;
        //         for (var r = 0; r < luckysheet.flowdata.length; r++) {
        //             if (countret >= 15) {
        //                 break;
        //             }
        //             var value = luckysheet.getcellvalue(r, c, luckysheet.flowdata);

        //             var cell = luckysheet.flowdata[r][c];
        //             if((cell instanceof Object) && "fs" in cell){
        //                 if(cell.fs > fontsize){
        //                     fontsize = cell.fs;
        //                 }
        //             }

        //             if (value==null || value.toString().length == 0) {
        //                 countret++;
        //                 continue;
        //             }

        //             var textMetrics = dataflow.measureText(value).width;
        //             if (textMetrics > x) {
        //                 x = textMetrics;
        //             }
        //         }

        //         var size = x + fontsize*1.5;;
        //         if ((x + 3) < 30) {
        //             size = 30;
        //         }

        //         if (x >= winW - 100 + scrollLeft) {
        //             size = winW - 100 + scrollLeft;
        //         }

        //         if (cfg["columlen"] == null) {
        //             cfg["columlen"] = {};
        //         }
        //         cfg["columlen"][c] = Math.ceil(size);
        //     }
        // }
        //console.log(luckysheet.flowdata[0].length, luckysheet.flowdata.length, luckysheet.flowdata);
        luckysheet.jfrefreshgridall(luckysheet.flowdata[0].length, luckysheet.flowdata.length, luckysheet.flowdata, cfg, luckysheet_select_save, "resizeC", "columlen");

        //console.log($("luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length);
        // if ($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length > 0) {
        //     var $t = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).find(".luckysheet-filter-options").eq(0);
        //     var st_r = $t.data("str"), ed_r = $t.data("edr"), cindex = $t.data("cindex"), st_c = $t.data("stc"), ed_c = $t.data("edc");
        //     //console.log(st_r, ed_r, st_c, ed_c);
        //     luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
        // }

        //luckysheet.cleargridelement();
    }

    var luckysheet_rows_change_size = false, luckysheet_rows_change_size_start = [];
    $("#luckysheet-rows-change-size").mousedown(function (event) {
        //有批注在编辑时
        luckysheet.postil.removeActivePs();
        
        $("#luckysheet-input-box").hide();
        $("#luckysheet-rows-change-size").css({ "opacity": 1 });

        var mouse = mouseposition(event.pageX, event.pageY);
        var y = mouse[1] + $("#luckysheet-rows-h").scrollTop();

        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        var winW = $("#luckysheet-cell-main").width();

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

        luckysheet_rows_change_size = true;
        luckysheet_scroll_status = true;
        $("#luckysheet-change-size-line").css({ "height": "1px", "border-width": "0 0px 1px 0", "top": row - 3, "left": 0, "width": scrollLeft + winW, "display": "block", "cursor": "ns-resize" });
        $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "ns-resize");
        luckysheet_rows_change_size_start = [row_pre, row_index];
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-rows-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        event.stopPropagation();
    });

    //改为全局变量
    window.luckysheet_cols_menu_status = false;
    $("#luckysheet-cols-menu-btn").click(function (event) {
        var $menu = $("#luckysheet-rightclick-menu");
        var offset = $(this).offset();
        //console.log(offset);
        $("#luckysheet-cols-rows-shift").show();
        luckysheetRightHeadClickIs = "column";
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text("列");
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text("左");
        $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text("右");

        $("#luckysheet-cols-rows-add").show();
        $("#luckysheet-cols-rows-data").hide();
        $("#luckysheet-cols-rows-shift").show();

        showrightclickmenu($menu, offset.left, offset.top + 18);
        luckysheet_cols_menu_status = true;
    });

    var orderbyindex = 0;
    $("#luckysheetorderbyasc, #luckysheetorderbyasc_t").mousedown(function (event) {
        luckysheet.cleargridelement(event);
        luckysheet.sortColumnSeletion(orderbyindex, true);
        luckysheet.selectHightlightShow();
    });

    $("#luckysheetorderbydesc, #luckysheetorderbydesc_t").click(function (event) {
        luckysheet.cleargridelement(event);
        luckysheet.sortColumnSeletion(orderbyindex, false);
        luckysheet.selectHightlightShow();
    });

    //右键功能键

    //复制为json格式字符串，首行为标题
    $("#luckysheet-copy-json-head").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");   
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }

        if (getdata.length == 1) {
            var obj = {};
            for (var i = 0; i < getdata[0].length; i++) {
                obj[luckysheet.getcellvalue(0, i, getdata)] = "";
            }
            arr.push(obj);
        }
        else {
            for (var r = 1; r < getdata.length; r++) {
                var obj = {};
                for (var c = 0; c < getdata[0].length; c++) {
                    if(luckysheet.getcellvalue(0, c, getdata) == undefined){
                        obj[""] = luckysheet.getcellvalue(r, c, getdata);
                    }else{
                        obj[luckysheet.getcellvalue(0, c, getdata)] = luckysheet.getcellvalue(r, c, getdata);
                    }
                }
                arr.push(obj);
            }
        }
        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为json格式字符串，无标题，采用ABCD作为标题
    $("#luckysheet-copy-json-nohead").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }
        var st = luckysheet_select_save[0]["column"][0];
        for (var r = 0; r < getdata.length; r++) {
            var obj = {};
            for (var c = 0; c < getdata[0].length; c++) {
                obj[luckysheet.luckysheetchatatABC(c + st)] = luckysheet.getcellvalue(r, c, getdata);
            }
            arr.push(obj);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为一维数组
    $("#luckysheet-copy-array1").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (var r = 0; r < getdata.length; r++) {
            for (var c = 0; c < getdata[0].length; c++) {
                arr.push(luckysheet.getcellvalue(r, c, getdata));
            }
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为二维数组
    $("#luckysheet-copy-array2").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (var r = 0; r < getdata.length; r++) {
            var a = [];
            for (var c = 0; c < getdata[0].length; c++) {
                a.push(luckysheet.getcellvalue(r, c, getdata));
            }
            arr.push(a);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为多维数组
    $("#luckysheet-copy-arraymore-confirm").click(function (event) {
        $("body .luckysheet-cols-menu").hide();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }

        for (var r = 0; r < getdata.length; r++) {
            for (var c = 0; c < getdata[0].length; c++) {
                arr.push(getdata[r][c]);
            }
        }

        var row = $("#luckysheet-copy-arraymore-row").val(), col = $("#luckysheet-copy-arraymore-col").val();

        if (row == "" && col == "") {
            luckysheet.selection.copybyformat(event, JSON.stringify(arr));
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
            if(luckysheet.isEditMode()){
                alert("请输入正确的数值!");
            }
            else{
                luckysheet.tooltip.info("请输入正确的数值!", "");
            }
            return;
        }

        if(row < 1 || col < 1){
            if(luckysheet.isEditMode()){
                alert("行列数不能小于1!");
            }
            else{
                luckysheet.tooltip.info("行列数不能小于1!", "");
            }
            return;
        }

        var arrlen = arr.length, i = 0, ret = [];
        for (var r = 0; r < row; r++) {
            var a = [];
            for (var c = 0; c < col; c++) {
                a.push(arr[i++]);
                if (i >= arrlen) {
                    luckysheet.selection.copybyformat(event, JSON.stringify(ret));
                    $("body .luckysheet-cols-menu").hide();
                    return;
                }
            }
            ret.push(a);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(ret));
    });

    //复制为对角线
    $("#luckysheet-copy-diagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }

        var clen = getdata[0].length;
        for (var r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][r]);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
        copyType = "diagonal";
        copysetting = [];
    });

    //复制为反对角线
    $("#luckysheet-copy-antidiagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }

        var clen = getdata[0].length;
        for (var r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][clen - r - 1]);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
        copyType = "antidiagonal";
        copysetting = [];
    });

    //复制为对角偏移n列
    $("#luckysheet-copy-diagonaloffset").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }

        var clen = getdata[0].length, offset = parseInt($("#luckysheet-copy-diagonaloffset-value").val());

        if(offset.toString() == "NaN"){
            if(luckysheet.isEditMode()){
                alert("请输入正确的数值！");
            }
            else{
                luckysheet.tooltip.info("请输入正确的数值！", "");
            }
            return;
        }

        if(offset < 0){
            if(luckysheet.isEditMode()){
                alert("偏移列不能为负数！");
            }
            else{
                luckysheet.tooltip.info("偏移列不能为负数！", "");
            }
            return;
        }

        if (offset == null) {
            offset = 1;
        }

        var clen = getdata[0].length;
        for (var r = 0; r < getdata.length; r++) {
            console.log(r, offset, clen);
            if (r + offset >= clen) {
                break;
            }
            arr.push(getdata[r][r + offset]);
        }

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
        copyType = "diagonaloffset";
        copysetting = [offset];
    });

    //复制为布尔值
    $("#luckysheet-copy-boolvalue").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(config["merge"] != null){
            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                if(hasPartMC){
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                }
                return;    
            }
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        var arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (var r = 0; r < getdata.length; r++) {
            var a = [];
            for (var c = 0; c < getdata[0].length; c++) {
                var bool = false;

                if(luckysheet.getObjType(getdata[r][c]) == "object"){
                    var v = getdata[r][c].v;
                }
                else{
                    var v = getdata[r][c];
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

        luckysheet.selection.copybyformat(event, JSON.stringify(arr));
        copyType = "boolvalue";
        copysetting = [];
    });

    //矩阵操作选区 翻转 上下
    $("#luckysheet-matrix-turn-up").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        for (var r = getdata.length - 1; r >= 0; r--) {
            var a = [];
            for (var c = 0; c < getdata[0].length; c++) {
                var value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 左右
    $("#luckysheet-matrix-turn-left").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        for (var r = 0; r < getdata.length; r++) {
            var a = [];
            for (var c = getdata[0].length - 1; c >= 0; c--) {
                var value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 顺时针
    $("#luckysheet-matrix-turn-cw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        for (var c = 0; c < getdata[0].length; c++) {
            var a = [];
            for (var r = getdata.length - 1; r >= 0; r--) {
                var value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandlerD(arr);
    });

    //矩阵操作选区 翻转 逆时针
    $("#luckysheet-matrix-turn-anticw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        var arr = [];
        for (var c = getdata[0].length - 1; c >= 0; c--) {
            var a = [];
            for (var r = 0; r < getdata.length; r++) {
                var value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandlerD(arr);
    });

    //矩阵操作选区 转置
    $("#luckysheet-matrix-turn-trans").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        for (var c = 0; c < getdata[0].length; c++) {
            var a = [];
            for (var r = 0; r < getdata.length; r++) {
                var value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandlerD(arr);
    });

    var jfnqrt = function (x, p) {
        if (x == 0)
            return 0;
        var x0, x1;
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
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var caltype = $("#luckysheet-matrix-cal-type").val(), 
            calvalue = parseInt($("#luckysheet-matrix-cal-value").val());

        if(calvalue.toString() == "NaN"){
            if(luckysheet.isEditMode()){
                alert("请输入正确的数值！");
            }
            else{
                luckysheet.tooltip.info("请输入正确的数值！", "");
            }
            return;
        }

        if (calvalue == null) {
            calvalue = 2;
        }

        var arr = [];

        for (var r = 0; r < getdata.length; r++) {
            var a = [];

            for (var c = 0; c < getdata[0].length; c++) {
                var value = "";
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
                            value.v = luckysheet.numFormat(value.v / calvalue, 4);
                        }
                        else if (caltype == "power") {
                            value.v = Math.pow(value.v, calvalue);
                        }
                        else if (caltype == "root") {
                            if (calvalue == 2) {
                                value.v = luckysheet.numFormat(Math.sqrt(value.v), 4);
                            }
                            else if (calvalue == 3 && Math.cbrt) {
                                value.v = luckysheet.numFormat(Math.cbrt(value.v), 4);
                            }
                            else {
                                value.v = luckysheet.numFormat(jfnqrt(value.v, calvalue), 4);
                            }
                        }
                        else if (caltype == "log") {
                            value.v = luckysheet.numFormat(Math.log(value.v) * 10000 / Math.log(Math.abs(calvalue)), 4);
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

        luckysheet.editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按行
    $("#luckysheet-matrix-delezero-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        var arr = [];
        var getdatalen = getdata[0].length;
        for (var r = 0; r < getdata.length; r++) {
            var a = [], stdel = true, eddel = true;
            for (var c = 0; c < getdatalen; c++) {
                var value = "";
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

            var a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (var c = a.length - 1; c >= 0; c--) {
                    var value = "";
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

                var l = getdatalen - a1.length;
                for (var c1 = 0; c1 < l; c1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        luckysheet.editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按列
    $("#luckysheet-matrix-delezero-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        var getdatalen = getdata.length, collen = getdata[0].length;
        for (var c = 0; c < collen; c++) {
            var a = [], stdel = true, eddel = true;
            for (var r = 0; r < getdatalen; r++) {
                var value = "";
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

            var a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (var r = a.length - 1; r >= 0; r--) {
                    var value = "";
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

                var l = getdatalen - a1.length;
                for (var r1 = 0; r1 < l; r1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        var arr1 = [];
        for (var c = 0; c < arr[0].length; c++) {
            var a = [];
            for (var r = 0; r < arr.length; r++) {
                var value = "";
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        luckysheet.editor.controlHandler(arr1);
    });

    //矩阵操作选区 删除重复值 按行
    $("#luckysheet-matrix-delerpt-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        var getdatalen = getdata[0].length;
        for (var r = 0; r < getdata.length; r++) {
            var a = [], repeat = {};

            for (var c = 0; c < getdatalen; c++) {
                var value = null;
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

            for (var c = 0; c < getdatalen; c++) {
                var value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            var l = getdatalen - a.length;
            for (var c1 = 0; c1 < l; c1++) {
                a.push(null);
            }
            arr.push(a);
        }

        luckysheet.editor.controlHandler(arr);
    });

    //矩阵操作选区 删除重复值 按列
    $("#luckysheet-matrix-delerpt-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选定区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选定区域执行此操作，请选择单个区域，然后再试", "");
            }
            return;
        }

        var getdata = luckysheet.getdatabyselection(luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        var arr = [];
        var getdatalen = getdata.length, collen = getdata[0].length;
        for (var c = 0; c < collen; c++) {
            var a = [], repeat = {};

            for (var r = 0; r < getdatalen; r++) {
                var value = null;
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

            for (var r = 0; r < getdatalen; r++) {
                var value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            a1 = a;
            var l = getdatalen - a1.length;
            for (var r1 = 0; r1 < l; r1++) {
                a1.push(null);
            }
            arr.push(a1);
        }

        var arr1 = [];
        for (var c = 0; c < arr[0].length; c++) {
            var a = [];
            for (var r = 0; r < arr.length; r++) {
                var value = null;
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        luckysheet.editor.controlHandler(arr1);
    });

    $("#luckysheet-icon-undo").click(function (event) {
        luckysheet.controlHistory.redo(event);
    });

    $("#luckysheet-icon-redo").click(function (event) {
        luckysheet.controlHistory.undo(event);
    });

    var isInitialSheetConfig = false, luckysheetcurrentSheetitem = null, jfdbclicklagTimeout = null;

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
                    var $input = $(this);
                    if (color != null) {
                        color = color.toHexString();
                    }
                    else {
                        color = "rgb(0, 0, 0)";
                    }

                    var oldcolor = null;
                    if(luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").length>0){
                        oldcolor = luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").css("background-color");
                    }

                    luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").remove();
                    luckysheetcurrentSheetitem.append('<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + color + ';"></div>');
                    var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
                    luckysheetfile[index].color = color;
                    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, color, { "k": "color" });

                    if (clearjfundo) {
                        var redo = {};
                        redo["type"] = "sheetColor";
                        redo["sheetIndex"] = luckysheet.currentSheetIndex;
                        
                        redo["oldcolor"] = oldcolor;
                        redo["color"] = color;
                        
                        luckysheet.jfundo = [];
                        luckysheet.jfredo.push(redo);
                    }
                }
            });

            $("#luckysheetsheetconfigcolorreset").click(function () {
                var oldcolor = null;
                if(luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").length>0){
                    oldcolor = luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").css("background-color");
                }

                luckysheetcurrentSheetitem.find(".luckysheet-sheets-item-color").remove();
                var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
                luckysheetfile[index].color = null;
                luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, null, { "k": "color" } );

                if (clearjfundo) {
                    var redo = {};
                    redo["type"] = "sheetColor";
                    redo["sheetIndex"] = luckysheet.currentSheetIndex;
                    
                    redo["oldcolor"] = oldcolor;
                    redo["color"] = null;

                    luckysheet.jfundo = [];
                    luckysheet.jfredo.push(redo);
                }
            });
        }

        var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
        if (luckysheetfile[index].color != null && luckysheetfile[index].color.length > 0) {
            $("#luckysheetsheetconfigcolorur").spectrum("set", luckysheetfile[index].color);

        }

        //showrightclickmenu($("#luckysheet-rightclick-sheet-menu"), luckysheetcurrentSheetitem.offset().left + 46, event.pageY);
        $("#luckysheetsheetconfigcolorur").parent().find("span, div, button, input, a").addClass("luckysheet-mousedown-cancel");
        setTimeout(function(){
            mouseclickposition($("#luckysheet-rightclick-sheet-menu"), luckysheetcurrentSheetitem.offset().left + luckysheetcurrentSheetitem.width(), luckysheetcurrentSheetitem.offset().top - 18, "leftbottom");
        },1);
        
    }


    var luckysheetsheetrightclick = function ($t, $cur, e) {
        //var $t = $(this), $cur = $(e.target);
        clearTimeout(jfdbclicklagTimeout);
        //console.log($cur, $cur.hasClass("luckysheet-sheets-item-name"), $cur.attr("contenteditable"));
        if ($cur.hasClass("luckysheet-sheets-item-name") && $cur.attr("contenteditable") == "true") {
            return;
        }
        if (luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start || luckysheet.formula.israngeseleciton()) {
            //luckysheet.formula.rangeSetValue({ "row": [row_index, row_index], "column": [col_index, col_index] });
            //luckysheet.formula.rangestart = true;
            //this.rangeSetValueTo.parent();

            setTimeout(function () {
                luckysheet.formula.setCaretPosition(luckysheet.formula.rangeSetValueTo.get(0), 0, luckysheet.formula.rangeSetValueTo.text().length);
                luckysheet.formula.createRangeHightlight();
                $("#luckysheet-input-box-index").find(".luckysheet-input-box-index-sheettxt").remove().end().prepend("<span class='luckysheet-input-box-index-sheettxt'>" + luckysheet.sheetmanage.getSheetName(luckysheet.formula.rangetosheet) + "!</span>").show();
                $("#luckysheet-input-box-index").css({"left": $("#luckysheet-input-box").css("left"), "top": (parseInt($("#luckysheet-input-box").css("top")) - 20) + "px", "z-index": $("#luckysheet-input-box").css("z-index")});
            }, 1);
            //$("#luckysheet-formula-functionrange-select").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1 }).show();
        }
        else {
            $("#luckysheet-input-box").removeAttr("style");
            $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove();
        }

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $t.addClass("luckysheet-sheets-item-active");
        luckysheet.cleargridelement(e);
        luckysheet.sheetmanage.changeSheet($t.data("index"));
        //$("#luckysheet-input-box").hide();
        //console.log(luckysheet.formula.rangestart);


        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if ($cur.hasClass("luckysheet-sheets-item-menu") || $cur.hasClass("fa-sort-desc") || e.which == "3") {
            luckysheetcurrentSheetitem = $cur.closest(".luckysheet-sheets-item");
            showsheetconfigmenu();
        }
    }

    $("#luckysheet-sheet-area").on("mousedown", "div.luckysheet-sheets-item", function (e) {
        if(luckysheet.isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        var $t = $(this), $cur = $(e.target), $item = $cur.closest(".luckysheet-sheets-item");

        if (e.which == "3") {
            luckysheetsheetrightclick($t, $cur, e);
            luckysheetcurrentSheetitem = $item;
            showsheetconfigmenu();

            return;
        }

        if ($item.hasClass("luckysheet-sheets-item-active") && $item.find(".luckysheet-sheets-item-name").attr("contenteditable") == "false") {
            jfdbclicklagTimeout = setTimeout(function () {
                luckysheet_sheet_move_status = true;
                luckysheet_sheet_move_data = {};
                luckysheet_sheet_move_data.widthlist = [];
                
                $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function (i) {
                    if (i == 0) {
                        luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                    }
                    else {
                        luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()) + luckysheet_sheet_move_data.widthlist[i - 1]);
                    }
                });

                luckysheet_sheet_move_data.curindex = $("#luckysheet-sheet-area div.luckysheet-sheets-item").index($item);
                var x = e.pageX;
                luckysheet_sheet_move_data.curleft = x - $item.offset().left;
                luckysheet_sheet_move_data.pageX = x;
                luckysheet_sheet_move_data.activeobject = $item;
                luckysheet_sheet_move_data.cursorobject = $cur;
                var $itemclone = $item.clone().css("visibility", "hidden").attr("id", "luckysheet-sheets-item-clone");
                $item.after($itemclone);
                $item.css({ "position": "absolute", "opacity": 0.8, "cursor": "move", "transition": "initial", "z-index": 10 });
                //$cur.css({ "cursor": "move" });
            }, 200);
        }
    }).on("click", "div.luckysheet-sheets-item", function (e) {
        if(luckysheet.isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }
        
        var $t = $(this), $cur = $(e.target);
        luckysheetsheetrightclick($t, $cur, e);
    });


    var luckysheetsheetnameeditor = function ($t) {
        //var $t = $(this);
        $t.attr("contenteditable", "true").addClass("luckysheet-mousedown-cancel").data("oldtxt", $t.text());

        setTimeout(function () {
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText($t.get(0));
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
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
        var $t = $(this);
        var txt = $t.text(), oldtxt = $t.data("oldtxt");
        var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
        for (var i = 0; i < luckysheetfile.length; i++) {
            if (index != i && luckysheetfile[i].name == txt) {
                if(luckysheet.isEditMode()){
                    alert("标签页的名称不能重复！请重新修改");
                }
                else{
                    luckysheet.tooltip.info("提示", "标签页的名称不能重复！请重新修改");
                }
                $t.text(oldtxt).attr("contenteditable", "false");
                return;
            }
        }

        var winW = $(window).width();

        var c_width = 0;
        $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible").each(function(){
            c_width += $(this).outerWidth();
        });

        if (c_width >= winW * 0.7) {
            $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
            $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        }

        luckysheetfile[index].name = txt;
        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, txt, { "k": "name" });

        $t.attr("contenteditable", "false").removeClass("luckysheet-mousedown-cancel");

        if (clearjfundo) {
            var redo = {};
            redo["type"] = "sheetName";
            redo["sheetIndex"] = luckysheet.currentSheetIndex;
            
            redo["oldtxt"] = oldtxt;
            redo["txt"] = txt;

            luckysheet.jfundo = [];
            luckysheet.jfredo.push(redo);
        }
    });

    $("#luckysheet-sheet-area").on("keydown", "span.luckysheet-sheets-item-name", function (e) {
        var kcode = e.keyCode;
        var $t = $(this);
        if (kcode == keycode.ENTER) {
            var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
            luckysheetfile[index].name = $t.text();
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
        //var oldorders = luckysheet.sheetmanage.getCurrentOrder();
        if (luckysheetcurrentSheetitem.prevAll(":visible").length > 0) {
            luckysheetcurrentSheetitem.insertBefore(luckysheetcurrentSheetitem.prevAll(":visible").eq(0));
            luckysheet.sheetmanage.reOrderAllSheet();
        }
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
        //var orders = luckysheet.sheetmanage.getCurrentOrder();

        // if (clearjfundo) {
        //     var redo = {};
        //     redo["type"] = "sheetorder";
        //     luckysheet.jfundo = [];
        //     redo["oldorders"] = oldorders;
        //     redo["orders"] = orders;
        //     luckysheet.jfredo.push(redo);
        // }
    });

    $("#luckysheetsheetconfigmoveright").click(function () {
        if (luckysheetcurrentSheetitem.nextAll(":visible").length > 0) {
            luckysheetcurrentSheetitem.insertAfter(luckysheetcurrentSheetitem.nextAll(":visible").eq(0));
            luckysheet.sheetmanage.reOrderAllSheet();
        }
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfigdelete").click(function (e) {
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if($("#luckysheet-sheet-container-c .luckysheet-sheets-item:visible").length <= 1){
            if(luckysheet.isEditMode()){
                alert("工作薄内至少含有一张可视工作表。若需删除选定的工作表，请先插入一张新工作表或显示一张隐藏的工作表。");
            }
            else{
                luckysheet.tooltip.info("工作薄内至少含有一张可视工作表。若需删除选定的工作表，请先插入一张新工作表或显示一张隐藏的工作表。", "");
            }

            return;
        }

        var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);

        luckysheet.tooltip.confirm("是否删除【" + luckysheetfile[index].name + "】？", "<span style='color:#9e9e9e;font-size:12px;'>可以通过Ctrl+Z撤销删除</span>", function () {
            luckysheet.sheetmanage.deleteSheet(luckysheetcurrentSheetitem.data("index"));
        }, null);
        
        $("#luckysheet-input-box").removeAttr("style");
    });


    $("#luckysheetsheetconfigcopy").click(function (e) {
        //var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
        luckysheet.sheetmanage.copySheet(luckysheetcurrentSheetitem.data("index"), e);
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheetsheetconfighide").click(function () {
        if ($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").length == 1) {
            if(luckysheet.isEditMode()){
                alert("不能隐藏, 至少保留一个sheet标签");
            }
            else{
                luckysheet.tooltip.info("不能隐藏", "至少保留一个sheet标签");
            }
            return;
        }
        luckysheet.sheetmanage.setSheetHide(luckysheetcurrentSheetitem.data("index"));
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });


    $("#luckysheet-sheets-add").click(function (e) {
        luckysheet.sheetmanage.addNewSheet(e);

        luckysheet.sheetmanage.locationSheet();
        // var $c = $("#luckysheet-sheet-container-c"), c_width = $c.width(), winW = $("#"+container).width();
        // $c.scrollLeft(100000000000);

        // if (c_width + $c.scrollLeft() >= winW * 0.7) {
        //     //console.log(c_width, $c.scrollLeft(), winW * 0.7);
        //     $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
        //     $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        // }
        //$("#luckysheet-input-box").hide();
        $("#luckysheet-input-box").removeAttr("style");
    });

    var sheetscrollani = null, sheetscrollstart = 0, sheetscrollend = 0, sheetscrollstep = 150;
    $("#luckysheet-sheets-leftscroll").click(function () {
        var $c = $("#luckysheet-sheet-container-c");
        sheetscrollstart = $c.scrollLeft();
        sheetscrollend = $c.scrollLeft() - sheetscrollstep;
        if (sheetscrollend <= 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
        }
        $("#luckysheet-sheet-container .docs-sheet-fade-right").show();
        clearInterval(sheetscrollani);
        sheetscrollani = setInterval(function () {
            //console.log(sheetscrollstart, sheetscrollend);
            sheetscrollstart -= 4;
            $c.scrollLeft(sheetscrollstart);
            if (sheetscrollstart <= sheetscrollend) {
                clearInterval(sheetscrollani);
            }
        }, 1);

    });


    $("#luckysheet-sheets-rightscroll").click(function () {
        var $c = $("#luckysheet-sheet-container-c");
        sheetscrollstart = $c.scrollLeft();
        sheetscrollend = $c.scrollLeft() + sheetscrollstep;
        if (sheetscrollstart > 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").hide();
        }
        $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        clearInterval(sheetscrollani);
        sheetscrollani = setInterval(function () {
            //console.log(sheetscrollstart, sheetscrollend);
            sheetscrollstart += 4;
            $c.scrollLeft(sheetscrollstart);
            if (sheetscrollstart >= sheetscrollend) {
                clearInterval(sheetscrollani);
            }
        }, 1);

    });

    var initialOpenSheet = true;
    $("#luckysheet-sheets-m").click(function (e) {

        $("#luckysheet-sheet-list").html("");

        var item = "";
        for (var i = 0; i < luckysheetfile.length; i++) {
            var f = luckysheetfile[i], icon = '', style = "";
            //console.log(f.status);
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

            item += luckysheet.replaceHtml(sheetselectlistitemHTML, { "index": f["index"], "name": f["name"], "icon": icon, "style": style });
        }

        if (initialOpenSheet) {
            $("#" + container).append(luckysheet.replaceHtml(sheetselectlistHTML, { "item": item }));
            $("#luckysheet-sheet-list").on("click", ".luckysheet-cols-menuitem", function (e) {
                if(luckysheet.isEditMode()){
                    // luckysheet.tooltip.info("提示", "图表编辑模式下不允许该操作！");
                    alert("图表编辑模式下不允许该操作！");
                    return;
                }

                var $item = $(this), index = $item.data("index");

                if ($item.data("index") != luckysheet.currentSheetIndex) {
                    luckysheet.sheetmanage.setSheetShow(index);

                    luckysheet.sheetmanage.locationSheet();
                }
            });
            initialOpenSheet = false;
        }
        else {
            $("#luckysheet-sheet-list").html(item);
        }

        $t = $("#luckysheet-sheet-list");

        //$t.find("span.icon").html("");
        //$("#luckysheet-sheet-btn" + luckysheet.currentSheetIndex + " span.icon").html('<i class="fa fa-check" aria-hidden="true"></i>');

        mouseclickposition($t, $(this).offset().left, $(this).offset().top - 12, "leftbottom");
        //$("#luckysheet-input-box").hide();
        $("#luckysheet-input-box").removeAttr("style");
        //$t.css({"left":"", "top":"", "display":"block"});
    });

    var luckysheetextendtable = function (type, index, value, direction) {
        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];

        value = Math.floor(value);
        var cfg = $.extend(true, {}, config);

        //合并单元格配置变动
        if(cfg["merge"] == null){
            cfg["merge"] = {};
        }

        var merge_new = {};
        for(var m in cfg["merge"]){
            var mc = cfg["merge"][m];

            var r = mc.r,
                c = mc.c,
                rs = mc.rs,
                cs = mc.cs;

            if(type == "row"){
                if(index < r){
                    merge_new[(r + value) + "_" + c] = { "r": r + value, "c": c, "rs": rs, "cs": cs };
                }
                else if(index == r){
                    if(direction == "lefttop"){
                        merge_new[(r + value) + "_" + c] = { "r": r + value, "c": c, "rs": rs, "cs": cs };
                    }
                    else{
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs + value, "cs": cs };
                    }
                }
                else if(index < r + rs - 1){
                    merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs + value, "cs": cs };
                }
                else if(index == r + rs - 1){
                    if(direction == "lefttop"){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs + value, "cs": cs };
                    }
                    else{
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                    }
                }
                else{
                    merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                }
            }
            else if(type == "column"){
                if(index < c){
                    merge_new[r + "_" + (c + value)] = { "r": r, "c": c + value, "rs": rs, "cs": cs };
                }
                else if(index == c){
                    if(direction == "lefttop"){
                        merge_new[r + "_" + (c + value)] = { "r": r, "c": c + value, "rs": rs, "cs": cs };
                    }
                    else{
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs + value };
                    }
                }
                else if(index < c + cs - 1){
                    merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs + value };
                }
                else if(index == c + cs - 1){
                    if(direction == "lefttop"){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs + value };
                    }
                    else{
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                    }
                }
                else{
                    merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                }
            }
        }
        cfg["merge"] = merge_new;

        //公式配置变动
        var calcChain = file.calcChain;
        var newCalcChain = [];
        if(calcChain != null && calcChain.length > 0){
            for(var i = 0; i < calcChain.length; i++){
                var calc = $.extend(true, {}, calcChain[i]);
                var calc_r = calc.r, calc_c = calc.c, calc_i = calc.index, calc_funcStr = calc.func[2];

                if(type == "row"){
                    var functionStr = "=" + luckysheet.formula.functionStrChange(calc_funcStr, "add", "row", direction, index, value);

                    if(d[calc_r][calc_c].f == calc_funcStr){
                        d[calc_r][calc_c].f = functionStr;
                    }

                    calc.func[2] = functionStr;

                    if(direction == "lefttop"){
                        if(calc_r >= index){
                            calc.r += value;
                        }
                    }
                    else if(direction == "rightbottom"){
                        if(calc_r > index){
                            calc.r += value;
                        }
                    }

                    newCalcChain.push(calc);
                }
                else if(type == "column"){
                    var functionStr = "=" + luckysheet.formula.functionStrChange(calc_funcStr, "add", "col", direction, index, value);

                    if(d[calc_r][calc_c].f == calc_funcStr){
                        d[calc_r][calc_c].f = functionStr;
                    }

                    calc.func[2] = functionStr;

                    if(direction == "lefttop"){
                        if(calc_c >= index){
                            calc.c += value;
                        }
                    }
                    else if(direction == "rightbottom"){
                        if(calc_c > index){
                            calc.c += value;
                        }
                    }

                    newCalcChain.push(calc);
                }
            }
        }

        //筛选配置变动
        var filter_select = file.filter_select;
        var filter = file.filter;
        var newFilterObj = null;
        if(filter_select != null && JSON.stringify(filter_select) != "{}"){
            newFilterObj = { "filter_select": null, "filter": null };

            var f_r1 = filter_select.row[0], f_r2 = filter_select.row[1];
            var f_c1 = filter_select.column[0], f_c2 = filter_select.column[1];

            if(type == "row"){
                if(f_r1 < index){
                    if(f_r2 == index && direction == "lefttop"){
                        f_r2 += value; 
                    }
                    else if(f_r2 > index){
                        f_r2 += value;   
                    }
                }
                else if(f_r1 == index){
                    if(direction == "lefttop"){
                        f_r1 += value;
                        f_r2 += value;
                    }
                    else if(direction == "rightbottom" && f_r2 > index){
                        f_r2 += value;
                    }
                }
                else{
                    f_r1 += value;
                    f_r2 += value;
                }

                if(filter != null){
                    newFilterObj.filter = {};

                    for(var k in filter){
                        var f_rowhidden = filter[k].rowhidden;
                        var f_rowhidden_new = {};

                        for(var n in f_rowhidden){
                            n = parseFloat(n);

                            if(n < index){
                                f_rowhidden_new[n] = 0;
                            }
                            else if(n == index){
                                if(direction == "lefttop"){
                                    f_rowhidden_new[n + value] = 0;
                                }
                                else if(direction == "rightbottom"){
                                    f_rowhidden_new[n] = 0;
                                }
                            }
                            else{
                                f_rowhidden_new[n + value] = 0;
                            }
                        }

                        newFilterObj.filter[k] = $.extend(true, {}, filter[k]);
                        newFilterObj.filter[k].rowhidden = f_rowhidden_new;
                        newFilterObj.filter[k].str = f_r1;
                        newFilterObj.filter[k].edr = f_r2;
                    }
                }
            }
            else if(type == "column"){
                if(f_c1 < index){
                    if(f_c2 == index && direction == "lefttop"){
                        f_c2 += value; 
                    }
                    else if(f_c2 > index){
                        f_c2 += value;   
                    }
                }
                else if(f_c1 == index){
                    if(direction == "lefttop"){
                        f_c1 += value;
                        f_c2 += value;
                    }
                    else if(direction == "rightbottom" && f_c2 > index){
                        f_c2 += value;
                    }
                }
                else{
                    f_c1 += value;
                    f_c2 += value;
                }

                if(filter != null){
                    newFilterObj.filter = {};

                    for(var k in filter){
                        var f_cindex = filter[k].cindex;

                        if(f_cindex == index && direction == "lefttop"){
                            f_cindex += value;
                        }
                        else if(f_cindex > index){
                            f_cindex += value;
                        }

                        newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                        newFilterObj.filter[f_cindex - f_c1].cindex = f_cindex;
                        newFilterObj.filter[f_cindex - f_c1].stc = f_c1;
                        newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                    }
                }
            }

            newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
        }

        if(newFilterObj != null && newFilterObj.filter != null){
            cfg["rowhidden"] = {};

            for(var k in newFilterObj.filter){
                var f_rowhidden = newFilterObj.filter[k].rowhidden;

                for(var n in f_rowhidden){
                    cfg["rowhidden"][n] = 0;
                }
            }
        }
        else{
            delete cfg["rowhidden"];
        }

        //条件格式配置变动
        var CFarr = file.luckysheet_conditionformat_save;
        var newCFarr = [];
        if(CFarr != null && CFarr.length > 0){
            for(var i = 0; i < CFarr.length; i++){
                var cf_range = CFarr[i].cellrange;
                var cf_new_range = [];

                for(var j = 0; j < cf_range.length; j++){
                    var CFr1 = cf_range[j].row[0],
                        CFr2 = cf_range[j].row[1],
                        CFc1 = cf_range[j].column[0],
                        CFc2 = cf_range[j].column[1];

                    if(type == "row"){
                        if(CFr1 < index){
                            if(CFr2 == index && direction == "lefttop"){
                                CFr2 += value; 
                            }
                            else if(CFr2 > index){
                                CFr2 += value;   
                            }
                        }
                        else if(CFr1 == index){
                            if(direction == "lefttop"){
                                CFr1 += value;
                                CFr2 += value;
                            }
                            else if(direction == "rightbottom" && CFr2 > index){
                                CFr2 += value;
                            }
                        }
                        else{
                            CFr1 += value;
                            CFr2 += value;
                        }
                    }
                    else if(type == "column"){
                        if(CFc1 < index){
                            if(CFc2 == index && direction == "lefttop"){
                                CFc2 += value; 
                            }
                            else if(CFc2 > index){
                                CFc2 += value;   
                            }
                        }
                        else if(CFc1 == index){
                            if(direction == "lefttop"){
                                CFc1 += value;
                                CFc2 += value;
                            }
                            else if(direction == "rightbottom" && CFc2 > index){
                                CFc2 += value;
                            }
                        }
                        else{
                            CFc1 += value;
                            CFc2 += value;
                        }
                    }

                    cf_new_range.push({ "row": [CFr1, CFr2], "column": [CFc1, CFc2] });
                }

                var cf = $.extend(true, {}, CFarr[i]);
                cf.cellrange = cf_new_range;

                newCFarr.push(cf);
            }
        }

        //交替颜色配置变动
        var AFarr = file.luckysheet_alternateformat_save;
        var newAFarr = [];
        if(AFarr != null && AFarr.length > 0){
            for(var i = 0; i < AFarr.length; i++){
                var AFr1 = AFarr[i].cellrange.row[0],
                    AFr2 = AFarr[i].cellrange.row[1],
                    AFc1 = AFarr[i].cellrange.column[0],
                    AFc2 = AFarr[i].cellrange.column[1];

                var af = $.extend(true, {}, AFarr[i]);

                if(type == "row"){
                    if(AFr1 < index){
                        if(AFr2 == index && direction == "lefttop"){
                            AFr2 += value; 
                        }
                        else if(AFr2 > index){
                            AFr2 += value;   
                        }
                    }
                    else if(AFr1 == index){
                        if(direction == "lefttop"){
                            AFr1 += value;
                            AFr2 += value;
                        }
                        else if(direction == "rightbottom" && AFr2 > index){
                            AFr2 += value;
                        }
                    }
                    else{
                        AFr1 += value;
                        AFr2 += value;
                    }
                }
                else if(type == "column"){
                    if(AFc1 < index){
                        if(AFc2 == index && direction == "lefttop"){
                            AFc2 += value; 
                        }
                        else if(AFc2 > index){
                            AFc2 += value;   
                        }
                    }
                    else if(AFc1 == index){
                        if(direction == "lefttop"){
                            AFc1 += value;
                            AFc2 += value;
                        }
                        else if(direction == "rightbottom" && AFc2 > index){
                            AFc2 += value;
                        }
                    }
                    else{
                        AFc1 += value;
                        AFc2 += value;
                    }
                }

                af.cellrange = { "row": [AFr1, AFr2], "column": [AFc1, AFc2] };

                newAFarr.push(af);
            }
        }

        //冻结配置变动
        var newFreezen = { "freezenhorizontaldata": null, "freezenverticaldata": null };
        if(luckysheetFreezen.freezenhorizontaldata != null && type == "row"){
            var freezen_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
            var freezen_row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;

            if(freezen_row_st == index && direction == "lefttop"){
                freezen_row_st += value;
            }
            else if(freezen_row_st > index){
                freezen_row_st += value;
            }

            var freezen_top = visibledatarow[freezen_row_st] - 2 - freezen_scrollTop + columeHeaderHeight;

            newFreezen.freezenhorizontaldata = [visibledatarow[freezen_row_st], freezen_row_st + 1, freezen_scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, freezen_row_st + 1), freezen_top];
        }
        else{
            newFreezen.freezenhorizontaldata = luckysheetFreezen.freezenhorizontaldata;
        }

        if(luckysheetFreezen.freezenverticaldata != null && type == "column"){
            var freezen_scrollLeft = luckysheetFreezen.freezenverticaldata[2];
            var freezen_col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

            if(freezen_col_st == index && direction == "lefttop"){
                freezen_col_st += value;
            }
            else if(freezen_col_st > index){
                freezen_col_st += value;
            }

            var freezen_left = visibledatacolumn[freezen_col_st] - 2 - freezen_scrollLeft + rowHeaderWidth;

            newFreezen.freezenverticaldata = [visibledatacolumn[freezen_col_st], freezen_col_st + 1, freezen_scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, freezen_col_st + 1), freezen_left];
        }
        else{
            newFreezen.freezenverticaldata = luckysheetFreezen.freezenverticaldata;
        }

        if (type == "row") {
            var type1 = "r";

            //行高配置变动
            if(cfg["rowlen"] != null){
                var rowlen_new = {};

                for(var r in cfg["rowlen"]){
                    r = parseFloat(r);

                    if(r < index){
                        rowlen_new[r] = cfg["rowlen"][r];
                    }
                    else if(r == index){
                        if(direction == "lefttop"){
                            rowlen_new[(r + value)] = cfg["rowlen"][r];
                        }
                        else if(direction == "rightbottom"){
                            rowlen_new[r] = cfg["rowlen"][r];
                        }
                    }
                    else{
                        rowlen_new[(r + value)] = cfg["rowlen"][r];
                    }
                }

                cfg["rowlen"] = rowlen_new;
            }

            //空行模板
            var row = [];
            for(var c = 0; c < d[0].length; c++){
                row.push(null);
            }

            //边框
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                var borderInfo = []; 

                for(var i = 0; i < cfg["borderInfo"].length; i++){
                    var rangeType = cfg["borderInfo"][i].rangeType;

                    if(rangeType == "range"){
                        var borderRange = cfg["borderInfo"][i].range;

                        var emptyRange = [];

                        for(var j = 0; j < borderRange.length; j++){
                            var bd_r1 = borderRange[j].row[0],
                                bd_r2 = borderRange[j].row[1];

                            if(direction == "lefttop"){
                                if(index <= bd_r1){
                                    bd_r1 += value;
                                    bd_r2 += value;
                                }
                                else if(index <= bd_r2){
                                    bd_r2 += value;
                                }
                            }
                            else{
                                if(index < bd_r1){
                                    bd_r1 += value;
                                    bd_r2 += value;
                                }
                                else if(index < bd_r2){
                                    bd_r2 += value;
                                }
                            }

                            if(bd_r2 >= bd_r1){
                                emptyRange.push({ "row": [bd_r1, bd_r2], "column": borderRange[j].column });
                            }   
                        }

                        if(emptyRange.length > 0){
                            var bd_obj = {
                                "rangeType": "range",
                                "borderType": cfg["borderInfo"][i].borderType,
                                "style": cfg["borderInfo"][i].style,
                                "color": cfg["borderInfo"][i].color,
                                "range": emptyRange
                            }

                            borderInfo.push(bd_obj);
                        }
                    }
                    else if(rangeType == "cell"){
                        var row_index = cfg["borderInfo"][i].value.row_index;

                        if(direction == "lefttop"){
                            if(index <= row_index){
                                row_index += value;
                            }
                        }
                        else{
                            if(index < row_index){
                                row_index += value;
                            }
                        }
                        
                        cfg["borderInfo"][i].value.row_index = row_index;
                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            
            var arr = [];
            for (var r = 0; r < value; r++) {
                arr.push(JSON.stringify(row));
            }

            if(direction == "lefttop"){
                if(index == 0){
                    eval('d.unshift(' + arr.join(",") + ')');
                }
                else{
                    eval('d.splice(' + index + ', 0, ' + arr.join(",") + ')');
                }
            }
            else{
                eval('d.splice(' + (index + 1) + ', 0, ' + arr.join(",") + ')');    
            }
        }
        else {
            var type1 = "c";

            //行高配置变动
            if(cfg["columlen"] != null){
                var columlen_new = {};

                for(var c in cfg["columlen"]){
                    c = parseFloat(c);
                    
                    if(c < index){
                        columlen_new[c] = cfg["columlen"][c];
                    }
                    else if(c == index){
                        if(direction == "lefttop"){
                            columlen_new[(c + value)] = cfg["columlen"][c];
                        }
                        else if(direction == "rightbottom"){
                            columlen_new[c] = cfg["columlen"][c];
                        }
                    }
                    else{
                        columlen_new[(c + value)] = cfg["columlen"][c];
                    }
                }

                cfg["columlen"] = columlen_new;
            }

            //空列模板
            var col = [];
            for(var r = 0; r < d.length; r++){
                col.push(null);
            }

            //边框
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                var borderInfo = []; 

                for(var i = 0; i < cfg["borderInfo"].length; i++){
                    var rangeType = cfg["borderInfo"][i].rangeType;

                    if(rangeType == "range"){
                        var borderRange = cfg["borderInfo"][i].range;

                        var emptyRange = [];

                        for(var j = 0; j < borderRange.length; j++){
                            var bd_c1 = borderRange[j].column[0],
                                bd_c2 = borderRange[j].column[1];

                            if(direction == "lefttop"){
                                if(index <= bd_c1){
                                    bd_c1 += value;
                                    bd_c2 += value;
                                }
                                else if(index <= bd_c2){
                                    bd_c2 += value;
                                }
                            }
                            else{
                                if(index < bd_c1){
                                    bd_c1 += value;
                                    bd_c2 += value;
                                }
                                else if(index < bd_c2){
                                    bd_c2 += value;
                                }
                            }

                            if(bd_c2 >= bd_c1){
                                emptyRange.push({ "row": borderRange[j].row, "column": [bd_c1, bd_c2] });
                            }   
                        }

                        if(emptyRange.length > 0){
                            var bd_obj = {
                                "rangeType": "range",
                                "borderType": cfg["borderInfo"][i].borderType,
                                "style": cfg["borderInfo"][i].style,
                                "color": cfg["borderInfo"][i].color,
                                "range": emptyRange
                            }

                            borderInfo.push(bd_obj);
                        }
                    }
                    else if(rangeType == "cell"){
                        var col_index = cfg["borderInfo"][i].value.col_index;

                        if(direction == "lefttop"){
                            if(index <= col_index){
                                col_index += value;
                            }
                        }
                        else{
                            if(index < col_index){
                                col_index += value;
                            }
                        }
                        
                        cfg["borderInfo"][i].value.col_index = col_index;
                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            
            for (var r = 0; r < d.length; r++) {
                var row = d[r];

                for(var i = 0; i < value; i++){
                    if(direction == "lefttop"){
                        if(index == 0){
                            row.unshift(col[r]);
                        }
                        else{
                            row.splice(index, 0, col[r]);
                        }
                    }
                    else{
                        row.splice((index + 1), 0, col[r]);
                    }
                }
            }
        }

        luckysheet.jfrefreshgrid_adRC(d, cfg, "addRC", { "index": index, "len": value, "direction": direction, "rc": type1, "restore": false }, newCalcChain, newFilterObj, newCFarr, newAFarr, newFreezen);
        
        var range = null;
        if(type == "row"){
            if(direction == "lefttop"){
                range = [{ "row": [index, index + value - 1], "column": [0 , d[0].length - 1] }];
            }
            else{
                range = [{ "row": [index + 1, index + value], "column": [0 , d[0].length - 1] }];
            }
        }
        else{
            if(direction == "lefttop"){
                range = [{ "row": [0, d.length - 1], "column": [index, index + value - 1] }];
            }
            else{
                range = [{ "row": [0, d.length - 1], "column": [index + 1, index + value] }];
            }
        }
        luckysheet_select_save = range;
        luckysheet.selectHightlightShow();

        if (type == "row"){
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();
            var winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

            var row = visibledatarow[range[0].row[1]], row_pre = range[0].row[0] - 1 == -1 ? 0 : visibledatarow[range[0].row[0] - 1];
            // var col = visibledatacolumn[range[0].column[1]], col_pre = range[0].column[0] - 1 == -1 ? 0 : visibledatacolumn[range[0].column[0] - 1];

            // if (col - scrollLeft - winW + 20 > 0) {
            //     $("#luckysheet-scrollbar-x").scrollLeft(col - winW + 20);
            // }
            // else if (col_pre - scrollLeft - 20 < 0) {
            //     $("#luckysheet-scrollbar-x").scrollLeft(col_pre - 20);
            // }

            if (row - scrollTop - winH + 20 > 0) {
                $("#luckysheet-scrollbar-y").scrollTop(row - winH + 20);
            }
            else if (row_pre - scrollTop - 20 < 0) {
                $("#luckysheet-scrollbar-y").scrollTop(row_pre - 20);
            }

            if(value > 30){
                $("#luckysheet-row-count-show").hide();
                $("#luckysheet-column-count-show").hide();
            }
        }
    }
    luckysheet.luckysheetextendtable = luckysheetextendtable;

    var luckysheetextendData = function (rowlen, newData) {
        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

        var cfg = $.extend(true, {}, config);
        if(cfg["merge"] == null){
            cfg["merge"] = {};
        }

        var collen = d[0].length;
        var addNullData = luckysheet.datagridgrowth([], rowlen, collen);

        d = d.concat(addNullData);

        for(var i = 0; i < newData.length; i++){
            var r = newData[i].r,
                c = newData[i].c,
                v = newData[i].v;

            luckysheet.setcellvalue(r, c, d, v);

            if(v != null && v.mc != null && v.mc.rs != null){
                cfg["merge"][v.mc.r + "_" + v.mc.c] = $.extend(true, {}, v.mc);
            }
        }

        //luckysheet.flowdata
        luckysheet.flowdata = d;
        luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = d;           

        //config
        config = cfg;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

        //行高、列宽刷新
        luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
    }
    luckysheet.luckysheetextendData = luckysheetextendData;

    //向左增加列，向上增加行
    $("#luckysheet-add-lefttop, #luckysheet-add-lefttop_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();
        
        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        var $t = $(this), value = $t.parent().find("input").val();
        if (!luckysheet.func_methods.isRealNum(value)) {
            if(luckysheet.isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                luckysheet.tooltip.info("增加错误, 请输入数字", "");
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(luckysheet.isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                luckysheet.tooltip.info("增加错误, 增加范围限制在1-100", ""); 
            }
            return;
        }

        var st_index = luckysheet_select_save[0][luckysheetRightHeadClickIs][0];
        luckysheetextendtable(luckysheetRightHeadClickIs, st_index, value, "lefttop");
    });

    //向右增加列，向下增加行
    $("#luckysheet-add-rightbottom, #luckysheet-add-rightbottom_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
            }

            return;
        }

        var $t = $(this), value = $t.parent().find("input").val();
        if (!luckysheet.func_methods.isRealNum(value)) {
            if(luckysheet.isEditMode()){
                alert("增加错误, 请输入数字");
            }
            else{
                luckysheet.tooltip.info("增加错误, 请输入数字", ""); 
            }

            return;
        }

        value = parseInt(value);

        if (value < 1 || value > 100) {
            if(luckysheet.isEditMode()){
                alert("增加错误, 增加范围限制在1-100");
            }
            else{
                luckysheet.tooltip.info("增加错误, 增加范围限制在1-100", "");
            }

            return;
        }

        var st_index = luckysheet_select_save[0][luckysheetRightHeadClickIs][1];
        luckysheetextendtable(luckysheetRightHeadClickIs, st_index, value, "rightbottom");
    });

    var luckysheetdeletetable = function (type, st, ed) {
        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];

        var slen = ed - st + 1;
        var cfg = $.extend(true, {}, config);

        //合并单元格配置变动
        if(cfg["merge"] == null){
            cfg["merge"] = {};
        }

        var merge_new = {};
        for(var m in cfg["merge"]){
            var mc = cfg["merge"][m];

            var r = mc.r,
                c = mc.c,
                rs = mc.rs,
                cs = mc.cs;

            if(type == "row"){
                if(r < st){
                    if(r + rs - 1 < st){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                    }
                    else if(r + rs - 1 >= st && r + rs - 1 < ed){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": st - r, "cs": cs };
                    }
                    else if(r + rs - 1 >= ed){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs - slen, "cs": cs };
                    }
                }
                else if(r >= st && r <= ed){
                    if(r + rs - 1 > ed){
                        merge_new[st + "_" + c] = { "r": st, "c": c, "rs": r + rs - 1 - ed, "cs": cs };
                    }
                }
                else if(r > ed){
                    merge_new[(r - slen) + "_" + c] = { "r": r - slen, "c": c, "rs": rs, "cs": cs };
                }
            }
            else if(type == "column"){
                if(c < st){
                    if(c + cs - 1 < st){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs };
                    }
                    else if(c + cs - 1 >= st && c + cs - 1 < ed){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": st - c };
                    }
                    else if(c + cs - 1 >= ed){
                        merge_new[r + "_" + c] = { "r": r, "c": c, "rs": rs, "cs": cs - slen };
                    }
                }
                else if(c >= st && c <= ed){
                    if(c + cs - 1 > ed){
                        merge_new[r + "_" + st] = { "r": r, "c": st, "rs": rs, "cs": c + cs - 1 - ed };
                    }
                }
                else if(c > ed){
                    merge_new[r + "_" + (c - slen)] = { "r": r, "c": c - slen, "rs": rs, "cs": cs };
                }
            }
        }
        cfg["merge"] = merge_new;

        //公式配置变动
        var calcChain = file.calcChain;
        var newCalcChain = [];
        if(calcChain != null && calcChain.length > 0){
            for(var i = 0; i < calcChain.length; i++){
                var calc = $.extend(true, {}, calcChain[i]);
                var calc_r = calc.r, calc_c = calc.c, calc_i = calc.index, calc_funcStr = calc.func[2];

                if(type == "row"){
                    if(calc_r < st || calc_r > ed){
                        var functionStr = "=" + luckysheet.formula.functionStrChange(calc_funcStr, "del", "row", null, st, slen);

                        if(d[calc_r][calc_c].f == calc_funcStr){
                            d[calc_r][calc_c].f = functionStr;
                        }

                        calc.func[2] = functionStr;

                        if(calc_r > ed){
                            calc.r = calc_r - slen;
                        }

                        newCalcChain.push(calc);
                    }
                }
                else if(type == "column"){
                    if(calc_c < st || calc_c > ed){
                        var functionStr = "=" + luckysheet.formula.functionStrChange(calc_funcStr, "del", "col", null, st, slen);

                        if(d[calc_r][calc_c].f == calc_funcStr){
                            d[calc_r][calc_c].f = functionStr;
                        }

                        calc.func[2] = functionStr;

                        if(calc_c > ed){
                            calc.c = calc_c - slen;
                        }

                        newCalcChain.push(calc);
                    }
                }
            }
        }

        //筛选配置变动
        var filter_select = file.filter_select;
        var filter = file.filter;
        var newFilterObj = null;
        if(filter_select != null && JSON.stringify(filter_select) != "{}"){
            newFilterObj = { "filter_select": null, "filter": null };

            var f_r1 = filter_select.row[0], f_r2 = filter_select.row[1];
            var f_c1 = filter_select.column[0], f_c2 = filter_select.column[1];

            if(type == "row"){
                if(f_r1 > ed){
                    f_r1 -= slen;
                    f_r2 -= slen;

                    newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
                }
                else if(f_r1 < st){
                    if(f_r2 < st){

                    }
                    else if(f_r2 <= ed){
                        f_r2 = st - 1;
                    }
                    else{
                        f_r2 -= slen;
                    }

                    newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
                }

                if(newFilterObj.filter_select != null && filter != null){
                    for(var k in filter){
                        var f_rowhidden = filter[k].rowhidden;
                        var f_rowhidden_new = {};

                        for(var n in f_rowhidden){
                            if(n < st){
                                f_rowhidden_new[n] = 0;
                            }
                            else if(n > ed){
                                f_rowhidden_new[n - slen] = 0;
                            }
                        }

                        if(JSON.stringify(f_rowhidden_new) != "{}"){
                            if(newFilterObj.filter == null){
                                newFilterObj.filter = {};
                            }

                            newFilterObj.filter[k] = $.extend(true, {}, filter[k]);
                            newFilterObj.filter[k].rowhidden = f_rowhidden_new;
                            newFilterObj.filter[k].str = f_r1;
                            newFilterObj.filter[k].edr = f_r2;
                        }
                    }
                }
            }
            else if(type == "column"){
                if(f_c1 > ed){
                    f_c1 -= slen;
                    f_c2 -= slen;

                    newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
                }
                else if(f_c1 < st){
                    if(f_c2 < st){

                    }
                    else if(f_c2 <= ed){
                        f_c2 = st - 1;
                    }
                    else{
                        f_c2 -= slen;
                    }

                    newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
                }
                else{
                    if(f_c2 > ed){
                        f_c1 = st;
                        f_c2 -= slen;

                        newFilterObj.filter_select = { "row": [f_r1, f_r2], "column": [f_c1, f_c2] };
                    }
                }

                if(newFilterObj.filter_select != null && filter != null){
                    for(var k in filter){
                        var f_cindex = filter[k].cindex;

                        if(f_cindex < st){
                            if(newFilterObj.filter == null){
                                newFilterObj.filter = {};
                            }

                            newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                            newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                        }
                        else if(f_cindex > ed){
                            f_cindex -= slen;

                            if(newFilterObj.filter == null){
                                newFilterObj.filter = {};
                            }

                            newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                            newFilterObj.filter[f_cindex - f_c1].cindex = f_cindex;
                            newFilterObj.filter[f_cindex - f_c1].stc = f_c1;
                            newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                        }
                    }
                }
            }
        }

        if(newFilterObj != null && newFilterObj.filter != null){
            cfg["rowhidden"] = {};

            for(var k in newFilterObj.filter){
                var f_rowhidden = newFilterObj.filter[k].rowhidden;

                for(var n in f_rowhidden){
                    cfg["rowhidden"][n] = 0;
                }
            }
        }
        else{
            delete cfg["rowhidden"];
        }

        //条件格式配置变动
        var CFarr = file.luckysheet_conditionformat_save;
        var newCFarr = [];
        if(CFarr != null && CFarr.length > 0){
            for(var i = 0; i < CFarr.length; i++){
                var cf_range = CFarr[i].cellrange;
                var cf_new_range = [];

                for(var j = 0; j < cf_range.length; j++){
                    var CFr1 = cf_range[j].row[0],
                        CFr2 = cf_range[j].row[1],
                        CFc1 = cf_range[j].column[0],
                        CFc2 = cf_range[j].column[1];

                    if(type == "row"){
                        if(!(CFr1 >= st && CFr2 <= ed)){
                            if(CFr1 > ed){
                                CFr1 -= slen;
                                CFr2 -= slen;
                            }
                            else if(CFr1 < st){
                                if(CFr2 < st){

                                }
                                else if(CFr2 <= ed){
                                    CFr2 = st - 1;
                                }
                                else{
                                    CFr2 -= slen;
                                }
                            }
                            else{
                                if(CFr2 > ed){
                                    CFr1 = st;
                                    CFr2 -= slen;
                                }
                            }

                            cf_new_range.push({ "row": [CFr1, CFr2], "column": [CFc1, CFc2] });
                        }
                    }
                    else if(type == "column"){
                        if(!(CFc1 >= st && CFc2 <= ed)){
                            if(CFc1 > ed){
                                CFc1 -= slen;
                                CFc2 -= slen;
                            }
                            else if(CFc1 < st){
                                if(CFc2 < st){

                                }
                                else if(CFc2 <= ed){
                                    CFc2 = st - 1;
                                }
                                else{
                                    CFc2 -= slen;
                                }
                            }
                            else{
                                if(CFc2 > ed){
                                    CFc1 = st;
                                    CFc2 -= slen;
                                }
                            }

                            cf_new_range.push({ "row": [CFr1, CFr2], "column": [CFc1, CFc2] });
                        }
                    }
                }

                if(cf_new_range.length > 0){
                    var cf = $.extend(true, {}, CFarr[i]);
                    cf.cellrange = cf_new_range;

                    newCFarr.push(cf);
                }
            }
        }

        //交替颜色配置变动
        var AFarr = file.luckysheet_alternateformat_save;
        var newAFarr = [];
        if(AFarr != null && AFarr.length > 0){
            for(var i = 0; i < AFarr.length; i++){
                var AFr1 = AFarr[i].cellrange.row[0],
                    AFr2 = AFarr[i].cellrange.row[1],
                    AFc1 = AFarr[i].cellrange.column[0],
                    AFc2 = AFarr[i].cellrange.column[1];

                if(type == "row"){
                    if(!(AFr1 >= st && AFr2 <= ed)){
                        var af = $.extend(true, {}, AFarr[i]);

                        if(AFr1 > ed){
                            AFr1 -= slen;
                            AFr2 -= slen;
                        }
                        else if(AFr1 < st){
                            if(AFr2 < st){

                            }
                            else if(AFr2 <= ed){
                                AFr2 = st - 1;
                            }
                            else{
                                AFr2 -= slen;
                            }
                        }
                        else{
                            if(AFr2 > ed){
                                AFr1 = st;
                                AFr2 -= slen;
                            }
                        }

                        af.cellrange = { "row": [AFr1, AFr2], "column": [AFc1, AFc2] };

                        newAFarr.push(af);
                    }
                }
                else if(type == "column"){
                    if(!(AFc1 >= st && AFc2 <= ed)){
                        var af = $.extend(true, {}, AFarr[i]);

                        if(AFc1 > ed){
                            AFc1 -= slen;
                            AFc2 -= slen;
                        }
                        else if(AFc1 < st){
                            if(AFc2 < st){

                            }
                            else if(AFc2 <= ed){
                                AFc2 = st - 1;
                            }
                            else{
                                AFc2 -= slen;
                            }
                        }
                        else{
                            if(AFc2 > ed){
                                AFc1 = st;
                                AFc2 -= slen;
                            }
                        }

                        af.cellrange = { "row": [AFr1, AFr2], "column": [AFc1, AFc2] };

                        newAFarr.push(af);
                    }
                }
            }
        }

        //冻结配置变动
        var newFreezen = { "freezenhorizontaldata": null, "freezenverticaldata": null };
        if(luckysheetFreezen.freezenhorizontaldata != null && type == "row"){
            var freezen_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
            var freezen_st = luckysheet_searcharray(visibledatarow, freezen_scrollTop);
            if(freezen_st == -1){
                freezen_st = 0;
            }

            var freezen_row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;

            if(freezen_row_st >= st){
                if(freezen_row_st < ed){
                    freezen_row_st = st - 1;
                }
                else{
                    freezen_row_st -= slen;
                }
            }

            if(freezen_row_st < freezen_st){
                freezen_row_st = freezen_st;
            }

            var freezen_top = visibledatarow[freezen_row_st] - 2 - freezen_scrollTop + columeHeaderHeight;

            newFreezen.freezenhorizontaldata = [visibledatarow[freezen_row_st], freezen_row_st + 1, freezen_scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, freezen_row_st + 1), freezen_top];
        }
        else{
            newFreezen.freezenhorizontaldata = luckysheetFreezen.freezenhorizontaldata;
        }

        if(luckysheetFreezen.freezenverticaldata != null && type == "column"){
            var freezen_scrollLeft = luckysheetFreezen.freezenverticaldata[2];
            var freezen_st2 = luckysheet_searcharray(visibledatacolumn, freezen_scrollLeft);
            if(freezen_st2 == -1){
                freezen_st2 = 0;
            }

            var freezen_col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

            if(freezen_col_st >= st){
                if(freezen_col_st < ed){
                    freezen_col_st = st - 1;
                }
                else{
                    freezen_col_st -= slen;
                }
            }

            if(freezen_col_st < freezen_st2){
                freezen_col_st = freezen_st2;
            }

            var freezen_left = visibledatacolumn[freezen_col_st] - 2 - freezen_scrollLeft + rowHeaderWidth;

            newFreezen.freezenverticaldata = [visibledatacolumn[freezen_col_st], freezen_col_st + 1, freezen_scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, freezen_col_st + 1), freezen_left];
        }
        else{
            newFreezen.freezenverticaldata = luckysheetFreezen.freezenverticaldata;
        }

        //主逻辑
        if (type == "row") {
            var type1 = "r";

            //行高配置变动
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            var rowlen_new = {};
            for(var r in cfg["rowlen"]){
                if(r < st){
                    rowlen_new[r] = cfg["rowlen"][r];
                }
                else if(r > ed){
                    rowlen_new[r - slen] = cfg["rowlen"][r];
                }
            }

            cfg["rowlen"] = rowlen_new;

            //边框配置变动
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                var borderInfo = []; 

                for(var i = 0; i < cfg["borderInfo"].length; i++){
                    var rangeType = cfg["borderInfo"][i].rangeType;

                    if(rangeType == "range"){
                        var borderRange = cfg["borderInfo"][i].range;

                        var emptyRange = [];

                        for(var j = 0; j < borderRange.length; j++){
                            var bd_r1 = borderRange[j].row[0],
                                bd_r2 = borderRange[j].row[1];

                            for(var r = st; r <= ed; r++){
                                if(r < borderRange[j].row[0]){
                                    bd_r1 -= 1;
                                    bd_r2 -= 1;
                                }
                                else if(r <= borderRange[j].row[1]){
                                    bd_r2 -= 1;
                                }
                            } 

                            if(bd_r2 >= bd_r1){
                                emptyRange.push({ "row": [bd_r1, bd_r2], "column": borderRange[j].column });
                            }   
                        }

                        if(emptyRange.length > 0){
                            var bd_obj = {
                                "rangeType": "range",
                                "borderType": cfg["borderInfo"][i].borderType,
                                "style": cfg["borderInfo"][i].style,
                                "color": cfg["borderInfo"][i].color,
                                "range": emptyRange
                            }

                            borderInfo.push(bd_obj);
                        }
                    }
                    else if(rangeType == "cell"){
                        var row_index = cfg["borderInfo"][i].value.row_index;

                        if(row_index < st){
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                        else if(row_index > ed){
                            cfg["borderInfo"][i].value.row_index = row_index - (ed - st + 1);
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }

            //删除选中行
            d.splice(st, slen);

            if(!luckysheetConfigsetting.pointEdit){//非编辑器qksheet表格编辑状态
                //空白行模板
                var row = [];
                for (var c = 0; c < d[0].length; c++) {
                    row.push(null);
                }

                //删除多少行，增加多少行空白行                
                for (var r = 0; r < slen; r++) {
                    d.push(row);
                }
            }
        }
        else {
            var type1 = "c";

            //列宽配置变动
            if(cfg["columlen"] == null){
                cfg["columlen"] = {};
            }

            var columlen_new = {};
            for(var c in cfg["columlen"]){
                if(c < st){
                    columlen_new[c] = cfg["columlen"][c];
                }
                else if(c > ed){
                    columlen_new[c - slen] = cfg["columlen"][c];
                }
            }

            cfg["columlen"] = columlen_new;

            //边框配置变动
            if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                var borderInfo = [];

                for(var i = 0; i < cfg["borderInfo"].length; i++){
                    var rangeType = cfg["borderInfo"][i].rangeType;

                    if(rangeType == "range"){
                        var borderRange = cfg["borderInfo"][i].range;

                        var emptyRange = [];

                        for(var j = 0; j < borderRange.length; j++){
                            var bd_c1 = borderRange[j].column[0],
                                bd_c2 = borderRange[j].column[1];

                            for(var c = st; c <= ed; c++){
                                if(c < borderRange[j].column[0]){
                                    bd_c1 -= 1;
                                    bd_c2 -= 1;
                                }
                                else if(c <= borderRange[j].column[1]){
                                    bd_c2 -= 1;
                                }
                            } 

                            if(bd_c2 >= bd_c1){
                                emptyRange.push({ "row": borderRange[j].row, "column": [bd_c1, bd_c2] });
                            }   
                        }

                        if(emptyRange.length > 0){
                            var bd_obj = {
                                "rangeType": "range",
                                "borderType": cfg["borderInfo"][i].borderType,
                                "style": cfg["borderInfo"][i].style,
                                "color": cfg["borderInfo"][i].color,
                                "range": emptyRange
                            }

                            borderInfo.push(bd_obj);
                        }
                    }
                    else if(rangeType == "cell"){
                        var col_index = cfg["borderInfo"][i].value.col_index;

                        if(col_index < st){
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                        else if(col_index > ed){
                            cfg["borderInfo"][i].value.col_index = col_index - (ed - st + 1);
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            
            //空白列模板
            var addcol = [];
            if(!luckysheetConfigsetting.pointEdit){//非编辑器qksheet表格编辑状态
                for (var r = 0; r < slen; r++) {
                    addcol.push(null);
                }
            }

            for (var r = 0; r < d.length; r++) {
                var row = [].concat(d[r]);
                
                //删除选中列
                row.splice(st, slen);
                
                d[r] = row.concat(addcol);
            }
        }

        luckysheet.jfrefreshgrid_adRC(d, cfg, "delRC", { "index": st, "len": ed - st + 1, "rc": type1 }, newCalcChain, newFilterObj, newCFarr, newAFarr, newFreezen);
    }
    luckysheet.luckysheetdeletetable = luckysheetdeletetable;

    //删除选中行列
    $("#luckysheet-del-selected, #luckysheet-del-selected_t").click(function (event) {
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 1){
            if(luckysheetRightHeadClickIs == "row"){
                if(luckysheet.isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                }
            }
            else if(luckysheetRightHeadClickIs == "column"){
                if(luckysheet.isEditMode()){
                    alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                }
                else{
                    luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
                }
            }
            return;
        }

        var st_index = luckysheet_select_save[0][luckysheetRightHeadClickIs][0], ed_index = luckysheet_select_save[0][luckysheetRightHeadClickIs][1];
        luckysheetdeletetable(luckysheetRightHeadClickIs, st_index, ed_index);
    });

    //清除单元格内容
    $("#luckysheet-delete-text").click(function(){
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet_select_save.length > 0){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

            var hasPartMC = false;

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                if(luckysheet.hasPartMC(config, r1, r2, c1, c2)){
                    hasPartMC = true;
                    break;
                }
            }

            if(hasPartMC){
                if(luckysheet.isEditMode()){
                    alert("无法对部分合并单元格执行此操作");
                }
                else{
                    luckysheet.tooltip.info("无法对部分合并单元格执行此操作", "");
                }

                return;
            }

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                for(var r = r1; r <= r2; r++){
                    for(var c = c1; c <= c2; c++){
                        if(luckysheet.pivotTable.isPivotRange(r, c)){
                            continue;
                        }

                        if(luckysheet.getObjType(d[r][c]) == "object"){
                            delete d[r][c]["m"];
                            delete d[r][c]["v"];

                            if(d[r][c]["f"] != null){
                                delete d[r][c]["f"];
                                luckysheet.formula.delFunctionGroup(r, c, luckysheet.currentSheetIndex);

                                delete d[r][c]["spl"];
                            }
                        }
                        else{
                            d[r][c] = null;
                        }
                    }
                }
            }

            luckysheet.jfrefreshgrid(d, luckysheet_select_save);
        }
    });

    //行高列宽设置
    $("#luckysheet-rows-cols-changesize").click(function(){
        $("#luckysheet-rightclick-menu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        var size = parseInt($(this).siblings("input[type='number']").val().trim());

        if(size < 0 || size > 255){
            if(luckysheet.isEditMode()){
                alert("数值必须在0 ~ 255之间");
            }
            else{
                luckysheet.tooltip.info("数值必须在0 ~ 255之间", "");
            }
            
            return;
        }

        var cfg = $.extend(true, {}, config);
        var type;

        if(luckysheetRightHeadClickIs == "row"){
            type = "resizeR";

            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var r1 = luckysheet_select_save[s].row[0];
                var r2 = luckysheet_select_save[s].row[1];

                for(var r = r1; r <= r2; r++){
                    cfg["rowlen"][r] = size;
                }
            }
        }
        else if(luckysheetRightHeadClickIs == "column"){
            type = "resizeC";

            if(cfg["columlen"] == null){
                cfg["columlen"] = {};
            }

            for(var s = 0; s < luckysheet_select_save.length; s++){
                var c1 = luckysheet_select_save[s].column[0];
                var c2 = luckysheet_select_save[s].column[1];

                for(var c = c1; c <= c2; c++){
                    cfg["columlen"][c] = size;
                }
            }
        }

        if (clearjfundo) {
            luckysheet.jfundo = [];

            luckysheet.jfredo.push({
                "type": "resize",
                "ctrlType": type,
                "config": $.extend(true, {}, config),
                "curconfig": $.extend(true, {}, cfg),
                "sheetIndex": luckysheet.currentSheetIndex
            });
        }

        //config
        config = cfg;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

        if(luckysheetRightHeadClickIs == "row"){
            luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["rowlen"], { "k": "rowlen" });

            luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, null);
        }
        else if(luckysheetRightHeadClickIs == "column"){
            luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["columlen"], { "k": "columlen" });

            luckysheet.jfrefreshgrid_rhcw(null, luckysheet.flowdata[0].length);
        }
    });

    var luckysheet_sort_existSort = {}, luckysheet_sort_initial = true, luckysheet_model_move_state = false, luckysheet_model_xy = [0, 0], luckysheet_model_move_obj = null;

    $(document).on("mousedown", "div.luckysheet-modal-dialog", function (e) {
        if (!$(e.target).is(".luckysheet-modal-dialog")) {
            return;
        }

        luckysheet_model_move_state = true;

        luckysheet_model_move_obj = $(e.currentTarget);
        var toffset = luckysheet_model_move_obj.offset();
        luckysheet_model_xy = [e.pageX - toffset.left, e.pageY - toffset.top];
    });

    $(document).on("click", ".luckysheet-modal-dialog-title-close, .luckysheet-model-close-btn", function (e) {
        //选择文本颜色和单元格颜色弹出框取消
        if($("#textcolorselect").is(":visible")||$("#cellcolorselect").is(":visible")){
            $("#luckysheet-conditionformat-dialog").show();
        }
        $(e.currentTarget).parents(".luckysheet-modal-dialog").hide();
        $("#luckysheet-modal-dialog-mask").hide();
        //函数查找功能所有弹出框关闭和取消
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula")){
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula-parm")){
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }
        if($(this).parents(".luckysheet-modal-dialog").hasClass("luckysheet-search-formula-parm-select")){
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        }

        $("#" + container).attr("tabindex", 0).focus();
    });


    $("#luckysheetorderby").click(function () {
        $("body .luckysheet-cols-menu").hide();

        if(luckysheet_select_save.length > 1){
            if(luckysheet.isEditMode()){
                alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            }
            else{
                luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", ""); 
            }
            return;
        }

        var last = luckysheet_select_save[0];
        var r1 = last["row"][0], r2 = last["row"][1];
        var c1 = last["column"][0], c2 = last["column"][1];

        if (luckysheet_sort_initial) {
            luckysheet_sort_initial = false;
            var content = '<div style="overflow: hidden;" class="luckysheet-sort-modal"><div><label><input type="checkbox" id="luckysheet-sort-haveheader"/><span>数据具有标题行</span></label></div><div style="overflow-y:auto;" id="luckysheet-sort-dialog-tablec"><table data-itemcount="0" cellspacing="0"> <tr><td>排序依据 <select name="sort_0"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </td> <td> <div><label><input value="asc" type="radio" checked="checked" name="sort_0"><span>正序A-Z</span></label></div> <div><label><input value="desc" type="radio" name="sort_0"><span>倒序Z-A</span></label></div></td></tr></table></div><div style="background: #e5e5e5;border-top: 1px solid #f5f5f5; height: 1px; width: 100%;margin:2px 0px;margin-bottom:10px;"></div> <div> <span style="font-weight: bold; text-decoration: underline;text-align:center;color: blue;cursor: pointer;" class="luckysheet-sort-dialog-additem">+ 添加其他排序列</span> </div> </div>';

            $("body").append(luckysheet.replaceHtml(modelHTML, { "id": "luckysheet-sort-dialog", "addclass": "", "title": "排序范围", "content": content, "botton": '<button id="luckysheet-sort-modal-confirm" class="btn btn-primary">排序</button><button class="btn btn-default luckysheet-model-close-btn">关闭</button>' }));

            $("#luckysheet-sort-dialog .luckysheet-sort-dialog-additem").click(function () {
                var last = luckysheet_select_save[0];
                var r1 = last["row"][0], r2 = last["row"][1];
                var c1 = last["column"][0], c2 = last["column"][1];

                var option = "", i = $("#luckysheet-sort-dialog table").data("itemcount") + 1;
                var t = $("#luckysheet-sort-haveheader").is(':checked');

                for (var c = c1; c <= c2; c++) {
                    if (t) {
                        var v = luckysheet.getcellvalue(r1, c, luckysheet.flowdata, "m");

                        if(v == null){
                            v = "列" + (c - c1 + 1); 
                        }

                        option += '<option value="' + c + '">' + v + '</option>';
                    }
                    else {
                        option += '<option value="' + c + '">' + luckysheet.luckysheetchatatABC(c) + '</option>';
                    }
                }

                $("#luckysheet-sort-dialog table").append('<tr class="luckysheet-sort-dialog-tr"><td><span class="luckysheet-sort-item-close" onclick="$(this).parent().parent().remove();"><i class="fa fa-times" aria-hidden="true"></i></span>次要排序 <select name="sort_' + i + '">' + option + '</select> </td> <td> <div><label><input value="asc" type="radio" checked="checked" name="sort_' + i + '"><span>正序A-Z</span></label></div> <div><label><input value="desc" type="radio" name="sort_' + i + '"><span>倒序Z-A</span></label></div></td></tr>');
                $("#luckysheet-sort-dialog table").data("itemcount", i);
            });

            $("#luckysheet-sort-haveheader").change(function () {
                var last = luckysheet_select_save[0];
                var r1 = last["row"][0], r2 = last["row"][1];
                var c1 = last["column"][0], c2 = last["column"][1];

                var t = $(this).is(':checked');
                var option = "";

                for (var c = c1; c <= c2; c++) {
                    if (t) {
                        var v = luckysheet.getcellvalue(r1, c, luckysheet.flowdata, "m");
                        
                        if(v == null){
                            v = "列" + (c - c1 + 1); 
                        }

                        option += '<option value="' + c + '">' + v + '</option>';
                    }
                    else {
                        option += '<option value="' + c + '">' + luckysheet.luckysheetchatatABC(c) + '</option>';
                    }
                }

                $("#luckysheet-sort-dialog tr select").each(function () {
                    $(this).html(option);
                });
            });

            //自定义排序
            $("#luckysheet-sort-modal-confirm").click(function () {
                if(luckysheet_select_save.length > 1){
                    if(luckysheet.isEditMode()){
                        alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                    }
                    else{
                        luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                    }

                    return;
                }

                var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

                var last = luckysheet_select_save[0];
                var r1 = last["row"][0], r2 = last["row"][1];
                var c1 = last["column"][0], c2 = last["column"][1];

                //数据具有标题行
                var t = $("#luckysheet-sort-haveheader").is(':checked');

                if(t){
                    var str = r1 + 1;
                }
                else{
                    var str = r1;
                }

                var hasMc = false; //排序选区是否有合并单元格
                var data = [];

                for(var r = str; r <= r2; r++){
                    var data_row = [];

                    for(var c = c1; c <= c2; c++){
                        if(d[r][c] != null && d[r][c].mc != null){
                            hasMc = true;
                            break;
                        }

                        data_row.push(d[r][c]);
                    }

                    data.push(data_row);
                }

                if(hasMc){
                    if(luckysheet.isEditMode()){
                        alert("选区有合并单元格，无法执行此操作！");
                    }
                    else{
                        luckysheet.tooltip.info("选区有合并单元格，无法执行此操作！", "");
                    }

                    return;
                }
                
                $($("#luckysheet-sort-dialog table tr").toArray().reverse()).each(function () {
                    var i = $(this).find("select").val(), 
                        asc = $(this).find('input:radio:checked').val();
                    
                    i -= c1;
                    
                    if (asc == "asc") {
                        asc = true;
                    }
                    else {
                        asc = false;
                    }

                    data = luckysheet.orderbydata([].concat(data), i, asc);
                });

                for(var r = str; r <= r2; r++){
                    for(var c = c1; c <= c2; c++){
                        d[r][c] = data[r - str][c - c1];
                    }
                }

                if(config["rowlen"] != null){
                    var cfg = $.extend(true, {}, config);
                    cfg = luckysheet.rowlenByRange(d, str, r2, cfg);

                    luckysheet.jfrefreshgrid(d, [{ "row": [str, r2], "column": [c1, c2] }], cfg, null, true);
                }
                else{
                    luckysheet.jfrefreshgrid(d, [{ "row": [str, r2], "column": [c1, c2] }]);
                }

                $("#luckysheet-sort-dialog").hide();
                $("#luckysheet-modal-dialog-mask").hide();
            });
        }

        var option = "";
        for (var c = c1; c <= c2; c++) {
            option += '<option value="' + c + '">' + luckysheet.luckysheetchatatABC(c) + '</option>';
        }

        $("#luckysheet-sort-dialog select").html(option);

        $("#luckysheet-sort-dialog .luckysheet-sort-dialog-tr").remove();

        $("#luckysheet-sort-haveheader").prop("checked", false);
        $("#luckysheet-sort-dialog input:radio:first").prop("checked", "checked");

        $("#luckysheet-sort-dialog .luckysheet-modal-dialog-title-text").html("排序范围从<span>" + luckysheet.luckysheetchatatABC(c1) + (r1 + 1) + "</span>到<span>" + luckysheet.luckysheetchatatABC(c2) + (r2 + 1) + "</span>");

        var $t = $("#luckysheet-sort-dialog"), myh = $t.outerHeight(), myw = $t.outerWidth();
        var winw = $(window).width(), winh = $(window).height();
        var scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();

        $("#luckysheet-sort-dialog-tablec").css("max-height", (winh - myh) / 2);
        $("#luckysheet-sort-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 2 }).show();
        $("#luckysheet-modal-dialog-mask").show();
        

        if (r1 < r2) {
            setTimeout(function () {
                var flowrowdata1 = luckysheet.flowdata[r1], flowrowdata2 = luckysheet.flowdata[r1 + 1], hastitle = false;
                
                for (var i = c1; i <= c2; i++) {
                    var isdatatype_r1 = luckysheet.isdatatype(flowrowdata1[i]), isdatatype_r2 = luckysheet.isdatatype(flowrowdata2[i]);
                    
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
    var hidefilersubmenu = null;
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

        var $type = $(this).data("type");
        var $value = $(this).attr("data-value");
        
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
        var $t = $(this);
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

    //筛选取消
    $("#luckysheet-filter-cancel").click(function () {
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
    });

    //筛选 确认
    $("#luckysheet-filter-confirm").click(function () {
        var $menu = $("#luckysheet-filter-menu");
        var st_r = $menu.data("str"), 
            ed_r = $menu.data("edr"), 
            cindex = $menu.data("cindex"), 
            st_c = $menu.data("stc"), 
            ed_c = $menu.data("edc");

        var rowhiddenother = {}; //其它筛选列的隐藏行
        $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").not($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c).get(0)).each(function () {
            var $t = $(this), rh = $t.data("rowhidden");

            if (rh == "") {
                return true;
            }

            rh = JSON.parse(rh.replace(/\'/g, '"'));
            
            for (var r in rh) {
                rowhiddenother[r] = 0;
            }
        });

        var filterdata = {};
        var rowhidden = {};
        var caljs = {};

        if ($("#luckysheet-filter-bycondition").next().is(":visible") && $("#luckysheet-filter-byvalue").next().is(":hidden") && $("#luckysheet-filter-selected span").data("value") != "null") {
            var $t = $("#luckysheet-filter-selected span");
            var type = $t.data("type"), value = $t.data("value");

            caljs["value"] = value;
            caljs["text"] = $t.text();

            if (type == "0") {
                caljs["type"] = "0";
            }
            else if (type == "2") {
                var $input = $("#luckysheet-filter-menu .luckysheet-filter-selected-input2 input");
                caljs["type"] = "2";
                caljs["value1"] = $input.eq(0).val();
                caljs["value2"] = $input.eq(1).val();
            }
            else {
                caljs["type"] = "1";
                caljs["value1"] = $("#luckysheet-filter-menu .luckysheet-filter-selected-input").eq(0).find("input").val();
            }

            for (var r = st_r + 1; r <= ed_r; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(luckysheet.flowdata[r] == null){
                    continue;
                }

                var cell = luckysheet.flowdata[r][cindex];
                
                if (value == "cellnull") { //单元格为空
                    if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "cellnonull") { //单元格有数据
                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                }
                else if (value == "textinclude") { //文本包含 
                    var value1 = caljs["value1"];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m.indexOf(value1) == -1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textnotinclude") { //文本不包含
                    var value1 = caljs["value1"];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){

                    }
                    else{
                        if(cell.m.indexOf(value1) > -1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textstart") { //文本开头为
                    var value1 = caljs["value1"], valuelen = value1.length;

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m.substr(0, valuelen) != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textend") { //文本结尾为
                    var value1 = caljs["value1"], valuelen = value1.length;

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(valuelen > cell.m.length || cell.m.substr(cell.m.length - valuelen, valuelen) != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "textequal") { //文本等于
                    var value1 = caljs["value1"];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                        rowhidden[r] = 0;
                    }
                    else{
                        if(cell.m != value1){
                            rowhidden[r] = 0;
                        }
                    }
                }
                else if (value == "dateequal") { //日期等于
                    var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]);

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                    if(value1 < value2){
                        var min = value1;
                        var max = value2;
                    }
                    else{
                        var max = value1;
                        var min = value2;   
                    }

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                    if(value1 < value2){
                        var min = value1;
                        var max = value2;
                    }
                    else{
                        var max = value1;
                        var min = value2;   
                    }

                    if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
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
                    var day = $(e).siblings("label").text();
                    if(Number(day) < 10){
                        day = "0" + Number(day);
                    }

                    var month = $(e).closest(".monthBox").find(".month label").text().replace("月", "");
                    if(Number(month) < 10){
                        month = "0" + Number(month);
                    }

                    var year = $(e).closest(".yearBox").find(".year label").text().replace("年", "");

                    var itemV = "日期格式#$$$#" + year + "-" + month + "-" + day;

                    filterdata[itemV] = "1";
                }

                if($(e).closest(".textBox").length > 0){
                    var itemV = $(e).closest(".textBox").data("filter");

                    filterdata[itemV] = "1";
                }
            });
            
            for (var r = st_r + 1; r <= ed_r; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(luckysheet.flowdata[r] == null){
                    continue;
                }

                var cell = luckysheet.flowdata[r][cindex];

                if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                    var value = "null#$$$#null";
                }
                else if(cell.ct != null && cell.ct.t == "d"){
                    var fmt = luckysheet.mask.update("YYYY-MM-DD", cell.v);
                    var value = "日期格式#$$$#" + fmt;
                }
                else{
                    var value = cell.v + "#$$$#" + cell.m;
                }

                if(value in filterdata){
                    rowhidden[r] = 0;
                }
            }
        }

        var $top = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c);

        var optionstate = $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']:visible:checked").length < $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']:visible").length || $("#luckysheet-filter-byvalue-input").val().length > 0 || ($("#luckysheet-filter-bycondition").next().is(":visible") && $("#luckysheet-filter-byvalue").next().is(":hidden") && $("#luckysheet-filter-selected span").data("value") != "null");

        var rowhiddenall = $.extend(true, rowhiddenother, rowhidden), 
            rowhidenPre = luckysheet.json.parseJsonParm($top.data("rowhidden"));

        luckysheet.labelFilterOptionState($top, optionstate, rowhidden, caljs, true, st_r, ed_r, cindex, st_c, ed_c);

        var cfg = $.extend(true, {}, config);
        cfg["rowhidden"] = rowhiddenall;

        //保存撤销
        if(clearjfundo){
            var redo = {};
            redo["type"] = "datachangeAll_filter";
            redo["sheetIndex"] = luckysheet.currentSheetIndex;

            redo["config"] = $.extend(true, {}, config);
            redo["curconfig"] = cfg;

            redo["optionstate"] = optionstate;
            redo["optionsindex"] = cindex - st_c;

            redo["rowhidden"] = $.extend(true, {}, rowhidden);
            redo["rowhidenPre"] = $.extend(true, {}, rowhidenPre);

            if (caljs != null) {
                redo["caljs"] = caljs;
            }

            luckysheet.jfundo = [];
            luckysheet.jfredo.push(redo);
        }

        //config
        config = cfg;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

        luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });

        //行高、列宽 刷新  
        luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);

        // luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        luckysheet.cleargridelement();
    });

    luckysheet.json = {
        parseJsonParm: function(obj){
            if(obj == null){
                return {};
            }
            else if(luckysheet.getObjType(obj) == "string"){
                try {
                    var json = eval('('+ obj +')');
                    return json;
                } 
                catch(e) {
                    return {};
                }
            }
            else{
                return obj;
            }
        },
        hasKey: function(obj){
            var _this = this;
            var json = _this.parseJsonParm(obj);
            
            for(var item in json){
                return true;
            }

            return false;
        }
    }
	
    

    //info处理
    // $("#luckysheet_info_detail_user").html(luckysheetConfigsetting.userInfo+'&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i>').click(function(){
    //     if(luckysheetConfigsetting.userMenuItem.length==0){
    //         return
    //     }

    //     var userlen = $(this).outerWidth();
    //     var tlen = $("#luckysheet-user-menu").outerWidth();

    //     var menuleft = $(this).offset().left;
    //     if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
    //         menuleft = menuleft - tlen + userlen;
    //     }

    //     mouseclickposition($("#luckysheet-user-menu"), menuleft, $(this).offset().top+20, "lefttop");
    // });

    if(luckysheetConfigsetting.userMenuItem.length>0){
        $("body").append('<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel" id="luckysheet-user-menu">${item}</div>');
        var itemset = "";
        for(var i=0;i<luckysheetConfigsetting.userMenuItem.length;i++){
            var item = luckysheetConfigsetting.userMenuItem[i];
            itemset += '<div data-src="'+ item.url +'" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel" style="padding: 6px 0px 6px 5px;"><span style="margin-right:3px;" class="icon luckysheet-mousedown-cancel">'+ item.icon +'</span> '+ item.name +'</div></div>';
        }
        $("#luckysheet-user-menu").html(itemset).find("i").addClass("luckysheet-mousedown-cancel").end().find(".luckysheet-cols-menuitem").click(function(){
            window.open($(this).data("src"), "_self");
        });
    }

    $("#luckysheet_info_detail_title").click(function(){
        window.open(luckysheetConfigsetting.myFolderUrl, "_self");
    });


    $("#luckysheet_info_detail_input").val(luckysheet.server.title).css("width", luckysheet.getByteLen(luckysheet.server.title)*10).keydown(function(){
        var ctrlKey = event.ctrlKey;
        var altKey = event.altKey;
        var shiftKey = event.shiftKey;
        var kcode = event.keyCode;
        var $t = $(this);
        if(kcode == keycode.ENTER){
            $t.blur().change();
        }
    }).bind('input propertychange', function() { 
        var $t = $(this);
        var inputlen = luckysheet.getByteLen($t.val())*10;
        var updatelen = $("#luckysheet_info_detail_update").outerWidth();
        var savelen = $("#luckysheet_info_detail_save").outerWidth();
        var userlen = $("#luckysheet_info_detail_user").parent().outerWidth()+60;
        var containerlen = $("#"+container).outerWidth();
        var otherlen = 100;

        var minuslen = containerlen- savelen - updatelen - userlen - otherlen;
        if(inputlen > minuslen){
            $("#luckysheet_info_detail_input").css("width", minuslen);
        }
        else{
            $("#luckysheet_info_detail_input").css("width", inputlen);
        }
    }).change(function(){
        luckysheet.server.saveParam("na", null, $(this).val());
    });


    //公式处理
    $("#luckysheet-functionbox-cell").focus(function () {
        if(luckysheet.isEditMode()){//此模式下禁用公式栏
            return;
        }

        if(luckysheet_select_save.length > 0){
            var last = luckysheet_select_save[luckysheet_select_save.length - 1];

            var row_index = last["row_focus"], col_index = last["column_focus"];
            var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
            var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];

            var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, row_index, col_index);
            if(!!margeset){
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];
                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
            }
            
            luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata, null, true);
            luckysheet.formula.rangeResizeTo = $("#luckysheet-functionbox-cell");
        }
    }).keydown(function (event) {
        if(luckysheet.isEditMode()){//此模式下禁用公式栏
            return;
        }

        var ctrlKey = event.ctrlKey;
        var altKey = event.altKey;
        var shiftKey = event.shiftKey;
        var kcode = event.keyCode;
        var $inputbox = $("#luckysheet-input-box");
        //luckysheet.formula.rangeHightlightselected();


        if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible") && luckysheet.formula.searchFunctionCell != null) {
                luckysheet.formula.searchFunctionEnter($("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active"));
            }
            else {
                luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
                luckysheet_select_save = [{ "row": [luckysheetCellUpdate[0], luckysheetCellUpdate[0]], "column": [luckysheetCellUpdate[1], luckysheetCellUpdate[1]], "row_focus": luckysheetCellUpdate[0], "column_focus": luckysheetCellUpdate[1] }];
                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
                $("#luckysheet-functionbox-cell").blur();
            }
            event.preventDefault();
        }
        else if (kcode == keycode.ESC && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.dontupdate();
            luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            event.preventDefault();
        }
        else if (kcode == keycode.F4 && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.setfreezonFuc(event);
            event.preventDefault();
        }
        else if (kcode == keycode.UP && parseInt($inputbox.css("top")) > 0) {
            if ($("#luckysheet-formula-search-c").is(":visible")) {
                var $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").prev();
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
                var $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").next();
                if ($up.length == 0) {
                    $up = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").first();
                }
                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $up.addClass("luckysheet-formula-search-item-active");
                event.preventDefault();
            }
        }
        else if (kcode == keycode.LEFT && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
        }
        else if (kcode == keycode.RIGHT && parseInt($inputbox.css("top")) > 0) {
            luckysheet.formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
        }
        else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || (event.ctrlKey && kcode == 86)) {
            luckysheet.formula.functionInputHanddler($("#luckysheet-rich-text-editor"), $("#luckysheet-functionbox-cell"), kcode);
            //         var value1 = $("#luckysheet-functionbox-cell").html(), value1txt = $("#luckysheet-functionbox-cell").text();
            //     	setTimeout(function(){
            //             var value = $("#luckysheet-functionbox-cell").text(), valuetxt = value;
            //             if (value.length > 0 && value.substr(0, 1) == "=" && kcode != 229) {
            //                 value = luckysheet.formula.functionHTMLGenerate(value);
            //                 value1 = luckysheet.formula.functionHTMLGenerate(value1txt);
            //                 if (window.getSelection) {  // all browsers, except IE before version 9
            //                     var currSelection = window.getSelection();
            //                     luckysheet.formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
            //                 }
            //                 else {  // Internet Explorer before version 9
            //                     var textRange = document.selection.createRange();
            //                     luckysheet.formula.functionRangeIndex = textRange;
            //                 }

            //                 $("#luckysheet-functionbox-cell").html(value);

            //          		luckysheet.formula.functionRange($("#luckysheet-functionbox-cell"), value, value1);

            //                 //console.log(value, value1, luckysheet.formula.functionRangeIndex);
            //                 // if (luckysheet.formula.functionRangeIndex != null) {
            //                 //     luckysheet.formula.functionRange($("#luckysheet-functionbox-cell"), value, value1);
            //                 // }
            //                 // else{
            //                 //     luckysheetRangeLast($("#luckysheet-functionbox-cell")[0]);
            //                 // }

            //             }
            //             $("#luckysheet-rich-text-editor").html(value);

            //},1);
        }

    }).click(function () {
        if(luckysheet.isEditMode()){//此模式下禁用公式栏
            return;
        }

        luckysheet.formula.rangeHightlightselected($("#luckysheet-functionbox-cell"));
        //console.log(window.getSelection().getRangeAt(0));
        //if ($(this).text().length == 0) {
        //    luckysheet.formula.functionRangeIndex = null;
        //}
        //else{
        //    if (window.getSelection) {  // all browsers, except IE before version 9
        //        var currSelection = window.getSelection();
        //        luckysheet.formula.functionRangeIndex = currSelection.getRangeAt(0).endOffset;
        //        //currSelection.removeAllRanges();
        //    }
        //    else {  // Internet Explorer before version 9
        //        var textRange = document.selection.createRange();
        //        luckysheet.formula.functionRangeIndex = textRange;
        //    }
        //}
        //console.log(luckysheet.formula.functionRangeIndex);
    });

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

        luckysheet.formula.dontupdate();
        luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
    });

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

        luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
        luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
        //$("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
    });

    $("#luckysheet-wa-functionbox-fx").click(function () {
        //点击函数查找弹出框
        if(luckysheet_select_save.length == 0){
            if(luckysheet.isEditMode()){
                alert("请选择单元格插入函数");
            }
            else{
                luckysheet.tooltip.info("请选择单元格插入函数","");
            }

            return;
        }

        var last = luckysheet_select_save[luckysheet_select_save.length - 1];

        var row_index = last["row_focus"], col_index = last["column_focus"];
        var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
        var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];

        luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata);
        
        var cell = luckysheet.flowdata[row_index][col_index];
        if(cell != null && cell.f != null){
            //单元格有计算
            var functionStr = luckysheet.formula.getfunctionParam(cell.f);
            if(functionStr.fn != null){
                //有函数公式
                luckysheet.insertFormula.formulaParmDialog(functionStr.fn, functionStr.param);
            }
            else{
                //无函数公式
                luckysheet.insertFormula.formulaListDialog();
            }
        }
        else{
            //单元格无计算
            $("#luckysheet-rich-text-editor").html('<span dir="auto" class="luckysheet-formula-text-color">=</span>');
            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
            luckysheet.insertFormula.formulaListDialog();
        }

        luckysheet.insertFormula.init();
    });

    $("#luckysheet-formula-functionrange").on("mousedown", ".luckysheet-copy", function (event) {
        luckysheet.formula.rangeMove = true;
        luckysheet_scroll_status = true;
        luckysheet.formula.rangeMoveObj = $(this).parent();
        luckysheet.formula.rangeMoveIndex = $(this).parent().attr("rangeindex");
        var mouse = mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        $("#luckysheet-formula-functionrange-highlight-" + luckysheet.formula.rangeMoveIndex).find(".luckysheet-selection-copy-hc").css("opacity", 0.13);
        var type = $(this).data("type");
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

        var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];

        var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

        luckysheet.formula.rangeMovexy = [row_index, col_index];
        $("#luckysheet-sheettable").css("cursor", "move");
        event.stopPropagation();
    });

    $("#luckysheet-formula-functionrange").on("mousedown", ".luckysheet-highlight", function (e) {
        luckysheet.formula.rangeResize = $(this).data("type");//开始状态resize
        luckysheet.formula.rangeResizeIndex = $(this).parent().attr("rangeindex");
        var mouse = mouseposition(e.pageX, e.pageY), scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;
        luckysheet.formula.rangeResizeObj = $(this).parent();
        $("#luckysheet-formula-functionrange-highlight-" + luckysheet.formula.rangeResizeIndex).find(".luckysheet-selection-copy-hc").css("opacity", 0.13);
        if (luckysheet.formula.rangeResize == "lt") {
            x += 3;
            y += 3;
        }
        else if (luckysheet.formula.rangeResize == "lb") {
            x += 3;
            y -= 3;
        }
        else if (luckysheet.formula.rangeResize == "rt") {
            x -= 3;
            y += 3;
        }
        else if (luckysheet.formula.rangeResize == "rb") {
            x -= 3;
            y -= 3;
        }

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

        var position = luckysheet.formula.rangeResizeObj.position();
        luckysheet.formula.rangeResizexy = [col_pre, row_pre, luckysheet.formula.rangeResizeObj.width(), luckysheet.formula.rangeResizeObj.height(), position.left + scrollLeft, position.top + scrollTop, col, row];
        luckysheet.formula.rangeResizeWinH = $("#luckysheet-cell-main")[0].scrollHeight
        luckysheet.formula.rangeResizeWinW = $("#luckysheet-cell-main")[0].scrollWidth;
        luckysheet_scroll_status = true;
        event.stopPropagation();
    });

    //图表选区mousedown
    $("#luckysheet-chart-rangeShow").on("mousedown.chartRangeShowMove", ".luckysheet-chart-rangeShow-move", function(event){
        luckysheet.chart_selection.rangeMove = true;
        luckysheet_scroll_status = true;

        luckysheet.chart_selection.rangeMoveObj = $(this).parent();

        var chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");
        // var vue = !!window.generator && generator.chartEditorComponent;
        var chart_json = !!window.store && store.state.chartSetting.chartList[chart_id];
        
        var $id = $(this).parent().attr("id");
        if($id == "luckysheet-chart-rangeShow-content"){
            var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
            var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];

            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }
        else if($id == "luckysheet-chart-rangeShow-rowtitle"){
            var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
            var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];

            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }
        else if($id == "luckysheet-chart-rangeShow-coltitle"){
            var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
            var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];
            
            luckysheet.chart_selection.rangeMoveIndex = [row_s, col_s];
        }

        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        
        var type = $(this).data("type");
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

        var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

        luckysheet.chart_selection.rangeMovexy = [row_index, col_index];

        event.stopPropagation();
    });

    $("#luckysheet-chart-rangeShow").on("mousedown.chartRangeShowResize", ".luckysheet-chart-rangeShow-resize", function(event){
        luckysheet.chart_selection.rangeResize = $(this).data("type");//开始状态resize
        luckysheet_scroll_status = true;

        luckysheet.chart_selection.rangeResizeObj = $(this).parent();

        var chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");
        // var vue = !!window.generator && generator.chartEditorComponent;
        var chart_json = !!window.store && store.state.chartSetting.chartList[chart_id];
        
        var $id = $(this).parent().attr("id");
        if($id == "luckysheet-chart-rangeShow-content"){
            if(chart_json.rangeRowCheck.exits){
                var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
                var row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[1];
            }
            else{
                var row_s = chart_json.rangeSplitArray.content.row[0];
                var row_e = chart_json.rangeSplitArray.content.row[0];
            }

            if(chart_json.rangeColCheck.exits){
                var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];
                var col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[1];
            }
            else{
                var col_s = chart_json.rangeSplitArray.content.column[0];
                var col_e = chart_json.rangeSplitArray.content.column[1];
            }

            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }
        else if($id == "luckysheet-chart-rangeShow-rowtitle"){
            var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
            var row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[1];

            var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];
            var col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[1];

            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }
        else if($id == "luckysheet-chart-rangeShow-coltitle"){
            var row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
            var row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[1];

            var col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];
            var col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[1];
            
            luckysheet.chart_selection.rangeResizeIndex = { "row": [row_s, row_e], "column": [col_s, col_e] };
        }

        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

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

        var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

        luckysheet.chart_selection.rangeResizexy = [row_index, col_index];

        event.stopPropagation();
    })

    $("#luckysheet-wa-calculate-size").mousedown(function(e){
        var y = e.pageY;
        luckysheet.formula.functionResizeData.y = y;
        luckysheet.formula.functionResizeStatus = true;
        luckysheet.formula.functionResizeData.calculatebarHeight = calculatebarHeight;
        if(luckysheet.formula.rangetosheet!=null){
        	luckysheet.formula.updatecell(luckysheetCellUpdate[0], luckysheetCellUpdate[1]);
        }
        
    });

    var luckysheet_function_exe = {};

    for (var i = 0; i < luckysheet.functionlist.length; i++) {
        var func = luckysheet.functionlist[i];
        luckysheet_function_exe[func.n] = func;
    }
    window.luckysheet_function = luckysheet_function_exe;


    //toolbar菜单
    $("#"+ container +" .luckysheet-wa-editor").on("click", ".luckysheet-toolbar-zoom-combobox", function(e){
        $(e.currentTarget).addClass("luckysheet-toolbar-combo-button-open");
        $(e.currentTarget).find(".luckysheet-toolbar-combo-button-input").focus();
    });

    $("#"+ container +" .luckysheet-wa-editor").on("blur", ".luckysheet-toolbar-combo-button-input", function(e){
        $(e.currentTarget).closest(".luckysheet-toolbar-zoom-combobox").removeClass("luckysheet-toolbar-combo-button-open");
    });

    //表格格式处理
    luckysheet.menuButton.initialMenuButton();

    var devicePixelRatio = window.devicePixelRatio || 1;
    devicePixelRatio = Math.ceil(devicePixelRatio);
    
    luckysheet.dpi_x = document.getElementById('testdpidiv').offsetWidth * devicePixelRatio;
    luckysheet.dpi_y = document.getElementById('testdpidiv').offsetHeight * devicePixelRatio;
    $("#testdpidiv").remove();

    //粘贴事件处理
    $(document).on("paste", function(e){
        if(luckysheet.isEditMode()){//此模式下禁用粘贴
            return;
        }

        if(luckysheet.selection.isPasteAction){
            $("#luckysheet-rich-text-editor").blur();
            luckysheet.selection.isPasteAction = false;

            var clipboardData = window.clipboardData; //for IE
            if (!clipboardData) { // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }

            var txtdata = clipboardData.getData("text/html");

            //如果标示是qksheet复制的内容，判断剪贴板内容是否是当前页面复制的内容
            if(txtdata.indexOf("luckysheet_copy_action_table") >- 1 && luckysheet_copy_save["copyRange"] != null && luckysheet_copy_save["copyRange"].length > 0){
                //剪贴板内容解析
                var cpDataArr = [];

                var reg = new RegExp('<tr.*?>(.*?)</tr>', 'g');
                var reg2 = new RegExp('<td.*?>(.*?)</td>', 'g');

                var regArr = txtdata.match(reg);

                for(var i = 0; i < regArr.length; i++){
                    var cpRowArr = [];

                    var reg2Arr = regArr[i].match(reg2);

                    for(var j = 0; j < reg2Arr.length; j++){
                        var cpValue = reg2Arr[j].replace(/<td.*?>/g, "").replace(/<\/td>/g, "");
                        cpRowArr.push(cpValue);
                    }

                    cpDataArr.push(cpRowArr);
                }

                //当前页面复制区内容
                var copy_r1 = luckysheet_copy_save["copyRange"][0].row[0],
                    copy_r2 = luckysheet_copy_save["copyRange"][0].row[1],
                    copy_c1 = luckysheet_copy_save["copyRange"][0].column[0],
                    copy_c2 = luckysheet_copy_save["copyRange"][0].column[1];

                var copy_index = luckysheet_copy_save["dataSheetIndex"];

                if(copy_index == luckysheet.currentSheetIndex){
                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                }
                else{
                    var d = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(copy_index)].data;
                }

                var isEqual = true;

                for(var r = copy_r1; r <= copy_r2; r++){
                    if(r - copy_r1 > 5){
                        break;
                    }

                    for(var c = copy_c1; c <= copy_c2; c++){
                        var cell = d[r][c];

                        if(cell != null && cell.ct != null && cell.ct.fa.indexOf("w") > -1){
                            var v = d[r][c].v;
                        }
                        else{
                            var v = d[r][c].m;
                        }

                        if(v != cpDataArr[r - copy_r1][c - copy_c1]){
                            isEqual = false;
                            break;
                        }
                    }
                }
            }

            if(txtdata.indexOf("luckysheet_copy_action_table") >- 1 && luckysheet_copy_save["copyRange"] != null && luckysheet_copy_save["copyRange"].length > 0 && isEqual){
                //剪切板内容 和 luckysheet本身复制的内容 一致
                if(luckysheet_paste_iscut){
                    luckysheet_paste_iscut = false;
                    luckysheet.selection.pasteHandlerOfCutPaste(luckysheet_copy_save);
                    luckysheet.selection.clearcopy(e);
                }
                else{
                    luckysheet.selection.pasteHandlerOfCopyPaste(luckysheet_copy_save);
                }
            }
            else{
                // if(txtdata.indexOf("table") > -1 && txtdata.indexOf("microsoft") > -1 && txtdata.indexOf("office") > -1 && txtdata.indexOf("excel") > -1 && txtdata.indexOf("mso-") > -1){
                if(txtdata.indexOf("table") > -1){
                    $("#luckysheet-copy-content").html(txtdata);

                    var data = new Array($("#luckysheet-copy-content").find("table tr").length);
                    var colLen = 0;
                    $("#luckysheet-copy-content").find("table tr").eq(0).find("td").each(function(){
                        var colspan = parseInt($(this).attr("colspan"));
                        if(isNaN(colspan)){
                            colspan = 1;
                        }
                        colLen += colspan;
                    });

                    for(var i = 0; i < data.length; i++){
                        data[i] = new Array(colLen);
                    }

                    var r = 0;
                    var borderInfo = {};
                    $("#luckysheet-copy-content").find("table tr").each(function(){
                        var $tr = $(this);
                        var c = 0;
                        $tr.find("td").each(function(){
                            var $td = $(this);
                            var cell = {};
                            var txt = $td.text();

                            if($.trim(txt).length == 0){
                                cell.v = null;
                                cell.m = "";
                            }
                            else{
                                var mask = luckysheet.mask.genarate($td.text());
                                cell.v = mask[2];
                                cell.ct = mask[1];
                                cell.m = mask[0]; 
                            }

                            var bg = $td.css("background-color");
                            if(bg == "rgba(0, 0, 0, 0)"){
                                bg = "rgba(255,255,255)";
                            }
                            // console.log(bg);
                            // if(bg.indexOf("rgb")>-1){
                            //     bg = luckysheet.rgbTohex(bg);
                            // }
                            // console.log(bg);
                            cell.bg = bg;

                            var bl = $td.css("font-weight");
                            if(bl == 400 || bl == "normal"){
                                cell.bl = 0;
                            }
                            else{
                                cell.bl = 1;
                            }

                            var it = $td.css("font-style");
                            if(it == "normal"){
                                cell.it = 0;
                            }
                            else{
                                cell.it = 1;
                            }

                            var ff = $td.css("font-family");
                            var ffs = ff.split(",");
                            for(var i = 0; i < ffs.length; i++){
                                var fa = $.trim(ffs[i].toLowerCase());
                                fa = luckysheet.menuButton.fontjson[fa];
                                if(fa == null){
                                    cell.ff = 0;
                                }
                                else{
                                    cell.ff = fa;
                                    break;
                                }
                            }

                            var fs = Math.floor(parseInt($td.css("font-size")) * 72 / luckysheet.dpi_y) + 1;
                            cell.fs = fs;

                            var fc = $td.css("color");
                            // if(fc.indexOf("rgb")>-1){
                            //     fc = luckysheet.rgbTohex(fc);
                            // }
                            cell.fc = fc;

                            var ht = $td.css("text-align");
                            if(ht == "center"){
                                cell.ht = 0;
                            }
                            else if(ht == "right"){
                                cell.ht = 2;
                            }
                            else{
                                cell.ht = 1;
                            }

                            var vt = $td.css("vertical-align");
                            if(vt == "middle"){
                                cell.vt = 0;
                            }
                            else if(vt == "top" || vt == "text-top"){
                                cell.vt = 1;
                            }
                            else{
                                cell.vt = 2;
                            }

                            // var borderstyle = $td.css("border");

                            // if(borderstyle != null && borderstyle.length > 0 && borderstyle.substr(0, 3).toLowerCase() != "0px"){
                            //     var width = $td.css("border-width");
                            //     var type = $td.css("border-style");
                            //     var color = $td.css("border-color");
                            //     var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);
                            //     cell.bs = borderconfig[0];
                            //     cell.bc = borderconfig[1];
                            // }
                            // else{
                            //     var bt = $td.css("border-top");
                            //     if(bt != null && bt.length > 0 && bt.substr(0, 3).toLowerCase() != "0px"){
                            //         var width = $td.css("border-top-width");
                            //         var type = $td.css("border-top-style");
                            //         var color = $td.css("border-top-color");
                            //         var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);
                            //         cell.bs_t = borderconfig[0];
                            //         cell.bc_t = borderconfig[1];
                            //     }
                            //     var bb = $td.css("border-bottom");
                            //     if(bb != null && bb.length > 0 && bb.substr(0, 3).toLowerCase() != "0px"){
                            //         var width = $td.css("border-bottom-width");
                            //         var type = $td.css("border-bottom-style");
                            //         var color = $td.css("border-bottom-color");
                            //         var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);
                            //         cell.bs_b = borderconfig[0];
                            //         cell.bc_b = borderconfig[1];
                            //     }
                            //     var bl = $td.css("border-left");
                            //     if(bl != null && bl.length > 0 && bl.substr(0, 3).toLowerCase() != "0px"){
                            //         var width = $td.css("border-left-width");
                            //         var type = $td.css("border-left-style");
                            //         var color = $td.css("border-left-color");
                            //         var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);
                            //         cell.bs_l = borderconfig[0];
                            //         cell.bc_l = borderconfig[1];
                            //     }
                            //     var br = $td.css("border-right");
                            //     if(br != null && br.length > 0 && br.substr(0, 3).toLowerCase() != "0px"){
                            //         var width = $td.css("border-right-width");
                            //         var type = $td.css("border-right-style");
                            //         var color = $td.css("border-right-color");
                            //         var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);
                            //         cell.bs_r = borderconfig[0];
                            //         cell.bc_r = borderconfig[1];

                            //         if(bl != null && bl.length > 0 && bl.substr(0, 3).toLowerCase() != "0px"){

                            //         }
                            //         else{
                            //             if(bb != null && bb.length > 0 && bb.substr(0, 3).toLowerCase() != "0px"){
                            //                 cell.bs_l = borderconfig[0];
                            //                 cell.bc_l = borderconfig[1];
                            //             }
                            //         }
                            //     }
                            // }

                            while (c < colLen && data[r][c] != null) {
                                c++;
                            }

                            if(c == colLen){
                                return true;
                            }

                            if(data[r][c] == null){
                                data[r][c] = cell;
                                var rowspan = parseInt($td.attr("rowspan"));
                                var colspan = parseInt($td.attr("colspan"));
                                
                                if(isNaN(rowspan)){
                                    rowspan = 1;
                                }

                                if(isNaN(colspan)){
                                    colspan = 1;
                                }

                                var r_ab = luckysheet_select_save[0]["row"][0] + r;
                                var c_ab = luckysheet_select_save[0]["column"][0] + c;
                                for(var rp = 0; rp < rowspan; rp++){
                                    for(var cp = 0; cp < colspan; cp++){
                                        if(rp == 0){
                                            var bt = $td.css("border-top");
                                            if(bt != null && bt.length > 0 && bt.substr(0, 3).toLowerCase() != "0px"){
                                                var width = $td.css("border-top-width");
                                                var type = $td.css("border-top-style");
                                                var color = $td.css("border-top-color");
                                                var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].t = { "style": borderconfig[0], "color": borderconfig[1] }; 
                                            }
                                        }

                                        if(rp == rowspan - 1){
                                            var bb = $td.css("border-bottom");
                                            if(bb != null && bb.length > 0 && bb.substr(0, 3).toLowerCase() != "0px"){
                                                var width = $td.css("border-bottom-width");
                                                var type = $td.css("border-bottom-style");
                                                var color = $td.css("border-bottom-color");
                                                var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].b = { "style": borderconfig[0], "color": borderconfig[1] };
                                            }
                                        }

                                        if(cp == 0){
                                            var bl = $td.css("border-left");
                                            if(bl != null && bl.length > 0 && bl.substr(0, 3).toLowerCase() != "0px"){
                                                var width = $td.css("border-left-width");
                                                var type = $td.css("border-left-style");
                                                var color = $td.css("border-left-color");
                                                var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);

                                                if(borderInfo[(r + rp) + "_" + (c + cp)] == null){
                                                    borderInfo[(r + rp) + "_" + (c + cp)] = {};
                                                }

                                                borderInfo[(r + rp) + "_" + (c + cp)].l = { "style": borderconfig[0], "color": borderconfig[1] };
                                            }
                                        }

                                        if(cp == colspan - 1){
                                            var br = $td.css("border-right");
                                            if(br != null && br.length > 0 && br.substr(0, 3).toLowerCase() != "0px"){
                                                var width = $td.css("border-right-width");
                                                var type = $td.css("border-right-style");
                                                var color = $td.css("border-right-color");
                                                var borderconfig = luckysheet.menuButton.getQKBorder(width, type, color);

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
                                    var first = { "rs": rowspan, "cs": colspan, "r": r_ab, "c": c_ab};
                                    data[r][c].mc = first;
                                    // mclist.push(first);
                                }
                            }
                            
                            c++;

                            if(c == colLen){
                                return true;
                            }
                            //row.push(cell);
                        });

                        r++;
                        //data.push(row);
                    });

                    luckysheet_selection_range = [];
                    luckysheet.selection.pasteHandler(data, borderInfo);
                    $("#luckysheet-copy-content").empty();
                }
                else{
                    txtdata = clipboardData.getData("text/plain");
                    luckysheet.selection.pasteHandler(txtdata);
                }
            }
        }
    });

    if(luckysheetConfigsetting.enablePage){
        $("#luckysheet-bottom-page-next").click(function(){
      
            // rptapp
            var queryExps = luckysheetConfigsetting.pageInfo.queryExps;
            var reportId = luckysheetConfigsetting.pageInfo.reportId;
            var fields = luckysheetConfigsetting.pageInfo.fields;
            var mobile = luckysheetConfigsetting.pageInfo.mobile;
            var frezon = luckysheetConfigsetting.pageInfo.frezon;
            var currentPage = luckysheetConfigsetting.pageInfo.currentPage;
            var totalPage = luckysheetConfigsetting.pageInfo.totalPage;
            var pageUrl = luckysheetConfigsetting.pageInfo.pageUrl;

            // rptapp
            luckysheet.method.addDataAjax({"queryExps":queryExps, "reportId":reportId, "fields":fields, "mobile":mobile, "frezon":frezon ,"pageIndex": currentPage,"currentPage":currentPage}, luckysheet.currentSheetIndex, pageUrl, function(){

                luckysheetConfigsetting.pageInfo.currentPage++;
                //$("#luckysheet-bottom-page-info").html('共'+ luckysheetConfigsetting.pageInfo.totalPage +'页，当前已显示'+ (luckysheetConfigsetting.pageInfo.currentPage+1) +'页，每页'+ luckysheetConfigsetting.pageInfo.pageSize +'条');
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
    $("#luckysheet-bottom-bottom-top").click(function(){
        $("#luckysheet-scrollbar-y").scrollTop(0);
    }).mousedown(function(e){
        e.stopPropagation();
    });
    

}