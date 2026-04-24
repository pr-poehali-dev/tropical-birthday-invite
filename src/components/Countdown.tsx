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

const LABELS = ["дней", "часов", "минут", "секунд"];

export default function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <div className="flex justify-center gap-3 md:gap-6 mt-10">
      {values.map((val, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-gold/40 bg-black/60 backdrop-blur-sm">
              <span className="font-display font-bold text-2xl md:text-3xl text-sand-light tabular-nums">
                {String(val).padStart(2, "0")}
              </span>
            </div>
            <div className="absolute inset-0 border border-gold/20 translate-x-1 translate-y-1 -z-10" />
          </div>
          <span className="mt-2 text-gold/70 text-[10px] uppercase tracking-[0.15em] font-sans">
            {LABELS[i]}
          </span>
        </div>
      ))}
    </div>
  );
}