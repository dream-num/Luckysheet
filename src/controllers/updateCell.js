import pivotTable from './pivotTable';
import luckysheetFreezen from './freezen';
import menuButton from './menuButton';
import conditionformat from './conditionformat';
import alternateformat from './alternateformat';
import { chatatABC } from '../utils/util';
import { isEditMode } from '../global/validate';
import { getcellvalue } from '../global/getdata';
import { valueShowEs } from '../global/format';
import formula from '../global/formula';
import { luckysheetRangeLast } from '../global/cursorPos';
import cleargridelement from '../global/cleargridelement';
import Store from '../store';

export default function luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, d, cover, isnotfocus) {
    if(isEditMode()){//此模式下禁用单元格编辑
        return;
    }

    if($("#luckysheet-dropCell-icon").is(":visible")){
        $("#luckysheet-dropCell-icon").remove();
    }

    let winH = $(window).height(), winW = $(window).width();
    let container_offset = $("#" + Store.container).offset();
    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();

    let left = col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft,
        top = row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columeHeaderHeight - scrollTop;

    if (pivotTable.isPivotRange(row_index, col_index)) {
        return;
    }

    Store.luckysheetCellUpdate = [row_index, col_index];
    if (!isnotfocus) {
        $("#luckysheet-rich-text-editor").focus().select();
    }

    $("#luckysheet-input-box").removeAttr("style").css({ 
        "background-color": "rgb(255, 255, 255)", 
        "padding": "0px 2px", 
        "font-size": "13px", 
        "max-width": winW + scrollLeft - col_pre - 20 - Store.rowHeaderWidth, 
        "max-height": winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight, 
        "min-width": col - col_pre + 1 - 8, 
        "min-height": row - row_pre + 1 - 4, 
        "left": left - 2, 
        "top": top - 2, 
        "right": "auto", 
        "overflow-y": "auto",
        "box-sizing": "initial"
    });

    if(luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null){
        $("#luckysheet-input-box").css("z-index", 10002);
    }
    
    $("#luckysheet-input-box-index").html(chatatABC(col_index) + (row_index + 1)).hide();
    $("#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm").addClass("luckysheet-wa-calculate-active");
    
    let value = "";
    
    if (d[row_index] != null && d[row_index][col_index] != null) {
        let cell = d[row_index][col_index];
        
        if (!cover) {
            if(cell.f!=null){
                value = getcellvalue(row_index, col_index, d, "f");
            }
            else{
                value = valueShowEs(row_index, col_index, d);
            }
        }
        
        let style = menuButton.getStyleByCell(d, row_index, col_index);
        style = $("#luckysheet-input-box").get(0).style.cssText + style;

        $("#luckysheet-input-box").get(0).style.cssText = style;
        if($("#luckysheet-input-box").get(0).style.backgroundColor == "rgba(0, 0, 0, 0)"){
            $("#luckysheet-input-box").get(0).style.background = "rgb(255,255,255)";
        }
    }
    else{
        //交替颜色
        let af_compute = alternateformat.getComputeMap();
        var checksAF = alternateformat.checksAF(row_index, col_index, af_compute);

        //条件格式
        var cf_compute = conditionformat.getComputeMap();
        var checksCF = conditionformat.checksCF(row_index, col_index, cf_compute);

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

    formula.rangetosheet = Store.currentSheetIndex;
    formula.createRangeHightlight();
    formula.rangeResizeTo = $("#luckysheet-rich-text-editor");
    cleargridelement();
}
