function viewEdit(){
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
			<div class="ui checkbox">\
				<label >\
					Filter by it \
				</label> \
				<input class="thecheckbox" name="filterable" type="checkbox" checked="checked">\
			</div>\
		</div>\
	');
	$('.checkbox').checkbox();
}