const TABS = ["markup", "boost", "ach", "settings"]
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')

    initAchs()
    initBUPs()
    initChals()
}
function loadUnlockedHTML(){
    DOM('boostNav').style.display = data.boost.times>0?'block':'none'
    DOM('factorBoostButton').style.display = data.boost.times>0?'inline-block':'none'
}
function loadSettingsHTML(){
    const descs = ["Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation", "Factor Boost confirmation"]
    for (let i = 0; i < data.sToggles.length; i++) {
        DOM(`settingsToggle${i}`).innerText = `Toggle the ${descs[i]} [${boolToReadable(data.sToggles[i])}]`
    }
}

let timesToLoop = [0,0, 0,0]
let t2Auto = () => timesToLoop[3] * (data.boost.hasBUP[1]?5:1) * chalEffectTotal();
function tick(diff){
    if(!data.ord.isPsi && data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = 4
    }

    //region automation
    for (let i = 0; i < 2; i++) timesToLoop[i] += !data.chal.active[4]?(diff*data.autoLevels[i]*factorBoost()*bup5Effect()*data.dy.level)/data.chal.decrementy
        :(diff*data.autoLevels[i]*factorBoost()*bup5Effect()/data.dy.level)/data.chal.decrementy
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]]?1*bup5Effect():0

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){
            i===0?successor(timesToLoop[i]/1000):maximize()
            timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
        }
    }

    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3) && data.autoStatus.enabled[0]){ buyMaxFactor(); buyMaxAuto() }
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1]) markup(timesToLoop[3]*diff/1000)
    if(data.ord.isPsi && data.ord.ordinal >= BHO_VALUE) data.ord.ordinal = BHO_VALUE // pringles cap
    //endregion
    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = 3
    boosterUnlock()
    chalComplete()
}
const controls = {
    "s": { pressed: false },
    "m": { pressed: false },
    "i": { pressed: false },
    "f": { pressed: false }
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (controls[key]) {
        controls[key].pressed = true;
    }
}, false);
document.addEventListener('keyup', (event) => {
    let key = event.key;
    if (controls[key]) {
        controls[key].pressed = false;
    }
}, false);
function mainLoop() {
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = Math.max((Date.now() - data.lastTick), 0)
    let uDiff = diff/1000

    if(data.dy.gain > 0 && data.dy.level < data.dy.cap) data.dy.level += uDiff*dyGain()
    if(data.dy.level > data.dy.cap) data.dy.level = data.dy.cap
    if(data.boost.hasBUP[9]) data.markup.powers += 20*uDiff
    if(data.chal.active[7]) data.chal.decrementy += decrementyGain(50)

    tick(diff)
    data.lastTick = Date.now()
  
    if (controls["s"].pressed) successor(1, true);
    if (controls["m"].pressed) maximize();
    if (controls["i"].pressed) markup();
    if (controls["f"].pressed) { buyMaxFactor(); buyMaxAuto(); }

    checkAchs()
    uHTML.update()
}

window.setInterval(function () {
    mainLoop()
}, 50);
window.onload = function () {
    try { load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    loadTabs()
    loadUnlockedHTML()
    loadSettingsHTML()
}