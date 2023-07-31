import { getSheetIndex } from '../methods/get';
import editor from '../global/editor';
import { isRealNull, isEditMode } from '../global/validate';
import tooltip from '../global/tooltip';
import { rowlenByRange } from '../global/getRowlen';
import { selectHightlightShow } from './select';
import { luckysheetMoveEndCell } from './sheetMove';
import { luckysheetlodingHTML } from '../controllers/constant';
import server from './server';
import locale from '../locale/locale';
import Store from '../store';
import menuButton from './menuButton';
import conditionformat from './conditionformat';
import alternateformat from './alternateformat';
import {checkProtectionAuthorityNormal} from './protection';
import { 
    rgbTohex, 
    showrightclickmenu, 
} from '../utils/util';
import cleargridelement from '../global/cleargridelement';
import { 
    jfrefreshgrid, 
    jfrefreshgrid_rhcw,
} from '../global/refresh';
import { orderbydata, orderbydata1D } from '../global/sort';
import json from '../global/json';
import { update, genarate } from '../global/format';

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
        const locale_filter = locale().filter;

        if(isEditMode()){
            alert(locale_filter.mergeError);
        }
        else{
            tooltip.info(locale_filter.mergeError, "");
        }

        return;
    }

    data = orderbydata(data, index - stc, asc);

    for(let r = str; r <= edr; r++){
        for(let c = stc; c <= edc; c++){
            d[r][c] = data[r - str][c - stc];
        }
    }

    let allParam = {};
    if(Store.config["rowlen"] != null){
        let cfg = $.extend(true, {}, Store.config);
        cfg = rowlenByRange(d, str, edr, cfg);

        allParam = {
            "cfg": cfg,
            "RowlChange": true
        }
    }

    jfrefreshgrid(d, [{ "row": [str, edr], "column": [stc, edc] }], allParam);
}

