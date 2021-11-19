import React, { useContext } from "react";
import logo from "../assets/tomato.png";
import SettingsContext from "../context/SettingsContext";
import SettingsButton from "./SettingsButton";

const Navbar: React.FC = () => {
	const { setShowSettings } = useContext(SettingsContext);
	return (
		<nav>
			<ul>
				<li>
					<button onClick={() => setShowSettings(false)} className="logoBtn">
						<img src={logo} alt="Tomato" className="logo navElement" />
					</button>
				</li>
				<li onClick={() => setShowSettings(false)}>
					<div className="navElement">
						<h1 className="heading">Tomayto Timer</h1>
					</div>
				</li>
				<li className="floatRight">
					<SettingsButton callback={() => setShowSettings(true)} />
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
