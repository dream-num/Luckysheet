import editor from "./editor";
import formula from "./formula";
import { jfrefreshgrid_adRC, jfrefreshgrid_deleteCell, jfrefreshgrid_rhcw } from "./refresh";
import { datagridgrowth, getcellFormula } from "./getdata";
import { setcellvalue } from "./setdata";
import conditionformat from "../controllers/conditionformat";
import luckysheetFreezen from "../controllers/freezen";
import { selectHightlightShow } from "../controllers/select";
import { luckysheet_searcharray } from "../controllers/sheetSearch";
import { checkProtectionAuthorityNormal, checkProtectionNotEnable } from "../controllers/protection";
import { getSheetIndex } from "../methods/get";
import Store from "../store";
import method from "./method";

/**
 * 增加行列
 * @param {string} type 行或列 ['row', 'column'] 之一
 * @param {number} index 插入的位置 index
 * @param {number} value 插入 多少 行（列）
 * @param {string} direction 哪个方向插入 ['lefttop','rightbottom'] 之一
 * @param {string | number} sheetIndex 操作的 sheet 的 index 属性
 * @returns
 */
function luckysheetextendtable(type, index, value, direction, sheetIndex) {
    sheetIndex = sheetIndex ?? Store.currentSheetIndex;

    if (type == "row" && !checkProtectionAuthorityNormal(sheetIndex, "insertRows")) {
        return;
    } else if (type == "column" && !checkProtectionAuthorityNormal(sheetIndex, "insertColumns")) {
        return;
    }

    let curOrder = getSheetIndex(sheetIndex);
    let file = Store.luckysheetfile[curOrder];
    let d = $.extend(true, [], file.data);

    value = Math.floor(value);
    let cfg = $.extend(true, {}, file.config);

    //合并单元格配置变动
    if (cfg["merge"] == null) {
        cfg["merge"] = {};
    }

    let merge_new = {};
    for (let m in cfg["merge"]) {
        let mc = cfg["merge"][m];

        let r = mc.r,
            c = mc.c,
            rs = mc.rs,
            cs = mc.cs;

        if (type == "row") {
            if (index < r) {
                merge_new[r + value + "_" + c] = { r: r + value, c: c, rs: rs, cs: cs };
            }
            // *这里要判断一下rs是否等于1,因为如果这个合并单元格的行数只有一行时r = r+ rs-1,这种情况不应该进行单元格的加高
            else if (index == r && rs != 1) {
                if (direction == "lefttop") {
                    merge_new[r + value + "_" + c] = { r: r + value, c: c, rs: rs, cs: cs };
                } else {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs + value, cs: cs };
                }
            } else if (index < r + rs - 1) {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs + value, cs: cs };
            } else if (index == r + rs - 1) {
                if (direction == "lefttop") {
                    if (rs == 1) {
                        merge_new[r + value + "_" + c] = { r: r + value, c: c, rs: rs, cs: cs };
                    } else {
                        merge_new[r + "_" + c] = { r: r, c: c, rs: rs + value, cs: cs };
                    }
                } else {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
                }
            } else {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
            }
        } else if (type == "column") {
            if (index < c) {
                merge_new[r + "_" + (c + value)] = { r: r, c: c + value, rs: rs, cs: cs };
            } else if (index == c && cs != 1) {
                if (direction == "lefttop") {
                    merge_new[r + "_" + (c + value)] = { r: r, c: c + value, rs: rs, cs: cs };
                } else {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs + value };
                }
            } else if (index < c + cs - 1) {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs + value };
            } else if (index == c + cs - 1) {
                if (direction == "lefttop") {
                    // *这是要判断一下这个合并单元格的列宽是否=1,如果cs等于1的情况下,向左插入列，这个合并单元格会右移
                    if (cs == 1) {
                        merge_new[r + "_" + (c + value)] = { r: r, c: c + value, rs: rs, cs: cs };
                    } else {
                        merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs + value };
                    }
                } else {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
                }
            } else {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
            }
        }
    }
    cfg["merge"] = merge_new;

    //公式配置变动
    let calcChain = file.calcChain;
    let newCalcChain = [];
    if (calcChain != null && calcChain.length > 0) {
        for (let i = 0; i < calcChain.length; i++) {
            let calc = $.extend(true, {}, calcChain[i]);
            let calc_r = calc.r,
                calc_c = calc.c,
                calc_i = calc.index,
                calc_funcStr = getcellFormula(calc_r, calc_c, calc_i);

                // 添加进公式后，可能又直接覆盖了单元格值
                if(!calc_funcStr) continue

            if (type == "row") {
                let functionStr = "=" + formula.functionStrChange(calc_funcStr, "add", "row", direction, index, value);

                if (d[calc_r][calc_c] && d[calc_r][calc_c].f == calc_funcStr) {
                    d[calc_r][calc_c].f = functionStr;
                }

                if (direction == "lefttop") {
                    if (calc_r >= index) {
                        calc.r += value;
                    }
                } else if (direction == "rightbottom") {
                    if (calc_r > index) {
                        calc.r += value;
                    }
                }

                newCalcChain.push(calc);
            } else if (type == "column") {
                let functionStr = "=" + formula.functionStrChange(calc_funcStr, "add", "col", direction, index, value);

                if (d[calc_r][calc_c] && d[calc_r][calc_c].f == calc_funcStr) {
                    d[calc_r][calc_c].f = functionStr;
                }

                if (direction == "lefttop") {
                    if (calc_c >= index) {
                        calc.c += value;
                    }
                } else if (direction == "rightbottom") {
                    if (calc_c > index) {
                        calc.c += value;
                    }
                }

                newCalcChain.push(calc);
            }
        }
    }

    //筛选配置变动
    let filter_select = file.filter_select;
    let filter = file.filter;
    let newFilterObj = null;
    if (filter_select != null && JSON.stringify(filter_select) != "{}") {
        newFilterObj = { filter_select: null, filter: null };

        let f_r1 = filter_select.row[0],
            f_r2 = filter_select.row[1];
        let f_c1 = filter_select.column[0],
            f_c2 = filter_select.column[1];

        if (type == "row") {
            if (f_r1 < index) {
                if (f_r2 == index && direction == "lefttop") {
                    f_r2 += value;
                } else if (f_r2 > index) {
                    f_r2 += value;
                }
            } else if (f_r1 == index) {
                if (direction == "lefttop") {
                    f_r1 += value;
                    f_r2 += value;
                } else if (direction == "rightbottom" && f_r2 > index) {
                    f_r2 += value;
                }
            } else {
                f_r1 += value;
                f_r2 += value;
            }

            if (filter != null) {
                newFilterObj.filter = {};

                for (let k in filter) {
                    let f_rowhidden = filter[k].rowhidden;
                    let f_rowhidden_new = {};

                    for (let n in f_rowhidden) {
                        n = parseFloat(n);

                        if (n < index) {
                            f_rowhidden_new[n] = 0;
                        } else if (n == index) {
                            if (direction == "lefttop") {
                                f_rowhidden_new[n + value] = 0;
                            } else if (direction == "rightbottom") {
                                f_rowhidden_new[n] = 0;
                            }
                        } else {
                            f_rowhidden_new[n + value] = 0;
                        }
                    }

                    newFilterObj.filter[k] = $.extend(true, {}, filter[k]);
                    newFilterObj.filter[k].rowhidden = f_rowhidden_new;
                    newFilterObj.filter[k].str = f_r1;
                    newFilterObj.filter[k].edr = f_r2;
                }
            }
        } else if (type == "column") {
            if (f_c1 < index) {
                if (f_c2 == index && direction == "lefttop") {
                    f_c2 += value;
                } else if (f_c2 > index) {
                    f_c2 += value;
                }
            } else if (f_c1 == index) {
                if (direction == "lefttop") {
                    f_c1 += value;
                    f_c2 += value;
                } else if (direction == "rightbottom" && f_c2 > index) {
                    f_c2 += value;
                }
            } else {
                f_c1 += value;
                f_c2 += value;
            }

            if (filter != null) {
                newFilterObj.filter = {};

                for (let k in filter) {
                    let f_cindex = filter[k].cindex;

                    if (f_cindex == index && direction == "lefttop") {
                        f_cindex += value;
                    } else if (f_cindex > index) {
                        f_cindex += value;
                    }

                    newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                    newFilterObj.filter[f_cindex - f_c1].cindex = f_cindex;
                    newFilterObj.filter[f_cindex - f_c1].stc = f_c1;
                    newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                }
            }
        }

        newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
    }

    if (newFilterObj != null && newFilterObj.filter != null) {
        if (cfg["rowhidden"] == null) {
            cfg["rowhidden"] = {};
        }

        for (let k in newFilterObj.filter) {
            let f_rowhidden = newFilterObj.filter[k].rowhidden;

            for (let n in f_rowhidden) {
                cfg["rowhidden"][n] = 0;
            }
        }
    }

    //条件格式配置变动
    let CFarr = file.luckysheet_conditionformat_save;
    let newCFarr = [];
    if (CFarr != null && CFarr.length > 0) {
        for (let i = 0; i < CFarr.length; i++) {
            let cf_range = CFarr[i].cellrange;
            let cf_new_range = [];

            for (let j = 0; j < cf_range.length; j++) {
                let CFr1 = cf_range[j].row[0],
                    CFr2 = cf_range[j].row[1],
                    CFc1 = cf_range[j].column[0],
                    CFc2 = cf_range[j].column[1];

                if (type == "row") {
                    if (CFr1 < index) {
                        if (CFr2 == index && direction == "lefttop") {
                            CFr2 += value;
                        } else if (CFr2 > index) {
                            CFr2 += value;
                        }
                    } else if (CFr1 == index) {
                        if (direction == "lefttop") {
                            CFr1 += value;
                            CFr2 += value;
                        } else if (direction == "rightbottom" && CFr2 > index) {
                            CFr2 += value;
                        }
                    } else {
                        CFr1 += value;
                        CFr2 += value;
                    }
                } else if (type == "column") {
                    if (CFc1 < index) {
                        if (CFc2 == index && direction == "lefttop") {
                            CFc2 += value;
                        } else if (CFc2 > index) {
                            CFc2 += value;
                        }
                    } else if (CFc1 == index) {
                        if (direction == "lefttop") {
                            CFc1 += value;
                            CFc2 += value;
                        } else if (direction == "rightbottom" && CFc2 > index) {
                            CFc2 += value;
                        }
                    } else {
                        CFc1 += value;
                        CFc2 += value;
                    }
                }

                cf_new_range.push({ row: [CFr1, CFr2], column: [CFc1, CFc2] });
            }

            let cf = $.extend(true, {}, CFarr[i]);
            cf.cellrange = cf_new_range;

            newCFarr.push(cf);
        }
    }

    //交替颜色配置变动
    let AFarr = file.luckysheet_alternateformat_save;
    let newAFarr = [];
    if (AFarr != null && AFarr.length > 0) {
        for (let i = 0; i < AFarr.length; i++) {
            let AFr1 = AFarr[i].cellrange.row[0],
                AFr2 = AFarr[i].cellrange.row[1],
                AFc1 = AFarr[i].cellrange.column[0],
                AFc2 = AFarr[i].cellrange.column[1];

            let af = $.extend(true, {}, AFarr[i]);

            if (type == "row") {
                if (AFr1 < index) {
                    if (AFr2 == index && direction == "lefttop") {
                        AFr2 += value;
                    } else if (AFr2 > index) {
                        AFr2 += value;
                    }
                } else if (AFr1 == index) {
                    if (direction == "lefttop") {
                        AFr1 += value;
                        AFr2 += value;
                    } else if (direction == "rightbottom" && AFr2 > index) {
                        AFr2 += value;
                    }
                } else {
                    AFr1 += value;
                    AFr2 += value;
                }
            } else if (type == "column") {
                if (AFc1 < index) {
                    if (AFc2 == index && direction == "lefttop") {
                        AFc2 += value;
                    } else if (AFc2 > index) {
                        AFc2 += value;
                    }
                } else if (AFc1 == index) {
                    if (direction == "lefttop") {
                        AFc1 += value;
                        AFc2 += value;
                    } else if (direction == "rightbottom" && AFc2 > index) {
                        AFc2 += value;
                    }
                } else {
                    AFc1 += value;
                    AFc2 += value;
                }
            }

            af.cellrange = { row: [AFr1, AFr2], column: [AFc1, AFc2] };

            newAFarr.push(af);
        }
    }

    //冻结配置变动
    let newFreezen = { freezenhorizontaldata: null, freezenverticaldata: null };
    if (luckysheetFreezen.freezenhorizontaldata != null && type == "row") {
        let freezen_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
        let freezen_row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;

        if (freezen_row_st == index && direction == "lefttop") {
            freezen_row_st += value;
        } else if (freezen_row_st > index) {
            freezen_row_st += value;
        }

        let freezen_top = Store.visibledatarow[freezen_row_st] - 2 - freezen_scrollTop + Store.columnHeaderHeight;

        newFreezen.freezenhorizontaldata = [
            Store.visibledatarow[freezen_row_st],
            freezen_row_st + 1,
            freezen_scrollTop,
            luckysheetFreezen.cutVolumn(Store.visibledatarow, freezen_row_st + 1),
            freezen_top,
        ];
    } else {
        newFreezen.freezenhorizontaldata = luckysheetFreezen.freezenhorizontaldata;
    }

    if (luckysheetFreezen.freezenverticaldata != null && type == "column") {
        let freezen_scrollLeft = luckysheetFreezen.freezenverticaldata[2];
        let freezen_col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

        if (freezen_col_st == index && direction == "lefttop") {
            freezen_col_st += value;
        } else if (freezen_col_st > index) {
            freezen_col_st += value;
        }

        let freezen_left = Store.visibledatacolumn[freezen_col_st] - 2 - freezen_scrollLeft + Store.rowHeaderWidth;

        newFreezen.freezenverticaldata = [
            Store.visibledatacolumn[freezen_col_st],
            freezen_col_st + 1,
            freezen_scrollLeft,
            luckysheetFreezen.cutVolumn(Store.visibledatacolumn, freezen_col_st + 1),
            freezen_left,
        ];
    } else {
        newFreezen.freezenverticaldata = luckysheetFreezen.freezenverticaldata;
    }

    //数据验证配置变动
    let dataVerification = file.dataVerification;
    let newDataVerification = {};
    if (dataVerification != null) {
        for (let key in dataVerification) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = dataVerification[key];

            if (type == "row") {
                if (index < r) {
                    newDataVerification[r + value + "_" + c] = item;
                } else if (index == r) {
                    if (direction == "lefttop") {
                        newDataVerification[r + value + "_" + c] = item;

                        for (let i = 0; i < value; i++) {
                            newDataVerification[r + i + "_" + c] = item;
                        }
                    } else {
                        newDataVerification[r + "_" + c] = item;

                        for (let i = 0; i < value; i++) {
                            newDataVerification[r + i + 1 + "_" + c] = item;
                        }
                    }
                } else {
                    newDataVerification[r + "_" + c] = item;
                }
            } else if (type == "column") {
                if (index < c) {
                    newDataVerification[r + "_" + (c + value)] = item;
                } else if (index == c) {
                    if (direction == "lefttop") {
                        newDataVerification[r + "_" + (c + value)] = item;

                        for (let i = 0; i < value; i++) {
                            newDataVerification[r + "_" + (c + i)] = item;
                        }
                    } else {
                        newDataVerification[r + "_" + c] = item;

                        for (let i = 0; i < value; i++) {
                            newDataVerification[r + "_" + (c + i + 1)] = item;
                        }
                    }
                } else {
                    newDataVerification[r + "_" + c] = item;
                }
            }
        }
    }

    //超链接配置变动
    let hyperlink = file.hyperlink;
    let newHyperlink = {};
    if (hyperlink != null) {
        for (let key in hyperlink) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = hyperlink[key];

            if (type == "row") {
                if (index < r) {
                    newHyperlink[r + value + "_" + c] = item;
                } else if (index == r) {
                    if (direction == "lefttop") {
                        newHyperlink[r + value + "_" + c] = item;
                    } else {
                        newHyperlink[r + "_" + c] = item;
                    }
                } else {
                    newHyperlink[r + "_" + c] = item;
                }
            } else if (type == "column") {
                if (index < c) {
                    newHyperlink[r + "_" + (c + value)] = item;
                } else if (index == c) {
                    if (direction == "lefttop") {
                        newHyperlink[r + "_" + (c + value)] = item;
                    } else {
                        newHyperlink[r + "_" + c] = item;
                    }
                } else {
                    newHyperlink[r + "_" + c] = item;
                }
            }
        }
    }

    let type1;
    if (type == "row") {
        type1 = "r";

        //行高配置变动
        if (cfg["rowlen"] != null) {
            let rowlen_new = {};

            for (let r in cfg["rowlen"]) {
                r = parseFloat(r);

                if (r < index) {
                    rowlen_new[r] = cfg["rowlen"][r];
                } else if (r == index) {
                    if (direction == "lefttop") {
                        rowlen_new[r + value] = cfg["rowlen"][r];
                    } else if (direction == "rightbottom") {
                        rowlen_new[r] = cfg["rowlen"][r];
                    }
                } else {
                    rowlen_new[r + value] = cfg["rowlen"][r];
                }
            }

            cfg["rowlen"] = rowlen_new;
        }

        //隐藏行配置变动
        if (cfg["rowhidden"] != null) {
            let rowhidden_new = {};

            for (let r in cfg["rowhidden"]) {
                r = parseFloat(r);

                if (r < index) {
                    rowhidden_new[r] = cfg["rowhidden"][r];
                } else if (r == index) {
                    if (direction == "lefttop") {
                        rowhidden_new[r + value] = cfg["rowhidden"][r];
                    } else if (direction == "rightbottom") {
                        rowhidden_new[r] = cfg["rowhidden"][r];
                    }
                } else {
                    rowhidden_new[r + value] = cfg["rowhidden"][r];
                }
            }

            cfg["rowhidden"] = rowhidden_new;
        }

        // *添加空行模板这里请保持为push null;
        let row = [];
        for (let c = 0; c < d[0].length; c++) {
            row.push(null);
        }

        var cellBorderConfig = [];
        //边框
        if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
            let borderInfo = [];

            for (let i = 0; i < cfg["borderInfo"].length; i++) {
                let rangeType = cfg["borderInfo"][i].rangeType;

                if (rangeType == "range") {
                    let borderRange = cfg["borderInfo"][i].range;

                    let emptyRange = [];

                    for (let j = 0; j < borderRange.length; j++) {
                        let bd_r1 = borderRange[j].row[0],
                            bd_r2 = borderRange[j].row[1];

                        if (direction == "lefttop") {
                            if (index <= bd_r1) {
                                bd_r1 += value;
                                bd_r2 += value;
                            } else if (index <= bd_r2) {
                                bd_r2 += value;
                            }
                        } else {
                            if (index < bd_r1) {
                                bd_r1 += value;
                                bd_r2 += value;
                            } else if (index < bd_r2) {
                                bd_r2 += value;
                            }
                        }

                        if (bd_r2 >= bd_r1) {
                            emptyRange.push({ row: [bd_r1, bd_r2], column: borderRange[j].column });
                        }
                    }

                    if (emptyRange.length > 0) {
                        let bd_obj = {
                            rangeType: "range",
                            borderType: cfg["borderInfo"][i].borderType,
                            style: cfg["borderInfo"][i].style,
                            color: cfg["borderInfo"][i].color,
                            range: emptyRange,
                        };

                        borderInfo.push(bd_obj);
                    }
                } else if (rangeType == "cell") {
                    let row_index = cfg["borderInfo"][i].value.row_index;
                    // 位置相同标识边框相关 先缓存
                    if (row_index === index) {
                        cellBorderConfig.push(JSON.parse(JSON.stringify(cfg["borderInfo"][i])));
                    }

                    if (direction == "lefttop") {
                        if (index <= row_index) {
                            row_index += value;
                        }
                    } else {
                        if (index < row_index) {
                            row_index += value;
                        }
                    }

                    cfg["borderInfo"][i].value.row_index = row_index;
                    borderInfo.push(cfg["borderInfo"][i]);
                }
            }

            cfg["borderInfo"] = borderInfo;
        }

        let arr = [];
        for (let r = 0; r < value; r++) {
            arr.push(JSON.stringify(row));
            // 同步拷贝 type 为 cell 类型的边框
            if (cellBorderConfig.length) {
                var cellBorderConfigCopy = JSON.parse(JSON.stringify(cellBorderConfig));
                cellBorderConfigCopy.forEach((item) => {
                    if (direction === "rightbottom") {
                        // 向下插入时 基于模板行位置直接递增即可
                        item.value.row_index += r + 1;
                    } else if (direction === "lefttop") {
                        // 向上插入时 目标行移动到后面 新增n行到前面 对于新增的行来说 也是递增，不过是从0开始
                        item.value.row_index += r;
                    }
                });
                cfg["borderInfo"].push(...cellBorderConfigCopy);
            }
        }

        if (direction == "lefttop") {
            if (index == 0) {
                new Function("d", "return " + "d.unshift(" + arr.join(",") + ")")(d);
            } else {
                new Function("d", "return " + "d.splice(" + index + ", 0, " + arr.join(",") + ")")(d);
            }
        } else {
            new Function("d", "return " + "d.splice(" + (index + 1) + ", 0, " + arr.join(",") + ")")(d);
        }
    } else {
        type1 = "c";

        //行高配置变动
        if (cfg["columnlen"] != null) {
            let columnlen_new = {};

            for (let c in cfg["columnlen"]) {
                c = parseFloat(c);

                if (c < index) {
                    columnlen_new[c] = cfg["columnlen"][c];
                } else if (c == index) {
                    if (direction == "lefttop") {
                        columnlen_new[c + value] = cfg["columnlen"][c];
                    } else if (direction == "rightbottom") {
                        columnlen_new[c] = cfg["columnlen"][c];
                    }
                } else {
                    columnlen_new[c + value] = cfg["columnlen"][c];
                }
            }

            cfg["columnlen"] = columnlen_new;
        }

        //隐藏列配置变动
        if (cfg["colhidden"] != null) {
            let colhidden_new = {};

            for (let c in cfg["colhidden"]) {
                c = parseFloat(c);

                if (c < index) {
                    colhidden_new[c] = cfg["colhidden"][c];
                } else if (c == index) {
                    if (direction == "lefttop") {
                        colhidden_new[c + value] = cfg["colhidden"][c];
                    } else if (direction == "rightbottom") {
                        colhidden_new[c] = cfg["colhidden"][c];
                    }
                } else {
                    colhidden_new[c + value] = cfg["colhidden"][c];
                }
            }

            cfg["colhidden"] = colhidden_new;
        }

        // *添加空列模板这里请保持为push null;
        let col = [];
        for (let r = 0; r < d.length; r++) {
            col.push(null);
        }

        var cellBorderConfig = [];
        //边框
        if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
            let borderInfo = [];

            for (let i = 0; i < cfg["borderInfo"].length; i++) {
                let rangeType = cfg["borderInfo"][i].rangeType;

                if (rangeType == "range") {
                    let borderRange = cfg["borderInfo"][i].range;

                    let emptyRange = [];

                    for (let j = 0; j < borderRange.length; j++) {
                        let bd_c1 = borderRange[j].column[0],
                            bd_c2 = borderRange[j].column[1];

                        if (direction == "lefttop") {
                            if (index <= bd_c1) {
                                bd_c1 += value;
                                bd_c2 += value;
                            } else if (index <= bd_c2) {
                                bd_c2 += value;
                            }
                        } else {
                            if (index < bd_c1) {
                                bd_c1 += value;
                                bd_c2 += value;
                            } else if (index < bd_c2) {
                                bd_c2 += value;
                            }
                        }

                        if (bd_c2 >= bd_c1) {
                            emptyRange.push({ row: borderRange[j].row, column: [bd_c1, bd_c2] });
                        }
                    }

                    if (emptyRange.length > 0) {
                        let bd_obj = {
                            rangeType: "range",
                            borderType: cfg["borderInfo"][i].borderType,
                            style: cfg["borderInfo"][i].style,
                            color: cfg["borderInfo"][i].color,
                            range: emptyRange,
                        };

                        borderInfo.push(bd_obj);
                    }
                } else if (rangeType == "cell") {
                    let col_index = cfg["borderInfo"][i].value.col_index;
                    // 位置相同标识边框相关 先缓存
                    if (col_index === index) {
                        cellBorderConfig.push(JSON.parse(JSON.stringify(cfg["borderInfo"][i])));
                    }

                    if (direction == "lefttop") {
                        if (index <= col_index) {
                            col_index += value;
                        }
                    } else {
                        if (index < col_index) {
                            col_index += value;
                        }
                    }

                    cfg["borderInfo"][i].value.col_index = col_index;
                    borderInfo.push(cfg["borderInfo"][i]);
                }
            }

            cfg["borderInfo"] = borderInfo;
        }

        // 处理相关的 type 为 cell 类型的边框
        if (cellBorderConfig.length) {
            for (let i = 0; i < value; i++) {
                var cellBorderConfigCopy = JSON.parse(JSON.stringify(cellBorderConfig));
                cellBorderConfigCopy.forEach((item) => {
                    if (direction === "rightbottom") {
                        // 向右插入时 基于模板列位置直接递增即可
                        item.value.col_index += i + 1;
                    } else if (direction === "lefttop") {
                        // 向左插入时 目标列移动到后面 新增n列到前面 对于新增的列来说 也是递增，不过是从0开始
                        item.value.col_index += i;
                    }
                });
                cfg["borderInfo"].push(...cellBorderConfigCopy);
            }
        }

        for (let r = 0; r < d.length; r++) {
            let row = d[r];

            for (let i = 0; i < value; i++) {
                // *这里不能是引用,不然添加多列时添加的都是同一个引用,修改一个cell会同步到多个
                const COLR = JSON.parse(JSON.stringify(col[r]));
                if (direction == "lefttop") {
                    if (index == 0) {
                        row.unshift(COLR);
                    } else {
                        row.splice(index, 0, COLR);
                    }
                } else {
                    row.splice(index + 1, 0, COLR);
                }
            }
        }
    }

    // 修改当前sheet页时刷新
    if (file.index == Store.currentSheetIndex) {
        jfrefreshgrid_adRC(
            d,
            cfg,
            "addRC",
            { index: index, len: value, direction: direction, rc: type1, restore: false },
            newCalcChain,
            newFilterObj,
            newCFarr,
            newAFarr,
            newFreezen,
            newDataVerification,
            newHyperlink,
        );
    } else {
        file.data = d;
        file.config = cfg;
        file.calcChain = newCalcChain;
        file.filter = newFilterObj.filter;
        file.filter_select = newFilterObj.filter_select;
        file.luckysheet_conditionformat_save = newCFarr;
        file.luckysheet_alternateformat_save = newAFarr;
        file.dataVerification = newDataVerification;
        file.hyperlink = newHyperlink;
    }

    let range = null;
    if (type == "row") {
        if (direction == "lefttop") {
            range = [{ row: [index, index + value - 1], column: [0, d[0].length - 1] }];
        } else {
            range = [{ row: [index + 1, index + value], column: [0, d[0].length - 1] }];
        }
    } else {
        if (direction == "lefttop") {
            range = [{ row: [0, d.length - 1], column: [index, index + value - 1] }];
        } else {
            range = [{ row: [0, d.length - 1], column: [index + 1, index + value] }];
        }
    }

    file.luckysheet_select_save = range;
    if (file.index == Store.currentSheetIndex) {
        Store.luckysheet_select_save = range;
        selectHightlightShow();
    }

    if (type == "row") {
        let scrollLeft = $("#luckysheet-cell-main").scrollLeft(),
            scrollTop = $("#luckysheet-cell-main").scrollTop();
        let winH = $("#luckysheet-cell-main").height(),
            winW = $("#luckysheet-cell-main").width();

        let row = Store.visibledatarow[range[0].row[1]],
            row_pre = range[0].row[0] - 1 == -1 ? 0 : Store.visibledatarow[range[0].row[0] - 1];

        if (row - scrollTop - winH + 20 > 0) {
            $("#luckysheet-scrollbar-y").scrollTop(row - winH + 20);
        } else if (row_pre - scrollTop - 20 < 0) {
            $("#luckysheet-scrollbar-y").scrollTop(row_pre - 20);
        }

        if (value > 30) {
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();
        }
    }
}

