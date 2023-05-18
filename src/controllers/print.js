import luckysheetConfigsetting from "./luckysheetConfigsetting";
import Store from "../store";
import locale from "../locale/locale";
import { replaceHtml } from "../utils/util";
import { modelHTML } from "./constant";
import { luckysheetDrawMain } from "../global/draw";
import { luckysheetdefaultstyle } from "./constant";

// export function viewChange(curType, preType) {
//     let currentSheet = sheetmanage.getSheetByIndex();

//     if (currentSheet.config == null) {
//         currentSheet.config = {};
//     }

//     if (currentSheet.config.sheetViewZoom == null) {
//         currentSheet.config.sheetViewZoom = {};
//     }

//     let defaultZoom = 1,
//         type = "zoomScaleNormal";
//     printLineAndNumberDelete(currentSheet);
//     if (curType == "viewNormal") {
//         type = "viewNormalZoomScale";
//     } else if (curType == "viewLayout") {
//         type = "viewLayoutZoomScale";
//     } else if (curType == "viewPage") {
//         type = "viewPageZoomScale";
//         defaultZoom = 0.6;
//         printLineAndNumberCreate(currentSheet);
//     }

//     let curZoom = currentSheet.config.sheetViewZoom[type];
//     if (curZoom == null) {
//         curZoom = defaultZoom;
//     }

//     currentSheet.config.curentsheetView = curType;

//     if (Store.clearjfundo) {
//         Store.jfredo.push({
//             type: "viewChange",
//             curType: curType,
//             preType: preType,
//             sheetIndex: Store.currentSheetIndex,
//         });
//     }

//     // Store.zoomRatio = curZoom;
//     // server.saveParam("all", Store.currentSheetIndex, curZoom, { "k": "zoomRatio" });
//     server.saveParam("cg", Store.currentSheetIndex, curType, { k: "curentsheetView" });

//     Store.currentSheetView = curType;

//     zoomChange(curZoom);
// }

// function printLineAndNumberDelete(sheet) {}

// function printLineAndNumberCreate(sheet) {}

// function switchViewBtn($t) {
//     let $viewList = $t.parent(),
//         preType = $viewList.find("luckysheet-print-viewBtn-active").attr("type");
//     if ($t.attr("type") == preType) {
//         return;
//     }

//     let curType = $t.attr("type");
//     if (curType != null) {
//         viewChange(curType, preType);
//     } else {
//         return;
//     }

