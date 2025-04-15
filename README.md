# Interactive Itinerary Planner

A full-stack travel itinerary planning application that uses AI to generate personalized travel plans based on user preferences and requirements.

Note: for some reason, deleting the package.json and package-lock.json in the
root directory causes the personalized itinerary to have some issues with
generating after the destination has been inputted. I'm aware this needs to be
debugged at some point since the dependencies are separately managed within
frontend and backend, but until time permits... if it works don't fix it haha

## Features

- Guided multi-step interface for creating a personalized travel itinerary
- Real-time streaming text output with typewriter effect powered by GPT-4o
- Responsive layout that works on both desktop and mobile devices
- Interactive preference selectors for activities and customizations
- Downloadable itinerary in text format
- Backend API with streaming responses for real-time itinerary generation
- Environment-based configuration for secure API key management

## Project Structure

The project is split into two main components:

### Frontend (`/frontend`)

- React.js application built with Vite
- Modern, responsive UI with vanilla CSS
- Real-time streaming integration with backend
- Step-by-step itinerary creation process

### Backend (`/backend`)

- Express.js server
- OpenAI GPT-4o integration
- Streaming response handling
- Environment-based configuration

## How It Works

The application guides users through a four-step process:

1. **Basic Info** - Users enter their destination, travel dates, budget level, and number of travelers
2. **Activity Preferences** - Users select their activity interests and preferences
3. **Detailed Customization** - Users can make specific adjustments to their itinerary
4. **Review & Save** - Users can review, download, or share their generated itinerary

## Tech Stack

### Frontend

- React.js (with hooks)
- CSS (vanilla, no external UI libraries)
- Vite.js for build tooling

### Backend

- Node.js
- Express.js
- OpenAI GPT-4o API
- dotenv for environment management
- CORS enabled for frontend communication

## Setup and Running

### Prerequisites

- Node.js (v20+ recommended)
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## API Endpoints

- `POST /api/itinerary/generate` - Generates a streaming itinerary response based on user inputs
  - Accepts JSON body with user preferences and current step information
  - Returns Server-Sent Events (SSE) stream of the generated itinerary
