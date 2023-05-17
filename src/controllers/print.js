import luckysheetConfigsetting from "./luckysheetConfigsetting";
import { zoomChange } from "./zoom";
import sheetmanage from "./sheetmanage";
import server from "./server";
import Store from "../store";
import locale from "../locale/locale";
import { replaceHtml } from "../utils/util";
import { modelHTML } from "./constant";
import { luckysheetDrawMain } from "../global/draw";
import { hasPartMC } from "../global/validate";
import { luckysheetdefaultstyle } from "./constant";
import tooltip from "../global/tooltip";

export function viewChange(curType, preType) {
    let currentSheet = sheetmanage.getSheetByIndex();

    if (currentSheet.config == null) {
        currentSheet.config = {};
    }

    if (currentSheet.config.sheetViewZoom == null) {
        currentSheet.config.sheetViewZoom = {};
    }

    let defaultZoom = 1,
        type = "zoomScaleNormal";
    printLineAndNumberDelete(currentSheet);
    if (curType == "viewNormal") {
        type = "viewNormalZoomScale";
    } else if (curType == "viewLayout") {
        type = "viewLayoutZoomScale";
    } else if (curType == "viewPage") {
        type = "viewPageZoomScale";
        defaultZoom = 0.6;
        printLineAndNumberCreate(currentSheet);
    }

    let curZoom = currentSheet.config.sheetViewZoom[type];
    if (curZoom == null) {
        curZoom = defaultZoom;
    }

    currentSheet.config.curentsheetView = curType;

    if (Store.clearjfundo) {
        Store.jfredo.push({
            type: "viewChange",
            curType: curType,
            preType: preType,
            sheetIndex: Store.currentSheetIndex,
        });
    }

    // Store.zoomRatio = curZoom;
    // server.saveParam("all", Store.currentSheetIndex, curZoom, { "k": "zoomRatio" });
    server.saveParam("cg", Store.currentSheetIndex, curType, { k: "curentsheetView" });

    Store.currentSheetView = curType;

    zoomChange(curZoom);
}

function printLineAndNumberDelete(sheet) {}

function printLineAndNumberCreate(sheet) {}

function switchViewBtn($t) {
    let $viewList = $t.parent(),
        preType = $viewList.find("luckysheet-print-viewBtn-active").attr("type");
    if ($t.attr("type") == preType) {
        return;
    }

    let curType = $t.attr("type");
    if (curType != null) {
        viewChange(curType, preType);
    } else {
        return;
    }

    $t.parent()
        .find(".luckysheet-print-viewBtn")
        .removeClass("luckysheet-print-viewBtn-active");
    $t.addClass("luckysheet-print-viewBtn-active");
}

export function printInitial() {
    let container = luckysheetConfigsetting.container;
    let _this = this;
    $("#" + container)
        .find(".luckysheet-print-viewBtn")
        .click(function() {
            switchViewBtn($(this));
        });
}
