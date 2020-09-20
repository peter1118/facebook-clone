import React from 'react';
import "./SidebarRow.css";
import { Avatar, IconButton } from "@material-ui/core";
import logo from "./logo.png"

function SidebarRow({src, Icon, title}) {
	return (
		<div className="sidebarRow">
			{src && <Avatar src={src} alt="" />}
			{Icon && <Icon />}
			
			<h4>{title}</h4>


		</div>
	)
}

export default SidebarRow
