import React from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import {useUserContext} from "./StateProvider";
import {auth} from "./firebase";

function App() {
    var [state, dispath] = useUserContext();
    const user = auth.currentUser == null ? state : auth.getCurrentUser;
    if (auth.currentUser == null) {
        return (
            <div className="app"> <Login /> </div>
        );
    }
    else {
        return (
            <div className="app"> 
                <Header />
                <div className="app__body">
     	            <Sidebar />
	            <Feed />
	        </div>
            </div>
        );
    }
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
