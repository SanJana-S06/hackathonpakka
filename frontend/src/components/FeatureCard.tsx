import React, { useRef, useState, useEffect } from "react";

interface FeatureCardProps {
  title: string;
  desc: string;
  index: number; // to determine slide direction
}

export default function FeatureCard({ title, desc, index }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 } // trigger when 30% visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Determine slide direction
  const fromClass = index === 1 ? "translate-x-[-100%]" : "translate-x-[100%]";

  return (
    <div 
      ref={ref}
      className={`p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition-transform duration-700 ${
        visible ? "translate-x-0 opacity-100" : `${fromClass} opacity-0`
      }`}
    >
      <h4 className="text-xl font-semibold mb-2 text-blue-700">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
