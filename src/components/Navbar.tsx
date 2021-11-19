import React, { useContext } from "react";
import logo from "../assets/tomato.png";
import SettingsContext from "../context/SettingsContext";
import SettingsButton from "./SettingsButton";
import BackButton from "./BackButton";

const Navbar: React.FC = () => {
	const { setShowSettings } = useContext(SettingsContext);
	return (
		<nav>
			<ul>
				<li onClick={() => setShowSettings(false)}>
					{/* <BackButton callback={() => setShowSettings(false)} /> */}
					<img src={logo} alt="Tomato" className="logo navElement" />
				</li>
				<li onClick={() => setShowSettings(false)}>
					<p className="heading navElement">Tomayto Timer</p>
				</li>
				<li className="floatRight">
					<SettingsButton callback={() => setShowSettings(true)} />
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
