import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen.js';
import QuestionCard from './components/QuestionCard.js';
import ResultCard from './components/ResultCard.js';
import { QUIZ_DATA } from './constants.js';
import type { Question, UserAnswer } from './types.js';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [helpsLeft, setHelpsLeft] = useState(3);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(Number(savedHighScore));
    }
  }, []);

  const startQuiz = (difficulty: 'easy' | 'medium' | 'hard', numQuestions: number) => {
    setDifficulty(difficulty);
    const filteredQuestions = QUIZ_DATA.filter(q => q.difficulty === difficulty);
    const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions.slice(0, numQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setHelpsLeft(3);
    setUserAnswers([]);
    setGameState('playing');
  };

  const handleAnswer = (selectedOptionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.answer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    setUserAnswers(prev => [...prev, {
      question: currentQuestion.question,
      selectedOption: selectedOptionIndex > -1 ? currentQuestion.options[selectedOptionIndex] : "Waktu Habis",
      correctOption: currentQuestion.options[currentQuestion.answer],
      isCorrect,
    }]);
  };
  
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', String(score));
      }
      setGameState('finished');
    }
  };
  
  const useHelp = () => {
    if (helpsLeft > 0) {
      setHelpsLeft(prev => prev - 1);
    }
  };

  const restartQuiz = () => {
    setGameState('start');
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            difficulty={difficulty}
            helpsLeft={helpsLeft}
            onUseHelp={useHelp}
          />
        );
      case 'finished':
        return (
          <ResultCard
            score={score}
            totalQuestions={questions.length}
            onRestart={restartQuiz}
            userAnswers={userAnswers}
          />
        );
      case 'start':
      default:
        return <StartScreen onStart={startQuiz} highScore={highScore} />;
    }
  };

  return (
    <div className="animated-gradient min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl">
        {renderContent()}
      </main>
      <footer className="text-center text-white text-xs mt-8 pb-4 px-4">
        <p>All praise and thanks are due to Allah.</p>
        <p>Powered by Google, Gemini, and AI Studio. Development assisted by OpenAI technologies.</p>
        <p>© 2025 SAT18 Official | For suggestions & contact: sayyidagustian@gmail.com</p>
      </footer>
    </div>
  );
};

export default App;