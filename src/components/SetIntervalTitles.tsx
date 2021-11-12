import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import { Mode } from "./Timer";

const SetIntervalTitles: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const allWorkTitles = settingsInfo.allWorkTitles;
	const allBreakTitles = settingsInfo.allBreakTitles;
	const cycles = settingsInfo.cycles;

	const updateIntervalTitles =
		(mode: Mode) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			let newCyclesArray = [...cycles];

			if (mode === Mode.WORK) {
				settingsInfo.setAllWorkTitles(e.target.value);
				for (let cycle of cycles) {
					cycle.workTitle = inputValue;
				}
				localStorage.setItem("allWorkTitles", JSON.stringify(inputValue));
			} else {
				settingsInfo.setAllBreakTitles(e.target.value);
				for (let cycle of cycles) {
					cycle.breakTitle = inputValue;
				}
				localStorage.setItem("allBreakTitles", JSON.stringify(inputValue));
			}

			localStorage.setItem("cycles", JSON.stringify(newCyclesArray));
			settingsInfo.setCycles(newCyclesArray);
		};

	return (
		<div>
			<h2>Set Interval Titles</h2>
			<label>Work Interval</label>
			<input
				type="text"
				name="allWorkTitles"
				value={allWorkTitles ? allWorkTitles : ""}
				onChange={updateIntervalTitles(Mode.WORK)}
			/>
			<br />
			<label>Break Interval</label>
			<input
				type="text"
				name="allBreakTitles"
				value={allBreakTitles ? allBreakTitles : ""}
				onChange={updateIntervalTitles(Mode.BREAK)}
			/>
		</div>
	);
};

export default SetIntervalTitles;
