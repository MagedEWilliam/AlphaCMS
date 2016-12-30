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

    msg(status);

    switch (method){
      case 'setCategory'     : viewAddCategory();  break;
      case 'setSubCategory'  : setSubCategoryfn(); break;
      case 'setProperty'     : setPropertyfn();    break;
      case 'setLocale'       : viewAddLocale();    break;
      case 'setContent'      : viewAddContent();   break;
      case 'setPage'         : viewAddPage();      break;
      case 'setPart'         : viewNewPart();      break;
      case 'manageParts'     : getParts();         break;
      case 'manageNavOrder'  : viewManageNavPage();   break;
      case 'managePages'     : viewManagePage();   break;
    }

  }

  function msg(status){ 
    if(status == "success"){
      $('#message').removeClass('hidden');
      $('#message').css('display','block');
      $('#message').addClass('success');
      $('#message').text('Done');
    }else if(status == "error"){
      $('#message').removeClass('hidden');
      $('#message').css('display','block');
      $('#message').addClass('error');
      $('#message').text('Done');
    }
  }

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

});

function setSubCategoryfn(){
  viewAddSubCategory();
  $('#plusprop').click(function(){
    viewSubProperty();
  });
}

function setPropertyfn(){
  viewAddProperty();

  $('[name=property]').change(function(e){
    var value = $('[name=property] option:selected').text();
    if(value == "No property"){
      $('[name=name]').val( "" );
    }else{
      $('[name=name]').val( value );
    }
  });
}