'use client';

import { useState, useEffect, useCallback } from 'react';

interface VotesState {
  [promptId: string]: number;
}

interface UserVotes {
  [promptId: string]: 'up' | 'down' | null;
}

export function useVotes() {
  const [votes, setVotes] = useState<VotesState>({});
  const [userVotes, setUserVotes] = useState<UserVotes>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load votes from API and user's votes from localStorage
  useEffect(() => {
    async function loadVotes() {
      try {
        const response = await fetch('/api/votes');
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error('Failed to load votes:', error);
      } finally {
        setIsLoading(false);
      }
    }

    // Load user's personal vote history from localStorage
    const savedUserVotes = localStorage.getItem('user-votes');
    if (savedUserVotes) {
      setUserVotes(JSON.parse(savedUserVotes));
    }

    loadVotes();
  }, []);

  // Save user votes to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(userVotes).length > 0) {
      localStorage.setItem('user-votes', JSON.stringify(userVotes));
    }
  }, [userVotes]);

  const vote = useCallback(async (promptId: string, action: 'upvote' | 'downvote') => {
    const currentUserVote = userVotes[promptId];

    // Determine what action to take based on current state
    let apiAction: 'upvote' | 'downvote' | null = null;
    let newUserVote: 'up' | 'down' | null = null;

    if (action === 'upvote') {
      if (currentUserVote === 'up') {
        // Already upvoted, remove the upvote
        apiAction = 'downvote';
        newUserVote = null;
      } else if (currentUserVote === 'down') {
        // Was downvoted, change to upvote (need to add 2: remove downvote + add upvote)
        apiAction = 'upvote';
        newUserVote = 'up';
        // First remove the downvote
        await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId, action: 'upvote' }),
        });
      } else {
        // No vote yet, add upvote
        apiAction = 'upvote';
        newUserVote = 'up';
      }
    } else {
      if (currentUserVote === 'down') {
        // Already downvoted, remove the downvote
        apiAction = 'upvote';
        newUserVote = null;
      } else if (currentUserVote === 'up') {
        // Was upvoted, change to downvote (need to subtract 2: remove upvote + add downvote)
        apiAction = 'downvote';
        newUserVote = 'down';
        // First remove the upvote
        await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId, action: 'downvote' }),
        });
      } else {
        // No vote yet, add downvote
        apiAction = 'downvote';
        newUserVote = 'down';
      }
    }

    if (apiAction) {
      try {
        const response = await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId, action: apiAction }),
        });

        const data = await response.json();

        setVotes(prev => ({
          ...prev,
          [promptId]: data.votes,
        }));

        setUserVotes(prev => ({
          ...prev,
          [promptId]: newUserVote,
        }));
      } catch (error) {
        console.error('Failed to vote:', error);
      }
    }
  }, [userVotes]);

  const getVoteCount = useCallback((promptId: string) => {
    return votes[promptId] || 0;
  }, [votes]);

  const getUserVote = useCallback((promptId: string) => {
    return userVotes[promptId] || null;
  }, [userVotes]);

  return {
    votes,
    isLoading,
    vote,
    getVoteCount,
    getUserVote,
  };
}
