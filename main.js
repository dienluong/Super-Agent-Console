/* eslint-env webextensions */
const MAX_WORKLOG_SIZE = 30000;
const MENU_TABS_ID = "prj";
const REMAINING_CHAR_BOX_ID = "remaining-char-box";
const WORKLOG_ADD_BOX = "textarea#TextBox_AddTo_WorkLog";
const WORKLOG_BOX = "textarea#Repeater_WorkLog_ctl00_TextBox_Existing_WorkLog";
document.body.style.border = "5px solid green";

function calcLogSize(logElement) {
	let logSize = logElement && logElement.textLength;
	//console.log(logSize);
	return logSize;
}


class RemainingCharBox {
	constructor() {
		this.sizeLi = document.createElement("li");
		this.sizeSpan = document.createElement("span");
		this.sizeText = document.createTextNode("");

		this.sizeLi.setAttribute("style", "display: inline;");
		this.sizeSpan.setAttribute("id", REMAINING_CHAR_BOX_ID);
		this.sizeSpan.setAttribute("style", "color: black;");
		this.sizeLi.appendChild(this.sizeSpan);
		this.sizeSpan.appendChild(this.sizeText);
		document.getElementById(MENU_TABS_ID).appendChild(this.sizeLi);
	}

	update(currentSize) {
		this.sizeSpan.textContent = MAX_WORKLOG_SIZE - currentSize;
	}

}

function refreshRemainingChar(target, startSize) {
	let extraSize = target.textLength || 0;
	console.log(extraSize);
	let newSize = extraSize + startSize;
	document.getElementById(REMAINING_CHAR_BOX_ID).textContent = MAX_WORKLOG_SIZE - newSize;
}

function app () {
	let workLog = document.querySelector(WORKLOG_BOX);

	if (workLog) {
		let workLogSize = calcLogSize(workLog);
		let workLogAdd = document.querySelector(WORKLOG_ADD_BOX);
		let workLogAddSize = calcLogSize(workLogAdd);
		let myCharBox = new RemainingCharBox();
		myCharBox.update(workLogSize+workLogAddSize);

		// refreshRemainingChar(sizeSpan, currentSize);

		workLogAdd.addEventListener("input", function(evt) {
			myCharBox.update(evt.target.textLength + workLogSize);
		});
	}
}

app();

/*function refresh() {
	document.location.reload(true);
	var lTicketNodes = document.querySelectorAll("tr.level0, tr.level1, tr.level2, tr.level3");
	var lTicketArray = [];
	for (var i = 0; i < lTicketNodes.length; i++) {
		var lTds = lTicketNodes[i].getElementsByTagName("td");
		lTicketArray.push(
			{
				Id: lTds[0].textContent,
				Status: lTds[1].textContent,
				Severity: lTds[2].textContent,
				Owner: lTds[3].textContent,
				Customer: lTds[4].textContent,
				Description: lTds[5].textContent,
				InDate: lTds[6].textContent,
				Product: lTds[7].textContent,
				Elapsed: lTds[8].textContent
			});
	}
	if (lTicketArray.length > 0) {
		chrome.runtime.sendMessage(lTicketArray);
	}
}
*/

// window.setInterval(refresh, 10000);
