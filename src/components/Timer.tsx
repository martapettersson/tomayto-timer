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

	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [mode, setMode] = useState<Mode>(Mode.WORK);
	const [cycleNumber, setCycleNumber] = useState<number>(0);
	const [secondsLeft, setSecondsLeft] = useState<number>(0);
	const [countDownDate, setCountDownDate] = useState<number>(0);
	const [distance, setDistance] = useState<number>(0);

	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);
	const cycleNumberRef = useRef(cycleNumber);
	const secondsLeftRef = useRef(secondsLeft);
	const countDownDateRef = useRef(countDownDate);
	const distanceRef = useRef(distance);

	const [playBreakAlarm] = useSound(breakAlarm, {
		volume: volume,
	});
	const [playWorkAlarm] = useSound(workAlarm, {
		volume: volume,
	});
	const [playEndAlarm] = useSound(endAlarm, {
		volume: volume,
	});

	const createNewCountDownDate = () => {
		const newCountDownDate: Date = new Date();
		newCountDownDate.setSeconds(
			newCountDownDate.getSeconds() + secondsLeftRef.current
		);
		const newCountDownDateTime: number = newCountDownDate.getTime();

		countDownDateRef.current = newCountDownDateTime;
		setCountDownDate(newCountDownDateTime);
	};

	const initializeTimer = useCallback(() => {
		const cycleMinutes: number =
			modeRef.current === Mode.WORK
				? cycles[cycleNumberRef.current].workMinutes
				: cycles[cycleNumberRef.current].breakMinutes;

		secondsLeftRef.current = cycleMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);

		createNewCountDownDate();

		distanceRef.current = 0;
		setDistance(distanceRef.current);
	}, [cycles]);

	const pauseTimer = (parameter: boolean) => {
		setIsPaused(parameter);
		isPausedRef.current = parameter;
	};
	const countdownSeconds = () => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
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

		createNewCountDownDate();

		const alarmSound =
			modeRef.current === Mode.WORK ? playBreakAlarm() : playWorkAlarm();
		return alarmSound;
	}, [cycles, playBreakAlarm, playWorkAlarm]);

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

			// Calculate distance between current countDownDate and now
			const now: number = Date.now();
			distanceRef.current = countDownDateRef.current - now;
			setDistance(distanceRef.current);

			const handleSession = (
				currentDistance: number,
				currentMode: Mode,
				cyclesLength: number
			) => {
				// All cycles are done
				if (
					currentDistance < 0 &&
					currentMode === Mode.BREAK &&
					cyclesLength - 1 === cycleNumberRef.current
				) {
					return endOfSession();
				}
				// 1 cycle is done
				if (currentDistance < 0) {
					return switchMode();
				}
			};
			countdownSeconds();
			handleSession(distanceRef.current, modeRef.current, cycles.length);
		}, 1000);

		return () => clearInterval(interval);
	}, [cycles, initializeTimer, switchMode, endOfSession]);

	// Calculate percentage and time for CircularProgressbar
	const totalSeconds: number =
		(mode === Mode.WORK
			? cycles[cycleNumber].workMinutes
			: cycles[cycleNumber].breakMinutes) * 60;

	let percentage: number;
	let minutes: number | string;
	let seconds: number | string;

	// If timer is active calculate percentage and time depending on distance
	if (distance > 0) {
		const distanceInSeconds = Math.floor(
			((distance % (1000 * 60 * 60)) / (1000 * 60)) * 60
		);
		percentage = Math.round((distanceInSeconds / totalSeconds) * 100);
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	} // Else calculate percentage and time depending on secondsLeft
	else {
		percentage = Math.round((secondsLeft / totalSeconds) * 100);
		minutes = Math.floor(secondsLeft / 60);
		seconds = secondsLeft % 60;
	}

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
							createNewCountDownDate();
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
						setCycleNumber(0);
						cycleNumberRef.current = 0;
						setMode(Mode.WORK);
						modeRef.current = Mode.WORK;
						initializeTimer();
					}}
				>
					Reset all
				</button>
			</div>
		</div>
	);
};

export default Timer;
