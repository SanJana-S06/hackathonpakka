import React from "react";
import { useLocation } from "react-router-dom";
import { Bus, Clock, Users } from "lucide-react";

export default function SearchDashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";

  // 🚍 BUS DATA (with occupancy + ETA)
  const BUS_DATA = [
    { id: "213-V", route: "Vijayanagar → Majestic", eta: "12 mins", occupancy: 72, status: "On Time" },
    { id: "MKT-5H", route: "Marthahalli → KR Market", eta: "18 mins", occupancy: 54, status: "Delayed" },
    { id: "KBS-5H", route: "Kengeri → Silk Board", eta: "9 mins", occupancy: 91, status: "High Load" },
    { id: "211-J", route: "Banashankari → Jayanagar", eta: "5 mins", occupancy: 23, status: "On Time" },
    { id: "210-H", route: "RT Nagar → Majestic", eta: "15 mins", occupancy: 48, status: "On Time" },

    // Extra buses (row 2)
    { id: "500-D", route: "Banashankari → ITPL", eta: "20 mins", occupancy: 63, status: "On Time" },
    { id: "600", route: "Hebbal → Electronic City", eta: "7 mins", occupancy: 82, status: "High Load" },
    { id: "335-E", route: "Whitefield → Majestic", eta: "16 mins", occupancy: 38, status: "On Time" },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] px-10 py-8 flex flex-col">

      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Smart Public Transit <br />
        <span className="text-blue-600">Passenger Flow Optimiser</span>
      </h1>

      {/* ================= GRID LAYOUT ================= */}
      <div className="grid grid-cols-3 gap-10 w-full">

        {/* ========= LEFT PANEL ========= */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-6">Choose Destination</h2>

          {/* From */}
          <label className="text-sm text-gray-500">Source</label>
          <input
            value={from}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 text-black shadow-sm"
          />

          {/* To */}
          <label className="text-sm text-gray-500 mt-4">Destination</label>
          <input
            value={to}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 text-black shadow-sm"
          />

          <p className="mt-6 text-md text-gray-700">
            Journey Time: <span className="font-bold">— mins</span>
          </p>
        </div>

        {/* ========= MIDDLE PANEL: BUS LIST ========= */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4">Available Buses</h2>

          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">

            {BUS_DATA.map((bus, index) => (
              <div
                key={index}
                className="bg-[#f9fbff] hover:bg-[#eef4ff] border border-blue-100 p-4 rounded-xl shadow-sm flex flex-col gap-2 transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full text-blue-700">
                    <Bus size={26} />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-blue-900">{bus.id}</p>
                    <p className="text-gray-600 text-sm">{bus.route}</p>
                  </div>
                </div>

                {/* Occupancy */}
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-gray-700">
                      <Users size={15} /> Occupancy
                    </span>
                    <span className="font-medium">{bus.occupancy}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${bus.occupancy}%` }}
                    ></div>
                  </div>
                </div>

                {/* ETA + Status */}
                <div className="flex justify-between mt-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-700">
                    <Clock size={15} /> {bus.eta}
                  </span>

                  <span
                    className={`font-semibold ${
                      bus.status === "On Time"
                        ? "text-green-600"
                        : bus.status === "Delayed"
                        ? "text-red-500"
                        : "text-orange-600"
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========= RIGHT PANEL: MAP ========= */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Route Map</h2>

          <div className="w-full h-[350px] rounded-xl border overflow-hidden">
            <img
              src="/sample-map.png"
              className="w-full h-full object-cover"
            />
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition">
            Take me there
          </button>

          <p className="mt-4 text-gray-500 text-sm">→ {to || "Destination"}</p>
        </div>
      </div>
    </div>
  );
}