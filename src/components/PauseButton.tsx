import React from "react";

type Props = {
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PauseButton: React.FC<Props> = ({ callback }) => {
	return <button onClick={callback}>Pause</button>;
};

export default PauseButton;
