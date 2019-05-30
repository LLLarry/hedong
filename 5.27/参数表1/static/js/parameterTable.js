
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

	var isBalanceRec= $("#isBalanceRec").hasClass('mui-active') ? 1 : 0
	var isPowerFailure= $("#isPowerFailure").hasClass('mui-active') ? 1 : 0
	$("#isBalanceRec").get(0).addEventListener("toggle",function(event){
	  if(event.detail.isActive){
	    console.log("你启动了开关");
	    isBalanceRec= 1
	  }else{
	    console.log("你关闭了开关"); 
	     isBalanceRec= 0 
	  }
	  sendData()
	})
	$('#isPowerFailure').get(0).addEventListener("toggle",function(event){
	  if(event.detail.isActive){
	    console.log("你启动了开关");
	    isPowerFailure= 1
	  }else{
	    console.log("你关闭了开关");  
	    isPowerFailure=0
	  }
	   sendData()
	})

	/*
	点击确定，提交数据
	*/
	$('.confirm').click(function(e){
		sendData()
	})

	function sendData(){
		// console.log(isBalanceRec,isPowerFailure) //获取开关是否开启关闭
				var flag= false //默认为false 当所有的元素都通过验证之后再变为rue
				 $('.detail input').each((i,item)=>{
						if(!handleReg($(item))){
							var minVal= parseFloat($(item).attr('data-min'))
							var maxVal= parseFloat($(item).attr('data-max'))
							var textTxt= $(item).parent().parent().find('span').text()
							mui.toast(textTxt+'的范围是'+minVal+'~'+maxVal+'，请重新输入',{ duration:'1500', type:'div' }) 
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