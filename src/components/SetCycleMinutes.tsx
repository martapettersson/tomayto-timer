import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";

type Props = {
	cycleNumber: number;
};

const SetCycleMinutes: React.FC<Props> = ({ cycleNumber }) => {
	const settingsInfo: any = useContext(SettingsContext);
	const cycle = settingsInfo.cycles[cycleNumber];

	return (
		<div>
			<h2>Cycle: {cycleNumber + 1}</h2>
			<label>Work: {settingsInfo.cycles[cycleNumber].workMinutes}:00</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={cycle.workMinutes}
				min={1}
				max={120}
			/>
			<label>Break: {settingsInfo.cycles[cycleNumber].breakMinutes}:00</label>
			<ReactSlider
				className="slider green"
				thumbClassName="thumb"
				trackClassName="track"
				value={cycle.breakMinutes}
				min={1}
				max={120}
			/>
		</div>
	);
};

export default SetCycleMinutes;
