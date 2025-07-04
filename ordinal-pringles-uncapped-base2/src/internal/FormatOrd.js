const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub>x)",
    //"BHO",
    //"&psi;(ε<sub>Ω+x</sub>)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]

function makeExcessOrdMarks(){
    const length = ordMarks.length-1

    // Generates OrdMarks up to BHO*3^41
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^82
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^123
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>x)") // extended ordMarks from this point

    // Generates OrdMarks up to BHO*3^164
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^205
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^247
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>y</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>x)")

    // Generates OrdMarks up to BHO*3^288
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^329
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^370
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+1</sup>x)")

    // Generates OrdMarks up to BHO*3^411
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω+1</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^452
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^493
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+2</sup>x)")

    // Generates OrdMarks up to BHO*3^534
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω+2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^575
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^617
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω+y</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2</sup>x)")

    // Generates OrdMarks up to BHO*3^658
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^699
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^740
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>x)")

    // Generates OrdMarks up to BHO*3^781
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω2+1</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^822
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^863
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2+1</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>x)")

    // Generates OrdMarks up to BHO*3^904
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω2+2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^945
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^988
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω2+2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω2+y</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ωy</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup></sup>)")

    // end of ordMarks as data.ord.ordinal already exceeds Number.MAX_VALUE by this point
}

function displayOrd(ord,over,base,trim = data.ord.trim) {
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)

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
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function displayHierarchyOrd(ord,over,base,trim = data.ord.trim) {
    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base))
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayHierarchyOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayHierarchyOrd(ord-firstAmount, over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

/*function displayPsiOrd(ord, trim) {
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
*/

/*function displayPsiOrd(ord, trim) {
    ord = Math.floor(ord)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    if(new Decimal(ord).gte(new Decimal(BHO_VALUE.toString()))) {
        return "BHOx" + format(ord/Number(BHO_VALUE),2)
    }
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput}`
}*/

function displayPsiOrd(ord, trim = data.ord.trim, req = false) {
    ord = Math.floor(ord)
    //if(ord === Infinity) return displayPsiOrd(Number.MAX_VALUE, trim, req)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    if(new Decimal(ord).gte(new Decimal(BHO_VALUE.toString())) && !data.ordAboveBHO) {
        return "BHOx" + format(ord/Number(BHO_VALUE),2)
    }
    let finalOutput = "";
    if(new Decimal(ord).gte(new Decimal(BHO_VALUE.toString())) && data.ord.base === 2 && (data.ord.psi2 >= 8 || req)) {
        let ord2 = Math.floor(data.ord.psi2);
        if (req) ord2 = Math.ceil(ord/Number(BHO_VALUE)) * 8;
        /*let ordList = [1,4,5,36,39,40,71];
        if (ord2 < 15) finalOutput = "&psi;(Ω<sub>" + displayPsiOrd(ordList[ord2 - 8]) + "</sub>)";
        if (ord2 === 15) finalOutput = "&psi;(Ω<sub>&psi;(Ω<sub>ω</sub>)</sub>)";
        if (ord2 === 16) finalOutput = "&psi;(Ω<sub>Ω</sub>)";
        if (ord2 > 16) finalOutput = "&psi;(Ω<sub>Ω</sub>)x" + format(ord2/16,2);*/
        return displayPsi2Ord(ord2, trim);
    } else {
        let maxOrdMarks = (3**(ordMarks.length-1))*4
        if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
            return displayPsiOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
        }
        const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
        const magnitudeAmount = 4*3**magnitude
        finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
        if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
        if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    }
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput}`
}

/*function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
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
}*/

// Calculates f_{func}(base)
function fgh(func, base)
{
  if (base == undefined)
  {
    base = 0;
  }
  base = new Decimal(base);

  if (func == 0)
  {
    return base.add(1);
  }
  else if (func == 1)
  {
    return base.mul(2);
  }
  else if (func == 2)
  {
    return base.mul(Decimal.pow(2, base));
  }
  else if (func == 3)
  {
    if (base.gt(Number.MAX_VALUE)) {
        return new Decimal(Infinity);
    }
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lte(Number.MAX_VALUE))
      {
        base = fgh(2, base);
        reps = reps.sub(1);
      }
      else
      {
        base = base.layeradd(reps.toNumber(), 2);
        reps = new Decimal(0);
      }
    }
    return base;
  }
  else
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lte(Number.MAX_VALUE))
      {
        base = fgh(func - 1, base);
        reps = reps.sub(1);
      }
      else
      {
        base = new Decimal(Infinity);
        reps = new Decimal(0);
      }
    }
    return base;
  }
}

// Calculates f_ω(base)
function fghOmega(base)
{
  base = new Decimal(base);
  if (base.lte(1000))
  {
    return fgh(base, base);
  }
  else
  {
    return new Decimal(Infinity);
  }
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    ord = new Decimal(Math.floor(ord));

    if (ord.gte(base ** base + base * base))
    {
        return new Decimal(Infinity);
    }

    if (ord.gte(base ** base))
    {
        return fghOmega(calculateHardy(ord.sub(base ** base), over, base));
    }

    if (ord.lt(base))
    {
        return ord.add(base + over);
    }

    highestPower = ord.log10().div(Decimal.log10(base)).floor();
    restOrd = ord.sub(Decimal.pow(base, highestPower));

    return fgh(highestPower, calculateHardy(restOrd, over, base));
}

function ordinalDisplay(type, ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true) {
    return (
        d ? `${type}<sub>${displayOrd(ord, Math.floor(over), base, trim)}</sub>`
        : `${type}<sub>${displayHierarchyOrd(ord, Math.floor(over), base, trim)}</sub>`
    )
}

function successor(n = 1, m=false) {
    if(data.chal.active[6] && data.successorClicks >= 1000 && m) return
    if(data.ord.isPsi) return
    if(m)++data.successorClicks

    if (data.ord.ordinal % data.ord.base === data.ord.base - 1 && data.ord.ordinal < Number.MAX_SAFE_INTEGER) data.ord.over+=n
    else data.ord.ordinal+=n
    if (data.ord.ordinal===Infinity) data.ord.ordinal = Number.MAX_VALUE
}

function maximize() {
    if(data.ord.isPsi) return
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
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ord.trim = Math.floor(x)
}

function getHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base, isPsi = data.ord.isPsi) {
    let hardyValue = "Infinity";
    if (isPsi) return psiHardy(ord, base);
    hardyValue = format(calculateHardy(ord, over, base));
    if (hardyValue === "Infinity") {
        hardyValue = EN_format(hardy(ord, base, over));
        if (hardyValue === "Infinity") hardyValue = bigHardy(ord, base, over);
    }
    return hardyValue;
}

function updateOrdHTML(){
    DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${getHardy((data.ord.isPsi === true && data.ord.base === 2) ? data.ord.psi2 : Math.floor(data.ord.ordinal), data.ord.over, data.ord.base, data.ord.isPsi)}`
}

