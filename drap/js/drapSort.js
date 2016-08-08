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