import React from "react";

type Props = {
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SettingsButton: React.FC<Props> = ({ callback }) => {
	return <button onClick={callback}>Settings</button>;
};

export default SettingsButton;
