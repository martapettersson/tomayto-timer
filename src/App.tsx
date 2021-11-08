import React, { useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./context/SettingsContext";

const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	const [workMinutes, setWorkMinutes] = useState(45);
	const [breakMinutes, setBreakMinutes] = useState(15);
	return (
		<main>
			<SettingsContext.Provider
				value={{
					showSettings,
					setShowSettings,
					workMinutes,
					setWorkMinutes,
					breakMinutes,
					setBreakMinutes,
				}}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
};

export default App;
