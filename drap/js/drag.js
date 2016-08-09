var ele, ele1, ele2, num, wrap1, wrap2;
ele = document.querySelector( '.box' );
ele1 = document.querySelector( '.box-wrap' );
ele2 = document.querySelector( '.box-wrapBg' );
num = 50;

wrap1 = pos( ele1 );
wrap2 = pos( ele2 );

ele.onmousedown = function( ev ){

  var e, disX, disY;
  e = ev || event;
  disX = e.clientX - this.offsetLeft;
  disY = e.clientY - this.offsetTop;

  /*ie下全局捕获ele，解决选择文字的问题*/
  if( ele.setCapture) ele.setCapture();

  document.onmousemove = function(ev){

    var e, currentX, currentY, docW, docH, T, R, B, L;
    e = ev || event;
    currentX = e.clientX - disX;
    currentY = e.clientY - disY;
    L = e.clientX - disX;
    T = e.clientY - disY;
    R = L + ele.offsetWidth;
    B = T + ele.offsetHeight;


    //兼容处理
    docW = document.clientWidth ? document.clientWidth : document.documentElement.clientWidth;
    docH = document.clientHeight ? document.clientHeight : document.documentElement.clientHeight;

    /*左右吸附效果*/
    if( L - num <= 0 ){
      L = 0;
    } else if( L > docW - ele.offsetWidth - num ){
      L = docW - ele.offsetWidth;
    }

    /*上下吸附效果*/
    if( T - num <= 0 ){
      T = 0;
    } else if( T > docH - ele.offsetHeight - num ){
      T = docH - ele.offsetHeight;
    }

    /*碰撞检测吸入效果*/
    if( L <= wrap1.r && R >= wrap1.l && T <= wrap1.b && B >= wrap1.t ){
      T = wrap1.t;
      L = wrap1.l;
    }

    /*碰撞检测变色*/
    if( L <= wrap2.r && R >= wrap2.l && T <= wrap2.b && B >= wrap2.t ){
      ele2.style.backgroundColor = '#486A8F';
    } else{
      ele2.style.backgroundColor = '#84DFCB';
    }

    ele.style.top = T + 'px';
    ele.style.left = L + 'px';

  };

  document.onmouseup = function(){

    /*释放ele的全局捕获*/
    if( ele.releaseCapture ) ele.releaseCapture();
    document.onmousemove = document.onmouseup = null;

  };

  /*标准下解决选择文字的bug*/
  return false;

};

/*封装获取元素方位值*/
function pos( ele ){

  var curWidth, curHeight, curTop, curRig, curBot, curLeft;
  curWidth = ele.offsetWidth;
  curHeight = ele.offsetHeight;
  curTop = ele.offsetTop;
  curLeft = ele.offsetLeft;
  curRig = curLeft + curWidth;
  curBot = curTop + curHeight;

  return {
    t: curTop,
    r: curRig,
    b: curBot,
    l: curLeft
  };

}


