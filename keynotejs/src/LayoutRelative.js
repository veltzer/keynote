/*jsl:import LayoutResolver.js*/
/*jsl:import jqutils.js*/
/*jsl:import Utils.js*/

/*
 * This is a layout manager that divides it's vertical space in a relative way.
 * This object must receive orientation as parameter in the config.
 */
function LayoutRelative(options) {
  checkHasOnly(options, new Set('orientation'));
  this.checkOrientation(options.orientation);
  this.orientation = options.orientation;
  this.elements = [];
  this.sizes = [];
  this.doDebug = false;
  this.debug('created LayoutRelative');
}
LayoutRelative.orientation = {
  horizontal: null,
  vertical: null
};
LayoutRelative.prototype.checkOrientation = function(orientation) {
  if (!(orientation in LayoutRelative.orientation)) {
    throw 'bad orientation ' + orientation;
  }
};
LayoutRelative.prototype.debug = function() {
  if (this.doDebug) {
    $.each(arguments, function(i,msg) {
      Utils.fakeUse(i);
      console.log(msg);
    });
  }
};
LayoutRelative.prototype.addElement = function(elem,size) {
  this.debug('addElement ' + elem + ',' + size);
  this.elements.push(elem);
  this.sizes.push(size);
};
LayoutRelative.prototype.checkAddToOne = function() {
  var sum = 0;
  $.each(this.sizes, function(i,size) {
    Utils.fakeUse(i);
    sum += size;
  });
  if (checkCloseTo(sum, 1, 0.00001)) {
    throw 'sum!=1, sum=' + sum;
  }
};
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. It should do the rest.
 */
LayoutRelative.prototype.resize = function(x,y,width,height) {
  // for closure
  var object = this;
  // round up
  x = Math.round(x);
  y = Math.round(y);
  width = Math.round(width);
  height = Math.round(height);
  // debug
  this.debug('resize: ' + x + ',' + y + ',' + width + ',' + height);
  this.debug('this.elements.length: ' + this.elements.length);
  this.checkAddToOne();
  if (this.orientation == 'vertical') {
    var y_start = y;
    $.each(this.elements, function(i,element) {
      var size = object.sizes[i];
      var cur_size = Math.round(height * size);
      //var cur_size=height*size;
      element.posAbs4(x, y_start, width, cur_size);
      y_start += cur_size;
    });
  } else {
    var x_start = x;
    $.each(this.elements, function(i,element) {
      var size = object.sizes[i];
      var cur_size = Math.round(width * size);
      //var cur_size=width*size;
      element.posAbs4(x_start, y, cur_size, height);
      x_start += cur_size;
    });
  }
};
LayoutResolver.getInstance().addLayoutManager('relative', LayoutRelative);
