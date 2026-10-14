export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
  _id?: string;
  input: string;
  output: string;
}

export interface Problem {
  _id: string;
  problemId?: string;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  topics?: string[];
  testCases: TestCase[];
  editorial?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProblemInput {
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  topics?: string[];
  testCases: Array<{ input: string; output: string }>;
  editorial?: string;
}

export interface UpdateProblemInput {
  title?: string;
  description?: string;
  difficulty?: ProblemDifficulty;
  topics?: string[];
  testCases: Array<{ input: string; output: string }>;
  editorial?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  error?: Record<string, unknown> | string;
  err?: Record<string, unknown> | string;
  data: T;
}

export interface ApiErrorPayload {
  success: false;
  message: string;
  error: {
    reason?: string;
    id?: string;
    [key: string]: unknown;
  } | string;
  data?: unknown;
}

export class ApiError extends Error {
  statusCode: number;
  reason?: string;
  details?: unknown;

  constructor(statusCode: number, message: string, reason?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.reason = reason;
    this.details = details;
  }
}
