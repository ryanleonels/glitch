// Made by Reinhardt, and if dev isn't him, not them either
// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('lngi-inc-hyper', btoa(JSON.stringify(game)));
}

// Clear the save file
function wipe() {
	if (confirm('Do you really want to wipe this save?')) {
		let bestTime = game.bestTime ? game.bestTime : 0;
		game = new Game();
		if (bestTime) game.bestTime = bestTime;
     	interval = Infinity;
     	return true;
	}
	return false;
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('lngi-inc-hyper') != undefined && localStorage.getItem('lngi-inc-hyper') != 'undefined' && localStorage.getItem('lngi-inc-hyper') != null) {
		try {
			game = JSON.parse(atob(localStorage.getItem('lngi-inc-hyper')));
		} catch(e) {
			console.warn('Outdated save, updating');
			game = JSON.parse(localStorage.getItem('lngi-inc-hyper'));
		}
		save();
		return true;
	} else {
		return false;
	}
}

function exportGame(viaFile = false) {
	if (viaFile) {
	    save();
	    let file = new Blob([btoa(JSON.stringify(game))], {type: "text/plain"});
	    window.URL = window.URL || window.webkitURL;;
	    let a = document.createElement("a");
	    a.href = window.URL.createObjectURL(file);
	    a.download = "LNGI Incremental Save.txt";
	    a.click();
	    alert("File Export Successful!");
  	} else {
    	exportToClipboard(btoa(JSON.stringify(game)));
  	}
}

function exportToClipboard(str) {
	var el = document.createElement("textarea");
	el.value = str;
	el.setAttribute("readonly", "");
	el.style = {
		position: "absolute",
		left: "-9999px"
	};
	document.body.appendChild(el);
	copyToClipboard(el);
	document.body.removeChild(el);
	alert("Copied to clipboard!");
}

function copyToClipboard(el) {
	el = typeof el === "string" ? document.querySelector(el) : el;
	if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
		var editable = el.contentEditable;
		var readOnly = el.readOnly;
		el.contentEditable = true;
		el.readOnly = true;
		var range = document.createRange();
		range.selectNodeContents(el);
		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		el.setSelectionRange(0, 999999);
		el.contentEditable = editable;
		el.readOnly = readOnly;
	} else {
		el.select();
	}
	document.execCommand("copy");
}

function importGame(viaFile = false) {
	if (viaFile) {
	    let loadgame = "";
	    let reader = new FileReader();
	    reader.readAsText(document.getElementById("saveFile").files[0]);
	    window.setTimeout(function() {
      		loadgame = JSON.parse(atob(reader.result));
      		if (loadgame !== "") {
		    	game = loadgame;
		    	alert("Import Successful!");
		    	window.setTimeout(() => {
					save()
					window.location.reload()
				}, 200);
		    }
	    }, 100);
 	} else {
		let loadgame = "";
		loadgame = JSON.parse(atob(prompt("Paste in your game save - WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
		if (loadgame !== "") {
			game = loadgame;
			alert("Import Successful!");
			window.setTimeout(() => {
				save()
				window.location.reload()
			}, 200);
		}
	}
}
