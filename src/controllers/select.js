import menuButton from './menuButton';
import formula from '../global/formula';
import { dynamicArrayHightShow } from '../global/dynamicArray';
import { rowLocationByIndex, colLocationByIndex } from '../global/location';
import browser from '../global/browser';
import dataVerificationCtrl from './dataVerificationCtrl';
import { getSheetIndex, getRangetxt } from '../methods/get';
import Store from '../store';
import locale from '../locale/locale';

//公式函数 选区实体框
function seletedHighlistByindex(id, r1, r2, c1, c2) {
    let row = Store.visibledatarow[r2], 
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
    let col = Store.visibledatacolumn[c2], 
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

    $('#' + id).css({ 
        "left": col_pre, 
        "width": col - col_pre - 1, 
        "top": row_pre, 
        "height": row - row_pre - 1 
    });
}

//Set selection highlight
function selectHightlightShow() {
    $("#luckysheet-cell-selected-boxs").show();
    $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").siblings(".luckysheet-cell-selected").remove();

    if(Store.luckysheet_select_save.length > 0){
        for(let i = 0; i < Store.luckysheet_select_save.length; i++){
            let r1 = Store.luckysheet_select_save[i].row[0], 
                r2 = Store.luckysheet_select_save[i].row[1]; 
            let c1 = Store.luckysheet_select_save[i].column[0], 
                c2 = Store.luckysheet_select_save[i].column[1];
            
            let rf, cf;
            if(Store.luckysheet_select_save[i].row_focus == null){
                rf = r1;
            }
            else{
                rf = Store.luckysheet_select_save[i].row_focus;    
            }

            if(Store.luckysheet_select_save[i].column_focus == null){
                cf = c1;
            }
            else{
                cf = Store.luckysheet_select_save[i].column_focus;
            }

            let row = Store.visibledatarow[r2], 
                row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
            let col = Store.visibledatacolumn[c2], 
                col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

            let row_f = Store.visibledatarow[rf], 
                row_pre_f = rf - 1 == -1 ? 0 : Store.visibledatarow[rf - 1];
            let col_f = Store.visibledatacolumn[cf], 
                col_pre_f = cf - 1 == -1 ? 0 : Store.visibledatacolumn[cf - 1];

            let margeset = menuButton.mergeborer(Store.flowdata, rf, cf);
            if(!!margeset){
                row_f = margeset.row[1];
                row_pre_f = margeset.row[0];
                
                col_f = margeset.column[1];
                col_pre_f = margeset.column[0];
            }

            Store.luckysheet_select_save[i]["row"] = [r1, r2];
            Store.luckysheet_select_save[i]["column"] = [c1, c2];

            Store.luckysheet_select_save[i]["row_focus"] = rf;
            Store.luckysheet_select_save[i]["column_focus"] = cf;

            Store.luckysheet_select_save[i]["left"] = col_pre_f;
            Store.luckysheet_select_save[i]["width"] = col_f - col_pre_f - 1;
            Store.luckysheet_select_save[i]["top"] = row_pre_f;
            Store.luckysheet_select_save[i]["height"] = row_f - row_pre_f - 1;

            Store.luckysheet_select_save[i]["left_move"] = col_pre;
            Store.luckysheet_select_save[i]["width_move"] = col - col_pre - 1;
            Store.luckysheet_select_save[i]["top_move"] = row_pre;
            Store.luckysheet_select_save[i]["height_move"] = row - row_pre - 1;

            if(i == 0){
                if(Store.luckysheet_select_save.length == 1){
                    if(browser.mobilecheck()){//移动端
                        $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({ 
                            "left": Store.luckysheet_select_save[i]["left_move"], 
                            "width": Store.luckysheet_select_save[i]["width_move"], 
                            "top": Store.luckysheet_select_save[i]["top_move"], 
                            "height": Store.luckysheet_select_save[i]["height_move"], 
                            "display": "block", 
                            "border": "1px solid #0188fb" 
                        })
                        .find(".luckysheet-cs-draghandle")
                        .css("display", "block")
                        .end()
                        .find(".luckysheet-cs-fillhandle")
                        .css("display", "none")
                        .end()
                        .find(".luckysheet-cs-touchhandle")
                        .css("display", "block");
                    }
                    else{
                        $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({ 
                            "left": Store.luckysheet_select_save[i]["left_move"], 
                            "width": Store.luckysheet_select_save[i]["width_move"], 
                            "top": Store.luckysheet_select_save[i]["top_move"], 
                            "height": Store.luckysheet_select_save[i]["height_move"], 
                            "display": "block", 
                            "border": "1px solid #0188fb" 
                        })
                        .find(".luckysheet-cs-draghandle")
                        .css("display", "block")
                        .end()
                        .find(".luckysheet-cs-fillhandle")
                        .css("display", "block")
                        .end()
                        .find(".luckysheet-cs-touchhandle")
                        .css("display", "none");
                    }
                }
                else{
                    $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({ 
                        "left": Store.luckysheet_select_save[i]["left_move"], 
                        "width": Store.luckysheet_select_save[i]["width_move"], 
                        "top": Store.luckysheet_select_save[i]["top_move"], 
                        "height": Store.luckysheet_select_save[i]["height_move"], 
                        "display": "block", 
                        "border": "1px solid rgba(1, 136, 251, 0.15)" 
                    })
                    .find(".luckysheet-cs-draghandle")
                    .css("display", "none")
                    .end()
                    .find(".luckysheet-cs-fillhandle")
                    .css("display", "none");
                }
            }
            else{
                $("#luckysheet-cell-selected-boxs").append('<div class="luckysheet-cell-selected" style="left: '+ Store.luckysheet_select_save[i]["left_move"] +'px; width: '+ Store.luckysheet_select_save[i]["width_move"] +'px; top: '+ Store.luckysheet_select_save[i]["top_move"] +'px; height: '+ Store.luckysheet_select_save[i]["height_move"] +'px; border: 1px solid rgba(1, 136, 251, 0.15); display: block;"></div>');
            }

            if(i == Store.luckysheet_select_save.length - 1){
                //focus 取选区数组最后一个
                $("#luckysheet-cell-selected-focus").css({ 
                    "left": Store.luckysheet_select_save[i]["left"], 
                    "width": Store.luckysheet_select_save[i]["width"], 
                    "top": Store.luckysheet_select_save[i]["top"], 
                    "height": Store.luckysheet_select_save[i]["height"], 
                    "display": "block" 
                });
                //行列数
                luckysheet_count_show(
                    Store.luckysheet_select_save[i]["left_move"], 
                    Store.luckysheet_select_save[i]["top_move"], 
                    Store.luckysheet_select_save[i]["width_move"], 
                    Store.luckysheet_select_save[i]["height_move"], 
                    [r1, r2], 
                    [c1, c2]
                );
                //左上角选择区域框
                formula.fucntionboxshow(rf, cf);
                //focus单元格数据验证
                dataVerificationCtrl.cellFocus(rf, cf);
            }
        }

        //行列标题栏
        selectTitlesShow(Store.luckysheet_select_save);

        //左上角范围显示
        selectHelpboxFill();
        
        //动态数组显示
        if(Store.luckysheet_select_save.length == 1 && Store.luckysheet_select_save[0].row[0] == Store.luckysheet_select_save[0].row[1] && Store.luckysheet_select_save[0].column[0] == Store.luckysheet_select_save[0].column[1]){
            dynamicArrayHightShow(Store.luckysheet_select_save[0].row[0], Store.luckysheet_select_save[0].column[0]);
        }
    }

    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].luckysheet_select_save = Store.luckysheet_select_save;
}

