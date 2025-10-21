import { Link } from "react-router-dom";
import { useAuth } from "../auth/authcontext.jsx";

export default function TopBar() {
  const { user } = useAuth();
  return (
    <div className="border-b border-[var(--border)] text-xs text-[var(--ink-2)]">
      <div className="container-xl px-4 h-9 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>🇬🇧 UK</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden sm:inline text-[var(--ink)]">
              {user.email}
            </span>
          )}
          <Link className="hover:underline" to="/help">Help</Link>
          <Link className="hover:underline" to="/contact">Contact us</Link>        </div>
      </div>
    </div>
  );
}
