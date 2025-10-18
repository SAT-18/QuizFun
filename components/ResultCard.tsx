import React from 'react';
import type { UserAnswer } from '../types.js';
import AdBanner from './AdBanner.js';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userAnswers: UserAnswer[];
}

const ResultCard: React.FC<ResultCardProps> = ({ score, totalQuestions, onRestart, userAnswers }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = '';
  if (percentage === 100) {
    message = 'Sempurna! Kamu jenius!';
  } else if (percentage >= 80) {
    message = 'Luar biasa! Kerja bagus!';
  } else if (percentage >= 50) {
    message = 'Tidak buruk! Terus berlatih!';
  } else {
    message = 'Jangan menyerah! Coba lagi ya!';
  }

  return (
    <div className="card p-6 md:p-8 text-center fadeInUp max-h-[90vh] flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Quiz Selesai!</h2>
      <p className="text-slate-600 text-lg mb-6">{message}</p>
      
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <p className="text-slate-700 text-lg">Skor Akhir Kamu</p>
        <p className="text-5xl font-bold text-blue-600 my-2">
          {score} / {totalQuestions}
        </p>
         <div className="w-full bg-slate-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="text-2xl font-semibold text-slate-700 mt-2">({percentage}%)</p>
      </div>

      <div className="flex-grow overflow-y-auto bg-slate-50 p-4 rounded-lg border text-left mb-6">
        <h3 className="font-bold text-xl mb-4 text-slate-800">Ringkasan Jawaban</h3>
        <ul className="space-y-3">
          {userAnswers.map((answer, index) => (
            <li key={index} className="border-b pb-3">
              <p className="font-semibold text-slate-700 mb-1">{index + 1}. {answer.question}</p>
              <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                Jawabanmu: {answer.selectedOption} {answer.isCorrect ? '✔️' : '❌'}
              </p>
              {!answer.isCorrect && (
                <p className="text-sm text-green-700">Jawaban Benar: {answer.correctOption}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Area Iklan AdSense */}
      <AdBanner />

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 text-white font-bold py-4 px-4 text-xl btn-3d"
      >
        Ulangi Quiz
      </button>
    </div>
  );
};

export default ResultCard;