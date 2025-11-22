'use client';

import { useState, useEffect } from 'react';
import { WishSubmissionDialog } from './wish-submission-dialog';
import { Button } from './ui/button';
import { Feather } from 'lucide-react';

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

  useEffect(() => {
    // Set initial time left
    setTimeLeft(calculateTimeLeft(targetDate));

    // Update time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if (value === undefined || isNaN(value)) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-widest">
          {String(value).padStart(2, '0')}
        </span>
        <span className="font-body text-lg md:text-xl text-primary-foreground/70 uppercase">
          {interval}
        </span>
      </div>
    );
  });

  const hasTimeLeft = Object.values(timeLeft).some(value => value !== undefined && value > 0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md">
      <div className="text-center text-primary-foreground space-y-8 animate-in fade-in duration-1000">
        <h2 className="font-headline text-3xl md:text-4xl">The celebration begins in...</h2>
        <div className="flex justify-center gap-4 md:gap-8 p-4 rounded-lg">
          {hasTimeLeft ? timerComponents : <span>Time's up!</span>}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="font-body text-lg text-primary-foreground/80">Get ready for a special surprise!</p>
          <WishSubmissionDialog
            trigger={
              <Button variant="ghost">
                <Feather className="mr-2 h-4 w-4" />
                Wish her (Rajanya) in advance
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