const ordMarks2 = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sub>y</sub>)",
    "&psi;(Ix)",
    "&psi;(IΩx)",
    "&psi;(IΩ<sup>y</sup>)",
    "&psi;(I&psi;<sub>1</sub>(Ω<sub>y</sub>))",
    "&psi;(I&psi;<sub>1</sub>(Ix))",
    "&psi;(I&psi;<sub>1</sub>(IΩx))",
    "&psi;(I&psi;<sub>1</sub>(IΩ<sup>y</sup>))",
    "&psi;(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(IΩ<sub>y</sub>)",
    "&psi;(I&psi;<sub>I</sub>(Ix))",
    "&psi;(I&psi;<sub>I</sub>(IΩx))",
    "&psi;(I&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>y</sup>)",
    "&psi;(I<sup>Ω</sup>x)",
    "&psi;(I<sup>Ω</sup>Ωx)",
    "&psi;(I<sup>Ω</sup>Ω<sup>y</sup>)",
    "&psi;(I<sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>1</sub>(Ix))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>Ω<sub>y</sub>)",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>x)",
    "&psi;(I<sup>Ω+1</sup>Ωx)",
    "&psi;(I<sup>Ω+1</sup>Ω<sup>y</sup>)",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>1</sub>(Ix))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>1</sub>(IΩx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>Ω<sub>y</sub>)",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>x))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ωx))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sup>y</sup>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>1</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>1</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>Ω<sub>y</sub>))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(Ix)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>x)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ωx)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sup>y</sup>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>Ω<sub>y</sub>)))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(Ix))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩx))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>)))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>))))",
    "&psi;(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω+1</sup>&psi;<sub>I</sub>(I<sup>Ω</sup>&psi;<sub>I</sub>(I<sup>y</sup>))))",
    "&psi;(I<sup>Ω+y</sup>)",
    "&psi;(I<sup>Ωy</sup>)",
    "&psi;(I<sup>Ω<sup>y</sup></sup>)",
    "&psi;(I<sup>&psi;<sub>1</sub>(Ω<sub>y</sub>)</sup>)",
    "&psi;(I<sup>&psi;<sub>1</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>1</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>1</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>Ω<sub>y</sub></sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(Ix)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩx)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩ<sup>y</sup>)</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))</sup>)",
    "&psi;(I<sup>&psi;<sub>I</sub>(IΩ<sub>y</sub>)</sup>)",
    "&psi;(Ω<sub>I+1</sub>x)",
]
const extraOrdMarks2 = ["","ω"]
//for (let i = 0; i < ordMarks2.length; i++) DOM(`versionText`).innerHTML += `<br>${ordMarks2[i]}`

