import luckysheetConfigsetting from './luckysheetConfigsetting';
import luckysheetFreezen from './freezen';
import { luckysheetrefreshgrid } from '../global/refresh';
import Store from '../store';
import locale from '../locale/locale';
import sheetmanage from './sheetmanage';
import tooltip from '../global/tooltip'
import { $$, getObjType, camel2split } from "../utils/util";
import { defaultToolbar, toolbarIdMap } from './toolbar';

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

    if (!!Store.toobarObject && !!Store.toobarObject.toobarElements && Store.toobarObject.toobarElements.length === 0) {
        $("#" + Store.container).find(".luckysheet-wa-editor").hide();
        Store.toolbarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-wa-editor").show();
        // Store.toolbarHeight = 72;
        Store.toolbarHeight = document.querySelector('#' + Store.container +' .luckysheet-wa-editor').offsetHeight;
    }

    // if (!luckysheetConfigsetting.showsheetbar) {
    //     $("#" + Store.container).find("#luckysheet-sheet-area").hide();
    //     Store.sheetBarHeight = 0;
    // }
    // else {
    //     $("#" + Store.container).find("#luckysheet-sheet-area").show();
    //     Store.sheetBarHeight = 31;
    // }


    customSheetbarConfig();

    // if (!luckysheetConfigsetting.showstatisticBar) {
    //     $("#" + Store.container).find(".luckysheet-stat-area").hide();
    //     Store.statisticBarHeight = 0;
    // }
    // else {
    //     $("#" + Store.container).find(".luckysheet-stat-area").show();
    //     Store.statisticBarHeight = 23;
    // }

    customStatisticBarConfig();

    // 公式栏
    const formulaEle = document.querySelector("#" + Store.container + ' .luckysheet-wa-calculate');
    if (!luckysheetConfigsetting.sheetFormulaBar) {
        formulaEle.style.display = 'none';
        Store.calculatebarHeight = 0;
    }
    else {
        formulaEle.style.display = 'block';
        Store.calculatebarHeight = formulaEle.offsetHeight;
    }

    $("#" + Store.container).find(".luckysheet-grid-container").css("top", Store.toolbarHeight + Store.infobarHeight + Store.calculatebarHeight);

    gridW = $("#" + Store.container).width();

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

    const _locale = locale();
    const locale_toolbar = _locale.toolbar;
    let ismore = false,
        toolbarW = 0,
        morebtn = `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${locale_toolbar.toolMoreTip}" id="luckysheet-icon-morebtn" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;">

                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                        ${locale_toolbar.toolMore}
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont-luckysheet luckysheet-iconfont-xiayige" style="user-select: none;font-size:12px;">
                    </div>

                </div>
            </div>
         </div>`,
         // Add style left:$$('.luckysheet') left, when the worksheet does not fill the full screen
        morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:'+ (Store.infobarHeight + Store.toolbarHeight + $("#" + Store.container).offset().top + $("body").scrollTop()) +'px;right:0px;z-index:1003;padding:5.5px;visibility:hidden;height:auto;white-space:initial;"></div>';

    if($("#luckysheet-icon-morebtn-div").length == 0){
        $("body").append(morediv);
    }

    // $("#luckysheet-icon-morebtn-div").hide();
    $$("#luckysheet-icon-morebtn-div").style.visibility = 'hidden';
    // $("#luckysheet-icon-morebtn-div > div").appendTo($("#luckysheet-wa-editor"));

    $("#luckysheet-icon-morebtn-div > div").each(function(){
        const $t = $(this)[0];
        const $container =  $("#luckysheet-wa-editor")[0];

        $container.appendChild(document.createTextNode(" "));

        $container.appendChild($t);
    });

    $("#luckysheet-icon-morebtn").remove();

    // 所有按钮宽度与元素定位
    const toobarWidths = Store.toobarObject.toobarWidths;
    const toobarElements = Store.toobarObject.toobarElements;
    let moreButtonIndex = 0;

    // When you resize the window during initialization, you will find that the dom has not been rendered yet
    if(toobarWidths == undefined){
        return;
    }
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

            //When resize, change the width of the more button container in real time
            $$('#luckysheet-icon-morebtn-div').style.left = '';//reset

            // *这里计算containerLeft的作用是：获得容器左侧的margin值，以让点击出现的“更多按钮”栏位置不会出错。
            const containerLeft = $$(`#${Store.container}`).getBoundingClientRect ? $$(`#${Store.container}`).getBoundingClientRect().left : 0;
            const morebtnLeft = $$('#luckysheet-icon-morebtn-div').getBoundingClientRect().left;//get real left info

            if(morebtnLeft < containerLeft){
                $$('#luckysheet-icon-morebtn-div').style.left = containerLeft + 'px';
            }

            let right = $(window).width() - $("#luckysheet-icon-morebtn").offset().left - $("#luckysheet-icon-morebtn").width()+ $("body").scrollLeft();


            // $("#luckysheet-icon-morebtn-div").toggle().css("right", right < 0 ? 0 : right);

            // use native js operation
            $$('#luckysheet-icon-morebtn-div').style.right = right < 0 ? 0 : right + 'px';

            // change to visibility,morebtnLeft will get the actual value
            if($$('#luckysheet-icon-morebtn-div').style.visibility === 'hidden'){
                $$('#luckysheet-icon-morebtn-div').style.visibility = 'visible';
            }else{
                $$('#luckysheet-icon-morebtn-div').style.visibility = 'hidden';
            }

            let $txt = $(this).find(".luckysheet-toolbar-menu-button-caption");
            if($txt.text().indexOf(locale_toolbar.toolMore) > -1){

                const toolCloseHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${locale_toolbar.toolClose}
                </div>
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont-luckysheet luckysheet-iconfont-shangyige" style="user-select: none;font-size:12px;">
                </div>
                `
                $(this).find(".luckysheet-toolbar-button-inner-box").html(toolCloseHTML);
            }
            else{

                const toolMoreHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${locale_toolbar.toolMore}
                </div>
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont-luckysheet luckysheet-iconfont-xiayige" style="user-select: none;font-size:12px;">
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

    // When adding elements to the luckysheet-icon-morebtn-div element of the toolbar, it will affect the height of the entire workbook area, so the height is obtained here
    gridH = $("#" + Store.container).height();

    $("#" + Store.container).find(".luckysheet").height(gridH - 2).width(gridW - 2);

    changeSheetContainerSize(gridW, gridH)

    if(isRefreshCanvas){
        luckysheetrefreshgrid($("#luckysheet-cell-main").scrollLeft(), $("#luckysheet-cell-main").scrollTop());
    }

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
    Store.cellmainHeight = gridH - (Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight + Store.sheetBarHeight + Store.statisticBarHeight);
    Store.cellmainWidth = gridW - Store.rowHeaderWidth;

    $("#luckysheet-cols-h-c, #luckysheet-cell-main").width(Store.cellmainWidth);
    $("#luckysheet-cell-main").height(Store.cellmainHeight);
    $("#luckysheet-rows-h").height(Store.cellmainHeight - Store.cellMainSrollBarSize);

    $("#luckysheet-scrollbar-y").height(Store.cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);
    $("#luckysheet-scrollbar-x").height(Store.cellMainSrollBarSize);
    $("#luckysheet-scrollbar-y").width(Store.cellMainSrollBarSize);

    $("#luckysheet-scrollbar-x").width(Store.cellmainWidth).css("left", Store.rowHeaderWidth - 2);

    Store.luckysheetTableContentHW = [
        Store.cellmainWidth + Store.rowHeaderWidth - Store.cellMainSrollBarSize,
        Store.cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize
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
 *
 *
 * Toolbar judgment rules: First set the display and hide of all tool buttons according to showtoolbar, and then override the judgment of showtoolbar according to showtoolbarConfig rules
 *
 * The width value of each button in the statistics toolbar is used to calculate which needs to be placed in more buttons
 */
export function menuToolBarWidth() {
    const showtoolbar = luckysheetConfigsetting.showtoolbar;
    const showtoolbarConfig = luckysheetConfigsetting.showtoolbarConfig;

    const toobarWidths = Store.toobarObject.toobarWidths = [];
    const toobarElements = Store.toobarObject.toobarElements = [];
    const toolbarConfig = Store.toobarObject.toolbarConfig = buildBoolBarConfig();

    /**
     * 基于 showtoolbarConfig 配置 动态生成 toolbarConfig
     * @returns {object}
     * @input showtoolbarConfig = ['undo', 'redo', '|' , 'font' , 'moreFormats', '|']
     * {
     *     undo: {ele: '#luckysheet-icon-undo', index: 0},
     *     redo: {ele: ['#luckysheet-icon-redo', '#luckysheet-separator-redo'], index: 1},
     *     undo: {ele: '#luckysheet-icon-font', index: 2},
     *     moreFormats: {ele: ['#luckysheet-icon-fmt-other', '#luckysheet-separator-more-formats'], index: 3},
     * }
     */
    function buildBoolBarConfig() {
        let obj = {};
        function array2Config(arr) {
            const obj = {};
            let current,next;
            let index = 0;
            for (let i = 0; i<arr.length; i++) {
                current = arr[i];
                next = arr[i + 1];
                if (current !== '|') {
                    obj[current] = {
                        ele: toolbarIdMap[current],
                        index: index++
                    }
                }
                if (next === '|') {
                    if (getObjType(obj[current].ele) === 'array') {
                        obj[current].ele.push(`#toolbar-separator-${camel2split(current)}`);
                    } else {
                        obj[current].ele = [obj[current].ele, `#toolbar-separator-${camel2split(current)}`];
                    }
                }
            }
            return obj;
        }
        // 数组形式直接生成
        if (getObjType(showtoolbarConfig) === 'array') {
            // show 为 false
            if (!showtoolbar) {
                return obj;
            }
            return array2Config(showtoolbarConfig);
        }
        // 否则为全部中从记录中挑选显示或隐藏
        const config = defaultToolbar.reduce(function(total, curr) {
            if (curr !== '|') {
                total[curr] = true;
            }
            return total;
        }, {});
        if (!showtoolbar) {
            for (let s in config) {
                config[s] = false;
            }
        }

        if (JSON.stringify(showtoolbarConfig) !== '{}') {
            if(showtoolbarConfig.hasOwnProperty('undoRedo')){
                config.undo = config.redo = showtoolbarConfig.undoRedo;

            }
            Object.assign(config, showtoolbarConfig);

            let current,next;
            let index = 0;
            for (let i = 0; i<defaultToolbar.length; i++) {
                current = defaultToolbar[i];
                next = defaultToolbar[i + 1];
                if (config[current] === false) {
                    continue;
                }
                if (current !== '|' && config[current]) {

                    obj[current] = {
                        ele: toolbarIdMap[current],
                        index: index++
                    }
                }
                if (next === '|') {
                    if (getObjType(obj[current].ele) === 'array') {
                        obj[current].ele.push(`#toolbar-separator-${camel2split(current)}`);
                    } else {
                        obj[current].ele = [obj[current].ele, `#toolbar-separator-${camel2split(current)}`];
                    }
                }
            }
        } else {
            obj = showtoolbar ? array2Config(defaultToolbar) : {};
        }

        return obj;
    }

    for (let s in toolbarConfig){
        if (Object.prototype.hasOwnProperty.call(toolbarConfig, s)) {
            toobarElements.push($.extend(true,{},toolbarConfig[s]));
        }
    }

    toobarElements.sort(sortToolbar);

    function sortToolbar(a,b) {
        if(a.index > b.index){
            return 1;
        }else{
            return -1;
        }
    }
    toobarElements.forEach((curr,index,arr)=>{
        arr[index] = curr.ele;

        if(index !== toobarElements.length - 1){
            if(curr.ele instanceof Array){
                toobarWidths.push($(curr.ele[0]).offset().left);
            }else{
                toobarWidths.push($(curr.ele).offset().left);
            }
        }else{
            if(curr.ele instanceof Array){
                toobarWidths.push($(curr.ele[0]).offset().left);
                toobarWidths.push($(curr.ele[0]).offset().left + $(curr.ele[0]).outerWidth() + 5);
            }else{
                toobarWidths.push($(curr.ele).offset().left);
                toobarWidths.push($(curr.ele).offset().left + $(curr.ele).outerWidth() + 5);
            }
        }

    });

    //If the container does not occupy the full screen, we need to subtract the left margin
    const containerLeft = $('#' + Store.container).offset().left;
    toobarWidths.forEach((item,i)=>{
        toobarWidths[i] -= containerLeft;
    })

}

