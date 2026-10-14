import React, { useState } from 'react';
import type { CreateProblemInput, ProblemDifficulty } from '../../types/problem';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MarkdownRenderer } from '../ui/MarkdownRenderer';
import { Plus, Trash2, Eye, Edit3 } from 'lucide-react';

interface ProblemFormProps {
  initialValues?: Partial<CreateProblemInput>;
  onSubmit: (data: CreateProblemInput) => Promise<void>;
  isSubmitting: boolean;
  serverError?: string | null;
  submitLabel?: string;
  onCancel?: () => void;
}

export const ProblemForm: React.FC<ProblemFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  serverError,
  submitLabel = 'Save Problem',
  onCancel,
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>(
    initialValues?.difficulty || 'easy'
  );
  const [topicsInput, setTopicsInput] = useState(
    initialValues?.topics ? initialValues.topics.join(', ') : ''
  );
  const [description, setDescription] = useState(initialValues?.description || '');
  const [testCases, setTestCases] = useState<Array<{ input: string; output: string }>>(
    initialValues?.testCases && initialValues.testCases.length > 0
      ? initialValues.testCases.map((tc) => ({ input: tc.input, output: tc.output }))
      : [{ input: '', output: '' }]
  );
  const [editorial, setEditorial] = useState(initialValues?.editorial || '');

  // Mobile editor mode tab ('edit' | 'preview')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showEditorialPreview, setShowEditorialPreview] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddTestCase = () => {
    setTestCases((prev) => [...prev, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc))
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title cannot be empty';
    }
    if (!description.trim()) {
      newErrors.description = 'Description cannot be empty';
    }

    // Verify non-empty test cases if any are partially filled
    testCases.forEach((tc, idx) => {
      if ((tc.input.trim() && !tc.output.trim()) || (!tc.input.trim() && tc.output.trim())) {
        newErrors[`testcase_${idx}`] = `Test case #${idx + 1} requires both input and output`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Filter out completely blank test cases
    const cleanedCases = testCases.filter(
      (tc) => tc.input.trim() !== '' && tc.output.trim() !== ''
    );

    // Parse comma-separated topics
    const parsedTopics = topicsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const seen = new Set<string>();
    const uniqueTopics: string[] = [];
    for (const t of parsedTopics) {
      const lower = t.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        uniqueTopics.push(t);
      }
    }

    await onSubmit({
      title: title.trim(),
      difficulty,
      description: description.trim(),
      topics: uniqueTopics,
      testCases: cleanedCases,
      editorial: editorial.trim() || undefined,
    });
  };

  const SUGGESTED_TOPICS = [
    'Array',
    'String',
    'Hash Map',
    'Dynamic Programming',
    'Math',
    'Binary Search',
    'Two Pointers',
    'Stack',
    'Heap',
    'Linked List',
    'Sliding Window',
    'Divide and Conquer',
  ];

  const handleToggleTopic = (topic: string) => {
    const current = topicsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const exists = current.some((t) => t.toLowerCase() === topic.toLowerCase());
    const updated = exists
      ? current.filter((t) => t.toLowerCase() !== topic.toLowerCase())
      : [...current, topic];
    setTopicsInput(updated.join(', '));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Global / Server Error Notice */}
      {serverError && (
        <div
          role="alert"
          className="p-4 bg-diff-hard/10 dark:bg-rose-950/20 border border-diff-hard/40 dark:border-rose-800/40 rounded-sm text-diff-hard dark:text-rose-400 font-mono text-sm"
        >
          <strong>Error from problem-service:</strong>
          <p className="mt-1">{serverError}</p>
        </div>
      )}

      {/* Top section: Title & Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
        <div>
          <Input
            label="Problem Title"
            id="problem-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            placeholder="e.g. Reverse Linked List"
            error={errors.title}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="problem-difficulty" className="font-sans font-medium text-sm text-text-main dark:text-white">
            Difficulty
          </label>
          <select
            id="problem-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as ProblemDifficulty)}
            className="min-h-[44px] px-3 py-2 bg-surface dark:bg-[#08080B] text-text-main dark:text-white text-base rounded-sm border border-line dark:border-[#1E222D] focus:border-accent focus:ring-1 focus:ring-accent outline-none font-sans"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Topics Section */}
      <div className="space-y-2">
        <label htmlFor="problem-topics" className="font-sans font-medium text-sm text-text-main dark:text-white">
          Topics & Tags (Comma-separated)
        </label>
        <Input
          id="problem-topics"
          value={topicsInput}
          onChange={(e) => setTopicsInput(e.target.value)}
          placeholder="e.g. Array, Hash Map, Two Pointers"
        />
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs font-mono text-text-muted dark:text-[#94A3B8] mr-1">Suggestions:</span>
          {SUGGESTED_TOPICS.map((topic) => {
            const isSelected = topicsInput
              .split(',')
              .map((t) => t.trim().toLowerCase())
              .includes(topic.toLowerCase());
            return (
              <button
                type="button"
                key={topic}
                onClick={() => handleToggleTopic(topic)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  isSelected
                    ? 'bg-[#FF5A1F] text-white shadow-xs'
                    : 'bg-[#EEF4FF] text-[#4F75FF] dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/25 hover:bg-[#E0ECFF] dark:hover:bg-blue-500/20'
                }`}
              >
                {isSelected ? `✓ ${topic}` : `+ ${topic}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description Section with Live Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="problem-description" className="font-sans font-medium text-sm text-text-main dark:text-white">
            Problem Statement (Markdown)
          </label>

          {/* Mobile Edit/Preview Tabs */}
          <div className="md:hidden flex items-center bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 rounded-sm flex items-center gap-1 ${
                activeTab === 'edit'
                  ? 'bg-raised dark:bg-[#1A1D28] text-text-main dark:text-white font-medium'
                  : 'text-text-muted dark:text-[#94A3B8]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-sm flex items-center gap-1 ${
                activeTab === 'preview'
                  ? 'bg-raised dark:bg-[#1A1D28] text-text-main dark:text-white font-medium'
                  : 'text-text-muted dark:text-[#94A3B8]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          <span className="hidden md:inline-block text-xs font-mono text-text-muted dark:text-[#94A3B8]">
            Live Markdown Split Preview
          </span>
        </div>

        {/* Desktop Split / Mobile Tabbed Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Editor Column */}
          <div className={`${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
            <textarea
              id="problem-description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              rows={14}
              placeholder="Write problem statement in Markdown... (GFM tables, code fences, lists supported)"
              className={`w-full p-3.5 bg-surface dark:bg-[#08080B] text-text-main dark:text-white placeholder-text-muted font-mono text-sm leading-relaxed rounded-sm border ${
                errors.description
                  ? 'border-diff-hard focus:ring-diff-hard'
                  : 'border-line dark:border-[#1E222D] focus:border-accent focus:ring-1 focus:ring-accent'
              } outline-none`}
              required
            />
            {errors.description && (
              <p className="text-xs text-diff-hard font-mono mt-1">{errors.description}</p>
            )}
          </div>

          {/* Live Preview Column */}
          <div
            className={`p-4 bg-surface/40 dark:bg-[#08080B] border border-line dark:border-[#1E222D] rounded-sm overflow-y-auto max-h-[420px] ${
              activeTab === 'edit' ? 'hidden md:block' : 'block'
            }`}
          >
            <div className="text-xs font-mono text-text-muted dark:text-[#94A3B8] uppercase tracking-wider mb-2 pb-2 border-b border-line/60 dark:border-[#1E222D]">
              Specimen Preview
            </div>
            {description.trim() ? (
              <MarkdownRenderer content={description} />
            ) : (
              <p className="font-serif italic text-text-muted dark:text-[#64748B] text-sm py-8 text-center">
                Markdown output will render here in real time...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Test Cases Section */}
      <div className="space-y-4 pt-4 border-t border-line dark:border-[#1E222D]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-sans font-medium text-base text-text-main dark:text-white">Test Cases Specimen</h3>
            <p className="text-xs text-text-muted dark:text-[#94A3B8] font-mono mt-0.5">
              Defines example test case inputs and expected outputs.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddTestCase}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Test Case
          </Button>
        </div>

        <div className="space-y-3">
          {testCases.map((tc, idx) => (
            <div key={idx} className="p-4 bg-surface dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted dark:text-[#94A3B8] uppercase">Case #{idx + 1}</span>
                {testCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTestCase(idx)}
                    className="text-text-muted dark:text-[#64748B] hover:text-diff-hard dark:hover:text-rose-400 p-1 rounded-sm transition-colors"
                    aria-label={`Remove test case ${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-text-muted dark:text-[#94A3B8] mb-1">
                    Input specimen
                  </label>
                  <textarea
                    value={tc.input}
                    onChange={(e) => handleTestCaseChange(idx, 'input', e.target.value)}
                    rows={2}
                    placeholder="e.g. nums = [2,7,11,15], target = 9"
                    className="w-full px-3 py-2 bg-raised dark:bg-[#050507] border border-line dark:border-[#1E222D] rounded-sm font-mono text-xs text-text-main dark:text-white outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text-muted dark:text-[#94A3B8] mb-1">
                    Expected output
                  </label>
                  <textarea
                    value={tc.output}
                    onChange={(e) => handleTestCaseChange(idx, 'output', e.target.value)}
                    rows={2}
                    placeholder="e.g. [0,1]"
                    className="w-full px-3 py-2 bg-raised dark:bg-[#050507] border border-line dark:border-[#1E222D] rounded-sm font-mono text-xs text-text-main dark:text-white outline-none focus:border-accent"
                  />
                </div>
              </div>
              {errors[`testcase_${idx}`] && (
                <p className="text-xs text-diff-hard font-mono">{errors[`testcase_${idx}`]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Section (Optional) */}
      <div className="space-y-3 pt-4 border-t border-line dark:border-[#1E222D]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-sans font-medium text-base text-text-main dark:text-white">
              Editorial Notes (Optional)
            </h3>
            <p className="text-xs text-text-muted dark:text-[#94A3B8] font-mono mt-0.5">
              Solution outline, time/space complexity notes, or reference approaches.
            </p>
          </div>
          {editorial.trim() && (
            <button
              type="button"
              onClick={() => setShowEditorialPreview((prev) => !prev)}
              className="text-xs font-mono text-accent hover:underline"
            >
              {showEditorialPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          )}
        </div>

        <textarea
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          rows={6}
          placeholder="Optional explanation, algorithms, or approaches in markdown..."
          className="w-full p-3.5 bg-surface dark:bg-[#08080B] text-text-main dark:text-white placeholder-text-muted font-mono text-sm leading-relaxed rounded-sm border border-line dark:border-[#1E222D] focus:border-accent focus:ring-1 focus:ring-accent outline-none"
        />

        {showEditorialPreview && editorial.trim() && (
          <div className="p-4 bg-surface/50 dark:bg-[#08080B] border border-line dark:border-[#1E222D] rounded-sm">
            <div className="text-xs font-mono text-text-muted dark:text-[#94A3B8] uppercase mb-2">Editorial Preview</div>
            <MarkdownRenderer content={editorial} />
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="pt-6 border-t border-line dark:border-[#1E222D] flex items-center justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving to problem-service...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};
