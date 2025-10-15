import React, { useMemo } from 'react';
import type { Puzzle, Piece } from '../types';
import PuzzlePiece from './PuzzlePiece';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  pieces: Piece[];
  imageSize: { width: number; height: number };
  showHint: boolean;
  onPieceMove: (pieceId: number) => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ puzzle, pieces, imageSize, showHint, onPieceMove }) => {
  const { difficulty } = puzzle.config;

  const movablePieceIds = useMemo(() => {
    const emptyPiece = pieces.find(p => p.isEmpty);
    if (!emptyPiece) return new Set();

    const emptyRow = Math.floor(emptyPiece.currentIndex / difficulty);
    const emptyCol = emptyPiece.currentIndex % difficulty;
    const adjacentIndices = new Set<number>();
    
    if (emptyRow > 0) adjacentIndices.add(emptyPiece.currentIndex - difficulty); // Piece above
    if (emptyRow < difficulty - 1) adjacentIndices.add(emptyPiece.currentIndex + difficulty); // Piece below
    if (emptyCol > 0) adjacentIndices.add(emptyPiece.currentIndex - 1); // Piece left
    if (emptyCol < difficulty - 1) adjacentIndices.add(emptyPiece.currentIndex + 1); // Piece right

    const movableIds = new Set<number>();
    pieces.forEach(p => {
        if (adjacentIndices.has(p.currentIndex)) {
            movableIds.add(p.id);
        }
    });
    return movableIds;
  }, [pieces, difficulty]);

  return (
    <div
      className="relative bg-white/60 p-2 rounded-2xl shadow-[0_8px_0_0_rgba(0,0,0,0.1)] border-4 border-[--theme-dark] w-full"
      style={{
        aspectRatio: `${imageSize.width} / ${imageSize.height}`,
      }}
    >
      {pieces.map(piece => (
        <PuzzlePiece
          key={piece.id}
          piece={piece}
          difficulty={difficulty}
          isMovable={movablePieceIds.has(piece.id)}
          onMove={onPieceMove}
        />
      ))}
      {showHint && (
          <div 
              className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
              style={{
                  backgroundImage: `url(${puzzle.imageSrc})`,
                  backgroundSize: 'cover',
                  margin: '8px',
                  borderRadius: '12px'
              }}
          />
      )}
    </div>
  );
};

export default PuzzleBoard;