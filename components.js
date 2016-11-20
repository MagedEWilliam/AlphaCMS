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
	
	$('#view').append('<h1>Add category:</h1> <label>Name:</label> <input type="text" id="" name="name"> <br> <label>Category:</label> <select name="category"></select>');
	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setCategory');
}

function viewAddProperty(){
	
	$('#view').append('<h1>Property</h1> <label>Name:</label> <input type="text" name="name"> <select name="property"></select> <br> <label>Value:</label> <input type="text" name="value"> <select id="value"></select>');
	$('[name=property]').append('<option value="0">No property</option>');
	$('#value').append('<option value="0">No value</option>');
	ajaxProperty($('[name=property]'), $('#value'));
	$('[name=view]').prop('action', 'class_cms.php?method=setProperty');
}

function viewSubProperty(){
	var len = $('.properties').length;

	$('#view').append('<div class="properties" id="property'+len+'"><br><label>Name:</label> <select name="property['+len+']"></select> <br> <label>Value:</label> <select name="value['+len+']"></select> <a href="#" onclick="removeme('+len+')">X</a></div>');
	$( $('#property'+len+' [name^="property"]')[0] ).append('<option value="0">No property</option>');
	$( $('#property'+len+' [name^="value"]')[0] ).append('<option value="0">No value</option>');


	ajaxProperty( $( $('#property'+len+' [name^="property"]')[0] ), $( $('#property'+len+' [name^="value"]')[0] ) );

	
}

function viewAddSubCategory(){
	
	$('#view').append('<h1>Add sub-category</h1><label>Category:</label> <select name="category"></select><br><label>Name:</label> <input type="text" name="name">');
	viewSubProperty();
	$('[name=category]').append('<option value="0">No category</option>');
	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');

	$('[name=view] input')[$('[name=view] input').length - 1].remove();

	$('[name=view]').append('<a href="#" id="plusprop">Add property</a><br>');
	$('[name=view]').append('<br><input type="submit">');
}

function removeme(e){ $('#property' + e).remove();}