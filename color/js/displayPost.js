// container of all posts
const posts = js.getEl('posts');

function createPost(postData, userInfo, postId) {

	// container of invidual post
	const post = js.createEl('div', 'post');
	
	// posts in reverse chronological order
	posts.insertBefore(post, posts.firstElementChild);

	// add posts in chronological
	//  posts.appendChild(post);
	
	const text = js.createEl('div', 'post-text', postData.text);
	post.appendChild(text);

	// post info
	const postInfo = js.createEl('div', 'post-info');
	post. appendChild(postInfo);

	// author userInfo.displayName
	const author = js.createEl('div', 'post-author', 'userInfo.displayName');
	post. appendChild(author);

	//post date
	const date = js.createEl('div', 'post-date', js.formatDate (postDate.date);
	postInfo. appendChild(date);

	cosole.log(date);
	
}