import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";

const SetVolume: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const volume = settingsInfo.volume;

	const updateAlarmVolume = (value: number) => {
		settingsInfo.setVolume(value);
		localStorage.setItem("volume", JSON.stringify(value));
	};

	return (
		<div>
			<h2>Set Alarm Volume</h2>
			<label>Volume: {volume}</label>
			<ReactSlider
				className="slider"
				thumbClassName="thumb"
				trackClassName="track"
				value={volume}
				onChange={updateAlarmVolume}
				step={0.1}
				min={0}
				max={1}
			/>
		</div>
	);
};

export default SetVolume;