/**
 *Custom configuration bottom sheet button
 */
function customSheetbarConfig() {

    if(!luckysheetConfigsetting.initShowsheetbarConfig){

        luckysheetConfigsetting.initShowsheetbarConfig = true;

        const config = {
            add: true, //Add worksheet
            menu: true, //Worksheet management menu
            sheet: true //Worksheet display
        }

        if(!luckysheetConfigsetting.showsheetbar){
            for(let s in config){
                config[s] = false;
            }
        }

        // showsheetbarConfig determines the final result
        if(JSON.stringify(luckysheetConfigsetting.showsheetbarConfig) !== '{}'){
            Object.assign(config,luckysheetConfigsetting.showsheetbarConfig);
        }

        luckysheetConfigsetting.showsheetbarConfig = config;

    }

    const config = luckysheetConfigsetting.showsheetbarConfig;

    let isHide = 0;

    for (let s in config) {
        if(!config[s]){
            switch (s) {
                case 'add':
                    $('#luckysheet-sheets-add').hide();
                    isHide++;
                    break;

                case 'menu':
                    $('#luckysheet-sheets-m').hide();
                    isHide++;
                    break;

                case 'sheet':
                    $('#luckysheet-sheet-container').hide();
                    $('#luckysheet-sheets-leftscroll').hide();
                    $('#luckysheet-sheets-rightscroll').hide();
                    isHide++;
                    break;

                default:
                    break;
            }
        }
    }

    if (isHide === 3) {
        $("#" + Store.container).find("#luckysheet-sheet-area").hide();
        Store.sheetBarHeight = 0;
    }
    else {
        $("#" + Store.container).find("#luckysheet-sheet-area").show();
        Store.sheetBarHeight = 31;
    }
}


