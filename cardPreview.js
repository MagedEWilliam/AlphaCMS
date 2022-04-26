function card(target, ItemProp, classes) {
	var drawacard = /*html*/`
	<div class="ui link card longproduct">
		<div class="ui slide masked move up reveal image">
			<div class="content fillitcontent">
				<img src="'+ItemProp.item.image+'" class="front visible content fillitup">
			</div>
	
			<div class="back hidden content heigh">
				<div class="fastdetails">
					<table class="ui very compact striped unstackable table " style="margin-bottom:0;">
						<tbody>
	
							<tr>
								<td class="rtl slpad rpad">
									<img src="${ItemProp.item.image}'" class="thumpimg">
								</td>
								<td class="slpad content">
									<b>${ItemProp.item.Name}'</b>
									<br>
									<p>${ItemProp.item.code}'</p>
								</td>
							</tr>
							${trtd(ItemProp)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="visible content parento">
			<div class=" getdown">
				<div class="ui header">'+ItemProp.item.Name+'</div>
				<div class="meta">'+ItemProp.item.code+'</div>
			</div>
	`;

	if (classes == 'blue') {
		drawacard += /*html*/`<div class="ui tiny action input" id="Qun_${ItemProp.item.code}" style="float:right;width:155px;height:25px;margin-bottom:5px;">
			<input type="number" value="1" style="width:60px;" lass="ui tiny">
			<div type="submit" class="ui tiny icon button minusOne"><i class="ui icon minus"></i></div>
			<div type="submit" class="ui tiny icon button addOne"><i class="ui icon plus"></i></div>
		</div>`;
	}

	drawacard += /*html*/`<label style="float:left;font-size: 17px;margin-bottom: 11px;">$${Number(ItemProp.item.price)}</label>`;

	drawacard += /*html*/`
	<div class=" getdown">
		<div class="ui tiny buttons detailtable">
		<a class="ui yellow small button" id="${ItemProp.item.code}" href="#">
			<p class="goodtimes">Details</p>
		</a>
		<div class="or"></div>
		<a class="ui ${classes} small button"  id="cart_${ItemProp.item.code}" >
			<p class="goodtimes">To Cart</p>
		</a>
		</div>
	</div>
	</div>
	</div>
	</div>
	`;

	drawacard += /*html*/`
	<style>
		.ui.cards>.card>.content{border-top:1px solid rgb(208, 209, 210);}
		.ui.link.card{
			border-radius: 0;
			box-shadow: none;
		}
		.fillitup{width: 100%;}
		.rtl{text-align: right !important;}
		.slpad{padding-left: 4px !important;
			text-overflow:ellipsis;
		}
		.rpad{padding-right: 0 !important;}
		.fastdetails .ui.table{border: none;border-top: 1px solid rgba(34,36,38,.15) !important;}
		.heigh{height: 100%;width: 100%;}
		.miniproducts .longproduct, .miniproducts{float: left;margin-top: 0;}
		.topping{top:45px;}
		.getdown{padding-top: 5px;}
		.detailtable{margin-bottom:0;width:100%;}
		.parento {height : 150px;}
		.thumpimg{width: 50px;}
		</style>`;


	$(target).html('');
	$(target).append(drawacard);
}

function cardPreview() {
	const ItemProp = {
		item: {
			code: ($('[name=code]').val() == "" ? "item code" : $('[name=code]').val()),
			Name: ($('[name=name]').val() == "" ? "Item Name" : $('[name=name]').val()),
			image: ($('[name=url]').val() == "" ? "http://semantic-ui.com/images/wireframe/image.png" : $('[name=url]').val()),
			price: ($('[name=price]').val() == "" ? "00.000" : $('[name=price]').val())
		},
		'Subcategory': getCurrentProperties
	};
	$('#rightview').css('position', 'fixed');
	card('#rightview', ItemProp, 'blue');
}

function trtd(prop) {
	let temp = "";

	$.each($('.properties'), function (i, value) {

		const proper = $(value).find('select')[0];
		const val = $(value).find('select')[1];
		if ($(proper).find('option:selected').text() != "Subcategory") {
			temp += /*html*/`
			<tr>
				${rtlSlpadrPad('rtl Fixedtd slpad rpad', $(proper).find('option:selected').text())}
				<td class="slpad">
				${lblSlpadrPad($(val).find('option:selected').text())}
				</td>
			</tr>`
		}
	});

	return temp;
}

function lblSlpadrPad(val) {
	return /*html*/`<div class="ui label" style="float:left;">${val}</div>`;
}
function rtlSlpadrPad(cls, val) {
	return /*html*/`<td class="${cls}">${val}</td>`;
}
function getCurrentProperties() {
	return {};
}