import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { ProblemListPage } from './pages/ProblemListPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { ProblemCreatePage } from './pages/ProblemCreatePage';
import { ProblemEditPage } from './pages/ProblemEditPage';
import { ManagePage } from './pages/ManagePage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      retry: (failureCount, error: any) => {
        // Do not retry 404 or 400
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return failureCount < 2;
      },
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/problems" replace />} />
            <Route path="/problems" element={<ProblemListPage />} />
            <Route path="/problems/new" element={<ProblemCreatePage />} />
            <Route path="/problems/:id" element={<ProblemDetailPage />} />
            <Route path="/problems/:id/edit" element={<ProblemEditPage />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
