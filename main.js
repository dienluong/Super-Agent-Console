/* eslint-env webextensions */
const MAX_WORKLOG_SIZE = 32000; // This is from error in Agent Console: "Work Log length cannot exceed 32000 characters (32000)"
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

/*function refreshRemainingChar(target, startSize) {
	let extraSize = target.textLength || 0;
	console.log(extraSize);
	let newSize = extraSize + startSize;
	document.getElementById(REMAINING_CHAR_BOX_ID).textContent = MAX_WORKLOG_SIZE - newSize;
}
*/

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

	// Prepopulate some fields for less annoying process of closing a ticket
	document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProjStatus").querySelector('option[value="0"]').selected = false;
	document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProjStatus").querySelector('option[value="61"]').selected = true;
	document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProblemArea").querySelector('option[value="0"]').selected = false;
	document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProblemArea").querySelector('option[value="207"]').selected = true;
	document.getElementById("TextBox_AddTo_Resolution").value=".";
}

app();

