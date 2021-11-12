import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

const SetIntervalTitles: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const allWorkTitles = settingsInfo.allWorkTitles;
	const allBreakTitles = settingsInfo.allBreakTitles;
	const cycles = settingsInfo.cycles;

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		let newCycleArray = [...cycles];

		for (let cycle of cycles) {
			cycle.workTitle = allWorkTitles;
			cycle.breakTitle = allBreakTitles;
		}
		localStorage.setItem("allWorkTitles", JSON.stringify(allWorkTitles));
		localStorage.setItem("allBreakTitles", JSON.stringify(allBreakTitles));

		localStorage.setItem("cycles", JSON.stringify(newCycleArray));
		settingsInfo.setCycles(newCycleArray);
	};

	return (
		<div>
			<h2>Set Interval Titles</h2>
			<form onSubmit={handleOnSubmit}>
				<label>Work Interval</label>
				<input
					type="text"
					name="allWorkTitles"
					value={allWorkTitles ? allWorkTitles : ""}
					onChange={(e) => settingsInfo.setAllWorkTitles(e.target.value)}
				/>
				<br />
				<label>Break Interval</label>
				<input
					type="text"
					name="allBreakTitles"
					value={allBreakTitles ? allBreakTitles : ""}
					onChange={(e) => settingsInfo.setAllBreakTitles(e.target.value)}
				/>
				<input type="submit" value="Save" />
			</form>
		</div>
	);
};

export default SetIntervalTitles;
