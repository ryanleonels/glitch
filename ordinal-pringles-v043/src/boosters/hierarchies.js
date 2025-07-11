function updateHierarchiesHTML(){
    for (let i = 0; i < data.hierarchies.ords.length; i++) {
        DOM(`h${i}Text`).innerHTML =  `${ordinalDisplay(data.hierarchies.ords[i].type, data.hierarchies.ords[i].ord, data.hierarchies.ords[i].over, hierarchyData[i].base(), ordinalDisplayTrim(3), false)} (${hierarchyData[i].base()})`
        DOM(`h${i}Info`).innerText = `(+${format(hierarchyData[i].gain())}/s), ${hierarchyData[i].text}`
        DOM(`h${i}Effect`).innerText = `${format(getHierarchyEffect(i))}`
    }
    updateHierarchyPurchaseHTML()
}
function updateHierarchyPurchaseHTML(){
    for (let i = 0; i < hbData.length; i++) updateHBBuyableHTML(i)
    for (let i = 0; i < hupData.length; i++) updateHUPHTML(i)
}
function updateHBBuyableHTML(i){
    const el = DOM(`hb${i}`)
    const cost = i < 3 ? 'FGH' : 'SGH'
    const ord = i < 3 ? 0 : 1

    if(data.hierarchies.rebuyableAmt[i] >= getHBuyableCap()) return el.innerHTML = `${hbData[i].text} (${formatWhole(data.hierarchies.rebuyableAmt[i])})<br>Maxed!<br>Currently: ${format(hbData[i].effect())}x`
    el.innerHTML = i === 2 || i===5 ? `${hbData[i].text} (${formatWhole(data.hierarchies.rebuyableAmt[i])})<br>${format(hbData[i].cost())} Incrementy<br>Currently: ${format(hbData[i].effect())}x`
    : `${hbData[i].text} (${formatWhole(data.hierarchies.rebuyableAmt[i])})<br>${ordinalDisplay('', hbData[i].cost(), 0, 10, ordinalDisplayTrim(), false)} ${cost}<br>Currently: ${format(hbData[i].effect())}x`
}
function updateHUPHTML(i){
    const el = DOM(`hup${i}`)
    const cost = i < 5 ? 'FGH' : 'SGH'
    const ord = i < 5 ? 0 : 1

    el.innerHTML = `${hupData[i].text}<br>${ordinalDisplay('', hupData[i].cost, 0, 10, ordinalDisplayTrim(), false)} ${cost}<br>`
    if (data.hierarchies.hasUpgrade[i]) {
        el.innerHTML += `<span style="color='#424242'"><b>Reached!</b></span>`
    }
}

function initHierarchies(){
    // Buyabless
    let columns = [DOM('h0Buyables'), DOM('h1Buyables')]
    let total = 0
    for (let i = 0; i < columns.length; i++) {
        let cost = i === 0 ? 'FGH' : 'SGH'
        for (let n = 0; n < 3; n++) {
            let hb = document.createElement('button')
            hb.className = `hb${i}`
            hb.id = `hb${total}`

            hb.innerHTML = n < 2 ? `${hbData[total].text} (${formatWhole(data.hierarchies.rebuyableAmt[total])})<br>${ordinalDisplay('', hbData[total].cost(), 0, 10/*hierarchyData[i].base()*/, ordinalDisplayTrim(), false)} ${cost}<br>Currently: ${format(hbData[total].effect())}x`
            : `${hbData[total].text} (${formatWhole(data.hierarchies.rebuyableAmt[total])})<br>${format(hbData[total].cost())} Incrementy<br>Currently: ${format(hbData[total].effect())}x`

            columns[i].append(hb)
            ++total
        }
    }

    // Upgrades
    let columns2 = [DOM('h0Upgrades'), DOM('h1Upgrades')]
    let total2 = 0
    for (let i = 0; i < columns.length; i++) {
        let cost = i === 0 ? 'FGH' : 'SGH'
        for (let n = 0; n < 5; n++) {
            let hup = document.createElement('button')
            hup.className = ' hup'
            hup.id = `hup${total2}`
            if(n > 0) hup.style.borderTop = '1px solid #631d89'
            if(n < 4) hup.style.borderBottom = '1px solid #631d89'

            data.hierarchies.hasUpgrade[total2] ? hup.innerHTML = `${hupData[total2].text}<br>${ordinalDisplay('', hupData[total2].cost, 0, 10/*hierarchyData[i].base()*/, ordinalDisplayTrim(), false)} ${cost}<br><span style="color='#424242'"><b>Reached!</b></span>`
            : hup.innerHTML = `${hupData[total2].text}<br>${ordinalDisplay('', hupData[total2].cost, 0, 10/*hierarchyData[i].base()*/, ordinalDisplayTrim(), false)} ${cost}`

            columns2[i].append(hup)
            ++total2
        }
    }

    for (let i = 0; i < hbData.length; i++) {
        DOM(`hb${i}`).addEventListener('click', ()=>buyHBuyable(i))
    }
}

