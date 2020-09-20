import React from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import StoryReel from "./StoryReel.js";

function App() {
  return (
    <div className="app">
	  <Header />

	  <div className="app__body">
		<Sidebar />
		<StoryReel />
	  </div>

    </div>
  );
}

export default App;
