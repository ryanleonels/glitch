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
    "&psi;(Ω<sub>2</sub>)",
    //"BHO",
    //"&psi;(ε<sub>Ω+x</sub>)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]

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

function displayPsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (ord === Infinity || base < 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if (base === 1) return displayPsi1Ord(ord);
    if (base === 2) return displayPsi2Ord(ord, trim);
    ord = Math.floor(ord)
    //if(ord === Infinity) return displayPsiOrd(Number.MAX_VALUE, trim, base)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    /*if(new Decimal(ord).gte(new Decimal(BHO_VALUE.toString())) && false) {
        return "BHOx" + format(ord/Number(BHO_VALUE),2)
    }*/
    let finalOutput = "";
    let maxOrdMarks = (3**(ordMarks.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
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
    DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${getHardy(Math.floor(data.ord.ordinal), data.ord.over, data.ord.base, data.ord.isPsi)}`
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
    "&psi;(Ω<sub>I+1</sub>)",
]
const extraOrdMarks2 = ["","ω"]
//for (let i = 0; i < ordMarks2.length; i++) DOM(`versionText`).innerHTML += `<br>${ordMarks2[i]}`

function displayPsi2Ord(ord, trim = data.ord.trim) {
    ord = Math.floor(ord)
    //if(ord === Infinity) return displayPsi2Ord(Number.MAX_VALUE, trim)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 2) return extraOrdMarks2[ord]
    /*if(new Decimal(ord).gte(new Decimal(8)) && false) {
        return "BHOx" + format(ord/8,2)
    }*/
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

const ordMarks1 = [
    "Ω",
    "Ω+1",
    "Ω1",
    "(ΩxXΩ)x10",
    "ΩA",
    "1Ω",
    "Ωπ",
    "田",
    "Ө",
    "↺1",
    "Ʊ",
    "⊞",
    "①",
    "𝖀",
    "Ꙍ",
    "⅊",
    "ⅇ",
    "⏦",
    "Λ",
    "☉",
    "⌺",
    "♈︎",
    "♉︎",
    "♊︎",
    "♋︎",
    "♌︎",
    "♍︎",
    "♎︎",
    "♏︎",
    "♐︎",
    "♑︎",
    "♒︎",
    "♓︎",
    "‡",
    "■",
    "⟐",
    "ˊΩ",
    "Ψ",
    "И",
    "֍",
    "𝔈",
    "ↇ",
    "ↆ",
    "⦻",
    "Ć",
    "Ɨ",
    "⨛",
    "⩬",
    "❶",
    "⍓",
    "ᘒ",
    "ↈ",
    "░",
    "𐰤",
    "𐰿",
    "𐰽",
    "𐱈",
    "⋻ 1 & 2 {Finite}",
    "*Ө* - 1",
    "1 / 2 of Ordinals of Finity Entarial",
    "1 [FINITY] [+]",
    "[៳]",
    "л0",
    "𝗖",
    "ດ",
    "1 & 2 [Finite]",
    "⬲",
    ":ວ:",
    "[△] - FINITY",
    "[Multifinity] - 1 // 2^1",
    "{已} - 1",
    "◻",
    "[・] - 1 • 2",
    "[⍏]",
    "[ヘ]",
    "キ1",
    "⬲1",
    "Os(2)",
    "1 丅 2 Ordinals of Clustered Finity",
    "〖习〗",
    "xX ロ xX",
    "X○○X",
    "ብxXဘ",
    "ཡ七ჲ",
    "ユ xX ユ",
    "ユユ xX ユユ",
    "Ֆ௫",
    "[个仗] xX",
    "ҢㅐxX",
    "⊂A",
    "ནᑂ",
    "[☆]",
    "Ω☆",
    "Ω☆☆",
    "Ω☆☆☆◻",
    "(E)",
    "るる",
    "১コ",
    "▵コ",
    "ᗜʊ",
    "ᗛᗚ",
    "ᗛᗌᗏᗚ",
    "⋑⎠⋏",
    "忚Ǿ忸忷",
    "悤悆恲恹Æ悙",
    "KꞤⱵ",
    "B℺Ẑ♮",
    "Xx℺",
    "xX / xXΩΩ",
    "🔷☆1",
    "1111",
    "🔂1🔁",
    "⦽yY",
    "ท◎",
    "|2|⦽",
    "⟲⤄1[2]",
    "⟲⧬/",
    "∭∫",
    "∰∱∢∮n xX / 1",
    "∰∱∢∮11n xX / 1",
    "∰∱∢∮11n xX112",
    "∨√◻1",
    "ꓨꓶ◻∑",
    "⊖⊖",
    "∬⊡⊠",
    "⎞⍳",
    "❃❃",
    "❃☼☾☽♒︎✦",
    "⟁⸎⟜◻︎",
    "⍰⍰NANA⍰ NA",
    "🄰‼xXxX",
    "ලⵙ☉ⵙ",
    "⊡",
    "☆☆☆␥✪",
    "⧟",
    "∫🞜▨▲",
    "◯◬◘◙",
    "◴◴◬◳◳╫◍",
    "◭◬GODS◮",
    "⟠",
    "⧈",
    "▥",
    "◓",
    "🟃",
    "Infinity-Insta-Bility",
    "Endlessinafinium",
    "OL(. x 100",
    "SOL(100)",
    "MOL(100)",
    "100-OL(100)",
    "Eta-Hyper 1 Cardinal",
    "THE END",
    "THE SUPER",
    "THE OMNI",
    "Meta-Hyper One Cardinal",
    "The Transcendence",
    "THE BIG RIP",
    "THE ULTIMATE REBIRTH",
    "Ultimate Loop #1, 1",
    "PEU*(1)",
    "TUB(1)",
    "The Super-Sam number",
    "५",
    "Sunimretility",
    "Q^Qal(10^100)",
    "山",
    "The Great Fish",
    "Super Sam's Number",
    "The Ultimate Cycle",
    "True Cycle",
    "Outerconst",
    "α^Finite(1,1)",
    "The Beyondility",
    "A0",
    "♁ 0",
    "Cetusfinity",
    "Homnoion Ordinal",
    "Dect Function",
    "DECERET NOW CARDINAL",
    "The ???? Ordinal",
    "Miserable Bypassing the EXAPT",
    "Bypassed of the Ordinals",
    "The True Cardinal",
    "The Trardinal",
    "The Transception",
    "One of the Largest Fictional Numbers",
    "Travone",
    "Mathfinity",
    "???",
    "Trahrase #1",
    "The Phrase Function",
    "The Black Holility",
    "Transcendfinium",
    "THE ONWARDS",
    "┃",
    "✰^◇(1)",
    "ス0[1]",
    "The True Layer",
    "The Finium",
    "The Breaking Googoloverse",
    "The Hyperconinc Finity",
    "Contains every Finite's",
    "Everytrahing",
    "Collection of Numbers beyond Tualllthing",
    "TRUE UNDEFINITIABLE",
    "Circliumize One of Numbers",
    "Transilimizized of Numbers",
    "Metamatramt of True number",
    "Pruelmentize Finite of Number",
    "Hexukament Numbers Finity",
    "Trauilnity Breaking Finite Number",
    "OL(Finality Everything Forever Number)",
    "THE MYSTERIOUS",
    "The Black Finale",
    "The No End",
    "The True ????",
    "The Breaking Nothing",
    "The True",
    "THE TRUE UNDEFINITABLE",
    "The True Lasting",
    "⧮",
    "The Great Final",
    "The Godous Final",
    "??????? [2]",
    "The F.I.N.A.L Stack",
    "Absolutely N.A.N",
    "THE U.N.L.I.M.I.T.E.D",
    "The U.L.T.I.M.A.T.E PHRASE",
    "THE E.N.D E.N.D",
    "ABSOLUTE D.E.A.T.H",
    "T.R.U.E E.N.D",
    "A.L.L T.R.U.E E.N.D",
    "T..H..E E..N..D",
    "Altered F.I.N.A.L",
    "Refinity",
    "✠",
    "Symbol Loops #1, ?",
    "Absolute Kilominx of Numbers",
    "THE GOODBYE",
    "End",
    "T-H-E E-N-D",
    "THE BREAKING END",
    "The Capacity Ending Limit",
    "The Paradox of Numbers",
    "Masterying Symbols… ↑",
    "Omnivssunians",
    "THE TRUE BEYOND GODS OF ALL TIME",
    "??????? [3]",
    "??????? [4]",
    "?????? [?????? [2]]",
    "?????? [?????? [4]]",
    "??????? [??]",
    "The Pre-Cycliops Stage",
    "??????? [!]",
    "Inderlayered Cycles",
    "God Rebirthed-All ENDING",
    "Hyperimianisfinity",
    "THE FINAL IMPACT",
    "Absolute-Killientifninain",
    "The Sacrifice of ENDS",
    "𝔵[1, 1]",
    "𝔵[1, 2]",
    "𝔵[1, 3]",
    "𝔵[#1]",
    "𝔵1",
    "₴",
    "𝖘",
    "⍬ [1] ⍋",
    "Even More Cardistinity Omnize Omni Power",
    "The End of Every Single Integer",
    "New cycle begins!",
    "Cyclion #1",
    "Breaking symbols I",
    "Word spams III",
    "𖣐 / ᛃ",
    "NG OF EVERYWHERES!",
    "⍒",
    "⑀ – ⍒[???]",
    "I̵n̵t̸e̶r̵n̶a̶l̸ ̶E̵n̸d̵i̷n̵g̴",
    "T̸ℌ̷E̸ ̵G̸ℛ̸E̸Å̸T̶ ̷ℂ̶O̵L̸⅂̴A̵P̴S̵ℑ̸ℕ̶G̷ ̶ℙ̴O̷I̵N̴T̶",
    "𝕭",
    "ẩ",
    "Ծ",
    "թ",
    "ջ",
    "ձ",
    "Ⱀ",
    "Ⱉ",
    "F.E.A.I.C.G.B",
    "S.O.G.F.E.C.H.U.F.E.A.I.C.G.B",
    "B̸͚͍̋͠r̵̼̒͗͜e̶͉͔͠͝ā̴͍k̷̨͓̀d̸̤͕͋ợ̶͝ẘ̷̡̢͂n̴̢̩̑̕f̷̼͆i̷̞̰̚n̶̠̯͐i̷͍̓̌t̵͍̽y̶͔͌",
    "𖥜",
    "??????? [??????? [??????? [2]]]",
    "!!!!!!! ?",
    "Za̶l̸g̸o̸ ̶l̷e̸v̴e̸l̸ ̸1̵ ̵(̷1̴)̵",
    "Beyond The Extending of Numbers",
    "The Singularity of the Final Number Limit",
    "THE LIMIT OF SYMBOLS",
    "THE LIMIT OF CYCLES",
    "END LIMITS OF NOWHERE",
    "THE TRUE END OF NOWHERE",
    "UNIDEFINEDFINITY",
    "FINITIUM LIMIT",
    "BEYOND FINITIUM LIMIT / THE FINITE EXPANSION [1/4]",
    "NEVER END[1/5]",
    "Softcapped Infinity",
    "THE TRUE GREAT END OF THE BEYOND [1 / 1 / 2]",
    "Hardcapped Infinity",
    "THE ETERNITY ENDING OF ALL ENDS, ALL FINITES AND ALL EXISTENCE",
    "Black Hole Number 1",
    "The Numbers that never End",
    "True Numbers Breaking Point",
    "Numbers can never reach…",
    "EVERYTHING.",
    "EVERYTHING will never reach…",
    "SPAM LAYERS OF .",
    "400 GIGABYTES OF STORAGE USED",
    "∞ Bytes of Storage Used",
    "??!@$&(@!*&$)(@!$&()!&$(@*!&)$@!#78!!!!’S OF TRUE BEYOND FINALES",
    "SPAM FINAL ENDING SYMBOLS",
    "THE RIP END",
    "The Rysterious",
    "Hyperialize",
    "The Real Final Point",
    "Roman Numeral Onefinity",
    "Roman Numeral Absolute Infinityfinity",
    "$$$$[1]",
    "****[1]",
    "Bypassing the Ends",
    "BTBTBTE",
    "BTABCDEFGHIJKLMNOPQRSTUVWXYZE",
    "Italicized!",
    "???[END!]",
    "???[?????]",
    "FINAL EVERYTHING GOODBYE TETRA ENDING",
    "ABSOLUTE LIMITLESS END MEGA",
    "ABSOLUTE LIMITLESS BOLD END",
    "Absolute Limitless Bold Limit",
    "A.L.B.Impossible",
    "A.L.B.A.L.B.E.E.L.I.Z.E",
    "True Undefined",
    "THE TRUE END OF FICTIONAL GOOGOLOGY"
]

let fibList = []

function fib(n) {
    if (!fibList.length) {
        fibList[0] = 1
        fibList[1] = 2
        for (let i = 2; i < ordMarks1.length; i++) {
            fibList[i] = fibList[i - 1] + fibList[i - 2]
        }
    }
    if (n < 0) return 0
    if (n >= ordMarks1.length) return Infinity
    return fibList[Math.floor(n)]
}

function displayPsi1Ord(ord) {
    //let OLstart = BASE2_CAP
    //let OLfactor = 2
    //let currentOL = Math.min(Math.floor(ord / t2Auto()), ordMarks1.length - 1) //Math.min(Math.max(Math.floor(Math.log(ord / OLstart) / Math.log(OLfactor)) + 1, 0), ordMarks1.length - 1)

    //let currentOL = ord >= 1 ? Math.min(Math.floor(Math.log2(ord)), ordMarks1.length - 1) : 0
    let currentOL = 0
    while (ord >= fib(currentOL + 1)) currentOL++
    return ordMarks1[currentOL]
}
