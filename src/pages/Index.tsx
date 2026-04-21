import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TANYA_PHOTO = "https://i.wfolio.ru/x/nh2hBFOybeR4yRlieqG9JopNXDjN8qR8/HJp4z61teD_8MkzCvcJimfst-PyJthqQ/FEHc3Y7JxPbaP66Vo1EX1PtoSI4YUE5K/aZqr8lk--9yYSzYXE-zxmqVoQw91q4Ht/gTH3L4hJxHNzZVS-nQebtZ-331JX38ho/lVrRPzO12IOyTiuz_XZztCbfQX8gVIjT/1bxHumx6ZJuvxYVQztHMb0bkWhC-bG57/uk-ACsUVCJmbE3Fvr8-R4qbnJOXQJcId/zgkjy6HhkL4xJWt0MIFm7wI0oltKhh1x/02bC_aInMCFBoIJ4PjStGKvyJeCm-m9A/mCsRVJ1x3e8TNVIf_jg92bpct-TXWO7Y/R9S2t8GbgzP97vKpi5APq8jCnWhtIpgg/cpjBHTWdjCX0whEa0AqI8VHkqHoZ4oPW/uZhqZSJLHtN-HA6h3UNWnaKkV0Q0b2hR/NfWUjhxmNaRvtjhENIsB7HDtOOe_ncYc/VAmrkRbexmAlDHQhGoaRWDjjb61bfIdl/DngD-KsIOBvkVgwKEffblj6t83R7xn_L/2mvivb7KADNppWMR2BY5mB1_PZ29zjCa.jpg";

const LEOPARD_PHOTO = "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/files/ad50acb0-d652-43be-956b-69ded969b2b8.jpg";

