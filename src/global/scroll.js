import luckysheetFreezen from '../controllers/freezen';
import { luckysheet_searcharray } from '../controllers/sheetSearch';
import { luckysheetrefreshgrid } from '../global/refresh';
import Store from '../store';
import method from '../global/method'

let scrollRequestAnimationFrameIni = true,scrollRequestAnimationFrame = false, scrollTimeOutCancel=null;

function execScroll(){
    let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(), 
        scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
    luckysheetrefreshgrid(scrollLeft, scrollTop);
    scrollRequestAnimationFrame = window.requestAnimationFrame(execScroll);
}

//全局滚动事件
export default function luckysheetscrollevent(isadjust) {
    let $t = $("#luckysheet-cell-main");
    let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(), 
        scrollTop = $("#luckysheet-scrollbar-y").scrollTop(),
        canvasHeight = $("#luckysheetTableContent").height(); // canvas高度

    // clearTimeout(scrollTimeOutCancel);

    // scrollTimeOutCancel = setTimeout(() => {
    //     scrollRequestAnimationFrameIni  = true;
    //     window.cancelAnimationFrame(scrollRequestAnimationFrame);
    // }, 500);

    // if (!!isadjust) {
    //     let scrollHeight = $t.get(0).scrollHeight;
    //     let windowHeight = $t.height();
    //     let scrollWidth = $t.get(0).scrollWidth;
    //     let windowWidth = $t.width();

    //     let maxScrollLeft = scrollWidth - windowWidth;
    //     let maxScrollTop = scrollHeight - windowHeight;

    //     let visibledatacolumn_c = Store.visibledatacolumn, visibledatarow_c = Store.visibledatarow;

    //     if (luckysheetFreezen.freezenhorizontaldata != null) {
    //         visibledatarow_c = luckysheetFreezen.freezenhorizontaldata[3];
    //     }

    //     if (luckysheetFreezen.freezenverticaldata != null) {
    //         visibledatacolumn_c = luckysheetFreezen.freezenverticaldata[3];
    //     }

    //     let col_ed = luckysheet_searcharray(visibledatacolumn_c, scrollLeft);
    //     let row_ed = luckysheet_searcharray(visibledatarow_c, scrollTop);

    //     let refreshLeft = scrollLeft , refreshTop = scrollTop;

    //     if (col_ed <= 0) {
    //         scrollLeft = 0;
    //     }
    //     else {
    //         scrollLeft = visibledatacolumn_c[col_ed - 1];
    //     }

    //     if (row_ed <= 0) {
    //         scrollTop = 0;
    //     }
    //     else {
    //         scrollTop = visibledatarow_c[row_ed - 1];
    //     }
    // }

    if (luckysheetFreezen.freezenhorizontaldata != null) {
        if (scrollTop < luckysheetFreezen.freezenhorizontaldata[2]) {
            scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
            $("#luckysheet-scrollbar-y").scrollTop(scrollTop);
            return;
        }
    }

    if (luckysheetFreezen.freezenverticaldata != null) {
        if (scrollLeft < luckysheetFreezen.freezenverticaldata[2]) {
            scrollLeft = luckysheetFreezen.freezenverticaldata[2];
            $("#luckysheet-scrollbar-x").scrollLeft(scrollLeft);
            return;
        }
    }

    $("#luckysheet-cols-h-c").scrollLeft(scrollLeft);//列标题
    $("#luckysheet-rows-h").scrollTop(scrollTop);//行标题
    
    $t.scrollLeft(scrollLeft).scrollTop(scrollTop);

    $("#luckysheet-input-box-index").css({
        "left": $("#luckysheet-input-box").css("left"), 
        "top": (parseInt($("#luckysheet-input-box").css("top")) - 20) + "px", 
        "z-index": $("#luckysheet-input-box").css("z-index")
    }).show();

    // if(scrollRequestAnimationFrameIni && Store.scrollRefreshSwitch){
    //     execScroll();
    //     scrollRequestAnimationFrameIni = false;
    // }

    luckysheetrefreshgrid(scrollLeft, scrollTop);
    

    $("#luckysheet-bottom-controll-row").css("left", scrollLeft);

    //有选区且有冻结时，滚动适应
    if(luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null){
        luckysheetFreezen.scrollAdapt();
    }

    if(!method.createHookFunction("scroll", {scrollLeft, scrollTop, canvasHeight})){ return; }

}