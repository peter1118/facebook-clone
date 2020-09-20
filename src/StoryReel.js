import React from 'react';
import "./StoryReel.css";
import Story from './Story';

function StoryReel() {
return (
	<div className='storyReel'>
		<Story image="./img1.png" profileSrc={require("./avatar1.png")} title='ava1' />
		<Story image={require("./logo.png")} profileSrc={require("./avatar3.png")} title='ava2' />
		<Story image={require("./logo.png")} profileSrc={require("./avatar4.png")} title='ava3' />
		<Story image={require("./logo.png")} profileSrc={require("./avatar5.png")} title='ava4' />
	</div>
)
}

export default StoryReel
