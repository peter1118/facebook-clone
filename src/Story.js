import React from 'react';
import "./Story.css";
import { Avatar } from "@material-ui/core";

function Story({ image, profileSrc, title }) {

return (
	<div style={{backgroundImage: 'url(' + require('./img1.png') + ')'}} className='story'>
		<Avatar className="story__avatar" src={profileSrc} />
		<h4>{title}</h4>
	</div>
)
}

export default Story;
