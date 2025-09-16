import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Level1 from "./level1";
import Level2 from "./level2";
import Earth from "./earthModel";
import Text3D from "./text";

const App = () => {

	return (
		<Router>
			<nav>
				<Link className="link" to="/">Home</Link> | <Link className="link" to="/level2">Sphere</Link> | <Link className="link" to="/level3">Earth</Link> | <Link className="link" to="/level4">Text</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Level1 />} />
				<Route path="/level2" element={<Level2 />} />
				<Route path="/level3" element={<Earth />} />
				<Route path="/level4" element={<Text3D />} />
			</Routes>
		</Router>
	);
};


export default App;