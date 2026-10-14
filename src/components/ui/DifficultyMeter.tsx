import React from 'react';
import type { ProblemDifficulty } from '../../types/problem';

interface DifficultyMeterProps {
  difficulty: ProblemDifficulty;
  className?: string;
}

export const DifficultyMeter: React.FC<DifficultyMeterProps> = ({ difficulty, className = '' }) => {
  const config = {
    easy: {
      bg: 'bg-[#EAFBF1] text-[#16A34A] dark:bg-emerald-500/15 dark:text-emerald-400 dark:border dark:border-emerald-500/30',
      dot: 'bg-[#16A34A] dark:bg-emerald-400',
      label: 'Easy',
    },
    medium: {
      bg: 'bg-[#FFF6E9] text-[#D97706] dark:bg-amber-500/15 dark:text-amber-400 dark:border dark:border-amber-500/30',
      dot: 'bg-[#D97706] dark:bg-amber-400',
      label: 'Medium',
    },
    hard: {
      bg: 'bg-[#FEECEB] text-[#DC2626] dark:bg-rose-500/15 dark:text-rose-400 dark:border dark:border-rose-500/30',
      dot: 'bg-[#DC2626] dark:bg-rose-400',
      label: 'Hard',
    },
  }[difficulty] || {
    bg: 'bg-gray-100 text-gray-700',
    dot: 'bg-gray-500',
    label: difficulty,
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${className}`}
      aria-label={`Difficulty: ${config.label}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};
