function enableStylesheet(stylesheet) {
	stylesheet.disabled = false;
}

function disableStylesheet(stylesheet) {
	stylesheet.disabled = true;
}

function toggleStylesheet(stylesheet) {
	if(stylesheet.disabled) {
		stylesheet.disabled = false;
	}
	else {
		stylesheet.disabled = true;
	}
}
