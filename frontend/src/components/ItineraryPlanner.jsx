import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ProgressIndicator from "./ProgressIndicator";
import BasicInfo from "./steps/BasicInfo";
import ActivityPreferences from "./steps/ActivityPreferences";
import DetailedCustomization from "./steps/DetailedCustomization";
import ReviewSave from "./steps/ReviewSave";
import StreamingTextPanel from "./StreamingTextPanel";
import "./ItineraryPlanner.css";

// Define backend URL
const BACKEND_URL = "http://localhost:3001";

const STEPS = {
	BASIC_INFO: 0,
	ACTIVITY_PREFERENCES: 1,
	DETAILED_CUSTOMIZATION: 2,
	REVIEW_SAVE: 3,
};

// Debounce function
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

const ItineraryPlanner = () => {
	const [currentStep, setCurrentStep] = useState(STEPS.BASIC_INFO);
	const [itineraryData, setItineraryData] = useState({
		destination: "",
		startDate: "",
		endDate: "",
		budget: "",
		travelers: 1,
		activities: [],
		pace: "balanced",
		accommodation: "",
		customizations: [],
		transportation: "",
		specialRequests: "",
		includeBreakfast: false,
		includeAirportTransfer: false,
	});
	const [streaming, setStreaming] = useState(false);
	const [streamingText, setStreamingText] = useState(
		"Please fill in the details to start planning your itinerary."
	);
	const abortControllerRef = useRef(null);
	const isFetchingRef = useRef(false); // Ref to track ongoing fetch

	const updateItineraryData = (newData) => {
		setItineraryData((prev) => ({ ...prev, ...newData }));
		// Don't automatically fetch here anymore. Fetch happens on step change.
	};

	// --- Real Fetch Function ---
	const fetchStreamingItinerary = useCallback(
		async (dataToFetch, step, currentText) => {
			// If already fetching, let the ongoing one finish unless destination changed?
			// For now, let's prevent concurrent fetches entirely with a ref.
			if (isFetchingRef.current) {
				console.log("Fetch already in progress, skipping new request.");
				return;
			}

			// Abort previous CONTROLLER if it exists (from a previous, completed/aborted fetch)
			// This doesn't abort the *current* fetch logic below handles that.
			if (abortControllerRef.current) {
				// abortControllerRef.current.abort(); // Let's not abort previous streams for now, focus on preventing concurrent starts
			}
			abortControllerRef.current = new AbortController();
			const { signal } = abortControllerRef.current;

			isFetchingRef.current = true; // Mark as fetching
			setStreaming(true);

			// *** Only clear text on the very first fetch (Step 0) ***
			if (
				step === STEPS.BASIC_INFO &&
				currentText ===
					"Please fill in the details to start planning your itinerary."
			) {
				console.log("Clearing initial placeholder text.");
				setStreamingText("");
			}

			try {
				const payload = {
					...dataToFetch,
					currentStep: step,
					// Use a closure to get the latest text when the fetch actually runs
					previousText: streamingText, // Pass the text state at the moment of fetch call
				};
				console.log("Fetching itinerary with payload:", payload);
				const response = await fetch(`${BACKEND_URL}/api/itinerary/generate`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "text/event-stream",
					},
					body: JSON.stringify(payload),
					signal,
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					console.error(
						"Error response from server:",
						response.status,
						errorData
					);
					setStreamingText(
						`Error: ${
							errorData.error || response.statusText || "Failed to start stream"
						}`
					);
					setStreaming(false);
					isFetchingRef.current = false; // Unmark fetching on error
					return;
				}

				if (!response.body) {
					isFetchingRef.current = false; // Unmark fetching on error
					throw new Error("Response body is null");
				}

				// --- Stream Processing (Append) ---
				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let buffer = "";

				while (true) {
					// Check signal before reading
					if (signal.aborted) {
						console.log("Fetch aborted during streaming");
						// Ensure reader is released if fetch is aborted mid-stream
						await reader.cancel();
						break;
					}

					const { done, value } = await reader.read();
					if (done) {
						console.log("Stream finished.");
						break;
					}

					buffer += decoder.decode(value, { stream: true });
					// console.log("Received raw chunk:", buffer); // Less verbose logging

					let boundary = buffer.indexOf("\n\n");
					while (boundary !== -1) {
						const message = buffer.substring(0, boundary);
						buffer = buffer.substring(boundary + 2);

						if (message.startsWith("data: ")) {
							const dataString = message.substring(6);

							if (dataString.trim() === "[DONE]") {
								console.log("Received [DONE] signal.");
								continue;
							}

							try {
								const parsedData = JSON.parse(dataString);
								if (parsedData.content) {
									setStreamingText((prev) => prev + parsedData.content);
								}
							} catch (e) {
								console.error("Failed to parse SSE data chunk:", dataString, e);
							}
						}
						boundary = buffer.indexOf("\n\n");
					}
				}
			} catch (error) {
				if (error.name === "AbortError") {
					// This is caught when the fetch signal itself is aborted before/during request
					console.log("Fetch aborted by signal");
				} else {
					console.error("Error fetching streaming itinerary:", error);
					setStreamingText(
						`An error occurred while fetching the itinerary: ${error.message}`
					);
				}
			} finally {
				setStreaming(false);
				isFetchingRef.current = false; // Unmark fetching
				abortControllerRef.current = null; // Clear the controller for this completed/aborted fetch
				console.log("Streaming set to false, fetch marked as done.");
			}
		},
		[]
	);

	// --- Trigger Fetch Logic ---
	// Use a separate useEffect for destination changes to potentially clear text
	useEffect(() => {
		if (itineraryData.destination) {
			console.log("Destination changed, preparing initial fetch.");
			setStreamingText("");
			if (isFetchingRef.current && abortControllerRef.current) {
				console.log("Aborting ongoing fetch due to destination change.");
				abortControllerRef.current.abort();
			}
			if (currentStep === STEPS.BASIC_INFO) {
				// Pass the current itineraryData, the specific step, and empty string for text
				fetchStreamingItinerary(itineraryData, STEPS.BASIC_INFO, "");
			}
		} else {
			setStreamingText(
				"Please enter a destination to start planning your itinerary."
			);
			setStreaming(false);
			if (isFetchingRef.current && abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		}
	}, [itineraryData.destination]);

	// Use another useEffect to trigger fetch ONLY on step changes
	useEffect(() => {
		// Don't fetch if destination is missing
		if (!itineraryData.destination) return;

		// Fetch for steps 1, 2
		if (currentStep >= 1 && currentStep <= 2) {
			console.log(
				`Arrived at step ${currentStep}, triggering incremental fetch.`
			);
			// Fetch incrementally for steps 1 and 2
			fetchStreamingItinerary(itineraryData, currentStep, streamingText);
		} else if (currentStep === STEPS.REVIEW_SAVE) {
			console.log(
				`Arrived at step ${currentStep} (Review), triggering FINAL fetch.`
			);
			// *** Clear previous text before starting final generation ***
			setStreamingText("");
			// Trigger the final fetch (backend handles this step differently)
			fetchStreamingItinerary(itineraryData, currentStep, ""); // Pass empty string as previousText for final generation
		}

		// Cleanup function for aborting if component unmounts during fetch
		return () => {
			if (isFetchingRef.current && abortControllerRef.current) {
				console.log("Aborting fetch on component unmount/step change cleanup.");
				abortControllerRef.current.abort();
			}
		};
		// Depend on step and destination.
	}, [currentStep, itineraryData.destination]);

	const handleNext = () => {
		if (currentStep < STEPS.REVIEW_SAVE) {
			// Just update the step. The useEffect listening to currentStep will trigger the fetch.
			setCurrentStep(currentStep + 1);
			console.log(`Moving to step ${currentStep + 1}`);
		}
	};

	const handleBack = () => {
		if (currentStep > STEPS.BASIC_INFO) {
			// Just update the step. Fetch logic might re-run based on useEffect.
			setCurrentStep(currentStep - 1);
			console.log(`Moving to step ${currentStep - 1}`);
			// We might want to clear the *part* of the itinerary generated for the step we left,
			// but that requires more complex state management lol. For now, going back won't re-fetch.
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case STEPS.BASIC_INFO:
				return (
					<BasicInfo data={itineraryData} onUpdate={updateItineraryData} />
				);
			case STEPS.ACTIVITY_PREFERENCES:
				return (
					<ActivityPreferences
						data={itineraryData}
						onUpdate={updateItineraryData}
					/>
				);
			case STEPS.DETAILED_CUSTOMIZATION:
				return (
					<DetailedCustomization
						data={itineraryData}
						onUpdate={updateItineraryData}
					/>
				);
			case STEPS.REVIEW_SAVE:
				return (
					<ReviewSave data={itineraryData} itineraryText={streamingText} />
				);
			default:
				return null;
		}
	};

	return (
		<div className="itinerary-planner">
			<ProgressIndicator currentStep={currentStep} totalSteps={4} />

			<div className="planner-content">
				<div className="input-section">
					<div className="step-content">{renderStep()}</div>
					<div className="navigation-buttons">
						{currentStep > STEPS.BASIC_INFO && (
							<button onClick={handleBack} className="button-secondary">
								Back
							</button>
						)}
						{currentStep === STEPS.BASIC_INFO && (
							<div style={{ flexGrow: 1 }}></div>
						)}
						{currentStep < STEPS.REVIEW_SAVE ? (
							<button
								onClick={handleNext}
								disabled={!itineraryData.destination}
								className="button-primary"
							>
								Next
							</button>
						) : (
							<button className="button-primary">Save Itinerary</button>
						)}
					</div>
				</div>

				<div className="output-section">
					<StreamingTextPanel text={streamingText} isLoading={streaming} />
				</div>
			</div>
		</div>
	);
};

export default ItineraryPlanner;
