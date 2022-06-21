import locale from '../locale/locale';
import Store from '../store';
import luckysheetConfigsetting from './luckysheetConfigsetting';
import { getObjType } from '../utils/util';
import { createToolbarHtml } from './toolbar';
//dom variable
const gridHTML = function(){ 
    const _locale = locale();
    const locale_info = _locale.info;
    const locale_print = _locale.print;
    const userInfo = luckysheetConfigsetting.userInfo === true ? '<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky' : luckysheetConfigsetting.userInfo; // When true, use the default HTML string. The rendering of userInfo below uses nested template strings. Otherwise, when display is used and the image path is not passed in, there will be an undefined request

    return `<div class="luckysheet">
                    <canvas id="luckysheetTableContentF" style="display:none;" class="luckysheetTableContent"></canvas> 
                    <div class="luckysheet-work-area luckysheet-noselected-text"> 
                        <div id ="luckysheet_info_detail" class="luckysheet_info_detail"> 
                            <div data-tips="${locale_info.return}" id="luckysheet_info_detail_title" class="luckysheet_info_detail_back"> 
                                <i style="color:#444D5A;" class="fa fa-angle-left fa-2x" aria-hidden="true"></i> 
                            </div> 
                            <div class="luckysheet-share-logo" title="\${logotitle}"></div>
                            <div class="sheet-name"> 
                                <input data-tips="${locale_info.tips}" id="luckysheet_info_detail_input" class="luckysheet_info_detail_input luckysheet-mousedown-cancel" value="${locale_info.noName}" tabindex="0" dir="ltr" aria-label="${locale_info.rename}" style="visibility: visible; width: 149px;" data-tooltip="${locale_info.rename}"> 
                            </div> 
                            <div id="luckysheet_info_detail_update" class="luckysheet_info_detail_update"> ${locale_info.detailUpdate} </div> 
                            <div id="luckysheet_info_detail_save" class="luckysheet_info_detail_save"> ${locale_info.wait} </div>
                            
                            \${functionButton}
                            
                            ${getObjType(userInfo) === 'string' ? `<div class="luckysheet_info_detail_user">
                            <span id="luckysheet_info_detail_user">${userInfo}</span></div>` : ''}

                            ${getObjType(userInfo) === 'object' ? `<div class="luckysheet_info_detail_user">                            
                            <img src="${userInfo.userImage}" id="luckysheet_info_detail_user_img">
                            <span id="luckysheet_info_detail_user">${userInfo.userName}</span>
                            </div>` : ''}
                            
                        </div> 
                        <div id="luckysheet-wa-editor" class="luckysheet-wa-editor toolbar"> \${menu} </div> 
                        <div id="luckysheet-wa-calculate" class="luckysheet-wa-calculate"> 
                            <div class="luckysheet-wa-calculate-size" id="luckysheet-wa-calculate-size"></div> 
                            <div class="luckysheet-wa-calculate-help"> 
                                <div class="luckysheet-wa-calculate-help-box"> 
                                    <div spellcheck="false" aria-hidden="false" id="luckysheet-helpbox">
                                        <div id="luckysheet-helpbox-cell" class="luckysheet-helpbox-cell-input luckysheet-mousedown-cancel" tabindex="0" contenteditable="true" dir="ltr" aria-autocomplete="list"></div>
                                    </div> 
                                </div>  
                                <div class="luckysheet-wa-calculate-help-tool">
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div> 
                            </div> 
                            <div id="luckysheet-wa-functionbox-cancel" class="luckysheet-wa-functionbox">
                                <span><i class="iconfont luckysheet-iconfont-qingchu" aria-hidden="true"></i></span>
                            </div> 
                            <div id="luckysheet-wa-functionbox-confirm" class="luckysheet-wa-functionbox">
                                <span><i class="iconfont luckysheet-iconfont-yunhang" aria-hidden="true"></i></span>
                            </div> 
                            <div id="luckysheet-wa-functionbox-fx" class="luckysheet-wa-functionbox">
                                <span><i class="iconfont luckysheet-iconfont-hanshu" aria-hidden="true" style="color:#333"></i></span> 
                            </div> 
                            <div id="luckysheet-functionbox-container" class="luckysheet-mousedown-cancel">
                                <div class="luckysheet-mousedown-cancel" dir="ltr">
                                    <div spellcheck="false" aria-hidden="false" id="luckysheet-functionbox">
                                        <div id="luckysheet-functionbox-cell" class="luckysheet-functionbox-cell-input luckysheet-mousedown-cancel" tabindex="0" contenteditable="true" dir="ltr" aria-autocomplete="list" aria-label="D4"></div>
                                    </div>
                                </div>
                            </div>   
                        </div> 
                    </div> 
                    <div class="luckysheet-grid-container luckysheet-scrollbars-enabled"> 
                        <div class="luckysheet-grid-window"> 
                            <div class="luckysheet-help-sub"></div> 
                            <div class="luckysheet-grid-window-1" id="luckysheet-grid-window-1">
                                <canvas id="luckysheetTableContent" class="luckysheetTableContent"></canvas> 
                                <table class="luckysheet-grid-window-2" cellspacing="0" cellpadding="0" dir="ltr" tabindex="-1" > 
                                    <tbody> 
                                        <tr> 
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div class="luckysheet-left-top" id="luckysheet-left-top"> </div> 
                                            </td> 
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div id="luckysheet-cols-h-c" class="luckysheet-cols-h-c">
                                                    <div class="luckysheet-cols-change-size" id="luckysheet-cols-change-size"></div>  
                                                    <div class="luckysheet-cols-menu-btn luckysheet-mousedown-cancel" id="luckysheet-cols-menu-btn"><i class="fa fa-caret-down luckysheet-mousedown-cancel" aria-hidden="true"></i></div>  
                                                    <div class="luckysheet-cols-h-hover" id="luckysheet-cols-h-hover"></div>  
                                                    <div id="luckysheet-cols-h-selected"></div>  
                                                    <div class="luckysheet-grdusedrange"></div>  
                                                    <div class="luckysheet-grdblkflowpush"></div>  \${columnHeader}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div class="luckysheet-rows-h" id="luckysheet-rows-h"> 
                                                    <div class="luckysheet-rows-change-size" id="luckysheet-rows-change-size"></div> 
                                                    <div class="luckysheet-rows-h-hover" id="luckysheet-rows-h-hover"></div> 
                                                    <div id="luckysheet-rows-h-selected"></div>  
                                                    <div class="luckysheet-grdusedrange"></div>  
                                                    <div class="luckysheet-grdblkflowpush"></div> \${rowHeader}
                                                </div> 
                                            </td>  
                                            <td valign="top" class="luckysheet-paneswrapper">
                                                <div class="luckysheet-cell-loading" id="luckysheet-cell-loading">
                                                    <div class="luckysheet-cell-loading-inner">
                                                        <i class="fa fa-circle-o-notch fa-spin"></i>
                                                        <span></span>
                                                    </div>
                                                </div> 
                                                <div class="luckysheet-cell-freezen"></div> 
                                                <div class="luckysheet-scrollbars luckysheet-scrollbar-ltr luckysheet-scrollbar-x" id="luckysheet-scrollbar-x"><div></div></div> 
                                                <div class="luckysheet-scrollbars luckysheet-scrollbar-ltr luckysheet-scrollbar-y" id="luckysheet-scrollbar-y"><div></div></div> 
                                                <div class="luckysheet-cell-main " id="luckysheet-cell-main">
                                                    <div id="luckysheet-formula-functionrange"></div>  
                                                    <div id="luckysheet-formula-functionrange-select" class="luckysheet-selection-copy luckysheet-formula-functionrange-select">
                                                        <div class="luckysheet-selection-copy-top luckysheet-copy"></div>
                                                        <div class="luckysheet-selection-copy-right luckysheet-copy"></div>
                                                        <div class="luckysheet-selection-copy-bottom luckysheet-copy"></div>
                                                        <div class="luckysheet-selection-copy-left luckysheet-copy"></div>
                                                        <div class="luckysheet-selection-copy-hc"></div>
                                                    </div>  
                                                    <div class="luckysheet-row-count-show luckysheet-count-show" id="luckysheet-row-count-show"></div>
                                                    <div class="luckysheet-column-count-show luckysheet-count-show" id="luckysheet-column-count-show"></div>
                                                    <div class="luckysheet-change-size-line" id="luckysheet-change-size-line"></div>  
                                                    <div class="luckysheet-cell-selected-focus" id="luckysheet-cell-selected-focus"></div>  
                                                    <div id="luckysheet-selection-copy"></div>  
                                                    <div id="luckysheet-chart-rangeShow"></div>
                                                    <div class="luckysheet-cell-selected-extend" id="luckysheet-cell-selected-extend"></div>  
                                                    <div class="luckysheet-cell-selected-move" id="luckysheet-cell-selected-move"></div>  
                                                    <div id="luckysheet-cell-selected-boxs">
                                                        <div id="luckysheet-cell-selected" class="luckysheet-cell-selected">
                                                            <div class="luckysheet-cs-inner-border"></div>
                                                            <div class="luckysheet-cs-fillhandle"></div>
                                                            <div class="luckysheet-cs-inner-border"></div>
                                                            <div class="luckysheet-cs-draghandle-top luckysheet-cs-draghandle"></div>
                                                            <div class="luckysheet-cs-draghandle-bottom luckysheet-cs-draghandle"></div>
                                                            <div class="luckysheet-cs-draghandle-left luckysheet-cs-draghandle"></div>
                                                            <div class="luckysheet-cs-draghandle-right luckysheet-cs-draghandle"></div>
                                                            <div class="luckysheet-cs-touchhandle luckysheet-cs-touchhandle-lt"><div class="luckysheet-cs-touchhandle-btn"></div></div>
                                                            <div class="luckysheet-cs-touchhandle luckysheet-cs-touchhandle-rb"><div class="luckysheet-cs-touchhandle-btn"></div></div>
                                                        </div>
                                                    </div>
                                                    <div id="luckysheet-postil-showBoxs"></div>
                                                    <div id="luckysheet-multipleRange-show"></div>  
                                                    <div id="luckysheet-dynamicArray-hightShow"></div>  
                                                    <div id="luckysheet-image-showBoxs">
                                                        <div id="luckysheet-modal-dialog-activeImage" class="luckysheet-modal-dialog" style="display:none;padding:0;position:absolute;z-index:300;">
                                                            <div class="luckysheet-modal-dialog-border" style="position:absolute;"></div> 
                                                            <div class="luckysheet-modal-dialog-content"></div>  
                                                            <div class="luckysheet-modal-dialog-resize">
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt" data-type="lt"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt" data-type="mt"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm" data-type="lm"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm" data-type="rm"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt" data-type="rt"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb" data-type="lb"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb" data-type="mb"></div>
                                                                <div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb" data-type="rb"></div>
                                                            </div>
                                                            <div class="luckysheet-modal-dialog-controll">
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-crop" role="button" tabindex="0" aria-label="裁剪" title="裁剪">
                                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-restore" role="button" tabindex="0" aria-label="恢复原图" title="恢复原图">
                                                                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del" role="button" tabindex="0" aria-label="删除" title="删除">
                                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div id="luckysheet-modal-dialog-cropping" class="luckysheet-modal-dialog" style="display:none;padding:0;position:absolute;z-index:300;">
                                                            <div class="cropping-mask"></div>
                                                            <div class="cropping-content"></div>
                                                            <div class="luckysheet-modal-dialog-border" style="position:absolute;"></div>
                                                            <div class="luckysheet-modal-dialog-resize">
                                                                <div class="resize-item lt" data-type="lt"></div> 
                                                                <div class="resize-item mt" data-type="mt"></div> 
                                                                <div class="resize-item lm" data-type="lm"></div> 
                                                                <div class="resize-item rm" data-type="rm"></div> 
                                                                <div class="resize-item rt" data-type="rt"></div> 
                                                                <div class="resize-item lb" data-type="lb"></div> 
                                                                <div class="resize-item mb" data-type="mb"></div> 
                                                                <div class="resize-item rb" data-type="rb"></div>
                                                            </div>
                                                            <div class="luckysheet-modal-dialog-controll">
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-crop" role="button" tabindex="0" aria-label="裁剪" title="裁剪">
                                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-restore" role="button" tabindex="0" aria-label="恢复原图" title="恢复原图">
                                                                    <i class="fa fa-window-maximize" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del" role="button" tabindex="0" aria-label="删除" title="删除">
                                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="img-list"></div>
                                                        <div class="cell-date-picker">
                                                            <input id="cellDatePickerBtn" class="formulaInputFocus" readonly="readonly"/>
                                                        </div>
                                                    </div>
                                                    <div id="luckysheet-dataVerification-dropdown-btn"></div>
                                                    <div id="luckysheet-dataVerification-dropdown-List" class="luckysheet-mousedown-cancel"></div>
                                                    <div id="luckysheet-dataVerification-showHintBox" class="luckysheet-mousedown-cancel"></div>
                                                    <div class="luckysheet-cell-copy"></div>  
                                                    <div class="luckysheet-grdblkflowpush"></div>  \${flow} 
                                                </div> 
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </table> 
                            </div> 
                            <div class="luckysheet-sheet-area luckysheet-noselected-text" id="luckysheet-sheet-area">
                                <div id="luckysheet-sheet-content">
                                    <div id="luckysheet-sheets-add" class="luckysheet-sheets-add lucky-button-custom"><i class="iconfont luckysheet-iconfont-jia1"></i></div>
                                    <div id="luckysheet-sheets-m" class="luckysheet-sheets-m lucky-button-custom"><i class="iconfont luckysheet-iconfont-caidan2"></i></div>
                                    <div class="luckysheet-sheet-container" id="luckysheet-sheet-container">
                                        <div class="docs-sheet-fade docs-sheet-fade-left" style="display: none;">
                                            <div class="docs-sheet-fade3"></div>
                                            <div class="docs-sheet-fade2"></div>
                                            <div class="docs-sheet-fade1"></div>
                                        </div>
                                        <div class="docs-sheet-fade docs-sheet-fade-right" style="display: none;">
                                            <div class="docs-sheet-fade1"></div>
                                            <div class="docs-sheet-fade2"></div>
                                            <div class="docs-sheet-fade3"></div>
                                        </div>
                                        <div class="luckysheet-sheet-container-c" id="luckysheet-sheet-container-c"></div>
                                    </div>
                                    <div id="luckysheet-sheets-leftscroll" class="luckysheet-sheets-scroll lucky-button-custom"><i class="fa fa-caret-left"></i></div>
                                    <div id="luckysheet-sheets-rightscroll" class="luckysheet-sheets-scroll lucky-button-custom"><i class="fa fa-caret-right"></i></div>
                                </div>
                            </div> 
                        </div> 
                        <div class="luckysheet-stat-area"> 
                            <div class="luckysheet-sta-c">
                                <div class="luckysheet-zoom-content" id="luckysheet-zoom-content">
                                    <div class="luckysheet-zoom-minus" id="luckysheet-zoom-minus">
                                        <div class="luckysheet-zoom-minus-icon"></div>
                                    </div>
                                    <div class="luckysheet-zoom-slider" id="luckysheet-zoom-slider">
                                        <div class="luckysheet-zoom-line"></div>
                                        <div class="luckysheet-zoom-cursor" id="luckysheet-zoom-cursor"></div>
                                        <div class="luckysheet-zoom-hundred"></div>
                                    </div>
                                    <div class="luckysheet-zoom-plus" id="luckysheet-zoom-plus">
                                        <div class="luckysheet-zoom-plus-icon"></div>
                                    </div>
                                    <div class="luckysheet-zoom-ratioText" id="luckysheet-zoom-ratioText">100%</div>
                                </div>
                                <div class="luckysheet-print-viewList">
                                    <div type="viewNormal" class="luckysheet-print-viewBtn luckysheet-print-viewNormal luckysheet-print-viewBtn-active" title="${locale_print.normalBtn}"><i class="icon iconfont luckysheet-iconfont-putong"></i></div>
                                    <div type="viewLayout" class="luckysheet-print-viewBtn luckysheet-print-viewLayout" title="${locale_print.layoutBtn}"><i class="icon iconfont luckysheet-iconfont-yemianbuju"></i></div>
                                    <div type="viewPage" class="luckysheet-print-viewBtn luckysheet-print-viewPage" title="${locale_print.pageBtn}"><i class="icon iconfont luckysheet-iconfont-fenyeyulan"></i></div>
                                </div>
                                <div class="luckysheet-sta-content" id="luckysheet-sta-content"></div>  
                                <!--<div class="luckysheet-bottom-content" id="luckysheet-bottom-content-show"></div> -->
                            </div> 
                        </div> 
                    </div>
                    <div id="luckysheet-copy-content" contenteditable="true"></div>
                    <input id="luckysheet-copy-btn" type="button" data-clipboard-target="luckysheet-copy-content">
                    <div id="testdpidiv" style="height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;"></div>
                  </div>`;
}

