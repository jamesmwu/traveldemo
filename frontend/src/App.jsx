import "./App.css";
import ItineraryPlanner from "./components/ItineraryPlanner";

function App() {
	return (
		<div className="app-container">
			<header className="app-header">
				<h1>Anthony's Adventure Agency</h1>
				<p>Plan your perfect trip!</p>
			</header>
			<main>
				<ItineraryPlanner />
			</main>
			<footer className="app-footer">
				<p>© 2025 Anthony's Adventure Agency</p>
			</footer>
		</div>
	);
}

export default App;
