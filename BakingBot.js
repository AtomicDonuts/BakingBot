// BakingBot 
// bakingbot is a simple bot that will get "Speed Baking III" for you
// since SB3 Achievements is basically based on luck and there isn't any real strategy ,it should be perfectly legit 


var BakingBot
if(!BakingBot) BakingBot = {};
BakingBot.version = "0.001";
BakingBot.gameVersion = "2.022";
BakingBot.robotName = "BakingBot is helping ";
BakingBot.WaitingTime = 0;
BakingBot.AscendTimeWait = 15*60*1000 + 4000;
BakingBot.InitialBakeryName = ""

BakingBot.run = function(){
	if (Game.Achievements["Speed baking III"].won) BakingBot.stopBot();
	if (Game.AscendTimer>0 || Game.ReincarnateTimer>0) return;
	BakingBot.now=Date.now();
	if(BakingBot.now<BakingBot.WaitingTime) return;
	if (BakingBot.now >= Game.startDate + BakingBot.AscendTimeWait || Game.OnAscend){
		BakingBot.restart();
	}
	BakingBot.AutoClickBigCookie();
	BakingBot.AutoClickGoldenCookie();
}

BakingBot.restart = function(){
	var prestigeup = true;
	if(Game.prestige == 0 && !Game.OnAscend)
		prestigeup = confirm("Press OK to Ascend\nYou will LOSE all the cookie in your bakery");
	if(prestigeup && !Game.Achievements["Speed baking III"].won && !Game.OnAscend){
		Game.Ascend(true);
		BakingBot.SetWaitingTime(4);
		return;
	}
	if(prestigeup && !Game.Achievements["Speed baking III"].won && Game.OnAscend){
		Game.PickAscensionMode();
		Game.nextAscensionMode = 1; 
		Game.ConfirmPrompt(); 
		Game.Reincarnate(true);
	}
}

BakingBot.AutoClickBigCookie = function(){

	if(BakingBot.Config.ClickSpeed != BakingBot.PreConfig.ClickSpeed){
		clearInterval(BakingBot.AutoClicker);
		BakingBot.AutoClicker = 0;
		BakingBot.PreConfig.ClickSpeed = BakingBot.Config.ClickSpeed;
	}
	if(BakingBot.Config.ClickSpeed == 0) {
		clearInterval(BakingBot.AutoClicker);
		BakingBot.AutoClicker = 0;
		return;
	}
	if(typeof BakingBot.PreAutoClicker === 'undefined' || BakingBot.PreAutoClicker != BakingBot.AutoClicker){
		BakingBot.ClickPS = 1000/(BakingBot.Config.ClickSpeed * 3);
		BakingBot.AutoClicker = setInterval(Game.ClickCookie,BakingBot.ClickPS);
		BakingBot.PreAutoClicker = BakingBot.AutoClicker;
	}
}

BakingBot.AutoClickGoldenCookie = function(){
	if(Game.shimmer.length == 0) return;
	var max = Game.shimmers.length
	for(var i = 0;i<max;i++){
		Game.shimmers[0].pop();
	}
}

//{Menu
if(!BakingBot.Backup) BakingBot.Backup = {};

BakingBot.Config = {};
BakingBot.PreConfig = {};
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
			if (typeof BakingBot.Config[i]==='undefined' || BakingBot.Config[i]<0 || BakingBot.Config[i]>=BakingBot.ConfigData[i].label.length) {
				mod = true;
				BakingBot.Config[i] = BakingBot.ConfigDefault[i];
				BakingBot.PreConfig[i] = BakingBot.ConfigDefault[i];
			}
	  }
		
	  if (mod) 
			BakingBot.SaveConfig(BakingBot.Config);
    } 
		
		else { // Default values
	  BakingBot.RestoreDefault();
    }
  } catch (e) {}
}	
	
