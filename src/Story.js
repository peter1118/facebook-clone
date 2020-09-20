import React from 'react';
import "./Story.css";
import { Avatar, IconButton } from "@material-ui/core";

function Story({ image, profileSrc, title }) {
	//const bg = require('./img1.png');
	const bg = require(''+{image});
return (
	<div style={{ backgroundImage: 'url('+bg+')' }} className='story'>
		<Avatar src={profileSrc} />
		<h4>{title}</h4>
	</div>
)
}

export default Story;
