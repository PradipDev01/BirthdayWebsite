import { Header } from '@/components/header';
import { PhotoGallery } from '@/components/photo-gallery';
import { WishesDisplay, type Wish } from '@/components/wishes-display';
import { getFirestore, collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Flower2 } from 'lucide-react';

async function getWishes(): Promise<Wish[]> {
  try {
    const db = getFirestore(app);
    const wishesCol = collection(db, 'wishes');
    const q = query(wishesCol, orderBy('createdAt', 'desc'));
    const wishesSnapshot = await getDocs(q);
    const wishesList = wishesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        message: data.message,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      };
    });
    return wishesList;
  } catch (error) {
    console.error("Error fetching wishes: ", error);
    // In a real app, you'd want better error handling.
    // For now, we'll return an empty array if Firestore isn't configured.
    return [];
  }
}

export default async function Home() {
  const wishes = await getWishes();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 text-center animate-in fade-in duration-1000">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl tracking-tighter">
                Happy Birthday, My Love
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground">
                Wishing you a day as beautiful as you are. Here's a small gallery of our moments and wishes from everyone who loves you.
              </p>
              <Flower2 className="h-12 w-12 mx-auto text-primary" />
            </div>
          </div>
        </section>

        <PhotoGallery />

        <WishesDisplay initialWishes={wishes} />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Made with love for the most special person in the world.</p>
      </footer>
    </div>
  );
}
