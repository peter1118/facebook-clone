import React, {useEffect} from 'react';
import { initUser, auth } from "./firebase";

const UserContext = React.createContext();
//const UserUpdateContext = React.createContext();

export function useUserContext() {
    return React.useContext(UserContext);
}
/*
export function useUserUpdateContext() {
    return React.useContext(UserUpdateContext);
}
*/

export default function UserContextProvider({children}) {
    const [user, setUser] = React.useState({});
    var isChecked = false;

    function updateUser(updateUser) {
        console.log("in updateUser!");
        //console.log(updateUser);
        isChecked = true;
        setUser(updateUser);
        console.log(isChecked);
        console.log("after update!");
        //console.log(user);
    }
    auth.onAuthStateChanged(function(user) {
        console.log("on auth changed..");
        if(isChecked) {
            console.log("true...");
            return;
        }
        if(user) {
            console.log("on auth changed...yes user");
            updateUser(user);                
        }
        else {
            console.log("on auth changed...no user");
        }
    });
    console.log("provider!");
    return (
        <UserContext.Provider value={user}>
                {children}
        </UserContext.Provider>
    )
}

