# Chess Training App

## Overview

This is a full stack web application designed for chess players to improve their game by analyzing their recent mistakes on Chess.com. The app utilizes Stockfish analysis and data from Chess.com to identify and highlight the biggest mistakes made by a user in a given time period. The mistakes are determined based on an algorithm that factors in the differences in Stockfish scores between moves, weighing mistakes more heavily the closer they are to an equal position.
Players can save their created puzzlesets to a database and replay them from the application.

The application is built with the following technologies:
- **Frontend:** React
- **Backend:** FastAPI
- **Database:** MongoDB
- **Deployment:** Render.com

## Features

- **Chess.com Integration:** Fetches user data and recent games using Chess.com API.
- **Stockfish Analysis:** Uses Stockfish to analyze each move in a game and calculate move scores.
- **Mistake Detection Algorithm:** Identifies critical mistakes by comparing Stockfish scores between moves.
- **Puzzle play:** Allows users to take their critical mistakes and play puzzles based on them.
- **Puzzleset history:** Users can replay their mistakes from past periods and measure up their skill to their earlier selves.

## Prerequisites

Before running the application locally, ensure you have the following installed:

- Node.js and npm (for React frontend)
- Python (for FastAPI backend)
- MongoDB (either local installation or a MongoDB service)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Frontend (React)

1. Navigate to the `puzzles-saver-app` directory:
cd puzzles-saver-app

2. Install dependencies:
npm install

3. Create a `.env` file in the `puzzles-saver-app` directory with the following content:
VITE_BACKEND_BASE_URL=http://127.0.0.1:8000 # Replace with your FastAPI backend URL

5. Start the React development server:
npm start

5. Open your browser and visit `http://localhost:3000` to view the application.

### Backend (FastAPI)

1. Navigate to the `backend` directory:
cd backend

2. Create a virtual environment (optional but recommended):
python -m venv venv source venv/bin/activate # On Windows use venv\Scripts\activate

3. Install dependencies:
pip install -r requirements.txt

4. Install stockfish from the stockfish website

5. Set up environment variables:
Create a `.env` file in the `backend` directory with the following content:
MONGO_DB_USER = user0  # Replace with a MongoDB user
MONGO_DB_PASSWORD = password #  Replace with the password for the MongoDB user above
STOCKFISH = C:\Users\stockfish.exe  # Replace with the filepath to your local stockfish installation

5. Run the FastAPI server:
uvicorn main
--reload

6. The FastAPI server will start at `http://localhost:8000`.

## Deployment

The application is deployed on Render.com. Follow these steps to deploy your own instance:

The frontend is deployed here: https://chess-puzzles-saver-frontend.onrender.com/

The backend is deployed here: https://chess-puzzles-saver.onrender.com/

Depending on when you try to access the deployed site it may not work due to inactivity, either from the render.com deployments or the underlying MongoDB database.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Stockfish:** Open-source chess engine used for move analysis.
- **Chess.com API:** Provides access to user data and game history.
