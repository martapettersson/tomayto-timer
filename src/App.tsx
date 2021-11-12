import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./context/SettingsContext";

export type Cycle = {
	cycleNumber: number;
	workMinutes: number;
	breakMinutes: number;
	workTitle?: string;
	breakitle?: string;
};

const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	const [allWorkMinutes, setAllWorkMinutes] = useState(25);
	const [allBreakMinutes, setAllBreakMinutes] = useState(5);
	const [allWorkTitles, setAllWorkTitles] = useState<null | string>(null);
	const [allBreakTitles, setAllBreakTitles] = useState<null | string>(null);
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
	const volumeRef = useRef(volume);
	const allWorkTitlesRef = useRef(allWorkTitles);
	const allBreakTitlesRef = useRef(allBreakTitles);

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

		if (!localStorage.getItem("volume")) {
			localStorage.setItem("volume", JSON.stringify(volumeRef.current));
		}

		if (!localStorage.getItem("allWorkTitles")) {
			localStorage.setItem(
				"allWorkTitles",
				JSON.stringify(allWorkTitlesRef.current)
			);
		}
		if (!localStorage.getItem("allBreakTitles")) {
			localStorage.setItem(
				"allBreakTitles",
				JSON.stringify(allBreakTitlesRef.current)
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

		const localVolume = JSON.parse(localStorage.getItem("volume") || "[]");
		setVolume(localVolume);

		const localAllWorkTitles = JSON.parse(
			localStorage.getItem("allWorkTitles") || "[]"
		);
		setAllWorkTitles(localAllWorkTitles);

		const localAllBreakTitles = JSON.parse(
			localStorage.getItem("allBreakTitles") || "[]"
		);
		setAllBreakTitles(localAllBreakTitles);
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
					allWorkTitles,
					setAllWorkTitles,
					allBreakTitles,
					setAllBreakTitles,
				}}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
};

export default App;
