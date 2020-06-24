import { error } from './formula';

//是否是空值
export function isRealNull(val) {
    if(val == null || val.toString().replace(/\s/g, "") == ""){
        return true;
    }
    else{
        return false;
    }
}

//是否是纯数字
export function isRealNum(val) {
    if(val == null || val.toString().replace(/\s/g, "") === ""){
        return false;
    }

    if(typeof val == "boolean"){
        return false;
    }

    if(!isNaN(val)){
        return true;
    }
    else{
        return false;
    }
}

//是否是错误类型
export function valueIsError(value) {
    let isError = false;

    for(let x in error){
        if(value == error[x]){
            isError = true;
            break;
        }
    }

    return isError;
}