/**
 * Created by DELL on 2019/5/11.
 */

$(function(){
    window.addEventListener("popstate", function(e) {
        var existuser = $("#existuser").val();
        if (existuser == 1) {
            WeixinJSBridge.call('closeWindow');
        } else {
            WeixinJSBridge.call('closeWindow');
        }
    }, false);

    $('.mui-icon-clear').click(function(e){
        e =e || window.event
        e.stopPropagation()
    })
});

var timer= null
$('#register_btn').click(function(e){ //点击登录按钮
    e= e || window.event
    e.preventDefault()
    handleLogin()
})

$('b.reNum').on('touchstart',function(e){ //点击发送验证码
    e= e || window.event
    var mobileVal= $('#mobile').val().trim()
    if(!checkPhone()){
        return false
    }
    //按钮倒计时
    sendDownTime()
    $.ajax({
        type : 'POST',
        url : "${hdpath}/merchant/captcha",//获取验证码
        data : {captcha : 1,mobile : mobileVal},
        success : function(e) {
            if(e==1){
                showToast('该手机号已存在');
            }else {
                $("#captchaNum").val(e);
                $("input[name='time']").val(new Date().getTime());
                //$("#captchabur").attr("disabled", true);
                //timedCount();
            }
        },
        error : function() {
            reShow() //显示获取验证码
            showToast('验证发送失败');
        }
    });
})


function handleLogin(){ //处理登录
    var captchaVal= $('#captcha').val().trim()
    if(!checkPhone()){
       return false
    }
    if(captchaVal.length <= 0){
        showToast('请输入验证码')
        return false
    }
    if(!testReg(/^\d{6}$/,captchaVal)){
        showToast('验证码不正确')
        return false
    }

    var url = "";
    var paramstate = $("#paramstate").html().trim();
    if (paramstate == 0) {
        url = "${hdpath}/merchant/index";
    } else if (paramstate == 1) {
        url = "${hdpath}/merchant/manage";
    }

    $.ajax({
        type : "POST",
        url : "${hdpath}/merchant/register",
        data : $('#formht').serialize(),
        success : function(e) {
            if (e == 1) {
                showToast("该手机号已存在");
            }else if (e == 2) {
                showToast("验证码不正确");
            } else if (e == 3) {
                showToast("验证码超时！请重新获取");
            } else if (e == 4) {
                showToast("请刷新重新登录");
            }  else {
                window.location.href = url;
            }
        },
        error : function() {
            reShow()
            showToast("异常！");
        }
    });
}

function showToast(content,time){ //调用Toast提示框
    content= content || ''
    time= time || '1500'
    mui.toast(content,{ duration:time, type:'div' })
}

function testReg(reg,str){  //正则判断
    return reg.test(str)
}

function checkPhone(){  //检查手机号
    var mobileVal= $('#mobile').val().trim()
    if(mobileVal.length <= 0){
        //调用mui
        showToast('请输入手机号')
        return false
    }
    if(!testReg(/^1[3|5|7|8|9]\d{9}$/,mobileVal)){
        showToast('请正确输入手机号')
        return false
    }
    return true
}

function sendDownTime(){
    clearInterval(timer)
    $('b.reNum').fadeOut('300')
    $('b.bTime').fadeIn('300')
    var str= ''
    var num= 120
    timer= setInterval(function () {
        num--
        str= '倒计时'+ num +'s'
        $('b.bTime').html(str)
        if(num === 0){
            clearInterval(timer)
            $('b.bTime').fadeOut('300')
            $('b.reNum').fadeIn('300')
        }
    },1000)
}

function reShow(){ //重新显示获取验证码
    clearInterval(timer)
    $('b.bTime').fadeOut('300')
    $('b.reNum').fadeIn('300') 
}

