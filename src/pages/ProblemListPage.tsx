import React, { useMemo, useState } from 'react';
import { useProblemsQuery } from '../hooks/useProblems';
import { filterAndSortProblems } from '../utils/filterSort';
import type { DifficultyFilter, SortOption } from '../utils/filterSort';
import { ProblemRow } from '../components/problem/ProblemRow';
import { ProblemFilters } from '../components/problem/ProblemFilters';
import { ProblemRowSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Plus } from 'lucide-react';
import type { Problem } from '../types/problem';

export const ProblemListPage: React.FC = () => {
  const { data: problems, isLoading, isError, error, refetch, isFetching } = useProblemsQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredProblems = useMemo(() => {
    return filterAndSortProblems(problems || [], {
      searchQuery,
      difficulty,
      sortBy,
    });
  }, [problems, searchQuery, difficulty, sortBy]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      {/* Hero Section Container */}
      <section className="relative w-full pt-1 sm:pt-2 pb-0">
        {/* Soft peach/warm abstract backdrop shape matching reference */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[720px] lg:w-[840px] h-[260px] sm:h-[300px] bg-gradient-to-r from-[#FFF5EE]/80 via-[#FFF0E7] to-[#FFEFE6]/90 rounded-[55%_45%_55%_45%/50%_60%_40%_50%] opacity-95 blur-xl pointer-events-none -z-10 dark:from-[#FF5A1F]/15 dark:via-purple-600/10 dark:to-transparent dark:opacity-30"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#EEF2FF]/60 rounded-full blur-2xl pointer-events-none -z-10 dark:opacity-5"
          aria-hidden="true"
        />

        {/* Desktop Upper-right "+ New Problem" button */}
        <div className="hidden lg:block absolute top-1 right-0 z-20">
          <Link to="/problems/new" className="inline-block">
            <button
              type="button"
              className="bg-[#FF5A1F] hover:bg-[#E64C13] active:scale-[0.98] text-white font-semibold text-base px-6 h-[52px] min-w-[210px] rounded-xl shadow-xs dark:shadow-[0_0_25px_rgba(255,90,31,0.3)] inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5A1F] focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>New Problem</span>
            </button>
          </Link>
        </div>

        {/* Two-Column Grid: Left Text, Right Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] items-center gap-6 min-h-[220px] lg:min-h-[250px]">
          {/* Left Column: Heading & Subtitle */}
          <div className="z-10 py-2 sm:py-3">
            {/* Small Orange Accent Line */}
            <div className="w-12 h-1.5 bg-[#FF5A1F] rounded-full mb-3.5" />

            {/* Main Heading */}
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] tracking-tight text-[#101B3A] dark:text-white leading-[1.08]">
              Problem <span className="text-[#FF5A1F]">Set</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#71809F] dark:text-[#94A3B8] text-base sm:text-lg lg:text-[20px] xl:text-[21px] font-normal leading-relaxed max-w-[480px] pt-2">
              Solve algorithmic challenges and improve your problem-solving skills.
            </p>

            {/* Mobile / Tablet "+ New Problem" button */}
            <div className="pt-4 lg:hidden">
              <Link to="/problems/new" className="inline-block w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-[#FF5A1F] hover:bg-[#E64C13] active:scale-[0.98] text-white font-semibold text-base px-6 h-[48px] rounded-xl shadow-xs dark:shadow-[0_0_25px_rgba(255,90,31,0.3)] inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5A1F] focus:ring-offset-2"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  <span>New Problem</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="flex justify-center lg:justify-end items-end z-10 w-full">
            <img
              src="/hero-coder.png"
              alt="Abhicode developer solving algorithmic challenges"
              className="w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[680px] xl:max-w-[740px] h-auto object-contain select-none"
            />
          </div>
        </div>
      </section>

      {/* Main Elevated Card Container */}
      <div className="bg-white dark:bg-[#0A0A0C] border border-[#E6EAF2] dark:border-[#1E222D] rounded-2xl shadow-xs dark:shadow-[0_4px_30px_rgba(0,0,0,0.8)] p-5 sm:p-7 transition-colors">
        {/* Filter and Search Bar */}
        <ProblemFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={problems?.length || 0}
          filteredCount={filteredProblems.length}
        />

        {/* Content States */}
        {isLoading ? (
          <div className="border border-[#E6EAF2] dark:border-line rounded-xl divide-y divide-[#E6EAF2] dark:divide-line overflow-hidden">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProblemRowSkeleton key={idx} />
            ))}
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="p-8 border border-diff-hard/40 bg-diff-hard/5 rounded-xl text-center max-w-lg mx-auto my-6 space-y-4"
          >
            <div className="inline-flex p-3 rounded-full bg-diff-hard/10 text-diff-hard">
              <AlertCircle className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-[#101B3A] dark:text-white">
                Failed to Load Problems
              </h2>
              <p className="font-mono text-xs text-diff-hard mt-1.5 break-words">
                {error instanceof Error ? error.message : 'Unknown server error from problem-service'}
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="secondary"
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-2 mx-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                Retry Connection
              </Button>
            </div>
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="p-12 border border-[#E6EAF2] dark:border-line rounded-xl text-center my-6 space-y-3 bg-[#F8FAFC] dark:bg-bg/50">
            <p className="font-sans font-bold text-[#101B3A] dark:text-white text-lg">No problems found</p>
            <p className="text-sm text-[#71809F] max-w-md mx-auto">
              {searchQuery || difficulty !== 'all'
                ? 'No problems match the current filter or search criteria.'
                : 'The problem repository is currently empty.'}
            </p>
            {searchQuery || difficulty !== 'all' ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setDifficulty('all');
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            ) : (
              <Link to="/problems/new" className="inline-block mt-2">
                <Button variant="primary" size="sm">
                  Create First Problem
                </Button>
              </Link>
            )}
          </div>
        ) : (
          /* Problems Table */
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Table Header */}
              <div className="grid grid-cols-[80px_1fr_130px_110px_40px] gap-4 py-3 px-5 border-b border-[#E6EAF2] dark:border-[#1A1D24] text-xs font-semibold text-[#71809F] dark:text-[#64748B] uppercase tracking-wider">
                <span>ID</span>
                <span>Title</span>
                <span>Difficulty</span>
                <span>Tests</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E6EAF2] dark:divide-[#14161E]">
                {filteredProblems.map((problem: Problem, index: number) => (
                  <ProblemRow key={problem._id} problem={problem} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
