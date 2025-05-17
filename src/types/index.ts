// This file can be used for shared TypeScript types across the application.

export interface Party {
  id: string;
  name: string;
  partyCode: string;
  hostId: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Vote {
  emoji: string;
  count: number;
  partyId: string;
  timestamp?: Date; // Optional: if tracking individual votes
}

export interface EmojiVote {
  emoji: string;
  count: number;
}

// You can add more specific types as your application grows.
// For example, types for AI responses, API payloads, etc.
