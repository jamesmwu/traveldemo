import "./ProgressIndicator.css";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
	const steps = [
		"Basic Info",
		"Activity Preferences",
		"Detailed Customization",
		"Review & Save",
	];

	return (
		<div className="progress-indicator">
			<div className="progress-bar">
				<div
					className="progress-fill"
					style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
				/>
			</div>

			<div className="step-markers">
				{steps.map((stepLabel, index) => (
					<div
						key={index}
						className={`step-marker ${index <= currentStep ? "active" : ""}`}
					>
						<div className="marker-circle">{index + 1}</div>
						<div className="marker-label">{stepLabel}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProgressIndicator;
