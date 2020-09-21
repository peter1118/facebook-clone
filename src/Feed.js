import React from 'react';
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";

function Feed() {
return (
	<div className="feed">
		<StoryReel />
		<MessageSender />		

		<Post profilePic="https://www.flaticon.com/premium-icon/icons/svg/3054/3054163.svg" 
			message='First feed..' timestamp='This is time stamp...' username='peter' 
			image='https://cdn.pixabay.com/photo/2020/09/16/20/30/lighthouse-5577451__480.jpg'/>
		<Post profilePic="https://www.flaticon.com/premium-icon/icons/svg/3054/3054163.svg" 
			message='Second Feed...' timestamp='This is time stamp...' username='peter' />
		<Post />
	</div>
)
}

export default Feed
