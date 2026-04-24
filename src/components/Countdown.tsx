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
    <div className="mt-10 text-center px-4">
      <div className="flex justify-center items-center gap-3 flex-wrap">
        {[
          { v: time.days, l: "дней" },
          { v: time.hours, l: "часов" },
          { v: time.minutes, l: "минут" },
          { v: time.seconds, l: "секунд" },
        ].map((p, i) => (
          <div key={i} className="flex flex-col items-center min-w-0">
            <span className="font-sans font-bold text-2xl text-gold tabular-nums leading-none">
              {pad(p.v)}
            </span>
            <span className="font-sans text-[10px] text-sand-light/50 uppercase tracking-wider mt-1">
              {p.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}