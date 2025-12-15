import { useState } from "react";

export default function SearchSection({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from === to) return alert("Select different departure and destination!");
    onSearch({ from, to, date, passengers });
  };

  return (
    <section className="bg-white shadow-xl rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Find Your Perfect Journey
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div>
          <label className="font-medium">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option value="">Select</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option value="">Select</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium">Travel Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>
        <div>
          <label className="font-medium">Passengers</label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-auto hover:bg-blue-700 transition"
        >
          Search Buses
        </button>
      </form>
    </section>
  );
}
