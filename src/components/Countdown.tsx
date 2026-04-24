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

  const parts = [
    { value: time.days, label: "дн" },
    { value: time.hours, label: "ч" },
    { value: time.minutes, label: "мин" },
    { value: time.seconds, label: "сек" },
  ];

  return (
    <div className="flex justify-center items-end gap-4 mt-10 flex-wrap">
      {parts.map((p, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="font-display font-bold text-5xl text-gold tabular-nums leading-none">
            {String(p.value).padStart(2, "0")}
          </span>
          <span className="text-sand-light/50 text-xs uppercase tracking-widest mt-1">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
