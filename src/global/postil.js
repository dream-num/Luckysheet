//批注
    luckysheet.postil = {
        defaultWidth: 144,
        defaultHeight: 84,
        currentObj: null,
        currentWinW: null,
        currentWinH: null,
        resize: null,
        resizeXY: null,
        move: false,
        moveXY: null,
        init: function(){
            //点击批注框 聚焦
            $("#luckysheet-postil-showBoxs").off("mousedown.showPs").on("mousedown.showPs", ".luckysheet-postil-show", function(event){
                luckysheet.postil.currentObj = $(this).find(".luckysheet-postil-show-main");

                if($(this).hasClass("luckysheet-postil-show-active")){
                    event.stopPropagation();
                    return;
                }

                luckysheet.postil.removeActivePs();

                $(this).addClass("luckysheet-postil-show-active");
                $(this).find(".luckysheet-postil-dialog-resize").show();
                $(this).find(".arrowCanvas").css("z-index", 200);
                $(this).find(".luckysheet-postil-show-main").css("z-index", 200);

                event.stopPropagation();
            });
            $("#luckysheet-postil-showBoxs").off("mouseup.showPs").on("mouseup.showPs", ".luckysheet-postil-show", function(event){
                if(event.which == "3"){
                    event.stopPropagation();
                }
            });

            //批注框 改变大小
            $("#luckysheet-postil-showBoxs").off("mousedown.resize").on("mousedown.resize", ".luckysheet-postil-show .luckysheet-postil-dialog-resize .luckysheet-postil-dialog-resize-item", function(event){
                luckysheet.postil.currentObj = $(this).closest(".luckysheet-postil-show-main");
                luckysheet.postil.currentWinW = $("#luckysheet-cell-main")[0].scrollWidth;
                luckysheet.postil.currentWinH = $("#luckysheet-cell-main")[0].scrollHeight;

                luckysheet.postil.resize = $(this).data("type");

                var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;

                var position = luckysheet.postil.currentObj.position();
                var width = luckysheet.postil.currentObj.width();
                var height = luckysheet.postil.currentObj.height();

                luckysheet.postil.resizeXY = [x, y, width, height, position.left + scrollLeft, position.top + scrollTop, scrollLeft, scrollTop];

                luckysheet.setluckysheet_scroll_status(true);

                if($(this).closest(".luckysheet-postil-show").hasClass("luckysheet-postil-show-active")){
                    event.stopPropagation();
                    return;
                }

                luckysheet.postil.removeActivePs();

                $(this).closest(".luckysheet-postil-show").addClass("luckysheet-postil-show-active");
                $(this).closest(".luckysheet-postil-show").find(".luckysheet-postil-dialog-resize").show();
                $(this).closest(".luckysheet-postil-show").find(".arrowCanvas").css("z-index", 200);
                $(this).closest(".luckysheet-postil-show").find(".luckysheet-postil-show-main").css("z-index", 200);

                event.stopPropagation();
            });

            //批注框 移动
            $("#luckysheet-postil-showBoxs").off("mousedown.move").on("mousedown.move", ".luckysheet-postil-show .luckysheet-postil-dialog-move .luckysheet-postil-dialog-move-item", function(event){
                luckysheet.postil.currentObj = $(this).closest(".luckysheet-postil-show-main");
                luckysheet.postil.currentWinW = $("#luckysheet-cell-main")[0].scrollWidth;
                luckysheet.postil.currentWinH = $("#luckysheet-cell-main")[0].scrollHeight;

                luckysheet.postil.move = true;

                var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();

                var offset = luckysheet.postil.currentObj.offset();
                var position = luckysheet.postil.currentObj.position();

                luckysheet.postil.moveXY = [event.pageX - offset.left, event.pageY - offset.top, position.left, position.top, scrollLeft, scrollTop];

                luckysheet.setluckysheet_scroll_status(true);

                if($(this).closest(".luckysheet-postil-show").hasClass("luckysheet-postil-show-active")){
                    event.stopPropagation();
                    return;
                }

                luckysheet.postil.removeActivePs();

                $(this).closest(".luckysheet-postil-show").addClass("luckysheet-postil-show-active");
                $(this).closest(".luckysheet-postil-show").find(".luckysheet-postil-dialog-resize").show();
                $(this).closest(".luckysheet-postil-show").find(".arrowCanvas").css("z-index", 200);
                $(this).closest(".luckysheet-postil-show").find(".luckysheet-postil-show-main").css("z-index", 200);

                event.stopPropagation();
            });
        },
        overshow: function(event){
            $("#luckysheet-postil-overshow").remove();

            if($(event.target).closest("#luckysheet-cell-main").length == 0){
                return;
            }

            var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var x = mouse[0] + scrollLeft;
            var y = mouse[1] + scrollTop;

            if(luckysheetFreezen.freezenverticaldata != null && mouse[0] < (luckysheetFreezen.freezenverticaldata[0] - luckysheetFreezen.freezenverticaldata[2])){
                return;
            }

            if(luckysheetFreezen.freezenhorizontaldata != null && mouse[1] < (luckysheetFreezen.freezenhorizontaldata[0] - luckysheetFreezen.freezenhorizontaldata[2])){
                return;
            }

            var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];
            var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

            if(luckysheet.flowdata[row_index] == null || luckysheet.flowdata[row_index][col_index] == null || luckysheet.flowdata[row_index][col_index].ps == null){
                return;
            }

            var postil = luckysheet.flowdata[row_index][col_index].ps;

            if(postil["isshow"] || $("#luckysheet-postil-show_"+ row_index +"_"+ col_index).length > 0){
                return;
            }

            var value = postil["value"] == null ? "" : postil["value"];

            var toX = visibledatacolumn[col_index];
            var toY = row_index == 0 ? 0 : visibledatarow[row_index - 1];

            var fromX = toX + 18;
            var fromY = toY - 18;

            if(fromY < 0){
                fromY = 2;
            }

            var size = luckysheet.postil.getArrowCanvasSize(fromX, fromY, toX, toY);

            var html =  '<div id="luckysheet-postil-overshow">' +
                            '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                            '<div style="width:132px;min-height:72px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ fromX +'px;top:'+ fromY +'px;z-index:100;">'+ value +'</div>' +
                        '</div>';

            $(html).appendTo($("#luckysheet-cell-main"));

            var ctx = $("#luckysheet-postil-overshow .arrowCanvas").get(0).getContext("2d");

            luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);
        },
        getArrowCanvasSize: function(fromX, fromY, toX, toY){
            var left = toX - 5;
            
            if(fromX < toX){
                left = fromX - 5;
            }

            var top = toY - 5;
            
            if(fromY < toY){
                top = fromY - 5;
            }

            var width = Math.abs(fromX - toX) + 10;
            var height = Math.abs(fromY - toY) + 10;

            var x1 = width - 5;
            var x2 = 5;
            
            if(fromX < toX){
                x1 = 5;
                x2 = width - 5;
            }

            var y1 = height - 5;
            var y2 = 5;

            if(fromY < toY){
                y1 = 5;
                y2 = height - 5;
            }

            return [left, top, width, height, x1, y1, x2, y2];
        },
        drawArrow: function(ctx, fromX, fromY, toX, toY, theta, headlen, width, color){
            theta = luckysheet.getObjType(theta) == "undefined" ? 30 : theta;
            headlen = luckysheet.getObjType(headlen) == "undefined" ? 6 : headlen;
            width = luckysheet.getObjType(width) == "undefined" ? 1 : width;
            color = luckysheet.getObjType(color) == "undefined" ? "#000" : color;

            // 计算各角度和对应的P2,P3坐标
            var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, 
                angle1 = (angle + theta) * Math.PI / 180, 
                angle2 = (angle - theta) * Math.PI / 180, 
                topX = headlen * Math.cos(angle1), 
                topY = headlen * Math.sin(angle1), 
                botX = headlen * Math.cos(angle2), 
                botY = headlen * Math.sin(angle2);

            ctx.save();
            ctx.beginPath();

            var arrowX = fromX - topX,
                arrowY = fromY - topY;

            ctx.moveTo(arrowX, arrowY); 
            ctx.moveTo(fromX, fromY); 
            ctx.lineTo(toX, toY); 
            
            ctx.lineWidth = width;
            ctx.strokeStyle = color; 
            ctx.stroke();

            arrowX = toX + topX; 
            arrowY = toY + topY; 
            ctx.moveTo(arrowX, arrowY); 
            ctx.lineTo(toX, toY); 
            arrowX = toX + botX; 
            arrowY = toY + botY; 
            ctx.lineTo(arrowX, arrowY); 
            
            ctx.fillStyle = color;
            ctx.fill(); 
            ctx.restore();
        },
        buildAllPs: function(data){
            $("#luckysheet-cell-main #luckysheet-postil-showBoxs").empty();

            for(var r = 0; r < data.length; r++){
                for(var c = 0; c < data[0].length; c++){
                    if(data[r][c] != null && data[r][c].ps != null){
                        var postil = data[r][c].ps;
                        
                        luckysheet.postil.buildPs(r, c, postil);
                    }
                }
            }

            luckysheet.postil.init();
        },
        buildPs: function(r, c, postil){
            if($("#luckysheet-postil-show_"+ r +"_"+ c).length > 0){
                $("#luckysheet-postil-show_"+ r +"_"+ c).remove();
            }

            if(postil == null){
                return;
            }

            var isshow = postil["isshow"] == null ? false : postil["isshow"];

            if(isshow){
                var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                if(!!margeset){
                    row = margeset.row[1];
                    row_pre = margeset.row[0];
                    
                    col = margeset.column[1];
                    col_pre = margeset.column[0];
                }

                var toX = col;
                var toY = row_pre;

                var left = postil["left"] == null ? toX + 18 : postil["left"];
                var top = postil["top"] == null ? toY - 18 : postil["top"];
                var width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                var height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];
                var value = postil["value"] == null ? "" : postil["value"];

                if(top < 0){
                    top = 2;
                }

                var size = luckysheet.postil.getArrowCanvasSize(left, top, toX, toY);

                var html =  '<div id="luckysheet-postil-show_'+ r +'_'+ c +'" class="luckysheet-postil-show">' +
                                '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                                '<div class="luckysheet-postil-show-main" style="width:'+ width +'px;height:'+ height +'px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ left +'px;top:'+ top +'px;box-sizing:border-box;z-index:100;">' +
                                    '<div class="luckysheet-postil-dialog-move">' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-t" data-type="t"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-r" data-type="r"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-b" data-type="b"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-l" data-type="l"></div>' +
                                    '</div>' +
                                    '<div class="luckysheet-postil-dialog-resize" style="display:none;">' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lt" data-type="lt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mt" data-type="mt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lm" data-type="lm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rm" data-type="rm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rt" data-type="rt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lb" data-type="lb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mb" data-type="mb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rb" data-type="rb"></div>' +
                                    '</div>' +
                                    '<div style="width:100%;height:100%;overflow:hidden;">' + 
                                        '<div class="formulaInputFocus" style="width:'+ (width - 12) +'px;height:'+ (height - 12) +'px;line-height:18px;word-break:break-all;" spellcheck="false" contenteditable="true">' +
                                            value +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

                $(html).appendTo($("#luckysheet-cell-main #luckysheet-postil-showBoxs"));

                var ctx = $("#luckysheet-postil-show_"+ r +"_"+ c +" .arrowCanvas").get(0).getContext("2d");

                luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);
            }
        },
        newPs: function(r, c){
            var toX = visibledatacolumn[c];
            var toY = r == 0 ? 0 : visibledatarow[r - 1];

            var fromX = toX + 18;
            var fromY = toY - 18;

            if(fromY < 0){
                fromY = 2;
            }

            var size = luckysheet.postil.getArrowCanvasSize(fromX, fromY, toX, toY);

            var html =  '<div id="luckysheet-postil-show_'+ r +'_'+ c +'" class="luckysheet-postil-show luckysheet-postil-show-active">' +
                            '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                            '<div class="luckysheet-postil-show-main" style="width:144px;height:84px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ fromX +'px;top:'+ fromY +'px;box-sizing:border-box;z-index:100;">' +
                                '<div class="luckysheet-postil-dialog-move">' +
                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-t" data-type="t"></div>' +
                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-r" data-type="r"></div>' +
                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-b" data-type="b"></div>' +
                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-l" data-type="l"></div>' +
                                '</div>' +
                                '<div class="luckysheet-postil-dialog-resize">' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lt" data-type="lt"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mt" data-type="mt"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lm" data-type="lm"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rm" data-type="rm"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rt" data-type="rt"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lb" data-type="lb"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mb" data-type="mb"></div>' +
                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rb" data-type="rb"></div>' +
                                '</div>' +
                                '<div style="width:100%;height:100%;overflow:hidden;">' + 
                                    '<div class="formulaInputFocus" style="width:132px;height:72px;line-height:18px;word-break:break-all;" spellcheck="false" contenteditable="true">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

            $(html).appendTo($("#luckysheet-cell-main #luckysheet-postil-showBoxs"));

            var ctx = $("#luckysheet-postil-show_"+ r +"_"+ c +" .arrowCanvas").get(0).getContext("2d");

            luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);

            $("#luckysheet-postil-show_"+ r +"_"+ c +" .formulaInputFocus").focus();

            luckysheet.postil.init();

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var rc = [];

            if(d[r][c] == null){
                d[r][c] = {};
            }

            d[r][c].ps = { "left": null, "top": null, "width": null, "height": null, "value": "", "isshow": false };
            rc.push(r + "_" + c);

            luckysheet.postil.ref(d, rc);
        },
        editPs: function(r, c){
            if($("#luckysheet-postil-show_"+ r +"_"+ c).length > 0){
                $("#luckysheet-postil-show_"+ r +"_"+ c).show();
                $("#luckysheet-postil-show_"+ r +"_"+ c).addClass("luckysheet-postil-show-active");
                $("#luckysheet-postil-show_"+ r +"_"+ c).find(".luckysheet-postil-dialog-resize").show();
            }
            else{
                var postil = luckysheet.flowdata[r][c].ps;

                var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                if(!!margeset){
                    row = margeset.row[1];
                    row_pre = margeset.row[0];
                    
                    col = margeset.column[1];
                    col_pre = margeset.column[0];
                }

                var toX = col;
                var toY = row_pre;

                var left = postil["left"] == null ? toX + 18 : postil["left"];
                var top = postil["top"] == null ? toY - 18 : postil["top"];
                var width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                var height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];
                var value = postil["value"] == null ? "" : postil["value"];

                if(top < 0){
                    top = 2;
                }

                var size = luckysheet.postil.getArrowCanvasSize(left, top, toX, toY);

                var html =  '<div id="luckysheet-postil-show_'+ r +'_'+ c +'" class="luckysheet-postil-show luckysheet-postil-show-active">' +
                                '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                                '<div class="luckysheet-postil-show-main" style="width:'+ width +'px;height:'+ height +'px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ left +'px;top:'+ top +'px;box-sizing:border-box;z-index:100;">' +
                                    '<div class="luckysheet-postil-dialog-move">' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-t" data-type="t"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-r" data-type="r"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-b" data-type="b"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-l" data-type="l"></div>' +
                                    '</div>' +
                                    '<div class="luckysheet-postil-dialog-resize">' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lt" data-type="lt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mt" data-type="mt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lm" data-type="lm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rm" data-type="rm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rt" data-type="rt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lb" data-type="lb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mb" data-type="mb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rb" data-type="rb"></div>' +
                                    '</div>' +
                                    '<div style="width:100%;height:100%;overflow:hidden;">' + 
                                        '<div class="formulaInputFocus" style="width:'+ (width - 12) +'px;height:'+ (height - 12) +'px;line-height:18px;word-break:break-all;" spellcheck="false" contenteditable="true">' +
                                            value +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

                $(html).appendTo($("#luckysheet-cell-main #luckysheet-postil-showBoxs"));

                var ctx = $("#luckysheet-postil-show_"+ r +"_"+ c +" .arrowCanvas").get(0).getContext("2d");

                luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);
            }

            $("#luckysheet-postil-show_"+ r +"_"+ c +" .formulaInputFocus").focus();
            luckysheet.luckysheetRangeLast($("#luckysheet-postil-show_"+ r +"_"+ c +" .formulaInputFocus").get(0));

            luckysheet.postil.init();
        },
        delPs: function(r, c){
            if($("#luckysheet-postil-show_"+ r +"_"+ c).length > 0){
                $("#luckysheet-postil-show_"+ r +"_"+ c).remove();
            }

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var rc = [];

            delete d[r][c].ps;
            rc.push(r + "_" + c);

            luckysheet.postil.ref(d, rc);
        },
        showHidePs: function(r, c){
            var postil = luckysheet.flowdata[r][c].ps;
            var isshow = postil["isshow"];

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var rc = [];

            if(isshow){
                d[r][c].ps.isshow = false;

                $("#luckysheet-postil-show_"+ r +"_"+ c).remove();
            }
            else{
                d[r][c].ps.isshow = true;

                var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                if(!!margeset){
                    row = margeset.row[1];
                    row_pre = margeset.row[0];
                    
                    col = margeset.column[1];
                    col_pre = margeset.column[0];
                }

                var toX = col;
                var toY = row_pre;

                var left = postil["left"] == null ? toX + 18 : postil["left"];
                var top = postil["top"] == null ? toY - 18 : postil["top"];
                var width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                var height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];
                var value = postil["value"] == null ? "" : postil["value"];

                if(top < 0){
                    top = 2;
                }

                var size = luckysheet.postil.getArrowCanvasSize(left, top, toX, toY);

                var html =  '<div id="luckysheet-postil-show_'+ r +'_'+ c +'" class="luckysheet-postil-show">' +
                                '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                                '<div class="luckysheet-postil-show-main" style="width:'+ width +'px;height:'+ height +'px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ left +'px;top:'+ top +'px;box-sizing:border-box;z-index:100;">' +
                                    '<div class="luckysheet-postil-dialog-move">' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-t" data-type="t"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-r" data-type="r"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-b" data-type="b"></div>' +
                                        '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-l" data-type="l"></div>' +
                                    '</div>' +
                                    '<div class="luckysheet-postil-dialog-resize" style="display:none;">' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lt" data-type="lt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mt" data-type="mt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lm" data-type="lm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rm" data-type="rm"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rt" data-type="rt"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lb" data-type="lb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mb" data-type="mb"></div>' +
                                        '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rb" data-type="rb"></div>' +
                                    '</div>' +
                                    '<div style="width:100%;height:100%;overflow:hidden;">' + 
                                        '<div class="formulaInputFocus" style="width:'+ (width - 12) +'px;height:'+ (height - 12) +'px;line-height:18px;word-break:break-all;" spellcheck="false" contenteditable="true">' +
                                            value +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

                $(html).appendTo($("#luckysheet-cell-main #luckysheet-postil-showBoxs"));

                var ctx = $("#luckysheet-postil-show_"+ r +"_"+ c +" .arrowCanvas").get(0).getContext("2d");

                luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);

                luckysheet.postil.init();
            }

            rc.push(r + "_" + c);

            luckysheet.postil.ref(d, rc);
        },
        showHideAllPs: function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

            var isAllShow = true;
            var allPs = [];

            for(var r = 0; r < d.length; r++){
                for(var c = 0; c < d[0].length; c++){
                    if(d[r] != null && d[r][c] != null && d[r][c].ps != null){
                        allPs.push(r + "_" + c);

                        if(!d[r][c].ps.isshow){
                            isAllShow = false;
                        }
                    }
                }
            }

            if(allPs.length > 0){
                var rc = [];

                if(isAllShow){ //全部显示，操作为隐藏所有批注
                    $("#luckysheet-cell-main #luckysheet-postil-showBoxs").empty();

                    for(var i = 0; i < allPs.length; i++){
                        var rowIndex = allPs[i].split("_")[0];
                        var colIndex = allPs[i].split("_")[1];

                        var postil = d[rowIndex][colIndex].ps;

                        if(postil["isshow"]){
                            d[rowIndex][colIndex].ps.isshow = false;
                            rc.push(allPs[i]);
                        }
                    }
                }
                else{ //部分显示或全部隐藏，操作位显示所有批注
                    for(var i = 0; i < allPs.length; i++){
                        var rowIndex = allPs[i].split("_")[0];
                        var colIndex = allPs[i].split("_")[1];

                        var postil = d[rowIndex][colIndex].ps;

                        if(!postil["isshow"]){
                            var row = visibledatarow[rowIndex], row_pre = rowIndex - 1 == -1 ? 0 : visibledatarow[rowIndex - 1];
                            var col = visibledatacolumn[colIndex], col_pre = colIndex - 1 == -1 ? 0 : visibledatacolumn[colIndex - 1];

                            var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, rowIndex, colIndex);
                            if(!!margeset){
                                row = margeset.row[1];
                                row_pre = margeset.row[0];
                                
                                col = margeset.column[1];
                                col_pre = margeset.column[0];
                            }

                            var toX = col;
                            var toY = row_pre;

                            var left = postil["left"] == null ? toX + 18 : postil["left"];
                            var top = postil["top"] == null ? toY - 18 : postil["top"];
                            var width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                            var height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];
                            var value = postil["value"] == null ? "" : postil["value"];

                            if(top < 0){
                                top = 2;
                            }

                            var size = luckysheet.postil.getArrowCanvasSize(left, top, toX, toY);

                            var html =  '<div id="luckysheet-postil-show_'+ rowIndex +'_'+ colIndex +'" class="luckysheet-postil-show">' +
                                            '<canvas class="arrowCanvas" width="'+ size[2] +'" height="'+ size[3] +'" style="position:absolute;left:'+ size[0] +'px;top:'+ size[1] +'px;z-index:100;"></canvas>' +
                                            '<div class="luckysheet-postil-show-main" style="width:'+ width +'px;height:'+ height +'px;color:#000;padding:5px;border:1px solid #000;background-color:rgb(255,255,225);position:absolute;left:'+ left +'px;top:'+ top +'px;box-sizing:border-box;z-index:100;">' +
                                                '<div class="luckysheet-postil-dialog-move">' +
                                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-t" data-type="t"></div>' +
                                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-r" data-type="r"></div>' +
                                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-b" data-type="b"></div>' +
                                                    '<div class="luckysheet-postil-dialog-move-item luckysheet-postil-dialog-move-item-l" data-type="l"></div>' +
                                                '</div>' +
                                                '<div class="luckysheet-postil-dialog-resize" style="display:none;">' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lt" data-type="lt"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mt" data-type="mt"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lm" data-type="lm"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rm" data-type="rm"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rt" data-type="rt"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-lb" data-type="lb"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-mb" data-type="mb"></div>' +
                                                    '<div class="luckysheet-postil-dialog-resize-item luckysheet-postil-dialog-resize-item-rb" data-type="rb"></div>' +
                                                '</div>' +
                                                '<div style="width:100%;height:100%;overflow:hidden;">' + 
                                                    '<div class="formulaInputFocus" style="width:'+ (width - 12) +'px;height:'+ (height - 12) +'px;line-height:18px;word-break:break-all;" spellcheck="false" contenteditable="true">' +
                                                        value +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';

                            $(html).appendTo($("#luckysheet-cell-main #luckysheet-postil-showBoxs"));

                            var ctx = $("#luckysheet-postil-show_"+ rowIndex +"_"+ colIndex +" .arrowCanvas").get(0).getContext("2d");

                            luckysheet.postil.drawArrow(ctx, size[4], size[5], size[6], size[7]);

                            d[rowIndex][colIndex].ps.isshow = true;
                            rc.push(allPs[i]);
                        }
                    }
                }
            }

            luckysheet.postil.ref(d, rc);

            luckysheet.postil.init();
        },
        removeActivePs: function(){
            if($("#luckysheet-postil-showBoxs .luckysheet-postil-show-active").length > 0){
                var id = $("#luckysheet-postil-showBoxs .luckysheet-postil-show-active").attr("id");

                $("#" + id).removeClass("luckysheet-postil-show-active");
                $("#" + id).find(".luckysheet-postil-dialog-resize").hide();
                $("#" + id).find(".arrowCanvas").css("z-index", 100);
                $("#" + id).find(".luckysheet-postil-show-main").css("z-index", 100);

                var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                var value = $("#" + id).find(".formulaInputFocus").text();

                var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                var rc = [];

                d[r][c].ps.value = value;
                rc.push(r + "_" + c);

                luckysheet.postil.ref(d, rc);

                if(!d[r][c].ps.isshow){
                    $("#" + id).remove();
                }
            }
        },
        ref: function(data, rc){
            if (clearjfundo) {
                luckysheet.jfundo = [];
                
                luckysheet.jfredo.push({ 
                    "type": "postil", 
                    "data": luckysheet.flowdata, 
                    "curdata": data, 
                    "sheetIndex": luckysheet.currentSheetIndex,
                    "rc": rc 
                });
            }

            //luckysheet.flowdata
            luckysheet.flowdata = data;
            luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据

            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = luckysheet.flowdata;
            luckysheet.formula.execFunctionGroupData = luckysheet.flowdata;

            //共享编辑模式
            if(luckysheet.server.allowUpdate){
                for(var i = 0; i < rc.length; i++){
                    var r = rc[i].split("_")[0];
                    var c = rc[i].split("_")[1];

                    luckysheet.server.saveParam("v", luckysheet.currentSheetIndex, luckysheet.flowdata[r][c], { "r": r, "c": c });
                }
            }
            
            //刷新表格
            setTimeout(function () {
                luckysheet.luckysheetrefreshgrid();
            }, 1);
        },
        positionSync: function(){
            $("#luckysheet-postil-showBoxs .luckysheet-postil-show").each(function(i, e){
                var id = $(e).attr("id");

                var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                luckysheet.postil.buildPs(r, c, luckysheet.flowdata[r][c].ps);
            });
        }
    }