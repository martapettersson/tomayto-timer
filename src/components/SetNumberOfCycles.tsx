import React, { useContext, useRef } from "react";
import SettingsContext from "../context/SettingsContext";

type Props = {
	numberOfCycles: number;
	setNumberOfCycles: (numberOfCycles: number) => void;
};

const SetNumberOfCycles: React.FC<Props> = ({
	numberOfCycles,
	setNumberOfCycles,
}) => {
	const { cycles, setCycles, allWorkMinutes, allBreakMinutes } =
		useContext(SettingsContext);

	const numberOfCyclesRef = useRef(numberOfCycles);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			return;
		}
		const inputValue: number = parseInt(e.target.value, 10);
		setNumberOfCycles(inputValue < 1 ? 1 : inputValue);
	};

	const updateCycles = (e: React.MouseEvent<HTMLButtonElement>) => {
		let newCycleArray = [...cycles];

		// User wants fewer cycles than what is currently in settingsInfo
		if (cycles.length > numberOfCycles) {
			newCycleArray = newCycleArray.filter((cycle) => {
				return cycle.cycleNumber < numberOfCycles;
			});
		}
		// User wants more cycles than what is currently in settingsInfo
		if (cycles.length < numberOfCycles) {
			for (let i = cycles.length; i < numberOfCycles; i++) {
				const newCycleValue = {
					cycleNumber: i,
					workMinutes: allWorkMinutes,
					breakMinutes: allBreakMinutes,
				};
				newCycleArray.push(newCycleValue);
			}
		}
		localStorage.setItem("cycles", JSON.stringify(newCycleArray));
		setCycles(newCycleArray);
		numberOfCyclesRef.current = numberOfCycles;
	};

	const handleReduce = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (numberOfCycles === 1) return;
		setNumberOfCycles(numberOfCycles - 1);
	};

	const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
		setNumberOfCycles(numberOfCycles + 1);
	};

	return (
		<div>
			<h2>Set number of cycles</h2>
			<div className="numberOfCycles">
				<label htmlFor="numberOfCycles">
					Cycles: {numberOfCyclesRef.current}
				</label>
				<div className="setNumberOfCycles">
					<button className="btnCount" onClick={handleReduce}>
						-
					</button>
					<input
						className="input"
						name="numberOfCycles"
						type="number"
						value={numberOfCycles}
						onChange={handleChange}
						min={1}
					/>
					<button className="btnCount" onClick={handleIncrease}>
						+
					</button>
				</div>
			</div>
			<button className="setNumberOfCyclesBtn" onClick={updateCycles}>
				Set
			</button>
		</div>
	);
};

export default SetNumberOfCycles;
