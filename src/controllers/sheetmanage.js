import { isEditMode } from "../global/validate";
import cleargridelement from "../global/cleargridelement";
import { getdatabyselectionD, getcellvalue, datagridgrowth, getcellFormula } from "../global/getdata";
import { setcellvalue } from "../global/setdata";
import luckysheetcreatedom from "../global/createdom";
import tooltip from "../global/tooltip";
import formula from "../global/formula";
import { luckysheetrefreshgrid, jfrefreshgrid_rhcw,jfrefreshgrid } from "../global/refresh";
import rhchInit from "../global/rhchInit";
import editor from "../global/editor";
import { luckysheetextendtable, luckysheetdeletetable } from "../global/extend";
import { isRealNum } from "../global/validate";
import { replaceHtml, getObjType, chatatABC, arrayRemoveItem } from "../utils/util";
import { sheetHTML, luckysheetlodingHTML } from "./constant";
import server from "./server";
import luckysheetConfigsetting from "./luckysheetConfigsetting";
import pivotTable from "./pivotTable";
import luckysheetsizeauto from "./resize";
import luckysheetPostil from "./postil";
import imageCtrl from "./imageCtrl";
import dataVerificationCtrl from "./dataVerificationCtrl";
import hyperlinkCtrl from "./hyperlinkCtrl";
import luckysheetFreezen from "./freezen";
import { createFilterOptions, labelFilterOptionState } from "./filter";
import { selectHightlightShow, selectionCopyShow } from "./select";
import Store from "../store";
import locale from "../locale/locale";
import { renderChartShow } from "../expendPlugins/chart/plugin";
import { changeSheetContainerSize, menuToolBarWidth } from "./resize";
import { zoomNumberDomBind } from "./zoom";
import menuButton from "./menuButton";
import method from "../global/method";
import { initialEvent } from "./protection";
import luckysheetformula from "../global/formula";

