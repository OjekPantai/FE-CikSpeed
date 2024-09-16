import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
