// 小区管理入口
$(function(){
	$('#addArea').click(function(){
		$('.list').slideUp()
		$('.areaBelongInfo2').slideDown()
	})
	$('.close').click(function(){
		$('.areaBelongInfo2').slideUp()
		$('.list').slideDown()
	})

})