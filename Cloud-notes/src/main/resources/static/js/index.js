var is_open=false;

function down_pull(e){
	e = e || event;
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	if(is_open){
		$("#sess_list").hide();
		$("#down_pull_cli").removeClass("trans_rota_0");
		is_open=false;
	}
	else{
		$("#sess_list").show();
		$("#down_pull_cli").addClass("trans_rota_0");
		is_open=true;
	}
};
function list_init(){
	is_open=false;
	$("#sess_list").hide();
	$("#down_pull_cli").removeClass("trans_rota_0");
}
$(document).ready(function () {
    $("body").click(function () {
    	(is_open) ? list_init() : is_open=false;
    });
});
function close_user_div(){
	$("#mui-overlay").remove();
}
//个人信息
function activateModal() {
    // initialize modal element
    var modalEl = document.createElement('div');
    modalEl.className="user_div_card";
    // show modal
    mui.overlay('on', modalEl);
    
    $("<div class='close_tranf_icon' aria-hidden='true' onclick='close_user_div()'>+</div>").appendTo(modalEl);
    $("<img class='user_from_photo' src='/images/user.jpg'/>").appendTo(modalEl);
    $("<div class='user_from_photo_put_div'>").appendTo(modalEl);
    var user_input_div = $("<div class='col-lg-10 col-lg-offset-1 user_input_div'></div>").appendTo(modalEl);
    $("<input type='text' id='nickname' placeholder='昵称'>").appendTo(user_input_div);
    var province = $("<select></select>").appendTo(user_input_div);
    $("<option>请选择</option>").appendTo(province);
    var city = $("<select></select>").appendTo(user_input_div);
    $("<option>请选择</option>").appendTo(city);
    $("<textarea cols='30' id='mood' rows='3' placeholder='个性签名'></textarea>").appendTo(user_input_div);
    var user_btn_div = $("<div class='col-lg-10 col-lg-offset-1 btn_div'></div>").appendTo(modalEl);
    $("<button class='col-lg-12 add_btn_style'>保存</button>").appendTo(user_btn_div);
  }

$(function () {
  function initToolbarBootstrapBindings() {
    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
      'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
      'Times New Roman', 'Verdana'],
      fontTarget = $('[title=Font]').siblings('.dropdown-menu');
    $.each(fonts, function (idx, fontName) {
      fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
    });
    $('a[title]').tooltip({ container: 'body' });
    $('.dropdown-menu input').click(function () { return false; })
      .change(function () { $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle'); })
      .keydown('esc', function () { this.value = ''; $(this).change(); });

    $('[data-role=magic-overlay]').each(function () {
      var overlay = $(this), target = $(overlay.data('target'));
      overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
    });
    if ("onwebkitspeechchange" in document.createElement("input")) {
      var editorOffset = $('#editor').offset();
      $('#voiceBtn').css('position', 'absolute').offset({ top: editorOffset.top, left: editorOffset.left + $('#editor').innerWidth() - 35 });
    } else {
      $('#voiceBtn').hide();
    }
  };
  function showErrorAlert(reason, detail) {
    var msg = '';
    if (reason === 'unsupported-file-type') { msg = "Unsupported format " + detail; }
    else {
      console.log("error uploading file", reason, detail);
    }
    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
      '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
  };
  initToolbarBootstrapBindings();
  $('#editor').wysiwyg({ fileUploadError: showErrorAlert });
  window.prettyPrint && prettyPrint();
});

(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
  (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-37452180-6', 'github.io');
ga('send', 'pageview');

//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="http://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
