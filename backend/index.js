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
	} = req.body;

	// --- Basic Input Validation (Optional but Recommended) ---
	if (!destination) {
		return res.status(400).json({ error: "Destination is required." });
	}

	// --- Construct the Prompt for OpenAI ---
	let prompt = `Generate a detailed day-by-day travel itinerary for a trip to ${destination}.

Details:
`;
	if (startDate && endDate) prompt += `- Dates: ${startDate} to ${endDate}\n`;
	if (budget) prompt += `- Budget Level: ${budget}\n`;
	if (travelers) prompt += `- Number of Travelers: ${travelers}\n`;
	if (pace) prompt += `- Desired Pace: ${pace}\n`;
	if (accommodation) prompt += `- Preferred Accommodation: ${accommodation}\n`;
	if (activities && activities.length > 0)
		prompt += `- Interests/Activities: ${activities.join(", ")}\n`;
	if (customizations && customizations.length > 0)
		prompt += `- Specific Customizations: ${customizations.join(", ")}\n`;
	if (transportation)
		prompt += `- Local Transportation Preference: ${transportation}\n`;
	if (includeBreakfast) prompt += `- Include breakfast in planning.\n`;
	if (includeAirportTransfer)
		prompt += `- Include airport transfers in planning.\n`;
	if (specialRequests) prompt += `- Special Requests: ${specialRequests}\n`;

	prompt += `
Provide a structured itinerary with headings for each day (e.g., "Day 1: Arrival and Exploration"). 
For each day, list specific activities, potential timings (morning, afternoon, evening), and suggestions for meals or breaks. 
Keep the tone engaging and helpful for a traveler. Format the output clearly using markdown.`;

	console.log("--- Sending Prompt to OpenAI ---");
	console.log(prompt);
	console.log("----------------------------------");

	try {
		const stream = await openai.responses.create({
			model: "gpt-4.1",
			input: [
				{
					role: "system",
					content: "You are a helpful travel planning assistant.",
				},
				{ role: "user", content: prompt },
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
