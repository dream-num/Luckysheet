import {getFontStyleByCell, textTrim} from "../global/getdata";
import {selectTextContent,selectTextContentCross,selectTextContentCollapse} from '../global/cursorPos';
import locale from '../locale/locale';
import Store from '../store';

export const inlineStyleAffectAttribute = {"bl":1, "it":1 , "ff":1, "cl":1, "un":1,"fs":1,"fc":1};
export const inlineStyleAffectCssName = {"font-weight":1, "font-style":1 , "font-family":1, "text-decoration":1, "border-bottom":1,"font-size":1,"color":1};

export function isInlineStringCell(cell){
    let isIs = cell && cell.ct!=null && cell.ct.t=="inlineStr" && cell.ct.s!=null && cell.ct.s.length>0;
    return isIs; 
}

export function isInlineStringCT(ct){
    let isIs = ct!=null && ct.t=="inlineStr" && ct.s!=null && ct.s.length>0;
    return isIs; 
}

export function updateInlineStringFormat(cell, attr, value, $input){
    // let s = Store.inlineStringEditCache;
    var  w = window.getSelection(); 
    var range;
    if(w.type=="None"){
        range = Store.inlineStringEditRange;
    }
    else{
        range = w.getRangeAt(0);
    } 
    

    // if(isInlineStringCell(cell)){
    //     if(Store.inlineStringEditCache==null){
    //         Store.inlineStringEditCache = JSON.parse(JSON.stringify(cell.ct.s));
    //     }
    // }
    // else{
    //     Store.inlineStringEditCache = [{
    //         v:cell.v
    //     }];
    // }

    let cac = range.commonAncestorContainer;
    let $textEditor;
    if(cac.id=="luckysheet-rich-text-editor"){
        $textEditor = $(cac);
    }
    else{
        $textEditor = $(cac).closest("#luckysheet-rich-text-editor");
    }
    let $functionbox = $(cac).closest("#luckysheet-functionbox-cell");

    if($textEditor.length==0 && $functionbox.length==0 && Store.inlineStringEditRange!=null){
        range = Store.inlineStringEditRange;
        cac = range.commonAncestorContainer;
        if(cac.id=="luckysheet-rich-text-editor"){
            $textEditor = $(cac);
        }
        else{
            $textEditor = $(cac).closest("#luckysheet-rich-text-editor");
        }
        $functionbox = $(cac).closest("#luckysheet-functionbox-cell");
    }

    if(range.collapsed===true){
        return;
    }

    let endContainer = range.endContainer, startContainer = range.startContainer;
    let endOffset = range.endOffset, startOffset = range.startOffset;

    if($textEditor.length>0){
        if(startContainer===endContainer){
            let span = startContainer.parentNode, spanIndex, inherit=false;
            
            let content = span.innerText;

            let fullContent = $textEditor.html();
            if(fullContent.substr(0,5) != "<span"){
                inherit = true;
            }

            let left="" , mid="" , right="";
            let s1=0, s2=startOffset, s3 = endOffset, s4=content.length;
            left = content.substring(s1, s2);
            mid = content.substring(s2, s3);
            right = content.substring(s3, s4);

            let cont = "";
            if(left!=""){
                let cssText = span.style.cssText;
                if(inherit){
                    let box = $(span).closest("#luckysheet-input-box").get(0);
                    if(box!=null){
                        cssText = extendCssText(box.style.cssText, cssText);
                    }
                }
                cont += "<span style='"+ cssText +"'>" + left + "</span>";
            }

            if(mid!=""){
                // let styleObj = {};
                // styleObj[attr] = value;
                // let s = getFontStyleByCell(styleObj, undefined, undefined, false);
                // let ukey = textTrim(s.substr(0, s.indexOf(':')));
                // let uvalue = textTrim(s.substr(s.indexOf(':')+1));
                // uvalue = uvalue.substr(0, uvalue.length-1);
                // let cssText = span.style.cssText;
                // cssText = removeClassWidthCss(cssText, attr);

                let cssText = getCssText(span.style.cssText, attr, value);

                if(inherit){
                    let box = $(span).closest("#luckysheet-input-box").get(0);
                    if(box!=null){
                        cssText = extendCssText(box.style.cssText, cssText);
                    }
                }
                
                cont += "<span style='"+ cssText +"'>" + mid + "</span>";
            }

            if(right!=""){
                let cssText = span.style.cssText;
                if(inherit){
                    let box = $(span).closest("#luckysheet-input-box").get(0);
                    if(box!=null){
                        cssText = extendCssText(box.style.cssText, cssText);
                    }
                }
                cont += "<span style='"+ cssText +"'>" + right + "</span>";
            }

            if(startContainer.parentNode.tagName=="SPAN"){
                spanIndex = $textEditor.find("span").index(span);
                $(span).replaceWith(cont);
            }
            else{
                spanIndex = 0;
                $(span).html(cont);
            }
            

            let seletedNodeIndex = 0;
            if(s1==s2){
                seletedNodeIndex  = spanIndex;
            }
            else{
                seletedNodeIndex  = spanIndex+1;
            }

            selectTextContent($textEditor.find("span").get(seletedNodeIndex));
        }
        else{
            if(startContainer.parentNode.tagName=="SPAN" && endContainer.parentNode.tagName=="SPAN"){
                let startSpan = startContainer.parentNode, startSpanIndex;
                let endSpan = endContainer.parentNode, endSpanIndex;

                startSpanIndex = $textEditor.find("span").index(startSpan);
                endSpanIndex = $textEditor.find("span").index(endSpan);

                let startContent = startSpan.innerHTML, endContent = endSpan.innerHTML;
                let sleft="" , sright="", eleft="" , eright="";
                let s1=0, s2=startOffset, s3 = endOffset, s4=endContent.length;

                sleft = startContent.substring(s1, s2);
                sright = startContent.substring(s2, startContent.length);

                eleft = endContent.substring(0, s3);
                eright = endContent.substring(s3, s4);
                let spans = $textEditor.find("span");
                let replaceSpans = spans.slice(startSpanIndex, endSpanIndex+1);
                let cont = "";
                for(let i=0;i<startSpanIndex;i++){
                    let span = spans.get(i), content = span.innerHTML;
                    cont += "<span style='"+ span.style.cssText +"'>" + content + "</span>";
                }
                if(sleft!=""){
                    cont += "<span style='"+ startSpan.style.cssText +"'>" + sleft + "</span>";
                }

                if(sright!=""){
                    let cssText = getCssText(startSpan.style.cssText, attr, value);
                    cont += "<span style='"+ cssText +"'>" + sright + "</span>";
                }

                if(startSpanIndex<endSpanIndex){
                    for(let i=startSpanIndex+1;i<endSpanIndex;i++){
                        let span = spans.get(i), content = span.innerHTML;
                        let cssText = getCssText(span.style.cssText, attr, value);
                        cont += "<span style='"+ cssText +"'>" + content + "</span>";
                    }
                }

                if(eleft!=""){
                    let cssText = getCssText(endSpan.style.cssText, attr, value);
                    cont += "<span style='"+ cssText +"'>" + eleft + "</span>";
                }                
                
                if(eright!=""){
                    cont += "<span style='"+ endSpan.style.cssText +"'>" + eright + "</span>";
                }

                for(let i=endSpanIndex+1;i<spans.length;i++){
                    let span = spans.get(i), content = span.innerHTML;
                    cont += "<span style='"+ span.style.cssText +"'>" + content + "</span>";
                }

                $textEditor.html(cont);

                // console.log(replaceSpans, cont);
                // replaceSpans.replaceWith(cont);

                let startSeletedNodeIndex, endSeletedNodeIndex;
                if(s1==s2){
                    startSeletedNodeIndex  = startSpanIndex;
                    endSeletedNodeIndex = endSpanIndex;
                }
                else{
                    startSeletedNodeIndex  = startSpanIndex+1;
                    endSeletedNodeIndex = endSpanIndex+1;
                }

                spans = $textEditor.find("span");

                selectTextContentCross(spans.get(startSeletedNodeIndex), spans.get(endSeletedNodeIndex));
            }
        }
    }
    else if($functionbox.length>0){

    }
}

