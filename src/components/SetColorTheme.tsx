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
			</select>
		</div>
	);
};

export default SetColorTheme;
