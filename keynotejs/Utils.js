// This file is few enhancements to jQuery

$.fn.posAbs=function(pos_left,pos_top) {
	return this.each(function() {
		$(this).css({
			'position': 'absolute', // to make sure it's absolute
			'marginLeft': 0, // to make sure there are no margins
			'marginTop': 0, // to make sure there are no margins
			'top': pos_top,
			'left': pos_left,
		});
	});
}
$.fn.posAbs4=function(x,y,width,height) {
	//console.debug('posAbs4: '+x+','+y+','+width+','+height);
	return this.each(function() {
		$(this).css({
			'position': 'fixed', // to make sure it's fixed
			'marginLeft': 0, // to make sure there are no margins
			'marginTop': 0, // to make sure there are no margins
			'left': x,
			'top': y,
			'width': width,
			'height': height,
		});
		if('layout' in $(this).data()) {
			var l=$(this).data('layout');
			//console.debug(l);
			var l=$(this).data('layout');
			l.resize(x,y,width,height);
		}
	});
}

function measureText(text,fontsize) {
	var elem=$('<span/>').text(text).css('font-size',fontsize+'px');
	elem.hide();
	$('body').append(elem);
	var ret={
		'width':elem.width(),
		'height':elem.height(),
	};
	elem.detach();
	return ret;
}

function measureElem(e,fontsize) {
	var elem=e.clone().css('font-size',fontsize+'px');
	elem.hide();
	$('body').append(elem);
	var ret={
		'width':elem.width(),
		'height':elem.height(),
	};
	elem.detach();
	return ret;
}
function checkMustHave(o,set) {
	for(var item in set.items) {
		if(!(item in o)) {
			throw 'must have item '+item;
		}
	}
}
function checkHasOnly(o,set) {
	for(var item in o) {
		if(!(item in set.items)) {
			throw 'unrecognized item '+item;
		}
	}
}
