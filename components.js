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


function ajaxLocale(q){
	$.ajax({
		url: "class_cms.php?method=getLocale&q=" + q
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		for (var i = 0; i < data.length; i++) {
			$('#localetable').append('\
				<tr>\
				<td>'+data[i].key+'</td>\
				<td>'+data[i].value+'</td>\
				<td>'+data[i].valueAr+'</td>\
				<td>'+data[i].valueCh+'</td>\
				</tr>\
				');
		}
	});
}

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

function ajaxPage(filterit){
	$.getJSON("class_cms.php?method=getPage", function(data){
		$('[name=page]').append('<option value="0">No Page Selected</option>');
		for (var i = 0; i < data.length; i++) {
			if(filterit){
				if(data[i].hascontent == 0.00){
					$('[name=page]').append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');
				}
			}else{
				$('[name=page]').append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');

			}
		}
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
	var ur = "class_cms.php?method=getValue&ID=" +$(fst).val();

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

function gemeinput(label, name, placeholder, cls){
	return '<label for="'+name+'">'+label+':</label>\
	<input class="form-control '+cls+'" \
	type="text" \
	id="'+name+'" \
	placeholder="'+placeholder+'" \
	name="'+name+'">';
}

function viewAddCategory(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[0] ).addClass('active');
	$('title').html('Add category');
	$('#view').append('\
		<h1>Add category:</h1> \
		<div class="field">\
		'+gemeinput('English Name', 'name', 'Please Enter in English', 'typeahead')+'\
		<input type="hidden" name="name-key">\
		'+gemeinput('Arabic Name', 'nameAr', 'برجاء الادخال بالعربي', 'typeahead')+'\
		<input type="hidden" name="nameAr-key">\
		'+gemeinput('Chinese Name', 'nameCh', '请用中文写', 'typeahead')+'\
		<input type="hidden" name="nameCh-key"> </div> \
		<div class="field" style="display:none;">\
		<label>Image URL:</label> \
		<textarea class="form-control" name="url" placeholder="Enter image URL"></textarea>\
		</div>');
	$('#foot input').remove();
	$('#foot').append('<br><input class="ui green button" type="submit">');

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
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[1] ).addClass('active');
	$('title').html('Property');
	$('#view').append('<h1>Property</h1> \
		<div class="field">\
		<label>Property Name in English:</label> \
		<input class="form-control typeahead" type="text" placeholder="Please Enter in English" name="name">\
		<input type="hidden" name="name-key">  \
		\
		<label>Property Name in Arabic:</label>  \
		<input class="form-control typeahead rtl" type="text" placeholder="برجاء الادخال بالعربي" name="nameAr">\
		<input type="hidden" name="nameAr-key"> \
		\
		<label>Property Name in Chinese:</label> \
		<input class="form-control typeahead" type="text" placeholder="请用中文写" name="nameCh">\
		<input type="hidden" name="nameCh-key"> \
		</div>\
		<br>\
		\
		<div class="field">\
		<label>English Value:</label> \
		<input class="form-control typeahead" type="text" placeholder="Please Enter in English" name="value">\
		<input type="hidden" name="value-key"> \
		\
		<label>Arabic Value:</label>  \
		<input class="form-control typeahead rtl" type="text" placeholder="برجاء الادخال بالعربي" name="valueAr">\
		<input type="hidden" name="valueAr-key">  \
		\
		<label>Chinese Value:</label> \
		<input class="form-control typeahead" type="text" placeholder="请用中文写" name="valueCh">\
		<input type="hidden" name="valueCh-key"> \
		</div> \
		\
		<div class="field" style="display:none;"> \
		<label>Image URL:</label> \
		<textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea>\
		</div>\
		<div class="field"> \
		<div class="ui checkbox">\
		<label class="checkbox-wrap" >\
		Filter by it \
		</label> \
		<input class="thecheckbox" name="filterable" type="checkbox" checked="checked">\
		</div>\
		</div>\
		');

	$('[name=property]').append('<option value="0">No property</option>');
	$('#value').append('<option value="0">No value</option>');
	ajaxProperty($('[name=property]'), $('#value'), true);
	$('[name=view]').prop('action', 'class_cms.php?method=setProperty');
	$('#foot').append('<br><input class="ui green button" type="submit">');
	$('.checkbox').checkbox();
}

function scrolltoView(len){
	document.getElementById('property'+len).scrollIntoViewIfNeeded();
}

function viewSubProperty(){
	$('#hidden').val( Number($('#hidden').val()) +1 );

	var len = Number($('#hidden').val());

	$('#view').append('\
		<div class="field properties" id="property'+len+'">\
		<br>\
		<label>Property name:</label>\
		<select  class="form-control" name="property['+len+']"></select> <br>\
		<label>Property value:</label> <select  class="form-control" name="value['+len+']"></select> \
		<div style="width:100%;margin-top: 10px">\
		<a href="#" class="ui red button" style="float:right" onclick="removeme(\'#property'+len+'\')">X</a> \
		</div>\
		</div>\
		');
	$( $('#property'+len+' [name^="property"]')[0] ).append('<option value="0">No property</option>');
	$( $('#property'+len+' [name^="value"]')[0] ).append('<option value="0">No value</option>');

	$( $('#property'+len+' [name^="property"]')[0] ).on( "change", {name: len}, ajaxValue );

	ajaxProperty( $( $('#property'+len+' [name^="property"]')[0] ), $( $('#property'+len+' [name^="value"]')[0] ), false );
}

function viewAddSubCategory(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[2] ).addClass('active');
	$('title').html('Add item');
	$('#view').append('\
		<h1>Add item</h1> \
		<div class="field"> \
		<label>Category:</label> \
		<select class="ui dropdown" name="category"></select>\
		</div>\
		\
		<div class="field">\
		<label>Code:</label> \
		<input placeholder="*Required" class="form-control" type="text" name="code">\
		</div>\
		\
		<div class="field">\
		'+gemeinput('English Name', 'name'  , 'Value in English', '')+'\
		'+gemeinput('Arabic Name' , 'nameAr', 'برجاء الادخال بالعربي' , 'rtl')+'\
		'+gemeinput('Chinese Name', 'nameCh', '请用中文写', '')+'\
		</div> \
		\
		<div class="field"> \
		<label>Price:</label> \
		<input placeholder="*Required" class="form-control" type="text" name="price" value="000.00">\
		</div>\
		\
		<div class="fields"> \
		<div class="eight field"> \
		<label>Discount in %:</label> \
		<input placeholder="*Required" class="form-control" type="text" name="discount" value="000">\
		</div>\
		\
		<div class="ui checkbox">\
		<label class="" >\
		On sale? \
		</label> \
		<input class="quickdetails" name="onsale" type="checkbox">\
		</div>\
		</div>\
		\
		<div class="field"> \
		<label>Quantity:</label> \
		<input placeholder="*Required" class="form-control" type="number" name="qun" value="0">\
		</div>\
		\
		<div class="field"> \
		<label>Image URL:</label> \
		<textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea>\
		</div>\
		<div class="field"> \
		<div class="ui checkbox">\
		<label class="" >\
		Show up in the quick details \
		</label> \
		<input class="quickdetails" name="quickdetails" type="checkbox">\
		</div>\
		<div class="ui checkbox">\
		<label class="" style="float: right;">\
		Feature as a hot item \
		</label> \
		<input class="quickdetails" name="quickdetails" type="checkbox">\
		</div>\
		</div>\
		');
	$('#foot').prepend('<a href="#" id="plusprop">Add property (+)</a><br><br>');
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');
	ajaxCategory();
	$('#foot').append('<br><input class="ui green button" type="submit">');
	$('.checkbox').checkbox();
	$('.dropdown').dropdown();
	cardPreview();
	$(window).on('click keyup change', function(){cardPreview();});
}

