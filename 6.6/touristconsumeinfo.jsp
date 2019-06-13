<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta charset="UTF-8">
	<title>用户在线消费</title>
	<link rel="stylesheet" href="${hdpath}/mui/css/mui.min.css">
	<link rel="stylesheet" href="${hdpath}/mui/css/mui.dtpicker.css">
	<link rel="stylesheet" href="${hdpath}/mui/css/mui.picker.css">
	<script src="${hdpath}/mui/js/mui.min.js"></script>
	<script src="${hdpath}/mui/js/mui.dtpicker.js"></script>
	<script src="${hdpath}/mui/js/mui.picker.js"></script>
	<script src="${hdpath}/js/jquery.js"></script>
<style type="text/css">
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1221168_a2sbmjqs6uf.eot?t=1559285176791'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1221168_a2sbmjqs6uf.eot?t=1559285176791#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWIAAsAAAAACoAAAAU5AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDXgqHQIYxATYCJAMcCxAABCAFhG0HcBsZCRGVpAuQ/Rxw26OnvuTLqV9/TmxhZyauG1XUSUoyM0PQf43pvuP8CxSIZMaXxgM6Wc1G16gaw7IsVHUOctODUAupmDrZHKrqL3t3aq85PFS3f3t7GKchRRaHCdVE/hdMpID7v7V2qCdIg8UzrVhVndv7szvrb/bvWUMTTUM6iEQInUc7riGe8OnvVc1YOID2IorZ+1l7cS6UC1AuNM9zARq7c9gCKmgLUq6oVgF2toQ/gQ9DAAYzoAIEGzsXHygQQNULbSmJ8ZFQIg4IBQRBMaeMC0mcqsEAhfi8XADcOz+vj2gRmAEHEQH1UQdxtjGw/Ybzo4hQfgqEIAsedOcD2MvAA2wBEAA9yQxcAuIVtgABk/8mCU4A2lDAQXrT/x56t9/gb75/FNHpRDvVQUFb+wcPAiTwEMGBADECDE0KfVFMwC+nwUMAfrUUWcYM2PAw4rARYfwOHhzwV6Q6QkO2LmgD9AFIBVAz1bTlGNwh4wP498IEBll1x8VYOPowLnENcBSXX/ncvPa9e+t/+yZkRMnvBB+n8frWUKRRIPo3vyWFx0cjNz5+c9c8p3N2B9e8J7ca5Vtf9PrJ5+bG/+bO//Y2gNZIaUBRMEnUJgIBTePNZDIFdWbjb2agbnCtraaWav6afVfP4NeGztc60ntjy378Kl2pFKNtF2qwbtQVAZR6wBZewdh5yrIP3+JM+BVB2+zZoG7h24kNDTxY01Cb8ZWftXHhJTTMKEaN4smsNGNxp4oBEoEotS2X20cB6nJ+Z4SneHOAKhd1hsv701GacvTcIMUvITtIkz8afU6TjSxRxBCLcxIbG+lcAxZkaoIbzb7Fl5sbzwWkBFoqKhfZOKc42RZdXUtU+zztZtDSdlUTatTn8L/PNSzjetjAYzk05N/ob9RmxfCp93XfaOkl0lBmv/Y9ggYs4FmzIXH78FDs8/hXa1kL65exr7aWCfsy/tn6sH+I8Utbo0NSCrgxx5fTH2jArvkZ0o/SowuhqkddyuCgwlVoYwt8ick1NcmmlsgAROE0HM9YeiB6fE2q7Lynv298h1bcB+GvAUbz7r0JGcKTDoNSzPYSthd7oYhdB+q3H9/WQEdirVlaSArh7HJpcxHzyP97Wmf+Y0KVPtPaQ0ffVTq5taFjgoau9bcU5hCOB+T+AxnJUcsxigCY2hG8UPTymsnr4TR6PVj1nXt+gVVrUmvHY7pTqv3GojpeA1Fhs1aIrvY4zAA31SzcN5FKRIUbxGmHbVgTdlxrZExQlaXWW40ZANAr8wuJO2QKMp4U8gPkJ7JA/u5rkqM0inz25m/vNq6Ovv7dYDf5L+QPeuSd7+uKjPfKFKqnmeIVNFJZ+a4ma9bj+UD7UJ25ZnUYPWOgqBjMTiVFd3OMgTc0MuAe7mFdl6QYDuhONk33iiV4QG/Ro6qbTIqltoLZNIHLq0FCDdUGsGGPoEufC7rT9kj3+tzAA/qOHo34pCd9UUM3Z9Fzw2olePOIAIqQIekC4ZJlMt2NzW77NMiuTkVY7ZDmQTg8TYK+QLw8ASaILk44WTmEyAgTlkHGiceBrlvEFpYKEvoURDvl97OsT/JJluFptkcAFAIZRFoBwUksJmYNR82J758GZC4dJQq6ytLzgODgixNBPoEK8AmDWanrVFY7smQhCDFqFyNYDMQ4fEDXChbCzt6kAhLkozTI2VL8ZD9W1eAb3mSc5xnAqK/I4eQVFJWUVSgD5QWXmqGWQ8g5rmHjoZzoLFimrLhe5NSUlEBfe0S5BkfhasLXVFRK18lIuccDAAAA') format('woff2'),
  url('//at.alicdn.com/t/font_1221168_a2sbmjqs6uf.woff?t=1559285176791') format('woff'),
  url('//at.alicdn.com/t/font_1221168_a2sbmjqs6uf.ttf?t=1559285176791') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1221168_a2sbmjqs6uf.svg?t=1559285176791#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-laiyuan2:before {
  content: "\e77a";
}

