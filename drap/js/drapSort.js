var oUl, aLi, oneTop, liHeight;
oUl = document.querySelector( '.list' );
aLi = oUl.querySelectorAll( 'li' );
oneTop = aLi[0].offsetTop;
liHeight = aLi[0].offsetHeight;

for (var i = 0; i < aLi.length; i++) {
  drag( aLi[ i ] );
}


function drag( obj ){
  obj.onmousedown = function( ev ){
    var e, oBlank, disX, disY;
    e = ev || event;

    oBlank = document.createElement( 'li' );
    oBlank.className = 'blank';
    oUl.insertBefore( oBlank, obj.nextSibling );
    oBlank.style.visibility = 'hidden';

    obj.style.top = obj.offsetTop + 'px';
    obj.style.left = obj.offsetLeft + 'px';
    obj.style.position = 'absolute';
    obj.style.zIndex = '999';
    obj.style.backgroundColor = '#FA002C';

    disX = e.clientX - this.offsetLeft;
    disY = e.clientY - this.offsetTop;
    if( this.setCapture ) this.setCapture();

    document.onmousemove = function( ev ){
      var e, T, L, n;
      e = ev || event;

      T = e.clientY - disY;
      L = e.clientX - disX;

      n = Math.round( ( T - oneTop ) / liHeight + 1 );
      oUl.insertBefore( oBlank, oUl.children[ n ] );

      obj.style.top = T + 'px';
      obj.style.left = L + 'px';
    };

    document.onmouseup = function( ev ){
      var e = ev || event;
      obj.removeAttribute( 'style' );
      // 错误监测
      try{
        oUl.insertBefore( obj, oBlank );
        oUl.removeChild( oBlank );
      } catch( msg ){
        return;
      }
      document.onmousemove = document.onmouseout = null;
      if( this.releaseCapture ) this.releaseCapture();
    };
    return false;
  };
}









/*面向对象写法 ·实例6*/

// 构造函数================================================
var Drag = function(opt){
    this.obj = null; // this:Drag对象，this.obj:元素
    this.disX = 0;
    this.disY = 0;
    this.settings = { //默认参数
        toDown : function(){},
        toMove : function(){},
        toUp : function(){}
    };
    // 如果创建对象的时候就传入了配置参数，执行init()
    opt && this.init( opt ); 
};

// 方法================================================
Drag.prototype = {
    // init() 初始化
    init: function( opt ) {
        if ( !opt ) { return false; }
        var This = this; // 保存this
        // 判断传入的是对象还是id名，获取对象
        this.obj = 'string' == ( typeof opt.id) ? document.getElementById( opt.id ) : opt.id;
        // 调用extend() 将配置的参数传到对象中保存
        this.extend( this.settings , opt ); 
        this.obj.onmousedown = function( ev ){
            var e = ev || window.event;
            // 执行fnDown()
            This.fnDown( e );
            if ( oDiv.setCapture ) { oDiv.setCapture(); }
            document.onmousemove = function( ev ){
                var e = ev || window.event;
                // 执行fnDown()
                This.fnMove( e );
            };
            document.onmouseup = function(){
                // 执行fnUp()
                This.fnUp();
                if ( oDiv.releaseCapture ) { oDiv.releaseCapture(); }
            };
            return false;
        };
    },
    // fnDown() 鼠标按下方法
    fnDown: function( ev ) { 
        this.obj.style.zIndex = this.setZ(); // 设置层级
        this.disX = ev.clientX - this.obj.offsetLeft;
        this.disY = ev.clientY - this.obj.offsetTop;
        this.settings.toDown( this.obj ); // 执行自定义的toDown()
    },
    // fnMove() 鼠标移动方法
    fnMove: function( ev ) {
        this.obj.style.left = ev.clientX - this.disX + 'px';
        this.obj.style.top = ev.clientY - this.disY + 'px';
        this.settings.toMove( this.obj ); // 执行自定义的toMove()
    },
    // fnUp() 鼠标抬起方法
    fnUp: function() {
        document.onmousemove = null;
        document.onmouseup = null;
        this.settings.toUp( this.obj ); // 执行自定义的toUp()
    },
    // extend() 传参
    extend: function( obj1, obj2 ) {
        for(var attr in obj2){ 
            obj1[ attr ] = obj2[ attr ];
        }
    },
    // setZ() 其他div层级
    setZ: function(){
        var otherDiv = this.obj.parentNode.getElementsByTagName( 'div' );
        var n = 0;
        for(var i=0; i < otherDiv.length; i++){ 
            /*获取当前div的index值*/
            var dn = parseInt( otherDiv[i].style.zIndex );
            n = ( dn > n ? dn : n ); // if ( dn > n) { n = dn;} 
        }
        return n+1;
    }
};

// 调用================================================
var aDiv = document.getElementsByTagName( 'div' );
var d1 = new Drag({ // div1
    id : aDiv[ 0 ], // 传入对象
    toDown : function( obj ){
        obj.style.opacity = '0.6';
        obj.innerHTML = parseInt( obj.innerHTML ) +1;
    },
    toUp : function( obj ){
        obj.style.opacity = '1';
    }
});
var d2 = new Drag({ // div2
    id : 'div2', // 直接穿入对象id
    toDown : function( obj ){
        obj.style.backgroundColor = '#E03E5D';
        obj.style.opacity = '0.6';
        obj.innerHTML = parseInt( obj.innerHTML ) -1;
    },
    toUp : function( obj ){
        obj.style.opacity = '1';
    }
});
var d3 = new Drag({ // div3
    id : aDiv[ 2 ],
    toDown : function( obj ){
        obj.style.backgroundColor = '#333';
        obj.style.opacity = '0.6';
        obj.innerHTML = '我是黑色';
        obj.style.fontSize = '20px';
    },
    toUp : function( obj ){
        obj.innerHTML = '';
        obj.style.opacity = '1';
    }
});
var d4 = new Drag({ // div4
    id : aDiv[ 3 ],
    toDown : function( obj ){
        obj.style.backgroundColor = '#3E96E0';
        obj.style.opacity = '0.8';
        obj.innerHTML = '我是方形';
        obj.style.fontSize = '20px';
        obj.style.borderRadius = '0';
    },
    toMove : function( obj ){
        document.body.style.background = '#333';
    },
    toUp : function( obj ){
        obj.innerHTML = '';
        obj.style.opacity = '1';
    }
});



