// 小区管理入口
$(function(){
	// 点击编辑小区
	$('#edit').click(function(){
		$('.areaBelongInfo1').slideUp()
		$('.areaBelongInfo2').slideDown()
	})
	// 点击模板
	$('#alertBtn').click(function(){
		$('.alert').fadeIn()
	})
	$('.alert').click(function(){
		$('.alert').fadeOut()
	})
	$('.alert ul').click(function(e){
		e= e || window.event
		e.stopPropagation()
	})

})