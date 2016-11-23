function viewLogin(){
	$('#view').html('');
	viewAddCategory();
}

var substringMatcher = function(strs, field) {
	return function findMatches(q, cb) {
		var matches, substringRegex;
		matches = [];
		substrRegex = new RegExp(q, 'i');
		$.each(strs, function(i, str) {
			if (substrRegex.test([strs[i][field]])) {
				matches.push(str);
			}

		});
		cb(matches);
	};
};

function ajaxCategory(){
	$.ajax({
		url: "class_cms.php?method=getCategory"
	}).done(function(data) {
		data = jQuery.parseJSON(data);

		var states =[];
		$('[name=category]').append('<option value="0">No Category Selected</option>');
		for (var i = 0; i < data.length; i++) {
			$('[name=category]').append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');
			states.push(data[i].Name, data[i].ID);
		}
		
		$('#name').typeahead(null, {
			name: 'ID',
			displayKey: 'Name',
			source: substringMatcher(data, "Name")
		}).on('typeahead:selected', function(event, data){
			$(event.currentTarget).parent().next( "input[name="+event.currentTarget.name+"-key]" ).val(data.ID);
		});


	});
}

function ajaxProperty(pro, val, v){
	$.ajax({
		url: "class_cms.php?method=getProperty"
	}).done(function(data) {
		var method = getUrlParameter("method");
		if(method == "setSubCategory"){
			$('html,body').animate({ scrollTop: $('#plusprop').offset().top}, 'fast');
		}
		data = jQuery.parseJSON(data);
		var nam  = [];
		var valu = [];

		for (var i = 0; i < data.length; i++) {
			if(data[i].Name){
				nam.push(data[i]);
				pro.append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');

			}else{
				valu.push(data[i]);
				val.append('<option value="'+data[i].ID+'">'+data[i].value+'</option>');

			}
		}

		if(v){
			$('[name=name]').typeahead(null, {
				name: 'ID',
				displayKey: 'Name',
				source: substringMatcher(nam, "Name")
			}).on('typeahead:selected', function(event, data){
				$(event.currentTarget).parent().next( "input[name="+event.currentTarget.name+"-key]" ).val(data.ID);
			});
		}
		$('[name=value]').typeahead(null, {
			name: 'ID',
			displayKey: 'value',
			source: substringMatcher(valu, "value")
		}).on('typeahead:selected', function(event, data){
			$(event.currentTarget).parent().next( "input[name="+event.currentTarget.name+"-key]" ).val(data.ID);
		});

	});
}

function ajaxValue(event){
	var id = event.data.name;
	var src=  $("#property" + event.data.name);
	var fst = $(src).find('select')[0];
	var sec = $(src).find('select')[1];
	var ur = "class_cms.php?method=getValue&ID=" +$(fst).val() ;
	$.ajax({
		url: ur
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		$(sec).html('');
		$(sec).append('<option value="0">No value</option>')
		for (var i = 0; i < data.length; i++) {
			if(data[i].value){
				$(sec).append('<option value="'+data[i].ID+'">'+data[i].value+'</option>');
			}
		}
	});
}

function viewAddCategory(){
	$( $('#navbar ul li')[0] ).addClass('active');
	$('#view').append('<h1>Add category:</h1> '+
		'<div class="form-group">'+
		'<label>English Name:</label> <input class="form-control typeahead" type="text" id="name"   placeholder="Please Enter in English" name="name">'+
		' <input type="hidden" name="name-key">'+
		'<label>Arabic Name:</label> <input class="form-control typeahead rtl" type="text" id="nameAr"  placeholder="برجاء الادخال بالعربي" name="nameAr">'+
		' <input type="hidden" name="nameAr-key"> '+
		'<label>Chinese Name:</label> <input class="form-control typeahead" type="text" id="nameCh" placeholder="请用中文写" name="nameCh">'+
		' <input type="hidden" name="nameCh-key"> </div> <div class="form-group">'+
		'<label>Image URL:</label> <textarea class="form-control" name="url" placeholder="Enter image URL"></textarea></div>');
	$('#foot input').remove();
	$('#foot').append('<br><input class="form-control" type="submit">');

	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setCategory');
}

function addicon(){
	$('#hidden').val( Number($('#hidden').val()) +1 );
	var len = Number($('#hidden').val());
	$('#view').append('<div class="icon['+len+']" id="icon['+len+']"><br><img width="304" class="img-thumbnail preview['+len+']"/>'
		+'<input class="form-control" type="file" onchange="preview()" name="icon['+len+']">');
}

