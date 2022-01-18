import Store from '../store';

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

function hideMenuByCancel(event){

    // Right-click the menu in the title bar, and click on the elements whose class is luckysheet-cols-rows-shift-left and luckysheet-cols-rows-shift-right will trigger the hiding of the menu bar. It should be prohibited. Exclude these two elements. There may be more Other elements will also jump here for more testing

    if(event.target.classList && (event.target.classList.contains('luckysheet-cols-rows-shift-left') || event.target.classList.contains('luckysheet-cols-rows-shift-right'))){
        return;
    }

    if (!$(event.target).hasClass("luckysheet-mousedown-cancel") && $(event.target).filter("[class*='sp-palette']").length == 0 && $(event.target).filter("[class*='sp-thumb']").length == 0 && $(event.target).filter("[class*='sp-']").length == 0) {
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-cols-h-hover").hide();
        $("#luckysheet-cols-menu-btn").hide();
        // $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu").hide();
        $("body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu").hide();
        //$("body > luckysheet-menuButton").hide();
        Store.luckysheet_cols_menu_status = false;
    }
}

function selectTextDom(ele){
    if (window.getSelection) {
        let range = document.createRange();
        range.selectNodeContents(ele);
        if(range.startContainer && isInPage(range.startContainer)){
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
    else if (document.selection) {
        let range = document.body.createTextRange();
        range.moveToElementText(ele);
        range.select();
    } 
}

function selectTextContent(ele){
    if (window.getSelection) {
        let range = document.createRange();
        var content=ele.firstChild;
        range.setStart(content,0);
        range.setEnd(content,content.length);
        if(range.startContainer && isInPage(range.startContainer)){
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
    else if (document.selection) {
        let range = document.body.createTextRange();
        range.moveToElementText(ele);
        range.select();
    } 
}

function selectTextContentCross(sEle, eEle){
    if (window.getSelection) {
        let range = document.createRange();
        var sContent=sEle.firstChild, eContent=eEle.firstChild;
        range.setStart(sContent,0);
        range.setEnd(eContent,eContent.length);
        if(range.startContainer && isInPage(range.startContainer)){
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
}

function selectTextContentCollapse(sEle, index){
    if (window.getSelection) {
        let range = document.createRange();
        var sContent=sEle.firstChild;
        if(index>sContent.length){
            index=sContent.length;
        }
        else if(index<0){
            index = 0;
        }
        range.setStart(sContent,index);
        range.collapse(true);
        if(range.startContainer && isInPage(range.startContainer)){
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }

    }
}

function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
}

export {
    luckysheetRangeLast,
    getCursortPosition,
    hideMenuByCancel,
    selectTextContent,
    selectTextDom,
    selectTextContentCross,
    selectTextContentCollapse
}