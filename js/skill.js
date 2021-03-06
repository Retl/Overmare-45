var Skill = function (theBase, theName)
{

	if (typeof theBase == "undefined") {theBase = 0;} //If this constructor is called and no base is given, assume 0.
	//Properties
	const cap = 100; //Hard limit. If the sum of the skill exceeds this value, it will return this at most.
	
	this.myName = theName;
	this.base = theBase; //This is the core of a skill stat. Usually changes with level.
	this.tag = 0;  //Typically a +15 boost to a skill. Assigned at chargen to a max of three skills. A fourth can be set with a special perk.
	this.rank = 0;  //When a unit levels up, they may assign skillpoints into a skill's rank until the total for that skill reaches 100 (ignoring temporary boosts).
	this.perk = 0;  //Changed when a perk is added or removed to a unit that affects the amount of points in a skill.
	this.item = 0;  //Changed when items are equipped or unequipped that boost skills.
	this.misc = 0;  // Points from books or anything else that would affect a skill's points. Often temporary.
	
	//Accessor Methods
	this.getTotal = function ()
	{
		if (!Utilities.isDefined(Controller) || !Controller.useMadModdRules || this.tag <= 0)
		{
			return this.base + this.tag + this.rank + this.perk +  this.item + this.misc;
		}
		else
		{
			//In Mad Modd rules, tag skills get an extra 2 points of value for the first 15 ranks gained.
			//This section also does NOT occur if there are no tag points.
			var bonusElig = Utilities.clamp(this.rank, 0, 15);
			return this.base + this.tag + (bonusElig * 2) + (this.rank - bonusElig) + this.perk +  this.item + this.misc;
		}
	};
	
	//Mutator Methods
	this.setBase = function (value)
	{
		this.base = value;
	};
	
	this.setTag = function (value)
	{
		if (value == true || value == 15 || value == "15") //If we wanted to reuse this for some other game, we might not want this hard-coded. Leaving it here to prevent problems for this implementation. - Moore
		{
			this.tag = 15;
		}
		else if (value == false || value == 0 || value == "0")
		{
			this.tag = 0;
		}
		else
		{
			console.log("Attempted to set a value (" + value +") that was neither true, false, 15, or 0 for a skill's tag.");
		}
	};
	
	this.addRank = function (value)
	{
		done = false;
		if (this.rank + value <= this.getCap())
		{
			done = true;
			this.rank += value;
		}
		return done;
	};
	
	function theCap() {return cap;}
	
	this.getCap = function ()
	{
		return theCap();
	};
	
	this.isMaxed = function ()
	{
		result = false;
		if (this.rank + this.base >= this.getCap())
		{
			result = true;
		}
		return result;
	};
	
	//Return an instance.
	//console.log(this);
	return this;
};

Skill.compareSkills = function (a, b) 
{
	//Used for sorting. Subtracts B from A and returns the result. 
	//Array sort would interpret a positive result as A being > B, and sort A later in the array than B.	
	return a.getTotal() - b.getTotal();
};