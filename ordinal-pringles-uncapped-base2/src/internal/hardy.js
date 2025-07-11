// Calculates f_{func}(base)
function EN_fgh(func, base)
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
        base = EN_fgh(2, base);
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
        base = EN_fgh(func - 1, base)
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
        base.normalize();
        reps = ExpantaNum(0)
      }
    }
    return base;
  }
}

// Calculates f_ω(base)
function EN_fghOmega(base)
{
  base = ExpantaNum(base)
  if (base.lte(1000))
  {
    return EN_fgh(base, base);
  }
  else
  {
    base.layer += 1
    return base;
  }
}

// Calculates f_{ω+1}(base)
function EN_fghOmegaPlusOne(base)
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
      base = EN_fghOmega(base);
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
    return Infinity;
  }

  if (ord.gte(base ** (base + 1)))
  {
    return EN_fghOmegaPlusOne(hardy(ord.sub(base ** (base + 1)), base, over));
  }

  if (ord.gte(base ** base))
  {
    return EN_fghOmega(hardy(ord.sub(base ** base), base, over));
  }

  if (ord.lt(base))
  {
    return ord.add(base + over);
  }

  highestPower = ord.logBase(base).floor();
  restOrd = ord.sub(ExpantaNum.pow(base, highestPower));

  return EN_fgh(highestPower, hardy(restOrd, base, over));
}

function rep(mult, restOrd, base, over=0)
{
  if (EN(mult).eq(1)) {
    if (hardy(EN(base ** (base + 1)).add(restOrd), base, over) != Infinity) {
      return parseInt(beautifyEN(hardy(EN(base ** (base + 1)).add(restOrd), base, over)).split("}}")[1])
    }
    return 3;
  }
  return beautifyEN(hardy(EN(base ** base).times(2).add(restOrd), base, over)).split("{{").length + mult.toNumber();
}

