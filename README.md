# Interactive Itinerary Planner

A proof-of-concept for an interactive, step-by-step travel itinerary planner with a streaming text UI, simulating integration with a Large Language Model.

## Features

- Guided multi-step interface for creating a personalized travel itinerary
- Real-time streaming text output with typewriter effect to simulate LLM responses
- Responsive layout that works on both desktop and mobile devices
- Interactive preference selectors for activities and customizations
- Downloadable itinerary in text format

## How It Works

The application guides users through a four-step process:

1. **Basic Info** - Users enter their destination, travel dates, budget level, and number of travelers
2. **Activity Preferences** - Users select their activity interests and preferences
3. **Detailed Customization** - Users can make specific adjustments to their itinerary
4. **Review & Save** - Users can review, download, or share their generated itinerary

## Tech Stack

- React.js (with hooks)
- CSS (vanilla, no external UI libraries)
- Vite.js for build tooling

## Running the Application

1. Ensure you have Node.js installed (v14+ recommended)
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Future Enhancements

- Integration with an actual streaming LLM API
- Expanded destination database
- Proper PDF export functionality
- User accounts and saved itineraries
- Integration with hotel, flight, and activity booking systems
- Social sharing features
