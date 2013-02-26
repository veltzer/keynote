/*
 * a single slide object
 *
 *   Mark Veltzer
 */
function Slide() {
  this.title = 'no title';
  this.element = undefined;
}
Slide.prototype.setElement = function(elem) {
  this.element = elem;
};
Slide.prototype.getElement = function() {
  return this.element;
};
