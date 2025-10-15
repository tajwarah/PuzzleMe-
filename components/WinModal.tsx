import React from 'react';
import { Link } from 'react-router-dom';
import { useSounds } from '../App';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const WinModal: React.FC<WinModalProps> = ({ isOpen, moves, time, onPlayAgain }) => {
  const { playClick } = useSounds();

  if (!isOpen) return null;

  const handlePlayAgain = () => {
    playClick();
    onPlayAgain();
  };
  
  const handleExploreClick = () => {
    playClick();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[--theme-light] rounded-3xl shadow-[0_10px_0_0_rgba(0,0,0,0.1)] p-6 sm:p-8 text-center max-w-sm w-full border-4 border-[--theme-dark] bounce-in-animation">
        <h2 className="text-5xl sm:text-6xl font-black text-[--theme-primary] mb-2 tracking-tighter">You Won!</h2>
        <p className="text-slate-500 mb-6 font-bold">Awesome job completing the puzzle!</p>
        
        <div className="flex justify-around mb-8 text-lg bg-slate-100 p-4 rounded-xl border-2 border-slate-200">
          <div>
            <div className="font-black text-3xl sm:text-4xl text-[--theme-dark]">{moves}</div>
            <div className="text-slate-500 font-bold">Moves</div>
          </div>
          <div>
            <div className="font-black text-3xl sm:text-4xl text-[--theme-dark]">{formatTime(time)}</div>
            <div className="text-slate-500 font-bold">Time</div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-[--theme-secondary] text-white font-black py-3 px-4 rounded-2xl transition-all text-lg border-b-8 border-teal-700 active:border-b-4 active:translate-y-1 transform"
          >
            Play Again
          </button>
          <Link
            to="/explore"
            onClick={handleExploreClick}
            className="block w-full bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-all border-b-4 border-slate-400 active:border-b-2 active:translate-y-0.5 transform"
          >
            Explore More Puzzles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinModal;