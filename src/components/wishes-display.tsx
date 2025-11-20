'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flower2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type WishesDisplayProps = {
  initialWishes: Wish[];
};

export function WishesDisplay({ initialWishes }: WishesDisplayProps) {

  return (
    <section id="wishes" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline sm:text-4xl md:text-5xl">Wishes from the Heart</h2>
          <p className="text-muted-foreground font-body md:text-lg">Messages of love from friends and family.</p>
        </div>
        
        {initialWishes.length === 0 ? (
          <div className="text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg">
            <p>No wishes yet. Be the first to leave a message!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {initialWishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="bg-primary/50 p-3 rounded-full">
                         <Flower2 className="h-6 w-6 text-primary-foreground/70" />
                      </div>
                      <CardTitle className="font-headline text-xl">{wish.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="font-body text-base text-foreground/80 italic">
                        "{wish.message}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
