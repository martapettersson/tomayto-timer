import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import { Mode } from "./Timer";

const SetIntervalTitles: React.FC = () => {
	const {
		customWorkTitle,
		setCustomWorkTitle,
		customBreakTitle,
		setCustomBreakTitle,
		cycles,
		setCycles,
	} = useContext(SettingsContext);

	const updateIntervalTitles =
		(mode: Mode) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			let newCyclesArray = [...cycles];

			if (mode === Mode.WORK) {
				setCustomWorkTitle(e.target.value);
				for (let cycle of cycles) {
					cycle.workTitle = inputValue;
				}
				localStorage.setItem("customWorkTitle", JSON.stringify(inputValue));
			} else {
				setCustomBreakTitle(e.target.value);
				for (let cycle of cycles) {
					cycle.breakTitle = inputValue;
				}
				localStorage.setItem("customBreakTitle", JSON.stringify(inputValue));
			}

			localStorage.setItem("cycles", JSON.stringify(newCyclesArray));
			setCycles(newCyclesArray);
		};

	return (
		<div>
			<h2>Set Interval Titles</h2>
			<label>Work Interval</label>
			<input
				type="text"
				name="customWorkTitle"
				value={customWorkTitle ? customWorkTitle : ""}
				onChange={updateIntervalTitles(Mode.WORK)}
			/>
			<br />
			<label>Break Interval</label>
			<input
				type="text"
				name="customBreakTitle"
				value={customBreakTitle ? customBreakTitle : ""}
				onChange={updateIntervalTitles(Mode.BREAK)}
			/>
		</div>
	);
};

export default SetIntervalTitles;
