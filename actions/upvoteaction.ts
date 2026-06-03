'use server'

import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';
import { revalidatePath } from 'next/cache';

export async function upvoteResource(id: string) {
  try {
    await connectToDatabase();
    await Resource.findByIdAndUpdate(id, { $inc: { upvotes: 1 } });
    revalidatePath('/');
  } catch (error) {
    console.error("Upvote failed:", error);
    throw new Error('Failed to upvote');
  }
}