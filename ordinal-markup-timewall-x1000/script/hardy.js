// Calculates f_{func}(base)
function fgh(func, base)
{
  if (base == undefined) 
  {
    base = 0
  }
  base = ExpantaNum(base);

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
    return base.mul(ExpantaNum.pow(2, base));
  }
  else if (func == 3)
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lt(1e100))
      {
        base = fgh(2, base);
        reps = reps.sub(1);
      }
      else
      {
        base = base.layeradd(reps, 2);
        reps = ExpantaNum(0);
      }
    }
    return base;
  }
  else
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lt(1e100))
      {
        base = fgh(func - 1, base)
        reps = reps.sub(1)
      }
      else
      {
        if (reps.lt(9e15))
        {
          base.array.push([func - 2, reps.toNumber()])
        }
        else
        {
          base = base.arrow(func - 1)(reps)
        }
        base.standardize();
        reps = ExpantaNum(0)
      }
    }
    return base;
  }
}

// Calculates f_ω(base)
function fghOmega(base)
{
  base = ExpantaNum(base)
  if (base.lte(1000))
  {
    return fgh(base, base);
  }
  else
  {
    base.layer += 1
    return base;
  }
}

// Calculates f_{ω+1}(base)
function fghOmegaPlusOne(base)
{
  base = ExpantaNum(base)
  reps = base;

  if (reps.gt(9e15))
  {
    return ExpantaNum(Infinity)
  }

  while (reps.gt(0))
  {
    if (base.lte(1000))
    {
      base = fghOmega(base);
      reps = reps.sub(1)
    }
    else
    {
      base = ExpantaNum("J^" + reps.toString() + " " + base.toString());
      reps = ExpantaNum(0);
    }
  }
  return base;
}

function hardy(ord, base, over=0)
{
  ord = ExpantaNum(ord);

  if (ord.gte(base ** (base + 2)))
  {
    return EN(Infinity);
  }

  if (ord.gte(base ** (base + 1)))
  {
    return fghOmegaPlusOne(hardy(ord.sub(base ** (base + 1)), base, over));
  }

  if (ord.gte(base ** base))
  {
    return fghOmega(hardy(ord.sub(base ** base), base, over));
  }

  if (ord.lt(base))
  {
    return ord.add(base + over);
  }

  highestPower = ord.logBase(base).floor();
  restOrd = ord.sub(ExpantaNum.pow(base, highestPower));

  return fgh(highestPower.toNumber(), hardy(restOrd, base, over));
}

function removeTrailingZeros(list)
{
  listClone = [...list]
  while (listClone[listClone.length - 1] == 0)
  {
    listClone.pop();
  }
  return listClone;
}

function subOneFromLast(list)
{
  listClone = [...list]
  listClone[list.length - 1] -= 1;
  return listClone;
}

// this function expects a list of numbers instead of an ordinal with the "omega" list containing a maximum of two elements
// so hardyList([1, 2, 3], [4, 5], 10) would calculate H[ω^(ω+1)*5 + ω^(ω)*4 + ω^3*3 + ω^2*2 + ω]
function hardyList(ordList, omega, base)
{
  ordList = removeTrailingZeros(ordList)
  omega = removeTrailingZeros(omega)
  base = ExpantaNum(base)

  if (omega.length > 2)
  {
    return ExpantaNum(Infinity)
  }
  else if (omega.length == 2)
  {
    return fghOmegaPlusOne(hardyList(ordList, subOneFromLast(omega), base));
  }
  else if (omega.length == 1)
  {
    return fghOmega(hardyList(ordList, subOneFromLast(omega), base))
  }
  else if (ordList.length == 0)
  {
    return base;
  }
  else if (ordList.length == 1)
  {
    return base.add(ordList[0]);
  }

  return fgh(ordList.length - 1, hardyList(subOneFromLast(ordList), [], base))
}

function rep(mult, restOrd, base, over=0)
{
  if (EN(mult).eq(1)) {
    if (hardy(EN(base ** (base + 1)).add(restOrd), base, over).toString() != "Infinity") {
      return parseInt(beautifyEN(hardy(EN(base ** (base + 1)).add(restOrd), base, over)).split("}}")[1])
    }
    return 3;
  }
  return beautifyEN(hardy(EN(base ** base).times(2).add(restOrd), base, over)).split("{{").length + mult.toNumber();
}

