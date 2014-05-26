var LevelTable = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000, 210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000, 406000, 435000]

var Unit = function () {
	//Properties
	
	
	//Stats used for identification, growth, breeding, etc.
	this.name = "Background Pony";
	this.gender;
	this.age; //Days, not years. Might want to have a separate display for years, though.
	this.kind;
	this.karma;
	
	//The most base representation of character growth.
	this.level = 1;
	this.xp = 0;
	this.skillpoints;
	
	//SPECIAL. Most other stats are derived from this.
	this.strength;
	this.perception;
	this.endurance;
	this.charisma;
	this.intelligence;
	this.agility;
	this.luck;
	
	//General applied skill stats.
	this.barter;
	this.explosives;
	this.lockpick;
	this.mew;
	this.medicine;
	this.melee;
	this.firearms;
	this.sneak;
	this.speech;
	this.survival;
	this.unarmed;
	
	
	//Science knowledge stats.
	this.agriculture; //Good for creating and sustaining plant growth. Especially for food.
	this.architecture; //Necessary for leading construction. Can direct others with the physical strength to complete it.
	this.biology; //Includes applications like health. Helps with hunting.
	this.chemistry;
	this.machines;
	
	//These stats depend less on character growth, and more on scenario.
	this.currentWeight;
	this.maxWeight;
	this.credit;
	
	//Stats only used during combat
	this.maxhp;
	this.hp;
	this.maxap;
	this.ap;
	
	//This stat is limited by all the other stats, but not set by them.
	this.traits;
	this.perks;
	this.tags;
	
	//Methods.
	this.setSpecial = function(s,p,e,c,i,a,l)
	{
		this.strength = s;
		this.perception = p;
		this.endurance = e;
		this.charisma = c;
		this.intelligence = i;
		this.agility = a;
		this.luck = l;
	}
	
	this.setDerivedSkills = function()
	{
	this.barter = (this.charisma * 2) + Math.floor(this.luck / 2);
	this.explosives = (this.perception * 2) + Math.floor(this.luck / 2);
	this.lockpick = (this.perception * 2) + Math.floor(this.luck / 2);
	this.mew = (this.perception * 2) + Math.floor(this.luck / 2);
	this.medicine = (this.intelligence * 2) + Math.floor(this.luck / 2); //Do we really need medicine? We have a Biology and Chemistry science skill.
	this.melee = (this.strength * 2) + Math.floor(this.luck / 2);
	this.firearms = (this.agility * 2) + Math.floor(this.luck / 2);
	this.sneak = (this.agility * 2) + Math.floor(this.luck / 2);
	this.speech = (this.charisma * 2) + Math.floor(this.luck / 2);
	this.survival = (this.endurance * 2) + Math.floor(this.luck / 2);
	this.unarmed = (this.endurance * 2) + Math.floor(this.luck / 2);
	
	

	this.agriculture = (this.endurance) + Math.floor(this.luck / 2) + Math.floor(this.intelligence / 2); 
	this.architecture = (this.perception) + Math.floor(this.luck / 2) + Math.floor(this.intelligence / 2); 
	this.biology = (this.perception) + Math.floor(this.luck / 2) + Math.floor(this.intelligence / 2);
	this.chemistry = (this.agility) + Math.floor(this.luck / 2 + Math.floor(this.intelligence / 2));
	this.machines = (this.endurance) + Math.floor(this.luck / 2) + Math.floor(this.intelligence / 2);
	}
	
	this.levelUp = function(times)
	{
		if (typeof times == "undefined") {times = 1}
		
		//Repeat the logic 'times' times.
		for (;times > 0; times--)
		{
			//If we can level up, level up. If not, report it.
			if (this.level < LevelTable.length)
			{
				this.xp = LevelTable[this.level];
				this.level++;
				console.log("Footnote: Level Up! Level ( " + this.level + " )\nNew Perk Added: ");
			}
			
			if (this.level >= LevelTable.length)
			{
				//The LevelTable doesn't support levels past this number. You could use a function to auto-calculate needed xp to next level, but for now we're going to hard-cap.
				console.log("Footnote: Maximum Level Reached.");
				times = 0;
			}
		}
		
		//Update the base stats.
		this.setDerivedSkills();
	}
	
	//Return an instance.
	console.log(this);
	return this;
}