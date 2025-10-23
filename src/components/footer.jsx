import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-[var(--ink)]">
        <div>
          <h3 className="font-semibold mb-3">Help & Support</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:underline" to="/help">Help</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/contact">Customer Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Discover</h3>
          <ul className="space-y-2">
            <li><Link className="hover:underline" to="/?category=music">Music</Link></li>
            <li><Link className="hover:underline" to="/?category=sport">Sport</Link></li>
            <li><Link className="hover:underline" to="/?category=arts">Arts & Theatre</Link></li>
            <li><Link className="hover:underline" to="/?category=family">Family</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-xl px-4 py-4 text-xs text-[var(--ink-2)] flex items-center justify-between">
          <span>© {new Date().getFullYear()} EventMaster</span>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#">Privacy</a>
            <a className="hover:underline" href="#">Terms</a>
            <a className="hover:underline" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
