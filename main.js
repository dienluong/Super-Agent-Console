/* eslint-env webextensions */
const MAX_WORKLOG_SIZE = 30000;
const TABS_ID = "prj";
const REMAINING_CHAR_BOX = "remaining-char-box";
const WORKLOG_ADD_BOX = "textarea#TextBox_AddTo_WorkLog";
const WORKLOG_BOX = "textarea#Repeater_WorkLog_ctl00_TextBox_Existing_WorkLog";
document.body.style.border = "5px solid green";

function calcLogSize(log) {
	let logElement = document.querySelector(log);
	let logSize = logElement && logElement.textLength;
	//console.log(logSize);
	return logSize;
}

function showRemainingChar(max, size) {
	let remaining = max - size;

	//console.log(remaining);

	let sizeLi = document.createElement("li");
	let sizeSpan = document.createElement("span");
	let sizeText = document.createTextNode(remaining);

	sizeLi.setAttribute("style", "display: inline;");
	sizeLi.setAttribute("id", REMAINING_CHAR_BOX);
	sizeSpan.setAttribute("style", "color: black;");
	sizeLi.appendChild(sizeSpan);
	sizeSpan.appendChild(sizeText);
	document.getElementById(TABS_ID).appendChild(sizeLi);
}

function app () {
	let workLog = WORKLOG_BOX;
	let workLogSize = calcLogSize(workLog);
	//console.log(workLogSize);
	workLogSize && showRemainingChar(MAX_WORKLOG_SIZE, workLogSize);
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
