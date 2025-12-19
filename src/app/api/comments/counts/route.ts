import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// GET /api/comments/counts - Get comment counts for all prompts
export async function GET() {
  try {
    // Get all keys matching the comments pattern
    const keys = await redis.keys('comments:*');

    if (keys.length === 0) {
      return NextResponse.json({});
    }

    // Get the length of each list
    const counts: Record<string, number> = {};

    await Promise.all(
      keys.map(async (key) => {
        const promptId = key.replace('comments:', '');
        const count = await redis.llen(key);
        counts[promptId] = count;
      })
    );

    return NextResponse.json(counts);
  } catch (error) {
    console.error('Error fetching comment counts:', error);
    return NextResponse.json({}, { status: 200 });
  }
}
