import React, { useEffect, useRef } from 'react';
import type { DifficultyFilter, SortOption } from '../../utils/filterSort';
import { Search, ArrowUpDown, X } from 'lucide-react';

interface ProblemFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficulty: DifficultyFilter;
  onDifficultyChange: (diff: DifficultyFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
}

export const ProblemFilters: React.FC<ProblemFiltersProps> = ({
  searchQuery,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' or 'Cmd+K' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ((e.metaKey || e.ctrlKey) && e.key === 'k') ||
        (e.key === '/' &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const diffButtons: { label: string; value: DifficultyFilter; activeClass: string; inactiveClass: string }[] = [
    {
      label: 'All',
      value: 'all',
      activeClass: 'bg-accent text-white shadow-xs',
      inactiveClass: 'bg-bg text-text-muted hover:text-text-main border border-line dark:border-[#222634] dark:bg-[#12141C] dark:text-[#94A3B8] dark:hover:text-white',
    },
    {
      label: 'Easy',
      value: 'easy',
      activeClass: 'bg-emerald-500 text-white shadow-xs',
      inactiveClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/20',
    },
    {
      label: 'Medium',
      value: 'medium',
      activeClass: 'bg-amber-500 text-white shadow-xs',
      inactiveClass: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30 dark:hover:bg-amber-500/20',
    },
    {
      label: 'Hard',
      value: 'hard',
      activeClass: 'bg-rose-500 text-white shadow-xs',
      inactiveClass: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500/20',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search problems by title or keyword..."
          className="w-full pl-10 pr-14 py-2.5 bg-bg/80 dark:bg-[#060709] hover:bg-bg dark:hover:bg-[#0A0B0E] focus:bg-surface dark:focus:bg-[#0A0B0E] text-text-main dark:text-white placeholder-text-muted text-sm rounded-xl border border-line dark:border-[#1E222D] focus:border-accent focus:ring-1 focus:ring-accent outline-none font-sans transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 text-text-muted hover:text-text-main"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="font-mono text-[11px] text-text-muted px-2 py-0.5 bg-surface dark:bg-[#12141A] border border-line dark:border-[#222634] rounded-md shadow-2xs">
              ⌘ K
            </span>
          )}
        </div>
      </div>

      {/* Difficulty Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
        {diffButtons.map((btn) => (
          <button
            key={btn.value}
            type="button"
            onClick={() => onDifficultyChange(btn.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              difficulty === btn.value ? btn.activeClass : btn.inactiveClass
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Sort Select */}
      <div className="relative shrink-0">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-surface dark:bg-[#060709] hover:bg-bg dark:hover:bg-[#0A0B0E] border border-line dark:border-[#1E222D] rounded-xl text-xs font-semibold text-text-main dark:text-white transition-colors shadow-2xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-transparent dark:bg-[#060709] text-text-main dark:text-white text-xs font-semibold outline-none cursor-pointer pr-1"
          >
            <option value="default">Sort: Default</option>
            <option value="title-asc">Sort: Title (A → Z)</option>
            <option value="title-desc">Sort: Title (Z → A)</option>
            <option value="difficulty-asc">Sort: Difficulty (Easy → Hard)</option>
            <option value="difficulty-desc">Sort: Difficulty (Hard → Easy)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
