import React from "react";

export type Cycle = {
	cycleNumber: number;
	workMinutes: number;
	breakMinutes: number;
	workTitle?: string;
	breakTitle?: string;
};

export type GlobalSettings = {
	showSettings: boolean;
	setShowSettings: (showSettings: boolean) => void;
	cycles: Cycle[];
	setCycles: (cycles: Cycle[]) => void;
	allWorkMinutes: number;
	setAllWorkMinutes: (allWorkMinutes: number) => void;
	allBreakMinutes: number;
	setAllBreakMinutes: (allBreakMinutes: number) => void;
	volume: number;
	setVolume: (volume: number) => void;
	customWorkTitle: string | null;
	setCustomWorkTitle: (customWorkTitle: string) => void;
	customBreakTitle: string | null;
	setCustomBreakTitle: (customBreakTitle: string) => void;
};

const SettingsContext = React.createContext<GlobalSettings>({
	showSettings: false,
	setShowSettings: () => {},
	cycles: [{ cycleNumber: 0, workMinutes: 0, breakMinutes: 0 }],
	setCycles: () => {},
	allWorkMinutes: 25,
	setAllWorkMinutes: () => {},
	allBreakMinutes: 5,
	setAllBreakMinutes: () => {},
	volume: 0.5,
	setVolume: () => {},
	customWorkTitle: null,
	setCustomWorkTitle: () => {},
	customBreakTitle: null,
	setCustomBreakTitle: () => {},
});

export default SettingsContext;
