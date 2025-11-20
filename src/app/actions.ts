'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
    // Moderate the wish content using GenAI
    const moderationResult = await moderateBirthdayWish({ wishText: parsed.data.message });

    if (!moderationResult.isAppropriate) {
      return { success: false, error: `Your message was flagged as inappropriate. Reason: ${moderationResult.reason}` };
    }

    // Add to Firestore
    await addDoc(collection(db, 'wishes'), {
      name: parsed.data.name,
      message: parsed.data.message,
      createdAt: serverTimestamp(),
    });

    // Revalidate the page to show the new wish
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error submitting wish:', error);
    // Check for Firebase not configured error
    if (error instanceof Error && (error.message.includes('Firebase App is not initialized') || error.message.includes('Failed to get document because the client is offline'))) {
        return { success: false, error: 'The wish submission feature is not configured. Please contact the site owner.' };
    }
    return { success: false, error: 'Could not submit your wish. Please try again later.' };
  }
}