const columeHeader_word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    columeHeader_word_index = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25 },
    flow = '<div id="luckysheet-cell-flow_${index}" class="luckysheet-cell-flow luckysheetsheetchange" style="width:${width}px;"><div class="luckysheet-cell-flow-clip"><div class="luckysheet-grdblkpush"></div>${flow}</div></div>',
    colsmenuHTML = '';

//右键菜单dom
function rightclickHTML(){
    const _locale = locale();
    const rightclick = _locale.rightclick;
    const toolbar = _locale.toolbar;

    const config = customCellRightClickConfig();

    // 当一个功能菜单块内所有的按钮都隐藏的时候，它顶部的分割线也需要隐藏掉
    let handleincellMenuseparator = true;

    if(!config.insertRow && !config.insertColumn && !config.deleteRow && !config.deleteColumn && !config.deleteCell ){
        handleincellMenuseparator = false;
    }

    let dataMenuseparator = true;

    if(!config.clear && !config.matrix && !config.sort && !config.filter && !config.chart && !config.image && !config.link && !config.data && !config.cellFormat){
        dataMenuseparator = false;
    }

    const customsButtons = (config.customs || []).map((item, index) => `
            <div data-index="${index}" class="luckysheetColsRowsHandleAdd_custom luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                ${item.title}
                </div>
            </div>`
        ).join("");

    const rightclickContainer =  `<div id="luckysheet-rightclick-menu" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel">
                <div id="luckysheet-copy-btn" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel luckysheet-copy-btn" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" style="display:${config.copy ? 'block' : 'none'};">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.copy}</div>
                </div>
                <div id="luckysheetcopyfor" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel"  style="display:${config.copyAs ? 'block' : 'none'};">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.copyAs}<span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;"></span>
                    </div>
                </div>
                <div id="luckysheet-copy-paste" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.paste ? 'block' : 'none'};">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.paste}</div>
                </div>
                <div id="luckysheet-cols-rows-handleincell">
                    <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator" style="display:${handleincellMenuseparator ? 'block' : 'none'};"></div>
                    <div id="luckysheetColsRowsHandleAdd_row" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.insertRow ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.insert}${rightclick.row}<span class="luckysheet-submenu-arrow" style="user-select: none;"></span>
                        </div>
                    </div>
                    <div id="luckysheetColsRowsHandleAdd_column" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.insertColumn ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.insert}${rightclick.column}<span class="luckysheet-submenu-arrow" style="user-select: none;"></span>
                        </div>
                    </div>
                    <div id="luckysheet-delRows" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel" style="display:${config.deleteRow ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.deleteSelected}${rightclick.row}<span class="luckysheet-submenu-arrow" style="user-select: none;"></span>
                        </div>
                    </div>
                    <div id="luckysheet-delCols" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel" style="display:${config.deleteColumn ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.deleteSelected}${rightclick.column}<span class="luckysheet-submenu-arrow" style="user-select: none;"></span>
                        </div>
                    </div>
                    <!-- cell right click remove hide button
                    <div id="luckysheetColsRowsHandleHid" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.hide}<span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;"></span>
                        </div>
                    </div>
                    -->
                    <div id="luckysheetCellsHandleDel" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel" style="display:${config.deleteCell ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.deleteCell}<span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;"></span>
                        </div>
                    </div>
                </div>
                <div id="luckysheet-cols-rows-add">
                    <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div>
                    <div id="luckysheet-top-left-add-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.to}
                            <span class="luckysheet-cols-rows-shift-left">${rightclick.left}</span>
                            ${rightclick.add}
                            <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align:center;margin-left:5px;"/>
                            <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                        </div>
                    </div>
                    <div id="luckysheet-bottom-right-add-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.to}
                            <span class="luckysheet-cols-rows-shift-right">${rightclick.right}</span>
                            ${rightclick.add}
                            <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                            <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                        </div>
                    </div>
                    <div id="luckysheet-del-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.deleteSelected}
                            <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                        </div>
                    </div>
                    <div id="luckysheet-hide-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.hideSelected}
                        <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                        </div>
                    </div>
                    <div id="luckysheet-show-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.showHide}
                            <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                        </div>
                    </div>
                    <div id="luckysheet-column-row-width-selected" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            <span class="luckysheet-cols-rows-shift-word luckysheet-mousedown-cancel">${rightclick.column}</span>
                            <span class="luckysheet-cols-rows-shift-size luckysheet-mousedown-cancel">${rightclick.width}</span>
                            <input type="number" class="luckysheet-mousedown-cancel rcsize" min="0" max="255" placeholder="${rightclick.number}" value="" style="width:50px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;">
                            px
                        </div>
                    </div>
                </div>
                <div id="luckysheet-cols-rows-shift">
                    <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator" style="display:${config.sort ? 'block' : 'none'};"></div>
                    <div id="luckysheetorderbyasc" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.sort ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.orderAZ}</div>
                    </div>
                    <div id="luckysheetorderbydesc" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.sort ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.orderZA}</div>
                    </div>
                </div>
                <div id="luckysheet-cols-rows-data">
                    <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator" style="display:${dataMenuseparator ? 'block' : 'none'};"></div>
                    <div id="luckysheet-delete-text" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.clear ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.clearContent}</div>
                    </div>
                    <div id="luckysheetmatrix" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel" style="display:${config.matrix ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                            ${rightclick.matrix}<span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;"></span>
                        </div>
                    </div>
                    <div id="luckysheetorderby" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.sort ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.sortSelection}</div>
                    </div>
                    <div id="luckysheetfilter" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.filter ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.filterSelection}</div>
                    </div>
                    <div id="luckysheetdatavisual" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.chart ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.chartGeneration}</div>
                    </div>
                    <div id="luckysheetInsertImage" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.image ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${toolbar.insertImage}</div>
                    </div>
                    <div id="luckysheetInsertLink" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.link ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${toolbar.insertLink}</div>
                    </div>
                    <div id="luckysheetDataVerification" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.data ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${toolbar.dataVerification}</div>
                    </div>
                    <div id="luckysheetCellFormatRightClickMenu" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.cellFormat ? 'block' : 'none'};">
                        <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${toolbar.cellFormat}</div>
                    </div>
                    ${customsButtons}
                </div>
            </div>
            <div id="luckysheetcopyfor_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div id="luckysheet-copy-json-head" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">Json ${rightclick.firstLineTitle}</div>
                </div>
                <div id="luckysheet-copy-json-nohead" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">Json ${rightclick.untitled}</div>
                </div>
                <div id="luckysheet-copy-array1" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.array1}</div>
                </div>
                <div id="luckysheet-copy-array2" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.array2}</div>
                </div>
                <div id="luckysheet-copy-arraymore-confirm" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        <span class="luckysheet-mousedown-cancel">${rightclick.array3}</span>
                        <input type="number" id="luckysheet-copy-arraymore-row" min="1" class="luckysheet-mousedown-cancel" placeholder="${rightclick.row}" style="width:40px;height:20px;box-sizing:border-box;text-align: center;"/>
                            ×
                            <input type="number" id="luckysheet-copy-arraymore-col" min="1" class="luckysheet-mousedown-cancel" placeholder="${rightclick.column}" style="width:40px;height:20px;box-sizing:border-box;text-align: center;"/>
                    </div>
                </div>
                <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div>
                <div id="luckysheet-copy-diagonal" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.diagonal}</div>
                </div>
                <div id="luckysheet-copy-antidiagonal" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.antiDiagonal}</div>
                </div>
                <div id="luckysheet-copy-diagonaloffset" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.diagonalOffset}
                        <input type="number" id="luckysheet-copy-diagonaloffset-value" class="luckysheet-mousedown-cancel" placeholder="${rightclick.offset}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        ${rightclick.column}
                    </div>
                </div>
                <div id="luckysheet-copy-boolvalue" data-clipboard-action="copy" data-clipboard-target="#luckysheet-copy-content" class="luckysheet-cols-menuitem luckysheet-copy-btn luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.boolean}</div>
                </div>
            </div>
            
            <!-- Revision: modeled on google sheet
            
            <div id="luckysheetColsRowsHandleAdd_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.to}${rightclick.top}${rightclick.add}
                        <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        <span class="luckysheet-mousedown-cancel">${rightclick.row}</span>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.to}${rightclick.bottom}${rightclick.add}
                        <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        <span class="luckysheet-mousedown-cancel">${rightclick.row}</span>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.to}${rightclick.left}${rightclick.add}
                        <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        <span class="luckysheet-mousedown-cancel">${rightclick.column}</span>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.to}${rightclick.right}${rightclick.add}
                        <input type="text" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="1" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        <span class="luckysheet-mousedown-cancel">${rightclick.column}</span>
                    </div>
                </div>
            </div>
            
            -->

            <!-- delete row or column
            
            <div id="luckysheetColsRowsHandleDel_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div id="luckysheet-delRows" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.deleteSelected}${rightclick.row}
                    </div>
                </div>
                <div id="luckysheet-delCols" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.deleteSelected}${rightclick.column}
                    </div>
                </div>
            </div>
            
            -->

            <!--
            <div id="luckysheetColsRowsHandleHid_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div id="luckysheet-hidRows" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.hideSelected}${rightclick.row}
                    </div>
                </div>
                <div id="luckysheet-showHidRows" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.showHide}${rightclick.row}
                    </div>
                </div>
                <div id="luckysheet-hidCols" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.hideSelected}${rightclick.column}
                    </div>
                </div>
                <div id="luckysheet-showHidCols" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.showHide}${rightclick.column}
                    </div>
                </div>
            </div>

            -->

            <div id="luckysheetCellsHandleDel_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div id="luckysheet-delCellsMoveLeft" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.moveLeft}
                    </div>
                </div>
                <div id="luckysheet-delCellsMoveUp" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.moveUp}
                    </div>
                </div>
            </div>
            <div id="luckysheetmatrix_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.flip}
                        <button id="luckysheet-matrix-turn-up" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.upAndDown}</button>
                        <button id="luckysheet-matrix-turn-left" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.leftAndRight}</button>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.flip}
                        <button id="luckysheet-matrix-turn-cw" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.clockwise}</button>
                        <button id="luckysheet-matrix-turn-anticw" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.counterclockwise}</button>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div id="luckysheet-matrix-turn-trans" class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${rightclick.transpose}</div>
                </div>
                <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div>
                <div id="luckysheet-matrix-cal-confirm" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        <div class="luckysheet-mousedown-cancel">${rightclick.matrixCalculation}</div>
                        <div class="luckysheet-mousedown-cancel">
                            <select id="luckysheet-matrix-cal-type" class="luckysheet-mousedown-cancel" style="height:20px;">
                                <option value="plus">${rightclick.plus}</option>
                                <option value="minus">${rightclick.minus}</option>
                                <option value="multiply">${rightclick.multiply}</option>
                                <option value="divided">${rightclick.divided}</option>
                                <option value="power">${rightclick.power}</option>
                                <option value="root">${rightclick.root}</option>
                                <option value="log">${rightclick.log}</option>
                            </select>
                            <input type="number" id="luckysheet-matrix-cal-value" class="luckysheet-mousedown-cancel" placeholder="${rightclick.number}" value="2" style="width:40px;height:20px;box-sizing:border-box;text-align: center;margin-left:5px;"/>
                        </div>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.delete0}
                        <button id="luckysheet-matrix-delezero-row" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.byRow}</button>
                        <button id="luckysheet-matrix-delezero-column" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.byCol}</button>
                    </div>
                </div>
                <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">
                        ${rightclick.removeDuplicate}
                        <button id="luckysheet-matrix-delerpt-row" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.byRow}</button>
                        <button id="luckysheet-matrix-delerpt-column" class="btn btn-primary luckysheet-mousedown-cancel" style="margin-left:5px;padding:2px 3px;line-height:12px;font-size:12px;">${rightclick.byCol}</button>
                    </div>
                </div>
            </div>`;

            return rightclickContainer;
}

