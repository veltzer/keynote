/*jsl:import Utils.js*/
/*jsl:import jqutils.js*/
/*jsl:import LayoutResolver.js*/

/*
 * This is a layout manager that only has one child and gives it
 * the full size that it gets.
 *
 * 	Mark Veltzer
 */
function LayoutFull(options) {
	checkExact(options,new Set());
	this.element=undefined;
	this.doDebug=false;
}
LayoutFull.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			Utils.fakeUse(i);
			console.log(msg);
		});
	}
};
LayoutFull.prototype.addElement=function(elem,size) {
	this.debug('addElement '+elem+','+size);
	if(this.element!=undefined) {
		throw 'already have element';
	}
	this.element=elem;
};
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. It should do the rest.
 */
LayoutFull.prototype.resize=function(x,y,width,height) {
	this.element.posAbs4(x,y,width,height);
};
LayoutResolver.getInstance().addLayoutManager('ratio',LayoutFull);
