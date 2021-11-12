import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";

const SetAllCycleMinutes: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const volume = settingsInfo.volume;

	return (
		<div>
			<h2>Set Volume</h2>

			<label>Volume: {volume}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={volume}
				onChange={(newValue) => settingsInfo.setVolume(newValue)}
				step={0.1}
				min={0}
				max={1}
			/>
		</div>
	);
};

export default SetAllCycleMinutes;
