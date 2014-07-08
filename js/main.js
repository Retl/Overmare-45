var save = null;

time = new GameTime();
var gameTimeInterval = setInterval("handle_btn_wait(1)", 60 * 1000); //Advance one in-game hour for every one minute real time.

test = new Unit();
var selectedUnit = test;

testSettlement = new Settlement();
var selectedSettlement = testSettlement;

selectedSettlement.addResident(test);

Utilities.load(); //TODO: Consider not adding the defaults if there's data to load. - Moore.