const pivottableconfigHTML = function(){
    const _locale = locale();
    const locale_pivotTable = _locale.pivotTable;

    return '<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel" id="luckysheet-pivotTable-config-option"> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.titleSort+'</span> <select class="luckysheet-mousedown-cancel" style="height:24px;" id="luckysheet-pivotTable-config-option-order"> <option selected="selected" value="default">'+locale_pivotTable.titleNoSort+'</option> <option value="asc">'+locale_pivotTable.titleSortAsc+'</option> <option value="desc">'+locale_pivotTable.titleSortDesc+'</option> </select> </div> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.titleSortBy+'</span> <select class="luckysheet-mousedown-cancel" style="height:24px;" id="luckysheet-pivotTable-config-option-orderby"> </select> </div> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.titleShowSum+'</span> <select class="luckysheet-mousedown-cancel" style="height:24px;" id="luckysheet-pivotTable-config-option-stastic"> <option  value="0">'+locale_pivotTable.titleStasticFalse+'</option> <option value="1" selected="selected">'+locale_pivotTable.titleStasticTrue+'</option> </select> </div> </div> </div> </div>';
} 

const pivottablesumHTML = function(){
    const _locale = locale();
    const locale_pivotTable = _locale.pivotTable;

    return '<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel" id="luckysheet-pivotTable-config-option-sumtype"> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="SUM"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsSUM+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="COUNT"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsCOUNT+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="COUNTA"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsCOUNTA+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="COUNTUNIQUE"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsCOUNTUNIQUE+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="AVERAGE"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsAVERAGE+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="MAX"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsMAX+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="MIN"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsMIN+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="MEDIAN"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsMEDIAN+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="PRODUCT"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsPRODUCT+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="STDEV"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsSTDEV+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="STDEVP"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsSTDEVP+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="VAR"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticslet+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" sumtype="VARP"> <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> <span class="luckysheet-mousedown-cancel">'+locale_pivotTable.valueStatisticsVARP+'</span> <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;"><i class="fa fa-check luckysheet-mousedown-cancel" aria-hidden="true"></i></span> </div> </div> </div>';
} 

