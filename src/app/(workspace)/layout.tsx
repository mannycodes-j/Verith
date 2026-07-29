import React from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceLayout>
      {children}
    </WorkspaceLayout>
  );
}