function viewAddLocale(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[3] ).addClass('active');
	$('title').html('Add Locale');
	$('#view').append('\
		<h1>Add Locale</h1> \
		<br>\
		<label>key</label>\
		<div class="field">\
		<input class="form-control"  placeholder="ValueInLowercaseWithNoSpaces" name="key"/>\
		</div>\
		<div class="field">\
		'+gemeinput('Value English', 'value'  , 'Value in English', '')+'\
		'+gemeinput('Value Arabic' , 'valueAr', 'Value in Arabic' , '')+'\
		'+gemeinput('Value Chinese', 'valueCh', 'Value in Chinese', '')+'\
		</div>\
		<div class="field">\
		<input class="ui green button" type="submit" value="Add locale (+)">\
		</div>\
		<br>\
		\
		');

	$('#rightview').append('\
		\
		<table class="ui table celled striped">\
		<thead>\
		<tr>\
		<th>Key</th>\
		<th>Value English</th>\
		<th>Value Arabic</th>\
		<th>Value Chinese</th>\
		</tr>\
		\
		<tbody id="localetable">\
		<tbody>\
		</thead>\
		</table>\
		\
		');
	ajaxLocale('');
	$('#foot').remove();
	$('[name=view]').prop('action', 'class_cms.php?method=setLocale');
}

