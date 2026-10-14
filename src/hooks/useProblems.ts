import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProblem,
  deleteProblem,
  fetchProblem,
  fetchProblems,
  updateProblem,
} from '../api/problems';
import type { CreateProblemInput, Problem, UpdateProblemInput } from '../types/problem';

export const PROBLEMS_QUERY_KEY = ['problems'];

export function useProblemsQuery(search?: string) {
  return useQuery<Problem[]>({
    queryKey: search ? ['problems', { search }] : PROBLEMS_QUERY_KEY,
    queryFn: () => fetchProblems(search),
  });
}

export function useProblemQuery(id: string | undefined) {
  return useQuery<Problem>({
    queryKey: ['problem', id],
    queryFn: () => {
      if (!id) throw new Error('Problem ID is required');
      return fetchProblem(id);
    },
    enabled: Boolean(id),
  });
}

export function useCreateProblemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProblemInput) => createProblem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROBLEMS_QUERY_KEY });
    },
  });
}

export function useUpdateProblemMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProblemInput) => updateProblem(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: PROBLEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['problem', id] });
      queryClient.setQueryData(['problem', id], updated);
    },
  });
}

export function useDeleteProblemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProblem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROBLEMS_QUERY_KEY });
    },
  });
}
