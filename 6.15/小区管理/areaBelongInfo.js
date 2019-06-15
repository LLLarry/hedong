// 小区管理入口
$(function(){
	// 点击编辑小区
	var blockArea= 1  //显示页面 1是默认页 2是编辑页 3是添加设备页
	var title= $('header h3').text().trim() //获取小区标题
	$('#edit').click(function(){
		blockArea= 2
		$('.areaBelongInfo1').slideUp()
		$('.areaBelongInfo3').slideUp()
		$('.areaBelongInfo2').slideDown()
		changeTitle()
	})
	// 点击模板
	$('#alertBtn').click(function(){
		$('.alert').fadeIn()
	})
	$('.alert').click(function(){
		$('.alert').fadeOut()
	})
	$('.alert ul').click(function(e){
		e= e || window.event
		e.stopPropagation()
	})
	// 点击添加设备
	 // 模拟数据 data是传过来的数据
	 var data= [
			{text: '0056325'},
			{text: '1234568'},
			{text: '3653256'},
			{text: '1456897'},
			{text: '5662354'}
		]
		var picker = new mui.PopPicker();
			 picker.setData(data);
	$('#addBtn').click(function(){
		blockArea= 3
		changeTitle()
		
		
		$('.selectDeviceNum').click(function(){ //点击选择设备编号
			 picker.show(function (selectItems) {
			    console.log(selectItems[0].text);//智子
			    $('#deviceInp').val(selectItems[0].text)
			  })

		})
		// =============//
		$('.areaBelongInfo1').slideUp()
		$('.areaBelongInfo2').slideUp()
		$('.areaBelongInfo3').slideDown()
	})

	// 点击编辑小区提交
	$('.areaBelongInfo2 .mui-btn-primary').click(function(){
		// 这里判断有没有输入内容
		// 添加之后成功与否提示框，告诉客户添加成功或失败
		// 这里发送完之后，清空input所有值
		blockIndexPage()
	})
	$('.areaBelongInfo2 .mui-btn-danger').click(function(){
		// 清空input所有值
		$('.areaBelongInfo2 input').val('')
		blockIndexPage()
	})

	// 点击添加设备提交
	$('.areaBelongInfo3 .mui-btn-primary').click(function(){
		// 这里判断有没有输入内容
		// 添加之后成功与否提示框，告诉客户添加成功或失败
		// 这里发送完之后，清空input所有值
		blockIndexPage()
	})
	$('.areaBelongInfo3 .mui-btn-danger').click(function(){
		// 清空input所有值
		$('.areaBelongInfo3 input').val('')
		blockIndexPage()
	})

	$('#deleteBtn').click(function(){
		mui.confirm('确认删除此小区','提示',function(e){
			if(e.index === 1){
				// 发送请求删除小区
			}
		})
	})

	function blockIndexPage(){ //显示默认页
		blockArea=1
		$('.areaBelongInfo2').slideUp()
		$('.areaBelongInfo3').slideUp()
		$('.areaBelongInfo1').slideDown()
		changeTitle()
	}

	function changeTitle(){
		if(blockArea==1){
			$('header h3').text(title)
		}else if(blockArea == 2){
			$('header h3').text('编辑'+title)
		}else if(blockArea== 3){
			$('header h3').text('添加设备到'+title)
		}

	}


})