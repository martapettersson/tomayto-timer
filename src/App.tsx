import React, { useEffect, useRef, useState } from "react";
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
	const [allWorkMinutes, setAllWorkMinutes] = useState(25);
	const [allBreakMinutes, setAllBreakMinutes] = useState(5);
	const [volume, setVolume] = useState(0.5);

	// Classic Pomodoro as default settings
	const [cycles, setCycles] = useState<Cycle[]>([
		{ cycleNumber: 0, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 1, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 2, workMinutes: 25, breakMinutes: 5 },
		{ cycleNumber: 3, workMinutes: 25, breakMinutes: 20 },
	]);

	const cyclesRef = useRef(cycles);
	const allWorkMinutesRef = useRef(allWorkMinutes);
	const allBreakMinutesRef = useRef(allBreakMinutes);

	useEffect(() => {
		if (!localStorage.getItem("cycles")) {
			localStorage.setItem("cycles", JSON.stringify(cyclesRef.current));
		}
		if (!localStorage.getItem("allWorkMinutes")) {
			localStorage.setItem(
				"allWorkMinutes",
				JSON.stringify(allWorkMinutesRef.current)
			);
		}
		if (!localStorage.getItem("allBreakMinutes")) {
			localStorage.setItem(
				"allBreakMinutes",
				JSON.stringify(allBreakMinutesRef.current)
			);
		}
		const localCycles = JSON.parse(localStorage.getItem("cycles") || "[]");
		setCycles(localCycles);

		const localAllWorkMinutes = JSON.parse(
			localStorage.getItem("allWorkMinutes") || "[]"
		);
		setAllWorkMinutes(localAllWorkMinutes);

		const localAllBreakMinutes = JSON.parse(
			localStorage.getItem("allBreakMinutes") || "[]"
		);
		setAllBreakMinutes(localAllBreakMinutes);
	}, []);

	return (
		<main>
			<SettingsContext.Provider
				value={{
					showSettings,
					setShowSettings,
					cycles,
					setCycles,
					allWorkMinutes,
					setAllWorkMinutes,
					allBreakMinutes,
					setAllBreakMinutes,
					volume,
					setVolume,
				}}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
};

export default App;
