import { apiClient } from './client';
import type { ApiResponse, CreateProblemInput, Problem, UpdateProblemInput } from '../types/problem';

export async function pingService(): Promise<{ message: string }> {
  return apiClient.get<{ message: string }>('/ping');
}

export async function pingController(): Promise<{ message: string }> {
  return apiClient.get<{ message: string }>('/api/v1/problems/ping');
}

export async function fetchProblems(search?: string): Promise<Problem[]> {
  const url = search ? `/api/v1/problems?search=${encodeURIComponent(search)}` : '/api/v1/problems';
  const res = await apiClient.get<ApiResponse<Problem[]>>(url);
  return res.data;
}

export async function fetchProblem(id: string): Promise<Problem> {
  const res = await apiClient.get<ApiResponse<Problem>>(`/api/v1/problems/${id}`);
  return res.data;
}

export async function createProblem(payload: CreateProblemInput): Promise<Problem> {
  const res = await apiClient.post<ApiResponse<Problem>>('/api/v1/problems', payload);
  return res.data;
}

export async function updateProblem(id: string, payload: UpdateProblemInput): Promise<Problem> {
  const res = await apiClient.put<ApiResponse<Problem>>(`/api/v1/problems/${id}`, payload);
  return res.data;
}

export async function deleteProblem(id: string): Promise<Problem> {
  const res = await apiClient.delete<ApiResponse<Problem>>(`/api/v1/problems/${id}`);
  return res.data;
}
