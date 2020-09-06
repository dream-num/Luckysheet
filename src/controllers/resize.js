import luckysheetConfigsetting from './luckysheetConfigsetting';
import luckysheetFreezen from './freezen';
import { luckysheetrefreshgrid } from '../global/refresh';
import Store from '../store';
import locale from '../locale/locale';
import sheetmanage from './sheetmanage';

let gridW = 0, 
    gridH = 0;

export default function luckysheetsizeauto(isRefreshCanvas=true) {
    if (!luckysheetConfigsetting.showinfobar) {
        Store.infobarHeight = 0;
        $("#luckysheet_info_detail").hide();
    }
    else {
        Store.infobarHeight = 30;
        $("#luckysheet_info_detail").show();
    }

    if (!luckysheetConfigsetting.showtoolbar) {
        $("#" + Store.container).find(".luckysheet-wa-editor, .luckysheet-share-logo").hide();
        Store.toolbarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-wa-editor, .luckysheet-share-logo").show();
        Store.toolbarHeight = 61;
    }

    if (!luckysheetConfigsetting.showsheetbar) {
        $("#" + Store.container).find("#luckysheet-sheet-area").hide();
        Store.sheetBarHeight = 0;
    }
    else {
        $("#" + Store.container).find("#luckysheet-sheet-area").show();
        Store.sheetBarHeight = 27;
    }

    if (!luckysheetConfigsetting.showstatisticBar) {
        $("#" + Store.container).find(".luckysheet-stat-area").hide();
        Store.statisticBarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-stat-area").show();
        Store.statisticBarHeight = 23;
    }

    $("#" + Store.container).find(".luckysheet-grid-container").css("top", Store.toolbarHeight + Store.infobarHeight + Store.calculatebarHeight);

    gridW = $("#" + Store.container).width(), gridH = $("#" + Store.container).height();

    if(luckysheetConfigsetting.showConfigWindowResize){//数据透视表  图表  交替颜色
        if($("#luckysheet-modal-dialog-slider-pivot").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-pivot").outerWidth();
        } 
        else if($(".chartSetting").is(":visible")){
            gridW -= $(".chartSetting").outerWidth();
        }
        else if($("#luckysheet-modal-dialog-slider-alternateformat").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-alternateformat").outerWidth();
        }
    }

    $("#" + Store.container).find(".luckysheet").height(gridH - 2).width(gridW - 2);

    changeSheetContainerSize(gridW, gridH)
    
    if(isRefreshCanvas){
        luckysheetrefreshgrid($("#luckysheet-cell-main").scrollLeft(), $("#luckysheet-cell-main").scrollTop());
    }
    const _locale = locale();
    const locale_toolbar = _locale.toolbar;
    let ismore = false, 
        toolbarW = 0, 
        morebtn = '<div class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"> </div><div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="'+ locale_toolbar.toolMoreTip +'" id="luckysheet-icon-morebtn" role="button" style="user-select: none;"> <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;color:#0188fb;"><i class="fa fa-list-ul"></i> '+ locale_toolbar.toolMore +'... </div> </div> </div> </div>',
        morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:'+ (Store.infobarHeight + Store.toolbarHeight + 2 + $("#" + Store.container).offset().top + $("body").scrollTop() ) +'px; right:0px;z-index:1003;padding-left:0px;display:none;height:auto;white-space:initial;"></div>';
    
    if($("#luckysheet-icon-morebtn-div").length == 0){
        $("body").append(morediv);
    }

    $("#luckysheet-icon-morebtn-div").hide();
    $("#luckysheet-icon-morebtn-div > div").appendTo($("#luckysheet-wa-editor"));
    // $("#luckysheet-wa-editor > div").trigger("create");
    // $("#luckysheet-icon-morebtn-div > div").trigger("create");
    $("#luckysheet-icon-morebtn").prev().remove().end().remove();

    $("#luckysheet-wa-editor > div").each(function(){
        let $t = $(this);
        toolbarW += $t.outerWidth();

        if(!ismore && toolbarW > gridW - 140){
            ismore = true;
        }

        if(ismore){
            $("#luckysheet-icon-morebtn-div").append($(this));
        }
    });

    if(ismore){
        
        $("#luckysheet-wa-editor").append(morebtn);
        $("#luckysheet-icon-morebtn").click(function(){
            let right = $(window).width() - $("#luckysheet-icon-morebtn").offset().left - $("#luckysheet-icon-morebtn").width()+ $("body").scrollLeft();
            $("#luckysheet-icon-morebtn-div").toggle().css("right", right < 0 ? 0 : right);

            let $txt = $(this).find(".luckysheet-toolbar-menu-button-caption");
            if($txt.text().indexOf(locale_toolbar.toolMore) > -1){
                $(this).find(".luckysheet-toolbar-menu-button-caption").html('<i class="fa fa-list-ul"></i> '+ locale_toolbar.toolClose +'... ');
            }
            else{
                $(this).find(".luckysheet-toolbar-menu-button-caption").html('<i class="fa fa-list-ul"></i> '+ locale_toolbar.toolMore +'... ');
            }
            
        });
        //$("#luckysheet-wa-editor div").trigger("create");
        
        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-menu-button").css("margin-right", -1);
        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-left").css("margin-right", -3);
    }

    $("#"+ Store.container + " .luckysheet-wa-editor .luckysheet-toolbar-button-split-left").off("hover").hover(function(){
        $(this).next(".luckysheet-toolbar-button-split-right").addClass("luckysheet-toolbar-button-split-right-hover");
    }, function(){
        $(this).next(".luckysheet-toolbar-button-split-right").removeClass("luckysheet-toolbar-button-split-right-hover");
    });

    $("#"+ Store.container + " .luckysheet-wa-editor .luckysheet-toolbar-button-split-right").off("hover").hover(function(){
        $(this).prev(".luckysheet-toolbar-button-split-left").addClass("luckysheet-toolbar-button-hover");
    }, function(){
        $(this).prev(".luckysheet-toolbar-button-split-left").removeClass("luckysheet-toolbar-button-hover");
    });

    sheetmanage.sheetArrowShowAndHide();
    sheetmanage.sheetBarShowAndHide();
}


