let O = x => {
  return new OmegaNum(x); // Ignore
};

var Omg = OmegaNum; // Ignore

function Game() {
  this.pts = O("0"); // The number
  this.btn = O("1"); // Button level
  this.bc = O("20"); // Button cost
  this.ps = O("1"); // Number per second (modified)
  this.auto1 = { // Autobuyer stats
    lv: 0, // Level
    tick: 0,
  };
  this.tet = { // Tetrate (prestige layer) stats
    pts: O(0),
    pdpt: O(0), // Pending points
    ups: [false,false], // Whether or not upgrades were bought
    upcs: [O(7),O(100)], // Costs of upgrades
    bmlt: O(1), // Linear multiplier on buttons
  };
  this.pnt = { // Pentate (prestige layer) stats
    pts: O(0),
    pdpt: O(0),
    ups: [false,false,false],
    upcs: [O(7),O(20),O(50)],
    bmlt: O(1),
  };
  this.hyp = { // Hyper (prestige layer) stats
    pts: O(0),
    pdpt: O(0),
    ups: [false,false,false],
    upcs: [O(7),O(20),O(50)],
    bmlt: O(1),
    lv: O(6),
  };
  this.firstTick = Date.now();
  this.lastTick = Date.now();
  this.winTick = Date.now();
  this.keepGoing = false;
  this.bestTime = 0;
}

var interval = 10;

var game = new Game();

var tab = "lngi";

var tab2 = "auto";

var speedMult = 10; // speed multiplier (more is faster, but too much will cause lag esp. on higher hyper orders)

var allUpgrades = true; // give all upgrades by default = no prestige required (true LNGI)

load();

setInterval(save, interval/1000);

function switchTabs(newtab){ // Switches between different main tabs
  document.getElementById(tab).style.display = "none";
  document.getElementById(newtab).style.display = "block";
  tab = newtab;
}

function switchTabs2(newtab){ // Switches between different layer tabs
  document.getElementById(tab2).style.display = "none";
  document.getElementById(newtab).style.display = "block";
  tab2 = newtab;
}

function loga3(onum) { // Pentation log
  if(onum.array.length > 4){
    return O(onum);
  } else if(onum.array.length == 4){
    onum.array[3]--;
    return O(onum);
  } else if(onum.array.length == 3){
    onum = O(onum.array[2]).add(1);
    return O(onum);
  } else if(onum.array.length == 2 && onum.array[1] >= 10){
    return O(2);
  } else if(onum.array[1] < 10 || onum.array.length == 1){
    return O(1);
  } else {
    return O(0);
  }
}

function hyperlog(arrow, onum) {
  if (arrow == 1) {
    return O(onum).log(10);
  } else if (arrow == 2) {
    return O(onum).slog(10);
  } else if (arrow == 3) {
    return loga3(onum);
  } else if(onum.array.length > arrow + 1){
    return O(onum);
  } else if(onum.array.length == arrow + 1){
    onum.array[arrow]--;
    return O(onum);
  } else if(onum.array.length == arrow){
    onum = O(onum.array[arrow - 1]).add(1);
    return O(onum);
  } else if(onum.array.length == arrow - 1 && onum.array[arrow - 2] >= 10){
    return O(2);
  } else if(onum.array[arrow - 2] < 10 || onum.array.length == arrow - 2){
    return O(1);
  } else {
    return O(0);
  }
}

function notate(omgnum,fp) { // How to write things ingame
  if(O(omgnum).lt("1e6")){
    return O(omgnum).toNumber().toFixed(fp);
  } else if(O(omgnum).lt("ee6")){
    return O(omgnum).div(O(10).pow(O(omgnum).log10().floor())).toNumber().toFixed(2) + "e" + O(omgnum).log10().floor();
  } else if(O(omgnum).slog(10).lt(10)) {
    return "e" + notate(O(omgnum).log10(),fp);
  } else if(O(omgnum).lt("10^^^5"))  {
    return "10^^" + notate(O(omgnum).slog(10),fp);
  } else {
    return O(omgnum).toHyperE();
  }
}

