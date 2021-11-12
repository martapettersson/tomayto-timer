import React from "react";

type Props = {
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PlayButton: React.FC<Props> = ({ callback }) => {
	return <button onClick={callback}>Play</button>;
};

export default PlayButton;
