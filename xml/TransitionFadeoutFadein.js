// the fadeout/fadein transition manager
function TransitionFadeoutFadein(options) {
	if(!('delay' in options)) {
		options.delay=1000;
	}
	this.delay=options.delay;
}
TransitionFadeoutFadein.prototype.postCreate=function(elem) {
	//elem.hide();
	elem.fadeOut(0);
}
TransitionFadeoutFadein.prototype.transitionIn=function(elem) {
	//elem.show();
	//elem.css('display','none');
	elem.fadeIn(this.delay);
}
TransitionFadeoutFadein.prototype.transitionOut=function(elem) {
	elem.fadeOut(this.delay);
	//elem.hide();
}
