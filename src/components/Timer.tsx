import React, { useContext, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsContext from "../context/SettingsContext";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";

const Timer: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);

	const [isPaused, setIsPaused] = useState(true);

	const isPausedRef = useRef(isPaused);

	console.log(isPausedRef);

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
				{isPaused ? (
					<PlayButton
						onClick={() => {
							setIsPaused(false);
							isPausedRef.current = false;
						}}
					/>
				) : (
					<PauseButton
						onClick={() => {
							setIsPaused(true);
							isPausedRef.current = true;
						}}
					/>
				)}
			</div>
			<div>
				<SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
			</div>
		</div>
	);
};

export default Timer;
