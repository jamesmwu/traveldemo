import { useState, useEffect } from "react";
import "./steps.css";

const DetailedCustomization = ({ data, onUpdate }) => {
	const [accommodation, setAccommodation] = useState(data.accommodation || "");
	const [selectedCustomizations, setSelectedCustomizations] = useState(
		data.customizations || []
	);
	const [transportation, setTransportation] = useState(
		data.transportation || ""
	);
	const [specialRequests, setSpecialRequests] = useState(
		data.specialRequests || ""
	);
	const [includeBreakfast, setIncludeBreakfast] = useState(
		data.includeBreakfast || false
	);
	const [includeAirportTransfer, setIncludeAirportTransfer] = useState(
		data.includeAirportTransfer || false
	);

	useEffect(() => {
		setAccommodation(data.accommodation || "");
		setSelectedCustomizations(data.customizations || []);
		setTransportation(data.transportation || "");
		setSpecialRequests(data.specialRequests || "");
		setIncludeBreakfast(data.includeBreakfast || false);
		setIncludeAirportTransfer(data.includeAirportTransfer || false);
	}, [data]);

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
		onUpdate({ accommodation: newValue });
	};

	const toggleCustomization = (customizationLabel) => {
		let updatedCustomizations;
		if (selectedCustomizations.includes(customizationLabel)) {
			updatedCustomizations = selectedCustomizations.filter(
				(c) => c !== customizationLabel
			);
		} else {
			updatedCustomizations = [...selectedCustomizations, customizationLabel];
		}
		setSelectedCustomizations(updatedCustomizations);
		onUpdate({ customizations: updatedCustomizations });
	};

	const handleTransportationChange = (e) => {
		const newValue = e.target.value;
		setTransportation(newValue);
		onUpdate({ transportation: newValue });
	};

	const handleSpecialRequestsChange = (e) => {
		const newValue = e.target.value;
		setSpecialRequests(newValue);
		onUpdate({ specialRequests: newValue });
	};

	const toggleBreakfast = () => {
		const newValue = !includeBreakfast;
		setIncludeBreakfast(newValue);
		onUpdate({ includeBreakfast: newValue });
	};

	const toggleAirportTransfer = () => {
		const newValue = !includeAirportTransfer;
		setIncludeAirportTransfer(newValue);
		onUpdate({ includeAirportTransfer: newValue });
	};

	return (
		<div className="step-container">
			<h2 className="step-title">
				Customize Your {data.destination || "Trip"} Itinerary
			</h2>

			<div className="form-group">
				<label htmlFor="accommodation">Preferred Accommodation Type</label>
				<select
					id="accommodation"
					name="accommodation"
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
					name="transportation"
					value={transportation}
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
				<label htmlFor="special-requests">Special Requests:</label>
				<textarea
					id="special-requests"
					name="specialRequests"
					placeholder="Any specific places you'd like to visit or experiences you'd like to have?"
					value={specialRequests}
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
		</div>
	);
};

export default DetailedCustomization;
