import luckysheetConfigsetting from '../controllers/luckysheetConfigsetting';
import Store from '../store';

export const error = {
    v: "#VALUE!",    //错误的参数或运算符
    n: "#NAME?",     //公式名称错误
    na: "#N/A",      //函数或公式中没有可用数值
    r: "#REF!",      //删除了由其他公式引用的单元格
    d: "#DIV/0!",    //除数是0或空单元格
    nm: "#NUM!",     //当公式或函数中某个数字有问题时
    nl: "#NULL!",    //交叉运算符（空格）使用不正确
    sp: "#SPILL!"    //数组范围有其它值
}

//是否是空值
function isRealNull(val) {
    if(val == null || val.toString().replace(/\s/g, "") == ""){
        return true;
    }
    else{
        return false;
    }
}

//是否是纯数字
function isRealNum(val) {
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
function valueIsError(value) {
    let isError = false;

    for(let x in error){
        if(value == error[x]){
            isError = true;
            break;
        }
    }

    return isError;
}

//是否有中文
function hasChinaword(s) {
    let patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    
    if (!patrn.exec(s)) {
        return false;
    }
    else {
        return true;
    }
}

//是否为非编辑模式
function isEditMode() {
    if(luckysheetConfigsetting.editMode){
        return true;
    }
    else{
        return false;
    }
}

/**
 * @description: 检查是否允许前台进行表格编辑
 * @param {*}
 * @return {Boolean} true:允许编辑 fasle:不允许
 */
function checkIsAllowEdit(){
    if (Store.allowEdit) {
        return true;
    }
    else {
        return false;
    }
}

//范围是否只包含部分合并单元格
function hasPartMC(cfg, r1, r2, c1, c2) {
    let hasPartMC = false;

    for(let x in Store.config["merge"]){
        let mc = cfg["merge"][x];

        if(r1 < mc.r){
            if(r2 >= mc.r && r2 < (mc.r + mc.rs - 1)){
                if(c1 >= mc.c && c1 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c2 >= mc.c && c2 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 < mc.c && c2 > (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
            }
            else if(r2 >= mc.r && r2 == (mc.r + mc.rs - 1)){
                if(c1 > mc.c && c1 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c2 > mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 == mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 > mc.c && c2 == (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
            }
            else if(r2 > (mc.r + mc.rs - 1)){
                if(c1 > mc.c && c1 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c2 >= mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 == mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 > mc.c && c2 == (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
            }
        }
        else if(r1 == mc.r){
            if(r2 < (mc.r + mc.rs - 1)){
                if(c1 >= mc.c && c1 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c2 >= mc.c && c2 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 < mc.c && c2 > (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
            }
            else if(r2 >= (mc.r + mc.rs - 1)){
                if(c1 > mc.c && c1 <= (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c2 >= mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 == mc.c && c2 < (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
                else if(c1 > mc.c && c2 == (mc.c + mc.cs - 1)){
                    hasPartMC = true;
                    break;
                }
            }
        }
        else if(r1 <= (mc.r + mc.rs - 1)){
            if(c1 >= mc.c && c1 <= (mc.c + mc.cs - 1)){
                hasPartMC = true;
                break;
            }
            else if(c2 >= mc.c && c2 <= (mc.c + mc.cs - 1)){
                hasPartMC = true;
                break;
            }
            else if(c1 < mc.c && c2 > (mc.c + mc.cs - 1)){
                hasPartMC = true;
                break;
            }
        }
    }

    return hasPartMC;
}

//获取单个字符的字节数
function checkWordByteLength(value) {
    return Math.ceil(value.charCodeAt().toString(2).length / 8);
 }
 

export {
    isRealNull,
    isRealNum,
    valueIsError,
    hasChinaword,
    isEditMode,
    checkIsAllowEdit,
    hasPartMC,
    checkWordByteLength
}