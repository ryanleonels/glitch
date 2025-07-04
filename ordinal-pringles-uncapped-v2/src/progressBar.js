function getTargetBoost() {
    if (data.boost.times >= boostLimit) return data.boost.times
    return Math.min(data.boost.times + getBulkBoostAmt() - (data.ord.ordinal < boostReq() || !data.bulkBoost ? 1 : 0), boostLimit - 1)
}
function getBarPercent(){
    if(!data.ord.isPsi || data.ord.base > 2) return 0
    return data.ord.ordinal / boostReq(getTargetBoost()) * 100
}
function getTimeEstimate(){
    if(!data.ord.isPsi || data.ord.base > 2)return "Infinity"
    if(boostReq()===data.ord.ordinal)return "0s"
    return formatTime((boostReq(getTargetBoost())-data.ord.ordinal)/t2Auto())
}
function updateProgressBar(){
    DOM("progressBar").style.width = Math.min(100, getBarPercent()) + "%"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%:&nbsp;" + getTimeEstimate().replaceAll(" ","&nbsp;") + "&nbsp;est."
}
