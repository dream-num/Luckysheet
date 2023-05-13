import luckysheetConfigsetting from "./luckysheetConfigsetting";
import { zoomChange } from "./zoom";
import sheetmanage from "./sheetmanage";
import server from "./server";
import { rowLocationByIndex, colLocationByIndex, mouseposition, rowLocation, colLocation } from "../global/location";
import Store from "../store";
import locale from "../locale/locale";
import { replaceHtml } from "../utils/util";
import { modelHTML } from "./constant";
import { luckysheetDrawMain } from "../global/draw";
import { hasPartMC } from "../global/validate";
import { luckysheetdefaultstyle } from "./constant";
import tooltip from "../global/tooltip";

let ExcelPlaceholder = {
    "[tabName]": "&A",
    "[CurrentDate]": "&D",
    "[fileName]": "&F",
    "[background]": "&G",
    "[Shadow]": "&H",
    "[TotalPages]": "&N",
    "[pageNumber]": "&P",
    "[CurrentTime]": "&T",
    "[filePath]": "&Z",
};

// Get the pixel value per millimeter
function getOneMmsPx() {
    let div = document.createElement("div");
    div.style.width = "1mm";
    document.querySelector("body").appendChild(div);
    let mm1 = div.getBoundingClientRect();
    let w = mm1.width;
    $(div).remove();
    return mm1.width;
}

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

