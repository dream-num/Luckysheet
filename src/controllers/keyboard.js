import luckysheetConfigsetting from './luckysheetConfigsetting';
import menuButton from './menuButton';
import conditionformat from './conditionformat';
import server from './server';
import {luckysheetupdateCell,setCenterInputPosition} from './updateCell';
import { keycode } from './constant';
import { 
    luckysheetMoveHighlightCell, 
    luckysheetMoveHighlightCell2, 
    luckysheetMoveHighlightRange, 
    luckysheetMoveHighlightRange2 
} from './sheetMove';
import { selectHightlightShow, selectIsOverlap } from './select';
import selection from './selection';
import searchReplace from './searchReplace';
import controlHistory from './controlHistory';
import imageCtrl from './imageCtrl';

import { 
    getByteLen,
    getNowDateTime,
    luckysheetactiveCell,
} from '../utils/util';
import { getSheetIndex } from '../methods/get';
import { hasPartMC, isEditMode } from '../global/validate';
import { luckysheetRangeLast } from '../global/cursorPos';
import formula from '../global/formula';
import cleargridelement from '../global/cleargridelement';
import tooltip from '../global/tooltip';
import locale from '../locale/locale';
import {enterKeyControll} from './inlineString';
import Store from '../store';


let luckysheet_shiftkeydown = false;

function formulaMoveEvent(dir, ctrlKey, shiftKey, event){
    if ($("#luckysheet-formula-search-c").is(":visible") && (dir=="up" || dir=="down") ) {
        let $obj;
        if(dir=="down"){
            $obj = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").next();
            if ($obj.length == 0) {
                $obj = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").first();
            }
        }
        else if(dir=="up"){
            $obj = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item-active").prev();
            if ($obj.length == 0) {
                $obj = $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").last();
            }
        }
        

        $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
        $obj.addClass("luckysheet-formula-search-item-active");

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
            event.preventDefault();
        }
        else if(formula.israngeseleciton()){
            let anchor = $(window.getSelection().anchorNode);
            // console.log(anchor.parent().next().text());
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

                event.preventDefault();
            }

        }
        else if(!ctrlKey && !shiftKey){
            let anchor = $(window.getSelection().anchorNode);
            let anchorOffset = window.getSelection().anchorOffset;

            if(dir == 'up'){
                if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");

                    event.preventDefault();
                }
            }
            else if(dir == 'down'){
                if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");

                    event.preventDefault();
                }
            }
            else if(dir == 'left'){
                if(anchor.parent().is("span") && anchor.parent().prev().length == 0 && anchorOffset == 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.is("#luckysheet-rich-text-editor") && anchorOffset == 1){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchorOffset == 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");

                    event.preventDefault();
                }
                else{
                    formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));
                }
            }
            else if(dir == 'right'){
                if(anchor.parent().is("span") && anchor.parent().next().length == 0 && anchorOffset > 0){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.is("#luckysheet-rich-text-editor") && anchor.context.childElementCount == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                    event.preventDefault();
                }
                else if(anchor.parent().is("#luckysheet-rich-text-editor") && anchor.context.length == anchorOffset){
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");

                    event.preventDefault();
                }
                else{
                    formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));
                }
            }
        }
    }
}

