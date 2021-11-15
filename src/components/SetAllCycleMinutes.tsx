import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";
import { Mode } from "./Timer";

const SetAllCycleMinutes: React.FC = () => {
	const {
		allWorkMinutes,
		setAllWorkMinutes,
		allBreakMinutes,
		setAllBreakMinutes,
		cycles,
		setCycles,
	} = useContext(SettingsContext);

	const updateAllCycleMinutes = (mode: Mode) => (value: number) => {
		let newCyclesArray = [...cycles];

		if (mode === Mode.WORK) {
			setAllWorkMinutes(value);
			for (let cycle of cycles) {
				cycle.workMinutes = value;
			}
			localStorage.setItem("allWorkMinutes", JSON.stringify(value));
		} else {
			setAllBreakMinutes(value);
			for (let cycle of cycles) {
				cycle.breakMinutes = value;
			}
			localStorage.setItem("allBreakMinutes", JSON.stringify(value));
		}

		localStorage.setItem("cycles", JSON.stringify(newCyclesArray));
		setCycles(newCyclesArray);
	};

	return (
		<div>
			<h2>Set All Cycle Minutes</h2>
			<label>
				Work: {allWorkMinutes < 10 ? `0${allWorkMinutes}` : allWorkMinutes}:00
			</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={allWorkMinutes}
				onChange={updateAllCycleMinutes(Mode.WORK)}
				min={1}
				max={120}
			/>
			<label>
				Break: {allBreakMinutes < 10 ? `0${allBreakMinutes}` : allBreakMinutes}
				:00
			</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={allBreakMinutes}
				onChange={updateAllCycleMinutes(Mode.BREAK)}
				min={1}
				max={120}
			/>
		</div>
	);
};

export default SetAllCycleMinutes;
