import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicPuzzles } from '../services/puzzleService';
import type { Puzzle } from '../types';
import { useSounds } from '../App';

interface PuzzleCardProps {
  puzzle: Puzzle;
  onClick: () => void;
}

function PuzzleCard({ puzzle, onClick }: PuzzleCardProps) {
  return (
    <Link 
      to={`/puzzle/${puzzle.id}`} 
      onClick={onClick}
      className="block group bg-white rounded-2xl overflow-hidden shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-2 border-[--theme-dark] hover:shadow-[0_8px_0_0_#4ECDC4] transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img src={puzzle.imageSrc} alt={puzzle.name} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-opacity"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-black text-ellipsis overflow-hidden whitespace-nowrap text-[--theme-dark]">{puzzle.name}</h3>
        <p className="text-sm font-bold text-slate-500">{puzzle.config.difficulty}x{puzzle.config.difficulty} Grid</p>
      </div>
    </Link>
  );
}

function ExplorePage() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [loading, setLoading] = useState(true);
  const { playClick } = useSounds();

  useEffect(() => {
    const fetchPuzzles = async () => {
      setLoading(true);
      const publicPuzzles = await getPublicPuzzles();
      setPuzzles(publicPuzzles);
      setLoading(false);
    };
    fetchPuzzles();
  }, []);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-black text-[--theme-dark] tracking-tighter">Explore Puzzles</h1>
        <p className="text-slate-500 mt-2 text-xl">Discover puzzles made by the community!</p>
      </div>
      
      {loading ? (
        <div className="text-center text-xl font-bold">Loading puzzles...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {puzzles.map(puzzle => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} onClick={playClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExplorePage;