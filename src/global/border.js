import { getSheetIndex } from '../methods/get';
import { getObjType } from '../utils/util';
import Store from '../store';

//获取表格边框数据计算值
function getBorderInfoComputeRange(dataset_row_st,dataset_row_ed,dataset_col_st,dataset_col_ed,sheetIndex) {
    let borderInfoCompute = {};

    let cfg, data; 
    if(sheetIndex == null){
        cfg = Store.config;
        data = Store.flowdata;
    }
    else{
        cfg = Store.luckysheetfile[getSheetIndex(sheetIndex)].config;
        data = Store.luckysheetfile[getSheetIndex(sheetIndex)].data;
    }

    let borderInfo = cfg["borderInfo"];

    if(borderInfo != null && borderInfo.length > 0){
        for(let i = 0; i < borderInfo.length; i++){
            let rangeType = borderInfo[i].rangeType;

            if(rangeType == "range"){
                let borderType = borderInfo[i].borderType;
                let borderColor = borderInfo[i].color;
                let borderStyle = borderInfo[i].style;

                let borderRange = borderInfo[i].range;

                for(let j = 0; j < borderRange.length; j++){
                    let bd_r1 = borderRange[j].row[0], bd_r2 = borderRange[j].row[1];
                    let bd_c1 = borderRange[j].column[0], bd_c2 = borderRange[j].column[1];

                    if(bd_r1<dataset_row_st){
                        bd_r1 = dataset_row_st;
                    }

                    if(bd_r2>dataset_row_ed){
                        bd_r2 = dataset_row_ed;
                    }

                    if(bd_c1<dataset_col_st){
                        bd_c1 = dataset_col_st;
                    }

                    if(bd_c2>dataset_col_ed){
                        bd_c2 = dataset_col_ed;
                    }

                    if(borderType == "border-left"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }
                            
                            if(borderInfoCompute[bd_r + "_" + bd_c1] == null){
                                borderInfoCompute[bd_r + "_" + bd_c1] = {};
                            }

                            borderInfoCompute[bd_r + "_" + bd_c1].l = { "color": borderColor, "style": borderStyle };

                            let bd_c_left = bd_c1 - 1;

                            if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_left]) == "object" && data[bd_r][bd_c_left].mc != null){
                                    let cell_left = data[bd_r][bd_c_left];

                                    let mc = cfg["merge"][cell_left.mc.r + "_" + cell_left.mc.c];

                                    if(mc.c + mc.cs - 1 == bd_c_left){
                                        borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                }
                            }

                            let mc = cfg["merge"] || {};  
                            for (const key in mc) {
                                let {c,r,cs,rs} = mc[key];
                                if(bd_c1 <= c + cs - 1 && bd_c1 > c && bd_r >= r && bd_r <= r + rs -1){
                                    borderInfoCompute[bd_r + "_" + bd_c1].l = null;
                                }
                            }
                        }
                    }
                    else if(borderType == "border-right"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }
                            
                            if(borderInfoCompute[bd_r + "_" + bd_c2] == null){
                                borderInfoCompute[bd_r + "_" + bd_c2] = {};
                            }

                            borderInfoCompute[bd_r + "_" + bd_c2].r = { "color": borderColor, "style": borderStyle };

                            let bd_c_right = bd_c2 + 1;

                            if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_right]) == "object" && data[bd_r][bd_c_right].mc != null){
                                    let cell_right = data[bd_r][bd_c_right];

                                    let mc = cfg["merge"][cell_right.mc.r + "_" + cell_right.mc.c];

                                    if(mc.c == bd_c_right){
                                        borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                }
                            }
                            let mc = cfg["merge"] || {};  
                            for (const key in mc) {
                                let {c,r,cs,rs} = mc[key];
                                if(bd_c2 < c + cs - 1 && bd_c2 >= c && bd_r >= r && bd_r <= r + rs -1){
                                    borderInfoCompute[bd_r + "_" + bd_c2].r = null;
                                }
                            }
                        }
                    }
                    else if(borderType == "border-top"){
                        if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r1] != null) {
                            continue;
                        }

                        for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                            if(borderInfoCompute[bd_r1 + "_" + bd_c] == null){
                                borderInfoCompute[bd_r1 + "_" + bd_c] = {};
                            }

                            borderInfoCompute[bd_r1 + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };

                            let bd_r_top = bd_r1 - 1;

                            if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                if(data[bd_r_top] != null && getObjType(data[bd_r_top][bd_c]) == "object" && data[bd_r_top][bd_c].mc != null){
                                    let cell_top = data[bd_r_top][bd_c];

                                    let mc = cfg["merge"][cell_top.mc.r + "_" + cell_top.mc.c];

                                    if(mc.r + mc.rs - 1 == bd_r_top){
                                        borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                }
                            }

                            let mc = cfg["merge"] || {};  
                            for (const key in mc) {
                                let {c,r,cs,rs} = mc[key];
                                if(bd_r1 <= r + rs - 1 && bd_r1 > r && bd_c >= c && bd_c <= c + cs -1){
                                    borderInfoCompute[bd_r1 + "_" + bd_c].t = null;
                                }
                            }
                        }
                    }
                    else if(borderType == "border-bottom"){
                        if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r2] != null) {
                            continue;
                        }

                        for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                            if(borderInfoCompute[bd_r2 + "_" + bd_c] == null){
                                borderInfoCompute[bd_r2 + "_" + bd_c] = {};
                            }

                            borderInfoCompute[bd_r2 + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };

                            let bd_r_bottom = bd_r2 + 1;

                            if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                if(data[bd_r_bottom] != null && getObjType(data[bd_r_bottom][bd_c]) == "object" && data[bd_r_bottom][bd_c].mc != null){
                                    let cell_bottom = data[bd_r_bottom][bd_c];

                                    let mc = cfg["merge"][cell_bottom.mc.r + "_" + cell_bottom.mc.c];

                                    if(mc.r == bd_r_bottom){
                                        borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                }
                            }

                            let mc = cfg["merge"] || {};  
                            for (const key in mc) {
                                let {c,r,cs,rs} = mc[key];
                                if(bd_r2 < r + rs - 1 && bd_r2 >= r && bd_c >= c && bd_c <= c + cs -1){
                                    borderInfoCompute[bd_r2 + "_" + bd_c].b = null;
                                }
                            }
                        }
                    }
                    else if(borderType == "border-all"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                    let cell = data[bd_r][bd_c];

                                    let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                    if(mc.r == bd_r){
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    }
                                    
                                    if(mc.r + mc.rs - 1 == bd_r){
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }

                                    if(mc.c == bd_c){
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                    }
                                    
                                    if(mc.c + mc.cs - 1 == bd_c){
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else{
                                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                                    }

                                    borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                    borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                    borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                }

                                if(bd_r == bd_r1){
                                    let bd_r_top = bd_r1 - 1;

                                    if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                        if(data[bd_r_top] != null && getObjType(data[bd_r_top][bd_c]) == "object" && data[bd_r_top][bd_c].mc != null){
                                            let cell_top = data[bd_r_top][bd_c];

                                            let mc = cfg["merge"][cell_top.mc.r + "_" + cell_top.mc.c];

                                            if(mc.r + mc.rs - 1 == bd_r_top){
                                                borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                }
                                
                                if(bd_r == bd_r2){
                                    let bd_r_bottom = bd_r2 + 1;

                                    if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                        if(data[bd_r_bottom] != null && getObjType(data[bd_r_bottom][bd_c]) == "object" && data[bd_r_bottom][bd_c].mc != null){
                                            let cell_bottom = data[bd_r_bottom][bd_c];

                                            let mc = cfg["merge"][cell_bottom.mc.r + "_" + cell_bottom.mc.c];

                                            if(mc.r == bd_r_bottom){
                                                borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }
                                
                                if(bd_c == bd_c1){
                                    let bd_c_left = bd_c1 - 1;

                                    if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                        if(data[bd_r] != null && getObjType(data[bd_r][bd_c_left]) == "object" && data[bd_r][bd_c_left].mc != null){
                                            let cell_left = data[bd_r][bd_c_left];

                                            let mc = cfg["merge"][cell_left.mc.r + "_" + cell_left.mc.c];

                                            if(mc.c + mc.cs - 1 == bd_c_left){
                                                borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }
                                
                                if(bd_c == bd_c2){
                                    let bd_c_right = bd_c2 + 1;

                                    if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                        if(data[bd_r] != null && getObjType(data[bd_r][bd_c_right]) == "object" && data[bd_r][bd_c_right].mc != null){
                                            let cell_right = data[bd_r][bd_c_right];

                                            let mc = cfg["merge"][cell_right.mc.r + "_" + cell_right.mc.c];

                                            if(mc.c == bd_c_right){
                                                borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(borderType == "border-outside"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(!(bd_r == bd_r1 || bd_r == bd_r2 || bd_c == bd_c1 || bd_c == bd_c2)){
                                    continue;
                                }

                                if(bd_r == bd_r1){
                                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                                    }

                                    borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };

                                    let bd_r_top = bd_r1 - 1;

                                    if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                        if(data[bd_r_top] != null && getObjType(data[bd_r_top][bd_c]) == "object" && data[bd_r_top][bd_c].mc != null){
                                            let cell_top = data[bd_r_top][bd_c];

                                            let mc = cfg["merge"][cell_top.mc.r + "_" + cell_top.mc.c];

                                            if(mc.r + mc.rs - 1 == bd_r_top){
                                                borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                }

                                if(bd_r == bd_r2){
                                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                                    }

                                    borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };

                                    let bd_r_bottom = bd_r2 + 1;

                                    if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                        if(data[bd_r_bottom] != null && getObjType(data[bd_r_bottom][bd_c]) == "object" && data[bd_r_bottom][bd_c].mc != null){
                                            let cell_bottom = data[bd_r_bottom][bd_c];

                                            let mc = cfg["merge"][cell_bottom.mc.r + "_" + cell_bottom.mc.c];

                                            if(mc.r == bd_r_bottom){
                                                borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }

                                if(bd_c == bd_c1){
                                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                                    }

                                    borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };

                                    let bd_c_left = bd_c1 - 1;

                                    if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                        if(data[bd_r] != null && getObjType(data[bd_r][bd_c_left]) == "object" && data[bd_r][bd_c_left].mc != null){
                                            let cell_left = data[bd_r][bd_c_left];

                                            let mc = cfg["merge"][cell_left.mc.r + "_" + cell_left.mc.c];

                                            if(mc.c + mc.cs - 1 == bd_c_left){
                                                borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }

                                if(bd_c == bd_c2){
                                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                                    }

                                    borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };

                                    let bd_c_right = bd_c2 + 1;

                                    if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                        if(data[bd_r] != null && getObjType(data[bd_r][bd_c_right]) == "object" && data[bd_r][bd_c_right].mc != null){
                                            let cell_right = data[bd_r][bd_c_right];

                                            let mc = cfg["merge"][cell_right.mc.r + "_" + cell_right.mc.c];

                                            if(mc.c == bd_c_right){
                                                borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                            }
                                        }
                                        else{
                                            borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": borderColor, "style": borderStyle }; 
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(borderType == "border-inside"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(bd_r == bd_r1 && bd_c == bd_c1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r2 && bd_c == bd_c1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r1 && bd_c == bd_c2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r2 && bd_c == bd_c2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.c == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.c + mc.cs - 1 == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.c == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.c + mc.cs - 1 == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_c == bd_c1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.r == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.r + mc.rs - 1 == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_c == bd_c2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.r == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.r + mc.rs - 1 == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else{
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.r == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.r + mc.rs - 1 == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }

                                        if(mc.c == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.c + mc.cs - 1 == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }    
                            }
                        }
                    }
                    else if(borderType == "border-horizontal"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(bd_r == bd_r1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_r == bd_r2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else{
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c];

                                        if(mc.r == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.r + mc.rs - 1 == bd_r){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].t = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].b = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                            }
                        }
                    }
                    else if(borderType == "border-vertical"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(bd_c == bd_c1){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else if(bd_c == bd_c2){
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){

                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                                else{
                                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                                        let cell = data[bd_r][bd_c];

                                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c] || {};

                                        if(mc.c == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        }
                                        else if(mc.c + mc.cs - 1 == bd_c){
                                            if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                                borderInfoCompute[bd_r + "_" + bd_c] = {};
                                            }

                                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                        }
                                    }
                                    else{
                                        if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                                            borderInfoCompute[bd_r + "_" + bd_c] = {};
                                        }

                                        borderInfoCompute[bd_r + "_" + bd_c].l = { "color": borderColor, "style": borderStyle };
                                        borderInfoCompute[bd_r + "_" + bd_c].r = { "color": borderColor, "style": borderStyle };
                                    }
                                }
                            }
                        }
                    }
                    else if(borderType == "border-none"){
                        for(let bd_r = bd_r1; bd_r <= bd_r2; bd_r++){
                            if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                                continue;
                            }

                            for(let bd_c = bd_c1; bd_c <= bd_c2; bd_c++){
                                if(borderInfoCompute[bd_r + "_" + bd_c] != null){
                                    delete borderInfoCompute[bd_r + "_" + bd_c];
                                }

                                if(bd_r == bd_r1){
                                    let bd_r_top = bd_r1 - 1;

                                    if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                        delete borderInfoCompute[bd_r_top + "_" + bd_c].b;
                                    }
                                }
                                
                                if(bd_r == bd_r2){
                                    let bd_r_bottom = bd_r2 + 1;

                                    if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                        delete borderInfoCompute[bd_r_bottom + "_" + bd_c].t;
                                    }
                                }
                                
                                if(bd_c == bd_c1){
                                    let bd_c_left = bd_c1 - 1;

                                    if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                        delete borderInfoCompute[bd_r + "_" + bd_c_left].r;
                                    }
                                }
                                
                                if(bd_c == bd_c2){
                                    let bd_c_right = bd_c2 + 1;

                                    if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                        delete borderInfoCompute[bd_r + "_" + bd_c_right].l;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if(rangeType == "cell"){
                let value = borderInfo[i].value;

                let bd_r = value.row_index, bd_c = value.col_index;

                if(bd_r < dataset_row_st || bd_r > dataset_row_ed || bd_c < dataset_col_st || bd_c > dataset_col_ed){
                    continue;
                }

                if (cfg["rowhidden"] != null && cfg["rowhidden"][bd_r] != null) {
                    continue;
                }

                if(value.l != null || value.r != null || value.t != null || value.b != null){
                    if(borderInfoCompute[bd_r + "_" + bd_c] == null){
                        borderInfoCompute[bd_r + "_" + bd_c] = {};
                    }

                    if(data[bd_r] != null && getObjType(data[bd_r][bd_c]) == "object" && data[bd_r][bd_c].mc != null){
                        let cell = data[bd_r][bd_c];
                        let mc = cfg["merge"][cell.mc.r + "_" + cell.mc.c] || {};

                        if(value.l != null && bd_c == mc.c){ //左边框
                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": value.l.color, "style": value.l.style };

                            let bd_c_left = bd_c - 1;

                            if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_left]) == "object" && data[bd_r][bd_c_left].mc != null){
                                    let cell_left = data[bd_r][bd_c_left];

                                    let mc_l = cfg["merge"][cell_left.mc.r + "_" + cell_left.mc.c];

                                    if(mc_l.c + mc_l.cs - 1 == bd_c_left){
                                        borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": value.l.color, "style": value.l.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": value.l.color, "style": value.l.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].l = null;
                        }

                        if(value.r != null && bd_c == mc.c + mc.cs - 1){ //右边框
                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": value.r.color, "style": value.r.style };

                            let bd_c_right = bd_c + 1;

                            if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_right]) == "object" && data[bd_r][bd_c_right].mc != null){
                                    let cell_right = data[bd_r][bd_c_right];

                                    let mc_r = cfg["merge"][cell_right.mc.r + "_" + cell_right.mc.c];

                                    if(mc_r.c == bd_c_right){
                                        borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": value.r.color, "style": value.r.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": value.r.color, "style": value.r.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].r = null;
                        }

                        if(value.t != null && bd_r == mc.r){ //上边框
                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": value.t.color, "style": value.t.style };

                            let bd_r_top = bd_r - 1;

                            if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                if(data[bd_r_top] != null && getObjType(data[bd_r_top][bd_c]) == "object" && data[bd_r_top][bd_c].mc != null){
                                    let cell_top = data[bd_r_top][bd_c];

                                    let mc_t = cfg["merge"][cell_top.mc.r + "_" + cell_top.mc.c];

                                    if(mc_t.r + mc_t.rs - 1 == bd_r_top){
                                        borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": value.t.color, "style": value.t.style };
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": value.t.color, "style": value.t.style };
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].t = null;
                        }

                        if(value.b != null && bd_r == mc.r + mc.rs - 1){ //下边框
                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": value.b.color, "style": value.b.style };

                            let bd_r_bottom = bd_r + 1;

                            if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                if(data[bd_r_bottom] != null && getObjType(data[bd_r_bottom][bd_c]) == "object" && data[bd_r_bottom][bd_c].mc != null){
                                    let cell_bottom = data[bd_r_bottom][bd_c];
                                    
                                    let mc_b = cfg["merge"][cell_bottom.mc.r + "_" + cell_bottom.mc.c];

                                    if(mc_b.r == bd_r_bottom){
                                        borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": value.b.color, "style": value.b.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": value.b.color, "style": value.b.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].b = null;
                        }
                    }
                    else{
                        if(value.l != null){ //左边框
                            borderInfoCompute[bd_r + "_" + bd_c].l = { "color": value.l.color, "style": value.l.style };

                            let bd_c_left = bd_c - 1;

                            if(bd_c_left >= 0 && borderInfoCompute[bd_r + "_" + bd_c_left]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_left]) == "object" && data[bd_r][bd_c_left].mc != null){
                                    let cell_left = data[bd_r][bd_c_left];

                                    let mc_l = cfg["merge"][cell_left.mc.r + "_" + cell_left.mc.c];

                                    if(mc_l.c + mc_l.cs - 1 == bd_c_left){
                                        borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": value.l.color, "style": value.l.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_left].r = { "color": value.l.color, "style": value.l.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].l = null;
                        }

                        if(value.r != null){ //右边框
                            borderInfoCompute[bd_r + "_" + bd_c].r = { "color": value.r.color, "style": value.r.style };

                            let bd_c_right = bd_c + 1;

                            if(bd_c_right < data[0].length && borderInfoCompute[bd_r + "_" + bd_c_right]){
                                if(data[bd_r] != null && getObjType(data[bd_r][bd_c_right]) == "object" && data[bd_r][bd_c_right].mc != null){
                                    let cell_right = data[bd_r][bd_c_right];

                                    let mc_r = cfg["merge"][cell_right.mc.r + "_" + cell_right.mc.c];

                                    if(mc_r.c == bd_c_right){
                                        borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": value.r.color, "style": value.r.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r + "_" + bd_c_right].l = { "color": value.r.color, "style": value.r.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].r = null;
                        }

                        if(value.t != null){ //上边框
                            borderInfoCompute[bd_r + "_" + bd_c].t = { "color": value.t.color, "style": value.t.style };

                            let bd_r_top = bd_r - 1;

                            if(bd_r_top >= 0 && borderInfoCompute[bd_r_top + "_" + bd_c]){
                                if(data[bd_r_top] != null && getObjType(data[bd_r_top][bd_c]) == "object" && data[bd_r_top][bd_c].mc != null){
                                    let cell_top = data[bd_r_top][bd_c];

                                    let mc_t = cfg["merge"][cell_top.mc.r + "_" + cell_top.mc.c];

                                    if(mc_t.r + mc_t.rs - 1 == bd_r_top){
                                        borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": value.t.color, "style": value.t.style };
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_top + "_" + bd_c].b = { "color": value.t.color, "style": value.t.style };
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].t = null;
                        }

                        if(value.b != null){ //下边框
                            borderInfoCompute[bd_r + "_" + bd_c].b = { "color": value.b.color, "style": value.b.style };

                            let bd_r_bottom = bd_r + 1;

                            if(bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + "_" + bd_c]){
                                if(data[bd_r_bottom] != null && getObjType(data[bd_r_bottom][bd_c]) == "object" && data[bd_r_bottom][bd_c].mc != null){
                                    let cell_bottom = data[bd_r_bottom][bd_c];
                                    
                                    let mc_b = cfg["merge"][cell_bottom.mc.r + "_" + cell_bottom.mc.c];

                                    if(mc_b.r == bd_r_bottom){
                                        borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": value.b.color, "style": value.b.style }; 
                                    }
                                }
                                else{
                                    borderInfoCompute[bd_r_bottom + "_" + bd_c].t = { "color": value.b.color, "style": value.b.style }; 
                                }
                            }
                        }
                        else{
                            borderInfoCompute[bd_r + "_" + bd_c].b = null;
                        }
                    }
                }
                else{
                    delete borderInfoCompute[bd_r + "_" + bd_c];
                }
            }
        }
    }

    return borderInfoCompute;
}

function getBorderInfoCompute(sheetIndex) {
    let borderInfoCompute = {};

    let cfg, data; 
    if(sheetIndex == null){
        cfg = Store.config;
        data = Store.flowdata;
    }
    else{
        cfg = Store.luckysheetfile[getSheetIndex(sheetIndex)].config;
        data = Store.luckysheetfile[getSheetIndex(sheetIndex)].data;
    }

    borderInfoCompute = getBorderInfoComputeRange(0, data.length,0, data[0].length, sheetIndex);

    return borderInfoCompute;
}

export {
    getBorderInfoCompute,
    getBorderInfoComputeRange
}