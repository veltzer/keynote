/*
This is an example of a set implemented in javascript

	Mark Veltzer
*/
var Set=function() {
	this.items={}
	for(var i in arguments) {
		this.add(arguments[i]);
	}
}
Set.prototype.add=function(o) {
	this.items[o]=true;
}
Set.prototype.remove=function(o) {
	delete this.items[o];
}
Set.prototype.addObject=function(o) {
	for(var prop in o) {
		this.add(prop);
	}
}
Set.prototype.removeObject=function(o) {
	for(var prop in o) {
		this.remove(prop);
	}
}
Set.prototype.clear=function(o) {
	this.items={}
}
Set.prototype.toString=function(o) {
	var a=[];
	for(var x in this.items) {
		a.push(x);
	}
	return a.join(',');
}
Set.prototype.foreach=function(func) {
	for(var x in this.items) {
		func(x);
	}
}
