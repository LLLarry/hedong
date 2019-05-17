
//这里是tem 模板也得js逻辑处理

$(function () {
    var targetEle= null
    $('.tem').click(function (e) {
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
            mui.confirm('确定删除?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
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
            mui.confirm('确定删除模板?', function (type) {
                if(type.index){ //删除
                    $(target).parent().parent().parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                }
            })
        }
    })

    $('.list-center1').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem-mask1').click(close)
    $('.list-center1 .close').click(close)
    $('.list-center1 .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        console.log('点击了')
        $('.tem-mask1').fadeOut()
    }

    $('.list-center2').click(function(e){ //组织阻止冒泡，防止点击了自身隐藏
        e= e || window.event
        e.stopPropagation()
    })
    $('.tem-mask2').click(close2)
    $('.list-center2 .close').click(close2)
    $('.list-center2 .close2').click(close2)
    function close2 (e) {
        e= e || window.event
        e.stopPropagation()
        $('.tem-mask2').fadeOut()
    }

    $('.list-center1 .submit').click(function (e) { //点击修改电子模板提交/添加的电子模板提交
        e =e || window.event
        e.stopPropagation()
        var reg= /^\d+(\.\d+)?$/
        var nameVal= $('.list-center1 input[name=name]').val().trim()
        var parseVal= $('.list-center1 input[name=parse]').val().trim()
        var totalParseVal= $('.list-center1 input[name=totalParse]').val().trim()
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
        var flag= $('.list-center1 h3').html().trim() === '新增离线子模板' ? true : false
        //修改离线子模板
            //发送ajax讲修改之后的数据传输到服务器=====================
            var parentEle= $(targetEle).parent().parent()
            console.log(parentEle)
            parentEle.find('p').eq(0).find('span').html(nameVal)
            parentEle.find('p').eq(1).find('span').html(parseVal+'<b>元</b>')
            parentEle.find('p').eq(2).find('span').html(totalParseVal+'<b>元</b>')
        $('.tem-mask1').fadeOut()
    })

    $('.list-center2 .submit').click(function(e){
        e =e || window.event
        e.stopPropagation()
        var temNmaeVal= $('.list-center2 input[name=temNmae]').val().trim()
        var brandNameseVal= $('.list-center2 input[name=brandName]').val().trim()
        var telephoneVal= $('.list-center2 input[name=telephone]').val().trim()
        if(temNmaeVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        if(brandNameseVal.length <= 0){
            mui.toast('请输入品牌名称',{ duration:'1500', type:'div' })
            return false
        }
        if(telephoneVal.length <= 0){
            mui.toast('请输入售后电话',{ duration:'1500', type:'div' })
            return false
        }
        var flag= $('.list-center2 h3').html().trim() === '修改离线模板' ? true : false
        if(flag){ // 修改离线模板
            //发送ajax将修改的数据传输到服务器=====================
            var parentEle= $(targetEle).parent().parent()
            parentEle.find('p').eq(0).find('span').html(temNmaeVal)
            parentEle.find('p').eq(1).find('span').html(brandNameseVal)
            parentEle.find('p').eq(2).find('span').html(telephoneVal)
        }else { //添加新模板
            //发送ajax将新增的数据传输到服务器=====================

            var str='<li><div class="title"><p>模板名称：<span>'+temNmaeVal+'</span></p><p>品牌名称：<span>'+brandNameseVal+'</span></p><p>售后电话：<span>'+ telephoneVal +'</span></p><div> <button type="button" class="mui-btn mui-btn-success tem-title-edit">编辑</button> <button type="button" class="mui-btn mui-btn-success tem-title-delete">删除</button> </div> </div> <ul class="mui-table-view"> <li class="mui-table-view-cell bottom"> <button type="button" class="mui-btn mui-btn-success mui-btn-outlined addBut">添加</button> </li> </ul> </li> '
            var div= $('<div class="list-div"></div>')
            div.html(str)
            $('.tem')[0].insertBefore(div[0],$('.tem nav')[0])
        }
        $('.tem-mask2').fadeOut()
    })


    function renderList(obj){ //渲染list-content
        $('.list-center1 h3').html(obj.title)
        $('.list-center1 input[name=name]').val(obj.name)
        $('.list-center1 input[name=parse]').val(obj.parse)
        $('.list-center1 input[name=totalParse]').val(obj.totalParse)
        $('.tem-mask1').fadeIn()
    }
    function renderList2(obj){
        $('.list-center2 h3').html(obj.title)
        $('.list-center2 input[name=temNmae]').val(obj.temNmae)
        $('.list-center2 input[name=brandName]').val(obj.brandName)
        $('.list-center2 input[name=telephone]').val(obj.telephone)
        $('.tem-mask2').fadeIn()
    }
})

