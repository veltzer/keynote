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
	return this.each(function() {
		$(this).css({
			'position': 'absolute', // to make sure it's absolute
			'marginLeft': 0, // to make sure there are no margins
			'marginTop': 0, // to make sure there are no margins
			'left': x,
			'top': y,
			'width': width,
			'height': height,
		});
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
