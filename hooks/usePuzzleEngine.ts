import { useState, useEffect, useCallback } from 'react';
import type { Puzzle, Piece } from '../types';

// Generates a solvable shuffled board state
const createSolvableShuffle = (difficulty: number): number[] => {
  const size = difficulty * difficulty;
  let tiles = Array.from({ length: size }, (_, i) => i);
  let emptyIndex = size - 1;

  // Perform a random walk with the empty tile to shuffle, ensuring solvability
  const shuffles = size * 20; 
  for (let i = 0; i < shuffles; i++) {
    const neighbors = [];
    const row = Math.floor(emptyIndex / difficulty);
    const col = emptyIndex % difficulty;

    if (row > 0) neighbors.push(emptyIndex - difficulty); // Up
    if (row < difficulty - 1) neighbors.push(emptyIndex + difficulty); // Down
    if (col > 0) neighbors.push(emptyIndex - 1); // Left
    if (col < difficulty - 1) neighbors.push(emptyIndex + 1); // Right

    const randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
    
    // Swap empty tile with neighbor
    [tiles[emptyIndex], tiles[randomNeighborIndex]] = [tiles[randomNeighborIndex], tiles[emptyIndex]];
    emptyIndex = randomNeighborIndex;
  }
  
  // If the puzzle is solved after shuffling (rare case), shuffle again
  const isSolved = tiles.every((tile, index) => tile === index);
  if (isSolved) {
      return createSolvableShuffle(difficulty);
  }

  return tiles;
};

interface PuzzleEngineOptions {
  puzzle: Puzzle | null;
  playMoveSound: () => void;
  playWinSound: () => void;
}

export const usePuzzleEngine = ({ puzzle, playMoveSound, playWinSound }: PuzzleEngineOptions) => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const generatePieces = useCallback(async () => {
    if (!puzzle) return;
    setIsReady(false);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = puzzle.imageSrc;

    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      setImageSize({ width: naturalWidth, height: naturalHeight });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const { difficulty } = puzzle.config;
      const size = difficulty * difficulty;
      const pieceWidth = naturalWidth / difficulty;
      const pieceHeight = naturalHeight / difficulty;
      
      const generatedPieces: Piece[] = [];
      for (let i = 0; i < size; i++) {
        const row = Math.floor(i / difficulty);
        const col = i % difficulty;

        canvas.width = pieceWidth;
        canvas.height = pieceHeight;
        ctx.drawImage(img, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
        
        const isLastPiece = i === size - 1;
        generatedPieces.push({
          id: i,
          originalIndex: i,
          currentIndex: 0, // will be set by shuffle
          imgSrc: isLastPiece ? '' : canvas.toDataURL(),
          isEmpty: isLastPiece,
        });
      }

      const shuffledBoardState = createSolvableShuffle(difficulty);
      const finalPieces = generatedPieces.map((p) => ({
        ...p,
        currentIndex: shuffledBoardState.indexOf(p.id),
      }));

      setPieces(finalPieces);
      setIsReady(true);
    };
  }, [puzzle]);

  useEffect(() => {
    generatePieces();
  }, [generatePieces]);
  
  const resetGame = useCallback(() => {
    setIsComplete(false);
    setMoves(0);
    setTime(0);
    generatePieces();
  }, [generatePieces]);
  
  const reshuffle = useCallback(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (!isReady || isComplete) return;
    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isReady, isComplete]);

  useEffect(() => {
    if (!isComplete && isReady && pieces.length > 0 && pieces.every(p => p.currentIndex === p.originalIndex)) {
      setIsComplete(true);
      playWinSound();
    }
  }, [pieces, isReady, isComplete, playWinSound]);

  const movePiece = useCallback((pieceId: number) => {
    if (isComplete) return;
    setPieces(currentPieces => {
        const difficulty = puzzle!.config.difficulty;
        const piece = currentPieces.find(p => p.id === pieceId);
        const emptyPiece = currentPieces.find(p => p.isEmpty);

        if (!piece || !emptyPiece || piece.isEmpty) return currentPieces;

        const pieceRow = Math.floor(piece.currentIndex / difficulty);
        const pieceCol = piece.currentIndex % difficulty;
        const emptyRow = Math.floor(emptyPiece.currentIndex / difficulty);
        const emptyCol = emptyPiece.currentIndex % difficulty;
        
        const isAdjacent = (Math.abs(pieceRow - emptyRow) === 1 && pieceCol === emptyCol) || 
                           (Math.abs(pieceCol - emptyCol) === 1 && pieceRow === emptyRow);
        
        if (isAdjacent) {
            setMoves(m => m + 1);
            playMoveSound();
            const newPieces = [...currentPieces];
            const pieceIndexInArray = newPieces.findIndex(p => p.id === piece.id);
            const emptyPieceIndexInArray = newPieces.findIndex(p => p.isEmpty);

            const tempIndex = piece.currentIndex;
            newPieces[pieceIndexInArray].currentIndex = emptyPiece.currentIndex;
            newPieces[emptyPieceIndexInArray].currentIndex = tempIndex;

            return newPieces;
        }

        return currentPieces;
    });
  }, [puzzle, isComplete, playMoveSound]);

  return {
    pieces,
    isComplete,
    moves,
    time,
    isReady,
    imageSize,
    resetGame,
    reshuffle,
    movePiece
  };
};