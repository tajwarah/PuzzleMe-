import type { Puzzle, PuzzleConfig } from '../types';

// In-memory "database" for puzzles
let puzzles: Puzzle[] = [
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    imageSrc: 'https://picsum.photos/id/1015/1024/768',
    config: { difficulty: 4, showHint: true },
    isPublic: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mountain-reflection',
    name: 'Mountain Reflection',
    imageSrc: 'https://picsum.photos/id/1018/1024/768',
    config: { difficulty: 6, showHint: true },
    isPublic: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'misty-forest',
    name: 'Misty Forest',
    imageSrc: 'https://picsum.photos/id/103/1024/768',
    config: { difficulty: 8, showHint: true },
    isPublic: true,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'desert-road',
    name: 'Desert Road',
    imageSrc: 'https://picsum.photos/id/111/1024/768',
    config: { difficulty: 3, showHint: false },
    isPublic: false,
    createdAt: new Date().toISOString(),
  }
];

// Simulates creating a new puzzle
export const createPuzzle = async (imageSrc: string, config: PuzzleConfig, isPublic: boolean, name: string): Promise<Puzzle> => {
  await new Promise(res => setTimeout(res, 500)); // Simulate network delay
  const newPuzzle: Puzzle = {
    id: `puzzle-${Date.now()}`,
    imageSrc,
    config,
    isPublic,
    name: name || `Puzzle ${puzzles.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  puzzles.push(newPuzzle);
  return newPuzzle;
};

// Simulates fetching a single puzzle by its ID
export const getPuzzle = async (id: string): Promise<Puzzle | undefined> => {
  await new Promise(res => setTimeout(res, 300));
  return puzzles.find(p => p.id === id);
};

// Simulates fetching all public puzzles
export const getPublicPuzzles = async (): Promise<Puzzle[]> => {
  await new Promise(res => setTimeout(res, 700));
  return puzzles.filter(p => p.isPublic).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};