import { useState, useEffect } from "react";
import "./steps.css";

const BasicInfo = ({ data, onUpdate }) => {
	const [formValid, setFormValid] = useState(false);
	const [localData, setLocalData] = useState({
		destination: data.destination || "",
		startDate: data.startDate || "",
		endDate: data.endDate || "",
		budget: data.budget || "",
		travelers: data.travelers || 1,
	});

	useEffect(() => {
		setLocalData({
			destination: data.destination || "",
			startDate: data.startDate || "",
			endDate: data.endDate || "",
			budget: data.budget || "",
			travelers: data.travelers || 1,
		});
	}, [data]);

	useEffect(() => {
		const isValid = !!localData.destination;
		setFormValid(isValid);
	}, [localData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedValue =
			name === "travelers" ? parseInt(value, 10) || 1 : value;
		const updatedLocalData = { ...localData, [name]: updatedValue };
		setLocalData(updatedLocalData);
		onUpdate({ [name]: updatedValue });
	};

	const getTodayString = () => {
		const today = new Date();
		return today.toISOString().split("T")[0];
	};

	return (
		<div className="step-container">
			<h2 className="step-title">Where would you like to go?</h2>

			<form>
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
			</form>
		</div>
	);
};

export default BasicInfo;
