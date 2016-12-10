function viewManagePage(){
	$('#navbar .dropdown:eq(1)').addClass('active')
	$('#navbar .dropdown:eq(1) .dropdown-menu li:eq(0)').addClass('active');

	$('title').html('Manage Pages');
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
	$('[name=view]').prop('action', 'class_cms.php?method=managePage');
	$('#foot').append('<br><input class="form-control btn-success" type="submit">');
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
						<span class="glyphicon glyphicon-th"></span><b>'+data[i].Name+'</b>\
						<label>Visibility\
							<input type="checkbox" name="visibility['+i+']"';

			if(data[i].Available == '0'){
				vie += '/>';
			}else if(data[i].Available == '1' && Number(data[i].hascontent) > 0.00){
				vie += 'checked/>';
			}
			
			$( '#sortable' ).append(vie + '</label></li>');
		}
		$( "#sortable" ).sortable();
	});
}

viewManagePage();
ajaxPages();