function viewAddProperty(){
	$( $('#navbar ul li')[1] ).addClass('active');
	$('#view').append('<h1>Property</h1> <div class="form-group">'+

		'<label>Property Name in English:</label> <input class="form-control typeahead" type="text" placeholder="Please Enter in English" name="name">'+
		' <input type="hidden" name="name-key">  '+
		'<label>Property Name in Arabic:</label>  <input class="form-control typeahead rtl" type="text" placeholder="برجاء الادخال بالعربي" name="nameAr">'+
		' <input type="hidden" name="nameAr-key"> '+
		'<label>Property Name in Chinese:</label> <input class="form-control typeahead" type="text" placeholder="请用中文写" name="nameCh">'+
		' <input type="hidden" name="nameCh-key"> </div> <br>'+

		'<div class="form-group"><label>English Value:</label> <input class="form-control typeahead" type="text" placeholder="Please Enter in English" name="value">   <input type="hidden" name="value-key"> '+
		'<label>Arabic Value:</label>  <input class="form-control typeahead rtl" type="text" placeholder="برجاء الادخال بالعربي" name="valueAr"> <input type="hidden" name="valueAr-key">  '+
		'<label>Chinese Value:</label> <input class="form-control typeahead" type="text" placeholder="请用中文写" name="valueCh"> <input type="hidden" name="valueCh-key"> </div> '+

		'<div class="form-group"> <label>Image URL:</label> <textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea></div>');
	$('[name=property]').append('<option value="0">No property</option>');
	$('#value').append('<option value="0">No value</option>');
	ajaxProperty($('[name=property]'), $('#value'), true);
	$('[name=view]').prop('action', 'class_cms.php?method=setProperty');
}

function scrolltoView(len){
	document.getElementById('property'+len).scrollIntoViewIfNeeded();
}

function viewSubProperty(){
	$('#hidden').val( Number($('#hidden').val()) +1 );

	var len = Number($('#hidden').val());

	$('#view').append('<div class="form-group properties" id="property'+len+'"><br>'+
		'<label>Property name:</label>  <select  class="form-control" name="property['+len+']"></select> <br>'+
		'<label>Property value:</label> <select  class="form-control" name="value['+len+']"></select> '+
		'<a href="#" class="btn btn-danger" onclick="removeme(\'#property'+len+'\')">X</a></div>');
	$( $('#property'+len+' [name^="property"]')[0] ).append('<option value="0">No property</option>');
	$( $('#property'+len+' [name^="value"]')[0] ).append('<option value="0">No value</option>');

	$( $('#property'+len+' [name^="property"]')[0] ).on( "change", {name: len}, ajaxValue );

	ajaxProperty( $( $('#property'+len+' [name^="property"]')[0] ), $( $('#property'+len+' [name^="value"]')[0] ), false );
}

function viewAddSubCategory(){
	$( $('#navbar ul li')[2] ).addClass('active');
	$('#view').append('<h1>Add item</h1> '+

		'<div class="form-group"><label>Category:</label> '+
		'<select  class="form-control" name="category"></select></div>'+

		'<div class="form-group"><label>Code:</label> '+
		'<input placeholder="*Required" class="form-control" type="text" name="code"></div>'+

		' <div class="form-group"><label>English Name:</label> <input placeholder="Please Enter in English" class="form-control" type="text" name="name">  '+
		' <label>Arabic Name:</label>  <input placeholder="برجاء الادخال بالعربي" class="form-control rtl" type="text" name="nameAr">  '+
		' <label>Chinese Name:</label> <input placeholder="请用中文写" class="form-control" type="text" name="nameCh"> </div> '+
		' <div class="form-group"> <label>Image URL:</label> <textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea></div>');
	$('#foot').prepend('<a href="#" id="plusprop">Add property (+)</a><br><br>');
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');
	ajaxCategory();

}

function removeme(e){ $('html,body').animate({ scrollTop: $(e).offset().top}, 'fast'); $(e).remove(); }

function uploadimg (s, target) {
	if (target.files && target.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$(s).prop('src', e.target.result);
		};
		reader.readAsDataURL(target.files[0]);
	}
}

function preview(){
	var icons = $("[class^=icon]");
	for (var i = 0; i < icons.length; i++) {
		uploadimg( $(icons[i]).find('img').first()[0], $(icons[i]).find('input').first()[0] );
	}
}