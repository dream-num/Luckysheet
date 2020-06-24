import Store from '../store';
import menuButton from './menuButton';
import formula from '../global/formula';
import sheetmanage from './sheetmanage';

let luckysheetfile = Store.luckysheetfile;
let currentSheetIndex = Store.currentSheetIndex;
let luckysheet_select_save = Store.luckysheet_select_save;

//公式函数 选区实体框
luckysheet.seletedHighlistByindex = function (id, r1, r2, c1, c2) {
    var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
    var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

    $('#' + id).css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1 });
}

//选区
function selectHightlightShow() {
    $("#luckysheet-cell-selected-boxs").show();
    $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").siblings(".luckysheet-cell-selected").remove();

    if(luckysheet_select_save.length > 0){
        for(var i = 0; i < luckysheet_select_save.length; i++){
            var r1 = luckysheet_select_save[i].row[0], r2 = luckysheet_select_save[i].row[1]; 
            var c1 = luckysheet_select_save[i].column[0], c2 = luckysheet_select_save[i].column[1];

            if(luckysheet_select_save[i].row_focus == null){
                var rf = r1;
            }
            else{
                var rf = luckysheet_select_save[i].row_focus;    
            }

            if(luckysheet_select_save[i].column_focus == null){
                var cf = c1;
            }
            else{
                var cf = luckysheet_select_save[i].column_focus;
            }

            var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
            var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

            var row_f = visibledatarow[rf], row_pre_f = rf - 1 == -1 ? 0 : visibledatarow[rf - 1];
            var col_f = visibledatacolumn[cf], col_pre_f = cf - 1 == -1 ? 0 : visibledatacolumn[cf - 1];

            var margeset = menuButton.mergeborer(luckysheet.flowdata, rf, cf);
            if(!!margeset){
                row_f = margeset.row[1];
                row_pre_f = margeset.row[0];
                
                col_f = margeset.column[1];
                col_pre_f = margeset.column[0];
            }

            luckysheet_select_save[i]["row"] = [r1, r2];
            luckysheet_select_save[i]["column"] = [c1, c2];

            luckysheet_select_save[i]["row_focus"] = rf;
            luckysheet_select_save[i]["column_focus"] = cf;

            luckysheet_select_save[i]["left"] = col_pre_f;
            luckysheet_select_save[i]["width"] = col_f - col_pre_f - 1;
            luckysheet_select_save[i]["top"] = row_pre_f;
            luckysheet_select_save[i]["height"] = row_f - row_pre_f - 1;

            luckysheet_select_save[i]["left_move"] = col_pre;
            luckysheet_select_save[i]["width_move"] = col - col_pre - 1;
            luckysheet_select_save[i]["top_move"] = row_pre;
            luckysheet_select_save[i]["height_move"] = row - row_pre - 1;

            if(i == 0){
                if(luckysheet_select_save.length == 1){
                    if(mobilecheck){//移动端
                        $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({ 
                            "left": luckysheet_select_save[i]["left_move"], 
                            "width": luckysheet_select_save[i]["width_move"], 
                            "top": luckysheet_select_save[i]["top_move"], 
                            "height": luckysheet_select_save[i]["height_move"], 
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
                            "left": luckysheet_select_save[i]["left_move"], 
                            "width": luckysheet_select_save[i]["width_move"], 
                            "top": luckysheet_select_save[i]["top_move"], 
                            "height": luckysheet_select_save[i]["height_move"], 
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
                        "left": luckysheet_select_save[i]["left_move"], 
                        "width": luckysheet_select_save[i]["width_move"], 
                        "top": luckysheet_select_save[i]["top_move"], 
                        "height": luckysheet_select_save[i]["height_move"], 
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
                $("#luckysheet-cell-selected-boxs").append('<div class="luckysheet-cell-selected" style="left: '+ luckysheet_select_save[i]["left_move"] +'px; width: '+ luckysheet_select_save[i]["width_move"] +'px; top: '+ luckysheet_select_save[i]["top_move"] +'px; height: '+ luckysheet_select_save[i]["height_move"] +'px; border: 1px solid rgba(1, 136, 251, 0.15); display: block;"></div>');
            }

            if(i == luckysheet_select_save.length - 1){
                //focus 取选区数组最后一个
                $("#luckysheet-cell-selected-focus").css({ 
                    "left": luckysheet_select_save[i]["left"], 
                    "width": luckysheet_select_save[i]["width"], 
                    "top": luckysheet_select_save[i]["top"], 
                    "height": luckysheet_select_save[i]["height"], 
                    "display": "block" 
                });
                //行列数
                luckysheet_count_show(
                    luckysheet_select_save[i]["left_move"], 
                    luckysheet_select_save[i]["top_move"], 
                    luckysheet_select_save[i]["width_move"], 
                    luckysheet_select_save[i]["height_move"], 
                    [r1, r2], 
                    [c1, c2]
                );
                //左上角选择区域框
                formula.fucntionboxshow(rf, cf);
            }
        }

        //行列标题栏
        selectTitlesShow(luckysheet_select_save);

        //左上角范围显示
        $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));
        
        //动态数组显示
        if(luckysheet_select_save.length == 1 && luckysheet_select_save[0].row[0] == luckysheet_select_save[0].row[1] && luckysheet_select_save[0].column[0] == luckysheet_select_save[0].column[1]){
            luckysheet.dynamicArray_hightShow(luckysheet_select_save[0].row[0], luckysheet_select_save[0].column[0]);
        }
    }

    luckysheetfile[sheetmanage.getSheetIndex(currentSheetIndex)].luckysheet_select_save = luckysheet_select_save;
}

//选区标题栏
function selectTitlesShow = function(rangeArr){
    var s = $.extend(true, [], rangeArr);

    var rowTitleMap = {}, columnTitleMap = {};
    for(var i = 0; i < s.length; i++){
        var r1 = s[i]["row"][0], r2 = s[i]["row"][1], c1 = s[i]["column"][0], c2 = s[i]["column"][1];
        //行、列标题栏
        rowTitleMap = luckysheet.selectTitlesMap(rowTitleMap, r1, r2);
        columnTitleMap = luckysheet.selectTitlesMap(columnTitleMap, c1, c2);
    }

    //行标题
    $("#luckysheet-rows-h-selected").empty();

    var rowTitleRange = luckysheet.selectTitlesRange(rowTitleMap);
    for(var i = 0; i < rowTitleRange.length; i++){
        var r1 = rowTitleRange[i][0], r2 = rowTitleRange[i][rowTitleRange[i].length - 1];
        var row = luckysheet.rowLocationByIndex(r2)[1], row_pre = luckysheet.rowLocationByIndex(r1)[0];
        
        $("#luckysheet-rows-h-selected").append('<div class="luckysheet-rows-h-selected" style="top: '+ row_pre +'px; height: '+ (row - row_pre - 1) +'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>');
    }

    //列标题
    $("#luckysheet-cols-h-selected").empty();

    var columnTitleRange = luckysheet.selectTitlesRange(columnTitleMap);
    for(var j = 0; j < columnTitleRange.length; j++){
        var c1 = columnTitleRange[j][0], c2 = columnTitleRange[j][columnTitleRange[j].length - 1];
        var col = luckysheet.colLocationByIndex(c2)[1], col_pre = luckysheet.colLocationByIndex(c1)[0];
        
        $("#luckysheet-cols-h-selected").append('<div class="luckysheet-cols-h-selected" style="left: '+ col_pre +'px; width: '+ (col - col_pre - 1) +'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>');
    }
}
function selectTitlesMap = function(rangeMap, range1, range2){
    var map = $.extend(true, {}, rangeMap);
    for(var i = range1; i <= range2; i++){
        if(i in map){
            continue;
        }
        map[i] = 0;
    }
    return map;
}
function selectTitlesRange = function(map){
    var mapArr = [];
    for(var i in map){
        mapArr.push(i);
    }
    mapArr.sort(function(a, b){ return a - b; });

    var rangeArr = [];
    var item = [];
    if(mapArr.length > 1){
        for(var j = 1; j < mapArr.length; j++){
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
function selectIsOverlap = function(){
    var overlap = false;
    var map = {};

    for(var s = 0; s < luckysheet_select_save.length; s++){
        var str_r = luckysheet_select_save[s].row[0], end_r = luckysheet_select_save[s].row[1];
        var str_c = luckysheet_select_save[s].column[0], end_c = luckysheet_select_save[s].column[1];

        for(var r = str_r; r <= end_r; r++){
            for(var c = str_c; c <= end_c; c++){
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
function selectionCopyShow = function(range){
    $("#luckysheet-selection-copy").empty();

    if(range == null){
        range = luckysheet_selection_range;
    }

    if(range.length > 0){
        for(var s = 0; s < range.length; s++){
            var r1 = range[s].row[0], r2 = range[s].row[1];
            var c1 = range[s].column[0], c2 = range[s].column[1];

            var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
            var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

            var copyDomHtml = '<div class="luckysheet-selection-copy" style="display: block; left: '+ col_pre +'px; width: '+ (col - col_pre - 1) +'px; top: '+ row_pre +'px; height: '+ (row - row_pre - 1) +'px;">'+
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

function luckysheet_count_show(left, top, width, height, rowseleted, columnseleted) {
    var rowl = rowseleted[1] - rowseleted[0] + 1, coll = columnseleted[1] - columnseleted[0] + 1;
    var drawWidth = luckysheetTableContentHW[0], drawHeight = luckysheetTableContentHW[1];
    var scrollWidth = $("#luckysheet-cell-main").scrollLeft(), scrollHeight = $("#luckysheet-cell-main").scrollTop();

    if (rowl >= 4) {
        var leftv = left - 25;
        if (leftv < 0) {
            leftv = left + 5;
        }

        if (leftv < scrollWidth) {
            leftv = scrollWidth + 10;
        }

        var topv = top + height / 2;
        if (height > drawHeight) {
            topv = scrollHeight + drawHeight / 2;
        }

        $("#luckysheet-row-count-show").css({ "left": leftv, "top": topv, "display": "block" }).html("<div>" + rowl.toString().split("").join("</div><div>") + "</div><div>行</div>");
    }
    else {
        $("#luckysheet-row-count-show").hide();
    }

    if (coll >= 4) {
        var topv = top - 25;
        if (topv < 0) {
            topv = top + 5;
        }

        if (topv < scrollHeight) {
            topv = scrollHeight + 10;
        }

        var leftv = left + width / 2;
        if (width > drawWidth) {
            leftv = scrollWidth + drawWidth / 2;
        }

        $("#luckysheet-column-count-show").css({ "left": leftv, "top": topv, "display": "block" }).text(coll + "列");
    }
    else {
        $("#luckysheet-column-count-show").hide();
    }
}

export {
    selectHightlightShow,
}