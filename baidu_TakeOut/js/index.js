window.onload = function(){
	var txt = document.getElementById( 'search_cont_txt' );
	var oCont = document.getElementById( 'container' );
	var aLi = oCont.getElementsByTagName( 'li' );

	//模拟IE8以下不支持placeholder;
	txt.onkeydown = function(){
		var _this = this;
		setTimeout( function(){
			if( _this.value ){
				_this.style.backgroundColor = '#fff';
			} else{
				_this.style.backgroundColor = 'transparent';
			}
		}, 16 );
	};

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover = function(){
			if( this.getAttribute( 'data_id' ) == 'cont_list' ){
				var oMask = this.children[3];
				oMask.style.display = 'block';
			}
		};
		aLi[i].onmouseout = function(){
			if( this.getAttribute( 'data_id' ) == 'cont_list' ){
				var oMask = this.children[3];
				oMask.style.display = '';
			}
		};
		hide( aLi[i] );
	};
};

//移入遮罩元素，使其消失;
function hide( ele ){
	if( ele.getAttribute( 'data_id' ) == 'cont_list' ){
		var oMask = ele.children[3];
		oMask.onmouseover = function(){
			var _this = this;
			//隐藏元素的样式不能立刻获取到，要开个定时器处理下;
			setTimeout( function(){
				_this.style.display = 'none';
			}, 16 )
		};
	}
}


/*$(function(){
	//模拟IE8以下不支持placeholder;
	$('#search_cont_txt').on( 'keydown', function(){
		setTimeout( function(){
			if( $("#search_cont_txt").val() ){
				$("#search_cont_txt").css( "backgroundColor", "#fff");
			} else{
				$("#search_cont_txt").css( "backgroundColor", "transparent");
			}
		}, 16 )
	})

	var $aLi = $("li.cont_list");
	$aLi.each(function(){
		$(this).on( "mouseover", function(){
			var $oMask = $(this).find("div:eq(3)");
			$oMask.css( "display", "block" );
		});
		$(this).on( "mouseout", function(){
			var $oMask = $(this).find("div:eq(3)");
			$oMask.css( "display", "");
		});
	});
})*/