function luckysheetextendData(rowlen, newData) {
    let d = editor.deepCopyFlowData(Store.flowdata);

    let cfg = $.extend(true, {}, Store.config);
    if (cfg["merge"] == null) {
        cfg["merge"] = {};
    }

    let collen = d[0].length;
    let addNullData = datagridgrowth([], rowlen, collen);

    d = d.concat(addNullData);

    for (let i = 0; i < newData.length; i++) {
        let r = newData[i].r,
            c = newData[i].c,
            v = newData[i].v;

        setcellvalue(r, c, d, v);

        if (v != null && v.mc != null && v.mc.rs != null) {
            cfg["merge"][v.mc.r + "_" + v.mc.c] = $.extend(true, {}, v.mc);
        }
    }

    //luckysheet.flowdata
    Store.flowdata = d;
    editor.webWorkerFlowDataCache(Store.flowdata); //worker存数据
    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = d;

    //config
    Store.config = cfg;
    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

    //行高、列宽刷新
    jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
}

//删除行列
function luckysheetdeletetable(type, st, ed, sheetIndex) {
    sheetIndex = sheetIndex || Store.currentSheetIndex;

    if (type == "row" && !checkProtectionAuthorityNormal(sheetIndex, "deleteRows")) {
        return;
    } else if (type == "column" && !checkProtectionAuthorityNormal(sheetIndex, "deleteColumns")) {
        return;
    }

    let curOrder = getSheetIndex(sheetIndex);

    let file = Store.luckysheetfile[curOrder];
    let d = $.extend(true, [], file.data);

    if (st < 0) {
        st = 0;
    }

    if (ed < 0) {
        ed = 0;
    }

    if (type == "row") {
        if (st > d.length - 1) {
            st = d.length - 1;
        }

        if (ed > d.length - 1) {
            ed = d.length - 1;
        }
    } else {
        if (st > d[0].length - 1) {
            st = d[0].length - 1;
        }

        if (ed > d[0].length - 1) {
            ed = d[0].length - 1;
        }
    }

    if (st > ed) {
        return;
    }

    let slen = ed - st + 1;
    let cfg = $.extend(true, {}, file.config);

    //合并单元格配置变动
    if (cfg["merge"] == null) {
        cfg["merge"] = {};
    }

    let merge_new = {};
    for (let m in cfg["merge"]) {
        let mc = cfg["merge"][m];

        let r = mc.r,
            c = mc.c,
            rs = mc.rs,
            cs = mc.cs;

        if (type == "row") {
            if (r < st) {
                if (r + rs - 1 < st) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
                } else if (r + rs - 1 >= st && r + rs - 1 < ed) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: st - r, cs: cs };
                } else if (r + rs - 1 >= ed) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs - slen, cs: cs };
                }
            } else if (r >= st && r <= ed) {
                if (r + rs - 1 > ed) {
                    merge_new[st + "_" + c] = { r: st, c: c, rs: r + rs - 1 - ed, cs: cs };
                }
            } else if (r > ed) {
                merge_new[r - slen + "_" + c] = { r: r - slen, c: c, rs: rs, cs: cs };
            }
        } else if (type == "column") {
            if (c < st) {
                if (c + cs - 1 < st) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
                } else if (c + cs - 1 >= st && c + cs - 1 < ed) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: st - c };
                } else if (c + cs - 1 >= ed) {
                    merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs - slen };
                }
            } else if (c >= st && c <= ed) {
                if (c + cs - 1 > ed) {
                    merge_new[r + "_" + st] = { r: r, c: st, rs: rs, cs: c + cs - 1 - ed };
                }
            } else if (c > ed) {
                merge_new[r + "_" + (c - slen)] = { r: r, c: c - slen, rs: rs, cs: cs };
            }
        }
    }
    cfg["merge"] = merge_new;

    //公式配置变动
    let calcChain = file.calcChain;
    let newCalcChain = [];
    if (calcChain != null && calcChain.length > 0) {
        for (let i = 0; i < calcChain.length; i++) {
            let calc = $.extend(true, {}, calcChain[i]);
            let calc_r = calc.r,
                calc_c = calc.c,
                calc_i = calc.index,
                calc_funcStr = getcellFormula(calc_r, calc_c, calc_i);

                // 添加进公式后，可能又直接覆盖了单元格值
                if(!calc_funcStr) continue

            if (type == "row") {
                if (calc_r < st || calc_r > ed) {
                    let functionStr = "=" + formula.functionStrChange(calc_funcStr, "del", "row", null, st, slen);

                    if (d[calc_r][calc_c] && d[calc_r][calc_c].f == calc_funcStr) {
                        d[calc_r][calc_c].f = functionStr;
                    }

                    if (calc_r > ed) {
                        calc.r = calc_r - slen;
                    }

                    newCalcChain.push(calc);
                }
            } else if (type == "column") {
                if (calc_c < st || calc_c > ed) {
                    let functionStr = "=" + formula.functionStrChange(calc_funcStr, "del", "col", null, st, slen);

                    if (d[calc_r][calc_c] && d[calc_r][calc_c].f == calc_funcStr) {
                        d[calc_r][calc_c].f = functionStr;
                    }

                    if (calc_c > ed) {
                        calc.c = calc_c - slen;
                    }

                    newCalcChain.push(calc);
                }
            }
        }
    }

    //筛选配置变动
    let filter_select = file.filter_select;
    let filter = file.filter;
    let newFilterObj = null;
    if (filter_select != null && JSON.stringify(filter_select) != "{}") {
        newFilterObj = { filter_select: null, filter: null };

        let f_r1 = filter_select.row[0],
            f_r2 = filter_select.row[1];
        let f_c1 = filter_select.column[0],
            f_c2 = filter_select.column[1];

        if (type == "row") {
            if (f_r1 > ed) {
                f_r1 -= slen;
                f_r2 -= slen;

                newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
            } else if (f_r1 < st) {
                if (f_r2 < st) {
                } else if (f_r2 <= ed) {
                    f_r2 = st - 1;
                } else {
                    f_r2 -= slen;
                }

                newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
            }

            if (newFilterObj.filter_select != null && filter != null) {
                for (let k in filter) {
                    let f_rowhidden = filter[k].rowhidden;
                    let f_rowhidden_new = {};

                    for (let n in f_rowhidden) {
                        if (n < st) {
                            f_rowhidden_new[n] = 0;
                        } else if (n > ed) {
                            f_rowhidden_new[n - slen] = 0;
                        }
                    }

                    if (JSON.stringify(f_rowhidden_new) != "{}") {
                        if (newFilterObj.filter == null) {
                            newFilterObj.filter = {};
                        }

                        newFilterObj.filter[k] = $.extend(true, {}, filter[k]);
                        newFilterObj.filter[k].rowhidden = f_rowhidden_new;
                        newFilterObj.filter[k].str = f_r1;
                        newFilterObj.filter[k].edr = f_r2;
                    }
                }
            }
        } else if (type == "column") {
            if (f_c1 > ed) {
                f_c1 -= slen;
                f_c2 -= slen;

                newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
            } else if (f_c1 < st) {
                if (f_c2 < st) {
                } else if (f_c2 <= ed) {
                    f_c2 = st - 1;
                } else {
                    f_c2 -= slen;
                }

                newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
            } else {
                if (f_c2 > ed) {
                    f_c1 = st;
                    f_c2 -= slen;

                    newFilterObj.filter_select = { row: [f_r1, f_r2], column: [f_c1, f_c2] };
                }
            }

            if (newFilterObj.filter_select != null && filter != null) {
                for (let k in filter) {
                    let f_cindex = filter[k].cindex;

                    if (f_cindex < st) {
                        if (newFilterObj.filter == null) {
                            newFilterObj.filter = {};
                        }

                        newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                        newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                    } else if (f_cindex > ed) {
                        f_cindex -= slen;

                        if (newFilterObj.filter == null) {
                            newFilterObj.filter = {};
                        }

                        newFilterObj.filter[f_cindex - f_c1] = $.extend(true, {}, filter[k]);
                        newFilterObj.filter[f_cindex - f_c1].cindex = f_cindex;
                        newFilterObj.filter[f_cindex - f_c1].stc = f_c1;
                        newFilterObj.filter[f_cindex - f_c1].edc = f_c2;
                    }
                }
            }
        }
    }

    if (newFilterObj != null && newFilterObj.filter != null) {
        if (cfg["rowhidden"] == null) {
            cfg["rowhidden"] = {};
        }

        for (let k in newFilterObj.filter) {
            let f_rowhidden = newFilterObj.filter[k].rowhidden;

            for (let n in f_rowhidden) {
                cfg["rowhidden"][n] = 0;
            }
        }
    }

    //条件格式配置变动
    let CFarr = file.luckysheet_conditionformat_save;
    let newCFarr = [];
    if (CFarr != null && CFarr.length > 0) {
        for (let i = 0; i < CFarr.length; i++) {
            let cf_range = CFarr[i].cellrange;
            let cf_new_range = [];

            for (let j = 0; j < cf_range.length; j++) {
                let CFr1 = cf_range[j].row[0],
                    CFr2 = cf_range[j].row[1],
                    CFc1 = cf_range[j].column[0],
                    CFc2 = cf_range[j].column[1];

                if (type == "row") {
                    if (!(CFr1 >= st && CFr2 <= ed)) {
                        if (CFr1 > ed) {
                            CFr1 -= slen;
                            CFr2 -= slen;
                        } else if (CFr1 < st) {
                            if (CFr2 < st) {
                            } else if (CFr2 <= ed) {
                                CFr2 = st - 1;
                            } else {
                                CFr2 -= slen;
                            }
                        } else {
                            if (CFr2 > ed) {
                                CFr1 = st;
                                CFr2 -= slen;
                            }
                        }

                        cf_new_range.push({ row: [CFr1, CFr2], column: [CFc1, CFc2] });
                    }
                } else if (type == "column") {
                    if (!(CFc1 >= st && CFc2 <= ed)) {
                        if (CFc1 > ed) {
                            CFc1 -= slen;
                            CFc2 -= slen;
                        } else if (CFc1 < st) {
                            if (CFc2 < st) {
                            } else if (CFc2 <= ed) {
                                CFc2 = st - 1;
                            } else {
                                CFc2 -= slen;
                            }
                        } else {
                            if (CFc2 > ed) {
                                CFc1 = st;
                                CFc2 -= slen;
                            }
                        }

                        cf_new_range.push({ row: [CFr1, CFr2], column: [CFc1, CFc2] });
                    }
                }
            }

            if (cf_new_range.length > 0) {
                let cf = $.extend(true, {}, CFarr[i]);
                cf.cellrange = cf_new_range;

                newCFarr.push(cf);
            }
        }
    }

    //交替颜色配置变动
    let AFarr = file.luckysheet_alternateformat_save;
    let newAFarr = [];
    if (AFarr != null && AFarr.length > 0) {
        for (let i = 0; i < AFarr.length; i++) {
            let AFr1 = AFarr[i].cellrange.row[0],
                AFr2 = AFarr[i].cellrange.row[1],
                AFc1 = AFarr[i].cellrange.column[0],
                AFc2 = AFarr[i].cellrange.column[1];

            if (type == "row") {
                if (!(AFr1 >= st && AFr2 <= ed)) {
                    let af = $.extend(true, {}, AFarr[i]);

                    if (AFr1 > ed) {
                        AFr1 -= slen;
                        AFr2 -= slen;
                    } else if (AFr1 < st) {
                        if (AFr2 < st) {
                        } else if (AFr2 <= ed) {
                            AFr2 = st - 1;
                        } else {
                            AFr2 -= slen;
                        }
                    } else {
                        if (AFr2 > ed) {
                            AFr1 = st;
                            AFr2 -= slen;
                        }
                    }

                    af.cellrange = { row: [AFr1, AFr2], column: [AFc1, AFc2] };

                    newAFarr.push(af);
                }
            } else if (type == "column") {
                if (!(AFc1 >= st && AFc2 <= ed)) {
                    let af = $.extend(true, {}, AFarr[i]);

                    if (AFc1 > ed) {
                        AFc1 -= slen;
                        AFc2 -= slen;
                    } else if (AFc1 < st) {
                        if (AFc2 < st) {
                        } else if (AFc2 <= ed) {
                            AFc2 = st - 1;
                        } else {
                            AFc2 -= slen;
                        }
                    } else {
                        if (AFc2 > ed) {
                            AFc1 = st;
                            AFc2 -= slen;
                        }
                    }

                    af.cellrange = { row: [AFr1, AFr2], column: [AFc1, AFc2] };

                    newAFarr.push(af);
                }
            }
        }
    }

    //冻结配置变动
    let newFreezen = { freezenhorizontaldata: null, freezenverticaldata: null };
    if (luckysheetFreezen.freezenhorizontaldata != null && type == "row") {
        let freezen_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
        let freezen_st = luckysheet_searcharray(Store.visibledatarow, freezen_scrollTop);
        if (freezen_st == -1) {
            freezen_st = 0;
        }

        let freezen_row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;

        if (freezen_row_st >= st) {
            if (freezen_row_st < ed) {
                freezen_row_st = st - 1;
            } else {
                freezen_row_st -= slen;
            }
        }

        if (freezen_row_st < freezen_st) {
            freezen_row_st = freezen_st;
        }

        let freezen_top = Store.visibledatarow[freezen_row_st] - 2 - freezen_scrollTop + Store.columnHeaderHeight;

        newFreezen.freezenhorizontaldata = [
            Store.visibledatarow[freezen_row_st],
            freezen_row_st + 1,
            freezen_scrollTop,
            luckysheetFreezen.cutVolumn(Store.visibledatarow, freezen_row_st + 1),
            freezen_top,
        ];
    } else {
        newFreezen.freezenhorizontaldata = luckysheetFreezen.freezenhorizontaldata;
    }

    if (luckysheetFreezen.freezenverticaldata != null && type == "column") {
        let freezen_scrollLeft = luckysheetFreezen.freezenverticaldata[2];
        let freezen_st2 = luckysheet_searcharray(Store.visibledatacolumn, freezen_scrollLeft);
        if (freezen_st2 == -1) {
            freezen_st2 = 0;
        }

        let freezen_col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

        if (freezen_col_st >= st) {
            if (freezen_col_st < ed) {
                freezen_col_st = st - 1;
            } else {
                freezen_col_st -= slen;
            }
        }

        if (freezen_col_st < freezen_st2) {
            freezen_col_st = freezen_st2;
        }

        let freezen_left = Store.visibledatacolumn[freezen_col_st] - 2 - freezen_scrollLeft + Store.rowHeaderWidth;

        newFreezen.freezenverticaldata = [
            Store.visibledatacolumn[freezen_col_st],
            freezen_col_st + 1,
            freezen_scrollLeft,
            luckysheetFreezen.cutVolumn(Store.visibledatacolumn, freezen_col_st + 1),
            freezen_left,
        ];
    } else {
        newFreezen.freezenverticaldata = luckysheetFreezen.freezenverticaldata;
    }

    //数据验证配置变动
    let dataVerification = file.dataVerification;
    let newDataVerification = {};
    if (dataVerification != null) {
        for (let key in dataVerification) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = dataVerification[key];

            if (type == "row") {
                if (r < st) {
                    newDataVerification[r + "_" + c] = item;
                } else if (r > ed) {
                    newDataVerification[r - slen + "_" + c] = item;
                }
            } else if (type == "column") {
                if (c < st) {
                    newDataVerification[r + "_" + c] = item;
                } else if (c > ed) {
                    newDataVerification[r + "_" + (c - slen)] = item;
                }
            }
        }
    }

    //超链接配置变动
    let hyperlink = file.hyperlink;
    let newHyperlink = {};
    if (hyperlink != null) {
        for (let key in hyperlink) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = hyperlink[key];

            if (type == "row") {
                if (r < st) {
                    newHyperlink[r + "_" + c] = item;
                } else if (r > ed) {
                    newHyperlink[r - slen + "_" + c] = item;
                }
            } else if (type == "column") {
                if (c < st) {
                    newHyperlink[r + "_" + c] = item;
                } else if (c > ed) {
                    newHyperlink[r + "_" + (c - slen)] = item;
                }
            }
        }
    }

    //主逻辑
    let type1;
    if (type == "row") {
        type1 = "r";

        //行高配置变动
        if (cfg["rowlen"] == null) {
            cfg["rowlen"] = {};
        }

        let rowlen_new = {};
        for (let r in cfg["rowlen"]) {
            if (r < st) {
                rowlen_new[r] = cfg["rowlen"][r];
            } else if (r > ed) {
                rowlen_new[r - slen] = cfg["rowlen"][r];
            }
        }

        cfg["rowlen"] = rowlen_new;

        //隐藏行配置变动
        if (cfg["rowhidden"] == null) {
            cfg["rowhidden"] = {};
        }

        let rowhidden_new = {};
        for (let r in cfg["rowhidden"]) {
            if (r < st) {
                rowhidden_new[r] = cfg["rowhidden"][r];
            } else if (r > ed) {
                rowhidden_new[r - slen] = cfg["rowhidden"][r];
            }
        }

        cfg["rowhidden"] = rowhidden_new;

        //边框配置变动
        if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
            let borderInfo = [];

            for (let i = 0; i < cfg["borderInfo"].length; i++) {
                let rangeType = cfg["borderInfo"][i].rangeType;

                if (rangeType == "range") {
                    let borderRange = cfg["borderInfo"][i].range;

                    let emptyRange = [];

                    for (let j = 0; j < borderRange.length; j++) {
                        let bd_r1 = borderRange[j].row[0],
                            bd_r2 = borderRange[j].row[1];

                        for (let r = st; r <= ed; r++) {
                            if (r < borderRange[j].row[0]) {
                                bd_r1 -= 1;
                                bd_r2 -= 1;
                            } else if (r <= borderRange[j].row[1]) {
                                bd_r2 -= 1;
                            }
                        }

                        if (bd_r2 >= bd_r1) {
                            emptyRange.push({ row: [bd_r1, bd_r2], column: borderRange[j].column });
                        }
                    }

                    if (emptyRange.length > 0) {
                        let bd_obj = {
                            rangeType: "range",
                            borderType: cfg["borderInfo"][i].borderType,
                            style: cfg["borderInfo"][i].style,
                            color: cfg["borderInfo"][i].color,
                            range: emptyRange,
                        };

                        borderInfo.push(bd_obj);
                    }
                } else if (rangeType == "cell") {
                    let row_index = cfg["borderInfo"][i].value.row_index;

                    if (row_index < st) {
                        borderInfo.push(cfg["borderInfo"][i]);
                    } else if (row_index > ed) {
                        cfg["borderInfo"][i].value.row_index = row_index - (ed - st + 1);
                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                }
            }

            cfg["borderInfo"] = borderInfo;
        }

        // 备注：该处理方式会在删除多行的时候会存在bug
        // 说明：删除多行后，会把同一个row空数组(引用类型)添加成为data多行的数据源，导致设置这些行数据时产生错误。
        //空白行模板
        // let row = [];
        // for (let c = 0; c < d[0].length; c++) {
        //     row.push(null);
        // }

        // //删除选中行
        // d.splice(st, slen);

        // //删除多少行，增加多少行空白行
        // for (let r = 0; r < slen; r++) {
        //     d.push(row);
        // }

        //删除选中行
        d.splice(st, slen);

        //删除多少行，增加多少行空白行
        // for (let r = 0; r < slen; r++) {
        //     let row = [];
        //     for (let c = 0; c < d[0].length; c++) {
        //         row.push(null);
        //     }
        //     d.push(row);
        // }
    } else {
        type1 = "c";

        //列宽配置变动
        if (cfg["columnlen"] == null) {
            cfg["columnlen"] = {};
        }

        let columnlen_new = {};
        for (let c in cfg["columnlen"]) {
            if (c < st) {
                columnlen_new[c] = cfg["columnlen"][c];
            } else if (c > ed) {
                columnlen_new[c - slen] = cfg["columnlen"][c];
            }
        }

        cfg["columnlen"] = columnlen_new;

        //隐藏列配置变动
        if (cfg["colhidden"] == null) {
            cfg["colhidden"] = {};
        }

        let colhidden_new = {};
        for (let c in cfg["colhidden"]) {
            if (c < st) {
                colhidden_new[c] = cfg["colhidden"][c];
            } else if (c > ed) {
                colhidden_new[c - slen] = cfg["colhidden"][c];
            }
        }

        cfg["colhidden"] = colhidden_new;

        //边框配置变动
        if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
            let borderInfo = [];

            for (let i = 0; i < cfg["borderInfo"].length; i++) {
                let rangeType = cfg["borderInfo"][i].rangeType;

                if (rangeType == "range") {
                    let borderRange = cfg["borderInfo"][i].range;

                    let emptyRange = [];

                    for (let j = 0; j < borderRange.length; j++) {
                        let bd_c1 = borderRange[j].column[0],
                            bd_c2 = borderRange[j].column[1];

                        for (let c = st; c <= ed; c++) {
                            if (c < borderRange[j].column[0]) {
                                bd_c1 -= 1;
                                bd_c2 -= 1;
                            } else if (c <= borderRange[j].column[1]) {
                                bd_c2 -= 1;
                            }
                        }

                        if (bd_c2 >= bd_c1) {
                            emptyRange.push({ row: borderRange[j].row, column: [bd_c1, bd_c2] });
                        }
                    }

                    if (emptyRange.length > 0) {
                        let bd_obj = {
                            rangeType: "range",
                            borderType: cfg["borderInfo"][i].borderType,
                            style: cfg["borderInfo"][i].style,
                            color: cfg["borderInfo"][i].color,
                            range: emptyRange,
                        };

                        borderInfo.push(bd_obj);
                    }
                } else if (rangeType == "cell") {
                    let col_index = cfg["borderInfo"][i].value.col_index;

                    if (col_index < st) {
                        borderInfo.push(cfg["borderInfo"][i]);
                    } else if (col_index > ed) {
                        cfg["borderInfo"][i].value.col_index = col_index - (ed - st + 1);
                        borderInfo.push(cfg["borderInfo"][i]);
                    }
                }
            }

            cfg["borderInfo"] = borderInfo;
        }

        // //空白列模板
        // let addcol = [];
        // for (let r = 0; r < slen; r++) {
        //     addcol.push(null);
        // }

        for (let r = 0; r < d.length; r++) {
            let row = [].concat(JSON.parse((JSON.stringify(d[r]))));
           //删除该行选中列
           row.splice(st, slen);
           d[r] = row;//将删除列的行数据        赋值给sheet的对应行
       }
    }

    // 修改当前sheet页时刷新
    if (file.index == Store.currentSheetIndex) {
        jfrefreshgrid_adRC(
            d,
            cfg,
            "delRC",
            { index: st, len: ed - st + 1, rc: type1 },
            newCalcChain,
            newFilterObj,
            newCFarr,
            newAFarr,
            newFreezen,
            newDataVerification,
            newHyperlink,
        );
    } else {
        file.data = d;
        file.config = cfg;
        file.calcChain = newCalcChain;
        file.filter = newFilterObj.filter;
        file.filter_select = newFilterObj.filter_select;
        file.luckysheet_conditionformat_save = newCFarr;
        file.luckysheet_alternateformat_save = newAFarr;
        file.dataVerification = newDataVerification;
        file.hyperlink = newHyperlink;
    }
}