function checkSpecialHUPs(){
    DOM(`hup3`).style.display = hasSluggishMilestone(4) ? `block` : `none`
    DOM(`hup4`).style.display = hasSluggishMilestone(4) ? `block` : `none`
    DOM(`hup8`).style.display = hasSluggishMilestone(4) ? `block` : `none`
    DOM(`hup9`).style.display = hasSluggishMilestone(4) ? `block` : `none`
}

let effectiveFGH = () => calcOrdPoints(data.hierarchies.ords[0].ord, hierarchyData[0].base(), data.hierarchies.ords[0].over);
let effectiveSGH = () => calcOrdPoints(data.hierarchies.ords[1].ord, hierarchyData[1].base(), data.hierarchies.ords[1].over);
let hierarchyData = [
    { text:"Multiplying Incrementy Gain by", effect: ()=> Decimal.max((Decimal.log10(effectiveFGH().add(1)).times(hbData[1].effect())).times(getPringleEffect(6)).pow(dupEffect(2)), 1),
        gain: ()=> hierarchyGainBases[0]().times(hierarchyGainGlobalMults()).times(getPringleEffect(7)), base: ()=> 10 - getBUPEffect(4) },
    { text:"Dividing Charge Requirement by", effect: ()=> Decimal.max((Decimal.log10(effectiveSGH().add(1)).times(hbData[4].effect()).times(alephEffect(5))).times(getPringleEffect(6)).pow((dupEffect(2))+getBUPEffect(9)), 1),
        gain: ()=> hierarchyGainBases[1]().times(hierarchyGainGlobalMults()).times(getPringleEffect(7)), base: ()=> 10 - getBUPEffect(4) }
]
let hierarchyGainBases = [
    () => Decimal.max(Decimal.floor(Decimal.pow(data.incrementy.amt, 1/3))),
    () => Decimal.max(Decimal.floor(Decimal.pow(t2Auto().plus(1), 1/4)))
]
let hierarchyGainGlobalMults = () =>
    hupData[2].effect()*hupData[7].effect()*hbData[0].effect()*hbData[5].effect()*getOverflowEffect(3)
    *purificationEffect(2)*getANREffect(3)
let getHierarchyEffect = (i) => hierarchyData[i].effect()

