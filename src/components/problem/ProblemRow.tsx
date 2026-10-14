import React from 'react';
import { Link } from 'react-router-dom';
import type { Problem } from '../../types/problem';
import { DifficultyMeter } from '../ui/DifficultyMeter';
import { FileText, ChevronRight } from 'lucide-react';

interface ProblemRowProps {
  problem: Problem;
  index: number;
}

const TOPIC_TAGS: Record<string, string[]> = {
  'Two Sum': ['Array', 'Hash Map'],
  'Palindrome Number Checker': ['Math', 'Numbers'],
  'Longest Substring Without Repeating Characters': ['String', 'Sliding Window'],
  'Merge k Sorted Lists': ['Linked List', 'Heap'],
  'Valid Parentheses': ['Stack', 'String'],
};

export const ProblemRow: React.FC<ProblemRowProps> = ({ problem, index }) => {
  const rowNumber = String(index + 1).padStart(3, '0');
  const testCaseCount = problem.testCases?.length || 0;
  const tags =
    problem.topics && problem.topics.length > 0
      ? problem.topics
      : TOPIC_TAGS[problem.title] || ['Algorithms'];

  return (
    <div className="group border-b border-[#E6EAF2] dark:border-[#14161E] hover:bg-[#F8FAFC] dark:hover:bg-[#0E1017] transition-colors">
      <Link
        to={`/problems/${problem.problemId || problem._id}`}
        className="grid grid-cols-[80px_1fr_130px_110px_40px] gap-4 py-3.5 px-5 items-center focus-visible:outline-2 focus-visible:outline-accent"
      >
        {/* Public Problem ID or Index */}
        <span className="font-mono text-xs text-[#71809F] dark:text-[#64748B] font-semibold tracking-tight select-none">
          {problem.problemId || rowNumber}
        </span>

        {/* Title & Topic Tags stacked directly below */}
        <div className="flex flex-col gap-1.5 min-w-0 pr-4">
          <span className="font-sans font-bold text-base text-[#101B3A] dark:text-white group-hover:text-accent transition-colors truncate">
            {problem.title}
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#EEF4FF] text-[#4F75FF] dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20 text-xs px-2.5 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-center">
          <DifficultyMeter difficulty={problem.difficulty} />
        </div>

        {/* Tests Count */}
        <div className="flex items-center gap-1.5 text-[#71809F] dark:text-[#64748B] text-xs font-medium">
          <FileText className="w-4 h-4 text-[#71809F] dark:text-[#64748B] stroke-[1.75]" />
          <span>
            {testCaseCount} {testCaseCount === 1 ? 'test' : 'tests'}
          </span>
        </div>

        {/* Chevron Action */}
        <div className="flex items-center justify-end text-[#71809F] dark:text-[#475569] group-hover:text-[#101B3A] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </div>
      </Link>
    </div>
  );
};
