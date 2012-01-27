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
	this.d_top=$('<div/>').addClass('templateTop');
	this.lr=new LayoutRatio({
		'ratio':1.33,
	});
	this.d_top.data('data',this.lr);

	this.d=$('<div/>');
	this.l1=new LayoutRelative({
		'orientation':'vertical',
	});
	this.d.data('layout',this.l1);
	this.d_top.append(this.d);
	this.lr.addElement(this.d);

	this.d1=$('<div/>').addClass('template1');
	this.d2=$('<div/>').addClass('template2');
	this.d3=$('<div/>').addClass('template3');
	this.d4=$('<div/>').addClass('template4');
	this.d5=$('<div/>').addClass('template5');
	this.d6=$('<div/>').addClass('template6');
	this.d.append(this.d1);
	this.d.append(this.d2);
	this.d.append(this.d3);
	this.d.append(this.d4);
	this.d.append(this.d5);
	this.d.append(this.d6);
	this.l1.addElement(this.d1,0.23);
	this.l1.addElement(this.d2,0.67);
	this.l1.addElement(this.d3,0.10);
	this.l2=new LayoutRelative({
		'orientation':'horizontal',
	});
	this.l2.addElement(this.d4,0.08);
	this.l2.addElement(this.d5,0.84);
	this.l2.addElement(this.d6,0.08);
	this.d2.data('layout',this.l2);
	// connect the flow layout
	this.l3=new LayoutFlow({ 'lines':10 });
	this.d5.data('layout',this.l3);
	// connect the flow layout
	this.l4=new LayoutFlow({ 'lines':1 });
	this.d1.data('layout',this.l4);
	// handle resizes
	this.resize();
	$(window).resize(function() {
		object.resize();
	});
	// append
	$(this.id).append(this.d_top);
}
TemplateTitleBullets.prototype.addElement=function(role,element) {
	if(role=='title') {
		this.d1.append(element);
		this.l4.addElement(element);
		this.resize();
	}
	if(role=='bullet') {
		this.d5.append(element);
		this.l3.addElement(element);
		this.resize();
	}
}
TemplateTitleBullets.prototype.resize=function() {
	this.lr.resize(0,0,$(window).width(),$(window).height());
}
