'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { WishSubmissionForm } from './wish-submission-form';
import { useState } from 'react';
import { PenSquare } from 'lucide-react';

export function WishSubmissionDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PenSquare className="mr-2 h-4 w-4" />
          Leave a Wish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Send your birthday wish</DialogTitle>
          <DialogDescription className="font-body">
            Share a sweet message. It will appear on the page after a quick check.
          </DialogDescription>
        </DialogHeader>
        <WishSubmissionForm onFormSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
