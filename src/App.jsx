import { useState } from "react";
import "./App.css";
import ItineraryPlanner from "./components/ItineraryPlanner";

function App() {
	return (
		<div className="app-container">
			<header className="app-header">
				<h1>Interactive Itinerary Planner</h1>
				<p>Plan your perfect trip in real-time</p>
			</header>
			<main>
				<ItineraryPlanner />
			</main>
			<footer className="app-footer">
				<p>© 2025 James' Journeys</p>
			</footer>
		</div>
	);
}

export default App;