const sheetHTML = '<div style="${style}" id="luckysheet-sheets-item${index}" data-index="${index}" class="luckysheet-sheets-item ${active}"><span class="luckysheet-sheets-item-name" spellcheck ="false" contenteditable="false">${name}</span> <span class="luckysheet-sheets-item-menu luckysheet-mousedown-cancel"><i class="fa fa-sort-desc luckysheet-mousedown-cancel"></i></span>${colorset}</div>',
    columnHeaderHTML = '<div class="luckysheet-cols-h-cells luckysheetsheetchange"  id="luckysheet-cols-h-cells_${index}" style="width:${width}px;"> <div class="luckysheet-cols-h-cells-c"> <div class="luckysheet-grdblkpush"></div>${column}</div></div>',
    sheetselectlistHTML = '<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel" id="luckysheet-sheet-list">${item}</div>',
    sheetselectlistitemHTML = '<div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"  id="luckysheet-sheet-btn${index}" data-index="${index}"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel" style="${style}" ><span class="icon luckysheet-mousedown-cancel">${icon}</span>${name}</div></div>',
    inputHTML = '<div dir="ltr"><div class="luckysheet-input-box-index" id="luckysheet-input-box-index"></div><div id="luckysheet-input-box" spellcheck="false" aria-hidden="false" class="luckysheet-input-box"><div class="luckysheet-cell-input editable" tabindex="0" role="combobox" contenteditable="true" id="luckysheet-rich-text-editor" dir="ltr" g_editable="true" aria-autocomplete="list"></div></div></div>',
    modelHTML = '<div id="${id}" style="${style}" class="luckysheet-modal-dialog ${addclass}" tabindex="0" role="dialog" aria-labelledby=":41e" dir="ltr"> <div class="luckysheet-modal-dialog-title luckysheet-modal-dialog-title-draggable"> <span class="luckysheet-modal-dialog-title-text" role="heading">${title}</span>	 <span class="luckysheet-modal-dialog-title-close" role="button" tabindex="0" aria-label="${close}"><i class="fa fa-times" aria-hidden="true"></i></span> </div> <div class="luckysheet-modal-dialog-content">${content}</div> <div class="luckysheet-modal-dialog-buttons">	 ${botton} </div></div>',

    maskHTML = '<div class="luckysheet-modal-dialog-mask" id="luckysheet-modal-dialog-mask"></div>';

//底部 表格标签操作dom
function sheetconfigHTML(){
    const sheetconfig = locale().sheetconfig;

    const config = customSheetRightClickConfig();

    /* 如果配置项全部为flase，则隐藏入口且不再菜单项 */
    if(Object.values(config).every(ele=> !ele)){
        $('#luckysheet-sheet-container-c').addClass("luckysheet-sheet-container-menu-hide");
        return "";
    }

    let hideTopMenuseparator = true;
    let moveTopMenuseparator = true;

    // 1. 当一个功能菜单块上方的功能块按钮都隐藏的时候，下方的功能块的顶部分割线也需要隐藏
    if(!config.delete && !config.copy && !config.rename && !config.color){
        hideTopMenuseparator = false;
        if(!config.hide){
            moveTopMenuseparator = false;
        }
    }

    // 2. 当一个功能菜单块内所有的按钮都隐藏的时候，它顶部的分割线也需要隐藏掉
    if(!config.hide){
        hideTopMenuseparator = false;
    }
    if(!config.move){
        moveTopMenuseparator = false;
    }


    const sheetconfigModel = `<div id="luckysheet-rightclick-sheet-menu" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-mousedown-cancel"> 
                <div id="luckysheetsheetconfigdelete" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.delete ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.delete}</div>
                </div> 
                <div id="luckysheetsheetconfigcopy" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.copy ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.copy}</div> 
                </div> 
                <div id="luckysheetsheetconfigrename" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.rename ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.rename}</div> 
                </div> 
                <div id="luckysheetsheetconfigcolor" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel" style="display:${config.color ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"> 
                        ${sheetconfig.changeColor} <span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;"></span> 
                    </div> 
                </div> 
                <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator" style="display:${hideTopMenuseparator ? 'block' : 'none'};"></div> 
                <div id="luckysheetsheetconfighide" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.hide ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.hide}</div> 
                </div> 
                <div id="luckysheetsheetconfigshow" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.hide ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.unhide}</div> 
                </div> 
                <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator" style="display:${moveTopMenuseparator ? 'block' : 'none'};"></div> 
                <div id="luckysheetsheetconfigmoveleft" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.move ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.moveLeft}</div> 
                </div> 
                <div id="luckysheetsheetconfigmoveright" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="display:${config.move ? 'block' : 'none'};"> 
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.moveRight}</div> 
                </div> 
            </div> 
            <div id="luckysheetsheetconfigcolor_sub" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel">
                <div id="luckysheetsheetconfigcolorreset" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel">
                    <div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${sheetconfig.resetColor}</div>
                </div> 
                <div class="luckysheet-mousedown-cancel"> 
                    <div class="luckysheet-mousedown-cancel"> 
                        <input type="text" id="luckysheetsheetconfigcolorur" /> 
                    </div> 
                </div> 
            </div>`;

            return sheetconfigModel;
}

const luckysheetPivotTableHTML = function(){
    const _locale = locale();
    const locale_pivotTable = _locale.pivotTable;
    // return '<div id="luckysheet-modal-dialog-slider-pivot" class="luckysheet-modal-dialog-slider luckysheet-modal-dialog-slider-pivot"> <div class="luckysheet-modal-dialog-slider-title"> <span>'+locale_pivotTable.title+'</span> <span id="luckysheet-modal-dialog-slider-close" title="'+locale_pivotTable.closePannel+'"><i class="fa fa-times" aria-hidden="true"></i></span> </div> <div class="luckysheet-modal-dialog-slider-content"> <div class="luckysheet-modal-dialog-slider-range"> <div id="luckysheet-dialog-pivotTable-range"></div> <div id="luckysheet-dialog-pivotTable-range-seleted">'+locale_pivotTable.editRange+'</div> </div> <div class="luckysheet-modal-dialog-slider-list-title"> '+locale_pivotTable.tipPivotFieldSelected+' <span title="'+locale_pivotTable.tipClearSelectedField+'" id="luckysheet-dialog-pivotTable-clearitem">'+locale_pivotTable.btnClearSelectedField+'</span></div> <div id="luckysheet-modal-dialog-pivotTable-list" class="luckysheet-modal-dialog-slider-list luckysheet-scrollbars"> </div> <div class="luckysheet-modal-dialog-slider-config-c"> <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-filter"> <div> <span><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i> '+locale_pivotTable.btnFilter+'</span> </div> <div id="luckysheet-modal-dialog-config-filter" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div> </div> <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-row"> <div> <span><i class="fa fa-list-alt" aria-hidden="true"></i> '+locale_pivotTable.titleRow+'</span> </div> <div id="luckysheet-modal-dialog-config-row" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div> </div> <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-column"> <div> <span><i class="fa fa-indent" aria-hidden="true"></i> '+locale_pivotTable.titleColumn+'</span> </div> <div id="luckysheet-modal-dialog-config-column" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div> </div> <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-value"> <div> <span><i class="fa fa-cube" aria-hidden="true"></i> '+locale_pivotTable.titleValue+'</span> <span style="float: right;margin-right: 10px;display:none;" id="luckysheetpivottablevaluecolrowshow"><label style="padding:0px 5px;margin:0px;font-size:12px;height:15px;line-height:15px;" title="'+locale_pivotTable.tipShowColumn+'" for="luckysheetpivottablevaluecolrow">'+locale_pivotTable.titleColumn+'</label> <input type="radio" checked="checked" value="1" name="luckysheetpivottablevaluecolrow" id="luckysheetpivottablevaluecolrow" /> <label style="padding:0px 5px;margin:0px;font-size:12px;height:15px;line-height:15px;" title="'+locale_pivotTable.tipShowRow+'" for="luckysheetpivottablevaluecolrow1">'+locale_pivotTable.titleRow+'</label> <input type="radio" value="0" name="luckysheetpivottablevaluecolrow" id="luckysheetpivottablevaluecolrow1" /></span></div> <div id="luckysheet-modal-dialog-config-value" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div> </div> </div> </div> </div>';
    return `
        <div id="luckysheet-modal-dialog-slider-pivot" class="luckysheet-modal-dialog-slider luckysheet-modal-dialog-slider-pivot">
        <div class="luckysheet-modal-dialog-slider-title"> <span>${locale_pivotTable.title}</span> <span id="luckysheet-modal-dialog-slider-close" title="${locale_pivotTable.closePannel}"><i class="fa fa-times" aria-hidden="true"></i></span> </div>
        <div class="luckysheet-modal-dialog-slider-content">
            <div class="luckysheet-modal-dialog-slider-range">
                <div id="luckysheet-dialog-pivotTable-range"></div>
                <div id="luckysheet-dialog-pivotTable-range-seleted">${locale_pivotTable.editRange}</div>
            </div>
            <div class="luckysheet-modal-dialog-slider-list-title"> ${locale_pivotTable.tipPivotFieldSelected} <span title="${locale_pivotTable.tipClearSelectedField}" id="luckysheet-dialog-pivotTable-clearitem">${locale_pivotTable.btnClearSelectedField}</span></div>
            <div id="luckysheet-modal-dialog-pivotTable-list" class="luckysheet-modal-dialog-slider-list luckysheet-scrollbars"> </div>
            <div class="luckysheet-modal-dialog-slider-config-c">
                <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-filter">
                    <div> <span><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i> ${locale_pivotTable.btnFilter}</span> </div>
                    <div id="luckysheet-modal-dialog-config-filter" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div>
                </div>
                <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-row">
                    <div> <span><i class="fa fa-list-alt" aria-hidden="true"></i> ${locale_pivotTable.titleRow}</span> </div>
                    <div id="luckysheet-modal-dialog-config-row" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div>
                </div>
                <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-column">
                    <div> <span><i class="fa fa-indent" aria-hidden="true"></i> ${locale_pivotTable.titleColumn}</span> </div>
                    <div id="luckysheet-modal-dialog-config-column" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div>
                </div>
                <div class="luckysheet-modal-dialog-slider-config luckysheet-modal-dialog-config-value">
                    <div> <span><i class="fa fa-cube" aria-hidden="true"></i> ${locale_pivotTable.titleValue}</span> <span style="float: right;margin-right: 10px;display:none;" id="luckysheetpivottablevaluecolrowshow"><label style="padding:0px 5px;margin:0px;font-size:12px;height:15px;line-height:15px;" title="${locale_pivotTable.tipShowColumn}" for="luckysheetpivottablevaluecolrow">${locale_pivotTable.titleColumn}</label> <input type="radio" checked="checked" value="1" name="luckysheetpivottablevaluecolrow" id="luckysheetpivottablevaluecolrow" /> <label style="padding:0px 5px;margin:0px;font-size:12px;height:15px;line-height:15px;" title="${locale_pivotTable.tipShowRow}" for="luckysheetpivottablevaluecolrow1">${locale_pivotTable.titleRow}</label> <input type="radio" value="0" name="luckysheetpivottablevaluecolrow" id="luckysheetpivottablevaluecolrow1" /></span></div>
                    <div id="luckysheet-modal-dialog-config-value" class="luckysheet-modal-dialog-slider-config-list luckysheet-scrollbars"> </div>
                </div>
            </div>
        </div>
        </div>
        `;
} 

