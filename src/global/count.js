import Store from '../store';
import { getdatabyselectionNoCopy } from '../global/getdata';
import { isRealNull, isRealNum } from '../global/validate';

let luckysheet_select_save = Store.luckysheet_select_save;

//表格计数栏
export function countfunc() {
    if(luckysheet_select_save.length == 0){
        return;
    }

    let min = Infinity,   //最小值
    	max = -Infinity,  //最大值
    	sum = 0,          //求和 
    	count = 0,        //计数（非空单元格）
    	mean = 0;         //平均值

    for(let s = 0; s < luckysheet_select_save.length; s++){
        let data = getdatabyselectionNoCopy(luckysheet_select_save[s]);

        for (let r = 0; r < data.length; r++) {
            for (let c = 0; c < data[0].length; c++) {
                if(isRealNull(data[r][c])){
                    continue;
                }

                count++;

                if(data[r][c].ct != null && data[r][c].ct.t == "d"){
                    continue;
                }

                var value = data[r][c].v;

                if(!isRealNum(value)){
                    continue;
                }

                value = parseFloat(value);

                sum += value;

                if(value < min){
                    min = value;
                }

                if(value > max){
                    max = value;
                }
            }
        }
    }

    var ret = "";
    ret += "<span>计数:" + count + "</span>";

    // if (sum != 0 && (isFinite(max) || isFinite(min))) {
    if (isFinite(max) || isFinite(min)) {
        //ret += "<span>求和:" + luckysheet.numFormat(sum) + "</span>";
        //ret += "<span>平均值:" + luckysheet.numFormat(sum / count, 4) + "</span>";

        //new runze 
        //处理成亿万格式
        // ret += "<span>求和:" + luckysheet.mask.update("w", luckysheet.numFormat(sum)) + "</span>";
        ret += "<span>求和:" + luckysheet.mask.update("w", sum) + "</span>";
        // ret += "<span>平均值:" + luckysheet.mask.update("w", luckysheet.numFormat(sum / count, 4)) + "</span>";
        ret += "<span>平均值:" + luckysheet.mask.update("w", Math.round(sum / count * 10000) / 10000) + "</span>";
    }

    if (isFinite(max)) {
        //ret += "<span>最大值:" + luckysheet.numFormat(max) + "</span>";
        // ret += "<span>最大值:" + luckysheet.mask.update("w", luckysheet.numFormat(max)) + "</span>";
        ret += "<span>最大值:" + luckysheet.mask.update("w", max) + "</span>";
    }

    if (isFinite(min)) {
        //ret += "<span>最小值:" + luckysheet.numFormat(min) + "</span>";
        // ret += "<span>最小值:" + luckysheet.mask.update("w", luckysheet.numFormat(min)) + "</span>";
        ret += "<span>最小值:" + luckysheet.mask.update("w", min) + "</span>";
    }
    $("#luckysheet-sta-content").html(ret);
}
