import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import openai from "./openai.js"; // Your configured OpenAI client

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Use PORT from .env or default to 3001

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Basic route for testing server
app.get("/", (req, res) => {
	res.send("Travel Itinerary Backend is running!");
});

// --- Itinerary Generation Endpoint ---
app.post("/api/itinerary/generate", async (req, res) => {
	const {
		destination,
		startDate,
		endDate,
		budget,
		travelers,
		activities, // e.g., ["Cultural & Museums", "Food & Culinary"]
		pace, // e.g., "balanced"
		accommodation, // e.g., "Hotel"
		customizations, // e.g., ["More Food Experiences", "Add Relaxation Time"]
		transportation, // e.g., "Public Transportation"
		specialRequests, // e.g., "Focus on vegetarian food options"
		includeBreakfast, // boolean
		includeAirportTransfer, // boolean
		currentStep, // Number indicating the current step in the frontend UI
		previousText, // String containing the itinerary text generated so far
	} = req.body;

	// --- Basic Input Validation ---
	if (!destination) {
		return res.status(400).json({ error: "Destination is required." });
	}

	// --- Construct the Context-Aware Prompt for OpenAI ---
	let systemMessage = `You are a helpful travel planning assistant. Generate a detailed day-by-day travel itinerary based *only* on the information provided by the user so far. Do not invent details or sections for which information hasn't been given (e.g., don't suggest activities if none are selected). Maintain markdown formatting.`;
	let userPrompt = ""; // Initialize empty prompt
	let isFinalGeneration = currentStep === 3; // Check if it's the final review step

	// --- Build Base Details String (used in both initial and final generation) ---
	let baseDetails = `Destination: ${destination}\n`;
	if (startDate && endDate)
		baseDetails += `- Dates: ${startDate} to ${endDate}\n`;
	if (budget) baseDetails += `- Budget Level: ${budget}\n`;
	if (travelers) baseDetails += `- Number of Travelers: ${travelers}\n`;
	if (pace) baseDetails += `- Desired Pace: ${pace}\n`;
	if (accommodation)
		baseDetails += `- Preferred Accommodation: ${accommodation}\n`;
	if (activities && activities.length > 0)
		baseDetails += `- Interests/Activities: ${activities.join(", ")}\n`;
	if (customizations && customizations.length > 0)
		baseDetails += `- Specific Customizations: ${customizations.join(", ")}\n`;
	if (transportation)
		baseDetails += `- Local Transportation Preference: ${transportation}\n`;
	if (includeBreakfast) baseDetails += `- Include breakfast in planning.\n`;
	if (includeAirportTransfer)
		baseDetails += `- Include airport transfers in planning.\n`;
	if (specialRequests)
		baseDetails += `- Special Requests: ${specialRequests}\n`;

	// --- Logic based on Step ---

	if (isFinalGeneration) {
		// **** FINAL GENERATION (Step 3: Review & Save) ****
		console.log("--- Generating FINAL Itinerary ---");
		systemMessage = `You are a helpful travel planning assistant. Generate a complete, detailed, and polished day-by-day travel itinerary based on ALL the user's final selections provided below. Ensure the output is well-structured using markdown, engaging, and ready for the user to save.`;
		userPrompt = `Generate a complete and polished travel itinerary using all the following details:

${baseDetails}
Provide a comprehensive day-by-day plan including suggested activities, timings, and meal suggestions based on the user's preferences.`;
	} else if (currentStep > 0 && previousText) {
		// **** INCREMENTAL UPDATE (Steps 1, 2) ****
		console.log("--- Generating INCREMENTAL Update --- Step:", currentStep);
		systemMessage = `You are a helpful travel planning assistant, incrementally updating a travel itinerary. The user has provided information up to step ${
			currentStep - 1
		} and is now viewing step ${currentStep}. Update the itinerary based *only* on the information gathered in the *previous* step (step ${
			currentStep - 1
		}) as summarized below. Do not add sections for step ${currentStep} yet. Do not repeat previous sections unless they are directly modified. Maintain markdown formatting.`;

		let updateInstruction = `The user has just completed step ${
			currentStep - 1
		}. Integrate the following information from that step:`;

		switch (currentStep) {
			case 1: // Just finished Basic Info (step 0)
				updateInstruction = `User finished entering basic info (Destination: ${destination}, Dates: ${startDate}-${endDate}, Travelers: ${travelers}, Budget: ${budget}). Refine the initial itinerary structure (e.g., add day headers based on dates if available). Do not add activities.`;
				break;
			case 2: // Just finished Activity Preferences (step 1)
				updateInstruction = `User finished selecting activity preferences (Step 1). Activities: ${
					activities?.join(", ") || "None"
				}, Pace: ${
					pace || "Not specified"
				}. Update the daily activities based *only* on this.`;
				break;
			// Step 3 is handled by isFinalGeneration block now
			default:
				updateInstruction =
					"Incorporate the latest user inputs from the previous step.";
		}

		userPrompt = `Here is the itinerary generated so far (up to step ${
			currentStep - 2
		}):
---
${previousText}
---

${updateInstruction}
Generate *only* the new or modified text based on the instructions for completing step ${
			currentStep - 1
		}.`;
	} else {
		// **** INITIAL GENERATION (Step 0) ****
		console.log("--- Generating INITIAL Itinerary --- Step:", currentStep);
		systemMessage = `You are a helpful travel planning assistant. Generate the very beginning of a travel itinerary based *only* on the user-provided destination.`; // Simplified system message
		userPrompt = `Generate the initial welcome message for a trip itinerary to ${destination}. Just provide a brief welcome message. Do not add days or activities yet. Format using markdown.`;
	}

	console.log("--- Sending Prompt to OpenAI ---");
	console.log("System:", systemMessage);
	console.log("User:", userPrompt);
	console.log("----------------------------------");

	try {
		const stream = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content: systemMessage, // Use the potentially modified system message
				},
				{ role: "user", content: userPrompt }, // Use the potentially modified user prompt
			],
			stream: true,
		});

		// Set headers for Server-Sent Events (SSE)
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");
		res.flushHeaders(); // Flush the headers to establish the connection

		console.log("Streaming response started...");

		for await (const chunk of stream) {
			const content = chunk?.choices?.[0]?.delta?.content;
			if (content) {
				// Format as SSE: data: {chunk}

				res.write(`data: ${JSON.stringify({ content })}\n\n`);
			}
		}

		console.log("Streaming response finished.");
		res.write("data: [DONE]\n\n"); // Signal stream end (optional, useful for frontend)
		res.end();
	} catch (error) {
		console.error("Error calling OpenAI API:", error);
		// Avoid setting headers again if already sent
		if (!res.headersSent) {
			res.status(500).json({
				error: "Failed to generate itinerary",
				details: error.message,
			});
		} else {
			// If headers are sent, we can't send a JSON error, just end the stream abruptly.
			console.error("Headers already sent, ending stream due to error.");
			res.end();
		}
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Backend server listening on http://localhost:${port}`);
});
