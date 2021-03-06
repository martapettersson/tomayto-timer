import React, { useContext, useState } from "react";
import SettingsContext from "../context/SettingsContext";
import SetCycleMinutes from "./SetCycleMinutes";
import SetNumberOfCycles from "./SetNumberOfCycles";
import SetAllCycleMinutes from "./SetAllCycleMinutes";
import SetVolume from "./SetVolume";
import SetIntervalTitles from "./SetIntervalTitles";
import SetColorTheme from "./SetColorTheme";
import type { Cycle } from "../context/SettingsContext";

const Settings: React.FC = () => {
	const {
		cycles,
		setCycles,
		setVolume,
		setAllWorkMinutes,
		setAllBreakMinutes,
		setCustomWorkTitle,
		setCustomBreakTitle,
		setColorTheme,
	} = useContext(SettingsContext);

	const [numberOfCycles, setNumberOfCycles] = useState<number>(cycles.length);

	const resetSettings = () => {
		setCycles([
			{ cycleNumber: 0, workMinutes: 25, breakMinutes: 5 },
			{ cycleNumber: 1, workMinutes: 25, breakMinutes: 5 },
			{ cycleNumber: 2, workMinutes: 25, breakMinutes: 5 },
			{ cycleNumber: 3, workMinutes: 25, breakMinutes: 20 },
		]);
		setVolume(0.5);
		setAllWorkMinutes(25);
		setAllBreakMinutes(5);
		setNumberOfCycles(4);
		setCustomWorkTitle("");
		setCustomBreakTitle("");
		setColorTheme("purpleDream");
		localStorage.clear();
	};

	return (
		<div className="settingsContainer">
			<h1>Settings</h1>
			<button onClick={resetSettings}>Reset all</button>
			<SetColorTheme />
			<SetVolume />
			<SetNumberOfCycles
				numberOfCycles={numberOfCycles}
				setNumberOfCycles={setNumberOfCycles}
			/>
			<SetIntervalTitles />
			<SetAllCycleMinutes />
			{cycles.map((cycle: Cycle) => {
				return (
					<SetCycleMinutes
						key={cycle.cycleNumber}
						cycleNumber={cycle.cycleNumber}
					/>
				);
			})}
		</div>
	);
};

export default Settings;
