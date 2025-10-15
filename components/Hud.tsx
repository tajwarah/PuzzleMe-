import React from 'react';
import { useSounds } from '../App';

const RestartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
const ReshuffleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 8v1m0 8v1m-8-8h1m8 0h1m-9-4l1-1m6 6l1-1m-6-1l1 1m6-6l1 1" /></svg>;
const HintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

interface HudProps {
  moves: number;
  time: number;
  onRestart: () => void;
  onReshuffle: () => void;
  onHint: () => void;
  hintDisabled: boolean;
  puzzleId: string;
}

const Hud: React.FC<HudProps> = ({ moves, time, onRestart, onReshuffle, onHint, hintDisabled }) => {
  const { playClick } = useSounds();

  const handleShare = async () => {
    playClick();
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PuzzleMe Challenge',
          text: 'Come play this puzzle with me!',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Puzzle URL copied to clipboard!');
      });
    }
  };

  const handleRestart = () => { playClick(); onRestart(); };
  const handleReshuffle = () => { playClick(); onReshuffle(); };
  const handleHint = () => { playClick(); onHint(); };

  const buttonClass = "flex items-center justify-center gap-2 bg-[--theme-light] text-[--theme-dark] font-bold py-3 px-4 rounded-xl transition-all border-b-4 border-[--theme-dark]/50 active:border-b-2 active:translate-y-0.5 transform disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-400 text-sm sm:text-base";

  return (
    <div className="w-full lg:w-64 lg:sticky lg:top-8 bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-lg lg:my-0 flex flex-row lg:flex-col items-center justify-between lg:justify-start gap-4 border-2 border-[--theme-dark]/20">
      {/* Stats Section */}
      <div className="flex items-center gap-4 sm:gap-6 lg:flex-col lg:w-full lg:gap-4 lg:mb-4">
        <div className="text-center lg:flex lg:w-full lg:justify-between lg:items-center bg-white/50 p-3 rounded-xl flex-1 lg:flex-none">
          <div className="text-slate-500 text-sm font-bold -mt-1 lg:m-0">Moves</div>
          <span className="font-black text-2xl sm:text-3xl">{moves}</span>
        </div>
        <div className="text-center lg:flex lg:w-full lg:justify-between lg:items-center bg-white/50 p-3 rounded-xl flex-1 lg:flex-none">
          <div className="text-slate-500 text-sm font-bold -mt-1 lg:m-0">Time</div>
          <span className="font-black text-2xl sm:text-3xl">{formatTime(time)}</span>
        </div>
      </div>
      
      {/* Buttons Section */}
      <div className="flex items-center gap-2 lg:flex-col lg:w-full lg:items-stretch">
        <button onClick={handleRestart} className={`${buttonClass} bg-[#FF6B6B] text-white border-red-800/50`} title="Restart (Enter)"><RestartIcon /> <span className="hidden sm:inline">Restart</span></button>
        <button onClick={handleReshuffle} className={`${buttonClass} bg-[#4ECDC4] text-white border-teal-800/50`} title="Reshuffle (Space)"><ReshuffleIcon /> <span className="hidden sm:inline">Reshuffle</span></button>
        <button onClick={handleHint} disabled={hintDisabled} className={`${buttonClass} bg-[#FED766] text-white border-yellow-800/50`} title="Show Hint"><HintIcon /> <span className="hidden sm:inline">Hint</span></button>
        <button onClick={handleShare} className={`${buttonClass} bg-slate-500 text-white border-slate-800/50`} title="Share"><ShareIcon /> <span className="hidden sm:inline">Share</span></button>
      </div>
    </div>
  );
};

export default Hud;