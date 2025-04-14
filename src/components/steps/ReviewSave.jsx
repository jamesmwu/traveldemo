import { useState } from "react";
import "./steps.css";

const ReviewSave = ({ itineraryData, generatedItinerary, onBack }) => {
	const [finalized, setFinalized] = useState(false);

	const downloadItinerary = () => {
		// In a real app, this would generate a proper PDF or other document
		// For this demo, we'll just create a text version
		let itineraryText = `
    YOUR PERSONALIZED TRAVEL ITINERARY
    ----------------------------------
    
    Destination: ${itineraryData.destination || "Not specified"}
    Dates: ${formatDate(itineraryData.startDate)} to ${formatDate(
			itineraryData.endDate
		)}
    Duration: ${getDuration()} days
    Travelers: ${itineraryData.travelers || 1}
    Budget level: ${itineraryData.budget || "Not specified"}
    
    ACCOMMODATIONS
    -------------
    Preferred type: ${itineraryData.accommodation || "Not specified"}
    
    INTERESTS & ACTIVITIES
    ---------------------
    ${(itineraryData.activities || []).join(", ")}
    
    CUSTOMIZATIONS
    -------------
    ${(itineraryData.customizations || []).join(", ")}
    
    SPECIAL REQUESTS
    ---------------
    ${itineraryData.specialRequests || "None specified"}
    `;

		// Add day-by-day itinerary if available
		if (generatedItinerary && generatedItinerary.length > 0) {
			itineraryText += `\n\nDAY-BY-DAY ITINERARY\n--------------------\n\n`;

			generatedItinerary.forEach((day) => {
				itineraryText += `Day ${day.day}: ${day.title}\n`;
				day.activities.forEach((activity) => {
					itineraryText += `  • ${activity}\n`;
				});
				itineraryText += "\n";
			});
		}

		// Create a downloadable text file
		const element = document.createElement("a");
		const file = new Blob([itineraryText], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `${itineraryData.destination || "Travel"}_Itinerary.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const shareItinerary = () => {
		// In a real app, this would open sharing options
		// For this demo, we'll just show an alert
		alert(`Sharing feature would be integrated here in a real application!`);
	};

	const handleFinalize = () => {
		setFinalized(true);
		// In a real app, this would save to a database or send to a backend
		setTimeout(() => {
			alert(
				"Your itinerary has been finalized! In a real application, this would be saved to your account or emailed to you."
			);
		}, 500);
	};

	const formatDate = (dateString) => {
		if (!dateString) return "Not specified";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const getDuration = () => {
		if (!itineraryData.startDate || !itineraryData.endDate)
			return "Not specified";
		const start = new Date(itineraryData.startDate);
		const end = new Date(itineraryData.endDate);
		const difference = end.getTime() - start.getTime();
		return Math.ceil(difference / (1000 * 3600 * 24)) || "Not specified";
	};

	// Generate a short itinerary display
	const renderItineraryPreview = () => {
		if (!generatedItinerary || generatedItinerary.length === 0) {
			return <p className="empty-message">Itinerary details not available</p>;
		}

		return (
			<div className="itinerary-preview">
				{generatedItinerary.slice(0, 3).map((day, index) => (
					<div key={index} className="day-preview">
						<h4>
							Day {day.day}: {day.title}
						</h4>
						<ul>
							{day.activities.slice(0, 3).map((activity, actIndex) => (
								<li key={actIndex}>{activity}</li>
							))}
							{day.activities.length > 3 && (
								<li className="more-item">
									+{day.activities.length - 3} more activities
								</li>
							)}
						</ul>
					</div>
				))}
				{generatedItinerary.length > 3 && (
					<div className="more-days">
						+{generatedItinerary.length - 3} more days in your downloaded
						itinerary
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="step-container">
			<h2 className="step-title">
				Your {itineraryData.destination || "Travel"} Itinerary is Ready!
			</h2>

			{finalized && (
				<div className="finalized-banner">
					<div className="checkmark-circle">✓</div>
					<p>Your itinerary has been finalized!</p>
				</div>
			)}

			<div className="summary-container">
				<div className="summary-section">
					<h3>Trip Overview</h3>
					<div className="summary-item">
						<span className="summary-label">Destination:</span>
						<span className="summary-value">
							{itineraryData.destination || "Not specified"}
						</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Dates:</span>
						<span className="summary-value">
							{formatDate(itineraryData.startDate)} to{" "}
							{formatDate(itineraryData.endDate)}
						</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Travelers:</span>
						<span className="summary-value">
							{itineraryData.travelers || 1}
						</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Budget Level:</span>
						<span className="summary-value">
							{itineraryData.budget || "Not specified"}
						</span>
					</div>
				</div>

				<div className="summary-section">
					<h3>Selected Activities</h3>
					<div className="tags-container">
						{(itineraryData.activities || []).map((activity, index) => (
							<span key={index} className="tag">
								{activity}
							</span>
						))}
						{(!itineraryData.activities ||
							itineraryData.activities.length === 0) && (
							<span className="empty-message">No activities selected</span>
						)}
					</div>
				</div>

				<div className="summary-section">
					<h3>Your Customizations</h3>
					<div className="tags-container">
						{(itineraryData.customizations || []).map(
							(customization, index) => (
								<span key={index} className="tag">
									{customization}
								</span>
							)
						)}
						{(!itineraryData.customizations ||
							itineraryData.customizations.length === 0) && (
							<span className="empty-message">No customizations added</span>
						)}
					</div>
				</div>

				<div className="summary-section">
					<h3>Itinerary Preview</h3>
					{renderItineraryPreview()}
				</div>

				{itineraryData.specialRequests && (
					<div className="summary-section">
						<h3>Special Requests</h3>
						<p>{itineraryData.specialRequests}</p>
					</div>
				)}
			</div>

			<div className="action-buttons">
				<button
					type="button"
					className="action-button"
					onClick={downloadItinerary}
				>
					Download Itinerary
				</button>
				<button
					type="button"
					className="action-button"
					onClick={shareItinerary}
				>
					Share Itinerary
				</button>
			</div>

			<div className="button-group">
				<button
					type="button"
					className="secondary"
					onClick={onBack}
					disabled={finalized}
				>
					Back to Customization
				</button>
				<button
					type="button"
					className="primary-button"
					onClick={handleFinalize}
					disabled={finalized}
				>
					{finalized ? "Itinerary Finalized" : "Finalize Itinerary"}
				</button>
			</div>
		</div>
	);
};

export default ReviewSave;
