import { useState } from "react";
import "./steps.css";

const DetailedCustomization = ({
	itineraryData,
	updateItineraryData,
	onNext,
	onBack,
	setStreamingText,
	mockItineraryUpdates,
}) => {
	const [accommodation, setAccommodation] = useState(
		itineraryData.accommodation || ""
	);

	const [selectedCustomizations, setSelectedCustomizations] = useState(
		itineraryData.customizations || []
	);

	const [includeBreakfast, setIncludeBreakfast] = useState(
		itineraryData.includeBreakfast || false
	);

	const [includeAirportTransfer, setIncludeAirportTransfer] = useState(
		itineraryData.includeAirportTransfer || false
	);

	const customizationOptions = [
		{ id: "more-museums", label: "More Museums" },
		{ id: "more-food", label: "More Food Experiences" },
		{ id: "more-adventure", label: "More Adventure Activities" },
		{ id: "add-daytrip", label: "Add a Day Trip" },
		{ id: "local-cuisine", label: "Focus on Local Cuisine" },
		{ id: "relaxation", label: "Add Relaxation Time" },
		{ id: "guided-tours", label: "Include Guided Tours" },
		{ id: "hidden-gems", label: "Include Hidden Gems" },
		{ id: "family-friendly", label: "More Family-friendly Options" },
		{ id: "shopping", label: "Add Shopping Time" },
	];

	const handleAccommodationChange = (e) => {
		const newValue = e.target.value;
		setAccommodation(newValue);
		updateItineraryData({ accommodation: newValue });
		setStreamingText(mockItineraryUpdates.accommodation);
	};

	const toggleCustomization = (customization) => {
		let updatedCustomizations;
		setSelectedCustomizations((prev) => {
			if (prev.includes(customization)) {
				updatedCustomizations = prev.filter((c) => c !== customization);
			} else {
				updatedCustomizations = [...prev, customization];
			}
			updateItineraryData({ customizations: updatedCustomizations });
			setStreamingText(mockItineraryUpdates.customizations);
			return updatedCustomizations;
		});
	};

	const handleTransportationChange = (e) => {
		const newValue = e.target.value;
		updateItineraryData({ transportation: newValue });
		setStreamingText(mockItineraryUpdates.transportation);
	};

	const handleSpecialRequestsChange = (e) => {
		const newValue = e.target.value;
		updateItineraryData({ specialRequests: newValue });
		setStreamingText(mockItineraryUpdates.specialRequests);
	};

	const toggleBreakfast = () => {
		const newValue = !includeBreakfast;
		setIncludeBreakfast(newValue);
		updateItineraryData({ includeBreakfast: newValue });
		setStreamingText(mockItineraryUpdates.includeBreakfast);
	};

	const toggleAirportTransfer = () => {
		const newValue = !includeAirportTransfer;
		setIncludeAirportTransfer(newValue);
		updateItineraryData({ includeAirportTransfer: newValue });
		setStreamingText(mockItineraryUpdates.includeAirportTransfer);
	};

	const handleContinue = () => {
		// Data is already updated in parent via individual handlers
		onNext();
	};

	return (
		<div className="step-container">
			<h2 className="step-title">
				Customize Your {itineraryData.destination || "Trip"} Itinerary
			</h2>

			<div className="form-group">
				<label htmlFor="accommodation">Preferred Accommodation Type</label>
				<select
					id="accommodation"
					value={accommodation}
					onChange={handleAccommodationChange}
				>
					<option value="">Select accommodation type</option>
					<option value="Hotel">Hotel</option>
					<option value="Resort">Resort</option>
					<option value="Apartment/Vacation Rental">
						Apartment/Vacation Rental
					</option>
					<option value="Boutique Hotel">Boutique Hotel</option>
					<option value="Hostel">Hostel</option>
					<option value="Villa">Villa</option>
					<option value="All-Inclusive Resort">All-Inclusive Resort</option>
				</select>
			</div>

			<div className="form-group">
				<label>Refine your itinerary with these adjustments:</label>
				<div className="checkbox-group">
					{customizationOptions.map((option) => (
						<div
							key={option.id}
							className={`checkbox-item ${
								selectedCustomizations.includes(option.label) ? "selected" : ""
							}`}
							onClick={() => toggleCustomization(option.label)}
						>
							<span>{option.label}</span>
						</div>
					))}
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="transportation">Local Transportation Preferences</label>
				<select
					id="transportation"
					defaultValue={itineraryData.transportation || ""}
					onChange={handleTransportationChange}
				>
					<option value="">Select transportation preference</option>
					<option value="Public Transportation">Public Transportation</option>
					<option value="Rental Car">Rental Car</option>
					<option value="Rideshare Services">Rideshare Services</option>
					<option value="Guided Tours">Guided Tours with Transportation</option>
					<option value="Walking">Walking (where possible)</option>
					<option value="Mix">Mix of Options</option>
				</select>
			</div>

			<div className="form-group">
				<label>Special Requests:</label>
				<textarea
					placeholder="Any specific places you'd like to visit or experiences you'd like to have?"
					defaultValue={itineraryData.specialRequests || ""}
					onChange={handleSpecialRequestsChange}
					rows={3}
				/>
			</div>

			<div className="quick-customize-buttons">
				<button
					type="button"
					className={`action-button ${includeBreakfast ? "selected" : ""}`}
					onClick={toggleBreakfast}
				>
					Include Breakfast
				</button>
				<button
					type="button"
					className={`action-button ${
						includeAirportTransfer ? "selected" : ""
					}`}
					onClick={toggleAirportTransfer}
				>
					Add Airport Transfers
				</button>
			</div>

			<div className="button-group">
				<button type="button" className="secondary" onClick={onBack}>
					Back to Activities
				</button>
				<button
					type="button"
					onClick={handleContinue}
					className="primary-button"
				>
					Continue to Review
				</button>
			</div>
		</div>
	);
};

export default DetailedCustomization;
