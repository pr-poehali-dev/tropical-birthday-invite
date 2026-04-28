import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import Countdown from "@/components/Countdown";
import func2url from "../../backend/func2url.json";

const RSVP_URL = func2url.rsvp;
// v3 — fix LEOPARD_PHOTO reference

// Фото Татьяны (Wfolio — фотограф Ольга Королёва)
// TANYA_CIRCLE — новое фото для кружка (Mail.ru DD2n)
const TANYA_CIRCLE = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/1a7ba296-6767-4fd6-9794-09a9bb2df104.jpg";
const TANYA_1 = "https://i.wfolio.ru/x/nh2hBFOybeR4yRlieqG9JopNXDjN8qR8/HJp4z61teD_8MkzCvcJimfst-PyJthqQ/FEHc3Y7JxPbaP66Vo1EX1PtoSI4YUE5K/aZqr8lk--9yYSzYXE-zxmqVoQw91q4Ht/gTH3L4hJxHNzZVS-nQebtZ-331JX38ho/lVrRPzO12IOyTiuz_XZztCbfQX8gVIjT/1bxHumx6ZJuvxYVQztHMb0bkWhC-bG57/uk-ACsUVCJmbE3Fvr8-R4qbnJOXQJcId/zgkjy6HhkL4xJWt0MIFm7wI0oltKhh1x/02bC_aInMCFBoIJ4PjStGKvyJeCm-m9A/mCsRVJ1x3e8TNVIf_jg92bpct-TXWO7Y/R9S2t8GbgzP97vKpi5APq8jCnWhtIpgg/cpjBHTWdjCX0whEa0AqI8VHkqHoZ4oPW/uZhqZSJLHtN-HA6h3UNWnaKkV0Q0b2hR/NfWUjhxmNaRvtjhENIsB7HDtOOe_ncYc/VAmrkRbexmAlDHQhGoaRWDjjb61bfIdl/DngD-KsIOBvkVgwKEffblj6t83R7xn_L/2mvivb7KADNppWMR2BY5mB1_PZ29zjCa.jpg";
const TANYA_2 = "https://i.wfolio.ru/x/23Q2n7kS-flJtGEKTA-UZuoJhg9IPs5Y/vOPf0Hc-kvd-Tf5Xw-IWA_xDr8NWmpnj/ShjY2u9jNa-T1FsIuSWem1-eE-4w_11g/BNrz5fXskRFpWWZ-2cQObmw_J_6x8Blf/4ugrsYydHcQvilmNobKhoGc8yOcv9KE/tFQxGd__YRvLVk7bCt5g3wFT3JhkUZjC/Zl1G_9vBpbkWbV3Kn6uNGi8xAmsmcQCX/hd3FNfZt7dUFfY5CcKdVL8DaI5p3yonM/7GCxG8EI3SYwHWJXFHRjvIMZl1S9BNJN/Q8g6K2nq7JdKxHp_YAWOlStlRMVWj-F2/U_LVxzYL94wd_RXqwNfHSFrOAJIKq5A8/c2j1L3qWN8j7vaqzxFN-H_eTRxYNE-nG/VrVMkGcqFyvqt50szqidZBYDZW9NJlMs/gCE7xkDZ3v0vD2PwJqzfluHEuHy6Xw5F/kq30wYzB8VKjixizVbixVAzWwqt5F-aR/Q8_jqVOCZ2-W98ZxSOeqW1k7FmPpN7vb/j94mQvSUP0cjgOdKJqpPNbz8eNyU8JUT/jBQ3e-tqnwlMGhzPiKi8d_JpEisgpGl0.jpg";
const TANYA_3 = "https://cloclo60.cloud.mail.ru/weblink/view/wJZ8/AXqjhYwgx";
const TANYA_4 = "https://cloclo60.cloud.mail.ru/weblink/view/frFR/n1m1XDahA";
const TANYA_5 = "https://cloclo60.cloud.mail.ru/weblink/view/gucx/sUQe7YWnt";
// Доп. фото именинницы из галереи
const TANYA_6 = "https://cloclo60.cloud.mail.ru/weblink/view/SR33/HTUwtBHoq";

const TANYA_PHOTO = TANYA_1;

// Фото для портретной секции (новое фото kKW6)
const TANYA_PORTRAIT = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/98930c1c-e954-4127-bc63-d9e3e809ee79.jpg";

// Большое фото перед контактами
const TANYA_FULLBG = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/7bc97f36-d878-4774-8989-c4161efe18c1.jpg";

