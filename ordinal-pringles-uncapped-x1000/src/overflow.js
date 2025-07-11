function updateOverflowHTML(){
    DOM(`boosterText2`).innerText =  `You have ${getExtraBoosters()} Excess Boosters, producing`
    DOM(`boosterPower`).innerText = ` ${format(getOverflowGain(0))} Booster Power/s`
    DOM(`bpTotal`).innerText = `Your ${format(data.overflow.bp)} Booster Power is`

    DOM(`chargeText2`).innerText =  `You have ${getExtraCharge()} Excess Charge, producing`
    DOM(`overCharge`).innerText = ` ${format(getOverflowGain(1))} Overcharge/s`
    DOM(`ocTotal`).innerText = `Your ${format(data.overflow.oc)} Overcharge is`

    for (let i = 0; i < 6; i++) {
        DOM(`bp${i}Effect`).innerText = i==2 ? `/${format(getOverflowEffect(i))}` : `${format(getOverflowEffect(i))}x`
    }

    if(getExtraBoosters()>=1000){
        DOM("bp3Container").style.display = ""
        DOM("bp3Hidden").style.display = "none"
    }
}

let maxNonOverflowBoosters = boostersAtGivenFB(29)
let getExtraBoosters = () => Math.max(0, data.boost.total-maxNonOverflowBoosters)
let getExtraCharge = () => Math.max(0, data.incrementy.totalCharge-12)

function getOverflowGain(i){
    if (i == 0) return data.hierachies.hasUpgrade[8]?getExtraBoosters()**1.1:Math.sqrt(getExtraBoosters())
    return getExtraCharge()**1.1
}

function getOverflowEffect(i){
    if(data.overflow.bp == 1) return 1
    switch (i) {
        case 0:
            return Math.max(1, (Math.pow(data.overflow.bp, data.hierachies.hasUpgrade[9]?1/2.75:1/8))*getOverflowEffect(4))
        case 1:
            return Math.max(1, (Math.sqrt(data.overflow.bp)*opMult())*getOverflowEffect(4))
        case 2:
            return Math.max(1, (Math.sqrt(data.overflow.bp+1))*getOverflowEffect(4))
        case 3:
            return data.overflow.oc > 1 ? Math.max(1, data.overflow.oc**3) : 1
        case 4:
            return data.overflow.oc > 1 ? Math.max(1, Math.log10(data.overflow.oc+1)) : 1
        case 5:
            return getExtraBoosters() >= 1000 ? data.overflow.bp**0.7*getOverflowEffect(4) : 1
        default: return NaN
    }
}