//删除单元格
function luckysheetDeleteCell(type, str, edr, stc, edc, sheetIndex) {
    sheetIndex = sheetIndex || Store.currentSheetIndex;
    if (!checkProtectionNotEnable(sheetIndex)) {
        return;
    }

    // Hook function
    if (!method.createHookFunction("rangeDeleteBefore", str, stc)) {
        return;
    }

    let curOrder = getSheetIndex(sheetIndex);
    let file = Store.luckysheetfile[curOrder];

    let d = $.extend(true, [], file.data);

    let rlen = edr - str + 1;
    let clen = edc - stc + 1;
    let cfg = $.extend(true, {}, Store.config);

    //合并单元格配置变动
    if (cfg["merge"] == null) {
        cfg["merge"] = {};
    }

    let merge_new = {};
    for (let m in cfg["merge"]) {
        let mc = cfg["merge"][m];

        let r = mc.r,
            c = mc.c,
            rs = mc.rs,
            cs = mc.cs;

        if (type == "moveLeft") {
            if (str > r + rs - 1 || edr < r || stc > c + cs - 1) {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
            } else if (str <= r && edr >= r + rs - 1 && edc < c) {
                merge_new[r + "_" + (c - clen)] = { r: r, c: c - clen, rs: rs, cs: cs };
            } else {
                for (let r_i = r; r_i <= r + rs - 1; r_i++) {
                    for (let c_i = c; c_i <= c + cs - 1; c_i++) {
                        delete d[r_i][c_i].mc;
                    }
                }
            }
        } else if (type == "moveUp") {
            if (stc > c + cs - 1 || edc < c || str > r + rs - 1) {
                merge_new[r + "_" + c] = { r: r, c: c, rs: rs, cs: cs };
            } else if (stc <= c && edc >= c + cs - 1 && edr < r) {
                merge_new[r - rlen + "_" + c] = { r: r - rlen, c: c, rs: rs, cs: cs };
            } else {
                for (let r_i = r; r_i <= r + rs - 1; r_i++) {
                    for (let c_i = c; c_i <= c + cs - 1; c_i++) {
                        delete d[r_i][c_i].mc;
                    }
                }
            }
        }
    }
    cfg["merge"] = merge_new;

    //公式配置变动
    let calcChain = file.calcChain;
    let newCalcChain = [];
    if (calcChain != null && calcChain.length > 0) {
        for (let i = 0; i < calcChain.length; i++) {
            let calc = $.extend(true, {}, calcChain[i]);
            let calc_r = calc.r,
                calc_c = calc.c,
                calc_i = calc.index,
                calc_funcStr = getcellFormula(calc_r, calc_c, calc_i);

                // 添加进公式后，可能又直接覆盖了单元格值
                if(!calc_funcStr) continue

            if (calc_r < str || calc_r > edr || calc_c < stc || calc_c > edc) {
                let functionStr;

                if (type == "moveLeft") {
                    functionStr = "=" + formula.functionStrChange(calc_funcStr, "del", "col", null, stc, clen);

                    if (calc_c > edc && calc_r >= str && calc_r <= edr) {
                        calc.c = calc_c - clen;
                    }
                } else if (type == "moveUp") {
                    functionStr = "=" + formula.functionStrChange(calc_funcStr, "del", "row", null, str, rlen);

                    if (calc_r > edr && calc_c >= stc && calc_c <= edc) {
                        calc.r = calc_r - rlen;
                    }
                }

                if (d[calc_r][calc_c] && d[calc_r][calc_c].f == calc_funcStr) {
                    d[calc_r][calc_c].f = functionStr;
                }

                newCalcChain.push(calc);
            }
        }
    }

    //筛选配置变动
    let filter_select = file.filter_select;
    let filter = file.filter;
    let newFilterObj = null;
    if (filter_select != null && JSON.stringify(filter_select) != "{}") {
        newFilterObj = { filter_select: null, filter: null };

        let f_r1 = filter_select.row[0],
            f_r2 = filter_select.row[1];
        let f_c1 = filter_select.column[0],
            f_c2 = filter_select.column[1];

        if (type == "moveUp") {
            if (f_c1 >= stc && f_c2 <= edc) {
                if (f_r1 > edr) {
                    newFilterObj.filter_select = {
                        row: [f_r1 - rlen, f_r2 - rlen],
                        column: [f_c1, f_c2],
                    };
                } else if (f_r2 < str) {
                    newFilterObj.filter_select = {
                        row: [f_r1, f_r2],
                        column: [f_c1, f_c2],
                    };
                } else if (f_r1 < str) {
                    if (f_r2 > edr) {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2 - rlen],
                            column: [f_c1, f_c2],
                        };
                    } else {
                        newFilterObj.filter_select = {
                            row: [f_r1, str - 1],
                            column: [f_c1, f_c2],
                        };
                    }
                }

                if (newFilterObj.filter_select != null && filter != null) {
                    for (let k in filter) {
                        let f_rowhidden = filter[k].rowhidden;
                        let f_rowhidden_new = {};

                        for (let n in f_rowhidden) {
                            if (n < str) {
                                f_rowhidden_new[n] = 0;
                            } else if (n > edr) {
                                f_rowhidden_new[n - slen] = 0;
                            }
                        }

                        if (newFilterObj.filter == null) {
                            newFilterObj.filter = {};
                        }
                        newFilterObj.filter[k] = $.extend(true, {}, filter[k]);

                        if (JSON.stringify(f_rowhidden_new) != "{}") {
                            newFilterObj.filter[k].rowhidden = f_rowhidden_new;
                        }

                        newFilterObj.filter[k].str = newFilterObj.filter_select.row[0];
                        newFilterObj.filter[k].edr = newFilterObj.filter_select.row[1];
                    }
                }
            } else if (f_r1 >= str && f_r2 <= edr) {
                if (f_c1 > edc) {
                    newFilterObj.filter_select = {
                        row: [f_r1, f_r2],
                        column: [f_c1, f_c2],
                    };
                } else if (f_c1 >= stc) {
                    if (f_c2 > edc) {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [stc, f_c2 - clen],
                        };
                    }
                } else {
                    if (f_c2 < stc) {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [f_c1, f_c2],
                        };
                    } else if (f_c2 <= edc) {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [f_c1, stc - 1],
                        };
                    } else {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [f_c1, f_c2 - clen],
                        };
                    }
                }

                if (newFilterObj.filter_select != null && filter != null) {
                    for (let k in filter) {
                        let f_stc = newFilterObj.filter_select.column[0];
                        let f_edc = newFilterObj.filter_select.column[1];
                        let f_cindex = filter[k].cindex;

                        if (f_cindex < stc || f_cindex > edc) {
                            if (newFilterObj.filter == null) {
                                newFilterObj.filter = {};
                            }

                            if (f_cindex > edc) {
                                f_cindex -= clen;
                            }

                            let k2 = f_cindex - f_stc;

                            newFilterObj.filter[k2] = $.extend(true, {}, filter[k]);
                            newFilterObj.filter[k2].cindex = f_cindex;
                            newFilterObj.filter[k2].stc = f_stc;
                            newFilterObj.filter[k2].edc = f_edc;
                        }
                    }
                }
            } else {
                newFilterObj.filter_select = {
                    row: [f_r1, f_r2],
                    column: [f_c1, f_c2],
                };

                if (filter != null) {
                    newFilterObj.filter = filter;
                }
            }
        } else if (type == "moveLeft") {
            if (f_r1 >= str && f_r2 <= edr) {
                if (f_c1 > edc) {
                    newFilterObj.filter_select = {
                        row: [f_r1, f_r2],
                        column: [f_c1 - clen, f_c2 - clen],
                    };
                } else if (f_c2 < stc) {
                    newFilterObj.filter_select = {
                        row: [f_r1, f_r2],
                        column: [f_c1, f_c2],
                    };
                } else if (f_c1 < stc) {
                    if (f_c2 > edc) {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [f_c1, f_c2 - clen],
                        };
                    } else {
                        newFilterObj.filter_select = {
                            row: [f_r1, f_r2],
                            column: [f_c1, stc - 1],
                        };
                    }
                }

                if (newFilterObj.filter_select != null && filter != null) {
                    for (let k in filter) {
                        let f_stc = newFilterObj.filter_select.column[0];
                        let f_edc = newFilterObj.filter_select.column[1];
                        let f_cindex = filter[k].cindex;

                        if (f_cindex < stc || f_cindex > edc) {
                            if (newFilterObj.filter == null) {
                                newFilterObj.filter = {};
                            }

                            if (f_cindex > edc) {
                                f_cindex -= clen;
                            }

                            let k2 = f_cindex - f_stc;

                            newFilterObj.filter[k2] = $.extend(true, {}, filter[k]);
                            newFilterObj.filter[k2].cindex = f_cindex;
                            newFilterObj.filter[k2].stc = f_stc;
                            newFilterObj.filter[k2].edc = f_edc;
                        }
                    }
                }
            } else if (f_c1 >= stc && f_c2 <= edc) {
                if (f_r1 < str || f_r1 > edr) {
                    newFilterObj.filter_select = {
                        row: [f_r1, f_r2],
                        column: [f_c1, f_c2],
                    };

                    if (filter != null) {
                        newFilterObj.filter = filter;
                    }
                }
            } else {
                newFilterObj.filter_select = {
                    row: [f_r1, f_r2],
                    column: [f_c1, f_c2],
                };

                if (filter != null) {
                    newFilterObj.filter = filter;
                }
            }
        }
    }

    if (newFilterObj != null && newFilterObj.filter != null) {
        if (cfg["rowhidden"] == null) {
            cfg["rowhidden"] = {};
        }

        for (let k in newFilterObj.filter) {
            let f_rowhidden = newFilterObj.filter[k].rowhidden;

            for (let n in f_rowhidden) {
                cfg["rowhidden"][n] = 0;
            }
        }
    }

    //条件格式配置变动
    let CFarr = file.luckysheet_conditionformat_save;
    let newCFarr = [];
    if (CFarr != null && CFarr.length > 0) {
        for (let i = 0; i < CFarr.length; i++) {
            let cf_range = CFarr[i].cellrange;
            let cf_new_range = [];

            for (let j = 0; j < cf_range.length; j++) {
                let CFr1 = cf_range[j].row[0],
                    CFr2 = cf_range[j].row[1],
                    CFc1 = cf_range[j].column[0],
                    CFc2 = cf_range[j].column[1];

                if (!(str <= CFr1 && edr >= CFr2 && stc <= CFc1 && edc >= CFc2)) {
                    cf_new_range = getMoveRange(type, str, edr, stc, edc, CFr1, CFr2, CFc1, CFc2, rlen, clen);
                }
            }

            if (cf_new_range.length > 0) {
                let cf = $.extend(true, {}, CFarr[i]);
                cf.cellrange = cf_new_range;

                newCFarr.push(cf);
            }
        }
    }

    //数据验证配置变动
    let dataVerification = file.dataVerification;
    let newDataVerification = {};
    if (dataVerification != null) {
        for (let key in dataVerification) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = dataVerification[key];

            if (r < str || r > edr || c < stc || c > edc) {
                if (type == "moveLeft") {
                    if (c > edc && r >= str && r <= edr) {
                        newDataVerification[r + "_" + (c - clen)] = item;
                    } else {
                        newDataVerification[r + "_" + c] = item;
                    }
                } else if (type == "moveUp") {
                    if (r > edr && c >= stc && c <= edc) {
                        newDataVerification[r - rlen + "_" + c] = item;
                    } else {
                        newDataVerification[r + "_" + c] = item;
                    }
                }
            }
        }
    }

    //超链接配置变动
    let hyperlink = file.hyperlink;
    let newHyperlink = {};
    if (hyperlink != null) {
        for (let key in hyperlink) {
            let r = Number(key.split("_")[0]),
                c = Number(key.split("_")[1]);
            let item = hyperlink[key];

            if (r < str || r > edr || c < stc || c > edc) {
                if (type == "moveLeft") {
                    if (c > edc && r >= str && r <= edr) {
                        newHyperlink[r + "_" + (c - clen)] = item;
                    } else {
                        newHyperlink[r + "_" + c] = item;
                    }
                } else if (type == "moveUp") {
                    if (r > edr && c >= stc && c <= edc) {
                        newHyperlink[r - rlen + "_" + c] = item;
                    } else {
                        newHyperlink[r + "_" + c] = item;
                    }
                }
            }
        }
    }

    //边框配置变动
    if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
        let borderInfo = [];

        for (let i = 0; i < cfg["borderInfo"].length; i++) {
            let rangeType = cfg["borderInfo"][i].rangeType;

            if (rangeType == "range") {
                let borderRange = cfg["borderInfo"][i].range;

                let emptyRange = [];

                for (let j = 0; j < borderRange.length; j++) {
                    let bd_r1 = borderRange[j].row[0],
                        bd_r2 = borderRange[j].row[1],
                        bd_c1 = borderRange[j].column[0],
                        bd_c2 = borderRange[j].column[1];

                    if (!(str <= bd_r1 && edr >= bd_r2 && stc <= bd_c1 && edc >= bd_c2)) {
                        emptyRange = getMoveRange(type, str, edr, stc, edc, bd_r1, bd_r2, bd_c1, bd_c2, rlen, clen);
                    }
                }

                if (emptyRange.length > 0) {
                    let bd_obj = {
                        rangeType: "range",
                        borderType: cfg["borderInfo"][i].borderType,
                        style: cfg["borderInfo"][i].style,
                        color: cfg["borderInfo"][i].color,
                        range: emptyRange,
                    };

                    borderInfo.push(bd_obj);
                }
            } else if (rangeType == "cell") {
                let row_index = cfg["borderInfo"][i].value.row_index;
                let col_index = cfg["borderInfo"][i].value.col_index;

                if (row_index < str || row_index > edr || col_index < stc || col_index > edc) {
                    if (type == "moveLeft") {
                        if (col_index > edc && row_index >= str && row_index <= edr) {
                            col_index -= clen;
                            cfg["borderInfo"][i].value.col_index = col_index;
                        }
                    } else if (type == "moveUp") {
                        if (row_index > edr && col_index >= stc && col_index <= edc) {
                            row_index -= rlen;
                            cfg["borderInfo"][i].value.row_index = row_index;
                        }
                    }

                    borderInfo.push(cfg["borderInfo"][i]);
                }
            }
        }

        cfg["borderInfo"] = borderInfo;
    }

    //空白列模板
    let addcol = [];
    for (let c = stc; c <= edc; c++) {
        addcol.push(null);
    }

    if (type == "moveUp") {
        //上移
        let data = [];

        for (let r = str; r <= d.length - 1; r++) {
            let row = [];

            for (let c = stc; c <= edc; c++) {
                row.push(d[r][c]);
            }

            data.push(row);
        }

        data.splice(0, rlen);

        //空白行模板
        let addrow = [];
        for (let r = str; r <= edr; r++) {
            addrow.push(addcol);
        }

        data = data.concat(addrow);

        for (let r = str; r <= d.length - 1; r++) {
            for (let c = stc; c <= edc; c++) {
                d[r][c] = data[r - str][c - stc];
            }
        }
    } else if (type == "moveLeft") {
        //左移
        for (let r = str; r <= edr; r++) {
            d[r].splice(stc, clen);
            d[r] = d[r].concat(addcol);
        }
    }

    if (file.index == Store.currentSheetIndex) {
        jfrefreshgrid_deleteCell(
            d,
            cfg,
            { type: type, str: str, edr: edr, stc: stc, edc: edc },
            newCalcChain,
            newFilterObj,
            newCFarr,
            newDataVerification,
            newHyperlink,
        );
    } else {
        file.data = d;
        file.config = cfg;
        file.calcChain = newCalcChain;
        file.filter = newFilterObj.filter;
        file.filter_select = newFilterObj.filter_select;
        file.luckysheet_conditionformat_save = newCFarr;
        file.dataVerification = newDataVerification;
        file.hyperlink = newHyperlink;
    }
}

