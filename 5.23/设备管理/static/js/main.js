
/*设备管理js入口文件*/
$(function(){
	var flag1= false //没有到底部
	var flag2= false //没有到底部
	var flag3= false //没有到底部
	$('.dm header li').click(function(e){
		e= e || window.event
		var target= e.target || e.srcElement
		$('.dm header li').removeClass('active')
		$(target).addClass('active')
		// 获取ul宽度
		var ulWidth= $('.dm .content ul').eq(0).width()
		
		if($(target).index() === 0){
			$('.dm .content').animate({left:"0px"},300)
		}else if($(target).index() === 1){
			$('.dm .content').animate({left:"-"+ulWidth+"px"},300)
		}else {
			$('.dm .content').animate({left:"-"+ulWidth*2+"px"},300)
		}
	})
	$('.dm main ul').scroll(function(e){
		e= e || window.event
		// 获取当前ul的高度
		var ulWidth= $(this).height()
		var divLi= $(this).find('.divLi').height()
		var index= $(this).index()
		// console.log(ulWidth,$(this).scrollTop())
		var rate= $(this).scrollTop() / (divLi-ulWidth)
		if(rate >= 0.9){
			// 发送ajax请求
			if(index=== 0 && !flag1){
				sendAjax(index)
			}
			if(index=== 1 && !flag2){
				sendAjax(index)
			}
			if(index=== 2 && !flag3){
				sendAjax(index)
			}
			
		}
	})

	function sendAjax(from){
		var ulObj= null
		var divObj= null
			switch(from){
				case 0: flag1= true ; divObj= $('.dm main .divLi').eq(0); break;
				case 1: flag2= true ; divObj= $('.dm main .divLi').eq(1); break;
				case 2: flag3= true ; divObj= $('.dm main .divLi').eq(2); break;
			}
			$('#showTip').find('.mui-pull-caption').text('正在加载...')
			$.ajax({
				url: './getAjaxEquList',
				data: {},
				type: 'POST',
				success: function(res){
					$('#showTip').fadeOut()
					// 这里判断res的数据是为空，为空的话提示没有更多数据，后面不执行
					var frame= document.createDocumentFragment()
					var htmlStr= ''
					for(var i=0; i< res.length; i++){
						var str= `<li>
						                    <p>设备编号：<span>000005</span></p>
						                    <p>线上收益：<span>45 <b>元</b></span></p>
						                    <p>投币收益：<span>20 <b>元</b></span></p>
						                    <p>设备名称：<span>和动小区智能充电桩</span></p>
						                    <p>小区名称：<span>回忆小区</span></p>
						                    <div class="bottomBut">
						                        <button type="button" class="mui-btn mui-btn-success">统计</button>
						                        <button type="button" class="mui-btn mui-btn-success">订单</button>
						                    </div>
						                </li>`
						      htmlStr += str         

					}
					$(frame).append($(htmlStr))
					divObj.append($(frame))
					switch(from){ //发开开关，可以触发
						case 0: flag1= false ; break; 
						case 1: flag2= false ; break;
						case 2: flag3= false ; break;
					}
				}
			})
	
	}

	 var picker = new mui.PopPicker();
	 picker.setData([
		 	{value:'1',text:'设备编号'},
		 	{value:'2',text:'设备名称'},
		 	{value:'3',text:'小区名称'}
	 	]);
	$('.deviceName').click(function(){
		picker.show(function (selectItems) {
		    console.log(selectItems[0].text);
		    console.log(selectItems[0].value);//zz 
		    $('.deviceName .name').text(selectItems[0].text)
	  	})
	})

	
	 

})