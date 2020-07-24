const sheetPivotTable = {
	"name": "PivotTable",
	"color": "",
	"config": {},
	"index": "6",
	"chart": [{
		"sheetIndex": "0",
		"dataSheetIndex": "0",
		"chartType": "column",
		"row": "[1,3]",
		"column": "[3,3]",
		"chartStyle": "default",
		"myWidth": "480",
		"myHeight": "288",
		"myLeft": "67",
		"myTop": "11"
	}],
	"status": "0",
	"order": "6",
	"column": 18,
	"row": 36,
	"celldata": [{
		"r": 0,
		"c": 0,
		"v": "计数:分数"
	}, {
		"r": 0,
		"c": 1,
		"v": "理综"
	}, {
		"r": 0,
		"c": 2,
		"v": "数学"
	}, {
		"r": 0,
		"c": 3,
		"v": "英语"
	}, {
		"r": 0,
		"c": 4,
		"v": "语文"
	}, {
		"r": 0,
		"c": 5,
		"v": "总计"
	}, {
		"r": 1,
		"c": 0,
		"v": "Alex"
	}, {
		"r": 1,
		"c": 1,
		"v": 1
	}, {
		"r": 1,
		"c": 2,
		"v": 1
	}, {
		"r": 1,
		"c": 3,
		"v": 1
	}, {
		"r": 1,
		"c": 4,
		"v": 1
	}, {
		"r": 1,
		"c": 5,
		"v": 4
	}, {
		"r": 2,
		"c": 0,
		"v": "Joy"
	}, {
		"r": 2,
		"c": 1,
		"v": 1
	}, {
		"r": 2,
		"c": 2,
		"v": 1
	}, {
		"r": 2,
		"c": 3,
		"v": 1
	}, {
		"r": 2,
		"c": 4,
		"v": 1
	}, {
		"r": 2,
		"c": 5,
		"v": 4
	}, {
		"r": 3,
		"c": 0,
		"v": "Tim"
	}, {
		"r": 3,
		"c": 1,
		"v": 1
	}, {
		"r": 3,
		"c": 2,
		"v": 1
	}, {
		"r": 3,
		"c": 3,
		"v": 1
	}, {
		"r": 3,
		"c": 4,
		"v": 1
	}, {
		"r": 3,
		"c": 5,
		"v": 4
	}, {
		"r": 4,
		"c": 0,
		"v": "总计"
	}, {
		"r": 4,
		"c": 1,
		"v": 3
	}, {
		"r": 4,
		"c": 2,
		"v": 3
	}, {
		"r": 4,
		"c": 3,
		"v": 3
	}, {
		"r": 4,
		"c": 4,
		"v": 3
	}, {
		"r": 4,
		"c": 5,
		"v": 12
	}],
	"visibledatarow": [],
	"visibledatacolumn": [],
	"rowsplit": [],
	"ch_width": 4748,
	"rh_height": 1790,
	"luckysheet_select_save": [{
		"row": [0, 0],
		"column": [0, 0]
	}],
	"luckysheet_selection_range": [],
	"scrollLeft": 0,
	"scrollTop": 0,
	"isPivotTable": true,
	"pivotTable": {
		"pivot_select_save": {
			"left": 0,
			"width": 73,
			"top": 0,
			"height": 19,
			"left_move": 0,
			"width_move": 369,
			"top_move": 0,
			"height_move": 259,
			"row": [0, 12],
			"column": [0, 4],
			"row_focus": 0,
			"column_focus": 0
		},
		"pivotDataSheetIndex": 5, //The sheet index where the source data is located
		"column": [{
			"index": 3,
			"name": "科目",
			"fullname": "科目"
		}],
		"row": [{
			"index": 1,
			"name": "学生",
			"fullname": "学生"
		}],
		"filter": [],
		"values": [{
			"index": 4,
			"name": "分数",
			"fullname": "计数:分数",
			"sumtype": "COUNTA",
			"nameindex": 0
		}],
		"showType": "column",
		"pivotDatas": [
			["计数:分数", "理综", "数学", "英语", "语文", "总计"],
			["Alex", 1, 1, 1, 1, 4],
			["Joy", 1, 1, 1, 1, 4],
			["Tim", 1, 1, 1, 1, 4],
			["总计", 3, 3, 3, 3, 12]
		],
		"drawPivotTable": false,
		"pivotTableBoundary": [5, 6]
	}
}

export default sheetPivotTable;