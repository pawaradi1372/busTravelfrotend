import { useState } from "react";

export default function BookingForm({ bus, seat, onConfirm, onBack }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <section className="bg-white shadow-xl rounded-xl p-8 mt-8">
      <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded-lg p-2"
        />

        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <p><strong>Bus:</strong> {bus.name}</p>
          <p><strong>Seat:</strong> {seat}</p>
          <p><strong>Fare:</strong> ${bus.fare}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-400 text-white flex-1 py-2 rounded-lg hover:bg-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white flex-1 py-2 rounded-lg hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </section>
  );
}
