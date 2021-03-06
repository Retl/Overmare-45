function handle_btn_examine()
{
	Utilities.WriteToDiv("pnl_settlement", "");
	Utilities.WriteToDiv("pnl_unit", "");
	 Utilities.Write("Settlement: " + selectedSettlement.ToString(), "pnl_settlement");
	 Utilities.Write("Selected Unit: " + selectedUnit.ToString(), "pnl_unit");
	 selectedUnit.getReports();
}

function handle_btn_levelup()
{
	selectedUnit.levelUp();
}

function handle_btn_newPony()
{
	selectedSettlement.addResident(test);
	test = new Unit();
	selectedUnit = test;
	handle_btn_ng();
	selectedSettlement.addResident(test);
	handle_btn_examine();
}

function handle_btn_renameSettlement()
{
	var newName = Namer.makeName(1, Utilities.GetSelectedDictionaries());
	Utilities.Write(newName);
	
	if (typeof selectedUnit.myName != "undefined") {selectedSettlement.myName = newName;}
}

function handle_btn_back()
{
	//Currently does nothing. - Moore.
}

//START OF: Time Handlers
function handle_btn_wait(hours)
{
	//Advances the time and then reports how much time has passed. - Moore.
	time.waitHours(hours);
	time.displayTime();
	selectedSettlement.DisplayLocation();
	Utilities.Write();
	selectedUnit.getReports();
	
}

function handle_btn_timescale()
{
	var oneSec = 1000;
	var newTime = prompt('Enter the time between turns (in seconds).', 60);
	 
	if (Utilities.IsNumber(newTime)) //If a valid number was entered, do use that as the time.
	{
		newTime = Math.abs(newTime);
		clearInterval(gameTimeInterval);
		if (newTime != 0)
		{
			gameTimeInterval = setInterval("handle_btn_wait(1)", newTime * oneSec);
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

function handle_btn_selectUnitInSettlement(which)
{
	selectedUnit = which; //Example: passing which the value of: selectedSettlement.getResident(3); Maybe consider getResidentByName. - Moore.
	Utilities.Write("Selected: " + selectedUnit.myName);
}

function handle_btn_listUnitsInSettlement()
{
	//Currently does nothing. - Moore.
}

function handle_btn_menu()
{
	 Utilities.Write("Displaying Menu..."); //Stub. - Moore.
}

function handle_btn_ng_mlp()
{
	Namer.toggleDictMLP();
}

function handle_btn_ng_foe()
{
	Namer.toggleDictFoE();
}

function handle_btn_ng_foeu()
{
	Namer.toggleDictFoEU();
}

function handle_btn_ng_pinkeyes()
{
	Namer.toggleDictFoEPE();
}

function handle_btn_ng()
{
	
	var newName = Namer.makeName(Namer.howManyNames, Utilities.GetSelectedDictionaries());
	Utilities.Write(newName);
	
	if (typeof selectedUnit.myName != "undefined") {selectedUnit.myName = newName;}

}

function handle_btn_namesminus()
{
	Namer.howManyNames--;
	if (Namer.howManyNames < 1) {Namer.howManyNames = 1;}
}

function handle_btn_names2()
{
	Namer.howManyNames = 2;
}

function handle_btn_namesplus()
{
	Namer.howManyNames++;
}

//START OF: Save/Load Handlers
function handle_btn_save()
{
	//Cycle through all current data, convert to JSON String, and save it in a cookie.
	//var save;
	Utilities.save();
}

function handle_btn_load()
{
	Utilities.load();
}

function handle_btn_save_export()
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

function handle_btn_save_import()
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

function handle_btn_delete_save()
{
	Utilities.deleteSave();
	location.reload(true);
}
//END OF: Save/Load Handlers