export function changeSheetContainerSize(gridW, gridH){
    if(gridW==null){
        gridW = $("#" + Store.container).width();
    }

    if(gridH==null){
        gridH = $("#" + Store.container).height();
    }
    Store.cellmainHeight = gridH - (Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columeHeaderHeight + Store.sheetBarHeight + Store.statisticBarHeight);
    Store.cellmainWidth = gridW - Store.rowHeaderWidth;
    
    $("#luckysheet-cols-h-c, #luckysheet-cell-main").width(Store.cellmainWidth);
    $("#luckysheet-cell-main").height(Store.cellmainHeight);
    $("#luckysheet-rows-h").height(Store.cellmainHeight - Store.cellMainSrollBarSize);

    $("#luckysheet-scrollbar-y").height(Store.cellmainHeight + Store.columeHeaderHeight - Store.cellMainSrollBarSize - 3);
    $("#luckysheet-scrollbar-x").height(Store.cellMainSrollBarSize);
    $("#luckysheet-scrollbar-y").width(Store.cellMainSrollBarSize);

    $("#luckysheet-scrollbar-x").width(Store.cellmainWidth).css("left", Store.rowHeaderWidth - 1);

    Store.luckysheetTableContentHW = [
        Store.cellmainWidth + Store.rowHeaderWidth - Store.cellMainSrollBarSize, 
        Store.cellmainHeight + Store.columeHeaderHeight - Store.cellMainSrollBarSize
    ];

    $("#luckysheetTableContent, #luckysheetTableContentF").attr({ 
        width: Math.ceil(Store.luckysheetTableContentHW[0] * Store.devicePixelRatio), 
        height: Math.ceil(Store.luckysheetTableContentHW[1] * Store.devicePixelRatio) 
    })
    .css({ width: Store.luckysheetTableContentHW[0], height: Store.luckysheetTableContentHW[1] });

    $("#" + Store.container).find("#luckysheet-grid-window-1").css("bottom", Store.sheetBarHeight);
    $("#" + Store.container).find(".luckysheet-grid-window").css("bottom", Store.statisticBarHeight);

    let gridwidth = $("#luckysheet-grid-window-1").width();
    $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle")
    .css({ "width": gridwidth - 10 })
    .end()
    .find(".luckysheet-freezebar-horizontal-drop")
    .css({ "width": gridwidth - 10 });

    let gridheight = $("#luckysheet-grid-window-1").height();
    $("#luckysheet-freezebar-vertical")
    .find(".luckysheet-freezebar-vertical-handle")
    .css({ "height": gridheight - 10 })
    .end()
    .find(".luckysheet-freezebar-vertical-drop")
    .css({ "height": gridheight - 10 });
    
    luckysheetFreezen.createAssistCanvas();
}