function updateText() { // Updates all text
  document.getElementById("num").textContent = notate(O(game.pts),1);
  document.getElementById("num1").textContent = notate(O(game.pts),1);
  document.getElementById("btn1").textContent = notate(O(game.btn),1);
  if(game.auto1.lv < 20){
    document.getElementById("al1").textContent = game.auto1.lv;
    document.getElementById("at1").textContent = 1000-game.auto1.lv*50;
    document.getElementById("ac1").textContent = notate(O(10000).pow(O(game.auto1.lv).add(1)),1);
  } else {
    document.getElementById("al1").textContent = "MAX";
    document.getElementById("at1").textContent = "instant";
    document.getElementById("ac1").textContent = "Infinite";
  }
  document.getElementById("bc1").textContent = notate(O(game.bc),1);
  document.getElementById("tp").textContent = notate(O(game.tet.pts),1);
  document.getElementById("tb").textContent = notate(O(1.05).add(O(game.tet.pts).add(O(game.pnt.pts)).div(100)).pent(OmegaNum.hyper(O(game.hyp.lv))(O(game.pnt.pts),O(game.hyp.pts).div(100).add(1)).div(100).add(1)),2);
  document.getElementById("tpdpt").textContent = notate(O(game.tet.pdpt),1);
  document.getElementById("tps").textContent = notate(O(game.tet.pts).div(100).mul(O(game.pnt.bmlt)).add(O(0.01)),2);
  document.getElementById("pp").textContent = notate(O(game.pnt.pts),1);
  document.getElementById("pb").textContent = notate(O(1).add(OmegaNum.hyper(O(game.hyp.lv))(O(game.pnt.pts),O(game.hyp.pts).div(100).add(1)).div(100)),2);
  document.getElementById("ppdpt").textContent = notate(O(game.pnt.pdpt),0);
  document.getElementById("hp").textContent = notate(O(game.hyp.pts),1);
  document.getElementById("hb").textContent = notate(O(1).add(O(game.hyp.pts).div(100)),2);
  document.getElementById("hpdpt").textContent = notate(O(game.hyp.pdpt),0);
  document.getElementById("hyperord").textContent = notate(O(game.hyp.lv),0);
  document.getElementById("hyperop").textContent = getOp(O(game.hyp.lv));
  if(game.tet.ups[0]){
    document.getElementById("tu1").textContent = "Bought!";
  } else {
    document.getElementById("tu1").textContent = "Not bought!";
  }
  if(game.tet.ups[1]){
    document.getElementById("tu2").textContent = "Bought!";
  } else {
    document.getElementById("tu2").textContent = "Not bought!";
  }
  if(game.pnt.ups[0]){
    document.getElementById("pu1").textContent = "Bought!";
  } else {
    document.getElementById("pu1").textContent = "Not bought!";
  }
  if(game.pnt.ups[1]){
    document.getElementById("pu2").textContent = "Bought!";
  } else {
    document.getElementById("pu2").textContent = "Not bought!";
  }
  if(game.pnt.ups[2]){
    document.getElementById("pu3").textContent = "Bought!";
  } else {
    document.getElementById("pu3").textContent = "Not bought!";
  }
  if(game.hyp.ups[0]){
    document.getElementById("hu1").textContent = "Bought!";
  } else {
    document.getElementById("hu1").textContent = "Not bought!";
  }
  if(game.hyp.ups[1]){
    document.getElementById("hu2").textContent = "Bought!";
  } else {
    document.getElementById("hu2").textContent = "Not bought!";
  }
  if(game.hyp.ups[2]){
    document.getElementById("hu3").textContent = "Bought!";
  } else {
    document.getElementById("hu3").textContent = "Not bought!";
  }
  document.getElementById("hu4").textContent = O(game.hyp.lv).toString();
  document.getElementById("playtime").textContent = formatTime(game.lastTick - game.firstTick);
  document.getElementById("timePlayed").textContent = formatTime(game.winTick - game.firstTick);
  document.getElementById("besttime").textContent = game.bestTime ? formatTime(game.bestTime) : "Not yet done";
}

