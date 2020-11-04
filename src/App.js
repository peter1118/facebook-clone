import React from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import {useUserContext} from "./UserContextProvider";

function App() {
    const {user} = useUserContext();
    console.log("?? in App.js ,, user ? ");
    console.log({user});
    //if (auth.currentUser == null) {
    /*
    if (isAuthChecking)  {
        return (
            <>
                <h1> Loading.. </h1>
            </>
        )
    }
    */

    if (user == null) {
        return (
            <div className="app"> <Login /> </div>
        );
    }
    return (
        <div className="app"> 
            <Header />
            <div className="app__body">
                <Sidebar />
                <Feed />
            </div>
        </div>
    );
    /*
  return (
    <div className="app">
        {!user.user ? (<Login />) : ( 
            <>
                <Header />
                <div className="app__body">
     	            <Sidebar />
	            <Feed />
	        </div>
	    </>
        )}		
    </div>
  );
  */
}

export default App;
