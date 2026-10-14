import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateProblemMutation } from '../hooks/useProblems';
import { ApiError } from '../types/problem';
import type { CreateProblemInput } from '../types/problem';
import { ProblemForm } from '../components/problem/ProblemForm';
import { ArrowLeft } from 'lucide-react';

export const ProblemCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateProblemMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateProblemInput) => {
    setServerError(null);
    try {
      const created = await createMutation.mutateAsync(data);
      navigate(`/problems/${created._id}`);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setServerError(err.reason || err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred while saving the problem.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-line dark:border-[#1E222D] space-y-2">
        <Link
          to="/problems"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted dark:text-[#94A3B8] hover:text-accent dark:hover:text-[#FF5A1F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to problem set</span>
        </Link>
        <h1 className="font-sans font-bold text-2xl text-text-main dark:text-white tracking-tight">
          New Problem Document
        </h1>
        <p className="font-serif italic text-text-muted dark:text-[#94A3B8] text-base">
          Define problem statement, test specimens, and difficulty tier.
        </p>
      </div>

      <ProblemForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        serverError={serverError}
        submitLabel="Create Problem"
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};
