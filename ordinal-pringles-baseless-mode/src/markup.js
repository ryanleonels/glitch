const psiFsReqs = ["ω<sup>ω</sup>-finity (1.000e10 Ordinal Powers)", "Absolute Infinity (H<sub>Ω</sub>(1))", "Omega Fixed Point (H<sub>ψ(Ω<sub>Ω</sub>)</sub>(2))", "Graham's Number (H<sub>ψ(Ω<sup>Ω</sup>ω)</sub>(3))"];
function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = ((data.ord.isPsi&&data.ord.ordinal===psiLimits[data.ord.base - 1])||(data.ord.base<0&&data.ord.ordinal===psiValues[-data.ord.base - 1]))?`Base ${data.ord.base - 1} is required to go further...`:
        data.ord.isPsi?`Markup and gain ${displayPsiOrd(data.ord.ordinal+1, 4)} (I)`:
        data.ord.ordinal>=data.ord.base ** 2?`Markup and gain ${formatWhole(opGain())} Ordinal Powers (I)`:`H<sub>ω<sup>2</sup></sub>(${data.ord.base}) is required to Markup...`
    DOM("factorShiftButton").innerHTML = data.ord.base>=0&&data.ord.base<psiFsReqs.length?`Perform a Factor Shift<br>Requires: ${psiFsReqs[data.ord.base]}`:
        `Perform a Factor Shift<br>Requires: ${format(fsReqs[data.markup.shifts])} Ordinal Powers`
    if (data.markup.shifts > 10) DOM("factorShiftButton").innerHTML = `Perform a Factor Shift<br>Requires: ω<sup>ω`
    DOM("auto0").innerText = `Successor AutoClicker\nCosts ${format(autoCost(0))} Ordinal Powers`
    DOM("auto1").innerText = `Maximize AutoClicker\nCosts ${format(autoCost(1))} Ordinal Powers`
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0])} Successor AutoClickers click the Successor button ${formatWhole((data.autoLevels[0])*factorBoost()*data.dy.level)} times/second\nYour ${formatWhole(data.autoLevels[1])} Maximize AutoClikers click the Maximize button ${formatWhole((data.autoLevels[1])*factorBoost()*data.dy.level)} times/second`

    for (let i = 0; i < data.factors.length; i++) {
        DOM(`factor${i}`).innerText = hasFactor(i)?`Factor ${i+1} [${formatWhole(data.factors[i])}] ${formatWhole(factorEffect(i))}x\nCost: ${formatWhole(factorCost(i))} Ordinal Powers`:`Factor ${i+1}\nLOCKED`
    }
    DOM("factorText").innerText = `Your Factors are multiplying AutoClicker speed by a total of ${formatWhole(factorBoost())}x`

    DOM("factorShiftButton").style.borderColor = `#785c13`
    DOM("factorShiftButton").style.color = `goldenrod`

    DOM("dynamicTab").innerText = data.markup.shifts>=7?'Dynamic':'???'
    DOM("dynamicText").innerText = `Your Dynamic Factor is multiplying AutoClickers by ${format(data.dy.level, 3)}\nIt increases by ${format(dyGain())}/s, and caps at ${format(data.dy.cap)}`
}
let markupTab = "auto"
function switchMarkupTab(t){
    DOM(`${markupTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    markupTab = t
}
function markup(n=1){
    if(data.ord.isPsi && data.ord.ordinal === psiLimits[data.ord.base - 1]) return
    if(data.ord.ordinal < data.ord.base ** 2 && !data.ord.isPsi) return
    if(data.ord.isPsi){ data.ord.ordinal+=n; return data.markup.powers = 4e256}

    data.ord.isPsi = false
    data.markup.powers += opGain()
    data.ord.ordinal = 0
    data.ord.over = 0
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    if (base >= -psiValues.length && base <= -1 && data.ord.ordinal >= psiValues[-data.ord.base - 1]) return 4e256
    if (!base) return ord
    if (base < 0) return opGain(ord, -base, over)
    if (ord >= Number.MAX_VALUE || base === 1) return Infinity
    if (ord < base) return ord + over
    let pow = Math.floor(Math.log(ord + 0.1) / Math.log(base))
    let divisor = Math.pow(base, pow)
    let mult = Math.floor((ord + 0.1) / divisor)
    return Math.min(
        4e256,
        10 ** opGain(pow, base, 0) * mult +
        opGain(ord - divisor * mult, base, over)
    )
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 5e100, Infinity, Infinity, Infinity, 1e10]
function factorShift(){
    if (data.markup.shifts > 10 && data.ord.ordinal < data.ord.base ** data.ord.base && !data.ord.isPsi) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
    if(data.ord.base === -100) return createAlert("The End... for now!", "You've reached the current Endgame!", "Thanks!")

    if(data.markup.shifts >= 7 && data.ord.base > 0) {
        if(data.ord.isPsi && (data.ord.ordinal >= psiLimits[data.ord.base - 1] || data.markup.shifts > 10)) data.ord.isPsi = false
        else if (data.markup.shifts < 10) return createAlert("Failure", "Insufficient Ordinal", "Dang.")
    } else {
        if(data.markup.powers < fsReqs[data.markup.shifts]) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
        //if(!data.ord.base) createAlert("Inversion Time!", "As you attempted to shift further into the negatives, the Guardian of Baseless Realms inverted the effect of your Factor Shifts...", "Onwards!")
    }
    if(data.markup.shifts >= 7) addFactor(data.markup.shifts)
    --data.ord.base
    ++data.markup.shifts

    if(data.markup.shifts === 7){
        data.dy.level = 4
        data.dy.gain = 0.002
        DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    }

    data.ord.ordinal = 0
    data.ord.over = 0
    data.markup.powers = 0
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
    for (let i = 0; i < timesToLoop.length; i++) {
        timesToLoop[i] = 0
    }
}
