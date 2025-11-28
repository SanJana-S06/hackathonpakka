import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home as HomeIcon,
  Map,
  Notebook,
  CreditCard,
  Headset
} from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  reset: boolean;
}

// UPDATED — Removed Profile
const navItems = [
  { name: "Home", url: "/home", icon: HomeIcon },
  { name: "Bookings", url: "https://tummoc.com/", icon: Notebook },
  { name: "Support", url: "/support", icon: Headset },
];

export default function Sidebar({ isOpen, onToggle, reset }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(navItems[0].name);

  // Sync active tab with current route
  useEffect(() => {
    const found = navItems.find(item => item.url === location.pathname);
    if (found) setActiveTab(found.name);
  }, [location.pathname]);

  // Reset active tab when reset changes
  useEffect(() => {
    if (reset) setActiveTab("");
  }, [reset]);

  const handleNavigation = (url: string, name: string) => {
    setActiveTab(name);

    // If external URL (starts with http/https), open in a new tab
    const isExternal = /^https?:\/\//i.test(url);
    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
      onToggle();
      return;
    }

    // Otherwise use react-router navigation
    navigate(url);
    onToggle();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-64
          bg-white shadow-xl border-r border-gray-200
          transition-all duration-300 ease-in-out
          transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Nav Area */}
        <nav className="flex flex-col gap-2 mt-20 px-4">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item.url, item.name)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  group flex items-center gap-3 px-4 py-3 
                  rounded-lg font-medium relative overflow-hidden
                  transition-colors duration-200
                  ${isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`
                    transition
                    ${isActive ? "text-blue-700" : "text-gray-600 group-hover:text-blue-600"}
                  `}
                />

                <span>{item.name}</span>

                {/* Glow Hover Animation */}
                {isActive && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-blue-200/40 rounded-lg"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}

        </nav>
      </aside>

      {/* Background Blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}
