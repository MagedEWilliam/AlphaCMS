function viewManageNavPage(){
	$('#navbar .dropdown:eq(1)').addClass('active')
	$('#navbar .dropdown:eq(1) .dropdown-menu li:eq(0)').addClass('active');

	$('title').html('Manage Nav');
	$('#view').append(' <h1>Manage Pages</h1>\
						<div class="form-group">\
							<ul id="sortable">\
							\
							</ul>\
						</div>\
						<div class="form-group">\
						\
						</div>\
						');
	$('[name=view]').prop('action', 'class_cms.php?method=manageNavOrder');
	ajaxPages();
	$('#foot').append('<br><input class="ui green button" type="submit">');
}

function viewManagePage(){
	$('title').html('Manage Pages');
	var view = '\
	<h1>Manage Pages</h1>\
	<label for="page"><b>Choose a page:</b></label> \
	<select  class="ui fluid dropdown form-control" name="page"></select>\
	<ul id="sortable" class="connectedSortable">\
	</ul>\
	';

	$('#view').append(view);

	$('#rightview').append('<ul id="sortable2" class="connectedSortable"></ul>');

	$('[name=view]').prop('action', 'class_cms.php?method=managePages');
	ajaxPart_drag();
	ajaxPage(false);
	$('#foot').append('<br><input class="ui green button" type="submit">');
	$('[name=view]').submit(function(){ $('#sortable2').remove(); });
	$('[name=page]').change(function(){ _ajaxPart(); });
}

function ajaxPages(){
	$.ajax({
		url: "class_cms.php?method=getPage"
	}).done(function(data) {
		data = jQuery.parseJSON(data);
		for (var i = 0; i < data.length; i++)
		{
			var vie = '\
					<li class="ui-state-default">\
						<input type="hidden" name="pagenum['+i+']" value="'+data[i].ID+'">\
						<i class="ui icon resize vertical"></i><b>'+data[i].Name+'</b>\
						<div class="ui checkbox floatright">\
						<label>Visibility</label>\
							<input type="checkbox" name="visibility['+i+']"';

			if(data[i].Available == '0'){
				vie += '/>';
			}else if(data[i].Available == '1' && Number(data[i].hascontent) > 0.00){
				vie += 'checked/>';
			}
			
			$( '#sortable' ).append(vie + '</div></li>');
		}
		$( "#sortable" ).sortable();
		$('.checkbox').checkbox();
	});
}

//define html part.

function viewNewPart(){
	var view = '\
	<h1>Add Part</h1> \
	<label for="page">Choose a page:</label> \
	<select  class="ui fluid dropdown form-control" name="page"></select>\
	\
	<div class="field">\
		<label>Part ID:</label> \
		<input class="form-control typeahead" type="text" placeholder="Part ID" name="partID">\
	</div>\
\
	<label for="contentAr"><b>Content</b></label>\
		<textarea id="summernote" name="content"></textarea>\
	';
	$('#view').append(view);
	$('.dropdown').dropdown({placeholder:'No Page Selected'});
	ajaxPage(false);
	tinymce.init({selector: '#summernote',
		plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'emoticons template paste textcolor colorpicker textpattern imagetools'
		],
		height : 500,
		toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		toolbar2: 'print preview media | forecolor backcolor emoticons',
		image_advtab: true
	});
	widdenview('sixteen','three');
	$('#rightview').append('<div class="field"><input class="ui green button" type="submit" value="Save"></div>');
	$('[name=view]').prop('action', 'class_cms.php?method=setPart');
}

var heyLookImGlopal_State_content = [];

function getParts(){
	//get pages
	//get parts associated with selected page
	//option edit
	//get content of this part
	var view = '\
	<h1>Edit Page</h1>\
	<label for="page"><b>Choose a page:</b></label> \
	<select  class="ui fluid dropdown form-control" name="page"></select>\
	<label for="part"><b>Choose a part:</b></label> \
	<select  class="ui fluid dropdown form-control" name="part"></select>\
	\
	<label for="contentAr"><b>Content</b></label>\
	<textarea id="summernote" name="content"></textarea>\
	';

	//view to view
	tinymce.init({selector: '#summernote',
		plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'emoticons template paste textcolor colorpicker textpattern imagetools'
		],
		height : 500,
		toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		toolbar2: 'print preview media | forecolor backcolor emoticons',
		image_advtab: true
	});

	$('#view').append(view);
	$('.dropdown').dropdown({placeholder:'Nothing Selected'});
	$('[name=page]').change(ajaxPart);
	$('[name=part]').change(function(){ 
		tinymce.get("summernote").execCommand('mceInsertContent', false, heyLookImGlopal_State_content[ $('[name=part]').val() ]);
	});
	ajaxPage(false);
	widdenview('sixteen','three');
	$('#rightview').append('<div class="field"><input class="ui green button" type="submit" value="Save"></div>');
	$('[name=view]').prop('action', 'class_cms.php?method=uptPart');
}

function ajaxPart(){
	$.getJSON("class_cms.php?method=getPart&page=" + $('[name=page]').val(), function(data){
		$('[name=part]').append('<option value="0">No Part Selected</option>');
		heyLookImGlopal_State_content= [];
		for (var i = 0; i < data.length; i++) {
			$('[name=part]').append('<option value="'+data[i].ID+'">'+data[i].partid+'</option>');
			heyLookImGlopal_State_content[ data[i].ID ] = data[i].content.replace(/\\/g,'"').replace(/""/g, '"');
		}
	});
}

function _ajaxPart(){
	$.getJSON("class_cms.php?method=getPagePart&page=" + $('[name=page]').val(), function(data){
		$( '#sortable' ).html('');
		for (var i = 0; i < data.length; i++) {
			var vie = '<li class="ui-state-default"><i class="ui icon resize horizontal"><input type="hidden" name="pagenum['+i+']" value="'+data[i].ID+'"></i><b>'+data[i].partid+'</b></li>';
			$('#_'+data[i].ID).remove();
			$( '#sortable' ).append(vie);
		}
	});
}


function ajaxPart_drag(){
	$.getJSON("class_cms.php?method=getPart&page=all", function(data){
		$( '#sortable2' ).html('');
		for (var i = 0; i < data.length; i++){
			var vie = '<li class="ui-state-default" id="_'+data[i].ID+'"><i class="ui icon resize horizontal"><input type="hidden" name="pagenum['+i+']" value="'+data[i].ID+'"></i><b>'+data[i].partid+'</b></li>';
			$( '#sortable2' ).append(vie);
		}
		$( "#sortable, #sortable2" ).sortable({ connectWith: ".connectedSortable" });
		$( '#sortable2' ).css({'overflow-y': 'scroll'});
		$('#rightview').css('position', 'fixed');
	});
}