function isHugeRep(mult, restOrd, base, over=0)
{
  if (EN(mult).eq(1)) {
    if (hardy(EN(base ** (base + 1)).add(restOrd), base, over).toString() != "Infinity") {
      return false;
    }
  }
  return true;
}

function bigHardy(ord, base, over=0)
{
  let ord1 = ExpantaNum(ord);
  let highestPower = ord1.logBase(base).floor();
  let highestPowerMult = ord1.div(ExpantaNum.pow(base, highestPower)).floor();
  let restOrd = ord1.sub(ExpantaNum.pow(base, highestPower).times(highestPowerMult));
  if (restOrd.gte(EN(base ** base))) restOrd = EN(base ** base).sub(1);

  // w level and below
  if (highestPower.lte(base))
  {
    return beautifyEN(hardy(ord1, base, over));
  }

  // w+1 level (includes handling above ExpantaNum limit, simplified into 10{{2}}n)
  if (highestPower.eq(base + 1))
  {
    if (hardy(ord1, base, over) != Infinity) {
      return beautifyEN(hardy(ord1, base, over));
    }

    return "10{{2}}" + rep(highestPowerMult, restOrd, base, over);
  }

  // w+n level
  if (highestPower.lt(base * 2))
  {
    let c = highestPower.sub(base).toNumber();
    return "10{{" + (c + isHugeRep(highestPowerMult, restOrd, base, over)) + "}}" + rep(highestPowerMult, restOrd, base, over);
  }

  // w2 level
  if (highestPower.eq(base * 2))
  {
    if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "10{{" + rep(highestPowerMult, restOrd, base, over) + "}}10";
    return "{10," + rep(highestPowerMult, restOrd, base, over) + ",1,3}";
  }

  // wn level
  if (highestPower.lt(base * base))
  {
    let c = highestPower.mod(base).toNumber();
    let d = highestPower.div(base).floor().toNumber();
    if (!c) {
      if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{10,10," + rep(highestPowerMult, restOrd, base, over) + "," + d + "}";
      return "{10," + rep(highestPowerMult, restOrd, base, over) + ",1," + (d+1) + "}";
    }
    return "{10," + rep(highestPowerMult, restOrd, base, over) + "," + (c+isHugeRep(highestPowerMult, restOrd, base, over)) + "," + (d+1) + "}";
  }

  // w^2 level
  if (highestPower.eq(base * base)) {
    if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{10,10,10," + rep(highestPowerMult, restOrd, base, over) + "}";
    return "{10," + rep(highestPowerMult, restOrd, base, over) + ",1,1,2}";
  }

  // w^n level
  if (highestPower.lt(base ** base)) {
    //c,d,e,...
    //c=0: {10,10,x,d+1,e+1,...} / {10,x,1,d+1,e+1,...}
    //c>0: {10,x,c,d+1,e+1,...} / {10,x,c+1,d+1,e+1,...}
    let c = highestPower.mod(base).toNumber();
    let dd = highestPower.div(base).floor();
    let arr = "{10,"; //a
    //b
    if (!c && !isHugeRep(highestPowerMult, restOrd, base, over)) arr += "10,";
    else arr = arr + rep(highestPowerMult, restOrd, base, over) + ",";
    //c
    if (!c && !isHugeRep(highestPowerMult, restOrd, base, over)) arr += rep(highestPowerMult, restOrd, base, over);
    else arr = arr + (c+isHugeRep(highestPowerMult, restOrd, base, over));
    //d,e,...
    let d = dd.mod(base).toNumber();
    while (dd.gt(0)) {
      arr = arr + "," + (d+1);
      dd = dd.div(base).floor();
      d = dd.mod(base).toNumber();
    }
    arr += "}";
    return arr;
  }

  // w^w level and above (further simplified beyond this point as things become more complicated + not commonly reached in normal situations)
  if (ord < 4e270) { // pre-psi
    if (highestPower.eq(base ** base)) {
      if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{10," + (rep(highestPowerMult, restOrd, base, over)-2) + "[2]2}";
      return "{10,10,2[2]2}";
    }

    if (highestPower.lt((base ** base) + base)) {
      return "{10,10," + (highestPower.sub(base ** base).toNumber() + isHugeRep(highestPowerMult, restOrd, base, over) + 1) + "[2]2}";
    }

    if (highestPower.eq((base ** base) + base)) {
      if (!isHugeRep(highestPowerMult, restOrd, base, over)) return "{10,10," + (rep(highestPowerMult, restOrd, base, over)+1) + "[2]2}";
      return "{10,10,1,2[2]2}";
    }

    if (highestPower.lt((base ** base) + (base * 2))) {
      return "{10,10," + (highestPower.sub((base ** base) + base).toNumber() + isHugeRep(highestPowerMult, restOrd, base, over)) + ",2[2]2}";
    }

    if (highestPower.lt((base ** base) + (base ** 2))) {
      return "{10,10,10," + highestPower.sub(base ** base).div(base).floor().toNumber() + "[2]2}";
    }

    if (highestPower.lt((base ** base) * 2)) {
      let n = highestPower.sub(base ** base).logBase(base).floor().toNumber();
      let arr = "{10,10";
      for (let i = 0; i < n; i++) arr += ",10";
      arr += "[2]2}";
      return arr;
    }

    if (highestPower.lt(EN(base).pow(base + 1))) {
      return "{10,12[2]" + highestPower.div(base ** base).add(1).floor().toNumber() + "}";
    }

    // w^(w+n) level - greatly simplified beyond this point as it's normally unreachable (ord already exceeds 1.79e308 for any base >= 4 where it's valid)
    if (highestPower.lt(EN(base).pow(base * 2))) {
      let arr = "{10,10[2]";
      let n = highestPower.logBase(base).sub(base).floor().toNumber();
      for (let i = 0; i < n; i++) arr += "1,"
      arr += "2}";
      return arr;
    }

    // w^(wn) level
    if (highestPower.lt(EN(base).pow(base ** 2))) {
      return "{10," + highestPower.logBase(base).div(base).floor().toNumber() + "[3]2}";
    }

    // w^(w^n) level
    if (highestPower.lt(EN(base).pow(base ** base))) {
      return "{10,10[" + highestPower.logBase(base).logBase(base).add(1).floor().toNumber() + "]2}";
    }

    // w^(w^w) level and above (w^^n level) - extremely simplified as it's highly unreachable (ord > 4^^4)
    if (highestPower.lt(EN(base).tetr(base)) || ord < 4e270) { // second condition for e.g. base 2/3 just in case (although it's normally not valid/possible)
      // 3: 1,2
      // 4: 1[2]2
      // 5: 1[1,2]2
      // 6: 1[1[2]2]2
      // 7: 1[1[1,2]2]2
      // 8: 1[1[1[2]2]2]2
      let arr = "{10,10["
      let n = highestPower.slog(base).floor().toNumber();
      let arr1 = "1,2";
      for (let i = 3; i < n; i++) {
        if (i%2) arr1 = arr1.replace("1,2","1[2]2");
        else arr1 = arr1.replace("1[2]2","1[1,2]2");
      }
      arr += arr1;
      arr += "]2}";
      return arr;
    }
  }

  // ε0 level and beyond - time to switch to psi ordinals

  if (ord === 4e270) { // ψ(Ω) = ε0
    switch (base) {
      case 2: return "8"; break;
      case 3: return "{10,2[2]2}"; break;
      default: return "{10,10[1\\2]2}"; break;
    }
  }

  if (base === 2) { // psi base 2
    switch (ord) {
      case 5e270: return "{10,2[1\\1,2]2}"; break; // εω
      case 3.6e271: return "{10,2[1[2¬2]2]2}"; break; // φ(ω, 0)
      case 4e271: return "{10,2[1[1,2¬2]2]2}"; break; // φ(ε0, 0)
      case 4.1e271: return "{10,2[1[1\\2¬2]2]2}"; break; // φ(ε0 + 1, 0)
      case 7.2e271: return "{10,2[1[1[2¬2]2¬2]2]2}"; break; // φ(φ(ω, 0), 0)
      case BHO: return "{10,2[1[1¬3]2]2}"; break; // Γ0 = BHO base 2
      default: return "{10,10[1[2/<sub>1,2</sub>2]2]2}"; break; // θ(Ω_ω)
    }
  }

  if (base >= 3 || ord > BHO) { // psi base 3+ - ultra-simplified, in reverse order (value represents the highest milestone below current ordinal)
    if (ord >= BHO * 2) return "{10,10[1[1~1/2]2]2}"; // ε(Ω2) - highest non-ambiguous milestone pre-incrementyverse as the next one ε(Ω²) is reached at SL(ee9.82e13) >> limit of game.ord value
    if (ord > BHO) return "{10,10[1[1~3]2]2}"; // ε(Ω+1) = BHO
    if (ord == BHO) return "{10,10[1[1/1/2~2]2]2}"; // Large Veblen Ordinal / Ω^(Ω^Ω) = BHO base 3
    if (ord >= 1.6210220612075905068e289) return "{10,10[1[1/1,2~2]2]2}"; // Small Veblen Ordinal / Ω^(Ω^ω)
    if (ord >= 5.403406870691968356e288) return "{10,10[1[2/3~2]2]2}"; // Ω^(Ω²ω)
    if (ord >= 1.801135623563989452e288) return "{10,10[1[1/3~2]1[1/3~2]1[2/2~2]2]2}"; // Ω^(Ω²2+Ωω)
    if (ord >= 6.00378541187996484e287) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²2+Ω2+ω)
    if (ord >= 2.00126180395998828e287) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²2+Ω2+2)
    if (ord >= 6.6708726798666276e286) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω²2+Ω2+1)
    if (ord >= 2.2236242266222092e286) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω²2+Ω2)
    if (ord >= 7.412080755407364e285) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²2+Ω+ω)
    if (ord >= 2.470693585135788e285) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²2+Ω+2)
    if (ord >= 8.23564528378596e284) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]1/2]2}"; // Ω^(Ω²2+Ω+1)
    if (ord >= 2.74521509459532e284) return "{10,10[1[1/3~2]1[1/3~2]1[1/2~2]2]2}"; // Ω^(Ω²2+Ω)
    if (ord >= 9.1507169819844e283) return "{10,10[1[1/3~2]1[1/3~2]1[2~2]2]2}"; // Ω^(Ω²2+ω)
    if (ord >= 3.0502389939948e283) return "{10,10[1[1/3~2]1[1/3~2]1/1/2]2}"; // Ω^(Ω²2+2)
    if (ord >= 1.0167463313316e283) return "{10,10[1[1/3~2]1[1/3~2]1/2]2}"; // Ω^(Ω²2+1)
    if (ord >= 3.389154437772e282) return "{10,10[1[1/3~2]1[1/3~2]2]2}"; // Double Ackermann's Ordinal / Ω^(Ω²2)
    if (ord >= 1.129718145924e282) return "{10,10[1[1/3~2]1[2/2~2]2]2}"; // Ω^(Ω²+Ωω)
    if (ord >= 3.76572715308e281) return "{10,10[1[1/3~2]1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²+Ω2+ω)
    if (ord >= 1.25524238436e281) return "{10,10[1[1/3~2]1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²+Ω2+2)
    if (ord >= 4.1841412812e280) return "{10,10[1[1/3~2]1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω²+Ω2+1)
    if (ord >= 1.3947137604e280) return "{10,10[1[1/3~2]1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω²+Ω2)
    if (ord >= 4.649045868e279) return "{10,10[1[1/3~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω²+Ω+ω)
    if (ord >= 1.549681956e279) return "{10,10[1[1/3~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω²+Ω+2)
    if (ord >= 5.16560652e278) return "{10,10[1[1/3~2]1[1/2~2]1/2]2}"; // Ω^(Ω²+Ω+1)
    if (ord >= 1.72186884e278) return "{10,10[1[1/3~2]1[1/2~2]2]2}"; // Ω^(Ω²+Ω)
    if (ord >= 5.7395628e277) return "{10,10[1[1/3~2]1[2~2]2]2}"; // Ω^(Ω²+ω)
    if (ord >= 1.9131876e277) return "{10,10[1[1/3~2]1/1/2]2}"; // Ω^(Ω²+2)
    if (ord >= 6.377292e276) return "{10,10[1[1/3~2]1/2]2}"; // Ω^(Ω²+1)
    if (ord >= 2.125764e276) return "{10,10[1[1/3~2]2]2}"; // Ackermann's Ordinal / Ω^(Ω²)
    if (ord >= 7.08588e275) return "{10,10[1[2/2~2]2]2}"; // Ω^(Ωω)
    if (ord >= 2.36196e275) return "{10,10[1[1/2~2]1[1/2~2]1[2~2]2]2}"; // Ω^(Ω2+ω)
    if (ord >= 7.8732e274) return "{10,10[1[1/2~2]1[1/2~2]1/1/2]2}"; // Ω^(Ω2+2)
    if (ord >= 2.6244e274) return "{10,10[1[1/2~2]1[1/2~2]1/2]2}"; // Ω^(Ω2+1)
    if (ord >= 8.748e273) return "{10,10[1[1/2~2]1[1/2~2]2]2}"; // Ω^(Ω2)
    if (ord >= 2.916e273) return "{10,10[1[1/2~2]1[2~2]2]2}"; // Ω^(Ω+ω)
    if (ord >= 9.72e272) return "{10,10[1[1/2~2]1/1/2]2}"; // Ω^(Ω+2)
    if (ord >= 3.24e272) return "{10,10[1[1/2~2]1/2]2}"; // Ω^(Ω+1)
    if (ord >= 2.16e272) return "{10,10[1[1/2~2]2]3}"; // (Ω^Ω)2
    if (ord >= 1.09e272) return "{10,100[1[1/2~2]2]2}"; // SGH Graham's Number Ordinal
    if (ord >= 1.08e272) return "{10,10[1[1/2~2]2]2}"; // Γ0 (Ω^Ω)
    if (ord >= 7.6e271) return "{10,10[1[1[1/2~2]2~2]2]2}"; // φ(φ(ε0, 0), 0)
    if (ord >= 7.2e271) return "{10,10[1[1[2~2]2~2]2]2}"; // φ(φ(ω, 0), 0)
    if (ord >= 4e271) return "{10,10[1[1/2~2]2]2}"; // φ(ε0, 0)
    if (ord >= 3.8e271) return "{10,10[1[1,2~2]2]2}"; // φ(ω^ω, 0)
    if (ord >= 3.7e271) return "{10,10[1[3~2]2]2}"; // φ(ω², 0)
    if (ord >= 3.6e271) return "{10,10[1[2~2]2]2}"; // φ(ω, 0)
    if (ord >= 2.4e271) return "{10,10[1/1/1[1/1/2]2]2"; // ζζ0
    if (ord >= 1.3e271) return "{10,10[1/1/1,2]2}"; // ζω
    if (ord >= 1.2e271) return "{10,10[1/1/2]2}"; // ζ0
    if (ord >= 8e270) return "{10,10[1/1[1/2]2]2)"; // εε0
    if (ord >= 5e270) return "{10,10[1/1,2]2}"; // εω
    return "{10,10[1/2]2}"; // ε0 + 1
  }

  // anything that haven't been described so far are likely to be too big
  return "Infinity";

  /* Notes: (just count the top ordinal)
    f_w+1(n) -> 10{{1}}n+1 / 10{{2}}3 for n > 9e15
    f_w+2(n) -> 10{{2}}n+1 / 10{{3}}3
    f_w+m(n) -> 10{{m}}n+1 / 10{{m+1}}n
    f_w2(n) = f_w+n(n) -> 10{{n}}n+1 / 10{{{1}}}3 = {10, 3, 1, 3}
    f_w2+m(n) -> {10, n+1, m, 3} / {10, 3, m+1, 3}
    f_w3(n) -> {10, n+1, n, 3} / {10, 3, 1, 4}
    f_w3+m(n) -> {10, n+1, m, 4} / {10, 3, m+1, 4}
    f_wm(n) -> {10, n+1, n, m} / {10, 3, 1, m+1}
    f_wd+c(n) -> {10, n+1, c, d+1} / {10, 3, c+1, d+1}
    f_w^2(n) = f_w(n-1)+n(n) = {10, n+1, n, n} / {10, 3, n+1, n}
    w^2 level = {10, n, c, d+1, e+1}
    w^3 level = {10, n, c, d+1, e+1, f+1}
    w^n level = {10, n, c, d+1, e+1, f+1, ..., z+1}
    w^w level = order of {10, 10 [2] 2}
    w^w^2 level = order of {10, 10 [3] 2}
    w^w^n level = order of {10, 10 [n] 2}
    w^w^w level = order of {10, 10 [1, 2] 2}
    etc. until ε0 = order of {10, 10 [1 [1 [... [1 [2] 2] ...] 2] 2] 2}
  */
}