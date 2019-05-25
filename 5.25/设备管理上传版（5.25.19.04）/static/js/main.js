
/*设备管理js入口文件*/
$(function(){
	var flag1= false //没有到底部
	var flag2= false //没有到底部
	var flag3= false //没有到底部
	var equnum1= 5  //偏移量1
	var equnum2= 5  //偏移量1
	var equnum3= 5  //偏移量1
	var querynum= 1 //设备分类，也就是 在线设备、离线设备、全部设备默认是1
	var source= 1 //搜索分类，也就是 设备编号、设备名称、小区名称默认是1
	var parameter= '' //搜索内容 默认是 ''
	var uid= $('#uid').val().trim()  // 获取id
	var isHaveData1= true //是否还存在数据 ；true有数据； false没数据了
	var isHaveData2= true
	var isHaveData3= true
	var ulList1= $('.dm .ul1 .divLi>li').length
	var ulList2= $('.dm .ul2 .divLi>li').length
	var ulList3= $('.dm .ul3 .divLi>li').length
	isHaveData1= ulList1<5 ? false : true //是否还有数据
	isHaveData2= ulList2<5 ? false : true
	isHaveData3= ulList3<5 ? false : true
//	console.log(isHaveData1,isHaveData2,isHaveData3)

	
	$('.dm header li').click(function(e){
		e= e || window.event
		var target= e.target || e.srcElement
		$('.dm header li').removeClass('active')
		$(target).addClass('active')
		// 获取ul宽度
		var ulWidth= $('.dm .content ul').eq(0).width()
		
		if($(target).index() === 0){
			querynum= 1 //给设备分类赋值，当前选择的是那个
			$('.dm .content').animate({left:"0px"},300)
		}else if($(target).index() === 1){
			querynum= 2
			$('.dm .content').animate({left:"-"+ulWidth+"px"},300)
		}else {
			querynum= 3
			$('.dm .content').animate({left:"-"+ulWidth*2+"px"},300)
		}
	})

	$('.searchBut').click(function(e){
		// console.log(deviceCategory,searchCategory)
		
		// 获取选择的设备分类
		parameter= $('.searchInp input').eq(0).val().trim()// 获取搜索内容
		sAjax(1,uid) //设备分类 id
		sAjax(2,uid)
		sAjax(3,uid)

	})
	

	function sAjax(querynum,uid){ //这里发送ajax是根据条件获取，只获取5条，替换div下面的所有元素,需要发送 3个ajax数据
		$.ajax({ 
				url: './getAjaxEquList',
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
					console.log(data)
					var data= handleData(data)
					render(querynum,data,uid)
					// if(data.length <=0){

					// }
					// 在这里进行判断,判断传过来的是哪个设备索引，然后进行渲染
//					console.log(data)
				}
		})
	}
	
	function render(querynum,data,uid){
//		console.log(data)
		var divObj= null
		var bgGreen= '' //在线设备wifi显示绿色
		if(querynum == 1){
			bgGreen= 'bgGreen' //在线设备wifi显示绿色
			divObj= $('.dm .divLi').eq(0)
			equnum1= data.equnum
			isHaveData1= data.equlist.length<5 ? false : true
		}else if(querynum == 2){
			divObj= $('.dm .divLi').eq(1)
			equnum2= data.equnum
			isHaveData2= data.equlist.length<5 ? false : true
		}else if(querynum == 3){
			divObj= $('.dm .divLi').eq(2)
			equnum3= data.equnum
			isHaveData3= data.equlist.length<5 ? false : true
		}
//		if(data.equlist.length <= 5){
//			divObj.find('.mui-pull-caption-nomore').text('没有更多数据了')
//		}
			var frame= document.createDocumentFragment()
			var htmlStr= ''	
			for(var i= 0; i< data.equlist.length; i++){
				var str= ''
				var orderHref= '' //订单地址
				var tjHref= './codeDayEarn?code='+data.equlist[i].code //统计地址
				var ztDisable= '' //状态class
				var ycDisable= '' //远程class
				
				var wifiIcon= 'icon-WIFIxinhao-ji'
				if(data.equlist[i].csq >=0 && data.equlist[i].csq <= 5){
					wifiIcon= 'icon-WIFIxinhao-ji3'
				}else if(data.equlist[i].csq > 5 &&data.equlist[i].csq <= 10){
					wifiIcon= 'icon-WIFIxinhao-ji2'
				}else if(data.equlist[i].csq > 10 && data.equlist[i].csq <= 20){
					wifiIcon= 'icon-WIFIxinhao-ji1'
				}else if(data.equlist[i].csq > 20){
					wifiIcon= 'icon-WIFIxinhao-ji'
				}
				
				
				
				if(parseInt(uid) != parseInt(data.equlist[i].manid)){
					var ztHref= ''
					var remoteHref= ''
						
					if (data.equlist[i].hardversion != '03' && data.equlist[i].hardversion != '04') {
						ztHref= '/merchant/charge?code='+ data.equlist[i].code
					} else {
						ztHref= 'javascript:;'
						ztDisable= 'disable'
					}
					
					if (data.equlist[i].state == 1) {
						remoteHref= './merchant/remotechargechoose?code='+data.equlist[i].code
					} else {
						remoteHref= 'javascript:;'
						ycDisable= 'disable'
					}
					var manageHref= './equinfo?code='+ data.equlist[i].code
						orderHref= './codetotrade?souce=1&code=' + data.equlist[i].code
					str= `<li class="active">
	                <p>设备编号：<span>${data.equlist[i].code}</span></p>
	                <p>线上收益：<span>${data.equlist[i].totalMoney} <b>元</b></span></p>
	                <p>投币收益：<span>${data.equlist[i].coinsMoney} <b>元</b></span></p>
	                <p>设备名称：<span>${data.equlist[i].remark}</span></p>
	                <p>小区名称：<span>${data.equlist[i].name}</span></p>
	                <div class="bottomBut">
		                <a href="${ztHref}" class="statisticBut ${ztDisable}">状态</a>
                        <a href="${manageHref}" class="manageBut">管理</a>
                        <a href="${remoteHref}" class="remoteBut ${ycDisable}">远程</a>
                        <a href="javascript:;" class="wifi ${bgGreen}"><i class="iconfont ${wifiIcon}"></i></a>
                        <a href="${tjHref}">统计</a>
                        <a href="${orderHref}">订单</a>
	                </div>
	            </li>` //这个是带active的
				}else{
					orderHref= './codetotrade?souce=2&code='+ data.equlist[i].code
					str= `<li>
		                <p>设备编号：<span>${data.equlist[i].code}</span></p>
		                <p>线上收益：<span>${data.equlist[i].totalMoney} <b>元</b></span></p>
		                <p>投币收益：<span>${data.equlist[i].coinsMoney} <b>元</b></span></p>
		                <p>设备名称：<span>${data.equlist[i].remark}</span></p>
		                <p>小区名称：<span>${data.equlist[i].name}</span></p>
		                <div class="bottomBut">
			                <a href="javascript:;" class="statisticBut">状态</a>
	                        <a href="javascript:;" class="manageBut">管理</a>
	                        <a href="javascript:;" class="remoteBut">远程</a>
	                        <a href="javascript:;" class="wifi ${bgGreen}"><i class="iconfont ${wifiIcon}"></i></a>
	                        <a href="${tjHref}">统计</a>
	                        <a href="${orderHref}">订单</a>
		                </div>
	                </li>` //这个是不带active的
				}
				 htmlStr += str 
			}
			$(frame).append($(htmlStr))
			 divObj.find('li').remove();
			 divObj.append($(frame))
			 if(data.equlist < 5){
				 divObj.find('.mui-pull-caption-nomore').text('没有更多数据了')
			 }else{
				 divObj.find('.mui-pull-caption-nomore').text('正在加载...')
			 }
		
	}



	$('.dm main ul').scroll(function(e){
		e= e || window.event
		// 获取当前ul的高度
		var ulWidth= $(this).height()
		var divLi= $(this).find('.divLi').height()
		var index= $(this).index() //判断当前滑动ul的索引 index
		// console.log(ulWidth,$(this).scrollTop())
		var rate= $(this).scrollTop() / (divLi-ulWidth)
//		console.log(isHaveData1,isHaveData2,isHaveData3)
		if(rate*10 >= 10){
			// 发送ajax请求
			if(index=== 0 && !flag1){
				if(isHaveData1){
					sendAjax(index)
					$('.dm .ul1').find('.mui-pull-caption-nomore').text('正在加载...')
				}else{
					$('.dm .ul1').find('.mui-pull-caption-nomore').text('没有更多数据')
				}
				
			}
			if(index=== 1 && !flag2){
				if(isHaveData2){
					sendAjax(index)
					$('.dm .ul2').find('.mui-pull-caption-nomore').text('正在加载...')
				}else{
					$('.dm .ul2').find('.mui-pull-caption-nomore').text('没有更多数据')
				}
			}
			if(index=== 2 && !flag3){
				if(isHaveData3){
					sendAjax(index)
					$('.dm .ul3').find('.mui-pull-caption-nomore').text('正在加载...')
				}else{
					$('.dm .ul3').find('.mui-pull-caption-nomore').text('没有更多数据')
				}
			}
			
		}
	})

	function sendAjax(from){ //这个是滚动发送ajax
//		console.log(querynum)
		var ulObj= null
		var divObj= null
		var equnum= 0 //偏移量
			switch(from){
				case 0: flag1= true ; divObj= $('.dm main .divLi').eq(0);  equnum= equnum1;  break;
				case 1: flag2= true ; divObj= $('.dm main .divLi').eq(1);  equnum= equnum2; break;
				case 2: flag3= true ; divObj= $('.dm main .divLi').eq(2);  equnum= equnum3; break;
			}
		
			$.ajax({
				url: './getAjaxEquList',
				data: {
					uid : uid,
					equnum : equnum,
					querynum : querynum,
					source : source,
					parameter : parameter
				},
				type: 'POST',
				dataType : "json",
				success: function(data){
//					$('#showTip').fadeOut() //关掉提示文字
					// 这里判断res的数据是为空，为空的话提示没有更多数据，后面不执行
					// $('#showTip').find('.mui-pull-caption').text('暂无更多数据...')
					// $('#showTip').fadeIn()
					var data= handleData(data)
					switch(from){
						case 0: isHaveData1= data.equlist.length<5 ? false : true ;  break;
						case 1: isHaveData2= data.equlist.length<5 ? false : true ; break;
						case 2: isHaveData3= data.equlist.length<5 ? false : true ; break;
					}

					console.log(from,data)
					var frame= document.createDocumentFragment()
					var htmlStr= ''
					var bgGreen= ''
					for(var i=0; i< data.equlist.length; i++){
						switch(from){
							case 0: equnum1= data.equnum ; bgGreen= 'bgGreen'; break;
							case 1: equnum2= data.equnum ; break;
							case 2: equnum3= data.equnum ; break;
						}
						var str= ''
						var orderHref= '' //订单地址
						var ztDisable= '' //状态class
						var ycDisable= '' //远程class
							var wifiIcon= 'icon-WIFIxinhao-ji'
							if(data.equlist[i].csq >=0 && data.equlist[i].csq <= 5){
								wifiIcon= 'icon-WIFIxinhao-ji3'
							}else if(data.equlist[i].csq > 5 &&data.equlist[i].csq <= 10){
								wifiIcon= 'icon-WIFIxinhao-ji2'
							}else if(data.equlist[i].csq > 10 && data.equlist[i].csq <= 20){
								wifiIcon= 'icon-WIFIxinhao-ji1'
							}else if(data.equlist[i].csq > 20){
								wifiIcon= 'icon-WIFIxinhao-ji'
							}
						var tjHref= './codeDayEarn?code='+data.equlist[i].code //统计地址
							if(parseInt(uid) != parseInt(data.equlist[i].manid)){
								var ztHref= ''
								var remoteHref= ''
									
								if (data.equlist[i].hardversion != '03' && data.equlist[i].hardversion != '04') {
									ztHref= '/merchant/charge?code='+ data.equlist[i].code
								} else {
									ztHref= 'javascript:;'
									ztDisable= 'disable'
								}
								
								if (data.equlist[i].state == 1) {
									remoteHref= './merchant/remotechargechoose?code='+data.equlist[i].code
								} else {
									remoteHref= 'javascript:;'
									ycDisable= 'disable'
								}
								var manageHref= './equinfo?code='+ data.equlist[i].code
									orderHref= './codetotrade?souce=1&code=' + data.equlist[i].code
								str= `<li class="active">
				                <p>设备编号：<span>${data.equlist[i].code}</span></p>
				                <p>线上收益：<span>${data.equlist[i].totalMoney} <b>元</b></span></p>
				                <p>投币收益：<span>${data.equlist[i].coinsMoney} <b>元</b></span></p>
				                <p>设备名称：<span>${data.equlist[i].remark}</span></p>
				                <p>小区名称：<span>${data.equlist[i].name}</span></p>
				                <div class="bottomBut">
					                <a href="${ztHref}" class="statisticBut ${ztDisable}">状态</a>
			                        <a href="${manageHref}" class="manageBut">管理</a>
			                        <a href="${remoteHref}" class="remoteBut ${ycDisable}">远程</a>
			                        <a href="javascript:;" class="wifi ${bgGreen}"><i class="iconfont ${wifiIcon}"></i></a>
			                        <a href="${tjHref}">统计</a>
			                        <a href="${orderHref}">订单</a>
				                </div>
				            </li>` //这个是带active的
							}else{
								orderHref= './codetotrade?souce=2&code='+ data.equlist[i].code
								str= `<li>
					                <p>设备编号：<span>${data.equlist[i].code}</span></p>
					                <p>线上收益：<span>${data.equlist[i].totalMoney} <b>元</b></span></p>
					                <p>投币收益：<span>${data.equlist[i].coinsMoney} <b>元</b></span></p>
					                <p>设备名称：<span>${data.equlist[i].remark}</span></p>
					                <p>小区名称：<span>${data.equlist[i].name}</span></p>
					                <div class="bottomBut">
						                <a href="javascript:;" class="statisticBut">状态</a>
				                        <a href="javascript:;" class="manageBut">管理</a>
				                        <a href="javascript:;" class="remoteBut">远程</a>
				                        <a href="javascript:;" class="wifi ${bgGreen}"><i class="iconfont ${wifiIcon}"></i></a>
				                        <a href="${tjHref}">统计</a>
				                        <a href="${orderHref}">订单</a>
					                </div>
				                </li>` //这个是不带active的
							}
							
			              
						      htmlStr += str         

					}
					$(frame).append($(htmlStr))
					divObj.append($(frame))
					switch(from){ //打开开关，可以触发
						case 0: flag1= false ; break; 
						case 1: flag2= false ; break;
						case 2: flag3= false ; break;
					}
//					console.log(divObj)
					 if(data.equlist < 5){
						 divObj.parent().find('.mui-pull-caption-nomore').text('没有更多数据了')
					 }else{
						 divObj.parent().find('.mui-pull-caption-nomore').text('正在加载...')
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
						case 1: source= 1 ; break; 
						case 2: source= 2 ; break;
						case 3: source= 3 ; break;
					}
		    $('.deviceName .name').text(selectItems[0].text)
	  	})
	})

	
	function handleData(data){
		var obj= {}
		obj.equlist=[]
		obj.equnum=data.equnum
		obj.listnum= data.listnum
		for(var i=0 ; i< data.equlist.length; i++){
			var obj2= {}
			obj2.code= data.equlist[i].code
			obj2.ccid= data.equlist[i].ccid
			obj2.coinsMoney= data.equlist[i].coinsMoney
			obj2.deviceType= data.equlist[i].deviceType
			obj2.hardversion= data.equlist[i].hardversion
			obj2.hardversionnum= data.equlist[i].hardversionnum
			obj2.name= data.equlist[i].name == null ? '' : data.equlist[i].name
			obj2.remark= data.equlist[i].remark == null ? '' : data.equlist[i].remark
			obj2.totalMoney= data.equlist[i].totalMoney
			obj2.manid= data.equlist[i].manid
			obj2.state= data.equlist[i].state
			obj2.csq= data.equlist[i].csq
			obj.equlist.push(obj2)
		}
		return obj
	}
	 

})