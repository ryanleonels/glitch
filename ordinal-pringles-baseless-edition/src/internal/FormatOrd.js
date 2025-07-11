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
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)
    if (data.ord.base === 0) return ord
    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base))
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base, trim - 1)
    return finalOutput
}

function displayPsiOrd(ord, trim) {
    if (data.ord.base === 1) return "Ω"
    if (data.ord.base === 2) return displayPsi2Ord(ord, trim)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    ord = Math.floor(ord)
    const main = Math.floor(ord/4)
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    const finalOutput = ordMarks[magnitude]
        .replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
        .replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput}`
}

function displayPsi2Ord(ord, trim) {
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 2) return extraOrdMarks2[ord]
    ord = Math.floor(ord)
    const main = Math.floor(ord/2)
    const magnitude = Math.floor(Math.log(ord/2)/Math.log(2))
    const magnitudeAmount = 2*2**magnitude
    const finalOutput = ordMarks2[magnitude]
        .replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
        .replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput}`
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (!base) return ord;
    if (base < 0) return calculateHardy(ord, over, -base);
    if (ord >= base**3) return Infinity
    let f2 = Math.floor(ord/base**2)
    const f1 = Math.floor((ord-(f2*base**2))/base)
    const f0 = Math.floor((ord-(f2*base**2)-(f1*base)))+over
    let value = base+f0
    value = D(value).times(Decimal.pow(2,f1))
    while(f2 > 0) {
        value = Decimal.pow(2, value).times(value)
        f2--
    }
    if(isNaN(value)) value = Infinity
    return value
}

function ordinalDisplay() {
    return (
        `H<sub>${displayOrd(data.ord.ordinal, Math.floor(data.ord.over), data.ord.base)}</sub>`
    )
}

function successor(n = 1) {
    if(data.ord.isPsi) return
    if (data.ord.ordinal % data.ord.base === data.ord.base - 1) data.ord.over+=n
    else data.ord.ordinal+=n
}

function maximize() {
    if(data.ord.isPsi) return
    if(!data.ord.base) return
    if (data.ord.over >= 1 && data.ord.base === 1) {
        data.ord.ordinal = 1
        return
    }
    if (data.ord.ordinal % data.ord.base === data.ord.base - 1 && data.ord.over >= 1) {
        while(data.ord.over + data.ord.base >= data.ord.base * 2 && data.ord.ordinal % data.ord.base ** 2 !== 0){
            data.ord.over -= Math.ceil((data.ord.over + data.ord.base) / 2 - 0.1)
            data.ord.ordinal += data.ord.base
        }

        if (data.ord.ordinal % data.ord.base ** 2 !== 0) data.ord.ordinal += data.ord.over
        data.ord.over = 0
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
