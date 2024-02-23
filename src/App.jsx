import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Planets from "./components/Planets";


function App() {
	const [selectedComponent, setSelectedComponent] = useState("Main");

	return (
		<>
			<nav>
				<button className="button" onClick={() => setSelectedComponent("Main")}>Main Page</button>
				<button className="button" onClick={() => setSelectedComponent("Planets")}>Planets</button>
				
			</nav>
			<div id="ctn-main">
				{selectedComponent === "Main" && <Main />}
				{selectedComponent === "Planets" && <Planets />}
				
			</div>
		</>
	);
}

export default App;
