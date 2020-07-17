import { getSheetIndex } from '../methods/get';
import editor from '../global/editor';
import { isRealNull, isEditMode } from '../global/validate';
import tooltip from '../global/tooltip';
import { orderbydata } from '../global/sort';
import { rowlenByRange } from '../global/getRowlen';
import { jfrefreshgrid } from '../global/refresh';
import { selectHightlightShow } from './select';
import { luckysheetMoveEndCell } from './sheetMove';
import server from './server';
import Store from '../store';

//筛选配置状态
function labelFilterOptionState($top, optionstate, rowhidden, caljs, notSave, str, edr, cindex, stc, edc) {
    if (optionstate) {
        $top.addClass("luckysheet-filter-options-active").data("rowhidden", JSON.stringify(rowhidden)).data("caljs", JSON.stringify(caljs)).html('<i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i>');

        if (caljs != null) {
            $top.data("byconditionvalue", caljs["value"]).data("byconditiontype", caljs["type"]).data("byconditiontext", caljs["text"]);
            
            if (caljs["value1"] != null) {
                $top.data("byconditionvalue1", caljs["value1"]);
            }

            if (caljs["value2"] != null) {
                $top.data("byconditionvalue2", caljs["value2"]);
            }
        }
    }
    else {
        $top.removeClass("luckysheet-filter-options-active").data("rowhidden", "").data("caljs", "").html('<i class="fa fa-caret-down luckysheet-mousedown-cancel" aria-hidden="true"></i>');

        $top.data("byconditionvalue", "null").data("byconditiontype", "0").data("byconditiontext", "无").data("byconditionvalue1", "").data("byconditionvalue2", "");
    }

    if(!!notSave){
        let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

        if(file.filter == null){
            file.filter = {};
        }

        if (optionstate) {
            let param = {
                "caljs": caljs, 
                "rowhidden": rowhidden, 
                "optionstate": optionstate,
                "str": str,
                "edr": edr,
                "cindex": cindex,
                "stc": stc,
                "edc": edc
            };
            file.filter[cindex - stc] = param;
        }
        else {
            delete file.filter[cindex - stc];
        }

        server.saveParam("all", Store.currentSheetIndex, file.filter, { "k": "filter" });
    }
}

//筛选排序
function orderbydatafiler(str, stc, edr, edc, index, asc) {
    let d = editor.deepCopyFlowData(Store.flowdata);

    str = str + 1;

    let hasMc = false; //排序选区是否有合并单元格
    let data = [];

    for(let r = str; r <= edr; r++){
        let data_row = [];

        for(let c = stc; c <= edc; c++){
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
            alert("筛选选区有合并单元格，无法执行此操作！");
        }
        else{
            tooltip.info("筛选选区有合并单元格，无法执行此操作！", "");
        }

        return;
    }

    data = orderbydata(data, index - stc, asc);

    for(let r = str; r <= edr; r++){
        for(let c = stc; c <= edc; c++){
            d[r][c] = data[r - str][c - stc];
        }
    }

    if(Store.config["rowlen"] != null){
        let cfg = $.extend(true, {}, Store.config);
        cfg = rowlenByRange(d, str, edr, cfg);

        jfrefreshgrid(d, [{ "row": [str, edr], "column": [stc, edc] }], cfg, null, true);
    }
    else{
        jfrefreshgrid(d, [{ "row": [str, edr], "column": [stc, edc] }]);
    }
}

//创建筛选按钮
function createFilter() {
    if(Store.luckysheet_select_save.length > 1){
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(isEditMode()){
            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
        }
        else{
            tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
        }

        return;
    }

    if(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].isPivotTable){
        return;
    }

    $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).remove();

    let last = Store.luckysheet_select_save[0];
    if (last["row"][0] == last["row"][1] && last["column"][0] == last["column"][1]) {
        let st_c, ed_c, curR = last["row"][1];

        for (let c = 0; c < Store.flowdata[curR].length; c++) {
            let cell = Store.flowdata[curR][c];

            if (cell != null && !isRealNull(cell.v)) {
                if (st_c == null) {
                    st_c = c;
                }
            }
            else if (st_c != null) {
                ed_c = c - 1;
                break;
            }
        }

        if (ed_c == null) {
            ed_c = Store.flowdata[curR].length - 1;
        }

        Store.luckysheet_select_save = [{ "row": [curR, curR], "column": [st_c, ed_c] }];
        selectHightlightShow();

        Store.luckysheet_shiftpositon = $.extend(true, {}, last);
        luckysheetMoveEndCell("down", "range");
    }
    else if (last["row"][1] - last["row"][0] < 2) {
        Store.luckysheet_shiftpositon = $.extend(true, {}, last);
        luckysheetMoveEndCell("down", "range");
    }

    Store.luckysheet_filter_save = $.extend(true, {}, Store.luckysheet_select_save[0]);

    createFilterOptions(Store.luckysheet_filter_save);

    server.saveParam("all", Store.currentSheetIndex, Store.luckysheet_filter_save, { "k": "filter_select" });

    if (Store.filterchage) {
        Store.jfredo.push({ 
            "type": "filtershow", 
            "data": [], 
            "curdata": [], 
            "sheetIndex": Store.currentSheetIndex, 
            "filter_save": Store.luckysheet_filter_save 
        });
    }
}

