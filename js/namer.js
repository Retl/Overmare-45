var Namer = function ()
{
	//Empty constructor. - Moore
};

Namer.howManyNames = 2;

Namer.makeName = function (numberOfNames, secondArg) //Class/Static Method.
	{
		var result = "";
		var dict = "";
		
		if (secondArg instanceof Array) //If the second argument is an array, ignore the rest and use the contents of that array to define our dictionary.
		{
			for (var i = 0; i < secondArg.length; i++)
			{
				dict += secondArg[i];
			}
		}
		else
		{
			//Take all of the dictionaries given as arguments and combine them.
			for (var i = 1; i < arguments.length; i++) //The first argument is the number of Names to use. Skip that one. - Moore.
			{
				dict += arguments[i];
			}
		}
		
		var dictList = dict.split(",");
		for (var i = 0; i < dictList.length; i++)
		{
			dictList[i] = dictList[i].trim();
		}

		for (var iter = 1; iter <= numberOfNames; iter++)
		{
			var selection = Math.floor(Math.random() * dictList.length);
			result += dictList[selection];
			if (iter+1 <= numberOfNames) {result += " ";}
		}
		return result;
	};
	
	Namer.flagMLP = true;
	Namer.flagFoE = true;
	Namer.flagFoEU = true;
	Namer.flagFoEPE = true;
	
	Namer.toggleDictMLP = function () {Namer.flagMLP = !Namer.flagMLP; return Namer.flagMLP;};
	Namer.toggleDictFoE = function () {Namer.flagFoE = !Namer.flagFoE; return Namer.flagFoE;};
	Namer.toggleDictFoEU = function () {Namer.flagFoEU = !Namer.flagFoEU; return Namer.flagFoEU;};
	Namer.toggleDictFoEPE = function () {Namer.flagFoEPE = !Namer.flagFoEPE; return Namer.flagFoEPE;};