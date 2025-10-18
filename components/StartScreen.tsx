import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (difficulty: 'easy' | 'medium' | 'hard', numQuestions: number) => void;
  highScore: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, highScore }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(difficulty, numQuestions);
  };

  return (
    <div className="card p-8 text-center fadeInUp">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">QuizFun HD</h1>
      <p className="text-slate-600 mb-6">Uji wawasanmu dengan kuis interaktif!</p>
       <div className="mb-8 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-r-lg">
        <p className="font-bold">Skor Tertinggi: {highScore}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="difficulty" className="block text-lg font-medium text-slate-700 mb-2">
            Tingkat Kesulitan
          </label>
          <div className="flex justify-center space-x-2">
            {(['easy', 'medium', 'hard'] as const).map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${difficulty === level ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="numQuestions" className="block text-lg font-medium text-slate-700 mb-2">
            Jumlah Soal: <span className="font-bold text-blue-600">{numQuestions}</span>
          </label>
          <input
            id="numQuestions"
            type="range"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="5"
            max="15"
            step="1"
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 px-4 text-xl btn-3d"
        >
          Mulai Quiz
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