function filtermenuHTML() { 
    const _locale = locale();
    const locale_filter = _locale.filter;
    
    return `<div class="luckysheet-cols-menu luckysheet-mousedown-cancel luckysheet-filter-menu" id="luckysheet-\${menuid}-menu"><div id="luckysheet-\${menuid}-orderby-asc" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.sortByAsc}</div></div><div id="luckysheet-\${menuid}-orderby-desc" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"><div style="width:205px;" class="luckysheet-mousedown-cancel">${locale_filter.sortByDesc}</div></div></div> <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div><div id="luckysheet-\${menuid}-orderby-color" class="luckysheet-cols-menuitem luckysheet-cols-submenu luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel" style="position: relative;">${locale_filter.filterByColor}<span class="luckysheet-submenu-arrow iconfont luckysheet-iconfont-youjiantou" style="user-select: none;right: 0;"></span></div></div><div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-bycondition" style="padding-top:0px;padding-bottom:0px;"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"><i class="fa fa-caret-right" aria-hidden="true"></i> ${locale_filter.filterByCondition}</div></div> <div class="luckysheet-\${menuid}-bycondition" style="display:none;"><div class="luckysheet-flat-menu-button luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-selected"><span class="luckysheet-mousedown-cancel" data-value="null" data-type="0">${locale_filter.filiterInputNone}</span><div class="luckysheet-mousedown-cancel"><i class="fa fa-sort" aria-hidden="true"></i></div></div><div class="luckysheet-\${menuid}-selected-input"><input type="text" placeholder="${locale_filter.filiterInputTip}" class="luckysheet-mousedown-cancel" /></div><div class="luckysheet-\${menuid}-selected-input luckysheet-\${menuid}-selected-input2"><span>${locale_filter.filiterRangeStart}</span><input type="text" placeholder="${locale_filter.filiterRangeStartTip}" class="luckysheet-mousedown-cancel" /><span>${locale_filter.filiterRangeEnd}</span><input type="text" placeholder="${locale_filter.filiterRangeEndTip}" class="luckysheet-mousedown-cancel" /></div></div> <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-byvalue" style="padding-top:0px;padding-bottom:0px;"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"><i class="fa fa-caret-right" aria-hidden="true"></i> ${locale_filter.filterByValues}</div></div> <div class="luckysheet-\${menuid}-byvalue"><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel luckysheet-mousedown-\${menuid}-byvalue-btn"><span id="luckysheet-\${menuid}-byvalue-btn-all" class="luckysheet-mousedown-cancel">${locale_filter.filterValueByAllBtn}</span> - <span id="luckysheet-\${menuid}-byvalue-btn-clear" class="luckysheet-mousedown-cancel">${locale_filter.filterValueByClearBtn}</span> - <span id="luckysheet-\${menuid}-byvalue-btn-contra" class="luckysheet-mousedown-cancel">${locale_filter.filterValueByInverseBtn}</span> <div><i class="fa fa-\${menuid} luckysheet-mousedown-cancel" aria-hidden="true"></i></div></div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="padding-left:3px; padding-right:3px;"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"><input type="text" placeholder="${locale_filter.filterValueByTip}" class="luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-byvalue-input" /><div class="luckysheet-\${menuid}-byvalue-input-icon luckysheet-mousedown-cancel"><i class="fa fa-search luckysheet-mousedown-cancel" aria-hidden="true"></i></div></div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div id="luckysheet-\${menuid}-byvalue-select" class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"></div></div></div> <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel"><div class="btn btn-primary luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-confirm">${locale_filter.filterConform}</div> <div class="btn btn-default luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-cancel">${locale_filter.filterCancel}</div> <div class="btn btn-danger luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-initial">${locale_filter.clearFilter}</div></div></div> </div>`
}

function filtersubmenuHTML() {
    const _locale = locale();
    const locale_filter = _locale.filter;
    
    return `<div style="z-index:1004;overflow-y:auto;" class="luckysheet-filter-submenu luckysheet-cols-menu luckysheet-mousedown-cancel" id="luckysheet-\${menuid}-submenu"><div data-value="null" data-type="0" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionNone}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="cellnull"  data-type="0"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellIsNull}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="cellnonull"  data-type="0"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellNotNull}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="textinclude"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellTextContain}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="textnotinclude"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellTextNotContain}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="textstart"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellTextStart}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="textend"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellTextEnd}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="textequal"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellTextEqual}</div></div>  <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div>  <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="dateequal"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellDateEqual}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="datelessthan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellDateBefore}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="datemorethan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellDateAfter}</div></div> <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div> <div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="morethan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellGreater}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="moreequalthan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellGreaterEqual}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="lessthan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellLess}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="lessequalthan"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellLessEqual}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="equal"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellEqual}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="noequal"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellNotEqual}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="include"  data-type="2"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellBetween}</div></div><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" data-value="noinclude" data-type="2"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${locale_filter.conditionCellNotBetween}</div></div> </div>`
}

function luckysheetAlternateformatHtml(){
    const _locale = locale()
    const alternatingColors =_locale.alternatingColors;
    const toolbar = _locale.toolbar;


    return '<div id="luckysheet-modal-dialog-slider-alternateformat" class="luckysheet-modal-dialog-slider luckysheet-modal-dialog-slider-alternateformat" style="display: block;">'+
                '<div class="luckysheet-modal-dialog-slider-title">'+
                    '<span>'+ toolbar.alternatingColors +'</span>'+
                    '<span class="luckysheet-model-close-btn" title="'+ alternatingColors.close +'">'+
                        '<i class="fa fa-times" aria-hidden="true"></i>'+
                    '</span>'+
                '</div>'+
                '<div class="luckysheet-modal-dialog-slider-content">'+
                    '<div class="textTitle">'+ alternatingColors.applyRange +'</div>'+
                    '<div id="luckysheet-alternateformat-range">'+
                        '<input class="formulaInputFocus" placeholder="'+ alternatingColors.selectRange +'"/>'+
                        '<i class="fa fa-table" aria-hidden="true"></i>'+
                    '</div>'+
                    '<div id="luckysheet-alternateformat-checkbox">'+
                        '<div class="cf">'+
                            '<input type="checkbox" id="luckysheet-alternateformat-rowHeader"/>'+
                            '<label for="luckysheet-alternateformat-rowHeader">'+ alternatingColors.header +'</label>'+
                        '</div>'+
                        '<div class="cf">'+
                            '<input type="checkbox" id="luckysheet-alternateformat-rowFooter"/>'+
                            '<label for="luckysheet-alternateformat-rowFooter">'+ alternatingColors.footer +'</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="textTitle">'+alternatingColors.textTitle+'</div>'+
                    '<div id="luckysheet-alternateformat-modelList" class="cf"></div>'+
                    '<div class="textTitle">'+alternatingColors.custom+'</div>'+
                    '<div id="luckysheet-alternateformat-modelCustom" class="cf"></div>'+
                    '<div id="luckysheet-alternateformat-modelToning">'+
                        '<div class="toningbox header">'+
                            '<div class="toningShow"> '+ alternatingColors.header +' </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionTextColor +'" style="border-bottom-color: #000;margin-right: 10px;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-text-color" style="user-select: none;"> </div> </div> </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionCellColor +'" style="border-bottom-color: #fff;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-cell-color" style="user-select: none;"> </div> </div> </div>'+
                        '</div>'+
                        '<div class="toningbox ctOne">'+
                            '<div class="toningShow"> '+ alternatingColors.colorShow +'1 </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionTextColor +'" style="border-bottom-color: #000;margin-right: 10px;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-text-color" style="user-select: none;"> </div> </div> </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionCellColor +'" style="border-bottom-color: #fff;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-cell-color" style="user-select: none;"> </div> </div> </div>'+
                        '</div>'+
                        '<div class="toningbox ctTwo">'+
                            '<div class="toningShow"> '+ alternatingColors.colorShow +'2 </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionTextColor +'" style="border-bottom-color: #000;margin-right: 10px;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-text-color" style="user-select: none;"> </div> </div> </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionCellColor +'" style="border-bottom-color: #fff;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-cell-color" style="user-select: none;"> </div> </div> </div>'+
                        '</div>'+
                        '<div class="toningbox footer">'+
                            '<div class="toningShow"> '+ alternatingColors.footer +' </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionTextColor +'" style="border-bottom-color: #000;margin-right: 10px;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-text-color" style="user-select: none;"> </div> </div> </div>'+
                            '<div class="luckysheet-color-menu-button-indicator" title="'+ alternatingColors.selectionCellColor +'" style="border-bottom-color: #fff;"> <div class="luckysheet-icon luckysheet-inline-block"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-cell-color" style="user-select: none;"> </div> </div> </div>'+
                        '</div>'+
                    '</div>'+
                    '<button id="luckysheet-alternateformat-remove" class="btn btn-default" style="margin: 10px;">'+ alternatingColors.removeColor +'</button>'+
                '</div>'+
            '</div>';
}

