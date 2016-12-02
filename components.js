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

function ajaxPages(){
	$.ajax({
		url: "class_cms.php?method=getPage"
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		$('[name=page]').append('<option value="0">No Page Selected</option>');
		for (var i = 0; i < data.length; i++) {
			if(data[i].hascontent == 0.00){
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
		<div class="form-group">\
			'+gemeinput('English Name', 'name', 'Please Enter in English', 'typeahead')+'\
			<input type="hidden" name="name-key">\
			'+gemeinput('Arabic Name', 'nameAr', 'برجاء الادخال بالعربي', 'typeahead')+'\
			<input type="hidden" name="nameAr-key">\
			'+gemeinput('Chinese Name', 'nameCh', '请用中文写', 'typeahead')+'\
			<input type="hidden" name="nameCh-key"> </div> \
			<div class="form-group">\
				<label>Image URL:</label> \
				<textarea class="form-control" name="url" placeholder="Enter image URL"></textarea>\
		</div>');
	$('#foot input').remove();
	$('#foot').append('<br><input class="form-control btn-success" type="submit">');

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
		<div class="form-group">\
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
		<div class="form-group">\
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
		<div class="form-group"> \
			<label>Image URL:</label> \
			<textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea>\
		</div>\
		<div class="form-group"> \
			<label class="checkbox-wrap" >\
				Filter by it \
				<input class="thecheckbox" name="filterable" type="checkbox" checked="checked">\
			</label> \
		</div>\
		');
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

	$('#view').append('\
		<div class="form-group properties" id="property'+len+'">\
			<br>\
			<label>Property name:</label>\
			<select  class="form-control" name="property['+len+']"></select> <br>\
			<label>Property value:</label> <select  class="form-control" name="value['+len+']"></select> \
			<div style="width:100%;margin-top: 10px">\
				<a href="#" class="btn btn-danger" style="float:right" onclick="removeme(\'#property'+len+'\')">X</a> \
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
		<div class="form-group"> \
			<label>Category:</label> \
			<select  class="form-control" name="category"></select>\
		</div>\
		\
		<div class="form-group">\
			<label>Code:</label> \
			<input placeholder="*Required" class="form-control" type="text" name="code">\
		</div>\
		\
		 <div class="form-group">\
		 	'+gemeinput('English Name', 'name'  , 'Value in English', '')+'\
			'+gemeinput('Arabic Name' , 'nameAr', 'برجاء الادخال بالعربي' , 'rtl')+'\
			'+gemeinput('Chinese Name', 'nameCh', '请用中文写', '')+'\
		</div> \
			 \
		<div class="form-group"> \
		 	<label>Image URL:</label> \
		 	<textarea class="form-control" placeholder="Enter image URL" name="url" ></textarea>\
		 </div>\
		 <div class="form-group"> \
		 	<label class="" >\
				Show up in the quick details \
				<input class="quickdetails" name="quickdetails" type="checkbox">\
			</label> \
		 </div>\
		 ');
	$('#foot').prepend('<a href="#" id="plusprop">Add property (+)</a><br><br>');
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');
	ajaxCategory();

}

function viewAddLocale(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[3] ).addClass('active');
	$('title').html('Add Locale');
		$('#view').append('\
			<h1>Add Locale</h1> \
			<br>\
			<label>key</label>\
			<div class="form-group">\
				<input class="form-control"  placeholder="ValueInLowercaseWithNoSpaces" name="key"/>\
			</div>\
			<div class="form-group">\
			'+gemeinput('Value English', 'value'  , 'Value in English', '')+'\
			'+gemeinput('Value Arabic' , 'valueAr', 'Value in Arabic' , '')+'\
			'+gemeinput('Value Chinese', 'valueCh', 'Value in Chinese', '')+'\
			</div>\
			<div class="form-group">\
				<input class="form-control btn btn-success" type="submit" value="Add locale (+)">\
			</div>\
			<br>\
			\
		');

	$('#rightview').append('\
			<div class="table-responsive">\
				<table class="table table-striped">\
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
			</div>\
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
						<div class="form-group">\
						'+gemeinput('Unique File Name', 'url'  , 'Unique File Name', ''	)+'\
						</div>\
						<div class="form-group">\
							'+gemeinput('Page Name in English', 'name'  , 'Page name in English', ''	)+'\
							'+gemeinput('Page Name in Arabic' , 'nameAr', 'برجاء الادخال بالعربي' , ''	)+'\
							'+gemeinput('Page Name in Chinese', 'nameCh', '请用中文写', ''	)+'\
						</div>\
						');
	$('[name=view]').prop('action', 'class_cms.php?method=setPage');
}

function viewAddContent(){
	$( $('#navbar .nav li')[0] ).addClass('active');
	$( $('#navbar ul .dropdown-menu li')[5] ).addClass('active');
	
		$('#view').append('\
			<h1>Write Content</h1> \
			<br>\
			<label for="page">Choose a page:</label> \
			<select  class="form-control" name="page"></select>\
			<br>\
			<div class="form-group">\
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
	ajaxPages();
	$('#summernote')  .summernote({ placeholder: 'Type content in English', height: 250});
	$('#summernoteAr').summernote({ placeholder: 'Type content in Arabic' , height: 250});
	$('#summernoteCh').summernote({ placeholder: 'Type content in Chinese', height: 250});

	$('#view').removeClass('col-sm-5');
	$('#view').addClass('col-sm-10');

	$('#rightview').removeClass('col-sm-7');
	$('#rightview').addClass('col-sm-2');

	$('#rightview').append('<div class="form-group">\
								<input class="form-control btn btn-success" type="submit" value="Save">\
							</div>');

	$('#foot').remove();
	$('[name=view]').prop('action', 'class_cms.php?method=setContent');
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