
// Features specially written for demo

(function() {

    // language
    function language(params) {
        
        var lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
        lang = lang.substr(0, 2);//截取lang前2位字符

        return lang;

    }
    // Tencent Forum Link Button
    function supportButton() {
        const text = language() === 'zh' ? '反馈' : 'Forum';
        const link = language() === 'zh' ? 'https://support.qq.com/product/288322' : 'https://groups.google.com/g/luckysheet';

        document.querySelector("body").insertAdjacentHTML('beforeend', '<a id="container" href="'+ link +'" target="_blank" style="z-index:2;width:50px;height:50px;line-height:50px;position:fixed;right:40px;bottom:86px;border-radius:50px;cursor:pointer;background:rgb(71,133,249);color:#fff;text-align:center;text-decoration:none;">'+ text +'</a>');
    }
    
    supportButton()

    /**
     * Get url parameters
     */
    function getRequest() {
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
           
          theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
           
        }
      }
      return theRequest;
    }

    window.luckysheetDemoUtil = {
        language:language,
        getRequest:getRequest
    }
    
})()