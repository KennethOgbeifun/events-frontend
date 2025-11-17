import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client.js";
import Hero from "../components/hero.jsx";
import EventCard from "../components/event-card.jsx";
import Featured from "../components/featured.jsx";
import LoadingBox from "../components/loading.jsx";

export default function EventsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");


  function compactParams(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== "" && v != null)
  );
  }
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
    setLoading(true);
    setErr("");

    const raw = { ...filters, include: "counts" };
    const params = compactParams(raw);

    api.get("/api/events", { params})
      .then(({ data }) => setEvents(Array.isArray(data.events) ? data.events : []))
      .catch(e => setErr(e.response?.data?.msg || "Failed to load events"))
      .finally(() => setLoading(false));
  }, [filters]);


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

          <Featured title="Featured" limit={4} />

            
        </div>
      )}

      {!loading && !err && (events || []).length === 0 && (
        <div className="text-[var(--ink-2)]">No events yet.</div>
      )}

      <LoadingBox active={loading} label="Loading events…" />
    </main>
  </>
);

}
