const D = x => new Decimal(x)
let factorMult = 1
let game={
  base: 10,
  ord: 0,
  over: 0,
  canInf: false,
  OP: 0,
  infUnlock: 0,
  subTab: 1,
  succAuto: 0,
  limAuto: 0,
  infAutoUnlocked: 0,
  infAuto: 0,
  autoLoop: {succ: 0, lim: 0, inf: 0},
  factorShifts: 0,
  factors: [],
  notation: 0,
  notationOrd: 0,
  infOP: false,
  highestOrd: 0,
  highestOrdBase: 10,
  highestOrdOver: 0,
  infTimes: 0,
  lastInfTick: 0,
  lastFSTick: 0,
  curTick: 0
}

let factorShiftCosts=[200, 1000, 10000, 350000, 10**12, 10**21, 10**100, Infinity]
let factorCostExp=[2,2,2,3,3,6,30,100]
function reset() {
  game={
    base: 10,
    ord: 0,
    over: 0,
    canInf: false,
    OP: 0,
    infUnlock: 0,
    subTab: 1,
    succAuto: 0,
    limAuto: 0,
    infAutoUnlocked: 0,
    infAuto: 0,
    autoLoop: {succ: 0, lim: 0, inf: 0},
    factorShifts: 0,
    factors: [],
    notation: 0,
    notationOrd: 0,
    infOP: false,
    highestOrd: 0,
    highestOrdBase: 10,
    highestOrdOver: 0,
    infTimes: 0,
    lastInfTick: 0,
    lastFSTick: 0,
    curTick: 0
  }
  document.getElementById("infinityTabButton").style.display="none"
  render()
  updateFactors()
}

Tab(1)
reset()
updateFactors()

load()
function load() {
  let loadgame = JSON.parse(localStorage.getItem("ordinalMarkupSaveOriginal"))
  loadGame(loadgame)
}

function loadGame(loadgame) {
  if (loadgame != null) {
    if (typeof loadgame.base != "undefined") game.base = loadgame.base
    if (typeof loadgame.ord != "undefined") game.ord = loadgame.ord
    if (typeof loadgame.over != "undefined") game.over = loadgame.over
    if (typeof loadgame.canInf != "undefined") game.canInf = loadgame.canInf
    if (typeof loadgame.OP != "undefined") game.OP = loadgame.OP
    if (typeof loadgame.infUnlock != "undefined") game.infUnlock = loadgame.infUnlock
    if (game.infUnlock==1) document.getElementById("infinityTabButton").style.display="inline-block"
    if (typeof loadgame.subTab != "undefined") game.subTab = loadgame.subTab
    if (typeof loadgame.succAuto != "undefined") game.succAuto = loadgame.succAuto
    if (typeof loadgame.limAuto != "undefined") game.limAuto = loadgame.limAuto
    if (typeof loadgame.autoLoop != "undefined") game.autoLoop = loadgame.autoLoop
    if (typeof loadgame.factorShifts != "undefined") game.factorShifts = loadgame.factorShifts
    if (typeof loadgame.factors != "undefined") game.factors = loadgame.factors
    if (typeof loadgame.infAutoUnlocked != "undefined") game.infAutoUnlocked = loadgame.infAutoUnlocked
    if (typeof loadgame.notation != "undefined") game.notation = loadgame.notation
    if (typeof loadgame.notationOrd != "undefined") game.notationOrd = loadgame.notationOrd
    if (typeof loadgame.infOP != "undefined") { game.infOP = loadgame.infOP; if (game.infOP) game.OP = Infinity; }
    if (typeof loadgame.highestOrd != "undefined") game.highestOrd = loadgame.highestOrd
    if (typeof loadgame.highestOrdBase != "undefined") game.highestOrdBase = loadgame.highestOrdBase
    if (typeof loadgame.highestOrdOver != "undefined") game.highestOrdOver = loadgame.highestOrdOver
    if (typeof loadgame.infTimes != "undefined") game.infTimes = loadgame.infTimes
    if (typeof loadgame.lastInfTick != "undefined") game.lastInfTick = loadgame.lastInfTick
    if (typeof loadgame.lastFSTick != "undefined") game.lastFSTick = loadgame.lastFSTick
    if (typeof loadgame.curTick != "undefined") game.curTick = loadgame.curTick
  }
}

function save() {
  localStorage.setItem("ordinalMarkupSaveOriginal", JSON.stringify(game))
}

render()
updateFactors()

function increment() {
  if (game.ord % game.base == game.base-1) {
    game.over += 1
  } else {
    game.ord += 1
  }
  render()
}