const sheetmanage = {
    generateRandomSheetIndex: function(prefix) {
        if (prefix == null) {
            prefix = "Sheet";
        }

        let userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, "").split("");

        let mid = "";

        for (let i = 0; i < 12; i++) {
            mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
        }

        let time = new Date().getTime();

        return prefix + "_" + mid + "_" + time;
    },
    generateRandomSheetName: function(file, isPivotTable) {
        let index = file.length;

        const locale_pivotTable = locale().pivotTable;
        const title = locale_pivotTable.title;

        for (let i = 0; i < file.length; i++) {
            if (file[i].name.indexOf("Sheet") > -1 || file[i].name.indexOf(title) > -1) {
                let suffix = parseFloat(file[i].name.replace("Sheet", "").replace(title, ""));

                if (suffix != "NaN" && Math.ceil(suffix) > index) {
                    index = Math.ceil(suffix);
                }
            }
        }

        if (isPivotTable) {
            return title + (index + 1);
        } else {
            return "Sheet" + (index + 1);
        }
    },
    generateCopySheetName: function(file, name) {
        let _locale = locale();
        let locale_info = _locale.info;
        let copyWord = "(" + locale_info.copy;
        const copy_i = name.toString().indexOf(copyWord);

        if (~copy_i) {
            name = name.toString().substring(0, copy_i);
        }

        let index = "";
        let nameCopy = name + copyWord;
        const sheetNames = [];

        for (let i = 0; i < file.length; i++) {
            let fileName = file[i].name.toString();
            sheetNames.push(fileName);
            let st_i = fileName.indexOf(nameCopy);

            if (st_i === 0) {
                index = index || 2;
                let ed_i = fileName.indexOf(")", st_i + nameCopy.length);
                let num = fileName.substring(st_i + nameCopy.length, ed_i);

                if (isRealNum(num)) {
                    if (parseInt(num) >= index) {
                        index = parseInt(num) + 1;
                    }
                }
            }
        }

        let sheetCopyName;

        do {
            let postfix = copyWord + index + ")";

            const lengthLimit = 31 - postfix.length;
            sheetCopyName = name;
            if (sheetCopyName.length > lengthLimit) {
                sheetCopyName = sheetCopyName.slice(0, lengthLimit - 1) + "…";
            }

            sheetCopyName = sheetCopyName + postfix;
        } while (~sheetNames.indexOf(sheetCopyName) && (index = (index || 1) + 1));

        return sheetCopyName;
    },
    getSheetByIndex: function(index) {
        let _this = this;

        if (index == null) {
            index = Store.currentSheetIndex;
        }

        let i = _this.getSheetIndex(index);

        return Store.luckysheetfile[i];
    },
    getSheetByName: function(name) {
        let _this = this;

        if (name == null) {
            return null;
        }

        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            let file = Store.luckysheetfile[i];
            if (file.name == name) {
                return file;
            }
        }

        return null;
    },
    getCurSheetnoset: function() {
        let curindex = 0;

        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (Store.luckysheetfile[i].status == 1) {
                curindex = Store.luckysheetfile[i].index;
                break;
            }
        }

        return curindex;
    },
    getCurSheet: function() {
        if (Store.luckysheetfile.length) {
            let hasActive = false,
                indexs = [];
            Store.luckysheetfile.forEach((item) => {
                if ("undefined" === typeof item.index) {
                    item.index = this.generateRandomSheetIndex();
                }
                if (indexs.includes(item.index)) {
                    item.index = this.generateRandomSheetIndex();
                } else {
                    indexs.push(item.index);
                }

                if ("undefined" === typeof item.status) {
                    item.status = 0;
                }
                if (item.status == 1) {
                    if (hasActive) {
                        item.status = 0;
                    } else {
                        hasActive = true;
                    }
                }
            });
            if (!hasActive) {
                Store.luckysheetfile[0].status = 1;
            }
        }
        Store.currentSheetIndex = Store.luckysheetfile[0].index;

        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (Store.luckysheetfile[i].status == 1) {
                Store.currentSheetIndex = Store.luckysheetfile[i].index;
                break;
            }
        }

        return Store.currentSheetIndex;
    },
    getCustomSheet() {
        //设置自定义luckysheet 配置项。
        if (!this.Luckysheet_custom_sheet) return {};
        return JSON.parse(JSON.stringify(this.Luckysheet_custom_sheet)); //每次都返回一个自定义sheet新对象
    },
    setCustomSheet(luckysheet_custom_sheet) {
        this.Luckysheet_custom_sheet = luckysheet_custom_sheet;
    },
    addNewSheet: function(e, isPivotTable) {
        if (isEditMode() || Store.allowEdit === false) {
            // alert("非编辑模式下不允许该操作！");
            return;
        }
        // 钩子 sheetCreateBefore
        if (!method.createHookFunction("sheetCreateBefore")) {
            return;
        }

        let _this = this;

        let order = Store.luckysheetfile.length;
        let index = _this.generateRandomSheetIndex();

        let sheetname = _this.generateRandomSheetName(Store.luckysheetfile, isPivotTable);

        $("#luckysheet-sheet-container-c").append(
            replaceHtml(sheetHTML, { index: index, active: "", name: sheetname, style: "", colorset: "" }),
        );

        let sheetconfig = {};
        let sheet_defaullt_config = this.getCustomSheet();
        if (
            JSON.stringify(sheet_defaullt_config) != "{}" &&
            sheet_defaullt_config != null &&
            sheetconfig != undefined
        ) {
            //判断设置的自定义sheet
            sheetconfig = sheet_defaullt_config;
            // sheet_defaullt_config.isPivotTable=false;
            sheetconfig.index = index;
            sheetconfig.order = order;
            sheetconfig.name = sheetname;
            // sheet_defaullt_config.config={};
        } else {
            //自定义sheet为空的话
            sheetconfig = {
                name: sheetname,
                color: "",
                status: "0",
                order: order,
                index: index,
                celldata: [],
                row: Store.defaultrowNum,
                column: Store.defaultcolumnNum,
                config: {},
                pivotTable: null,
                isPivotTable: !!isPivotTable,
            };
        }
        Store.luckysheetfile.push(sheetconfig);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append(
            '<div id="luckysheet-datavisual-selection-set-' +
                index +
                '" class="luckysheet-datavisual-selection-set"></div>',
        );
        cleargridelement(e);

        server.saveParam("sha", null, $.extend(true, {}, sheetconfig));

        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            let redo = {};
            redo["type"] = "addSheet";
            redo["sheetconfig"] = $.extend(true, {}, sheetconfig);
            redo["index"] = index;
            redo["currentSheetIndex"] = Store.currentSheetIndex;
            Store.jfredo.push(redo);
        }

        _this.changeSheetExec(index, isPivotTable, true);

        // 钩子 sheetCreateAfter 不应该在这里 应在绘制完成后 因此在 changeSheet 实现
    },
    setSheetHide: function(index, isDelete) {
        let _this = this;
        let currentIdx = _this.getSheetIndex(index);
        // 钩子 sheetHideBefore
        if (!isDelete && !method.createHookFunction("sheetHideBefore", { sheet: Store.luckysheetfile[currentIdx] })) {
            return;
        }
        Store.luckysheetfile[currentIdx].hide = 1;

        let luckysheetcurrentSheetitem = $("#luckysheet-sheets-item" + index);
        luckysheetcurrentSheetitem.hide();

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");

        let indicator;
        if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
            indicator = luckysheetcurrentSheetitem.nextAll(":visible");
            if (luckysheetcurrentSheetitem.nextAll(":visible").length > 0) {
                indicator = indicator.eq(0).data("index");
            } else {
                indicator = luckysheetcurrentSheetitem
                    .prevAll(":visible")
                    .eq(0)
                    .data("index");
            }
        } else {
            let nextActiveIdx,
                showSheetIdxs = [];
            Store.luckysheetfile.forEach((ele, index) => {
                if (1 !== ele.hide) showSheetIdxs.push(index);
            });
            let len = showSheetIdxs.length;
            if (1 === len) {
                nextActiveIdx = showSheetIdxs[0];
            } else {
                nextActiveIdx =
                    showSheetIdxs[len - 1] > currentIdx
                        ? showSheetIdxs.find((e) => e > currentIdx)
                        : showSheetIdxs[len - 1];
            }

            indicator = Store.luckysheetfile[nextActiveIdx].index;
        }

        $("#luckysheet-sheets-item" + indicator).addClass("luckysheet-sheets-item-active");

        _this.changeSheetExec(indicator);
        _this.locationSheet();

        server.saveParam("sh", luckysheetcurrentSheetitem.data("index"), 1, { op: "hide", cur: indicator });
        // 钩子 sheetHideAfter
        if (!isDelete) {
            method.createHookFunction("sheetHideAfter", { sheet: Store.luckysheetfile[currentIdx] });
        }
    },
    setSheetShow: function(index) {
        let _this = this;
        const file = Store.luckysheetfile[_this.getSheetIndex(index)];
        // 钩子 sheetShowBefore
        if (!method.createHookFunction("sheetShowBefore", { sheet: file })) {
            return;
        }
        file.hide = 0;
        _this.changeSheetExec(index);

        server.saveParam("sh", index, 0, { op: "show", cur: null });
        // 钩子 sheetShowAfter
        method.createHookFunction("sheetShowAfter", { sheet: file });
    },
    sheetMaxIndex: 0,
    ordersheet: function(property) {
        return function(a, b) {
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        };
    },
    getCurrentOrder: function() {
        let orders = {};

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").each(function(a) {
            let index = $(this).data("index");

            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i].index == index) {
                    orders[index.toString()] = a;
                    break;
                }
            }
        });

        return orders;
    },
    reOrderAllSheet: function() {
        let orders = {};

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").each(function(a) {
            let index = $(this).data("index");

            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i].index == index) {
                    Store.luckysheetfile[i].order = a;
                    orders[index.toString()] = a;
                    break;
                }
            }
        });

        server.saveParam("shr", null, orders);

        Store.luckysheetfile.sort((x, y) => {
            let order_x = x.order;
            let order_y = y.order;

            if (order_x != null && order_y != null) {
                return order_x - order_y;
            } else if (order_x != null) {
                return -1;
            } else if (order_y != null) {
                return 1;
            } else {
                return 1;
            }
        });
    },
    createSheet: function() {
        //修复拖动sheet更新后台后，重新打开显示错误
        let _this = this;

        let btn = [];
        Store.luckysheetfile.sort(_this.ordersheet("order"));

        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            let display = "";
            let sheetIndex = Store.luckysheetfile[i].index;

            let colorset = "";
            if (Store.luckysheetfile[i].color != null) {
                colorset =
                    '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' +
                    Store.luckysheetfile[i].color +
                    ';"></div>';
            }

            if (Store.currentSheetIndex == sheetIndex) {
                //使用Store.luckysheetfile中的index比较，而不是order
                btn.push(
                    replaceHtml(sheetHTML, {
                        index: sheetIndex,
                        active: "luckysheet-sheets-item-active",
                        name: Store.luckysheetfile[i].name,
                        style: "",
                        colorset: colorset,
                    }),
                );
            } else {
                if (Store.luckysheetfile[i].hide == 1) {
                    btn.push(
                        replaceHtml(sheetHTML, {
                            index: sheetIndex,
                            active: "",
                            name: Store.luckysheetfile[i].name,
                            style: "display:none;",
                            colorset: colorset,
                        }),
                    );
                } else {
                    btn.push(
                        replaceHtml(sheetHTML, {
                            index: sheetIndex,
                            active: "",
                            name: Store.luckysheetfile[i].name,
                            style: "",
                            colorset: colorset,
                        }),
                    );
                }
                display = "style='display:none;'";
            }
            //Store.luckysheetfile[i].index = i; //index即为默认
            // if(sheetIndex > this.sheetMaxIndex){
            //     this.sheetMaxIndex = sheetIndex;
            // }

            $("#luckysheet-cell-main").append(
                "<div " +
                    display +
                    ' id="luckysheet-datavisual-selection-set-' +
                    sheetIndex +
                    '" class="luckysheet-datavisual-selection-set"></div>',
            );
        }

        $("#luckysheet-sheet-container-c").append(btn.join(""));

        _this.locationSheet();
    },
    // *控制sheet栏的左右滚动按钮是否显示
    locationSheet: function() {
        let $c = $("#luckysheet-sheet-container-c"),
            winW = $("#" + Store.container).width();
        let $cursheet = $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item-active").eq(0);

        let scrollLeftpx = 0;
        let c_width = 0;

        $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible").each(function() {
            if ($(this).hasClass("luckysheet-sheets-item-active")) {
                scrollLeftpx = c_width;
            }
            c_width += $(this).outerWidth();
        });

        setTimeout(function() {
            $c.scrollLeft(scrollLeftpx - 10);

            if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
                if (c_width >= winW * 0.7) {
                    $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
                    $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
                } else {
                    $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "none");
                    $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
                }
            }
        }, 1);
    },
    copySheet: function(copyindex, e) {
        if (isEditMode() || Store.allowEdit === false) {
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        let _this = this;

        let order = Store.luckysheetfile.length;
        let index = _this.generateRandomSheetIndex();

        let copyarrindex = _this.getSheetIndex(copyindex);
        let copyjson = $.extend(true, {}, Store.luckysheetfile[copyarrindex]);
        copyjson.order = order;
        copyjson.index = index;
        copyjson.name = _this.generateCopySheetName(Store.luckysheetfile, copyjson.name);

        // 钩子 sheetCreateBefore
        if (
            !method.createHookFunction("sheetCopyBefore", {
                targetSheet: Store.luckysheetfile[copyarrindex],
                copySheet: copyjson,
            })
        ) {
            return;
        }

        let colorset = "";
        if (copyjson.color != null) {
            colorset =
                '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' +
                copyjson.color +
                ';"></div>';
        }

        let copyobject = $("#luckysheet-sheets-item" + copyindex);
        $("#luckysheet-sheet-container-c").append(
            replaceHtml(sheetHTML, {
                index: copyjson.index,
                active: "",
                name: copyjson.name,
                order: copyjson.order,
                style: "",
                colorset: colorset,
            }),
        );
        $("#luckysheet-sheets-item" + copyjson.index).insertAfter(copyobject);
        Store.luckysheetfile.splice(copyarrindex + 1, 0, copyjson);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append(
            '<div id="luckysheet-datavisual-selection-set-' +
                index +
                '" class="luckysheet-datavisual-selection-set"></div>',
        );
        cleargridelement(e);

        server.saveParam("shc", index, { copyindex: copyindex, name: copyjson.name });

        _this.changeSheetExec(index, undefined, undefined, true);
        _this.reOrderAllSheet();

        if (Store.clearjfundo) {
            Store.jfredo.push({
                type: "copySheet",
                copyindex: copyindex,
                index: copyjson.index,
                sheetIndex: copyjson.index,
            });
        } else if (Store.jfredo.length > 0) {
            let jfredostr = Store.jfredo[Store.jfredo.length - 1];

            if (jfredostr.type == "copySheet") {
                jfredostr.index = copyjson.index;
                jfredostr.sheetIndex = copyjson.index;
            }
        }
    },
    hasSheet: function(index) {
        if (index == null) {
            return false;
        }

        index = this.getSheetIndex(index);

        if (index == null) {
            return false;
        } else {
            return true;
        }
    },
    createSheetbydata: function(data, isrenew, isBefore = true) {
        let _this = this;

        let colorset = "";
        if (data.color != null) {
            colorset =
                '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' +
                data.color +
                ';"></div>';
        }

        $("#luckysheet-sheet-container-c").append(
            replaceHtml(sheetHTML, {
                index: data.index,
                active: "",
                name: data.name,
                order: data.order,
                style: "",
                colorset: colorset,
            }),
        );

        if (isBefore) {
            let previndex = data.order;
            if (previndex >= Store.luckysheetfile.length) {
                previndex = Store.luckysheetfile.length - 1;
                $("#luckysheet-sheets-item" + data.index).insertAfter(
                    $("#luckysheet-sheets-item" + Store.luckysheetfile[previndex].index),
                );
            } else {
                $("#luckysheet-sheets-item" + data.index).insertBefore(
                    $("#luckysheet-sheets-item" + Store.luckysheetfile[previndex].index),
                );
            }
        }

        Store.luckysheetfile.push(data);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + data.index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append(
            '<div id="luckysheet-datavisual-selection-set-' +
                data.index +
                '" class="luckysheet-datavisual-selection-set"></div>',
        );
        cleargridelement();

        if (isrenew != null) {
            server.saveParam("shre", null, { reIndex: data.index });
            data.hide = 0;
            server.saveParam("sh", data.index, 0, { op: "show", cur: null });
        } else {
            server.saveParam("sha", null, data);
        }

        _this.changeSheetExec(data.index, data.isPivotTable, true);
        _this.reOrderAllSheet();
    },
    deleteSheet: function(index) {
        let _this = this;

        if (Store.allowEdit === false) {
            return;
        }

        let arrIndex = _this.getSheetIndex(index);

        const file = Store.luckysheetfile[arrIndex];

        // 钩子 sheetDeleteBefore
        if (!method.createHookFunction("sheetDeleteBefore", { sheet: file })) {
            return;
        }

        _this.setSheetHide(index, true);

        $("#luckysheet-sheets-item" + index).remove();
        $("#luckysheet-datavisual-selection-set-" + index).remove();

        let removedsheet = Store.luckysheetfile.splice(arrIndex, 1);
        _this.reOrderAllSheet();

        server.saveParam("shd", null, { deleIndex: index });

        if (Store.clearjfundo) {
            removedsheet[0].type = "deleteSheet";
            Store.jfredo.push(removedsheet[0]);
        }
        // 钩子 sheetDeleteAfter
        method.createHookFunction("sheetDeleteAfter", { sheet: file });
    },
    nulldata: null,
    getGridData: function(d) {
        let ret = [];

        for (let r = 0; r < d.length; r++) {
            for (let c = 0; c < d[0].length; c++) {
                if (d[r][c] == null) {
                    continue;
                }

                ret.push({ r: r, c: c, v: d[r][c] });
            }
        }

        return ret;
    },
    buildGridData: function(file) {
        // 如果已经存在二维数据data,那么直接返回data；如果只有celldata，那么就转化成二维数组data，再返回
        let row = file.row == null ? Store.defaultrowNum : file.row,
            column = file.column == null ? Store.defaultcolumnNum : file.column,
            data = file.data && file.data.length > 0 ? file.data : datagridgrowth([], row, column),
            celldata = file.celldata;
        if (file.data && file.data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[0].length; j++) {
                    setcellvalue(i, j, data, data[i][j]);
                }
            }
        } else {
            if (celldata && celldata.length > 0) {
                for (let i = 0; i < celldata.length; i++) {
                    let item = celldata[i];
                    let r = item.r;
                    let c = item.c;
                    let v = item.v;

                    if (r >= data.length) {
                        data = datagridgrowth(data, r - data.length + 1, 0);
                    }
                    if (c >= data[0].length) {
                        data = datagridgrowth(data, 0, c - data[0].length + 1);
                    }
                    setcellvalue(r, c, data, v);
                }
            }
        }

        //亿万格式+精确度 恢复全局初始化
        luckysheetConfigsetting.autoFormatw = false;
        luckysheetConfigsetting.accuracy = undefined;
        return data;
    },
    cutGridData: function(d) {
        let rowindex = 0;

        for (let r = d.length - 1; r >= 0; r--) {
            let isnull = true;

            for (let c = 0; c < d[0].length; c++) {
                let value = getcellvalue(r, c);

                if (value != null && $.trim(value).length > 0) {
                    isnull = false;
                    break;
                }
            }

            if (!isnull) {
                break;
            } else {
                rowindex = r;
            }
        }

        return d.slice(0, rowindex);
    },
    addGridData: function(celldata, row, column) {
        let data = datagridgrowth([], row, column);

        if (celldata != null) {
            for (let i = 0; i < celldata.length; i++) {
                let item = celldata[i];
                let r = item.r;
                let c = item.c;
                let v = item.v;

                if (r >= data.length) {
                    data = datagridgrowth(data, r - data.length + 1, 0);
                }

                if (c >= data[0].length) {
                    data = datagridgrowth(data, 0, c - data[0].length + 1);
                }

                setcellvalue(r, c, data, v);
            }
        }

        return data;
    },
    sheetParamRestore: function(file, data) {
        Store.luckysheet_select_save = file["luckysheet_select_save"];
        if (Store.luckysheet_select_save == null || Store.luckysheet_select_save.length == 0) {
            if (data[0] != null && data[0][0] != null && data[0][0].mc != null) {
                Store.luckysheet_select_save = [
                    {
                        row: [0, data[0][0].mc.rs - 1],
                        column: [0, data[0][0].mc.cs - 1],
                    },
                ];
            } else {
                Store.luckysheet_select_save = [
                    {
                        row: [0, 0],
                        column: [0, 0],
                    },
                ];
            }
        }

        Store.luckysheet_selection_range =
            file["luckysheet_selection_range"] == null ? [] : file["luckysheet_selection_range"];
        Store.config = file["config"] == null ? {} : file["config"];

        Store.zoomRatio = file["zoomRatio"] == null ? 1 : file["zoomRatio"];

        if (file["defaultRowHeight"] != null) {
            Store.defaultrowlen = parseFloat(file["defaultRowHeight"]);
        } else {
            Store.defaultrowlen = luckysheetConfigsetting["defaultRowHeight"];
        }

        if (file["defaultColWidth"] != null) {
            Store.defaultcollen = parseFloat(file["defaultColWidth"]);
        } else {
            Store.defaultcollen = luckysheetConfigsetting["defaultColWidth"];
        }

        if (file["showGridLines"] != null) {
            let showGridLines = file["showGridLines"];
            if (showGridLines == 0 || showGridLines == false) {
                Store.showGridLines = false;
            } else {
                Store.showGridLines = true;
            }
        } else {
            Store.showGridLines = true;
        }
    },
    initialjfFile: function(menu, title) {
        let _this = this;

        _this.getCurSheet();
        let file = Store.luckysheetfile[_this.getSheetIndex(Store.currentSheetIndex)];
        _this.nulldata = datagridgrowth([], Store.defaultrowNum, Store.defaultcolumnNum);
        let data = _this.buildGridData(file);

        //初始化的时候 记录选区
        let select_save = [];
        file.jfgird_select_save = file.jfgird_select_save || [];
        file.jfgird_select_save.forEach((item) => select_save.push({ row: item.row, column: item.column }));
        file.luckysheet_select_save = select_save;

        this.sheetParamRestore(file, data);

        let r2 = Store.luckysheet_select_save[0].row[1],
            c2 = Store.luckysheet_select_save[0].column[1];

        if (Store.luckysheet_select_save.length > 1) {
            for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                if (Store.luckysheet_select_save[i].row[1] > r2) {
                    r2 = Store.luckysheet_select_save[i].row[1];
                }

                if (Store.luckysheet_select_save[i].column[1] > c2) {
                    c2 = Store.luckysheet_select_save[i].column[1];
                }
            }
        }

        menuButton.fontInitial(Store.fontList); //initial font

        file.data = data;

        let rowheight = data.length;
        if (r2 > rowheight - 1) {
            rowheight = r2 + 1;
        }

        let colwidth = data[0].length;
        if (c2 > colwidth - 1) {
            colwidth = c2 + 1;
        }

        //钩子函数 表格创建之前触发
        if (typeof luckysheetConfigsetting.beforeCreateDom == "function") {
            luckysheetConfigsetting.beforeCreateDom(luckysheet);
        }

        if (typeof luckysheetConfigsetting.workbookCreateBefore == "function") {
            luckysheetConfigsetting.workbookCreateBefore(luckysheet);
        }

        // Store.flowdata = data;

        luckysheetcreatedom(colwidth, rowheight, data, menu, title);

        setTimeout(function() {
            tooltip.createHoverTip(
                "#luckysheet_info_detail",
                ".luckysheet_info_detail_back, .luckysheet_info_detail_input, .luckysheet_info_detail_update",
            );
            tooltip.createHoverTip(
                "#luckysheet-wa-editor",
                ".luckysheet-toolbar-menu-button, .luckysheet-toolbar-button, .luckysheet-toolbar-combo-button",
            );

            Store.luckysheetTableContentHW = [
                $("#luckysheet-cell-main").width() + Store.rowHeaderWidth - Store.cellMainSrollBarSize,
                $("#luckysheet-cell-main").height() + Store.columnHeaderHeight - Store.cellMainSrollBarSize,
            ];
            $("#luckysheetTableContent, #luckysheetTableContentF")
                .attr({
                    width: Math.ceil(Store.luckysheetTableContentHW[0] * Store.devicePixelRatio),
                    height: Math.ceil(Store.luckysheetTableContentHW[1] * Store.devicePixelRatio),
                })
                .css({
                    width: Store.luckysheetTableContentHW[0],
                    height: Store.luckysheetTableContentHW[1],
                })
                .get(0)
                .getContext("2d");
            let locale_info = locale().info;
            let key = server.gridKey;
            let cahce_key = key + "__qkcache";

            let ini = function() {
                file["load"] = "1";

                _this.createSheet();

                let execF = function() {
                    _this.mergeCalculation(file["index"]);
                    _this.setSheetParam(false);
                    // editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
                    _this.storeSheetParam();
                    _this.restoreselect();
                    _this.CacheNotLoadControll = [];
                    _this.restoreCache();
                    formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                    _this.restoreSheetAll(Store.currentSheetIndex);

                    // luckysheetrefreshgrid(0, 0);
                    $("#luckysheet_info_detail_save").html(locale_info.detailSave);

                    if (!!file.isPivotTable) {
                        Store.luckysheetcurrentisPivotTable = true;
                        // pivotTable.changePivotTable(Store.currentSheetIndex); //此方法需要注释掉，在restoreSheetAll中已经执行了刷新了数据透视表，这里就不需要了
                    } else {
                        Store.luckysheetcurrentisPivotTable = false;
                        $("#luckysheet-modal-dialog-slider-pivot").hide();
                    }

                    // Store toolbar button width value
                    menuToolBarWidth();

                    luckysheetsizeauto();

                    //等待滚动条dom宽高加载完成后 初始化滚动位置
                    if (file["scrollLeft"] != null && file["scrollLeft"] > 0) {
                        $("#luckysheet-scrollbar-x").scrollLeft(file["scrollLeft"]);
                    } else {
                        $("#luckysheet-scrollbar-x").scrollLeft(0);
                    }

                    if (file["scrollTop"] != null && file["scrollTop"] > 0) {
                        $("#luckysheet-scrollbar-y").scrollTop(file["scrollTop"]);
                    } else {
                        $("#luckysheet-scrollbar-y").scrollTop(0);
                    }

                    // 此处已经渲染完成表格，应该挪到前面
                    // //钩子函数 表格创建之前触发
                    // if(typeof luckysheetConfigsetting.beforeCreateDom == "function" ){
                    //     luckysheetConfigsetting.beforeCreateDom(luckysheet);
                    // }

                    // if(typeof luckysheetConfigsetting.workbookCreateBefore == "function"){
                    //     luckysheetConfigsetting.workbookCreateBefore(luckysheet);
                    // }

                    arrayRemoveItem(Store.asyncLoad, "core");

                    if (luckysheetConfigsetting.pointEdit) {
                        setTimeout(function() {
                            Store.loadingObj.close();
                        }, 0);
                    } else {
                        setTimeout(function() {
                            Store.loadingObj.close();
                        }, 500);
                    }
                };

                let loadSheetUrl = server.loadSheetUrl;

                if (loadSheetUrl == "") {
                    //     execF();
                    // }
                    // else if(sheetindex.length>0 && loadSheetUrl == ""){
                    // for(let i = 0;i<Store.luckysheetfile.length;i++){
                    //     let otherfile = Store.luckysheetfile[i];
                    //     if(otherfile.index == file.index){
                    //         continue;
                    //     }
                    //     // let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
                    //     if(otherfile["load"] == null || otherfile["load"] == "0"){
                    //         otherfile["data"] = _this.buildGridData(otherfile);
                    //         otherfile["load"] = "1";
                    //     }
                    // }

                    _this.loadOtherFile(file);
                    execF();
                } else {
                    let sheetindexset = _this.checkLoadSheetIndex(file);
                    let sheetindex = [];

                    for (let i = 0; i < sheetindexset.length; i++) {
                        let item = sheetindexset[i];

                        if (item == file["index"]) {
                            continue;
                        }

                        sheetindex.push(item);
                    }

                    // No request is sent if it is not linked to other worksheets
                    if (sheetindex.length === 0) {
                        execF();
                        return;
                    }
                    $.post(loadSheetUrl, { gridKey: server.gridKey, index: sheetindex.join(",") }, function(d) {
                        let dataset = new Function("return " + d)();

                        for (let item in dataset) {
                            if (item == file["index"]) {
                                continue;
                            }

                            let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];

                            if (otherfile["load"] == null || otherfile["load"] == "0") {
                                otherfile.celldata = dataset[item.toString()];
                                otherfile["data"] = _this.buildGridData(otherfile);
                                otherfile["load"] = "1";
                            }
                        }

                        execF();
                    });
                }
            };

            try {
                localforage.getItem(cahce_key).then(function(readValue) {
                    if (readValue != null) {
                        _this.CacheNotLoadControll = readValue;
                    }
                    server.clearcachelocaldata(function() {
                        ini();
                    });
                });
            } catch (e) {
                ini();
                console.log("缓存操作失败");
            }
        }, 1);
    },
    storeSheetParam: function() {
        let index = this.getSheetIndex(Store.currentSheetIndex);
        let file = Store.luckysheetfile[index];
        file["config"] = Store.config;
        file["visibledatarow"] = Store.visibledatarow;
        file["visibledatacolumn"] = Store.visibledatacolumn;
        file["ch_width"] = Store.ch_width;
        file["rh_height"] = Store.rh_height;
        file["luckysheet_select_save"] = $.extend(true, [], Store.luckysheet_select_save);
        file["luckysheet_selection_range"] = $.extend(true, [], Store.luckysheet_selection_range);

        if ($("#luckysheet-scrollbar-x")[0].scrollWidth > $("#luckysheet-scrollbar-x")[0].offsetWidth) {
            file["scrollLeft"] = $("#luckysheet-scrollbar-x").scrollLeft(); //横向滚动条
        }

        if ($("#luckysheet-scrollbar-y")[0].scrollHeight > $("#luckysheet-scrollbar-y")[0].offsetHeight) {
            file["scrollTop"] = $("#luckysheet-scrollbar-y").scrollTop(); //纵向滚动条
        }

        file["zoomRatio"] = Store.zoomRatio;
    },
    setSheetParam: function(isload = true) {
        let index = this.getSheetIndex(Store.currentSheetIndex);
        let file = Store.luckysheetfile[index];

        Store.flowdata = file["data"];
        editor.webWorkerFlowDataCache(Store.flowdata); //worker存数据

        // formula.execFunctionGroupData = null;
        formula.execFunctionGlobalData = null;
        window.luckysheet_getcelldata_cache = null;

        this.sheetParamRestore(file, Store.flowdata);

        if (file["freezen"] == null) {
            luckysheetFreezen.freezenhorizontaldata = null;
            luckysheetFreezen.freezenverticaldata = null;
        } else {
            luckysheetFreezen.freezenhorizontaldata =
                file["freezen"].horizontal == null ? null : file["freezen"].horizontal.freezenhorizontaldata;
            luckysheetFreezen.freezenverticaldata =
                file["freezen"].vertical == null ? null : file["freezen"].vertical.freezenverticaldata;
        }

        if (isload) {
            rhchInit(Store.flowdata.length, Store.flowdata[0].length);
        }

        //批注
        luckysheetPostil.buildAllPs(Store.flowdata);

        //图片
        imageCtrl.currentImgId = null;
        imageCtrl.images = file.images;
        imageCtrl.allImagesShow();
        imageCtrl.init();

        //数据验证
        dataVerificationCtrl.dataVerification = file.dataVerification;
        dataVerificationCtrl.init();

        //链接
        hyperlinkCtrl.hyperlink = file.hyperlink;
        hyperlinkCtrl.init();

        createFilterOptions(file["filter_select"], file["filter"]);
    },
    restoreselect: function() {
        let index = this.getSheetIndex(Store.currentSheetIndex);
        let file = Store.luckysheetfile[index];

        //选区
        selectHightlightShow(true);

        //复制选区虚线框
        selectionCopyShow();

        if (file["scrollLeft"] != null && file["scrollLeft"] > 0) {
            $("#luckysheet-scrollbar-x").scrollLeft(file["scrollLeft"]); //列标题
        } else {
            $("#luckysheet-scrollbar-x").scrollLeft(0);
        }

        if (file["scrollTop"] != null && file["scrollTop"] > 0) {
            $("#luckysheet-scrollbar-y").scrollTop(file["scrollTop"]); //列标题
        } else {
            $("#luckysheet-scrollbar-y").scrollTop(0);
        }
    },
    storeSheetParamALL: function() {
        let _this = this;

        _this.storeSheetParam();
        let index = _this.getSheetIndex(Store.currentSheetIndex);
        Store.luckysheetfile[index]["data"] = Store.flowdata;
        Store.luckysheetfile[index]["config"] = $.extend(true, {}, Store.config);
    },
    mergeCalculationSheet: {},
    mergeCalculation: function(index) {
        let file = Store.luckysheetfile[this.getSheetIndex(index)];
        let config = file.config,
            data = file.data;
        if (config == null) {
            return;
        }
        let mergeConfig = config.merge;
        if (mergeConfig == null || index in this.mergeCalculationSheet || file["autoCalculationMerge"] === false) {
            return;
        }

        this.mergeCalculationSheet[index] = 1;

        for (let x in mergeConfig) {
            let r = parseInt(x.substr(0, x.indexOf("_")));
            let c = parseInt(x.substr(x.indexOf("_") + 1));
            let mcInfo = mergeConfig[x];
            if (data[r][c] == null) {
                data[r][c] = {};
            }

            data[r][c]["mc"] = {
                r: r,
                c: c,
                rs: mcInfo.rs,
                cs: mcInfo.cs,
            };

            for (let ir = r; ir < r + mcInfo.rs; ir++) {
                for (let ic = c; ic < c + mcInfo.cs; ic++) {
                    if (ir == r && ic == c) {
                        continue;
                    }
                    if (data[ir][ic] == null) {
                        data[ir][ic] = {};
                    }
                    data[ir][ic]["mc"] = {
                        r: r,
                        c: c,
                    };
                }
            }
        }
    },
    loadOtherFile: function(file) {
        let _this = this;
        // let sheetindexset = _this.checkLoadSheetIndex(file);
        // let sheetindex = [];

        // for(let i = 0; i < sheetindexset.length; i++){
        //     let item = sheetindexset[i];

        //     if(item == file["index"]){
        //         continue;
        //     }

        //     sheetindex.push(item);
        // }

        // for(let i = 0;i<sheetindex.length;i++){
        //     let item = sheetindex[i];
        //     let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
        //     if(otherfile["load"] == null || otherfile["load"] == "0"){
        //         otherfile["data"] = _this.buildGridData(otherfile);
        //         otherfile["load"] = "1";
        //     }
        // }

        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            let otherfile = Store.luckysheetfile[i];
            if (otherfile.index == file.index) {
                continue;
            }
            // let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
            if (otherfile["load"] == null || otherfile["load"] == "0") {
                otherfile["data"] = _this.buildGridData(otherfile);
                otherfile["load"] = "1";
            }
        }
    },
    changeSheet: function(index, isPivotInitial, isNewSheet, isCopySheet) {
        if (isEditMode()) {
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        let _this = this;

        if (index == Store.currentSheetIndex) {
            return;
        }

        if (server.allowUpdate) {
            $("#luckysheet-cell-main #luckysheet-multipleRange-show").empty();
            server.multipleIndex = 0;
        }
        let file = Store.luckysheetfile[_this.getSheetIndex(index)];
        // 钩子 sheetCreateAfter
        if (isNewSheet) {
            method.createHookFunction("sheetCreateAfter", { sheet: file });
        }
        // 钩子 sheetCopyAfter
        if (isCopySheet) {
            method.createHookFunction("sheetCopyAfter", { sheet: file });
        }

        // 钩子函数
        method.createHookFunction("sheetActivate", index, isPivotInitial, isNewSheet);

        $(
            "#luckysheet-filter-selected-sheet" +
                Store.currentSheetIndex +
                ", #luckysheet-filter-options-sheet" +
                Store.currentSheetIndex,
        ).hide();
        $("#luckysheet-filter-selected-sheet" + index + ", #luckysheet-filter-options-sheet" + index).show();

        // 存储当前index，在远程公式里能识别，如果不是当前页就不要刷新（远程公式只能刷新当前页）
        window.luckysheetCurrentIndex = index;

        _this.storeSheetParamALL();
        _this.setCurSheet(index);

        if (!!file.isPivotTable) {
            Store.luckysheetcurrentisPivotTable = true;
            if (!isPivotInitial) {
                pivotTable.changePivotTable(index);
            }
        } else {
            Store.luckysheetcurrentisPivotTable = false;
            $("#luckysheet-modal-dialog-slider-pivot").hide();
            luckysheetsizeauto(false);
            this.refreshAllPivotTable(Store.currentSheetIndex);
        }

        let load = file["load"];
        if (load != null) {
            let data = _this.buildGridData(file);
            file.data = data;
            // _this.loadOtherFile(file);

            _this.mergeCalculation(index);
            _this.setSheetParam(true);
            _this.showSheet();

            setTimeout(function() {
                formula.execFunctionGroupForce(true);
                luckysheetrefreshgrid();
                server.saveParam("shs", null, Store.currentSheetIndex);
            }, 1);
        } else {
            let loadSheetUrl = server.loadSheetUrl;
            if (loadSheetUrl == "" || Store.luckysheetcurrentisPivotTable || !!isNewSheet) {
                let data = _this.buildGridData(file);

                file["data"] = data;
                file["load"] = "1";

                // *这里不应该调用loadOtherFile去加载其余页面的数据,
                // *因为loadOtherFile里判断后会调用buildGridData把其余的sheet的数据设置为空的二维数组,即使那个sheet在服务端存在数据.
                // *这就导致一个数据丢失问题.
                // _this.loadOtherFile(file);

                // let sheetindexset = _this.checkLoadSheetIndex(file);
                // let sheetindex = [];

                // for(let i = 0; i < sheetindexset.length; i++){
                //     let item = sheetindexset[i];

                //     if(item == file["index"]){
                //         continue;
                //     }

                //     sheetindex.push(item);
                // }

                // for(let i = 0;i<sheetindex.length;i++){
                //     let item = sheetindex[i];
                //     let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
                //     if(otherfile["load"] == null || otherfile["load"] == "0"){
                //         otherfile["data"] = _this.buildGridData(otherfile);
                //         otherfile["load"] = "1";
                //     }
                // }

                _this.mergeCalculation(index);
                _this.setSheetParam();
                _this.showSheet();

                setTimeout(function() {
                    _this.restoreCache();
                    formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                    _this.restoreSheetAll(Store.currentSheetIndex);
                    luckysheetrefreshgrid();
                }, 1);

                server.saveParam("shs", null, Store.currentSheetIndex);
            } else {
                $("#luckysheet-grid-window-1").append(luckysheetlodingHTML());

                let sheetindex = _this.checkLoadSheetIndex(file);

                $.post(loadSheetUrl, { gridKey: server.gridKey, index: sheetindex.join(",") }, function(d) {
                    let dataset = new Function("return " + d)();
                    file.celldata = dataset[index.toString()];
                    let data = _this.buildGridData(file);

                    setTimeout(function() {
                        Store.loadingObj.close();
                    }, 500);

                    for (let item in dataset) {
                        if (item == index) {
                            continue;
                        }

                        let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];

                        if (otherfile["load"] == null || otherfile["load"] == "0") {
                            otherfile.celldata = dataset[item.toString()];
                            otherfile["data"] = _this.buildGridData(otherfile);
                            otherfile["load"] = "1";
                        }
                    }

                    file["data"] = data;
                    file["load"] = "1";
                    _this.mergeCalculation(index);
                    _this.setSheetParam();
                    _this.showSheet();

                    setTimeout(function() {
                        _this.restoreCache();
                        formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                        _this.restoreSheetAll(Store.currentSheetIndex);
                        luckysheetrefreshgrid();
                    }, 1);

                    server.saveParam("shs", null, Store.currentSheetIndex);
                });
            }
        }

        $("#luckysheet-cell-main .luckysheet-datavisual-selection-set").hide();
        $("#luckysheet-datavisual-selection-set-" + index).show();
        luckysheetformula.hideButton()

        //隐藏其他sheet的图表，显示当前sheet的图表 chartMix
        renderChartShow(index);

        luckysheetFreezen.initialFreezen(index);
        _this.restoreselect();
        //工作表保护的事件 不初始化工作表保护打开以后引用单元格点不动
        initialEvent(file);
    },

    refreshAllPivotTable: function(index) {
        Store.luckysheetfile.forEach((file)=>{
            if(file.isPivotTable){
                this.refreshPivotTableByFile(file)
            }
        })
    },
    refreshPivotTableByFile:function(file) {
        let pivotTableConfig = file.pivotTable

        let column = pivotTableConfig.column
        let row = pivotTableConfig.row
        let values = pivotTableConfig.values
        let showType = pivotTableConfig.showType
        let filterparm = pivotTableConfig.filterparm
        let pivotDataSheetIndex = pivotTableConfig.pivotDataSheetIndex

        let pivotrealIndex = this.getSheetIndex(pivotDataSheetIndex);

        let otherfile = Store.luckysheetfile[pivotrealIndex];
        if(otherfile["data"] == null){
            otherfile["data"] = this.buildGridData(otherfile);
        }

        const origindata = getdatabyselectionD(otherfile.data, pivotTableConfig.pivot_select_save);

        let rowhidden = {};
        if (filterparm != null) {
            for (let f in filterparm) {
                // 目的是取出rowhidden
                for (let h in filterparm[f]) {
                    if (h === 'rowhidden' && _this.filterparm[f][h] != null) {
                        rowhidden = $.extend(true, rowhidden, filterparm[f][h]);
                    }
                }
            }
        }


        let newdata = [];
        for (let i = 0; i < origindata.length; i++) {
            if (rowhidden != null && rowhidden[i] != null) {
                continue;
            }
            newdata.push([].concat(origindata[i]));
        }

        let ret = pivotTable.dataHandler(column, row, values, showType, newdata);
        
        pivotTableConfig.pivotDatas = ret


        let d = $.extend(true, [], this.nulldata);
        let data = d;

        let addr = 0, addc = 0;
        let rlen = ret.length, 
                clen = ret[0].length;

            addr = rlen - d.length; 
            addc = clen - d[0].length;

            data = datagridgrowth(d, addr + 20, addc + 10, true);

            for (let r = 0; r < rlen; r++) {
                // let x = [].concat(data[r]);
                for (let c = 0; c < clen; c++) {
                    let value = "";
                    if (ret[r] != null && ret[r][c] != null) {
                        value = getcellvalue(r, c, ret);
                        setcellvalue(r,c,data,value)
                    }
                    // x[c] = value;
                }
                // data[r] = x;
            }
        file.data = data;
    },
    checkLoadSheetIndexToDataIndex: {},
    checkLoadSheetIndex: function(file) {
        let calchain = formula.getAllFunctionGroup(); //file.calcChain; //index
        let chart = file.chart; //dataSheetIndex
        let pivotTable = file.pivotTable; //pivotDataSheetIndex

        let ret = [],
            cache = {};

        if (file.index in this.checkLoadSheetIndexToDataIndex) {
            return [];
        }

        ret.push(file.index);
        cache[file.index.toString()] = 1;
        this.checkLoadSheetIndexToDataIndex[file.index] = 1;
        if (calchain != null) {
            let dataIndexList = {};
            for (let i = 0; i < calchain.length; i++) {
                let f = calchain[i];
                let dataindex = f.index;
                let formulaTxt = getcellFormula(f.r, f.c, dataindex);

                if (formulaTxt == null) {
                    let file = Store.luckysheetfile[this.getSheetIndex(dataindex)];
                    file.data = this.buildGridData(file);
                    formulaTxt = getcellFormula(f.r, f.c, dataindex);

                    if (formulaTxt == null) {
                        continue;
                    }
                }

                if (formulaTxt.indexOf("!") == -1) {
                    // dataIndexList[dataindex] = 1;
                    formula.addToSheetIndexList(formulaTxt, dataindex);
                } else if (
                    formula.formulaContainSheetList != null &&
                    formula.formulaContainSheetList[formulaTxt] != null
                ) {
                    for (let dataSheetIndex in formula.formulaContainSheetList[formulaTxt]) {
                        dataIndexList[dataSheetIndex] = 1;
                    }
                } else {
                    formula.functionParser(formulaTxt, (str) => {
                        formula.addToCellList(formulaTxt, str);
                        if (str.indexOf("!") > -1) {
                            let name = str.substr(0, str.indexOf("!"));
                            // dataNameList[name] = true;

                            let sheet = this.getSheetByName(name);
                            if (sheet != null) {
                                let dataSheetIndex = sheet.index;
                                dataIndexList[dataSheetIndex] = 1;

                                formula.addToSheetIndexList(formulaTxt, dataSheetIndex);
                            }
                        }
                    });

                    if (formula.formulaContainSheetList[formulaTxt] == null) {
                        // dataIndexList[dataindex] = 1;
                        formula.addToSheetIndexList(formulaTxt, dataindex);
                    }
                }

                if (dataindex == null) {
                    continue;
                }

                // if(cache[dataindex.toString()] == null){
                // 	// ret.push(dataindex);
                //     cache[dataindex.toString()] = 1;
                //     this.checkLoadSheetIndexToDataIndex[dataindex] = 1;
                // }
            }

            for (let index in dataIndexList) {
                // let sheet = this.getSheetByName(n);
                // if(sheet==null){
                //     continue;
                // }

                // if(index == Store.currentSheetIndex){
                //     continue;
                // }

                let dataindex = index;

                if (cache[dataindex.toString()] == null) {
                    ret.push(dataindex);
                    cache[dataindex.toString()] = 1;
                    this.checkLoadSheetIndexToDataIndex[dataindex] = 1;
                }
            }
        }

        if (chart != null) {
            for (let i = 0; i < chart.length; i++) {
                let cc = chart[i];
                let dataindex = cc.dataSheetIndex;

                if (dataindex == null) {
                    continue;
                }

                if (cache[dataindex.toString()] == null) {
                    ret.push(dataindex);
                    cache[dataindex.toString()] = 1;
                }
            }
        }

        if (pivotTable != null) {
            let dataindex = pivotTable.pivotDataSheetIndex;

            if (dataindex != null && cache[dataindex.toString()] == null) {
                ret.push(dataindex);
                cache[dataindex.toString()] = 1;
            }
        }

        return ret;
    },
    showSheet: function() {
        // changeSheetContainerSize();
        $("#luckysheet-cell-flow_0").css({ width: Store.ch_width, top: "-1px" }); //width更新
        $("#luckysheet-sheettable_0").css({ width: Store.ch_width - 1, height: Store.rh_height });
        $("#luckysheetrowHeader_0").css("height", Store.rh_height);
        $("#luckysheet-cols-h-cells_0").css("width", Store.ch_width); //width更新

        $("#luckysheet-scrollbar-x div").width(Store.ch_width);
        $("#luckysheet-scrollbar-y div").height(
            Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3,
        );

        //等待滚动条dom宽高计算完成后 初始化该表格滚动位置
        let index = this.getSheetIndex(Store.currentSheetIndex);
        let file = Store.luckysheetfile[index];

        Store.scrollRefreshSwitch = false;

        if (file["scrollLeft"] != null && file["scrollLeft"] > 0) {
            $("#luckysheet-scrollbar-x").scrollLeft(file["scrollLeft"] * Store.zoomRatio);
        } else {
            $("#luckysheet-scrollbar-x").scrollLeft(0);
        }

        if (file["scrollTop"] != null && file["scrollTop"] > 0) {
            $("#luckysheet-scrollbar-y").scrollTop(file["scrollTop"] * Store.zoomRatio);
        } else {
            $("#luckysheet-scrollbar-y").scrollTop(0);
        }

        setTimeout(() => {
            Store.scrollRefreshSwitch = true;
        }, 0);

        zoomNumberDomBind(Store.zoomRatio);
    },
    setCurSheet: function(index) {
        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (Store.luckysheetfile[i]["index"] == index) {
                Store.luckysheetfile[i].status = 1;
            } else {
                Store.luckysheetfile[i].status = 0;
            }
        }

        Store.currentSheetIndex = index;
    },
    getSheetIndex: function(index) {
        for (let i = 0; i < Store.luckysheetfile.length; i++) {
            if (Store.luckysheetfile[i]["index"] == index) {
                return i;
            }
        }

        return null;
    },
    changeSheetExec: function(index, isPivotInitial, isNewSheet, isCopySheet) {
        let $sheet = $("#luckysheet-sheets-item" + index);

        window.luckysheet_getcelldata_cache = null;
        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $sheet.addClass("luckysheet-sheets-item-active").show();

        cleargridelement();
        this.changeSheet(index, isPivotInitial, isNewSheet, isCopySheet);

        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if (formula.rangestart) {
            formula.createRangeHightlight();
        }

        this.sheetBarShowAndHide(index);
    },
    sheetArrowShowAndHide() {
        const $wrap = $("#luckysheet-sheet-container-c");
        if (!$wrap.length) return;
        var sw = $wrap[0].scrollWidth;
        var w = Math.ceil($wrap.width());

        if (sw > w) {
            if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
                $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
                $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
            }
        } else {
            $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "none");
            $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
        }
    },
    // *显示sheet栏左右的灰色
    sheetBarShowAndHide(index) {
        let $c = $("#luckysheet-sheet-container-c");

        if (index != null) {
            let $sheet = $("#luckysheet-sheets-item" + index);
            $c.scrollLeft($sheet.offset().left);
        }

        let c_width = $c.width(),
            c_srollwidth = $c[0].scrollWidth,
            scrollLeft = $c.scrollLeft();

        if (scrollLeft <= 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
        } else {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        }

        if (c_width + scrollLeft >= c_srollwidth) {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").hide();
        } else {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").show();
        }
    },
    delChart: function(chart_id, sheetIndex) {
        let index = this.getSheetIndex(sheetIndex);
        let file = Store.luckysheetfile[index];

        if (file.chart == null) {
            file.chart = [];
        } else {
            for (let i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == chart_id) {
                    Store.luckysheetfile[index].chart.splice(i, 1);
                    break;
                }
            }
        }
    },
    saveChart: function(json) {
        //采用chartMix store存储，弃用Store.luckysheetfile存储，防止重复存储
        let index = this.getSheetIndex(json.sheetIndex);
        let file = Store.luckysheetfile[index];

        if (file.chart == null) {
            file.chart = [];
            file.chart.push(json);
        } else {
            for (let i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == json.chart_id) {
                    let old = $.extend(true, {}, file.chart[i]);
                    file.chart[i] = $.extend(true, {}, old, json);
                    return;
                }
            }

            file.chart.push(json);
        }
    },
    getChart: function(sheetIndex, chart_id) {
        let index = this.getSheetIndex(sheetIndex);
        let file = Store.luckysheetfile[index];

        if (file.chart == null) {
            return null;
        } else {
            for (let i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == chart_id) {
                    return file.chart[i];
                }
            }

            return null;
        }
    },
    getRangetxt: function(sheetIndex, range, currentIndex) {
        let sheettxt = "";

        if (currentIndex == null) {
            currentIndex = Store.currentSheetIndex;
        }

        if (sheetIndex != currentIndex) {
            sheettxt = Store.luckysheetfile[this.getSheetIndex(sheetIndex)].name + "!";
        }

        let row0 = range["row"][0],
            row1 = range["row"][1];
        let column0 = range["column"][0],
            column1 = range["column"][1];

        if (row0 == null && row1 == null) {
            return sheettxt + chatatABC(column0) + ":" + chatatABC(column1);
        } else if (column0 == null && column1 == null) {
            return sheettxt + (row0 + 1) + ":" + (row1 + 1);
        } else {
            if (column0 == column1 && row0 == row1) {
                return sheettxt + chatatABC(column0) + (row0 + 1);
            } else {
                return sheettxt + chatatABC(column0) + (row0 + 1) + ":" + chatatABC(column1) + (row1 + 1);
            }
        }
    },
    getSheetName: function(sheetIndex) {
        if (sheetIndex == null) {
            sheetIndex = Store.currentSheetIndex;
        }

        return Store.luckysheetfile[this.getSheetIndex(sheetIndex)].name;
    },
    getSheetMerge: function() {
        if (Store.config.merge == null) {
            return null;
        }

        return Store.config.merge;
    },
    getSheetData: function(sheetIndex) {
        if (sheetIndex == null) {
            sheetIndex = Store.currentSheetIndex;
        }

        return Store.luckysheetfile[this.getSheetIndex(sheetIndex)].data;
    },
    getSheetConfig: function(sheetIndex) {
        let _this = this;

        if (sheetIndex == null) {
            sheetIndex = Store.currentSheetIndex;
        }

        let config = Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config;

        if (config == null) {
            Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config = {};
        }

        return Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config;
    },
    restoreFilter: function(sheetIndex) {
        let index = this.getSheetIndex(sheetIndex);
        let file = Store.luckysheetfile[index];

        // if($('#luckysheet-filter-selected-sheet' + sheetIndex).length > 0 || file.filter_select == null || JSON.stringify(file.filter_select) == "{}"){
        //     if(file.config != null && file.config.rowhidden != null){
        //         file.config.rowhidden =  {};
        //         Store.config = file.config;

        //         jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length,false);
        //     }

        //     return;
        // }

        if (getObjType(file.filter_select) == "string") {
            file.filter_select = JSON.parse(file.filter_select);
        }

        if (file.filter_select == null || file.filter_select.row == null || file.filter_select.column == null) {
            return;
        }

        createFilterOptions(file.filter_select);

        if (getObjType(file.filter) != "object") {
            if (file.filter != null && getObjType(file.filter) == "string") {
                file.filter = JSON.parse(file.filter);
            }
        }

        let rowhidden = {};
        if (file.config != null && file.config.rowhidden != null) {
            rowhidden = file.config.rowhidden;
        }

        $("#luckysheet-filter-options-sheet" + sheetIndex + " .luckysheet-filter-options").each(function(i) {
            if (file.filter == null) {
                return false;
            }

            let $top = $(this);
            let item = file.filter[i];

            if (item == null) {
                return true;
            }

            if (getObjType(item) != "object") {
                item = JSON.parse(item);
            }

            labelFilterOptionState(
                $top,
                item.optionstate,
                item.rowhidden,
                item.caljs,
                false,
                item.st_r,
                item.ed_r,
                item.cindex,
                item.st_c,
                item.ed_c,
            );

            rowhidden = $.extend(true, rowhidden, item.rowhidden);
        });

        if (file.config == null) {
            file.config = {};
        }

        file.config["rowhidden"] = rowhidden;
        Store.config = file.config;

        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length, false);
    },
    restorePivot: function(sheetIndex) {
        let index = this.getSheetIndex(sheetIndex);
        let file = Store.luckysheetfile[index];

        if (!file.isPivotTable) {
            return;
        }

        pivotTable.getCellData(sheetIndex);
        pivotTable.initialPivotManage(true);
        pivotTable.refreshPivotTable(false);
    },
    restoreSheetAll: function(sheetIndex) {
        let _this = this;
        _this.restorePivot(sheetIndex);
        _this.restoreFilter(sheetIndex);
        _this.restoreFreezen(sheetIndex);
    },
    restoreFreezen: function(sheetIndex) {
        luckysheetFreezen.initialFreezen(sheetIndex);
    },
    restoreCache: function() {
        let _this = this;

        let data = _this.CacheNotLoadControll;
        _this.CacheNotLoadControll = [];

        if (data.length == 0) {
            return;
        }

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            _this.execCache(item);
        }
    },
    CacheNotLoadControll: [],
    execCache: function(item) {
        let _this = this;

        let type = item.t;
        let index = item.i;
        let value = item.v;
        let file = Store.luckysheetfile[_this.getSheetIndex(index)];

        if (type == "sha") {
            Store.luckysheetfile.push(value);
        } else if (type == "shc") {
            let copyjson = $.extend(true, {}, Store.luckysheetfile[_this.getSheetIndex(value.copyindex)]);
            copyjson.index = index;
            Store.luckysheetfile.push(copyjson);
        } else if (type == "shd") {
            Store.luckysheetfile.splice(value.deleIndex, 1);
        } else if (type == "shr") {
            for (let pos in value) {
                Store.luckysheetfile[_this.getSheetIndex(pos)].order = value[pos];
            }
        }

        if ((file == null || file.load != "1") && !(type in { sha: 0, shc: 0, shd: 0, shr: 0 })) {
            _this.CacheNotLoadControll.push(item);
            return;
        }

        if (type == "v") {
            let r = item.r,
                c = item.c,
                v = item.v;
            let data = _this.getSheetData(index);
            file.data[r][c] = v;
        } else if (type == "fc") {
            let op = item.op,
                pos = item.pos;

            if (getObjType(value) != "object") {
                value = new Function("return " + value)();
            }

            let r = value.r,
                c = value.c;

            if (op == "del") {
                formula.delFunctionGroup(r, c, index);
            } else {
                formula.insertUpdateFunctionGroup(r, c, index);
            }
        } else if (type == "cg") {
            let v = value,
                k = item.k;
            let config1 = _this.getSheetConfig(index);

            if (!(k in config1)) {
                config1[k] = {};
            }

            for (let key in v) {
                config1[k][key] = v[key];
            }

            Store.config = config1;
        } else if (type == "f") {
            let v = value,
                op = item.op,
                pos = item.pos;
            let filter = file.filter;

            if (filter == null) {
                filter = {};
            }

            if (op == "upOrAdd") {
                filter[pos] = v;
            } else if (op == "del") {
                delete filter[pos];
            }
        } else if (type == "fsc") {
            file.filter = null;
            file.filter_select = null;
        } else if (type == "fsr") {
            let v = value;
            file.filter = v.filter;
            file.filter_select = v.filter_select;
        } else if (type == "sh") {
            let op = item.op,
                cur = item.cur,
                v = value;
            if (op == "hide") {
                file.status = 0;
                Store.luckysheetfile[_this.getSheetIndex(cur)].status = 1;
            } else if (op == "show") {
                for (let i = 0; i < Store.luckysheetfile.length; i++) {
                    Store.luckysheetfile[i].status = 0;
                }
                file.status = 1;
            }
        } else if (type == "all") {
            let k = item.k,
                s = item.s;
            if (s && getObjType(value) != "object") {
                file[k] = JSON.stringify(value);
            } else {
                file[k] = value;
            }
        } else if (type == "c") {
            let op = item.op,
                cid = item.cid;

            if (op == "add") {
                file.chart.push(value);
            } else if (op == "xy" || op == "wh" || op == "update") {
                for (let i = 0; i < file.chart.length; i++) {
                    if (file.chart[i].chart_id == cid) {
                        for (let item in file.chart[i]) {
                            for (let vitem in value) {
                                if (item == vitem) {
                                    file.chart[i][item] = value[vitem];
                                }
                            }
                        }
                        return;
                    }
                }
            } else if (op == "del") {
                for (let i = 0; i < file.chart.length; i++) {
                    if (file.chart[i].chart_id == cid) {
                        file.chart.splice(i, 1);
                        return;
                    }
                }
            }
        } else if (type == "drc") {
            let rc = item.rc,
                index = value.index,
                len = value.len;
            let celldata = file.celldata;

            if (rc == "r") {
                for (let i = 0; celldata.length == 0; i++) {
                    let cell = celldata[i];
                    if (cell.r >= index && cell.r < index + len) {
                        delete celldata[i];
                    } else if (cell.r >= index + len) {
                        cell.r -= len;
                    }
                }

                file.row -= len;
            } else {
                for (let i = 0; celldata.length == 0; i++) {
                    let cell = celldata[i];
                    if (cell.c >= index && cell.c < index + len) {
                        delete celldata[i];
                    } else if (cell.c >= index + len) {
                        cell.c -= len;
                    }
                }

                file.column -= len;
            }

            let ret = [];
            for (let i = 0; i < celldata.length; i++) {
                if (celldata[i] != null) {
                    ret.push(celldata[i]);
                }
            }
            file.celldata = ret;

            let mtype, mst, med;
            if (rc == "r") {
                mtype = "row";
            } else {
                mtype = "column";
            }
            mst = index;
            med = index + len - 1;

            luckysheetdeletetable(mtype, mst, med, true);
        } else if (type == "arc") {
            let rc = item.rc,
                index = value.index,
                len = value.len;
            let celldata = file.celldata;

            if (rc == "r") {
                for (let i = 0; i < celldata.length; i++) {
                    let cell = celldata[i];
                    if (cell.r > index) {
                        cell.r += len;
                    }
                }

                file.row += len;
            } else {
                for (let i = 0; i < celldata.length; i++) {
                    let cell = celldata[i];
                    if (cell.c > index) {
                        cell.c += len;
                    }
                }

                file.column += len;
            }

            let mtype;
            if (rc == "r") {
                mtype = "row";
            } else {
                mtype = "column";
            }

            luckysheetextendtable(mtype, index, len, true);
        } else if (type == "na") {
            server.saveParam("na", null, value);
        } else if (type == "thumb") {
            setTimeout(function() {
                _this.imageRequest();
            }, 2000);
        }
    },
};

export default sheetmanage;
