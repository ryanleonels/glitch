function autoCost(n) {
    return D(100).mul(D(2).pow(data.autoLevels[n]))
}

function buyAuto(n) {
    if (data.markup.powers.lt(autoCost(n))) return
    data.markup.powers = data.markup.powers.sub(autoCost(n))
    data.autoLevels[n] = data.autoLevels[n].add(1)
}
function buyMaxAuto() {
    buyAuto(0)
    buyAuto(1)

    let bulkSucc = Decimal.floor(Decimal.log2(Decimal.add(1, data.markup.powers.div(Decimal.mul(100, Decimal.pow(2, data.autoLevels[0]))))))
    if (data.markup.powers.lte('ee15')) data.markup.powers = data.markup.powers.sub(Decimal.pow(2, bulkSucc).sub(1).mul(100).mul(Decimal.pow(2, data.autoLevels[0])))
    data.autoLevels[0] = data.autoLevels[0].add(bulkSucc)

    let bulkMax = Decimal.floor(Decimal.log2(Decimal.add(1, data.markup.powers.div(Decimal.mul(100, Decimal.pow(2, data.autoLevels[1]))))))
    if (data.markup.powers.lte('ee15')) data.markup.powers = data.markup.powers.sub(Decimal.pow(2, bulkMax).sub(1).mul(100).mul(Decimal.pow(2, data.autoLevels[1])))
    data.autoLevels[1] = data.autoLevels[1].add(bulkMax)
}

function factorCost(n){
    return Decimal.pow(D(10).pow(n+1), D(2).pow(data.factors[n]))
}
function hasFactor(n){
    if (n >= 7) return false
    return data.markup.shifts >= n+1
}
function factorEffect(n){
    if(data.factors[n].lt(1)) return 1
    let nShifts = Math.min(data.markup.shifts, 7)
    return data.factors[n].add(1).mul(Decimal.pow(Math.max(1+(nShifts-n-1)/10, 1), [1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][nShifts]))
}
function factorBoost(){
    let mult = D(1)
    for (let i = 0; i < data.factors.length; i++) {
        mult = mult.mul(factorEffect(i))
    }
    return mult
}
function buyFactor(n){
    if(!hasFactor(n)) return
    if(data.markup.powers.lt(factorCost(n))) return
    data.markup.powers = data.markup.powers.sub(factorCost(n))
    data.factors[n] = data.factors[n].add(1)
}
function buyMaxFactor(){
    if(data.ord.isPsi) {
        for (let i = 0; i < data.factors.length; i++){
            let factorsBuyable = D('10^^10').log10().div(i+1).log2().floor().add(1)
            data.factors[i] = factorsBuyable
        }
        return
    }
    for (let i = 0; i < data.factors.length; i++){
        if(!hasFactor(i)||data.markup.powers.lt(1)) break
        let factorsBuyable = data.markup.powers.log10().div(i+1).log2().floor().add(1)
        //if (factorsBuyable.gte(1e20)) factorsBuyable = D(1e20)
        let oomDifference = D(i+1).mul(Decimal.pow(2, factorsBuyable).sub(Decimal.pow(2, data.factors[i])));
        if (oomDifference.lt(16) && data.markup.powers.lte('ee15')) {
            while (data.markup.powers.gte(Decimal.pow(Decimal.pow(10,(i+1)),Decimal.pow(2,data.factors[i])))) {
                buyFactor(i)
            }
        } else {
            if (factorsBuyable.gte(data.factors[i])) {
                if (data.markup.powers.lte('ee15')) data.markup.powers = data.markup.powers.sub(Decimal.pow(10, Decimal.mul(i+1, Decimal.pow(2, factorsBuyable.sub(1)))));
                data.factors[i] = factorsBuyable;
            }
        }
    }
}

function dyGain(){
    return data.dy.gain
}
