import React from 'react';
import "./HeaderDrop.css";
import HeaderDropItem from "./HeaderDropItem";
//import {useUserContext} from "./UserContextProvider";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from "./firebase";

function HeaderDrop() {

    //const {user} = useUserContext();
    const onItemClicked = (e)=>{
        e.preventDefault();
        console.log("!!");
        auth.signOut();
    }

return (
    <div className='headerDrop'>
        {/*profile...은 나중에 하자 
        <HeaderDropItem />*/}
        {/*logout*/} 
        <HeaderDropItem 
            txt="Sign Out"
            leftIcon={
                <IconButton>
                    <ExitToAppIcon />
                </IconButton>
            }
            action={onItemClicked}
        />
    </div>
)
}

export default HeaderDrop;
