import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";

export default function Featured({ title = "Featured", category, limit = 4 }) {
  const [events, setEvents] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr("");

    const params = { include: "counts", page: 1, limit };
    if (category) params.category = category;

    api.get("/api/events", { params })
      .then(({ data }) => {
        if (!cancelled) setEvents(data.events || []);
      })
      .catch((e) => {
        if (!cancelled) setErr("Failed to load featured");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [category, limit]);

  return (
    <aside className="hidden lg:block w-[300px]">
      <div className="card p-4">
        <h3 className="font-semibold mb-3">{title}</h3>

        {loading && (
          <div className="space-y-3 animate-pulse">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="rounded-lg h-20 bg-[var(--surface)]" />
            ))}
          </div>
        )}

        {!loading && err && (
          <div className="text-sm text-[crimson]">{err}</div>
        )}

        {!loading && !err && events && events.length === 0 && (
          <div className="text-sm text-[var(--ink-2)]">No featured events right now.</div>
        )}

        {!loading && !err && events && events.length > 0 && (
          <ul className="space-y-3">
            {events.map((ev) => (
              <li key={ev.id}>
                <Link to={`/events/${ev.id}`} className="block rounded-lg overflow-hidden hover:opacity-95 transition">
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        ev.image_url ||
                        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={ev.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--ink-2)]">
                      {ev.category || "Event"}
                    </div>
                    <div className="text-sm font-medium text-[var(--ink)] line-clamp-2">
                      {ev.title}
                    </div>
                    <div className="text-xs text-[var(--ink-2)]">
                      {new Date(ev.start_time).toLocaleDateString()} • {ev.location}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
