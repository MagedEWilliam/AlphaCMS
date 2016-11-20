function viewLogin(){
	$('#view').html('');
	viewAddCategory();
}

function ajaxCategory(){
	$.ajax({
		url: "class_cms.php?method=getCategory"
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		for (var i = 0; i < data.length; i++) {
			$('[name=category]').append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');
		}
	});
}

function ajaxProperty(pro, val){
	$.ajax({
		url: "class_cms.php?method=getProperty"
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		for (var i = 0; i < data.length; i++) {
			if(data[i].Name){
				pro.append('<option value="'+data[i].ID+'">'+data[i].Name+'</option>');
			}else{
				val.append('<option value="'+data[i].ID+'">'+data[i].value+'</option>');
			}
		}
	});
}

function viewAddCategory(){
	
	$('#view').append('<h1>Add category:</h1> <label>Name:</label> <input type="text" id="" name="name"> <select name="category"></select> <br> <label>Image URL:</label> <textarea name="url" ></textarea>');

	$('[name=view] input')[$('[name=view] input').length - 1].remove();
	// $('[name=view]').append('<a href="#" onclick="addicon()">Add icon</a><br>');
	$('[name=view]').append('<br><input type="submit">');

	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setCategory');
}

function addicon(){
	$('#hidden').val( Number($('#hidden').val()) +1 );
	var len = Number($('#hidden').val());
	$('#view').append('<div class="icon['+len+']" id="icon['+len+']"><br><img class="preview['+len+']"/>'
		+'<input type="file" onchange="preview()" name="icon['+len+']">');
		// +' <br><a href="#" onclick="removeme($(\'[class^=icon]\')['+len+'])">X</a></div>'
}

function addicon(){
	$('#hidden').val( Number($('#hidden').val()) +1 );
	var len = Number($('#hidden').val());
	$('#view').append('<div class="icon['+len+']" id="icon['+len+']"><br><img class="preview['+len+']"/>'
		+'<input type="file" onchange="preview()" name="icon['+len+']">');
		// +' <br><a href="#" onclick="removeme($(\'[class^=icon]\')['+len+'])">X</a></div>'
}

function viewAddProperty(){
	
	$('#view').append('<h1>Property</h1> <label>Name:</label> <input type="text" name="name"> <select name="property"></select> <br> <label>Value:</label> <input type="text" name="value"> <select id="value"></select> <br> <label>Image URL:</label> <textarea name="url" ></textarea>');
	$('[name=property]').append('<option value="0">No property</option>');
	$('#value').append('<option value="0">No value</option>');
	ajaxProperty($('[name=property]'), $('#value'));
	$('[name=view]').prop('action', 'class_cms.php?method=setProperty');
}

function viewSubProperty(){
	
	$('#hidden').val( Number($('#hidden').val()) +1 );

	var len = Number($('#hidden').val());

	$('#view').append('<div class="properties" id="property'+len+'"><br><label>Name:</label> <select name="property['+len+']"></select> <br> <label>Value:</label> <select name="value['+len+']"></select> <a href="#" onclick="removeme(\'#property'+len+'\')">X</a></div>');
	$( $('#property'+len+' [name^="property"]')[0] ).append('<option value="0">No property</option>');
	$( $('#property'+len+' [name^="value"]')[0] ).append('<option value="0">No value</option>');


	ajaxProperty( $( $('#property'+len+' [name^="property"]')[0] ), $( $('#property'+len+' [name^="value"]')[0] ) );
}

function viewAddSubCategory(){
	
	$('#view').append('<h1>Add sub-category</h1><label>Category:</label> <select name="category"></select><br><label>Name:</label> <input type="text" name="name"> <br> <label>Image URL:</label> <textarea name="url" ></textarea>');
	viewSubProperty();
	$('[name=category]').append('<option value="0">No category</option>');
	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');

	$('[name=view] input')[$('[name=view] input').length - 1].remove();

	$('[name=view]').append('<a href="#" id="plusprop">Add property</a><br>');
	$('[name=view]').append('<br><input type="submit">');
}

function removeme(e){ $(e).remove();}

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