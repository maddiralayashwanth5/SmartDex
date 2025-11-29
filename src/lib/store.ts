// Simple state management using React Context pattern
// In production, you'd use a proper state management solution or database

import { Deck, Flashcard, User, StudySession, DailyProgress } from '@/types';

// Mock user data
export const mockUser: User = {
  id: '1',
  email: 'demo@smartdex.com',
  name: 'Alex Johnson',
  avatar: undefined,
  plan: 'pro',
  createdAt: new Date('2024-01-15'),
  streak: 12,
  totalCardsStudied: 1547,
  totalStudyTime: 2340,
};

// Mock decks
export const mockDecks: Deck[] = [
  {
    id: '1',
    userId: '1',
    title: 'Biology 101',
    description: 'Fundamentals of cell biology and genetics',
    color: '#1EB6D2',
    icon: '🧬',
    cardCount: 45,
    masteredCount: 32,
    lastStudied: new Date('2024-11-28'),
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-11-28'),
    isPublic: false,
    tags: ['science', 'biology', 'cells'],
  },
  {
    id: '2',
    userId: '1',
    title: 'Spanish Vocabulary',
    description: 'Common Spanish words and phrases',
    color: '#F8C14D',
    icon: '🇪🇸',
    cardCount: 120,
    masteredCount: 78,
    lastStudied: new Date('2024-11-27'),
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-11-27'),
    isPublic: true,
    tags: ['language', 'spanish'],
  },
  {
    id: '3',
    userId: '1',
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts and syntax',
    color: '#0B1C3F',
    icon: '💻',
    cardCount: 65,
    masteredCount: 45,
    lastStudied: new Date('2024-11-26'),
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-26'),
    isPublic: false,
    tags: ['programming', 'javascript', 'web'],
  },
  {
    id: '4',
    userId: '1',
    title: 'World History',
    description: 'Major historical events and figures',
    color: '#8B5CF6',
    icon: '🏛️',
    cardCount: 80,
    masteredCount: 25,
    lastStudied: new Date('2024-11-25'),
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-11-25'),
    isPublic: true,
    tags: ['history', 'world'],
  },
];

// Mock flashcards
export const mockFlashcards: Flashcard[] = [
  // Biology deck
  {
    id: '1',
    deckId: '1',
    front: 'What is the powerhouse of the cell?',
    back: 'Mitochondria - It produces ATP through cellular respiration',
    hint: 'Think about energy production',
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
    easeFactor: 2.5,
    interval: 4,
    repetitions: 5,
    nextReview: new Date('2024-12-02'),
    lastReview: new Date('2024-11-28'),
    status: 'mastered',
  },
  {
    id: '2',
    deckId: '1',
    front: 'What is DNA?',
    back: 'Deoxyribonucleic acid - A molecule that carries genetic instructions for development, functioning, growth, and reproduction',
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
    easeFactor: 2.3,
    interval: 2,
    repetitions: 3,
    nextReview: new Date('2024-11-30'),
    lastReview: new Date('2024-11-28'),
    status: 'review',
  },
  {
    id: '3',
    deckId: '1',
    front: 'What is photosynthesis?',
    back: 'The process by which plants convert sunlight, water, and CO2 into glucose and oxygen',
    hint: 'Plants + sunlight = ?',
    createdAt: new Date('2024-09-02'),
    updatedAt: new Date('2024-09-02'),
    easeFactor: 2.5,
    interval: 1,
    repetitions: 1,
    nextReview: new Date('2024-11-29'),
    status: 'learning',
  },
  {
    id: '4',
    deckId: '1',
    front: 'What is the cell membrane made of?',
    back: 'A phospholipid bilayer with embedded proteins',
    createdAt: new Date('2024-09-03'),
    updatedAt: new Date('2024-09-03'),
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date(),
    status: 'new',
  },
  // Spanish deck
  {
    id: '5',
    deckId: '2',
    front: 'Hola',
    back: 'Hello',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-08-15'),
    easeFactor: 2.8,
    interval: 10,
    repetitions: 8,
    nextReview: new Date('2024-12-08'),
    lastReview: new Date('2024-11-28'),
    status: 'mastered',
  },
  {
    id: '6',
    deckId: '2',
    front: 'Gracias',
    back: 'Thank you',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-08-15'),
    easeFactor: 2.6,
    interval: 7,
    repetitions: 6,
    nextReview: new Date('2024-12-05'),
    lastReview: new Date('2024-11-28'),
    status: 'mastered',
  },
  // JavaScript deck
  {
    id: '7',
    deckId: '3',
    front: 'What is a closure in JavaScript?',
    back: 'A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.',
    hint: 'Think about scope and memory',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01'),
    easeFactor: 2.2,
    interval: 1,
    repetitions: 2,
    nextReview: new Date('2024-11-29'),
    status: 'learning',
  },
  {
    id: '8',
    deckId: '3',
    front: 'What is the difference between let and var?',
    back: 'let is block-scoped while var is function-scoped. let also doesn\'t allow redeclaration and has a temporal dead zone.',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01'),
    easeFactor: 2.5,
    interval: 3,
    repetitions: 4,
    nextReview: new Date('2024-12-01'),
    lastReview: new Date('2024-11-28'),
    status: 'review',
  },
];

