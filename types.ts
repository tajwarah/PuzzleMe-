export type Difficulty = 3 | 4 | 6 | 8;

export interface Piece {
  id: number;
  originalIndex: number;
  currentIndex: number;
  imgSrc: string;
  isEmpty: boolean;
}

export interface PuzzleConfig {
  difficulty: Difficulty;
  showHint: boolean;
}

export interface Puzzle {
  id: string;
  imageSrc: string;
  config: PuzzleConfig;
  isPublic: boolean;
  createdAt: string;
  name: string;
}