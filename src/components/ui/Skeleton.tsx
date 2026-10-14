import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-surface/70 dark:bg-[#12131A] border border-line/50 dark:border-[#1E222D] rounded-sm animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProblemRowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4 py-3.5 px-4 border-b border-line dark:border-[#1E222D] bg-surface/30 dark:bg-[#0A0A0C]">
      {/* Row number skeleton */}
      <Skeleton className="w-8 h-4" />
      {/* Title skeleton */}
      <Skeleton className="h-5 flex-1 max-w-[280px]" />
      {/* Difficulty skeleton */}
      <div className="hidden sm:flex items-center gap-1.5 ml-auto">
        <Skeleton className="w-16 h-4" />
      </div>
      {/* Test cases count skeleton */}
      <Skeleton className="hidden md:block w-20 h-4" />
    </div>
  );
};

export const ProblemDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-3/4 h-8" />
        </div>
        <div className="space-y-3 pt-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-11/12 h-4" />
          <Skeleton className="w-4/5 h-4" />
        </div>
        <Skeleton className="w-full h-40" />
      </div>
      <div className="hidden lg:block space-y-4">
        <Skeleton className="w-full h-48" />
      </div>
    </div>
  );
};
