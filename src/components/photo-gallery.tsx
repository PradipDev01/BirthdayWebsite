import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export function PhotoGallery() {
  return (
    <section id="gallery" className="w-full py-12 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline sm:text-4xl md:text-5xl">A Walk Down Memory Lane</h2>
          <p className="text-muted-foreground font-body md:text-lg">Some of our cherished moments together.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {PlaceHolderImages.map((img, index) => (
            <div
              key={img.id}
              className="group relative transform transition-transform duration-300 hover:scale-105"
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (index * 0.8 + 1)}deg)`
              }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/80">
                <CardContent className="p-2 sm:p-3">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    width={600}
                    height={800}
                    className="aspect-[3/4] object-cover rounded-md"
                    data-ai-hint={img.imageHint}
                  />
                  <p className="text-center font-body text-sm mt-2 text-muted-foreground">{img.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
