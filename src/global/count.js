import Store from '../store';
import { getdatabyselectionNoCopy } from './getdata';
import { isRealNull, isRealNum } from './validate';
import { update } from './format';

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

                let value = data[r][c].v;

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

    let ret = "";
    ret += "<span>计数:" + count + "</span>";

    //处理成亿万格式
    if (isFinite(max) || isFinite(min)) {
        ret += "<span>求和:" + update("w", sum) + "</span>";
        ret += "<span>平均值:" + update("w", Math.round(sum / count * 10000) / 10000) + "</span>";
    }

    if (isFinite(max)) {
        ret += "<span>最大值:" + update("w", max) + "</span>";
    }

    if (isFinite(min)) {
        ret += "<span>最小值:" + update("w", min) + "</span>";
    }

    $("#luckysheet-sta-content").html(ret);
}
