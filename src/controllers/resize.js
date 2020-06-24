import luckysheetConfigsetting from './luckysheetConfigsetting';
import luckysheetFreezen from './freezen';
import { luckysheetrefreshgrid } from '../global/refresh';
import Store from '../store';

let container = Store.container;
let infobarHeight = Store.infobarHeight;
let toolbarHeight = Store.toolbarHeight;
let sheetBarHeight = Store.sheetBarHeight;
let statisticBarHeight = Store.statisticBarHeight;
let luckysheetTableContentHW = Store.luckysheetTableContentHW;
let devicePixelRatio = Store.devicePixelRatio;

let gridW = 0, 
    gridH = 0, 
    cellmainHeight = 0, 
    cellmainWidth = 0;

export default function luckysheetsizeauto() {
    if (!luckysheetConfigsetting.showinfobar) {
        infobarHeight = 0;
        $("#luckysheet_info_detail").hide();
    }
    else {
        infobarHeight = 30;
        $("#luckysheet_info_detail").show();
    }

    if (!luckysheetConfigsetting.showtoolbar) {
        $("#" + container).find(".luckysheet-wa-editor, .luckysheet-share-logo").hide();
        toolbarHeight = 0;
    }
    else {
        $("#" + container).find(".luckysheet-wa-editor, .luckysheet-share-logo").show();
        toolbarHeight = 35;
    }

    if (!luckysheetConfigsetting.showsheetbar) {
        $("#" + container).find("#luckysheet-sheet-area").hide();
        sheetBarHeight = 0;
    }
    else {
        $("#" + container).find("#luckysheet-sheet-area").show();
        sheetBarHeight = 27;
    }

    if (!luckysheetConfigsetting.showstatisticBar) {
        $("#" + container).find(".luckysheet-stat-area").hide();
        statisticBarHeight = 0;
    }
    else {
        $("#" + container).find(".luckysheet-stat-area").show();
        statisticBarHeight = 23;
    }

    $("#" + container).find(".luckysheet-grid-container").css("top", toolbarHeight + infobarHeight + calculatebarHeight);

    gridW = $("#" + container).width(), gridH = $("#" + container).height();

    if(luckysheetConfigsetting.showConfigWindowResize){//数据透视表  图表  交替颜色
        if($("#luckysheet-modal-dialog-slider-pivot").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-pivot").outerWidth();
        } 
        else if($("#luckysheet-data-visualization").is(":visible")){
            gridW -= $("#luckysheet-data-visualization").outerWidth();
        }
        else if($("#luckysheet-modal-dialog-slider-alternateformat").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-alternateformat").outerWidth();
        }
    }

    $("#" + container).find(".luckysheet").height(gridH - 2).width(gridW - 2);

    cellmainHeight = gridH - (infobarHeight + toolbarHeight + calculatebarHeight + columeHeaderHeight + sheetBarHeight + statisticBarHeight);
    cellmainWidth = gridW - rowHeaderWidth;
    
    $("#luckysheet-cols-h-c, #luckysheet-cell-main, #luckysheet-scrollbar-x").width(cellmainWidth);
    $("#luckysheet-cell-main").height(cellmainHeight);
    $("#luckysheet-rows-h").height(cellmainHeight - cellMainSrollBarSize);

    $("#luckysheet-scrollbar-y").height(cellmainHeight + 6);
    $("#luckysheet-scrollbar-x").height(cellMainSrollBarSize);
    $("#luckysheet-scrollbar-y").width(cellMainSrollBarSize);

    luckysheetTableContentHW = [
        cellmainWidth + rowHeaderWidth - cellMainSrollBarSize, 
        cellmainHeight + columeHeaderHeight - cellMainSrollBarSize
    ];

    $("#luckysheetTableContent, #luckysheetTableContentF").attr({ 
        width: Math.ceil(luckysheetTableContentHW[0] * devicePixelRatio), 
        height: Math.ceil(luckysheetTableContentHW[1] * devicePixelRatio) 
    })
    .css({ width: luckysheetTableContentHW[0], height: luckysheetTableContentHW[1] });

    $("#" + container).find("#luckysheet-grid-window-1").css("bottom", sheetBarHeight);
    $("#" + container).find(".luckysheet-grid-window").css("bottom", statisticBarHeight);

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
    luckysheetrefreshgrid($("#luckysheet-cell-main").scrollLeft(), $("#luckysheet-cell-main").scrollTop());
    
    let ismore = false, 
        toolbarW = 0, 
        morebtn = '<div class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"> </div><div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="更多按钮" id="luckysheet-icon-morebtn" role="button" style="user-select: none;"> <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;color:#0188fb;"><i class="fa fa-list-ul"></i> 更多... </div> </div> </div> </div>',
        morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:'+ (infobarHeight + toolbarHeight+2 + $("#" + container).offset().top + $("body").scrollTop() ) +'px; right:0px;z-index:1003;padding-left:0px;display:none;height:auto;white-space:initial;"></div>';
    
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

        if(!ismore && toolbarW > gridW - 120){
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
            if($txt.text().indexOf("更多") > -1){
                $(this).find(".luckysheet-toolbar-menu-button-caption").html('<i class="fa fa-list-ul"></i> 收起... ');
            }
            else{
                $(this).find(".luckysheet-toolbar-menu-button-caption").html('<i class="fa fa-list-ul"></i> 更多... ');
            }
            
        });
        //$("#luckysheet-wa-editor div").trigger("create");
        
        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-menu-button").css("margin-right", -1);
        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-left").css("margin-right", -3);
    }

    $("#"+ container + " .luckysheet-wa-editor .luckysheet-toolbar-button-split-left").off("hover").hover(function(){
        $(this).next(".luckysheet-toolbar-button-split-right").addClass("luckysheet-toolbar-button-split-right-hover");
    }, function(){
        $(this).next(".luckysheet-toolbar-button-split-right").removeClass("luckysheet-toolbar-button-split-right-hover");
    });

    $("#"+ container + " .luckysheet-wa-editor .luckysheet-toolbar-button-split-right").off("hover").hover(function(){
        $(this).prev(".luckysheet-toolbar-button-split-left").addClass("luckysheet-toolbar-button-hover");
    }, function(){
        $(this).prev(".luckysheet-toolbar-button-split-left").removeClass("luckysheet-toolbar-button-hover");
    });
}