const luckysheetchartpointconfigHTML = '<div class="luckysheet-chart-point-config"> <div class="luckysheet-chart-point-config-set"> <div class="luckysheet-chart-point-config-left"> <div class="luckysheet-chart-point-config-left-top"> <div class="luckysheet-chart-point-searchcondition"> <div class="luckysheet-datavisual-content-row" style="margin-bottom: 0px;margin-top: 0px;height: 30px;"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">选择维度</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-tips="维度选择" name="luckysheetpointconfigsearchdim" id="luckysheetpointconfigsearchdim"> </select> </div> </div> <div class="luckysheet-datavisual-content-row" style="margin-bottom: 0px;margin-top: 3px;height: 30px;"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;">排序</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <label data-tips="无排序" for="luckysheetpointconfigsearchorderno">无排序</label> <input type="radio" checked="checked" value="0" name="luckysheetpointconfigsearchorder" id="luckysheetpointconfigsearchorderno"> <label data-tips="升序" for="luckysheetpointconfigsearchorderasc">升序</label> <input type="radio" value="1" name="luckysheetpointconfigsearchorder" id="luckysheetpointconfigsearchorderasc"> <label data-tips="降序" for="luckysheetpointconfigsearchorderdesc">降序</label> <input type="radio" value="2" name="luckysheetpointconfigsearchorder" id="luckysheetpointconfigsearchorderdesc"> </div> </div> <div class="luckysheet-datavisual-content-row" style="margin-bottom: 0px;margin-top: 5px;height: 30px;"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:90%;text-align: left;"> <select data-width="70" data-tips="按照什么方式查询" name="luckysheetpointconfigsearchtype" id="luckysheetpointconfigsearchtype"> <option value="0" selected="selected">按照名称</option> <option value="1">按排序前%</option> </select> <input data-tips="查询关于点的关键字" id="luckysheetpointconfigsearchcontent" type="text" class="luckysheet-datavisual-config-input-no" style="width:40%;" placeholder="查询内容" /> <button id="luckysheetpointconfigsearchcomfirm" class="btn btn-primary luckysheet-model-conform-btn">查询</button> </div> </div> </div> </div> <div class="luckysheet-chart-point-config-left-mid"> <span id="luckysheet-chart-point-btn-all" class="luckysheet-mousedown-cancel">全选</span> - <span id="luckysheet-chart-point-btn-clear" class="luckysheet-mousedown-cancel">清除</span> - <span id="luckysheet-chart-point-btn-contra" class="luckysheet-mousedown-cancel">反选</span><span style="text-decoration:none;color:#8D8D8D;float:right;margin-right:40px;cursor:default;" class="luckysheet-mousedown-cancel">可以直接框选数据点</span> </div> <div class="luckysheet-chart-point-config-left-bottom"> <div class="luckysheet-chart-point-searchitem-c luckysheet-noselected-text">  </div> </div> </div> <div class="luckysheet-chart-point-config-right"> <div class="luckysheet-chart-point-itemconfig"> <div class="luckysheet-datavisual-content-row" style="font-size: 16px;font-weight: bold;"> 数据点设置 </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">图形颜色</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <input data-tips="颜色" class="luckysheet-datavisual-config-colorOpacity" id="scattersingleitemstylecolor" type="text" data-bigclass="scattersingle" data-attr="itemstyle" data-func="color" /> </div> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">图形大小</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-sliderdiy="scattersingleallsymbolsizeslider" data-tips="点大小设置" name="scattersingleallsymbolsize" id="scattersingleallsymbolsize" data-width="50" data-bigclass="scattersingle" data-attr="all" data-func="symbolsize"> <option value="4" selected="selected">4px</option> <option value="6">6px</option> <option value="8">8px</option> <option value="10">10px</option> <option value="12">12px</option> <option value="14">14px</option> <option value="16">16px</option> <option value="diy">自定义</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row" style="display:none;"> <div data-tips="滑动修改点大小" id="scattersingleallsymbolsizeslider" data-bigclass="scattersingle" data-attr="all" data-func="symbolsize" class="luckysheet-datavisual-config-slider" style="width:70%;" data-min="1" data-max="50" data-step="1"></div> <input data-tips="自定义点大小" data-sliderid="scattersingleallsymbolsizeslider" id="scattersingleallsymbolsizesliderdiy" type="text" class="luckysheet-datavisual-config-input" data-bigclass="scattersingle" data-attr="all" data-func="symbolsize" placeholder="请输入" style="width:10%;margin-left:10px;text-align:center;margin-right: 2px;" /><label for="scattersingleallsymbolsizesliderdiy">px</label> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">图形形状</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-tips="点类型设置" data-width="70" name="scattersingleallsymboltype" id="scattersingleallsymboltype" data-bigclass="scattersingle" data-attr="all" data-func="symboltype"> <option value="emptyCircle" selected="selected">空心圆</option> <option value="circle">圆形</option> <option value="emptyRectangle">空心矩形</option> <option value="rect">矩形</option> <option value="roundRect">圆角矩形</option> <option value="emptyTriangle">空心三角</option> <option value="triangle">三角形</option> <option value="emptyDiamond">空心菱形</option> <option value="diamond">菱形</option> <option value="droplet">水滴</option> <option value="pin">标注</option> <option value="arrow">箭头</option> <option value="heart">心形</option> <option value="star">星星</option> </select> </div> </div> <div class="luckysheet-datavisual-content-rowsplit-sub"></div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">边框粗细</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-sliderdiy="scattersingleitemstyleborderwidthslider" data-tips="点边框粗细" name="scattersingleitemstyleborderwidth" id="scattersingleitemstyleborderwidth" data-width="50" data-bigclass="scattersingle" data-attr="itemstyle" data-func="borderwidth"><option value="0" selected="selected">无</option> <option value="1">1px</option> <option value="2">2px</option> <option value="3">3px</option> <option value="4">4px</option> <option value="5">5px</option> <option value="6">6px</option> <option value="7">7px</option> <option value="8">8px</option> <option value="diy">自定义</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row" style="display:none;"> <div data-tips="滑动修改边框粗细" id="scattersingleitemstyleborderwidthslider" data-bigclass="scattersingle" data-attr="itemstyle" data-func="borderwidth" class="luckysheet-datavisual-config-slider" style="width:70%;" data-min="12" data-max="100" data-step="1"></div> <input data-tips="自定义边框粗细" data-sliderid="scattersingleitemstyleborderwidthslider" id="scattersingleitemstyleborderwidthsliderdiy" type="text" class="luckysheet-datavisual-config-input" data-bigclass="scattersingle" data-attr="itemstyle" data-func="borderwidth" placeholder="请输入" style="width:10%;margin-left:10px;text-align:center;margin-right: 2px;" /><label for="scattersingleitemstyleborderwidthsliderdiy">%</label> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">边框样式</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-tips="点边框类型设置" data-width="50" name="scattersingleitemstyleborderlinetype" id="scattersingleitemstyleborderlinetype" data-bigclass="scattersingle" data-attr="itemstyle" data-func="borderlinetype"> <option value="solid" selected="selected">实线</option> <option value="dashed">虚线</option> <option value="dotted">点线</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">边框颜色</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <input data-tips="点边框颜色" class="luckysheet-datavisual-config-colorOpacity" id="scattersingleitemstyleborderlinecolor" type="text" data-bigclass="scattersingle" data-attr="itemstyle" data-func="borderlinecolor" /> </div> </div> <div class="luckysheet-datavisual-content-rowsplit-sub"></div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;"><i class="fa fa-th-large" aria-hidden="true"></i> 文字标签</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <label data-tips="显示数据点的标签" data-bigclass="scattersingle" data-attr="label" data-func="labelshow" for="scattersinglelabellabelshow">显示</label> <input type="radio" checked="checked" value="1" name="scattersinglelabellabelshow" id="scattersinglelabellabelshow" data-bigclass="scattersingle" data-attr="label" data-func="labelshow"> <label data-tips="隐藏数据点的标签" data-bigclass="scattersingle" data-attr="label" data-func="labelshow" for="scattersinglelabellabelshow1">隐藏</label> <input type="radio" value="0" name="scattersinglelabellabelshow" id="scattersinglelabellabelshow1" data-bigclass="scattersingle" data-attr="label" data-func="labelshow"> </div> </div> <div class="luckysheet-datavisual-content-row" style="height:auto;line-height: initial;margin-left:auto;" showfor="scattersinglelabellabelshow1" hidefor="scattersinglelabellabelshow"> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:40%;">数值比例</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:50%;"> <select data-tips="刻度数值放大比例" name="scattersinglelabelformatratio" id="scattersinglelabelformatratio" data-bigclass="scattersingle" data-attr="label" data-func="formatratio"> <option value="0.01">乘以100</option> <option value="0.1">乘以10</option> <option value="1" selected="selected">默认</option> <option value="10">除以10</option> <option value="100">除以100</option> <option value="1000">除以1000</option> <option value="10000">除以1万</option> <option value="100000">除以10万</option> <option value="1000000">除以一百万</option> <option value="10000000">除以一千万</option> <option value="100000000">除以一亿</option> <option value="1000000000">除以十亿</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:40%;white-space: nowrap;">小数位数</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:50%;"> <select data-tips="数值小数点位数" name="scattersinglelabelfloatlen" id="scattersinglelabelfloatlen" data-bigclass="scattersingle" data-attr="label" data-func="floatlen"> <option value="auto" selected="selected">自动显示</option> <option value="0">整数</option> <option value="1">1位小数</option> <option value="2">2位小数</option> <option value="3">3位小数</option> <option value="4">4位小数</option> <option value="5">5位小数</option> <option value="6">6位小数</option> <option value="7">7位小数</option> <option value="8">8位小数</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row"> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:20%;">标签格式</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:70%;"> <select data-sliderdiy="scattersinglelabelcontentformatslider" data-tips="标签显示格式" name="scattersinglelabelcontentformat" id="scattersinglelabelcontentformat" data-bigclass="scattersingle" data-attr="label" data-func="contentformat"> <option value="default" selected="selected">默认</option> <option value="1">仅数据名</option> <option value="2">数据名+2维数值</option> <option value="5">数据名+全部数值</option> <option value="diy">自定义</option> </select> </div> </div> <div style="display:none;"> <div class="luckysheet-datavisual-content-row" id="scattersinglelabelcontentformatslider"> <div style="text-align:center; width:60px; display:inline-block;">数据名称</div> <label data-tips="是否显示数据名" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelshow" for="scattersinglelabeldatalabelshow" style="font-weight:bold;"><i class="fa fa-eye" aria-hidden="true"></i></label> <input type="checkbox" checked="checked" name="scattersinglelabeldatalabelshow" id="scattersinglelabeldatalabelshow" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelshow"> <input data-tips="显示在数据名前部文字" placeholder="前缀" id="scattersinglelabeldatalabelprefix" type="text" class="luckysheet-datavisual-config-input" style="width:60px;height:19px;" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelprefix" /> <input data-tips="显示在数据名尾部文字" placeholder="后缀" id="scattersinglelabeldatalabelsuffix" type="text" class="luckysheet-datavisual-config-input" style="width:60px;height:19px;" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelsuffix" /> <label data-tips="是否在数据名后换行" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelline" for="scattersinglelabeldatalabelline" style="font-weight:bold;">换行</label> <input type="checkbox" checked="checked" name="scattersinglelabeldatalabelline" id="scattersinglelabeldatalabelline" data-bigclass="scattersingle" data-attr="label" data-func="scattersingledatalabelline"> </div> </div> <div class="luckysheet-datavisual-content-row" > <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-title luckysheet-datavisual-content-column-2x" style="width:10%;white-space:nowrap;">标签位置</div> <div class="luckysheet-datavisual-content-column luckysheet-datavisual-content-column-right luckysheet-datavisual-content-column-2x" style="width:80%;"> <select data-sliderdiy="scattersinglelabellabelplaceslider" data-tips="标签距离图形位置" data-width="70" name="scattersinglelabellabelplace" id="scattersinglelabellabelplace" data-bigclass="scattersingle" data-attr="label" data-func="labelplace"> <option value="top" selected="selected">顶端</option> <option value="left">左侧</option> <option value="right">右侧</option> <option value="bottom">底部</option> <option value="inside">内部居中</option> <option value="diy">自定义</option> <option value="insideLeft">内部左侧</option> <option value="insideRight">内部右侧</option> <option value="insideTop">内部顶端</option> <option value="insideBottom">内部底端</option> <option value="insideTopLeft">内部左上</option> <option value="insideBottomLeft">内部左下</option> <option value="insideTopRight">内部右上</option> <option value="insideBottomRight">内部右下</option> </select> </div> </div> <div class="luckysheet-datavisual-content-row" style="display:none;height:65px;"> <div data-tips="滑动修改点文本水平位置" id="scattersinglelabellabelplaceslider" data-bigclass="scattersingle" data-attr="label" data-func="labelplacediy" class="luckysheet-datavisual-config-slider" style="width:70%;" data-min="-100" data-max="100" data-step="1"></div> <input data-tips="自定义点文本水平位置" data-sliderid="scattersinglelabellabelplaceslider" id="scattersinglelabellabelplacesliderdiy" type="text" class="luckysheet-datavisual-config-input" data-bigclass="scattersingle" data-attr="label" data-func="labelplacediy" placeholder="请输入" style="width:10%;margin-left:10px;text-align:center;margin-right: 2px;" /><label for="scattersinglelabellabelplacesliderdiy">px</label> <br /> <div data-tips="滑动修改点文本垂直位置" id="scattersinglelabellabelplaceslider1" data-bigclass="scattersingle" data-attr="label" data-func="labelplacediy" class="luckysheet-datavisual-config-slider" style="width:70%;" data-min="-100" data-max="100" data-step="1"></div> <input data-tips="自定义点文本垂直位置" data-sliderid="scattersinglelabellabelplaceslider1" id="scattersinglelabellabelplaceslider1diy" type="text" class="luckysheet-datavisual-config-input" data-bigclass="scattersingle" data-attr="label" data-func="labelplacediy" placeholder="请输入" style="width:10%;margin-left:10px;text-align:center;margin-right: 2px;" /><label for="scattersinglelabellabelplaceslider1diy">px</label> </div> <div class="luckysheet-datavisual-content-row"> <label data-tips="加粗" data-bigclass="scattersingle" data-attr="label" data-func="labelbold" for="scattersinglelabellabelbold" style="font-weight:bold;"><i class="fa fa-bold" aria-hidden="true"></i></label> <input type="checkbox" name="scattersinglelabellabelbold" id="scattersinglelabellabelbold" data-bigclass="scattersingle" data-attr="label" data-func="labelbold"> <label data-tips="斜体" data-bigclass="scattersingle" data-attr="label" data-func="labelitalic" for="scattersinglelabellabelitalic" class="luckysheet-datavisual-content-column-italic"><i class="fa fa-italic" aria-hidden="true"></i></label> <input type="checkbox" name="scattersinglelabellabelitalic" id="scattersinglelabellabelitalic" data-bigclass="scattersingle" data-attr="label" data-func="labelitalic"> <select data-sliderdiy="scattersinglelabellabelfontsizeslider" data-width="50" data-tips="字体大小" name="scattersinglelabellabelfontsize" id="scattersinglelabellabelfontsize" data-bigclass="scattersingle" data-attr="label" data-func="labelfontsize"> <option value="12">12px</option> <option value="14">14px</option> <option value="16">16px</option> <option value="18">18px</option> <option value="20">20px</option> <option value="22">22px</option> <option value="24">24px</option> <option value="30">30px</option> <option value="36">36px</option> <option value="diy">自定义</option> </select> <input data-tips="字体颜色" class="luckysheet-datavisual-config-color" id="scattersinglelinelabelcolor" type="text" data-bigclass="scattersingle" data-attr="label" data-func="labelcolor" /> </div> <div class="luckysheet-datavisual-content-row" style="display:none;"> <div data-tips="滑动修改字体大小" id="scattersinglelabellabelfontsizeslider" data-bigclass="scattersingle" data-attr="label" data-func="labelfontsize" class="luckysheet-datavisual-config-slider" style="width:70%;" data-min="12" data-max="100" data-step="1"></div> <input data-tips="自定义字体大小" data-sliderid="scattersinglelabellabelfontsizeslider" id="scattersinglelabellabelfontsizesliderdiy" type="text" class="luckysheet-datavisual-config-input" data-bigclass="scattersingle" data-attr="label" data-func="labelfontsize" placeholder="请输入" style="width:10%;margin-left:10px;text-align:center;margin-right: 2px;" /><label for="scattersinglelabellabelfontsizesliderdiy">px</label> </div> </div> </div> </div> </div> <div class="luckysheet-chart-point-config-chart"> <div id="luckysheet-chart-point-config-chart-c" class="luckysheet-chart-point-config-chart-c"> </div> </div> </div>';
const luckysheetToolHTML = '<div id="luckysheet-tooltip-up" class="jfk-tooltip" role="tooltip" aria-hidden="true" style="left: 505px; top: 410px;"><div class="jfk-tooltip-contentId">组合图表</div><div class="jfk-tooltip-arrow jfk-tooltip-arrowup" style="left: 35.5px;"><div class="jfk-tooltip-arrowimplbefore"></div><div class="jfk-tooltip-arrowimplafter"></div></div></div>';

