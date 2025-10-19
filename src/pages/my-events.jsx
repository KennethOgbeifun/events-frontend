import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../auth/authcontext.jsx";

export default function MyEvents() {
  const { user, token } = useAuth();
  const nav = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user) {
      // load login, then return to this page
      nav("/login?next=/me/events");
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        // 1) get my signup event IDs
        const mine = await api.get("/api/signups/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = new Set((mine.data?.event_ids) || []);

        // 2) get events and filter 
        const evs = await api.get("/api/events?limit=200");
        const list = (evs.data?.events || evs.data || []).filter(e => ids.has(e.id));

        if (!cancelled) setEvents(list);
      } catch (e) {
        if (!cancelled) setErr(e.response?.data?.msg || "Failed to load your events");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [user, token, nav]);

  if (!user) return null;
  if (loading) return <div className="container-xl px-4 py-6">Loading…</div>;
  if (err) return <div className="container-xl px-4 py-6 text-red-600">{err}</div>;

  return (
    <div className="container-xl px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>

      {events.length === 0 ? (
        <div className="text-[var(--ink-2)]">You haven’t signed up to any events yet.</div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map(ev => (
            <li key={ev.id} className="card p-4">
              <Link to={`/events/${ev.id}`} className="block hover:underline">
                <h3 className="font-semibold">{ev.title}</h3>
              </Link>
              <div className="text-sm text-[var(--ink-2)]">
                {ev.location} • {new Date(ev.start_time).toLocaleString()}
              </div>
              <p className="mt-2 line-clamp-3">{ev.description}</p>
              <div className="mt-3">
                <Link to={`/events/${ev.id}`} className="btn btn-outline">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
