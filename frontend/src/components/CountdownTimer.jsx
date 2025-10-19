import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-gold-400/30 shadow-lg hover:scale-105 transition-transform">
      <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-2 drop-shadow-lg">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-white/80 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-gold-400">
        <Clock className="w-6 h-6 animate-pulse" />
        <h3 className="text-2xl font-bold">Mint Starts In</h3>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>
      <p className="text-center text-white/70 text-sm">
        November 11, 2025 at 18:00 UTC
      </p>
    </div>
  );
};

export default CountdownTimer;