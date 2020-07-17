import functionlist from './functionlist';

const luckysheet_function = {};

for (let i = 0; i < functionlist.length; i++) {
    let func = functionlist[i];
    luckysheet_function[func.n] = func;
}

window.luckysheet_function = luckysheet_function; //挂载window 用于 eval() 计算公式

export default luckysheet_function;