function maximize() {
  if (game.ord % game.base == game.base-1 && game.over >= 1) {
    game.ord -= game.base-1
    game.over += game.base-1
    do {
      game.over -= Math.ceil((game.over+game.base)/2-0.1)
      game.ord += game.base
    } while (game.over+game.base >= game.base*2 && game.ord % (game.base**2) != 0)
    if (game.ord % (game.base**2) != 0) {
    game.ord += game.over
    }
    game.over = 0
  }
  render()
}

var calculate = window.setInterval(function() {
  loop()
}, 50)

function loop() {
  if (game.infAuto > 0 && game.infAutoUnlocked > 0) {
    game.autoLoop.inf += 50
    if (game.autoLoop.inf >= game.infAuto) {
      game.autoLoop.inf -= game.infAuto
      infinity()
    }
  }
  if (game.succAuto > 0) {
    game.autoLoop.succ += 50
    if (game.autoLoop.succ >= 1000/(game.succAuto*factorMult)) {
      game.autoLoop.succ -= 1000/(game.succAuto*factorMult)
      increment()
    }
  }
  if (game.limAuto > 0) {
    game.autoLoop.lim += 50
    if (game.autoLoop.lim >= 1000/(game.limAuto*factorMult)) {
      game.autoLoop.lim -= 1000/(game.limAuto*factorMult)
      maximize()
    }
  }
  if (game.base < 8){
    game.infAutoUnlocked = 1
  }
  if (game.autoLoop.succ >= 1000/(game.succAuto*factorMult)) {
    if (game.autoLoop.lim >= 1000/(game.limAuto*factorMult)) {
      game.over = 0
      game.ord += Math.min(Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult))),game.base*Math.floor(game.autoLoop.lim/(1000/(game.limAuto*factorMult))))
      game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      game.autoLoop.lim = game.autoLoop.lim % (1000/(game.limAuto*factorMult))
    } else {
      if (Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult))) >= game.base-(game.ord % game.base)) {
        game.ord += game.base-(game.ord % game.base)-1
        game.over += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult)))-(game.base-(game.ord % game.base)-1)
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      } else {
        game.ord += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult)))
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      }
    }
  }
  render()
  game.curTick += 1
}

function render() {
  let newHighestOrd = false
  if (game.base == game.highestOrdBase) {
    if (game.ord > game.highestOrd) newHighestOrd = true
    if (game.ord == game.highestOrd && game.over > game.highestOrdOver) newHighestOrd = true
  } else {
    let currentOP = calcHugeOrdPoints(game.ord, game.base, game.over)
    let highestOP = calcHugeOrdPoints(game.highestOrd, game.highestOrdBase, game.highestOrdOver)
    if (currentOP.gt(highestOP)) newHighestOrd = true
  }
  if (newHighestOrd) {
    game.highestOrd = game.ord
    game.highestOrdBase = game.base
    game.highestOrdOver = game.over
  }
  let outSize = fghexp((game.ord % (game.base**3)+0.1)/(game.base**2),Math.pow(2,Math.floor((game.ord % (game.base**2)+0.1)/game.base))*(game.base+game.over+(game.ord % game.base)))
  document.getElementById("hardy").innerHTML="H<sub>" + displayOrd(game.ord,game.base,game.over) + "</sub>&nbsp;(" + game.base + ")" + (game.ord >= (game.base**3) || outSize == Infinity ? "" : "=" + beautify(outSize))
  game.canInf = (game.ord >= (game.base**3) || outSize >= 10240 || outSize >= Infinity)
  if (game.canInf) {
    document.getElementById("infinityButton").innerHTML = "Infinity to gain " + beautify(calcOrdPoints(game.ord,game.base,game.over)) + " Ordinal Points"
  } else {
    document.getElementById("infinityButton").innerHTML = "Reach 10240 to Infinity"
  }
  document.getElementById("ordinalPointsDisplay").innerHTML = "You have " + beautify(game.OP) + " Ordinal Points"
  document.getElementById("succAutoAmount").innerHTML = "You have " + beautify(game.succAuto) + " successor autobuyer, clicking the successor button " + beautify(game.succAuto*factorMult) + " times per second"
  document.getElementById("limAutoAmount").innerHTML = "You have " + beautify(game.limAuto) + "  maximize autobuyer, clicking the maximize button " + beautify(game.limAuto*factorMult) + " times per second"

  document.getElementById("buysucc").innerHTML = "Buy Successor Autobuyer for " + beautify(100*2**game.succAuto) + " OP"
  document.getElementById("buylim").innerHTML = "Buy Maximize Autobuyer for " + beautify(100*2**game.limAuto) + "  OP"
  document.getElementById("factorShift").innerHTML = "Factor Shift (" + game.factorShifts + "): Requires " + beautify(factorShiftCosts[game.factorShifts]) +" OP"
  document.getElementById("noFactors").style.display=(game.factors.length==0 ? "inline-block" : "none")
  document.getElementById("factorList").style.display=(game.factors.length==0 ? "none" : "inline-block")
  factorMult=1
  if (game.factors.length>0) {
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      factorMult *= (1+game.factors[factorListCounter])*2
    }
  }
  document.getElementById("factorMult").innerHTML = "Your factors are multiplying your autoclickers by " + beautify(factorMult)
  document.getElementById("notationButton").innerHTML = "Number Notation: " + (game.notation == 0 ? "Scientific" : "Standard");
  document.getElementById("notationOrdButton").innerHTML = "Ordinal Notation: " + (game.notationOrd == 0 ? "Standard" : "Convenient");

  document.getElementById("highestOrdStat").innerHTML = "Your highest Ordinal was " + displayOrd(game.highestOrd, game.highestOrdBase, game.highestOrdOver);
  document.getElementById("infTimesStat").innerHTML = "You have Infinitied " + game.infTimes + " time(s)";
  document.getElementById("lastInfStat").innerHTML = (game.infTimes > 0) ? "Your last Infinity was " + time(Math.floor((game.curTick - game.lastInfTick) / 20)) + " ago" : "";
  document.getElementById("factorShiftsStat").innerHTML = "You have done " + game.factorShifts + " Factor Shift(s)";
  document.getElementById("lastFSStat").innerHTML = (game.factorShifts > 0) ? "Your last Factor Shift was " + time(Math.floor((game.curTick - game.lastFSTick) / 20)) + " ago" : "";
  document.getElementById("timePlayedStat").innerHTML = "You have played for " + time(Math.floor(game.curTick / 20));
}