/**
 * Customize the bottom count bar
 */
function customStatisticBarConfig() {
    if(!luckysheetConfigsetting.initStatisticBarConfig){

        luckysheetConfigsetting.initStatisticBarConfig = true;

        const config = {
            count: true, // Count bar
            view: true, // print view
            zoom: true // Zoom
        }

        if(!luckysheetConfigsetting.showstatisticBar){
            for(let s in config){
                config[s] = false;
            }
        }

        // showstatisticBarConfig determines the final result
        if(JSON.stringify(luckysheetConfigsetting.showstatisticBarConfig) !== '{}'){
            Object.assign(config,luckysheetConfigsetting.showstatisticBarConfig);
        }

        luckysheetConfigsetting.showstatisticBarConfig = config;

    }

    const config = luckysheetConfigsetting.showstatisticBarConfig;

    let isHide = 0;

    for (let s in config) {
        if(!config[s]){
            switch (s) {
                case 'count':
                    $('#luckysheet-sta-content').hide();
                    isHide++;
                    break;

                case 'view':
                    $('.luckysheet-print-viewList').hide();
                    isHide++;
                    break;

                case 'zoom':
                    $('#luckysheet-zoom-content').hide();
                    isHide++;
                    break;

                default:
                    break;
            }
        }
    }

    if (isHide === 3) {
        $("#" + Store.container).find(".luckysheet-stat-area").hide();
        Store.statisticBarHeight = 0;
    }
    else {
        $("#" + Store.container).find(".luckysheet-stat-area").show();
        Store.statisticBarHeight = 23;
    }
}