let hbData = [
    {
        text:"Boost FGH and SGH gain based on Challenge Completions",
        cost: ()=> getHBBuyableCost(0),
        effect: ()=> Math.max(1, Math.sqrt(data.chal.totalCompletions+1)*data.hierarchies.rebuyableAmt[0])
    },
    {
        text:"Boost FGH effect based on Challenge Completions",
        cost: ()=> getHBBuyableCost(1),
        effect: ()=> Math.max(1, Math.log10(data.chal.totalCompletions+1)*data.hierarchies.rebuyableAmt[1])
    },
    {
        text:"Boost Incrementy Upgrade 3\'s effect based on FGH",
        cost: ()=> getHBBuyableCost(2),
        effect: ()=> Decimal.max(1, Decimal.pow(data.hierarchies.ords[0].ord.plus(1), 1/16).times(data.hierarchies.rebuyableAmt[2])) },
    {
        text:"Boost FGH and SGH gain based on Total Boosters",
        cost: ()=> getHBBuyableCost(3),
        effect: ()=> Math.max(1, Math.sqrt((data.boost.total+1)/20)*data.hierarchies.rebuyableAmt[3]) },
    {
        text:"Boost SGH effect based on Challenge Completions",
        cost: ()=> getHBBuyableCost(4),
        effect: ()=> Math.max(1, Math.log10(data.chal.totalCompletions+1)*data.hierarchies.rebuyableAmt[4]) },
    {
        text:"Boost Incrementy Upgrade 3\'s effect based on SGH",
        cost: ()=> getHBBuyableCost(5),
        effect: ()=> Decimal.max(1, Decimal.pow(data.hierarchies.ords[1].ord.plus(1), 1/16).times(data.hierarchies.rebuyableAmt[5])) }
]
let hupData = [
    // Effcects of 1 mean that it is a true/false effect.
    { text:"The Challenge Boost is Improved", cost: 1e10, effect: ()=> data.hierarchies.hasUpgrade[0] ? 2*hupData[8].effect() : 1 },
    { text:"IUP6 is Improved", cost: 1e20, effect: ()=> 1 },
    { text:"BUP1x4 boosts Hierarchy gain", cost: 1e30, effect: ()=> data.hierarchies.hasUpgrade[2] ? getBUPEffect(3)**2 : 1 },
    { text:"If BUP 2x1 and 3x1 are Supercharged their effects stack", cost: 1e40, effect: ()=> 1},
    { text:"BUP2x1 and 3x1 slightly increase the Decrementy gain exponent", cost: 1e50, effect: ()=> data.hierarchies.hasUpgrade[4] ? getBUPEffect(5)/100 : 0 },
    { text:"Total Charge Boosts AutoBuyers", cost: 1e10, effect: ()=> data.hierarchies.hasUpgrade[5] ? Math.max(1, data.incrementy.totalCharge/2)*hupData[8].effect() : 1 },
    { text:"IUP2 is Improved", cost: 1e20, effect: ()=> 1 },
    { text:"BUP2x4 boosts Hierarchy gain", cost: 1e30, effect: ()=> data.hierarchies.hasUpgrade[7] ? getBUPEffect(8)**3 : 1 },
    { text:"Each Drain boosts the first Hierarchy Upgrade of each column", cost: 1e40, effect: ()=> data.hierarchies.hasUpgrade[8] ?  Math.max(1, Math.sqrt(data.darkness.totalDrains)) : 1 },
    { text:"The final Hierarchy Buyable of each column's boosts the ℵ<sub>5</sub> and ℵ<sub>8</sub> effects", cost: 1e50, effect: ()=> data.hierarchies.hasUpgrade[9] ? (hbData[2].effect().plus(hbData[5].effect())).toNumber() : 1 },
]

function increaseHierarchies(diff){
    for (let i = 0; i < data.hierarchies.ords.length; i++) {
        let n = hierarchyData[i].gain().times(diff/1000)
        // Successor
        if (data.hierarchies.ords[i].ord.mod(hierarchyData[i].base()).eq(hierarchyData[i].base() - 1) && data.hierarchies.ords[i].ord.lt(Number.MAX_SAFE_INTEGER)) data.hierarchies.ords[i].over = data.hierarchies.ords[i].over.plus(n)
        else data.hierarchies.ords[i].ord = data.hierarchies.ords[i].ord.plus(n)

        //Maximize
        if (data.hierarchies.ords[i].ord.mod(hierarchyData[i].base()).eq(hierarchyData[i].base() - 1) && data.hierarchies.ords[i].over.gte(1)) {
            while(data.hierarchies.ords[i].over.plus(hierarchyData[i].base()).gte(hierarchyData[i].base() * 2) && data.hierarchies.ords[i].ord.mod(hierarchyData[i].base() ** 2).neq(0)){
                data.hierarchies.ords[i].over = data.hierarchies.ords[i].over.sub(Decimal.ceil((data.hierarchies.ords[i].over.plus(hierarchyData[i].base())).div(2).sub(0.1)))
                data.hierarchies.ords[i].ord = data.hierarchies.ords[i].ord.plus(hierarchyData[i].base())
            }

            if (data.hierarchies.ords[i].ord.mod(hierarchyData[i].base() ** 2).neq(0))
                data.hierarchies.ords[i].ord = data.hierarchies.ords[i].ord.plus(data.hierarchies.ords[i].over)
            data.hierarchies.ords[i].over = D(0)
        }

        if (data.hierarchies.ords[i].ord.eq(Infinity)) data.hierarchies.ords[i].ord = D(Number.MAX_VALUE)
    }
}

