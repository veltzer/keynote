/*
 * This is a layout manager that divides it's vertical space in a relative way.
 * This object currently takes no configuration options.
 */
function LayoutRelative(config) {
	this.elements=[];
	this.sizes=[];
	this.doDebug=true;
	this.debug('created LayoutRelative');
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
	if(sum!=1) {
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
	var y_start=y;
	$.each(this.elements,function(i,element) {
		var size=object.sizes[i];
		var cur_size=height*size;
		//element.posAbs(x,y_start);
		element.posAbs4(x,y_start,width,y+cur_size);
		y_start+=cur_size;
	});
}
LayoutResolver.getInstance().addLayoutManager('relative',LayoutRelative);