//选区标题栏
function selectTitlesShow(rangeArr) {
    let s = $.extend(true, [], rangeArr);

    let rowTitleMap = {}, columnTitleMap = {};
    for(let i = 0; i < s.length; i++){
        let r1 = s[i]["row"][0], r2 = s[i]["row"][1], c1 = s[i]["column"][0], c2 = s[i]["column"][1];
        
        //行、列标题栏
        rowTitleMap = selectTitlesMap(rowTitleMap, r1, r2);
        columnTitleMap = selectTitlesMap(columnTitleMap, c1, c2);
    }

    //行标题
    $("#luckysheet-rows-h-selected").empty();

    let rowTitleRange = selectTitlesRange(rowTitleMap);
    for(let i = 0; i < rowTitleRange.length; i++){
        let r1 = rowTitleRange[i][0], r2 = rowTitleRange[i][rowTitleRange[i].length - 1];
        let row = rowLocationByIndex(r2)[1], row_pre = rowLocationByIndex(r1)[0];
        
        $("#luckysheet-rows-h-selected").append('<div class="luckysheet-rows-h-selected" style="top: '+ row_pre +'px; height: '+ (row - row_pre - 1) +'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>');
    }

    //列标题
    $("#luckysheet-cols-h-selected").empty();

    let columnTitleRange = selectTitlesRange(columnTitleMap);
    for(let j = 0; j < columnTitleRange.length; j++){
        let c1 = columnTitleRange[j][0], c2 = columnTitleRange[j][columnTitleRange[j].length - 1];
        let col = colLocationByIndex(c2)[1], col_pre = colLocationByIndex(c1)[0];
        
        $("#luckysheet-cols-h-selected").append('<div class="luckysheet-cols-h-selected" style="left: '+ col_pre +'px; width: '+ (col - col_pre - 1) +'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>');
    }
}
function selectTitlesMap(rangeMap, range1, range2) {
    let map = $.extend(true, {}, rangeMap);
    
    for(let i = range1; i <= range2; i++){
        if(i in map){
            continue;
        }

        map[i] = 0;
    }

    return map;
}
function selectTitlesRange(map) {
    let mapArr = [];
    
    for(let i in map){
        mapArr.push(i);
    }

    mapArr.sort(function(a, b){ return a - b; });

    let rangeArr = [];
    let item = [];

    if(mapArr.length > 1){
        for(let j = 1; j < mapArr.length; j++){
            if(mapArr[j] - mapArr[j - 1] == 1){
                item.push(mapArr[j - 1]);
                
                if(j == mapArr.length - 1){
                    item.push(mapArr[j]);
                    rangeArr.push(item);
                }
            }
            else{
                if(j == 1){
                    if(j == mapArr.length - 1){
                        item.push(mapArr[j - 1]);
                        rangeArr.push(item);
                        rangeArr.push([mapArr[j]]);
                    }
                    else{
                        rangeArr.push(mapArr[0]);    
                    }
                }
                else if(j == mapArr.length - 1){
                    item.push(mapArr[j - 1]);
                    rangeArr.push(item);
                    rangeArr.push([mapArr[j]]);
                }
                else{
                    item.push(mapArr[j - 1]);
                    rangeArr.push(item);
                    item = [];       
                }
            }
        }
    }
    else{
        rangeArr.push([mapArr[0]]);
    }

    return rangeArr;
}

