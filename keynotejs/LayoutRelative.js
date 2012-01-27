/*
 * This is a layout manager that divides it's vertical space in a relative way.
 * This object must receive orientation as parameter in the config.
 */
function LayoutRelative(config) {
	this.checkOrientation(config.orientation);
	this.orientation=config.orientation;
	this.elements=[];
	this.sizes=[];
	this.doDebug=false;
	this.debug('created LayoutRelative');
}
LayoutRelative.orientation={
	'horizontal':null,
	'vertical':null,
};
LayoutRelative.prototype.checkOrientation=function(orientation) {
	if(!(orientation in LayoutRelative.orientation)) {
		throw 'bad orientation '+orientation;
	}
}
LayoutRelative.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			console.log(msg);
		});
	}
}
LayoutRelative.prototype.addElement=function(elem,size) {
	this.debug('addElement '+elem+','+size);
	this.elements.push(elem);
	this.sizes.push(size);
}
LayoutRelative.prototype.checkAddToOne=function() {
	var sum=0;
	$.each(this.sizes,function(i,size) {
		sum+=size;
	});
	if(checkCloseTo(sum,1,0.00001)) {
		throw 'sum!=1, sum='+sum;
	}
}
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. It should do the rest.
 */
LayoutRelative.prototype.resize=function(x,y,width,height) {
	// for closure
	var object=this;
	this.debug('resize: '+x+','+y+','+width+','+height);
	this.debug('this.elements.length: '+this.elements.length);
	this.checkAddToOne();
	if(this.orientation=='vertical') {
		var y_start=y;
		$.each(this.elements,function(i,element) {
			var size=object.sizes[i];
			var cur_size=Math.round(height*size);
			element.posAbs4(x,y_start,width,y+cur_size);
			y_start+=cur_size;
		});
	} else {
		var x_start=x;
		$.each(this.elements,function(i,element) {
			var size=object.sizes[i];
			var cur_size=Math.round(width*size);
			element.posAbs4(x_start,y,x+cur_size,height);
			x_start+=cur_size;
		});
	}
}
LayoutResolver.getInstance().addLayoutManager('relative',LayoutRelative);
