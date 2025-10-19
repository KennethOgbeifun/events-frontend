import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client.js";
import Hero from "../components/hero.jsx";
import EventCard from "../components/event-card.jsx";
import Featured from "../components/featured.jsx";

export default function EventsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // get filters from URL
  const filters = useMemo(() => {
    const f = Object.fromEntries(searchParams.entries());
    return {
      q: f.q || "",
      category: f.category || "",
      location: f.location || "",
      start: f.start || "",
      end: f.end || "",
      page: Number(f.page || 1),
    };
  }, [searchParams]);

  // fetch when filters change
  useEffect(() => {
    setLoading(true); setErr("");
    api.get("/api/events", { params: { ...filters, include: "counts" } })
      .then(({ data }) => setEvents(Array.isArray(data.events) ? data.events : []))
      .catch(e => setErr(e.response?.data?.msg || "Failed to load events"))
      .finally(() => setLoading(false));
  }, [filters]);


  if (loading) return <p style={{padding:16}}>Loading…</p>;
  if (err) return <p style={{padding:16, color:"crimson"}}>{err}</p>;

  return (
  <>
    <Hero />
    <main className="container-xl px-4 py-6">
      {err && <p className="mb-4 text-[var(--danger)]">{err}</p>}
      {loading && <p className="text-[var(--ink-2)]">Loading…</p>}

      {!loading && !err && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {(events || []).map((ev) => <EventCard key={ev.id} ev={ev} />)}
          </div>
            
        </div>
      )}

      {!loading && !err && (events || []).length === 0 && (
        <div className="text-[var(--ink-2)]">No events yet.</div>
      )}
    </main>
  </>
);

}
