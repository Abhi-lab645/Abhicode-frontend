import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="font-mono text-sm text-accent uppercase tracking-widest">
        HTTP 404 • Not Found
      </div>
      <h1 className="font-sans font-bold text-3xl text-text-main dark:text-white tracking-tight">
        Page Does Not Exist
      </h1>
      <p className="font-serif italic text-text-muted dark:text-[#94A3B8] text-base max-w-md mx-auto">
        The requested path could not be found within the problem catalog.
      </p>
      <div className="pt-4">
        <Link to="/problems">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to Problem Set
          </Button>
        </Link>
      </div>
    </div>
  );
};
