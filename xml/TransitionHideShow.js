// the hide/show transition manager
function TransitionHideShow(options) {
	// no internal state
}
TransitionHideShow.prototype.postCreate=function(elem) {
	elem.hide();
}
TransitionHideShow.prototype.transitionIn=function(elem) {
	elem.show();
}
TransitionHideShow.prototype.transitionOut=function(elem) {
	elem.hide();
}
