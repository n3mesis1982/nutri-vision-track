
import React from "react";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white border-b z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">NutriTrack</h1>
          <span className="text-xs ml-1 text-gray-500">Personal</span>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
