/*
 * This is a layout manager that keeps a centralised box of a certain ratio.
 *
 * 	Mark Veltzer
 */
function LayoutRatio(options) {
	checkExact(options,new Set('ratio'));
	this.ratio=options.ratio;
	this.element=undefined;
	this.doDebug=false;
}
LayoutRatio.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			console.log(msg);
		});
	}
}
LayoutRatio.prototype.addElement=function(elem,size) {
	this.debug('addElement '+elem+','+size);
	if(this.element!=undefined) {
		throw 'already have element';
	}
	this.element=elem;
}
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. It should do the rest.
 */
LayoutRatio.prototype.resize=function(x,y,width,height) {
	// for closure
	var object=this;
	// debug
	this.debug('resize: '+x+','+y+','+width+','+height);
	// lets check what is the situation...
	if(width/height>this.ratio) {
		var needed_width=height*this.ratio;
		var side=(width-needed_width)/2;
		this.element.posAbs4(x+side,y,needed_width,height);
	} else {
		var needed_height=width/this.ratio;
		var side=(height-needed_height)/2;
		this.element.posAbs4(x,y+side,width,needed_height);
	}
}
LayoutResolver.getInstance().addLayoutManager('ratio',LayoutRatio);
