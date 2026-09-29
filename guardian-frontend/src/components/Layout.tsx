import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <TopNav />
        <main className="w-full flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
