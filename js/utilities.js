Utilities = function ()
{
	
};

Utilities.ScrollToBottom = function (elementId) 
{
	/*
	theDiv = document.getElementById(elementId);
	if (theDiv != null)
	{
		theDiv.scrollTop = theDiv.scrollHeight;
	}
	*/
};

Utilities.AppendToDiv = function (elementId, newContent) 
{
	/*
	theDiv = document.getElementById(elementId);
	if (theDiv != null)
	{
		theDiv.innerHTML += newContent;
	}
	*/
	console.log(newContent);
};

Utilities.WriteToDiv = function (elementId, newContent) 
{
	/*
	theDiv = document.getElementById(elementId);
	if (theDiv != null)
	{
		theDiv.innerHTML = newContent;
	}
	*/
	console.log(newContent);
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

Utilities.RandomInArray = function(a, b)
{
	//Careful with this thing. It returns a copy of a value from the array as an array just containing that thing. DO NOT USE THIS IF YOU JUST NEED AN INDEX.
	var c;
	var result = [];
	
	if (typeof a != "object")
	{
		c = [];
		result = c;
	}
	else
	{
		c = a.slice();
	}
	
	if (!Utilities.IsNumber(b))
	{
		b = 1;
	}
	
	for (; b > 0 && c.length > 0; b--)
	{
		var sel = Utilities.RandomIntInRange(0, c.length - 1);
		result.push(c.splice(sel,1)[0]);
	}
	
	//This allows this method to return just the object if there's only one thing in the array...'
	//It honestly might be safer to ALWAYS return an array and handle it from whoever's calling it.'
	/*
	if (result.length == 1)
	{
		result = result[0];
	}
	*/
	
	return result;
};

Utilities.WriteNoLine = function (newContent, elementId) 
{
	if (typeof elementId == "undefined")
	{
		elementId = 'main';
	}
	
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.AppendToDiv(elementId, newContent);
	Utilities.ScrollToBottom(elementId);
};

Utilities.Write = function (newContent, elementId) 
{
	if (typeof elementId == "undefined")
	{
		elementId = 'main';
	}
	
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.WriteNoLine(newContent + '\r\n', elementId);
};


Utilities.clamp = function (val, min, max)
{
	val = Math.max(min, val);
	val = Math.min(max, val);
	return val;
};

Utilities.IsNumber = function (input)
{
	//Check the input to see if AT LEAST the first character is a digit. If it is, true. If this isn't a number, return false.
	return !isNaN( parseFloat(input) );
};

Utilities.isDefined = function (input)
{
	//Check the input to see if the type is undefined.
	return !(typeof input == "undefined");
};

Utilities.copyToClipboard = function (text) //Based on a snippet from http://stackoverflow.com/questions/400212/how-to-copy-to-the-clipboard-in-javascript to get around the unsafe copy.
{
  return window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
};

//START OF: Color methods
Utilities.HexToRGB = function (hexstr)
{
	//Find the first six-
	var h = hexstr.match(/[0-9A-F]{6}/gi);
	r = g = b = 00;
	if (hexstr.length > 0)
	{
		r = parseInt('0x' + h[0].slice(0,2));
		g = parseInt('0x' + h[0].slice(2,4));
		b = parseInt('0x' + h[0].slice(4,6));
		
		r = Utilities.clamp(r, 0, 255);
		g = Utilities.clamp(g, 0, 255);
		b = Utilities.clamp(b, 0, 255);
	}
	else
	{
		console.log("Warning: Couldn't find the proper rgb color values from the given string. Defaulting to 000000.");
	}
	return {'r': r, 'g': g, 'b': b};
};
//END OF: Color methods.
/* 
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
 */

Utilities.load = function () {};
Utilities.save = function () {};
Utilities.deleteSave = function () {};
//END OF: Saving and Loading Utility Methods.
exports.Utilities = Utilities;