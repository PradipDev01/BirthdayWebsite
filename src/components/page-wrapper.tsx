'use client';

import { useState, useEffect } from 'react';
import { Countdown } from './countdown';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  // Set the target date to November 24, 2024, at 11:59:00 PM
  const targetDate = new Date('2024-11-24T23:59:00');

  useEffect(() => {
    // This check will only run on the client-side
    const checkTime = () => {
      if (new Date() >= targetDate) {
        setIsTimeUp(true);
      }
    };

    checkTime();
    const interval = setInterval(() => {
      checkTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isTimeUp) {
    return (
      <>
        <div className="blur-content">
          {children}
        </div>
        <Countdown targetDate={targetDate.toISOString()} />
      </>
    );
  }

  return <>{children}</>;
}
