/* eslint-env webextensions */
/* eslint-env es6 */
const MAX_WORKLOG_SIZE = 32000; // This is from error in Agent Console: "Work Log length cannot exceed 32000 characters (32000)"
const MENU_TABS_ID = "prj";
const REMAINING_CHAR_BOX_ID = "remaining-char-box";
const TEXTAREA_BOX = "div#ticketLogsDiv textarea";
document.body.style.border = "5px solid green";

function calcLogSize(logElement) {
	let logSize = logElement && logElement.textLength;
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

function app () {

	// Prepopulate some fields for less annoying process of closing a ticket
	let projStatus = document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProjStatus");
	if (projStatus.value === "0") {
		projStatus.querySelector('option[value="0"]').selected = false;
		projStatus.querySelector('option[value="61"]').selected = true;
	}

	let problemArea = document.getElementById("Repeater_Ticket_ctl00_DropDownList_ProblemArea");
	if (problemArea.value === "0") {
		problemArea.querySelector('option[value="0"]').selected = false;
		problemArea.querySelector('option[value="207"]').selected = true;
	}

	let textAreas = document.querySelectorAll(TEXTAREA_BOX);
	if (textAreas) {
		let textArea1Size = calcLogSize(textAreas[0]);
		let textAreaAddSize = calcLogSize(textAreas[1]);
		let myCharBox = new RemainingCharBox();
		myCharBox.update(textArea1Size+textAreaAddSize);

		textAreas[0].addEventListener("input", function(evt) {
			myCharBox.update(evt.target.textLength + textAreaAddSize);
		});
	}

}

app();

