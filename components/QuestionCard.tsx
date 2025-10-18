import React, { useState, useEffect, useRef } from 'react';
import type { Question } from '../types.js';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOptionIndex: number) => void;
  onNextQuestion: () => void;
  questionNumber: number;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  helpsLeft: number;
  onUseHelp: () => void;
}

const DIFFICULTY_TIME = {
  easy: 20,
  medium: 15,
  hard: 10,
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onNextQuestion, questionNumber, totalQuestions, difficulty, helpsLeft, onUseHelp }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_TIME[difficulty]);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setHiddenOptions([]);
    setTimeLeft(DIFFICULTY_TIME[difficulty]);
  }, [question, difficulty]);
  
  useEffect(() => {
    if (isAnswered) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [question, isAnswered]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    onAnswer(-1); // -1 indicates timeout
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(index);
    onAnswer(index);
  };
  
  const handleUseHelp = () => {
    if (helpsLeft <= 0 || isAnswered) return;
    onUseHelp();
    
    const wrongOptions = question.options
        .map((_, i) => i)
        .filter(i => i !== question.answer);
    
    const shuffledWrongOptions = wrongOptions.sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffledWrongOptions.slice(0, 2));
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-white text-slate-800 hover:bg-slate-100';
    }
    if (index === question.answer) {
      return `bg-green-500 text-white ${index === selectedAnswer ? 'pulse' : ''}`;
    }
    if (index === selectedAnswer && index !== question.answer) {
      return 'bg-red-500 text-white shake';
    }
    return 'bg-white text-slate-500 opacity-50 cursor-not-allowed';
  };
  
  const timePercentage = (timeLeft / DIFFICULTY_TIME[difficulty]) * 100;
  const progressColor = timePercentage > 50 ? 'bg-green-500' : timePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="card p-6 md:p-8 fadeInUp">
      <div className="relative h-2.5 w-full bg-slate-200 rounded-full mb-4">
        <div style={{ width: `${timePercentage}%`}} className={`absolute h-full rounded-full ${progressColor} transition-all duration-1000 linear`}></div>
      </div>
      
      <div className="flex justify-between items-center mb-4 text-slate-600">
        <p className="text-sm md:text-base">Soal {questionNumber} dari {totalQuestions}</p>
        <button onClick={handleUseHelp} disabled={helpsLeft <= 0 || isAnswered} className="flex items-center space-x-1 font-semibold text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed">
           <span>💡</span>
           <span>Bantuan ({helpsLeft})</span>
        </button>
      </div>
      
      <h2 className="text-xl md:text-3xl font-bold text-slate-800 mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isAnswered || hiddenOptions.includes(index)}
            className={`w-full text-left p-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm border-2 border-slate-200 ${getButtonClass(index)} ${hiddenOptions.includes(index) ? 'hidden' : ''}`}
          >
            <span className="mr-4 font-bold">{String.fromCharCode(65 + index)}</span>
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <button 
          onClick={onNextQuestion}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 text-xl btn-3d mt-8"
        >
          Lanjut
        </button>
      )}
    </div>
  );
};

export default QuestionCard;