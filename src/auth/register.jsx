import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../auth/authcontext.jsx";

export default function RegisterPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { state } = useLocation();
  const redirectTo = state?.from || "/";

  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const { data } = await api.post("/api/auth/register", {
        email: form.email,
        name: form.name,
        password: form.password,
      });
      // server returns { token, user }, same as login
      login(data.token);
      nav(redirectTo, { replace: true });
    } catch (e2) {
      setErr(e2.response?.data?.msg || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-xl px-4 py-10">
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-2xl font-bold mb-1">Create your account</h1>
        <p className="text-[var(--ink-2)] mb-6">
          Join the community and start booking events.
        </p>

        {err && (
          <div className="mb-4 text-[var(--danger)]" role="alert">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-[var(--ink)]">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
              value={form.email}
              onChange={onChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[var(--ink)]">Name</span>
            <input
              name="name"
              autoComplete="name"
              required
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
              value={form.name}
              onChange={onChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[var(--ink)]">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              required
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
              value={form.password}
              onChange={onChange}
            />
            <span className="block mt-1 text-xs text-[var(--ink-2)]">
              Use 8+ characters with a mix of letters and numbers.
            </span>
          </label>

          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm flex items-center justify-between">
          <Link to="/login" className="text-[var(--brand)] hover:underline">
            Already have an account? Log in
          </Link>
          <a href="#" className="text-[var(--ink-2)] hover:underline">
            Need help?
          </a>
        </div>
      </div>
    </main>
  );
}
