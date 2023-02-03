import pako from 'pako'
import { showloading, hideloading } from '../global/loading';
import { luckysheetrefreshgrid, jfrefreshgrid_rhcw } from '../global/refresh';
import editor from '../global/editor'
import { sheetHTML, luckyColor } from './constant';
import sheetmanage from './sheetmanage';
import menuButton from './menuButton';
import { createFilterOptions } from './filter';
import luckysheetFreezen from './freezen';
import luckysheetPostil from './postil';
import imageCtrl from './imageCtrl';
import dataVerificationCtrl from './dataVerificationCtrl';
import hyperlinkCtrl from './hyperlinkCtrl';
import { getObjType, replaceHtml, getByteLen } from '../utils/util';
import { getSheetIndex } from '../methods/get';
import Store from '../store';
import { collaborativeEditBox } from './select'
import locale from '../locale/locale';
import dayjs from "dayjs";
import json from '../global/json';
import luckysheetConfigsetting from './luckysheetConfigsetting';
import {customImageUpdate} from './imageUpdateCtrl';
import method from '../global/method';

const server = {
    gridKey: null,
    loadUrl: null,
    updateUrl: null,
    updateImageUrl: null,
    title: null,
		loadSheetUrl: null,
		retryTimer:null,
    allowUpdate: false, //共享编辑模式
    historyParam: function(data, sheetIndex, range) {
    	let _this = this;

	    let r1 = range.row[0], r2 = range.row[1];
	    let c1 = range.column[0], c2 = range.column[1];

	    if(r1 == r2 && c1 == c2){ //单个单元格更新
	        let v = data[r1][c1];
	        _this.saveParam("v", sheetIndex, v, { "r": r1, "c": c1 });
	    }
	    else{ //范围单元格更新
	        let rowlen = r2 - r1 + 1;
	        let collen = c2 - c1 + 1;

	        let timeR = Math.floor(1000 / collen);
	        let n = Math.ceil(rowlen / timeR); //分批次更新，一次最多1000个单元格

	        for(let i = 0; i < n; i++){
	            let str = r1 + timeR * i;

				let edr;
	            if(i == n - 1){
	                edr = r2;
	            }
	            else{
	                edr = r1 + timeR * (i + 1) - 1;
	            }

	            let v = [];

	            for(let r = str; r <= edr; r++){
	                let v_row = [];

	                for(let c = c1; c <= c2; c++){
						if(data[r]==null){
							v_row.push(null);
						}
						else{
							v_row.push(data[r][c]);
						}
	                }

	                v.push(v_row);
	            }

	            _this.saveParam("rv", sheetIndex, v, { "range": { "row": [str, edr], "column": [c1, c2] } });

	            if(i == n - 1){
	                _this.saveParam("rv_end", sheetIndex, null);
	            }
	        }
	    }
	},
    saveParam: function (type, index, value, params) {
    	let _this = this;

	    if(!_this.allowUpdate){
	        return;
	    }

	    if(value == undefined){
	        value = null;
	    }

	    let d = {};
	    d.t = type;
	    d.i = index;
	    d.v = value;

		//切换sheet页不发后台，TODO：改为发后台+后台不广播
		if(type === 'shs'){
			return;
		}

	    if (type == "rv") { //单元格批量更新
	        d.range = params.range;
	    }
	    else if (type == "v" || type == "fu" || type == "fm") {
	        d.r = params.r;
	        d.c = params.c;
	    }
	    else if (type == "fc") {
	        d.op = params.op;
	        d.pos = params.pos;
	    }
	    else if (type == "drc" || type == "arc" || type == "h" || type == "wh") {
	        d.rc = params.rc;
	    }
	    else if (type == "c") {
	        d.cid = params.cid;
	        d.op = params.op;
	    }
	    else if (type == "f") {
	        d.op = params.op;
	        d.pos = params.pos;
	    }
	    else if (type == "s") {

	    }
	    else if (type == "sh") {
	        d.op = params.op;
	        if(params.cur != null){
	            d.cur = params.cur;
	        }
	    }
	    else if (type == "cg") {
	        d.k = params.k;
	    }
	    else if (type == "all") {
	        d.k = params.k;
	        // d.s = params.s;
	    }

	    // TODO 配置自定义方式同步图片
        const customImageUpdateMethodConfig = luckysheetConfigsetting.imageUpdateMethodConfig
		if (JSON.stringify(customImageUpdateMethodConfig) !== "{}") {
            if ("images" != d.k) {
                let msg = pako.gzip(encodeURIComponent(JSON.stringify(d)), {to: "string"});

                if (_this.websocket != null) {
                    _this.websocket.send(msg);
                }
            } else {
                customImageUpdate(customImageUpdateMethodConfig.method, customImageUpdateMethodConfig.url, d)
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }
        } else {
            let msg = pako.gzip(encodeURIComponent(JSON.stringify(d)), {to: "string"});
            if (_this.websocket != null) {
                _this.websocket.send(msg);
            }
        }

	},
    websocket: null,
    wxErrorCount: 0,
    openWebSocket: function(){
        let _this = this;

        if('WebSocket' in window){
			let wxUrl = _this.updateUrl + "?t=111&g=" + encodeURIComponent(_this.gridKey);
			if(_this.updateUrl.indexOf('?') > -1){
				wxUrl = _this.updateUrl + "&t=111&g=" + encodeURIComponent(_this.gridKey);
			}

	        _this.websocket = new WebSocket(wxUrl);

	        //连接建立时触发
	        _this.websocket.onopen = function() {
	        	console.info(locale().websocket.success);
	        	hideloading();
				_this.wxErrorCount = 0;

	            //防止websocket长时间不发送消息导致断连
				_this.retryTimer = setInterval(function(){
	                _this.websocket.send("rub");
	            }, 60000);
	        }

	        //客户端接收服务端数据时触发
	        _this.websocket.onmessage = function(result){
				Store.result = result
				let data = new Function("return " + result.data)();
        method.createHookFunction('cooperativeMessage', data)
				console.info(data);
				let type = data.type;
				let {message,id} = data;
				// 用户退出时，关闭协同编辑时其提示框
				if(message === '用户退出') {
					$("#luckysheet-multipleRange-show-" + id).hide();
					Store.cooperativeEdit.changeCollaborationSize = Store.cooperativeEdit.changeCollaborationSize.filter(value => {
						return value.id != id
					})
					Store.cooperativeEdit.checkoutData = Store.cooperativeEdit.checkoutData.filter(value => {
						return value.id != id
					})
				}
	            if(type == 1){ //send 成功或失败
                const oldIndex = data.data.v.index;
                const sheetToUpdate = Store.luckysheetfile.filter((sheet)=> sheet.index === oldIndex)[0];
                if (sheetToUpdate !== null) {
                  setTimeout(() => {
                    const index = data.data.i;
                    sheetToUpdate.index = index;
                    Store.currentSheetIndex = index;

                    $(`#luckysheet-sheets-item${oldIndex}`).attr('data-index', index);
                    $(`#luckysheet-sheets-item${oldIndex}`).prop('id', `luckysheet-sheets-item${index}`);
                    $(`#luckysheet-datavisual-selection-set-${oldIndex}`).prop('id', `luckysheet-datavisual-selection-set-${index}`);
                  }, 1);
                }
	            }
	            else if(type == 2){ //更新数据
	                let item = JSON.parse(data.data);
					_this.wsUpdateMsg(item);
					let chang_data = JSON.parse(data.data)
					if(chang_data.k == 'columnlen') {
						collaborativeEditBox(chang_data.v,null)
					} else if(chang_data.k == 'rowlen') {
						collaborativeEditBox(null,chang_data.v)
					}
	            }
	            else if(type == 3){ //多人操作不同选区("t": "mv")（用不同颜色显示其他人所操作的选区）
	                let id = data.id;
	                let username = data.username;
	                let item = JSON.parse(data.data);
	                let type = item.t,
	                    index = item.i,
	                    value = item.v;
					if(Store.cooperativeEdit.changeCollaborationSize.length === 0) {
						Store.cooperativeEdit.changeCollaborationSize.push({id:id,v:item.v[0],i:index})
					}
					let flag = Store.cooperativeEdit.changeCollaborationSize.some(value1 => {
						return value1.id == id
					})
					if(flag) {
						Store.cooperativeEdit.changeCollaborationSize.forEach(val => {
							if(val.id == id) {
								val.v = item.v[0] || item.range[0]
								val.i = index
							}
						})
					} else {
						Store.cooperativeEdit.changeCollaborationSize.push({id:id,v:item.v[0],i:index})
					}
	                if(getObjType(value) != "array" && getObjType(value) !== "object"){
	                    value = JSON.parse(value);
					}
					let r = 0
					let c = 0
					if(index == Store.currentSheetIndex){//发送消息者在当前页面

						if(getObjType(value) === "object" && value.op === 'enterEdit'){
							r = value.range[value.range.length - 1].row[0];
							c = value.range[value.range.length - 1].column[0];
							_this.multipleRangeShow(id, username, r, c, value.op);

						}else {

							r = value[value.length - 1].row[0];
							c = value[value.length - 1].column[0];

							_this.multipleRangeShow(id, username, r, c);

						}

					} else {
						if(getObjType(value) === "object" && value.op === 'enterEdit'){
							r = value.range[value.range.length - 1].row[0];
							c = value.range[value.range.length - 1].column[0];
						}else {
							r = value[value.length - 1].row[0];
							c = value[value.length - 1].column[0];
						}
					}

					if(Store.cooperativeEdit.checkoutData.length === 0) {
						if(value.op) {
							Store.cooperativeEdit.checkoutData.push({id,username,r,c,op:value.op,index})
						} else {
							Store.cooperativeEdit.checkoutData.push({id,username,r,c,index})
						}
					}
					let checkoutFlag = Store.cooperativeEdit.checkoutData.some(item => {
						return item.id == id
					})
					if(checkoutFlag) {
						Store.cooperativeEdit.checkoutData.forEach(item => {
							if(item.id == id) {
								item.username = username
								item.r = r
								item.c = c
								item.index = index
								if (value.op === 'enterEdit') {
									item.op = value.op
								}
							}
						})
					} else {
						if(value.op === 'enterEdit') {
							Store.cooperativeEdit.checkoutData.push({id,username,r,c,op:value.op,index})
						} else {
							Store.cooperativeEdit.checkoutData.push({id,username,r,c,index})
						}
					}

					//其他客户端切换页面时
					Store.cooperativeEdit.checkoutData.forEach(item => {
						if(item.index != Store.currentSheetIndex) {
							$("#luckysheet-multipleRange-show-" + item.id).hide();
							item.op == ''
						}
					})

					if($("#luckysheet-multipleRange-show-" + id)[0]) {
						let change_bottom = $("#luckysheet-multipleRange-show-" + id)[0].offsetHeight - 1
						$("#luckysheet-multipleRange-show-" + id + ">.username").css({"bottom":change_bottom + 'px'})
					}
	            }
	            else if(type == 4){ //批量指令更新
					// let items = JSON.parse(data.data);

					// After editing by multiple people, data.data may appear as an empty string
					let items = data.data === "" ?  data.data : JSON.parse(data.data);

	                for(let i = 0; i < items.length; i++){
	                    _this.wsUpdateMsg(item[i]);
	                }
	            } else if (type == 5) {
                showloading(data.data);
              } else if (type == 6) {
                hideloading();
              }
	        }

	        //通信发生错误时触发
	        _this.websocket.onerror = function(){
	            _this.wxErrorCount++;

	            if(_this.wxErrorCount > 3){
	                showloading(locale().websocket.refresh);
	            }
	            else{
	                showloading(locale().websocket.wait);
	                _this.openWebSocket();
	            }
	        }

	        //连接关闭时触发
	        _this.websocket.onclose = function(e){
				console.info(locale().websocket.close);
				if(e.code === 1000){
					clearInterval(_this.retryTimer)
					_this.retryTimer = null
				}else{
					alert(locale().websocket.contact);
				}
	        }
	    }
	    else{
	        alert(locale().websocket.support);
	    }
    },
    wsUpdateMsg: function(item) {
	    let type = item.t,
	        index = item.i,
	        value = item.v;

	    let file = Store.luckysheetfile[getSheetIndex(index)];

	    if(["v","rv","cg","all","fc","drc","arc","f","fsc","fsr","sh","c"].includes(type) && file == null){
	        return;
	    }

	    if(type == "v"){ //单个单元格数据更新
	        if(file.data == null || file.data.length == 0){
	            return;
	        }

	        let r = item.r, c = item.c;
	        file.data[r][c] = value;

	        if(index == Store.currentSheetIndex){//更新数据为当前表格数据
				Store.flowdata = file.data;
				editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

	            //如果更新的单元格有批注
	            if(value != null && value.ps != null){
	                luckysheetPostil.buildPs(r, c, value.ps);
	            }
	            else{
	                luckysheetPostil.buildPs(r, c, null);
	            }

	            setTimeout(function () {
	                luckysheetrefreshgrid();
	            }, 1);
	        }
	    }
		else if(type == "rv"){ //范围单元格数据更新
			if(Object.keys(item.range).length > 0) {
				Store.cooperativeEdit.merge_range = item.range
				Store.cooperativeEdit.merge_range.v = item.v
				collaborativeEditBox();
			}
	        if(file.data == null || file.data.length == 0){
	            return;
	        }

	        let r1 = item.range.row[0], r2 = item.range.row[1];
	        let c1 = item.range.column[0], c2 = item.range.column[1];

	        for(let r = r1; r <= r2; r++){
	            for(let c = c1; c <= c2; c++){
	                file.data[r][c] = value[r - r1][c - c1];
	            }
	        }

	        if(index == Store.currentSheetIndex){//更新数据为当前表格数据
				Store.flowdata = file.data;
				editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

	            //如果更新的单元格有批注
	            for(let r = r1; r <= r2; r++){
	                for(let c = c1; c <= c2; c++){
	                    if(value[r - r1][c - c1] != null && value[r - r1][c - c1].ps != null){
	                        luckysheetPostil.buildPs(r, c, value[r - r1][c - c1].ps);
	                    }
	                    else{
	                        luckysheetPostil.buildPs(r, c, null);
	                    }
	                }
	            }

	            setTimeout(function () {
	                luckysheetrefreshgrid();
	            }, 1);
			}
	    }
	    else if(type == "cg"){ //config更新（rowhidden，rowlen，columnlen，merge，borderInfo）
	        let k = item.k;

	        if(k == "borderInfo"){
				file["config"]["borderInfo"] = value;
	        }
	        else{
	            if(!(k in file["config"])){
	                file["config"][k] = {};
	            }

	            // for(let key in value){
	            //     file["config"][k][key] = value[key];
				// }

				// ⚠️ 上面的处理方式会导致部分配置项被遗漏，以致协同编辑的时候多视图出现不一致的情况，调整处理的策略为直接替换配置项：
				// 可能的配置项为：
				// columnlen: {0: 65, 1: 186, 2: 52}
				// customHeight: {0: 1, 5: 1, 6: 1}
				// customWidth: {0: 1, 1: 1, 2: 1}
				// merge: {2_1: {…}, 4_2: {…}, 6_2: {…}}
				// rowlen: {0: 19, 5: 93, 6: 117}
				if(value && (typeof value == "object")){
					file["config"][k] = value;
				}

	        }

	        if(index == Store.currentSheetIndex){//更新数据为当前表格数据
	            Store.config = file["config"];

	            if(k == "rowlen" || k == "columnlen" || k == "rowhidden"){
	                jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
	            }

	            setTimeout(function () {
	                luckysheetrefreshgrid();
	            }, 1);
	        }
	    }
	    else if(type == "all"){ //通用保存更新
	        let k = item.k;
	        file[k] = value;

	        if(k == "name"){ //工作表名
	            $("#luckysheet-sheet-container-c #luckysheet-sheets-item" + index).find("span.luckysheet-sheets-item-name").html(value);
	        }
	        else if(k == "color"){ //工作表颜色
	            let currentSheetItem = $("#luckysheet-sheet-container-c #luckysheet-sheets-item" + index);
	            currentSheetItem.find(".luckysheet-sheets-item-color").remove();

	            if(value != null || value != ""){
	                currentSheetItem.append('<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + value + ';"></div>');
	            }
	        }
	        else if(k == "pivotTable"){ //PivotTable
	            // luckysheet.pivotTable.changePivotTable(index);
	        }
			else if(k == "frozen"){ //freezen row and column

				// tranform frozen
				luckysheetFreezen.frozenTofreezen();

	            if(index == Store.currentSheetIndex){
					const _locale = locale();
					const locale_freezen = _locale.freezen;
	                if(file["freezen"].horizontal == null){
	                    $("#luckysheet-freezen-btn-horizontal").html('<i class="fa fa-list-alt"></i> '+locale_freezen.freezenRow);
	                    luckysheetFreezen.freezenhorizontaldata = null;
	                    $("#luckysheet-freezebar-horizontal").hide();
	                }
	                else{
	                    luckysheetFreezen.createFreezenHorizontal(file["freezen"].horizontal.freezenhorizontaldata, file["freezen"].horizontal.top);
	                }

	                if(file["freezen"].vertical == null){
	                    $("#luckysheet-freezen-btn-vertical").html('<i class="fa fa-indent"></i> '+locale_freezen.freezenColumn);
	                    luckysheetFreezen.freezenverticaldata = null;
	                    $("#luckysheet-freezebar-vertical").hide();
	                }
	                else{
	                    luckysheetFreezen.createFreezenVertical(file["freezen"].vertical.freezenverticaldata, file["freezen"].vertical.left);
	                }

                  luckysheetFreezen.createAssistCanvas();
                  setTimeout(function () {
                    luckysheetrefreshgrid();
                  }, 1);
	            }
	        }
	        else if(k == "filter_select"){ //筛选范围
	            if(index == Store.currentSheetIndex){
	                createFilterOptions(value);
	            }
	        }
	        else if(k == "filter"){ //筛选保存
	            if(index == Store.currentSheetIndex){
	                createFilterOptions(file.filter_select, value);
	            }
	        }
	        else if(k == "luckysheet_conditionformat_save"){ //条件格式
	            if(index == Store.currentSheetIndex){
	                setTimeout(function () {
	                    luckysheetrefreshgrid();
	                }, 1);
	            }
	        }
	        else if(k == "luckysheet_alternateformat_save"){ //交替颜色
	            if(index == Store.currentSheetIndex){
	                setTimeout(function () {
	                    luckysheetrefreshgrid();
	                }, 1);
	            }
	        }
	        else if(k == "config"){ //config
	            if(index == Store.currentSheetIndex){
	                Store.config = value;
	                jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
	            }
	        }
	        else if(k == "dynamicArray"){ //动态数组
	            if(index == Store.currentSheetIndex){
	                setTimeout(function () {
	                    luckysheetrefreshgrid();
	                }, 1);
	            }
			}
			else if(k == "images"){ //图片
				if(index == Store.currentSheetIndex){
					imageCtrl.images = value;
					imageCtrl.allImagesShow();
					imageCtrl.init();
				}
			}
			else if(k == "dataVerification"){ //数据验证
				if(index == Store.currentSheetIndex){
					dataVerificationCtrl.dataVerification = value;
        			dataVerificationCtrl.init();
				}
			}
			else if(k == "hyperlink"){ //链接
				if(index == Store.currentSheetIndex){
					hyperlinkCtrl.hyperlink = value;
        			hyperlinkCtrl.init();
				}
			}
	    }
	    else if(type == "fc"){ //函数链calc
	        let op = item.op, pos = item.pos;

	        if(getObjType(value) != "object"){
				value = new Function("return " + value)();
	        }

	        let r = value.r, c = value.c;

	        let calcChain = file["calcChain"] == null ? [] : file["calcChain"];

	        if(op == "add"){
	            calcChain.push(value);
	        }
	        else if(op == "del"){
	            for(let a = 0; a < calcChain.length; a++){
	                if(r == calcChain[a].r && c == calcChain[a].c && index == calcChain[a].index){
	                    calcChain.splice(a, 1);
	                }
	            }
	        }
	        // else if(op == "update"){
	        //     for(let a = 0; a < calcChain.length; a++){
	        //         if(r == calcChain[a].r && c == calcChain[a].c && index == calcChain[a].index){
	        //             calcChain[a].func = func;
	        //         }
	        //     }
	        // }

	        setTimeout(function () {
	            luckysheetrefreshgrid();
	        }, 1);
	    }
	    else if(type == "drc"){ //删除行列
	        if(file.data == null || file.data.length == 0){
	            return;
	        }

	        let rc = item.rc,
	        	st_i = value.index,
	        	len = value.len,
	        	mc = value.mc,
	        	borderInfo = value.borderInfo;
	        let data = file.data;

	        if(rc == "r"){
	            file["row"] -= len;

	            data.splice(st_i, len);

	            //空白行模板
	            let row = [];
	            for (let c = 0; c < data[0].length; c++) {
	                row.push(null);
	            }

	            //删除多少行，增加多少行空白行
	            for (let r = 0; r < len; r++) {
	                data.push(row);
	            }
	        }
	        else{
	            file["column"] -= len;

	            //空白列模板
	            let addcol = [];
	            for (let r = 0; r < len; r++) {
	                addcol.push(null);
	            }

	            for(let i = 0; i < data.length; i++){
	                data[i].splice(st_i, len);

	                data[i] = data[i].concat(addcol);
	            }
	        }

	        for(let x in mc){
	            let r = mc[x].r, c = mc[x].c;
	            data[r][c].mc = mc[x];
	        }

	        file["config"].merge = mc;
	        file["config"].borderInfo = borderInfo;

	        if(index == Store.currentSheetIndex){
				Store.flowdata = data;
				editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

	            Store.config["merge"] = mc;
	            Store.config["borderInfo"] = borderInfo;

	            setTimeout(function () {
	                luckysheetrefreshgrid();
	            }, 1);
	        }
	    }
	    else if(type == "arc"){ //增加行列
	        if(file.data == null || file.data.length == 0){
	            return;
	        }

	        let rc = item.rc,
	        	st_i = value.index,
	        	len = value.len,
				addData = value.data,
				direction = value.direction,
	        	mc = value.mc,
	        	borderInfo = value.borderInfo;
	        let data = $.extend(true, [], file.data);

	        if(rc == "r"){
				file["row"] += len;

				//空行模板
				let row = [];
				for(let c = 0; c < data[0].length; c++){
					row.push(null);
				}

	            let arr = [];
	            for(let i = 0; i < len; i++){
					if(addData[i] == null){
						arr.push(JSON.stringify(row));
					}
					else{
						arr.push(JSON.stringify(addData[i]));
					}
				}

				if(direction == "lefttop"){
					if(st_i == 0){
						new Function("data","return " + 'data.unshift(' + arr.join(",") + ')')(data);
					}
					else{
						new Function("data","return " + 'data.splice(' + st_i + ', 0, ' + arr.join(",") + ')')(data);
					}
				}
				else{
					new Function("data","return " + 'data.splice(' + (st_i + 1) + ', 0, ' + arr.join(",") + ')')(data);
				}
	        }
	        else{
				file["column"] += len;

	            for(let i = 0; i < data.length; i++){
					/* 在每一行的指定位置都插入一列 */
					for (let j = 0; j < len; j++) {
						if(direction == "lefttop"){
							data[i].splice(st_i, 0, addData[j]);
						}else{
							data[i].splice(st_i + 1, 0, addData[j]);
						}
					}
	            }
	        }

	        for(let x in mc){
	            let r = mc[x].r, c = mc[x].c;
	            data[r][c].mc = mc[x];
	        }

			file.data = data;
	        file["config"].merge = mc;
	        file["config"].borderInfo = borderInfo;

	        if(index == Store.currentSheetIndex){
				Store.flowdata = data;
				editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

	            Store.config["merge"] = mc;
	            Store.config["borderInfo"] = borderInfo;

	            setTimeout(function () {
	                luckysheetrefreshgrid();
	            }, 1);
	        }
	    }
	    else if(type == "f"){ //筛选
	        let op = item.op, pos = item.pos;

	        let filter = file.filter;

	        if(filter == null){
	            filter = {};
	        }

	        if(op == "upOrAdd"){
	            filter[pos] =  value;
	        }
	        else if(op == "del"){
	            delete filter[pos];
	        }

	        if(index == Store.currentSheetIndex){
	            createFilterOptions(file.filter_select, filter);
	        }
	    }
	    else if(type == "fsc"){ //清除筛选
	        file.filter = null;
	        file.filter_select = null;

	        if(index == Store.currentSheetIndex){
	            $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).remove();
	            $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
	        }
	    }
	    else if(type == "fsr"){ //恢复筛选
	        file.filter = value.filter;
	        file.filter_select = value.filter_select;

	        if(index == Store.currentSheetIndex){
	            createFilterOptions(file.filter_select, file.filter);
	        }
	    }
	    else if(type == "sha"){ //新建sheet
	        Store.luckysheetfile.push(value);

	        let colorset = '';
	        if(value.color != null){
	            colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + value.color + ';"></div>';
	        }

	        $("#luckysheet-sheet-container-c").append(replaceHtml(sheetHTML, { "index": value.index, "active": "", "name": value.name, "style": "", "colorset": colorset }));
	        $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + value.index + '" class="luckysheet-datavisual-selection-set"></div>');

					// *添加sheet之后,要判断是否需要显示sheet滚动按钮
					sheetmanage.locationSheet()
	    }
	    else if(type == "shc"){ //复制sheet
	        let copyindex = value.copyindex, name = value.name;

	        let copyarrindex = getSheetIndex(copyindex);
	        let copyjson = $.extend(true, {}, Store.luckysheetfile[copyarrindex]);

	        copyjson.index = index;
	        copyjson.name = name;

	        Store.luckysheetfile.splice(copyarrindex + 1, 0, copyjson);

	        let copyobject = $("#luckysheet-sheets-item" + copyindex);
	        $("#luckysheet-sheet-container-c").append(replaceHtml(sheetHTML, { "index": copyjson.index, "active": "", "name": copyjson.name, "style": "", "colorset": "" }));
	        $("#luckysheet-sheets-item" + copyjson.index).insertAfter(copyobject);
	        $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + copyjson.index + '" class="luckysheet-datavisual-selection-set"></div>');
	    }
	    else if(type == "shd"){ //删除sheet
	        for(let i = 0; i < Store.luckysheetfile.length; i++){
	            if(Store.luckysheetfile[i].index == value.deleIndex){

					// 如果删除的是当前sheet，则切换到前一个sheet页
					if(Store.currentSheetIndex === value.deleIndex){
						const index = value.deleIndex;

						Store.luckysheetfile[sheetmanage.getSheetIndex(index)].hide = 1;

						let luckysheetcurrentSheetitem = $("#luckysheet-sheets-item" + index);
						luckysheetcurrentSheetitem.hide();

						$("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");

						let indicator = luckysheetcurrentSheetitem.nextAll(":visible");
						if (luckysheetcurrentSheetitem.nextAll(":visible").length > 0) {
							indicator = indicator.eq(0).data("index");
						}
						else {
							indicator = luckysheetcurrentSheetitem.prevAll(":visible").eq(0).data("index");
						}
						$("#luckysheet-sheets-item" + indicator).addClass("luckysheet-sheets-item-active");

						sheetmanage.changeSheetExec(indicator);
					}

					server.sheetDeleSave.push(Store.luckysheetfile[i]);

					Store.luckysheetfile.splice(i, 1);

	                break;
	            }
	        }

	        $("#luckysheet-sheets-item" + value.deleIndex).remove();
			$("#luckysheet-datavisual-selection-set-" + value.deleIndex).remove();
			sheetmanage.locationSheet()

	    }
	    else if(type == "shr"){ //sheet位置
	        for(let x in value){
	            Store.luckysheetfile[getSheetIndex(x)].order = value[x];
	        }
	    }
	    else if(type == "shre"){ //删除sheet恢复操作
	        for(let i = 0; i < server.sheetDeleSave.length; i++){
	            if(server.sheetDeleSave[i].index == value.reIndex){
	                let datav = server.sheetDeleSave[i];

	                Store.luckysheetfile.push(datav);

	                let colorset = '';
	                if(value.color != null){
	                    colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + datav.color + ';"></div>';
	                }

	                $("#luckysheet-sheet-container-c").append(replaceHtml(sheetHTML, { "index": datav.index, "active": "", "name": datav.name, "style": "", "colorset": colorset }));
	                $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + datav.index + '" class="luckysheet-datavisual-selection-set"></div>');
	                break;
	            }
	        }
	    }
	    else if(type == "sh"){ //隐藏sheet
	        let op = item.op, cur = item.cur;

	        if(op == "hide"){
	            file.hide = 1;
	            $("#luckysheet-sheets-item" + index).hide();

	            if(index == Store.currentSheetIndex){
	                $("#luckysheet-sheets-item" + cur).addClass("luckysheet-sheets-item-active");
	                sheetmanage.changeSheetExec(cur);
	            }
	        }
	        else if(op == "show"){
	            file.hide = 0;
	            $("#luckysheet-sheets-item" + index).show();
	        }
				sheetmanage.locationSheet()
	    }
	    else if(type == "c"){ //图表操作 TODO
	        let op = item.op, cid = item.cid;

	        if(op == "add"){ //插入
	            file.chart.push(value);

	            luckysheet.insertChartTosheet(value.sheetIndex, value.dataSheetIndex, value.option, value.chartType, value.selfOption, value.defaultOption, value.row, value.column, value.chart_selection_color, value.chart_id, value.chart_selection_id, value.chartStyle, value.rangeConfigCheck, value.rangeRowCheck, value.rangeColCheck, value.chartMarkConfig, value.chartTitleConfig, value.winWidth, value.winHeight, value.scrollLeft1, value.scrollTop1, value.chartTheme, value.myWidth, value.myHeight, value.myLeft, value.myTop, value.myindexrank1, true);
	        }
	        else if(op == "xy" || op == "wh" || op == "update"){ //移动 缩放 更新
	            for(let i = 0; i < file.chart.length; i++){
	                let chartjson = file.chart[i];

	                if(chartjson.chart_id == cid){
	                    for(let item in chartjson){
	                        for(let vitem in value){
	                            if(item == vitem){
	                                chartjson[item] = value[vitem];
	                            }
	                        }
	                    }

	                    sheetmanage.saveChart(chartjson);

	                    return;
	                }
	            }
	        }
	        else if(op == "del"){ //删除
	            for(let i = 0; i < file.chart.length; i++){
	                let chartjson = file.chart[i];

	                if(chartjson.chart_id == cid){
	                    file.chart.splice(i, 1);

	                    $("#" + cid).remove();
	                    sheetmanage.delChart($("#" + cid).attr("chart_id"), $("#" + cid).attr("sheetIndex"));

	                    return;
	                }
	            }
	        }
	    }
	    else if(type == "na"){ //表格名称
	        $("#luckysheet_info_detail_input").val(value).css("width", getByteLen(value) * 10);
	    }
	},
    multipleIndex: 0,
    multipleRangeShow: function(id, name, r, c, value) {
    	let _this = this;
			const fullName = name;

	    let row = Store.visibledatarow[r],
	        row_pre = r - 1 == -1 ? 0 : Store.visibledatarow[r - 1],
	        col = Store.visibledatacolumn[c],
	        col_pre = c - 1 == -1 ? 0 : Store.visibledatacolumn[c - 1];

	    let margeset = menuButton.mergeborer(Store.flowdata, r, c);
	    if(!!margeset){
	        row = margeset.row[1];
	        row_pre = margeset.row[0];

	        col = margeset.column[1];
	        col_pre = margeset.column[0];
			}

			// *处理光标在靠左或者靠上顶着的时候，光标显示不全的问题
			if(col_pre <= 0){
				col_pre += 1
			}

			if(row_pre <= 0){
				row_pre +=1
			}

			// 超出16个字符就显示...
			if(getByteLen(name) > 16){
				name = getByteLen(name,16) + "...";
			}

			// 如果正在编辑，就显示“正在输入”
			if(value === 'enterEdit'){
				name += " " + locale().edit.typing;
			}

	    if($("#luckysheet-multipleRange-show-" + id).length > 0){
			$("#luckysheet-multipleRange-show-" + id).css({ "position": "absolute", "left": col_pre - 1, "width": col - col_pre - 1, "top": row_pre - 1, "height": row - row_pre - 1 });

			$("#luckysheet-multipleRange-show-" + id + " .username").text(name);
			$("#luckysheet-multipleRange-show-" + id + " .username").show();

			if(Store.cooperativeEdit.usernameTimeout['user' + id] != null){
				clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id])
			}
			Store.cooperativeEdit.usernameTimeout['user' + id] = setTimeout(()=>{
				clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
				Store.cooperativeEdit.usernameTimeout['user' + id] = null;
			},10 * 1000)



	    }
	    else{
	        // let itemHtml = '<div id="luckysheet-multipleRange-show-'+ id +'" data-color="'+ luckyColor[_this.multipleIndex] +'" title="'+ name +'" style="position: absolute;left: '+ (col_pre - 1) +'px;width: '+ (col - col_pre - 1) +'px;top: '+ (row_pre - 1) +'px;height: '+ (row - row_pre - 1) +'px;border: 1px solid '+ luckyColor[_this.multipleIndex] +';z-index: 15;">'+
	        //                 '<div style="width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;opacity: 0.03;background-color: '+ luckyColor[_this.multipleIndex] +'"></div>'+
			//                '</div>';

			let itemHtml = `<div
								id="luckysheet-multipleRange-show-${id}"
								class="luckysheet-multipleRange-show"
								data-color="${luckyColor[_this.multipleIndex]}"
								title="${fullName}"
								style="position: absolute;left: ${col_pre - 1}px;width: ${col - col_pre - 1}px;top: ${row_pre - 1}px;height: ${row - row_pre - 1}px;border: 1px solid ${luckyColor[_this.multipleIndex]};z-index: 15;">

								<div class="username" style="height: 19px;line-height:19px;width: max-content;position: absolute;bottom: ${row - row_pre - 1}px;right: 0;background-color: ${luckyColor[_this.multipleIndex]};color:#ffffff;padding:0 10px;">
								${name}
								</div>

								<div style="width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;opacity: 0.03;background-color: ${luckyColor[_this.multipleIndex]}">
								</div>

							</div>`;
							// 正在输入

	        $(itemHtml).appendTo($("#luckysheet-cell-main #luckysheet-multipleRange-show"));

			_this.multipleIndex++;

			// 设定允许用户名消失的定时器，10秒后用户名可隐藏
			// 10秒之类，用户操作界面不会隐藏用户名；10秒之后如果用户操作了界面，则隐藏用户名，没操作就不隐藏
			if(Store.cooperativeEdit.usernameTimeout['user' + id] != null){
				clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id])
			}
			Store.cooperativeEdit.usernameTimeout['user' + id] = setTimeout(()=>{
				clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
				Store.cooperativeEdit.usernameTimeout['user' + id] = null;
			},10 * 1000)
	    }
	},
    sheetDeleSave: [], //共享编辑模式下 删除的sheet保存下来，方便恢复时取值
    submitInterval: 1000,
    imagesubmitInterval: 5000,
    submitdatalimit: 50,
    submitcompresslimit: 1000,
    checksubmit: function(data){
        let _this = this;
        //clearTimeout(_this.requestTimeOut);

        _this.submitTimeout();

        clearTimeout(_this.imageRequestTimeout);
        _this.imageRequestTimeout = setTimeout(function(){
            _this.imageRequest();
        }, _this.imagesubmitInterval);
    },
    submitTimeout: function(){
        let _this = this;
        clearTimeout(_this.requestTimeOut);

        //console.log(_this.requestlast, dayjs(), (_this.requestlast!=null && _this.requestlast.add(10, 'seconds').isBefore(dayjs()) ) );
        if(!_this.requestLock && (_this.requestlast!=null && _this.requestlast.clone().add(1, 'seconds').isBefore(dayjs()) ) ){
            _this.request();
        }

        // if(!_this.imageRequestLock && (_this.imageRequestLast==null || _this.imageRequestLast.clone().add(30, 'seconds').isBefore(dayjs()) ) ){

        // }

        _this.requestTimeOut = setTimeout(function(){
            _this.submitTimeout();
        }, _this.submitInterval);
    },
    requestLock: false,
    requestlast: null,
    firstchange: true,
    requestTimeOut: null,
    request: function () {
        let _this = this;
        let key = this.gridKey;
        let cahce_key = key + "__qkcache";

        _this.cachelocaldata(function(cahce_key, params){
            if(params.length==0){
                return;
            }

            params = encodeURIComponent(JSON.stringify(params));
            let compressBeginLen = params.length;
            let iscommpress = false;
            // if (compressBeginLen > _this.submitcompresslimit) {
            //     params = pako.gzip(params, { to: "string" });
            //     iscommpress = true;
            // }
            _this.requestLock = true;
            //console.log(params);
            // console.log("request");
            if(_this.updateUrl != ""){
                $.post(_this.updateUrl, { compress: iscommpress, gridKey: _this.gridKey, data: params }, function (data) {
					let re = new Function("return " + data)();
                    if(re.status){
                        $("#luckysheet_info_detail_update").html("最近存档时间:"+ dayjs().format("M-D H:m:s"));
                        $("#luckysheet_info_detail_save").html("同步成功");
                        _this.clearcachelocaldata();
                    }
                    else{
                        $("#luckysheet_info_detail_save").html("<span style='color:#ff2121'>同步失败</span>");
                        _this.restorecachelocaldata();
                    }
                    _this.requestlast = dayjs();
                    _this.requestLock = false;
                });
             }
        });
    },
    imageRequestLast: null,
    imageRequestLock: false,
    imageRequestTimeout: null,
    imageRequest: function(){
        let _this = this;

        html2canvas($("#" + container).find(".luckysheet-grid-window").get(0), {
          onrendered: function(canvas) {
            //let imgcut = $("#luckysheet-cell-main").find(".luckysheet-grid-window");
            //document.body.appendChild(canvas);
            let old = $(canvas).appendTo("body");
            old.hide();
            let newwidth = old.width();
            let newheight = old.height();
            let imageData = old.get(0).getContext("2d").getImageData(0, 0, newwidth, newheight);

            let cutW = newwidth, cutH = newheight;
            if(cutW*0.54 > cutH){
                cutW = cutH / 0.54;
            }
            else{
                cutH = cutW * 0.54;
            }
            let newCanvas = $("<canvas>").attr("width", cutW).attr("height", cutH)[0];

            newCanvas.getContext("2d").putImageData(imageData, 0, 0);

            old.attr("width", 350);
            old.attr("height", 189);
            old.get(0).getContext("2d").drawImage(newCanvas, 0, 0, 350, 189);
            let base64 = old.get(0).toDataURL('image/jpeg', 0.9);

            //console.log(base64);
            //console.log("压缩：", pako.gzip(base64, { to: "string" }));
            //console.log("imageRequest");
            let curindex = luckysheet.sheetmanage.getCurSheetnoset();
            _this.imageRequestLock =true;
            // let data1 = pako.gzip(encodeURIComponent(JSON.stringify({"t":"thumb", "img": base64, "curindex":curindex })), { to: "string" });
            let data1 = encodeURIComponent(JSON.stringify({"t":"thumb", "img": base64, "curindex":curindex }));
            old.remove();
            //console.log("缩略图", _this.imageRequestLast,base64);
            if(_this.updateImageUrl != ""){
                // $.post(_this.updateImageUrl, { compress: true, gridKey: _this.gridKey, data:data1  }, function (data) {
                $.post(_this.updateImageUrl, { compress: false, gridKey: _this.gridKey, data:data1  }, function (data) {
					let re = new Function("return " + data)();
                    if(re.status){
                        imageRequestLast = dayjs();
                    }
                    else{
                        $("#luckysheet_info_detail_save").html("<span style='color:#ff2121'>网络不稳定</span>");
                    }
                    _this.imageRequestLock =true;
                });
            }

          }
        });
    },
    localdata: [],
    matchOpt: function(v, d){
        for(let vitem in v){
            if(vitem == "t" && v["t"] in {"drc":1, "arc":1,"sha":1,"shc":1,"shd":1 } ){
                return false;
            }

            if(vitem=="v"){
                continue;
            }

            if(!(vitem in d)){
                return false;
            }

            if(d[vitem] != v[vitem]){
                return false;
            }
        }

        return true;
    },
    deleteRepeatOpt: function(data, value){
        //let d = $.extend(true, [], data); //原来
        let d = data;
        let _this = this;

        if(value instanceof Array){
            for(let i = 0; i < value.length; i++){
                let vitem = value[i];

                for(let a = 0; a < d.length; a++){
                    let ditem = data[i]; //let ditem = data[a];?

                    if(_this.matchOpt(vitem, ditem)){
                        delete d[a];
                    }
                }
            }
        }
        else{
            for(let a = 0; a < d.length; a++){
                let ditem = d[a];

                if(_this.matchOpt(value, ditem)){
                    delete d[a];
                }
            }
        }

        let ret = [];
        for(let i = 0; i < d.length; i++){
            if(d[i] != null){
                ret.push(d[i]);
            }
        }

        return ret;
    },
    setlocaldata: function (value, func) {
        let key = this.gridKey;
        //store.push(key, data);
        let _this = this;
        _this.getlocaldata(function(data){
            if(data==null){
                data = [];
            }

            //此处不去重，在request同步后台时统一循环一次去重
            //let data = _this.deleteRepeatOpt(data, value);

            if(value instanceof Array){
                data = data.concat(value);
            }
            else{
                data.push(value);
            }

            _this.localdata = data;
            func(_this.localdata);

            //console.log(value);
            // localforage.setItem(key, data).then(function () {
            //     console.log(data);
            //     func(data);
            // }).catch(function (err) {

            // });
        });
    },
    getlocaldata: function (func) {
        let key = this.gridKey;
        //return store.get(key);
        func(this.localdata);
        // localforage.getItem(key).then(function(readValue) {
        //     func(readValue);
        // });
    },
    clearlocaldata: function (func) {
        let key = this.gridKey;
        //store.remove(key);
        this.localdata = [];
        func();
        // localforage.removeItem(key, function(err,value) {
        //     func();
        // });
    },
    cachelocaldata: function (func) {
        let key = this.gridKey;
        let _this = this;
        let cahce_key = key + "__qkcache";
        //store.remove(key);
        //console.log(key, cahce_key);


        //处理localdata去重
        let updatedata = _this.localdata;
        let uLen = updatedata.length;
        if(uLen > 1){
            let prevData = [];
            prevData[0] = updatedata[0];
            for(let i = 1; i < uLen; i++){
                let value = updatedata[i];
                let flag = true;
                for(let a=0;a<prevData.length;a++){
                    let ditem = prevData[a];
                    if(_this.matchOpt(value, ditem)){
                        prevData.splice(a,1,value);
                        flag = false; //如果已匹配重复，则后续无需再加
                        break;
                    }
                }
                if(flag){
                    prevData = prevData.concat(value);
                }

            }
            updatedata = prevData;

        }
        if(updatedata==null || updatedata.length==0){
            return;
        }
        //console.log(key, cahce_key,updatedata);
        _this.clearlocaldata(function(){
            localforage.setItem(cahce_key, updatedata).then(function () {
                func(cahce_key, updatedata);
            });
        });

        // localforage.getItem(key).then(function(readValue) {
        //     let updatedata = readValue;
        //     if(readValue==null || readValue.length==0){
        //         return;
        //     }
        //     //console.log(key, cahce_key,updatedata);
        //     _this.clearlocaldata(function(){
        //         localforage.setItem(cahce_key, updatedata).then(function () {
        //             func(cahce_key, updatedata);
        //         });
        //     });
        // });
    },
    clearcachelocaldata: function(func){
        let key = this.gridKey;
        let cahce_key = key + "__qkcache";
        //store.remove(key);
        localforage.removeItem(cahce_key, function(err,value) {
            if(func && typeof(func)=="function"){
                func();
            }

        });
    },
    restorecachelocaldata: function(func){
        let key = this.gridKey;
        let cahce_key = key + "__qkcache";
        let _this = this;
        localforage.getItem(cahce_key).then(function(readValue) {
            let updatedata = readValue;
            _this.getlocaldata(function(data){
                if(data==null){
                    data = [];
                }
                let newdata = updatedata.concat(data);
                //data.unshift(updatedata);

                _this.localdata = newdata;
                if(func instanceof Function){
                    func(_this.localdata);
                }

                // localforage.setItem(key, newdata).then(function () {
                //     func(newdata);
                // }).catch(function (err) {

                // });
            });
        });
	},
	keepHighLightBox: function() {
        Store.cooperativeEdit.checkoutData.forEach(value => {
            if(value.index == Store.currentSheetIndex) {
                if(value.op === 'enterEdit') {
                    server.multipleRangeShow(value.id, value.username, value.r, value.c, value.op);
                } else {
                    server.multipleRangeShow(value.id, value.username, value.r, value.c);
                }
            }
        })
    }
}

export default server;
