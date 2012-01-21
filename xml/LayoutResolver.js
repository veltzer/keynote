/*
 * This object maps names of layout managers to the actualy classes.
 * The main code should only use this object to create and configure layout managers.
 *
 * This is a singleton class.
 *
 * This object should be included before any layout manager so that they could attach
 * themselves to it.
 */
function LayoutResolver() {
	this.map={};
	this.doDebug=false;
	this.debug('created LayoutResolver');
}
LayoutResolver.prototype.debug=function() {
	if(this.doDebug) {
		$.each(arguments,function(i,msg) {
			console.log(msg);
		});
	}
}
LayoutResolver.prototype.addLayoutManager=function(name,constructor) {
	this.debug('addLaytoutManager: '+name+',',constructor);
	this.map[name]=constructor;
}
/*
 * This is a the main function.
 */
LayoutResolver.prototype.createLayoutManager=function(name,config) {
	this.debug('createLayoutManager: '+name+','+config);
	return new this.map[name](config);
}
/*
 * A singleton access pattern
 */
LayoutResolver.instance=new LayoutResolver();
LayoutResolver.getInstance=function() {
	return LayoutResolver.instance;
}
