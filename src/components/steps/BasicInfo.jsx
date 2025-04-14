import { useState, useEffect } from "react";
import "./steps.css";

const BasicInfo = ({
	itineraryData,
	updateItineraryData,
	onNext,
	setStreamingText,
	mockItineraryUpdates,
}) => {
	const [formValid, setFormValid] = useState(false);
	const [localData, setLocalData] = useState({
		destination: itineraryData.destination || "",
		startDate: itineraryData.startDate || "",
		endDate: itineraryData.endDate || "",
		budget: itineraryData.budget || "",
		travelers: itineraryData.travelers || 1,
	});

	// Check form validity whenever local data changes
	useEffect(() => {
		// Simple validation - at minimum, we need destination
		const isValid = !!localData.destination;
		setFormValid(isValid);
	}, [localData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocalData((prev) => {
			const updated = { ...prev, [name]: value };
			// Update parent state immediately
			updateItineraryData({ [name]: value });
			// Update streaming text immediately
			setStreamingText(
				mockItineraryUpdates[name] || mockItineraryUpdates.default
			);
			return updated;
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Data is already updated in parent via handleChange
		onNext();
	};

	// Get today's date in YYYY-MM-DD format for min date attribute
	const getTodayString = () => {
		const today = new Date();
		return today.toISOString().split("T")[0];
	};

	return (
		<div className="step-container">
			<h2 className="step-title">Where would you like to go?</h2>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="destination">Destination</label>
					<input
						type="text"
						id="destination"
						name="destination"
						value={localData.destination}
						onChange={handleChange}
						placeholder="City, country or region"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="date-range">Travel Dates</label>
					<div className="date-range-container">
						<input
							type="date"
							id="startDate"
							name="startDate"
							value={localData.startDate}
							onChange={handleChange}
							min={getTodayString()}
						/>
						<span className="date-separator">to</span>
						<input
							type="date"
							id="endDate"
							name="endDate"
							value={localData.endDate}
							onChange={handleChange}
							min={localData.startDate || getTodayString()}
						/>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="budget">Budget Level</label>
					<select
						id="budget"
						name="budget"
						value={localData.budget}
						onChange={handleChange}
					>
						<option value="">Select a budget level</option>
						<option value="Budget">Budget-friendly</option>
						<option value="Mid-range">Mid-range</option>
						<option value="Luxury">Luxury</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="travelers">Number of Travelers</label>
					<input
						type="number"
						id="travelers"
						name="travelers"
						value={localData.travelers}
						onChange={handleChange}
						min="1"
						max="20"
					/>
				</div>

				<div className="button-group">
					<div></div> {/* Empty div for spacing */}
					<button
						type="submit"
						disabled={!formValid}
						className="primary-button"
					>
						Continue to Activities
					</button>
				</div>
			</form>
		</div>
	);
};

export default BasicInfo;
