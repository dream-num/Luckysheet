import luckysheetConfigsetting from '../controllers/luckysheetConfigsetting';
import { luckysheet_getcelldata, luckysheet_parseData, luckysheet_getValue, luckysheet_calcADPMM } from './func';
import { inverse } from './matrix_methods';
import { getSheetIndex, getluckysheetfile,getRangetxt } from '../methods/get';
import menuButton from '../controllers/menuButton';
import luckysheetSparkline from '../controllers/sparkline';
import formula from '../global/formula';
import func_methods from '../global/func_methods';
import editor from '../global/editor';
import { isdatetime, diff, isdatatype } from '../global/datecontroll';
import { isRealNum, isRealNull, valueIsError,error } from '../global/validate';
import { jfrefreshgrid } from '../global/refresh';
import { genarate, update } from '../global/format';
import { orderbydata } from '../global/sort';
import { getcellvalue } from '../global/getdata';
import { getObjType, ABCatNum, chatatABC, numFormat } from '../utils/util';
import Store from '../store';
import dayjs from 'dayjs';
import numeral from 'numeral';

//公式函数计算
const functionImplementation = {
    "SUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        if(getObjType(data) == "boolean"){
                            if(data.toString().toLowerCase() == "true"){
                                dataArr.push(1);
                            }
                            else if(data.toString().toLowerCase() == "false"){
                                dataArr.push(0);
                            }
                        }
                        else{
                            return formula.error.v;
                        }
                    }
                    else{
                        dataArr.push(data);
                    }
                }
            }

            var sum = 0;

            if(dataArr.length > 0){
                for(var i = 0; i < dataArr.length; i++){
                    if(valueIsError(dataArr[i])){
                        return dataArr[i];
                    }

                    if(!isRealNum(dataArr[i])){
                        continue;
                    }

                    sum = luckysheet_calcADPMM(sum, "+", dataArr[i]);// parseFloat(dataArr[i]);
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AVERAGE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    }
                    else{
                        dataArr = dataArr.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var sum = 0, count = 0;

            for(var i = 0; i < dataArr.length; i++){
                if(valueIsError(dataArr[i])){
                    return dataArr[i];
                }
                else if(!isRealNum(dataArr[i])){
                    return formula.error.v;
                }

                sum = luckysheet_calcADPMM(sum, "+", dataArr[i]);// parseFloat(dataArr[i]);
                count++;
            }

            if(count == 0){
                return formula.error.d;
            }

            return luckysheet_calcADPMM(sum, "/", count);// sum / count;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    }
                    else{
                        dataArr = dataArr.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    if(getObjType(data) == "boolean"){
                        if(data.toString().toLowerCase() == "true"){
                            dataArr.push(1);
                        }
                        else if(data.toString().toLowerCase() == "false"){
                            dataArr.push(0);
                        }
                    }
                    else{
                        dataArr.push(data);
                    }
                }
            }

            var count = 0;

            for(var i = 0; i < dataArr.length; i++){
                if(isRealNum(dataArr[i])){
                    count++;
                }
            }

            return count;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNTA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        dataArr = dataArr.concat(func_methods.getDataArr(data));
                    }
                    else{
                        dataArr = dataArr.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            return dataArr.length;
        }
        catch (err) {
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MAX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    }
                    else{
                        dataArr = dataArr.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var max = null;

            for(var i = 0; i < dataArr.length; i++){
                if(valueIsError(dataArr[i])){
                    return dataArr[i];
                }

                if(!isRealNum(dataArr[i])){
                    continue;
                }

                if(max == null || parseFloat(dataArr[i]) > max){
                    max = parseFloat(dataArr[i]);
                }
            }

            return max == null ? 0 : max;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    }
                    else{
                        dataArr = dataArr.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var min = null;

            for(var i = 0; i < dataArr.length; i++){
                if(valueIsError(dataArr[i])){
                    return dataArr[i];
                }

                if(!isRealNum(dataArr[i])){
                    continue;
                }

                if(min == null || parseFloat(dataArr[i]) < min){
                    min = parseFloat(dataArr[i]);
                }
            }

            return min == null ? 0 : min;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AGE_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
            if(valueIsError(birthday)){
                return birthday;
            }

            birthday = dayjs(birthday);

            var cuurentdate = dayjs();
            if(arguments.length == 2){
                cuurentdate = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(cuurentdate)){
                    return cuurentdate;
                }

                cuurentdate = dayjs(cuurentdate);
            }

            var age = cuurentdate.diff(birthday, "years");

            if(age < 0 || age.toString() == "NaN"){
                return formula.error.v;
            }

            return age;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SEX_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                return "男";
            }
            else {
                return "女";
            }
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BIRTHDAY_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var birthday = "";
            if (UUserCard.length == 15) {
                var year = "19" + UUserCard.substring(6, 8) + "/" + UUserCard.substring(8, 10) + "/" + UUserCard.substring(10, 12);
                birthday = year;
            }
            else if (UUserCard.length == 18) {
                var year = UUserCard.substring(6, 10) + "/" + UUserCard.substring(10, 12) + "/" + UUserCard.substring(12, 14);
                birthday = year;
            }

            //生日格式
            var datetype = 0;
            if (arguments[1] != null) {
                datetype = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(datetype)){
                    return datetype;
                }
            }

            if(!isRealNum(datetype)){
                return formula.error.v;
            }

            datetype = parseInt(datetype);

            if(datetype < 0 || datetype > 2){
                return formula.error.v;
            }

            if(parseInt(datetype) == 0){
                return birthday;
            }
            else if(parseInt(datetype) == 1){
                return dayjs(birthday).format("YYYY-MM-DD");
            }
            else if(parseInt(datetype) == 2){
                return dayjs(birthday).format("YYYY年M月D日");
            }
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PROVINCE_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var native = "未知";
            var provinceArray = formula.classlist.province;

            if (UUserCard.substring(0, 2) in provinceArray) {
                native = provinceArray[UUserCard.substring(0, 2)];
            }

            return native;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CITY_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var dataNum = cityData.length,
                native = "未知";

            for (var i = 0; i < dataNum; i++) {
                if (UUserCard.substring(0, 6) == cityData[i].code) {
                    native = cityData[i].title;
                    break;
                }
            }

            return native;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STAR_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
            if(valueIsError(birthday)){
                return birthday;
            }

            birthday = new Date(birthday);

            var month = birthday.getMonth(),
                day = birthday.getDate();

            var d = new Date(1999, month, day, 0, 0, 0);
            var arr = [];
            arr.push(["魔羯座", new Date(1999, 0, 1, 0, 0, 0)]);
            arr.push(["水瓶座", new Date(1999, 0, 20, 0, 0, 0)]);
            arr.push(["双鱼座", new Date(1999, 1, 19, 0, 0, 0)]);
            arr.push(["白羊座", new Date(1999, 2, 21, 0, 0, 0)]);
            arr.push(["金牛座", new Date(1999, 3, 21, 0, 0, 0)]);
            arr.push(["双子座", new Date(1999, 4, 21, 0, 0, 0)]);
            arr.push(["巨蟹座", new Date(1999, 5, 22, 0, 0, 0)]);
            arr.push(["狮子座", new Date(1999, 6, 23, 0, 0, 0)]);
            arr.push(["处女座", new Date(1999, 7, 23, 0, 0, 0)]);
            arr.push(["天秤座", new Date(1999, 8, 23, 0, 0, 0)]);
            arr.push(["天蝎座", new Date(1999, 9, 23, 0, 0, 0)]);
            arr.push(["射手座", new Date(1999, 10, 22, 0, 0, 0)]);
            arr.push(["魔羯座", new Date(1999, 11, 22, 0, 0, 0)]);
            //console.log(birthday, arr, i);
            for (var i = arr.length - 1; i >= 0; i--) {
                if (d >= arr[i][1]) {
                    return arr[i][0];
                }
            }

            return "未找到匹配星座信息";
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ANIMAL_BY_IDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //身份证号
            var UUserCard = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(UUserCard)){
                return UUserCard;
            }

            if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                return formula.error.v;
            }

            var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
            if(valueIsError(birthday)){
                return birthday;
            }

            birthday = new Date(birthday);

            var list = new Array("猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗");
            var index = (parseInt(birthday.getFullYear()) + 9) % 12;

            if (index != null && !isNaN(index)) {
                return list[index];
            }
            else {
                return "未找到匹配生肖信息";
            }
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISIDCARD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var idcard = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(idcard)){
                return idcard;
            }

            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

            if(reg.test(idcard)){
                return true
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DM_TEXT_CUTWORD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //任意需要分词的文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //分词模式
            var datetype = 0;
            if (arguments[1] != null) {
                datetype = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(datetype)){
                    return datetype;
                }
            }

            if(!isRealNum(datetype)){
                return formula.error.v;
            }

            datetype = parseInt(datetype);

            if(datetype != 0 &&　datetype != 1 && datetype != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/cutword", {
                "text": text,
                "type": datetype
            }, function(data) {
                var d = [].concat(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DM_TEXT_TFIDF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //任意需要分词的文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //关键词个数
            var count = 20;
            if (arguments[1] != null) {
                count = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(count)){
                    return count;
                }
            }

            if(!isRealNum(count)){
                return formula.error.v;
            }

            count = parseInt(count);

            //语料库
            var set = 0;
            if (arguments[2] != null) {
                set = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(set)){
                    return set;
                }
            }

            if(!isRealNum(set)){
                return formula.error.v;
            }

            set = parseInt(set);

            if(count < 0){
                return formula.error.v;
            }

            if(set != 0 && set != 1 && set != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/tfidf", {
                "text": text,
                "count": count,
                "set": set
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DM_TEXT_TEXTRANK": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //任意需要分词的文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //关键词个数
            var count = 20;
            if (arguments[1] != null) {
                count = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(count)){
                    return count;
                }
            }

            if(!isRealNum(count)){
                return formula.error.v;
            }

            count = parseInt(count);

            //语料库
            var set = 0;
            if (arguments[2] != null) {
                set = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(set)){
                    return set;
                }
            }

            if(!isRealNum(set)){
                return formula.error.v;
            }

            set = parseInt(set);

            if(count < 0){
                return formula.error.v;
            }

            if(set != 0 && set != 1 && set != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/tfidf", {
                "text": text,
                "count": count,
                "set": set
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_CLOSE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "0"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                var v = numFormat(data);
                if (v == null) {
                    v = data;
                }
                formula.execFunctionGroup(cell_r, cell_c, v);
                d[cell_r][cell_c] = {
                    "v": v,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_OPEN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "1"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_MAX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "2"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_MIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "3"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_VOLUMN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "4"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATA_CN_STOCK_AMOUNT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;

            //股票代码
            var stockcode = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(stockcode)){
                return stockcode;
            }

            //日期
            var date = null;

            if(arguments[1] != null){
                var data_date = arguments[1];

                if(getObjType(data_date) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(data_date) == "object" && data_date.startCell != null){
                    if(data_date.data != null && getObjType(data_date.data) != "array" && data_date.data.ct != null && data_date.data.ct.t == "d"){
                        date = update("yyyy-mm-dd", data_date.data.v);
                    }
                    else{
                        return formula.error.v;
                    }
                }
                else{
                    date = data_date;
                }

                if(!isdatetime(date)){
                    return [formula.error.v, "日期错误"];
                }

                date = dayjs(date).format("YYYY-MM-DD");
            }

            //复权除权
            var price = 0;
            if (arguments[2] != null) {
                price = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(price)){
                    return price;
                }
            }

            if(!isRealNum(price)){
                return formula.error.v;
            }

            price = parseInt(price);

            if(price != 0 && price != 1 && price != 2){
                return formula.error.v;
            }

            $.post("/dataqk/tu/api/getstockinfo", {
                "stockCode": stockcode,
                "date": date,
                "price": price,
                type: "5"
            }, function(data) {
                var d = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cell_r, cell_c, data);
                d[cell_r][cell_c] = {
                    "v": data,
                    "f": cell_fp
                };
                jfrefreshgrid(d, [{"row": [cell_r, cell_r], "column": [cell_c, cell_c]}]);
            });

            return "loading...";
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISDATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //日期
            var date = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(date)){
                return date;
            }

            return isdatetime(date);
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMIF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //=SUMIF(A2:A5,">1600000",B2:B5)
            //=SUMIF(A2:A5,">1600000")
            //=SUMIF(A2:A5,3000000,B2:B5)
            //找出range中匹配的字符串
            var sum = 0;

            var rangeData = arguments[0].data;
            var rangeRow = arguments[0].rowl;
            var rangeCol = arguments[0].coll;

            var criteria = luckysheet_parseData(arguments[1]);

            rangeData = formula.getRangeArray(rangeData)[0];

            //如果有第三个参数
            if(arguments[2]){
                var sumRangeData = [];
                //根据选择的目标的区域确定实际目标区域
                //初始位置
                var sumRangeStart = arguments[2].startCell;
                var sumRangeRow = arguments[2].rowl;
                var sumRangeCol = arguments[2].coll;
                var sumRangeSheet = arguments[2].sheetName;

                if(rangeRow == sumRangeRow && rangeCol == sumRangeCol){
                    sumRangeData = arguments[2].data;
                }
                else{
                    var row=[],col=[];
                    var sumRangeEnd = "";
                    var realSumRange = "";
                    //console.log("开始位置！！！",sumRangeStart,typeof(sumRangeStart));
                    row[0] = parseInt(sumRangeStart.replace(/[^0-9]/g,"")) - 1;
                    col[0] = ABCatNum(sumRangeStart.replace(/[^A-Za-z]/g,""));

                    //根据第一个范围的长宽确定目标范围的末尾位置
                    row[1] = row[0] + rangeRow - 1;
                    col[1] = col[0] + rangeCol - 1;

                    //console.log(row[0],col[0],row[1],col[1]);
                    //末尾位置转化为sheet格式：如 F4
                    var real_ABC = chatatABC(col[1]);
                    var real_Num = row[1] + 1;
                    sumRangeEnd = real_ABC + real_Num;
                    //console.log("合成新的末尾位置：" + sumRangeEnd);

                    realSumRange = sumRangeSheet + "!" +sumRangeStart + ":" + sumRangeEnd;
                    sumRangeData = luckysheet_getcelldata(realSumRange).data;
                    //console.log("最终的目标范围：",sumRangeData);
                }

                sumRangeData = formula.getRangeArray(sumRangeData)[0];

                //循环遍历查找匹配项
                for(var i = 0; i < rangeData.length;i++){
                    var v = rangeData[i];

                    if(!!v && formula.acompareb(v, criteria)){
                        if(!isRealNum(sumRangeData[i])){
                            continue;
                        }

                        sum = luckysheet_calcADPMM(sum, "+", sumRangeData[i]);// parseFloat(sumRangeData[i]);
                    }
                }
            }
            else{
                //循环遍历查找匹配项
                for(var i = 0; i < rangeData.length;i++){
                    var v = rangeData[i];

                    if(!!v && formula.acompareb(v, criteria)){
                        if(!isRealNum(v)){
                            continue;
                        }

                        sum = luckysheet_calcADPMM(sum, "", v);// parseFloat(v);
                    }
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.tan(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TANH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            var e2 = Math.exp(2 * number);

            return (e2 - 1) / (e2 + 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CEILING": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //number
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //significance
            var significance = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(significance)){
                return significance;
            }

            if(!isRealNum(significance)){
                return formula.error.v;
            }

            significance = parseFloat(significance);

            if(significance == 0){
                return 0;
            }

            if(number > 0 && significance < 0){
                return formula.error.nm;
            }

            return Math.ceil(number / significance) * significance;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ATAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.atan(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ASINH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.log(number + Math.sqrt(number * number + 1));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ABS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.abs(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ACOS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number < -1 || number > 1){
                return formula.error.nm;
            }

            return Math.acos(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ACOSH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number < 1){
                return formula.error.nm;
            }

            return Math.log(number + Math.sqrt(number * number - 1));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MULTINOMIAL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var sum = 0, divisor = 1;

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                if(number < 0){
                    return formula.error.nm;
                }

                sum += number;
                divisor *= func_methods.factorial(number);
            }

            return func_methods.factorial(sum) / divisor;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ATANH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number <= -1 ||　number >= 1){
                return formula.error.nm;
            }

            return Math.log((1 + number) / (1 - number)) / 2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ATAN2": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要计算其与x轴夹角大小的线段的终点x坐标
            var number_x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number_x)){
                return number_x;
            }

            if(!isRealNum(number_x)){
                return formula.error.v;
            }

            number_x = parseFloat(number_x);

            //要计算其与x轴夹角大小的线段的终点y坐标
            var number_y = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_y)){
                return number_y;
            }

            if(!isRealNum(number_y)){
                return formula.error.v;
            }

            number_y = parseFloat(number_y);

            if(number_x == 0 && number_y == 0){
                return formula.error.d;
            }

            return Math.atan2(number_y, number_x);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNTBLANK": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var data = arguments[0];
            var sum = 0;

            if(getObjType(data) == "object" && data.startCell != null){
                if(data.data == null){
                    return 1;
                }

                if(getObjType(data.data) == "array"){
                    for(var r = 0; r < data.data.length; r++){
                        for(var c = 0; c < data.data[r].length; c++){
                            if(data.data[r][c] == null || isRealNull(data.data[r][c].v)){
                                sum++;
                            }
                        }
                    }
                }
                else{
                    if(isRealNull(data.data.v)){
                        sum++;
                    }
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COSH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return (Math.exp(number) + Math.exp(-number)) / 2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "INT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var data = arguments[0];

            if(getObjType(data) == "array"){
                if(getObjType(data[0]) == "array"){
                    if(!func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    if(!isRealNum(data[0][0])){
                        return formula.error.v;
                    }

                    return Math.floor(parseFloat(data[0][0]));
                }
                else{
                    if(!isRealNum(data[0])){
                        return formula.error.v;
                    }

                    return Math.floor(parseFloat(data[0]));
                }
            }
            else if(getObjType(data) == "object" && data.startCell != null){
                if(data.coll > 1){
                    return formula.error.v;
                }

                if(data.rowl > 1){
                    var cellrange = formula.getcellrange(data.startCell);
                    var str = cellrange.row[0];

                    if(window.luckysheetCurrentRow < str || window.luckysheetCurrentRow > str + data.rowl - 1){
                        return formula.error.v;
                    }

                    var cell = data.data[window.luckysheetCurrentRow - str][0];
                }
                else{
                    var cell = data.data;
                }

                if(cell == null || isRealNull(cell.v)){
                    return 0;
                }

                if(!isRealNum(cell.v)){
                    return formula.error.v;
                }

                return Math.floor(parseFloat(cell.v));
            }
            else{
                if(getObjType(data) == "boolean"){
                    if(data.toString().toLowerCase() == "true"){
                        return 1;
                    }

                    if(data.toString().toLowerCase() == "false"){
                        return 0;
                    }
                }

                if(!isRealNum(data)){
                    return formula.error.v;
                }

                return Math.floor(parseFloat(data));
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISEVEN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            return Math.abs(number) & 1 ? false : true;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISODD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            return Math.abs(number) & 1 ? true : false;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LCM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var o = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array"){
                        if(!func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        o = o.concat(func_methods.getDataArr(data));
                    }
                    else{
                        o = o.concat(data);
                    }
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    o = o.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    o.push(data);
                }
            }

            for(var y = 0; y < o.length; y++){
                var number = o[y];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseInt(number);

                if(number < 0){
                    return formula.error.nm;
                }

                o[y] = number;
            }

            for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined;) {
                if(n == 0){
                    r = 0;
                }

                while (n > 1) {
                    if (n % 2) {
                        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
                            //empty
                        }

                        d = (i <= j) ? i : n;
                    }
                    else {
                        d = 2;
                    }

                    for (n /= d, r *= d, i = o.length; i; (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
                        //empty
                    }
                }
            }

            if(r >= Math.pow(2, 53)){
                return formula.error.nm;
            }

            return r;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number <= 0){
                return formula.error.nm;
            }

            return Math.log(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOG": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number <= 0){
                return formula.error.nm;
            }

            if(arguments.length == 2){
                var base = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(base)){
                    return base;
                }

                if(!isRealNum(base)){
                    return formula.error.v;
                }

                base = parseFloat(base);

                if(base <= 0){
                    return formula.error.nm;
                }
            }
            else{
                var base = 10;
            }

            return Math.log(number) / Math.log(base);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOG10": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number <= 0){
                return formula.error.nm;
            }

            return Math.log(number) / Math.log(10);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MOD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //被除数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //除数
            var divisor = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(divisor)){
                return divisor;
            }

            if(!isRealNum(divisor)){
                return formula.error.v;
            }

            divisor = parseFloat(divisor);

            if(divisor == 0){
                return formula.error.d;
            }

            //计算结果
            var modulus = Math.abs(number % divisor);
            return (divisor > 0) ? modulus : -modulus;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MROUND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要舍入的值
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //要舍入到的倍数
            var multiple = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(multiple)){
                return multiple;
            }

            if(!isRealNum(multiple)){
                return formula.error.v;
            }

            multiple = parseFloat(multiple);

            if (number * multiple < 0){
                return formula.error.nm;
            }

            //计算结果
            return Math.round(number / multiple) * multiple;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ODD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            var temp = Math.ceil(Math.abs(number));
            temp = (temp & 1) ? temp : temp + 1;
            return (number >= 0) ? temp : -temp;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMSQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var sum = 0;

            if(dataArr.length > 0){
                for(var i = 0; i < dataArr.length; i++){
                    var number = dataArr[i];

                    if(!isRealNum(number)){
                        return formula.error.v;
                    }

                    number = parseFloat(number);

                    sum += number * number;
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COMBIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //项目的数量
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            //每一组合中项目的数量
            var number_chosen = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_chosen)){
                return number_chosen;
            }

            if(!isRealNum(number_chosen)){
                return formula.error.v;
            }

            number_chosen = parseInt(number_chosen);

            if (number < 0 || number_chosen < 0 || number < number_chosen){
                return formula.error.nm;
            }

            //计算结果
            return func_methods.factorial(number) / (func_methods.factorial(number_chosen) * func_methods.factorial(number - number_chosen))
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUBTOTAL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字 1-11 或 101-111，用于指定要为分类汇总使用的函数
            var data_function_num = arguments[0];
            var function_num;

            if(getObjType(data_function_num) == "array"){
                if(getObjType(data_function_num[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_function_num)){
                        return formula.error.v;
                    }

                    function_num = [];

                    for(var i = 0; i < data_function_num.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < data_function_num[i].length; j++){
                            rowArr.push(data_function_num[i][j]);
                        }

                        function_num.push(rowArr);
                    }
                }
                else{
                    function_num = [];

                    for(var i = 0; i < data_function_num.length; i++){
                        function_num.push(data_function_num[i]);
                    }
                }
            }
            else if(getObjType(data_function_num) == "object" && data_function_num.startCell != null){
                function_num = func_methods.getFirstValue(data_function_num);
            }
            else{
                function_num = data_function_num;
            }

            var arr = Array.prototype.slice.apply(arguments);
            arr.shift();

            //计算结果
            if(getObjType(function_num) == "array"){
                var result = [];

                if(getObjType(function_num[0]) == "array"){
                    for(var i = 0; i < function_num.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < function_num[i].length; j++){
                            var value = function_num[i][j];

                            if(valueIsError(value)){
                                rowArr.push(value);
                            }
                            else if(!isRealNum(value)){
                                rowArr.push(formula.error.v);
                            }
                            else{
                                value = parseInt(value);

                                if(value < 1 || value > 111 || (value > 11 && value < 101)){
                                    rowArr.push(formula.error.v);
                                }
                                else{
                                    rowArr.push(compute(value));
                                }
                            }
                        }

                        result.push(rowArr);
                    }
                }
                else{
                    for(var i = 0; i < function_num.length; i++){
                        var value = function_num[i];

                        if(valueIsError(value)){
                            result.push(value);
                        }
                        else if(!isRealNum(value)){
                            result.push(formula.error.v);
                        }
                        else{
                            value = parseInt(value);

                            if(value < 1 || value > 111 || (value > 11 && value < 101)){
                                result.push(formula.error.v);
                            }
                            else{
                                result.push(compute(value));
                            }
                        }
                    }
                }

                return result;
            }
            else{
                if(valueIsError(function_num)){
                    return function_num;
                }

                if(!isRealNum(function_num)){
                    return formula.error.v;
                }

                function_num = parseInt(function_num);

                if(function_num < 1 || function_num > 111 || (function_num > 11 && function_num < 101)){
                    return formula.error.v;
                }

                return compute(function_num);
            }


            function compute(function_num){
                switch(function_num){
                    case 1:    //AVERAGE
                    case 101:
                        return window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, arr);
                        break;
                    case 2:    //COUNT
                    case 102:
                        return window.luckysheet_function.COUNT.f.apply(window.luckysheet_function.COUNT, arr);
                        break;
                    case 3:    //COUNTA
                    case 103:
                        return window.luckysheet_function.COUNTA.f.apply(window.luckysheet_function.COUNTA, arr);
                        break;
                    case 4:    //MAX
                    case 104:
                        return window.luckysheet_function.MAX.f.apply(window.luckysheet_function.MAX, arr);
                        break;
                    case 5:    //MIN
                    case 105:
                        return window.luckysheet_function.MIN.f.apply(window.luckysheet_function.MIN, arr);
                        break;
                    case 6:    //PRODUCT
                    case 106:
                        return window.luckysheet_function.PRODUCT.f.apply(window.luckysheet_function.PRODUCT, arr);
                        break;
                    case 7:    //STDEV
                    case 107:
                        return window.luckysheet_function.STDEVA.f.apply(window.luckysheet_function.STDEVA, arr);
                        break;
                    case 8:    //STDEVP
                    case 108:
                        return window.luckysheet_function.STDEVP.f.apply(window.luckysheet_function.STDEVP, arr);
                        break;
                    case 9:    //SUM
                    case 109:
                        return window.luckysheet_function.SUM.f.apply(window.luckysheet_function.SUM, arr);
                        break;
                    case 10:   //VAR
                    case 110:
                        return window.luckysheet_function.VAR_S.f.apply(window.luckysheet_function.VAR_S, arr);
                        break;
                    case 11:   //VARP
                    case 111:
                        return window.luckysheet_function.VAR_P.f.apply(window.luckysheet_function.VAR_P, arr);
                        break;
                }
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ASIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number < -1 || number > 1){
                return formula.error.nm;
            }

            return Math.asin(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNTIF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //范围
            var data_range = arguments[0];
            var range;

            if(getObjType(data_range) == "object" && data_range.startCell != null){
                range = data_range.data;
            }
            else{
                return formula.error.v;
            }

            //条件
            var data_criteria = arguments[1];
            var criteria;

            if(getObjType(data_criteria) == "array"){
                criteria = [];

                if(getObjType(data_criteria[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_criteria)){
                        return formula.error.v;
                    }

                    for(var i = 0; i < data_criteria.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < data_criteria[i].length; j++){
                            rowArr.push(data_criteria[i][j]);
                        }

                        criteria.push(rowArr);
                    }
                }
                else{
                    for(var i = 0; i < data_criteria.length; i++){
                        criteria.push(data_criteria[i]);
                    }
                }
            }
            else if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.rowl > 1 || data_criteria.coll > 1){
                    return 0;
                }

                criteria = data_criteria.data.v;
            }
            else{
                criteria = data_criteria;
            }

            //计算
            if(getObjType(criteria) == "array"){
                var result = [];

                if(getObjType(criteria[0]) == "array"){
                    for(var i = 0; i < criteria.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < criteria[i].length; j++){
                            rowArr.push(getCriteriaResult(range, criteria[i][j]));
                        }

                        result.push(rowArr);
                    }
                }
                else{
                    for(var i = 0; i < criteria.length; i++){
                        result.push(getCriteriaResult(range, criteria[i]));
                    }
                }

                return result;
            }
            else{
                return getCriteriaResult(range, criteria);
            }

            function getCriteriaResult(range, criter){
                if (!/[<>=!*?]/.test(criter)) {
                    criter = '=="' + criter + '"';
                }

                criter = criter.replace("<>", "!=");

                var matches = 0;

                if(getObjType(range) == "array"){
                    for (var i = 0; i < range.length; i++) {
                        for(var j = 0; j < range[i].length; j++){
                            if(range[i][j] != null && !isRealNull(range[i][j].v)){
                                var value = range[i][j].v;

                                if(criter.indexOf("*") > -1 || criter.indexOf("?") > -1){
                                    if(formula.isWildcard(value, criter)){
                                        matches++;
                                    }
                                }
                                else{
                                    if (typeof value !== 'string') {
                                        if (new Function("return " + value + criter)()) {
                                            matches++;
                                        }
                                    }
                                    else {
                                        if (new Function("return " + '"' + value + '"' + criter)()) {
                                            matches++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    if(range != null && !isRealNull(range.v)){
                        var value = range.v;

                        if(criter.indexOf("*") > -1 || criter.indexOf("?") > -1){
                            if(formula.isWildcard(value, criter)){
                                matches++;
                            }
                        }
                        else{
                            if (typeof value !== 'string') {
                                if (new Function("return " + value + criter)()) {
                                    matches++;
                                }
                            }
                            else {
                                if (new Function("return " + '"' + value + '"' + criter)()) {
                                    matches++;
                                }
                            }
                        }
                    }
                }

                return matches;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RADIANS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return number * Math.PI / 180;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RAND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        try {
            return Math.floor(Math.random() * 1000000000) / 1000000000;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNTUNIQUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            return window.luckysheet_function.UNIQUE.f(dataArr);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DEGREES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return number * 180 / Math.PI;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ERFC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return jStat.erfc(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EVEN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            var temp = Math.ceil(Math.abs(number));
            temp = (temp & 1) ? temp + 1 : temp;
            return (number > 0) ? temp : -temp;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EXP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.exp(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FACT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                if(getObjType(number) == "boolean"){
                    if(number.toString().toLowerCase() == "true"){
                        number = 1;
                    }
                    else if(number.toString().toLowerCase() == "false"){
                        number = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            number = parseInt(number);

            if(number < 0){
                return formula.error.nm;
            }

            return func_methods.factorial(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FACTDOUBLE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                if(getObjType(number) == "boolean"){
                    if(number.toString().toLowerCase() == "true"){
                        number = 1;
                    }
                    else if(number.toString().toLowerCase() == "false"){
                        number = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            number = parseInt(number);

            if(number < 0){
                return formula.error.nm;
            }

            return func_methods.factorialDouble(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PI": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        try {
            return Math.PI;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FLOOR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //number
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //significance
            var significance = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(significance)){
                return significance;
            }

            if(!isRealNum(significance)){
                return formula.error.v;
            }

            significance = parseFloat(significance);

            if(significance == 0){
                return formula.error.d;
            }

            if(number > 0 && significance < 0){
                return formula.error.nm;
            }

            //计算
            var precision = -Math.floor(Math.log(Math.abs(significance)) / Math.log(10));

            if (number >= 0) {
                return (Math.floor(number / significance) * significance) * Math.pow(10, precision) / Math.pow(10, precision);
            }
            else {
                return -((Math.ceil(Math.abs(number) / significance) * significance) * Math.pow(10, precision)) / Math.pow(10, precision);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GCD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", false));
                }
                else{
                    dataArr.push(data);
                }
            }

            if(!isRealNum(dataArr[0])){
                return formula.error.v;
            }

            var x = parseInt(dataArr[0]);

            if(x < 0 || x >= Math.pow(2, 53)){
                return formula.error.nm;
            }

            for (var i = 1; i < dataArr.length; i++) {
                var y = dataArr[i];

                if(!isRealNum(y)){
                    return formula.error.v;
                }

                y = parseInt(y);

                if(y < 0 || y >= Math.pow(2, 53)){
                    return formula.error.nm;
                }

                while (x && y) {
                    if (x > y) {
                        x %= y;
                    }
                    else {
                        y %= x;
                    }
                }

                x += y;
            }

            return x;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RANDBETWEEN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //下界
            var bottom = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(bottom)){
                return bottom;
            }

            if(!isRealNum(bottom)){
                return formula.error.v;
            }

            bottom = parseInt(bottom);

            //上界
            var top = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(top)){
                return top;
            }

            if(!isRealNum(top)){
                return formula.error.v;
            }

            top = parseInt(top);

            if(bottom > top){
                return formula.error.nm;
            }

            //计算
            return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROUND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //四舍五入的数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //位数
            var digits = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(digits)){
                return digits;
            }

            if(!isRealNum(digits)){
                return formula.error.v;
            }

            digits = parseInt(digits);

            //计算
            var sign = (number > 0) ? 1 : -1;
            return sign * (Math.round(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROUNDDOWN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //四舍五入的数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //位数
            var digits = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(digits)){
                return digits;
            }

            if(!isRealNum(digits)){
                return formula.error.v;
            }

            digits = parseInt(digits);

            //计算
            var sign = (number > 0) ? 1 : -1;
            return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROUNDUP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //四舍五入的数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //位数
            var digits = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(digits)){
                return digits;
            }

            if(!isRealNum(digits)){
                return formula.error.v;
            }

            digits = parseInt(digits);

            //计算
            var sign = (number > 0) ? 1 : -1;
            return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SERIESSUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //幂级数的输入值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //x 的首项乘幂
            var n = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(n)){
                return n;
            }

            if(!isRealNum(n)){
                return formula.error.v;
            }

            n = parseFloat(n);

            //级数中每一项的乘幂 n 的步长增加值
            var m = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(m)){
                return m;
            }

            if(!isRealNum(m)){
                return formula.error.v;
            }

            m = parseFloat(m);

            //与 x 的每个连续乘幂相乘的一组系数
            var data_coefficients = arguments[3];
            var coefficients = [];

            if(getObjType(data_coefficients) == "array"){
                if(getObjType(data_coefficients[0]) == "array" && !func_methods.isDyadicArr(data_coefficients)){
                    return formula.error.v;
                }

                coefficients = coefficients.concat(func_methods.getDataArr(data_coefficients, false));
            }
            else if(getObjType(data_coefficients) == "object" && data_coefficients.startCell != null){
                coefficients = coefficients.concat(func_methods.getCellDataArr(data_coefficients, "number", false));
            }
            else{
                coefficients.push(data_coefficients);
            }

            //计算
            if(!isRealNum(coefficients[0])){
                return formula.error.v;
            }

            var result = parseFloat(coefficients[0]) * Math.pow(x, n);

            for (var i = 1; i < coefficients.length; i++) {
                var number = coefficients[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                result += number * Math.pow(x, n + i * m);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SIGN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number > 0){
                return 1;
            }
            else if(number == 0){
                return 0;
            }
            else if(number < 0){
                return -1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.sin(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SINH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return (Math.exp(number) - Math.exp(-number)) / 2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SQRT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number < 0){
                return formula.error.nm;
            }

            return Math.sqrt(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SQRTPI": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number < 0){
                return formula.error.nm;
            }

            return Math.sqrt(number * Math.PI);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GAMMALN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            if(number <= 0){
                return formula.error.nm;
            }

            return jStat.gammaln(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            return Math.cos(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRUNC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要截取的数据
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //位数
            if(arguments.length == 2){
                var digits = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(digits)){
                    return digits;
                }

                if(!isRealNum(digits)){
                    return formula.error.v;
                }

                digits = parseInt(digits);
            }
            else{
                var digits = 0;
            }

            //计算
            var sign = (number > 0) ? 1 : -1;
            return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "QUOTIENT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //被除数
            var numerator = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(numerator)){
                return numerator;
            }

            if(!isRealNum(numerator)){
                return formula.error.v;
            }

            numerator = parseFloat(numerator);

            //除数
            var denominator = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(denominator)){
                return denominator;
            }

            if(!isRealNum(denominator)){
                return formula.error.v;
            }

            denominator = parseFloat(denominator);

            if(denominator == 0){
                return formula.error.d;
            }

            //计算
            return parseInt(numerator / denominator, 10);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "POWER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //底数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //指数
            var power = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(power)){
                return power;
            }

            if(!isRealNum(power)){
                return formula.error.v;
            }

            power = parseFloat(power);

            if(number == 0 && power == 0){
                return formula.error.nm;
            }

            if(number < 0 && power.toString().indexOf(".") > -1){
                return formula.error.nm;
            }

            return Math.pow(number, power);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMIFS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var sum = 0;
            var args = arguments;
            luckysheet_getValue(args);
            var rangeData = formula.getRangeArray(args[0])[0];
            var results = new Array(rangeData.length);

            for(var i = 0;i < results.length; i++){
                results[i] = true;
            }

            for(var i = 1; i < args.length; i += 2){
                var range = formula.getRangeArray(args[i])[0];
                var criteria = args[i+1];
                for(var j = 0; j < range.length; j++){
                    var v = range[j];
                    results[j] = results[j] && (!!v) && formula.acompareb(v,criteria);
                }
            }

            for(var i = 0; i < rangeData.length; i++){
                if(results[i]){
                    sum = luckysheet_calcADPMM(sum, "+", rangeData[i]); //parseFloat(rangeData[i]);
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUNTIFS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var args = arguments;
            luckysheet_getValue(args);
            var results = new Array(formula.getRangeArray(args[0])[0].length);
            for(var i = 0;i < results.length; i++){
                results[i] = true;
            }
            for(var i = 0; i < args.length; i += 2){
                var range = formula.getRangeArray(args[i])[0];
                var criteria = args[i+1];
                for(var j = 0; j < range.length; j++){
                    var v = range[j];
                    results[j] = results[j] && (!!v) && formula.acompareb(v,criteria);
                }
            }
            var result = 0;
            for(var i = 0; i < results.length; i++){
                if(results[i]){
                    result++;
                }
            }
            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PRODUCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var result = 1;

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                result *= number;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HARMEAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            var den = 0, len = 0;

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                if(number <= 0){
                    return formula.error.nm;
                }

                den += 1 / number;
                len++;
            }

            return len / den;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HYPGEOMDIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //样本中成功的次数
            var sample_s = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(sample_s)){
                return sample_s;
            }

            if(!isRealNum(sample_s)){
                return formula.error.v;
            }

            sample_s = parseInt(sample_s);

            //样本量
            var number_sample = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_sample)){
                return number_sample;
            }

            if(!isRealNum(number_sample)){
                return formula.error.v;
            }

            number_sample = parseInt(number_sample);

            //总体中成功的次数
            var population_s = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(population_s)){
                return population_s;
            }

            if(!isRealNum(population_s)){
                return formula.error.v;
            }

            population_s = parseInt(population_s);

            //总体大小
            var number_pop = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(number_pop)){
                return number_pop;
            }

            if(!isRealNum(number_pop)){
                return formula.error.v;
            }

            number_pop = parseInt(number_pop);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[4]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(sample_s < 0 || sample_s > Math.min(number_sample, population_s) || sample_s < Math.max(0, number_sample - number_pop + population_s)){
                return formula.error.nm;
            }

            if(number_sample <= 0 || number_sample > number_pop){
                return formula.error.nm;
            }

            if(population_s <= 0 || population_s > number_pop){
                return formula.error.nm;
            }

            if(number_pop <= 0){
                return formula.error.nm;
            }

            //计算
            function pdf(x, n, M, N) {
                var a = func_methods.factorial(M) / (func_methods.factorial(x) * func_methods.factorial(M - x));
                var b = func_methods.factorial(N - M) / (func_methods.factorial(n - x) * func_methods.factorial(N - M - n + x));
                var c = func_methods.factorial(N) / (func_methods.factorial(n) * func_methods.factorial(N - n));

                return a * b / c;
            }

            function cdf(x, n, M, N) {
                var sum = 0;

                for (var i = 0; i <= x; i++) {
                    sum += pdf(i, n, M, N);
                }

                return sum;
            }

            return (cumulative) ? cdf(sample_s, number_sample, population_s, number_pop) : pdf(sample_s, number_sample, population_s, number_pop);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "INTERCEPT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //x轴上用于预测的值
            var x = 0;

            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[0];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[1];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(func_methods.variance_s(data_x) == 0){
                return formula.error.d;
            }

            //计算
            var xmean = jStat.mean(data_x);
            var ymean = jStat.mean(data_y);

            var n = data_x.length;
            var num = 0;
            var den = 0;

            for (var i = 0; i < n; i++) {
                num += (data_x[i] - xmean) * (data_y[i] - ymean);
                den += Math.pow(data_x[i] - xmean, 2);
            }

            var b = num / den;
            var a = ymean - b * xmean;

            return a + b * x;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "KURT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            //剔除不是数值类型的值
            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                dataArr_n.push(number);
            }

            if(dataArr_n.length < 4 || func_methods.standardDeviation_s(dataArr_n) == 0){
                return formula.error.d;
            }

            //计算
            var mean = jStat.mean(dataArr_n);
            var n = dataArr_n.length;

            var sigma = 0;

            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 4);
            }

            sigma = sigma / Math.pow(jStat.stdev(dataArr_n, true), 4);

            return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LARGE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数组或范围
            var dataArr = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], "text", true));
            }
            else{
                dataArr.push(arguments[0]);
            }

            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number)

                dataArr_n.push(number);
            }

            //要返回的元素的排行位置
            var n;

            if(getObjType(arguments[1]) == "array"){
                if(getObjType(arguments[1][0]) == "array" && !func_methods.isDyadicArr(arguments[1])){
                    return formula.error.v;
                }

                n = func_methods.getDataArr(arguments[1]);
            }
            else if(getObjType(arguments[1]) == "object" && arguments[1].startCell != null){
                if(arguments[1].rowl > 1 || arguments[1].coll > 1){
                    return formula.error.v;
                }

                var cell = arguments[1].data;

                if(cell == null || isRealNull(cell.v)){
                    var n = 0;
                }
                else{
                    var n = cell.v;
                }
            }
            else{
                n = arguments[1];
            }

            //计算
            if(getObjType(n) == "array"){
                if(dataArr_n.length == 0){
                    return formula.error.nm;
                }

                var result = [];

                for(var i = 0; i < n.length; i++){
                    if(!isRealNum(n[i])){
                        result.push(formula.error.v);
                        continue;
                    }

                    n[i] = Math.ceil(parseFloat(n[i]));

                    if(n[i] <= 0 || n[i] > dataArr_n.length){
                        result.push(formula.error.nm);
                        continue;
                    }

                    result.push(dataArr.sort(function(a, b) { return b - a; })[n[i] - 1]);
                }

                return result;
            }
            else{
                if(!isRealNum(n)){
                    return formula.error.v;
                }

                n = Math.ceil(parseFloat(n));

                if(dataArr_n.length == 0){
                    return formula.error.nm;
                }

                if(n <= 0 || n > dataArr_n.length){
                    return formula.error.nm;
                }

                return dataArr.sort(function(a, b) {
                    return b - a;
                })[n - 1];
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STDEVA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", false));
                }
                else{
                    dataArr.push(data);
                }
            }

            //不是数值类型的值转化成数字（true为1，false和文本为0）
            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(!isRealNum(number)){
                    if(number.toString().toLowerCase() == "true"){
                        number = 1;
                    }
                    else{
                        number = 0;
                    }
                }
                else{
                    number = parseFloat(number);
                }

                dataArr_n.push(number);
            }

            if(dataArr_n.length == 0){
                return 0;
            }

            if(dataArr_n.length == 1){
                return formula.error.d;
            }

            return func_methods.standardDeviation_s(dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STDEVP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    dataArr.push(data);
                }
            }

            //剔除不是数值类型的值
            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                dataArr_n.push(number);
            }

            if(dataArr_n.length == 0){
                return 0;
            }

            if(dataArr_n.length == 1){
                return formula.error.d;
            }

            return func_methods.standardDeviation(dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GEOMEAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", true));
                }
                else{
                    if(getObjType(data) == "boolean"){
                        if(data.toString().toLowerCase() == "true"){
                            dataArr.push(1);
                        }
                        else if(data.toString().toLowerCase() == "false"){
                            dataArr.push(0);
                        }
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            //剔除不是数值类型的值
            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(!isRealNum(number)){
                    continue;
                }

                number = parseFloat(number);

                if(number <= 0){
                    return formula.error.nm;
                }

                dataArr_n.push(number);
            }

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            return jStat.geomean(dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RANK_EQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要确定其排名的值
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //包含相关数据集的数组或范围
            var data_ref = arguments[1];
            var ref = [];

            if(getObjType(data_ref) == "array"){
                if(getObjType(data_ref[0]) == "array" && !func_methods.isDyadicArr(data_ref)){
                    return formula.error.v;
                }

                ref = ref.concat(func_methods.getDataArr(data_ref, true));
            }
            else if(getObjType(data_ref) == "object" && data_ref.startCell != null){
                ref = ref.concat(func_methods.getCellDataArr(data_ref, "number", true));
            }
            else{
                ref.push(data_ref);
            }

            var ref_n = [];

            for(var j = 0; j < ref.length; j++){
                var num = ref[j];

                if(!isRealNum(num)){
                    return formula.error.v;
                }

                num = parseFloat(num);

                ref_n.push(num);
            }

            //要按升序还是按降序考虑“data”中的值
            if(arguments.length == 3){
                var order = func_methods.getCellBoolen(arguments[2]);

                if(valueIsError(order)){
                    return order;
                }
            }
            else{
                var order = false;
            }

            //计算
            var sort = (order) ? function(a, b) {
                return a - b;
            } : function(a, b) {
                return b - a;
            };

            ref_n = ref_n.sort(sort);

            var index = ref_n.indexOf(number);

            if(index == -1){
                return formula.error.na;
            }
            else{
                return index + 1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RANK_AVG": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要确定其排名的值
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //包含相关数据集的数组或范围
            var data_ref = arguments[1];
            var ref = [];

            if(getObjType(data_ref) == "array"){
                if(getObjType(data_ref[0]) == "array" && !func_methods.isDyadicArr(data_ref)){
                    return formula.error.v;
                }

                ref = ref.concat(func_methods.getDataArr(data_ref, true));
            }
            else if(getObjType(data_ref) == "object" && data_ref.startCell != null){
                ref = ref.concat(func_methods.getCellDataArr(data_ref, "number", true));
            }
            else{
                ref.push(data_ref);
            }

            var ref_n = [];

            for(var j = 0; j < ref.length; j++){
                var num = ref[j];

                if(!isRealNum(num)){
                    return formula.error.v;
                }

                num = parseFloat(num);

                ref_n.push(num);
            }

            //要按升序还是按降序考虑“data”中的值
            if(arguments.length == 3){
                var order = func_methods.getFirstValue(arguments[2]);

                if(valueIsError(order)){
                    return order;
                }

                if(getObjType(order) == "boolean"){

                }
                else if(getObjType(order) == "string" && (order.toLowerCase() == "true" || order.toLowerCase() == "false")){
                    if(order.toLowerCase() == "true"){
                        order = true;
                    }

                    if(order.toLowerCase() == "false"){
                        order = false;
                    }
                }
                else if(isRealNum(order)){
                    order = parseFloat(order);

                    order = order == 0 ? false : true;
                }
                else{
                    return formula.error.v;
                }
            }
            else{
                var order = false;
            }

            //计算
            var sort = (order) ? function(a, b) {
                return a - b;
            } : function(a, b) {
                return b - a;
            };

            ref_n = ref_n.sort(sort);

            var count = 0;
            for (var i = 0; i < ref_n.length; i++) {
                if (ref_n[i] == number) {
                    count++;
                }
            }

            return (count > 1) ? (2 * ref_n.indexOf(number) + count + 1) / 2 : ref_n.indexOf(number) + 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PERCENTRANK_EXC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含相关数据集的数组或范围
            var data_ref = arguments[0];
            var ref = [];

            if(getObjType(data_ref) == "array"){
                if(getObjType(data_ref[0]) == "array" && !func_methods.isDyadicArr(data_ref)){
                    return formula.error.v;
                }

                ref = ref.concat(func_methods.getDataArr(data_ref, true));
            }
            else if(getObjType(data_ref) == "object" && data_ref.startCell != null){
                ref = ref.concat(func_methods.getCellDataArr(data_ref, "number", true));
            }
            else{
                ref.push(data_ref);
            }

            var ref_n = [];

            for(var j = 0; j < ref.length; j++){
                var number = ref[j];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                ref_n.push(number);
            }

            //要确定其百分比排位的值
            var x = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //要在计算中使用的有效位数
            if(arguments.length == 3){
                var significance = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(significance)){
                    return significance;
                }

                if(!isRealNum(significance)){
                    return formula.error.v;
                }

                significance = parseInt(significance);
            }
            else{
                var significance = 3;
            }

            if(ref_n.length == 0){
                return formula.error.nm;
            }

            if(significance < 1){
                return formula.error.nm;
            }

            //计算
            if(ref_n.length == 1 && ref_n[0] == x){
                return 1;
            }

            ref_n = ref_n.sort(function(a, b) {
                return a - b;
            });
            var uniques = window.luckysheet_function.UNIQUE.f(ref_n)[0];

            var n = ref_n.length;
            var m = uniques.length;

            var power = Math.pow(10, significance);
            var result = 0;
            var match = false;
            var i = 0;

            while (!match && i < m) {
                if (x === uniques[i]) {
                    result = (ref_n.indexOf(uniques[i]) + 1) / (n + 1);
                    match = true;
                }
                else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                    result = (ref_n.lastIndexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
                    match = true;
                }

                i++;
            }

            if(isNaN(result)){
                return formula.error.na;
            }
            else{
                return Math.floor(result * power) / power;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PERCENTRANK_INC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含相关数据集的数组或范围
            var data_ref = arguments[0];
            var ref = [];

            if(getObjType(data_ref) == "array"){
                if(getObjType(data_ref[0]) == "array" && !func_methods.isDyadicArr(data_ref)){
                    return formula.error.v;
                }

                ref = ref.concat(func_methods.getDataArr(data_ref, true));
            }
            else if(getObjType(data_ref) == "object" && data_ref.startCell != null){
                ref = ref.concat(func_methods.getCellDataArr(data_ref, "number", true));
            }
            else{
                ref.push(data_ref);
            }

            var ref_n = [];

            for(var j = 0; j < ref.length; j++){
                var number = ref[j];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                number = parseFloat(number);

                ref_n.push(number);
            }

            //要确定其百分比排位的值
            var x = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //要在计算中使用的有效位数
            if(arguments.length == 3){
                var significance = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(significance)){
                    return significance;
                }

                if(!isRealNum(significance)){
                    return formula.error.v;
                }

                significance = parseInt(significance);
            }
            else{
                var significance = 3;
            }

            if(ref_n.length == 0){
                return formula.error.nm;
            }

            if(significance < 1){
                return formula.error.nm;
            }

            //计算
            if(ref_n.length == 1 && ref_n[0] == x){
                return 1;
            }

            ref_n = ref_n.sort(function(a, b) {
                return a - b;
            });
            var uniques = window.luckysheet_function.UNIQUE.f(ref_n)[0];

            var n = ref_n.length;
            var m = uniques.length;

            var power = Math.pow(10, significance);
            var result = 0;
            var match = false;
            var i = 0;

            while (!match && i < m) {
                if (x === uniques[i]) {
                    result = ref_n.indexOf(uniques[i]) / (n - 1);
                    match = true;
                }
                else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                    result = (ref_n.lastIndexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
                    match = true;
                }

                i++;
            }

            if(isNaN(result)){
                return formula.error.na;
            }
            else{
                return Math.floor(result * power) / power;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FORECAST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //x轴上用于预测的值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[1];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[2];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(func_methods.variance_s(data_x) == 0){
                return formula.error.d;
            }

            //计算
            var xmean = jStat.mean(data_x);
            var ymean = jStat.mean(data_y);

            var n = data_x.length;
            var num = 0;
            var den = 0;

            for (var i = 0; i < n; i++) {
                num += (data_x[i] - xmean) * (data_y[i] - ymean);
                den += Math.pow(data_x[i] - xmean, 2);
            }

            var b = num / den;
            var a = ymean - b * xmean;

            return a + b * x;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FISHERINV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var y = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(y)){
                return y;
            }

            if(!isRealNum(y)){
                return formula.error.v;
            }

            y = parseFloat(y);

            var e2y = Math.exp(2 * y);

            return (e2y - 1) / (e2y + 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FISHER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            if(x <= -1 || x >= 1){
                return formula.error.nm;
            }

            return Math.log((1 + x) / (1 - x)) / 2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MODE_SNGL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            var count = {};
            var maxItems = [];
            var max = 0;
            var currentItem;

            for (var i = 0; i < dataArr_n.length; i++) {
                currentItem = dataArr_n[i];
                count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;

                if (count[currentItem] > max) {
                    max = count[currentItem];
                    maxItems = [];
                }

                if (count[currentItem] == max) {
                    maxItems[maxItems.length] = currentItem;
                }
            }

            if(max <= 1){
                return formula.error.na;
            }

            var resultIndex = dataArr_n.indexOf(maxItems[0]);

            for(var j = 0; j < maxItems.length; j++){
                var index = dataArr_n.indexOf(maxItems[j]);

                if(index < resultIndex){
                    resultIndex = index;
                }
            }

            return dataArr_n[resultIndex];
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "WEIBULL_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //WEIBULL 分布函数的输入值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //Weibull 分布函数的形状参数
            var alpha = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(alpha)){
                return alpha;
            }

            if(!isRealNum(alpha)){
                return formula.error.v;
            }

            alpha = parseFloat(alpha);

            //Weibull 分布函数的尺度参数
            var beta = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(beta)){
                return beta;
            }

            if(!isRealNum(beta)){
                return formula.error.v;
            }

            beta = parseFloat(beta);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(x < 0 || alpha <= 0 || beta <= 0){
                return formula.error.nm;
            }

            return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AVEDEV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            return jStat.sum(jStat(dataArr_n).subtract(jStat.mean(dataArr_n)).abs()[0]) / dataArr_n.length;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AVERAGEA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(number.toString.toLowerCase() == "true"){
                        dataArr.push(1);
                    }
                    else if(number.toString.toLowerCase() == "false"){
                        dataArr.push(0);
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            var sum = 0,
                count = 0;

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    sum += parseFloat(number);
                }
                else{
                    if(number.toString().toLowerCase() == "true"){
                        sum += 1;
                    }
                    else{
                        sum += 0;
                    }
                }

                count++;
            }

            if(count == 0){
                return formula.error.d;
            }

            return sum / count;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BINOM_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //试验的成功次数
            var number_s = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number_s)){
                return number_s;
            }

            if(!isRealNum(number_s)){
                return formula.error.v;
            }

            number_s = parseInt(number_s);

            //独立检验的次数
            var trials = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(trials)){
                return trials;
            }

            if(!isRealNum(trials)){
                return formula.error.v;
            }

            trials = parseInt(trials);

            //任一给定检验的成功概率
            var probability_s = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(probability_s)){
                return probability_s;
            }

            if(!isRealNum(probability_s)){
                return formula.error.v;
            }

            probability_s = parseFloat(probability_s);

            //是否使用二项式累积分布
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(number_s < 0 || number_s > trials){
                return formula.error.nm;
            }

            if(probability_s < 0 || probability_s > 1){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.binomial.cdf(number_s, trials, probability_s) : jStat.binomial.pdf(number_s, trials, probability_s);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BINOM_INV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //贝努利试验次数
            var trials = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(trials)){
                return trials;
            }

            if(!isRealNum(trials)){
                return formula.error.v;
            }

            trials = parseInt(trials);

            //任一次给定检验的成功概率
            var probability_s = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(probability_s)){
                return probability_s;
            }

            if(!isRealNum(probability_s)){
                return formula.error.v;
            }

            probability_s = parseFloat(probability_s);

            //期望的临界概率
            var alpha = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(alpha)){
                return alpha;
            }

            if(!isRealNum(alpha)){
                return formula.error.v;
            }

            alpha = parseFloat(alpha);

            if(trials < 0){
                return formula.error.nm;
            }

            if(probability_s < 0 || probability_s > 1){
                return formula.error.nm;
            }

            if(alpha < 0 || alpha > 1){
                return formula.error.nm;
            }

            //计算
            var x = 0;
            while (x <= trials) {
                if (jStat.binomial.cdf(x, trials, probability_s) >= alpha) {
                    return x;
                }

                x++;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CONFIDENCE_NORM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //置信水平
            var alpha = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(alpha)){
                return alpha;
            }

            if(!isRealNum(alpha)){
                return formula.error.v;
            }

            alpha = parseFloat(alpha);

            //数据区域的总体标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                return formula.error.v;
            }

            standard_dev = parseFloat(standard_dev);

            //样本总量的大小
            var size = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(size)){
                return size;
            }

            if(!isRealNum(size)){
                return formula.error.v;
            }

            size = parseInt(size);

            if(alpha <= 0 || alpha >= 1){
                return formula.error.nm;
            }

            if(standard_dev <= 0){
                return formula.error.nm;
            }

            if(size < 1){
                return formula.error.nm;
            }

            return jStat.normalci(1, alpha, standard_dev, size)[1] - 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CORREL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[0];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[1];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(data_y.length == 0 || data_x.length == 0 || func_methods.standardDeviation(data_y) == 0 || func_methods.standardDeviation(data_x) == 0){
                return formula.error.d;
            }

            return jStat.corrcoeff(data_y, data_x);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COVARIANCE_P": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[0];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[1];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            if(known_x.length != known_y.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < known_x.length; i++){
                var num_x = known_x[i];
                var num_y = known_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            if(data_x.length == 0 || data_y.length == 0){
                return formula.error.d;
            }

            //计算
            var mean1 = jStat.mean(data_x);
            var mean2 = jStat.mean(data_y);

            var result = 0;

            for (var i = 0; i < data_x.length; i++) {
                result += (data_x[i] - mean1) * (data_y[i] - mean2);
            }

            result = result / data_x.length;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COVARIANCE_S": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[0];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[1];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            if(known_x.length != known_y.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < known_x.length; i++){
                var num_x = known_x[i];
                var num_y = known_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            if(data_x.length == 0 || data_y.length == 0){
                return formula.error.d;
            }

            return jStat.covariance(data_x, data_y);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DEVSQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        if(getObjType(data) == "boolean"){
                            if(data.toString().toLowerCase() == "true"){
                                dataArr.push(1);
                            }
                            else if(data.toString().toLowerCase() == "false"){
                                dataArr.push(0);
                            }
                        }
                        else{
                            return formula.error.v;
                        }
                    }
                    else{
                        dataArr.push(data);
                    }
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            var mean = jStat.mean(dataArr_n);
            var result = 0;

            for (var i = 0; i < dataArr_n.length; i++) {
                result += Math.pow((dataArr_n[i] - mean), 2);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EXPON_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //指数分布函数的输入值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //用于指定指数分布函数的 lambda 值
            var lambda = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(lambda)){
                return lambda;
            }

            if(!isRealNum(lambda)){
                return formula.error.v;
            }

            lambda = parseFloat(lambda);

            //是否使用指数累积分布
            var cumulative = func_methods.getCellBoolen(arguments[2]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(x < 0){
                return formula.error.nm;
            }

            if(lambda < 0){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AVERAGEIF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var sum = 0;
            var count = 0;

            var rangeData = arguments[0].data;
            var rangeRow = arguments[0].rowl;
            var rangeCol = arguments[0].coll;
            var criteria = luckysheet_parseData(arguments[1]);
            var sumRangeData = [];

            //如果有第三个参数
            if(arguments[2]){
                //根据选择的目标的区域确定实际目标区域
                //初始位置
                var sumRangeStart = arguments[2].startCell;
                var sumRangeRow = arguments[2].rowl;
                var sumRangeCol = arguments[2].coll;
                var sumRangeSheet = arguments[2].sheetName;

                if(rangeRow == sumRangeRow && rangeCol == sumRangeCol){
                    sumRangeData = arguments[2].data;
                }
                else{
                    var row=[],col=[];
                    var sumRangeEnd = "";
                    var realSumRange = "";
                    //console.log("开始位置！！！",sumRangeStart,typeof(sumRangeStart));
                    row[0] = parseInt(sumRangeStart.replace(/[^0-9]/g,"")) - 1;
                    col[0] = ABCatNum(sumRangeStart.replace(/[^A-Za-z]/g,""));

                    //根据第一个范围的长宽确定目标范围的末尾位置
                    row[1] = row[0] + rangeRow - 1;
                    col[1] = col[0] + rangeCol - 1;

                    //console.log(row[0],col[0],row[1],col[1]);
                    //末尾位置转化为sheet格式：如 F4
                    var real_ABC = chatatABC(col[1]);
                    var real_Num = row[1] + 1;
                    sumRangeEnd = real_ABC + real_Num;
                    //console.log("合成新的末尾位置：" + sumRangeEnd);

                    realSumRange = sumRangeSheet + "!" +sumRangeStart + ":" + sumRangeEnd;
                    sumRangeData = luckysheet_getcelldata(realSumRange).data;
                    //console.log("最终的目标范围：",sumRangeData);
                }

                sumRangeData = formula.getRangeArray(sumRangeData)[0];
            }
            rangeData = formula.getRangeArray(rangeData)[0];

            //循环遍历查找匹配项
            for(var i = 0; i < rangeData.length;i++){
                var v = rangeData[i];
                if(!!v && formula.acompareb(v, criteria)){
                    var vnow = sumRangeData[i] || v;

                    if(!isRealNum(vnow)){
                        continue;
                    }

                    sum += parseFloat(vnow);
                    count++;
                }
            }

            if(sum == 0 || count == 0){
                return formula.error.d;
            }
            else{
                return numFormat(sum / count);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AVERAGEIFS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var sum = 0;
            var count = 0;
            var args = arguments;
            luckysheet_getValue(args);
            var rangeData = formula.getRangeArray(args[0])[0];
            var results = new Array(rangeData.length);
            for(var i = 0;i < results.length; i++){
                results[i] = true;
            }
            for(var i = 1; i < args.length; i += 2){
                var range = formula.getRangeArray(args[i])[0];
                var criteria = args[i+1];
                for(var j = 0; j < range.length; j++){
                    var v = range[j];
                    results[j] = results[j] && (!!v) && formula.acompareb(v,criteria);
                }
            }
            for(var i = 0; i < rangeData.length; i++){
                if(results[i] && isRealNum(rangeData[i])){
                    sum += parseFloat(rangeData[i]);
                    count ++;
                }
            }

            if(sum == 0 || count == 0){
                return formula.error.d;
            }
            else{
                return numFormat(sum / count);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PERMUT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //表示对象个数的整数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            //表示每个排列中对象个数的整数
            var number_chosen = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_chosen)){
                return number_chosen;
            }

            if(!isRealNum(number_chosen)){
                return formula.error.v;
            }

            number_chosen = parseInt(number_chosen);

            if(number <= 0 || number_chosen < 0){
                return formula.error.nm;
            }

            if(number < number_chosen){
                return formula.error.nm;
            }

            return func_methods.factorial(number) / func_methods.factorial(number - number_chosen);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRIMMEAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含相关数据集的数组或范围
            var data_dataArr = arguments[0];
            var dataArr = [];

            if(getObjType(data_dataArr) == "array"){
                if(getObjType(data_dataArr[0]) == "array" && !func_methods.isDyadicArr(data_dataArr)){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
            }
            else if(getObjType(data_dataArr) == "object" && data_dataArr.startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, "number", false));
            }
            else{
                dataArr.push(data_dataArr);
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            //排除比例
            var percent = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(percent)){
                return percent;
            }

            if(!isRealNum(percent)){
                return formula.error.v;
            }

            percent = parseFloat(percent);

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            if(percent < 0 || percent > 1){
                return formula.error.nm;
            }

            //计算
            function rest(array, idx) {
                idx = idx || 1;
                if (!array || typeof array.slice !== 'function') {
                    return array;
                }
                return array.slice(idx);
            };

            function initial(array, idx) {
                idx = idx || 1;
                if (!array || typeof array.slice !== 'function') {
                    return array;
                }
                return array.slice(0, array.length - idx);
            };

            dataArr_n.sort(function(a, b) {
                return a - b;
            })

            var trim = window.luckysheet_function.FLOOR.f(dataArr_n.length * percent, 2) / 2;

            var result = rest(dataArr_n, trim);
            result = initial(result, trim);
            result = jStat.mean(result);

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PERCENTILE_EXC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //定义相对位置的数组或数据区域
            var data_dataArr = arguments[0];
            var dataArr = [];

            if(getObjType(data_dataArr) == "array"){
                if(getObjType(data_dataArr[0]) == "array" && !func_methods.isDyadicArr(data_dataArr)){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
            }
            else if(getObjType(data_dataArr) == "object" && data_dataArr.startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, "number", false));
            }
            else{
                dataArr.push(data_dataArr);
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            //0 到 1 之间的百分点值，不包含 0 和 1
            var k = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(k)){
                return k;
            }

            if(!isRealNum(k)){
                return formula.error.v;
            }

            k = parseFloat(k);

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            if(k <= 0 || k >= 1){
                return formula.error.nm;
            }

            //计算
            dataArr_n = dataArr_n.sort(function(a, b) {
                return a - b;
            });

            var n = dataArr_n.length;

            if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
                return formula.error.nm;
            }

            var l = k * (n + 1) - 1;
            var fl = Math.floor(l);

            return (l === fl) ? dataArr_n[l] : dataArr_n[fl] + (l - fl) * (dataArr_n[fl + 1] - dataArr_n[fl]);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PERCENTILE_INC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //定义相对位置的数组或数据区域
            var data_dataArr = arguments[0];
            var dataArr = [];

            if(getObjType(data_dataArr) == "array"){
                if(getObjType(data_dataArr[0]) == "array" && !func_methods.isDyadicArr(data_dataArr)){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
            }
            else if(getObjType(data_dataArr) == "object" && data_dataArr.startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, "number", false));
            }
            else{
                dataArr.push(data_dataArr);
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            //0 到 1 之间的百分点值，不包含 0 和 1
            var k = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(k)){
                return k;
            }

            if(!isRealNum(k)){
                return formula.error.v;
            }

            k = parseFloat(k);

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            if(k < 0 || k > 1){
                return formula.error.nm;
            }

            //计算
            dataArr_n = dataArr_n.sort(function(a, b) {
                return a - b;
            });

            var n = dataArr_n.length;

            var l = k * (n - 1);
            var fl = Math.floor(l);

            return (l === fl) ? dataArr_n[l] : dataArr_n[fl] + (l - fl) * (dataArr_n[fl + 1] - dataArr_n[fl]);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PEARSON": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[0];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                known_x.push(data_known_x);
            }

            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[1];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                known_y.push(data_known_y);
            }

            if(known_x.length != known_y.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < known_x.length; i++){
                var num_x = known_x[i];
                var num_y = known_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            if(data_y.length == 0 || data_x.length == 0){
                return formula.error.d;
            }

            //计算
            var xmean = jStat.mean(data_x);
            var ymean = jStat.mean(data_y);

            var n = data_x.length;
            var num = 0;
            var den1 = 0;
            var den2 = 0;

            for (var i = 0; i < n; i++) {
                num += (data_x[i] - xmean) * (data_y[i] - ymean);
                den1 += Math.pow(data_x[i] - xmean, 2);
                den2 += Math.pow(data_y[i] - ymean, 2);
            }

            return num / Math.sqrt(den1 * den2);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NORM_S_INV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //对应于正态分布的概率
            var probability = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(probability)){
                return probability;
            }

            if(!isRealNum(probability)){
                return formula.error.v;
            }

            probability = parseFloat(probability);

            if(probability <= 0 || probability >= 1){
                return formula.error.nm;
            }

            return jStat.normal.inv(probability, 0, 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NORM_S_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //需要计算其分布的数值
            var z = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(z)){
                return z;
            }

            if(!isRealNum(z)){
                return formula.error.v;
            }

            z = parseFloat(z);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[1]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NORM_INV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //对应于正态分布的概率
            var probability = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(probability)){
                return probability;
            }

            if(!isRealNum(probability)){
                if(getObjType(probability) == "boolean"){
                    if(probability.toString().toLowerCase() == "true"){
                        probability = 1;
                    }
                    else if(probability.toString().toLowerCase() == "false"){
                        probability = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            probability = parseFloat(probability);

            //分布的算术平均值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                if(getObjType(mean) == "boolean"){
                    if(mean.toString().toLowerCase() == "true"){
                        mean = 1;
                    }
                    else if(mean.toString().toLowerCase() == "false"){
                        mean = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            mean = parseFloat(mean);

            //分布的标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                if(getObjType(standard_dev) == "boolean"){
                    if(standard_dev.toString().toLowerCase() == "true"){
                        standard_dev = 1;
                    }
                    else if(standard_dev.toString().toLowerCase() == "false"){
                        standard_dev = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            standard_dev = parseFloat(standard_dev);

            if(probability <= 0 || probability >= 1){
                return formula.error.nm;
            }

            if(standard_dev <= 0){
                return formula.error.nm;
            }

            //计算
            return jStat.normal.inv(probability, mean, standard_dev);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NORM_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //需要计算其分布的数值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                if(getObjType(x) == "boolean"){
                    if(x.toString().toLowerCase() == "true"){
                        x = 1;
                    }
                    else if(x.toString().toLowerCase() == "false"){
                        x = 0;
                    }
                }
                else{
                    return formula.error.v;
                }
            }

            x = parseFloat(x);

            //分布的算术平均值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                return formula.error.v;
            }

            mean = parseFloat(mean);

            //分布的标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                return formula.error.v;
            }

            standard_dev = parseFloat(standard_dev);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(standard_dev <= 0){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.normal.cdf(x, mean, standard_dev) : jStat.normal.pdf(x, mean, standard_dev);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NEGBINOM_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要模拟的失败次数
            var number_f = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number_f)){
                return number_f;
            }

            if(!isRealNum(number_f)){
                return formula.error.v;
            }

            number_f = parseInt(number_f);

            //要模拟的成功次数
            var number_s = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_s)){
                return number_s;
            }

            if(!isRealNum(number_s)){
                return formula.error.v;
            }

            number_s = parseInt(number_s);

            //任一次给定检验的成功概率
            var probability_s = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(probability_s)){
                return probability_s;
            }

            if(!isRealNum(probability_s)){
                return formula.error.v;
            }

            probability_s = parseFloat(probability_s);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(probability_s < 0 || probability_s > 1){
                return formula.error.nm;
            }

            if(number_f < 0 || number_s < 1){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.negbin.cdf(number_f, number_s, probability_s) : jStat.negbin.pdf(number_f, number_s, probability_s);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MINA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(number.toString.toLowerCase() == "true"){
                        dataArr.push(1);
                    }
                    else if(number.toString.toLowerCase() == "false"){
                        dataArr.push(0);
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
                else{
                    if(number.toString().toLowerCase() == "true"){
                        dataArr_n.push(1);
                    }
                    else{
                        dataArr_n.push(0);
                    }
                }
            }

            return (dataArr_n.length === 0) ? 0 : Math.min.apply(Math, dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MEDIAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            return jStat.median(dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MAXA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(number.toString.toLowerCase() == "true"){
                        dataArr.push(1);
                    }
                    else if(number.toString.toLowerCase() == "false"){
                        dataArr.push(0);
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
                else{
                    if(number.toString().toLowerCase() == "true"){
                        dataArr_n.push(1);
                    }
                    else{
                        dataArr_n.push(0);
                    }
                }
            }

            return (dataArr_n.length === 0) ? 0 : Math.max.apply(Math, dataArr_n);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOGNORM_INV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //与对数分布相关的概率
            var probability = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(probability)){
                return probability;
            }

            if(!isRealNum(probability)){
                return formula.error.v;
            }

            probability = parseFloat(probability);

            //ln(x) 的平均值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                return formula.error.v;
            }

            mean = parseFloat(mean);

            //ln(x) 的标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                return formula.error.v;
            }

            standard_dev = parseFloat(standard_dev);

            if(probability <= 0 || probability >= 1){
                return formula.error.nm;
            }

            if(standard_dev <= 0){
                return formula.error.nm;
            }

            return jStat.lognormal.inv(probability, mean, standard_dev);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOGNORM_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //与对数分布相关的概率
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //ln(x) 的平均值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                return formula.error.v;
            }

            mean = parseFloat(mean);

            //ln(x) 的标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                return formula.error.v;
            }

            standard_dev = parseFloat(standard_dev);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(x <= 0 || standard_dev <= 0){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.lognormal.cdf(x, mean, standard_dev) : jStat.lognormal.pdf(x, mean, standard_dev);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "Z_TEST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用来检验 x 的数组或数据区域
            var dataArr = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], "text", true));
            }
            else{
                dataArr.push(arguments[0]);
            }

            var dataArr_n = [];

            for(var j = 0; j < dataArr.length; j++){
                var number = dataArr[j];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            //要测试的值
            var x = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            if(dataArr_n.length == 0){
                return formula.error.na;
            }

            //总体（已知）标准偏差。 如果省略，则使用样本标准偏差
            var sigma = func_methods.standardDeviation_s(dataArr_n);
            if(arguments.length == 3){
                sigma = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(sigma)){
                    return sigma;
                }

                if(!isRealNum(sigma)){
                    return formula.error.v;
                }

                sigma = parseFloat(sigma);
            }

            //计算
            var n = dataArr_n.length;
            var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);

            return 1 - window.luckysheet_function.NORM_S_DIST.f((mean - x) / (sigma / Math.sqrt(n)), "true");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PROB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //x_range
            var data_x_range = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                data_x_range = data_x_range.concat(func_methods.getDataArr(arguments[0], false));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                data_x_range = data_x_range.concat(func_methods.getCellDataArr(arguments[0], "text", false));
            }
            else{
                data_x_range.push(arguments[0]);
            }

            //prob_range
            var data_prob_range = [];

            if(getObjType(arguments[1]) == "array"){
                if(getObjType(arguments[1][0]) == "array" && !func_methods.isDyadicArr(arguments[1])){
                    return formula.error.v;
                }

                data_prob_range = data_prob_range.concat(func_methods.getDataArr(arguments[1], false));
            }
            else if(getObjType(arguments[1]) == "object" && arguments[1].startCell != null){
                data_prob_range = data_prob_range.concat(func_methods.getCellDataArr(arguments[1], "text", false));
            }
            else{
                data_prob_range.push(arguments[1]);
            }

            if(data_x_range.length != data_prob_range.length){
                return formula.error.na;
            }

            //data_x_range 和 data_prob_range 只取数值
            var x_range = [], prob_range = [], prob_range_sum = 0;

            for(var i = 0; i < data_x_range.length; i++){
                var num_x_range = data_x_range[i];
                var num_prob_range = data_prob_range[i];

                if(isRealNum(num_x_range) && isRealNum(num_prob_range)){
                    x_range.push(parseFloat(num_x_range));
                    prob_range.push(parseFloat(num_prob_range));

                    prob_range_sum += parseFloat(num_prob_range);

                    if(parseFloat(num_prob_range) <= 0 || parseFloat(num_prob_range) > 1){
                        return formula.error.nm;
                    }
                }
            }

            if(prob_range_sum != 1){
                return formula.error.nm;
            }

            //要计算其概率的数值下界
            var lower_limit = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(lower_limit)){
                return lower_limit;
            }

            if(!isRealNum(lower_limit)){
                return formula.error.v;
            }

            lower_limit = parseFloat(lower_limit);

            //要计算其概率的数值上界
            var upper_limit = lower_limit;
            if(arguments.length == 4){
                upper_limit = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(upper_limit)){
                    return upper_limit;
                }

                if(!isRealNum(upper_limit)){
                    return formula.error.v;
                }

                upper_limit = parseFloat(upper_limit);
            }

            //计算
            var result = 0;

            for (var i = 0; i < x_range.length; i++) {
                if (x_range[i] >= lower_limit && x_range[i] <= upper_limit) {
                    result += prob_range[i];
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "QUARTILE_EXC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要求得四分位数值的数组或数字型单元格区域
            var data_array = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                data_array = data_array.concat(func_methods.getDataArr(arguments[0], true));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                data_array = data_array.concat(func_methods.getCellDataArr(arguments[0], "text", true));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                data_array.push(arguments[0]);
            }

            var array = [];

            for(var i = 0; i < data_array.length; i++){
                var number = data_array[i];

                if(isRealNum(number)){
                    array.push(parseFloat(number));
                }
            }

            //要返回第几个四分位值
            var quart = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(quart)){
                return quart;
            }

            if(!isRealNum(quart)){
                return formula.error.v;
            }

            quart = parseInt(quart);

            if(array.length == 0){
                return formula.error.nm;
            }

            if(quart <= 0 || quart >= 4){
                return formula.error.nm;
            }

            //计算
            switch (quart) {
                case 1:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.25);
                case 2:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.5);
                case 3:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.75);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "QUARTILE_INC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要求得四分位数值的数组或数字型单元格区域
            var data_array = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                data_array = data_array.concat(func_methods.getDataArr(arguments[0], true));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                data_array = data_array.concat(func_methods.getCellDataArr(arguments[0], "text", true));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                data_array.push(arguments[0]);
            }

            var array = [];

            for(var i = 0; i < data_array.length; i++){
                var number = data_array[i];

                if(isRealNum(number)){
                    array.push(parseFloat(number));
                }
            }

            //要返回第几个四分位值
            var quart = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(quart)){
                return quart;
            }

            if(!isRealNum(quart)){
                return formula.error.v;
            }

            quart = parseInt(quart);

            if(array.length == 0){
                return formula.error.nm;
            }

            if(quart < 0 || quart > 4){
                return formula.error.nm;
            }

            //计算
            switch (quart) {
                case 0:
                    return Math.min.apply(Math, array);
                case 1:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.25);
                case 2:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.5);
                case 3:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.75);
                case 4:
                    return Math.max.apply(Math, array);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "POISSON_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //事件数
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseInt(x);

            //期望值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                return formula.error.v;
            }

            mean = parseFloat(mean);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[2]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(x < 0 || mean < 0){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RSQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表因变量数据数组或矩阵的范围
            var data_known_y = arguments[0];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, "text", false));
            }
            else{
                if(!isRealNum(data_known_y)){
                    return formula.error.v;
                }

                known_y.push(data_known_y);
            }

            //代表自变量数据数组或矩阵的范围
            var data_known_x = arguments[1];
            var known_x = [];

            if(getObjType(data_known_x) == "array"){
                if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
            }
            else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, "text", false));
            }
            else{
                if(!isRealNum(data_known_x)){
                    return formula.error.v;
                }

                known_x.push(data_known_x);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(data_y.length == 0 || data_x.length == 0){
                return formula.error.d;
            }

            return Math.pow(window.luckysheet_function.PEARSON.f(data_y, data_x), 2);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //T-分布函数的输入
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //自由度数值
            var degrees_freedom = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(degrees_freedom)){
                return degrees_freedom;
            }

            if(!isRealNum(degrees_freedom)){
                return formula.error.v;
            }

            degrees_freedom = parseInt(degrees_freedom);

            //决定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[2]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(degrees_freedom < 1){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.studentt.cdf(x, degrees_freedom) : jStat.studentt.pdf(x, degrees_freedom);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_DIST_2T": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //T-分布函数的输入
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //自由度数值
            var degrees_freedom = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(degrees_freedom)){
                return degrees_freedom;
            }

            if(!isRealNum(degrees_freedom)){
                return formula.error.v;
            }

            degrees_freedom = parseInt(degrees_freedom);

            if(x < 0 || degrees_freedom < 1){
                return formula.error.nm;
            }

            return (1 - jStat.studentt.cdf(x , degrees_freedom)) * 2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_DIST_RT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //T-分布函数的输入
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //自由度数值
            var degrees_freedom = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(degrees_freedom)){
                return degrees_freedom;
            }

            if(!isRealNum(degrees_freedom)){
                return formula.error.v;
            }

            degrees_freedom = parseInt(degrees_freedom);

            if(degrees_freedom < 1){
                return formula.error.nm;
            }

            return 1 - jStat.studentt.cdf(x , degrees_freedom);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_INV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //与学生的 t 分布相关的概率
            var probability = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(probability)){
                return probability;
            }

            if(!isRealNum(probability)){
                return formula.error.v;
            }

            probability = parseFloat(probability);

            //自由度数值
            var deg_freedom = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(deg_freedom)){
                return deg_freedom;
            }

            if(!isRealNum(deg_freedom)){
                return formula.error.v;
            }

            deg_freedom = parseInt(deg_freedom);

            if(probability <= 0 || probability > 1){
                return formula.error.nm;
            }

            if(deg_freedom < 1){
                return formula.error.nm;
            }

            return jStat.studentt.inv(probability, deg_freedom);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_INV_2T": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //与学生的 t 分布相关的概率
            var probability = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(probability)){
                return probability;
            }

            if(!isRealNum(probability)){
                return formula.error.v;
            }

            probability = parseFloat(probability);

            //自由度数值
            var deg_freedom = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(deg_freedom)){
                return deg_freedom;
            }

            if(!isRealNum(deg_freedom)){
                return formula.error.v;
            }

            deg_freedom = parseInt(deg_freedom);

            if(probability <= 0 || probability > 1){
                return formula.error.nm;
            }

            if(deg_freedom < 1){
                return formula.error.nm;
            }

            return Math.abs(jStat.studentt.inv(probability / 2, deg_freedom));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T_TEST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数据集
            var known_x = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(arguments[0], false));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(arguments[0], "text", false));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                known_x.push(arguments[0]);
            }

            // var data_x = [];
            var data_x = known_x;

            //第二个数据集
            var known_y = [];

            if(getObjType(arguments[1]) == "array"){
                if(getObjType(arguments[1][0]) == "array" && !func_methods.isDyadicArr(arguments[1])){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(arguments[1], false));
            }
            else if(getObjType(arguments[1]) == "object" && arguments[1].startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(arguments[1], "text", false));
            }
            else{
                if(!isRealNum(arguments[1])){
                    return formula.error.v;
                }

                known_y.push(arguments[1]);
            }

            // var data_y = [];
            var data_y = known_y;

            //指定分布的尾数
            var tails = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(tails)){
                return tails;
            }

            if(!isRealNum(tails)){
                return formula.error.v;
            }

            tails = parseInt(tails);

            //指定 t 检验的类型
            var type = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(type)){
                return type;
            }

            if(!isRealNum(type)){
                return formula.error.v;
            }

            type = parseInt(type);

            if([1,2].indexOf(tails) == -1){
                return formula.error.nm;
            }

            if([1,2,3].indexOf(type) == -1){
                return formula.error.nm;
            }

            //计算
            var t = null, df = null;
            if(type == 1){
                var diff_arr = [];

                for (i = 0; i < data_x.length; i++) {
                    diff_arr.push(data_x[i] - data_y[i]);
                }

                var diff_mean = Math.abs(jStat.mean(diff_arr));
                var diff_sd = func_methods.standardDeviation_s(diff_arr);

                t = diff_mean / (diff_sd / Math.sqrt(data_x.length));
                df = data_x.length - 1;
            }
            else{
                var mean_x = jStat.mean(data_x);
                var mean_y = jStat.mean(data_y);

                var s_x = func_methods.variance_s(data_x);
                var s_y = func_methods.variance_s(data_y);

                t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x / data_x.length + s_y / data_y.length);

                switch(type){
                    case 2:
                        df = data_x.length + data_y.length - 2;
                        break;
                    case 3:
                        df = Math.pow(s_x / data_x.length + s_y / data_y.length, 2) / (Math.pow(s_x / data_x.length, 2) / (data_x.length - 1) + Math.pow(s_y / data_y.length, 2) / (data_y.length - 1));
                        break;
                }
            }

            if(tails == 1){
                var result = window.luckysheet_function.T_DIST_RT.f(t, df);
            }
            else if(tails == 2){
                var result = window.luckysheet_function.T_DIST_2T.f(t, df);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "F_DIST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用来计算函数的值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //分子自由度
            var degrees_freedom1 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(degrees_freedom1)){
                return degrees_freedom1;
            }

            if(!isRealNum(degrees_freedom1)){
                return formula.error.v;
            }

            degrees_freedom1 = parseInt(degrees_freedom1);

            //分母自由度
            var degrees_freedom2 = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(degrees_freedom2)){
                return degrees_freedom2;
            }

            if(!isRealNum(degrees_freedom2)){
                return formula.error.v;
            }

            degrees_freedom2 = parseInt(degrees_freedom2);

            //用于确定函数形式的逻辑值
            var cumulative = func_methods.getCellBoolen(arguments[3]);

            if(valueIsError(cumulative)){
                return cumulative;
            }

            if(x < 0){
                return formula.error.nm;
            }

            if(degrees_freedom1 < 1){
                return formula.error.nm;
            }

            if(degrees_freedom2 < 1){
                return formula.error.nm;
            }

            return (cumulative) ? jStat.centralF.cdf(x, degrees_freedom1, degrees_freedom2) : jStat.centralF.pdf(x, degrees_freedom1, degrees_freedom2);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "F_DIST_RT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用来计算函数的值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //分子自由度
            var degrees_freedom1 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(degrees_freedom1)){
                return degrees_freedom1;
            }

            if(!isRealNum(degrees_freedom1)){
                return formula.error.v;
            }

            degrees_freedom1 = parseInt(degrees_freedom1);

            //分母自由度
            var degrees_freedom2 = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(degrees_freedom2)){
                return degrees_freedom2;
            }

            if(!isRealNum(degrees_freedom2)){
                return formula.error.v;
            }

            degrees_freedom2 = parseInt(degrees_freedom2);

            if(x < 0){
                return formula.error.nm;
            }

            if(degrees_freedom1 < 1){
                return formula.error.nm;
            }

            if(degrees_freedom2 < 1){
                return formula.error.nm;
            }

            return 1 - jStat.centralF.cdf(x, degrees_freedom1, degrees_freedom2);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VAR_P": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            if(dataArr_n.length == 0){
                return formula.error.d;
            }

            var n = dataArr_n.length;
            var sigma = 0;
            var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 2);
            }

            return sigma / n;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VAR_S": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            if(dataArr_n.length == 0){
                return formula.error.d;
            }

            var n = dataArr_n.length;
            var sigma = 0;
            var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 2);
            }

            return sigma / (n - 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VARA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(number.toString.toLowerCase() == "true"){
                        dataArr.push(1);
                    }
                    else if(number.toString.toLowerCase() == "false"){
                        dataArr.push(0);
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
                else{
                    if(number.toString().toLowerCase() == "true"){
                        dataArr_n.push(1);
                    }
                    else{
                        dataArr_n.push(0);
                    }
                }
            }

            var n = dataArr_n.length;
            var sigma = 0;
            var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 2);
            }

            return sigma / (n - 1);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VARPA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(number.toString.toLowerCase() == "true"){
                        dataArr.push(1);
                    }
                    else if(number.toString.toLowerCase() == "false"){
                        dataArr.push(0);
                    }
                    else if(isRealNum(data)){
                        dataArr.push(data);
                    }
                    else{
                        return formula.error.v;
                    }
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
                else{
                    if(number.toString().toLowerCase() == "true"){
                        dataArr_n.push(1);
                    }
                    else{
                        dataArr_n.push(0);
                    }
                }
            }

            var n = dataArr_n.length;
            var sigma = 0;
            var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 2);
            }

            return sigma / n;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STEYX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表因变量数据数组或矩阵的范围
            var known_y = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(arguments[0], false));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(arguments[0], "text", false));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                known_y.push(arguments[0]);
            }

            //代表自变量数据数组或矩阵的范围
            var known_x = [];

            if(getObjType(arguments[1]) == "array"){
                if(getObjType(arguments[1][0]) == "array" && !func_methods.isDyadicArr(arguments[1])){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(arguments[1], false));
            }
            else if(getObjType(arguments[1]) == "object" && arguments[1].startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(arguments[1], "text", false));
            }
            else{
                if(!isRealNum(arguments[1])){
                    return formula.error.v;
                }

                known_x.push(arguments[1]);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(data_y.length < 3 || data_x.length < 3){
                return formula.error.d;
            }

            //计算
            var xmean = jStat.mean(data_x);
            var ymean = jStat.mean(data_y);

            var n = data_x.length;
            var lft = 0;
            var num = 0;
            var den = 0;

            for (var i = 0; i < n; i++) {
                lft += Math.pow(data_y[i] - ymean, 2);
                num += (data_x[i] - xmean) * (data_y[i] - ymean);
                den += Math.pow(data_x[i] - xmean, 2);
            }

            return Math.sqrt((lft - num * num / den) / (n - 2));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STANDARDIZE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要正态化的随机变量值
            var x = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            if(!isRealNum(x)){
                return formula.error.v;
            }

            x = parseFloat(x);

            //分布的均值
            var mean = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(mean)){
                return mean;
            }

            if(!isRealNum(mean)){
                return formula.error.v;
            }

            mean = parseFloat(mean);

            //分布的标准偏差
            var standard_dev = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(standard_dev)){
                return standard_dev;
            }

            if(!isRealNum(standard_dev)){
                return formula.error.v;
            }

            standard_dev = parseFloat(standard_dev);

            if(standard_dev <= 0){
                return formula.error.nm;
            }

            return (x - mean) / standard_dev;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SMALL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要正态化的随机变量值
            var dataArr = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], "number", true));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                dataArr.push(arguments[0]);
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            //要返回的数据在数组或数据区域里的位置（从小到大）
            var k = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(k)){
                return k;
            }

            if(!isRealNum(k)){
                return formula.error.v;
            }

            k = parseInt(k);

            if(dataArr_n.length == 0){
                return formula.error.nm;
            }

            if(k <= 0 || k > dataArr_n.length){
                return formula.error.nm;
            }

            //计算

            return  dataArr_n.sort(function(a, b) {
                        return a - b;
                    })[k - 1];
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SLOPE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //代表因变量数据数组或矩阵的范围
            var known_y = [];

            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array" && !func_methods.isDyadicArr(arguments[0])){
                    return formula.error.v;
                }

                known_y = known_y.concat(func_methods.getDataArr(arguments[0], false));
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                known_y = known_y.concat(func_methods.getCellDataArr(arguments[0], "text", false));
            }
            else{
                if(!isRealNum(arguments[0])){
                    return formula.error.v;
                }

                known_y.push(arguments[0]);
            }

            //代表自变量数据数组或矩阵的范围
            var known_x = [];

            if(getObjType(arguments[1]) == "array"){
                if(getObjType(arguments[1][0]) == "array" && !func_methods.isDyadicArr(arguments[1])){
                    return formula.error.v;
                }

                known_x = known_x.concat(func_methods.getDataArr(arguments[1], false));
            }
            else if(getObjType(arguments[1]) == "object" && arguments[1].startCell != null){
                known_x = known_x.concat(func_methods.getCellDataArr(arguments[1], "text", false));
            }
            else{
                if(!isRealNum(arguments[1])){
                    return formula.error.v;
                }

                known_x.push(arguments[1]);
            }

            if(known_y.length != known_x.length){
                return formula.error.na;
            }

            //known_y 和 known_x 只取数值
            var data_y = [], data_x = [];

            for(var i = 0; i < known_y.length; i++){
                var num_y = known_y[i];
                var num_x = known_x[i];

                if(isRealNum(num_y) && isRealNum(num_x)){
                    data_y.push(parseFloat(num_y));
                    data_x.push(parseFloat(num_x));
                }
            }

            if(data_y.length < 3 || data_x.length < 3){
                return formula.error.d;
            }

            //计算
            var xmean = jStat.mean(data_x);
            var ymean = jStat.mean(data_y);

            var n = data_x.length;
            var num = 0;
            var den = 0;

            for (var i = 0; i < n; i++) {
                num += (data_x[i] - xmean) * (data_y[i] - ymean);
                den += Math.pow(data_x[i] - xmean, 2);
            }

            return num / den;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SKEW": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            if(dataArr_n.length < 3 || func_methods.standardDeviation_s(dataArr_n) == 0){
                return formula.error.d;
            }

            //计算
            var mean = jStat.mean(dataArr_n);
            var n = dataArr_n.length;
            var sigma = 0;
            for (var i = 0; i < n; i++) {
                sigma += Math.pow(dataArr_n[i] - mean, 3);
            }

            return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(dataArr_n, true), 3));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SKEW_P": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var dataArr = [];

            for (var i = 0; i < arguments.length; i++) {
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    if(!isRealNum(data)){
                        return formula.error.v;
                    }

                    dataArr.push(data);
                }
            }

            var dataArr_n = [];

            for(var i = 0; i < dataArr.length; i++){
                var number = dataArr[i];

                if(isRealNum(number)){
                    dataArr_n.push(parseFloat(number));
                }
            }

            if(dataArr_n.length < 3 || func_methods.standardDeviation_s(dataArr_n) == 0){
                return formula.error.d;
            }

            //计算
            var mean = jStat.mean(dataArr_n);
            var n = dataArr_n.length;
            var m2 = 0;
            var m3 = 0;

            for (var i = 0; i < n; i++) {
                m3 += Math.pow(dataArr_n[i] - mean, 3);
                m2 += Math.pow(dataArr_n[i] - mean, 2);
            }

            m3 = m3 / n;
            m2 = m2 / n;

            return m3 / Math.pow(m2, 3 / 2);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ADDRESS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //行号
            var row_num = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(row_num)){
                return row_num;
            }

            if(!isRealNum(row_num)){
                return formula.error.v;
            }

            row_num = parseInt(row_num);

            //列标
            var column_num = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(column_num)){
                return column_num;
            }

            if(!isRealNum(column_num)){
                return formula.error.v;
            }

            column_num = parseInt(column_num);

            //引用类型
            var abs_num = 1;
            if(arguments.length >= 3){
                abs_num = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(abs_num)){
                    return abs_num;
                }

                if(!isRealNum(abs_num)){
                    return formula.error.v;
                }

                abs_num = parseInt(abs_num);
            }

            //A1标记形式 -- R1C1标记形式
            var A1 = true;
            if(arguments.length >= 4){
                A1 = func_methods.getCellBoolen(arguments[3]);

                if(valueIsError(A1)){
                    return A1;
                }
            }

            if(row_num <= 0 || column_num <= 0){
                return formula.error.v;
            }

            if([1,2,3,4].indexOf(abs_num) == -1){
                return formula.error.v;
            }

            //计算
            var str;
            if(A1){
                column_num = chatatABC(column_num - 1);

                switch(abs_num){
                    case 1:
                        str = "$" + column_num + "$" + row_num;
                        break;
                    case 2:
                        str = column_num + "$" + row_num;
                        break;
                    case 3:
                        str = "$" + column_num + row_num;
                        break;
                    case 4:
                        str = column_num + row_num;
                        break;
                }
            }
            else{
                switch(abs_num){
                    case 1:
                        str = "R" + row_num + "C" + column_num;
                        break;
                    case 2:
                        str = "R" + row_num + "C[" + column_num + "]";
                        break;
                    case 3:
                        str = "R[" + row_num + "]" + "C" + column_num;
                        break;
                    case 4:
                        str = "R[" + row_num + "]" + "C[" + column_num + "]";
                        break;
                }
            }

            if(arguments.length == 5){
                //工作表名称
                var sheet_text = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(sheet_text)){
                    return sheet_text;
                }

                return sheet_text + "!" + str;
            }
            else{
                return str;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "INDIRECT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //以带引号的字符串形式提供的单元格引用
            var ref_text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(ref_text)){
                return ref_text;
            }

            //A1标记形式 -- R1C1标记形式
            var A1 = true;
            if(arguments.length == 2){
                A1 = func_methods.getCellBoolen(arguments[1]);

                if(valueIsError(A1)){
                    return A1;
                }
            }

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let currentSheet = luckysheetfile[index];
            let sheetdata = currentSheet.data;
            // sheetdata = Store.flowdata;
            // if (formula.execFunctionGroupData != null) {
            //     sheetdata = formula.execFunctionGroupData;
            // }

            //计算
            if(A1){

            }
            else{

            }

            if(formula.iscelldata(ref_text)){
                let cellrange = formula.getcellrange(ref_text);
                let row = cellrange.row[0], col = cellrange.column[0];

                if (row < 0 || row >= sheetdata.length || col < 0 || col >= sheetdata[0].length){
                    return formula.error.r;
                }

                if (sheetdata[row][col] == null || isRealNull(sheetdata[row][col].v)){
                    return 0;
                }

                let value = sheetdata[row][col].v;
                if (formula.execFunctionGlobalData != null) {
                    let ef = formula.execFunctionGlobalData[row+"_"+col+"_"+Store.calculateSheetIndex];
                    if(ef!=null){
                        value = ef.v;
                    }
                }


                let retAll= {
                    "sheetName": currentSheet.name,
                    "startCell": ref_text,
                    "rowl": row,
                    "coll": col,
                    "data": value
                };

                return retAll;
            }
            else{
                return formula.error.r;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROW": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            if(arguments.length == 1){
                //要返回其行号的单元格
                var reference;

                if(getObjType(arguments[0]) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                    reference = arguments[0].startCell;
                }
                else{
                    reference = arguments[0];
                }

                if(formula.iscelldata(reference)){
                    var cellrange = formula.getcellrange(reference);

                    return cellrange["row"][0] + 1;
                }
                else{
                    return formula.error.v;
                }
            }
            else{
                return window.luckysheetCurrentRow + 1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROWS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要返回其行数的范围
            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array"){
                    return arguments[0].length;
                }
                else{
                    return 1;
                }
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                return arguments[0].rowl;
            }
            else{
                return 1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COLUMN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            if(arguments.length == 1){
                //要返回其列号的单元格
                var reference;

                if(getObjType(arguments[0]) == "array"){
                    return formula.error.v;
                }
                else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                    reference = arguments[0].startCell;
                }
                else{
                    reference = arguments[0];
                }

                if(formula.iscelldata(reference)){
                    var cellrange = formula.getcellrange(reference);

                    return cellrange["column"][0] + 1;
                }
                else{
                    return formula.error.v;
                }
            }
            else{
                return window.luckysheetCurrentColumn + 1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COLUMNS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //返回指定数组或范围中的列数
            if(getObjType(arguments[0]) == "array"){
                if(getObjType(arguments[0][0]) == "array"){
                    return arguments[0][0].length;
                }
                else{
                    return arguments[0].length;
                }
            }
            else if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                return arguments[0].coll;
            }
            else{
                return 1;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "OFFSET": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于计算行列偏移量的起点
            if(!(getObjType(arguments[0]) == "object" && arguments[0].startCell != null)){
                return formula.error.v;
            }

            var reference = arguments[0].startCell;
            let sheetName = arguments[0].sheetName;

            //要偏移的行数
            var rows = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(rows)){
                return rows;
            }

            if(!isRealNum(rows)){
                return formula.error.v;
            }

            rows = parseInt(rows);

            //要偏移的列数
            var cols = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(cols)){
                return cols;
            }

            if(!isRealNum(cols)){
                return formula.error.v;
            }

            cols = parseInt(cols);

            //要从偏移目标开始返回的范围的高度
            var height = arguments[0].rowl;
            if(arguments.length >= 4){
                height = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(height)){
                    return height;
                }

                if(!isRealNum(height)){
                    return formula.error.v;
                }

                height = parseInt(height);
            }

            //要从偏移目标开始返回的范围的宽度
            var width = arguments[0].coll;
            if(arguments.length == 5){
                width = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(width)){
                    return width;
                }

                if(!isRealNum(width)){
                    return formula.error.v;
                }

                width = parseInt(width);
            }

            if(height < 1 || width < 1){
                return formula.error.r;
            }

            //计算
            var cellrange = formula.getcellrange(reference);
            var cellRow0 = cellrange["row"][0];
            var cellCol0 = cellrange["column"][0];

            cellRow0 += rows;
            cellCol0 += cols;

            var cellRow1 = cellRow0 + height - 1;
            var cellCol1 = cellCol0 + width - 1;

            // let sheetdata = null;
            // sheetdata = Store.flowdata;
            // if (formula.execFunctionGroupData != null) {
            //     sheetdata = formula.execFunctionGroupData;
            // }

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            if (cellRow0 < 0 || cellRow1 >= sheetdata.length || cellCol0 < 0 || cellCol1 >= sheetdata[0].length){
                return formula.error.r;
            }

            var result = [];

            for(var r = cellRow0; r <= cellRow1; r++){
                var rowArr = [];

                for(var c = cellCol0; c <= cellCol1; c++){
                    if(formula.execFunctionGlobalData != null && formula.execFunctionGlobalData[r+"_"+c+"_"+Store.calculateSheetIndex]!=null){
                        let ef = formula.execFunctionGlobalData[r+"_"+c+"_"+Store.calculateSheetIndex];
                        if(ef!=null){
                            rowArr.push(ef.v);
                        }
                        else{
                            rowArr.push(0);
                        }
                    }
                    else if (sheetdata[r][c] != null && !isRealNull(sheetdata[r][c].v)){
                        rowArr.push(sheetdata[r][c].v);
                    }
                    else{
                        rowArr.push(0);
                    }
                }

                result.push(rowArr);
            }


            let retAll= {
                "sheetName": sheetName,
                "startCell": getRangetxt(Store.calculateSheetIndex, {
                    row: [cellRow0, cellRow1],
                    column: [cellCol0, cellCol1]
                }),
                "rowl": cellRow0,
                "coll": cellCol0,
                "data": result
            };

            return retAll;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MATCH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //lookup_value
            var lookup_value = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(lookup_value)){
                return lookup_value;
            }

            //lookup_array
            var data_lookup_array = arguments[1];
            var lookup_array = [];

            if(getObjType(data_lookup_array) == "array"){
                if(getObjType(data_lookup_array[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_lookup_array)){
                        return formula.error.v;
                    }

                    return formula.error.na;
                }
                else{
                    for(var i = 0; i < data_lookup_array.length; i++){
                        lookup_array.push(data_lookup_array[i]);
                    }
                }
            }
            else if(getObjType(data_lookup_array) == "object" && data_lookup_array.startCell != null){
                if(data_lookup_array.rowl > 1 && data_lookup_array.coll > 1){
                    return formula.error.na;
                }

                if(data_lookup_array.data != null){
                    if(getObjType(data_lookup_array.data) == "array"){
                        for(var i = 0; i < data_lookup_array.data.length; i++){
                            for(var j = 0; j < data_lookup_array.data[i].length; j++){
                                if(data_lookup_array.data[i][j] != null && !isRealNull(data_lookup_array.data[i][j].v)){
                                    lookup_array.push(data_lookup_array.data[i][j].v);
                                }
                            }
                        }
                    }
                    else{
                        lookup_array.push(data_lookup_array.data.v);
                    }
                }
            }

            //match_type
            var match_type = 1;
            if(arguments.length == 3){
                match_type = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(match_type)){
                    return match_type;
                }

                if(!isRealNum(match_type)){
                    return formula.error.v;
                }

                match_type = Math.ceil(parseFloat(match_type));
            }

            if([-1,0,1].indexOf(match_type) == -1){
                return formula.error.na;
            }

            //计算
            var index;
            var indexValue;

            for (var idx = 0; idx < lookup_array.length; idx++) {
                if (match_type === 1) {
                    if (lookup_array[idx] === lookup_value) {
                        return idx + 1;
                    }
                    else if (lookup_array[idx] < lookup_value) {
                        if (!indexValue) {
                            index = idx + 1;
                            indexValue = lookup_array[idx];
                        }
                        else if (lookup_array[idx] > indexValue) {
                            index = idx + 1;
                            indexValue = lookup_array[idx];
                        }
                    }
                }
                else if (match_type === 0) {
                    if (typeof lookup_value === 'string') {
                        lookup_value = lookup_value.replace(/\?/g, '.');
                        if (lookup_array[idx].toLowerCase().match(lookup_value.toLowerCase())) {
                            return idx + 1;
                        }
                    }
                    else {
                        if (lookup_array[idx] === lookup_value) {
                            return idx + 1;
                        }
                    }
                }
                else if (match_type === -1) {
                    if (lookup_array[idx] === lookup_value) {
                        return idx + 1;
                    }
                    else if (lookup_array[idx] > lookup_value) {
                        if (!indexValue) {
                            index = idx + 1;
                            indexValue = lookup_array[idx];
                        }
                        else if (lookup_array[idx] < indexValue) {
                            index = idx + 1;
                            indexValue = lookup_array[idx];
                        }
                    }
                }
            }

            return index ? index : formula.error.na;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VLOOKUP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //lookup_value
            var lookup_value = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(lookup_value)){
                return lookup_value;
            }

            if(lookup_value.toString().replace(/\s/g, "") == ""){
                return formula.error.na;
            }

            //table_array
            var data_table_array = arguments[1];
            var table_array = [];

            if(getObjType(data_table_array) == "array"){
                if(getObjType(data_table_array[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_table_array)){
                        return formula.error.v;
                    }

                    for(var i = 0; i < data_table_array.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < data_table_array[i].length; j++){
                            rowArr.push(data_table_array[i][j]);
                        }

                        table_array.push(rowArr);
                    }
                }
                else{
                    var rowArr = [];

                    for(var i = 0; i < data_table_array.length; i++){
                        rowArr.push(data_table_array[i]);
                    }

                    table_array.push(rowArr);
                }
            }
            else if(getObjType(data_table_array) == "object" && data_table_array.startCell != null){
                table_array = func_methods.getCellDataDyadicArr(data_table_array, "text");
            }
            else{
                return formula.error.v;
            }

            //col_index_num
            var col_index_num = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(col_index_num)){
                return col_index_num;
            }

            if(!isRealNum(col_index_num)){
                return formula.error.v;
            }

            col_index_num = parseInt(col_index_num);

            //range_lookup
            var range_lookup = true;
            if(arguments.length == 4){
                range_lookup = func_methods.getCellBoolen(arguments[3]);

                if(valueIsError(range_lookup)){
                    return range_lookup;
                }
            }

            //判断
            if(col_index_num < 1){
                return formula.error.v;
            }
            else if(col_index_num > table_array[0].length){
                return formula.error.r;
            }

            //计算
            if(range_lookup){
                table_array = orderbydata(table_array, 0, true);

                for(var r = 0; r < table_array.length; r++){
                    var v = table_array[r][0];

                    var result;

                    if (isdatetime(lookup_value) && isdatetime(v)) {
                        result = diff(lookup_value, v);
                    }
                    else if (isRealNum(lookup_value) && isRealNum(v)) {
                        result = numeral(lookup_value).value() - numeral(v).value();
                    }
                    else if (!isRealNum(lookup_value) && !isRealNum(v)) {
                        result = lookup_value.localeCompare(v, "zh");
                    }
                    else if (!isRealNum(lookup_value)) {
                        result = 1;
                    }
                    else if (!isRealNum(v)) {
                        result = -1;
                    }

                    if(result < 0){
                        if(r == 0){
                            return formula.error.na;
                        }
                        else{
                            return table_array[r - 1][col_index_num - 1];
                        }
                    }
                    else{
                        if(r == table_array.length - 1){
                            return table_array[r][col_index_num - 1];
                        }
                    }
                }
            }
            else{
                var index = null;

                for(var r = 0; r < table_array.length; r++){
                    if(lookup_value.toString() == table_array[r][0].toString()){
                        index = r;
                        break;
                    }
                }

                if(index == null){
                    return formula.error.na;
                }

                return table_array[index][col_index_num - 1];
            }
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HLOOKUP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var searchkey = arguments[0];

            if(typeof(searchkey) == "object"){
                searchkey = arguments[0].data;

                if (getObjType(searchkey) == "array") {
                    searchkey = searchkey[r];

                    if (getObjType(searchkey) == "array") {
                        searchkey = searchkey[c];
                    }
                }
                else{
                    searchkey = searchkey.v;
                }
            }
            var range = arguments[1].data;
            var index = arguments[2];
            var isaccurate = false;
            if (arguments.length > 3) {
                isaccurate = !!arguments[3];
            }
            if (index > range.rowl) {
                return [formula.error.v, "索引超过了范围的长度，" + range[0].length];
            }
            if (index < 1) {
                return [formula.error.v, "索引必须大于1"];
            }

            var result = formula.error.na;
            for(var c = 0;c < range[0].length;c++){
                var matchv = getcellvalue(0, c, range);
                var showv = getcellvalue(index - 1, c, range);

                if (isaccurate) {
                    if (matchv.indexOf(searchkey) > -1) {
                        result = showv;
                    }
                } else {
                    if (formula.acompareb(matchv,searchkey)) {
                        result = showv;
                        return result;
                    }
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOOKUP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //完成矢量形式（数组形式不推荐，未做）
            //=LOOKUP(4.19, A2:A6, B2:B6)
            //=LOOKUP(0, A2:A6, B2:B6)
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var searchkey = arguments[0];

            if(typeof(searchkey) == "object"){
                searchkey = arguments[0].data;

                if (getObjType(searchkey) == "array") {
                    searchkey = searchkey[r];

                    if (getObjType(searchkey) == "array") {
                        searchkey = searchkey[c];
                    }
                }
                else{
                    searchkey = searchkey.v;
                }
            }

            //必须为一维数组
            var range = arguments[1].data;
            var range2;
            var result = formula.error.na;

            function sortNum(a,b){ //用于排序
                return b - a;
            }

            //获得两个范围的数组
            range= formula.getRangeArray(range)[0];
            if(arguments[2]){
                range2 = arguments[2].data;
                range2 = formula.getRangeArray(range2)[0];
            }

            if(typeof(searchkey) == "string"){ //字符串直接判断是否相等

                for (var i = 0; i < range.length; i++) {
                    var matchv = range[i];
                    var showv;
                    if(arguments[2]){
                        showv = range2[i];
                        if(matchv == searchkey) {
                            result = showv;
                        }
                    }else{
                        if (formula.acompareb(matchv,searchkey)) {
                            result = matchv;
                        }
                    }
                }
            }else if(isdatatype(searchkey) == "num"){ //数字判断1.是否相等2.不等，去找接近值
                    var rangeNow = [];

                    for (var i = 0; i < range.length; i++) {
                        var matchv = range[i];
                        var showv;

                        if(arguments[2]){
                            showv = range2[i];
                            if(matchv == searchkey) {
                                result = showv;
                                return result;
                            }else if(matchv != searchkey && isdatatype(matchv) == "num"){
                                rangeNow.push(matchv);
                            }
                        }else{
                            if (matchv == searchkey) {
                                result = matchv;
                                return result;
                            }else if(matchv != searchkey && isdatatype(matchv) == "num"){
                                rangeNow.push(matchv);
                            }
                        }

                    }
                    if(rangeNow.length != 0){
                        rangeNow.push(searchkey);
                        rangeNow.sort(sortNum);

                        var index = rangeNow.indexOf(searchkey);
                        if(index == (rangeNow.length -1)){
                            return [formula.error.na, "找不到对应参数"];
                        }else{
                            var mat = rangeNow[index + 1];
                            if(arguments[2]){
                                var i = range.indexOf(mat);//改成数组
                                result = range2[i];
                            }else{
                                result = mat;
                            }

                        }
                    }

            }

            return result;

        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "INDEX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格区域或数组常量
            var data_array = arguments[0];
            var array = [];
            let isReference = false;
            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "number");
                isReference = true;
            }

            var rowlen = array.length, collen = array[0].length;

            //选择数组中的某行，函数从该行返回数值
            var row_num = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(row_num)){
                return row_num;
            }

            if(!isRealNum(row_num)){
                return formula.error.v;
            }

            row_num = parseInt(row_num);

            //选择数组中的某列，函数从该列返回数值
            var column_num = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(column_num)){
                return column_num;
            }



            if(row_num < 0 || (isRealNum(column_num) && column_num < 0)){
                return formula.error.v;
            }

            if(row_num > rowlen || (isRealNum(column_num) && column_num > collen)){
                return formula.error.r;
            }

            if(isReference){

                var cellrange = formula.getcellrange(data_array.startCell);
                var cellRow0 = cellrange["row"][0];
                var cellCol0 = cellrange["column"][0];


                let data = array;
                if(row_num == 0 || column_num == 0){
                    if(row_num==0){
                        data = array[0];
                        row_num = 1;
                    }
                    else{
                        data = array[row_num-1];
                    }

                    if(isRealNum(column_num)){
                        if(column_num==0){
                            data = data[0];
                            column_num = 1;
                        }
                        else{
                            data = data[column_num-1]
                        }
                    }
                    else{
                        column_num = 1;
                    }
                }
                else{
                    if(!isRealNum(row_num)){
                        row_num = 1;
                    }

                    if(!isRealNum(column_num)){
                        column_num = 1;
                    }
                    data = array[row_num - 1][column_num - 1];
                }

                let row_index = cellRow0 + row_num - 1, column_index = cellCol0 + column_num - 1;

                let retAll= {
                    "sheetName": data_array.sheetName,
                    "startCell": getRangetxt(Store.calculateSheetIndex, {
                        row: [row_index, row_index],
                        column: [column_index, column_index]
                    }),
                    "rowl": row_index,
                    "coll": column_index,
                    "data": data
                };
                return retAll;
            }
            else{
                //计算

                if(!isRealNum(column_num)){
                    return formula.error.v;
                }

                column_num = parseInt(column_num);

                if(row_num <= 0 || column_num <= 0){
                    return formula.error.v;
                }
                return array[row_num - 1][column_num - 1];
            }


        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GETPIVOTDATA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return formula.error.v;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CHOOSE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //指定要返回哪一项
            var index_num = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(index_num)){
                return index_num;
            }

            if(!isRealNum(index_num)){
                return formula.error.v;
            }

            index_num = parseInt(index_num);

            if(index_num < 1 || index_num > arguments.length - 1){
                return formula.error.v;
            }

            var data_result = arguments[index_num];

            if(getObjType(data_result) == "array"){
                if(getObjType(data_result[0]) == "array" && !func_methods.isDyadicArr(data_result)){
                    return formula.error.v;
                }

                return data_result;
            }
            else if(getObjType(data_result) == "object" && data_result.startCell != null){
                if(data_result.data == null){
                    return 0;
                }

                if(getObjType(data_result.data) == "array"){
                    var result = func_methods.getCellDataDyadicArr(data_result.data, "number");

                    return result;
                }
                else{
                    if(isRealNull(data_result.data.v)){
                        return 0;
                    }

                    return data_result.data.v;
                }
            }
            else{
                return data_result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HYPERLINK": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return formula.error.v;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TIME": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //时
            var hour = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(hour)){
                return hour;
            }

            if(!isRealNum(hour)){
                return formula.error.v;
            }

            hour = parseInt(hour);

            //分
            var minute = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(minute)){
                return minute;
            }

            if(!isRealNum(minute)){
                return formula.error.v;
            }

            minute = parseInt(minute);

            //秒
            var second = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(second)){
                return second;
            }

            if(!isRealNum(second)){
                return formula.error.v;
            }

            second = parseInt(second);

            if(hour < 0 || hour > 32767){
                return formula.error.nm;
            }
            else if(hour > 24){
                hour = hour % 24;
            }

            if(minute < 0 || minute > 32767){
                return formula.error.nm;
            }

            if(second < 0 || second > 32767){
                return formula.error.nm;
            }

            //计算
            var time = dayjs().set({'hour': hour, 'minute': minute, 'second': second});

            return dayjs(time).format("h:mm:ss a");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TIMEVALUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于表示时间的字符串
            var time_text = func_methods.getCellDate(arguments[0]);
            if(valueIsError(time_text)){
                return time_text;
            }

            //计算
            if(!dayjs(time_text).isValid()){
                return formula.error.v;
            }

            return (3600 * dayjs(time_text).get('hour') + 60 * dayjs(time_text).get('minute') + dayjs(time_text).get('second')) / 86400;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EOMONTH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于计算结果的参照日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            //月数
            var months = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(months)){
                return months;
            }

            if(!isRealNum(months)){
                return formula.error.v;
            }

            months = parseInt(months);

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //计算
            var date = dayjs(start_date).add(months + 1, 'months').set('date', 1).subtract(1, 'days');
            var mask = genarate(dayjs(date).format("YYYY-MM-DD H:mm:ss"));

            var result = mask[2];

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EDATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于计算结果的参照日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            //月数
            var months = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(months)){
                return months;
            }

            if(!isRealNum(months)){
                return formula.error.v;
            }

            months = parseInt(months);

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //计算
            var date = dayjs(start_date).add(months, 'months');
            var mask = genarate(dayjs(date).format("YYYY-MM-DD h:mm:ss"));

            var result = mask[2];

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SECOND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //时间值
            var time_text = func_methods.getCellDate(arguments[0]);
            if(valueIsError(time_text)){
                return time_text;
            }

            if(!dayjs(time_text).isValid()){
                return formula.error.v;
            }

            var result = dayjs(time_text).seconds();

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MINUTE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //时间值
            var time_text = func_methods.getCellDate(arguments[0]);
            if(valueIsError(time_text)){
                return time_text;
            }

            if(!dayjs(time_text).isValid()){
                return formula.error.v;
            }

            var result = dayjs(time_text).minutes();

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HOUR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //时间值
            var time_text = func_methods.getCellDate(arguments[0]);
            if(valueIsError(time_text)){
                return time_text;
            }

            if(!dayjs(time_text).isValid()){
                return formula.error.v;
            }

            var result = dayjs(time_text).hours();

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NOW": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return dayjs().format("YYYY-M-D HH:mm");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NETWORKDAYS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            if(arguments.length == 3){
                var result = window.luckysheet_function.NETWORKDAYS_INTL.f(arguments[0], arguments[1], 1, arguments[2]);
            }
            else{
                var result = window.luckysheet_function.NETWORKDAYS_INTL.f(arguments[0], arguments[1], 1);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NETWORKDAYS_INTL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var WEEKEND_TYPES = [
                [],
                [6, 0],
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
                [5, 6],
                undefined,
                undefined,
                undefined,
                [0, 0],
                [1, 1],
                [2, 2],
                [3, 3],
                [4, 4],
                [5, 5],
                [6, 6]
            ];

            //用于计算净工作日天数的时间段开始日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //用于计算净工作日天数的时间段结束日期
            var end_date = func_methods.getCellDate(arguments[1]);
            if(valueIsError(end_date)){
                return end_date;
            }

            if(!dayjs(end_date).isValid()){
                return formula.error.v;
            }

            //用于表示哪些天为周末的数字或字符串
            var weekend = WEEKEND_TYPES[1];
            if(arguments.length >= 3){
                weekend = arguments[2];

                if(typeof weekend == "string" && weekend.length == "7" && /^[0-1]{7}$/g.test(weekend)){

                }
                else{
                    weekend = func_methods.getFirstValue(arguments[2]);
                    if(valueIsError(weekend)){
                        return weekend;
                    }

                    if(!isRealNum(weekend)){
                        return formula.error.v;
                    }

                    weekend = parseInt(weekend);

                    if(weekend < 1 || (weekend > 7 && weekend < 11) || weekend > 17){
                        return formula.error.nm;
                    }

                    weekend = WEEKEND_TYPES[weekend];
                }
            }

            //这是一个范围或数组常量，其中包含作为节假日的日期
            var holidays = [];
            if(arguments.length == 4){
                holidays = func_methods.getCellrangeDate(arguments[3]);
                if(valueIsError(holidays)){
                    return holidays;
                }
            }

            for (var i = 0; i < holidays.length; i++) {
                if(!dayjs(holidays[i]).isValid()){
                    return formula.error.v;
                }
            }

            //计算
            var days = dayjs(end_date).diff(dayjs(start_date), 'days') + 1;
            var total = days;
            var day = dayjs(start_date);

            for (i = 0; i < days; i++) {
                var d = dayjs(day).weekday();
                var dec = false;

                if(getObjType(weekend) == "array"){
                    if (d === weekend[0] || d === weekend[1]) {
                        dec = true;
                    }
                }
                else{
                    if(d == 0){
                        d = 7;
                    }

                    if(weekend.charAt(d - 1) == "0"){
                        dec = true;
                    }
                }

                for (var j = 0; j < holidays.length; j++) {
                    if(dayjs(day).diff(dayjs(holidays[j]), 'days') === 0){
                        dec = true;
                        break;
                    }
                }

                if (dec) {
                    total--;
                }

                day = dayjs(day).add(1, 'days');
            }

            return total;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISOWEEKNUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于日期和时间计算的日期
            var date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(date)){
                return date;
            }

            if(!dayjs(date).isValid()){
                return formula.error.v;
            }

            //计算
            return dayjs(date).isoWeeks();
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "WEEKNUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var WEEK_STARTS = [
                undefined,
                7,
                1,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ];

            //用于计算净工作日天数的时间段开始日期
            var serial_number = func_methods.getCellDate(arguments[0]);
            if(valueIsError(serial_number)){
                return serial_number;
            }

            if(!dayjs(serial_number).isValid()){
                return formula.error.v;
            }

            //用于表示哪些天为周末的数字或字符串
            var return_type = 1;
            if(arguments.length == 2){
                return_type = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(return_type)){
                    return return_type;
                }

                if(!isRealNum(return_type)){
                    return formula.error.v;
                }

                return_type = parseInt(return_type);
            }

            if(return_type == 21){
                return window.luckysheet_function.ISOWEEKNUM.f(arguments[0]);
            }

            if([1,2,11,12,13,14,15,16,17].indexOf(return_type) == -1){
                return formula.error.nm;
            }

            //计算
            var week_start = WEEK_STARTS[return_type];
            var inc = dayjs(serial_number).isoWeekday() >= week_start ? 1 : 0;
            var result = dayjs(serial_number).isoWeeks() + inc;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "WEEKDAY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var WEEK_TYPES = [
                [],
                [1, 2, 3, 4, 5, 6, 7],
                [7, 1, 2, 3, 4, 5, 6],
                [6, 0, 1, 2, 3, 4, 5],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [7, 1, 2, 3, 4, 5, 6],
                [6, 7, 1, 2, 3, 4, 5],
                [5, 6, 7, 1, 2, 3, 4],
                [4, 5, 6, 7, 1, 2, 3],
                [3, 4, 5, 6, 7, 1, 2],
                [2, 3, 4, 5, 6, 7, 1],
                [1, 2, 3, 4, 5, 6, 7]
            ];

            //用于计算净工作日天数的时间段开始日期
            var serial_number = func_methods.getCellDate(arguments[0]);
            if(valueIsError(serial_number)){
                return serial_number;
            }

            if(!dayjs(serial_number).isValid()){
                return formula.error.v;
            }

            //以数字指示使用哪种编号顺序来表示星期几
            var return_type = 1;
            if(arguments.length == 2){
                return_type = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(return_type)){
                    return return_type;
                }

                if(!isRealNum(return_type)){
                    return formula.error.v;
                }

                return_type = parseInt(return_type);
            }

            if([1,2,3,11,12,13,14,15,16,17].indexOf(return_type) == -1){
                return formula.error.nm;
            }

            //计算
            var result = WEEK_TYPES[return_type][dayjs(serial_number).day()];

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DAY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //用于计算净工作日天数的时间段开始日期
            var serial_number = func_methods.getCellDate(arguments[0]);
            if(valueIsError(serial_number)){
                return serial_number;
            }

            if(!dayjs(serial_number).isValid()){
                return formula.error.v;
            }

            //计算
            return dayjs(serial_number).date();
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DAYS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结束日期
            var end_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(end_date)){
                return end_date;
            }

            if(!dayjs(end_date).isValid()){
                return formula.error.v;
            }

            //开始日期
            var start_date = func_methods.getCellDate(arguments[1]);
            if(valueIsError(start_date)){
                return start_date;
            }

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //计算
            var result = dayjs(end_date).diff(dayjs(start_date), 'days');

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DAYS360": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //开始日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //结束日期
            var end_date = func_methods.getCellDate(arguments[1]);
            if(valueIsError(end_date)){
                return end_date;
            }

            if(!dayjs(end_date).isValid()){
                return formula.error.v;
            }

            //天数计算方法
            var method = false;
            if(arguments.length == 3){
                method = func_methods.getCellBoolen(arguments[2]);

                if(valueIsError(method)){
                    return method;
                }
            }

            //计算
            var sm = dayjs(start_date).month();
            var em = dayjs(end_date).month();
            var sd, ed;

            if (method) {
                sd = dayjs(start_date).date() === 31 ? 30 : dayjs(start_date).date();
                ed = dayjs(end_date).date() === 31 ? 30 : dayjs(end_date).date();
            }
            else {
                var smd = dayjs().set({ 'year': dayjs(start_date).year(), 'month': sm + 1, 'date': 0 }).date();
                var emd = dayjs().set({ 'year': dayjs(end_date).year(), 'month': em + 1, 'date': 0 }).date();
                sd = dayjs(start_date).date() === smd ? 30 : dayjs(start_date).date();

                if (dayjs(end_date).date() === emd) {
                    if (sd < 30) {
                        em++;
                        ed = 1;
                    }
                    else {
                        ed = 30;
                    }
                }
                else {
                    ed = dayjs(end_date).date();
                }
            }

            var result = 360 * dayjs(end_date).diff(dayjs(start_date), 'years') + 30 * (em - sm) + (ed - sd);

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //年
            var year = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(year)){
                return year;
            }

            if(!isRealNum(year)){
                return formula.error.v;
            }

            year = parseInt(year);

            //月
            var month = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(month)){
                return month;
            }

            if(!isRealNum(month)){
                return formula.error.v;
            }

            month = parseInt(month);

            //日
            var day = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(day)){
                return day;
            }

            if(!isRealNum(day)){
                return formula.error.v;
            }

            day = parseInt(day);

            if(year < 0 || year >= 10000){
                return formula.error.nm;
            }
            else if(year >= 0 && year <= 1899){
                year = year + 1900;
            }

            var date = dayjs().set({ 'year': year, 'month': month - 1, "date": day });

            if(dayjs(date).year() < 1900){
                return formula.error.nm;
            }

            return dayjs(date).format("YYYY-MM-DD");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATEVALUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //开始日期
            var date_text = func_methods.getCellDate(arguments[0]);
            if(valueIsError(date_text)){
                return date_text;
            }

            if(!dayjs(date_text).isValid()){
                return formula.error.v;
            }

            //计算
            date_text = dayjs(date_text).format("YYYY-MM-DD");
            var result = genarate(date_text)[2];

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DATEDIF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            for (var i = 0; i < arguments.length-1; i++){
                arguments[i] = func_methods.getCellDate(arguments[i]);
                if(!isdatetime(arguments[i])){
                    return formula.error.v;
                }
            }

            var startDate = dayjs(arguments[0]);
            var endDate = dayjs(arguments[1]);
            var unit = arguments[2];
            var result = formula.error.v;
            if(window.luckysheet_function.DAYS.f(endDate,startDate) < 0){
                return formula.error.v;
            }

            switch(unit){
                case "Y":case "y":
                    result = endDate.diff(startDate,"years",false);
                    break;
                case "M":case "m":
                    result = endDate.diff(startDate,"months",false);
                    break;
                case "D":case "d":
                    result = endDate.diff(startDate,"days",false);
                    break;
                case "MD":case "md":
                    result = endDate.format('DD') - startDate.format('DD');
                    break;
                case "YM":case "ym":
                    var startM = parseInt(startDate.format('M')); //注意字符串转化为数字
                    var endM = parseInt(endDate.format('M'));
                    result = (startM <= endM) ?  endM - startM : endM + 12 - startM;
                    break;
                case "YD":case "yd":
                    const format = `${endDate.$y}-MM-DD`;
                    var startM = genarate(startDate.format(format))[2];
                    var endM = genarate(endDate.format(format))[2];

                    result = (startM <= endM) ? endM - startM : endM + 365 - startM;
                    break;
                default:
                    result = formula.error.v;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "WORKDAY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            if(arguments.length == 3){
                var result = window.luckysheet_function.WORKDAY_INTL.f(arguments[0], arguments[1], 1, arguments[2]);
            }
            else{
                var result = window.luckysheet_function.WORKDAY_INTL.f(arguments[0], arguments[1], 1);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "WORKDAY_INTL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var WEEKEND_TYPES = [
                [],
                [6, 0],
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
                [5, 6],
                undefined,
                undefined,
                undefined,
                [0, 0],
                [1, 1],
                [2, 2],
                [3, 3],
                [4, 4],
                [5, 5],
                [6, 6]
            ];

            //计算的开始日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //工作日的天数
            var days = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(days)){
                return days;
            }

            if(!isRealNum(days)){
                return formula.error.v;
            }

            days = parseInt(days);

            //用于表示哪些天为周末的数字或字符串
            var weekend = WEEKEND_TYPES[1];
            if(arguments.length >= 3){
                weekend = arguments[2];

                if(typeof weekend == "string" && weekend.length == "7" && /^[0-1]{7}$/g.test(weekend)){

                }
                else{
                    weekend = func_methods.getFirstValue(arguments[2]);
                    if(valueIsError(weekend)){
                        return weekend;
                    }

                    if(!isRealNum(weekend)){
                        return formula.error.v;
                    }

                    weekend = parseInt(weekend);

                    if(weekend < 1 || (weekend > 7 && weekend < 11) || weekend > 17){
                        return formula.error.nm;
                    }

                    weekend = WEEKEND_TYPES[weekend];
                }
            }

            //这是一个范围或数组常量，其中包含作为节假日的日期
            var holidays = [];
            if(arguments.length == 4){
                holidays = func_methods.getCellrangeDate(arguments[3]);
                if(valueIsError(holidays)){
                    return holidays;
                }
            }

            for (var i = 0; i < holidays.length; i++) {
                if(!dayjs(holidays[i]).isValid()){
                    return formula.error.v;
                }
            }

            //计算
            var d = 0;

            while (d < days) {
                start_date = dayjs(start_date).add(1, 'days');
                var day = dayjs(start_date).weekday();

                if(getObjType(weekend)){
                    if (day === weekend[0] || day === weekend[1]) {
                        continue;
                    }
                }
                else{
                    if(day == 0){
                        day = 7;
                    }

                    if(weekend.charAt(day - 1) == "0"){
                        continue;
                    }
                }

                for (var j = 0; j < holidays.length; j++) {
                    if(dayjs(start_date).diff(dayjs(holidays[j]), 'days') === 0){
                        d--;
                        break;
                    }
                }

                d++;
            }

            return dayjs(start_date).format("YYYY-MM-DD");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "YEAR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //开始日期
            var serial_number = func_methods.getCellDate(arguments[0]);
            if(valueIsError(serial_number)){
                return serial_number;
            }

            if(!dayjs(serial_number).isValid()){
                return formula.error.v;
            }

            //计算
            return dayjs(serial_number).year();
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "YEARFRAC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //开始日期
            var start_date = func_methods.getCellDate(arguments[0]);
            if(valueIsError(start_date)){
                return start_date;
            }

            if(!dayjs(start_date).isValid()){
                return formula.error.v;
            }

            //结束日期
            var end_date = func_methods.getCellDate(arguments[1]);
            if(valueIsError(end_date)){
                return end_date;
            }

            if(!dayjs(end_date).isValid()){
                return formula.error.v;
            }

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 3){
                basis = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(start_date).date();
            var sm = dayjs(start_date).month() + 1;
            var sy = dayjs(start_date).year();
            var ed = dayjs(end_date).date();
            var em = dayjs(end_date).month() + 1;
            var ey = dayjs(end_date).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(start_date, end_date) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        return dayjs(end_date).diff(dayjs(start_date), 'days') / ylength;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    result = dayjs(end_date).diff(dayjs(start_date), 'days') / average;

                    break;
                case 2: // Actual/360
                    result = dayjs(end_date).diff(dayjs(start_date), 'days') / 360;

                    break;
                case 3: // Actual/365
                    result = dayjs(end_date).diff(dayjs(start_date), 'days') / 365;

                    break;
                case 4: // European 30/360
                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TODAY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return dayjs().format("YYYY-MM-DD");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MONTH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //开始日期
            var serial_number = func_methods.getCellDate(arguments[0]);
            if(valueIsError(serial_number)){
                return serial_number;
            }

            if(!dayjs(serial_number).isValid()){
                return formula.error.v;
            }

            //计算
            return dayjs(serial_number).month() + 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EFFECT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //每年的名义利率
            var nominal_rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(nominal_rate)){
                return nominal_rate;
            }

            if(!isRealNum(nominal_rate)){
                return formula.error.v;
            }

            nominal_rate = parseFloat(nominal_rate);

            //每年的复利计算期数
            var npery = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(npery)){
                return npery;
            }

            if(!isRealNum(npery)){
                return formula.error.v;
            }

            npery = parseInt(npery);

            if(nominal_rate <= 0 || npery < 1){
                return formula.error.nm;
            }

            return Math.pow(1 + nominal_rate / npery, npery) - 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DOLLAR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要设置格式的值
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //显示的小数位数
            var decimals = 2;
            if(arguments.length == 2){
                decimals = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(decimals)){
                    return decimals;
                }

                if(!isRealNum(decimals)){
                    return formula.error.v;
                }

                decimals = parseInt(decimals);
            }

            if(decimals > 9){
                decimals = 9;
            }

            var foucsStatus = "0.";
            for(var i = 1; i <= decimals; i++){
                foucsStatus += "0";
            }

            //计算
            var sign = (number > 0) ? 1 : -1;

            return sign * (Math.floor(Math.abs(number) * Math.pow(10, decimals))) / Math.pow(10, decimals);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DOLLARDE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //分数
            var fractional_dollar = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(fractional_dollar)){
                return fractional_dollar;
            }

            if(!isRealNum(fractional_dollar)){
                return formula.error.v;
            }

            fractional_dollar = parseFloat(fractional_dollar);

            //用作分数中的分母的整数
            var fraction = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(fraction)){
                return fraction;
            }

            if(!isRealNum(fraction)){
                return formula.error.v;
            }

            fraction = parseInt(fraction);

            if(fraction < 0){
                return formula.error.nm;
            }
            else if(fraction == 0){
                return formula.error.d;
            }

            //计算
            var result = parseInt(fractional_dollar, 10);

            result += (fractional_dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

            var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
            result = Math.round(result * power) / power;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DOLLARFR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //小数
            var decimal_dollar = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(decimal_dollar)){
                return decimal_dollar;
            }

            if(!isRealNum(decimal_dollar)){
                return formula.error.v;
            }

            decimal_dollar = parseFloat(decimal_dollar);

            //用作分数中的分母的整数
            var fraction = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(fraction)){
                return fraction;
            }

            if(!isRealNum(fraction)){
                return formula.error.v;
            }

            fraction = parseInt(fraction);

            if(fraction < 0){
                return formula.error.nm;
            }
            else if(fraction == 0){
                return formula.error.d;
            }

            //计算
            var result = parseInt(decimal_dollar, 10);

            result += (decimal_dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //资产原值
            var cost = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(cost)){
                return cost;
            }

            if(!isRealNum(cost)){
                return formula.error.v;
            }

            cost = parseFloat(cost);

            //资产残值
            var salvage = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(salvage)){
                return salvage;
            }

            if(!isRealNum(salvage)){
                return formula.error.v;
            }

            salvage = parseFloat(salvage);

            //资产的折旧期数
            var life = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(life)){
                return life;
            }

            if(!isRealNum(life)){
                return formula.error.v;
            }

            life = parseFloat(life);

            //在使用期限内要计算折旧的折旧期
            var period = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(period)){
                return period;
            }

            if(!isRealNum(period)){
                return formula.error.v;
            }

            period = parseInt(period);

            //折旧第一年中的月数
            var month = 12;
            if(arguments.length == 5){
                month = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(month)){
                    return month;
                }

                if(!isRealNum(month)){
                    return formula.error.v;
                }

                month = parseInt(month);
            }

            if(cost < 0 || salvage < 0 || life < 0 || period < 0){
                return formula.error.nm;
            }

            if(month < 1 || month > 12){
                return formula.error.nm;
            }

            if(period > life){
                return formula.error.nm;
            }

            if(salvage >= cost){
                return 0;
            }

            //计算
            var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

            var initial = cost * rate * month / 12;

            var total = initial;
            var current = 0;
            var ceiling = (period === life) ? life - 1 : period;

            for (var i = 2; i <= ceiling; i++) {
                current = (cost - total) * rate;
                total += current;
            }

            if (period === 1) {
                var result = initial;
            }
            else if (period === life) {
                var result = (cost - total) * rate;
            }
            else {
                var result = current;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DDB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //资产原值
            var cost = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(cost)){
                return cost;
            }

            if(!isRealNum(cost)){
                return formula.error.v;
            }

            cost = parseFloat(cost);

            //资产残值
            var salvage = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(salvage)){
                return salvage;
            }

            if(!isRealNum(salvage)){
                return formula.error.v;
            }

            salvage = parseFloat(salvage);

            //资产的折旧期数
            var life = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(life)){
                return life;
            }

            if(!isRealNum(life)){
                return formula.error.v;
            }

            life = parseFloat(life);

            //在使用期限内要计算折旧的折旧期
            var period = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(period)){
                return period;
            }

            if(!isRealNum(period)){
                return formula.error.v;
            }

            period = parseInt(period);

            //折旧的递减系数
            var factor = 2;
            if(arguments.length == 5){
                factor = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(factor)){
                    return factor;
                }

                if(!isRealNum(factor)){
                    return formula.error.v;
                }

                factor = parseFloat(factor);
            }

            if(cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0){
                return formula.error.nm;
            }

            if(period > life){
                return formula.error.nm;
            }

            if(salvage >= cost){
                return 0;
            }

            //计算
            var total = 0;
            var current = 0;

            for (var i = 1; i <= period; i++) {
                current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
                total += current;
            }

            return current;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //年金的付款总期数。
            var nper = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //每期的付款金额
            var pmt = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(pmt)){
                return pmt;
            }

            if(!isRealNum(pmt)){
                return formula.error.v;
            }

            pmt = parseFloat(pmt);

            //现值
            var pv = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 4){
                fv = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 5){
                type = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            //预期利率
            var guess = 0.1;
            if(arguments.length == 6){
                guess = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(guess)){
                    return guess;
                }

                if(!isRealNum(guess)){
                    return formula.error.v;
                }

                guess = parseFloat(guess);
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var epsMax = 1e-6;

            var iterMax = 100;
            var iter = 0;
            var close = false;
            var rate = guess;

            while (iter < iterMax && !close) {
                var t1 = Math.pow(rate + 1, nper);
                var t2 = Math.pow(rate + 1, nper - 1);

                var f1 = fv + t1 * pv + pmt * (t1 - 1) * (rate * type + 1) / rate;
                var f2 = nper * t2 * pv - pmt * (t1 - 1) *(rate * type + 1) / Math.pow(rate,2);
                var f3 = nper * pmt * t2 * (rate * type + 1) / rate + pmt * (t1 - 1) * type / rate;

                var newRate = rate - f1 / (f2 + f3);

                if (Math.abs(newRate - rate) < epsMax) close = true;

                iter++
                rate = newRate;
            }

            if (!close) return formula.error.nm;

            return rate;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CUMPRINC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //年金的现值
            var pv = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //首期
            var start_period = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(start_period)){
                return start_period;
            }

            if(!isRealNum(start_period)){
                return formula.error.v;
            }

            start_period = parseInt(start_period);

            //末期
            var end_period = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(end_period)){
                return end_period;
            }

            if(!isRealNum(end_period)){
                return formula.error.v;
            }

            end_period = parseInt(end_period);

            //指定各期的付款时间是在期初还是期末
            var type = func_methods.getFirstValue(arguments[5]);
            if(valueIsError(type)){
                return type;
            }

            if(!isRealNum(type)){
                return formula.error.v;
            }

            type = parseFloat(type);

            if(rate <= 0 || nper <= 0 || pv <= 0){
                return formula.error.nm;
            }

            if(start_period < 1 || end_period < 1 || start_period > end_period){
                return formula.error.nm;
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var payment = window.luckysheet_function.PMT.f(rate, nper, pv, 0, type);
            var principal = 0;

            if (start_period === 1) {
                if (type === 0) {
                    principal = payment + pv * rate;
                }
                else {
                    principal = payment;
                }
                start_period++;
            }

            for (var i = start_period; i <= end_period; i++) {
                if (type > 0) {
                    principal += payment - (window.luckysheet_function.FV.f(rate, i - 2, payment, pv, 1) - payment) * rate;
                }
                else {
                    principal += payment - window.luckysheet_function.FV.f(rate, i - 1, payment, pv, 0) * rate;
                }
            }

            return principal;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPNUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                var basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / (360 / frequency);

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        return dayjs(maturity).diff(dayjs(settlement), 'days') / (ylength / frequency);
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / (average / frequency);

                    break;
                case 2: // Actual/360
                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / (360 / frequency);

                    break;
                case 3: // Actual/365
                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / (365 / frequency);

                    break;
                case 4: // European 30/360
                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / (360 / frequency);

                    break;
            }

            return Math.round(result);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SYD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //资产原值
            var cost = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(cost)){
                return cost;
            }

            if(!isRealNum(cost)){
                return formula.error.v;
            }

            cost = parseFloat(cost);

            //资产残值
            var salvage = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(salvage)){
                return salvage;
            }

            if(!isRealNum(salvage)){
                return formula.error.v;
            }

            salvage = parseFloat(salvage);

            //资产的折旧期数
            var life = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(life)){
                return life;
            }

            if(!isRealNum(life)){
                return formula.error.v;
            }

            life = parseFloat(life);

            //在使用期限内要计算折旧的折旧期
            var period = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(period)){
                return period;
            }

            if(!isRealNum(period)){
                return formula.error.v;
            }

            period = parseInt(period);

            if(life == 0){
                return formula.error.nm;
            }

            if(period < 1 || period > life){
                return formula.error.nm;
            }

            return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TBILLEQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //债券购买时的贴现率
            var discount = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(discount)){
                return discount;
            }

            if(!isRealNum(discount)){
                return formula.error.v;
            }

            discount = parseFloat(discount);

            if(discount <= 0){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) > 0){
                return formula.error.nm;
            }

            if(dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000){
                return formula.error.nm;
            }

            return (365 * discount) / (360 - discount * dayjs(maturity).diff(dayjs(settlement), 'days'));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TBILLYIELD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的价格
            var pr = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pr)){
                return pr;
            }

            if(!isRealNum(pr)){
                return formula.error.v;
            }

            pr = parseFloat(pr);

            if(pr <= 0){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            if(dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000){
                return formula.error.nm;
            }

            return ((100 - pr) / pr) * (360 / dayjs(maturity).diff(dayjs(settlement), 'days'));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TBILLPRICE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的价格
            var discount = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(discount)){
                return discount;
            }

            if(!isRealNum(discount)){
                return formula.error.v;
            }

            discount = parseFloat(discount);

            if(discount <= 0){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) > 0){
                return formula.error.nm;
            }

            if(dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000){
                return formula.error.nm;
            }

            return 100 * (1 - discount * dayjs(maturity).diff(dayjs(settlement), 'days') / 360);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //每期的付款金额
            var pmt = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pmt)){
                return pmt;
            }

            if(!isRealNum(pmt)){
                return formula.error.v;
            }

            pmt = parseFloat(pmt);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 4){
                fv = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 5){
                type = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            if (rate === 0) {
                var result = -pmt * nper - fv;
            }
            else {
                var result = (((1 - Math.pow(1 + rate, nper)) / rate) * pmt * (1 + rate * type) - fv) / Math.pow(1 + rate, nper);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ACCRINT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //有价证券的发行日
            var issue = func_methods.getCellDate(arguments[0]);
            if(valueIsError(issue)){
                return issue;
            }

            if(!dayjs(issue).isValid()){
                return formula.error.v;
            }

            //有价证券的首次计息日
            var first_interest = func_methods.getCellDate(arguments[1]);
            if(valueIsError(first_interest)){
                return first_interest;
            }

            if(!dayjs(first_interest).isValid()){
                return formula.error.v;
            }

            //有价证券的结算日
            var settlement = func_methods.getCellDate(arguments[2]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var rate = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //证券的票面值
            var par = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(par)){
                return par;
            }

            if(!isRealNum(par)){
                return formula.error.v;
            }

            par = parseFloat(par);

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[5]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length >= 7){
                basis = func_methods.getFirstValue(arguments[6]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            //当结算日期晚于首次计息日期时用于计算总应计利息的方法
            var calc_method = true;
            if(arguments.length == 8){
                calc_method = func_methods.getCellBoolen(arguments[7]);

                if(valueIsError(calc_method)){
                    return calc_method;
                }
            }

            if(rate <= 0 || par <= 0){
                return formula.error.nm;
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(issue) - dayjs(settlement) >= 0){
                return formula.error.nm;
            }

            //计算
            var result;
            if(dayjs(settlement) - dayjs(first_interest) >= 0 && !calc_method){
                var sd = dayjs(first_interest).date();
                var sm = dayjs(first_interest).month() + 1;
                var sy = dayjs(first_interest).year();
                var ed = dayjs(settlement).date();
                var em = dayjs(settlement).month() + 1;
                var ey = dayjs(settlement).year();

                switch (basis) {
                    case 0: // US (NASD) 30/360
                        if (sd === 31 && ed === 31) {
                            sd = 30;
                            ed = 30;
                        }
                        else if (sd === 31) {
                            sd = 30;
                        }
                        else if (sd === 30 && ed === 31) {
                            ed = 30;
                        }

                        result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                        break;
                    case 1: // Actual/actual
                        var ylength = 365;
                        if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                            if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(first_interest, settlement) || (em === 1 && ed === 29)) {
                                ylength = 366;
                            }

                            return dayjs(settlement).diff(dayjs(first_interest), 'days') / ylength;
                        }

                        var years = (ey - sy) + 1;
                        var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                        var average = days / years;

                        result = dayjs(settlement).diff(dayjs(first_interest), 'days') / average;

                        break;
                    case 2: // Actual/360
                        result = dayjs(settlement).diff(dayjs(first_interest), 'days') / 360;

                        break;
                    case 3: // Actual/365
                        result = dayjs(settlement).diff(dayjs(first_interest), 'days') / 365;

                        break;
                    case 4: // European 30/360
                        result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                        break;
                }
            }
            else{
                var sd = dayjs(issue).date();
                var sm = dayjs(issue).month() + 1;
                var sy = dayjs(issue).year();
                var ed = dayjs(settlement).date();
                var em = dayjs(settlement).month() + 1;
                var ey = dayjs(settlement).year();

                switch (basis) {
                    case 0: // US (NASD) 30/360
                        if (sd === 31 && ed === 31) {
                            sd = 30;
                            ed = 30;
                        }
                        else if (sd === 31) {
                            sd = 30;
                        }
                        else if (sd === 30 && ed === 31) {
                            ed = 30;
                        }

                        result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                        break;
                    case 1: // Actual/actual
                        var ylength = 365;
                        if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                            if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(issue, settlement) || (em === 1 && ed === 29)) {
                                ylength = 366;
                            }

                            return dayjs(settlement).diff(dayjs(issue), 'days') / ylength;
                        }

                        var years = (ey - sy) + 1;
                        var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                        var average = days / years;

                        result = dayjs(settlement).diff(dayjs(issue), 'days') / average;

                        break;
                    case 2: // Actual/360
                        result = dayjs(settlement).diff(dayjs(issue), 'days') / 360;

                        break;
                    case 3: // Actual/365
                        result = dayjs(settlement).diff(dayjs(issue), 'days') / 365;

                        break;
                    case 4: // European 30/360
                        result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                        break;
                }
            }

            return par * rate * result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ACCRINTM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //有价证券的发行日
            var issue = func_methods.getCellDate(arguments[0]);
            if(valueIsError(issue)){
                return issue;
            }

            if(!dayjs(issue).isValid()){
                return formula.error.v;
            }

            //有价证券的到期日
            var settlement = func_methods.getCellDate(arguments[1]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var rate = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //证券的票面值
            var par = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(par)){
                return par;
            }

            if(!isRealNum(par)){
                return formula.error.v;
            }

            par = parseFloat(par);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(rate <= 0 || par <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(issue) - dayjs(settlement) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(issue).date();
            var sm = dayjs(issue).month() + 1;
            var sy = dayjs(issue).year();
            var ed = dayjs(settlement).date();
            var em = dayjs(settlement).month() + 1;
            var ey = dayjs(settlement).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(issue, settlement) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        return dayjs(settlement).diff(dayjs(issue), 'days') / ylength;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    result = dayjs(settlement).diff(dayjs(issue), 'days') / average;

                    break;
                case 2: // Actual/360
                    result = dayjs(settlement).diff(dayjs(issue), 'days') / 360;

                    break;
                case 3: // Actual/365
                    result = dayjs(settlement).diff(dayjs(issue), 'days') / 365;

                    break;
                case 4: // European 30/360
                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
            }

            return par * rate * result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPDAYBS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var interest; //结算日之前的上一个付息日

            var maxCount = Math.ceil(dayjs(maturity).diff(dayjs(settlement), 'months') / (12 / frequency)) + 1;

            for(var i = 1; i <= maxCount; i++){
                var di = dayjs(maturity).subtract((12 / frequency) * i, 'months');

                if(di <= dayjs(settlement)){
                    interest = di;
                    break;
                }
            }

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    var sd = dayjs(interest).date();
                    var sm = dayjs(interest).month() + 1;
                    var sy = dayjs(interest).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();

                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = (ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360);

                    break;
                case 1: // Actual/actual
                case 2: // Actual/360
                case 3: // Actual/365
                    result = dayjs(settlement).diff(dayjs(interest), 'days');

                    break;
                case 4: // European 30/360
                    var sd = dayjs(interest).date();
                    var sm = dayjs(interest).month() + 1;
                    var sy = dayjs(interest).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();

                    result = (ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360);

                    break;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPDAYS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    result = 360 / frequency;

                    break;
                case 1: // Actual/actual
                    var maxCount = Math.ceil(dayjs(maturity).diff(dayjs(settlement), 'months') / (12 / frequency)) + 1;

                    for(var i = 1; i <= maxCount; i++){
                        var d1 = dayjs(maturity).subtract((12 / frequency) * i, 'months');
                        if(d1 <= dayjs(settlement)){
                            var d2 = dayjs(maturity).subtract((12 / frequency) * (i - 1), 'months');
                            result = dayjs(d2).diff(dayjs(d1), 'days');
                            break;
                        }
                    }

                    break;
                case 2: // Actual/360
                    result = 360 / frequency;

                    break;
                case 3: // Actual/365
                    result = 365 / frequency;

                    break;
                case 4: // European 30/360
                    result = 360 / frequency;

                    break;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPDAYSNC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var interest; //结算日之后的下一个付息日

            var maxCount = Math.ceil(dayjs(maturity).diff(dayjs(settlement), 'months') / (12 / frequency)) + 1;

            for(var i = 1; i <= maxCount; i++){
                var di = dayjs(maturity).subtract((12 / frequency) * i, 'months');

                if(di <= dayjs(settlement)){
                    interest = dayjs(maturity).subtract((12 / frequency) * (i - 1), 'months');
                    break;
                }
            }

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    var sd = dayjs(settlement).date();
                    var sm = dayjs(settlement).month() + 1;
                    var sy = dayjs(settlement).year();
                    var ed = dayjs(interest).date();
                    var em = dayjs(interest).month() + 1;
                    var ey = dayjs(interest).year();

                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = (ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360);

                    break;
                case 1: // Actual/actual
                case 2: // Actual/360
                case 3: // Actual/365
                    result = dayjs(interest).diff(dayjs(settlement), 'days');

                    break;
                case 4: // European 30/360
                    var sd = dayjs(settlement).date();
                    var sm = dayjs(settlement).month() + 1;
                    var sy = dayjs(settlement).year();
                    var ed = dayjs(interest).date();
                    var em = dayjs(interest).month() + 1;
                    var ey = dayjs(interest).year();

                    result = (ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360);

                    break;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPNCD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var interest; //结算日之后的下一个付息日

            var maxCount = Math.ceil(dayjs(maturity).diff(dayjs(settlement), 'months') / (12 / frequency)) + 1;

            for(var i = 1; i <= maxCount; i++){
                var di = dayjs(maturity).subtract((12 / frequency) * i, 'months');

                if(di <= dayjs(settlement)){
                    interest = dayjs(maturity).subtract((12 / frequency) * (i - 1), 'months');
                    break;
                }
            }

            return dayjs(interest).format("YYYY-MM-DD");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COUPPCD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 4){
                basis = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var interest; //结算日之前的上一个付息日

            var maxCount = Math.ceil(dayjs(maturity).diff(dayjs(settlement), 'months') / (12 / frequency)) + 1;

            for(var i = 1; i <= maxCount; i++){
                var di = dayjs(maturity).subtract((12 / frequency) * i, 'months');

                if(di <= dayjs(settlement)){
                    interest = di;
                    break;
                }
            }

            return dayjs(interest).format("YYYY-MM-DD");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //每期的付款金额
            var pmt = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pmt)){
                return pmt;
            }

            if(!isRealNum(pmt)){
                return formula.error.v;
            }

            pmt = parseFloat(pmt);

            //现值，或一系列未来付款的当前值的累积和
            var pv = 0;
            if(arguments.length >= 4){
                pv = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(pv)){
                    return pv;
                }

                if(!isRealNum(pv)){
                    return formula.error.v;
                }

                pv = parseFloat(pv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 5){
                type = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var result;
            if (rate === 0) {
                result = pv + pmt * nper;
            }
            else {
                var term = Math.pow(1 + rate, nper);
                if (type === 1) {
                    result = pv * term + pmt * (1 + rate) * (term - 1) / rate;
                }
                else {
                    result = pv * term + pmt * (term - 1) / rate;
                }
            }

            return -result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FVSCHEDULE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //现值
            var principal = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(principal)){
                return principal;
            }

            if(!isRealNum(principal)){
                return formula.error.v;
            }

            principal = parseFloat(principal);

            //一组利率
            var data_schedule = arguments[1];
            var schedule = [];

            if(getObjType(data_schedule) == "array"){
                if(getObjType(data_schedule[0]) == "array" && !func_methods.isDyadicArr(data_schedule)){
                    return formula.error.v;
                }

                schedule = schedule.concat(func_methods.getDataArr(data_schedule, false));
            }
            else if(getObjType(data_schedule) == "object" && data_schedule.startCell != null){
                schedule = schedule.concat(func_methods.getCellDataArr(data_schedule, "number", false));
            }
            else{
                schedule.push(data_schedule);
            }

            var schedule_n = [];

            for(var i = 0; i < schedule.length; i++){
                var number = schedule[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                schedule_n.push(parseFloat(number));
            }

            //计算
            var n = schedule_n.length;
            var future = principal;

            for (var i = 0; i < n; i++) {
                future *= 1 + schedule_n[i];
            }

            return future;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "YIELD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var rate = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //有价证券的价格
            var pr = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(pr)){
                return pr;
            }

            if(!isRealNum(pr)){
                return formula.error.v;
            }

            pr = parseFloat(pr);

            //有价证券的清偿价值
            var redemption = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[5]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 7){
                basis = func_methods.getFirstValue(arguments[6]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(rate < 0){
                return formula.error.nm;
            }

            if(pr <= 0 || redemption <= 0){
                return formula.error.nm;
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var num = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);

            if(num > 1){
                var a = 1;
                var b = 0;
                var yld = a;

                for(var i = 1; i <= 100; i++){
                    var price = window.luckysheet_function.PRICE.f(settlement, maturity, rate, yld, redemption, frequency, basis);

                    if(Math.abs(price - pr) < 0.000001){
                        break;
                    }

                    if(price > pr){
                        b = yld;
                    }
                    else{
                        a = yld;
                    }

                    yld = (a + b) / 2;
                }

                var result = yld;
            }
            else{
                var DSR = window.luckysheet_function.COUPDAYSNC.f(settlement, maturity, frequency, basis);
                var E = window.luckysheet_function.COUPDAYS.f(settlement, maturity, frequency, basis);
                var A = window.luckysheet_function.COUPDAYBS.f(settlement, maturity, frequency, basis);

                var T1 = redemption / 100 + rate / frequency;
                var T2 = pr / 100 + (A / E) * (rate / frequency);
                var T3 = frequency * E / DSR;

                var result = ((T1 - T2) / T2) * T3;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "YIELDDISC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的价格
            var pr = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pr)){
                return pr;
            }

            if(!isRealNum(pr)){
                return formula.error.v;
            }

            pr = parseFloat(pr);

            //有价证券的清偿价值
            var redemption = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(pr <= 0 || redemption <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            var yearfrac = window.luckysheet_function.YEARFRAC.f(settlement, maturity, basis);

            return (redemption / pr - 1) / yearfrac;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NOMINAL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //每年的实际利率
            var effect_rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(effect_rate)){
                return effect_rate;
            }

            if(!isRealNum(effect_rate)){
                return formula.error.v;
            }

            effect_rate = parseFloat(effect_rate);

            //每年的复利期数
            var npery = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(npery)){
                return npery;
            }

            if(!isRealNum(npery)){
                return formula.error.v;
            }

            npery = parseInt(npery);

            if(effect_rate <= 0 || npery < 1){
                return formula.error.nm;
            }

            return (Math.pow(effect_rate + 1, 1 / npery) - 1) * npery;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "XIRR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //投资相关收益或支出的数组或范围
            var data_values = arguments[0];
            var values = [];

            if(getObjType(data_values) == "array"){
                if(getObjType(data_values[0]) == "array" && !func_methods.isDyadicArr(data_values)){
                    return formula.error.v;
                }

                values = values.concat(func_methods.getDataArr(data_values, false));
            }
            else if(getObjType(data_values) == "object" && data_values.startCell != null){
                values = values.concat(func_methods.getCellDataArr(data_values, "number", false));
            }
            else{
                values.push(data_values);
            }

            var values_n = [];

            for(var i = 0; i < values.length; i++){
                var number = values[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                values_n.push(parseFloat(number));
            }

            //与现金流数额参数中的现金流对应的日期数组或范围
            var dates = func_methods.getCellrangeDate(arguments[1]);
            if(valueIsError(dates)){
                return dates;
            }

            for(var i = 0; i < dates.length; i++){
                if(!dayjs(dates[i]).isValid()){
                    return formula.error.v;
                }
            }

            //对内部回报率的估算值
            var guess = 0.1;
            if(arguments.length == 3){
                guess = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(guess)){
                    return guess;
                }

                if(!isRealNum(guess)){
                    return formula.error.v;
                }

                guess = parseFloat(guess);
            }

            var positive = false;
            var negative = false;
            for (var i = 0; i < values_n.length; i++) {
                if (values_n[i] > 0) {
                    positive = true;
                }

                if (values_n[i] < 0) {
                    negative = true;
                }

                if(positive && negative){
                    break;
                }
            }

            if(!positive || !negative){
                return formula.error.nm;
            }

            if(values_n.length != dates.length){
                return formula.error.nm;
            }

            //计算
            var irrResult = function(values, dates, rate) {
                var r = rate + 1;
                var result = values[0];

                for (var i = 1; i < values.length; i++) {
                    result += values[i] / Math.pow(r, window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365);
                }

                return result;
            };

            var irrResultDeriv = function(values, dates, rate) {
                var r = rate + 1;
                var result = 0;

                for (var i = 1; i < values.length; i++) {
                    var frac = window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365;
                    result -= frac * values[i] / Math.pow(r, frac + 1);
                }

                return result;
            };

            var resultRate = guess;
            var epsMax = 1e-10;

            var newRate, epsRate, resultValue;
            var contLoop = true;

            do {
                resultValue = irrResult(values_n, dates, resultRate);
                newRate = resultRate - resultValue / irrResultDeriv(values_n, dates, resultRate);
                epsRate = Math.abs(newRate - resultRate);
                resultRate = newRate;
                contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
            }
            while (contLoop);

            return resultRate;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MIRR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //投资相关收益或支出的数组或范围
            var data_values = arguments[0];
            var values = [];

            if(getObjType(data_values) == "array"){
                if(getObjType(data_values[0]) == "array" && !func_methods.isDyadicArr(data_values)){
                    return formula.error.v;
                }

                values = values.concat(func_methods.getDataArr(data_values, false));
            }
            else if(getObjType(data_values) == "object" && data_values.startCell != null){
                values = values.concat(func_methods.getCellDataArr(data_values, "number", false));
            }
            else{
                values.push(data_values);
            }

            var values_n = [];

            for(var i = 0; i < values.length; i++){
                var number = values[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                values_n.push(parseFloat(number));
            }

            //现金流中使用的资金支付的利率
            var finance_rate = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(finance_rate)){
                return finance_rate;
            }

            if(!isRealNum(finance_rate)){
                return formula.error.v;
            }

            finance_rate = parseFloat(finance_rate);

            //将现金流再投资的收益率
            var reinvest_rate = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(reinvest_rate)){
                return reinvest_rate;
            }

            if(!isRealNum(reinvest_rate)){
                return formula.error.v;
            }

            reinvest_rate = parseFloat(reinvest_rate);

            //计算
            var n = values_n.length;
            var payments = [];
            var incomes = [];

            for (var i = 0; i < n; i++) {
                if (values_n[i] < 0) {
                    payments.push(values_n[i]);
                }
                else {
                    incomes.push(values_n[i]);
                }
            }

            if(payments.length == 0 || incomes.length == 0){
                return formula.error.d;
            }

            var num = -window.luckysheet_function.NPV.f(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
            var den = window.luckysheet_function.NPV.f(finance_rate, payments) * (1 + finance_rate);

            return Math.pow(num / den, 1 / (n - 1)) - 1;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IRR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //投资相关收益或支出的数组或范围
            var data_values = arguments[0];
            var values = [];

            if(getObjType(data_values) == "array"){
                if(getObjType(data_values[0]) == "array" && !func_methods.isDyadicArr(data_values)){
                    return formula.error.v;
                }

                values = values.concat(func_methods.getDataArr(data_values, false));
            }
            else if(getObjType(data_values) == "object" && data_values.startCell != null){
                values = values.concat(func_methods.getCellDataArr(data_values, "number", true));
            }
            else{
                values.push(data_values);
            }

            var values_n = [];

            for(var i = 0; i < values.length; i++){
                var number = values[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                values_n.push(parseFloat(number));
            }

            //对内部回报率的估算值
            var guess = 0.1;
            if(arguments.length == 2){
                guess = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(guess)){
                    return guess;
                }

                if(!isRealNum(guess)){
                    return formula.error.v;
                }

                guess = parseFloat(guess);
            }

            var dates = [];
            var positive = false;
            var negative = false;

            for (var i = 0; i < values.length; i++) {
                dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;

                if (values[i] > 0) {
                    positive = true;
                }

                if (values[i] < 0) {
                    negative = true;
                }
            }

            if(!positive || !negative){
                return formula.error.nm;
            }

            //计算
            var irrResult = function(values, dates, rate) {
                var r = rate + 1;
                var result = values[0];

                for (var i = 1; i < values.length; i++) {
                    // result += values[i] / Math.pow(r, window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365);
                    result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
                }

                return result;
            };

            var irrResultDeriv = function(values, dates, rate) {
                var r = rate + 1;
                var result = 0;

                for (var i = 1; i < values.length; i++) {
                    // var frac = window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365;
                    var frac = (dates[i] - dates[0]) / 365;
                    result -= frac * values[i] / Math.pow(r, frac + 1);
                }

                return result;
            };

            var resultRate = guess;
            var epsMax = 1e-10;

            var newRate, epsRate, resultValue;
            var contLoop = true;

            do {
                resultValue = irrResult(values_n, dates, resultRate);
                newRate = resultRate - resultValue / irrResultDeriv(values_n, dates, resultRate);
                epsRate = Math.abs(newRate - resultRate);
                resultRate = newRate;
                contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
            }
            while (contLoop);

            return resultRate;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NPV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //某一期间的贴现率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //支出（负值）和收益（正值）
            var values = [];

            for(var i = 1; i < arguments.length; i++){
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    values = values.concat(func_methods.getDataArr(data, true));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    values = values.concat(func_methods.getCellDataArr(data, "number", true));
                }
                else{
                    values.push(data);
                }
            }

            var values_n = [];

            for(var i = 0; i < values.length; i++){
                var number = values[i];

                if(isRealNum(number)){
                    values_n.push(parseFloat(number));
                }
            }

            //计算
            var result = 0;

            if(values_n.length > 0){
                for(var i = 0; i < values_n.length; i++){
                    result += values_n[i] / Math.pow(1 + rate, i + 1);
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "XNPV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //应用于现金流的贴现率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //与 dates 中的支付时间相对应的一系列现金流
            var data_values = arguments[1];
            var values = [];

            if(getObjType(data_values) == "array"){
                if(getObjType(data_values[0]) == "array" && !func_methods.isDyadicArr(data_values)){
                    return formula.error.v;
                }

                values = values.concat(func_methods.getDataArr(data_values, false));
            }
            else if(getObjType(data_values) == "object" && data_values.startCell != null){
                values = values.concat(func_methods.getCellDataArr(data_values, "number", false));
            }
            else{
                values.push(data_values);
            }

            var values_n = [];

            for(var i = 0; i < values.length; i++){
                var number = values[i];

                if(!isRealNum(number)){
                    return formula.error.v;
                }

                values_n.push(parseFloat(number));
            }

            //与现金流支付相对应的支付日期表
            var dates = func_methods.getCellrangeDate(arguments[2]);
            if(valueIsError(dates)){
                return dates;
            }

            for(var i = 0; i < dates.length; i++){
                if(!dayjs(dates[i]).isValid()){
                    return formula.error.v;
                }
            }

            if(values_n.length != dates.length){
                return formula.error.nm;
            }

            //计算
            var result = 0;
            for (var i = 0; i < values_n.length; i++) {
                result += values_n[i] / Math.pow(1 + rate, window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CUMIPMT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //年金的现值
            var pv = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //首期
            var start_period = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(start_period)){
                return start_period;
            }

            if(!isRealNum(start_period)){
                return formula.error.v;
            }

            start_period = parseInt(start_period);

            //末期
            var end_period = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(end_period)){
                return end_period;
            }

            if(!isRealNum(end_period)){
                return formula.error.v;
            }

            end_period = parseInt(end_period);

            //指定各期的付款时间是在期初还是期末
            var type = func_methods.getFirstValue(arguments[5]);
            if(valueIsError(type)){
                return type;
            }

            if(!isRealNum(type)){
                return formula.error.v;
            }

            type = parseFloat(type);

            if(rate <= 0 || nper <= 0 || pv <= 0){
                return formula.error.nm;
            }

            if(start_period < 1 || end_period < 1 || start_period > end_period){
                return formula.error.nm;
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var payment = window.luckysheet_function.PMT.f(rate, nper, pv, 0, type);
            var interest = 0;

            if (start_period === 1) {
                if (type === 0) {
                    interest = -pv;
                    start_period++;
                }
            }

            for (var i = start_period; i <= end_period; i++) {
                if (type === 1) {
                    interest += window.luckysheet_function.FV.f(rate, i - 2, payment, pv, 1) - payment;
                }
                else {
                    interest += window.luckysheet_function.FV.f(rate, i - 1, payment, pv, 0);
                }
            }

            interest *= rate;

            return interest;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PMT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //贷款利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //该项贷款的付款总数
            var nper = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //现值
            var pv = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 4){
                fv = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length == 5){
                type = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var result;

            if (rate === 0) {
                result = (pv + fv) / nper;
            }
            else {
                var term = Math.pow(1 + rate, nper);

                if (type === 1) {
                    result = (fv * rate / (term - 1) + pv * rate / (1 - 1 / term)) / (1 + rate);
                }
                else {
                    result = fv * rate / (term - 1) + pv * rate / (1 - 1 / term);
                }
            }

            return -result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IPMT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //用于计算其利息数额的期数
            var per = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(per)){
                return per;
            }

            if(!isRealNum(per)){
                return formula.error.v;
            }

            per = parseFloat(per);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //现值
            var pv = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 5){
                fv = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 6){
                type = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(per < 1 || per > nper){
                return formula.error.nm;
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var payment = window.luckysheet_function.PMT.f(rate, nper, pv, fv, type);
            var interest;

            if (per === 1) {
                if (type === 1) {
                    interest = 0;
                }
                else {
                    interest = -pv;
                }
            }
            else {
                if (type === 1) {
                    interest = window.luckysheet_function.FV.f(rate, per - 2, payment, pv, 1) - payment;
                }
                else {
                    interest = window.luckysheet_function.FV.f(rate, per - 1, payment, pv, 0);
                }
            }

            var result = interest * rate;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PPMT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //用于计算其利息数额的期数
            var per = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(per)){
                return per;
            }

            if(!isRealNum(per)){
                return formula.error.v;
            }

            per = parseFloat(per);

            //总付款期数
            var nper = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(nper)){
                return nper;
            }

            if(!isRealNum(nper)){
                return formula.error.v;
            }

            nper = parseFloat(nper);

            //现值
            var pv = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 5){
                fv = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 6){
                type = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(per < 1 || per > nper){
                return formula.error.nm;
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var payment = window.luckysheet_function.PMT.f(rate, nper, pv, fv, type);
            var payment2 = window.luckysheet_function.IPMT.f(rate, per, nper, pv, fv, type);

            return payment - payment2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "INTRATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的投资额
            var investment = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(investment)){
                return investment;
            }

            if(!isRealNum(investment)){
                return formula.error.v;
            }

            investment = parseFloat(investment);

            //有价证券到期时的兑换值
            var redemption = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(investment <= 0 || redemption <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = 360 / ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        result = ylength / dayjs(maturity).diff(dayjs(settlement), 'days');
                        result = ((redemption - investment) / investment) * result;

                        return result;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    result = average / dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 2: // Actual/360
                    result = 360 / dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 3: // Actual/365
                    result = 365 / dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 4: // European 30/360
                    result = 360 / ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
            }

            result = ((redemption - investment) / investment) * result;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PRICE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var rate = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //有价证券的年收益率
            var yld = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(yld)){
                return yld;
            }

            if(!isRealNum(yld)){
                return formula.error.v;
            }

            yld = parseFloat(yld);

            //有价证券的清偿价值
            var redemption = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[5]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 7){
                basis = func_methods.getFirstValue(arguments[6]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(rate < 0 || yld < 0){
                return formula.error.nm;
            }

            if(redemption <= 0){
                return formula.error.nm;
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var DSC = window.luckysheet_function.COUPDAYSNC.f(settlement, maturity, frequency, basis);
            var E = window.luckysheet_function.COUPDAYS.f(settlement, maturity, frequency, basis);
            var A = window.luckysheet_function.COUPDAYBS.f(settlement, maturity, frequency, basis);
            var num = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);

            if(num > 1){
                var T1 = redemption / Math.pow(1 + yld / frequency, num - 1 + DSC / E);

                var T2 = 0;
                for(var i = 1; i <= num; i++){
                    T2 += (100 * rate / frequency) / Math.pow(1 + yld / frequency, i - 1 + DSC / E);
                }

                var T3 = 100 * (rate / frequency) * (A / E);

                var result = T1 + T2 - T3;
            }
            else{
                var DSR = E - A;
                var T1 = 100 * (rate / frequency) + redemption;
                var T2 = (yld / frequency) * (DSR / E) + 1;
                var T3 = 100 * (rate / frequency) * (A / E);

                var result = T1 / T2 - T3;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PRICEDISC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的贴现率
            var discount = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(discount)){
                return discount;
            }

            if(!isRealNum(discount)){
                return formula.error.v;
            }

            discount = parseFloat(discount);

            //有价证券的清偿价值
            var redemption = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(discount <= 0 || redemption <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    }
                    else if (sd === 31) {
                        sd = 30;
                    }
                    else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }

                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        result = dayjs(maturity).diff(dayjs(settlement), 'days') / ylength;
                        result = redemption - discount * redemption * result;

                        return result;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / average;

                    break;
                case 2: // Actual/360
                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / 360;

                    break;
                case 3: // Actual/365
                    result = dayjs(maturity).diff(dayjs(settlement), 'days') / 365;

                    break;
                case 4: // European 30/360
                    result = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;

                    break;
            }

            result = redemption - discount * redemption * result;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PRICEMAT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //发行日
            var issue = func_methods.getCellDate(arguments[2]);
            if(valueIsError(issue)){
                return issue;
            }

            if(!dayjs(issue).isValid()){
                return formula.error.v;
            }

            //有价证券在发行日的利率
            var rate = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //有价证券的年收益率
            var yld = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(yld)){
                return yld;
            }

            if(!isRealNum(yld)){
                return formula.error.v;
            }

            yld = parseFloat(yld);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 6){
                basis = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(rate < 0 || yld < 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();
            var td = dayjs(issue).date();
            var tm = dayjs(issue).month() + 1;
            var ty = dayjs(issue).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if(sd == 31){
                        sd = 30;
                    }

                    if(ed == 31){
                        ed = 30;
                    }

                    if(td == 31){
                        td = 30;
                    }

                    var B = 360;
                    var DSM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));
                    var DIM = ((ed + em * 30 + ey * 360) - (td + tm * 30 + ty * 360));
                    var A = ((sd + sm * 30 + sy * 360) - (td + tm * 30 + ty * 360));

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        var B = ylength;
                        var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');
                        var DIM = dayjs(settlement).diff(dayjs(issue), 'days');
                        var A = dayjs(maturity).diff(dayjs(issue), 'days');

                        result = (100 + (DIM / B * rate * 100)) / (1 + DSM / B * yld) - (A / B * rate * 100);

                        return result;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    var B = average;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).diff(dayjs(issue), 'days');
                    var A = dayjs(maturity).diff(dayjs(issue), 'days');

                    break;
                case 2: // Actual/360
                    var B = 360;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).diff(dayjs(issue), 'days');
                    var A = dayjs(maturity).diff(dayjs(issue), 'days');

                    break;
                case 3: // Actual/365
                    var B = 365;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).diff(dayjs(issue), 'days');
                    var A = dayjs(maturity).diff(dayjs(issue), 'days');

                    break;
                case 4: // European 30/360
                    var B = 360;
                    var DSM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));
                    var DIM = ((ed + em * 30 + ey * 360) - (td + tm * 30 + ty * 360));
                    var A = ((sd + sm * 30 + sy * 360) - (td + tm * 30 + ty * 360));

                    break;
            }

            result = (100 + (DIM / B * rate * 100)) / (1 + (DSM / B * yld)) - (A / B * rate * 100);

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RECEIVED": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的投资额
            var investment = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(investment)){
                return investment;
            }

            if(!isRealNum(investment)){
                return formula.error.v;
            }

            investment = parseFloat(investment);

            //有价证券的贴现率
            var discount = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(discount)){
                return discount;
            }

            if(!isRealNum(discount)){
                return formula.error.v;
            }

            discount = parseFloat(discount);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseFloat(basis);
            }

            if(investment <= 0 || discount <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if(sd == 31){
                        sd = 30;
                    }

                    if(ed == 31){
                        ed = 30;
                    }

                    var B = 360;
                    var DIM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        var B = ylength;
                        var DIM = dayjs(maturity).diff(dayjs(settlement), 'days');

                        result = investment / (1 - discount * DIM / B);

                        return result;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, 'date': 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    var B = average;
                    var DIM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 2: // Actual/360
                    var B = 360;
                    var DIM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 3: // Actual/365
                    var B = 365;
                    var DIM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 4: // European 30/360
                    var B = 360;
                    var DIM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
            }

            result = investment / (1 - discount * DIM / B);

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DISC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的价格
            var pr = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pr)){
                return pr;
            }

            if(!isRealNum(pr)){
                return formula.error.v;
            }

            pr = parseFloat(pr);

            //有价证券的清偿价值
            var redemption = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(redemption)){
                return redemption;
            }

            if(!isRealNum(redemption)){
                return formula.error.v;
            }

            redemption = parseFloat(redemption);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 5){
                basis = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseFloat(basis);
            }

            if(pr <= 0 || redemption <= 0){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            //计算
            var sd = dayjs(settlement).date();
            var sm = dayjs(settlement).month() + 1;
            var sy = dayjs(settlement).year();
            var ed = dayjs(maturity).date();
            var em = dayjs(maturity).month() + 1;
            var ey = dayjs(maturity).year();

            var result;
            switch (basis) {
                case 0: // US (NASD) 30/360
                    if(sd == 31){
                        sd = 30;
                    }

                    if(ed == 31){
                        ed = 30;
                    }

                    var B = 360;
                    var DSM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
                case 1: // Actual/actual
                    var ylength = 365;
                    if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
                        if ((sy === ey && func_methods.isLeapYear(sy)) || func_methods.feb29Between(settlement, maturity) || (em === 1 && ed === 29)) {
                            ylength = 366;
                        }

                        var B = ylength;
                        var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');

                        result = ((redemption - pr) / redemption) * (B / DSM);

                        return result;
                    }

                    var years = (ey - sy) + 1;
                    var days = (dayjs().set({ 'year': ey + 1, 'month': 0, 'date': 1 }) - dayjs().set({ 'year': sy, 'month': 0, "date": 1 })) / 1000 / 60 / 60 / 24;
                    var average = days / years;

                    var B = average;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 2: // Actual/360
                    var B = 360;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 3: // Actual/365
                    var B = 365;
                    var DSM = dayjs(maturity).diff(dayjs(settlement), 'days');

                    break;
                case 4: // European 30/360
                    var B = 360;
                    var DSM = ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360));

                    break;
            }

            result = ((redemption - pr) / redemption) * (B / DSM);

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NPER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //利率
            var rate = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rate)){
                return rate;
            }

            if(!isRealNum(rate)){
                return formula.error.v;
            }

            rate = parseFloat(rate);

            //各期所应支付的金额
            var pmt = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(pmt)){
                return pmt;
            }

            if(!isRealNum(pmt)){
                return formula.error.v;
            }

            pmt = parseFloat(pmt);

            //现值
            var pv = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(pv)){
                return pv;
            }

            if(!isRealNum(pv)){
                return formula.error.v;
            }

            pv = parseFloat(pv);

            //最后一次付款后希望得到的现金余额
            var fv = 0;
            if(arguments.length >= 4){
                fv = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(fv)){
                    return fv;
                }

                if(!isRealNum(fv)){
                    return formula.error.v;
                }

                fv = parseFloat(fv);
            }

            //指定各期的付款时间是在期初还是期末
            var type = 0;
            if(arguments.length >= 5){
                type = func_methods.getFirstValue(arguments[4]);
                if(valueIsError(type)){
                    return type;
                }

                if(!isRealNum(type)){
                    return formula.error.v;
                }

                type = parseFloat(type);
            }

            if(type != 0 && type != 1){
                return formula.error.nm;
            }

            //计算
            var num = pmt * (1 + rate * type) - fv * rate;
            var den = (pv * rate + pmt * (1 + rate * type));

            return Math.log(num / den) / Math.log(1 + rate);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SLN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //资产原值
            var cost = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(cost)){
                return cost;
            }

            if(!isRealNum(cost)){
                return formula.error.v;
            }

            cost = parseFloat(cost);

            //资产残值
            var salvage = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(salvage)){
                return salvage;
            }

            if(!isRealNum(salvage)){
                return formula.error.v;
            }

            salvage = parseFloat(salvage);

            //资产的折旧期数
            var life = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(life)){
                return life;
            }

            if(!isRealNum(life)){
                return formula.error.v;
            }

            life = parseFloat(life);

            if(life == 0){
                return formula.error.d;
            }

            return (cost - salvage) / life;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DURATION": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var coupon = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(coupon)){
                return coupon;
            }

            if(!isRealNum(coupon)){
                return formula.error.v;
            }

            coupon = parseFloat(coupon);

            //有价证券的年收益率
            var yld = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(yld)){
                return yld;
            }

            if(!isRealNum(yld)){
                return formula.error.v;
            }

            yld = parseFloat(yld);

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 6){
                basis = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(coupon < 0 || yld < 0){
                return formula.error.nm;
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            var nper = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);

            var sum1 = 0;
            var sum2 = 0;
            for(var i = 1; i <= nper; i++){
                sum1 += 100 * (coupon / frequency) * i / Math.pow(1 + (yld / frequency), i);
                sum2 += 100 * (coupon / frequency) / Math.pow(1 + (yld / frequency), i);
            }

            var result = (sum1 + 100 * nper / Math.pow(1 + (yld / frequency), nper)) / (sum2 + 100 / Math.pow(1 + (yld / frequency), nper));
            result = result / frequency;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MDURATION": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //结算日
            var settlement = func_methods.getCellDate(arguments[0]);
            if(valueIsError(settlement)){
                return settlement;
            }

            if(!dayjs(settlement).isValid()){
                return formula.error.v;
            }

            //到期日
            var maturity = func_methods.getCellDate(arguments[1]);
            if(valueIsError(maturity)){
                return maturity;
            }

            if(!dayjs(maturity).isValid()){
                return formula.error.v;
            }

            //有价证券的年息票利率
            var coupon = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(coupon)){
                return coupon;
            }

            if(!isRealNum(coupon)){
                return formula.error.v;
            }

            coupon = parseFloat(coupon);

            //有价证券的年收益率
            var yld = func_methods.getFirstValue(arguments[3]);
            if(valueIsError(yld)){
                return yld;
            }

            if(!isRealNum(yld)){
                return formula.error.v;
            }

            yld = parseFloat(yld);

            //年付息次数
            var frequency = func_methods.getFirstValue(arguments[4]);
            if(valueIsError(frequency)){
                return frequency;
            }

            if(!isRealNum(frequency)){
                return formula.error.v;
            }

            frequency = parseInt(frequency);

            //日计数基准类型
            var basis = 0;
            if(arguments.length == 6){
                basis = func_methods.getFirstValue(arguments[5]);
                if(valueIsError(basis)){
                    return basis;
                }

                if(!isRealNum(basis)){
                    return formula.error.v;
                }

                basis = parseInt(basis);
            }

            if(coupon < 0 || yld < 0){
                return formula.error.nm;
            }

            if(frequency != 1 && frequency != 2 && frequency != 4){
                return formula.error.nm;
            }

            if(basis < 0 || basis > 4){
                return formula.error.nm;
            }

            if(dayjs(settlement) - dayjs(maturity) >= 0){
                return formula.error.nm;
            }

            var duration = window.luckysheet_function.DURATION.f(settlement, maturity, coupon, yld, frequency, basis);

            return duration / (1 + yld / frequency);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BIN2DEC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //二进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!/^[01]{1,10}$/g.test(number)){
                return formula.error.nm;
            }

            //计算
            var result = parseInt(number, 2);
            var stringified = number.toString();

            if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
                return parseInt(stringified.substring(1), 2) - 512;
            }
            else {
                return result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BIN2HEX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //二进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if(!/^[01]{1,10}$/g.test(number)){
                return formula.error.nm;
            }

            //计算
            var result = parseInt(number, 2).toString(16).toUpperCase();

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BIN2OCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //二进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if(!/^[01]{1,10}$/g.test(number)){
                return formula.error.nm;
            }

            //计算
            var stringified = number.toString();
            if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
                return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
            }

            var result = parseInt(number, 2).toString(8);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DEC2BIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
                return formula.error.nm;
            }

            //计算
            if (number < 0) {
                return '1' + new Array(9 - (512 + number).toString(2).length).join('0') + (512 + number).toString(2);
            }

            var result = parseInt(number, 10).toString(2);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DEC2HEX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
                return formula.error.nm;
            }

            //计算
            if (number < 0) {
                return (1099511627776 + number).toString(16).toUpperCase();
            }

            var result = parseInt(number, 10).toString(16).toUpperCase();

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DEC2OCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
                return formula.error.nm;
            }

            //计算
            if (number < 0) {
                return (1073741824 + number).toString(8);
            }

            var result = parseInt(number, 10).toString(8);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HEX2BIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十六进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

            var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

            if (decimal < -512 || decimal > 511) {
                return formula.error.nm;
            }

            if (negative) {
                return '1' + new Array(9 - (512 + decimal).toString(2).length).join('0') + (512 + decimal).toString(2);
            }

            var result = decimal.toString(2);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HEX2DEC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十六进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            var decimal = parseInt(number, 16);

            return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "HEX2OCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //十六进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            var decimal = parseInt(number, 16);

            if (decimal > 536870911 && decimal < 1098974756864) {
                return formula.error.nm;
            }

            if (decimal >= 1098974756864) {
                return (decimal - 1098437885952).toString(8);
            }

            var result = decimal.toString(8);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "OCT2BIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //八进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^[0-7]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            number = number.toString();

            var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

            var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

            if (decimal < -512 || decimal > 511) {
                return error.num;
            }

            if (negative) {
                return '1' + new Array(9 - (512 + decimal).toString(2).length).join('0') + (512 + decimal).toString(2);
            }

            var result = decimal.toString(2);

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "OCT2DEC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //八进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if (!/^[0-7]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            var decimal = parseInt(number, 8);

            return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "OCT2HEX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //八进制数
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            //有效位数
            var places = null;
            if(arguments.length == 2){
                places = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(places)){
                    return places;
                }

                if(!isRealNum(places)){
                    return formula.error.v;
                }

                places = parseInt(places);
            }

            if (!/^[0-7]{1,10}$/.test(number)) {
                return formula.error.nm;
            }

            //计算
            var decimal = parseInt(number, 8);

            if (decimal >= 536870912) {
                return 'FF' + (decimal + 3221225472).toString(16).toUpperCase();
            }

            var result = decimal.toString(16).toUpperCase();

            if (places == null) {
                return result;
            }
            else {
                if(places < 0 || places < result.length){
                    return formula.error.nm;
                }

                return new Array(places - result.length + 1).join('0') + result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COMPLEX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //复数的实系数
            var real_num = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(real_num)){
                return real_num;
            }

            if(!isRealNum(real_num)){
                return formula.error.v;
            }

            real_num = parseFloat(real_num);

            //复数的虚系数
            var i_num = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(i_num)){
                return i_num;
            }

            if(!isRealNum(i_num)){
                return formula.error.v;
            }

            i_num = parseFloat(i_num);

            //复数中虚系数的后缀
            var suffix = "i";
            if(arguments.length == 3){
                suffix = arguments[2].toString();
            }

            if(suffix != "i" && suffix != "j"){
                return formula.error.v;
            }

            //计算
            if (real_num === 0 && i_num === 0) {
                return 0;
            }
            else if (real_num === 0) {
                return (i_num === 1) ? suffix : i_num.toString() + suffix;
            }
            else if (i_num === 0) {
                return real_num.toString();
            }
            else {
                var sign = (i_num > 0) ? '+' : '';
                return real_num.toString() + sign + ((i_num === 1) ? suffix : i_num.toString() + suffix);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMREAL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //复数
            var inumber = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(inumber)){
                return inumber;
            }

            inumber = inumber.toString();

            if(inumber.toLowerCase() == "true" || inumber.toLowerCase() == "false"){
                return formula.error.v;
            }

            //计算
            if(inumber == "0"){
                return 0;
            }

            if(['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0){
                return 0;
            }

            var plus = inumber.indexOf('+');
            var minus = inumber.indexOf('-');

            if (plus === 0) {
                plus = inumber.indexOf('+', 1);
            }

            if (minus === 0) {
                minus = inumber.indexOf('-', 1);
            }

            var last = inumber.substring(inumber.length - 1, inumber.length);
            var unit = (last === 'i' || last === 'j');

            if (plus >= 0 || minus >= 0) {
                if (!unit) {
                    return formula.error.nm;
                }

                if (plus >= 0) {
                    return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ? formula.error.nm : Number(inumber.substring(0, plus));
                }
                else {
                    return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ? formula.error.nm : Number(inumber.substring(0, minus));
                }
            }
            else {
                if (unit) {
                    return (isNaN(inumber.substring(0, inumber.length - 1))) ? formula.error.nm : 0;
                }
                else {
                    return (isNaN(inumber)) ? formula.error.nm : inumber;
                }
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMAGINARY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //复数
            var inumber = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(inumber)){
                return inumber;
            }

            inumber = inumber.toString();

            if(inumber.toLowerCase() == "true" || inumber.toLowerCase() == "false"){
                return formula.error.v;
            }

            //计算
            if(inumber == "0"){
                return 0;
            }

            if (['i', 'j'].indexOf(inumber) >= 0) {
                return 1;
            }

            inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

            var plus = inumber.indexOf('+');
            var minus = inumber.indexOf('-');

            if (plus === 0) {
                plus = inumber.indexOf('+', 1);
            }

            if (minus === 0) {
                minus = inumber.indexOf('-', 1);
            }

            var last = inumber.substring(inumber.length - 1, inumber.length);
            var unit = (last === 'i' || last === 'j');

            if (plus >= 0 || minus >= 0) {
                if (!unit) {
                    return formula.error.nm;
                }

                if (plus >= 0) {
                    return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ? formula.error.nm : Number(inumber.substring(plus + 1, inumber.length - 1));
                }
                else {
                    return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ? formula.error.nm : -Number(inumber.substring(minus + 1, inumber.length - 1));
                }
            }
            else {
                if (unit) {
                    return (isNaN(inumber.substring(0, inumber.length - 1))) ? formula.error.nm : inumber.substring(0, inumber.length - 1);
                }
                else {
                    return (isNaN(inumber)) ? formula.error.nm : 0;
                }
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMCONJUGATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //复数
            var inumber = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(inumber)){
                return inumber;
            }

            inumber = inumber.toString();

            var x = window.luckysheet_function.IMREAL.f(inumber);
            if(valueIsError(x)){
                return x;
            }

            var y = window.luckysheet_function.IMAGINARY.f(inumber);
            if(valueIsError(y)){
                return y;
            }

            var unit = inumber.substring(inumber.length - 1);
            unit = (unit === 'i' || unit === 'j') ? unit : 'i';

            return (y !== 0) ? window.luckysheet_function.COMPLEX.f(x, -y, unit) : inumber;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMABS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var x = window.luckysheet_function.IMREAL.f(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
            if(valueIsError(y)){
                return y;
            }

            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DELTA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数字
            var number1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number1)){
                return number1;
            }

            if(!isRealNum(number1)){
                return formula.error.v;
            }

            number1 = parseFloat(number1);

            //第二个数字
            var number2 = 0;
            if(arguments.length == 2){
                number2 = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(number2)){
                    return number2;
                }

                if(!isRealNum(number2)){
                    return formula.error.v;
                }

                number2 = parseFloat(number2);
            }

            return (number1 === number2) ? 1 : 0;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMSUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var x = window.luckysheet_function.IMREAL.f(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
            if(valueIsError(y)){
                return y;
            }

            var result = arguments[0];

            for(var i = 1; i < arguments.length; i++){
                var a = window.luckysheet_function.IMREAL.f(result);
                if(valueIsError(a)){
                    return a;
                }

                var b = window.luckysheet_function.IMAGINARY.f(result);
                if(valueIsError(b)){
                    return b;
                }

                var c = window.luckysheet_function.IMREAL.f(arguments[i]);
                if(valueIsError(c)){
                    return c;
                }

                var d = window.luckysheet_function.IMAGINARY.f(arguments[i]);
                if(valueIsError(d)){
                    return d;
                }

                result = window.luckysheet_function.COMPLEX.f(a + c, b + d);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMSUB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //inumber1
            var inumber1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(inumber1)){
                return inumber1;
            }

            inumber1 = inumber1.toString();

            if(inumber1.toLowerCase() == "true" || inumber1.toLowerCase() == "false"){
                return formula.error.v;
            }

            var a = window.luckysheet_function.IMREAL.f(inumber1);
            if(valueIsError(a)){
                return a;
            }

            var b = window.luckysheet_function.IMAGINARY.f(inumber1);
            if(valueIsError(b)){
                return b;
            }

            //inumber2
            var inumber2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(inumber2)){
                return inumber2;
            }

            inumber2 = inumber2.toString();

            if(inumber2.toLowerCase() == "true" || inumber2.toLowerCase() == "false"){
                return formula.error.v;
            }

            var c = window.luckysheet_function.IMREAL.f(inumber2);
            if(valueIsError(c)){
                return c;
            }

            var d = window.luckysheet_function.IMAGINARY.f(inumber2);
            if(valueIsError(d)){
                return d;
            }

            //计算
            var unit1 = inumber1.substring(inumber1.length - 1);
            var unit2 = inumber2.substring(inumber2.length - 1);

            var unit = 'i';

            if (unit1 === 'j') {
                unit = 'j';
            }
            else if (unit2 === 'j') {
                unit = 'j';
            }

            return window.luckysheet_function.COMPLEX.f(a - c, b - d, unit);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMPRODUCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var x = window.luckysheet_function.IMREAL.f(arguments[0]);
            if(valueIsError(x)){
                return x;
            }

            var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
            if(valueIsError(y)){
                return y;
            }

            var result = arguments[0];

            for(var i = 1; i < arguments.length; i++){
                var a = window.luckysheet_function.IMREAL.f(result);
                if(valueIsError(a)){
                    return a;
                }

                var b = window.luckysheet_function.IMAGINARY.f(result);
                if(valueIsError(b)){
                    return b;
                }

                var c = window.luckysheet_function.IMREAL.f(arguments[i]);
                if(valueIsError(c)){
                    return c;
                }

                var d = window.luckysheet_function.IMAGINARY.f(arguments[i]);
                if(valueIsError(d)){
                    return d;
                }

                result = window.luckysheet_function.COMPLEX.f(a * c - b * d, a * d + b * c);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IMDIV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //inumber1
            var inumber1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(inumber1)){
                return inumber1;
            }

            inumber1 = inumber1.toString();

            if(inumber1.toLowerCase() == "true" || inumber1.toLowerCase() == "false"){
                return formula.error.v;
            }

            var a = window.luckysheet_function.IMREAL.f(inumber1);
            if(valueIsError(a)){
                return a;
            }

            var b = window.luckysheet_function.IMAGINARY.f(inumber1);
            if(valueIsError(b)){
                return b;
            }

            //inumber2
            var inumber2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(inumber2)){
                return inumber2;
            }

            inumber2 = inumber2.toString();

            if(inumber2.toLowerCase() == "true" || inumber2.toLowerCase() == "false"){
                return formula.error.v;
            }

            var c = window.luckysheet_function.IMREAL.f(inumber2);
            if(valueIsError(c)){
                return c;
            }

            var d = window.luckysheet_function.IMAGINARY.f(inumber2);
            if(valueIsError(d)){
                return d;
            }

            //计算
            var unit1 = inumber1.substring(inumber1.length - 1);
            var unit2 = inumber2.substring(inumber2.length - 1);

            var unit = 'i';

            if (unit1 === 'j') {
                unit = 'j';
            }
            else if (unit2 === 'j') {
                unit = 'j';
            }

            if (c === 0 && d === 0) {
                return formula.error.nm;
            }

            var den = c * c + d * d;

            return window.luckysheet_function.COMPLEX.f((a * c + b * d) / den, (b * c - a * d) / den, unit);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NOT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //logical
            var logical = func_methods.getCellBoolen(arguments[0]);

            if(valueIsError(logical)){
                return logical;
            }

            return !logical;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return true;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FALSE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return false;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var result = true;

            for(var i = 0; i < arguments.length; i++){
                var logical = func_methods.getCellBoolen(arguments[i]);

                if(valueIsError(logical)){
                    return logical;
                }

                if(!logical){
                    result = false;
                    break;
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IFERROR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var value_if_error = func_methods.getFirstValue(arguments[1], "text");

            var value = func_methods.getFirstValue(arguments[0], "text");
            // (getObjType(value) === 'string' && $.trim(value) === ''It means that the cell associated with IFERROR has been deleted by keyboard
            if(valueIsError(value) || (getObjType(value) === 'string' && $.trim(value) === '' )){
                return value_if_error;
            }

            return value;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "IF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要测试的条件
            var logical_test = func_methods.getCellBoolen(arguments[0]);
            if(valueIsError(logical_test)){
                return logical_test;
            }

            //结果为 TRUE
            var value_if_true = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(value_if_true) && value_if_false!=error.d){
                return value_if_true;
            }

            //结果为 FALSE
            var value_if_false = "";
            if(arguments.length == 3){
                value_if_false = func_methods.getFirstValue(arguments[2], "text");
                if(valueIsError(value_if_false) && value_if_false!=error.d){
                    return value_if_false;
                }
            }

            if(logical_test){
                return value_if_true;
            }
            else{
                return value_if_false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "OR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var result = false;

            for(var i = 0; i < arguments.length; i++){
                var logical = func_methods.getCellBoolen(arguments[i]);

                if(valueIsError(logical)){
                    return logical;
                }

                if(logical){
                    result = true;
                    break;
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            return value1 != value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EQ": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            return value1 == value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 > value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GTE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 >= value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 < value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LTE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 <= value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ADD": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 + value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MINUS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 - value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MULTIPLY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            return value1 * value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DIVIDE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value1)){
                return value1;
            }

            if(!isRealNum(value1)){
                return formula.error.v;
            }

            value1 = parseFloat(value1);

            //value2
            var value2 = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(value2)){
                return value2;
            }

            if(!isRealNum(value2)){
                return formula.error.v;
            }

            value2 = parseFloat(value2);

            if(value2 == 0){
                return formula.error.d;
            }

            return value1 / value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CONCAT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //value1
            var value1 = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(value1)){
                return value1;
            }

            //value2
            var value2 = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(value2)){
                return value2;
            }

            return value1 + "" + value2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "UNARY_PERCENT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要作为百分比解释的数值
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            var result = number / 100;

            return Math.round(result * 100) / 100;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CONCATENATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var result = "";

            for(var i = 0; i < arguments.length; i++){
                var text = func_methods.getFirstValue(arguments[i], "text");
                if(valueIsError(text)){
                    return text;
                }

                result = result + "" + text;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CODE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            if(text == ""){
                return formula.error.v;
            }

            return text.charCodeAt(0);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CHAR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            if(number < 1 || number > 255){
                return formula.error.v;
            }

            return String.fromCharCode(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ARABIC": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString().toUpperCase();

            if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
                return formula.error.v;
            }

            var r = 0;
            text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
                r += {
                    M: 1000,
                    CM: 900,
                    D: 500,
                    CD: 400,
                    C: 100,
                    XC: 90,
                    L: 50,
                    XL: 40,
                    X: 10,
                    IX: 9,
                    V: 5,
                    IV: 4,
                    I: 1
                }[i];
            });

            return r;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ROMAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseInt(number);

            if(number == 0){
                return "";
            }
            else if(number < 1 || number > 3999){
                return formula.error.v;
            }

            //计算
            function convert(num) {
                var a=[
                    ["","I","II","III","IV","V","VI","VII","VIII","IX"],
                    ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
                    ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
                    ["","M","MM","MMM"]
                ];

                var i = a[3][Math.floor(num / 1000)];
                var j = a[2][Math.floor(num % 1000 / 100)];
                var k = a[1][Math.floor(num % 100 / 10)];
                var l = a[0][num % 10];

                return  i + j + k + l;
            }

            return convert(number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REGEXEXTRACT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //输入文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //表达式
            var regular_expression = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(regular_expression)){
                return regular_expression;
            }

            var match = text.match(new RegExp(regular_expression));
            return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REGEXMATCH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //输入文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //表达式
            var regular_expression = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(regular_expression)){
                return regular_expression;
            }

            var match = text.match(new RegExp(regular_expression));
            return match ? true : false;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REGEXREPLACE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //输入文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            //表达式
            var regular_expression = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(regular_expression)){
                return regular_expression;
            }

            //插入文本
            var replacement = func_methods.getFirstValue(arguments[2], "text");
            if(valueIsError(replacement)){
                return replacement;
            }

            return text.replace(new RegExp(regular_expression), replacement);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "T": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //文本
            var value = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(value)){
                return value;
            }

            return getObjType(value) == "string" ? value : '';
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FIXED": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要进行舍入并转换为文本的数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //小数位数
            var decimals = 2;
            if(arguments.length >= 2){
                decimals = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(decimals)){
                    return decimals;
                }

                if(!isRealNum(decimals)){
                    return formula.error.v;
                }

                decimals = parseInt(decimals);
            }

            //逻辑值
            var no_commas = false;
            if(arguments.length == 3){
                no_commas = func_methods.getCellBoolen(arguments[2]);

                if(valueIsError(no_commas)){
                    return no_commas;
                }
            }

            if(decimals > 127){
                return formula.error.v;
            }

            //计算
            var format = no_commas ? '0' : '#,##0';

            if (decimals <= 0) {
                number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }
            else if (decimals > 0) {
                format += '.' + new Array(decimals + 1).join('0');
            }

            return update(format, number);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FIND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要查找的文本
            var find_text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(find_text)){
                return find_text;
            }

            find_text = find_text.toString();

            //包含要查找文本的文本
            var within_text = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(within_text)){
                return within_text;
            }

            within_text = within_text.toString();

            //指定开始进行查找的字符
            var start_num = 1;
            if(arguments.length == 3){
                start_num = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(start_num)){
                    return start_num;
                }

                if(!isRealNum(start_num)){
                    return formula.error.v;
                }

                start_num = parseFloat(start_num);
            }

            if(start_num < 0 || start_num > within_text.length){
                return formula.error.v;
            }

            if(find_text == ""){
                return start_num;
            }

            if(within_text.indexOf(find_text) == -1){
                return formula.error.v;
            }

            var result = within_text.indexOf(find_text, start_num - 1) + 1;

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FINDB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要查找的文本
            var find_text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(find_text)){
                return find_text;
            }

            find_text = find_text.toString();

            //包含要查找文本的文本
            var within_text = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(within_text)){
                return within_text;
            }

            within_text = within_text.toString();

            //指定开始进行查找的字符
            var start_num = 1;
            if(arguments.length == 3){
                start_num = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(start_num)){
                    return start_num;
                }

                if(!isRealNum(start_num)){
                    return formula.error.v;
                }

                start_num = parseFloat(start_num);
            }

            if(start_num < 0 || start_num > within_text.length){
                return formula.error.v;
            }

            if(find_text == ""){
                return start_num;
            }

            if(within_text.indexOf(find_text) == -1){
                return formula.error.v;
            }

            var strArr = within_text.split("");
            var index = within_text.indexOf(find_text, start_num - 1);

            var result = 0;
            for(var i = 0; i < index; i++){
                if(/[^\x00-\xff]/g.test(strArr[i])){
                    result += 2;
                }
                else{
                    result += 1;
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "JOIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //定界符
            var separator = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(separator)){
                return separator;
            }

            //值或数组
            var dataArr = [];

            for(var i = 1; i < arguments.length; i++){
                var data = arguments[i];

                if(getObjType(data) == "array"){
                    if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                        return formula.error.v;
                    }

                    dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                }
                else if(getObjType(data) == "object" && data.startCell != null){
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data, "text", false));
                }
                else{
                    dataArr.push(data);
                }
            }

            return dataArr.join(separator);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LEFT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含要提取���字符的文本字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            //提取的字符的数量
            var num_chars = 1;
            if(arguments.length == 2){
                num_chars = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(num_chars)){
                    return num_chars;
                }

                if(!isRealNum(num_chars)){
                    return formula.error.v;
                }

                num_chars = parseInt(num_chars);
            }

            if(num_chars < 0){
                return formula.error.v;
            }

            //计算
            if(num_chars >= text.length){
                return text;
            }
            else if(num_chars == 0){
                return "";
            }
            else{
                return text.substr(0, num_chars);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RIGHT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含要提取的字符的文本字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            //提取的字符的数量
            var num_chars = 1;
            if(arguments.length == 2){
                num_chars = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(num_chars)){
                    return num_chars;
                }

                if(!isRealNum(num_chars)){
                    return formula.error.v;
                }

                num_chars = parseInt(num_chars);
            }

            if(num_chars < 0){
                return formula.error.v;
            }

            //计算
            if(num_chars >= text.length){
                return text;
            }
            else if(num_chars == 0){
                return "";
            }
            else{
                return text.substr(-num_chars, num_chars);
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MID": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //包含要提取的字符的文本字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            //开始提取的位置
            var start_num = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(start_num)){
                return start_num;
            }

            if(!isRealNum(start_num)){
                return formula.error.v;
            }

            start_num = parseInt(start_num);

            //提取的字符的数量
            var num_chars = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(num_chars)){
                return num_chars;
            }

            if(!isRealNum(num_chars)){
                return formula.error.v;
            }

            num_chars = parseInt(num_chars);

            if(start_num < 1 || num_chars < 0){
                return formula.error.v;
            }

            //计算
            if(start_num > text.length){
                return "";
            }

            if(start_num + num_chars > text.length){
                return text.substr(start_num - 1, text.length - start_num + 1);
            }

            return text.substr(start_num - 1, num_chars);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LEN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return text.length;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LENB": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return text.replace(/[^\x00-\xff]/g, "aa").length;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOWER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return text ? text.toLowerCase() : text;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "UPPER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return text ? text.toUpperCase() : text;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EXACT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串1
            var text1 = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text1)){
                return text1;
            }

            text1 = text1.toString();

            //字符串2
            var text2 = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(text2)){
                return text2;
            }

            text2 = text2.toString();

            return text1 === text2;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REPLACE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串1
            var old_text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(old_text)){
                return old_text;
            }

            old_text = old_text.toString();

            //进行替换操作的位置
            var start_num = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(start_num)){
                return start_num;
            }

            if(!isRealNum(start_num)){
                return formula.error.v;
            }

            start_num = parseInt(start_num);

            //要在文本中替换的字符个数
            var num_chars = func_methods.getFirstValue(arguments[2]);
            if(valueIsError(num_chars)){
                return num_chars;
            }

            if(!isRealNum(num_chars)){
                return formula.error.v;
            }

            num_chars = parseInt(num_chars);

            //字符串2
            var new_text = func_methods.getFirstValue(arguments[3], "text");
            if(valueIsError(new_text)){
                return new_text;
            }

            new_text = new_text.toString();

            return old_text.substr(0, start_num - 1) + new_text + old_text.substr(start_num - 1 + num_chars);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REPT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串1
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            //重复次数
            var number_times = func_methods.getFirstValue(arguments[1]);
            if(valueIsError(number_times)){
                return number_times;
            }

            if(!isRealNum(number_times)){
                return formula.error.v;
            }

            number_times = parseInt(number_times);

            if(number_times < 0){
                return formula.error.v;
            }

            if(number_times > 100){
                number_times = 100;
            }

            return new Array(number_times + 1).join(text);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SEARCH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串1
            var find_text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(find_text)){
                return find_text;
            }

            find_text = find_text.toString();

            //字符串2
            var within_text = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(within_text)){
                return within_text;
            }

            within_text = within_text.toString();

            //开始位置
            var start_num = 1;
            if(arguments.length == 3){
                start_num = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(start_num)){
                    return start_num;
                }

                if(!isRealNum(start_num)){
                    return formula.error.v;
                }

                start_num = parseInt(start_num);
            }

            if(start_num <= 0 || start_num > within_text.length){
                return formula.error.v;
            }

            var foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), start_num - 1) + 1;

            return (foundAt === 0) ? formula.error.v : foundAt;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUBSTITUTE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //需要替换其中字符的文本
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            //需要替换的文本
            var old_text = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(old_text)){
                return old_text;
            }

            old_text = old_text.toString();

            //用于替换 old_text 的文本
            var new_text = func_methods.getFirstValue(arguments[2], "text");
            if(valueIsError(new_text)){
                return new_text;
            }

            new_text = new_text.toString();

            //instance_num
            var instance_num = null;
            if(arguments.length == 4){
                instance_num = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(instance_num)){
                    return instance_num;
                }

                if(!isRealNum(instance_num)){
                    return formula.error.v;
                }

                instance_num = parseInt(instance_num);
            }

            //计算
            var reg = new RegExp(old_text, "g");

            var result;

            if(instance_num == null){
                result = text.replace(reg, new_text);
            }
            else{
                if(instance_num <= 0){
                    return formula.error.v;
                }

                var match = text.match(reg);

                if(match == null || instance_num > match.length){
                    return text;
                }
                else{
                    var len = old_text.length;
                    var index = 0;

                    for(var i = 1; i <= instance_num; i++){
                        index = text.indexOf(old_text, index) + 1;
                    }

                    result = text.substring(0, index - 1) + new_text + text.substring(index - 1 + len);
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CLEAN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            var textArr = [];
            for(var i = 0; i < text.length; i++){
                var code = text.charCodeAt(i);

                if(/[\u4e00-\u9fa5]/g.test(text.charAt(i)) || (code > 31 && code < 127)){
                    textArr.push(text.charAt(i));
                }
            }

            return textArr.join("");
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TEXT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var value = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value)){
                return value;
            }

            if(!isRealNum(value)){
                return formula.error.v;
            }

            value = parseFloat(value);

            //格式
            var format_text = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(format_text)){
                return format_text;
            }

            format_text = format_text.toString();

            return update(format_text, value);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRIM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return text.replace(/ +/g, ' ').trim();
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "VALUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString();

            return genarate(text)[2];
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PROPER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //字符串
            var text = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(text)){
                return text;
            }

            text = text.toString().toLowerCase();

            return text.replace(/[a-zA-Z]+/g, function(word){ return word.substring(0,1).toUpperCase() + word.substring(1); })
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CONVERT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var number = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(number)){
                return number;
            }

            if(!isRealNum(number)){
                return formula.error.v;
            }

            number = parseFloat(number);

            //数值的单位
            var from_unit = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(from_unit)){
                return from_unit;
            }

            from_unit = from_unit.toString();

            //结果的单位
            var to_unit = func_methods.getFirstValue(arguments[2], "text");
            if(valueIsError(to_unit)){
                return to_unit;
            }

            to_unit = to_unit.toString();

            //计算
            var units = [
                ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
                ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
                ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
                ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
                ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
                ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
                ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
                ["ampere", "A", null, "electric_current", true, false, 1],
                ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
                ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
                ["are", "ar", null, "area", false, true, 100],
                ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
                ["bar", "bar", null, "pressure", false, false, 100000],
                ["barn", "b", null, "area", false, false, 1e-28],
                ["becquerel", "Bq", null, "radioactivity", true, false, 1],
                ["bit", "bit", ["b"], "information", false, true, 1],
                ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
                ["byte", "byte", null, "information", false, true, 8],
                ["candela", "cd", null, "luminous_intensity", true, false, 1],
                ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
                ["coulomb", "C", null, "electric_charge", true, false, 1],
                ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
                ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
                ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
                ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
                ["cubic metre", "m?", null, "volume", true, true, 1],
                ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
                ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
                ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
                ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
                ["cup", "cup", null, "volume", false, true, 0.0002365882365],
                ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
                ["day", "d", ["day"], "time", false, true, 86400],
                ["degree", "°", null, "angle", false, false, 0.0174532925199433],
                ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
                ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
                ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
                ["ell", "ell", null, "length", false, true, 1.143],
                ["erg", "erg", ["e"], "energy", false, true, 1e-7],
                ["farad", "F", null, "electric_capacitance", true, false, 1],
                ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
                ["foot", "ft", null, "length", false, true, 0.3048],
                ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
                ["gal", "Gal", null, "acceleration", false, false, 0.01],
                ["gallon", "gal", null, "volume", false, true, 0.003785411784],
                ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
                ["grain", "grain", null, "mass", false, true, 0.0000647989],
                ["gram", "g", null, "mass", false, true, 0.001],
                ["gray", "Gy", null, "absorbed_dose", true, false, 1],
                ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
                ["hectare", "ha", null, "area", false, true, 10000],
                ["henry", "H", null, "inductance", true, false, 1],
                ["hertz", "Hz", null, "frequency", true, false, 1],
                ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
                ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
                ["hour", "h", ["hr"], "time", false, true, 3600],
                ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
                ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
                ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
                ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
                ["inch", "in", null, "length", false, true, 0.0254],
                ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
                ["IT calorie", "cal", null, "energy", false, true, 4.1868],
                ["joule", "J", null, "energy", true, true, 1],
                ["katal", "kat", null, "catalytic_activity", true, false, 1],
                ["kelvin", "K", ["kel"], "temperature", true, true, 1],
                ["kilogram", "kg", null, "mass", true, true, 1],
                ["knot", "kn", null, "speed", false, true, 0.514444444444444],
                ["light-year", "ly", null, "length", false, true, 9460730472580800],
                ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
                ["lumen", "lm", null, "luminous_flux", true, false, 1],
                ["lux", "lx", null, "illuminance", true, false, 1],
                ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
                ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
                ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
                ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
                ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
                ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
                ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
                ["metre", "m", null, "length", true, true, 1],
                ["miles per hour", "mph", null, "speed", false, true, 0.44704],
                ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
                ["minute", "?", null, "angle", false, false, 0.000290888208665722],
                ["minute", "min", ["mn"], "time", false, true, 60],
                ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
                ["mole", "mol", null, "amount_of_substance", true, false, 1],
                ["morgen", "Morgen", null, "area", false, true, 2500],
                ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
                ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
                ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
                ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
                ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
                ["newton", "N", null, "force", true, true, 1],
                ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
                ["ohm", "Ω", null, "electric_resistance", true, false, 1],
                ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
                ["pascal", "Pa", null, "pressure", true, false, 1],
                ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
                ["pferdestärke", "PS", null, "power", false, true, 735.49875],
                ["phot", "ph", null, "illuminance", false, false, 0.0001],
                ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
                ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
                ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
                ["pond", "pond", null, "force", false, true, 0.00980665],
                ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
                ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
                ["quart", "qt", null, "volume", false, true, 0.000946352946],
                ["radian", "rad", null, "angle", true, false, 1],
                ["second", "?", null, "angle", false, false, 0.00000484813681109536],
                ["second", "s", ["sec"], "time", true, true, 1],
                ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
                ["siemens", "S", null, "electrical_conductance", true, false, 1],
                ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
                ["slug", "sg", null, "mass", false, true, 14.59390294],
                ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
                ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
                ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
                ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
                ["square meter", "m?", null, "area", true, true, 1],
                ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
                ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
                ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
                ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
                ["statute mile", "mi", null, "length", false, true, 1609.344],
                ["steradian", "sr", null, "solid_angle", true, false, 1],
                ["stilb", "sb", null, "luminance", false, false, 0.0001],
                ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
                ["stone", "stone", null, "mass", false, true, 6.35029318],
                ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
                ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
                ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
                ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
                ["ton", "ton", null, "mass", false, true, 907.18474],
                ["tonne", "t", null, "mass", false, false, 1000],
                ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
                ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
                ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
                ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
                ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
                ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
                ["volt", "V", null, "voltage", true, false, 1],
                ["watt", "W", null, "power", true, true, 1],
                ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
                ["weber", "Wb", null, "magnetic_flux", true, false, 1],
                ["yard", "yd", null, "length", false, true, 0.9144],
                ["year", "yr", null, "time", false, true, 31557600]
            ];

            var binary_prefixes = {
                Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
                Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
                Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
                Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
                Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
                Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
                Mi: ["mebi", 20, 1048576, "Mi", "mega"],
                ki: ["kibi", 10, 1024, "ki", "kilo"]
            };

            var unit_prefixes = {
                Y: ["yotta", 1e+24, "Y"],
                Z: ["zetta", 1e+21, "Z"],
                E: ["exa", 1e+18, "E"],
                P: ["peta", 1e+15, "P"],
                T: ["tera", 1e+12, "T"],
                G: ["giga", 1e+09, "G"],
                M: ["mega", 1e+06, "M"],
                k: ["kilo", 1e+03, "k"],
                h: ["hecto", 1e+02, "h"],
                e: ["dekao", 1e+01, "e"],
                d: ["deci", 1e-01, "d"],
                c: ["centi", 1e-02, "c"],
                m: ["milli", 1e-03, "m"],
                u: ["micro", 1e-06, "u"],
                n: ["nano", 1e-09, "n"],
                p: ["pico", 1e-12, "p"],
                f: ["femto", 1e-15, "f"],
                a: ["atto", 1e-18, "a"],
                z: ["zepto", 1e-21, "z"],
                y: ["yocto", 1e-24, "y"]
            };

            var from = null;
            var to = null;
            var base_from_unit = from_unit;
            var base_to_unit = to_unit;
            var from_multiplier = 1;
            var to_multiplier = 1;
            var alt;

            for (var i = 0; i < units.length; i++) {
                alt = (units[i][2] === null) ? [] : units[i][2];

                if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                    from = units[i];
                }

                if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                    to = units[i];
                }
            }

            if (from === null) {
                var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
                var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

                if (from_unit.substring(0, 2) === 'da') {
                    from_unit_prefix = ["dekao", 1e+01, "da"];
                }

                if (from_binary_prefix) {
                    from_multiplier = from_binary_prefix[2];
                    base_from_unit = from_unit.substring(2);
                }
                else if (from_unit_prefix) {
                    from_multiplier = from_unit_prefix[1];
                    base_from_unit = from_unit.substring(from_unit_prefix[2].length);
                }

                for (var j = 0; j < units.length; j++) {
                    alt = (units[j][2] === null) ? [] : units[j][2];

                    if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                        from = units[j];
                    }
                }
            }

            if (to === null) {
                var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
                var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

                if (to_unit.substring(0, 2) === 'da') {
                    to_unit_prefix = ["dekao", 1e+01, "da"];
                }

                if (to_binary_prefix) {
                    to_multiplier = to_binary_prefix[2];
                    base_to_unit = to_unit.substring(2);
                }
                else if (to_unit_prefix) {
                    to_multiplier = to_unit_prefix[1];
                    base_to_unit = to_unit.substring(to_unit_prefix[2].length);
                }

                for (var k = 0; k < units.length; k++) {
                    alt = (units[k][2] === null) ? [] : units[k][2];

                    if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                        to = units[k];
                    }
                }
            }

            if (from === null || to === null) {
                return formula.error.na;
            }

            if (from[3] !== to[3]) {
                return formula.error.na;
            }

            return number * from[6] * from_multiplier / (to[6] * to_multiplier);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMX2MY2": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数组或数值区域
            var data_array_x = arguments[0];
            var array_x = [];

            if(getObjType(data_array_x) == "array"){
                if(getObjType(data_array_x[0]) == "array" && !func_methods.isDyadicArr(data_array_x)){
                    return formula.error.v;
                }

                array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
            }
            else if(getObjType(data_array_x) == "object" && data_array_x.startCell != null){
                array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, "text", false));
            }
            else{
                array_x.push(data_array_x);
            }

            //第二个数组或数值区域
            var data_array_y = arguments[1];
            var array_y = [];

            if(getObjType(data_array_y) == "array"){
                if(getObjType(data_array_y[0]) == "array" && !func_methods.isDyadicArr(data_array_y)){
                    return formula.error.v;
                }

                array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
            }
            else if(getObjType(data_array_y) == "object" && data_array_y.startCell != null){
                array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, "text", false));
            }
            else{
                array_y.push(data_array_y);
            }

            if(array_x.length != array_y.length){
                return formula.error.na;
            }

            //array_x 和 array_y 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < array_x.length; i++){
                var num_x = array_x[i];
                var num_y = array_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            //计算
            var sum = 0;

            for (var i = 0; i < data_x.length; i++) {
                sum += Math.pow(data_x[i], 2) - Math.pow(data_y[i], 2);
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMX2PY2": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数组或数值区域
            var data_array_x = arguments[0];
            var array_x = [];

            if(getObjType(data_array_x) == "array"){
                if(getObjType(data_array_x[0]) == "array" && !func_methods.isDyadicArr(data_array_x)){
                    return formula.error.v;
                }

                array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
            }
            else if(getObjType(data_array_x) == "object" && data_array_x.startCell != null){
                array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, "text", false));
            }
            else{
                array_x.push(data_array_x);
            }

            //第二个数组或数值区域
            var data_array_y = arguments[1];
            var array_y = [];

            if(getObjType(data_array_y) == "array"){
                if(getObjType(data_array_y[0]) == "array" && !func_methods.isDyadicArr(data_array_y)){
                    return formula.error.v;
                }

                array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
            }
            else if(getObjType(data_array_y) == "object" && data_array_y.startCell != null){
                array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, "text", false));
            }
            else{
                array_y.push(data_array_y);
            }

            if(array_x.length != array_y.length){
                return formula.error.na;
            }

            //array_x 和 array_y 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < array_x.length; i++){
                var num_x = array_x[i];
                var num_y = array_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            //计算
            var sum = 0;

            for (var i = 0; i < data_x.length; i++) {
                sum += Math.pow(data_x[i], 2) + Math.pow(data_y[i], 2);
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMXMY2": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数组或数值区域
            var data_array_x = arguments[0];
            var array_x = [];

            if(getObjType(data_array_x) == "array"){
                if(getObjType(data_array_x[0]) == "array" && !func_methods.isDyadicArr(data_array_x)){
                    return formula.error.v;
                }

                array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
            }
            else if(getObjType(data_array_x) == "object" && data_array_x.startCell != null){
                array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, "text", false));
            }
            else{
                array_x.push(data_array_x);
            }

            //第二个数组或数值区域
            var data_array_y = arguments[1];
            var array_y = [];

            if(getObjType(data_array_y) == "array"){
                if(getObjType(data_array_y[0]) == "array" && !func_methods.isDyadicArr(data_array_y)){
                    return formula.error.v;
                }

                array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
            }
            else if(getObjType(data_array_y) == "object" && data_array_y.startCell != null){
                array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, "text", false));
            }
            else{
                array_y.push(data_array_y);
            }

            if(array_x.length != array_y.length){
                return formula.error.na;
            }

            //array_x 和 array_y 只取数值
            var data_x = [], data_y = [];

            for(var i = 0; i < array_x.length; i++){
                var num_x = array_x[i];
                var num_y = array_y[i];

                if(isRealNum(num_x) && isRealNum(num_y)){
                    data_x.push(parseFloat(num_x));
                    data_y.push(parseFloat(num_y));
                }
            }

            //计算
            var sum = 0;

            for (var i = 0; i < data_x.length; i++) {
                sum += Math.pow(data_x[i] - data_y[i], 2);
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRANSPOSE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //从其返回唯一值的数组或区域
            var data_array = arguments[0];
            var array = [];

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "number");
            }

            array = array[0].map(function(col, a){
                return array.map(function(row){
                    return row[a];
                });
            });

            return array;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TREND": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //已知的 y 值集合
            var data_known_y = arguments[0];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = func_methods.getDataDyadicArr(data_known_y);
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = func_methods.getCellDataDyadicArr(data_known_y, "text");
            }
            else{
                if(!isRealNum(data_known_y)){
                    return formula.error.v;
                }

                var rowArr = [];

                rowArr.push(parseFloat(data_known_y));

                known_y.push(rowArr);
            }

            var known_y_rowlen = known_y.length;
            var known_y_collen = known_y[0].length;

            for(var i = 0; i < known_y_rowlen; i++){
                for(var j = 0; j < known_y_collen; j++){
                    if(!isRealNum(known_y[i][j])){
                        return formula.error.v;
                    }

                    known_y[i][j] = parseFloat(known_y[i][j]);
                }
            }

            //可选 x 值集合
            var known_x = [];
            for(var i = 1; i <= known_y_rowlen; i++){
                for(var j = 1; j <= known_y_collen; j++){
                    var number = (i - 1) * known_y_collen + j;
                    known_x.push(number);
                }
            }

            if(arguments.length >= 2){
                var data_known_x = arguments[1];
                known_x = [];

                if(getObjType(data_known_x) == "array"){
                    if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                        return formula.error.v;
                    }

                    known_x = func_methods.getDataDyadicArr(data_known_x);
                }
                else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                    known_x = func_methods.getCellDataDyadicArr(data_known_x, "text");
                }
                else{
                    if(!isRealNum(data_known_x)){
                        return formula.error.v;
                    }

                    var rowArr = [];

                    rowArr.push(parseFloat(data_known_x));

                    known_x.push(rowArr);
                }

                for(var i = 0; i < known_x.length; i++){
                    for(var j = 0; j < known_x[0].length; j++){
                        if(!isRealNum(known_x[i][j])){
                            return formula.error.v;
                        }

                        known_x[i][j] = parseFloat(known_x[i][j]);
                    }
                }
            }

            var known_x_rowlen = known_x.length;
            var known_x_collen = known_x[0].length;

            //新 x 值
            var new_x = known_x;

            if(arguments.length >= 3){
                var data_new_x = arguments[2];
                new_x = [];

                if(getObjType(data_new_x) == "array"){
                    if(getObjType(data_new_x[0]) == "array" && !func_methods.isDyadicArr(data_new_x)){
                        return formula.error.v;
                    }

                    new_x = func_methods.getDataDyadicArr(data_new_x);
                }
                else if(getObjType(data_new_x) == "object" && data_new_x.startCell != null){
                    new_x = func_methods.getCellDataDyadicArr(data_new_x, "text");
                }
                else{
                    if(!isRealNum(data_new_x)){
                        return formula.error.v;
                    }

                    var rowArr = [];

                    rowArr.push(parseFloat(data_new_x));

                    new_x.push(rowArr);
                }

                for(var i = 0; i < new_x.length; i++){
                    for(var j = 0; j < new_x[0].length; j++){
                        if(!isRealNum(new_x[i][j])){
                            return formula.error.v;
                        }

                        new_x[i][j] = parseFloat(new_x[i][j]);
                    }
                }
            }

            //逻辑值
            var const_b = true;

            if(arguments.length == 4){
                const_b = func_methods.getCellBoolen(arguments[3]);

                if(valueIsError(const_b)){
                    return const_b;
                }
            }

            if(known_y_rowlen != known_x_rowlen || known_y_collen != known_x_collen){
                return formula.error.r;
            }

            //计算
            function leastSquare(arr_x, arr_y){
                var xSum = 0, ySum = 0, xySum = 0, x2Sum = 0;

                for(var i = 0; i < arr_x.length; i++){
                    for(var j = 0; j < arr_x[i].length; j++){
                        xSum += arr_x[i][j];
                        ySum += arr_y[i][j];
                        xySum += arr_x[i][j] * arr_y[i][j];
                        x2Sum += arr_x[i][j] * arr_x[i][j];
                    }
                }

                var n = arr_x.length * arr_x[0].length;

                var xMean = xSum / n;
                var yMean = ySum / n;
                var xyMean = xySum / n;
                var x2Mean = x2Sum / n;

                var m = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
                var b = yMean - m * xMean;

                return [m, b];
            }

            var ls = leastSquare(known_x, known_y);
            var m = ls[0];

            if(const_b){
                var b = ls[1];
            }
            else{
                var b = 0;
            }

            var result = [];

            for(var i = 0; i < new_x.length; i++){
                for(var j = 0; j < new_x[i].length; j++){
                    var x = new_x[i][j];
                    var y = m * x + b;

                    result.push(Math.round(y * 1000000000) / 1000000000);
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FREQUENCY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //频率数组
            var data_data_array = arguments[0];
            var data_array = [];

            if(getObjType(data_data_array) == "array"){
                if(getObjType(data_data_array[0]) == "array" && !func_methods.isDyadicArr(data_data_array)){
                    return formula.error.v;
                }

                data_array = data_array.concat(func_methods.getDataArr(data_data_array, true));
            }
            else if(getObjType(data_data_array) == "object" && data_data_array.startCell != null){
                data_array = data_array.concat(func_methods.getCellDataArr(data_data_array, "number", true));
            }
            else{
                if(!isRealNum(data_data_array)){
                    return formula.error.v;
                }

                data_array.push(data_data_array);
            }

            var data_array_n = [];

            for(var i = 0; i < data_array.length; i++){
                if(isRealNum(data_array[i])){
                    data_array_n.push(parseFloat(data_array[i]));
                }
            }

            //间隔数组
            var data_bins_array = arguments[1];
            var bins_array = [];

            if(getObjType(data_bins_array) == "array"){
                if(getObjType(data_bins_array[0]) == "array" && !func_methods.isDyadicArr(data_bins_array)){
                    return formula.error.v;
                }

                bins_array = bins_array.concat(func_methods.getDataArr(data_bins_array, true));
            }
            else if(getObjType(data_bins_array) == "object" && data_bins_array.startCell != null){
                bins_array = bins_array.concat(func_methods.getCellDataArr(data_bins_array, "number", true));
            }
            else{
                if(!isRealNum(data_bins_array)){
                    return formula.error.v;
                }

                bins_array.push(data_bins_array);
            }

            var bins_array_n = [];

            for(var i = 0; i < bins_array.length; i++){
                if(isRealNum(bins_array[i])){
                    bins_array_n.push(parseFloat(bins_array[i]));
                }
            }

            //计算
            if(data_array_n.length == 0 && bins_array_n.length == 0){
                return [[0], [0]];
            }
            else if(data_array_n.length == 0){
                var result = [[0]];

                for(var i = 0; i < bins_array_n.length; i++){
                    result.push([0]);
                }

                return result;
            }
            else if(bins_array_n.length == 0){
                return [[0], [data_array_n.length]];
            }
            else{
                bins_array_n.sort(function(a, b){
                    return a - b;
                });

                var result = [];

                for(var i = 0; i < bins_array_n.length; i++){
                    if(i == 0){
                        var count = 0;

                        for(var j = 0; j < data_array_n.length; j++){
                            if(data_array_n[j] <= bins_array_n[0]){
                                count++;
                            }
                        }

                        result.push([count]);
                    }
                    else if(i == bins_array_n.length - 1){
                        var count1 = 0, count2 = 0;

                        for(var j = 0; j < data_array_n.length; j++){
                            if(data_array_n[j] <= bins_array_n[i] && data_array_n[j] > bins_array_n[i - 1]){
                                count1++;
                            }

                            if(data_array_n[j] > bins_array_n[i]){
                                count2++;
                            }
                        }

                        result.push([count1]);
                        result.push([count2]);
                    }
                    else{
                        var count = 0;

                        for(var j = 0; j < data_array_n.length; j++){
                            if(data_array_n[j] <= bins_array_n[i] && data_array_n[j] > bins_array_n[i - 1]){
                                count++;
                            }
                        }

                        result.push([count]);
                    }
                }

                return result;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "GROWTH": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //已知的 y 值集合
            var data_known_y = arguments[0];
            var known_y = [];

            if(getObjType(data_known_y) == "array"){
                if(getObjType(data_known_y[0]) == "array" && !func_methods.isDyadicArr(data_known_y)){
                    return formula.error.v;
                }

                known_y = func_methods.getDataDyadicArr(data_known_y);
            }
            else if(getObjType(data_known_y) == "object" && data_known_y.startCell != null){
                known_y = func_methods.getCellDataDyadicArr(data_known_y, "text");
            }
            else{
                if(!isRealNum(data_known_y)){
                    return formula.error.v;
                }

                var rowArr = [];

                rowArr.push(parseFloat(data_known_y));

                known_y.push(rowArr);
            }

            var known_y_rowlen = known_y.length;
            var known_y_collen = known_y[0].length;

            for(var i = 0; i < known_y_rowlen; i++){
                for(var j = 0; j < known_y_collen; j++){
                    if(!isRealNum(known_y[i][j])){
                        return formula.error.v;
                    }

                    known_y[i][j] = parseFloat(known_y[i][j]);
                }
            }

            //可选 x 值集合
            var known_x = [];
            for(var i = 1; i <= known_y_rowlen; i++){
                for(var j = 1; j <= known_y_collen; j++){
                    var number = (i - 1) * known_y_collen + j;
                    known_x.push(number);
                }
            }

            if(arguments.length >= 2){
                var data_known_x = arguments[1];
                known_x = [];

                if(getObjType(data_known_x) == "array"){
                    if(getObjType(data_known_x[0]) == "array" && !func_methods.isDyadicArr(data_known_x)){
                        return formula.error.v;
                    }

                    known_x = func_methods.getDataDyadicArr(data_known_x);
                }
                else if(getObjType(data_known_x) == "object" && data_known_x.startCell != null){
                    known_x = func_methods.getCellDataDyadicArr(data_known_x, "text");
                }
                else{
                    if(!isRealNum(data_known_x)){
                        return formula.error.v;
                    }

                    var rowArr = [];

                    rowArr.push(parseFloat(data_known_x));

                    known_x.push(rowArr);
                }

                for(var i = 0; i < known_x.length; i++){
                    for(var j = 0; j < known_x[0].length; j++){
                        if(!isRealNum(known_x[i][j])){
                            return formula.error.v;
                        }

                        known_x[i][j] = parseFloat(known_x[i][j]);
                    }
                }
            }

            var known_x_rowlen = known_x.length;
            var known_x_collen = known_x[0].length;

            //新 x 值
            var new_x = known_x;

            if(arguments.length >= 3){
                var data_new_x = arguments[2];
                new_x = [];

                if(getObjType(data_new_x) == "array"){
                    if(getObjType(data_new_x[0]) == "array" && !func_methods.isDyadicArr(data_new_x)){
                        return formula.error.v;
                    }

                    new_x = func_methods.getDataDyadicArr(data_new_x);
                }
                else if(getObjType(data_new_x) == "object" && data_new_x.startCell != null){
                    new_x = func_methods.getCellDataDyadicArr(data_new_x, "text");
                }
                else{
                    if(!isRealNum(data_new_x)){
                        return formula.error.v;
                    }

                    var rowArr = [];

                    rowArr.push(parseFloat(data_new_x));

                    new_x.push(rowArr);
                }

                for(var i = 0; i < new_x.length; i++){
                    for(var j = 0; j < new_x[0].length; j++){
                        if(!isRealNum(new_x[i][j])){
                            return formula.error.v;
                        }

                        new_x[i][j] = parseFloat(new_x[i][j]);
                    }
                }
            }

            //逻辑值
            var const_b = true;

            if(arguments.length == 4){
                const_b = func_methods.getCellBoolen(arguments[3]);

                if(valueIsError(const_b)){
                    return const_b;
                }
            }

            if(known_y_rowlen != known_x_rowlen || known_y_collen != known_x_collen){
                return formula.error.r;
            }

            //计算
            function leastSquare(arr_x, arr_y){
                var xSum = 0, ySum = 0, xySum = 0, x2Sum = 0;

                for(var i = 0; i < arr_x.length; i++){
                    for(var j = 0; j < arr_x[i].length; j++){
                        xSum += arr_x[i][j];
                        // ySum += arr_y[i][j];
                        ySum += Math.log(arr_y[i][j]);
                        // xySum += arr_x[i][j] * arr_y[i][j];
                        xySum += arr_x[i][j] * Math.log(arr_y[i][j]);
                        x2Sum += arr_x[i][j] * arr_x[i][j];
                    }
                }

                var n = arr_x.length * arr_x[0].length;

                var xMean = xSum / n;
                var yMean = ySum / n;
                var xyMean = xySum / n;
                var x2Mean = x2Sum / n;

                var m = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
                var b = yMean - m * xMean;

                return [Math.exp(m), Math.exp(b)];
            }

            var ls = leastSquare(known_x, known_y);
            var m = ls[0];

            if(const_b){
                var b = ls[1];
            }
            else{
                var b = 1;
            }

            var result = [];

            for(var i = 0; i < new_x.length; i++){
                for(var j = 0; j < new_x[i].length; j++){
                    var x = new_x[i][j];
                    var y = b * Math.pow(m, x);
                    // var y = Math.exp(b + m * x);

                    result.push(Math.round(y * 1000000000) / 1000000000);
                }
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LINEST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return formula.error.v;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LOGEST": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return formula.error.v;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MDETERM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数组
            var data_array = arguments[0];
            var array = [];

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "text");
            }
            else{
                var rowArr = [];
                rowArr.push(data_array);
                array.push(rowArr);
            }

            for(var i = 0; i < array.length; i++){
                for(var j = 0; j < array[i].length; j++){
                    if(!isRealNum(array[i][j])){
                        return formula.error.v;
                    }

                    array[i][j] = parseFloat(array[i][j]);
                }
            }

            if(array.length != array[0].length){
                return formula.error.v;
            }

            //计算
            function Ma(a, n){
                var A;
                var b = new Array();

                if(n == 1){
                    A = a[0][0];

                    return A;
                }
                else if(n == 2){
                    A = a[0][0] * a[1][1] - a[0][1] * a[1][0];

                    return A;
                }
                else if(n == 3){
                    A = a[0][0]*a[1][1]*a[2][2] + a[1][0]*a[2][1]*a[0][2] + a[2][0]*a[0][1]*a[1][2] - a[2][0]*a[1][1]*a[0][2] - a[0]      [0]*a[2][1]*a[1][2] - a[1][0]*a[0][1]*a[2][2];

                    return A;
                }
                else{
                    A = 0;
                    var c = new Array();
                    var e = new Array();

                    for(var i = 0; i < n; i++){
                        b[i] = a[i][0] * Math.pow(-1, i + 1 + 1);
                    }

                    for(var i = 0; i < n; i++){
                        e[i] = new Array();

                        for(var j = 0; j < n - 1; j++){
                            e[i][j] = a[i][j + 1];
                        }
                    }

                    for(var i = 0; i < n; i++){
                        for(var j = 0; j < n; j++){
                            c[j] = new Array();

                            for(var k = 0; k < n - 1; k++){
                                if(i > j){
                                    c[j][k] = e[j][k];
                                }
                                else if(i < j){
                                    c[j - 1][k] = e[j][k];
                                }
                            }
                        }

                        A += b[i] * arguments.callee(c, n - 1);
                    }

                    return A;
                }
            }

            return Ma(array, array.length);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MINVERSE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数组
            var data_array = arguments[0];
            var array = [];

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "text");
            }
            else{
                var rowArr = [];
                rowArr.push(data_array);
                array.push(rowArr);
            }

            for(var i = 0; i < array.length; i++){
                for(var j = 0; j < array[i].length; j++){
                    if(!isRealNum(array[i][j])){
                        return formula.error.v;
                    }

                    array[i][j] = parseFloat(array[i][j]);
                }
            }

            if(array.length != array[0].length){
                return formula.error.v;
            }

            //计算
            return inverse(array);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "MMULT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数组1
            var data_array1 = arguments[0];
            var array1 = [];

            if(getObjType(data_array1) == "array"){
                if(getObjType(data_array1[0]) == "array" && !func_methods.isDyadicArr(data_array1)){
                    return formula.error.v;
                }

                array1 = func_methods.getDataDyadicArr(data_array1);
            }
            else if(getObjType(data_array1) == "object" && data_array1.startCell != null){
                array1 = func_methods.getCellDataDyadicArr(data_array1, "text");
            }
            else{
                var rowArr = [];
                rowArr.push(data_array1);
                array1.push(rowArr);
            }

            for(var i = 0; i < array1.length; i++){
                for(var j = 0; j < array1[i].length; j++){
                    if(!isRealNum(array1[i][j])){
                        return formula.error.v;
                    }

                    array1[i][j] = parseFloat(array1[i][j]);
                }
            }

            //数组2
            var data_array2 = arguments[1];
            var array2 = [];

            if(getObjType(data_array2) == "array"){
                if(getObjType(data_array2[0]) == "array" && !func_methods.isDyadicArr(data_array2)){
                    return formula.error.v;
                }

                array2 = func_methods.getDataDyadicArr(data_array2);
            }
            else if(getObjType(data_array2) == "object" && data_array2.startCell != null){
                array2 = func_methods.getCellDataDyadicArr(data_array2, "text");
            }
            else{
                var rowArr = [];
                rowArr.push(data_array2);
                array2.push(rowArr);
            }

            for(var i = 0; i < array2.length; i++){
                for(var j = 0; j < array2[i].length; j++){
                    if(!isRealNum(array2[i][j])){
                        return formula.error.v;
                    }

                    array2[i][j] = parseFloat(array2[i][j]);
                }
            }

            //计算
            if(array1[0].length != array2.length){
                return formula.error.v;
            }

            var rowlen = array1.length;
            var collen = array2[0].length;

            var result = [];

            for(var m = 0; m < rowlen; m++){
                var rowArr = [];

                for(var n = 0; n < collen; n++){
                    var value = 0;

                    for(var p = 0; p < array1[0].length; p++){
                        value += array1[m][p] * array2[p][n];
                    }

                    rowArr.push(value);
                }

                result.push(rowArr);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SUMPRODUCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //第一个数组
            //数组1
            var data_array1 = arguments[0];
            var array1 = [];

            if(getObjType(data_array1) == "array"){
                if(getObjType(data_array1[0]) == "array" && !func_methods.isDyadicArr(data_array1)){
                    return formula.error.v;
                }

                array1 = func_methods.getDataDyadicArr(data_array1);
            }
            else if(getObjType(data_array1) == "object" && data_array1.startCell != null){
                array1 = func_methods.getCellDataDyadicArr(data_array1, "text");
            }
            else{
                var rowArr = [];
                rowArr.push(data_array1);
                array1.push(rowArr);
            }

            for(var i = 0; i < array1.length; i++){
                for(var j = 0; j < array1[i].length; j++){
                    if(!isRealNum(array1[i][j])){
                        array1[i][j] = 0;
                    }
                    else{
                        array1[i][j] = parseFloat(array1[i][j]);
                    }
                }
            }

            var rowlen = array1.length;
            var collen = array1[0].length;

            if(arguments.length >= 2){
                for(var i = 1; i < arguments.length; i++){
                    var data = arguments[i];
                    var arr = [];

                    if(getObjType(data) == "array"){
                        if(getObjType(data[0]) == "array" && !func_methods.isDyadicArr(data)){
                            return formula.error.v;
                        }

                        arr = func_methods.getDataDyadicArr(data);
                    }
                    else if(getObjType(data) == "object" && data.startCell != null){
                        arr = func_methods.getCellDataDyadicArr(data, "text");
                    }
                    else{
                        var rowArr = [];
                        rowArr.push(data);
                        arr.push(rowArr);
                    }

                    if(arr.length != rowlen || arr[0].length != collen){
                        return formula.error.v;
                    }

                    for(var m = 0; m < rowlen; m++){
                        for(var n = 0; n < collen; n++){
                            if(!isRealNum(arr[m][n])){
                                array1[m][n] = 0;
                            }
                            else{
                                array1[m][n] = array1[m][n] * parseFloat(arr[m][n]);
                            }
                        }
                    }
                }
            }

            var sum = 0;

            for(var m = 0; m < rowlen; m++){
                for(var n = 0; n < collen; n++){
                    sum += array1[m][n];
                }
            }

            return sum;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISFORMULA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var data_cell = arguments[0];
            var cell;

            if(getObjType(data_cell) == "object" && data_cell.startCell != null){
                if(data_cell.data == null){
                    return false;
                }

                if(getObjType(data_cell.data) == "array"){
                    cell = data_cell.data[0][0];
                }
                else{
                    cell = data_cell.data;
                }

                if(cell != null && cell.f != null){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return formula.error.v;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "CELL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格信息的类型
            var data_info_type = arguments[0];
            var info_type;

            if(getObjType(data_info_type) == "array"){
                if(getObjType(data_info_type[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_info_type)){
                        return formula.error.v;
                    }

                    info_type = data_info_type[0][0];
                }
                else{
                    info_type = data_info_type[0];
                }
            }
            else if(getObjType(data_info_type) == "object" && data_info_type.startCell != null){
                if(data_info_type.data == null){
                    return formula.error.v;
                }
                else{
                    if(getObjType(data_info_type.data) == "array"){
                        return formula.error.v;
                    }

                    info_type = data_info_type.data.v;

                    if(isRealNull(info_type)){
                        return formula.error.v;
                    }
                }
            }
            else{
                info_type = data_info_type;
            }

            //单元格
            var data_reference = arguments[1];
            var reference;

            if(getObjType(data_reference) == "object" && data_reference.startCell != null){
                reference = data_reference.startCell;
            }
            else{
                return formula.error.v;
            }

            if(["address", "col", "color", "contents", "filename", "format", "parentheses", "prefix", "protect", "row", "type", "width"].indexOf(info_type) == -1){
                return formula.error.v;
            }

            var file = getluckysheetfile()[getSheetIndex(Store.currentSheetIndex)];

            var cellrange = formula.getcellrange(reference);
            var row_index = cellrange.row[0];
            var col_index = cellrange.column[0];

            // let sheetdata = null;
            // sheetdata = Store.flowdata;
            // if (formula.execFunctionGroupData != null) {
            //     sheetdata = formula.execFunctionGroupData;
            // }

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            let value;
            if(formula.execFunctionGlobalData != null && formula.execFunctionGlobalData[row_index+"_"+col_index+"_"+Store.calculateSheetIndex]!=null){
                value = formula.execFunctionGlobalData[row_index+"_"+col_index+"_"+Store.calculateSheetIndex].v;
            }
            else if(sheetdata[row_index][col_index] != null && sheetdata[row_index][col_index].v != null && sheetdata[row_index][col_index].v !=""){
                value = sheetdata[row_index][col_index];
                if(value instanceof Object){
                    value = value.v;
                }
            }
            else {
                value = 0;
            }

            switch(info_type){
                case "address":
                    return reference;
                    break;
                case "col":
                    return col_index + 1;
                    break;
                case "color":
                    return 0;
                    break;
                case "contents":
                    // if (sheetdata[row_index][col_index] == null || sheetdata[row_index][col_index].v == null || sheetdata[row_index][col_index].v ==""){
                    //     value = 0;
                    // }

                    return value;
                    break;
                case "filename":
                    return file.name;
                    break;
                case "format":
                    if (sheetdata[row_index][col_index] == null || sheetdata[row_index][col_index].ct == null){
                        return "G";
                    }

                    return sheetdata[row_index][col_index].ct.fa;
                    break;
                case "parentheses":
                    if (sheetdata[row_index][col_index] == null || sheetdata[row_index][col_index].v == null || sheetdata[row_index][col_index].v ==""){
                        return 0;
                    }

                    if (sheetdata[row_index][col_index].v > 0){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                    break;
                case "prefix":
                    if (value==0){
                        return "";
                    }

                    if (sheetdata[row_index][col_index].ht == 0){//居中对齐
                        return "^";
                    }
                    else if (sheetdata[row_index][col_index].ht == 1){//左对齐
                        return "'";
                    }
                    else if (sheetdata[row_index][col_index].ht == 2){//右对齐
                        return '"';
                    }
                    else{
                        return "";
                    }
                    break;
                case "protect":
                    return 0;
                    break;
                case "row":
                    return row_index + 1;
                    break;
                case "type":
                    if (value==0){
                        return "b";
                    }

                    return "l";
                    break;
                case "width":
                    var cfg = file.config;

                    if(cfg["columnlen"] != null && col_index in cfg["columnlen"]){
                        return cfg["columnlen"][col_index];
                    }

                    return Store.defaultcollen;
                    break;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "NA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            return formula.error.na;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ERROR_TYPE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_error_val = arguments[0];
            var error_val;

            if(getObjType(data_error_val) == "array"){
                if(getObjType(data_error_val[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_error_val)){
                        return formula.error.v;
                    }

                    error_val = data_error_val[0][0];
                }
                else{
                    error_val = data_error_val[0];
                }
            }
            else if(getObjType(data_error_val) == "object" && data_error_val.startCell != null){
                if(data_error_val.data == null){
                    return formula.error.na;
                }

                if(getObjType(data_error_val.data) == "array"){
                    error_val = data_error_val.data[0][0];

                    if(error_val == null || isRealNull(error_val.v)){
                        return formula.error.na;
                    }

                    error_val = error_val.v;
                }
                else{
                    if(isRealNull(data_error_val.data.v)){
                        return formula.error.na;
                    }

                    error_val = data_error_val.data.v;
                }
            }
            else{
                error_val = data_error_val;
            }

            var error_obj = {
                "#NULL!": 1,
                "#DIV/0!": 2,
                "#VALUE!": 3,
                "#REF!": 4,
                "#NAME?": 5,
                "#NUM!": 6,
                "#N/A": 7,
                "#GETTING_DATA": 8
            }

            if(error_val in error_obj){
                return error_obj[error_val];
            }
            else{
                return formula.error.na;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISBLANK": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_error_val = arguments[0];
            var error_val;

            if(getObjType(data_error_val) == "object" && data_error_val.startCell != null){
                if(data_error_val.data == null){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISERR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return true;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(["#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISERROR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return true;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISLOGICAL": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return false
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(value.toString().toLowerCase() == "true" || value.toString().toLowerCase() == "false"){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISNA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return false;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(value.toString() == "#N/A"){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISNONTEXT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return true;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return true;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return true;
            }
            else if(value.toString().toLowerCase() == "true" || value.toString().toLowerCase() == "false"){
                return true;
            }
            else if(isRealNum(value)){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISNUMBER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return false;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(isRealNum(value)){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISREF": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            if(getObjType(arguments[0]) == "object" && arguments[0].startCell != null){
                return true;
            }
            else{
                return false;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "ISTEXT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return false;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return false;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return false;
            }
            else if(value.toString().toLowerCase() == "true" || value.toString().toLowerCase() == "false"){
                return false;
            }
            else if(isRealNum(value)){
                return false;
            }
            else{
                return true;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TYPE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                return 64;
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    return 16;
                }

                if(data_value.data == null || isRealNull(data_value.data.v)){
                    return 1;
                }

                value = data_value.data.v;
            }
            else{
                value = data_value;
            }

            if(["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return 16;
            }
            else if(value.toString().toLowerCase() == "true" || value.toString().toLowerCase() == "false"){
                return 4;
            }
            else if(isRealNum(value)){
                return 1;
            }
            else{
                return 2;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "N": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //单元格
            var data_value = arguments[0];
            var value;

            if(getObjType(data_value) == "array"){
                if(getObjType(data_value[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_value)){
                        return formula.error.v;
                    }

                    value = data_value[0][0];
                }
                else{
                    value = data_value[0];
                }
            }
            else if(getObjType(data_value) == "object" && data_value.startCell != null){
                if(getObjType(data_value.data) == "array"){
                    value = data_value.data[0][0];

                    if(value == null || isRealNull(value.v)){
                        return 0;
                    }

                    value = value.v;
                }
                else{
                    if(data_value.data == null || isRealNull(data_value.data.v)){
                        return 0;
                    }

                    value = data_value.data.v;
                }
            }
            else{
                value = data_value;
            }

            if(["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#NUM!", "#NAME?", "#NULL!"].indexOf(value) > -1){
                return value;
            }
            else if(value.toString().toLowerCase() == "true" || value.toString().toLowerCase() == "false"){
                if(value.toString().toLowerCase() == "true"){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            else if(isRealNum(value)){
                return parseFloat(value);
            }
            else{
                return 0;
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TO_DATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var value = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value)){
                return value;
            }

            if(!isRealNum(value)){
                return formula.error.v;
            }

            value = parseFloat(value);

            return update("yyyy-mm-dd", value);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TO_PURE_NUMBER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var value = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(value)){
                return value;
            }

            if(dayjs(value).isValid()){
                return genarate(value)[2];
            }
            else{
                return numeral(value).value() == null ? value : numeral(value).value();
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TO_TEXT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var value = func_methods.getFirstValue(arguments[0], "text");
            if(valueIsError(value)){
                return value;
            }

            return update("@", value);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TO_DOLLARS": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var value = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value)){
                return value;
            }

            if(!isRealNum(value)){
                return formula.error.v;
            }

            value = parseFloat(value);

            return update("$ 0.00", value);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TO_PERCENT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数字
            var value = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(value)){
                return value;
            }

            if(!isRealNum(value)){
                return formula.error.v;
            }

            value = parseFloat(value);

            return update("0%", value);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DGET": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            if (resultIndexes.length === 0) {
                return formula.error.v;
            }

            if (resultIndexes.length > 1) {
                return formula.error.nm;
            }

            return targetFields[resultIndexes[0]];
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DMAX": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var maxValue = targetFields[resultIndexes[0]];

            for (var i = 1; i < resultIndexes.length; i++) {
                if (maxValue < targetFields[resultIndexes[i]]) {
                    maxValue = targetFields[resultIndexes[i]];
                }
            }

            return maxValue;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DMIN": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = findField(database, field);
                targetFields = rest(database[index]);
            }
            else {
                targetFields = rest(database[field]);
            }

            var minValue = targetFields[resultIndexes[0]];

            for (var i = 1; i < resultIndexes.length; i++) {
                if (minValue > targetFields[resultIndexes[i]]) {
                    minValue = targetFields[resultIndexes[i]];
                }
            }

            return minValue;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DAVERAGE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var sum = 0;

            for (var i = 0; i < resultIndexes.length; i++) {
                sum += targetFields[resultIndexes[i]];
            }

            return resultIndexes.length === 0 ? formula.error.d : sum / resultIndexes.length;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DCOUNT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            return window.luckysheet_function.COUNT.f.apply(window.luckysheet_function.COUNT, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DCOUNTA": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            return window.luckysheet_function.COUNTA.f.apply(window.luckysheet_function.COUNTA, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DPRODUCT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            var result = 1;

            for (i = 0; i < targetValues.length; i++) {
                result *= targetValues[i];
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DSTDEV": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            return window.luckysheet_function.STDEVA.f.apply(window.luckysheet_function.STDEVA, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DSTDEVP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            return window.luckysheet_function.STDEVP.f.apply(window.luckysheet_function.STDEVP, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DSUM": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            var result = 0;

            for (i = 0; i < targetValues.length; i++) {
                result += targetValues[i];
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DVAR": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            return window.luckysheet_function.VAR_S.f.apply(window.luckysheet_function.VAR_S, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DVARP": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //数据库的单元格区域
            var data_database = arguments[0];
            var database = [];

            if(getObjType(data_database) == "object" && data_database.startCell != null){
                if(data_database.data == null){
                    return formula.error.v;
                }

                database = func_methods.getCellDataDyadicArr(data_database, "text");
            }
            else{
                return formula.error.v;
            }

            //列
            var field = func_methods.getFirstValue(arguments[1], "text");
            if(valueIsError(field)){
                return field;
            }

            if(isRealNull(field)){
                return formula.error.v;
            }

            //条件的单元格区域
            var data_criteria = arguments[2];
            var criteria = [];

            if(getObjType(data_criteria) == "object" && data_criteria.startCell != null){
                if(data_criteria.data == null){
                    return formula.error.v;
                }

                criteria = func_methods.getCellDataDyadicArr(data_criteria, "text");
            }
            else{
                return formula.error.v;
            }

            if (!isRealNum(field) && getObjType(field) !== "string") {
                return formula.error.v;
            }

            var resultIndexes = func_methods.findResultIndex(database, criteria);
            var targetFields = [];

            if (getObjType(field) === "string") {
                var index = func_methods.findField(database, field);
                targetFields = func_methods.rest(database[index]);
            }
            else {
                targetFields = func_methods.rest(database[field]);
            }

            var targetValues = [];

            for (var i = 0; i < resultIndexes.length; i++) {
                targetValues[i] = targetFields[resultIndexes[i]];
            }

            targetValues = func_methods.compact(targetValues);

            return window.luckysheet_function.VAR_P.f.apply(window.luckysheet_function.VAR_P, targetValues);
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "LINESPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];
            var lineColor = arguments[1];
            var lineWidth = arguments[2];
            var normalValue = arguments[3];
            var normalColor = arguments[4];
            var maxSpot = arguments[5];
            var minSpot = arguments[6];
            var spotRadius = arguments[7];

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            if(lineWidth==null){
                lineWidth = 1;
            }
            sparksetting["lineWidth"] = lineWidth;
            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting["offsetY"] = lineWidth+1;
            sparksetting.height = height-(lineWidth+1);
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            if(lineColor==null){
                lineColor = "#2ec7c9";
            }
            sparkColorSetting("lineColor", lineColor);
            //sparkColorSetting("fillColor", fillColor);
            sparksetting["fillColor"] = 0;




            //设置辅助线，可以支持min、max、avg、median等几个字符变量，或者具体的数值。
            if(!!normalValue){
                if(typeof(normalValue)=="string"){
                    normalValue = normalValue.toLowerCase();
                    var nv = null;
                    if(normalValue=="min"){
                        nv = window.luckysheet_function.MIN.f({"data":dataformat});
                    }
                    else if(normalValue=="max"){
                        nv = window.luckysheet_function.MAX.f({"data":dataformat});
                    }
                    else if(normalValue=="avg" || normalValue=="mean"){
                        nv = window.luckysheet_function.AVERAGE.f({"data":dataformat});
                    }
                    else if(normalValue=="median"){
                        nv = window.luckysheet_function.MEDIAN.f({"data":dataformat});
                    }

                    if(!!nv){
                        sparksetting["normalRangeMin"] = nv;
                        sparksetting["normalRangeMax"] = nv;
                    }
                }
                else{
                    sparksetting["normalRangeMin"] = normalValue;
                    sparksetting["normalRangeMax"] = normalValue;
                }

            }

            if(normalColor==null){
                normalColor = "#000";
            }
            sparkColorSetting("normalRangeColor", normalColor);

            sparkColorSetting("maxSpotColor", maxSpot);
            sparkColorSetting("minSpotColor", minSpot);

            if(spotRadius==null){
                spotRadius = "1.5";
            }
            sparksetting["spotRadius"] = spotRadius;


            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
            // {
            //     height:rowlen,
            //     width:firstcolumnlen,
            //     normalRangeMin:6,
            //     normalRangeMax:6,
            //     normalRangeColor:"#000"
            // }
            //return "";
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "AREASPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];
            var lineColor = arguments[1];
            var fillColor = arguments[2];
            var lineWidth = arguments[3];
            var normalValue = arguments[4];
            var normalColor = arguments[5];
            // var maxSpot = arguments[5];
            // var minSpot = arguments[6];
            // var spotRadius = arguments[7];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            if(lineWidth==null){
                lineWidth = 1;
            }
            sparksetting["lineWidth"] = lineWidth;
            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting["offsetY"] = lineWidth+1;
            sparksetting.height = height-(lineWidth+1);
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            if(lineColor==null){
                lineColor = "#2ec7c9";
            }
            sparkColorSetting("lineColor", lineColor);
            sparkColorSetting("fillColor", fillColor);
            // sparksetting["fillColor"] = 0;

            if(lineWidth==null){
                lineWidth = "1";
            }
            sparksetting["lineWidth"] = lineWidth;

            //设置辅助线，可以支持min、max、avg、median等几个字符变量，或者具体的数值。
            if(!!normalValue){
                if(typeof(normalValue)=="string"){
                    normalValue = normalValue.toLowerCase();
                    var nv = null;
                    if(normalValue=="min"){
                        nv = window.luckysheet_function.MIN.f({"data":dataformat});
                    }
                    else if(normalValue=="max"){
                        nv = window.luckysheet_function.MAX.f({"data":dataformat});
                    }
                    else if(normalValue=="avg" || normalValue=="mean"){
                        nv = window.luckysheet_function.AVERAGE.f({"data":dataformat});
                    }
                    else if(normalValue=="median"){
                        nv = window.luckysheet_function.MEDIAN.f({"data":dataformat});
                    }

                    if(!!nv){
                        sparksetting["normalRangeMin"] = nv;
                        sparksetting["normalRangeMax"] = nv;
                    }
                }
                else{
                    sparksetting["normalRangeMin"] = normalValue;
                    sparksetting["normalRangeMax"] = normalValue;
                }

            }

            if(normalColor==null){
                normalColor = "#000";
            }
            sparkColorSetting("normalRangeColor", normalColor);

            // sparkColorSetting("maxSpotColor", maxSpot);
            // sparkColorSetting("minSpotColor", minSpot);

            // if(spotRadius==null){
            //     spotRadius = "1.5";
            // }
            // sparksetting["spotRadius"] = spotRadius;


            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
            // {
            //     height:rowlen,
            //     width:firstcolumnlen,
            //     normalRangeMin:6,
            //     normalRangeMax:6,
            //     normalRangeColor:"#000"
            // }
            //return "";
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "COLUMNSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var barSpacing = arguments[1];
            var barColor = arguments[2];
            var negBarColor = arguments[3];
            var chartRangeMax = arguments[4];

            ////具体实现
            sparksetting["type"] = "column";
            if(barSpacing==null){
                barSpacing = "1";
            }
            sparksetting["barSpacing"] = barSpacing;

            if(barColor==null){
                barColor = "#fc5c5c";
            }
            sparkColorSetting("barColor", barColor);

            if(negBarColor==null){
                negBarColor = "#97b552";
            }
            sparkColorSetting("negBarColor", negBarColor);

            if(chartRangeMax==null || chartRangeMax===false || typeof chartRangeMax !="number" ){
                sparksetting["chartRangeMax"] = undefined;
            }
            else{
                sparksetting["chartRangeMax"] = chartRangeMax;
            }

            var colorLists = formula.sparklinesColorMap(arguments);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STACKCOLUMNSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            //var dataformat = formula.readCellDataToOneArray(rangeValue);

            var dataformat = [];

            var data = [];
            if(rangeValue!=null && rangeValue.data!=null){
                data = rangeValue.data;
            }

            if(getObjType(data) == "array"){
                data = formula.getPureValueByData(data);
            }
            else if(getObjType(data) == "object"){
                data = data.v;

                return [data];
            }
            else{
                if(/\{.*?\}/.test(data)){
                    data = data.replace(/\{/g, "[").replace(/\}/g, "]");
                }
                data = new Function("return " + data)();
            }

            var stackconfig = arguments[1];
            var offsetY = data.length;
            if(stackconfig==null || !!stackconfig){
                for(var c=0;c<data[0].length;c++){
                    var colstr = "";
                    for(var r=0;r<data.length;r++){
                        colstr += data[r][c] + ":";
                    }
                    colstr = colstr.substr(0, colstr.length-1);
                    dataformat.push(colstr);
                }
            }
            else{
                for(var r=0;r<data.length;r++){
                    var rowstr = "";
                    for(var c=0;c<data[0].length;c++){
                        rowstr += data[r][c] + ":";
                    }
                    rowstr = rowstr.substr(0, rowstr.length-1);
                    dataformat.push(rowstr);
                }
                var offsetY = data[0].length;
            }

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;
            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;
            //sparksetting.offsetY = offsetY;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var barSpacing = arguments[2];
            var chartRangeMax = arguments[3];

            ////具体实现
            sparksetting["type"] = "column";
            if(barSpacing==null){
                barSpacing = "1";
            }
            sparksetting["barSpacing"] = barSpacing;

            if(chartRangeMax==null || chartRangeMax===false || typeof chartRangeMax !="number" ){
                sparksetting["chartRangeMax"] = undefined;
            }
            else{
                sparksetting["chartRangeMax"] = chartRangeMax;
            }

            var colorLists = formula.sparklinesColorMap(arguments, 4);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现


            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BARSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var barSpacing = arguments[1];
            var barColor = arguments[2];
            var negBarColor = arguments[3];
            var chartRangeMax = arguments[4];

            ////具体实现
            sparksetting["type"] = "bar";
            if(barSpacing==null){
                barSpacing = "1";
            }
            sparksetting["barSpacing"] = barSpacing;

            if(barColor==null){
                barColor = "#fc5c5c";
            }
            sparkColorSetting("barColor", barColor);

            if(negBarColor==null){
                negBarColor = "#97b552";
            }
            sparkColorSetting("negBarColor", negBarColor);

            if(chartRangeMax==null || chartRangeMax===false || typeof chartRangeMax !="number" ){
                sparksetting["chartRangeMax"] = undefined;
            }
            else{
                sparksetting["chartRangeMax"] = chartRangeMax;
            }

            var colorLists = formula.sparklinesColorMap(arguments);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "STACKBARSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            //var dataformat = formula.readCellDataToOneArray(rangeValue);

            var dataformat = [];

            var data = [];
            if(rangeValue!=null && rangeValue.data!=null){
                data = rangeValue.data;
            }

            if(getObjType(data) == "array"){
                data = formula.getPureValueByData(data);
            }
            else if(getObjType(data) == "object"){
                data = data.v;
                return [data];
            }
            else{
                if(/\{.*?\}/.test(data)){
                    data = data.replace(/\{/g, "[").replace(/\}/g, "]");
                }
                data = new Function("return " + data)();
            }

            var stackconfig = arguments[1];
            var offsetY = data.length;
            if(stackconfig==null || !!stackconfig){
                for(var c=0;c<data[0].length;c++){
                    var colstr = "";
                    for(var r=0;r<data.length;r++){
                        colstr += data[r][c] + ":";
                    }
                    colstr = colstr.substr(0, colstr.length-1);
                    dataformat.push(colstr);
                }
            }
            else{
                for(var r=0;r<data.length;r++){
                    var rowstr = "";
                    for(var c=0;c<data[0].length;c++){
                        rowstr += data[r][c] + ":";
                    }
                    rowstr = rowstr.substr(0, rowstr.length-1);
                    dataformat.push(rowstr);
                }
                var offsetY = data[0].length;
            }

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;
            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;
            //sparksetting.offsetY = offsetY;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var barSpacing = arguments[2];
            var chartRangeMax = arguments[3];

            ////具体实现
            sparksetting["type"] = "bar";
            if(barSpacing==null){
                barSpacing = "1";
            }
            sparksetting["barSpacing"] = barSpacing;

            if(chartRangeMax==null || chartRangeMax===false || typeof chartRangeMax !="number" ){
                sparksetting["chartRangeMax"] = undefined;
            }
            else{
                sparksetting["chartRangeMax"] = chartRangeMax;
            }

            var colorLists = formula.sparklinesColorMap(arguments, 4);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现


            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "DISCRETESPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var thresholdValue = arguments[1];
            var barColor = arguments[2];
            var negBarColor = arguments[3];

            ////具体实现
            sparksetting["type"] = "discrete";

            if(thresholdValue==null){
                thresholdValue = 0;
            }
            sparksetting["thresholdValue"] = thresholdValue;

            if(barColor==null){
                barColor = "#2ec7c9";
            }
            sparkColorSetting("lineColor", barColor);

            if(negBarColor==null){
                negBarColor = "#fc5c5c";
            }
            sparkColorSetting("thresholdColor", negBarColor);
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "TRISTATESPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var barSpacing = arguments[1];
            var barColor = arguments[2];
            var negBarColor = arguments[3];
            var zeroBarColor = arguments[4];

            ////具体实现
            sparksetting["type"] = "tristate";
            if(barSpacing==null){
                barSpacing = "1";
            }
            sparksetting["barSpacing"] = barSpacing;

            if(barColor==null){
                barColor = "#fc5c5c";
            }
            sparkColorSetting("barColor", barColor);

            if(negBarColor==null){
                negBarColor = "#97b552";
            }
            sparkColorSetting("negBarColor", negBarColor);

            if(zeroBarColor==null){
                zeroBarColor = "#999";
            }
            sparkColorSetting("zeroBarColor", zeroBarColor);

            var colorLists = formula.sparklinesColorMap(arguments);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "PIESPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var offset = arguments[1];
            var borderWidth = arguments[2];
            var borderColor = arguments[3];

            ////具体实现
            sparksetting["type"] = "pie";
            if(offset==null){
                offset = 0;
            }
            sparksetting["offset"] = offset;

            if(borderWidth==null){
                borderWidth = 0;
            }
            sparkColorSetting("borderWidth", borderWidth);

            if(borderColor==null){
                borderColor = "#97b552";
            }
            sparkColorSetting("borderColor", borderColor);

            var colorLists = formula.sparklinesColorMap(arguments, 4);
            if(!!colorLists){
                sparksetting["colorMap"] = colorLists;
            }
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BOXSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来���用到
            var colorList = formula.colorList;
            var rangeValue = arguments[0];

            //定义需要格式化data数据
            var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            var outlierIQR = arguments[1];
            var target = arguments[2];
            var spotRadius = arguments[3];

            ////具体实现
            sparksetting["type"] = "box";
            if(outlierIQR==null){
                outlierIQR = 1.5;
            }
            sparksetting["outlierIQR"] = outlierIQR;

            if(target==null){
                target = 0;
            }
            else{
                sparkColorSetting("target", target);
            }

            if(spotRadius==null){
                spotRadius = 1.5;
            }
            sparkColorSetting("spotRadius", spotRadius);
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "BULLETSPLINES": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var cell_fp = window.luckysheetCurrentFunction;
            //色表，接下来会用到
            var colorList = formula.colorList;
            //var rangeValue = arguments[0];

            //定义需要格式化data数据
            //var dataformat = formula.readCellDataToOneArray(rangeValue);

            let luckysheetfile = getluckysheetfile();
            let index = getSheetIndex(Store.calculateSheetIndex);
            let sheetdata = luckysheetfile[index].data;

            //在下面获得该单元格的长度和宽度,同时考虑了合并单元格问题
            var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
            var width = cellSize[0];
            var height = cellSize[1];

            //开始进行sparklines的详细设置，宽和高为单元格的宽高。
            var sparksetting = {};

            //设置sparklines图表的宽高，线图的高会随着粗细而超出单元格高度，所以减去一个量，设置offsetY或者offsetX为渲染偏移量，传给luckysheetDrawMain使用。默认为0。=LINESPLINES(D9:E24,3,5)
            sparksetting.height = height;
            sparksetting.width = width;

            //定义sparklines的通用色彩设置函数，可以设置 色表【colorList】索引数值 或者 具体颜色值
            var sparkColorSetting = function(attr, value){
                if(!!value){
                    if(typeof(value)=="number"){
                        if(value>19){
                            value = value % 20;
                        }
                        value = colorList[value];
                    }
                    sparksetting[attr] = value;
                }
            }

            ////具体实现
            var dataformat = [];
            luckysheet_getValue(arguments);

            var data1 = formula.getValueByFuncData(arguments[0]);
            var data2 = formula.getValueByFuncData(arguments[1]);

            dataformat.push(data1);
            dataformat.push(data2);

            for(var i=2;i<arguments.length;i++){
                dataformat.push(formula.getValueByFuncData(arguments[i]));
            }

            sparksetting["type"] = "bullet";
            ////具体实现

            var temp1 = luckysheetSparkline.init(dataformat, sparksetting);

            return temp1;
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    //动态数组公式
    "SORT": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要排序的范围或数组
            var data_array = arguments[0];
            var array = [], rowlen = 1, collen = 1;

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_array)){
                        return formula.error.v;
                    }

                    for(var i = 0; i < data_array.length; i++){
                        var rowArr = [];

                        for(var j = 0; j < data_array[i].length; j++){
                            var number = data_array[i][j];

                            rowArr.push(number);
                        }

                        array.push(rowArr);
                    }

                    rowlen = array.length;
                    collen = array[0].length;
                }
                else{
                    for(var i = 0; i < data_array.length; i++){
                        var number = data_array[i];

                        array.push(number);
                    }

                    rowlen = array.length;
                }
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                if(data_array.data != null){
                    if(getObjType(data_array.data) == "array"){
                        for(var i = 0; i < data_array.data.length; i++){
                            var rowArr = [];

                            for(var j = 0; j < data_array.data[i].length; j++){
                                if(data_array.data[i][j] != null){
                                    var number = data_array.data[i][j].v;

                                    if(isRealNull(number)){
                                        number = 0;
                                    }

                                    rowArr.push(number);
                                }
                                else{
                                    rowArr.push(0);
                                }
                            }

                            array.push(rowArr);
                        }

                        rowlen = array.length;
                        collen = array[0].length;
                    }
                    else{
                        var number = data_array.data.v;

                        if(isRealNull(number)){
                            number = 0;
                        }

                        array.push(number);
                    }
                }
                else{
                    array.push(0);
                }
            }
            else{
                var number = data_array;

                array.push(number);
            }

            //表示要排序的行或列的数字（默认row1/col1）
            var sort_index = 1;
            if(arguments.length >= 2){
                sort_index = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(sort_index)){
                    return sort_index;
                }

                if(!isRealNum(sort_index)){
                    return formula.error.v;
                }

                sort_index = parseInt(sort_index);
            }

            //表示所需排序顺序的数字；1表示升序（默认），-1表示降序。
            var sort_order = 1;
            if(arguments.length >= 3){
                sort_order = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(sort_order)){
                    return sort_order;
                }

                if(!isRealNum(sort_order)){
                    return formula.error.v;
                }

                sort_order = Math.floor(parseFloat(sort_order));
            }

            //表示所需排序方向的逻辑值；按行排序为FALSE（默认），按列排序为TRUE。
            var by_col = false;
            if(arguments.length == 4){
                by_col = func_methods.getCellBoolen(arguments[3]);

                if(valueIsError(by_col)){
                    return by_col;
                }
            }

            if(by_col){
                if(sort_index < 1 || sort_index > rowlen){
                    return formula.error.v;
                }
            }
            else{
                if(sort_index < 1 || sort_index > collen){
                    return formula.error.v;
                }
            }

            if(sort_order != 1 && sort_order != -1){
                return formula.error.v;
            }

            //计算
            var asc = function(x, y){
                if(getObjType(x) == "array"){
                    x = x[sort_index - 1];
                }

                if(getObjType(y) == "array"){
                    y = y[sort_index - 1];
                }

                if(!isNaN(x) && !isNaN(y)){
                    return x - y;
                }
                else if(!isNaN(x)){
                    return -1;
                }
                else if(!isNaN(y)){
                    return 1;
                }
                else{
                    if(x > y){
                        return 1;
                    }
                    else if(x < y){
                        return -1;
                    }
                }
            }

            var desc = function(x, y){
                if(getObjType(x) == "array"){
                    x = x[sort_index - 1];
                }

                if(getObjType(y) == "array"){
                    y = y[sort_index - 1];
                }

                if(!isNaN(x) && !isNaN(y)){
                    return y - x;
                }
                else if(!isNaN(x)){
                    return 1;
                }
                else if(!isNaN(y)){
                    return -1;
                }
                else{
                    if(x > y){
                        return -1;
                    }
                    else if(x < y){
                        return 1;
                    }
                }
            }

            if(by_col){
                array = array[0].map(function(col, a){
                    return array.map(function(row){
                        return row[a];
                    });
                });

                if(sort_order == 1){
                    array.sort(asc);
                }

                if(sort_order == -1){
                    array.sort(desc);
                }

                array = array[0].map(function(col, b){
                    return array.map(function(row){
                        return row[b];
                    });
                });
            }
            else{
                if(sort_order == 1){
                    array.sort(asc);
                }

                if(sort_order == -1){
                    array.sort(desc);
                }
            }

            return array;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "FILTER": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要筛选的数组或范围
            var data_array = arguments[0];
            var array = [];

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "number");
            }
            else{
                var rowArr = [];

                rowArr.push(parseFloat(data_array));

                array.push(rowArr);
            }

            var rowlen = array.length,
                collen = array[0].length;

            //布尔数组，其高度或宽度与数组相同
            var data_include = arguments[1];
            var include = [];
            var type = "row"; //筛选方式 row - 行，col - 列

            if(getObjType(data_include) == "array"){
                if(getObjType(data_include[0]) == "array"){
                    if(!func_methods.isDyadicArr(data_include)){
                        return formula.error.v;
                    }

                    if(data_include.length > 1 && data_include[0].length > 1){
                        return formula.error.v;
                    }

                    if(data_include.length > 1){
                        if(data_include.length != array.length){
                            return formula.error.v;
                        }

                        type = "row";

                        for(var i = 0; i < data_include.length; i++){
                            var txt = data_include[i][0];

                            if(getObjType(txt) == "boolean"){

                            }
                            else if(getObjType(txt) == "string" && (txt.toLowerCase() == "true" || txt.toLowerCase() == "false")){
                                if(txt.toLowerCase() == "true"){
                                    txt = true;
                                }
                                else if(txt.toLowerCase() == "false"){
                                    txt = false;
                                }
                            }
                            else if(isRealNum(txt)){
                                txt = parseFloat(txt);

                                txt = txt == 0 ? false : true;
                            }
                            else{
                                return formula.error.v;
                            }

                            include.push(txt);
                        }
                    }

                    if(data_include[0].length > 1){
                        if(data_include[0].length != array[0].length){
                            return formula.error.v;
                        }

                        type = "col";

                        for(var i = 0; i < data_include[0].length; i++){
                            var txt = data_include[0][i];

                            if(getObjType(txt) == "boolean"){

                            }
                            else if(getObjType(txt) == "string" && (txt.toLowerCase() == "true" || txt.toLowerCase() == "false")){
                                if(txt.toLowerCase() == "true"){
                                    txt = true;
                                }
                                else if(txt.toLowerCase() == "false"){
                                    txt = false;
                                }
                            }
                            else if(isRealNum(txt)){
                                txt = parseFloat(txt);

                                txt = txt == 0 ? false : true;
                            }
                            else{
                                return formula.error.v;
                            }

                            include.push(txt);
                        }
                    }
                }
                else{
                    if(data_include.length != array[0].length){
                        return formula.error.v;
                    }

                    type = "col";

                    for(var i = 0; i < data_include.length; i++){
                        var txt = data_include[i];

                        if(getObjType(txt) == "boolean"){

                        }
                        else if(getObjType(txt) == "string" && (txt.toLowerCase() == "true" || txt.toLowerCase() == "false")){
                            if(txt.toLowerCase() == "true"){
                                txt = true;
                            }
                            else if(txt.toLowerCase() == "false"){
                                txt = false;
                            }
                        }
                        else if(isRealNum(txt)){
                            txt = parseFloat(txt);

                            txt = txt == 0 ? false : true;
                        }
                        else{
                            return formula.error.v;
                        }

                        include.push(txt);
                    }
                }
            }
            else if(getObjType(data_include) == "object" && data_include.data != null && getObjType(data_include.data) == "array"){
                if(data_include.data.length > 1 && data_include.data[0].length > 1){
                    return formula.error.v;
                }

                if(data_include.data.length > 1){
                    if(data_include.data.length != array.length){
                        return formula.error.v;
                    }

                    type = "row";

                    for(var i = 0; i < data_include.data.length; i++){
                        var txt = data_include.data[i][0].v;

                        if(isRealNull(txt)){
                            txt = 0;
                        }

                        if(getObjType(txt) == "boolean"){

                        }
                        else if(getObjType(txt) == "string" && (txt.toLowerCase() == "true" || txt.toLowerCase() == "false")){
                            if(txt.toLowerCase() == "true"){
                                txt = true;
                            }
                            else if(txt.toLowerCase() == "false"){
                                txt = false;
                            }
                        }
                        else if(isRealNum(txt)){
                            txt = parseFloat(txt);

                            txt = txt == 0 ? false : true;
                        }
                        else{
                            return formula.error.v;
                        }

                        include.push(txt);
                    }
                }

                if(data_include.data[0].length > 1){
                    if(data_include.data[0].length != array[0].length){
                        return formula.error.v;
                    }

                    type = "col";

                    for(var i = 0; i < data_include.data[0].length; i++){
                        var txt = data_include.data[0][i].v;

                        if(isRealNull(txt)){
                            txt = 0;
                        }

                        if(getObjType(txt) == "boolean"){

                        }
                        else if(getObjType(txt) == "string" && (txt.toLowerCase() == "true" || txt.toLowerCase() == "false")){
                            if(txt.toLowerCase() == "true"){
                                txt = true;
                            }
                            else if(txt.toLowerCase() == "false"){
                                txt = false;
                            }
                        }
                        else if(isRealNum(txt)){
                            txt = parseFloat(txt);

                            txt = txt == 0 ? false : true;
                        }
                        else{
                            return formula.error.v;
                        }

                        include.push(txt);
                    }
                }
            }
            else{
                return formula.error.v;
            }

            //如果包含数组中的所有值都为空(filter不返回任何值)，则返回的值
            var if_empty = "";
            if(arguments.length == 3){
                if_empty = func_methods.getFirstValue(arguments[2], "text");
                if(valueIsError(if_empty)){
                    return if_empty;
                }
            }

            //计算
            var result = [];
            if(type == "row"){
                for(var i = 0; i < array.length; i++){
                    if(include[i]){
                        result.push(array[i]);
                    }
                }
            }
            else{
                for(var i = 0; i < array.length; i++){
                    var rowArr = [];

                    for(var j = 0; j < array[0].length; j++){
                        if(include[j]){
                            rowArr.push(array[i][j]);
                        }
                    }

                    if(rowArr.length > 0){
                        result.push(rowArr);
                    }
                }
            }

            if(result.length == 0){
                return if_empty;
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "UNIQUE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //从其返回唯一值的数组或区域
            var data_array = arguments[0];
            var array = [];

            if(getObjType(data_array) == "array"){
                if(getObjType(data_array[0]) == "array" && !func_methods.isDyadicArr(data_array)){
                    return formula.error.v;
                }

                array = func_methods.getDataDyadicArr(data_array);
            }
            else if(getObjType(data_array) == "object" && data_array.startCell != null){
                array = func_methods.getCellDataDyadicArr(data_array, "number");
            }
            else{
                var rowArr = [];

                rowArr.push(parseFloat(data_array));

                array.push(rowArr);
            }

            //逻辑值，指示如何比较；按行 = FALSE 或省略；按列 = TRUE
            var by_col = false;
            if(arguments.length >= 2){
                by_col = func_methods.getCellBoolen(arguments[1]);

                if(valueIsError(by_col)){
                    return by_col;
                }
            }

            //逻辑值，仅返回唯一值中出现一次 = TRUE；包括所有唯一值 = FALSE 或省略
            var occurs_once = false;
            if(arguments.length == 3){
                occurs_once = func_methods.getCellBoolen(arguments[2]);

                if(valueIsError(occurs_once)){
                    return occurs_once;
                }
            }

            //计算
            if(by_col){
                array = array[0].map(function(col, a){
                    return array.map(function(row){
                        return row[a];
                    });
                });

                var strObj = {}, strArr = [];
                var allUnique = [];

                for(var i = 0; i < array.length; i++){
                    var str = '';

                    for(var j = 0; j < array[i].length; j++){
                        str += array[i][j].toString() + "|||";
                    }

                    strArr.push(str);

                    if(!(str in strObj)){
                        strObj[str] = 0;

                        allUnique.push(array[i]);
                    }
                }

                if(occurs_once){
                    var oneUnique = [];

                    for(var i = 0; i < strArr.length; i++){
                        if(strArr.indexOf(strArr[i]) == strArr.lastIndexOf(strArr[i])){
                            oneUnique.push(array[i]);
                        }
                    }

                    oneUnique = oneUnique[0].map(function(col, a){
                        return oneUnique.map(function(row){
                            return row[a];
                        });
                    });

                    return oneUnique;
                }
                else{
                    allUnique = allUnique[0].map(function(col, a){
                        return allUnique.map(function(row){
                            return row[a];
                        });
                    });

                    return allUnique;
                }
            }
            else{
                var strObj = {}, strArr = [];
                var allUnique = [];

                for(var i = 0; i < array.length; i++){
                    var str = '';

                    for(var j = 0; j < array[i].length; j++){
                        str += array[i][j].toString() + "|||";
                    }

                    strArr.push(str);

                    if(!(str in strObj)){
                        strObj[str] = 0;

                        allUnique.push(array[i]);
                    }
                }

                if(occurs_once){
                    var oneUnique = [];

                    for(var i = 0; i < strArr.length; i++){
                        if(strArr.indexOf(strArr[i]) == strArr.lastIndexOf(strArr[i])){
                            oneUnique.push(array[i]);
                        }
                    }

                    return oneUnique;
                }
                else{
                    return allUnique;
                }
            }
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "RANDARRAY": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要返回的行数
            var rows = 1;
            if(arguments.length >= 1){
                rows = func_methods.getFirstValue(arguments[0]);
                if(valueIsError(rows)){
                    return rows;
                }

                if(!isRealNum(rows)){
                    return formula.error.v;
                }

                rows = parseInt(rows);
            }

            //要返回的列数
            var cols = 1;
            if(arguments.length == 2){
                cols = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(cols)){
                    return cols;
                }

                if(!isRealNum(cols)){
                    return formula.error.v;
                }

                cols = parseInt(cols);
            }

            if(rows <= 0 || cols <= 0){
                return formula.error.v;
            }

            //计算
            var result = [];

            for(var i = 0; i < rows; i++){
                var result_row = [];

                for(var j = 0; j < cols; j++){
                    result_row.push(Math.random().toFixed(9));
                }

                result.push(result_row);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "SEQUENCE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            //要返回的行数
            var rows = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(rows)){
                return rows;
            }

            if(!isRealNum(rows)){
                return formula.error.v;
            }

            rows = parseInt(rows);

            //要返回的列数
            var cols = 1;
            if(arguments.length >= 2){
                cols = func_methods.getFirstValue(arguments[1]);
                if(valueIsError(cols)){
                    return cols;
                }

                if(!isRealNum(cols)){
                    return formula.error.v;
                }

                cols = parseInt(cols);
            }

            //序列中的第一个数字
            var start = 1;
            if(arguments.length >= 3){
                start = func_methods.getFirstValue(arguments[2]);
                if(valueIsError(start)){
                    return start;
                }

                if(!isRealNum(start)){
                    return formula.error.v;
                }

                start = parseFloat(start);
            }

            //序列中每个序列值的增量
            var step = 1;
            if(arguments.length == 4){
                step = func_methods.getFirstValue(arguments[3]);
                if(valueIsError(step)){
                    return step;
                }

                if(!isRealNum(step)){
                    return formula.error.v;
                }

                step = parseFloat(step);
            }

            if(rows <= 0 || cols <= 0){
                return formula.error.v;
            }

            //计算
            var result = [];

            for(var i = 0; i < rows; i++){
                var result_row = [];

                for(var j = 0; j < cols; j++){
                    var number = start + step * (j + cols * i);
                    result_row.push(number);
                }

                result.push(result_row);
            }

            return result;
        }
        catch (e) {
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "EVALUATE": function() {
        //必要参数个数错误检测
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        //参数类型错误检测
        for (var i = 0; i < arguments.length; i++) {
            var p = formula.errorParamCheck(this.p, arguments[i], i);

            if (!p[0]) {
                return formula.error.v;
            }
        }

        try {
            var cell_r = window.luckysheetCurrentRow;
            var cell_c = window.luckysheetCurrentColumn;
            var sheetindex_now = window.luckysheetCurrentIndex;
            //公式文本
            var strtext = func_methods.getFirstValue(arguments[0]).toString();
            if(valueIsError(strtext)){
                return strtext;
            }
            //在文本公式前面添加=
            if(strtext.trim().indexOf('=')!=0)
            {
                strtext ='='+strtext;
            }
            //console.log(strtext);
            var result_this = formula.execstringformula(strtext,cell_r,cell_c,sheetindex_now);
            return result_this[1];
        }
        catch (e) {
            var err = e;
            //计算错误检测
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
    "REMOTE": function() {
        if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
            return formula.error.na;
        }

        try {
            const cellRow = window.luckysheetCurrentRow;
            const cellColumn = window.luckysheetCurrentColumn;
            const cellFunction = window.luckysheetCurrentFunction;

            const remoteFunction = func_methods.getFirstValue(arguments[0]);
            if(valueIsError(remoteFunction)){
                return remoteFunction;
            }

            luckysheetConfigsetting.remoteFunction(remoteFunction, data => {
                const flowData = editor.deepCopyFlowData(Store.flowdata);
                formula.execFunctionGroup(cellRow, cellColumn, data);
                flowData[cellRow][cellColumn] = {
                    "v": data,
                    "f": cellFunction
                };
                jfrefreshgrid(flowData, [{"row": [cellRow, cellRow], "column": [cellColumn, cellColumn]}]);
            });

            return "Loading...";
        }
        catch (e) {
            console.log(e);
            var err = e;
            err = formula.errorInfo(err);
            return [formula.error.v, err];
        }
    },
};

export default functionImplementation;
