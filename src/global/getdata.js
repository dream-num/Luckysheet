import { getObjType } from '../utils/util';
import { functionHTMLGenerate } from './formula';
import Store from '../store';

let luckysheetfile = Store.luckysheetfile;
let flowdata = Store.flowdata;
let config = Store.config;

//获取选区范围值
export function getdatabyselectionNoCopy(range) {
    if (range == null || range["row"] == null || range["row"].length == 0) {
        return [];
    }

    let data = [];

    for (let r = range["row"][0]; r <= range["row"][1]; r++) {
        let row = [];
        
        if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
            continue;
        }

        for (let c = range["column"][0]; c <= range["column"][1]; c++) {
            let value = "";

            if (flowdata[r] != null && flowdata[r][c] != null) {
                value = flowdata[r][c];
            }

            row.push(value);
        }
        
        data.push(row);
    }

    return data;
}

//得到单元格的值
export function getcellvalue(r, c, data, type) {
    if (type == null) {
        type = "v";
    }

    if (data == null) {
        data = flowdata;
    }

    let d_value;

    if (r != null && c != null) {
        d_value = data[r][c];
    }
    else if (r != null) {
        d_value = data[r];
    }
    else if (c != null) {
        let newData = data[0].map(function(col, i) {
            return data.map(function(row) {
                return row[i];
            })
        });
        d_value = newData[c];
    }
    else {
        return data;
    }

    let retv = d_value;

    if(getObjType(d_value) == "object"){
        retv = d_value[type];

        if (type == "f" && retv != null) {
            retv = functionHTMLGenerate(retv);
        }
        else if(type == "f") {
            retv = d_value["v"];
        }
        else if(d_value && d_value.ct && d_value.ct.fa == 'yyyy-MM-dd') {
            retv = d_value.m
        }
    }

    if(retv == undefined){
        retv = null;
    }

    return retv;
}
