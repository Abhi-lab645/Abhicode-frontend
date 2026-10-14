import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-black text-text-main font-sans antialiased transition-colors">
      <Header />
      <main className="flex-1 w-full animate-fade-in pb-12">
        <Outlet />
      </main>
    </div>
  );
};
