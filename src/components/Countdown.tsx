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
    <div className="mt-8 w-full flex justify-center px-4">
      <div className="flex items-center justify-center gap-3 sm:gap-8 w-full max-w-xs">
        {[
          { v: time.days, l: "дней" },
          { v: time.hours, l: "часов" },
          { v: time.minutes, l: "минут" },
          { v: time.seconds, l: "секунд" },
        ].map((p, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <span
              className="text-gold tabular-nums leading-none font-bold"
              style={{ fontFamily: "ui-monospace, monospace", fontSize: "clamp(1rem, 6vw, 2rem)" }}
            >
              {pad(p.v)}
            </span>
            <span
              className="text-sand-light/50 uppercase mt-1 tracking-wider"
              style={{ fontSize: "clamp(0.45rem, 2vw, 0.6rem)" }}
            >
              {p.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}