//选区是否重叠
function selectIsOverlap() {
    let overlap = false;
    let map = {};

    for(let s = 0; s < Store.luckysheet_select_save.length; s++){
        let str_r = Store.luckysheet_select_save[s].row[0], 
            end_r = Store.luckysheet_select_save[s].row[1];
        let str_c = Store.luckysheet_select_save[s].column[0], 
            end_c = Store.luckysheet_select_save[s].column[1];

        for(let r = str_r; r <= end_r; r++){
            for(let c = str_c; c <= end_c; c++){
                if((r + "_" + c) in map){
                    overlap = true;
                    break;
                }
                else{
                    map[r + "_" + c] = 0;
                }
            }
        }
    }

    return overlap;
}

//复制选区虚线框
function selectionCopyShow(range) {
    $("#luckysheet-selection-copy").empty();

    if(range == null){
        range = Store.luckysheet_selection_range;
    }

    if(range.length > 0){
        for(let s = 0; s < range.length; s++){
            let r1 = range[s].row[0], r2 = range[s].row[1];
            let c1 = range[s].column[0], c2 = range[s].column[1];

            let row = Store.visibledatarow[r2], 
                row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
            let col = Store.visibledatacolumn[c2], 
                col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

            let copyDomHtml = '<div class="luckysheet-selection-copy" style="display: block; left: '+ col_pre +'px; width: '+ (col - col_pre - 1) +'px; top: '+ row_pre +'px; height: '+ (row - row_pre - 1) +'px;">'+
                                '<div class="luckysheet-selection-copy-top luckysheet-copy"></div>'+
                                '<div class="luckysheet-selection-copy-right luckysheet-copy"></div>'+
                                '<div class="luckysheet-selection-copy-bottom luckysheet-copy"></div>'+
                                '<div class="luckysheet-selection-copy-left luckysheet-copy"></div>'+
                                '<div class="luckysheet-selection-copy-hc"></div>'+
                              '</div>';
            $("#luckysheet-selection-copy").append(copyDomHtml);
        }
    }
}

