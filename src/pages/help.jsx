export default function HelpPage() {
  return (
    <main className="container-xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Help & FAQs</h1>
      <p className="text-[var(--ink-2)] mb-6">
        Quick answers to common questions about browsing and booking events.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="card p-4">
          <h2 className="font-semibold mb-2">How do I search for events?</h2>
          <p>Use the blue search bar: pick a city (or type one), enter a search term, then press <strong>Search</strong>.</p>
        </article>

        <article className="card p-4">
          <h2 className="font-semibold mb-2">How do categories work?</h2>
          <p>Click <em>Music</em>, <em>Sport</em>, <em>Arts</em>, or <em>Family</em> in the top navigation to filter the events list.</p>
        </article>

        <article className="card p-4">
          <h2 className="font-semibold mb-2">Do I need an account?</h2>
          <p>You can browse without an account, but you’ll need to <strong>register or log in</strong> to sign up for events or add them to your calendar.</p>
        </article>

        <article className="card p-4">
          <h2 className="font-semibold mb-2">Add to Google Calendar</h2>
          <p>After logging in, click <strong>Connect Google</strong> (top right). When you sign up for an event, we’ll add it to your Google Calendar.</p>
        </article>

        <article className="card p-4">
          <h2 className="font-semibold mb-2">Payments</h2>
          <p>Some events are free. For paid events, you’ll see pricing on the card. (Payments may be in test mode during development.)</p>
        </article>

        <article className="card p-4">
          <h2 className="font-semibold mb-2">I can’t see any results</h2>
          <p>Try clearing filters from the blue bar: remove the city and search text, then press <strong>Search</strong>. Also check your internet connection.</p>
        </article>
      </section>

      <section className="mt-8 card p-4">
        <h2 className="font-semibold mb-2">Still need help?</h2>
        <p>
          Visit <a className="text-[var(--brand)] hover:underline" href="/contact">Contact us</a> to send a message.
        </p>
      </section>
    </main>
  );
}
