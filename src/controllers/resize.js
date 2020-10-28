import luckysheetConfigsetting from './luckysheetConfigsetting';
import luckysheetFreezen from './freezen';
import { luckysheetrefreshgrid } from '../global/refresh';
import Store from '../store';
import locale from '../locale/locale';
import sheetmanage from './sheetmanage';
import tooltip from '../global/tooltip'

let gridW = 0, 
    gridH = 0;

export default function luckysheetsizeauto(isRefreshCanvas=true) {
    if (!luckysheetConfigsetting.showinfobar) {
        Store.infobarHeight = 0;
        $("#luckysheet_info_detail").hide();
    }
    else {
        $("#luckysheet_info_detail").show();
        // Store.infobarHeight = 56;
        Store.infobarHeight = document.querySelector('#luckysheet_info_detail').offsetHeight;
    }

    if (!luckysheetConfigsetting.showtoolbar) {
        $("#" + Store.container).find(".luckysheet-wa-editor, .luckysheet-share-logo").hide();
        Store.toolbarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-wa-editor, .luckysheet-share-logo").show();
        // Store.toolbarHeight = 72;
        Store.toolbarHeight = document.querySelector('#' + Store.container +' .luckysheet-wa-editor').offsetHeight;
    }

    if (!luckysheetConfigsetting.showsheetbar) {
        $("#" + Store.container).find("#luckysheet-sheet-area").hide();
        Store.sheetBarHeight = 0;
    }
    else {
        $("#" + Store.container).find("#luckysheet-sheet-area").show();
        Store.sheetBarHeight = 31;
    }

    if (!luckysheetConfigsetting.showstatisticBar) {
        $("#" + Store.container).find(".luckysheet-stat-area").hide();
        Store.statisticBarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-stat-area").show();
        Store.statisticBarHeight = 23;
    }

    // 公式栏
    Store.calculatebarHeight = document.querySelector('#luckysheet-wa-calculate').offsetHeight;

    $("#" + Store.container).find(".luckysheet-grid-container").css("top", Store.toolbarHeight + Store.infobarHeight + Store.calculatebarHeight);

    gridW = $("#" + Store.container).width(), gridH = $("#" + Store.container).height();

    if(luckysheetConfigsetting.showConfigWindowResize){//数据透视表  图表  交替颜色 Protection
        if($("#luckysheet-modal-dialog-slider-pivot").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-pivot").outerWidth();
        } 
        else if($(".chartSetting").is(":visible")){
            gridW -= $(".chartSetting").outerWidth();
        }
        else if($("#luckysheet-modal-dialog-slider-alternateformat").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-alternateformat").outerWidth();
        }
        if($("#luckysheet-modal-dialog-slider-protection").is(":visible")){
            gridW -= $("#luckysheet-modal-dialog-slider-protection").outerWidth();
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
        // morebtn = '<div class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"> </div><div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="'+ locale_toolbar.toolMoreTip +'" id="luckysheet-icon-morebtn" role="button" style="user-select: none;"> <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;"> <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;color:#0188fb;"><i class="fa fa-list-ul"></i> '+ locale_toolbar.toolMore +'... </div> </div> </div> </div>',
        morebtn = `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${locale_toolbar.toolMoreTip}" id="luckysheet-icon-morebtn" role="button" style="user-select: none;"> 
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;"> 
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;">

                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                        ${locale_toolbar.toolMore}
                    </div> 
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont icon-xiayige" style="user-select: none;font-size:12px;">
                    </div>

                </div> 
            </div>
         </div>`,
        // morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:'+ (Store.infobarHeight + Store.toolbarHeight + 3 + $("#" + Store.container).offset().top + $("body").scrollTop() - $("#luckysheet-functionbox-container").height() ) +'px; right:0px;z-index:1003;padding:8px;display:none;height:auto;white-space:initial;"></div>';
        morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:'+ (Store.infobarHeight + Store.toolbarHeight + $("#" + Store.container).offset().top + $("body").scrollTop()) +'px; right:0px;z-index:1003;padding:5.5px;display:none;height:auto;white-space:initial;"></div>';
    
    if($("#luckysheet-icon-morebtn-div").length == 0){
        $("body").append(morediv);
    }

    $("#luckysheet-icon-morebtn-div").hide();
    // $("#luckysheet-icon-morebtn-div > div").appendTo($("#luckysheet-wa-editor"));

    $("#luckysheet-icon-morebtn-div > div").each(function(){
        const $t = $(this)[0];
        const $container =  $("#luckysheet-wa-editor")[0];
        
        $container.appendChild(document.createTextNode(" "));
        $container.appendChild($t);
    });

    // $("#luckysheet-wa-editor > div").trigger("create");
    // $("#luckysheet-icon-morebtn-div > div").trigger("create");
    $("#luckysheet-icon-morebtn").remove();

    //计算前面按钮宽度加起来总和，超过 容器宽度-更多按钮，则剩下的按钮移动到展开的容器内，这种方式计算宽度不准确，且会导致下拉箭头和主按钮分离的情况，改为 计算left作为宽度依据，和容器宽度比较的方式
    // $("#luckysheet-wa-editor > div").each(function(){
    //     let $t = $(this);
    //     // toolbarW += $t.outerWidth();
    //     toolbarW += $t.outerWidth();

    //     if(!ismore && toolbarW > gridW - 140){
    //         ismore = true;
    //     }

    //     if(ismore){
    //         $("#luckysheet-icon-morebtn-div").append($(this));
    //     }
    // });

    // 所有按钮宽度与元素定位
    const toobarWidths = Store.toobarObject.toobarWidths;
    const toobarElements = Store.toobarObject.toobarElements;
    let moreButtonIndex = 0;

    // 找到应该隐藏的起始元素位置
    for (let index = toobarWidths.length - 1; index >= 0; index--) {

        // #luckysheet-icon-morebtn button width plus right is 83px
        if(toobarWidths[index] < gridW - 90){
            moreButtonIndex = index;
            if(moreButtonIndex < toobarWidths.length - 1){

                ismore = true;
            }
            break;
        }
    }
    // 从起始位置开始，后面的元素统一挪到下方隐藏DIV中
    for (let index = moreButtonIndex; index < toobarElements.length; index++) {
        const element = toobarElements[index];
        if(element instanceof Array){
            for(const ele of element){
                $("#luckysheet-icon-morebtn-div").append($(`${ele}`));
            }
        }else{
            $("#luckysheet-icon-morebtn-div").append($(`${element}`));
        }
        
    }

    if(ismore){
        
        $("#luckysheet-wa-editor").append(morebtn);
        $("#luckysheet-icon-morebtn").click(function(){
            let right = $(window).width() - $("#luckysheet-icon-morebtn").offset().left - $("#luckysheet-icon-morebtn").width()+ $("body").scrollLeft();
            $("#luckysheet-icon-morebtn-div").toggle().css("right", right < 0 ? 0 : right);

            let $txt = $(this).find(".luckysheet-toolbar-menu-button-caption");
            if($txt.text().indexOf(locale_toolbar.toolMore) > -1){

                const toolCloseHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${locale_toolbar.toolClose}
                </div> 
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont icon-shangyige" style="user-select: none;font-size:12px;">
                </div>
                `
                $(this).find(".luckysheet-toolbar-button-inner-box").html(toolCloseHTML);
            }
            else{

                const toolMoreHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${locale_toolbar.toolMore}
                </div> 
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont icon-xiayige" style="user-select: none;font-size:12px;">
                </div>
                `

                $(this).find(".luckysheet-toolbar-button-inner-box").html(toolMoreHTML);
            }
            
        });
        //$("#luckysheet-wa-editor div").trigger("create");
        
        // $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-menu-button").css("margin-right", -1);
        // $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-left").css("margin-right", -3);

        // “更多”容器中，联动hover效果
        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-left").off("hover").hover(function(){
            $(this).next(".luckysheet-toolbar-button-split-right").addClass("luckysheet-toolbar-button-split-right-hover");
        }, function(){
            $(this).next(".luckysheet-toolbar-button-split-right").removeClass("luckysheet-toolbar-button-split-right-hover");
        });

        $("#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-right").off("hover").hover(function(){
            $(this).prev(".luckysheet-toolbar-button-split-left").addClass("luckysheet-toolbar-button-hover");
        }, function(){
            $(this).prev(".luckysheet-toolbar-button-split-left").removeClass("luckysheet-toolbar-button-hover");
        });

        // tooltip
        tooltip.createHoverTip("#luckysheet-icon-morebtn-div" ,".luckysheet-toolbar-menu-button, .luckysheet-toolbar-button, .luckysheet-toolbar-combo-button");
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

    $("#luckysheet-scrollbar-x").width(Store.cellmainWidth).css("left", Store.rowHeaderWidth - 2);

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

/**
 * 统计工具栏各个按钮宽度值,用于计算哪些需要放到 更多按钮里
 * 
 * 注意：每增加一个工具栏按钮，都要在toobarWidths和toobarElements这两个数组里加上按钮的统计数据
 */
export function menuToolBarWidth() {
    const toobarObject = Store.toobarObject;
    toobarObject.toobarWidths= [
        $('#luckysheet-icon-undo').offset().left,
        $('#luckysheet-icon-redo').offset().left,
        $('#luckysheet-icon-paintformat').offset().left,
        $('#luckysheet-icon-currency').offset().left,
        $('#luckysheet-icon-percent').offset().left,
        $('#luckysheet-icon-fmt-decimal-decrease').offset().left,
        $('#luckysheet-icon-fmt-decimal-increase').offset().left,
        $('#luckysheet-icon-fmt-other').offset().left,
        $('#luckysheet-icon-font-family').offset().left,
        $('#luckysheet-icon-font-size').offset().left,
        $('#luckysheet-icon-bold').offset().left,
        $('#luckysheet-icon-italic').offset().left,
        $('#luckysheet-icon-strikethrough').offset().left,
        $('#luckysheet-icon-text-color').offset().left,
        $('#luckysheet-icon-cell-color').offset().left,
        $('#luckysheet-icon-border-all').offset().left,
        $('#luckysheet-icon-merge-button').offset().left,
        $('#luckysheet-icon-align').offset().left,
        $('#luckysheet-icon-valign').offset().left,
        $('#luckysheet-icon-textwrap').offset().left,
        $('#luckysheet-icon-rotation').offset().left,
        $('#luckysheet-insertImg-btn-title').offset().left,
        $('#luckysheet-insertLink-btn-title').offset().left,
        $('#luckysheet-chart-btn-title').offset().left,
        $('#luckysheet-icon-postil').offset().left,
        $('#luckysheet-pivot-btn-title').offset().left,
        $('#luckysheet-icon-function').offset().left,
        $('#luckysheet-freezen-btn-horizontal').offset().left,
        $('#luckysheet-icon-autofilter').offset().left,
        $('#luckysheet-icon-conditionformat').offset().left,
        $('#luckysheet-dataVerification-btn-title').offset().left,
        $('#luckysheet-splitColumn-btn-title').offset().left,
        $('#luckysheet-chart-btn-screenshot').offset().left,
        $('#luckysheet-icon-seachmore').offset().left,
        $('#luckysheet-icon-protection').offset().left,
        $('#luckysheet-icon-print').offset().left,
        $('#luckysheet-icon-print').offset().left + $('#luckysheet-icon-protection').outerWidth() + 5,
    ];
    toobarObject.toobarElements = [
        '#luckysheet-icon-undo',
        '#luckysheet-icon-redo',
        ['#luckysheet-icon-paintformat','#toolbar-separator-paint-format'],
        '#luckysheet-icon-currency',
        '#luckysheet-icon-percent',
        '#luckysheet-icon-fmt-decimal-decrease',
        '#luckysheet-icon-fmt-decimal-increase',
        ['#luckysheet-icon-fmt-other','#toolbar-separator-more-format'],
        ['#luckysheet-icon-font-family','#toolbar-separator-font-family'],
        ['#luckysheet-icon-font-size','#toolbar-separator-font-size'],
        '#luckysheet-icon-bold',
        '#luckysheet-icon-italic',
        '#luckysheet-icon-strikethrough',
        ['#luckysheet-icon-text-color','#luckysheet-icon-text-color-menu','#toolbar-separator-text-color'],
        ['#luckysheet-icon-cell-color','#luckysheet-icon-cell-color-menu'],
        ['#luckysheet-icon-border-all','#luckysheet-icon-border-menu'],
        ['#luckysheet-icon-merge-button','#luckysheet-icon-merge-menu','#toolbar-separator-merge-cell'],
        ['#luckysheet-icon-align','#luckysheet-icon-align-menu'],
        ['#luckysheet-icon-valign','#luckysheet-icon-valign-menu'],
        ['#luckysheet-icon-textwrap','#luckysheet-icon-textwrap-menu'],
        ['#luckysheet-icon-rotation','#luckysheet-icon-rotation-menu','#toolbar-separator-text-rotate'],
        '#luckysheet-insertImg-btn-title',
        '#luckysheet-insertLink-btn-title',
        '#luckysheet-chart-btn-title',
        '#luckysheet-icon-postil',
        ['#luckysheet-pivot-btn-title','#toolbar-separator-pivot-table'],
        ['#luckysheet-icon-function','#luckysheet-icon-function-menu'],
        ['#luckysheet-freezen-btn-horizontal','#luckysheet-icon-freezen-menu'],
        '#luckysheet-icon-autofilter',
        '#luckysheet-icon-conditionformat',
        '#luckysheet-dataVerification-btn-title',
        '#luckysheet-splitColumn-btn-title',
        '#luckysheet-chart-btn-screenshot',
        '#luckysheet-icon-seachmore',
        '#luckysheet-icon-protection',
        '#luckysheet-icon-print',
    ]
}