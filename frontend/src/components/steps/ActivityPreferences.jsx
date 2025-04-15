import { useState, useEffect } from "react";
import "./steps.css";

const ActivityPreferences = ({ data, onUpdate }) => {
	const [selectedActivities, setSelectedActivities] = useState(
		data.activities || []
	);
	const [pace, setPace] = useState(data.pace || "balanced");
	const [specialRequests, setSpecialRequests] = useState(
		data.specialRequests || ""
	);

	useEffect(() => {
		setSelectedActivities(data.activities || []);
		setPace(data.pace || "balanced");
		setSpecialRequests(data.specialRequests || "");
	}, [data]);

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

	const toggleActivity = (activityLabel) => {
		let updatedActivities;
		if (selectedActivities.includes(activityLabel)) {
			updatedActivities = selectedActivities.filter((a) => a !== activityLabel);
		} else {
			updatedActivities = [...selectedActivities, activityLabel];
		}
		setSelectedActivities(updatedActivities);
		onUpdate({ activities: updatedActivities });
	};

	const handlePaceChange = (e) => {
		const newPace = e.target.value;
		setPace(newPace);
		onUpdate({ pace: newPace });
	};

	const handleSpecialRequestsChange = (e) => {
		const newRequests = e.target.value;
		setSpecialRequests(newRequests);
		onUpdate({ specialRequests: newRequests });
	};

	return (
		<div className="step-container">
			<h2 className="step-title">
				What would you like to do in {data.destination || "your destination"}?
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
						value={pace}
						onChange={handlePaceChange}
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
				<label htmlFor="specialRequests">
					Special Interests or Requirements:
				</label>
				<textarea
					id="specialRequests"
					name="specialRequests"
					placeholder="Any special interests, accessibility needs, or specific requirements for your trip?"
					value={specialRequests}
					onChange={handleSpecialRequestsChange}
					rows={3}
				/>
			</div>
		</div>
	);
};

export default ActivityPreferences;
