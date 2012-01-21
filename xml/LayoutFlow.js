/*
 * This is a center layout manager. It puts a collection of elements smack in the middle of its display.
 */
function LayoutFlow(config) {
	this.elements=[];
	this.doDebug=true;
	this.debug('created LayoutFlow');
	this.protect=true;
	this.lines=config.lines;
}
LayoutFlow.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			console.log(msg);
		});
	}
}
LayoutFlow.prototype.addElement=function(elem) {
	this.debug('addElement '+elem);
	this.elements.push(elem);
}
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. He should do the rest.
 */
LayoutFlow.prototype.resize=function(x,y,width,height) {
	this.debug('resize: '+x+','+y+','+width+','+height+','+this.elements.length);
	var sum_height=0;
	$.each(this.elements,function(i,element) {
		sum_height+=element.height();
	});
	this.debug('sum_height: '+sum_height);
	if(this.protect && sum_height==0) {
		return;
	}
	var y_start=(height-sum_height)/2;
	var x_center=x+width/2;
	$.each(this.elements,function(i,element) {
		element.posAbs(y_start,x_center-element.width()/2);
		y_start+=element.height();
	});
}
LayoutResolver.getInstance().addLayoutManager('flow',LayoutFlow);
