/**
 * The default luckysheet config object.
 */
export default {
    container: "luckysheet", //容器的ID
    loading:{}, //自定义loading
    column: 60, //空表格默认的列数量
    row: 84, //空表格默认的行数据量
    allowCopy: true, //是否允许拷贝
    showtoolbar: true, //是否第二列显示工具栏
    showinfobar: true, //是否显示顶部名称栏
    showsheetbar: true, //是否显示底部表格名称区域
    showstatisticBar: true, //是否显示底部计数栏
    pointEdit: false, //是否是编辑器插入表格模式
    pointEditUpdate: null, //编辑器表格更新函数
    pointEditZoom: 1, //编辑器表格编辑时缩放比例
    // menu: "undo|redo|freezenrow|freezencolumn|download|share|chart|pivot",
    data: [{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }], //客户端sheet数据[sheet1, sheet2, sheet3]
    title: "Luckysheet Demo", //表格的名称
    userInfo:false,// 右上角的用户信息展示样式，支持 1. boolean类型：false:不展示，true:展示默认 '<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> rabbit' ，2. HTML模板字符串或者普通字符串，如：'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky'或者'用户名'， 3. 对象格式，设置 userImage：用户头像地址 和 userName：用户名 4. 不设置或者设置undefined同设置false
    userMenuItem: [{url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"我的表格"}, {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"退出登陆"}], //点击右上角的用户信息弹出的菜单
    myFolderUrl: "www.baidu.com", //左上角<返回按钮的链接
    config: {}, //表格行高、列宽、合并单元格、公式等设置
    fullscreenmode: true, //是否全屏模式，非全屏模式下，标记框不会强制选中。
    devicePixelRatio: window.devicePixelRatio, //设备比例，比例越大表格分标率越高
    allowEdit: true, //是否允许前台编辑
    loadUrl: "", // 配置loadUrl的地址，luckysheet会通过ajax请求表格数据，默认载入status为1的sheet数据中的所有data，其余的sheet载入除data字段外的所有字段
    loadSheetUrl: "", //配置loadSheetUrl的地址，参数为gridKey（表格主键） 和 index（sheet主键合集，格式为[1,2,3]），返回的数据为sheet的data字段数据集合
    gridKey: "", // 表格唯一标识符
    updateUrl: "", //表格数据的更新地址
    updateImageUrl: "", //缩略图的更新地址
    allowUpdate: false, //是否允许编辑后的后台更新
    functionButton: "", //右上角功能按钮，例如'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">分享</button>    <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">秀数据</button>'
    showConfigWindowResize: true, //图表和数据透视表的配置会在右侧弹出，设置弹出后表格是否会自动缩进
    enableAddRow: true,//允许添加行
    enableAddBackTop: true,//允许回到顶部
    // enablePage: false,//允许加载下一页
    autoFormatw: false,  //自动格式化超过4位数的数字为 亿万格式 例：true or "true" or "TRUE"
    accuracy: undefined,  //设置传输来的数值的精确位数，小数点后n位 传参数为数字或数字字符串，例： "0" 或 0
    pageInfo:{
        'queryExps':'',
        'reportId':'',
        'fields':'',
        'mobile':'',
        'frezon':'',
        'currentPage':'',
        "totalPage":10,
        "pageUrl":"",
    },
    editMode: false, //是否为编辑模式
    beforeCreateDom: null,//表格创建之前的方法
    fireMousedown: null, //单元格数据下钻
    lang: 'en', //language
    plugins: [], //plugins, e.g. ['chart']
    forceCalculation:false,//强制刷新公式，公式较多会有性能问题，慎用
    rowHeaderWidth: 46,
    columnHeaderHeight: 20,
    defaultColWidth:73,
    defaultRowHeight:19,
    defaultFontSize:10,
    limitSheetNameLength:true,    //是否限制工作表名的长度
    defaultSheetNameMaxLength:31,  //默认工作表名称的最大长度
    sheetFormulaBar:true, //是否显示公式栏
    showtoolbarConfig:{}, //自定义工具栏
    showsheetbarConfig:{}, //自定义底部sheet页
    showstatisticBarConfig:{}, //自定义计数栏
    cellRightClickConfig:{}, //自定义单元格右键菜单
    sheetRightClickConfig:{}, //自定义底部sheet页右击菜单
    imageUpdateMethodConfig:{}, //自定义图片同步方式
}
