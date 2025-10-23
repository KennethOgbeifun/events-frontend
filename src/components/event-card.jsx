import { Link } from "react-router-dom";
import { useAuth } from "../auth/authcontext.jsx";

export default function EventCard({ ev }) {
  const { user } = useAuth();

  return (
    <>
      <Link to={`/events/${ev.id}`} className="block card p-3 shadow-card shadow-hover transition">
        <img
          className="w-full aspect-card"
          src={ev.image_url || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop"}
          alt={ev.title}
        />
        <div className="mt-3 text-xs text-[var(--ink-2)]">{ev.category}</div>
        <h3 className="text-base font-semibold mt-1">{ev.title}</h3>
        <div className="text-sm text-[var(--ink-2)]">{new Date(ev.start_time).toLocaleDateString()} • {ev.location}</div>
      </Link>
    </> 
  );
}
