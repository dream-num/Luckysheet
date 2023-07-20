
import sheetmanage from './sheetmanage';
import server from './server';
import { sheetselectlistitemHTML, sheetselectlistHTML, keycode } from './constant';
import {
    replaceHtml,
    mouseclickposition,
} from '../utils/util';
import { getSheetIndex } from '../methods/get';
import { isEditMode } from '../global/validate';
import formula from '../global/formula';
import cleargridelement from '../global/cleargridelement';
import tooltip from '../global/tooltip';
    selectTextDom
import {selectTextDom} from '../global/cursorPos';
import locale from '../locale/locale';
import Store from '../store';
import luckysheetConfigsetting from './luckysheetConfigsetting';
import {pagerInit} from '../global/api'
import method from '../global/method';
import luckysheetsizeauto from './resize';
import {openProtectionModal} from "./protection";

//表格底部名称栏区域 相关事件（增、删、改、隐藏显示、颜色等等）
let isInitialSheetConfig = false, luckysheetcurrentSheetitem = null, jfdbclicklagTimeout = null,oldSheetFileName = "";
function showsheetconfigmenu() {
    if (!isInitialSheetConfig) {
        isInitialSheetConfig = true;
        const _locale = locale();
        let locale_toolbar = _locale.toolbar;
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
            cancelText: _locale.sheetconfig.cancelText,
            chooseText: _locale.sheetconfig.chooseText,
            togglePaletteMoreText: locale_toolbar.toolMore,
            togglePaletteLessText: locale_toolbar.toolLess,
            clearText: locale_toolbar.clearText,
            noColorSelectedText: locale_toolbar.noColorSelectedText,
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

                    Store.jfundo.length = 0;
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

                Store.jfundo.length = 0;
                Store.jfredo.push(redo);
            }
        });
    }

    let index = getSheetIndex(Store.currentSheetIndex);
    if (Store.luckysheetfile[index].color != null && Store.luckysheetfile[index].color.length > 0) {
        $("#luckysheetsheetconfigcolorur").spectrum("set", Store.luckysheetfile[index].color);

    }

    $("#luckysheetsheetconfigcolorur").parent().find("span, div, button, input, a").addClass("luckysheet-mousedown-cancel");

    // 如果全部按钮设置了隐藏，则不显示
    const config = luckysheetConfigsetting.sheetRightClickConfig;
    // if(!config.delete && !config.copy && !config.rename && !config.color && !config.hide && !config.move){
    if(Object.values(config).every(ele=> !ele)){
        return;
    }

    setTimeout(function(){
        mouseclickposition($("#luckysheet-rightclick-sheet-menu"), luckysheetcurrentSheetitem.offset().left + luckysheetcurrentSheetitem.width(), luckysheetcurrentSheetitem.offset().top - 18, "leftbottom");
    },1);
}

let luckysheetsheetrightclick = function ($t, $cur, e) {
        //引用单元格范围时，禁止切换sheer
    if ($("#luckysheet-dataVerificationRange-dialog").is(":visible"))//是否可见
    {
        //禁止切换sheer
        window.alert("选择单元格范围窗口打开时，不能切换sheet!");
        return;
    }
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
        //保存正在编辑的单元格内容
        if (parseInt($("#luckysheet-input-box").css("top")) > 0) {
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        }

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
        //切换完成后，如果工作表内容保护页面打开，则刷新页面，否则等用户打开时会刷新
    if ($("#luckysheet-modal-dialog-slider-protection").is(":visible"))//是否可见
    {
        //刷新页面
        refreshProtectionContent();

    }
    luckysheetsizeauto();
}

export function refreshProtectionContent() {
    //刷新页面
    let sheetFile = sheetmanage.getSheetByIndex();//获取到的数据是正确的
    openProtectionModal(sheetFile);
    // 如果打开了数据透视表 会住工作表保护。隐藏数据透视表
    if (!!sheetFile.isPivotTable) {//如果是数据透视表,把数据透视关了
        Store.luckysheetcurrentisPivotTable = false;//关闭数据透视表
        $("#luckysheet-modal-dialog-slider-pivot").hide();
    }

}