//     $t.parent()
//         .find(".luckysheet-print-viewBtn")
//         .removeClass("luckysheet-print-viewBtn-active");
//     $t.addClass("luckysheet-print-viewBtn-active");
// }

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
    sizeList: [
        [29.7, 42.0],
        [21.0, 29.7],
        [14.8, 21.0],
        [25.0, 35.3],
        [17.6, 25.0],
        [21.6, 27.9],
        [27.9, 43.2],
        [21.6, 35.6],
        [18.4, 26.7],
    ],
    padding: [20, 20, 20, 20],
    saveRange: null,
    canvasList: [],
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
                    <option value="2">A5(14.8cm×21.0cm)</option>
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
                Promise.all(_this.printBefore()).then((res) => {
                    _this.canvasList = res;
                    window.print();
                });
            });

        window.onbeforeprint = (event) => {
            let st_r = this.saveRange.row[0],
                ed_r = this.saveRange.row[1];
            let st_c = this.saveRange.column[0],
                ed_c = this.saveRange.column[1];
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

            this.drawCanvas(ch_width, rh_height, scrollWidth, scrollHeight);
        };
        window.onafterprint = (event) => {
            const container = document.querySelector(".luckysheet-print-preview");
            container.remove();
        };
    },
    printBefore() {
        const promises = [];
        const sheetInfo = Store.luckysheetfile.find((item) => item.index == Store.currentSheetIndex);
        const images = sheetInfo.images;

        let saveRange;
        if (Store.luckysheet_select_save.length === 0 || this.selectArea === "0") {
            const column = Store.flowdata[0].length - 1;
            const row = Store.flowdata.length - 1;
            saveRange = {
                row: [0, row],
                column: [0, column],
                left_move: 0,
                top_move: 0,
                width_move: sheetInfo.ch_width,
                height_move: sheetInfo.rh_height,
            };
        } else if (Store.luckysheet_select_save.length === 1) {
            saveRange = Store.luckysheet_select_save[0];
        } else {
            saveRange = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        }
        this.saveRange = saveRange;

        for (let k in images) {
            const item = images[k];
            const img = new Image();
            img.src = item.src;
            img.width = item.originWidth;
            img.height = item.originHeight;
            const canvas = document.createElement("canvas");
            canvas.width = item.default.width;
            canvas.height = item.default.height;
            const ctx = canvas.getContext("2d");

            promises.push(
                new Promise((resolve, reject) => {
                    img.onload = () => {
                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                        resolve({
                            key: k,
                            canvas,
                        });
                    };
                }),
            );
        }
        return promises;
    },
    handleImage(ctx, img) {
        const sheetInfo = Store.luckysheetfile.find((item) => item.index === Store.currentSheetIndex);
        const image = sheetInfo.images[img.key];
        const imageInfo = {
            top: image.default.top,
            bottom: image.default.top + image.default.height,
            left: image.default.left,
            right: image.default.left + image.default.width,
        };
        const rangeInfo = {
            top: this.saveRange.top_move,
            bottom: this.saveRange.top_move + this.saveRange.height_move,
            left: this.saveRange.left_move,
            right: this.saveRange.left_move + this.saveRange.width_move,
        };

        if (
            imageInfo.bottom < rangeInfo.top ||
            imageInfo.right < rangeInfo.left ||
            imageInfo.left > rangeInfo.right ||
            imageInfo.top > rangeInfo.bottom
        ) {
            return;
        }

        let left, right, top, bottom;

        left = Math.max(imageInfo.left, rangeInfo.left);
        top = Math.max(imageInfo.top, rangeInfo.top);
        right = Math.min(imageInfo.right, rangeInfo.right);
        bottom = Math.min(imageInfo.bottom, rangeInfo.bottom);

        ctx.drawImage(
            img.canvas,
            left - imageInfo.left,
            top - imageInfo.top,
            img.canvas.width - left + imageInfo.left,
            img.canvas.height - top + imageInfo.top,
            left - rangeInfo.left,
            top - rangeInfo.top,
            img.canvas.width - left + imageInfo.left,
            img.canvas.height - top + imageInfo.top,
        );
    },
    handleChart(ctx) {
        const sheetInfo = Store.luckysheetfile.find((item) => item.index === Store.currentSheetIndex);
        const charts = sheetInfo.chart ?? [];
        if (!charts.length) return;

        const rangeInfo = {
            top: this.saveRange.top_move,
            bottom: this.saveRange.top_move + this.saveRange.height_move,
            left: this.saveRange.left_move,
            right: this.saveRange.left_move + this.saveRange.width_move,
        };

        for (let i = 0; i < charts.length; i++) {
            const chart = charts[i];
            const chartInfo = {
                top: chart.top,
                bottom: chart.top + chart.height,
                left: chart.left,
                right: chart.left + chart.width,
            };

            if (
                chartInfo.bottom < rangeInfo.top ||
                chartInfo.right < rangeInfo.left ||
                chartInfo.left > rangeInfo.right ||
                chartInfo.top > rangeInfo.bottom
            ) {
                continue;
            }

            const canvas = document.getElementById(chart.chart_id).querySelector("canvas");
            if (!canvas) continue;

            let left, right, top, bottom;
            left = Math.max(chartInfo.left, rangeInfo.left);
            top = Math.max(chartInfo.top, rangeInfo.top);
            right = Math.min(chartInfo.right, rangeInfo.right);
            bottom = Math.min(chartInfo.bottom, rangeInfo.bottom);

            ctx.drawImage(
                canvas,
                left - chartInfo.left,
                top - chartInfo.top,
                canvas.width - left + chartInfo.left,
                canvas.height - top + chartInfo.top,
                left - rangeInfo.left,
                top - rangeInfo.top,
                canvas.width - left + chartInfo.left,
                canvas.height - top + chartInfo.top,
            );
        }
    },
    drawCanvas(ch_width, rh_height, scrollWidth, scrollHeight) {
        let _this = this;
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
        _this.canvasList.forEach((item) => {
            _this.handleImage(ctx_newCanvas, item);
        });
        _this.handleChart(ctx_newCanvas);
        _this.breakPage(canvas);
    },
    breakPage(sourceCanvas) {
        let _this = this;
        const dpi = Store.devicePixelRatio * 96;

        // dom宽高
        const bodyWidth = (_this.sizeList[_this.size][_this.direction === "0" ? 1 : 0] * dpi) / 2.54 - 100;
        const bodyHeight = (_this.sizeList[_this.size][_this.direction === "0" ? 0 : 1] * dpi) / 2.54 - 150;

        // canvas宽高
        const canvasWidth = bodyWidth - _this.padding[1] - _this.padding[3];
        const canvasHeight = bodyHeight - _this.padding[0] - _this.padding[2];

        let visibledatacolumn, visibledatarow;
        if (_this.selectArea == "0") {
            visibledatacolumn = [0, ...Store.visibledatacolumn];
            visibledatarow = [0, ...Store.visibledatarow];
        } else {
            const columnIndex = _this.saveRange.column[0];
            const columnLastIndex = _this.saveRange.column[1] + 1;
            visibledatacolumn = [0];
            let columnDiff = columnIndex > 0 ? Store.visibledatacolumn[columnIndex - 1] : 0;
            for (let i = columnIndex; i < columnLastIndex; i++) {
                visibledatacolumn.push(Store.visibledatacolumn[i] - columnDiff);
            }

            const rowIndex = _this.saveRange.row[0];
            const rowLastIndex = _this.saveRange.row[1] + 1;
            visibledatarow = [0];
            let rowDiff = rowIndex > 0 ? Store.visibledatarow[rowIndex - 1] : 0;
            for (let i = rowIndex; i < rowLastIndex; i++) {
                visibledatarow.push(Store.visibledatarow[i] - rowDiff);
            }
        }

        const widthArr = this.findValue(0, visibledatacolumn.length - 1, canvasWidth, visibledatacolumn);
        widthArr.unshift(0);

        const widthIndex = visibledatacolumn.findIndex((item) => item === widthArr[widthArr.length - 1]);
        if (widthIndex !== visibledatacolumn.length - 1) {
            widthArr.push(visibledatacolumn[visibledatacolumn.length - 1]);
        }

        const heightArr = this.findValue(0, visibledatarow.length - 1, canvasHeight, visibledatarow);
        heightArr.unshift(0);

        const heightIndex = visibledatarow.findIndex((item) => item === heightArr[heightArr.length - 1]);
        if (heightIndex !== visibledatarow.length - 1) {
            heightArr.push(visibledatarow[visibledatarow.length - 1]);
        }

        const container = document.createElement("div");
        container.className = "luckysheet-print-preview";
        document.body.appendChild(container);

        for (let i = 0; i < heightArr.length; i++) {
            if (i == 0) continue;
            let height = heightArr[i] - heightArr[i - 1];
            for (let j = 0; j < widthArr.length; j++) {
                if (j == 0) continue;
                width = widthArr[j] - widthArr[j - 1];
                const breakDom = document.createElement("div");
                breakDom.className = "luckysheet-print-break";
                const box = document.createElement("div");
                box.className = "luckysheet-print-box";
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.style.margin = `${_this.padding[0]}px auto`;
                const contentCtx = canvas.getContext("2d");
                contentCtx.drawImage(
                    sourceCanvas,
                    widthArr[j - 1],
                    heightArr[i - 1],
                    width,
                    height,
                    0,
                    0,
                    width,
                    height,
                );
                this.drawLine(contentCtx, 0, 0, Store.devicePixelRatio * width, 0);
                this.drawLine(contentCtx, width, 0, width, Store.devicePixelRatio * height);
                this.drawLine(contentCtx, 0, height, width, Store.devicePixelRatio * height);
                this.drawLine(contentCtx, 0, 0, 0, Store.devicePixelRatio * height);

                box.appendChild(canvas);
                container.appendChild(box);
                container.appendChild(breakDom);
            }
            if (i === heightArr.length - 1) {
                const last = document.querySelectorAll(".luckysheet-print-break");
                last[last.length - 1].remove();
            }
        }
    },
    findValue(index, count, number, list) {
        let value = [];
        const stValue = list[index];
        for (let i = index; i < count; i++) {
            if (list[i] - stValue > number) {
                value = this.findValue(i, count, number, list);
                value.unshift(list[i - 1]);
                break;
            }
        }
        return value;
    },
    drawLine(ctx, sx, sy, ex, ey) {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.lineWidth = Store.devicePixelRatio * 2;
        ctx.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        ctx.stroke();
        ctx.closePath();
    },
};
