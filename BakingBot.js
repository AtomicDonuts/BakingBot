var BakingBot
if(!BakingBot) BakingBot = {};
BakingBot.version = "0.001";
BakingBot.gameVersion = "2.022";
BakingBot.robotName = "BakingBot is helping ";
BakingBot.waitfor = 0;


BakingBot.run = function(){
	if (Game.AscendTimer>0 || Game.ReincarnateTimer>0) return;
	BakingBot.now=Date.now();
	if (BakingBot.now >= Game.startDate + 15*60*1000){
		BakingBot.restart();
	}
	BakingBot.autoclickbc();
	BakingBot.autoclickgc();	
}

BakingBot.restart = function(){
	
}

//Utilities

BakingBot.notify = function(BakingText) { 
  console.log("Notify: "+BakingText); 
  Game.Notify("BakingBot News",BakingText,[14,5],100); 
}

if (Game.version!=BakingBot.gameVersion){ 
  BakingBot.notify("Warning: cookieBot is last tested with "+
    "cookie clicker version " + BakingBot.gameVersion);
}

BakingBot.renamebakery = function(){
	var bakeryName = Game.bakeryName;
	Game.bakeryName = BakingBot.robotName+bakeryName; 
	Game.bakeryNamePrompt(); Game.ConfirmPrompt();
}	
	
//{Menu
if(!BakingBot.Backup) BakingBot.Backup = {};
BakingBot.Config = {};
BakingBot.ConfigData = {};
BakingBot.Disp = {};

BakingBot.ConfigPrefix = 'BakingBotConfig';	
	
BakingBot.SaveConfig = function(config) {
  try {
    window.localStorage.setItem(BakingBot.ConfigPrefix, JSON.stringify(config));
  } catch (e) {}
}	
	
BakingBot.LoadConfig = function() {
  try {
    if (window.localStorage.getItem(BakingBot.ConfigPrefix) != null) {
	  BakingBot.Config = JSON.parse(window.localStorage.getItem(BakingBot.ConfigPrefix));
     // Check values
	  var mod = false;
	  for (var i in BakingBot.ConfigDefault) {
        if (typeof BakingBot.Config[i]==='undefined' || BakingBot.Config[i]<0 || 
	        BakingBot.Config[i]>=BakingBot.ConfigData[i].label.length) {
		  mod = true;
		  BakingBot.Config[i] = BakingBot.ConfigDefault[i];
	    }
	  }
	  if (mod) BakingBot.SaveConfig(BakingBot.Config);
    } else { // Default values
	  BakingBot.RestoreDefault();
    }
  } catch (e) {}
}	
	
BakingBot.RestoreDefault = function() {
  BakingBot.Config = {};
  BakingBot.SaveConfig(BakingBot.ConfigDefault);
  BakingBot.LoadConfig();
  Game.UpdateMenu();
}	

BakingBot.ToggleConfig = function(config) {
  BakingBot.ToggleConfigUp(config);
  l(BakingBot.ConfigPrefix + config).className = 
    BakingBot.Config[config]?'option':'option off';
}

BakingBot.ToggleConfigUp = function(config) {
  BakingBot.Config[config]++;
  if (BakingBot.Config[config]==BakingBot.ConfigData[config].label.length)
	BakingBot.Config[config] = 0;
  l(BakingBot.ConfigPrefix + config).innerHTML = BakingBot.Disp.GetConfigDisplay(config);
  BakingBot.SaveConfig(BakingBot.Config);
}

BakingBot.ConfigData.ClickSpeed = 
  {label: ['OFF','3','6','9','12','20'], desc: 'How many click in 1 sec'};
	
	
BakingBot.ConfigDefault = {ClickSpeed: 2,};	
BakingBot.LoadConfig();	
	
BakingBot.Disp.GetConfigDisplay = function(config) {
  return BakingBot.ConfigData[config].label[BakingBot.Config[config]];
}	
	
BakingBot.Disp.AddMenuPref = function() {
  var header = function(text) {
	var div = document.createElement('div');
	div.className = 'listing';
	div.style.padding = '5px 16px';
	div.style.opacity = '0.7';
	div.style.fontSize = '17px';
	div.style.fontFamily = '\"Kavoon\", Georgia, serif';
	div.textContent = text;
	return div;
  }
  var frag = document.createDocumentFragment();
  var div = document.createElement('div');
  div.className = 'title ' + BakingBot.Disp.colorTextPre + BakingBot.Disp.colorBlue;
  div.textContent = 'BakingBot Options';
  frag.appendChild(div);
  var listing = function(config,clickFunc) {
	var div = document.createElement('div');
	div.className = 'listing';
	var a = document.createElement('a');
	a.className = 'option';
	if (BakingBot.Config[config] == 0) a.className = 'option off';
	a.id = BakingBot.ConfigPrefix + config;
	a.onclick = function() { BakingBot.ToggleConfig(config); };
	if (clickFunc) a.onclick = clickFunc;
	a.textContent = BakingBot.Disp.GetConfigDisplay(config);
	div.appendChild(a);
	var label = document.createElement('label');
	label.textContent = BakingBot.ConfigData[config].desc;
	div.appendChild(label);
	return div;
  }
  frag.appendChild(listing('ClickSpeed',null));
  l('menu').childNodes[2].insertBefore(frag, l('menu').childNodes[2].
      childNodes[l('menu').childNodes[2].childNodes.length - 1]);
}
	
if (!BakingBot.Backup.UpdateMenu) BakingBot.Backup.UpdateMenu = Game.UpdateMenu;

Game.UpdateMenu = function() {
  BakingBot.Backup.UpdateMenu();
  if (Game.onMenu == 'prefs') BakingBot.Disp.AddMenuPref();
}	
	
