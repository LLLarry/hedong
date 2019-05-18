// 主页入口文件
$(function(){
	 var myChart1 = echarts.init($('.ct1').get(0));
	//$('.ct1').click(function(){
	//	console.log(1)
	//})
        // 指定图表的配置项和数据
        option1 = {
    title : {
        text: '某地区蒸发量和降水量',
		textStyle: {
			fontSize: 18,
			color: '#94D8F6',
			fontWeight: 'bold'
		},
		x: 'center',
		top: 20
    },
    tooltip : {
        trigger: 'axis'
    },
    // legend: {
    //     data:['蒸发量','降水量']
    // },

    calculable : true,
    xAxis : [
        {	
			name: '（月份）',
			nameGap: 2, //坐标轴名称与网格之间的距离
			nameTextStyle: { //坐标轴字体样式设置
				color: '#0070C0',
				fontSize: 9
			},
            // type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
			      fontSize: 8      //更改坐标轴文字大小
			    }
			 },
        }
    ],
    yAxis : [
        {	
			name: '（毫米）',
			// nameLocation : 'start',
			nameGap: 10, //坐标轴名称与网格之间的距离
			// nameRotate : 10, //旋转角度
			nameTextStyle: { //坐标轴字体样式设置
				color: '#0070C0',
				fontSize: 9
			},
            type : 'value',
			splitLine: {  //设置y轴网格线颜色及显示
				show: false,
				lineStyle:{
				   color: ['#315070'],
				   width: 1,
				   type: 'solid'
			  },
			},
		
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
			      fontSize: 8      //更改坐标轴文字大小
			    }
			 },
        }
    ],
	grid: {
		show: false,
	},
    series : [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            // markPoint : {
            //     data : [
            //         {type : 'max', name: '最大值'},
            //         {type : 'min', name: '最小值'}
            //     ]
            // },
            // markLine : {
            //     data : [
            //         {type : 'average', name: '平均值'}
            //     ]
            // }
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            // markPoint : {
            //     data : [
            //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
            //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
            //     ]
            // },
            // markLine : {
            //     data : [
            //         {type : 'average', name : '平均值'}
            //     ]
            // }
        }
    ]
};
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
		var option3 = {
			 title : {
			    text: '模拟折线统计图',
				textStyle: {
					fontSize: 18,
					color: '#94D8F6',
					fontWeight: 'bold'
				},
				x: 'center',
				top: 20
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '元',
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				itemStyle: { 
					normal: 
							{
								label : {show: true},
								formatter: "{b}: {c}",
								textStyle: {
									color: '#fff'
								}
							}
						},
				lineStyle: { 
					color: '#fff'  //折线颜色
				},
				// itemStyle :{ //折线拐点样式
				// 	color: '#ccc'  //折线拐点颜色
				// }
				// areaStyle: {  //区域填充颜色，也就是折线图下面到坐标轴之间的颜色
				// 	color: 'rgba(0,0,0,.2)'
				// }
			}],
			
		};
		myChart3.setOption(option3);
		myChart3.on('click',function(params){
			console.log(params.name)
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

