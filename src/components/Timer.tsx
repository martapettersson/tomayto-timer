import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import SettingsButton from "./SettingsButton";

const Timer: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);

	return (
		<div>
			<h1>Timer</h1>
			<div>
				<SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
			</div>
		</div>
	);
};

export default Timer;
