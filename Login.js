$(document).ready(function() {

  $('.ui.form')
    .form({
    fields: {
      email: {
        identifier  : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'يجب أضافة اسم للمستخدم'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'يجب اضافة كلمة المرور'
          },
          {
            type   : 'length[4]',
            prompt : 'كلمة المرور يجب ان تكون اكثر من 4'
          }
        ]
      }
    }
  });

  var msg = getUrlParameter('msg');
  if ( msg == 'wrong' ){
    $('#msg_error').removeClass("hidden");
  }
  
  $(window).resize(function(){

    if ($(window).width() >= 700){
      if( $('.menu').css('display') == 'none') {
        $('.menu').css('display', 'block');
      }
    }
  });

});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};