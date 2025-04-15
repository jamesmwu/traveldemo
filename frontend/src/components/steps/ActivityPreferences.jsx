import { useState } from "react";
import "./steps.css";

const ActivityPreferences = ({
	itineraryData,
	updateItineraryData,
	onNext,
	onBack,
}) => {
	const [selectedActivities, setSelectedActivities] = useState(
		itineraryData.activities || []
	);

	const activityOptions = [
		{ id: "cultural", label: "Cultural & Museums" },
		{ id: "outdoor", label: "Outdoor & Nature" },
		{ id: "adventure", label: "Adventure Activities" },
		{ id: "food", label: "Food & Culinary" },
		{ id: "relaxation", label: "Relaxation & Wellness" },
		{ id: "nightlife", label: "Nightlife & Entertainment" },
		{ id: "shopping", label: "Shopping" },
		{ id: "historical", label: "Historical Sites" },
		{ id: "family", label: "Family-Friendly" },
		{ id: "local", label: "Local Experiences" },
	];

	const toggleActivity = (activity) => {
		setSelectedActivities((prev) => {
			let updatedActivities;
			if (prev.includes(activity)) {
				updatedActivities = prev.filter((a) => a !== activity);
			} else {
				updatedActivities = [...prev, activity];
			}
			return updatedActivities;
		});
	};

	const handleContinue = () => {
		const pace =
			document.getElementById("pace")?.value ||
			itineraryData.pace ||
			"balanced";
		const specialRequirements =
			document.getElementById("special-requirements")?.value ||
			itineraryData.specialRequirements ||
			"";

		updateItineraryData({
			activities: selectedActivities,
			pace,
			specialRequirements,
		});
		onNext();
	};

	return (
		<div className="step-container">
			<h2 className="step-title">
				What would you like to do in{" "}
				{itineraryData.destination || "your destination"}?
			</h2>

			<div className="form-group">
				<label>Select activities and experiences that interest you:</label>
				<div className="checkbox-group">
					{activityOptions.map((option) => (
						<div
							key={option.id}
							className={`checkbox-item ${
								selectedActivities.includes(option.label) ? "selected" : ""
							}`}
							onClick={() => toggleActivity(option.label)}
						>
							<span>{option.label}</span>
						</div>
					))}
				</div>
			</div>

			<div className="travel-style-section">
				<h3>Travel Style</h3>
				<div className="form-group">
					<label htmlFor="pace">Trip Pace</label>
					<select
						id="pace"
						name="pace"
						defaultValue={itineraryData.pace || "balanced"}
					>
						<option value="relaxed">Relaxed - Plenty of downtime</option>
						<option value="balanced">
							Balanced - Mix of activities and rest
						</option>
						<option value="active">Active - Maximize experiences</option>
					</select>
				</div>
			</div>

			<div className="form-group">
				<label>Special Interests or Requirements:</label>
				<textarea
					id="special-requirements"
					placeholder="Any special interests, accessibility needs, or specific requirements for your trip?"
					defaultValue={itineraryData.specialRequirements || ""}
					rows={3}
				/>
			</div>

			<div className="button-group">
				<button type="button" className="secondary" onClick={onBack}>
					Back to Basic Info
				</button>
				<button
					type="button"
					onClick={handleContinue}
					disabled={selectedActivities.length === 0}
					className="primary-button"
				>
					Continue to Customization
				</button>
			</div>
		</div>
	);
};

export default ActivityPreferences;
