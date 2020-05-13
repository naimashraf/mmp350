  
/* firebase helper functions for mmp350 */

const fb = {}; // firebase helpers

/* creates a user */
fb.create = function(userName, email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(credential => {
			const ref = firebase.database().ref('users').child(credential.user.uid)
				.update({ displayName: userName })
				.then(() => { location.href = 'index.html '});
		})
		.catch(error => { fb.onError(error.message); });
};

/* logs into firebase, calls onError if there's an error */
fb.login = function(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => { console.log('success'); })
		.catch(error => { fb.onError(error.message); });
};

/* logs out of firebase */
fb.logout = function() {
	firebase.auth().signOut();
};

fb.onError = function(message) {
	if (typeof onError === 'function') onError(message);
};

fb.getUsers = function(userCallback, callback) {
	let count = 0;
	const users = {};
	firebase.database().ref('users').on('child_added', user => {
		users[user.key] = user.val();
		count += 1;
		if (userCallback) userCallback(user.key, user.val().displayName, user.val().bio, user.val().imageURL);
	});

	firebase.database().ref('users').once('value', snapshot => {
		if (count === snapshot.numChildren()) {
			if (callback) callback(users);
		}
	});
};

fb.loadPosts = function() {
	fb.getUsers(undefined, users => {
		firebase.database().ref('posts')
			.on('child_added', post => {
				createPost(post.val(), users[post.val().uid], post.key);
			});
	});
};

fb.loadPost = function(id) {
	firebase.database().ref('posts').child(id).on('value', post => {
		firebase.database().ref('users').child(post.val().uid).on('value', user => {
			createPost(post.val(), user.val(), id); 
		});
	});
};

fb.getUserProfile = function(uid) {
	firebase.database().ref('users').child(uid).on('value', user => {
		if (typeof displayProfile === "function") 
			displayProfile(user.val().displayName, user.val());
	});
};

fb.updateProfile = function(uid, key, value) {
	const info = {};
	info[key] = value;
	firebase.database().ref('users').child(uid).update(info);
};

fb.uploadImage = function(file, uid) {
	if (file) {
		firebase.storage().ref('users').child(uid).child('profile-image')
			.put(file)
			.then(image => { return image.ref.getDownloadURL(); })
			.then(url => {
				firebase.database().ref('users').child(uid)
					.update({ imageURL: url });
			});
	}
};


/* Image Upload */

var imageURL;
function uploadPreview () {

	imageURL = document.getElementById('postImage').files[0];
	const filePath = 'post_image' + '/' + new Date().getTime().toString(); 
		var storageRef = storage.ref();
		const file = imageURL;
		const name = (+new Date()) + '-' + file.name;
		const metadata = {
		  	contentType: file.type
		};

	 /* Start */
	var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
	uploadTask.on('state_changed', 
	  function(snapshot) {
	    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    document.getElementById('uploadProgress').innerHTML = progress;
	    
	  }, function(error) {
	  		console.log(error, 'error');
	 
	}, function() {
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

		imageURL = downloadURL;
		  
		  console.log(imageURL, '126');
		  
	  	var x = document.getElementById("preview");
	  	var img = document.createElement("IMG");
	  	img.setAttribute('src', imageURL);
	  	img.setAttribute("width", "100");
	  	x.appendChild(img);
	  	
	  });
	});

}


/* End */

fb.publishPost = function(uid, text) {

	if (imageURL) {
				const post = {
						uid: uid,
						date: Date.now(),
						text: text,
						imageURL: imageURL
					}

			firebase.database().ref('posts').push(post);
		}

	const tags = text.match(/#[a-z0-9]+/gi);
	if (tags) {
		post.tags = {};
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i].replace('#', '');
			post.tags[tag] = true;
		}
	}

};

fb.getUID = function() {
	return firebase.auth().currentUser.uid;
};

fb.getTag = function(tag) {
	fb.getUsers(undefined, users => {
		firebase.database().ref('posts').orderByChild('tags/'+tag).equalTo(true)
			.on('child_added', post => {
				createPost(post.val(), users[post.val().uid], post.key);
			});
	});
};

fb.getUserPosts = function(uid) {
	firebase.database().ref('users').child(uid)
		.on('value', user => {
			firebase.database().ref('posts').orderByChild('uid').equalTo(uid)
				.on('child_added', post => {
					createPost(post.val(), user.val(), post.key);  
				});
		});
};


// various firebase 

/* runs to log in the user automatically, calls userLoggedIn or noUser */
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		const userRef = firebase.database().ref('users').child(user.uid);
		userRef.on('value', snapshot => {
			const userInfo = snapshot.val();
			if (typeof userLoggedIn === 'function') 
				userLoggedIn(user.uid, userInfo.displayName, userInfo.imageURL);
			if (typeof profileLoggedIn === 'function') 
				profileLoggedIn(user.uid);
		});	
	} else {
		if (typeof noUser === 'function') noUser();
	}
});

const js = {}; // general js helpers

/* get elements by id */
js.getEl = function(id) {
	return document.getElementById(id);
};

js.createEl = function(tag, _class, text) {
	const element = document.createElement(tag);
	element.classList.add(_class);
	element.textContent = text;
	return element;
};

js.formatDate = function(date) {
	const d = new Date(date);
	return (d.getMonth() + 1) + "." +  d.getDate() + "." + d.getFullYear();
};