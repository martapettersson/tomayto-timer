import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";
import { Mode } from "./Timer";

type Props = {
	cycleNumber: number;
};

const SetCycleMinutes: React.FC<Props> = ({ cycleNumber }) => {
	const settingsInfo: any = useContext(SettingsContext);
	const cycle = settingsInfo.cycles[cycleNumber];
	const customWorkTitle = settingsInfo.customWorkTitle;
	const customBreakTitle = settingsInfo.customBreakTitle;

	const updateCycleMinutes =
		(cycleNumber: number, mode: Mode) => (value: number) => {
			const newCycleValue =
				mode === Mode.WORK
					? {
							cycleNumber,
							workMinutes: value,
							breakMinutes: cycle.breakMinutes,
					  }
					: {
							cycleNumber,
							workMinutes: cycle.workMinutes,
							breakMinutes: value,
					  };
			let newCyclesArray = [...settingsInfo.cycles];
			newCyclesArray[cycleNumber] = newCycleValue;
			localStorage.setItem("cycles", JSON.stringify(newCyclesArray));
			settingsInfo.setCycles(newCyclesArray);
		};

	return (
		<div>
			<h2>Cycle: {cycleNumber + 1}</h2>
			<label>
				{customWorkTitle ? customWorkTitle : "Work"}:{" "}
				{cycle.workMinutes < 10 ? `0${cycle.workMinutes}` : cycle.workMinutes}
				:00
			</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={cycle.workMinutes}
				onChange={updateCycleMinutes(cycle.cycleNumber, Mode.WORK)}
				min={1}
				max={120}
			/>
			<label>
				{customBreakTitle ? customBreakTitle : "Break"}:{" "}
				{cycle.breakMinutes < 10
					? `0${cycle.breakMinutes}`
					: cycle.breakMinutes}
				:00
			</label>
			<ReactSlider
				className="slider green"
				thumbClassName="thumb"
				trackClassName="track"
				value={cycle.breakMinutes}
				onChange={updateCycleMinutes(cycle.cycleNumber, Mode.BREAK)}
				min={1}
				max={120}
			/>
		</div>
	);
};

export default SetCycleMinutes;
