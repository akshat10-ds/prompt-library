import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis with KV_ prefixed environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// GET /api/votes - Get all vote counts
export async function GET() {
  try {
    const votes = await redis.hgetall('prompt-votes') || {};
    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({}, { status: 200 });
  }
}

// POST /api/votes - Update vote for a prompt
export async function POST(request: NextRequest) {
  try {
    const { promptId, action } = await request.json();

    if (!promptId || !['upvote', 'downvote'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request. Required: promptId, action (upvote/downvote)' },
        { status: 400 }
      );
    }

    // Get current vote count
    const currentVotes = await redis.hget<number>('prompt-votes', promptId) || 0;

    // Calculate new vote count
    const newVotes = action === 'upvote' ? currentVotes + 1 : currentVotes - 1;

    // Update in Redis
    await redis.hset('prompt-votes', { [promptId]: newVotes });

    return NextResponse.json({ promptId, votes: newVotes });
  } catch (error) {
    console.error('Error updating vote:', error);
    return NextResponse.json(
      { error: 'Failed to update vote' },
      { status: 500 }
    );
  }
}
