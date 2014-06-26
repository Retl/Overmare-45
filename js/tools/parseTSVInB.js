var parseTSV = function (theTSV)
{
	var numFields = 7;
	var p = [];
	var t = [];
	for (i in theTSV)
	{
		//Which set are we on?
		//var set = Math.floor(i / numFields);
		
		//Take the field we"re looking at, and put it into t.
		t.push(theTSV[i]);
		
		//If we"re on the last item in a set... 
		if (i % numFields == (numFields - 1)) 
		{
			//...Put the copy of the array of fields into the array of entries.
			p.push(t.slice());
			//Then clear the array.
			t = [];
		}
		
		
		
	}
	
	return p;
};

var perkEntryToCode = function (entry)
{
	var result = '';
	
	result += 'perkList.push(new Perk("'+ entry[0] +'", "'+ entry[1] +'", "'+ entry[2] +'", "'+ entry[3] +'", "'+ entry[4] +'", "'+ entry[5] +'", "'+ entry[6] +'"));'; 
	//Name (0), Type (1), Level (2), MaxRanks (3), Required SPECIAL (4), Required Skill (5), Description (6)
	//Produces: perkList.push(new Perk("Fast Pack Buckles", "Base", "3", "1", "AGL 5", "", "Accessing your inventory costs half AP."));
	result += '\n';
	
	return result;
};


b = document.getElementsByTagName('pre')[0].innerText.split(/[\t\n\r]/); //That regex can catch tabs, linebreaks, and carriage returns, but does NOT check for normal spaces.
var tableContents = parseTSV(b);

var codeOut = '';

for (i = 0; i < tableContents.length; i++)
{
	codeOut += perkEntryToCode(tableContents[i]);
}


