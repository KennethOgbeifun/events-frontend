import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";
import LoadingBox from "../components/loading.jsx";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setErr("");
    api.get("/api/events", { params: { include: "counts", limit: 50, page: 1 }})
      .then(({ data }) => { if (!cancel) setEvents(data.events || []); })
      .catch((e) => { if (!cancel) setErr(e.response?.data?.msg || "Failed to load events"); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, []);

  return (
    <main className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        <Link to="/admin/events/new" className="btn btn-primary">New event</Link>
      </div>

      {err && <p role="alert" aria-live="assertive" className="text-[crimson] mb-3">{err}</p>}

      <div className="grid gap-3">
        {events.map(ev => (
          <div key={ev.id} className="card p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-[var(--ink-2)]">
                {new Date(ev.start_time).toLocaleString()} • {ev.location}
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/events/${ev.id}/edit`} className="btn btn-outline">Edit</Link>
              <Link to={`/events/${ev.id}`} className="btn">View</Link>
            </div>
          </div>
        ))}
      </div>

      <LoadingBox active={loading} label="Loading admin…" />
    </main>
  );
}