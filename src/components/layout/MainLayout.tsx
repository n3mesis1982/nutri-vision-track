
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
