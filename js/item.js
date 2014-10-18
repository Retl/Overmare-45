var Item = function (theName, theWeight, theValue, theDesc) {
	//Properties
	this.myName = "An Item";
	this.weight = 1;
	this.value = 1;
	this.description = "Nothing to see here.";
	
	if (!Utilities.isDefined(theName)) {this.myName = theName;}
	if (!Utilities.isNumber(theWeight)) {this.weight = theWeight;}
	if (!Utilities.isNumber(theValue)) {this.value = theValue;}
	if (!Utilities.isDefined(theDesc)) {this.description = theDesc;}
	
	return this;
};
	
exports.Item = Item;