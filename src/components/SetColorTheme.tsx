import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

const SetColorTheme: React.FC = () => {
	const { colorTheme, setColorTheme } = useContext(SettingsContext);

	const updateColorTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setColorTheme(e.target.value);
	};
	return (
		<div>
			<select name="colorTheme" value={colorTheme} onChange={updateColorTheme}>
				<option value="purpleDream">Purple Dream</option>
				<option value="darkNight">Dark Night</option>
				<option value="solarPower">Solar Power</option>
				<option value="greenHaven">Green Haven</option>
				<option value="bubbleGum">Bubbel Gum</option>
				<option value="earlGrey">Earl Grey</option>
			</select>
		</div>
	);
};

export default SetColorTheme;
