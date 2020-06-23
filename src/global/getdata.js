import Store from '../store';

let config = Store.config;
let flowdata = Store.flowdata;

export function getdatabyselectionNoCopy(range) {
    if (range == null || range["row"] == null || range["row"].length == 0) {
        return [];
    }

    var data = [];

    for (var r = range["row"][0]; r <= range["row"][1]; r++) {
        var row = [];
        
        if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
            continue;
        }

        for (var c = range["column"][0]; c <= range["column"][1]; c++) {
            var value = "";

            if (flowdata[r] != null && flowdata[r][c] != null) {
                value = flowdata[r][c];
            }

            row.push(value);
        }
        
        data.push(row);
    }

    return data;
}