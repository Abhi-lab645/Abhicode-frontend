import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProblemMutation, useProblemsQuery } from '../hooks/useProblems';
import { ApiError } from '../types/problem';
import type { Problem } from '../types/problem';
import { DifficultyMeter } from '../components/ui/DifficultyMeter';
import { DeleteConfirmDialog } from '../components/problem/DeleteConfirmDialog';
import { Button } from '../components/ui/Button';
import { ProblemRowSkeleton } from '../components/ui/Skeleton';
import { Plus, Edit3, Trash2, Eye, RefreshCw, AlertCircle } from 'lucide-react';

export const ManagePage: React.FC = () => {
  const { data: problems, isLoading, isError, error, refetch, isFetching } = useProblemsQuery();
  const deleteMutation = useDeleteProblemMutation();

  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteClick = (problem: Problem) => {
    setDeleteError(null);
    setProblemToDelete(problem);
  };

  const handleConfirmDelete = async () => {
    if (!problemToDelete) return;
    setDeleteError(null);
    try {
      await deleteMutation.mutateAsync(problemToDelete._id);
      setProblemToDelete(null);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setDeleteError(err.reason || err.message);
      } else if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError('Failed to delete problem.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 pb-4 border-b border-line dark:border-[#1E222D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted dark:text-[#94A3B8] px-2 py-0.5 bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm uppercase tracking-wider">
              Management Console
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl text-text-main dark:text-white mt-2 tracking-tight">
            Problem Administration
          </h1>
          <p className="font-serif italic text-text-muted dark:text-[#94A3B8] text-base mt-1">
            Direct authoring interface for problem-service. All operations commit directly to MongoDB.
          </p>
        </div>

        <Link to="/problems/new">
          <Button variant="primary" size="sm" className="flex items-center gap-1.5 shadow-sm dark:shadow-[0_0_20px_rgba(255,90,31,0.25)]">
            <Plus className="w-3.5 h-3.5" />
            Create Problem
          </Button>
        </Link>
      </div>

      {/* Main List */}
      {isLoading ? (
        <div className="border border-line dark:border-[#1E222D] rounded-sm divide-y divide-line dark:divide-[#1E222D] overflow-hidden">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProblemRowSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 border border-diff-hard/40 dark:border-rose-900/40 bg-surface dark:bg-[#0A0A0C] rounded-sm text-center max-w-lg mx-auto my-8 space-y-4">
          <div className="inline-flex p-3 rounded-full bg-diff-hard/10 text-diff-hard">
            <AlertCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="font-sans font-bold text-lg text-text-main dark:text-white">Failed to Load Problems</h2>
          <p className="font-mono text-xs text-diff-hard dark:text-rose-400">
            {error instanceof Error ? error.message : 'Error communicating with service'}
          </p>
          <Button
            variant="secondary"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 mx-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        </div>
      ) : !problems || problems.length === 0 ? (
        <div className="p-12 border border-line dark:border-[#1E222D] bg-surface dark:bg-[#0A0A0C] rounded-sm text-center my-6 space-y-3">
          <p className="font-sans font-medium text-text-main dark:text-white text-base">No problems created yet</p>
          <p className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
            The problem-service database contains zero records.
          </p>
          <Link to="/problems/new" className="inline-block pt-2">
            <Button variant="primary" size="sm">
              Create First Problem
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border border-line dark:border-[#1E222D] rounded-sm overflow-hidden bg-bg dark:bg-[#0A0A0C]">
          <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_160px] gap-4 py-2.5 px-4 bg-surface dark:bg-[#07080A] border-b border-line dark:border-[#1E222D] font-mono text-xs text-text-muted dark:text-[#94A3B8] uppercase">
            <span>ID</span>
            <span>Title</span>
            <span>Difficulty</span>
            <span>Test Cases</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-line dark:divide-[#14161F]">
            {problems.map((problem: Problem, idx: number) => (
              <div
                key={problem._id}
                className="flex flex-col md:grid md:grid-cols-[80px_1fr_120px_100px_160px] gap-2 md:gap-4 py-3.5 px-4 items-start md:items-center hover:bg-surface/50 dark:hover:bg-[#0E1017] transition-colors"
              >
                <span className="font-mono text-xs text-text-muted dark:text-[#64748B] font-semibold">
                  {problem.problemId || String(idx + 1).padStart(3, '0')}
                </span>

                <div className="min-w-0">
                  <Link
                    to={`/problems/${problem.problemId || problem._id}`}
                    className="font-sans font-medium text-text-main dark:text-white hover:text-accent dark:hover:text-[#FF5A1F] transition-colors block truncate"
                  >
                    {problem.title}
                  </Link>
                  <span className="font-mono text-[10px] text-text-muted dark:text-[#64748B] block truncate md:hidden">
                    ID: {problem._id}
                  </span>
                </div>

                <div>
                  <DifficultyMeter difficulty={problem.difficulty} />
                </div>

                <span className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
                  {problem.testCases?.length || 0} cases
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1.5 md:justify-end w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-line/50 dark:border-[#1E222D]">
                  <Link to={`/problems/${problem._id}`}>
                    <Button variant="ghost" size="sm" className="px-2 h-8 text-xs" title="View Problem">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="md:hidden ml-1">View</span>
                    </Button>
                  </Link>
                  <Link to={`/problems/${problem._id}/edit`}>
                    <Button variant="secondary" size="sm" className="px-2 h-8 text-xs" title="Edit Problem">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="md:hidden ml-1">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(problem)}
                    className="px-2 h-8 text-xs dark:text-rose-400 dark:hover:bg-rose-950/30"
                    title="Delete Problem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="md:hidden ml-1">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        problem={problemToDelete}
        isOpen={Boolean(problemToDelete)}
        isDeleting={deleteMutation.isPending}
        error={deleteError}
        onClose={() => setProblemToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
