
/*设备管理js入口文件*/
$(function(){
	var flag1= false //没有到底部
	var flag2= false //没有到底部
	var flag3= false //没有到底部
	var offset1= 0  //偏移量1
	var offset2= 0  //偏移量1
	var offset3= 0  //偏移量1
	var querynum= 1 //设备分类，也就是 在线设备、离线设备、全部设备默认是1
	var source= 1 //搜索分类，也就是 设备编号、设备名称、小区名称默认是1
	var parameter= '' //搜索内容 默认是 ''
	$('.dm header li').click(function(e){
		e= e || window.event
		var target= e.target || e.srcElement
		$('.dm header li').removeClass('active')
		$(target).addClass('active')
		// 获取ul宽度
		var ulWidth= $('.dm .content ul').eq(0).width()
		
		if($(target).index() === 0){
			deviceCategory= 1 //给设备分类赋值，当前选择的是那个
			$('.dm .content').animate({left:"0px"},300)
		}else if($(target).index() === 1){
			deviceCategory= 2
			$('.dm .content').animate({left:"-"+ulWidth+"px"},300)
		}else {
			deviceCategory= 3
			$('.dm .content').animate({left:"-"+ulWidth*2+"px"},300)
		}
	})

	$('.searchBut').click(function(e){
		// console.log(deviceCategory,searchCategory)
		var uid= $('#uid').val().trim()  // 获取id
		// 获取选择的设备分类
		parameter= $('.searchInp input').eq(0).val().trim()// 获取搜索内容
		sAjax(1,uid) //设备分类 id
		sAjax(2,uid)
		sAjax(3,uid)

	})


	function sAjax(querynum,uid){ //这里发送ajax是根据条件获取，只获取5条，替换div下面的所有元素,需要发送 3个ajax数据
		$.ajax({ 
				url: './equipment/getAjaxEquList',
				data: {
					uid : uid,
					equnum : 0,
					querynum : querynum,
					source : source,
					parameter : parameter
				},
				type: 'POST',
				dataType : "json",
				success: function(data){
					// if(data.length <=0){

					// }
					// 在这里进行判断,判断传过来的是哪个设备索引，然后进行渲染
					console.log(data)
				}
		})
	}



	$('.dm main ul').scroll(function(e){
		e= e || window.event
		// 获取当前ul的高度
		var ulWidth= $(this).height()
		var divLi= $(this).find('.divLi').height()
		var index= $(this).index() //判断当前滑动ul的索引 index
		// console.log(ulWidth,$(this).scrollTop())
		var rate= $(this).scrollTop() / (divLi-ulWidth)
		if(rate*10 >= 10){
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

	function sendAjax(from){ //这个是滚动发送ajax
		var ulObj= null
		var divObj= null
		var offset= 0 //偏移量
			switch(from){
				case 0: flag1= true ; divObj= $('.dm main .divLi').eq(0); offset1+=5 ; offset= offset1; break;
				case 1: flag2= true ; divObj= $('.dm main .divLi').eq(1); offset2+=5 ; offset= offset2; break;
				case 2: flag3= true ; divObj= $('.dm main .divLi').eq(2); offset3+=5 ; offset= offset3; break;
			}
			$('#showTip').find('.mui-pull-caption').text('正在加载...')
			console.log(offset)
			$.ajax({
				// url: './getAjaxEquList',
				url: 'http://39.97.98.149:3000/comment/music?id=186016&limit=5&',
				data: {offset:offset},
				// type: 'POST',
				type: 'GET',
				success: function(res){
					$('#showTip').fadeOut() //关掉提示文字
					// 这里判断res的数据是为空，为空的话提示没有更多数据，后面不执行
					// $('#showTip').find('.mui-pull-caption').text('暂无更多数据...')
					// $('#showTip').fadeIn()
					console.log(res)
					var frame= document.createDocumentFragment()
					var htmlStr= ''
					for(var i=0; i< res.comments.length; i++){
						var str= `<li class="active">
			                        <p>设备编号：<span>000001</span></p>
			                        <p>线上收益：<span>7 <b>元</b></span></p>
			                        <p>投币收益：<span>10 <b>元</b></span></p>
			                        <p>设备名称：<span>和动小区智能充电桩</span></p>
			                        <p>小区名称：<span>回忆小区</span></p>
			                        <div class="bottomBut">
			                            <button type="button" class="mui-btn mui-btn-success statisticBut">统计</button>
			                            <button type="button" class="mui-btn mui-btn-success manageBut">管理</button>
			                            <button type="button" class="mui-btn mui-btn-success remoteBut">远程</button>
			                            <button type="button" class="mui-btn mui-btn-danger"><i class="iconfont icon-wifi-off-outline"></i></button>
			                            <button type="button" class="mui-btn mui-btn-success">统计</button>
			                            <button type="button" class="mui-btn mui-btn-success">订单</button>
			                        </div>
			                    </li>` //这个是带active的
			              var str2= `<li>
			                        <p>设备编号：<span>000001</span></p>
			                        <p>线上收益：<span>7 <b>元</b></span></p>
			                        <p>投币收益：<span>10 <b>元</b></span></p>
			                        <p>设备名称：<span>和动小区智能充电桩</span></p>
			                        <p>小区名称：<span>回忆小区</span></p>
			                        <div class="bottomBut">
			                            <button type="button" class="mui-btn mui-btn-success statisticBut">统计</button>
			                            <button type="button" class="mui-btn mui-btn-success manageBut">管理</button>
			                            <button type="button" class="mui-btn mui-btn-success remoteBut">远程</button>
			                            <button type="button" class="mui-btn mui-btn-danger"><i class="iconfont icon-wifi-off-outline"></i></button>
			                            <button type="button" class="mui-btn mui-btn-success">统计</button>
			                            <button type="button" class="mui-btn mui-btn-success">订单</button>
			                        </div>
			                    </li>` //这个是不带active的
						      htmlStr += str         

					}
					$(frame).append($(htmlStr))
					divObj.append($(frame))
					switch(from){ //打开开关，可以触发
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
		    // console.log(selectItems[0].text);
		    // console.log(selectItems[0].value);//zz 
		   		 switch(parseInt(selectItems[0].value)){ //打开开关，可以触发
						case 1: searchCategory= 1 ; break; 
						case 2: searchCategory= 2 ; break;
						case 3: searchCategory= 3 ; break;
					}
		    $('.deviceName .name').text(selectItems[0].text)
	  	})
	})

	
	 

})