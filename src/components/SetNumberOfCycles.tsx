import React, { useContext, useState } from "react";
import SettingsContext from "../context/SettingsContext";

type Props = {
	numberOfCycles: number;
	setNumberOfCycles: (value: number) => void;
};

const SetNumberOfCycles: React.FC<Props> = ({
	numberOfCycles,
	setNumberOfCycles,
}) => {
	const { cycles, setCycles, allWorkMinutes, allBreakMinutes } =
		useContext(SettingsContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue: number = parseInt(e.target.value);
		setNumberOfCycles(inputValue < 1 ? 1 : inputValue);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let newCycleArray = [...cycles];

		// User wants fewer cycles than what is currently in settingsInfo
		if (cycles.length > numberOfCycles) {
			newCycleArray = newCycleArray.filter((cycle) => {
				return cycle.cycleNumber < numberOfCycles;
			});
		}
		// User wants more cycles than what is currently in settingsInfo
		if (cycles.length < numberOfCycles) {
			for (let i = cycles.length; i < numberOfCycles; i++) {
				const newCycleValue = {
					cycleNumber: i,
					workMinutes: allWorkMinutes,
					breakMinutes: allBreakMinutes,
				};
				newCycleArray.push(newCycleValue);
			}
		}
		localStorage.setItem("cycles", JSON.stringify(newCycleArray));
		setCycles(newCycleArray);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="numberOfCycles">Number of Cycles</label>
			<input
				id="numberOfCycles"
				name="numberOfCycles"
				type="number"
				value={numberOfCycles}
				onChange={handleChange}
				min={1}
			/>
			<input type="submit" value="Set" />
		</form>
	);
};

export default SetNumberOfCycles;
