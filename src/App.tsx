import React, { useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./context/SettingsContext";

const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	return (
		<main>
			<SettingsContext.Provider
				value={{
					showSettings,
					setShowSettings,
				}}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
};

export default App;
