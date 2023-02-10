import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import QrReaderComponent from './components/QrReaderComponent';
import Attendance from './components/Attendance';

// import QrReaderComponent from './qr_components/QrReaderComponent';

function App() {

	return (
		<Router>
			<div className="App">
				<div id="content">
					<Routes>
						<Route exact path="/" element={<Attendance />} />
						<Route path="/att" element={<Attendance />} />
						<Route path="/qr" element={<QrReaderComponent />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