//创建筛选按钮
function createFilter() {

    if(!checkProtectionAuthorityNormal(Store.currentSheetIndex, "filter")){
        return;
    }

    if(Store.luckysheet_select_save.length > 1){
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        $("#" + Store.container).attr("tabindex", 0).focus();

        const locale_splitText = locale().splitText;

        if(isEditMode()){
            alert(locale_splitText.tipNoMulti);
        }
        else{
            tooltip.info(locale_splitText.tipNoMulti, "");
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
    
    if(luckysheet_filter_save == null || JSON.stringify(luckysheet_filter_save) == "{}"){
        return;
    }

    let r1 = luckysheet_filter_save.row[0], 
        r2 = luckysheet_filter_save.row[1];
    let c1 = luckysheet_filter_save.column[0], 
        c2 = luckysheet_filter_save.column[1];

    let row = Store.visibledatarow[r2], 
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
    let col = Store.visibledatacolumn[c2], 
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];
    
    let newSelectedHTML = '<div id="luckysheet-filter-selected-sheet'+ Store.currentSheetIndex +'" class="luckysheet-cell-selected luckysheet-filter-selected"  style="left:'+ col_pre +'px;width:'+ (col - col_pre - 1) +'px;top:'+ row_pre +'px;height:'+ (row - row_pre - 1) +'px;display:block;border-color:#897BFF;z-index:20;background:none;"></div>';
    $("#luckysheet-cell-main").append(newSelectedHTML);
    
    let optionHTML = "";

    for (let c = c1; c <= c2; c++) {
        const isHide = Store.config != null && Store.config["colhidden"] != null && c in Store.config["colhidden"]

        if(filterObj == null || filterObj[c - c1] == null){
            optionHTML += '<div data-rowhidden="" data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options" style="left:'+ (Store.visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:'+ (isHide ? 'none' : 'block') +';"><i class="fa fa-caret-down" aria-hidden="true"></i></div>';
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

            optionHTML += '<div data-rowhidden="'+ JSON.stringify(filterObj[c - c1].rowhidden).replace(/\"/g, "'") +'" '+ caljs_data +' data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options luckysheet-filter-options-active" style="left:'+ (Store.visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:'+ (isHide ? 'none' : 'block') +';"><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i></div>';
        }
    }

    $("#luckysheet-cell-main").append('<div id="luckysheet-filter-options-sheet'+ Store.currentSheetIndex +'" class="luckysheet-filter-options-c">' + optionHTML + '</div>');
    $("#luckysheet-rightclick-menu").hide();
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

    if ($("#luckysheet-cell-main").scrollTop() > luckysheet_filter_save["top_move"]) {
        $("#luckysheet-scrollbar-y").scrollTop(luckysheet_filter_save["top_move"]);
    }

    let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

    file.filter_select = luckysheet_filter_save;
}

function initialFilterHandler(){
    //filter event handler
    let hidefilersubmenu = null;
    const _locale = locale();
    const locale_filter = _locale.filter;
    const locale_button= _locale.button;
    $("#luckysheetfilter").click(createFilter);

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
                if ($("#luckysheet-filter-selected span").text() != locale_filter.filiterInputNone) {
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
        if(!checkProtectionAuthorityNormal(Store.currentSheetIndex, "filter")){
            return;
        }
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
        $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text(locale_filter.filiterInputNone);

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

        const loadingObj = luckysheetlodingHTML("#luckysheet-filter-byvalue-select",{text:locale_filter.filiterMoreDataTip});
        $("#luckysheet-filter-byvalue-select").empty().append(loadingObj.el);

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
                    if((cell == null || isRealNull(cell.v)) && cell?.mc){
                        const { r, c } = cell.mc;
                        const mainCell = Store.flowdata[r][c];
                        v = mainCell.v;
                        m = mainCell.m;
                    }
                    else if(cell == null || isRealNull(cell.v)){
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
                                                '<label class="luckysheet-mousedown-cancel">' + m + ''+ locale_filter.filiterMonthText +'</label>' +
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
                                                '<label class="luckysheet-mousedown-cancel">' + m + ''+ locale_filter.filiterMonthText +'</label>' +
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
                                                '<label class="luckysheet-mousedown-cancel">' + y + ''+ locale_filter.filiterYearText +'</label>' +
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
                                                '<label class="luckysheet-mousedown-cancel">' + y + ''+ locale_filter.filiterYearText +'</label>' +
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
                            text = locale_filter.valueBlank;
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

            // 适配小屏设备
            let containerH = winH - toffset.top - 350
            if (containerH < 0) containerH = 100
            //$("#luckysheet-filter-byvalue-select").html("<div class='ListBox luckysheet-mousedown-cancel' style='min-height: 100px; max-height: " + containerH + "px; overflow-y: auto; overflow-x: hidden;'><table cellspacing='0' style='width:100%;' class='luckysheet-mousedown-cancel'>" + item.join("") + "</table></div>");

            $("#luckysheet-filter-byvalue-select").append("<div class='ListBox luckysheet-mousedown-cancel' style='min-height: 100px; max-height: " + containerH + "px; overflow-y: auto; overflow-x: hidden;'><table cellspacing='0' style='width:100%;' class='luckysheet-mousedown-cancel'>" + item.join("") + "</table></div>");
            loadingObj.close();
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

                if(bg == null){
                    bg = "#ffffff";
                }
    
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
                filterBgColorHtml = '<div id="filterBgColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">'+locale_filter.filiterByColorTip+'</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + bgColorItemHtml + '</div></div>';
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
                filterFcColorHtml = '<div id="filterFcColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">'+locale_filter.filiterByTextColorTip+'</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + fcColorItemHtml + '</div></div>';
            }
            //
            let content;
            if(filterBgColorHtml == '' && filterFcColorHtml == ''){
                content = '<div class="luckysheet-mousedown-cancel" style="padding: 10px 30px;text-align: center;">'+locale_filter.filterContainerOneColorTip+'</div>';
            }
            else{
                content = filterBgColorHtml + filterFcColorHtml + '<div class="luckysheet-mousedown-cancel"><button id="luckysheet-filter-orderby-color-confirm" class="btn btn-primary luckysheet-mousedown-cancel" style="margin: 5px 20px;width: 70px;">'+locale_button.confirm+'</button></div>';
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
            
            // bg maybe null
            bg = bg == null ? '#ffffff' : bg;

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
    
            Store.jfundo.length  = 0;
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
        if(!checkProtectionAuthorityNormal(Store.currentSheetIndex, "filter")){
            return;
        }

        $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide().find("input").val();
        $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text(locale_filter.conditionNone);

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

        Store.jfundo.length  = 0;
        Store.jfredo.push(redo);

        $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).remove();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

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

                    let month = $(e).closest(".monthBox").find(".month label").text().replace(locale_filter.filiterMonthText, "");
                    if(Number(month) < 10){
                        month = "0" + Number(month);
                    }

                    let year = $(e).closest(".yearBox").find(".year label").text().replace(locale_filter.filiterYearText, "");

                    let itemV = locale_filter.filterDateFormatTip +"#$$$#" + year + "-" + month + "-" + day;

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
                if((cell == null || isRealNull(cell.v)) && cell?.mc){
                    const { r, c } = cell.mc
                    const mainCell = Store.flowdata[r][c]
                    value = mainCell.v + "#$$$#" + mainCell.m;
                }
                else if(cell == null || isRealNull(cell.v)){
                    value = "null#$$$#null";
                }
                else if(cell.ct != null && cell.ct.t == "d"){
                    let fmt = update("YYYY-MM-DD", cell.v);
                    value = locale_filter.filterDateFormatTip +"#$$$#" + fmt;
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

            Store.jfundo.length  = 0;
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
}

export {
    labelFilterOptionState,
    orderbydatafiler,
    createFilter,
    createFilterOptions,
    initialFilterHandler
}