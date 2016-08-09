/**
 * [Drag 拖拽构造函数]
 * @param {[obj]} opt [自定义设置---对应要做的处理]
 */
var Drag = function( opt ){
    this.obj = opt.obj;
    this.disX = 0;
    this.disY = 0;
    this.settings = {
        toUp: function(){},
        toMove: function(){},
        toDown: function(){}
    };
    opt && this.init( opt );
};

Drag.prototype = {
    init: function( opt ){
        var self;
        if( !opt ) return false;
        self = this;
        this.extend( this.settings, opt );
        self.obj.onmousedown = function( ev ){
            var e = ev || event;
            self.fnDown( e );

            document.onmousemove = function( ev ){
                var e = ev || event;
                self.fnMove( e );
            };
            document.onmouseup = function(){
                self.fnUp();
            };
        };

    },
    fnDown: function( e ){
        this.disX = e.clientX - this.obj.offsetLeft;
        this.disY = e.clientY - this.obj.offsetTop;
        if( this.obj.setCapture ) this.obj.setCapture();
        this.settings.toDown( this.obj );
    },
    fnMove: function( e ){
        var self = this;
        self.obj.style.top = e.clientY - self.disY + 'px';
        self.obj.style.left = e.clientX - self.disX + 'px';
        this.settings.toMove( this.obj );
    },
    fnUp: function(){
        document.onmousemove = document.onmouseup = null;
        this.settings.toUp( this.obj );
        if( this.obj.releaseCapture ) this.obj.releaseCapture();
    },
    extend: function( obj1, obj2 ){
        for( var k in obj2 ){
            obj1[ k ] = obj2[ k ];
        }
    }
};

var aDiv = document.querySelectorAll( 'div' );
var d1 = new Drag( {
    obj: aDiv[ 0 ],
    toDown: function( obj ){
        obj.innerText = ( obj.innerText * 1 ) + 1;
        obj.style.opacity = '.6';
        obj.style.backgroundColor = '#f96';
    },
    toUp: function( obj ){
        obj.style.opacity = '1';
        obj.style.backgroundColor = '#dbdbdb';
    }
} );