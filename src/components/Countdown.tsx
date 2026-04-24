import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-10 text-center">
      <p className="font-display font-bold text-3xl text-gold tabular-nums tracking-wide">
        {pad(time.days)}<span className="text-sand-light/50 text-base font-sans font-normal mx-1">дн</span>
        {pad(time.hours)}<span className="text-sand-light/50 text-base font-sans font-normal mx-1">ч</span>
        {pad(time.minutes)}<span className="text-sand-light/50 text-base font-sans font-normal mx-1">мин</span>
        {pad(time.seconds)}<span className="text-sand-light/50 text-base font-sans font-normal ml-1">сек</span>
      </p>
    </div>
  );
}