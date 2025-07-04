const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]
const ordMarks2 = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sub>y</sub>)",
    "&psi;(Ω<sub>Ω</sub>x)",
]
const extraOrdMarks2 = ["","ω"]
function displayOrd(ord,over,base,trim = data.ord.trim) {
    if(!base) return D(ord).toString()
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)
    if(D(ord).gt(Number.MAX_VALUE) || D(over).gt(Number.MAX_VALUE)) return displayInfiniteOrd(ord, over, base, trim)
    ord = Math.floor(D(ord).toNumber())
    over = Math.floor(D(over).toNumber())
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base)+1e-14)
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function displayInfiniteOrd(ord, over, base, trim = data.ord.trim){
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord.lt(base)) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&omega;"
    if (magnitude.gt(1)) finalOutput += "<sup>"+displayInfiniteOrd(magnitude, 0, base)+"</sup>"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayInfiniteOrd(ord.sub(firstAmount), over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function displayPsiOrd(ord, trim) {
    if (data.ord.base === 1) return "Ω"
    if (data.ord.base === 2) return displayPsi2Ord(ord, trim)
    if(ord.eq(0)) return ""
    if(trim <= 0) return "..."
    if(ord.lt(4)) return extraOrdMarks[ord]
    ord = Decimal.floor(ord)
    const main = Decimal.floor(ord.div(4))
    const magnitude = Decimal.floor(Decimal.log(ord.div(4), 3))
    const magnitudeAmount = Decimal.pow(3,magnitude).mul(4)
    const finalOutput = ordMarks[magnitude]
        .replace(/x/, displayPsiOrd(ord.sub(magnitudeAmount), trim-1))
        .replace(/y/, displayPsiOrd(ord.sub(magnitudeAmount).add(1), trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput}`
}

function displayPsi2Ord(ord, trim) {
    if(ord.eq(0)) return ""
    if(trim <= 0) return "..."
    if(ord.lt(2)) return extraOrdMarks2[ord]
    ord = Math.floor(ord)
    const main = Decimal.floor(ord.div(2))
    const magnitude = Math.floor(Decimal.log(ord.div(2), 2))
    const magnitudeAmount = Decimal.pow(2,magnitude).mul(2)
    const finalOutput = ordMarks2[magnitude]
        .replace(/x/, displayPsiOrd(ord.sub(magnitudeAmount), trim-1))
        .replace(/y/, displayPsiOrd(ord.sub(magnitudeAmount).add(1), trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput}`
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (!base) return ord;
    if (base < 0) return calculateHardy(ord, over, -base);
    if (ord.gte(base**3)) return Infinity
    let f2 = Decimal.floor(ord.div(base**2))
    const f1 = Decimal.floor(ord.sub(f2.mul(base**2)).div(base))
    const f0 = Decimal.floor(ord.sub(f2.mul(base**2)).sub(f1.mul(base))).add(over)
    let value = f0.add(base)
    value = D(value).times(Decimal.pow(2,f1))
    while(f2.gt(0)) {
        value = Decimal.pow(2, value).times(value)
        f2 = f2.sub(1)
    }
    value = value.toNumber()
    if(isNaN(value)) value = Infinity
    return value
}

function ordinalDisplay() {
    return (
        `H<sub>${displayOrd(data.ord.ordinal, Decimal.floor(data.ord.over), data.ord.base)}</sub>`
    )
}

function successor(n = 1) {
    if(data.ord.isPsi) return
    if (Decimal.mod(data.ord.ordinal, data.ord.base).eq(data.ord.base - 1)) data.ord.over = data.ord.over.add(n)
    else data.ord.ordinal = data.ord.ordinal.add(n)
}

function maximize() {
    if(data.ord.isPsi) return
    if(!data.ord.base) return
    if (data.ord.over.gte(1) && data.ord.base === 1) {
        data.ord.ordinal = D(1)
        return
    }
    if (Decimal.mod(data.ord.ordinal, data.ord.base).eq(data.ord.base - 1) && data.ord.over.gte(1)) {
        while(data.ord.over.add(data.ord.base).gte(data.ord.base * 2) && Decimal.mod(data.ord.ordinal, data.ord.base ** 2).gt(0)) {
            data.ord.over = data.ord.over.sub(Decimal.ceil(data.ord.over.add(data.ord.base).div(2).sub(0.1)))
            data.ord.ordinal = data.ord.ordinal.add(data.ord.base)
        }

        if (Decimal.mod(data.ord.ordinal, data.ord.base ** 2).gt(0)) data.ord.ordinal = data.ord.ordinal.add(data.ord.over)
        data.ord.over = D(0)
    }
}

function changeTrim(x){
    try{ data.ord.trim = Math.floor(x) }
    catch (e) {
        createAlert('Failure', 'Invalid Input.', `Oops.`)
    }
}

function updateOrdHTML(){
    if(data.ord.isPsi || calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base) > 1.79e308 || isNaN(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base)))
        DOM("ordinal").innerHTML = `${ordinalDisplay()} (${data.ord.base})`
    else
        DOM("ordinal").innerHTML = `${ordinalDisplay()} (${data.ord.base})=${format(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`
}
