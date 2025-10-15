import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPuzzle } from '../services/puzzleService';
import type { Puzzle } from '../types';
import { usePuzzleEngine } from '../hooks/usePuzzleEngine';
import PuzzleBoard from '../components/PuzzleBoard';
import Hud from '../components/Hud';
import WinModal from '../components/WinModal';
import { useSounds } from '../App';

function PuzzlePage() {
  const { id } = useParams<{ id: string }>();
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(false);
  const { playMove, playWin } = useSounds();

  useEffect(() => {
    const fetchPuzzle = async () => {
      if (!id) {
        setError("No puzzle ID provided.");
        setLoading(false);
        return;
      }
      try {
        const puzzleData = await getPuzzle(id);
        if (puzzleData) {
          setPuzzle(puzzleData);
        } else {
          setError("Puzzle not found.");
        }
      } catch (e) {
        setError("Failed to load puzzle.");
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, [id]);

  const {
    pieces, isComplete, moves, time, isReady, imageSize,
    resetGame, reshuffle, movePiece
  } = usePuzzleEngine({ puzzle, playMoveSound: playMove, playWinSound: playWin });

  const handleShowHint = () => {
    if (hintCooldown || isComplete) return;
    setShowHint(true);
    setHintCooldown(true);
    setTimeout(() => setShowHint(false), 3000);
    setTimeout(() => setHintCooldown(false), 15000);
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (isComplete || !isReady) return;

        if (e.code === 'Space') {
            e.preventDefault();
            reshuffle();
        }
        if (e.code === 'Enter') {
            e.preventDefault();
            resetGame();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isComplete, isReady, reshuffle, resetGame]);


  if (loading) {
    return <div className="text-center text-xl font-bold">Loading Puzzle...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 font-bold">{error}</div>;
  }

  if (!puzzle) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-8 w-full">
      <div className="w-full lg:flex-1 lg:max-w-[900px]">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-black mb-1 text-[--theme-dark] tracking-tighter">{puzzle.name}</h1>
          <p className="text-slate-500 mb-4 font-bold">{puzzle.config.difficulty}x{puzzle.config.difficulty} Grid</p>
        </div>

        {!isReady ? (
          <div className="flex flex-col items-center justify-center w-full aspect-square max-w-xl mx-auto bg-white/50 rounded-2xl">
            <svg className="animate-spin h-10 w-10 text-[--theme-primary] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="text-lg font-bold text-slate-600">Getting the pieces ready...</p>
          </div>
        ) : (
          <PuzzleBoard
            puzzle={puzzle}
            pieces={pieces}
            imageSize={imageSize}
            showHint={showHint}
            onPieceMove={movePiece}
          />
        )}
      </div>

      <Hud
        moves={moves}
        time={time}
        onRestart={resetGame}
        onReshuffle={reshuffle}
        onHint={handleShowHint}
        hintDisabled={hintCooldown || isComplete}
        puzzleId={puzzle.id}
      />
      
      <WinModal
        isOpen={isComplete}
        moves={moves}
        time={time}
        onPlayAgain={resetGame}
      />
    </div>
  );
}

export default PuzzlePage;