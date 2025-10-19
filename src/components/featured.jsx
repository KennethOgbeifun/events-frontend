export default function Featured() {
  return (
    <aside aria-label="Featured content" className="hidden lg:block w-[300px]">
      <div className="card p-4 mb-4">
        <h3 className="font-semibold mb-2">FEATURED</h3>
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden">
            <img className="w-full aspect-[16/9] object-cover"
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
              alt="Guides" />
          </div>
          <div className="text-sm">Entertainment Guides</div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Comedy</h3>
        <img className="w-full aspect-[16/9] object-cover rounded-lg"
             src="https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1000&auto=format&fit=crop"
             alt="Comedy" />
      </div>
    </aside>
  );
}