const ordMarks21 = [
    "&psi;(&psi;<sub>1</sub>(Ω<sub>y</sub>))",
    "&psi;(&psi;<sub>1</sub>(Ix))",
    "&psi;(&psi;<sub>1</sub>(IΩx))",
    "&psi;(&psi;<sub>1</sub>(IΩ<sup>y</sup>))",
    "&psi;(&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
]

const ordMarks2I = [
    "&psi;(&psi;<sub>I</sub>(Ix))",
    "&psi;(&psi;<sub>I</sub>(IΩx))",
    "&psi;(&psi;<sub>I</sub>(IΩ<sup>y</sup>))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>1</sub>(Ix)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩx)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>1</sub>(IΩ<sup>y</sup>)))",
    "&psi;(&psi;<sub>I</sub>(I&psi;<sub>1</sub>(I&psi;<sub>1</sub>(Ω<sub>y</sub>))))",
    "&psi;(&psi;<sub>I</sub>(IΩ<sub>y</sub>))",
]

function makeExcessOrdMarks2(){
    const length = ordMarks2.length-1

    // Generates OrdMarks up to (Ω_(I+1)).ψ(I+1)((Ω_(I+1))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[0].slice(6))
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[1].slice(6))
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks21[i].slice(6))
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[2].slice(6))
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6))
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub>"+ordMarks2[i].slice(6))
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>x))")

    // Generates OrdMarks up to (Ω_(I+1))^Ω
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>y</sup>)")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>x)")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)((Ω_(I+1))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[0].slice(6))
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[1].slice(6))
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks21[i].slice(6))
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[2].slice(6))
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2I[i].slice(6))
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[i].slice(6))
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>x))")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)((Ω_(I+1))^Ω)
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>y</sup>))")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>x))")

    // Generates OrdMarks up to ((Ω_(I+1))^Ω).ψ(I+1)(((Ω_(I+1))^Ω).ψ(I+1)(Ω_(I+1)))
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[0].slice(6)+")")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[1].slice(6)+")")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks21[i].slice(6)+")")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[2].slice(6)+")")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2I[i].slice(6)+")")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>"+ordMarks2[i].slice(6)+")")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>x)))")

    // Generates OrdMarks up to (Ω_(I+1))^(Ω+1)
    ordMarks2.push(ordMarks2[0].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[0].slice(6)+"))")
    ordMarks2.push(ordMarks2[1].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[1].slice(6)+"))")
    for (let i = 0; i < ordMarks21.length; i++) {
        ordMarks2.push(ordMarks21[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks21[i].slice(6)+"))")
    }
    ordMarks2.push(ordMarks2[2].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[2].slice(6)+"))")
    for (let i = 0; i < ordMarks2I.length; i++) {
        ordMarks2.push(ordMarks2I[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2I[i].slice(6)+"))")
    }
    for (let i = 3; i < length; i++) {
        ordMarks2.push(ordMarks2[i].slice(0, 6)+"Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub>"+ordMarks2[i].slice(6)+"))")
    }
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>Ω</sup>&psi;<sub>I+1</sub>(Ω<sub>I+1</sub><sup>y</sup>)))")
    ordMarks2.push("&psi;(Ω<sub>I+1</sub><sup>Ω+1</sup>x)")

    // end of ordMarks2 as data.ord.ordinal already exceeds Number.MAX_VALUE by this point
    //for (let i = 0; i < ordMarks2.length; i++) DOM(`versionText`).innerHTML += `<br>${ordMarks2[i]}`
}

function displayPsi2Ord(ord, trim) {
    ord = Math.floor(ord)
    //if(ord === Infinity) return displayPsi2Ord(Number.MAX_VALUE, trim)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 2) return extraOrdMarks2[ord]
    let finalOutput = "";
    const magnitude = Math.floor(Math.log(ord/2)/Math.log(2))
    const magnitudeAmount = 2*2**magnitude
    finalOutput = ordMarks2[Math.min(magnitude,ordMarks2.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsi2Ord(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsi2Ord(ord-magnitudeAmount+1, trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("I","<img src='https://cdn.discordapp.com/emojis/865474047630114836.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput}`
}
