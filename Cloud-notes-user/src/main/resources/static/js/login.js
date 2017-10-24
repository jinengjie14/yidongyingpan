function succ_an(){
	$('.header_text')[0].removeChild($('.header_text')[0].children[1]);
	$('.header_text')[0].removeChild($('.header_text')[0].children[1]);
	$('form').fadeOut(500);
	if ($('.wrapper')[0]) {
		$('.wrapper').addClass('form-success');
		$("#head_banner_h1")[0].innerHTML="欢迎";
		setTimeout(function(){
			location.href="http://127.0.0.1:8085/index";
		},2500)
	}
	else {
		$('.wrapper_register').addClass('form-success');
		$("#head_banner_h1")[0].innerHTML="成功";
		setTimeout(function(){
			location.href="/login";
		},2500)
	}
};