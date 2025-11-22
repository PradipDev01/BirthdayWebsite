'use client';

import { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: string;
};

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft as { days: number; hours: number; minutes: number; seconds: number; };
};

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if (isNaN(value)) {
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md">
      <div className="text-center text-primary-foreground space-y-8 animate-in fade-in duration-1000">
        <h2 className="font-headline text-3xl md:text-4xl">The celebration begins in...</h2>
        <div className="flex justify-center gap-4 md:gap-8 p-4 rounded-lg">
          {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
        <p className="font-body text-lg text-primary-foreground/80">Get ready for a special surprise!</p>
      </div>
    </div>
  );
}
