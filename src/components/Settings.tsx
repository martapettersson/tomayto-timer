import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import BackButton from "./BackButton";

const Settings: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	return (
		<div>
			<h1>Settings</h1>
			<BackButton onClick={() => settingsInfo.setShowSettings(false)} />
		</div>
	);
};

export default Settings;
