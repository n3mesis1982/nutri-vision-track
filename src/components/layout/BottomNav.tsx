
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PieChart, User, Plus, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: PieChart, label: "Diary", path: "/diary" },
    { icon: Plus, label: "Add", path: "/add-meal", highlight: true },
    { icon: BarChart, label: "Reports", path: "/reports" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-4 flex-1",
                isActive ? "text-primary" : "text-gray-500",
                item.highlight && !isActive && "text-primary"
              )}
            >
              {item.highlight ? (
                <div className="bg-primary rounded-full p-2 -mt-6 mb-1 shadow-lg">
                  <item.icon size={24} className="text-white" />
                </div>
              ) : (
                <item.icon size={20} />
              )}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