// toolbar
function menuToolBar() {
    return createToolbarHtml();
}

function customLoadingConfig() {
    const _locale = locale();
    const info = _locale.info;
    const config = {
        enable: true,
        image: ()=>{
            return `<svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>`
        },
        text: info.loading,
        viewBox: "32 32 64 64", // 只有为path时，才会使用
        imageClass: '',
        textClass: '',
        customClass: ''
    }
    if (JSON.stringify(luckysheetConfigsetting.loading) !== '{}') {
        Object.assign(config, luckysheetConfigsetting.loading);
    }
    return config;
}

const luckysheetloadingImage = function (config) {
    if(typeof config.image==="function"){
        return config.image()
    }
    const regE = new RegExp("^(image|path)://");
    const regResult = regE.exec(config.image);
    let imageHtml = '';
    if (regResult !== null) {
        const prefix = regResult[0];
        const type = regResult[1];
        const imageStr = regResult.input.substring(prefix.length);
        switch (type) {
            case "image":
                imageHtml = `<div class="image-type" style="background-image: url(${imageStr});"></div>`;
                break;
            case "path":
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("class", "path-type");
                svg.setAttribute("viewBox", config.viewBox);
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", imageStr);
                path.setAttribute("fill", "currentColor");
                svg.appendChild(path);
                imageHtml = svg.outerHTML;
                break;
            default:
                break;
        }
    }
    return imageHtml;
}

