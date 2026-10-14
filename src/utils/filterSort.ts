import type { Problem, ProblemDifficulty } from '../types/problem';

export type DifficultyFilter = 'all' | ProblemDifficulty;

export type SortOption =
  | 'default'
  | 'title-asc'
  | 'title-desc'
  | 'difficulty-asc'
  | 'difficulty-desc';

export interface FilterSortOptions {
  searchQuery?: string;
  difficulty?: DifficultyFilter;
  sortBy?: SortOption;
}

const DIFFICULTY_WEIGHT: Record<ProblemDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

/**
 * Pure filter and sort function isolated in one module so it can cleanly transition
 * to server-side query params when backend filtering is implemented.
 */
export function filterAndSortProblems(
  problems: Problem[] = [],
  options: FilterSortOptions = {}
): Problem[] {
  const { searchQuery = '', difficulty = 'all', sortBy = 'default' } = options;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // 1. Filter
  let filtered = problems.filter((problem: Problem) => {
    // Search filter: title, public problemId, or topics
    if (normalizedQuery) {
      const matchTitle = problem.title.toLowerCase().includes(normalizedQuery);
      const matchId = problem.problemId ? problem.problemId.toLowerCase().includes(normalizedQuery) : false;
      const matchTopics = problem.topics ? problem.topics.some((t) => t.toLowerCase().includes(normalizedQuery)) : false;
      if (!matchTitle && !matchId && !matchTopics) {
        return false;
      }
    }

    // Difficulty filter
    if (difficulty !== 'all' && problem.difficulty !== difficulty) {
      return false;
    }

    return true;
  });

  // 2. Sort
  if (sortBy === 'default') {
    return filtered;
  }

  filtered = [...filtered].sort((a: Problem, b: Problem) => {
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'difficulty-asc': {
        const diffA = DIFFICULTY_WEIGHT[a.difficulty] || 0;
        const diffB = DIFFICULTY_WEIGHT[b.difficulty] || 0;
        if (diffA !== diffB) return diffA - diffB;
        return a.title.localeCompare(b.title);
      }
      case 'difficulty-desc': {
        const diffA = DIFFICULTY_WEIGHT[a.difficulty] || 0;
        const diffB = DIFFICULTY_WEIGHT[b.difficulty] || 0;
        if (diffA !== diffB) return diffB - diffA;
        return a.title.localeCompare(b.title);
      }
      default:
        return 0;
    }
  });

  return filtered;
}
