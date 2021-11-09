import React, { useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./context/SettingsContext";

export type Cycle = {
	cycleNumber: number;
	workMinutes: number;
	breakMinutes: number;
};

const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	const [cycles, setCycles] = useState<Cycle[]>([
		{ cycleNumber: 0, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 1, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 2, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 3, workMinutes: 25, breakMinutes: 20 },
	]);

	return (
		<main>
			<SettingsContext.Provider
				value={{
					showSettings,
					setShowSettings,
					cycles,
					setCycles,
				}}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
};

export default App;
