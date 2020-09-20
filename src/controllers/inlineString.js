import {getFontStyleByCell, textTrim} from "../global/getdata";
import locale from '../locale/locale';
import Store from '../store';

export function isInlineStringCell(cell){
    let isIs = cell.ct!=null && cell.ct.t=="inlineStr" && cell.ct.s!=null && cell.ct.s.length>0;
    return isIs; 
}

export function isInlineStringCT(ct){
    let isIs = ct!=null && ct.t=="inlineStr" && ct.s!=null && ct.s.length>0;
    return isIs; 
}

export function updateInlineStringFormat(cell, attr, value, $input){

    

    let s = Store.inlineStringEditCache;
    var  w = window.getSelection(); 
    var range = w.getRangeAt(0);
    if(range.collapsed===true){
        return;
    }

    if(isInlineStringCell(cell)){
        if(Store.inlineStringEditCache==null){
            Store.inlineStringEditCache = JSON.parse(JSON.stringify(cell.ct.s));
        }
    }
    else{
        Store.inlineStringEditCache = [{
            v:cell.v
        }];
    }

    let cac = range.commonAncestorContainer;
    let $textEditor;
    if(cac.id=="luckysheet-rich-text-editor"){
        $textEditor = $(cac);
    }
    else{
        $textEditor = $(cac).closest("#luckysheet-rich-text-editor");
    }
    let $functionbox = $(cac).closest("#luckysheet-functionbox-cell");

    let endContainer = range.endContainer, startContainer = range.startContainer;
    let endOffset = range.endOffset, startOffset = range.startOffset;

    if($textEditor.length>0){
         if(startContainer===endContainer){
            if(startContainer.parentNode.tagName=="SPAN"){
                let span = startContainer.parentNode;
                let content = span.innerHTML;
                let left="" , mid="" , right="";
                let s1=0, s2=startOffset, s3 = endOffset, s4=content.length;
                left = content.substring(s1, s2);
                mid = content.substring(s2, s3);
                right = content.substring(s3, s4);

                let cont = "";
                if(left!=""){
                    cont += "<span style='"+ span.style.cssText +"'>" + left + "</span>";
                }

                if(mid!=""){
                    let styleObj = {};
                    styleObj[attr] = value;
                    let s = getFontStyleByCell(styleObj);
                    let ukey = textTrim(s.substr(0, s.indexOf(':')));
                    let uvalue = textTrim(s.substr(s.indexOf(':')+1));
                    uvalue = uvalue.substr(0, uvalue.length-1);
                    cont += "<span style='"+ upsetClassWithCss(span.style.cssText, ukey, uvalue) +"'>" + mid + "</span>";
                }

                if(right!=""){
                    cont += "<span style='"+ span.style.cssText +"'>" + right + "</span>";
                }

                $(span).replaceWith(cont);
            }
            else{

            }
         }
         else{
             
         }
    }
    else if($functionbox.length>0){

    }
}


export function convertCssToStyleList(cssText){
    if(cssText==null || cssText.length==0){
        return {};
    }
    let cssTextArray = cssText.split(";");
    let styleList = {    
        "ff":"Arial", //font family
        "fc":"#000000",//font color
        "fs":12,//font size
        "cl":0,//strike
        "un":0,//underline
        "bl":0,//blod
        "it":0,//italic
    };

    const _locale = locale();
    const locale_fontarray = _locale.fontarray;
    const locale_fontjson = _locale.fontjson;
    
    cssTextArray.forEach(s => {
        s = s.toLowerCase();
        let key = textTrim(s.substr(0, s.indexOf(':')));
        let value = textTrim(s.substr(s.indexOf(':') + 1));
        if(key=="font-weight"){
            if(value=="bold"){
                styleList["bl"] = 1;
            }
            else{
                styleList["bl"] = 0;
            }
        }

        if(key=="font-style"){
            if(value=="italic"){
                styleList["it"] = 1;
            }
            else{
                styleList["it"] = 0;
            }
        }

        if(key=="font-family"){
            let ff = locale_fontjson[value];
            if(ff==null){
                styleList["ff"] = value;
            }
            else{
                styleList["ff"] = ff;
            }
        }

        if(key=="font-size"){
            styleList["fs"] = parseInt(value);
        }

        if(key=="color"){
            styleList["fc"] = value;
        }

        if(key=="text-decoration"){
            if(value=="line-through"){
                styleList["cl"] = 1;
            }
            else{
                if(value=="underline"){
                    styleList["un"] = 1;
                }
                else{
                    styleList["cl"] = 0;
                }
            }
        }

        if(key=="lucky-strike"){
            styleList["cl"] = value;
        }

        if(key=="lucky-underline"){
            styleList["un"] = value;
        }

    });

    return styleList;
}

function upsetClassWithCss(cssText, ukey, uvalue){
    let cssTextArray = cssText.split(";");
    let newCss = "";
    if(cssText.indexOf(ukey)>-1){
        for(let i=0;i<cssTextArray.length;i++){
            let s = cssTextArray[i];
            s = s.toLowerCase();
            let key = textTrim(s.substr(0, s.indexOf(':')));
            let value = textTrim(s.substr(s.indexOf(':') + 1));
            if(ukey==key){
                newCss += key + ":" + uvalue + ";";
            }
            else{
                newCss += key + ":" + value + ";";
            }
        }
    }
    else{
        cssText += ukey + ":" + uvalue + ";"; 
    }

    return cssText;
}

function removeClassWidthCss(cssText, ukey){
    let cssTextArray = cssText.split(";");
    let newCss = "";
    if(cssText.indexOf(ukey)>-1){
        for(let i=0;i<cssTextArray.length;i++){
            let s = cssTextArray[i];
            s = s.toLowerCase();
            let key = textTrim(s.substr(0, s.indexOf(':')));
            let value = textTrim(s.substr(s.indexOf(':') + 1));
            if(ukey==key){
                continue;
            }
            else{
                newCss += key + ":" + value + ";";
            }
        }
    }

    return cssText;
}