export function enterKeyControll(cell){
    var  w = window.getSelection(); 
    
    if(w.type=="None"){
        return
    }
    var range = w.getRangeAt(0);
    let cac = range.commonAncestorContainer;
    let $textEditor;
    if(cac.id=="luckysheet-rich-text-editor"){
        $textEditor = $(cac);
    }
    else{
        $textEditor = $(cac).closest("#luckysheet-rich-text-editor");
    }
    let $functionbox = $(cac).closest("#luckysheet-functionbox-cell");

    // if(range.collapsed===true){
    //     return;
    // }

    let endContainer = range.endContainer, startContainer = range.startContainer;
    let endOffset = range.endOffset, startOffset = range.startOffset;
    
    if($textEditor.length>0){
        let startSpan = startContainer.parentNode;
        if(startContainer.id=="luckysheet-rich-text-editor"){
            startSpan = $(startContainer).find("span");
            if(startSpan.length==0){
                // 在末尾换行操作会导致数据丢失(覆盖)
                startContainer.innerHTML = `<span>${startContainer.innerText}</span>`;
                startSpan = $(startContainer).find("span");
            }
            startSpan = startSpan.get(startSpan.length-1);
            startOffset = startSpan.innerHTML.length;
        }
        // let startSpanIndex = $textEditor.find("span").index(startSpan);
        if(range.collapsed===false){
            range.deleteContents();
        }

        // 如果拷贝的内容为：pc&web ，那么innerHTML得到的值为：pc&amp;web ，执行换行操作存在问题
        // let startContent = startSpan.innerHTML; 
        let startContent = startSpan.innerText;
        let sleft="" , sright="";
        let s1=0, s2=startOffset;

        sleft = startContent.substring(s1, s2);
        sright = startContent.substring(s2, startContent.length);

        
        let spanIndex,cont;
        if(startContainer.parentNode.tagName=="SPAN"){
            let textSpan = $textEditor.find("span");
            spanIndex = textSpan.index(startSpan);
            if((spanIndex==textSpan.length-1) && sright==""){
                let txt = textSpan[spanIndex].innerHTML;
                if(txt.substr(txt.length-1, 1)=="\n"){
                    cont = "<span style='"+ startSpan.style.cssText +"'>" + sleft + "\n" + "</span>";
                }
                else{
                    cont = "<span style='"+ startSpan.style.cssText +"'>" + sleft + "\n\n" + "</span>";
                }
                
            }
            else{
                cont = "<span style='"+ startSpan.style.cssText +"'>" + sleft + "\n" + sright + "</span>";
            }
            
            $(startSpan).replaceWith(cont);
        }
        else{
            // 这里不能取整个单元格的样式，因为如果设置了部分样式的话就会出问题
            // let cssText = getFontStyleByCell(cell);
            
            let cssText = startSpan.style.cssText;

            if(sright==""){
                cont = "<span style='"+ cssText +"'>" + sleft + "\n\n" + "</span>";
            }
            else{
                cont = "<span style='"+ cssText +"'>" + sleft + "\n" + sright + "</span>";
            }
            
            if(startContainer.id=="luckysheet-rich-text-editor"){
                $(startSpan).replaceWith(cont);
                let textSpan = $textEditor.find("span");
                spanIndex = textSpan.length-1;
                startOffset = textSpan.get(spanIndex).innerHTML.length-1;
            }
            else{
                $(startSpan).html(cont);
                spanIndex = 0;
            }
            
        }

        selectTextContentCollapse($textEditor.find("span").get(spanIndex), startOffset+1);

    }
    else if($functionbox.length>0){

    }
}

