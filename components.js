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
	
	$( $('#navbar ul li')[0] ).addClass('active');
	$('#view').append('<h1>Add category:</h1> <div class="form-group"><label>Name:</label> <input class="form-control" type="text" id="name" name="name"> <select  class="select2-bootstrap-prepend form-control" id="category" name="category"></select></div> <div class="form-group"><label>Image URL:</label> <textarea class="form-control" name="url" ></textarea></div>');
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

function addicon(){
	$('#hidden').val( Number($('#hidden').val()) +1 );
	var len = Number($('#hidden').val());
	$('#view').append('<div class="icon['+len+']" id="icon['+len+']"><br><img width="304" class="img-thumbnail preview['+len+']"/>'
		+'<input class="form-control" type="file" onchange="preview()" name="icon['+len+']">');
}

function viewAddProperty(){
	$( $('#navbar ul li')[1] ).addClass('active');
	$('#view').append('<h1>Property</h1> <div class="form-group"><label>Name:</label> <input class="form-control" type="text" name="name"> <select  class="form-control" name="property"></select> </div> <div class="form-group"><label>Value:</label> <input class="form-control" type="text" name="value"> <select  class="form-control" id="value"></select> </div> <div class="form-group"> <label>Image URL:</label> <textarea class="form-control" name="url" ></textarea></div>');
	$('[name=property]').append('<option value="0">No property</option>');
	$('#value').append('<option value="0">No value</option>');
	ajaxProperty($('[name=property]'), $('#value'));
	$('[name=view]').prop('action', 'class_cms.php?method=setProperty');
}

function viewSubProperty(){
	
	$('#hidden').val( Number($('#hidden').val()) +1 );

	var len = Number($('#hidden').val());

	$('#view').append('<div class="form-group properties" id="property'+len+'"><br><label>Name:</label> <select  class="form-control" name="property['+len+']"></select> <br> <label>Value:</label> <select  class="form-control" name="value['+len+']"></select> <a href="#" onclick="removeme(\'#property'+len+'\')">X</a></div>');
	$( $('#property'+len+' [name^="property"]')[0] ).append('<option value="0">No property</option>');
	$( $('#property'+len+' [name^="value"]')[0] ).append('<option value="0">No value</option>');


	ajaxProperty( $( $('#property'+len+' [name^="property"]')[0] ), $( $('#property'+len+' [name^="value"]')[0] ) );
}

function viewAddSubCategory(){
	$( $('#navbar ul li')[2] ).addClass('active');
	$('#view').append('<h1>Add sub-category</h1> <div class="form-group"><label>Category:</label> <select  class="form-control" name="category"></select></div> <div class="form-group"><label>Name:</label> <input class="form-control" type="text" name="name"> </div> <div class="form-group"> <label>Image URL:</label> <textarea class="form-control" name="url" ></textarea></div>');
	viewSubProperty();
	$('[name=category]').append('<option value="0">No category</option>');
	ajaxCategory();
	$('[name=view]').prop('action', 'class_cms.php?method=setSubCategory');

	$('[name=view] input')[$('[name=view] input').length - 1].remove();

	$('#foot').prepend('<a href="#" id="plusprop">Add property</a><br>');
	$('#foot').append('<br><input class="form-control" type="submit">');
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