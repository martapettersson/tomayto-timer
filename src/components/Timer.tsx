import React, {
	useContext,
	useState,
	useRef,
	useEffect,
	useCallback,
} from "react";
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
	const [cycleNumber, setCycleNumber] = useState(0);

	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);
	const secondsLeftRef = useRef(secondsLeft);
	const cycleNumberRef = useRef(cycleNumber);

	const [playBreakAlarm] = useSound(breakAlarm);
	const [playWorkAlarm] = useSound(workAlarm);

	const countdownSeconds = () => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	};

	const switchMode = useCallback(() => {
		// +1 cycleNumber after break
		if (modeRef.current === Mode.BREAK) {
			const nextCycle = cycleNumberRef.current + 1;
			setCycleNumber(nextCycle);
			cycleNumberRef.current = nextCycle;
		}

		const nextMode = modeRef.current === Mode.WORK ? Mode.BREAK : Mode.WORK;

		const nextSeconds =
			(nextMode === Mode.WORK
				? settingsInfo.cycles[cycleNumberRef.current].workMinutes
				: settingsInfo.cycles[cycleNumberRef.current].breakMinutes) * 60;

		setMode(nextMode);
		modeRef.current = nextMode;

		setSecondsLeft(nextSeconds);
		secondsLeftRef.current = nextSeconds;
	}, [settingsInfo]);

	const endOfSession = useCallback(() => {
		setIsPaused(true);
		isPausedRef.current = true;

		setCycleNumber(0);
		cycleNumberRef.current = 0;

		setMode(Mode.WORK);
		modeRef.current = Mode.WORK;
	}, []);

	useEffect(() => {
		// Initialize timer
		secondsLeftRef.current =
			settingsInfo.cycles[cycleNumberRef.current].workMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval = setInterval(() => {
			// Timer paused
			if (isPausedRef.current) {
				return;
			}

			// All cycles are done
			if (
				cycleNumberRef.current === settingsInfo.cycles.length - 1 &&
				modeRef.current === Mode.BREAK &&
				secondsLeftRef.current === 0
			) {
				endOfSession();
				return () => clearInterval(interval);
			}

			// 1 cycle is done
			if (secondsLeftRef.current === 0) {
				modeRef.current === Mode.WORK ? playBreakAlarm() : playWorkAlarm();
				return switchMode();
			}

			countdownSeconds();
		}, 10);

		return () => clearInterval(interval);
	}, [settingsInfo, playBreakAlarm, playWorkAlarm, switchMode, endOfSession]);

	// Calculate percentage
	const totalSeconds: number =
		mode === Mode.WORK
			? settingsInfo.cycles[cycleNumber].workMinutes * 60
			: settingsInfo.cycles[cycleNumber].breakMinutes * 60;
	const percentage: number = Math.round((secondsLeft / totalSeconds) * 100);

	// Calculate time
	let minutes: number | string = Math.floor(secondsLeft / 60);
	let seconds: number | string = secondsLeft % 60;
	if (minutes < 10) minutes = `0${minutes}`;
	if (seconds < 10) seconds = `0${seconds}`;

	return (
		<div>
			<h1>Timer</h1>
			<h2>{mode}</h2>
			<h3>
				Cycle Number: {cycleNumber + 1}/{settingsInfo.cycles.length}
			</h3>
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