//创建筛选配置
function createFilterOptions(luckysheet_filter_save, filterObj) {
    $("#luckysheet-filter-selected-sheet" + Store.currentSheetIndex).remove();
    $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex).remove();
    
    if(Store.luckysheet_filter_save == null || JSON.stringify(Store.luckysheet_filter_save) == "{}"){
        return;
    }

    let r1 = Store.luckysheet_filter_save.row[0], 
        r2 = Store.luckysheet_filter_save.row[1];
    let c1 = Store.luckysheet_filter_save.column[0], 
        c2 = Store.luckysheet_filter_save.column[1];

    let row = Store.visibledatarow[r2], 
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
    let col = Store.visibledatacolumn[c2], 
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];
    
    let newSelectedHTML = '<div id="luckysheet-filter-selected-sheet'+ Store.currentSheetIndex +'" class="luckysheet-cell-selected luckysheet-filter-selected"  style="left:'+ col_pre +'px;width:'+ (col - col_pre - 1) +'px;top:'+ row_pre +'px;height:'+ (row - row_pre - 1) +'px;display:block;border-color:#897BFF;z-index:20;background:none;"></div>';
    $("#luckysheet-cell-main").append(newSelectedHTML);
    
    let optionHTML = "";

    for (let c = c1; c <= c2; c++) {
        if(filterObj == null || filterObj[c - c1] == null){
            optionHTML += '<div data-rowhidden="" data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options" style="left:'+ (Store.visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:block;"><i class="fa fa-caret-down" aria-hidden="true"></i></div>';
        }
        else{
            let caljs_data;

            if(filterObj[c - c1].caljs != null){
                let caljs_value1_data;
                if (filterObj[c - c1].caljs["value1"] != null) {
                    caljs_value1_data = 'data-byconditionvalue1="'+ filterObj[c - c1].caljs["value1"] +'" ';
                }
                else{
                    caljs_value1_data = '';
                }

                let caljs_value2_data;
                if (filterObj[c - c1].caljs["value2"] != null) {
                    caljs_value2_data = 'data-byconditionvalue2="'+ filterObj[c - c1].caljs["value2"] +'" ';
                }
                else{
                    caljs_value2_data = '';
                }

                caljs_data = 'data-caljs="'+ JSON.stringify(filterObj[c - c1].caljs) +'" ' +
                                 'data-byconditionvalue="'+ filterObj[c - c1].caljs["value"] +'" ' + 
                                 'data-byconditiontype="'+ filterObj[c - c1].caljs["type"] +'" ' +
                                 'data-byconditiontext="'+ filterObj[c - c1].caljs["text"] +'" ' +
                                 caljs_value1_data + caljs_value2_data;
            }
            else{
                caljs_data = '';
            }

            optionHTML += '<div data-rowhidden="'+ JSON.stringify(filterObj[c - c1].rowhidden).replace(/\"/g, "'") +'" '+ caljs_data +' data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options luckysheet-filter-options-active" style="left:'+ (Store.visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:block;"><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i></div>';
        }
    }

    $("#luckysheet-cell-main").append('<div id="luckysheet-filter-options-sheet'+ Store.currentSheetIndex +'" class="luckysheet-filter-options-c">' + optionHTML + '</div>');
    $("#luckysheet-rightclick-menu").hide();
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

    if ($("#luckysheet-cell-main").scrollTop() > Store.luckysheet_filter_save["top_move"]) {
        $("#luckysheet-scrollbar-y").scrollTop(Store.luckysheet_filter_save["top_move"]);
    }

    let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

    file.filter_select = Store.luckysheet_filter_save;
}

export {
    labelFilterOptionState,
    orderbydatafiler,
    createFilter,
    createFilterOptions
}