// Mock daily progress
export const mockDailyProgress: DailyProgress[] = [
  { date: '2024-11-22', cardsStudied: 45, cardsLearned: 12, cardsMastered: 5, studyTime: 35, accuracy: 82 },
  { date: '2024-11-23', cardsStudied: 62, cardsLearned: 18, cardsMastered: 8, studyTime: 48, accuracy: 88 },
  { date: '2024-11-24', cardsStudied: 38, cardsLearned: 8, cardsMastered: 4, studyTime: 25, accuracy: 75 },
  { date: '2024-11-25', cardsStudied: 55, cardsLearned: 15, cardsMastered: 7, studyTime: 42, accuracy: 85 },
  { date: '2024-11-26', cardsStudied: 70, cardsLearned: 22, cardsMastered: 10, studyTime: 55, accuracy: 90 },
  { date: '2024-11-27', cardsStudied: 48, cardsLearned: 14, cardsMastered: 6, studyTime: 38, accuracy: 83 },
  { date: '2024-11-28', cardsStudied: 52, cardsLearned: 16, cardsMastered: 8, studyTime: 40, accuracy: 87 },
];

// Spaced Repetition Algorithm (SM-2 based)
export function calculateNextReview(
  quality: number, // 0-5 rating
  easeFactor: number,
  interval: number,
  repetitions: number
): { easeFactor: number; interval: number; repetitions: number; nextReview: Date } {
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  if (quality < 3) {
    // Failed - reset
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Passed
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions += 1;
  }

  // Update ease factor
  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview,
  };
}

// Get cards due for review
export function getCardsForStudy(cards: Flashcard[], limit: number = 20): Flashcard[] {
  const now = new Date();
  
  // Get new cards and cards due for review
  const dueCards = cards.filter(card => {
    if (card.status === 'new') return true;
    return new Date(card.nextReview) <= now;
  });

  // Sort: new cards first, then by next review date
  dueCards.sort((a, b) => {
    if (a.status === 'new' && b.status !== 'new') return -1;
    if (a.status !== 'new' && b.status === 'new') return 1;
    return new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime();
  });

  return dueCards.slice(0, limit);
}

// Generate quiz questions from flashcards
export function generateQuizQuestions(
  cards: Flashcard[],
  count: number = 10,
  type: 'multiple-choice' | 'true-false' | 'typing' = 'multiple-choice'
): { question: string; correctAnswer: string; options?: string[]; cardId: string }[] {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, cards.length));

  return selected.map(card => {
    if (type === 'multiple-choice') {
      // Generate wrong options from other cards
      const wrongOptions = cards
        .filter(c => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.back);

      const options = [card.back, ...wrongOptions].sort(() => Math.random() - 0.5);

      return {
        question: card.front,
        correctAnswer: card.back,
        options,
        cardId: card.id,
      };
    }

    return {
      question: card.front,
      correctAnswer: card.back,
      cardId: card.id,
    };
  });
}