function updateFactors() {
  if (game.factors.length>=0) {
    let factorListHTML=""
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      factorListHTML = factorListHTML + "<li>Factor " + (factorListCounter+1) + " x" + ((1+game.factors[factorListCounter])*2) + " <button onclick=\"buyFactor(" + factorListCounter + ")\">Increase Factor " + (factorListCounter+1) + " for " + beautify(Math.pow(10**(factorListCounter+1),Math.pow(factorCostExp[factorListCounter],game.factors[factorListCounter]))) + " OP</button></li>"
    }
    document.getElementById("factorListMain").innerHTML=factorListHTML
  }
}

function buysucc() {
  if (game.OP>=100*2**game.succAuto) {
    game.OP-=100*2**game.succAuto
    if (isNaN(game.OP)) { game.OP = 0; game.infOP = false; }
    game.succAuto += 1
  }
  render()
}

function buylim() {
  if (game.OP>=100*2**game.limAuto) {
    game.OP-=100*2**game.limAuto
    if (isNaN(game.OP)) { game.OP = 0; game.infOP = false; }
    game.limAuto += 1
  }
  render()
}

function maxall() {
  if (game.OP == Infinity) {
    if (game.succAuto < 1018) game.succAuto = 1018
    if (game.limAuto < 1018) game.limAuto = 1018
    return
  }

  if (100*2**game.succAuto < Infinity) buysucc()
  if (100*2**game.limAuto < Infinity) buylim()

  let bulkSucc = Math.floor(Math.log2(1 + (Math.min(game.OP, Number.MAX_VALUE) / (100 * (2 ** game.succAuto)))))
  game.OP -= (((2 ** bulkSucc) - 1) * 100 * (2 ** game.succAuto))
  game.succAuto += bulkSucc

  let bulkMax = Math.floor(Math.log2(1 + (Math.min(game.OP, Number.MAX_VALUE) / (100 * (2 ** game.limAuto)))))
  game.OP -= (((2 ** bulkMax) - 1) * 100 * (2 ** game.limAuto))
  game.limAuto += bulkMax
}

function infinity() {
  if (game.canInf) {
    game.OP += calcOrdPoints(game.ord,game.base,game.over)
    game.ord = 0
    game.over = 0
    document.getElementById("infinityTabButton").style.display="inline-block"
    game.infUnlock = 1
    game.infTimes += 1
    game.lastInfTick = game.curTick
  }
  if (game.OP == Infinity) game.infOP = true
  render()
}

function displayOrd(ord,base,over=0,trim=8) {
  if (ord<base) {
    return ord+over
  } else {
    let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
    let tempvar2 = Math.pow(base,tempvar)
    let tempvar3 = Math.floor((ord+0.1)/tempvar2)
    return "ω" + (tempvar==1 ? "" : (game.notationOrd == 1 ? "^(" : "<sup>") + displayOrd(tempvar,base,0) + (game.notationOrd == 1 ? ")" : "</sup>")) + (tempvar3==1 ? "" : (game.notationOrd == 1 && tempvar > 1.5 ? "×" : "") + tempvar3) + (ord-tempvar2*tempvar3+over==0 || trim==0 ? (ord-tempvar2*tempvar3+over==0 ? "": "+...") : "+" + displayOrd(ord-tempvar2*tempvar3,base,over,trim-1))
  }
}

