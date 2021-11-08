import React, { useContext, useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsContext from "../context/SettingsContext";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import breakAlarm from "../assets/break-alarm.mp3";
import workAlarm from "../assets/work-alarm.mp3";

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
	const modeRef = useRef(mode);
	const secondsLeftRef = useRef(secondsLeft);

	const [playBreakAlarm] = useSound(breakAlarm);
	const [playWorkAlarm] = useSound(workAlarm);

	const countdownSeconds = () => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	};

	useEffect(() => {
		const switchMode = () => {
			const nextMode = modeRef.current === Mode.WORK ? Mode.BREAK : Mode.WORK;
			const nextSeconds =
				(nextMode === Mode.WORK
					? settingsInfo.workMinutes
					: settingsInfo.breakMinutes) * 60;

			setMode(nextMode);
			modeRef.current = nextMode;

			setSecondsLeft(nextSeconds);
			secondsLeftRef.current = nextSeconds;
		};

		// Initialize timer
		secondsLeftRef.current = settingsInfo.workMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval = setInterval(() => {
			if (isPausedRef.current) {
				return;
			}
			if (secondsLeftRef.current === 0) {
				modeRef.current === Mode.WORK ? playBreakAlarm() : playWorkAlarm();
				return switchMode();
			}
			countdownSeconds();
		}, 1000);

		return () => clearInterval(interval);
	}, [settingsInfo, playBreakAlarm, playWorkAlarm]);

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
					pathColor: mode === Mode.WORK ? "red" : "green",
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
