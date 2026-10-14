import { useQuery } from '@tanstack/react-query';
import { pingService } from '../api/problems';

export function useHealth() {
  const query = useQuery({
    queryKey: ['service-health'],
    queryFn: pingService,
    refetchInterval: 15000,
    retry: 1,
  });

  return {
    isOnline: !query.isError && !!query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
