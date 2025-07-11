const TABS = ["markup", "boost", "ach", "settings"]
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')
}
function initHTML(){
    initAchs()
    initBUPs()
    initChals()
    initIUPs()
    initHierarchies()
}
function loadUnlockedHTML(){
    DOM('boostNav').style.display = data.boost.times>0||data.ord.base===2?'block':'none'
    DOM('factorBoostButton').style.display = data.boost.times>0||data.ord.base===2?'inline-block':'none'
}
function loadSettingsHTML(){
    const descs = ["Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation", "Factor Boost confirmation", "Charge Refund Confirmation", "Boost Progress Bar"]
    for (let i = 0; i < data.sToggles.length; i++) {
        DOM(`settingsToggle${i}`).innerText = `Toggle the ${descs[i]} [${boolToReadable(data.sToggles[i])}]`
    }
    DOM(`offlineProgressToggle`).innerText = `Toggle Offline Progress [${boolToReadable(data.offline)}]`
    DOM(`base2Toggle`).innerText = `Toggle Uncap Base 3 Ordinals After Boost [${boolToReadable(data.base2)}]`
    DOM(`chalAfter3Toggle`).innerText = `Toggle Allow Challenge After 3 Completions [${boolToReadable(data.chalAfter3)}]`
    DOM(`gwordToggle`).innerText = `Toggle Gwaify Ordinals [${boolToReadable(data.gword)}]`
    DOM(`ordAboveBHOToggle`).innerText = `Toggle Display Ordinals Above BHO [${boolToReadable(data.ordAboveBHO)}]`
    DOM(`bulkBoostToggle`).innerText = `Toggle Bulk Boosting [${boolToReadable(data.bulkBoost)}]`
    DOM(`trueUncappedToggle`).innerText = `Toggle Remove Endgame Cap [${boolToReadable(data.trueUncapped)}]`
    DOM(`versionText`).innerText = `You're playing Ordinal Pringles v${VERSION}: ${VERSION_NAME}\n Last Update: ${VERSION_DATE}`
}

let timesToLoop = [0,0, 0,0]

let t2Auto = () => 1*chalEffectTotal()*bup5Effect()*incrementyMult()*iup6Effect()*bup48Effect()*hupData[1].effect()

function tick(diff){
    if(!data.ord.isPsi && ((data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) || (data.ord.ordinal >= Decimal.pentate(data.ord.base, 2).toNumber()))) {
        data.ord.isPsi = true
        data.ord.ordinal = 2 ** (data.ord.base - 1)
        if (data.ord.base === 2) data.ord.psi2 = data.ord.ordinal
    }

    chalComplete()

    //region automation
    for (let i = 0; i < 2; i++) timesToLoop[i] += !data.chal.active[4]?(diff*data.autoLevels[i]*factorBoost()*bup5Effect()*data.dy.level)/data.chal.decrementy
        :(diff*data.autoLevels[i]*factorBoost()*bup5Effect()/data.dy.level)/data.chal.decrementy
    
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]]?t2Auto():0

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){
            i===0?successor(timesToLoop[i]/1000):maximize()
            timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
        }
        if(isNaN(timesToLoop[i])) timesToLoop[i] = 0 // fix for NaN issues
    }

    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3) && data.autoStatus.enabled[0]){ 
        if (data.autoLevels[0] == 0 || data.autoLevels[1] == 0){
            buyMaxAuto()
            buyMaxFactor() 
            return
        }
        buyMaxFactor() 
        buyMaxAuto()
    }
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1]/* && data.ord.ordinal < BHO_VALUE*/) markup(timesToLoop[3]*diff/1000)

    if(data.boost.unlocks[2]) increaseHierarchies(diff)
    //endregion

    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = bup2Effect()
    boosterUnlock()

    boostLimit = data.trueUncapped ? Infinity : 285
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
    let diff = data.offline ? Math.max((Date.now() - data.lastTick), 0) : 50
    let uDiff = diff/1000

    if(data.dy.gain > 0 && data.dy.level < data.dy.cap) data.dy.level = Math.min(data.dy.cap, data.dy.level+uDiff*dyGain())
    if(data.boost.hasBUP[9]) data.markup.powers += bup9Effect()*uDiff
    if(data.chal.active[7]) data.chal.decrementy += decrementyGain(data.chal.decrementy*50)

    if(data.ord.isPsi && data.boost.unlocks[1]) {
        data.incrementy.amt += uDiff*incrementyGain()
        if (data.incrementy.amt===Infinity) data.incrementy.amt = Number.MAX_VALUE
    }
    if(data.boost.unlocks[3]) {
        data.overflow.bp += getOverflowGain(0)*uDiff
        data.overflow.oc += getOverflowGain(1)*uDiff
    }

    tick(diff)
    data.lastTick = Date.now()

    if (controls["s"].pressed) successor(1, true);
    if (controls["m"].pressed) maximize();
    if (controls["i"].pressed) markup();
    if (controls["f"].pressed) { buyMaxFactor(); buyMaxAuto(); }

    checkAchs()
    uHTML.update()
}
window.onload = function () {
    let extra = false
    try { extra = load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }

    makeExcessOrdMarks()
    makeExcessOrdMarks2() // sequence changed due to the excess ordMarks2 is actually needed for c2x3 requirement

    loadTabs()
    initHTML()
    loadUnlockedHTML()
    loadSettingsHTML()

    fixOldSavesP2()
}

window.setInterval(function () {
    if(!nan)mainLoop()
}, 50);
