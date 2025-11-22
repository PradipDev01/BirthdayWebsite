import { Header } from '@/components/header';
import { PhotoGallery } from '@/components/photo-gallery';
import { WishesDisplay, type Wish } from '@/components/wishes-display';
import clientPromise from '@/lib/mongodb';
import { Flower2 } from 'lucide-react';
import Image from 'next/image';

async function getWishes(): Promise<Wish[]> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const wishes = await db
      .collection('wishes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return wishes.map((wish) => ({
      id: wish._id.toString(),
      name: wish.name,
      message: wish.message,
      createdAt: wish.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching wishes: ", error);
    return [];
  }
}

export default async function Home() {
  const wishes = await getWishes();

  const tulipImage = "/tulips.png";
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative overflow-hidden w-full py-20 md:py-32 lg:py-40 text-center animate-in fade-in duration-1000">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="space-y-4 max-w-3xl mx-auto">
              <Image
                src="/cat-img.png"
                alt="A cute cat"
                width={150}
                height={150}
                className="mx-auto"
              />
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl tracking-tighter">
                Happy Birthday, My Love
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground">
                Wishing you a day as beautiful as you are. Here's a small gallery of our moments and wishes from everyone who loves you.
              </p>
            </div>
          </div>
           {/* Floating Tulips */}
           <div className="absolute inset-0 z-0 pointer-events-none">
            <Image src={tulipImage} alt="Floating Tulip" width={60} height={60} className="absolute tulip-1" />
            <Image src={tulipImage} alt="Floating Tulip" width={40} height={40} className="absolute tulip-2" />
            <Image src={tulipImage} alt="Floating Tulip" width={65} height={65} className="absolute tulip-3" />
            <Image src={tulipImage} alt="Floating Tulip" width={50} height={50} className="absolute tulip-4" />
            <Image src={tulipImage} alt="Floating Tulip" width={55} height={55} className="absolute tulip-5" />
            <Image src={tulipImage} alt="Floating Tulip" width={35} height={35} className="absolute tulip-6" />
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
