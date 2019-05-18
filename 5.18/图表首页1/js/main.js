// 主页入口文件
$(function(){
	 var myChart1 = echarts.init($('.ct1').get(0));
	//$('.ct1').click(function(){
	//	console.log(1)
	//})
        // 指定图表的配置项和数据
		var option1 ={
			title: {
				text: '总订单信息',
				textStyle : {
					color: '#CF7C89',
					fontSize: 15,
					fontWeight: 'normal'
				},
				left:'5%',
				top: '5%'
			},
			// color: ['#009CFF', '#FF072F'],  //设置多个颜色值时代表的是图例颜色
			color: ['rgba(0,156,255,.7)', '#FF072F'],
			  tooltip: {
				trigger: 'axis',
				axisPointer: {
				  type: 'line',
				},
				formatter: function(params){
					return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"单<br>"+params[1].seriesName+":"+params[1].data+"元";
				}
			  },
			  legend: {
				top: '5%',
				right: '3%',
				data: ['订单总数', '资金总额'],
				textStyle: {
				  fontSize: 10,
				  fontWeight: 'normal',
				  color: '#C8EBFA'
				},
			  },
			  grid: {
				// left: '15%',
				bottom: '15%',
				top: '25%',
				right: '50'
			  },
			  xAxis: [
				{
				  type: 'category',
				  data: ['订单总数','微信总订单','	支付宝总订单','微信退费总订单','支付宝退费总订单'],
				  textStyle: {
					fontWeight: 'normal',
				  },
				//   axisLabel: {
				// 	textStyle: {
				// 	  fontSize: 12,
				// 	  fontWeight: 'normal',
				// 	},
				// 	rotate: '45',
				//   },
				axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 11      //更改坐标轴文字大小
					},
					lineHeight: 15,
					// rotate: '45'
					formatter:function(val){
						if(val.length <= 4){
							return val
						}else {
							var str1 = val.substring(0,3)
							var str2= val.substring(3)
							// console.log(str1,str2)
							// console.log(val)
							return str1+'\n'+str2
						}
						
					}
				 },
				},
			  ],
			  yAxis: [   //当有两个y轴时，设置两个{}{}来承载y轴的值
				{
				name: '单位/单',
				// nameGap: 2, //坐标轴名称与网格之间的距离
				nameTextStyle: { //坐标轴字体样式设置
					color: '#60C5F1',
					fontSize: 12
				 },
				  type: 'value',
				  min: 0,
				  axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 12      //更改坐标轴文字大小
					}
				 },
				  splitLine: { show: false },  //y轴网格线，一般都会隐藏，x轴亦是如此
		
				},
				{
				  name: '单位/元',
					// nameGap: 2, //坐标轴名称与网格之间的距离
				  nameTextStyle: { //坐标轴字体样式设置
					color: '#60C5F1',
					fontSize: 12
				  },
				  type: 'value',
				  axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 12     //更改坐标轴文字大小
					}
				 },
				  splitLine: { show: false },
				},
			  ],
			  series: [    //对应折线图和柱形图，进行数据加载
				{
				  name: '订单总数', 
				  type: 'bar',
				  data: [419,376,43,181,41],
				  barWidth: '25',
				  label: {
					show: true, //开启显示
					position: 'top', //在上方显示
					textStyle: { //数值样式
						color: '#91C7AE',
						fontSize: 12
						},
						formatter:function(params){
							return params.value + '单'
						}
					},
				},
				{
				  name: '资金总额',
				  type: 'line',
				  yAxisIndex: 1,
				  data:  [2949.89,2816.89,133.00,401.80,130.00],
				  itemStyle : { 
						normal: {
							label: {
								show:true
							}
							
						}
					},
				//   label: {
				//     normal: {
				//       show: false,
				//     },
				//   },
				
				  lineStyle: { //线样式
					type: 'dotted',
					color: '#8BCDEC' ,//线的颜色
					width: 2,
		
				  },
				  itemStyle: { //拐点样式
					color: '#8BCDEC'
				  },
				  label: {
					show: true,
					formatter: function (params){
						return params.value + '元'
					},
					position: [10, -10]
				  }
				},
			  ],
		}
		myChart1.on('click',function(params){
			console.log(params.name)
		})
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
		// ===========第二张表
		var myChart4 = echarts.init($('.ct4').get(0));

		var option4 = {
			title : {
				text: '物品数量统计',
				subtext: '模拟数据',
				x:'center',
				textStyle: {
					color: '#94D8F6',
					fontWeight: 'bold',
				},
				top: 20
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: { //原图右边的小方格图例
				type: 'scroll', //可以滚动的图例（数据较多的时候） plain 普通图例
				orient: 'vertical', //图例列表的布局朝向
				right: 0,
				top: 20,
				bottom: 20,
				data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
				textStyle: {
					color: '#60C5F1',
					fontSize: 9,
				},
				pageTextStyle: {
					
				}

				// selected: data.selected
			},
			series : [
				{
					name: '个数',
					type: 'pie',
					radius : '55%', //设置饼图的大小，也可以设置成 ['20%', '60%]设置环形图
					center: ['40%', '60%'], //饼图的位置
					data:	[
								{value:335, name:'直接访问'},
								{value:310, name:'邮件营销'},
								{value:234, name:'联盟广告'},
								{value:135, name:'视频广告'},
								{value:1548, name:'搜索引擎'},
							], //数据
					// data: [[12, 14], [34, 50], [56, 30], [10, 15], [23, 10]],
					itemStyle: { //图形的样式
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
				
		myChart4.setOption(option4);
		myChart4.on('click',function(params){
			console.log(params.name)
		})
		// =============================== 表3
		var myChart3= echarts.init($('.ct3').get(0));
		var option3 ={
			title: {
				text: '今日订单信息',
				textStyle : {
					color: '#CF7C89',
					fontSize: 15,
					fontWeight: 'normal'
				},
				left:'5%',
				top: '5%'
			},
			// color: ['#009CFF', '#FF072F'],  //设置多个颜色值时代表的是图例颜色
			color: ['rgba(0,156,255,.7)', '#FF072F'],
			  tooltip: {
				trigger: 'axis',
				axisPointer: {
				  type: 'line',
				},
				formatter: function(params){
					return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"单<br>"+params[1].seriesName+":"+params[1].data+"元";
				}
			  },
			  legend: {
				top: '5%',
				right: '3%',
				data: ['订单总数', '资金总额'],
				textStyle: {
				  fontSize: 10,
				  fontWeight: 'normal',
				  color: '#C8EBFA'
				},
			  },
			  grid: {
				// left: '15%',
				bottom: '15%',
				top: '25%',
			  },
			  xAxis: [
				{
				  type: 'category',
				  data: ['订单总数','微信总订单','	支付宝总订单','微信退费总订单','支付宝退费总订单'],
				  textStyle: {
					fontWeight: 'normal',
				  },
				//   axisLabel: {
				// 	textStyle: {
				// 	  fontSize: 12,
				// 	  fontWeight: 'normal',
				// 	},
				// 	rotate: '45',
				//   },
				axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 11      //更改坐标轴文字大小
					},
					lineHeight: 15,
					// rotate: '45'
					formatter:function(val){
						if(val.length <= 4){
							return val
						}else {
							var str1 = val.substring(0,3)
							var str2= val.substring(3)
							// console.log(str1,str2)
							// console.log(val)
							return str1+'\n'+str2
						}
						
					}
				 },
				},
			  ],
			  yAxis: [   //当有两个y轴时，设置两个{}{}来承载y轴的值
				{
				name: '单位/单',
				// nameGap: 2, //坐标轴名称与网格之间的距离
				nameTextStyle: { //坐标轴字体样式设置
					color: '#60C5F1',
					fontSize: 12
				 },
				  type: 'value',
				  min: 0,
				  axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 12      //更改坐标轴文字大小
					}
				 },
				  splitLine: { show: false },  //y轴网格线，一般都会隐藏，x轴亦是如此
		
				},
				{
				  name: '单位/元',
					// nameGap: 2, //坐标轴名称与网格之间的距离
				  nameTextStyle: { //坐标轴字体样式设置
					color: '#60C5F1',
					fontSize: 12
				  },
				  type: 'value',
				  axisLine: {  //这是修改坐标轴信息
					show: true,
					lineStyle: { //设置坐标轴颜色
						color: '#60C5F1'
					}
				},
				axisLabel: {  //设置坐标轴字体样式
				   show: true,  
					textStyle: {
					  color: '#60C5F1',  //更改坐标轴文字颜色
					  fontSize: 12     //更改坐标轴文字大小
					}
				 },
				  splitLine: { show: false },
				},
			  ],
			  series: [    //对应折线图和柱形图，进行数据加载
				{
				  name: '订单总数', 
				  type: 'bar',
				  data: [76,43,33,4,3],
				  barWidth: '25',
				  label: {
					show: true, //开启显示
					position: 'top', //在上方显示
					textStyle: { //数值样式
						color: '#91C7AE',
						fontSize: 12
						},
						formatter:function(params){
							return params.value + '单'
						}
					},
				},
				{
				  name: '资金总额',
				  type: 'line',
				  yAxisIndex: 1,
				  data:  [469.32,315.32,154.00,15,12],
				  itemStyle : { 
						normal: {
							label: {
								show:true
							}
							
						}
					},
				//   label: {
				//     normal: {
				//       show: false,
				//     },
				//   },
				
				  lineStyle: { //线样式
					type: 'dotted',
					color: '#8BCDEC' ,//线的颜色
					width: 2,
		
				  },
				  itemStyle: { //拐点样式
					color: '#8BCDEC'
				  },
				  label: {
					show: true,
					formatter: function (params){
						return params.value + '元'
					},
					position: [10, -10]
				  }
				},
			  ],
		}
		myChart3.setOption(option3);
		myChart3.on('click',function(params){
			console.log(params.name)
		})

		// ===
		var data5= [
			{
				"children": [
					{
						"children": [
							{
								"name": "在线10台"
							},
							{
								
								"name": "离线5台"
							}
						],
						"name": "在线/离线设备"
					},
					{
						"children": [
							{
								"name": "绑定7台"
							},
							{
								"name": "未绑定8台"
							}
						],
						"name": "绑定/未绑定设备"
					}
				],
				"name": "总设备15台"
			}
		]
		var myChart5= echarts.init($('.ct5').get(0));
		myChart5.setOption({
			title: {
				text: '设备信息',
				textStyle : {
					color: '#CF7C89',
					fontSize: 15,
					fontWeight: 'normal'
				},
				left:'5%',
				top: '5%'
			},
			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove'
			},
			series: [
				{	
					
					type: 'tree',
					grid:{
	                    left:'8%',
	                    right:'0',
	                    bottom:'1%',
	                    containLabel:true
					},
					lineStyle: {
						color : 'rgba(184,74,191,.8)'
					},
					data: data5,
					width: '60%',
					// top: '1%',
					left: '20%',
					// bottom: '1%',
					// right: '20%',
	
					symbolSize: 7,
	
					label: {
						// normal: {
						// 	position: 'left',
						// 	verticalAlign: 'middle',
						// 	align: 'right',
						// 	fontSize: 12,
						// 	color: '#00B0F0'
						// },
						color: '#00B0F0',
						position: 'left',
						align: 'right',
						fontSize: 12,
						verticalAlign: 'middle',
						// formatter: function(params){
						// 	console.log(params.name)
						// 	var reg=/\d+/g
						// 	return params.name.replace(reg,function(e){
						// 		return '<span style="color: #fff;">'+ e +'</span>'
						// 	})
						// }
					},
	
					leaves: {
						label: {
							normal: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							}
						}
					},
					// tooltip: {
					// 	trigger: 'item',
					// 	position : ['50%', '50%']
					// },
	
					expandAndCollapse: true,
					animationDuration: 550,
					animationDurationUpdate: 750
				}
			]
		})


	//  处理时间
		handleTime()
		setInterval(handleTime,1000)
	function handleTime(){
		var dt= new Date()
		var year= dt.getFullYear()
		var month= dt.getMonth()+1 <= 9 ?  '0'+(dt.getMonth()+1) : dt.getMonth()+1
		var day= dt.getDate() <= 9 ?  '0'+(dt.getDate()) : dt.getDate()
		var hours= dt.getHours() <= 9 ?  '0'+(dt.getHours()) : dt.getHours()
		var min= dt.getMinutes() <= 9 ?  '0'+(dt.getMinutes()) : dt.getMinutes()
		var second= dt.getSeconds() <= 9 ?  '0'+(dt.getSeconds()) : dt.getSeconds()
		//console.log(year,month,day,hours,min,second)
		$('.time .year').html(year)
		$('.time .month').html(month)
		$('.time .day').html(day)
		$('.time .time_hms').text(hours+':'+min+':'+second)
		//var str= '<span><b class="year">'+year+'</b>年<b class="month">'+month+'</b>月<b class="day">'+day+'</b>日</span><span> <b class="time_hms">'+hours+':'+min+':'+second+'</b></span>'
		//$('.time').html(str)
	}
})

