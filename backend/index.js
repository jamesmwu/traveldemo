import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const client = new OpenAI();
const instructions = `
You are explaining stock market movements to the average person who doesn't understand financial jargon or even the basics of the stock market. 

Keep these rules:
1. Explain WHY the stock/market is moving in simple, everyday language
2. No technical details or numbers (no prices, percentages, ratios, etc.)
3. Focus on news events, company announcements, or world events from the past one or two days that may be affecting the stock
4. Keep it under 100 words
5. Write in a casual, conversational tone

Example: "Apple stock is up because they just announced a new iPhone that's getting great reviews, and people are excited about its new features."

Remember, you should only be using sources from the past one or two days. This is VERY IMPORTANT.
`;

async function getMarketAnalysis(stockSymbol) {
	try {
		const response = await client.responses.create({
			model: "gpt-4o",
			tools: [{ type: "web_search_preview" }],
			instructions: instructions,
			input: [
				{
					role: "developer",
					content: instructions,
				},
				{
					role: "user",
					content: `Why is ${stockSymbol} moving today? Explain it simply, obeying the following instructions: ${instructions}`,
				},
			],
		});

		console.log(response.output_text);
		return response.output_text;
	} catch (error) {
		console.error("Error calling OpenAI:", error);
		return "Error generating market analysis. Please try again later.";
	}
}

// API endpoint to get market analysis for a specific stock
app.post("/api/market-analysis", async (req, res) => {
	const { stockSymbol } = req.body;

	if (!stockSymbol) {
		return res.status(400).json({ error: "Stock symbol is required" });
	}

	try {
		const analysis = await getMarketAnalysis(stockSymbol);
		res.json({ analysis });
	} catch (error) {
		console.error("Error in market analysis endpoint:", error);
		res.status(500).json({ error: "Failed to generate market analysis" });
	}
});

// Default endpoint to test if API is running
app.get("/", (req, res) => {
	res.send("Stock Market Analysis API is running");
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
