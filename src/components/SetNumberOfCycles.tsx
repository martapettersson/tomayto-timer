import React, { useContext, useState } from "react";
import SettingsContext from "../context/SettingsContext";

const SetNumberOfCycles: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const cycles = settingsInfo.cycles;

	const [numberOfCycles, setNumberOfCycles] = useState(cycles.length);

	const handleChange = (e: any) => {
		setNumberOfCycles(e.target.value < 1 ? 1 : e.target.value);
	};

	const handleSubmit = (e: any) => {
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
					workMinutes: 25,
					breakMinutes: 5,
				};
				newCycleArray.push(newCycleValue);
			}
		}

		settingsInfo.setCycles(newCycleArray);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="numberOfCycles">Set Number of Cycles</label>
			<input
				id="numberOfCycles"
				name="numberOfCycles"
				type="number"
				value={numberOfCycles}
				onChange={handleChange}
				min={1}
			/>
			<input type="submit" value="Save" />
		</form>
	);
};

export default SetNumberOfCycles;
