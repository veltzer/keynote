/*jsl:import Utils.js*/


/**
  @class the hide/show transition manager.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var TransitionHideShow = Class.create(/** @lends Utils# */{
  /**
    Create a new instance of this class.
    @param {object} configuration options.
    @return {TransitionHideShow} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(options) {
    Utils.fakeUse(options);
    // no internal state
  },
  /**
    postCreate hook.
    @param {Element} elem the element that was created.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  postCreate: function(elem) {
    elem.hide();
  },
  /**
    transitionIn hook.
    @param {Element} elem the element that is to be transitioned in.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  transitionIn: function(elem) {
    elem.show();
  },
  /**
    transitionOut hook.
    @param {Element} elem the element that is to be transitioned out.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  transitionOut: function(elem) {
    elem.hide();
  },
  /**
    transitionOutIn hook.
    @param {Element} elem1 the element that is going out.
    @param {Element} elem2 the element that is going in.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  transitionOutIn: function(elem1, elem2) {
    elem1.hide();
    elem2.show();
  }
});
