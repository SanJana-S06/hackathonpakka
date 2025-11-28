import React, { useState } from "react";
import person0 from "../assets/person0.png";
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setClicked(true);
    setTimeout(() => navigate("/login"), 800); // navigate after animation
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence>
        {!clicked && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scroll-smooth"
          >
            {/* Navbar */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-white shadow z-20">
              <h1 className="text-2xl font-bold text-blue-600">DoTo</h1>
              <div className="space-x-6">
                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>
                <a href="#about" className="hover:text-blue-600">
                  About
                </a>
                <a href="#contact" className="hover:text-blue-600">
                  Contact
                </a>
              </div>
            </nav>

            {/* Hero Section */}
            <section
              className={`snap-start h-screen flex flex-col overflow-x-hidden items-center justify-center text-center text-white transition-all duration-1000 ${
                hovered
                  ? "animated-gradient"
                  : "bg-gradient-to-br from-blue-500 via-white to-blue-500"
              }`}
            >
              <h1 className="text-5xl text-blue-950 font-extrabold py-24 mb-4">
                Organize Tasks, Empower Teams —
              </h1>

              <h2
                className={`text-5xl font-extrabold mb-4 transition-colors duration-500 ${
                  hovered ? "text-white" : "text-blue-600"
                }`}
              >
                DoTo
              </h2>

              <button
                onClick={handleGetStarted}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="px-8 mt-24 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-white hover:text-blue-800 transition-all duration-500"
              >
                Get Started
              </button>

              {/* Sliding Images */}
              <div className="flex items-center justify-between mt-24 w-full max-w-md mx-auto">
                <div className="overflow-hidden w-[66px] h-[66px]">
                  <img
                    src={person2}
                    alt="person2"
                    className={`transition-transform duration-700 ${
                      hovered ? "translate-y-0" : "-translate-y-full"
                    }`}
                  />
                </div>
                <img src={person0} width="60" alt="person0" />
                <div className="overflow-hidden w-[68px] h-[68px]">
                  <img
                    src={person1}
                    alt="person1"
                    className={`transition-transform duration-700 ${
                      hovered ? "translate-y-0" : "-translate-y-full"
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              id="features"
              className="snap-start overflow-x-hidden h-screen py-20 px-8 bg-blue-100 flex flex-col items-center justify-center"
            >
              <h3 className="text-3xl font-bold mb-12">Features</h3>
              <div className="grid md:grid-row gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "Team Collaboration",
                    desc: "Create workspaces, assign tasks, and keep everyone in sync.",
                  },
                  {
                    title: "Real-time Updates",
                    desc: "Stay updated with live progress tracking and notifications.",
                  },
                  {
                    title: "Analytics Dashboard",
                    desc: "Get insights into performance and productivity metrics.",
                  },
                ].map((f, i) => (
                  <div className="flex flex-row md:flex-col" key={i}>
                    <FeatureCard key={i} {...f} index={i} />
                  </div>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section
              id="about"
              className="snap-start overflow-x-hidden h-screen py-20 px-8 bg-gray-50 flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-3xl font-bold mb-6">About the Project</h3>
              <p className="text-gray-700 max-w-3xl mx-auto mb-10">
                DoTo is an organization-based productivity platform designed to bring
                structure and clarity to your team’s workflow. It helps teams plan,
                execute, and deliver projects efficiently.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="bg-white shadow rounded-2xl p-6 w-64">
                  <h4 className="font-semibold text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-600 text-sm">
                    To simplify organizational task management and improve team
                    efficiency.
                  </p>
                </div>
                <div className="bg-white shadow rounded-2xl p-6 w-64">
                  <h4 className="font-semibold text-lg mb-2">Our Vision</h4>
                  <p className="text-gray-600 text-sm">
                    To be the go-to collaboration platform for organizations worldwide.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="snap-start bg-white text-center py-6 border-t text-sm text-gray-600">
              © {new Date().getFullYear()} DoTo — Built for Organizations
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
