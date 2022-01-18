import Store from '../store';
import { replaceHtml,transformRangeToAbsolute,openSelfModel } from '../utils/util';
import { modelHTML } from './constant';
import sheetmanage from './sheetmanage';
import menuButton from './menuButton';
import {checkProtectionNotEnable} from './protection';
import { jfrefreshgrid } from '../global/refresh';
import locale from '../locale/locale';
import { setcellvalue } from '../global/setdata';


let isInitialCellFormatModel = false;

function initialCellFormatModelEvent(){
    const _locale = locale();
    const local_cellFormat = _locale.cellFormat;

    $("#luckysheet-cellFormat-confirm").click(function(){
        let locked = $("#luckysheet-protection-check-locked").is(':checked');
        let hidden = $("#luckysheet-protection-check-hidden").is(':checked');
    
        locked = locked==true?1:0;
        hidden = hidden==true?1:0;

        let d = recycleSeletion(
            function(cell, r, c, data){
                if(cell==null){
                    setcellvalue(r, c, data, {
                        lo:locked,
                        hi:hidden
                    });
                }
                else{
                    cell.lo = locked;
                    cell.hi = hidden;
                }
            },
            function(){
                alert(local_cellFormat.sheetDataIsNullAlert);
            }
        );

        jfrefreshgrid(d, undefined, undefined, false);

        $("#luckysheet-cellFormat-config").hide();
        $("#luckysheet-modal-dialog-mask").hide();
    });
}

function recycleSeletion(cycleFunction, dataIsNullFunction){
    if(Store.luckysheet_select_save != null && Store.luckysheet_select_save.length > 0){
        let sheetFile = sheetmanage.getSheetByIndex(), data=sheetFile.data;
        if(data!=null){
            
            for(let i=0;i<Store.luckysheet_select_save.length;i++){
                let selection = Store.luckysheet_select_save[i];
                let row = selection.row, column = selection.column;
                for(let r=row[0];r<=row[1];r++){
                    for(let c=column[0];c<=column[1];c++){
                        let cell;

                        let margeset = menuButton.mergeborer(data, r, c);
                        if (!!margeset) {
                            // row = margeset.row[1];
                            // row_pre = margeset.row[0];
                            let row_index = margeset.row[2];
                            // row_index_ed = margeset.row[3];

                            // col = margeset.column[1];
                            // col_pre = margeset.column[0];
                            let col_index = margeset.column[2];
                            // col_index_ed = margeset.column[3];

                            cell = data[row_index][col_index];
                        }
                        else{
                            cell = data[r][c];
                        }

                        // if(cell.lo==null || cell.lo==1){
                        //     locked = true;
                        //     lockedCount++;
                        // }

                        // if(cell.hi==1){
                        //     hidden = true;
                        //     hiddenCount++;
                        // }

                        // count++;

                        cycleFunction(cell, r, c, data);
                    }
                }
            }
        }
        else{
            // locked = true;
            dataIsNullFunction();
        }

        return data;
    }
}

function initialCellFormatModel(){
    if(isInitialCellFormatModel){
        return;
    }

    isInitialCellFormatModel = true;
    const _locale = locale();
    const local_cellFormat = _locale.cellFormat;
    const locale_button = _locale.button;

    //Password input initial
    $("body").append(replaceHtml(modelHTML, { 
        "id": "luckysheet-cellFormat-config", 
        "addclass": "luckysheet-cellFormat-config", 
        "title": local_cellFormat.cellFormatTitle, 
        "content": `
            <div class="luckysheet-cellFormat-menu-c">
                <div class="luckysheet-cellFormat-menu luckysheet-cellFormat-menu-active" id="luckysheet-cellFormat-protection">
                    ${local_cellFormat.protection}
                </div>
            </div>
            <div id="luckysheet-cellFormat-protection-content" class="luckysheet-cellFormat-content">
                <div class="luckysheet-cellFormat-protection">
                    <p>
                        ${local_cellFormat.protectionTips}
                    </p>
                    <label for="luckysheet-protection-check-locked"><input id="luckysheet-protection-check-locked" name="luckysheet-protection-check-locked" type="checkbox">${local_cellFormat.locked}</label><span>部分选中</span>
                    <br/>
                    <label for="luckysheet-protection-check-hidden"><input id="luckysheet-protection-check-hidden" name="luckysheet-protection-check-hidden" type="checkbox">${local_cellFormat.hidden}</label><span>全部选中</span>
                </div>
            </div>
        `, 
        "botton":  `<button id="luckysheet-cellFormat-confirm" class="btn btn-primary">${locale_button.confirm}</button>
                    <button class="btn btn-default luckysheet-model-close-btn">${locale_button.cancel}</button>`, 
        "style": "z-index:100003" 
    }));

    initialCellFormatModelEvent();
}

export function openCellFormatModel(){
    initialCellFormatModel();

    const _locale = locale();
    const local_cellFormat = _locale.cellFormat;
    const locale_button = _locale.button;

    $("#luckysheet-rightclick-menu").hide();

    if(!checkProtectionNotEnable(Store.currentSheetIndex)){
        return;
    }

    let locked =false, hidden=false;
    let lockedCount=0, hiddenCount=0, count=0;
    if(Store.luckysheet_select_save != null && Store.luckysheet_select_save.length > 0){
        recycleSeletion(
            function(cell){
                // let cell = data[r][c];
                if(cell==null || cell.lo==null || cell.lo==1){
                    locked = true;
                    lockedCount++;
                }

                if(cell!=null && cell.hi==1){
                    hidden = true;
                    hiddenCount++;
                }

                count++;
            },
            function(){
                locked = true;
            }
        );
    }
    else{
        alert(local_cellFormat.selectionIsNullAlert);
        return;
    }

    let tipsLock="", tipshidden="";
    if(locked){
        tipsLock = lockedCount==count?local_cellFormat.tipsAll:local_cellFormat.tipsPart;
    }

    if(hidden){
        tipshidden = hiddenCount==count?local_cellFormat.tipsAll:local_cellFormat.tipsPart;
    }

    $("#luckysheet-protection-check-locked").prop('checked',locked).parent().next().html(tipsLock);
    $("#luckysheet-protection-check-hidden").prop('checked',hidden).parent().next().html(tipshidden);


    openSelfModel("luckysheet-cellFormat-config");
}