export const luckysheetPrint = {
    selectArea: "0",
    direction: "0",
    size: "1",
    createDialog: function() {
        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-print").remove();

        const _locale = locale();
        const locale_print = _locale.print;
        const locale_button = _locale.button;

        let content = `<div class="luckysheet-print-content">
                <p class="luckysheet-print-suggest">${locale_print.suggest}</p>
                <p class="luckysheet-print-title">${locale_print.range}</p>
                <select class="luckysheet-print-select-area">
                    <option value="0" selected="selected">${locale_print.current}</option>
                    <option value="1">${locale_print.area}</option>
                </select>
                <p class="luckysheet-print-title">${locale_print.size}</p>
                <select class="luckysheet-print-size">
                    <option value="0">A3(29.7cm×42.0cm)</option>
                    <option value="1" selected="selected">A4(21.0cm×29.7cm)</option>
                    <option value="2">A5(214.8cm×21.0cm)</option>
                    <option value="3">B4(25.0cm×35.3cm)</option>
                    <option value="4">B5(17.6cm×25.0cm)</option>
                    <option value="5">${locale_print.letter}(21.6cm×27.9cm)</option>
                    <option value="6">${locale_print.paper}(27.9cm×43.2cm)</option>
                    <option value="7">${locale_print.law}(21.6cm×35.6cm)</option>
                    <option value="8">${locale_print.admin}(18.4cm×26.7cm)</option>
                </select>
                <p class="luckysheet-print-title">${locale_print.direction}</p>
                <div class="luckysheet-print-radio">
                    <div><input value="0" name="print" type="radio" id="horizontal" checked/><label for="horizontal">${locale_print.horizontal}</label></div>
                    <div><input value="1" name="print" type="radio" id="vertical"/><label for="vertical">${locale_print.vertical}</label></div>
                </div>
        </div>`;

        $("body").append(
            replaceHtml(modelHTML, {
                id: "luckysheet-print",
                addclass: "luckysheet-print",
                title: locale_print.title,
                content: content,
                botton: `<button class="btn btn-default luckysheet-model-confirm-btn">${locale_button.confirm}</button><button class="btn btn-default luckysheet-model-close-btn">${locale_button.close}</button>`,
                style: "z-index:100003",
                close: locale_button.close,
            }),
        );
        let $t = $("#luckysheet-print")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 350)
                .end(),
            myh = $t.outerHeight(),
            myw = $t.outerWidth();
        let winw = $(window).width(),
            winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(),
            scrollTop = $(document).scrollTop();
        $("#luckysheet-print")
            .css({ left: (winw + scrollLeft - myw) / 2, top: (winh + scrollTop - myh) / 3 })
            .show();
    },
    init: function() {
        let _this = this;
        this.selectArea = "0";
        this.direction = "0";
        this.size = "1";

        $(document)
            .off("change.printArea")
            .on("change.printArea", ".luckysheet-print-select-area", function(e) {
                _this.selectArea = e.currentTarget.value;
            });

        $(document)
            .off("change.printSize")
            .on("change.printSize", ".luckysheet-print-size", function(e) {
                _this.size = e.currentTarget.value;
            });

        $(document)
            .off("change.printInput")
            .on("change.printInput", ".luckysheet-print-radio input", function(e) {
                _this.direction = e.currentTarget.value;
            });

        $(document)
            .off("click.printConfirm")
            .on("click.printConfirm", ".luckysheet-print .luckysheet-model-confirm-btn", function() {
                $("#luckysheet-print").hide();
                window.print();
            });

        window.onbeforeprint = (event) => {
            const _locale = locale();
            const locale_screenshot = _locale.screenshot;
            const sheetInfo = Store.luckysheetfile.find((item) => item.index === Store.currentSheetIndex);
            const images = sheetInfo.images;

            let saveRange;
            if (Store.luckysheet_select_save.length === 0 || this.selectArea === "0") {
                saveRange = {
                    row: [0, sheetInfo.row - 1],
                    column: [0, sheetInfo.column - 1],
                };
            } else if (Store.luckysheet_select_save.length === 1) {
                saveRange = {
                    row: Store.luckysheet_select_save[0].row,
                    column: Store.luckysheet_select_save[0].column,
                };
            } else {
                saveRange = {
                    row: Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1].row,
                    column: Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1].column,
                };
            }

            //截图范围内包含部分合并单元格，提示
            if (Store.config["merge"] != null) {
                let has_PartMC = false;

                let r1 = saveRange.row[0],
                    r2 = saveRange.row[1];
                let c1 = saveRange.column[0],
                    c2 = saveRange.column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if (has_PartMC) {
                    if (isEditMode()) {
                        alert(locale_screenshot.screenshotTipHasMerge);
                    } else {
                        tooltip.info(locale_screenshot.screenshotTipTitle, locale_screenshot.screenshotTipHasMerge);
                    }
                    return;
                }
            }

            let st_r = saveRange.row[0],
                ed_r = saveRange.row[1];
            let st_c = saveRange.column[0],
                ed_c = saveRange.column[1];

            let scrollHeight, rh_height;
            if (st_r - 1 < 0) {
                scrollHeight = 0;
                rh_height = Store.visibledatarow[ed_r];
            } else {
                scrollHeight = Store.visibledatarow[st_r - 1];
                rh_height = Store.visibledatarow[ed_r] - Store.visibledatarow[st_r - 1];
            }

            let scrollWidth, ch_width;
            if (st_c - 1 < 0) {
                scrollWidth = 0;
                ch_width = Store.visibledatacolumn[ed_c];
            } else {
                scrollWidth = Store.visibledatacolumn[st_c - 1];
                ch_width = Store.visibledatacolumn[ed_c] - Store.visibledatacolumn[st_c - 1];
            }

            let newCanvas = $("<canvas>")
                .attr({
                    width: Math.ceil(ch_width * Store.devicePixelRatio),
                    height: Math.ceil(rh_height * Store.devicePixelRatio),
                })
                .css({ width: ch_width, height: rh_height });

            luckysheetDrawMain(scrollWidth, scrollHeight, ch_width, rh_height, 1, 1, null, null, newCanvas);
            const canvas = newCanvas.get(0);
            canvas.id = "luckysheet-print-canvas";
            // canvas.style.margin = "0 auto";
            // canvas.style.display = "block";
            let ctx_newCanvas = newCanvas.get(0).getContext("2d");

            //补上 左边框和上边框
            ctx_newCanvas.beginPath();
            ctx_newCanvas.moveTo(0, 0);
            ctx_newCanvas.lineTo(0, Store.devicePixelRatio * rh_height);
            ctx_newCanvas.lineWidth = Store.devicePixelRatio * 2;
            ctx_newCanvas.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            ctx_newCanvas.stroke();
            ctx_newCanvas.closePath();

            ctx_newCanvas.beginPath();
            ctx_newCanvas.moveTo(0, 0);
            ctx_newCanvas.lineTo(Store.devicePixelRatio * ch_width, 0);
            ctx_newCanvas.lineWidth = Store.devicePixelRatio * 2;
            ctx_newCanvas.strokeStyle = luckysheetdefaultstyle.strokeStyle;
            ctx_newCanvas.stroke();
            ctx_newCanvas.closePath();

            document.body.appendChild(canvas);
        };
        window.onafterprint = (event) => {
            const canvas = document.getElementById("luckysheet-print-canvas");
            document.body.removeChild(canvas);
        };
    },
};
