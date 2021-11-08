import React, { useContext, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsContext from "../context/SettingsContext";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";

export enum Mode {
	WORK = "work",
	BREAK = "break",
}

const Timer: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);

	const [isPaused, setIsPaused] = useState(true);
	const [mode, setMode] = useState<Mode>(Mode.WORK);
	const [secondsLeft, setSecondsLeft] = useState(0);

	const isPausedRef = useRef(isPaused);

	const totalSeconds =
		mode === Mode.WORK
			? settingsInfo.workMinutes * 60
			: settingsInfo.breakMinutes * 60;
	const percentage = Math.round((secondsLeft / totalSeconds) * 100);

	let minutes: number | string = Math.floor(secondsLeft / 60);
	let seconds: number | string = secondsLeft % 60;
	if (minutes < 10) minutes = `0${minutes}`;
	if (seconds < 10) seconds = `0${seconds}`;

	return (
		<div>
			<h1>Timer</h1>
			<CircularProgressbar
				value={percentage}
				text={`${minutes}:${seconds}`}
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
