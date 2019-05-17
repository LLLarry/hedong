var timer= null
$(window).ready(function () {
    $('.clA').click(function(e){
        e= e || window.event
        e.preventDefault()
        $(this).parent().children('.hd').slideToggle(300)
    })

    //关闭遮挡层以及弹框
    $('.list-center').click(function(e){
        e= e || window.event
        e.stopPropagation()
    })

    $('.tem-mask').click(close)
    $('.list-center .close').click(close)
    $('.list-center .close2').click(close)
    function close (e) {
        e= e || window.event
        e.stopPropagation()
        $('.tem-mask').fadeOut()
    }

    // 点击编辑，弹出修改电子模板

    $('.tem .hd').click(function(e){
        e= e || window.event
        var target = e.target || e.srcElement
        if($(target).text() === '编辑'  && target.nodeName.toLowerCase() === 'button'){ //编辑
            var parentIndex= parseInt($(target).parent().parent().attr('data-index'))
            var grandParentIndex= parseInt($(target).parent().parent().parent().parent().attr('data-index'))
            var str= $(target).parent().parent().find('span').html()
            //var arr= str.match(/\d{1,}/g) //这是提取显示信息的
            var obj= {
                title: '修改电子模板',
                name: str,
                parse: 2,
                time: parseInt(2)*60,
                power: 2,
                from: {grandParentIndex: grandParentIndex,parentIndex: parentIndex}
            }
            renderList(obj)
        }else if($(target).text() === '删除'  && target.nodeName.toLowerCase() === 'button'){ //删除
            mui.confirm('确定删除?', function (type) {
                console.log(type)
                if(type.index){ //删除
                    //console.log($(target).parent().parent().index()) //获取删除元素的索引
                    $(target).parent().parent().remove()
                    // =============================发送 ajax 提交数据 提交删除元素的数据
                }
            })
        }
    })

    //点击添加模板
    $('.last-div button').click(function (e) {
        var grandParentIndex= parseInt($(this).parent().parent().parent().attr('data-index'))

        e= e || window.event
        var obj= {
            title: '新增电子模板',
            name: '',
            parse: '',
            time: '',
            power: '',
            from: {grandParentIndex:grandParentIndex} //这个是为了后面添加判断来自哪一个 number 索引
        }
        renderList(obj)
    })

    function renderList(obj){ //渲染list-content
        console.log(obj)
        $('.list-center h3').html(obj.title)
        $('.list-center input[name=name]').val(obj.name)
        $('.list-center input[name=parse]').val(obj.parse)
        $('.list-center input[name=time]').val(obj.time)
        $('.list-center input[name=power]').val(obj.power)
        $('.list-center .submit').attr('data-from',JSON.stringify(obj.from))
        $('.tem-mask').fadeIn()
    }

    //点击提交按钮
    $('.list-center .submit').click(function (e) {
        e= e || window.event
        var nameVal= $('.list-center input[name=name]').val().trim()
        var parseVal= $('.list-center input[name=parse]').val().trim()
        var timeVal= $('.list-center input[name=time]').val().trim()
        var powerVal= $('.list-center input[name=power]').val().trim()
        if(nameVal.length <= 0){
            mui.toast('请输入模板名称',{ duration:'1500', type:'div' })
            return false
        }
        if(parseVal.length <= 0){
            mui.toast('请输入充电价格',{ duration:'1500', type:'div' })
            return false
        }
        if(timeVal.length <= 0){
            mui.toast('请输入充电时间',{ duration:'1500', type:'div' })
            return false
        }
        if(powerVal.length <= 0){
            mui.toast('请输入消耗电量',{ duration:'1500', type:'div' })
            return false
        }
        //讲输入的内容呈现在页面上
        var htmlStr='<span>'+nameVal+'</span><div class="bt"><button type="button" class="mui-btn mui-btn-success edit-btn">编辑</button> <button type="button" class="mui-btn mui-btn-success">删除</button></div>'

        //获取要添加或者编辑到哪里
        var flag= $('.list-center h3').html().trim() === '新增电子模板' ? true : false
        if(flag){ //新增
            var grandParentIndex= JSON.parse($(this).attr('data-from')).grandParentIndex
            var parentDiv= $('.tem .top ul>li').eq(grandParentIndex).find('.hd')[0]
            console.log(parentDiv)
            var childDiv=  $('.tem .top ul>li').eq(grandParentIndex).find('.hd').find('.last-div')[0]
            var div= document.createElement('div')
            div.innerHTML= htmlStr
            console.log(div)
            parentDiv.insertBefore(div,childDiv)
        }else{ //编辑
            var grandParentIndex= JSON.parse($(this).attr('data-from')).grandParentIndex
            var parentIndex= JSON.parse($(this).attr('data-from')).parentIndex
            var editEle= $('.tem .top ul>li').eq(grandParentIndex).find('.hd>div').eq(parentIndex)
            editEle.find('span').html(nameVal)
        }
        //========================  发送ajax请求，提交数据
        $('.tem-mask').fadeOut()
    })

    //  点击添加模板按钮
    $('.tem .addTem').click(function (e) {
        e = e || window.event
        $('.tem-mask2').fadeIn()
    })

})


