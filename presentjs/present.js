// the hide/show transition manager
function HideShow(options) {
	// no internal state
}
HideShow.prototype.transitionIn=function(elem) {
	elem.show();
}
HideShow.prototype.transitionOut=function(elem) {
	elem.hide();
}

// the fadeout/fadein transition manager
function FadeoutFadein(options) {
	if(!('delay' in options)) {
		throw 'must pass delay';
	}
	this.delay=options.delay;
}
FadeoutFadein.prototype.transitionIn=function(elem) {
	elem.show();
	elem.css('display','none');
	elem.fadeIn(this.delay);
}
FadeoutFadein.prototype.trainsitionOut=function(elem) {
	elem.fadeOut(this.delay);
	elem.hide();
}

// a single slide object
function Slide() {
	this.title='no title';
	this.element=$('<div/>');
	this.element.hide();
}

Slide.prototype.addElement=function(d) {
	this.element.append(d);
}
Slide.prototype.getElement=function(d) {
	return this.element;
}

// the presentation manager object
function Mgr(options) {
	if(!('source' in options)) {
		throw 'must pass source';
	}
	this.source=options.source;
	if(!('transition' in options)) {
		this.transition=new HideShow();
	} else {
		this.transition=options.transition;
	}
	this.startWait();
	this.currentSlideNum=0;
	this.slides=[];
	// for closure
	var myobj=this;
	var ajax=$.get(
		options.source,
		'',
		function(data) {
			myobj.buildUp(data);
			myobj.stopWait();
			myobj.hookKeyboard();
			myobj.highlight();
		},
		'xml'
	);
	ajax.error(function(ajax_object,error_string,t) {
		alert('bad presentation with error ['+error_string+']['+String(t).substring(0,40)+']');
	});
}

Mgr.prototype.hookKeyboard=function() {
	// for closure
	var mgr=this;
	var onefunc=function(e) {
		//console.log(e.keyCode);
		//console.log(e.which);
		// 32 is space, 39 is right arrow, 34 is page down, 40 is down
		if(e.keyCode==32 || e.keyCode==39 || e.keyCode==34 || e.keyCode==40) {
			mgr.gotoNext();
			e.preventDefault();
		}
		// 8 is backspace, 37 is left arrow, 33 is page up, 38 is up
		if(e.keyCode==8 || e.keyCode==37 || e.keyCode==33 || e.keyCode==38) {
			mgr.gotoPrev();
			e.preventDefault();
		}
		// 36 is Home
		if(e.keyCode==36) {
			mgr.gotoBegin();
			e.preventDefault();
		}
		// 35 is End
		if(e.keyCode==35) {
			mgr.gotoEnd();
			e.preventDefault();
		}
	};
	$(document.body).keydown(onefunc);
}
// static methods
Mgr.prototype.getTextFromSingleNode=function(data,name) {
	var l=data.getElementsByTagName(name);
	if(l.length!=1) {
		throw 'too many elements of name '+name;
	}
	return l[0].textContent;
}
Mgr.prototype.buildUp=function(data) {
	this.title=this.getTextFromSingleNode(data,'title');
	this.copyright=this.getTextFromSingleNode(data,'copyright');
	// for closure
	var mgr=this;
	// create the various pages
	$.each(data.getElementsByTagName('slide'),function(index,slide) {
		var s=new Slide();
		var e_title=$('<div/>',{'class':'title'});
		if(slide.hasAttribute('name')) {
			e_title.text(slide.getAttribute('name'));
		} else {
			e_title.text('slide with no name');
		}
		s.addElement(e_title);
		$.each(slide.childNodes,function(index,child) {
			if(child.localName=='code') {
				var e_item=$('<pre/>');
				if(child.hasAttribute('language')) {
					e_item.addClass('brush: '+child.getAttribute('language'));
				}
				e_item.text(child.textContent);
				s.addElement(e_item);
			}
			if(child.localName=='bullet') {
				var e_item=$('<div/>',{'class':child.localName});
				e_item.text(child.textContent);
				s.addElement(e_item);
			}
			if(child.localName=='image') {
				var e_item=$('<div/>',{'class':child.localName});
				// TODO: fix up this code
				e_item.text(child.textContent);
				s.addElement(e_item);
			}
		});
		mgr.slides.push(s);
		$(document.body).append(s.getElement());
	});
	this.transition.transitionIn(this.getCurrentElement());
}
Mgr.prototype.getCurrentSlide=function() {
	return this.slides[this.currentSlideNum];
}
Mgr.prototype.getCurrentElement=function() {
	return this.getCurrentSlide().getElement();
}
Mgr.prototype.getSlideNum=function() {
	return this.slides.length;
}
Mgr.prototype.debug=function() {
	console.log('I have '+this.getSlideNum()+' slides');
}
Mgr.prototype.startWait=function() {
	document.body.style.cursor='wait';
	document.title='loading...';
}
Mgr.prototype.stopWait=function() {
	document.body.style.cursor='default';
	document.title=this.title;
}
Mgr.prototype.gotoSlide=function(num) {
	if(num>=0 && num<this.getSlideNum()) {
		this.transition.transitionOut(this.getCurrentElement());
		this.currentSlideNum=num;
		this.transition.transitionIn(this.getCurrentElement());
	}
}
Mgr.prototype.gotoNext=function() {
	this.gotoSlide(this.currentSlideNum+1);
}
Mgr.prototype.gotoPrev=function() {
	this.gotoSlide(this.currentSlideNum-1);
}
Mgr.prototype.gotoBegin=function() {
	this.gotoSlide(0);
}
Mgr.prototype.gotoEnd=function() {
	this.gotoSlide(this.getSlideNum()-1);
}
Mgr.prototype.highlight=function() {
	function path() {
		var args=arguments;
		var result=[];
		for(var i=0;i<args.length;i++) {
			result.push(args[i].replace('@','toolkits/sh/scripts/'));
		}
		return result
	};
	SyntaxHighlighter.autoloader.apply(null, path(
		'applescript @shBrushAppleScript.js',
		'actionscript3 as3 @shBrushAS3.js',
		'bash shell @shBrushBash.js',
		'coldfusion cf @shBrushColdFusion.js',
		'cpp c @shBrushCpp.js',
		'c# c-sharp csharp @shBrushCSharp.js',
		'css @shBrushCss.js',
		'delphi pascal @shBrushDelphi.js',
		'diff patch pas @shBrushDiff.js',
		'erl erlang @shBrushErlang.js',
		'groovy @shBrushGroovy.js',
		'java @shBrushJava.js',
		'jfx javafx @shBrushJavaFX.js',
		'js jscript javascript @shBrushJScript.js',
		'perl pl @shBrushPerl.js',
		'php @shBrushPhp.js',
		'text plain @shBrushPlain.js',
		'py python @shBrushPython.js',
		'ruby rails ror rb @shBrushRuby.js',
		'sass scss @shBrushSass.js',
		'scala @shBrushScala.js',
		'sql @shBrushSql.js',
		'vb vbnet @shBrushVb.js',
		'xml xhtml xslt html @shBrushXml.js'
	));
	SyntaxHighlighter.defaults['toolbar'] = false;
	SyntaxHighlighter.all();
}
$(document).ready(function() {
	var mgr=new Mgr({
		'source':'present.xml'
	});
});
