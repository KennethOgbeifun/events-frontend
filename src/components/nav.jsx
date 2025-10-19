import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useAuth } from "../auth/authcontext.jsx";
import api from "../api/client.js";
import TopBar from "./top-bar.jsx";

export default function Nav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  //URL state (query params)
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const locationParam = sp.get("location") || "";

  function commitParams(patch = {}) {
    const next = Object.fromEntries(sp.entries());
    Object.assign(next, patch);

    for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
    
    if ("q" in patch || "location" in patch || "category" in patch) next.page = 1;

    if (loc.pathname !== "/") {
      nav({
        pathname: "/",
        search: `?${createSearchParams(next).toString()}`,
      });
    } else {
      setSp(next);
    }
  }

  function setCategory(cat) {
    commitParams({ category: cat });
    setCitiesOpen(false);
  }

  // Cities dropdown 
  const [citiesOpen, setCitiesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cities = [
    "Birmingham","Bristol","Brighton","Glasgow",
    "London","Manchester","Sheffield","Leeds",
    "Liverpool","Edinburgh"
  ];

  function selectCity(city) {
    commitParams({ location: city || "", category: "" });
    setCitiesOpen(false);
    setLocQuery(city || "");
  }

  useEffect(() => {
    function onDocClick(e) {
      if (!citiesOpen) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setCitiesOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [citiesOpen]);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setCitiesOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Location box
  const [locQuery, setLocQuery] = useState(locationParam);
  const [locOpen, setLocOpen] = useState(false);
  const [locActive, setLocActive] = useState(-1);
  const locBoxRef = useRef(null);
  const places = ["United Kingdom", ...cities];

  const filteredPlaces = places.filter(p =>
    p.toLowerCase().startsWith((locQuery || "").toLowerCase())
  );

  useEffect(() => {
    function onDocClick(e) {
      if (!locOpen) return;
      if (locBoxRef.current && !locBoxRef.current.contains(e.target)) {
        setLocOpen(false);
        setLocActive(-1);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [locOpen]);

  function commitLocation(nextValue) {
    setLocQuery(nextValue);
    commitParams({ location: nextValue });
    setLocOpen(false);
    setLocActive(-1);
  }

  // Search input
  const [queryText, setQueryText] = useState(q);
  useEffect(() => setQueryText(q), [q]);

  async function connectGoogle() {
    try {
      const { data } = await api.get("/api/integrations/google/init");
      window.location.href = data.authUrl;
    } catch {
      alert("Failed to start Google auth");
    }
  }

  return (
    <header>
      <TopBar />

      <div className="bg-white relative" ref={dropdownRef}>
        <div className="container-xl px-4 h-14 flex items-center gap-6">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-[var(--brand)]">
            Event<span className="text-[var(--ink)]">Master</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--ink)]">
            <button onClick={() => setCategory("music")}  className="hover:text-[var(--brand)]">Music</button>
            <button onClick={() => setCategory("sport")}  className="hover:text-[var(--brand)]">Sport</button>
            <button onClick={() => setCategory("arts")}   className="hover:text-[var(--brand)]">Arts, Theatre & Comedy</button>
            <button onClick={() => setCategory("family")} className="hover:text-[var(--brand)]">Family & Attractions</button>

            <button
              className="hover:text-[var(--brand)]"
              aria-haspopup="true"
              aria-expanded={citiesOpen ? "true" : "false"}
              onClick={() => setCitiesOpen(o => !o)}
            >
              Cities
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <Link to="/me/events" className="btn btn-outline hidden sm:inline-flex">My events</Link>
                <button onClick={connectGoogle} className="btn btn-outline hidden sm:inline-flex">Google Calendar</button>
                <span className="hidden sm:inline text-[var(--ink-2)]">{user.email}</span>
                <button onClick={() => { logout(); nav("/"); }} className="btn btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>

        {citiesOpen && (
          <div role="menu" aria-label="Choose a city"
               className="absolute inset-x-0 top-full z-50 bg-[var(--ink)] text-white">
            <div className="container-xl px-4 py-3 flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="text-xl font-extrabold tracking-tight mr-4">DISCOVER MORE</span>

              <button role="menuitem" className="underline-offset-4 hover:underline text-white"
                      onClick={() => selectCity("")}>All Cities</button>

              {cities.map(c => (
                <button key={c} role="menuitem"
                        className="underline-offset-4 hover:underline text-white/90 hover:text-white"
                        onClick={() => selectCity(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="h-[2px] bg-[var(--brand)]" />
          </div>
        )}
      </div>

      <div className="blue-bar">
        <div className="container-xl px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">

            <div ref={locBoxRef} className="relative">
              <div className="bg-white text-[var(--ink)] rounded-lg px-4 py-2">
                <div className="text-[10px] uppercase text-[var(--ink-2)]">Location</div>
                <div className="relative">
                  <input
                    className="w-full pr-7 outline-none text-[var(--ink)] placeholder-[var(--ink-2)]"
                    placeholder="Type a city (e.g., London)"
                    value={locQuery}
                    onFocus={() => setLocOpen(true)}
                    onChange={(e) => { setLocQuery(e.target.value); setLocOpen(true); setLocActive(-1); }}
                    onKeyDown={(e) => {
                      if (!locOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) setLocOpen(true);
                      if (e.key === "ArrowDown") { e.preventDefault(); setLocActive(i => Math.min(i + 1, (filteredPlaces.length - 1))); }
                      if (e.key === "ArrowUp")   { e.preventDefault(); setLocActive(i => Math.max(i - 1, -1)); }
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const choice = locActive >= 0 ? filteredPlaces[locActive] : locQuery;
                        commitLocation(choice || "");
                      }
                      if (e.key === "Escape") { setLocOpen(false); setLocActive(-1); }
                    }}
                  />
                  {locQuery && (
                    <button
                      type="button"
                      aria-label="Clear location"
                      title="Clear"
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-2 text-[var(--ink-2)] hover:text-[var(--ink)]"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { setLocQuery(""); commitParams({ location: "" }); setLocOpen(false); setLocActive(-1); }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {locOpen && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-lg border border-[var(--border)] shadow-card max-h-64 overflow-auto text-[var(--ink)]">
                  {(filteredPlaces.length ? filteredPlaces : places).map((p, idx) => {
                    const active = idx === locActive;
                    return (
                      <button
                        type="button"
                        key={p}
                        className={`w-full text-left px-3 py-2 ${active ? "bg-[var(--brand-50)]" : ""}`}
                        onMouseEnter={() => setLocActive(idx)}
                        onMouseDown={(e) => { e.preventDefault(); commitLocation(p); }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
              <input
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitParams({ q: queryText, location: locQuery, page: 1 });
                }}
                className="flex-1 outline-none text-[var(--ink)] placeholder-[var(--ink-2)]"
                placeholder="Artist, Event or Venue"
              />
              {queryText && (
                <button
                  type="button"
                  className="text-[var(--ink-2)] hover:text-[var(--ink)]"
                  title="Clear"
                  aria-label="Clear search"
                  onClick={() => setQueryText("")}
                >
                  ×
                </button>
              )}
            </div>

            <button
              className="btn btn-primary self-stretch"
              onClick={() => commitParams({ q: queryText, location: locQuery, page: 1 })}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