// Ткани для дресс-кода
const DRESSCODE_FABRICS = "https://cloclo60.cloud.mail.ru/weblink/view/agBK/AEWka9GDe";

const PANTHER_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/105555b1-f862-4530-8439-02aa5a0be615.jpg";
const COCKTAIL_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/5f7cc73b-d1c8-45aa-9d9e-c10e920eda27.jpg";
// Татьяна стоит с леопардом на поводке
const TANYA_LEOP_STAND = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/3704ba48-9334-4ea5-8225-a02dd8584abd.jpg";
// Оригинальный леопард для фона блока программы
const LEOPARD_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/files/ad50acb0-d652-43be-956b-69ded969b2b8.jpg";
// Татьяна с пантерой (чёрный образ)
const TANYA_PANTHER = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/430f04b8-f297-4f3b-99eb-4db702e26614.jpg";
// Татьяна смотрит на леопарда
const TANYA_LEOP_LOOK = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/e054e6a6-bb87-4895-a7fc-f1fe6a0bbe6a.jpg";

const PEACOCK_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/33bc6c86-ff75-4ec6-a914-75b3881e09ca.jpg";
const MONSTERA_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/4d9bef6a-15bb-4070-ab01-97a0b3eb2937.jpg";
const TANYA_BLACK = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/6ad533d3-3d36-4d44-aa6b-58dd2dde0ea5.jpg";

const MONSTERA_PHOTO2 = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/e885876b-3a02-4f98-8678-66c0c06107e4.jpg";
const FLOWERS_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/03752955-530c-4d4d-944d-e7f5e198a1de.jpg";

const GALLERY_IMAGES = [
  // чередование: природа/Татьяна в каждой строке (2 и 3 колонки)
  { src: TANYA_LEOP_STAND, alt: "Татьяна с леопардом", pos: "object-top" },
  { src: PANTHER_PHOTO, alt: "Пантера", pos: "object-center" },
  { src: PEACOCK_PHOTO, alt: "Павлин", pos: "object-center" },
  { src: MONSTERA_PHOTO2, alt: "Тропические листья", pos: "object-center" },
  { src: TANYA_PANTHER, alt: "Татьяна с пантерой", pos: "object-top" },
  { src: COCKTAIL_PHOTO, alt: "Тропический коктейль", pos: "object-center" },
  { src: FLOWERS_PHOTO, alt: "Тропические цветы", pos: "object-center" },
  { src: TANYA_LEOP_LOOK, alt: "Татьяна и леопард", pos: "object-top" },
];

const NAV_LINKS = [
  { href: "about", label: "Программа" },
  { href: "dresscode", label: "Дресс-код" },
  { href: "datetime", label: "Дата" },
  { href: "location", label: "Место" },
  { href: "gallery", label: "Галерея" },
  { href: "contacts", label: "Контакты" },
  { href: "rsvp", label: "RSVP" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-6 mt-6">
      {[
        { v: timeLeft.days, l: "дней" },
        { v: timeLeft.hours, l: "часов" },
        { v: timeLeft.minutes, l: "минут" },
        { v: timeLeft.seconds, l: "секунд" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <p className="font-bold text-gold tabular-nums" style={{ fontFamily: "ui-monospace, monospace", fontSize: "clamp(1.4rem, 7vw, 2.5rem)" }}>
            {String(v).padStart(2, "0")}
          </p>
          <p className="text-sand-dark uppercase tracking-widest mt-1" style={{ fontSize: "clamp(0.5rem, 2.5vw, 0.65rem)" }}>{l}</p>
        </div>
      ))}
    </div>
  );
}

