export default function BusResults({ buses, onSelectBus }) {
  if (!buses || buses.length === 0)
    return (
      <p className="text-center text-gray-500 mt-8">
        No buses available for this route.
      </p>
    );

  return (
    <div className="mt-8 space-y-4">
      {buses.map((bus) => (
        <div
          key={bus.id}
          className="bg-white p-5 shadow-lg rounded-lg flex justify-between items-center hover:scale-[1.01] transition"
        >
          <div>
            <h3 className="text-lg font-semibold">{bus.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {bus.departure} - {bus.arrival} • {bus.duration}
            </p>
            <div className="flex flex-wrap gap-2">
              {bus.amenities.map((a) => (
                <span
                  key={a}
                  className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">${bus.fare}</p>
            <button
              onClick={() => onSelectBus(bus)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Select Seats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
