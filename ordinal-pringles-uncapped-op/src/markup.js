const psiFsReqs = ["ω<sup>ω</sup>-finity (1.000e10 Ordinal Powers)", "Absolute Infinity (H<sub>Ω</sub>(1))", "Omega Fixed Point (H<sub>ψ(Ω<sub>Ω</sub>)</sub>(2))", "Graham's Number (H<sub>ψ(Ω<sup>Ω</sup>ω)</sub>(3))"];
function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = data.ord.isPsi&&data.ord.ordinal.gte(psiLimits[data.ord.base - 1])?`Base ${data.ord.base - 1} is required to go further...`:
        data.ord.isPsi?`Markup and gain ${displayPsiOrd(data.ord.ordinal.add(1), 4)} (I)`:
        data.ord.ordinal.gte(data.ord.base ** 2)?`Markup and gain ${formatWhole(opGain())} Ordinal Powers (I)`:`H<sub>ω<sup>2</sup></sub>(${data.ord.base}) is required to Markup...`
    DOM("factorShiftButton").innerHTML = data.ord.base>=0&&data.ord.base<psiFsReqs.length&&false?`Perform a Factor Shift<br>Requires: ${psiFsReqs[data.ord.base]}`:
        `Perform a Factor Shift<br>Requires: ${format(fsReqs[data.markup.shifts])} Ordinal Powers`
    DOM("auto0").innerText = `Successor AutoClicker\nCosts ${format(autoCost(0))} Ordinal Powers`
    DOM("auto1").innerText = `Maximize AutoClicker\nCosts ${format(autoCost(1))} Ordinal Powers`
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0])} Successor AutoClickers click the Successor button ${formatWhole(data.autoLevels[0].mul(factorBoost()).mul(data.dy.level))} times/second\nYour ${formatWhole(data.autoLevels[1])} Maximize AutoClikers click the Maximize button ${formatWhole(data.autoLevels[1].mul(factorBoost()).mul(data.dy.level))} times/second`

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
    if(data.ord.isPsi && data.ord.ordinal.gte(psiLimits[data.ord.base - 1])) return
    if(data.ord.ordinal.lt(data.ord.base ** 2) && !data.ord.isPsi) return
    if(data.ord.isPsi){ data.ord.ordinal=data.ord.ordinal.add(n); return data.markup.powers = D('10^^10')}

    data.ord.isPsi = false
    data.markup.powers = data.markup.powers.add(opGain())
    data.ord.ordinal = D(0)
    data.ord.over = D(0)
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over, trim = 0) {
    if (!base) return D(ord)
    if (base < 0) return opGain(ord, -base, over, trim)
    if (ord.eq(Infinity) || base === 1) return D(Infinity)
    if (ord.lt(base)) return Decimal.add(ord, over)

    /*if (ord.gte(Decimal.tetrate(base, base))) {
        return Decimal.tetrate(10, opGain(ord.slog(base), base, 0, trim))
    }*/

    let powerOfOmega = Decimal.log(ord.add(0.1), base).floor()
    let highestPower = Decimal.pow(base,powerOfOmega)
    let powerMultiplier = Decimal.floor(ord.add(0.1).div(highestPower))
    return Decimal.pow(10, opGain(powerOfOmega,base,0)).mul(powerMultiplier).add(ord.lt(Decimal.tetrate(base,3)) ? opGain(ord.sub(highestPower.mul(powerMultiplier)),base,over,trim+1) : 0)
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 5e100, D('e2e10'), D('10^^100')]
function factorShift(){
    if (data.ord.base < 2) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")

    if(data.markup.shifts >= 7 && data.ord.base > 0 && false) {
        if(data.ord.isPsi && data.ord.ordinal.gte(psiLimits[data.ord.base - 1])) data.ord.isPsi = false
        else return createAlert("Failure", "Insufficient Ordinal", "Dang.")
    } else {
        if(data.markup.powers.lt(fsReqs[data.markup.shifts])) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
        if(data.ord.base === 2) return createAlert("The End... for now!", "You've reached the current Endgame!", "Thanks!")
    }
    --data.ord.base
    ++data.markup.shifts

    if(data.markup.shifts === 7){
        data.dy.level = 4
        data.dy.gain = 0.002
        DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    }

    data.ord.ordinal = D(0)
    data.ord.over = D(0)
    data.markup.powers = D(0)
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = D(0)
    }
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = D(0)
    }
    for (let i = 0; i < timesToLoop.length; i++) {
        timesToLoop[i] = D(0)
    }
}
