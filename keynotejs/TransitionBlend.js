// the fadeout/fadein transition manager
function TransitionBlend(options) {
	if(!('delay' in options)) {
		options.delay=1000;
	}
	this.delay=options.delay;
}
TransitionBlend.prototype.postCreate=function(elem) {
	//elem.hide();
	elem.fadeOut(0);
}
TransitionBlend.prototype.transitionIn=function(elem) {
	//elem.show();
	//elem.css('display','none');
	elem.fadeIn(this.delay);
}
TransitionBlend.prototype.transitionOut=function(elem) {
	elem.fadeOut(this.delay);
	//elem.hide();
}
TransitionBlend.prototype.transitionOutIn=function(elem1,elem2) {
	elem1.fadeOut(this.delay);
	elem2.fadeIn(this.delay);
}
