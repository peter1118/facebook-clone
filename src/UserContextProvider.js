import React, {useState} from 'react';
import { auth } from "./firebase";

const UserContext = React.createContext({
    user: {},
    setUser: () => {}
});

export function useUserContext() {
    return React.useContext(UserContext);
}

export default function UserContextProvider({children}) {
    const [user, setUser] = useState({});
    const value = { user, setUser };
    auth.onAuthStateChanged(function(thisUser) {
        console.log("on auth changed!!! : ");
        if(user && thisUser) {
            console.log("yes user, this user also yes");
            return;
        }
        else if(!user && !thisUser) {
            console.log("no user, this user also no");
            return;
        }
        else {
            console.log("new user");
            console.log(thisUser);
            setUser(thisUser);                
        }

    });
    return (
        <UserContext.Provider value={value}>
                {children}
        </UserContext.Provider>
    )
}
