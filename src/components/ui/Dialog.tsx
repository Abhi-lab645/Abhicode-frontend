import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        {/* Flat solid backdrop */}
        <RadixDialog.Overlay className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 animate-fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <RadixDialog.Content className="relative w-full max-w-lg bg-raised dark:bg-[#0A0A0C] border border-line dark:border-[#1E222D] rounded-xl p-6 shadow-none dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-fade-in focus:outline-none">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <RadixDialog.Title className="text-lg font-bold font-sans text-text-main dark:text-white">
                  {title}
                </RadixDialog.Title>
                {description && (
                  <RadixDialog.Description className="text-sm text-text-muted dark:text-[#94A3B8] mt-1 font-sans">
                    {description}
                  </RadixDialog.Description>
                )}
              </div>
              <RadixDialog.Close asChild>
                <button
                  type="button"
                  className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-sm text-text-muted dark:text-[#94A3B8] hover:text-text-main dark:hover:text-white hover:bg-surface dark:hover:bg-[#141620] border border-transparent hover:border-line dark:hover:border-[#1E222D] focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </RadixDialog.Close>
            </div>
            <div className="mt-4">{children}</div>
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
