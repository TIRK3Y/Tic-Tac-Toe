# Tic Tac Toe

A Tic Tac Toe game built with React. Two players take turns as X and O on the same device, the app detects the winner, and it tracks how many moves the winning game took along with a top-five list of fastest wins for the session. The repository also contains an in-progress Node.js/Express backend intended to add MongoDB persistence and real-time play over Socket.io.

## Features

- 3x3 board with alternating X and O turns
- Winner detection across all rows, columns, and diagonals
- Player name prompt on first load, with a "Change Player" button
- "Moves to win" counter and a top-five fastest-wins list for the current session
- Reset button to start a new game
- Socket.io client that emits each move to the backend and listens for `gameStateUpdate` events

## Tech stack

**Frontend**

| Package | Version |
|---------|---------|
| React / React DOM | ^18.2.0 |
| react-scripts (Create React App) | 5.0.1 |
| socket.io-client | ^4.7.2 |

**Backend (in progress)**

| Package | Version |
|---------|---------|
| Express | ^4.18.2 |
| Mongoose | ^7.5.3 |
| cors | ^2.8.5 |
| socket.io | ^4.7.2 (declared in the root `package.json`) |

## Getting started

### Prerequisites

- Node.js and npm
- MongoDB running locally on `mongodb://localhost:27017` (backend only)

### Frontend

```bash
npm install
npm start
```

The app opens at `http://localhost:3000`. It is fully playable without the backend; the Socket.io client will simply fail to connect.

To create a production build:

```bash
npm run build
```

### Backend

```bash
cd backend
npm install
node index.js
```

The server is configured to listen on port 5000, or on the port given by the `PORT` environment variable.

## Usage

- Click an empty square to place the current player's mark.
- The status panel shows the next player or the winner.
- Use "Reset" to clear the board and "Change Player" to set a new name.

## Project structure

```
.
├── src/
│   ├── App.js          # Game UI, state, scoring, Socket.io client
│   ├── Game.js         # calculateWinner and square rendering helpers
│   ├── GameBoard.js    # Board component (not currently used by App)
│   └── App.css
├── public/
└── backend/
    ├── index.js        # Express + Socket.io server, MongoDB connection
    ├── routes/games.js # REST endpoints to save and fetch a game state
    └── models/         # Intended for the GameState model
```

## Notes and limitations

- The backend is not yet runnable as committed: `index.js` requires `./routes/game` while the file is `routes/games.js`, and the routes require `../models/gameState`, but no Mongoose model is defined (`models/gamesStates.js` contains route code).
- The client emits `{ row, col, player }` but expects `gameStateUpdate` payloads with a `grid` field, so real-time sync is not functional yet.
- High scores are read from `localStorage` on load but are not written back, so they last only for the current session.
- `src/App.test.js` is the unmodified Create React App placeholder test and does not match the current UI.

## License

No license has been specified for this project.
