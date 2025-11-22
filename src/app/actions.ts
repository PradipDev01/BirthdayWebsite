'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { moderateBirthdayWish } from '@/ai/flows/moderate-birthday-wishes';
import { revalidatePath } from 'next/cache';

const wishSchema = z.object({
  name: z.string().min(2).max(50),
  message: z.string().min(10).max(500),
});

export async function submitWish(values: z.infer<typeof wishSchema>) {
  const parsed = wishSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: 'Invalid input.' };
  }
  
  try {
    const moderationResult = await moderateBirthdayWish({ wishText: parsed.data.message });

    if (!moderationResult.isAppropriate) {
      return { success: false, error: `Your message was flagged as inappropriate. Reason: ${moderationResult.reason}` };
    }

    const client = await clientPromise;
    const db = client.db();
    
    await db.collection('wishes').insertOne({
      name: parsed.data.name,
      message: parsed.data.message,
      createdAt: new Date(),
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error submitting wish:', error);
    return { success: false, error: 'Could not submit your wish. Please try again later.' };
  }
}
