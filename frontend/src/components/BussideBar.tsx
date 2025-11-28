import { Bus } from "lucide-react";
import { Route } from "react-router-dom";

const bmtcBuses = [
  // Row 1
  { id: "MKT-5H", route: "Marthahalli → KR Market", Status: "Delayed"},
  { id: "212-MF15", route: "Kengeri → Silk Board", Status: "No Data"},
  { id: "500-D", route: "Banashankari → ITPL", Status: "On Time"},
  { id: "600", route: "Hebbal → Electronic City", Status: "On Time" },
  { id: "213-V", route: "Vijayanagar → Majestic", Status: "On Time"},

  // Row 2
  { id: "335-E", route: "Majestic → Whitefield", Status: "Delayed" },
  { id: "201-R", route: "BTM → Yeshwanthpur", Status: "On Time" },
  { id: "45-B", route: "Shivajinagar → Banashankari", Status: "No Data" },
  { id: "356-K", route: "Electronic City → KR Puram", Status: "On Time" },
  { id: "600-A", route: "Hebbal → Vijayanagar", Status: "On Time" },
];

export default function BusSidebar() {

   const fetchBusData = async (bus: { id: string; route: string; Status: string }) => { 
    try{
      const response = await fetch('http://localhost:3000/api/v1/bus/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          busId: bus.id,
          route: bus.route,
          Status: bus.Status,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching bus data:", error);
    }
   }


  return (
    <div className="w-full p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white">

      <h2 className="text-xl font-bold text-blue-900 mb-5">
        Live BMTC Routes
      </h2>

      {/* Responsive bus grid */}
      <div className="flex flex-wrap gap-6 w-full justify-center items-center">

        {bmtcBuses.map((bus, index) => (
          <div
            key={index}
            onClick={() => fetchBusData(bus)}
            className="
              group
              flex flex-col gap-2 p-4 
              bg-white rounded-2xl
              shadow-md border border-blue-50
              hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50/60
              transition-all duration-300 ease-out cursor-pointer
              w-[150px] md:w-[180px] lg:w-[200px]
            "
          >
            {/* Bus Icon */}
            <div className="
              w-12 h-12 rounded-xl bg-blue-100 
              flex items-center justify-center 
              text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition
            ">
              <Bus size={28} />
            </div>

            {/* Bus ID */}
            <p className="text-lg font-semibold text-blue-900">
              {bus.id}
            </p>

            {/* Route */}
            <p className="text-sm text-gray-600 truncate">
              {bus.route}
            </p>

            {/* Status */}
            <p className={`text-xs font-bold 'text-gray-500'`}>
              {bus.Status}
            </p>

            {/* Decorative underline */}
            <div className="
              w-full h-1 
              bg-blue-200 rounded-full mt-1 
              group-hover:bg-blue-500 transition
            "></div>

          </div>
        ))}

      </div>
    </div>
  );
}
