import React from 'react';
import { useHealth } from '../../hooks/useHealth';
import { Button } from '../ui/Button';

export const ServiceStatusBanner: React.FC = () => {
  const { isOnline, isLoading, refetch } = useHealth();

  if (isLoading || isOnline) {
    return null;
  }

  return (
    <div
      role="alert"
      className="bg-diff-hard/10 border-b border-diff-hard/30 px-4 py-2.5 text-diff-hard font-mono text-xs flex flex-wrap items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-diff-hard inline-block" />
        <span>
          <strong>Service Offline:</strong> Cannot reach problem-service at http://localhost:3001. Ensure MongoDB and the Express backend server are running.
        </span>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => refetch()}
        className="text-xs h-7 min-h-[28px] px-2.5"
      >
        Retry /ping
      </Button>
    </div>
  );
};
