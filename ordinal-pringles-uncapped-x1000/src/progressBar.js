function getBarPercent(){
    if(!data.ord.isPsi) return 0
    return Math.min(100, (data.ord.ordinal / boostReq()) * 100)
}
function getTimeEstimate(){
    if(!data.ord.isPsi)return "Infinity"
    if(boostReq()<data.ord.ordinal)return "0s"
    return formatTime((boostReq()-data.ord.ordinal)/t2Auto())
}
function updateProgressBar(){
    DOM("progressBar").style.width = getBarPercent() + "%"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%:&nbsp;" + getTimeEstimate().replaceAll(" ","&nbsp;") + "&nbsp;est."
}