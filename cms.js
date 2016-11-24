$(document).ready(function(){

  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
  var method = getUrlParameter("method");
  var status = getUrlParameter("status");

  function viewWhatNow(method){
    if(method == undefined || method == "" ){
      viewLogin();
    }else if(method == "setCategory"       ){
      viewAddCategory();
    }else if(method == "setSubCategory"    ){
      viewAddSubCategory();
      $('#plusprop').click(function(){
        viewSubProperty();
      });
    }else if(method == "setProperty"       ){
      viewAddProperty();

      $('[name=property]').change(function(e){
        var value = $('[name=property] option:selected').text();
        if(value == "No property"){
          $('[name=name]').val( "" );
        }else{
          $('[name=name]').val( value );
        }
      });

    }else if(method == "setLocale"    ){
      viewAddLocale();
    }
  }

  function msg(status){ if(status == "success"){}else if(status == "error"){} }

  function autoopen(source, text){
    var len = source.length-1;
    for (var i = 0; i <= len; i++) {
      var re = new RegExp(text, 'g');
      if ( $($(source)[i]).text().match(re) != undefined){
        console.log("found");
        $($(source)[i]).show();
      }else{
        $($(source)[i]).hide();
      }
    }
    $(source).simulate('mousedown');
  }

  viewWhatNow(method);



  // $('#category').select2({
  //   placeholder: "Available Categories"
  // });

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