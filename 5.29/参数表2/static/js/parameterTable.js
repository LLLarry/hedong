
$(function(){
	var index
	$('.detail .mui-table-view .mui-table-view-cell').click(function(e){
		if($(this).index() != index){
			index= $(this).index()
			$('.detail .mui-table-view>div').slideUp(300)
			$(this).parent().children().eq($(this).index()+1).slideDown(300)
		}else{
			$(this).parent().children().eq($(this).index()+1).slideUp(300)
			index= undefined
		}
	})

	// var isBalanceRec= $("#isBalanceRec").hasClass('mui-active') ? 1 : 0
	// var isPowerFailure= $("#isPowerFailure").hasClass('mui-active') ? 1 : 0
	$('.getDataBut').click(function(e){ //获取数据
		
	})

	$('.setDataBut').click(function(e){ //设置数据
		sendData()
	})

	function sendData(){
				var flag= false //默认为false 当所有的元素都通过验证之后再变为rue
				 $('.detail input').each((i,item)=>{
						if(!handleReg($(item))){
							var minVal= parseFloat($(item).attr('data-min'))
							var maxVal= parseFloat($(item).attr('data-max'))
							var textTxt= $(item).parent().parent().find('span').text()
							mui.toast(textTxt+'的范围是'+minVal+'~'+maxVal+'，请重新输入',{ duration:'2000', type:'div' }) 
							return false
						}
						if(i === $('.detail input').length-1){
							flag= true
						}
						
					})
			if(flag){
				console.log('通过验证')
				// 这一步所有的input都已经通过验证了，然后需要获取是否显示电量的switch
					var isBalanceRec= $("#isShowFirstPower").hasClass('mui-active') ? 1 : 0
					/*发送ajax向后台传输数据,(获取每个input的数据)*/
					var isBalanceRec= $("#isBalanceRec").hasClass('mui-active') ? 1 : 0  //获取按钮的数据
					var isPowerFailure= $("#isPowerFailure").hasClass('mui-active') ? 1 : 0 //获取按钮的数据
					//这一步要获取所有的input 的数据进行上传数据操作
					$.ajax({
						url: '#',
						data: {},
						success: function(e){
							
						}
					})
			}
	} 

	function handleReg(jqEle) { //判断输入的值是否满足匹配规则（最大值最小值）
		var val= parseFloat(jqEle.val().trim())
		var minVal= parseFloat(jqEle.attr('data-min'))
		var maxVal= parseFloat(jqEle.attr('data-max'))
		if(val >= minVal && val <= maxVal){
			return true
		}
		return false
	}
	
})