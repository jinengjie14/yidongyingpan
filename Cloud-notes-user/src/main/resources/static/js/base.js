$(document).ready(function(){
	//form 实例化后的内容
	function string_deal(data,url,type){
		if(url=="user"){
			var dat={"account":"","password":"","password2":"","_method":""};
		}
		if(url=="login"){
			var dat={"account":"","password":"","_method":""};
		}
		var q=data.split("&");
		for(var i=0;i<q.length;i++){
			var o=q[i].split("=")[1];
			switch(i){
				case 0:dat.account=o;break;
				case 1:dat.password=o;break;
				case 2:dat.password2=o;break;
			}
		}
		dat._method=type;
		return dat;
	}
	function error_init(){
		if($("[data-error='password2']")){
			$("[data-error='password2']").html("");
		}
		$("[data-error='account']").html("");
		$("[data-error='password']").html("");
	}
	
	$("[name='submit']").on("click",function(){
		var form = $(this).parent();
		var type = form[0].method;
		var url = form[0].action;
		var url_d = url.split("8084/")[1];
		var data = string_deal(form.serialize(),url_d,type);
		$.ajax({
			url:url,
			data:data,
			type:type,
			success:function(e){
				error_init();
				if(e === "success"){
					succ_an();
					return;
				}
				if(typeof(e)==="string"&&e!="success"){
					var json = $.parseJSON(e);
		            $.each(json, function (idx, obj) {
		                var name = "[data-error='" + obj.field + "']";
		                $(name).html(obj.message);
		            });
				}
				if(typeof(e)==="object"){
					for(var i in e){
						var name = "[data-error='" + i + "']";
						$(name).html(e[i]);
					}
				}
			}
		})
	})
	$("input").on("keydown",function(){
		error_init();
	});
	$(".head_banner span").on("click", function(e){
		$(".head_banner span").removeClass("active");
		if($(this).text() === "登录"){
			$(".login_form").show();
			$(".register_form").hide();
			$(this).addClass("active");
		}else{
			$(".login_form").hide();
			$(".register_form").show();
			$(this).addClass("active");
		}
	})
});