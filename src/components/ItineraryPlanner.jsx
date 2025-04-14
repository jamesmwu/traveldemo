import { useState, useEffect } from "react";
import ProgressIndicator from "./ProgressIndicator";
import BasicInfo from "./steps/BasicInfo";
import ActivityPreferences from "./steps/ActivityPreferences";
import DetailedCustomization from "./steps/DetailedCustomization";
import ReviewSave from "./steps/ReviewSave";
import StreamingTextPanel from "./StreamingTextPanel";
import {
	getDestinationData,
	generateDayByDayItinerary,
	budgetEstimates,
	getRandomItems,
	mockItineraryUpdates,
} from "../data/mockData";
import "./ItineraryPlanner.css";

const STEPS = {
	BASIC_INFO: 0,
	ACTIVITY_PREFERENCES: 1,
	DETAILED_CUSTOMIZATION: 2,
	REVIEW_SAVE: 3,
};

const ItineraryPlanner = () => {
	const [currentStep, setCurrentStep] = useState(STEPS.BASIC_INFO);
	const [itineraryData, setItineraryData] = useState({
		destination: "",
		startDate: "",
		endDate: "",
		budget: "",
		travelers: 1,
		activities: [],
		preferences: [],
		customizations: [],
	});
	const [streaming, setStreaming] = useState(false);
	const [streamingText, setStreamingText] = useState("");
	const [generatedItinerary, setGeneratedItinerary] = useState(null);

	const updateItineraryData = (newData) => {
		setItineraryData((prev) => ({ ...prev, ...newData }));
	};

	const handleNext = () => {
		if (currentStep < STEPS.REVIEW_SAVE) {
			setStreaming(true);
			setCurrentStep(currentStep + 1);
			console.log(`Moving to step ${currentStep + 1}`); // Debug log
		}
	};

	const handleBack = () => {
		if (currentStep > STEPS.BASIC_INFO) {
			setCurrentStep(currentStep - 1);
			console.log(`Moving to step ${currentStep - 1}`); // Debug log
		}
	};

	// Generate the appropriate streaming content based on the current step
	const getResponseForStep = (step) => {
		const destinationData = getDestinationData(itineraryData.destination || "");
		const duration = getDuration();

		switch (step) {
			case STEPS.BASIC_INFO:
				return `Let's plan your adventure in ${
					itineraryData.destination || "your destination"
				}! 

We'll help you create a perfect itinerary for your ${duration} day trip from ${formatDate(
					itineraryData.startDate
				)} to ${formatDate(itineraryData.endDate)}. 

With a ${
					itineraryData.budget || "flexible"
				} budget, we'll find the best experiences for ${
					itineraryData.travelers || 1
				} traveler(s).

${
	itineraryData.destination
		? `Fun fact: ${getRandomItems(destinationData.funFacts, 1)[0]}`
		: ""
}`;

			case STEPS.ACTIVITY_PREFERENCES:
				return `Based on your preferences, here's what we recommend for your trip to ${
					itineraryData.destination || "your destination"
				}:

${generateDailyItineraryPreview(destinationData, 2)}`;

			case STEPS.DETAILED_CUSTOMIZATION:
				// Generate a more detailed itinerary with customizations
				const updatedItinerary = generateDayByDayItinerary(
					itineraryData.destination || "",
					Math.min(duration, 7), // Limit to 7 days for preview
					itineraryData.activities
				);

				// Save the generated itinerary for later use
				setGeneratedItinerary(updatedItinerary);

				return formatItineraryText(updatedItinerary, itineraryData);

			case STEPS.REVIEW_SAVE:
				return `Your ${duration}-day itinerary for ${
					itineraryData.destination || "your destination"
				} is ready!

Highlights include:
${
	destinationData.activities.length > 0
		? getRandomItems(destinationData.activities, 3)
				.map((act) => `- ${act}`)
				.join("\n")
		: "- Explore local attractions\n- Experience local cuisine\n- Discover hidden gems"
}

Estimated Budget Breakdown (per person):
- Accommodation: ${
					(
						budgetEstimates[itineraryData.budget] ||
						budgetEstimates["Mid-range"]
					).accommodation
				}
- Food: ${
					(
						budgetEstimates[itineraryData.budget] ||
						budgetEstimates["Mid-range"]
					).food
				}
- Activities: ${
					(
						budgetEstimates[itineraryData.budget] ||
						budgetEstimates["Mid-range"]
					).activities
				}
- Transportation: ${
					(
						budgetEstimates[itineraryData.budget] ||
						budgetEstimates["Mid-range"]
					).transportation
				}

${
	itineraryData.accommodation
		? `Recommended Accommodation: ${itineraryData.accommodation}`
		: "We suggest choosing accommodation based on your preferences."
}

This trip aligns perfectly with your preferences for ${
					itineraryData.activities && itineraryData.activities.length > 0
						? itineraryData.activities.join(", ")
						: "various activities and experiences"
				}.`;

			default:
				return "Planning your trip...";
		}
	};

	// Mock function to simulate streaming text from an LLM API
	const simulateStreamingResponse = (step) => {
		setStreaming(true);
		setStreamingText("");

		const fullText = getResponseForStep(step);
		let i = 0;

		const interval = setInterval(() => {
			if (i <= fullText.length) {
				setStreamingText(fullText.substring(0, i));
				i += 5; // Faster typing speed for demo purposes
			} else {
				clearInterval(interval);
				setStreaming(false);
			}
		}, 15); // Shorter interval for smoother animation
	};

	useEffect(() => {
		// Trigger streaming text when step changes (except for the initial render)
		if (currentStep === STEPS.BASIC_INFO && streamingText === "") {
			// Don't stream on first load
			return;
		}

		simulateStreamingResponse(currentStep);
	}, [currentStep]);

	// Helper functions for formatting and data handling
	const getDuration = () => {
		if (!itineraryData.startDate || !itineraryData.endDate) return 7;
		const start = new Date(itineraryData.startDate);
		const end = new Date(itineraryData.endDate);
		const difference = end.getTime() - start.getTime();
		return Math.ceil(difference / (1000 * 3600 * 24)) || 7;
	};

	const formatDate = (dateString) => {
		if (!dateString) return "TBD";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	// Helper to generate a short daily itinerary preview
	const generateDailyItineraryPreview = (destinationData, dayCount) => {
		let previewText = "";

		previewText += `Day 1: Arrival and Settling In\n`;
		previewText += `- Check into your accommodations\n`;
		previewText += `- Take a leisurely stroll to explore the immediate area\n`;
		previewText += `- Enjoy a welcome dinner at a local restaurant\n\n`;

		for (let day = 2; day <= dayCount + 1; day++) {
			const activities = getRandomItems(destinationData.activities, 3);
			const dining = getRandomItems(destinationData.dining, 1)[0];

			previewText += `Day ${day}: Exploration\n`;
			activities.forEach((activity) => {
				previewText += `- ${activity}\n`;
			});
			previewText += `- ${dining}\n\n`;
		}

		return previewText;
	};

	// Format detailed itinerary as text
	const formatItineraryText = (itinerary, userData) => {
		let text = `We've refined your itinerary with your customizations:\n\n`;

		itinerary.forEach((day) => {
			text += `Day ${day.day}: ${day.title}\n`;
			day.activities.forEach((activity) => {
				text += `- ${activity}\n`;
			});
			text += "\n";
		});

		// Add customization notes if present
		if (userData.customizations && userData.customizations.length > 0) {
			text += "Special customizations included:\n";
			userData.customizations.forEach((customization) => {
				text += `- ${customization}\n`;
			});
		}

		return text;
	};

	// Render the appropriate step component
	const renderStep = () => {
		switch (currentStep) {
			case STEPS.BASIC_INFO:
				return (
					<BasicInfo
						itineraryData={itineraryData}
						updateItineraryData={updateItineraryData}
						onNext={handleNext}
						setStreamingText={setStreamingText}
						mockItineraryUpdates={mockItineraryUpdates}
					/>
				);
			case STEPS.ACTIVITY_PREFERENCES:
				return (
					<ActivityPreferences
						itineraryData={itineraryData}
						updateItineraryData={updateItineraryData}
						onNext={handleNext}
						onBack={handleBack}
						setStreamingText={setStreamingText}
						mockItineraryUpdates={mockItineraryUpdates}
					/>
				);
			case STEPS.DETAILED_CUSTOMIZATION:
				return (
					<DetailedCustomization
						itineraryData={itineraryData}
						updateItineraryData={updateItineraryData}
						onNext={handleNext}
						onBack={handleBack}
						setStreamingText={setStreamingText}
						mockItineraryUpdates={mockItineraryUpdates}
					/>
				);
			case STEPS.REVIEW_SAVE:
				return (
					<ReviewSave
						itineraryData={itineraryData}
						generatedItinerary={generatedItinerary}
						onBack={handleBack}
					/>
				);
			default:
				return (
					<BasicInfo
						itineraryData={itineraryData}
						updateItineraryData={updateItineraryData}
						onNext={handleNext}
						setStreamingText={setStreamingText}
						mockItineraryUpdates={mockItineraryUpdates}
					/>
				);
		}
	};

	return (
		<div className="itinerary-planner">
			<ProgressIndicator
				currentStep={currentStep}
				totalSteps={Object.keys(STEPS).length}
			/>

			<div className="guidance-message">
				<p>
					Complete each step and click Continue to build your personalized
					travel itinerary
				</p>
			</div>

			<div className="planner-content">
				<div className="input-section">{renderStep()}</div>
				<div className="output-section">
					<StreamingTextPanel text={streamingText} isStreaming={streaming} />
				</div>
			</div>
		</div>
	);
};

export default ItineraryPlanner;
