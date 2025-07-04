function OPtoOrd(x, b, trim=0) {
    if (x === Infinity) return Infinity
    if (x <= 0.000000000001 || trim >= 12) return 0;
    if (x >= 1e256 && b==3) return 3**27
    let exp = Math.floor(Math.log10(x) + 0.000000000001);
    if (validInBase(exp, b)) {
        let coef = Math.floor(x / 10 ** exp + 0.000000000001);
        if (coef >= b) return b ** (OPtoOrd(exp, b, trim+1) + 1);
        return b ** OPtoOrd(exp, b, trim+1) * coef + OPtoOrd(x - coef * 10 ** exp, b, trim+1);
    } else {
        return b ** OPtoOrd(exp, b, trim+1);
    }
}

function validInBase(x, b) {
    return x
        .toString()
        .split("")
        .every(dig => {
            return Number(dig) < b - 0.5 || dig === "e" || dig === ".";
        });
}

function inNonPsiChallenge() {
    if (data.chal.html === -1) return false
    if (data.chal.completions[data.chal.html] >= 3) return false
    if (data.chal.html === 1) return (!data.chal.completions[data.chal.html])
    return true
}

function getTargetBoost() {
    if (data.boost.times >= boostLimit) return data.boost.times
    return Math.min(data.boost.times + getBulkBoostAmt() - (data.ord.ordinal < boostReq() || !data.bulkBoost ? 1 : 0), boostLimit - 1)
}
function getTargetOrdinal() {
    if (data.chal.html !== -1) {
        let chalGoal = chalGoals[data.chal.html][data.chal.completions[data.chal.html]]
        if (chalGoal !== Infinity) {
            if (data.chal.html===1) {
                if (!data.chal.completions[data.chal.html]) chalGoal = 4e256
                else return chalGoal
            }
            let currentOP = (data.chal.html === 6 || data.chal.html === 7) ? 0 : data.markup.powers;
            return OPtoOrd((chalGoal - currentOP) / opMult(), data.ord.base)
        }
    }
    if (data.boost.times >= 33 && data.ord.base > 2) return BHO_VALUE
    if (data.boost.times >= 99 && data.ord.base === 2) return BASE2_CAP
    return boostReq(getTargetBoost())
}
function getBarPercent(){
    if((!data.ord.isPsi) && !inNonPsiChallenge()) return 0
    if (data.ord.isPsi && inNonPsiChallenge()) return 100
    if(data.ord.ordinal / getTargetOrdinal() * 100 >= 100) return 100
    return Math.min(100, data.ord.ordinal / getTargetOrdinal() * 100)
}
function getTimeEstimate(){
    if((!data.ord.isPsi) && !inNonPsiChallenge()) return "Unknown... "
    if (data.ord.isPsi && inNonPsiChallenge()) return "0s"
    if(getTargetOrdinal() <= data.ord.ordinal)return "0s"
    let t1Auto = !data.chal.active[4]?(data.autoLevels[0]*factorBoost()*bup5Effect()*data.dy.level)/data.chal.decrementy
        :(data.autoLevels[0]*factorBoost()*bup5Effect()/data.dy.level)/data.chal.decrementy
    let autoSpeed = Math.max(1, (data.ord.isPsi ? t2Auto() : t1Auto))
    return formatTime(Math.max((getTargetOrdinal()-data.ord.ordinal)/autoSpeed, 0))
}
function updateProgressBar(){
    DOM("progressBar").style.width = Math.min(100, getBarPercent()) + "%"
    if((!data.ord.isPsi) && !inNonPsiChallenge()) return DOM("progressBar").innerHTML = "???"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%:&nbsp;" + getTimeEstimate().replaceAll(" ","&nbsp;") + "&nbsp;est."
}