.icon-consumption:before {
  content: "\e6f1";
}

.icon-yonghu-tianchong:before {
  content: "\e670";
}

.icon-icon:before {
  content: "\e611";
}

.icon-shijian:before {
  content: "\e681";
}

.icon-zhuangtai:before {
  content: "\e632";
}

* {
			padding: 0;
			margin: 0;
		}
		li {
			list-style: none;
		}
		body {
			background-color: #efeff4;
		}
		header h3 {
			text-align: center;
			padding: 5px 0 10px;
			font-size: 14px;
		}
		.noData {
			position: absolute;
			left: 0;
			top: 40px;
			right: 0;
			bottom: 0;
			text-align: center;
			margin-top: 50%;
			color: #999;
			font-size: 14px;
		}
		.userDetail {
			padding: 15px 10px 0;
			color: #666;
			font-size: 12px;
		}
		.userDetail ul {
			height: calc(100vh - 60px);
			overflow: auto;
		}
		.userDetail ul li {
			border: 1px solid #ccc;
			overflow: hidden;
			padding:10px;
			border-radius: 5px;
			background-color: #f8f8f8;
			margin-bottom: 15px;
		}
		.userDetail ul li:active {
			background-color: #EfEfEf;
		}
		.userDetail ul li div{
			min-width: 50%;
			float: left;	
		}
		.userDetail ul li div:nth-child(1){
			width: 100%;
		}
		
		.userDetail ul li div span {
			/*display: block;*/
			line-height: 30px;
			text-align: center;
		}
		.userDetail ul li div .title{
			color: #999;
		}
		.userDetail ul li div span i {
			color: #22B14C;
			font-size: 15px;
			margin-right: 5px;
		}

		/*添加的css*/
		.time {
			margin-bottom: 10px;
		}
		.firstDiv {
			width: 80px;
			float: left;
			line-height: 33px;
		}
		.time button {
			float: right;
			margin-top: 3px;
		}
		.time .lastDiv {
			overflow: hidden;
			line-height: 33px;

		}
		.time .lastDiv span {
			display: block;
			width: 90%;
			height: 100%;
			text-align: center;
			border: 1px solid #ccc;
			border-radius: 6px;
			margin: 0 auto;
			color: #999
		}

	</style>
