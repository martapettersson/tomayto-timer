import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";
import { Mode } from "./Timer";
import type { Cycle } from "../context/SettingsContext";

type Props = {
	cycleNumber: number;
};

const SetCycleMinutes: React.FC<Props> = ({ cycleNumber }) => {
	const { cycles, setCycles, customWorkTitle, customBreakTitle } =
		useContext(SettingsContext);
	const cycle = cycles[cycleNumber];

	const updateCycleMinutes =
		(cycleNumber: number, mode: Mode) => (inputMinutes: number) => {
			const newCycleObject: Cycle =
				mode === Mode.WORK
					? {
							cycleNumber,
							workMinutes: inputMinutes,
							breakMinutes: cycle.breakMinutes,
					  }
					: {
							cycleNumber,
							workMinutes: cycle.workMinutes,
							breakMinutes: inputMinutes,
					  };
			let newCyclesArray = [...cycles];
			newCyclesArray[cycleNumber] = newCycleObject;
			localStorage.setItem("cycles", JSON.stringify(newCyclesArray));
			setCycles(newCyclesArray);
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
				className="slider"
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
