Utilities = function ()
{
	
};

Utilities.ScrollToBottom = function (elementId) 
{
	theDiv = document.getElementById(elementId);
	if (theDiv != null)
	{
		theDiv.scrollTop = theDiv.scrollHeight;
	}
};

Utilities.AppendToDiv = function (elementId, newContent) 
{
	theDiv = document.getElementById(elementId);
	if (theDiv != null)
	{
		theDiv.innerHTML += newContent;
	}
};

Utilities.ArrayNamesToString = function (a)
{
	//Given an array, cycle through all of its contents check to see if each element has a name, then add that to the result. - Moore.
	var result = "";
	if (typeof a.length != "undefined")
	{
		for (var i = 0; i < a.length; i++)
		{
			if (typeof a[i].myName != "undefined")
			{
				if (i != 0)
				{
					result += ", ";
				}
				result += a[i].myName;
			}
		}
	}
	
	if (result == "")
	{
		result = "Nothing's here.";
	}
	
	return result;
};

Utilities.ArrayNamesToClickableHTML = function (a, onClickString)
{
	//Given an array, cycle through all of its contents check to see if each element has a name, then add that to the result. - Moore.
	var result = "";
	if (typeof a.length != "undefined")
	{
		for (var i = 0; i < a.length; i++)
		{
			if (typeof a[i].myName != "undefined")
			{
				if (i != 0)
				{
					result += ", ";
				}
				result += "<a onclick='"+ onClickString +"("+ i +"))'>";
				result += a[i].myName;
				result += "</a>";
				
			}
		}
	}
	
	if (result == "")
	{
		result = "Nothing's here.";
	}
	
	return result;
};

Utilities.GetSelectedDictionaries = function ()
{
	var selectedDicts = [];
	temp = "";
	if (Namer.flagMLP) {selectedDicts.push(mlpfimNames); temp += "MLP, ";}
	if (Namer.flagFoE) {selectedDicts.push(foevanillanames); temp += "FoE, ";}
	if (Namer.flagFoEU) {selectedDicts.push(foegeneralnames); temp += "FoEU, ";}
	if (Namer.flagFoEPE) {selectedDicts.push(foepinkeyesnames); temp += "FoEPE";}
	return selectedDicts;
};

Utilities.RandomIntInRange = function(min, max)
{
	//This is an inclusive range. - Moore.
	var range = Math.abs(max - min) + 1;
	return Math.floor((Math.random() * range) + min);
};

Utilities.RandomInArray = function(a)
{
	return Utilities.RandomIntInRange(0, a.length - 1);
};

Utilities.WriteNoLine = function (newContent) 
{
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.AppendToDiv('main', newContent);
	Utilities.ScrollToBottom('main');
};

Utilities.Write = function (newContent) 
{
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.WriteNoLine(newContent + '<br />');
};


Utilities.IsNumber = function (input)
{
	//Check the input to see if AT LEAST the first character is a digit. If it is, true. If this isn't a number, return false.
	return !isNaN( parseFloat(input) );
};

Utilities.copyToClipboard = function (text) //Based on a snippet from http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript to get around the unsafe copy.
{
  return window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
};

//START OF: Saving and Loading Utility Methods.
Utilities.save = function () //Based on a snippet from http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript to get around the unsafe copy.
{
	save = JSON.stringify(selectedSettlement);
	localStorage.setItem("save", save);
	Utilities.Write("Save data stored successfully.");
	return save;
}

Utilities.load = function () //Based on a snippet from http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript to get around the unsafe copy.
{
	//Overwrite current data with the save data from storage.
	var loaded = null;
	save = localStorage.getItem("save");
	//Only do it if there is save data present.
	if (typeof save != "undefined" && save != null)
	{
		loaded = JSON.parse(save, Settlement.reviver);
		selectedSettlement = loaded;
		selectedUnit = selectedSettlement.getResident(0);
		Utilities.Write("Loading... Restore complete.");
	}
	else
	{
		Utilities.Write("Load data error. Restore failed.");
	}
	
	
	return loaded;
}

Utilities.deleteSave = function () //Based on a snippet from http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript to get around the unsafe copy.
{
	//Delete the save data.
	save = null;
	localStorage.removeItem("save");
	Utilities.Write("Save data deleted successfully.");
	return save;
}


//END OF: Saving and Loading Utility Methods.