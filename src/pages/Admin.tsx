import { useState } from "react";
import func2url from "../../backend/func2url.json";

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

const RSVP_URL = func2url.rsvp;

export default function Admin() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${RSVP_URL}?password=${encodeURIComponent(password)}`);
      const json = await res.json();
      if (res.status === 403) {
        setError("Неверный пароль");
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-12 px-4">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ fontFamily: "Playfair Display, serif", color: "#C9A84C" }}
      >
        Tropic Party
      </h1>
      <p className="text-white/50 mb-10 text-sm">Список гостей · только для организатора</p>

      {!data ? (
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
        >
          <label className="text-white/70 text-sm">Введите пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-yellow-500 transition"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-2xl">
          {/* Счётчики */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-yellow-400">{data.total}</div>
              <div className="text-white/50 text-sm mt-1">Всего ответов</div>
            </div>
            <div className="bg-white/5 border border-green-500/20 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-green-400">{data.yes}</div>
              <div className="text-white/50 text-sm mt-1">Придут ✓</div>
            </div>
            <div className="bg-white/5 border border-red-500/20 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-red-400">{data.no}</div>
              <div className="text-white/50 text-sm mt-1">Не придут ✗</div>
            </div>
          </div>

          {/* Таблица */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-3 text-white/40 text-xs uppercase tracking-widest border-b border-white/10">
              <span>Имя</span>
              <span className="text-center">Ответ</span>
              <span className="text-right">Дата</span>
            </div>
            {data.guests.length === 0 ? (
              <div className="px-6 py-10 text-center text-white/30">Пока никто не ответил</div>
            ) : (
              data.guests.map((g) => (
                <div
                  key={g.id}
                  className="grid grid-cols-3 px-6 py-4 border-b border-white/5 last:border-0 items-center"
                >
                  <span className="font-medium">{g.name}</span>
                  <span className="text-center">
                    {g.answer === "yes" ? (
                      <span className="inline-block bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                        Приду
                      </span>
                    ) : (
                      <span className="inline-block bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                        Не смогу
                      </span>
                    )}
                  </span>
                  <span className="text-right text-white/40 text-xs">{formatDate(g.created_at)}</span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => { setData(null); setPassword(""); }}
            className="mt-6 text-white/30 hover:text-white/60 text-sm transition"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
