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
	};
	
	this.IsHomeOf = function (theResident)
	{
		var result = false;
		if ( residents.indexOf(theResident) != -1)
		{
			result = true;
		}
		return result;
	};
	
	this.listResidents = function ()
	{
		return Utilities.ArrayNamesToString(residents);
	};
	
	this.listResidentsClickable = function ()
	{
		return Utilities.ArrayNamesToClickableHTML(residents, "handle_btn_selectUnitInSettlement(selectedSettlement.getResident");
	};
	
	this.getResident = function (i)
	{
		return residents[i];
	};
	
	this.getResidents = function ()
	{
		return residents.slice();
	};
	
	this.setResidents = function (newRes)
	{
		residents = newRes; //Careful not to accdidentally use 'this' here. It's a private variable. - Moore.
	};
	
	this.hourly = function ()
	{
		//Behaviour that should be done for every hour that passes. - Moore.
		for (var i = 0; i < residents.length; i++)
		{
			residents[i].hourly();
		}
		
	};
	
	this.ToString = function ()
	{
		return this.myName + " | Residents: "+ this.listResidentsClickable() + "<br />";
	};
	
	this.getName = function ()
	{
		return this.myName;
	};
	
	this.DisplayLocation = function()
	{
		Utilities.WriteNoLine(" - LOCATION: " + selectedSettlement.myName + ".");
	};
};

Settlement.prototype.toJSON = function ()
{
	var result = {};
	result.myName = this.myName;
	result.residents = this.getResidents();
	//result += JSON.stringify(this.getName());
	//result += JSON.stringify(this.getResidents());
	return result;
};
	
Settlement.reviver = function (prop, val)
{
	var result;
	if (prop == "")
	{
		result = new Settlement();
		result.myName = val.myName;
		
		//We know all of the contents of residents should be Units.
		//Therefore, we iterate through the contents and convert them to units.

		for (var i = 0; i < val.residents.length; i++)
		{
			//console.log(val.residents[i]);
			var temp = JSON.stringify(val.residents[i]);
			temp = JSON.parse(temp, Unit.reviver);
			val.residents[i] = temp;
		}
		
		result.setResidents(val.residents);
		
	}
	else
	{
		result = val; //Return all other properties without transforming them. DON'T FORGET THIS. - Moore.
	}

	return result;
};

