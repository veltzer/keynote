/*
 * Layout:
 * d1
 *
 * d2
 *
 *    d4           d5         d6
 *
 * d3
 */
function TemplateTitleBullets(options) {
	// for closure
	var object=this;
	// handle arguments
	checkHasOnly(options,new Set('id'));
	this.id=options.id;
	// create the structure
	this.top=$('<div/>');
	this.d1=$('<div/>');
	this.d2=$('<div/>');
	this.d3=$('<div/>');
	this.d4=$('<div/>');
	this.d5=$('<div/>');
	this.d6=$('<div/>');
	this.top.append(this.d1);
	this.top.append(this.d2);
	this.top.append(this.d3);
	this.d2.append(this.d4);
	this.d2.append(this.d5);
	this.d2.append(this.d6);
	this.l1=new LayoutRelative({
		'orientation':'vertical',
	});
	this.l1.addElement(this.d1,0.20);
	this.l1.addElement(this.d2,0.70);
	this.l1.addElement(this.d3,0.10);
	this.l2=new LayoutRelative({
		'orientation':'horizontal',
	});
	this.l2.addElement(this.d4,0.10);
	this.l2.addElement(this.d5,0.80);
	this.l2.addElement(this.d6,0.10);
	this.d2.data('layout',this.l2);
	// connect the flow layout
	this.l3=new LayoutFlow({ 'lines':8 });
	this.d5.data('layout',this.l3);
	// handle resizes
	this.resize();
	$(window).resize(function() {
		object.resize();
	});
	// append
	$(this.id).append(this.top);
}
TemplateTitleBullets.prototype.addElement=function(role,element) {
	if(role=='title') {
		this.d1.append(element);
	}
	if(role=='bullet') {
		this.d5.append(element);
		this.l3.addElement(element);
		this.resize();
	}
}
TemplateTitleBullets.prototype.resize=function() {
	this.l1.resize(0,0,$(window).width(),$(window).height());
}
