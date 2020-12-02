import { hasChinaword } from './validate';
import dayjs from 'dayjs'

function isdatetime(s) {
    if (s == null || s.toString().length < 5) {
        return false;
    }
    else if(checkDateTime(s)){
        return true;
    }
    else {
        return false;
    }

    function checkDateTime(str){
        var reg1 = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;
        var reg2 = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;

        if(!reg1.test(str) && !reg2.test(str)){
            return false;
        }

        var year = RegExp.$1,
            month = RegExp.$2,
            day = RegExp.$3;

        if(year < 1900){
            return false;
        }

        if(month > 12){
            return false;
        }

        if(day > 31){
            return false;
        }

        if(month == 2){
            if(new Date(year, 1, 29).getDate() == 29 && day > 29){
                return false;
            }
            else if(new Date(year, 1, 29).getDate() != 29 && day > 28){
                return false;
            }
        }

        return true;
    }
}

function diff(now, then) {
    return dayjs(now).diff(dayjs(then));
}

function isdatatypemulti(s) {
    let type = {};

    if (isdatetime(s)) {
        type["date"] = true;
    }

    if (!isNaN(parseFloat(s)) && !hasChinaword(s)) {
        type["num"] = true;
    }

    return type;
}

function isdatatype(s) {
    let type = "string";

    if (isdatetime(s)) {
        type = "date";
    }
    else if (!isNaN(parseFloat(s)) && !hasChinaword(s)) {
        type = "num";
    }

    return type;
}

export {
    isdatetime,
    diff,
    isdatatypemulti,
    isdatatype,
}
