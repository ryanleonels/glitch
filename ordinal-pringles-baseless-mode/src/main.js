const TABS = ["markup", "ach", "settings"]
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')

    initAchs()
    for (let i = 7; i < data.markup.shifts; i++) {
        addFactor(i)
    }
}
function loadSettingsHTML(){
    const descs = ["Factor Shift confirmation"]
    for (let i = 0; i < data.sToggles.length; i++) {
        DOM(`settingsToggle${i}`).innerText = `Toggle the ${descs[i]} [${boolToReadable(data.sToggles[i])}]`
    }
}

let timesToLoop = [0,0]
function tick(diff){
    if(!data.ord.isPsi && data.ord.base >= 1 && data.ord.base <= psiValues.length && data.ord.ordinal >= psiValues[data.ord.base - 1]) {
        data.ord.isPsi = true
        data.ord.ordinal = 2 ** (data.ord.base - 1)
        data.markup.powers = 4e256
    }

    //region automation
    for (let i = 0; i < 2; i++) timesToLoop[i] += (diff*data.autoLevels[i]*factorBoost()*data.dy.level)

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){ // do first successor / maximize
            //i===0?successor(timesToLoop[i]/1000):maximize()
            //timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
            i===0?successor():maximize()
            timesToLoop[i] -= 1000
        }
    }
    if (!data.ord.isPsi && data.ord.base) { // the rest of successor / maximize if they can be used (non-psi and non-zero base)
        if (Math.floor(timesToLoop[0]/1000) >= 1) { // if there are more successors
            if (Math.floor(timesToLoop[1]/1000) >= 1) { // if there are also matching # of maximizes, do both
                data.ord.over = 0
                data.ord.ordinal += Math.min(Math.floor(timesToLoop[0]/1000), Math.abs(data.ord.base) * Math.floor(timesToLoop[1]/1000))
                timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
                timesToLoop[1] -= Math.floor(timesToLoop[1]/1000)*1000
            } else {
                if (Math.floor(timesToLoop[0]/1000) >= Math.abs(data.ord.base) - (data.ord.ordinal % Math.abs(data.ord.base))) { // stop at ordinal % (base - 1) and spill the rest to over
                    let ord1 = (Math.abs(data.ord.base) - (data.ord.ordinal % Math.abs(data.ord.base))) - 1
                    data.ord.ordinal += ord1
                    data.ord.over += (Math.floor(timesToLoop[0]/1000) - ord1)
                    timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
                } else { // add the rest
                    data.ord.ordinal += Math.floor(timesToLoop[0]/1000)
                    timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
                }
            }
        }
    } else { // "drain" the rest of successor / maximize anyway
        if (!data.ord.base) { // special case for "baseless mode" (base 0) as it can't be handled above (division by zero)
            data.ord.ordinal += Math.floor(timesToLoop[0]/1000)
        }
        timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
        timesToLoop[1] -= Math.floor(timesToLoop[1]/1000)*1000
    }
    //endregion
    if (data.ord.base >= -psiValues.length && data.ord.base <= -1 && data.ord.ordinal >= psiValues[-data.ord.base - 1]) data.ord.ordinal = psiValues[-data.ord.base - 1]
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
    loadSettingsHTML()
}