</head>
<body>
	<div class="userDetail">
	<input type="hidden" value= "${uid}" id="uidInp"/>
	<input type="hidden" value= "${beginTime}" id="beginTimeInp"/>
	<input type="hidden" value= "${endTime}" id="endTimeInp"/>
	<input type="hidden" value= "${offset}" id="offsetInp"/>
		<header>
			<!-- <h3>会员管理</h3> -->
			<div class="time">
				<div class="firstDiv">选择搜索日期</div> <button type="button" class="mui-btn mui-btn-success" id="search">搜索</button> <div class="lastDiv"><span id="timeText">按日期搜索</span></div>
			</div>
		</header>
		<ul>
			<div class="ul-scroll-div">
			<c:choose>
			  <c:when test="${size==0}">
			  		<div class="noData">暂无数据</div>
			  </c:when>
			  <c:otherwise>
				<c:forEach items="${consumeinfo}" var="consume">
					<li>
						<div class="left">
							<span class="title"><i class="iconfont icon-icon" style="font-size: 14px;"></i>订单号：</span>
							<span>${consume.ordernum}</span>
						</div>
						<div class="left">
							<span class="title"><i class="iconfont icon-yonghu-tianchong"></i>用户：</span>
							<span>${consume.tonick}</span>
						</div>
						<div class="right">
							<span class="title"><i class="iconfont icon-consumption"></i>消费金额：</span>
							<span>
							<c:if test="${consume.status==1}">+</c:if>
							<c:if test="${consume.status==2}">-</c:if>
							<fmt:formatNumber value="${consume.money}" pattern="0.00"/></span>
							<strong>元</strong>
						</div>
						<div class="left">
							<span class="title"><i class="iconfont icon-zhuangtai"></i>状态：</span>
							<span>${consume.status==1 ? "正常" : consume.status==2? "退费" : "--"}</span>
						</div>
						<div class="right">
							<span class="title"><i class="iconfont icon-laiyuan2" ></i>来源：</span>
							<span>${consume.paysource==1 ? "充电" : consume.paysource==2 ? "脉冲" : consume.paysource==3 ? "离线充值" : consume.paysource==4 ? "充值钱包" : consume.paysource==5 ? "在线卡充值" : "— —"}</span>
						</div>
						<div class="right">
							<span class="title"><i class="iconfont icon-shijian" style="font-size: 17px;"></i>支付时间：</span>
							<span><fmt:formatDate value="${consume.create_time}" pattern="yyyy-MM-dd HH:mm:ss" /></span>
						</div>
					</li>
				</c:forEach>
			  </c:otherwise>
			</c:choose>
			</div>
		</ul>
	</div>
	<script>
	 $(function(){
		 	var offset= $('#offsetInp').val().trim() //偏移量
	  		var isBottom= false //是否到了底部
	  		var uid= $('#uidInp').val().trim()
	  		var beginTime=  $('#beginTimeInp').val().trim()
	  		var endTime=  $('#endTimeInp').val().trim()
	  		
		  	var dtPicker = new mui.DtPicker({
		  		type: "date",
		  		endDate: new Date()

		  	}); 
		  	$('.lastDiv').click(function(){ //点击选择日期
				  dtPicker.show(function (selectItems) { 
			        console.log(selectItems.y);//{text: "2016",value: 2016} 
			        console.log(selectItems.m);//{text: "05",value: "05"} 
			        console.log(selectItems.d)
			        var str= selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value
			      	$('#timeText').text(str)
			    })
			})
			$('#search').click(function(){ //点击搜索
				if($('#timeText').text() == '按日期搜索'){
					mui.toast('请选择搜索日期',{ duration:'long', type:'div' })
					return false
				}
				beginTime= $('#timeText').text()
				endTime= $('#timeText').text()
				offset= 0
				sendAjax(beginTime,endTime,offset)
			})
			
			$('.userDetail ul').scroll(function(e){
				var ulHeight= $(this).height()
				var divHeight=$('.ul-scroll-div').height()
				var rate= ($(this).scrollTop() / (divHeight- ulHeight))*10
				console.log('ul',ulHeight)
				console.log('div',divHeight)
				console.log($(this).scrollTop())
				//console.log(rate)
				if(rate = 10 && !isBottom){
					
					sendAjax(beginTime,endTime,offset)
				}
			})
			
			function sendAjax(beginTime,endTime,offset){
		  		$.ajax({
					url: '/general/touristconsumeinfo',
					data: {
						beginTime: beginTime,
						endTime: endTime,
						uid: uid,
						offset: offset
					},
					type: 'POST',
					dataType: 'json',
					success: function(e){
						console.log(1)
						if(!offset){ //当offset为0的时候，也就是第一次搜索的时候，清空页面的内容，然后再进行拼接
							$('.ul-scroll-div').html('')	
						}
						//在这里进行字符串拼接，并添加到页面中
						
						
						offset= e.offset
						beginTime= e.beginTime
						endTime= e.endTime
						if(offset >= 10){
							//idBottom= false	 //这里写的目的是为了判断后面是否还有数据，有数据就继续ajax
						}
						// 在这里请求到数据之后渲染之后将idBottom赋值为false
					}
				})
		  	}
		  
	  })
	</script>
</body>
</html>