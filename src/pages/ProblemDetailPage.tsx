import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProblemQuery } from '../hooks/useProblems';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { DifficultyMeter } from '../components/ui/DifficultyMeter';
import { ProblemDetailSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { ChevronDown, ChevronUp, Edit3, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import type { TestCase } from '../types/problem';

export const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: problem, isLoading, isError, error, refetch } = useProblemQuery(id);

  const [mobileMetaOpen, setMobileMetaOpen] = useState(false);
  const [editorialOpen, setEditorialOpen] = useState(false);

  if (isLoading) {
    return <ProblemDetailSkeleton />;
  }

  if (isError || !problem) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-diff-hard/10 text-diff-hard">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h1 className="font-sans font-bold text-xl text-text-main">Problem Not Found</h1>
        <p className="font-mono text-xs text-text-muted">
          {error instanceof Error
            ? error.message
            : `Could not retrieve problem with identifier: ${id}`}
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => refetch()} className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </Button>
          <Link to="/problems">
            <Button variant="primary">Return to Problem Set</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top breadcrumb navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-line dark:border-[#1E222D] text-xs font-mono text-text-muted dark:text-[#94A3B8]">
        <Link
          to="/problems"
          className="inline-flex items-center gap-1.5 hover:text-accent dark:hover:text-[#FF5A1F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>all problems</span>
        </Link>
        <span className="font-mono text-text-muted dark:text-[#64748B]">{problem.problemId ? `ID: ${problem.problemId}` : `id: ${problem._id}`}</span>
      </div>

      {/* Mobile Metadata Collapsible Strip (< 768px) */}
      <div className="lg:hidden mb-6 border border-line dark:border-[#1E222D] bg-surface dark:bg-[#0A0A0C] rounded-sm">
        <button
          type="button"
          onClick={() => setMobileMetaOpen((prev) => !prev)}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
          aria-expanded={mobileMetaOpen}
        >
          <div className="flex items-center gap-3">
            {problem.problemId && (
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#EEF4FF] text-[#4F75FF] dark:bg-blue-500/15 dark:text-blue-300 dark:border dark:border-blue-500/30">
                {problem.problemId}
              </span>
            )}
            <DifficultyMeter difficulty={problem.difficulty} />
            <span className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
              {problem.testCases?.length || 0} test cases
            </span>
          </div>
          <div className="flex items-center gap-1 text-text-muted dark:text-[#94A3B8] text-xs font-mono">
            <span>{mobileMetaOpen ? 'Hide meta' : 'Show meta'}</span>
            {mobileMetaOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {mobileMetaOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-line dark:border-[#1E222D] space-y-3 font-mono text-xs text-text-muted dark:text-[#94A3B8] animate-fade-in">
            {problem.problemId && (
              <div className="flex justify-between">
                <span>Public ID:</span>
                <span className="text-text-main font-semibold">{problem.problemId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Difficulty:</span>
              <span className="text-text-main capitalize">{problem.difficulty}</span>
            </div>
            {problem.topics && problem.topics.length > 0 && (
              <div className="flex justify-between">
                <span>Topics:</span>
                <span className="text-text-main">{problem.topics.join(', ')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Test Cases:</span>
              <span className="text-text-main">{problem.testCases?.length || 0} examples</span>
            </div>
            <div className="pt-2 border-t border-line dark:border-[#1E222D] flex justify-end">
              <Link to={`/problems/${problem._id}/edit`}>
                <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
                  <Edit3 className="w-3 h-3" />
                  Edit Problem
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Reading Column (hero) + Sticky Meta Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">
        {/* Left Hero Reading Column */}
        <article className="space-y-8 min-w-0">
          {/* Header */}
          <header className="space-y-3">
            <div className="flex items-center gap-3">
              {problem.problemId && (
                <span className="font-mono font-semibold text-xs px-2.5 py-1 rounded bg-[#EEF4FF] text-[#4F75FF] dark:bg-blue-500/15 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                  {problem.problemId}
                </span>
              )}
              <DifficultyMeter difficulty={problem.difficulty} />
            </div>
            <h1 className="font-sans font-bold text-2xl md:text-3xl text-text-main dark:text-white tracking-tight leading-tight">
              {problem.title}
            </h1>
            {problem.topics && problem.topics.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {problem.topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-[#EEF4FF] text-[#4F75FF] dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20 text-xs px-2.5 py-0.5 rounded-md font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Rendered Markdown Problem Statement */}
          <section className="pt-2" aria-label="Problem Description">
            <MarkdownRenderer content={problem.description} />
          </section>

          {/* Test Cases Specimen Blocks */}
          {problem.testCases && problem.testCases.length > 0 && (
            <section className="pt-8 border-t border-line dark:border-[#1E222D] space-y-4" aria-label="Example Test Cases">
              <h2 className="font-sans font-bold text-lg text-text-main dark:text-white">
                Test Cases & Specimen
              </h2>
              <div className="space-y-4">
                {problem.testCases.map((tc: TestCase, idx: number) => (
                  <div key={tc._id || idx} className="p-4 bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm space-y-3">
                    <span className="font-mono text-xs text-text-muted dark:text-[#94A3B8] uppercase tracking-wider block">
                      Case Specimen #{idx + 1}
                    </span>
                    <div className="space-y-2 font-mono text-xs">
                      <div>
                        <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Input:</span>
                        <pre className="p-3 bg-raised dark:bg-[#050507] border border-line dark:border-[#1E222D] rounded-sm overflow-x-auto text-text-main dark:text-[#F1F5F9]">
                          {tc.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Output:</span>
                        <pre className="p-3 bg-raised dark:bg-[#050507] border border-line dark:border-[#1E222D] rounded-sm overflow-x-auto text-text-main dark:text-[#F1F5F9]">
                          {tc.output}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Editorial Section (only rendered if present in database) */}
          {problem.editorial && (
            <section className="pt-8 border-t border-line dark:border-[#1E222D] space-y-4" aria-label="Editorial Notes">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-bold text-lg text-text-main dark:text-white">Editorial Notes</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditorialOpen((prev) => !prev)}
                  className="text-xs font-mono"
                >
                  {editorialOpen ? 'Collapse' : 'Expand Notes'}
                </Button>
              </div>

              {editorialOpen ? (
                <div className="p-5 bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm animate-fade-in">
                  <MarkdownRenderer content={problem.editorial} />
                </div>
              ) : (
                <p className="font-mono text-xs text-text-muted dark:text-[#94A3B8]">
                  Solution discussion and complexity analysis available. Click Expand to reveal.
                </p>
              )}
            </section>
          )}

          {/* Future Workspace Placeholder Anchor (strictly architectural, no fake code editor) */}
          <div className="pt-8 border-t border-line dark:border-[#1E222D] text-xs font-mono text-text-muted dark:text-[#64748B]">
            <span>[ abhicode evaluation workspace dock • panel reserved for execution service ]</span>
          </div>
        </article>

        {/* Sticky Desktop Meta Rail (>= 1024px) */}
        <aside className="hidden lg:block sticky top-20 space-y-6">
          <div className="p-4 bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm space-y-4">
            <div className="font-mono text-xs text-text-muted dark:text-[#94A3B8] uppercase tracking-wider pb-2 border-b border-line dark:border-[#1E222D]">
              Metadata Rail
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Difficulty:</span>
                <DifficultyMeter difficulty={problem.difficulty} />
              </div>

              <div>
                <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Test Cases:</span>
                <span className="text-text-main dark:text-white font-medium">
                  {problem.testCases?.length || 0} specimens
                </span>
              </div>

              {problem.problemId && (
                <div>
                  <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Public ID:</span>
                  <span className="font-mono text-text-main dark:text-white font-semibold text-xs">
                    {problem.problemId}
                  </span>
                </div>
              )}

              {problem.topics && problem.topics.length > 0 && (
                <div>
                  <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Topics:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {problem.topics.map((t) => (
                      <span
                        key={t}
                        className="bg-raised dark:bg-blue-500/10 text-text-main dark:text-blue-300 text-[11px] font-mono px-2 py-0.5 rounded border border-line dark:border-blue-500/25"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-text-muted dark:text-[#94A3B8] block mb-1">Database ID:</span>
                <span className="text-text-muted dark:text-[#64748B] break-all text-[11px] select-all">
                  {problem._id}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-line dark:border-[#1E222D] flex flex-col gap-2">
              <Link to={`/problems/${problem._id}/edit`} className="w-full">
                <Button variant="secondary" size="sm" fullWidth className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Problem
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
