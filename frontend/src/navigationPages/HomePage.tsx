"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BusSidebar from "../components/BussideBar";
import ProfileButton from "../components/ProfileButton";
import { useNavigate } from "react-router-dom";

// Charts
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please fill both locations");
      return;
    }

    navigate(
      `/searchdashboard?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}`
    );
  };

  return (
    <div className="relative h-screen w-full overflow-y-scroll scroll-smooth">

      {/* ⭐ CLASSY PROFILE BUTTON (TOP RIGHT) */}
      <div className="absolute top-6 right-10 z-50">
        <ProfileButton />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onToggle={toggleSidebar} reset={false} />

      {/* === HERO SECTION === */}
      <section className="min-h-screen bg-gray-50">

        <section className="relative w-full h-[520px] bg-black overflow-hidden">
          <img
            src="/src/img/sidebar.jpeg"
            alt="Hero"
            className="w-full h-[520px] object-cover opacity-45"
          />

          <div className="absolute inset-0 px-16 mt-64">
            <h1 className="text-white text-5xl font-bold leading-tight">
              Where crowd-free travel meets
            </h1>
            <h1 className="text-white text-4xl font-bold leading-tight">
              Intelligent transit management
            </h1>
          </div>

          <div className="absolute left-0 right-0 bottom-0 overflow-hidden leading-none">
            <svg
              className="w-full block h-[120px]"
              viewBox="0 0 1320 110"
              preserveAspectRatio="none"
            >
              <path
                d="M0,32 C120,96 360,96 540,64 C720,32 840,8 1080,48 C1260,80 1320,96 1440,72 L1440 120 L0 120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* === SEARCH PANEL === */}
        <div className="relative -mt-12 max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4">

            <div className="border rounded-lg px-4 py-3 flex items-center space-x-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <input
                type="text"
                placeholder="Current Location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div className="border rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Enter Location"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-900"
            >
              SEARCH <span className="text-blue-400">BUS</span>
            </button>

          </div>
        </div>

        {/* LIVE BUS LIST */}
        <div className="max-w-6xl mx-auto mt-16 rounded-xl overflow-hidden shadow-lg">
          <BusSidebar />
        </div>

      </section>

      {/* === ANALYTICS SECTION === */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-white">
        
        <h2 className="text-4xl font-bold text-center mb-16">
          Real-time Transit Analytics <br /> for Smarter Mobility
        </h2>

        <div className="grid grid-cols-3 gap-10 text-center w-full max-w-6xl">

          {/* Chart 1 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow border">
            <h3 className="text-xl font-bold mb-4">Daily Active Users</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={[
                  { day: "Mon", users: 120 },
                  { day: "Tue", users: 180 },
                  { day: "Wed", users: 240 },
                  { day: "Thu", users: 220 },
                  { day: "Fri", users: 310 },
                  { day: "Sat", users: 420 },
                  { day: "Sun", users: 390 }
                ]}
              >
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow border">
            <h3 className="text-xl font-bold mb-4">Active vs Inactive Buses</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Active", value: 68 },
                    { name: "Inactive", value: 32 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  fill="#8884d8"
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow border">
            <h3 className="text-xl font-bold mb-4">Revenue Generated</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  { month: "Jan", revenue: 32000 },
                  { month: "Feb", revenue: 41000 },
                  { month: "Mar", revenue: 38000 },
                  { month: "Apr", revenue: 51000 }
                ]}
              >
                <Bar dataKey="revenue" fill="#10b981" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>

    </div>
  );
}
