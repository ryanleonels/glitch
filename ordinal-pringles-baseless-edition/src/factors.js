function autoCost(n) {
    return 100*2**data.autoLevels[n]
}

function buyAuto(n) {
    if (data.markup.powers < autoCost(n)) return
    data.markup.powers -= autoCost(n)
    ++data.autoLevels[n]
}
function buyMaxAuto() {
    buyAuto(0)
    buyAuto(1)

    let bulkSucc = Math.floor(Math.log2(1 + (data.markup.powers / (100 * (2 ** data.autoLevels[0])))))
    data.markup.powers -= (((2 ** bulkSucc) - 1) * 100 * (2 ** data.autoLevels[0]))
    data.autoLevels[0] += bulkSucc

    let bulkMax = Math.floor(Math.log2(1 + (data.markup.powers / (100 * (2 ** data.autoLevels[1])))))
    data.markup.powers -= (((2 ** bulkMax) - 1) * 100 * (2 ** data.autoLevels[1]))
    data.autoLevels[1] += bulkMax
}

function factorCost(n){
    return (10**(n+1))**(2**data.factors[n])
}
function hasFactor(n){
    return data.markup.shifts >= n+1
}
function factorEffect(n){
    if(data.factors[n] < 1) return 1
    let nShifts = data.markup.shifts
    let factorEffectExp = (nShifts > 7) ? (nShifts / 10) + 1.6 : [1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][nShifts]
    return (data.factors[n]+1)*(Math.max(1+(nShifts-n-1)/10, 1)**factorEffectExp)
}
function factorBoost(){
    let mult = 1
    for (let i = 0; i < data.factors.length; i++) {
        mult *= factorEffect(i)
    }
    return mult
}
function buyFactor(n){
    if(!hasFactor(n)) return
    if(data.markup.powers < factorCost(n)) return
    data.markup.powers -= factorCost(n)
    ++data.factors[n]
}
function buyMaxFactor(){
    if(data.ord.isPsi) return data.factors = [9,8,7,7,6,6,6]
    for (let i = 0; i < data.factors.length; i++){
        if(!hasFactor(i)) break
        while (data.markup.powers >= Math.pow(10 ** (i + 1), Math.pow(2, data.factors[i]))) buyFactor(i);
    }
}

function dyGain(){
    return data.dy.gain
}

function addFactor(n){
    if (data.factors.length <= n) data.factors[n] = 0
    let button = document.createElement('button');
    button.setAttribute("class", "factor");
    button.setAttribute("id", `factor${n}`);
    button.setAttribute("onclick", `buyFactor(${n})`);
    let text = document.createTextNode(`Factor ${n}`);
    button.appendChild(text);
    DOM("factorSubPage").appendChild(button);
}
