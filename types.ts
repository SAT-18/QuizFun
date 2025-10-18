export interface Question {
  question: string;
  options: string[];
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  question: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
}
