/*
	const variable can't change
	document.getElementById gets a refence to the element in html
*/

const signUpUserName = document.getElementById("sign-up-name");
const signUpEmail = document.getElementById("sign-up-email");
const signUpPassword = document.getElementById("sign-up-password");
const signUpButton = document.getElementById("sign-up-button");
const signUpMessage = document.getElementById("sign-up-message");

/*
	event listener 
	listening user input, mouse clicks or keyboard presses
	onclick captures a click event
*/

signUpButton.onclick = function() {
	fb.create(signUpUserName.value, signUpEmail.value, signUpPassword.value);

};

function onError(onErrorMessage) {
	signUpMessage.textContent = onErrorMessage;
}
