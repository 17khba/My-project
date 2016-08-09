var Drag = function( opt ){
    this.obj = null;
    this.disX = 0;
    this.disY = 0;
    this.rangeObj = null;
    this.hasRange = false;
    this.rangeJson = null;
    this.settings = {
        toDown: function(){},
        toMove: function(){},
        toUp: function(){}
    };
    opt && this.init( opt );
};


Drag.prototype = {

    /**
     * [init 初始化]
     * @param  {[obj]} opt [自定义参数---对应的设置项]
     */
    init: function( opt ){
        if( !opt ) return false;
        this.obj = ( typeof opt.obj ) === 'string' ? document.querySelector( '#' + opt.obj ) : opt.obj;
        if( opt.rangeObj ){
            this.rangeObj = ( typeof opt.rangeObj ) === 'string' ? document.querySelector( '#' + opt.rangeObj ) : opt.rangeObj;
            this.hasRange = true;
            this.rangeJson = this.getPos( this.rangeObj );
            /*将元素限制在可拖动氛围内*/
            this.obj.style.top = this.rangeJson.t + 'px';
            this.obj.style.left = this.rangeJson.l + 'px';
        }
        this.extend( this.settings, opt );
        this.run();
    },

    /**
     * [run 事件处理]
     */
    run: function(){
        var self = this;
        this.obj.onmousedown = function( ev ){
            self.fnDown( ev || event );
            document.onmousemove = function( ev ){
                self.fnMove( ev || event );
            };
            document.onmouseup = function(){
                self.fnUp();
            };
            return false;
        };
    },

    fnDown: function( e ){
        this.obj.style.zIndex = this.setIndex();
        this.disX = e.clientX - this.obj.offsetLeft;
        this.disY = e.clientY - this.obj.offsetTop;
        if( this.setCapture ) this.obj.setCapture();
        this.settings.toDown( this.obj );
    },

    fnMove: function( e ){
        var L, T;
        T = e.clientY - this.disY;
        L = e.clientX - this.disX;
        if( this.rangeObj ){
            if( L <= this.rangeJson.l ){
                L = this.rangeJson.l;
            } else if( L >= this.rangeJson.r - this.obj.offsetWidth ){
                L = this.rangeJson.r - this.obj.offsetWidth;
            }
            if( T <= this.rangeJson.t ){
                T = this.rangeJson.t;
            } else if( T >= this.rangeJson.r - this.obj.offsetHeight ){
                T = this.rangeJson.b- this.obj.offsetHeight;
            }
        }
        this.obj.style.top = T + 'px';
        this.obj.style.left = L + 'px';
        this.settings.toMove( this.obj );
    },

    fnUp: function(){
        document.onmousemove = document.onmouseup = null;
        this.settings.toUp( this.obj );
        if( this.releaseCapture ) this.obj.releaseCapture();
    },

    /**
     * [getPos 获取元素坐标值]
     * @param  {[obj]} obj [需要获取坐标值的对象]
     * @return {[obj]}     [四个方向的坐标值]
     */
    getPos: function( obj ){
        var doc, iTop, iRig, iBot, iLeft;
        doc = document.body || document.documentElement;
        iTop = 0;
        iLeft = 0;
        iBot = this.rangeObj.offsetHeight;
        iRig = this.rangeObj.offsetWidth;
        while( obj ){
            iTop += obj.offsetTop;
            iLeft += obj.offsetLeft;
            iBot += iTop;
            iRig += iLeft;
            obj = obj.parentNode;
            if( obj === doc ) break;
        }
        return {
            t: iTop,
            r: iRig,
            b: iBot,
            l: iLeft
        };
    },

    /**
     * [getStyle 兼容处理---获取元素样式]
     * @param  {[obj]} obj  [对应的元素]
     * @param  {[str]} attr [要获取的属性值]
     * @return {[num]}      [用作index的处理值]
     */
    getStyle: function( obj, attr ){
        return obj.currentStyle ? obj.currentStyle[ attr ] : getComputedStyle( obj )[ attr ];
    },

    /**
     * [setIndex 设置zindex]
     */
    setIndex: function(){
        var aEle, n, num;
        aEle = this.obj.parentNode.children;
        n = 0;
        for ( var i = 0; i < aEle.length; i++ ) {
            num = this.getStyle( aEle[ i ], 'zIndex' ) * 1;
            n = num > 0 ? num : n;
        }
        return n + 1;
    },

    /**
     * [extend 扩展]
     * @param  {[obj]} obj1 [对象一]
     * @param  {[obj]} obj2 [对象二]
     */
    extend: function( obj1, obj2 ){
        for( var k in obj2 ){
            obj1[ k ] = obj2[ k ];
        }
    }
};

var one = new Drag( {
    obj: 'box-one',
    rangeObj: 'range',
    toDown: function( obj ){
        obj.style.opacity = '.6';
        obj.innerText = ( obj.innerText * 1 ) + 1;
    },
    toUp: function( obj ){
        obj.style.opacity = '1';
    }
} );
var two = new Drag( {
    obj: 'box-two',
    toDown: function( obj ){
        obj.style.opacity = '.6';
    },
    toUp: function( obj ){
        obj.style.opacity = '1';
    }
} );
