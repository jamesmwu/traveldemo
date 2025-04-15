import { useState } from "react";
import "./steps.css";

const ReviewSave = ({ data, itineraryText }) => {
	const [finalized, setFinalized] = useState(false);

	const downloadItinerary = () => {
		// Use the raw itineraryText from the streaming panel for download
		const fileContent = `
YOUR PERSONALIZED TRAVEL ITINERARY
----------------------------------

Destination: ${data.destination || "Not specified"}
Dates: ${formatDate(data.startDate)} to ${formatDate(data.endDate)}
Duration: ${getDuration()} days
Travelers: ${data.travelers || 1}
Budget level: ${data.budget || "Not specified"}

ACCOMMODATIONS
-------------
Preferred type: ${data.accommodation || "Not specified"}

INTERESTS & ACTIVITIES
---------------------
${(data.activities || []).join(", ") || "None selected"}

CUSTOMIZATIONS
-------------
${(data.customizations || []).join(", ") || "None selected"}

SPECIAL REQUESTS
---------------
${data.specialRequests || "None specified"}

Include Breakfast: ${data.includeBreakfast ? "Yes" : "No"}
Include Airport Transfers: ${data.includeAirportTransfer ? "Yes" : "No"}

---
Generated Itinerary Details:
---

${itineraryText || "(Itinerary details not generated yet)"}
`;

		// Create a downloadable text file
		const element = document.createElement("a");
		const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
		element.href = URL.createObjectURL(file);
		element.download = `${data.destination || "Travel"}_Itinerary.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const shareItinerary = () => {
		alert(`Sharing feature would be integrated here in a real application!`);
	};

	const handleFinalize = () => {
		setFinalized(true);
		setTimeout(() => {
			alert(
				"Your itinerary has been finalized! In a real application, this would be saved or emailed."
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
		if (!data.startDate || !data.endDate) return "Not specified";
		const start = new Date(data.startDate);
		const end = new Date(data.endDate);
		const difference = end.getTime() - start.getTime();
		return difference >= 0
			? Math.ceil(difference / (1000 * 3600 * 24)) || "< 1"
			: "Invalid dates";
	};

	return (
		<div className="step-container review-save-container">
			<h2 className="step-title">
				Your {data.destination || "Travel"} Itinerary is Ready!
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
							{data.destination || "Not specified"}
						</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Dates:</span>
						<span className="summary-value">
							{formatDate(data.startDate)} to {formatDate(data.endDate)}
						</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Travelers:</span>
						<span className="summary-value">{data.travelers || 1}</span>
					</div>
					<div className="summary-item">
						<span className="summary-label">Budget Level:</span>
						<span className="summary-value">
							{data.budget || "Not specified"}
						</span>
					</div>
				</div>

				<div className="summary-section">
					<h3>Selected Preferences</h3>
					<div
						className="preference-category"
						style={{ marginBottom: "0.75rem" }}
					>
						<div className="tags-container">
							<span className="tag-label">Activities:</span>
							{(data.activities || []).length > 0 ? (
								data.activities.map((activity, index) => (
									<span key={index} className="tag">
										{activity}
									</span>
								))
							) : (
								<span className="empty-message">None</span>
							)}
						</div>
					</div>
					<div
						className="preference-category"
						style={{ marginBottom: "0.75rem" }}
					>
						<div className="tags-container">
							<span className="tag-label">Customizations:</span>
							{(data.customizations || []).length > 0 ? (
								data.customizations.map((customization, index) => (
									<span key={index} className="tag">
										{customization}
									</span>
								))
							) : (
								<span className="empty-message">None</span>
							)}
						</div>
					</div>
					{/* Add other relevant summaries here similarly if needed */}
					{/* Example: 
                    <div className="preference-category">
                        <span className="tag-label">Pace:</span>
                        <span className="tag">{data.pace || 'Not specified'}</span>
                    </div>
                    */}
				</div>
			</div>

			<div className="action-buttons">
				<button onClick={downloadItinerary} className="button-secondary">
					Download Itinerary (.txt)
				</button>
				<button onClick={shareItinerary} className="button-secondary">
					Share Itinerary
				</button>
				<button
					onClick={handleFinalize}
					className="button-primary"
					disabled={finalized}
				>
					{finalized ? "Finalized!" : "Finalize & Save"}
				</button>
			</div>

			{/* Removed button group with Back button, navigation handled by parent */}
		</div>
	);
};

export default ReviewSave;
