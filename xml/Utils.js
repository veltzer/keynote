// This file is few enhancements to jQuery

$.fn.posAbs=function(pos_top,pos_left) {
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
