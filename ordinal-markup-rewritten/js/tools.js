// saving and other tools

function isEncodedExpantaNum(thing) {
  return thing?.hasOwnProperty("sign") && thing.hasOwnProperty("array") && thing.hasOwnProperty("layer")
}

function expantaIze(thing) {
  let expanta = D(0)
  expanta.layer= thing.layer
  expanta.sign = thing.sign
  expanta.array = thing.array
  return expanta
}

function decodeObject(thing) {
  let clone = {...thing}
  for(let i in clone) {
    if(isEncodedExpantaNum(thing[i])) clone[i] = expantaIze(thing[i])
    else if(typeof thing[i]=="object" && thing[i]?.constructor.name != "Array") clone[i] = decodeObject(thing[i])
  }
  return clone
}

function save() {
  localStorage.gamesave = JSON.stringify(game)
  localStorage.presets = JSON.stringify(hotkeyPresets)
}

async function load() {
  if (localStorage.gamesave) game = await mergeDeep(game,decodeObject(JSON.parse(localStorage.gamesave)))
  if (localStorage.presets) hotkeyPresets = await mergeDeep(hotkeyPresets,decodeObject(JSON.parse(localStorage.presets)))
  setInterval(loop, 20) // nice
}

window.onload = async () => {
  await load()
  updateTheme()
  setInterval(save,10000) // 0.1 tick per second, 10000ms/10s delay
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function switchTheme() {
  app.style = app.style%3+1
}

function hardReset(){
  if (window.confirm("Are you sure you want to reset your game?")) {
    localStorage.removeItem("gamesave");
    location.reload();
  } else window.alert("You have not reset your game.")
}

function exportSave() {
  navigator.clipboard.writeText(btoa(JSON.stringify(game)))
}

function importSave() {
  var x = window.prompt("Please enter your save in the text box below.");
  if (x == "") {
    if (window.confirm('Are you sure you want to reset? This is not a prestige layer; you do not get a boost. This action is irreversible.')) {
      localStorage.clear();
      location.reload();
    };
    return
  };
  if(x!==null&&x!==undefined){
    game = mergeDeep(game,decodeObject(JSON.parse(atob(x))))
    save()
  }
}

function formatNumber(n, dec = 0) {
  if (isNaN(n)) return "NaN"
  const expanta = new ExpantaNum(n)
  if (expanta.gte("1e1e1e1e5")) return "way too large"
  if (expanta.lt(1e6)) return expanta.toFixed(dec)

  const exponent = expanta.log10().floor()
  const mantissa = expanta.div(ExpantaNum.pow(10, exponent)).toFixed(3)

  if (mantissa.startsWith("10")) return `1.000e${formatNumber(exponent.plus(1))}`
  return`${mantissa}e${formatNumber(exponent)}`
}

function hasUpgrade(row, column) {
  return game["col"+column] >= row;
}
