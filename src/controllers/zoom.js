import Store from '../store';
import locale from '../locale/locale';
import { replaceHtml } from '../utils/util';
import sheetmanage from './sheetmanage';
import {changeSheetContainerSize} from './resize';
import { jfrefreshgrid_rhcw } from '../global/refresh';
import server from './server';
import luckysheetPostil from './postil';
import imageCtrl from './imageCtrl';



let luckysheetZoomTimeout = null;

export function zoomChange(ratio){
    if(Store.flowdata==null || Store.flowdata.length==0){
        return;
    }

    clearTimeout(luckysheetZoomTimeout);
    luckysheetZoomTimeout = setTimeout(() => {
        if (Store.clearjfundo) {
            Store.jfredo.push({ 
                "type": "zoomChange", 
                "zoomRatio": Store.zoomRatio, 
                "curZoomRatio": ratio, 
                "sheetIndex": Store.currentSheetIndex, 
            });
        }
        currentWheelZoom = null;
        Store.zoomRatio = ratio;

        let currentSheet = sheetmanage.getSheetByIndex();

        //批注
        luckysheetPostil.buildAllPs(currentSheet.data);

        //图片
        imageCtrl.images = currentSheet.images;
        imageCtrl.allImagesShow();
        imageCtrl.init();

        if(currentSheet.config==null){
            currentSheet.config = {};
        }
    
        if(currentSheet.config.sheetViewZoom==null){
            currentSheet.config.sheetViewZoom = {};
        }

        let type = currentSheet.config.curentsheetView;
        if(type==null){
            type = "viewNormal";
        }
        currentSheet.config.sheetViewZoom[type+"ZoomScale"] = ratio;
    
        server.saveParam("all", Store.currentSheetIndex, Store.zoomRatio, { "k": "zoomRatio" });
        server.saveParam("cg", Store.currentSheetIndex, currentSheet.config["sheetViewZoom"], { "k": "sheetViewZoom" });

        zoomRefreshView();
    }, 100);
    
}

export function zoomRefreshView(){
    // let $scrollLeft = $("#luckysheet-scrollbar-x"), $scrollTop = $("#luckysheet-scrollbar-y");
    // let sl = $scrollLeft.scrollLeft(), st = $scrollTop.scrollTop();

    // let wp = $scrollLeft.find("div").width(), hp = $scrollTop.find("div").height();

    jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    changeSheetContainerSize();

    // let wc = $scrollLeft.find("div").width(), hc = $scrollTop.find("div").height();

    // $scrollLeft.scrollLeft(sl+wc-wp);
    // $scrollTop.scrollTop(st+hc-hp);
}

