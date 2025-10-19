import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../auth/authcontext.jsx";

export default function EventDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();          // <-- get token here
  const nav = useNavigate();

  const [event, setEvent] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load event + my signup status
  useEffect(() => {
    let cancel = false;

    async function load() {
      setLoading(true);
      setErr("");
      try {
        // 1) event details
        const ev = await api.get(`/api/events/${id}`);
        if (!cancel) setEvent(ev.data.event || ev.data);

        // 2) am I signed up? (only if logged in)
        if (token) {
          const mine = await api.get("/api/signups/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!cancel) {
            const ids = (mine.data?.event_ids || []).map(String);
            setSignedUp(ids.includes(String(id)));
          }
        } else {
          if (!cancel) setSignedUp(false);
        }
      } catch (e) {
        if (!cancel) setErr("Failed to load event");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();
    return () => { cancel = true; };
  }, [id, token]);

  // Sign up action
  async function onSignUp() {
    if (!user) return nav(`/login?next=${encodeURIComponent(`/events/${id}`)}`);
    setBusy(true);
    setErr("");
    try {
      const { data } = await api.post(
        `/api/events/${id}/signups`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // <-- include token
      );
      setSignedUp(true);
      if (data.calendar?.htmlLink) {
        window.open(data.calendar.htmlLink, "_blank");
      }
    } catch (e) {
      setErr(e.response?.data?.msg || "Signup failed");
    } finally {
      setBusy(false);
    }
  }

  if (err) return <p style={{ padding: 16, color: "crimson" }}>{err}</p>;
  if (loading || !event) return <p style={{ padding: 16 }}>Loading…</p>;

  return (
    <main className="container-xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{event.title}</h1>

      <div className="flex flex-wrap gap-2 text-sm text-[var(--ink-2)]">
        <span className="rounded-[var(--radius-pill)] bg-[var(--surface)] px-3 py-1">
          {new Date(event.start_time).toLocaleString()} — {new Date(event.end_time).toLocaleString()}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--surface)] px-3 py-1">
          {event.location}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--brand-50)] text-[var(--brand)] px-3 py-1">
          {event.price_type}
        </span>
      </div>

      <p className="text-[var(--ink)]">{event.description}</p>

      {/* 👇 Swap the button based on signedUp */}
      {signedUp ? (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-2)]"
          title="You’re already signed up for this event"
        >
          <span aria-hidden>✓</span>
          <span>Already signed up</span>
        </div>
      ) : (
        <button
          onClick={onSignUp}
          disabled={busy}
          className="btn btn-primary"
        >
          {busy ? "Signing up…" : "Sign up"}
        </button>
      )}
    </main>
  );
}
