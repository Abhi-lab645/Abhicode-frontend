import React from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import type { Problem } from '../../types/problem';

interface DeleteConfirmDialogProps {
  problem: Problem | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error?: string | null;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  problem,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  error,
}) => {
  if (!problem) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Delete Problem"
      description="This will permanently delete the problem document from problem-service."
    >
      <div className="space-y-4">
        <div className="p-3.5 bg-surface dark:bg-[#060709] border border-line dark:border-[#1E222D] rounded-md">
          <p className="font-mono text-xs text-text-muted dark:text-[#94A3B8] uppercase tracking-wider mb-1">Target Resource</p>
          <p className="font-sans font-semibold text-text-main dark:text-white text-base">{problem.title}</p>
          <p className="font-mono text-xs text-text-muted dark:text-[#64748B] mt-1">ID: {problem._id}</p>
        </div>

        {error && (
          <div className="p-3 border border-diff-hard/40 bg-diff-hard/10 text-diff-hard text-sm rounded-md font-mono">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
