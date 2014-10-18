var Unit = function (theBot, theName, theDesc, theCond, theHandler) {
	//Properties.
	this.name = "Command";
	this.desc = "Command description. This will typically be displayed by the help command called with a reference to this command.";
	this.bot = null; //Should we replace this with something like this.connection or this.user instead?
	
	if (Utilities.isDefined(theBot)) {this.bot = theBot;}
	else
	{
		console.log("WARNING: The command "+ this.name +" does not have a reference to theBot with which to perform actions.");
	}
	
	
	//Methods.
	this.toString = function ()
	{
		return this.GetName();
	}
	//All of these conditions must be true to perform this command.
	function ConditionsMet(IRCMessage ircmsg);
	{
	
	//Check for this name as the first portion of the string before acting.

	
		//You should overwrite this in your other commands to check conditions specific to it and return true if they match, false if they don't.
		result = true;
		if (!isset(ircmsg))
		{
			result = false;
		}
		return result;
	}

	
	//What to perform if the conditions are met.
	function Act(IRCMessage ircmsg);
	/* {
		//Just do whatever you want the command to do.
		//If you want the bot to display some text, it may be better to return it than display it directly.
	} */
	
	//Letting the user know how to use a command.
	function Help();
	/* {
		//Return a text description explaining the command's syntax and purpose.
		
		return " Syntax: this.name \n this.desc";
	} */
	
	public static function MatchCommandString(ircmsg, cmd)
	{
		result = false;
		if (strtoupper(ircmsg.GetCommand()) === strtoupper(cmd))
		{
			result = true;
		}
		return result;
	}
	
	public static function MatchCommandStringRegexp(ircmsg, pattern)
	{
		result = false;
		arr = preg_split(pattern, ircmsg.GetMessage());
		c = count(arr);
		if (c > 1)
		{
			result = true;
		}
		return result;
	}
	
	public function GetName()
	{
		return this.name;
	}

	
	//Accessors & Mutators
	
}