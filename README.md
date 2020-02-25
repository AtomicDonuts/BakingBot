# BakingBot
**BakingBot** is an add-on witch will help you with "Speed baking III" achievement. When it run, he will autoclick the big cookie (you can select the speed) and the golden cookies, then buy buildings and upgrade. "Speed baking III" is mostly based on luck, you need to get a "click frenzy" for unlocking it, the best way to make this happen is by playing a lot, with this bot you can just load the script and it will eventually get if for you.

## How it work?
BakingBot will automatically ascend if you have more then 1M cookies in the bakery.Then it will set the gamemode in to "Born again" mode and reincarnate.
BB then will start clicking the BigCookie,goldencookie,buying building and upgrade untill min 15 (and 10 seconds).
Then,it will start the cycle over again.

## Limitations
The buying strategy used in this bot its not the best possible.
I have used my experience to create a reasonable path,and it actually worked.  
In the options there is the possibility to choose the speed of clicking.
Even if it is present, it is not recommended to choose "3",it will probably removed in some new versions.

# Usage

## Bookmarklet
Copy this code and save it as a bookmark. Paste it in the URL section. To activate, click the bookmark when the Cookie Clicker game is open.

```javascript
javascript: (function () {
	Game.LoadMod('https://atomicdonuts.github.io/BakingBot/BakingBot.js');
}());
```
You can also try the beta version with the following code(not recommended).

## Userscript

BakingBot can also be activeted via script in *Tampermonkey* (or *Greasemonkey*).This script will automatically load *BakingBot* every time the original game loads. Check your browsers/plugin's documentation for how to add a userscript. This script is courtesy of **[SearchAndDestroy](https://github.com/SearchAndDestroy)**.

```javascript
// ==UserScript==
// @name        BakingBot
// @namespace   https://github.com/AtomicDonuts/BakingBot
// @include     http://orteil.dashnet.org/cookieclicker/
// @include     https://orteil.dashnet.org/cookieclicker/
// @version     0.3
// @author      AtomicDonuts
// @grant       none
// ==/UserScript==

var code = "(" + (function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.LoadMod('https://atomicdonuts.github.io/BakingBot/BakingBot.js');
            clearInterval(checkReady);
        }
    }, 1000);
}).toString() + ")()";

window.eval(code);
```

If you want to use the beta, use this one instead:

```javascript
// ==UserScript==
// @name        BakingBotBeta
// @namespace   https://github.com/AtomicDonuts/BakingBot
// @include     http://orteil.dashnet.org/cookieclicker/
// @include     https://orteil.dashnet.org/cookieclicker/
// @version     Unknown
// @author      AtomicDonuts
// @grant       none
// ==/UserScript==

var code = "(" + (function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.LoadMod('https://atomicdonuts.github.io/BakingBot/BakingBotBeta.js');
            clearInterval(checkReady);
        }
    }, 1000);
}).toString() + ")()";

window.eval(code);
```

# Bugs and suggestions
Since I'm not a programmer,the script probably have a bad syntax and have some bugs.
If you have suggestions for alternative strategy or just want to report some bug, please contact me at Pascal98@hotmail.it .

# Contributors
* **[AtomicDonuts](https://github.com/AtomicDonuts)**: Original author
* **[SearchAndDestroy](https://github.com/SearchAndDestroy)**: Tampermonkey script
* **[Prinz Stani](https://github.com/prinzstani)**: Cookie Bot original author, i used his script as base for mine
