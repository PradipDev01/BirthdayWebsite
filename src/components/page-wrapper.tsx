'use client';

import { useState, useEffect } from 'react';
import { Countdown } from './countdown';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  const targetDate = new Date('2025-11-24T00:00:00');

  useEffect(() => {
    const checkTime = () => {
      if (new Date() >= targetDate) {
        setIsTimeUp(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    
    // Component is now mounted and ready on the client
    setIsReady(true);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on the client

  if (!isReady) {
    // Render a loading state or nothing on the server and initial client render
    // to prevent hydration mismatch. A simple blur is fine.
     return (
        <div className="blur-content">
          {children}
        </div>
     );
  }

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
