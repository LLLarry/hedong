<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>自助充电平台</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="icon" href="${pageContext.request.contextPath}/images/hd.ico" type="image/x-icon" />
<!--标准mui.css-->
<link rel="stylesheet" href="${hdpath }/mui/css/mui.min.css">
<link rel="stylesheet" type="text/css" href="${hdpath }/mui/css/icons-extra.css" />
<!--App自定义的css-->
<link rel="stylesheet" type="text/css" href="${hdpath }/mui/css/app.css" />
<script type="text/javascript" src="${hdpath}/js/jquery.js"></script>
<script type="text/javascript" src="${hdpath}/mui/js/mui.js"></script> 

<style type="text/css">
html,body{background-color: #fff;}
.logo{ background-color: #44BB49;  padding: 30px; height: 18%;}
.sendcode{ margin-top: -11.3%; float: right; margin-right: 6%; color: #fff;}
#titlediv{display: inline;position: relative; top: -90px;margin-left: 35.3%;}
#mobile{height: 53px}
#captcha{height: 53px}
</style>
<script type="text/javascript">
function CaptchaSend() {
	var mobile = $("#mobile").val();
	var bool = isPhoneTel(mobile);//判断电话是否合法
	if (!bool) {
		return false;
	}
	$.ajax({
		type : 'POST',
		url : "${hdpath}/merchant/captcha",//获取验证码
		data : {captcha : 1,mobile : mobile,},
		success : function(e) {
			if(e==1){
				mui.toast('该手机号已存在');
			}else {
				$("#captchaNum").val(e);
				$("input[name='time']").val(new Date().getTime());
				$("#captchabur").attr("disabled", true);
				timedCount();
			}
		},
		error : function() {
			mui.toast('验证发送失败');
		}
	});
}
var c = 120;
function timedCount() {
	var con = $("#captchabur").text("倒计时 "+c);
	c = c - 1
	if (c == 0) {
		$("#captchabur").text("获取验证码");
		c = 120;
		return false;
	} else {
		setTimeout("timedCount()", 1000)
	}
}
function isPhoneTel(n) {
	var reg = /^1[3|4|5|7|8|9]\d{9}$/;
	if (!reg.test(n)) {
		mui.toast("手机号不合法!") 
		return false;
	}
	return true;
}
</script>
</head>
<body>
<div class="body">
	<div class="logo" style="vertical-align: middle;">
		<img alt="自助充电平台" src="${hdpath}/images/htlogo.png" style="width: 30%;height: 30%">
	</div>
	<div style="display: inline;" id="titlediv"><font size="6.5px" color="white">自助充电平台</font></div>
	<br><br>
    <div class="content">
		<input type="hidden" id="paramstate" value="${paramstate}">
		<input type="hidden" id="existuser" value="${existuser}">
		
		<div class="formdiv">
	    <form id="formht" class="mui-input-group inputgroup">
			<input type="hidden" name="statuere" value="1"> 
			<input type="hidden" name="time" id="time" value=""> 
			<input type="hidden" name="captchaNum" id="captchaNum" value="">
	    <div class="mui-input-row inputrow" style="height: 50px">
	        <label class="muiabel" style="padding: 18px 15px 18px 15px;">手机号：</label>
	        <input id="mobile" name="mobile"  type="text" class="mui-input-clear" placeholder="请输入手机号">
	    </div>
	    <div class="mui-input-row inputrow" style="height: 50px">
	        <label class="muiabel" style="padding: 18px 15px 18px 15px;">验证码：</label>
	        <input id="captcha" name="captcha" type="text" class="mui-input-clear verification" placeholder="请输入验证码">
	    </div>
	    <div class="mui-button-row inputrow">
			<button id="captchabur" name="captchabur" type="button" class="mui-btn mui-btn-success sendcode"  onClick="CaptchaSend();">发送验证码</button>
		</div>
	    <div class="mui-button-row inputrow" style="padding-top: 30px">
			<button style="margin-top: -10%;" type="button" class="mui-btn mui-btn-success mui-btn-block btnaniu"  id="submitbtn">登录</button>
		</div>
	    </form>
		</div>
	</div>
</div>
</body>
<script>
	$(function(){
	    window.addEventListener("popstate", function(e) {
    		var existuser = $("#existuser").val();
	    	if (existuser == 1) {
	    		WeixinJSBridge.call('closeWindow');
	    	} else {
	    		WeixinJSBridge.call('closeWindow');
	    	}
		}, false);
	});
	$(function() {
		$("#submitbtn").click(function() {
			var url = "";
			var paramstate = $("#paramstate").html().trim();
			if (paramstate == 0) {
				url = "${hdpath}/merchant/index";
			} else if (paramstate == 1) {
				url = "${hdpath}/merchant/manage";
			}
			var mobileval = $("#mobile").val();
			var captchaval = $("#captcha").val();
			if (mobileval == "") {
				mui.toast("请输入手机号!");
				return false;
			} else if (captchaval == "") {
				mui.toast("请输入验证码!");
				return false;
			}
			$.ajax({
				type : "POST",
				url : "${hdpath}/merchant/register",
				data : $('#formht').serialize(),
				success : function(e) {
					if (e == 1) {
						mui.toast("该手机号已存在");
					}else if (e == 2) {
						mui.toast("验证码不正确");
					} else if (e == 3) {
						mui.toast("验证码超时！请重新获取");
					} else if (e == 4) {
						mui.toast("请刷新重新登录");
					}  else {
						window.location.href = url;
					}
				},
				error : function() {
					mui.toast("异常！");
				}
			});
		})
	})
</script>
</html>
