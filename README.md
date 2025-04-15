# Interactive Travel Itinerary Planner

An interactive web application that helps users plan personalized travel itineraries with AI assistance.

## Features

- Step-by-step itinerary planning process
- AI-generated travel recommendations
- Real-time streaming response
- Customizable itineraries
- Responsive design

## Project Structure

The project consists of two main parts:

- **Frontend**: React application built with Vite
- **Backend**: Express.js server that connects to OpenAI API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with your OpenAI API key:

   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=3001
   ```

4. Start the backend server:
   ```
   npm start
   ```

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

4. Open your browser and navigate to `http://localhost:5173`

## How It Works

The application flows through a 4-step process:

1. Basic Information: Users enter destination, dates, budget, and travelers
2. Activity Preferences: Users select activities they're interested in
3. Detailed Customization: Users can fine-tune their preferences
4. Review and Save: Final itinerary is displayed with the option to save

During the detailed customization step, the frontend makes API calls to the backend, which then streams AI-generated itinerary content back to the user.

## API Endpoints

- `GET /`: Health check endpoint
- `POST /api/itinerary/generate`: Generates itinerary with OpenAI

## Technology Stack

- **Frontend**:

  - React
  - CSS
  - Vite

- **Backend**:
  - Express.js
  - OpenAI API

## Notes

- The `.env` file containing your OpenAI API key is excluded from Git in the `.gitignore` file
- For development, the frontend and backend should be running simultaneously
