import { getcellvalue } from './getdata';

const luckysheetArray = {
    transpose: function (getdata, useGetcellValue=true) {
        let arr = [];
        if (getdata.length == 0) {
            return [];
        }

        if (getdata[0].length == 0) {
            return [];
        }

        for (let c = 0; c < getdata[0].length; c++) {
            let a = [];
            for (let r = 0; r < getdata.length; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    if(useGetcellValue){
                        value = getcellvalue(r, c, getdata);
                    }
                    else{
                        value = getdata[r][c];
                    }
                }
                a.push(value);
            }
            arr.push(a);
        }

        return arr;
    },
    minusClear: function(p, m){
        if(m.row[0] > p.row[1] || m.row[1] < p.row[0] || m.column[0] > p.column[1] || m.column[1] < p.column[0]){
            return null;
        }

        if(m.row[0] == p.row[0] && m.row[1] < p.row[1] && m.column[0] > p.column[0] && m.column[1] < p.column[1]){
            return [];
        }

        let ret = [], range = {row:[], column:[]};

        let row1 = null, column1 = [p.column[0], p.column[1]];
        if(m.row[1] > p.row[0] && m.row[1] < p.row[1]){
            row1 = [m.row[1] + 1, p.row[1]];
        }
        else if(m.row[0] > p.row[0] && m.row[0] < p.row[1]){
            row1 = [p.row[0], m.row[0] - 1];
        }

        if(row1 != null){
            ret.push({"row": row1, "column": column1});
        }

        let row2 = [p.row[0], p.row[1]], column2 = null;
        if(m.column[1] > p.column[0] && m.column[1] < p.column[1]){
            column2 = [m.column[1] + 1, p.column[1]];
        }
        else if(m.column[0] > p.column[0] && m.column[0] < p.column[1]){
            column2 = [p.column[0], m.column[0] - 1];
        }

        if(column2 != null){
            ret.push({"row": row2, "column": column2});
        }

        return ret;
    }
}

export default luckysheetArray;