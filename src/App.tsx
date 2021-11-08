import React, { useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";

const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	return <main>{showSettings ? <Settings /> : <Timer />}</main>;
};

export default App;
