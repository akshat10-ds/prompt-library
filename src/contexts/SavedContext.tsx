'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SavedContextType {
    savedIds: string[];
    isSaved: (id: string) => boolean;
    toggleSave: (id: string) => void;
    clearSaved: () => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('saved-prompts');
        if (saved) {
            try {
                setSavedIds(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved prompts:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage when IDs change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('saved-prompts', JSON.stringify(savedIds));
        }
    }, [savedIds, isLoaded]);

    const isSaved = (id: string) => savedIds.includes(id);

    const toggleSave = (id: string) => {
        setSavedIds(prev =>
            prev.includes(id)
                ? prev.filter(savedId => savedId !== id)
                : [...prev, id]
        );
    };

    const clearSaved = () => setSavedIds([]);

    return (
        <SavedContext.Provider value={{ savedIds, isSaved, toggleSave, clearSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSavedContext() {
    const context = useContext(SavedContext);
    if (context === undefined) {
        throw new Error('useSavedContext must be used within a SavedProvider');
    }
    return context;
}
