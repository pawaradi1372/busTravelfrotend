export default function SeatSelection({ bus, selectedSeat, onSelectSeat, onProceed }) {
  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <section className="bg-white shadow-xl rounded-xl p-8 mt-8">
      <h3 className="text-xl font-semibold text-center mb-4">Select Your Seat</h3>
      <div className="grid grid-cols-4 gap-3 justify-items-center max-w-xs mx-auto mb-6">
        {seats.map((num) => {
          const isSelected = selectedSeat === num;
          return (
            <div
              key={num}
              onClick={() => onSelectSeat(num)}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold cursor-pointer transition 
                ${isSelected ? "bg-blue-600 text-white" : "bg-green-500 text-white hover:bg-green-600"}`}
            >
              {num}
            </div>
          );
        })}
      </div>
      {selectedSeat && (
        <div className="text-center mb-4">
          <p className="font-medium">
            Selected Seat: <span className="text-blue-600 font-semibold">{selectedSeat}</span>
          </p>
          <p>Fare: ${bus.fare}</p>
        </div>
      )}
      <button
        onClick={onProceed}
        disabled={!selectedSeat}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        Proceed to Book
      </button>
    </section>
  );
}