function updateBtn(){ // Updates buttons
  if(O(game.pts).gte("e100") && !game.tet.ups[1]){
    document.getElementById("tetrate").style.display = "inline";
  } else {
    document.getElementById("tetrate").style.display = "none";
  }
  if(game.auto1.lv == 20 || O(game.tet.pts).gt(0) || game.tet.ups[0]){
    document.getElementById("tetbtn").style.display = "inline";
    if (allUpgrades) game.tet.ups = [true,true];
  }
  if(O(game.pts).gte("10^^12") && !game.pnt.ups[2]){
    document.getElementById("pentate").style.display = "inline";
  } else {
    document.getElementById("pentate").style.display = "none";
  }
  if(O(game.tet.pts).gte("e10") || O(game.pnt.pts).gt(0) || game.pnt.ups[0] || game.pnt.ups[1] || O(game.hyp.pts).gt(0) ){
    document.getElementById("pntbtn").style.display = "inline";
    if (allUpgrades) game.pnt.ups = [true,true,true];
  } else {
    document.getElementById("pntbtn").style.display = "none";
  }
  if(O(game.pts).gte(OmegaNum.hyper(O(game.hyp.lv).sub(1))(10,12)) && !game.hyp.ups[2]){
    document.getElementById("hyperate").style.display = "inline";
  } else {
    document.getElementById("hyperate").style.display = "none";
  }
  if(O(game.pnt.pts).gte("e10") || O(game.hyp.pts).gt(0) || game.hyp.ups[0] || game.hyp.ups[1]){
    document.getElementById("hypbtn").style.display = "inline";
    if (allUpgrades) game.hyp.ups = [true,true,true];
  } else {
    document.getElementById("hypbtn").style.display = "none";
  }
}

function formatTime(t) { // formats time
  const ticksPerSecond = 1000;
  let d = Math.floor(t / (24 * 60 * 60 * ticksPerSecond));
  let h = Math.floor(t / (60 * 60 * ticksPerSecond)) % 24;
  let m = Math.floor(t / (60 * ticksPerSecond)) % 60;
  let s = (t / ticksPerSecond) % 60;
  return d + "d " + h + "h " + m + "m " + notate(s, 3) + "s";
}

function buybtn1(amt){ // Buys button
  if(amt != "max") {
    if(O(game.pts).gte(O(amt).mul(O(game.bc)))){
      game.pts = game.pts.sub(O(amt).mul(O(game.bc)));
      game.btn = O(game.btn).add(O(amt));
    }
  } else {
    buybtn1(O(game.pts).div(O(game.bc)).floor());
  }
}

function auto1(){ // Buys autobuyer
  if(O(game.pts).gte(O(10000).pow(O(game.auto1.lv).add(1))) && game.auto1.lv < 20) {
    game.pts = O(game.pts).sub(O(10000).pow(O(game.auto1.lv).add(1)));
    game.auto1.lv++;
    if(game.auto1.lv == 20){
      document.getElementById("tetbtn").style.display = "inline";
    }
  }
}

function maxall(){ // Maxes button level
  buybtn1("max");
}

function tetrate(){ // Tetrates (prestige layer), resets various things while increasing tetration points.
  game.tet.pts = O(game.tet.pts).add(O(game.tet.pdpt));
  game.pts = O("0");
  game.btn = O("1");
  game.bc = O("20");
  game.ps = O("1");
  game.auto1 = {
    lv: 0,
    tick: 0,
  };
}

function tu(upg){ // Buys specified tetration upgrade
  if(O(game.tet.pts).gte(O(game.tet.upcs[upg])) && !game.tet.ups[upg]){
    game.tet.pts = O(game.tet.pts).sub(O(game.tet.upcs[upg]));
    if(upg >= 1){
      game.pts = O(0);
      tetrate();
      game.tet.pts = O(1);
    }
    game.tet.ups[upg] = true;
    document.getElementById("tu" + (upg+1)).textContent = "Bought!";
  } else if(!O(game.tet.pts).gte(O(game.tet.upcs[upg]))) {
    document.getElementById("tu" + (upg+1)).textContent = "Not bought!";
  }
}

