/*
 * This is a center layout manager. It puts a collection of elements smack in the middle of its display.
 */
function LayoutFlow(config) {
	this.elements=[];
	this.doDebug=false;
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
	if(this.elements.length>this.lines) {
		console.error('too many lines for slide '+this.elements.length+' > '+this.lines);
	}
	var row_height=height/this.lines;
	this.debug('row_height is '+row_height);
	var sum_height=this.elements.length*row_height;
	var y_start=0;
	$.each(this.elements,function(i,element) {
		element.css('font-size',row_height+'px');
		element.posAbs(y_start,0);
		y_start+=row_height;
	});
}
LayoutResolver.getInstance().addLayoutManager('flow',LayoutFlow);
