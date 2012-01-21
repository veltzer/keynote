/*
 * This is a center layout manager. It puts a collection of elements smack in the middle of its display.
 */
function LayoutCenter() {
	this.elements=[];
	this.doDebug=true;
}
LayoutCenter.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			console.log(msg);
		});
	}
}
LayoutCenter.prototype.addElement=function(elem) {
	this.elements.push(elem);
}
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. He should do the rest.
 */
LayoutCenter.prototype.resize=function(x,y,width,height) {
	// closure
	var object=this;
	this.debug('resize',x,y,width,height);
	var sum_height=0;
	$.each(this.elements,function(i,element) {
		sum_height+=element.height();
	});
	this.debug('sum_height: '+sum_height);
	var y_start=(height-sum_height)/2;
	var x_center=x+width/2;
	$.each(this.elements,function(i,element) {
		element.offset({
			'top':y_start,
			'left':x_center-element.width()/2,
		});
		y_start+=element.height();
	});
}