//选区行列数显示
function luckysheet_count_show(left, top, width, height, rowseleted, columnseleted) {
    let rowl = rowseleted[1] - rowseleted[0] + 1, 
        coll = columnseleted[1] - columnseleted[0] + 1;
    let drawWidth = Store.luckysheetTableContentHW[0], 
        drawHeight = Store.luckysheetTableContentHW[1];
    let scrollWidth = $("#luckysheet-cell-main").scrollLeft(), 
        scrollHeight = $("#luckysheet-cell-main").scrollTop();

    const _locale = locale();
    const locale_info = _locale.info;

    if (rowl >= 4) {
        let leftv = left - 25;
        if (leftv < 0) {
            leftv = left + 5;
        }

        if (leftv < scrollWidth) {
            leftv = scrollWidth + 10;
        }

        let topv = top + height / 2;
        if (height > drawHeight) {
            topv = scrollHeight + drawHeight / 2;
        }

        $("#luckysheet-row-count-show").css({ "left": leftv, "top": topv, "display": "block","width":"11px" }).html("<div>" + rowl.toString().split("").join("</div><div>") + "</div><div>"+locale_info.row+"</div>");
    }
    else {
        $("#luckysheet-row-count-show").hide();
    }

    if (coll >= 4) {
        let topv = top - 25;
        if (topv < 0) {
            topv = top + 5;
        }

        if (topv < scrollHeight) {
            topv = scrollHeight + 10;
        }

        let leftv = left + width / 2;
        if (width > drawWidth) {
            leftv = scrollWidth + drawWidth / 2;
        }

        $("#luckysheet-column-count-show").css({ "left": leftv, "top": topv, "display": "block" }).text(coll + locale_info.column);
    }
    else {
        $("#luckysheet-column-count-show").hide();
    }
}

function selectHelpboxFill(){
    let range = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
    let rf = range["row_focus"], cf = range["column_focus"];
    if(Store.config["merge"] != null && (rf + "_" + cf) in Store.config["merge"]){
        $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, {
            column:[cf, cf],
            row:[rf, rf],
        }));
    }
    else{
        $("#luckysheet-helpbox-cell").text(getRangetxt(Store.currentSheetIndex, range));
    }
    
}

export {
    seletedHighlistByindex,
    selectHightlightShow,
    selectIsOverlap,
    selectionCopyShow,
    luckysheet_count_show,
    selectHelpboxFill
}