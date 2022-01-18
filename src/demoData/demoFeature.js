
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
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
        function(m,key,value) {
          vars[key] = value;
        });
        return vars;
    }

    window.luckysheetDemoUtil = {
        language:language,
        getRequest:getRequest
    }
    
})()