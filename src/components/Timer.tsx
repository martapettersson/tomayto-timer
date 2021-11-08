import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsContext from "../context/SettingsContext";
import SettingsButton from "./SettingsButton";

const Timer: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);

	return (
		<div>
			<h1>Timer</h1>
			<CircularProgressbar
				value={settingsInfo.workMinutes}
				text={settingsInfo.workMinutes}
				styles={buildStyles({
					textColor: "#000",
					pathColor: "red",
					trailColor: "grey",
				})}
			/>
			<div>
				<SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
			</div>
		</div>
	);
};

export default Timer;