export function keyboardInitial(){
    const _locale = locale();
    const locale_drag = _locale.drag;

    //单元格编辑输入
    $("#luckysheet-input-box").click(function () {
        formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));
    }).add("#" + Store.container).on("keydown", function (event) {
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

        if ($("#luckysheet-modal-dialog-mask").is(":visible") || $(event.target).hasClass("luckysheet-mousedown-cancel") || $(event.target).hasClass("formulaInputFocus")) {
            return;
        }
        
        let $inputbox = $("#luckysheet-input-box");
        
        if((altKey || event.metaKey) && kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0){
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let row_index = last["row_focus"], col_index = last["column_focus"];
            enterKeyControll(Store.flowdata[row_index][col_index]);
            event.preventDefault();
        }
        else if (kcode == keycode.ENTER && parseInt($inputbox.css("top")) > 0) {
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

            luckysheetupdateCell(row_index, col_index, Store.flowdata);
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

                luckysheetupdateCell(row_index, col_index, Store.flowdata);
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
                    else if (kcode == 186 || kcode == 222) {
                        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
                        let row_index = last["row_focus"], 
                            col_index = last["column_focus"];
                        luckysheetupdateCell(row_index, col_index, Store.flowdata, true);

                        let value = getNowDateTime(2);
                        $("#luckysheet-rich-text-editor").html(value);
                        luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
                        formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                    }
                }
                else if (kcode == 66) {//Ctrl + B  加粗
                    $("#luckysheet-icon-bold").click();
                }
                else if (kcode == 67) {//Ctrl + C  复制
                    if(imageCtrl.currentImgId != null){
                        imageCtrl.copyImgItem(event);
                        return;
                    }

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
                                alert(locale_drag.noMerge);
                            }
                            else{
                                tooltip.info(locale_drag.noMerge, ""); 
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
                                alert(locale_drag.noMulti);
                            }
                            else{
                                tooltip.info(locale_drag.noMulti, "");
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
                                alert(locale_drag.noMulti);
                            }
                            else{
                                tooltip.info(locale_drag.noMulti, ""); 
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
                    if (isEditMode() || Store.allowEdit === false){//此模式下禁用粘贴
                        return;
                    }

                    if($(event.target).hasClass("formulaInputFocus")){
                        return;
                    }

                    if(Store.luckysheet_select_save.length > 1){
                        if(isEditMode()){
                            alert(locale_drag.noPaste);
                        }
                        else{
                            tooltip.info(locale_drag.noPaste, "");
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
                                alert(_locale_drag.noMerge);
                            }
                            else{
                                tooltip.info(_locale_drag.noMerge, ""); 
                            }
                            return;    
                        }
                    }

                    //多重选区时 提示
                    if(Store.luckysheet_select_save.length > 1){
                        if(isEditMode()){
                            alert(locale_drag.noMulti);
                        }
                        else{
                            tooltip.info(locale_drag.noMulti, ""); 
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
                else if (kcode == 186) {//Ctrl + ; 填充系统日期
                    let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
                    let row_index = last["row_focus"], 
                        col_index = last["column_focus"];
                    luckysheetupdateCell(row_index, col_index, Store.flowdata, true);

                    let value = getNowDateTime(1);
                    $("#luckysheet-rich-text-editor").html(value);
                    luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
                    formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                }
                else if (kcode == 222) {//Ctrl + ' 填充系统时间
                    let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
                    let row_index = last["row_focus"], 
                        col_index = last["column_focus"];
                    luckysheetupdateCell(row_index, col_index, Store.flowdata, true);

                    let value = getNowDateTime(2);
                    $("#luckysheet-rich-text-editor").html(value);
                    luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
                    formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                }
                else if (String.fromCharCode(kcode).toLocaleUpperCase() == "A") {//Ctrl + A  全选
                    // $("#luckysheet-left-top").trigger("mousedown");
                    // $(document).trigger("mouseup");
                    $("#luckysheet-left-top").click()
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
                // else if (altKey && (kcode == 54 || kcode == 102)) {
                //     //Alt + Shift + 6（删除线）
                //     $("#luckysheet-icon-underline").click();
                // }

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
            else if (kcode == keycode.DELETE || kcode == keycode.BACKSPACE) {
                if(imageCtrl.currentImgId != null){
                    imageCtrl.removeImgItem();
                }
                else{
                    $("#luckysheet-delete-text").click();
                }

                event.preventDefault();
            }
            else if(kcode == 8 && imageCtrl.currentImgId != null){
                imageCtrl.removeImgItem();
                event.preventDefault();
            }
            else if (kcode == keycode.UP) {
                if (parseInt($inputbox.css("top")) > 0 || Store.luckysheet_cell_selected_move || Store.luckysheet_cell_selected_extend || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("down", -1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.DOWN) {
                if (parseInt($inputbox.css("top")) > 0 || Store.luckysheet_cell_selected_move || Store.luckysheet_cell_selected_extend || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("down", 1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.LEFT) {
                if (parseInt($inputbox.css("top")) > 0 || Store.luckysheet_cell_selected_move || Store.luckysheet_cell_selected_extend || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("right", -1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (kcode == keycode.RIGHT) {
                if (parseInt($inputbox.css("top")) > 0 || Store.luckysheet_cell_selected_move || Store.luckysheet_cell_selected_extend || $(event.target).hasClass("formulaInputFocus") || $("#luckysheet-singleRange-dialog").is(":visible") || $("#luckysheet-multiRange-dialog").is(":visible")) {
                    return;
                }

                luckysheetMoveHighlightCell("right", 1, "rangeOfSelect");
                event.preventDefault();
            }
            else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40))) || kcode == 8 || kcode == 32 || kcode == 46 || kcode == 0 || (event.ctrlKey && kcode == 86)) {
                if (String.fromCharCode(kcode) != null && $("#luckysheet-cell-selected").is(":visible") && (kcode != keycode.CAPSLOCK && kcode != keycode.WIN && kcode != 18)) {
                    let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

                    let row_index = last["row_focus"], col_index = last["column_focus"];

                    luckysheetupdateCell(row_index, col_index, Store.flowdata, true);
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
            formulaMoveEvent("up", ctrlKey, shiftKey,event);
        }
        else if (kcode == keycode.DOWN && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("down", ctrlKey, shiftKey,event);
        }
        else if (kcode == keycode.LEFT && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("left", ctrlKey, shiftKey,event);
        }
        else if (kcode == keycode.RIGHT && parseInt($inputbox.css("top")) > 0) {
            formulaMoveEvent("right", ctrlKey, shiftKey,event);
        }
        else if (!((kcode >= 112 && kcode <= 123) || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || (event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40 || kcode == keycode.WIN || kcode == keycode.WIN_R || kcode == keycode.MENU))) || kcode == 8 || kcode == 32 || kcode == 46 || (event.ctrlKey && kcode == 86)) {
            // if(event.target.id!="luckysheet-input-box" && event.target.id!="luckysheet-rich-text-editor"){
                formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
                setCenterInputPosition(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1], Store.flowdata);
            // }
            
        }
    }).keyup(function (e) {
        let kcode = e.keyCode;
        
        if (!e.shiftKey && kcode == 16) {
            Store.luckysheet_shiftkeydown = false;
            Store.luckysheet_shiftpositon = null;
        }

        //输入框中文输入后 shift 和 空格 处理
        if(parseInt($("#luckysheet-input-box").css("top")) > 0 && (kcode == 13 || kcode == 16 || kcode == 32)){
            // if(event.target.id=="luckysheet-input-box" || event.target.id=="luckysheet-rich-text-editor"){
            //     formula.functionInputHanddler($("#luckysheet-functionbox-cell"), $("#luckysheet-rich-text-editor"), kcode);
            // }
        }

        e.preventDefault();
    });

    //top workBook rename
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


    // 右击菜单的input输入框 敲击Enter一样生效
    $("#" + Store.container).add("input.luckysheet-mousedown-cancel").keydown(function (event) {

        const element =  event.target.closest('.luckysheet-cols-menuitem');
        if (typeof(element) != 'undefined' && element != null && event.keyCode === 13){
            $(element).trigger('click');
        }

    })
}