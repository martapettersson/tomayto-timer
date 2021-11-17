import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

const SetColorTheme: React.FC = () => {
	const { colorTheme, setColorTheme } = useContext(SettingsContext);

	const updateColorTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const inputValue: string = e.target.value;
		setColorTheme(inputValue);
		localStorage.setItem("colorTheme", JSON.stringify(inputValue));
	};
	return (
		<div>
			<h2>Color Theme</h2>
			<div className="inputContainer">
				<label htmlFor="colorTheme">Choose color theme</label>
				<div className="select">
					<select
						name="colorTheme"
						value={colorTheme}
						onChange={updateColorTheme}
					>
						<option value="purpleDream">Purple Dream</option>
						<option value="darkNight">Dark Night</option>
						<option value="solarPower">Solar Power</option>
						<option value="greenHaven">Green Haven</option>
						<option value="bubbleGum">Bubbel Gum</option>
						<option value="earlGrey">Earl Grey</option>
					</select>
					<span className="focus"></span>
				</div>
			</div>
		</div>
	);
};

export default SetColorTheme;
