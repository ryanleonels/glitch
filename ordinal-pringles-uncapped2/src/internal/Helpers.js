const DOMCache = new Map()
const DOM = (id) => {
    const cachedEl = DOMCache.get(id)
    if (cachedEl) return cachedEl
    const el = document.getElementById(id)
    if(el===null) throw `Element ${id} is null.`
    DOMCache.set(id, el)
    return el
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

function boolToReadable (bool, mode='OF'){
    if(mode==='OF') return bool?'ON':'OFF'
    if(mode==='OFL') return bool?'On':'Off'
    if(mode==='ED') return bool?'ENABLED':'DISABLED'
    if(mode==='EDL') return bool?'Enabled':'Disabled'
    if(mode==='EDT') return bool?'Enable':'Disable'
    if(mode==='UL') return bool?'Unlocked':'Locked'
}

function numToRoman(num) {
    let digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman_num = "",
        i = 3
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num
    return Array(+digits.join("") + 1).join("M") + roman_num
}

function checkAllIndexes(array, value) {
    let indexes = 0
    for(let i = 0; i < array.length; i++){ if (array[i] === value) indexes++ }
    return indexes
}

function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'
}

function settingsToggle(i){
    if (i == -1){
        data.offline = !data.offline
        DOM(`offlineProgressToggle`).innerText = `Toggle Offline Progress [${boolToReadable(data.offline)}]`
        return save()
    }
    if (i == -2){ // base 2 is always enabled in this version (required for factor boosts above 33), this one is for uncapping base 3 ordinals above the transition point instead
        data.base2 = !data.base2
        DOM(`base2Toggle`).innerText = `Toggle Uncap Base 3 Ordinals Above BHO [${boolToReadable(data.base2)}]`
        if (data.ord.base === 3 && data.ord.isPsi === true && data.ord.ordinal > BHO_VALUE && !data.base2) {
            data.ord.ordinal = BHO_VALUE
        }
        return save()
    }
    if (i == -3){
        data.chalAfter3 = !data.chalAfter3
        DOM(`chalAfter3Toggle`).innerText = `Toggle Allow Challenge After 3 Completions [${boolToReadable(data.chalAfter3)}]`
        if (!data.chalAfter3 && data.chal.active.includes(true)) {
            chalExit()
        }
        return save()
    }
    if (i == -4){
        data.gword = !data.gword
        DOM(`gwordToggle`).innerText = `Toggle Gwaify Ordinals [${boolToReadable(data.gword)}]`
        return save()
    }
    if (i == -5){
        data.ordAboveBHO = !data.ordAboveBHO
        DOM(`ordAboveBHOToggle`).innerText = `Toggle Display Ordinals Above BHO [${boolToReadable(data.ordAboveBHO)}]`
        return save()
    }
    if (i == -6){
        data.bulkBoost = !data.bulkBoost
        DOM(`bulkBoostToggle`).innerText = `Toggle Bulk Boosting [${boolToReadable(data.bulkBoost)}]`
        return save()
    }
    if (i == -7){
        data.trueUncapped = !data.trueUncapped
        DOM(`trueUncappedToggle`).innerText = `Toggle Remove Endgame Cap [${boolToReadable(data.trueUncapped)}]`
        return save()
    }
    data.sToggles[i] = !data.sToggles[i]
    save()
    location.reload()
}

function allEqual(arr, i){
    return arr.every( v => v === i )
}

let boostersAtGivenFB = (i = data.boost.times) => i > 0 ? (i*(i+1))/2 : 0