function fghexp(times, on) {
  if (times<1) {
    return on
  } else {
    return fghexp(times-1,Math.pow(2,on)*on)
  }
}

function beautify(number, notation=game.notation) {
  if (isNaN(number)) return "NaN"
  if (!isFinite(number)) return "Infinity"
  if (notation==0) {
    let exponent = Math.floor(Math.log10(number+0.1))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 6) return Math.round(number)
    return mantissa.toFixed(3) + "e" + exponent
  }
  return number
}

function calcOrdPoints(ord,base,over) {
  if (ord<base) {
    return ord+over
  } else {
    let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
    let tempvar2 = Math.pow(base,tempvar)
    let tempvar3 = Math.floor((ord+0.1)/tempvar2)
    return 10**calcOrdPoints(tempvar,base,0)*tempvar3+calcOrdPoints(ord-tempvar2*tempvar3,base,over)
  }
}

function calcHugeOrdPoints(ord, base, over, trim = 0) {
    ord = D(ord)
    if (!base) return D(ord)
    if (base < 0) return calcHugeOrdPoints(ord, -base, over, trim)
    if (ord.eq(Infinity) || base === 1) return D(Infinity)
    if (ord.lt(base)) return Decimal.add(ord, over)

    /*if (ord.gte(Decimal.tetrate(base, base))) {
        return Decimal.tetrate(10, opGain(ord.slog(base), base, 0, trim))
    }*/

    let powerOfOmega = Decimal.log(ord.add(0.1), base).floor()
    let highestPower = Decimal.pow(base,powerOfOmega)
    let powerMultiplier = Decimal.floor(ord.add(0.1).div(highestPower))
    return Decimal.pow(10, calcHugeOrdPoints(powerOfOmega,base,0)).mul(powerMultiplier).add(ord.lt(Decimal.tetrate(base,3)) ? calcHugeOrdPoints(ord.sub(highestPower.mul(powerMultiplier)),base,over,trim+1) : 0)
}

function Tab(t) {
  for (let tt=1; tt<=5; tt++ ) {
    document.getElementById("Tab" + tt).style.display="none"
  }
  document.getElementById("Tab" + t).style.display="inline-block"
  subTab(game.subTab)
}

function subTab(t) {
  document.getElementById("subTab1").style.display="none"
  document.getElementById("subTab2").style.display="none"
  document.getElementById("subTab" + t).style.display="inline-block"
  game.subTab=t
}

var autoSave = window.setInterval(function() {
  save()
}, 10000)

function resetConf() {
  let code = prompt("Are you sure you want to delete all of your progress? Type in \"yes\" to reset all of your progress.")
  if (code.toLowerCase()=="yes") reset()
}

function factorShift() {
  if (game.OP>=factorShiftCosts[game.factorShifts]) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto=0
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts += 1
    game.base -= 1
    game.factors=[]
    for(let i=0;i<game.factorShifts;i++) {
      game.factors.push(0)
    }
    game.lastFSTick = game.curTick
  }
  render()
  updateFactors()
}

function buyFactor(n) {
  if (game.OP >= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n])))) {
    game.OP -= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n])))
    if (isNaN(game.OP)) { game.OP = 0; game.infOP = false; }
    game.factors[n] += 1
  }
  render()
  updateFactors()
}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  alert("Copied to clipboard!");
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}

function exporty() {
  copyStringToClipboard(btoa(JSON.stringify(game)));
}

function importy() {
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    loadGame(loadgame);
    alert("Import Successful!");
    window.setTimeout(() => {
    save()
    window.location.reload()
    },200)
  }
}

function changeNotation() {
  game.notation = (game.notation + 1) % 2;
  render();
}

function changeNotationOrd() {
  game.notationOrd = (game.notationOrd + 1) % 2;
  render();
}

function time(x) {
  if (x==Infinity) return "an eternity";
  let timeList = [
    Math.floor(x / 86400),
    Math.floor((x % 86400) / 3600),
    Math.floor((x % 3600) / 60),
    Math.floor(x % 60)
  ];
  let timeUnits = [" day(s) ", " hour(s) ", " minute(s) ", " second(s)"];
  while (timeList[0] == 0) {
    timeList.shift();
    timeUnits.shift();
  }
  let timeOut = "";
  for (let i = 0; i < timeList.length; i++) {
    timeOut += timeList[i];
    timeOut += timeUnits[i];
  }
  if (timeOut == "") timeOut = "less than 1 second";
  return timeOut;
}
