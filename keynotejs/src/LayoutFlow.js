/*jsl:import Utils.js*/
/*jsl:import jqutils.js*/
/*jsl:import LayoutResolver.js*/

/*
 * This is a center layout manager. It puts a collection of elements smack in the middle of its display.
 */
function LayoutFlow(options) {
  checkMustHave(options, new Set('lines'));
  this.lines = options.lines;
  this.elements = [];
  this.doDebug = false;
  this.debug('created LayoutFlow');
  this.protect = true;
}
LayoutFlow.prototype.debug = function() {
  if (this.doDebug) {
    $.each(arguments, function(i,msg) {
      Utils.fakeUse(i);
      console.log(msg);
    });
  }
};
LayoutFlow.prototype.addElement = function(elem) {
  this.debug('addElement ' + elem);
  this.elements.push(elem);
};
/*
 * This is a the main function. It receives where the widgets under the control
 * of this layout manger should be. He should do the rest.
 */
LayoutFlow.prototype.resize = function(x,y,width,height) {
  this.debug('resize: ' + x + ',' + y + ',' + width + ',' + height + ',' + this.elements.length);
  /*
   * We cannot know that we have too many lines.
   * We will calculate it
  if(this.elements.length>this.lines) {
    console.error('too many lines for slide '+this.elements.length+' > '+this.lines);
  }
  */
  var row_height = height / this.lines;
  this.debug('row_height is ' + row_height);
  //var sum_height=this.elements.length*row_height;
  var y_start = y;
  $.each(this.elements, function(i,element) {
    Utils.fakeUse(i);
    element.css('font-size', row_height * 0.83 + 'px');
    element.posAbs4(x, y_start, width, row_height);
    //y_start+=row_height;
    y_start += element.height();
  });
};
LayoutResolver.getInstance().addLayoutManager('flow', LayoutFlow);
