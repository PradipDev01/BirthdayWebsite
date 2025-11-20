import { Header } from '@/components/header';
import { PhotoGallery } from '@/components/photo-gallery';
import { WishesDisplay, type Wish } from '@/components/wishes-display';
import { getFirestore, collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Flower2 } from 'lucide-react';
import Image from 'next/image';

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
        <section id="hero" className="relative overflow-hidden w-full py-20 md:py-32 lg:py-40 text-center animate-in fade-in duration-1000">
          <div className="container px-4 md:px-6 relative z-10">
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
           {/* Floating Tulips */}
           <div className="absolute inset-0 z-0 pointer-events-none">
            <Image src="https://www.transparentpng.com/thumb/tulip/mD3o2Y-tulip-vector-free-download-clipart.png" alt="Floating Tulip" width={80} height={80} className="absolute tulip-1" />
            <Image src="https://www.transparentpng.com/thumb/tulip/V4i5sJ-tulip-picture.png" alt="Floating Tulip" width={60} height={60} className="absolute tulip-2" />
            <Image src="https://www.transparentpng.com/thumb/tulip/yI4k3g-tulip-clipart-transparent.png" alt="Floating Tulip" width={100} height={100} className="absolute tulip-3" />
            <Image src="https://www.transparentpng.com/thumb/tulip/zJWl65-pink-tulip-background.png" alt="Floating Tulip" width={70} height={70} className="absolute tulip-4" />
            <Image src="https://www.transparentpng.com/thumb/tulip/tulip-png-icon-23.png" alt="Floating Tulip" width={90} height={90} className="absolute tulip-5" />
            <Image src="https://www.transparentpng.com/thumb/tulip/w2R37A-tulip-hd-photo.png" alt="Floating Tulip" width={50} height={50} className="absolute tulip-6" />
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
