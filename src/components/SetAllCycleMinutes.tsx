import React, { useContext } from "react";
import ReactSlider from "react-slider";

import SettingsContext from "../context/SettingsContext";

const SetAllCycleMinutes: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const allWorkMinutes = settingsInfo.allWorkMinutes;
	const allBreakMinutes = settingsInfo.allBreakMinutes;
	const cycles = settingsInfo.cycles;

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		let newCycleArray = [...cycles];

		for (let cycle of cycles) {
			cycle.workMinutes = allWorkMinutes;
			cycle.breakMinutes = allBreakMinutes;
		}

		localStorage.setItem("allWorkMinutes", JSON.stringify(allWorkMinutes));
		localStorage.setItem("allBreakMinutes", JSON.stringify(allBreakMinutes));

		localStorage.setItem("cycles", JSON.stringify(newCycleArray));
		settingsInfo.setCycles(newCycleArray);
	};

	return (
		<div>
			<h2>Set All Cycle Minutes</h2>
			<form onSubmit={handleOnSubmit}>
				<label>
					Work: {allWorkMinutes < 10 ? `0${allWorkMinutes}` : allWorkMinutes}:00
				</label>
				<ReactSlider
					className="slider"
					thumbClassName="thumb"
					trackClassName="track"
					value={allWorkMinutes}
					onChange={(newValue) => settingsInfo.setAllWorkMinutes(newValue)}
					min={1}
					max={120}
				/>
				<label>
					Break:{" "}
					{allBreakMinutes < 10 ? `0${allBreakMinutes}` : allBreakMinutes}:00
				</label>
				<ReactSlider
					className="slider green"
					thumbClassName="thumb"
					trackClassName="track"
					value={allBreakMinutes}
					onChange={(newValue) => settingsInfo.setAllBreakMinutes(newValue)}
					min={1}
					max={120}
				/>
				<input type="submit" value="Set" />
			</form>
		</div>
	);
};

export default SetAllCycleMinutes;
