
//这里是tem 模板也得js逻辑处理

$(function () {
   function tem1(){
	   var targetEle= null
	    $('#isRefInp').click(function(){
//	    	var common2= parseInt($(targetEle).parent().parent().parent().parent().find('.common2').val().trim())
	    	var common2= parseInt($(targetEle).parent().parent().find('p').eq(3).find('span').eq(1).attr('data-val'))
	    	$('#popover input').removeAttr('checked')
	    	if(common2 === 2){
	    		$('#refReg2').prop('checked',true)
	    	}else if(common2 === 3){
	    		$('#refReg3').prop('checked',true)
	    	}else {
	    		$('#refReg1').prop('checked',true)
	    	}

	        $('#popover').fadeIn()
	     })
	     $('#exitBut').click(function(){
	         $('#popover').fadeOut()
	     })
	      $('#confirmBut').click(function(){
	    	  var regReg= parseInt($('.tem1 input[name="refReg"]:checked').val()) //退费标准
	          var str= ''
	          switch(regReg){
	                 case 1: str= '(默认)'; break;
	                 case 2: str= '(时间)'; break;
	                 case 3: str= '(电量)'; break;
	             }
	              $('#spanList').text(str)
	         $('#popover').fadeOut()
	     })
    $('.tem1 .tem').click(function (e) {
        e =e || window.event
        var target= e.target || e.srcElement
        targetEle= target
        if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-edit')){ //点击编辑子模板
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj格式的，并将数据穿进去
            var name= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var parse= $(target).parent().parent().find('p').eq(1).find('span')[0].childNodes[0].textContent.trim()
            var time= $(target).parent().parent().find('p').eq(2).find('span')[0].childNodes[0].textContent.trim()
            var power= $(target).parent().parent().find('p').eq(3).find('span')[0].childNodes[0].textContent.trim()
            var obj= {  //这里是从后台获取的数据或者从元素上获取的（这里模拟后台数据）
                title: '修改电子模板',
                name: name,
                parse: parse,
                time: time,
                power: power,
            }
            renderList(obj)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-delete')){
        	   var isSelectTem= $(target).parent().parent().parent().parent().parent().hasClass('borShadow')
               if(isSelectTem){
                 mui.toast('被选择的子模板不能删除',{ duration:'1500', type:'div' })
                 return false
               }
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除子模板
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    var id= parseInt($(targetEle).attr('data-id'))
                    $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletesubclasscharge",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        },//返回数据填充
                    });
        
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addBut')){ //添加子模板
            var $list= $(target).parent().prev()
            if($list.length <= 0){ //没有子节点
                //这里是默认设置
                var nextParse= 1
                var nextTime= 60
                var nextPower= 1
                var rate1= Math.round(time / parse)  //得到的比例是1元充电多久
                var rate2= Math.round(time / power)  //得到的比例是消耗1度电充电多久
                var houer= (nextTime / 60) % 1 === 0 ? (nextTime / 60) : (nextTime / 60).toFixed(2)
                var nextName= nextParse+'元'+houer+'小时'

            }else { //找到上一个子节点
                var reg= /(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}/g
                var parse= $list.find('p').eq(1).find('span').text().match(reg)[0]-0
                var time= $list.find('p').eq(2).find('span').text().match(reg)[0]-0
                var power= $list.find('p').eq(3).find('span').text().match(reg)[0]-0
                var rate1= Math.round(time / parse)  //得到的比例是1元充电多久
                var rate2= Math.round(time / power)  //得到的比例是消耗1度电充电多久
                var nextParse= parse+1
                var nextTime= (nextParse * rate1) % 1 === 0 ? (nextParse * rate1) : (nextParse * rate1).toFixed(2)
                var nextPower= (nextTime / rate2) % 1 === 0 ? (nextTime / rate2) : (nextTime / rate2).toFixed(2)
                var houer= (nextTime / 60) % 1 === 0 ? (nextTime / 60) : (nextTime / 60).toFixed(2)
                var nextName= nextParse+'元'+houer+'小时'
            }
            var id= parseInt($(targetEle).attr('data-id'))
          
            $.ajax({  //添加子模板
                data:{
                    id: id,
                    name: nextName,
                    money: nextParse, 
                    chargeTime: nextTime, 
                    chargeQuantity: nextPower
                },
                url : "./addsubclasscharge",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });


            //发送ajax将新增子模板的数据传输到服务器=====================
            var str= '<p>显示名称：<span>'+nextName+'</span></p><p>充电价格：<span>'+nextParse+' <b>元</b></span></p><p>充电时间：<span>'+nextTime+' <b>分钟</b></span></p> <p>消耗电量：<span>'+nextPower+'<b>度</b></span></p> <div> <button type="button" class="mui-btn mui-btn-success tem-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-delete">删除</button> </div>'
            var list= $('<li class="mui-table-view-cell"></li>')
            list.html(str)
            $(targetEle).parent().parent()[0].insertBefore(list[0],$(targetEle).parent()[0])

        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-edit')){ //点击模板编辑按钮
            //$('.tem-mask2').fadeIn()
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj2格式的，并将数据穿进去

            var temNmae= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var brandName= $(target).parent().parent().find('p').eq(1).find('span').html().trim()
            var telephone= $(target).parent().parent().find('p').eq(2).find('span').html().trim()
            var isRef= $(target).parent().parent().find('p').eq(3).find('span').html().trim() === '是' ? true : false
            var isWalletPay= $(target).parent().parent().find('p').eq(4).find('span').html().trim() === '是' ? true : false
            var regVal= ''
            if(isRef){
                regVal=  parseInt($(target).parent().parent().find('p').eq(3).find('span').eq(1).attr('data-val'))
             }
            
            var obj2= {
                title: '修改充电模板',
                temNmae: temNmae,
                brandName: brandName,
                telephone: telephone,
                isRef: isRef,
                isWalletPay: isWalletPay,
                regVal: regVal
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addTemplate')){ 
            var obj2= {
                title: '新增充电模板',
                temNmae: '',
                brandName: '',
                telephone: '',
                isRef: true,
                isWalletPay: false,
                regVal: 1 //默认是1 ======================
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-delete')){
        	 var isSelectTem= $(target).parent().parent().parent().parent().hasClass('borShadow')
             if(isSelectTem){
               mui.toast('被选择的模板不能删除',{ duration:'1500', type:'div' })
               return false
             }
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    var id= parseInt($(targetEle).attr('data-id'))
                    $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletestaircharge",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        },//返回数据填充
                    });

                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('selectTem')){
            // 点击选择模板
            var parent= $(target).parent().parent().parent().parent().parent()
            if(!parent.hasClass('borShadow')){
                // 发送ajax，成功之后执行下面的 ()
                // 数据来源
                var arecode= $('body').attr('data-arecode').trim()
                var source= $('body').attr('data-source').trim()
                var id= $(target).attr('data-id').trim() //模板id
                  $.ajax({
                         data:{
                             source: source,
                             obj:arecode,
                        	 temid: id
                         },
                         url : "./templatechoice",
                         type : "POST",
                         cache : false,
                         success : function(e){
                            if(e == 1){
                                parent.siblings().removeClass('borShadow') //移除所有的兄弟节点的选择
                                parent.siblings().find('.bottom p').fadeOut()
                                parent.siblings().find('.selectTem').removeClass('active')
                                parent.addClass('borShadow')  //给当前元素添加节点
                                $(target).parent().parent().find('p').fadeIn()
                                $(target).addClass('active')
                                 //mui.toast('已选择当前模板',{ duration:'1500', type:'div' })
                            }
                         },//返回数据填充
                         error: function(){
                             mui.toast('选择模板失败，请稍后再试！',{ duration:'1500', type:'div' })
                         }
                     });

               
             }else{
                mui.toast('你已选择当前模板',{ duration:'1500', type:'div' })
             }
            
        } 
    })

    $('.tem1 .list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem1 .tem-mask1').click(close)
    $('.tem1 .list-center1 .close').click(close)
    $('.tem1 .list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.tem1 .tem-mask1').fadeOut()
    }

    $('.tem1 .list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem1 .tem-mask2').click(close2)
    $('.tem1 .list-center2 .close').click(close2)
    $('.tem1 .list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.tem1 .tem-mask2').fadeOut()
    }

    $('.tem1 .list-center1 .submit').click(function (e) { //点击修改电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.tem1 .list-center1 input[name=name]').val().trim()
        var parseVal= $('.tem1 .list-center1 input[name=parse]').val().trim()
        var timeVal= $('.tem1 .list-center1 input[name=time]').val().trim()
        var powerVal= $('.tem1 .list-center1 input[name=power]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        if(parseVal.length <= 0){
            mui.toast('请输入充电价格',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(parseVal)) {
            mui.toast('充电价格请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(timeVal.length <= 0){
            mui.toast('请输入充电时间',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(timeVal)) {
            mui.toast('充电时间请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(powerVal.length <= 0){
            mui.toast('请输入消耗电量',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(powerVal)) {
            mui.toast('消耗电量请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        //修改子模板
            //发送ajax讲修改之后的数据传输到服务器=====================

            var id= parseInt($(targetEle).attr('data-id'))
            $.ajax({
                data:{
                    id: id,
                    name:nameVal,
                    money: parseVal,
                    chargeTime: timeVal,
                    chargeQuantity: powerVal
                },
                url : "./updatesubclasscharge",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });

            
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(parseVal+'<b>元</b>')
            parentEle.find('p').eq(2).find('span').html(timeVal+'<b>分钟</b>')
            parentEle.find('p').eq(3).find('span').html(powerVal+'<b>度</b>')
        $('.tem1 .tem-mask1').fadeOut()
    })

    $('.tem1 .list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.tem1 .list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.tem1 .list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.tem1 .list-center2 input[name=telephone]').val().trim()
        var isRefVal= $('.tem1 .list-center2 input[name="isRef"]:checked').val()
        var isWalletPayVal= $('.tem1 .list-center2 input[name="isWalletPay"]:checked').val()
        
        var refReg= $('.tem1 input[name="refReg"]:checked').val() //退费标准
        
//        var str1= ''
//            switch(parseInt(refReg)){
//                case 1: str1= '(默认)'; break;
//                case 2: str1= '(时间)'; break;
//                case 3: str1= '(电量)'; break;
//            }
        var str1= ''
            switch(parseInt(refReg)){
                case 1: str1= '(退费标准：时间和电量最小)'; break;
                case 2: str1= '(退费标准：根据时间)'; break;
                case 3: str1= '(退费标准：根据电量)'; break;
            }
       
        var permit= parseInt(isRefVal) === 0 ? 2 :  parseInt(isRefVal)
        var walletpay = parseInt(isWalletPayVal) === 0 ? 2 :  parseInt(isWalletPayVal)
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        
        
        /*if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }*/
        var flag= $('.list-center2 h3').html().trim() === '修改充电模板' ? true : false
        if(flag){ // 修改充电模板
            //发送ajax将修改的数据传输到服务器=====================
            // 获取id
            var id= parseInt($(targetEle).attr('data-id'))
            $.ajax({
                data:{
                    id: id,
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    permit: permit,
                    walletpay: walletpay,
                    common1: telephoneVal,
                    common2	: refReg
                },
                url : "./updatestaircharge",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });


            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
            var isRefHtml= parseInt(isRefVal) ? '是' : '否'
            parentEle.find('p').eq(3).find('span').eq(0).html(isRefHtml)
            
            parentEle.find('p').eq(3).find('span').eq(1).text(str1)
            parentEle.find('p').eq(3).find('span').eq(1).attr('data-val',refReg)
            console.log(isRefVal)
            if(!parseInt(isRefVal)){
               parentEle.find('p').eq(3).find('span').eq(1).fadeOut()
            }else{
                parentEle.find('p').eq(3).find('span').eq(1).fadeIn()
            }
            
            parentEle.find('p').eq(3).find('span').eq(0).removeClass('span-green span-red')
            if(parseInt(isRefVal)){
                parentEle.find('p').eq(3).find('span').eq(0).addClass('span-green')
            }else {
                parentEle.find('p').eq(3).find('span').eq(0).addClass('span-red')
            }

            var isWalletPayHtml= parseInt(isWalletPayVal) ? '是' : '否'
            parentEle.find('p').eq(4).find('span').html(isWalletPayHtml)
            parentEle.find('p').eq(4).find('span').removeClass('span-green span-red')
            if(parseInt(isWalletPayVal)){
                parentEle.find('p').eq(4).find('span').addClass('span-green')
            }else {
                parentEle.find('p').eq(4).find('span').addClass('span-red')
            }
        }else { //添加新模板
            //发送ajax将新增的数据传输到服务器=====================

            
            $.ajax({
                data:{
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    permit: permit,
                    walletpay: walletpay,
                    common1: telephoneVal,
                    common2	: refReg
                },
                url : "./addstaircharge",
                type : "POST",
                cache : false,
                success : function(e){
                	if(e==1){
                  	  window.location.href= window.location.href
                     }
                },//返回数据填充
            });

            
            var isRefHtml= parseInt(isRefVal) ? '是' : '否'
            var isWalletPayHtml= parseInt(isWalletPayVal) ? '是' : '否'
            var isRefClass= parseInt(isRefVal) ? 'span-green' : 'span-red'
            var isWalletPayClass= parseInt(isWalletPayVal) ? 'span-green' : 'span-red'
            	if(!parseInt(isRefVal)){ //当为否定是
                    var str= `
                   <li>
                   <div class="title">
                   <p>模板名称：<span>${temNmaeVal}</span></p>
               <p>品牌名称：<span>${temNmaeVal}</span></p>
               <p>售后电话：<span>${brandNameseVal}</span></p>
               <p>是否支持退费：<span class="${isRefClass}">${isRefHtml}</span><span></span></p>
               <p>是否钱包强制支付：<span class="${isWalletPayClass}">${isWalletPayHtml}</p>
               <div>
               <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button>
                   <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button>
                   </div>
                   </div>
                   <ul class="mui-table-view">
                   <li class="mui-table-view-cell bottom">
                   <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button>
                   </li>
                   </ul>
                   </li>
                   `
               }else{
                    var str= `
                   <li>
                   <div class="title">
                   <p>模板名称：<span>${temNmaeVal}</span></p>
               <p>品牌名称：<span>${temNmaeVal}</span></p>
               <p>售后电话：<span>${brandNameseVal}</span></p>
               <p>是否支持退费：<span class="${isRefClass}">${isRefHtml}</span><span data-val= ${refReg} >${str1}</span></p>
               <p>是否钱包强制支付：<span class="${isWalletPayClass}">${isWalletPayHtml}</p>
               <div>
               <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button>
                   <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button>
                   </div>
                   </div>
                   <ul class="mui-table-view">
                   <li class="mui-table-view-cell bottom">
                   <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button>
                   </li>
                   </ul>
                   </li>
                   `
               }
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.tem1 .tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.tem1 .tem-mask2').fadeOut()
//        window.location.href= window.location.href
    })


    function renderList(obj){ //渲染list-content
        $('.tem1 .list-center1 h3').html(obj.title)
        $('.tem1 .list-center1 input[name=name]').val(obj.name)
        $('.tem1 .list-center1 input[name=parse]').val(obj.parse)
        $('.tem1 .list-center1 input[name=time]').val(obj.time)
        $('.tem1 .list-center1 input[name=power]').val(obj.power)
        $('.tem1 .tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.tem1 .list-center2 h3').html(obj.title)
        $('.tem1 .list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.tem1 .list-center2 input[name=brandName]').val(obj.brandName)
        $('.tem1 .list-center2 input[name=telephone]').val(obj.telephone)
        if(obj.isRef){
            $('.tem1 .list-center2 input[name=isRef]').eq(0).prop('checked',true)
            console.log( $('.tem1 input[name=refReg]').eq(0))
            var str= ''
                switch(obj.regVal){
                    case 1: str= '(默认)'; break;
                    case 2: str= '(时间)'; break;
                    case 3: str= '(电量)'; break;
                }
                $('#spanList').text(str)
        }else{
        	 $('#spanList').text('')
            $('.tem1 .list-center2 input[name=isRef]').eq(1).prop('checked',true)
        }
        if(obj.isWalletPay){
            $('.tem1 .list-center2 input[name=isWalletPay]').eq(0).prop('checked',true)
        }else{
            $('.tem1 .list-center2 input[name=isWalletPay]').eq(1).prop('checked',true)
        }
        $('.tem1 .tem-mask2').fadeIn()
    }
   }
   tem1()

// =======
    function tem2 (){
         var targetEle= null
    $('.tem2 .tem').click(function (e) {
        e =e || window.event
        var target= e.target || e.srcElement
        targetEle= target
      
        if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-edit')){ //点击编辑
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj格式的，并将数据穿进去
            var name= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var parse= $(target).parent().parent().find('p').eq(1).find('span')[0].childNodes[0].textContent.trim()
            var totalParse= $(target).parent().parent().find('p').eq(2).find('span')[0].childNodes[0].textContent.trim()
            var obj= {  //这里是从后台获取的数据或者从元素上获取的（这里模拟后台数据）
                title: '修改离线子模板',
                name: name,
                parse: parse,
                totalParse: totalParse
           }
            renderList(obj)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-delete')){
        	   var isSelectTem= $(target).parent().parent().parent().parent().parent().hasClass('borShadow')
               if(isSelectTem){
                 mui.toast('被选择的子模板不能删除',{ duration:'1500', type:'div' })
                 return false
               }
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletesubclassoffline",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addBut')){
            var $list= $(target).parent().prev()
            if($list.length <= 0){ //没有子节点
                //这里是默认设置
                var nextParse= 30
                var nextTotalParse= 31
                var nextSendParse= nextTotalParse- nextParse
                var nextName= nextParse+'元送'+nextSendParse

            }else { //找到上一个子节点
                var reg= /(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}/g
                var parse= $list.find('p').eq(1).find('span').text().match(reg)[0]-0
                var TotalParse= $list.find('p').eq(2).find('span').text().match(reg)[0]-0
                console.log(TotalParse, parse)
                var nextParse= parse * 2
                var nextSendParse= (TotalParse- parse) * 2
                var nextTotalParse= nextParse+ nextSendParse
                var nextName= nextParse+'元送'+nextSendParse
            }
            //发送ajax将新增的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name: nextName,
                    money: nextParse,
                    remark: nextTotalParse
                },
                url : "./addsubclassoffline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var str= '<p>显示名称：<span>'+ nextName +'</span></p> <p>付款金额：<span>'+nextParse+'<b>元</b></span></p> <p>充卡金额：<span>'+nextTotalParse+'<b>元</b></span></p> <div> <button type="button" class="mui-btn mui-btn-success tem-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-delete">删除</button> </div>'
            var list= $('<li class="mui-table-view-cell"></li>')
            list.html(str)
            $(targetEle).parent().parent()[0].insertBefore(list[0],$(targetEle).parent()[0])
           
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-edit')){ //点击模板编辑按钮
            //$('.tem-mask2').fadeIn()
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj2格式的，并将数据穿进去

            var temNmae= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var brandName= $(target).parent().parent().find('p').eq(1).find('span').html().trim()
            var telephone= $(target).parent().parent().find('p').eq(2).find('span').html().trim()


            var obj2= {
                title: '修改离线模板',
                temNmae: temNmae,
                brandName: brandName,
                telephone: telephone
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addTemplate')){
            var obj2= {
                title: '新增离线模板',
                temNmae: '',
                brandName: '',
                telephone: ''
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-delete')){
        	 var isSelectTem= $(target).parent().parent().parent().parent().hasClass('borShadow')
             if(isSelectTem){
               mui.toast('被选择的模板不能删除',{ duration:'1500', type:'div' })
               return false
             }
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletestairoffline",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                    
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('selectTem')){
            // 点击选择模板
        	console.log(11)
            var parent= $(target).parent().parent().parent().parent().parent()
            if(!parent.hasClass('borShadow')){
                // 发送ajax，成功之后执行下面的 ()
                // 数据来源
                var arecode= $('body').attr('data-arecode').trim()
                var source= $('body').attr('data-source').trim()
                var id= $(target).attr('data-id').trim() //模板id
                  $.ajax({
                         data:{
                             source: source,
                             obj:arecode,
                        	 temid: id
                         },
                         url : "./templatechoice",
                         type : "POST",
                         cache : false,
                         success : function(e){
                            if(e == 1){
                                parent.siblings().removeClass('borShadow') //移除所有的兄弟节点的选择
                                parent.siblings().find('.bottom p').fadeOut()
                                parent.siblings().find('.selectTem').removeClass('active')
                                parent.addClass('borShadow')  //给当前元素添加节点
                                $(target).parent().parent().find('p').fadeIn()
                                $(target).addClass('active')
                                 //mui.toast('已选择当前模板',{ duration:'1500', type:'div' })
                            }
                         },//返回数据填充
                         error: function(){
                             mui.toast('选择模板失败，请稍后再试！',{ duration:'1500', type:'div' })
                         }
                     });

               
             }else{
                mui.toast('你已选择当前模板',{ duration:'1500', type:'div' })
             }
            
        } 
    })

    $('.tem2 .list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem2 .tem-mask1').click(close)
    $('.tem2 .list-center1 .close').click(close)
    $('.tem2 .list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.tem2 .tem-mask1').fadeOut()
    }

    $('.tem2 .list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem2 .tem-mask2').click(close2)
    $('.tem2 .list-center2 .close').click(close2)
    $('.tem2 .list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.tem2 .tem-mask2').fadeOut()
    }

    $('.tem2 .list-center1 .submit').click(function (e) { //点击修改电子模板提交/添加的电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.tem2 .list-center1 input[name=name]').val().trim()
        var parseVal= $('.tem2 .list-center1 input[name=parse]').val().trim()
        var totalParseVal= $('.tem2 .list-center1 input[name=totalParse]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入显示名称',{ duration:'1500', type:'div' })
            return false
        }
        if(parseVal.length <= 0){
            mui.toast('请输入付款金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(parseVal)){
            mui.toast('付款金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(totalParseVal.length <= 0){
            mui.toast('请输入充卡金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(totalParseVal)){
            mui.toast('充卡金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        var flag= $('.tem2 .list-center1 h3').html().trim() === '新增离线子模板' ? true : false
        //修改离线子模板
            //发送ajax讲修改之后的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:nameVal,
                    money: parseVal,
                    remark: totalParseVal
                },
                url : "./updatesubclassoffline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(parseVal+'<b>元</b>')
            parentEle.find('p').eq(2).find('span').html(totalParseVal+'<b>元</b>')
        $('.tem2 .tem-mask1').fadeOut()
    })

    $('.tem2 .list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.tem2 .list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.tem2 .list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.tem2 .list-center2 input[name=telephone]').val().trim()
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        /*if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }*/
        var flag= $('.tem2 .list-center2 h3').html().trim() === '修改离线模板' ? true : false
        if(flag){ // 修改离线模板
            //发送ajax将修改的数据传输到服务器=====================
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./updatestairoffline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
        }else { //添加新模板
            //发送ajax将新增的数据传输到服务器=====================
            
             $.ajax({
                data:{
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./addstairoffline",
                type : "POST",
                cache : false,
                success : function(e){
                	if(e==1){
                  	  window.location.href= window.location.href
                     }
                },//返回数据填充
            });
            
            var str='<li><div class="title"><p>模板名称：<span>'+temNmaeVal+'</span></p><p>品牌名称：<span>'+brandNameseVal+'</span></p><p>售后电话：<span>'+ telephoneVal +'</span></p><div> <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button> </div> </div> <ul class="mui-table-view"> <li class="mui-table-view-cell bottom"> <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button> </li> </ul> </li> '
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.tem2 .tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.tem2 .tem-mask2').fadeOut()
    })


    function renderList(obj){ //渲染list-content
        $('.tem2 .list-center1 h3').html(obj.title)
        $('.tem2 .list-center1 input[name=name]').val(obj.name)
        $('.tem2 .list-center1 input[name=parse]').val(obj.parse)
        $('.tem2 .list-center1 input[name=totalParse]').val(obj.totalParse)
        $('.tem2 .tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.tem2 .list-center2 h3').html(obj.title)
        $('.tem2 .list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.tem2 .list-center2 input[name=brandName]').val(obj.brandName)
        $('.tem2 .list-center2 input[name=telephone]').val(obj.telephone)
        $('.tem2 .tem-mask2').fadeIn()
    }
}
tem2()

// ================模板三

function tem3(){
     var targetEle= null
    $('.tem3 .tem').click(function (e) {
        e =e || window.event
        var target= e.target || e.srcElement
        targetEle= target
        if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-edit')){ //点击编辑
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj格式的，并将数据穿进去
                
                var name= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
                var coinNum= $(target).parent().parent().find('p').eq(1).find('span')[0].childNodes[0].textContent.trim()
                var totalParse= $(target).parent().parent().find('p').eq(2).find('span')[0].childNodes[0].textContent.trim()
            var obj= {  //这里是从后台获取的数据或者从元素上获取的（这里模拟后台数据）
                title: '修改投币子模板',
                name,
                coinNum,
                totalParse
            }
            renderList(obj)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-delete')){
        	   var isSelectTem= $(target).parent().parent().parent().parent().parent().hasClass('borShadow')
               if(isSelectTem){
                 mui.toast('被选择的子模板不能删除',{ duration:'1500', type:'div' })
                 return false
               }
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                    $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletesubclassincoins",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        },//返回数据填充
                    });
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addBut')){
            var $list= $(target).parent().prev()
            if($list.length <= 0){ //没有子节点
                //这里是默认设置
                var nextCoinNum= 1
                var nextTotalParse= 1
                var rate=  nextCoinNum / nextTotalParse  //得到的是一元几个币
      
                var nextName= nextCoinNum+'元'+nextTotalParse+'个币'

            }else { //找到上一个子节点
                var reg= /(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}/g
                var coinNum= $list.find('p').eq(1).find('span').text().match(reg)[0]-0
                var totalParse= $list.find('p').eq(2).find('span').text().match(reg)[0]-0
                var rate=   totalParse/coinNum  //得到的是一个币几元
                console.log(coinNum,totalParse,rate)
                var nextCoinNum= coinNum+1
                var nextTotalParse=  nextCoinNum * rate
                
                var nextName= nextTotalParse+'元'+nextCoinNum+'个币'
            }
            console.log(nextCoinNum,nextTotalParse,nextName)
             //发送ajax将新增的数据传输到服务器=====================
             
            var id= parseInt($(targetEle).attr('data-id'))
            $.ajax({
                data:{
                    id: id,
                    name:nextName,
                    money: nextCoinNum,
                    remark: nextTotalParse,
                },
                url : "./addsubclassincoins",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });
             
            var str= '<p>显示名称：<span>'+ nextName +'</span></p><p>投币个数：<span>'+ nextCoinNum +'<b>个</b></span></p> <p>付款金额：<span>'+ nextTotalParse +'<b>元</b></span></p> <div> <button type="button" class="mui-btn mui-btn-success tem-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-delete">删除</button> </div>'
            var list= $('<li class="mui-table-view-cell"></li>')
            list.html(str)
            $(targetEle).parent().parent()[0].insertBefore(list[0],$(targetEle).parent()[0])
           
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-edit')){ //点击模板编辑按钮
            //$('.tem-mask2').fadeIn()
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj2格式的，并将数据穿进去
            var temNmae= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var brandName= $(target).parent().parent().find('p').eq(1).find('span').html().trim()
            var telephone= $(target).parent().parent().find('p').eq(2).find('span').html().trim()
            var isRef= 1;
            var isWalletPay= 2;
            /*
            var isRef= $(target).parent().parent().find('p').eq(3).find('span').html().trim() === '是' ? true : false
            var isWalletPay= $(target).parent().parent().find('p').eq(4).find('span').html().trim() === '是' ? true : false
            */
            var obj2= {
                title: '修改投币模板',
                temNmae,
                brandName,
                telephone,
                isRef,
                isWalletPay
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addTemplate')){
            
            var obj2= {
                title: '新增投币模板',
                temNmae: '',
                brandName: '',
                telephone: '',
                isRef: true,
                isWalletPay: false
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-delete')){
        	 var isSelectTem= $(target).parent().parent().parent().parent().hasClass('borShadow')
             if(isSelectTem){
               mui.toast('被选择的模板不能删除',{ duration:'1500', type:'div' })
               return false
             }
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                var id= parseInt($(targetEle).attr('data-id'))
                $.ajax({
                    data:{
                        id: id
                    },
                    url : "./deletestairincoins",
                    type : "POST",
                    cache : false,
                    success : function(e){
                       
                    },//返回数据填充
                });
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('selectTem')){
            // 点击选择模板
            var parent= $(target).parent().parent().parent().parent().parent()
            if(!parent.hasClass('borShadow')){
                // 发送ajax，成功之后执行下面的 ()
                // 数据来源
                var arecode= $('body').attr('data-arecode').trim()
                var source= $('body').attr('data-source').trim()
                var id= $(target).attr('data-id').trim() //模板id
                  $.ajax({
                         data:{
                             source: source,
                             obj:arecode,
                        	 temid: id
                         },
                         url : "./templatechoice",
                         type : "POST",
                         cache : false,
                         success : function(e){
                            if(e == 1){
                                parent.siblings().removeClass('borShadow') //移除所有的兄弟节点的选择
                                parent.siblings().find('.bottom p').fadeOut()
                                parent.siblings().find('.selectTem').removeClass('active')
                                parent.addClass('borShadow')  //给当前元素添加节点
                                $(target).parent().parent().find('p').fadeIn()
                                $(target).addClass('active')
                                 //mui.toast('已选择当前模板',{ duration:'1500', type:'div' })
                            }
                         },//返回数据填充
                         error: function(){
                             mui.toast('选择模板失败，请稍后再试！',{ duration:'1500', type:'div' })
                         }
                     });

               
             }else{
                mui.toast('你已选择当前模板',{ duration:'1500', type:'div' })
             }
            
        } 
    })

    $('.tem3 .list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem3 .tem-mask1').click(close)
    $('.tem3 .list-center1 .close').click(close)
    $('.tem3 .list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.tem-mask1').fadeOut()
    }

    $('.tem3 .list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem3 .tem-mask2').click(close2)
    $('.tem3 .list-center2 .close').click(close2)
    $('.tem3 .list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.tem3 .tem-mask2').fadeOut()
    }

    $('.tem3 .list-center1 .submit').click(function (e) { //点击修改电子模板提交/添加的电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.tem3 .list-center1 input[name=name]').val().trim()
        var coinNumVal= $('.tem3 .list-center1 input[name=coinNum]').val().trim()
        var totalParseVal= $('.tem3 .list-center1 input[name=totalParse]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入显示名称',{ duration:'1500', type:'div' })
            return false
        }
        if(coinNumVal.length <= 0){
            mui.toast('请输入投币个数',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(coinNumVal)){
            mui.toast('投币个数请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(totalParseVal.length <= 0){
            mui.toast('请输入付款金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(totalParseVal)){
            mui.toast('付款金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        //修改离线子模板
            //发送ajax讲修改之后的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
            $.ajax({
                data:{
                    id: id,
                    name:nameVal,
                    money: coinNumVal,
                    remark: totalParseVal,
                },
                url : "./updatesubclassincoins",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });
            
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(coinNumVal)
            parentEle.find('p').eq(2).find('span').html(totalParseVal)
        $('.tem-mask1').fadeOut()
    })

    $('.tem3 .list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.tem3 .list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.tem3 .list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.tem3 .list-center2 input[name=telephone]').val().trim()
        /*var isRefVal= $('.tem3 .list-center2 input[name="isRef"]:checked').val()
        var isWalletPayVal= $('.tem3 .list-center2 input[name="isWalletPay"]:checked').val()
        
        var permit= parseInt(isRefVal) === 0 ? 2 :  parseInt(isRefVal)
        var walletpay = parseInt(isWalletPayVal) === 0 ? 2 :  parseInt(isWalletPayVal)*/
        
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        /*if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }*/
        var flag= $('.list-center2 h3').html().trim() === '修改投币模板' ? true : false
        if(flag){ // 修改主模板
            //发送ajax将修改的数据传输到服务器=====================
            
               var id= parseInt($(targetEle).attr('data-id'))
            $.ajax({
                data:{
                    id: id,
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    permit: 1,
                    walletpay: 2,
                    common1: telephoneVal
                },
                url : "./updatestairincoins",
                type : "POST",
                cache : false,
                success : function(e){
                   
                },//返回数据填充
            });
            
            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
           /* var isRefHtml= parseInt(isRefVal) ? '是' : '否'
            parentEle.find('p').eq(3).find('span').html(isRefHtml)
            parentEle.find('p').eq(3).find('span').removeClass('span-green span-red')
            if(parseInt(isRefVal)){
                parentEle.find('p').eq(3).find('span').addClass('span-green')
            }else {
                parentEle.find('p').eq(3).find('span').addClass('span-red')
            }

            var isWalletPayHtml= parseInt(isWalletPayVal) ? '是' : '否'
            parentEle.find('p').eq(4).find('span').html(isWalletPayHtml)
            parentEle.find('p').eq(4).find('span').removeClass('span-green span-red')
            if(parseInt(isWalletPayVal)){
                parentEle.find('p').eq(4).find('span').addClass('span-green')
            }else {
                parentEle.find('p').eq(4).find('span').addClass('span-red')
            }*/
        }else { //添加主模板
            //发送ajax将新增的数据传输到服务器=====================
            
              $.ajax({
                data:{
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    permit: 1,
                    walletpay: 2,
                    common1: telephoneVal
                },
                url : "./addstairincoins",
                type : "POST",
                cache : false,
                success : function(e){
                   if(e==1){
                	  window.location.href= window.location.href
                   }
                },//返回数据填充
            });
            
            /*var isRefHtml= parseInt(isRefVal) ? '是' : '否'
            var isWalletPayHtml= parseInt(isWalletPayVal) ? '是' : '否'
            var isRefClass= parseInt(isRefVal) ? 'span-green' : 'span-red'
            var isWalletPayClass= parseInt(isWalletPayVal) ? 'span-green' : 'span-red'*/
            var str= `
                <li>
                <div class="title">
                <p>模板名称：<span>${temNmaeVal}</span></p>
            <p>品牌名称：<span>${temNmaeVal}</span></p>
            <p>售后电话：<span>${brandNameseVal}</span></p>
            <div>
            <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button>
                <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button>
                </div>
                </div>
                <ul class="mui-table-view">
                <li class="mui-table-view-cell bottom">
                <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button>
                </li>
                </ul>
                </li>
                `
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.tem3 .tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.tem3 .tem-mask2').fadeOut()
    })


    function renderList(obj){ //渲染list-content
        $('.tem3 .list-center1 h3').html(obj.title)
        $('.tem3 .list-center1 input[name=name]').val(obj.name)
        $('.tem3 .list-center1 input[name=coinNum]').val(obj.coinNum)
        $('.tem3 .list-center1 input[name=totalParse]').val(obj.totalParse)
        $('.tem3 .tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.tem3 .list-center2 h3').html(obj.title)
        $('.tem3 .list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.tem3 .list-center2 input[name=brandName]').val(obj.brandName)
        $('.tem3 .list-center2 input[name=telephone]').val(obj.telephone)
        $('.tem3 .tem-mask2').fadeIn()
    }
}
 tem3()  
 // ==============下面是钱包模板js
 function wallet (){
         var targetEle= null
    $('.wallet .tem').click(function (e) {
    	console.log(256)
        e =e || window.event
        var target= e.target || e.srcElement
        targetEle= target
        if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-edit')){ //点击编辑
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj格式的，并将数据穿进去
            var name= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var parse= $(target).parent().parent().find('p').eq(1).find('span')[0].childNodes[0].textContent.trim()
            var totalParse= $(target).parent().parent().find('p').eq(2).find('span')[0].childNodes[0].textContent.trim()
            var obj= {  //这里是从后台获取的数据或者从元素上获取的（这里模拟后台数据）
                title: '修改钱包子模板',
                name: name,
                parse: parse,
                totalParse: totalParse
           }
            renderList(obj)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-delete')){
        	   var isSelectTem= $(target).parent().parent().parent().parent().parent().hasClass('borShadow')
               if(isSelectTem){
                 mui.toast('被选择的子模板不能删除',{ duration:'1500', type:'div' })
                 return false
               }
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletesubclasswwallet",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addBut')){
            var $list= $(target).parent().prev()
            if($list.length <= 0){ //没有子节点
                //这里是默认设置
                var nextParse= 30
                var nextTotalParse= 31
                var nextSendParse= nextTotalParse- nextParse
                var nextName= nextParse+'元送'+nextSendParse

            }else { //找到上一个子节点
                var reg= /(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}/g
                var parse= $list.find('p').eq(1).find('span').text().match(reg)[0]-0
                var TotalParse= $list.find('p').eq(2).find('span').text().match(reg)[0]-0
                console.log(TotalParse, parse)
                var nextParse= parse * 2
                var nextSendParse= (TotalParse- parse) * 2
                var nextTotalParse= nextParse+ nextSendParse
                // var nextName= nextParse+'元送'+nextSendParse
                var nextName= ''
                if(nextSendParse){
                     nextName= nextParse+'元'+'送'+nextSendParse
                }else{
                     nextName= nextParse+'元'
                }
            }
            //发送ajax将新增的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name: nextName,
                    money: nextParse,
                    remark: nextTotalParse
                },
                url : "./addsubclasswwallet",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var str= '<p>显示名称：<span>'+ nextName +'</span></p> <p>付款金额：<span>'+nextParse+'<b>元</b></span></p> <p>到账金额：<span>'+nextTotalParse+'<b>元</b></span></p> <div> <button type="button" class="mui-btn mui-btn-success tem-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-delete">删除</button> </div>'
            var list= $('<li class="mui-table-view-cell"></li>')
            list.html(str)
            $(targetEle).parent().parent()[0].insertBefore(list[0],$(targetEle).parent()[0])
           
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-edit')){ //点击模板编辑按钮
            //$('.tem-mask2').fadeIn()
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj2格式的，并将数据穿进去

            var temNmae= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var brandName= $(target).parent().parent().find('p').eq(1).find('span').html().trim()
            var telephone= $(target).parent().parent().find('p').eq(2).find('span').html().trim()


            var obj2= {
                title: '修改钱包主模板',
                temNmae: temNmae,
                brandName: brandName,
                telephone: telephone
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addTemplate')){
            var obj2= {
                title: '新增钱包主模板',
                temNmae: '',
                brandName: '',
                telephone: ''
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-delete')){
        	 var isSelectTem= $(target).parent().parent().parent().parent().hasClass('borShadow')
             if(isSelectTem){
               mui.toast('被选择的模板不能删除',{ duration:'1500', type:'div' })
               return false
             }
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletestairwallet",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                    
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('selectTem')){
            // 点击选择模板
            var parent= $(target).parent().parent().parent().parent().parent()
            if(!parent.hasClass('borShadow')){
                // 发送ajax，成功之后执行下面的 ()
                // 数据来源
                var arecode= $('body').attr('data-arecode').trim()
                var source= $('body').attr('data-source').trim()
                var id= $(target).attr('data-id').trim() //模板id
                  $.ajax({
                         data:{
                             source: source,
                             obj:arecode,
                        	 temid: id
                         },
                         url : "./templatechoice",
                         type : "POST",
                         cache : false,
                         success : function(e){
                            if(e == 1){
                                parent.siblings().removeClass('borShadow') //移除所有的兄弟节点的选择
                                parent.siblings().find('.bottom p').fadeOut()
                                parent.siblings().find('.selectTem').removeClass('active')
                                parent.addClass('borShadow')  //给当前元素添加节点
                                $(target).parent().parent().find('p').fadeIn()
                                $(target).addClass('active')
                                 //mui.toast('已选择当前模板',{ duration:'1500', type:'div' })
                            }
                         },//返回数据填充
                         error: function(){
                             mui.toast('选择模板失败，请稍后再试！',{ duration:'1500', type:'div' })
                         }
                     });

               
             }else{
                mui.toast('你已选择当前模板',{ duration:'1500', type:'div' })
             }
            
        } 
    })

    $('.wallet .list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.wallet .tem-mask1').click(close)
    $('.wallet .list-center1 .close').click(close)
    $('.wallet .list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.wallet .tem-mask1').fadeOut()
    }

    $('.wallet .list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.wallet .tem-mask2').click(close2)
    $('.wallet .list-center2 .close').click(close2)
    $('.wallet .list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.wallet .tem-mask2').fadeOut()
    }

    $('.wallet .list-center1 .submit').click(function (e) { //点击修改电子模板提交/添加的电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.wallet .list-center1 input[name=name]').val().trim()
        var parseVal= $('.wallet .list-center1 input[name=parse]').val().trim()
        var totalParseVal= $('.wallet .list-center1 input[name=totalParse]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入显示名称',{ duration:'1500', type:'div' })
            return false
        }
        if(parseVal.length <= 0){
            mui.toast('请输入付款金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(parseVal)){
            mui.toast('付款金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(totalParseVal.length <= 0){
            mui.toast('请输入到账金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(totalParseVal)){
            mui.toast('到账金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        var flag= $('.wallet .list-center1 h3').html().trim() === '新增钱包子模板' ? true : false
            //发送ajax讲修改之后的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:nameVal,
                    money: parseVal,
                    remark: totalParseVal
                },
                url : "./updatesubclasswwallet",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(parseVal+'<b>元</b>')
            parentEle.find('p').eq(2).find('span').html(totalParseVal+'<b>元</b>')
        $('.wallet .tem-mask1').fadeOut()
    })

    $('.wallet .list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.wallet .list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.wallet .list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.wallet .list-center2 input[name=telephone]').val().trim()
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        /*if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }*/
        var flag= $('.wallet .list-center2 h3').html().trim() === '修改钱包主模板' ? true : false
        if(flag){ // 修改离线模板
            //发送ajax将修改的数据传输到服务器=====================
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./updatestairwallet",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
        }else { //添加新模板
            //发送ajax将新增的数据传输到服务器=====================
            
             $.ajax({
                data:{
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./addstairwallet",
                type : "POST",
                cache : false,
                success : function(e){
                	if(e==1){
                  	  window.location.href= window.location.href
                     }
                },//返回数据填充
            });
            
            var str='<li><div class="title"><p>模板名称：<span>'+temNmaeVal+'</span></p><p>品牌名称：<span>'+brandNameseVal+'</span></p><p>售后电话：<span>'+ telephoneVal +'</span></p><div> <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button> </div> </div> <ul class="mui-table-view"> <li class="mui-table-view-cell bottom"> <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button> </li> </ul> </li> '
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.wallet .tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.wallet .tem-mask2').fadeOut()
    })


    function renderList(obj){ //渲染list-content
        $('.wallet .list-center1 h3').html(obj.title)
        $('.wallet .list-center1 input[name=name]').val(obj.name)
        $('.wallet .list-center1 input[name=parse]').val(obj.parse)
        $('.wallet .list-center1 input[name=totalParse]').val(obj.totalParse)
        $('.wallet .tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.wallet .list-center2 h3').html(obj.title)
        $('.wallet .list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.wallet .list-center2 input[name=brandName]').val(obj.brandName)
        $('.wallet .list-center2 input[name=telephone]').val(obj.telephone)
        $('.wallet .tem-mask2').fadeIn()
    }
}
wallet()
// =============================下面是在线卡模板js
 function onlineCard (){
         var targetEle= null
    $('.onlineCard .tem').click(function (e) {
        e =e || window.event
        var target= e.target || e.srcElement
        targetEle= target
        if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-edit')){ //点击编辑
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj格式的，并将数据穿进去
            var name= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var parse= $(target).parent().parent().find('p').eq(1).find('span')[0].childNodes[0].textContent.trim()
            var totalParse= $(target).parent().parent().find('p').eq(2).find('span')[0].childNodes[0].textContent.trim()
            var obj= {  //这里是从后台获取的数据或者从元素上获取的（这里模拟后台数据）
                title: '修改在线子模板',
                name: name,
                parse: parse,
                totalParse: totalParse
           }
            renderList(obj)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-delete')){
        	   var isSelectTem= $(target).parent().parent().parent().parent().parent().hasClass('borShadow')
               if(isSelectTem){
                 mui.toast('被选择的子模板不能删除',{ duration:'1500', type:'div' })
                 return false
               }
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletesubclassonline",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addBut')){
            var $list= $(target).parent().prev()
            if($list.length <= 0){ //没有子节点
                //这里是默认设置
                var nextParse= 30
                var nextTotalParse= 31
                var nextSendParse= nextTotalParse- nextParse
                var nextName= nextParse+'元送'+nextSendParse

            }else { //找到上一个子节点
                var reg= /(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}/g
                var parse= $list.find('p').eq(1).find('span').text().match(reg)[0]-0
                var TotalParse= $list.find('p').eq(2).find('span').text().match(reg)[0]-0
                console.log(TotalParse, parse)
                var nextParse= parse * 2
                var nextSendParse= (TotalParse- parse) * 2
                var nextTotalParse= nextParse+ nextSendParse
                var nextName= nextParse+'元送'+nextSendParse
            }
            //发送ajax将新增的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name: nextName,
                    money: nextParse,
                    remark: nextTotalParse
                },
                url : "./addsubclassonline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var str= '<p>显示名称：<span>'+ nextName +'</span></p> <p>付款金额：<span>'+nextParse+'<b>元</b></span></p> <p>到账金额：<span>'+nextTotalParse+'<b>元</b></span></p> <div> <button type="button" class="mui-btn mui-btn-success tem-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-delete">删除</button> </div>'
            var list= $('<li class="mui-table-view-cell"></li>')
            list.html(str)
            $(targetEle).parent().parent()[0].insertBefore(list[0],$(targetEle).parent()[0])
           
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-edit')){ //点击模板编辑按钮
            //$('.tem-mask2').fadeIn()
            //这一步发送ajax获取数据,或者在元素身上找到绑定的数据，讲数据处理为下面的obj2格式的，并将数据穿进去

            var temNmae= $(target).parent().parent().find('p').eq(0).find('span').html().trim()
            var brandName= $(target).parent().parent().find('p').eq(1).find('span').html().trim()
            var telephone= $(target).parent().parent().find('p').eq(2).find('span').html().trim()


            var obj2= {
                title: '修改在线卡主模板',
                temNmae: temNmae,
                brandName: brandName,
                telephone: telephone
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('addTemplate')){
            var obj2= {
                title: '新增在线卡主模板',
                temNmae: '',
                brandName: '',
                telephone: ''
            }
            renderList2(obj2)
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('tem-title-delete')){
        	 var isSelectTem= $(target).parent().parent().parent().parent().hasClass('borShadow')
             if(isSelectTem){
               mui.toast('被选择的模板不能删除',{ duration:'1500', type:'div' })
               return false
             }
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                    
                    var id= parseInt($(targetEle).attr('data-id'))
                     $.ajax({
                        data:{
                            id: id
                        },
                        url : "./deletestaironline",
                        type : "POST",
                        cache : false,
                        success : function(e){
                           
                        }
                    });
                    
                }
            })
        }else if(target.nodeName.toLowerCase() === 'button' && $(target).hasClass('selectTem')){
            // 点击选择模板
            var parent= $(target).parent().parent().parent().parent().parent()
            if(!parent.hasClass('borShadow')){
                // 发送ajax，成功之后执行下面的 ()
                // 数据来源
                var arecode= $('body').attr('data-arecode').trim()
                var source= $('body').attr('data-source').trim()
                var id= $(target).attr('data-id').trim() //模板id
                  $.ajax({
                         data:{
                             source: source,
                             obj:arecode,
                        	 temid: id
                         },
                         url : "./templatechoice",
                         type : "POST",
                         cache : false,
                         success : function(e){
                            if(e == 1){
                                parent.siblings().removeClass('borShadow') //移除所有的兄弟节点的选择
                                parent.siblings().find('.bottom p').fadeOut()
                                parent.siblings().find('.selectTem').removeClass('active')
                                parent.addClass('borShadow')  //给当前元素添加节点
                                $(target).parent().parent().find('p').fadeIn()
                                $(target).addClass('active')
                                 //mui.toast('已选择当前模板',{ duration:'1500', type:'div' })
                            }
                         },//返回数据填充
                         error: function(){
                             mui.toast('选择模板失败，请稍后再试！',{ duration:'1500', type:'div' })
                         }
                     });

               
             }else{
                mui.toast('你已选择当前模板',{ duration:'1500', type:'div' })
             }
            
        } 
    })

    $('.onlineCard .list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.onlineCard .tem-mask1').click(close)
    $('.onlineCard .list-center1 .close').click(close)
    $('.onlineCard .list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.onlineCard .tem-mask1').fadeOut()
    }

    $('.onlineCard .list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.onlineCard .tem-mask2').click(close2)
    $('.onlineCard .list-center2 .close').click(close2)
    $('.onlineCard .list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.onlineCard .tem-mask2').fadeOut()
    }

    $('.onlineCard .list-center1 .submit').click(function (e) { //点击修改电子模板提交/添加的电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.onlineCard .list-center1 input[name=name]').val().trim()
        var parseVal= $('.onlineCard .list-center1 input[name=parse]').val().trim()
        var totalParseVal= $('.onlineCard .list-center1 input[name=totalParse]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入显示名称',{ duration:'1500', type:'div' })
            return false
        }
        if(parseVal.length <= 0){
            mui.toast('请输入付款金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(parseVal)){
            mui.toast('付款金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        if(totalParseVal.length <= 0){
            mui.toast('请输入充卡金额',{ duration:'1500', type:'div' })
            return false
        }
        if(!reg.test(totalParseVal)){
            mui.toast('充卡金额请输入数字',{ duration:'1500', type:'div' })
            return false
        }
        var flag= $('.onlineCard .list-center1 h3').html().trim() === '新增在线卡子模板' ? true : false
        //修改离线子模板
            //发送ajax讲修改之后的数据传输到服务器=====================
            
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:nameVal,
                    money: parseVal,
                    remark: totalParseVal
                },
                url : "./updatesubclassonline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(parseVal+'<b>元</b>')
            parentEle.find('p').eq(2).find('span').html(totalParseVal+'<b>元</b>')
        $('.onlineCard .tem-mask1').fadeOut()
    })

    $('.onlineCard .list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.onlineCard .list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.onlineCard .list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.onlineCard .list-center2 input[name=telephone]').val().trim()
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        /*if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }*/
        var flag= $('.onlineCard .list-center2 h3').html().trim() === '修改在线卡主模板' ? true : false
        if(flag){ // 修改离线模板
            //发送ajax将修改的数据传输到服务器=====================
            var id= parseInt($(targetEle).attr('data-id'))
             $.ajax({
                data:{
                    id: id,
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./updatestaironline",
                type : "POST",
                cache : false,
                success : function(e){
                   
                }
            });
            
            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
        }else { //添加新模板
            //发送ajax将新增的数据传输到服务器=====================
            
             $.ajax({
                data:{
                    name:temNmaeVal,
                    remark: brandNameseVal,
                    common1: telephoneVal
                },
                url : "./addstaironline",
                type : "POST",
                cache : false,
                success : function(e){
                	if(e==1){
                  	  window.location.href= window.location.href
                     }
                },//返回数据填充
            });
            
            var str='<li><div class="title"><p>模板名称：<span>'+temNmaeVal+'</span></p><p>品牌名称：<span>'+brandNameseVal+'</span></p><p>售后电话：<span>'+ telephoneVal +'</span></p><div> <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button> </div> </div> <ul class="mui-table-view"> <li class="mui-table-view-cell bottom"> <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button> </li> </ul> </li> '
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.onlineCard .tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.onlineCard .tem-mask2').fadeOut()
    })


    function renderList(obj){ //渲染list-content
        $('.onlineCard .list-center1 h3').html(obj.title)
        $('.onlineCard .list-center1 input[name=name]').val(obj.name)
        $('.onlineCard .list-center1 input[name=parse]').val(obj.parse)
        $('.onlineCard .list-center1 input[name=totalParse]').val(obj.totalParse)
        $('.onlineCard .tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.onlineCard .list-center2 h3').html(obj.title)
        $('.onlineCard .list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.onlineCard .list-center2 input[name=brandName]').val(obj.brandName)
        $('.onlineCard .list-center2 input[name=telephone]').val(obj.telephone)
        $('.onlineCard .tem-mask2').fadeIn()
    }
}
onlineCard()

})

