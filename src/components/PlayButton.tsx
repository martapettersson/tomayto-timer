import React from "react";

type Props = {
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PlayButton: React.FC<Props> = ({ callback }) => {
	return (
		<button className="playAndPauseBtn" onClick={callback}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
			</svg>
		</button>
	);
};

export default PlayButton;