function getHBBuyableCost(i){
    if(i === 2 || i===5) return D(1e12).times(D(data.hierarchies.rebuyableAmt[i]).plus((D(10).pow(D(1).plus(data.hierarchies.rebuyableAmt[i])))))
    return D(data.hierarchies.rebuyableAmt[i]).add(D(10).pow(1 + data.hierarchies.rebuyableAmt[i]))
}
function getMaxHBBuyableLevel(i){
    if(i === 2 || i === 5) return Decimal.max(Decimal.floor(Decimal.log10(data.incrementy.amt.plus(1)).sub(12)), data.hierarchies.rebuyableAmt[i])
    if(i < 2){
        if(data.hierarchies.ords[0].ord.gte(Decimal.tetrate(hierarchyData[0].base(), 3)) && D(getHBuyableCap()).lte(1e10)) return D(getHBuyableCap())
        let num = Decimal.max(Decimal.floor(effectiveFGH().log10()), 0)
        if (num.lt(16) && effectiveFGH().lt(Decimal.pow(10,num).add(num.sub(1)))) num = num.sub(1)
        return Decimal.min(getHBuyableCap(), Decimal.max(num, data.hierarchies.rebuyableAmt[i]))
    }
    if(i > 2 && i < 5){
        if(data.hierarchies.ords[1].ord.gte(Decimal.tetrate(hierarchyData[1].base(), 3)) && D(getHBuyableCap()).lte(1e10)) return D(getHBuyableCap())
        let num = Decimal.max(Decimal.floor(effectiveSGH().log10()), 0)
        if (num.lt(16) && effectiveSGH().lt(Decimal.pow(10,num).add(num.sub(1)))) num = num.sub(1)
        return Decimal.min(getHBuyableCap(), Decimal.max(num, data.hierarchies.rebuyableAmt[i]))
    }
    return D(10)
}

let getHBuyableCap = () => 3333 + getPringleEffect(8, true)
function buyHBuyable(i){
    const cost = hbData[i].cost()

    if(data.hierarchies.rebuyableAmt[i] >= getHBuyableCap()) return

    if(data.incrementy.amt.gt(cost) && (i === 2 || i === 5)){
        if(!hasSingFunction(2)) data.incrementy.amt = data.incrementy.amt.sub(cost)
        ++data.hierarchies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
    if(data.hierarchies.ords[0].ord.gt(OPtoOrd(cost, hierarchyData[0].base())) && i < 2){
        if(!hasSingFunction(2)) data.hierarchies.ords[0].ord = data.hierarchies.ords[0].ord.sub(OPtoOrd(cost, hierarchyData[0].base()))
        ++data.hierarchies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
    if(data.hierarchies.ords[1].ord.gt(OPtoOrd(cost, hierarchyData[1].base())) && i > 2 && i < 5){
        if(!hasSingFunction(2)) data.hierarchies.ords[1].ord = data.hierarchies.ords[1].ord.sub(OPtoOrd(cost, hierarchyData[1].base()))
        ++data.hierarchies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
}
function getTotalHBuyables(sgh){
    let total = 0
    let start = sgh ? 5 : 0

    for (let i = start; i < data.hierarchies.rebuyableAmt.length; i++) {
        total += data.hierarchies.rebuyableAmt[i]
    }
    return total
}

function unlockHierarchyMilestones(i){
    if(data.hierarchies.hasUpgrade[i]) return
    const cost = hupData[i].cost

    if(data.hierarchies.ords[0].ord.gte(OPtoOrd(cost, hierarchyData[0].base())) && i <= 4){
        //data.hierarchies.ords[0].ord -= OPtoOrd(cost, hierarchyData[0].base())
        data.hierarchies.hasUpgrade[i] = true
        updateHUPHTML(i)
    }
    else if(data.hierarchies.ords[1].ord.gte(OPtoOrd(cost, hierarchyData[1].base())) && i > 4){
        //data.hierarchies.ords[1].ord -= OPtoOrd(cost, hierarchyData[1].base())
        data.hierarchies.hasUpgrade[i] = true
        updateHUPHTML(i)
    }
}

function checkHierarchyMilestones(){
    for (let i = 0; i < data.hierarchies.hasUpgrade.length; i++) {
        unlockHierarchyMilestones(i)
    }
}