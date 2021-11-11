import React, { useContext, useState } from "react";
import ReactSlider from "react-slider";

import SettingsContext from "../context/SettingsContext";

const SetAllCycleMinutes: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const cycles = settingsInfo.cycles;

	const [workMinutes, setWorkMinutes] = useState(25);
	const [breakMinutes, setBreakMinutes] = useState(5);

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		let newCycleArray = [...cycles];

		for (let cycle of cycles) {
			cycle.workMinutes = workMinutes;
			cycle.breakMinutes = breakMinutes;
		}

		localStorage.setItem("cycles", JSON.stringify(newCycleArray));
		settingsInfo.setCycles(newCycleArray);
	};

	return (
		<div>
			<h2>Set All Cycle Minutes</h2>
			<form onSubmit={handleOnSubmit}>
				<label>
					Work: {workMinutes < 10 ? `0${workMinutes}` : workMinutes}:00
				</label>
				<ReactSlider
					className="slider"
					thumbClassName="thumb"
					trackClassName="track"
					value={workMinutes}
					onChange={(newValue) => setWorkMinutes(newValue)}
					min={1}
					max={120}
				/>
				<label>
					Break: {breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes}:00
				</label>
				<ReactSlider
					className="slider green"
					thumbClassName="thumb"
					trackClassName="track"
					value={breakMinutes}
					onChange={(newValue) => setBreakMinutes(newValue)}
					min={1}
					max={120}
				/>
				<input type="submit" value="Set" />
			</form>
		</div>
	);
};

export default SetAllCycleMinutes;
