/*jsl:import Utils.js*/


/**
  @class Map names of layout managers to the actualy classes.
  The main code should only use this object to create and configure
  layout managers.
  This is a singleton class.
  This object should be included before any layout manager so that
  they could attach themselves to it.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var LayoutResolver = Class.create(/** @lends LayoutResolver# */{
  initialize: function() {
    this.map = {};
    this.doDebug = false;
    this.debug('created LayoutResolver');
  },
  debug: function() {
    if (this.doDebug) {
      jQuery.each(arguments, function(i, msg) {
        Utils.fakeUse(i);
        console.log(msg);
      });
    }
  },
  addLayoutManager: function(name, constructor) {
    this.debug('addLaytoutManager: ' + name + ',', constructor);
    this.map[name] = constructor;
  },
  /*
   * This is a the main function.
   */
  createLayoutManager: function(name, config) {
    this.debug('createLayoutManager: ' + name + ',' + config);
    return new this.map[name](config);
  }
});


/*
 * A singleton access pattern
 */
LayoutResolver.instance = new LayoutResolver();
LayoutResolver.getInstance = function() {
  return LayoutResolver.instance;
};
