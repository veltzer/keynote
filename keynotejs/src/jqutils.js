// A few enhancements to jQuery
$.fn.posAbs = function(pos_left, pos_top) {
  return this.each(function() {
    $(this).css({
      //position: 'absolute', // to make sure it's absolute
      position: 'fixed', // to make sure it's absolute
      marginLeft: 0, // to make sure there are no margins
      marginTop: 0, // to make sure there are no margins
      top: pos_top,
      left: pos_left
    });
  });
};
$.fn.posAbs4 = function(x, y, width, height) {
  x = Math.round(x);
  y = Math.round(y);
  width = Math.round(width);
  height = Math.round(height);
  //console.debug('posAbs4: '+x+','+y+','+width+','+height);
  this.css({
    position: 'fixed', // to make sure it's fixed
    marginLeft: 0, // to make sure there are no margins
    marginTop: 0, // to make sure there are no margins
    overflow: 'hidden', // to make sure that we don't step out of bounds
    left: x,
    top: y,
    width: width,
    height: height
  });
  if ('layout' in this.data()) {
    //console.debug(l);
    var l = this.data('layout');
    l.resize(x, y, width, height);
  }
};

function measureText(text, fontsize) {
  var elem = $('<span>').text(text).css('font-size', fontsize + 'px');
  elem.hide();
  $('body').append(elem);
  var ret = {
    width: elem.width(),
    height: elem.height()
  };
  elem.detach();
  return ret;
}

function measureElem(e, fontsize) {
  var elem = e.clone().css('font-size', fontsize + 'px');
  elem.hide();
  $('body').append(elem);
  var ret = {
    width: elem.width(),
    height: elem.height()
  };
  elem.detach();
  return ret;
}
function checkMustHave(o, set) {
  for (var item in set.items) {
    if (!(item in o)) {
      throw 'must have item ' + item;
    }
  }
}
function checkHasOnly(o, set) {
  for (var item in o) {
    if (!(item in set.items)) {
      throw 'unrecognized item ' + item;
    }
  }
}
function checkExact(o, set) {
  checkMustHave(o, set);
  checkHasOnly(o, set);
}
function checkCloseTo(v, u, e) {
  if (!(u - e < v && v < u + e)) {
    throw 'value out of bounds';
  }
}
