window.onload = function(){
	var oBtn = document.getElementById( 'btn' );
	var currentH = document.documentElement.clientHeight;
	var onoff = true;
	bind( window, 'scroll', stop );
	bind( oBtn, 'click', scrollUp );

	function stop(){
		var iTop = document.documentElement.scrollTop || document.body.scrollTop;
		if( iTop >= currentH ){
			oBtn.style.display = 'block';
		} else{
			oBtn.style.display = '';
		}
		if( !onoff ){
			clearInterval( oBtn.timer );
		}
		onoff = false;
	}

	function scrollUp(){
		var _this = this;
		_this.timer = setInterval( function(){
			var iTop = document.documentElement.scrollTop || document.body.scrollTop;
			var iSpeed = Math.floor( -iTop / 10 );
			onoff = true;
			if( iTop == 0 ){
				clearInterval( _this.timer );
			}
			document.documentElement.scrollTop = document.body.scrollTop = iTop + iSpeed;
			console.log( iSpeed,iTop + iSpeed );	
		}, 20 )
	}

	function bind( ele, event, fn ){
		return ele.addEventListener ? ele.addEventListener( event, fn, false ) : ele.attachEvent( 'on' + event, fn );
	}

};