function getMoveRange(type, str, edr, stc, edc, r1, r2, c1, c2, rlen, clen) {
    let newRange = [];

    if (type == "moveLeft") {
        if (str > r2 || edr < r1 || stc > c2) {
            newRange.push({
                row: [r1, r2],
                column: [c1, c2],
            });
        } else if (edc < c1) {
            if (str <= r1 && edr >= r2) {
                newRange.push({
                    row: [r1, r2],
                    column: [c1 - clen, c2 - clen],
                });
            } else if (str > r1 && edr < r2) {
                let range = [
                    { row: [r1, str - 1], column: [c1, c2] },
                    { row: [edr + 1, r2], column: [c1, c2] },
                    { row: [str, edr], column: [c1 - clen, c2 - clen] },
                ];
                newRange = newRange.concat(range);
            } else if (str > r1) {
                let range = [
                    { row: [r1, str - 1], column: [c1, c2] },
                    { row: [str, r2], column: [c1 - clen, c2 - clen] },
                ];
                newRange = newRange.concat(range);
            } else if (edr < r2) {
                let range = [
                    { row: [r1, edr], column: [c1 - clen, c2 - clen] },
                    { row: [edr + 1, r2], column: [c1, c2] },
                ];
                newRange = newRange.concat(range);
            }
        } else if (edc >= c1) {
            if (stc <= c1 && edc >= c2) {
                if (str > r1 && edr < r2) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                    ];
                    newRange = newRange.concat(range);
                } else if (str > r1) {
                    let range = [{ row: [r1, str - 1], column: [c1, c2] }];
                    newRange = newRange.concat(range);
                } else if (edr < r2) {
                    let range = [{ row: [edr + 1, r2], column: [c1, c2] }];
                    newRange = newRange.concat(range);
                }
            } else if (stc > c1 && edc < c2) {
                if (str <= r1 && edr >= r2) {
                    newRange.push({
                        row: [r1, r2],
                        column: [c1, c2 - clen],
                    });
                } else if (str > r1 && edr < r2) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                        { row: [str, edr], column: [c1, c2 - clen] },
                    ];
                    newRange = newRange.concat(range);
                } else if (str > r1) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [str, r2], column: [c1, c2 - clen] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edr < r2) {
                    let range = [
                        { row: [r1, edr], column: [c1, c2 - clen] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (stc > c1) {
                if (str <= r1 && edr >= r2) {
                    newRange.push({
                        row: [r1, r2],
                        column: [c1, stc - 1],
                    });
                } else if (str > r1 && edr < r2) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                        { row: [str, edr], column: [c1, stc - 1] },
                    ];
                    newRange = newRange.concat(range);
                } else if (str > r1) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [str, r2], column: [c1, stc - 1] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edr < r2) {
                    let range = [
                        { row: [r1, edr], column: [c1, stc - 1] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (edc < c2) {
                if (str <= r1 && edr >= r2) {
                    newRange.push({
                        row: [r1, r2],
                        column: [c1 - clen, c2 - clen],
                    });
                } else if (str > r1 && edr < r2) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                        { row: [str, edr], column: [c1 - clen, c2 - clen] },
                    ];
                    newRange = newRange.concat(range);
                } else if (str > r1) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, c2] },
                        { row: [str, r2], column: [c1 - clen, c2 - clen] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edr < r2) {
                    let range = [
                        { row: [r1, edr], column: [c1 - clen, c2 - clen] },
                        { row: [edr + 1, r2], column: [c1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            }
        }
    } else if (type == "moveUp") {
        if (stc > c2 || edc < c1 || str > r2) {
            newRange.push({
                row: [r1, r2],
                column: [c1, c2],
            });
        } else if (edr < r1) {
            if (stc <= c1 && edc >= c2) {
                newRange.push({
                    row: [r1 - rlen, r2 - rlen],
                    column: [c1, c2],
                });
            } else if (stc > c1 && edc < c2) {
                let range = [
                    { row: [r1, r2], column: [c1, stc - 1] },
                    { row: [r1, r2], column: [edc + 1, c2] },
                    { row: [r1 - rlen, r2 - rlen], column: [stc, edc] },
                ];
                newRange = newRange.concat(range);
            } else if (stc > c1) {
                let range = [
                    { row: [r1, r2], column: [c1, stc - 1] },
                    { row: [r1 - rlen, r2 - rlen], column: [stc, c2] },
                ];
                newRange = newRange.concat(range);
            } else if (edc < c2) {
                let range = [
                    { row: [r1 - rlen, r2 - rlen], column: [c1, edc] },
                    { row: [r1, r2], column: [edc + 1, c2] },
                ];
                newRange = newRange.concat(range);
            }
        } else if (edr >= r1) {
            if (str <= r1 && edr >= r2) {
                if (stc > c1 && edc < c2) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                    ];
                    newRange = newRange.concat(range);
                } else if (stc > c1) {
                    let range = [{ row: [r1, r2], column: [c1, stc - 1] }];
                    newRange = newRange.concat(range);
                } else if (edc < c2) {
                    let range = [{ row: [r1, r2], column: [edc + 1, c2] }];
                    newRange = newRange.concat(range);
                }
            } else if (str > r1 && edr < r2) {
                if (stc <= c1 && edc >= c2) {
                    newRange.push({
                        row: [r1, r2 - rlen],
                        column: [c1, c2],
                    });
                } else if (stc > c1 && edc < c2) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                        { row: [r1, r2 - rlen], column: [stc, edc] },
                    ];
                    newRange = newRange.concat(range);
                } else if (stc > c1) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, r2 - rlen], column: [stc, c2] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edc < c2) {
                    let range = [
                        { row: [r1, r2 - rlen], column: [c1, edc] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (str > r1) {
                if (stc <= c1 && edc >= c2) {
                    newRange.push({
                        row: [r1, str - 1],
                        column: [c1, c2],
                    });
                } else if (stc > c1 && edc < c2) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                        { row: [r1, str - 1], column: [stc, edc] },
                    ];
                    newRange = newRange.concat(range);
                } else if (stc > c1) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, str - 1], column: [stc, c2] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edc < c2) {
                    let range = [
                        { row: [r1, str - 1], column: [c1, edc] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (edr < r2) {
                if (stc <= c1 && edc >= c2) {
                    newRange.push({
                        row: [r1 - rlen, r2 - rlen],
                        column: [c1, c2],
                    });
                } else if (stc > c1 && edc < c2) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                        { row: [r1 - rlen, r2 - rlen], column: [stc, edc] },
                    ];
                    newRange = newRange.concat(range);
                } else if (stc > c1) {
                    let range = [
                        { row: [r1, r2], column: [c1, stc - 1] },
                        { row: [r1 - rlen, r2 - rlen], column: [stc, c2] },
                    ];
                    newRange = newRange.concat(range);
                } else if (edc < c2) {
                    let range = [
                        { row: [r1 - rlen, r2 - rlen], column: [c1, edc] },
                        { row: [r1, r2], column: [edc + 1, c2] },
                    ];
                    newRange = newRange.concat(range);
                }
            }
        }
    }

    return newRange;
}

export { luckysheetextendtable, luckysheetextendData, luckysheetdeletetable, luckysheetDeleteCell };
