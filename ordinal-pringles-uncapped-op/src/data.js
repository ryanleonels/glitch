const D = x => new Decimal(x)
//create all the variables in a data object for saving
const VERSION = "0.0.0"
const psiValues = [1, 4, 7625597484987]
const psiLimits = [1, 16, 109]
function getDefaultObject() {
    return {
        nav: {current:"ord", last:"ord"},
        ord: {ordinal:D(0), over:D(0), base:10, trim: 5, isPsi: false},
        markup: {powers:D(0), shifts:0},
        factors: Array(7).fill(D(0)),
        dy: {level:1, gain:0, cap:40},
        autoLevels: Array(2).fill(D(0)),
        sToggles: Array(1).fill(true),
        lastTick: 0,
        achs: [],
        gword: false,
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    try{ window.localStorage.setItem('ordinalPRINGLESsaveUOP', JSON.stringify(data)) }
    catch (e) {
        createAlert('Error', `Save failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('ordinalPRINGLESsaveUOP'))
    if (savedata !== undefined) fixSave(data, savedata)
    fixOldSaves()
    createAlert('Welcome Back!', `You've loaded into Ordinal PRINGLES v${VERSION}\nEnjoy!`, 'Thanks!')
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    data.ord.ordinal = D(data.ord.ordinal)
    data.ord.over = D(data.ord.over)
    data.markup.powers = D(data.markup.powers)
    for (let i = 0; i < 7; i++) data.factors[i] = D(data.factors[i])
    for (let i = 0; i < 2; i++) data.autoLevels[i] = D(data.autoLevels[i])
    if(data.markup.shifts >= 7) DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    if(data.markup.shifts >= 7 && data.dy.level === 1){
        data.dy.level = 4
        data.dy.gain = 0.002
    }
    if(data.dy.level > data.dy.cap) data.dy.level = data.dy.cap
    if(data.ord.isPsi && data.ord.ordinal.gte(psiLimits[data.ord.base - 1])) data.ord.ordinal = D(psiLimits[data.ord.base - 1])
}
function exportSave(){
    try {
        save()
        let exportedData = btoa(JSON.stringify(data))
        const exportedDataText = document.createElement("textarea");
        exportedDataText.value = exportedData;
        document.body.appendChild(exportedDataText);
        exportedDataText.select();
        exportedDataText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(exportedDataText);
        createAlert('Export Successful', 'Your Data has been copied to the clipboard!', 'Thanks!')
    }
    catch (e){
        createAlert('Error', `Save export failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
async function downloadSave() {
    try {
        const file = new Blob([btoa(JSON.stringify(data))], {type: "text/plain"});
        window.URL = window.URL || window.webkitURL;
        const a = document.createElement("a")
        let date = new Date()
        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
        a.href = window.URL.createObjectURL(file)
        a.download = `Ordinal-Pringles-save-${VERSION}-${date}.txt`
        a.click()
        createAlert("Success!", 'Your save has been successfully downloaded!', 'Thanks!');
    } catch (e) {
        createAlert('Error', `Save download failed.\n${e}`, 'Dang.');
        console.error(e);
        closeModal(1)
    }
}
function importSave(x) {
    if(x === "gwa") return data.gword = true
    if(x === "ungwa") return data.gword = false
    try {
        if(x.length <= 0) {
            DOM('promptContainer').style.display = 'none'
            createAlert('Failure', 'No data found.', `Oops.`)
            return
        }
        data = Object.assign(getDefaultObject(), JSON.parse(atob(x)))
        save()
        location.reload()
    }
    catch (e){
        createAlert('Error', `Save import failed.\n${e}`, 'Dang.');
        console.error(e);
    }
}
window.setInterval(function(){
    save()
}, 10000);
//full reset
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem('ordinalPRINGLESsaveUOP')
    location.reload()
}
