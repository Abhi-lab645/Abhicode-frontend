import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { FileText, BarChart2, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isProblemsActive =
    location.pathname === '/' ||
    location.pathname === '/problems' ||
    (location.pathname.startsWith('/problems/') &&
      !location.pathname.includes('/edit') &&
      location.pathname !== '/problems/new');
  const isManageActive =
    location.pathname === '/manage' ||
    location.pathname === '/problems/new' ||
    location.pathname.includes('/edit');

  return (
    <header className="bg-white dark:bg-black border-b border-[#E6EAF2] dark:border-[#1A1D24] sticky top-0 z-40 transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Logo */}
          <Link to="/problems" className="flex items-center gap-2.5 group">
            <svg
              className="w-8 h-8 text-[#FF5A1F] transition-transform group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2.5C18 2.5 19.8 3.7 20.8 5.6L29.3 22.8C30.4 25.1 28.7 27.8 26.2 27.8H21.5C20.1 27.8 18.8 27 18.1 25.7L16.8 23H15.2L13.9 25.7C13.2 27 11.9 27.8 10.5 27.8H5.8C3.3 27.8 1.6 25.1 2.7 22.8L11.2 5.6C12.2 3.7 14 2.5 16 2.5ZM16 11.2L13.4 17.2H18.6L16 11.2Z"
                fill="#FF5A1F"
              />
            </svg>
            <span className="font-sans font-extrabold text-[22px] text-[#101B3A] dark:text-white tracking-tight">
              abhicode
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/problems"
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isProblemsActive
                  ? 'bg-[#FFF0E7] text-[#FF5A1F] dark:bg-[#FF5A1F]/15 dark:text-[#FF5A1F] dark:border dark:border-[#FF5A1F]/30'
                  : 'text-[#475569] hover:text-[#101B3A] dark:text-[#94A3B8] dark:hover:text-white'
              }`}
            >
              <FileText className={`w-4 h-4 ${isProblemsActive ? 'text-[#FF5A1F]' : 'text-[#475569] dark:text-[#94A3B8]'}`} />
              <span className="hidden sm:inline">Problem Set</span>
            </Link>

            <Link
              to="/manage"
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isManageActive
                  ? 'bg-[#FFF0E7] text-[#FF5A1F] dark:bg-[#FF5A1F]/15 dark:text-[#FF5A1F] dark:border dark:border-[#FF5A1F]/30'
                  : 'text-[#2A334E] hover:text-[#FF5A1F] dark:text-[#94A3B8] dark:hover:text-[#FF5A1F]'
              }`}
            >
              <BarChart2 className={`w-4 h-4 ${isManageActive ? 'text-[#FF5A1F]' : 'text-[#2A334E] dark:text-[#94A3B8]'}`} />
              <span className="hidden sm:inline">Manage</span>
            </Link>
          </nav>
        </div>

        {/* Right Side: Theme Toggle, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Light/Dark Toggle Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 sm:h-9 px-1 bg-[#EDF1F7] dark:bg-[#12141C] rounded-full flex items-center gap-0.5 sm:gap-1 border border-transparent dark:border-[#222634] transition-colors"
            aria-label={`Toggle theme (currently ${theme})`}
          >
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'bg-white shadow-xs text-[#FF5A1F]'
                  : 'text-[#71809F] dark:text-[#64748B]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark'
                  ? 'bg-[#1E2330] shadow-xs text-[#FF5A1F]'
                  : 'text-[#5C6B89]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF5A1F] text-white font-semibold text-xs sm:text-[15px] flex items-center justify-center shadow-xs select-none">
            A
          </div>
        </div>
      </div>
    </header>
  );
};
