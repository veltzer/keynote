// the fadeout/fadein transition manager
//
// This transition manager makes the first slide disapper and ONLY THEN
// makes the second slide appear.
function TransitionFadeoutFadein(options) {
	if(!('delay' in options)) {
		options.delay=1000;
	}
	this.delay=options.delay;
}
TransitionFadeoutFadein.prototype.postCreate=function(elem) {
	elem.fadeOut(0);
};
TransitionFadeoutFadein.prototype.transitionIn=function(elem) {
	elem.fadeIn(this.delay);
};
TransitionFadeoutFadein.prototype.transitionOut=function(elem) {
	elem.fadeOut(this.delay);
};
TransitionFadeoutFadein.prototype.transitionOutIn=function(elem1,elem2) {
	// for closure
	var object=this;
	elem1.fadeOut(this.delay,function() { elem2.fadeIn(object.delay); });
};
