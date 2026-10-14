import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProblemQuery, useUpdateProblemMutation } from '../hooks/useProblems';
import { ApiError } from '../types/problem';
import type { CreateProblemInput } from '../types/problem';
import { ProblemForm } from '../components/problem/ProblemForm';
import { ProblemDetailSkeleton } from '../components/ui/Skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProblemEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: problem, isLoading, isError, error, refetch } = useProblemQuery(id);
  const updateMutation = useUpdateProblemMutation(id || '');
  const [serverError, setServerError] = useState<string | null>(null);

  if (isLoading) {
    return <ProblemDetailSkeleton />;
  }

  if (isError || !problem || !id) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-diff-hard/10 text-diff-hard">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h1 className="font-sans font-bold text-xl text-text-main dark:text-white">Problem Not Found</h1>
        <p className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
          {error instanceof Error ? error.message : `Unable to find problem: ${id}`}
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
          <Link to="/problems">
            <Button variant="primary">Return to Problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: CreateProblemInput) => {
    setServerError(null);
    try {
      await updateMutation.mutateAsync(data);
      navigate(`/problems/${id}`);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setServerError(err.reason || err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred while updating the problem.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-line dark:border-[#1E222D] space-y-2">
        <Link
          to={`/problems/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted dark:text-[#94A3B8] hover:text-accent dark:hover:text-[#FF5A1F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to problem view</span>
        </Link>
        <h1 className="font-sans font-bold text-2xl text-text-main dark:text-white tracking-tight">
          Edit Problem: {problem.title}
        </h1>
        <p className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
          {problem.problemId ? `Public ID: ${problem.problemId} • Database ID: ${problem._id}` : `id: ${problem._id}`}
        </p>
      </div>

      <ProblemForm
        initialValues={{
          title: problem.title,
          difficulty: problem.difficulty,
          description: problem.description,
          testCases: problem.testCases,
          editorial: problem.editorial,
          topics: problem.topics,
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        serverError={serverError}
        submitLabel="Update Problem"
        onCancel={() => navigate(`/problems/${id}`)}
      />
    </div>
  );
};
