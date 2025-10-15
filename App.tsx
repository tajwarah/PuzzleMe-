
import React, { createContext, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PuzzlePage from './pages/PuzzlePage';
import ExplorePage from './pages/ExplorePage';

// --- Sound Implementation ---
// Base64 encoded audio for portability
const sounds = {
  click: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAASAAAAAD8eALgA9AICn3//+94xABCAQdEBAkpCQERBQkBERUJCREFCREFAQkFBi8P/D/8f/x//H/8P/x//H/8P/x//D/8f/x//D/8f/x//D/8P/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/agAAAAA=',
  move: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAASAAAAAD8eALgA9AICn3//+54xADwAQdABAjpCQERBQkBERUJCREFCREFAQkFBi8P/D/8f/x//H/8P/x//H/8P/x//D/8f/x//D/8f/x//D/8P/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8P/x//H/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/8f/x//D/agAAAAA=',
  // Fix: Renamed `_win` to `win` for consistency and to fix the error.
  win: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAASAAAAAD8eALgA9AICn3//+xqxADEAQkAhAkRFA0REBgYGBgYEBAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgY-AmJkUGVhaW1wBgIANQwECgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/8AAEQgAyADIAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1VWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQEBQYHCAn/queousE4xXlAhGNAgUBgxAUHlI0oZgY3u1m3A99+lM+x3Zl8w3MmM5xjj8qLS0+y+Z+9Z9zZ57UuuaZ/a9r5PmeX8wbOM9qADRtQfUbfzZIjGckYPeopL+aG98kzqsbHGCvb3NSaXp/9m23leZv5JzjHWoXtPtFz5skMUnPDSAkj6UAT31xJDbM8MfmOMYHrTdGuZL2182YBWyRgdsU26tJJ7cxoQhxjKDAxTYNPkt7VIoZgrL/ABDkGgCe+lkt7dpIk3sP4RSWMrT2yPIu1jgketOkiLxFAxXIxkdRTYIvJjVMk4GMnvQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z'
};

// Custom hook to play sounds
const useSound = (src: string, volume = 0.5) => {
  const play = () => {
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play().catch(e => console.error("Audio playback failed:", e));
    } catch (e) {
      console.error("Could not play audio:", e);
    }
  };
  return play;
};

// Sound Context
interface SoundContextType {
  playClick: () => void;
  playMove: () => void;
  playWin: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playClick: () => {},
  playMove: () => {},
  playWin: () => {},
});

export const useSounds = () => useContext(SoundContext);

function App() {
  const soundValue = {
    playClick: useSound(sounds.click, 0.7),
    playMove: useSound(sounds.move, 0.8),
    playWin: useSound(sounds.win, 0.6),
  };

  return (
    <SoundContext.Provider value={soundValue}>
      <div className="min-h-screen font-sans text-[--theme-dark]">
        <header className="py-4">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <Link to="/" className="text-3xl sm:text-4xl font-black text-[--theme-primary] tracking-tighter hover:text-[#ff8a8a] transition-colors">
              PuzzleMe!
            </Link>
            <div className="space-x-2">
              <Link to="/" className="text-base sm:text-lg font-bold bg-[--theme-secondary] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md hover:bg-[#5fded6] transition transform hover:-translate-y-0.5">Create</Link>
              <Link to="/explore" className="text-base sm:text-lg font-bold bg-[--theme-light] text-[--theme-dark] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md hover:bg-gray-100 transition transform hover:-translate-y-0.5">Explore</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/puzzle/:id" element={<PuzzlePage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </SoundContext.Provider>
  );
}

export default App;
