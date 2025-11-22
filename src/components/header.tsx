import { WishSubmissionDialog } from './wish-submission-dialog';
import { Flower2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Flower2 className="h-6 w-6 mr-2 text-primary-foreground/50 fill-primary" />
          <span className="font-headline text-lg font-semibold">
            Tulip Wishes
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <WishSubmissionDialog />
        </div>
      </div>
    </header>
  );
}
