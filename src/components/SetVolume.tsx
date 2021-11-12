import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";

const SetVolume: React.FC = () => {
	const settingsInfo: any = useContext(SettingsContext);
	const volume = settingsInfo.volume;

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		localStorage.setItem("volume", JSON.stringify(volume));
	};

	return (
		<div>
			<h2>Set Alarm Volume</h2>
			<form onSubmit={handleOnSubmit}>
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
				<input type="submit" value="Set" />
			</form>
		</div>
	);
};

export default SetVolume;
