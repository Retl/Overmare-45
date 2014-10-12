//Standard Includes
omg = "";
var net = require('net');
var colors = require('colors');

//My own stuffs.
GameTime = require('./js/gameTime.js').GameTime;
Utilities = require('./js/utilities.js').Utilities;

Controller = require('./js/controller.js').Controller;

mlpfimNames = require('./js/dict_MLPFiMNames.js').mlpfimNames;
foevanillanames = require('./js/dict_FoEVanillaNames.js').foevanillanames;
foegeneralnames = require('./js/dict_FoEGeneralNames.js').foegeneralnames;
foepinkeyesnames = require('./js/dict_FoEPinkEyesNames.js').foepinkeyesnames;
Namer = require('./js/namer.js').Namer;

Inventory = require('./js/inventory.js').Inventory;
Skill = require('./js/skill.js').Skill;
Perk = require('./js/perk.js').Perk;
Unit = require('./js/unit.js').Unit;
Settlement = require('./js/settlement.js').Settlement;
Main = require('./js/main.js').Main;
//Test = require('./js/test.js');

//handleUI = require('./js/handleUI.js');

Controller.connections = [];

// var displayThisString = "You can make up ponies and put them in places to live! \nNote: Each dictionary does a different thing. Consider using the name generator with only one dictionary toggled.\nMLPFiM Names consist of canon and fanon character names based on the wiki.\nFoE Shared Universe dictionary consists of character names from FoE Sidefics all mixed up.\nThe Fallout: Equestria dictionary and Pink Eyes dictionary are most of the words from those stories (with some removals).";

var displayThisString = "MOTD: Just trying to test to see if the chat functions and whatnot work properly.\nYou can talk to any other connected users with 'say <stuff you wanna say>'. You can view your stats with 'look'.\n Other commands that should work now are: levelup, color, fast, slow, quit.\n";

var save = null;
time = new GameTime();
Controller.gameTimeInterval = setInterval(Main.mainIntervalCallback, 60 * 1000); 

//console.log(Unit);
//console.log(Unit.toString());
test = new Unit();
var selectedUnit = test;
Controller.selectedUnit = selectedUnit;

testSettlement = new Settlement();
var selectedSettlement = testSettlement;
Controller.selectedSettlement = testSettlement;

Controller.selectedSettlement.addResident(test);

Controller.selectedSettlement.myName = "Cookie";
Controller.selectedUnit.myName = "Get Bonus";

Utilities.load(); //TODO: Consider not adding the defaults if there's data to load. - Moore.

exports = this;

console.log(displayThisString.green);
console.log(testSettlement);
console.log(Controller.selectedSettlement);
//console.log(test);
//console.log(time);

//Based on a tutorial:
var server = net.createServer(function (socket) {
  //socket.write(displayThisString + '\r\n'.red);
  
  //socket.on('data', handleData);
  
  //socket.pipe(socket);
});

server.on('connection', function(socket) 
  {
	//Put it in the array of connections so we can do things with it later.
	Controller.connections.push(socket);
	//a[a.indexOf(dome)]
	
	socket.write(displayThisString);
  
	console.log("New user connected to server: " + socket.address().address +':'+ socket.address().port);
	socket.pc = new Unit();
	Controller.selectedSettlement.addResident(socket.pc);
	console.log("User assigned generated character: " + socket.pc.getName());
	
	socket.on('end', function()
		{
			//Finds the socket that is disconnecting and removes it from the connections list.
			var outMsg = socket.pc.getName() + " has disconnected.";
			Controller.connections.splice(Controller.connections.indexOf(socket),1);
			Controller.sendToAll(outMsg);
			console.log(outMsg);
		}
	);
	
	socket.on('data', function(data) 
{
  var msg = data.toString().trim();
  omg = msg;
  console.log(msg);
  if (msg == "quit") 
  {
	//socket.write("SERVER SHUTTING DOWN NOW!"); server.end;
	socket.end();
	//process.exit();
  }
  if (msg.toUpperCase() == "look".toUpperCase()) 
  {
	socket.write(Controller.selectedSettlement.ToString());
	socket.write(socket.pc.ToString());
	socket.write(socket.pc.getReports());
	//socket.write("Statusline.");
	socket.write(Controller.getStatusBar(socket.pc) + '\n');
  }
  else if (msg.split(' ').length >= 2 && msg.split(' ')[0].toUpperCase() == "name".toUpperCase()) 
  {
	var m = msg.split(' ');
	var strRest = m.slice(1).join(' ');
	var outMsg = "";
	outMsg += String.fromCharCode(0x1B, 0x5B)+"36m";
	outMsg += socket.pc.getName()+ " is now known as " + strRest + '.';
	socket.pc.myName = strRest;
	outMsg += String.fromCharCode(0x1B, 0x5B)+"0;39;49m";
	Controller.sendToAll(outMsg);
	console.log(outMsg);
  }
  else if (msg.split(' ').length >= 2 && msg.split(' ')[0].toUpperCase() == "say".toUpperCase()) 
  {
	var m = msg.split(' ');
	var strRest = m.slice(1).join(' ');
	var outMsg = "";
	outMsg += String.fromCharCode(0x1B, 0x5B)+"36m";
	outMsg += socket.pc.getName() + ' says, "' + strRest + '"';
	outMsg += String.fromCharCode(0x1B, 0x5B)+"0;39;49m";
	Controller.sendToAll(outMsg);
	console.log(outMsg);
  }
  else if (msg.toUpperCase() == "color".toUpperCase()) 
  {
	var csi_start = String.fromCharCode(0x1B, 0x5B);
	var csi_mid = '36;43;1';
	var extra = "I AM THE TEXT."
	var csi_end = 'm'
	var csiString = csi_start + csi_mid + csi_end + extra;
	console.log(csiString);
	socket.write(csiString + String.fromCharCode(0x1B, 0x5B)+"0m");
	console.log(String.fromCharCode(0x1B, 0x5B)+"0;39;49m");
	//Using this stuff, we could make a healtbar by dividing maxhp by hp and rounding to find what portion of character sout of a string length we'd need to fill, then for each of those characters of the string as the print, chunk/slice them and have the colored background for the first part, and the reset background for the remaining portion.
	//Also, the extended colorset 256 color version: console.log(String.fromCharCode(0x1B, 0x5B)+"2;r;g;b");
  }
  else if (msg.split(' ').length == 4 && msg.split(' ')[0].toUpperCase() == "rgb".toUpperCase()) 
  {
	m = msg.split(' ');
	var csi_start = String.fromCharCode(0x1B, 0x5B);
	var r = Utilities.clamp(m[1], 0, 255);
	var g = Utilities.clamp(m[2], 0, 255);
	var b = Utilities.clamp(m[3], 0, 255);
	var csi_mid = '48;2;'+ r +';'+ g +';'+ b;
	var csi_mid = '48;2;255;0;0';
	var csi_end = 'm';
	
	var extra = "Here's what this color looks like.";
	
	var csiString = csi_start + csi_mid + csi_end + extra;
	console.log(csiString);
	socket.write(csiString + String.fromCharCode(0x1B, 0x5B)+"0m");
	console.log(String.fromCharCode(0x1B, 0x5B)+"0;39;49m");
	rgbresult = Utilities.HexToRGB('#ff9f00');
	console.log("Just testing the hex to rgb thing without coloring with it. #ff9f00 = rgb("+ rgbresult.r +','+ rgbresult.g +','+ rgbresult.b+")");
	//asd = String.fromCharCode(0x1B, 0x5B)+'48;5;'+'200'+'m'
  }
  else if (msg.toUpperCase() == "fast".toUpperCase()) 
  {
	Controller.setTimescale(.5);
	Controller.sendToAll("Timescale: One hour per real half-second.");
  }
  else if (msg.toUpperCase() == "slow".toUpperCase()) 
  {
	Controller.setTimescale(60);
	Controller.sendToAll("Timescale: One hour per real minute.");
  }
  else if (msg.toUpperCase() == "levelup".toUpperCase()) 
  {
	Controller.levelup(socket.pc);
	socket.write(socket.pc.ToString());
  }
});
  }
);

