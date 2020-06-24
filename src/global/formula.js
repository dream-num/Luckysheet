import { ABCatNum } from '../utils/util';
import { luckyColor } from '../controllers/constant';

export const formula = {
    error: {
        v: "#VALUE!",    //错误的参数或运算符
        n: "#NAME?",     //公式名称错误
        na: "#N/A",      //函数或公式中没有可用数值
        r: "#REF!",      //删除了由其他公式引用的单元格
        d: "#DIV/0!",    //除数是0或空单元格
        nm: "#NUM!",     //当公式或函数中某个数字有问题时
        nl: "#NULL!",    //交叉运算符（空格）使用不正确
        sp: "#SPILL!"    //数组范围有其它值
    },
    errorInfo: function(err) {
        return err;
    },
    errorParamCheck: function(thisp, data, i) {
        if(i < thisp.length){
            var type = thisp[i].type;
            var require = thisp[i].require;
        }
        else{
            var type = thisp[thisp.length - 1].type;
            var require = thisp[thisp.length - 1].require;
        }

        if(require == "o" && (data == null || data == "")){
            return [true, "成功"];
        }

        if(type.indexOf("all") > -1){
            return [true, "成功"];
        }
        else{
            if(type.indexOf("range") > -1 && (luckysheet.getObjType(data) == "object" || luckysheet.getObjType(data) == "array")){
                return [true, "成功"];
            }

            if(type.indexOf("number") > -1 && (luckysheet.func_methods.isRealNum(data) || luckysheet.getObjType(data) == "boolean")){
                return [true, "成功"];
            }
            
            if(type.indexOf("string") > -1 && luckysheet.getObjType(data) == "string"){
                return [true, "成功"];
            }

            if(type.indexOf("date") > -1 && luckysheet.datecontroll.isdatetime(data)){
                return [true, "成功"];
            }

            return [false, "参数类型错误"];
        }
    },
    getPureValueByData:function(data){
        if(data.length == 0){
            return [];
        }

        var output = [];

        if(luckysheet.getObjType(data) == "array"){
            if(luckysheet.getObjType(data[0]) == "array"){
                for(var r = 0; r < data.length; r++){
                    var row = [];

                    for(var c = 0; c < data[0].length; c++){
                        var cell = data[r][c];

                        if(luckysheet.getObjType(cell) == "object"){
                            row.push(cell.v);
                        }
                        else{
                            row.push(cell);
                        }
                    }

                    output.push(row);
                }
            }
            else{
                for(var i = 0; i < data.length; i++){
                    var cell = data[i];

                    if(luckysheet.getObjType(cell) == "object"){
                        output.push(cell.v);
                    }
                    else{
                        output.push(cell);
                    }
                }
            }
        }
        else {
            var cell = data;

            if(luckysheet.getObjType(cell) == "object"){
                output.push(cell.v);
            }
            else{
                output.push(cell);
            }
        }

        return output;
    },
    //sparklines添加
    readCellDataToOneArray:function(rangeValue){
        if(rangeValue == null){
            return [];
        }

        if(luckysheet.getObjType(rangeValue) != "object"){
            return [rangeValue];
        }

        var dataformat = [];

        var data = [];

        if(rangeValue != null && rangeValue.data != null){
            data = rangeValue.data;
        }
        else if(rangeValue != null && !luckysheet.func_methods.isRealNull(rangeValue.v)){
            return [rangeValue.v];
        }
        else{
            return [];
        }

        //适配excel的动态数组格式，{1，2，3，4，5}或者{{1，2，3}，{4，5，6}，{7，8，9}}
        if(luckysheet.getObjType(data) == "array"){
            data = luckysheet.formula.getPureValueByData(data);
        }
        else if(luckysheet.getObjType(data) == "object"){
            data = data.v;

            return [data];
        }
        else{
            if(/\{.*?\}/.test(data)){
                data = data.replace(/\{/g, "[").replace(/\}/g, "]");
            }

            data = eval('('+ data +')');
        }

        //把二维数组转换为一维数组，sparklines要求数据格式为一维数组
        //var dataformat = [];
        if(luckysheet.getObjType(data[0]) == "array"){
            for(var i = 0; i < data.length; i++){
                dataformat = dataformat.concat(data[i]);
            }
        }
        else{
            dataformat = data;
        }

        return dataformat;
    },
    //sparklines添加
    //获得函数里某个参数的值，使用此函数需要在函数中执行luckysheet_getValue方法
    getValueByFuncData:function(value, arg){
        if(value == null){
            return null;
        }

        var _this = this;
        
        if(luckysheet.getObjType(value) == "array"){
            if(arg == "avg"){
                return window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, value);
            }
            else if(arg == "sum"){
                return window.luckysheet_function.SUM.f.apply(window.luckysheet_function.SUM, value);
            }
            else{
                if(luckysheet.getObjType(value[0]) == "object"){
                    return luckysheet.mask.getValueByFormat(value[0]);
                }
                else{
                    return value[0];
                }
            }
        }
        else if(luckysheet.getObjType(value) == "object"){
            return luckysheet.mask.getValueByFormat(value);
        }
        else{
            return value;
        }
    },
    //sparklines添加
    sparklinesColorMap:function(args, len){
        var colorLists = null;
        
        if(len == null){
            len = 5;
        }

        var index = 0;
        
        if(args.length > len){
            for(var i = len; i < args.length; i++){
                var colorMap = args[i];
                var colorListArray = luckysheet.formula.readCellDataToOneArray(colorMap);

                for(var a = 0; a < colorListArray.length; a++){
                    var ca = colorListArray[a];

                    if(ca.indexOf(":") > -1){
                        if(!colorLists){
                            colorLists = {};
                        }

                        var calist = ca.split(":");

                        if(calist.length == 2){
                            colorLists[calist[0]] = calist[1];
                        }
                        else if(calist.length > 1){
                            colorLists[calist[0] + ":" + calist[1]] = calist[2];
                        }
                    }
                    else{
                        if(!colorLists){
                            colorLists = [];
                        }

                        colorLists.push(ca);
                    }
                }

                index++;
            }
        }

        return colorLists;
    },
    //sparklines添加
    colorList:["#2ec7c9", "#fc5c5c", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],
    classlist: {
        "province": {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        }
    },
    oldvalue: null,
    dontupdate: function() {
         luckysheetCellUpdate.length = 0; //clear array
        $("#luckysheet-functionbox-cell, #luckysheet-rich-text-editor").html(this.oldvalue);
        //luckysheet.formula.rangestart = false;
        this.cancelNormalSelected();
        if (luckysheet.formula.rangetosheet != luckysheet.currentSheetIndex) {
            luckysheet.sheetmanage.changeSheetExec(luckysheet.formula.rangetosheet);
        }
        //luckysheetMoveHighlightCell("down", 0);
    },
    fucntionboxshow: function(r, c) {
        var d = luckysheet.flowdata;
        var value = "";

        if (d[r] != null && d[r][c] != null && d[r][c].v != null) {
            var cell = d[r][c];
            if(cell.f!=null){
                value = luckysheet.getcellvalue(r, c, d, "f");
            }
            else{
                value = luckysheet.mask.valueShowEs(r, c, d);
            }
        }

        this.oldvalue = value;
        $("#luckysheet-functionbox-cell").html(value);
    },
    //获得某个单元格或区域的偏移一定距离后的单元格( Sheet1!B6:C8 格式)
    cellOffset:function(range,rows,cols,height,width){// 参数：range or cell , rows,cols,height,width
        var startCell = range.startCell;
        var rowl = range.rowl;
        var coll = range.coll;
        var startCellRow = parseInt(startCell.replace(/[^0-9]/g, ""));
        var startCellCol = luckysheet.luckysheetABCatNum(startCell.replace(/[^A-Za-z]/g, ""));

        var row = [],col = [],offsetRange;
        row[0] = startCellRow + rows;
        col[0] = startCellCol + cols;

        row[1] = row[0] + height - 1;
        col[1] = col[0] + width - 1;

        col[0] = luckysheet.luckysheetchatatABC(col[0]);
        col[1] = luckysheet.luckysheetchatatABC(col[1]);

        var cellF = col[0] + row[0];
        var cellL = col[1] + row[1];
        if(cellF == cellL){
            offsetRange =  range.sheetName + "!"+ cellF;
        }else{
            offsetRange = range.sheetName + "!"+ cellF + ":" + cellL;
        }
        return offsetRange;
    },
    parseDatetoNum:function(date){ //函数中获取到时间格式或者数字形式统一转化为数字进行运算 
        if(typeof(date) == "object" && typeof date.v == "number"){
            date = date.v;
        }else if(luckysheet.isdatatype(date) == "num"){
            date = parseFloat(date);
        }else if(luckysheet.isdatatype(date) == "date"){
            date = luckysheet.mask.genarate(date)[2];
        }else{
            return luckysheet.formula.error.v;
        }
        return date;
    },
    //获取一维数组
    getRangeArray:function(range){
        var rangeNow = [];
        var fmt = "General";
        if(range.length == 1){ //一行
            for(var c = 0;c < range[0].length;c++){
                if(range[0][c] != null && range[0][c].v){
                    rangeNow.push(range[0][c].v);
                    var f = range[0][c].ct.fa;
                    fmt = (fmt == "General") ? f : fmt;
                }else{
                    //若单元格为null或为空，此处推入null（待考虑是否使用"null"）
                    rangeNow.push(null);
                }
                
            }
        }else if(range[0].length == 1){ //一列
              
              for(var r = 0;r < range.length;r++){
                if(range[r][0] != null && range[r][0].v){
                    rangeNow.push(range[r][0].v);
                    var f = range[r][0].ct.fa;
                    fmt = (fmt == "General") ? f : fmt;
                }else{
                    rangeNow.push(null);
                }
                
              }
        }else{
            for(var r = 0;r < range.length;r++){
                for(var c = 0;c < range[r].length;c++){
                    if(range[r][c] != null && range[r][c].v){
                        rangeNow.push(range[r][c].v);
                        var f = range[r][c].ct.fa;
                        fmt = (fmt == "General") ? f : fmt;
                    }else{
                        rangeNow.push(null);
                    }
                }
            }
        }
        range = rangeNow;
        return [range,fmt];
    },
    //获取二维数组：qksheet格式[[{v,m,ct}] ==> [1]
    getRangeArrayTwo:function(range){
            var data = $.extend(true, [], range);
            if(data.length == 1){ //一行
                for(var c = 0;c < data[0].length;c++){
                    if(data[0][c] instanceof Object){
                        if(data[0][c] != null && data[0][c] instanceof Object && !!data[0][c].m){
                            data[0][c] = data[0][c].m;
                        }else{
                            if(data[0][c] != null && data[0][c] instanceof Object && !!data[0][c].v){
                                data[0][c] = data[0][c].v;
                            }else{
                                data[0][c] = null;
                            }
                            
                        }
                    }
                    
                    
                }
            }else if(data[0].length == 1){ //一列
                  
                  for(var r = 0;r < data.length;r++){
                    if(data[r][0] instanceof Object){
                        if(data[r][0] != null && data[r][0] instanceof Object && !!data[r][0].m){
                            data[r][0] = data[r][0].m;
                        }else{
                            if(data[r][0] != null && data[r][0] instanceof Object && !!data[r][0].v){
                                data[r][0] = data[r][0].v;
                            }else{
                                data[r][0] = null;
                            }
                        }
                    }
                    
                    
                  }
            }else{
                for(var r = 0;r < data.length;r++){
                    for(var c = 0;c < data[r].length;c++){
                        if(data[r][c] instanceof Object){
                            if(data[r][c] != null && data[r][c] instanceof Object && !!data[r][c].m){
                                data[r][c] = data[r][c].m;
                            }else{
                                if(data[r][c] != null && data[r][c] instanceof Object && !!data[r][c].v){
                                    data[r][c] = data[r][c].v;
                                }else{
                                    data[r][c] = null;
                                }
                            }
                        }
                        
                    }
                }
            }
            return data;
    },
    isWildcard:function(a, b){ //正则匹配通配符: * ? ~* ~?,a目标参数，b通配符
        a = a.toString();
        b = b.toString();
      
        if(luckysheet.formula.isCompareOperator(b).flag){
            b = luckysheet.formula.isCompareOperator(b).num;
        }
        var str = "";
        for(var i = 0;i < b.length;i++){
            var v = b.charAt(i);
        
            if(v == "*" ){
                str += ".*";
            }
            else if(v == "?"){
                str += ".";
            }
            else if(v == "~"){
                if(b.charAt(i+1) == "*"){
                    str += "\\*";
                    i++;
                }
                else if(b.charAt(i+1) == "?"){
                    str += "\\?";
                    i++;
                }
                else{
                    str += "~";
                }
            }
            else{
                str += v;
            }
        }
      
        var reg = new RegExp("^" + str + "$","g");
        return !!a.match(reg);
    },
    isCompareOperator:function(str){ //判断前一个或者两个字符是否是比较运算符
        str = str.toString();
        var ope = ""; //存放比较运算符
        var num = ""; //截取比较运算符之后的数字用于实际比较
        var strOne = str.substr(0,1); 
        var strTwo = str.substr(1,1);
        var flag = false;
        var ret;

        if(strOne == ">"){
            if(strTwo == "="){
                ope = str.substr(0,2);
                num = str.substr(2);
                flag = true;
            }else if(strTwo != "="){
                ope = str.substr(0,1);
                num = str.substr(1);
                flag = true;
            }
        }else if(strOne == "<"){
            if(strTwo == "=" || strTwo == ">"){
                ope = str.substr(0,2);
                num = str.substr(2);
                flag = true;
            }else if(strTwo != "=" && strTwo != ">"){
                ope = str.substr(0,1);
                num = str.substr(1);
                flag = true;
            }
        }else if(strOne == "=" && strTwo != "="){
            ope = str.substr(0,1);
            num = str.substr(1);
            flag = true;
        }
        ret = {"flag":flag,"ope":ope,"num":num};
        //console.log("字符串：",flag,ope,num);
        return ret;
    },
    acompareb:function(a, b){ //a 与 b比较，b可为含比较符，通配符
        var bFirst;
        var flag = false;

        // if(luckysheet.isdatatype(b) == "num"){
        if(luckysheet.func_methods.isRealNum(b)){
            flag = luckysheet_compareWith(a,"==",b);
        }
        else if(typeof(b) == "string"){ //条件输入字符串，如：">233"
            if(b.indexOf("*") != -1 || b.indexOf("?") != -1){ // 正则匹配：输入通配符："黑*","白?",以及"白?黑*~*"
                //通配符函数
                return luckysheet.formula.isWildcard(a,b);
            }
            else if(luckysheet.formula.isCompareOperator(b).flag){ //"黑糖"
                var ope = luckysheet.formula.isCompareOperator(b).ope;
                var num = luckysheet.formula.isCompareOperator(b).num;
                flag = luckysheet_compareWith(a,ope,num);
            }
            else{
                flag = luckysheet_compareWith(a,"==",b);
            }
        }
        return flag;
    },
    compareParams:function(fp,sp,sym){  //比较两个字符串或者数字的大小，支持比较对象,暂不支持数组
        var flag = false;
        //判断a和b的数据类型
        var classNameA=toString.call(fp),
            classNameB=toString.call(sp);
        if(sym == ">"){
            if(fp > sp){flag = true;}
        }
        else if(sym == ">="){
            if(fp >= sp){flag = true;}
        }
        else if(sym == "<"){
            if(fp < sp){flag = true;}
        }
        else if(sym == "<="){
            if(fp <= sp){flag = true;}
        }
        else if(sym == "="){
            if(fp == sp){flag = true;}
        }else if(sym == "<>"){
            if(fp != sp){flag = true;}
        }

        //对象类型比较相等
        if(classNameA == '[object Object]' && classNameB == '[object Object]'){
            //获取a和b的属性长度
            var propsA = Object.getOwnPropertyNames(fp),
                propsB = Object.getOwnPropertyNames(sp);
            if(propsA.length != propsB.length){
              return false;
            }
            for(var i=0;i<propsA.length;i++){
              var propName=propsA[i];
              //如果对应属性对应值不相等，则返回false
              if(fp[propName] !== sp[propName]){
                return false;
              }
            }
            return true;
        }
        //数组类型
          if(classNameA == '[object Array]' && classNameB == '[object Array]'){
            if(fp.toString() == sp.toString()){
              return true;
            }
            return false;
          }
        
        return flag;
    },
    parseDecimal:function(num){
        var num = parseFloat(num);
        var d = parseInt(num,10);
        if(d == 0){
            return num;
        }
        num = num % d;
        return num;
    },
    getcellrange: function(txt) {
        var val = txt.split("!");

        var sheettxt = "",
            rangetxt = "",
            sheetIndex = -1,
            sheetdata = null;
        
        var luckysheetfile = luckysheet.getluckysheetfile();

        if (val.length > 1) {
            sheettxt = val[0];
            rangetxt = val[1];
            
            for (var i in luckysheetfile) {
                if (sheettxt == luckysheetfile[i].name) {
                    sheetIndex = luckysheetfile[i].index;
                    sheetdata = luckysheetfile[i].data;
                    break;
                }
            }
        } 
        else {
            var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
            sheettxt = luckysheetfile[index].name;
            sheetIndex = luckysheetfile[index].index;
            sheetdata = luckysheet.flowdata;
            rangetxt = val[0];
        }
        
        if (rangetxt.indexOf(":") == -1) {
            var row = parseInt(rangetxt.replace(/[^0-9]/g, "")) - 1;
            var col = luckysheet.luckysheetABCatNum(rangetxt.replace(/[^A-Za-z]/g, ""));
            if (!isNaN(row) && !isNaN(col)) {
                return {
                    "row": [row, row],
                    "column": [col, col],
                    "sheetIndex": sheetIndex
                };
            }
            //else if (!isNaN(row)) {
            //    return { "row": [row, row], "column": [0, sheetdata[0].length - 1], "sheetIndex": sheetIndex };
            //}
            //else if (!isNaN(col)) {
            //    return { "row": [0, sheetdata.length - 1], "column": [col, col], "sheetIndex": sheetIndex };
            //}
            else {
                return null;
            }
        } else {
            rangetxt = rangetxt.split(":");
            var row = [],col = [];
            //console.log(rangetxt[0].replace(/[^0-9]/, ""), rangetxt[1].replace(/[^0-9]/, ""), rangetxt);
            row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, "")) - 1;
            row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, "")) - 1;
            if (isNaN(row[0])) {
                row[0] = 0;
            }
            if (isNaN(row[1])) {
                row[1] = sheetdata.length - 1;
            }
            if (row[0] > row[1]) {
                return null;
            }
            col[0] = luckysheet.luckysheetABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ""));
            col[1] = luckysheet.luckysheetABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ""));
            if (isNaN(col[0])) {
                col[0] = 0;
            }
            if (isNaN(col[1])) {
                col[1] = sheetdata[0].length - 1;
            }
            if (col[0] > col[1]) {
                return null;
            }
            return {
                "row": row,
                "column": col,
                "sheetIndex": sheetIndex
            };
        }
    },
    rangeHightlightHTML: '<div id="luckysheet-formula-functionrange-highlight-${id}" rangeindex="${id}"  class="luckysheet-selection-highlight luckysheet-formula-functionrange-highlight"><div data-type="top" class="luckysheet-selection-copy-top luckysheet-copy"></div><div data-type="right" class="luckysheet-selection-copy-right luckysheet-copy"></div><div data-type="bottom" class="luckysheet-selection-copy-bottom luckysheet-copy"></div><div data-type="left" class="luckysheet-selection-copy-left luckysheet-copy"></div><div class="luckysheet-selection-copy-hc"></div><div data-type="lt" class="luckysheet-selection-highlight-topleft luckysheet-highlight"></div><div data-type="rt" class="luckysheet-selection-highlight-topright luckysheet-highlight"></div><div data-type="lb" class="luckysheet-selection-highlight-bottomleft luckysheet-highlight"></div><div data-type="rb" class="luckysheet-selection-highlight-bottomright luckysheet-highlight"></div></div>',
    createRangeHightlight: function() {
        var $span = $("#luckysheet-rich-text-editor").find("span.luckysheet-formula-functionrange-cell");
        $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove();

        $span.each(function() {
            var rangeindex = $(this).attr("rangeindex"),
                range = $(this).text();
            $("#luckysheet-formula-functionrange").append(luckysheet.replaceHtml(luckysheet.formula.rangeHightlightHTML, {
                "id": rangeindex
            }));
            var cellrange = luckysheet.formula.getcellrange(range);
            var rangeid = "luckysheet-formula-functionrange-highlight-" + rangeindex;

            if (cellrange == null) {} else if (cellrange.sheetIndex == luckysheet.currentSheetIndex || (cellrange.sheetIndex == -1 && luckysheet.formula.rangetosheet == luckysheet.currentSheetIndex)) {
                $("#" + rangeid).data("range", cellrange).find(".luckysheet-copy").css({
                    "background": luckyColor[rangeindex]
                }).end().find(".luckysheet-highlight").css({
                    "background": luckyColor[rangeindex]
                }).end().find(".luckysheet-selection-copy-hc").css({
                    "background": luckyColor[rangeindex]
                });
                luckysheet.seletedHighlistByindex(rangeid, cellrange.row[0], cellrange.row[1], cellrange.column[0], cellrange.column[1]);
            }
        });

        $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").show();
    },
    searchHTML: '<div id="luckysheet-formula-search-c" class="luckysheet-formula-search-c"></div>',
    helpHTML: '<div id="luckysheet-formula-help-c" class="luckysheet-formula-help-c"> <div class="luckysheet-formula-help-close" title="关闭"><i class="fa fa-times" aria-hidden="true"></i></div> <div class="luckysheet-formula-help-collapse" title="收起"><i class="fa fa-angle-up" aria-hidden="true"></i></div> <div class="luckysheet-formula-help-title"><div class="luckysheet-formula-help-title-formula"> <span class="luckysheet-arguments-help-function-name">SUM</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> <span class="luckysheet-arguments-help-parameter luckysheet-arguments-help-parameter-active" dir="auto">A2:A100</span>, <span class="luckysheet-arguments-help-parameter" dir="auto">101</span> </span> <span class="luckysheet-arguments-paren">)</span> </div></div> <div class="luckysheet-formula-help-content"> <div class="luckysheet-formula-help-content-example"> <div class="luckysheet-arguments-help-section-title">示例</div> <div class="luckysheet-arguments-help-formula"> <span class="luckysheet-arguments-help-function-name">SUM</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> <span class="luckysheet-arguments-help-parameter luckysheet-arguments-help-parameter-active" dir="auto">A2:A100</span>, <span class="luckysheet-arguments-help-parameter" dir="auto">101</span> </span> <span class="luckysheet-arguments-paren">)</span> </div> </div> <div class="luckysheet-formula-help-content-detail"> <div class="luckysheet-arguments-help-section"> <div class="luckysheet-arguments-help-section-title luckysheet-arguments-help-parameter-name">摘要</div> <span class="luckysheet-arguments-help-parameter-content">${detail}</span> </div> </div> <div class="luckysheet-formula-help-content-param"> ${param} </div> </div> <div class="luckysheet-formula-help-foot"></div></div>',
    getrangeseleciton: function() {
        var currSelection = window.getSelection();
        var anchor = $(currSelection.anchorNode);
        var anchorOffset = currSelection.anchorOffset;
        //console.log(anchor,anchorOffset, anchor.is("#luckysheet-functionbox-cell"), anchor.attr("id"));
        if (anchor.parent().is("span") && anchorOffset != 0) {
            var txt = $.trim(anchor.text()),
                lasttxt = "";
            if (txt.length == 0 && anchor.parent().prev().length > 0) {
                var ahr = anchor.parent().prev();
                txt = $.trim(ahr.text());
                lasttxt = txt.substr(txt.length - 1, 1);
                return ahr;
            } else {
                lasttxt = txt.substr(anchorOffset - 1, 1);
                return anchor.parent();
            }
        } else if (anchor.is("#luckysheet-rich-text-editor") || anchor.is("#luckysheet-functionbox-cell")) {
            var txt = $.trim(anchor.find("span").last().text()),lasttxt;
            if (txt.length == 0 && anchor.find("span").length > 1) {
                var ahr = anchor.find("span");
                txt = $.trim(ahr.eq(ahr.length - 2).text());
                return ahr;
            } else {
                return anchor.find("span").last();
            }
        } else if (anchor.parent().is("#luckysheet-rich-text-editor") || anchor.parent().is("#luckysheet-functionbox-cell") || anchorOffset == 0) {
            if (anchorOffset == 0) {
                anchor = anchor.parent();
            }
            if (anchor.prev().length > 0) {
                var txt = $.trim(anchor.prev().text());
                var lasttxt = txt.substr(txt.length - 1, 1);
                return anchor.prev();
            }
        }
        return null;
    },
    searchFunctionPosition: function($menu, $editor, x, y, isparam) {
        var winH = $(window).height(),
            winW = $(window).width();
        var menuW = $menu.outerWidth(),
            menuH = $menu.outerHeight();
        if (isparam == null) {
            isparam = false;
        }
        var top = y,
            left = x;
        if (x + menuW > winW) {
            left = x - menuW + $editor.outerWidth();
        } else {
            left = x;
        }
        if (y + menuH > winH) {
            top = y - menuH;
        } else {
            top = y + $editor.outerHeight();
            if (!isparam) {
                $menu.html($menu.find(".luckysheet-formula-search-item").get().reverse());
            }
        }
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        $menu.css({
            "top": top,
            "left": left
        }).show();
    },
    searchFunctionCell: null,
    searchFunction: function($editer) {
        //$editer.closest(".luckysheet-formula-text-color")
        var $cell = this.getrangeseleciton();
        this.searchFunctionCell = $cell;
        if ($cell == null || $editer == null) {
            return;
        }
        var searchtxt = $cell.text().toUpperCase();
        var reg = /^[a-zA-Z]|[a-zA-Z_]+$/;
        //console.log(searchtxt, !reg.test(searchtxt), $editer);
        if (!reg.test(searchtxt)) {
            return;
        }
        var result = {
                "f": [],
                "s": [],
                "t": []
            },
            result_i = 0;
        for (var i = 0; i < luckysheet.functionlist.length; i++) {
            var item = luckysheet.functionlist[i],
                n = item.n;
            //console.log(n, searchtxt);
            if (n == searchtxt) {
                result.f.unshift(item);
                result_i++;
            } else if (n.substr(0, searchtxt.length) == searchtxt) {
                result.s.unshift(item);
                result_i++;
            } else if (n.indexOf(searchtxt) > -1) {
                result.t.unshift(item);
                result_i++;
            }
            if (result_i >= 10) {
                break;
            }
        }
        //console.log(result, result_i);
        var list = result.t.concat(result.s.concat(result.f));
        if (list.length <= 0) {
            return;
        }
        var listHTML = this.searchFunctionHTML(list);
        $("#luckysheet-formula-search-c").html(listHTML).show();
        $("#luckysheet-formula-help-c").hide();
        var $c = $editer.parent(),
            offset = $c.offset();
        this.searchFunctionPosition($("#luckysheet-formula-search-c"), $c, offset.left, offset.top);
    },
    searchFunctionEnter: function($obj) {
        var functxt = $obj.data("func");
        luckysheet.formula.searchFunctionCell.text(functxt).after('<span dir="auto" class="luckysheet-formula-text-color">(</span>');
        luckysheet.formula.setCaretPosition(luckysheet.formula.searchFunctionCell.next().get(0), 0, 1);
        $("#luckysheet-formula-search-c").hide();
        this.helpFunctionExe(luckysheet.formula.searchFunctionCell.closest("div"), luckysheet.formula.searchFunctionCell.next());
    },
    searchFunctionHTML: function(list) {
        if ($("#luckysheet-formula-search-c").length == 0) {
            $("body").append(this.searchHTML);
            $("#luckysheet-formula-search-c").on("mouseover", ".luckysheet-formula-search-item", function() {
                $("#luckysheet-formula-search-c").find(".luckysheet-formula-search-item").removeClass("luckysheet-formula-search-item-active");
                $(this).addClass("luckysheet-formula-search-item-active");
            }).on("mouseout", ".luckysheet-formula-search-item", function() {}).on("click", ".luckysheet-formula-search-item", function() {
                if (luckysheet.formula.searchFunctionCell == null) {
                    return;
                }
                luckysheet.formula.searchFunctionEnter($(this));
            });
        }
        var itemHTML = '<div data-func="${n}" class="luckysheet-formula-search-item ${class}"><div class="luckysheet-formula-search-func">${n}</div><div class="luckysheet-formula-search-detail">${a}</div></div>';
        var retHTML = "";
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (i == list.length - 1) {
                retHTML += luckysheet.replaceHtml(itemHTML, {
                    "class": "luckysheet-formula-search-item-active",
                    "n": item.n,
                    "a": item.a
                });
            } else {
                retHTML += luckysheet.replaceHtml(itemHTML, {
                    "class": "",
                    "n": item.n,
                    "a": item.a
                });
            }
        }
        return retHTML;
    },
    functionlistPosition: {},
    helpFunction: function($editer, funcname, paramIndex) {
        
        var $func = luckysheet.functionlist[this.functionlistPosition[$.trim(funcname).toUpperCase()]];
        //console.log();
        if ($func == null) {
            return;
        }
        $("#luckysheet-formula-help-c .luckysheet-arguments-help-function-name").html($func.n);
        $("#luckysheet-formula-help-c .luckysheet-arguments-help-parameter-content").html($func.d);
        var helpformula = '<span class="luckysheet-arguments-help-function-name">${name}</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> ${param} </span> <span class="luckysheet-arguments-paren">)</span>';
        //luckysheet-arguments-help-parameter-active
        var helpformulaItem = '<span class="luckysheet-arguments-help-parameter" dir="auto">${param}</span>';
        var helpformulaArg = '<div class="luckysheet-arguments-help-section"><div class="luckysheet-arguments-help-section-title">${param}</div><span class="luckysheet-arguments-help-parameter-content">${content}</span></div>';
        //"n": "AVERAGE",
        //"t": "1",
        //"d": "返回数据集的算术平均值，对文本忽略不计。",
        //"a": "返回数据集的算术平均值",
        //"p": [{ "name": "数值1", "example": "A2:A100", "detail": "计算平均值时用到的第一个数值或范围。", "require": "m", "repeat": "n", "type": "rangenumber" },
        //    { "name": "数值2", "example": "B2:B100", "detail": "计算平均值时用到的其他数值或范围。", "require": "o", "repeat": "y", "type": "rangenumber" }
        //]
        var fht = "",
            ahf = "",
            fhcp = "";
        for (var i = 0; i < $func.p.length; i++) {
            var paramitem = $func.p[i];
            var name = paramitem.name,
                nameli = paramitem.name;
            if (paramitem.repeat == "y") {
                name += ", ...";
                nameli += '<span class="luckysheet-arguments-help-argument-info">...-可重复</span>';
            }
            if (paramitem.require == "o") {
                name = "[" + name + "]";
                nameli += '<span class="luckysheet-arguments-help-argument-info">-[可选]</span>';
            }
            fht += '<span class="luckysheet-arguments-help-parameter" dir="auto">' + name + '</span>, ';
            ahf += '<span class="luckysheet-arguments-help-parameter" dir="auto">' + paramitem.example + '</span>, ';
            fhcp += luckysheet.replaceHtml(helpformulaArg, {
                "param": nameli,
                "content": paramitem.detail
            });
        }
        fht = fht.substr(0, fht.length - 2);
        ahf = ahf.substr(0, ahf.length - 2);
        $("#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder").html(fht); //介绍
        $("#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder").html(ahf); //示例
        $("#luckysheet-formula-help-c .luckysheet-formula-help-content-param").html(fhcp); //参数
        if(paramIndex==null){
            $("#luckysheet-formula-help-c .luckysheet-formula-help-title-formula .luckysheet-arguments-help-function-name").css("font-weight", "bold");
        }
        else{
            $("#luckysheet-formula-help-c .luckysheet-formula-help-title-formula .luckysheet-arguments-help-function-name").css("font-weight", "normal");
            var index = paramIndex >= $func.p.length ? $func.p.length - 1 : paramIndex;
            $("#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter").removeClass("luckysheet-arguments-help-parameter-active");
            $("#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter").eq(index).addClass("luckysheet-arguments-help-parameter-active");
            $("#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter").removeClass("luckysheet-arguments-help-parameter-active");
            $("#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter").eq(index).addClass("luckysheet-arguments-help-parameter-active");
            $("#luckysheet-formula-help-c .luckysheet-formula-help-content-param .luckysheet-arguments-help-section").removeClass("luckysheet-arguments-help-parameter-active");
            $("#luckysheet-formula-help-c .luckysheet-formula-help-content-param .luckysheet-arguments-help-section").eq(index).addClass("luckysheet-arguments-help-parameter-active");
        }
        var $c = $editer.parent(),
            offset = $c.offset();
        this.searchFunctionPosition($("#luckysheet-formula-help-c"), $c, offset.left, offset.top, true);
    },
    helpFunctionExe: function($editer, currSelection) {
        if ($("#luckysheet-formula-help-c").length == 0) {
            $("body").after(this.helpHTML);
            $("#luckysheet-formula-help-c .luckysheet-formula-help-close").click(function() {
                $("#luckysheet-formula-help-c").hide();
            });
            $("#luckysheet-formula-help-c .luckysheet-formula-help-collapse").click(function() {
                var $content = $("#luckysheet-formula-help-c .luckysheet-formula-help-content");
                $content.slideToggle(100, function() {
                    var $c = luckysheet.formula.rangeResizeTo.parent(),
                        offset = $c.offset();
                    luckysheet.formula.searchFunctionPosition($("#luckysheet-formula-help-c"), $c, offset.left, offset.top, true);
                });
                if ($content.is(":hidden")) {
                    $(this).html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
                } else {
                    $(this).html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
                }
            });
            for (var i = 0; i < luckysheet.functionlist.length; i++) {
                this.functionlistPosition[luckysheet.functionlist[i].n] = i;
            }
        }

        if(!currSelection){
            return;
        }

        var $prev = currSelection,
            funcLen = $editer.length, 
            $span = $editer.find("span"),
            currentIndex = currSelection.index(),i = currentIndex;
        if ($prev == null) {
            return;
        }
        // while ($prev.text() != "(" && $prev.text() != "=" && $prev.length > 0) {
        //     // if (i > 0 && this.iscelldata($prev.text())) {
        //     //     paramindex++;
        //     // }
        //     if (i > 0 && $prev.attr("rangeindex") != null) {
        //         paramindex++;
        //     }
        //     $prev = $prev.prev();
        //     i++;
        // }

        var funcName = null, paramindex= null;
        if($span.eq(i).is(".luckysheet-formula-text-func")){
            funcName = $span.eq(i).text();
        }
        else{
            var $cur = null, exceptIndex = [-1, -1];
            while (--i > 0) {
                $cur = $span.eq(i);
                if($cur.is(".luckysheet-formula-text-func")  || $.trim($cur.text()).toUpperCase() in this.functionlistPosition){
                    funcName = $cur.text();
                    paramindex = null;
                    var endstate = true;
                    for(var a=i;a<=currentIndex;a++){
                        if(!paramindex){
                            paramindex = 0;
                        }
                        if(a>=exceptIndex[0] && a<=exceptIndex[1]){
                            continue;
                        }
                        $cur = $span.eq(a);
                        if($cur.is(".luckysheet-formula-text-rpar")){
                            exceptIndex = [i , a];
                            funcName = null;
                            endstate = false;
                            break;
                        }

                        if($cur.is(".luckysheet-formula-text-comma")){
                            paramindex++;
                        }
                    }

                    if(endstate){
                        break;
                    }
                }
            }
        }

        if(funcName==null){
            return;
        }
        
        this.helpFunction($editer, funcName, paramindex);
    },
    rangeHightlightselected: function($editer, kcode) {
        var currSelection = this.getrangeseleciton();
        $("#luckysheet-formula-search-c, #luckysheet-formula-help-c").hide();
        $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight .luckysheet-selection-copy-hc").css("opacity", "0.03");
        $("#luckysheet-formula-search-c, #luckysheet-formula-help-c").hide();
        this.helpFunctionExe($editer, currSelection);
        if ($(currSelection).closest(".luckysheet-formula-functionrange-cell").length == 0) {
            this.searchFunction($editer);
            return;
        }
        var $anchorOffset = $(currSelection).closest(".luckysheet-formula-functionrange-cell");
        //if (luckysheet.formula.israngeseleciton(true)) {
        //    var searchHTML = this.searchFunction($(currSelection));
        //    $("#luckysheet-formula-search-c").html(searchHTML);
        //}
        var rangeindex = $anchorOffset.attr("rangeindex");
        var rangeid = "luckysheet-formula-functionrange-highlight-" + rangeindex;
        $("#" + rangeid).find(".luckysheet-selection-copy-hc").css({
            "opacity": "0.13"
        });
    },
    updatecell: function(r, c) {
        var $input = $("#luckysheet-rich-text-editor"),
            value = $input.text();

        if (luckysheet.formula.rangetosheet != luckysheet.currentSheetIndex) {
            luckysheet.sheetmanage.changeSheetExec(luckysheet.formula.rangetosheet);
        }

        var curv = luckysheet.flowdata[r][c];

        if(luckysheet.func_methods.isRealNull(value)){
            if(curv == null || luckysheet.func_methods.isRealNull(curv.v)){
                this.cancelNormalSelected();
                return;
            }
        }
        else{
            if (luckysheet.getObjType(curv) == "object" && (value == curv.f || value == curv.v || value == curv.m)) {
                this.cancelNormalSelected();
                return;
            } 
            else if (value == curv) {
                this.cancelNormalSelected();
                return;
            }
        }

        if (value.slice(0, 1) == "=" && value.length > 1) {

        }
        else if(luckysheet.getObjType(curv) == "object" && curv.ct != null && curv.ct.fa != null && curv.ct.fa != "@" && !luckysheet.func_methods.isRealNull(value)){
            delete curv.m;//更新时间m处理 ， 会实际删除单元格数据的参数（flowdata时已删除）
            if(curv.f != null){ //如果原来是公式，而更新的数据不是公式，则把公式删除
                delete curv.f;
                delete curv.spl; //删除单元格的sparklines的配置串
            }
        }
        
        window.luckysheet_getcelldata_cache = null;
        
        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

        if (luckysheet.getObjType(curv) == "object") {
            if(luckysheet.getObjType(value) == "string" && value.slice(0, 1) == "=" && value.length > 1){
                var v = this.execfunction(value, r, c, true);

                curv = this.execFunctionGroupData[r][c];
                curv.f = v[2];

                //打进单元格的sparklines的配置串， 报错需要单独处理。
                if(v.length == 4 && v[3].type == "sparklines"){
                    delete curv.m;
                    delete curv.v;

                    var curCalv = v[3].data;

                    if(luckysheet.getObjType(curCalv) == "array" && luckysheet.getObjType(curCalv[0]) != "object"){
                        curv.v = curCalv[0];
                    }
                    else{
                        curv.spl = v[3].data;
                    }
                }
            }
            else{
                this.delFunctionGroup(r, c);
                this.execFunctionGroup(r, c, value);

                curv = this.execFunctionGroupData[r][c];

                delete curv.f;
                delete curv.spl;
            }

            value = curv;
        } 
        else {
            if(luckysheet.getObjType(value) == "string" && value.slice(0, 1) == "=" && value.length > 1){
                var v = this.execfunction(value, r, c, true);

                value = {
                    "v": v[1],
                    "f": v[2]
                };

                //打进单元格的sparklines的配置串， 报错需要单独处理。
                if(v.length == 4 && v[3].type == "sparklines"){
                    var curCalv = v[3].data;

                    if(luckysheet.getObjType(curCalv) == "array" && luckysheet.getObjType(curCalv[0]) != "object"){
                        value.v = curCalv[0];
                    }
                    else{
                        value.spl = v[3].data;
                    }
                }
            }
            else{
                this.delFunctionGroup(r, c);
                this.execFunctionGroup(r, c, value);
            }
        }

        luckysheet.setcellvalue(r, c, d, value);
        this.cancelNormalSelected();

        var RowlChange = false;
        if(d[r][c].tb == "2" && d[r][c].v != null){//自动换行
            var cfg = $.extend(true, {}, luckysheet.getluckysheetfile()[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["config"]);
            if(cfg["rowlen"] == null){
                cfg["rowlen"] = {};
            }

            var defaultrowlen = 19;

            var offlinecanvas = $("#luckysheetTableContentF").get(0).getContext("2d");
            var fontset = luckysheet.luckysheetfontformat(d[r][c]);
            offlinecanvas.font = fontset;

            var currentRowLen = defaultrowlen;
            if(cfg["rowlen"][r] != null){
                currentRowLen = cfg["rowlen"][r];
            }

            var strValue = luckysheet.getcellvalue(r,c,d).toString();
            var tbWidth = offlinecanvas.measureText(strValue).width;
            var cellWidth = luckysheet.colLocationByIndex(c)[1] - luckysheet.colLocationByIndex(c)[0] - 8;

            if(tbWidth > cellWidth){
                var strArr = [];//文本截断数组
                
                for(var strI = 1; strI <= strValue.length; strI++){
                    var strV = strValue.substring(strArr.join("").length,strI);
                    var strtextMetrics = offlinecanvas.measureText(strV).width;
                    if(strtextMetrics > cellWidth){
                        strArr.push(strValue.substring(strArr.join("").length, strI - 1));
                        strI = strI - 2;
                    }
                    else if(strtextMetrics <= cellWidth && strI == strValue.length){
                        strArr.push(strV);
                    }
                }

                var oneLineTextHeight = luckysheet.menuButton.getTextSize("田", fontset)[1];
                currentRowLen = oneLineTextHeight * strArr.length;
            }

            if(currentRowLen != defaultrowlen){
                cfg["rowlen"][r] = currentRowLen;
                RowlChange = true;
            }
        }
        
        if(RowlChange){
            luckysheet.jfrefreshgrid(d, [{"row": [r, r], "column": [c, c]}], cfg, null, RowlChange);
        }
        else{
            luckysheet.jfrefreshgrid(d, [{"row": [r, r], "column": [c, c]}]);
        }

        luckysheetCellUpdate.length = 0; //clear array
        this.execFunctionGroupData = null; //销毁
    },
    cancelNormalSelected: function() {
        this.canceFunctionrangeSelected();
        $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove();
        $("#luckysheet-input-box").removeAttr("style");
        $("#luckysheet-input-box-index").hide();
        $("#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm").removeClass("luckysheet-wa-calculate-active");
        luckysheet.formula.rangestart = false;
        luckysheet.formula.rangedrag_column_start = false;
        luckysheet.formula.rangedrag_row_start = false;
    },
    canceFunctionrangeSelected: function() {
        $("#luckysheet-formula-functionrange-select").hide();
        $("#luckysheet-row-count-show, #luckysheet-column-count-show").hide();
        // $("#luckysheet-cols-h-selected, #luckysheet-rows-h-selected").hide();
        $("#luckysheet-formula-search-c, #luckysheet-formula-help-c").hide();
    },
    iscellformat: function(txt) {
        var re_abc = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ][123456789]/;
    },
    iscelldata: function(txt) { //判断是否为单元格格式
        let val = txt.split("!"),
            rangetxt;

        if (val.length > 1) {
            rangetxt = val[1];
        } 
        else {
            rangetxt = val[0];
        }

        let reg_cell = /^(([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+))$/g; //增加正则判断单元格为字母+数字的格式：如 A1:B3
        let reg_cellRange = /^(((([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+)))|((([a-zA-Z]+)|([$][a-zA-Z]+))))$/g;//增加正则判断单元格为字母+数字或字母的格式：如 A1:B3，A:A
        
        if (rangetxt.indexOf(":") == -1) {
            let row = parseInt(rangetxt.replace(/[^0-9]/g, "")) - 1;
            let col = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ""));
            
            if (!isNaN(row) && !isNaN(col) && rangetxt.toString().match(reg_cell)) {
                return true;
            } 
            else if (!isNaN(row)) {
                return false;
            } 
            else if (!isNaN(col)) {
                return false;
            } 
            else {
                return false;
            }
        } 
        else {
            reg_cellRange = /^(((([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+)))|((([a-zA-Z]+)|([$][a-zA-Z]+)))|((([0-9]+)|([$][0-9]+s))))$/g;

            rangetxt = rangetxt.split(":");

            let row = [],col = [];
            row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, "")) - 1;
            row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, "")) - 1;
            if (row[0] > row[1]) {
                return false;
            }

            col[0] = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ""));
            col[1] = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ""));
            if (col[0] > col[1]) {
                return false;
            }

            if(rangetxt[0].toString().match(reg_cellRange) && rangetxt[1].toString().match(reg_cellRange)){
                return true;
            }
            else{
                return false;
            }
        }
    },
    operator: '==|!=|<>|<=|>=|=|+|-|>|<|/|*|%|&|^',
    operatorjson: null,
    functionCopy: function(txt, mode, step) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};

            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            luckysheet.formula.operatorjson = op;
        }

        if (mode == null) {
            mode = "down";
        }

        if (step == null) {
            step = 1;
        }

        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }

        var funcstack = txt.split("");
        //var i=0;i<funcstack.length;i++
        var i = 0,
            str = "",
            function_str = "",
            ispassby = true;
        
        var matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0
        };

        while (i < funcstack.length) {
            var s = funcstack[i];

            if (s == "(" && matchConfig.dquote == 0) {
                matchConfig.bracket += 1;

                if (str.length > 0) {
                    function_str += str + "(";
                } 
                else {
                    function_str += "(";
                }

                str = "";
            } 
            else if (s == ")" && matchConfig.dquote == 0) {
                matchConfig.bracket -= 1;
                //if (matchConfig.bracket == 0) {
                function_str += luckysheet.formula.functionCopy(str, mode, step) + ")";
                str = "";
                //}
            }
            //else if (s == "'" && matchConfig.dquote == 0) {
            //    if (matchConfig.squote > 0) {
            //        function_str += str + "'";
            //        matchConfig.squote -= 1;
            //        str = "";
            //    }
            //    else {
            //        matchConfig.squote += 1;
            //        str += "'";
            //    }
            //}
            else if (s == '"' && matchConfig.squote == 0) {
                if (matchConfig.dquote > 0) {
                    function_str += str + '"';
                    matchConfig.dquote -= 1;
                    str = "";
                } 
                else {
                    matchConfig.dquote += 1;
                    str += '"';
                }
            } 
            else if (s == ',' && matchConfig.dquote == 0) {
                //matchConfig.comma += 1;
                function_str += luckysheet.formula.functionCopy(str, mode, step) + ',';
                str = "";
            } 
            else if (s == '&' && matchConfig.dquote == 0) {
                if (str.length > 0) {
                    function_str += luckysheet.formula.functionCopy(str, mode, step) + "&";
                    str = "";
                } 
                else {
                    function_str += "&";
                }
            } 
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0) {
                var s_next = "";

                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                var p = i-1, s_pre = null;;
                if(p>=0){
                    do {
                        s_pre = funcstack[p--];
                    }
                    while (p>=0 && s_pre ==" ")
                }

                if ((s + s_next) in luckysheet.formula.operatorjson) {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.functionCopy(str, mode, step) + s + s_next;
                        str = "";
                    } 
                    else {
                        function_str += s + s_next;
                    }

                    i++;
                }
                else if(!(/[^0-9]/.test(s_next)) && s=="-" && (s_pre=="(" || s_pre == null || s_pre == "," || s_pre == " " || s_pre in luckysheet.formula.operatorjson ) ){
                    str += s;
                }
                else {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.functionCopy(str, mode, step) + s;
                        str = "";
                    } 
                    else {
                        function_str += s;
                    }
                }
            } 
            else {
                str += s;
            }

            if (i == funcstack.length - 1) {
                //function_str += str;
                if (luckysheet.formula.iscelldata($.trim(str))) {
                    if (mode == "down") {
                        function_str += luckysheet.formula.downparam($.trim(str), step);
                    } 
                    else if (mode == "up") {
                        function_str += luckysheet.formula.upparam($.trim(str), step);
                    } 
                    else if (mode == "left") {
                        function_str += luckysheet.formula.leftparam($.trim(str), step);
                    } 
                    else if (mode == "right") {
                        function_str += luckysheet.formula.rightparam($.trim(str), step);
                    }
                } 
                else {
                    function_str += $.trim(str);
                }
            }
            
            i++;
        }

        return function_str;
    },
    isfreezonFuc: function(txt) {
        var row = txt.replace(/[^0-9]/g, "");
        var col = txt.replace(/[^A-Za-z]/g, "");
        var row$ = txt.substr(txt.indexOf(row) - 1, 1);
        var col$ = txt.substr(txt.indexOf(col) - 1, 1);
        var ret = [false, false];
        if (row$ == "$") {
            ret[0] = true;
        }
        if (col$ == "$") {
            ret[1] = true;
        }
        return ret;
    },
    setfreezonFuceExe: function(rangetxt) {
        var row = parseInt(rangetxt.replace(/[^0-9]/g, ""));
        var col = luckysheet.luckysheetABCatNum(rangetxt.replace(/[^A-Za-z]/g, ""));
        var freezonFuc = this.isfreezonFuc(rangetxt);
        var $row = "$",
            $col = "$";
        if (!isNaN(row) && !isNaN(col)) {
            return $col + luckysheet.luckysheetchatatABC(col) + $row + (row);
        } else if (!isNaN(row)) {
            return $row + (row);
        } else if (!isNaN(col)) {
            return $col + luckysheet.luckysheetchatatABC(col);
        } else {
            return txt;
        }
    },
    setfreezonFuc: function(event) {
        var obj = this.getrangeseleciton();
        if (!this.iscelldata(obj.text())) {
            return;
        }
        var txt = obj.text(),
            pos = window.getSelection().anchorOffset;
        var val = txt.split("!"),
            rangetxt, prefix = "";
        if (val.length > 1) {
            rangetxt = val[1];
            prefix = val[0] + "!";
        } else {
            rangetxt = val[0];
        }
        var newtxt = "",
            newpos = "";
        var rangetxtIndex = rangetxt.indexOf(":");
        if (rangetxtIndex == -1) {
            //return [this.setfreezonFuceExe(rangetxt), rangetxt.length];
            newtxt = prefix + this.setfreezonFuceExe(rangetxt);
            newpos = newtxt.length;
        } else {
            rangetxt = rangetxt.split(":");
            if (pos > rangetxtIndex) {
                var ret = prefix + rangetxt[0] + ":" + this.setfreezonFuceExe(rangetxt[1]);
                //return [ret, ret.length];
                newtxt = ret;
                newpos = ret.length;
            } else {
                var firsttxt = prefix + this.setfreezonFuceExe(rangetxt[0]);
                var ret = firsttxt + ":" + rangetxt[1];
                //return [ret, firsttxt.length];
                newtxt = ret;
                newpos = firsttxt.length;
            }
        }
        obj.text(prefix + newtxt);
        this.setCaretPosition(obj.get(0), 0, newpos);
    },
    updateparam: function(orient, txt, step) {
        var val = txt.split("!"),
            rangetxt, prefix = "";
        
        if (val.length > 1) {
            rangetxt = val[1];
            prefix = val[0] + "!";
        } 
        else {
            rangetxt = val[0];
        }

        if (rangetxt.indexOf(":") == -1) {
            var row = parseInt(rangetxt.replace(/[^0-9]/g, ""));
            var col = luckysheet.luckysheetABCatNum(rangetxt.replace(/[^A-Za-z]/g, ""));
            var freezonFuc = this.isfreezonFuc(rangetxt);
            var $row = freezonFuc[0] ? "$" : "",
                $col = freezonFuc[1] ? "$" : "";
            
            if (orient == "u" && !freezonFuc[0]) {
                row -= step;
            } 
            else if (orient == "r" && !freezonFuc[1]) {
                col += step;
            } 
            else if (orient == "l" && !freezonFuc[1]) {
                col -= step;
            } 
            else if (!freezonFuc[0]) {
                row += step;
            }

            console.log(prefix + $col + luckysheet.luckysheetchatatABC(col) + $row + (row));

            if(row[0] < 0 || col[0] < 0){
                return luckysheet.formula.error.r;
            }
            
            if (!isNaN(row) && !isNaN(col)) {
                return prefix + $col + luckysheet.luckysheetchatatABC(col) + $row + (row);
            } 
            else if (!isNaN(row)) {
                return prefix + $row + (row);
            } 
            else if (!isNaN(col)) {
                return prefix + $col + luckysheet.luckysheetchatatABC(col);
            } 
            else {
                return txt;
            }
        } 
        else {
            rangetxt = rangetxt.split(":");
            var row = [],col = [];
            //console.log(rangetxt[0].replace(/[^0-9]/, ""), rangetxt[1].replace(/[^0-9]/, ""), rangetxt);
            row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, ""));
            row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, ""));
            var freezonFuc0 = this.isfreezonFuc(rangetxt[0]);
            if (row[0] > row[1]) {
                return txt;
            }
            var freezonFuc1 = this.isfreezonFuc(rangetxt[1]);
            col[0] = luckysheet.luckysheetABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ""));
            col[1] = luckysheet.luckysheetABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ""));
            if (col[0] > col[1]) {
                return txt;
            }
            var $row0 = freezonFuc0[0] ? "$" : "",
                $col0 = freezonFuc0[1] ? "$" : "";
            var $row1 = freezonFuc1[0] ? "$" : "",
                $col1 = freezonFuc1[1] ? "$" : "";
            
            if (orient == "u") {
                if (!freezonFuc0[0]) {
                    row[0] -= step;
                }

                if (!freezonFuc1[0]) {
                    row[1] -= step;
                }
            } 
            else if (orient == "r") {
                if (!freezonFuc0[1]) {
                    col[0] += step;
                }

                if (!freezonFuc1[1]) {
                    col[1] += step;
                }
            } 
            else if (orient == "l") {
                //col[0] -= step;
                //col[1] -= step;
                if (!freezonFuc0[1]) {
                    col[0] -= step;
                }

                if (!freezonFuc1[1]) {
                    col[1] -= step;
                }
            } 
            else {
                //row[0] += step;
                //row[1] += step;
                if (!freezonFuc0[0]) {
                    row[0] += step;
                }

                if (!freezonFuc1[0]) {
                    row[1] += step;
                }
            }

            if(row[0] < 0 || col[0] < 0){
                return luckysheet.formula.error.r;
            }

            if (isNaN(col[0]) && isNaN(col[1])) {
                return prefix + $row0 + (row[0]) + ":" + $row1 + (row[1]);
            } 
            else if (isNaN(row[0]) && isNaN(row[1])) {
                return prefix + $col0 + luckysheet.luckysheetchatatABC(col[0]) + ":" + $col1 + luckysheet.luckysheetchatatABC(col[1]);
            } 
            else {
                return prefix + $col0 + luckysheet.luckysheetchatatABC(col[0]) + $row0 + (row[0]) + ":" + $col1 + luckysheet.luckysheetchatatABC(col[1]) + $row1 + (row[1]);
            }
        }
    },
    downparam: function(txt, step) {
        return this.updateparam("d", txt, step);
    },
    upparam: function(txt, step) {
        return this.updateparam("u", txt, step);
    },
    leftparam: function(txt, step) {
        return this.updateparam("l", txt, step);
    },
    rightparam: function(txt, step) {
        return this.updateparam("r", txt, step);
    },
    functionStrChange: function(txt, type, rc, orient, stindex, step) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};

            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            luckysheet.formula.operatorjson = op;
        }

        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }

        var funcstack = txt.split("");
        var i = 0,
            str = "",
            function_str = "",
            ispassby = true;
        
        var matchConfig = {
            "bracket": 0, //括号
            "comma": 0, //逗号
            "squote": 0, //单引号
            "dquote": 0 //双引号
        };

        while (i < funcstack.length) {
            var s = funcstack[i];

            if (s == "(" && matchConfig.dquote == 0) {
                matchConfig.bracket += 1;

                if (str.length > 0) {
                    function_str += str + "(";
                } 
                else {
                    function_str += "(";
                }

                str = "";
            } 
            else if (s == ")" && matchConfig.dquote == 0) {
                matchConfig.bracket -= 1;
                //if (matchConfig.bracket == 0) {
                function_str += luckysheet.formula.functionStrChange(str, type, rc, orient, stindex, step) + ")";
                str = "";
                //}
            }
            //else if (s == "'" && matchConfig.dquote == 0) {
            //    if (matchConfig.squote > 0) {
            //        function_str += str + "'";
            //        matchConfig.squote -= 1;
            //        str = "";
            //    }
            //    else {
            //        matchConfig.squote += 1;
            //        str += "'";
            //    }
            //}
            else if (s == '"' && matchConfig.squote == 0) {
                if (matchConfig.dquote > 0) {
                    function_str += str + '"';
                    matchConfig.dquote -= 1;
                    str = "";
                } 
                else {
                    matchConfig.dquote += 1;
                    str += '"';
                }
            } 
            else if (s == ',' && matchConfig.dquote == 0) {
                function_str += luckysheet.formula.functionStrChange(str, type, rc, orient, stindex, step) + ',';
                str = "";
            } 
            else if (s == '&' && matchConfig.dquote == 0) {
                if (str.length > 0) {
                    function_str += luckysheet.formula.functionStrChange(str, type, rc, orient, stindex, step) + "&";
                    str = "";
                } 
                else {
                    function_str += "&";
                }
            } 
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0) {
                var s_next = "";

                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                var p = i-1, s_pre = null;;
                if(p>=0){
                    do {
                        s_pre = funcstack[p--];
                    }
                    while (p>=0 && s_pre ==" ")
                }

                if ((s + s_next) in luckysheet.formula.operatorjson) {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.functionStrChange(str, type, rc, orient, stindex, step) + s + s_next;
                        str = "";
                    } 
                    else {
                        function_str += s + s_next;
                    }

                    i++;
                }
                else if(!(/[^0-9]/.test(s_next)) && s=="-" && (s_pre=="(" || s_pre == null || s_pre == "," || s_pre == " " || s_pre in luckysheet.formula.operatorjson ) ){
                    str += s;
                }
                else {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.functionStrChange(str, type, rc, orient, stindex, step) + s;
                        str = "";
                    } 
                    else {
                        function_str += s;
                    }
                }
            } 
            else {
                str += s;
            }

            if (i == funcstack.length - 1) {
                if (luckysheet.formula.iscelldata($.trim(str))) {
                    function_str += luckysheet.formula.functionStrChange_range($.trim(str), type, rc, orient, stindex, step);
                } 
                else {
                    function_str += $.trim(str);
                }
            }
            
            i++;
        }

        return function_str;
    },
    functionStrChange_range: function(txt, type, rc, orient, stindex, step){
        var val = txt.split("!"),
            rangetxt, prefix = "";
        
        if (val.length > 1) {
            rangetxt = val[1];
            prefix = val[0] + "!";
        } 
        else {
            rangetxt = val[0];
        }

        var r1, r2, c1, c2;
        var $row0, $row1, $col0, $col1;
        if (rangetxt.indexOf(":") == -1) {
            r1 = r2 = parseInt(rangetxt.replace(/[^0-9]/g, "")) - 1;
            c1 = c2 = luckysheet.luckysheetABCatNum(rangetxt.replace(/[^A-Za-z]/g, ""));
            
            var freezonFuc = this.isfreezonFuc(rangetxt);
            
            $row0 = $row1 = freezonFuc[0] ? "$" : "",
            $col0 = $col1 = freezonFuc[1] ? "$" : "";
        } 
        else {
            rangetxt = rangetxt.split(":");
            
            r1 = parseInt(rangetxt[0].replace(/[^0-9]/g, "")) - 1;
            r2 = parseInt(rangetxt[1].replace(/[^0-9]/g, "")) - 1;
            if (r1 > r2) {
                return txt;
            }
            
            c1 = luckysheet.luckysheetABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ""));
            c2 = luckysheet.luckysheetABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ""));
            if (c1 > c2) {
                return txt;
            }

            var freezonFuc0 = this.isfreezonFuc(rangetxt[0]);
            $row0 = freezonFuc0[0] ? "$" : "";
            $col0 = freezonFuc0[1] ? "$" : "";

            var freezonFuc1 = this.isfreezonFuc(rangetxt[1]);
            $row1 = freezonFuc1[0] ? "$" : "";
            $col1 = freezonFuc1[1] ? "$" : "";
        }

        if(type == "del"){
            if(rc == "row"){
                if(r1 >= stindex && r2 <= stindex + step - 1){
                    return luckysheet.formula.error.r;
                }
                
                if(r1 > stindex + step - 1){
                    r1 -= step;
                }
                else if(r1 >= stindex){
                    r1 = stindex;
                }

                if(r2 > stindex + step - 1){
                    r2 -= step;
                }
                else if(r2 >= stindex){
                    r2 = stindex - 1;
                }

                if(r1 < 0){
                    r1 = 0;
                }

                if(r2 < r1){
                    r2 = r1;
                }
            }
            else if(rc == "col"){
                if(c1 >= stindex && c2 <= stindex + step - 1){
                    return luckysheet.formula.error.r;
                }
                
                if(c1 > stindex + step - 1){
                    c1 -= step;
                }
                else if(c1 >= stindex){
                    c1 = stindex;
                }

                if(c2 > stindex + step - 1){
                    c2 -= step;
                }
                else if(c2 >= stindex){
                    c2 = stindex - 1;
                }

                if(c1 < 0){
                    c1 = 0;
                }

                if(c2 < c1){
                    c2 = c1;
                }
            }

            if(r1 == r2 && c1 == c2){
                if (!isNaN(r1) && !isNaN(c1)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + $row0 + (r1 + 1);
                } 
                else if (!isNaN(r1)) {
                    return prefix + $row0 + (r1 + 1);
                } 
                else if (!isNaN(c1)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1);
                } 
                else {
                    return txt;
                }
            }
            else{
                if (isNaN(c1) && isNaN(c2)) {
                    return prefix + $row0 + (r1 + 1) + ":" + $row1 + (r2 + 1);
                } 
                else if (isNaN(r1) && isNaN(r2)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + ":" + $col1 + luckysheet.luckysheetchatatABC(c2);
                } 
                else {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + $row0 + (r1 + 1) + ":" + $col1 + luckysheet.luckysheetchatatABC(c2) + $row1 + (r2 + 1);
                }
            }
        }
        else if(type == "add"){
            if(rc == "row"){
                if(orient == "lefttop"){
                    if(r1 >= stindex){
                        r1 += step;
                    }
                    
                    if(r2 >= stindex){
                        r2 += step;
                    }
                }
                else if(orient == "rightbottom"){
                    if(r1 > stindex){
                        r1 += step;
                    }

                    if(r2 > stindex){
                        r2 += step;
                    }
                }
            }
            else if(rc == "col"){
                if(orient == "lefttop"){
                    if(c1 >= stindex){
                        c1 += step;
                    }
                    
                    if(c2 >= stindex){
                        c2 += step;
                    }
                }
                else if(orient == "rightbottom"){
                    if(c1 > stindex){
                        c1 += step;
                    }

                    if(c2 > stindex){
                        c2 += step;
                    }
                }
            }

            if(r1 == r2 && c1 == c2){
                if (!isNaN(r1) && !isNaN(c1)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + $row0 + (r1 + 1);
                } 
                else if (!isNaN(r1)) {
                    return prefix + $row0 + (r1 + 1);
                } 
                else if (!isNaN(c1)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1);
                } 
                else {
                    return txt;
                }
            }
            else{
                if (isNaN(c1) && isNaN(c2)) {
                    return prefix + $row0 + (r1 + 1) + ":" + $row1 + (r2 + 1);
                } 
                else if (isNaN(r1) && isNaN(r2)) {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + ":" + $col1 + luckysheet.luckysheetchatatABC(c2);
                } 
                else {
                    return prefix + $col0 + luckysheet.luckysheetchatatABC(c1) + $row0 + (r1 + 1) + ":" + $col1 + luckysheet.luckysheetchatatABC(c2) + $row1 + (r2 + 1);
                }
            }
        }
    },
    israngeseleciton: function(istooltip) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};

            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            luckysheet.formula.operatorjson = op;
        }

        if (istooltip == null) {
            istooltip = false;
        }

        var currSelection = window.getSelection();
        var anchor = $(currSelection.anchorNode);
        var anchorOffset = currSelection.anchorOffset;

        if (anchor.parent().is("span") && anchorOffset != 0) {
            var txt = $.trim(anchor.text()),
                lasttxt = "";

            if (txt.length == 0 && anchor.parent().prev().length > 0) {
                var ahr = anchor.parent().prev();
                txt = $.trim(ahr.text());
                lasttxt = txt.substr(txt.length - 1, 1);
                this.rangeSetValueTo = ahr;
            } 
            else {
                lasttxt = txt.substr(anchorOffset - 1, 1);
                this.rangeSetValueTo = anchor.parent();
            }

            if ((istooltip && (lasttxt == "(" || lasttxt == ",")) || (!istooltip && (lasttxt == "(" || lasttxt == "," || lasttxt == "=" || lasttxt in luckysheet.formula.operatorjson || lasttxt == "&"))) {
                return true;
            }
        } 
        else if (anchor.is("#luckysheet-rich-text-editor") || anchor.is("#luckysheet-functionbox-cell")) {
            var txt = $.trim(anchor.find("span").last().text()),
                lasttxt;

            this.rangeSetValueTo = anchor.find("span").last();

            if (txt.length == 0 && anchor.find("span").length > 1) {
                var ahr = anchor.find("span");
                txt = $.trim(ahr.eq(ahr.length - 2).text());
                this.rangeSetValueTo = ahr;
            }

            lasttxt = txt.substr(txt.length - 1, 1);

            if ((istooltip && (lasttxt == "(" || lasttxt == ",")) || (!istooltip && (lasttxt == "(" || lasttxt == "," || lasttxt == "=" || lasttxt in luckysheet.formula.operatorjson || lasttxt == "&"))) {
                return true;
            }
        } 
        else if (anchor.parent().is("#luckysheet-rich-text-editor") || anchor.parent().is("#luckysheet-functionbox-cell") || anchorOffset == 0) {
            if (anchorOffset == 0) {
                anchor = anchor.parent();
            }

            if (anchor.prev().length > 0) {
                var txt = $.trim(anchor.prev().text());
                var lasttxt = txt.substr(txt.length - 1, 1);

                this.rangeSetValueTo = anchor.prev();

                if ((istooltip && (lasttxt == "(" || lasttxt == ",")) || (!istooltip && (lasttxt == "(" || lasttxt == "," || lasttxt == "=" || lasttxt in luckysheet.formula.operatorjson || lasttxt == "&"))) {
                    return true;
                }
            }
        }

        return false;
    },
    rangechangeindex: null,
    rangestart: false,
    rangetosheet: null,
    rangeSetValueTo: null,
    func_selectedrange: {}, //函数选区范围
    rangeSetValue: function(selected, obj) {
        var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, selected, this.rangetosheet);
        var $editor;

        if (luckysheet.formula.rangestart || luckysheet.formula.rangedrag_column_start || luckysheet.formula.rangedrag_row_start) {
            if($("#luckysheet-search-formula-parm").is(":visible")||$("#luckysheet-search-formula-parm-select").is(":visible")){
                //公式参数框选取范围
                $editor=$("#luckysheet-rich-text-editor");
                $("#luckysheet-search-formula-parm-select-input").val(range);
                $("#luckysheet-search-formula-parm .parmBox").eq(luckysheet.formula.data_parm_index).find(".txt input").val(range);
                //参数对应值显示
                var txtdata=window.luckysheet_getcelldata(range).data;
                if(txtdata instanceof Array){
                    //参数为多个单元格选区
                    var txtArr=[];
                    for(var i=0;i<txtdata.length;i++){
                        for(var j=0;j<txtdata[i].length;j++){
                            if(txtdata[i][j]==null){
                                txtArr.push(null);
                            }
                            else{
                                txtArr.push(txtdata[i][j].v);
                            }
                        }
                    }
                    $("#luckysheet-search-formula-parm .parmBox").eq(luckysheet.formula.data_parm_index).find(".val").text(" = {"+txtArr.join(",")+"}");
                }
                else{
                    //参数为单个单元格选区
                    $("#luckysheet-search-formula-parm .parmBox").eq(luckysheet.formula.data_parm_index).find(".val").text(" = {"+txtdata.v+"}");
                }
                //计算结果显示
                var isVal=true; //参数不为空
                var parmValArr=[]; //参数值集合
                var lvi=-1; //最后一个有值的参数索引
                $("#luckysheet-search-formula-parm .parmBox").each(function(i,e){
                    var parmtxt=$(e).find(".txt input").val();
                    if(parmtxt==""&&$(e).find(".txt input").attr("data_parm_require")=="m"){
                        isVal=false;
                    }
                    if(parmtxt!=""){
                        lvi=i;
                    }
                })
                //单元格显示
                if(lvi==-1){
                    var functionHtmlTxt="="+$("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text()+"()"; 
                }
                else if(lvi==0){
                    var functionHtmlTxt="="+$("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text()+"("+$("#luckysheet-search-formula-parm .parmBox").eq(0).find(".txt input").val()+")"; 
                }
                else{
                    for(var j=0;j<=lvi;j++){
                        parmValArr.push($("#luckysheet-search-formula-parm .parmBox").eq(j).find(".txt input").val());
                    }
                    var functionHtmlTxt="="+$("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text()+"("+parmValArr.join(",")+")";    
                }
                var function_str=luckysheet.formula.functionHTMLGenerate(functionHtmlTxt);
                $("#luckysheet-rich-text-editor").html(function_str);
                $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
                if(isVal==true){
                    //公式计算
                    var fp = $.trim(luckysheet.formula.functionParser($("#luckysheet-rich-text-editor").text()));
                    var result = eval(fp);
                    $("#luckysheet-search-formula-parm .result span").text(result);
                }
            }
            else{
                var currSelection = window.getSelection();
                var anchorOffset = currSelection.anchorNode;
                $editor = $(anchorOffset).closest("div");

                var $span = $editor.find("span[rangeindex='" + this.rangechangeindex + "']").html(range);

                luckysheet.formula.setCaretPosition($span.get(0), 0, range.length);
            }
        } 
        else {
            var function_str = '<span class="luckysheet-formula-functionrange-cell" rangeindex="' + this.functionHTMLIndex + '" dir="auto" style="color:' + luckyColor[this.functionHTMLIndex] + ';">' + range + '</span>';
            var $t = $(function_str).insertAfter(this.rangeSetValueTo);
            this.rangechangeindex = this.functionHTMLIndex;
            $editor = $(this.rangeSetValueTo).closest("div");

            luckysheet.formula.setCaretPosition($editor.find("span[rangeindex='" + luckysheet.formula.rangechangeindex + "']").get(0), 0, range.length);

            this.functionHTMLIndex++;
        }

        if ($editor.attr("id") == "luckysheet-rich-text-editor") {
            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
        } else {
            $("#luckysheet-rich-text-editor").html($("#luckysheet-functionbox-cell").html());
        }
    },
    rangedrag: function(event) {
        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);

        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        // var x = mouse[0] + $("#luckysheet-scrollbar-x").scrollLeft();
        // var y = mouse[1] + $("#luckysheet-scrollbar-y").scrollTop();

        // console.log($("#luckysheet-cell-main").scrollTop(), $("#luckysheet-scrollbar-y").scrollTop());
        
        var rowLocation = luckysheet.rowLocation(y),
            row = rowLocation[1],
            row_pre = rowLocation[0],
            row_index = rowLocation[2];

        var colLocation = luckysheet.colLocation(x),
            col = colLocation[1],
            col_pre = colLocation[0],
            col_index = colLocation[2];

        var top = 0,
            height = 0,
            rowseleted = [];

        if (this.func_selectedrange.top > row_pre) {
            top = row_pre;
            height = this.func_selectedrange.top + this.func_selectedrange.height - row_pre;
            rowseleted = [row_index, this.func_selectedrange.row[1]];
        } 
        else if (this.func_selectedrange.top == row_pre) {
            top = row_pre;
            height = this.func_selectedrange.top + this.func_selectedrange.height - row_pre;
            rowseleted = [row_index, this.func_selectedrange.row[0]];
        } 
        else {
            top = this.func_selectedrange.top;
            height = row - this.func_selectedrange.top - 1;
            rowseleted = [this.func_selectedrange.row[0], row_index];
        }

        var left = 0,
            width = 0,
            columnseleted = [];

        if (this.func_selectedrange.left > col_pre) {
            left = col_pre;
            width = this.func_selectedrange.left + this.func_selectedrange.width - col_pre;
            columnseleted = [col_index, this.func_selectedrange.column[1]];
        } 
        else if (this.func_selectedrange.left == col_pre) {
            left = col_pre;
            width = this.func_selectedrange.left + this.func_selectedrange.width - col_pre;
            columnseleted = [col_index, this.func_selectedrange.column[0]];
        } 
        else {
            left = this.func_selectedrange.left;
            width = col - this.func_selectedrange.left - 1;
            columnseleted = [this.func_selectedrange.column[0], col_index];
        }

        rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], "h");
        rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], "h");
        columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], "v");
        columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], "v");

        var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, this.func_selectedrange, top , height, left , width);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            top = changeparam[2];
            height = changeparam[3];
            left = changeparam[4];
            width = changeparam[5];
        }

        this.func_selectedrange["row"] = rowseleted;
        this.func_selectedrange["column"] = columnseleted;

        this.func_selectedrange["left_move"] = left;
        this.func_selectedrange["width_move"] = width;
        this.func_selectedrange["top_move"] = top;
        this.func_selectedrange["height_move"] = height;

        luckysheet.luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

        $("#luckysheet-formula-functionrange-select").css({
            "left": left,
            "width": width,
            "top": top,
            "height": height
        }).show();

        if($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")){
            //if公式生成器 选择范围
            var range = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, { "row": rowseleted, "column": columnseleted }, luckysheet.currentSheetIndex);
            $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);
        }
        else{
            this.rangeSetValue({
                "row": rowseleted,
                "column": columnseleted
            }); 
        }
        
        setTimeout(function() {
            luckysheetautoadjustmousedown = 1;
        }, 1);

        luckysheetFreezen.scrollFreezen(rowseleted, columnseleted);
    },
    rangedrag_column_start: false,
    rangedrag_row_start: false,
    rangedrag_column: function(event) {
        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);

        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        // var x = mouse[0] + $("#luckysheet-scrollbar-x").scrollLeft();
        // var y = mouse[1] + $("#luckysheet-scrollbar-y").scrollTop();
        
        var visibledatarow = luckysheet.getvisibledatarow();
        //var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
        var row_index = visibledatarow.length - 1,
            row = visibledatarow[row_index],
            row_pre = 0;

        var colLocation = luckysheet.colLocation(x),
            col = colLocation[1],
            col_pre = colLocation[0],
            col_index = colLocation[2];

        var left = 0,
            width = 0,
            columnseleted = [];

        if (this.func_selectedrange.left > col_pre) {
            left = col_pre;
            width = this.func_selectedrange.left + this.func_selectedrange.width - col_pre;
            columnseleted = [col_index, this.func_selectedrange.column[1]];
        } 
        else if (this.func_selectedrange.left == col_pre) {
            left = col_pre;
            width = this.func_selectedrange.left + this.func_selectedrange.width - col_pre;
            columnseleted = [col_index, this.func_selectedrange.column[0]];
        } 
        else {
            left = this.func_selectedrange.left;
            width = col - this.func_selectedrange.left - 1;
            columnseleted = [this.func_selectedrange.column[0], col_index];
        }

        //rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], "h");
        //rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], "h");
        columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], "v");
        columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], "v");

        var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, [0, row_index], this.func_selectedrange, row_pre , row - row_pre - 1, left , width);
        if(changeparam != null){
            columnseleted = changeparam[0];
            // rowseleted= changeparam[1];
            // top = changeparam[2];
            // height = changeparam[3];
            left = changeparam[4];
            width = changeparam[5];
        }

        this.func_selectedrange["column"] = columnseleted;

        this.func_selectedrange["left_move"] = left;
        this.func_selectedrange["width_move"] = width;

        luckysheet.luckysheet_count_show(left, row_pre, width, row - row_pre - 1, [0, row_index], columnseleted);

        this.rangeSetValue({
            "row": [null, null],
            "column": columnseleted
        });

        $("#luckysheet-formula-functionrange-select").css({
            "left": left,
            "width": width,
            "top": row_pre,
            "height": row - row_pre - 1
        }).show();
        
        setTimeout(function() {
            luckysheetautoadjustmousedown = 1;
        }, 1);
        luckysheetFreezen.scrollFreezen([0, row_index], columnseleted);
    },
    rangedrag_row: function(event) {
        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);

        var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        // var x = mouse[0] + $("#luckysheet-scrollbar-x").scrollLeft();
        // var y = mouse[1] + $("#luckysheet-scrollbar-y").scrollTop();

        var rowLocation = luckysheet.rowLocation(y),
            row = rowLocation[1],
            row_pre = rowLocation[0],
            row_index = rowLocation[2];

        var visibledatacolumn = luckysheet.getvisibledatacolumn();
        //var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];
        var col_index = visibledatacolumn.length - 1,
            col = visibledatacolumn[col_index],
            col_pre = 0;
        
        var top = 0,
            height = 0,
            rowseleted = [];

        if (this.func_selectedrange.top > row_pre) {
            top = row_pre;
            height = this.func_selectedrange.top + this.func_selectedrange.height - row_pre;
            rowseleted = [row_index, this.func_selectedrange.row[1]];
        } 
        else if (this.func_selectedrange.top == row_pre) {
            top = row_pre;
            height = this.func_selectedrange.top + this.func_selectedrange.height - row_pre;
            rowseleted = [row_index, this.func_selectedrange.row[0]];
        } 
        else {
            top = this.func_selectedrange.top;
            height = row - this.func_selectedrange.top - 1;
            rowseleted = [this.func_selectedrange.row[0], row_index];
        }

        rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], "h");
        rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], "h");
        // columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], "v");
        // columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], "v");

        var changeparam = luckysheet.menuButton.mergeMoveMain([0, col_index], rowseleted, this.func_selectedrange, top, height, col_pre, col - col_pre - 1);
        if(changeparam != null){
            // columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            top = changeparam[2];
            height = changeparam[3];
            // left = changeparam[4];
            // width = changeparam[5];
        }

        this.func_selectedrange["row"] = rowseleted;

        this.func_selectedrange["top_move"] = top;
        this.func_selectedrange["height_move"] = height;

        luckysheet.luckysheet_count_show(col_pre, top, col - col_pre - 1, height, rowseleted, [0, col_index]);

        this.rangeSetValue({
            "row": rowseleted,
            "column": [null, null]
        });

        $("#luckysheet-formula-functionrange-select").css({
            "left": col_pre,
            "width": col - col_pre - 1,
            "top": top,
            "height": height
        }).show();
        
        setTimeout(function() {
            luckysheetautoadjustmousedown = 1;
        }, 1);

        luckysheetFreezen.scrollFreezen(rowseleted, [0, col_index]);
    },
    rangedragged: function() {},
    rangeResizeObj: null,
    rangeResize: null,
    rangeResizeIndex: null,
    rangeResizexy: null,
    rangeResizeWinH: null,
    rangeResizeWinW: null,
    rangeResizeTo: null,
    rangeResizeDraging: function(event, luckysheetCurrentChartResizeObj, luckysheetCurrentChartResizeXy, luckysheetCurrentChartResize, luckysheetCurrentChartResizeWinW, luckysheetCurrentChartResizeWinH, ch_width, rh_height) {
        var scrollTop = $("#luckysheet-scrollbar-y").scrollTop(),
            scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft();
        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;
        var rowLocation = luckysheet.rowLocation(y),
            row = rowLocation[1],
            row_pre = rowLocation[0],
            row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(x),
            col = colLocation[1],
            col_pre = colLocation[0],
            col_index = colLocation[2];
        if (x < 0 || y < 0) {
            return false;
        }
        var myh = luckysheetCurrentChartResizeObj.height(),
            myw = luckysheetCurrentChartResizeObj.width();
        var topchange = row_pre - luckysheetCurrentChartResizeXy[1],
            leftchange = col_pre - luckysheetCurrentChartResizeXy[0];
        var top = luckysheetCurrentChartResizeXy[5],
            height = luckysheetCurrentChartResizeXy[3],
            left = luckysheetCurrentChartResizeXy[4],
            width = luckysheetCurrentChartResizeXy[2];
        if (luckysheetCurrentChartResize == "lt" || luckysheetCurrentChartResize == "lb") {
            if (luckysheetCurrentChartResizeXy[0] + luckysheetCurrentChartResizeXy[2] < col_pre) {
                return;
            }
            left = col_pre;
            width = luckysheetCurrentChartResizeXy[2] - leftchange;
            if (left > luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre) {
                left = luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre;
                width = luckysheetCurrentChartResizeXy[2] - (luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre - luckysheetCurrentChartResizeXy[0]);
            } else if (left <= 0) {
                left = 0;
                width = luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[0];
            }
        }
        if (luckysheetCurrentChartResize == "rt" || luckysheetCurrentChartResize == "rb") {
            if (luckysheetCurrentChartResizeXy[6] - luckysheetCurrentChartResizeXy[2] > col) {
                return;
            }
            width = luckysheetCurrentChartResizeXy[2] + col - luckysheetCurrentChartResizeXy[6];
            if (width < col - col_pre - 1) {
                width = col - col_pre - 1;
            } else if (width >= ch_width - left) {
                width = ch_width - left;
            }
        }
        if (luckysheetCurrentChartResize == "lt" || luckysheetCurrentChartResize == "rt") {
            if (luckysheetCurrentChartResizeXy[1] + luckysheetCurrentChartResizeXy[3] < row_pre) {
                return;
            }
            top = row_pre;
            height = luckysheetCurrentChartResizeXy[3] - topchange;
            if (top > luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre) {
                top = luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre;
                height = luckysheetCurrentChartResizeXy[3] - (luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre - luckysheetCurrentChartResizeXy[1]);
            } else if (top <= 0) {
                top = 0;
                height = luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[1];
            }
        }
        if (luckysheetCurrentChartResize == "lb" || luckysheetCurrentChartResize == "rb") {
            if (luckysheetCurrentChartResizeXy[7] - luckysheetCurrentChartResizeXy[3] > row) {
                return;
            }
            height = luckysheetCurrentChartResizeXy[3] + row - luckysheetCurrentChartResizeXy[7];
            if (height < row - row_pre - 1) {
                height = row - row_pre - 1;
            } else if (height >= rh_height - top) {
                height = rh_height - top;
            }
        }
        var rangeindex = luckysheet.formula.rangeResizeIndex;
        var selected = {
            "top": top,
            "left": left,
            "height": height,
            "width": width
        };
        var range = this.getSelectedFromRange(selected);
        var rangetxt = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, range, this.rangetosheet);
        var $span = luckysheet.formula.rangeResizeTo.find("span[rangeindex='" + rangeindex + "']").html(rangetxt);
        luckysheet.luckysheetRangeLast(luckysheet.formula.rangeResizeTo[0]);
        luckysheetCurrentChartResizeObj.css(selected).data("range", range);
    },
    getSelectedFromRange: function(obj) {
        var row_st = obj.top + 2,
            row_ed = obj.top + obj.height - 2;
        var col_st = obj.left + 2,
            col_ed = obj.left + obj.width - 2;
        var ret = {
            "row": [],
            "column": []
        };
        var rowLocation = luckysheet.rowLocation(row_st),
            row = rowLocation[1],
            row_pre = rowLocation[0],
            row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(col_st),
            col = colLocation[1],
            col_pre = colLocation[0],
            col_index = colLocation[2];
        ret.row[0] = row_index;
        ret.column[0] = col_index;
        var rowLocation = luckysheet.rowLocation(row_ed),row = rowLocation[1],row_pre = rowLocation[0],row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(col_ed),col = colLocation[1],col_pre = colLocation[0], col_index = colLocation[2];
        ret.row[1] = row_index;
        ret.column[1] = col_index;
        return ret;
    },
    rangeResizeDragged: function(event, luckysheetCurrentChartResizeObj, luckysheetCurrentChartResizeXy, luckysheetCurrentChartResize, luckysheetCurrentChartResizeWinW, luckysheetCurrentChartResizeWinH) {
        luckysheet.formula.rangeResize = null;
        $("#luckysheet-formula-functionrange-highlight-" + luckysheet.formula.rangeResizeIndex).find(".luckysheet-selection-copy-hc").css("opacity", 0.03);
    },
    rangeMovexy: null,
    rangeMove: false,
    rangeMoveObj: null,
    rangeMoveIndex: null,
    rangeMoveRangedata: null,
    rangeMoveDraging: function(event, luckysheet_cell_selected_move_index, luckysheet_select_save, obj, sheetBarHeight, statisticBarHeight) {
        var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
        var scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft();
        var scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;
        var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight,
            winW = $(window).width() + scrollLeft;
        var rowLocation = luckysheet.rowLocation(y),
            row = rowLocation[1],
            row_pre = rowLocation[0],
            row_index = rowLocation[2];
        var colLocation = luckysheet.colLocation(x),
            col = colLocation[1],
            col_pre = colLocation[0],
            col_index = colLocation[2];
        var row_index_original = luckysheet_cell_selected_move_index[0],
            col_index_original = luckysheet_cell_selected_move_index[1];
        var row_s = luckysheet_select_save["row"][0] - row_index_original + row_index,
            row_e = luckysheet_select_save["row"][1] - row_index_original + row_index;
        var col_s = luckysheet_select_save["column"][0] - col_index_original + col_index,
            col_e = luckysheet_select_save["column"][1] - col_index_original + col_index;
        //console.log(row_index_original, row_index,col_index_original,col_index);
        if (row_s < 0 || y < 0) {
            row_s = 0;
            row_e = luckysheet_select_save["row"][1] - luckysheet_select_save["row"][0];
        }
        if (col_s < 0 || x < 0) {
            col_s = 0;
            col_e = luckysheet_select_save["column"][1] - luckysheet_select_save["column"][0];
        }
        //console.log(row_s, row_e,col_s,col_e, x, y);
        var visibledatarow = luckysheet.getvisibledatarow();
        if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
            row_s = visibledatarow.length - 1 - luckysheet_select_save["row"][1] + luckysheet_select_save["row"][0];
            row_e = visibledatarow.length - 1;
        }
        var visibledatacolumn = luckysheet.getvisibledatacolumn();
        if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
            col_s = visibledatacolumn.length - 1 - luckysheet_select_save["column"][1] + luckysheet_select_save["column"][0];
            col_e = visibledatacolumn.length - 1;
        }
        //console.log(row_s, row_e,visibledatarow.length,luckysheet_select_save["row"][1] - luckysheet_select_save["row"][0]);
        var col_pre = col_s - 1 == -1 ? 0 : visibledatacolumn[col_s - 1],
            col = visibledatacolumn[col_e];
        var row_pre = row_s - 1 == -1 ? 0 : visibledatarow[row_s - 1],
            row = visibledatarow[row_e];
        var rangeindex = luckysheet.formula.rangeMoveIndex;
        var selected = {
            "left": col_pre,
            "width": col - col_pre - 2,
            "top": row_pre,
            "height": row - row_pre - 2,
            "display": "block"
        };
        var range = this.getSelectedFromRange(selected);
        var rangetxt = luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, range, this.rangetosheet);
        var $span = luckysheet.formula.rangeResizeTo.find("span[rangeindex='" + rangeindex + "']").html(rangetxt);
        luckysheet.luckysheetRangeLast(luckysheet.formula.rangeResizeTo[0]);
        luckysheet.formula.rangeMoveRangedata = range;
        obj.css(selected);
    },
    rangeMoveDragged: function(obj) {
        luckysheet.formula.rangeMove = false;
        $("#luckysheet-formula-functionrange-highlight-" + luckysheet.formula.rangeMoveIndex).data("range", luckysheet.formula.rangeMoveRangedata).find(".luckysheet-selection-copy-hc").css("opacity", 0.03);
    },
    functionHTMLIndex: 0,
    functionRangeIndex: null,
    findrangeindex: function(v, vp) {
        var re = /<span.*?>/g;
        var v_a = v.replace(re, ""),
            vp_a = vp.replace(re, "");
        v_a = v_a.split('</span>');
        vp_a = vp_a.split('</span>');
        v_a.pop();
        vp_a.pop();
        var pfri = luckysheet.formula.functionRangeIndex;
        var i = 0;
        var spanlen = vp_a.length > v_a.length ? v_a.length : vp_a.length;

        var vplen = vp_a.length, vlen = v_a.length;
        //不增加元素输入
        if(vplen == vlen){
            var i = pfri[0];
            var p = vp_a[i], n = v_a[i];
            if(p==null){
                if(vp_a.length<=i){
                    pfri = [vp_a.length-1, vp_a.length-1];
                }
                else if(v_a.length<=i){
                    pfri = [v_a.length-1, v_a.length-1];
                }
                return pfri;
            }
            else if(p.length == n.length){
                //pfri[1] = pfri[1] - 1;
                // if(pfri[1]<0){
                //     pfri[1] = 0;
                // }
                if(vp_a[i+1]!=null && v_a[i+1]!=null && vp_a[i+1].length<v_a[i+1].length){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                return pfri;
            }
            else if(p.length > n.length){
                //pfri[1] = pfri[1] - 1;
                if(p!=null && v_a[i+1]!=null && v_a[i+1].substr(0,1) =='"' && (p.indexOf("{") >-1 || p.indexOf("}") >-1)){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                return pfri;
            }
            else if(p.length < n.length){
                //pfri[1] = pfri[1];
                if(pfri[1]>n.length){
                    pfri[1] = n.length;
                }
                return pfri;
            }
        }
        //减少元素输入
        else if(vplen > vlen){

            var i = pfri[0];
            var p = vp_a[i], n = v_a[i];
            if(n==null){
                if(v_a[i-1].indexOf("{")>-1){
                    pfri[0] = pfri[0] -1;
                    var start = v_a[i-1].search("{");
                    pfri[1] = pfri[1] + start;
                }
                else{
                    pfri[0] = 0;
                    pfri[1] = 0;
                }
               
            }
            else if(p.length == n.length){
                if(v_a[i+1]!=null && (v_a[i+1].substr(0,1)=='"' || v_a[i+1].substr(0,1)=='{' || v_a[i+1].substr(0,1)=='}')){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                else if(p!=null && p.length>2 && p.substr(0,1)=='"' && p.substr(p.length-1,1)=='"' ){
                    //pfri[1] = n.length-1;
                }
                else if(v_a[i]!=null && v_a[i]=='")'){
                    pfri[1] = 1;
                }
                else if(v_a[i]!=null && v_a[i]=='"}'){
                    pfri[1] = 1;
                }
                else if(v_a[i]!=null && v_a[i]=='{)'){
                    pfri[1] = 1;
                }
                else{
                    pfri[1] = n.length;
                }
               
                // if(pfri[1]==0){
                //     pfri[1] = 1;
                // }
                return pfri;
            }
            else if(p.length > n.length){
                if(v_a[i+1]!=null && (v_a[i+1].substr(0,1)=='"' || v_a[i+1].substr(0,1)=='{' || v_a[i+1].substr(0,1)=='}')){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                return pfri;
            }
            else if(p.length < n.length){
                return pfri;
            }

            // if(pfri[0]>=v_a.length-1){
            //     pfri[0] = v_a.length-1;
            //     if(pfri[0]<0){
            //         pfri[0] = 0;
            //     }
            // }
            // else{
            //     if(v_a[pfri[0]+1]!=null && v_a[pfri[0]+1].substr(0,1)=='"'){
            //         pfri[0] = pfri[0] + 1;
            //     }
            //     else if(v_a[pfri[0]]!=null && v_a[pfri[0]].substr(v_a[pfri[0]].length-1,1)=='"'){
            //         pfri[0] = pfri[0] + 1;
            //     }
            //     else{
            //         pfri[0] = pfri[0];
            //     }
            // }

            // var i = pfri[0];
            // if(v_a[i]==null){
            //     pfri[1] = 0;
            // }
            // else{
            //     if(v_a[pfri[0]].length>1 && vp_a[pfri[0]+1]==","){
            //         if(vp_a[pfri[0]]=='""'){
            //             pfri[1] = 1;
            //         }
            //         else{
            //             if(vp_a[pfri[0]].substr(vp_a[pfri[0]].length-1,1)=='"'){
            //                 pfri[1] = vp_a[pfri[0]].length-1;
            //             }
            //             else{
            //                 pfri[1] = vp_a[pfri[0]].length;
            //             }
                       
            //         }
                   
            //     }
            //     else{
            //         if(v_a[pfri[0]+1]!=null && v_a[pfri[0]+1].substr(0,1)=='"'){
            //             pfri[1] = 1;
            //         }
            //         else if(v_a[pfri[0]]!=null && v_a[pfri[0]].substr(v_a[pfri[0]].length-1,1)=='"'){
            //             pfri[1] = 1;
            //         }
            //         else{
            //             pfri[1] = v_a[i].length;
            //         }
            //     }
               
            // }
            return pfri;
        }
        //增加元素输入
        else if(vplen < vlen){
            var i = pfri[0];
            var p = vp_a[i], n = v_a[i];
            if(p==null){
                pfri[0] = v_a.length-1;
                if(n!=null){
                    pfri[1] = n.length;
                }
                else{
                    pfri[1] = 1;
                }
            }
            else if(p.length == n.length){
                if(vp_a[i+1]!=null && (vp_a[i+1].substr(0,1)=='"' || vp_a[i+1].substr(0,1)=='{' || vp_a[i+1].substr(0,1)=='}') ){
                    pfri[1] = n.length;
                }
                else if(v_a[i+1]!=null && v_a[i+1].substr(0,1)=='"' && ( v_a[i+1].substr(0,1)=='{' || v_a[i+1].substr(0,1)=='}') ){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                // else if(n!=null && n.length>2 && n.substr(0,1)=='"' && n.substr(n.length-1,1)=='"'){
                //     pfri[1] = n.length;
                // }
                else if(n!=null && n.substr(0,1)=='"' && n.substr(n.length-1,1)=='"' && p.substr(0,1)=='"' && p.substr(p.length-1,1)==')'){
                    pfri[1] = n.length;
                }
                else if(n!=null && n.substr(0,1)=='{' && n.substr(n.length-1,1)=='}' && p.substr(0,1)=='{' && p.substr(p.length-1,1)==')'){
                    pfri[1] = n.length;
                }
                // else if(p!=null && (p.indexOf("{") >-1 || p.indexOf("}") >-1)){

                // }
                else{
                    pfri[0] = pfri[0] + vlen - vplen;
                    if(v_a.length>vp_a.length){
                        pfri[1] = v_a[i+1].length;
                    }
                    else{
                        pfri[1] = 1;
                    }
                   
                    // pfri[0] = pfri[0] + vlen - vplen - p.length + 1;
                    // pfri[1] = p.length;
                }
                return pfri;
            }
            else if(p.length > n.length){
                if(p!=null && p.substr(0,1)=='"'){
                    pfri[1] = n.length;
                }
                else if(v_a[i+1]!=null && /{.*?}/.test(v_a[i+1])){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = v_a[i+1].length;
                }
                else if(p!=null && v_a[i+1].substr(0,1) =='"' && (p.indexOf("{") >-1 || p.indexOf("}") >-1)){
                    pfri[0] = pfri[0] + 1;
                    pfri[1] = 1;
                }
                else if(p!=null && (p.indexOf("{") >-1 || p.indexOf("}") >-1)){

                }
                else{
                    pfri[0] = pfri[0] + vlen - vplen - 1;
                    pfri[1] = v_a[i-1].length;
                }
                return pfri;
            }
            else if(p.length < n.length){
                return pfri;
            }

            // if(pfri[0]>=v_a.length-1 || vplen==0){
            //     pfri[0] = v_a.length-1;
            //     pfri[1] = 1;
            // }
            // else{
            //     if(v_a[pfri[0]+1]!=null && v_a[pfri[0]+1].substr(0,1)=='"'){
            //         pfri[0] = pfri[0] + 1;
            //         pfri[1] = 1;
            //     }
            //     else if(v_a[pfri[0]]!=null && v_a[pfri[0]].substr(v_a[pfri[0]].length-1,1)=='"'){
            //         pfri[0] = pfri[0];
            //         pfri[1] = v_a[pfri[0]].length;
            //     }
            //     else if(vp_a[pfri[0]+1]!=null && vp_a[pfri[0]+1].substr(0,1)=='"'){
            //         pfri[0] = pfri[0];
            //         pfri[1] = 1;
            //     }
            //     else{
            //         var cutfix = 0;
            //         //处理在sum之间输入N个','产生2个span的情况
            //         if(vp_a[pfri[0]].length>1 && v_a[pfri[0]+1]=="," && v_a[pfri[0]+2]!=null && !(v_a[pfri[0]+2] in {"(":0, ")":0}) ){
            //             cutfix = 1;
            //         }

            //         pfri[0] = pfri[0] + vlen - vplen - cutfix;
            //         pfri[1] = 1;
            //     }
               
            // }
           
            return pfri;
        }
        return null;

        while (i < spanlen) {
            var p = vp_a[i],
                n = v_a[i];
            //console.log(p, n, i, p.length, n.length);
            if (p.length == n.length) {
                //return [i, luckysheet.formula.functionRangeIndex[1]];
                var p_a = p.split("");
                var n_a = n.split("");
                var s = 0;
                //console.log(p_a, n_a, JSON.stringify(pfri));
                while (s < n_a.length) {
                    var pp = p_a[s],
                        nn = n_a[s];
                    //console.log(111111,nn,pp,i, s, JSON.stringify(pfri));
                    if (pp != nn) {
                        return [i, s + 1];
                    }
                    // else if (pp == nn && pfri != null && pfri[0] == i && pfri[1] == s + 1) {
                    //     return [i, s + 1];
                    // }
                    // else if (pp == nn && pfri != null && pfri[0] == i && pfri[1] == s + 2 && nn==",") {
                    //     return [i+1, s + 1];
                    // }
                    s++;
                }
            } else if (p.length > n.length) {
                var p_a = p.split("");
                var n_a = n.split("");
                var s = 0;
                while (s < n_a.length) {
                    var pp = p_a[s],
                        nn = n_a[s];
                    //console.log(222222,nn,pp,i, s, JSON.stringify(pfri));
                    if (pp != nn) {
                        return [i, s];
                    }
                    // else if (pp == nn && pfri != null && pfri[0] == i && pfri[1] == s) {
                    //     return [i, s];
                    // }
                    s++;
                }
                return [i, n_a.length];
            } else if (p.length < n.length) {
                var p_a = p.split("");
                var n_a = n.split("");
                var s = 0;
                while (s < p_a.length) {
                    var pp = p_a[s],
                        nn = n_a[s];
                    //console.log(33333,nn,pp,i, s, JSON.stringify(pfri));
                    if (pp != nn) {
                        return [i, s + 1];
                    }
                    // else if (pp == nn && pfri != null && pfri[0] == i && pfri[1] == s + 1) {
                    //     return [i, s + 1];
                    // }
                    s++;
                }
                return [i, n_a.length];
            }
            i++;
        }
        return null;
    },
    setCaretPosition: function(textDom, children, pos) {
        try{
            var el = textDom;
            var range = document.createRange();
            var sel = window.getSelection();
            //console.log(el.childNodes[children], pos);
            range.setStart(el.childNodes[children], pos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
            //if (textDom.setSelectionRange) {
            //    // IE Support
            //    textDom.focus();
            //    textDom.setSelectionRange(pos, pos);
            //} else if (textDom.createTextRange) {
            //    // Firefox support
            //    var range = textDom.createTextRange();
            //    range.collapse(true);
            //    range.moveEnd('character', pos);
            //    range.moveStart('character', pos);
            //    range.select();
            //}
        }
        catch(err) {
            luckysheet.luckysheetRangeLast(luckysheet.formula.rangeResizeTo[0]);
        }
    },
    functionRange: function(obj, v, vp) {
        // console.log(v, vp);
        if (window.getSelection) { //ie11 10 9 ff safari
            var currSelection = window.getSelection();
            var fri = luckysheet.formula.findrangeindex(v, vp);
            //luckysheet.formula.functionRangeIndex = fri;
            //console.log(fri);
            if (fri == null) {
                //luckysheet.formula.functionRangeIndex = currSelection.rangeCount;
                currSelection.selectAllChildren(obj.get(0));
                currSelection.collapseToEnd();
            } else {
                //obj = obj.find("span")[fri[0]];
                //currSelection.selectAllChildren(obj);
                //currSelection.collapse(obj, fri[1]);
                this.setCaretPosition(obj.find("span").get(fri[0]), 0, fri[1]);
            }
            //currSelection.collapse(obj,luckysheet.formula.functionRangeIndex);
        } else if (document.selection) { //ie10 9 8 7 6 5
            //var range = document.selection.createRange();//创建选择对象
            //var range = document.body.createTextRange();
            luckysheet.formula.functionRangeIndex.moveToElementText(obj); //range定位到obj
            luckysheet.formula.functionRangeIndex.collapse(false); //光标移至最后
            luckysheet.formula.functionRangeIndex.select();
        }
    },
    functionInputHanddler: function($to, $input, kcode) {
        if(luckysheet.luckysheetConfigsetting.editMode){//此模式下禁用公式栏
            return;
        }

        var $functionbox = $to,
            $editer = $input;
        var value1 = $editer.html(),
            value1txt = $editer.text();
        setTimeout(function() {
            var value = $editer.text(),
                valuetxt = value;
            if (value.length > 0 && value.substr(0, 1) == "=" && (kcode != 229 || value.length == 1)) {
                value = luckysheet.formula.functionHTMLGenerate(value);
                value1 = luckysheet.formula.functionHTMLGenerate(value1txt);

                if (window.getSelection) { // all browsers, except IE before version 9
                    var currSelection = window.getSelection();
                    if($(currSelection.anchorNode).is("div")){
                        var editorlen = $("#luckysheet-rich-text-editor span").length;
                        luckysheet.formula.functionRangeIndex = [editorlen-1, $("#luckysheet-rich-text-editor").find("span").eq(editorlen-1).text().length];
                    }
                    else{
                        luckysheet.formula.functionRangeIndex = [$(currSelection.anchorNode).parent().index(), currSelection.anchorOffset];
                    }
                } 
                else { // Internet Explorer before version 9
                    var textRange = document.selection.createRange();
                    luckysheet.formula.functionRangeIndex = textRange;
                }

                $editer.html(value);
                luckysheet.formula.functionRange($editer, value, value1);
                
                // if (luckysheet.formula.functionRangeIndex != null) {
                //     luckysheet.formula.functionRange($("#luckysheet-functionbox-cell"), value, value1);
                // }
                // else{
                //     luckysheetRangeLast($("#luckysheet-functionbox-cell")[0]);
                // }
                luckysheet.formula.canceFunctionrangeSelected();
                luckysheet.formula.createRangeHightlight();
            }
            luckysheet.formula.rangestart = false;
            luckysheet.formula.rangedrag_column_start = false;
            luckysheet.formula.rangedrag_row_start = false;

            $functionbox.html(value);
            luckysheet.formula.rangeHightlightselected($editer, kcode);
        }, 1);
    },
    functionHTMLGenerate: function(txt) {
        let _this = this;

        if (txt.length == 0 || txt.substr(0, 1) != "=") {
            return txt;
        }

        _this.functionHTMLIndex = 0;
        
        return '<span dir="auto" class="luckysheet-formula-text-color">=</span>' + _this.functionHTML(txt);
    },
    functionHTML: function(txt) {
        let _this = this;

        if (_this.operatorjson == null) {
            let arr = _this.operator.split("|"),
                op = {};

            for (let i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            _this.operatorjson = op;
        }

        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }

        let funcstack = txt.split("");
        let i = 0,
            str = "",
            function_str = "",
            ispassby = true;
        let matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0,
            "braces": 0
        }

        while (i < funcstack.length) {
            let s = funcstack[i];
            
            if (s == "(" && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                matchConfig.bracket += 1;
                
                if (str.length > 0) {
                    function_str += '<span dir="auto" class="luckysheet-formula-text-func">' + str + '</span><span dir="auto" class="luckysheet-formula-text-lpar">(</span>';
                } 
                else {
                    function_str += '<span dir="auto" class="luckysheet-formula-text-lpar">(</span>';
                }

                str = "";
            } 
            else if (s == ")" && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                matchConfig.bracket -= 1;
                function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-rpar">)</span>';
                str = "";
            }
            // else if (s == "'" && matchConfig.dquote == 0) {
            //     if (matchConfig.squote > 0) {
            //         function_str += str + "'</span>";
            //         if(str.length>0){
            //          function_str += '<span dir="auto" class="luckysheet-formula-text-color">' + str + "<span dir='auto' class='luckysheet-formula-text-color'>'</span>";
            //      }
            //      else{
            //          function_str += "<span dir='auto' class='luckysheet-formula-text-color'>'</span>";
            //      }
            //         matchConfig.squote -= 1;
            //         str = "";
            //     }
            //     else {
            //         matchConfig.squote += 1;
            //         str += "<span dir='auto' class='luckysheet-formula-text-color'>'</span>";
            //     }
            // }
            else if(s=="{" && matchConfig.dquote == 0) {
                str += '{';
                matchConfig.braces += 1;
            }
            else if(s=="}" && matchConfig.dquote == 0) {
                str += '}';
                matchConfig.braces -= 1;
            }
            else if (s == '"' && matchConfig.squote == 0) {
                if (matchConfig.dquote > 0) {
                    if (str.length > 0) {
                        function_str += str + '"</span>';
                    } 
                    else {
                        function_str += '"</span>';
                    }

                    matchConfig.dquote -= 1;
                    str = "";
                } 
                else {
                    matchConfig.dquote += 1;
                    
                    if (str.length > 0) {
                        function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-string">"';
                    } 
                    else {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-string">"';
                    }
                    //if (i == funcstack.length - 1) {
                    //    function_str += "</span>";
                    //}
                    str = "";
                }
            } 
            else if (s == ',' && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                //matchConfig.comma += 1;
                function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-comma">,</span>';
                str = "";
            } 
            else if (s == '&' && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                if (str.length > 0) {
                    function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + '&' + '</span>';;
                    str = "";
                } 
                else {
                    function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + '&' + '</span>';
                }
            }
            // else if (s == " " && matchConfig.dquote == 0){
            //  if(str.indexOf("</span>") == -1 && str.length>0){
            //      function_str += str + '</span>';
            //  }
            //  str = "<span dir='auto' class='luckysheet-formula-text-color'> ";
            //  if((i+1) < funcstack.length){
            //      while((i+1)<funcstack.length){
            //          if(funcstack[i+1]==" "){
            //              str += " ";
            //              i++;
            //          }
            //          else{
            //              break;
            //          }
            //      }
            //  }
            //  function_str += str + "</span>";
            // }
            else if (s in operatorjson && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                let s_next = "";
                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                let p = i-1, s_pre = null;;
                if(p >= 0){
                    do {
                        s_pre = funcstack[p--];
                    }
                    while (p >= 0 && s_pre ==" ")
                }

                if ((s + s_next) in operatorjson) {
                    if (str.length > 0) {
                        function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + s + s_next + '</span>';
                        str = "";
                    } 
                    else {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + s + s_next + '</span>';
                    }

                    i++;
                } 
                else if(!(/[^0-9]/.test(s_next)) && s=="-" && (s_pre=="(" || s_pre == null || s_pre == "," || s_pre == " " || s_pre in operatorjson ) ){
                    str += s;
                }
                else {
                    if (str.length > 0) {
                        function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + s + '</span>';
                        str = "";
                    } 
                    else {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + s + '</span>';
                    }
                }
            } 
            else {
                str += s;
            }

            if (i == funcstack.length - 1) {
                //function_str += str;
                if (_this.iscelldata($.trim(str))) {
                    function_str += '<span class="luckysheet-formula-functionrange-cell" rangeindex="' + _this.functionHTMLIndex + '" dir="auto" style="color:' + luckyColor[_this.functionHTMLIndex] + ';">' + str + '</span>';
                    _this.functionHTMLIndex++;
                } 
                else if (matchConfig.dquote > 0) {
                    function_str += str + '</span>';
                } 
                else if (str.indexOf("</span>") == -1 && str.length > 0) {
                    let regx = /{.*?}/;
                    
                    if(regx.test($.trim(str))){
                        let arraytxt = regx.exec(str)[0];
                        let arraystart = str.search(regx);
                        let alltxt = "";
                        
                        if(arraystart > 0){
                            alltxt += '<span dir="auto" class="luckysheet-formula-text-color">' + str.substr(0, arraystart) + '</span>';
                        }
                        
                        alltxt += '<span dir="auto" style="color:#959a05" class="luckysheet-formula-text-array">' + arraytxt + '</span>';

                        if(arraystart + arraytxt.length < str.length){
                            alltxt += '<span dir="auto" class="luckysheet-formula-text-color">' + str.substr(arraystart + arraytxt.length, str.length) + '</span>';
                        }

                        function_str += alltxt;
                    }
                    else{
                        function_str += '<span dir="auto" class="luckysheet-formula-text-color">' + str + '</span>';
                    }
                    // if(!isNaN(str)){
                    //     function_str += '<span dir="auto" class="luckysheet-formula-text-color">' + str + '</span>';
                    // }
                    // else{
                    //     function_str += '<span dir="auto" class="luckysheet-formula-text-color">' + str + '</span>';  
                    // }
                }
            }
            //console.log(i, str, function_str, s);
            i++;
        }

        return function_str;
    },
    getfunctionParam: function(txt) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};
            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }
            luckysheet.formula.operatorjson = op;
        }
        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }
        var funcstack = txt.split("");
        //var i=0;i<funcstack.length;i++
        var i = 0,
            str = "",
            function_str = "";
        var matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0,
            "compare":0
        }

        //bracket 0为运算符括号、1为函数括号
        var fn = null, param = [], bracket = [];

        while (i < funcstack.length) {
            var s = funcstack[i];

            if (s == "(" && matchConfig.dquote == 0) {
                if (str.length > 0 && bracket.length==0) {
                    fn = str.toUpperCase();
                    bracket.push(1);
                    str = "";
                }
                else if(bracket.length==0) {

                    //function_str += "(";
                    bracket.push(0);
                    str = "";
                }
                else{
                    bracket.push(0);
                    str += s;
                }
               
            } else if (s == ")" && matchConfig.dquote == 0) {
                var bt = bracket.pop();
                if(bracket.length==0){
                    //function_str += luckysheet.formula.functionParser(str) + ")";
                    param.push(str);
                    str = "";
                }
                else{
                    str += s;
                }
            }
            else if (s == '"') {
                str += '"';
                if (matchConfig.dquote > 0) {
                    matchConfig.dquote -= 1;
                    str = "";
                } else {
                    matchConfig.dquote += 1;
                }
            } else if (s == ',' && matchConfig.dquote == 0) {
                if(bracket.length<=1){
                    //function_str += luckysheet.formula.functionParser(str) + ",";
                    param.push(str);
                    str = "";
                }
                else{
                    str += ",";
                }
               
            }
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0) {
                var s_next = "";
                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                var p = i-1, s_pre = null;;
                if(p>=0){
                    do {
                        s_pre = funcstack[p--];
                    }
                    while (p>=0 && s_pre ==" ")
                }

                if(!(/[^0-9]/.test(s_next)) && s=="-" && (s_pre=="(" || s_pre == null || s_pre == "," || s_pre == " " || s_pre in luckysheet.formula.operatorjson ) ){
                    if (matchConfig.dquote == 0) {
                        str += $.trim(s);
                    } else {
                        str += s;
                    }
                }
                else{
                    function_str= "";
                    str = "";
                }
                
            } else {
                if (matchConfig.dquote == 0) {
                    str += $.trim(s);
                } else {
                    str += s;
                }
            }
            i++;
        }
        // console.log({"fn":fn, "param":param});
        return {"fn":fn, "param":param};
    },
    functionParser1: function(txt) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};
            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }
            luckysheet.formula.operatorjson = op;
        }
        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }
        var funcstack = txt.split("");
        //var i=0;i<funcstack.length;i++
        var i = 0,
            str = "",
            function_str = "",
            ispassby = true;
        var matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0,
            "compare":0
        }
        while (i < funcstack.length) {
            var s = funcstack[i];
            if (s == "(" && matchConfig.dquote == 0) {
                matchConfig.bracket += 1;
                if (str.length > 0) {
                    function_str += "luckysheet_function." + str.toUpperCase() + ".f(";
                } else {
                    function_str += "(";
                }
                str = "";
            } else if (s == ")" && matchConfig.dquote == 0) {
                matchConfig.bracket -= 1;
                //console.log(function_str, "#####",str);
                function_str += luckysheet.formula.functionParser(str);
                console.log(matchConfig.compare);
                if(matchConfig.compare == 1){
                    function_str += '))';
                    matchConfig.compare = 0;
                }
                else{
                    function_str += ')';
                }
                //console.log(function_str, "#####",str);
                str = "";
            }
            //else if (s == "'" && matchConfig.dquote==0) {
            //  if(matchConfig.squote>0){
            //      function_str += str + "'";
            //        matchConfig.squote -= 1;
            //        str = "";
            //  }
            //  else{
            //      matchConfig.squote += 1;
            //      str += "'";
            //  }
            //}
            else if (s == '"' && matchConfig.squote == 0) {
                if (matchConfig.dquote > 0) {
                    function_str += str + '"';
                    matchConfig.dquote -= 1;
                    str = "";
                } else {
                    matchConfig.dquote += 1;
                    str += '"';
                }
            } else if (s == ',' && matchConfig.dquote == 0) {
                //matchConfig.comma += 1;
                //console.log(function_str, "#####",str);
                function_str += luckysheet.formula.functionParser(str);
                if(matchConfig.compare == 1){
                    function_str += '),';
                    matchConfig.compare = 0;
                }
                else{
                    function_str += ',';
                }
                //console.log(function_str, "#####",str);
                str = "";
            } 
            // else if (s == '&' && matchConfig.dquote == 0) {
            //     if (str.length > 0) {
            //         function_str += luckysheet.formula.functionParser(str) + "+";
            //         str = "";
            //     } else {
            //         function_str += "+";
            //     }
            // } 
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0) {
                var s_next = "";
                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }
                if ((s + s_next) in luckysheet.formula.operatorjson) {
                    if (str.length > 0) {
                        matchConfig.compare = 1;
                        function_str += "luckysheet_compareWith(" + luckysheet.formula.functionParser(str) + ",'" + s + s_next + "', ";
                        str = "";
                    } else {
                        function_str += s + s_next;
                    }
                    i++;
                } else {
                    if (str.length > 0) {
                        matchConfig.compare = 1;
                        function_str += "luckysheet_compareWith(" + luckysheet.formula.functionParser(str) + ",'" + s + "', ";
                        str = "";
                    } else {
                        function_str += s;
                    }
                }
            } else {
                str += s;
            }
            if (i == funcstack.length - 1) {
                //function_str += str;
                if (luckysheet.formula.iscelldata($.trim(str))) {
                    function_str += "luckysheet_getcelldata('" + $.trim(str) + "')";
                } else {
                    function_str += $.trim(str);
                }
            }
            //console.log(i, str, function_str, s);
            i++;
        }
        console.log(function_str);
        return function_str;
    },
    calPostfixExpression: function(cal){
        if(cal.length == 0){
            return "";
        }

        var stack = [];
        for(var i = cal.length - 1; i >= 0; i--){
            var c = cal[i];
            if(c in luckysheet.formula.operatorjson){
                var s2 = stack.pop();
                var s1 = stack.pop();

                var str = "luckysheet_compareWith(" + s1 + ",'" + c + "', " + s2 + ")";

                stack.push(str);
            }
            else{
                stack.push(c);
            }
        }

        if(stack.length > 0){
            return stack[0];
        }
        else{
            return "";
        }    
    },
    checkBracketNum: function(fp){
        var bra_l = fp.match(/\(/g),
            bra_r = fp.match(/\)/g),
            //bra_tl_txt = fp.match(/".*?\(.*?"/g),
            //bra_tr_txt = fp.match(/".*?\).*?"/g);

            /*new runze*/
            bra_tl_txt = fp.match(/(['"])(?:(?!\1).)*?\1/g);
            bra_tr_txt = fp.match(/(['"])(?:(?!\1).)*?\1/g);


        var bra_l_len = 0, bra_r_len = 0;
        if (bra_l != null) {
            bra_l_len += bra_l.length;
        }
        if (bra_r != null) {
            bra_r_len += bra_r.length;
        }

        var bra_tl_len = 0, bra_tr_len = 0;
        if(bra_tl_txt!=null){
            for(var i=0;i<bra_tl_txt.length;i++){
                var bra_tl = bra_tl_txt[i].match(/\(/g);
                if (bra_tl != null) {
                    bra_tl_len += bra_tl.length;
                }
            }
        }

        if(bra_tr_txt!=null){
            for(var i=0;i<bra_tr_txt.length;i++){
                var bra_tr = bra_tr_txt[i].match(/\)/g);
                if (bra_tr != null) {
                    bra_tr_len += bra_tr.length;
                }
            }
        }

        bra_l_len -= bra_tl_len;
        bra_r_len -= bra_tr_len;

        if(bra_l_len != bra_r_len){
            return false;
        }
        else{
            return true;
        }
    },
    operatorPriority: {
        "^": 0,
        "%": 1,
        "*": 1,
        "/": 1,
        "+": 2,
        "-": 2
    },
    functionParser: function(txt) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};
            
            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            luckysheet.formula.operatorjson = op;
        }

        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }

        var funcstack = txt.split("");
        //var i=0;i<funcstack.length;i++
        var i = 0,
            str = "",
            function_str = "";

        var matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0,
            "compare": 0,
            "braces": 0
        }

        //=(sum(b1:c10)+10)*5-100

        //=MAX(B1:C10,10)*5-100

        // =(sum(max(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+count(B1:C10,10*5-100))*5-100

        //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+COUNT(B1:C10,10*5-100)

        //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)

        //=SUM(10,((1+1)*2+5)/2,10)

        //=SUM(MAX(B1:C10,10)*5-100)

        //bracket 0为运算符括号、1为函数括号
        var cal1 = [], cal2 = [], bracket = [];

        while (i < funcstack.length) {
            var s = funcstack[i];

            if (s == "(" && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                if (str.length > 0 && bracket.length == 0) {
                    function_str += "luckysheet_function." + str.toUpperCase() + ".f(";
                    bracket.push(1);
                    str = "";
                }
                else if(bracket.length == 0) {
                    function_str += "(";
                    bracket.push(0);
                    str = "";
                }
                else{
                    bracket.push(0);
                    str += s;
                }
            } 
            else if (s == ")" && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                var bt = bracket.pop();

                if(bracket.length == 0){
                    function_str += luckysheet.formula.functionParser(str) + ")";
                    str = "";
                }
                else{
                    str += s;
                }
            }
            else if(s == "{" && matchConfig.dquote == 0){
                str += '{';
                matchConfig.braces += 1;
            }
            else if(s == "}" && matchConfig.dquote == 0){
                str += '}';
                matchConfig.braces -= 1;
            }
            else if (s == '"') {
                str += '"';
                
                if (matchConfig.dquote > 0) {
                    matchConfig.dquote -= 1;
                } 
                else {
                    matchConfig.dquote += 1;
                }
            } 
            else if (s == ',' && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                if(bracket.length <= 1){
                    function_str += luckysheet.formula.functionParser(str) + ",";
                    str = "";
                }
                else{
                    str += ",";
                }
            }
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                var s_next = "";
                var op = luckysheet.formula.operatorPriority;

                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                if ((s + s_next) in luckysheet.formula.operatorjson) {
                    if(bracket.length == 0){
                        if($.trim(str).length > 0){
                            cal2.unshift(luckysheet.formula.functionParser($.trim(str)));
                        }
                        else if($.trim(function_str).length > 0){
                            cal2.unshift($.trim(function_str));
                        }

                        if(cal1[0] in luckysheet.formula.operatorjson){
                            var stackCeilPri = op[cal1[0]];

                            while(cal1.length > 0 && stackCeilPri != null){
                                cal2.unshift(cal1.shift());
                                stackCeilPri = op[cal1[0]];
                            }
                        }

                        cal1.unshift(s+s_next);
                       
                        function_str= "";
                        str = "";
                    } 
                    else {
                        str += s + s_next;
                    }

                    i++;
                } 
                else {
                    if(bracket.length == 0){
                        if($.trim(str).length > 0){
                            cal2.unshift(luckysheet.formula.functionParser($.trim(str)));
                        }
                        else if($.trim(function_str).length > 0){
                            cal2.unshift($.trim(function_str));
                        }

                        if(cal1[0] in luckysheet.formula.operatorjson){
                            var stackCeilPri = op[cal1[0]];
                            stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                            
                            var sPri = op[s];
                            sPri = sPri == null ? 1000 : sPri;

                            while(cal1.length > 0 && sPri >= stackCeilPri){
                                cal2.unshift(cal1.shift());

                                stackCeilPri = op[cal1[0]];
                                stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                            }
                        }

                        cal1.unshift(s);

                        function_str= "";
                        str = "";
                    }
                    else{
                        str += s;
                    }
                }
            } 
            else {
                if (matchConfig.dquote == 0) {
                    str += $.trim(s);
                } 
                else {
                    str += s;
                }
            }

            if (i == funcstack.length - 1) {
                var endstr = "";

                if (luckysheet.formula.iscelldata($.trim(str))) {
                    endstr = "luckysheet_getcelldata('" + $.trim(str) + "')";
                } 
                else {
                    str = $.trim(str);
                    
                    var regx = /{.*?}/;
                    if(regx.test(str) && str.substr(0, 1) != '"' && str.substr(str.length - 1, 1) != '"'){
                        var arraytxt = regx.exec(str)[0];
                        var arraystart = str.search(regx);
                        var alltxt = "";
                        
                        if(arraystart > 0){
                            endstr += str.substr(0, arraystart);

                        }
                        
                        endstr += "luckysheet_getarraydata('" + arraytxt + "')";

                        if(arraystart + arraytxt.length < str.length){
                            endstr += str.substr(arraystart + arraytxt.length, str.length);
                        }
                    }
                    else{
                        endstr = str;
                    }
                }

                if(endstr.length > 0){
                    cal2.unshift(endstr);
                }

                if(cal1.length > 0){
                    if(function_str.length > 0){
                        cal2.unshift(function_str);
                        function_str = "";
                    }
                   
                    while(cal1.length > 0){
                        cal2.unshift(cal1.shift());
                    }     
                }

                if(cal2.length > 0){
                    function_str = luckysheet.formula.calPostfixExpression(cal2);
                }
                else{
                    function_str += endstr;
                }
            }

            i++;
        }

        return function_str;
    },
    addFunctionGroup: function(r, c, func, index) {
        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }
        var luckysheetfile = luckysheet.getluckysheetfile();
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];
        if (file.calcChain == null) {
            file.calcChain = [];
        }
        var cc = {
            "r": r,
            "c": c,
            "index": index,
            "func": func
        };
        file.calcChain.push(cc);
        luckysheet.server.saveParam("fc", index, JSON.stringify(cc), {
            "op": "add",
            "pos": file.calcChain.length - 1
        });
        luckysheet.setluckysheetfile(luckysheetfile);
    },
    getFunctionGroup: function(index) {
        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }
        var luckysheetfile = luckysheet.getluckysheetfile();
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];
        if (file.calcChain == null) {
            return [];
        }
        return file.calcChain;
    },
    updateFunctionGroup: function(r, c, func, index) {
        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }
        var luckysheetfile = luckysheet.getluckysheetfile();
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];
        var calcChain = file.calcChain;
        if (calcChain != null) {
            for (var i = 0; i < calcChain.length; i++) {
                var calc = calcChain[i];
                if (calc.r == r && calc.c == c && calc.index == index) {
                    calcChain[i].func = func;
                    luckysheet.server.saveParam("fc", index, JSON.stringify(calc), {
                        "op": "update",
                        "pos": i
                    });
                    break;
                }
            }
        }
        luckysheet.setluckysheetfile(luckysheetfile);
    },
    insertUpdateFunctionGroup: function(r, c, func, index) {
        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }
        if (func == null) {
            this.delFunctionGroup(r, c, index);
            return;
        }
        var luckysheetfile = luckysheet.getluckysheetfile();
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];
        var calcChain = file.calcChain;
        if (calcChain == null) {
            calcChain = [];
        }
        for (var i = 0; i < calcChain.length; i++) {
            var calc = calcChain[i];
            if (calc.r == r && calc.c == c && calc.index == index) {
                calc.func = func;
                luckysheet.server.saveParam("fc", index, JSON.stringify(calc), {
                    "op": "update",
                    "pos": i
                });
                return;
            }
        }
        var cc = {
            "r": r,
            "c": c,
            "index": index,
            "func": func
        };
        calcChain.push(cc);
        file.calcChain = calcChain;
        luckysheet.server.saveParam("fc", index, JSON.stringify(cc), {
            "op": "add",
            "pos": file.calcChain.length - 1
        });
        luckysheet.setluckysheetfile(luckysheetfile);
    },
    isFunctionRangeSave: false,
    isFunctionRange: function(txt, r, c) {
        if (luckysheet.formula.operatorjson == null) {
            var arr = luckysheet.formula.operator.split("|"),
                op = {};

            for (var i = 0; i < arr.length; i++) {
                op[arr[i].toString()] = 1;
            }

            luckysheet.formula.operatorjson = op;
        }

        if (txt.substr(0, 1) == "=") {
            txt = txt.substr(1);
        }

        var funcstack = txt.split("");
        //var i=0;i<funcstack.length;i++
        var i = 0,
            str = "",
            function_str = "",
            ispassby = true;

        var matchConfig = {
            "bracket": 0,
            "comma": 0,
            "squote": 0,
            "dquote": 0
        }

        var luckysheetfile = luckysheet.getluckysheetfile();
        var dynamicArray_compute = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["dynamicArray_compute"] == null ? {} : luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["dynamicArray_compute"];

        while (i < funcstack.length) {
            var s = funcstack[i];

            if (s == "(" && matchConfig.dquote == 0) {
                matchConfig.bracket += 1;
                if (str.length > 0) {
                    function_str += "luckysheet_function." + str.toUpperCase() + ".f(";
                } 
                else {
                    function_str += "(";
                }
                str = "";
            } 
            else if (s == ")" && matchConfig.dquote == 0) {
                matchConfig.bracket -= 1;
                //if (matchConfig.bracket == 0) {
                function_str += luckysheet.formula.isFunctionRange(str, r, c) + ")";
                str = "";
                //}
            } 
            else if (s == ',' && matchConfig.dquote == 0) {
                //matchConfig.comma += 1;
                function_str += luckysheet.formula.isFunctionRange(str, r, c) + ',';
                str = "";
            } 
            else if (s in luckysheet.formula.operatorjson && matchConfig.dquote == 0) {
                var s_next = "";

                if ((i + 1) < funcstack.length) {
                    s_next = funcstack[i + 1];
                }

                if ((s + s_next) in luckysheet.formula.operatorjson) {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.isFunctionRange(str, r, c) + s + s_next;
                        str = "";
                    } 
                    else {
                        function_str += s + s_next;
                    }
                    i++;
                } 
                else {
                    if (str.length > 0) {
                        function_str += luckysheet.formula.isFunctionRange(str, r, c) + s;
                        str = "";
                    } else {
                        function_str += s;
                    }
                }
            } 
            else {
                str += s;
            }

            if (i == funcstack.length - 1) {
                //function_str += str;
                if (luckysheet.formula.iscelldata($.trim(str))) {
                    //function_str += "luckysheet_getcelldata('" + $.trim(str) + "')";
                    if (r != null && c != null) {
                        var range = this.getcellrange($.trim(str));
                        var row = range.row,
                            col = range.column;

                        if((r + "_" + c) in dynamicArray_compute){
                            var isd_range = false;

                            for(var d_r = row[0]; d_r <= row[1]; d_r++){
                                for(var d_c = col[0]; d_c <= col[1]; d_c++){
                                    if((d_r + "_" + d_c) in dynamicArray_compute && dynamicArray_compute[d_r + "_" + d_c].r == r && dynamicArray_compute[d_r + "_" + d_c].c == c){
                                        isd_range = true;
                                    }
                                }
                            }

                            if (isd_range) {
                                this.isFunctionRangeSave = this.isFunctionRangeSave || true;
                            } 
                            else {
                                this.isFunctionRangeSave = this.isFunctionRangeSave || false;
                            }
                        }
                        else{
                            if (r >= row[0] && r <= row[1] && c >= col[0] && c <= col[1]) {
                                this.isFunctionRangeSave = this.isFunctionRangeSave || true;
                            } 
                            else {
                                this.isFunctionRangeSave = this.isFunctionRangeSave || false;
                            }
                        }
                    } 
                    else {
                        var sheetlen = $.trim(str).split("!");
                        if (sheetlen.length > 1) {
                            this.isFunctionRangeSave = this.isFunctionRangeSave || true;
                        } else {
                            this.isFunctionRangeSave = this.isFunctionRangeSave || false;
                        }
                    }
                }
                //else {
                //    function_str += $.trim(str);
                //}
            }
            i++;
        }

        return function_str;
    },
    execvertex: {},
    execFunctionGroupData: null,
    execFunctionExist: null,
    execFunctionGroup: function(origin_r, origin_c, value, index, data) {
        if (data == null) {
            data = luckysheet.flowdata;
        }
        
        this.execFunctionGroupData = $.extend(true, [], data);
        
        if (value != null) {
            //此处setcellvalue 中this.execFunctionGroupData会保存想要更新的值，本函数结尾不要设为null,以备后续函数使用
            luckysheet.setcellvalue(origin_r, origin_c, this.execFunctionGroupData, value);
        }

        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }

        //{ "r": r, "c": c, "index": index, "func": func}
        var group = this.getFunctionGroup(index),
            vertex1 = {},
            stack = [],
            count = 0;

        this.execvertex = {};
        if (this.execFunctionExist == null) {
            var luckysheetfile = luckysheet.getluckysheetfile();

            for (var i = 0; i < group.length; i++) {
                var item = group[i];

                var cell = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(item["index"])].data[item.r][item.c];

                if(cell != null && cell.f != null && cell.f == item.func[2]){
                    if(!(item instanceof Object)){
                        item = eval('('+ item +')');
                    }

                    item.color = "w";
                    item.parent = null;
                    item.chidren = {};
                    item.times = 0;

                    vertex1["r" + item.r.toString() + "c" + item.c.toString()] = item;
                    this.isFunctionRangeSave = false;

                    if (origin_r != null && origin_c != null) {
                        this.isFunctionRange(item.func[2], origin_r, origin_c);
                    } 
                    else {
                        this.isFunctionRange(item.func[2]);
                    }

                    if (this.isFunctionRangeSave) {
                        stack.push(item);
                        this.execvertex["r" + item.r.toString() + "c" + item.c.toString()] = item;
                        count++;
                    }
                    //var v = luckysheet.formula.execfunction(f);
                    //value = { "v": v[1], "f": v[2] };
                    //data[item.r][item.c] = value;
                }
            }
        } 
        else {
            for (var x = 0; x < this.execFunctionExist.length; x++) {
                var cell = this.execFunctionExist[x];

                if ("r" + cell.r.toString() + "c" + cell.c.toString() in vertex1) {
                    continue;
                }

                for (var i = 0; i < group.length; i++) {
                    var item = group[i];

                    item.color = "w";
                    item.parent = null;
                    item.chidren = {};
                    item.times = 0;

                    vertex1["r" + item.r.toString() + "c" + item.c.toString()] = item;
                    this.isFunctionRangeSave = false;
                    this.isFunctionRange(item.func[2], cell.r, cell.c);
                    
                    if (this.isFunctionRangeSave) {
                        stack.push(item);
                        this.execvertex["r" + item.r.toString() + "c" + item.c.toString()] = item;
                        count++;
                    }
                }
            }
        }
        
        var x = 0,
            x1 = 0;

        while (stack.length > 0) {
            var u = stack.shift();

            for (var name in vertex1) {
                if (u.r == vertex1[name].r && u.c == vertex1[name].c) {
                    continue;
                }

                this.isFunctionRangeSave = false;
                //this.isFunctionRange(u.func[2], vertex1[name].r, vertex1[name].c);
                this.isFunctionRange(vertex1[name].func[2], u.r, u.c);

                if (this.isFunctionRangeSave) {
                    var v = vertex1[name];

                    if (!(name in this.execvertex)) {
                        stack.push(v);
                        this.execvertex[name] = v;
                    }

                    count++;
                    this.execvertex[name].chidren["r" + u.r.toString() + "c" + u.c.toString()] = 1;
                }
            }
        }

        this.groupValuesRefreshData = [];
        var i = 0;

        while (i < count) {
            for (var name in this.execvertex) {
                var u = this.execvertex[name];
                if (u.color == "w") {
                    this.functionDFS(u);
                } 
                else if (u.color == "b") {
                    i++;
                }
            }
        }
        //保留this.execFunctionGroupData用于传输更新结果
        //this.execFunctionGroupData = null;
        this.execFunctionExist = null;
    },
    //深度优先算法，处理多级调用函数
    functionDFS: function(u) {
        u.color = "g";
        u.times += 1;

        for (var chd in u.chidren) {
            var v = this.execvertex[chd];
            if (v.color == "w") {
                v.parent = "r" + u.r.toString() + "c" + u.c.toString();
                this.functionDFS(v);
            }
        }

        u.color = "b";
        window.luckysheet_getcelldata_cache = null;

        var v = luckysheet.formula.execfunction(u.func[2], u.r, u.c);

        var value = this.execFunctionGroupData[u.r][u.c];
        if(value == null){
            value = {};
        }

        value.v = v[1];
        value.f = v[2];

        if(value.spl != null){
            window.luckysheetCurrentRow = u.r;
            window.luckysheetCurrentColumn = u.c;
            window.luckysheetCurrentFunction = this.execFunctionGroupData[u.r][u.c].f;

            var fp = $.trim(luckysheet.formula.functionParser(this.execFunctionGroupData[u.r][u.c].f));
            var sparklines = eval(fp);
            value.spl = sparklines;
        }

        this.groupValuesRefreshData.push({
            "r": u.r,
            "c": u.c,
            "v": value,
            "i": luckysheet.currentSheetIndex
        });

        this.execFunctionGroupData[u.r][u.c] = value;
    },
    groupValuesRefreshData: [],
    groupValuesRefresh: function() {
        if(this.groupValuesRefreshData.length > 0){
            for (var i = 0; i < this.groupValuesRefreshData.length; i++) {
                var item = this.groupValuesRefreshData[i];

                if(item.i != luckysheet.currentSheetIndex){
                    continue;
                }

                luckysheet.setcellvalue(item.r, item.c, luckysheet.flowdata, item.v);
                luckysheet.server.saveParam("v", luckysheet.currentSheetIndex, item.v, {
                    "r": item.r,
                    "c": item.c
                });
            }

            luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据
        }
    },
    delFunctionGroup: function(r, c, index) {
        if (index == null) {
            index = luckysheet.currentSheetIndex;
        }

        var luckysheetfile = luckysheet.getluckysheetfile();
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];
        
        var calcChain = file.calcChain;
        if (calcChain != null) {
            for (var i = 0; i < calcChain.length; i++) {
                var calc = calcChain[i];
                if (calc.r == r && calc.c == c && calc.index == index) {
                    calcChain.splice(i, 1);
                    luckysheet.server.saveParam("fc", index, null, {
                        "op": "del",
                        "pos": i
                    });
                    break;
                }
            }
        }

        luckysheet.setluckysheetfile(luckysheetfile);
    },
    execfunction1: function(txt, r, c, isrefresh) {
        var fp = $.trim(this.functionParser(txt));
        var funcf = fp.match(/luckysheet_function/g),
            funcg = fp.match(/luckysheet_getcelldata/g),
            funcc = fp.match(/luckysheet_compareWith/g),
            funclen = 0;

        if (isrefresh == null) {
            isrefresh = false;
        }

        if (funcf != null) {
            funclen += funcf.length;
        }

        if (funcg != null) {
            funclen += funcg.length;
        }

        if (funcc != null) {
            funclen += funcc.length;
        }

        var quota1 = fp.match(/\(/g),
            quota2 = fp.match(/\)/g),
            quotalen = 0;

        if (quota1 != null) {
            quotalen += quota1.length;
        }

        if (quota2 != null) {
            quotalen += quota2.length;
        }
        //var funclen = fp.match(/luckysheet_function/g).length + fp.match(/luckysheet_getcelldata/g).length;
        //var quotalen = fp.match(/\(/g).length + fp.match(/\)/g).length;
        //if(fp.substr(0, 16)=="luckysheet_function." && (fp.substr(fp.length-1, 1)!=")" || funclen!=quotalen/2 )  ){
        //console.log("fp.substr(0, 18)",fp.substr(0, 18));
        if ((fp.substr(0, 16) == "luckysheet_function." || fp.substr(0, 18) == "luckysheet_compareWith") && funclen != quotalen / 2) {
            fp += ")";
            if(fp.substr(0, 16) == "luckysheet_function."){
                txt += ")";
            }
            this.functionHTMLIndex = 0;
            $("#luckysheet-functionbox-cell").html('<span dir="auto" class="luckysheet-formula-text-color">=</span>' + this.functionHTML(txt));
        }

        if (!this.testFunction(txt, fp)) {
            luckysheet.tooltip.info("提示", "公式存在错误");
            return [false, this.error.n, txt];
        }

        var result = null;
        window.luckysheetCurrentRow = r;
        window.luckysheetCurrentColumn = c;
        window.luckysheetCurrentFunction = txt;

        try {
            result = eval(fp);
        } 
        catch (e) {
            var err = e;
            //err错误提示处理
            console.log(e);
            err = luckysheet.formula.errorInfo(err);
            result = [luckysheet.formula.error.n, err];
        }

        if (result instanceof Array) {
            result = result[0];
            //错误处理
        }
        else if(result instanceof Object){
            result = result.data;
            if (result instanceof Array) {
                result = result[0];
            }
        }

        window.luckysheetCurrentRow = null;
        window.luckysheetCurrentColumn = null;
        window.luckysheetCurrentFunction = null;

        if (fp.substr(0, 19) == "luckysheet_getcelldata(") {
            if (result instanceof Array) {
                result = result.join(",");
            } 
            else if (result instanceof Object) {
                result = result.v;
            }
        }

        if (r != null && c != null) {
            //luckysheet.flowdata[r][c] = result;
            if (isrefresh) {
                this.execFunctionGroup(r, c, result);
            }
            this.insertUpdateFunctionGroup(r, c, [true, result, txt]);
        }

        return [true, result, txt];
    },
    execfunction: function(txt, r, c, isrefresh, notInsertFunc) {
        if(txt.indexOf(this.error.r) > -1){
            return [false, this.error.r, txt];
        }

        if (!this.checkBracketNum(txt)) {
            txt += ")";
        }

        var fp = $.trim(this.functionParser(txt));
        
        if ((fp.substr(0, 16) == "luckysheet_function." || fp.substr(0, 18) == "luckysheet_compareWith") ) {
            this.functionHTMLIndex = 0;
            // $("#luckysheet-functionbox-cell").html('<span dir="auto" class="luckysheet-formula-text-color">=</span>' + this.functionHTML(txt));
        }

        if (!this.testFunction(txt, fp) || fp == "") {
            luckysheet.tooltip.info("提示", "公式存在错误");
            return [false, this.error.n, txt];
        }

        var result = null;
        window.luckysheetCurrentRow = r;
        window.luckysheetCurrentColumn = c;
        window.luckysheetCurrentFunction = txt;

        var sparklines = null;

        try {
            if(fp.indexOf("luckysheet_getcelldata") > -1){
                var funcg = fp.split("luckysheet_getcelldata('");

                for(var i = 1; i < funcg.length; i++){
                    var funcgStr = funcg[i].split("')")[0];
                    var funcgRange = luckysheet.formula.getcellrange(funcgStr);

                    if(funcgRange.row[0] < 0 || funcgRange.column[0] < 0){
                        return [true, luckysheet.formula.error.r, txt];
                    }

                    if(funcgRange.sheetIndex == luckysheet.currentSheetIndex && r >= funcgRange.row[0] && r <= funcgRange.row[1] && c >= funcgRange.column[0] && c <= funcgRange.column[1]){
                        if(luckysheet.luckysheetConfigsetting.editMode){
                            alert("公式不可引用其本身的单元格");
                        }
                        else{
                            luckysheet.tooltip.info("公式不可引用其本身的单元格，会导致计算结果不准确", "");
                            
                        }

                        return [false, 0, txt];
                    }
                }
            }

            result = eval(fp);

            //加入sparklines的参数项目
            if(fp.indexOf("SPLINES") > -1){
                sparklines = result;
                result = "";
            }
        } 
        catch (e) {
            var err = e;
            //err错误提示处理
            console.log(e);
            err = luckysheet.formula.errorInfo(err);
            result = [luckysheet.formula.error.n, err];
        }

        //公式结果是对象，则表示只是选区。如果是单个单元格，则返回其值；如果是多个单元格，则返回 #VALUE!。
        if(luckysheet.getObjType(result) == "object" && result.startCell != null){
            if(luckysheet.getObjType(result.data) == "array"){
                result = luckysheet.formula.error.v;
            }
            else{
                if(result.data == null || luckysheet.func_methods.isRealNull(result.data.v)){
                    result = 0;
                }
                else{
                    result = result.data.v;
                }
            }
        }

        //公式结果是数组，分错误值 和 动态数组 两种情况
        if(luckysheet.getObjType(result) == "array"){
            var isErr = false; 

            if(luckysheet.getObjType(result[0]) != "array" && result.length == 2){
                isErr = luckysheet.func_methods.valueIsError(result[0]);
            }

            if(!isErr){
                if(luckysheet.getObjType(result[0]) == "array" && result.length == 1 && result[0].length == 1){
                    result = result[0][0];
                }
                else{
                    var luckysheetfile = luckysheet.getluckysheetfile();
                    var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];
                    var dynamicArray = file["dynamicArray"] == null ? [] : file["dynamicArray"];
                    dynamicArray.push({"r": r, "c": c, "f": txt, "data": result});
                        
                    file["dynamicArray"] = dynamicArray;
                    luckysheet.setluckysheetfile(luckysheetfile);

                    result = "";
                }
            }
            else{
                result = result[0];
            }
        }

        window.luckysheetCurrentRow = null;
        window.luckysheetCurrentColumn = null;
        window.luckysheetCurrentFunction = null;

        if (r != null && c != null) {
            if (isrefresh) {
                this.execFunctionGroup(r, c, result);
            }

            if(!notInsertFunc){
                this.insertUpdateFunctionGroup(r, c, [true, result, txt]);
            }
        }

        if(!!sparklines){
            return [true, result, txt, {type:"sparklines", data:sparklines}];
        }

        return [true, result, txt];
    },
    testFunction: function(txt, fp) {
        if (txt.substr(0, 1) == "=") {
            return true;
        } 
        else {
            return false;
        }
    },
    functionResizeData: {},
    functionResizeStatus: false,
    functionResizeTimeout: null,
    data_parm_index: 0  //选择公式后参数索引标记
}