export function initialSheetBar(){
    const _locale = locale();
    const locale_sheetconfig = _locale.sheetconfig;
    isInitialSheetConfig = false

    $("#luckysheet-sheet-area").on("mousedown", "div.luckysheet-sheets-item", function (e) {
        if(isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        let $t = $(this), $cur = $(e.target), $item = $cur.closest(".luckysheet-sheets-item");

        if (e.which == "3") {
            setTimeout(() => {
                luckysheetsheetrightclick($t, $cur, e);
                luckysheetcurrentSheetitem = $item;
                showsheetconfigmenu();
                return;
            }, 0);
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
        server.keepHighLightBox()
    });

    let luckysheetsheetnameeditor = function ($t) {
        if(Store.allowEdit===false || !luckysheetConfigsetting.sheetRightClickConfig.rename){
            return;
        }
        $t.attr("contenteditable", "true").addClass("luckysheet-mousedown-cancel").data("oldtxt", $t.text());

        setTimeout(function () {
            selectTextDom($t.get(0));
        }, 1);
    }

    $("#luckysheet-sheet-area").on("dblclick", "span.luckysheet-sheets-item-name", function (e) {
        luckysheetsheetnameeditor($(this));
    });

    let compositionFlag = true;
    $("#luckysheet-sheet-area").on("compositionstart", "span.luckysheet-sheets-item-name",  ()=> compositionFlag = false);
    $("#luckysheet-sheet-area").on("compositionend", "span.luckysheet-sheets-item-name", ()=> compositionFlag = true);
    $("#luckysheet-sheet-area").on("input", "span.luckysheet-sheets-item-name", function () {
        if(Store.allowEdit===false){
            return;
        }

        if(Store.limitSheetNameLength === false){
            return
        }

        let maxLength = Store.defaultSheetNameMaxLength;
        if(maxLength  === 0){
            return
        }

        setTimeout( ()=> {
            if (compositionFlag) {

                if ($(this).text().length >= maxLength) {  /* 检查：值是否越界 */
                    setTimeout(() => {
                        $(this).text($(this).text().substring(0, maxLength));

                        let range = window.getSelection();
                        range.selectAllChildren(this);
                        range.collapseToEnd();
                    }, 0);
                 }
            }
        }, 0);
    });

    $("#luckysheet-sheet-area").on("blur", "span.luckysheet-sheets-item-name", function (e) {
        if(Store.allowEdit===false){
            return;
        }

        let $t = $(this);
        let txt = $t.text(), oldtxt = $t.data("oldtxt");

        if(0 === $(this).text().length){
            tooltip.info("", locale_sheetconfig.sheetNamecannotIsEmptyError);
            $t.text(oldtxt).attr("contenteditable", "false");
            return;
        }

        if(txt.length>31 || txt.charAt(0)=="'" || txt.charAt(txt.length-1)=="'" || /[：\:\\\/？\?\*\[\]]+/.test(txt)){
            tooltip.info("", locale_sheetconfig.sheetNameSpecCharError);
            $t.text(oldtxt).attr("contenteditable", "false");
            return;
        }

        let index = getSheetIndex(Store.currentSheetIndex);
        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (index != i && Store.luckysheetfile[i].name == txt) {
                if(isEditMode()){
                    alert(locale_sheetconfig.tipNameRepeat);
                }
                else{
                    tooltip.info("", locale_sheetconfig.tipNameRepeat);
                }
                $t.text(oldtxt).attr("contenteditable", "false");
                return;
            }
        }

        sheetmanage.sheetArrowShowAndHide();

        Store.luckysheetfile[index].name = txt;
        server.saveParam("all", Store.currentSheetIndex, txt, { "k": "name" });

        $t.attr("contenteditable", "false").removeClass("luckysheet-mousedown-cancel");

        if (Store.clearjfundo) {
            let redo = {};
            redo["type"] = "sheetName";
            redo["sheetIndex"] = Store.currentSheetIndex;

            redo["oldtxt"] = oldtxt;
            redo["txt"] = txt;

            Store.jfundo.length = 0;
            Store.jfredo.push(redo);
        }
        // 钩子： sheetEditNameAfter
        method.createHookFunction('sheetEditNameAfter', {
            i: Store.luckysheetfile[index].index,
            oldName: oldtxt, newName: txt 
        });
    });

    $("#luckysheet-sheet-area").on("keydown", "span.luckysheet-sheets-item-name", function (e) {
        if(Store.allowEdit===false){
            return;
        }
        let kcode = e.keyCode;
        let $t = $(this);
        if (kcode == keycode.ENTER) {
            let index = getSheetIndex(Store.currentSheetIndex);
            oldSheetFileName = Store.luckysheetfile[index].name || oldSheetFileName;
            Store.luckysheetfile[index].name = $t.text();
            $t.attr("contenteditable", "false");
        }
    });

    $("#luckysheetsheetconfigrename").click(function () {
        var $name = luckysheetcurrentSheetitem.find("span.luckysheet-sheets-item-name")
        // 钩子 sheetEditNameBefore
        if (!method.createHookFunction('sheetEditNameBefore', { i: luckysheetcurrentSheetitem.data('index') , name: $name.text() })){
            return;
        }
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
                alert(locale_sheetconfig.noMoreSheet);
            }
            else{
                tooltip.info(locale_sheetconfig.noMoreSheet, "");
            }

            return;
        }

        let index = getSheetIndex(Store.currentSheetIndex);

        tooltip.confirm(locale_sheetconfig.confirmDelete+"【" + Store.luckysheetfile[index].name + "】？", "<span style='color:#9e9e9e;font-size:12px;'>"+locale_sheetconfig.redoDelete+"</span>", function () {
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
                alert(locale_sheetconfig.noHide);
            }
            else{
                tooltip.info("", locale_sheetconfig.noHide);
            }
            return;
        }
        sheetmanage.setSheetHide(luckysheetcurrentSheetitem.data("index"));
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();
    });

    $("#luckysheet-sheets-add").click(function (e) {
        //保存正在编辑的单元格内容
        if (parseInt($("#luckysheet-input-box").css("top")) > 0) {
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        }

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
        //保存正在编辑的单元格内容
        if (parseInt($("#luckysheet-input-box").css("top")) > 0) {
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        }

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
                    alert(locale_sheetconfig.chartEditNoOpt);
                    return;
                }

                let $item = $(this), index = $item.data("index");

                if ($item.data("index") != Store.currentSheetIndex) {
                    sheetmanage.setSheetShow(index);
                    sheetmanage.locationSheet();
                }
                server.keepHighLightBox()
            });

            initialOpenSheet = false;
        }
        else {
            $("#luckysheet-sheet-list").html(item);
        }

        let $t = $("#luckysheet-sheet-list");

        let left = $(this).offset().left - $('#' + Store.container).offset().left;
        let bottom = $(this).height() + $('#luckysheet-sta-content').height() + 12;
        $t.css({left: left + 'px', bottom: bottom + 'px'}).show();
        $("#luckysheet-input-box").removeAttr("style");
    });

    // 初始化分页器
    if (luckysheetConfigsetting.pager) {
        pagerInit(luckysheetConfigsetting.pager)
    }

}
