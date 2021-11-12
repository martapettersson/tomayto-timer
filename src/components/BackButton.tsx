import React from "react";

type Props = {
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BackButton: React.FC<Props> = ({ callback }) => {
	return <button onClick={callback}>Back</button>;
};

export default BackButton;