function isHugeRep(mult, restOrd, base, over=0)
{
  if (EN(mult).eq(1)) {
    if (hardy(EN(base ** (base + 1)).add(restOrd), base, over) != Infinity) {
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
    return EN_format(hardy(ord1, base, over));
  }

  // w+1 level (includes handling above ExpantaNum limit, simplified into 10{{2}}n)
  if (highestPower.eq(base + 1))
  {
    if (hardy(ord1, base, over) != Infinity) {
      return EN_format(hardy(ord1, base, over));
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
  //if (highestPower.lt(EN(base).tetr(base)) || ord < 4e270) { // second condition for e.g. base 2/3 just in case (although it's normally not valid/possible)
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
  //}

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

function psiHardy(ord, base) {
  if (isNaN(ord)) return "NEVER"; // NEVER
  if (ord === Infinity) return "Ω"; // Absolute Infinity

  if (base === 2) { // psi base 2 - in reverse order, individual values are only available up to omega fixed point (per-level value above that point)
    if (ord >= 2**155) return "S(10,10{1,,2,,2}2)"; // Ω_(I+1) level (using Strong Array Notation) (highest level reachable below Number.MAX_VALUE)
    if (ord >= 17) return "S(10,10{1,,1,,2}2)"; // I level (using Strong Array Notation)
    if (ord >= 16) return "{10,10[1[2/<sub>1[1[2/<sub>1,2</sub>2]2]2</sub>2]2]2}"; // θ(Ω_Ω) = omega fixed point (limit of Bird's Array Notation)
    if (ord >= 15) return "{10,10[1[2/<sub>1[1[1/2~2]2]2</sub>2]2]2}"; // θ(Ω_Γ0)
    if (ord >= 14) return "{10,10[1[2/<sub>1[1[1[2~2]2~2]2]2</sub>2]2]2}"; // θ(Ω_φ(φ(ω, 0), 0))
    if (ord >= 13) return "{10,10[1[2/<sub>1[1[1\\2~2]2]2</sub>2]2]2}"; // θ(Ω_φ(εω, 0))
    if (ord >= 12) return "{10,10[1[2/<sub>1[1[1,2~2]2]2</sub>2]2]2}"; // θ(Ω_φ(ε0, 0))
    if (ord >= 11) return "{10,10[1[2/<sub>1[1[2~2]2]2</sub>2]2]2}"; // θ(Ω_φ(ω, 0))
    if (ord >= 10) return "{10,10[1[2/<sub>1[1/1,2]2</sub>2]2]2}"; // θ(Ω_εω)
    if (ord >= 9) return "{10,10[1[2/<sub>1[1/2]2</sub>2]2]2}"; // θ(Ω_ε0)
    if (ord >= 8) return "{10,2[1[1¬3]2]2}"; // Γ0 = BHO base 2
    if (ord >= 7) return "{10,2[1[1[2¬2]2¬2]2]2}"; // φ(φ(ω, 0), 0)
    if (ord >= 6) return "{10,2[1[1\\2¬2]2]2}"; // φ(εω, 0)
    if (ord >= 5) return "{10,2[1[1,2¬2]2]2}"; // φ(ε0, 0)
    if (ord >= 4) return "{10,2[1[2¬2]2]2}"; // φ(ω, 0)
    if (ord >= 3) return "{10,2[1\\1,2]2}"; // εω
    if (ord >= 2) return "8.00"; // ε0 base 2
    if (ord >= 1) return "4.00"; // Hω(2)
    if (ord >= 0) return "3.00"; // H1(2)
    return "2.00"; // H0(2)
  }

  // psi base 3+ - ultra-simplified (1 value per ordinal level), in reverse order (value represents the highest ordinal level at or below current ordinal)
  if (ord >= BHO_VALUE * (3**988)) return "{10,10[1[1~3]1/1/2~3]2}"; // ε(Ω+1)^(Ω²) = Ω2^Ω² (current ordMarks limit, likely not reachable as it's above Number.MAX_VALUE)
  if (ord >= BHO_VALUE * (3**247)) return "{10,10[1[1~3]1/3~3]2}"; // ε(Ω+1)^(Ω2) = Ω2^Ω (highest level reachable below Number.MAX_VALUE)
  if (ord >= BHO_VALUE * (3**123)) return "{10,10[1[1~3]1/2~3]2}"; // ε(Ω+1)^Ω = Ω2² (former ordMarks limit)
  if (ord >= BHO_VALUE * (3**82)) return "{10,10[1[1~3]3~3]2}"; // ε(Ω+1)^3 = Ω2ψ1(Ω2ψ1(Ω2))
  if (ord >= BHO_VALUE * (3**41)) return "{10,10[1[1~3]2~3]2}"; // ε(Ω+1)^2 = Ω2ψ1(Ω2)
  if (ord >= BHO_VALUE * 81) return "{10,10[1[1/1/2~3]2]2}"; // ε(Ω+1)Ω^Ω = Ω2Ω^Ω
  if (ord >= BHO_VALUE * 3) return "{10,10[1[1/2~3]2]2}"; // ε(Ω+1)Ω = Ω2Ω
  if (ord > BHO_VALUE) return "{10,10[1[1~3]2]2}"; // ε(Ω+1) = BHO = Ω2
  if (ord == BHO_VALUE) return "{10,10[1[1¬1¬2]2]2}"; // Large Veblen Ordinal / Ω^(Ω^Ω) = BHO base 3
  if (ord >= 16210220612075905068) return "{10,10[1[1¬1,2]2]2}"; // Small Veblen Ordinal / Ω^(Ω^ω)
  if (ord >= 5403406870691968356) return "{10,10[1[2¬4]2]2}"; // Ω^(Ω²ω)
  if (ord >= 1801135623563989452) return "{10,10[1[1¬4]1[1¬4]1[2¬3]2]2}"; // Ω^(Ω²2+Ωω)
  if (ord >= 600378541187996484) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1[1¬3]1[2¬2]2]2}"; // Ω^(Ω²2+Ω2+ω)
  if (ord >= 200126180395998828) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1[1¬3]1\\1\\2]2}"; // Ω^(Ω²2+Ω2+2)
  if (ord >= 66708726798666276) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1[1¬3]1\\2]2}"; // Ω^(Ω²2+Ω2+1)
  if (ord >= 22236242266222092) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1[1¬3]2]2}"; // Ω^(Ω²2+Ω2)
  if (ord >= 7412080755407364) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1[2¬2]2]2}"; // Ω^(Ω²2+Ω+ω)
  if (ord >= 2470693585135788) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1\\1\\2]2}"; // Ω^(Ω²2+Ω+2)
  if (ord >= 823564528378596) return "{10,10[1[1¬4]1[1¬4]1[1¬3]1\\2]2}"; // Ω^(Ω²2+Ω+1)
  if (ord >= 274521509459532) return "{10,10[1[1¬4]1[1¬4]1[1¬3]2]2}"; // Ω^(Ω²2+Ω)
  if (ord >= 91507169819844) return "{10,10[1[1¬4]1[1¬4]1[2¬2]2]2}"; // Ω^(Ω²2+ω)
  if (ord >= 30502389939948) return "{10,10[1[1¬4]1[1¬4]1\\1\\2]2}"; // Ω^(Ω²2+2)
  if (ord >= 10167463313316) return "{10,10[1[1¬4]1[1¬4]1\\2]2}"; // Ω^(Ω²2+1)
  if (ord >= 3389154437772) return "{10,10[1[1¬4]1[1¬4]2]2}"; // Double Ackermann's Ordinal / Ω^(Ω²2)
  if (ord >= 1129718145924) return "{10,10[1[1¬4]1[2¬3]2]2}"; // Ω^(Ω²+Ωω)
  if (ord >= 376572715308) return "{10,10[1[1¬4]1[1¬3]1[1¬3]1[2¬2]2]2}"; // Ω^(Ω²+Ω2+ω)
  if (ord >= 125524238436) return "{10,10[1[1¬4]1[1¬3]1[1¬3]1\\1\\2]2}"; // Ω^(Ω²+Ω2+2)
  if (ord >= 41841412812) return "{10,10[1[1¬4]1[1¬3]1[1¬3]1\\2]2}"; // Ω^(Ω²+Ω2+1)
  if (ord >= 13947137604) return "{10,10[1[1¬4]1[1¬3]1[1¬3]2]2}"; // Ω^(Ω²+Ω2)
  if (ord >= 4649045868) return "{10,10[1[1¬4]1[1¬3]1[2¬2]2]2}"; // Ω^(Ω²+Ω+ω)
  if (ord >= 1549681956) return "{10,10[1[1¬4]1[1¬3]1\\1\\2]2}"; // Ω^(Ω²+Ω+2)
  if (ord >= 516560652) return "{10,10[1[1¬4]1[1¬3]1\\2]2}"; // Ω^(Ω²+Ω+1)
  if (ord >= 172186884) return "{10,10[1[1¬4]1[1¬3]2]2}"; // Ω^(Ω²+Ω)
  if (ord >= 57395628) return "{10,10[1[1¬4]1[2¬2]2]2}"; // Ω^(Ω²+ω)
  if (ord >= 19131876) return "{10,10[1[1¬4]1\\1\\2]2}"; // Ω^(Ω²+2)
  if (ord >= 6377292) return "{10,10[1[1¬4]1\\2]2}"; // Ω^(Ω²+1)
  if (ord >= 2125764) return "{10,10[1[1¬4]2]2}"; // Ackermann's Ordinal / Ω^(Ω²)
  if (ord >= 708588) return "{10,10[1[2¬3]2]2}"; // Ω^(Ωω)
  if (ord >= 236196) return "{10,10[1[1¬3]1[1¬3]1[2¬2]2]2}"; // Ω^(Ω2+ω)
  if (ord >= 78732) return "{10,10[1[1¬3]1[1¬3]1\\1\\2]2}"; // Ω^(Ω2+2)
  if (ord >= 26244) return "{10,10[1[1¬3]1[1¬3]1\\2]2}"; // Ω^(Ω2+1)
  if (ord >= 8748) return "{10,10[1[1¬3]1[1¬3]2]2}"; // Ω^(Ω2)
  if (ord >= 2916) return "{10,10[1[1¬3]1[2¬2]2]2}"; // Ω^(Ω+ω)
  if (ord >= 972) return "{10,10[1[1¬3]1\\1\\2]2}"; // Ω^(Ω+2)
  if (ord >= 324) return "{10,10[1[1¬3]1\\2]2}"; // Ω^(Ω+1)
  if (ord >= 216) return "{10,10[1[1¬3]2]3}"; // (Ω^Ω)2
  if (ord >= 109) return "{10,100[1[1¬3]2]2}"; // SGH Graham's Number Ordinal
  if (ord >= 108) return "{10,10[1[1¬3]2]2}"; // Γ0 (Ω^Ω)
  if (ord >= 76) return "{10,10[1[1[1\\2¬2]2¬2]2]2}"; // φ(φ(ε0, 0), 0)
  if (ord >= 72) return "{10,10[1[1[2¬2]2¬2]2]2}"; // φ(φ(ω, 0), 0)
  if (ord >= 40) return "{10,10[1[1\\2¬2]2]2}"; // φ(ε0, 0)
  if (ord >= 38) return "{10,10[1[1,2¬2]2]2}"; // φ(ω^ω, 0)
  if (ord >= 37) return "{10,10[1[3¬2]2]2}"; // φ(ω², 0)
  if (ord >= 36) return "{10,10[1[2¬2]2]2}"; // φ(ω, 0)
  if (ord >= 24) return "{10,10[1\\1\\1[1\\1\\2]2]2"; // ζζ0
  if (ord >= 13) return "{10,10[1\\1\\1,2]2}"; // ζω
  if (ord >= 12) return "{10,10[1\\1\\2]2}"; // ζ0
  if (ord >= 8) return "{10,10[1\\1[1\\2]2]2)"; // εε0
  if (ord >= 5) return "{10,10[1\\1,2]2}"; // εω
  if (ord >= 4) return (base === 3) ? "{10,2[2]2}" : "{10,10[1\\2]2}"; // ε0
  if (ord >= 3) return getHardy(base ** (base ** 2), 0, base, false); // ω^ω²
  if (ord >= 2) return getHardy(base ** base, 0, base, false); // ω^ω
  if (ord >= 1) return getHardy(base, 0, base, false); // ω
  if (ord >= 0) return getHardy(1, 0, base, false); // 1
  return getHardy(0, 0, base, false); // 0
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
    return EN_fghOmegaPlusOne(hardyList(ordList, subOneFromLast(omega), base));
  }
  else if (omega.length == 1)
  {
    return EN_fghOmega(hardyList(ordList, subOneFromLast(omega), base))
  }
  else if (ordList.length == 0)
  {
    return base;
  }
  else if (ordList.length == 1)
  {
    return base.add(ordList[0]);
  }

  return EN_fgh(ordList.length - 1, hardyList(subOneFromLast(ordList), [], base))
}
