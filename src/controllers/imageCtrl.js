import { 
    rowLocation, 
    colLocation, 
    mouseposition 
} from '../global/location';
import { setluckysheet_scroll_status } from '../methods/set';

const imageCtrl = {
    imgItem: {
        src: '',  //图片url
        originWidth: null,  //图片原始宽度
        originHeight: null,  //图片原始高度
        default: {
            width: null,  //图片 宽度
            height: null,  //图片 高度
            left: null,  //图片离表格左边的 位置
            top: null,  //图片离表格顶部的 位置
        },
        crop: {
            width: null,  //图片裁剪后 宽度
            height: null,  //图片裁剪后 高度
            offsetLeft: 0,  //图片裁剪后离未裁剪时 左边的位移
            offsetTop: 0,  //图片裁剪后离未裁剪时 顶部的位移
        }
    },
    images: null,
    currentImgId: null,
    currentWinW: null,
    currentWinH: null,
    resize: null,
    resizeXY: null,
    move: false,
    moveXY: null,
    generateRandomId: function(prefix) {
        if(prefix == null){
            prefix = "img";
        }

        let userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, "").split("");

        let mid = "";

        for(let i = 0; i < 12; i++){
            mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
        }

        let time = new Date().getTime();

        return prefix + "_" + mid + "_" + time;
    },
    modelHtml: function(id, imgItem) {
        let src = imgItem.src;

        let width = imgItem.default.width,
            height = imgItem.default.height,
            left = imgItem.default.left,
            top = imgItem.default.top;

        return  `<div id="${id}" class="luckysheet-modal-dialog luckysheet-modal-dialog-image" style="width:${width}px;height:${height}px;padding:0;position:absolute;left:${left}px;top:${top}px;z-index:200;">
                    <div class="luckysheet-modal-dialog-content">
                        <img src="${src}" style="width:100%;height:100%;" />
                    </div>
                </div>`;
    },
    init: function() {
        let _this = this;

        //image active
        $("#luckysheet-image-showBoxs").off("mousedown.active").on("mousedown.active", ".luckysheet-modal-dialog-image", function(e) {
            $(this).hide();

            let id = $(this).attr("id");
            _this.currentImgId = id;

            let item = _this.images[id];

            let width = item.default.width,
                height = item.default.height,
                left = item.default.left,
                top = item.default.top;

            if(item.crop.width != width || item.crop.height != height){
                width = item.crop.width;
                height = item.crop.height;
                left = left + item.crop.offsetLeft;
                top = top + item.crop.offsetTop;
            }
        
            $("#luckysheet-modal-dialog-activeImage").show().css({
                "width": width,
                "height": height,
                "left": left,
                "top": top
            });

            $("#luckysheet-modal-dialog-activeImage .luckysheet-modal-dialog-content").css({
                "background-image": "url(" + item.src + ")",
                "background-size": item.default.width + "px " + item.default.height + "px",
                "background-position": -item.crop.offsetLeft + "px " + -item.crop.offsetTop + "px"
            })

            e.stopPropagation();
        })

        //image move
        $("#luckysheet-modal-dialog-activeImage").off("mousedown.move").on("mousedown.move", ".luckysheet-modal-dialog-content", function(e) {
            _this.move = true;
            
            _this.currentWinW = $("#luckysheet-cell-main")[0].scrollWidth;
            _this.currentWinH = $("#luckysheet-cell-main")[0].scrollHeight;
            
            let scrollTop = $("#luckysheet-cell-main").scrollTop(), 
                scrollLeft = $("#luckysheet-cell-main").scrollLeft();

            let offset = $("#luckysheet-modal-dialog-activeImage").offset();
            let position = $("#luckysheet-modal-dialog-activeImage").position();

            _this.moveXY = [
                e.pageX - offset.left, 
                e.pageY - offset.top, 
                position.left, 
                position.top, 
                scrollLeft, 
                scrollTop
            ];

            setluckysheet_scroll_status(true);

            e.stopPropagation();
        })

        //image resize
        $("#luckysheet-modal-dialog-activeImage").off("mousedown.resize").on("mousedown.resize", ".luckysheet-modal-dialog-resize-item", function(e) {
            _this.currentWinW = $("#luckysheet-cell-main")[0].scrollWidth;
            _this.currentWinH = $("#luckysheet-cell-main")[0].scrollHeight;

            _this.resize = $(this).data("type");

            let scrollTop = $("#luckysheet-cell-main").scrollTop(), 
                scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let mouse = mouseposition(e.pageX, e.pageY);
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let position = $("#luckysheet-modal-dialog-activeImage").position();
            let width = $("#luckysheet-modal-dialog-activeImage").width();
            let height = $("#luckysheet-modal-dialog-activeImage").height();

            _this.resizeXY = [
                x, 
                y, 
                width, 
                height, 
                position.left + scrollLeft, 
                position.top + scrollTop, 
                scrollLeft, 
                scrollTop
            ];

            setluckysheet_scroll_status(true);
            
            e.stopPropagation();
        })

        //image crop
        $("#luckysheet-modal-dialog-activeImage").off("mousedown.crop").on("mousedown.crop", ".luckysheet-modal-controll-crop", function(e) {
            $("#luckysheet-modal-dialog-activeImage").hide();

            let item = _this.images[_this.currentImgId];

            let width = item.default.width,
                height = item.default.height,
                left = item.default.left,
                top = item.default.top;

            if(item.crop.width != width || item.crop.height != height){
                width = item.crop.width;
                height = item.crop.height;
                left = left + item.crop.offsetLeft;
                top = top + item.crop.offsetTop;
            }
        
            $("#luckysheet-modal-dialog-cropping").show().css({
                "width": width,
                "height": height,
                "left": left,
                "top": top
            });

            $("#luckysheet-modal-dialog-cropping .cropping-mask").css({
                "width": item.default.width,
                "height": item.default.height,
                "background-image": "url(" + item.src + ")",
                "left": -item.crop.offsetLeft,
                "top": -item.crop.offsetTop
            })

            $("#luckysheet-modal-dialog-cropping .cropping-content").css({
                "background-image": "url(" + item.src + ")",
                "background-size": item.default.width + "px " + item.default.height + "px",
                "background-position": -item.crop.offsetLeft + "px " + -item.crop.offsetTop + "px"
            })

            e.stopPropagation();
        })

        //image delete
        $("#luckysheet-modal-dialog-activeImage").off("mousedown.delete").on("mousedown.delete", ".luckysheet-modal-controll-del", function(e) {
            _this.removeImgItem();
        })

    },
    addImgItem: function(img) {
        let _this = this;

        let width, height;
        let max = 400;

        if(img.originHeight < img.originWidth){
            height = Math.round(img.originHeight * (max / img.originWidth));
            width = max;
        }
        else{
            width = Math.round(img.originWidth * (max / img.originHeight));
            height = max;
        }

        if(_this.images == null){
            _this.images = {};
        }

        let imgItem = $.extend(true, {}, _this.imgItem);
        imgItem.src = img.src;
        imgItem.originWidth = img.originWidth;
        imgItem.originHeight = img.originHeight;
        imgItem.default.width = width;
        imgItem.default.height = height;
        imgItem.default.left = img.left;
        imgItem.default.top = img.top;
        imgItem.crop.width = width;
        imgItem.crop.height = height;

        let id = _this.generateRandomId();
        let modelHtml = _this.modelHtml(id, imgItem);

        $("#luckysheet-image-showBoxs").append(modelHtml);

        _this.images[id] = imgItem;

        _this.init();
    },
    moveImgItem: function() {
        let _this = this;

        _this.move = false;

        let position = $("#luckysheet-modal-dialog-activeImage").position();
        _this.images[_this.currentImgId].left = position.left;
        _this.images[_this.currentImgId].top = position.top;
    },
    resizeImgItem: function() {
        let _this = this;

        _this.resize = null;

        let position = $("#luckysheet-modal-dialog-activeImage").position();
        let width = $("#luckysheet-modal-dialog-activeImage").outerWidth();
        let height = $("#luckysheet-modal-dialog-activeImage").outerHeight();

        _this.images[_this.currentImgId].width = width;
        _this.images[_this.currentImgId].height = height;
        _this.images[_this.currentImgId].left = position.left;
        _this.images[_this.currentImgId].top = position.top;
    },
    removeImgItem: function() {
        let _this = this;

        delete _this.images[_this.currentImgId];
        $("#luckysheet-modal-dialog-activeImage").hide();
    },
}

export default imageCtrl;