BakingBot.RestoreDefault = function() {
  BakingBot.Config = {};
	BakingBot.PreConfig = {};
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
  BakingBot.PreConfig[config] = BakingBot.Config[config];
	BakingBot.Config[config]++;
  if (BakingBot.Config[config]==BakingBot.ConfigData[config].label.length)
	BakingBot.Config[config] = 0;
  l(BakingBot.ConfigPrefix + config).innerHTML = BakingBot.Disp.GetConfigDisplay(config);
  BakingBot.SaveConfig(BakingBot.Config);
}

BakingBot.ConfigData.ClickSpeed = 
  {label: ['OFF','3','6','9','12','15','18'], desc: 'How many click in 1 sec'};
	
	
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
		if (BakingBot.Config[config] == 0) 
			a.className = 'option off';
		a.id = BakingBot.ConfigPrefix + config;
		a.onclick = function() { 
			BakingBot.ToggleConfig(config); 
		};
		if (clickFunc) a.onclick = clickFunc;
			a.textContent = BakingBot.Disp.GetConfigDisplay(config);
		div.appendChild(a);
		var label = document.createElement('label');
		label.textContent = BakingBot.ConfigData[config].desc;
		div.appendChild(label);
		return div;
  }
	
  frag.appendChild(listing('ClickSpeed',null));
  l('menu').childNodes[2].insertBefore(frag, l('menu').childNodes[2].childNodes[l('menu').childNodes[2].childNodes.length - 1]);

}
	
if (!BakingBot.Backup.UpdateMenu) BakingBot.Backup.UpdateMenu = Game.UpdateMenu;

Game.UpdateMenu = function() {
  BakingBot.Backup.UpdateMenu();
  if (Game.onMenu == 'prefs') 
		BakingBot.Disp.AddMenuPref();
}	
//}	

//Utilities

BakingBot.notify = function(BakingText) { 
  console.log("BakingBot: "+BakingText); 
  Game.Notify("BakingBot News",BakingText,[14,5],100); 
}

BakingBot.RenameBakery = function(){
	if (Game.bakeryName.slice(0,BakingBot.robotName.length)!=BakingBot.robotName) { 
		BakingBot.InitialBakeryName = Game.bakeryName;
		var bakeryName = Game.bakeryName;
		Game.bakeryName = BakingBot.robotName+bakeryName; 
		Game.bakeryNamePrompt(); 
		Game.ConfirmPrompt();
	}
}

BakingBot.NameItBack = function(){ 
		Game.bakeryName = BakingBot.InitialBakeryName;
		Game.bakeryNamePrompt();
		Game.ConfirmPrompt();
	}
}

BakingBot.SetWaitingTime = function(sec){
	var millisec = 1000 * sec
	BakingBot.WaitingTime = Date.now() + millisec;
}
//---------Init--------

BakingBot.Inits = function(){
	
	var proceed = true;
	if(Game.prestige == 0)
		proceed = confirm('Seems like you are at your first run \nThis bot CAN RESET your progress by ascending.\nDo you still want to load BakingBot?');
	if (proceed) {
		BakingBot.starter = setInterval(BakingBot.run,300);
		
		if(Game.version == BakingBot.gameVersion){
			if (Game.prefs.popups) Game.Popup('BakingBot v.'+BakingBot.version+' for version ' + BakingBot.gameVersion + ' loaded!');
			else BakingBot.notify('BakingBot v.'+BakingBot.version+' for version ' + BakingBot.gameVersion + ' loaded!');
		}else{ 
			Game.Notify("BakingBot News","Warning: BakingBot is last tested with "+"cookie clicker version " + BakingBot.gameVersion,[15,5],100);
		}
		
		Game.Win('Third-party');
		BakingBot.RenameBakery();
		
	}
}

BakingBot.stopBot = function(){
	clearInterval(BakingBot.AutoClicker);
	clearInterval(BakingBot.starter);
	BakingBot.NameItBack();
	Game.FileSave();
	BakingBot.notify("Congrats,you got it");
}

BakingBot.Inits();
