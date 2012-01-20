// the hide/show transition manager
function HideShow(options) {
	// no internal state
}
HideShow.prototype.postCreate=function(elem) {
	elem.hide();
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
FadeoutFadein.prototype.postCreate=function(elem) {
	elem.hide();
}
FadeoutFadein.prototype.transitionIn=function(elem) {
	elem.show();
	elem.css('display','none');
	elem.fadeIn(this.delay);
}
FadeoutFadein.prototype.transitionOut=function(elem) {
	elem.fadeOut(this.delay);
	elem.hide();
}

// a single slide object
function Slide() {
	this.title='no title';
	this.element=undefined;
}

Slide.prototype.setElement=function(elem) {
	this.element=elem;
}
Slide.prototype.getElement=function() {
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
		function(doc) {
			myobj.buildUp(doc);
			myobj.stopWait();
			myobj.hookKeyboard();
			myobj.highlight();
		},
		'xml'
	);
	ajax.error(function(ajax_object,error_string,t) {
		document.write('bad presentation with error ['+error_string+']['+String(t).substring(0,40)+']');
		myobj.stopWait();
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
Mgr.prototype.getTextFromSingleXpath=function(doc,xpath_expr) {
	var l=doc.evaluate(xpath_expr,doc.documentElement,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(l.snapshotLength!=1) {
		console.log(l.snapshotLength);
		console.log(typeof(l));
		console.log(l.constructor);
		for (var i=0;i<l.snapshotLength;i++) {
			console.log(l.snapshotItem(i));
		}
		throw 'wrong number ('+l.snapshotLength+') of elements for expression '+xpath_expr;
	}
	return l.snapshotItem(0).textContent;
}
Mgr.prototype.getTextFromSingleNode=function(doc,name) {
	var l=doc.getElementsByTagName(name);
	if(l.length!=1) {
		throw 'too many elements of name '+name;
	}
	return l[0].textContent;
}
Mgr.prototype.checkOneChild=function(node) {
	if(node.childNodes.length!=1) {
		throw 'wrong number of childern for node '+node;
	}
}
Mgr.prototype.checkNoChildren=function(node) {
	if(node.childNodes.length!=0) {
		throw 'too many children for node '+node;
	}
}
Mgr.prototype.createElement=function(node) {
	// for closure
	var mgr=this;
	// debug
	//console.log(node);
	// 3 means text node
	if(node.nodeType==3) {
		var e_item=$('<span/>',{'class':'text'}).text(node.textContent);
		return e_item;
	}
	// 1 means element 
	if(node.nodeType==1) {
		if(node.localName=='code') {
			this.checkOneChild(node);
			var e_item=$('<pre/>');
			if(node.hasAttribute('language')) {
				e_item.addClass('brush: '+node.getAttribute('language'));
			}
			e_item.text(node.textContent);
			return e_item;
		}
		if(node.localName=='image') {
			this.checkNoChildren(node);
			// TODO: what about the height and width of the images ?
			var e_item=$('<img/>',{
				'class':node.localName,
				'src':node.getAttribute('url'),
				'alt':node.getAttribute('description'),
			});
			return e_item;
		}
		if(node.localName=='email') {
			this.checkNoChildren(node);
			var e_item=$('<a/>',{
				'class':node.localName,
				'href':'mailto:'+node.getAttribute('value'),
			});
			e_item.text(node.getAttribute('value'));
			return e_item;
		}
		// non atomics (title, bullet)
		var e_item=$('<div/>',{'class':node.localName});
		$.each(node.childNodes,function(index,child) {
			e_item.append(mgr.createElement(child));
		});
		return e_item;
	}
}
Mgr.prototype.buildUp=function(doc) {
	this.title=this.getTextFromSingleXpath(doc,'/presentation/meta/title');
	this.copyright=this.getTextFromSingleNode(doc,'copyright');
	// for closure
	var mgr=this;
	// create the various pages
	$.each(doc.getElementsByTagName('slide'),function(index,slide) {
		var s=new Slide();
		s.setElement(mgr.createElement(slide));
		mgr.slides.push(s);
		mgr.transition.postCreate(s.getElement());
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
		'source':'keynote.xml',
		'transition':new FadeoutFadein({'delay':1000})
	});
});
