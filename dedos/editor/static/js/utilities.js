'use strict'

function fijarTarjeta(input) {
	fix = true
	var parentElement = document.getElementById(input.offsetParent.id)

	document.getElementById(input.id).innerHTML = '<img src="/static/dash/dist/assets/img/pinned.png" width="12px"   />';
	document.getElementById(input.id).style = " margin-left:4px; margin-right:-2px"
	if (parentElement.classList.contains("ui-draggable-disabled")) {
		fix = false
		document.getElementById(input.id).innerHTML = '<img src="/static/dash/dist/assets/img/pinnedout.png" width="12px"   />';
		document.getElementById(input.id).style = " margin-left:2px"
	}
}