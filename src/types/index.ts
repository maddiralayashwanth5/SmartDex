// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  streak: number;
  totalCardsStudied: number;
  totalStudyTime: number; // in minutes
}

// Deck types
export interface Deck {
  id: string;
  userId: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  cardCount: number;
  masteredCount: number;
  lastStudied?: Date;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags: string[];
}

// Flashcard types
export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  hint?: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  // Spaced repetition data
  easeFactor: number; // Default 2.5
  interval: number; // Days until next review
  repetitions: number;
  nextReview: Date;
  lastReview?: Date;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

// Study session types
export interface StudySession {
  id: string;
  userId: string;
  deckId: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageTime: number; // seconds per card
}

// Card review result
export interface CardReview {
  id: string;
  sessionId: string;
  cardId: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5; // 0=again, 1=hard, 2=good, 3=easy, 4=perfect, 5=too easy
  responseTime: number; // milliseconds
  reviewedAt: Date;
}

// Quiz types
export interface Quiz {
  id: string;
  deckId: string;
  userId: string;
  type: 'multiple-choice' | 'true-false' | 'typing' | 'mixed';
  questionCount: number;
  score: number;
  completedAt: Date;
  timeSpent: number; // seconds
}

export interface QuizQuestion {
  id: string;
  cardId: string;
  question: string;
  correctAnswer: string;
  options?: string[]; // For multiple choice
  userAnswer?: string;
  isCorrect?: boolean;
}

// Progress and analytics
export interface DailyProgress {
  date: string;
  cardsStudied: number;
  cardsLearned: number;
  cardsMastered: number;
  studyTime: number; // minutes
  accuracy: number; // percentage
}

export interface DeckStats {
  deckId: string;
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  masteredCards: number;
  averageEaseFactor: number;
  retentionRate: number;
}

// AI Generation
export interface AIGenerationRequest {
  content: string;
  contentType: 'text' | 'pdf' | 'url' | 'image';
  cardCount?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  language?: string;
}

export interface AIGeneratedCard {
  front: string;
  back: string;
  hint?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'achievement' | 'streak' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
}
