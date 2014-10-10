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

var displayThisString = "You can make up ponies and put them in places to live! \nNote: Each dictionary does a different thing. Consider using the name generator with only one dictionary toggled.\nMLPFiM Names consist of canon and fanon character names based on the wiki.\nFoE Shared Universe dictionary consists of character names from FoE Sidefics all mixed up.\nThe Fallout: Equestria dictionary and Pink Eyes dictionary are most of the words from those stories (with some removals).";

var save = null;
time = new GameTime();
Controller.gameTimeInterval = setInterval(Main.mainIntervalCallback, 60 * 1000); 

//console.log(Unit);
//console.log(Unit.toString());
test = new Unit();
var selectedUnit = test;

testSettlement = new Settlement();
var selectedSettlement = testSettlement;

selectedSettlement.addResident(test);

Utilities.load(); //TODO: Consider not adding the defaults if there's data to load. - Moore.

exports = this;

console.log(displayThisString.green);
//console.log(testSettlement);
//console.log(test);
//console.log(time);

//Based on a tutorial:
var server = net.createServer(function (socket) {
  socket.write(displayThisString + '\r\n'.red);
  
  socket.on('data', function(data) {
  var msg = data.toString().trim();
  omg = msg;
  console.log(msg);
  if (msg == "quit") 
  {
	socket.write("SERVER SHUTTING DOWN NOW!"); server.end;
  }
  if (msg.toUpperCase() == "look".toUpperCase()) 
  {
	socket.write(selectedSettlement.ToString());
	socket.write(selectedUnit.ToString());
	socket.write(selectedUnit.getReports());
	socket.write("\r\n");
	socket.write(Controller.getStatusBar());
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
  
  });
  
  //socket.pipe(socket);
});

server.listen(8789, '127.0.0.1');