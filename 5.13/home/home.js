//这是home的入口文件
 window.onload= function () {

     var myChart = echarts.init(document.getElementById('ct1'));

     // 指定图表的配置项和数据
     var option = {
         color: ['#ff0000'],
         title: {
             text: '2019年销售数据'
         },
         tooltip: {},
         legend: {
             data:['销量数据']
         },
         xAxis: {
             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子",'毛衣']
         },
         yAxis: {

         },
         series: [{
             name: '销量数据',
             type: 'bar',
             data: [5, 20, 36, 10, 10, 20,89]
         }]
     };

     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);

 }