function viewAddPage(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[4] ).addClass('active');
	$('title').html('Add Page');
	$('#view').append(' <h1>Add page</h1>\
		<div class="field">\
		'+gemeinput('Unique File Name', 'url'  , 'Unique File Name', ''	)+'\
		</div>\
		<div class="field">\
		'+gemeinput('Page Name in English', 'name'  , 'Page name in English', ''	)+'\
		'+gemeinput('Page Name in Arabic' , 'nameAr', 'برجاء الادخال بالعربي' , ''	)+'\
		'+gemeinput('Page Name in Chinese', 'nameCh', '请用中文写', ''	)+'\
		</div>\
		');
	$('[name=view]').prop('action', 'class_cms.php?method=setPage');
	$('#foot').append('<br><input class="ui green button" type="submit">');
}

function viewAddContent(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[5] ).addClass('active');
	
	$('#view').append('\
		<h1>Write Content</h1> \
		<br>\
		<label for="page">Choose a page:</label> \
		<select  class="ui fluid dropdown form-control" name="page"></select>\
		<br>\
		<div class="field">\
		<label for="content">Content in English</label>\
		<textarea id="summernote" name="content"></textarea>\
		\
		<label for="contentAr">Content in Arabic</label>\
		<textarea id="summernoteAr" name="contentAr"></textarea>\
		\
		<label for="contentCh">Content in Chinese</label>\
		<textarea id="summernoteCh" name="contentCh"></textarea>\
		</div>\
		\
		');
	ajaxPage(true);

	$('.dropdown').dropdown();

	tinymce.init({selector: '#summernote',
		plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'emoticons template paste textcolor colorpicker textpattern imagetools'
		],
		toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		toolbar2: 'print preview media | forecolor backcolor emoticons',
		image_advtab: true
	});

	tinymce.init({selector: '#summernoteAr',
		plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'emoticons template paste textcolor colorpicker textpattern imagetools'
		],
		toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		toolbar2: 'print preview media | forecolor backcolor emoticons',
		image_advtab: true
	});

	tinymce.init({selector: '#summernoteCh',
		plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'emoticons template paste textcolor colorpicker textpattern imagetools'
		],
		toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		toolbar2: 'print preview media | forecolor backcolor emoticons',
		image_advtab: true
	});
	
	widdenview('ten','six');

	$('#rightview').append('<div class="field">\
		<input class="ui green button" type="submit" value="Save">\
		</div>');

	$('#foot').remove();
	
	$('[name=view]').prop('action', 'class_cms.php?method=setContent');
}

function widdenview(left, right){
	$('#view').removeClass('seven wide column');
	$('#view').addClass(left + ' wide column');

	$('#rightview').removeClass('eight wide column');
	$('#rightview').addClass(right +' wide column');
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