function pentate(){
  game.pnt.pts = O(game.pnt.pts).add(O(game.pnt.pdpt));
  tetrate();
  game.tet.pts = O(0);
  if(!game.pnt.ups[1]){
    game.tet.ups = [false,false];
  }
}

function pu(upg){ // Buys specified pentation upgrade
  if(O(game.pnt.pts).gte(O(game.pnt.upcs[upg])) && !game.pnt.ups[upg]){
    game.pnt.pts = O(game.pnt.pts).sub(O(game.pnt.upcs[upg]));
    if(upg == 2){
      game.pts = O(0);
      pentate();
      game.pnt.pts = O(1);
    }
    if(upg == 1){
      game.tet.ups = [true,true];
    }
    game.pnt.ups[upg] = true;
    document.getElementById("pu" + (upg+1)).textContent = "Bought!";
  } else if(!O(game.pnt.pts).gte(O(game.pnt.upcs[upg]))) {
    document.getElementById("pu" + (upg+1)).textContent = "Not bought!";
  }
}

function hyperate(){
  game.hyp.pts = O(game.hyp.pts).add(O(game.hyp.pdpt));
  pentate();
  game.pnt.pts = O(0);
  if(!game.hyp.ups[1]){
    game.pnt.ups = [false,false,false];
  }
}

function hu(upg){ // Buys specified hyper upgrade
  if (upg == 3) {
    if (O(game.hyp.pts).gte(O("10^10"))) {
      game.hyp.lv = O(game.hyp.lv).add(1);
      if (OmegaNum.maxArrow < parseInt(O(game.hyp.lv).toString()) - 1) {
        OmegaNum.maxArrow = parseInt(O(game.hyp.lv).toString()) - 1;
      }
      if (allUpgrades) {
        game.hyp.pts = O(1); //game.hyp.pts.sub(O("10^10"));
      } else {
        game.pts = O(0);
        hyperate();
        game.hyp.pts = O(1);
      }
    }
    return;
  }
  if(O(game.hyp.pts).gte(O(game.hyp.upcs[upg])) && !game.hyp.ups[upg]){
    game.hyp.pts = O(game.hyp.pts).sub(O(game.hyp.upcs[upg]));
    if(upg == 2){
      game.pts = O(0);
      hyperate();
      game.hyp.pts = O(1);
    }
    if(upg == 1){
      game.pnt.ups = [true,true,true];
    }
    game.hyp.ups[upg] = true;
    document.getElementById("hu" + (upg+1)).textContent = "Bought!";
  } else if(!O(game.hyp.pts).gte(O(game.hyp.upcs[upg]))) {
    document.getElementById("hu" + (upg+1)).textContent = "Not bought!";
  }
}

function getOp(x) {
  op = parseInt(x.toString());
  switch (op) {
    case 0: return "zerating";
    case 1: return "adding";
    case 2: return "multiplying";
    case 3: return "exponentiating";
    case 4: return "tetrating";
    case 5: return "pentating";
    case 6: return "hexating";
    case 7: return "heptating";
    case 8: return "octating";
    case 9: return "enneating";
    case 10: return "decating";
    case 11: return "undecating";
    case 12: return "doedecating";
    case 13: return "tredecating";
    case 14: return "tetradecating";
    case 15: return "pentadecating";
    case 16: return "hexadecating";
    case 17: return "heptadecating";
    case 18: return "octadecating";
    case 19: return "enneadecating";
    case 20: return "vigintating";
    default: return op + "-ating";
  }
}

// Determines when the game "ends"
function isEndgame() {
  return new OmegaNum(game.pts).gte(new OmegaNum("10{10}10"));
}

function playAgain() {
  if (wipe()) {
    document.getElementById('gametabs').style.display = "block";
    document.getElementById('endgame').style.display = "none";
  }
}

function keepGoing() {
  game.keepGoing = true;
  document.getElementById('gametabs').style.display = "block";
  document.getElementById('endgame').style.display = "none";
}