const luckysheetlodingHTML = function (target, coverConfig) {
    if (!target) {
        return;
    }
    const config = customLoadingConfig();
    if (coverConfig && JSON.stringify(coverConfig) !== "{}") {
        Object.assign(config, coverConfig);
    }
    if (typeof config.enable === "boolean" && config.enable === false) {
        return {
            el: '',
            show: show,
            close: close
        }
    }
    const imageHtml = luckysheetloadingImage(config);
    const id = "luckysheet-loading-" + uuid.v4();
    const loadingHtml = `
        <div class="luckysheet-loading-content"> 
            <div class="${config.imageClass} luckysheet-loading-image">
                ${imageHtml}
            </div>
            <div class="${config.textClass} luckysheet-loading-text">
            <span>${config.text}</span>
            </div>    
        </div>`;
    const loading = document.createElement("div");
    loading.id = id;
    loading.className = "luckysheet-loading-mask " + config.customClass;
    $(loading).html(loadingHtml);
    $(target).append(loading);

    function show() {
        if(id){
            $("#" + id).show();
        }     
    }

    function close() {
        if(id){
            $("#" + id).hide();
        }  
    }
    return {
        el: loading,
        show: show,
        close: close
    };
}

// var menusetting = {
//     menu_selectall: '<div id="luckysheet-selectall-btn-title"><i class="fa fa-i-cursor"></i> 全选</div>',
//     menu_copy: '<div id="luckysheet-copy-btn-title"><i class="fa fa-copy"></i> 复制</div>',
//     menu_undo: '<div id="luckysheet-redo-btn-title"><i class="fa fa-reply"></i> 撤销</div>',
//     menu_redo: '<div id="luckysheet-undo-btn-title"><i class="fa fa-share"></i> 恢复</div>',
//     menu_paste: '<div id="luckysheet-paste-btn-title"><i class="fa fa-clipboard"></i> 粘贴</div>',
//     menu_download: '<div id="luckysheet-download-btn-title"><i class="fa fa-cloud-download"></i> 下载</div>',
//     menu_share: '<div id="luckysheet-share-btn-title"><i class="fa fa-share-alt"></i> 分享</div>',
//     menu_chart: '<div id="luckysheet-chart-btn-title"> <i class="fa fa-pie-chart"></i> 图表生成</div>',
//     menu_pivot: '<div id="luckysheet-pivot-btn-title"> <i class="fa fa-cube" aria-hidden="true"></i> 数据透视表</div>',
//     menu_freezenrow: '<div id="luckysheet-freezen-btn-horizontal"><i class="fa fa-list-alt"></i> 冻结首行</div>',
//     menu_freezencolumn: '<div id="luckysheet-freezen-btn-vertical"><i class="fa fa-indent"></i> 冻结首列</div>',
// };

const luckyColor = [
    "#c1232b",
    "#27727b",
    "#fcce10",
    "#e87c25",
    "#b5c334",
    "#fe8463",
    "#9bca63",
    "#fad860",
    "#f3a43b",
    "#60c0dd",
    "#d7504b",
    "#c6e579",
    "#f4e001",
    "#f0805a",
    "#26c0c0",
    "#c12e34",
    "#e6b600",
    "#0098d9",
    "#2b821d",
    "#005eaa",
    "#339ca8",
    "#cda819",
    "#32a487",
    "#3fb1e3",
    "#6be6c1",
    "#626c91",
    "#a0a7e6",
    "#c4ebad",
    "#96dee8"
];

const keycode = {

    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    PAUSE: 19,
    CAPSLOCK: 20,
    ESC: 27,

    SPACE: 33,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,

    WIN: 91,
    WIN_R: 92,
    MENU: 93,

    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLLLOCK: 145
};

const luckysheetdefaultstyle = {
    fillStyle: "#000000",
    textBaseline: "middle",
    strokeStyle: "#dfdfdf",
    rowFillStyle: "#5e5e5e",
    textAlign: 'center'
}

const luckysheetdefaultFont = function(){
    return  'normal normal normal '+ Store.defaultFontSize +'pt '+ locale().fontarray[0] +', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC",  "WenQuanYi Micro Hei", sans-serif';
} 

const luckysheet_CFiconsImg = new Image();
luckysheet_CFiconsImg.src = "data:image/png;base64,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";

const iconfontObjects = {
    border:{
        'border-top': ' iconfont luckysheet-iconfont-shangbiankuang',
        'border-bottom': ' iconfont luckysheet-iconfont-xiabiankuang',
        'border-left': ' iconfont luckysheet-iconfont-zuobiankuang',
        'border-right': ' iconfont luckysheet-iconfont-youbiankuang',
        'border-none': ' iconfont luckysheet-iconfont-wubiankuang',
        'border-all': ' iconfont luckysheet-iconfont-quanjiabiankuang',
        'border-outside': ' iconfont luckysheet-iconfont-sizhoujiabiankuang',
        'border-inside': ' iconfont luckysheet-iconfont-neikuangxian',
        'border-horizontal': ' iconfont luckysheet-iconfont-neikuanghengxian',
        'border-vertical': ' iconfont luckysheet-iconfont-neikuangshuxian',
    },
    align:{
        'left': ' iconfont luckysheet-iconfont-wenbenzuoduiqi',
        'center': ' iconfont luckysheet-iconfont-wenbenjuzhongduiqi',
        'right': ' iconfont luckysheet-iconfont-wenbenyouduiqi',
        'top': ' iconfont luckysheet-iconfont-dingbuduiqi',
        'middle': ' iconfont luckysheet-iconfont-shuipingduiqi',
        'bottom': ' iconfont luckysheet-iconfont-dibuduiqi',
    },
    textWrap:{
        'overflow': ' iconfont luckysheet-iconfont-yichu1',
        'wrap': ' iconfont luckysheet-iconfont-zidonghuanhang',
        'clip': ' iconfont luckysheet-iconfont-jieduan',
    },
    rotation:{
        'none': ' iconfont luckysheet-iconfont-wuxuanzhuang',
        'angleup': ' iconfont luckysheet-iconfont-xiangshangqingxie',
        'angledown': ' iconfont luckysheet-iconfont-xiangxiaqingxie',
        'vertical': ' iconfont luckysheet-iconfont-shupaiwenzi',
        'rotation-up': ' iconfont luckysheet-iconfont-wenbenxiangshang',
        'rotation-down': ' iconfont luckysheet-iconfont-xiangxia90',
    }
}

/**
 *单元格右击菜单配置
 *
 */
function customCellRightClickConfig() {
    const config = {
		copy: true, // copy
		copyAs: true, // copy as
		paste: true, // paste
		insertRow: true, // insert row
		insertColumn: true, // insert column
		deleteRow: true, // delete the selected row
		deleteColumn: true, // delete the selected column
		deleteCell: true, // delete cell
		hideRow: true, // hide the selected row and display the selected row
		hideColumn: true, // hide the selected column and display the selected column
		rowHeight: true, // row height
		columnWidth: true, // column width
		clear: true, // clear content
		matrix: true, // matrix operation selection
		sort: true, // sort selection
		filter: true, // filter selection
		chart: true, // chart generation
		image: true, // insert picture
		link: true, // insert link
		data: true, // data verification
		cellFormat: true // Set cell format
	}

    // cellRightClickConfig determines the final result
    if(JSON.stringify(luckysheetConfigsetting.cellRightClickConfig) !== '{}'){
        Object.assign(config,luckysheetConfigsetting.cellRightClickConfig);
    }
    luckysheetConfigsetting.cellRightClickConfig = config;
    return config;
}

/**
 *sheet页右击菜单配置
 *
 */
function customSheetRightClickConfig() {
    const config = {
        delete: true, //Delete
        copy: true, //Copy
        rename: true, //Rename
        color: true, //Change color
        hide: true, //Hide, unhide
        move: true, //Move to the left, move to the right
	}

    // sheetRightClickConfig determines the final result
    if(JSON.stringify(luckysheetConfigsetting.sheetRightClickConfig) !== '{}'){
        Object.assign(config,luckysheetConfigsetting.sheetRightClickConfig);
    }
    luckysheetConfigsetting.sheetRightClickConfig = config;
    return config;
}

export {
    gridHTML,
    columeHeader_word,
    columeHeader_word_index,
    flow,
    colsmenuHTML,
    rightclickHTML,
    pivottableconfigHTML,
    pivottablesumHTML,
    sheetHTML,
    columnHeaderHTML,
    sheetselectlistHTML,
    sheetselectlistitemHTML,
    inputHTML,
    modelHTML,
    maskHTML,
    filtermenuHTML,
    filtersubmenuHTML,
    sheetconfigHTML,
    luckysheetPivotTableHTML,
    luckysheetAlternateformatHtml,
    luckysheetchartpointconfigHTML,
    luckysheetToolHTML,
    menuToolBar,
    luckysheetlodingHTML,
    luckyColor,
    keycode,
    luckysheetdefaultstyle,
    luckysheet_CFiconsImg,
    luckysheetdefaultFont,
    iconfontObjects
}