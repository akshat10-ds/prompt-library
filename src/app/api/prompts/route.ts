import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { CategoryId } from '@/data/types';

// Initialize Redis with KV_ prefixed environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface PromptSubmission {
  id: string;
  title: string;
  description: string;
  content: string;
  category: CategoryId;
  tags: string[];
  author: string;
  email: string;
  exampleOutput?: string;
  urls?: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

// GET /api/prompts - Get all pending submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';

    const submissions = await redis.hgetall<Record<string, PromptSubmission>>('prompt-submissions') || {};

    const filtered = Object.values(submissions).filter(
      (submission) => submission.status === status
    );

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/prompts - Submit a new prompt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, category, tags, author, email, exampleOutput, urls } = body;

    // Validate required fields
    if (!title || !description || !content || !category || !author || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, content, category, author, email' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories: CategoryId[] = ['marketing', 'sales', 'product-design', 'engineering'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: marketing, sales, product-design, engineering' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const submission: PromptSubmission = {
      id,
      title,
      description,
      content,
      category,
      tags: tags || [],
      author,
      email,
      exampleOutput: exampleOutput || undefined,
      urls: urls && urls.length > 0 ? urls : undefined,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Store in Redis
    await redis.hset('prompt-submissions', { [id]: JSON.stringify(submission) });

    return NextResponse.json({
      success: true,
      message: 'Prompt submitted successfully! It will be reviewed by our team.',
      id
    });
  } catch (error) {
    console.error('Error submitting prompt:', error);
    return NextResponse.json(
      { error: 'Failed to submit prompt. Please try again.' },
      { status: 500 }
    );
  }
}
