import React from 'react';
import type { Piece } from '../types';

interface PuzzlePieceProps {
  piece: Piece;
  difficulty: number;
  isMovable: boolean;
  onMove: (pieceId: number) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece, difficulty, isMovable, onMove }) => {
  const handleClick = () => {
    if (isMovable) {
      onMove(piece.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMovable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onMove(piece.id);
    }
  };

  const row = Math.floor(piece.currentIndex / difficulty);
  const col = piece.currentIndex % difficulty;

  const style: React.CSSProperties = {
    position: 'absolute',
    width: `calc(${100 / difficulty}% - 4px)`,
    height: `calc(${100 / difficulty}% - 4px)`,
    top: `calc(${row * (100 / difficulty)}% + 2px)`,
    left: `calc(${col * (100 / difficulty)}% + 2px)`,
    transition: 'top 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  if (piece.isEmpty) {
    return (
      <div
        style={style}
        className="bg-black/10 rounded-lg shadow-inner"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={style}
      className={`transform-gpu will-change-transform rounded-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[--theme-accent] ${isMovable ? 'cursor-pointer z-10 wiggle-animation' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={isMovable ? "Click to move" : ""}
      role="button"
      aria-label={`Puzzle piece at row ${row + 1}, column ${col + 1}. ${isMovable ? 'Movable.' : ''}`}
      tabIndex={isMovable ? 0 : -1}
    >
      <img
        src={piece.imgSrc}
        className="w-full h-full object-cover rounded-lg border-2 border-black/30"
        style={{
           boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.5), inset 0 -2px 2px rgba(0,0,0,0.3)'
        }}
        alt=""
        draggable={false}
      />
    </div>
  );
};

export default PuzzlePiece;