const express = require('express');
const router = express.Router();
const GameState = require('../models/gameState');
const socketIo = require('socket.io');

// Function to emit game state updates to connected clients
const emitGameStateUpdate = (roomId, gameState) => {
  const io = socketIo();
  io.to(roomId).emit('gameStateUpdate', gameState);
};

// Endpoint to save game state
router.post('/', async (req, res) => {
  try {
    const gameStateData = req.body;
    const newGameState = new GameState(gameStateData);
    await newGameState.save();

    // Emit game state update to all clients in the room
    emitGameStateUpdate(newGameState._id, newGameState);

    res.status(201).json(newGameState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to retrieve game state by ID
router.get('/:id', async (req, res) => {
  try {
    const gameState = await GameState.findById(req.params.id);
    if (!gameState) {
      return res.status(404).json({ message: 'Game state not found' });
    }
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
