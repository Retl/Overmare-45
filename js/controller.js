var Controller =
{
	useMadModdRules:false
};

Controller.toggleMadModd = function () 
{
	Controller.useMadModdRules = !Controller.useMadModdRules;
    return Controller.useMadModdRules;
};