function PalmLeafLeft({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 380 Q20 300 10 200 Q5 100 60 20 Q80 60 70 120 Q65 180 100 380Z" fill="currentColor" opacity="0.9"/>
      <path d="M100 380 Q40 320 30 240 Q25 160 80 80 Q90 120 85 180 Q80 240 100 380Z" fill="currentColor" opacity="0.6"/>
      <path d="M100 380 Q60 340 55 280 Q50 200 90 130 Q100 170 95 220 Q90 270 100 380Z" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function PalmLeafRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 380 Q180 300 190 200 Q195 100 140 20 Q120 60 130 120 Q135 180 100 380Z" fill="currentColor" opacity="0.9"/>
      <path d="M100 380 Q160 320 170 240 Q175 160 120 80 Q110 120 115 180 Q120 240 100 380Z" fill="currentColor" opacity="0.6"/>
      <path d="M100 380 Q140 340 145 280 Q150 200 110 130 Q100 170 105 220 Q110 270 100 380Z" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </section>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold text-2xl">✦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

interface Guest {
  id: number;
  name: string;
  answer: "yes" | "no";
  created_at: string;
}
interface AdminData {
  guests: Guest[];
  total: number;
  yes: number;
  no: number;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAnswer, setRsvpAnswer] = useState<"yes" | "no" | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError("");
    try {
      const res = await fetch(`${RSVP_URL}?password=${encodeURIComponent(adminPassword)}`);
      const json = await res.json();
      if (res.status === 403) {
        setAdminError("Неверный пароль");
      } else {
        setAdminData(json);
      }
    } catch {
      setAdminError("Ошибка подключения");
    } finally {
      setAdminLoading(false);
    }
  };

  const closeAdmin = () => {
    setAdminOpen(false);
    setAdminPassword("");
    setAdminData(null);
    setAdminError("");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpAnswer) return;
    try {
      await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rsvpName, answer: rsvpAnswer }),
      });
    } catch {
      // сохраняем в любом случае, даже если сеть недоступна
    }
    setRsvpSent(true);
  };

  return (
    <div className="font-body text-sand-light min-h-screen overflow-x-hidden leopard-bg">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-script text-gold text-xl tracking-wide">Tropic Party</span>
          <button
            className="md:hidden text-gold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-sand-dark hover:text-gold transition-colors duration-300 text-sm uppercase tracking-widest font-light"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-jungle-light/98 backdrop-blur-md px-6 pb-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => { scrollTo(l.href); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-sand-dark hover:text-gold transition-colors border-b border-jungle-mid text-sm uppercase tracking-widest"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Leopard background image */}
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${LEOPARD_PHOTO})`, backgroundPosition: "center 30%" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Gold vignette glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, #C9A84C 0%, transparent 70%)`,
          }}
        />

        {/* Palm leaves deco */}
        <div className="absolute left-0 top-0 h-full w-64 text-gold/10 animate-float-slow pointer-events-none">
          <PalmLeafLeft className="absolute -left-8 top-8 h-96 w-auto" />
          <PalmLeafLeft className="absolute -left-4 bottom-12 h-72 w-auto opacity-50" />
        </div>
        <div className="absolute right-0 top-0 h-full w-64 text-gold/10 animate-float pointer-events-none">
          <PalmLeafRight className="absolute -right-8 top-8 h-96 w-auto" />
          <PalmLeafRight className="absolute -right-4 bottom-20 h-64 w-auto opacity-50" />
        </div>

        {/* Gold sparkles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold opacity-30 animate-float"
            style={{
              width: `${3 + i * 2}px`,
              height: `${3 + i * 2}px`,
              left: `${8 + i * 14}%`,
              top: `${15 + (i % 3) * 28}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}

        <div className="relative text-center px-6 max-w-4xl mx-auto pt-20" style={{ animation: "fade-in 1.2s ease-out forwards" }}>

          {/* Photo of birthday girl */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-gold shadow-2xl shadow-gold/40">
                <img
                  src={TANYA_CIRCLE}
                  alt="Татьяна"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 10%", transform: "scale(1.15)" }}
                />
              </div>
              <div className="absolute -inset-2 rounded-full border border-gold/30 animate-float" />
              <div className="absolute -inset-5 rounded-full border border-gold/15" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap shadow-lg">
                🐆 Именинница
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="font-display font-black text-6xl md:text-8xl leading-none mb-3 mt-6 gold-shimmer">
            Татьяна
          </h1>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-2xl">🌴</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Invitation text block */}
          <div className="mb-4 px-4 md:px-0">
            <p className="font-script text-gold text-2xl md:text-3xl drop-shadow-lg mb-1">
              Приглашаю вас на свой День рождения
            </p>
            <p className="font-display font-black text-3xl md:text-5xl text-white tracking-widest uppercase drop-shadow-lg">
              TROPIC PARTY
            </p>
          </div>

          <p className="font-display text-lg md:text-xl italic text-gold-light mb-8">
            18 мая · 2026
          </p>

          <button
            onClick={() => scrollTo("rsvp")}
            className="inline-block bg-gold text-black font-body font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/40"
          >
            Подтвердить участие
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </header>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LEOPARD_PHOTO})`, filter: "brightness(0.25)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">О событии</p>
          <h2 className="font-display text-5xl md:text-6xl text-sand-light mb-6 font-bold">Добро пожаловать<br /><em>в тропики!</em></h2>
          <GoldDivider />
          <p className="text-sand-dark text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Этот вечер будет наполнен теплом тропического солнца, ароматом экзотических цветов и лёгким бризом. Приглашаю вас разделить со мной этот особенный праздник в атмосфере роскошных тропиков.
          </p>
          <p className="text-sand-dark text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Пусть каждый станет частью этого сказочного путешествия в мой мир. С любовью и благодарностью. ❤️
          </p>
          <p className="text-gold font-semibold text-xl mt-4 mb-12">Сбор гостей в 15:00</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Camera", label: "Велком зона", desc: "Фотосессия в сочных тропических локациях" },
              { icon: "UtensilsCrossed", label: "Банкет", desc: "Вкусные закуски, фрукты и напитки из жаркой Африки" },
              { icon: "Music2", label: "Шоу программа", desc: "Танцевальные и вокальные группы, ведущий" },
              { icon: "Disc3", label: "Дискотека", desc: "Танцы и Dj" },
            ].map((item) => (
              <div key={item.label} className="border border-gold/20 p-8 hover:border-gold/50 transition-colors duration-300 group text-center backdrop-blur-sm bg-black/20">
                <div className="text-gold mb-4 flex justify-center">
                  <Icon name={item.icon} size={32} fallback="Star" />
                </div>
                <h3 className="font-display text-xl text-sand-light mb-2">{item.label}</h3>
                <p className="text-sand-dark text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TANYA PORTRAIT SECTION */}
      <section className="relative py-0 overflow-hidden" style={{ minHeight: "80vh" }}>
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${TANYA_PORTRAIT})`, backgroundPosition: "60% top" }}
        />
        {/* Затемнение только левой части, правая (лицо) остаётся чистой */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <div className="relative h-full flex items-center justify-start max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-md">
            <p className="font-script text-gold text-3xl mb-3">Именинница</p>
            <h2 className="font-display font-black text-6xl md:text-8xl text-white leading-none mb-4 gold-shimmer">
              Татьяна
            </h2>
            <div className="h-px w-24 bg-gold mb-6" />
            <p className="text-sand-dark font-light text-lg leading-relaxed">
              Загадочная. Яркая. Неповторимая.<br />
              Как настоящий леопард тропиков.
            </p>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <Section id="dresscode" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/75" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Дресс-код</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Тропический шик</h2>
            <GoldDivider />
            <p className="text-sand-dark text-lg max-w-xl mx-auto">Яркие принты, леопард, золото, чёрный гламур, зелень и цветочные украшения</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { label: "Золотой", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/683058f1-043a-4036-a46d-1026764442eb.jpg" },
              { label: "Шоколад", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/cb79462a-aad8-4e65-85a8-d62f9f2a52c0.jpg" },
              { label: "Тёмно-зелёный", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/7f3bc130-352c-4dae-83b9-2ab4d59be3d0.jpg" },
              { label: "Леопард", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/a7834910-8fc6-4846-889d-b4329e089947.jpg" },
              { label: "Чёрный гламур", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/4de37681-4d68-4af3-9f4d-1281a6dadb8f.jpg" },
              { label: "Бежевый", src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/1359c0b8-1e59-4e9b-8d2c-94b90235efef.jpg" },
            ].map((c) => (
              <div key={c.label} className="group relative overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={c.src}
                    alt={c.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <p className="text-sand-light text-sm font-light tracking-widest uppercase">{c.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DATETIME */}
      <Section id="datetime" className="py-24 px-6 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/bucket/05d4c64b-9c1c-42ab-83c0-671faa642137.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Дата и время</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Отметь в календаре</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Calendar", title: "Дата", main: "18 мая", sub: "2026 года" },
              { icon: "Clock", title: "Время", main: "15:00", sub: "Сбор гостей" },
              { icon: "Sparkles", title: "Формат", main: "Tropic Party", sub: "Тропический праздник" },
            ].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden bg-black/50 border border-gold/30 p-10 text-center group hover:border-gold/70 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-gold mb-4 flex justify-center">
                  <Icon name={item.icon} size={36} fallback="Star" />
                </div>
                <p className="text-gold text-xs uppercase tracking-widest mb-3">{item.title}</p>
                <p className="font-display text-4xl text-sand-light mb-2">{item.main}</p>
                <p className="text-sand-dark text-sm font-light">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LOCATION */}
      <Section id="location" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Место</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Где нас найти</h2>
            <GoldDivider />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-2 border-gold pl-8 mb-8">
                <h3 className="font-display text-3xl text-sand-light mb-2">Вилла на базе отдыха «Лесная сказка»</h3>
                <p className="text-gold text-sm uppercase tracking-wider mb-4">г. Краснодар</p>
                <p className="text-sand-dark leading-relaxed">
                  Хутор Ленина, ул. Южная, 95<br />
                  г. Краснодар
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "Clock", text: "Сбор гостей в 15:00" },
                  { icon: "MapPin", text: "Хутор Ленина, ул. Южная 95" },
                  { icon: "Phone", text: "+7 962 768-77-70" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4 text-sand-dark">
                    <div className="text-gold flex-shrink-0">
                      <Icon name={item.icon} size={18} fallback="MapPin" />
                    </div>
                    <span className="text-sm font-light">{item.text}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://yandex.ru/maps/org/lesnaya_skazka/48364685715?si=fmrjk45xf4r6k3z76j4udz03zg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-8 border border-gold text-gold px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold hover:text-jungle transition-all duration-300"
              >
                <Icon name="Map" size={16} />
                Открыть на Яндекс.Картах
              </a>
            </div>
            <div className="relative h-72 md:h-96 border border-gold/20 overflow-hidden flex flex-col items-center justify-center gap-6 bg-black/40 backdrop-blur-sm">
              <div className="text-gold">
                <Icon name="MapPin" size={56} fallback="Map" />
              </div>
              <div className="text-center px-6">
                <p className="text-sand-light font-display text-xl mb-1">Вилла на базе отдыха «Лесная сказка»</p>
                <p className="text-sand-dark text-sm font-light">Хутор Ленина, ул. Южная, 95 · г. Краснодар</p>
              </div>
              <a
                href="https://yandex.ru/maps/org/lesnaya_skazka/48364685715?si=fmrjk45xf4r6k3z76j4udz03zg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-2 text-sm uppercase tracking-widest hover:bg-gold hover:text-jungle transition-all duration-300"
              >
                <Icon name="Navigation" size={14} />
                Маршрут
              </a>
              <div className="absolute top-0 right-0 text-jungle-mid opacity-20 pointer-events-none">
                <PalmLeafRight className="h-48 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* COUNTDOWN */}
      <Section id="countdown" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-black/80" />
        <div className="max-w-4xl mx-auto relative text-center">
          <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">До праздника осталось</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-sand-light mb-8">18 мая 2026</h2>
          <GoldDivider />
          <Countdown targetDate={new Date("2026-05-18T15:00:00")} />
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Галерея</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Атмосфера праздника</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full h-full object-cover ${img.pos} transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="font-script text-gold text-xl">{img.alt}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FULL BG PHOTO before contacts */}
      <div className="text-center py-12 px-6 bg-black">
        <p className="font-script text-gold text-3xl md:text-4xl mb-3">18 мая · 2026</p>
        <h2 className="font-display font-black text-5xl md:text-7xl text-white gold-shimmer">Tropic Party</h2>
      </div>
      <section className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TANYA_FULLBG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Контакты</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Связаться со мной</h2>
            <GoldDivider />
            <p className="text-sand-dark font-light mb-8">Подтвердите своё участие заранее</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 962 768-77-70", href: "tel:+79627687770" },
              { icon: "MessageCircle", label: "WhatsApp", value: "Написать в WhatsApp", href: "https://wa.me/79627687770" },
              { icon: "Send", label: "Telegram", value: "@tatyanka_life", href: "https://t.me/tatyanka_life" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gold/20 p-8 text-center hover:border-gold/60 hover:bg-black/40 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="text-gold mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  <Icon name={c.icon} size={32} fallback="Phone" />
                </div>
                <p className="text-gold text-xs uppercase tracking-widest mb-2">{c.label}</p>
                <p className="text-sand-light font-light text-sm">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* RSVP */}
      <Section id="rsvp" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/75" />
        <div className="max-w-2xl mx-auto relative">
          <div className="text-center mb-16">

            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Вы придёте?</h2>
            <GoldDivider />
            <p className="text-sand-dark font-light">Пожалуйста, подтвердите своё присутствие заранее</p>
          </div>

          {rsvpSent ? (
            <div className="border border-gold/40 p-12 text-center bg-black/50 backdrop-blur-sm">
              <div className="text-gold mb-6 flex justify-center">
                <Icon name="CheckCircle" size={56} fallback="Check" />
              </div>
              <h3 className="font-display text-3xl text-sand-light mb-4">
                {rsvpAnswer === "yes" ? "Отлично! Ждём вас!" : "Жаль, что не сможете прийти"}
              </h3>
              <p className="text-sand-dark font-light">
                {rsvpAnswer === "yes"
                  ? "Мы рады, что вы присоединитесь к нашему тропическому вечеру!"
                  : "Спасибо за ответ. Будем скучать!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="border border-gold/20 p-10 bg-black/50 backdrop-blur-sm space-y-8">
              <div>
                <label className="block text-gold text-xs uppercase tracking-widest mb-3">Ваше имя</label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Введите ваше имя"
                  className="w-full bg-black/50 border border-gold/20 text-sand-light placeholder-sand-dark/50 px-5 py-4 focus:outline-none focus:border-gold/60 transition-colors font-light text-sm"
                />
              </div>
              <div>
                <label className="block text-gold text-xs uppercase tracking-widest mb-4">Ваш ответ</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRsvpAnswer("yes")}
                    className={`py-4 border text-sm uppercase tracking-widest transition-all duration-300 ${rsvpAnswer === "yes" ? "bg-gold text-black border-gold" : "border-gold/30 text-sand-dark hover:border-gold/60 hover:text-sand-light"}`}
                  >
                    🌴 Да, приду!
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAnswer("no")}
                    className={`py-4 border text-sm uppercase tracking-widest transition-all duration-300 ${rsvpAnswer === "no" ? "bg-gold/30 text-gold border-gold/60" : "border-gold/30 text-sand-dark hover:border-gold/60 hover:text-sand-light"}`}
                  >
                    😔 Не смогу
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!rsvpName || !rsvpAnswer}
                className="w-full bg-gold text-black py-4 text-sm uppercase tracking-widest font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-gold/20 text-center">
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold text-xl">🐆</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="font-script text-3xl text-gold mb-1">Tropic Party</p>
          <p className="font-display text-lg italic text-sand-dark mb-1">Татьяна · День Рождения</p>
          <p className="text-sand-dark/50 text-xs font-light tracking-widest uppercase">2026</p>
          <button
            onClick={() => setAdminOpen(true)}
            className="mt-6 text-sand-dark/20 hover:text-sand-dark/50 text-xs transition-colors duration-300"
          >
            ···
          </button>
        </div>
      </footer>

      {/* ADMIN MODAL */}
      {adminOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4" onClick={closeAdmin}>
          <div
            className="w-full max-w-lg bg-[#0a0a0a] border border-gold/20 rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeAdmin} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
              <Icon name="X" size={20} />
            </button>
            <p className="font-script text-gold text-2xl mb-1">Tropic Party</p>
            <p className="text-white/40 text-xs mb-6">Список гостей · только для организатора</p>

            {!adminData ? (
              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <label className="text-white/60 text-sm">Введите пароль</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-yellow-500 transition"
                />
                {adminError && <p className="text-red-400 text-sm">{adminError}</p>}
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {adminLoading ? "Загрузка..." : "Войти"}
                </button>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{adminData.total}</div>
                    <div className="text-white/40 text-xs mt-1">Всего</div>
                  </div>
                  <div className="bg-white/5 border border-green-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{adminData.yes}</div>
                    <div className="text-white/40 text-xs mt-1">Придут ✓</div>
                  </div>
                  <div className="bg-white/5 border border-red-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{adminData.no}</div>
                    <div className="text-white/40 text-xs mt-1">Не придут ✗</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 px-4 py-2 text-white/30 text-xs uppercase tracking-wider border-b border-white/10">
                    <span>Имя</span><span className="text-center">Ответ</span><span className="text-right">Дата</span>
                  </div>
                  {adminData.guests.length === 0 ? (
                    <div className="px-4 py-8 text-center text-white/30 text-sm">Пока никто не ответил</div>
                  ) : (
                    adminData.guests.map((g) => (
                      <div key={g.id} className="grid grid-cols-3 px-4 py-3 border-b border-white/5 last:border-0 items-center">
                        <span className="text-white text-sm font-medium truncate">{g.name}</span>
                        <span className="text-center">
                          {g.answer === "yes"
                            ? <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Приду</span>
                            : <span className="inline-block bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">Не смогу</span>
                          }
                        </span>
                        <span className="text-right text-white/30 text-xs">{formatDate(g.created_at)}</span>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={closeAdmin} className="mt-4 text-white/30 hover:text-white/60 text-xs transition">Закрыть</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}