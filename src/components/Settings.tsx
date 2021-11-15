import React, { useContext, useState } from "react";
import SettingsContext from "../context/SettingsContext";
import BackButton from "./BackButton";
import SetCycleMinutes from "./SetCycleMinutes";
import SetNumberOfCycles from "./SetNumberOfCycles";
import SetAllCycleMinutes from "./SetAllCycleMinutes";
import SetVolume from "./SetVolume";
import SetIntervalTitles from "./SetIntervalTitles";
import SetColorTheme from "./SetColorTheme";
import type { Cycle } from "../context/SettingsContext";
import { Pomodoro } from "../App";

const Settings: React.FC = () => {
	const {
		cycles,
		setShowSettings,
		setCycles,
		setVolume,
		setAllWorkMinutes,
		setAllBreakMinutes,
		setCustomWorkTitle,
		setCustomBreakTitle,
		setColorTheme,
	} = useContext(SettingsContext);

	const [numberOfCycles, setNumberOfCycles] = useState(cycles.length);

	const reset = () => {
		setCycles(Pomodoro);
		setVolume(0.5);
		setAllWorkMinutes(25);
		setAllBreakMinutes(5);
		setNumberOfCycles(Pomodoro.length);
		setCustomWorkTitle("");
		setCustomBreakTitle("");
		setColorTheme("purpleDream");
		localStorage.clear();
	};

	return (
		<div>
			<h1>Settings</h1>
			<button onClick={reset}>Reset</button>
			<SetColorTheme />
			<SetVolume />
			<SetNumberOfCycles
				numberOfCycles={numberOfCycles}
				setNumberOfCycles={setNumberOfCycles}
			/>
			<SetAllCycleMinutes />
			<SetIntervalTitles />
			{cycles.map((cycle: Cycle) => {
				return (
					<SetCycleMinutes
						key={cycle.cycleNumber}
						cycleNumber={cycle.cycleNumber}
					/>
				);
			})}
			<BackButton callback={() => setShowSettings(false)} />
		</div>
	);
};

export default Settings;
