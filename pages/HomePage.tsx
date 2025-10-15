import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Difficulty } from '../types';
import { DIFFICULTIES, IMAGE_MAX_SIZE_MB, IMAGE_MIN_DIMENSION } from '../constants';
import { createPuzzle } from '../services/puzzleService';
import { useSounds } from '../App';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[--theme-accent]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(4);
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { playClick } = useSounds();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick();
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > IMAGE_MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image size must be less than ${IMAGE_MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < IMAGE_MIN_DIMENSION || img.height < IMAGE_MIN_DIMENSION) {
          setError(`Image dimensions must be at least ${IMAGE_MIN_DIMENSION}x${IMAGE_MIN_DIMENSION}px.`);
          return;
        }
        setImage(file);
        setImagePreview(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDifficultyClick = (d: Difficulty) => {
    playClick();
    setDifficulty(d);
  };
  
  const handlePublicToggle = () => {
      playClick();
      setIsPublic(prev => !prev);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!image || !imagePreview) {
      setError("Please select an image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const newPuzzle = await createPuzzle(
        imagePreview,
        { difficulty, showHint: true },
        isPublic,
        image.name.replace(/\.[^/.]+$/, "")
      );
      navigate(`/puzzle/${newPuzzle.id}`);
    } catch (err) {
      setError("Failed to create puzzle. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-black text-[--theme-dark] tracking-tighter">Create Your Puzzle!</h1>
        <p className="text-slate-500 mt-2 text-lg sm:text-xl">Upload an image and let the fun begin!</p>
      </div>

      <div className="bg-[--theme-light] p-4 sm:p-8 rounded-3xl shadow-[0_10px_0_0_rgba(0,0,0,0.1)] border-4 border-[--theme-dark]">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-4 border-dashed border-slate-300 rounded-2xl p-4 sm:p-6 text-center hover:border-[--theme-primary] hover:bg-red-50 transition-colors h-full flex flex-col justify-center items-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-64 rounded-xl object-contain" />
                  ) : (
                    <>
                      <UploadIcon />
                      <p className="mt-2 text-slate-600 font-bold">Click to upload an image</p>
                      <p className="text-sm text-slate-400">PNG, JPG, WEBP up to {IMAGE_MAX_SIZE_MB}MB</p>
                      <p className="text-sm text-slate-400">Min dimensions: {IMAGE_MIN_DIMENSION}x{IMAGE_MIN_DIMENSION}px</p>
                    </>
                  )}
                </div>
              </label>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <label className="block text-lg font-bold text-[--theme-dark] mb-2">Difficulty</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleDifficultyClick(d)}
                      className={`w-full py-3 text-md font-bold rounded-xl border-b-4 transition-all transform hover:-translate-y-0.5 ${difficulty === d ? 'bg-[--theme-primary] text-white border-red-700' : 'bg-slate-200 text-slate-700 border-slate-400 hover:bg-slate-300'}`}
                    >
                      {d}x{d}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center" onClick={handlePublicToggle}>
                 <div className="flex items-center h-5 cursor-pointer">
                  <input id="public" name="public" type="checkbox" checked={isPublic} readOnly className="focus:ring-0 h-6 w-6 text-[--theme-primary] border-2 border-[--theme-dark] rounded-md bg-white cursor-pointer" />
                </div>
                <div className="ml-3 text-sm cursor-pointer">
                  <label htmlFor="public" className="font-bold text-[--theme-dark] text-md cursor-pointer">Public Puzzle</label>
                  <p className="text-slate-500">Allow others to find and play your puzzle.</p>
                </div>
              </div>
            </div>
          </div>
          
          {error && <p className="mt-4 text-center text-red-500 font-bold">{error}</p>}
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={!image || isLoading}
              className="w-full bg-[--theme-accent] hover:bg-yellow-400 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:border-slate-400 text-[--theme-dark] font-black py-4 px-4 rounded-2xl transition-all text-xl border-b-8 border-yellow-600 active:border-b-4 active:translate-y-1 transform"
            >
              {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isLoading ? 'Creating...' : 'Let\'s Go!'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;