const GALLERY_IMAGES = [
  { src: TANYA_PHOTO, alt: "Татьяна" },
  { src: LEOPARD_PHOTO, alt: "Леопард в джунглях" },
  { src: TANYA_PHOTO, alt: "Татьяна" },
  { src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/files/090c4f62-4ae5-4682-ab40-188c8ded582e.jpg", alt: "Тропический декор" },
  { src: TANYA_PHOTO, alt: "Татьяна" },
  { src: "https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/files/f92fae87-5fa0-4867-b548-3ec6da2ac66a.jpg", alt: "Торт" },
];

const NAV_LINKS = [
  { href: "#about", label: "О событии" },
  { href: "#datetime", label: "Дата" },
  { href: "#location", label: "Место" },
  { href: "#gallery", label: "Галерея" },
  { href: "#contacts", label: "Контакты" },
  { href: "#rsvp", label: "RSVP" },
];

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

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAnswer, setRsvpAnswer] = useState<"yes" | "no" | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName && rsvpAnswer) setRsvpSent(true);
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
                <a
                  href={l.href}
                  className="text-sand-dark hover:text-gold transition-colors duration-300 text-sm uppercase tracking-widest font-light"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-jungle-light/98 backdrop-blur-md px-6 pb-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sand-dark hover:text-gold transition-colors border-b border-jungle-mid text-sm uppercase tracking-widest"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Leopard background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${LEOPARD_PHOTO})` }}
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

        <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ animation: "fade-in 1.2s ease-out forwards" }}>
          {/* Party title */}
          <p className="font-script text-gold text-3xl md:text-4xl mb-3 drop-shadow-lg">
            Tropic Party
          </p>
          <p className="text-gold-light/80 text-xs uppercase tracking-[0.5em] mb-8 font-light">
            С любовью приглашаем вас на день рождения
          </p>

          {/* Photo of birthday girl */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gold shadow-2xl shadow-gold/40">
                <img
                  src="https://i.wfolio.ru/x/nh2hBFOybeR4yRlieqG9JopNXDjN8qR8/HJp4z61teD_8MkzCvcJimfst-PyJthqQ/FEHc3Y7JxPbaP66Vo1EX1PtoSI4YUE5K/aZqr8lk--9yYSzYXE-zxmqVoQw91q4Ht/gTH3L4hJxHNzZVS-nQebtZ-331JX38ho/lVrRPzO12IOyTiuz_XZztCbfQX8gVIjT/1bxHumx6ZJuvxYVQztHMb0bkWhC-bG57/uk-ACsUVCJmbE3Fvr8-R4qbnJOXQJcId/zgkjy6HhkL4xJWt0MIFm7wI0oltKhh1x/02bC_aInMCFBoIJ4PjStGKvyJeCm-m9A/mCsRVJ1x3e8TNVIf_jg92bpct-TXWO7Y/R9S2t8GbgzP97vKpi5APq8jCnWhtIpgg/cpjBHTWdjCX0whEa0AqI8VHkqHoZ4oPW/uZhqZSJLHtN-HA6h3UNWnaKkV0Q0b2hR/NfWUjhxmNaRvtjhENIsB7HDtOOe_ncYc/VAmrkRbexmAlDHQhGoaRWDjjb61bfIdl/DngD-KsIOBvkVgwKEffblj6t83R7xn_L/2mvivb7KADNppWMR2BY5mB1_PZ29zjCa.jpg"
                  alt="Татьяна"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold ring glow */}
              <div className="absolute -inset-2 rounded-full border border-gold/30 animate-float" />
              <div className="absolute -inset-4 rounded-full border border-gold/15" />
              {/* Leopard accent badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase whitespace-nowrap shadow-lg">
                🐆 Именинница
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="font-display font-black text-6xl md:text-8xl leading-none mb-3 gold-shimmer">
            Татьяна
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-2xl">🌴</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="font-display text-xl md:text-2xl italic text-gold-light mb-10">
            День Рождения · 2026
          </p>

          <a
            href="#rsvp"
            className="inline-block bg-gold text-black font-body font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/40"
          >
            Подтвердить участие
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </header>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">О событии</p>
          <h2 className="font-display text-5xl md:text-6xl text-sand-light mb-6 font-bold">Добро пожаловать<br /><em>в тропики!</em></h2>
          <GoldDivider />
          <p className="text-sand-dark text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Этот вечер будет наполнен теплом тропического солнца, ароматом экзотических цветов и лёгким бризом. Мы приглашаем вас разделить с нами этот особенный праздник в атмосфере роскошных тропиков.
          </p>
          <p className="text-sand-dark text-lg leading-relaxed max-w-2xl mx-auto">
            Дресс-код: <span className="text-gold font-medium">тропический шик</span> — яркие принты, золото, цветы в волосах. Пусть каждый станет частью этого незабываемого путешествия!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: "Sunset", label: "Вечерняя атмосфера", desc: "Живая музыка и коктейли на закате" },
              { icon: "Utensils", label: "Тропический стол", desc: "Экзотические блюда и напитки" },
              { icon: "Music", label: "Танцы", desc: "DJ сет до самого утра" },
            ].map((item) => (
              <div key={item.label} className="border border-gold/20 p-8 hover:border-gold/50 transition-colors duration-300 group">
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
      <section className="relative py-0 overflow-hidden" style={{ minHeight: "70vh" }}>
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${TANYA_PHOTO})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
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

      {/* DATETIME */}
      <Section id="datetime" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Дата и время</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Отметь в календаре</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Calendar", title: "Дата", main: "18 Мая", sub: "2026 года" },
              { icon: "Clock", title: "Время", main: "19:00", sub: "Приём гостей с 18:30" },
              { icon: "Sparkles", title: "Формат", main: "Gala Night", sub: "Тропический вечер" },
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
                <h3 className="font-display text-3xl text-sand-light mb-2">Tropical Garden Hall</h3>
                <p className="text-gold text-sm uppercase tracking-wider mb-4">Ресторан & Банкетный зал</p>
                <p className="text-sand-dark leading-relaxed">
                  ул. Тропическая, 15<br />
                  Москва, Россия
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "Car", text: "Бесплатная парковка для гостей" },
                  { icon: "MapPin", text: "5 минут от метро Садовая" },
                  { icon: "Phone", text: "+7 (999) 000-00-00" },
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
                href="#"
                className="inline-flex items-center gap-3 mt-8 border border-gold text-gold px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold hover:text-jungle transition-all duration-300"
              >
                <Icon name="Map" size={16} />
                Открыть карту
              </a>
            </div>
            <div className="relative h-72 md:h-96 bg-black/50 border border-gold/20 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gold mb-4">
                    <Icon name="MapPin" size={48} fallback="Map" />
                  </div>
                  <p className="text-sand-dark text-sm font-light">Карта будет добавлена</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 text-jungle-mid opacity-30">
                <PalmLeafRight className="h-48 w-auto" />
              </div>
            </div>
          </div>
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
          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Large Tanya photo */}
            <div className="relative overflow-hidden group cursor-pointer row-span-2 col-span-1" style={{ minHeight: "400px" }}>
              <img src={TANYA_PHOTO} alt="Татьяна" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <span className="font-script text-gold text-2xl">Татьяна</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
            {/* Leopard */}
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "1/1" }}>
              <img src={LEOPARD_PHOTO} alt="Леопард" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-4xl">🐆</span>
              </div>
            </div>
            {/* Tanya small */}
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "1/1" }}>
              <img src={TANYA_PHOTO} alt="Татьяна" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <span className="font-script text-gold text-xl">Именинница</span>
              </div>
            </div>
            {/* Decor */}
            <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "1/1" }}>
              <img src="https://cdn.poehali.dev/projects/088db2ae-c442-49c8-ab1c-0e981533d983/files/090c4f62-4ae5-4682-ab40-188c8ded582e.jpg" alt="Декор" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            {/* Tanya again */}
            <div className="relative overflow-hidden group cursor-pointer col-span-1" style={{ aspectRatio: "1/1" }}>
              <img src={TANYA_PHOTO} alt="Татьяна" className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="font-script text-gold text-lg">🌴 Tropic Party</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-script">Контакты</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Связаться с нами</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00", href: "tel:+79990000000" },
              { icon: "Mail", label: "Email", value: "tatiana@party.ru", href: "mailto:tatiana@party.ru" },
              { icon: "MessageCircle", label: "WhatsApp", value: "Написать сообщение", href: "#" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
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
            <p className="font-script text-gold text-2xl mb-2">RSVP</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-sand-light">Вы придёте?</h2>
            <GoldDivider />
            <p className="text-sand-dark font-light">Пожалуйста, подтвердите своё присутствие до 1 августа</p>
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
        </div>
      </footer>
    </div>
  );
}