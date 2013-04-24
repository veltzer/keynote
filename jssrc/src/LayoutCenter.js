/*jsl:import Utils.js*/
/*jsl:import LayoutResolver.js*/

/*
 * This is a center layout manager.
 * It puts a collection of elements smack in the middle of its display.
 *
 *   Mark Veltzer
 */
function LayoutCenter(config) {
  this.elements = [];
  this.doDebug = false;
  this.debug('created LayoutCenter');
  this.protect = true;
  this.lines = config.lines;
}
LayoutCenter.prototype.debug = function() {
  if (this.doDebug) {
    jQuery.each(arguments, function(i, msg) {
      Utils.fakeUse(i);
      console.log(msg);
    });
  }
};
LayoutCenter.prototype.addElement = function(elem) {
  this.debug('addElement ' + elem);
  this.elements.push(elem);
};
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. He should do the rest.
 */
LayoutCenter.prototype.resize = function(x, y, width, height) {
  this.debug('resize: ' + x + ',' + y + ',' + width + ',' + height +
      ',' + this.elements.length);
  /*
  var sum_height=0;
  jQuery.each(this.elements,function(i,element) {
    sum_height+=element.height();
  });
  this.debug('sum_height: '+sum_height);
  if(this.protect && sum_height==0) {
    return;
  }
  var y_start=(height-sum_height)/2;
  var x_center=x+width/2;
  jQuery.each(this.elements,function(i,element) {
    element.posAbs(x_center-element.width()/2,y_start);
    y_start+=element.height();
  });
  */
  if (this.elements.length > this.lines) {
    console.error('too many lines for slide ' + this.elements.length +
        ' > ' + this.lines);
  }
  var row_height = height / this.lines;
  this.debug('row_height is ' + row_height);
  var sum_height = this.elements.length * row_height;
  var y_start = (height - sum_height) / 2;
  var x_center = x + width / 2;
  jQuery.each(this.elements, function(i, element) {
    Utils.fakeUse(i);
    element.css('font-size', row_height + 'px');
    element.posAbs(x_center - element.width() / 2, y_start);
    y_start += row_height;
  });
};
LayoutResolver.getInstance().addLayoutManager('center', LayoutCenter);
