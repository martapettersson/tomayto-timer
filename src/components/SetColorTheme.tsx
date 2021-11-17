import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import type { ColorThemes } from "../context/SettingsContext";

const SetColorTheme: React.FC = () => {
	const colorThemeOptions: ColorThemes[] = [
		"purpleDream",
		"darkNight",
		"solarPower",
		"greenHaven",
		"bubbleGum",
		"earlGrey",
	];
	const { colorTheme, setColorTheme } = useContext(SettingsContext);

	const updateColorTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const inputValue = e.target.value;
		setColorTheme(inputValue as ColorThemes);
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
						{colorThemeOptions.map((option) => {
							return (
								<option key={colorThemeOptions.indexOf(option)} value={option}>
									{option[0].toUpperCase() + option.slice(1)}
								</option>
							);
						})}
					</select>
					<span className="focus"></span>
				</div>
			</div>
		</div>
	);
};

export default SetColorTheme;
