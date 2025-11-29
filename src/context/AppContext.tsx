"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Deck, Flashcard, DailyProgress } from '@/types';
import { mockUser, mockDecks, mockFlashcards, mockDailyProgress } from '@/lib/store';

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;

  // Decks
  decks: Deck[];
  createDeck: (deck: Omit<Deck, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'cardCount' | 'masteredCount'>) => void;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
  deleteDeck: (id: string) => void;
  getDeck: (id: string) => Deck | undefined;

  // Flashcards
  flashcards: Flashcard[];
  getFlashcardsByDeck: (deckId: string) => Flashcard[];
  createFlashcard: (card: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'status'>) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
  bulkCreateFlashcards: (cards: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'status'>[]) => void;

  // Progress
  dailyProgress: DailyProgress[];
  updateProgress: (progress: Partial<DailyProgress>) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initialize with mock data on mount
  useEffect(() => {
    // Check for saved auth state
    const savedAuth = localStorage.getItem('smartdex_auth');
    if (savedAuth) {
      setUser(mockUser);
      setDecks(mockDecks);
      setFlashcards(mockFlashcards);
      setDailyProgress(mockDailyProgress);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any credentials
    if (email && password) {
      setUser(mockUser);
      setDecks(mockDecks);
      setFlashcards(mockFlashcards);
      setDailyProgress(mockDailyProgress);
      localStorage.setItem('smartdex_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setDecks([]);
    setFlashcards([]);
    setDailyProgress([]);
    localStorage.removeItem('smartdex_auth');
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      const newUser: User = {
        ...mockUser,
        name,
        email,
        createdAt: new Date(),
        streak: 0,
        totalCardsStudied: 0,
        totalStudyTime: 0,
      };
      setUser(newUser);
      setDecks([]);
      setFlashcards([]);
      setDailyProgress([]);
      localStorage.setItem('smartdex_auth', 'true');
      return true;
    }
    return false;
  };

  const createDeck = (deckData: Omit<Deck, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'cardCount' | 'masteredCount'>) => {
    const newDeck: Deck = {
      ...deckData,
      id: Date.now().toString(),
      userId: user?.id || '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      cardCount: 0,
      masteredCount: 0,
    };
    setDecks(prev => [...prev, newDeck]);
  };

  const updateDeck = (id: string, updates: Partial<Deck>) => {
    setDecks(prev => prev.map(deck => 
      deck.id === id ? { ...deck, ...updates, updatedAt: new Date() } : deck
    ));
  };

  const deleteDeck = (id: string) => {
    setDecks(prev => prev.filter(deck => deck.id !== id));
    setFlashcards(prev => prev.filter(card => card.deckId !== id));
  };

  const getDeck = (id: string) => decks.find(deck => deck.id === id);

  const getFlashcardsByDeck = (deckId: string) => 
    flashcards.filter(card => card.deckId === deckId);

  const createFlashcard = (cardData: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'status'>) => {
    const newCard: Flashcard = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: new Date(),
      status: 'new',
    };
    setFlashcards(prev => [...prev, newCard]);
    
    // Update deck card count
    updateDeck(cardData.deckId, {
      cardCount: getFlashcardsByDeck(cardData.deckId).length + 1,
    });
  };

  const updateFlashcard = (id: string, updates: Partial<Flashcard>) => {
    setFlashcards(prev => prev.map(card =>
      card.id === id ? { ...card, ...updates, updatedAt: new Date() } : card
    ));
  };

  const deleteFlashcard = (id: string) => {
    const card = flashcards.find(c => c.id === id);
    if (card) {
      setFlashcards(prev => prev.filter(c => c.id !== id));
      updateDeck(card.deckId, {
        cardCount: getFlashcardsByDeck(card.deckId).length - 1,
      });
    }
  };

  const bulkCreateFlashcards = (cards: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'status'>[]) => {
    const newCards: Flashcard[] = cards.map((cardData, index) => ({
      ...cardData,
      id: (Date.now() + index).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: new Date(),
      status: 'new' as const,
    }));
    
    setFlashcards(prev => [...prev, ...newCards]);
    
    // Update deck card counts
    const deckCounts: Record<string, number> = {};
    newCards.forEach(card => {
      deckCounts[card.deckId] = (deckCounts[card.deckId] || 0) + 1;
    });
    
    Object.entries(deckCounts).forEach(([deckId, count]) => {
      const currentCount = getFlashcardsByDeck(deckId).length;
      updateDeck(deckId, { cardCount: currentCount + count });
    });
  };

  const updateProgress = (progress: Partial<DailyProgress>) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyProgress(prev => {
      const existing = prev.find(p => p.date === today);
      if (existing) {
        return prev.map(p => p.date === today ? { ...p, ...progress } : p);
      }
      return [...prev, { 
        date: today, 
        cardsStudied: 0, 
        cardsLearned: 0, 
        cardsMastered: 0, 
        studyTime: 0, 
        accuracy: 0,
        ...progress 
      }];
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      signup,
      decks,
      createDeck,
      updateDeck,
      deleteDeck,
      getDeck,
      flashcards,
      getFlashcardsByDeck,
      createFlashcard,
      updateFlashcard,
      deleteFlashcard,
      bulkCreateFlashcards,
      dailyProgress,
      updateProgress,
      sidebarOpen,
      setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
