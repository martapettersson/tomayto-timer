import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import BackButton from "./BackButton";
import SetCycleMinutes from "./SetCycleMinutes";
import SetNumberOfCycles from "./SetNumberOfCycles";
import SetAllCycleMinutes from "./SetAllCycleMinutes";
import SetVolume from "./SetVolume";

const Settings: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);

	return (
		<div>
			<h1>Settings</h1>
			<SetNumberOfCycles />
			<SetAllCycleMinutes />
			<SetVolume />
			{settingsInfo.cycles.map((cycle: any) => {
				return (
					<SetCycleMinutes
						key={cycle.cycleNumber}
						cycleNumber={cycle.cycleNumber}
					/>
				);
			})}
			<BackButton onClick={() => settingsInfo.setShowSettings(false)} />
		</div>
	);
};

export default Settings;
