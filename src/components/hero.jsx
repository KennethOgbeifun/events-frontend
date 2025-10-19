export default function Hero() {
  return (
    <section className="bg-black">
      <div className="container-xl px-4 py-8">
        <div className="relative overflow-hidden rounded-xl shadow-card">
          <img
            className="w-full aspect-banner"
            src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1600&auto=format&fit=crop"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute left-6 bottom-6 text-white max-w-lg">
            <h1 className="text-3xl font-bold">The Annual Potatoe Fair</h1>
            <p className="opacity-90">Comming Soon to a City Near You</p>
          </div>
        </div>
      </div>
    </section>
  );
}
