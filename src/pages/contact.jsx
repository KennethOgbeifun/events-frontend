import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    // add functionality later
    setSent(true);
  }

  return (
    <main className="container-xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Contact us</h1>
      <p className="text-[var(--ink-2)] mb-6">
        Have a question or feedback? Send us a message and we’ll get back to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          {sent ? (
            <div className="text-[var(--brand)]">
              Thanks! Your message has been sent.
            </div>
          ) : (
            <>
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input
                  name="name"
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  rows="5"
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
                  value={form.message}
                  onChange={onChange}
                  required
                />
              </label>
              <button className="btn btn-primary">Send</button>
              <div className="text-xs text-[var(--ink-2)]">
                Or email us directly:{" "}
                <a className="text-[var(--brand)] hover:underline" href="mailto:support@ticketclone.local">
                  support@NotaRealEmail.com
                </a>
              </div>
            </>
          )}
        </form>

        <aside className="card p-6 space-y-3">
          <h2 className="font-semibold">Quick info</h2>
          <div className="text-sm">
            <div><span className="font-medium">Hours:</span> Mon–Fri, 9am–5pm (UK)</div>
            <div><span className="font-medium">Response time:</span> Within 1–2 business days</div>
          </div>
          <div className="text-sm">
            <div className="font-medium">Popular links</div>
            <ul className="list-disc list-inside">
              <li><a className="text-[var(--brand)] hover:underline" href="/help">Help & FAQs</a></li>
              <li><a className="text-[var(--brand)] hover:underline" href="/">Browse events</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
