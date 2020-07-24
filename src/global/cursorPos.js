function luckysheetRangeLast(obj) {
    let range;
    
    if(document.createRange){ //chrome, firefox, opera, safari, ie9+
        if(obj.innerHTML != obj.innerText || obj.innerHTML == ""){
            obj.focus(); //解决ff不获取焦点无法定位问题
            range = window.getSelection();//创建range
            range.selectAllChildren(obj);//range 选择obj下所有子内容
            range.collapseToEnd();//光标移至最后
        }
        else{
            let len = obj.innerText.length;

            range = document.createRange();
            range.selectNodeContents(obj);
            range.setStart(obj.childNodes[0], len);
            range.collapse(true);

            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);    
        }
    }
    else if(document.selection){ //ie8 and lower
        range = document.body.createTextRange();
        range.moveToElementText(obj);
        range.collapse(false);
        range.select();
    }
}

function getCursortPosition(textDom){
    let cursorPos = 0;
    
    if(document.selection){
        textDom.focus();
        let selectRange = document.selection.createRange();
        selectRange.moveStart("character", -textDom.value.length);
        cursorPos = selectRange.text.length;
    }
    else if(textDom.selectionStart || textDom.selectionStart == "0"){
        cursorPos = textDom.selectionStart;
    }

    return cursorPos;
}

export {
    luckysheetRangeLast,
    getCursortPosition,
}