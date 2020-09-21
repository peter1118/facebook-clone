import React from 'react';
import "./StoryReel.css";
import Story from './Story';
import img1 from './img1.png';

function StoryReel() {
return (
	<div className='storyReel'>
		<Story image='img1.png' profileSrc={require("./avatar1.png")} title='ava1' />
		<Story image='img2.png' profileSrc={require("./avatar3.png")} title='ava2' />
		<Story image='img3.png' profileSrc={require("./avatar4.png")} title='ava3' />
		<Story image='img4.png' profileSrc={require("./avatar5.png")} title='ava4' />
	</div>
)
}

export default StoryReel
