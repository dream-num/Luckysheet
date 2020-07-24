    /**
     * polyfill event in firefox
     */
	function __firefox(){
        HTMLElement.prototype.__defineGetter__("runtimeStyle", __element_style);
        window.constructor.prototype.__defineGetter__("event", __window_event);
        Event.prototype.__defineGetter__("srcElement", __event_srcElement);
    }

    function __element_style(){
        return this.style;
    }

    function __window_event(){
        return __window_event_constructor();
    }

    function __event_srcElement(){
        return this.target;
    }

    function __window_event_constructor(){
        if(document.all){
            return window.event;
        }

        var _caller = __window_event_constructor.caller;
        
        while(_caller != null){
            var _argument = _caller.arguments[0];

            if(_argument){
                var _temp = _argument.constructor;
                
                if(_temp.toString().indexOf("Event") != -1){
                    return _argument;
                }
            }

            _caller = _caller.caller;
        }

        return null;
    }

    export default __firefox;