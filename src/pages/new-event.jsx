import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";

export default function NewEvent() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", location: "",
    start_time: "", end_time: "",
    price_type: "FREE", price_pence: ""
  });
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = {
        ...form,
        price_pence: form.price_type === "FIXED" && form.price_pence !== ""
          ? Number(form.price_pence) : null
      };
      const { data } = await api.post("/api/events", payload);
      nav(`/events/${data.event.id}`);
    } catch (e) {
      setErr(e.response?.data?.msg || "Create failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="container-xl px-4 py-8 max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">New Event</h2>
      {err && <div className="text-[var(--danger)]">{err}</div>}

      <label className="block">
        <div className="text-sm font-medium text-[var(--ink)] mb-1">Title</div>
        <input className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
               name="title" value={form.title} onChange={onChange} required />
      </label>

      <label className="block">
        <div className="text-sm font-medium text-[var(--ink)] mb-1">Description</div>
        <textarea className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                  name="description" value={form.description} onChange={onChange} required />
      </label>

      <label className="block">
        <div className="text-sm font-medium text-[var(--ink)] mb-1">Location</div>
        <input className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
               name="location" value={form.location} onChange={onChange} required />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-sm font-medium text-[var(--ink)] mb-1">Start</div>
          <input type="datetime-local"
                 className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                 name="start_time" value={form.start_time} onChange={onChange} required />
        </label>
        <label className="block">
          <div className="text-sm font-medium text-[var(--ink)] mb-1">End</div>
          <input type="datetime-local"
                 className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                 name="end_time" value={form.end_time} onChange={onChange} required />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 items-end">
        <label className="block">
          <div className="text-sm font-medium text-[var(--ink)] mb-1">Price Type</div>
          <select className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                  name="price_type" value={form.price_type} onChange={onChange}>
            <option value="FREE">FREE</option>
            <option value="FIXED">FIXED</option>
            <option value="PAY_AS_YOU_FEEL">PAY AS YOU FEEL</option>
          </select>
        </label>
        {form.price_type === "FIXED" && (
          <label className="block">
            <div className="text-sm font-medium text-[var(--ink)] mb-1">Price (pence)</div>
            <input type="number" min="0"
                   className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                   name="price_pence" value={form.price_pence} onChange={onChange} />
          </label>
        )}
      </div>

      <div className="flex gap-3">
        <button className="btn btn-primary">Create</button>
        <button type="button" onClick={() => history.back()} className="btn btn-outline">Cancel</button>
      </div>
    </form>
  );
}