let currentWheelZoom = null;
export function zoomInitial(){

    // 缩放步长
    const ZOOM_WHEEL_STEP = 0.02; // ctrl + 鼠标滚轮
    const ZOOM_STEP = 0.1; // 点击以及 Ctrl + +-
    
    // 缩放最大最小比例
    const MAX_ZOOM_RATIO = 4;
    const MIN_ZOOM_RATIO = .1;
    
    $("#luckysheet-zoom-minus").click(function(){
        let currentRatio;
        if(Store.zoomRatio==null){
            currentRatio = Store.zoomRatio = 1;
        }
        else{
            currentRatio = Math.ceil(Store.zoomRatio*10)/10;
        }

        currentRatio = currentRatio-ZOOM_STEP;

        if(currentRatio==Store.zoomRatio){
            currentRatio = currentRatio-ZOOM_STEP;
        }

        if(currentRatio<=MIN_ZOOM_RATIO){
            currentRatio = MIN_ZOOM_RATIO;
        }

        // Store.zoomRatio = currentRatio;
        zoomChange(currentRatio);
        zoomNumberDomBind(currentRatio);
    });

    $("#luckysheet-zoom-plus").click(function(){
        let currentRatio;
        if(Store.zoomRatio==null){
            currentRatio = Store.zoomRatio = 1;
        }
        else{
            currentRatio = Math.floor(Store.zoomRatio*10)/10;
        }

        currentRatio = currentRatio+ZOOM_STEP;

        if(currentRatio==Store.zoomRatio){
            currentRatio = currentRatio+ZOOM_STEP;
        }

        if(currentRatio>=MAX_ZOOM_RATIO){
            currentRatio = MAX_ZOOM_RATIO;
        }

        // Store.zoomRatio = currentRatio;
        zoomChange(currentRatio);
        zoomNumberDomBind(currentRatio);
    });

    $("#luckysheet-zoom-slider").mousedown(function(e){
        let xoffset = $(this).offset().left, pageX = e.pageX;

        let currentRatio = positionToRatio(pageX-xoffset);
        // Store.zoomRatio = currentRatio;
        zoomChange(currentRatio);
        zoomNumberDomBind(currentRatio);
    });

    $("#luckysheet-zoom-cursor").mousedown(function(e){
        let curentX = e.pageX,cursorLeft = parseFloat($("#luckysheet-zoom-cursor").css("left"));
        $("#luckysheet-zoom-cursor").css("transition","none");
        $(document).off("mousemove.zoomCursor").on("mousemove.zoomCursor",function(event){
            let moveX = event.pageX;
            let offsetX = moveX - curentX;
            // console.log(moveX, curentX, offsetX);
            // curentX = moveX;
            // let left = parseFloat($("#luckysheet-zoom-cursor").css("left"));
            let pos = cursorLeft + offsetX; 
            let currentRatio = positionToRatio(pos);

            if(currentRatio>MAX_ZOOM_RATIO){
                currentRatio = MAX_ZOOM_RATIO;
                pos = 100;
            }

            if(currentRatio<MIN_ZOOM_RATIO){
                currentRatio = MIN_ZOOM_RATIO;
                pos = 0;
            }

            // Store.zoomRatio = currentRatio;
            zoomChange(currentRatio);
            let r = Math.round(currentRatio*100) + "%";
            $("#luckysheet-zoom-ratioText").html(r);
            $("#luckysheet-zoom-cursor").css("left", pos-4);
        });

        $(document).off("mouseup.zoomCursor").on("mouseup.zoomCursor",function(event){
            $(document).off(".zoomCursor");
            $("#luckysheet-zoom-cursor").css("transition","all 0.3s");
        });

        e.stopPropagation();
    }).click(function(e){
        e.stopPropagation();
    });

    $("#luckysheet-zoom-ratioText").click(function(){
        // Store.zoomRatio = 1;
        zoomChange(1);
        zoomNumberDomBind(1);
    });

    zoomNumberDomBind(Store.zoomRatio);

    currentWheelZoom = null;
    // 拦截系统缩放快捷键 Ctrl + wheel
    document.addEventListener(
        'wheel',
        function (ev) {
            if (!ev.ctrlKey || !ev.deltaY) {
                return;
            }
            if (currentWheelZoom === null) {
                currentWheelZoom = Store.zoomRatio || 1;
            }
            currentWheelZoom += ev.deltaY < 0 ? ZOOM_WHEEL_STEP : -ZOOM_WHEEL_STEP;
            if (currentWheelZoom >= MAX_ZOOM_RATIO) {
                currentWheelZoom = MAX_ZOOM_RATIO;
            } else if (currentWheelZoom < MIN_ZOOM_RATIO) {
                currentWheelZoom = MIN_ZOOM_RATIO;
            }
            zoomChange(currentWheelZoom);
            zoomNumberDomBind(currentWheelZoom);
            ev.preventDefault();
            ev.stopPropagation();
        },
        { capture: true, passive: false }
    );

    // 拦截系统缩放快捷键 Ctrl + +/- 0
    document.addEventListener(
        'keydown',
        function (ev) {
            if (!ev.ctrlKey) {
                return;
            }
            let handled = false;
            let zoom = Store.zoomRatio || 1;
            if (ev.key === '-' || ev.which === 189) {
                zoom -= ZOOM_STEP;
                handled = true;
            } else if (ev.key === '+' || ev.which === 187) {
                zoom += ZOOM_STEP;
                handled = true;
            } else if (ev.key === '0' || ev.which === 48) {
                zoom = 1;
                handled = true;
            }
    
            if (handled) {
                ev.preventDefault();
                if (zoom >= MAX_ZOOM_RATIO) {
                    zoom = MAX_ZOOM_RATIO;
                } else if (zoom < MIN_ZOOM_RATIO) {
                    zoom = MIN_ZOOM_RATIO;
                }
                zoomChange(zoom);
                zoomNumberDomBind(zoom);
            }
        },
        { capture: true }
    );
}

function positionToRatio(pos){
    let ratio = 1;
    if(pos<50){
        ratio = Math.round((pos*1.8/100 + 0.1)*100)/100;
    }
    else if(pos>50){
        ratio = Math.round(((pos-50)*6/100 + 1)*100)/100;
    }

    return ratio;
}

function zoomSlierDomBind(ratio){
    let domPos = 50;
    if(ratio<1){
        domPos = Math.round((ratio - 0.1)*100 / 0.18)/10;
    }
    else if(ratio>1){
        domPos = Math.round((ratio - 1)*100 / 0.6)/10+50;
    }
    $("#luckysheet-zoom-cursor").css("left", domPos-4);
}

export function zoomNumberDomBind(ratio){
    let r = Math.round(ratio*100) + "%";
    $("#luckysheet-zoom-ratioText").html(r);
    zoomSlierDomBind(ratio);
}

