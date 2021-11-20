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
import breakAlarm from "../assets/break-alarm.mp3";
import workAlarm from "../assets/work-alarm.mp3";
import endAlarm from "../assets/end-alarm.mp3";

export enum Mode {
	WORK = "work",
	BREAK = "break",
}

const Timer: React.FC = () => {
	const { customWorkTitle, customBreakTitle, volume, cycles } =
		useContext(SettingsContext);

	const [isPaused, setIsPaused] = useState(true);
	const [mode, setMode] = useState<Mode>(Mode.WORK);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [cycleNumber, setCycleNumber] = useState(0);

	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);
	const secondsLeftRef = useRef(secondsLeft);
	const cycleNumberRef = useRef(cycleNumber);

	const [playBreakAlarm] = useSound(breakAlarm, {
		volume: volume,
	});
	const [playWorkAlarm] = useSound(workAlarm, {
		volume: volume,
	});
	const [playEndAlarm] = useSound(endAlarm, {
		volume: volume,
	});

	const initializeTimer = useCallback(() => {
		secondsLeftRef.current = cycles[cycleNumberRef.current].workMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);
	}, [cycles]);

	const countdownSeconds = () => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	};

	const pauseTimer = (parameter: boolean) => {
		setIsPaused(parameter);
		isPausedRef.current = parameter;
	};

	const switchMode = useCallback(() => {
		// +1 cycleNumber after break since 1 cycle is done
		if (modeRef.current === Mode.BREAK) {
			const nextCycle = cycleNumberRef.current + 1;
			setCycleNumber(nextCycle);
			cycleNumberRef.current = nextCycle;
		}

		const nextMode = modeRef.current === Mode.WORK ? Mode.BREAK : Mode.WORK;

		const nextSeconds =
			(nextMode === Mode.WORK
				? cycles[cycleNumberRef.current].workMinutes
				: cycles[cycleNumberRef.current].breakMinutes) * 60;

		setMode(nextMode);
		modeRef.current = nextMode;

		setSecondsLeft(nextSeconds);
		secondsLeftRef.current = nextSeconds;
	}, [cycles]);

	const endOfSession = useCallback(() => {
		pauseTimer(true);

		setCycleNumber(0);
		cycleNumberRef.current = 0;

		setMode(Mode.WORK);
		modeRef.current = Mode.WORK;

		initializeTimer();

		return playEndAlarm();
	}, [initializeTimer, playEndAlarm]);

	useEffect(() => {
		initializeTimer();

		const interval = setInterval(() => {
			// Timer paused
			if (isPausedRef.current) {
				return;
			}

			// All cycles are done
			if (
				cycleNumberRef.current === cycles.length - 1 &&
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
		}, 1000);

		return () => clearInterval(interval);
	}, [
		cycles,
		initializeTimer,
		playBreakAlarm,
		playWorkAlarm,
		switchMode,
		endOfSession,
	]);

	// Calculate percentage
	const totalSeconds: number =
		mode === Mode.WORK
			? cycles[cycleNumber].workMinutes * 60
			: cycles[cycleNumber].breakMinutes * 60;
	const percentage: number = Math.round((secondsLeft / totalSeconds) * 100);

	// Calculate time
	let minutes: number | string = Math.floor(secondsLeft / 60);
	let seconds: number | string = secondsLeft % 60;
	if (minutes < 10) minutes = `0${minutes}`;
	if (seconds < 10) seconds = `0${seconds}`;

	return (
		<div className="timerContainer">
			<div className="timerTextContainer">
				{mode === Mode.WORK ? (
					<h2>{customWorkTitle ? customWorkTitle.toLowerCase() : mode}</h2>
				) : (
					<h2>{customBreakTitle ? customBreakTitle.toLowerCase() : mode}</h2>
				)}
				<h3>
					Cycle {cycleNumber + 1}/{cycles.length}
				</h3>
			</div>
			<div className="timerClockContainer">
				<CircularProgressbar
					value={percentage}
					text={`${minutes}:${seconds}`}
					strokeWidth={2}
					styles={buildStyles({
						textColor: "var(--primary)",
						pathColor: mode === Mode.WORK ? "var(--red)" : "var(--green)",
						trailColor: "var(--secondary)",
					})}
				/>
			</div>
			<div className="timerPlayPauseContainer">
				{isPaused ? (
					<PlayButton
						callback={() => {
							pauseTimer(false);
						}}
					/>
				) : (
					<PauseButton
						callback={() => {
							pauseTimer(true);
						}}
					/>
				)}
			</div>
			<div className="timerResetContainer">
				<button
					onClick={() => {
						pauseTimer(true);
						initializeTimer();
					}}
				>
					Reset
				</button>
				<button
					onClick={() => {
						pauseTimer(true);
						initializeTimer();
						setCycleNumber(0);
						cycleNumberRef.current = 0;
						setMode(Mode.WORK);
						modeRef.current = Mode.WORK;
					}}
				>
					Reset all
				</button>
			</div>
		</div>
	);
};

export default Timer;
