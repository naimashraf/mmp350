
const publishText = js.getEl('publish-text');
const publishButton = js.getEl('publish-button');
const postImage = document.getElementById('postImage');
var singleFile = postImage.files[0];


let selectedFile;


publishText.addEventListener('keyup', function(event) {
	if (event.which == 13) {
		publishPost();
	}
});

publishButton.addEventListener('click', publishPost);

function publishPost() {
	selectedFile = postImage.files[0];
	const uid = fb.getUID();
	fb.publishPost(uid, publishText.value);
	publishText.value = ""; // reset textarea

	var x = document.getElementById("preview");
	document.getElementById('postImage').value = null;
	x.parentNode.removeChild(x);

}