server.listen(8789);

handleData = function(data) 
{
  var msg = data.toString().trim();
  omg = msg;
  console.log(msg);
  if (msg == "quit") 
  {
	//socket.write("SERVER SHUTTING DOWN NOW!"); server.end;
	socket.end();
	//process.exit();
  }
  if (msg.toUpperCase() == "look".toUpperCase()) 
  {
	socket.write(Controller.selectedSettlement.ToString());
	socket.write(Controller.socket.pc.ToString());
	socket.write(Controller.socket.pc.getReports());
	//socket.write("Statusline.");
	socket.write(Controller.getStatusBar());
  }
  else if (msg.toUpperCase() == "color".toUpperCase()) 
  {
	var csi_start = String.fromCharCode(0x1B, 0x5B);
	var csi_mid = '36;43;1';
	var extra = "I AM THE TEXT."
	var csi_end = 'm'
	var csiString = csi_start + csi_mid + csi_end + extra;
	console.log(csiString);
	socket.write(csiString + String.fromCharCode(0x1B, 0x5B)+"0m");
	console.log(String.fromCharCode(0x1B, 0x5B)+"0;39;49m");
	//Using this stuff, we could make a healtbar by dividing maxhp by hp and rounding to find what portion of character sout of a string length we'd need to fill, then for each of those characters of the string as the print, chunk/slice them and have the colored background for the first part, and the reset background for the remaining portion.
	//Also, the extended colorset 256 color version: console.log(String.fromCharCode(0x1B, 0x5B)+"2;r;g;b");
  }
  else if (msg.split(' ').length == 4 && msg.split(' ')[0].toUpperCase() == "rgb".toUpperCase()) 
  {
	m = msg.split(' ');
	var csi_start = String.fromCharCode(0x1B, 0x5B);
	var r = Utilities.clamp(m[1], 0, 255);
	var g = Utilities.clamp(m[2], 0, 255);
	var b = Utilities.clamp(m[3], 0, 255);
	var csi_mid = '48;2;'+ r +';'+ g +';'+ b;
	var csi_mid = '48;2;255;0;0';
	var csi_end = 'm';
	
	var extra = "Here's what this color looks like.";
	
	var csiString = csi_start + csi_mid + csi_end + extra;
	console.log(csiString);
	socket.write(csiString + String.fromCharCode(0x1B, 0x5B)+"0m");
	console.log(String.fromCharCode(0x1B, 0x5B)+"0;39;49m");
	rgbresult = Utilities.HexToRGB('#ff9f00');
	console.log("Just testing the hex to rgb thing without coloring with it. #ff9f00 = rgb("+ rgbresult.r +','+ rgbresult.g +','+ rgbresult.b+")");
	//asd = String.fromCharCode(0x1B, 0x5B)+'48;5;'+'200'+'m'
  }
  else if (msg.toUpperCase() == "fast".toUpperCase()) 
  {
	Controller.setTimescale(.5);
	socket.write(selectedUnit.ToString());
  }
  else if (msg.toUpperCase() == "levelup".toUpperCase()) 
  {
	Controller.levelup();
	socket.write(selectedUnit.ToString());
  }
};