export function updateInlineStringFormatOutside(cell, key, value){
    if(cell.ct==null){
        return;
    }
    let s = cell.ct.s;
    if(s==null){
        return;
    }
    for(let i=0;i<s.length;i++){
        let item = s[i];
        item[key] = value;
    }
}

export function convertSpanToShareString($dom){
    let styles = [], preStyleList, preStyleListString=null;
    for(let i=0;i<$dom.length;i++){
        let span = $dom.get(i);
        let styleList = convertCssToStyleList(span.style.cssText);

        let curStyleListString = JSON.stringify(styleList);
        // let v = span.innerHTML;
        let v = span.innerText;
        v = v.replace(/\n/g, "\r\n");

        if(curStyleListString==preStyleListString){
            preStyleList.v += v;
        }
        else{
            styleList.v = v;
            styles.push(styleList); 

            preStyleListString = curStyleListString;
            preStyleList = styleList;
        }
    }
    return styles;
}

export function convertCssToStyleList(cssText){
    if(cssText==null || cssText.length==0){
        return {};
    }
    let cssTextArray = cssText.split(";");


    const _locale = locale();
    const locale_fontarray = _locale.fontarray;
    const locale_fontjson = _locale.fontjson;
    let styleList = {    
        "ff":locale_fontarray[0], //font family
        "fc":"#000000",//font color
        "fs":10,//font size
        "cl":0,//strike
        "un":0,//underline
        "bl":0,//blod
        "it":0,//italic
    };
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
                styleList["cl"] = 1;
        }

        if(key=="border-bottom"){
            styleList["un"] = 1;
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

const luckyToCssName = {
    "bl":"font-weight",
    "it":"font-style",
    "ff":"font-family",
    "fs":"font-size",
    "fc":"color",
    "cl":"text-decoration",
    "un":"border-bottom",
}

function getClassWithcss(cssText, ukey){
    let cssTextArray = cssText.split(";");
    if(ukey==null || ukey.length==0){
        return cssText;
    }
    if(cssText.indexOf(ukey)>-1){
        for(let i=0;i<cssTextArray.length;i++){
            let s = cssTextArray[i];
            s = s.toLowerCase();
            let key = textTrim(s.substr(0, s.indexOf(':')));
            let value = textTrim(s.substr(s.indexOf(':') + 1));
            if(key==ukey){
                return value;
            }
        }
    }

    return "";
}

function upsetClassWithCss(cssText, ukey, uvalue){
    let cssTextArray = cssText.split(";");
    let newCss = "";
    if(ukey==null || ukey.length==0){
        return cssText;
    }
    if(cssText.indexOf(ukey)>-1){
        for(let i=0;i<cssTextArray.length;i++){
            let s = cssTextArray[i];
            s = s.toLowerCase();
            let key = textTrim(s.substr(0, s.indexOf(':')));
            let value = textTrim(s.substr(s.indexOf(':') + 1));
            if(key==ukey){
                newCss += key + ":" + uvalue + ";";
            }
            else if(key.length>0){
                newCss += key + ":" + value + ";";
            }
        }
    }
    else if(ukey.length>0){
        cssText += ukey + ":" + uvalue + ";"; 
        newCss = cssText;
    }

    return newCss;
}

function removeClassWidthCss(cssText, ukey){
    let cssTextArray = cssText.split(";");
    let newCss = "";
    let oUkey = ukey;
    if(ukey==null || ukey.length==0){
        return cssText;
    }
    if(ukey in luckyToCssName){
        ukey = luckyToCssName[ukey];
    }
    if(cssText.indexOf(ukey)>-1){
        for(let i=0;i<cssTextArray.length;i++){
            let s = cssTextArray[i];
            s = s.toLowerCase();
            let key = textTrim(s.substr(0, s.indexOf(':')));
            let value = textTrim(s.substr(s.indexOf(':') + 1));
            if(key==ukey || (oUkey=="cl" && key=="lucky-strike") || (oUkey=="un" && key=="lucky-underline") ){
                continue;
            }
            else if(key.length>0){
                newCss += key + ":" + value + ";";
            }
        }
    }
    else{
        newCss = cssText;
    }

    return newCss;
}

function getCssText(cssText, attr, value){
    let styleObj = {};
    styleObj[attr] = value;
    if(attr=="un"){
        let fontColor = getClassWithcss(cssText,"color");
        if(fontColor==""){
            fontColor = "#000000";
        }
        let fs = getClassWithcss(cssText,"font-size");
        if(fs==""){
            fs = 11;
        }
        fs = parseInt(fs);
        styleObj["_fontSize"] = fs;
        styleObj["_color"] = fontColor;
    }
    let s = getFontStyleByCell(styleObj, undefined, undefined, false);
    let ukey = textTrim(s.substr(0, s.indexOf(':')));
    let uvalue = textTrim(s.substr(s.indexOf(':')+1));
    uvalue = uvalue.substr(0, uvalue.length-1);
    // let cssText = span.style.cssText;
    cssText = removeClassWidthCss(cssText, attr);

    cssText = upsetClassWithCss(cssText, ukey, uvalue);

    return cssText;
}

function extendCssText(origin, cover, isLimit=true){
    let originArray = origin.split(";");
    let coverArray = cover.split(";");
    let newCss = "";
    
    let addKeyList = {};
    for(let i=0;i<originArray.length;i++){
        let so = originArray[i], isAdd=true;
        so = so.toLowerCase();
        let okey = textTrim(so.substr(0, so.indexOf(':')));

        /* 不设置文字的大小，解决设置删除线等后字体变大的问题 */
        if(okey == "font-size"){
            continue;
        }

        let ovalue = textTrim(so.substr(so.indexOf(':') + 1));

        if(isLimit){
            if(!(okey in inlineStyleAffectCssName)){
                continue;
            }
        }

        for(let a=0;a<coverArray.length;a++){
            let sc = coverArray[a];
            sc = sc.toLowerCase();
            let ckey = textTrim(sc.substr(0, sc.indexOf(':')));
            let cvalue = textTrim(sc.substr(sc.indexOf(':') + 1));

            if(okey==ckey){
                newCss += ckey + ":" + cvalue + ";";
                isAdd = false;
                continue;
            }
        }

        if(isAdd){
            newCss += okey + ":" + ovalue + ";";
        }

        addKeyList[okey] = 1;
    }

    for(let a=0;a<coverArray.length;a++){
        let sc = coverArray[a];
        sc = sc.toLowerCase();
        let ckey = textTrim(sc.substr(0, sc.indexOf(':')));
        let cvalue = textTrim(sc.substr(sc.indexOf(':') + 1));

        if(isLimit){
            if(!(ckey in inlineStyleAffectCssName)){
                continue;
            }
        }

        if(!(ckey in addKeyList)){
            newCss += ckey + ":" + cvalue + ";";
        }
    }

    return newCss;
}





