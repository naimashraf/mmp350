// get user profile id
const profileUID = location.search.split('=')[1];
fb.getUserProfile(profileUID);

const profileName = js.getEl("profile-display-name");
const profileGender = js.getEl("profile-gender");
const profileZipCode = js.getEl("profile-zipCode");
const profileBio = js.getEl("profile-bio");
const profileLocation = js.getEl("profile-location");
const profileContactNumber = js.getEl("profile-contactNumber");
const profileButton = js.getEl("update-profile");

function displayProfile(userName, userInfo) {
	

	// display the user profile name
	profileName.value = userName;

	// add other other fields

	if (userInfo.gender) {
		profileGender.value = userInfo.gender;
	}

	if (userInfo.zipCode) {
		profileZipCode.value = userInfo.zipCode;
	}

	if (userInfo.bio) {
		profileBio.value = userInfo.bio;
	}

	if (userInfo.location) {
		profileLocation.value = userInfo.location;
	}

	if (userInfo.contactNumber) {
		profileContactNumber.value = userInfo.contactNumber;
	}

}

profileButton.onclick = function() {
	// helper: user id, field name 
	fb.updateProfile(profileUID, 'displayName', profileName.value);
	fb.updateProfile(profileUID, 'gender', profileBio.value);
	fb.updateProfile(profileUID, 'zipCode', profileBio.value);
	fb.updateProfile(profileUID, 'bio', profileBio.value);
	fb.updateProfile(profileUID, 'location', profileBio.value);
	fb.updateProfile(profileUID, 'contactNumber', profileBio.value);
};


function profileLoggedIn(uid) {
	if (uid == profileUID) {
		profileButton.style.display = 'block';
	}
}