var Controller =
{
	useMadModdRules:false
};

Controller.allCharacters = [];

Controller.toggleMadModd = function () 
{
	Controller.useMadModdRules = !Controller.useMadModdRules;
    return Controller.useMadModdRules;
};

Controller.handle_btn_examine = function ()
{
	Utilities.WriteToDiv("pnl_settlement", "");
	Utilities.WriteToDiv("pnl_unit", "");
	 Utilities.Write("Settlement: " + selectedSettlement.ToString(), "pnl_settlement");
	 Utilities.Write("Selected Unit: " + selectedUnit.ToString(), "pnl_unit");
	 selectedUnit.getReports();
}

Controller.levelup = function (sel)
{
	if (!Utilities.isDefined(sel))
	{
		sel = Controller.selectedUnit;
	}
	sel.levelUp();
}

Controller.getStatusBar = function (whichUnit)
{
	if (!Utilities.isDefined(whichUnit))
	{
		whichUnit = Controller.selectedUnit;
	}
	var startColorCode = String.fromCharCode(0x1B, 0x5B)+"1;36;40m";
	var resetColorCode = String.fromCharCode(0x1B, 0x5B)+"0m";
	return startColorCode + "<"+ whichUnit.getName() +": "+ whichUnit.hp +"/"+ whichUnit.maxhp +" HP ##/## AP"+ "" +">" + resetColorCode;
}

Controller.sendToAll = function (msg)
{
	for (var con in Controller.connections) {Controller.connections[con].write(msg + '\n');}
	//for (var i=0; i < Controller.connections.length; i++) {console.log(Controller.connections[i]);}
}

Controller.handle_btn_newPony = function ()
{
	selectedSettlement.addResident(test);
	test = new Unit();
	selectedUnit = test;
	handle_btn_ng();
	selectedSettlement.addResident(test);
	handle_btn_examine();
}

Controller.handle_btn_renameSettlement = function ()
{
	var newName = Namer.makeName(1, Utilities.GetSelectedDictionaries());
	Utilities.Write(newName);
	
	if (typeof selectedUnit.myName != "undefined") {selectedSettlement.myName = newName;}
}

Controller.handle_btn_back = function ()
{
	//Currently does nothing. - Moore.
}

//START OF: Time Handlers
Controller.waitHours = function (hours)
{
	//Advances the time and then reports how much time has passed. - Moore.
	time.waitHours(hours);
	Controller.sendToAll(time.displayTime());
	//We should probably have each socket's character use it's getReports and send it to its host, but they currently don't have a reference to their own host...
	Controller.selectedSettlement.DisplayLocation();
	Controller.selectedUnit.getReports();
};

Controller.setTimescale = function (newTime)
{
	var oneSec = 1000;
	//var newTime = prompt('Enter the time between turns (in seconds).', 60);
	 
	if (Utilities.isNumber(newTime)) //If a valid number was entered, do use that as the time.
	{
		newTime = Math.abs(newTime);
		clearInterval(Controller.gameTimeInterval);
		if (newTime != 0)
		{
			Controller.gameTimeInterval = setInterval(Main.mainIntervalCallback, newTime * oneSec);
			Utilities.Write("Time will now advance by 1 hour for every "+ newTime +" second(s).");
		}
		else 
		{
			//If it's zero, assume they don't want any auto-time progression. - Moore.
		}
	}
	else //If the entered value was not a recognized number, don't change the timers.
	{
		
	}
	 
	 
	 
}

//END OF:  Time Handlers.

Controller.handle_btn_selectUnitInSettlement = function (which)
{
	selectedUnit = which; //Example: passing which the value of: selectedSettlement.getResident(3); Maybe consider getResidentByName. - Moore.
	Utilities.Write("Selected: " + selectedUnit.myName);
}

Controller.handle_btn_listUnitsInSettlement = function ()
{
	//Currently does nothing. - Moore.
}

Controller.handle_btn_menu = function ()
{
	 Utilities.Write("Displaying Menu..."); //Stub. - Moore.
}

Controller.handle_btn_ng_mlp = function ()
{
	Namer.toggleDictMLP();
}

Controller.handle_btn_ng_foe = function ()
{
	Namer.toggleDictFoE();
}

Controller.handle_btn_ng_foeu = function ()
{
	Namer.toggleDictFoEU();
}

Controller.handle_btn_ng_pinkeyes = function ()
{
	Namer.toggleDictFoEPE();
}

Controller.handle_btn_ng = function ()
{
	
	var newName = Namer.makeName(Namer.howManyNames, Utilities.GetSelectedDictionaries());
	Utilities.Write(newName);
	
	if (typeof selectedUnit.myName != "undefined") {selectedUnit.myName = newName;}

}

Controller.handle_btn_namesminus = function ()
{
	Namer.howManyNames--;
	if (Namer.howManyNames < 1) {Namer.howManyNames = 1;}
}

Controller.handle_btn_names2 = function ()
{
	Namer.howManyNames = 2;
}

Controller.handle_btn_namesplus = function ()
{
	Namer.howManyNames++;
}

//START OF: Save/Load Handlers
Controller.handle_btn_save = function ()
{
	//Cycle through all current data, convert to JSON String, and save it in a cookie.
	//var save;
	Utilities.save();
}

Controller.handle_btn_load = function ()
{
	Utilities.load();
}

Controller.handle_btn_save_export = function ()
{
	//Only do it if there is save data present.
	if (typeof save != "undefined" && save != null)
	{
		var um = Utilities.copyToClipboard(save); //WARNING: This won't work. Chrome trunctates to 2k characters with a '...' in the middle.
		//Consider using a textfield instead. - Moore.
		console.log(um.length + " " + save.length);
		console.log(um == save);
	}
	else
	{
		Window.alert("Save data not found.");
	}
}

Controller.handle_btn_save_import = function ()
{
	//STUB.
	var input = window.prompt("Paste Save Data: Ctrl+V, Enter", "");
	//Only do it if there is save data present.
	if (input != "" && input != null)
	{
		save = input;
	}
	else
	{
		alert("No data. Did you forget to Paste? (Ctrl+V)");
	}
	
	return save;
}

Controller.handle_btn_delete_save = function ()
{
	Utilities.deleteSave();
	location.reload(true);
}
//END OF: Save/Load Handlers

Controller.thingy = function (name)
{
	var result = "";
	
	var separatorBar = "******************************************************************************";
	for (var i = (separatorBar.length / 2) - 2 - name.length; i > 0; i--) {e += " ";}
	result = separatorBar + '\n' + name + '\n' + separatorBar;
	
	console.log(result);
	return result;
}

exports.Controller = Controller;