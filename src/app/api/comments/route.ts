import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface Comment {
  id: string;
  promptId: string;
  author: string;
  content: string;
  createdAt: string;
}

// GET /api/comments?promptId=xxx - Get comments for a prompt
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get('promptId');

    if (!promptId) {
      return NextResponse.json(
        { error: 'promptId is required' },
        { status: 400 }
      );
    }

    const comments = await redis.lrange<Comment>(`comments:${promptId}`, 0, -1) || [];
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/comments - Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { promptId, author, content } = body;

    if (!promptId || !author || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: promptId, author, content' },
        { status: 400 }
      );
    }

    const comment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      promptId,
      author: author.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    // Add to the beginning of the list (newest first)
    await redis.lpush(`comments:${promptId}`, JSON.stringify(comment));

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