function loop(n=1) { // Main game loop
  for (let i=0;i<n;i++) {
    game.tet.upcs = [O(7),O(100)];
    if(game.auto1.lv > 0 && game.auto1.lv < 20){
      game.auto1.tick++;
    } else if(game.auto1.lv == 20){
      game.btn = O(game.btn).mul(O(game.tet.bmlt).div(600).add(1));
      game.pts = O(game.ps).div(30);
    }
    if (isEndgame() && (!game.keepGoing)) {
      let bestTime = game.winTick - game.firstTick;
      if (!game.bestTime || (bestTime < game.bestTime)) game.bestTime = bestTime;
      document.getElementById('gametabs').style.display = "none";
      document.getElementById('endgame').style.display = "block";
      document.getElementById("playtime").textContent = formatTime(game.lastTick - game.firstTick);
      document.getElementById("timePlayed").textContent = formatTime(game.winTick - game.firstTick);
      document.getElementById("besttime").textContent = game.bestTime ? formatTime(game.bestTime) : "Not yet done";
      return;
    }
    if(game.pnt == undefined){
      game.pnt = { // Pentate (prestige layer) stats
        pts: O(0),
        pdpt: O(0),
        ups: [false,false,false],
        upcs: [O(7),O(20),O(50)],
        bmlt: O(1),
      };
    }
    game.pnt.upcs = [O(7),O(20),O(50)];
    if(game.hyp == undefined){
      game.hyp = { // Hyper (prestige layer) stats
        pts: O(0),
        pdpt: O(0),
        ups: [false,false,false],
        upcs: [O(7),O(20),O(50)],
        bmlt: O(1),
        lv: O(6),
      };
    }
    game.hyp.upcs = [O(7),O(20),O(50)];
    game.ps = O(game.btn).tetr(O(1.05).add(O(game.tet.pts).div(100)).mul(O(game.pnt.pts).add(1)).pent(OmegaNum.hyper(O(game.hyp.lv))(O(game.pnt.pts),O(game.hyp.pts).div(100).add(1)).div(100).add(1)));
    game.bc = O(game.ps).div(O(0.05).mul(O(game.btn)));
    game.pts = O(game.pts).add(O(game.ps).mul(O(game.tet.bmlt)).div(30));
    game.tet.pdpt = O(game.pts).pow(0.1).add(1).slog(10).mul(O(game.pnt.bmlt));
    game.pnt.pdpt = loga3(O(game.pts).add(1));
    game.hyp.pdpt = hyperlog(O(game.hyp.lv).sub(2),O(game.pts).add(1));
    if(game.tet.ups[0]){
      game.tet.bmlt = O(game.tet.pts).add(1).sqrt();
    } else {
      game.tet.bmlt = O(1);
    }
    if(game.tet.ups[1]){
      game.tet.pts = O(game.tet.pts).add(O(1).div(3000));
      game.tet.pts = O(game.tet.pts).add(O(game.tet.pts).mul(O(game.pnt.bmlt)).div(3000));
    }
    if(game.pnt.ups[0]){
      game.pnt.bmlt = O(game.pnt.pts).add(1).sqrt();
    } else {
      game.pnt.bmlt = O(1);
    }
    if(game.pnt.ups[2]){
      game.pnt.pts = O(game.pnt.pts).add(O(game.pnt.pts).mul(O(game.hyp.bmlt)).div(3000));
    }
    if(game.pnt.ups[2] && O(game.pnt.pts).lt(1)){
      game.pnt.pts = O(1);
    }
    if(game.hyp.ups[0]){
      game.hyp.bmlt = O(game.hyp.pts).add(1).sqrt();
    } else {
      game.hyp.bmlt = O(1);
    }
    if(game.hyp.ups[2]){
      game.hyp.pts = O(game.hyp.pts).add(O(game.hyp.pts).div(3000));
    }
    if(game.hyp.ups[2] && O(game.hyp.pts).lt(1)){
      game.hyp.pts = O(1);
    }
    game.lastTick = Date.now();
    if (!isEndgame()) game.winTick = Date.now();
    updateText();
    updateBtn();
    if(game.auto1.tick >= (1000-game.auto1.lv*50)/(100/3)){
      game.auto1.tick -= (1000-game.auto1.lv*50)/(100/3);
      buybtn1("max");
    }
  }
}

function gameLoop() {
  loop(speedMult);
}

setInterval(gameLoop, 1000/30);
