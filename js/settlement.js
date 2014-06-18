var Settlement = function ()
{	
	//Private Members. - Moore
	var residents = [];
	
	//Public Members. - Moore
	this.myName = Namer.makeName(1, mlpfimNames, foevanillanames, foegeneralnames, foepinkeyesnames);
	
	//Private Methods. - Moore
	
	
	//public Methods. - Moore
	this.addResident = function (theResident)
	{
		if (residents.indexOf(theResident) == -1)
		{
			residents.push(theResident);
		}
	}
	
	this.listResidents = function ()
	{
		return Utilities.ArrayNamesToString(residents);
	}
	
	this.hourly = function ()
	{
		//Behaviour that should be done for every hour that passes. - Moore.
		for (i = 0; i < residents.length; i++)
		{
			residents[i].hourly();
		}
		
	}
	
	this.ToString = function ()
	{
		return this.myName + " | Residents: "+ this.listResidents() + "<br />";
	}
	
	this.getName = function ()
	{
		return this.myName;
	}
	
	this.DisplayLocation = function()
	{
		Utilities.WriteNoLine(" - LOCATION: " + selectedSettlement.myName + ".");
	}
}

