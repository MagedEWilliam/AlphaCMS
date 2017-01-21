function viewManageNavPage(){
	$('#navbar .dropdown:eq(1)').addClass('active')
	$('#navbar .dropdown:eq(1) .dropdown-menu li:eq(0)').addClass('active');

	$('title').html('Manage Nav');
	$('#view').append(' <h1>Manage Nav Order</h1>\
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

function viewManageProductsOrder(){
	$('#navbar .dropdown:eq(1)').addClass('active')
	$('#navbar .dropdown:eq(1) .dropdown-menu li:eq(0)').addClass('active');

	$('title').html('Manage Nav');
	$('#view').append(' <h1>Manage Product Order</h1>\
		<div class="form-group">\
		<ul id="sortable">\
		\
		</ul>\
		</div>\
		<div class="form-group">\
		\
		</div>\
		');
	$('[name=view]').prop('action', 'class_cms.php?method=manageProductsOrder');
	ajaxCards();
	$('#rightview').append('<br><input class="ui green button" type="submit">');
	$('#rightview').css('position', 'fixed');
}


function viewManagePage(){
	$('title').html('Manage Pages');
	var view = '\
	<h1>Manage Page Content</h1>\
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
	\
	<div class="ui top attached tabular menu">\
		<div class="item item_ active" data-tab="en">English</div>\
		<div class="item item_"        data-tab="ar">Arabic</div>\
		<div class="item item_"        data-tab="ch">Chinese</div>\
	</div>\
	<div class="ui bottom attached tab segment active" data-tab="en">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitheror item active" data-tab="editor">Editor</a>\
			<a class="eitheror item" data-tab="code">Code</a>\
		<input type="hidden" name="takefrom" value="code">\
		</div>\
		\
		<div class="ui tab active" data-tab="editor"><textarea id="summernote" name="content"></textarea></div>\
		<div class="ui tab" data-tab="code"><textarea name="HTMLCODE" placeholder="HTML CODE"></textarea></div>\
	</div>\
	\
	\
	<div class="ui bottom attached tab segment" data-tab="ar">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitherorAr item active" data-tab="editorAr">Editor</a>\
			<a class="eitherorAr item" data-tab="codeAr">Code</a>\
		<input type="hidden" name="takefromAr" value="codeAr">\
		</div>\
		\
		<div class="ui tab active" data-tab="editorAr"><textarea id="summernoteAr" name="contentAr"></textarea></div>\
		<div class="ui tab" data-tab="codeAr"><textarea name="HTMLCODEAr" placeholder="HTML CODE"></textarea></div>\
	</div>\
	\
	\
	<div class="ui bottom attached tab segment" data-tab="ch">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitherorCh item active" data-tab="editorCh">Editor</a>\
			<a class="eitherorCh item" data-tab="codeCh">Code</a>\
		<input type="hidden" name="takefromCh" value="codeCh">\
		</div>\
		\
		<div class="ui tab active" data-tab="editorCh"><textarea id="summernoteCh" name="contentCh"></textarea></div>\
		<div class="ui tab" data-tab="codeCh"><textarea name="HTMLCODECh" placeholder="HTML CODE"></textarea></div>\
	</div>\
	';
	
	$('#view').append(view);
	$('.ui.top.attached.tabular.menu .item_').tab();
	$('.ui.pointing.secondary.blue.menu .item').tab();
	$('.ui.pointing.secondary.blue.menu .eitheror.item').click(changeActive);
	$('.ui.pointing.secondary.blue.menu .eitherorAr.item').click(changeActiveAr);
	$('.ui.pointing.secondary.blue.menu .eitherorCh.item').click(changeActiveCh);
	changeActive();
	changeActiveAr();
	changeActiveCh();

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
	tinymce.init({selector: '#summernoteAr',
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
	tinymce.init({selector: '#summernoteCh',
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

function changeActive(){
	var val = $('.ui.pointing.secondary.blue.menu .eitheror.active').attr('data-tab');
	$('[name=takefrom]').val(val);
	console.log($('[name=takefrom]').val());
}
function changeActiveAr(){
	var val = $('.ui.pointing.secondary.blue.menu .eitherorAr.active').attr('data-tab');
	$('[name=takefromAr]').val(val);
	console.log($('[name=takefrom]').val());
}
function changeActiveCh(){
	var val = $('.ui.pointing.secondary.blue.menu .eitherorCh.active').attr('data-tab');
	$('[name=takefromCh]').val(val);
	console.log($('[name=takefrom]').val());
}

var heyLookImGlopal_State_content = [];
var heyLookImGlopal_State_contentAr = [];
var heyLookImGlopal_State_contentCh = [];

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
	\
	<div class="ui top attached tabular menu">\
		<div class="item item_ active" data-tab="en">English</div>\
		<div class="item item_"        data-tab="ar">Arabic</div>\
		<div class="item item_"        data-tab="ch">Chinese</div>\
	</div>\
	<div class="ui bottom attached tab segment active" data-tab="en">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitheror item" data-tab="editor">Editor</a>\
			<a class="eitheror item active" data-tab="code">Code</a>\
		<input type="hidden" name="takefrom" value="code">\
		</div>\
		\
		<div class="ui tab" data-tab="editor"><textarea id="summernote" name="content"></textarea></div>\
		<div class="ui tab active" data-tab="code"><textarea name="HTMLCODE" placeholder="HTML CODE"></textarea></div>\
	</div>\
	\
	\
	<div class="ui bottom attached tab segment" data-tab="ar">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitherorAr item" data-tab="editorAr">Editor</a>\
			<a class="eitherorAr item active" data-tab="codeAr">Code</a>\
		<input type="hidden" name="takefromAr" value="codeAr">\
		</div>\
		\
		<div class="ui tab" data-tab="editorAr"><textarea id="summernoteAr" name="contentAr"></textarea></div>\
		<div class="ui tab active" data-tab="codeAr"><textarea name="HTMLCODEAr" placeholder="HTML CODE"></textarea></div>\
	</div>\
	\
	\
	<div class="ui bottom attached tab segment" data-tab="ch">\
	\
		<div class="ui pointing secondary blue menu">\
			<a class="eitherorCh item" data-tab="editorCh">Editor</a>\
			<a class="eitherorCh item active" data-tab="codeCh">Code</a>\
		<input type="hidden" name="takefromCh" value="codeCh">\
		</div>\
		\
		<div class="ui tab" data-tab="editorCh"><textarea id="summernoteCh" name="contentCh"></textarea></div>\
		<div class="ui tab active" data-tab="codeCh"><textarea name="HTMLCODECh" placeholder="HTML CODE"></textarea></div>\
	</div>\
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
	tinymce.init({selector: '#summernoteAr',
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
	tinymce.init({selector: '#summernoteCh',
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
	$('.ui.top.attached.tabular.menu .item_').tab();
	$('.ui.pointing.secondary.blue.menu .item').tab();
	$('.ui.pointing.secondary.blue.menu .eitheror.item').click(changeActive);
	$('.ui.pointing.secondary.blue.menu .eitherorAr.item').click(changeActiveAr);
	$('.ui.pointing.secondary.blue.menu .eitherorCh.item').click(changeActiveCh);
	changeActive();
	changeActiveAr();
	changeActiveCh();

	$('.dropdown').dropdown({placeholder:'Nothing Selected'});
	$('[name=page]').change(ajaxPart);

	$('[name=part]').change(function(){ 
		tinymce.get("summernote").setContent('');
		tinymce.get("summernoteAr").setContent('');
		tinymce.get("summernoteCh").setContent('');

		tinymce.get("summernote").execCommand('mceInsertContent', false, heyLookImGlopal_State_content[ $('[name=part]').val() ]);
		tinymce.get("summernoteAr").execCommand('mceInsertContent', false, heyLookImGlopal_State_contentAr[ $('[name=part]').val() ]);
		tinymce.get("summernoteCh").execCommand('mceInsertContent', false, heyLookImGlopal_State_contentCh[ $('[name=part]').val() ]);
		
		$("[name=HTMLCODE]").val('');
		$("[name=HTMLCODEAr]").val('');
		$("[name=HTMLCODECh]").val('');

		$("[name=HTMLCODE]").val( heyLookImGlopal_State_content[ $('[name=part]').val()] );
		$("[name=HTMLCODEAr]").val( heyLookImGlopal_State_contentAr[ $('[name=part]').val()] );
		$("[name=HTMLCODECh]").val( heyLookImGlopal_State_contentCh[ $('[name=part]').val()] );
	});
	ajaxPage(false);
	ajaxPart();
	widdenview('sixteen','three');
	$('#rightview').append('<div class="field"><input class="ui green button" type="submit" value="Save"></div>');
	$('[name=view]').prop('action', 'class_cms.php?method=uptPart');
}

function ajaxPart(){
	$('[name=part]').html('');
	$.getJSON("class_cms.php?method=getPart&page=" + $('[name=page]').val(), function(data){
		$('[name=part]').append('<option value="0">No Part Selected</option>');
		console.log("class_cms.php?method=getPart&page=" + $('[name=page]').val());
		heyLookImGlopal_State_content= [];
		heyLookImGlopal_State_contentAr= [];
		heyLookImGlopal_State_contentCh= [];
		for (var i = 0; i < data.length; i++) {
			$('[name=part]').append('<option value="'+data[i].ID+'">'+data[i].partid+'</option>');
			heyLookImGlopal_State_content[ data[i].ID ] = data[i].content.replace(/\\/g,'"').replace(/""/g, '"');
			heyLookImGlopal_State_contentAr[ data[i].ID ] = data[i].contentAr.replace(/\\/g,'"').replace(/""/g, '"');
			heyLookImGlopal_State_contentCh[ data[i].ID ] = data[i].contentCh.replace(/\\/g,'"').replace(/""/g, '"');
		}
	});
}

function ajaxCards(){
	$.getJSON("class_cms.php?method=getSubCategory", function(data){
		for (var i = 0; i < data.length; i++)
		{
			var vie = '\
			<li class="ui-state-default cardy">\
			<input type="hidden" name="pagenum['+i+']" value="'+data[i].ID+'">\
			<i class="ui icon resize vertical"></i><b>'+data[i].Name+'</b>\
			<p> : </p>\
			<p>'+data[i].code+'</p>\
			<img src="'+data[i].image+'" />\
			</li>';
			
			$( '#sortable' ).append(vie);
		}
		$( "#sortable" ).sortable();
		$('.checkbox').checkbox();
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