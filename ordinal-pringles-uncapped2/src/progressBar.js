function getTargetBoost() {
    if (data.boost.times >= boostLimit) return data.boost.times
    return Math.min(data.boost.times + getBulkBoostAmt() - (data.ord.ordinal < boostReq() || !data.bulkBoost ? 1 : 0), boostLimit - 1)
}
function getTargetOrdinal() {
    if (data.chal.html===1) return chalGoals[data.chal.html][data.chal.completions[data.chal.html]]
    if (data.boost.times >= 33 && data.ord.base > 2) return BHO_VALUE
    return boostReq(getTargetBoost())
}
function getBarPercent(){
    if(!data.ord.isPsi) return 0
    return data.ord.ordinal / getTargetOrdinal() * 100
}
function getTimeEstimate(){
    if(!data.ord.isPsi)return "Infinity"
    if(boostReq()===data.ord.ordinal)return "0s"
    return formatTime((getTargetOrdinal()-data.ord.ordinal)/t2Auto())
}
function updateProgressBar(){
    DOM("progressBar").style.width = Math.min(100, getBarPercent()) + "%"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%:&nbsp;" + getTimeEstimate().replaceAll(" ","&nbsp;") + "&nbsp;est."
}
